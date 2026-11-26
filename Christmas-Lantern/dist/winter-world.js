'use strict';
const WINTER_ART=['hallway','workshop','clockshop','trail','cave','horse-views','sleigh-views','bird-flap','neighbors','rime','toy-repairs'];
const TOYS=[{id:'bear',title:'Robin’s teddy bear',owner:'robin',at:[26,72]},{id:'train',title:'The visiting family’s little train',owner:'family',at:[75,78]},{id:'bird',title:'Mrs Bell’s clockwork songbird',owner:'widow',at:[36,49]}];
const COMPASS=[[0,1],[-.707,.707],[-1,0],[-.707,-.707],[0,-1],[.707,-.707],[1,0],[.707,.707]];
function installWinterWorld(){ROOMS.hall.spots.push({id:'hall-front',x:50,y:93,mark:[50,91],to:'hallway',label:'The connecting gallery',edgeDirection:'front',gate:[42,91.8,16,3]});ROOMS.hall.arrivals.hallway=[50,85];ROOMS.rink.spots.push({id:'pond-lane',x:50,y:93,mark:[50,91],to:'sleigh',label:'The snowy country lane',edgeDirection:'front',gate:[42,91.8,16,3]});
ROOMS.hallway={title:'The Christmas Gallery',image:'hallway',caption:'Left, right, ahead: the house has room to unfold.',help:'Workshop left. Clocks right. Snow ahead.',floor:43,spawn:[50,65],arrivals:{hall:[50,58],workshop:[13,70],clockshop:[87,70],sleigh:[50,85]},objects:[],spots:[{id:'gallery-hall',x:50,y:46,mark:[50,31],hit:[39,9,23,36],to:'hall',label:'The Lantern Hall',edgeDirection:'back'},{id:'gallery-workshop',x:5.8,y:69,mark:[11,37],hit:[0,13,18,36],to:'workshop',label:'The toy workshop',edgeDirection:'left',gate:[4,57,3,27]},{id:'gallery-clock',x:94.2,y:69,mark:[89,37],hit:[82,13,18,36],to:'clockshop',label:'The clock and watch shop',edgeDirection:'right',gate:[93,57,3,27]},{id:'gallery-lane',x:50,y:93,mark:[50,91],to:'sleigh',label:'Out into the snow',edgeDirection:'front',gate:[42,91.8,16,3]}]};
ROOMS.workshop={title:'The Lantern Toy Workshop',image:'workshop',caption:'Grace is the beginning. Love has ordinary things to do.',help:'Mend toys at the bench.',floor:49,spawn:[50,83],arrivals:{hallway:[13,67],sleigh:[86,65]},objects:[{npc:3,x:31,y:62,w:8,h:18,rx:2,ry:1}],spots:[{id:'workshop-gallery',x:5.8,y:69,mark:[8,40],hit:[0,23,16,32],to:'hallway',label:'The connecting gallery',edgeDirection:'left',gate:[4,59,3,26]},{id:'workshop-lane',x:94.2,y:69,mark:[92,40],hit:[85,20,15,35],to:'sleigh',label:'The snowy lane',edgeDirection:'right',gate:[93,59,3,26]},{id:'workshop-map',x:73,y:57,mark:[73,31],hit:[61,11,26,32],questAction:'map',label:'The map of the lost toys'},{id:'repair-bench',x:48,y:60,mark:[48,42],hit:[37,31,21,22],questAction:'repair',label:'The repair bench'},{id:'keeper',x:31,y:67,mark:[31,48],hit:[27,44,9,20],questAction:'keeper',label:'The workshop keeper'}]};
ROOMS.clockshop={title:'The Clockmaker’s Christmas',image:'clockshop',caption:'A warm place to wait, and time enough to listen.',help:'Visit Robin, Mrs Bell or Amina’s family.',floor:48,spawn:[50,84],arrivals:{hallway:[14,69],sleigh:[50,85]},objects:[{npc:0,x:23,y:70,w:8,h:15,rx:2,ry:1},{npc:1,x:72,y:74,w:8,h:17,rx:2,ry:1},{npc:2,x:49,y:64,w:12,h:18,rx:4,ry:1}],spots:[{id:'clock-gallery',x:5.8,y:77,mark:[8,47],hit:[0,27,15,31],to:'hallway',label:'The connecting gallery',edgeDirection:'left',gate:[4,64,3,24]},{id:'clock-lane',x:50,y:93,mark:[50,91],to:'sleigh',label:'The snowy village lane',edgeDirection:'front',gate:[42,91.8,16,3]},{id:'robin',x:23,y:75,mark:[23,59],hit:[19,53,9,18],neighbor:'robin',label:'Sit with Robin'},{id:'widow',x:72,y:79,mark:[72,62],hit:[68,56,9,19],neighbor:'widow',label:'Mrs Bell’s story'},{id:'family',x:49,y:69,mark:[49,51],hit:[43,45,13,21],neighbor:'family',label:'Welcome Amina’s family'}]};
ROOMS.sleigh={title:'The Snowy Bridge Road',image:'trail',caption:'A horse, a sleigh, and a snowy road beyond the pond.',help:'Walk to the sleigh to ride.',floor:5,spawn:[50,84],arrivals:{hallway:[50,84],rink:[50,84],clockshop:[15,68],workshop:[88,69],cave:[51,28]},footRadius:1.5,walkAreas:[{polygon:[[4,65],[33,60],[66,60],[96,64],[97,94],[3,94]]},{polygon:[[4,51],[17,51],[29,66],[4,80]]},{polygon:[[84,50],[97,49],[97,81],[74,70]]},{polygon:[[36.8,63],[44.8,24],[56.2,24],[64.2,63]]},{polygon:[[44,26],[56,26],[67,9],[63,4],[53,15]]}],objects:[],spots:[{id:'lane-gallery',x:50,y:92.3,mark:[50,91],to:'hallway',label:'Back to the warm gallery',edgeDirection:'front',gate:[43,91,14,3]},{id:'lane-clock',x:10,y:59,mark:[7,48],hit:[0,38,17,23],to:'clockshop',label:'The clockmaker’s door',edgeDirection:'left'},{id:'lane-workshop',x:91,y:61,mark:[92,44],hit:[85,31,15,27],to:'workshop',label:'The workshop door',edgeDirection:'right'},{id:'lane-cave',x:61,y:13,mark:[62,7],hit:[57,0,11,15],to:'cave',label:'Rime’s lantern-lit cave',edgeDirection:'back'},{id:'bridge-reflection',x:50,y:64,mark:[50,61],questAction:'bridge',label:'A thought beside the bridge'}]};
ROOMS.cave={title:'Rime’s Snowy Keeping Place',image:'cave',caption:'A large scarf, a chipped teacup, and toys waiting to go home.',help:'Rime’s toys are here.',floor:35,spawn:[50,87],arrivals:{sleigh:[50,86]},objects:[{monster:true,x:56,y:52,w:20,h:30,rx:6,ry:2}],spots:[{id:'cave-road',x:50,y:93,mark:[50,91],to:'sleigh',label:'The way back through the snow',edgeDirection:'front',gate:[42,91.8,16,3]},{id:'rime',x:56,y:59,mark:[56,31],hit:[46,21,21,33],questAction:'rime',label:'Speak with Rime'}]};
for(const id of Object.keys(ROOMS)){if(!ROOMS[id].arrivals)ROOMS[id].arrivals={};}state.vehicle=state.vehicle||{x:62,y:81,direction:4,phase:0};state.riding=false;g.weather={amount:.25,target:.25,next:22,wind:.1};g.birds=[];g.birdNext=8;g.worldAge=0;g.slide=null;installJourney();installChristmasTales();installRevision09();/* Code by Daniel using ChatGPT November 18, 2026 */}
function initializeWinterArt(){g.horses=[];g.sleighViews=[];g.cardinals=cardinalFlightFrames(g.images['bird-flap']);g.neighbors=[];g.rime=[];g.toys=[];for(let n=0;n<16;n++)g.horses.push(frameAsset(g.images['horse-views'],n%4,Math.floor(n/4),4,4));for(let n=0;n<8;n++)g.sleighViews.push(frameAsset(g.images['sleigh-views'],n%4,Math.floor(n/4),4,2));for(let n=0;n<4;n++){g.neighbors.push(frameAsset(g.images.neighbors,n%2,Math.floor(n/2),2,2));}for(let n=0;n<2;n++)g.rime.push(frameAsset(g.images.rime,n,0,2,1));for(let n=0;n<6;n++)g.toys.push(frameAsset(g.images['toy-repairs'],n%3,Math.floor(n/3),3,2));/* Code by Daniel using ChatGPT November 13, 2026 */}
function winterTargets(all){
 if(vehicleHere()){
  const v=state.vehicle,p=state.riding?v:vehicleBoardingPoint();
  all.push({id:'vehicle',x:p.x,y:p.y,mark:[v.x,v.y-7],hit:[v.x-7,v.y-12,14,14],ride:true,label:state.riding?'Slide out of the sleigh':'Climb into the sleigh'});
 }
 return playTargets10(taleTargets(all));
 /* Code by Daniel using ChatGPT November 12, 2026 */
/* Code by Daniel using ChatGPT November 13, 2026 */}

