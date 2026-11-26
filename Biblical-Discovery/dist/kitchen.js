'use strict';
// Food is a window into real places; recipes are earned by hands-on apprenticeship.
window.BD_KITCHEN={active:null,seat:null,ingredients:['onion','cucumber','beet','flatbread','dough','figs','dates','grain','fish','lamb','greens','herbs','leek','lentils','garlic','bread']};
BD_KITCHEN.state=function foodProgress(){return game.save.food||(game.save.food={apprentice:false,earned:[],recipes:{},last:null});
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.recipe=function recipeById(id){return BD_RECIPES.find(r=>r.id===id);
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.task=function cookingProgress(id){const s=BD_KITCHEN.state();return s.recipes[id]||(s.recipes[id]={stage:0,work:[]});
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.clean=function safeKitchenProgress(raw,clean){
 const f=raw.food||{},ids=BD_RECIPES.map(r=>r.id),recipes={};
 for(const id of ids){const t=f.recipes?.[id];if(!t||typeof t!=='object')continue;const recipe=BD_KITCHEN.recipe(id);recipes[id]={stage:Number.isInteger(t.stage)?Math.max(0,Math.min(recipe.steps.length-1,t.stage)):0,work:[]};
 for(let i=0;i<recipe.steps.length;i++){const w=t.work?.[i]||{},n=Number(w.progress),goal=recipe.steps[i].goal;recipes[id].work.push({progress:Number.isFinite(n)?Math.max(0,Math.min(goal,n)):0,cuts:Array.isArray(w.cuts)?w.cuts.slice(0,8).filter(a=>Array.isArray(a)&&a.length===4&&a.every(v=>Number.isFinite(v)&&Math.abs(v)<=1200)):[],placements:Array.from({length:3},(_,j)=>{const a=w.placements?.[j];return Array.isArray(a)&&a.length===2&&a.every(Number.isFinite)?[Math.max(310,Math.min(690,a[0])),Math.max(150,Math.min(370,a[1]))]:null;
/* Code by Daniel using ChatGPT November 17, 2026 */
}),bins:Array.isArray(w.bins)?[...new Set(w.bins.filter(v=>Number.isInteger(v)&&v>=0&&v<6))]:[],honey:Array.from({length:6},(_,bin)=>{
 const point=w.honey?.[bin];
 return Array.isArray(point)&&point.length===2&&point.every(Number.isFinite)&&BD_KITCHEN.honeyBand(point)===bin?point:null;
 }),heated:!!BD_KITCHEN.station(recipe.steps[i])&&(w.heated===true||(recipe.steps[i].kind==='turn'&&n>=goal)),herbBunch:Number.isInteger(w.herbBunch)&&w.herbBunch>=0&&w.herbBunch<3?w.herbBunch:null});}}
 clean.food={apprentice:!!f.apprentice,earned:Array.isArray(f.earned)?[...new Set(f.earned.filter(id=>ids.includes(id)))]:[],last:ids.includes(f.last)?f.last:null,recipes};
 if(['food','kitchen'].includes(raw.museum?.room))clean.museum.room=raw.museum.room;
 for(const room of ['food','kitchen'])if(Array.isArray(raw.museum?.visited)&&raw.museum.visited.includes(room)&&!clean.museum.visited.includes(room))clean.museum.visited.push(room);return clean;

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.image=function foodAsset(name){return BD_ART.assetURL('assets/v10-'+name+'.webp');
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.menu=function foodMenu(){
 const s=BD_KITCHEN.state();openPanel('THE OLIVE TABLE · FOOD COURT','<div class="food-menu-cover"><p class="eyebrow">SEVEN PLACES · ONE SHARED TABLE</p><h2>A taste of the world behind the accounts.</h2><p>Chef Eli’s apprenticeship: cook a dish together to unseal its recipe. Browse freely.</p></div><div class="food-menu-grid">'+BD_RECIPES.map(r=>'<button class="food-dish" data-food-dish="'+r.id+'"><img src="'+BD_KITCHEN.image('plates-'+r.id)+'" alt="'+escapeHTML(r.title)+'"><small>'+escapeHTML(r.origin)+'</small><b>'+escapeHTML(r.title)+'</b><span>'+escapeHTML(r.story)+'</span><em>'+(s.earned.includes(r.id)?'Recipe earned ✓':s.recipes[r.id]?'Resume your apprenticeship →':'Cook with Eli →')+'</em></button>').join('')+'</div><div class="actions"><button class="button secondary" data-food="book">My Recipe Book</button><button class="button secondary" data-food="cook">Meet Chef Eli</button></div>','food-menu');

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.preview=function dishStory(id){
 const r=BD_KITCHEN.recipe(id);if(!r)return;const earned=BD_KITCHEN.state().earned.includes(id);openPanel('ELI’S TABLE · '+r.origin.toUpperCase(),'<div class="food-introduction"><img src="'+BD_KITCHEN.image('plates-'+id)+'" alt="'+escapeHTML(r.title)+'"><div><h2>'+escapeHTML(r.title)+'</h2><p class="lede">'+escapeHTML(r.story)+'</p><p>'+escapeHTML(r.context)+'</p><p class="food-source-short">'+escapeHTML(r.reference)+'</p><p class="field-line">Eli: “Cook this with me. Then its recipe is yours to keep.”</p><div class="actions"><button class="button" data-food-cook="'+id+'">'+(BD_KITCHEN.state().recipes[id]?'Continue cooking':'Apprentice with Eli')+' →</button>'+(earned?'<button class="button secondary" data-food-card="'+id+'">Your earned recipe</button>':'<span class="sealed-note">Recipe page sealed until you cook and plate it.</span>')+'<button class="button secondary" data-food-scripture="'+id+'">Read alongside Scripture</button><button class="button secondary" data-food="menu">Back to the menu</button></div></div></div>','food-preview');

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.cook=function meetTheCook(actor){
 if(game.scene!=='museum'||!['food','kitchen'].includes(BD_MUSEUM.room))BD_MUSEUM.enter('food',{arrival:[1035,925]});
 const eli=actor||BD_PEOPLE.actors().find(person=>person.id==='cook');
 if(!actor&&!BD_PEOPLE.visible(eli)){
  const spot=game.hotspots.find(h=>h.id==='person-cook');
  if(spot){closePanel();walkTo(spot.point,()=>BD_KITCHEN.cook(eli));return;}
 }
 BD_PEOPLE.speak(eli,'Eli','Apprentice with me, and I’ll share my secret recipes—real ones from history. You’ll be able to print them for use at home.',
  '<button class="button" data-food="apprentice">Apprentice</button><button class="button secondary" data-food="menu">See the menu</button><button class="button secondary" data-food="book">Recipe Book</button><button class="button secondary" id="conversation-later">Later</button>','food-cook');
 $('#conversation-later').addEventListener('click',closePanel);

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.apprentice=function enterApprenticeship(id){BD_KITCHEN.state().apprentice=true;persist();closePanel();if(game.scene!=='museum'||BD_MUSEUM.room!=='kitchen')BD_MUSEUM.enter('kitchen',{arrival:[380,870]});if(id)BD_KITCHEN.start(id);else BD_KITCHEN.menu();
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.book=function earnedRecipeBook(){
 const s=BD_KITCHEN.state();openPanel('YOUR RECIPE BOOK · '+s.earned.length+' / 7 EARNED','<div class="recipe-book-heading"><span aria-hidden="true">❦</span><h2>The apprentice’s table.</h2><p>Cook a dish with Eli to break its seal. Earned recipes include sources, a home version and a printable card.</p></div><div class="recipe-pages">'+BD_RECIPES.map(r=>{const earned=s.earned.includes(r.id);return '<button class="recipe-page '+(earned?'earned':'sealed')+'" '+(earned?'data-food-card':'data-food-dish')+'="'+r.id+'">'+(earned?'<img src="'+BD_KITCHEN.image('plates-'+r.id)+'" alt="">':'<span class="wax-seal" aria-hidden="true">E</span>')+'<small>'+escapeHTML(r.origin)+'</small><b>'+escapeHTML(r.title)+'</b><span>'+(earned?'Earned · read or print →':s.recipes[r.id]?'Page sealed · resume cooking →':'Page sealed · cook this together →')+'</span></button>';
/* Code by Daniel using ChatGPT November 17, 2026 */
}).join('')+'</div><button class="button secondary" data-food="menu">The seven-dish menu</button>','recipe-book');

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.card=function homeRecipe(id,print=false){
 const r=BD_KITCHEN.recipe(id);if(!r)return;if(!BD_KITCHEN.state().earned.includes(id)){BD_KITCHEN.preview(id);return;}
 const sources=[[r.source,r.url],...(r.extra||[])],list=a=>a.map(t=>'<li>'+escapeHTML(t)+'</li>').join('');
 openPanel('YOUR EARNED RECIPE · THE OLIVE TABLE','<article class="print-recipe"><header><div><p class="eyebrow">UNEARTHED! · BIBLICAL DISCOVERIES · ELI’S APPRENTICE KITCHEN</p><h2>'+escapeHTML(r.title)+'</h2><p>'+escapeHTML(r.origin)+' · '+escapeHTML(r.serves)+'</p></div><img src="'+BD_KITCHEN.image('plates-'+id)+'" alt="'+escapeHTML(r.title)+'"></header><p class="recipe-meaning">'+escapeHTML(r.story)+'</p><div class="recipe-columns"><section><h3>A modern kitchen version</h3><ul>'+list(r.ingredients)+'</ul><h3>Ingredient swaps</h3><p>'+escapeHTML(r.swaps)+'</p><p><b>Allergens:</b> '+escapeHTML(r.allergens)+'</p></section><section><h3>Cook with an adult</h3><ol>'+list(r.method)+'</ol><h3>Kitchen care</h3><p>'+escapeHTML(r.safety)+'</p></section></div><section class="recipe-history"><h3>The historical source</h3><p>'+escapeHTML(r.history)+'</p>'+sources.map(([title,url])=>'<p class="recipe-source"><b>'+escapeHTML(title)+'</b><br><span>'+escapeHTML(url)+'</span></p>').join('')+'<p class="recipe-source">Safety reference: FoodSafety.gov · Safe Minimum Internal Temperatures<br>https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures</p><h3>Read the accounts</h3><p>'+escapeHTML(r.reference)+'</p><p class="recipe-source">'+escapeHTML(r.scriptureUrl)+'</p><p>'+escapeHTML(r.context)+'</p><p class="fine-print">Modern measured adaptation for supervised home cooking; not a recovered ancient recipe with modern quantities. These home versions have not been kitchen-tested by our team.</p></section><footer>Cooked with Eli · a recipe to keep and share · Unearthed! — Biblical Discoveries</footer></article><div class="actions no-recipe-print"><button class="button" data-food-print="'+id+'">Print recipe card</button><button class="button secondary" data-food-scripture="'+id+'">Read alongside Scripture</button><button class="button secondary" data-food="book">Back to Recipe Book</button><button class="button secondary" data-food-replay="'+id+'">Cook it again</button></div>','recipe-card');
 if(print){document.body.classList.add('printing-recipe');const pictures=[...$('#panel-body').querySelectorAll('img')];Promise.all(pictures.map(im=>im.decode().catch(()=>{
/* Code by Daniel using ChatGPT November 17, 2026 */
}))).then(()=>requestAnimationFrame(()=>window.print()));}

/* Code by Daniel using ChatGPT November 18, 2026 */};
BD_KITCHEN.scripture=function mealInTheAccounts(id){const r=BD_KITCHEN.recipe(id);if(!r)return;openPanel('READ IN CONTEXT · THE OLIVE TABLE','<h2>'+escapeHTML(r.reference)+'</h2><p class="lede">'+escapeHTML(r.context)+'</p><p>'+escapeHTML(r.history)+'</p><p class="fine-print">A summary for this meal study, not a quotation of the passage. Read the whole account in your Bible.</p><div class="actions"><button class="button" data-food-card="'+id+'">Return to the dish</button><button class="button secondary" data-action="gospel">The Christian hope</button></div>','food-scripture');
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.why={cut:'Smaller pieces are easier to cook or share.',stir:'Stirring spreads the heat and flavor through the stew.',knead:'Pressing and folding brings the dough together.',grind:'Grinding breaks up the ingredient and releases its flavor.',turn:'Give each side time over the heat.',drizzle:'A thin drizzle spreads the sweetness.',plate:'Set out each part of the meal so it’s ready to share.'};
BD_KITCHEN.dishes={lentils:'Lentil bowl',herbs:'Herbs',bread:'Bread',fish:'Fish',flatbread:'Flatbread',lamb:'Lamb',greens:'Bitter herbs',figs:'Fig cakes',raisins:'Raisins',dates:'Date bites',grain:'Grain',cucumber:'Vegetables',leek:'Leeks',beet:'Beet stew'};
BD_KITCHEN.pan={source:[147,275],target:[604,270],pickup:[102,72],opening:[168,104]};
BD_KITCHEN.oven={source:[500,270],target:[808,328],pickup:[135,100],opening:[107,87]};
BD_KITCHEN.station=function cookingDestination(step){
 if(step.kind==='turn')return BD_KITCHEN.pan;
 if(step.kind==='knead'&&step.ingredient==='dough')return BD_KITCHEN.oven;
 return null;
};
BD_KITCHEN.ready=function readyToServe(a){return a.work.progress>=a.step.goal&&(!a.station||a.work.heated);};
BD_KITCHEN.start=function openCookingBoard(id){
 const recipe=BD_KITCHEN.recipe(id);if(!recipe)return;
 const all=BD_KITCHEN.state(),task=BD_KITCHEN.task(id);all.last=id;all.apprentice=true;
 const index=task.stage,step=recipe.steps[index],station=BD_KITCHEN.station(step);
 const work=task.work[index]||(task.work[index]={progress:0,cuts:[],placements:[null,null,null],bins:[]});
 const ready=BD_KITCHEN.ready({step,station,work});
 const components=step.kind==='plate'?'<div class="food-components">'+recipe.plate.map((name,i)=>
  '<button data-food-component="'+i+'">'+escapeHTML(name==='herbs'&&id==='galilee'?'Cilantro':BD_KITCHEN.dishes[name]||name)+'</button>'
 ).join('')+'</div>':'';
 openPanel('ELI’S KITCHEN','<section class="kitchen-play"><div class="kitchen-canvas-wrap"><canvas id="kitchen-workbench" width="1000" height="550" tabindex="0" aria-label="Cooking workbench. Drag to use a tool or carry an ingredient. Keyboard: arrows and Space. Controller: choose the workbench, then hold A and move the stick."></canvas></div>'+
  '<aside class="kitchen-side"><div class="kitchen-heading"><h2>'+escapeHTML(recipe.title)+'</h2><small>'+ (index+1)+' / '+recipe.steps.length+'</small></div>'+
  '<p class="kitchen-speaker">Eli</p><div class="kitchen-status"><p id="kitchen-feedback" role="status"></p><progress id="kitchen-progress" max="'+(step.goal+Number(!!station))+'" value="'+work.progress+'" aria-label="This cooking step"></progress></div>'+
  '<div class="actions"><button class="button" id="food-next" '+(ready?'':'disabled')+'>'+(index===recipe.steps.length-1?'Serve →':'Next →')+'</button><button class="button secondary" id="food-help">Help</button><button class="button secondary" data-food="book">Save &amp; Recipe Book</button></div>'+
  '<details class="food-controls"><summary>Controls</summary>'+components+'<p>Drag or use arrows and Space. With a controller, choose the workbench, then hold A and move. B returns to the buttons.</p><p>'+escapeHTML(BD_KITCHEN.why[step.kind])+'</p></details></aside></section>','kitchen-work');
 const active={id,recipe,task,index,step,work,station,canvas:$('#kitchen-workbench'),cursor:[500,270],held:false,start:null,last:null,angle:0,swirl:work.progress*.18,selected:work.placements.findIndex(p=>!p)};
 if(active.selected<0)active.selected=0;
 BD_KITCHEN.active=active;
 BD_KITCHEN.restorePieces(active);
 const abort=new AbortController(),opts={signal:abort.signal};
 active.canvas.addEventListener('pointerdown',e=>{
  if(e.button!==0)return;
  e.preventDefault();active.canvas.focus({preventScroll:true});active.canvas.setPointerCapture(e.pointerId);BD_KITCHEN.begin(BD_KITCHEN.point(e));
 },opts);
 active.canvas.addEventListener('focus',BD_KITCHEN.draw,opts);
 active.canvas.addEventListener('pointermove',e=>{
  if(!active.held)return;
  e.preventDefault();BD_KITCHEN.move(BD_KITCHEN.point(e));
 },opts);
 active.canvas.addEventListener('pointerup',e=>{e.preventDefault();BD_KITCHEN.end(BD_KITCHEN.point(e));},opts);
 for(const event of ['pointercancel','blur'])active.canvas.addEventListener(event,()=>BD_KITCHEN.cancel(active),opts);
 active.canvas.addEventListener('keydown',e=>{
  if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' '].includes(e.key))return;
  e.preventDefault();e.stopPropagation();
  if(e.key===' '){if(!active.held)BD_KITCHEN.begin(active.cursor);return;}
  if(active.step.kind==='stir'&&active.held){
   active.angle+=(e.key==='ArrowLeft'||e.key==='ArrowUp'?-1:1)*.32;
   BD_KITCHEN.move([500+Math.cos(active.angle)*130,270+Math.sin(active.angle)*100]);
  }else{
   const d={ArrowLeft:[-30,0],ArrowRight:[30,0],ArrowUp:[0,-30],ArrowDown:[0,30]}[e.key];
   active.cursor=active.cursor.map((n,i)=>Math.max(15,Math.min(i?535:985,n+d[i])));
   if(active.held)BD_KITCHEN.move(active.cursor);else BD_KITCHEN.draw();
  }
 },opts);
 active.canvas.addEventListener('keyup',e=>{if(e.key===' '){e.preventDefault();e.stopPropagation();BD_KITCHEN.end(active.cursor);}},opts);
 $('#food-next').addEventListener('click',BD_KITCHEN.next,opts);
 $('#food-help').addEventListener('click',BD_KITCHEN.assist,opts);
 for(const b of document.querySelectorAll('[data-food-component]'))b.addEventListener('click',()=>{
  BD_KITCHEN.selectComponent(active,Number(b.dataset.foodComponent));
 },opts);
 const oldCleanup=game.dialogCleanup;
 game.dialogCleanup=()=>{
  abort.abort();if(BD_KITCHEN.active===active)BD_KITCHEN.active=null;
  if(oldCleanup)oldCleanup();
 };
 BD_KITCHEN.update();persist();
 /* Code by Daniel using ChatGPT November 24, 2026 */
};
BD_KITCHEN.point=function boardPoint(e){const r=BD_KITCHEN.active.canvas.getBoundingClientRect();return [(e.clientX-r.left)/r.width*1000,(e.clientY-r.top)/r.height*550];
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.inEllipse=function(point,center,radii){return point.every((n,i)=>Number.isFinite(n))&&((point[0]-center[0])/radii[0])**2+((point[1]-center[1])/radii[1])**2<1;};
BD_KITCHEN.inOval=function(point,rx,ry,cy=270){return BD_KITCHEN.inEllipse(point,[500,cy],[rx,ry]);};
BD_KITCHEN.honeyBand=function(point){return BD_KITCHEN.inOval(point,225,116)?Math.floor((point[0]-275)/75):-1;};
BD_KITCHEN.needsHeat=function(a){return !!a.station&&!a.work.heated&&(a.station===BD_KITCHEN.pan||a.work.progress>=a.step.goal);};
BD_KITCHEN.herbOffsets=[[-59,1],[0,-10],[58,6]];
BD_KITCHEN.selectComponent=function(a,index){
 a.selected=index;a.armedComponent=true;BD_KITCHEN.update();
};
BD_KITCHEN.cancel=function(a){
 if(BD_KITCHEN.active!==a)return;
 a.held=false;a.carryHeat=false;a.carryPlate=false;a.bunch=null;a.start=a.last=null;BD_KITCHEN.draw();
};
BD_KITCHEN.begin=function startKitchenGesture(p){
 const a=BD_KITCHEN.active;if(!a)return;
 a.held=true;a.start=p.slice();a.last=p.slice();a.cursor=p.slice();
 a.carryHeat=false;a.carryPlate=false;
 if(BD_KITCHEN.needsHeat(a)){
  a.carryHeat=BD_KITCHEN.inEllipse(p,a.station.source,a.station.pickup);
  BD_KITCHEN.draw();return;
 }
 a.touchedFood=a.station===BD_KITCHEN.pan?BD_KITCHEN.inEllipse(p,a.station.target,[170,101]):BD_KITCHEN.inOval(p,205,105);
 if(a.step.kind==='plate'){
  const placed=a.work.placements.findIndex(pos=>pos&&Math.hypot(pos[0]-p[0],pos[1]-p[1])<48);
  const slot=[165,498,831].findIndex(x=>BD_KITCHEN.inEllipse(p,[x,477],[108,54]));
  if(slot>=0&&!a.work.placements[slot]){
   a.selected=slot;a.carryPlate=true;
   if(a.recipe.plate[slot]==='herbs'){
    const bunches=BD_KITCHEN.herbOffsets.map(([x,y])=>Math.hypot(p[0]-(slot*333+165+x),p[1]-(473+y)));
    a.bunch=bunches.indexOf(Math.min(...bunches));a.carryPlate=bunches[a.bunch]<50;
   }
  }else if(placed>=0){a.selected=placed;a.carryPlate=true;}
  else a.carryPlate=!!a.armedComponent&&BD_KITCHEN.inOval(p,233,142,260);
  BD_KITCHEN.update();return;
 }
 BD_KITCHEN.draw();
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.move=function carryKitchenTool(p){
 const a=BD_KITCHEN.active;if(!a||!a.held)return;const last=a.last||p,dx=p[0]-last[0],dy=p[1]-last[1],distance=Math.hypot(dx,dy),k=a.step.kind,w=a.work;a.cursor=p.slice();
 if(BD_KITCHEN.needsHeat(a)||k==='plate'){BD_KITCHEN.draw();return;}
 if(k==='stir'){const r=Math.hypot(p[0]-500,(p[1]-270)*1.3),r0=Math.hypot(last[0]-500,(last[1]-270)*1.3),theta=Math.atan2(p[1]-270,p[0]-500),before=Math.atan2(last[1]-270,last[0]-500),delta=Math.atan2(Math.sin(theta-before),Math.cos(theta-before));if(r>45&&r<230&&r0>45&&r0<230&&Math.abs(delta)<1){w.progress+=Math.abs(delta);a.swirl+=delta*.62;}}
 if(k==='grind'&&p[0]>270&&p[0]<730&&p[1]>130&&p[1]<410&&distance<180)w.progress+=distance/110;
 if(k==='knead')a.touchedFood||=BD_KITCHEN.inOval(p,205,105);
 if(k==='turn')a.touchedFood||=BD_KITCHEN.inEllipse(p,a.station.target,[170,101]);
 if(k==='drizzle'){
  const bin=BD_KITCHEN.honeyBand(p);
  if(bin>=0&&!w.bins.includes(bin)&&w.progress<a.step.goal){w.bins.push(bin);(w.honey||=(Array(6).fill(null)))[bin]=p.slice();w.progress=w.bins.length;}
 }
 a.last=p.slice();BD_KITCHEN.update();

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.end=function finishKitchenGesture(p){
 const a=BD_KITCHEN.active;if(!a||!a.held)return;a.held=false;const w=a.work,k=a.step.kind,start=a.start||p,d=Math.hypot(p[0]-start[0],p[1]-start[1]);
 if(BD_KITCHEN.needsHeat(a)){
  if(a.carryHeat&&BD_KITCHEN.inEllipse(p,a.station.target,a.station.opening))w.heated=true;
  a.carryHeat=false;a.cursor=p.slice();a.last=null;BD_KITCHEN.update();persist();return;
 }
 let feedback;
 if(k==='cut'&&d>=70&&w.progress<a.step.goal&&!BD_KITCHEN.split(a,[...start,...p],true))feedback='Try a stroke across the middle of an uncut piece.';
 if((k==='knead'||k==='turn')&&d>85&&a.touchedFood)w.progress++;
 if(k==='plate'&&a.carryPlate&&BD_KITCHEN.inOval(p,233,142,260)){
  if(a.recipe.plate[a.selected]==='herbs')w.herbBunch=a.bunch??w.herbBunch??1;
  BD_KITCHEN.placeComponent(a,p);
 }
 a.carryPlate=false;a.bunch=null;
 a.cursor=p.slice();a.last=null;BD_KITCHEN.update(feedback);persist();

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.placeComponent=function placeOnePortion(a,p){
 const [x,y]=p,scale=Math.max(1,Math.hypot((x-500)/177,(y-260)/98));
 a.work.placements[a.selected]=[500+(x-500)/scale,260+(y-260)/scale];
 a.selected=a.work.placements.findIndex(pos=>!pos);if(a.selected<0)a.selected=0;
 a.work.progress=a.work.placements.filter(Boolean).length;a.armedComponent=false;
};
BD_KITCHEN.clip=function halfIngredient(poly,p,q,positive){
 const f=v=>(q[0]-p[0])*(v[1]-p[1])-(q[1]-p[1])*(v[0]-p[0]),out=[];for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],da=f(a)*(positive?1:-1),db=f(b)*(positive?1:-1);if(da>=0)out.push(a);if((da>=0)!==(db>=0)){const t=da/(da-db);out.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t]);}}return out;

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.area=function polygonArea(poly){let n=0;for(let i=0;i<poly.length;i++){const p=poly[i],q=poly[(i+1)%poly.length];n+=p[0]*q[1]-q[0]*p[1];}return Math.abs(n/2);
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.inkLine=function aCutMustCrossFood(name,p,q){
 const im=BD_ART.images['v10-ingredients-'+name];if(!im)return false;BD_KITCHEN.alpha=BD_KITCHEN.alpha||{};let mask=BD_KITCHEN.alpha[name];if(!mask){const cv=document.createElement('canvas');cv.width=im.width;cv.height=im.height;const c=cv.getContext('2d',{willReadFrequently:true});c.drawImage(im,0,0);mask=BD_KITCHEN.alpha[name]={width:im.width,height:im.height,data:c.getImageData(0,0,im.width,im.height).data};}
 const scale=Math.min(420/mask.width,220/mask.height);let hits=0;for(let i=0;i<=48;i++){const t=i/48,x=Math.floor((p[0]+(q[0]-p[0])*t)/scale+mask.width/2),y=Math.floor((p[1]+(q[1]-p[1])*t)/scale+mask.height/2);if(x>=0&&x<mask.width&&y>=0&&y<mask.height&&mask.data[(y*mask.width+x)*4+3]>130)hits++;}return hits>=2;

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.restorePieces=function restoreSavedKnifeCuts(a){a.pieces=[{polygon:[[-210,-110],[210,-110],[210,110],[-210,110]],offset:[0,0]}];for(const line of a.work.cuts)BD_KITCHEN.split(a,line,false);
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.split=function sliceActualTexture(a,line,record){
 const [x,y,u,v]=line,dx=u-x,dy=v-y,len=Math.hypot(dx,dy);if(len<1)return false;const next=[];let cut=false;
 for(const piece of a.pieces){const start=[x-500-piece.offset[0],y-270-piece.offset[1]],end=[u-500-piece.offset[0],v-270-piece.offset[1]],minX=Math.min(...piece.polygon.map(p=>p[0])),maxX=Math.max(...piece.polygon.map(p=>p[0])),minY=Math.min(...piece.polygon.map(p=>p[1])),maxY=Math.max(...piece.polygon.map(p=>p[1]));if(Math.max(start[0],end[0])<minX||Math.min(start[0],end[0])>maxX||Math.max(start[1],end[1])<minY||Math.min(start[1],end[1])>maxY){next.push(piece);continue;}const one=BD_KITCHEN.clip(piece.polygon,start,end,true),two=BD_KITCHEN.clip(piece.polygon,start,end,false);if(!BD_KITCHEN.inkLine(a.step.ingredient,start,end)||BD_KITCHEN.area(one)<1600||BD_KITCHEN.area(two)<1600){next.push(piece);continue;}cut=true;for(const [poly,sign] of [[one,1],[two,-1]])next.push({polygon:poly,offset:[piece.offset[0]-dy/len*9*sign,piece.offset[1]+dx/len*9*sign]});}
 if(cut){a.pieces=next;if(record){a.work.cuts.push(line);a.work.progress++;}}return cut;

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.instruction=function currentKitchenAction(a){
 if(BD_KITCHEN.needsHeat(a)){
  if(a.station===BD_KITCHEN.oven)return 'Slide the dough into the oven.';
  return 'Lift the '+a.step.ingredient+' into the pan.';
 }
 if(a.step.kind==='plate'){
  const herb=a.recipe.plate.indexOf('herbs');
  if(herb>=0&&!a.work.placements[herb])return 'Plate each portion. Pick just one bunch of '+(a.id==='galilee'?'cilantro.':'herbs.');
  return 'Carry each portion to the serving plate.';
 }
 return a.step.instruction;
};
BD_KITCHEN.update=function kitchenFeedback(message){
 const a=BD_KITCHEN.active;if(!a)return;
 a.work.progress=Math.min(a.step.goal,a.work.progress);
 const ready=BD_KITCHEN.ready(a);
 $('#food-next').disabled=!ready;$('#food-help').disabled=ready;
 $('#kitchen-progress').value=a.work.progress+Number(!!(a.station&&a.work.heated));
 const status=$('#kitchen-feedback'),text=ready?a.step.thought:message||BD_KITCHEN.instruction(a);
 if(status.textContent!==text)status.textContent=text;
 for(const b of document.querySelectorAll('[data-food-component]')){
  const i=Number(b.dataset.foodComponent),pressed=String(i===a.selected);
  if(b.getAttribute('aria-pressed')!==pressed)b.setAttribute('aria-pressed',pressed);
  b.classList.toggle('chosen',i===a.selected);b.classList.toggle('placed',!!a.work.placements[i]);
 }
 BD_KITCHEN.draw();BD_FIELD.updateNext();
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.assist=function oneGestureWithEli(){
 const a=BD_KITCHEN.active;if(!a||BD_KITCHEN.ready(a))return;
 const k=a.step.kind;
 if(BD_KITCHEN.needsHeat(a))a.work.heated=true;
 else if(k==='cut'){
  const vertical=[460,550,500,420,580].filter(x=>!a.work.cuts.some(([from,,to])=>Math.abs(from-x)<20&&Math.abs(to-x)<20));
  const candidates=vertical.map(x=>[x,110,x,430]).concat([245,295].map(y=>[280,y,720,y]));
  candidates.some(line=>BD_KITCHEN.split(a,line,true));
 }else if(k==='plate'){
  const i=a.work.placements.findIndex(p=>!p);if(i<0)return;
  a.selected=i;if(a.recipe.plate[i]==='herbs')a.work.herbBunch=1;
  BD_KITCHEN.placeComponent(a,[390+i*110,260+(i%2)*35]);
 }else if(k==='drizzle'){
  const i=[1,4,2,3,0,5].find(i=>!a.work.bins.includes(i));if(i===undefined)return;
  a.work.bins.push(i);a.work.progress=a.work.bins.length;
 }else a.work.progress+=k==='stir'?2:1;
 BD_KITCHEN.update();persist();

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.next=function nextCookingStep(){const a=BD_KITCHEN.active;if(!a||!BD_KITCHEN.ready(a))return;const id=a.id;if(a.index<a.recipe.steps.length-1){a.task.stage++;persist();BD_KITCHEN.start(id);return;}const s=BD_KITCHEN.state();if(!s.earned.includes(id)){s.earned.push(id);chime();}persist();BD_KITCHEN.finished(id);
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.finished=function serveAndKeep(id){
 const r=BD_KITCHEN.recipe(id),question=r.tableQuestion;
 const tableChat=question?'<details class="kitchen-table-question"><summary>A question from Eli</summary><p>'+escapeHTML(question.prompt)+'</p><div class="actions">'+question.choices.map((choice,i)=>'<button class="button secondary" data-table-answer="'+i+'" aria-pressed="false">'+escapeHTML(choice)+'</button>').join('')+'</div><p class="field-line" role="status" hidden></p></details>':'';
 const eli=BD_PEOPLE.actors().find(actor=>actor.id==='cook');
 const actions='<button class="button" data-food-card="'+id+'">Open recipe</button><button class="button secondary" data-food-print="'+id+'">Print</button><button class="button secondary" data-food="menu">Cook another</button><button class="button secondary" data-food="dining">Return to the table</button>';
 BD_PEOPLE.speak(eli,'Eli',r.finish,actions,'food-earned','<p class="recipe-added" role="status">Recipe added to your book.</p>'+tableChat);
 const answers=[...document.querySelectorAll('[data-table-answer]')];
 for(const [i,button] of answers.entries())button.addEventListener('click',()=>{
  for(const answer of answers)answer.setAttribute('aria-pressed',String(answer===button));
  const reply=$('.kitchen-table-question [role=status]');
  reply.hidden=false;reply.textContent=(i===question.correct?'Right. ':'')+question.note;
 });
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.fit=function fitIngredient(c,name,x,y,w,h,cooked=false){if(name==='raisins'){c.save();c.translate(x,y);for(let i=0;i<22;i++){const angle=i*2.399,r=Math.sqrt(i/22)*Math.min(w,h)*.35,px=Math.cos(angle)*r,py=Math.sin(angle)*r*.6;c.fillStyle=i%3?'#4b2c30':'#69423a';c.beginPath();c.ellipse(px,py,w*.055,h*.07,angle,0,Math.PI*2);c.fill();c.strokeStyle='#a47d5c66';c.lineWidth=1;c.beginPath();c.ellipse(px-2,py-2,w*.03,h*.04,angle,0,Math.PI*2);c.stroke();}c.restore();return;}const im=BD_ART.images['v10-ingredients-'+name];if(!im)return;const scale=Math.min(w/im.width,h/im.height);c.save();if(cooked)c.filter='sepia(.38) saturate(.8) brightness(.83)';c.drawImage(im,x-im.width*scale/2,y-im.height*scale/2,im.width*scale,im.height*scale);c.restore();
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.oval=function ceramicPlate(c,x,y,w,h,fill){
 c.save();
 c.shadowColor='#35241370';c.shadowBlur=17;c.shadowOffsetX=4;c.shadowOffsetY=8;
 c.fillStyle=fill||'#e9dfbc';c.beginPath();c.ellipse(x,y,w/2,h/2,0,0,Math.PI*2);c.fill();
 c.shadowColor='transparent';
 const glaze=c.createLinearGradient(x-w*.22,y-h*.48,x+w*.3,y+h*.5);
 glaze.addColorStop(0,'#fff1cd75');glaze.addColorStop(.36,'#fff1cd08');glaze.addColorStop(.76,'#422c1600');glaze.addColorStop(1,'#422c165e');
 c.fillStyle=glaze;c.fill();c.strokeStyle='#77624c';c.lineWidth=3;c.stroke();
 c.strokeStyle='#e7cf9b9e';c.lineWidth=3;c.beginPath();c.ellipse(x,y,w/2-6,h/2-5,0,0,Math.PI*2);c.stroke();
 c.strokeStyle='#596e62ab';c.lineWidth=3;c.beginPath();c.ellipse(x,y,w/2-15,h/2-11,0,0,Math.PI*2);c.stroke();
 c.restore();
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.surface=function cookingSurface(a){
 return a.step.kind==='turn'&&a.id!=='roman'?'v10-workbench-hearth':'v10-workbench-prep';
};
BD_KITCHEN.draw=function paintCookingWorkbench(){
 const a=BD_KITCHEN.active;if(!a)return;
 const c=a.canvas.getContext('2d'),k=a.step.kind,p=a.work.progress/a.step.goal;
 const surface=BD_ART.images[BD_KITCHEN.surface(a)];
 c.fillStyle=k==='turn'&&a.id!=='roman'?'#79654c':'#bf925b';
 c.fillRect(0,0,a.canvas.width,a.canvas.height);
 if(surface)c.drawImage(surface,0,0,a.canvas.width,a.canvas.height);

 if(k==='stir'||k==='grind'){
  BD_KITCHEN.oval(c,500,280,450,290,k==='stir'?(a.id==='babylon'?'#803d37':'#bb763d'):'#b5ae91');
  if(k==='stir'){
   c.save();c.beginPath();c.ellipse(500,274,194,113,0,0,Math.PI*2);c.clip();
   for(let i=0;i<22;i++){
    const angle=i*2.399+a.swirl,rad=25+Math.sqrt(i/22)*155;
    BD_KITCHEN.fit(c,a.step.ingredient,500+Math.cos(angle)*rad,274+Math.sin(angle)*rad*.55,38,27,true);
   }
   if(a.held&&BD_KITCHEN.inOval(a.cursor,185,101)){
    c.strokeStyle='#f3d2967d';c.lineWidth=4;c.lineCap='round';
    for(const radius of [18,32]){
     c.beginPath();c.ellipse(a.cursor[0],a.cursor[1],radius,radius*.54,0,a.swirl,a.swirl+3.8);c.stroke();
    }
   }
   c.restore();
  }else{
   BD_KITCHEN.fit(c,a.step.ingredient,500,270,250*(1-p*.3),150*(1-p*.45));
   c.save();c.fillStyle='#d6c29a';c.globalAlpha=p*.85;
   for(let i=0;i<36;i++){
    const angle=i*2.399,rad=Math.sqrt(i/36)*122;
    c.beginPath();c.ellipse(500+Math.cos(angle)*rad,275+Math.sin(angle)*rad*.49,3+i%5,2+i%3,angle,0,Math.PI*2);c.fill();
   }
   c.restore();
  }
 }else if(k==='plate'){
  BD_KITCHEN.paintPlating(c,a);
 }else if(k==='turn'){
  BD_KITCHEN.paintHeat(c,a,p);
 }else if(k==='cut'){
  for(const piece of a.pieces){
   c.save();c.translate(500+piece.offset[0],270+piece.offset[1]);c.beginPath();
   piece.polygon.forEach((point,i)=>i?c.lineTo(...point):c.moveTo(...point));
   c.closePath();c.clip();
   c.shadowColor='#49311b70';c.shadowBlur=12;c.shadowOffsetX=5;c.shadowOffsetY=8;
   BD_KITCHEN.fit(c,a.step.ingredient,0,0,420,220);c.restore();
  }
 }else if(k==='knead'){
  BD_KITCHEN.paintDough(c,a,p);
 }else{
  BD_KITCHEN.oval(c,500,280,480,290);
  BD_KITCHEN.fit(c,a.step.ingredient,500,270,390,210);
  BD_KITCHEN.paintHoney(c,a);
 }
 if(a.held&&k!=='plate'&&!BD_KITCHEN.needsHeat(a)&&!(a.station===BD_KITCHEN.oven&&a.work.heated))BD_KITCHEN.paintTool(c,a,k);
 const pad=BD_CONTROLLER.mode?.type==='kitchen', keyboard=a.canvas===document.activeElement&&document.body.dataset.input==='keys';
 if(pad||keyboard){
  const [x,y]=a.cursor;
  c.beginPath();c.arc(x,y,14,0,Math.PI*2);
  c.lineWidth=7;c.strokeStyle='#392917';c.stroke();
  c.lineWidth=3;c.strokeStyle='#ffedba';c.stroke();
 }
 /* Code by Daniel using ChatGPT November 24, 2026 */
};
BD_KITCHEN.portion=function servingSize(name){
 return ({fish:[222,125],lamb:[182,110],herbs:[76,66],bread:[132,91],flatbread:[145,106]})[name]||[155,104];
};
BD_KITCHEN.paintPlating=function composeMeal(c,a){
 BD_KITCHEN.oval(c,500,260,500,310);
 const carrying=a.held&&a.carryPlate&&Math.hypot(a.cursor[0]-a.start[0],a.cursor[1]-a.start[1])>8;
 for(const [i,name] of a.recipe.plate.entries()){
  const pos=a.work.placements[i],x=i*333+165,chosen=carrying&&i===a.selected;
  const cooked=['fish','lamb','bread','flatbread'].includes(name);
  const size=BD_KITCHEN.portion(name);
  if(pos&&!chosen)BD_KITCHEN.fit(c,name,...pos,...size,cooked);
  if(!pos||name==='herbs'){
   BD_KITCHEN.oval(c,x,477,218,98,i===a.selected?'#f9e3ad':'#d5b585');
   if(name==='herbs'){
    const taken=pos?(a.work.herbBunch??1):chosen?(a.bunch??1):-1;
    for(const [b,[dx,dy]] of BD_KITCHEN.herbOffsets.entries())if(b!==taken){
     c.save();c.translate(x+dx,473+dy);c.rotate((b-1)*.24);
     BD_KITCHEN.fit(c,name,0,0,58,59);c.restore();
    }
   }else if(!chosen)BD_KITCHEN.fit(c,name,x,472,size[0]*.84,Math.min(82,size[1]),cooked);
  }
 }
 if(carrying){
  const [x,y]=a.cursor,name=a.recipe.plate[a.selected];
  if(BD_KITCHEN.inOval(a.cursor,233,142,260)){
   c.fillStyle='#5d3f2930';c.beginPath();c.ellipse(x,y+17,49,15,0,0,Math.PI*2);c.fill();
  }
  BD_KITCHEN.fit(c,name,x,y-13,...BD_KITCHEN.portion(name),['fish','lamb','bread','flatbread'].includes(name));
 }
};
BD_KITCHEN.drawTarget=function showDropTarget(c,a){
 if(!a.carryHeat||!BD_KITCHEN.inEllipse(a.cursor,a.station.target,a.station.opening))return;
 c.save();c.strokeStyle='#ffd88e';c.lineWidth=3;c.beginPath();
 c.ellipse(...a.station.target,...a.station.opening,0,0,Math.PI*2);c.stroke();c.restore();
};
BD_KITCHEN.paintHeat=function turnOverHeat(c,a,p){
 const {source,target}=a.station,[x,y]=target;
 c.save();c.translate(x,y);
 c.fillStyle='#3b352d';c.beginPath();c.roundRect(153,-16,195,34,15);c.fill();
 c.shadowColor='#23160b9e';c.shadowBlur=15;c.shadowOffsetY=8;
 c.fillStyle='#33312d';c.beginPath();c.ellipse(0,0,214,133,0,0,Math.PI*2);c.fill();
 c.shadowColor='transparent';
 const iron=c.createRadialGradient(-48,-42,10,0,9,212);
 iron.addColorStop(0,'#67615a');iron.addColorStop(.7,'#44413a');iron.addColorStop(1,'#252521');
 c.fillStyle=iron;c.beginPath();c.ellipse(0,-2,191,111,0,0,Math.PI*2);c.fill();
 c.strokeStyle='#8f827463';c.lineWidth=4;c.stroke();
 c.fillStyle='#858075';c.beginPath();c.arc(175,-11,5.5,0,Math.PI*2);c.arc(175,10,5.5,0,Math.PI*2);c.fill();
 c.restore();
 if(!a.work.heated){
  BD_KITCHEN.oval(c,...source,251,140);
  const pos=a.carryHeat?a.cursor:source;
  BD_KITCHEN.drawTarget(c,a);BD_KITCHEN.fit(c,a.step.ingredient,pos[0],pos[1],222,122);
  return;
 }
 const lift=a.held&&a.touchedFood?Math.max(-1,Math.min(1,(a.cursor[0]-a.start[0])/190)):0;
 c.save();c.translate(x+lift*37,y-Math.abs(lift)*29);c.rotate(lift*.18);
 c.scale(p?-1:1,1-Math.abs(lift)*.3);
 BD_KITCHEN.fit(c,a.step.ingredient,0,0,264,151,!!p);c.restore();
};
BD_KITCHEN.paintDough=function bakeBread(c,a,p){
 const oven=BD_ART.images['v10-kitchen-oven'],at=BD_KITCHEN.oven.target;
 if(a.station){
  if(oven)BD_KITCHEN.drawOven(c,oven,at);
  else{
   c.fillStyle='#7e4c31';c.beginPath();c.roundRect(677,190,262,203,[118,118,11,11]);c.fill();
   c.fillStyle='#3f291e';c.beginPath();c.roundRect(715,245,186,125,[70,70,8,8]);c.fill();
  }
 }
 if(a.work.heated){
  BD_KITCHEN.fit(c,'flatbread',at[0],at[1]+17,149,94,true);return;
 }
 if(a.carryHeat){
  BD_KITCHEN.drawTarget(c,a);BD_KITCHEN.fit(c,a.step.ingredient,...a.cursor,223,154);return;
 }
 const push=a.held&&a.touchedFood?Math.max(-1,Math.min(1,(a.cursor[0]-a.start[0])/175)):0;
 const width=a.station?280:390;
 c.save();c.translate(500+push*42,270);c.rotate(push*.085);
 c.shadowColor='#49311b88';c.shadowBlur=16;c.shadowOffsetX=5;c.shadowOffsetY=9;
 BD_KITCHEN.fit(c,a.step.ingredient,0,0,width+Math.sin(p*8)*18+Math.abs(push)*45,210-p*30-Math.abs(push)*30);
 c.restore();
};
BD_KITCHEN.drawOven=function ovenOnTheBench(c,image,[x,y]){
 const width=286,height=width*image.height/image.width;
 c.drawImage(image,x-width/2,y-height*.79,width,height);
};
BD_KITCHEN.paintHoney=function decorateWithHoney(c,a){
 c.save();
 c.beginPath();c.ellipse(500,270,213,106,0,0,Math.PI*2);c.clip();
 c.lineCap='round';
 for(const bin of a.work.bins){
  const [x,y]=a.work.honey?.[bin]||[312+bin*75,267];
  c.beginPath();c.moveTo(x-11,y-33);c.bezierCurveTo(x+37,y-10,x-28,y+16,x+17,y+35);
  c.strokeStyle='#8f4b1bd9';c.lineWidth=11;c.stroke();
  c.strokeStyle='#e1a542';c.lineWidth=6;c.stroke();
  c.strokeStyle='#ffd982';c.lineWidth=2;c.stroke();
 }
 c.restore();
};
BD_KITCHEN.paintTool=function toolInHand(c,a,k){
 const [x,y]=a.cursor;
 c.save();c.translate(x,y);
 if(k==='cut'){
  c.rotate(Math.atan2(y-a.start[1],x-a.start[0])||Math.PI/2);
  const metal=c.createLinearGradient(0,-12,0,13);metal.addColorStop(0,'#697b7b');metal.addColorStop(.4,'#f2f1df');metal.addColorStop(1,'#94a8a5');
  c.fillStyle=metal;c.beginPath();c.moveTo(-80,-12);c.lineTo(30,-12);c.quadraticCurveTo(68,4,64,13);c.lineTo(-80,13);c.closePath();c.fill();
  c.fillStyle='#65452b';c.fillRect(-140,-10,60,22);c.fillStyle='#c5b481';c.fillRect(-112,-3,5,5);
 }else if(k==='stir'){
  c.rotate(Math.atan2(y-270,x-500)+Math.PI/2);c.fillStyle='#76502c';c.fillRect(-7,-75,14,100);
  c.beginPath();c.ellipse(0,35,19,28,0,0,Math.PI*2);c.fill();
 }else if(k==='grind'){
  const stone=c.createLinearGradient(-15,-34,8,30);stone.addColorStop(0,'#aaa38b');stone.addColorStop(1,'#51523f');
  c.fillStyle=stone;c.beginPath();c.ellipse(0,0,70,34,-.2,0,Math.PI*2);c.fill();
 }else if(k==='turn'){
  c.strokeStyle='#bdc3ac';c.lineWidth=12;c.lineJoin='round';
  c.beginPath();c.moveTo(-75,-25);c.lineTo(40,0);c.lineTo(-75,25);c.stroke();
 }else if(k==='knead'){
  c.strokeStyle='#f2dbab99';c.lineWidth=14;c.beginPath();c.ellipse(0,0,45,22,0,0,Math.PI*2);c.stroke();
 }else if(k==='drizzle'){
  c.strokeStyle='#f5bf4d';c.lineWidth=4;c.beginPath();c.moveTo(0,-27);c.lineTo(0,0);c.stroke();
  c.fillStyle='#b67937';c.beginPath();c.ellipse(-31,-48,33,22,-.45,0,Math.PI*2);c.fill();
  c.fillStyle='#e4a761';c.beginPath();c.ellipse(-9,-42,17,9,.37,0,Math.PI*2);c.fill();
 }
 c.restore();
};
BD_KITCHEN.y=function paintedFloorProjection(room,y){const from=room==='food'?[0,480,600,1024]:[0,450,700,1024],to=room==='food'?[0,620,760,1024]:[0,610,780,1024];for(let i=0;i<3;i++)if(y<=from[i+1])return to[i]+(y-from[i])/(from[i+1]-from[i])*(to[i+1]-to[i]);return y;
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.background=function calibratedKitchenPainting(c,room,im){const bands=room==='food'?[0,480,600,1024]:[0,450,700,1024];for(let i=0;i<3;i++){const y=BD_KITCHEN.y(room,bands[i]),end=BD_KITCHEN.y(room,bands[i+1]);c.drawImage(im,0,bands[i],1536,bands[i+1]-bands[i],0,y,1536,end-y);}
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.diningDetails=function diningRoomDisplays(c){
 for(const [i,recipe] of BD_RECIPES.entries()){
  const plate=BD_ART.images['v10-plates-'+recipe.id];if(!plate)continue;
  const scale=Math.min(88/plate.width,68/plate.height);
  c.drawImage(plate,475+i*90-plate.width*scale/2,653-plate.height*scale,plate.width*scale,plate.height*scale);
 }
 BD_IMMERSION.plaque(c,1260,345,180,'The Kitchen');
 BD_IMMERSION.plaque(c,118,300,165,'Olive Court ←');
};
BD_KITCHEN.stands={
 court:{x:1450,y:742,width:155,height:185,title:'FOOD COURT',subtitle:'& KITCHEN →'},
 food:{x:315,y:810,width:155,height:185,title:'THE MENU',subtitle:'SEVEN PLACES · ONE TABLE'},
};
BD_KITCHEN.paintStand=function paintedFoodSign(c,stand){
 BD_SIGNS.stand(c,stand.x,stand.y,stand.width,stand.height,stand.title,stand.subtitle);
};
BD_KITCHEN.standBounds=function foodSignFace(stand,padding=0){
 const {x,y,width,height}=stand;
 return [x-width/2-padding,y-height-padding,x+width/2+padding,y+padding];
};
BD_KITCHEN.standFootprint=function foodSignBase(stand){
 const halfBase=stand.width*.16;
 return [stand.x-halfBase,stand.y-8,stand.x+halfBase,stand.y];
};
BD_KITCHEN.paintGround=function foodRoomGround(c,time,room){
 const stand=BD_KITCHEN.stands[room],objects=stand?[{y:stand.y,paint:()=>BD_KITCHEN.paintStand(c,stand)}]:[];
 BD_MUSEUM.paintAtGround(c,time,objects);
};
BD_KITCHEN.paint=function foodCourtWorld(time){
 const c=ctx,room=BD_MUSEUM.room,cam=BD_MUSEUM.camera,im=BD_ART.images['m4-'+room];c.save();c.scale(cam.z*(cam.ax||1),cam.z*(cam.ay||1));c.translate(-cam.x,-cam.y);if(im)BD_KITCHEN.background(c,room,im);
 if(room==='food')BD_KITCHEN.diningDetails(c);
 else BD_IMMERSION.plaque(c,170,265,180,'The Food Court ←');
 BD_KITCHEN.paintGround(c,time,room);c.restore();

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.hotspots=function foodRoomObjects(){
 const room=BD_MUSEUM.room,people=BD_PEOPLE.hotspots().map(h=>{if(h.id==='person-cook')h.label='Chef Eli · cook & mentor';return h;
/* Code by Daniel using ChatGPT November 17, 2026 */
}),make=(id,box,label,point,action)=>({id,x:(box[0]+box[2])/2,y:(box[1]+box[3])/2,label,point:nearestFree(...point),action,foodBox:box});
 if(room==='food'){const spots=[make('food-return',[20,320,237,760],'Olive Court ←',[430,805],()=>BD_MUSEUM.begin('court',{arrival:[1450,870]})),make('food-menu',BD_KITCHEN.standBounds(BD_KITCHEN.stands.food),'The seven-dish menu',[415,850],BD_KITCHEN.menu),make('kitchen-door',[1160,330,1330,730],'Chef Eli’s kitchen',[1230,790],()=>BD_MUSEUM.begin('kitchen',{arrival:[350,850]}))];
 for(let i=0;i<7;i++){const r=BD_RECIPES[i];spots.push(make('dish-'+r.id,[430+i*90,580,520+i*90,660],r.title,[475+i*90,795],()=>BD_KITCHEN.preview(r.id)));}
 for(const [id,box,label,p] of [['cushions',[0,795,365,950],'Low tables & cushions',[400,930]],['roman',[1160,800,1530,960],'Roman-style reclining couch',[1080,920]],['window',[237,365,380,610],'Quiet window nook',[415,850]],['garden',[1370,580,1530,750],'Bench under the olive tree',[1375,790]]])spots.push(make('food-seat-'+id,box,label,p,()=>BD_KITCHEN.rest(id)));return spots.concat(people);}
 return [make('dining-door',[25,300,285,780],'The Food Court ←',[325,810],()=>BD_MUSEUM.begin('food',{arrival:[1210,790]})),make('prep-island',[515,620,1105,785],'The apprentice’s workbench',[810,835],BD_KITCHEN.menu)].concat(people);

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.rest=function aQuietSeat(id){
 if(id==='cushions'&&BD_ART.images['m4-food']){BD_KITCHEN.cushionView();return;}
 const choices={cushions:['A low table to share','Food can be a gift of welcome. Who might you invite to your table?',18,70],roman:['A Roman-style couch','Some Roman diners reclined. Think of the households the good news reached.',95,78],window:['The quiet window','Listen to the water. There is no hurry here.',15,52],garden:['Under the olive tree','Stay a moment. Give thanks for one good gift today.',99,52]},v=choices[id]||choices.window;
 openPanel('THE FOOD COURT · A PLACE TO LINGER','<div class="food-rest-view" style="--seat-x:'+v[2]+'%;--seat-y:'+v[3]+'%;background-image:url(&quot;'+BD_KITCHEN.image('dining')+'&quot;)"></div><h2>'+v[0]+'</h2><p class="lede">'+v[1]+'</p><div class="actions"><button class="button" data-food="dining">Return to the room</button><button class="button secondary" data-food="menu">Look at the menu</button></div>','food-rest');
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.cushionView=function sitAtTheLowTable(){
 const rect=sceneRect(),cam=BD_MUSEUM.camera;
 const sx=rect.scaleX*cam.z*(cam.ax||1),sy=rect.scaleY*cam.z*(cam.ay||1);
 openPanel('THE LOW TABLE','<div class="food-seat-scene"><h2 class="sr-only">Low tables and cushions</h2><canvas width="1536" height="1024" aria-hidden="true"></canvas><button class="button food-seat-return" autofocus>Return</button></div>','food-rest');
 const view=$('.food-seat-scene'),painting=view.querySelector('canvas'),art=painting.getContext('2d');
 BD_KITCHEN.background(art,'food',BD_ART.images['m4-food']);
 BD_KITCHEN.diningDetails(art);
 BD_KITCHEN.paintStand(art,BD_KITCHEN.stands.food);
 painting.style.setProperty('--seat-room',`translate(${rect.x-cam.x*sx}px,${rect.y-cam.y*sy}px) scale(${sx},${sy})`);

 function frameSeat(){
  const width=view.clientWidth,height=view.clientHeight;
  const zoom=Math.max(width/850,height/815);
  function frame(x,y,scale,pan=0){
   const left=Math.max(width-painting.width*scale,Math.min(0,width*.32-x*scale)-width*pan);
   const top=Math.min(0,Math.max(height-painting.height*scale,height*.72-y*scale));
   return `translate(${left}px,${top}px) scale(${scale})`;
  }
  painting.style.setProperty('--seat-close',frame(185,830,zoom));
  painting.style.setProperty('--seat-sway',frame(215,820,zoom*1.025,.018));
 }

 frameSeat();
 const resize=new ResizeObserver(frameSeat);
 resize.observe(view);
 view.querySelector('button').addEventListener('click',closePanel);
 game.dialogCleanup=()=>resize.disconnect();
};
BD_KITCHEN.water=function quietFountain(){
 const a=game.audio;if(!a)return;if(!a.foodWater){const filter=a.ac.createBiquadFilter(),gain=a.ac.createGain();filter.type='bandpass';filter.frequency.value=1100;filter.Q.value=.35;gain.gain.value=0;a.noise.connect(filter);filter.connect(gain);gain.connect(a.gain);a.foodWater=gain;}
 const on=game.scene==='museum'&&['food','court'].includes(BD_MUSEUM.room)&&!game.flight&&game.save.settings.sound&&!document.hidden;a.foodWater.gain.setTargetAtTime(on?.6:0,a.ac.currentTime,.5);

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.click=function kitchenActions(e){const b=e.target.closest('button');if(!b)return;const d=b.dataset;if(d.foodDish)BD_KITCHEN.preview(d.foodDish);else if(d.foodCook)BD_KITCHEN.apprentice(d.foodCook);else if(d.foodCard)BD_KITCHEN.card(d.foodCard);else if(d.foodPrint)BD_KITCHEN.card(d.foodPrint,true);else if(d.foodScripture)BD_KITCHEN.scripture(d.foodScripture);else if(d.foodReplay){BD_KITCHEN.state().recipes[d.foodReplay]={stage:0,work:[]};persist();BD_KITCHEN.apprentice(d.foodReplay);}else if(d.food){if(d.food==='book')BD_KITCHEN.book();else if(d.food==='menu')BD_KITCHEN.menu();else if(d.food==='cook')BD_KITCHEN.cook();else if(d.food==='apprentice')BD_KITCHEN.apprentice();else if(d.food==='dining'){closePanel();BD_MUSEUM.enter('food',{arrival:[800,905]});}else if(d.food==='kitchen')BD_KITCHEN.apprentice();}
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.install=function installMuseumFoodWing(){
 for(const room of ['food','kitchen']){BD_MUSEUM.rooms[room]={title:room==='food'?'The Food Court · The Olive Table':'The Kitchen · Eli’s Apprentices',width:1536,height:1024,images:[room],floor:770,group:room};BD_ART.perspectives.museum[room]={horizon:280,referenceY:870,height:280};}
 BD_PEOPLE_ART['food-cook']=BD_FOOD_COOK;
 const oldPrepare=BD_RESILIENCE.prepareArt;BD_RESILIENCE.prepareArt=async function foodArtCatalog(names){const missing=await oldPrepare(names);BD_ART.catalog['m4-food']='v10-dining';BD_ART.catalog['m4-kitchen']='v10-kitchen';BD_ART.catalog['v10-cook']='v10-cook';for(const name of ['v10-workbench-prep','v10-workbench-hearth','v10-kitchen-oven'])BD_ART.catalog[name]=name;for(const r of BD_RECIPES)BD_ART.catalog['v10-plates-'+r.id]='v10-plates-'+r.id;for(const name of BD_KITCHEN.ingredients)BD_ART.catalog['v10-ingredients-'+name]='v10-ingredients-'+name;return missing;
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldClean=sanitizeSave;sanitizeSave=function importCookingProgress(raw){return BD_KITCHEN.clean(raw,oldClean(raw));
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldActors=BD_PEOPLE.actors;BD_PEOPLE.actors=function theKitchenMentor(){const a=oldActors();if(['food','kitchen'].includes(BD_MUSEUM.room))a.push({id:'cook',name:'Chef Eli · cook & mentor',art:'food-cook',adult:true,p:BD_MUSEUM.room==='food'?[1130,870]:[425,820],pose:0,focus:'cook'});return a;
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldConversation=BD_PEOPLE.conversation;BD_PEOPLE.conversation=function talkToTheCook(actor){if(actor.id==='cook'){BD_KITCHEN.cook(actor);return;}oldConversation(actor);
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldGeometry=BD_MUSEUM.geometry;BD_MUSEUM.geometry=function culinaryRoomGeometry(){
 const g=oldGeometry(),room=BD_MUSEUM.room,stand=BD_KITCHEN.stands[room];
 if(stand)g.obstacles.push(BD_KITCHEN.standFootprint(stand));
 if(room==='food')g.obstacles.push([0,800,310,946],[1180,855,1536,950]);
 if(room==='kitchen')g.obstacles.push([515,710,1105,785]);
 return g;
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldSpots=BD_MUSEUM.hotspots;BD_MUSEUM.hotspots=function foodCourtDestinations(){
 const room=BD_MUSEUM.room;if(room==='food'||room==='kitchen')return BD_KITCHEN.hotspots();
 const h=oldSpots();
 if(room==='court'){
  const stand=BD_KITCHEN.stands.court;
  h.push({id:'food-court-sign',x:stand.x,y:stand.y-stand.height/2,label:'Food Court & Kitchen →',point:nearestFree(stand.x,stand.y+128),foodBox:BD_KITCHEN.standBounds(stand,7),action:()=>BD_MUSEUM.begin('food',{arrival:[430,850]})});
 }
 return h;
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldBox=BD_IMMERSION.box;BD_IMMERSION.box=function foodObjectBounds(h){return h.foodBox||oldBox(h);
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldDraw=BD_MUSEUM.draw;BD_MUSEUM.draw=function paintFoodWing(time){
 const room=BD_MUSEUM.room;
 if((room==='food'||room==='kitchen')&&!(game.roomArtLoading&&BD_RESILIENCE.roomFallback))BD_KITCHEN.paint(time);
 else oldDraw(time);
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldPack=BD_IMMERSION.pack;BD_IMMERSION.pack=function backpackRecipeBook(){oldPack();$('.pack-contents').insertAdjacentHTML('beforeend','<button class="pack-object recipe-book-object" data-food="book"><span aria-hidden="true">❦</span><b>My Recipe Book</b><small>'+BD_KITCHEN.state().earned.length+' / 7 recipes earned with Eli</small></button>');
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldPanel=BD_JOURNEY.panel;BD_JOURNEY.panel=function foodPanelStyle(kind){oldPanel(kind);$('#panel').classList.toggle('food-panel',kind.startsWith('food-')||['recipe-book','recipe-card','kitchen-work'].includes(kind));$('#panel').classList.toggle('recipe-card-panel',kind==='recipe-card');if(kind!=='recipe-card')document.body.classList.remove('printing-recipe');if(kind==='kitchen-work')$('#panel').classList.add('has-activity-step');if(kind==='museum-plan')$('#panel-body .museum-map').insertAdjacentHTML('beforeend','<div class="food-plan-link">ENTRY → OLIVE COURT → <button class="button secondary" data-food="dining">FOOD COURT</button> → <button class="button secondary" data-food="kitchen">KITCHEN</button></div>');
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldStep=BD_FIELD.nextStep;BD_FIELD.nextStep=function cookingContinuation(){if(game.dialogKind==='kitchen-work'){const target=$('#food-next');return target&&!target.disabled?{target,label:target.textContent,complete:true}:null;}return oldStep();
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldNext=BD_FIELD.updateNext;BD_FIELD.updateNext=function cookingNextInstruction(){oldNext();if(game.dialogKind==='kitchen-work'){const line=$('[data-field-next-line]');if(line&&!BD_FIELD.nextStep())line.textContent='Next: '+(BD_KITCHEN.active?BD_KITCHEN.instruction(BD_KITCHEN.active):'work at the bench');}
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldActivate=BD_CONTROLLER.activate;BD_CONTROLLER.activate=function controlCookingCanvas(el){if(el?.id==='kitchen-workbench'){BD_CONTROLLER.mode={type:'kitchen',node:el};BD_CONTROLLER.hint('Stick / D-pad moves · hold A and move · release A to finish a stroke · B controls');return;}oldActivate(el);
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldWork=BD_CONTROLLER.work;BD_CONTROLLER.work=function controllerCookingGesture(r,dt){const m=BD_CONTROLLER.mode,a=BD_KITCHEN.active;if(m?.type!=='kitchen')return oldWork(r,dt);if(!a||!m.node.isConnected){BD_CONTROLLER.endWork();return false;}if(r.b||r.start){BD_KITCHEN.cancel(a);BD_CONTROLLER.endWork();if(r.start)closePanel();else BD_CONTROLLER.focus(a.canvas);return true;}
 if(r.aHeld&&!a.held)BD_KITCHEN.begin(a.cursor);if(a.step.kind==='stir'&&r.aHeld&&(r.x||r.y))BD_KITCHEN.move([500+r.x*140,270+r.y*100]);else{a.cursor=[Math.max(20,Math.min(980,a.cursor[0]+r.x*400*dt)),Math.max(40,Math.min(525,a.cursor[1]+r.y*400*dt))];if(a.held)BD_KITCHEN.move(a.cursor);}if(!r.aHeld&&a.held)BD_KITCHEN.end(a.cursor);BD_KITCHEN.draw();return true;
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldAmbient=updateAmbient;updateAmbient=function fountainAmbience(){oldAmbient();BD_KITCHEN.water();
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 document.addEventListener('bd-art-ready',function repaintKitchenTextures(e){const a=BD_KITCHEN.active;if(a){if(a.step.kind==='cut'&&e.detail==='v10-ingredients-'+a.step.ingredient)BD_KITCHEN.restorePieces(a);BD_KITCHEN.draw();}
/* Code by Daniel using ChatGPT November 17, 2026 */
});document.addEventListener('click',BD_KITCHEN.click);window.addEventListener('afterprint',()=>document.body.classList.remove('printing-recipe'));

/* Code by Daniel using ChatGPT November 17, 2026 */
};
