'use strict';
// Beta19: contextual help without adding quest gates or changing card wording.
const Beta19={
 loadImages(){
  const scene=OPENING_WORLD.regions[state.region],list=[art,atlas,walkingImages.get(state.settings.avatar),standingOverrides[state.settings.avatar]||standingImage];
  if(scene)list.push(...[scene.ground,scene.floorUnderlay,...scene.parts.map(p=>p.asset)].filter(Boolean).map(src=>Opening.images.get(src)));
  else{const scenery=sceneryImages.get(state.region);if(scenery)list.push(scenery.ground,...scenery.objects.values());}
  return [...new Set(list.filter(Boolean))];
 },
 loadState(){const images=this.loadImages(),loaded=images.filter(im=>im.complete&&im.naturalWidth>0).length,failed=images.some(im=>im.complete&&!im.naturalWidth);return loaded===images.length?null:{percent:Math.floor(loaded/Math.max(1,images.length)*100),failed};},
 requirements(entry){
  const labels={
   'bridge-open':'Open the root-locked crossing with the bridge squirrel',
   'ghouls-won':'Drive off the Man-Ghouls on the northern road',
   'warden-won':'Defeat the guardian at Greenwood’s watch-ring',
   'quest-complete':'Follow Greenwood’s northeast road into Silvermere',
   'outer-road-open':'Repair Lilyfall’s broken trail marker',
   'highroad-charter':'Inspect Whiteledge’s back archive, then collect Sereth’s corrected record at the outside bell',
   'highroad-pin-delivered':'Give Lethir the brass pin beside Carverbough’s north guildhouse or eastern workbench'
  },steps=(entry.requires||[]).filter(f=>!state.flags.includes(f)).map(flag=>{
   if(labels[flag])return labels[flag];const source=events.find(e=>(e.grants||[]).includes(flag));return source?'Complete “'+(source.display_name||source.title.split(' · ').slice(1).join(' · ')||'the nearby errand')+'” first':'Finish the earlier local errand first';
  }),missing=Math.max(0,(entry.min_cards||0)-state.learned.length);
  if(missing)steps.push('Find and keep '+missing+' more way-card'+(missing===1?'':'s')+' ('+state.learned.length+'/'+entry.min_cards+' kept)');
  return steps.length?steps.join('. ')+'.':'This place is ready.';
 },
 objective(){
  const id=state.region,q=Treasure17.q(),t=Quest16.q().treasure;
  if(id==='riverbank'&&!Life.rest)return Opening.room?(state.learned.length?'Nessa knows the four roads. Leave through the south doorway when you’re ready.':'Speak to Nessa or keep the Book’s way-card. Leave through the south doorway.'):(state.learned.length?'':'Up the steps: Nessa and the Book’s way-card · ')+'Western dock: battle · middle dock: treasure · bank path north: Woodland and the elves';
  if(id==='tideglass')return 'Three treasure trails · north: archive · east: Brass Gully → Freed Quay · west: orchard → garden · ferry south';
  if(id==='tideglass-archive')return t.loot?(state.flags.includes('q16-keepsake-returned')?'Archive complete · keepsake returned · south to Tideglass and the ferry':'Salvage found · carry the sealed keepsake south to Rill at Tideglass'):'Corrected date → tide-wheel → unlocked chart-box north of the arch';
  if(id==='brass-gully')return q.bond.treasure?(state.items.includes('q16-bronze-bell')?'Quay and bell treasures found · west to Tideglass':'Quay treasure found · optional bell lift here · west to Tideglass'):q.bond.receipt?'The Cancelled Bond · north to Freed Quay · bell lift is a separate find':'Speak to Erelis by the bell lift · north: Freed Quay · west: Tideglass';
  if(id==='drowned-orchard')return q.garden.treasure?(state.items.includes('q16-seed-tin')?'Garden and orchard treasures found · east to Tideglass':'Garden treasure found · optional seed-tin here · east to Tideglass'):'Read Neris’s leaf by the path · north: Lantern Garden · east: Tideglass';
  if(id==='freed-quay'&&q.bond.treasure)return 'The Cancelled Bond complete · medallion carried · south to Brass Gully, then west to the ferry';
  if(id==='lantern-garden'&&q.garden.treasure)return 'The Garden Key complete · lantern carried · south to the orchard, then east to the ferry';
  return null;
 },
 itemGuide(id){
  if(['brass-beacon-pin','dated-road-record','beacon-freight-rubbing'].includes(id)){Journey.guide();return;}
  if(id.startsWith('q17-')){Treasure17.journal();return;}
  if(id.startsWith('q16-')&&id!=='q16-pattern-stone'){Guides18.map();return;}
  if(id==='q16-pattern-stone'){Guides18.panel('The new light-stone','<p>The patterned stone is safely in your way-sack. You have completed the first desert-and-forge chapter of this beta. At the forge, the return caravan carries you to Woodland Road. Elsewhere, follow the connected roads back to Reedbank to explore the other routes.</p><p>The later confrontation and the lamp’s final destination belong to a future chapter; there is no missing hand-in to search for in this edition.</p>',Guides18.button('pack','Back to my objects'));return;}
  show(`<h2 id="panel-title">The road from here</h2>${journeyGuide()}<div class="actions"><button data-action="map">Places in this region</button><button data-action="pack">Back to my objects</button><button data-action="close">${esc(returnPlaceLabel())}</button></div>`,'object-directions','YOUR OBJECT · YOUR JOURNEY');
 },
 placeAdvice(){
  if(['tideglass','tideglass-archive','brass-gully','drowned-orchard','freed-quay','lantern-garden'].includes(state.region))return '<p class="hint"><strong>Your treasure route:</strong> '+esc(this.objective()||Treasure17.objective())+'</p><button data-action="g18-map">Three-trail overview map</button><button data-action="q17-journal">Lesson trail next steps</button>';
  if(Quest16.desert())return '<p class="hint"><strong>Across Glasswind:</strong> each arrival records an entry edge. Reach its opposite edge to add a new survey reading. Rest at a survey refuge for supplies or a return caravan. Six distinct readings reveal the forge. The repeating borders are intentional; keep moving when the sand begins to stir.</p>';
  if(state.region==='great-forge')return '<p class="hint"><strong>Against the current:</strong> Interact at the ledge for the next passage. Reading waits for you; the timer starts only after Ready. A miss slips one float downstream. The ledge menu offers untimed practice and a return caravan.</p>';
  return null;
 },
 draw(p,x,y,h){
  if(p.entry?.id!=='q16-sluice')return false;
  // A low bronze hand-wheel, using the established canvas wheel-mark system.
  ctx.save();ctx.translate(x,y-h*.1);ctx.fillStyle='#6e8178';ctx.beginPath();ctx.ellipse(0,h*.09,h*.25,h*.1,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#bb9b58';ctx.lineWidth=Math.max(2,h*.025);ctx.beginPath();ctx.ellipse(0,-h*.08,h*.2,h*.12,0,0,Math.PI*2);ctx.stroke();for(let n=0;n<6;n++){const a=n*Math.PI/3;ctx.beginPath();ctx.moveTo(0,-h*.08);ctx.lineTo(Math.cos(a)*h*.2,-h*.08+Math.sin(a)*h*.12);ctx.stroke();}ctx.fillStyle=Quest16.q().treasure.sluice?'#c9e4b8':'#f1ce7c';ctx.beginPath();ctx.arc(0,-h*.08,h*.035,0,Math.PI*2);ctx.fill();ctx.restore();return true;
 },
 boot(){
  const updateBefore=update;update=(dt,input)=>{if(this.loadState()){clearInput();return;}updateBefore(dt,input);};
  const timer=Quest16.timer;Quest16.timer=dt=>{if(!this.loadState())timer.call(Quest16,dt);};
  const interactBefore=interact;interact=()=>{if(this.loadState()){toast('The road is still loading. Your progress is safe.');return;}interactBefore();};
  const objective=openingObjective;openingObjective=()=>this.objective()||objective();
  const drawBefore=draw;draw=()=>{drawBefore();if(!Opening.enabled(state.region))drawTravelOverlay();};
  const entityDraw=Adventure.drawEntity;Adventure.drawEntity=(...args)=>this.draw(...args)||entityDraw.call(Adventure,...args);
  const handle=Adventure.handle;Adventure.handle=(a,id)=>{if(a==='item-directions'){this.itemGuide(id);return true;}return handle.call(Adventure,a,id);};
 }
};
