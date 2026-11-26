'use strict';
window.BD_TRENCH={
 active:null,arrival:'ask',eligible:new Set(['qumran','galilee','bethesda','caesarea','delphi','megiddo']),
 finds:['potsherd','lamp','coin','scrolljar','lid','bone'],labels:['A1','A2','B1','B2'],
 noteLimit:600,tools:['shovel','trowel','brush'],size:640,pegs:[[18,320],[622,320],[320,18],[320,622]],
};
BD_TRENCH.plan=function campPlot(site){return BD_CAMP.layout(site).plot;};
BD_TRENCH.state=function fieldSquareRecord(site){
 const d=digState(site);
 return d.trench||(d.trench={version:2,selected:0,broken:0,finished:false,pegs:0,priorFinds:0,
  squares:[0,3,1,2].map(find=>({depth:Array(96).fill(0),logged:false,note:'',hit:false,brushes:0,bagged:false,generation:0,find}))});
};
BD_TRENCH.clean=function validTrainingSquares(raw,clean){
 const cap=(n,max)=>Math.max(0,Math.min(max,Math.trunc(Number(n)||0)));
 for(const site of BD_SITES){
  const r=raw.digs?.[site.id]?.trench;if(!r||!clean.digs[site.id])continue;
  const legacy=r.version!==2,indices=legacy?[0,1,3,4]:[0,1,2,3];
  const worked=Array.isArray(r.squares)&&r.squares.some(q=>q&&(q.logged||q.hit||q.bagged||(Array.isArray(q.depth)&&q.depth.some(n=>Number(n)>0))));
  clean.digs[site.id].trench={
   version:2,selected:Math.max(0,indices.indexOf(r.selected)),broken:cap(r.broken,999),finished:!!r.finished,
   pegs:legacy?(worked||r.finished?15:0):cap(r.pegs,15),
   priorFinds:legacy?[2,5].filter(i=>r.squares?.[i]?.bagged).length:cap(r.priorFinds,2),
   squares:indices.map((index,i)=>{
    const q=r.squares?.[index]||{};
    return {depth:Array.from({length:96},(_,n)=>cap(q.depth?.[n],3)),logged:!!q.logged,note:BD_TRENCH.noteText(q.note),hit:!!q.hit,
     brushes:cap(q.brushes,3),bagged:!!q.bagged,generation:cap(q.generation,999),
     find:Number.isInteger(q.find)?cap(q.find,5):[0,3,1,2][i]};
   })
  };
 }
 return clean;
};
BD_TRENCH.noteText=function notebookText(text){
 return typeof text==='string'?text.slice(0,BD_TRENCH.noteLimit):'';
};
BD_TRENCH.logNote=function recordSquareNote(value){
 const s=BD_TRENCH.active;if(!s||s.data.pegs!==15)return;
 const q=s.data.squares[s.data.selected];
 q.note=BD_TRENCH.noteText(value);
 if(q.note.trim()&&!q.logged){
  q.logged=true;
  BD_TRENCH.say('Square logged. Lower the soil in level passes.');
  BD_TRENCH.refresh();
 }
 persist();
};
BD_TRENCH.fileSlip=function fileMiriamsSlip(){
 const s=BD_TRENCH.active;
 if(!s||s.data.pegs!==15)return;
 const q=s.data.squares[s.data.selected],slip=$('#trench-log').textContent,previous=q.note||'';
 // The paper keeps the chosen square's own address, even when the player supplies the wording.
 if(!previous.split('\n').includes(slip))BD_TRENCH.logNote(previous?previous+'\n'+slip:slip);
 BD_TRENCH.refresh();
};
BD_TRENCH.bookVisibility=function setNotebookAside(minimized){
 const s=BD_TRENCH.active;if(!s)return;
 $('.trench-notebook').hidden=minimized;
 $('#trench-book-open').hidden=!minimized;
};
BD_TRENCH.notebookControls=function useThePaperNotebook(s,opts){
 const slip=$('#trench-log'),paper=$('.trench-notebook'),ink=$('#trench-ink'),layout=$('.trench-layout');
 let drag=null,skipClick=false;
 const finish=()=>{
  if(!drag)return;
  drag.ghost?.remove();paper.classList.remove('trench-drop-ready');drag=null;
 };
 slip.addEventListener('pointerdown',e=>{
  if(e.button!==0||drag)return;
  skipClick=false;
  drag={id:e.pointerId,x:e.clientX,y:e.clientY,ghost:null};
  slip.setPointerCapture(e.pointerId);
 },opts);
 slip.addEventListener('pointermove',e=>{
  if(drag?.id!==e.pointerId)return;
  if(!drag.ghost){
   if(Math.hypot(e.clientX-drag.x,e.clientY-drag.y)<8)return;
   BD_TRENCH.bookVisibility(false);
   drag.ghost=document.createElement('span');
   drag.ghost.className='trench-slip-ghost';drag.ghost.textContent=slip.textContent;
   layout.append(drag.ghost);paper.classList.add('trench-drop-ready');
  }
  drag.ghost.style.left=e.clientX+'px';drag.ghost.style.top=e.clientY+'px';
 },opts);
 slip.addEventListener('pointerup',e=>{
  if(drag?.id!==e.pointerId)return;
  if(drag.ghost){
   skipClick=true;
   const r=paper.getBoundingClientRect();
   if(e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom)BD_TRENCH.fileSlip();
  }
  finish();
 },opts);
 slip.addEventListener('pointercancel',finish,opts);
 slip.addEventListener('lostpointercapture',finish,opts);
 slip.addEventListener('click',e=>{
  if(skipClick&&e.detail){skipClick=false;return;}
  BD_TRENCH.bookVisibility(false);BD_TRENCH.fileSlip();
 },opts);
 ink.addEventListener('input',()=>BD_TRENCH.logNote(ink.value),opts);
 $('#trench-book-close').addEventListener('click',()=>{
  BD_TRENCH.bookVisibility(true);$('#trench-book-open').focus({preventScroll:true});
 },opts);
 $('#trench-book-open').addEventListener('click',()=>{
  BD_TRENCH.bookVisibility(false);
  (ink.disabled?$('#trench-book-close'):ink).focus({preventScroll:true});
 },opts);
};
BD_TRENCH.archive=function readBackpackFieldNotes(){
 const entries=BD_SITES.flatMap(site=>(game.save.digs[site.id]?.trench?.squares||[]).flatMap((q,i)=>
  q.note?.trim()?[{site,square:BD_TRENCH.labels[i],note:q.note}]:[]));
 const notes=BD_ADVENTURE.notes();
 const saved=entries.map(({site,square,note})=>'<div class="note-block"><b>'+escapeHTML(site.place)+
  ' · '+square+'</b><p class="field-notebook-entry">'+escapeHTML(note)+'</p></div>').join('');
 openPanel('YOUR FIELD NOTEBOOK','<h2>Field notebook</h2><p><b>'+notes+' '+(notes===1?'expedition clue':'expedition clues')+
  '</b> · Finds and practice seals earn clues for the Important Dig.</p><h3>Your square logs</h3>'+
  (saved||'<p>Your training-plot entries will appear here.</p>')+
  '<button class="button secondary" data-trench-archive-back>Back to the backpack</button>','field-note-archive');
 $('[data-trench-archive-back]').onclick=()=>BD_IMMERSION.pack();
};
BD_TRENCH.box=function plotSquare(i){
 return {x:24+i%2*296,y:24+Math.floor(i/2)*296,w:296,h:296};
};
BD_TRENCH.say=function miriamAtTheSquare(line,warning=false,immediate=false){
 const s=BD_TRENCH.active;if(!s)return;
 clearTimeout(s.reply);
 const message=$('#trench-message'),dots=$('.trench-typing');
 const deliver=()=>{dots.hidden=true;message.classList.toggle('trench-warning',warning);message.textContent='Miriam: “'+line+'”';};
 if(immediate||!BD_VIEW.allowed()){deliver();return;}
 dots.hidden=false;
 s.reply=setTimeout(deliver,560+Math.random()*440);
};
BD_TRENCH.peg=function stakeThePlot(i){
 const s=BD_TRENCH.active,bit=1<<i;if(!s||s.data.pegs&bit)return;
 s.data.pegs|=bit;
 const ready=s.data.pegs===15;
 BD_TRENCH.say(ready?'Four squares. Log the one you’ll dig first.':'The cord gives each find an address.');
 BD_TRENCH.refresh();BD_TRENCH.paint();persist();
 if(ready&&document.activeElement.matches('[data-trench-peg],#trench-help'))$('#trench-log').focus({preventScroll:true});
};
BD_TRENCH.open=function openDiscoveryHillside(site){
 if(game.scene!=='site'||game.site!==site)setScene('site',site);
 const data=BD_TRENCH.state(site),asset=name=>BD_ART.assetURL('assets/field-v12-'+name+'.webp');
 const stakes=['west','east','north','south'].map((side,i)=>'<button class="trench-peg" data-trench-peg="'+i+'" aria-label="Place '+side+' peg"><span aria-hidden="true"></span></button>').join('');
 const markers=BD_TRENCH.labels.map((label,i)=>'<button data-trench-square="'+i+'" aria-label="Select square '+label+'">'+label+'</button>').join('');
 const tools=BD_TRENCH.tools.map(tool=>'<button data-trench-tool="'+tool+'" aria-pressed="false" title="Pick up the '+tool+'"><img src="'+asset(tool)+'" alt=""><span>'+tool+'</span></button>').join('');
 openPanel(site.place.toUpperCase()+' · TRAINING PLOT','<section class="trench-layout"><h2 class="sr-only">'+escapeHTML(site.place)+' training plot</h2><canvas class="trench-lines" aria-hidden="true"></canvas><div class="trench-view"><canvas id="trench-canvas" width="640" height="640" tabindex="0" aria-label="Excavation plot. Place four pegs to mark A1, A2, B1 and B2. Log a square, then drag your tool. Use arrows and Space on the keyboard."></canvas>'+stakes+markers+'</div><div class="trench-tools" role="group" aria-label="Tools on the ground">'+tools+'</div><aside class="trench-side"><p class="trench-method">String marks where each find came from.</p><div class="trench-radio"><img src="'+BD_ART.assetURL('assets/dig-v7-face-miriam.webp')+'" alt=""><p id="trench-message" role="status"></p><span class="trench-typing" aria-hidden="true" hidden><i></i><i></i><i></i></span></div><button class="trench-site-slip" id="trench-log" hidden title="Drag into the notebook or activate to log this square" aria-describedby="trench-log-hint"></button><p id="trench-log-hint" class="trench-log-hint" hidden>Drag this site date over, or write your own note.</p><div class="trench-actions"><button class="button" id="trench-bag" disabled>Bag the find</button><button class="button secondary" id="trench-help">Help</button><button class="button secondary" id="trench-camp">Camp →</button></div><details><summary>Field guide</summary><p>Excavators sometimes mark trench edges with pegs and string. This practice plot uses four teaching finds. The site’s discovery account waits at camp.</p><p>Drag to dig. Use arrows with Space, or hold A and move the stick. 1/2/3 or the bumpers choose a tool.</p><section class="trench-question" hidden><p>What belongs on the bag?</p><button class="button secondary" data-trench-note="square">Its square number</button> <button class="button secondary" data-trench-note="tool">The tool I used</button><p class="trench-answer" role="status"></p></section></details></aside><div class="trench-notebook" style="background-image:url(&quot;'+asset('notebook')+'&quot;)"><button id="trench-book-close" aria-label="Minimize to backpack" title="Minimize to backpack">×</button><p id="trench-record" aria-live="polite"></p><textarea id="trench-ink" maxlength="'+BD_TRENCH.noteLimit+'" aria-label="Notes for this excavation square" placeholder="Write a note…"></textarea></div><button id="trench-book-open" hidden title="Open field notebook"><img src="'+BD_ART.assetURL('assets/v9-backpack.webp')+'" alt="">Field notebook</button></section>','field-trench');
 const canvas=$('#trench-canvas'),box=BD_TRENCH.box(data.selected);
 const state={site,data,canvas,tool:null,cursor:[box.x+box.w/2,box.y+box.h/2],stroke:null,padArmed:false};
 BD_TRENCH.active=state;
 const abort=new AbortController(),opts={signal:abort.signal};
 game.dialogCleanup=()=>{
  abort.abort();clearTimeout(state.reply);clearTimeout(state.damageTimer);
  if(BD_CONTROLLER.mode?.type==='trench')BD_CONTROLLER.endWork();
  if(BD_TRENCH.active===state)BD_TRENCH.active=null;
  persist();
 };
 const point=event=>{
  const r=canvas.getBoundingClientRect(),n=BD_TRENCH.size;
  return [(event.clientX-r.left)/r.width*n,(event.clientY-r.top)/r.height*n];
 };
 canvas.addEventListener('pointerdown',event=>{
  event.preventDefault();canvas.focus({preventScroll:true});canvas.setPointerCapture(event.pointerId);BD_TRENCH.begin(point(event));
 },opts);
 canvas.addEventListener('pointermove',event=>{if(state.stroke){event.preventDefault();BD_TRENCH.move(point(event));}},opts);
 canvas.addEventListener('pointerup',event=>{if(state.stroke)BD_TRENCH.move(point(event));BD_TRENCH.end();},opts);
 canvas.addEventListener('pointercancel',()=>{state.stroke=null;BD_TRENCH.paint();},opts);
 canvas.addEventListener('keydown',event=>{
  if(event.key===' '){event.preventDefault();if(!event.repeat)BD_TRENCH.begin(state.cursor);return;}
  const directions={ArrowLeft:[-18,0],ArrowRight:[18,0],ArrowUp:[0,-18],ArrowDown:[0,18]};
  if(directions[event.key]){
   event.preventDefault();event.stopPropagation();
   const d=directions[event.key];
   state.cursor=state.cursor.map((n,i)=>Math.max(0,Math.min(BD_TRENCH.size,n+d[i])));
   if(state.stroke)BD_TRENCH.move(state.cursor);else BD_TRENCH.paint();
  }
  if(['1','2','3'].includes(event.key))BD_TRENCH.tool(BD_TRENCH.tools[Number(event.key)-1]);
 },opts);
 canvas.addEventListener('keyup',event=>{if(event.key===' '){event.preventDefault();BD_TRENCH.end();}},opts);
 canvas.addEventListener('blur',()=>{state.stroke=null;},opts);
 for(const b of document.querySelectorAll('[data-trench-square]'))b.addEventListener('click',()=>BD_TRENCH.select(Number(b.dataset.trenchSquare)),opts);
 for(const b of document.querySelectorAll('[data-trench-peg]'))b.addEventListener('click',()=>BD_TRENCH.peg(Number(b.dataset.trenchPeg)),opts);
 for(const b of document.querySelectorAll('[data-trench-tool]'))b.addEventListener('click',()=>BD_TRENCH.tool(b.dataset.trenchTool),opts);
 BD_TRENCH.notebookControls(state,opts);
 for(const b of document.querySelectorAll('[data-trench-note]'))b.addEventListener('click',()=>{
  $('.trench-answer').textContent=b.dataset.trenchNote==='square'?'Yes. The number tells us where it came from.':'Think about what tells the lab where you found it.';
 },opts);
 $('#trench-help').addEventListener('click',BD_TRENCH.help,opts);
 $('#trench-bag').addEventListener('click',BD_TRENCH.bag,opts);
 $('#trench-camp').addEventListener('click',()=>{
  data.finished||=BD_TRENCH.count(data)>=2;closePanel();persist();
 },opts);
 window.addEventListener('resize',BD_TRENCH.guides,opts);
 BD_TRENCH.refresh();
 BD_TRENCH.say(data.pegs===15?(data.squares[data.selected].logged?'That square is logged. Choose a tool.':'Choose a square and log its address.'):'Set four pegs. String will divide this patch of soil.',false,true);
 BD_TRENCH.paint();
};
BD_TRENCH.select=function chooseExcavationSquare(i){
 const s=BD_TRENCH.active;if(!s||s.data.pegs!==15||!s.data.squares[i])return;
 s.data.selected=i;s.stroke=null;
 const b=BD_TRENCH.box(i);s.cursor=[b.x+b.w/2,b.y+b.h/2];
 BD_TRENCH.refresh();BD_TRENCH.paint();persist();
};
BD_TRENCH.tool=function chooseExcavationTool(tool){
 const s=BD_TRENCH.active;if(!s||!BD_TRENCH.tools.includes(tool))return;
 s.tool=tool;s.stroke=null;
 for(const b of document.querySelectorAll('[data-trench-tool]'))b.setAttribute('aria-pressed',String(b.dataset.trenchTool===tool));
 if(s.data.pegs!==15)BD_TRENCH.say('Set the pegs before you dig.');
 else if(!s.data.squares[s.data.selected].logged){
  BD_TRENCH.bookVisibility(false);
  BD_TRENCH.say('Don’t you want to log your square first?',false,true);
 }
 BD_TRENCH.paint();
};
BD_TRENCH.begin=function startExcavationStroke(point){
 const s=BD_TRENCH.active;if(!s)return;
 if(s.data.pegs!==15){BD_TRENCH.say('Set the pegs before digging.');return;}
 const i=BD_TRENCH.labels.findIndex((_,n)=>{
  const b=BD_TRENCH.box(n);
  return point[0]>=b.x&&point[0]<b.x+b.w&&point[1]>=b.y&&point[1]<b.y+b.h;
 });
 if(i<0)return;
 if(i!==s.data.selected)BD_TRENCH.select(i);
 if(!s.data.squares[i].logged){
  BD_TRENCH.bookVisibility(false);BD_TRENCH.say('Log this square so we know where the find came from.',false,true);return;
 }
 if(!s.tool){BD_TRENCH.say('Pick up a tool beside the plot.');return;}
 s.cursor=point.slice();s.stroke={last:point.slice(),points:[point.slice()],at:performance.now()};BD_TRENCH.paint();
};
BD_TRENCH.move=function moveExcavationStroke(point){
 const s=BD_TRENCH.active;if(!s?.stroke)return;
 s.cursor=point.slice();const st=s.stroke;
 if(st.points.length<160&&Math.hypot(point[0]-st.last[0],point[1]-st.last[1])>=7){st.points.push(point.slice());st.last=point.slice();}
 BD_TRENCH.paint();
};
BD_TRENCH.end=function finishExcavationStroke(){
 const s=BD_TRENCH.active;if(!s?.stroke)return;
 const st=s.stroke;s.stroke=null;BD_TRENCH.apply(st.points,Math.max(1,performance.now()-st.at));BD_TRENCH.paint();
};
BD_TRENCH.apply=function workTheSoil(points,milliseconds,assisted=false){
 const s=BD_TRENCH.active;if(!s||s.data.pegs!==15||!s.tool)return;
 const q=s.data.squares[s.data.selected],b=BD_TRENCH.box(s.data.selected);if(q.bagged)return;
 if(!q.logged){BD_TRENCH.say('Log the square first. Every piece needs its address.');return;}
 const distance=points.slice(1).reduce((sum,p,i)=>sum+Math.hypot(p[0]-points[i][0],p[1]-points[i][1]),0);
 if(distance<12)return;
 const center=[b.x+b.w/2,b.y+b.h/2],radiusFromFind=p=>Math.hypot(p[0]-center[0],p[1]-center[1]);
 const near=points.some(p=>radiusFromFind(p)<52),tool=s.tool;
 if(tool==='brush'&&!q.hit){BD_TRENCH.say('Use the trowel for firm soil. The brush is for loose crumbs.');return;}
 if(tool==='brush'&&!assisted&&(distance/Math.max(200,milliseconds)*1000>650||milliseconds<240)){
  BD_TRENCH.say('Too hard! Try a slower stroke.');return;
 }
 if(tool==='brush'&&(!near||(!assisted&&radiusFromFind(points.at(-1))<radiusFromFind(points[0])+6))){
  BD_TRENCH.say('Start near the rim and sweep outward.');return;
 }
 if(tool==='shovel'&&q.hit&&near){
  s.damaged={kind:BD_TRENCH.kind(s,q),center};s.data.broken++;q.generation++;
  q.find=(q.find+1)%BD_TRENCH.finds.length;q.depth=q.depth.map(n=>Math.min(1,n));q.hit=false;q.brushes=0;
  BD_TRENCH.say('Broken? Easy with the shovel. Switch to a finer tool near the find.',true);
  clearTimeout(s.damageTimer);s.damageTimer=setTimeout(()=>{s.damaged=null;BD_TRENCH.paint();},2400);
  persist();BD_TRENCH.refresh();BD_TRENCH.paint();return;
 }
 let touched=false;
 const radius=tool==='shovel'?56:tool==='trowel'?43:32;
 for(let n=0;n<96;n++){
  const x=b.x+(n%12+.5)/12*b.w,y=b.y+(Math.floor(n/12)+.5)/8*b.h;
  if(!points.some(p=>Math.hypot(x-p[0],y-p[1])<=radius))continue;
  touched=true;
  if(tool==='brush'){if(q.depth[n]>=2)q.depth[n]=3;}
  else q.depth[n]=Math.min(radiusFromFind([x,y])<54?2:3,q.depth[n]+1);
 }
 if(!touched)return;
 const exposed=[41,42,53,54].some(n=>q.depth[n]>=2);
 if(exposed&&!q.hit){
  q.hit=true;BD_TRENCH.say('There’s a rim! Set the shovel down. Brush the loose soil away.');
 }else if(tool==='brush'&&q.hit){
  q.brushes=Math.min(3,q.brushes+1);
  BD_TRENCH.say(q.brushes===3?'Clear. Lift it with its square number.':'That’s it. A soft stroke away from the rim.');
 }else if(tool==='trowel'&&near&&q.hit)BD_TRENCH.say('Clear beside the rim. Let the brush finish.');
 persist();BD_TRENCH.refresh();BD_TRENCH.paint();
};
BD_TRENCH.help=function oneFieldStroke(){
 const s=BD_TRENCH.active;if(!s)return;
 if(s.data.pegs!==15){BD_TRENCH.peg(BD_TRENCH.pegs.findIndex((_,i)=>!(s.data.pegs&1<<i)));return;}
 const q=s.data.squares[s.data.selected],b=BD_TRENCH.box(s.data.selected);
 if(!q.logged){BD_TRENCH.bookVisibility(false);BD_TRENCH.fileSlip();return;}
 if(q.hit){
  BD_TRENCH.tool('brush');BD_TRENCH.apply([[b.x+b.w*.48,b.y+b.h*.5],[b.x+b.w*.7,b.y+b.h*.5]],700,true);
 }else{
  BD_TRENCH.tool('shovel');BD_TRENCH.apply([.35,.5,.65].map(x=>[b.x+b.w*x,b.y+b.h*.5]),600,true);
 }
};
BD_TRENCH.count=function baggedFinds(data){
 return data.priorFinds+data.squares.filter(q=>q.bagged).length;
};
BD_TRENCH.bag=function recordAndLift(){
 const s=BD_TRENCH.active;if(!s||s.data.pegs!==15)return;
 const q=s.data.squares[s.data.selected];if(!q.logged||q.brushes<3||q.bagged)return;
 q.bagged=true;
 const names={potsherd:'A broken rim can tell you how the whole pot was shaped.',lamp:'This little lamp would have lit someone’s room.',coin:'A coin can help date a layer. Keep its address.',scrolljar:'Qumran jars show how people stored things, including some scrolls.',lid:'A jar lid is a clue to how people stored things.',bone:'Animal bones can tell us what people ate.'};
 BD_TRENCH.say(names[BD_TRENCH.kind(s,q)]);chime();persist();BD_TRENCH.refresh();BD_TRENCH.paint();
};
BD_TRENCH.kind=function findInItsContext(s,q,index=s.data.selected){
 const name=BD_TRENCH.finds[q.find];
 if((index<2&&['coin','bone'].includes(name))||(s.site.id!=='qumran'&&name==='scrolljar'))return 'potsherd';
 return name;
};
BD_TRENCH.refresh=function updateFieldNotebook(){
 const s=BD_TRENCH.active;if(!s)return;
 const {data}=s,q=data.squares[data.selected],count=BD_TRENCH.count(data),ready=data.pegs===15;
 const pegs=BD_TRENCH.pegs.filter((_,i)=>data.pegs&1<<i).length;
 const label=BD_TRENCH.labels[data.selected];
 const record=ready?label+' · '+(q.bagged?'Bagged':q.logged?'Logged':'Log first'):'Pegs '+pegs+' / 4';
 const ink=$('#trench-ink'),note=q.note||'',slip=$('#trench-log');
 $('#trench-record').textContent=record;
 $('#trench-record').title=count+' bagged · '+data.broken+' chips';
 ink.disabled=!ready;
 if(ink.value!==note)ink.value=note;
 ink.setAttribute('aria-label','Notes for square '+label);
 $('.trench-method').hidden=ready;
 $('.trench-question').hidden=count===0;
 slip.textContent='Square '+label+' · '+s.site.date;
 slip.hidden=slip.disabled=!ready||q.logged;
 $('#trench-log-hint').hidden=slip.hidden;
 $('#trench-bag').disabled=!ready||q.bagged||q.brushes<3;
 $('#trench-help').disabled=ready&&(q.bagged||q.brushes>=3);
 $('#trench-camp').textContent=count>=2?'Continue to camp →':'Camp →';
 for(const button of document.querySelectorAll('[data-trench-peg]')){
  button.hidden=!!(data.pegs&1<<Number(button.dataset.trenchPeg));
 }
 for(const button of document.querySelectorAll('[data-trench-square]')){
  const i=Number(button.dataset.trenchSquare);
  button.hidden=!ready;button.setAttribute('aria-pressed',String(i===data.selected));
  button.textContent=BD_TRENCH.labels[i]+(data.squares[i].bagged?' ✓':'');
 }
 s.terrainDirty=true;BD_TRENCH.guides();
};
BD_TRENCH.guides=function tieTheCampToThePlot(){
 const s=BD_TRENCH.active;if(!s)return;
 const sheet=$('.trench-lines'),bounds=sheet.getBoundingClientRect(),board=s.canvas.getBoundingClientRect();
 if(!bounds.width||!board.width)return;
 const scale=Math.min(2,devicePixelRatio||1);
 sheet.width=Math.round(bounds.width*scale);sheet.height=Math.round(bounds.height*scale);
 const c=sheet.getContext('2d');c.scale(scale,scale);
 const rect=sceneRect();
 const corners=BD_TRENCH.plan(s.site).map(([x,y])=>[rect.x+x*rect.scaleX-bounds.left,rect.y+y*rect.scaleY-bounds.top]);
 const mid=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2];
 const [tl,tr,br,bl]=corners;
 const stroke=(points,color,width,dash=[])=>{
  c.setLineDash(dash);c.lineWidth=width;c.strokeStyle=color;c.beginPath();
  points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke();
 };
 stroke([...corners,tl],'#f9deb1a3',1.3);
 if((s.data.pegs&3)===3)stroke([mid(tl,bl),mid(tr,br)],'#ffe6b9c7',1.5);
 if((s.data.pegs&12)===12)stroke([mid(tl,tr),mid(bl,br)],'#ffe6b9c7',1.5);
 const q=[[board.left,board.top],[board.right,board.top],[board.right,board.bottom],[board.left,board.bottom]];
 const leads=bounds.width<700?[[mid(tl,bl),q[0]],[mid(tr,br),q[1]]]:[[tr,q[0]],[br,q[3]]];
 for(const [p,[x,y]] of leads)stroke([p,[x-bounds.left,y-bounds.top]],'#ffe1a380',1,[5,6]);
};
BD_TRENCH.terrain=function paintExcavatedSquares(s){
 const n=BD_TRENCH.size;
 if(!s.terrain){
  s.terrain=document.createElement('canvas');s.terrain.width=s.terrain.height=n;
  s.layer=document.createElement('canvas');s.layer.width=s.layer.height=296;
 }
 const c=s.terrain.getContext('2d'),base=BD_ART.images['field-v12-soil-occupation'],top=BD_ART.images['field-v12-soil-topsoil'];
 c.clearRect(0,0,n,n);c.fillStyle='#765132';c.fillRect(17,17,606,606);
 if(top)c.drawImage(top,18,18,604,604);
 if(s.data.pegs!==15){s.terrainDirty=false;return;}
 for(const [i,q] of s.data.squares.entries()){
  const b=BD_TRENCH.box(i),average=q.depth.reduce((a,d)=>a+d,0)/96;
  c.save();c.beginPath();c.rect(b.x,b.y,b.w,b.h);c.clip();
  const paintQuarter=(context,image,x,y)=>{
   const w=image.width/2,h=image.height/2;
   context.drawImage(image,i%2*w,Math.floor(i/2)*h,w,h,x,y,b.w,b.h);
  };
  if(base)paintQuarter(c,base,b.x,b.y);
  for(let layer=1;layer>=0;layer--){
   const soil=layer?BD_ART.images['field-v12-soil-fill']:top,d=s.layer.getContext('2d');
   d.clearRect(0,0,b.w,b.h);
   if(soil)paintQuarter(d,soil,0,0);
   d.globalCompositeOperation='destination-out';
   for(let k=0;k<96;k++)if(q.depth[k]>layer){
    d.beginPath();d.ellipse((k%12+.5)/12*b.w,(Math.floor(k/12)+.5)/8*b.h,22,30,0,0,Math.PI*2);d.fill();
   }
   d.globalCompositeOperation='source-over';c.drawImage(s.layer,b.x,b.y);
  }
  if(average>.04){
   const shade=c.createLinearGradient(b.x,b.y,b.x,b.y+38);
   shade.addColorStop(0,'#2e1d12b0');shade.addColorStop(1,'#2e1d1200');c.fillStyle=shade;c.fillRect(b.x,b.y,b.w,38);
  }
  if(q.hit&&!q.bagged){
   const im=BD_ART.images['field-v12-'+BD_TRENCH.kind(s,q,i)];
   if(im){const h=86,w=h/im.height*im.width;c.globalAlpha=.58+q.brushes*.14;c.drawImage(im,b.x+b.w/2-w/2,b.y+b.h/2-h*.55,w,h);}
  }
  c.restore();
 }
 s.terrainDirty=false;
};
BD_TRENCH.paint=function paintDepthAndSpoil(){
 const s=BD_TRENCH.active;if(!s)return;
 if(s.terrainDirty||!s.terrain)BD_TRENCH.terrain(s);
 const c=s.canvas.getContext('2d'),n=BD_TRENCH.size;
 c.clearRect(0,0,n,n);c.drawImage(s.terrain,0,0);
 const cord=(a,b)=>{
  c.beginPath();c.moveTo(...a);c.lineTo(...b);
  c.lineWidth=6;c.strokeStyle='#35261eb3';c.stroke();
  c.lineWidth=2.4;c.strokeStyle='#f4db9e';c.stroke();
 };
 const p=BD_TRENCH.pegs;
 if((s.data.pegs&3)===3)cord(p[0],p[1]);
 if((s.data.pegs&12)===12)cord(p[2],p[3]);
 for(const [i,[x,y]] of p.entries())if(s.data.pegs&1<<i){
  c.fillStyle='#412c1a';c.beginPath();c.ellipse(x+3,y+4,8,5,0,0,Math.PI*2);c.fill();
  c.fillStyle='#d5a970';c.beginPath();c.arc(x,y,5.5,0,Math.PI*2);c.fill();
 }
 if(s.data.pegs===15){
  const b=BD_TRENCH.box(s.data.selected);c.strokeStyle='#ffebac';c.lineWidth=3;
  c.strokeRect(b.x+4,b.y+4,b.w-8,b.h-8);
 }
 if(s.damaged){
  const im=BD_ART.images['field-v12-'+s.damaged.kind];
  if(im){
   const [x,y]=s.damaged.center,h=72,w=im.width/im.height*h;
   for(const [offset,cut] of [[-11,0],[11,1]]){
    c.save();c.beginPath();c.rect(x-w/2+offset+cut*w/2,y-40+cut*7,w/2,h);c.clip();
    c.drawImage(im,x-w/2+offset,y-40+cut*7,w,h);c.restore();
   }
  }
 }
 if(s.stroke||document.activeElement===s.canvas){
  const [x,y]=s.cursor,tool=s.tool&&BD_ART.images['field-v12-'+s.tool];
  c.strokeStyle='#fff4c4';c.lineWidth=2;c.beginPath();c.arc(x,y,8,0,Math.PI*2);c.stroke();
  if(tool){const h=112;c.drawImage(tool,x-14,y-h+6,Math.min(78,tool.width/tool.height*h),h);}
 }
};
BD_TRENCH.pad=function controlFieldTools(r,dt){
 const s=BD_TRENCH.active;if(!s)return false;
 if(r.b){s.stroke=null;BD_CONTROLLER.endWork();BD_CONTROLLER.focus(s.canvas);return true;}
 if(r.start){closePanel();return true;}
 if(r.lb||r.rb){
  const tools=BD_TRENCH.tools,i=tools.indexOf(s.tool);
  BD_TRENCH.tool(tools[i<0?0:(i+(r.rb?1:2))%3]);
 }
 if(!s.padArmed){if(!r.aHeld)s.padArmed=true;return true;}
 s.cursor=s.cursor.map((n,i)=>Math.max(0,Math.min(BD_TRENCH.size,n+[r.x,r.y][i]*230*dt)));
 if(r.aHeld&&!s.stroke){if(r.a)BD_TRENCH.begin(s.cursor);}
 else if(r.aHeld)BD_TRENCH.move(s.cursor);
 else if(s.stroke)BD_TRENCH.end();
 BD_TRENCH.paint();return true;
};
BD_TRENCH.install=function installOptionalFieldSquares(){
 const oldClean=sanitizeSave;sanitizeSave=raw=>{return BD_TRENCH.clean(raw,oldClean(raw));
/* Code by Daniel using ChatGPT November 17, 2026 */
};const oldArt=BD_RESILIENCE.prepareArt;BD_RESILIENCE.prepareArt=async names=>{const missing=await oldArt(names);for(const suffix of ['hillside','shovel','trowel','brush','potsherd','lamp','coin','scrolljar','lid','bone','spoil-small','spoil-medium','spoil-large','soil-topsoil','soil-fill','soil-occupation','wall','finds-tray','bin-purple','bin-teal','bin-ochre','bin-blue','notebook','sign-old','sign-scroll','sign-new'])BD_ART.catalog['field-v12-'+suffix]='field-v12-'+suffix;return missing;
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldArchitecture=BD_IMMERSION.architecture;BD_IMMERSION.architecture=(c,r)=>{if(r.group!=='entry')return;const signs=[['old',460,230,250],['scroll',770,205,250],['new',1135,230,255]];if(signs.some(([key])=>{return !BD_ART.images['field-v12-sign-'+key];
/* Code by Daniel using ChatGPT November 17, 2026 */
})){oldArchitecture(c,r);return;}for(const [key,x,y,w]of signs){const im=BD_ART.images['field-v12-sign-'+key];c.drawImage(im,x-w/2,y,w,w/im.width*im.height);}
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldPanel=BD_JOURNEY.panel;BD_JOURNEY.panel=function paintedFieldPanels(kind){oldPanel(kind);$('#panel').classList.toggle('trench-panel',kind==='field-trench');$('#panel').classList.toggle('claim-sort-panel',kind==='claim-trays');if(kind==='atlas')$('.route-ticket').insertAdjacentHTML('beforeend','<button class="text-help" data-trench-route="skip">Skip the dig &amp; go to camp after landing</button>');if(kind==='claim-trays'){
  const slip=$('#claim-slip');
  slip.classList.add('painted-record-slip');
  slip.style.borderImageSource='url("'+BD_ART.assetURL('assets/field-v12-notebook.webp')+'")';
  const tray=document.createElement('div');
  tray.className='painted-finds-tray';
  tray.style.borderImageSource='url("'+BD_ART.assetURL('assets/field-v12-finds-tray.webp')+'")';
  slip.before(tray);
  tray.append(slip);
  const colors=['purple','teal','ochre','blue'];
  for(const [i,button] of [...document.querySelectorAll('[data-claim-tray]')].entries()){
   button.classList.add('painted-stone-bin');
   button.style.borderImageSource='url("'+BD_ART.assetURL('assets/field-v12-bin-'+colors[i]+'.webp')+'")';
  }
}
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldMap=BD_IMMERSION.selectMap;BD_IMMERSION.selectMap=id=>{oldMap(id);const button=$('[data-trench-route]');if(button)button.hidden=!BD_TRENCH.eligible.has(id);
/* Code by Daniel using ChatGPT November 17, 2026 */
};document.addEventListener('click',event=>{if(event.target.closest('[data-trench-route]')){event.preventDefault();event.stopImmediatePropagation();BD_TRENCH.arrival='skip';flyTo(BD_SITES.find(site=>{return site.id===BD_ATLAS.selected;
/* Code by Daniel using ChatGPT November 17, 2026 */
}));}
/* Code by Daniel using ChatGPT November 17, 2026 */
},true);
 const oldFinish=BD_FLIGHT.finish;BD_FLIGHT.finish=()=>{const site=game.flight?.site,survey=!!game.flight?.waterRoute;oldFinish();if(!site)return;const mode=BD_TRENCH.arrival;BD_TRENCH.arrival='ask';if(survey||mode==='skip'||!BD_TRENCH.eligible.has(site.id))return;openPanel('LANDED · '+site.place.toUpperCase(),'<h2>Field square or camp?</h2><p class="field-line">Miriam: “A little digging? The discovery account will still be waiting at camp.”</p><div class="actions"><button class="button" data-trench-arrive="dig">Dig the training squares →</button><button class="button secondary" data-trench-arrive="camp">Skip the dig &amp; go to camp →</button></div>','field-arrival');for(const button of document.querySelectorAll('[data-trench-arrive]'))button.addEventListener('click',()=>{if(button.dataset.trenchArrive==='dig')BD_TRENCH.open(site);else closePanel();
/* Code by Daniel using ChatGPT November 17, 2026 */
});
/* Code by Daniel using ChatGPT November 18, 2026 */
};
 const oldBounds=BD_IMMERSION.box;
 BD_IMMERSION.box=h=>h.trenchBounds||oldBounds(h);
 const oldHotspots=makeHotspots;makeHotspots=()=>{oldHotspots();if(game.scene==='site'&&BD_TRENCH.eligible.has(game.site.id)){
 const plot=BD_TRENCH.plan(game.site),x=plot.map(p=>p[0]),y=plot.map(p=>p[1]);
 const spot={id:'training-square',x:x.reduce((a,b)=>a+b,0)/4,y:y.reduce((a,b)=>a+b,0)/4,trenchBounds:[Math.min(...x),Math.min(...y),Math.max(...x),Math.max(...y)],label:'Miriam’s excavation squares',point:nearestFree((Math.min(...x)+Math.max(...x))/2,Math.max(...y)+64),action:()=>{return BD_TRENCH.open(game.site);
/* Code by Daniel using ChatGPT November 17, 2026 */
}};game.hotspots.push(spot);$('#hotspots').insertAdjacentHTML('beforeend','<button class="hotspot" data-hotspot="training-square" aria-label="Miriam’s excavation squares"></button>');BD_IMMERSION.position();}
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldActivate=BD_CONTROLLER.activate;BD_CONTROLLER.activate=el=>{if(el?.id==='trench-canvas'){BD_CONTROLLER.mode={node:el,type:'trench'};if(BD_TRENCH.active)BD_TRENCH.active.padArmed=false;return;}oldActivate(el);
/* Code by Daniel using ChatGPT November 17, 2026 */
};const oldWork=BD_CONTROLLER.work;BD_CONTROLLER.work=(r,dt)=>{return BD_CONTROLLER.mode?.type==='trench'?BD_TRENCH.pad(r,dt):oldWork(r,dt);
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 window.addEventListener('blur',()=>{if(BD_TRENCH.active)BD_TRENCH.active.stroke=null;
/* Code by Daniel using ChatGPT November 17, 2026 */
});document.addEventListener('visibilitychange',()=>{if(document.hidden&&BD_TRENCH.active)BD_TRENCH.active.stroke=null;
/* Code by Daniel using ChatGPT November 17, 2026 */
});
 document.addEventListener('bd-art-ready',event=>{if(BD_TRENCH.active&&event.detail.startsWith('field-v12-')){BD_TRENCH.active.terrainDirty=true;BD_TRENCH.paint();}
/* Code by Daniel using ChatGPT November 17, 2026 */
});
 // Manuscripts are already supported at the study table. Never brush a scroll or papyrus clean.
 const oldOpen=BD_STUDY.open;BD_STUDY.open=site=>{if(['qumran','oxyrhynchus'].includes(site.id)){const d=digState(site);if(d.recorded&&d.cleared.length<100){d.cleared=Array.from({length:140},(_,i)=>{return i;
/* Code by Daniel using ChatGPT November 17, 2026 */
});persist();toast('Miriam: The fragile writing goes straight onto a support. No brush.');}}oldOpen(site);
/* Code by Daniel using ChatGPT November 17, 2026 */
};

/* Code by Daniel using ChatGPT November 18, 2026 */
};
