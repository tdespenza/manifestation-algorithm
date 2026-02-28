# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.10.0] - 2026-02-23
### Features
- Update notification flow to direct users to release page instead of auto-download

## [0.9.2] - 2026-02-23
### Other Changes
- Add unit tests for SessionList, OnboardingModal, useDateFilter, useSessionSelection, and PII contracts

- Created tests for SessionList component to verify rendering, selection, and deletion functionalities.
- Added tests for OnboardingModal component to ensure correct step navigation and emission of events.
- Implemented tests for useDateFilter composable to validate date range selection and session filtering.
- Developed tests for useSessionSelection composable to check session selection logic and deletion handling.
- Introduced PII contract tests to enforce privacy and data integrity standards across the application.
### Refactoring
- Move CategoryTrends and TrendPoint types to a centralized types file

## [0.9.1] - 2026-02-21
### Bug Fixes
- Change error to warning for missing updater artifacts and skip latest.json generation- Change error to warning for missing updater artifacts and skip latest.json generation

## [0.9.0] - 2026-02-21
### Features
- Enhance release workflow to build updater feed with signed artifacts

## [0.8.1] - 2026-02-21
### Features
- Add comprehensive multi-agent repository review for Manifestation Algorithm v0.7.1- Add comprehensive multi-agent repository review for Manifestation Algorithm v0.7.1

## [0.8.0] - 2026-02-21
### Features
- Enhance UI components with improved labels and styles for better user experience

## [0.7.1] - 2026-02-21
### Other Changes
- Refactor update notification tests to use a composable for update service

- Introduced `useUpdateService` composable to manage update state and logic.
- Updated `UpdateNotification` component tests to mock the new composable instead of Tauri plugins.
- Simplified test setup and assertions by using reactive state from the composable.
- Added tests for `getSetting` and `setSetting` methods in the database service.
- Enhanced questionnaire store tests to include save last session functionality.
- Created comprehensive tests for the new `useUpdateService` composable, covering all states and transitions.

## [0.7.0] - 2026-02-21
### Features
- Implement PDF export functionality with integration and E2E tests

## [0.6.0] - 2026-02-21
### Features
- Enhance Settings component tests and confirm dialog implementation- Add error handling and validation tests for questionnaire and export services

## [0.5.0] - 2026-02-20
### Maintenance
- Update package version to 0.4.6 and add jspdf dependency

## [0.4.6] - 2026-02-20
### Refactoring
- Streamline platform addition and release notes processing in release workflow

## [0.4.5] - 2026-02-20
### Features
- Add updater and process plugins, implement update notification component
### Refactoring
- Update workflow step names for consistency and clarity; change process capability from allow-relaunch to allow-restart

## [0.4.4] - 2026-02-20
### Documentation
- Remove redundant author update from README

## [0.4.3] - 2026-02-20
### Documentation
- Add disclaimer regarding affiliation with GIN in README and index.html- Add disclaimer regarding affiliation with GIN in README and index.html

## [0.4.2] - 2026-02-20
### Maintenance
- Remove copyright year from footer in README and index.html- Remove copyright year from footer in README and index.html

## [0.4.1] - 2026-02-20
### Refactoring
- Streamline GitHub Actions workflow for deploying pages- Streamline GitHub Actions workflow for deploying pages

## [0.4.0] - 2026-02-20
### Features
- Add pre-push hook to pull latest changes before pushing

## [0.3.6] - 2026-02-20
### Maintenance
- Update pages workflow to checkout main branch and remove obsolete config file- Update macOS target version from 13 to 14 in release workflow

## [0.3.4] - 2026-02-20
### Maintenance
- Re-enable macOS builds in release workflow and update footer copyright formatting

## [0.3.2] - 2026-02-20
### Bug Fixes
- Merge dev — bypass Jekyll for GitHub Pages deploy

## [0.3.1] - 2026-02-20
### Bug Fixes
- Bypass Jekyll — serve website/ as plain static files- Publish with partial builds — skip failed platforms, release the rest
### Maintenance
- Resolve merge conflict — keep v0.3.0 and com.manifestation.algorithm.app identifier

