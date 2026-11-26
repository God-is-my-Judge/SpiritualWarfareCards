'use strict';
// A companion uses the same painted floor and depth plane as the elf.
const DOG_HOME27={room:'hall',x:59,y:82};
const DOG_COOKIE27={x:55.8,y:64.8,width:34};
const DOG_FACING27=['up','up-right','right','down-right','down','down-left','left','up-left'];
const DOG_REST_POSES28=[0,0,0,1,1,2,3];
function dogState27(){
 return wonderState20().dog27;
 /* Code by Daniel using ChatGPT November 15, 2026 */
}
function installDog27(){
 const old=wonderState20().dog27,valid=old&&typeof old==='object'&&!Array.isArray(old)?old:{};
 const d=wonderState20().dog27={...DOG_HOME27,biscuit:false,fed:false,following:false,direction:'down',wait:null,...valid};
 for(const key of ['biscuit','fed','following'])d[key]=d[key]===true;
 if(d.fed)d.biscuit=false;else{d.following=false;d.wait=null;Object.assign(d,DOG_HOME27);}
 if(!Object.hasOwn(ROOMS,d.room)||!Number.isFinite(d.x)||!Number.isFinite(d.y)||d.x<1.5||d.x>98.5||d.y<1.5||d.y>98.5)Object.assign(d,DOG_HOME27);
 if(!DOG_FACING27.includes(d.direction))d.direction='down';
 if(!['sleigh','ice'].includes(d.wait))d.wait=null;
 g.dog27={age:0,step:0,still:0,moving:false,path:[],repath:0,choiceAt:0,formation:'behind',lastPlayer:{...state.player},savedAt:0,boot:true,rest:{pose:0,remaining:0,quick:0,active:false}};
 /* Code by Daniel using ChatGPT November 15, 2026 */
}
function dogMap27(point=dogState27()){
 const map=roomMap();return {...map,footRadius:.58*Math.min(1,depthScale(point)),blocked:[...map.blocked,...(state.room==='rink'?ROOMS.rink.iceAreas:[])]};
 /* Code by Daniel using ChatGPT November 15, 2026 */
}
function dogFree27(point,map=dogMap27(point),direction=dogState27().direction){
 if(!Exploration.free(point,map,true))return false;
 const index=DOG_FACING27.indexOf(direction),angle=-Math.PI/2+Math.max(0,index)*Math.PI/4,r=.85*depthScale(point);
 for(const sign of [-1,1])if(!Exploration.free({x:point.x+Math.cos(angle)*r*sign,y:point.y+Math.sin(angle)*r*sign},map,true))return false;
 return true;
 /* Code by Daniel using ChatGPT November 15, 2026 */
}
function dogSafe27(point,map=dogMap27(point)){
 if(dogFree27(point,map))return {x:point.x,y:point.y};
 for(let radius=.5;radius<11;radius+=.5)for(let i=0;i<24;i++){
  const angle=i*Math.PI/12,p={x:point.x+Math.cos(angle)*radius,y:point.y+Math.sin(angle)*radius};if(dogFree27(p,map))return p;
 }
 return null;
 /* Code by Daniel using ChatGPT November 15, 2026 */
}
function dogDeparture27(to,options){
 const d=dogState27(),q=g.dog27;if(!d||!q)return;
 q.transfer=false;if(q.boot){q.transfer=d.fed&&d.following&&d.wait!=='sleigh';return;}
 if(!d.fed||!d.following||d.room!==state.room||state.riding||options.aboard||d.wait==='sleigh')return;
 const map=dogMap27(),goal=dogSafe27(state.player,map);
 // A dog on one bank cannot use the elf's skating route to the other bank.
 if(!goal||Math.hypot(goal.x-state.player.x,goal.y-state.player.y)>2)return;
 q.transfer=routeTo09(d,goal,map).distance<1;
 /* Code by Daniel using ChatGPT November 15, 2026 */
}
function dogArrival27(id,options){
 const d=dogState27(),q=g.dog27;if(!d||!q)return;
 if(q.transfer&&!options.aboard){
  const p=dogSafe27({x:state.player.x+2,y:Math.min(94,state.player.y+2)});
  if(p){d.room=id;Object.assign(d,p);d.wait=null;}
 }
 if(d.room===id){const p=dogSafe27(d);if(p)Object.assign(d,p);}
 q.boot=false;q.transfer=false;q.path=[];q.repath=0;q.moving=false;q.lastPlayer={...state.player};
 /* Code by Daniel using ChatGPT November 15, 2026 */
}
function dogBoarding27(){
 const d=dogState27();if(d.fed&&d.following&&d.room===state.room){d.wait='sleigh';g.dog27.path=[];g.dog27.moving=false;}
 /* Code by Daniel using ChatGPT November 15, 2026 */
}
function dogTargets27(all){
 const d=dogState27();if(!d)return all;
 if(d.room===state.room)all.push({id:'dog20',x:d.x,y:d.y,wonder20:'dog',label:d.fed?'Your dog':'The dog by the hearth',hit:dogHit27()});
 if(state.room==='kitchen'&&!d.biscuit&&!d.fed)all.push({id:'dog-biscuit27',x:55.8,y:78,wonder20:'dog-biscuit',label:'A little bone-shaped biscuit',hit:[53.2,61.5,5.2,4.5]});
 return all;
 /* Code by Daniel using ChatGPT November 15, 2026 */
}
function dogHit27(){
 const d=dogState27(),scale=depthScale(d),width=9*scale,height=9*scale;return [d.x-width/2,d.y-height,width,height+1];
 /* Code by Daniel using ChatGPT November 15, 2026 */
}
function takeDogBiscuit27(){
 const d=dogState27();if(d.biscuit||d.fed)return;
 startDialogue09('grandmother',[['npc','I saved that little biscuit for the dog at the hall hearth.']],null,{choices:[
  {id:'take-biscuit',label:'May I take it to him?',onSelect:function take(){if(!d.fed)d.biscuit=true;save();closePanel();toast('You tuck the biscuit into your waypack.');/* Code by Daniel using ChatGPT November 15, 2026 */}},
  {id:'leave-biscuit',label:'I will leave it here for now.',onSelect:closePanel}
 ]});
 /* Code by Daniel using ChatGPT November 15, 2026 */
}
function feedDog27(){
 const d=dogState27();if(!d.biscuit||d.fed)return false;
 d.biscuit=false;d.fed=true;d.following=true;d.wait=null;g.wonder20.pet=3;g.dog27.still=0;g.dog27.repath=0;save();closePanel();rumble20(.12,.15);toast('One happy crunch. He gets up to come with you.');return true;
 /* Code by Daniel using ChatGPT November 15, 2026 */
}
function setDogFollowing27(following){
 const d=dogState27();if(!d.fed||d.room!==state.room)return;
 d.following=following;d.wait=null;g.dog27.path=[];g.dog27.repath=0;save();closePanel();toast(following?'He falls into step beside you.':'He settles down to wait here.');
 /* Code by Daniel using ChatGPT November 15, 2026 */
}
function visitDog27(){
 const d=dogState27();if(d.room!==state.room)return;
 const choices=[];
 if(d.biscuit&&!d.fed)choices.push({id:'feed-dog',label:'Here is a biscuit for you.',onSelect:feedDog27});
 if(d.fed)choices.push({id:d.following?'dog-wait':'dog-follow',label:d.following?'Wait here. I will come back.':'Come along with me.',onSelect:function follow(){setDogFollowing27(!d.following);/* Code by Daniel using ChatGPT November 15, 2026 */}});
 choices.push({id:'pet-dog',label:'May I sit and stroke your ears?',onSelect:function pet(){g.wonder20.pet=3;rumble20(.12,.15);closePanel();toast('He leans into your hand. His tail brushes the floor.');/* Code by Daniel using ChatGPT November 15, 2026 */}},{id:'leave-dog',label:'See you in a little while.',onSelect:closePanel});
 startDialogue09('dog',[['npc',d.biscuit&&!d.fed?'His nose lifts toward your waypack.':d.fed?'He looks up at you, his tail moving softly.':'He turns his head and thumps his tail against the rug.']],null,{choices});
 /* Code by Daniel using ChatGPT November 15, 2026 */
}
function dogPackHTML27(){
 const d=dogState27();if(!d)return '';
 if(d.biscuit)return '<div class="pack-item"><span aria-hidden="true">🦴</span><span>A little biscuit for the hearth dog</span></div>';
 if(!d.fed)return '';
 const here=d.room===state.room,text=d.following&&here&&!d.wait?'Your dog is coming with you.':'Your dog is waiting '+(d.wait==='ice'?'on the snowy bank in ':'in ')+escapeHTML(ROOMS[d.room].title)+'.';
 return '<p class="quest-status">'+text+'</p>'+(here?'<button id="pack-dog27">'+(d.following?'Wait here':'Come with me')+'</button>':'');
 /* Code by Daniel using ChatGPT November 18, 2026 */}
