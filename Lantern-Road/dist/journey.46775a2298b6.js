'use strict';
const Journey={
 tracked:null,
 objects:{
  'brass-beacon-pin':{name:'Brass beacon pin',kind:'Repair part',text:'The missing acorn-stamped pin. Give it to Lethir outside the north guildhouse, or at the eastern beacon workbench.'},
  'dated-road-record':{name:'Corrected road record',kind:'Document',text:'Sereth’s dated copy from Whiteledge. Bring it to Lethir’s beacon workbench, then carry it onward to Greenwood.'},
  'beacon-freight-rubbing':{name:'Seven-pointed freight mark',kind:'Clue',text:'A rubbing from the repaired beacon: a war camel beneath a seven-pointed brand. The keeper of Greenwood’s watch-ring should see it.'},
  'pop-blaster':{name:'Root-crossing tool',kind:'Road equipment',text:'Recovered while opening Greenwood’s root-locked crossing.'},
  'lantern-shard':{name:'Lantern shard',kind:'Quest object',text:'A piece of the watch-lantern, recovered on the Greenwood road.'},
  'watch-key':{name:'Watch-ring key',kind:'Key',text:'The key recovered at the old watch-ring.'},
  'mountain-map':{name:'Mountain chart',kind:'Map',text:'A chart of the high roads and mountain passes.'},
  'camel-chart':{name:'War-camel sketch',kind:'Clue',text:'A drawing of the enormous caravan animals beyond the woodland roads.'}
 },
 reconcile(s=state){
  if(s.flags.includes('carver-beacon-repaired')&&!s.flags.includes('highroad-pin-delivered'))s.flags.push('highroad-pin-delivered');
  if(s.flags.includes('highroad-pin-delivered'))s.items=s.items.filter(i=>i!=='brass-beacon-pin');
  else if(s.flags.includes('highroad-pin-found')&&!s.items.includes('brass-beacon-pin'))s.items.push('brass-beacon-pin');
 },
 object(id){const e=events.find(e=>e.item===id);return this.objects[id]||{name:e?.item_title||id.split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join(' '),kind:'Object',text:'An object carried from the road.'};},
 activeQuest(){return /^carver/.test(state.region)||state.flags.some(f=>['highroad-charter','highroad-pin-found','highroad-pin-delivered'].includes(f));},
 task(){
  const has=f=>state.flags.includes(f);
  if(has('carver-beacon-repaired'))return{title:'The beacon answers',text:'Carry the freight-mark rubbing north to Greenwood’s watch-ring. The pin is fitted in the beacon.',region:'greenwood',point:[81,19]};
  if(has('highroad-pin-found')&&!has('highroad-pin-delivered'))return{title:'Give Lethir the brass pin',text:'Lethir is outside the north guildhouse in Carverbough. You can also deliver the pin at the beacon workbench east of the main road, near the spring.',region:'carverbough',point:[29,48.8]};
  if(has('highroad-pin-delivered')&&has('highroad-charter'))return{title:'Help raise the beacon',text:'Go to the beacon workbench east of Carverbough’s main road, near the spring. Read a discovered passage, then help Lethir secure the cradle.',region:'carverbough',point:[66,64]};
  if(has('highroad-pin-delivered'))return{title:'Bring the corrected record',text:'The pin is delivered. Return south to Sereth in Whiteledge: inspect the back archive, then lower the corrected copy at the outside bell.',region:'whiteledge',point:[74,38]};
  return{title:'Find the brass pin',text:'Search beside the bottom stair of Carverbough’s south carving-house, outside on the ground. Pip dropped it there.',region:'carverbough',point:[25.5,86.8]};
 },
 objective(){
  if(!/^carver/.test(state.region))return null;this.reconcile();const task=this.task();return task.title+' · '+(state.region==='carverbough'?task.text:'Exit through the south door to reach the village. Your way-pack keeps the directions.');
 },
 nearRecipient(){
  if(state.region!=='carverbough'||state.locationLayer)return false;
  const a=g.actors.get('carverbough|carver-lethir'),p=a||{x:29,y:48.8};return TorCombat.distance(state.player,p)<5||TorCombat.distance(state.player,{x:66,y:64})<5;
 },
 canGive(){return state.items.includes('brass-beacon-pin')&&!state.flags.includes('highroad-pin-delivered')&&this.nearRecipient();},
 itemPocket(){
  this.reconcile();const task=this.task();return `<details class="object-pocket"><summary>Objects & errands · ${state.items.length} carried</summary>${state.items.length?'<div class="object-list">'+state.items.map(id=>{const item=this.object(id);return `<button data-action="journey-item" data-id="${esc(id)}"><small>${esc(item.kind)}</small><strong>${esc(item.name)}</strong></button>`;}).join('')+'</div>':'<p>No objects carried yet. Recovered keys, documents and repair parts appear here.</p>'}${this.activeQuest()?`<div class="errand"><small>CURRENT ERRAND</small><strong>${esc(task.title)}</strong><p>${esc(task.text)}</p><button data-action="journey-guide">Show the next step</button>${this.canGive()?'<button class="primary" data-action="journey-give-pin">Give Lethir the pin</button>':''}</div>`:''}</details>`;
 },
 item(id){
  this.reconcile();const item=this.object(id),carried=state.items.includes(id);show(`<span class="eyebrow">${esc(item.kind)}</span><h2 id="panel-title">${esc(item.name)}</h2><p>${esc(carried?item.text:id==='brass-beacon-pin'?'The pin has been delivered to Lethir for the beacon.':item.text)}</p><div class="actions">${id==='brass-beacon-pin'&&this.canGive()?'<button class="primary" data-action="journey-give-pin">Give Lethir the pin</button>':''}<button data-action="journey-guide">Where next?</button><button data-action="pack">Back to way-pack</button><button data-action="close">Return to the road</button></div>`,'journey-item','OBJECTS IN YOUR WAY-PACK');
 },
 guide(){
  this.reconcile();this.tracked=this.task();const t=this.tracked;show(`<h2 id="panel-title">${esc(t.title)}</h2><p>${esc(t.text)}</p><p class="hint">${t.region===state.region?'A small trail marker now shows the destination in this scene.':'Follow the connected roads to '+esc(REGIONS[t.region].name)+'. Your destination will be marked when you arrive.'}</p><div class="actions">${this.canGive()?'<button class="primary" data-action="journey-give-pin">Give Lethir the pin</button>':''}<button class="primary" data-action="close">Follow the trail</button><button data-action="pack">Open the way-pack</button></div>`,'journey-guide','THE CARVER BEACON');
 },
 givePin(){
  this.reconcile();if(!this.canGive()){toast('Bring the pin to Lethir outside the north guildhouse, or to the eastern beacon workbench.');return;}
  state.items=state.items.filter(i=>i!=='brass-beacon-pin');state.flags.push('highroad-pin-delivered');persist();hud();this.tracked=this.task();
  show(`<h2 id="panel-title">The pin is in Lethir’s keeping</h2><p>He tests its shoulder with his thumb, then fits it into a leather loop on the cradle.</p><p>“A good pin. Pip may yet be allowed near small things again.” The bell rope stirs above the spring. “Meet me at the beacon workbench, east of the main road. ${state.flags.includes('highroad-charter')?'Bring that corrected record. We can raise the light now.':'We still need Sereth’s corrected road record from Whiteledge.'}”</p><div class="actions"><button class="primary" data-action="journey-guide">Show the next step</button><button data-action="close">Continue exploring</button></div>`,'journey-delivered','BRASS PIN DELIVERED');
 },
 bench(){
  this.reconcile();if(state.flags.includes('carver-beacon-repaired'))return false;
  if(state.flags.includes('highroad-pin-delivered')&&state.flags.includes('highroad-charter')&&state.learned.length)return false;
  show(`<h2 id="panel-title">Lethir’s beacon workbench</h2><p>The cradle rests on its trestle beside the spring. The keeper has left a place for each part.</p><ul class="errand-checks"><li>${state.flags.includes('highroad-pin-delivered')?'✓ Pin delivered':state.items.includes('brass-beacon-pin')?'Brass pin: in your way-pack, ready to give':'Brass pin: beside the south carving-house’s bottom stair'}</li><li>${state.flags.includes('highroad-charter')?'✓ Corrected road record carried':'Corrected record: inspect Whiteledge’s back archive, then use the outside bell'}</li><li>${state.learned.length?'✓ A discovered passage ready for recall':'Discover and keep at least one way-card'}</li></ul><div class="actions">${this.canGive()?'<button class="primary" data-action="journey-give-pin">Give Lethir the brass pin</button>':''}<button data-action="journey-guide">Show the next step</button><button data-action="close">Return to the road</button></div>`,'journey-bench','THE CARVER BEACON');return true;
 },
 npc(e){
  const name=e.display_name||e.title.split(' · ')[1]||e.title;const render=t=>story(t||'',null,e).split(/\n\s*\n/).filter(Boolean).map(p=>'<p>'+p.replace(/\n/g,'<br>')+'</p>').join('');
  const short=e.sections.short||shortDialogue(e),parts=[e.description,e.sections.success||''];const full=[...new Set(parts.filter(Boolean))].join('\n\n');const expandable=Road.normalize(short)!==Road.normalize(full)&&full.length>short.length+35;
  const content=state.settings.dialogue==='short'?short:full;
  if(e.optional_drama&&!state.counts[e.id]){state.counts[e.id]=1;for(const f of e.grants||[])if(!state.flags.includes(f))state.flags.push(f);persist();}
  show(`<h2 id="panel-title">${esc(name)}</h2>${e.role?`<p class="npc-role">${esc(e.role)}</p>`:''}${enemyHTML(e)}${/^carver-/.test(e.id)?`<div class="errand"><strong>${esc(this.task().title)}</strong><p>${esc(this.task().text)}</p></div>`:''}${render(content)}${eventScripture(e)}<div class="actions">${e.id==='carver-lethir'&&this.canGive()?'<button class="primary" data-action="journey-give-pin">Give Lethir the brass pin</button>':''}${expandable?`<button data-action="dialogue-length" data-id="${e.id}">${state.settings.dialogue==='short'?'Know more':'Less text'}</button>`:''}${/^carver-/.test(e.id)?'<button data-action="journey-guide">Show the next step</button>':''}<button class="primary" data-action="close">Continue exploring</button></div>`,'npc','A FELLOW TRAVELER');
 },
 visit(id){
  if(id==='carver-counterweight')return this.bench();
  if(id==='carver-pin'&&state.flags.includes('highroad-pin-found')){this.item('brass-beacon-pin');return true;}
  const e=eventID(id);if(e?.kind==='npc'&&Road.ready(e,state)){this.npc(e);return true;}return false;
 },
 footing(){
  closePanel();const scene=OPENING_WORLD.regions[state.region];if(!scene||Arena.active()){toast('Use the boat menu to leave Thornwake.');return;}
  const candidates=(scene.protectedRoutes||[]).flatMap(r=>r.points).concat([scene.spawn]).map(([x,y])=>({x,y})).filter(p=>Exploration.free(p,scene.terrain,true));
  candidates.sort((a,b)=>TorCombat.distance(a,state.player)-TorCombat.distance(b,state.player));const p=candidates[0];if(!p)return;
  state.locationLayer=null;state.player={...p};Opening.reset(state.region,state.player);g.camera=Exploration.camera(state.player,viewZoom(),state.settings.camera,canvas.width/canvas.height);g.regionCooldown=3;Walker.reset();persist();toast('Back on clear footing. Your objects and progress are unchanged.');
 },
 entities(){const t=this.tracked?this.task():null;this.tracked=t;if(!t||t.region!==state.region||state.locationLayer)return[];return[{x:t.point[0],y:t.point[1],journeyKind:'trail',drawDepth:t.point[1]+.05}];},
 draw(p,x,y,h){if(p.journeyKind!=='trail')return false;ctx.save();ctx.strokeStyle='#f4d891';ctx.lineWidth=2;ctx.globalAlpha=.85;ctx.beginPath();ctx.ellipse(x,y,h*.38,h*.12,0,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(x,y-h*.3);ctx.lineTo(x-h*.09,y-h*.45);ctx.lineTo(x+h*.09,y-h*.45);ctx.closePath();ctx.fillStyle='#f4d891';ctx.fill();ctx.restore();return true;}
};
const priorJourneyVisit=Leaf.visit;Leaf.visit=function(id){return Journey.visit(id)||priorJourneyVisit.call(this,id);};
const priorJourneyHandle=Adventure.handle;Adventure.handle=function(action,id){
 if(action==='journey-item'){Journey.item(id);return true;}if(action==='journey-guide'){Journey.guide();return true;}if(action==='journey-give-pin'){Journey.givePin();return true;}if(action==='find-footing'){Journey.footing();return true;}return priorJourneyHandle.call(this,action,id);
};
const priorJourneyEntities=Adventure.entities;Adventure.entities=function(){return[...priorJourneyEntities.call(this),...Journey.entities()];};
const priorJourneyDraw=Adventure.drawEntity;Adventure.drawEntity=function(p,x,y,h){return Journey.draw(p,x,y,h)||priorJourneyDraw.call(this,p,x,y,h);};
const priorJourneyRestore=Road.restore.bind(Road);Road.restore=function(...args){const s=priorJourneyRestore(...args);Journey.reconcile(s);return s;};
