'use strict';
// Three field workshops rebuilt from Fable's specs (Foundation-Claude/20-Workshop-Game-Specs-by-Fable.md):
// Thebes · The last sign (Mark), Bethesda · Room for a fifth colonnade (Fit + Uncover), Delphi · Set the Corinth clock
// (Slide + Fit). Claude for Daniel, 24 November 2026. The other nine boards still run in culture.js.
// The picture answers first ("echo"), Miriam speaks after; hints come from the lantern; no score, no shake, no buzzer.
// Painted layers load from assets/ws-*.webp when Codex has made them (Foundation-Claude/21); until then code draws stand-ins.
(function workshopGames(){
let suppressUntil=0,lastSound=0;
const brushSounds=new WeakMap();
const WG=window.BD_WG={games:{},live:null,
 suppress(){suppressUntil=Date.now()+350;/* Code by Daniel using Claude November 24, 2026 */},
 sound(kind){
  const ac=game.audio?.ac,settings=game.save.settings,volume=settings.volume||0;
  if(!settings.sound||!volume||ac?.state!=='running'||document.hidden||Date.now()-lastSound<90)return;
  lastSound=Date.now();
  const now=ac.currentTime,env=ac.createGain(),duration=kind==='scratch'?.13:.11;
  env.gain.setValueAtTime(.0001,now);
  env.gain.exponentialRampToValueAtTime(volume*(kind==='scratch'?.12:.15),now+.006);
  env.gain.exponentialRampToValueAtTime(.0001,now+duration);
  env.connect(ac.destination);
  let source;
  if(kind==='scratch'){
   if(!brushSounds.has(ac)){
    const buffer=ac.createBuffer(1,Math.ceil(ac.sampleRate*.15),ac.sampleRate),samples=buffer.getChannelData(0);
    let previous=0;
    for(let i=0;i<samples.length;i++){const next=Math.random()*2-1;samples[i]=(next-previous)*.12;previous=next;}
    brushSounds.set(ac,buffer);
   }
   source=ac.createBufferSource();source.buffer=brushSounds.get(ac);
  }else{
   source=ac.createOscillator();source.type='triangle';
   source.frequency.setValueAtTime(kind==='tock'?510:280,now);
   source.frequency.exponentialRampToValueAtTime(kind==='tock'?210:108,now+.075);
  }
  source.connect(env);source.start(now);source.stop(now+duration+.01);
  source.onended=()=>{source.disconnect();env.disconnect();};
 },
 pin(){return '<span class="wg-pin" aria-hidden="true">'+WG.paint('thebes-brass-pin')+'</span>';},
 loupeTool(surface){
  const icon=WG.paint('workshop-loupe','wg-tool-raster loupe')||
   '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="13" cy="13" r="8"/><path d="M19 19l9 9"/></svg>';
  return '<button type="button" class="wg-tool" data-wg="loupe" aria-pressed="false" aria-label="Loupe: magnify the '+surface+' (L)">'+icon+'<span>Loupe</span></button>';
 },
 // The focused control as a selector, so a redraw can put focus back where it was.
 focusKey(){const a=document.activeElement;if(!a||!a.closest?.('#culture-work'))return null;const d=a.dataset;if(d.wg==='nudge')return '[data-wg="nudge"][data-d="'+d.d+'"]';if(d.piece)return '[data-piece="'+d.piece+'"]';if(d.wg==='sign')return '.wg-sign[data-row="'+d.row+'"][data-g="'+d.g+'"]';if(d.wg)return '[data-wg="'+d.wg+'"]';return null;/* Code by Daniel using Claude November 24, 2026 */},
 // Codex: add each painting's name here once assets/ws-<name>.webp exists (Foundation-Claude/21). Until then code draws a stand-in.
 ready:new Set([
  'bethesda-brush','bethesda-dug','bethesda-figures','bethesda-roof-long','bethesda-roof-short',
  'bethesda-sand-cover','bethesda-sand-middle','bethesda-sand-north','bethesda-sand-south','bethesda-water',
  'delphi-bar','delphi-bracket','delphi-card','delphi-leaf','delphi-peg',
  'delphi-pin','delphi-rail','table','thebes-flap','thebes-line',
  'thebes-rub','thebes-sheet','thebes-stone',
  'thebes-brass-pin','thebes-charcoal','thebes-tracing','workshop-loupe',
 ]),
 paint(name,cls=''){if(!WG.ready.has(name))return '';return '<img class="wg-paint '+cls+'" src="'+BD_ART.assetURL('assets/ws-'+name+'.webp')+'" alt="" draggable="false" onerror="this.remove()">';/* Code by Daniel using Claude November 24, 2026 */},
 calm(){return !!(game.save?.settings?.reduced||matchMedia('(prefers-reduced-motion: reduce)').matches);/* Code by Daniel using Claude November 24, 2026 */},
 later(fn,ms){
  const active=WG.live;
  return setTimeout(()=>{if(active?.token&&WG.live?.token===active.token&&$('#culture-work'))fn();},WG.calm()?Math.min(ms,60):ms);/* Code by Daniel using Claude November 24, 2026 */},
 st(site){const c=BD_CULTURE.progress(site);if(!c.wg||typeof c.wg!=='object')c.wg=WG.games[site.id].fresh();return c.wg;/* Code by Daniel using Claude November 24, 2026 */},
 tag(kind,text){return '<span class="wg-tag wg-tag-'+kind+'">'+escapeHTML(text)+'</span>';/* Code by Daniel using Claude November 24, 2026 */},
 say(line){const p=$('#wg-say');if(p&&line)p.textContent=line;/* Code by Daniel using Claude November 24, 2026 */},
 status(text){const p=$('#wg-status');if(p)p.textContent=text;/* Code by Daniel using Claude November 24, 2026 */},
 echo(text){const p=$('#wg-echo');if(p){p.textContent='';requestAnimationFrame(function announce(){p.textContent=text;});}/* Code by Daniel using Claude November 24, 2026 */},
 // A wrong move counts toward the lantern's glow; any move tucks the why card away and restarts the idle clock.
 moved(){const l=WG.live;if(!l)return;l.idle=Date.now();$('.culture-page header')?.classList.add('wg-tucked');/* Code by Daniel using Claude November 24, 2026 */},
 wrong(){const l=WG.live;if(!l)return;l.wrongs=(l.wrongs||0)+1;WG.glow();/* Code by Daniel using Claude November 24, 2026 */},
 newStep(){const l=WG.live;if(!l)return;l.wrongs=0;l.rung=0;l.idle=Date.now();WG.glow();/* Code by Daniel using Claude November 24, 2026 */},
 glow(){const l=WG.live,b=$('#wg-lantern');if(!l||!b)return;b.classList.toggle('glow',(l.wrongs||0)>=2||Date.now()-(l.idle||Date.now())>30000);/* Code by Daniel using Claude November 24, 2026 */},
 lantern(){return '<button type="button" class="wg-tool wg-lantern" id="wg-lantern" data-wg="hint" aria-label="Lantern: a hint (H)"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M11 9h10l2 4v11l-2 3H11l-2-3V13z M13 9V6h6v3 M12 27v2h8v-2"/><path class="flame" d="M16 14c2 3 2 6 0 8-2-2-2-5 0-8z"/></svg><span>Lantern</span></button>';/* Code by Daniel using Claude November 24, 2026 */},
 // The three rungs of the hint ladder: light on the picture, one line from Miriam, then one step done with her.
 hint(){const l=WG.live;if(!l)return;l.rung=Math.min(3,(l.rung||0)+1);l.idle=Date.now();WG.glow();l.game.hint(l.site,l.rung);/* Code by Daniel using Claude November 24, 2026 */},
 light(elements){for(const el of elements){if(!el)continue;el.classList.remove('wg-light');void el.offsetWidth;el.classList.add('wg-light');}WG.later(function dim(){for(const el of elements)el?.classList.remove('wg-light');},2200);/* Code by Daniel using Claude November 24, 2026 */},
 // Draw the workshop into the culture page; the question and the caption card are shared by all three games.
 draw(site,focus){
  const g=WG.games[site.id],s=BD_CULTURE.progress(site),w=WG.st(site),work=$('#culture-work');if(!work)return;
  if(s.wgSecond?.active&&game.save.finds[site.id]){
   clearInterval(WG.live?.timer);WG.live?.abort?.abort();WG.second.draw(site,focus);return;
  }
  focus=focus||WG.focusKey();const keep=WG.live?.site===site&&WG.live.mode==='main'?WG.live:null;clearInterval(WG.live?.timer);WG.live?.abort?.abort();
  WG.live={idle:Date.now(),wrongs:0,rung:0,...(keep||{}),site,game:g,mode:'main',token:keep?.token||Symbol(),abort:new AbortController(),timer:setInterval(function idleGlow(){if(!$('#wg-board'))clearInterval(WG.live?.timer);else WG.glow();},1000)};
  const header=$('.culture-page header');if(header){header.classList.add('wg-why');header.setAttribute('title','Tap to read the why card again');}
  let body;
  if(s.explained)body=WG.caption(site);
  else if(w.asking)body=WG.question(site);
  else body='<div class="wg wg-'+site.id+(WG.ready.has('table')?' wg-painted-table':'')+'"'+(WG.ready.has('table')?' style="background:url('+BD_ART.assetURL('assets/ws-table.webp')+') center/cover"':'')+'><div class="wg-miriam"><img src="'+BD_ART.assetURL('assets/dig-v7-face-miriam.webp')+'" alt=""><p id="wg-say">'+escapeHTML(g.opening(w))+'</p></div>'+
   '<div class="wg-board" id="wg-board">'+g.board(site,w)+'</div><p class="wg-status" id="wg-status" role="status">'+escapeHTML(g.status(w))+'</p>'+
   '<div class="wg-tray">'+g.tools(w)+WG.lantern()+(g.solved(w)?'<button type="button" class="button" data-wg="tell">Tell a visitor →</button>':'')+WG.secondButton(site)+'</div><p class="sr-only" id="wg-echo" aria-live="polite"></p></div>';
  work.innerHTML=body;
  if(!s.explained&&!w.asking){g.mounted?.(site,w);WG.mountLoupe();}
  const target=focus&&work.querySelector(focus)||(s.explained?work.querySelector('[data-culture-action="collect"]'):w.asking?work.querySelector('[data-wg="answer"]'):null);if(target&&target.classList.contains('wg-sign')){for(const el of work.querySelectorAll('.wg-sign'))el.tabIndex=-1;target.tabIndex=0;}
  target?.focus({preventScroll:true});
  /* Code by Daniel using Claude November 24, 2026 */
 },
 question(site){
  const g=WG.games[site.id],q=g.words;
  return '<div class="wg wg-question-view"><div class="wg-miriam"><img src="'+BD_ART.assetURL('assets/dig-v7-face-miriam.webp')+'" alt=""><p id="wg-say">'+escapeHTML(q.Q)+'</p></div><div class="wg-board wg-dimmed" aria-hidden="true">'+g.board(site,WG.st(site),true)+'</div>'+
   '<div class="wg-options">'+(g.order||[0,1,2]).map(function option(i){return '<button type="button" class="wg-option" data-wg="answer" data-i="'+i+'">'+escapeHTML(q.options[i])+'</button>';}).join('')+'</div><p class="wg-coach" id="wg-coach" role="status"></p></div>';
  /* Code by Daniel using Claude November 24, 2026 */
 },
 answer(i,button){
  const l=WG.live,site=l?.site;if(!site)return;const g=l.game,q=g.words;
  if(i!==0){button.classList.add('wg-tried');button.setAttribute('aria-disabled','true');$('#wg-coach').textContent=q.coaching[i]||'';return;}
  const s=BD_CULTURE.progress(site),w=WG.st(site);w.asking=false;s.step=BD_CULTURE.total(BD_CULTURE_BOARDS[site.id]);s.interpret=true;s.explained=true;persist();chime?.();
  BD_CULTURE.draw(site);
  /* Code by Daniel using Claude November 24, 2026 */
 },
 // The caption card: the player's own finished board as the picture, the sentence they chose, then the way home.
 secondButton(site){
  if(!game.save.finds[site.id])return '';
  const completed=BD_CULTURE.progress(site).wgSecond?.complete;
  return '<button type="button" class="wg-tool" data-wg="second">'+(completed?'Read your Second look':'Second look')+'</button>';
 },
 caption(site){
  const g=WG.games[site.id],c=g.caption,found=!!game.save.finds[site.id],ids=new Set([...Object.keys(game.save.finds),site.id]);
  const ot=[...ids].filter(function old(id){return BD_SITES.find(function x(s){return s.id===id;})?.hall==='ot';}).length,q={count:ids.size,ot,nt:ids.size-ot};
  const toGo=window.BD_DESK?.toGo&&!BD_ADVENTURE.qualified().ready?BD_DESK.toGo(q):'';
  return '<div class="wg wg-caption-view"><figure class="wg-caption"><div class="wg-caption-picture" aria-hidden="true">'+g.board(site,WG.st(site),true)+'</div><figcaption><h3>'+escapeHTML(c.title)+'</h3><p class="wg-caption-text">'+escapeHTML(g.words.options[0])+'</p>'+(c.extra||'')+'<p class="wg-small">'+escapeHTML(c.small)+'</p></figcaption></figure>'+
   (BD_CULTURE.progress(site).wgSecond?.complete?'<p class="wg-second-caption">'+escapeHTML(secondLook[site.id].line)+'</p>':'')+
   '<p class="wg-payoff">'+escapeHTML(c.P1)+'</p><p>'+escapeHTML(c.P2)+'</p><p class="wg-dig-line">'+escapeHTML(c.P3)+'</p>'+toGo+
   '<div class="actions"><button type="button" class="button" data-culture-action="collect">'+(found?'Visit the display →':'Bring the find home →')+'</button>'+(found?'<button type="button" class="button secondary" data-culture-action="replay">Play again</button>':'')+WG.secondButton(site)+'</div></div>';
  /* Code by Daniel using Claude November 24, 2026 */
 },
 // A visual lens duplicates the current surface at a second scale without moving its controls.
 mountLoupe(){
  const board=$('#wg-board'),surface=board?.querySelector('.wg-sheet,.wg-card');
  if(!surface)return;
  const state=WG.live,signal=state.abort.signal;
  let stale=true;
  const watch=new MutationObserver(()=>{stale=true;});
  watch.observe(surface,{subtree:true,attributes:true,childList:true,characterData:true});
  signal.addEventListener('abort',()=>watch.disconnect(),{once:true});
  const center=()=>{const r=surface.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2];};
  const focusPoint=el=>{const r=el.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2];};
  const move=(clientX,clientY)=>{
   if(!state.loupe)return;
   const rect=surface.getBoundingClientRect(),frame=board.getBoundingClientRect();
   if(!rect.width||!rect.height)return;
   let lens=board.querySelector('.wg-loupe-lens');
   if(!lens){
    lens=document.createElement('div');lens.className='wg-loupe-lens';lens.setAttribute('aria-hidden','true');
    board.append(lens);
   }
   let copy=lens.firstElementChild;
   if(stale||!copy){
    copy=surface.cloneNode(true);
    for(const el of [copy,...copy.querySelectorAll('[id]')])el.removeAttribute('id');
    copy.inert=true;copy.classList.add('wg-loupe-image');lens.replaceChildren(copy);stale=false;
   }
   const x=Math.max(0,Math.min(rect.width,clientX-rect.left)),y=Math.max(0,Math.min(rect.height,clientY-rect.top));
   const radius=lens.offsetWidth/2,magnification=1.85;
   lens.style.left=(rect.left-frame.left+x)+'px';
   lens.style.top=(rect.top-frame.top+y)+'px';
   copy.style.width=rect.width+'px';
   copy.style.height=rect.height+'px';
   copy.style.transform='translate('+(radius-x*magnification)+'px,'+(radius-y*magnification)+'px) scale('+magnification+')';
   state.loupePoint=[rect.left+x,rect.top+y];
  };
  state.toggleLoupe=on=>{
   state.loupe=on;
   $('[data-wg="loupe"]')?.setAttribute('aria-pressed',String(on));
   surface.tabIndex=on?0:-1;
   if(on){move(...center());WG.echo('Loupe on. Move over the surface or use its arrow keys.');}
   else board.querySelector('.wg-loupe-lens')?.remove();
  };
  surface.addEventListener('pointermove',e=>move(e.clientX,e.clientY),{signal});
  surface.addEventListener('pointerdown',e=>move(e.clientX,e.clientY),{signal});
  surface.addEventListener('focusin',e=>move(...focusPoint(e.target)),{signal});
  surface.addEventListener('keydown',e=>{
   if(!state.loupe||e.target!==surface)return;
   const direction={ArrowLeft:[-28,0],ArrowRight:[28,0],ArrowUp:[0,-24],ArrowDown:[0,24]}[e.key];
   if(!direction)return;
   e.preventDefault();e.stopPropagation();const point=state.loupePoint||center();
   move(point[0]+direction[0],point[1]+direction[1]);
  },{signal});
  if(state.loupe)state.toggleLoupe(true);
 },
  // A loop that travels from one element to another on the same board (the echo). Returns the loop.
 loop(board,from,to,cls){
  if(!board||!to)return null;const b=board.getBoundingClientRect(),t=to.getBoundingClientRect(),f=(from||to).getBoundingClientRect(),el=document.createElement('span');
  el.className='wg-loop '+cls;el.style.cssText='left:'+(t.left-b.left-4)+'px;top:'+(t.top-b.top-4)+'px;width:'+(t.width+8)+'px;height:'+(t.height+8)+'px';
  board.appendChild(el);
  if(!WG.calm()&&from&&from!==to){el.animate([{transform:'translate('+(f.left-t.left)+'px,'+(f.top-t.top)+'px)'},{transform:'none'}],{duration:650,easing:'cubic-bezier(.3,.1,.2,1)'});}
  return el;
  /* Code by Daniel using Claude November 24, 2026 */
 },
 clearEchoes(){for(const el of document.querySelectorAll('#wg-board .wg-loop.temp,#wg-board .wg-temp'))el.remove();/* Code by Daniel using Claude November 24, 2026 */}
};

