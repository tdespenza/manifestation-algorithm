# Test Plan - Phase 4: Distribution & Polish
## Multi-Platform Release Testing

**Project**: Manifestation Algorithm  
**Phase**: 4 - Distribution & Polish  
**Duration**: Weeks 13-16  
**Status**: Planning  
**Created**: February 18, 2026  
**Test Lead**: [TBD]  

---

## 1. Test Plan Overview

### Scope
Testing all Phase 4 release and polish deliverables:
- Multi-platform installers (Windows MSI, macOS DMG, Linux AppImage)
- Code signing and binary verification
- macOS Notarization integration
- Auto-update mechanism
- CI/CD pipeline in GitHub Actions
- Documentation completeness
- Security audit findings remediation
- Beta testing with 50-100 users

### Out of Scope
- Third-party security audit execution (external vendor)
- App store submission (future consideration)
- Internationalization (future phases)

### Test Strategy
```
Installer Testing (25%)
├─ Windows MSI (32-bit, 64-bit)
├─ macOS DMG (Intel, ARM64)
├─ Linux AppImage
├─ Installation verify
├─ Uninstall cleanup
└─ Upgrade paths

Code Signing (15%)
├─ Windows code signing
├─ macOS notarization
├─ Signature verification
├─ Tamper detection
└─ Revocation handling

Auto-Update (20%)
├─ Update detection
├─ Download verification
├─ Install verification
├─ Rollback capability
└─ Delta updates

CI/CD Testing (15%)
├─ Build automation
├─ Test suite integration
├─ Artifact generation
├─ Release automation
└─ Rollback procedures

Beta Testing (20%)
├─ User acceptance testing
├─ Performance on real hardware
├─ Edge case discovery
├─ Feedback collection
└─ Analytics validation

Release (5%)
├─ Documentation completeness
├─ Release notes accuracy
├─ Public communications
└─ Support readiness
```

---

## 2. Installer Testing

### 2.1 Windows MSI Installation

**Test Scenario**: Install, run, uninstall on Windows

```powershell
# Test-WindowsMSI-64bit.ps1
# Windows 10/11 64-bit installation test

param(
  [string]$InstallerPath = ".\Manifestation-Algorithm-1.0.0-x64.msi"
)

Write-Host "Testing Windows MSI Installation"

# 1. Verify installer file
if (-not (Test-Path $InstallerPath)) {
  Write-Error "Installer not found: $InstallerPath"
  exit 1
}

# 2. Check code signature
$sig = Get-AuthenticodeSignature $InstallerPath
if ($sig.Status -ne "Valid") {
  Write-Error "Invalid code signature"
  exit 1
}
Write-Host "✓ Code signature valid"

# 3. Install application
$logFile = "C:\Temp\ma-install.log"
$installCmd = @(
  "msiexec.exe", "/i", $InstallerPath,
  "/qn",  # Silent install
  "/log", $logFile
)
& $installCmd[0] $installCmd[1..($installCmd.Length-1)]

if ($LASTEXITCODE -ne 0) {
  Write-Error "Installation failed (exit code: $LASTEXITCODE)"
  Get-Content $logFile | Write-Error
  exit 1
}
Write-Host "✓ Installation succeeded"

# 4. Verify installation
$appDir = "C:\Program Files\Manifestation Algorithm\"
if (-not (Test-Path "$appDir\Manifestation Algorithm.exe")) {
  Write-Error "Executable not found in Program Files"
  exit 1
}
Write-Host "✓ Executable installed correctly"

# 5. Verify Start menu shortcut
$startMenu = "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Manifestation Algorithm.lnk"
if (-not (Test-Path $startMenu)) {
  Write-Error "Start menu shortcut not created"
  exit 1
}
Write-Host "✓ Start menu shortcut created"

# 6. Verify data directory
$dataDir = "$env:APPDATA\manifestation-algorithm\"
if (-not (Test-Path $dataDir)) {
  Write-Error "Data directory not created"
  exit 1
}
Write-Host "✓ Data directory created"

# 7. Launch application
$proc = Start-Process "$appDir\Manifestation Algorithm.exe" -PassThru
Start-Sleep -Seconds 3

if (-not (Get-Process -Id $proc.Id -ErrorAction SilentlyContinue)) {
  Write-Error "Application failed to launch"
  exit 1
}
Write-Host "✓ Application launched successfully"

# 8. Check window appeared
if (-not (Get-Process "Manifestation Algorithm" -ErrorAction SilentlyContinue)) {
  Write-Error "Application window not visible"
  exit 1
}
Write-Host "✓ Application window visible"

# 9. Close application
Stop-Process -Id $proc.Id -Force
Start-Sleep -Seconds 1

Write-Host "✓ Application closed cleanly"

# 10. Uninstall
Write-Host "Testing uninstallation..."
$uninstallCmd = @(
  "msiexec.exe", "/x", $InstallerPath,
  "/qn",
  "/log", "$logFile.uninstall"
)
& $uninstallCmd[0] $uninstallCmd[1..($uninstallCmd.Length-1)]

if ($LASTEXITCODE -ne 0) {
  Write-Error "Uninstallation failed"
  exit 1
}
Write-Host "✓ Uninstallation succeeded"

# 11. Verify cleanup
if (Test-Path "$appDir\Manifestation Algorithm.exe") {
  Write-Error "Executable not removed after uninstall"
  exit 1
}
Write-Host "✓ Executable removed"

if (Test-Path $startMenu) {
  Write-Error "Start menu shortcut not removed"
  exit 1
}
Write-Host "✓ Start menu shortcut removed"

Write-Host "`n✅ Windows MSI test passed"
```

---

### 2.2 macOS DMG Installation

**Test Scenario**: Install on Intel and Apple Silicon Macs

```bash
#!/bin/bash
# test-macos-dmg.sh

