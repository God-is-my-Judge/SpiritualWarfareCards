'use strict';
const $=function select(selector){return document.querySelector(selector);
/* Code by Daniel using ChatGPT November 15, 2026 */
};
const SAVE_KEY='biblical-discovery-expedition-v1';
const W=1536,H=1024;
const PLINTHS=[
  {x:205,y:714,w:235,h:150,depth:825,approach:[477,850],obstacle:[12,680,420,835]},
  {x:372,y:562,w:170,h:124,depth:635,approach:[585,665],obstacle:[220,545,530,640]},
  {x:522,y:485,w:130,h:100,depth:530,approach:[697,559],obstacle:[412,476,635,535]},
  {x:1275,y:493,w:138,h:105,depth:535,approach:[1090,565],obstacle:[1170,478,1395,540]},
  {x:1354,y:567,w:175,h:125,depth:644,approach:[1100,674],obstacle:[1210,548,1510,650]},
  {x:1430,y:733,w:205,h:153,depth:844,approach:[1132,860],obstacle:[1285,688,1536,850]}
];
const canvas=$('#world'),ctx=canvas.getContext('2d');
const game={ready:false,save:null,scene:'museum',hall:'ot',site:null,player:{x:805,y:855,facingX:1,facingY:1,walking:false,kind:'girl'},path:[],pending:null,keys:new Set(),hotspots:[],nearest:null,flight:null,hallTransition:null,dialogCleanup:null,dialogKind:null,dirty:true,lastFrame:0,lastPaint:0,audio:null,touchMove:null};
window.BD_GAME=game;

