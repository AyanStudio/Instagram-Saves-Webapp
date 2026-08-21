# InstaSaves v3 — local-only Android PWA

This version is designed around the actual requirement: GitHub Pages (or another static host) only distributes the app files. Personal saves are stored in IndexedDB on the device using the browser/PWA origin. There is no backend, account, cloud database, or sync service.

## What changed
- Proper PNG 192x192 and 512x512 app icons.
- `display: standalone` and explicit app `id`.
- Android Web Share Target uses a POST request to `/share-target/`.
- The service worker intercepts that POST and redirects the shared URL into the app, including an offline-friendly path.
- IndexedDB remains the local source of truth.
- Search, edit, delete, export, import.

## Important limitation
This v3 does not yet retrieve Instagram's thumbnail/caption from the URL. It stores the URL locally and leaves metadata fields ready for the next step. Retrieving Instagram metadata is an internet operation and may be subject to browser CORS and Instagram/Meta API/terms constraints. It should be added only after testing the exact public-post metadata route.

## Installation/testing
1. Serve this folder over HTTPS. GitHub Pages is suitable because it only serves the static app files.
2. Open the URL in Chrome on Android.
3. Install the PWA as an app. A PWA must be installed before it can be registered as an OS share target.
4. From Instagram, choose Share and look for InstaSaves.
5. Shared links should be saved into this phone's IndexedDB.

If the app only appears as a normal shortcut and does not show an installable-app flow, open Chrome DevTools' Manifest/Installability diagnostics on a desktop against the same deployment to see what the browser is rejecting.
