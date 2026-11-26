'use strict';
// Links straight into one place in the game, for a teacher's lesson plan, slide or message. Claude for Daniel, 22 November 2026.
//   #upstairs=exodus   an upstairs step, by its word or its number (1–16); also #upstairs=signs and #upstairs=timeline
//   #dig=tel-dan       lands at a dig site, by its name, its number (1–12) or its exhibit code (TD01)
//   #exhibit=tel-dan   the evidence card, as before (journey.js)
// Add &painting to open an upstairs step on its whole painting, or &simple for the "Say it simply" wording.
// The address is cleared once followed, so the same link works again and a reload carries on normally.
window.BD_LINKS={
 slug(text){
  return String(text??'').toLowerCase().normalize('NFKD').replace(/[̀-ͯʾʿ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
  /* Code by Daniel using Claude November 22, 2026 */
 },
 base(){
  return /^https?:$/.test(location.protocol)?location.origin+location.pathname:'https://spiritualwarfarecards.com/Biblical-Discovery/dist/';
  /* Code by Daniel using Claude November 22, 2026 */
 },
 url(hash){return BD_LINKS.base()+'#'+hash;/* Code by Daniel using Claude November 22, 2026 */},
 stepHash(n){return 'upstairs='+BD_LINKS.slug(BD_ACCOUNTS.steps()[n].p.w);/* Code by Daniel using Claude November 22, 2026 */},
 // A step by number or by its word; "kings" and "prophet" find King and Prophets too.
 step(value){
  const all=BD_ACCOUNTS.steps(),v=BD_LINKS.slug(value);
  if(/^\d+$/.test(v)){const n=Number(v);return n>=1&&n<=all.length?n-1:-1;}
  const bare=v.replace(/s$/,'');
  return all.findIndex(function named(s){return BD_LINKS.slug(s.p.w).replace(/s$/,'')===bare;});
  /* Code by Daniel using Claude November 22, 2026 */
 },
 site(value){
  const v=BD_LINKS.slug(value);if(!v)return null;
  if(/^\d+$/.test(v))return BD_SITES[Number(v)-1]||null;
  const code=BD_JOURNEY.codes.indexOf(String(value).trim().toUpperCase());if(code>=0)return BD_SITES[code];
  return BD_SITES.find(function named(s){return s.id===v||BD_LINKS.slug(s.place)===v;})||null;
  /* Code by Daniel using Claude November 22, 2026 */
 },
 // Follow the address's link, if it has one. Returns true when it opened something.
 go(){
  if(!game.ready||location.hash.length<2)return false;
  const h=new URLSearchParams(location.hash.slice(1));let done=false,asked=false;
  if(h.has('upstairs')){asked=true;done=BD_LINKS.upstairs(h.get('upstairs'),h);}
  else if(h.has('hope')){
   asked=true;
   BD_LINKS.leave();setScene('cabin');openHopeReading(h.get('hope'));done=true;/* Claude, 23 Nov 2026: #hope=adult or #hope=simple; any other value follows the reader's "Say it simply" choice */
  }
  else if(h.has('dig')||h.has('site')){asked=true;done=BD_LINKS.dig(h.get('dig')??h.get('site'));}
  else if(h.has('exhibit')||h.has('code')){asked=true;const site=BD_SITES.find(function s(x){return x.id===h.get('exhibit');})||BD_LINKS.site(h.get('code'));if(site){BD_LINKS.leave();showCard(site);done=true;}}
  if(done)BD_LINKS.clear();else if(asked)toast('That link doesn’t match a page in the game.');
  return done;
  /* Code by Daniel using Claude November 22, 2026 */
 },
 // Finish anything in motion (a walk between rooms, a flight) and fill the window, as "Begin" does.
 leave(){
  if(game.hallTransition)BD_MUSEUM.finish();
  if(game.flight){BD_TRENCH.arrival='skip';BD_FLIGHT.finish();}
  if(game.save.settings.focusView!==false)document.body.classList.add('full-window');
  positionHotspots();
  /* Code by Daniel using Claude November 22, 2026 */
 },
 upstairs(value,h){
  const all=BD_ACCOUNTS.steps(),v=BD_LINKS.slug(value),special=v===''||v==='signs'||v==='timeline',n=special?0:BD_LINKS.step(v);
  if(n<0)return false;
  BD_LINKS.leave();
  if(h.has('simple'))game.save.settings.accountsLevel='kids';
  BD_MUSEUM.enter('story',{arrival:[all[n].p.at,790]});
  if(v==='signs'){BD_ACCOUNTS.testament='ot';BD_ACCOUNTS.page=0;BD_ACCOUNTS.review();}
  else if(v==='timeline')BD_ACCOUNTS.strip();
  else if(v){BD_ACCOUNTS.open(all[n].t,all[n].i);if(h.has('painting'))BD_ACCOUNTS.viewing(true);}
  return true;
  /* Code by Daniel using Claude November 22, 2026 */
 },
 // A dig link lands at the site as "Arrive now" does, without the optional practice-square question.
 dig(value){
  const site=BD_LINKS.site(value);if(!site)return false;
  BD_LINKS.leave();BD_TRENCH.arrival='skip';flyTo(site);BD_FLIGHT.finish();
  return true;
  /* Code by Daniel using Claude November 22, 2026 */
 },
 clear(){
  try{history.replaceState(history.state,'',location.href.split('#')[0]);}catch(error){/* a saved file may refuse; the link still worked */}
  /* Code by Daniel using Claude November 22, 2026 */
 },
 async copy(button){
  const url=button.dataset.copyLink;
  try{if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(url);toast('Link copied.');}
  catch(error){const code=button.parentElement.querySelector('code');if(code){const range=document.createRange();range.selectNodeContents(code);const sel=getSelection();sel.removeAllRanges();sel.addRange(range);}toast('The link is selected. Press Ctrl+C (⌘C on a Mac) to copy it.');}
  /* Code by Daniel using Claude November 22, 2026 */
 },
 // The small line at the foot of an upstairs page.
 line(hash){
  const url=BD_LINKS.url(hash);
  return '<p class="link-line no-read"><span>Link to this page</span> <code>'+escapeHTML(url)+'</code> <button class="button secondary small" data-copy-link="'+escapeHTML(url)+'">Copy link</button></p>';
  /* Code by Daniel using Claude November 22, 2026 */
 },
 row(label,hash){
  const url=BD_LINKS.url(hash);
  return '<div class="link-row"><a href="#'+hash+'">'+escapeHTML(label)+'</a><code>'+escapeHTML(url)+'</code><button class="button secondary small" data-copy-link="'+escapeHTML(url)+'" aria-label="Copy the link to '+escapeHTML(label)+'">Copy</button></div>';
  /* Code by Daniel using Claude November 22, 2026 */
 },
 // Notebook → Links for teaching: every upstairs step and every dig site, each with its link.
 panel(){
  const steps=BD_ACCOUNTS.steps().map(function step(s,n){return BD_LINKS.row((n+1)+' · '+s.p.w,BD_LINKS.stepHash(n));}).join('');
  const digs=BD_SITES.map(function dig(s,i){return BD_LINKS.row(BD_JOURNEY.codes[i]+' · '+s.place,'dig='+s.id);}).join('');
  openPanel('LINKS FOR TEACHING','<h2>Open any page from a link</h2><p class="lede">Put a link in a lesson plan, on a slide or in a message. It opens the game right at that page.</p>'+
   '<h3>Upstairs · the sixteen steps</h3><div class="link-list">'+steps+BD_LINKS.row('Sign the whole story','upstairs=signs')+BD_LINKS.row('The timeline to print','upstairs=timeline')+'</div>'+
   '<p class="fine-print">Add <code>&amp;painting</code> to the end of an upstairs link to open on the whole painting, so a group can look first. Add <code>&amp;simple</code> for the “Say it simply” wording.</p>'+
   '<h3>The Christian hope</h3><div class="link-list">'+BD_LINKS.row('The case, for adults','hope=adult')+BD_LINKS.row('Said simply, for younger readers','hope=simple')+'</div>'+
   '<h3>Dig sites</h3><div class="link-list">'+digs+'</div><p class="fine-print">A dig link lands at the site, ready to investigate. Each evidence card has its own link and QR code too.</p>','links');
  /* Code by Daniel using Claude November 22, 2026 */
 },
 install(){
  const style=document.createElement('style');style.textContent=BD_LINKS.css;document.head.appendChild(style);
  const boot=BD_JOURNEY.boot;BD_JOURNEY.boot=function bootFromLink(){if(boot()){BD_LINKS.clear();return true;}return BD_LINKS.go();/* Code by Daniel using Claude November 22, 2026 */};
  const menu=BD_JOURNEY.menu;BD_JOURNEY.menu=function notebookWithLinks(){menu.apply(this,arguments);document.querySelector('#panel-body .settings-grid')?.insertAdjacentHTML('beforeend','<button class="site-row" data-links-panel>Links for teaching →</button>');/* Code by Daniel using Claude November 22, 2026 */};
  addEventListener('hashchange',function followLink(){BD_LINKS.go();/* Code by Daniel using Claude November 22, 2026 */});
  document.addEventListener('click',function linkButtons(event){const copy=event.target.closest('[data-copy-link]');if(copy){BD_LINKS.copy(copy);return;}if(event.target.closest('[data-links-panel]'))BD_LINKS.panel();/* Code by Daniel using Claude November 22, 2026 */});
  /* Code by Daniel using Claude November 22, 2026 */
 },
 css:'.link-list{display:grid;gap:6px;margin:8px 0 10px}.link-row{display:grid;grid-template-columns:minmax(9rem,13rem) minmax(0,1fr) auto;align-items:center;gap:6px 12px;padding:6px 0;border-bottom:1px solid #8a6a3a2e}'+
  '.link-row a{font-weight:600}.link-row code,.link-line code{font-size:.82em;overflow-wrap:anywhere;user-select:all;opacity:.85}'+
  '.link-line{display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px;margin-top:14px!important;font-size:.82em}.link-line span{font-weight:600}.link-line .button{margin-left:auto}'+
  '@media(max-width:640px){.link-row{grid-template-columns:minmax(0,1fr) auto}.link-row code{grid-column:1/-1;grid-row:2}}@media print{.link-line{display:none}}'
};
