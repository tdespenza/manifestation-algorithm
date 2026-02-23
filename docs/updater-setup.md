# Tauri Updater Setup

The auto-updater requires a signing key pair to verify update packages.  
The `pubkey` field in `src-tauri/tauri.conf.json` **must be replaced** with a real
public key before shipping a signed release.

---

## Generating a Key Pair

Run the Tauri signer tool once per project (store the private key securely — never commit it):

```bash
npx tauri signer generate -w ~/.tauri/manifestation-algorithm.key
```

This produces:
- **Private key** (`~/.tauri/manifestation-algorithm.key`) — used by the release CI to sign bundles.
- **Public key** (printed to stdout) — paste it into `tauri.conf.json`.

---

## Updating `tauri.conf.json`

Replace the placeholder value with the generated public key:

```json
"plugins": {
  "updater": {
    "pubkey": "<PASTE_YOUR_PUBLIC_KEY_HERE>",
    "endpoints": [
      "https://tdespenza.github.io/manifestation-algorithm/latest.json"
    ]
  }
}
```

---

## CI / Release Signing

Set the following environment secrets in your CI pipeline:

| Secret | Description |
|---|---|
| `TAURI_SIGNING_PRIVATE_KEY` | Contents of the `.key` file |
| `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` | Password chosen during key generation (can be empty) |

Tauri's build step automatically picks these up via the
[`tauri-action`](https://github.com/tauri-apps/tauri-action).

---

## Current Placeholder

The value `dW50cnVzdGVkLWtleS1wbGVhc2UtcmVwbGFjZQ==` (base64 for
`"untrusted-key-please-replace"`) is committed as a development placeholder.
It must be replaced before any signed release bundle is built.
