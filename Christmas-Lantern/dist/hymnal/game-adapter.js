'use strict';
function openLinkedHymnal() {
  if (new URLSearchParams(location.search).get('hymnal') !== '1' || !window.LANTERN_HYMNAL_CONFIG?.enabled) return;
  if (g.transition) finishTransition();
  rememberCarolersHymnal();
  openLanternHymnal();
  /* Code by Daniel using ChatGPT November 18, 2026 */
}
function openLanternHymnal() {
  g.carolPlaying = false;
  showPanel('<div id="lantern-hymnal"></div>', 'CAROLS BESIDE THE PINES');
  LanternHymnal.mount(document.querySelector('#lantern-hymnal'), {
    songs: window.LANTERN_HYMNS,
    recordings: window.LANTERN_HYMNAL_CONFIG.recordings,
    onBeforePlay: function quietGameBells() {
      AudioScene.change();
      /* Code by Daniel using ChatGPT November 13, 2026 */
    },
    onSettings: settings,
    onWinterBook: state.keepsakes.winterSongbook?openGrandmotherSongbook16:null,
    allowMotion: function hymnMotion() {
      return state.motion;
      /* Code by Daniel using ChatGPT November 13, 2026 */
    }
  });
  AudioScene.change(); // The hymnal has its own music, so the room's music stops here instead of playing softly.
  /* Code by Daniel using ChatGPT November 13, 2026 */
  /* Code by Daniel using Claude November 14, 2026 */
}
function appendHymnalSettings() {
  if (!window.LANTERN_HYMNAL_CONFIG?.enabled) return;
  const prefs = LanternHymnal.getPreferences();
  document.querySelector('#panel-content').insertAdjacentHTML('beforeend', '<details><summary>Caroler’s hymnal · music &amp; singing</summary><p>Carols to read or sing together.</p><label for="hymnal-mode">Caroler playback</label><select id="hymnal-mode"><option value="instrumental">Instrumental accompaniment</option><option value="vocal" ' + (prefs.mode === 'vocal' ? 'selected' : '') + '>With singers</option></select><div class="row setting-check"><input id="hymnal-guide" type="checkbox" ' + (prefs.guide ? 'checked' : '') + '><label for="hymnal-guide">Carol Along · gentle beat guide</label></div><div class="row setting-check"><input id="hymnal-invite" type="checkbox" ' + (prefs.invitation ? 'checked' : '') + '><label for="hymnal-invite">Show the invitation to sing</label></div><div class="row setting-check"><input id="hymnal-shuffle" type="checkbox" ' + (prefs.shuffle ? 'checked' : '') + '><label for="hymnal-shuffle">Random next song · keep playing in the hymnal</label></div><button id="hymnal-open">Open the carolers’ hymnal</button></details>');
  document.querySelector('#hymnal-mode').onchange = function hymnMode(e) {
    LanternHymnal.setPreferences({mode: e.target.value});
    /* Code by Daniel using ChatGPT November 13, 2026 */
  };
  document.querySelector('#hymnal-guide').onchange = function hymnGuide(e) {
    LanternHymnal.setPreferences({guide: e.target.checked});
    /* Code by Daniel using ChatGPT November 13, 2026 */
  };
  document.querySelector('#hymnal-shuffle').onchange = function hymnShuffle(e) {
    LanternHymnal.setPreferences({shuffle: e.target.checked});
  };
  document.querySelector('#hymnal-invite').onchange = function hymnInvitation(e) {
    LanternHymnal.setPreferences({invitation: e.target.checked});
    /* Code by Daniel using ChatGPT November 13, 2026 */
  };
  document.querySelector('#hymnal-open').onclick = openLanternHymnal;
  /* Code by Daniel using ChatGPT November 18, 2026 */}

function refreshHymnalShortcut(){
 const ready=state.keepsakes?.hymnal===true&&!!window.LANTERN_HYMNAL_CONFIG?.enabled&&!!window.LanternHymnal;
 const button=document.querySelector('#hymnal-shortcut');
 if(button){
  button.hidden=!ready;
  button.onclick=function carryHymnal(){if(refreshHymnalShortcut()&&!g.transition)openLanternHymnal();/* Code by Daniel using ChatGPT November 13, 2026 */};
 }
 return ready;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function rememberCarolersHymnal(){
 if(state.keepsakes.hymnal!==true){state.keepsakes.hymnal=true;save();}
 refreshHymnalShortcut();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function hymnalWaypackHTML(){
 if(!refreshHymnalShortcut())return '';
 return '<button class="pack-hymnal" id="pack-hymnal">'+document.querySelector('#hymnal-shortcut .hymnal-icon').outerHTML+'<span>The carolers’ hymnal<small>Read or sing · Carol Along</small></span></button>';
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function openGrandmotherSongbook16(){
  if(state.keepsakes.winterSongbook!==true){state.keepsakes.winterSongbook=true;save();}
  g.carolPlaying=false;
  showPanel('<div id="winter-songbook16"></div>','GRANDMOTHER’S BOOKSHELF');
  LanternWinterSongs.mount(document.querySelector('#winter-songbook16'),{
    page:state.play10.winterBookPage||0,
    onHymnal:window.LANTERN_HYMNAL_CONFIG?.enabled?openLanternHymnal:null,
    onPage:function rememberWinterPage16(page){state.play10.winterBookPage=page;save();/* Code by Daniel using ChatGPT November 13, 2026 */}
  });
  AudioScene.change(); // As in the hymnal: the songbook is read or sung without the room's music.
  /* Code by Daniel using ChatGPT November 13, 2026 */
  /* Code by Daniel using Claude November 14, 2026 */
}
function winterSongbookWaypack16(){
  return state.keepsakes.winterSongbook?'<button class="pack-hymnal" id="pack-winter16"><span class="pack-icon" aria-hidden="true">❧</span><span>Grandmother’s Winter Songbook<small>Cultural songs · a snowy family journey</small></span></button>':'';
  /* Code by Daniel using ChatGPT November 13, 2026 */
}
