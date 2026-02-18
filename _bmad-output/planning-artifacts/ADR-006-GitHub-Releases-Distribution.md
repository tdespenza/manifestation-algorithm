# ADR-006: Distribution Strategy - GitHub Releases + GitHub Actions Automation

**Date**: 2026-02-18  
**Status**: Accepted  
**Context**: Need to distribute installers to Windows, macOS, and Linux users with automatic updates  
**Deciders**: DevOps Lead, Release Manager  

---

## Problem Statement

Need to:
- Distribute installers to three platforms (Windows/macOS/Linux)
- Code sign binaries for security
- Notarize macOS app (Gatekeeper compliance)
- Automate builds (eliminate manual process)
- Support automatic updates
- Zero cost for hosting and CI/CD

Multiple distribution approaches exist.

---

## Decision

**Use GitHub Releases as primary distribution channel with GitHub Actions for automated builds and code signing.**

---

## Rationale

### Zero Cost
- **GitHub Releases**: Free file hosting (unlimited capacity)
- **GitHub Actions**: Free CI/CD (unlimited for public repos)
- **Alternative**: AWS S3 ($0.023/GB), Fastly CDN ($0.12/GB)
- **Advantage**: Saves $500-2000/month at scale

### Familiar to Users
- **GitHub**: Most developers already have accounts
- **Direct download**: No redirect services needed
- **Trust**: GitHub domain is trusted, not suspicious URL
- **Advantage**: Lowest friction installation experience

### Built-in Versioning
```
https://github.com/org/manifestation-algorithm/releases
├── v1.0.0 (released 2026-02-15)
├── v1.0.1 (released 2026-03-01)
└── v1.1.0 (released 2026-04-15)

Each release contains:
├── Manifestation-Algorithm-1.0.0_x64.msi
├── Manifestation-Algorithm-1.0.0_x64.dmg
├── Manifestation-Algorithm-1.0.0_aarch64.dmg
├── Manifestation-Algorithm-1.0.0_amd64.AppImage
└── manifest.json (for auto-updates)
```

### Automatic Updates Simplicity
- Tauri auto-update reads latest release
- No custom update server needed
- No update infrastructure to maintain
- Works offline (downloads when next online)
- **Advantage**: Update system becomes <50 lines of config

### Transparent Build Process
- Source code on GitHub
- GitHub Actions runs publicly
- Users can verify builds from source
- Builds are reproducible
- **Advantage**: Trust through transparency

### Integration with CI/CD
```yaml
# .github/workflows/release.yml
name: Release
on:
  push:
    tags: ['v*']

jobs:
  build:
    strategy:
      matrix:
        platform:
          - ubuntu-latest
          - windows-latest
          - macos-latest
          - macos-11  # Apple Silicon
    
    runs-on: ${{ matrix.platform }}
    steps:
      - uses: actions/checkout@v3
      - run: npm run tauri build
      - uses: softprops/action-gh-release@v1
        with:
          files: src-tauri/target/release/bundle/**/*
```

Works automatically: `git tag v1.0.0 && git push origin v1.0.0`

---

## Consequences

### Positive
✅ Zero infrastructure costs  
✅ Familiar to developers  
✅ Automatic builds with CI/CD  
✅ Transparent/verifiable process  
✅ GitHub Actions free tier covers our needs  
✅ No vendor lock-in (can move elsewhere)  
✅ Web-accessible release notes and downloads  
✅ Release history permanent and public  

### Negative
❌ GitHub rate limits (generous, not a problem)  
❌ Requires public repository (source code public)  
❌ GH not ideal for non-developer users (but works)  
❌ No automatic changelog generation (manual ok)  

### Mitigation
- Public source code is feature (privacy transparency)
- Create installation quick-start docs for non-technical
- Redirect from simple domain (if wanted)
- GitHub provides release notes template

---

## Alternatives Considered

### 1. Traditional Web Server + CDN
**Pros**: Full control, custom analytics  
**Cons**: $500-2000/month, ops burden, server maintenance  
**Decision Rationale**: GitHub free, reduces infrastructure  

### 2. Application Installer Services (e.g., Squirrel)
**Pros**: Auto-update, analytics, progress tracking  
**Cons**: Expensive, overkill, vendor lock-in  
**Decision Rationale**: Tauri built-in auto-update sufficient  

### 3. Microsoft Store / Mac App Store / Snap
**Pros**: Discovery, official channels  
**Cons**: Review delays, store tax (15-30%), restrictions  
**Decision Rationale**: Start with GitHub, add stores later (optional)  

### 4. Package Managers Only (Homebrew, Snap, AUR)
**Pros**: Native for users of those systems  
**Cons**: Limited to tech-savvy users, approval process  
**Decision Rationale**: GitHub is primary, stores as secondary  

### 5. Direct File Hosting (AWS S3)
**Pros**: Scalable, reliable  
**Cons**: $500+/month, ops overhead  
**Decision Rationale**: GitHub better for distribution  

---

## Architecture

