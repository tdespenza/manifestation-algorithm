/**
 * Vitest global setup — runs before every test file.
 *
 * Installs the vue-i18n plugin into @vue/test-utils' global config so that
 * all component tests have access to `$t()` / `useI18n()` without each test
 * file needing to set up the plugin manually.
 */
import { config } from '@vue/test-utils';
import { i18n } from '../src/i18n';

config.global.plugins = [...(config.global.plugins ?? []), i18n];