// ───────────────────────── Thebes · The last sign (Mark) ─────────────────────────
// Signs are teaching sketches drawn in code. The spellings follow the usual group-writings of the four names;
// the endings (throw stick + three hills; throw stick + man + woman + plural strokes) follow Hasel. VERIFY every sign
// against Kitchen, Ramesside Inscriptions IV, before publishing (Foundation-Claude/21, facts list).
const GLYPH={
 bolt:['a door bolt','<path d="M3 20H37M16 20q4-6 8 0q-4 6-8 0"/>'],
 twoStrokes:['two slanting strokes','<path d="M13 11l7 17M22 10l7 17"/>'],
 nameStroke:['a short writing stroke','<path d="M20 17v15"/>'],
 reed:['a reed leaf','<path d="M20 37C13 27 13 13 21 3C27 14 26 27 20 37Z"/><path d="M20 36V21"/>'],
 reeds:['two reed leaves','<path d="M13 37C8 28 8 15 14 5C18 15 18 28 13 37Z"/><path d="M27 37C22 28 22 15 28 5C32 15 32 28 27 37Z"/>'],
 cloth:['a folded cloth','<path d="M15 37V15C15 6 27 6 27 13C27 18 21 18 21 22V37"/>'],
 slope:['a hill slope','<path d="M5 33Q12 8 35 33Z"/>'],
 mouth:['a mouth','<path d="M4 20Q20 9 36 20Q20 31 4 20Z"/>'],
 water:['a ripple of water','<path d="M3 21l4-5 4 5 4-5 4 5 4-5 4 5 4-5 4 5"/>'],
 arm:['an arm','<path d="M3 25H26Q33 25 34 19M26 25Q35 25 37 17"/>'],
 owl:['an owl','<path d="M13 36V20Q13 8 22 8Q30 8 30 18V36M18 15h1M25 15h1M12 36H32"/>'],
 vulture:['a vulture','<path d="M10 36L14 22Q12 10 20 8Q26 8 25 14L22 16Q30 20 32 36Z"/>'],
 cobra:['a cobra','<path d="M6 34Q20 34 22 25Q25 13 17 10Q11 10 12 16"/>'],
 stick:['a bent stick','<path d="M7 33L19 15L34 11" class="thick"/>'],
 hills:['three small hills','<path d="M4 32Q10 15 15 32Q20 6 25 32Q30 15 36 32Z"/>'],
 man:['a seated man','<circle cx="17" cy="9" r="4"/><path d="M17 13V26H29V36M17 26L11 36M17 18L25 16"/>'],
 woman:['a seated woman','<circle cx="17" cy="9" r="4"/><path d="M14 8Q11 16 15 20M17 13Q13 24 15 30H29V36M15 30L11 36"/>'],
 strokes:['three short strokes','<path d="M12 9V31M20 9V31M28 9V31" class="thick"/>']
};
WG.games.thebes={order:[2,0,1],
 rows:[
  {name:'Ashkelon',groups:[['reed'],['cloth'],['slope'],['vulture'],['mouth','water','twoStrokes'],['stick'],['hills']]},
  {name:'Gezer',groups:[['slope'],['vulture'],['mouth','nameStroke'],['stick'],['hills']]},
  {name:'Yanoam',groups:[['reeds'],['water'],['arm'],['owl'],['stick'],['hills']]},
  {name:'Israel',groups:[['reeds'],['bolt','twoStrokes'],['mouth'],['reed','vulture','nameStroke'],['mouth'],['stick'],['man','woman'],['strokes']]}],
 words:{W:'Experts copy carvings onto paper so they can compare the signs side by side.',M1:'Three towns in Canaan. Circle the two signs all three names share.',
  C1:'That one is missing from a name. Find two signs on all three.',C2:'Yes! One more sign always travels with it.',N1:'Stick + hills = a foreign place',
  M2:'Good eye. The other signs spell the sound. These two tell the kind.',M3:'Now a fourth name. Circle what its ending has instead.',
  C3:'That stick is on all four. Look at what follows it.',C4:'Those signs spell the sound. Check the ending, where the hills were.',N2:'A man and a woman',N3:'Three strokes = many',
  M4:'And the name is Israel. No hills here. What did the scribe mean?',Q:'What goes on the museum label?',
  options:['Egypt’s scribe wrote Israel as a people living in Canaan, about 1208 BC.','Israel was a walled town that Pharaoh destroyed about 1208 BC.','Israel left Egypt about 1208 BC.'],
  coaching:['','Look at your circle again. Hills mean a place. Israel has none.','The stone dates Pharaoh’s boast, not the Exodus. Israel was already in Canaan.']},
 caption:{title:'Israel, before the kings',extra:'<p class="wg-term">Scholars call a “kind” sign a determinative.</p>',small:'The Merneptah Stele · Egyptian Museum, Cairo · Historians date the carving to about 1208 BC · Rubbing: teaching copy',
  P1:'Pharaoh bragged that Israel was finished. His own stone kept their name.',P2:'Read with it: Judges 2.',P3:'This counts toward the Important Dig, just like a dug find.'},
 fresh(){return {step:0,asking:false};/* Code by Daniel using Claude November 24, 2026 */},
 clean(raw){return {step:[0,1,2].includes(raw?.step)?raw.step:0,asking:raw?.step===2&&raw?.asking===true};/* Code by Daniel using Claude November 24, 2026 */},
 solved(w){return w.step===2;/* Code by Daniel using Claude November 24, 2026 */},
 opening(w){const x=this.words;return w.step===0?x.M1:w.step===1?x.M3:x.M4;/* Code by Daniel using Claude November 24, 2026 */},
 status(w){return w.step===0?'Next: find what all three names share.':w.step===1?'Next: circle what the fourth name’s ending has instead.':'Next: tell a visitor what you found.';/* Code by Daniel using Claude November 24, 2026 */},
 tools(){return '<span class="wg-charcoal-tool" aria-hidden="true" title="Drag to draw a charcoal loop">'+WG.paint('thebes-charcoal')+'</span>'+WG.loupeTool('rubbing');/* Code by Daniel using Claude November 24, 2026 */},
 kind(r,i){const g=this.rows[r].groups[i][0];return ['stick','hills','man','strokes'].includes(g)?'kind':'sound';/* Code by Daniel using Claude November 24, 2026 */},
 board(site,w,frozen=false){
  const x=this.words,rows=this.rows.map((row,r)=>{
   const hidden=r===3&&w.step===0,label=r<3?row.name:w.step===2?'Israel':'A fourth name',n=row.groups.length;
   const groups=row.groups.map((group,i)=>{
    const kind=this.kind(r,i),right=(r<3&&w.step>=1&&kind==='kind')||(r===3&&w.step===2&&(group[0]==='man'||group[0]==='strokes'));
    const dim=(r<3&&w.step>=1&&kind==='sound')||(r===3&&w.step===2&&kind==='sound');
    const say=group.map(gl=>GLYPH[gl][0]).join(' and ');
    return '<button type="button" data-wg="sign" class="wg-sign'+(right?' is-right':'')+(dim?' is-dim':'')+'" data-row="'+r+'" data-g="'+i+'" data-glyph="'+group[0]+'" data-part="'+kind+'" tabindex="-1" aria-label="'+escapeHTML((r===3&&w.step<2?'fourth name':row.name)+', sign '+(i+1)+' of '+n+', '+say)+'"'+(hidden||frozen?' disabled':'')+'>'+group.map(gl=>'<svg viewBox="0 0 40 40" aria-hidden="true">'+GLYPH[gl][1]+'</svg>').join('')+(right?WG.pin():'')+'</button>';
   }).join('');
   const note=r===0&&w.step>=1?'<span class="wg-note">'+escapeHTML(x.N1)+'</span>':r===3&&w.step===2?'<span class="wg-note">'+escapeHTML(x.N2)+'</span><span class="wg-note">'+escapeHTML(x.N3)+'</span>':'';
   return '<div class="wg-row'+(hidden?' wg-under-flap':'')+(w.step>=1&&(r<3||w.step===2)?' wg-bracketed':'')+'" data-row="'+r+'"><div class="wg-band">'+WG.paint('thebes-rub','wg-rub')+groups+'<span class="wg-blank" aria-hidden="true"></span></div><span class="wg-name'+(r===3?' fourth':'')+'">'+escapeHTML(label)+'</span>'+note+(hidden?'<div class="wg-flap" aria-label="A fourth name, covered by a taped strip of tracing paper">'+WG.paint('thebes-flap')+'</div>':'')+'</div>';
  }).join('');
  return '<div class="wg-thebes-layout"><div class="wg-sheet" id="wg-sheet" role="group" aria-label="Charcoal rubbing of four names">'+WG.paint('thebes-sheet','wg-sheet-paper')+WG.tag('copy','Teaching drawing · line 27')+'<p class="wg-direction" aria-hidden="true">← reads this way</p>'+rows+'<svg class="wg-lasso" aria-hidden="true"><polyline points=""/></svg></div>'+
   '<figure class="wg-real"><div class="wg-real-stone">'+WG.paint('thebes-stone')+'</div><figcaption>'+WG.tag('copy','Stele study · original in Cairo')+'</figcaption></figure></div>'+
   (frozen&&w.step===2?'<div class="wg-endings" aria-hidden="true">'+this.rows.map((row,r)=>'<div>'+row.groups.map((g,i)=>this.kind(r,i)==='kind'?g.map(gl=>'<svg viewBox="0 0 40 40">'+GLYPH[gl][1]+'</svg>').join(''):'').join('')+'</div>').join('')+'</div>':'');
  /* Code by Daniel using Claude November 24, 2026 */
 },
 mounted(site,w){
  const sheet=$('#wg-sheet'),first=sheet.querySelector('.wg-row:not(.wg-under-flap) .wg-sign:not([disabled])');if(first)first.tabIndex=0;
  if(w.step>=1)requestAnimationFrame(()=>{for(const row of sheet.querySelectorAll('.wg-row.wg-bracketed'))this.brackets(row);});
  // Charcoal loops: drag a loop round one or more groups; a short tap marks one group.
  let path=null,points=[];
  sheet.addEventListener('pointerdown',function startLoop(e){if(e.button>0)return;points=[[e.clientX,e.clientY]];path=null;/* Code by Daniel using Claude November 24, 2026 */});
  sheet.addEventListener('pointermove',function drawLoop(e){
   if(!points.length)return;const [x0,y0]=points[0];if(!path&&Math.hypot(e.clientX-x0,e.clientY-y0)<14)return;
   if(!path){path=sheet.querySelector('.wg-lasso polyline');sheet.setPointerCapture?.(e.pointerId);}
   points.push([e.clientX,e.clientY]);const b=sheet.getBoundingClientRect();path.setAttribute('points',points.map(p=>(p[0]-b.left)+','+(p[1]-b.top)).join(' '));
   /* Code by Daniel using Claude November 24, 2026 */
  });
  sheet.addEventListener('pointerup',function closeLoop(){
   if(!path){points=[];return;}const poly=points;points=[];path.setAttribute('points','');path=null;WG.suppress();
   const inside=[...sheet.querySelectorAll('.wg-sign:not([disabled])')].filter(function within(el){const r=el.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;let c=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const [xi,yi]=poly[i],[xj,yj]=poly[j];if((yi>cy)!==(yj>cy)&&cx<(xj-xi)*(cy-yi)/(yj-yi)+xi)c=!c;}return c;});
   if(inside.length)WG.games.thebes.mark(inside);
   /* Code by Daniel using Claude November 24, 2026 */
  });
  sheet.addEventListener('keydown',function moveAlongSigns(e){
   const all=[...sheet.querySelectorAll('.wg-sign:not([disabled])')],i=all.indexOf(document.activeElement);if(i<0)return;
   const step={ArrowLeft:1,ArrowRight:-1,ArrowDown:'down',ArrowUp:'up'}[e.key];if(step===undefined)return;e.preventDefault();
   let next;if(typeof step==='number')next=all[Math.max(0,Math.min(all.length-1,i+step))];
   else{const row=Number(all[i].dataset.row)+(step==='down'?1:-1);next=all.find(el=>Number(el.dataset.row)===row)||all[i];}
   all[i].tabIndex=-1;next.tabIndex=0;next.focus();
   /* Code by Daniel using Claude November 24, 2026 */
  });
  /* Code by Daniel using Claude November 24, 2026 */
 },
 // Pencilled brackets under a row: "sounds" over the spelling, "kind" over the ending.
 brackets(row){
  const band=row.querySelector('.wg-band'),b=band.getBoundingClientRect();for(const old of band.querySelectorAll('.wg-bracket'))old.remove();
  for(const part of ['sound','kind']){const els=[...band.querySelectorAll('.wg-sign[data-part="'+part+'"]')];if(!els.length)continue;const rs=els.map(e=>e.getBoundingClientRect()),l=Math.min(...rs.map(r=>r.left)),r=Math.max(...rs.map(r=>r.right));
   const el=document.createElement('span');el.className='wg-bracket '+part;el.style.cssText='left:'+(l-b.left)+'px;width:'+(r-l)+'px';el.innerHTML='<i>'+(part==='sound'?'sounds':'kind')+'</i>';band.appendChild(el);}
  /* Code by Daniel using Claude November 24, 2026 */
 },
 sign(r,g){return $('#wg-sheet .wg-sign[data-row="'+r+'"][data-g="'+g+'"]');/* Code by Daniel using Claude November 24, 2026 */},
 find(r,glyph){const i=this.rows[r].groups.findIndex(gr=>gr.includes(glyph));return i<0?null:this.sign(r,i);/* Code by Daniel using Claude November 24, 2026 */},
 // A mark: one group (tap) or several (a loop). Judged at once; the picture answers before Miriam does.
 mark(els){
  const site=WG.live?.site,w=WG.st(site),x=this.words,sheet=$('#wg-sheet');if(!sheet||w.step===2)return;
  WG.moved();WG.clearEchoes();WG.sound('scratch');
  const picks=els.map(el=>({el,r:Number(el.dataset.row),g:Number(el.dataset.g),glyph:this.rows[Number(el.dataset.row)].groups[Number(el.dataset.g)][0]}));
  if(w.step===0){
   const towns=picks.filter(p=>p.r<3);if(!towns.length)return;
   const kinds=new Set(towns.map(p=>p.glyph).filter(g=>g==='stick'||g==='hills'));
   if(WG.live.half)kinds.add(WG.live.half);
   if(kinds.has('stick')&&kinds.has('hills')){this.townsSolved();return;}
   if(kinds.size===1){const half=[...kinds][0],partner=half==='stick'?'hills':'stick';WG.live.half=half;
    for(let r=0;r<3;r++){const t=this.find(r,half);t?.classList.add('is-nearly');WG.loop(sheet,towns[0].el,t,'temp nearly');}
    WG.later(()=>{for(let r=0;r<3;r++)this.find(r,partner)?.classList.add('wg-glint');},700);WG.later(()=>{for(const el of sheet.querySelectorAll('.wg-glint'))el.classList.remove('wg-glint');},1900);
    WG.echo('The '+GLYPH[half][0].replace(/^an? /,'')+' appears in all three names.');WG.later(()=>WG.say(x.C2),900);return;}
   const p=towns[0];p.el.classList.add('is-ghost');const missing=[];
   for(let r=0;r<3;r++){if(r===p.r)continue;const t=this.find(r,p.glyph);if(t)WG.loop(sheet,p.el,t,'temp');else{missing.push(this.rows[r].name);WG.loop(sheet,p.el,sheet.querySelector('.wg-row[data-row="'+r+'"] .wg-blank'),'temp empty');}}
   if(!missing.length){
    WG.echo('This spelling sign also repeats.');
    WG.later(()=>WG.say('That sign repeats. Check which signs tell you what kind of name it is.'),900);
   }else{
    WG.echo('Not found in '+missing.join(' or ')+'.');WG.wrong();WG.later(()=>WG.say(x.C1),900);
   }
   return;
  }
  // Step 2: only the fourth name answers now; the towns just shimmer.
  const four=picks.filter(p=>p.r===3);
  if(!four.length){for(const p of picks){p.el.classList.remove('wg-shimmer');void p.el.offsetWidth;p.el.classList.add('wg-shimmer');}return;}
  const people=four.find(p=>p.glyph==='man'||p.glyph==='strokes'),stick=four.find(p=>p.glyph==='stick');
  if(people){this.peopleFound(people.el);return;}
  if(stick){stick.el.classList.add('is-ghost');for(let r=0;r<3;r++)WG.loop(sheet,stick.el,this.find(r,'stick'),'temp');WG.echo('The bent stick is on all four names.');WG.wrong();WG.later(()=>WG.say(x.C3),900);return;}
  four[0].el.classList.add('is-ghost');for(const b of sheet.querySelectorAll('.wg-bracket.sound')){b.classList.remove('wg-pulse');void b.offsetWidth;b.classList.add('wg-pulse');}
  const row=sheet.querySelector('.wg-row[data-row="3"] .wg-band'),ending=[this.find(3,'man'),this.find(3,'strokes')];
  if(row&&ending[0]){const rb=row.getBoundingClientRect(),a=ending[0].getBoundingClientRect(),z=ending[1].getBoundingClientRect(),q=document.createElement('span');q.className='wg-bracket kind wg-temp wg-question-bracket';q.style.cssText='left:'+(Math.min(a.left,z.left)-rb.left)+'px;width:'+(Math.max(a.right,z.right)-Math.min(a.left,z.left))+'px';q.innerHTML='<i>kind ?</i>';row.appendChild(q);}
  WG.echo('Every name is spelled differently. The ending is where the kind is shown.');WG.wrong();WG.later(()=>WG.say(x.C4),900);
  /* Code by Daniel using Claude November 24, 2026 */
 },
 townsSolved(){
  const site=WG.live.site,w=WG.st(site),x=this.words,sheet=$('#wg-sheet');WG.live.half=null;
  for(let r=0;r<3;r++)for(const k of ['stick','hills']){const el=this.find(r,k);el.classList.remove('is-nearly','is-ghost');el.classList.add('is-right');el.insertAdjacentHTML('beforeend',WG.pin());}
  for(const el of sheet.querySelectorAll('.wg-row:not([data-row="3"]) .wg-sign[data-part="sound"]'))el.classList.add('is-dim');
  for(const row of sheet.querySelectorAll('.wg-row:not([data-row="3"])')){row.classList.add('wg-bracketed');this.brackets(row);}
  sheet.querySelector('.wg-row[data-row="0"]').insertAdjacentHTML('beforeend','<span class="wg-note">'+escapeHTML(x.N1)+'</span>');
  WG.echo('The bent stick and the three small hills end all three names.');WG.say(x.M2);chime?.();
  w.step=1;persist();WG.newStep();
  sheet.querySelector('.wg-flap')?.classList.add('lifting');
  WG.later(function liftTheFlap(){if(WG.live?.site!==site)return;BD_CULTURE.draw(site,'.wg-row[data-row="3"] .wg-sign');WG.say(x.M3);const f=$('#wg-sheet .wg-row[data-row="3"] .wg-sign');if(f){for(const el of document.querySelectorAll('#wg-sheet .wg-sign'))el.tabIndex=-1;f.tabIndex=0;f.focus();}},1200);
  /* Code by Daniel using Claude November 24, 2026 */
 },
 peopleFound(from){
  const site=WG.live.site,w=WG.st(site),x=this.words,sheet=$('#wg-sheet'),man=this.find(3,'man'),strokes=this.find(3,'strokes'),hills=this.find(0,'hills');
  WG.clearEchoes();
  if(hills&&man){const tracing=WG.loop(sheet,hills,man,'temp tracing');if(tracing)tracing.innerHTML=WG.paint('thebes-tracing')+'<svg viewBox="0 0 40 40" aria-hidden="true">'+GLYPH.hills[1]+'</svg>';}
  WG.echo('A tracing of the hills is laid over the fourth ending. It does not match: a man, a woman and three strokes.');
  w.step=2;persist();WG.newStep();
  WG.later(function writeIsrael(){
   if(WG.live?.site!==site)return;WG.clearEchoes();for(const el of [man,strokes]){el.classList.add('is-right');el.insertAdjacentHTML('beforeend',WG.pin());}chime?.();
   const label=$('#wg-sheet .wg-row[data-row="3"] .wg-name');let n=0;const word='Israel';
   const type=function nextLetter(){if(!label)return;n++;label.textContent=word.slice(0,n);if(n<word.length)WG.later(type,110);else{BD_CULTURE.draw(site,'[data-wg="tell"]');WG.say(x.M4);}};
   if(WG.calm())n=word.length-1;type();
  },1300);
  /* Code by Daniel using Claude November 24, 2026 */
 },
 hint(site,rung){
  const w=WG.st(site),x=this.words,sheet=$('#wg-sheet');
  if(rung===1){WG.light(w.step===0?[0,1,2].flatMap(r=>[this.find(r,'stick'),this.find(r,'hills')]):[this.find(3,'stick'),this.find(3,'man'),this.find(3,'strokes')]);return;}
  if(rung===2){WG.say(w.step===0?'Look at the end of each name. What repeats?':'Hold a town’s ending beside this one. What changed?');return;}
  if(w.step===0){WG.say('I’ll circle one. You find its partner.');this.mark([this.find(0,'stick')]);WG.later(()=>WG.say('I’ll circle one. You find its partner.'),950);}
  else{const t=WG.loop(sheet,this.find(0,'hills'),this.find(3,'man'),'temp tracing');if(t)t.innerHTML=WG.paint('thebes-tracing')+'<svg viewBox="0 0 40 40" aria-hidden="true">'+GLYPH.hills[1]+'</svg>';WG.say('The stick matches. The hills don’t. Circle what is there instead.');}
  /* Code by Daniel using Claude November 24, 2026 */
 },
 // For tests: the right moves, made through the same handlers a player uses.
 autoplay(){const w=WG.st(WG.live.site);if(w.step===0)this.townsSolved();if(w.step===1)this.peopleFound(this.find(3,'man'));/* Code by Daniel using Claude November 24, 2026 */}
};

