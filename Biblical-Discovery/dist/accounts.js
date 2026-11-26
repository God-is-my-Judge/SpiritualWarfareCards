'use strict';
// Upstairs gallery reader for "The Accounts". Claude for Daniel, 19 November 2026; rebuilt 21 November 2026
// for Daniel's sixteen events, Creation to New Creation (Foundation-Claude/13, section 4).
// Each page fills the screen with its backdrop; the text sits on a darkened panel in the middle and scrolls there.
// Teen text first; "Say it simply" (saved) switches to the kids' text.
// Painted mnemonic gestures; these are memory aids, not a formal sign-language course.
window.BD_ACCOUNTS={
 // Painted hand-sign pictures at assets/sign-<key>.webp, including all sixteen current steps.
 art:['road','stars','robe','bricks','exodus','law','home','kings','split','fall','exile','return','wait','world','baby','dove','follow','hosanna','cross','risen','pentecost','changed','rome','courage','written','go','creation','garden','prophets','new-creation'],
 testament:'ot',page:0,
 scenes:{
  stars:{alt:'A traveler looks up at the stars above a quiet desert camp.',caption:'Count the stars.'},
  exodus:{alt:'Families walk a sandy path between the parted sea walls toward dawn.',caption:'A way through the sea.'},
  law:{alt:'Light and cloud cover Sinai above a distant camp.',caption:'Fire on the mountain.'},
  baby:{alt:'A humble manger and lamplight in Bethlehem.',caption:'Room for a King.'},
  cross:{alt:'Three empty crosses on a rocky hill outside Jerusalem at sunset.',caption:'Paid in full.'},
  risen:{alt:'Dawn lights an empty rock-cut tomb; linen rests inside.',caption:'The tomb is empty.'},
  pentecost:{alt:'Wind moves a curtain above a gathering in ancient Jerusalem.',caption:'Good news for every nation.'},
  written:{alt:'Papyrus, a reed pen and an oil lamp on an ancient writing table.',caption:'Letters to the churches.'}
 },
 // The 66 books in order, with their kind of writing (for the Bible shelf).
 kinds:{law:'Law',history:'History',wisdom:'Poetry and Wisdom',prophets:'Prophets',gospels:'Gospels',letters:'Letters',prophecy:'Prophecy'},
 books:(function canon(){const rows=[['law',['Genesis','Exodus','Leviticus','Numbers','Deuteronomy']],['history',['Joshua','Judges','Ruth','1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles','Ezra','Nehemiah','Esther']],['wisdom',['Job','Psalms','Proverbs','Ecclesiastes','Song of Songs']],['prophets',['Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malachi']],['gospels',['Matthew','Mark','Luke','John']],['history',['Acts']],['letters',['Romans','1 Corinthians','2 Corinthians','Galatians','Ephesians','Philippians','Colossians','1 Thessalonians','2 Thessalonians','1 Timothy','2 Timothy','Titus','Philemon','Hebrews','James','1 Peter','2 Peter','1 John','2 John','3 John','Jude']],['prophecy',['Revelation']]];/* Code by Daniel using Claude November 21, 2026 */return rows.flatMap(function each(r){return r[1].map(function book(name){return [name,r[0]];});});})(),
 chant:[['Creation','Fall','Promise','Exodus'],['Law','Land','King','Prophets'],['Exile','Return','Jesus','Cross'],['Risen','Spirit','Church','New Creation']],
 // The museum's twelve finds, by the step where each belongs in the story. Claude for Daniel, 23 November 2026.
 finds:{exodus:['avaris'],land:['thebes'],king:['tel-dan'],prophets:['nimrud','qumran'],return:['babylon'],jesus:['galilee','bethesda'],cross:['caesarea'],church:['delphi','oxyrhynchus','megiddo']},
 stepOf(id){return BD_ACCOUNTS.steps().findIndex(function holds(s){return (BD_ACCOUNTS.finds[s.p.w.toLowerCase().replace(/[^a-z]+/g,'-')]||[]).includes(id);});/* Code by Daniel using Claude November 23, 2026 */},
 // After a dig, the readings upstairs that tell what happened there. Claude for Daniel, 24 November 2026.
 // The first is always the find's own step (the one whose "From the dig" box holds it). A second is added only
 // where another step tells the same history and its "Going deeper" sources treat the same object; never more than two.
 readings:{
  'tel-dan':[['king','David’s house, the dynasty this stone names'],['prophets','The two kingdoms in the stone’s day']],
  nimrud:[['prophets','Jehu’s Israel and the rise of Assyria']],
  babylon:[['return','Cyrus lets the exiles go home'],['exile','How Judah came to be in Babylon']],
  thebes:[['land','Israel in Canaan, where the stele names it'],['exodus','The rescue that came before it']],
  qumran:[['prophets','Isaiah, whose words this scroll copies'],['jesus','Jesus reads Isaiah in Nazareth']],
  avaris:[['exodus','Israel in Egypt’s Delta, and the way out'],['promise','How Jacob’s family came to Egypt']],
  galilee:[['jesus','The fishermen Jesus called by this lake']],
  bethesda:[['jesus','Jesus’s years of healing and teaching']],
  caesarea:[['cross','Pilate’s sentence and the cross']],
  delphi:[['church','Paul crosses the Roman world']],
  oxyrhynchus:[['church','How the New Testament was written']],
  megiddo:[['church','Soldiers, mothers and merchants carry the news']]
 },
 readingsFor(id){
  const all=BD_ACCOUNTS.steps();
  return (BD_ACCOUNTS.readings[id]||[]).slice(0,2).map(function step([word,why]){const n=all.findIndex(function named(s){return s.p.w.toLowerCase().replace(/[^a-z]+/g,'-')===word;});return n<0?null:{n,word,why,p:all[n].p};}).filter(Boolean);
  /* Code by Daniel using Claude November 24, 2026 */
 },
 afterDig(id){
  const rows=BD_ACCOUNTS.readingsFor(id);if(!rows.length)return '';
  return '<nav class="find-story no-read" aria-label="Read more in the Bible’s story, upstairs"><p class="find-story-label">In the Bible’s story · upstairs</p><div class="find-story-links">'+rows.map(function link(r){return '<a class="find-story-link" href="#upstairs='+r.word+'" data-story-step="'+(r.n+1)+'"><span>Step '+(r.n+1)+' · '+escapeHTML(r.p.w)+' →</span><small>'+escapeHTML(r.why)+'</small></a>';}).join('')+'</div></nav>';
  /* Code by Daniel using Claude November 24, 2026 */
 },
 fromDig(p){
  const ids=BD_ACCOUNTS.finds[p.w.toLowerCase().replace(/[^a-z]+/g,'-')];if(!ids)return '';
  return '<aside class="acc-finds"><b>From the dig</b><ul>'+ids.map(function find(id){const s=BD_SITES.find(function site(x){return x.id===id;}),got=!!game.save.finds[id];
   return '<li class="'+(got?'found':'waiting')+'"><span class="acc-find-mark" aria-hidden="true">'+(got?'✓':'◇')+'</span>'+(got?'<button class="acc-find" data-card="'+id+'">'+escapeHTML(s.artifact)+'</button><small>in your museum</small>':'<span>'+escapeHTML(s.artifact)+'</span><small>still in the ground at '+escapeHTML(s.place)+'</small><button class="button secondary small" data-fly="'+id+'">Fly there</button>')+'</li>';}).join('')+'</ul></aside>';
  /* Code by Daniel using Claude November 23, 2026 */
 },
 steps(){return ['ot','nt'].flatMap(function both(t){return BD_ACCOUNTS_DATA[t].pages.map(function step(p,i){return {t,i,p};});});/* Code by Daniel using Claude November 21, 2026 */},
 index(){return BD_ACCOUNTS.steps().findIndex(function here(s){return s.t===BD_ACCOUNTS.testament&&s.i===BD_ACCOUNTS.page;});/* Code by Daniel using Claude November 21, 2026 */},
 current(){return BD_ACCOUNTS_DATA[BD_ACCOUNTS.testament].pages[BD_ACCOUNTS.page];/* Code by Daniel using Claude November 21, 2026 */},
 simple(){const s=game.save.settings;return s.accountsLevel?s.accountsLevel==='kids':!!s.explorer;/* Code by Daniel using Claude November 21, 2026 */},
 picture(p,lazy=false){
  return p.art&&BD_ACCOUNTS.art.includes(p.art)?'<img src="'+BD_ART.assetURL('assets/sign-'+p.art+'.webp')+'" width="512" height="512" decoding="async"'+(lazy?' loading="lazy"':'')+' alt="">':'<span class="acc-icon">'+p.icon+'</span>';
  /* Code by Daniel using Claude November 21, 2026 */
 },
 vignette(p){
  const scene=p.scene&&BD_ACCOUNTS.scenes[p.scene];if(!scene)return '';
  return '<figure class="acc-scene"><img src="'+BD_ART.assetURL('assets/account-'+p.scene+'.webp')+'" width="768" height="512" decoding="async" alt="'+escapeHTML(scene.alt)+'"><figcaption>'+escapeHTML(scene.caption)+'</figcaption></figure>';
  /* Code by Daniel using Claude November 21, 2026 */
 },
 // The page's painting fills the screen behind the text (the dialog's backdrop layer), darkened toward the middle.
 immerse(p){
  const panel=$('#panel');panel.classList.add('acc-immersive');panel.classList.remove('acc-viewing');BD_ACCOUNTS.paintingScroll=0;
  let style=document.getElementById('acc-backdrop-style');if(!style){style=document.createElement('style');style.id='acc-backdrop-style';document.head.appendChild(style);}
  const url=BD_ART.assetURL('assets/acc-bg-'+p.bg+'.webp'),focus=Number.isFinite(p.bgFocus)?Math.max(0,Math.min(100,p.bgFocus)):50,intro=Number.isFinite(p.bgIntro)?Math.max(20,Math.min(40,p.bgIntro)):24;
  style.textContent='#panel.acc-immersive{--acc-desktop-intro:min(max('+intro+'vh,'+(intro/1.6)+'vw),55svh)}#panel.acc-immersive::backdrop{background:radial-gradient(ellipse at 50% 66%,#0d0a07c7 0,#0d0a0780 52%,#0d0a0730 100%),url("'+url+'") '+focus+'% top/cover no-repeat,#1d1710;-webkit-backdrop-filter:none;backdrop-filter:none}#panel.acc-immersive.acc-viewing::backdrop{background:url("'+url+'") center/contain no-repeat,#1d1710}';
  const before=game.dialogCleanup;game.dialogCleanup=function leaveGallery(){panel.classList.remove('acc-immersive','acc-viewing');if(before)before();};
  /* Code by Daniel using ChatGPT November 23, 2026 */
 },
 // "View the painting": the text fades away so a group can look at the whole picture together.
 viewing(on){
  const panel=$('#panel'),reader=panel.querySelector('.acc-reader'),back=panel.querySelector('[data-acc-text]');if(panel.classList.contains('acc-viewing')===on)return;
  if(on)BD_ACCOUNTS.paintingScroll=panel.scrollTop;
  panel.classList.toggle('acc-viewing',on);if(reader)reader.inert=on;if(back)back.hidden=!on;
  if(on){panel.scrollTop=0;back?.focus({preventScroll:true});}else{panel.querySelector('[data-acc-view]')?.focus({preventScroll:true});panel.scrollTop=BD_ACCOUNTS.paintingScroll||0;}
  /* Code by Daniel using ChatGPT November 22, 2026 */
 },
 signView(){
  const p=BD_ACCOUNTS.current();
  openPanel('UPSTAIRS · '+p.w.toUpperCase(),'<article class="acc-reader acc-sign-view"><h2>'+escapeHTML(p.w)+'</h2><figure class="acc-large-sign">'+BD_ACCOUNTS.picture(p)+'</figure><p>'+escapeHTML(p.sign)+'</p><button class="button secondary" data-acc-return>← Back to the page</button></article>','accounts-sign');
  BD_ACCOUNTS.immerse(p);
  document.querySelector('[data-acc-return]').addEventListener('click',function returnToAccount(){BD_PAD.back();});
  /* Code by Daniel using Claude November 21, 2026 */
 },
 // Going deeper: questions for a class and the sources behind the step (Claude, 23 Nov 2026, for Daniel's high-school and college sessions)
 study(p){
  const s=window.BD_ACCOUNTS_STUDY?.steps?.[p.w];if(!s)return '';
  const rows=s.sources.map(function entry(k){return BD_ACCOUNTS_STUDY.sources[k];}).filter(Boolean);
  return '<details class="acc-study"><summary>Going deeper · questions and sources for a class</summary>'+
   '<h4>Talk it through</h4><ol class="acc-ask">'+s.ask.map(function q(t){return '<li>'+escapeHTML(t)+'</li>';}).join('')+'</ol>'+
   '<h4>Sources</h4>'+rows.map(function src(r){return BD_LIBRARY.sourceText(r);}).join('')+'</details>';
  /* Code by Daniel using Claude November 23, 2026 */
 },
 footnotes(p){
  if(!Array.isArray(p.notes)||!p.notes.length)return '';
  return '<aside class="acc-footnotes" aria-label="Historical and Scripture notes"><p class="acc-note-title">Notes</p><ol>'+p.notes.map(function note(text){return '<li>'+escapeHTML(text)+'</li>';}).join('')+'</ol></aside>';
  /* Code by Daniel using Claude November 21, 2026 */
 },
 // "The promise so far": one clause per step, growing from Creation to the page being read.
 promise(at){
  const all=BD_ACCOUNTS.steps();
  return '<ol class="acc-chain" aria-label="The promise so far">'+all.slice(0,at+1).map(function clause(s,n){const text=s.p.promise.charAt(0).toUpperCase()+s.p.promise.slice(1);return '<li'+(n===at?' class="now"':'')+'>'+escapeHTML(text)+'</li>';}).join('')+'</ol>';
  /* Code by Daniel using Claude November 21, 2026 */
 },
 // The Bible shelf: 66 spines coloured by kind of writing; this step's books stand out, earlier ones stay lit.
 shelf(at){
  const all=BD_ACCOUNTS.steps(),p=all[at].p,now=new Set(p.shelf),lit=new Set();
  all.slice(0,at+1).forEach(function light(s){s.p.shelf.forEach(function add(b){lit.add(b);});});
  const spines=BD_ACCOUNTS.books.map(function spine(b){return '<i class="k-'+b[1]+(now.has(b[0])?' now':lit.has(b[0])?' lit':'')+(b[0]==='Matthew'?' nt':'')+'" title="'+escapeHTML(b[0])+'"></i>';}).join('');
  const here=p.books.map(function where(b){const kind=Object.keys(BD_ACCOUNTS.kinds).find(function k(key){return BD_ACCOUNTS.kinds[key]===b[1];})||'history';return escapeHTML(b[0])+' <span class="acc-kind k-'+kind+'">'+escapeHTML(b[1])+'</span>';}).join(' · ');
  return '<figure class="acc-shelf"><div class="acc-spines" role="img" aria-label="'+lit.size+' of the Bible’s 66 books so far">'+spines+'</div><figcaption><b>In your Bible</b> '+here+'<small>'+lit.size+' of 66 books so far</small></figcaption></figure>';
  /* Code by Daniel using Claude November 21, 2026 */
 },
 open(testament,page){
  BD_ACCOUNTS.testament=testament;BD_ACCOUNTS.page=page;const p=BD_ACCOUNTS.current(),kids=BD_ACCOUNTS.simple(),e=kids?p.kids:p.teen,ot=testament==='ot';
  const all=BD_ACCOUNTS.steps(),at=BD_ACCOUNTS.index(),otLength=BD_ACCOUNTS_DATA.ot.pages.length;
  openPanel('UPSTAIRS · THE ACCOUNTS','<article class="acc-reader'+(kids?' acc-kids':'')+'">'+
   '<div class="acc-top"><button class="acc-step" data-acc-go="'+(at-1)+'" aria-label="Previous step" '+(at===0?'disabled':'')+'>‹</button><span>Step '+(at+1)+' of '+all.length+' · '+(ot?'Old':'New')+' Testament'+(p.date?' · '+escapeHTML(p.date):'')+'</span><button class="acc-step" data-acc-go="'+(at+1)+'" aria-label="Next step" '+(at===all.length-1?'disabled':'')+'>›</button></div>'+
   '<div class="acc-head"><button class="acc-sign" data-acc-enlarge aria-label="Enlarge the '+escapeHTML(p.w)+' hand sign" title="Enlarge the hand sign">'+BD_ACCOUNTS.picture(p)+'</button><div><p class="acc-word">'+escapeHTML(p.w)+'</p><h2 class="acc-title">'+escapeHTML(e.t)+'</h2></div></div>'+
   '<div class="acc-prose">'+BD_ACCOUNTS.vignette(p)+e.p.map(function para(t){return '<p>'+escapeHTML(t)+'</p>';}).join('')+'</div>'+
   '<aside class="acc-thread"><b>The promise so far</b>'+BD_ACCOUNTS.promise(at)+'<p>'+escapeHTML(e.thread)+'</p></aside>'+
   '<p class="acc-you"><b>For you</b> '+escapeHTML(e.you)+'</p>'+
   '<p class="acc-signit"><b>✋ Sign it · '+escapeHTML(p.w)+'</b> '+escapeHTML(p.sign)+'</p>'+
   BD_ACCOUNTS.shelf(at)+
   BD_ACCOUNTS.fromDig(p)+/* Claude, 23 Nov 2026: this step's finds from downstairs */
   '<p class="acc-read">Read '+escapeHTML(p.read)+'</p>'+
   '<div class="acc-nav"><button class="button secondary small" data-acc-go="'+(at-1)+'" '+(at===0?'disabled':'')+'>← Back</button><button class="button small" data-acc-go="'+(at+1)+'" '+(at===all.length-1?'disabled':'')+'>Next →</button></div>'+
   '<div class="acc-tools"><label class="acc-simple"><input type="checkbox" data-acc-simple '+(kids?'checked':'')+'> Say it simply</label><button class="button secondary small" data-acc-review>Sign the whole story</button><button class="button secondary small" data-acc-view>View the painting</button><button class="button secondary small" data-acc-go="'+(ot?otLength:0)+'">'+(ot?'New Testament →':'← Old Testament')+'</button></div>'+
   (window.BD_LINKS?BD_LINKS.line(BD_LINKS.stepHash(at)):'')+/* Claude, 22 Nov 2026: a teacher's link straight to this step */
   BD_ACCOUNTS.footnotes(p)+BD_ACCOUNTS.study(p)+'</article><button class="button acc-to-text" data-acc-text hidden>Back to the text</button>','accounts');
  BD_ACCOUNTS.immerse(p);
  BD_ACCOUNTS.wire();
  /* Code by Daniel using Claude November 21, 2026; link line November 22, 2026; study notes, with the notice now added by bible.js, November 23, 2026 */
 },
 chantHTML(){return '<p class="acc-chant">'+BD_ACCOUNTS.chant.map(function line(words){return words.join(', ');}).join(',<br>')+'.</p>';/* Code by Daniel using Claude November 21, 2026 */},
 review(){
  const kids=BD_ACCOUNTS.simple(),all=BD_ACCOUNTS.steps();
  openPanel('UPSTAIRS · SIGN THE WHOLE STORY','<article class="acc-reader acc-review"><h2>Sign the whole story</h2><p class="lede">'+(kids?'Say each word and make its sign. Can you do all sixteen?':'Sixteen words, sixteen signs, Creation to New Creation. Can you tell the whole Bible with your hands in under a minute?')+'</p>'+BD_ACCOUNTS.chantHTML()+
   all.map(function row(s,n){return (n%4===0?'<h3>'+['Beginnings','A nation and its kings','Exile to the cross','Life for the world'][n/4]+'</h3>':'')+'<button class="acc-row" data-acc-go="'+n+'"><span class="acc-mini">'+BD_ACCOUNTS.picture(s.p,true)+'</span><b>'+(n+1)+' · '+escapeHTML(s.p.w)+'</b><small>'+escapeHTML(s.p.sign)+'</small></button>';}).join('')+
   '<p class="acc-luke">“Beginning with Moses and all the Prophets, he interpreted for them the things concerning himself in all the Scriptures” (Luke 24:27).</p>'+
   '<div class="acc-tools"><button class="button secondary small" data-acc-go="'+BD_ACCOUNTS.index()+'">← Back to the page</button></div>'+(window.BD_LINKS?BD_LINKS.line('upstairs=signs'):'')+'</article>','accounts-review');
  BD_ACCOUNTS.immerse(BD_ACCOUNTS.current());
  BD_ACCOUNTS.wire();
  /* Code by Daniel using Claude November 21, 2026; link line November 22, 2026 */
 },
 // The printable strip ("Take the timeline home" upstairs): the sixteen steps in the four lines of the chant.
 strip(){
  const all=BD_ACCOUNTS.steps();
  openPanel('THE ACCOUNTS · TIMELINE','<div class="acc-strip-sheet"><h2>The whole Bible in sixteen steps</h2>'+BD_ACCOUNTS.chantHTML()+'<div class="acc-strip">'+all.map(function card(s,n){return '<article><span class="acc-mini">'+BD_ACCOUNTS.picture(s.p,true)+'</span><b>'+(n+1)+' · '+escapeHTML(s.p.w)+'</b>'+(s.p.date?'<small>'+escapeHTML(s.p.date)+'</small>':'')+'<p>'+escapeHTML(s.p.sign)+'</p><p class="acc-strip-books">'+s.p.books.map(function b(x){return escapeHTML(x[0]);}).join(' · ')+'</p></article>';}).join('')+'</div><p class="fine-print">Dates are approximate. The upstairs gallery tells each step in full.</p><button class="button" data-action="print">Print the strip</button></div>','timeline');
  /* Code by Daniel using Claude November 21, 2026 */
 },
 wall(){return BD_ACCOUNTS.steps().map(function marker(s,n){return {t:s.t,i:s.i,n,x:s.p.at,word:s.p.w};});/* Code by Daniel using Claude November 21, 2026 */},
 wire(){
  for(const b of document.querySelectorAll('#panel-body [data-acc-go]'))b.addEventListener('click',function go(){const s=BD_ACCOUNTS.steps()[Number(this.dataset.accGo)];if(s)BD_ACCOUNTS.open(s.t,s.i);});
  document.querySelector('#panel-body [data-acc-review]')?.addEventListener('click',BD_ACCOUNTS.review);
  document.querySelector('#panel-body [data-acc-enlarge]')?.addEventListener('click',BD_ACCOUNTS.signView);
  document.querySelector('#panel-body [data-acc-view]')?.addEventListener('click',function viewPainting(){BD_ACCOUNTS.viewing(true);});
  document.querySelector('#panel-body [data-acc-text]')?.addEventListener('click',function backToText(){BD_ACCOUNTS.viewing(false);});
  document.querySelector('#panel-body [data-acc-simple]')?.addEventListener('change',function level(){game.save.settings.accountsLevel=this.checked?'kids':'teen';persist();BD_ACCOUNTS.open(BD_ACCOUNTS.testament,BD_ACCOUNTS.page);document.querySelector('#panel-body [data-acc-simple]')?.focus();});
  /* Code by Daniel using Claude November 21, 2026 */
 },
 install(){
  const oldClean=sanitizeSave;sanitizeSave=function keepAccountsLevel(raw){const clean=oldClean(raw),v=raw?.settings?.accountsLevel;if(v==='kids'||v==='teen')clean.settings.accountsLevel=v;const at=raw?.museum?.storyAt;if(clean.museum&&Array.isArray(at)&&at.length===2&&at.every(Number.isFinite))clean.museum.storyAt=[Math.max(30,Math.min(6114,at[0])),Math.max(640,Math.min(996,at[1]))];return clean;};
  const style=document.createElement('style');style.textContent=BD_ACCOUNTS.css;document.head.appendChild(style);
  const panel=BD_JOURNEY.panel;BD_JOURNEY.panel=function cardInTheStory(kind){panel(kind);if(kind==='discovery'){const place=document.querySelector('#panel-body [data-display]'),html=place?BD_ACCOUNTS.afterDig(place.dataset.display):'';if(html)place.closest('.actions').insertAdjacentHTML('afterend',html);return;/* Claude, 24 Nov 2026: after a dig, the upstairs readings sit quietly under the two main buttons */}if(kind!=='card')return;const n=BD_ACCOUNTS.stepOf(game.currentEvidence);if(n<0)return;const p=BD_ACCOUNTS.steps()[n].p,html='<p class="acc-story-link no-read"><span>In the Bible’s story</span> <a href="#upstairs='+p.w.toLowerCase().replace(/[^a-z]+/g,'-')+'">Step '+(n+1)+' · '+escapeHTML(p.w)+' →</a></p>',actions=document.querySelector('#panel-body .actions.no-read');if(actions)actions.insertAdjacentHTML('afterend',html);else document.querySelector('#panel-body')?.insertAdjacentHTML('beforeend',html);queueMicrotask(function shortCardToo(){const line=document.querySelector('#panel-body .card-first-look .card-summary-scripture');if(line&&!line.parentElement.querySelector('.acc-story-link'))line.insertAdjacentHTML('afterend',html);});/* Code by Daniel using Claude November 24, 2026; the short first look shows it too (23 Nov), and the after-dig readings */};
  /* Code by Daniel using Claude November 21, 2026; card link November 23, 2026 */
 },
 css:'.acc-finds{margin:14px 0;padding:10px 14px;border:1px solid #e9cf9a38;border-radius:10px;background:#ffffff0d}.acc-finds>b{display:block;font-size:.8em;letter-spacing:.06em;text-transform:uppercase;opacity:.85}.acc-finds ul{list-style:none;margin:6px 0 0;padding:0}.acc-finds li{display:flex;flex-wrap:wrap;align-items:center;gap:4px 10px;padding:4px 0}.acc-finds small{opacity:.75}.acc-finds .button{margin-left:auto}.acc-find-mark{width:1.1em;text-align:center}.acc-finds .found .acc-find-mark{color:#9fd39a}.acc-find{background:none;border:0;padding:0;color:inherit;font:inherit;font-weight:600;text-decoration:underline;text-underline-offset:3px;cursor:pointer}.acc-story-link{margin:10px 0!important;font-size:.92em}.acc-story-link span{font-weight:600;margin-right:6px}'+
  '.find-story{margin-top:20px;padding-top:12px;border-top:1px solid var(--line,#d8d2bf)}.find-story-label{margin:0 0 8px;font-size:9px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:#8b7b56}.find-story-links{display:flex;flex-wrap:wrap;gap:8px}.find-story-link{display:flex;flex-direction:column;gap:1px;min-width:0;max-width:100%;padding:7px 12px;border:1px solid #d8d1bb;color:var(--green,#264a40);font-size:11px;line-height:1.4;text-decoration:none}.find-story-link small{color:#8a826c;font-size:10px}.find-story-link:hover,.find-story-link:focus-visible{border-color:var(--green,#264a40);background:#ffffff40}@media print{.find-story{display:none}}'+
  '.acc-reader{font-size:calc(1.06rem * var(--reading-scale,1));line-height:1.6;max-width:44rem;margin:0 auto}'+
  '.acc-reader p{margin:.7em 0}.acc-top{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:clamp(12px,.78em,15px);letter-spacing:.06em;text-transform:uppercase;opacity:.8}.acc-top span{text-align:center}.acc-top button{flex:0 0 44px}'+
  '.acc-step{min-width:44px;min-height:40px;border-radius:8px;border:1px solid currentColor;background:transparent;color:inherit;font-size:1.3em;line-height:1;cursor:pointer}.acc-step:disabled{opacity:.3;cursor:default}'+
  '.acc-head{display:flex;align-items:center;gap:16px;margin:12px 0 4px}.acc-head>div{min-width:0}.acc-sign{flex:0 0 auto;width:96px;height:96px;margin:0;padding:0;border:1px solid #94723c40;border-radius:14px;background:#efe4c8;display:grid;place-items:center;overflow:hidden;cursor:zoom-in}.acc-sign img{width:100%;height:100%;object-fit:contain}.acc-sign:hover{box-shadow:0 2px 10px #78552230}.acc-sign:focus-visible{outline:3px solid #e0b960;outline-offset:3px}.acc-icon{font-size:52px;line-height:1}'+
  '.acc-prose{display:flow-root}.acc-scene{float:right;width:230px;max-width:40%;margin:10px 0 8px 20px}.acc-scene img{display:block;width:100%;height:auto;aspect-ratio:3/2;object-fit:contain;border-radius:9px}.acc-scene figcaption{font-size:.74em;line-height:1.35;text-align:center;margin-top:4px;opacity:.85}.acc-sign-view{text-align:center}.acc-large-sign{width:min(100%,380px);aspect-ratio:1;margin:8px auto 12px;border-radius:16px;overflow:hidden;background:#efe4c8}.acc-large-sign img{display:block;width:100%;height:100%;object-fit:contain}.acc-large-sign .acc-icon{font-size:120px;line-height:380px}'+
  '.acc-word{margin:0!important;font-size:1.7em;font-weight:700;letter-spacing:.02em;line-height:1.1}.acc-title{margin:2px 0 0;font-size:1.05em;font-weight:600;opacity:.85}'+
  '.acc-thread{margin:14px 0;padding:10px 14px;border-left:4px solid #e0b960;background:#e0b9601c;border-radius:0 10px 10px 0}.acc-thread>b{display:block;font-size:.8em;letter-spacing:.06em;text-transform:uppercase;opacity:.85}.acc-thread p{margin:.4em 0 0}'+
  '.acc-chain{list-style:none;margin:.35em 0 .2em;padding:0;font-size:.84em;line-height:1.5}.acc-chain li{display:inline;opacity:.7}.acc-chain li:not(:last-child)::after{content:" → ";opacity:.8}.acc-chain li.now{opacity:1;font-weight:700;color:#ffe6a8}'+
  '.acc-you b,.acc-signit b{display:block;font-size:.8em;letter-spacing:.06em;text-transform:uppercase;opacity:.8}.acc-signit{padding:8px 12px;border-radius:10px;background:#ffffff12}.acc-read{font-style:italic;opacity:.85}'+
  '.acc-shelf{margin:14px 0 6px}.acc-spines{display:flex;align-items:flex-end;gap:1px;height:30px}.acc-spines i{flex:1 1 0;min-width:2px;height:22px;border-radius:2px 2px 0 0;opacity:.22;background:#c9a45c}.acc-spines i.lit{opacity:.75}.acc-spines i.now{opacity:1;height:30px;box-shadow:0 0 6px #ffe6a8aa}.acc-spines i.nt{margin-left:5px}'+
  '.acc-shelf figcaption{margin-top:6px;font-size:.84em;line-height:1.5}.acc-shelf figcaption b{display:block;font-size:.95em;letter-spacing:.06em;text-transform:uppercase;opacity:.8}.acc-shelf small{display:block;opacity:.7}.acc-kind{display:inline-block;padding:0 6px;border-radius:9px;font-size:.85em;color:#1a140d;background:#c9a45c}'+
  '.k-law{background:#d0a755!important}.k-history{background:#7fa6bf!important}.k-wisdom{background:#b394d1!important}.k-prophets{background:#d98763!important}.k-gospels{background:#efdca8!important}.k-letters{background:#8fc08a!important}.k-prophecy{background:#e39bbd!important}'+
  '.acc-nav{display:flex;justify-content:space-between;gap:10px;margin-top:14px}.acc-tools{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-top:12px;padding-top:12px;border-top:1px solid #ffffff2b}.acc-simple{display:flex;align-items:center;gap:6px;margin-right:auto;cursor:pointer}'+
  '.acc-kids{font-size:calc(1.14rem * var(--reading-scale,1))}'+
  '.acc-footnotes{margin-top:22px;padding-top:12px;border-top:1px solid #ffffff2b;font-size:calc(.8125rem * var(--reading-scale,1));line-height:1.5;user-select:text}.acc-footnotes .acc-note-title{font:inherit;font-weight:600;margin:0 0 6px}.acc-footnotes ol{margin:0;padding-left:1.3em}.acc-footnotes li+li{margin-top:.6em}'+
  '.acc-study{margin-top:18px;padding-top:10px;border-top:1px solid #ffffff2b;font-size:calc(.8125rem * var(--reading-scale,1));line-height:1.55;user-select:text}.acc-study summary{cursor:pointer;font-weight:600;padding:6px 0}.acc-study h4{font:inherit;font-weight:600;margin:14px 0 6px;color:inherit}.acc-study .acc-ask{margin:0;padding-left:1.3em}.acc-study .acc-ask li+li{margin-top:.5em}.acc-study .book-source-entry{padding:10px 0;border-bottom:1px solid #ffffff22}.acc-study .book-source-entry h4{font:inherit;font-weight:600;color:inherit;margin:0 0 4px}.acc-study .book-source-entry p{margin:5px 0}.acc-study .book-source-trail{color:inherit;opacity:.78}.acc-study .source-link{color:inherit}'+/* Claude, 23 Nov 2026: Going deeper */
  '.acc-chant{font-family:Georgia,serif;font-size:1.08em;line-height:1.55;text-align:center;margin:.6em 0 1em!important}.acc-luke{font-style:italic;opacity:.9;margin-top:16px!important}'+
  '.acc-review h2{margin:4px 0 2px}.acc-review h3{margin:16px 0 6px;font-size:.85em;letter-spacing:.06em;text-transform:uppercase;opacity:.85}.acc-row{display:grid;grid-template-columns:52px 1fr;gap:2px 12px;align-items:center;width:100%;text-align:left;padding:6px 8px;margin:4px 0;border:1px solid #ffffff24;border-radius:10px;background:transparent;color:inherit;font:inherit;cursor:pointer}.acc-row:hover{background:#ffffff0d}.acc-mini{display:grid;place-items:center;width:52px;height:52px;border-radius:10px;background:#efe4c8;overflow:hidden}.acc-row .acc-mini{grid-row:span 2}.acc-mini img{width:100%;height:100%;object-fit:contain}.acc-mini .acc-icon{font-size:28px}.acc-row small{opacity:.8}'+
  // The immersive reader: the painting fills the screen; the text column is darkened and scrolls over it.
  '#panel.acc-immersive{width:100vw;height:100vh;height:100svh;max-width:none;max-height:none;margin:0;inset:0;border:0;border-radius:0;padding:0;background:transparent!important;box-shadow:none;color:#f4ead6;overflow-y:auto;overscroll-behavior:contain}'+
  '#panel.acc-immersive .dialog-top{position:sticky;top:0;z-index:3;background:linear-gradient(#0d0a07ee,#0d0a0700);border:0;color:#f1dfb0}#panel.acc-immersive .dialog-top .eyebrow{color:#f1dfb0}#panel.acc-immersive #close-panel{color:#fbf0d6;background:#0d0a07a8;border-radius:50%}'+
  '#panel.acc-immersive #panel-body{height:auto;padding:4px 16px 56px}#panel.acc-immersive .acc-reader:not(.acc-review):not(.acc-sign-view){margin-top:var(--acc-desktop-intro,min(24vh,250px))}#panel.acc-immersive .acc-reader{position:relative;padding:22px 28px 26px;background:#16110cd6;border:1px solid #e9cf9a38;border-radius:16px;box-shadow:0 14px 60px #000a;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px)}'+
  '#panel.acc-immersive .fine-print,#panel.acc-immersive .lede{color:#e2d4b6}#panel.acc-immersive a{color:#f0cf8a}#panel.acc-immersive h2,#panel.acc-immersive h3{color:#fbf0d6}'+
  '.high-contrast #panel.acc-immersive .acc-reader{background:#0d0a07;border-color:#f4ead6}'+
  '#panel.acc-immersive .acc-reader{transition:opacity .35s}#panel.acc-viewing .acc-reader{opacity:0;pointer-events:none}#panel.acc-viewing .dialog-top{background:transparent}.acc-to-text{position:fixed;left:50%;bottom:calc(22px + env(safe-area-inset-bottom));transform:translateX(-50%);z-index:4;width:auto!important;padding:10px 22px;box-shadow:0 6px 24px #000a}.acc-to-text[hidden]{display:none}'+
  '.acc-strip-sheet .acc-chant{font-size:1em}.acc-strip{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin:12px 0}.acc-strip article{padding:8px 10px;border:1px solid #b5a170;border-top:4px solid #ad9459;border-radius:6px;background:#f6efdc;color:#2b2416;break-inside:avoid}.acc-strip .acc-mini{width:44px;height:44px;float:right;margin:0 0 4px 6px}.acc-strip b{display:block}.acc-strip small{display:block;opacity:.75}.acc-strip p{margin:.35em 0 0;font-size:12px;line-height:1.35}.acc-strip .acc-strip-books{font-style:italic;opacity:.8}'+
  '@media(max-width:760px){.acc-strip{grid-template-columns:repeat(2,minmax(0,1fr))}}'+
  '@media print{.acc-strip{grid-template-columns:repeat(4,1fr)!important}.acc-strip-sheet .button{display:none}}'+
  '@media(max-width:640px){.acc-prose{display:flex;flex-direction:column}.acc-prose>p{order:2}.acc-prose>p:first-of-type{order:0}.acc-scene{order:1;float:none;width:min(100%,300px);max-width:none;margin:12px auto}.acc-scene img{max-height:170px}.acc-head{gap:12px}#panel.acc-immersive #panel-body{padding:2px 8px 48px}#panel.acc-immersive .acc-reader{padding:16px 16px 20px;border-radius:12px}#panel.acc-immersive .acc-reader:not(.acc-review):not(.acc-sign-view){margin-top:min(30svh,260px)}}'+
  '@media(max-width:520px){.acc-sign{width:72px;height:72px}.acc-icon{font-size:40px}.acc-word{font-size:1.45em}.acc-large-sign{width:min(100%,300px)}.acc-large-sign .acc-icon{line-height:300px}}'+
  '@media(max-height:480px){.acc-large-sign{width:min(100%,240px)}.acc-large-sign .acc-icon{line-height:240px}}'
};
