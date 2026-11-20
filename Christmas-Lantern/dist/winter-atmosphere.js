'use strict';
// Anatomical landmarks in the ORIGINAL 1312 × 1199 atlas cells (656 × 599.5).
// Eye → beak length sets scale; wing/tail bounds never set the bird's body size.
const CARDINAL_FLIGHT_METRICS13 = [
 {eye:[525,302],beak:[590,318]},
 {eye:[517,302],beak:[583,318]},
 {eye:[526,270.5],beak:[591,287.5]},
 {eye:[518,269.5],beak:[583,287.5]}
];
function cardinalFlightFrames(image){
 const cw=image.naturalWidth/2,ch=image.naturalHeight/2,frames=[];
 for(let n=0;n<4;n++){
  const canvas=document.createElement('canvas');canvas.width=Math.ceil(cw);canvas.height=Math.ceil(ch);
  canvas.getContext('2d').drawImage(image,n%2*cw,Math.floor(n/2)*ch,cw,ch,0,0,cw,ch);
  const metric=CARDINAL_FLIGHT_METRICS13[n],scale=5.2/Math.hypot(metric.beak[0]-metric.eye[0],metric.beak[1]-metric.eye[1]);
  // All poses put the eye at the same offset from the flight/perch approach anchor.
  frames.push({canvas,w:canvas.width,h:canvas.height,scale,rootX:metric.eye[0]-16/scale,rootY:metric.eye[1]+14/scale,eye:metric.eye,beak:metric.beak});
 }
 return frames;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function paintFlyingCardinal(frame){
 ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
 ctx.drawImage(frame.canvas,-frame.rootX*frame.scale,-frame.rootY*frame.scale,frame.w*frame.scale,frame.h*frame.scale);
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
const CARDINAL_PERCHES={
 rink:[[451,833],[1334,704],[615,296]],
 sleigh:[[492,408],[1047,385],[473,240],[503,625]],
 pinepass:[[120,580],[1350,625],[465,491]],
 snowgarden:[[250,410],[1250,680]]
};
function variedPause(min,max){return min+(max-min)*Math.random()*Math.random();/* Code by Daniel using ChatGPT November 11, 2026 */}
function launchCardinal(landing=Math.random()<.38){const points=CARDINAL_PERCHES[state.room];if(!points)return;const left=Math.random()<.5,perch=landing?points[Math.floor(Math.random()*points.length)]:null,start={x:left?-70:1606,y:220+Math.random()*360},target=perch?{x:perch[0],y:perch[1]}:{x:left?1626:-90,y:start.y+Math.random()*80-40};g.birds.push({room:state.room,state:perch?'approach':'fly',start,target,x:start.x,y:start.y,elapsed:0,age:0,duration:perch?5+Math.random()*3:12+Math.random()*5,face:left?1:-1,wait:variedPause(9,34)});/* Code by Daniel using ChatGPT November 11, 2026 */}
function updateCardinals(dt){
 if(!state.motion||!CARDINAL_PERCHES[state.room]){g.birds=[];g.birdRoom=state.room;return;}
 if(g.birdRoom!==state.room){g.birds=[];g.birdNext=state.room==='pinepass'?variedPause(6,20):variedPause(22,70);g.birdRoom=state.room;}
 if(!g.birds.length){g.birdNext-=dt;if(g.birdNext<=0)launchCardinal();return;}
 for(const b of g.birds){b.age+=dt;b.elapsed+=dt;if(b.state==='perched'){b.wait-=dt;const near=Math.hypot(b.x-state.player.x*15.36,b.y-state.player.y*10.24)<180;if(b.wait<=0||near){const right=Math.random()<.5;b.state='depart';b.start={x:b.x,y:b.y};b.target={x:right?1636:-100,y:Math.max(100,b.y-120-Math.random()*90)};b.face=right?1:-1;b.elapsed=0;b.duration=5+Math.random()*4;}continue;}
 const p=Math.min(1,b.elapsed/b.duration),t=b.state==='approach'?ease(p):p;b.x=b.start.x+(b.target.x-b.start.x)*t;b.y=b.start.y+(b.target.y-b.start.y)*t-Math.sin(p*Math.PI)*(b.state==='approach'?55:22);
 if(p>=1){if(b.state==='approach'){b.state='perched';b.elapsed=0;b.x=b.target.x;b.y=b.target.y;b.face=Math.random()<.5?1:-1;}else b.done=true;}}
 g.birds=g.birds.filter(function airborne(b){return !b.done;/* Code by Daniel using ChatGPT November 11, 2026 */});if(!g.birds.length)g.birdNext=state.room==='pinepass'?variedPause(10,38):variedPause(35,110);
 /* Code by Daniel using ChatGPT November 11, 2026 */
}
function drawCardinals(){if(!state.motion||!CARDINAL_PERCHES[state.room])return;ctx.save();clipBirdCanopies09();for(const b of g.birds){if(b.room!==state.room)continue;const perched=b.state==='perched',f=perched?g.perchedCardinal:g.cardinals[Math.floor(b.age*7)%4];ctx.save();ctx.translate(b.x,b.y);if(b.face<0)ctx.scale(-1,1);if(perched){const scale=34/f.h;ctx.drawImage(f.canvas,-f.w*.70*scale,-f.h*.93*scale,f.w*scale,f.h*scale);}else paintFlyingCardinal(f);ctx.restore();}ctx.restore();/* Code by Daniel using ChatGPT November 13, 2026 *//* Code by Daniel using ChatGPT November 13, 2026 */}
function immersiveActive(){return !!(document.fullscreenElement||document.webkitFullscreenElement)||document.body.classList.contains('theater');/* Code by Daniel using ChatGPT November 11, 2026 */}
function immersiveGeometry(width,height,anchor){const scale=Math.max(width/1536,height/1024),w=1536*scale,h=1024*scale,ax=clamp((anchor.x-25)/50),ay=clamp((anchor.y-25)/65);return {width:w,height:h,left:-(w-width)*ax,top:-(h-height)*ay};/* Code by Daniel using ChatGPT November 11, 2026 */}
function updateImmersiveView(dt=.04){if(!immersiveActive())return;const viewport=$('#viewport'),rect=viewport.getBoundingClientRect(),width=viewport.clientWidth||window.innerWidth||rect.width,height=viewport.clientHeight||window.innerHeight||rect.height,view=sceneView(),anchor={x:(state.player.x*15.36-view.left)*view.zoom/15.36,y:(state.player.y*10.24-view.top)*view.zoom/10.24},target=coopImmersive28(width,height)||immersiveGeometry(width,height,anchor);if(!g.displayPan||g.displayPan.room!==state.room||g.displayPan.width!==target.width||g.displayPan.height!==target.height)g.displayPan={...target,room:state.room};else{const blend=state.motion?1-Math.exp(-dt*5):1;g.displayPan.left+=(target.left-g.displayPan.left)*blend;g.displayPan.top+=(target.top-g.displayPan.top)*blend;}for(const key of ['width','height','left','top'])viewport.style.setProperty('--scene-'+key,g.displayPan[key]+'px');/* Code by Daniel using ChatGPT November 11, 2026 *//* Code by Daniel using ChatGPT November 19, 2026 */
}
