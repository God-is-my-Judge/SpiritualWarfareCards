> Latest local edition: **Beta19** (October 19, 2026). Start with [BETA19-HANDOFF.md](BETA19-HANDOFF.md) and [BETA19-REVIEW.md](BETA19-REVIEW.md): repeated walkthroughs, contextual treasure/quest help, physical counterweight, modal feedback and slow-load recovery. Earlier edition sections are historical. No commit or push.

> Latest local edition: **Guides18a** (October 19, 2026). See [GUIDES18-HANDOFF.md](GUIDES18-HANDOFF.md) for directions, Rill/treasure fixes, battle recovery, Escape/focus behavior, the visible automatic Greenwood exit, validation and rebuild order. Earlier edition notes below remain historical. No commit or push.

> **Latest: Treasure17 — October 19.** Whole-game review and two connected Tideglass treasure lessons. Start with [TREASURE17-HANDOFF.md](TREASURE17-HANDOFF.md); earlier release sections are historical. Installed through More Games at `http://localhost:8000/Lantern-Road/dist/?v=treasure17`; source, package and installed-browser checks pass. Evidence is in `Source/verification/gamer17/`. No commit/push.

> **Latest: Quest16 · Glasswind and Tideglass, October 18.** Installed at `http://localhost:8000/Lantern-Road/dist/?v=quest16` and linked under More Games. Read [QUEST16-HANDOFF.md](QUEST16-HANDOFF.md) first; earlier release sections below are historical. Browser/package reports are in `Source/verification/quest16-*.json`. No commit or push was made.

# Upload The Lantern Road · Road15

The current workspace already installs this release at `Lantern-Road/dist/`, linked from `games.html` under More Games. For another host, unzip `Lantern-Road-Website.zip` and upload the entire `lantern-road/` folder under your existing website, for example `games/lantern-road/`. Link More Games to that directory's `index.html` or its directory URL. All runtime paths are relative. No npm install, backend, API key, live AI, or database is required.

Upload assets and scripts first, and replace `index.html` last. Keep the previous hashed files during rollout, or use your host's atomic folder/release switch. The package itself does not modify your site's navigation or publish anything.

Scripts, styles, images and music have content hashes in their filenames. `ASSET-MANIFEST.json` records the actual deployed SHA-256 digests and source names. Use `Cache-Control: no-cache` for `index.html`, the manifest, and editable Markdown. Hashed files can use `public, max-age=31536000, immutable`.

The game loads the current region's imagery on demand. The existing six-region image cache retains two recent regions; the opening's separate image cache also retains at most two opening scenes. Travel waits for destination images and recovers from loading errors. Metadata and Scripture are local and immediately available. There is no service worker; a cached website is not guaranteed offline.

Local saves retain `lantern-road.greenwood.v2` and the v2 schema. Serving on the same HTTPS origin preserves that browser's save, including private imports. A different domain, browser, device or `file:` URL has separate storage: export progress in Settings on the old game and import that JSON on the new game. Never clear site data as an upgrade step. Unchanged old runs stay where they were; Settings → Visit Reedbank home opens the new slice. New runs begin inside the home.

The separate `Lantern-Road-Offline.html` embeds the same code, cards, landscapes, sprites and music. It is large and uses more memory than the website. It was checked in Chromium with a `file:` URL; phone operating systems and Safari may handle local HTML/storage differently. The hosted edition is preferable on phones. Opening a local file does not transfer a hosted save automatically.

Keep `Lantern-Road-Source.zip` separately for editable JSON, Markdown, scripts, authoring tools, tests, screenshots, and the updated handoff. Runtime files are under `Source/dist/`. Rebuild with `python build-opening.py`, run the checks and visual-review procedure in the handoff / `Source/SCENE-AUTHORING.md`, then `python package-release.py`.

## tor12 local update

Open `http://localhost:8080/Lantern-Road/dist/?v=tor12` (or More Games). On Reedbank's far dock, interact with the ferryman for the optional Thornwake Tor action field. At the second bridge, north leads to the Elven Halls and east leads to Greenwood's Woodland Adventure Road. Three original books can be read at Greenwood camp, the mountain record-house, and the treehouse loft. Existing saves and supplied cards remain.

Arena controls: WASD/arrows move; K attack, Space dodge, E pickup/menu, Q switch, L guard, R lantern pulse, Escape menu/return boat. Controller: left stick/D-pad move, A attack, B dodge, X pickup/menu, Y switch, LB guard, RB pulse, Start menu, right stick aim. Ordinary-road controls keep their existing mapping.

## Leaf13 local update

Latest entry: `http://localhost:8080/Lantern-Road/dist/?v=leaf13`. This adds foliage-hidden discoveries, a slightly faster woodland root-worm, route signs, camp furnishings, corrected wall/furniture/tree boundaries, the loft lookout, automatic bed entry and a translucent touch joystick. Touch movement and action buttons overlay the scene in fullscreen too. The supplied 84 cards, v2 save key, road links and prior progress remain. Tor12 is archived for rollback.


## Quest16 local edition

Use `http://localhost:8000/Lantern-Road/dist/?v=quest16` or More Games. Woodland eastern caravan: Glasswind. Reedbank festival dock: pictured Tideglass treasure ferry. Full scope, safe-save compatibility and remaining work are in `QUEST16-HANDOFF.md`. Chart gallery: `/Lantern-Road/Next/Quest16/Charts/`. The same origin and save key retain existing player progress; no reset is required.
