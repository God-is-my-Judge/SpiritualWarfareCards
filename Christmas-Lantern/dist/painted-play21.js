'use strict';
// Play stays on its painting. State is compatible with the previous local edition.
const LEGACY_LIGHTS21={pond:'pond-middle-bank',bridge:'bridge-left',pines:'pine-stream-lantern',garden:'cottage-step-lantern',homeward:'garden-gate-lantern',shelf:'mountain-path-lantern'};
const PROP_CROPS21={table:['bell-table-kit-21.png',[24,60,1490,516],[768,550]],dog:['hearth-dog-21.png',[90,44,1392,914],[785,916]],bench:['snow-bench-21.png',[102,86,1282,869],[745,904]],kitchen:['kitchen-table-kit-21.png',[13,60,979,911],[502,938]],mug:['kitchen-table-kit-21.png',[1084,293,407,376],[1263,650]],grandfather:['grandfather.png',[234,2,527,1534],[482,1506]],grandmother:['grandmother.png',[157,0,676,1536],[499,1513]]};
const BELL_CROPS21=[[30,612,206,361],[248,631,189,341],[453,649,175,322],[652,662,162,308],[839,679,153,289],[1022,691,144,278],[1198,703,136,266],[1367,717,125,251]];
const BELL_BASES21=[[134,958],[342,958],[541,957],[735,957],[916,955],[1095,955],[1266,955],[1430,954]];
const BELL_PIVOTS21=[[133,638],[341,654],[538,671],[731,683],[912,700],[1091,713],[1264,727],[1427,741]];
LAMPS20.splice(0,LAMPS20.length,...PAINTING_ANCHORS21.lights.map(function light(l){return {...l,x:l.stand[0],y:l.stand[1]};/* Code by Daniel using ChatGPT November 13, 2026 */}));
// Source paintings remain unchanged; these are uniform render/reference sizes.
const SCENE_SCALE24={grandfatherWidth:108,nutcrackerHeight:80,elfRooms:{grandmother:1.12,kitchen:1.12}};
function elfVisualScale24(point=state.player,room=state.room){
 return depthScale(point,room)*(SCENE_SCALE24.elfRooms[room]||1);
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function benchGeometry24(b,room=state.room){
 const [,rect,anchor]=PROP_CROPS21.bench,width=(b.width24||165)*depthScale(b,room),scale=width/rect[2];
 function project(x,y){return {x:b.x+(x-anchor[0])*scale/15.36,y:b.y+(y-anchor[1])*scale/10.24};/* Code by Daniel using ChatGPT November 14, 2026 */}
 const topLeft=project(rect[0],rect[1]),bottomRight=project(rect[0]+rect[2],rect[1]+rect[3]),seat=project(745,600),bird=project(1280,230),stand={x:b.x,y:b.y+5};
 const polygon=[[300,780],[1290,810],[1150,940],[170,900]].map(function foot(p){const v=project(p[0],p[1]);return [v.x,v.y];/* Code by Daniel using ChatGPT November 14, 2026 */});
 return {width,seat,bird,stand,hit:[topLeft.x,topLeft.y,bottomRight.x-topLeft.x,bottomRight.y-topLeft.y],obstacle:{polygon},company:{x:b.x+width/15.36/2+4,y:b.y}};
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function bounded21(value,low,high){
 return Math.max(low,Math.min(high,value));
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
async function loadPaintedArt21(){
 const names=[...new Set(Object.values(PROP_CROPS21).map(function file(p){return p[0];/* Code by Daniel using ChatGPT November 13, 2026 */}))],images={};
 await Promise.all(names.map(function load(name){return new Promise(function imagePromise(resolve,reject){const im=new Image();im.onload=function ready(){images[name]=im;resolve();/* Code by Daniel using ChatGPT November 13, 2026 */};im.onerror=reject;im.src='assets/painted-21/'+name;/* Code by Daniel using ChatGPT November 13, 2026 */});/* Code by Daniel using ChatGPT November 13, 2026 */}));
 g.paintedFrames21={};for(const [id,[name,rect,anchor]]of Object.entries(PROP_CROPS21))g.paintedFrames21[id]=sourceFrame21(images[name],rect,anchor);
 g.paintedFrames21.bells=BELL_CROPS21.map(function bell(rect,i){return sourceFrame21(images['bell-table-kit-21.png'],rect,BELL_BASES21[i]);/* Code by Daniel using ChatGPT November 13, 2026 */});
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function sourceFrame21(image,rect,anchor){
 const [sx,sy,w,h]=rect,c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(image,sx,sy,w,h,0,0,w,h);return {canvas:c,w,h,anchorX:anchor[0]-sx,anchorY:anchor[1]-sy,sourceRect:rect};
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function paintFrame21(frame,x,y,width,mirror=false,angle=0){
 if(!frame)return;const scale=width/frame.w;ctx.save();ctx.translate(x,y);if(mirror)ctx.scale(-1,1);if(angle)ctx.rotate(angle);ctx.drawImage(frame.canvas,-frame.anchorX*scale,-frame.anchorY*scale,frame.w*scale,frame.h*scale);ctx.restore();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function installPaintingPlay21(){
 const q=g.wonder20,w=wonderState20();q.play21={mode:null,camera:null,parcel:null,hold:null,projectiles:[],speech:null,bellOrder:[],friendTip:0,devices:{primary:null,secondary:null,keyboardSeen:false,friendKeys:new Set()}};
 for(const [old,id]of Object.entries(LEGACY_LIGHTS21))if(w.lights[old])w.lights[id]=true;
 if(!w.ornamentRecords21||typeof w.ornamentRecords21!=='object')w.ornamentRecords21={};
 for(const id of Object.keys(w.ornaments))rememberOrnament21(id,cards.find(function same(c){return c.id===id;/* Code by Daniel using ChatGPT November 13, 2026 */}));
 if(!['rink','snowgarden','grandmother','cave','workshop'].includes(w.rimePlace21))w.rimePlace21=w.kindness.invited?'grandmother':w.kindness.boundary||w.kindness.knocked?'snowgarden':'rink';
 const obsolete=[[[65,62],[75,62],[75,65],[65,65]],[[57,77],[63,77],[63,80],[57,80]],[[44,47],[54,47],[54,50],[44,50]]].map(function key(p){return JSON.stringify(p);/* Code by Daniel using ChatGPT November 13, 2026 */});
 for(const r of Object.values(ROOMS))r.blocked=(r.blocked||[]).filter(function keep(s){return !obsolete.includes(JSON.stringify(s.polygon));/* Code by Daniel using ChatGPT November 13, 2026 */});
 for(const [shelf,key]of [['home','homeBookshelf'],['grandmother','grandmotherBookshelf']]){const a=PAINTING_ANCHORS21.objects[key],spec=SHELVES20[shelf],spot=ROOMS[spec.room].spots.find(function same(s){return s.id==='bookshelf20-'+shelf;/* Code by Daniel using ChatGPT November 13, 2026 */});Object.assign(spec,{x:a.stand[0],y:a.stand[1]});Object.assign(spot,{x:spec.x,y:spec.y,hit:a.rect});}
 const seat=PAINTING_ANCHORS21.objects.grandmotherArmchair;Object.assign(SEATS20.grandmother,{x:seat.stand[0],y:seat.stand[1],visual21:[seat.seat[0],seat.seat[1]+18/10.24],stand21:seat.stand});Object.assign(ROOMS.grandmother.spots.find(function same(s){return s.id==='seat20-grandmother';/* Code by Daniel using ChatGPT November 13, 2026 */}),{x:seat.stand[0],y:seat.stand[1],hit:seat.rect});
 const grandma=ROOMS.grandmother.objects.find(function same(o){return o.npc===1;/* Code by Daniel using ChatGPT November 13, 2026 */});Object.assign(grandma,{x:56,y:55});
 const tree=PAINTING_ANCHORS21.objects.tree;Object.assign(ROOMS.gifts.spots.find(function same(s){return s.id==='decorate-tree20';/* Code by Daniel using ChatGPT November 13, 2026 */}),{x:tree.stand[0],y:tree.stand[1],hit:tree.hitRect});
 const nut=ROOMS.closet.objects.find(function figure(o){return o.prop===2;/* Code by Daniel using ChatGPT November 13, 2026 */});if(nut){nut.nutcracker21=true;nut.h=SCENE_SCALE24.nutcrackerHeight/10.24;}
 const toy=ROOMS.closet.spots.find(function nutSpot(t){return t.id==='bedroom-toy';/* Code by Daniel using ChatGPT November 14, 2026 */});Object.assign(toy,{mark:[58,70],hit:[55.8,69.8,4.4,9]});
 save();
 /* Code by Daniel using ChatGPT November 20, 2026 */
}
function setupPaintingControls21(){
 $('#viewport').insertAdjacentHTML('beforeend','<button id="world-play21" class="world-play21" title="Play · Q">Play <kbd>Q</kbd></button><aside id="room-play21" class="room-play21" hidden><div id="room-play-tray21"></div><button id="room-play-done21">Finish</button></aside>');
 $('#viewport').insertAdjacentElement('afterend',$('#room-play21'));
 $('#world-play21').onclick=contextPlay21;$('#room-play-done21').onclick=endRoomPlay21;
 canvas.addEventListener('pointerdown',roomPointer21,true);
 canvas.addEventListener('pointermove',moveRoomPointer21,true);
 for(const type of ['pointerup','pointercancel'])canvas.addEventListener(type,function release(){const m=g.wonder20.play21.mode;if(m){m.drag=null;m.lastAngle=null;}/* Code by Daniel using ChatGPT November 13, 2026 */},true);
 window.addEventListener('keyup',releaseWorldKey21,true);
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function rememberOrnament21(id,card,picture=null){
 const w=wonderState20();w.ornaments[id]=true;if(!w.ornamentRecords21)w.ornamentRecords21={};
 const old=w.ornamentRecords21[id]||{};w.ornamentRecords21[id]={...old,id,cardId:card?.id||old.cardId||null,fingerprint:card?.fingerprint||old.fingerprint||null,reference:card?verseReference(card):old.reference||null,picture:picture??old.picture??(id.startsWith('picture:')?Number(id.slice(8)):null)};
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function beginGift21(t){
 const p=g.wonder20.play21;if(!p)return;const same=p.parcel?.id===t.id,stage=same?p.parcel.stage+1:1;
 if(stage>=3){openRememberedGift21(t);return;}
 p.parcel={id:t.id,target:t,stage,age:0};rumble20(.08,.1);if(stage===2)toast('The ribbon slips free.');
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function openRememberedGift21(t){
 const p=g.wonder20.play21;p.parcel=null;p.hold=null;
 if(t.card){rememberOrnament21(t.card.id,t.card,t.picture);save();discover(t.card);$('#panel-content').insertAdjacentHTML('beforeend','<p class="tucked-ornament21">A little red star was tucked in with it.</p>');if(t.picture!==null&&t.picture!==undefined){const b=document.createElement('button');b.textContent='See the little picture';b.onclick=function picture(){rememberOrnament21('picture:'+t.picture,t.card,t.picture);save();showPictureGift09(t);/* Code by Daniel using ChatGPT November 13, 2026 */};$('#panel-content .row').append(b);}$('#keep-verse')?.focus({preventScroll:true});}
 else if(t.picture!==undefined){rememberOrnament21('picture:'+t.picture,null,t.picture);save();showPictureGift09(t);}
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function ornamentSlots21(){
 const original=PAINTING_ANCHORS21.objects.tree.slots,count=Object.keys(wonderState20().ornaments).length;if(count<=original.length)return original;
 const slots=[...original];for(let i=original.length;i<count;i++){const base=original[i%original.length];slots.push([base[0]+((Math.floor(i/original.length)%2)? .45:-.45),base[1]+.7]);}return slots;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function selectedOrnament21(){
 return g.wonder20.play21.mode?.ornament||null;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function selectOrnament21(delta){
 const m=g.wonder20.play21.mode,ids=Object.keys(wonderState20().ornaments);if(!m||!ids.length)return;m.ornament=ids[(ids.indexOf(m.ornament)+delta+ids.length)%ids.length];refreshRoomTray21();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function openOrnament21(id){
 const record=wonderState20().ornamentRecords21[id],card=cards.find(function match(c){return c.id===(record?.cardId||id);/* Code by Daniel using ChatGPT November 13, 2026 */});endRoomPlay21();if(id.startsWith('picture:')&&record?.picture!==null&&record?.picture!==undefined){showPictureGift09({picture:record.picture,card});if(!card)$('#picture-word')?.remove();return;}if(card){discover(card);$('#keep-verse')?.focus({preventScroll:true});}else if(record?.picture!==null&&record?.picture!==undefined){showPictureGift09({picture:record.picture});$('#picture-word')?.remove();}else toast('That gift belongs to a different Scripture collection.');
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function beginRoomPlay21(kind){
 if(kind==='snowballs'&&!state.tales.converted)return;closePanel();standUp20();const p=g.wonder20.play21;
 const specs={tree:{focus:[24,31],zoom:1.55,capture:true},bells:{focus:[46,65],zoom:1.65,capture:true},family:{focus:[50,66],zoom:1.45},widow:{focus:[83,55],zoom:1.55,capture:true},keeper:{focus:[51,59],zoom:1.5,capture:true},robin:{focus:[27,64],zoom:1.35},snowballs:{focus:[58,66],zoom:1.12},valley:{focus:[22,35],zoom:1.7,capture:true},railway:{focus:[72,65],zoom:1.8,capture:true},lantern:{focus:[41,55],zoom:1.4,capture:true}};
 const s=specs[kind];if(!s)return;document.body.classList.add('playing-room21');document.body.classList.toggle('room-valley21',kind==='valley');p.mode={kind,room:state.room,angle:g.play10.worldTrainAngle,running:false,...s,age:0,index:0,wind:0,lastAngle:null,song:0,hold:0,roll:0,rolls:0,railRunning:false,ornament:Object.keys(wonderState20().ornaments)[0]||null};g.steps=[];g.pending=null;g.velocity={x:0,y:0};g.keys.clear();refreshRoomTray21();
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function endRoomPlay21(){
 const p=g.wonder20?.play21;if(!p)return;p.mode=null;document.body.classList.remove('playing-room21','room-valley21');$('#room-play21').hidden=true;g.keys.clear();g.velocity={x:0,y:0};canvas.focus({preventScroll:true});
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function roomPlayCamera21(){
 const p=g.wonder20?.play21;return p?.camera&&p.camera.zoom>1.002?p.camera:null;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function roomCaptures21(){
 return !!g.wonder20?.play21?.mode?.capture;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function refreshRoomTray21(){
 const m=g.wonder20.play21.mode,box=$('#room-play21'),tray=$('#room-play-tray21');if(!m){box.hidden=true;return;}box.hidden=false;tray.replaceChildren();
 if(m.kind==='railway'){refreshRailTray22();return;}
 if(m.kind==='tree'){
  const ids=Object.keys(wonderState20().ornaments),label=document.createElement('span');label.id='ornament-reference21';label.textContent=wonderState20().ornamentRecords21[m.ornament]?.reference||'Choose an ornament';tray.append(label);
  const choices=document.createElement('div');choices.className='ornament-choices21';for(const id of ids){const b=document.createElement('button');b.innerHTML=g.starIcon22?'<img src="'+g.starIcon22+'" alt="">':'✦';b.className='ornament-pick21';b.dataset.ornament=id;b.title=wonderState20().ornamentRecords21[id]?.reference||'A little ornament';b.setAttribute('aria-label',b.title);b.setAttribute('aria-pressed',String(id===m.ornament));b.onclick=function select(){m.ornament=id;refreshRoomTray21();canvas.focus({preventScroll:true});/* Code by Daniel using ChatGPT November 13, 2026 */};choices.append(b);}tray.append(choices);
  for(const [text,fn]of [['Read its gift',function read(){if(m.ornament)openOrnament21(m.ornament);/* Code by Daniel using ChatGPT November 13, 2026 */}],['Put it in the box',function remove(){delete wonderState20().placements[m.ornament];save();canvas.focus({preventScroll:true});/* Code by Daniel using ChatGPT November 13, 2026 */}]]){const b=document.createElement('button');b.textContent=text;b.onclick=fn;tray.append(b);}
 }else{const title=document.createElement('span');title.textContent={bells:'Handbells',family:'A train on the rug',widow:'A little brass key',keeper:'The work lamp',robin:'A page for two',snowballs:'Soft snow',valley:'The valley below',railway:'The little railway',lantern:'The lantern glass'}[m.kind];tray.append(title);const b=document.createElement('button');b.id='room-play-action21';b.textContent={bells:'Ring',family:'Roll',widow:'Turn',keeper:'Hold',robin:'Read a line',snowballs:'Toss',valley:'Stay a while',railway:playState10().train.pieces.every(function fitted(p){return p===1;/* Code by Daniel using ChatGPT November 13, 2026 */})?'Roll / pause':'Try a piece',lantern:'Turn the glass'}[m.kind];b.onclick=function act(){roomAction21();canvas.focus({preventScroll:true});/* Code by Daniel using ChatGPT November 13, 2026 */};if(m.kind!=='valley')tray.append(b);}
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function roomAction21(){
 const m=g.wonder20.play21.mode;if(!m)return;
 if(m.kind==='bells')ringBell21(m.index);
 else if(m.kind==='tree'){if(m.ornament){for(const [id,pos]of Object.entries(wonderState20().placements))if(pos===m.index)delete wonderState20().placements[id];wonderState20().placements[m.ornament]=m.index;save();}}
 else if(m.kind==='widow'){if(!m.song){m.wind+=1;if(m.wind>=3){m.song=8;m.note=0;m.nextNote=0;}}}
 else if(m.kind==='family'){if(!m.roll){m.roll=2.4;m.rolls++;wonderState20().kindness.family=true;save();}}
 else if(m.kind==='keeper')m.holding=!m.holding;
 else if(m.kind==='robin'){wonderState20().kindness.robin=true;save();beginRoomSpeech21([['Robin','The window makes a golden lane.'],['elf','Across the snow, across the rain.'],['Robin','A little light, a welcome through—'],['elf','I kept the other line for you.']]);}
 else if(m.kind==='snowballs')tossSnow21('elf');
 else if(m.kind==='railway')railwayAction22(RAIL_CONTROLS22[g.railway22.control]);
 else if(m.kind==='lantern'){playState10().lantern.glass[m.index%3]=!playState10().lantern.glass[m.index%3];save();}
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function paintingTargets21(all){
 if(state.room==='workshop'){let i=0;for(const t of all)if(t.gift&&!Exploration.free(t,roomMap(),true)){const clear=[[90,88],[54,89],[48,76]][i++%3];t.x=clear[0];t.y=clear[1];t.hit=[t.x-2.8,t.y-5,5.6,6];}}
 const w=wonderState20(),q=g.wonder20,p=q.play21;
 const result=all.filter(function keep(t){return !['bedroom-books','cottage-reading-nook','angel20'].includes(t.id)&&!t.id?.startsWith('remembered-')&&!(t.id==='rime'&&state.tales.converted&&w.rimePlace21!=='cave')&&!(t.id==='bedroom-toy'&&nutcrackerLocation21().room!=='closet');/* Code by Daniel using ChatGPT November 13, 2026 */});
 for(const lamp of LAMPS20)if(lamp.room===state.room){const [x,y,rx,ry]=lamp.ellipse;result.push({id:'light20-'+lamp.id,x:lamp.x,y:lamp.y,hit:[x-rx,y-ry,rx*2,ry*2],wonder20:'lamp',lamp:lamp.id,label:w.lights[lamp.id]?'The '+(lamp.label.startsWith('Candle')?'candle':'lantern'):'A quiet '+(lamp.label.includes('andle')?'candle':'lantern')});}
 for(const f of BOOK_FINDS20)if(f.room===state.room&&!w.finds[f.id])result.push({...f,id:'find20-'+f.id,find:f.id,wonder20:'find'});
 if(state.room==='mountain')result.push({id:'valley20',x:54,y:82,hit:PAINTING_ANCHORS21.valley.paintedVillageBounds,wonder20:'valley',label:'The village below'});
 if(state.room==='snowgarden'){
  const window=PAINTING_ANCHORS21.objects.cottageWindow;result.push({id:'window20',x:window.stand[0],y:window.stand[1],hit:window.rect,wonder20:'waiting',label:'A light behind the glass'},{id:'bulbs20',x:36,y:79,wonder20:'bulbs',label:'A little garden marker'});
  if(state.tales.converted&&w.rimePlace21==='snowgarden'){const r=rimeGardenPoint21();result.push({id:'knock20',x:r.x,y:r.y,wonder20:q.seat&&w.kindness.boundary?'garden-company':'knock',label:'Rime beside the bench'});}
 }
 if(state.room==='grandmother'&&state.tales.converted&&w.rimePlace21==='grandmother')result.push({id:'rime-guest20',x:79,y:81,wonder20:'guest',label:'Rime beside the wood basket'});
 if(state.room==='rink'&&state.tales.converted&&w.rimePlace21==='rink')result.push({id:'rime-skate20',x:q.rime.x,y:q.rime.y,wonder20:'rime',label:'Rime on the pond'});
 if(state.room==='hall'){const nut=nutcrackerLocation21();if(nut.room==='hall')result.push({id:'nut20',x:nut.x,y:nut.y,wonder20:'nutcracker',label:'A little nutcracker'});}
 if(state.room==='clockshop')for(const [owner,x]of [['widow',83],['family',53],['robin',25]]){const toy=TOYS.find(function owned(t){return t.owner===owner;/* Code by Daniel using ChatGPT November 13, 2026 */});if(toyStatus(toy.id)==='delivered')result.push({id:'play-neighbour21-'+owner,x,y:76,wonder20:owner,label:{widow:'The clockwork bird',family:'A train on the rug',robin:'Robin’s open book'}[owner],hit:owner==='widow'?[81,36,9,13]:undefined});}
 if(state.room==='gifts'&&!p.mode)for(const [id,slot]of Object.entries(w.placements)){const point=ornamentSlots21()[slot];if(point)result.push({id:'ornament21-'+id,x:32,y:51,hit:[point[0]-.8,point[1]-.9,1.6,1.8],wonder20:'ornament',ornament:id,label:w.ornamentRecords21[id]?.reference||'A little ornament'});}
 return dogTargets27(result);
 /* Code by Daniel using ChatGPT November 15, 2026 */
}
function paintingAction21(t){
 if(t.gift&&t.card&&!known(t.card)){beginGift21(t);return true;}
 if(t.picture!==undefined&&t.picture!==null&&(!t.card||known(t.card))){rememberOrnament21('picture:'+t.picture,t.card,t.picture);save();}
 if(t.play10==='train'){beginRoomPlay21('railway');return true;}
 if(!t.wonder20)return false;const w=wonderState20(),p=g.wonder20.play21,kind=t.wonder20;
 if(kind==='lamp'){w.lights[t.lamp]=TOGGLE_LIGHT_ROOMS22.has(state.room)?!w.lights[t.lamp]:true;save();rumble20(.1,.12);}
 else if(kind==='seat')sitOnPainting21(SEATS20[state.room]);
 else if(kind==='bethlehem')beginBethlehem20();
 else if(kind==='shelf')openBookshelf20(t.shelf);
 else if(kind==='tree')beginRoomPlay21('tree');
 else if(kind==='ornament')openOrnament21(t.ornament);
 else if(kind==='find'){const f=BOOK_FINDS20.find(function match(f){return f.id===t.find;/* Code by Daniel using ChatGPT November 13, 2026 */});w.finds[t.find]=true;save();toast('A little reminder of “'+WINTER_READINGS[f.book].title+'.”');}
 else if(kind==='rime')rimePondMenu20();
 else if(kind==='knock')rimeKnock21();
 else if(kind==='guest')startDialogue09('rime',[['npc','I brought enough wood for the night. Grandmother says I can stand by the basket.'],['elf','Would you like a chair?'],['npc','I like these people. I should prefer to leave them with all their chairs.']],null,{choices:[{id:'pond-again',label:'Shall we meet at the pond later?',onSelect:function pond(){w.rimePlace21='rink';save();closePanel();/* Code by Daniel using ChatGPT November 13, 2026 */}},{id:'stay',label:'I am glad you came.',onSelect:closePanel}]});
 else if(kind==='garden-company')startDialogue09('rime',[['npc','It is good out here too.'],['elf','I am glad you stayed.']],null,{choices:[{id:'ask-again',label:'Shall I ask Grandmother now?',onSelect:rimeKnock21},{id:'rest',label:'Let us sit a while.',onSelect:closePanel}]});
 else if(kind==='waiting')toast('Someone has kept a light in the window.');
 else if(kind==='bulbs')toast('A little marker in the snow: crocuses. The bed is waiting for spring.');
 else if(kind==='nutcracker')toast(g.wonder20.nutVisit?'He had a different view last time.':'He keeps a very solemn watch.');
 else if(kind==='dog')visitDog27();
 else if(kind==='dog-biscuit')takeDogBiscuit27();
 else if(kind==='place'){w.placeSet=!w.placeSet;save();}
 else if(['bells','family','widow','robin','keeper','valley'].includes(kind)){beginRoomPlay21(kind);if(kind==='family')roomAction21();}
 return true;
 /* Code by Daniel using ChatGPT November 15, 2026 */
}
function sitOnPainting21(seat){
 if(!seat)return;const owner=coopEnabled28()?g.coop28.interactor:1;closePanel();const bench=!seat.warm?benchGeometry24(seat):null,stand=seat.stand21||(bench?[bench.stand.x,bench.stand.y]:[seat.x,seat.y+4]),visual=seat.visual21||(bench?[bench.seat.x,bench.seat.y+18/10.24]:[seat.x,seat.y]),end=safeRoomArrival({x:stand[0],y:stand[1]});if(owner===2){g.coop28.player=end;g.coop28.direction=0;}else{state.player=end;g.steps=[];g.pending=null;g.velocity={x:0,y:0};g.wonder20.lastPlayer={...end};g.wonder20.lastFoot={...end};}g.wonder20.seat={...seat,owner28:owner,room:state.room,x:end.x,y:end.y,seatX:visual[0],seatY:visual[1],birdX:bench?bench.bird.x*15.36:visual[0]*15.36+43,birdY:bench?bench.bird.y*10.24:visual[1]*10.24-42,age:0};$('#wonder-rest20').hidden=false;g.direction=0;
 /* Code by Daniel using ChatGPT November 14, 2026 */
/* Code by Daniel using ChatGPT November 19, 2026 */
}
function rimeGardenPoint21(){
 return g.wonder20.play21.rimeGarden||{x:27,y:60};
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function rimeKnock21(){
 const w=wonderState20();w.kindness.knocked=true;w.rimePlace21='snowgarden';save();startDialogue09('rime',[['npc','I brought dry wood. May I come in?']],null,{choices:[{id:'welcome',label:'Let me ask Grandmother. Please wait here.',onSelect:function ask(){g.wonder20.play21.invitationPending=true;closePanel();planRoom('grandmother');/* Code by Daniel using ChatGPT November 13, 2026 */}},{id:'not-yet',label:'Not just yet. We can sit together outside.',onSelect:function boundary(){w.kindness.boundary=true;save();startDialogue09('rime',[['npc','All right. I can wait.'],['elf','I am glad you came.'],['npc','I shall try not to sit on the bench. It looks expensive.']]);/* Code by Daniel using ChatGPT November 13, 2026 */}}]});
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function beginRoomSpeech21(lines){
 g.wonder20.play21.speech={lines,index:0,age:0,room:state.room};
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function quietChairTalk21(){
 g.wonder20.play21.chairTalkVisit=true;wonderState20().kindness.grandmother=true;save();beginRoomSpeech21([['Grandfather','You have taken my chair.'],['Grandmother','You said it was too near the fire.'],['Grandfather','That was before someone else was enjoying it.'],['Grandmother','There is room on the settle, you old fraud.'],['elf','I could move.'],['Grandmother','No, stay. He has been trying to sit next to me all evening.']]);
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function nutcrackerLocation21(){
 const n=g.wonder20.nutVisit%4;return n===0||n===3?{room:'closet',x:58,y:78}:{room:'hall',x:n===1?63:29,y:n===1?58:74};
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function paintingArrival21(){
 const p=g.wonder20?.play21;if(!p)return;endRoomPlay21();p.camera=null;p.parcel=null;p.hold=null;p.speech=null;p.projectiles=[];p.chairTalkVisit=false;p.gardenPath=null;p.rimeGarden={x:27,y:60};
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function contextPlay21(){
 if(panel.open||g.transition||wonderWatching20())return;const p=g.wonder20.play21,m=p.mode;
 if(coopEnabled28()&&state.room==='rink'&&!m){inviteCoopSkate28();return;}
 if(m){if(m.kind==='snowballs'||m.kind==='family')roomAction21();else endRoomPlay21();return;}
 if(onIce()){p.twirl=.9;return;}if(snowOutdoors20()&&!state.riding){makeSnowAngel20();return;}p.bow=1;
 /* Code by Daniel using ChatGPT November 13, 2026 */
/* Code by Daniel using ChatGPT November 19, 2026 */
}
function roomPointer21(e){
 const p=g.wonder20?.play21,m=p?.mode;if(!m)return;const point=scenePoint(e);let consume=!!m.capture;
 if(m.kind==='tree'){
  const slots=ornamentSlots21();let closest=0,distance=Infinity;for(const [i,s]of slots.entries()){const d=Math.hypot(point.x-s[0],point.y-s[1]);if(d<distance){closest=i;distance=d;}}
  if(distance<3){m.index=closest;const old=Object.entries(wonderState20().placements).find(function at(pair){return pair[1]===closest;/* Code by Daniel using ChatGPT November 13, 2026 */});if(old&&(!m.ornament||old[0]===m.ornament))openOrnament21(old[0]);else roomAction21();}
 }else if(m.kind==='bells'){m.index=bounded21(Math.round((point.x-39)/1.65),0,7);roomAction21();}
 else if(m.kind==='widow'){const world={x:86,y:44},dx=point.x-world.x,dy=point.y-world.y;m.drag=e.pointerId;m.lastAngle=Math.atan2(dy,dx);canvas.setPointerCapture(e.pointerId);roomAction21();}
 else if(m.kind==='railway')railwayPointer22(point);
 else if(m.kind==='lantern'){m.index=bounded21(Math.floor((point.x-31.8)/.9),0,2);roomAction21();}
 else if(m.kind==='keeper')roomAction21();
 else if(m.kind==='family'&&Math.hypot(point.x-50,point.y-77)<15){roomAction21();consume=true;}
 else if(m.kind==='snowballs'){tossSnow21('elf',point);consume=true;}
 if(consume){e.preventDefault();e.stopImmediatePropagation();canvas.focus({preventScroll:true});}
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function windInRoom21(angle){
 const m=g.wonder20.play21.mode;if(m?.kind!=='widow'||m.song)return;if(m.lastAngle!==null){const d=Math.atan2(Math.sin(angle-m.lastAngle),Math.cos(angle-m.lastAngle));if(Math.abs(d)<1.4)m.wind+=Math.abs(d)/(Math.PI*2);}m.lastAngle=angle;if(m.wind>=3&&!m.song){m.song=8;m.note=0;m.nextNote=0;}
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function roomPad21(move,press){
 const m=g.wonder20.play21.mode;if(!m)return false;if(press.start){endRoomPlay21();settings();return true;}if(press.north){endRoomPlay21();collection();return true;}if(press.west){endRoomPlay21();waypack();return true;}
 if(m.capture&&press.b){endRoomPlay21();return true;}
 if(m.kind==='widow'&&Math.hypot(move.x,move.y)>.45)windInRoom21(Math.atan2(move.y,move.x));else if(m.kind==='widow')m.lastAngle=null;
 else if(m.capture&&Math.hypot(move.x,move.y)>.5){const now=performance.now();if(now>(m.navAt||0)){if(m.kind==='railway'){railwayNavigate22(Math.abs(move.x)>.5?Math.sign(move.x):Math.sign(move.y));m.navAt=now+220;return true;}if(m.kind==='tree'&&Math.abs(move.y)>Math.abs(move.x)){selectOrnament21(Math.sign(move.y));m.navAt=now+220;return true;}const delta=Math.abs(move.x)>.5?Math.sign(move.x):Math.sign(move.y),count=m.kind==='tree'?ornamentSlots21().length:m.kind==='bells'?8:3;m.index=(m.index+delta+count)%count;m.navAt=now+220;}}
 if(press.a||(!m.capture&&press.b))roomAction21();return true;
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function roomKey21(e){
 if(e.target.matches('input,textarea,select')||panel.open||wonderWatching20())return false;const p=g.wonder20?.play21;if(!p)return false;
 const relevant=['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Enter','KeyE','KeyQ','Space'];if(relevant.includes(e.code)&&keyboardRole21(e.code,e.type)==='friend'){e.preventDefault();return true;}
 const m=p.mode;if(m&&e.target.closest('#room-play21')&&['Enter','Space'].includes(e.code))return true;if(e.code==='KeyQ'){e.preventDefault();if(!e.repeat)contextPlay21();return true;}
 if(m&&e.code==='Escape'){e.preventDefault();e.stopImmediatePropagation();if(!e.repeat)endRoomPlay21();return true;}
 if(m&&['Enter','KeyE','Space'].includes(e.code)){e.preventDefault();if(!e.repeat)roomAction21();return true;}
 if(m?.capture&&['ArrowLeft','KeyA','ArrowRight','KeyD','ArrowUp','KeyW','ArrowDown','KeyS'].includes(e.code)){e.preventDefault();if(m.kind==='railway'){railwayNavigate22(['ArrowLeft','KeyA','ArrowUp','KeyW'].includes(e.code)?-1:1);return true;}if(m.kind==='tree'&&['ArrowUp','KeyW','ArrowDown','KeyS'].includes(e.code)){selectOrnament21(['ArrowUp','KeyW'].includes(e.code)?-1:1);return true;}const delta=['ArrowLeft','KeyA'].includes(e.code)?-1:['ArrowRight','KeyD'].includes(e.code)?1:['ArrowUp','KeyW'].includes(e.code)?-8:8,count=m.kind==='tree'?ornamentSlots21().length:m.kind==='bells'?8:3;m.index=(m.index+delta+count*10)%count;return true;}
 if(!m&&['Enter','KeyE'].includes(e.code)&&!e.repeat)p.hold={code:e.code,age:0};return false;
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function releaseWorldKey21(e){
 const p=g.wonder20?.play21;if(!p)return;p.devices.friendKeys.delete(e.code);if(p.hold?.code===e.code)p.hold=null;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function ringBell21(i){
 ringBell20(i);const p=g.wonder20.play21;p.bellOrder.push(i);p.bellOrder=p.bellOrder.slice(-8);if(p.bellOrder.join(',')==='7,6,5,4,3,2,1,0'){p.bellOrder=[];p.answer={age:0,next:0};}
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function tossSnow21(who,point=null){
 if(!state.tales.converted)return;const p=g.wonder20.play21,r=g.wonder20.rime,from=who==='elf'?{...state.player}:{x:r.x,y:r.y},to=point|| (who==='elf'?{x:r.x,y:r.y}:{x:state.player.x+8,y:state.player.y+3});p.projectiles.push({who,from,to,age:0});if(who==='elf')p.returnSnow=.9;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function keyboardRole21(code,type='keydown'){
 if(coopEnabled28())return 'elf';
 const p=g.wonder20.play21,d=p.devices;d.keyboardSeen=true;
 if(!d.primary)d.primary='keyboard';
 else if(d.primary!=='keyboard'&&state.tales.snowman.alive&&!d.secondary){d.secondary='keyboard';joinSnowFriend21();}
 if(d.secondary==='keyboard'){if(['Enter','KeyE','Space'].includes(code)&&type==='keydown')p.friendTip=1.2;else if(type==='keydown')d.friendKeys.add(code);return 'friend';}return 'elf';
 /* Code by Daniel using ChatGPT November 13, 2026 */
/* Code by Daniel using ChatGPT November 19, 2026 */
}
function joinSnowFriend21(){
 const s=state.tales.snowman;s.follow=true;if(s.room!==state.room){const point=safeRoomArrival({x:state.player.x+5,y:state.player.y+2});s.room=state.room;s.x=point.x;s.y=point.y;}toast('Your snow friend has company.');
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function routeJoinedPads21(samples){
 const elves=routeCoopPads28(samples);if(elves)return elves;
 const q=g.wonder20,p=q.play21,d=p.devices;q.coopMove=null;
 const active=samples.filter(function activity(s){return s.r.active;/* Code by Daniel using ChatGPT November 13, 2026 */}),key=function key(s){return 'pad:'+s.p.index;/* Code by Daniel using ChatGPT November 13, 2026 */};
 if(!d.primary&&active.length)d.primary=key(active[0]);
 if(d.primary?.startsWith('pad:')&&!samples.some(function alive(s){return key(s)===d.primary;/* Code by Daniel using ChatGPT November 13, 2026 */})){d.primary=d.keyboardSeen?'keyboard':samples.length?key(samples[0]):null;d.secondary=null;d.friendKeys.clear();}
 if(d.secondary?.startsWith('pad:')&&!samples.some(function alive(s){return key(s)===d.secondary;/* Code by Daniel using ChatGPT November 13, 2026 */}))d.secondary=null;
 g.padHolding21=samples.some(function held(s){return s.r.aHeld;/* Code by Daniel using ChatGPT November 13, 2026 */});if(!state.tales.snowman.alive)return null;
 if(!d.secondary){const next=active.find(function second(s){return key(s)!==d.primary;/* Code by Daniel using ChatGPT November 13, 2026 */});if(next&&d.primary){d.secondary=key(next);joinSnowFriend21();}}
 const primary=samples.find(function same(s){return key(s)===d.primary;/* Code by Daniel using ChatGPT November 13, 2026 */}),secondary=samples.find(function same(s){return key(s)===d.secondary;/* Code by Daniel using ChatGPT November 13, 2026 */});
 if(d.secondary==='keyboard'){const k=d.friendKeys;q.coopMove={x:k.has('KeyD')||k.has('ArrowRight')?1:k.has('KeyA')||k.has('ArrowLeft')?-1:0,y:k.has('KeyS')||k.has('ArrowDown')?1:k.has('KeyW')||k.has('ArrowUp')?-1:0};}
 else if(secondary){q.coopMove={x:secondary.r.x,y:secondary.r.y};if(secondary.r.a)p.friendTip=1.2;}
 g.padHolding21=!!primary?.r.aHeld;return {move:primary?{x:primary.r.x,y:primary.r.y}:{x:0,y:0},press:primary?.r||{}};
 /* Code by Daniel using ChatGPT November 13, 2026 */
/* Code by Daniel using ChatGPT November 19, 2026 */
}
function primaryUsesPad21(){
 if(coopEnabled28())return !!g.padCount;
 const role=g.wonder20?.play21?.devices.primary;return !role||role.startsWith('pad:');
 /* Code by Daniel using ChatGPT November 13, 2026 */
/* Code by Daniel using ChatGPT November 19, 2026 */
}
function updatePaintingPlay21(dt){
 const q=g.wonder20,p=q?.play21;if(!p||document.hidden||g.paused)return;
 if(g.wonder20.seat&&state.room==='snowgarden'&&wonderState20().rimePlace21==='snowgarden'){const r=p.rimeGarden||(p.rimeGarden={x:27,y:60}),target=benchGeometry24(SEATS20.snowgarden,'snowgarden').company;if(!p.gardenPath)p.gardenPath=snowPath(r,target,roomMap());const next=p.gardenPath[0];if(next){const moved=Exploration.move(r,{x:next.x-r.x,y:next.y-r.y},dt,roomMap(),true,7);r.x=moved.x;r.y=moved.y;if(Math.hypot(next.x-r.x,next.y-r.y)<.7)p.gardenPath.shift();}}
 for(const key of ['twirl','bow','friendTip'])p[key]=Math.max(0,(p[key]||0)-dt);
 if(p.twirl)g.direction=Math.floor((.9-p.twirl)/.9*8)%8;
 const m=p.mode;if(m){m.age+=dt;if(state.room!==m.room&&m.room)endRoomPlay21();
  if(m.kind==='family'&&m.roll){m.roll=Math.max(0,m.roll-dt);if(!m.roll&&m.rolls===1)beginRoomSpeech21([['Samir','Express! And back to you.']]);}
  if(m.kind==='widow'&&m.song){m.song=Math.max(0,m.song-dt);m.nextNote-=dt;if(m.nextNote<=0){if(state.sound)AudioScene.tone([784,988,880,1046.5,880,784,659.25,784][m.note++%8],.5,.1,'sine',true);m.nextNote=.8;}if(!m.song){endRoomPlay21();neighbourReward20('widow');}}
  if(m.kind==='keeper'&&m.holding){m.hold+=dt;if(m.hold>=3){endRoomPlay21();neighbourReward20('keeper');}}
 }
 activityHint22();updateRailway22(dt);
 const target=m?{zoom:m.zoom,left:bounded21(m.focus[0]*15.36-768/m.zoom,0,1536-1536/m.zoom),top:bounded21(m.focus[1]*10.24-512/m.zoom,0,1024-1024/m.zoom)}:{zoom:1,left:0,top:0};
 if(!p.camera&&m)p.camera={zoom:1,left:0,top:0};if(p.camera){const blend=state.motion?1-Math.exp(-dt*6):1;for(const k of ['zoom','left','top'])p.camera[k]+=(target[k]-p.camera[k])*blend;if(!m&&p.camera.zoom<1.002)p.camera=null;}
 if(p.parcel){p.parcel.age+=dt;const held=p.hold&&g.keys.has(p.hold.code)||g.padHolding21;if(held){p.parcel.held=(p.parcel.held||0)+dt;if(p.parcel.held>.55)openRememberedGift21(p.parcel.target);}else p.parcel.held=0;}
 if(p.answer){p.answer.age+=dt;const rhythm=[0,.6,1.05,1.2,2.1,2.4,3,3.6];while(p.answer.next<8&&p.answer.age>=rhythm[p.answer.next])ringBell20(7-p.answer.next++);if(p.answer.next===8)p.answer=null;}
 if(p.returnSnow!==undefined){p.returnSnow-=dt;if(p.returnSnow<=0){delete p.returnSnow;tossSnow21('rime');beginRoomSpeech21([['Rime','I was aiming for the tree.']]);}}
 for(const ball of p.projectiles)ball.age+=dt;p.projectiles=p.projectiles.filter(function live(b){return b.age<1.25;/* Code by Daniel using ChatGPT November 13, 2026 */});
 if(p.speech){p.speech.age+=dt;if(p.speech.room!==state.room)p.speech=null;else if(p.speech.age>3.1){p.speech.age=0;p.speech.index++;if(p.speech.index>=p.speech.lines.length)p.speech=null;}}
 if(p.invitationPending&&state.room==='grandmother'&&!panel.open&&!g.transition&&g.arrivalAge>.6){p.invitationPending=false;startDialogue09('grandmother',[['elf','Rime is at the gate. He brought some wood. May he come in?'],['npc','Yes. Thank you for asking. He can leave his great boots by the door.']],function invite(){wonderState20().kindness.invited=true;wonderState20().rimePlace21='grandmother';save();closePanel();/* Code by Daniel using ChatGPT November 13, 2026 */});}
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function paintLamp21(lamp,forcedLit=null){
 const lit=forcedLit===null?!!wonderState20().lights[lamp.id]:forcedLit,[x,y,rx,ry]=lamp.ellipse;ctx.save();ctx.translate(x*15.36,y*10.24);ctx.scale(rx*15.36,ry*10.24);
 if(!lit){ctx.globalCompositeOperation='multiply';const shade=ctx.createRadialGradient(0,0,0,0,0,1.7);shade.addColorStop(0,'rgba(10,18,25,.96)');shade.addColorStop(.55,'rgba(15,22,30,.82)');shade.addColorStop(1,'rgba(15,22,30,0)');ctx.fillStyle=shade;ctx.fillRect(-1.7,-1.7,3.4,3.4);}
 else{const glow=ctx.createRadialGradient(0,0,0,0,0,2.3);glow.addColorStop(0,'#ffe8a93a');glow.addColorStop(1,'#ffdc8c00');ctx.fillStyle=glow;ctx.fillRect(-2.3,-2.3,4.6,4.6);}ctx.restore();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function paintLights21(){
 for(const lamp of LAMPS20)if(lamp.room===state.room)paintLamp21(lamp);
 if(state.room==='mountain')for(const lamp of LAMPS20){const [x,y]=lamp.valleyPoint,lit=!!wonderState20().lights[lamp.id];ctx.save();ctx.translate(x*15.36,y*10.24);if(!lit){ctx.globalCompositeOperation='multiply';const g=ctx.createRadialGradient(0,0,1,0,0,11);g.addColorStop(0,'#08111cdd');g.addColorStop(1,'#08111c00');ctx.fillStyle=g;ctx.fillRect(-11,-11,22,22);}else{const g=ctx.createRadialGradient(0,0,1,0,0,10);g.addColorStop(0,'#ffe5a6cc');g.addColorStop(.3,'#ffe5a677');g.addColorStop(1,'#ffe5a600');ctx.fillStyle=g;ctx.fillRect(-10,-10,20,20);}ctx.restore();}
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function paintLightOcclusion21(){
 if(state.room==='rink'){const lamp=LAMPS20.find(function foreground(l){return l.id==='pond-foreground';/* Code by Daniel using ChatGPT November 13, 2026 */});paintLamp21(lamp);}
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function paintOrnaments21(){
 paintOrnaments22();
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function paintBellTable21(){
 const frames=g.paintedFrames21;if(!frames)return;const x=45.5*15.36,y=66*10.24,width=245;paintFrame21(frames.table,x,y,width);const top=y+(151-550)*width/1490;
 for(let i=0;i<8;i++){const bx=(39+i*1.65)*15.36,frame=frames.bells[i],h=31-i*1.4,scale=h/frame.h,ring=g.wonder20.bells[i]>g.wonder20.age,angle=ring&&state.motion?Math.sin(g.wonder20.age*34)*.13:0;ctx.save();ctx.translate(bx,top+9);if(angle){const pivotY=(BELL_PIVOTS21[i][1]-BELL_BASES21[i][1])*scale;ctx.translate(0,pivotY);ctx.rotate(angle);ctx.translate(0,-pivotY);}ctx.drawImage(frame.canvas,-frame.anchorX*scale,-frame.anchorY*scale,frame.w*scale,frame.h*scale);ctx.restore();}
 const m=g.wonder20.play21.mode;if(m?.kind==='bells'){ctx.save();ctx.strokeStyle='#efd99c';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse((39+m.index*1.65)*15.36,top+12,11,4,0,0,Math.PI*2);ctx.stroke();ctx.restore();}
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function paintDog21(){
 const frame=g.paintedFrames21?.dog;if(!frame)return;const p=g.wonder20;paintFrame21(frame,59*15.36,82*10.24,137,false,p.pet&&state.motion?Math.sin(p.age*12)*.012:0);
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function paintBench21(){
 const b=SEATS20[state.room];if(!b||b.warm)return;paintFrame21(g.paintedFrames21?.bench,b.x*15.36,b.y*10.24,benchGeometry24(b).width);
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function paintKitchen21(){
 const f=g.paintedFrames21;if(!f)return;const x=55*15.36,y=74*10.24;paintFrame21(f.kitchen,x,y,220);if(wonderState20().placeSet)paintFrame21(f.mug,x+38,y-136,25);
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function paintGrandfather21(){
 paintFrame21(g.paintedFrames21?.grandfather,63*15.36,61*10.24,SCENE_SCALE24.grandfatherWidth,true);
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function paintMouse21(){
 paintMouse22();
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function paintReturnedToys21(){
 if(toyStatus('bird')==='delivered'){const m=g.wonder20.play21.mode,singing=m?.kind==='widow'&&m.song,offset=singing&&state.motion?Math.sin(m.age*6)*3:0;paintSprite(g.toys[5],86*15.36,45*10.24-offset,56);}
 if(toyStatus('bear')==='delivered')paintSprite(g.toys[3],25*15.36,72*10.24,58);
 if(toyStatus('train')==='delivered'){const m=g.wonder20.play21.mode,k=m?.kind==='family'&&m.roll?Math.sin((2.4-m.roll)/2.4*Math.PI):0;paintSprite(g.toys[4],(46+7*k)*15.36,(79-7*k)*10.24,62);}
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function paintRoomEffects21(){
 const p=g.wonder20.play21,m=p.mode;ctx.save();
 for(const b of p.projectiles)paintSnowball22(b);
 if(m?.kind==='widow'&&m.song){ctx.font='22px Georgia';ctx.fillStyle='#f4df99';ctx.fillText('♪',88*15.36,38*10.24);}
 if(m?.kind==='keeper'&&m.holding){const x=50*15.36,y=50*10.24,g=ctx.createRadialGradient(x,y,10,x,y,110);g.addColorStop(0,'#ffe3a777');g.addColorStop(1,'#ffe3a700');ctx.fillStyle=g;ctx.fillRect(x-110,y-110,220,220);}
 if(p.speech){const [who,text]=p.speech.lines[p.speech.index],point=who==='elf'?{x:state.player.x,y:state.player.y-16}:who==='Grandfather'?{x:63,y:29}:who==='Grandmother'?{x:56,y:32}:who==='Rime'?{x:g.wonder20.rime.x,y:g.wonder20.rime.y-24}:who==='Samir'?{x:53,y:50}:{x:25,y:49};paintSpeech21(text,point);}
 ctx.restore();
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function paintSpeech21(text,point){
 const x=point.x*15.36,y=point.y*10.24;ctx.save();ctx.font='18px Georgia';const words=text.split(' '),lines=[];let line='';for(const word of words){const test=line?line+' '+word:word;if(ctx.measureText(test).width>260&&line){lines.push(line);line=word;}else line=test;}if(line)lines.push(line);const width=Math.min(290,Math.max(...lines.map(function measure(l){return ctx.measureText(l).width;/* Code by Daniel using ChatGPT November 13, 2026 */}))+24),height=lines.length*25+16;ctx.fillStyle='#faf0d6ec';ctx.strokeStyle='#9b8150';ctx.lineWidth=1;ctx.beginPath();ctx.roundRect(x-width/2,y-height,width,height,10);ctx.fill();ctx.stroke();ctx.fillStyle='#304836';ctx.textAlign='center';for(let i=0;i<lines.length;i++)ctx.fillText(lines[i],x,y-height+27+i*25);ctx.restore();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function paintingLayers21(){
 const layers=[{y:-10,draw:paintLights21},{y:101,draw:paintForeground21}];
 if(SEATS20[state.room]&&!SEATS20[state.room].warm)layers.push({y:SEATS20[state.room].y-.1,draw:paintBench21});
 const w=wonderState20();if(state.tales.converted&&w.rimePlace21===state.room){if(state.room==='rink')layers.push({y:g.wonder20.rime.y,draw:drawRimeSkating20});else if(state.room==='snowgarden'){const r=rimeGardenPoint21();layers.push({y:r.y,draw:function rime(){paintSprite(g.rime[0],r.x*15.36,r.y*10.24,190*depthScale(r));/* Code by Daniel using ChatGPT November 13, 2026 */}});}else if(state.room==='grandmother')layers.push({y:79,draw:drawGuestRime20});}
 if(state.room==='hall'){layers.push({y:66,draw:paintBellTable21});const nut=nutcrackerLocation21();if(nut.room==='hall')layers.push({y:nut.y,draw:function figure(){paintSprite(g.wonders[2],nut.x*15.36,nut.y*10.24,SCENE_SCALE24.nutcrackerHeight);/* Code by Daniel using ChatGPT November 13, 2026 */}});}
 if(state.room==='closet')layers.push({y:53,draw:paintMouse21});
 if(state.room==='grandmother')layers.push({y:61,draw:paintGrandfather21});
 if(state.room==='gifts')layers.push({y:45,draw:paintOrnaments21});if(state.room==='kitchen')layers.push({y:74,draw:paintKitchen21});return layers.concat(dogLayers27());
 /* Code by Daniel using ChatGPT November 15, 2026 */
}
function paintForeground21(){
 const q=g.wonder20,p=q.play21;ctx.save();
 for(const b of q.snowBursts)if(state.motion)for(let i=0;i<12;i++)worldFrame22('puff',b.x*15.36+Math.sin(i*13)*55,b.y*10.24-110+b.age*90+(i%5)*8,6);
 if(q.seat&&!q.seat.warm&&q.seat.age>3){const x=q.seat.birdX,y=q.seat.birdY;if(q.seat.age>=5||!state.motion)paintSprite(g.perchedCardinal,x,y,34);else{const k=ease((q.seat.age-3)/2);ctx.save();ctx.translate(x-220*(1-k),y-95*(1-k));paintFlyingCardinal(g.cardinals[Math.floor(q.age*7)%4]);ctx.restore();}}
 if(q.departBird&&q.departBird.room===state.room&&state.motion){ctx.save();ctx.translate(q.departBird.x+q.departBird.age*210,q.departBird.y-q.departBird.age*95);paintFlyingCardinal(g.cardinals[Math.floor(q.age*7)%4]);ctx.restore();}
 if(state.room==='nativity')worldFrame22('scroll',45*15.36,52*10.24-6,46);
 if(state.room==='snowgarden')worldFrame22('marker',40*15.36,79*10.24,25);
 const date=new Date();if(date.getMonth()===11&&[24,25].includes(date.getDate())&&snowOutdoors20()){worldFrame22('star',1160,114,26);}
 for(const f of BOOK_FINDS20)if(f.room===state.room&&!wonderState20().finds[f.id]){const x=f.x*15.36,y=f.y*10.24;if(f.id==='brass-bird')paintSprite(g.toys[5],x,y,24);else{const im=f.id==='clock-case'?g.images.clockshop:g.images.snowgarden;if(im){const r=f.id==='clock-case'?[640,10,110,470]:[468,102,194,124];ctx.drawImage(im,...r,x-12,y-26,24,26);}}}
 paintRoomEffects21();ctx.restore();
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function paintChairOcclusion21(){
 if(!g.wonder20.seat||state.room!=='grandmother')return;ctx.save();ctx.beginPath();ctx.rect(39.3*15.36,39.2*10.24,12.6*15.36,5.4*10.24);ctx.clip();ctx.drawImage(g.images.grandmother,0,0,1536,1024);ctx.restore();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function paintGiftRibbon21(t){
 const parcel=g.wonder20.play21.parcel;if(parcel?.id!==t.id||parcel.stage!==2)return;worldFrame22('looseRibbon',t.x*15.36+20*depthScale(t),t.y*10.24+5*depthScale(t),48*depthScale(t),false,.12);
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function focusPanelPrimary21(){
 const content=$('#panel-content'),button=content.querySelector('button.primary:not(:disabled),button[data-primary]:not(:disabled),button:not(:disabled),a[href]');if(button)button.focus({preventScroll:true});
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function repaintPortrait21(d,line){
 if(d.person==='rime'){refreshRimePortrait29(d,line);return;}
 if(d.person!=='grandmother')return;const who=line.side===1&&line.name==='Grandfather'?'grandfather':'grandmother',frame=g.paintedFrames21?.[who];if(!frame)return;const image=panel.querySelector('[data-actor="1"] img');if(image&&image.dataset.speaker21!==who){image.style.transform='scaleX(-1)';image.src=frame.canvas.toDataURL();image.alt=who==='grandfather'?'Grandfather':'Grandmother';image.dataset.speaker21=who;panel.querySelector('[data-actor="1"] figcaption').textContent=image.alt;}
 /* Code by Daniel using ChatGPT November 20, 2026 */
}
function plainObjectFrame21(object){
 if(object.nutcracker21)return nutcrackerLocation21().room!=='closet'?{hide:true}:{frame:g.wonders[2],height:SCENE_SCALE24.nutcrackerHeight};if(state.room==='grandmother'&&object.npc===1)return {frame:g.paintedFrames21.grandmother};return null;
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function moveRoomPointer21(event){
 const m=g.wonder20?.play21?.mode;if(m?.kind!=='widow'||m.drag!==event.pointerId)return;const point=scenePoint(event);windInRoom21(Math.atan2(point.y-44,point.x-86));event.preventDefault();event.stopImmediatePropagation();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
