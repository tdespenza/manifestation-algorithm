import { describe, it, expect } from 'vitest';
import { SESSION_TIMEOUT_MS } from '@/constants';

describe('constants', () => {
  it('SESSION_TIMEOUT_MS equals 30 days in milliseconds', () => {
    expect(SESSION_TIMEOUT_MS).toBe(30 * 24 * 60 * 60 * 1000);
  });
});
