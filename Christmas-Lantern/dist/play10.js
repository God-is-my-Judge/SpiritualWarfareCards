'use strict';
// Play in the existing valley. Miniatures use the same projected geometry at both scales.
const BOOK_SHELF10 = {};
const REPAIR_PARTS10 = {
 train:{title:'A little train axle',clue:'The wheels need to turn together on a straight axle. Compare the gap between them with each part.',parts:['Long axle','Short straight axle','Bent axle'],success:'The wheels turn freely. The little train rolls all the way to the end of the bench.',wrong:'Clonk, clonk. One wheel lifts off the bench. You can undo the fit and try another axle.'},
 bear:{title:'A patch for Robin’s bear',clue:'The tear is curved, and the cloth needs to bend when the bear sits down.',parts:['Stiff square patch','Soft rounded patch','Narrow strip'],success:'The seam lies flat. The bear sits, leans forward, and stays comfortably upright.',wrong:'The patch pulls the seam into a pucker. The bear leans over as though listening for his missing stuffing.'},
 bird:{title:'The songbird’s wing pin',clue:'The hinge has a short round opening. Its pin must leave room for the wing to lift.',parts:['Wide flat tab','Small round pin','Long crooked hook'],success:'The wing lifts and settles. The little bird is ready to sing at Mrs Bell’s window.',wrong:'The wing catches halfway up. It looks very surprised. Undo the fit and compare the hinge again.'}
};
const TRACK_GAPS10 = [1.25,3.1,5.05];
const NOTICE10 = {
 rail:['A hollow in the handrail','Beneath the frost is a shallow hollow, worn smooth by hands crossing the bridge. The wood is warmer in color where the grain has been polished.','Brush the frost aside','The little carved star becomes clear. Someone made it before this winter; many hands have kept it bright.'],
 cone:['Beneath the lowest bough','The cone has been turned in the snow. Some scales are nipped away, and a scatter of seed husks lies beside it.','Turn it gently','The hidden side has the same neat marks. You set it back beneath the shelter of the branch.'],
 handle:['The keeper’s small plane','The handle is darker where a thumb rests. The grain bends around its narrowest part.','Try the handle','Your thumb settles into the hollow. The keeper smiles: “That one was made for a hand, before it was made to look fine.”']
};

