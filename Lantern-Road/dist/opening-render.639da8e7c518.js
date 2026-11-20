'use strict';

function drawOpeningScene() {
  const W=canvas.width,H=canvas.height,z=Math.max(viewZoom(),1.5/(W/H));
  const sx=W*z/100,sy=W*z/150,scene=OPENING_WORLD.regions[state.region];
  ctx.clearRect(0,0,W,H);ctx.save();ctx.translate(-g.camera.x*sx,-g.camera.y*sy);
  const entities=[...visiblePlaces(),{x:state.player.x,y:state.player.y,player:true}];
  Opening.draw(ctx,scene,sx,sy,entities,p=>{
    const x=p.x*sx,y=p.y*sy,height=120*state.settings.zoom/4.25;
    if(p.player){
      ctx.fillStyle='#14241766';ctx.beginPath();ctx.ellipse(x,y+1,15,5,0,0,Math.PI*2);ctx.fill();
      directionalSprite(state.settings.avatar,x,y,height,g.direction,g.walking?Math.floor(g.step*2)%4:1,1,true);
    }else if(p.kind==='card'){
      ctx.save();ctx.shadowColor='#ffe8a7';ctx.shadowBlur=20;
      sprite('card',x,y,65*state.settings.zoom/4.25);ctx.restore();
    }else if(p.entry.kind==='npc'){
      directionalSprite(p.entry.enemy||'elf',x,y,height,p.actor?.direction||'down',Math.floor(p.actor?.step||0)%2);
    }else{
      ctx.save();ctx.fillStyle='#ffdf90';ctx.shadowColor='#ffd980';ctx.shadowBlur=14;
      ctx.beginPath();ctx.arc(x,y-20,5,0,Math.PI*2);ctx.fill();ctx.restore();
    }
    if(p.entry&&g.near?.entry.id===p.entry.id){
      ctx.strokeStyle='#ffedaf';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(x,y+4,23,8,0,0,Math.PI*2);ctx.stroke();
    }
  },g.terrainDebug,state.player);
  ctx.restore();
  drawTravelOverlay();
  if(g.pause||document.hidden){
    ctx.fillStyle='#0b1d15b9';ctx.fillRect(0,0,W,H);ctx.fillStyle='#f5e4b7';
    ctx.font='32px Georgia';ctx.textAlign='center';ctx.fillText('Rest on the road',W/2,H/2);ctx.textAlign='left';
  }
}

function drawTravelOverlay(){
  if(!Opening.travel){
    const age=performance.now()-(Opening.arrivalStart||0);
    if(age<220){ctx.fillStyle=`rgba(8,18,14,${1-age/220})`;ctx.fillRect(0,0,canvas.width,canvas.height);}
    return;
  }
  const t=Opening.travel,age=performance.now()-t.start;
  ctx.fillStyle=`rgba(8,18,14,${Math.min(1,age/220)})`;ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='#f6e6bf';ctx.font='22px Georgia';ctx.textAlign='center';
  if(age>180)ctx.fillText(t.label,canvas.width/2,canvas.height/2);ctx.textAlign='left';
}

function openingObjective() {
  if(state.region==='riverbank')return Opening.room?'Take the lantern wick to the elves. The landing is through the south door.':'Enjoy Reedbank’s festival. Follow the bank path east into Woodland Road.';
  if(state.region==='woodland')return 'Follow the water. Find the elven wayfarers, then continue east to Greenwood.';
  return null;
}

function openingTravel(id,point) {
  if(Opening.travel)return false;
  const oldRegion=state.region,oldPoint={...state.player};
  Opening.travel={start:performance.now(),label:REGIONS[id].name};clearInput();
  const image=prepareRegionArt(id);
  Opening.prepare(id);
  // Remain at the safe departure location until the destination is decoded.
  const load=im=>im.complete?(im.naturalWidth?Promise.resolve():Promise.reject(Error('Image unavailable'))):new Promise((resolve,reject)=>{
    im.addEventListener('load',resolve,{once:true});im.addEventListener('error',reject,{once:true});
  });
  const scene=OPENING_WORLD.regions[id];
  const images=[image,...(scene?[scene.ground,...scene.parts.map(p=>p.asset)].map(src=>Opening.images.get(src)):[])];
  let timeout;
  const ready=Promise.race([Promise.all(images.map(load)),new Promise((resolve,reject)=>{timeout=setTimeout(()=>reject(Error('Load timeout')),10000);})]);
  Promise.all([ready,new Promise(resolve=>setTimeout(resolve,330))]).then(()=>{
    clearTimeout(timeout);
    Opening.travel=null;
    if(state.region!==oldRegion)return;
    enterRegion(id,point,true);
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
