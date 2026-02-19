/**
 * Tauri API Mock for Playwright E2E tests.
 *
 * Injected via page.addInitScript() before the app loads.
 * Provides an in-memory SQLite-like implementation so the Vue app
 * can run in a plain Chromium/Firefox browser without a real Tauri backend.
 *
 * Mocked Tauri commands:
 *   plugin:sql|load   → returns a numeric resourceId
 *   plugin:sql|execute → persists rows in memDB
 *   plugin:sql|select  → queries rows from memDB
 *   plugin:sql|close   → no-op
 *   plugin:opener|open_url → no-op
 */
export const TAURI_MOCK_SCRIPT = String.raw`
(function () {
  // ── In-memory database ─────────────────────────────────────────────
  const memDB = {
    questionnaire_responses: [],   // { session_id, question_number, answer_value }
    settings: [],                  // { key, value }
    historical_sessions: [],       // { id, score, completed_at, answers_snapshot }
    historical_responses: [],      // { session_id, question_number, answer_value, recorded_at }
  };

  let nextResourceId = 1;

  // ── SQL helpers ────────────────────────────────────────────────────
  function parseInsertOrReplace(sql, params) {
    // INSERT [OR REPLACE] INTO <table> (...) VALUES (...)
    const tableMatch = sql.match(/INTO\s+(\w+)/i);
    if (!tableMatch) return;
    const table = tableMatch[1].toLowerCase();
    const rows = memDB[table];
    if (!rows) return;

    // Map $1,$2,... to actual params
    const values = sql.match(/VALUES\s*\(([^)]+)\)/i)?.[1].split(',') ?? [];
    const colsMatch = sql.match(/\(([^)]+)\)\s*VALUES/i)?.[1].split(',') ?? [];
    const cols = colsMatch.map(c => c.trim());
    const rowData = {};
    cols.forEach((col, i) => {
      const placeholder = values[i]?.trim();
      const idx = placeholder ? parseInt(placeholder.replace('$', '')) - 1 : -1;
      rowData[col] = idx >= 0 ? params[idx] : null;
    });

    // Remove existing row with same PK
    if (table === 'questionnaire_responses') {
      const idx = rows.findIndex(
        r => r.session_id === rowData.session_id && r.question_number === rowData.question_number
      );
      if (idx !== -1) rows.splice(idx, 1);
    } else if (table === 'settings') {
      const idx = rows.findIndex(r => r.key === rowData.key);
      if (idx !== -1) rows.splice(idx, 1);
    } else if (table === 'historical_sessions') {
      const idx = rows.findIndex(r => r.id === rowData.id);
      if (idx !== -1) rows.splice(idx, 1);
    } else if (table === 'historical_responses') {
      // always append (no unique constraint on session+question in this table)
    }

    memDB[table] = memDB[table] || [];
    memDB[table].push(rowData);
  }

  function parseDelete(sql, params) {
    const tableMatch = sql.match(/FROM\s+(\w+)/i);
    if (!tableMatch) return;
    const table = tableMatch[1].toLowerCase();
    const rows = memDB[table];
    if (!rows) return;
    
    const whereMatch = sql.match(/WHERE\s+(.+)/i);
    if (!whereMatch) { memDB[table] = []; return; }
    
    const condition = whereMatch[1].trim();
    
    if (condition.includes('session_id') && condition.includes('=')) {
      const val = params[0];
      const filtered = rows.filter(r => r.session_id !== val);
      memDB[table] = filtered;
    } else if (condition.includes('key') && condition.includes('=')) {
      const val = params[0];
      const filtered = rows.filter(r => r.key !== val);
      memDB[table] = filtered;
    }
  }

  function parseSelect(sql, params) {
    const tableMatch = sql.match(/FROM\s+(\w+)/i);
    if (!tableMatch) return [];
    const table = tableMatch[1].toLowerCase();
    const rows = memDB[table];
    if (!rows) return [];
    
    const whereMatch = sql.match(/WHERE\s+(.+?)(\s+ORDER|\s+LIMIT|\s+GROUP|$)/i);
    if (!whereMatch) return rows.slice();
    
    const condition = whereMatch[1].trim();
    
    if (condition.includes('session_id') && /=/.test(condition) && !condition.includes('LIKE')) {
      const val = params[0];
      return rows.filter(r => r.session_id === val);
    } else if (condition.toLowerCase().includes('key') && /=/.test(condition)) {
      const val = params[0];
      return rows.filter(r => r.key === val);
    }
    
    return rows.slice();
  }

  // ── Tauri IPC handler ──────────────────────────────────────────────
  async function handleInvoke(cmd, payload = {}) {
    switch (cmd) {
      case 'plugin:sql|load': {
        // plugin-sql v2 returns the path string back (not a resource id)
        return payload.db || 'sqlite:manifestation.db';
      }

      case 'plugin:sql|execute': {
        const { db: _db, query, values } = payload;
        const sql = query ? query.trim() : '';
        if (/^INSERT/i.test(sql) || /^UPSERT/i.test(sql)) {
          parseInsertOrReplace(sql, values || []);
        } else if (/^DELETE/i.test(sql)) {
          parseDelete(sql, values || []);
        } else if (/^UPDATE/i.test(sql)) {
          // no-op for now
        } else if (/^CREATE/i.test(sql) || /^ALTER/i.test(sql)) {
          // DDL — just ignore
        }
        return [1, 0]; // [rowsAffected, lastInsertId] — matches plugin-sql v2 destructuring
      }

      case 'plugin:sql|select': {
        const { db: _db, query, values } = payload;
        return parseSelect(query, values || []);
      }

      case 'plugin:sql|close': {
        return null;
      }

      case 'plugin:opener|open_url': {
        return null;
      }

      default:
        console.warn('[TauriMock] Unknown command:', cmd, payload);
        return null;
    }
  }

  // ── Patch window.__TAURI_INTERNALS__ ──────────────────────────────
  window.__TAURI_INTERNALS__ = {
    invoke: handleInvoke,
    postMessage: () => {},
    metadata: {
      currentWindow: {
        label: 'main',
      },
    },
    transformCallback: (fn) => {
      const id = Math.random().toString(36).slice(2);
      window[id] = fn;
      return id;
    },
    convertFileSrc: (src) => src,
    isTauri: true,
  };

  // Some Tauri versions also check window.__TAURI__
  window.__TAURI__ = {
    invoke: handleInvoke,
    isTauri: true,
  };

  // Expose helper to reset DB state between tests
  window.__tauriResetDB = function () {
    memDB.questionnaire_responses = [];
    memDB.settings = [];
    memDB.historical_sessions = [];
    memDB.historical_responses = [];
  };

  // Expose helper to seed DB state for tests
  window.__tauriSeedDB = function (data) {
    if (data.questionnaire_responses) memDB.questionnaire_responses = [...data.questionnaire_responses];
    if (data.settings) memDB.settings = [...data.settings];
    if (data.historical_sessions) memDB.historical_sessions = [...data.historical_sessions];
    if (data.historical_responses) memDB.historical_responses = [...data.historical_responses];
  };

  // Expose the in-memory store for test assertions
  window.__tauriGetDB = function () {
    return JSON.parse(JSON.stringify(memDB));
  };

  console.log('[TauriMock] Tauri API mock installed.');
})();
`;
