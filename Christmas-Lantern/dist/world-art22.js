'use strict';
const TOGGLE_LIGHT_ROOMS22=new Set(['hall','closet','grandmother','kitchen','rink','snowgarden']);
async function loadDetailedArt22(){
 const collections={rail:RAIL_ART22.frames,world:WORLD_ART22.frames},images={},requests=new Map();
 for(const [group,frames]of Object.entries(collections))for(const f of Object.values(frames))requests.set('assets/'+(group==='rail'?'railway-22/':'world-22/')+f.file,true);
 requests.set('assets/railway-22/'+RAIL_ART22.base.file,true);
 await Promise.all([...requests.keys()].map(function load(src){return new Promise(function pending(resolve,reject){const im=new Image();im.onload=function loaded(){images[src]=im;resolve();/* Code by Daniel using ChatGPT November 14, 2026 */};im.onerror=function failed(){reject(Error('Could not load '+src));/* Code by Daniel using ChatGPT November 14, 2026 */};im.src=src;/* Code by Daniel using ChatGPT November 14, 2026 */});/* Code by Daniel using ChatGPT November 14, 2026 */}));
 g.detailFrames22={rail:{},world:{}};
 for(const [group,frames]of Object.entries(collections))for(const [id,f]of Object.entries(frames)){const src='assets/'+(group==='rail'?'railway-22/':'world-22/')+f.file;g.detailFrames22[group][id]=detailCrop22(images[src],f);}
 g.detailFrames22.base=detailCrop22(images['assets/railway-22/'+RAIL_ART22.base.file],RAIL_ART22.base);
 g.starIcon22=g.detailFrames22.world.star.canvas.toDataURL();
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function detailCrop22(image,meta){
 const f=sourceFrame21(image,meta.rect,meta.anchor),c=f.canvas.getContext('2d'),pixels=c.getImageData(0,0,f.w,f.h);
 // Clear only generation haze in a temporary crop. Source masters stay untouched.
 for(let i=3;i<pixels.data.length;i+=4)if(pixels.data[i]<=16)pixels.data[i]=0;c.putImageData(pixels,0,0);f.meta=meta;return f;
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function detailFrame22(c,frame,x,y,width,mirror=false,angle=0){
 if(!frame)return;const scale=width/frame.w;c.save();c.translate(x,y);if(mirror)c.scale(-1,1);if(angle)c.rotate(angle);c.drawImage(frame.canvas,-frame.anchorX*scale,-frame.anchorY*scale,frame.w*scale,frame.h*scale);c.restore();
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function worldFrame22(id,x,y,width,mirror=false,angle=0,c=ctx){
 detailFrame22(c,g.detailFrames22?.world[id],x,y,width,mirror,angle);
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function paintedBackdrop22(c,image,rect=[0,0,1536,1024]){
 if(!image)return;const [sx,sy,w,h]=rect,s=Math.max(c.canvas.width/w,c.canvas.height/h);c.drawImage(image,sx,sy,w,h,(c.canvas.width-w*s)/2,(c.canvas.height-h*s)/2,w*s,h*s);
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function activityHint22(){
 const el=$('.controls')?.firstElementChild;if(!el)return;if(!g.regularControls22)g.regularControls22=el.innerHTML;const m=g.wonder20?.play21?.mode;if(m?.capture){const pad=g.padCount&&primaryUsesPad21(),text=pad?'Stick: choose · A: use · B: finish':m.kind==='tree'?'← → branch · ↑ ↓ ornament · Enter use · Esc finish':'← → choose · Enter use · Esc finish';if(el.textContent!==text)el.textContent=text;el.dataset.activity22='yes';}else if(el.dataset.activity22){el.innerHTML=g.regularControls22;delete el.dataset.activity22;}
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function traceSnowShape25(shape){
 if(shape.ellipse){const [x,y,rx,ry]=shape.ellipse;ctx.moveTo((x+rx)*15.36,y*10.24);ctx.ellipse(x*15.36,y*10.24,rx*15.36,ry*10.24,0,0,Math.PI*2);return;}
 const source=shape.polygon;if(!source?.length)return;let area=0;for(let i=0;i<source.length;i++){const a=source[i],b=source[(i+1)%source.length];area+=a[0]*b[1]-b[0]*a[1];}
 const points=area<0?[...source].reverse():source;ctx.moveTo(points[0][0]*15.36,points[0][1]*10.24);for(let i=1;i<points.length;i++)ctx.lineTo(points[i][0]*15.36,points[i][1]*10.24);ctx.closePath();
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function excludeSnowShape25(shape){
 ctx.beginPath();ctx.rect(-10,-10,1556,1044);traceSnowShape25(shape);ctx.clip('evenodd');
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function clipSnowGround25(){
 const map=roomMap();ctx.beginPath();for(const shape of map.walkAreas)traceSnowShape25(shape);ctx.clip();
 // Complement clips are applied separately so overlapping obstacles never cancel each other out.
 for(const shape of map.blocked)excludeSnowShape25(shape);
 const all=targets();for(let i=0;i<all.length;i++){const t=all[i];if(!t.gift)continue;const frame=g.gifts[i%4],scale=depthScale(t),w=(t.smallGift?32:55+(i%3)*5)*scale,h=w*frame.h/frame.w,pad=2+w*.08,x=t.x*15.36,y=t.y*10.24;
  // Opened gifts are intentionally translucent: keep clean background under the entire parcel.
  excludeSnowShape25({polygon:[[(x-w/2-pad)/15.36,(y-h-pad)/10.24],[(x+w/2+pad)/15.36,(y-h-pad)/10.24],[(x+w/2+pad)/15.36,(y+pad)/10.24],[(x-w/2-pad)/15.36,(y+pad)/10.24]]});
 }
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function paintSnowDetails22(){
 const q=g.wonder20;if(!q||!g.detailFrames22)return;if(!q.footprints.length&&!q.skateLines.length&&!q.snowAngels.some(function here(a){return a.room===state.room;/* Code by Daniel using ChatGPT November 14, 2026 */}))return;ctx.save();clipSnowGround25();
 for(const p of q.footprints){const s=depthScale(p);ctx.globalAlpha=(1-p.age/32)*.76;const id=p.side?'bootRight':'bootLeft',f=g.detailFrames22.world[id];worldFrame22(id,p.x*15.36+(p.side?3:-3)*s,p.y*10.24,f.w*15/(f.meta.referenceLength||485)*s,false,Math.PI+(p.dir||0)*Math.PI/4);}
 ctx.globalAlpha=1;
 if(state.room==='rink'){ctx.strokeStyle='#e0edf488';ctx.lineWidth=.85;ctx.lineCap='round';ctx.beginPath();for(const l of q.skateLines){ctx.moveTo(l.from.x*15.36,l.from.y*10.24);ctx.lineTo(l.to.x*15.36,l.to.y*10.24);}ctx.stroke();}
 for(const a of q.snowAngels)if(a.room===state.room){const s=depthScale(a);worldFrame22('snowAngel',a.x*15.36,a.y*10.24-18*s,99*s);}
 ctx.restore();
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function paintMouse22(){
 const a=PAINTING_ANCHORS21.objects.mouse,p=g.wonder20.mouse;if(p>=1)return;const path=[a.visibleStart,...a.retreatPath.slice(1)],i=Math.min(path.length-2,Math.floor(p*(path.length-1))),k=p*(path.length-1)-i,x=path[i][0]+(path[i+1][0]-path[i][0])*k,y=path[i][1]+(path[i+1][1]-path[i][1])*k;if(y<51.1)return;worldFrame22('mouse',x*15.36,y*10.24,27);
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function paintOrnaments22(){
 const m=g.wonder20.play21.mode,slots=ornamentSlots21();for(const pos of Object.values(wonderState20().placements)){const p=slots[pos];if(p)worldFrame22('star',p[0]*15.36,p[1]*10.24,11);}
 if(m?.kind==='tree'){const p=slots[m.index];if(p){ctx.save();ctx.strokeStyle='#fff2b3';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(p[0]*15.36,p[1]*10.24,11,0,Math.PI*2);ctx.stroke();ctx.restore();}}
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function paintSnowball22(b){
 const t=Math.min(1,b.age/.75),x=(b.from.x+(b.to.x-b.from.x)*t)*15.36,y=(b.from.y+(b.to.y-b.from.y)*t)*10.24-(state.motion?Math.sin(t*Math.PI)*75:0)-35;if(t<1)worldFrame22('snowball',x,y,15);else if(b.age<1.15){ctx.save();ctx.globalAlpha=(1.15-b.age)/.4;worldFrame22('puff',x,y,44);ctx.restore();}
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function paintBreathAndSnow22(){
 if(!g.wonder20||wonderWatching20())return;const q=g.wonder20,p=q.seat?{x:q.seat.seatX,y:q.seat.seatY}:state.player,s=elfVisualScale24(p);ctx.save();ctx.translate(p.x*15.36,p.y*10.24-(q.seat?18:0));ctx.scale(s,s);
 if(snowOutdoors20()){const hand=g.direction>=4?17:-17,glow=ctx.createRadialGradient(hand,-38,2,hand,-38,47);glow.addColorStop(0,'#ffdc8559');glow.addColorStop(1,'#ffdc8500');ctx.fillStyle=glow;ctx.fillRect(hand-47,-85,94,94);if(state.motion){const phase=(q.age%3)/3;if(phase<.45){ctx.globalAlpha=.35*(1-phase/.45);worldFrame22('puff',10+phase*28,(q.seat?-66:-101)-phase*23,8+phase*28);}}}
 if(q.hatSnow>.02){ctx.globalAlpha=q.hatSnow*.9;worldFrame22('hatSnow',-5,q.seat?-82:-117,32);}ctx.restore();
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function paintSnowCostume22(){
 const t=state.tales.dressed;if(t.sticks){worldFrame22('twigLeft',-29,-68,36);worldFrame22('twigRight',29,-68,36);}if(t.carrot)worldFrame22('carrot',1,-111,27);if(t.scarf)worldFrame22('scarf',0,-90,52);if(t.hat)paintSnowHat22();
 if(t.coal)for(const [x,y]of [[-10,-111],[10,-111],[0,-65],[0,-45],[-7,-100],[0,-98],[7,-100]])worldFrame22('coal',x,y,5.5);
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function paintSnowHat22(){
 const tip=g.wonder20?.play21?.friendTip||0;ctx.save();if(tip){ctx.translate(0,-120);ctx.rotate(-.4*Math.sin((1.2-tip)/1.2*Math.PI));ctx.translate(0,120);}worldFrame22(playState10().hat==='knit'?'knitHat':'feltHat',0,-124,playState10().hat==='knit'?54:60);ctx.restore();
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function paintBridgeLantern22(c,a){
 const l=playState10().lantern,draft=lanternDraft10(),steady=draft<.25,x=l.hook?505:450;paintedBackdrop22(c,g.images.trail,[230,210,680,510]);
 const open=l.glass.some(function missing(p){return !p;/* Code by Daniel using ChatGPT November 14, 2026 */});worldFrame22(open?'lanternOpen':'lanternClosed',x,l.hook?475:500,238,false,state.motion?Math.sin(a.time*1.3)*draft*.012:0,c);
 if(l.shield&&g.detailFrames22.world.windShield)worldFrame22('windShield',l.shield===1?x-165:x+160,470,95,l.shield===2,0,c);
 if(!steady){c.save();c.globalAlpha=.32;for(let i=0;i<3;i++)worldFrame22('puff',80+((a.time*85+i*180)%720),210+i*53,60,false,0,c);c.restore();}
 c.font='20px Georgia';c.textAlign='center';c.fillStyle='#fff2ce';c.shadowColor='#152923';c.shadowBlur=5;c.fillText(steady?'The flame stands quietly.':'A draft reaches the flame from the left.',450,527);c.shadowBlur=0;
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function paintRepair22(c,a){
 const r=playState10().repairs[a.id],f=g.toys[{train:4,bear:3,bird:5}[a.id]];paintedBackdrop22(c,g.images.workshop,[500,220,630,460]);const h=230,w=h*f.w/f.h;c.save();c.translate(450,405);if(a.testUntil>a.time&&state.motion)c.rotate(Math.sin(a.time*9)*.025);c.drawImage(f.canvas,-w/2,-h,w,h);c.restore();
 if(r.part!==null&&r.part!==undefined){const id='repair'+a.id[0].toUpperCase()+a.id.slice(1)+r.part;worldFrame22(id,700,420,g.detailFrames22.world[id].meta.suggestedWidth||100,false,0,c);}
 c.font='21px Georgia';c.fillStyle='#fff3d0';c.textAlign='center';c.shadowColor='#263329';c.shadowBlur=5;c.fillText(r.inspected?REPAIR_PARTS10[a.id].title:'A toy waiting for a closer look',450,70);c.shadowBlur=0;
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function paintNotice22(c,a){
 const done=playState10().notices[a.id];if(a.id==='cone'){paintedBackdrop22(c,g.images.pinepass||g.images['pinepass-birdfree-07']);worldFrame22('pinecone',450,420,190,false,done?.22:-.12,c);}else paintedBackdrop22(c,a.id==='handle'?g.images.workshop:g.images.trail,a.id==='handle'?[490,180,400,270]:[385,385,430,290]);c.font='21px Georgia';c.fillStyle='#fff3d0';c.textAlign='center';c.shadowColor='#24372e';c.shadowBlur=5;c.fillText(a.id==='cone'?'Small marks, made for a reason.':a.id==='handle'?'Wood shaped by a patient hand.':'The grain still runs through the worn place.',450,500);c.shadowBlur=0;
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