// ───────────────────────── Bethesda · Room for a fifth colonnade (Fit + Uncover) ─────────────────────────
WG.games.bethesda={order:[1,2,0],
 roofs:['short','short','short','long','long'],places:{n:'short',e:'long',s:'short',w:'long',middle:'short'},
 names:{n:'north bank',e:'east bank',s:'south bank',w:'west bank',middle:'middle',sandN:'north sand',sandS:'south sand'},
 words:{W:'Archaeologists build models to test whether an old description fits the ground.',E1:'A colonnade is a roofed walkway held up by a row of columns.',
  M1:'John counted five colonnades at this pool. Set each roof where stone can hold it.',C1:'No footing there. Loose fill can’t hold columns.',
  C2:'That bank has its roof already. Is there other stone?',C3:'Hear that? Something hard is under there. Try the brush.',C4:'Just fill here. Look for stone that pokes out of the sand.',
  C5:'Wrong length for that bank. Match long to long.',N1:'A wall between two pools',M2:'A wall, right across the middle. So it was two pools.',
  M3:'Five. Four sides and the wall between. John’s count fits the ground.',Q:'A friend asks, “Why five? A pool has four sides.” What do you say?',
  options:['It was two pools. Four sides, plus the wall between them.','The stones prove Jesus healed a man here.','John just meant there were lots of colonnades.'],
  coaching:['','Stones show the place. John tells us what Jesus did there.','Count your colonnades. Five real places to stand, and John said five.'],
  V:'By the Sheep Gate in Jerusalem there is a pool, called Bethesda in Aramaic, which has five colonnades.'},
 caption:{title:'Five colonnades',extra:'<p class="wg-verse">“By the Sheep Gate in Jerusalem there is a pool, called Bethesda in Aramaic, which has five colonnades.” (John 5:2 CSB)</p>',
  small:'The pools of Bethesda, Jerusalem · Model made up for the game, not to scale',P1:'Under colonnades like these, Jesus saw one man who had waited years.',P2:'Read with it: John 5:1–9.',P3:'This counts toward the Important Dig, just like a dug find.'},
 fresh(){return {on:{n:-1,e:-1,s:-1,w:-1,middle:-1},wall:0,asking:false};/* Code by Daniel using Claude November 24, 2026 */},
 clean(raw){const w=this.fresh(),used=new Set();for(const k of Object.keys(w.on)){const v=raw?.on?.[k];if(Number.isInteger(v)&&v>=0&&v<5&&!used.has(v)&&this.roofs[v]===this.places[k]&&(k!=='middle'||raw.wall>=3)){w.on[k]=v;used.add(v);}}
  w.wall=Number.isInteger(raw?.wall)?Math.max(0,Math.min(3,raw.wall)):0;w.asking=this.solved(w)&&raw?.asking===true;return w;/* Code by Daniel using Claude November 24, 2026 */},
 count(w){return Object.values(w.on).filter(v=>v>=0).length;/* Code by Daniel using Claude November 24, 2026 */},
 solved(w){return this.count(w)===5;/* Code by Daniel using Claude November 24, 2026 */},
 opening(w){return this.solved(w)?this.words.M3:w.wall>=3?this.words.M2:this.words.M1;/* Code by Daniel using Claude November 24, 2026 */},
 status(w){const n=this.count(w);return n===5?'Next: tell a visitor what you found.':n===4&&w.on.middle<0?'4 of 5 colonnades roofed. One short roof left.':n?n+' of 5 colonnades roofed.':'Next: set a roof on stone.';/* Code by Daniel using Claude November 24, 2026 */},
 tools(){return '<button type="button" class="wg-tool" data-wg="brush" aria-pressed="false" aria-label="Brush: choose it, then a sand area (or drag on the sand)">' + (WG.paint('bethesda-brush','wg-tool-raster')||'<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6 26l10-10M15 11l6 6M18 8l6 6-4 4-6-6z"/></svg>') + '<span>Brush</span></button>';/* Code by Daniel using Claude November 24, 2026 */},
 board(site,w,frozen=false){
  const placed=Object.entries(w.on).filter(([k,v])=>v>=0),done=this.solved(w);
  const places=Object.keys(this.names).map(k=>{const roofed=w.on[k]>=0;const say=k==='middle'?(w.wall>=3?'Middle of the tray: a stone wall from the east bank to the west bank':w.wall?'Middle of the tray: sand, with stone showing':'Middle of the tray: sand, with a stone stub at each end'):k.startsWith('sand')?this.names[k]+': open sand':this.names[k]+(roofed?': roofed':': bare stone');
   return '<button type="button" class="wg-place wg-place-'+k+(roofed?' roofed':'')+'" data-wg="place" data-place="'+k+'" aria-label="'+escapeHTML(say)+'"'+(frozen?' disabled':'')+'></button>';}).join('');
  const roofsOn=placed.map(([k,v])=>'<span class="wg-roof wg-roof-'+this.roofs[v]+' on-'+k+'" aria-hidden="true">'+WG.paint('bethesda-roof-'+this.roofs[v])+WG.pin()+'</span>').join('');
  const rack=frozen?'':'<div class="wg-rack" aria-label="Roof rack">'+WG.tag('copy',this.words.E1)+'<button type="button" class="wg-verse-tag" data-wg="verse">John 5:2</button><p class="wg-verse" hidden>“'+escapeHTML(this.words.V)+'” (John 5:2 CSB)</p><div class="wg-rack-roofs">'+
   [0,1,2,3,4].map(i=>Object.values(w.on).includes(i)?'':'<button type="button" class="wg-roofpiece wg-roof-'+this.roofs[i]+'" data-wg="roof" data-roof="'+i+'" aria-label="'+(this.roofs[i]==='long'?'Long':'Short')+' roof"'+'>'+WG.paint('bethesda-roof-'+this.roofs[i])+'</button>').join('')+'</div></div>';
  return '<div class="wg-bethesda-layout"><div class="wg-model'+(done?' revealed':'')+'" id="wg-model" role="group" aria-label="Sand-tray model of the pool, north at the top">'+
   WG.paint('bethesda-dug','wg-layer-dug')+'<span class="wg-basin n" aria-hidden="true"></span><span class="wg-basin s" aria-hidden="true"></span>'+
   '<span class="wg-wall-stone" style="--bare:'+(w.wall/3)+'" aria-hidden="true"></span>'+
   '<span class="wg-sand n" aria-hidden="true">'+WG.paint('bethesda-sand-north')+'</span><span class="wg-sand s" aria-hidden="true">'+WG.paint('bethesda-sand-south')+'</span><span class="wg-sand mid" style="--bare:'+(w.wall/3)+'" aria-hidden="true">'+WG.paint('bethesda-sand-middle')+'</span>'+
   '<span class="wg-stub w" aria-hidden="true"></span><span class="wg-stub e" aria-hidden="true"></span><span class="wg-water" aria-hidden="true">'+WG.paint('bethesda-water')+'</span><span class="wg-figures" aria-hidden="true">'+WG.paint('bethesda-figures')+'</span>'+
   '<span class="wg-compass" aria-hidden="true">N ↑</span>'+WG.tag('invented','Made up for the game · not to scale')+roofsOn+places+'</div>'+rack+'</div>';
  /* Code by Daniel using Claude November 24, 2026 */
 },
 mounted(site,w){
  const model=$('#wg-model');let drag=null,brush=null;
  // Carry a roof: drag it onto the tray, or tap it and then tap a place.
  for(const piece of document.querySelectorAll('.wg-roofpiece'))piece.addEventListener('pointerdown',function liftRoof(e){
   if(e.button>0)return;drag={i:Number(piece.dataset.roof),x:e.clientX,y:e.clientY,ghost:null,piece};piece.setPointerCapture?.(e.pointerId);
   /* Code by Daniel using Claude November 24, 2026 */
  });
  document.addEventListener('pointermove',function carryRoof(e){
   if(!drag)return;if(!drag.ghost&&Math.hypot(e.clientX-drag.x,e.clientY-drag.y)<8)return;
   if(!drag.ghost){drag.ghost=drag.piece.cloneNode(true);drag.ghost.classList.add('wg-carried');document.body.appendChild(drag.ghost);}
   drag.ghost.style.left=e.clientX+'px';drag.ghost.style.top=e.clientY+'px';
   /* Code by Daniel using Claude November 24, 2026 */
  },{signal:WG.live.abort.signal});
  document.addEventListener('pointerup',function setRoofDown(e){
   if(!drag)return;const d=drag;drag=null;if(!d.ghost)return;d.ghost.remove();WG.suppress();
   const place=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-place]');if(place)WG.games.bethesda.drop(d.i,place.dataset.place);
   /* Code by Daniel using Claude November 24, 2026 */
  },{signal:WG.live.abort.signal});
  // Brush strokes: drag on sand with nothing held. A stroke is a drag of a little length.
  model.addEventListener('pointerdown',function startBrush(e){if(e.button>0||WG.live.held!=null)return;const place=e.target.closest('[data-place]');if(!place)return;brush={place:place.dataset.place,x:e.clientX,y:e.clientY,len:0};/* Code by Daniel using Claude November 24, 2026 */});
  model.addEventListener('pointermove',function sweep(e){if(!brush)return;brush.len=Math.max(brush.len,Math.hypot(e.clientX-brush.x,e.clientY-brush.y));/* Code by Daniel using Claude November 24, 2026 */});
  model.addEventListener('pointerup',function endBrush(){if(!brush)return;const b=brush;brush=null;if(b.len>36){WG.suppress();WG.games.bethesda.stroke(b.place);}/* Code by Daniel using Claude November 24, 2026 */});
  /* Code by Daniel using Claude November 24, 2026 */
 },
 hold(i){const l=WG.live;l.held=l.held===i?null:i;l.brush=false;for(const el of document.querySelectorAll('.wg-roofpiece'))el.classList.toggle('held',Number(el.dataset.roof)===l.held);$('#wg-model')?.classList.toggle('holding',l.held!=null);
  if(l.held!=null){WG.echo('Holding a '+this.roofs[i]+' roof. Choose a place on the tray.');$('#wg-model .wg-place-n')?.focus({preventScroll:true});}/* Code by Daniel using Claude November 24, 2026 */},
 place(k){const l=WG.live;if(l.held!=null){const i=l.held;this.hold(i);this.drop(i,k);return;}if(l.brush||k==='middle'||k.startsWith('sand')){if(k==='middle'||k.startsWith('sand'))this.stroke(k);return;}
  WG.echo(this.names[k]+(WG.st(l.site).on[k]>=0?': roofed.':': bare stone. Choose a roof from the rack first.'));/* Code by Daniel using Claude November 24, 2026 */},
 // A roof put down: the picture answers (seats, overhangs, rests crooked, sinks, or stops on something hard).
 drop(i,k){
  const site=WG.live.site,w=WG.st(site),x=this.words,model=$('#wg-model'),len=this.roofs[i];WG.moved();
  const temp=cls=>{const el=document.createElement('span');el.className='wg-roof wg-roof-'+len+' on-'+k+' wg-temp '+cls;el.innerHTML=WG.paint('bethesda-roof-'+len);model.appendChild(el);WG.later(()=>el.remove(),1200);return el;};
  if(k.startsWith('sand')){temp('sinking');WG.echo('The roof sinks in loose sand and returns to the rack.');WG.wrong();WG.later(()=>WG.say(x.C1),900);return;}
  if(k==='middle'&&w.wall<3){WG.sound('tock');temp('tilted');model.classList.add('cracked');WG.echo('The roof stops on something hard under the sand.');WG.later(()=>WG.say(x.C3),900);return;}
  if(w.on[k]>=0){temp('crooked');WG.echo('That place already has a roof. It slides back.');WG.wrong();WG.later(()=>WG.say(x.C2),900);return;}
  if(this.places[k]!==len){temp(len==='long'?'overhang':'too-short');WG.echo('Wrong length: the roof does not fit the '+this.names[k]+'.');WG.wrong();WG.later(()=>WG.say(x.C5),900);return;}
  w.on[k]=i;persist();WG.sound('clunk');chime?.();WG.newStep();
  if(this.solved(w)){BD_CULTURE.draw(site);WG.say(x.M3);WG.echo('Five roofs set. Water fills both pools.');$('[data-wg="tell"]')?.focus({preventScroll:true});return;}
  BD_CULTURE.draw(site,'.wg-roofpiece');WG.echo('The roof seats on the '+this.names[k]+'.');
  /* Code by Daniel using Claude November 24, 2026 */
 },
 stroke(k){
  const site=WG.live.site,w=WG.st(site),x=this.words,l=WG.live;WG.moved();
  if(k==='middle'&&w.wall<3){WG.sound('scratch');w.wall++;persist();const sand=$('#wg-model .wg-sand.mid'),stone=$('#wg-model .wg-wall-stone');for(const el of [sand,stone])el?.style.setProperty('--bare',w.wall/3);
   if(w.wall===3){WG.newStep();BD_CULTURE.draw(site,'.wg-roofpiece');WG.say(x.M2);WG.echo('A stone wall runs from the east bank to the west bank.');$('#wg-board')?.insertAdjacentHTML('beforeend','<p class="wg-note">'+escapeHTML(x.N1)+'</p>');}
   else WG.echo('Stone shows under the sand: '+w.wall+' of 3.');return;}
  if(k.startsWith('sand')){l.empty=(l.empty||0)+1;WG.status('Only fill here.');WG.echo('Only fill here.');if(l.empty>=3){WG.wrong();WG.say(x.C4);}return;}
  /* Code by Daniel using Claude November 24, 2026 */
 },
 hint(site,rung){
  const w=WG.st(site),x=this.words;
  if(rung===1){WG.light(w.wall<3?[$('.wg-stub.w'),$('.wg-stub.e'),$('.wg-place-middle')]:[$('.wg-wall-stone'),$('.wg-rack')]);return;}
  if(rung===2){WG.say(w.wall<3?'See the two stone stubs facing each other? What would join them?':'Stone can hold a roof. Which stone is still bare?');return;}
  if(w.wall<3){this.stroke('middle');WG.say('I’ve made the first stroke. You make the next two.');return;}
  const k=Object.keys(this.places).find(p=>w.on[p]<0),i=[0,1,2,3,4].find(r=>!Object.values(w.on).includes(r)&&this.roofs[r]===this.places[k]);if(k&&i!=null){this.drop(i,k);WG.say('That one’s set. You place the rest.');}
  /* Code by Daniel using Claude November 24, 2026 */
 },
 autoplay(){const site=WG.live.site,w=WG.st(site);for(let n=0;n<3;n++)if(w.wall<3)this.stroke('middle');for(const k of ['n','e','s','w','middle']){if(w.on[k]>=0)continue;const i=[0,1,2,3,4].find(r=>!Object.values(w.on).includes(r)&&this.roofs[r]===this.places[k]);this.drop(i,k);}/* Code by Daniel using Claude November 24, 2026 */}
};