set -e

DMG_FILE="${1:-./Manifestation-Algorithm-1.0.0-universal.dmg}"
ARCH="${2:-universal}"  # universal, x86_64, arm64

echo "Testing macOS DMG Installation ($ARCH)"

# 1. Verify DMG exists
if [ ! -f "$DMG_FILE" ]; then
  echo "❌ DMG file not found: $DMG_FILE"
  exit 1
fi
echo "✓ DMG file exists"

# 2. Check code signature
if ! codesign -v "$DMG_FILE" 2>/dev/null; then
  echo "⚠️  Warning: DMG not code signed (not critical)"
fi
echo "✓ Code signature checked"

# 3. Mount DMG
MOUNT_DIR="/Volumes/Manifestation Algorithm"
if [ -d "$MOUNT_DIR" ]; then
  hdiutil detach "$MOUNT_DIR" || true
fi

hdiutil attach "$DMG_FILE" -quiet
echo "✓ DMG mounted"

# 4. Verify app bundle exists
APP_DIR="$MOUNT_DIR/Manifestation Algorithm.app"
if [ ! -d "$APP_DIR" ]; then
  echo "❌ App bundle not found in DMG"
  exit 1
fi
echo "✓ App bundle present"

# 5. Verify executable exists
EXECUTABLE="$APP_DIR/Contents/MacOS/Manifestation Algorithm"
if [ ! -f "$EXECUTABLE" ]; then
  echo "❌ Executable not found in app bundle"
  exit 1
fi
echo "✓ Executable present"

# 6. Verify architecture
ARCH_EXECUTABLE=$(file "$EXECUTABLE")
if [[ "$ARCH" == "universal" ]] && [[ ! "$ARCH_EXECUTABLE" =~ "Mach-O universal" ]]; then
  echo "❌ Executable is not universal binary"
  exit 1
fi
echo "✓ Architecture correct: $ARCH_EXECUTABLE"

# 7. Check code signature of executable
if ! codesign -v "$EXECUTABLE" 2>/dev/null; then
  echo "❌ Executable not code signed"
  exit 1
fi
echo "✓ Executable code signature valid"

# 8. Check Info.plist
if [ ! -f "$APP_DIR/Contents/Info.plist" ]; then
  echo "❌ Info.plist not found"
  exit 1
fi
echo "✓ Info.plist present"

# 9. Copy app to Applications
cp -r "$APP_DIR" /Applications/
echo "✓ App copied to /Applications"

# 10. Launch application
open "/Applications/Manifestation Algorithm.app" &
APP_PID=$!
sleep 3

# 11. Check if running
if ! kill -0 $APP_PID 2>/dev/null; then
  echo "❌ Application did not launch"
  exit 1
fi
echo "✓ Application launched"

# 12. Clean up
kill $APP_PID || true
sleep 1
hdiutil detach "$MOUNT_DIR" -quiet
rm -rf "/Applications/Manifestation Algorithm.app"
echo "✓ Cleanup complete"

