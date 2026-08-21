# InstaSaves v5

Local-only PWA with IndexedDB, Android Share Target, offline shell, and JSON import/export.

For public Instagram posts/reels, v5 attempts Meta's tokenless Instagram oEmbed endpoint. Current web sources report that tokenless public oEmbed is available from 15 June 2026 and can return embed metadata including thumbnail information. citeturn276371search0turn276371search4

Important: this client does not upload or store your saved library on GitHub. The thumbnail/metadata request, when it succeeds, is a direct network request at save time; the resulting record is then stored in the phone's IndexedDB. If the browser blocks the request or the post is unsupported/private, the URL/shared text is still saved locally.

The app also provides JSON Export/Import for backups.
