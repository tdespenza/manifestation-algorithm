/**
 * Session Manager Service
 * Tracks active questionnaire sessions and provides utilities
 * for crash recovery and multi-session management.
 */
import { getLastActive, updateLastActive, clearSession, loadHistoricalSessions } from './db';

export interface SessionState {
  sessionId: string;
  lastActive: number | null;
  isExpired: boolean;
}

const SESSION_TIMEOUT_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

/**
 * Get the state of a session (last active time, expiry status).
 */
export async function getSessionState(sessionId: string): Promise<SessionState> {
  const lastActiveStr = await getLastActive(sessionId);
  const lastActive = lastActiveStr ? parseInt(lastActiveStr, 10) : null;
  const isExpired = lastActive !== null ? Date.now() - lastActive > SESSION_TIMEOUT_MS : false;
  return { sessionId, lastActive, isExpired };
}

/**
 * Touch the session to mark it as active (called on every user action).
 */
export async function touchSession(sessionId: string): Promise<void> {
  await updateLastActive(sessionId);
}

/**
 * Check if a crash recovery is needed:
 * Returns true if there is a non-expired session with saved data.
 */
export async function needsCrashRecovery(sessionId: string): Promise<boolean> {
  const state = await getSessionState(sessionId);
  return state.lastActive !== null && !state.isExpired;
}

/**
 * Discard a session and clear all its data.
 */
export async function discardSession(sessionId: string): Promise<void> {
  await clearSession(sessionId);
}

/**
 * Get a summary of all completed sessions.
 */
export async function getCompletedSessions() {
  return loadHistoricalSessions();
}
