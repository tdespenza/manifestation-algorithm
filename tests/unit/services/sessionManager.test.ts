/**
 * Tests for the session manager service.
 * Covers auto-save, session recovery, and crash detection logic.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

const SESSION_TIMEOUT_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

// Hoist DB mocks before vi.mock
const dbMocks = vi.hoisted(() => ({
  getLastActive: vi.fn(),
  updateLastActive: vi.fn().mockResolvedValue(undefined),
  clearSession: vi.fn().mockResolvedValue(undefined),
  loadHistoricalSessions: vi.fn().mockResolvedValue([])
}));

vi.mock('@/services/db', () => ({
  getLastActive: dbMocks.getLastActive,
  updateLastActive: dbMocks.updateLastActive,
  clearSession: dbMocks.clearSession,
  loadHistoricalSessions: dbMocks.loadHistoricalSessions
}));

import {
  getSessionState,
  touchSession,
  needsCrashRecovery,
  discardSession,
  getCompletedSessions
} from '@/services/sessionManager';

describe('sessionManager', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ── getSessionState ─────────────────────────────────────────────────────────

  describe('getSessionState', () => {
    it('returns null lastActive when no session exists', async () => {
      dbMocks.getLastActive.mockResolvedValue(null);
      const state = await getSessionState('test-session');

      expect(state.sessionId).toBe('test-session');
      expect(state.lastActive).toBeNull();
      expect(state.isExpired).toBe(false);
    });

    it('marks a recent session as NOT expired', async () => {
      const now = Date.now();
      dbMocks.getLastActive.mockResolvedValue(now.toString());

      const state = await getSessionState('test-session');

      expect(state.lastActive).toBe(now);
      expect(state.isExpired).toBe(false);
    });

    it('marks an old session as expired', async () => {
      const oldTime = Date.now() - SESSION_TIMEOUT_MS - 1000;
      dbMocks.getLastActive.mockResolvedValue(oldTime.toString());

      const state = await getSessionState('old-session');

      expect(state.isExpired).toBe(true);
    });

    it('marks a session exactly at the timeout boundary as expired', async () => {
      const boundary = Date.now() - SESSION_TIMEOUT_MS - 1;
      dbMocks.getLastActive.mockResolvedValue(boundary.toString());

      const state = await getSessionState('boundary-session');
      expect(state.isExpired).toBe(true);
    });
  });

  // ── touchSession ────────────────────────────────────────────────────────────

  describe('touchSession', () => {
    it('calls updateLastActive with the correct sessionId', async () => {
      await touchSession('my-session');
      expect(dbMocks.updateLastActive).toHaveBeenCalledWith('my-session');
    });
  });

  // ── needsCrashRecovery ──────────────────────────────────────────────────────

  describe('needsCrashRecovery', () => {
    it('returns false when no previous session exists', async () => {
      dbMocks.getLastActive.mockResolvedValue(null);
      expect(await needsCrashRecovery('new-session')).toBe(false);
    });

    it('returns true when a non-expired session exists', async () => {
      dbMocks.getLastActive.mockResolvedValue(Date.now().toString());
      expect(await needsCrashRecovery('active-session')).toBe(true);
    });

    it('returns false when session is expired', async () => {
      const expired = Date.now() - SESSION_TIMEOUT_MS - 5000;
      dbMocks.getLastActive.mockResolvedValue(expired.toString());
      expect(await needsCrashRecovery('expired-session')).toBe(false);
    });
  });

  // ── discardSession ──────────────────────────────────────────────────────────

  describe('discardSession', () => {
    it('calls clearSession with the correct sessionId', async () => {
      await discardSession('to-discard');
      expect(dbMocks.clearSession).toHaveBeenCalledWith('to-discard');
    });
  });

  // ── getCompletedSessions ────────────────────────────────────────────────────

  describe('getCompletedSessions', () => {
    it('returns results from loadHistoricalSessions', async () => {
      const fakeSessions = [{ id: 'hist-1', total_score: 7500 }];
      dbMocks.loadHistoricalSessions.mockResolvedValue(fakeSessions);

      const result = await getCompletedSessions();
      expect(result).toEqual(fakeSessions);
    });

    it('returns empty array when no historical sessions', async () => {
      dbMocks.loadHistoricalSessions.mockResolvedValue([]);
      const result = await getCompletedSessions();
      expect(result).toEqual([]);
    });
  });

  // ── auto-save integration ───────────────────────────────────────────────────

  describe('auto-save integration', () => {
    it('touchSession should update timestamp on each call', async () => {
      await touchSession('session-x');
      await touchSession('session-x');
      await touchSession('session-x');
      expect(dbMocks.updateLastActive).toHaveBeenCalledTimes(3);
    });

    it('discard followed by needsCrashRecovery returns false', async () => {
      await discardSession('clean');
      dbMocks.getLastActive.mockResolvedValue(null);
      expect(await needsCrashRecovery('clean')).toBe(false);
    });
  });
});
