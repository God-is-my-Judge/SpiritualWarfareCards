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
}),bins:Array.isArray(w.bins)?[...new Set(w.bins.filter(v=>Number.isInteger(v)&&v>=0&&v<6))]:[]});}}
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
BD_KITCHEN.cook=function meetTheCook(){
 openPanel('CHEF ELI · THE OLIVE TABLE','<div class="cook-conversation"><img src="'+BD_KITCHEN.image('cook')+'" alt="Chef Eli, your museum cooking mentor"><div><h2>There’s a place beside me.</h2><p class="field-line">Eli: “Apprentice with me, and I’ll share my secret recipes—real ones from history.”</p><p>Some recipes survive in writing. For biblical meals, we reconstruct dishes from the foods the accounts name.</p><p><b>Cook and plate each dish with me to add its recipe to your book.</b> Until then, that page stays sealed.</p><div class="actions"><button class="button" data-food="apprentice">Come into the kitchen →</button><button class="button secondary" data-food="menu">Show me the seven dishes</button><button class="button secondary" data-food="book">Open my Recipe Book</button></div></div></div>','food-cook');

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
BD_KITCHEN.start=function openCookingBoard(id){
 const recipe=BD_KITCHEN.recipe(id);if(!recipe)return;const all=BD_KITCHEN.state(),task=BD_KITCHEN.task(id);all.last=id;all.apprentice=true;const index=task.stage,step=recipe.steps[index],work=task.work[index]||(task.work[index]={progress:0,cuts:[],placements:[null,null,null],bins:[]}),complete=work.progress>=step.goal;
 openPanel('ELI’S KITCHEN · '+(index+1)+' / '+recipe.steps.length,'<div class="kitchen-heading"><small>'+escapeHTML(recipe.title)+'</small><h2>'+escapeHTML(step.instruction)+'</h2><p class="field-line">Eli: “'+escapeHTML(index===0?'We’ll make this together. Take your time.':recipe.steps[index-1].thought)+'”</p></div><div class="kitchen-canvas-wrap"><canvas id="kitchen-workbench" width="1000" height="550" tabindex="0" aria-label="'+escapeHTML(step.instruction)+' Drag on the workbench. Keyboard: arrows and hold Space. Controller: choose the board with A, then stick and hold A. One-gesture help is available."></canvas></div>'+(step.kind==='plate'?'<div class="food-components">'+recipe.plate.map((name,i)=>'<button data-food-component="'+i+'">'+escapeHTML({lentils:'Lentil bowl',herbs:'Herbs',bread:'Bread',fish:'Fish',flatbread:'Flatbread',lamb:'Lamb',greens:'Bitter herbs',figs:'Fig cakes',raisins:'Raisins',dates:'Date bites',grain:'Grain',cucumber:'Vegetables',leek:'Leeks',beet:'Beet stew'}[name]||name)+'</button>').join('')+'</div>':'')+'<div class="kitchen-status"><p id="kitchen-feedback" role="status">'+escapeHTML(complete?step.thought:BD_KITCHEN.hint(step.kind))+'</p><progress id="kitchen-progress" max="'+step.goal+'" value="'+work.progress+'" aria-label="This cooking step"></progress></div><div class="actions"><button class="button" id="food-next" '+(complete?'':'disabled')+'>'+(index===recipe.steps.length-1?'Serve and earn the recipe →':'Next preparation →')+'</button><button class="button secondary" id="food-help">Do one gesture with Eli</button><button class="button secondary" data-food="book">Save & Recipe Book</button></div><details class="food-controls"><summary>Controls &amp; real-kitchen care</summary><p>Keyboard: focus the board, use arrows and hold Space; release to finish a stroke. For stirring, hold Space and use left or right. Controller: choose the board with A, then move the stick while holding A. B returns to the buttons. Touch: drag, or choose a plating component and tap the plate.</p><p>Ask an adult before using real knives, heat or raw meat. Your earned card gives the home method and safety temperatures.</p></details><p class="fine-print">'+escapeHTML(recipe.reference)+' · '+(step.kind==='turn'?'Virtual cooking compresses time. At home an adult uses the thermometer and instructions on your earned card.':'No timer. Drag or use the controls. Help works on one gesture at a time.')+'</p>','kitchen-work');
 const active={id,recipe,task,index,step,work,canvas:$('#kitchen-workbench'),cursor:[500,270],held:false,start:null,last:null,angle:0,selected:work.placements.findIndex(p=>!p),pieces:[{polygon:[[-210,-110],[210,-110],[210,110],[-210,110]],offset:[0,0]}]};if(active.selected<0)active.selected=0;BD_KITCHEN.active=active;
 BD_KITCHEN.restorePieces(active);
 active.canvas.addEventListener('pointerdown',e=>{e.preventDefault();active.canvas.focus();active.canvas.setPointerCapture(e.pointerId);BD_KITCHEN.begin(BD_KITCHEN.point(e));
/* Code by Daniel using ChatGPT November 17, 2026 */
});active.canvas.addEventListener('pointermove',e=>{if(BD_KITCHEN.active!==active)return;active.cursor=BD_KITCHEN.point(e);if(active.held){e.preventDefault();BD_KITCHEN.move(active.cursor);}BD_KITCHEN.draw();
/* Code by Daniel using ChatGPT November 17, 2026 */
});active.canvas.addEventListener('pointerup',e=>{e.preventDefault();BD_KITCHEN.end(BD_KITCHEN.point(e));
/* Code by Daniel using ChatGPT November 17, 2026 */
});active.canvas.addEventListener('pointercancel',()=>{active.held=false;active.last=null;BD_KITCHEN.draw();
/* Code by Daniel using ChatGPT November 17, 2026 */
});
 active.canvas.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' '].includes(e.key))return;e.preventDefault();e.stopPropagation();if(e.key===' '){if(!active.held)BD_KITCHEN.begin(active.cursor);return;}if(active.step.kind==='stir'&&active.held){active.angle+=(e.key==='ArrowLeft'||e.key==='ArrowUp'?-1:1)*.32;BD_KITCHEN.move([500+Math.cos(active.angle)*130,270+Math.sin(active.angle)*100]);}else{active.cursor[0]=Math.max(25,Math.min(975,active.cursor[0]+(e.key==='ArrowRight'?30:e.key==='ArrowLeft'?-30:0)));active.cursor[1]=Math.max(25,Math.min(525,active.cursor[1]+(e.key==='ArrowDown'?30:e.key==='ArrowUp'?-30:0)));if(active.held)BD_KITCHEN.move(active.cursor);BD_KITCHEN.draw();}