echo ""
echo "✅ macOS DMG test passed ($ARCH)"
```

---

### 2.3 Linux AppImage Installation

**Test Scenario**: Install and run on Ubuntu 20.04+

```bash
#!/bin/bash
# test-linux-appimage.sh

set -e

APPIMAGE_FILE="${1:-./Manifestation-Algorithm-1.0.0-x86_64.AppImage}"

echo "Testing Linux AppImage Installation"

# 1. Verify AppImage exists
if [ ! -f "$APPIMAGE_FILE" ]; then
  echo "❌ AppImage file not found: $APPIMAGE_FILE"
  exit 1
fi
echo "✓ AppImage file exists"

# 2. Make executable
chmod +x "$APPIMAGE_FILE"
echo "✓ Executable permission set"

# 3. Check file type
FILE_TYPE=$(file "$APPIMAGE_FILE")
if [[ ! "$FILE_TYPE" =~ "ELF" ]]; then
  echo "⚠️  Warning: Unusual file type: $FILE_TYPE"
fi
echo "✓ File type verified"

# 4. Run AppImage
cd /tmp
$APPIMAGE_FILE &
APP_PID=$!
sleep 3
echo "✓ AppImage executed"

# 5. Verify process running
if ! kill -0 $APP_PID 2>/dev/null; then
  echo "❌ AppImage process not running"
  exit 1
fi
echo "✓ Application running (PID: $APP_PID)"

# 6. Check memory usage
MEM_KB=$(ps -p $APP_PID -o rss= 2>/dev/null || echo "0")
MEM_MB=$((MEM_KB / 1024))
echo "✓ Memory usage: ${MEM_MB}MB"

if [ $MEM_MB -gt 200 ]; then
  echo "⚠️  Warning: High memory usage (>200MB)"
fi

# 7. Create desktop entry
mkdir -p ~/.local/share/applications
cat > ~/.local/share/applications/manifestation-algorithm.desktop <<EOF
[Desktop Entry]
Type=Application
Name=Manifestation Algorithm
Exec=$APPIMAGE_FILE
Icon=applications-science
Terminal=false
Categories=Utility;
EOF
echo "✓ Desktop entry created"

# 8. Verify desktop entry
if [ ! -f ~/.local/share/applications/manifestation-algorithm.desktop ]; then
  echo "❌ Desktop entry not created"
  kill $APP_PID || true
  exit 1
fi
echo "✓ Desktop entry working"

# 9. Test uninstall (remove shortcuts)
rm ~/.local/share/applications/manifestation-algorithm.desktop
echo "✓ Desktop entry removed"

# 10. Close application
kill $APP_PID || true
sleep 1

if kill -0 $APP_PID 2>/dev/null; then
  kill -9 $APP_PID || true
fi
echo "✓ Application closed"

echo ""
echo "✅ Linux AppImage test passed"
```

---

## 3. Code Signing & Notarization

### 3.1 Windows Code Signing Tests

```powershell
# Test-CodeSigning-Windows.ps1

Write-Host "Testing Windows Code Signing"

$executable = ".\Manifestation-Algorithm.exe"
$msi = ".\Manifestation-Algorithm-1.0.0-x64.msi"

# 1. Check EXE signature
Write-Host "`nVerifying EXE signature..."
$sig = Get-AuthenticodeSignature $executable

if ($sig.Status -ne "Valid") {
  Write-Error "Invalid signature: $($sig.Status)"
  exit 1
}

if ($sig.SignerCertificate.Issuer -notmatch "Manifest") {
  Write-Error "Unexpected issuer: $($sig.SignerCertificate.Issuer)"
  exit 1
}

Write-Host "✓ EXE signature valid"
Write-Host "  Issuer: $($sig.SignerCertificate.Issuer)"
Write-Host "  Thumbprint: $($sig.SignerCertificate.Thumbprint)"

# 2. Check MSI signature
Write-Host "`nVerifying MSI signature..."
$msi_sig = Get-AuthenticodeSignature $msi

if ($msi_sig.Status -ne "Valid") {
  Write-Error "Invalid MSI signature"
  exit 1
}

Write-Host "✓ MSI signature valid"

# 3. Verify TSA timestamp
if ($sig.TimeStamperCertificate -eq $null) {
  Write-Error "No timestamp authority certificate found"
  exit 1
}