## [0.1.3] - 2026-02-20
### Bug Fixes
- Resolve build type errors — exclude tests from tsconfig, remove unused vars, fix readonly computed assignments- Track package-lock.json so setup-node cache and npm ci work in CI- Resolve all remaining code review issues- Update hashing method and score validation range in ManifestationResult- Downgrade actions/checkout and actions/setup-node to v4 in CI and release workflows- Downgrade actions/checkout to v4 in CI workflow and update page title in index.html- Update git push command to use personal access token in CI workflow- Preserve sharingEnabled state on invoke error in loadSharingState- Downgrade actions/checkout version and update CI workflow for manual dispatch- Update GH_TOKEN to use personal access token for CI workflow dispatch- Update auto-merge workflow to use PAT for tagging and enhance settings persistence- Fix: update auto-merge workflow to ensure tag pushes trigger downstream workflows and enhance Git remote configuration
fix: add additional dependencies for release workflow to support build requirements- Update release workflow to trigger on successful Auto-Merge and resolve version tag from package.json- Resolve sharing persistence, release race condition, TS path alias for tests- Navigate before resetDB so __tauriResetDB is defined in page context- Remove Jekyll front matter causing blank site; deploy only from main- E2e sharing toggle tests navigate to /dashboard with seeded sessions- Make test:all pass — fix 13 failing playwright tests- Resolve SQLITE_BUSY database is locked error on save- Delete existing release before creating draft to fix immutable release error- Use gh release edit to publish draft instead of softprops action- Add releaseDraft=true to tauri-action to prevent premature publish- Rewrite release workflow to eliminate immutable release errors- Use find dist -type f to avoid uploading directories as release assets- Split release create and asset upload to handle spaces in filenames- Delete both release and git tag before recreating to avoid immutable release error- Only delete release not tag - tag is owned by auto-merge and protected by ruleset- Trigger deploy on every release and fix broken download links- Update manifestation-app version to 0.1.2- Sync Cargo.lock version to prevent perpetual dirty state- Update version to 0.2.1 in package.json, Cargo.toml, Cargo.lock, and tauri.conf.json- Correct app identifier and add macOS minimum system version- Update Settings.spec.ts to use flushPromises and correct version number
### CI/CD
- Add auto-merge workflow and fix CI to run on dev branch- Standardise naming across all workflow files
### Documentation
- Add version management and git hooks setup documentation
### Features
- Initialize Tauri + Vue application with database integration and scoring system- Implement session expiry and settings UI (Tasks 4 & 7)- Add QuestionItem component with styling and tests- Implement schema migrations (Task 3)- Update Archon implementation status and enhance Questionnaire tests- Implement historical session tracking and enhance routing structure- Enhance dashboard with category trends, detailed views, and export functionality- Integrate libp2p for P2P networking and add network status component- Enhance network status component to display total manifestation results and update handling- Extend session timeout to 30 days and enhance questionnaire store functionality- Implement anonymous network sharing feature with toggle and state management- Add automatic version management with git pre-commit hook- Add github pages website with jekyll setup and deployment workflow- Redesign github pages with custom landing page and OS download buttons- Add initial project setup files including funding, issue templates, pull request template, governance, security policy, contributing guidelines, and changelog- Enhance Vite configuration for Tauri development with server settings and environment variables- Adjust scoring logic to default unanswered questions to 1 point- Update dependencies and enhance questionnaire submission logic with default values- Expand SQL permissions in default capabilities configuration- Update network status messages and improve connection handling logic- Enhance test coverage and code quality tools- Update CI workflows to enhance linting, testing, and release processes- Enhance questionnaire submission flow and add validation- Update scoring system to allow scores up to 10,000 and adjust related validations- Enhance ProgressChart to display trend colors based on score changes and update questionnaire store logic for default submissions- Feat: update README and documentation to reflect new scoring system and architecture changes, including max score adjustment to 10,100 points
fix: correct score validation range in ManifestationResult to 0–10,100 and update related tests
feat: enhance network architecture documentation with detailed privacy model and data flow
feat: add comprehensive database reference and Tauri IPC command documentation
fix: update home.spec.ts to reflect new max score in UI tests- Enhance navigation logo and update chart color logic for trend indication- Update app name and logo handling in configuration and components- Enhance pre-commit hook and update navigation logo text; improve chart color logic for downtrends- Remove release configuration from Tauri build step in CI workflow- Dashboard history uses full screen width- Export save dialog, toast notifications, progress bar, fix start-fresh- Delete sessions individually and in bulk, simplify pre-commit hook- 100% coverage, selection mode UI, e2e/integration delete tests, typecheck pre-commit- Auto-bump patch version on every commit via pre-commit hook- Commit-type-aware version bump via commit-msg hook- Auto-generate CHANGELOG.md and release notes via git-cliff- Feat(release): add Apple entitlements and update macOS minimum system version
fix(Settings): display dynamic app version in the settings component
fix(index.html): update footer credits and licensing information
### Maintenance
- Add MIT license- Update copyright information to include Giovanni Ilacqua- Update copyright information and add creator details in README- Update README with creator and updater details- Bump @types/uuid from 10.0.0 to 11.0.0- Bump actions/upload-pages-artifact from 3 to 4- Bump actions/configure-pages from 4 to 5- Bump actions/checkout from 4 to 6- Bump actions/setup-node from 4 to 6- Bump vite from 6.4.1 to 7.3.1- Bump @vitejs/plugin-vue from 5.2.4 to 6.0.4- Bump cid from 0.10.1 to 0.11.1 in /src-tauri- Bump vue-tsc from 2.2.12 to 3.2.4- Bump typescript from 5.6.3 to 5.9.3- Bump rand from 0.8.5 to 0.9.2 in /src-tauri- Bump env_logger from 0.10.2 to 0.11.9 in /src-tauri- Bump libp2p from 0.53.2 to 0.56.0 in /src-tauri- Move version bump to auto-merge workflow, remove from commit-msg hook- Merge dev into main — entitlements, signing, footer, dynamic version, test fixes
### Other Changes
- Initial commit- Add manifestation algorithm questionnaire HTML and JavaScript implementation- Add unit tests for various components and services