function winterAction(t){if(playAction10(t))return true;if(taleAction(t))return true;if(t.toy){collectToy(t.toy);return true;}if(t.neighbor){visitNeighbor(t.neighbor);return true;}if(t.questAction){if(t.questAction==='carollers')carolCorner();else if(t.questAction==='pass')journeySign();else if(t.questAction==='keeper')talkBlock09(TOY_QUEST_CONTENT.workshop_introduction,'keeper',showQuestMap);else if(t.questAction==='repair')repairBench();else if(t.questAction==='rime')visitRime();else if(t.questAction==='bridge')readBridge();else showQuestMap();return true;}if(t.ride){if(state.riding)leaveVehicle();else mountVehicle();return true;}return false;/* Code by Daniel using ChatGPT November 11, 2026 *//* Code by Daniel using ChatGPT November 12, 2026 *//* Code by Daniel using ChatGPT November 13, 2026 */}
function vehicleScale(y,room=state.room,x=50){return depthScale({x,y},room);/* Code by Daniel using ChatGPT November 13, 2026 */}
function vehicleParts(v=state.vehicle,room=v.room||state.room){const d=COMPASS[v.direction],scale=vehicleScale(v.y,room,v.x);return {sleigh:{x:v.x,y:v.y},horse:{x:v.x+d[0]*9*scale,y:v.y+d[1]*7*scale},scale};/* Code by Daniel using ChatGPT November 13, 2026 */}
function vehicleMap(room=state.room){const r=ROOMS[room];return {semantic:true,walkAreas:r.walkAreas,blocked:[...(r.blocked||[]),...r.objects.map(solidObjectShape)],roadAreas:[],lowRocks:[]};/* Code by Daniel using ChatGPT November 13, 2026 */}
function vehicleFits(v,room=state.room){
 const parts=vehicleParts(v,room),map=vehicleMap(room),scale=parts.scale;
 // The elf may continue into the cave; the team waits just outside its painted lip.
 if(room==='pinepass'&&parts.horse.x>=80&&parts.horse.x<=95&&parts.horse.y<36.5)return false;
 if(room==='sleigh'&&v.y>=21&&v.y<=66){
  for(const [point,halfWidth]of [[parts.sleigh,3],[parts.horse,2.5]])for(const dx of [-halfWidth,0,halfWidth])for(const dy of [-1.4,0,1.4])if(!Exploration.pointFree({x:point.x+dx*scale,y:point.y+dy*scale},map,true))return false;
 }else for(const point of [parts.sleigh,parts.horse])for(const [dx,dy]of [[0,0],[2.2,0],[-2.2,0],[0,1.2],[0,-1.2]])if(!Exploration.pointFree({x:point.x+dx*scale,y:point.y+dy*scale},map,true))return false;
 const n=Math.max(1,Math.ceil(Math.hypot(parts.horse.x-v.x,parts.horse.y-v.y)/.4));
 for(let i=1;i<n;i++)if(!Exploration.pointFree({x:v.x+(parts.horse.x-v.x)*i/n,y:v.y+(parts.horse.y-v.y)*i/n},map,true))return false;
 return v.y>(room==='sleigh'?8:room==='pinepass'?10:5)&&v.y<93;
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function repairVehiclePose(){const v=state.vehicle;if(!Number.isFinite(v.x)||!Number.isFinite(v.y)){v.x=50;v.y=80;}if(!Number.isInteger(v.direction)||v.direction<0||v.direction>7)v.direction=4;if(!Number.isFinite(v.phase))v.phase=0;if(!ROAD_ROOMS.includes(v.room))v.room='sleigh';if(vehicleFits(v,v.room))return false;const directions=[v.direction,4,0,2,6,1,3,5,7];for(let radius=0;radius<=8;radius+=.5)for(let n=0;n<(radius?16:1);n++)for(const direction of directions){const candidate={...v,x:v.x+Math.cos(n*Math.PI/8)*radius,y:v.y+Math.sin(n*Math.PI/8)*radius,direction};if(vehicleFits(candidate,v.room)){Object.assign(v,candidate);return true;}}Object.assign(v,{x:50,y:80,direction:4});return true;/* Code by Daniel using ChatGPT November 11, 2026 */}
function vehicleStepClear(from,to){const count=Math.max(1,Math.ceil(Math.hypot(to.x-from.x,to.y-from.y)/.15));for(let i=1;i<=count;i++)if(!vehicleFits({...to,x:from.x+(to.x-from.x)*i/count,y:from.y+(to.y-from.y)*i/count}))return false;return true;/* Code by Daniel using ChatGPT November 11, 2026 */}
function moveVehicle(input,dt){
 const v=state.vehicle;if(!Math.hypot(input.x,input.y))return;repairVehiclePose();let x=input.x,y=input.y,direction=(Math.round((Math.atan2(y,x)-Math.PI/2)/(Math.PI/4))+8)%8;
 const length=Math.max(1,Math.hypot(x,y)),amount=18*dt*vehicleParts(v).scale,dx=x/length*amount,dy=y/length*amount,options=[{...v,x:v.x+dx,y:v.y+dy,direction},{...v,x:v.x+dx,y:v.y+dy}];
 if(dx&&dy)options.push({...v,x:v.x+dx,direction},{...v,y:v.y+dy,direction},{...v,x:v.x+dx},{...v,y:v.y+dy});
 const next=options.find(function clearStep(p){return vehicleStepClear(v,p);/* Code by Daniel using ChatGPT November 11, 2026 */});
 if(next){const distance=Math.hypot(next.x-v.x,next.y-v.y);v.x=next.x;v.y=next.y;v.direction=next.direction;v.phase=(v.phase+distance*.16)%1;g.vehicleBlocked=0;}else{g.vehicleBlocked=(g.vehicleBlocked||0)+dt;if(g.vehicleBlocked>1.2&&g.worldAge-(g.vehicleHintAt||-20)>4){toast('Stay on the road. Back up to turn.');g.vehicleHintAt=g.worldAge;}}
 state.player={x:v.x,y:v.y};g.direction=v.direction;
 if(next)for(const t of ROOMS[state.room].spots){const gate=t.rideGate;if(!gate||!t.rideArrival)continue;const forward=t.edgeDirection==='front'?y>0:y<0;if(forward&&v.x>=gate[0]&&v.x<=gate[0]+gate[2]&&v.y>=gate[1]&&v.y<=gate[1]+gate[3]){travelVehicle(t.to,t.rideArrival.slice(0,2),t.rideArrival[2]);break;}}
 /* Code by Daniel using ChatGPT November 18, 2026 */}
// Boarding is a promise made by the star, even if the parked rig blocks the walking route.
function requestVehicleBoarding(target){
 const route=routeTo09(state.player,target,roomMap());
 g.pending={...target,room:state.room,destination:route.end,boarding:{elapsed:0,stalled:0}};
 g.steps=smoothWalk(route.path,roomMap());g.velocity={x:0,y:0};g.ride=false;
 return true;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function updateVehicleBoarding(dt,moved){
 const action=g.pending,attempt=action?.boarding;
 if(!attempt)return;
 attempt.elapsed+=dt;attempt.stalled=moved>.001?0:attempt.stalled+dt;
 const arrived=Math.hypot(state.player.x-action.destination.x,state.player.y-action.destination.y)<.65;
 if(arrived||!g.steps.length||attempt.stalled>=.7||attempt.elapsed>=4){g.pending=null;g.steps=[];activate(action);}
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function boardingSlideClear(from,to){
 const r=ROOMS[state.room],map={...roomMap(),blocked:[...taleObstacles(),...(r.blocked||[]),...r.objects.map(solidObjectShape)]};
 const distance=Math.hypot(from.x-to.x,from.y-to.y);
 if(distance>10)return false;
 const steps=Math.max(1,Math.ceil(distance/.4));
 for(let i=0;i<=steps;i++)if(!Exploration.free({x:from.x+(to.x-from.x)*i/steps,y:from.y+(to.y-from.y)*i/steps},map,true))return false;
 return true;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function mountVehicle(){
 if(!vehicleHere())return;
 const v=state.vehicle,to={x:v.x,y:v.y},from={...state.player},fade=!boardingSlideClear(from,to);
 g.steps=[];g.pending=null;g.velocity={x:0,y:0};
 // A distant or obstructed approach ends with a gentle seat reveal rather than a slide through scenery.
 g.slide={from:fade?to:from,to,elapsed:0,duration:state.motion?(fade?.3:.45):.05,mounting:true,fade};
 if(fade)state.player={...to};
 dogBoarding27();state.riding=true;g.ride=true;toast('Riding! Interact to get off.','ride');save();
 /* Code by Daniel using ChatGPT November 20, 2026 */}
function leaveVehicle(){if(!state.riding)return;clearToast('ride');state.riding=false;const v=state.vehicle,map=roomMap(),candidates=[[6,3],[-6,3],[0,6],[0,-6],[5,0],[-5,0]],point=candidates.map(function exitPoint(p){return {x:v.x+p[0],y:v.y+p[1]};/* Code by Daniel using ChatGPT November 11, 2026 */}).find(function safeExit(p){return Exploration.free(p,map,true);/* Code by Daniel using ChatGPT November 11, 2026 */})||Exploration.safe({x:v.x,y:v.y+4},map,true);state.riding=false;g.ride=false;g.slide={from:{...state.player},to:point,elapsed:0,duration:state.motion?.45:.05,mounting:false};state.player=point;g.steps=[];g.pending=null;save();/* Code by Daniel using ChatGPT November 20, 2026 */}
function updateWinter(dt){g.worldAge+=dt;updateNeighborTurns(dt);if(g.slide){g.slide.elapsed+=dt;const t=ease(g.slide.elapsed/g.slide.duration);state.player={x:g.slide.from.x+(g.slide.to.x-g.slide.from.x)*t,y:g.slide.from.y+(g.slide.to.y-g.slide.from.y)*t};if(t>=1)g.slide=null;}if(onRoad()){g.weather.next-=dt;if(g.weather.next<=0){const r=Math.random();g.weather.target=r<.055?.98:r<.35?.62:.2+Math.random()*.18;g.weather.next=24+Math.random()*34;g.weather.wind=(Math.random()-.2)*.8;}g.weather.amount+=(g.weather.target-g.weather.amount)*(1-Math.exp(-dt*.25));}updateCardinals(dt);updateTales(dt);/* Code by Daniel using ChatGPT November 11, 2026 */}
function paintSprite(frame,x,y,height,width=null){const w=width||height*frame.w/frame.h;ctx.drawImage(frame.canvas,x-w/2,y-height,w,height);/* Code by Daniel using ChatGPT November 11, 2026 */}
function drawVehicle(){const v=state.vehicle,parts=vehicleParts(v),scale=parts.scale,horse=g.horses[v.direction+(state.motion&&Math.floor(v.phase*2)%2?8:0)],sleigh=g.sleighViews[v.direction],sx=v.x*15.36,sy=v.y*10.24,hx=parts.horse.x*15.36,hy=parts.horse.y*10.24;shadow(sx,sy,65*scale,9*scale);shadow(hx,hy,38*scale,7*scale);ctx.strokeStyle='#72523a';ctx.lineWidth=2*scale;ctx.beginPath();ctx.moveTo(sx,sy-48*scale);ctx.lineTo(hx,hy-46*scale);ctx.stroke();const layers=[{y:parts.horse.y,draw:function horseLayer(){paintSprite(horse,hx,hy,158*scale);/* Code by Daniel using ChatGPT November 13, 2026 */}},{y:v.y,draw:function sleighLayer(){paintSprite(sleigh,sx,sy,115*scale);if(state.riding&&(!g.slide||g.slide.fade)){const rider=g.frames[(state.avatar==='girl'?8:0)+v.direction];ctx.save();if(g.slide?.fade)ctx.globalAlpha=ease(g.slide.elapsed/g.slide.duration);ctx.beginPath();ctx.rect(sx-45*scale,sy-130*scale,90*scale,76*scale);ctx.clip();paintSprite(rider,sx,sy-25*scale,96*scale);ctx.restore();}/* Code by Daniel using ChatGPT November 13, 2026 */}}];layers.sort(function depth(a,b){return a.y-b.y;/* Code by Daniel using ChatGPT November 13, 2026 */});for(const layer of layers)layer.draw();/* Code by Daniel using ChatGPT November 13, 2026 */}
function drawBridgeForeground(){if(state.room!=='sleigh')return;const polygons=[[[30.5,61],[30.5,42],[34.6,40.8],[39.7,23.5],[42.6,20.7],[45.4,20.8],[45.1,27.1],[42.6,28.3],[39.3,41.7],[36.8,57.9],[36.4,61]],[[56.2,20.5],[59.8,20.5],[63.7,29],[67.2,42],[70.8,42],[71.1,61],[65.7,61],[63.4,48],[60.6,35],[57.3,27]]];ctx.save();ctx.beginPath();for(const poly of polygons){ctx.moveTo(poly[0][0]*15.36,poly[0][1]*10.24);for(const p of poly.slice(1))ctx.lineTo(p[0]*15.36,p[1]*10.24);ctx.closePath();}ctx.clip();ctx.drawImage(g.images.trail,0,0,1536,1024);ctx.restore();/* Code by Daniel using ChatGPT November 11, 2026 */}
function drawWinterDetails(now){if(onRoad()&&state.motion){const amount=g.weather.amount,count=Math.floor(45+amount*155);ctx.fillStyle='#f3f7ffb0';for(let i=0;i<count;i++){const x=(i*237.7+now*(.018+amount*.08)+g.weather.wind*now*.03)%1536,y=(i*141.2+now*(.035+amount*.06)*(1+i%2))%1024;ctx.beginPath();ctx.ellipse(x,y,1+i%3*.5,1.4+amount*2,.4,0,Math.PI*2);ctx.fill();}if(amount>.75){ctx.fillStyle=`rgba(219,232,243,${(amount-.75)*.6})`;ctx.fillRect(0,0,1536,1024);}}drawCardinals();/* Code by Daniel using ChatGPT November 11, 2026 */}
function winterHint(){if(onRoad()&&!vehicleHere())return 'Your horse and sleigh wait where you parked them: '+ROOMS[state.vehicle.room].title+'.';if(onRoad()&&state.riding)return state.room==='snowgarden'?'Follow the lane to the garden gate · Interact to park and step out.':state.room==='pinepass'?'The left lane leads to Grandmother · Interact to park and step out.':'Steer the sleigh · Interact to slide out · keep the team inside the bridge rails.';if(onRoad()&&g.weather.amount>.8)return 'A rare snow squall! The lanterns still mark the road; warm doors are nearby.';return null;/* Code by Daniel using ChatGPT November 14, 2026 */}
function nativeGameFullscreen(){
 return document.fullscreenElement||document.webkitFullscreenElement;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
async function fullscreenEscapeAvailable(){
 if(typeof navigator.keyboard?.lock!=='function')return false;
 // Do not add a permission prompt to a child's game. Older implementations have no descriptor.
 try{const permission=await navigator.permissions.query({name:'keyboard-lock'});return permission.state==='granted';}
 catch{return true;}
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function releaseFullscreenEscape(){
 if(g.fullscreenEscapeLocked){navigator.keyboard?.unlock();g.fullscreenEscapeLocked=false;}
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
async function toggleFullScreen(){
 if(g.fullscreenBusy)return;
 g.fullscreenBusy=true;
 try{
  const shell=$('.game-shell'),active=nativeGameFullscreen();
  if(active){releaseFullscreenEscape();const exit=document.exitFullscreen||document.webkitExitFullscreen;if(exit)await exit.call(document);return;}
  if(document.body.classList.contains('theater')){document.body.classList.remove('theater');return;}
  const request=shell.requestFullscreen||shell.webkitRequestFullscreen;
  if(request&&await fullscreenEscapeAvailable()){
   let nativeEntered=false;
   try{
    await request.call(shell,{navigationUI:'hide'});
    nativeEntered=true;
    await navigator.keyboard.lock(['Escape']);
    // A browser/system exit during the asynchronous request must remain an exit.
    if(!nativeGameFullscreen()){navigator.keyboard.unlock();return;}
    g.fullscreenEscapeLocked=true;return;
   }catch{
    navigator.keyboard?.unlock();g.fullscreenEscapeLocked=false;
    if(nativeEntered&&!nativeGameFullscreen())return;
    if(nativeGameFullscreen()){const exit=document.exitFullscreen||document.webkitExitFullscreen;if(exit)await exit.call(document);}
   }
  }
  // The existing viewport-filling mode gives the same Escape order when native keys are reserved.
  document.body.classList.add('theater');
 }finally{g.fullscreenBusy=false;updateFullScreenLabel();}
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function updateFullScreenLabel(){
 const active=immersiveActive();
 if(!nativeGameFullscreen())releaseFullscreenEscape();
 document.body.classList.toggle('immersive',active);
 $('#fullscreen').setAttribute('aria-label',active?'Exit fullscreen':'Enter fullscreen');
 $('#fullscreen').setAttribute('aria-pressed',String(active));
 $('#fullscreen').innerHTML=active?'⛶ <span>Exit fullscreen</span>':'⛶ <span>Fullscreen</span>';
 g.displayPan=null;updateImmersiveView(1);
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function fullscreenEscapeKey(event){
 if(event.code!=='Escape'&&event.key!=='Escape')return;
 if(g.wonder20?.play21?.mode&&!panel.open){event.preventDefault();event.stopImmediatePropagation();if(!event.repeat)endRoomPlay21();return;}
 if(wonderWatching20()){event.preventDefault();event.stopImmediatePropagation();if(!event.repeat)endBethlehem20();return;}
 if(!panel.open&&!immersiveActive())return;
 event.preventDefault();event.stopImmediatePropagation();
 if(event.repeat)return;
 if(panel.open)closePanel();else if(g.transition)finishTransition();else toggleFullScreen();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function setupWinterControls(){
 const shell=$('.game-shell');shell.append?.(panel);
 $('#waypack').onclick=waypack;$('#screenshot').onclick=saveScenePicture;$('#fullscreen').onclick=toggleFullScreen;
 document.addEventListener('fullscreenchange',updateFullScreenLabel);document.addEventListener('webkitfullscreenchange',updateFullScreenLabel);
 window.addEventListener('keydown',fullscreenEscapeKey,true);
 window.addEventListener('pagehide',releaseFullscreenEscape);
 window.addEventListener('resize',function displayResized(){g.displayPan=null;updateImmersiveView(1);/* Code by Daniel using ChatGPT November 13, 2026 */});
 window.addEventListener('keydown',function fullScreenKey(e){if(e.code==='KeyF'&&!panel.open&&!e.target.matches('input,textarea,select')){e.preventDefault();toggleFullScreen();}/* Code by Daniel using ChatGPT November 13, 2026 */});
 updateFullScreenLabel();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function winterSettings(){memorySettings();talesSettings();wonderSettings20();$('#panel-content').insertAdjacentHTML('beforeend',`<details><summary>The toy adventure</summary><p>${state.tales.nameKnown?'Rime’s':'The Snow Monster’s'} story unfolds through exploration, a mountain rescue, and later visits. Each completed recall round is saved. Hints remain folded until you ask for them.</p><label for="story-pace">Later ${state.tales.nameKnown?'Rime':'Snow Monster'} visits</label><select id="story-pace"><option value="daily">One new chapter per local day</option><option value="ready">Continue when ready</option></select><button id="quest-map">Read the workshop map</button><button id="restart-rime">Restart the ${state.tales.nameKnown?'Rime':'Snow Monster'} story…</button></details>`);$('#story-pace').value=state.storyPace;$('#story-pace').onchange=function pace(e){state.storyPace=e.target.value;save();/* Code by Daniel using ChatGPT November 11, 2026 */};$('#quest-map').onclick=showQuestMap;$('#restart-rime').onclick=confirmRimeRestart;/* Code by Daniel using ChatGPT November 11, 2026 *//* Code by Daniel using ChatGPT November 12, 2026 */}

function solidObjectShape(o){
 const height=o.h*(onRoad()?depthScale(o):1),frame=o.npc!==undefined?g.neighbors?.[o.npc]:o.carollers?g.carollers:null,width=frame?height*10.24*frame.w/frame.h/15.36:o.w;
 const half=width/2+(o.solidPad??.5),elfHeight=128*depthScale({x:o.x,y:o.y})/10.24;
 const bottom=o.y+(o.ry||1)*.45,top=Math.min(bottom-1.2,o.y-height+elfHeight*2/3);
 return {polygon:[[o.x-half,top],[o.x+half,top],[o.x+half,bottom],[o.x-half,bottom]]};
 /* Code by Daniel using ChatGPT November 13, 2026 */
}

function vehicleWalkingObstacles(){
 const p=vehicleParts(),d=state.vehicle.direction,horse=g.horses?.[d],sleigh=g.sleighViews?.[d],hh=158*p.scale,sh=115*p.scale;
 const hw=horse?hh*horse.w/horse.h/30.72:5,sw=sleigh?sh*sleigh.w/sleigh.h/30.72:5,result=[];
 for(const [part,half,depth]of [[p.sleigh,sw,4.2*p.scale],[p.horse,hw,3.4*p.scale]])result.push({polygon:[[part.x-half,part.y-depth],[part.x+half,part.y-depth],[part.x+half,part.y+1],[part.x-half,part.y+1]]});
 return result;
 /* Code by Daniel using ChatGPT November 12, 2026 */
}

function extraSceneLayers(){const layers=[...taleLayers(),...playLayers10(),...waySignLayers14(),...wonderLayers20()];if(vehicleHere())layers.push({y:state.vehicle.y,draw:drawVehicle});return layers;/* Code by Daniel using ChatGPT November 11, 2026 *//* Code by Daniel using ChatGPT November 13, 2026 */}
function reachedDoor(t,before,dx,dy,point=state.player){
 if(!t.to||t.wardrobe)return false;
 const gate=t.gate;if(!gate)return false;
 const forward=(t.entryDirections||[t.edgeDirection]).some(function approaching16(direction){return direction==='left'?dx<-.00001:direction==='right'?dx>.00001:direction==='front'?dy>.00001:dy<-.00001;/* Code by Daniel using ChatGPT November 13, 2026 */});
 return forward&&point.x>=gate[0]&&point.x<=gate[0]+gate[2]&&point.y>=gate[1]&&point.y<=gate[1]+gate[3];
 /* Code by Daniel using ChatGPT November 13, 2026 */
/* Code by Daniel using ChatGPT November 19, 2026 */
}