/* Code by Daniel using ChatGPT November 17, 2026 */
});active.canvas.addEventListener('keyup',e=>{if(e.key===' '){e.preventDefault();e.stopPropagation();BD_KITCHEN.end(active.cursor);}
/* Code by Daniel using ChatGPT November 17, 2026 */
});
 $('#food-next').addEventListener('click',BD_KITCHEN.next);$('#food-help').addEventListener('click',BD_KITCHEN.assist);for(const b of document.querySelectorAll('[data-food-component]'))b.addEventListener('click',()=>{active.selected=Number(b.dataset.foodComponent);BD_KITCHEN.draw();
/* Code by Daniel using ChatGPT November 17, 2026 */
});
 const oldCleanup=game.dialogCleanup;game.dialogCleanup=function releaseKitchenBoard(){if(BD_KITCHEN.active===active)BD_KITCHEN.active=null;if(oldCleanup)oldCleanup();
/* Code by Daniel using ChatGPT November 17, 2026 */
};BD_KITCHEN.update();persist();

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.hint=function gestureHint(kind){return {cut:'Draw the knife across the ingredient. Each cut leaves separate pieces.',stir:'Stir around the bowl in broad circles.',knead:'Press and fold with broad back-and-forth strokes.',grind:'Roll the stone across the grain or garlic.',turn:'Drag the tongs across the food to turn it.',drizzle:'Sweep a little honey across the food.',plate:'Drag the three components onto the plate, or choose a component and tap the plate.'}[kind];
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.point=function boardPoint(e){const r=BD_KITCHEN.active.canvas.getBoundingClientRect();return [(e.clientX-r.left)/r.width*1000,(e.clientY-r.top)/r.height*550];
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.begin=function startKitchenGesture(p){const a=BD_KITCHEN.active;if(!a)return;a.held=true;a.start=p.slice();a.last=p.slice();a.cursor=p.slice();if(a.step.kind==='plate'&&p[1]>400)a.selected=Math.max(0,Math.min(2,Math.floor(p[0]/333)));BD_KITCHEN.draw();
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.move=function carryKitchenTool(p){
 const a=BD_KITCHEN.active;if(!a||!a.held)return;const last=a.last||p,dx=p[0]-last[0],dy=p[1]-last[1],distance=Math.hypot(dx,dy),k=a.step.kind,w=a.work;a.cursor=p.slice();
 if(k==='stir'){const r=Math.hypot(p[0]-500,(p[1]-270)*1.3),r0=Math.hypot(last[0]-500,(last[1]-270)*1.3),theta=Math.atan2(p[1]-270,p[0]-500),before=Math.atan2(last[1]-270,last[0]-500),delta=Math.atan2(Math.sin(theta-before),Math.cos(theta-before));if(r>45&&r<230&&r0>45&&r0<230&&Math.abs(delta)<1)w.progress+=Math.abs(delta);}
 if(k==='grind'&&p[0]>270&&p[0]<730&&p[1]>130&&p[1]<410&&distance<180)w.progress+=distance/110;
 if(k==='drizzle'&&p[0]>290&&p[0]<710&&p[1]>140&&p[1]<380){const bin=Math.min(5,Math.floor((p[0]-290)/420*6));if(!w.bins.includes(bin))w.bins.push(bin);w.progress=w.bins.length;}
 a.last=p.slice();BD_KITCHEN.update();

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.end=function finishKitchenGesture(p){
 const a=BD_KITCHEN.active;if(!a||!a.held)return;a.held=false;const w=a.work,k=a.step.kind,start=a.start||p,d=Math.hypot(p[0]-start[0],p[1]-start[1]);
 if(k==='cut'&&d>=70&&w.progress<a.step.goal)BD_KITCHEN.split(a,[...start,...p],true);
 if((k==='knead'||k==='turn')&&d>85&&Math.min(start[0],p[0])<710&&Math.max(start[0],p[0])>290&&Math.min(start[1],p[1])<400&&Math.max(start[1],p[1])>120)w.progress++;
 if(k==='plate'&&Math.pow((p[0]-500)/245,2)+Math.pow((p[1]-270)/145,2)<1){w.placements[a.selected]=p.slice();a.selected=w.placements.findIndex(p=>!p);if(a.selected<0)a.selected=0;w.progress=w.placements.filter(Boolean).length;}
 a.last=null;BD_KITCHEN.update();persist();

/* Code by Daniel using ChatGPT November 17, 2026 */
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
BD_KITCHEN.update=function kitchenFeedback(){const a=BD_KITCHEN.active;if(!a)return;const done=a.work.progress>=a.step.goal;a.work.progress=Math.min(a.step.goal,a.work.progress);$('#food-next').disabled=!done;$('#kitchen-progress').value=a.work.progress;$('#kitchen-feedback').textContent=done?a.step.thought:BD_KITCHEN.hint(a.step.kind);for(const b of document.querySelectorAll('[data-food-component]')){const i=Number(b.dataset.foodComponent);b.classList.toggle('chosen',i===a.selected);b.classList.toggle('placed',!!a.work.placements[i]);}BD_KITCHEN.draw();BD_FIELD.updateNext();
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.assist=function oneGestureWithEli(){
 const a=BD_KITCHEN.active;if(!a||a.work.progress>=a.step.goal)return;const k=a.step.kind;if(k==='cut'){const x=420+a.work.cuts.length*125;BD_KITCHEN.split(a,[x,110,x,430],true);}else if(k==='plate'){const i=a.work.placements.findIndex(p=>!p)>=0?a.work.placements.findIndex(p=>!p):a.work.placements.length;a.work.placements[i]=[390+i*110,260+(i%2)*35];a.work.progress=a.work.placements.filter(Boolean).length;}else if(k==='drizzle'){const i=[0,1,2,3,4,5].find(i=>!a.work.bins.includes(i));a.work.bins.push(i);a.work.progress=a.work.bins.length;}else a.work.progress+=k==='stir'?2:1;BD_KITCHEN.update();persist();

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.next=function nextCookingStep(){const a=BD_KITCHEN.active;if(!a||a.work.progress<a.step.goal)return;const id=a.id;if(a.index<a.recipe.steps.length-1){a.task.stage++;persist();BD_KITCHEN.start(id);return;}const s=BD_KITCHEN.state();if(!s.earned.includes(id)){s.earned.push(id);chime();}persist();BD_KITCHEN.finished(id);
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.finished=function serveAndKeep(id){const r=BD_KITCHEN.recipe(id);openPanel('ELI’S TABLE · RECIPE EARNED','<div class="food-earned"><img src="'+BD_KITCHEN.image('plates-'+id)+'" alt="Your completed '+escapeHTML(r.title)+'"><div><p class="eyebrow">THE SEAL IS OPEN</p><h2>A recipe to keep.</h2><p class="field-line">Eli: “'+escapeHTML(r.finish)+'”</p><p>'+escapeHTML(r.reference)+'</p><p><b>'+escapeHTML(r.title)+'</b> is in your Recipe Book. Keep it in the backpack, or print it for cooking with an adult.</p><div class="actions"><button class="button" data-food-card="'+id+'">Open my earned recipe →</button><button class="button secondary" data-food-print="'+id+'">Print the recipe card</button><button class="button secondary" data-food="menu">Cook another dish</button><button class="button secondary" data-food="dining">Return to the table</button></div></div></div>','food-earned');
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.fit=function fitIngredient(c,name,x,y,w,h,cooked=false){if(name==='raisins'){c.save();c.translate(x,y);for(let i=0;i<22;i++){const angle=i*2.399,r=Math.sqrt(i/22)*Math.min(w,h)*.35,px=Math.cos(angle)*r,py=Math.sin(angle)*r*.6;c.fillStyle=i%3?'#4b2c30':'#69423a';c.beginPath();c.ellipse(px,py,w*.055,h*.07,angle,0,Math.PI*2);c.fill();c.strokeStyle='#a47d5c66';c.lineWidth=1;c.beginPath();c.ellipse(px-2,py-2,w*.03,h*.04,angle,0,Math.PI*2);c.stroke();}c.restore();return;}const im=BD_ART.images['v10-ingredients-'+name];if(!im)return;const scale=Math.min(w/im.width,h/im.height);c.save();if(cooked)c.filter='sepia(.38) saturate(.8) brightness(.83)';c.drawImage(im,x-im.width*scale/2,y-im.height*scale/2,im.width*scale,im.height*scale);c.restore();
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.oval=function ceramicPlate(c,x,y,w,h,fill){c.save();c.fillStyle='#372a2040';c.beginPath();c.ellipse(x+4,y+12,w/2,h/2,0,0,Math.PI*2);c.fill();c.fillStyle=fill||'#e9dfbc';c.strokeStyle='#8f8b68';c.lineWidth=6;c.beginPath();c.ellipse(x,y,w/2,h/2,0,0,Math.PI*2);c.fill();c.stroke();c.strokeStyle='#668083';c.lineWidth=3;c.beginPath();c.ellipse(x,y,w/2-15,h/2-12,0,0,Math.PI*2);c.stroke();c.restore();
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.draw=function paintCookingWorkbench(){
 const a=BD_KITCHEN.active;if(!a)return;const c=a.canvas.getContext('2d'),k=a.step.kind,p=a.work.progress/a.step.goal;c.clearRect(0,0,1000,550);const wood=c.createLinearGradient(0,0,1000,550);wood.addColorStop(0,'#bf9157');wood.addColorStop(.5,'#e4bd7c');wood.addColorStop(1,'#986538');c.fillStyle=wood;c.fillRect(0,0,1000,550);c.strokeStyle='#80562b24';c.lineWidth=2;for(let y=35;y<550;y+=47){c.beginPath();c.moveTo(0,y);c.bezierCurveTo(300,y-15,630,y+14,1000,y-3);c.stroke();}
 if(k==='stir'||k==='grind'){BD_KITCHEN.oval(c,500,280,450,290,k==='stir'?(a.id==='babylon'?'#803d37':'#bb763d'):'#b5ae91');if(k==='stir'){c.save();c.beginPath();c.ellipse(500,274,194,113,0,0,Math.PI*2);c.clip();for(let i=0;i<22;i++){const angle=i*2.399+a.work.progress*.18,rad=25+Math.sqrt(i/22)*155;BD_KITCHEN.fit(c,a.step.ingredient,500+Math.cos(angle)*rad,274+Math.sin(angle)*rad*.55,38,27,true);}c.restore();}else{BD_KITCHEN.fit(c,a.step.ingredient,500,270,250*(1-p*.3),150*(1-p*.45));c.fillStyle='#d6c29a';c.globalAlpha=p*.85;c.beginPath();c.ellipse(500,280,130,65,0,0,Math.PI*2);c.fill();c.globalAlpha=1;}}
 else if(k==='plate'){BD_KITCHEN.oval(c,500,260,500,310);for(let i=0;i<3;i++){const pos=a.work.placements[i];if(pos)BD_KITCHEN.fit(c,a.recipe.plate[i],pos[0],pos[1],150,115,['fish','lamb','bread'].includes(a.recipe.plate[i]));else{c.fillStyle=i===a.selected?'#f6e2aa':'#d7b27c';c.strokeStyle='#805a32';c.lineWidth=2;c.fillRect(i*333+55,423,220,110);c.strokeRect(i*333+55,423,220,110);BD_KITCHEN.fit(c,a.recipe.plate[i],i*333+165,477,165,90,true);}}if(a.held&&a.start?.[1]>400)BD_KITCHEN.fit(c,a.recipe.plate[a.selected],a.cursor[0],a.cursor[1],150,100,true);}
 else if(k==='turn'){BD_KITCHEN.oval(c,500,285,500,310,'#393b30');c.strokeStyle='#c78b4c';c.lineWidth=6;for(let x=330;x<690;x+=40){c.beginPath();c.moveTo(x,190);c.lineTo(x,380);c.stroke();}c.save();c.translate(500,270);if(p)c.scale(-1,1);BD_KITCHEN.fit(c,a.step.ingredient,0,0,365,200,!!p);c.restore();}
 else if(k==='cut'){for(const piece of a.pieces){c.save();c.translate(500+piece.offset[0],270+piece.offset[1]);c.beginPath();piece.polygon.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.closePath();c.clip();BD_KITCHEN.fit(c,a.step.ingredient,0,0,420,220);c.restore();}}
 else{BD_KITCHEN.oval(c,500,280,480,290,k==='knead'?'#c5a267':'#e9dfbc');BD_KITCHEN.fit(c,a.step.ingredient,500,270,390+(k==='knead'?Math.sin(p*8)*22:0),210-(k==='knead'?p*30:0));}
 if(k==='drizzle'){c.lineCap='round';c.strokeStyle='#a8741e';c.lineWidth=9;for(const bin of a.work.bins){const x=325+bin*65;c.beginPath();c.moveTo(x,205);c.bezierCurveTo(x+28,235,x-15,290,x+25,325);c.stroke();}}
 if(a.held){const [x,y]=a.cursor;c.save();c.translate(x,y);if(k==='cut'){c.rotate(Math.atan2(y-a.start[1],x-a.start[0])||Math.PI/2);const metal=c.createLinearGradient(0,-12,0,13);metal.addColorStop(0,'#697b7b');metal.addColorStop(.4,'#f2f1df');metal.addColorStop(1,'#94a8a5');c.fillStyle=metal;c.beginPath();c.moveTo(-80,-12);c.lineTo(30,-12);c.quadraticCurveTo(68,4,64,13);c.lineTo(-80,13);c.closePath();c.fill();c.fillStyle='#65452b';c.fillRect(-140,-10,60,22);c.fillStyle='#c5b481';c.fillRect(-112,-3,5,5);}else if(k==='stir'){c.rotate(Math.atan2(y-270,x-500)+Math.PI/2);c.fillStyle='#76502c';c.fillRect(-7,-75,14,100);c.beginPath();c.ellipse(0,35,19,28,0,0,Math.PI*2);c.fill();}else if(k==='grind'){c.fillStyle='#797d70';c.beginPath();c.ellipse(0,0,70,34,-.2,0,Math.PI*2);c.fill();}else if(k==='turn'){c.strokeStyle='#bdc3ac';c.lineWidth=12;c.beginPath();c.moveTo(-75,-25);c.lineTo(40,0);c.lineTo(-75,25);c.stroke();}else if(k==='knead'){c.strokeStyle='#f2dbab99';c.lineWidth=14;c.beginPath();c.ellipse(0,0,45,22,0,0,Math.PI*2);c.stroke();}c.restore();}


/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.y=function paintedFloorProjection(room,y){const from=room==='food'?[0,480,600,1024]:[0,450,700,1024],to=room==='food'?[0,620,760,1024]:[0,610,780,1024];for(let i=0;i<3;i++)if(y<=from[i+1])return to[i]+(y-from[i])/(from[i+1]-from[i])*(to[i+1]-to[i]);return y;
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.background=function calibratedKitchenPainting(c,room,im){const bands=room==='food'?[0,480,600,1024]:[0,450,700,1024];for(let i=0;i<3;i++){const y=BD_KITCHEN.y(room,bands[i]),end=BD_KITCHEN.y(room,bands[i+1]);c.drawImage(im,0,bands[i],1536,bands[i+1]-bands[i],0,y,1536,end-y);}
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.paint=function foodCourtWorld(time){
 const c=ctx,room=BD_MUSEUM.room,cam=BD_MUSEUM.camera,im=BD_ART.images['m4-'+room];c.save();c.scale(cam.z*(cam.ax||1),cam.z*(cam.ay||1));c.translate(-cam.x,-cam.y);if(im)BD_KITCHEN.background(c,room,im);
 if(room==='food'){for(let i=0;i<7;i++){const im=BD_ART.images['v10-plates-'+BD_RECIPES[i].id];if(im){const scale=Math.min(88/im.width,68/im.height);c.drawImage(im,475+i*90-im.width*scale/2,653-im.height*scale,im.width*scale,im.height*scale);}}BD_KITCHEN.sign(c,315,795,155,'THE MENU','SEVEN PLACES · ONE TABLE');BD_IMMERSION.plaque(c,1260,345,180,'The Kitchen');BD_IMMERSION.plaque(c,118,300,165,'Olive Court ←');}
 else BD_IMMERSION.plaque(c,170,265,180,'The Food Court ←');
 const people=BD_PEOPLE.actors().map(actor=>({y:actor.p[1],draw:()=>BD_PEOPLE.paint(c,actor)}));people.push({y:game.player.y,draw:()=>BD_ART.traveler(c,game.player,time,game.save.settings.reduced)});people.sort((a,b)=>a.y-b.y);for(const p of people)p.draw();c.restore();

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.sign=function woodenMenuStand(c,x,y,w,title,sub){c.save();c.fillStyle='#64533a';c.fillRect(x-5,y-100,10,98);c.beginPath();c.ellipse(x,y,w*.3,9,0,0,Math.PI*2);c.fill();c.fillStyle='#795635';c.strokeStyle='#ceb67b';c.lineWidth=3;c.fillRect(x-w/2,y-185,w,95);c.strokeRect(x-w/2+4,y-181,w-8,87);c.fillStyle='#f5e1ad';c.font='18px Georgia';c.textAlign='center';c.fillText(title,x,y-151,w-18);c.font='11px Georgia';c.fillText(sub,x,y-121,w-15);c.restore();
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.courtSign=function kitchenWayfinding(c){BD_KITCHEN.sign(c,1450,742,155,'FOOD COURT','& KITCHEN →');
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.hotspots=function foodRoomObjects(){
 const room=BD_MUSEUM.room,people=BD_PEOPLE.hotspots().map(h=>{if(h.id==='person-cook')h.label='Chef Eli · cook & mentor';return h;
/* Code by Daniel using ChatGPT November 17, 2026 */
}),make=(id,box,label,point,action)=>({id,x:(box[0]+box[2])/2,y:(box[1]+box[3])/2,label,point:nearestFree(...point),action,foodBox:box});
 if(room==='food'){const spots=[make('food-return',[20,320,260,760],'Olive Court ←',[430,805],()=>BD_MUSEUM.begin('court',{arrival:[1450,870]})),make('food-menu',[235,590,395,805],'The seven-dish menu',[485,835],BD_KITCHEN.menu),make('kitchen-door',[1160,330,1330,730],'Chef Eli’s kitchen',[1230,790],()=>BD_MUSEUM.begin('kitchen',{arrival:[350,850]}))];
 for(let i=0;i<7;i++){const r=BD_RECIPES[i];spots.push(make('dish-'+r.id,[430+i*90,580,520+i*90,660],r.title,[475+i*90,795],()=>BD_KITCHEN.preview(r.id)));}
 for(const [id,box,label,p] of [['cushions',[0,800,310,950],'Low tables & cushions',[400,930]],['roman',[1160,800,1530,960],'Roman-style reclining couch',[1080,920]],['window',[230,580,390,735],'Quiet window nook',[420,790]],['garden',[1370,580,1530,750],'Bench under the olive tree',[1375,790]]])spots.push(make('food-seat-'+id,box,label,p,()=>BD_KITCHEN.rest(id)));return spots.concat(people);}
 return [make('dining-door',[25,300,285,780],'The Food Court ←',[325,810],()=>BD_MUSEUM.begin('food',{arrival:[1210,790]})),make('prep-island',[515,620,1105,785],'The apprentice’s workbench',[810,835],BD_KITCHEN.menu)].concat(people);

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_KITCHEN.rest=function aQuietSeat(id){const choices={cushions:['A low table to share','Food can be a gift of welcome. Who might you invite to your table?',18,70],roman:['A Roman-style couch','Some Roman diners reclined. Think of the households the good news reached.',95,78],window:['The quiet window','Listen to the water. There is no hurry here.',15,52],garden:['Under the olive tree','Stay a moment. Give thanks for one good gift today.',99,52]},v=choices[id]||choices.window;openPanel('THE FOOD COURT · A PLACE TO LINGER','<div class="food-rest-view" style="--seat-x:'+v[2]+'%;--seat-y:'+v[3]+'%;background-image:url(&quot;'+BD_KITCHEN.image('dining')+'&quot;)"></div><h2>'+v[0]+'</h2><p class="lede">'+v[1]+'</p><div class="actions"><button class="button" data-food="dining">Return to the room</button><button class="button secondary" data-food="menu">Look at the menu</button></div>','food-rest');
/* Code by Daniel using ChatGPT November 17, 2026 */
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
 const oldPrepare=BD_RESILIENCE.prepareArt;BD_RESILIENCE.prepareArt=async function foodArtCatalog(names){const missing=await oldPrepare(names);BD_ART.catalog['m4-food']='v10-dining';BD_ART.catalog['m4-kitchen']='v10-kitchen';BD_ART.catalog['v10-cook']='v10-cook';for(const r of BD_RECIPES)BD_ART.catalog['v10-plates-'+r.id]='v10-plates-'+r.id;for(const name of BD_KITCHEN.ingredients)BD_ART.catalog['v10-ingredients-'+name]='v10-ingredients-'+name;return missing;
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldClean=sanitizeSave;sanitizeSave=function importCookingProgress(raw){return BD_KITCHEN.clean(raw,oldClean(raw));
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldActors=BD_PEOPLE.actors;BD_PEOPLE.actors=function theKitchenMentor(){const a=oldActors();if(['food','kitchen'].includes(BD_MUSEUM.room))a.push({id:'cook',name:'Chef Eli · cook & mentor',art:'food-cook',adult:true,p:BD_MUSEUM.room==='food'?[1130,870]:[425,820],pose:0,focus:'cook'});return a;
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldConversation=BD_PEOPLE.conversation;BD_PEOPLE.conversation=function talkToTheCook(actor){if(actor.id==='cook'){BD_KITCHEN.cook();return;}oldConversation(actor);
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldGeometry=BD_MUSEUM.geometry;BD_MUSEUM.geometry=function culinaryRoomGeometry(){const g=oldGeometry();if(BD_MUSEUM.room==='food')g.obstacles.push([0,800,310,946],[1180,855,1536,950],[238,748,392,795]);if(BD_MUSEUM.room==='kitchen')g.obstacles.push([515,710,1105,785]);return g;
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldSpots=BD_MUSEUM.hotspots;BD_MUSEUM.hotspots=function foodCourtDestinations(){if(['food','kitchen'].includes(BD_MUSEUM.room))return BD_KITCHEN.hotspots();const h=oldSpots();if(BD_MUSEUM.room==='court')h.push({id:'food-court-sign',x:1450,y:610,label:'Food Court & Kitchen →',point:nearestFree(1450,870),foodBox:[1365,548,1530,748],action:()=>BD_MUSEUM.begin('food',{arrival:[430,850]})});return h;
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldBox=BD_IMMERSION.box;BD_IMMERSION.box=function foodObjectBounds(h){return h.foodBox||oldBox(h);
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldDraw=BD_MUSEUM.draw;BD_MUSEUM.draw=function paintFoodWing(time){if(['food','kitchen'].includes(BD_MUSEUM.room)){if(game.roomArtLoading&&BD_RESILIENCE.roomFallback)oldDraw(time);else BD_KITCHEN.paint(time);return;}oldDraw(time);if(BD_MUSEUM.room==='court'){const c=ctx,cam=BD_MUSEUM.camera;c.save();c.scale(cam.z*(cam.ax||1),cam.z*(cam.ay||1));c.translate(-cam.x,-cam.y);BD_KITCHEN.courtSign(c);c.restore();}
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
 const oldNext=BD_FIELD.updateNext;BD_FIELD.updateNext=function cookingNextInstruction(){oldNext();if(game.dialogKind==='kitchen-work'){const line=$('[data-field-next-line]');if(line&&!BD_FIELD.nextStep())line.textContent='Next: '+BD_KITCHEN.hint(BD_KITCHEN.active?.step.kind||'cut');}
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldActivate=BD_CONTROLLER.activate;BD_CONTROLLER.activate=function controlCookingCanvas(el){if(el?.id==='kitchen-workbench'){BD_CONTROLLER.mode={type:'kitchen',node:el};BD_CONTROLLER.hint('Stick / D-pad moves · hold A and move · release A to finish a stroke · B controls');return;}oldActivate(el);
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldWork=BD_CONTROLLER.work;BD_CONTROLLER.work=function controllerCookingGesture(r,dt){const m=BD_CONTROLLER.mode,a=BD_KITCHEN.active;if(m?.type!=='kitchen')return oldWork(r,dt);if(!a||!m.node.isConnected){BD_CONTROLLER.endWork();return false;}if(r.b||r.start){a.held=false;BD_CONTROLLER.endWork();if(r.start)closePanel();else BD_CONTROLLER.focus(a.canvas);return true;}
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