// ───────────────────────── Delphi · Set the Corinth clock (Slide + Fit) ─────────────────────────
// Years are decimal (52.0 = early 52, 52.5 = summer 52). Gallio's year begins in early summer. Pin: Claudius's 26th salute, early 52.
const season=v=>['early ','spring ','summer ','autumn '][Math.round((v-Math.floor(v))*4)%4]+Math.floor(v);
WG.games.delphi={order:[1,0,2],
 pin:52.1,gallio:51.5,stay:1.5,
 words:{W:'Old letters rarely give a year. Historians date them by the emperor’s titles.',N0:'26th salute: early AD 52',
  M1:'Claudius’s letter names the governor, Gallio. Slide his one year over the date pin.',C1:'The pin is outside. Gallio was governor when Claudius wrote.',
  N1:'Gallio governs: summer 51 to summer 52',M2:'Luke gives no year. Paul stayed eighteen months and faced Gallio. Place the hearing.',
  C2:'Gallio is here, but Paul isn’t. Slide Paul’s stay under the peg.',C3:'Paul is here, but Gallio isn’t governor then. Bring them together.',
  C4:'The hearing needs both men. Find where the two strips overlap.',C5:'So close. They must share some time, not just touch.',N2:'Paul in Corinth: around AD 51',
  M3:'Caught! Now try sliding Paul’s stay. See how far it goes.',Q:'What does the Delphi letter do for the book of Acts?',
  options:['It dates Gallio’s year, and Luke puts Paul in front of Gallio.','It mentions Paul and his trial.','It gives the exact day Paul stood before Gallio.'],
  coaching:['','Check the card. It names Claudius and Gallio. Paul’s name comes from Luke.','Slide Paul’s stay. It still moves a little. “Around AD 51” is honest.']},
 caption:{title:'Set the Corinth clock',extra:'<p class="wg-term">Paul in Corinth: AD 50–52</p>',small:'The Gallio inscription, Delphi · Letter of Claudius, early AD 52 by historians’ reckoning · Card: teaching copy',
  P1:'The stone at Delphi anchors the date of the hearing Luke describes.',P2:'Read with it: Acts 18:9–17.',P3:'This counts toward the Important Dig, just like a dug find.'},
 fresh(){return {bracket:46.5,fixed:false,bar:46,peg:null,caught:false,asking:false};/* Code by Daniel using Claude November 24, 2026 */},
 clean(raw){const w=this.fresh(),q=v=>Math.round(v*4)/4,ok=v=>Number.isFinite(v)&&v>=40&&v<=60;
  if(ok(raw?.bracket))w.bracket=Math.floor(raw.bracket)+.5;w.fixed=raw?.fixed===true&&w.bracket===this.gallio;if(ok(raw?.bar))w.bar=q(raw.bar);
  if(w.fixed&&ok(raw?.peg))w.peg=q(raw.peg);w.caught=w.fixed&&w.peg!=null&&raw?.caught===true&&this.inside(w.peg,w.bar,w.bar+this.stay)&&this.inside(w.peg,this.gallio,this.gallio+1);w.asking=w.caught&&raw?.asking===true;return w;/* Code by Daniel using Claude November 24, 2026 */},
 inside(v,a,b){return v>a+1e-6&&v<b-1e-6;/* Code by Daniel using Claude November 24, 2026 */},
 range(){const w=$('#culture-work')?.clientWidth||innerWidth;return w<560?[46,56]:[44,58];/* Code by Daniel using Claude November 24, 2026 */},
 pct(v){const [a,b]=this.range();return (v-a)/(b-a)*100;/* Code by Daniel using Claude November 24, 2026 */},
 solved(w){return w.caught;/* Code by Daniel using Claude November 24, 2026 */},
 opening(w){return w.caught?this.words.M3:w.fixed?this.words.M2:this.words.M1;/* Code by Daniel using Claude November 24, 2026 */},
 status(w){return w.caught?'Next: tell a visitor what you found.':w.fixed?'Next: place the hearing where Paul and Gallio meet.':'Next: slide Gallio’s year over the pin.';/* Code by Daniel using Claude November 24, 2026 */},
 tools(w){return '<button type="button" class="wg-tool wg-peg-tool'+(w.peg!=null?' used':'')+'" data-wg="peg" aria-label="Peg: the hearing, Paul before Gallio (Acts 18:12)"'+(w.fixed&&!w.caught?'':' disabled')+'>' + (WG.paint('delphi-peg','wg-tool-raster peg')||'<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3v22M12 25h8l-4 5z"/><circle cx="16" cy="4" r="2"/></svg>') + '<span>Peg</span></button>'+
  WG.loupeTool('letter');/* Code by Daniel using Claude November 24, 2026 */},
 describe(w,which){
  if(which==='bracket')return 'Gallio’s year: '+season(w.bracket)+' to '+season(w.bracket+1)+'. '+(this.inside(this.pin,w.bracket,w.bracket+1)?'The date pin is inside it.':'The date pin is outside it.')+(w.fixed?' Fixed.':'');
  if(which==='bar')return 'Paul’s stay: a year and a half'+(w.caught?', from '+season(w.bar)+' to '+season(w.bar+this.stay):'')+'. '+(w.fixed?((w.bar+this.stay>this.gallio&&w.bar<this.gallio+1)?'It overlaps Gallio’s year.':'It does not overlap Gallio’s year.'):'');
  return '';
  /* Code by Daniel using Claude November 24, 2026 */
 },
 board(site,w,frozen=false){
  const [a,b]=this.range(),P=v=>this.pct(v)+'%',ticks=[];for(let y=a;y<=b;y++)ticks.push('<span class="wg-tick'+(y%2===0?' major':'')+'" style="left:'+P(y)+'">'+(y%2===0?'<i>'+y+'</i>':'')+'</span>');
  const sel=WG.live?.sel,peg=w.peg,inBracket=peg!=null&&this.inside(peg,this.gallio,this.gallio+1),inBar=peg!=null&&this.inside(peg,w.bar,w.bar+this.stay);
  const stops=w.caught?'<span class="wg-stop" style="left:'+P(peg-this.stay+.25)+'"></span><span class="wg-stop" style="left:'+P(peg-.25+this.stay)+'"></span>':'';
  return '<div class="wg-delphi-layout"><figure class="wg-card" id="wg-card">'+WG.paint('delphi-card','wg-card-stone')+WG.tag('copy','Teaching copy')+
   '<p>Tiberius Claudius … <mark data-phrase="victor">26th acclamation</mark> … <mark data-phrase="gallio">Gallio, my fr[iend] and [procon]sul</mark> …</p><small>English teaching gloss. Brackets flag gaps in the surviving wording.</small></figure>'+
   '<div class="wg-rail-wrap" id="wg-rail" aria-label="Timeline, AD '+a+' to '+b+'">'+
    '<div class="wg-lane stone"><span class="wg-lane-label">Stone</span>'+
     '<button type="button" class="wg-piece wg-bracket-piece'+(w.fixed?' fixed':'')+(sel==='bracket'?' selected':'')+'" data-wg="piece" data-piece="bracket" role="slider" aria-valuemin="40" aria-valuemax="60" aria-valuenow="'+w.bracket+'" aria-valuetext="'+escapeHTML(this.describe(w,'bracket'))+'" style="left:'+P(w.bracket)+';width:calc('+P(a+1)+')"'+(frozen||w.fixed?' tabindex="-1"':'')+'>'+WG.paint('delphi-bracket')+'<span class="wg-piece-tag">Gallio’s one year</span>'+(w.fixed?'<span class="wg-foot l">summer '+Math.floor(w.bracket)+'</span><span class="wg-foot r">summer '+Math.floor(w.bracket+1)+'</span>'+WG.pin():'')+'</button></div>'+
    '<div class="wg-band-claudius" style="left:'+P(Math.max(a,41))+';right:calc(100% - '+P(Math.min(b,54))+')"><span>Claudius'+(a>41?' (from AD 41 ←)':'')+'</span></div>'+
    '<span class="wg-datepin" style="left:'+P(this.pin)+'" aria-label="Date pin: early AD 52, fixed">'+WG.paint('delphi-pin')+'<span class="wg-leaf">'+WG.paint('delphi-leaf')+'<b>26</b></span><span class="wg-note">'+escapeHTML(this.words.N0)+'</span></span>'+
    '<div class="wg-rail">'+WG.paint('delphi-rail')+ticks.join('')+'</div>'+
    '<div class="wg-lane acts"><span class="wg-lane-label">Acts</span>'+stops+
     '<button type="button" class="wg-piece wg-bar-piece'+(w.caught?' inked':'')+(sel==='bar'?' selected':'')+'" data-wg="piece" data-piece="bar" role="slider" aria-valuemin="40" aria-valuemax="60" aria-valuenow="'+w.bar+'" aria-valuetext="'+escapeHTML(this.describe(w,'bar'))+'" style="left:'+P(w.bar)+';width:calc('+P(a+this.stay)+')"'+(frozen?' tabindex="-1"':'')+'>'+WG.paint('delphi-bar')+'<span class="wg-piece-tag">Paul in Corinth: a year and a half (Acts 18:11)</span>'+(w.caught?'<span class="wg-foot l">'+season(w.bar)+'</span><span class="wg-foot r">'+season(w.bar+this.stay)+'</span>':'')+'</button></div>'+
    (peg!=null?'<span class="wg-peg'+(w.caught?' caught':inBracket?' hangs':inBar?' rides':'')+'" style="left:'+P(peg)+'" aria-label="The hearing peg at '+season(peg)+'">'+WG.paint('delphi-peg')+'</span>':'')+
    (sel==='peg'&&WG.live?.pegAt!=null?'<span class="wg-peg ghost" style="left:'+P(WG.live.pegAt)+'" aria-hidden="true"></span>':'')+
   '</div>'+(frozen?'':'<div class="wg-nudges" aria-label="Move the chosen piece"><button type="button" data-wg="nudge" data-d="-1" aria-label="Move left one notch">◀</button><span>'+(sel==='peg'?'Peg':sel==='bracket'?'Gallio’s year':sel==='bar'?'Paul’s stay':'Choose a piece')+'</span><button type="button" data-wg="nudge" data-d="1" aria-label="Move right one notch">▶</button>'+(sel==='peg'?'<button type="button" class="button secondary small" data-wg="drop-peg">Drop the peg</button>':'')+'</div>')+
   (frozen?'':'<p class="wg-note-strip">'+(w.fixed?'<span class="wg-note">'+escapeHTML(this.words.N1)+'</span>':'')+(w.caught?'<span class="wg-note">'+escapeHTML(this.words.N2)+'</span>':'')+'</p>')+'</div>';
  /* Code by Daniel using Claude November 24, 2026 */
 },
 mounted(site,w){
  const rail=$('#wg-rail');let drag=null;
  rail.addEventListener('pointerdown',function grab(e){
   const piece=e.target.closest('[data-piece]');if(!piece||e.button>0)return;const which=piece.dataset.piece,st=WG.st(site);if(which==='bracket'&&st.fixed)return;
   const r=rail.getBoundingClientRect(),[a,b]=WG.games.delphi.range(),v=a+(e.clientX-r.left)/r.width*(b-a);drag={which,off:v-st[which],moved:false};piece.setPointerCapture?.(e.pointerId);WG.live.sel=which;
   /* Code by Daniel using Claude November 24, 2026 */
  });
  rail.addEventListener('pointermove',function slide(e){
   if(!drag)return;const r=rail.getBoundingClientRect(),[a,b]=WG.games.delphi.range(),v=a+(e.clientX-r.left)/r.width*(b-a)-drag.off;drag.moved=true;WG.games.delphi.set(drag.which,v,false);
   /* Code by Daniel using Claude November 24, 2026 */
  });
  rail.addEventListener('pointerup',function release(){if(!drag)return;const d=drag;drag=null;if(d.moved){WG.suppress();WG.games.delphi.settle(d.which,true);}/* Code by Daniel using Claude November 24, 2026 */});
  // The peg: drag it from the tray onto the rail, or choose it and move it with ◀ ▶, then drop.
  const tool=$('[data-wg="peg"]');let carry=null;
  tool?.addEventListener('pointerdown',function liftPeg(e){if(tool.disabled||e.button>0)return;carry={x:e.clientX,y:e.clientY,ghost:null};tool.setPointerCapture?.(e.pointerId);/* Code by Daniel using Claude November 24, 2026 */});
  tool?.addEventListener('pointermove',function carryPeg(e){if(!carry)return;if(!carry.ghost&&Math.hypot(e.clientX-carry.x,e.clientY-carry.y)<8)return;if(!carry.ghost){carry.ghost=document.createElement('span');carry.ghost.className='wg-peg wg-carried';document.body.appendChild(carry.ghost);}carry.ghost.style.left=e.clientX+'px';carry.ghost.style.top=e.clientY+'px';/* Code by Daniel using Claude November 24, 2026 */});
  tool?.addEventListener('pointerup',function dropPeg(e){if(!carry)return;const c=carry;carry=null;if(!c.ghost)return;c.ghost.remove();WG.suppress();const r=rail.getBoundingClientRect();if(e.clientY<r.top-30||e.clientY>r.bottom+30)return;const [a,b]=WG.games.delphi.range();WG.games.delphi.placePeg(a+(e.clientX-r.left)/r.width*(b-a));/* Code by Daniel using Claude November 24, 2026 */});
  for(const p of rail.querySelectorAll('[data-piece]'))p.addEventListener('keydown',function arrowNudge(e){const d={ArrowLeft:-1,ArrowRight:1}[e.key];if(!d)return;e.preventDefault();WG.live.sel=p.dataset.piece;WG.games.delphi.nudge(d);/* Code by Daniel using Claude November 24, 2026 */});
  /* Code by Daniel using Claude November 24, 2026 */
 },
 // Move a piece to a value (snapped). Live: reposition without redrawing; settle judges the move.
 set(which,v,settle=true){
  const w=WG.st(WG.live.site),[a,b]=this.range();
  if(which==='bracket'){if(w.fixed)return;w.bracket=Math.max(Math.ceil(a-.5)+.5,Math.min(b-1.5,Math.round(v-.5)+.5));}
  if(which==='bar'){let nv=Math.max(a,Math.min(b-this.stay,Math.round(v*4)/4));
   if(w.caught)nv=Math.max(w.peg-this.stay+.25,Math.min(w.peg-.25,nv));
   const riding=w.peg!=null&&!w.caught&&this.inside(w.peg,w.bar,w.bar+this.stay)&&!this.inside(w.peg,this.gallio,this.gallio+1);if(riding)w.peg=Math.round((w.peg+nv-w.bar)*4)/4;w.bar=nv;}
  const el=$('#wg-rail [data-piece="'+which+'"]');if(el){el.style.left=this.pct(w[which])+'%';el.setAttribute('aria-valuenow',w[which]);el.setAttribute('aria-valuetext',this.describe(w,which));}
  const pegEl=$('#wg-rail .wg-peg:not(.ghost)');if(pegEl&&w.peg!=null)pegEl.style.left=this.pct(w.peg)+'%';
  if(settle)this.settle(which,false);
  /* Code by Daniel using Claude November 24, 2026 */
 },
 nudge(d){
  const l=WG.live,w=WG.st(l.site);WG.moved();
  if(l.sel==='peg'){const [a,b]=this.range();l.pegAt=Math.max(a,Math.min(b,(l.pegAt??this.gallio+.5)+d*.25));BD_CULTURE.draw(l.site,'[data-wg="nudge"][data-d="'+d+'"]');return;}
  if(l.sel==='bracket'&&!w.fixed){this.set('bracket',w.bracket+d);}else if(l.sel==='bar')this.set('bar',w.bar+d*.25);
  /* Code by Daniel using Claude November 24, 2026 */
 },
 // Judge a settled move. Pointer releases get Miriam's coaching; key presses only show the picture.
 settle(which,released){
  const site=WG.live.site,w=WG.st(site),x=this.words;WG.moved();
  if(which==='bracket'&&!w.fixed){
   if(w.bracket===this.gallio){w.fixed=true;persist();WG.sound('tock');chime?.();WG.newStep();WG.live.sel=null;BD_CULTURE.draw(site,'[data-piece="bar"]');WG.say(x.M2);WG.echo('Gallio’s year drops round the date pin: summer 51 to summer 52.');return;}
   persist();if(released){WG.wrong();WG.echo('The date pin is outside Gallio’s year.');WG.later(()=>WG.say(x.C1),900);}return;
  }
  if(which==='bar'){persist();if(w.fixed&&!w.caught&&w.peg!=null)this.judgePeg(released);else if(w.caught){const el=$('#wg-rail .wg-bar-piece');el?.querySelector('.wg-foot.l')&&(el.querySelector('.wg-foot.l').textContent=season(w.bar));el?.querySelector('.wg-foot.r')&&(el.querySelector('.wg-foot.r').textContent=season(w.bar+this.stay));}}
  /* Code by Daniel using Claude November 24, 2026 */
 },
 placePeg(v){
  const site=WG.live.site,w=WG.st(site),x=this.words,p=Math.round(v*4)/4,end=w.bar+this.stay;WG.moved();WG.live.sel=null;WG.live.pegAt=null;
  const seam=(Math.abs(end-this.gallio)<1e-6&&Math.abs(p-this.gallio)<1e-6)||(Math.abs(w.bar-(this.gallio+1))<1e-6&&Math.abs(p-w.bar)<1e-6);
  if(seam){BD_CULTURE.draw(site);const r=$('#wg-rail');if(r){r.style.setProperty('--seam',this.pct(Math.abs(end-this.gallio)<1e-6?this.gallio:this.gallio+1)+'%');r.classList.add('seam');WG.later(()=>r.classList.remove('seam'),1600);}WG.echo('The peg will not enter. A hairline of light shows between the two strips.');WG.later(()=>WG.say(x.C5),900);return;}
  const inB=this.inside(p,this.gallio,this.gallio+1),inBar=this.inside(p,w.bar,end);
  if(!inB&&!inBar){BD_CULTURE.draw(site);WG.echo('The peg falls over and returns to the tray.');WG.wrong();WG.later(()=>WG.say(x.C4),900);return;}
  w.peg=p;persist();this.judgePeg(true);
  /* Code by Daniel using Claude November 24, 2026 */
 },
 judgePeg(fresh){
  const site=WG.live.site,w=WG.st(site),x=this.words,inB=this.inside(w.peg,this.gallio,this.gallio+1),inBar=this.inside(w.peg,w.bar,w.bar+this.stay);
  clearTimeout(WG.live.nearTimer);
  if(inB&&inBar){w.caught=true;persist();WG.sound('clunk');chime?.();WG.newStep();BD_CULTURE.draw(site,'[data-wg="tell"]');WG.say(x.M3);WG.echo('The peg drops through both strips. Paul’s stay now shows years: '+season(w.bar)+' to '+season(w.bar+this.stay)+'.');return;}
  BD_CULTURE.draw(site,fresh?'[data-piece="bar"]':null);
  WG.echo(inB?'The peg hangs through Gallio’s year into an empty Acts lane.':'The peg stands in Paul’s stay and rides with it.');
  WG.live.nearTimer=WG.later(function nearlyLine(){if(WG.live?.site===site&&!WG.st(site).caught)WG.say(inB?x.C2:x.C3);},8000);
  /* Code by Daniel using Claude November 24, 2026 */
 },
 hint(site,rung){
  const w=WG.st(site),x=this.words;
  if(rung===1){WG.light(!w.fixed?[$('#wg-card mark[data-phrase="gallio"]'),$('.wg-datepin')]:[$('.wg-bracket-piece'),$('.wg-bar-piece')]);return;}
  if(rung===2){WG.say(!w.fixed?'Gallio was in office when the letter was written.':'Paul and Gallio were in the same room. When could that be?');return;}
  if(!w.fixed){const half=Math.round((w.bracket+(this.gallio-w.bracket)/2)-.5)+.5;this.set('bracket',half===w.bracket?this.gallio:half,false);WG.say('I’ve slid it partway. You finish.');return;}
  this.set('bar',this.gallio-.5,false);persist();WG.say('Now the strips overlap. You place the peg.');
  /* Code by Daniel using Claude November 24, 2026 */
 },
 autoplay(){const site=WG.live.site,w=WG.st(site);if(!w.fixed){w.bracket=this.gallio;this.settle('bracket',true);}if(!WG.st(site).caught){this.set('bar',this.gallio-.5,false);this.placePeg(this.gallio+.5);}/* Code by Daniel using Claude November 24, 2026 */}
};