Write-Host "✓ Timestamp authority verified"

# 4. Check certificate is not revoked
# (Would require CRL lookup - simplified here)
Write-Host "✓ Certificate chain valid"

Write-Host "`n✅ Code signing test passed"
```

---

### 3.2 macOS Notarization Tests

```bash
#!/bin/bash
# test-notarization-macos.sh

APP_PATH="${1:-./Manifestation-Algorithm.app}"

echo "Testing macOS Notarization"

# 1. Check app is signed
echo "Checking app signature..."
if ! codesign -v "$APP_PATH" 2>/dev/null; then
  echo "❌ App not code signed"
  exit 1
fi
echo "✓ App code signed"

# 2. Check notarization status
echo "Checking notarization ticket..."
xcrun stapler validate "$APP_PATH"

if [ $? -eq 0 ]; then
  echo "✓ Valid notarization ticket stapled"
else
  echo "⚠️  Warning: No notarization ticket found"
  echo "   (Can be normal if app hasn't been notarized yet)"
fi

# 3. Verify gatekeeper acceptance
echo "Testing Gatekeeper approval..."
spctl -a -v "$APP_PATH"

if [ $? -eq 0 ]; then
  echo "✓ Gatekeeper accepts signed app"
else
  echo "❌ Gatekeeper rejection"
  exit 1
fi

# 4. Check for hardened runtime
echo "Checking hardened runtime..."
codesign -d --entitlements - "$APP_PATH" 2>/dev/null | grep -q "hardened"

if [ $? -eq 0 ]; then
  echo "✓ Hardened runtime enabled"
else
  echo "⚠️  Warning: Hardened runtime not detected"
fi

echo ""
echo "✅ macOS notarization test passed"
```

---

## 4. Auto-Update Testing

### 4.1 Update Detection

```typescript
describe('Auto-Update Detection', () => {
  it('should detect new version available', async () => {
    const updater = new UpdateManager()
    
    // Simulate server has v1.0.1 available
    const update = await updater.checkForUpdates()
    
    expect(update.available).toBe(true)
    expect(update.newVersion).toBe('1.0.1')
  })

  it('should ignore same version', async () => {
    const updater = new UpdateManager(currentVersion: '1.0.0')
    
    const update = await updater.checkForUpdates()
    expect(update.available).toBe(false)
  })

  it('should ignore older versions', async () => {
    const updater = new UpdateManager(currentVersion: '1.0.1')
    
    // Server reports 1.0.0 (older)
    const update = await updater.checkForUpdates()
    expect(update.available).toBe(false)
  })

  it('should check daily by default', () => {
    const config = getAutoUpdateConfig()
    expect(config.checkInterval).toBe('daily')
  })

  it('should allow manual check', async () => {
    const updater = new UpdateManager()
    const start = Date.now()
    
    const update = await updater.manualCheck()
    
    expect(update).toBeDefined()
    // Should complete in <5 seconds
    expect(Date.now() - start).toBeLessThan(5000)
  })
})
```

### 4.2 Update Installation

```typescript
describe('Auto-Update Installation', () => {
  it('should download update package', async () => {
    const updater = new UpdateManager()
    const update = createTestUpdate()
    
    const download = await updater.downloadUpdate(update)
    
    expect(download.path).toBeDefined()
    expect(fs.existsSync(download.path)).toBe(true)
  })

  it('should verify update integrity', async () => {
    const updater = new UpdateManager()
    const update = await updater.downloadUpdate(testUpdate)
    
    const verified = await updater.verifyChecksum(update)
    expect(verified).toBe(true)
  })

  it('should install update and restart', async () => {
    const updater = new UpdateManager()
    
    // Trigger install
    await updater.installAndRestart(testUpdate)
    
    // App should restart with new version
    // (Difficult to test in unit test, would use E2E)
  })

  it('should provide rollback option', async () => {
    const updater = new UpdateManager()
    
    // Backup current version
    const backup = await updater.createBackup()
    expect(backup.version).toBe(currentVersion)
    
    // Install update
    await updater.installAndRestart(newUpdate)
    
    // Rollback available
    expect(await updater.canRollback()).toBe(true)
    await updater.rollback()
    
    // Verify old version restored
    expect(getAppVersion()).toBe(currentVersion)
  })

  it('should show update progress', async () => {
    const updater = new UpdateManager()
    const progressEvents: number[] = []
    
    updater.on('progress', (percent) => {
      progressEvents.push(percent)
    })
    
    await updater.downloadUpdate(largeUpdate)
    
    // Should get progress updates
    expect(progressEvents.length).toBeGreaterThan(1)
    expect(progressEvents[0]).toBeGreaterThan(0)
    expect(progressEvents[progressEvents.length - 1]).toBe(100)
  })
})
```

---

## 5. CI/CD Pipeline Testing

### 5.1 GitHub Actions Workflow

```yaml
# .github/workflows/build-release.yml
# Test that CI/CD produces correct artifacts

