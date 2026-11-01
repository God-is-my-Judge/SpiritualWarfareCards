'use strict';
// Isolated Battle14 adapter: art, cache recall, two slots, lives and readable HUD.
const BattleArt={
 images:new Map(),
 prepare(){for(const a of Object.values(BATTLE_ART)){if(this.images.has(a.asset))continue;const im=new Image();im.src=a.asset;this.images.set(a.asset,im);}},
 image(kind){return this.images.get(BATTLE_ART[kind]?.asset);},
 weapon(kind,x,y,size=36,angle=0){
  const im=this.image(kind),a=BATTLE_ART[kind];if(!a||!im?.complete||!im.naturalWidth)return;
  ctx.save();ctx.translate(x,y);ctx.rotate(angle);const w=size*a.size[0]/a.size[1];ctx.drawImage(im,-w*.5,-size*.73,w,size);ctx.restore();
 },
 sign(sign,x,y,h){
  const kind=sign.style==='carver'?'carver-sign':'oak-sign',a=BATTLE_ART[kind],im=this.image(kind);if(!im?.complete||!im.naturalWidth)return false;
  const height=h*1.8,width=height*a.size[0]/a.size[1]*Math.max(1.4,Math.min(1.9,Math.max(...sign.boards.map(b=>b[0].length))/10));
  ctx.save();ctx.drawImage(im,x-width/2,y-height,width,height);
  const arrows={up:'↑',down:'↓',left:'←',right:'→','up-left':'↖','up-right':'↗','down-left':'↙'};
  ctx.textAlign='center';ctx.textBaseline='middle';
  const boards=sign.boards.slice(0,2);
  for(let i=0;i<boards.length;i++){
   const[label,dir]=boards[i],yy=y-height+(i===0?.267:.478)*height,xx=x+(i===0?-.035:.027)*width;
   const fs=Math.max(9,height*.088);ctx.font=fs+'px "Carver Branch", Georgia, serif';
   ctx.fillStyle='#f6dfaa99';ctx.fillText(label.toUpperCase(),xx+.6,yy+.8,width*.53);
   ctx.fillStyle='#3d2919';ctx.fillText(label.toUpperCase(),xx,yy,width*.53);
   const vectors={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0],'up-left':[-.707,-.707],'up-right':[.707,-.707],'down-left':[-.707,.707]},v=vectors[dir];
   if(v){const ax=x+(i===0?-.39:.39)*width,ay=yy,len=Math.max(6,height*.055),tip=[ax+v[0]*len,ay+v[1]*len];ctx.save();ctx.strokeStyle='#f7e1ac';ctx.lineWidth=5;ctx.lineCap='round';for(const stroke of[5,2.5]){ctx.lineWidth=stroke;ctx.strokeStyle=stroke===5?'#f7e1ac':'#302114';ctx.beginPath();ctx.moveTo(ax-v[0]*len,ay-v[1]*len);ctx.lineTo(...tip);ctx.moveTo(tip[0]-v[0]*len*.75-v[1]*len*.65,tip[1]-v[1]*len*.75+v[0]*len*.65);ctx.lineTo(...tip);ctx.lineTo(tip[0]-v[0]*len*.75+v[1]*len*.65,tip[1]-v[1]*len*.75-v[0]*len*.65);ctx.stroke();}ctx.restore();}
  }
  ctx.restore();return true;
 },
 card(kind){const w=TorCombat.weapons[kind];return `<span class="field-weapon"><img src="${BATTLE_ART[kind].asset}" alt=""><span><strong>${esc(w.name)}</strong><small>${esc(w.description)}</small><small>Damage ${w.damage} · ${w.cooldown.toFixed(2)}s recovery · ${w.stamina} stamina</small></span></span>`;}
};
BattleArt.prepare();
const originalArena={drawEntity:Arena.drawEntity,effects:Arena.effects,reset:Arena.reset};
Object.assign(Arena,{
 pendingClaim:null,claimRound:0,claimCard:null,
 reset(){
  this.cancelClaim();state.arcade??={attempts:0,wins:0,bestKills:0};state.arcade.attempts++;
  this.run=TorCombat.create(Road.rng(state.seed+'|tor14|'+state.arcade.attempts),state.learned.length,Exploration,terrain);
  TorCombat.start(this.run,Exploration,terrain);state.player={...this.run.player};this.reported=false;persist();
 },
 cancelClaim(){this.pendingClaim=null;this.claimCard=null;this.claimRound=0;},
 menu(){
  if(!this.run)return;if(g.pause){g.pause=false;g.pauseReason=null;$('#pause').textContent='Ⅱ';}
  const r=this.run,live=['active','search'].includes(r.phase),resume=r.phase==='downed'?'tor-life':live?'close':'tor-retry';
  show(`<h2 id="panel-title">Thornwake · The scramble</h2><p><strong>Three lives · Two weapon slots · Three waves</strong></p><p>Arrive unarmed. The bell gives you only 6½ seconds to search the low plants. X / E examines a discovered cache; complete its Scripture recall to claim the gear. Reading and recall pause the fight. Two weapons fit your kit; a third must replace one.</p><p><strong>Controller:</strong> left stick / D-pad move · A strike · B dodge · X search / claim · Y switch · LB guard · RB weapon power / lantern burst · Start pause. Right stick aims; without it, close attacks assist your aim.</p><p><strong>Keyboard:</strong> WASD / arrows · K strike · Space dodge · E search · Q switch · L guard · R power · Escape pause. Mouse aims and holds strike.</p><p>Each new life spends one of this run’s three lives and starts unarmed. Battle health and lives are separate from your road hearts; discoveries and quest progress stay safe.</p><div class="field-slots">${r.inventory.map(k=>BattleArt.card(k)).join('')||'<p>Both slots empty. Find a cache in the plants.</p>'}</div><div class="actions"><button class="primary" data-action="${resume}">${r.phase==='downed'?'Spend a reserve life':live?'Resume the scramble':'A fresh three-life run'}</button><button data-action="tor-return">Return by boat</button></div>`,'tor-menu','THE BELL BELOW THE ROOTS');
 },
 interact(){
  const r=this.run;if(!r)return;if(!['search','active'].includes(r.phase)){this.menu();return;}
  TorCombat.reveal(r);const p=TorCombat.nearby(r);
  if(p){this.examine(p);return;}
  if(TorCombat.distance(r.player,{x:50,y:88})<4){this.menu();return;}
  toast('Search the low plants. A nearby cache glints when you reach it.');
 },
 examine(p){
  if(!cards.length){toast('Load a Scripture document before claiming a cache.');return;}
  this.pendingClaim=p.id;this.claimRound=0;
  if(p.cleared){this.claimGear();return;}
  const known=state.learned.map(byID).filter(Boolean),pool=known.length?known:cards;
  const seed=Road.rng(state.seed+'|cache|'+p.id+'|'+this.run.life);this.claimCard=pool[Math.floor(seed()*pool.length)].id;
  const c=byID(this.claimCard),unit=Road.units(c,'summary')[0];
  show(`<h2 id="panel-title">A cache beneath the leaves</h2>${BattleArt.card(p.kind)}<p>Read the passage, then complete ${['greatsword','heartwood','frostsickle'].includes(p.kind)?'two short recalls':'a short recall'} to open the cache. The island is paused while you read.</p><blockquote class="verse">${esc(unit.text)}<small>${esc(c.title)} · ${esc(c.translation)}</small></blockquote><div class="actions"><button class="primary" data-action="tor-recall">Recall and claim</button><button data-action="close">Leave the cache</button></div>`,'tor-cache','WORDS CARRIED INTO THE FIELD');
 },
 beginQuiz(){
  const p=this.run?.pickups.find(p=>p.id===this.pendingClaim),c=byID(this.claimCard);if(!p||!c)return;
  const unit=Road.units(c,'summary')[0],halves=Road.halves(unit.text),opening=this.claimRound===1,target=halves[opening?0:1],cue=halves[opening?1:0];
  const extras=cards.filter(v=>v.id!==c.id).map(v=>Road.plain(v.summary)),puzzle=Exploration.puzzle(target,state.settings.difficulty==='hard',extras);
  g.battle=null;g.practiceRun=null;g.exercise={id:c.id,scope:'summary',index:0,unit,opening,target,cue,parts:puzzle.parts,pool:puzzle.pool,selected:[],answer:'',done:false,helped:false,arenaClaimId:p.id};practiceView();
 },
 recalled(ex){
  if(!this.active()||!ex.arenaClaimId||ex.arenaClaimId!==this.pendingClaim)return false;
  const p=this.run.pickups.find(p=>p.id===this.pendingClaim);if(!p)return false;
  if(['greatsword','heartwood','frostsickle'].includes(p.kind)&&this.claimRound===0){this.claimRound=1;this.beginQuiz();return true;}
  TorCombat.unlockCache(this.run,p.id);this.claimGear();return true;
 },
 claimGear(slot=null){
  const r=this.run,p=r?.pickups.find(p=>p.id===this.pendingClaim);if(!p?.cleared)return;
  if(r.inventory.length===2&&!r.inventory.includes(p.kind)&&slot===null){
   show(`<h2 id="panel-title">Which weapon stays?</h2>${BattleArt.card(p.kind)}<p>The recall opened this cache. Your kit has two slots. Replace one weapon; the old one stays here in the leaves.</p><div class="field-slots">${r.inventory.map((k,i)=>`<button data-action="tor-slot" data-id="${i}" class="${i===0?'primary':''}">${BattleArt.card(k)}<span>Replace slot ${i+1}</span></button>`).join('')}</div><button data-action="close">Leave the new weapon here</button>`,'tor-slots','TWO HANDS, TWO WEAPONS');return;
  }
  const kind=TorCombat.pickup(r,p.id,slot);if(!kind)return;closePanel();toast(TorCombat.weapons[kind].name+' · equipped. Y / Q switches slots.');
 },
 continueLife(){const r=this.run;if(!r||!TorCombat.beginLife(r))return;this.cancelClaim();this.reported=false;state.player={...r.player};Opening.reset(state.region,state.player);closePanel();},
 update(dt,input){
  const r=this.run;if(!r)return;const before={...state.player};r.player={...state.player};
  if(this.mouseScreen){const z=Math.max(viewZoom(),1.5/(canvas.width/canvas.height)),sx=canvas.width*z/100,sy=canvas.width*z/150;this.mouseAim={x:g.camera.x+this.mouseScreen.x*canvas.width/sx,y:g.camera.y+this.mouseScreen.y*canvas.height/sy};}
  if(this.mouseAim){const dx=(this.mouseAim.x-r.player.x)*1.5,dy=this.mouseAim.y-r.player.y,n=Math.hypot(dx,dy)||1;input={...input,aimX:dx/n,aimY:dy/n};}
  TorCombat.step(r,dt,{...input,attack:input.attack||this.mouseAttack},Exploration,terrain);
  state.player={...r.player};g.clock+=dt;g.walking=Math.hypot(state.player.x-before.x,state.player.y-before.y)>.001;
  g.direction=Exploration.direction8(state.player.x-before.x,state.player.y-before.y,g.direction);
  if(!g.walking&&(input.attack||Math.abs(input.aimX||0)>.3||Math.abs(input.aimY||0)>.3))g.direction=Exploration.direction8(r.aim.x/1.5,r.aim.y,g.direction);
  Walker.advance(state.player.x-before.x,state.player.y-before.y,regionConfig().scale);Opening.update(state.region,before,state.player,dt,state.settings.motion);
  g.camera=Exploration.camera(state.player,viewZoom(),state.settings.camera,canvas.width/canvas.height);g.screen=Exploration.frame(state.player,viewZoom());
  const item=TorCombat.nearby(r),health=Math.max(0,Math.floor(r.health+1e-6));
  $('#view-name').textContent=regionConfig().name.toUpperCase();$('#interact').disabled=false;
  $('#nearby').textContent=item?'X / E · Search '+TorCombat.weapons[item.kind].name:r.phase==='search'?'THE BELL IN '+Math.ceil(r.searchTime)+' · Find a cache in the low plants':r.notice;
  $('#interact').dataset.touchLabel=item?'Search':'Boat / Search';
  $('#objective').textContent='Thornwake · '+(r.phase==='search'?'Search: '+Math.ceil(r.searchTime)+' seconds':'Wave '+r.wave+'/3')+' · life '+r.life+'/3 · '+r.lives+' reserve'+(r.lives===1?'':'s');
  $('#hearts').textContent='♥'.repeat(health)+'♡'.repeat(8-health);$('#hearts').setAttribute('aria-label',health+' of eight battle health; '+r.lives+' reserve lives');
  if(['downed','won','lost'].includes(r.phase)&&(!this.reported||!$('#panel').open)){
   this.reported=true;this.cancelClaim();state.arcade.bestKills=Math.max(state.arcade.bestKills,r.kills);
   if(r.phase==='won'&&!r.recorded){state.arcade.wins++;state.xp+=30;r.recorded=true;}persist();
   const down=r.phase==='downed';show(`<h2 id="panel-title">${down?'Back from the roots.':r.phase==='won'?'The bell falls silent.':'The ferryman pulls you clear.'}</h2><p>${down?'A reserve life can carry you back into this run. The wave remains; you return unarmed with a short search window.':r.phase==='won'?'The Root-Worm King sinks below the clearing. The troop scatters.':'All three lives spent. Your road discoveries and quest progress are safe.'}</p><p>${r.kills} attackers driven off · ${Math.floor(r.time)} seconds · ${r.lives} reserve lives.</p><div class="actions"><button class="primary" data-action="${down?'tor-life':'tor-retry'}">${down?'Spend a reserve life':'A fresh three-life run'}</button><button data-action="tor-return">Return to Reedbank</button></div>`,'tor-result','THORNWAKE TOR');
  }
 },
 entities(){return this.active()&&this.run?[...this.run.enemies.map(e=>({...e,combatKind:'enemy'})),...this.run.pickups.filter(p=>p.kind==='tonic'||p.revealed).map(p=>({...p,combatKind:'pickup',drawDepth:p.y+1}))]:[];},
 icon(kind,x,y,size=30,angle=0){
  if(kind!=='tonic'){BattleArt.weapon(kind,x,y,size,angle);return;}
  ctx.save();ctx.translate(x,y);ctx.fillStyle='#a2dfa0';ctx.fillRect(-size*.2,-size*.45,size*.4,size*.55);ctx.fillStyle='#e9c894';ctx.fillRect(-size*.1,-size*.55,size*.2,size*.12);ctx.restore();
 },
 drawEntity(p,x,y,h){
  if(p.combatKind==='pickup'){ctx.save();ctx.shadowColor='#f3deb1';ctx.shadowBlur=8;this.icon(p.kind,x,y-h*.05,h*.55,-.4);ctx.restore();return true;}
  const drawn=originalArena.drawEntity.call(this,p,x,y,h);
  if(p.slow>0){ctx.save();ctx.strokeStyle='#9cddec';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(x,y,h*.36,h*.12,0,0,Math.PI*2);ctx.stroke();ctx.restore();}
  return drawn;
 },
 held(x,y,h){
  if(!this.active()||!this.run?.weapon)return;const r=this.run,z=h/120,angle=Math.atan2(r.aim.y,r.aim.x)+Math.PI/2;
  const size=h*(r.weapon==='greatsword'?1.2:r.weapon==='axe'?.85:r.weapon==='spear'?.95:.65),arc=r.swing>0?(r.swing/.24-.5)*2:r.windup>0?-.7:0;
  this.icon(r.weapon,x+12*z,y-h*.38,size,angle+arc);
  if(r.windup>0){ctx.save();ctx.strokeStyle='#f9d38a';ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y-h*.4,h*.55,angle-.6,angle+.6);ctx.stroke();ctx.restore();}
  if(r.guard){ctx.save();ctx.strokeStyle='#a6e0e8';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(x+r.aim.x*25*z,y-h*.35+r.aim.y*15*z,18*z,25*z,angle,0,Math.PI*2);ctx.stroke();ctx.restore();}
 },
 effects(sx,sy){
  originalArena.effects.call(this,sx,sy);if(!this.active()||!this.run)return;const r=this.run;ctx.save();
  if(r.renew>0){ctx.strokeStyle='#b2e9a6';ctx.globalAlpha=.6;ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(r.player.x*sx,r.player.y*sy,1.1/1.5*sx,(.6+Math.sin(g.clock*4)*.15)*sy,0,0,Math.PI*2);ctx.stroke();}
  for(const e of r.effects)if(e.kind==='frost'){ctx.globalAlpha=e.life;ctx.strokeStyle='#a7e7ff';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(e.x*sx,e.y*sy,(1-e.life)*10/1.5*sx,(1-e.life)*10*sy,0,0,Math.PI*2);ctx.stroke();}
  ctx.restore();
 },
 hud(){
  if(!this.active()||!this.run)return;const r=this.run,w=TorCombat.weapons[r.weapon],width=Math.min(420,canvas.width-28),scale=Math.min(1,width/350);ctx.save();ctx.translate(14,48);ctx.scale(scale,scale);ctx.fillStyle='#10251eeb';ctx.fillRect(0,0,350,108);
  ctx.fillStyle='#fff0cb';ctx.font='bold 14px system-ui';ctx.fillText(w?w.name:'UNARMED · SEARCH THE PLANTS',10,20,328);
  for(let i=0;i<2;i++){const x=10+i*166;ctx.fillStyle=r.inventory[i]===r.weapon?'#466044':'#263b31';ctx.fillRect(x,30,156,35);if(r.inventory[i]){this.icon(r.inventory[i],x+14,53,28,0);ctx.font='11px system-ui';ctx.fillStyle='#fff0cb';ctx.fillText((i+1)+'. '+TorCombat.weapons[r.inventory[i]].name,x+29,51,119);}else{ctx.font='11px system-ui';ctx.fillStyle='#d4cfb6';ctx.fillText((i+1)+'. Empty slot',x+10,51);}}
  ctx.fillStyle='#40534c';ctx.fillRect(10,75,155,7);ctx.fillRect(177,75,155,7);ctx.fillStyle='#b9e3c2';ctx.fillRect(10,75,155*r.stamina/100,7);ctx.fillStyle='#f1cc79';ctx.fillRect(177,75,155*r.focus/100,7);ctx.font='10px system-ui';ctx.fillStyle='#e1e9d6';ctx.fillText('STAMINA',10,98);
  const cd=r.powerCooldown[r.weapon]||0;ctx.fillText(w?.power?(cd>0?'POWER · '+Math.ceil(cd)+'s':'RB / R · '+(w.power==='renew'?'MEND':'FROST')):'RB / R · BURST '+Math.floor(r.focus)+'/60',177,98);ctx.restore();
  if(r.phase==='search'){ctx.save();ctx.textAlign='center';ctx.font='bold 25px Georgia';ctx.fillStyle='#fff1c9';ctx.shadowColor='#1a251c';ctx.shadowBlur=8;ctx.fillText('THE BELL IN '+Math.ceil(r.searchTime),canvas.width/2,canvas.height*.29);ctx.restore();}
  const boss=r.enemies.find(e=>e.boss);if(boss){const bw=Math.min(340,canvas.width-40),x=(canvas.width-bw)/2,y=canvas.height-92;ctx.save();ctx.fillStyle='#18251de8';ctx.fillRect(x-8,y-25,bw+16,42);ctx.font='bold 15px Georgia';ctx.fillStyle='#ffe3a8';ctx.fillText(boss.kind==='rootking'?'THE ROOT-WORM KING':'THE BRAMBLE CAPTAIN',x,y-8);ctx.fillStyle='#513e30';ctx.fillRect(x,y,bw,8);ctx.fillStyle='#eab878';ctx.fillRect(x,y,bw*boss.health/boss.maxHealth,8);ctx.restore();}
 }
});
const priorHandle=Adventure.handle;
Adventure.handle=function(action,id){
 if(action==='tor-recall'){Arena.beginQuiz();return true;}
 if(action==='tor-slot'){Arena.claimGear(Number(id));return true;}
 if(action==='tor-life'){Arena.continueLife();return true;}
 if(action==='difficulty'&&Arena.pendingClaim){state.settings.difficulty=state.settings.difficulty==='hard'?'easy':'hard';Arena.beginQuiz();return true;}
 if(action==='tor-pulse'&&Arena.active()){if(!TorCombat.pulse(Arena.run)){const w=TorCombat.weapons[Arena.run.weapon];toast(!w?'Find and claim a weapon first.':w.power?'Power needs 25 stamina, missing health for mending, and a ready cooldown.':'Build 60 focus by clearing attackers.');}return true;}
 return priorHandle.call(this,action,id);
};
const priorRecalled=Adventure.recalled;
Adventure.recalled=function(ex){return Arena.recalled(ex)||priorRecalled.call(this,ex);};
const priorLeafVisit=Leaf.visit;
Leaf.visit=function(id){if(id==='road-races-sign'){Adventure.raceSign();return true;}return priorLeafVisit.call(this,id);};
const oldSign=Leaf.drawEntity;
Leaf.drawEntity=function(p,x,y,h){const sign=p.entry&&this.sign(p.entry.id);return sign?BattleArt.sign(sign,x,y,h):oldSign.call(this,p,x,y,h);};
Adventure.ferry=function(){show(`<h2 id="panel-title">The bell at Thornwake</h2><p>“Empty hands,” says the ferryman. “That's how everyone lands. The Carvers left gear in the low plants. Find a cache, carry its passage, and claim what you can before the troop reaches you.”</p><p><strong>Solo battle royale · Three lives · Two weapon slots</strong><br>A 6½-second search window, Scripture recall to claim each weapon, a Bramble Captain and the Root-Worm King. Reading pauses the fight. Road progress stays safe.</p><button class="primary" data-action="tor-sail">Fast boat to the battle</button><button data-action="close">Stay on the road</button>`,'tor-ferry','THE SCRAMBLE');};
