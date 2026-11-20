'use strict';
// Upstairs gallery reader for "The Accounts". Claude for Daniel, 19 November 2026.
// The 24 panels open here. Teen text first; "Say it simply" (saved) switches to the kids' text.
// Painted mnemonic gestures; these are memory aids, not a formal sign-language course.
window.BD_ACCOUNTS={art:['road','stars','robe','bricks','exodus','law','home','kings','split','fall','exile','return','wait','world','baby','dove','follow','hosanna','cross','risen','pentecost','changed','rome','courage','written','go'],testament:'ot',page:0,
 scenes:{
  stars:{alt:'A traveler looks up at the stars above a quiet desert camp.',caption:'Count the stars.'},
  exodus:{alt:'Families walk a sandy path between the parted sea walls toward dawn.',caption:'A way through the sea.'},
  law:{alt:'Light and cloud cover Sinai above a distant camp.',caption:'Fire on the mountain.'},
  baby:{alt:'A humble manger and lamplight in Bethlehem.',caption:'Room for a King.'},
  cross:{alt:'Three empty crosses on a rocky hill outside Jerusalem at sunset.',caption:'Paid in full.'},
  risen:{alt:'Dawn lights an empty rock-cut tomb; linen rests inside.',caption:'The tomb is empty.'},
  pentecost:{alt:'Wind moves a curtain above a gathering in ancient Jerusalem.',caption:'Good news for every nation.'},
  written:{alt:'Papyrus, a reed pen and an oil lamp on an ancient writing table.',caption:'Within living memory.'}
 },
 steps(){return ['ot','nt'].flatMap(function both(t){return BD_ACCOUNTS_DATA[t].pages.map(function step(p,i){return {t,i,p};});});},
 simple(){const s=game.save.settings;return s.accountsLevel?s.accountsLevel==='kids':!!s.explorer;},
 picture(p,lazy=false){
  const word=p.w.toLowerCase();return BD_ACCOUNTS.art.includes(word)?'<img src="'+BD_ART.assetURL('assets/sign-'+word+'.webp')+'" width="512" height="512" decoding="async"'+(lazy?' loading="lazy"':'')+' alt="">':'<span class="acc-icon">'+p.icon+'</span>';
  /* Code by Daniel using ChatGPT November 19, 2026 */
 },
 vignette(p){
  const word=p.w.toLowerCase(),scene=BD_ACCOUNTS.scenes[word];if(!scene)return '';
  return '<figure class="acc-scene"><img src="'+BD_ART.assetURL('assets/account-'+word+'.webp')+'" width="768" height="512" decoding="async" alt="'+escapeHTML(scene.alt)+'"><figcaption>'+escapeHTML(scene.caption)+'</figcaption></figure>';
  /* Code by Daniel using ChatGPT November 19, 2026 */
 },
 signView(){
  const p=BD_ACCOUNTS_DATA[BD_ACCOUNTS.testament].pages[BD_ACCOUNTS.page];
  openPanel('UPSTAIRS · '+p.w.toUpperCase(),'<article class="acc-reader acc-sign-view"><h2>'+escapeHTML(p.w)+'</h2><figure class="acc-large-sign">'+BD_ACCOUNTS.picture(p)+'</figure><p>'+escapeHTML(p.sign)+'</p><button class="button secondary" data-acc-return>← Back to the page</button></article>','accounts-sign');
  document.querySelector('[data-acc-return]').addEventListener('click',function returnToAccount(){BD_PAD.back();/* Code by Daniel using ChatGPT November 19, 2026 */});
  /* Code by Daniel using ChatGPT November 19, 2026 */
 },
 footnotes(p){
  if(!Array.isArray(p.notes)||!p.notes.length)return '';
  return '<aside class="acc-footnotes" aria-label="Historical and Scripture notes"><p class="acc-note-title">Notes</p><ol>'+p.notes.map(function note(text){return '<li>'+escapeHTML(text)+'</li>';/* Code by Daniel using ChatGPT November 19, 2026 */}).join('')+'</ol></aside>';
  /* Code by Daniel using ChatGPT November 19, 2026 */
 },
 open(testament,page){
  BD_ACCOUNTS.testament=testament;BD_ACCOUNTS.page=page;const book=BD_ACCOUNTS_DATA[testament],p=book.pages[page],kids=BD_ACCOUNTS.simple(),e=kids?p.kids:p.teen,ot=testament==='ot';
  const all=BD_ACCOUNTS.steps(),at=all.findIndex(function here(s){return s.t===testament&&s.i===page;});
  const thread=ot?'The thread to Jesus':'Look closer';
  openPanel('UPSTAIRS · THE ACCOUNTS','<article class="acc-reader'+(kids?' acc-kids':'')+'">'+
   '<div class="acc-top"><button class="acc-step" data-acc-go="'+(at-1)+'" aria-label="Previous step" '+(at===0?'disabled':'')+'>‹</button><span>'+(ot?'Old':'New')+' Testament · '+(page+1)+' of '+book.pages.length+(p.date?' · '+escapeHTML(p.date):'')+'</span><button class="acc-step" data-acc-go="'+(at+1)+'" aria-label="Next step" '+(at===all.length-1?'disabled':'')+'>›</button></div>'+
   '<div class="acc-head"><button class="acc-sign" data-acc-enlarge aria-label="Enlarge the '+escapeHTML(p.w)+' hand sign" title="Enlarge the hand sign">'+BD_ACCOUNTS.picture(p)+'</button><div><p class="acc-word">'+escapeHTML(p.w)+'</p><h2 class="acc-title">'+escapeHTML(e.t)+'</h2></div></div>'+
   '<div class="acc-prose">'+BD_ACCOUNTS.vignette(p)+e.p.map(function para(t){return '<p>'+escapeHTML(t)+'</p>';/* Code by Daniel using ChatGPT November 19, 2026 */}).join('')+'</div>'+
   '<aside class="acc-thread"><b>'+thread+'</b><p>'+escapeHTML(e.thread)+'</p></aside>'+
   '<p class="acc-you"><b>For you</b> '+escapeHTML(e.you)+'</p>'+
   '<p class="acc-signit"><b>✋ Sign it · '+escapeHTML(p.w)+'</b> '+escapeHTML(p.sign)+'</p>'+
   '<p class="acc-read">Read '+escapeHTML(p.read)+'</p>'+
   '<div class="acc-nav"><button class="button secondary small" data-acc-go="'+(at-1)+'" '+(at===0?'disabled':'')+'>← Back</button><button class="button small" data-acc-go="'+(at+1)+'" '+(at===all.length-1?'disabled':'')+'>Next →</button></div>'+
   '<div class="acc-tools"><label class="acc-simple"><input type="checkbox" data-acc-simple '+(kids?'checked':'')+'> Say it simply</label><button class="button secondary small" data-acc-review>Sign the whole story</button><button class="button secondary small" data-acc-go="'+(ot?13:0)+'">'+(ot?'New Testament →':'← Old Testament')+'</button></div>'+
   '<p class="fine-print">'+escapeHTML(BD_SCRIPTURE_CREDIT)+'</p>'+BD_ACCOUNTS.footnotes(p)+'</article>','accounts');
  BD_ACCOUNTS.wire();
  /* Code by Daniel using ChatGPT November 20, 2026 */
 },
 review(){
  const kids=BD_ACCOUNTS.simple();
  openPanel('UPSTAIRS · SIGN THE WHOLE STORY','<article class="acc-reader acc-review"><p class="lede">'+(kids?'Say each word and make its sign. Can you do all twenty-six?':'Twenty-six words, twenty-six signs, two thousand years. Can you tell the whole story with your hands in under a minute?')+'</p>'+
   BD_ACCOUNTS.steps().map(function row(s,n){return (s.i===0?'<h3>'+(s.t==='ot'?'Old Testament':'New Testament')+'</h3>':'')+'<button class="acc-row" data-acc-go="'+n+'"><span class="acc-mini">'+BD_ACCOUNTS.picture(s.p,true)+'</span><b>'+(s.i+1)+' · '+escapeHTML(s.p.w)+'</b><small>'+escapeHTML(s.p.sign)+'</small></button>';/* Code by Daniel using ChatGPT November 19, 2026 */}).join('')+
   '<div class="acc-tools"><button class="button secondary small" data-acc-go="'+BD_ACCOUNTS.steps().findIndex(function current(s){return s.t===BD_ACCOUNTS.testament&&s.i===BD_ACCOUNTS.page;})+'">← Back to the page</button></div></article>','accounts-review');
  BD_ACCOUNTS.wire();
  /* Code by Daniel using ChatGPT November 19, 2026 */
 },
 wire(){
  for(const b of document.querySelectorAll('#panel-body [data-acc-go]'))b.addEventListener('click',function go(){const s=BD_ACCOUNTS.steps()[Number(this.dataset.accGo)];if(s)BD_ACCOUNTS.open(s.t,s.i);});
  document.querySelector('#panel-body [data-acc-review]')?.addEventListener('click',BD_ACCOUNTS.review);
  document.querySelector('#panel-body [data-acc-enlarge]')?.addEventListener('click',BD_ACCOUNTS.signView);
  document.querySelector('#panel-body [data-acc-simple]')?.addEventListener('change',function level(){game.save.settings.accountsLevel=this.checked?'kids':'teen';persist();BD_ACCOUNTS.open(BD_ACCOUNTS.testament,BD_ACCOUNTS.page);document.querySelector('#panel-body [data-acc-simple]')?.focus();});
  /* Code by Daniel using ChatGPT November 19, 2026 */
 },
 install(){
  const oldClean=sanitizeSave;sanitizeSave=function keepAccountsLevel(raw){const clean=oldClean(raw),v=raw?.settings?.accountsLevel;if(v==='kids'||v==='teen')clean.settings.accountsLevel=v;return clean;};
  const style=document.createElement('style');style.textContent=BD_ACCOUNTS.css;document.head.appendChild(style);
 },
 css:'.acc-reader{font-size:calc(1.06rem * var(--reading-scale,1));line-height:1.6;max-width:44rem;margin:0 auto}'+
  '.acc-reader p{margin:.7em 0}.acc-top{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:clamp(12px,.78em,15px);letter-spacing:.06em;text-transform:uppercase;opacity:.75}.acc-top span{text-align:center}.acc-top button{flex:0 0 44px}'+
  '.acc-step{min-width:44px;min-height:40px;border-radius:8px;border:1px solid currentColor;background:transparent;color:inherit;font-size:1.3em;line-height:1;cursor:pointer}.acc-step:disabled{opacity:.3;cursor:default}'+
  '.acc-head{display:flex;align-items:center;gap:16px;margin:12px 0 4px}.acc-head>div{min-width:0}.acc-sign{flex:0 0 auto;width:96px;height:96px;margin:0;padding:0;border:1px solid #94723c40;border-radius:14px;background:#efe4c8;display:grid;place-items:center;overflow:hidden;cursor:zoom-in}.acc-sign img{width:100%;height:100%;object-fit:contain}.acc-sign:hover{box-shadow:0 2px 10px #78552230}.acc-sign:focus-visible{outline:3px solid #8b6026;outline-offset:3px}.acc-icon{font-size:52px;line-height:1}'+
  '.acc-prose{display:flow-root}.acc-scene{float:right;width:230px;max-width:40%;margin:10px 0 8px 20px}.acc-scene img{display:block;width:100%;height:auto;aspect-ratio:3/2;object-fit:contain;border-radius:9px}.acc-scene figcaption{font-size:.74em;line-height:1.35;text-align:center;color:#71562f;margin-top:4px}.acc-sign-view{text-align:center}.acc-large-sign{width:min(100%,380px);aspect-ratio:1;margin:8px auto 12px;border-radius:16px;overflow:hidden;background:#efe4c8}.acc-large-sign img{display:block;width:100%;height:100%;object-fit:contain}.acc-large-sign .acc-icon{font-size:120px}'+
  '.acc-word{margin:0!important;font-size:1.7em;font-weight:700;letter-spacing:.02em;line-height:1.1}.acc-title{margin:2px 0 0;font-size:1.05em;font-weight:600;opacity:.8}'+
  '.acc-thread{margin:14px 0;padding:10px 14px;border-left:4px solid #b88a2e;background:#b88a2e1a;border-radius:0 10px 10px 0}.acc-thread p{margin:.3em 0 0}'+
  '.acc-you b,.acc-signit b{display:block;font-size:.8em;letter-spacing:.06em;text-transform:uppercase;opacity:.75}.acc-signit{padding:8px 12px;border-radius:10px;background:#00000008}.acc-read{font-style:italic;opacity:.8}'+
  '.acc-nav{display:flex;justify-content:space-between;gap:10px;margin-top:14px}.acc-tools{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-top:12px;padding-top:12px;border-top:1px solid #0000001f}.acc-simple{display:flex;align-items:center;gap:6px;margin-right:auto;cursor:pointer}'+
  '.acc-kids{font-size:calc(1.14rem * var(--reading-scale,1))}'+
  '.acc-footnotes{margin-top:22px;padding-top:12px;border-top:1px solid #0000001f;font-size:calc(.8125rem * var(--reading-scale,1));line-height:1.5;user-select:text}.acc-footnotes .acc-note-title{font:inherit;font-weight:600;margin:0 0 6px}.acc-footnotes ol{margin:0;padding-left:1.3em}.acc-footnotes li+li{margin-top:.6em}'+
  '.acc-review h3{margin:16px 0 6px}.acc-row{display:grid;grid-template-columns:52px 1fr;gap:2px 12px;align-items:center;width:100%;text-align:left;padding:6px 8px;margin:4px 0;border:1px solid #0000001a;border-radius:10px;background:transparent;color:inherit;font:inherit;cursor:pointer}.acc-row .acc-mini{grid-row:span 2;width:52px;height:52px;border-radius:10px;background:#efe4c8;display:grid;place-items:center;overflow:hidden}.acc-row .acc-mini img{width:100%;height:100%;object-fit:contain}.acc-row .acc-icon{font-size:28px}.acc-row small{opacity:.8}'+
  '@media(max-width:640px){.acc-prose{display:flex;flex-direction:column}.acc-prose>p{order:2}.acc-prose>p:first-of-type{order:0}.acc-scene{order:1;float:none;width:min(100%,300px);max-width:none;margin:12px auto}.acc-scene img{max-height:170px}.acc-head{gap:12px}}'+
  '@media(max-width:520px){.acc-sign{width:72px;height:72px}.acc-icon{font-size:40px}.acc-word{font-size:1.45em}.acc-large-sign{width:min(100%,300px)}}'+
  '@media(max-height:480px){.acc-large-sign{width:min(100%,240px)}}'
};
