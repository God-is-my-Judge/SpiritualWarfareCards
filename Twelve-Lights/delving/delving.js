/* The Delving · engine.
   Plain script, no build step. Reads window.DELVING (riddles.js) and exposes
   window.Delving = {mount(root, {elvish}), summary()}. Twelve-Lights.html loads both files
   the first time its Delving tab opens. See README.md for the design and handoff notes. */
(function delvingEngine() {
  'use strict';
  const D = window.DELVING;
  const BASE = 'Twelve-Lights/delving/';          // relative to Twelve-Lights.html
  const STORE = 'delving.v1';
  const SCENES = Object.assign({
    passage: 'scenes/passage.svg', door: 'scenes/door.svg', stair: 'scenes/stair.svg', hall: 'scenes/hall.svg',
    gems: 'scenes/gems.svg', river: 'scenes/river.svg', court: 'scenes/court.svg', deep: 'scenes/deep.svg', dawn: 'scenes/dawn.svg'
  }, D.scenes || {});
  /* Sol's paintings and their placement data (art/art.js, optional). Without it the stand-in SVGs above are used. */
  const ART = window.DELVING_ART || null;
  const ART_BASE = BASE + 'art/';
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Progress (per-viewer convenience; the game still works if storage is blocked) ── */
  let saved = {at: 'intro', opened: [], gems: [], keepsakes: [], shuffle: false, order: null};
  try { saved = Object.assign(saved, JSON.parse(localStorage.getItem(STORE)) || {}); } catch (_) {}
  // Old saves remain valid; malformed storage must never strand a player outside the mine.
  saved.opened = [...new Set(Array.isArray(saved.opened) ? saved.opened.filter(id => D.frames.some(f => f.id === id)) : [])];
  saved.gems = [...new Set(Array.isArray(saved.gems) ? saved.gems.filter(id => D.gems.some(g => g.id === id)) : [])];
  saved.keepsakes = [...new Set(Array.isArray(saved.keepsakes) ? saved.keepsakes.filter(k => D.frames.some(f => f.keepsake === k)) : [])];
  saved.work = saved.work && typeof saved.work === 'object' && !Array.isArray(saved.work) ? saved.work : {};
  function persist() { try { localStorage.setItem(STORE, JSON.stringify(saved)); } catch (_) {} }

  const live = saved.work;        // solved steps, hints and unfinished arrangements survive a revisit
  let root = null, ledgerOpen = false, armedToken = null, elvish = false;
  let navigating = false;

  /* ── Small helpers ── */
  const $ = (sel, el) => (el || root).querySelector(sel);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const frameById = id => D.frames.find(f => f.id === id);
  const mainDoors = D.frames.filter(f => !f.side);
  const actOf = f => D.acts.find(a => a.id === f.act);
  const gemOf = id => D.gems.find(g => g.id === id);
  const isOpened = f => saved.opened.includes(f.id);
  const gateway = ref => 'https://www.biblegateway.com/passage/?search=' + encodeURIComponent(ref) + '&version=CSB';
  const artScene = key => (ART && ART.scenes[key]) || null;
  const sceneKeyOf = f => f.scene || actOf(f).scene;
  // Absolute, because a relative url() inside a CSS custom property resolves against delving.css, not the page.
  const sceneUrl = key => new URL(artScene(key) ? ART_BASE + artScene(key).file : BASE + (SCENES[key] || SCENES.passage), document.baseURI).href;
  const preload = key => { const img = new Image(); img.src = sceneUrl(key); };
  const tokenValue = t => (t === 'π' ? Math.PI : Number(t));
  function shuffled(list, seed) {          // stable per frame, never the solved order
    const out = list.map((v, i) => [v, Math.sin(seed * 97 + i * 13) ]).sort((a, b) => a[1] - b[1]).map(x => x[0]);
    if (out.every((v, i) => v === list[i]) && out.length > 1) out.push(out.shift());
    return out;
  }
  /* The forty doors run in canonical order, or in a shuffled order the player chose (saved.order).
     Side chambers stay attached to the door they follow in the canonical order. */
  function sequence() {
    if (saved.shuffle && Array.isArray(saved.order) && saved.order.length === mainDoors.length && new Set(saved.order).size === mainDoors.length && saved.order.every(id => mainDoors.some(f => f.id === id))) return saved.order.map(frameById);
    return mainDoors;
  }
  function makeOrder() {
    const ids = mainDoors.map(f => f.id);
    for (let i = ids.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [ids[i], ids[j]] = [ids[j], ids[i]]; }
    return ids;
  }
  const position = f => sequence().indexOf(f) + 1;
  function canonicalBefore(f) { const i = D.frames.indexOf(f); for (let j = i - 1; j >= 0; j--) if (!D.frames[j].side) return D.frames[j]; return null; }
  function reachable(f) {
    if (isOpened(f)) return true;
    if (f.side) { const before = canonicalBefore(f); return !before || isOpened(before); }
    const seq = sequence(), i = seq.indexOf(f);
    return i <= 0 || isOpened(seq[i - 1]);
  }
  function nextMain(f) { const seq = sequence(); return seq[seq.indexOf(f) + 1] || null; }
  function sideAfter(f) { const n = D.frames[D.frames.indexOf(f) + 1]; return n && n.side ? n : null; }
  function returnFromSide(f) { const before = canonicalBefore(f); return before ? nextMain(before) : null; }
  function frameLabel(f) { return f.side ? 'Side chamber' : 'Door ' + num(position(f)) + ' of ' + num(mainDoors.length); }
  function stars(n) { return '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n); }
  function stateFor(f) {
    const old = live[f.id] || {};
    return live[f.id] = {
      solved: f.parts.map((_, i) => isOpened(f) || !!(Array.isArray(old.solved) && old.solved[i] === true)),
      hints: Math.min((f.hints || []).length, Math.max(0, Number.isInteger(old.hints) ? old.hints : 0)),
      drafts: Array.isArray(old.drafts) ? old.drafts : []
    };
  }
  function captureWork() {
    const riddle = root && $('.dv-riddle');
    const f = riddle && frameById(riddle.dataset.frame);
    if (!f || !live[f.id]) return;
    live[f.id].drafts = f.parts.map((p, i) => {
      const el = $(`[data-part="${i}"]`);
      if (!el || el.classList.contains('locked') || el.classList.contains('solved')) return null;
      if (p.kind === 'numbers') return [...el.querySelectorAll('[data-blank]')].map(b => b.value);
      if (p.kind === 'reflect') return el.querySelector('textarea').value;
      if (p.kind === 'multi') return [...el.querySelectorAll('[data-toggle][aria-pressed="true"]')].map(b => Number(b.dataset.toggle));
      if (p.kind === 'order') return [...el.querySelectorAll('[data-order-item]')].map(li => li.dataset.orderItem);
      if (p.kind === 'match') return [...el.querySelectorAll('[data-slot]')].map(sl => sl.dataset.filled || null);
      if (p.kind === 'formula') return [...el.querySelectorAll('[data-fslot]')].map(sl => sl.dataset.chip === undefined ? null : Number(sl.dataset.chip));
      return null;
    });
    persist();
  }
  function restoreWork(f, s) {
    f.parts.forEach((p, i) => {
      const el = $(`[data-part="${i}"]`), draft = s.drafts[i];
      if (!el || el.matches('.locked, .solved') || draft == null) return;
      if (p.kind === 'reflect' && typeof draft === 'string') el.querySelector('textarea').value = draft;
      if (!Array.isArray(draft)) return;
      if (p.kind === 'numbers') el.querySelectorAll('[data-blank]').forEach((b, k) => { b.value = typeof draft[k] === 'string' ? draft[k] : ''; b.nextElementSibling.innerHTML = numText(b.value); });
      if (p.kind === 'multi') el.querySelectorAll('[data-toggle]').forEach(b => b.setAttribute('aria-pressed', String(draft.includes(Number(b.dataset.toggle)))));
      if (p.kind === 'order' && draft.length === p.items.length && new Set(draft).size === p.items.length && draft.every(t => p.items.includes(t))) {
        const list = el.querySelector('.dv-order'), items = [...list.children];
        draft.forEach(t => list.append(items.find(li => li.dataset.orderItem === t)));
        [...list.children].forEach((li, k) => { li.querySelector('[data-up]').dataset.up = k; li.querySelector('[data-down]').dataset.down = k; });
      }
      if (p.kind === 'match') draft.forEach((t, k) => {
        const chip = [...el.querySelectorAll('[data-token]')].find(b => !b.hidden && b.dataset.token === t);
        const slot = el.querySelector(`[data-slot="${k}"]`);
        if (chip && slot) { placeIn(slot, t, el); chip.hidden = true; }
      });
      if (p.kind === 'formula') draft.forEach((n, k) => {
        if (!Number.isInteger(n)) return;
        // Older saves may refer to a duplicate physical tile; the bank now shows one reusable value.
        const index = p.tray.indexOf(p.tray[n]);
        const chip = el.querySelector(`[data-ftoken="${index}"]`), slot = el.querySelector(`[data-fslot="${k}"]`);
        if (chip && !chip.hidden && slot) slot.dispatchEvent(new CustomEvent('dv-drop', {detail: chip, bubbles: true}));
      });
    });
  }
  function gemSVG(color, size) {
    return `<svg class="dv-gem" width="${size}" height="${size}" viewBox="-16 -16 32 32" aria-hidden="true"><polygon points="0,-14 12,-4 7,13 -7,13 -12,-4" fill="${color}"/><polygon points="0,-14 12,-4 0,1" fill="#fff" opacity=".4"/><polygon points="-12,-4 0,1 -7,13" fill="#000" opacity=".18"/></svg>`;
  }
  /* Sol's gem icons come in 256, 64 and 14 px; pick the smallest that stays sharp. */
  function gemIcon(g, size) {
    const icon = ART && ART.gems[g.id];
    if (!icon) return gemSVG(g.color, size);
    const file = suffix => ART_BASE + icon + suffix + '.webp';
    const src = size <= 16 ? `src="${file('-14')}" srcset="${file('-14')} 1x, ${file('-64')} 4x"` : size <= 32 ? `src="${file('-64')}"` : `src="${file('')}"`;
    return `<img class="dv-gem" ${src} width="${size}" height="${size}" alt="" draggable="false">`;
  }

  /* ── Elvish numerals: the host page draws Tengwar with vectorNumeral()/numeralDigits().
     Notation only: values, answers and checking stay ordinary numbers. Prose keeps decimal digits;
     puzzle numbers (blanks, chips, slots, results, numeric options, door numbers) change. ── */
  const tengwar = () => elvish && typeof window.vectorNumeral === 'function' && typeof window.numeralDigits === 'function';
  const glyph = digits => `<span class="number-wrap" title="${digits}" aria-label="${digits}">${window.vectorNumeral(window.numeralDigits(digits))}</span>`;
  function num(value) { const t = String(value); return tengwar() && /^\d+$/.test(t) ? glyph(t) : esc(t); }
  function numText(text) { return tengwar() ? String(text).split(/(\d+(?:,\d{3})*)/).map((part, i) => (i % 2 ? glyph(part.replace(/,/g, '')) : esc(part))).join('') : esc(text); }

  /* ── Lighting: each chamber gets its own steady light (dimness, lantern tint, where the glow
     falls, flicker speed), derived from its id so it is the same on every visit. Sol's paintings
     carry their light baked in, so they only get an exposure near the painting's own. ── */
  function lightFor(key, art) {
    if (key === 'dawn') return '--dim:1;--glow:0;--flick:6s';
    let h = 2166136261; for (const c of key) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0;
    const r = () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0) % 1000) / 1000;
    if (art) return `--dim:${(art.exposure * (0.93 + r() * 0.07)).toFixed(3)}`;
    const tints = ['255,214,150', '255,186,110', '255,236,200', '205,222,255', '178,206,255', '255,200,170'];
    return `--dim:${(0.7 + r() * 0.3).toFixed(2)};--tint:${tints[Math.floor(r() * tints.length)]};--lx:${Math.round(18 + r() * 64)}%;--ly:${Math.round(22 + r() * 36)}%;--glow:${(0.16 + r() * 0.24).toFixed(2)};--flick:${(2.4 + r() * 2.6).toFixed(1)}s`;
  }

  /* Dark lettering needs pale stone behind it; on Sol's paintings (all mid to dark there) it is lit, gilded or silvered. */
  function engraveStyle(id, sceneKey) {
    let h = 0; for (const c of id) h = (h * 33 + c.charCodeAt(0)) >>> 0;
    const art = artScene(sceneKey);
    if (art && art.tone < 0.5) return ['glow', 'gilt', 'moon'][h % 3];
    return ['carved', 'gold', 'silver', 'glow'][h % 4];
  }

  /* ── The world: one 16:9 layer that covers the stage, so the painting, its door leaves, lamp
     glows and engraving share a single camera (drift on .dv-cam, walking in on .dv-world). ── */
  function worldHTML(sceneKey, inner, lightKey, extraClass) {
    const art = artScene(sceneKey), rect = art && (art.door || art.portal);
    let style = `--scene:url('${sceneUrl(sceneKey)}');${lightFor(lightKey || sceneKey, art)}`;
    if (art) style += `;--fx:${art.focal[0]}%;--fy:${art.focal[1]}%;--wx:${art.walk[0]}%;--wy:${art.walk[1]}%`;
    if (rect) style += `;--dx:${rect[0]};--dy:${rect[1]};--dw:${rect[2]};--dh:${rect[3]};--dex:${art.doorExposure}`;
    const lamps = art ? art.lamps.map(([x, y, color, strength, radius], i) =>
      `<span class="dv-pool c-${color}" data-pool="${i}" style="--x:${x}%;--y:${y}%;--r:${radius * 2}%;--a:${strength};--i:${i};--t:${(4.6 + ((i * 37 + sceneKey.length * 11) % 23) / 10).toFixed(1)}s"><i></i><i></i><i></i></span>`).join('') : '';
    const air = art ? `${art.mist ? '<div class="dv-mist"></div>' : ''}<div class="dv-dust"></div>` : '';
    return `<div class="dv-world ${extraClass || ''}" style="${style}" aria-hidden="true"><div class="dv-cam"><div class="dv-scene"></div>${lamps}${air}${inner}</div>${art ? '' : '<div class="dv-light"></div>'}</div>`;
  }
  /* Painted doorways get Sol's stone leaves inside their measured rectangle; the court's portal sits
     behind the bronze basin, so it only brightens; plates without a door (dawn) get nothing. */
  function doorHTML(sceneKey, opened) {
    const art = artScene(sceneKey);
    if (art && art.door) return `<div class="dv-door art ${opened ? 'open' : ''}"><span class="dv-leaf left"></span><span class="dv-leaf right"></span><span class="dv-seam"></span></div>`;
    if (art && art.portal) return `<div class="dv-portal ${opened ? 'open' : ''}"></div>`;
    if (art) return '';
    return `<div class="dv-door ${opened ? 'open' : ''}"><span class="dv-leaf left"></span><span class="dv-leaf right"></span><span class="dv-seam"></span></div>`;
  }

  /* ── Full view: the scene fills the screen, the question is engraved across the door, and the
     answers sit in a darkened band at the bottom. Uses the Fullscreen API where available and a
     fixed full-window layer otherwise (e.g. iPhone); Escape leaves it. ── */
  function setFull(on) {
    root.classList.toggle('dv-full', on);
    const doc = document;
    if (on && root.requestFullscreen && !doc.fullscreenElement) root.requestFullscreen().catch(() => {});
    if (!on && doc.fullscreenElement === root) doc.exitFullscreen().catch(() => {});
    const b = root.querySelector('[data-dv="full"]');
    if (b) { b.setAttribute('aria-pressed', String(on)); b.textContent = on ? 'Leave full view' : 'Full view'; }
  }
  document.addEventListener('fullscreenchange', () => { if (root && !document.fullscreenElement && root.classList.contains('dv-full')) setFull(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && root && root.classList.contains('dv-full') && !ledgerOpen) setFull(false); });

  /* ── Safe arithmetic for formula results (numbers, π, + − × ÷, parentheses; no eval) ── */
  function evaluate(text) {
    const tokens = text.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-').match(/π|\d+(?:\.\d+)?|[()+\-*/]/g) || [];
    let i = 0;
    const peek = () => tokens[i], take = () => tokens[i++];
    function factor() {
      const t = take();
      if (t === '(') { const v = expr(); take(); return v; }
      if (t === '-') return -factor();
      return t === 'π' ? Math.PI : Number(t);
    }
    function term() { let v = factor(); while (peek() === '*' || peek() === '/') v = take() === '*' ? v * factor() : v / factor(); return v; }
    function expr() { let v = term(); while (peek() === '+' || peek() === '-') v = take() === '+' ? v + term() : v - term(); return v; }
    const v = expr();
    return Number.isFinite(v) ? v : NaN;
  }
  const pretty = v => (Math.abs(v - Math.round(v)) < 1e-9 ? Math.round(v).toLocaleString('en-US') : (Math.round(v * 100) / 100).toLocaleString('en-US'));

  /* ── Pointer drag (mouse, pen and touch) with tap-to-place as the keyboard/simple path ── */
  function dragSource(el, payload) {
    el.addEventListener('pointerdown', function start(ev) {
      if (ev.button !== 0 || el.disabled) return;
      const control = ev.target.closest('button, input, textarea, a');
      if (control && control !== el) return;
      const ghost = el.cloneNode(true); ghost.classList.add('dv-ghost');
      if (el.matches('[data-order-item]')) ghost.classList.add('dv-order-ghost');
      ghost.style.width = el.getBoundingClientRect().width + 'px';
      ghost.hidden = true; ghost.setAttribute('aria-hidden', 'true');
      (document.fullscreenElement || document.body).append(ghost);
      const scope = el.closest('[data-part], [data-hint-formula]');
      let highlighted = null;
      const targetAt = e => {
        const hit = document.elementFromPoint(e.clientX, e.clientY);
        const drop = hit && hit.closest('[data-dv-drop]');
        return drop && scope && scope.contains(drop) ? drop : null;
      };
      const move = e => { ghost.style.left = e.clientX + 'px'; ghost.style.top = e.clientY + 'px'; };
      let moved = false;
      move(ev);
      const onMove = e => {
        if (!moved && Math.hypot(e.clientX - ev.clientX, e.clientY - ev.clientY) < 6) return;
        moved = true; ghost.hidden = false; el.classList.add('dv-dragging'); move(e);
        if (highlighted) highlighted.classList.remove('dv-drop-ready');
        highlighted = targetAt(e);
        if (highlighted) highlighted.classList.add('dv-drop-ready');
      };
      const cleanup = () => {
        document.removeEventListener('pointermove', onMove); document.removeEventListener('pointerup', onUp); document.removeEventListener('pointercancel', onCancel);
        if (highlighted) highlighted.classList.remove('dv-drop-ready');
        el.classList.remove('dv-dragging');
        ghost.remove();
      };
      const onUp = e => {
        cleanup();
        if (!moved) return;                                      // a plain click is handled as tap-to-place
        const drop = targetAt(e);
        if (drop) drop.dispatchEvent(new CustomEvent('dv-drop', {detail: payload, bubbles: true}));
        el.dataset.dvDragged = '1'; setTimeout(() => delete el.dataset.dvDragged, 0);
      };
      const onCancel = cleanup;
      document.addEventListener('pointermove', onMove); document.addEventListener('pointerup', onUp); document.addEventListener('pointercancel', onCancel);
    });
  }

  /* ───────────────────────── Screens ───────────────────────── */
  function mount(el, options) {
    captureWork();
    root = el; root.classList.add('dv');
    elvish = !!(options && options.elvish); root.classList.toggle('elvish', tengwar());
    if (saved.at === 'end') renderEnd();
    else if (saved.at !== 'intro' && frameById(saved.at) && reachable(frameById(saved.at))) renderFrame(frameById(saved.at));
    else renderIntro();
  }

  /* worldInner moves with the camera (door, engraving); overlayInner stays put (caption, banners). */
  function shell(sceneKey, worldInner, overlayInner, panelInner, lightKey, worldClass) {
    armedToken = null;
    const art = artScene(sceneKey);
    root.innerHTML = `
      <div class="dv-hud">
        <span class="dv-hud-buttons"><button class="dv-quiet" data-dv="ledger">Ledger &amp; satchel</button><button class="dv-quiet" data-dv="full" aria-pressed="${root.classList.contains('dv-full')}">${root.classList.contains('dv-full') ? 'Leave full view' : 'Full view'}</button></span>
        <span class="dv-satchel" aria-label="${saved.gems.length} of 12 stones found">${D.gems.map(g => `<span class="dv-socket ${saved.gems.includes(g.id) ? 'found' : ''}" title="${esc(g.name)}">${saved.gems.includes(g.id) ? gemIcon(g, 14) : ''}</span>`).join('')}</span>
      </div>
      ${journeyHTML()}
      <div class="dv-stage ${art ? 'has-art' : ''}">${worldHTML(sceneKey, worldInner, lightKey, worldClass)}${art ? '<div class="dv-scrim" aria-hidden="true"></div>' : ''}${overlayInner}</div>
      <div class="dv-panel">${panelInner}</div>
      <label class="dv-shuffle"><input type="checkbox" data-dv-shuffle ${saved.shuffle ? 'checked' : ''}> Shuffle the order of the doors</label>
      ${ledgerOpen ? ledgerHTML() : ''}`;
    root.querySelector('.dv-hud').addEventListener('click', onHud);
    root.querySelector('[data-dv-shuffle]').addEventListener('change', onShuffle);
    if (ledgerOpen) wireLedger();
  }

  function journeyHTML() {
    const count = mainDoors.filter(isOpened).length;
    return `<div class="dv-journey" role="progressbar" aria-label="Doors opened" aria-valuemin="0" aria-valuemax="${mainDoors.length}" aria-valuenow="${count}" aria-valuetext="${count} of ${mainDoors.length} doors opened; ${saved.gems.length} of 12 stones found">
      <div class="dv-journey-label"><span>${count} / ${mainDoors.length} doors opened</span><span>${saved.gems.length} / 12 stones</span></div>
      <div class="dv-marks" aria-hidden="true">${sequence().map(f => `<i class="${isOpened(f) ? 'open' : ''} ${saved.at === f.id ? 'current' : ''}"></i>`).join('')}</div>
    </div>`;
  }

  function renderIntro() {
    captureWork();
    saved.at = 'intro'; persist();
    const resume = sequence().find(f => !isOpened(f));
    const started = saved.opened.length > 0;
    shell('passage', '', '<div class="dv-caption"><span class="dv-eyebrow">THE DELVING</span><h2>The Forty Doors</h2></div>', `
      <div class="dv-verse">${D.intro.map(l => `<p>${esc(l)}</p>`).join('')}</div>
      <p class="dv-note">The stone-elves of the high places keep a mine beneath their white terraces. They are generous with what they have learned, though they would be the first to say they are not wise in everything. Their doors open to careful counting and careful reading.</p>
      <div class="dv-field-notes"><span class="dv-eyebrow">A DELVER’S FIELD NOTES</span><p>Forty doors. Twelve stones. Two hidden side chambers.</p><p>Read the inscription, then try the door. You can retry freely and ask for hints. For stones and numbers, select a token, then its resting place; dragging works too. The arrows rearrange the lamps.</p><p>Your place and unfinished answers are kept on this device. The paintings set the scene; their decorative details are never clues.</p></div>
      <div class="dv-actions">
        <button class="dv-primary" data-dv="go" data-id="${(started && resume ? resume : sequence()[0]).id}">${started && resume ? 'Continue at door ' + num(position(resume)) : 'Begin the descent'}</button>
        ${started ? '<button class="dv-secondary" data-dv="ledger">Ledger</button>' : ''}
      </div>`);
    $('.dv-panel').addEventListener('click', onPanel);
  }

  function renderEnd() {
    captureWork();
    saved.at = 'end'; persist();
    shell('dawn', '', '<div class="dv-caption"><span class="dv-eyebrow">THE ROAD TOWARD DAWN</span><h2>The Word was the treasure</h2></div>', `
      <div class="dv-verse">${D.ending.map(l => `<p>${esc(l)}</p>`).join('')}</div>
      <p class="dv-note">${saved.gems.length} of the twelve stones rest in your satchel. ${saved.keepsakes.length ? 'Keepsakes from side chambers: ' + saved.keepsakes.map(esc).join(', ') + '.' : ''}</p>
      <div class="dv-actions"><button class="dv-primary" data-dv="ledger">Open the ledger</button><button class="dv-secondary" data-dv="restart">Begin again</button></div>`);
    $('.dv-panel').addEventListener('click', onPanel);
  }

  /* sceneOverride keeps the closed-door plate on screen while a reveal (f.reveal) is still to come. */
  function renderFrame(f, arriving, sceneOverride) {
    captureWork();
    saved.at = f.id; persist();
    const s = stateFor(f);
    const act = actOf(f), opened = isOpened(f);
    const sceneKey = sceneOverride || (opened && f.reveal ? f.reveal : sceneKeyOf(f));
    if (f.reveal && !opened) preload(f.reveal);
    const firstOfAct = !f.side && !saved.shuffle && D.frames.find(x => x.act === f.act && !x.side) === f;
    const current = f.parts.findIndex((p, i) => !s.solved[i]);
    const engraving = `<div class="dv-engraving ${engraveStyle(f.id, sceneKey)}">
        ${f.inscription ? `<div class="dv-engrave-verse">${f.inscription.map(l => `<p>${numText(l)}</p>`).join('')}</div>` : `<p class="dv-engrave-setting">${numText(f.setting)}</p>`}
        ${current >= 0 ? `<p class="dv-engrave-question">${f.parts.length > 1 ? `<span>${num(current + 1)} · </span>` : ''}${numText(f.parts[current].prompt)}</p>` : ''}
      </div>`;
    const overlay = `
      <div class="dv-caption"><span class="dv-eyebrow">${act.numeral} · ${esc(act.title.toUpperCase())} · ${frameLabel(f)}</span><h2>${esc(f.title)}</h2></div>
      ${firstOfAct && !opened ? `<div class="dv-act-banner"><span>${act.numeral}</span>${esc(act.title)}<small>${esc(act.subtitle)}</small></div>` : ''}`;
    const parts = f.parts.map((p, i) => partShell(f, p, i, s)).join('');
    const wake = f.lampsWake ? 'dv-wake' + (opened ? '' : ' dv-unlit') : '';
    shell(sceneKey, doorHTML(sceneKey, opened) + engraving, overlay, `
      <div class="dv-riddle" data-frame="${f.id}">
        ${firstOfAct && !opened && act.guide ? `<aside class="dv-guide"><span aria-hidden="true">✧</span><div><span class="dv-eyebrow">THE KEEPER OF THE LAMPS</span><p>“${esc(act.guide)}”</p></div></aside>` : ''}
        <div class="dv-meta"><span class="dv-stars" title="Difficulty">${stars(f.stars)}</span><span class="dv-cert" title="How certain">${esc(D.certainty[f.certainty] || '')}</span></div>
        <p class="dv-setting">${esc(f.setting)}</p>
        ${f.inscription ? `<div class="dv-verse small">${f.inscription.map(l => `<p>${esc(l)}</p>`).join('')}</div>` : ''}
        ${parts}
        <div class="dv-feedback" role="status" aria-live="polite"></div>
        ${f.hints && f.hints.length ? `<div class="dv-hints">${hintsHTML(f, s)}</div>` : ''}
      </div>
      <div class="dv-after" ${opened ? '' : 'hidden'}>${afterHTML(f)}</div>`, f.id, wake);
    const panel = $('.dv-panel');
    panel.addEventListener('click', onPanel);
    panel.addEventListener('keydown', e => {
      if (e.key === 'Enter' && e.target.matches('[data-blank]')) {
        e.preventDefault(); e.target.closest('[data-part]').querySelector('[data-dv="check"]').click();
      }
    });
    f.parts.forEach((p, i) => wirePart(f, p, i, s));
    restoreWork(f, s);
    panel.addEventListener('input', captureWork);
    panel.addEventListener('click', captureWork);
    panel.addEventListener('dv-drop', captureWork);
    (f.hints || []).forEach((h, i) => { if (i < s.hints && h.kind === 'formula') wireFormula(f, h, $(`[data-hint-formula="${i}"]`), null); });
    if (arriving && !reducedMotion) { const st = $('.dv-stage'); st.classList.add('arrive'); requestAnimationFrame(() => requestAnimationFrame(() => st.classList.remove('arrive'))); }
    const focusTarget = $('.dv-part:not(.locked):not(.solved) button, .dv-part:not(.locked):not(.solved) input, .dv-after:not([hidden]) .dv-primary');
    if (arriving && focusTarget) focusTarget.focus({preventScroll: true});
  }

  /* ── Parts ── */
  function partShell(f, p, i, s) {
    const locked = i > 0 && !s.solved[i - 1];
    return `<section class="dv-part ${s.solved[i] ? 'solved' : ''} ${locked ? 'locked' : ''}" data-part="${i}" ${locked ? 'aria-disabled="true"' : ''}>
      <p class="dv-prompt">${f.parts.length > 1 ? `<span class="dv-step">${i + 1}</span>` : ''}${esc(p.prompt)}</p>
      <div class="dv-work">${locked ? '<p class="dv-locked">Opens when the step above is solved.</p>' : partBody(f, p, i, s)}</div>
    </section>`;
  }
  function partBody(f, p, i, s) {
    const done = s.solved[i];
    const seed = f.door || 99 + i;
    if (p.kind === 'choice') return `<div class="dv-options" role="group">${p.options.map((o, k) => `<button class="dv-option ${done && [].concat(p.correct).includes(k) ? 'right' : ''}" data-choice="${k}" ${done ? 'disabled' : ''}>${numText(o)}</button>`).join('')}</div>`;
    if (p.kind === 'multi') return `<div class="dv-options" role="group">${p.options.map((o, k) => `<button class="dv-option ${done && p.correct.includes(k) ? 'right' : ''}" data-toggle="${k}" aria-pressed="false" ${done ? 'disabled' : ''}>${numText(o)}</button>`).join('')}</div>${done ? '' : '<button class="dv-primary small" data-dv="check">Try the door</button>'}`;
    if (p.kind === 'numbers') {
      const html = p.template.split(/(\{\d\})/).map(part => {
        const m = part.match(/^\{(\d)\}$/);
        if (!m) return numText(part);
        const k = m[1], a = p.answers[k];
        return `<span class="dv-blank-wrap"><input class="dv-blank" data-blank="${k}" inputmode="decimal" autocomplete="off" aria-label="Blank ${Number(k) + 1}" ${done ? `value="${esc(a.value)}" disabled` : ''} size="${Math.max(3, String(a.value).length + 1)}"><span class="dv-blank-glyphs" aria-hidden="true">${done ? numText(a.value) : ''}</span></span>`;
      }).join('');
      return `<p class="dv-template">${html}</p>${done ? '' : '<button class="dv-primary small" data-dv="check">Try the door</button>'}`;
    }
    if (p.kind === 'reflect') return done ? '<p class="dv-template">Your answer was received.</p>' : `<textarea class="dv-reflect" rows="2" placeholder="${esc(p.placeholder || '')}" aria-label="Your answer"></textarea><button class="dv-primary small" data-dv="check">Offer your answer</button>`;
    if (p.kind === 'order') {
      const items = done ? p.items : shuffled(p.items, seed);
      return `${done ? '' : '<p class="dv-instruction">Drag a row to its new place, or use the arrows.</p>'}<ol class="dv-order">${items.map((it, k) => `<li data-dv-drop data-order-item="${esc(it)}" ${done ? '' : 'data-reorder'}><span class="dv-lamp" aria-hidden="true"></span>${done ? '' : '<span class="dv-grip" aria-hidden="true">⠿</span>'}<span class="dv-chip">${esc(it)}</span>${done ? '' : `<span class="dv-move"><button class="dv-mini" data-up="${k}" aria-label="Move ${esc(it)} up">↑</button><button class="dv-mini" data-down="${k}" aria-label="Move ${esc(it)} down">↓</button></span>`}</li>`).join('')}</ol>${done ? '' : '<button class="dv-primary small" data-dv="check">Try the door</button>'}`;
    }
    if (p.kind === 'match') {
      const targets = p.pairs.map(x => x[1]);
      const tokens = shuffled(p.pairs.map(x => x[0]).concat(p.distractors || []), seed);
      return `${done ? '' : '<p class="dv-instruction">Select a stone, then its resting place. Select a filled place to take it back.</p>'}<div class="dv-match">${targets.map((t, k) => `<button class="dv-slot" data-dv-drop data-slot="${k}" ${done ? 'disabled' : ''}><span class="dv-slot-label">${esc(t)}</span><span class="dv-slot-value">${done ? numText(p.pairs[k][0]) : ''}</span></button>`).join('')}</div>
        ${done ? '' : `<div class="dv-tray" data-dv-drop data-tray>${tokens.map(t => `<button class="dv-chip" data-token="${esc(t)}">${numText(t)}</button>`).join('')}</div><button class="dv-primary small" data-dv="check">Try the door</button>`}`;
    }
    if (p.kind === 'formula') return formulaHTML(p, done ? p.expect : null, !done);
    return '';
  }
  function formulaHTML(p, values, interactive) {
    const expr = esc(p.expr).replace(/\{(\d)\}/g, (m, n) => `<button class="dv-fslot" data-dv-drop data-fslot="${n}" aria-label="Place ${Number(n) + 1}${values ? ': ' + esc(values[n]) : ', empty'}" ${interactive ? '' : 'disabled'}>${values ? num(values[n]) : '·'}</button>`);
    const result = values && p.showResult ? ` <span class="dv-fresult">= ${numText(pretty(evaluate(p.expr.replace(/\{(\d)\}/g, (m, n) => values[n]))))}</span>` : ' <span class="dv-fresult"></span>';
    return `${interactive ? '<p class="dv-instruction">Select a number, then a place in the inscription. Each number can be used as often as you like. Select a filled place to clear it.</p>' : ''}<div class="dv-formula">${p.prefix ? esc(p.prefix) + ' ' : ''}${expr}${result} ${p.suffix ? `<span class="dv-fsuffix">${esc(p.suffix)}</span>` : ''}</div>
      ${interactive ? `<div class="dv-tray" data-dv-drop data-tray aria-label="Reusable numbers">${p.tray.map((t, n) => p.tray.indexOf(t) !== n ? '' : `<button class="dv-chip num" data-ftoken="${n}" title="Use ${esc(t)} in any number of places">${num(t)}</button>`).join('')}</div><button class="dv-primary small" data-dv="check">Try the door</button>` : ''}`;
  }

  function wirePart(f, p, i, s) {
    const el = $(`[data-part="${i}"]`);
    if (!el || el.classList.contains('locked') || s.solved[i]) return;
    if (p.kind === 'numbers') el.addEventListener('input', e => { if (e.target.matches('.dv-blank')) e.target.nextElementSibling.innerHTML = numText(e.target.value); });
    if (p.kind === 'order') wireOrder(el);
    if (p.kind === 'match') wireMatch(el, p);
    if (p.kind === 'formula') wireFormula(f, p, el, i);
  }

  function wireOrder(el) {
    const list = el.querySelector('.dv-order');
    function moveTo(item, target) {
      if (!item || !target || item === target || item.parentElement !== list || target.parentElement !== list) return;
      const items = [...list.children];
      if (items.indexOf(item) < items.indexOf(target)) target.after(item);
      else target.before(item);
      renumber();
      list.querySelectorAll('.lit').forEach(li => li.classList.remove('lit'));
      root.querySelectorAll('.dv-unlit .dv-pool.lit').forEach(pool => pool.classList.remove('lit'));
      flash(`${item.dataset.orderItem} moved to place ${[...list.children].indexOf(item) + 1}.`);
    }
    function renumber() { [...list.children].forEach((li, k) => { const up = li.querySelector('[data-up]'), down = li.querySelector('[data-down]'); if (up) up.dataset.up = k; if (down) down.dataset.down = k; }); }
    list.addEventListener('click', e => {
      const up = e.target.closest('[data-up]'), down = e.target.closest('[data-down]');
      if (up) { const li = up.closest('li'); moveTo(li, li.previousElementSibling); up.focus(); }
      if (down) { const li = down.closest('li'); moveTo(li, li.nextElementSibling); down.focus(); }
    });
    [...list.children].forEach(li => {
      dragSource(li, li);
      li.addEventListener('dv-drop', e => moveTo(e.detail, li));
    });
  }

  function placeIn(slot, text, el) {
    const value = slot.querySelector('.dv-slot-value') || slot;
    const previous = slot.dataset.filled;
    if (previous) returnToken(el, previous);
    value.innerHTML = numText(text); slot.dataset.filled = text; slot.classList.remove('wrong');
  }
  function returnToken(el, text) { const chip = [...el.querySelectorAll('[data-token],[data-ftoken]')].find(c => c.hidden && (c.dataset.token === text || c.textContent === text)); if (chip) chip.hidden = false; }
  function wireMatch(el, p) {
    el.addEventListener('click', e => {
      const chip = e.target.closest('[data-token]'), slot = e.target.closest('[data-slot]');
      if (chip && !chip.dataset.dvDragged) { arm(chip); }
      else if (slot) {
        if (armedToken && el.contains(armedToken)) { placeIn(slot, armedToken.dataset.token, el); armedToken.hidden = true; disarm(); flash('The stone rests in ' + slot.querySelector('.dv-slot-label').textContent + '.'); }
        else if (slot.dataset.filled) { returnToken(el, slot.dataset.filled); slot.querySelector('.dv-slot-value').textContent = ''; delete slot.dataset.filled; slot.classList.remove('wrong'); flash('The stone returns to the tray.'); }
      }
    });
    el.querySelectorAll('[data-token]').forEach(chip => dragSource(chip, chip));
    el.addEventListener('dv-drop', e => { const slot = e.target.closest('[data-slot]'); const chip = e.detail; if (slot && chip && chip.dataset.token && el.contains(chip) && !chip.hidden) { placeIn(slot, chip.dataset.token, el); chip.hidden = true; disarm(); flash('The stone settles into place.'); } });
  }

  function disarm() {
    if (armedToken) { armedToken.classList.remove('armed'); armedToken.setAttribute('aria-pressed', 'false'); }
    armedToken = null;
  }
  function arm(chip) {
    const select = armedToken !== chip;
    disarm();
    if (select) { armedToken = chip; chip.classList.add('armed'); chip.setAttribute('aria-pressed', 'true'); }
    flash(select ? 'Selected ' + (chip.dataset.token || chip.textContent) + '. Choose its resting place.' : 'Selection cleared.');
  }

  function wireFormula(f, p, el, partIndex) {
    if (!el) return;
    const fill = () => {
      const slots = [...el.querySelectorAll('[data-fslot]')];
      const values = slots.map(sl => sl.dataset.filled);
      const out = el.querySelector('.dv-fresult');
      if (out) out.innerHTML = p.showResult && values.every(v => v !== undefined) ? '= ' + numText(pretty(evaluate(p.expr.replace(/\{(\d)\}/g, (m, n) => values[n])))) : '';
    };
    const put = (slot, chip) => {
      slot.innerHTML = chip.innerHTML; slot.dataset.filled = p.tray[Number(chip.dataset.ftoken)]; slot.dataset.chip = chip.dataset.ftoken; fill();
      slot.setAttribute('aria-label', `Place ${Number(slot.dataset.fslot) + 1}: ${slot.dataset.filled}`);
    };
    el.addEventListener('click', e => {
      const chip = e.target.closest('[data-ftoken]'), slot = e.target.closest('[data-fslot]');
      if (chip && !chip.dataset.dvDragged) { arm(chip); }
      else if (slot) {
        if (armedToken && el.contains(armedToken)) { put(slot, armedToken); disarm(); flash('The number settles into place.'); }
        else if (slot.dataset.filled !== undefined) { slot.textContent = '·'; delete slot.dataset.filled; delete slot.dataset.chip; slot.setAttribute('aria-label', `Place ${Number(slot.dataset.fslot) + 1}, empty`); fill(); flash('The place is clear.'); }
      }
      if (partIndex === null && e.target.closest('[data-dv="check"]')) {   // formula inside a hint
        e.stopPropagation();
        if (formulaRight(p, el)) { el.querySelector('.dv-after-hint').hidden = false; flash('The numbers settle into place.', 'good'); } else flash('Not yet. Look again at which measure belongs where.', 'bad');
      }
    });
    el.querySelectorAll('[data-ftoken]').forEach(chip => dragSource(chip, chip));
    el.addEventListener('dv-drop', e => { const slot = e.target.closest('[data-fslot]'); const chip = e.detail; if (slot && chip && chip.dataset.ftoken !== undefined && el.contains(chip) && !chip.hidden) { put(slot, chip); disarm(); flash('The number settles into place.'); } });
  }
  function formulaRight(p, el) {
    const values = [...el.querySelectorAll('[data-fslot]')].map(sl => sl.dataset.filled);
    if (values.some(v => v === undefined)) return false;
    const want = p.expect.map(String), got = values.map(String);
    if (p.commutative) return want.slice().sort().join('|') === got.slice().sort().join('|');
    return want.join('|') === got.join('|');
  }

  /* ── Checking answers ── */
  function numericMatch(text, a) {
    const t = text.trim().toLowerCase();
    if (!t) return false;
    if ((a.accept || []).some(x => t === String(x).toLowerCase())) return true;
    // Permit a number with optional units ("7 pairs"), never join separate numbers or erase an operator.
    const match = t.match(/^([+-]?(?:(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?|\.\d+))(?:\s+[a-z]+(?:\s+[a-z]+)*)?$/);
    if (!match) return false;
    const n = Number(match[1].replace(/,/g, ''));
    return Number.isFinite(n) && (a.values || [a.value]).some(v => Math.abs(n - v) <= (a.tolerance || 0) + 1e-9);
  }
  function checkPart(f, p, i) {
    const el = $(`[data-part="${i}"]`);
    if (p.kind === 'multi') {
      const sel = [...el.querySelectorAll('[data-toggle][aria-pressed="true"]')].map(b => Number(b.dataset.toggle));
      const ok = sel.length >= (p.min || 1) && (!p.max || sel.length <= p.max) && sel.every(k => p.correct.includes(k));
      return ok || (sel.some(k => !p.correct.includes(k)) ? 'One of those does not belong.' : 'True so far, but the door wants more.');
    }
    if (p.kind === 'numbers') {
      const blanks = [...el.querySelectorAll('[data-blank]')];
      const wrong = blanks.filter(b => !numericMatch(b.value, p.answers[Number(b.dataset.blank)]));
      blanks.forEach(b => { b.classList.toggle('wrong', wrong.includes(b)); b.setAttribute('aria-invalid', String(wrong.includes(b))); });
      return !wrong.length || (wrong.length === blanks.length ? 'The stone stays shut.' : 'Some of the numbers ring true; look again at the marked ones.');
    }
    if (p.kind === 'reflect') {
      const text = el.querySelector('textarea').value.trim().toLowerCase();
      if (!text) return 'Offer at least a few words.';
      const has = w => (/^\d+$/.test(w) ? new RegExp('(^|\\D)' + w + '(?!\\d)') : new RegExp('\\b' + w + '\\b')).test(text);   // “7” also matches “7th”
      if (p.mustInclude && !p.mustInclude.some(has)) return 'The gate listens for a certain number in your answer.';
      return true;
    }
    if (p.kind === 'order') {
      const items = [...el.querySelectorAll('[data-order-item]')];
      items.forEach((li, k) => li.classList.toggle('lit', li.dataset.orderItem === p.items[k]));
      if (f.lampsWake) root.querySelectorAll('.dv-pool').forEach((pool, k) => pool.classList.toggle('lit', !!items[k] && items[k].dataset.orderItem === p.items[k]));   // the painted lamps, left to right
      const right = items.filter((li, k) => li.dataset.orderItem === p.items[k]).length;
      return right === p.items.length || `${right} of ${p.items.length} lamps are lit.`;
    }
    if (p.kind === 'match') {
      const slots = [...el.querySelectorAll('[data-slot]')];
      const got = slots.map(sl => sl.dataset.filled);
      if (got.some(g => !g)) return 'Every place needs a stone.';
      const ok = p.anyOrder ? got.slice().sort().join('|') === p.pairs.map(x => x[0]).sort().join('|') : got.every((g, k) => g === p.pairs[k][0]);
      slots.forEach((sl, k) => sl.classList.toggle('wrong', p.anyOrder ? !p.pairs.some(x => x[0] === got[k]) : got[k] !== p.pairs[k][0]));
      return ok || 'Some stones rest in the wrong places.';
    }
    if (p.kind === 'formula') return formulaRight(p, el) || 'The mechanism does not turn. Try a different arrangement.';
    return false;
  }
  function solvePart(f, i) {
    const s = live[f.id]; s.solved[i] = true;
    if (s.solved.every(Boolean)) return openDoor(f);
    renderFrame(f); flash('A seal releases. The next inscription glows.', 'good');
    const next = $('.dv-part:not(.solved):not(.locked) input, .dv-part:not(.solved):not(.locked) button, .dv-part:not(.solved):not(.locked) textarea');
    if (next) next.focus({preventScroll: true});
  }
  function openDoor(f) {
    if (!isOpened(f)) saved.opened.push(f.id);
    let award = '';
    if (f.gem && !saved.gems.includes(f.gem)) { saved.gems.push(f.gem); award = f.gem; }
    if (f.keepsake && !saved.keepsakes.includes(f.keepsake)) saved.keepsakes.push(f.keepsake);
    persist();
    const revealing = f.reveal && !reducedMotion;
    renderFrame(f, false, revealing ? sceneKeyOf(f) : null);
    const door = $('.dv-door, .dv-portal');
    const world = $('.dv-world');
    if (!reducedMotion) {
      if (door) door.classList.remove('open');
      if (f.lampsWake) world.classList.add('dv-unlit');      // the lamps wake one by one, then the door swings
      void world.offsetWidth;
      requestAnimationFrame(() => requestAnimationFrame(() => { if (door) door.classList.add('open'); world.classList.remove('dv-unlit'); }));
    }
    if (revealing) setTimeout(() => {                        // walk through into the chamber behind the door
      const old = $('.dv-world');
      if (saved.at !== f.id || !old) return;
      old.insertAdjacentHTML('afterend', worldHTML(f.reveal, doorHTML(f.reveal, true), f.id, 'dv-reveal'));
      const next = old.nextElementSibling;
      void next.offsetWidth;
      old.classList.add('dv-through'); next.classList.add('shown');
      setTimeout(() => { if (old.isConnected) old.remove(); next.classList.remove('dv-reveal', 'shown'); }, 1800);
    }, 1500);
    const ahead = f.side ? returnFromSide(f) : nextMain(f);
    if (ahead) preload(sceneKeyOf(ahead));
    if (sideAfter(f) && !f.side) preload(sceneKeyOf(sideAfter(f)));
    if (award) {
      const g = gemOf(award);
      $('.dv-stage').insertAdjacentHTML('beforeend', `<div class="dv-award"><span class="dv-award-gem">${gemIcon(g, 88)}${ART ? '<i class="dv-sparkle"></i>' : ''}</span><span>${esc(g.name)}</span></div>`);
    }
    flash(award ? `The door opens. ${gemOf(award).name} gleams in the chamber beyond.` : 'The door opens.', 'good');
    const next = $('.dv-after .dv-primary'); if (next) next.focus({preventScroll: true});
  }
  function flash(message, tone) { const fb = $('.dv-feedback'); if (fb) { fb.textContent = message; fb.className = 'dv-feedback ' + (tone || ''); } }

  /* ── After the door: answer, lore, references, where next ── */
  function afterHTML(f) {
    const side = sideAfter(f), ahead = f.side ? returnFromSide(f) : nextMain(f);
    const remaining = sequence().find(x => x !== f && !isOpened(x));
    const next = ahead || remaining;
    return `<h3>What the stone remembers</h3>
      <p class="dv-answer">${esc(f.answer)}</p>
      ${f.lore.map(l => `<p class="dv-lore">${esc(l)}</p>`).join('')}
      <p class="dv-refs">${f.refs.map(r => `<a href="${gateway(r)}" target="_blank" rel="noopener">${esc(r)}</a>`).join(' · ')}</p>
      <div class="dv-actions">
        ${next ? `<button class="dv-primary" data-dv="go" data-id="${next.id}">${!ahead ? 'Return to the unopened doors' : f.side ? 'Return to the main stair' : 'Descend'}</button>` : '<button class="dv-primary" data-dv="end">Climb toward the dawn</button>'}
        ${side && !f.side ? `<button class="dv-secondary" data-dv="go" data-id="${side.id}">${isOpened(side) ? 'Revisit' : 'A side passage glimmers'}: ${esc(side.title)}</button>` : ''}
      </div>`;
  }

  /* ── Hints, revealed one at a time ── */
  function hintsHTML(f, s) {
    const shown = f.hints.slice(0, s.hints).map((h, i) => hintBody(h, i)).join('');
    const left = f.hints.length - s.hints;
    return `${shown}${left ? `<button class="dv-quiet" data-dv="hint">Ask the delvers for a hint (${left} left)</button>` : ''}`;
  }
  function hintBody(h, i) {
    if (h.kind === 'text') return `<p class="dv-hint">${esc(h.text)}</p>`;
    if (h.kind === 'equation') return `<div class="dv-hint"><button class="dv-caret" data-dv="caret" aria-expanded="false">^ ${esc(h.label || 'Lift the caret')}</button><code class="dv-equation" hidden>${esc(h.text)}</code></div>`;
    if (h.kind === 'image') return `<figure class="dv-hint dv-figure"><img src="${BASE + esc(h.src)}" alt="${esc(h.alt || '')}"><figcaption>${esc(h.text || '')}</figcaption></figure>`;
    if (h.kind === 'formula') return `<div class="dv-hint" data-hint-formula="${i}"><p>${esc(h.text || '')}</p>${formulaHTML(h, null, true)}<p class="dv-after-hint" hidden>${esc(h.after || '')}</p></div>`;
    return '';
  }

  /* ── Ledger (map of doors) and the satchel ── */
  function ledgerHTML() {
    const groups = saved.shuffle ? [{title: 'The shuffled stair', frames: sequence().flatMap(f => sideAfter(f) ? [f, sideAfter(f)] : [f])}] : D.acts.map(a => ({title: a.numeral + ' · ' + a.title, frames: D.frames.filter(f => f.act === a.id)}));
    const rows = groups.map(a => {
      const doors = a.frames.map(f => {
        const open = isOpened(f), can = reachable(f);
        return `<li><button class="dv-door-link ${open ? 'open' : ''}" data-dv="go" data-id="${f.id}" ${saved.at === f.id ? 'aria-current="step"' : ''} ${can ? '' : 'disabled'}>${f.side ? '◇' : num(position(f))}<span>${esc(f.title)}</span>${open ? '<span class="dv-door-status" aria-label="Opened">✓</span>' : ''}${f.gem && open ? gemIcon(gemOf(f.gem), 14) : ''}</button></li>`;
      }).join('');
      return `<section><h4>${esc(a.title)}</h4><ol>${doors}</ol></section>`;
    }).join('');
    return `<div class="dv-ledger" role="dialog" aria-modal="true" aria-label="Ledger of doors">
      <div class="dv-ledger-head"><h3>The delvers’ ledger</h3><button class="dv-quiet" data-dv="close-ledger" aria-label="Close ledger">×</button></div>
      <div class="dv-breastpiece" aria-label="The satchel, set like the breastpiece">${D.gems.map(g => `<span class="${saved.gems.includes(g.id) ? 'found' : ''}" title="${esc(g.name)}">${saved.gems.includes(g.id) ? gemIcon(g, 28) : ''}<small>${esc(g.name)}</small></span>`).join('')}</div>
      <p class="dv-note small">The twelve stones of the high priest’s breastpiece (Exodus 28:17–20). Their English names vary by translation.</p>
      <div class="dv-ledger-acts">${rows}</div>
      <div class="dv-actions"><button class="dv-secondary" data-dv="intro">The entrance</button><button class="dv-quiet" data-dv="reset">Forget my progress</button></div>
    </div>`;
  }
  function closeLedger() { ledgerOpen = false; mount(root, {elvish}); $('[data-dv="ledger"]').focus({preventScroll: true}); }
  function wireLedger() {
    const l = $('.dv-ledger');
    [...root.children].forEach(el => { if (el !== l) el.inert = true; });
    l.addEventListener('click', onPanel);
    l.addEventListener('keydown', e => {
      if (e.key === 'Escape') { e.stopPropagation(); closeLedger(); }
      if (e.key === 'Tab') {
        const buttons = [...l.querySelectorAll('button:not(:disabled), a[href]')];
        const first = buttons[0], last = buttons[buttons.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    l.querySelector('[data-dv="close-ledger"]').focus({preventScroll: true});
  }

  /* ── Events ── */
  function go(id) {
    if (navigating) return;
    const f = frameById(id); if (!f || !reachable(f)) return;
    ledgerOpen = false;
    const stage = $('.dv-stage');
    if (stage && !reducedMotion) { navigating = true; stage.classList.add('leave'); setTimeout(() => { navigating = false; renderFrame(f, true); }, 650); }
    else renderFrame(f, true);
  }
  function onShuffle(e) {
    saved.shuffle = e.target.checked;
    if (saved.shuffle) saved.order = makeOrder();
    persist(); mount(root, {elvish});
  }
  function onHud(e) {
    if (e.target.closest('[data-dv="full"]')) return setFull(!root.classList.contains('dv-full'));
    const b = e.target.closest('[data-dv="ledger"]'); if (b) { ledgerOpen = !ledgerOpen; mount(root, {elvish}); }
  }
  function onPanel(e) {
    const b = e.target.closest('button'); if (!b || b.disabled) return;
    const act = b.dataset.dv, partEl = b.closest('[data-part]');
    const f = frameById(saved.at);
    if (act === 'go') return go(b.dataset.id);
    if (act === 'ledger') { ledgerOpen = true; return mount(root, {elvish}); }
    if (act === 'close-ledger') return closeLedger();
    if (act === 'intro') { ledgerOpen = false; return renderIntro(); }
    if (act === 'end' && mainDoors.every(isOpened)) return renderEnd();
    if (act === 'restart') { root.querySelector('.dv-riddle')?.removeAttribute('data-frame'); saved = {at: 'intro', opened: [], gems: [], keepsakes: [], shuffle: saved.shuffle, order: saved.shuffle ? makeOrder() : null, work: live}; for (const k in live) delete live[k]; persist(); return renderIntro(); }
    if (act === 'reset') {
      if (b.dataset.armed) { root.querySelector('.dv-riddle')?.removeAttribute('data-frame'); saved = {at: 'intro', opened: [], gems: [], keepsakes: [], shuffle: false, order: null, work: live}; for (const k in live) delete live[k]; persist(); ledgerOpen = false; return renderIntro(); }
      b.dataset.armed = '1'; b.textContent = 'Press again to forget every opened door'; return;
    }
    if (act === 'hint' && f) {
      const s = live[f.id]; s.hints++;
      const box = $('.dv-hints'); box.innerHTML = hintsHTML(f, s);
      f.hints.slice(0, s.hints).forEach((h, k) => { if (h.kind === 'formula') wireFormula(f, h, $(`[data-hint-formula="${k}"]`), null); });
      persist(); flash('The delver offers a hint.');
      const next = box.querySelector('[data-dv="hint"]') || box.querySelector('button');
      if (next) next.focus({preventScroll: true});
      return;
    }
    if (act === 'caret') { const eq = b.nextElementSibling; eq.hidden = !eq.hidden; b.setAttribute('aria-expanded', String(!eq.hidden)); return; }
    if (!f || !partEl) return;
    const i = Number(partEl.dataset.part), p = f.parts[i];
    if (b.dataset.choice !== undefined) {
      const k = Number(b.dataset.choice);
      if ([].concat(p.correct).includes(k)) return solvePart(f, i);
      b.classList.add('wrong'); b.disabled = true;
      const next = partEl.querySelector('[data-choice]:not(:disabled)'); if (next) next.focus({preventScroll: true});
      return flash('The stone stays shut.', 'bad');
    }
    if (b.dataset.toggle !== undefined) { b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')); return; }
    if (act === 'check') { const r = checkPart(f, p, i); if (r === true) return solvePart(f, i); return flash(r || 'Not yet.', 'bad'); }
  }

  window.Delving = {
    mount: mount,
    summary: () => ({at: saved.at, shuffled: !!saved.shuffle, elvish: tengwar(), fullView: !!(root && root.classList.contains('dv-full')), doorsOpened: saved.opened.filter(id => !frameById(id)?.side).length, stones: saved.gems.length, keepsakes: saved.keepsakes.slice()})
  };
})();