// Replays use their own field record. They never change a find or its qualification count.
const probePoints={
 nw:[12,10],ne:[88,10],sw:[12,90],se:[88,90],west:[12,50],east:[88,50],
 upper:[33,30],upperE:[68,31],lower:[33,70],lowerE:[68,69]
};
const stoneProbes=['nw','ne','sw','se','west','east'];
const stringKey=(a,b)=>[a,b].sort().join('-');
const wallLines=[['nw','ne'],['sw','se'],['nw','sw'],['ne','se'],['west','east']].map(([a,b])=>stringKey(a,b));
const lineEndings=[
 {position:14.9,label:'Throw stick beside three hills'},
 {position:35.5,label:'Seated man and woman above three short strokes',people:true},
 {position:61.6,label:'Throw stick beside three hills'},
 {position:72.4,label:'Throw stick beside three hills'},
 {position:88.2,label:'Throw stick beside three hills'}
];
const replayYears=[26,49,50,51,52,53,54];
const secondLook={
 thebes:{
  title:'Read along the stone',
  prompt:'One name on this line is a people. Mark where it ends.',
  question:'What can this ending tell you about when Israel arrived in Canaan?',
  answers:['Egypt knew of Israel by this date. The arrival date is still open.','Israel first arrived the year this stone was carved.','It gives the year of the Exodus.'],
  coach:'A first mention gives us a date by which the scribe knew the name.',
  line:'The sign names a people. It gives no arrival date.'
 },
 bethesda:{
  title:'Under the sand',
  prompt:'Six probes. Find the four sides and the wall between them.',
  question:'What would you need to find out when each wall was built?',
  answers:['Dated evidence from its construction layers.','The number of roofs that can fit.','The direction of the central wall.'],
  coach:'The plan gives you the shape. Dated finds from the layers can tell you when.',
  line:'The plan fits John. Dating each wall takes other evidence.'
 },
 delphi:{
  title:'Two anchors in time',
  prompt:'Find the year of the 26th acclamation. Set the date pin.',
  question:'Can the two dates tell you what was said at the hearing?',
  answers:['Acts gives the words. The dates help place the hearing in time.','The date of the hearing reveals what each person said.','The Roman order tells us what Paul said.'],
  coach:'Dates place events in time. Luke’s account tells you about the hearing itself.',
  line:'Two anchors place Paul’s arrival around AD 50 in this reconstruction.'
 }
};
WG.second={
 clean(raw={}){
  const pins=Array.isArray(raw.pins)?[...new Set(raw.pins.filter(k=>Object.hasOwn(probePoints,k)))].slice(0,6):[];
  const lines=Array.isArray(raw.lines)?[...new Set(raw.lines.filter(k=>wallLines.includes(k)&&k.split('-').every(point=>pins.includes(point))))]:[];
  return {active:raw.active===true,solved:raw.solved===true,complete:raw.complete===true,
   pins,lines,brushes:Number.isInteger(raw.brushes)?Math.max(0,Math.min(3,raw.brushes)):0,
   date:replayYears.includes(raw.date)?raw.date:null,
   start:Number.isFinite(raw.start)?Math.max(49,Math.min(52,Math.round(raw.start*4)/4)):49};
 },
 state(site){
  const c=BD_CULTURE.progress(site);
  return c.wgSecond||=(this.clean());
 },
 start(site,reset=false){
  if(!game.save.finds[site.id])return;
  const c=BD_CULTURE.progress(site);
  if(reset)c.wgSecond=this.clean();
  this.state(site).active=true;
  persist();WG.draw(site,'[data-wg="second-hint"]');
 },
 draw(site,focus){
  const s=this.state(site),copy=secondLook[site.id],work=$('#culture-work');
  const sameMode=WG.live?.site===site&&WG.live.mode==='second';
  const feedback=sameMode?WG.live.secondFeedback:'', selected=sameMode?WG.live.stringFrom:null;
  const lineScroll=$('.wg-second-line-view')?.scrollLeft;
  const hint=sameMode?WG.live.secondHint:0;
  WG.live={site,mode:'second',token:sameMode?WG.live.token:Symbol(),secondFeedback:feedback,stringFrom:selected,secondHint:hint,abort:new AbortController()};
  $('.culture-page header')?.classList.add('wg-tucked');
  const choices=copy.answers.map((choice,i)=>'<button type="button" class="wg-option" data-wg="second-answer" data-i="'+i+'">'+escapeHTML(choice)+'</button>');
  const question=s.solved&&!s.complete?'<p>'+escapeHTML(copy.question)+'</p><div class="wg-options">'+[choices[1],choices[0],choices[2]].join('')+'</div>':'';
  const body=s.complete?'<figure class="wg-second-caption"><figcaption><strong>'+escapeHTML(copy.title)+'</strong><p>'+escapeHTML(copy.line)+'</p></figcaption></figure>':
   '<p id="wg-say">'+escapeHTML(this.instruction(site,s))+'</p>'+
   '<div id="wg-board" class="wg-board">'+this.board(site,s)+'</div>'+question;
  work.innerHTML='<section class="wg wg-second"><h3>Second look · '+escapeHTML(copy.title)+'</h3>'+body+
   '<p id="wg-status" class="wg-status" aria-live="polite">'+escapeHTML(feedback||'')+'</p>'+
   '<div class="wg-tray">'+(!s.solved&&!s.complete?'<button type="button" class="wg-tool" data-wg="second-hint">Lantern</button>':'')+
    (s.complete?'<button type="button" class="wg-tool" data-wg="second-again">Try again</button>':'')+
    '<button type="button" class="wg-tool" data-wg="second-back">Back to the workshop</button></div></section>';
  if(site.id==='thebes'){
   const view=$('.wg-second-line-view');if(view)view.scrollLeft=sameMode&&lineScroll!=null?lineScroll:view.scrollWidth;
  }
  if(site.id==='bethesda'&&s.lines.length===wallLines.length&&!s.solved){
   const tray=$('.wg-second-tray');let origin=null;
   tray.addEventListener('pointerdown',e=>{if(e.target.closest('button')||e.button>0)return;origin=[e.clientX,e.clientY];tray.setPointerCapture(e.pointerId);});
   tray.addEventListener('pointercancel',()=>{origin=null;});
   tray.addEventListener('pointerup',e=>{if(origin&&Math.hypot(e.clientX-origin[0],e.clientY-origin[1])>24)this.act(site,'second-brush');origin=null;});
  }
  if(site.id==='delphi'){
   const range=$('#wg-second-stay');
   range?.addEventListener('input',()=>{
    s.start=Number(range.value);const bar=$('.wg-second-stay-bar');
    if(bar)bar.style.left=this.yearPosition(s.start)+'%';
    const cord=$('.wg-second-cord');if(cord)cord.style.width=this.yearPosition(s.start)+'%';
    $('#wg-second-start').textContent='AD '+s.start;
    persist();
   });
  }
  if(focus)work.querySelector(focus)?.focus({preventScroll:true});
 },
 instruction(site,s){
  if(s.solved)return 'Tell a visitor what the evidence allows you to say.';
  if(site.id==='bethesda'){
   if(s.pins.filter(pin=>stoneProbes.includes(pin)).length<6)return secondLook.bethesda.prompt;
   return s.lines.length<wallLines.length?'Stretch string between the pinheads to draw the walls.':'Brush the sand away and compare your plan.';
  }
  return site.id==='delphi'&&s.date===52?'Slide Paul’s stay between the order in Rome and Gallio’s year.':secondLook[site.id].prompt;
 },
 yearPosition(year){return (year-49)/5*100;},
 board(site,s){
  if(site.id==='thebes'){
   return WG.tag('copy','Line 27 · published handcopy')+'<div class="wg-second-line-view" tabindex="0" aria-label="Scroll left or right along the inscription">'+
    '<div class="wg-second-line">'+WG.paint('thebes-line')+lineEndings.map(({position,label,people},i)=>
     '<button type="button" class="wg-line-mark'+(s.solved&&people?' is-marked':'')+'" data-wg="second-pick" data-i="'+i+'" style="--at:'+position+'%" aria-label="'+escapeHTML(label)+'"'+(s.solved?' disabled':'')+'></button>'
    ).join('')+'</div></div><small>← Read from right to left. From Spiegelberg’s handcopy, 1897.</small>';
  }
  if(site.id==='bethesda'){
   const connecting=s.pins.filter(pin=>stoneProbes.includes(pin)).length===6,lines=s.lines.map(key=>{
    const [a,b]=key.split('-').map(k=>probePoints[k]),dx=b[0]-a[0],dy=(b[1]-a[1])*1.4;
    return '<i class="wg-string" style="left:'+a[0]+'%;top:'+a[1]+'%;width:'+Math.hypot(dx,dy)+'%;transform:rotate('+Math.atan2(dy,dx)+'rad)"></i>';
   }).join('');
   const pins=Object.entries(probePoints).map(([key,[x,y]])=>{
    const placed=s.pins.includes(key),hit=placed&&stoneProbes.includes(key),sel=WG.live.stringFrom===key;
    const location=({nw:'Northwest',ne:'Northeast',sw:'Southwest',se:'Southeast',west:'West middle',east:'East middle',upper:'Upper left',upperE:'Upper right',lower:'Lower left',lowerE:'Lower right'})[key];
    return '<button type="button" class="wg-probe'+(placed?(hit?' stone':' fill'):'')+(sel?' selected':'')+'" data-wg="second-probe" data-k="'+key+'" style="left:'+x+'%;top:'+y+'%" aria-label="'+
     location+(placed?(hit?': stone hit':': loose fill'):'')+'"'+(s.solved?' disabled':'')+'></button>';
   }).join('');
   return WG.tag('invented','Training model · not to scale')+'<div class="wg-second-tray" role="group" aria-label="Probe the sand tray">'+
    WG.paint('bethesda-dug','wg-second-bottom')+'<div class="wg-second-fill" style="--bare:'+(s.brushes/3)+'">'+WG.paint('bethesda-sand-cover')+'</div>'+
    '<span class="wg-second-corner" aria-hidden="true"></span>'+lines+pins+'</div>'+
    (!connecting&&!s.solved?'<p>'+s.pins.length+' / 6 probes set · Tap a pin again to lift it.</p>':'')+
    (connecting&&s.lines.length===wallLines.length&&!s.solved?'<button type="button" class="wg-tool" data-wg="second-brush">Brush the sand</button>':'');
  }
  const dated=s.date===52;
  const dateCard='<figure class="wg-card">'+WG.paint('delphi-card')+WG.tag('copy','Letter of Claudius · teaching copy')+
   '<p>… acclaimed for the <strong>26th</strong> time … Gallio, my fr[iend] and [procon]sul …</p>'+
   '<details><summary>Compare the dated records</summary><p>Claudius reigned AD 41–54. His 26th acclamation was in AD 52.</p></details></figure>';
  if(!dated)return dateCard+'<div class="wg-second-date-wells" aria-label="Place the date pin">'+replayYears.map(year=>
   '<button type="button" class="wg-tool" data-wg="second-date" data-i="'+year+'" aria-pressed="'+(year===s.date)+'">'+(year===s.date?WG.paint('delphi-pin'):'')+'AD '+year+'</button>'
  ).join('')+'</div>';
  return dateCard+'<p class="wg-copy-note"><strong>Rome · about AD 49.</strong> Suetonius records the order; Orosius gives the later dating. Acts 18:2 says Aquila and Priscilla had recently left Italy.</p>'+
   '<div class="wg-second-rail" aria-label="Timeline from AD 49 to 54">'+WG.paint('delphi-rail')+
   '<span class="wg-anchor wg-anchor-rome">Rome · c. 49</span><span class="wg-anchor wg-anchor-gallio" style="left:60%">Delphi · AD 52</span>'+
   '<span class="wg-second-gallio" style="left:50%;width:20%">Gallio'+WG.paint('delphi-bracket')+'</span>'+
   '<span class="wg-second-cord" style="width:'+this.yearPosition(s.start)+'%" aria-hidden="true"></span>'+
   '<span class="wg-second-stay-bar" style="left:'+this.yearPosition(s.start)+'%;width:30%">'+WG.paint('delphi-bar')+'Paul</span></div>'+
   (s.solved?'':'<label class="wg-range-label" for="wg-second-stay">Slide Paul’s arrival · <output id="wg-second-start">AD '+s.start+'</output></label>'+
    '<input type="range" id="wg-second-stay" min="49" max="52" step=".25" value="'+s.start+'">'+
    '<button type="button" class="wg-tool" data-wg="second-test">Check the overlap</button>');
 },
 act(site,action,key,index,button){
  const s=this.state(site),live=WG.live,goal=secondLook[site.id];
  const report=(line,focus=null,redraw=true)=>{
   live.secondFeedback=line;persist();
   if(redraw)WG.draw(site,focus);
   else WG.status(line);
  };
  if(action==='second-back'){s.active=false;persist();WG.draw(site,'[data-wg="second"]');return;}
  if(action==='second-again'){this.start(site,true);return;}
  if(action==='second-answer'&&s.solved){
   if(index!==0){button.classList.add('wg-tried');report(goal.coach,null,false);return;}
   s.complete=true;chime?.();report('A new pencil line for your caption.','[data-wg="second-back"]');return;
  }
  if(s.solved||s.complete)return;
  if(action==='second-hint'){
   live.secondHint=Math.min(3,live.secondHint+1);
   const lines=site.id==='thebes'?['Look at the final shapes in each outline.','Most endings have three hills.','Find two seated people with strokes beneath them.']:
    site.id==='bethesda'?['Try the corners before using all six probes.','Connect the four sides. Then look for two pins facing each other.','Try joining the two middle pins with one straight string.']:
    ['Compare the letter with the dated records.','An acclamation is a count. The register gives AD 52.','Try a start around AD 50 and see if the strips overlap.'];
   report(lines[live.secondHint-1],null,false);return;
  }
  if(action==='second-pick'){
   WG.sound('scratch');
   if(!lineEndings[index]?.people){button.classList.add('wg-tried');report('That ending has hills. Look for a different group of signs.',null,false);return;}
   s.solved=true;report('Two people, three strokes. The scribe marked Israel as a people.','[data-wg="second-answer"]');return;
  }
  if(action==='second-probe'&&Object.hasOwn(probePoints,key)){
   const focus='[data-k="'+key+'"]',hit=stoneProbes.includes(key),placed=s.pins.includes(key);
   if(s.pins.filter(pin=>stoneProbes.includes(pin)).length===6){
    if(!placed){report('Set string between two of your pins.',null,false);return;}
    const from=live.stringFrom;live.stringFrom=null;
    if(!from){live.stringFrom=key;report('Pick the other end of this wall.',focus);return;}
    const line=stringKey(from,key);
    if(!wallLines.includes(line)){report('That string crosses open fill. Try a straight wall.',focus);return;}
    if(!s.lines.includes(line))s.lines.push(line);
    WG.sound('tock');
    report(s.lines.length===wallLines.length?'Your plan is ready. Brush the sand away.':'String set.',s.lines.length===wallLines.length?'[data-wg="second-brush"]':focus);return;
   }
   if(placed)s.pins=s.pins.filter(pin=>pin!==key);
   else if(s.pins.length<6){s.pins.push(key);WG.sound(hit?'tock':'scratch');}
   else{report('Lift a probe from loose fill to use it again.',focus);return;}
   report(placed?'Probe lifted.':hit?'Tock. Stone just below.':'The probe sinks into loose fill.',focus);return;
  }
  if(action==='second-brush'&&s.lines.length===wallLines.length){
   WG.sound('scratch');s.brushes++;
   s.solved=s.brushes>=3;
   report(s.solved?'Your strings cross the newly uncovered center wall.':'More limestone shows through.',s.solved?'[data-wg="second-answer"]':'[data-wg="second-brush"]');return;
  }
  if(action==='second-date'&&replayYears.includes(index)){
   s.date=index;WG.sound('tock');
   report(index===52?'Pin set. Now add the Roman order.':index===26?'AD 26 lies outside Claudius’s reign. Look for the date of the acclamation.':'The register places this acclamation in a different year.',index===52?'#wg-second-stay':'[data-i="'+index+'"]');return;
  }
  if(action==='second-test'&&s.date===52){
   const overlap=Math.min(s.start+1.5,52.5)-Math.max(s.start,51.5);
   if(s.start<50){report('Paul’s stay ends before it can overlap Gallio’s year. Move it a little later.',null,false);return;}
   if(overlap<=0&&s.start===50){report('The strips just touch. Give Paul and Gallio some time together.',null,false);return;}
   if(s.start>50.75||overlap<=0){report('Move the start nearer to Aquila and Priscilla’s recent arrival.',null,false);return;}
   s.solved=true;WG.sound('clunk');report('Both sources now give your timeline a place to rest.','[data-wg="second-answer"]');
  }
 }
};