- Created tests for StatsPanel component to validate statistics calculations.
- Added tests for ResumeDialog component to ensure correct event emissions.
- Implemented tests for Settings component to verify settings functionality and interactions.
- Developed tests for SharingToggle component to check sharing state and interactions.
- Added tests for dbTrends service to validate data retrieval and processing.
- Created tests for history store to ensure correct state management and data fetching.
- Implemented tests for analysis utility functions to validate trend detection logic.
- Added tests for CategoryDetailView to ensure correct rendering and data handling.
- Created tests for DashboardView to validate loading states, data filtering, and export functionality.
- Added tests for HomeView to ensure correct rendering and component integration.
- Implemented tests for SettingsView to validate navigation and component rendering.- Add end-to-end tests for home, navigation, questionnaire, settings, and smoke scenarios

- Implement home page E2E tests to verify static content and Questionnaire component rendering.
- Create navigation E2E tests to ensure all top-level routes are reachable and navbar visibility.
- Develop comprehensive questionnaire E2E tests covering scroll and step-by-step modes, score updates, progress tracking, and submission flow.
- Add settings page E2E tests for navigation, rendering controls, and back behavior.
- Introduce a smoke test to validate the complete user journey from home to dashboard and back.
- Configure Playwright for E2E testing with appropriate settings and project definitions.
- Set up TypeScript configuration for E2E tests.- Add unit tests for session management, history, questionnaire, analysis, and views

- Implement tests for sessionManager service covering session state, touch, crash recovery, and discard functionality.
- Create tests for history store to validate fetching historical sessions and handling loading states and errors.
- Add tests for questionnaire store to ensure answers are loaded, set, and saved correctly, including session expiration handling.
- Introduce tests for the detectTrend utility function to assess trend detection logic based on input data.
- Develop comprehensive tests for CategoryDetailView and DashboardView to verify rendering, data fetching, and user interactions.
- Add tests for HomeView and SettingsView to ensure proper rendering and navigation behavior.- Refactor test files to remove unnecessary trailing commas and improve consistency

- Updated multiple test files to remove trailing commas in object literals and arrays for cleaner code.
- Ensured consistency across various test files including components, services, and views.
- Adjusted mock implementations to maintain uniformity in formatting.- Merge dev into main: code quality tooling, parallel CI, and release workflow- Merge pull request #1 from tdespenza/dependabot/github_actions/actions/upload-pages-artifact-4

chore(deps): bump actions/upload-pages-artifact from 3 to 4- Merge pull request #2 from tdespenza/dependabot/github_actions/actions/configure-pages-5

chore(deps): bump actions/configure-pages from 4 to 5- Merge pull request #3 from tdespenza/dependabot/github_actions/actions/checkout-6

chore(deps): bump actions/checkout from 4 to 6- Merge pull request #4 from tdespenza/dependabot/github_actions/actions/setup-node-6

chore(deps): bump actions/setup-node from 4 to 6- Merge pull request #5 from tdespenza/dependabot/npm_and_yarn/vite-7.3.1

chore(deps-dev): bump vite from 6.4.1 to 7.3.1- Merge pull request #6 from tdespenza/dependabot/npm_and_yarn/vitejs/plugin-vue-6.0.4

chore(deps-dev): bump @vitejs/plugin-vue from 5.2.4 to 6.0.4- Merge pull request #7 from tdespenza/dependabot/npm_and_yarn/types/uuid-11.0.0

chore(deps-dev): bump @types/uuid from 10.0.0 to 11.0.0- Merge pull request #8 from tdespenza/dependabot/cargo/src-tauri/cid-0.11.1

chore(deps): bump cid from 0.10.1 to 0.11.1 in /src-tauri- Merge pull request #9 from tdespenza/dependabot/npm_and_yarn/vue-tsc-3.2.4

chore(deps-dev): bump vue-tsc from 2.2.12 to 3.2.4- Merge pull request #10 from tdespenza/dependabot/npm_and_yarn/typescript-5.9.3

chore(deps-dev): bump typescript from 5.6.3 to 5.9.3- Merge pull request #11 from tdespenza/dependabot/cargo/src-tauri/rand-0.9.2

chore(deps): bump rand from 0.8.5 to 0.9.2 in /src-tauri- Merge pull request #12 from tdespenza/dependabot/cargo/src-tauri/env_logger-0.11.9

chore(deps): bump env_logger from 0.10.2 to 0.11.9 in /src-tauri- Merge pull request #13 from tdespenza/dependabot/cargo/src-tauri/libp2p-0.56.0

chore(deps): bump libp2p from 0.53.2 to 0.56.0 in /src-tauri- Add logo SVG files for Manifestation Algorithm

- Created a new SVG logo file in both src/assets and website directories.
- The logo features a gold gradient design with a globe and compass elements.- Improve Network Rankings card with better spacing and visual hierarchy
### Styling
- Update color scheme and enhance button hover effects in index.html- Update color scheme and enhance hover effects in index.html- Update color scheme and hover effects in index.html
### Testing
- Add unit tests for Questionnaire and Database services


