'use strict';
const RAIL_CONTROLS22=['run','reverse','route','lights','slower','faster'];
const RAIL_PROPS22={station:{x:905,y:405,width:175},shipA:{x:730,y:636,width:220},shipB:{x:1100,y:650,width:175},switch:{x:365,y:474,width:54},lampA:{x:655,y:475,width:29},lampB:{x:1260,y:480,width:29}};
function setRailwayPlan25(r){
 r.requested=r.override25||((r.autoLeg25+1)%3===2?'trestle':'harbor');r.planned25=r.requested;
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function railwayState22(){
 const p=playState10();if(!p.railway22)p.railway22={running:true,speed:100,direction:1,orientation:1,segment:'shoreline',position:350,route:'harbor',requested:'harbor',lights:{station:true,lampA:true,lampB:true}};const r=p.railway22;
 r.speed=bounded21(Number(r.speed)||100,45,180);r.direction=r.direction===-1?-1:1;r.orientation=r.orientation===-1?-1:1;if(!['shoreline','upper'].includes(r.segment))r.segment='shoreline';if(!Number.isFinite(r.position))r.position=350;
 if(!r.schedule25){r.schedule25=true;r.autoLeg25=r.segment==='upper'?2:0;r.override25=r.requested!==r.route&&['harbor','trestle'].includes(r.requested)?r.requested:null;setRailwayPlan25(r);}
 else{if(!Number.isInteger(r.autoLeg25)||r.autoLeg25<0||r.autoLeg25>2)r.autoLeg25=r.segment==='upper'?2:0;
  // Preserve older authoring callers that set requested directly as a one-journey choice.
  if(r.requested!==r.planned25&&['harbor','trestle'].includes(r.requested))r.override25=r.requested;setRailwayPlan25(r);
 }
 return r;
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function completeRailLeg25(r,right){
 if(r.override25){r.segment=r.override25==='trestle'?'upper':'shoreline';r.autoLeg25=r.segment==='upper'?2:0;r.override25=null;}
 else{r.autoLeg25=(r.autoLeg25+1)%3;r.segment=r.autoLeg25===2?'upper':'shoreline';}
 r.route=r.segment==='upper'?'trestle':'harbor';r.direction=right?-1:1;r.orientation=r.direction;r.position=right?railwayPath22(r.segment).length+255:-255;setRailwayPlan25(r);
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function installRailway22(){
 railwayState22();g.railway22={age:0,smoke:[],boats:{},control:0,rendered:[],passes:0};const table=ROOMS.workshop.spots.find(function table(s){return s.id==='tabletop-railway';/* Code by Daniel using ChatGPT November 14, 2026 */});Object.assign(table,{x:72,y:88,hit:[52,51,41,33],label:'The winter harbor railway'});
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function railwayPath22(name){
 const points=RAIL_ART22.paths[name],segments=[];let length=0;for(let i=1;i<points.length;i++){const dx=points[i][0]-points[i-1][0],dy=points[i][1]-points[i-1][1],size=Math.hypot(dx,dy);segments.push({from:points[i-1],dx,dy,size,start:length});length+=size;}return {points,segments,length};
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function railPoint22(name,distance){
 const path=railwayPath22(name),inside=distance>=0&&distance<=path.length,d=bounded21(distance,0,path.length),s=path.segments.find(function at(s){return d<=s.start+s.size;/* Code by Daniel using ChatGPT November 14, 2026 */})||path.segments.at(-1),t=(d-s.start)/s.size;return {x:s.from[0]+s.dx*t,y:s.from[1]+s.dy*t,dx:s.dx/s.size,dy:s.dy/s.size,inside};
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function railwayTransform22(){
 const base=RAIL_ART22.base,scale=620/base.rect[2];return {scale,left:1110-base.anchor[0]*scale,top:850-base.anchor[1]*scale,width:620};
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function railwayWorldPoint22(x,y){
 const t=railwayTransform22();return {x:(t.left+x*t.scale)/15.36,y:(t.top+y*t.scale)/10.24};
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function railwayLocalPoint22(p){
 const t=railwayTransform22();return {x:(p.x*15.36-t.left)/t.scale,y:(p.y*10.24-t.top)/t.scale};
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function updateRailway22(dt,manual=false){
 const q=g.railway22,r=railwayState22();if(!q||document.hidden||g.paused)return;q.age+=dt;
 if(state.room==='workshop'&&!panel.open&&r.running&&(state.motion||manual)){
  r.position+=r.direction*r.speed*dt;const length=railwayPath22(r.segment).length;
  if(r.direction>0&&r.position>length+270||r.direction<0&&r.position< -270){const right=r.direction>0;completeRailLeg25(r,right);q.passes++;save();if(g.wonder20.play21.mode?.kind==='railway')refreshRailTray22();}
  if(state.motion&&q.age>(q.nextSmoke||0)){const head=railPoint22(r.segment,r.position),hidden=railPointHidden25(r.segment,head);if(head.inside&&!hidden)q.smoke.push({age:0,segment:r.segment,position:r.position,orientation:r.orientation,travel:r.direction});q.nextSmoke=q.age+.7;}
 }
 for(const smoke of q.smoke)smoke.age+=dt;q.smoke=q.smoke.filter(function live(s){return s.age<2.4;/* Code by Daniel using ChatGPT November 14, 2026 */});for(const key of Object.keys(q.boats))q.boats[key]=Math.max(0,q.boats[key]-dt);
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function railwayAction22(action){
 const r=railwayState22(),chosen=RAIL_CONTROLS22.indexOf(action);if(chosen>=0)g.railway22.control=chosen;if(action==='run'){if(!state.motion){const running=r.running;r.running=true;updateRailway22(.8,true);r.running=running;}else r.running=!r.running;}
 else if(action==='reverse')r.direction*=-1;
 else if(action==='route'){r.override25=r.requested==='harbor'?'trestle':'harbor';setRailwayPlan25(r);}
 else if(action==='lights'){const on=!r.lights.station;for(const k of Object.keys(r.lights))r.lights[k]=on;}
 else if(action==='slower')r.speed=Math.max(45,r.speed-20);else if(action==='faster')r.speed=Math.min(180,r.speed+20);
 save();if(g.wonder20.play21.mode?.kind==='railway')refreshRailTray22();
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function refreshRailTray22(){
 const tray=$('#room-play-tray21'),r=railwayState22(),q=g.railway22;tray.replaceChildren();const controls=document.createElement('div');controls.className='rail-controls22';const names={run:state.motion?(r.running?'Pause':'Run'):'Advance',reverse:'Reverse',route:r.requested==='harbor'?'Next: harbor line':'Next: high trestle',lights:r.lights.station?'Harbor lights on':'Harbor lights off',slower:'Slower',faster:'Faster'};
 for(const [i,action]of RAIL_CONTROLS22.entries()){const b=document.createElement('button');b.dataset.railAction22=action;b.textContent=names[action];b.setAttribute('aria-pressed',String(action==='run'?r.running:action==='route'?r.requested==='trestle':action==='lights'?r.lights.station:false));if(i===q.control)b.classList.add('rail-selected22');b.onclick=function act(){railwayAction22(action);canvas.focus({preventScroll:true});/* Code by Daniel using ChatGPT November 14, 2026 */};controls.append(b);}
 const status=document.createElement('span');status.className='rail-status22';status.setAttribute('role','status');status.textContent=r.override25?'The points are set for the next journey.':r.requested==='trestle'?'The next journey takes the high line.':'';tray.append(controls,status);
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function railwayNavigate22(delta){
 const q=g.railway22;q.control=(q.control+delta+RAIL_CONTROLS22.length)%RAIL_CONTROLS22.length;refreshRailTray22();const button=panel.open?null:$('#room-play-tray21').querySelector('[data-rail-action22="'+RAIL_CONTROLS22[q.control]+'"]');button?.focus({preventScroll:true});
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function railwayPointer22(point){
 const p=railwayLocalPoint22(point),q=g.railway22,r=railwayState22();
 for(const id of ['shipA','shipB','switch','lampA','lampB'])if(railPropHit22(p,id)){if(id==='switch')railwayAction22('route');else if(id.startsWith('ship'))q.boats[id]=4;else{r.lights[id]=!r.lights[id];save();refreshRailTray22();}return;}
 for(const car of q.rendered)if(((p.x-car.x)/65)**2+((p.y-car.y+35)/40)**2<1){railwayAction22('reverse');return;}
 const station=RAIL_PROPS22.station;if(Math.abs(p.x-station.x)<station.width*.6&&p.y>=station.y-135&&p.y<=station.y+20){r.lights.station=!r.lights.station;save();refreshRailTray22();}
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function railPropHit22(p,id){
 const prop=RAIL_PROPS22[id],r=railwayState22(),frame=g.detailFrames22.rail[id==='switch'?(r.requested==='trestle'?'switchHigh':'switchLow'):id.startsWith('lamp')?'lamp':id],scale=prop.width/frame.w,x=Math.round((p.x-prop.x)/scale+frame.anchorX),y=Math.round((p.y-prop.y)/scale+frame.anchorY);
 if(id.startsWith('lamp')&&Math.hypot(p.x-prop.x,p.y-prop.y+55)<28)return true;
 if(x<0||y<0||x>=frame.w||y>=frame.h)return false;return frame.canvas.getContext('2d').getImageData(x,y,1,1).data[3]>24;
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function drawRailProp22(c,id){
 const prop=RAIL_PROPS22[id],q=g.railway22,r=railwayState22(),frame=g.detailFrames22.rail[id==='switch'?(r.requested==='trestle'?'switchHigh':'switchLow'):id.startsWith('lamp')?'lamp':id];const rock=q.boats[id]&&state.motion?Math.sin(q.age*3)*.025:0;detailFrame22(c,frame,prop.x,prop.y,prop.width,false,rock);
 if(id==='station'&&!r.lights.station){c.save();c.globalCompositeOperation='multiply';const scale=prop.width/frame.w;for(const rect of frame.meta.lightRects||[]){const [x,y,w,h]=rect;c.fillStyle='#162c39e8';c.fillRect(prop.x+(x-frame.meta.anchor[0])*scale,prop.y+(y-frame.meta.anchor[1])*scale,w*scale,h*scale);}c.restore();}
 if(id.startsWith('lamp')){c.save();const x=prop.x,y=prop.y-52;c.globalCompositeOperation=r.lights[id]?'source-over':'multiply';const glow=c.createRadialGradient(x,y,0,x,y,20);glow.addColorStop(0,r.lights[id]?'#ffdf9255':'#112737ef');glow.addColorStop(1,r.lights[id]?'#ffdf9200':'#11273700');c.fillStyle=glow;c.fillRect(x-20,y-20,40,40);c.restore();}
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function railMaskPolygon25(c,poly,positive){
 let area=0;for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length];area+=a[0]*b[1]-b[0]*a[1];}const points=(area>0)===positive?poly:[...poly].reverse();c.moveTo(...points[0]);for(let i=1;i<points.length;i++)c.lineTo(...points[i]);c.closePath();
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function clipRailRock25(c,openings){
 c.beginPath();
 if(openings){
  // Stock behind the facade is visible only through a mouth or below its front lip.
  c.rect(0,430,1774,457);for(const id of ['left','right'])railMaskPolygon25(c,RAIL_ART22.occlusion[id].hole,true);
 }else{c.rect(0,0,1774,887);for(const poly of Object.values(RAIL_ART22.occlusion.hiddenMountainRegions))railMaskPolygon25(c,poly,false);}
 c.clip();
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function railPointHidden25(segment,p){
 if(railwayFront25(segment,p))return false;
 if(segment==='shoreline')return !['left','right'].some(function opening(id){return Exploration.inside(p,{polygon:RAIL_ART22.occlusion[id].hole});/* Code by Daniel using ChatGPT November 14, 2026 */});
 return Object.values(RAIL_ART22.occlusion.hiddenMountainRegions).some(function inside(poly){return Exploration.inside(p,{polygon:poly});/* Code by Daniel using ChatGPT November 14, 2026 */});
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function drawRailCar22(c,index){
 const r=railwayState22(),q=g.railway22,distance=r.position-r.orientation*120*index,p=railPoint22(r.segment,distance);if(!p.inside)return;
 const covered=railPointHidden25(r.segment,p);
 const right=p.dx*r.orientation>=0,away=p.dy*r.orientation<-.18,frame=g.detailFrames22.rail[index?(away?'wagonAway':'wagonNear'):(away?'engineAway':'engineNear')],width=index?111:frame.w*42/frame.meta.wheelbase,angle=Math.atan2(p.dy,Math.abs(p.dx))*.35;
 c.save();if(r.segment==='upper')clipRailRock25(c,false);else if(!railwayFront25(r.segment,p))clipRailRock25(c,true);
 detailFrame22(c,frame,p.x,p.y,width,!right,angle);c.restore();if(!covered)q.rendered.push({...p,index,segment:r.segment,distance,orientation:r.orientation});
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function railwayFront25(segment,p){
 return segment==='shoreline'&&p.inside&&p.y>=430;
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function drawRailSmoke22(c,foreground=null){
 if(!state.motion)return;const r=railwayState22();for(const s of g.railway22.smoke){if(s.segment!==r.segment)continue;const p=railPoint22(s.segment,s.position);if(!p.inside||foreground!==null&&railwayFront25(s.segment,p)!==foreground)continue;const away=p.dy*s.orientation<-.18,frame=g.detailFrames22.rail[away?'engineAway':'engineNear'],scale=42/frame.meta.wheelbase,chimney=frame.meta.chimney,dx=(chimney[0]-frame.meta.anchor[0])*scale*(p.dx*s.orientation>=0?1:-1),dy=(chimney[1]-frame.meta.anchor[1])*scale;const phase=Math.floor(g.railway22.age)%4;c.save();if(r.segment==='upper')clipRailRock25(c,false);else if(!railwayFront25(r.segment,p))clipRailRock25(c,true);c.globalAlpha=.7*(1-s.age/2.4);detailFrame22(c,g.detailFrames22.rail['steam'+phase],p.x+dx-(s.travel||s.orientation)*s.age*18,p.y+dy-s.age*15,45+s.age*20);c.restore();}
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function drawTunnelFaces22(c){
 if(railwayState22().segment!=='shoreline')return;for(const id of ['left','right']){const mask=RAIL_ART22.occlusion[id];c.save();c.beginPath();c.rect(...mask.rect);for(const [i,p]of mask.hole.entries()){if(i)c.lineTo(...p);else c.moveTo(...p);}c.closePath();c.clip('evenodd');c.drawImage(g.detailFrames22.base.canvas,0,0);c.restore();}
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function drawRailwayAttraction22(c=ctx){
 const frames=g.detailFrames22;if(!frames||!g.railway22)return;c.drawImage(frames.base.canvas,0,0);g.railway22.rendered=[];
 drawRailProp22(c,'station');drawRailProp22(c,'switch');drawRailProp22(c,'lampA');drawRailProp22(c,'lampB');
 const r=railwayState22(),cars=[0,1,2].map(function car(i){return {i,p:railPoint22(r.segment,r.position-r.orientation*120*i)};/* Code by Daniel using ChatGPT November 14, 2026 */}).sort(function depth(a,b){return a.p.y-b.p.y;/* Code by Daniel using ChatGPT November 14, 2026 */});for(const car of cars)if(!railwayFront25(r.segment,car.p))drawRailCar22(c,car.i);drawRailSmoke22(c,false);drawTunnelFaces22(c);for(const car of cars)if(railwayFront25(r.segment,car.p))drawRailCar22(c,car.i);drawRailSmoke22(c,true);drawRailProp22(c,'shipA');drawRailProp22(c,'shipB');
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function paintWorkshopRailway22(){
 const t=railwayTransform22();ctx.save();ctx.translate(t.left,t.top);ctx.scale(t.scale,t.scale);drawRailwayAttraction22();ctx.restore();
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
