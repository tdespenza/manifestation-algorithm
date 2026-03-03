/**
 * Unit tests for src/i18n/index.ts
 *
 * Coverage targets
 * ─────────────────
 * • resolveInitialLocale – stored valid locale branch (line ~34)
 * • resolveInitialLocale – browser language fallback branch (lines ~36-37)
 * • resolveInitialLocale – catch path (no localStorage / navigator)
 * • setLocale – valid locale (lines ~59-61)
 * • setLocale – invalid locale guard (line ~58 early return)
 * • getLocale – reads current locale
 * • SUPPORTED_LOCALES – exported map shape
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { i18n, setLocale, getLocale, SUPPORTED_LOCALES } from '@/i18n';

// ── localStorage polyfill (jsdom's built-in is partial in this test env) ──────
const storageData: Record<string, string> = {};
const localStorageMock: Storage = {
  get length() {
    return Object.keys(storageData).length;
  },
  key: (index: number) => Object.keys(storageData)[index] ?? null,
  setItem: (k: string, v: string) => {
    storageData[k] = v;
  },
  getItem: (k: string) => storageData[k] ?? null,
  removeItem: (k: string) => {
    delete storageData[k];
  },
  clear: () => {
    Object.keys(storageData).forEach(k => delete storageData[k]);
  }
};
vi.stubGlobal('localStorage', localStorageMock);

// ─────────────────────────────────────────────────────────────────────────────

describe('SUPPORTED_LOCALES', () => {
  it('contains english and spanish', () => {
    expect(SUPPORTED_LOCALES).toHaveProperty('en', 'English');
    expect(SUPPORTED_LOCALES).toHaveProperty('es', 'Español');
  });
});

describe('setLocale', () => {
  let originalLang: string;

  beforeEach(() => {
    originalLang = document.documentElement.getAttribute('lang') ?? '';
    localStorage.removeItem('app_locale');
  });

  afterEach(() => {
    setLocale('en');
    document.documentElement.setAttribute('lang', originalLang || 'en');
    localStorage.removeItem('app_locale');
  });

  it('does nothing (early return) when given an unknown locale', () => {
    const before = getLocale();
    setLocale('xx-unsupported');
    expect(getLocale()).toBe(before);
    expect(localStorage.getItem('app_locale')).toBeNull();
  });

  it('sets the active locale to a supported value', () => {
    setLocale('es');
    expect(getLocale()).toBe('es');
  });

  it('persists the locale in localStorage', () => {
    setLocale('es');
    expect(localStorage.getItem('app_locale')).toBe('es');
  });

  it('sets the html[lang] attribute', () => {
    setLocale('es');
    expect(document.documentElement.getAttribute('lang')).toBe('es');
  });

  it('accepts every locale listed in SUPPORTED_LOCALES', () => {
    for (const code of Object.keys(SUPPORTED_LOCALES)) {
      setLocale(code);
      expect(getLocale()).toBe(code);
    }
  });
});

describe('getLocale', () => {
  it('returns a string that is a key in SUPPORTED_LOCALES', () => {
    const locale = getLocale();
    expect(typeof locale).toBe('string');
    expect(locale.length).toBeGreaterThan(0);
    expect(locale in SUPPORTED_LOCALES).toBe(true);
  });
});

describe('i18n instance configuration', () => {
  it('fallbackLocale is en', () => {
    // Kills StringLiteral mutant: fallbackLocale: 'en' → ''
    const fb = (i18n.global.fallbackLocale as unknown as { value: string }).value;
    expect(fb).toBe('en');
  });

  it('does not emit console.warn for a completely missing key (missingWarn: false)', () => {
    // Kills BooleanLiteral mutant: missingWarn: false → true
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      (i18n.global.t as (k: string) => string)('__mutation_test_missing_key__');
      expect(spy).not.toHaveBeenCalled();
    } finally {
      spy.mockRestore();
    }
  });

  it('does not emit console.warn when falling back to en for a key missing in current locale (fallbackWarn: false)', () => {
    // Kills BooleanLiteral mutant: fallbackWarn: false → true
    // Temporarily add a key to 'en' only so the fallback path fires.
    i18n.global.mergeLocaleMessage('en', { __fb_test_key__: 'fallback-value' });
    const savedLocale = getLocale();
    setLocale('es');
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      // Key exists in 'en' (fallback) but not 'es' (current) → triggers fallbackWarn path.
      (i18n.global.t as (k: string) => string)('__fb_test_key__');
      expect(spy).not.toHaveBeenCalled();
    } finally {
      spy.mockRestore();
      setLocale(savedLocale);
    }
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// resolveInitialLocale – dynamic import tests
//
// Because resolveInitialLocale() is private and is called once at module-init
// time, we test its branches by clearing the module registry with
// vi.resetModules() and then dynamically re-importing the module with a
// different localStorage / navigator.language state each time.
// ──────────────────────────────────────────────────────────────────────────────

describe('resolveInitialLocale (internal, via dynamic import)', () => {
  afterEach(() => {
    localStorageMock.removeItem('app_locale');
    vi.restoreAllMocks();
  });

  it('returns a stored valid locale preference', async () => {
    // Set the stored preference in localStorageMock (the globally stubbed localStorage).
    localStorageMock.setItem('app_locale', 'es');
    vi.resetModules();
    const { getLocale: fg } = await import('@/i18n');
    expect(fg()).toBe('es');
  });

  it('falls back to browser language when no stored preference exists', async () => {
    // No stored preference — localStorageMock is empty (ensured by afterEach).
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('es-ES');
    vi.resetModules();
    const { getLocale: fg } = await import('@/i18n');
    expect(fg()).toBe('es');
  });

  it('falls back to en when browser language is unsupported', async () => {
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('zz-ZZ');
    vi.resetModules();
    const { getLocale: fg } = await import('@/i18n');
    expect(fg()).toBe('en');
  });

  it('falls back to en when localStorage throws', async () => {
    // Spy on the mock object's getItem to throw a security error.
    vi.spyOn(localStorageMock, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError: localStorage not available');
    });
    vi.resetModules();
    const { getLocale: fg } = await import('@/i18n');
    expect(fg()).toBe('en');
  });

  it('ignores a stored value that is not in SUPPORTED_LOCALES', async () => {
    // Kills LogicalOperator mutant: `stored && stored in SUPPORTED_LOCALES` → `||`
    // A non-null but unsupported stored value must NOT be returned as the locale.
    localStorageMock.setItem('app_locale', 'xx-invalid');
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('en-US');
    vi.resetModules();
    const { getLocale: fg } = await import('@/i18n');
    expect(fg()).toBe('en'); // must not return 'xx-invalid'
  });
});