### Release Flow
```
Developer pushes code
    ↓
git tag v1.0.0
git push origin v1.0.0
    ↓
GitHub webhook triggers Actions
    ↓
GitHub Actions runs on 4 platforms (matrix):
  ├─ ubuntu-latest (Linux AppImage)
  ├─ windows-latest (Windows MSI)
  ├─ macos-latest (macOS Intel x64)
  └─ macos-11 (macOS Apple Silicon aarch64)
    ↓
Each platform:
  ├─ Checkout code
  ├─ Install dependencies
  ├─ Build frontend (Vite)
  ├─ Compile backend (Rust)
  ├─ Code sign (Windows cert + SDK)
  ├─ Notarize (macOS → Apple servers)
  └─ Create installer
    ↓
All artifacts upload to GitHub Release
    ↓
GitHub Release published automatically
    ↓
Users' auto-update checks GitHub
    ↓
Download latest installer
    ↓
Install on next app close
```

### Release Manifest (for auto-updates)
```json
{
  "version": "1.0.1",
  "notes": "Bug fixes and performance improvements",
  "pub_date": "2026-03-01T12:00:00Z",
  "platforms": {
    "windows-x86_64": {
      "signature": "...",
      "url": "https://github.com/user/repo/releases/download/v1.0.1/..."
    },
    "darwin-x86_64": { "signature": "...", "url": "..." },
    "darwin-aarch64": { "signature": "...", "url": "..." },
    "linux-x86_64": { "signature": "...", "url": "..." }
  }
}
```

---

## Implementation Checklist

### Initial Setup (Week 15)
- [ ] Create `.github/workflows/release.yml`
- [ ] Configure code signing credentials in GitHub Secrets
- [ ] Test on all platforms (ubuntu, windows, macos, macos-arm)
- [ ] Verify release artifacts generated
- [ ] Verify code signatures valid

### Release Process (Every v1.x.x)
- [ ] Update version numbers (package.json, tauri.conf.json)
- [ ] Write release notes
- [ ] Create git tag: `git tag v1.x.x`
- [ ] Push tag: `git push origin v1.x.x`
- [ ] Wait for GitHub Actions (30-60 min)
- [ ] Verify all artifacts on release page
- [ ] Publish release (go live)
- [ ] Announce on social media

### Auto-Update Configuration
```json
{
  "updater": {
    "active": true,
    "dialog": true,
    "endpoints": [
      "https://releases.githubusercontent.com/repos/user/manifestation-algorithm/releases/latest"
    ],
    "windows": { "installationMode": "quiet" }
  }
}
```

---

## Security Considerations

### Code Signing Flow
```
Code Signing Certificate (encrypted in GitHub Secrets)
    ↓
GitHub Actions runs in isolated container
    ↓
Decrypts certificate (only in GitHub)
    ↓
Signs all binaries
    ↓
Creates cryptographic signature
    ↓
Users' systems verify signature before install
```

### Verification by Users (Optional)
```bash
# Users can verify signature
gpg --verify Manifestation-Algorithm.asc Manifestation-Algorithm_x64.msi

# Or check file checksums
sha256sum -c checksums.txt
```

### Notarization (macOS)
```
GitHub Actions submits app to Apple
    ↓
Apple scans for malware (5-15 min)
    ↓
Apple returns notarization ticket
    ↓
GitHub staples ticket to app
    ↓
Users' macOS trusts app (no Gatekeeper warning)
```

---

## Cost Analysis

| Component | Cost | Service |
|-----------|------|---------|
| GitHub Releases hosting | $0 | GitHub |
| CI/CD builds | $0 | GitHub Actions (free tier) |
| Code signing cert | $0-100/yr | DigiCert EV or free |
| Notarization | $0 | Apple (free for notarization) |
| Domain (optional) | $12/yr | Any registrar |
| **Total annual cost** | **$12-112** | Minimal |

In contrast:
- Traditional app distribution:
  - Web hosting: $100-500/mo
  - CI/CD service: $100-500/mo
  - CDN: $200-1000/mo
  - Code signing: $200-500/yr
  - **Total: $5,000-18,000/year**

---

## Scaling Considerations

### At 100K Users
- GitHub bandwidth: ~500GB/month
- GitHub cost: Still free (100GB downloadable, not a concern)
- Concurrent downloads: GitHub handles automatically
- No performance degradation expected

### Geographical Distribution
- GitHub has servers worldwide
- Downloads automatically routed to closest edge
- No need for custom CDN
- Users get good speeds globally

### Redundancy
- GitHub uses CDN (Fastly/AWS CloudFront)
- If GitHub temporary outage, old versions still downloadable
- Updates can wait for GitHub to recover

---

## References

- [GitHub Releases Documentation](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Tauri Auto-Update Configuration](https://tauri.app/en/features/updater/)
- [Code Signing Best Practices](https://docs.microsoft.com/en-us/windows/win32/seccodeauth/signing-code-and-content)

---

## Related ADRs
- ADR-001: Tauri framework (includes built-in update support)

---

## Sign-Off
**Approved by**: DevOps Lead, Release Manager  
**Date**: 2026-02-18  

---

**Document End: ADR-006.md**
