/** @type {import('dependency-cruiser').IConfiguration} */
export default {
  options: {
    doNotFollow: {
      path: 'node_modules',
    },
    tsPreCompilationDeps: true,
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default'],
      extensions: ['.ts', '.tsx', '.vue', '.js'],
    },
    reporterOptions: {
      archi: {
        collapsePattern: '^(node_modules|src/components|src/views|src/services|src/stores|src/composables|src/utils|src/data|src/types)',
      },
      dot: {
        collapsePattern: '^node_modules',
      },
    },
  },

  forbidden: [
    // ── Circular dependencies ──────────────────────────────────────────────
    {
      name: 'no-circular',
      severity: 'error',
      comment: 'Circular dependencies cause unpredictable behavior and hard-to-trace bugs.',
      from: {},
      to: {
        circular: true,
      },
    },

    // ── Layer violations: Services must not depend on UI layers ───────────
    {
      name: 'services-no-ui',
      severity: 'error',
      comment:
        'Services are pure business logic — they must not import components, views, stores, or composables.',
      from: {
        path: '^src/services',
      },
      to: {
        path: '^src/(components|views|stores|composables)',
      },
    },

    // ── Layer violations: Utils must stay pure ────────────────────────────
    {
      name: 'utils-no-ui',
      severity: 'error',
      comment:
        'Utils are pure functions — they must not import anything from the UI or service layers.',
      from: {
        path: '^src/utils',
      },
      to: {
        path: '^src/(components|views|stores|composables|services)',
      },
    },

    // ── Layer violations: Data layer must stay pure ───────────────────────
    {
      name: 'data-no-runtime',
      severity: 'error',
      comment: 'Data files define static schemas — they must not import from runtime layers.',
      from: {
        path: '^src/data',
      },
      to: {
        path: '^src/(components|views|stores|composables|services|utils)',
      },
    },

    // ── Layer violations: Views must not import other views ───────────────
    {
      name: 'no-view-to-view',
      severity: 'warn',
      comment:
        'Views should be independent pages; cross-view imports suggest misplaced shared logic.',
      from: {
        path: '^src/views',
      },
      to: {
        path: '^src/views',
      },
    },

    // ── Layer violations: Stores must not import views or components ───────
    {
      name: 'stores-no-ui',
      severity: 'error',
      comment: 'Pinia stores handle state — they must not reach into the component layer.',
      from: {
        path: '^src/stores',
      },
      to: {
        path: '^src/(components|views)',
      },
    },

    // ── Layer violations: Composables must not import views ────────────────
    {
      name: 'composables-no-views',
      severity: 'error',
      comment: 'Composables are reusable logic — they must not depend on page-level views.',
      from: {
        path: '^src/composables',
      },
      to: {
        path: '^src/views',
      },
    },

    // ── Orphan detection ──────────────────────────────────────────────────
    {
      name: 'no-orphans',
      severity: 'warn',
      comment: 'Orphan modules are unused — clean them up or wire them in.',
      from: {
        orphan: true,
        pathNot: [
          '\\.d\\.ts$',
          'src/main\\.ts$',
          'src/vite-env\\.d\\.ts$',
          'src/App\\.vue$',
          'src/router/index\\.ts$',
        ],
      },
      to: {},
    },

    // ── No reaching into node_modules internals ───────────────────────────
    {
      name: 'no-unreachable-from-root',
      severity: 'info',
      comment: 'Detect modules that cannot be reached from the main entrypoint.',
      from: {
        path: 'src/main\\.ts$',
      },
      to: {
        path: '^src',
        reachable: false,
        pathNot: ['\\.d\\.ts$', 'src/vite-env\\.d\\.ts$'],
      },
    },
  ],
};
