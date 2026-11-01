'use strict';
// Battle14: deterministic local survival, two-slot equipment and earned caches.
const TorCombat={
 weapons:{
  blade:{name:'Briarwind scimitar',reach:3.7,damage:3,cooldown:.36,spread:-.2,stamina:7,weight:1,description:'Quick curved steel; light on its feet.'},
  axe:{name:'Carver oak-cleaver',reach:4.3,damage:7,cooldown:.86,windup:.24,spread:-.3,stamina:19,weight:.92,description:'Acorn-and-leaf guild seal. Broad, punishing sweep.'},
  greatsword:{name:'The Gatebreaker',reach:6.3,damage:12,cooldown:1.55,windup:.62,spread:.04,stamina:32,weight:.78,description:'Huge two-handed steel. Slow wind-up; commit to the swing.'},
  spear:{name:'Old gardener’s fork',reach:5.3,damage:4,cooldown:.6,windup:.08,spread:.67,stamina:11,weight:1,description:'Four honest tines. Long reach, narrow thrust.'},
  spade:{name:'Gravedigger’s spade',reach:3.2,damage:5,cooldown:.67,windup:.12,spread:-.4,stamina:12,weight:.95,description:'A garden tool with a very persuasive edge.'},
  bow:{name:'Carver yew-bow',reach:17,damage:3,cooldown:.52,spread:1,stamina:8,weight:1,description:'Keep your distance. Right stick or mouse aims.'},
  heartwood:{name:'Heartwood crook',reach:3.9,damage:3,cooldown:.62,spread:-.2,stamina:10,weight:1,power:'renew',description:'Activate: restore three health slowly over eight seconds. 24-second cooldown.'},
  frostsickle:{name:'Winterglass sickle',reach:3.8,damage:4,cooldown:.5,spread:-.2,stamina:10,weight:1,power:'frost',description:'Activate: slow nearby attackers for six seconds. 19-second cooldown.'}
 },
 unlocks(count){return{blade:true,axe:true,greatsword:true,spear:true,spade:true,bow:true,heartwood:true,frostsickle:true,guard:true,pulse:true};},
 create(seed,count,E,map){
  const r={random:seed,unlocks:this.unlocks(count),player:{x:50,y:84},health:8,stamina:100,focus:0,inventory:[],weapon:null,
   phase:'ready',lives:3,life:0,wave:0,time:0,spawnClock:0,remaining:0,enemies:[],projectiles:[],zones:[],pickups:[],effects:[],kills:0,
   cooldown:0,windup:0,pendingAttack:null,invulnerable:0,dodge:0,dashHeld:false,aim:{x:0,y:-1},guard:false,notice:'Search the low plants. No weapon is issued.',nextId:1,powerCooldown:{},renew:0};
  return r;
 },
 sources:[[25,14,'cave'],[82,18,'cave'],[31.5,28,'burrow'],[71,56,'burrow'],[51,17,'burrow'],[17,57,'tree'],[81,68,'tree'],[41,72,'burrow'],[65,75,'burrow']],
 cachePoints:[[46.6,78],[54.8,77],[30,70],[70,73],[20,46],[76,44],[43,35],[58,53],[39,59],[62,26],[36,81],[61,65],[27,56],[74,31],[49,22],[23,75]],
 distance(a,b){return Math.hypot((a.x-b.x)*1.5,a.y-b.y);},
 start(r,E,map){if(r.phase!=='ready')return false;this.wave(r,E,map);return this.beginLife(r);},
 beginLife(r){
  if(r.lives<=0||!['ready','downed'].includes(r.phase))return false;
  if(r.life>0){for(const kind of r.inventory)r.pickups.push({...r.player,kind,id:r.nextId++,revealed:true,cleared:false});if(!r.pickups.some(p=>p.kind!=='tonic'&&this.distance(p,{x:48,y:79})<7))r.pickups.push({x:46.6,y:78,kind:'spade',id:r.nextId++,revealed:false,cleared:false});}
  r.lives--;r.life++;r.health=8;r.stamina=100;r.focus=0;r.inventory=[];r.weapon=null;r.windup=0;r.pendingAttack=null;r.cooldown=0;r.renew=0;r.guard=false;r.dodge=0;r.dashHeld=false;
  r.player={x:50,y:84};r.projectiles=[];r.zones=[];r.invulnerable=1.5;r.phase='search';r.searchTime=r.life===1?6.5:4.5;
  r.notice='The bell is rising. Find a hidden cache; X / E to recall and claim it.';return true;
 },
 wave(r,E,map){
  r.wave++;r.remaining=[0,10,12,12][r.wave];r.spawnClock=0;r.intermission=0;
  r.notice=['','The burrows are stirring. Keep moving.','The Bramble Captain has heard you.','The Root-Worm King is waking.'][r.wave];
  if(r.wave===1){
   const kinds=Object.keys(this.weapons),bag=[...kinds,...kinds];
   for(let i=bag.length-1;i>0;i--){const j=Math.floor(r.random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]];}
   r.pickups=[];
   for(let i=0;i<this.cachePoints.length;i++){
    const a=this.cachePoints[i],q={x:a[0]+(r.random()-.5)*.6,y:a[1]+(r.random()-.5)*.6};
    if(E.free(q,map,true))r.pickups.push({...q,kind:bag[i],id:r.nextId++,revealed:false,cleared:false});
   }
  }else{
   r.pickups.push({x:50,y:65,kind:'tonic',id:r.nextId++,revealed:true});
  }
 },
 spawn(r,E,map,forced=null){
  let q;for(let n=0;n<30;n++){
   const nearbyFirst=r.wave===1&&r.remaining===10;
   const pool=nearbyFirst?[[41,72,'burrow'],[65,75,'burrow'],[81,68,'tree']]:this.sources;
   const source=pool[Math.floor(r.random()*pool.length)],p={x:source[0]+(r.random()-.5),y:source[1]+(r.random()-.5),source:source[2]};
   if(E.free(p,map,true)&&this.distance(p,r.player)>8){q=p;break;}
  }if(!q)return false;
  const kind=forced||(r.random()<.22?'grub':r.random()<.28?'thrower':'monkey');
  const boss=kind==='captain'||kind==='rootking',health={monkey:5,thrower:5,grub:8,captain:32,rootking:64}[kind];
  r.enemies.push({...q,id:r.nextId++,kind,boss,health,maxHealth:health,emerge:.8,age:0,cooldown:.7+r.random(),windup:0,hit:0,stun:0,
   speed:kind==='grub'?2.5:kind==='rootking'?2.1:kind==='captain'?4.3:3.6+r.random()*.6,direction:'down',target:null,step:0});return true;
 },
 reveal(r){for(const p of r.pickups)if(this.distance(p,r.player)<3.8)p.revealed=true;},
 nearby(r){return r.pickups.filter(p=>p.kind!=='tonic'&&p.revealed&&this.distance(p,r.player)<3.2).sort((a,b)=>this.distance(a,r.player)-this.distance(b,r.player))[0]||null;},
 unlockCache(r,id){const p=r.pickups.find(p=>p.id===id);if(!p||!p.revealed||this.distance(p,r.player)>=3.2)return false;p.cleared=true;return true;},
 pickup(r,id=null,slot=null){
  const p=id===null?this.nearby(r):r.pickups.find(p=>p.id===id);
  if(!p||!p.revealed||this.distance(p,r.player)>=3.2||!p.cleared)return null;
  if(r.inventory.includes(p.kind)){r.weapon=p.kind;r.pickups=r.pickups.filter(q=>q!==p);return p.kind;}
  if(r.inventory.length>=2){
   if(slot!==0&&slot!==1)return null;
   const dropped=r.inventory[slot];r.inventory[slot]=p.kind;
   r.pickups.push({x:p.x,y:p.y,kind:dropped,id:r.nextId++,revealed:true,cleared:false});
  }else r.inventory.push(p.kind);
  r.weapon=p.kind;r.pickups=r.pickups.filter(q=>q!==p);r.cooldown=Math.max(r.cooldown,.18);return p.kind;
 },
 cycle(r){if(!r.inventory.length)return false;r.weapon=r.inventory[(r.inventory.indexOf(r.weapon)+1)%r.inventory.length];r.windup=0;r.pendingAttack=null;return true;},
 hurt(r,amount,source){
  if(r.invulnerable>0||r.dodge>0)return false;
  const dx=(source.x-r.player.x)*1.5,dy=source.y-r.player.y,d=Math.hypot(dx,dy)||1;
  if(r.guard&&r.stamina>=15&&(dx*r.aim.x+dy*r.aim.y)/d>-.25){r.stamina-=15;r.effects.push({...r.player,kind:'block',life:.22});return false;}
  r.health=Math.max(0,r.health-amount);r.invulnerable=.8;r.effects.push({...r.player,kind:'hurt',life:.35});
  if(r.health===0){r.phase=r.lives>0?'downed':'lost';r.windup=0;r.pendingAttack=null;}
  return true;
 },
 hit(r,e,damage){
  if(e.emerge>.25||e.health<=0)return;e.health-=damage;e.hit=.18;e.stun=Math.max(e.stun,.17);
  if(e.health<=0){r.kills++;r.focus=Math.min(100,r.focus+10);r.effects.push({x:e.x,y:e.y,kind:'scatter',life:.45});}
 },
 attack(r){
  const w=this.weapons[r.weapon];if(!w||r.phase!=='active'||r.cooldown>0||r.windup>0||r.guard||r.dodge>0||r.stamina<w.stamina)return false;
  r.stamina-=w.stamina;r.cooldown=w.cooldown;r.pendingAttack={weapon:r.weapon,aim:{...r.aim}};r.windup=w.windup||0;
  if(!r.windup)this.strike(r);return true;
 },
 strike(r){
  const a=r.pendingAttack;if(!a)return;r.pendingAttack=null;const w=this.weapons[a.weapon];r.swing=.24;
  if(a.weapon==='bow')r.projectiles.push({...r.player,vx:a.aim.x/1.5*22,vy:a.aim.y*22,life:1.5,player:true,damage:w.damage});
  else for(const e of r.enemies){const dx=(e.x-r.player.x)*1.5,dy=e.y-r.player.y,d=Math.hypot(dx,dy);if(d<w.reach&&(dx*a.aim.x+dy*a.aim.y)/(d||1)>w.spread)this.hit(r,e,w.damage);}
 },
 pulse(r){
  if(r.phase!=='active'||!r.weapon)return false;
  const power=this.weapons[r.weapon].power;
  if(power){
   if((r.powerCooldown[r.weapon]||0)>0||r.stamina<25||power==='renew'&&r.health>=8)return false;
   r.stamina-=25;r.powerCooldown[r.weapon]=power==='renew'?24:19;
   if(power==='renew'){r.renew=8;r.renewBudget=3;r.notice='Heartwood sap is mending you slowly.';r.effects.push({...r.player,kind:'renew',life:1});}
   else{for(const e of r.enemies)if(this.distance(e,r.player)<10){e.slow=6;e.stun=Math.max(e.stun,.4);}r.effects.push({...r.player,kind:'frost',life:1});r.notice='Winterglass stills the nearby troop.';}
   return true;
  }
  if(r.focus<60)return false;r.focus-=60;r.effects.push({...r.player,kind:'pulse',life:.5});
  for(const e of r.enemies)if(this.distance(e,r.player)<9){this.hit(r,e,4);e.stun=2;}return true;
 },
 step(r,dt,input,E,map){
  dt=Math.max(0,Math.min(.04,dt));
  if(!['active','ready','search'].includes(r.phase))return;
  r.time+=dt;r.cooldown=Math.max(0,r.cooldown-dt);r.invulnerable=Math.max(0,r.invulnerable-dt);r.dodge=Math.max(0,r.dodge-dt);r.swing=Math.max(0,(r.swing||0)-dt);
  for(const k of Object.keys(r.powerCooldown))r.powerCooldown[k]=Math.max(0,r.powerCooldown[k]-dt);
  r.effects=r.effects.filter(e=>(e.life-=dt)>0);
  const manual=Math.hypot(input.aimX||0,input.aimY||0)>.3;
  let aim=manual?{x:input.aimX,y:input.aimY}:Math.hypot(input.x,input.y)>.1?{x:input.x*1.5,y:input.y}:null;
  if(input.attack&&!manual&&r.weapon){const near=r.enemies.filter(e=>e.health>0&&e.emerge<=.25&&this.distance(e,r.player)<Math.min(9,this.weapons[r.weapon].reach+1.5)).sort((a,b)=>this.distance(a,r.player)-this.distance(b,r.player))[0];if(near)aim={x:(near.x-r.player.x)*1.5,y:near.y-r.player.y};}
  if(aim){const n=Math.hypot(aim.x,aim.y)||1;r.aim={x:aim.x/n,y:aim.y/n};}
  r.guard=r.phase==='active'&&!!input.guard&&r.inventory.length>0&&r.stamina>2;
  if(input.dash&&!r.dashHeld&&r.stamina>=28){r.stamina-=28;r.dodge=.38;}r.dashHeld=!!input.dash;
  r.stamina=Math.min(100,r.stamina+dt*(r.guard?4:18));
  const w=this.weapons[r.weapon],speed=r.dodge>0?15:r.guard?3.8:r.windup>0?2.8:7.4*(w?.weight||1);
  r.player=E.move(r.player,{x:input.x,y:input.y,dash:false},dt,map,true,speed);this.reveal(r);
  if(r.phase==='ready')return;
  if(r.phase==='search'){r.searchTime-=dt;if(r.searchTime<=0){r.phase='active';r.notice='THE BELL. The troop is coming.';}return;}
  if(r.renew>0){const heal=Math.min(r.renew,dt)*3/8;r.renew=Math.max(0,r.renew-dt);r.health=Math.min(8,r.health+heal);}
  if(r.windup>0){r.windup=Math.max(0,r.windup-dt);if(!r.windup)this.strike(r);}
  if(input.attack)this.attack(r);
  if(r.intermission>0){r.intermission-=dt;if(r.intermission<=0)this.wave(r,E,map);return;}
  r.spawnClock-=dt;
  if(r.remaining>0&&r.spawnClock<=0&&r.enemies.filter(e=>e.health>0).length<12){
   const forced=r.wave===2&&r.remaining===1?'captain':r.wave===3&&r.remaining===1?'rootking':null;
   if(this.spawn(r,E,map,forced))r.remaining--;r.spawnClock=.65+r.random()*.55;
  }
  for(const e of r.enemies){
   e.age+=dt;e.slow=Math.max(0,(e.slow||0)-dt);e.emerge=Math.max(0,e.emerge-dt);e.hit=Math.max(0,e.hit-dt);e.stun=Math.max(0,e.stun-dt);e.cooldown-=dt;
   if(e.emerge>0||e.stun>0||e.health<=0)continue;
   const dx=r.player.x-e.x,dy=r.player.y-e.y,d=this.distance(e,r.player);
   if(e.lunge>0){
    e.lunge=Math.max(0,e.lunge-dt);const dx=e.target.x-e.x,dy=e.target.y-e.y,d=Math.hypot(dx,dy),before={x:e.x,y:e.y};
    const to=E.move(e,{x:dx,y:dy},dt,map,true,Math.min(e.boss?30:23,d/(dt||1)));e.x=to.x;e.y=to.y;e.step+=this.distance(e,before)*2;e.direction=E.direction8(e.x-before.x,e.y-before.y,e.direction);
    if(!e.struck&&this.distance(e,r.player)<(e.boss?2.1:1.45)){this.hurt(r,e.boss?2:1,e);e.struck=true;}continue;
   }
   if(e.windup>0){
    e.windup-=dt;
    if(e.windup<=0){
     if(e.kind==='rootking'){
      for(let n=0;n<3;n++)r.zones.push({x:e.target.x+(n-1)*2.4,y:e.target.y+(n%2)*1.8,timer:.9,radius:2.5});
     }else if(e.kind==='thrower'){
      const length=Math.hypot((e.target.x-e.x)*1.5,e.target.y-e.y)||1;
      r.projectiles.push({x:e.x,y:e.y,vx:(e.target.x-e.x)*11/length,vy:(e.target.y-e.y)*11/length,life:2.8,player:false,damage:1});
     }else{
      e.lunge=.18;e.struck=false;
     }
     e.cooldown=e.boss?1.9:1.4+r.random()*.6;
    }continue;
   }
   if(e.cooldown<=0&&d<(e.kind==='rootking'?22:e.kind==='thrower'?17:3.2)){
    e.target={...r.player};e.windup=e.boss ? .95 : .65;continue;
   }
   const keep=e.kind==='thrower'&&d<10?-1:1;
   const jitter=Math.sin(e.age*2.1+e.id)*.45;
   const next=E.move(e,{x:dx*keep+jitter,y:dy*keep-jitter},dt,map,true,e.speed*(e.slow>0?.4:1));
   e.direction=E.direction8(next.x-e.x,next.y-e.y,e.direction);e.step+=this.distance(next,e)*2;e.x=next.x;e.y=next.y;
  }
  if(r.phase!=='active')return;
  for(const z of r.zones){z.timer-=dt;if(z.timer<=0&&!z.burst){z.burst=true;z.timer=.25;if(this.distance(z,r.player)<z.radius)this.hurt(r,2,z);}}
  r.zones=r.zones.filter(z=>z.timer>0);
  for(const p of r.projectiles){
   const before={x:p.x,y:p.y};p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt;
   const flightMap={...map,footRadius:.08},steps=Math.max(1,Math.ceil(this.distance(before,p)/.1));
   let blocked=false;for(let n=1;n<=steps;n++)if(!E.free({x:before.x+(p.x-before.x)*n/steps,y:before.y+(p.y-before.y)*n/steps},flightMap,true)){blocked=true;break;}
   if(blocked){p.life=0;continue;}
   if(p.player){
    for(const e of r.enemies)if(e.health>0&&e.emerge<=.25&&E.segment({x:e.x*1.5,y:e.y},[before.x*1.5,before.y],[p.x*1.5,p.y])<(e.boss?1.7:.9)){this.hit(r,e,p.damage);p.life=0;break;}
   }else if(E.segment({x:r.player.x*1.5,y:r.player.y},[before.x*1.5,before.y],[p.x*1.5,p.y])<.75){this.hurt(r,p.damage,{x:p.x-p.vx,y:p.y-p.vy});p.life=0;}
  }
  r.projectiles=r.projectiles.filter(p=>p.life>0).slice(-48);r.enemies=r.enemies.filter(e=>e.health>0);
  for(const p of [...r.pickups])if(p.kind==='tonic'&&this.distance(p,r.player)<1.2){r.health=Math.min(8,r.health+3);r.pickups=r.pickups.filter(q=>q!==p);}
  if(r.phase==='active'&&r.remaining===0&&!r.enemies.length){
   if(r.wave===3)r.phase='won';else{r.intermission=3;r.projectiles=[];r.zones=[];r.notice='A brief lull. Search the plants or change your two weapons.';}
  }
 }
};
if(typeof module!=='undefined')module.exports=TorCombat;