function escapeHTML(value){return String(value??'').replace(/[&<>"']/g,function escapeCharacter(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
/* Code by Daniel using ChatGPT November 15, 2026 */
});
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function defaultSave(){
  return {version:1,finds:{},digs:{},bookmarks:{},routes:[],visitedSites:[],traveler:'girl',edition:'long',hall:'ot',museum:{room:'entry',visited:['entry']},welcomed:false,metPeople:[],explorerName:'',settings:{textSize:100,focusView:true,guidedPauses:true,sound:true,volume:.08,reduced:matchMedia('(prefers-reduced-motion: reduce)').matches,labels:true,scholars:true,links:true/* Claude, 23 Nov 2026: web links on by default */},lastSite:null};
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function sanitizeSave(raw){
  if(!raw||raw.version!==1||!raw.finds||typeof raw.finds!=='object'||Array.isArray(raw.finds))throw Error('This is not an Unearthed! progress file.');
  const clean=defaultSave();
  for(const site of BD_SITES){
    if(raw.finds[site.id])clean.finds[site.id]={date:typeof raw.finds[site.id].date==='string'?raw.finds[site.id].date.slice(0,40):'Imported discovery'};
    const d=raw.digs?.[site.id];
    if(d&&typeof d==='object')clean.digs[site.id]={recorded:!!d.recorded,cleared:Array.isArray(d.cleared)?[...new Set(d.cleared.filter(function validCell(n){return Number.isInteger(n)&&n>=0&&n<140;
/* Code by Daniel using ChatGPT November 15, 2026 */
}))]:[],seen:Array.isArray(d.seen)?[...new Set(d.seen.filter(function validDetail(n){return Number.isInteger(n)&&n>=0&&n<5;
/* Code by Daniel using ChatGPT November 15, 2026 */
}))]:[],fitted:Array.isArray(d.fitted)?[...new Set(d.fitted.filter(function validPiece(n){return Number.isInteger(n)&&n>=0&&n<3;
/* Code by Daniel using ChatGPT November 15, 2026 */
}))]:[]};
  }
  for(const site of BD_SITES){
    const culture=raw.digs?.[site.id]?.culture;
    if(clean.digs[site.id] && culture && typeof culture==='object')clean.digs[site.id].culture=BD_CULTURE.clean(site,culture);
  }
  for(const book of BD_BOOKS)for(const edition of ['short','long']){
    const key=book.id+'-'+edition,value=raw.bookmarks?.[key];if(Number.isInteger(value)&&value>=0&&value<book.editions[edition].pages.length)clean.bookmarks[key]=value;
  }
  clean.routes=Array.isArray(raw.routes)?raw.routes.filter(function validRoute(pair){return Array.isArray(pair)&&pair.length===2&&pair.every(function validId(id){return BD_SITES.some(function matchSite(s){return s.id===id;
/* Code by Daniel using ChatGPT November 15, 2026 */
});
/* Code by Daniel using ChatGPT November 15, 2026 */
});
/* Code by Daniel using ChatGPT November 15, 2026 */
}).slice(-30):[];
  clean.traveler=raw.traveler==='boy'?'boy':'girl';clean.edition=raw.edition==='short'?'short':'long';clean.hall=raw.hall==='nt'?'nt':'ot';clean.welcomed=!!raw.welcomed;
  clean.lastSite=BD_SITES.some(function matchesSite(s){return s.id===raw.lastSite;
/* Code by Daniel using ChatGPT November 15, 2026 */
})?raw.lastSite:null;
  for(const site of BD_SITES){const patient=BD_STUDY.cleanSaved(raw.digs?.[site.id]?.patient);if(patient){if(!clean.digs[site.id])clean.digs[site.id]={recorded:false,cleared:[],seen:[],fitted:[]};clean.digs[site.id].patient=patient;}}
  if(raw.settings){clean.settings.controllerMapping=['auto','standard','f310-direct'].includes(raw.settings.controllerMapping)?raw.settings.controllerMapping:'auto';clean.settings.guidedPauses=raw.settings.guidedPauses!==false;clean.settings.sound=!!raw.settings.sound;clean.settings.reduced=!!raw.settings.reduced;clean.settings.labels=raw.settings.labels!==false;clean.settings.volume=Number.isFinite(raw.settings.volume)?Math.max(0,Math.min(.4,raw.settings.volume)):.16;}
  const allowed=['front','entry','scroll','table','story','ot-1','ot-2','ot-3','nt-1','nt-2','nt-3','garden','court','survey','bend','water','siloam'];if(raw.museum){clean.museum={room:allowed.includes(raw.museum.room)?raw.museum.room:'entry',visited:Array.isArray(raw.museum.visited)?[...new Set(['entry',...raw.museum.visited.filter(function(id){return allowed.includes(id);
/* Code by Daniel using ChatGPT November 15, 2026 */
})])]:['entry']};}
  const modelIds=['land','tel','qumran','masada','lake','jerusalem'];clean.museum.modelVisits=Array.isArray(raw.museum?.modelVisits)?[...new Set(raw.museum.modelVisits.filter(function(id){return typeof id==='string'&&modelIds.some(function(key){return id.startsWith(key+'-');
/* Code by Daniel using ChatGPT November 15, 2026 */
})&&/^[a-z]+-[0-3]$/.test(id);
/* Code by Daniel using ChatGPT November 15, 2026 */
}))].slice(0,25):[];clean.museum.docentGreeted=!!raw.museum?.docentGreeted;clean.visitedSites=[...new Set([...(Array.isArray(raw.visitedSites)?raw.visitedSites:[]),...Object.keys(raw.digs||{}),...Object.keys(clean.finds),clean.lastSite].filter(function(id){return BD_SITES.some(function(s){return s.id===id;
/* Code by Daniel using ChatGPT November 15, 2026 */
});
/* Code by Daniel using ChatGPT November 15, 2026 */
}))];
  return BD_FIELD_GAMES.clean(raw,BD_ADVENTURE.clean(raw,BD_FIELD.clean(raw,BD_JOURNEY.clean(raw,clean))));
/* Code by Daniel using ChatGPT November 18, 2026 */}

function loadSave(){
  let save=defaultSave();
  try{const raw=localStorage.getItem(SAVE_KEY);if(raw)save=sanitizeSave(JSON.parse(raw));}catch(error){console.info('Progress storage could not be read; a fresh expedition is available.',error.message);}
  return save;
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function persist(){
  try{localStorage.setItem(SAVE_KEY,JSON.stringify(game.save));}
  catch(error){if(!game.storageWarning){game.storageWarning=true;toast('Browser saving is unavailable. Settings → Export progress keeps a copy.');}}
  game.dirty=true;updateCounts();
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function updateCounts(){
  const count=Object.keys(game.save.finds).length;
  $('#journal-count').textContent=String(count);$('#collection-count').textContent=String(count).padStart(2,'0');
  $('#sound-button').innerHTML='♫ <span>Sound '+(game.save.settings.sound?'on':'off')+'</span>';
  $('#sound-button').setAttribute('aria-pressed',String(game.save.settings.sound));
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function toast(message){
  const el=$('#toast');el.textContent=message;el.classList.add('visible');clearTimeout(game.toastTimer);
  game.toastTimer=setTimeout(function hideToast(){el.classList.remove('visible');
/* Code by Daniel using ChatGPT November 15, 2026 */
},4600);
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function openPanel(label,html,kind){
  if(game.hallTransition)BD_MUSEUM.finish();
  if(game.dialogCleanup){game.dialogCleanup();game.dialogCleanup=null;}
  game.path=[];game.pending=null;game.keys.clear();game.touchMove=null;game.player.walking=false;
  const panel=$('#panel');
  game.dialogKind=kind||label;
  const inField=game.scene==='site'||(game.scene==='museum'&&BD_ADVENTURE.rooms.includes(BD_MUSEUM.room));
  panel.dataset.kind=game.dialogKind;
  panel.dataset.paper=game.dialogKind==='water-application'?'letter':inField||['briefing','water-dossier','water-guide'].includes(game.dialogKind)?'field':'museum';
  panel.classList.toggle('evidence-card',game.dialogKind==='card');$('#panel-label').textContent=label;$('#panel-body').innerHTML=html;
  if(!panel.open)panel.showModal();
  panel.scrollTop=0;
  const heading=$('#panel-body h2');if(heading)heading.id='panel-title';BD_JOURNEY.panel(game.dialogKind);
  game.dirty=true;
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function closePanel(){
  BD_JOURNEY.stopReading();
  if(game.dialogCleanup){game.dialogCleanup();game.dialogCleanup=null;}
  if($('#panel').open)$('#panel').close();game.dialogKind=null;game.keys.clear();game.player.walking=false;game.dirty=true;
  canvas.focus({preventScroll:true});
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function sceneGeometry(){
 if(game.scene==='museum')return BD_MUSEUM.geometry();
 if(game.scene==='cabin')return {bounds:[625,465,1230,1000],obstacles:[[645,520,785,715],[1130,575,1536,800],[860,400,1000,530]]};
 if(game.site)return BD_CAMP.geometry(game.site);
 return {bounds:[75,620,1470,1000],obstacles:[[180,605,625,700],[1260,610,1536,760]]};
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function walkable(x,y,padding=16){
  const {bounds,obstacles}=sceneGeometry();
  if(x<bounds[0]||y<bounds[1]||x>bounds[2]||y>bounds[3])return false;
  return !obstacles.some(function blocked(b){return x>b[0]-padding&&x<b[2]+padding&&y>b[1]-padding&&y<b[3]+padding;
/* Code by Daniel using ChatGPT November 15, 2026 */
});
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function nearestFree(x,y){
  if(walkable(x,y))return [x,y];
  for(let radius=20;radius<650;radius+=20)for(let a=0;a<32;a++){
    const nx=x+Math.cos(a*Math.PI/16)*radius,ny=y+Math.sin(a*Math.PI/16)*radius;if(walkable(nx,ny))return [nx,ny];
  }
  return [805,870];
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function findPath(start,destination){
 const geo=sceneGeometry(),b=geo.bounds,boxes=geo.obstacles.map(function paddedBox(box){return [box[0]-16,box[1]-16,box[2]+16,box[3]+16];
/* Code by Daniel using ChatGPT November 15, 2026 */
});
 // A route is planned against one snapshot; movement still checks the current scene each frame.
 const canStand=function standInSnapshot(x,y){return x>=b[0]&&y>=b[1]&&x<=b[2]&&y<=b[3]&&!boxes.some(function blocks(box){return x>box[0]&&x<box[2]&&y>box[1]&&y<box[3];
/* Code by Daniel using ChatGPT November 15, 2026 */
});
/* Code by Daniel using ChatGPT November 15, 2026 */
};
 return BD_MOTION.route(start,destination,{canStand,nearestFree,width:b[2]+40,height:b[3]+40});
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function walkTo(point,action){
  if(BD_SCROLL.active())BD_SCROLL.close(true);
  if(game.flight||game.hallTransition||$('#panel').open)return;
  const path=findPath([game.player.x,game.player.y],point);
  if(!path.length){toast('Try the open path beside the display, or use the Scene guide.');return;}
  game.path=path;game.pending=action||null;game.dirty=true;canvas.focus({preventScroll:true});


/* Code by Daniel using ChatGPT November 16, 2026 */
}

function sceneRect(){BD_MUSEUM.syncView();const r=canvas.getBoundingClientRect();if(BD_CAMP.active())return BD_CAMP.rect(r);const scale=Math.min(r.width/W,r.height/H);return BD_MUSEUM.fillsViewport()?{x:r.left,y:r.top,scale:r.width/W,scaleX:r.width/W,scaleY:r.height/H}:{x:r.left+(r.width-W*scale)/2,y:r.top+(r.height-H*scale)/2,scale,scaleX:scale,scaleY:scale};

/* Code by Daniel using ChatGPT November 16, 2026 */
}

function eventPoint(event){const r=sceneRect(),p=[(event.clientX-r.x)/r.scaleX,(event.clientY-r.y)/r.scaleY];return BD_MUSEUM.hasSceneCamera()?BD_MUSEUM.world(p):p;

/* Code by Daniel using ChatGPT November 16, 2026 */
}

function positionHotspots(){const rect=sceneRect(),view=$('#hotspots').getBoundingClientRect(),drift=BD_VIEW.scale();for(const button of $('#hotspots').children){const h=game.hotspots.find(function(hot){return hot.id===button.dataset.hotspot;
/* Code by Daniel using ChatGPT November 15, 2026 */
});if(!h)continue;const p=BD_MUSEUM.hasSceneCamera()?BD_MUSEUM.screen([h.x,h.y]):[h.x,h.y];button.hidden=p[0]<35||p[0]>W-35||p[1]<70||p[1]>H-20;button.style.left=((rect.x-view.left+p[0]*rect.scaleX)/drift)+'px';button.style.top=((rect.y-view.top+p[1]*rect.scaleY)/drift)+'px';}


/* Code by Daniel using ChatGPT November 16, 2026 */
}

function makeHotspots(){
  if(game.scene==='museum'){game.hotspots=BD_MUSEUM.hotspots();
  }else if(game.scene==='cabin'){
    game.hotspots=[{id:'map-table',x:620,y:410,label:'Map table',icon:'⌖',point:[812,740],action:showAtlas},{id:'bookshelf',x:420,y:580,label:'The flying library',icon:'▥',point:[810,800],action:showLibrary},{id:'lab',x:1260,y:500,label:'Conservation lab',icon:'⌕',point:[1060,750],action:showLabSelection},{id:'crew',x:980,y:390,label:'Meet the crew',icon:'…',point:[1015,555],action:showCrew},{id:'museum-return',x:965,y:960,label:'Return to museum',icon:'⌂',point:[960,925],action:function returnMuseum(){BD_MUSEUM.enter('front');
/* Code by Daniel using ChatGPT November 15, 2026 */
}}];
  }else{game.hotspots=BD_CAMP.hotspots(game.site);}
  $('#hotspots').innerHTML=game.hotspots.map(function hotspotHTML(h){return '<button class="hotspot '+(h.kind||'')+' '+(h.kind==='exhibit'&&!game.save.finds[h.id]?'empty':'')+'" data-hotspot="'+h.id+'" aria-label="'+escapeHTML(h.label)+'"><span class="pin" aria-hidden="true">'+h.icon+'</span><span class="hotspot-label"'+(!game.save.settings.labels?' hidden':'')+'>'+escapeHTML(h.label)+'</span></button>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('');
  positionHotspots();
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function setScene(scene,site=null,hall,options={}){
  if(scene==='museum'){BD_MUSEUM.enter(options.room||'entry',options);return;}
  BD_SCROLL.reset();
  const lookBack=$('#museum-look-back');if(lookBack)lookBack.hidden=true;
  if(game.scene==='museum'){
    BD_RESILIENCE.leaveRoom();
    BD_PEOPLE.changeRoom(BD_MUSEUM.key(),'outside');
  }
  closePanel();game.scene=scene;game.site=site;game.hall=hall||(scene==='site'?site.hall:game.save.hall);game.save.hall=game.hall;
  BD_CAMP.zone=site?.id==='thebes'&&options.zone==='ridge'?'ridge':'camp';
  game.path=[];game.pending=null;game.nearest=null;
  const arrival=options.arrival||(scene==='cabin'?[965,915]:scene==='site'?BD_CAMP.arrival(site):[805,880]);
  [game.player.x,game.player.y]=nearestFree(...arrival);game.player.walking=false;game.player.facingX=0;game.player.facingY=-1;game.player.facingAngle=-Math.PI/2;game.player.renderDirection=6;game.player.speed=game.player.vx=game.player.vy=game.player.walkBlend=0;
  $('.hall-switch').style.visibility=scene==='museum'?'visible':'hidden';
  for(const tab of document.querySelectorAll('.hall-switch button')){const selected=tab.dataset.action==='hall-'+game.hall;tab.classList.toggle('selected',selected);tab.setAttribute('aria-pressed',String(selected));}
  for(const nav of document.querySelectorAll('.nav-button'))nav.classList.toggle('active',nav.dataset.action==='museum'&&scene==='museum');
  $('#scene-title').textContent=scene==='museum'?'The Discovery Museum':scene==='cabin'?'The expedition aircraft':BD_CAMP.isRidge(site)?site.place+' · Ridge walk':site.place;
  $('#place-label').textContent=scene==='museum'?'SOUTH BAY, CALIFORNIA':scene==='cabin'?'THE KINGFISHER · RESTORED EXPEDITION AIRCRAFT':site.country.toUpperCase()+' · '+site.coords[1].toFixed(2)+'° N / '+site.coords[0].toFixed(2)+'° E';
  $('#scene-note').textContent=scene==='museum'?'Your crew is waiting at the aircraft.':scene==='cabin'?'Twelve finds, from Egypt to the world of the early church.':site.hook;
  $('#room-label').textContent=scene==='museum'?(game.hall==='ot'?'WEST HALL · THE OLD TESTAMENT':'EAST HALL · THE NEW TESTAMENT'):scene==='cabin'?'ABOARD THE KINGFISHER':'FIELD EXPEDITION '+String(site.art+1).padStart(2,'0')+' · '+site.place;
  $('#room-caption').textContent=scene==='museum'?(game.hall==='ot'?'Kings, kingdoms & the written word':'The world of Jesus & the early church'):scene==='cabin'?'Every journey begins with a question':site.title;
  canvas.setAttribute('aria-label',scene==='museum'?'Explore your museum. Arrow keys or WASD walk. E investigates. Use the Scene guide for all displays.':scene==='cabin'?'Explore the aircraft. Visit the map, library, lab, or crew. Use the Scene guide for accessible choices.':'Explore the illustrated field site. Investigate the find, read a briefing, or visit the study station. Scene guide lists all places.');
  $('#nearby').textContent=scene==='museum'?'Follow the brass line, stop at a display, or choose an expedition.':scene==='cabin'?'Your map, books, and study equipment are always here.':'Start at the excavation. The field briefing and study station are nearby.';
  if(scene==='cabin'){BD_MUSEUM.camera={x:0,y:0,z:1};BD_MUSEUM.update(0,true);}
  BD_CAMP.update(0,true);
  makeHotspots();persist();updateAmbient();game.dirty=true;
  /* Code by Daniel using ChatGPT November 24, 2026 */


/* Code by Daniel using ChatGPT November 18, 2026 */
}

function drawMuseum(time){BD_MUSEUM.draw(time);
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function drawScene(time){
  ctx.clearRect(0,0,W,H);
  if(game.hallTransition){BD_MUSEUM.paintTransition(time);return;}
  if(game.flight){BD_ATLAS.draw(canvas,game.save,{from:game.flight.from,to:game.flight.to,world:game.flight.world,t:game.save.settings.reduced ? .5 : game.flight.progress,title:game.flight.title});return;}
  if(BD_CAMP.active()){BD_CAMP.paint(ctx,time);return;}
  if(game.scene==='museum')drawMuseum(time);
  else{
    ctx.save();
    if(game.scene==='cabin'){
      const c=BD_MUSEUM.camera;
      ctx.scale(c.z*c.ax,c.z*c.ay);ctx.translate(-c.x,-c.y);
    }
    const bg=BD_ART.images.cabin;if(bg)ctx.drawImage(bg,0,0,W,H);
    BD_ART.traveler(ctx,game.player,time,game.save.settings.reduced);
    if(game.path.length){const target=game.path[game.path.length-1];ctx.strokeStyle='#f4deac80';ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(target[0],target[1],12,5,0,0,Math.PI*2);ctx.stroke();}
    ctx.restore();
  }
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function updateMovement(dt,time){
  if(BD_SCROLL.active()){game.player.walking=false;return;}
  if($('#panel').open||game.flight||game.hallTransition||document.hidden){game.player.walking=false;return;}
  BD_MOTION.advance(game,dt,walkable);
  if(game.hallTransition||$('#panel').open)return;
  const nearest=game.hotspots.map(function measure(h){return {h,d:Math.hypot(h.point[0]-game.player.x,h.point[1]-game.player.y)};
/* Code by Daniel using ChatGPT November 15, 2026 */
}).sort(function closest(a,b){return a.d-b.d;
/* Code by Daniel using ChatGPT November 15, 2026 */
})[0];
  game.nearest=nearest&&nearest.d<150?nearest.h:null;
  if(game.nearest)$('#nearby').textContent=game.nearest.label+' · press E or choose its marker.';


/* Code by Daniel using ChatGPT November 16, 2026 */
}

function frame(time){
  BD_VIEW.tick();
  BD_MUSEUM.syncView();
  const dt=Math.min(.035,(time-game.lastFrame)/1000||.016);game.lastFrame=time;
  pollGamepad(time);
  updateMovement(dt,time);
  if(game.hallTransition&&!document.hidden){game.hallTransition.elapsed+=dt;if(game.hallTransition.elapsed>=game.hallTransition.duration)BD_MUSEUM.finish();}
  if(game.flight)BD_FLIGHT.update(dt);
  if(game.ready){BD_PEOPLE.update(time);BD_JOURNEY.tick();}
  if(BD_MUSEUM.hasSceneCamera()&&!game.hallTransition)BD_MUSEUM.update(dt);
  BD_CAMP.update(dt);
  if(game.scene==='museum'&&!game.hallTransition){for(const id of Object.keys(BD_MUSEUM.warm)){if(BD_MUSEUM.warm[id]<1){BD_MUSEUM.warm[id]=Math.min(1,BD_MUSEUM.warm[id]+dt/1.6);game.dirty=true;}}}
  if((game.dirty||game.player.walking||game.hallTransition||game.flight)&&time-game.lastPaint>(BD_SCROLL.active()?16:32)){drawScene(time);game.lastPaint=time;game.dirty=false;}
  requestAnimationFrame(frame);




/* Code by Daniel using ChatGPT November 16, 2026 */
}

function investigateNearest(){
  if(BD_SCROLL.active()){BD_SCROLL.close();return;}
  if(game.hallTransition){BD_MUSEUM.finish();return;}
  if(game.flight){$('#flight-pause')?.click();return;}
  if(game.nearest)game.nearest.action();else showGuide();


/* Code by Daniel using ChatGPT November 16, 2026 */
}

function flyTo(site){BD_FLIGHT.start(site);BD_RESILIENCE.art(BD_CAMP.art(site));
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function finishFlight(){BD_FLIGHT.finish();
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function arriveAtMuseum(){
  BD_MUSEUM.enter('front',{arrival:[730,948],firstLook:true});
  /* Code by Daniel using ChatGPT November 23, 2026 */
}

function showGuide(){
  if(game.flight){openPanel('ABOARD THE KINGFISHER','<h2>The journey to '+escapeHTML(game.flight.site.place)+'.</h2><p class="lede">Stay with the map and its notes, or choose when to arrive.</p><div class="actions"><button class="button" data-action="flight-return">Return to the flight</button><button class="button secondary" data-action="flight-arrive">Arrive now →</button><button class="button secondary" data-action="atlas">Look at the atlas</button><button class="button secondary" data-action="library">Read in the library</button></div>','flight-guide');return;}
  openPanel('A PLACE TO BEGIN','<h2>Look around.</h2><p class="lede">Choose a place and your traveler will walk there.</p><div class="settings-grid">'+game.hotspots.map(function guidePlace(h){return '<button class="site-row" data-guide="'+h.id+'"><span class="site-number">'+h.icon+'</span><span>'+escapeHTML(h.label)+'</span><span class="check">→</span></button>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</div><div class="actions"><button class="button secondary" data-action="atlas">Open the atlas</button><button class="button secondary" data-action="museum">Return to the museum</button></div>','guide');
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function showBriefing(site){
  openPanel('FIELD BRIEFING · '+site.country.toUpperCase(),'<div class="two-column"><div><p class="eyebrow">EXPEDITION '+String(site.art+1).padStart(2,'0')+'</p><h2>'+escapeHTML(site.title)+'</h2><p class="lede">'+escapeHTML(site.hook)+'</p><p>'+escapeHTML(site.briefing)+'</p><div class="field-meta"><span>'+escapeHTML(site.place)+'</span><span>'+escapeHTML(site.date)+'</span></div><div class="note-block">'+escapeHTML(site.story)+'</div><div class="actions"><button class="button" data-dig="'+site.id+'">Go to the find →</button><button class="button secondary" data-card="'+site.id+'">Read the evidence card</button></div></div><div><div class="artifact-stage"><canvas id="brief-art" width="500" height="360" aria-label="Illustration of '+escapeHTML(site.artifact)+'"></canvas><small>ILLUSTRATED STUDY REPLICA</small></div><p class="fine-print">'+escapeHTML(site.holding)+'</p></div></div>','briefing');
  if(game.scene==='site' && game.site===site)$('#panel-body .actions').insertAdjacentHTML('afterbegin',BD_CULTURE.invitation(site));
  BD_ART.artifact($('#brief-art').getContext('2d'),site,250,170,350,270);
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function showAtlas(){
  const site=BD_SITES.find(function selectedSite(s){return s.id===BD_ATLAS.selected;
/* Code by Daniel using ChatGPT November 15, 2026 */
})||BD_SITES[0];
  openPanel('THE KINGFISHER · EXPEDITION ATLAS','<h2>Where shall we go?</h2><p class="lede">Twelve places. Two Testaments. A world of questions.</p><div class="tabs"><button class="tab '+(BD_ATLAS.hall==='all'?'selected':'')+'" data-atlas-hall="all">All expeditions</button><button class="tab '+(BD_ATLAS.hall==='ot'?'selected':'')+'" data-atlas-hall="ot">I · Old Testament</button><button class="tab '+(BD_ATLAS.hall==='nt'?'selected':'')+'" data-atlas-hall="nt">II · New Testament</button><button class="tab" data-action="map-scale">'+(BD_ATLAS.world?'Eastern Mediterranean ↗':'World map ↗')+'</button></div><div class="atlas-layout"><div class="atlas-wrap"><canvas id="atlas-canvas" width="840" height="600" tabindex="0" aria-label="Illustrated expedition map. Choose sites using the destination list beside the map."></canvas><span class="atlas-note">A field atlas · coastlines are illustrative; find locations are geographic.</span></div><div class="atlas-select" aria-label="Destinations">'+BD_SITES.filter(function shown(s){return BD_ATLAS.hall==='all'||s.hall===BD_ATLAS.hall;
/* Code by Daniel using ChatGPT November 15, 2026 */
}).map(function siteChoice(s){return '<button class="site-row '+(s.id===site.id?'selected':'')+'" data-select-site="'+s.id+'" aria-pressed="'+(s.id===site.id)+'"><span class="site-number">'+String(s.art+1).padStart(2,'0')+'</span><span>'+escapeHTML(s.place)+'<small>'+escapeHTML(s.artifact)+'</small></span>'+(game.save.finds[s.id]?'<span class="check" aria-label="Discovered">✓</span>':'')+'</button>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</div></div><div class="atlas-detail"><p class="eyebrow">'+escapeHTML(site.country)+' · '+(site.hall==='ot'?'OLD':'NEW')+' TESTAMENT</p><h3>'+escapeHTML(site.title)+'</h3><p>'+escapeHTML(site.hook)+'</p><div class="actions"><button class="button" data-fly="'+site.id+'">✈ Fly to '+escapeHTML(site.place)+' →</button><span class="badge '+(site.grade==='Debated'?'debated':'')+'">'+site.grade+'</span><button class="button secondary small" data-brief="'+site.id+'">Field briefing</button></div></div>','atlas');
  const map=$('#atlas-canvas');if(BD_ATLAS.world){BD_ATLAS.draw(map,game.save);$('.atlas-note').textContent='World route atlas · geographic projection';}else{BD_MODELS.paintAtlas(map);BD_VIEW.inspect(map,'atlas-relief');$('.atlas-note').textContent='A raised-relief model · approximate guide points; lights mark field visits.';}
  map.addEventListener('click',function chooseMapPin(event){const r=map.getBoundingClientRect(),x=(event.clientX-r.left)*map.width/r.width,y=(event.clientY-r.top)*map.height/r.height;const pin=BD_ATLAS.pins.map(function distance(p){return {...p,d:Math.hypot(p.x-x,p.y-y)};
/* Code by Daniel using ChatGPT November 15, 2026 */
}).sort(function nearest(a,b){return a.d-b.d;
/* Code by Daniel using ChatGPT November 15, 2026 */
})[0];if(pin&&pin.d<30){BD_ATLAS.selected=pin.id;showAtlas();}
/* Code by Daniel using ChatGPT November 15, 2026 */
});

/* Code by Daniel using ChatGPT November 16, 2026 */
}

function showExhibit(site){
  if(game.save.finds[site.id]){BD_LEARNING.showLabel(site);return;}
  openPanel('MUSEUM DISPLAY · '+(site.hall==='ot'?'OLD TESTAMENT':'NEW TESTAMENT'),
    '<h2>'+escapeHTML(site.artifact)+'</h2>'+
    '<p class="fine-print">'+escapeHTML(site.place)+' · '+escapeHTML(site.date)+'</p>'+
    '<p class="lede">Bring back a replica for your museum.</p>'+
    '<div class="actions"><button class="button" data-fly="'+site.id+'">Fly to the dig →</button>'+
    '<button class="button secondary" data-action="atlas">Expedition map</button></div>',
    'empty-exhibit');
/* Code by Daniel using ChatGPT November 24, 2026 */
}

function paintInspection(site,index){
  const art=$('#artifact-canvas');if(!art)return;const c=art.getContext('2d');c.clearRect(0,0,art.width,art.height);
  BD_ART.artifact(c,site,250,175,360,285);
  if(index===null)return;
  const [x,y]=[[150,125],[325,185],[240,270]][index];
  // The name occupies the second line of the Pilate study replica.
  const ellipse=site.id==='caesarea'&&index===0?[294,146,76,17,-.03]:[x,y,64,29,index===0?-.3:.1];
  c.strokeStyle='#e9c474';c.fillStyle='#e9c47422';c.lineWidth=2;
  c.beginPath();c.ellipse(...ellipse,0,Math.PI*2);c.fill();c.stroke();
  c.fillStyle='#f3e7bc';c.font='11px Trebuchet MS';c.textAlign='center';
  c.fillText(site.details[index][0],250,334);
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function showCard(site,detail=0){
  game.currentEvidence=site.id;
  openPanel('THE EVIDENCE CARD · '+site.place.toUpperCase(),'<p class="print-title">UNEARTHED! · BIBLICAL DISCOVERIES · YOUR MUSEUM RECORD</p><div class="two-column"><div><div class="artifact-stage"><canvas id="artifact-canvas" width="500" height="370" tabindex="0" aria-label="Choose one of three artifact details below."'+(site.id==='bethesda'?' aria-describedby="model-scale-note"':'')+'></canvas></div>'+(site.id==='bethesda'?'<p id="model-scale-note" class="fine-print model-scale-note">Illustrative model, not to scale.</p>':'')+'<div class="inspection-tabs">'+site.details.map(function detailButton(d,i){return '<button data-detail="'+i+'" data-detail-site="'+site.id+'" class="'+(detail===i?'selected':'')+'">'+(i+1)+' · '+escapeHTML(d[0])+'</button>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</div><p class="fine-print" id="detail-description">'+escapeHTML(site.details[detail][1])+'</p><div class="terms">'+site.terms.map(function termButton(term){return '<button data-term="'+escapeHTML(term)+'">'+escapeHTML(term)+'</button>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</div><p id="term-definition" class="fine-print" aria-live="polite"></p></div><div><span class="badge '+(site.grade==='Debated'?'debated':'')+'">'+site.grade+(site.id==='avaris'?' · link to Joseph':'')+'</span><h2 style="margin-top:14px">'+escapeHTML(site.artifact)+'</h2><div class="field-meta"><span>'+escapeHTML(site.date)+'</span><span>Found: '+escapeHTML(site.found)+'</span></div><p class="lede">'+escapeHTML(site.hook)+'</p><div class="facts"><div class="fact"><p class="eyebrow">THE OBJECT</p><p>'+escapeHTML(site.object)+'</p></div><div class="fact"><p class="eyebrow">WHAT IT SUPPORTS</p><p>'+escapeHTML(site.inference)+'</p></div><div class="fact"><p class="eyebrow">SCRIPTURE CONNECTION</p><p>'+escapeHTML(site.connection)+'</p><p style="margin-top:7px"><b>'+escapeHTML(site.scripture)+'</b></p></div><div class="fact"><p class="eyebrow">FAIR TO SAY</p><p>'+escapeHTML(site.limit)+'</p></div></div><p class="finding-ending">'+escapeHTML(site.takeaway)+'</p><p class="fine-print" style="margin-top:15px">Original / site: '+escapeHTML(site.holding)+'</p></div></div><details class="note-block"><summary><strong>A fair question: '+escapeHTML(site.question)+'</strong></summary><p style="margin-top:10px">'+escapeHTML(site.answer)+'</p></details><details class="note-block"><summary><strong>Look at the four evidence trays</strong></summary>'+trayHTML(site)+'</details><details><summary class="fine-print">Sources &amp; reading</summary><a class="source-link" href="'+escapeHTML(site.source[1])+'" target="_blank" rel="noopener noreferrer">'+escapeHTML(site.source[0])+' ↗</a><a class="source-link" href="'+escapeHTML(site.source2[1])+'" target="_blank" rel="noopener noreferrer">'+escapeHTML(site.source2[0])+' ↗</a><p class="fine-print">Sources</p></details><div class="actions">'+(game.save.finds[site.id]?'<button class="button" data-display="'+site.id+'">Visit your display →</button>':'<button class="button" data-fly="'+site.id+'">Visit the site →</button>')+'<button class="button secondary" data-lab="'+site.id+'">At the study bench</button><button class="button secondary" data-dig="'+site.id+'">Return to the field study</button><button class="button secondary" data-action="print">Print this card</button></div>','card');
  const playerNote=game.save.digs[site.id]?.patient?.note;if(playerNote){const note=document.createElement('div');note.className='note-block';note.innerHTML='<p class="eyebrow">MY FIELD OBSERVATION</p><p>'+escapeHTML(playerNote)+'</p>';$('#panel-body').append(note);}
  paintInspection(site,detail);
  $('#artifact-canvas').addEventListener('click',function canvasDetail(event){const rect=this.getBoundingClientRect(),x=(event.clientX-rect.left)/rect.width;const next=x<.34?0:x<.66?1:2;showCard(site,next);
/* Code by Daniel using ChatGPT November 15, 2026 */
});
/* Code by Daniel using ChatGPT November 20, 2026 */}

function trayHTML(site){
  return '<div class="tray-grid">'+[['1 · THE OBJECT',site.object],['2 · ITS MAKER’S CLAIM',site.maker],['3 · A SCHOLAR’S INFERENCE',site.inference],['4 · THE SCRIPTURE CONNECTION',site.connection]].map(function tray(t){return '<div class="tray"><p class="eyebrow">'+t[0]+'</p><p>'+escapeHTML(t[1])+'</p></div>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</div>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function showJournal(){
  const count=Object.keys(game.save.finds).length;
  openPanel('YOUR PERSONAL FIELD JOURNAL','<h2>'+count+' '+(count===1?'discovery':'discoveries')+'. Bring your questions to Mara.</h2><p class="lede">The places you have investigated, and the stories still waiting.</p>'+(count?'<div class="actions"><button class="button" data-action="family-tour">Give a museum tour →</button><button class="button secondary" data-action="export-collection">Download your collection</button></div>':'<div class="note-block">Your first expedition can be anywhere. Tel Dan is a good place to start: a broken stone with a famous name.</div>')+'<div class="tabs"><span class="fine-print">✦ A filled card is a study you have completed. Empty cards lead to a new expedition.</span></div><div class="journal-grid">'+BD_SITES.map(function journalCard(site){const done=!!game.save.finds[site.id];return '<button class="journal-card '+(done?'':'empty')+'" '+(done?'data-card':'data-fly')+'="'+site.id+'"><canvas width="250" height="160" data-journal-art="'+site.id+'" aria-hidden="true"></canvas><h3>'+escapeHTML(site.artifact)+'</h3><small>'+escapeHTML(site.place)+' · '+(done?'In your museum ✓':'Awaiting discovery →')+'</small></button>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</div>','journal');
  for(const art of document.querySelectorAll('[data-journal-art]')){const site=BD_SITES.find(function id(s){return s.id===art.dataset.journalArt;
/* Code by Daniel using ChatGPT November 15, 2026 */
});if(game.save.finds[site.id])BD_ART.artifact(art.getContext('2d'),site,125,80,190,125);}
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function showFamilyTour(index=0){BD_LEARNING.tour(index);
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function showLibrary(hall=game.hall){
  game.libraryHall=hall;
  openPanel('THE KINGFISHER’S FLYING LIBRARY','<h2>Take a good question with you.</h2><p class="lede">History, archaeology, and the reasons Christians believe. Read a page or settle in for a while.</p><div class="tabs"><button class="tab '+(hall==='ot'?'selected':'')+'" data-library-hall="ot">I · Old Testament</button><button class="tab '+(hall==='nt'?'selected':'')+'" data-library-hall="nt">II · New Testament</button><button class="tab '+(game.save.edition==='short'?'selected':'')+'" data-edition="short">Short reads</button><button class="tab '+(game.save.edition==='long'?'selected':'')+'" data-edition="long">Go deeper</button></div>'+BD_LIBRARY.shelf(BD_BOOKS.filter(function inHall(b){return b.hall===hall;
/* Code by Daniel using ChatGPT November 17, 2026 */
}))+'<p class="fine-print" style="margin-top:24px">Your place is kept separately in each reading edition.</p><div class="actions"><button class="button secondary" data-action="gospel">Tell me about the Christian hope</button></div>','library');
/* Code by Daniel using ChatGPT November 17, 2026 */
}

function formatMarkdown(text){
  const safe=escapeHTML(text);
  return safe.split(/\n\s*\n/).map(function paragraph(p){
    p=p.replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>');
    if(p.split('\n').every(function listLine(line){return /^[-\d]/.test(line);
/* Code by Daniel using ChatGPT November 15, 2026 */
})){return '<ul>'+p.split('\n').map(function item(line){return '<li>'+line.replace(/^(?:- |\d+\. )/,'')+'</li>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</ul>';}
    return '<p>'+p.replace(/\n/g,'<br>')+'</p>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('');
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function showBook(id,page){
  const book=BD_BOOKS.find(function match(b){return b.id===id;
/* Code by Daniel using ChatGPT November 15, 2026 */
});if(!book)return;
  const edition=book.editions[game.save.edition],key=id+'-'+game.save.edition;
  if(page===undefined)page=game.save.bookmarks[key]||0;
  page=Math.max(0,Math.min(edition.pages.length-1,page));game.save.bookmarks[key]=page;persist();
  const p=edition.pages[page];
  openPanel(book.subject.toUpperCase()+' · '+(game.save.edition==='short'?'SHORT READ':'GO DEEPER'),'<div class="reader" data-bible-version="LSB"><p class="eyebrow">'+escapeHTML(edition.title)+'</p><h2>'+escapeHTML(edition.subtitle)+'</h2><h3 class="page-title">'+p.number+' · '+escapeHTML(p.title)+'</h3><div class="reader-copy-tools"><button class="button secondary small" data-action="copy-book-page">Copy page</button><p id="book-copy-status" role="status">Select a passage to copy it, or copy the whole page.</p></div><div class="reader-text" tabindex="0" aria-label="Book page text">'+BD_LIBRARY.pageText(p)+'</div><div class="reader-nav"><button class="button secondary small" data-book="'+id+'" data-page="'+(page-1)+'" '+(page===0?'disabled':'')+'>← Back</button><label><span class="sr-only">Go to page</span><select id="book-page" data-book-id="'+id+'">'+edition.pages.map(function pageOption(p,i){return '<option value="'+i+'" '+(i===page?'selected':'')+'>'+p.number+' · '+escapeHTML(p.title)+'</option>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</select></label><button class="button small" data-book="'+id+'" data-page="'+(page+1)+'" '+(page===edition.pages.length-1?'disabled':'')+'>Next →</button></div><div class="actions"><button class="button secondary small" data-action="library">← Back to the library</button><button class="button secondary small" data-action="gospel">The Christian hope</button></div>'+BD_LIBRARY.pageSources(p)+'</div>','reader');
/* Code by Daniel using ChatGPT November 20, 2026; LSB default for Bible links: Code by Daniel using Claude November 23, 2026 */
}

function digState(site){
  if(!game.save.digs[site.id])game.save.digs[site.id]={recorded:false,cleared:[],seen:[],fitted:[]};
  return game.save.digs[site.id];
/* Code by Daniel using ChatGPT November 15, 2026 */
}



function openDig(site){
  const workshop=game.save.digs[site.id]?.culture;
  if(workshop?.active){workshop.active=false;persist();}
  BD_STUDY.open(site);
  const fieldControls=$('#panel.square-onsite-panel .square-layout > aside'),heading=$('#panel-body h2');
  if(fieldControls)fieldControls.insertAdjacentHTML('beforeend',BD_CULTURE.invitation(site));
  else if(heading)heading.insertAdjacentHTML('afterend',BD_CULTURE.invitation(site));
/* Code by Daniel using ChatGPT November 23, 2026 */
}











function finishDiscovery(site){
  game.save.finds[site.id]=game.save.finds[site.id]||{date:new Date().toISOString()};game.save.hall=site.hall;game.justFound=site.id;persist();chime();
  openPanel('A NEW FIND FOR YOUR MUSEUM','<div class="two-column"><div class="artifact-stage"><canvas id="new-find" width="500" height="390" aria-label="Your completed study replica"></canvas><small>'+escapeHTML(site.artifact)+'</small></div><div><p class="eyebrow">YOUR DISPLAY IS READY</p><h2>'+escapeHTML(site.title)+'</h2><p class="lede">A quiet space now holds evidence you can explain.</p><p>'+escapeHTML(site.connection)+'</p><div class="note-block"><strong>Fair to say</strong><p>'+escapeHTML(site.limit)+'</p></div><p class="finding-ending">'+escapeHTML(site.takeaway)+'</p><div class="actions"><button class="button" data-display="'+site.id+'">Place it in the museum →</button><button class="button secondary" data-card="'+site.id+'">Examine the evidence card</button></div></div></div><details class="note-block"><summary>Four trays: what belongs where?</summary>'+trayHTML(site)+'</details>','discovery');
  BD_ART.artifact($('#new-find').getContext('2d'),site,250,175,360,300,{glow:true});
/* Code by Daniel using ChatGPT November 20, 2026 */
}

function visitDisplay(site){const p=BD_MUSEUM.display(site);BD_MUSEUM.enter(p.room==='ot'||p.room==='nt'?p.room+'-'+(p.bay+1):p.room,{arrival:p.approach});game.justFound=site.id;BD_MUSEUM.warm[site.id]=game.save.settings.reduced?1:0;game.dirty=true;toast(site.artifact+' · Your label and evidence are here.');BD_JOURNEY.placed();
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function showLabSelection(){
  openPanel('THE CONSERVATION BENCH','<h2>A different kind of looking.</h2><p class="lede">Some details need more than a brush.</p><p>Choose an object to examine with raking light, magnification or imaging. The simulations explain an idea; they do not perform a real scientific analysis.</p><div class="journal-grid">'+BD_SITES.map(function labChoice(site){return '<button class="journal-card" data-lab="'+site.id+'"><h3>'+escapeHTML(site.artifact)+'</h3><small>'+({raking:'Raking light',microscope:'Microscope',spectral:'Imaging demonstration'}[site.lab])+' →</small></button>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</div>','lab-selection');
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function showLab(site){
  const descriptions={raking:['Raking light','Low, sideways light casts tiny shadows across shallow marks. Move the lamp and notice how contrast changes.'],microscope:['The microscope','A microscope magnifies a small part of a surface. Move across the study image to examine texture.'],spectral:['Spectral imaging','Different wavelengths can make ink and its background reflect differently. Researchers compare images to improve contrast.']};
  const info=descriptions[site.lab];
  openPanel('AT THE STUDY BENCH','<h2>'+info[0]+'</h2><div class="two-column"><div class="lab-stage"><canvas id="lab-canvas" width="600" height="400" aria-label="Illustrative '+info[0].toLowerCase()+' simulation of '+escapeHTML(site.artifact)+'"></canvas>'+BD_ART.slider('lab-control',site.lab==='raking'?'Study lamp · angle of light':site.lab==='microscope'?'Microscope · surface position':'Spectral study · contrast',0,100,45,site.lab==='spectral'?'Low contrast':'Left',site.lab==='raking'?'Overhead':'Centre',site.lab==='spectral'?'High contrast':'Right')+'<div class="lab-readout" id="lab-readout">'+info[0]+'</div></div><div><p class="eyebrow">'+escapeHTML(site.artifact)+'</p><p class="lede">'+info[1]+'</p><div class="note-block">'+(site.lab==='spectral'?'Different wavelengths can help researchers distinguish ink from its background.':site.lab==='microscope'?'Magnification makes a small detail easier to examine.':'Light from a low angle makes shallow surface marks cast shadows.')+'</div><div class="actions"><button class="button secondary" data-card="'+site.id+'">The evidence card</button><button class="button secondary" data-action="lab">Choose another study</button></div></div></div>','lab');
  const art=$('#lab-canvas'),c=art.getContext('2d'),im=BD_ART.images['find-'+site.art];
  function paintLab(){
    const value=Number($('#lab-control').value)/100;BD_ART.syncSlider($('#lab-control'),site.lab==='raking'?BD_ART.angleLabel((value-.5)*150):Math.round(value*100)+'% '+(site.lab==='microscope'?'across surface':'contrast'));c.clearRect(0,0,600,400);
    if(site.lab==='microscope'){
      c.save();c.beginPath();c.arc(300,200,172,0,Math.PI*2);c.clip();c.fillStyle='#c1ad79';c.fillRect(0,0,600,400);
      if(im){const sw=im.width*.33,sh=im.height*.55,sx=(im.width-sw)*value,sy=im.height*.2;c.drawImage(im,sx,sy,sw,sh,115,15,370,370);}
      c.strokeStyle='#ede3bd50';c.lineWidth=.8;c.beginPath();c.moveTo(300,25);c.lineTo(300,375);c.moveTo(125,200);c.lineTo(475,200);c.stroke();c.restore();c.strokeStyle='#bfa772';c.lineWidth=5;c.beginPath();c.arc(300,200,174,0,Math.PI*2);c.stroke();
    }else{
      c.save();if(site.lab==='spectral')c.filter='grayscale('+value+') contrast('+(1+value*2.5)+') brightness('+(1+value*.2)+')';BD_ART.artifact(c,site,300,195,420,320);c.restore();
      if(site.lab==='raking'){const x=value*900-150,g=c.createLinearGradient(x-160,0,x+190,0);g.addColorStop(0,'#142d2600');g.addColorStop(.42,'#f3db962e');g.addColorStop(.55,'#18281877');g.addColorStop(1,'#142d2600');c.fillStyle=g;c.fillRect(70,25,460,345);}
    }
    c.fillStyle='#ced2ae';c.font='10px Trebuchet MS';c.textAlign='center';c.fillText(site.lab==='microscope'?'Surface detail':site.lab==='spectral'?'Contrast':'Raking light',300,389);
/* Code by Daniel using ChatGPT November 15, 2026 */
}
  $('#lab-control').addEventListener('input',paintLab);paintLab();
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function showCrew(topic){
  const topics={
    context:['Miriam · field archaeologist','“The object’s location is part of the find. Its layer and neighbors help us understand it. Before lifting anything, we photograph, measure, and describe its layer.”'],
    certainty:['Elias · epigrapher','“I separate the letters I can see from the letters I restore. I can be confident about a name and uncertain about the rest of a sentence. Saying ‘I don’t know’ can be good scholarship.”'],
    fair:['Sam · pilot','“My friend said the Bible had been changed. I asked, ‘Do you mean a slip by a copyist, or a whole account added later?’ He meant the second. Then I could ask which account he had in mind, and we could look at the oldest copies together.”'],
    faith:['Miriam · field archaeologist','“What would you want to know about someone before you trusted him with your life? I started with the people who said they saw Jesus after his death. As I read Scripture, the Holy Spirit helped me trust the person they were describing. Which witness would you want to hear first?”']
  };
  openPanel('ABOARD THE KINGFISHER · THE CREW','<h2>Ask anything.</h2><p class="lede">Sam usually does.</p><p>Miriam records the sites. Elias studies the inscriptions. Sam flies the Kingfisher—and asks the questions everyone else was thinking.</p><div class="settings-grid">'+[['context','Why record the context?'],['certainty','Can we admit uncertainty?'],['fair','How do I talk with a skeptical friend?'],['faith','Where does Christian confidence come from?']].map(function topicButton(t){return '<button class="site-row" data-crew="'+t[0]+'"><span class="site-number">?</span><span>'+t[1]+'</span><span class="check">→</span></button>';
/* Code by Daniel using ChatGPT November 16, 2026 */
}).join('')+'</div>'+(topic?'<div class="note-block"><p class="eyebrow">'+topics[topic][0]+'</p><p>'+topics[topic][1]+'</p></div>':'')+'<div class="actions"><button class="button" data-action="gospel">Tell me about the Christian hope</button><button class="button secondary" data-action="atlas">Where shall we fly?</button></div><p class="fine-print"></p>','crew');
/* Code by Daniel using ChatGPT November 20, 2026 */
}

function showAbout(){
  openPanel('A CHRISTIAN ADVENTURE · AN HONEST INVESTIGATION','<h2>You can look closely.</h2><p>We’re Christians, and we think the Bible is true. True things can stand a close look. We’ll show you what was found, what it says, and where people still disagree.</p><div class="tray-grid">'+[['Secure','An established object, reading or historical fact.'],['Strong','Good evidence and broad scholarly agreement.'],['Debated','The experts disagree; compare their reasons.'],['Caution','An insecure claim; do not lean on it.']].map(function grade(g){return '<div class="tray"><p class="eyebrow">'+g[0]+'</p><p>'+g[1]+'</p></div>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</div><p>An inscription can confirm a person or illuminate a policy. A ruler can also boast. A reconstructed model can help explain a setting without proving the event described there.</p><div class="note-block"><strong>Faith and evidence</strong><p>We trust God’s Word. Historical evidence can confirm Scripture and answer objections. Full assurance of its divine authority rests in the Holy Spirit bearing witness by and with the Word. See Westminster Confession 1.5 and Belgic Confession, Article 5.</p></div><p class="fine-print">You bring back replicas; originals stay in their museums. Our paintings suggest materials and settings rather than reproducing inscriptions. Dig divisions and lab images teach methods rather than presenting excavation records or calibrated scientific scans. Models simplify places and sometimes compress distances. The Old Testament is also the Scriptures of Israel.</p><div class="actions"><button class="button" data-action="gospel">Tell me about the Christian hope</button><button class="button secondary" data-action="library">Read further</button></div>','about');
/* Code by Daniel using ChatGPT November 20, 2026 */
}

function showGospel(){openHopeReading();
/* Code by Daniel using ChatGPT November 23, 2026; Claude, 23 Nov 2026: the edition follows "Say it simply" */
}

function downloadFile(filename,text,type){
  const url=URL.createObjectURL(new Blob([text],{type})),a=document.createElement('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(function releaseDownload(){URL.revokeObjectURL(url);
/* Code by Daniel using ChatGPT November 15, 2026 */
},1500);
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function exportProgress(){downloadFile('Unearthed-Progress.json',JSON.stringify(game.save,null,2),'application/json');toast('A progress copy is ready. Import it in Settings on another browser.');
/* Code by Daniel using ChatGPT November 18, 2026 */}

function exportCollection(){
  const sites=BD_SITES.filter(function discovered(s){return !!game.save.finds[s.id];
/* Code by Daniel using ChatGPT November 15, 2026 */
});
  if(!sites.length){toast('Your first discovery will begin the collection.');return;}
  const cards=sites.map(function familyCard(site){const c=document.createElement('canvas');c.width=420;c.height=300;BD_ART.artifact(c.getContext('2d'),site,210,145,330,250);return '<article><img alt="'+escapeHTML(site.artifact)+'" src="'+c.toDataURL('image/png')+'"><div><small>'+escapeHTML(site.place)+' · '+escapeHTML(site.date)+' · '+site.grade+'</small><h2>'+escapeHTML(site.artifact)+'</h2><p>'+escapeHTML(site.object)+'</p><p><b>What it supports:</b> '+escapeHTML(site.inference)+'</p><p><b>Scripture connection:</b> '+escapeHTML(site.connection)+' <i>'+escapeHTML(site.scripture)+'</i></p>'+BD_JOURNEY.scripture(site.id)+'<p><b>Fair to say:</b> '+escapeHTML(site.limit)+'</p><p><b>What you can explain:</b> '+escapeHTML(site.takeaway)+'</p><p>Original / site: '+escapeHTML(site.holding)+'</p><a href="'+escapeHTML(site.source[1])+'">'+escapeHTML(site.source[0])+'</a></div></article>';
/* Code by Daniel using ChatGPT November 17, 2026 */
}).join('');
  const html='<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Unearthed! — My Discovery Museum</title><style>body{max-width:1100px;margin:40px auto;padding:20px;font:16px/1.7 Georgia;color:#254238;background:#f5f1e7}h1{font-weight:400;font-size:42px}article{display:flex;align-items:flex-start;gap:30px;border-top:1px solid #c6b994;padding:30px 0;break-inside:avoid}img{width:32%;background:#d9d5be}article>div{flex:1}small{color:#8c7950}a{color:#385e50}h2{font-weight:400}footer{border-top:1px solid #c6b994;padding-top:20px;font-size:12px}@media(max-width:640px){article{display:block}img{width:100%;max-height:280px;object-fit:contain}}@media print{body{background:white;font-size:11pt}article{page-break-inside:avoid}}</style><h1>Unearthed! — My Discovery Museum</h1><p>Biblical Discoveries</p><p>'+sites.length+' studies from a biblical archaeology adventure. A collection to explore together.</p>'+cards+'<footer>'+escapeHTML(BD_SCRIPTURE_CREDIT)+' Sources accompany each exhibit. Created by Daniel using ChatGPT · November 15, 2026.</footer></html>';
  downloadFile('My-Unearthed-Museum.html',html,'text/html');
/* Code by Daniel using ChatGPT November 18, 2026 */}

function showSettings(){
  const s=game.save.settings;
  openPanel('EXPEDITION SETTINGS','<h2>Make yourself at home.</h2><div class="settings-grid"><label class="setting-row"><span>Your traveler<small>1930s expedition clothes; a present-day adventure.</small></span><select id="traveler-setting"><option value="girl" '+(game.save.traveler==='girl'?'selected':'')+'>Girl explorer</option><option value="boy" '+(game.save.traveler==='boy'?'selected':'')+'>Boy explorer</option></select></label><label class="setting-row"><span>Quiet ambient sound<small>Original synthesized atmosphere. Starts only when enabled.</small></span><input id="sound-setting" type="checkbox" '+(s.sound?'checked':'')+'></label><label class="setting-row"><span>Volume</span><input id="volume-setting" type="range" min="0" max="40" value="'+Math.round(s.volume*100)+'"></label><label class="setting-row"><span>Less motion<small>Keeps scenes and model views still; skips doorway zooms.</small></span><input id="motion-setting" type="checkbox" '+(s.reduced?'checked':'')+'></label><label class="setting-row"><span>Scene labels<small>Optional object outlines and names; the Scene Guide is in the backpack.</small></span><input id="labels-setting" type="checkbox" '+(s.labels?'checked':'')+'></label><div class="setting-row"><span>Saved in this browser<small>No account, analytics, or personal information is required.</small></span><button class="button secondary small" data-action="export-progress">Export progress</button></div><label class="setting-row"><span>Import progress<small>Choose an Unearthed! progress file or an earlier Biblical Discovery export.</small></span><input id="import-progress" type="file" accept="application/json,.json"></label><div class="setting-row"><span>A fresh expedition<small>Export first if you want to keep your current museum.</small></span><button class="button secondary small" data-action="reset-question">Start over…</button></div></div><p class="fine-print" style="margin-top:25px">Created by Daniel using ChatGPT · November 20, 2026 · Unearthed! — Biblical Discoveries · Investigation edition 0.15.0.<br>Desktop: WASD or arrows to walk, E to investigate, M atlas, J journal, L library, F fullscreen. B opens the backpack. Click objects to walk to them. Touch: tap the floor or objects; an optional direction pad is in Settings.<br>Standard gamepad: left stick / D-pad moves, A investigates / selects, B returns, X opens the Scene guide, Y opens the atlas, Start opens the backpack. Menus: up / down to choose; left / right adjusts a slider or choice. See Controller setup & controls below.</p>','settings');
  const controllerButton=document.createElement('button');controllerButton.className='button secondary';controllerButton.dataset.action='controller-help';controllerButton.textContent='Controller setup & controls';$('#panel-body').append(controllerButton);
  $('#traveler-setting').addEventListener('change',function changeTraveler(){game.save.traveler=this.value;game.player.kind=this.value;game.dirty=true;persist();
/* Code by Daniel using ChatGPT November 15, 2026 */
});
  $('#sound-setting').addEventListener('change',function changeSound(){setSound(this.checked);
/* Code by Daniel using ChatGPT November 15, 2026 */
});
  $('#volume-setting').addEventListener('input',function changeVolume(){s.volume=Number(this.value)/100;persist();updateAmbient();
/* Code by Daniel using ChatGPT November 15, 2026 */
});
  $('#motion-setting').addEventListener('change',function changeMotion(){s.reduced=this.checked;persist();
/* Code by Daniel using ChatGPT November 15, 2026 */
});
  $('#labels-setting').addEventListener('change',function changeLabels(){s.labels=this.checked;persist();makeHotspots();
/* Code by Daniel using ChatGPT November 15, 2026 */
});
  $('#import-progress').addEventListener('change',async function importProgress(){
    const file=this.files[0];if(!file)return;
    try{if(file.size>1024*1024)throw Error('Progress files must be smaller than 1 MB.');const next=sanitizeSave(JSON.parse(await file.text()));game.save=next;game.player.kind=next.traveler;BD_JOURNEY.apply();setSound(next.settings.sound);persist();setScene('museum',null,next.hall);toast('Your saved museum is ready.');}
    catch(error){toast('Import could not be read: '+error.message);this.value='';}
/* Code by Daniel using ChatGPT November 15, 2026 */
});




/* Code by Daniel using ChatGPT November 20, 2026 */}

function setSound(enabled){
  game.save.settings.sound=enabled;
  if(enabled&&!game.audio){
    const AudioCtor=window.AudioContext||window.webkitAudioContext;
    if(!AudioCtor){game.save.settings.sound=false;toast('This browser does not support the ambient sound controls.');persist();return;}
    try{const ac=new AudioCtor(),gain=ac.createGain(),filter=ac.createBiquadFilter();gain.gain.value=0;gain.connect(ac.destination);filter.type='lowpass';filter.frequency.value=200;filter.connect(gain);
      const buffer=ac.createBuffer(1,ac.sampleRate*4,ac.sampleRate),data=buffer.getChannelData(0);let last=0;for(let i=0;i<data.length;i++){last=(last+(Math.random()*2-1)*.025)/1.025;data[i]=last*4;}
      const noise=ac.createBufferSource();noise.buffer=buffer;noise.loop=true;noise.connect(filter);noise.start();
      const engine=ac.createOscillator(),eg=ac.createGain();engine.type='sine';engine.frequency.value=92;eg.gain.value=0;engine.connect(eg);eg.connect(gain);engine.start();game.audio={ac,gain,filter,engine,eg,noise};
    }catch(error){game.save.settings.sound=false;toast('Sound could not start in this browser.');persist();return;}
  }
  if(enabled)game.audio.ac.resume().catch(function audioBlocked(){toast('Choose the sound button again to allow audio.');
/* Code by Daniel using ChatGPT November 15, 2026 */
});
  persist();updateAmbient();
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function updateAmbient(){
  if(!game.audio)return;const a=game.audio,now=a.ac.currentTime;
  a.gain.gain.setTargetAtTime(game.save.settings.sound&&!document.hidden?game.save.settings.volume*.22:0,now,.25);
  a.eg.gain.setTargetAtTime(game.flight ? .6 : game.scene==='cabin' ? .2 : 0,now,.25);
  a.filter.frequency.setTargetAtTime(game.scene==='museum'?140:game.scene==='cabin'?220:560,now,.25);
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function chime(){
  if(!game.audio||!game.save.settings.sound)return;const a=game.audio,now=a.ac.currentTime;
  for(const [index,hz]of [440,659.25,880].entries()){const osc=a.ac.createOscillator(),gain=a.ac.createGain();osc.type='sine';osc.frequency.value=hz;gain.gain.setValueAtTime(0,now+index*.13);gain.gain.linearRampToValueAtTime(game.save.settings.volume*.2,now+index*.13+.015);gain.gain.exponentialRampToValueAtTime(.0001,now+index*.13+1.2);osc.connect(gain);gain.connect(a.ac.destination);osc.start(now+index*.13);osc.stop(now+index*.13+1.3);}
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function pollGamepad(time){BD_CONTROLLER.poll(time);
/* Code by Daniel using ChatGPT November 15, 2026 */
}

async function toggleFullscreen(){
  if(document.fullscreenElement){try{await document.exitFullscreen();}catch(error){}document.body.classList.remove('full-window');}
  else if(document.body.classList.contains('full-window'))document.body.classList.remove('full-window');
  else{document.body.classList.add('full-window');try{if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();}catch(error){/* Full-window layout remains available when the browser declines native fullscreen. */}}
  requestAnimationFrame(positionHotspots);game.dirty=true;
/* Code by Daniel using ChatGPT November 15, 2026 */
}

function performAction(action){
  if(action==='controller-help'){BD_CONTROLLER.help();return;}
  const actions={
    'copy-book-page':BD_LIBRARY.copyPage,
    museum:function museumAction(){BD_MUSEUM.enter('entry');
/* Code by Daniel using ChatGPT November 15, 2026 */
},atlas:showAtlas,journal:showJournal,library:function libraryAction(){showLibrary(game.libraryHall||game.hall);
/* Code by Daniel using ChatGPT November 15, 2026 */
},
    'scroll-look-up':function lookUpAtOculus(){if(game.scene==='museum'&&BD_MUSEUM.room==='scroll')BD_SCROLL.open();},
    'museum-plan':function(){BD_MUSEUM.plan();
/* Code by Daniel using ChatGPT November 15, 2026 */
},'museum-down':function(){BD_MUSEUM.begin('scroll',{arrival:BD_SCROLL.rampFoot.slice()});/* Claude, 20 Nov 2026 */
},'museum-entry':function(){BD_MUSEUM.enter('entry');
/* Code by Daniel using ChatGPT November 15, 2026 */
},settings:showSettings,about:showAbout,gospel:showGospel,crew:function crewAction(){showCrew();
/* Code by Daniel using ChatGPT November 15, 2026 */
},lab:showLabSelection,guide:showGuide,
    cabin:function cabinAction(){setScene('cabin');
/* Code by Daniel using ChatGPT November 15, 2026 */
},interact:investigateNearest,fullscreen:toggleFullscreen,
    'flight-return':closePanel,'flight-arrive':function explicitArrival(){closePanel();finishFlight();
/* Code by Daniel using ChatGPT November 15, 2026 */
},
    sound:function soundAction(){setSound(!game.save.settings.sound);
/* Code by Daniel using ChatGPT November 15, 2026 */
},
    'hall-ot':function westHall(){BD_MUSEUM.request('ot');
/* Code by Daniel using ChatGPT November 15, 2026 */
},'hall-nt':function eastHall(){BD_MUSEUM.request('nt');
/* Code by Daniel using ChatGPT November 15, 2026 */
},
    'map-scale':function mapScale(){BD_ATLAS.world=!BD_ATLAS.world;showAtlas();if(BD_ATLAS.world){BD_ATLAS.draw($('#atlas-canvas'),game.save);$('.atlas-note').textContent='World route atlas · geographic projection';}
/* Code by Daniel using ChatGPT November 15, 2026 */
},
    'family-tour':function familyTour(){showFamilyTour();
/* Code by Daniel using ChatGPT November 15, 2026 */
},'export-collection':exportCollection,'export-progress':exportProgress,
    print:function printCard(){window.print();
/* Code by Daniel using ChatGPT November 15, 2026 */
},
    'reset-question':function resetQuestion(){openPanel('A FRESH EXPEDITION','<h2>Begin a new museum?</h2><p>This clears the twelve displays, dig records, and reading bookmarks saved in this browser. Export a copy first if you want to keep them.</p><div class="actions"><button class="button secondary" data-action="export-progress">Export current progress</button><button class="button" data-action="reset-confirm">Clear this museum and begin again</button><button class="button secondary" data-action="settings">Keep exploring</button></div>','reset');
/* Code by Daniel using ChatGPT November 15, 2026 */
},
    'reset-confirm':function resetConfirmed(){if(game.audio)game.audio.ac.close().catch(function closedAudio(){
/* Code by Daniel using ChatGPT November 15, 2026 */
});game.audio=null;game.save=defaultSave();game.player.kind=game.save.traveler;BD_JOURNEY.apply();persist();arriveAtMuseum();BD_IMMERSION.inviteBackpack();
/* Code by Daniel using ChatGPT November 15, 2026 */
}
  };
  if(game.hallTransition&&action!=='fullscreen')BD_MUSEUM.finish();
  if(game.flight&&['museum','museum-entry','cabin','hall-ot','hall-nt','reset-confirm'].includes(action)){finishFlight();}
  if(actions[action])actions[action]();
/* Code by Daniel using ChatGPT November 17, 2026 */
}

document.addEventListener('click',function clickAction(event){
  if(!game.ready)return;
  const button=event.target.closest('button');if(!button||button.disabled)return;
  const d=button.dataset,siteId=d.fly||d.card||d.brief||d.dig||d.display||d.lab||d.detailSite;
  const site=siteId?BD_SITES.find(function match(s){return s.id===siteId;
/* Code by Daniel using ChatGPT November 15, 2026 */
}):null;
  if(d.hotspot){const h=game.hotspots.find(function marker(h){return h.id===d.hotspot;
/* Code by Daniel using ChatGPT November 15, 2026 */
});if(h){if(h.id==='look-up'||Math.hypot(h.point[0]-game.player.x,h.point[1]-game.player.y)<85)h.action();else walkTo(h.point,h.action);}return;}
  if(d.guide){const h=game.hotspots.find(function guideTarget(h){return h.id===d.guide;
/* Code by Daniel using ChatGPT November 15, 2026 */
});closePanel();if(h)walkTo(h.point,h.action);return;}
  if(d.action){performAction(d.action);return;}
  if(d.fly&&site){flyTo(site);return;}if(d.card&&site){showCard(site);return;}if(d.brief&&site){showBriefing(site);return;}if(d.dig&&site){openDig(site);return;}if(d.display&&site){visitDisplay(site);return;}if(d.lab&&site){showLab(site);return;}
  if(d.selectSite){BD_ATLAS.selected=d.selectSite;showAtlas();return;}
  if(d.atlasHall){BD_ATLAS.hall=d.atlasHall;if(BD_ATLAS.hall!=='all'&&!BD_SITES.some(function available(s){return s.id===BD_ATLAS.selected&&s.hall===BD_ATLAS.hall;
/* Code by Daniel using ChatGPT November 15, 2026 */
}))BD_ATLAS.selected=BD_SITES.find(function first(s){return s.hall===BD_ATLAS.hall;
/* Code by Daniel using ChatGPT November 15, 2026 */
}).id;showAtlas();return;}
  if(d.libraryHall){showLibrary(d.libraryHall);return;}
  if(d.edition){game.save.edition=d.edition;persist();showLibrary(game.libraryHall||game.hall);return;}
  if(d.book){if(d.bookEdition==='short'||d.bookEdition==='long')game.save.edition=d.bookEdition;showBook(d.book,d.page!==undefined?Number(d.page):undefined);return;}
  if(d.detail!==undefined&&site){showCard(site,Number(d.detail));return;}
  if(d.term){$('#term-definition').textContent=d.term+': '+(BD_TERMS[d.term]||'');return;}
  if(d.tour!==undefined){showFamilyTour(Number(d.tour));return;}
  if(d.crew){showCrew(d.crew);return;}
/* Code by Daniel using ChatGPT November 17, 2026 */
});

document.addEventListener('change',function bookPageChange(event){if(event.target.id==='book-page')showBook(event.target.dataset.bookId,Number(event.target.value));
/* Code by Daniel using ChatGPT November 15, 2026 */
});
$('#close-panel').addEventListener('click',closePanel);
$('#panel').addEventListener('cancel',function cancelDialog(event){event.preventDefault();closePanel();
/* Code by Daniel using ChatGPT November 15, 2026 */
});
$('#panel').addEventListener('click',function backdropClose(event){if(event.target!==this)return;const r=this.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closePanel();
/* Code by Daniel using ChatGPT November 15, 2026 */
});
$('#flight-skip').addEventListener('click',function skipTravel(){if(game.hallTransition)BD_MUSEUM.finish();else finishFlight();
/* Code by Daniel using ChatGPT November 15, 2026 */
});
canvas.addEventListener('pointerdown',function chooseFloor(event){if(!game.ready)return;if(event.button!==0||game.flight||game.hallTransition||BD_SCROLL.active())return;const point=eventPoint(event);walkTo(point);


/* Code by Daniel using ChatGPT November 16, 2026 */
});
document.addEventListener('keydown',function keyDown(event){
  if(!game.ready)return;
  const key=event.key.toLowerCase(),target=event.target;
  if(game.hallTransition){if(['escape','e','enter',' '].includes(key)){event.preventDefault();BD_MUSEUM.finish();}return;}
  if(target instanceof HTMLInputElement||target instanceof HTMLSelectElement||target instanceof HTMLTextAreaElement)return;
  if($('#panel').open){if(key==='escape'){event.preventDefault();closePanel();}return;}
  if(BD_SCROLL.key(event))return;
  if(['arrowleft','arrowright','arrowup','arrowdown','w','a','s','d'].includes(key)){event.preventDefault();game.keys.add(key);}
  if(event.repeat)return;
  if(key==='e'){event.preventDefault();investigateNearest();}else if(key==='m')showAtlas();else if(key==='j')showJournal();else if(key==='l')showLibrary();else if(key==='f')toggleFullscreen();else if(key==='escape'&&document.body.classList.contains('full-window')){document.body.classList.remove('full-window');positionHotspots();game.dirty=true;}


/* Code by Daniel using ChatGPT November 16, 2026 */
});
document.addEventListener('keyup',function keyUp(event){game.keys.delete(event.key.toLowerCase());
/* Code by Daniel using ChatGPT November 15, 2026 */
});
window.addEventListener('blur',function loseFocus(){game.inputActive=false;BD_CONTROLLER.pads={};BD_CONTROLLER.endWork();game.keys.clear();game.touchMove=null;game.padMove=null;game.player.walking=false;game.player.vx=game.player.vy=game.player.speed=0;
/* Code by Daniel using ChatGPT November 15, 2026 */
});
window.addEventListener('focus',function regainFocus(){game.inputActive=true;
/* Code by Daniel using ChatGPT November 15, 2026 */
});
document.addEventListener('visibilitychange',function visibilityChange(){game.keys.clear();game.touchMove=null;game.lastFrame=performance.now();updateAmbient();
/* Code by Daniel using ChatGPT November 15, 2026 */
});
document.addEventListener('fullscreenchange',function fullscreenChanged(){if(!document.fullscreenElement)document.body.classList.remove('full-window');positionHotspots();game.dirty=true;
/* Code by Daniel using ChatGPT November 15, 2026 */
});
window.addEventListener('resize',function resizeSceneTargets(){
  if(BD_CAMP.active())BD_CAMP.update(0,true);
  else positionHotspots();
});
for(const button of document.querySelectorAll('[data-move]')){
  button.addEventListener('pointerdown',function touchDirection(event){event.preventDefault();game.touchMove=this.dataset.move;this.setPointerCapture(event.pointerId);
/* Code by Daniel using ChatGPT November 15, 2026 */
});
  button.addEventListener('pointerup',function releaseTouch(){game.touchMove=null;
/* Code by Daniel using ChatGPT November 15, 2026 */
});
  button.addEventListener('pointercancel',function cancelTouch(){game.touchMove=null;
/* Code by Daniel using ChatGPT November 15, 2026 */
});
}

async function boot(){
  game.save=loadSave();game.player.kind=game.save.traveler;game.hall=game.save.hall;
  try{const missing=await BD_ART.load();$('#load-indicator').hidden=true;if(game.save.welcomed)BD_MUSEUM.enter('entry');else arriveAtMuseum();game.ready=true;if(missing)toast('Some illustrations could not load. Refresh when the connection is ready.');requestAnimationFrame(frame);const linked=BD_JOURNEY.boot();if(!linked&&!game.save.welcomed)BD_IMMERSION.inviteBackpack();}
  catch(error){$('#load-indicator').textContent='The museum could not open. Please reload the page.';console.error(error);}
/* Code by Daniel using ChatGPT November 20, 2026 */
}

BD_JOURNEY.install();
BD_FIELD.install();
BD_FIELD_GAMES.install();
BD_ADVENTURE.install();
BD_RESILIENCE.install();
BD_IMMERSION.install();
BD_KITCHEN.install();
BD_MAP_VIEW.install();
BD_FRAGMENTS.install();
BD_TRENCH.install();
BD_PAD.install();
BD_OPEN.install();
BD_ACCOUNTS.install();BD_STICK.install();BD_LINKS.install();BD_DESK.install();BD_BIBLE.install();/* Claude, 23 Nov 2026: Bible links and notices */
BD_INVESTIGATION.install();
BD_CULTURE.install();
BD_WG.install();
boot();
