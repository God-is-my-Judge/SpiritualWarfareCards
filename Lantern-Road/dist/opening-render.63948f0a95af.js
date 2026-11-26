'use strict';

function drawOpeningScene() {
  const W=canvas.width,H=canvas.height,z=Math.max(viewZoom(),1.5/(W/H));
  const sx=W*z/100,sy=W*z/150,scene=OPENING_WORLD.regions[state.region];
  ctx.clearRect(0,0,W,H);ctx.save();ctx.translate(-g.camera.x*sx,-g.camera.y*sy);
  const entities=[...visiblePlaces(),...Adventure.entities(),...Arena.entities(),{x:state.player.x,y:state.player.y,player:true}];
  Opening.draw(ctx,scene,sx,sy,entities,p=>{
    const x=p.x*sx,y=p.y*sy,height=120*state.settings.zoom/4.25;
    if(Leaf.drawEntity(p,x,y,height)||Adventure.drawEntity(p,x,y,height)||Arena.drawEntity(p,x,y,height))return;
    // A pending optional sprite must not stop the entire animation/input loop.
    if(!p.player&&!p.entry)return;
    if(p.player){
      ctx.fillStyle='#14241766';ctx.beginPath();ctx.ellipse(x,y+1,15,5,0,0,Math.PI*2);ctx.fill();
      directionalSprite(state.settings.avatar,x,y,height,g.direction,Walker.frame(state.settings.motion),1,true);Arena.held(x,y,height);
    }else if(p.kind==='card'){
      ctx.save();ctx.shadowColor='#ffe8a7';ctx.shadowBlur=20;
      sprite('card',x,y,65*state.settings.zoom/4.25);ctx.restore();
    }else if(p.entry.kind==='encounter'){
      const kind=p.entry.enemy||'ghoul',ready=Road.ready(p.entry,state);directionalSprite(kind,x,y,height*(kind==='worm'?1.125:1.19),p.actor?.direction||'down',Math.floor(p.actor?.step||0)%2,ready?1:.35);
    }else if(p.entry.kind==='npc'){
      const kind=p.entry.enemy||'elf',stature=scene.residents?.[p.entry.id]?.height||1;if(['boy','girl'].includes(kind)){if(p.actor?.moving)drawWalker(kind,x,y,height*stature,p.actor.direction,Math.floor(p.actor.step*2)%8);else drawStanding(kind,x,y,height*stature,1,p.actor?.direction||'down');}else directionalSprite(kind,x,y,height*stature,p.actor?.direction||'down',Math.floor(p.actor?.step||0)%2);
    }else{
      ctx.save();ctx.fillStyle='#ffdf90';ctx.shadowColor='#ffd980';ctx.shadowBlur=14;
      ctx.beginPath();ctx.arc(x,y-20,5,0,Math.PI*2);ctx.fill();ctx.restore();
    }
    if(p.entry&&g.near?.entry.id===p.entry.id){
      ctx.strokeStyle='#ffedaf';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(x,y+4,23,8,0,0,Math.PI*2);ctx.stroke();
    }
  },g.terrainDebug,state.player);
  if(!bridgeOpen()){const[x,y,w]=terrain.bridge.gate;ctx.strokeStyle='#e5d096';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(x*sx,y*sy);ctx.lineTo((x+w)*sx,y*sy);ctx.stroke();}
  Arena.effects(sx,sy);ctx.restore();Arena.hud();
  drawTravelOverlay();
  if(g.pause||document.hidden){
    ctx.fillStyle='#0b1d15b9';ctx.fillRect(0,0,W,H);ctx.fillStyle='#f5e4b7';
    ctx.font='32px Georgia';ctx.textAlign='center';ctx.fillText('Rest on the road',W/2,H/2);ctx.textAlign='left';
  }
}

function drawLoadingStatus(title,detail){
  const ratio=canvas.width/(canvas.clientWidth||canvas.width);ctx.save();ctx.fillStyle='#0c201ce8';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.textAlign='center';ctx.fillStyle='#f6e6bf';ctx.font=Math.max(26,ratio*20)+'px Georgia';ctx.fillText(title,canvas.width/2,canvas.height/2-12*ratio,canvas.width-32*ratio);ctx.font=Math.max(15,ratio*13)+'px system-ui';ctx.fillStyle='#d4dec8';let line='',row=0;for(const word of detail.split(' ')){const next=line?line+' '+word:word;if(line&&ctx.measureText(next).width>canvas.width-40*ratio){ctx.fillText(line,canvas.width/2,canvas.height/2+(20+row++*19)*ratio);line=word;}else line=next;}if(line)ctx.fillText(line,canvas.width/2,canvas.height/2+(20+row*19)*ratio);ctx.restore();
}

