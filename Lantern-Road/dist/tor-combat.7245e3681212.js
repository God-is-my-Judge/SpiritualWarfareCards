'use strict';
// Deterministic local action simulation. No DOM, live AI, or network calls.
const TorCombat={
 weapons:{blade:{name:'Wayfarer blade',reach:3.5,damage:3,cooldown:.38,spread:-.25},spear:{name:'Ash spear',reach:5.4,damage:5,cooldown:.66,spread:.65},bow:{name:'Reed bow',damage:3,cooldown:.44}},
 unlocks(count){return{blade:true,spear:count>=2,bow:count>=4,guard:count>=1,pulse:count>=6};},
 create(seed,count,E,map){
  return{random:seed,unlocks:this.unlocks(count),player:{x:50,y:84},health:8,stamina:100,focus:0,inventory:['blade'],weapon:'blade',
   phase:'ready',wave:0,time:0,spawnClock:0,remaining:0,enemies:[],projectiles:[],zones:[],pickups:[],effects:[],kills:0,
   cooldown:0,invulnerable:0,dodge:0,dashHeld:false,aim:{x:0,y:-1},guard:false,notice:'Explore for more way-cards to unlock more field equipment.',nextId:1};
 },
 sources:[[25,14,'cave'],[82,18,'cave'],[31.5,28,'burrow'],[71,56,'burrow'],[51,17,'burrow'],[17,57,'tree'],[81,68,'tree']],
 distance(a,b){return Math.hypot((a.x-b.x)*1.5,a.y-b.y);},
 start(r,E,map){r.phase='active';this.wave(r,E,map);},
 wave(r,E,map){
  r.wave++;r.remaining=[0,8,10,9][r.wave];r.spawnClock=1.8;r.intermission=0;
  r.notice=['','The burrows are stirring. Keep moving.','The Bramble Captain has heard you.','The Root-Worm King is waking.'][r.wave];
  const points=[[50,76],[30,70],[70,73],[20,46],[76,44],[43,35],[58,53],[39,59],[62,26],[36,81]];
  r.pickups=[];
  const available=Object.keys(this.weapons).filter(k=>r.unlocks[k]);
  while(points.length){
   const n=Math.floor(r.random()*points.length),p=points.splice(n,1)[0];if(!p)break;
   const q={x:p[0]+(r.random()-.5)*2,y:p[1]+(r.random()-.5)*2};
   if(E.free(q,map,true))r.pickups.push({...q,kind:available[Math.floor(r.random()*available.length)],id:r.nextId++});
  }
  r.pickups.push({x:50,y:77,kind:'tonic',id:r.nextId++});
 },
 spawn(r,E,map,forced=null){
  let q;for(let n=0;n<30;n++){
   const source=this.sources[Math.floor(r.random()*this.sources.length)];
   const p={x:source[0]+(r.random()-.5),y:source[1]+(r.random()-.5),source:source[2]};
   if(E.free(p,map,true)&&this.distance(p,r.player)>8){q=p;break;}
  }if(!q)return false;
  const kind=forced||(r.random()<.22?'grub':r.random()<.28?'thrower':'monkey');
  const boss=kind==='captain'||kind==='rootking',health={monkey:5,thrower:5,grub:8,captain:28,rootking:56}[kind];
  r.enemies.push({...q,id:r.nextId++,kind,boss,health,maxHealth:health,emerge:1.0,age:0,cooldown:.8+r.random(),windup:0,hit:0,stun:0,
   speed:kind==='grub'?2.2:kind==='rootking'?1.9:kind==='captain'?4:3.3+r.random()*.6,direction:'down',target:null,step:0});return true;
 },
 pickup(r){
  const nearest=r.pickups.map(p=>({p,d:this.distance(p,r.player)})).filter(a=>a.d<3.2).sort((a,b)=>a.d-b.d)[0]?.p;
  if(!nearest)return null;
  if(nearest.kind==='tonic')r.health=Math.min(8,r.health+3);
  else{if(!r.inventory.includes(nearest.kind))r.inventory.push(nearest.kind);r.weapon=nearest.kind;r.stamina=Math.min(100,r.stamina+15);}
  r.pickups=r.pickups.filter(p=>p!==nearest);return nearest.kind;
 },
 cycle(r){r.weapon=r.inventory[(r.inventory.indexOf(r.weapon)+1)%r.inventory.length];},
 hurt(r,amount,source){
  if(r.invulnerable>0||r.dodge>0)return false;
  const dx=(source.x-r.player.x)*1.5,dy=source.y-r.player.y,d=Math.hypot(dx,dy)||1;
  if(r.guard&&r.stamina>=15&&(dx*r.aim.x+dy*r.aim.y)/d>-.25){r.stamina-=15;r.effects.push({...r.player,kind:'block',life:.22});return false;}
  r.health=Math.max(0,r.health-amount);r.invulnerable=.9;r.effects.push({...r.player,kind:'hurt',life:.35});
  if(r.health===0)r.phase='lost';return true;
 },
 hit(r,e,damage){
  if(e.emerge>.25||e.health<=0)return;e.health-=damage;e.hit=.18;e.stun=Math.max(e.stun,.17);
  if(e.health<=0){r.kills++;r.focus=Math.min(100,r.focus+10);r.effects.push({x:e.x,y:e.y,kind:'scatter',life:.45});}
 },
 attack(r){
  if(r.phase!=='active'||r.cooldown>0||r.guard||r.dodge>0)return false;
  const w=this.weapons[r.weapon];r.cooldown=w.cooldown;r.swing=.16;
  if(r.weapon==='bow')r.projectiles.push({...r.player,x:r.player.x,y:r.player.y,vx:r.aim.x/1.5*20,vy:r.aim.y*20,life:1.5,player:true,damage:w.damage});
  else for(const e of r.enemies){const dx=(e.x-r.player.x)*1.5,dy=e.y-r.player.y,d=Math.hypot(dx,dy);if(d<w.reach&&(dx*r.aim.x+dy*r.aim.y)/(d||1)>w.spread)this.hit(r,e,w.damage);}
  return true;
 },
 pulse(r){
  if(r.phase!=='active'||!r.unlocks.pulse||r.focus<60)return false;
  r.focus-=60;r.effects.push({...r.player,kind:'pulse',life:.5});
  for(const e of r.enemies)if(this.distance(e,r.player)<9){this.hit(r,e,4);e.stun=2;}
  return true;
 },
 step(r,dt,input,E,map){
  dt=Math.max(0,Math.min(.04,dt));r.time+=dt;r.cooldown=Math.max(0,r.cooldown-dt);r.invulnerable=Math.max(0,r.invulnerable-dt);r.dodge=Math.max(0,r.dodge-dt);r.swing=Math.max(0,(r.swing||0)-dt);
  r.effects=r.effects.filter(e=>(e.life-=dt)>0);
  const aim=Math.hypot(input.aimX||0,input.aimY||0)>.3?{x:input.aimX,y:input.aimY}:Math.hypot(input.x,input.y)>.1?{x:input.x*1.5,y:input.y}:null;
  if(aim){const n=Math.hypot(aim.x,aim.y);r.aim={x:aim.x/n,y:aim.y/n};}
  if(r.phase!=='active'&&r.phase!=='ready')return;
  r.guard=r.phase==='active'&&!!input.guard&&r.unlocks.guard&&r.stamina>2;
  if(input.dash&&!r.dashHeld&&r.stamina>=28){r.stamina-=28;r.dodge=.38;}r.dashHeld=!!input.dash;
  r.stamina=Math.min(100,r.stamina+dt*(r.guard?4:18));
  r.player=E.move(r.player,{x:input.x,y:input.y,dash:false},dt,map,true,(r.dodge>0?15:r.guard?4.0:7.4));
  if(r.phase==='ready')return;
  if(input.attack)this.attack(r);
  if(r.intermission>0){r.intermission-=dt;if(r.intermission<=0)this.wave(r,E,map);return;}
  r.spawnClock-=dt;
  if(r.remaining>0&&r.spawnClock<=0&&r.enemies.length<9){
   const forced=r.wave===2&&r.remaining===1?'captain':r.wave===3&&r.remaining===1?'rootking':null;
   if(this.spawn(r,E,map,forced))r.remaining--;r.spawnClock=.9+r.random()*.7;
  }
  for(const e of r.enemies){
   e.age+=dt;e.emerge=Math.max(0,e.emerge-dt);e.hit=Math.max(0,e.hit-dt);e.stun=Math.max(0,e.stun-dt);e.cooldown-=dt;
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
   const next=E.move(e,{x:dx*keep+jitter,y:dy*keep-jitter},dt,map,true,e.speed);
   e.direction=E.direction8(next.x-e.x,next.y-e.y,e.direction);e.step+=this.distance(next,e)*2;e.x=next.x;e.y=next.y;
  }
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
   if(r.wave===3)r.phase='won';else{r.intermission=4;r.health=Math.min(8,r.health+2);r.projectiles=[];r.zones=[];r.notice='A breathing space. Two hearts restored. Search the fallen gear.';}
  }
 }
};
if(typeof module!=='undefined')module.exports=TorCombat;
