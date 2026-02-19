// @ts-check
import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  // --- Global ignores ---
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'playwright-report/**',
      'playwright-results/**',
      'src-tauri/**',
      '_bmad/**',
      '_bmad-output/**',
      'public/**',
      'website/**',
      'scripts/**',
      'check_coverage.js',
      'check_coverage.cjs',
      'check_sum.js',
    ],
  },

  // --- Base JS rules ---
  js.configs.recommended,

  // --- TypeScript rules ---
  ...tseslint.configs.recommended,

  // --- Vue 3 rules ---
  ...pluginVue.configs['flat/recommended'],

  // --- Prettier disables conflicting rules (must be last) ---
  prettierConfig,

  // --- Project-specific overrides ---
  {
    files: ['src/**/*.{ts,tsx,vue}', 'tests/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
        sourceType: 'module',
      },
    },
    rules: {
      // TypeScript
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      // TypeScript handles undefined globals via the DOM lib — no-undef is a JS-only concern
      'no-undef': 'off',

      // Vue
      'vue/multi-word-component-names': 'off', // App.vue is single-word intentionally
      'vue/no-v-html': 'warn',
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/define-macros-order': [
        'error',
        { order: ['defineProps', 'defineEmits'] },
      ],

      // General
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
    },
  },

  // --- Test files: relax some rules ---
  {
    files: ['tests/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
    },
  },
);