function dogFormation27(){
 const q=g.dog27,p=state.player,scale=depthScale(p),angle=Math.PI/2+g.direction*Math.PI/4,forward={x:Math.cos(angle),y:Math.sin(angle)},back=Math.max(2.2,4.4*scale),side=Math.max(2.1,4.6*scale);
 const candidates={behind:{x:p.x-forward.x*back,y:p.y-forward.y*back},left:{x:p.x-forward.y*side-forward.x*scale,y:p.y+forward.x*side-forward.y*scale},right:{x:p.x+forward.y*side-forward.x*scale,y:p.y-forward.x*side-forward.y*scale}};
 const map=dogMap27(),order=[q.formation,'behind','left','right'];
 for(const key of new Set(order)){const v=candidates[key];if(dogFree27(v,map))return v;}
 return dogSafe27(candidates.behind,map);
 /* Code by Daniel using ChatGPT November 15, 2026 */
}
function dogRoute27(goal,map){
 const d=dogState27(),q=g.dog27;
 if(clearWalkSegment(d,goal,map))q.path=[goal];else{
  const route=routeTo09(d,goal,map);q.path=[];let anchor=d,index=0;
  while(index<route.path.length){let end=index;for(let i=route.path.length-1;i>index;i--)if(clearWalkSegment(anchor,route.path[i],map)){end=i;break;}anchor=route.path[end];q.path.push(anchor);index=end+1;}
 }
 q.goal={...goal};q.repath=.65;
 /* Code by Daniel using ChatGPT November 15, 2026 */
}
function dogResting28(){
 const d=dogState27(),q=g.dog27;return !d.fed||!q.moving&&q.still>4;
 /* Code by Daniel using ChatGPT November 15, 2026 */
}
function dogRestHold28(){
 return Math.random()<.7?3.4+Math.random()*1.4:6+Math.random()*2;
 /* Code by Daniel using ChatGPT November 15, 2026 */
}
function updateDogRest28(dt){
 const q=g.dog27,r=q.rest;
 if(dogState27().room!==state.room)return;
 if(!state.motion){Object.assign(r,{pose:0,remaining:0,quick:0,active:false});return;}
 if(!dogResting28()){r.active=false;return;}
 if(!r.active){Object.assign(r,{pose:0,remaining:dogRestHold28(),quick:0,active:true});return;}
 r.remaining-=dt;if(r.remaining>0)return;
 const choices=DOG_REST_POSES28.filter(function another(pose){return pose!==r.pose;/* Code by Daniel using ChatGPT November 15, 2026 */});
 r.pose=choices[Math.floor(Math.random()*choices.length)];
 // A brief glance or two always ends with another quiet pause.
 if(r.quick>0)r.quick--;else if(Math.random()<.22)r.quick=Math.random()<.35?2:1;
 r.remaining=r.quick>0?.45+Math.random()*.55:dogRestHold28();
 /* Code by Daniel using ChatGPT November 15, 2026 */
}
function updateDog27(dt){
 const d=dogState27(),q=g.dog27;if(!q||document.hidden||g.paused)return;q.age+=dt;q.still+=dt;updateDogRest28(dt);q.moving=false;
 if(d.room!==state.room)return;
 const moved=Math.hypot(state.player.x-q.lastPlayer.x,state.player.y-q.lastPlayer.y);q.lastPlayer={...state.player};
 if(state.riding){if(d.fed&&d.following&&d.wait!=='sleigh'){dogBoarding27();save();}return;}
 if(d.wait==='sleigh'&&!g.slide){d.wait=null;q.repath=0;save();}
 if(!d.fed||!d.following||panel.open||g.transition||g.slide||wonderWatching20()||roomCaptures21()||g.pending?.id==='dog20')return;
 const map=dogMap27();
 if(!Exploration.free(d,map,true)){const safe=dogSafe27(d,map);if(safe)Object.assign(d,safe);else return;}
 if(q.age>=q.choiceAt&&moved>.005){q.formation=['behind','left','right'][Math.floor(Math.random()*3)];q.choiceAt=q.age+5+Math.random()*5;q.repath=0;}
 if(onIce()){
  if(d.wait!=='ice'){d.wait='ice';q.path=[];save();}return;
 }
 if(d.wait==='ice'){d.wait=null;q.repath=0;save();}
 const goal=dogFormation27();if(!goal)return;
 const gap=Math.hypot(goal.x-d.x,goal.y-d.y);q.repath-=dt;
 if(gap<.65){q.path=[];return;}
 // A stopped elf need not make his companion circle him to reach an exact slot.
 if(moved<.005&&Math.hypot(state.player.x-d.x,state.player.y-d.y)<5.4*depthScale(d)){q.path=[];return;}
 if(q.repath<=0&&(Math.hypot((q.goal?.x??0)-goal.x,(q.goal?.y??0)-goal.y)>1||!q.path.length))dogRoute27(goal,map);
 const target=q.path[0];if(!target)return;
 const before={x:d.x,y:d.y},dx=target.x-d.x,dy=target.y-d.y,dir=Exploration.direction8(dx,dy,d.direction),speed=(Math.hypot(state.player.x-d.x,state.player.y-d.y)>10?24:20)*depthScale(d),next=Exploration.move(d,{x:dx,y:dy},dt,map,true,speed);
 if(dogFree27(next,map,dir)){Object.assign(d,next);d.direction=dir;}
 const distance=Math.hypot(d.x-before.x,d.y-before.y);q.moving=distance>.0001;if(q.moving)q.still=0;q.step+=distance/Math.max(.25,depthScale(d));
 if(Math.hypot(target.x-d.x,target.y-d.y)<.4)q.path.shift();
 if(!q.moving){q.repath=0;q.path=[];}
 if(q.age-q.savedAt>4&&q.moving){q.savedAt=q.age;save();}
 /* Code by Daniel using ChatGPT November 15, 2026 */
}
function dogLayers27(){
 const d=dogState27(),layers=[];if(d?.room===state.room)layers.push({y:d.y,draw:paintDog27});
 if(state.room==='kitchen'&&!d.biscuit&&!d.fed)layers.push({y:74.1,draw:paintDogBiscuit27});return layers;
 /* Code by Daniel using ChatGPT November 15, 2026 */
}
function paintDog27(){
 const d=dogState27(),q=g.dog27,frames=g.dogFrames27;if(!frames){if(!d.fed)paintDog21();return;}
 const home=dogResting28(),index=state.motion?q.rest.pose:0;
 const frame=home?frames.idle[index]:frames.walk[DOG_FACING27.indexOf(d.direction)*2+(state.motion&&q.moving?Math.floor(q.step/3.5)%2:0)];
 const scale=frame.scale*depthScale(d),anchor=frame.anchor;
 ctx.save();ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(frame.image,...frame.rect,d.x*15.36-anchor[0]*scale,d.y*10.24-anchor[1]*scale,frame.rect[2]*scale,frame.rect[3]*scale);ctx.restore();
 /* Code by Daniel using ChatGPT November 15, 2026 */
}
function paintDogBiscuit27(){
 const frame=g.dogFrames27?.biscuit;if(!frame)return;paintFrame21(frame,DOG_COOKIE27.x*15.36,DOG_COOKIE27.y*10.24,DOG_COOKIE27.width);
 /* Code by Daniel using ChatGPT November 15, 2026 */
}