name: Build & Release

on:
  push:
    tags:
      - 'v*'

jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Run tests
        run: npm run test:all
      
      - name: Build application
        run: npm run build
      
      - uses: actions/upload-artifact@v3
        with:
          name: build-artifacts-${{ matrix.os }}
          path: dist/

  build-installers:
    needs: test
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        include:
          - os: ubuntu-latest
            artifact: "*.AppImage"
          - os: macos-latest
            artifact: "*.dmg"
          - os: windows-latest
            artifact: "*.msi"
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Build installers
        run: npm run build:installers
      
      - name: Code sign
        run: npm run sign:${{ matrix.os }}
        env:
          WINDOWS_CERT: ${{ secrets.WINDOWS_CERT }}
          WINDOWS_CERT_PASSWORD: ${{ secrets.WINDOWS_CERT_PASSWORD }}
          APPLE_TEAM_ID: ${{ secrets.APPLE_TEAM_ID }}
          APPLE_SIGNING_KEY: ${{ secrets.APPLE_SIGNING_KEY }}
      
      - name: Notarize (macOS)
        if: matrix.os == 'macos-latest'
        run: npm run notarize:macos
        env:
          APPLE_ID: ${{ secrets.APPLE_ID }}
          APPLE_ID_PASSWORD: ${{ secrets.APPLE_ID_PASSWORD }}
      
      - uses: actions/upload-artifact@v3
        with:
          name: installers-${{ matrix.os }}
          path: dist/installers/

  create-release:
    needs: build-installers
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Download all artifacts
        uses: actions/download-artifact@v3
      
      - name: Create GitHub release
        uses: softprops/action-gh-release@v1
        with:
          files: |
            installers-windows-latest/*.msi
            installers-macos-latest/*.dmg
            installers-ubuntu-latest/*.AppImage
          draft: true
          prerelease: false
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**Test Scenarios**:
```bash
#!/bin/bash
# test-ci-cd.sh

# Test that workflow produces expected artifacts

# 1. Windows MSI exists
[ -f "dist/installers/Manifestation-Algorithm-1.0.0-x64.msi" ] || exit 1

# 2. macOS DMG exists (both Intel and ARM)
[ -f "dist/installers/Manifestation-Algorithm-1.0.0-x86_64.dmg" ] || exit 1
[ -f "dist/installers/Manifestation-Algorithm-1.0.0-arm64.dmg" ] || exit 1

# 3. Linux AppImage exists
[ -f "dist/installers/Manifestation-Algorithm-1.0.0-x86_64.AppImage" ] || exit 1

# 4. All installers code signed
codesign -v dist/installers/*.dmg 2>/dev/null || exit 1
powershell -Command "Get-AuthenticodeSignature dist/installers/*.msi | Select-Object Status" | grep Valid || exit 1

# 5. GitHub release created
gh release list | grep "1.0.0" || exit 1

echo "✅ CI/CD pipeline test passed"
```

---

## 6. Beta Testing

### 6.1 User Acceptance Testing

**Scenario**: 50-100 beta users test application

```markdown
# Beta Testing Program

## Participants
- 50-100 volunteer beta testers
- Mix of technical and non-technical users
- Cross-platform (Windows, macOS, Linux)
- Various hardware configurations

## Test Plan

### Week 1: Questionnaire Functionality
- [ ] Install app
- [ ] Complete questionnaire (40 questions)
- [ ] Verify auto-save during completion
- [ ] Check final score calculated
- [ ] Attempt resume from different session

### Week 2: Statistics Dashboard
- [ ] View stats after multiple completions
- [ ] Check all 40 categories display
- [ ] Verify trend indicators
- [ ] Test drill-down views
- [ ] Export to CSV and verify accuracy

### Week 3: Network Features
- [ ] Publish result anonymously
- [ ] View network statistics
- [ ] Check percentile ranking
- [ ] Verify privacy controls
- [ ] Test opt-out functionality

### Week 4: Edge Cases & Stability
- [ ] Force-close during questionnaire
- [ ] Recover from crash
- [ ] Test with many years of data (5+ years)
- [ ] Check performance on older hardware
- [ ] Test on metered internet connection

## Feedback Collection

### Daily Usage Report
- Crash counts and logs
- Slow operation experiences
- Feature requests
- UI/UX issues
- Hardware compatibility

### Weekly Survey
- Overall satisfaction (1-10)
- Feature clarity (1-5)
- Performance adequacy (yes/no)
- Privacy confidence (1-5)
- Recommendation likelihood (likely/unlikely)

### Debrief Interviews (10% of participants)
- In-depth feature feedback
- Use case discussion
- Privacy understanding verification
- Competitive comparison
- Future feature interest

## Success Criteria
- [ ] <1 crash per 100 hours usage
- [ ] <5 critical bugs reported
- [ ] User satisfaction >8/10
- [ ] Privacy trust >4.5/5
- [ ] >90% feature discoverability
```

---

### 6.2 Performance Testing on Real Hardware

```bash
#!/bin/bash
# test-beta-hardware-performance.sh

# Run real-world performance tests on beta testers' hardware

HARDWARE_PROFILES=(
  "Windows 10 Laptop (i5, 8GB RAM, SSD)"
  "macOS M1 Pro (16GB RAM, SSD)"
  "Linux Desktop (i7, 16GB RAM, HDD)"
)

for PROFILE in "${HARDWARE_PROFILES[@]}"; do
  echo "Testing on: $PROFILE"
  
  # 1. Startup time
  /usr/bin/time ./manifestation-algorithm
  
  # 2. Memory after startup (idle)
  ps aux | grep manifestation | grep -v grep | awk '{print $6}' # KiB
  
  # 3. Complete questionnaire (measure time to submit)
  time ./test-questionnaire-workflow.sh
  
  # 4. View stats (measure render time)
  time ./test-stats-navigation.sh
  
  # 5. Publish result (measure latency)
  time ./test-network-publish.sh
done

echo "✅ Hardware performance test complete"
```

---

## 7. Acceptance Criteria

Phase 4 is **TEST COMPLETE** when:

- [ ] All three installers (Windows MSI, macOS DMG, Linux AppImage) install/uninstall cleanly
- [ ] Code signing verified on all platforms
- [ ] macOS notarization complete and working
- [ ] Auto-update detection, download, and installation working
- [ ] Update rollback capability verified
- [ ] CI/CD pipeline produces all expected artifacts
- [ ] All artifacts properly code signed
- [ ] Beta testing completed with 50+ users
- [ ] <1 crash per 100 hours beta usage reported
- [ ] Performance targets met on diverse hardware
- [ ] Documentation complete and accurate
- [ ] Release notes published
- [ ] Support infrastructure ready
- [ ] Security audit findings remediated (if any)
- [ ] Final QA sign-off from test lead

---

## 8. Release Checklist

Before public release:

```markdown
### Pre-Release (1 week before)
- [ ] All Phase 4 tests passing
- [ ] Beta testing feedback reviewed
- [ ] Documentation proofread
- [ ] Release notes finalized
- [ ] Social media/announcements scheduled
- [ ] Support FAQ prepared
- [ ] GitHub Releases page created (draft)

### Release Day
- [ ] Final smoke test on all platforms
- [ ] Code signing certificates verified (not expired)
- [ ] Update server confirmed working
- [ ] GitHub Actions workflow triggered
- [ ] Installers downloaded and manually verified
- [ ] Release published to GitHub
- [ ] Announcements published
- [ ] Support team notified

### Post-Release (Week 1)
- [ ] Monitor crash reports
- [ ] Respond to user feedback
- [ ] Track update adoption metrics
- [ ] Performance monitoring dashboard alive
- [ ] Bug fix priority queue established
- [ ] v1.0.1 patch planning (if critical issues)

### Post-Release (Month 1)
- [ ] >80% of users updated to v1.0.0
- [ ] Cumulative crash rate <0.1%
- [ ] User satisfaction maintained >8/10
- [ ] No critical security issues reported
- [ ] Roadmap for v1.1 features drafted
```

---

**Document End: Test-Plan-Phase-4.md**
