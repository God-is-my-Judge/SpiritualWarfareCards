'use strict';
// Two elves, one household, one set of stories. No separate inventory or progress.
function coopEnabled28(){return !!(state.coop28?.enabled||g.coop28?.automatic);/* Code by Daniel using ChatGPT November 19, 2026 */}
function coopSeat28(owner){const seat=g.wonder20?.seat;return seat&&(seat.owner28||1)===owner?seat:null;/* Code by Daniel using ChatGPT November 19, 2026 */}
function setupCoop28(){
 state.coop28={enabled:state.coop28?.enabled===true,avatar:state.coop28?.avatar==='boy'?'boy':'girl',accent:state.coop28?.accent==='green'?'green':'blue'};
 g.coop28={automatic:false,joined:false,player:{...state.player},direction:0,walker:{phase:0,moving:false},velocity:{x:0,y:0},keys:new Set(),move:{x:0,y:0},steps:[],pending:null,primary:null,secondary:null,tints:new WeakMap(),camera:null,skate:null,trails:[],interactor:1,parcelOwner:1};
 $('#viewport').insertAdjacentHTML('afterend','<aside id="coop-skate28" class="coop-skate28" hidden><span role="status" id="coop-skate-status28"></span><button id="coop-skate-finish28">Free skate</button></aside>');
 $('#coop-skate-finish28').onclick=function finish(){endCoopSkate28();/* Code by Daniel using ChatGPT November 19, 2026 */};
 window.addEventListener('keydown',coopKey28,true);
 window.addEventListener('keyup',function release(e){g.coop28.keys.delete(e.code);/* Code by Daniel using ChatGPT November 19, 2026 */},true);
 window.addEventListener('blur',function blurred(){pauseCoop28();g.coop28.suspended=true;g.pads={};/* Code by Daniel using ChatGPT November 19, 2026 */});
 window.addEventListener('focus',function focused(){g.coop28.suspended=false;g.pads={};/* Code by Daniel using ChatGPT November 19, 2026 */});
 document.addEventListener('visibilitychange',function visible(){pauseCoop28();g.coop28.suspended=document.hidden;g.pads={};/* Code by Daniel using ChatGPT November 19, 2026 */});
 syncCoop28();
 /* Code by Daniel using ChatGPT November 19, 2026 */
}
function pauseCoop28(){
 const c=g.coop28;if(!c)return;c.keys.clear();c.move={x:0,y:0};c.velocity={x:0,y:0};c.walker.moving=false;c.steps=[];c.pending=null;
 /* Code by Daniel using ChatGPT November 19, 2026 */
}
function syncCoop28(){
 const c=g.coop28;if(!c)return;const on=coopEnabled28();if(on===c.joined)return;c.joined=on;document.body.classList.toggle('coop-playing28',on);pauseCoop28();g.keys.clear();g.velocity={x:0,y:0};g.steps=[];g.pending=null;c.camera=null;
 if(on){coopArrival28();g.wonder20.coopMove=null;toast('Two elves, one adventure. Player two: WASD + Enter.');}
 else{endCoopSkate28();c.primary=c.secondary=null;if(g.wonder20?.play21){const d=g.wonder20.play21.devices;d.primary=null;d.secondary=null;d.friendKeys.clear();}}
 const checkbox=$('#coop-enabled28');if(checkbox){checkbox.checked=on;checkbox.disabled=c.automatic;}
 /* Code by Daniel using ChatGPT November 19, 2026 */
}
function coopArrival28(){
 const c=g.coop28;if(!c)return;pauseCoop28();c.camera=null;c.ice=null;c.skate=null;c.trails=[];c.wasRiding=false;const p=state.player,map=roomMap();let chosen=null;
 for(const [dx,dy]of [[5,0],[-5,0],[0,4],[3,3],[-3,3],[0,-4]]){const point={x:p.x+dx,y:p.y+dy};if(Exploration.free(point,map,true)){chosen=point;break;}}
 c.player=chosen||safeRoomArrival({x:p.x+2,y:p.y+2});c.direction=g.direction;c.walker.phase=0;refreshCoopHUD28();
 /* Code by Daniel using ChatGPT November 19, 2026 */
}
function routeCoopPads28(samples){
 const c=g.coop28;if(!c)return null;c.automatic=samples.length>=2;syncCoop28();if(!coopEnabled28())return null;
 if(c.suspended){c.move={x:0,y:0};g.padHolding21=false;return {move:{x:0,y:0},press:{}};}
 const find=function find(index){return samples.find(s=>s.p.index===index);/* Code by Daniel using ChatGPT November 19, 2026 */};
 if(!find(c.primary)){const old=g.wonder20.play21.devices.primary;c.primary=samples.find(s=>s.p.index!==c.secondary&&'pad:'+s.p.index===old)?.p.index??samples.find(s=>s.p.index!==c.secondary)?.p.index??null;}
 if(!find(c.secondary)||c.secondary===c.primary)c.secondary=samples.find(s=>s.p.index!==c.primary)?.p.index??null;
 const one=find(c.primary)?.r||{},two=find(c.secondary)?.r||{},shared=panel.open||!!g.wonder20.play21.mode||!!g.transition||wonderWatching20();
 c.move={x:two.x||0,y:two.y||0};g.wonder20.coopMove=null;
 const press={};for(const k of ['a','b','west','north','start'])press[k]=!!one[k]||(shared||['west','north','start'].includes(k)||k==='b'&&state.room==='rink'?!!two[k]:false);
 if(shared){const a=Math.hypot(one.x||0,one.y||0),b=Math.hypot(two.x||0,two.y||0),m=b>a?two:one;return {move:{x:m.x||0,y:m.y||0},press};}
 g.padHolding21=c.parcelOwner===2?!!two.aHeld||c.keys.has('Enter'):!!one.aHeld;
 return {move:{x:one.x||0,y:one.y||0},press,secondA:!!two.a};
 /* Code by Daniel using ChatGPT November 19, 2026 */
}
function coopInput28(){
 const c=g.coop28,k=c.keys;return {x:k.has('KeyD')?1:k.has('KeyA')?-1:c.move.x,y:k.has('KeyS')?1:k.has('KeyW')?-1:c.move.y};
 /* Code by Daniel using ChatGPT November 19, 2026 */
}
function coopPanelKey28(e){
 if(e.target.matches('textarea,input:not([type=checkbox]):not([type=radio]):not([type=range])'))return false;
 if(!['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Enter','KeyE'].includes(e.code))return false;
 e.preventDefault();e.stopImmediatePropagation();const items=controllerFocus(),el=document.activeElement,negative=['KeyW','KeyA','ArrowUp','ArrowLeft'].includes(e.code),horizontal=['KeyA','KeyD','ArrowLeft','ArrowRight'].includes(e.code),direction=negative?-1:1;
 if(['Enter','KeyE'].includes(e.code)){if(!e.repeat)el?.click();return true;}
 if(horizontal&&el?.type==='range'){el.stepUp(direction);el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));}
 else if(horizontal&&el?.tagName==='SELECT'){el.selectedIndex=(el.selectedIndex+direction+el.options.length)%el.options.length;el.dispatchEvent(new Event('change',{bubbles:true}));}
 else items[(items.indexOf(el)+direction+items.length)%items.length]?.focus();return true;
 /* Code by Daniel using ChatGPT November 19, 2026 */
}
function coopKey28(e){
 if(e.ctrlKey||e.metaKey||e.altKey)return;
 if(!coopEnabled28())return;if(panel.open){coopPanelKey28(e);return;}
 if(e.target.matches('input,textarea,select'))return;
 if(!['KeyW','KeyA','KeyS','KeyD','Enter'].includes(e.code))return;
 e.preventDefault();e.stopImmediatePropagation();if(g.transition){if(e.code==='Enter'&&!e.repeat)finishTransition();return;}
 if(wonderWatching20())return;
 const c=g.coop28;if(g.wonder20.play21.mode){if(e.code==='Enter'&&!e.repeat)roomAction21();else if(e.code!=='Enter')roomPad21({x:e.code==='KeyD'?1:e.code==='KeyA'?-1:0,y:e.code==='KeyS'?1:e.code==='KeyW'?-1:0},{});return;}
 c.keys.add(e.code);if(e.code==='Enter'&&!e.repeat)interactCoop28();
 /* Code by Daniel using ChatGPT November 19, 2026 */
}
function activateCoop28(target){
 const c=g.coop28;c.interactor=2;c.parcelOwner=2;
 try{if(target.ride&&!state.riding)requestAction(target);else activate(target);}finally{c.interactor=1;}
 /* Code by Daniel using ChatGPT November 19, 2026 */
}
function interactCoop28(){
 if(!coopEnabled28()||panel.open||g.transition)return;if(state.riding){leaveVehicle();return;}
 const c=g.coop28;if(g.wonder20.seat?.owner28===2){standUp20();return;}
 const t=nearest(c.player);if(!t)return;if(t.distance<5){activateCoop28(t);return;}
 const map=roomMap(),route=routeTo09(c.player,t,map);if(route.distance>(t.to?3:7)){toast('A little closer.');return;}
 c.steps=smoothWalk(route.path,map);c.pending={...t,destination:route.end,room:state.room};c.velocity={x:0,y:0};
 /* Code by Daniel using ChatGPT November 19, 2026 */
}
function coopOnIce28(){
 const c=g.coop28,inside=onIce(c.player);if(state.room!=='rink'){c.ice=null;return false;}
 if(c.ice!==null&&c.ice!==inside){const p=ROOMS.rink.iceAreas[0].polygon;let distance=Infinity;for(let i=0;i<p.length;i++)distance=Math.min(distance,Exploration.segment(c.player,p[i],p[(i+1)%p.length]));if(distance<.24)return c.ice;}
 c.ice=inside;return inside;
 /* Code by Daniel using ChatGPT November 19, 2026 */
}
function updateCoop28(dt){
 const c=g.coop28;if(!c||!coopEnabled28())return;
 if(panel.open||document.hidden||c.suspended||g.paused||g.transition||wonderWatching20()||roomCaptures21()){c.walker.moving=false;c.velocity={x:0,y:0};refreshCoopHUD28();return;}
 if(state.riding||g.slide){c.player={...state.player};c.walker.moving=false;c.wasRiding=true;return;}
 if(c.wasRiding)coopArrival28();
 let input=coopInput28();if(Math.hypot(input.x,input.y)>.05){c.steps=[];c.pending=null;}
 else if(c.steps.length){const next=c.steps[0],dx=next.x-c.player.x,dy=next.y-c.player.y;if(Math.hypot(dx,dy)<.25)c.steps.shift();else input={x:dx,y:dy};}
 const before={...c.player},scale=depthScale(c.player),map=roomMap();map.footRadius=(ROOMS[state.room].footRadius||.65)*Math.min(1,scale);
 if(coopOnIce28()&&!c.pending&&!c.steps.length){const drag=Math.exp(-dt*1.45);c.velocity.x=c.velocity.x*drag+input.x*dt*33;c.velocity.y=c.velocity.y*drag+input.y*dt*24;const speed=Math.min(26,Math.hypot(c.velocity.x,c.velocity.y));c.player=Exploration.move(c.player,c.velocity,dt,map,true,speed*scale);if(Math.abs(c.player.x-before.x)<.0001)c.velocity.x*=.6;if(Math.abs(c.player.y-before.y)<.0001)c.velocity.y*=.6;if(!coopOnIce28())c.velocity={x:0,y:0};}
 else{c.velocity={x:0,y:0};c.player=Exploration.move(c.player,input,dt,map,true,(state.room==='rink'?19:17)*scale);}
 const dx=c.player.x-before.x,dy=c.player.y-before.y;Walker.advance.call(c.walker,dx,dy,.35/scale);if(Math.hypot(dx,dy)>.0001)c.direction=(Math.round((Math.atan2(dy,dx)-Math.PI/2)/(Math.PI/4))+8)%8;
 if(state.room==='rink'&&coopOnIce28()&&Math.hypot(dx,dy)>.03){c.trails.push({from:before,to:{...c.player}});if(c.trails.length>180)c.trails.shift();}
 if(c.pending&&Math.hypot(c.pending.destination.x-c.player.x,c.pending.destination.y-c.player.y)<.65){const t=c.pending;c.pending=null;c.steps=[];activateCoop28(t);}
 else if(g.sceneAge>.8&&Math.hypot(dx,dy)>.0001){const door=targets().find(t=>reachedDoor(t,before,dx,dy,c.player));if(door){activateCoop28(door);return;}if(state.room==='nativity'&&dy>0&&c.player.y>=FRONT_WALK23&&Math.abs(c.player.x-50)<8){beginWardrobe('closet');return;}}
 updateCoopSkate28();refreshCoopHUD28();
 /* Code by Daniel using ChatGPT November 19, 2026 */
}
function coopView28(base){
 if(!coopEnabled28()||!g.coop28||state.riding||wonderWatching20())return base;const c=g.coop28,points=[state.player,c.player],sizes=points.map(p=>128*elfVisualScale24(p)),activity=g.wonder20.play21.mode;if(activity){points.push({x:activity.focus[0],y:activity.focus[1]});sizes.push(220);}
 const left=Math.max(0,Math.min(...points.map((p,i)=>p.x*15.36-sizes[i]*.5))-64),right=Math.min(1536,Math.max(...points.map((p,i)=>p.x*15.36+sizes[i]*.5))+64),top=Math.max(0,Math.min(...points.map((p,i)=>p.y*10.24-sizes[i]))-64),bottom=Math.min(1024,Math.max(...points.map(p=>p.y*10.24))+64);
 const zoom=Math.max(1,Math.min(base.zoom>1?base.zoom:1.10,1536/Math.max(1,right-left),1024/Math.max(1,bottom-top))),w=1536/zoom,h=1024/zoom;
 c.targetCamera={zoom,left:Math.max(0,Math.min(1536-w,(left+right-w)/2)),top:Math.max(0,Math.min(1024-h,(top+bottom-h)/2))};
 if(!c.camera)c.camera={...c.targetCamera};const view={...c.camera,zoom:Math.min(c.camera.zoom,zoom)},vw=1536/view.zoom,vh=1024/view.zoom;
 view.left=Math.max(0,Math.min(1536-vw,Math.max(right-vw,Math.min(left,view.left))));view.top=Math.max(0,Math.min(1024-vh,Math.max(bottom-vh,Math.min(top,view.top))));return view;
 /* Code by Daniel using ChatGPT November 19, 2026 */
}
function updateCoopCamera28(dt){
 const c=g.coop28;if(!c?.camera||!c.targetCamera)return;const blend=state.motion?1-Math.exp(-dt*2):1;for(const key of ['zoom','left','top'])c.camera[key]+=(c.targetCamera[key]-c.camera[key])*blend;
 /* Code by Daniel using ChatGPT November 19, 2026 */
}
function coopImmersive28(width,height){
 if(!coopEnabled28()||state.riding||wonderWatching20())return null;
 const view=sceneView(),actors=[state.player,g.coop28.player],rects=actors.map(function bounds(p){const h=128*elfVisualScale24(p)*(state.room==='nativity'?1:view.zoom),x=(p.x*15.36-view.left)*view.zoom,y=(p.y*10.24-view.top)*view.zoom;return {left:x-h*.5,right:x+h*.5,top:y-h,bottom:y};/* Code by Daniel using ChatGPT November 19, 2026 */}),activity=g.wonder20.play21.mode;
 if(activity){const x=(activity.focus[0]*15.36-view.left)*view.zoom,y=(activity.focus[1]*10.24-view.top)*view.zoom;rects.push({left:x-120,right:x+120,top:y-140,bottom:y+100});}
 const left=Math.min(...rects.map(r=>r.left))-48,right=Math.max(...rects.map(r=>r.right))+48,top=Math.min(...rects.map(r=>r.top))-48,bottom=Math.max(...rects.map(r=>r.bottom))+48,topRail=g.coop28.skate?140:70,bottomRail=140,availableH=Math.max(90,height-topRail-bottomRail),availableW=Math.max(100,width-24),cover=Math.max(width/1536,height/1024),contain=Math.min(width/1536,height/1024),scale=Math.max(contain,Math.min(cover,availableW/(right-left),availableH/(bottom-top))),w=1536*scale,h=1024*scale;
 const x=width/2-(left+right)*scale/2,y=topRail+availableH/2-(top+bottom)*scale/2;
 $('#viewport').style.setProperty('--coop-painting','url("assets/'+ROOMS[state.room].image+'.webp")');
 return {width:w,height:h,left:w<=width?(width-w)/2:Math.max(width-w,Math.min(0,x)),top:h<=height?(height-h)/2:Math.max(height-h,Math.min(0,y))};
 /* Code by Daniel using ChatGPT November 19, 2026 */
}
function coopAccentFrame28(frame){
 const c=g.coop28;let variants=c.tints.get(frame);if(!variants){variants={};c.tints.set(frame,variants);}const accent=state.coop28.accent;if(variants[accent])return variants[accent];
 const out=document.createElement('canvas');out.width=frame.w;out.height=frame.h;const pen=out.getContext('2d',{willReadFrequently:true});pen.drawImage(frame.canvas,0,0);const data=pen.getImageData(0,0,out.width,out.height),p=data.data;
 // A runtime palette swap keeps the original alpha, anatomy, anchors and knit shading.
 // Red coat for the boy; red scarf/ribbon fabric for the girl. Hair/skin stay unchanged.
 let first=out.height,last=0;for(let y=0;y<out.height;y++)for(let x=0;x<out.width;x++)if(p[(y*out.width+x)*4+3]>40){first=Math.min(first,y);last=Math.max(last,y);}
 const upper=first+(last-first)*.30,lower=first+(last-first)*.79,base=accent==='green'?[64,113,78]:[53,107,147];
 for(let y=Math.ceil(upper);y<lower;y++)for(let x=0;x<out.width;x++){const i=(y*out.width+x)*4,r=p[i],g0=p[i+1],b=p[i+2];if(p[i+3]<20||r<g0*1.8||r<b*1.65||r-g0<24||(g0-b)/Math.max(1,r-b)>.30)continue;const light=(r*.2126+g0*.7152+b*.0722)/(base[0]*.2126+base[1]*.7152+base[2]*.0722);p[i]=Math.min(255,base[0]*light);p[i+1]=Math.min(255,base[1]*light);p[i+2]=Math.min(255,base[2]*light);}
 pen.putImageData(data,0,0);return variants[accent]={...frame,canvas:out};
 /* Code by Daniel using ChatGPT November 19, 2026 */
}
const COOP_RIBBONS28=[[[38,62],[62,62]],[[32,70],[68,70]],[[40,78],[60,78]],[[50,67],[50,74]],[[62,62],[38,62]],[[68,70],[32,70]],[[60,78],[40,78]],[[50,74],[50,67]]];
function inviteCoopSkate28(){
 const ongoing=!!g.coop28.skate&&!g.coop28.skate.finished;
 showPanel('<h2 id="panel-title">Two ribbons on the ice</h2><p>Follow the warm gold loop and the cool blue loop. Meet each pair together. Take your time.</p><div class="row"><button class="primary" id="coop-skate-start28">'+(ongoing?'Keep skating':'Skate together')+'</button><button id="coop-skate-later28">'+(ongoing?'Free skate':'Another time')+'</button></div>','BENEATH THE LANTERNS');
 $('#coop-skate-start28').onclick=function start(){closePanel();if(!g.coop28.skate||g.coop28.skate.finished)beginCoopSkate28();/* Code by Daniel using ChatGPT November 19, 2026 */};
 $('#coop-skate-later28').onclick=function later(){closePanel();if(ongoing)endCoopSkate28();/* Code by Daniel using ChatGPT November 19, 2026 */};
 /* Code by Daniel using ChatGPT November 19, 2026 */
}
function beginCoopSkate28(){
 if(state.room!=='rink'||!coopEnabled28())return;pauseCoop28();clearToast();g.velocity={x:0,y:0};g.steps=[];g.pending=null;state.player={x:38,y:68};g.coop28.player={x:62,y:68};g.coop28.skate={index:0,reached:[false,false],finished:false};refreshCoopHUD28();
 /* Code by Daniel using ChatGPT November 20, 2026 */
}
function endCoopSkate28(){if(g.coop28)g.coop28.skate=null;refreshCoopHUD28();/* Code by Daniel using ChatGPT November 19, 2026 */}
function updateCoopSkate28(){
 const s=g.coop28.skate;if(!s||s.finished||state.room!=='rink')return;const pair=COOP_RIBBONS28[s.index],actors=[state.player,g.coop28.player];for(let i=0;i<2;i++)if(onIce(actors[i])&&Math.hypot(actors[i].x-pair[i][0],actors[i].y-pair[i][1])<3)s.reached[i]=true;
 if(s.reached.every(Boolean)){s.index++;s.reached=[false,false];if(s.index===COOP_RIBBONS28.length){s.finished=true;toast('Two ribbons, one lovely pattern.');}}
 /* Code by Daniel using ChatGPT November 19, 2026 */
}
function drawCoopRibbons28(){
 if(!coopEnabled28()||state.room!=='rink')return;const c=g.coop28,s=c.skate;ctx.save();ctx.strokeStyle='#bce7fa55';ctx.lineWidth=1.3;ctx.beginPath();for(const line of c.trails){ctx.moveTo(line.from.x*15.36,line.from.y*10.24);ctx.lineTo(line.to.x*15.36,line.to.y*10.24);}ctx.stroke();ctx.restore();if(!s||s.finished)return;const pair=COOP_RIBBONS28[s.index];ctx.save();ctx.lineWidth=2.5;
 for(let i=0;i<2;i++){const [x,y]=pair[i];ctx.strokeStyle=s.reached[i]?'#eaf6e6b0':i?'#b6e0faee':'#ffe2a5ee';ctx.fillStyle=s.reached[i]?'#eaf6e61a':i?'#8dcaf222':'#ffdb9022';ctx.beginPath();ctx.ellipse(x*15.36,y*10.24,43,18,0,0,Math.PI*2);ctx.fill();ctx.stroke();if(s.reached[i]){ctx.beginPath();ctx.moveTo(x*15.36-9,y*10.24);ctx.lineTo(x*15.36-2,y*10.24+5);ctx.lineTo(x*15.36+11,y*10.24-7);ctx.stroke();}}
 ctx.restore();
 /* Code by Daniel using ChatGPT November 19, 2026 */
}
function refreshCoopHUD28(){
 const el=$('#coop-skate28');if(!el)return;const c=g.coop28,s=c?.skate;el.hidden=!coopEnabled28()||state.room!=='rink'||!s;const status=$('#coop-skate-status28'),text=s?.finished?'A lovely pattern. Free skate, or make another.':s?'Gold: player 1 · Blue: player 2 · '+(s.index+1)+' / '+COOP_RIBBONS28.length:'';if(status.textContent!==text)status.textContent=text;
 const play=$('#world-play21');if(play){const together=coopEnabled28()&&state.room==='rink'&&!g.wonder20.play21.mode,word=together?'Skate together':'Play';if(play.dataset.coopLabel!==word){play.dataset.coopLabel=word;play.innerHTML=word+' <kbd>Q</kbd>';play.title=word+' · Q / B';}}
 const legend=$('.controls>span:first-child');if(legend){if(!c.originalLegend)c.originalLegend=legend.innerHTML;const mode=coopEnabled28()?'two':'one';if(legend.dataset.coop!==mode){legend.dataset.coop=mode;legend.innerHTML=mode==='two'?'Player one: <kbd>↑↓←→</kbd> + <kbd>E</kbd> · Player two: <kbd>WASD</kbd> + <kbd>Enter</kbd> · Shared stories and travel':c.originalLegend;canvas.setAttribute('aria-label',mode==='two'?'Christmas exploration for two. Player one: arrows and E. Player two: WASD and Enter. Two controllers move separate elves. Conversations are shared.':'Christmas exploration. Use WASD or arrow keys to move, E to interact. Touch joystick and controller also supported.');}}
 /* Code by Daniel using ChatGPT November 19, 2026 */
}
function coopSettings28(){
 const c=g.coop28;$('#panel-content').querySelector('.row').insertAdjacentHTML('afterend','<fieldset class="coop-settings28"><legend>Play together</legend><label class="setting-check"><input id="coop-enabled28" type="checkbox" '+(coopEnabled28()?'checked ':'')+(c.automatic?'disabled ':'')+'> Two-player (limited)</label><p>'+(c.automatic?'Two controllers connected — player two joined automatically.':'A second controller joins automatically. Press a button if it isn’t detected. You can also share one keyboard.')+'</p><div class="settings-grid"><div><label for="coop-avatar28">Second elf</label><select id="coop-avatar28"><option value="boy">Boy elf</option><option value="girl">Girl elf</option></select></div><div><label for="coop-accent28">Second elf’s accent</label><select id="coop-accent28"><option value="blue">Blue</option><option value="green">Green</option></select></div></div><p>Player one: arrows + E. Player two: WASD + Enter. Each controller moves its own elf. Stories, gifts and travel are shared.</p></fieldset>');
 $('#coop-avatar28').value=state.coop28.avatar;$('#coop-accent28').value=state.coop28.accent;
 $('#coop-enabled28').onchange=function enable(e){state.coop28.enabled=e.target.checked;syncCoop28();save();/* Code by Daniel using ChatGPT November 19, 2026 */};
 $('#coop-avatar28').onchange=function avatar(e){state.coop28.avatar=e.target.value;save();/* Code by Daniel using ChatGPT November 19, 2026 */};
 $('#coop-accent28').onchange=function accent(e){state.coop28.accent=e.target.value;save();/* Code by Daniel using ChatGPT November 19, 2026 */};
 /* Code by Daniel using ChatGPT November 19, 2026 */
}
