# InstaSaves — Offline Android PWA MVP

Local-only MVP. Saves Instagram URLs in IndexedDB, searches them offline, allows editing tags/notes, and exports JSON. No backend, account, cloud sync, or Instagram API.

The manifest declares `share_target` so an installed compatible Android/Chrome PWA can receive a shared URL.

For PWA installation, serve the folder over HTTPS (for example GitHub Pages) and install it from Chrome on Android. The host serves app files only; saves remain in local device storage.
