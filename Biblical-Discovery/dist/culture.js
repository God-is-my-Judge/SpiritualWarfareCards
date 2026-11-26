'use strict';
// A parallel route to the real exhibit. Excavation tools and their seals keep their own records.
window.BD_CULTURE = {
 total(board) {
  return board.notes.length;
  /* Code by Daniel using ChatGPT November 23, 2026 */
 },
 progress(site) {
  const d = digState(site);
  return d.culture ||= {step:0, cursor:0, pieces:[0,0,0], roofs:[], active:false, interpret:false, explained:false};
  /* Code by Daniel using ChatGPT November 23, 2026 */
 },
 clean(site, raw) {
  const board = BD_CULTURE_BOARDS[site.id];
  const bounded = (value, max) => Number.isInteger(value) ? Math.max(0, Math.min(value,max)) : 0;
  const step = bounded(raw.step,BD_CULTURE.total(board));
  return {step,cursor:bounded(raw.cursor,(board.windows?.length || 1)-1),
   pieces:[0,1,2].map(i=>bounded(raw.pieces?.[i],2)),
   roofs:[...new Set(Array.isArray(raw.roofs) ? raw.roofs.filter(n=>Number.isInteger(n)&&n>=0&&n<5) : [])],
   active:raw.active===true,interpret:step===BD_CULTURE.total(board)&&raw.interpret===true,explained:step===BD_CULTURE.total(board)&&raw.explained===true};
  /* Code by Daniel using ChatGPT November 23, 2026 */
 },
 invitation(site) {
  return '<button class="button culture-invite" data-culture-enter="'+site.id+'">Play '+escapeHTML(BD_CULTURE_BOARDS[site.id].title)+' <small>Another way to earn this find →</small></button>';
  /* Code by Daniel using ChatGPT November 23, 2026 */
 },
 open(site) {
  const state=BD_CULTURE.progress(site);
  state.active=true;
  BD_FIELD.touch(site.id);
  const b=BD_CULTURE_BOARDS[site.id];
  const art=BD_ART.catalog?.['find-'+site.art] || 'find-'+site.art;
  openPanel('FIELD WORKSHOP · '+site.place.toUpperCase(),
   '<article class="culture-page" data-culture-site="'+site.id+'"><header><img alt="Study illustration of '+escapeHTML(site.artifact)+'" src="'+BD_ART.assetURL('assets/'+art+'.webp')+'"><div><h2>'+escapeHTML(b.title)+'</h2><p>'+escapeHTML(b.opening)+'</p></div></header><section id="culture-work"></section><div class="culture-links"><button type="button" class="text-help" data-culture-action="field">Use the excavation tools</button><details><summary>Field sources</summary><p>'+escapeHTML(BD_REVIEW_DATA.sources[site.id][0].label)+' · '+escapeHTML(BD_REVIEW_DATA.sources[site.id][0].locator)+'</p><p>'+escapeHTML(site.scripture)+'</p></details></div></article>','culture');
  if(BD_CAMP.active()&&game.site===site){
   const panel=$('#panel');
   const [x]=BD_CAMP.layout(site).work;
   panel.classList.add('camp-workshop-panel');
   panel.dataset.workshopSide=x<W/2?'left':'right';
   const cleanup=game.dialogCleanup;
   game.dialogCleanup=()=>{
    panel.classList.remove('camp-workshop-panel');
    delete panel.dataset.workshopSide;
    cleanup?.();
   };
  }
  BD_CULTURE.draw(site);
  /* Code by Daniel using ChatGPT November 23, 2026 */
 },
 button(action,label,index='',style='') {
  return '<button type="button" class="culture-tile '+style+'" data-culture-action="'+action+'" data-index="'+index+'">'+escapeHTML(label)+'</button>';
  /* Code by Daniel using ChatGPT November 23, 2026 */
 },
 draw(site,focusAction) {
  const c=BD_CULTURE, b=BD_CULTURE_BOARDS[site.id], s=c.progress(site), count=c.total(b), work=$('#culture-work');
  const btn=c.button, e=escapeHTML;
  let body='',hint='';
  if(s.explained) {
   body='<p class="culture-note">'+e(b.answers[b.correct])+'</p><p>'+e(b.reflection)+'</p>'+btn('collect',game.save.finds[site.id]?'Visit the display →':'Bring the find home →')+(game.save.finds[site.id]?btn('replay','Play again'):'');
  } else if(s.step===count && s.interpret) {
   body='<h3>'+e(b.question)+'</h3><div class="culture-choices">'+b.answers.map((answer,i)=>btn('answer',answer,i)).join('')+'</div>';
  } else {
   const finished=s.step===count;
   hint=finished?'':b.guide;
   if(b.mode==='trail') {
    body='<p>'+e(b.cues[s.step]||'')+'</p><div class="culture-trail '+(site.id==='tel-dan'?'inscribed':'delta')+'" style="--columns:'+b.grid[0].length+'">'+b.grid.flat().map(n=>n===''?'<span></span>':btn('tile',b.tiles[n],n,b.order.slice(0,s.step).includes(n)?'marked':'')).join('')+'</div>';
   } else if(b.mode==='sync') {
    const date=b.windows[s.cursor], office=b.offices[s.pieces[0]];
    body='<p>'+e(b.cues[0])+'</p><div class="culture-clocks"><div><small>Delphi · imperial letter</small><strong>'+e(date[0])+'</strong><p>'+e(date[1])+'</p>'+btn('next','Turn date wheel ↻')+'</div><div><small>Corinth · Acts 18:12</small><strong>'+e(office[0])+'</strong><p>'+e(office[1])+'</p>'+btn('office','Turn office wheel ↻')+'</div></div>'+btn('align','Align the two records');
   } else if(b.mode==='dial') {
    const w=b.windows[s.cursor];
    body='<p>'+e(b.cues[s.step]||'')+'</p><div class="culture-dial">'+btn('prev','‹ Previous')+'<div aria-live="polite"><small>'+e(b.dialLabel)+' '+(s.cursor+1)+' / '+b.windows.length+'</small><strong>'+e(w[0])+'</strong>'+e(w[1])+'</div>'+btn('next','Next ›')+'</div>'+btn('pin','Mark this '+b.dialLabel.toLowerCase());
   } else if(b.mode==='pool') {
    body='<div class="culture-pools" aria-label="Plan of two adjoining pools">'+b.tiles.map((label,i)=>btn('roof',label,i,'bank pos-'+i+(s.roofs.includes(i)?' roofed':'')+(i>4?' water':''))).join('')+'</div><p>'+s.roofs.length+' of five walkways roofed</p>';
   } else if(b.mode==='timber') {
    body='<div class="culture-hull">'+['Bow','Midships','Stern'].map((label,i)=>'<div class="plank plank-'+i+'"><button class="timber-patch" data-culture-action="turn" data-index="'+i+'" aria-label="Turn '+label+' patch, '+c.angles[s.pieces[i]]+' grain; surrounding plank '+c.angles[c.joints[i]]+'"><i style="--grain:'+s.pieces[i]*60+'deg"></i><span>'+label+' ↻</span></button></div>').join('')+'</div>'+btn('fit','Test the joints');
   } else {
    const card=b.cards[s.step];
    body=(card?'<div class="culture-slip"><strong>'+e(card[0])+'</strong><span>'+e(card[1])+'</span></div>':'')+'<div class="culture-bins '+b.mode+'">'+b.bins.map((label,i)=>'<div>'+btn('file',label,i)+b.cards.slice(0,s.step).filter(card=>card[2]===i).map(card=>'<small class="culture-filed">✓ '+e(card[0])+'</small>').join('')+'</div>').join('')+'</div>';
   }
   if(finished)body='<fieldset class="culture-finished" disabled aria-label="Your finished board">'+body+'</fieldset>'+btn('interpret','Tell a visitor →');
  }
  const last=s.step>0 ? b.notes[s.step-1] : '';
  work.innerHTML='<p class="culture-guide">'+e(hint)+'</p>'+body+'<p role="status" class="culture-feedback">'+e(last)+'</p>';
  if(focusAction){
   const target=work.querySelector('[data-culture-action="'+focusAction+'"]')||work.querySelector('button');
   target?.focus({preventScroll:true});
  }
  /* Code by Daniel using ChatGPT November 23, 2026 */
 },
 angles:['horizontal','rising diagonal','falling diagonal'],joints:[1,0,2],
 act(site,action,i) {
  const c=BD_CULTURE, b=BD_CULTURE_BOARDS[site.id], s=c.progress(site);
  const note=msg=>{$('.culture-feedback').textContent=msg;};
  if(action==='replay' && s.explained && game.save.finds[site.id]){
   const second=s.wgSecond;
   delete digState(site).culture;
   if(second)c.progress(site).wgSecond={...second,active:false};
   c.open(site);return;
  }
  if(action==='field'){openDig(site);return;}
  if(action==='collect'&&s.explained){
   s.active=false;persist();
   if(game.save.finds[site.id])visitDisplay(site);else finishDiscovery(site);
   return;
  }
  if(action==='interpret' && s.step===c.total(b)){s.interpret=true;persist();c.draw(site,'answer');return;}
  if(action==='answer' && s.interpret && s.step===c.total(b)){
   if(i!==b.correct){note('Compare that claim with your field observation. '+b.notes.at(-1));return;}
   s.explained=true;persist();c.draw(site,'collect');return;
  }
  if(s.step>=c.total(b))return;
  let fits=false;
  if(action==='file')fits=i===b.cards[s.step][2];
  if(action==='tile')fits=i===b.order[s.step];
  if(action==='next'||action==='prev'){
   s.cursor=(s.cursor+(action==='next'?1:-1)+b.windows.length)%b.windows.length;
   persist();c.draw(site,action);return;
  }
  if(action==='office'){s.pieces[0]=(s.pieces[0]+1)%b.offices.length;persist();c.draw(site,'office');return;}
  if(action==='align'){
   if(s.cursor!==1||s.pieces[0]!==2){note('Look for Claudius around AD 52 and the proconsul named by Luke.');return;}fits=true;
  }
  if(action==='pin')fits=s.cursor===b.targets[s.step];
  if(action==='roof'){
   if(i>4){note('There is water under that span. Look for stone that can support columns.');return;}
   if(s.roofs.includes(i)){note('That walkway already has a roof.');return;}
   s.roofs.push(i);fits=s.roofs.length===5;
   if(!fits){persist();c.draw(site);$('#culture-work [data-index="'+i+'"]').focus({preventScroll:true});return;}
  }
  if(action==='turn'){
   s.pieces[i]=(s.pieces[i]+1)%3;persist();c.draw(site);
   const patch=$('#culture-work [data-index="'+i+'"]');patch.focus({preventScroll:true});note(patch.getAttribute('aria-label'));return;
  }
  if(action==='fit'){
   const joint=s.pieces.findIndex((v,j)=>v!==c.joints[j]);
   if(joint!==-1){note(['Bow','Midships','Stern'][joint]+' needs '+c.angles[c.joints[joint]]+' grain. Follow the outer wood lines.');return;}fits=true;
  }
  if(!fits){note(b.mode==='trail'?b.cues[s.step]:b.mode==='dial'?'Keep looking. '+b.cues[s.step]:'Read the clue on the slip again. '+b.cards[s.step][1]);return;}
  s.step++;persist();c.draw(site,s.step===c.total(b)?'interpret':action);
  /* Code by Daniel using ChatGPT November 23, 2026 */
 },
 install() {
  document.addEventListener('click',function cultureControls(event){
   const control=event.target.closest('button');if(!control)return;
   const id=control.dataset.cultureEnter||control.closest('[data-culture-site]')?.dataset.cultureSite;
   const site=BD_SITES.find(item=>item.id===id);if(!site)return;
   if(control.dataset.cultureEnter)BD_CULTURE.open(site);
   else if(control.dataset.cultureAction)BD_CULTURE.act(site,control.dataset.cultureAction,Number(control.dataset.index));
   /* Code by Daniel using ChatGPT November 23, 2026 */
  });
  /* Code by Daniel using ChatGPT November 23, 2026 */
 }
};
