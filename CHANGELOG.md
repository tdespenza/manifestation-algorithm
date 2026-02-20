# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2026-02-20
### Features
- Add pre-push hook to pull latest changes before pushing

## [0.3.2] - 2026-02-20
### Bug Fixes
- Merge dev — bypass Jekyll for GitHub Pages deploy

## [0.3.1] - 2026-02-20
### Bug Fixes
- Bypass Jekyll — serve website/ as plain static files- Publish with partial builds — skip failed platforms, release the rest
### Features
- Build separate Intel + Apple Silicon DMGs, direct download links on website, sync dev after auto-merge

## [0.1.3] - 2026-02-20
### Bug Fixes
- Resolve build type errors — exclude tests from tsconfig, remove unused vars, fix readonly computed assignments- Track package-lock.json so setup-node cache and npm ci work in CI- Resolve all remaining code review issues- Update hashing method and score validation range in ManifestationResult- Downgrade actions/checkout and actions/setup-node to v4 in CI and release workflows- Downgrade actions/checkout to v4 in CI workflow and update page title in index.html- Update git push command to use personal access token in CI workflow- Preserve sharingEnabled state on invoke error in loadSharingState- Downgrade actions/checkout version and update CI workflow for manual dispatch- Update GH_TOKEN to use personal access token for CI workflow dispatch- Update auto-merge workflow to use PAT for tagging and enhance settings persistence- Update release workflow to trigger on successful Auto-Merge and resolve version tag from package.json- Resolve sharing persistence, release race condition, TS path alias for tests- Navigate before resetDB so __tauriResetDB is defined in page context- Remove Jekyll front matter causing blank site; deploy only from main- E2e sharing toggle tests navigate to /dashboard with seeded sessions- Make test:all pass — fix 13 failing playwright tests- Resolve SQLITE_BUSY database is locked error on save- Delete existing release before creating draft to fix immutable release error- Use gh release edit to publish draft instead of softprops action- Add releaseDraft=true to tauri-action to prevent premature publish- Rewrite release workflow to eliminate immutable release errors- Use find dist -type f to avoid uploading directories as release assets- Split release create and asset upload to handle spaces in filenames- Delete both release and git tag before recreating to avoid immutable release error- Only delete release not tag - tag is owned by auto-merge and protected by ruleset- Trigger deploy on every release and fix broken download links- Update manifestation-app version to 0.1.2- Sync Cargo.lock version to prevent perpetual dirty state- Update version to 0.2.1 in package.json, Cargo.toml, Cargo.lock, and tauri.conf.json- Correct app identifier and add macOS minimum system version- Update Settings.spec.ts to use flushPromises and correct version number
### Documentation
- Add version management and git hooks setup documentation
### Features
- Initialize Tauri + Vue application with database integration and scoring system- Implement session expiry and settings UI (Tasks 4 & 7)- Add QuestionItem component with styling and tests- Implement schema migrations (Task 3)- Update Archon implementation status and enhance Questionnaire tests- Implement historical session tracking and enhance routing structure- Enhance dashboard with category trends, detailed views, and export functionality- Integrate libp2p for P2P networking and add network status component- Enhance network status component to display total manifestation results and update handling- Extend session timeout to 30 days and enhance questionnaire store functionality- Implement anonymous network sharing feature with toggle and state management- Add automatic version management with git pre-commit hook- Add github pages website with jekyll setup and deployment workflow- Redesign github pages with custom landing page and OS download buttons- Add initial project setup files including funding, issue templates, pull request template, governance, security policy, contributing guidelines, and changelog- Enhance Vite configuration for Tauri development with server settings and environment variables- Adjust scoring logic to default unanswered questions to 1 point- Update dependencies and enhance questionnaire submission logic with default values- Expand SQL permissions in default capabilities configuration- Update network status messages and improve connection handling logic- Enhance test coverage and code quality tools- Update CI workflows to enhance linting, testing, and release processes- Enhance questionnaire submission flow and add validation- Update scoring system to allow scores up to 10,000 and adjust related validations- Enhance ProgressChart to display trend colors based on score changes and update questionnaire store logic for default submissions- Enhance navigation logo and update chart color logic for trend indication- Update app name and logo handling in configuration and components- Enhance pre-commit hook and update navigation logo text; improve chart color logic for downtrends- Remove release configuration from Tauri build step in CI workflow- Dashboard history uses full screen width- Export save dialog, toast notifications, progress bar, fix start-fresh- Delete sessions individually and in bulk, simplify pre-commit hook- 100% coverage, selection mode UI, e2e/integration delete tests, typecheck pre-commit- Auto-bump patch version on every commit via pre-commit hook- Commit-type-aware version bump via commit-msg hook- Auto-generate CHANGELOG.md and release notes via git-cliff
### Styling
- Update color scheme and enhance button hover effects in index.html- Update color scheme and enhance hover effects in index.html- Update color scheme and hover effects in index.html
### Testing
- Add unit tests for Questionnaire and Database services
### Design
- Improve Network Rankings card with better spacing and visual hierarchy


