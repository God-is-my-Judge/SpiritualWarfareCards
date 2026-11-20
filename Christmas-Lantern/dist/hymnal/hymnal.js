'use strict';
// Carol Along: no game globals or dependencies. Empty configured slots never request audio.
window.LanternHymnal = (function lanternHymnalModule() {
  const STORE = 'christmas-lantern-hymnal-v1', tracks = new Map();
  const defaults = {guide: false, mode: 'instrumental', invitation: true, textSize: 25, volume: .7, shuffle: false};
  let preferences = {...defaults}, active = null;
  try { preferences = cleanPreferences(JSON.parse(localStorage.getItem(STORE)) || {}); } catch {}

  function cleanPreferences(p) {
    return {guide: p.guide === true, mode: p.mode === 'vocal' ? 'vocal' : 'instrumental', invitation: p.invitation !== false, textSize: [22,25,29].includes(p.textSize) ? p.textSize : 25, volume: Number.isFinite(p.volume) ? Math.min(1, Math.max(0, p.volume)) : .7, shuffle: p.shuffle === true};
    /* Code by Daniel using ChatGPT November 13, 2026 */
  }
  function setPreferences(p) {
    preferences = cleanPreferences({...preferences, ...p});
    try { localStorage.setItem(STORE, JSON.stringify(preferences)); } catch {}
    return {...preferences};
    /* Code by Daniel using ChatGPT November 13, 2026 */
  }
  function escape(value) {
    return String(value).replace(/[&<>"']/g, function entity(c) {
      return {'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c];
      /* Code by Daniel using ChatGPT November 13, 2026 */
    });
    /* Code by Daniel using ChatGPT November 13, 2026 */
  }
  function flatLines(song) {
    const result = [];
    song.verses.forEach(function verse(v, vi) {
      v.lines.forEach(function line(text, li) {
        result.push({verse: vi, line: li, text});
        /* Code by Daniel using ChatGPT November 13, 2026 */
      });
      /* Code by Daniel using ChatGPT November 13, 2026 */
    });
    return result;
    /* Code by Daniel using ChatGPT November 13, 2026 */
  }
  function validateTiming(data, song, recording) {
    if (!data || data.schema !== 1 || data.hymnId !== song.id || data.lyricVersion !== song.lyricVersion) throw Error('These timings belong to a different hymn or lyric edition.');
    if (!data.recording || data.recording.name !== recording.name || data.recording.bytes !== recording.bytes || data.recording.sha256 !== recording.sha256) throw Error('These timings belong to a different recording.');
    if (!Number.isFinite(data.bpm) || data.bpm < 30 || data.bpm > 240 || ![2,3,4,6].includes(data.beatsPerBar) || !Number.isFinite(data.firstBeat) || data.firstBeat < 0) throw Error('Use a tempo of 30–240 BPM, 2, 3, 4 or 6 beats, and a nonnegative first-beat time.');
    if (!Array.isArray(data.lines) || data.lines.length > 1000) throw Error('The timing file needs a lines array with no more than 1,000 entries.');
    let lastTime = -1, lastLine = -1;
    const sequence = flatLines(song), duration = recording.audio.duration;
    if (Number.isFinite(duration) && data.firstBeat >= duration) throw Error('The first beat must fall within this recording.');
    for (const cue of data.lines) {
      if (!cue || !Number.isInteger(cue.verse) || !Number.isInteger(cue.line) || !Number.isFinite(cue.time) || cue.time < 0 || cue.time <= lastTime || (Number.isFinite(duration) && cue.time >= duration)) throw Error('Line times must increase and fall within this recording.');
      const index = sequence.findIndex(function sameLine(line) {
        return line.verse === cue.verse && line.line === cue.line;
        /* Code by Daniel using ChatGPT November 13, 2026 */
      });
      if (index !== lastLine + 1) throw Error('Mark each lyric line in order, starting with the first line of this hymn.');
      lastTime = cue.time; lastLine = index;
    }
    let previous = -1;
    if (data.sections !== undefined && (!Array.isArray(data.sections) || data.sections.length > 100)) throw Error('Invalid beat sections.');
    const sections = (data.sections || []).map(function section(s) {
      if (!s || !Number.isFinite(s.start) || s.start < 0 || s.start <= previous || !Number.isFinite(s.firstBeat) || s.firstBeat < s.start || (s.end !== undefined && (!Number.isFinite(s.end) || s.end <= s.start))) throw Error('Invalid beat section times.');
      previous = s.start;
      return {start: s.start, firstBeat: s.firstBeat, ...(s.end === undefined ? {} : {end: s.end})};
      /* Code by Daniel using ChatGPT November 13, 2026 */
    });
    return {schema: 1, hymnId: song.id, lyricVersion: song.lyricVersion, recording: {name: recording.name, bytes: recording.bytes, sha256: recording.sha256}, bpm: data.bpm, beatsPerBar: data.beatsPerBar, firstBeat: data.firstBeat, sections, lines: data.lines.map(function copy(cue) {
      return {time: cue.time, verse: cue.verse, line: cue.line};
      /* Code by Daniel using ChatGPT November 13, 2026 */
    })};
    /* Code by Daniel using ChatGPT November 13, 2026 */
  }
  class Hymnal {
    constructor(root, options) {
      this.root = root; this.options = options; this.songs = options.songs || [];
      // An older vocal preference must not hide the only installed accompaniment.
      if (options.recordings && preferences.mode === 'vocal' && !Object.values(options.recordings).some(function hasVoice(s) {
        return !!(typeof s.vocal === 'string' ? s.vocal : s.vocal?.src);
        /* Code by Daniel using ChatGPT November 13, 2026 */
      })) setPreferences({mode: 'instrumental'});
      this.song = null; this.contentsPage = 0; this.verse = 0; this.all = false; this.speed = 1;
      this.manualAt = 0; this.manualSeconds = 0; this.manual = false; this.offset = null;
      this.currentCue = null; this.message = ''; this.setupOpen = false; this.alive = true;
      this.frame = 0; this.upload = 0; this.playRequest = 0; this.abort = new AbortController();
      this.openingTimer = null; this.openingRemaining = 12000; this.openingStarted = 0;
      this.openingCancelled = options.authoring === true;
      this.click = this.click.bind(this); this.change = this.change.bind(this);
      this.frameTick = this.frameTick.bind(this); this.audioEvent = this.audioEvent.bind(this);
      this.visibility = this.visibility.bind(this); this.dispose = this.dispose.bind(this);
      this.root.addEventListener('click', this.click, {signal: this.abort.signal});
      this.root.addEventListener('change', this.change, {signal: this.abort.signal});
      document.addEventListener('visibilitychange', this.visibility, {signal: this.abort.signal});
      window.addEventListener('pagehide', this.dispose, {signal: this.abort.signal});
      this.dialog = root.closest('dialog');
      this.dialog?.addEventListener('close', this.dialogClosed.bind(this), {signal: this.abort.signal});
      this.observer = new MutationObserver(this.checkRoot.bind(this));
      this.observer.observe(root.parentNode, {childList: true});
      this.render();
      this.resumeOpeningSong();
      /* Code by Daniel using ChatGPT November 18, 2026 */
    }
    pauseOpeningSong() {
      if (this.openingTimer === null) return;
      clearTimeout(this.openingTimer); this.openingTimer = null;
      this.openingRemaining = Math.max(0, this.openingRemaining - (performance.now() - this.openingStarted));
      /* Code by Daniel using ChatGPT November 18, 2026 */
    }
    cancelOpeningSong() {
      this.pauseOpeningSong(); this.openingCancelled = true;
      /* Code by Daniel using ChatGPT November 18, 2026 */
    }
    resumeOpeningSong() {
      if (this.openingTimer !== null || this.openingCancelled || this.song || !this.alive || document.hidden || !this.root.isConnected || (this.dialog && !this.dialog.open) || !this.hasRecordings()) return;
      this.openingStarted = performance.now();
      this.openingTimer = setTimeout(() => {
        this.openingTimer = null; this.openingRemaining = 0;
        if (!this.alive || !this.root.isConnected || (this.dialog && !this.dialog.open) || this.song || this.openingCancelled) return;
        if (document.hidden) return;
        this.cancelOpeningSong();
        if (this.playRandomNext()) this.root.querySelector('h2')?.scrollIntoView({block:'nearest'});
        /* Code by Daniel using ChatGPT November 18, 2026 */
      }, this.openingRemaining);
      /* Code by Daniel using ChatGPT November 18, 2026 */
    }
    record() {
      if(!this.song)return null;
      const key=this.song.id+':'+preferences.mode;
      const source=this.options.recordings?.[this.song.id]?.[preferences.mode];
      const src=typeof source==='string'?source:source?.src;
      const cached=tracks.get(key);
      if(cached && (cached.custom || cached.url===src))return cached;
      if(cached){cached.audio.pause();if(cached.blobURL)URL.revokeObjectURL(cached.blobURL);tracks.delete(key);}
      if(typeof src!=='string'||!src.trim())return null;
      const buffered=source.buffered===true && location.protocol!=='file:';
      const audio=buffered?new Audio():new Audio(src);audio.preload='auto';
      const rec={audio,url:src,name:source.name||this.song.title,bytes:source.bytes,sha256:source.sha256,credit:source.credit,sourceURL:source.sourceURL,bpm:source.bpm||this.song.bpm,beatsPerBar:source.beatsPerBar||this.song.beatsPerBar,timing:null};
      if(source.timing)rec.timing=validateTiming(source.timing,this.song,rec);
      tracks.set(key,rec);
      if(buffered)rec.ready=fetch(src).then(function response(r){
        if(!r.ok)throw Error('Recording unavailable');return r.blob();
        /* Code by Daniel using ChatGPT November 13, 2026 */
      }).then(function buffer(blob){
        rec.blobURL=URL.createObjectURL(blob);audio.src=rec.blobURL;
        /* Code by Daniel using ChatGPT November 13, 2026 */
      }).catch(function directPlayback(){
        audio.src=src;
        /* Code by Daniel using ChatGPT November 13, 2026 */
      });
      return rec;
      /* Code by Daniel using ChatGPT November 13, 2026 */
    }
    checkRoot() {
      if (!this.root.isConnected) this.dispose();
      /* Code by Daniel using ChatGPT November 13, 2026 */
    }
    dialogClosed() {
      // A queued close event can arrive after the host has already reopened its dialog.
      if (!this.dialog?.open) this.dispose();
      /* Code by Daniel using ChatGPT November 13, 2026 */
    }
    visibility() {
      if (document.hidden) { this.pauseOpeningSong(); this.playRequest++; this.record()?.audio.pause(); this.manual = false; this.manualSeconds = 0; this.cancelFrame(); }
      else { this.resumeOpeningSong(); this.update(); }
      /* Code by Daniel using ChatGPT November 18, 2026 */
    }
    dispose() {
      if (!this.alive) return;
      this.cancelOpeningSong(); this.stop(); this.alive = false; this.upload++;
      this.abort.abort(); this.audioAbort?.abort(); this.observer.disconnect();
      if (active === this) active = null;
      /* Code by Daniel using ChatGPT November 18, 2026 */
    }
    cancelFrame() {
      cancelAnimationFrame(this.frame); this.frame = 0;
      /* Code by Daniel using ChatGPT November 13, 2026 */
    }
    stop() {
      this.clearTap();
      this.playRequest++;
      const rec = this.record();
      if (rec) { rec.audio.pause(); try { rec.audio.currentTime = 0; } catch {} }
      this.manual = false; this.manualSeconds = 0; this.offset = null;
      this.currentCue = null; this.cancelFrame();
      if (this.alive && this.song) { this.renderLyrics(); this.update(); }
      /* Code by Daniel using ChatGPT November 19, 2026 */
    }
    render() {
      if (!this.alive) return;
      const focused = this.root.contains(document.activeElement) ? document.activeElement.dataset.action : null;
      this.root.classList.add('lh');
      this.root.style.setProperty('--lh-size', preferences.textSize + 'px');
      this.root.innerHTML = this.song ? this.songHTML() : this.coverHTML();
      this.attachAudio(); this.renderLyrics(); this.update();
      for (const select of this.root.querySelectorAll('[data-action=mode]')) this.updateModeOptions(select);
      if (focused) this.root.querySelector('[data-action="' + focused + '"]')?.focus({preventScroll: true});
      /* Code by Daniel using ChatGPT November 13, 2026 */
    }
    coverHTML() {
      let html = '<section class="lh-cover"><div class="lh-ornament" aria-hidden="true">✧ ♫ ✧</div><p>A LITTLE COMPANY AT CHRISTMAS</p><h2 id="panel-title">The Lantern Carolers’ Hymnal</h2><p>Old songs. Warm voices. Room for yours.</p><button data-action="open">Open the hymnal</button></section>';
      if (!this.openingCancelled && this.hasRecordings()) html += '<p class="lh-muted lh-opening-note">Choose a carol. Otherwise, one starts after 12 seconds.</p>';
      if (preferences.invitation) html += '<aside class="lh-invitation"><strong>Care to sing along?</strong><p>Read the words or sing together in the quiet.</p><div class="lh-row"><button class="primary" data-action="invite-sing">Let’s sing</button><button data-action="invite-read">Just read for now</button></div><small>You can change your choice in Music &amp; singing.</small></aside>';
      html += '<section id="lh-contents"><h3>' + (this.contentsPage ? 'More songs for Christmas' : 'Our Christmas carols') + '</h3><div class="lh-row"><button data-action="main-carols" aria-pressed="' + !this.contentsPage + '">Page 1 · Our carols</button><button data-action="extra-carols" aria-pressed="' + !!this.contentsPage + '">Page 2 · More carols</button></div><ol class="lh-contents">';
      const contentsPage = this.contentsPage;
      this.songs.forEach(function title(song, i) {
        if ((song.section === 'extras' ? 1 : 0) !== contentsPage) return;
        html += '<li><button data-action="song" data-index="' + i + '"><span>' + escape(song.title) + '</span><small>' + song.verses.length + ' verses</small></button></li>';
        /* Code by Daniel using ChatGPT November 13, 2026 */
      });
      html += '</ol></section><div class="lh-row"><button data-action="preferences">Music &amp; singing</button></div><div data-preferences hidden></div>';
      if(this.hasRecordings())html+='<section class="lh-guide">'+this.shuffleHTML()+'</section>';
      if(this.options.onWinterBook)html+='<section class="lh-guide"><h3>Another book for a snowy evening</h3><p>Cultural songs &amp; winter verses</p><button data-action="winter-book">Grandmother’s Winter Songbook →</button></section>';
      else if(this.options.winterBook)html+='<section class="lh-guide"><h3>Cultural songs &amp; winter verses</h3><a href="winter-songs.html">Grandmother’s Winter Songbook →</a></section>';
      return html;
      /* Code by Daniel using ChatGPT November 18, 2026 */
    }
    songHTML() {
      const song = this.song, rec = this.record();
      // Claude, 19 Nov 2026 (Daniel): only Play/Pause and small verse arrows at the top; every other control below the words.
      return '<div class="lh-row lh-quickplay"><button class="lh-step" data-action="previous" aria-label="Previous verse" title="Previous verse">‹</button><button class="primary lh-toggle" data-action="toggle" aria-pressed="false" ' + (!rec ? 'hidden' : '') + '>▶ Play</button><button class="lh-step" data-action="next" aria-label="Next verse" title="Next verse">›</button><span class="lh-muted" data-quick-hint></span></div>' +
        '<div class="lh-heading"><h2 id="panel-title">' + escape(song.title) + '</h2><p class="lh-muted">' + escape(song.subtitle || '') + '</p><p class="lh-byline">' + escape(song.byline || '') + '</p></div>' +
        '<div class="lh-beat-strip" data-guide-strip ' + (preferences.guide ? '' : 'hidden') + '><div class="lh-beats" aria-hidden="true" data-beats></div><span class="lh-muted" data-beat-label>Ready when you are.</span></div><div class="lh-lyrics" data-lyrics></div><div class="lh-row lh-pager"><button data-action="previous">← Previous verse</button><output data-page></output><button data-action="next">Next verse →</button></div>' +
        '<div class="lh-settings"><div class="lh-row"><button data-action="all">' + (this.all ? 'One verse at a time' : 'Read whole hymn') + '</button><label>Letter size <select data-action="size"><option value="22">Comfortable</option><option value="25" ' + (preferences.textSize === 25 ? 'selected' : '') + '>Large</option><option value="29" ' + (preferences.textSize === 29 ? 'selected' : '') + '>Extra large</option></select></label></div>' +
        '<label><input data-action="guide" type="checkbox" ' + (preferences.guide ? 'checked' : '') + '>Carol Along · gentle beat guide</label>' +
        '<section class="lh-transport" ' + (!rec && !this.options.authoring ? 'hidden' : '') + ' aria-label="Accompaniment"><label>Listen or sing with <select data-action="mode"><option value="instrumental">Instrumental accompaniment</option><option value="vocal" ' + (preferences.mode === 'vocal' ? 'selected' : '') + '>With singers</option></select></label><label>Carol volume <input data-action="volume" type="range" min="0" max="1" step=".05" value="' + preferences.volume + '"></label><div class="lh-row"><button class="primary" data-action="play">Play accompaniment</button><button data-action="pause">Pause</button><button data-action="stop">Stop</button></div>' + this.shuffleHTML() + '<div class="lh-row"><label for="lh-seek">Position</label><input id="lh-seek" data-action="seek" class="lh-seek" type="range" min="0" max="1" step=".1" value="0"><output data-time>0:00</output></div><p class="lh-status" role="status" data-status>' + escape(this.message || (rec ? 'Ready when you are.' : 'Sing together in your own time.')) + '</p></section>' +
        '<section class="lh-guide" data-guide ' + (preferences.guide ? '' : 'hidden') + ' aria-label="Carol Along"><div class="lh-row"><button data-action="slower">Slower</button><output data-tempo></output><button data-action="faster">Faster</button><button data-action="reset-speed">Original speed</button></div><div class="lh-row"><button data-action="guide-start">Start beat without music</button><button data-action="tap">First beat is now</button></div><p class="lh-muted" data-timing-label></p></section>' +
        (this.options.authoring === true ? '<details data-setup ' + (this.setupOpen ? 'open' : '') + '><summary>Your accompaniment &amp; timing</summary><p>Add a recording you have chosen for <strong>' + escape(song.title) + '</strong>. Check that its verses match this edition. Files stay in this session.</p><label>Add ' + (preferences.mode === 'vocal' ? 'a recording with singers' : 'an instrumental accompaniment') + '<input type="file" data-action="audio" accept="audio/*"></label><div class="lh-row"><label>Recording tempo (BPM) <input data-action="bpm" type="number" min="30" max="240" value="' + (rec?.timing?.bpm || rec?.bpm || song.bpm) + '"></label><label>Beats in a bar <select data-action="meter">' + this.meterOptions() + '</select></label></div><p class="lh-muted">The starting tempo is a suggestion. Set the actual recording tempo, then tap “First beat is now” as its first beat arrives. This gives a beat guide; it does not guess sung words.</p><details><summary>Line timing workshop</summary><p class="lh-timing-notes">Play the exact recording. Press “Mark next line” as each line begins. Marks include any introduction, pauses and held notes. Review the result before sharing. Timings use the recording’s clock and follow speed changes.</p><div class="lh-row"><button data-action="mark">Mark next line</button><button data-action="clear-marks">Clear line marks</button><button data-action="export">Save timing file</button></div><p data-mark-label class="lh-muted"></p><label>Load timings for this recording<input type="file" data-action="timing" accept=".json,application/json"></label><p class="lh-muted">Each timing file is tied to this lyric edition and the audio file’s fingerprint. An empty line list is a beat-only template.</p></details></details>' : '') + '<div class="lh-row lh-top"><button data-action="contents">← Title &amp; contents</button><button data-action="preferences">Music &amp; singing</button></div><div data-preferences hidden></div><details><summary>Words &amp; sources</summary><p class="lh-credit">' + escape(song.credit || '') + '</p>' + this.sourceHTML() + '</details></div>';
      /* Code by Daniel using ChatGPT November 13, 2026 */
    }
    meterOptions() {
      const meter = this.record()?.timing?.beatsPerBar || this.record()?.beatsPerBar || this.song.beatsPerBar;
      return [2,3,4,6].map(function option(n) {
        return '<option value="' + n + '" ' + (n === meter ? 'selected' : '') + '>' + n + '</option>';
        /* Code by Daniel using ChatGPT November 13, 2026 */
      }).join('');
      /* Code by Daniel using ChatGPT November 13, 2026 */
    }
    sourceHTML() {
      const rec=this.record();
      const audioCredit=rec?.credit ? '<p class="lh-credit">'+escape(rec.credit)+( /^https:\/\//.test(rec.sourceURL||'') ? ' · <a href="'+escape(rec.sourceURL)+'" target="_blank" rel="noopener noreferrer">Recording source</a>' : '')+'</p>' : '';
      return audioCredit+(this.song.sources || []).map(function source(s) {
        return /^https:\/\//.test(s.url) ? '<p class="lh-credit"><a href="' + escape(s.url) + '" target="_blank" rel="noopener noreferrer">' + escape(s.label) + ' ↗</a></p>' : '';
        /* Code by Daniel using ChatGPT November 13, 2026 */
      }).join('');
      /* Code by Daniel using ChatGPT November 13, 2026 */
    }
    renderLyrics() {
      const box = this.root.querySelector('[data-lyrics]');
      if (!box || !this.song) return;
      let html = '';
      for (let vi = 0; vi < this.song.verses.length; vi++) {
        if (!this.all && vi !== this.verse) continue;
        const verse = this.song.verses[vi];
        html += '<section class="lh-verse"><p class="lh-verse-label">' + escape(verse.label || 'Verse ' + (vi + 1)) + '</p>';
        verse.lines.forEach(function line(text, li) {
          html += '<div class="lh-line" data-line="' + vi + ':' + li + '">' + escape(text) + '</div>';
          /* Code by Daniel using ChatGPT November 13, 2026 */
        });
        html += '</section>';
      }
      box.innerHTML = html;
      this.root.querySelector('[data-page]').textContent = this.all ? 'All ' + this.song.verses.length + ' verses' : 'Verse ' + (this.verse + 1) + ' of ' + this.song.verses.length;
      for (const b of this.root.querySelectorAll('[data-action=previous]')) b.disabled = this.all || this.verse === 0;
      for (const b of this.root.querySelectorAll('[data-action=next]')) b.disabled = this.all || this.verse === this.song.verses.length - 1;
      /* Code by Daniel using ChatGPT November 13, 2026 */
    }
    attachAudio() {
      this.audioAbort?.abort(); this.audioAbort = new AbortController();
      const audio = this.record()?.audio;
      if (audio) for (const event of ['play','pause','timeupdate','loadedmetadata','ended','error','seeked']) audio.addEventListener(event, this.audioEvent, {signal: this.audioAbort.signal});
      /* Code by Daniel using ChatGPT November 13, 2026 */
    }
    audioEvent(e) {
      if (!this.alive || e.target !== this.record()?.audio) return;
      if (e.type === 'ended') { this.stop(); if (preferences.shuffle && this.playRandomNext()) return; this.say('The carol is finished. Sing it again whenever you like.'); }
      if (e.type === 'error') { this.stop(); this.say('This recording could not play. Try reopening the hymnal.'); }
      this.update();
      /* Code by Daniel using ChatGPT November 13, 2026 */
    }
    // Random next song: when a carol ends, play another one that has a recording, avoiding the
    // last few, so the hymnal can keep music going while it is open. Claude, November 18, 2026
    hasRecordings() {
      return this.songs.some((s) => this.playable(s));
    }
    playable(song) {
      const source = this.options.recordings?.[song.id]?.[preferences.mode];
      const src = typeof source === 'string' ? source : source?.src;
      return typeof src === 'string' && !!src.trim();
    }
    shuffleHTML() {
      return '<label class="lh-shuffle"><input data-action="shuffle" type="checkbox" ' + (preferences.shuffle ? 'checked' : '') + '>Random next song · keep playing</label>';
    }
    playRandomNext() {
      const recent = this.recent || (this.recent = []);
      if (this.song) { recent.push(this.song.id); if (recent.length > 3) recent.shift(); }
      let pool = this.songs.filter((s) => this.playable(s) && s.id !== this.song?.id && !recent.includes(s.id));
      if (!pool.length) pool = this.songs.filter((s) => this.playable(s) && s.id !== this.song?.id);
      if (!pool.length) return false;
      this.song = pool[Math.floor(Math.random() * pool.length)]; this.verse = 0; this.speed = 1; this.all = false; this.setupOpen = false; this.message = '';
      this.render(); this.play();
      return true;
    }
    clearTap() {
      if (this.tapStart) this.root.removeEventListener('pointerdown', this.tapStart);
      this.tapStart = null; this.tapArmed = false; this.blocked = false;
      /* Code by Daniel using ChatGPT November 19, 2026 */
    }
    awaitTap() {
      // One tap on the song page (not on a button, which acts for itself) starts the blocked carol. Claude, November 18, 2026
      this.blocked = true;
      if (this.tapArmed) return; this.tapArmed = true;
      const start = (e) => {
        if (!this.blocked || !this.alive || !this.song) { this.clearTap(); return; }
        if (e.target.closest?.('button,select,input,a,summary')) { this.root.addEventListener('pointerdown', start, {once: true, signal: this.abort.signal}); return; }
        this.clearTap(); this.play();
        /* Code by Daniel using ChatGPT November 19, 2026 */
      };
      this.tapStart = start;
      this.root.addEventListener('pointerdown', start, {once: true, signal: this.abort.signal});
      /* Code by Daniel using ChatGPT November 19, 2026 */
    }
    say(message) {
      this.message = message;
      const el = this.root.querySelector('[data-status]'); if (el) el.textContent = message;
      /* Code by Daniel using ChatGPT November 13, 2026 */
    }
    clock() {
      const rec = this.record();
      return rec ? rec.audio.currentTime : this.manualSeconds + (this.manual ? (performance.now() - this.manualAt) / 1000 * this.speed : 0);
      /* Code by Daniel using ChatGPT November 13, 2026 */
    }
    formatTime(t) {
      return Math.floor(t / 60) + ':' + String(Math.floor(t % 60)).padStart(2, '0');
      /* Code by Daniel using ChatGPT November 13, 2026 */
    }
    update() {
      if (!this.alive || !this.song) return;
      const rec = this.record(), audio = rec?.audio, playing = audio && !audio.paused && !audio.ended;
      this.root.querySelector('[data-action=play]').disabled = !rec || !!audio?.error || playing;
      this.root.querySelector('[data-action=play]').textContent = preferences.mode === 'vocal' ? 'Play with singers' : 'Play instrumental';
      this.root.querySelector('[data-action=pause]').disabled = !playing && !this.manual;
      const toggle = this.root.querySelector('[data-action=toggle]');
      if (toggle) { toggle.textContent = playing ? '❚❚ Pause' : '▶ Play'; toggle.setAttribute('aria-pressed', String(!!playing)); toggle.disabled = !rec || !!audio?.error; toggle.classList.toggle('lh-needs-tap', !playing && !!this.blocked); const hint = this.root.querySelector('[data-quick-hint]'); if (hint) hint.textContent = !playing && this.blocked ? 'Tap to hear it' : ''; }
      const seek = this.root.querySelector('[data-action=seek]');
      seek.disabled = !Number.isFinite(audio?.duration);
      if (!seek.disabled) { seek.max = audio.duration; if (document.activeElement !== seek) seek.value = audio.currentTime; }
      this.root.querySelector('[data-time]').textContent = this.formatTime(audio?.currentTime || 0) + (Number.isFinite(audio?.duration) ? ' / ' + this.formatTime(audio.duration) : '');
      const bpm = rec?.timing?.bpm || rec?.bpm || this.song.bpm;
      this.root.querySelector('[data-tempo]').textContent = Math.round(bpm * this.speed) + ' BPM · ' + Math.round(this.speed * 100) + '%';
      this.root.querySelector('[data-action=slower]').disabled = this.speed <= .5;
      this.root.querySelector('[data-action=faster]').disabled = this.speed >= 1.5;
      this.root.querySelector('[data-action=guide-start]').disabled = !!rec;
      this.root.querySelector('[data-action=guide-start]').textContent = this.manual ? 'Pause beat' : 'Start beat without music';
      this.root.querySelector('[data-timing-label]').textContent = rec?.timing?.lines.length ? 'Follow the highlighted line. Verses turn with the music.' : 'Beat guide only. Turn verses yourself as you sing.';
      const next = flatLines(this.song)[rec?.timing?.lines.length || 0];
      const markLabel=this.root.querySelector('[data-mark-label]');
      if(markLabel){
        markLabel.textContent=next ? 'Next: “' + next.text + '”' : 'Every line has a mark. Play through to review them.';
        for(const action of ['mark','clear-marks','export'])this.root.querySelector('[data-action='+action+']').disabled=!rec||(action==='mark'&&(!playing||!next));
      }
      this.renderBeats();
      if (preferences.guide && !playing && !this.manual) {
        for (const dot of this.root.querySelectorAll('[data-beats] .is-beat')) {dot.classList.remove('is-beat');dot.firstElementChild.style.transform='none';}
        this.root.querySelector('[data-beat-label]').textContent='Ready when you are.';
      }
      if (preferences.guide && (playing || this.manual) && !document.hidden && !this.frame) this.frame = requestAnimationFrame(this.frameTick);
      /* Code by Daniel using ChatGPT November 13, 2026 */
    }
    renderBeats() {
      const box = this.root.querySelector('[data-beats]');
      const count = this.record()?.timing?.beatsPerBar || this.record()?.beatsPerBar || this.song.beatsPerBar;
      if (box.childElementCount !== count) box.innerHTML = '<span class="lh-beat"><i class="lh-ball"></i></span>'.repeat(count);
      /* Code by Daniel using ChatGPT November 13, 2026 */
    }
    frameTick() {
      this.frame = 0;
      if (!this.alive || !this.root.isConnected || (this.dialog && !this.dialog.open)) { this.dispose(); return; }
      const rec = this.record(), playing = rec ? !rec.audio.paused && !rec.audio.ended : this.manual;
      if (!preferences.guide || !playing || document.hidden) return;
      const bpm = rec?.timing?.bpm || rec?.bpm || this.song.bpm, meter = rec?.timing?.beatsPerBar || rec?.beatsPerBar || this.song.beatsPerBar;
      const clock = this.clock();
      const sections = this.offset === null ? rec?.timing?.sections || [] : [];
      let section = null;
      for (const s of sections) { if (s.start > clock) break; section = s; }
      const first = this.offset ?? section?.firstBeat ?? rec?.timing?.firstBeat ?? 0, beat = (clock - first) * bpm / 60;
      const waiting = sections.length ? !section : beat < 0;
      const holding = section?.end !== undefined && clock >= section.end;
      const index = waiting || holding ? -1 : ((Math.floor(beat) % meter) + meter) % meter, phase = beat - Math.floor(beat);
      const motion = !matchMedia('(prefers-reduced-motion: reduce)').matches && (!this.options.allowMotion || this.options.allowMotion());
      const dots = this.root.querySelector('[data-beats]').children;
      for (let i = 0; i < dots.length; i++) {
        dots[i].classList.toggle('is-beat', i === index);
        dots[i].firstElementChild.style.transform = motion && i === index ? 'translateY(' + (-Math.sin(phase * Math.PI) * 7) + 'px)' : 'none';
      }
      this.root.querySelector('[data-beat-label]').textContent = holding ? 'Hold gently…' : index < 0 ? 'The first beat is coming…' : 'Beat ' + (index + 1) + ' of ' + meter;
      let cue = null;
      for (const candidate of rec?.timing?.lines || []) { if (candidate.time > clock) break; cue = candidate; }
      const key = cue ? cue.verse + ':' + cue.line : null;
      if (this.currentCue !== key) {
        this.currentCue = key;
        if (cue && !this.all && this.verse !== cue.verse) { this.verse = cue.verse; this.renderLyrics(); }
        for (const line of this.root.querySelectorAll('[data-line]')) line.classList.toggle('is-current', line.dataset.line === key);
      }
      this.frame = requestAnimationFrame(this.frameTick);
      /* Code by Daniel using ChatGPT November 13, 2026 */
    }
    changeSpeed(delta) {
      this.manualSeconds = this.clock(); this.manualAt = performance.now();
      this.speed = Math.min(1.5, Math.max(.5, Math.round((this.speed + delta) * 100) / 100));
      const audio = this.record()?.audio;
      if (audio) { audio.preservesPitch = true; audio.playbackRate = this.speed; }
      this.update();
      /* Code by Daniel using ChatGPT November 13, 2026 */
    }
    async play() {
      this.clearTap();
      this.cancelOpeningSong();
      const rec = this.record(); if (!rec) return;
      const request=++this.playRequest;
      rec.owner = this;
      for (const other of tracks.values()) if (other !== rec) other.audio.pause();
      this.manual = false;
      if (this.options.onBeforePlay) this.options.onBeforePlay();
      if(rec.ready){
        await rec.ready;
        if(!this.alive || document.hidden || this.record()!==rec || request!==this.playRequest)return;
      }
      rec.audio.volume = preferences.volume;
      rec.audio.loop = false; rec.audio.preservesPitch = true; rec.audio.playbackRate = this.speed;
      try { await rec.audio.play(); if (this.alive && this.record() === rec && request===this.playRequest) this.say('Playing '+this.song.title+(preferences.mode==='vocal'?' with singers.':'.')); }
      catch (err) {
        if (this.alive && this.record() === rec && request===this.playRequest) {
          // Phones refuse sound that did not start from a tap (the opening carol's timer, the next random carol).
          if (!rec.audio.error && err?.name === 'NotAllowedError') this.awaitTap();
          this.say(rec.audio.error ? 'This recording could not play. Try reopening the hymnal.' : this.blocked ? 'Tap ▶ Play to hear it.' : 'Press Play when you’re ready.');
        }
      }
      if (!rec.audio.paused) this.blocked = false;
      if (!this.alive || this.record() !== rec) { if (rec.owner === this) rec.audio.pause(); } else this.update();
      /* Code by Daniel using ChatGPT November 19, 2026 */
    }
    async importAudio(file) {
      if (!file || file.size > 30000000) { this.say('Choose an audio file under 30 MB.'); return; }
      this.stop(); const token = ++this.upload, song = this.song, mode = preferences.mode;
      this.say('Preparing your recording…');
      try {
        const bytes = new Uint8Array(await crypto.subtle.digest('SHA-256', await file.arrayBuffer()));
        const sha256 = Array.from(bytes).map(function hex(b) {
          return b.toString(16).padStart(2, '0');
          /* Code by Daniel using ChatGPT November 13, 2026 */
        }).join('');
        if (!this.alive || this.upload !== token || this.song !== song || preferences.mode !== mode) return;
        const key = song.id + ':' + mode, old = tracks.get(key);
        if (old) { old.audio.pause(); URL.revokeObjectURL(old.url); }
        const url = URL.createObjectURL(file), audio = new Audio(url);
        audio.preload = 'metadata';
        tracks.set(key, {audio, url, custom:true, name: file.name, bytes: file.size, sha256, bpm: song.bpm, beatsPerBar: song.beatsPerBar, timing: null});
        this.speed = 1; this.setupOpen = true; this.message = file.name + ' is ready. Press Play when you’re ready.'; this.render();
      } catch { this.say('The recording could not be prepared. Try a local preview on localhost and another audio file.'); }
      /* Code by Daniel using ChatGPT November 13, 2026 */
    }
    async importTiming(file) {
      const rec = this.record(), song = this.song;
      if (!file || !rec) { this.say('Choose this hymn’s recording first.'); return; }
      if (file.size > 200000) { this.say('Choose a timing JSON file under 200 KB.'); return; }
      try {
        const timing = validateTiming(JSON.parse(await file.text()), song, rec);
        if (!this.alive || this.song !== song || this.record() !== rec) return;
        this.stop(); rec.timing = timing; this.setupOpen = true;
        this.message = timing.lines.length ? 'Line timings loaded. Enable Carol Along, then press Play.' : 'Beat timings loaded. Enable Carol Along, then press Play.';
        this.render();
      } catch (error) { if (this.alive && this.song === song && this.record() === rec) this.say(error.message); }
      /* Code by Daniel using ChatGPT November 13, 2026 */
    }
    timingTemplate() {
      const rec = this.record();
      return {schema: 1, hymnId: this.song.id, lyricVersion: this.song.lyricVersion, recording: {name: rec.name, bytes: rec.bytes, sha256: rec.sha256}, bpm: rec.bpm, beatsPerBar: rec.beatsPerBar, firstBeat: this.offset ?? 0, lines: []};
      /* Code by Daniel using ChatGPT November 13, 2026 */
    }
    exportTiming() {
      const rec = this.record(); if (!rec) return;
      const data = rec.timing || this.timingTemplate();
      const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2) + '\n'], {type: 'application/json'})), link = document.createElement('a');
      link.href = url; link.download = this.song.id + '-' + preferences.mode + '-timing.json'; link.click();
      setTimeout(function releaseDownload() {
        URL.revokeObjectURL(url);
        /* Code by Daniel using ChatGPT November 13, 2026 */
      }, 1000);
      this.say('Timing file saved. Keep it with the recording.');
      /* Code by Daniel using ChatGPT November 13, 2026 */
    }
    markLine() {
      const rec = this.record(); if (!rec || rec.audio.paused) return;
      const timing = rec.timing || this.timingTemplate(), next = flatLines(this.song)[timing.lines.length];
      if (!next) return;
      const time = Math.round(rec.audio.currentTime * 1000) / 1000;
      if (timing.lines.length && time <= timing.lines[timing.lines.length - 1].time) { this.say('Continue past the previous mark before marking the next line.'); return; }
      timing.lines.push({time, verse: next.verse, line: next.line}); rec.timing = timing;
      this.say('Marked: “' + next.text + '”'); this.update();
      /* Code by Daniel using ChatGPT November 13, 2026 */
    }
    updateModeOptions(select) {
      if (this.options.authoring) return;
      for (const option of select.options) {
        const mode=option.value, songs=this.song ? [this.song] : this.songs;
        option.disabled=!songs.some((song)=>{
          const src=this.options.recordings?.[song.id]?.[mode];
          return !!(typeof src==='string'?src:src?.src) || tracks.get(song.id+':'+mode)?.custom === true;
          /* Code by Daniel using ChatGPT November 13, 2026 */
        });
        option.textContent=mode==='vocal' ? 'With singers'+(option.disabled?' · unavailable':'') : 'Instrumental accompaniment';
      }
      /* Code by Daniel using ChatGPT November 13, 2026 */
    }
    preferencesHTML() {
      return '<section class="lh-guide"><h3>Music &amp; singing</h3><label>Caroler playback <select data-action="mode"><option value="instrumental">Instrumental accompaniment</option><option value="vocal" ' + (preferences.mode === 'vocal' ? 'selected' : '') + '>With singers</option></select></label><label><input data-action="guide" type="checkbox" ' + (preferences.guide ? 'checked' : '') + '>Carol Along · gentle beat guide</label><label><input data-action="invitation" type="checkbox" ' + (preferences.invitation ? 'checked' : '') + '>Show the invitation to sing</label><p class="lh-muted">Instrumental is the starting choice. The beat guide starts switched off. Your reading and singing choices are remembered on this device.</p>' + (this.options.onSettings ? '<button data-action="game-settings">Game sound &amp; volume</button>' : '') + '</section>';
      /* Code by Daniel using ChatGPT November 13, 2026 */
    }
    click(e) {
      const button = e.target.closest('button[data-action]'); if (!button || !this.root.contains(button)) return;
      const action = button.dataset.action;
      if(action==='winter-book'){this.cancelOpeningSong();this.stop();this.options.onWinterBook?.();}
      else if (action === 'main-carols' || action === 'extra-carols') { this.contentsPage = action === 'extra-carols' ? 1 : 0; this.render(); }
      else if (action === 'song' || action === 'open' || action === 'invite-sing' || action === 'invite-read') {
        const index = action === 'open' ? Number(this.root.querySelector('.lh-contents button[data-index]')?.dataset.index) : Number(button.dataset.index) || 0;
        const song = this.songs[index]; if (!song) return;
        this.cancelOpeningSong();
        this.stop();
        if (action.startsWith('invite-')) setPreferences({invitation: false, ...(action === 'invite-sing' ? {guide: true} : {})});
        this.song = song; this.verse = 0; this.speed = 1;
        this.all = action === 'invite-read'; this.message = ''; this.setupOpen = false;
        this.render(); this.root.querySelector('h2')?.scrollIntoView({block: 'nearest'});
        if (action === 'song' || action === 'invite-sing') this.play();
      } else if (action === 'contents') { this.cancelOpeningSong(); this.stop(); this.song = null; this.message = ''; this.render(); }
      else if (action === 'previous' || action === 'next') { this.verse += action === 'next' ? 1 : -1; this.verse = Math.max(0, Math.min(this.song.verses.length - 1, this.verse)); this.renderLyrics(); this.currentCue = null; }
      else if (action === 'all') { this.all = !this.all; button.textContent = this.all ? 'One verse at a time' : 'Read whole hymn'; this.renderLyrics(); this.currentCue = null; }
      else if (action === 'preferences') { const box = this.root.querySelector('[data-preferences]'); box.hidden = !box.hidden; if (!box.hidden) {box.innerHTML = this.preferencesHTML();this.updateModeOptions(box.querySelector('[data-action=mode]'));} }
      else if (action === 'game-settings') { this.cancelOpeningSong(); this.options.onSettings?.(); }
      else if (action === 'play') this.play();
      else if (action === 'toggle') { const a = this.record()?.audio; if (a && !a.paused && !a.ended) { this.playRequest++; a.pause(); this.manualSeconds = this.clock(); this.manual = false; this.say('Paused.'); this.update(); } else this.play(); }
      else if (action === 'pause') { this.playRequest++; this.record()?.audio.pause(); this.manualSeconds = this.clock(); this.manual = false; this.update(); }
      else if (action === 'stop') { this.stop(); this.say('Stopped.'); }
      else if (action === 'slower' || action === 'faster') this.changeSpeed(action === 'slower' ? -.05 : .05);
      else if (action === 'reset-speed') this.changeSpeed(1 - this.speed);
      else if (action === 'guide-start') { this.manualSeconds = this.clock(); this.manual = !this.manual; this.manualAt = performance.now(); this.update(); }
      else if (action === 'tap') { const time = this.clock(), rec = this.record(); if (rec && Number.isFinite(rec.audio.duration) && time >= rec.audio.duration) { this.say('Choose a position before the recording ends.'); return; } this.offset = time; if (rec?.timing) rec.timing.firstBeat = this.offset; this.say('First beat set here.'); this.update(); }
      else if (action === 'mark') this.markLine();
      else if (action === 'clear-marks') { const rec = this.record(); if (rec) rec.timing = null; this.currentCue = null; this.renderLyrics(); this.say('Line marks cleared.'); this.update(); }
      else if (action === 'export') this.exportTiming();
      /* Code by Daniel using ChatGPT November 18, 2026 */
    }
    change(e) {
      const el = e.target, action = el.dataset.action;
      if (action === 'audio') this.importAudio(el.files[0]);
      else if (action === 'timing') this.importTiming(el.files[0]);
      else if (action === 'mode') { this.stop(); setPreferences({mode: el.value}); this.speed = 1; this.upload++; this.message = ''; this.setupOpen = !!this.song; this.render(); }
      else if (action === 'volume') { setPreferences({volume:Number(el.value)}); const audio=this.record()?.audio; if(audio)audio.volume=preferences.volume; }
      else if (action === 'guide') {
        setPreferences({guide: el.checked}); this.manual = false; this.manualSeconds = 0; this.currentCue = null;
        if (!preferences.guide) { this.cancelFrame(); this.renderLyrics(); }
        for (const check of this.root.querySelectorAll('[data-action=guide]')) check.checked = preferences.guide;
        for (const guide of this.root.querySelectorAll('[data-guide],[data-guide-strip]')) guide.hidden = !preferences.guide;
        this.update();
      } else if (action === 'invitation') setPreferences({invitation: el.checked});
      else if (action === 'shuffle') { setPreferences({shuffle: el.checked}); for (const check of this.root.querySelectorAll('[data-action=shuffle]')) check.checked = preferences.shuffle; }
      else if (action === 'size') { setPreferences({textSize: Number(el.value)}); this.root.style.setProperty('--lh-size', preferences.textSize + 'px'); }
      else if (action === 'seek') { const audio = this.record()?.audio; if (audio && Number.isFinite(audio.duration)) { audio.currentTime = Math.min(audio.duration, Math.max(0, Number(el.value))); this.currentCue = null; this.update(); } }
      else if (action === 'bpm' || action === 'meter') {
        const rec = this.record(), value = Number(el.value);
        if (action === 'bpm' && (!Number.isFinite(value) || value < 30 || value > 240)) { el.value = rec?.bpm || this.song.bpm; return; }
        if (rec) { const field = action === 'bpm' ? 'bpm' : 'beatsPerBar'; rec[field] = value; if (rec.timing) rec.timing[field] = value; }
        else { this.song = {...this.song, [action === 'bpm' ? 'bpm' : 'beatsPerBar']: value}; }
        this.update();
      }
      /* Code by Daniel using ChatGPT November 13, 2026 */
    }
  }
  function mount(root, options = {}) {
    active?.dispose(); active = new Hymnal(root, options); return active;
    /* Code by Daniel using ChatGPT November 13, 2026 */
  }
  function unmount() {
    active?.dispose();
    /* Code by Daniel using ChatGPT November 13, 2026 */
  }
  function getPreferences() {
    return {...preferences};
    /* Code by Daniel using ChatGPT November 13, 2026 */
  }
  return {mount, unmount, getPreferences, setPreferences, validateTiming};
  /* Code by Daniel using ChatGPT November 19, 2026 */
})();
