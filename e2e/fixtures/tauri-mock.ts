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
    _sharingEnabled: false,        // persisted sharing opt-in state
    // Optional fake update metadata returned by plugin:updater|check.
    // Tests can pre-set window.__tauriPresetUpdate (init script) or call
    // window.__setMockUpdate(data) at runtime.
    _mockUpdate: window.__tauriPresetUpdate || null,
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
    
    // Handle IN (...) bulk delete: DELETE FROM table WHERE col IN ($1, $2, ...)
    if (/\bIN\s*\(/i.test(condition)) {
      const colMatch = condition.match(/(\w+)\s+IN/i);
      if (colMatch) {
        const col = colMatch[1].toLowerCase();
        const vals = new Set(params.map(String));
        memDB[table] = rows.filter(r => !vals.has(String(r[col])));
      }
      return;
    }

    // Handle equality: WHERE session_id = $1 | WHERE key = $1 | WHERE id = $1
    if (condition.includes('session_id') && /=/.test(condition)) {
      const val = params[0];
      memDB[table] = rows.filter(r => r.session_id !== val);
    } else if (condition.toLowerCase().includes('key') && /=/.test(condition)) {
      const val = params[0];
      memDB[table] = rows.filter(r => r.key !== val);
    } else if (/\bid\s*=/i.test(condition)) {
      const val = params[0];
      memDB[table] = rows.filter(r => r.id !== val);
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

      case 'get_network_sharing': {
        return memDB._sharingEnabled === true;
      }

      case 'set_network_sharing': {
        memDB._sharingEnabled = payload.enabled === true;
        return null;
      }

      case 'get_peer_count': {
        return 0;
      }

      case 'plugin:updater|check': {
        // Returns null by default (no update). Tests can call
        // window.__setMockUpdate({ version, body, ... }) to simulate an update.
        return memDB._mockUpdate || null;
      }

      case 'plugin:updater|download_and_install': {
        // 'payload.onEvent' is the Channel object created by the SDK.
        // Its 'id' property is the key under which window[id] holds the
        // callback registered by Channel via transformCallback.
        // Fire mock download-progress events so the composable transitions
        // through downloading -> ready correctly in E2E tests.
        const channel = payload.onEvent;
        if (channel && channel.id && typeof window[channel.id] === 'function') {
          const cb = window[channel.id];
          cb({ index: 0, message: { event: 'Started', data: { contentLength: 1024 } } });
          cb({ index: 1, message: { event: 'Progress', data: { chunkLength: 512 } } });
          cb({ index: 2, message: { event: 'Progress', data: { chunkLength: 512 } } });
          cb({ index: 3, message: { event: 'Finished', data: {} } });
          // Signal end-of-channel so Channel cleans up its callback
          cb({ index: 4, end: true });
        }
        return null;
      }

      case 'plugin:resources|close': {
        // No-op: satisfies Resource.close() called by Update cleanup.
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
    unregisterCallback: (id) => {
      delete window[id];
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
    memDB._sharingEnabled = false;
    memDB._mockUpdate = null;
  };

  /**
   * Set or clear the fake update returned by plugin:updater|check.
   * Call with null to simulate "no update available".
   * Call with { version, body } to simulate an available update.
   */
  window.__setMockUpdate = function (data) {
    if (!data) {
      memDB._mockUpdate = null;
      return;
    }
    memDB._mockUpdate = {
      rid: 1,
      version: data.version || '99.0.0',
      currentVersion: '0.0.0',
      date: null,
      body: data.body || '',
      rawJson: JSON.stringify(data),
    };
  };

  // Expose helper to seed DB state for tests
  window.__tauriSeedDB = function (data) {
    if (data.questionnaire_responses) memDB.questionnaire_responses = [...data.questionnaire_responses];
    if (data.settings) memDB.settings = [...data.settings];
    if (data.historical_sessions) memDB.historical_sessions = [...data.historical_sessions];
    if (data.historical_responses) memDB.historical_responses = [...data.historical_responses];
    if (typeof data._sharingEnabled === 'boolean') memDB._sharingEnabled = data._sharingEnabled;
  };

  // Expose the in-memory store for test assertions
  window.__tauriGetDB = function () {
    return JSON.parse(JSON.stringify(memDB));
  };

  console.log('[TauriMock] Tauri API mock installed.');
})();
`;