function playState10() {
 const p=state.play10;
 return p;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function installPlay10() {
 const old=state.play10&&typeof state.play10==='object'?state.play10:{};
 state.play10={repairs:{},train:{pieces:[0,0,0],wagon:0,laps:0},hat:'felt',opinions:0,parcel:{active:false,complete:false,visited:[],ties:0,carried:false},lantern:{glass:[false,true,true],shield:0,hook:0},notices:{},bookmarks:{},skatingBest:null,...old};
 const p=state.play10;
 if(typeof p.scriptureGiftSeed18!=='string'||!p.scriptureGiftSeed18||p.scriptureGiftSeed18.length>80)p.scriptureGiftSeed18=globalThis.crypto?.getRandomValues?crypto.getRandomValues(new Uint32Array(2)).join('-'):Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
 for(const key of ['repairs','notices','bookmarks'])if(!p[key]||typeof p[key]!=='object'||Array.isArray(p[key]))p[key]={};
 if(!p.train||!Array.isArray(p.train.pieces)||p.train.pieces.length!==3)p.train={pieces:[0,0,0],wagon:0,laps:0};
 p.train.pieces=p.train.pieces.map(function piece(n){return Number.isInteger(n)&&n>=0&&n<=3?n:0;/* Code by Daniel using ChatGPT November 13, 2026 */});
 if(!p.lantern||!Array.isArray(p.lantern.glass)||p.lantern.glass.length!==3)p.lantern={glass:[false,true,true],shield:0,hook:0};
 if(!p.parcel||!Array.isArray(p.parcel.visited))p.parcel={active:false,complete:false,visited:[],ties:0,carried:false};
 g.play10={activity:null,skate:null,snowRoutine:null,worldTrainAngle:0,parcelBird:0,arrivalRoom:state.room,birdNotes:0,birdNext:0};
 installShortLibrary22();
 ROOMS.workshop.blocked=ROOMS.workshop.blocked||[];
 ROOMS.workshop.blocked.push({polygon:[[54,69],[91,69],[92,83],[54,84]]});
 ROOMS.workshop.spots.push({id:'tabletop-railway',x:73,y:87,hit:[59,59,27,24],play10:'train',label:'A little railway under the workshop lamps'},{id:'parcel-ribbon',x:25,y:63,hit:[25,40,8,9],play10:'parcel',label:'A parcel with rather too much ribbon'},{id:'plane-handle',x:54,y:58,hit:[49,21,6,6],play10:'notice',notice:'handle',label:'The keeper’s small wooden plane'});
 ROOMS.sleigh.spots.push({id:'bridge-lantern-play',x:44,y:64,hit:[30,35,7,8],play10:'lantern',label:'A flicker behind the lantern glass'},{id:'bridge-worn-rail',x:44,y:60,hit:[35,47,3,9],play10:'notice',notice:'rail',label:'A thumb-sized hollow beneath the frost'});
 ROOMS.pinepass.spots.push({id:'pine-cone-play',x:35,y:65,hit:[33,62,3,4],play10:'notice',notice:'cone',label:'Small marks beneath the pine bough'});
 ROOMS.rink.spots.push({id:'skating-card',x:29,y:47,hit:[27,42,5,4],play10:'skate',label:'A skating pattern folded beside the lamp'});
 ROOMS.grandmother.spots.push({id:'cottage-reading-nook',x:70,y:69,hit:[65,52,10,9],play10:'library',label:'A shelf of Christmas stories'});
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function setupPlay10() {
 const viewport=$('#viewport');
 viewport.insertAdjacentHTML('beforeend','<aside id="p10-skate-hud" class="p10-hud" hidden><p id="p10-skate-label"></p><button id="p10-skate-leave">Leave the skating game</button></aside><aside id="p10-parcel-hud" class="p10-hud p10-parcel-hud" hidden><p id="p10-parcel-label"></p><button id="p10-parcel-rest">Rest &amp; retie</button></aside>');
 $('#p10-skate-leave').onclick=leaveSkating10;$('#p10-parcel-rest').onclick=openParcel10;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function playAction10(t) {
 if(!t.play10)return false;
 if(t.play10==='train')openActivity10('train');else if(t.play10==='lantern')openActivity10('lantern');else if(t.play10==='notice')openActivity10('notice',t.notice);else if(t.play10==='parcel')openParcel10();else if(t.play10==='skate')skatingCard10();else if(t.play10==='library')showLibrary10();else if(t.play10==='delivery')deliveryScene10(t.owner);
 return true;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function playTargets10(all) {
 if(!g.play10)return all;
 const p=playState10().parcel;
 if(p.active&&!p.carried&&p.room===state.room)all.push({id:'resting-parcel',x:p.x,y:p.y+3,hit:[p.x-5,p.y-8,10,11],play10:'parcel',label:'Your parcel, safely resting here'});
 if(state.room==='clockshop')for(const [id,x,y]of [['widow',83,72],['family',53,75],['robin',25,76]]){const toy=TOYS.find(function owned(t){return t.owner===id;/* Code by Daniel using ChatGPT November 13, 2026 */});if(toyStatus(toy.id)==='delivered')all.push({id:'remembered-'+id,x,y,hit:id==='widow'?[82,36,8,10]:[x-4,y-15,8,14],play10:'delivery',owner:id,label:{widow:'The songbird at Mrs Bell’s window',family:'Samir’s train, running again',robin:'Robin and the bear who listens'}[id]});}
 return all;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function stopActivity10() {
 const a=g.play10?.activity;if(!a)return;
 a.alive=false;cancelAnimationFrame(a.frame);a.abort.abort();a.observer.disconnect();g.play10.activity=null;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function openActivity10(kind,id=null) {
 if(kind==='train'){beginRoomPlay21('railway');return;}
 showPanel('<div id="p10-root" class="play10"></div>',kind==='lantern'?'BESIDE THE BRIDGE LAMP':'A CLOSER LOOK');
 const root=$('#p10-root'),a={root,kind,id,alive:true,frame:0,last:0,time:0,angle:.15,running:false,selected:0,message:'',abort:new AbortController(),testUntil:0};
 g.play10.activity=a;
 root.addEventListener('click',activityAction10,{signal:a.abort.signal});
 a.observer=new MutationObserver(function activityRemoved10(){if(!root.isConnected)stopActivity10();/* Code by Daniel using ChatGPT November 13, 2026 */});
 a.observer.observe(root.parentNode,{childList:true});
 renderActivity10();focusPanelPrimary21();
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function partIcon10(id,index){
 const key='repair'+id[0].toUpperCase()+id.slice(1)+index;g.partIcons22=g.partIcons22||{};if(!g.partIcons22[key]){const frame=g.detailFrames22.world[key],c=document.createElement('canvas');c.width=130;c.height=75;const scale=id==='train'?.32:id==='bear'?.20:.28;detailFrame22(c.getContext('2d'),frame,65,38,frame.w*scale);g.partIcons22[key]=c.toDataURL();}return '<img src="'+g.partIcons22[key]+'" alt="">';
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function renderActivity10() {
 const a=g.play10.activity;if(!a)return;
 const focus=document.activeElement?.dataset?.p10,focusIndex=document.activeElement?.dataset?.index,p=playState10();
 let title='',intro='',controls='',hint='';
 if(a.kind==='train'){
  title='The little railway';intro='A winter valley small enough to fit beneath the workshop lamps. Fit the three gaps, choose a wagon, and see where the engine gets to.';
  controls='<div class="p10-row">'+p.train.pieces.map(function slot(piece,i){return '<button data-p10="gap" data-index="'+i+'">Bend '+(i+1)+' · '+['empty','curve toward the village','straight','curve away'][piece]+'</button>';/* Code by Daniel using ChatGPT November 13, 2026 */}).join('')+'</div><div class="p10-row"><button class="primary" data-p10="run">'+(a.running?'Pause train':state.motion?'Send the train':'Move train a little')+'</button><button data-p10="step">Move to next bend</button><button data-p10="wagon">Wagon · '+['apples','letters','Christmas parcels'][p.train.wagon||0]+'</button><button data-p10="bell">Ring station bell</button><button data-p10="rail-reset">Lift all three pieces</button></div>';
  hint='Look at the two rail ends at each gap. A piece can face toward the village, face away, or be straight. You can change any piece, stop the train, or start again.';
 }else if(a.kind==='repair'){
  const spec=REPAIR_PARTS10[a.id],r=p.repairs[a.id]||(p.repairs[a.id]={part:null,inspected:false,passed:false}),status=toyStatus(a.id);
  title=TOYS.find(function toy(t){return t.id===a.id;/* Code by Daniel using ChatGPT November 13, 2026 */}).title;intro=r.inspected?spec.clue:'Brush the toy clean, then look closely before choosing a part.';
  controls='<div class="p10-row"><button data-p10="inspect">Look closely</button><button data-p10="clean" '+(status==='found'?'':'disabled')+'>Brush away snow and dust</button></div><div class="p10-parts">'+spec.parts.map(function part(label,i){return '<button data-p10="part" data-index="'+i+'" aria-pressed="'+(a.selected===i)+'">'+partIcon10(a.id,i)+escapeHTML(label)+'</button>';/* Code by Daniel using ChatGPT November 13, 2026 */}).join('')+'</div><div class="p10-row"><button data-p10="fit" '+(status==='found'||!r.inspected?'disabled':'')+'>Fit this part</button><button data-p10="undo" '+(r.part===null?'disabled':'')+'>Undo the fit</button><button data-p10="test" '+(r.part===null?'disabled':'')+'>Test it gently</button><button class="primary" data-p10="wrap" '+(!r.passed?'disabled':'')+'>Wrap the working toy</button></div>';
  hint='The right part fits the shape you can see. Try a part, test it, and undo it freely. A wobble is only a clue; the toy is safe on the bench.';
 }else if(a.kind==='lantern'){
  title='A flicker behind the glass';intro='Snow blows from the left. Look at the vane, the gaps in the glass, and the little brass wind shield.';
  controls='<div class="p10-row">'+p.lantern.glass.map(function pane(closed,i){return '<button data-p10="glass" data-index="'+i+'" aria-pressed="'+closed+'">'+['Left','Front','Right'][i]+' glass · '+(closed?'closed':'open')+'</button>';/* Code by Daniel using ChatGPT November 13, 2026 */}).join('')+'</div><div class="p10-row"><button data-p10="shield">Wind shield · '+['folded back','on the left','on the right'][p.lantern.shield||0]+'</button><button data-p10="hook">Hook · '+(p.lantern.hook?'under the beam':'out on the post')+'</button><button data-p10="reflection">Read the bridge reflection</button></div>';
  hint='Watch which way the snow travels. An open pane lets a draft in. A shield on the side the wind comes from can shelter the flame. Every change can be undone.';
 }else{
  const n=NOTICE10[a.id];title=n[0];intro=n[1];controls='<div class="p10-row"><button data-p10="notice">'+n[2]+'</button></div>';hint='A small detail can be worth noticing without needing to take it home.';
 }
 a.root.innerHTML='<p class="p10-kicker">'+(a.kind==='train'?'THE WORKSHOP · TABLETOP VIEW':a.kind==='repair'?'THE WORKSHOP · ON THE BENCH':a.kind==='lantern'?'THE BRIDGE · UNDER THE BRASS HOOD':'A LITTLE THING, CLOSE AT HAND')+'</p><h2 id="panel-title">'+escapeHTML(title)+'</h2><p>'+escapeHTML(intro)+'</p><div class="p10-workspace"><canvas id="p10-canvas" width="900" height="540" role="img" aria-label="'+escapeHTML(title)+' close-up. All choices are available in the buttons below."></canvas><div class="p10-tools">'+controls+'</div></div><p class="p10-status" id="p10-status" role="status">'+escapeHTML(a.message||activityStatus10(a))+'</p><details class="p10-hint"><summary>Hint</summary><p>'+escapeHTML(hint)+'</p></details><button data-p10="exit">Step back into the room</button>';
 if(focus){const selector='[data-p10="'+focus+'"]'+(focusIndex!==undefined?'[data-index="'+focusIndex+'"]':'');const next=a.root.querySelector(selector);if(next&&!next.disabled)next.focus({preventScroll:true});}
 drawActivity10();if(state.motion&&!a.frame)a.frame=requestAnimationFrame(activityFrame10);
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function activityStatus10(a) {
 if(a.kind==='train')return 'The engine waits at the station. Every piece can be lifted and tried again.';
 if(a.kind==='lantern')return lanternDraft10()<.25?'The flame is steady. You can leave it sheltered, or try what happens when a pane opens.':'The flame leans and flutters in the draft.';
 if(a.kind==='notice')return playState10().notices[a.id]?NOTICE10[a.id][3]:'There is time to take a closer look.';
 return 'The bench is warm and the toy is safe. There is no timer.';
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function activityAction10(event) {
 const b=event.target.closest('button[data-p10]'),a=g.play10?.activity;if(!b||!a||!a.root.contains(b))return;
 const act=b.dataset.p10,index=Number(b.dataset.index),p=playState10();a.message='';
 if(act==='exit'){closePanel();return;}
 if(a.kind==='train'){
  if(act==='gap'){p.train.pieces[index]=(p.train.pieces[index]+1)%4;a.running=false;}
  else if(act==='run'){if(state.motion)a.running=!a.running;else advanceTrain10(a,.55);}
  else if(act==='step')advanceTrain10(a,.8);
  else if(act==='wagon')p.train.wagon=((p.train.wagon||0)+1)%3;
  else if(act==='bell'){AudioScene.tone(1046.5,.6,.16,'sine',true);a.bellUntil=a.time+1;a.message='Ting! The station keeper lifts a tiny green flag.';}
  else if(act==='rail-reset'){p.train.pieces=[0,0,0];a.running=false;a.angle=.15;}
 }else if(a.kind==='repair'){
  const r=p.repairs[a.id],spec=REPAIR_PARTS10[a.id];
  if(act==='inspect'){r.inspected=true;a.message=spec.clue;}
  else if(act==='clean'){if(toyStatus(a.id)==='found')state.quest.toys[a.id]='cleaned';a.message='The snow brushes away. Now you can see the opening clearly.';}
  else if(act==='part')a.selected=index;
  else if(act==='fit'){if(toyStatus(a.id)==='found'||!r.inspected)return;r.part=a.selected;r.passed=false;state.quest.toys[a.id]='mended';a.message='The part is fitted. Try it gently before wrapping.';}
  else if(act==='undo'){r.part=null;r.passed=false;state.quest.toys[a.id]='cleaned';a.message='The part lifts out. Nothing is lost; choose another if you like.';}
  else if(act==='test'){if(r.part===null)return;r.passed=r.part===1;a.testUntil=a.time+1.8;a.message=r.passed?spec.success:spec.wrong;if(r.passed&&a.id==='bird'){AudioScene.tone(784,.35,.10,'sine',true);}}
  else if(act==='wrap'){if(!r.passed||r.part!==1)return;state.quest.toys[a.id]='repaired';save();repairReady10(a.id);return;}
 }else if(a.kind==='lantern'){
  if(act==='glass')p.lantern.glass[index]=!p.lantern.glass[index];
  else if(act==='shield')p.lantern.shield=((p.lantern.shield||0)+1)%3;
  else if(act==='hook')p.lantern.hook=p.lantern.hook?0:1;
  else if(act==='reflection'){readBridge();return;}
 }else if(act==='notice'){p.notices[a.id]=!p.notices[a.id];a.message=p.notices[a.id]?NOTICE10[a.id][3]:'You leave it as you found it.';}
 save();renderActivity10();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function repairReady10(id) {
 showPanel('<h2 id="panel-title">Ready to carry home</h2><p>'+escapeHTML(TOYS.find(function toy(t){return t.id===id;/* Code by Daniel using ChatGPT November 13, 2026 */}).title)+' works again. You fold the paper around it.</p><div class="row"><button id="p10-deliver" class="primary">Walk to the clock shop</button><button id="p10-bench">Back to the bench</button></div>','A PARCEL WITH A NAME');
 $('#p10-deliver').onclick=function carryToy10(){closePanel();planRoom('clockshop');/* Code by Daniel using ChatGPT November 13, 2026 */};$('#p10-bench').onclick=repairBench;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function activityFrame10(now) {
 const a=g.play10?.activity;if(!a)return;a.frame=0;
 if(!a.alive||!a.root.isConnected||!panel.open){stopActivity10();return;}
 const dt=Math.min(.05,(now-(a.last||now))/1000);a.last=now;if(!document.hidden){a.time+=dt;if(a.kind==='train'&&a.running)advanceTrain10(a,dt*.72);drawActivity10();}
 if(state.motion)a.frame=requestAnimationFrame(activityFrame10);
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function advanceTrain10(a,amount) {
 const p=playState10().train,full=Math.PI*2,from=a.angle,to=from+amount;
 for(let i=0;i<3;i++){
  let gap=TRACK_GAPS10[i];while(gap<=from+.01)gap+=full;
  if(gap<=to+.08&&p.pieces[i]!==1){a.angle=Math.max(from,gap-.10);a.running=false;a.message=p.pieces[i]===0?'The engine stops at the empty gap. It waits for a piece.':'Peep! The rails do not quite meet at bend '+(i+1)+'. The engine waits while you try another piece.';if(p.pieces[i])AudioScene.tone(587,.16,.08,'triangle',true);if($('#p10-status'))$('#p10-status').textContent=a.message;return;}
 }
 a.angle=to;if(a.angle>=full+.15){a.angle-=full;p.laps=(p.laps||0)+1;save();a.message='Back at the station, with '+['apples','letters','Christmas parcels'][p.wagon||0]+' aboard.';if($('#p10-status'))$('#p10-status').textContent=a.message;}
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function lanternDraft10() {
 const l=playState10().lantern,inlet=!l.glass[0]?1:!l.glass[1]?.5:.08;
 return inlet*(l.shield===1?.2:1)*(l.hook?.45:1);
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function projectTable10(u,v,z=0) {
 return {x:450+u*300+v*95,y:272-u*28+v*145-z};
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function tablePoint10(t,offset=0) {
 return projectTable10((.78+offset)*Math.cos(t),(.62+offset)*Math.sin(t));
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function polygon10(c,points,color) {
 c.beginPath();points.forEach(function point(p,i){if(i)c.lineTo(p.x,p.y);else c.moveTo(p.x,p.y);/* Code by Daniel using ChatGPT November 13, 2026 */});c.closePath();c.fillStyle=color;c.fill();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function trainBox10(c,theta,offset,length,width,bottom,height,color) {
 const u=.78*Math.cos(theta),v=.62*Math.sin(theta),du=-.78*Math.sin(theta),dv=.62*Math.cos(theta),norm=Math.hypot(du,dv),ux=du/norm,uy=dv/norm;
 const corners=[];for(const [x,y]of [[-length,-width],[length,-width],[length,width],[-length,width]])corners.push(projectTable10(u+(x+offset)*ux-y*uy,v+(x+offset)*uy+y*ux,bottom));
 const top=corners.map(function raised(p){return {x:p.x,y:p.y-height};/* Code by Daniel using ChatGPT November 13, 2026 */});
 const faces=[];for(let i=0;i<4;i++){const j=(i+1)%4;faces.push({y:(corners[i].y+corners[j].y)/2,points:[corners[i],corners[j],top[j],top[i]],shade:i%2?'#6e4c35':color});}
 faces.sort(function farFirst(a,b){return a.y-b.y;/* Code by Daniel using ChatGPT November 13, 2026 */});for(const face of faces)polygon10(c,face.points,face.shade);polygon10(c,top,color);
 return {u,v,ux,uy};
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function miniatureTrain10(c,theta,wagon=false,load=0) {
 const u=.78*Math.cos(theta),v=.62*Math.sin(theta),du=-.78*Math.sin(theta),dv=.62*Math.cos(theta),norm=Math.hypot(du,dv),ux=du/norm,uy=dv/norm;
 for(const x of [-.105,.105])for(const y of [-.04,.04]){const p=projectTable10(u+x*ux-y*uy,v+x*uy+y*ux);c.fillStyle='#263b32';c.beginPath();c.ellipse(p.x,p.y-2,6,7,0,0,7);c.fill();c.fillStyle='#bd9a57';c.beginPath();c.arc(p.x,p.y-2,2,0,7);c.fill();}
 trainBox10(c,theta,0,.16,.048,9,23,wagon?'#b38345':'#b74439');
 if(!wagon){trainBox10(c,theta,-.075,.06,.052,32,25,'#315b46');trainBox10(c,theta,.105,.018,.025,32,25,'#34473a');const window=projectTable10(u-.09*ux+.05*uy,v-.09*uy-.05*ux,40);c.fillStyle='#f9df8e';c.fillRect(window.x-4,window.y-7,8,10);}
 else if(load===0){for(const x of [-.08,0,.08]){const p=projectTable10(u+x*ux,v+x*uy,36);c.fillStyle='#bd4d38';c.beginPath();c.arc(p.x,p.y,6,0,7);c.fill();}}
 else trainBox10(c,theta,0,.10,.035,32,load===1?8:18,load===1?'#f7eac6':'#326345');
 /* Code by Daniel using ChatGPT November 13, 2026 */
}

function drawRailway10(c){
 c.save();const scale=Math.min(c.canvas.width/1774,c.canvas.height/887);c.translate((c.canvas.width-1774*scale)/2,(c.canvas.height-887*scale)/2);c.scale(scale,scale);drawRailwayAttraction22(c);c.restore();
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function drawActivity10() {
 const a=g.play10?.activity,c=$('#p10-canvas')?.getContext('2d');if(!a||!c)return;
 c.clearRect(0,0,900,540);paintedBackdrop22(c,g.images.workshop,[500,220,630,460]);
 if(a.kind==='train'){drawRailway10(c,a.angle,playState10().train,a.time<(a.bellUntil||0));return;}
 if(a.kind==='repair')drawRepair10(c,a);else if(a.kind==='lantern')drawLantern10(c,a);else drawNotice10(c,a);
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function drawRepair10(c,a){
 paintRepair22(c,a);
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function drawLantern10(c,a){
 paintBridgeLantern22(c,a);
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function drawNotice10(c,a){
 paintNotice22(c,a);
 /* Code by Daniel using ChatGPT November 14, 2026 */
}

function snowMenu10() {
 if(!state.tales.snowman.alive)return;
 const p=playState10();
 $('#panel-content').insertAdjacentHTML('beforeend','<div class="play10"><h3>A little company</h3><div class="p10-parts"><button id="snow-hat-felt" aria-pressed="'+(p.hat==='felt')+'">🎩<span>The felt hat</span></button><button id="snow-hat-knit" aria-pressed="'+(p.hat==='knit')+'">◒<span>A red knitted cap</span></button></div><p id="snow-opinion" role="status">“I have been thinking about hats. There is a great deal to consider.”</p><div class="p10-row"><button id="snow-pose">Pose for a picture</button><button id="snow-dance">Try a little dance</button></div></div>');
 $('#snow-hat-felt').onclick=function feltHat10(){chooseSnowHat10('felt');/* Code by Daniel using ChatGPT November 13, 2026 */};
 $('#snow-hat-knit').onclick=function knittedHat10(){chooseSnowHat10('knit');/* Code by Daniel using ChatGPT November 13, 2026 */};
 $('#snow-pose').onclick=function poseSnow10(){startSnowRoutine10('pose');/* Code by Daniel using ChatGPT November 13, 2026 */};
 $('#snow-dance').onclick=function danceSnow10(){startSnowRoutine10('dance');/* Code by Daniel using ChatGPT November 13, 2026 */};
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function chooseSnowHat10(hat) {
 const p=playState10();p.hat=hat;p.opinions=(p.opinions||0)+1;save();
 $('#snow-hat-felt').setAttribute('aria-pressed',hat==='felt');$('#snow-hat-knit').setAttribute('aria-pressed',hat==='knit');
 const lines=hat==='felt'?['“Do I look as if I have an appointment? I should hate to be late for something I have not arranged.”','“A very serious hat. I shall try to have a serious thought underneath it.”']:['“My ears are warmer already.” He considers this. “I shall have to remember where I put them.”','“I like the bobble. It does most of the dancing without any help from me.”'];
 $('#snow-opinion').textContent=lines[p.opinions%2];
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function startSnowRoutine10(kind) {
 g.play10.snowRoutine={kind,age:0};closePanel();toast(kind==='pose'?'He stands as solemnly as a snowman can. Use Picture while he holds the pose.':'He begins with a dignified bow. The rest is less dignified.');
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function beginSnowPose10(x,y) {
 ctx.save();const r=g.play10?.snowRoutine;if(!r)return;
 const angle=r.kind==='dance'&&state.motion?Math.sin(r.age*7)*.075:r.kind==='pose'?.035:0;
 ctx.translate(x,y);ctx.rotate(angle);if(r.kind==='dance'&&state.motion)ctx.translate(0,-Math.abs(Math.sin(r.age*4))*7);ctx.translate(-x,-y);
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function drawSnowHat10(){
 paintSnowHat22();
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function skatePoints10() {
 const points=[];for(let i=0;i<16;i++){const t=i/16*Math.PI*2;points.push({x:50+22*Math.sin(t),y:62+13*Math.sin(2*t)});}return points;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function skatingCard10() {
 // Keep the old saved best only for compatibility; there is no clock or score in play.
 showPanel('<div class="play10"><h2 id="panel-title">A figure eight beneath the lamps</h2><p>Follow the next pale ring around a short figure eight. Take a wide turn, cross your own trail, and come home to the first ring.</p><p>Leave whenever you like. It is only a skating game; every story, friendship and gift stays open.</p>'+''+'<div class="p10-row"><button id="p10-skate-start" class="primary">Try the figure eight</button><button id="p10-skate-free">Just enjoy the ice</button></div></div>','A CARD BESIDE THE POND');
 $('#p10-skate-start').onclick=startSkating10;$('#p10-skate-free').onclick=closePanel;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function startSkating10() {
 g.play10.skate={next:0,elapsed:0,points:skatePoints10()};closePanel();refreshPlayHUD10();toast('The next ring glows a little brighter. Leave the game whenever you like.');
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function leaveSkating10() {
 if(!g.play10)return;g.play10.skate=null;refreshPlayHUD10();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function openParcel10() {
 const p=playState10().parcel;
 let text='',buttons='';
 if(!p.active){text=p.complete?'The clockmaker’s teaspoon is safely home. There is another practice parcel if you would like the joke again.':'The keeper has wrapped a parcel for the clockmaker. It is extremely large for something described as “only a little thing.” A length of ribbon has escaped.';buttons='<button class="primary" data-parcel="start">Carry the parcel</button>';}
 else{text=p.carried?'The parcel is still safe in your arms. The bow has '+(p.ribbonTied?'stayed tied, for the moment.':'acquired a very long tail. A cardinal is taking an interest.'):'The parcel rests exactly where you set it down. The route and ribbon work are remembered.';buttons=(p.carried?'<button data-parcel="retie">Rest and retie the ribbon</button><button data-parcel="rest">Set it down here</button>':'<button class="primary" data-parcel="pickup">Pick it up again</button>')+(p.carried&&p.visited.includes('hallway')&&state.room==='clockshop'?'<button class="primary" data-parcel="deliver">Hand it to the clockmaker</button>':'');}
 showPanel('<div class="play10"><h2 id="panel-title">A very large little parcel</h2><p>'+escapeHTML(text)+'</p><p class="p10-note">'+(p.active?'Visited: '+p.visited.map(function room(id){return escapeHTML(ROOMS[id]?.title||id);/* Code by Daniel using ChatGPT November 13, 2026 */}).join(' → '):'A short errand through three rooms, with as many rests as you need.')+'</p><div class="p10-row">'+buttons+'<button data-parcel="close">Keep exploring</button></div>'+taleHint('The clockmaker is reached from the workshop through the connecting gallery. A resting parcel stays where you put it; no repair or story progress is lost.')+'</div>','A PARCEL WITH FAR TOO MUCH PAPER');
 for(const b of panel.querySelectorAll('[data-parcel]'))b.onclick=parcelAction10;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function parcelAction10(event) {
 const act=event.currentTarget.dataset.parcel,p=playState10().parcel;
 if(act==='start'){Object.assign(p,{active:true,carried:true,complete:false,visited:['workshop'],ties:0,ribbonTied:false,room:null});}
 else if(act==='retie'){p.ribbonTied=true;p.ties++;toast('You sit a moment and retie the bow. The cardinal inspects the knot, then looks disappointed.');}
 else if(act==='rest'){p.carried=false;p.room=state.room;p.x=state.player.x;p.y=state.player.y;}
 else if(act==='pickup'){if(p.room!==state.room)return;p.carried=true;p.room=null;}
 else if(act==='deliver'){
  if(!p.active||!p.carried||state.room!=='clockshop'||!p.visited.includes('hallway'))return;
  p.active=false;p.carried=false;p.complete=true;save();refreshPlayHUD10();
  startDialogue09('widow',[['elf','The keeper said this was only a little thing.'],['npc','So he did. I began to wonder whether I had ordered a piano.','Clockmaker'],['elf','There is another layer of paper.'],['npc','And another. Ah! My teaspoon. We shall need it after all this work.','Clockmaker']]);return;
 }
 save();closePanel();refreshPlayHUD10();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function arrivalPlay10(id,from) {
 if(!g.play10||id===from)return;
 const p=playState10().parcel;
 if(p.active&&p.carried&&['workshop','hallway','clockshop'].includes(id)&&!p.visited.includes(id)){
  p.visited.push(id);p.ribbonTied=false;g.play10.parcelBird=5;save();
  toast(id==='hallway'?'The ribbon slips loose. A cardinal at the open doorway gives it a very interested look.':'Something tiny rings inside the enormous parcel. The clockmaker looks up.');
 }
 if(id==='clockshop'&&toyStatus('bird')==='delivered'){g.play10.birdNotes=3;g.play10.birdNext=.7;}
 if(id!=='rink')leaveSkating10();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function deliveryScene10(owner) {
 if(['widow','family','robin'].includes(owner)){startNeighbour20(owner);return;}
 const toy=TOYS.find(function owned(t){return t.owner===owner;/* Code by Daniel using ChatGPT November 13, 2026 */});if(!toy||toyStatus(toy.id)!=='delivered')return;
 const turns={widow:[['npc','Listen. He starts before the clock finishes striking.','Mrs Bell'],['elf','I remember the wing that would not lift.'],['npc','Now he sings at the window, where I can hear him while I mend.','Mrs Bell']],family:[['npc','He has carried the same three apples round the table four times.','Amina'],['npc','They are not the same apples. These are express apples.','Samir'],['elf','Then I shall stand clear of the express.']],robin:[['npc','He listens better now.','Robin'],['elf','Was it the seam?'],['npc','No. I think it is because he has been somewhere.','Robin']]};
 startDialogue09(owner,turns[owner]);
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function showLibrary10(genre='All'){
 showShortLibrary22(genre);
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function bookmark10(id,page) {
 if(!state.play10||page<0)return;playState10().bookmarks[id]=page;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function bookTools10(id,page) {
 const wrap=$('#panel-content .little-book');if(!wrap)return;wrap.classList.add('play10');
 wrap.insertAdjacentHTML('beforeend','<div class="p10-row"><button id="p10-book-nook">Return to the reading nook</button><small class="p10-resume">'+(page>=0?'Your bookmark is on this page.':'Your previous bookmark is kept until you open a story page.')+'</small></div>');$('#p10-book-nook').onclick=function returnToNook10(){showLibrary10();/* Code by Daniel using ChatGPT November 13, 2026 */};
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function refreshPlayHUD10() {
 const skate=g.play10?.skate,skateHUD=$('#p10-skate-hud'),parcelHUD=$('#p10-parcel-hud');if(!skateHUD||!parcelHUD)return;
 skateHUD.hidden=!skate||panel.open||state.room!=='rink';if(skate)$('#p10-skate-label').textContent=(skate.next===16?'Return to the first ring':'Follow the next pale ring. Take your time.');
 const p=playState10().parcel;parcelHUD.hidden=!p.active||!p.carried||panel.open;
 if(p.active)$('#p10-parcel-label').textContent=p.ribbonTied?'The bow is tied. The parcel is safe.':'A very large parcel. A very loose ribbon.';
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function updatePlay10(dt) {
 if(!g.play10)return;
 const q=g.play10,p=playState10();q.worldTrainAngle=(q.worldTrainAngle+dt*.5)%(Math.PI*2);q.parcelBird=Math.max(0,q.parcelBird-dt);
 if(q.snowRoutine){q.snowRoutine.age+=dt;if(q.snowRoutine.age>7)q.snowRoutine=null;}
 if(q.birdNotes&&state.room==='clockshop'){q.birdNext-=dt;if(q.birdNext<=0){AudioScene.tone([784,988,880][3-q.birdNotes],.35,.06);q.birdNotes--;q.birdNext=.5;}}
 if(q.skate){const s=q.skate;if(state.room!=='rink')leaveSkating10();else{s.elapsed+=dt;const next=s.points[s.next%16];if(Math.hypot(state.player.x-next.x,state.player.y-next.y)<3.5){s.next++;if(s.next===17){leaveSkating10();toast('A complete figure eight. Shall we go round again?');}}}}
 refreshPlayHUD10();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function playLayers10() {
 const layers=[];if(!g.play10)return layers;
 if(state.room==='workshop')layers.push({y:83,draw:drawWorkshopTable10});
 if(state.room==='rink')layers.push({y:0,draw:drawSkateTrail10},{y:46,draw:drawSkateCard10});
 if(state.room==='sleigh')layers.push({y:0,draw:drawBridgeFlicker10});
 if(state.room==='pinepass')layers.push({y:65,draw:drawConeClue10});
 if(state.room==='clockshop')layers.push({y:75,draw:drawReturnedToys10});
 const p=playState10().parcel;if(p.active&&(p.carried||p.room===state.room))layers.push({y:p.carried?state.player.y+.2:p.y,draw:drawParcel10});
 return layers;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function drawWorkshopTable10(){
 paintWorkshopRailway22();
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function drawSkateTrail10() {
 const s=g.play10.skate;if(!s||g.cleanScene)return;
 ctx.save();ctx.strokeStyle='#e6edc799';ctx.lineWidth=3;ctx.setLineDash([7,15]);ctx.beginPath();for(let i=0;i<=96;i++){const t=i/96*Math.PI*2,x=(50+22*Math.sin(t))*15.36,y=(62+13*Math.sin(2*t))*10.24;if(i)ctx.lineTo(x,y);else ctx.moveTo(x,y);}ctx.stroke();ctx.setLineDash([]);
 for(let i=0;i<16;i++){const p=s.points[i],next=i===s.next%16;ctx.strokeStyle=next?'#ffe6a9':'#dfebdf88';ctx.lineWidth=next?5:2;ctx.beginPath();ctx.ellipse(p.x*15.36,p.y*10.24,next?21:10,next?12:6,0,0,7);ctx.stroke();}ctx.restore();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function drawSkateCard10(){
 worldFrame22('letter',29*15.36,44*10.24,45,false,-.2);
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function drawBridgeFlicker10() {
 const steady=lanternDraft10()<.25,amount=steady?.30:state.motion?.10+.22*(.5+.5*Math.sin(g.worldAge*15)):.18;
 ctx.save();ctx.globalAlpha=amount;const glow=ctx.createRadialGradient(509,408,2,509,408,48);glow.addColorStop(0,'#fff4bd');glow.addColorStop(1,'#ffc65b00');ctx.fillStyle=glow;ctx.fillRect(459,358,100,100);ctx.restore();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function drawConeClue10(){
 worldFrame22('pinecone',34.4*15.36,64*10.24,24,false,.2);
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function drawReturnedToys10(){
 paintReturnedToys21();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}

function drawParcel10(){
 const p=playState10().parcel,x=(p.carried?state.player.x+4:p.x)*15.36,y=(p.carried?state.player.y-2:p.y)*10.24;ctx.save();ctx.translate(x,y);ctx.rotate(p.carried&&state.motion?Math.sin(g.worldAge*3)*.025:0);paintSprite(g.gifts[1],0,0,88);if(!p.ribbonTied)worldFrame22('letter',35,0,24,false,.2);ctx.restore();
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
