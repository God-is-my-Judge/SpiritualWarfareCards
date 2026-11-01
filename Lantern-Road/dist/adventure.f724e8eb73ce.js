'use strict';
const Adventure={
 images:new Map(),poses:new Map(),book:null,page:0,squirrels:[],raceCooldown:18,raceCard:null,raceRandom:null,
 prepare(){for(const art of Object.values(ADVENTURE_ART)){if(!this.images.has(art.asset)){const im=new Image();im.src=art.asset;this.images.set(art.asset,im);}}},
 sprite(name,frame,x,y,h,mirror=false,alpha=1){
  const art=ADVENTURE_ART[name],im=this.images.get(art?.asset);if(!im?.complete||!im.naturalWidth||!art.frames.length)return;
  const i=frame%art.frames.length,[l,t,w,b]=art.frames[i],key=name+'|'+i;let pose=this.poses.get(key);
  if(!pose){pose=document.createElement('canvas');pose.width=w;pose.height=b;const p=pose.getContext('2d');p.beginPath();for(const [x,y,w,h]of art.clips[i])p.rect(x,y,w,h);p.clip();p.drawImage(im,l,t,w,b,0,0,w,b);this.poses.set(key,pose);}
  const scale=h/(art.referenceHeight||b);ctx.save();ctx.globalAlpha=alpha;ctx.translate(x,y);if(mirror)ctx.scale(-1,1);ctx.drawImage(pose,-w*scale/2,-b*scale,w*scale,b*scale);ctx.restore();
 },
 sync(){
  this.prepare();Arena.sync();document.documentElement?.classList.toggle('tor-active',Arena.active());
  $('#interact').textContent=Arena.active()?'Pick up / Boat · E / X':'Interact · E';
  if(state.region!=='greenwood'){this.squirrels=[];this.raceCard=null;}
  else if(!this.squirrels.length){
   this.raceRandom=Road.rng(state.seed+'|road-runners');
   this.squirrels=[0,1].map(i=>({id:i,x:41+i*.7,y:88-i*2,direction:'up',step:0,index:i?3:1,reverse:false,clock:i*1.7}));this.raceCooldown=18;
  }
 },
 visit(id){
  if(id==='tor-ferry'){this.ferry();return true;}
  if(id==='road-races-sign'){this.raceSign();return true;}
  if(id==='woodland-fork-sign'){this.fork();return true;}
  if(id.startsWith('road-book-')){this.openBook(id.slice(10));return true;}
  return false;
 },
 raceSign(){show(`<h2 id="panel-title">The Road Runners</h2><p>“A quick chase along the main road, then a verse you know. You can always ask us to let you pass.”</p><p>Races are ${state.roadRaces===false?'off':'on'}. The squirrels rest between chases and leave other roads alone.</p><div class="actions"><button class="primary" data-action="road-races-on">Race on this road</button><button data-action="quiet-road">Quiet roads</button><button data-action="close">Continue</button></div>`,'squirrel-sign','A GAME BESIDE THE ROAD');},
 ferry(){
  show(`<h2 id="panel-title">A fast boat to Thornwake Tor?</h2><p>The ferryman jerks a thumb toward a dark ridge beyond the reeds. “Caves under the roots. A troop that hunts at the bell. And something down there big enough to turn the whole island over.”</p><p>“I'll take you fast. I'll bring you back, too. But step onto that shore ready to move.”</p><p><strong>Optional action battle:</strong> three waves, scattered weapons, a Bramble Captain and the Root-Worm King. Your discoveries unlock equipment. Your road progress stays safe.</p><div class="actions"><button class="primary" data-action="tor-sail">Take the fast boat</button><button data-action="close">Stay on the road</button></div>`,'tor-ferry','BEYOND THE REEDS');
 },
 fork(){
  show(`<h2 id="panel-title">Two roads beyond the bridge</h2><p><strong>North · Halls of the Elves</strong><br>Whiteledge's records, the Carvers' treehouses and the damaged beacon road.</p><p><strong>East · Woodland Adventure Road</strong><br>Greenwood's hollow trees, the root-worm, racing squirrels and the old watch-ring.</p><p>Walk north or east from this sign. Both routes remain connected.</p><button class="primary" data-action="close">Choose my road</button>`,'road-sign','THE FORK');
 },
 openBook(id,page=0){
  const book=STORY_BOOKS.find(b=>b.id===id);if(!book)return;
  this.book=id;this.page=Math.max(0,Math.min(book.pages.length-1,page));
  show(`<div class="road-book"><span class="book-imprint">${esc(book.author)} · ${esc(book.era)}</span><h2 id="panel-title">${esc(book.title)}</h2><p class="book-page">${esc(book.pages[this.page])}</p><span class="book-number">${this.page+1} / ${book.pages.length}</span></div><div class="actions book-controls"><button class="${this.page<book.pages.length-1?'primary':''}" data-action="book-next" ${this.page===book.pages.length-1?'disabled':''}>Next page ▸</button><button data-action="book-prev" ${this.page===0?'disabled':''}>◂ Previous</button><button class="${this.page===book.pages.length-1?'primary':''}" data-action="close">Close the book</button></div>`,'road-book','A BOOK FROM THE ROAD');
 },
 handle(action,id){
  if(action==='tor-sail'){closePanel();enterRegion('thornwake',[50,84],false,'up');return true;}
  if(action==='tor-start'){closePanel();TorCombat.start(Arena.run,Exploration,terrain);return true;}
  if(action==='tor-retry'){closePanel();Arena.reset();return true;}
  if(action==='tor-return'){closePanel();Arena.run=null;enterRegion('riverbank',[32.2,63],false,'up');return true;}
  if(action==='tor-switch'){if(Arena.active())TorCombat.cycle(Arena.run);return true;}
  if(action==='tor-pulse'){if(Arena.active()&&!TorCombat.pulse(Arena.run))toast(Arena.run.unlocks.pulse?'Build 60 focus by clearing attackers.':'The lantern pulse unlocks at six discoveries.');return true;}
  if(action==='pause'&&Arena.active()){Arena.menu();return true;}
  if(action==='book-next'||action==='book-prev'){this.openBook(this.book,this.page+(action==='book-next'?1:-1));return true;}
  if(action==='squirrel-recall'){this.raceCard=id;g.battle=null;practice(id);return true;}
  if(action==='road-races-on'){state.roadRaces=true;this.raceCooldown=15;persist();closePanel();toast('The Road Runners will race on Greenwood’s main road.');return true;}
  if(action==='quiet-road'){state.roadRaces=false;this.raceCard=null;persist();closePanel();toast('The squirrels will give you a quiet road. Turn races back on at their sign.');return true;}
  return false;
 },
 recalled(ex){
  if(!this.raceCard||ex.id!==this.raceCard)return false;
  this.raceCard=null;this.raceCooldown=90;
  show(`<h2 id="panel-title">“Well carried!”</h2><p>One squirrel taps the other's shoulder. “Our turn to remember it.” They race each other toward the next bend, leaving you the road.</p><button class="primary" data-action="close">Continue the journey</button>`,'squirrel-finish','THE ROAD RUNNERS');return true;
 },
 race(){
  this.raceCooldown=80;
  const learned=state.learned.map(byID).filter(Boolean);
  if(!learned.length){toast('“Find a way-card first. Then race us!” The squirrels leave you the road.');return;}
  show(`<h2 id="panel-title">“Caught you—your verse!”</h2><p>The two squirrels skid to a halt. “Pick one you know. We'll listen.”</p><div class="cards">${learned.slice(0,8).map(c=>buttonCard(c,'squirrel-recall')).join('')}</div><div class="actions"><button data-action="close">Let me pass this time</button><button data-action="quiet-road">I want quiet roads</button></div>`,'squirrel-race','THE ROAD RUNNERS');
 },
 update(dt){
  if(state.region!=='greenwood'||state.locationLayer||state.roadRaces===false)return;
  this.raceCooldown=Math.max(0,this.raceCooldown-dt);
  const route=OPENING_WORLD.regions.greenwood.squirrelRoute;
  for(const a of this.squirrels){
   a.clock+=dt;const near=TorCombat.distance(a,state.player),onRoad=Exploration.surface(state.player,terrain)==='road';
   const hunting=this.raceCooldown<=0&&onRoad&&near<17;
   let target=route[a.index%route.length];if(!bridgeOpen()&&target[1]<60){a.reverse=true;a.index=Math.max(0,a.index-1);target=route[a.index];}
   const jitter=Math.sin(a.clock*3.3+a.id)*.9;
   const goal=hunting?{x:state.player.x+jitter,y:state.player.y+Math.cos(a.clock*2+a.id)*.7}:{x:target[0],y:target[1]};
   const burst=(a.clock%4.3)<1.3,speed=hunting?(burst?11:5.4):(burst?8.4:5.1);
   const next=Exploration.move(a,{x:goal.x-a.x,y:goal.y-a.y},dt,terrain,bridgeOpen(),speed);
   a.direction=Exploration.direction8(next.x-a.x,next.y-a.y,a.direction);a.step+=TorCombat.distance(a,next)*2;a.x=next.x;a.y=next.y;
   if(!hunting&&Math.hypot(a.x-goal.x,a.y-goal.y)<.9){if(a.index===route.length-1)a.reverse=true;if(a.index===0)a.reverse=false;a.index+=a.reverse?-1:1;}
   if(hunting&&near<1.05){this.race();break;}
  }
 },
 entities(){
  const result=[];
  if(state.region==='riverbank')result.push({x:32.2,y:69,adventureKind:'boat'});
  if(state.region==='greenwood'&&state.roadRaces!==false)for(const a of this.squirrels)result.push({...a,adventureKind:'squirrel'});
  return result;
 },
 drawEntity(p,x,y,h){
  if(p.adventureKind==='boat'){
   const z=h/100;ctx.save();ctx.translate(x,y);ctx.scale(z,z);ctx.fillStyle='#352416';ctx.strokeStyle='#e0b66e';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-22,-16);ctx.quadraticCurveTo(-33,12,0,27);ctx.quadraticCurveTo(32,12,22,-16);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle='#a6733d';ctx.fillRect(-19,-6,38,6);ctx.fillRect(-14,8,28,5);ctx.restore();return true;
  }
  if(p.adventureKind==='squirrel'){directionalSprite('squirrel',x,y,h*.58,p.direction,Math.floor(p.step)%2);return true;}
  if(p.entry?.id==='whiteledge-greywing'){this.sprite('greywing',Math.floor(g.clock/3)%2,x,y,h*1.7,false);return true;}
  if(p.entry?.id==='woodland-fork-sign'){
   const z=h/100;ctx.save();ctx.translate(x,y);ctx.scale(z,z);ctx.fillStyle='#53381f';ctx.fillRect(-4,-66,8,66);ctx.strokeStyle='#dab67b';ctx.lineWidth=1;
   for(const [text,yy,right]of [['↑ Halls of the Elves',-60,false],['Woodland Adventure →',-34,true]]){ctx.fillStyle='#76502b';ctx.beginPath();ctx.moveTo(-100,yy);ctx.lineTo(95,yy);ctx.lineTo(right?110:95,yy+11);ctx.lineTo(95,yy+23);ctx.lineTo(-100,yy+23);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle='#fff0c5';ctx.font='bold 12px Georgia';ctx.fillText(text,-91,yy+16);}ctx.restore();return true;
  }
  return false;
 }
};