function drawTravelOverlay(){
  if(!Opening.travel){
    const loading=typeof Beta19!=='undefined'?Beta19.loadState():null;
    if(loading){drawLoadingStatus(loading.failed?'The road could not finish loading':'Lighting the road… '+loading.percent+'%',loading.failed?'Refresh to try again. Your saved progress is kept.':'Please wait. Your traveler and the road’s dangers are paused.');return;}

    const age=performance.now()-(Opening.arrivalStart||0);
    if(age<220){ctx.fillStyle=`rgba(8,18,14,${1-age/220})`;ctx.fillRect(0,0,canvas.width,canvas.height);}
    return;
  }
  const t=Opening.travel,age=performance.now()-t.start;
  ctx.fillStyle=`rgba(8,18,14,${Math.min(1,age/220)})`;ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='#f6e6bf';const ratio=canvas.width/(canvas.clientWidth||canvas.width);ctx.font=Math.max(22,ratio*18)+'px Georgia';ctx.textAlign='center';
  if(age>180)ctx.fillText(t.label,canvas.width/2,canvas.height/2);if(age>900){ctx.font=Math.max(15,ratio*13)+'px system-ui';ctx.fillText('Loading… '+Math.floor((t.loaded||0)/Math.max(1,t.total||1)*100)+'% · your progress is safe',canvas.width/2,canvas.height/2+32*ratio,canvas.width-32*ratio);}ctx.textAlign='left';
}

function openingObjective() {
  const errand=Journey.objective();if(errand)return errand;
  if(state.region==='riverbank')return Life.rest?'Rest beneath the bank. Press E or move to get up.':Opening.room?'Take the lantern wick to the elves. The landing is through the south door.':'Enjoy Reedbank’s festival. The northern bank path leads to Woodland Road.';
  if(state.region==='woodland')return 'Cross the timber bridge. North: Halls of the Elves. East: Woodland Adventure Road.';
  if(state.region==='whiteledge')return state.flags.includes('highroad-charter')?'Carry the dated record north to the Carver Elves. Their treehouses stand along the woodland road.':'Speak with Sereth by the record-house. Walk up its front steps and compare the dated records inside.';
  if(state.region==='whiteledge-house')return 'Explore the galleries. The dated road record is in the back archive; the south doorway leads outside.';
  if(state.region==='carverbough')return state.flags.includes('carver-beacon-repaired')?'The beacon is repaired. Take the north road to Greenwood, or explore the treehouse rooms.':'Find Lethir at the northern treehouse. Follow the winding stairs into the guildhouse; search the south workshop for the missing pin.';
  if(state.region==='carver-workshop')return 'Explore the guildhouse rooms. The stairs at the back right lead to the upper loft; the south door leads back down the tree.';
  if(state.region==='carver-loft')return 'The moon window and sleeping rooms are upstairs. Return by the winding stair at the lower right.';
  if(['carver-home','carver-archive'].includes(state.region))return 'Explore the rooms and their way-cards. The south doorway returns to the winding outside stairs.';
  return null;
}

function openingTravel(id,point,facing=null,arrival=null) {
  if(Opening.travel)return false;
  const oldRegion=state.region,oldPoint={...state.player};
  const travel={start:performance.now(),label:REGIONS[id].name,loaded:0,total:0};Opening.travel=travel;clearInput();
  const image=prepareRegionArt(id);
  Opening.prepare(id);
  // Remain at the safe departure location until the destination is decoded.
  const load=im=>im.complete?(im.naturalWidth?Promise.resolve():Promise.reject(Error('Image unavailable'))):new Promise((resolve,reject)=>{
    im.addEventListener('load',resolve,{once:true});im.addEventListener('error',reject,{once:true});
  });
  const scene=OPENING_WORLD.regions[id];
  const images=[...new Set([image,...(scene?[scene.ground,scene.floorUnderlay,...scene.parts.map(p=>p.asset)].filter(Boolean).map(src=>Opening.images.get(src)):[])].filter(Boolean))];travel.total=images.length;
  let timeout;
  const ready=Promise.race([Promise.all(images.map(im=>load(im).then(()=>{travel.loaded++;}))),new Promise((resolve,reject)=>{timeout=setTimeout(()=>reject(Error('Load timeout')),45000);})]);
  Promise.all([ready,new Promise(resolve=>setTimeout(resolve,330))]).then(()=>{
    clearTimeout(timeout);
    Opening.travel=null;
    if(state.region!==oldRegion)return;
    enterRegion(id,point,true,facing,arrival);
    Opening.arrivalStart=performance.now();
  }).catch(()=>{
    clearTimeout(timeout);
    Opening.travel=null;state.player=oldPoint;g.regionCooldown=2;
    toast('The next region could not load. Stay here and try the path again.');
  });
  return true;
}

// F2 is useful while authoring; the same view is available in Settings and on
// the touch/controller-accessible scene button.
document.addEventListener('keydown',event=>{
  if(event.code==='F2'&&!event.target.matches('textarea,input,select')){
    event.preventDefault();g.terrainDebug=!g.terrainDebug;
  }
});
document.querySelector('#scene-debug')?.addEventListener('click',()=>{
  g.terrainDebug=!g.terrainDebug;
  document.querySelector('#scene-debug').setAttribute('aria-pressed',String(g.terrainDebug));
});
