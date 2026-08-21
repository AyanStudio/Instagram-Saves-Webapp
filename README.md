# InstaSaves v6

This is the v3-style version with automatic Android share saving preserved, plus a best-effort public Instagram metadata/thumbnail step.

- Share Instagram link -> InstaSaves automatically saves the URL immediately.
- Then the app attempts a public Instagram oEmbed request for title/author/thumbnail information.
- It also attempts to download the thumbnail into a local data URL so the card can remain visible offline. If the thumbnail request is blocked by browser CORS, it falls back to the remote thumbnail URL.
- IndexedDB is the source of truth on the device.
- No account, backend, Supabase, Firebase, sync, or video download.
- JSON Import/Export included.

The browser may block the metadata or image request because cross-origin access and Instagram/Meta policies can change. The automatic save itself does not depend on metadata succeeding.

MDN documents GET share targets for receiving title/text/URL, and notes that installed PWAs are required to appear in the system share dialog. citeturn155523search0turn155523search2