const Arena={
 run:null,reported:false,mouseAttack:false,mouseAim:null,mouseScreen:null,
 active(){return state.region==='thornwake';},
 sync(){if(this.active()&&!this.run)this.reset();else if(!this.active()){this.run=null;this.mouseAttack=false;this.mouseAim=null;this.mouseScreen=null;}},
 reset(){
  state.arcade??={attempts:0,wins:0,bestKills:0};state.arcade.attempts++;
  this.run=TorCombat.create(Road.rng(state.seed+'|tor|'+state.arcade.attempts),state.learned.length,Exploration,terrain);state.player={x:50,y:84};this.run.player={...state.player};this.reported=false;persist();
 },
 menu(){
  if(g.pause){g.pause=false;g.pauseReason=null;$('#pause').textContent='Ⅱ';$('#pause').setAttribute('aria-label','Pause game');}
  const r=this.run,u=r.unlocks,gear=[['Ash spear',u.spear,'two'],['Reed bow',u.bow,'four'],['Guard',u.guard,'one'],['Lantern pulse',u.pulse,'six']];
  show(`<h2 id="panel-title">Thornwake Tor</h2><p>Hold your ground. Watch the dirt. Move when the bell rings.</p><p><strong>Three waves · Two bosses · Solo survival</strong><br>Find gear on the clearing; win by clearing each wave. Orange tells mark incoming strikes. The boat is always available from this menu.</p><p><strong>Controller:</strong> left stick / D-pad move; A strike; B dodge; X pick up / boat; Y switch; LB guard; RB pulse. Right stick aims.<br><strong>Keyboard:</strong> WASD/arrows move; K strike; Space dodge; E pick up; Q switch; L guard; R pulse. Mouse: aim and hold left click.</p><p>${gear.map(([name,on,n])=>name+': '+(on?'unlocked':'find '+n+' way-card'+(n==='one'?'':'s'))).join(' · ')}</p><div class="actions">${r.phase==='ready'?'<button class="primary" data-action="tor-start">Begin the battle</button>':r.phase==='active'?'<button class="primary" data-action="close">Back into the fight</button>':'<button class="primary" data-action="tor-retry">Try a fresh run</button>'}<button data-action="tor-return">Return by boat</button></div>`,'tor-menu','THE BELL BELOW THE ROOTS');
 },
 interact(){
  if(!this.run)return;
  if(this.run.phase==='ready'||TorCombat.distance(this.run.player,{x:50,y:88})<5){this.menu();return;}
  const item=TorCombat.pickup(this.run);if(item)toast(item==='tonic'?'Field tonic · three hearts':TorCombat.weapons[item].name+' equipped');else toast('Move close to a weapon, or press Escape / Start for the boat.');
 },
 update(dt,input){
  const r=this.run;if(!r)return;const before={...state.player};r.player={...state.player};
  if(this.mouseScreen){const z=Math.max(viewZoom(),1.5/(canvas.width/canvas.height)),sx=canvas.width*z/100,sy=canvas.width*z/150;this.mouseAim={x:g.camera.x+this.mouseScreen.x*canvas.width/sx,y:g.camera.y+this.mouseScreen.y*canvas.height/sy};}
  if(this.mouseAim){const dx=(this.mouseAim.x-r.player.x)*1.5,dy=this.mouseAim.y-r.player.y,n=Math.hypot(dx,dy)||1;input={...input,aimX:dx/n,aimY:dy/n};}
  TorCombat.step(r,dt,{...input,attack:input.attack||this.mouseAttack},Exploration,terrain);
  state.player={...r.player};g.clock+=dt;g.walking=Math.hypot(state.player.x-before.x,state.player.y-before.y)>.001;
  g.direction=Exploration.direction8(state.player.x-before.x,state.player.y-before.y,g.direction);
  if(!g.walking&&(input.attack||Math.abs(input.aimX||0)>.3||Math.abs(input.aimY||0)>.3))g.direction=Exploration.direction8(r.aim.x/1.5,r.aim.y,g.direction);
  Walker.advance(state.player.x-before.x,state.player.y-before.y,regionConfig().scale);
  Opening.update(state.region,before,state.player,dt,state.settings.motion);
  g.camera=Exploration.camera(state.player,viewZoom(),state.settings.camera,canvas.width/canvas.height);g.screen=Exploration.frame(state.player,viewZoom());
  $('#view-name').textContent=regionConfig().name.toUpperCase();
  $('#nearby').textContent=r.phase==='ready'?'E / X · Ready the field kit and begin':r.notice+' · K / A strike · E / X pick up';$('#interact').disabled=false;
  $('#objective').textContent=r.phase==='ready'?'Thornwake Tor · ready your field kit at the landing.':'Thornwake Tor · wave '+r.wave+'/3 · '+r.kills+' attackers driven off';
  $('#hearts').textContent='♥'.repeat(r.health)+'♡'.repeat(8-r.health);$('#hearts').setAttribute('aria-label',r.health+' of eight Tor hearts');
  if(!this.reported&&['won','lost'].includes(r.phase)){
   this.reported=true;state.arcade.bestKills=Math.max(state.arcade.bestKills,r.kills);if(r.phase==='won'){state.arcade.wins++;state.xp+=30;}persist();
   show(`<h2 id="panel-title">${r.phase==='won'?'The bell falls silent.':'The ferryman pulls you clear.'}</h2><p>${r.phase==='won'?'The Root-Worm King sinks beneath the clearing. The troop scatters into the trees; the landing is safe again.':'“Breathe,” he says. “You know the island better now. We can come back when you’re ready.”'}</p><p>${r.kills} attackers driven off · ${Math.floor(r.time)} seconds · best ${state.arcade.bestKills}. Your road discoveries and progress are safe.</p><div class="actions"><button class="primary" data-action="tor-retry">A fresh run</button><button data-action="tor-return">Return to Reedbank</button></div>`,'tor-result','THORNWAKE TOR');
  }
 },
 entities(){return this.active()&&this.run?[...this.run.enemies.map(e=>({...e,combatKind:'enemy'})),...this.run.pickups.map(p=>({...p,combatKind:'pickup'}))]:[];},
 icon(kind,x,y,size=24,angle=-.7){
  ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.lineWidth=Math.max(2,size*.10);ctx.lineCap='round';
  if(kind==='tonic'){ctx.fillStyle='#9cde8a';ctx.fillRect(-size*.28,-size*.28,size*.56,size*.6);ctx.fillStyle='#f4e2b5';ctx.fillRect(-size*.15,-size*.45,size*.3,size*.2);}
  else if(kind==='bow'){ctx.strokeStyle='#d7aa59';ctx.beginPath();ctx.arc(0,0,size*.6,-Math.PI/2,Math.PI/2);ctx.stroke();ctx.strokeStyle='#f6ead1';ctx.beginPath();ctx.moveTo(0,-size*.6);ctx.lineTo(0,size*.6);ctx.stroke();}
  else{ctx.strokeStyle='#926137';ctx.beginPath();ctx.moveTo(0,size*.35);ctx.lineTo(0,-size*.6);ctx.stroke();ctx.fillStyle='#dbe9ed';ctx.beginPath();ctx.moveTo(-size*.16,-size*.25);ctx.lineTo(0,-size*(kind==='spear'?1.1:.8));ctx.lineTo(size*.16,-size*.25);ctx.closePath();ctx.fill();ctx.strokeStyle='#ecbf6a';ctx.beginPath();ctx.moveTo(-size*.23,0);ctx.lineTo(size*.23,0);ctx.stroke();}ctx.restore();
 },
 drawEntity(p,x,y,h){
  if(p.combatKind==='pickup'){ctx.save();ctx.shadowColor=p.kind==='tonic'?'#9effb5':'#ffe7aa';ctx.shadowBlur=12;this.icon(p.kind,x,y-7,h*.33);ctx.restore();return true;}
  if(p.combatKind!=='enemy')return false;
  ctx.save();
  if(p.emerge>0||p.windup>0){ctx.strokeStyle=p.windup>0?'#ffad66':'#e3c386';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(x,y,Math.max(15,h*.4),Math.max(7,h*.13),0,0,Math.PI*2);ctx.stroke();}
  const alpha=p.emerge>0?Math.max(.1,1-p.emerge):1;
  if(p.kind==='grub'||p.kind==='rootking')sprite('worm',x,y,h*(p.boss?1.8:.8),p.direction.includes('left')?-1:1,alpha);
  else{const row=p.windup>0||p.lunge>0?3:0,dir=p.direction.startsWith('up')?2:p.direction.includes('left')||p.direction.includes('right')?1:0;Adventure.sprite('monkey',row+dir,x,y,h*(p.boss?1.35:.75),p.direction.includes('left'),alpha);}
  if(p.health<p.maxHealth){ctx.fillStyle='#211a16';ctx.fillRect(x-h*.35,y-h*(p.boss?1.85:.85)-9,h*.7,5);ctx.fillStyle='#e7aa6c';ctx.fillRect(x-h*.35,y-h*(p.boss?1.85:.85)-9,h*.7*p.health/p.maxHealth,5);}
  ctx.restore();return true;
 },
 held(x,y,h){
  if(!this.active()||!this.run)return;const r=this.run,z=h/120,angle=Math.atan2(r.aim.y,r.aim.x)+Math.PI/2;
  this.icon(r.weapon,x+10*z,y-h*.36,30*z,angle+(r.swing>0?(r.swing/.16-.5)*1.8:0));
  if(r.guard){ctx.save();ctx.strokeStyle='#a6e0e8';ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(x+r.aim.x*25*z,y-h*.35+r.aim.y*15*z,18*z,25*z,angle,0,Math.PI*2);ctx.stroke();ctx.restore();}
 },
 effects(sx,sy){
  if(!this.active()||!this.run)return;const r=this.run;
  for(const zone of r.zones){ctx.save();ctx.strokeStyle=zone.burst?'#fff0b0':'#e38c4f';ctx.fillStyle=zone.burst?'#bc642d66':'#dca35733';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(zone.x*sx,zone.y*sy,zone.radius/1.5*sx,zone.radius*sy,0,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.restore();}
  for(const p of r.projectiles){ctx.strokeStyle=p.player?'#eaffdf':'#ffb060';ctx.lineWidth=p.player?3:6;ctx.beginPath();ctx.moveTo(p.x*sx,p.y*sy-12);ctx.lineTo((p.x-p.vx*.025)*sx,(p.y-p.vy*.025)*sy-12);ctx.stroke();}
  for(const e of r.effects){ctx.save();ctx.globalAlpha=Math.min(1,e.life*3);ctx.strokeStyle=e.kind==='hurt'?'#ffa276':e.kind==='block'?'#aff4fa':'#ffe9a8';ctx.lineWidth=3;ctx.beginPath();const radius=e.kind==='pulse'?(1-e.life/.5)*9:1-e.life;ctx.ellipse(e.x*sx,e.y*sy,Math.max(.4,radius)/1.5*sx,Math.max(.4,radius)*sy,0,0,Math.PI*2);ctx.stroke();ctx.restore();}
 },
 hud(){
  if(!this.active()||!this.run)return;const r=this.run;ctx.save();ctx.fillStyle='#10251ee8';ctx.fillRect(14,48,Math.min(310,canvas.width-28),63);ctx.font='14px system-ui';ctx.fillStyle='#fff0cb';ctx.fillText(TorCombat.weapons[r.weapon].name+' · '+r.inventory.length+' weapons',24,69);
  ctx.fillStyle='#40534c';ctx.fillRect(24,81,130,8);ctx.fillRect(170,81,130,8);ctx.fillStyle='#b9e3c2';ctx.fillRect(24,81,130*r.stamina/100,8);ctx.fillStyle='#f1cc79';ctx.fillRect(170,81,130*r.focus/100,8);ctx.font='10px system-ui';ctx.fillStyle='#e1e9d6';ctx.fillText('STAMINA / GUARD',24,103);ctx.fillText('LANTERN FOCUS',170,103);
  const boss=r.enemies.find(e=>e.boss);if(boss){const w=Math.min(340,canvas.width-40),x=(canvas.width-w)/2,y=canvas.height-76;ctx.fillStyle='#18251de8';ctx.fillRect(x-8,y-25,w+16,42);ctx.font='bold 15px Georgia';ctx.fillStyle='#ffe3a8';ctx.fillText(boss.kind==='rootking'?'THE ROOT-WORM KING':'THE BRAMBLE CAPTAIN',x,y-8);ctx.fillStyle='#513e30';ctx.fillRect(x,y,w,8);ctx.fillStyle='#eab878';ctx.fillRect(x,y,w*boss.health/boss.maxHealth,8);}
  ctx.restore();
 },
 initPointer(){
  const point=e=>{const b=canvas.getBoundingClientRect();this.mouseScreen={x:(e.clientX-b.left)/b.width,y:(e.clientY-b.top)/b.height};};
  canvas.addEventListener('pointerdown',e=>{if(!this.active()||e.button!==0)return;point(e);this.mouseAttack=true;canvas.setPointerCapture?.(e.pointerId);});
  canvas.addEventListener('pointermove',e=>{if(this.active())point(e);});
  for(const type of ['pointerup','pointercancel'])canvas.addEventListener(type,()=>{this.mouseAttack=false;});
 }
};
