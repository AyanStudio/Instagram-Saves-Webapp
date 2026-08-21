# InstaSaves — Offline Android PWA MVP v2

This build is local-only.

- IndexedDB stores saves on the device.
- Service worker caches the app shell for offline use.
- Android share_target is included in the manifest.
- Proper 192x192 and 512x512 PNG icons are included.
- No login, backend, cloud sync, or Instagram API is used.

## Android test
1. Serve this folder from HTTPS.
2. Open it in Chrome on Android.
3. In Chrome menu, use the install/add-to-home-screen option. A real installed PWA should open standalone; a browser shortcut is not enough for share-target registration.
4. After installation, open Instagram and use Share. InstaSaves should be available as a share target when Chrome/Android exposes web share targets.

## Important
The MVP stores only the Instagram URL and locally editable metadata. It does not download Instagram videos or fetch remote thumbnails yet.