// ───────────────────────── Shared controls and install ─────────────────────────
function click(event){
 const b=event.target.closest('[data-wg]');if(!b||!WG.live||!b.closest('.culture-page'))return;
 if(Date.now()<suppressUntil&&['roof','place','piece','peg','sign'].includes(b.dataset.wg))return;
 const l=WG.live,site=l.site,g=l.game,act=b.dataset.wg;
 if(act==='second'){WG.second.start(site);return;}
 if(act.startsWith('second-')){WG.second.act(site,act,b.dataset.k,Number(b.dataset.i),b);return;}
 if(act==='hint')WG.hint();
 else if(act==='tell'){WG.st(site).asking=true;persist();BD_CULTURE.draw(site);}
 else if(act==='answer'){if(b.getAttribute('aria-disabled')!=='true')WG.answer(Number(b.dataset.i),b);}
 else if(act==='loupe')l.toggleLoupe?.(!l.loupe);
 else if(act==='sign')g.mark([b]);
 else if(act==='roof')g.hold(Number(b.dataset.roof));
 else if(act==='place')g.place(b.dataset.place);
 else if(act==='brush'){l.brush=!l.brush;b.setAttribute('aria-pressed',String(l.brush));WG.echo(l.brush?'Brush ready. Choose a sand area.':'Brush put down.');}
 else if(act==='verse'){const v=$('.wg-rack .wg-verse');if(v)v.hidden=!v.hidden;}
 else if(act==='piece'){l.sel=b.dataset.piece;$('.wg-nudges span')&&($('.wg-nudges span').textContent=l.sel==='bracket'?'Gallio’s year':'Paul’s stay');for(const p of document.querySelectorAll('#wg-rail .wg-piece'))p.classList.toggle('selected',p===b);}
 else if(act==='peg'){l.sel='peg';l.pegAt=l.pegAt??g.gallio+.5;BD_CULTURE.draw(site,'[data-wg="drop-peg"]');}
 else if(act==='nudge')g.nudge(Number(b.dataset.d));
 else if(act==='drop-peg'&&l.pegAt!=null)g.placePeg(l.pegAt);
 /* Code by Daniel using Claude November 24, 2026 */
}
function keys(event){
 if(!WG.live||!$('#wg-board')||event.target.closest('input,textarea,select'))return;const k=event.key.toLowerCase();
 if(k==='h'){event.preventDefault();if(WG.live.mode==='second')$('[data-wg="second-hint"]')?.click();else WG.hint();}
 else if(k==='l'){const b=$('[data-wg="loupe"]');if(b){event.preventDefault();b.click();}}
 else if(k==='escape'&&WG.live.held!=null){event.preventDefault();event.stopPropagation();WG.live.game.hold?.(WG.live.held);}
 /* Code by Daniel using Claude November 24, 2026 */
}
WG.install=function installWorkshopGames(){
 const style=document.createElement('style');style.textContent=WG.css;document.head.appendChild(style);
 for(const [id,g] of Object.entries(WG.games)){const b=BD_CULTURE_BOARDS[id];if(!b)continue;b.opening=g.words.W;if(id==='bethesda')b.title='Room for a fifth colonnade';if(id==='delphi')b.title='Set the Corinth clock';if(id==='thebes')b.title='The last sign';}
 const draw=BD_CULTURE.draw;BD_CULTURE.draw=function drawWorkshop(site,focus){if(WG.games[site.id])return WG.draw(site,focus);return draw.call(BD_CULTURE,site,focus);/* Code by Daniel using Claude November 24, 2026 */};
 const open=BD_CULTURE.open;
 BD_CULTURE.open=function openScopedWorkshop(site){
  open.call(BD_CULTURE,site);
  if(!WG.games[site.id])return;
  const cleanup=game.dialogCleanup;
  game.dialogCleanup=()=>{
   if(WG.live?.site===site){
    clearInterval(WG.live.timer);
    WG.live.abort?.abort();
    WG.live=null;
   }
   for(const ghost of document.querySelectorAll('.wg-carried'))ghost.remove();
   cleanup?.();
  };
 };
 const clean=BD_CULTURE.clean;BD_CULTURE.clean=function keepWorkshopGame(site,raw){const out=clean.call(BD_CULTURE,site,raw);if(WG.games[site.id]){
  if(raw?.wg)out.wg=WG.games[site.id].clean(raw.wg);
  if(raw?.wgSecond)out.wgSecond=WG.second.clean(raw.wgSecond);
 }return out;/* Code by Daniel using Claude November 24, 2026 */};
 document.addEventListener('click',click);document.addEventListener('keydown',keys,true);
 document.addEventListener('click',function reopenWhyCard(e){const h=e.target.closest('.culture-page header.wg-why');if(h)h.classList.toggle('wg-tucked');/* Code by Daniel using Claude November 24, 2026 */});
 /* Code by Daniel using Claude November 24, 2026 */
};
WG.css=`
.culture-page header.wg-why{cursor:pointer}.culture-page header.wg-why p{font-size:.95em;background:#fbf4e1;border:1px solid #d9c9a0;padding:6px 10px;box-shadow:1px 2px 0 #0000001a;max-width:44ch}
.culture-page header.wg-why.wg-tucked p{display:none}
.wg{position:relative}.wg-miriam{display:flex;align-items:center;gap:10px;margin:4px 0 10px}.wg-miriam img{width:44px;height:44px;border-radius:50%;object-fit:cover;flex:none;border:2px solid #c9b27a}.wg-miriam p{margin:0;font-style:italic}
.wg-status{margin:10px 0 6px;font-size:.92em;color:#5b4f37}.wg-tray{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:6px}
.wg-tool{display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:6px 12px;border:1px solid #b9a679;border-radius:8px;background:#f6efdc;color:#3e3424;cursor:pointer}
.wg-tool svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.wg-tool[aria-pressed=true]{background:#e3d3a6;border-color:#8a6a3a}
.wg-tool:disabled{opacity:.45;cursor:default}.wg-lantern.glow{box-shadow:0 0 0 3px #f2c86a,0 0 18px #f2c86a;animation:wgGlow 1.6s ease-in-out infinite}.wg-lantern .flame{fill:#f2c86a;stroke:none}
@keyframes wgGlow{50%{box-shadow:0 0 0 3px #f2c86a88,0 0 6px #f2c86a55}}
.wg-tag{display:inline-block;font-size:11px;line-height:1.3;padding:2px 8px;margin:0 6px 6px 0}
.wg-tag-real{background:linear-gradient(#e7cf8c,#b8933f);color:#2f230e;border:1px solid #6d5420;border-radius:3px;font-weight:600}
.wg-tag-copy{background:#fbf6e8;color:#4a3f2a;border:1px solid #b6a57a;border-radius:2px 10px 10px 2px;position:relative;padding-left:16px}.wg-tag-copy::before{content:'';position:absolute;left:5px;top:50%;width:5px;height:5px;margin-top:-3px;border-radius:50%;border:1px solid #8a7a52}
.wg-tag-invented{background:#fff;color:#4a3f2a;border:1.5px dashed #8a7a52;border-radius:4px}
.wg-note{display:inline-block;font:italic 13px/1.3 Georgia,serif;color:#5a4a2c;margin:2px 8px;transform:rotate(-1.5deg)}
.wg-pin{position:absolute;right:-5px;top:-7px;width:12px;height:12px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff2c2,#c69b3c 55%,#6e5320);box-shadow:0 1px 2px #0006}
.wg-loop{position:absolute;border:2.5px solid #2b2623;border-radius:45%;pointer-events:none;z-index:3}.wg-loop.nearly{border-style:dashed}.wg-loop.empty{border-style:dotted;border-color:#2b262399}
.wg-loop.tracing{border:1.5px solid #4f7fa0;border-radius:6px;background:#e9f2f899;display:flex;align-items:center;justify-content:center}.wg-loop.tracing svg{width:70%;height:70%;fill:none;stroke:#2c5a7a;stroke-width:2.2}
.wg-light{animation:wgLight 2.2s ease-in-out}@keyframes wgLight{0%,100%{box-shadow:none;filter:none}35%,65%{box-shadow:0 0 0 4px #ffe7a1,0 0 26px #ffd66b;filter:brightness(1.15)}}
.wg-board{position:relative}
.wg-loupe-lens{pointer-events:none;position:absolute;z-index:12;width:clamp(104px,20vw,166px);aspect-ratio:1;overflow:hidden;
 border:5px solid #8b632b;border-radius:50%;box-shadow:0 0 0 1px #f0d699,0 8px 14px #35271569;transform:translate(-50%,-50%);background:#f4e8cb}
.wg-loupe-lens .wg-loupe-image{position:absolute;inset:0;transform-origin:0 0;margin:0;max-width:none;box-shadow:none}
.wg-board.wg-dimmed{opacity:.45;pointer-events:none;filter:saturate(.6);max-height:220px;overflow:hidden}
.wg-options{display:grid;gap:8px;margin:12px 0}.wg-option{text-align:left;padding:12px 14px;border:1px solid #b9a679;border-radius:10px;background:#fbf6e8;color:inherit;font:inherit;cursor:pointer;min-height:44px}
.wg-option.wg-tried{opacity:.55;text-decoration:line-through dotted;cursor:default}.wg-coach{font-style:italic;min-height:1.4em}
.wg-caption{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:14px;margin:6px 0;padding:12px;background:#fbf6e8;border:1px solid #c8b483;box-shadow:2px 3px 0 #0000001a}
.wg-caption-picture{overflow:hidden;max-height:300px;pointer-events:none}.wg-caption-picture>*{transform:scale(.72);transform-origin:top left;width:139%}.wg-caption h3{margin:0 0 6px}.wg-caption-text{font-weight:600}.wg-small{font-size:12px;color:#6b5e44}.wg-term{font-style:italic}.wg-payoff{font-weight:600}.wg-dig-line{margin-bottom:4px}
@media (max-width:640px){.wg-caption{grid-template-columns:1fr}.wg-caption-picture>*{transform:scale(.62);width:161%}}
/* Thebes */
.wg-thebes-layout{display:grid;grid-template-columns:minmax(0,1fr) 150px;gap:14px;align-items:start}
.wg-sheet{position:relative;padding:28px 16px 14px;background:#efe6d0 repeating-linear-gradient(0deg,#0000 0 3px,#0000000a 3px 4px);border:1px solid #cdbd95;box-shadow:2px 3px 8px #0002;touch-action:none;user-select:none}
.wg-sheet-paper{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0}.wg-sheet>.wg-tag{position:absolute;right:8px;top:6px;z-index:2}
.wg-direction{position:absolute;left:14px;top:6px;margin:0;font:italic 12px Georgia,serif;color:#6b5e44;z-index:2}
.wg-row{position:relative;margin:4px 0 10px;z-index:1}.wg-band{position:relative;display:flex;flex-direction:row-reverse;justify-content:flex-start;align-items:center;gap:4px;min-height:64px;padding:6px 8px 18px;background:#34302c;border-radius:4px;overflow:visible}
.wg-rub{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.9;border-radius:4px}.wg-blank{flex:1;min-width:30px;align-self:stretch}
.wg-sign{position:relative;display:inline-flex;align-items:center;justify-content:center;min-width:44px;height:52px;padding:2px 4px;background:none;border:2px solid transparent;border-radius:45%;color:#e9e1cc;cursor:pointer;z-index:1}
.wg-sign svg{width:34px;height:40px;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}.wg-sign svg .thick{stroke-width:3.6}
.wg-sign:focus-visible{outline:3px solid #f2c86a;outline-offset:2px}.wg-sign.is-right{border:2.5px solid #f4ead1;color:#fff}.wg-sign.is-nearly{border:2.5px dashed #f4ead1}
.wg-sign.is-ghost{border:2px dotted #f4ead166}.wg-sign.is-dim{opacity:.45}.wg-sign.wg-glint{animation:wgGlint 1.1s}@keyframes wgGlint{40%{color:#fff8d8;filter:drop-shadow(0 0 6px #ffe7a1)}}
.wg-sign.wg-shimmer{animation:wgShimmer .7s}@keyframes wgShimmer{50%{opacity:.6}}
.wg-name{display:inline-block;font:italic 14px Georgia,serif;margin:2px 4px;color:#3f3522}.wg-name.fourth{font-weight:600}.wg-row .wg-note{font-size:12px}
.wg-bracket{position:absolute;bottom:3px;height:8px;border:1.5px solid #e8dfc5;border-top:0;border-radius:0 0 6px 6px;pointer-events:none}.wg-bracket i{position:absolute;left:50%;top:6px;transform:translateX(-50%);font:italic 11px Georgia,serif;color:#e8dfc5;white-space:nowrap}
.wg-bracket.kind{border-color:#f4ead1}.wg-bracket.wg-pulse{animation:wgPulse 1s 2}@keyframes wgPulse{50%{border-color:#ffe7a1;filter:drop-shadow(0 0 4px #ffe7a1)}}.wg-question-bracket{border-style:dashed}
.wg-row.wg-bracketed .wg-band{padding-bottom:24px}
.wg-under-flap .wg-band{visibility:hidden}.wg-flap{position:absolute;inset:-2px -4px 18px;background:repeating-linear-gradient(90deg,#f7f3e8ee 0 18px,#efe9dbee 18px 20px);border:1px solid #d5ccb5;box-shadow:0 2px 4px #0002;transition:transform .9s ease-in,opacity .9s}.wg-flap img{width:100%;height:100%;object-fit:cover}
.wg-flap::before,.wg-flap::after{content:'';position:absolute;top:-6px;width:46px;height:16px;background:#e8dcb0cc;transform:rotate(-4deg)}.wg-flap::before{left:10px}.wg-flap::after{right:10px;transform:rotate(5deg)}
.wg-flap.lifting{transform:translateY(-30px) rotate(-6deg);opacity:0}
.wg-lasso{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:4}.wg-lasso polyline{fill:none;stroke:#2b2623;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;opacity:.8}
.wg-real{margin:0}.wg-real-stone{aspect-ratio:4/5;background:radial-gradient(ellipse at 30% 30%,#6b6a68,#2e2d2c 70%);border-radius:6px 6px 2px 2px;overflow:hidden;box-shadow:inset 0 0 0 1px #0004}.wg-real-stone img{width:100%;height:100%;object-fit:cover}
.wg-endings{display:flex;gap:10px;margin-top:6px}.wg-endings div{display:flex;flex-direction:row-reverse;background:#34302c;border-radius:4px;padding:2px 4px}.wg-endings svg{width:20px;height:24px;fill:none;stroke:#e9e1cc;stroke-width:2.4}
@media (max-width:640px){.wg-band{flex-wrap:wrap;row-gap:6px}.wg-sheet{padding:28px 8px 10px}.wg-thebes-layout{grid-template-columns:1fr}.wg-real{display:flex;align-items:center;gap:8px}.wg-real-stone{width:64px}.wg-sign{min-width:44px}}
/* Bethesda */
.wg-bethesda-layout{display:grid;grid-template-columns:minmax(0,1fr) 220px;gap:14px;align-items:start}
.wg-model{position:relative;aspect-ratio:1000/1400;margin:auto;width:min(100%,calc(58vh * 1000 / 1400));background:#8f8574;border:10px solid #6e4f31;border-radius:6px;box-shadow:inset 0 0 20px #0005;touch-action:none;overflow:hidden}
.wg-model>.wg-paint{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.wg-model>.wg-tag{position:absolute;left:6px;bottom:4px;z-index:6}
.wg-basin{position:absolute;left:14%;width:72%;background:#5f5a52;box-shadow:inset 0 0 14px #0007}.wg-basin.n{top:12%;height:34%}.wg-basin.s{top:54%;height:34%}
.wg-wall-stone{position:absolute;top:46%;left:12%;width:76%;height:8%;background:repeating-linear-gradient(90deg,#b7ad98 0 22px,#8f8571 22px 24px);clip-path:inset(0 calc((1 - var(--bare))*100%) 0 0)}
.wg-sand{position:absolute;left:14%;width:72%;background:#d8c49a radial-gradient(#0000 60%,#00000012) 0 0/7px 7px;transition:opacity 1.2s}.wg-sand.n{top:12%;height:34%}.wg-sand.s{top:54%;height:34%}.wg-sand.mid{top:46%;height:8%;clip-path:inset(0 0 0 calc(var(--bare)*100%))}
.wg-sand img{width:100%;height:100%;object-fit:cover}
.wg-stub{position:absolute;top:46.5%;width:6%;height:7%;background:repeating-linear-gradient(90deg,#b7ad98 0 10px,#8f8571 10px 12px);z-index:2}.wg-stub.w{left:8%}.wg-stub.e{right:8%}
.wg-water,.wg-figures{position:absolute;inset:0;opacity:0;transition:opacity 1.6s;pointer-events:none}.wg-water{background:linear-gradient(#0000 12%,#3f7f8a99 12%,#3f7f8a99 46%,#0000 46%,#0000 54%,#3f7f8a99 54%,#3f7f8a99 88%,#0000 88%)}
.wg-water img,.wg-figures img{width:100%;height:100%;object-fit:cover}.wg-model.revealed .wg-sand{opacity:0}.wg-model.revealed .wg-water{opacity:1}.wg-model.revealed .wg-figures{opacity:1;transition-delay:1s}
.wg-compass{position:absolute;right:8px;top:4px;font:12px Georgia,serif;color:#f3ead3;z-index:6}
.wg-place-n,.wg-place-s,.wg-place-e,.wg-place-w{background:repeating-linear-gradient(90deg,#c3b9a2 0 18px,#9d927b 18px 20px)!important}.wg-place-e,.wg-place-w{background:repeating-linear-gradient(0deg,#c3b9a2 0 18px,#9d927b 18px 20px)!important}
.wg-place{position:absolute;background:transparent;border:2px solid transparent;border-radius:4px;cursor:pointer;z-index:5}.wg-place:focus-visible{outline:3px solid #f2c86a}.holding .wg-place{border:2px dashed #f2e7c4aa}
.wg-place-n{top:3%;left:14%;width:72%;height:8%}.wg-place-s{top:89%;left:14%;width:72%;height:8%}.wg-place-w{top:12%;left:3%;width:10%;height:76%}.wg-place-e{top:12%;right:3%;width:10%;height:76%}
.wg-place-middle{top:46%;left:14%;width:72%;height:8%}.wg-place-sandN{top:12%;left:14%;width:72%;height:33%}.wg-place-sandS{top:55%;left:14%;width:72%;height:33%}
.wg-roof{position:absolute;z-index:4;background:repeating-linear-gradient(90deg,#9c4f2f 0 8px,#7d3c22 8px 10px);box-shadow:4px 6px 0 #00000040;border-radius:2px}.wg-roof img{width:100%;height:100%;object-fit:cover}
.wg-roof.on-n{top:3%;left:14%;width:72%;height:7%}.wg-roof.on-s{top:90%;left:14%;width:72%;height:7%}.wg-roof.on-middle{top:46.5%;left:14%;width:72%;height:7%}
.wg-roof.on-w{top:12%;left:3.5%;width:9%;height:76%;background:repeating-linear-gradient(0deg,#9c4f2f 0 8px,#7d3c22 8px 10px)}.wg-roof.on-e{top:12%;right:3.5%;width:9%;height:76%;background:repeating-linear-gradient(0deg,#9c4f2f 0 8px,#7d3c22 8px 10px)}
.wg-roof .wg-pin{right:2px;top:-4px}.wg-roof.on-e,.wg-roof.on-w{container-type:size}.wg-roof.on-e img,.wg-roof.on-w img{position:absolute;left:50%;top:50%;width:100cqh;height:100cqw;transform:translate(-50%,-50%) rotate(90deg)}
.wg-roof.wg-temp{opacity:.9;animation:wgBack 1.2s forwards}.wg-roof.overhang.on-n,.wg-roof.overhang.on-s,.wg-roof.overhang.on-middle{left:0;width:100%}.wg-roof.too-short.on-e,.wg-roof.too-short.on-w{height:30%;top:35%}
.wg-roof.crooked{transform:rotate(-6deg) translate(6px,-6px)}.wg-roof.sinking{transform:scale(.8) rotate(8deg);opacity:.5}.wg-roof.tilted{transform:rotate(-3deg) translateY(2px)}
.wg-roof.on-sandN{top:20%;left:30%;width:40%;height:7%}.wg-roof.on-sandS{top:66%;left:30%;width:40%;height:7%}
@keyframes wgBack{80%{opacity:.9}100%{opacity:0}}
.wg-model.cracked::after{content:'';position:absolute;top:50%;left:16%;width:68%;height:2px;background:repeating-linear-gradient(90deg,#3b2f22 0 9px,#0000 9px 12px);z-index:3}
.wg-rack{display:grid;gap:8px;align-content:start}.wg-rack-roofs{display:flex;flex-wrap:wrap;gap:8px}.wg-roofpiece{height:34px;border:1px solid #7d3c22;border-radius:3px;cursor:grab;background:repeating-linear-gradient(90deg,#9c4f2f 0 8px,#7d3c22 8px 10px);touch-action:none;padding:0}
.wg-roofpiece img{width:100%;height:100%;object-fit:cover;pointer-events:none}.wg-roofpiece.wg-roof-short{width:72px}.wg-roofpiece.wg-roof-long{width:150px}.wg-roofpiece.held{outline:3px solid #f2c86a;outline-offset:2px}
.wg-carried{position:fixed;z-index:9999;pointer-events:none;transform:translate(-50%,-50%) rotate(-3deg);opacity:.9}
.wg-verse-tag{justify-self:start;border:1px solid #b6a57a;background:#fbf6e8;border-radius:2px 10px 10px 2px;padding:2px 10px;cursor:pointer}.wg-verse{font-style:italic;margin:0}
@media (max-width:640px){.wg-bethesda-layout{grid-template-columns:1fr}.wg-model{max-height:none;width:min(100%,360px)}}
/* Delphi */
.wg-delphi-layout{display:grid;gap:10px}.wg-card{position:relative;margin:0;padding:12px 14px;background:#e4dccb;border:1px solid #b9ae95;border-radius:3px 12px 4px 10px}.wg-card .wg-paint{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;opacity:.85}
.wg-card>*{position:relative;z-index:1}.wg-card p{margin:4px 0;font-family:Georgia,serif}.wg-card mark{background:#f6e3a3;padding:0 2px}.wg-card small{color:#6b5e44}
.wg-rail-wrap{position:relative;padding:8px 0 4px;touch-action:none}.wg-lane{position:relative;height:46px;margin:18px 0 4px}.wg-lane.acts{margin-bottom:30px}.wg-lane-label{position:absolute;left:0;top:-2px;font:italic 11px Georgia,serif;color:#6b5e44}
.wg-piece{position:absolute;top:8px;height:34px;border:2px solid #7a5b2c;border-radius:6px;background:linear-gradient(#d9b56a,#a77f3a);color:#2d210d;font-size:11px;cursor:grab;padding:0 4px;overflow:visible;touch-action:none;min-width:24px}
.wg-piece .wg-paint{position:absolute;inset:0;width:100%;height:100%;object-fit:fill;pointer-events:none}.wg-piece-tag{position:absolute;left:0;bottom:calc(100% + 2px);white-space:nowrap;font:italic 11px Georgia,serif;color:#4a3f2a;pointer-events:none}.acts .wg-piece-tag{bottom:auto;top:calc(100% + 14px)}
.wg-bar-piece{background:#f3e7c6;border:2px dashed #9c8455;color:#4a3f2a}.wg-bar-piece.inked{border-style:solid;background:#efdcae}.wg-piece.selected{outline:3px solid #f2c86a;outline-offset:2px}.wg-piece:focus-visible{outline:3px solid #f2c86a}
.wg-bracket-piece:not(.fixed){transform:translateY(-6px);box-shadow:0 6px 0 #0002}.wg-bracket-piece.fixed{cursor:default}
.wg-foot{position:absolute;top:100%;font:10px Georgia,serif;color:#4a3f2a;white-space:nowrap;background:#fbf6e8cc;padding:0 2px}.wg-foot.l{right:calc(100% - 6px)}.wg-foot.r{left:calc(100% - 6px)}
.wg-band-claudius{position:absolute;top:58px;height:16px;background:#c9b9e366;border:1px solid #8d7cad;border-radius:8px;font:italic 11px Georgia,serif;color:#4b3d6b;padding-left:6px;overflow:hidden;white-space:nowrap}
.wg-datepin{position:absolute;top:6px;width:4px;height:76px;margin-left:-2px;background:linear-gradient(90deg,#8a6420,#e0b54f,#8a6420);border-radius:2px;z-index:3}.wg-datepin .wg-paint{position:absolute;left:-10px;top:0;width:24px;height:100%}
.wg-leaf img{position:absolute;inset:-4px;width:calc(100% + 8px);height:calc(100% + 8px)}.wg-leaf b{position:relative}.wg-leaf{position:absolute;top:54px;left:6px;font:bold 11px Georgia,serif;background:#7fa25f;color:#fff;border-radius:10px 2px;padding:0 4px}.wg-datepin .wg-note{position:absolute;left:30px;top:52px;white-space:nowrap;font-size:11px}
.wg-rail{position:relative;height:26px;margin-top:30px;background:linear-gradient(#c49a4a,#8e6a2c);border-radius:4px}.wg-rail .wg-paint{position:absolute;inset:0;width:100%;height:100%;object-fit:fill}
.wg-tick{position:absolute;top:0;width:1px;height:8px;background:#3d2c12}.wg-tick.major{height:14px}.wg-tick i{position:absolute;top:13px;left:-10px;font:10px Georgia,serif;color:#2d210d;font-style:normal}
.wg-stop{position:absolute;top:2px;width:3px;height:40px;background:#3d2c12aa;border-radius:2px}
.wg-peg{position:absolute;top:2px;width:8px;height:150px;margin-left:-4px;background:repeating-linear-gradient(0deg,#7b4d22 0 6px,#a8733f 6px 9px);border-radius:3px;z-index:4;pointer-events:none}.wg-peg::before{content:'';position:absolute;left:-5px;top:-8px;width:18px;height:12px;border-radius:50%;background:#6b4019}.wg-peg .wg-paint{position:absolute;inset:0;width:100%;height:100%}
.wg-peg.hangs{top:8px;height:122px;outline:2px dashed #8c5a2b99}.wg-peg.rides{top:100px;height:50px;outline:2px dashed #8c5a2b99}.wg-peg.ghost{opacity:.45;outline:2px dashed #8c5a2b}.wg-peg.wg-carried{position:fixed;height:60px}
.wg-rail-wrap.seam::after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,#0000 calc(var(--seam,57.5%) - 1px),#fffbe8 calc(var(--seam,57.5%) - 1px),#fffbe8 calc(var(--seam,57.5%) + 1px),#0000 calc(var(--seam,57.5%) + 1px))}
.wg-nudges{display:flex;align-items:center;gap:10px}.wg-nudges button[data-wg=nudge]{width:48px;height:48px;border:1px solid #b9a679;border-radius:10px;background:#f6efdc;font-size:18px;cursor:pointer}.wg-note-strip{margin:0;min-height:1.2em}
.wg-tool.used{opacity:.6}
@media (prefers-reduced-motion: reduce){.wg *,.wg-flap,.wg-sand,.wg-water,.wg-figures{transition:none!important;animation:none!important}}
/* Installed art follows the same physical targets as the game. */
.wg-painted-table{padding:clamp(8px,1.35vw,18px);border-radius:5px}
.wg-painted-table .wg-status{color:#352616;background:#fdf3d9d9;padding:5px 8px;border-radius:3px}
.wg-painted-table .wg-direction{white-space:nowrap}
.wg-painted-table .wg-miriam{background:#fbf1d9e6;border-radius:7px;padding:6px 8px}
.wg-painted-table .wg-card{overflow:hidden}
.wg-flap:has(>.wg-paint){border:none;box-shadow:none;background:none}
.wg-flap:has(>.wg-paint)::before,.wg-flap:has(>.wg-paint)::after{display:none}
.wg-flap:has(>.wg-paint) img{display:block;object-fit:fill}
.wg-model:has(>.wg-layer-dug){border:0;box-shadow:0 5px 14px #281c1852}
.wg-model:has(>.wg-layer-dug) :is(.wg-basin,.wg-wall-stone,.wg-stub){background:none;box-shadow:none}
.wg-model:has(>.wg-layer-dug) :is(.wg-place-n,.wg-place-e,.wg-place-s,.wg-place-w){background:none!important}
.wg-water:has(img){background:none}
.wg-roof:has(img),.wg-roofpiece:has(img){background:none;border:0;box-shadow:none;filter:drop-shadow(1px 3px 2px #23170d88)}
.wg-roof:has(img) img{object-fit:fill}
.wg-roofpiece:has(img){min-height:44px}
.wg-roofpiece:has(img) img{object-fit:contain}
.wg-roofpiece.wg-carried:has(img){filter:drop-shadow(1px 3px 3px #23170da0)}
.wg-tool .wg-tool-raster{width:3rem;height:1.5rem;object-fit:contain}
.wg-tool .wg-tool-raster.peg{width:1.35rem;height:1.65rem}
.wg-tool .wg-tool-raster.loupe{width:1.6rem;height:1.6rem}
.wg-charcoal-tool{display:inline-grid;place-items:center;padding:0 .3rem}
.wg-charcoal-tool img{width:3.6rem;height:1.4rem;object-fit:contain}
.wg-pin:has(>img){width:15px;height:15px;background:none;box-shadow:none}
.wg-pin img,.wg-loop.tracing img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}
.wg-loop.tracing:has(>img){background:none;border-color:transparent}
.wg-loop.tracing svg{position:relative}
.wg-datepin:has(>.wg-paint),.wg-rail:has(>.wg-paint),.wg-peg:has(>.wg-paint){background:none}
.wg-peg:has(>.wg-paint)::before{display:none}
.wg-peg:has(>.wg-paint)>.wg-paint{left:-4px;width:16px;object-fit:fill}
.wg-datepin:has(>.wg-paint) .wg-paint{pointer-events:none}
.wg-leaf:has(>.wg-paint){background:none;color:#fff9e0;text-shadow:0 1px 1px #18180c}
.wg-piece:has(>.wg-paint){background:none;border-color:transparent}
.wg-piece:has(>.wg-paint).selected{border-color:#c9962f44}
.wg-nudges{flex-wrap:wrap}
.wg-datepin .wg-note{left:1.2rem;white-space:normal;width:8ch;line-height:1.1;top:30px}
.wg-piece-tag{max-width:min(42vw,19ch);white-space:normal;line-height:1.12}
.wg-caption-picture{max-height:350px}
@media(max-width:640px){
 .wg-painted-table{padding:6px}
 .wg-rack-roofs{display:grid;grid-template-columns:repeat(5,minmax(44px,1fr));gap:3px}
 .wg-rack-roofs .wg-roofpiece{width:100%;height:44px}
 .wg-rack-roofs .wg-roof-short img{width:66%;margin:auto;display:block}
 .wg-piece::after{
  content:"";position:absolute;top:calc(100% - 8px);left:50%;width:48px;height:48px;transform:translateX(-50%);
  background:radial-gradient(circle,#bf9654 0 5px,#7d5b2a 6px,#0000 7px)
 }
 .wg-piece.fixed::after,.wg-piece.inked::after{background:none}
 .wg-lane.acts{margin-bottom:50px}
 .acts .wg-piece-tag{top:calc(100% + 30px)}
 .wg-caption-picture{max-height:280px}
 .wg-thebes-layout .wg-sheet>.wg-tag{font-size:10px}
}
@media(max-width:360px){
 .wg-sheet>.wg-tag{right:3px}
 .wg-direction{left:5px;font-size:10px}
 .wg-rail-wrap{padding-inline:8px}
 .wg-foot{font-size:8px}
}

/* Second look evidence surfaces */
.wg-second h3{margin:0}
.wg-second #wg-say{margin:.4rem 0 .75rem}
.wg-second-line-view{overflow-x:auto;overscroll-behavior-inline:contain;border:1px solid #a68b61;background:#f8efdb;padding:.6rem 0}
.wg-second-line{position:relative;width:max(58rem,100%);min-height:4rem}
.wg-second-line>img{display:block;width:100%;height:auto;min-height:3.3rem;mix-blend-mode:multiply}
.wg-line-mark{
 position:absolute;top:0;bottom:0;left:var(--at);width:clamp(44px,4vw,64px);transform:translateX(-50%);
 min-height:44px;border:1px dashed #976a36bd;border-radius:45%;background:#7f531910
}
.wg-line-mark:focus-visible{outline:3px solid #57401f;outline-offset:0}
.wg-line-mark.is-marked{border:3px solid #714320;background:#eacb7955;opacity:1}
.wg-line-mark.wg-tried{border-color:#a7573b;background:#a7573b24}
.wg-second-caption{margin:.6rem 0;padding:.75rem 1rem;border:1px solid #b39a70;background:#faf1da;font:italic 1rem/1.5 Georgia,serif}
.wg-second-caption p{margin:.4rem 0 0}
.wg-second-tray{
 position:relative;width:min(100%,24rem,calc(50svh * .714));aspect-ratio:5/7;
 background:#ae8861;overflow:hidden;margin:.3rem auto .7rem;touch-action:none;
 border:1px solid #896840;border-radius:4px;box-shadow:0 3px 8px #50351988
}
.wg-second-tray > img,.wg-second-fill,.wg-second-fill img{position:absolute;inset:0;width:100%;height:100%;object-fit:fill}
.wg-second-fill{background:#d3ae78;clip-path:inset(3% 3% calc(3% + var(--bare) * 94%) 3%);transition:clip-path .5s}
.wg-second-corner{position:absolute;left:8%;top:8%;width:7%;height:5%;background:#b9a283;clip-path:polygon(0 60%,30% 5%,89% 9%,100% 62%,70% 84%,11% 93%)}
.wg-probe{
 position:absolute;width:44px;height:44px;transform:translate(-50%,-50%);padding:0;
 border:1px dotted transparent;border-radius:50%;background:none
}
.wg-probe::after{content:"";position:absolute;inset:calc(50% - 4px);border-radius:50%;background:#6f553458;box-shadow:0 0 0 1px #f4d8a0}
.wg-probe.stone::after{inset:calc(50% - 8px);background:radial-gradient(circle at 35% 30%,#ffe6aa,#b08436 70%);box-shadow:0 2px 4px #36291b88}
.wg-probe.fill::after{background:#473020;border:2px solid #a57242;box-shadow:0 0 0 5px #95623477}
.wg-probe.selected,.wg-probe:focus-visible{outline:2px solid #fff1a8;border-color:#422919}
.wg-probe:hover{border-color:#6c4d2d}
.wg-string{position:absolute;height:2px;transform-origin:0 50%;background:#f0e3b6;box-shadow:0 1px 1px #33230f;pointer-events:none}
.wg-second-date-wells{display:grid;grid-template-columns:repeat(auto-fit,minmax(5rem,1fr));gap:.35rem;margin:.75rem 0}
.wg-second-date-wells button{position:relative;justify-content:center}
.wg-second-date-wells img{height:29px;width:16px;object-fit:contain}
.wg-second-rail{position:relative;height:6.5rem;margin:1.4rem .25rem .7rem;padding:0;border-radius:3px}
.wg-second-rail > img{position:absolute;left:0;right:0;top:37%;width:100%;height:20%;object-fit:fill}
.wg-anchor{position:absolute;top:0;height:58%;font:italic 12px/1.2 Georgia,serif;border-left:2px solid #88602f;padding:.15rem .3rem;white-space:nowrap}
.wg-anchor-rome{left:0}
.wg-second-gallio,.wg-second-stay-bar{position:absolute;height:1.4rem;display:grid;place-items:center;font:12px Georgia,serif;isolation:isolate}
.wg-second-gallio{top:40%;background:#c5a16b}
.wg-second-stay-bar{top:72%;background:#f2dfae}
.wg-second-cord{position:absolute;top:82%;left:0;border-top:2px dashed #a36e44}
.wg-second-gallio img,.wg-second-stay-bar img{position:absolute;inset:0;width:100%;height:100%;object-fit:fill;z-index:-1}
.wg-range-label{display:block;font-weight:600}
#wg-second-stay{display:block;width:100%;margin:.35rem 0 .8rem}
.wg-copy-note{font-size:.88em}

`;
/* Code by Daniel using Claude November 24, 2026 */
})();
