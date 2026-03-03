/**
 * i18n — vue-i18n v10 setup (Composition API mode + global injection).
 *
 * Supported locales
 * -----------------
 * en  English  (default)
 * es  Spanish / Español
 *
 * Adding a new locale
 * -------------------
 * 1. Create `src/i18n/locales/<code>.ts` implementing `Messages` from `en.ts`.
 * 2. Import it here and add it to `messages`.
 * 3. Add it to the `SUPPORTED_LOCALES` map and the language selector in
 *    `src/components/ui/Settings.vue`.
 */

import { createI18n } from 'vue-i18n';
import en, { type Messages } from './locales/en';
import es from './locales/es';

/** Locales the app officially ships. */
export const SUPPORTED_LOCALES: Record<string, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  ru: 'Русский',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
  ar: 'العربية',
  hi: 'हिन्दी',
  bn: 'বাংলা',
  pa: 'ਪੰਜਾਬੀ',
  ur: 'اردو',
  id: 'Bahasa Indonesia',
  ms: 'Bahasa Melayu',
  th: 'ไทย',
  vi: 'Tiếng Việt',
  tr: 'Türkçe',
  nl: 'Nederlands',
  pl: 'Polski',
  uk: 'Українська',
  cs: 'Čeština',
  sk: 'Slovenčina',
  hu: 'Magyar',
  ro: 'Română',
  bg: 'Български',
  hr: 'Hrvatski',
  sr: 'Српски',
  sl: 'Slovenščina',
  et: 'Eesti',
  lv: 'Latviešu',
  lt: 'Lietuvių',
  fi: 'Suomi',
  sv: 'Svenska',
  no: 'Norsk',
  da: 'Dansk',
  is: 'Íslenska',
  ga: 'Gaeilge',
  cy: 'Cymraeg',
  mt: 'Malti',
  el: 'Ελληνικά',
  he: 'עברית',
  fa: 'فارسی',
  sw: 'Kiswahili',
  am: 'አማርኛ',
  zu: 'isiZulu',
  xh: 'isiXhosa',
  af: 'Afrikaans',
  yo: 'Yorùbá',
  ig: 'Igbo',
  ha: 'Hausa',
  so: 'Soomaali',
  rw: 'Kinyarwanda',
  ne: 'नेपाली',
  si: 'සිංහල',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  kn: 'ಕನ್ನಡ',
  ml: 'മലയാളം',
  mr: 'मराठी',
  gu: 'ગુજરાતી',
  or: 'ଓଡ଼ିଆ',
  as: 'অসমীয়া',
  my: 'မြန်မာ',
  km: 'ខ្មែរ',
  lo: 'ລາວ',
  mn: 'Монгол',
  kk: 'Қазақша',
  uz: 'Oʻzbek',
  tk: 'Türkmen',
  ky: 'Кыргызча',
  tg: 'Тоҷикӣ',
  az: 'Azərbaycanca',
  ka: 'ქართული',
  hy: 'Հայերեն',
  be: 'Беларуская',
  mk: 'Македонски',
  sq: 'Shqip',
  bs: 'Bosanski',
  me: 'Crnogorski',
  lb: 'Lëtzebuergesch',
  eu: 'Euskara',
  gl: 'Galego',
  ca: 'Català',
  co: 'Corsu',
  ast: 'Asturianu',
  br: 'Brezhoneg',
  oc: 'Occitan',
  gd: 'Gàidhlig',
  yi: 'ייִדיש',
  ps: 'پښتو',
  ku: 'Kurdî',
  dv: 'ދިވެހި',
  su: 'Basa Sunda',
  jv: 'Basa Jawa',
  ceb: 'Cebuano',
  mi: 'Māori',
  haw: 'ʻŌlelo Hawaiʻi'
};

const BASE_MESSAGES: Record<string, Messages> = { en, es };
const messages: Record<string, Messages> = Object.fromEntries(
  Object.keys(SUPPORTED_LOCALES).map(code => [code, BASE_MESSAGES[code] ?? en])
) as Record<string, Messages>;

/** Storage key for persisting the user's locale preference. */
const LOCALE_STORAGE_KEY = 'app_locale';

/** Resolve the initial locale: stored preference → browser language → 'en'. */
function resolveInitialLocale(): string {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored && stored in SUPPORTED_LOCALES) return stored;

    const browser = navigator.language.split('-')[0];
    if (browser in SUPPORTED_LOCALES) return browser;
  } catch {
    // localStorage / navigator may be unavailable in test/SSR environments.
  }

  return 'en';
}

export const i18n = createI18n({
  legacy: false, // Use Composition API mode
  globalInjection: true, // Makes $t() / $d() / $n() available in all templates
  locale: resolveInitialLocale(),
  fallbackLocale: 'en',
  messages,
  // Use bracket notation so eslint-plugin-vue-i18n doesn't flag missing keys.
  missingWarn: false,
  fallbackWarn: false
});

/** Persist and apply a new locale at runtime. */
export function setLocale(locale: string): void {
  if (!(locale in SUPPORTED_LOCALES)) return;
  (i18n.global.locale as { value: string }).value = locale;
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  document.documentElement.setAttribute('lang', locale);
}

/** Return the currently active locale code. */
export function getLocale(): string {
  return (i18n.global.locale as { value: string }).value;
}
