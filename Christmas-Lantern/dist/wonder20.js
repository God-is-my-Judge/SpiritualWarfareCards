'use strict';
// Small things to do, people to notice. No new rooms or religious progress gates.
const LAMPS20=[
 {id:'pond',room:'rink',x:31,y:40},
 {id:'bridge',room:'sleigh',x:44,y:64},
 {id:'pines',room:'pinepass',x:49,y:54},
 {id:'garden',room:'snowgarden',x:39,y:66},
 {id:'homeward',room:'snowgarden',x:78,y:64},
 {id:'shelf',room:'mountain',x:44,y:80}
];
const SEATS20={hall:{x:67,y:80,label:'Sit on the settle',warm:true},grandmother:{x:60,y:77,label:'Sit beside the fire',warm:true},rink:{x:21,y:41,label:'Rest on the pond bench'},pinepass:{x:39,y:64,label:'Sit beneath the pines'},snowgarden:{x:31,y:85,width24:245,label:'Sit on the garden bench'}};
const SHELVES20={home:{room:'closet',x:49,y:54,books:['long-bell','long-third-stroke','long-window']},grandmother:{room:'grandmother',x:70,y:69,books:['long-apples','long-winter-house','long-clock-bird']}};
const BOOK_FINDS20=[{id:'clock-case',room:'hallway',x:44,y:77,book:'long-third-stroke',label:'Little clock case'},{id:'winter-window',room:'snowgarden',x:37,y:72,book:'long-winter-house',label:'A tiny painted window beneath the holly'},{id:'brass-bird',room:'rink',x:31,y:54,book:'long-clock-bird',label:'A brass bird beside the bench'}];
const EXTRA_BOOKS20=new Map();
function wonderState20(){
 return state.play10.wonder20;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function installWonder20(){
 const old=state.play10.wonder20&&typeof state.play10.wonder20==='object'?state.play10.wonder20:{};
 const w=state.play10.wonder20={lights:{},ornaments:{},placements:{},finds:{},kindness:{},holidayDays:{},together:false,bedtime:false,coop:false,rumble:false,errandOffered:false,...old};
 for(const key of ['lights','ornaments','placements','finds','kindness','holidayDays'])if(!w[key]||typeof w[key]!=='object'||Array.isArray(w[key]))w[key]={};
 if(!w.ornamentMigration20){for(const card of cards)if(known(card))w.ornaments[card.id]=true;w.ornamentMigration20=true;}
 g.wonder20={room:state.room,age:0,footprints:[],skateLines:[],snowBursts:[],snowAngels:[],hatSnow:0,lastPlayer:{...state.player},lastFoot:{...state.player},seat:null,watch:null,scene:null,rime:{x:65,y:65,angle:0,trying:true},nutVisit:0,bellAt:0,bells:[],mouse:0,pet:0,coopMove:null};
 ROOMS.nativity.spots.push({id:'bethlehem-scroll20',x:45,y:55,hit:[42.5,44,5.2,8.5],wonder20:'bethlehem',label:'A scroll near the manger'});
 ROOMS.gifts.spots.push({id:'decorate-tree20',x:36,y:64,hit:[29,14,18,43],wonder20:'tree',label:'Hang an ornament on the tree'});
 ROOMS.hall.spots.push({id:'handbells20',x:45,y:68,hit:[38,54,15,12],wonder20:'bells',label:'Eight little handbells'});
 ROOMS.workshop.spots.push({id:'hold-lamp20',x:50,y:65,hit:[47,41,6,10],wonder20:'keeper',label:'The keeper’s little work lamp'});
 ROOMS.kitchen.spots.push({id:'place-for-guest20',x:55,y:78,hit:[48,63,14,10],wonder20:'place',label:'A place laid at the table'});
 ROOMS.hall.blocked.push({polygon:[[37,62],[52,62],[52,66],[37,66]]});
 ROOMS.kitchen.blocked=ROOMS.kitchen.blocked||[];ROOMS.kitchen.blocked.push({polygon:[[48,69],[62,69],[62,74],[48,74]]});
 ROOMS.grandmother.blocked=ROOMS.grandmother.blocked||[];ROOMS.grandmother.blocked.push({polygon:[[57,77],[63,77],[63,80],[57,80]]});
 for(const [room,polygon]of [['closet',[[44,47],[54,47],[54,50],[44,50]]],['grandmother',[[65,62],[75,62],[75,65],[65,65]]]]){ROOMS[room].blocked=ROOMS[room].blocked||[];ROOMS[room].blocked.push({polygon});}
 for(const [room,seat]of Object.entries(SEATS20))ROOMS[room].spots.push({id:'seat20-'+room,x:seat.x,y:seat.y,wonder20:'seat',label:seat.label});
 for(const [room,seat]of Object.entries(SEATS20))if(!seat.warm){const geometry=benchGeometry24(seat,room);ROOMS[room].blocked=ROOMS[room].blocked||[];ROOMS[room].blocked.push(geometry.obstacle);const spot=ROOMS[room].spots.find(function benchSpot(t){return t.id==='seat20-'+room;/* Code by Daniel using ChatGPT November 14, 2026 */});Object.assign(spot,{x:geometry.stand.x,y:geometry.stand.y,hit:geometry.hit});}
 // Physical shelves reuse the existing walkable approach, not an extra obstacle across a door.
 for(const [id,s]of Object.entries(SHELVES20))ROOMS[s.room].spots.push({id:'bookshelf20-'+id,x:s.x,y:s.y,hit:id==='home'?[44,18,13,23]:[65,52,10,9],wonder20:'shelf',shelf:id,label:'The Christmas bookshelf'});
 save();
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function setupWonder20(){
 $('#viewport').insertAdjacentHTML('beforeend','<aside id="wonder-rest20" class="wonder-rest20" hidden><span>Stay as long as you like.</span><button id="wonder-rise20">Stand up</button></aside><aside id="bethlehem-watch20" hidden><p class="ancient-scroll20">Be still a little while.<br><small>Look upon the One who came to dwell with us.</small></p><button id="bethlehem-return20">Return <kbd>Esc</kbd></button></aside>');
 $('#wonder-rise20').onclick=standUp20;$('#bethlehem-return20').onclick=endBethlehem20;
 $('#screenshot').onclick=openPictureCard20;
 document.addEventListener('pointerdown',holidayGesture20,{once:true});
 document.addEventListener('keydown',holidayGesture20,{once:true});
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function wonderWatching20(){
 return !!g.wonder20?.watch;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function wonderTargets20(all){
 if(!g.wonder20)return all;
 const w=wonderState20();
 for(const lamp of LAMPS20)if(lamp.room===state.room){const h=lampHead20(lamp);all.push({id:'light20-'+lamp.id,x:lamp.x,y:lamp.y,hit:[h.x-2,h.y-7,5,10],wonder20:'lamp',lamp:lamp.id,label:w.lights[lamp.id]?'Your lantern light':'Light the little lamp'});}
 for(const find of BOOK_FINDS20)if(find.room===state.room&&!w.finds[find.id])all.push({...find,id:'find20-'+find.id,find:find.id,wonder20:'find'});
 if(state.room==='mountain'&&state.tales.rescued)all.push({id:'valley20',x:54,y:82,wonder20:'valley',label:'Look down at the valley lights'});
 if(state.room==='snowgarden'){
  all.push({id:'window20',x:28,y:50,hit:[24,27,8,11],wonder20:'waiting',label:'The light in Grandmother’s window'},{id:'bulbs20',x:36,y:79,wonder20:'bulbs',label:'A little bed beneath the snow'});
  if(state.tales.converted&&!w.kindness.invited)all.push({id:'knock20',x:27,y:60,wonder20:'knock',label:'Rime waits beside the gate'});
 }
 if(state.room==='grandmother'&&state.tales.converted&&w.kindness.invited)all.push({id:'rime-guest20',x:79,y:81,wonder20:'guest',label:'Rime beside the wood basket'});
 if(state.room==='rink'&&state.tales.converted)all.push({id:'rime-skate20',x:g.wonder20.rime.x,y:g.wonder20.rime.y,wonder20:'rime',label:'Rime, trying to skate'});
 if(state.room==='hall')all.push({id:'dog20',x:59,y:82,wonder20:'dog',label:'A dog beside the hearth'},{id:'nut20',x:nutcrackerPoint20().x,y:nutcrackerPoint20().y,wonder20:'nutcracker',label:'The nutcracker has moved again'});
 if(['snowgarden','pinepass','trail','mountain'].includes(state.room)&&!state.riding&&!Walker.moving&&!all.some(function near(t){return Math.hypot(t.x-state.player.x,t.y-state.player.y)<6;/* Code by Daniel using ChatGPT November 13, 2026 */}))all.push({id:'angel20',x:state.player.x+2,y:state.player.y,wonder20:'angel',label:'Make a snow angel here'});
 if(state.room==='clockshop')for(const [id,x]of [['widow',83],['family',53],['robin',25]]){
  const toy=TOYS.find(function owned(t){return t.owner===id;/* Code by Daniel using ChatGPT November 13, 2026 */});
  if(toyStatus(toy.id)==='delivered')all.push({id:'play-neighbour20-'+id,x,y:76,wonder20:id,label:{widow:'Wind Mrs Bell’s bird',family:'Roll the train with Samir',robin:'Read with Robin'}[id]});
 }
 // Prefer the dedicated book spines over the old co-located library hit.
 return all.filter(function keep(t){return !(t.id==='bedroom-books'||t.id==='cottage-reading-nook') && !(t.id?.startsWith('remembered-')&&state.room==='clockshop');/* Code by Daniel using ChatGPT November 13, 2026 */});
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function wonderAction20(t){
 if(t.picture!==undefined&&t.picture!==null){ornamentForGift20({id:'picture:'+t.picture});}
 if(t.gift&&t.card&&!known(t.card)){openGift20(t);return true;}
 if(!t.wonder20)return false;
 const kind=t.wonder20,w=wonderState20();
 if(kind==='lamp'){w.lights[t.lamp]=true;save();rumble20(.12,.15);toast('A little light stays behind you.');}
 else if(kind==='seat')sitDown20(SEATS20[state.room]);
 else if(kind==='bethlehem')beginBethlehem20();
 else if(kind==='shelf')openBookshelf20(t.shelf);
 else if(kind==='tree')openTree20();
 else if(kind==='find')findBook20(t.find);
 else if(kind==='angel')makeSnowAngel20();
 else if(kind==='rime')rimePondMenu20();
 else if(kind==='knock')rimeKnock20();
 else if(kind==='guest')startDialogue09('rime',[['npc','I brought enough wood for the night. Grandmother says I can stand by the basket.'],['elf','Would you like a chair?'],['npc','I like these people. I should prefer to leave them with all their chairs.']]);
 else if(kind==='waiting')waitingLamp20();
 else if(kind==='bulbs')startDialogue09('grandmother',[['npc','I planted them in October. Nothing to see yet.'],['elf','Are they all right under there?'],['npc','Quite. Some good things do their growing where you cannot see.']]);
 else if(kind==='place'){w.placeSet=!w.placeSet;save();toast(w.placeSet?'You put a cup beside the empty place. There is room for another.':'You set the cup back. The place is still kept.');}
 else if(kind==='dog'){g.wonder20.pet=3;rumble20(.12,.18);toast('His tail thumps twice. He makes room beside the fire.');}
 else if(kind==='nutcracker')startDialogue09('keeper',[['npc','I put him on the mantel. I am almost certain.'],['elf','Perhaps he wanted a better view.'],['npc','Then we had better leave him his view.']]);
 else startNeighbour20(kind);
 return true;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function ornamentForGift20(card){
 if(!g.wonder20||!card)return;wonderState20().ornaments[card.id]=true;save();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function openGift20(t){
 beginGift21(t);
 /* Code by Daniel using ChatGPT November 13, 2026 */
}

function openTree20(){
 beginRoomPlay21('tree');
 /* Code by Daniel using ChatGPT November 13, 2026 */
}

function renderTree20(){
 if(g.wonder20?.play21?.mode?.kind==='tree')refreshRoomTray21();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}

function sitDown20(seat){
 if(!seat)return;closePanel();const end=safeRoomArrival({x:seat.x,y:seat.y+4});state.player=end;g.steps=[];g.pending=null;g.velocity={x:0,y:0};g.wonder20.lastPlayer={...end};g.wonder20.lastFoot={...end};g.wonder20.seat={...seat,room:state.room,x:end.x,y:end.y,seatX:seat.x,seatY:seat.y,birdX:seat.x*15.36+43,birdY:seat.y*10.24-42,age:0};$('#wonder-rest20').hidden=false;g.direction=0;save();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function standUp20(){
 const q=g.wonder20;if(q){if(q.seat&&!q.seat.warm&&q.seat.age>3)q.departBird={x:q.seat.birdX,y:q.seat.birdY,age:0,room:q.seat.room};q.seat=null;}const el=$('#wonder-rest20');if(el)el.hidden=true;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function beginBethlehem20(){
 closePanel();standUp20();g.wonder20.watch={age:0,initial:{...sceneView()},player:{...state.player}};g.steps=[];g.pending=null;g.velocity={x:0,y:0};g.keys.clear();document.body.classList.add('watching-bethlehem20');$('#bethlehem-watch20').hidden=false;$('#bethlehem-return20').focus({preventScroll:true});
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function wonderArrival20(id){
 const q=g.wonder20;if(!q)return;if(id==='hall'&&q.room!=='hall')q.nutVisit++;q.room=id;q.footprints=[];q.skateLines=[];q.lastPlayer={...state.player};q.lastFoot={...state.player};q.mouse=0;q.mouseAway=false;q.rime.towing=false;q.angelPose=0;standUp20();paintingArrival21();if(q.watch)endBethlehem20();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function endBethlehem20(){
 if(!wonderWatching20())return false;g.wonder20.watch=null;document.body.classList.remove('watching-bethlehem20');$('#bethlehem-watch20').hidden=true;g.keys.clear();TouchStick.reset();canvas.focus({preventScroll:true});return true;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function bethlehemCamera20(){
 const watch=g.wonder20.watch,t=watch.age;if(!state.motion)return {zoom:1,left:0,top:0};
 if(t<3){const k=ease(t/3);return {zoom:watch.initial.zoom+(1-watch.initial.zoom)*k,left:watch.initial.left*(1-k),top:watch.initial.top*(1-k)};}
 if(t<8)return {zoom:1,left:0,top:0};
 const phase=(t-8)/14*Math.PI*2,zoom=1+.18*(.5-.5*Math.cos(phase));
 return {zoom,left:(1536-1536/zoom)*(.5+.5*Math.sin(phase*.5)),top:(1024-1024/zoom)*(.3+.3*Math.cos(phase))};
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function waitingLamp20(){
 startDialogue09('grandmother',[['elf','Who is the lamp for?'],['npc',state.tales.converted?'Rime, if he comes. But a lamp is not a promise that a door must open before its people are ready.':'For whoever is still outside. I have been late myself.'],['npc','You can keep a light for someone and give them room to knock.']]);
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function rimeKnock20(){
 const w=wonderState20();w.kindness.knocked=true;save();
 startDialogue09('rime',[['npc','I brought dry wood. May I come in?']],null,{choices:[{id:'welcome',label:'Let me ask Grandmother. Please wait here.',onSelect:function ask(){startDialogue09('grandmother',[['elf','Rime is at the gate. He brought some wood. May he come in?'],['npc','Yes. Thank you for asking. He can leave his great boots by the door.']],function invite(){w.kindness.invited=true;save();closePanel();/* Code by Daniel using ChatGPT November 13, 2026 */});/* Code by Daniel using ChatGPT November 13, 2026 */}},{id:'not-yet',label:'Not just yet. We can sit together outside.',onSelect:function boundary(){w.kindness.boundary=true;save();startDialogue09('rime',[['npc','All right. I can wait.'],['elf','I am glad you came.'],['npc','I shall try not to sit on the bench. It looks expensive.']]);/* Code by Daniel using ChatGPT November 13, 2026 */}}]});
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function christmasGospel20(){
 startDialogue09('grandmother',[['npc','Christmas is good news because the child in the manger is Jesus, God the Son. He came among us as a real man.'],['elf','Why did he come?'],['npc','We have sinned against God. We cannot mend that by being impressive or useful. Jesus gave himself for sinners on the cross and rose bodily from the dead.'],['npc','Turn to him and trust him. Forgiveness and life with God are his gift, not wages for being good.'],['elf','And then?'],['npc','Then we learn to love our neighbours because he has loved us. Even on the days when it costs us something.']],null,{choices:[{id:'more',label:'May we read some of his words?',onSelect:function words(){const c=cards.find(function grace(c){return reference09(c)==='Ephesians 2:8-10';/* Code by Daniel using ChatGPT November 13, 2026 */});if(c)discover(c);else closePanel();/* Code by Daniel using ChatGPT November 13, 2026 */}},{id:'think',label:'Thank you. I would like to think about that.',onSelect:closePanel}]});
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function availableShelfBooks20(shelf){
 return [...SHELVES20[shelf].books,...Array.from(EXTRA_BOOKS20.values()).filter(function at(b){return b.shelf===shelf;/* Code by Daniel using ChatGPT November 14, 2026 */}).map(function id(b){return b.id;/* Code by Daniel using ChatGPT November 14, 2026 */})];
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function registerLibraryBook20(book){
 if(!book||book.approved!==true||!/^[-a-z0-9]{1,64}$/.test(book.id)||!SHELVES20[book.shelf]||typeof book.title!=='string'||!Array.isArray(book.pages)||!book.pages.length||book.pages.some(function invalid(p){return !Array.isArray(p)||p.length!==2||p.some(function notText(t){return typeof t!=='string';/* Code by Daniel using ChatGPT November 13, 2026 */});/* Code by Daniel using ChatGPT November 13, 2026 */}))return false;
 if(WINTER_READINGS[book.id]&&!EXTRA_BOOKS20.has(book.id))return false;
 EXTRA_BOOKS20.set(book.id,{...book});WINTER_READINGS[book.id]={title:book.title,kind:book.genre||'A Christmas story',pages:book.pages.map(function copy(p){return [...p];/* Code by Daniel using ChatGPT November 13, 2026 */})};return true;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function openBookshelf20(shelf){
 if(!SHELVES20[shelf])return;const ids=availableShelfBooks20(shelf);
 showPanel('<h2 id="panel-title">'+(shelf==='home'?'The upstairs bookshelf':'Grandmother’s bookshelf')+'</h2><div class="bookcase20" role="group" aria-label="Choose a book">'+ids.map(function spine(id,i){const b=WINTER_READINGS[id];return '<button class="book-spine20 spine-'+(i%4)+'" data-shelf-book="'+escapeHTML(id)+'"><span>'+escapeHTML(b.title)+'</span></button>';/* Code by Daniel using ChatGPT November 13, 2026 */}).join('')+'<span class="book-space20" aria-hidden="true"></span></div><div id="shelf-description20"></div><button id="shelf-all20">Browse the reading nook</button><button id="shelf-leave20">Back to the room</button>','');
 for(const button of panel.querySelectorAll('[data-shelf-book]'))button.onclick=function chooseBook(){const id=button.dataset.shelfBook,b=WINTER_READINGS[id],meta=BOOK_SHELF10[id]||[EXTRA_BOOKS20.get(id)?.genre||'Christmas story',EXTRA_BOOKS20.get(id)?.blurb||'A story for a quiet evening.'],mark=playState10().bookmarks[id];$('#shelf-description20').innerHTML='<h3>'+escapeHTML(b.title)+'</h3><p>'+escapeHTML(meta[1])+'</p><button id="shelf-read20">'+(Number.isInteger(mark)&&mark>=0?'Keep reading':'Open the book')+'</button>';$('#shelf-read20').onclick=function read(){if(EXTRA_BOOKS20.get(id)?.advent)openAdventBook20(id);else readWonder(id,Number.isInteger(mark)?mark:-1);/* Code by Daniel using ChatGPT November 13, 2026 */};/* Code by Daniel using ChatGPT November 18, 2026 */};
 $('#shelf-all20').onclick=showLibrary10;$('#shelf-leave20').onclick=closePanel;
 /* Code by Daniel using ChatGPT November 18, 2026 */}
function findBook20(id){
 const f=BOOK_FINDS20.find(function found(f){return f.id===id;/* Code by Daniel using ChatGPT November 13, 2026 */});if(!f)return;wonderState20().finds[id]=true;save();
 const shelf=SHELVES20.home.books.includes(f.book)?'home':'grandmother';
 startDialogue09('keeper',[['elf',f.label.replace(/^A /,'A ')+'!'],['npc','That belongs with a story. You will find it on '+(shelf==='home'?'the upstairs bookshelf.':'Grandmother’s bookshelf.')]],function book(){openBookshelf20(shelf);/* Code by Daniel using ChatGPT November 13, 2026 */});
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function bookComfort20(id,page){
 const book=$('.little-book');if(!book)return;const w=wonderState20();
 book.insertAdjacentHTML('beforeend','<div class="book-comfort20"><label><input id="bedtime20" type="checkbox" '+(w.bedtime?'checked':'')+'> Bedtime reading</label><label><input id="read-together20" type="checkbox" '+(w.together?'checked':'')+'> Read together</label></div>');
 for(const [selector,key]of [['#bedtime20','bedtime'],['#read-together20','together']])$(selector).onchange=function preference(e){w[key]=e.target.checked;save();applyBookComfort20();/* Code by Daniel using ChatGPT November 13, 2026 */};
 applyBookComfort20();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function applyBookComfort20(){
 const w=wonderState20();document.body.classList.toggle('bedtime20',!!w.bedtime&&!!$('.little-book'));for(const [i,p]of Array.from(panel.querySelectorAll('.book-reading>p')).entries()){p.dataset.reader=w.together?'Reader '+(i%2+1):'';p.classList.toggle('shared-reading20',w.together);}
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function grandmotherPresence20(){
 quietChairTalk21();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}

function lanternErrand20(){
 const w=wonderState20();if(w.errandOffered){closePanel();return;}w.errandOffered=true;save();
 startDialogue09('grandmother',[['npc','If you feel like carrying a little Christmas outside this valley, you could ask someone at home who might like a card or a call.'],['npc','No need to tell me what you choose. There is cocoa here when you come back.']],null,{choices:[{id:'consider',label:'I will think of someone.',onSelect:closePanel},{id:'stay',label:'I would like to stay here a little longer.',onSelect:closePanel}]});
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function rimePondMenu20(){
 if(!state.tales.converted)return;
 startDialogue09('rime',[['npc','The pond is considerably more slippery than it looks. I may have offended it.']],null,{choices:[{id:'tow',label:'Would you like to take my hand?',onSelect:function tow(){g.wonder20.rime.towing=true;closePanel();/* Code by Daniel using ChatGPT November 13, 2026 */}},{id:'watch',label:'I can show you a little circle.',onSelect:function skating(){g.wonder20.rime.towing=false;g.wonder20.rime.trying=true;closePanel();/* Code by Daniel using ChatGPT November 13, 2026 */}},{id:'snowball',label:'Shall we toss snowballs at the snowbank?',onSelect:function balls(){openWonderScene20('snowballs');/* Code by Daniel using ChatGPT November 13, 2026 */}},{id:'wood',label:'Shall we take the wood to Grandmother?',onSelect:function wood(){wonderState20().rimePlace21='snowgarden';save();closePanel();toast('Rime takes the path towards the garden gate.');/* Code by Daniel using ChatGPT November 13, 2026 */}},{id:'visit',label:'May we talk for a little while?',onSelect:function visit(){rimeLaterVisit();/* Code by Daniel using ChatGPT November 13, 2026 */}},{id:'feeling',label:'Are you cross, or just worried about falling?',onSelect:function feeling(){startDialogue09('rime',[['npc','Worried. I make a cross face when I am worried. It is very inconvenient.'],['elf','You can tell me. We can go slowly.'],['npc','Good. Slowly is becoming my best speed.']]);/* Code by Daniel using ChatGPT November 13, 2026 */}}]});
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function startNeighbour20(kind){
 beginRoomPlay21(kind);
 /* Code by Daniel using ChatGPT November 13, 2026 */
}

function stopWonderScene20(){
 const s=g.wonder20?.scene;if(!s)return;s.abort.abort();g.wonder20.scene=null;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function openWonderScene20(kind){
 beginRoomPlay21(kind==='snowballs'?'snowballs':kind);
 /* Code by Daniel using ChatGPT November 13, 2026 */
}

function windAngle20(angle){
 const s=g.wonder20?.scene;if(s?.kind!=='widow'||s.song)return;
 if(s.lastAngle!==null&&s.lastAngle!==undefined){const delta=Math.atan2(Math.sin(angle-s.lastAngle),Math.cos(angle-s.lastAngle));if(Math.abs(delta)<1.4)s.wind+=Math.abs(delta)/(Math.PI*2);}s.lastAngle=angle;if(s.wind>=3)beginBirdSong20(s);
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function beginBirdSong20(s){
 if(s.song)return;s.song=8;s.note=0;s.nextNote=0;$('#wonder-message20').textContent='The little bird lifts his wing and begins.';
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function ringBell20(i){
 const note=[523.25,587.33,659.25,698.46,784,880,987.77,1046.5][i];if(!note)return;
 if(state.sound){AudioScene.unlock();AudioScene.tone(note,1.3,.16,'sine',true);}g.wonder20.bells[i]=g.wonder20.age+.7;rumble20(.06,.08);
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function wonderSceneAction20(action,value){
 const s=g.wonder20.scene;if(!s)return;
 if(action==='leave'){closePanel();return;}
 if(action==='bell')ringBell20(Number(value));
 if(action==='wind'&&!s.song){s.wind+=1;if(s.wind>=3)beginBirdSong20(s);}
 if(action==='roll'&&!s.rolling){s.rolling=2;s.rolls++;wonderState20().kindness.family=true;save();$('#wonder-message20').textContent='Samir catches it with both hands. “And back to you!”';}
 if(action==='hold'){s.holding=!s.holding;const b=panel.querySelector('[data-w20=hold]');b.textContent=s.holding?'Set the lamp down':'Hold the lamp steady';}
 if(action==='throw'&&!s.throwAge){s.throwAge=.001;s.throws++;rumble20(.1,.1);}
 if(action==='read'||action==='listen'){wonderState20().kindness.robin=true;save();startDialogue09('robin',action==='read'?[['elf','The window makes a golden lane.'],['npc','Across the snow, across the rain.'],['elf','A little light, a welcome through—'],['npc','I kept the other line for you.']]:[['npc','The window makes a golden lane.'],['elf','Across the snow, across the rain.'],['npc','A little light, a welcome through—'],['elf','I kept the other line for you.']]);}
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function neighbourReward20(kind){
 const w=wonderState20();w.kindness[kind]=true;save();
 const lines={widow:[['npc','My husband made the tune a little longer at the end. He said I always needed one more stitch.'],['elf','May I hear it again sometime?'],['npc','Of course. And next time you must choose which thread I use.']],keeper:[['npc','There. Now hold out your hand.'],['elf','What is it?'],['npc','The shaving. See how it curls? You kept the light where I needed it. That little curl is yours.']]};
 startDialogue09(kind,lines[kind]||[['npc','Thank you for staying.']]);
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function wonderPanelPad20(move,press){
 const s=g.wonder20?.scene;if(!s||s.kind!=='widow')return false;
 if(press.b||press.start){closePanel();return true;}
 if(Math.hypot(move.x,move.y)>.45){windAngle20(Math.atan2(move.y,move.x));return true;}
 s.lastAngle=null;return false;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function coopPad20(samples){
 if(!g.wonder20)return null;g.wonder20.coopMove=null;
 if(!wonderState20().coop||samples.length<2||!state.tales.snowman.alive)return null;
 const first=samples[0],second=samples[1];g.wonder20.coopMove={x:second.r.x,y:second.r.y};
 return {move:{x:first.r.x,y:first.r.y},press:first.r};
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function rumble20(duration=.1,strength=.15){
 if(!g.wonder20||!wonderState20().rumble||!state.motion)return;
 let pads=[];try{pads=Array.from(navigator.getGamepads?.()||[]);}catch{return;}
 for(const pad of pads){const actuator=pad?.vibrationActuator;if(actuator?.playEffect)try{Promise.resolve(actuator.playEffect('dual-rumble',{startDelay:0,duration:duration*1000,weakMagnitude:strength,strongMagnitude:strength*.5})).catch(function unsupported(){/* Code by Daniel using ChatGPT November 13, 2026 */});}catch{}}
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function holidayGesture20(){
 if(!g.wonder20||!state.sound)return;const d=new Date();if(d.getMonth()!==11||![24,25].includes(d.getDate()))return;const day=localStoryDay();if(wonderState20().holidayDays[day])return;wonderState20().holidayDays[day]=true;save();[7,5,3,0].forEach(function toll(n,i){setTimeout(function bell(){if(state.sound)ringBell20(n);/* Code by Daniel using ChatGPT November 13, 2026 */},i*600);/* Code by Daniel using ChatGPT November 13, 2026 */});
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function wonderSettings20(){
 const w=wonderState20();$('#panel-content').insertAdjacentHTML('beforeend','<details><summary>Playing and reading together</summary><p>A second device can join your snow friend. Use a keyboard and controller, or two controllers. Press its action button to tip his hat.</p><label class="setting-check"><input id="together-setting20" type="checkbox" '+(w.together?'checked':'')+'> Mark two readers’ turns</label><label class="setting-check"><input id="rumble20" type="checkbox" '+(w.rumble?'checked':'')+'> Gentle controller vibration, where supported</label></details>');
 for(const [id,key]of [['together-setting20','together'],['rumble20','rumble']])$('#'+id).onchange=function setting(e){w[key]=e.target.checked;save();/* Code by Daniel using ChatGPT November 13, 2026 */};
 /* Code by Daniel using ChatGPT November 13, 2026 */
}

function nutcrackerPoint20(){
 return [{x:63,y:58},{x:29,y:75},{x:74,y:77},{x:48,y:68}][g.wonder20.nutVisit%4];
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function snowOutdoors20(room=state.room){
 return ['rink','sleigh','pinepass','trail','snowgarden','mountain'].includes(room);
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function makeSnowAngel20(){
 if(state.riding||!snowOutdoors20()||!Exploration.free(state.player,roomMap(),true))return;
 const q=g.wonder20;g.steps=[];g.pending=null;g.velocity={x:0,y:0};q.snowAngels.push({room:state.room,x:state.player.x,y:state.player.y});q.snowAngels=q.snowAngels.slice(-12);q.angelPose=state.motion?1.2:0;toast('Two wings, a warm hat, and a little snow down your collar.');
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function updateWonder20(dt){
 const q=g.wonder20;if(!q||document.hidden||g.paused)return;q.age+=dt;
 if(q.room!==state.room)wonderArrival20(state.room);
 if(q.watch){q.watch.age+=dt;const scroll=$('.ancient-scroll20');if(scroll)scroll.style.opacity=String(Math.max(0,1-(q.watch.age-5)/3));}
 const moved=Math.hypot(state.player.x-q.lastPlayer.x,state.player.y-q.lastPlayer.y);
 if(q.seat){q.seat.age+=dt;const seatMoved=q.seat.owner28===2?Math.hypot(g.coop28.player.x-q.seat.x,g.coop28.player.y-q.seat.y):moved;if(seatMoved>.15)standUp20();else if(q.seat.room==='grandmother'&&q.seat.age>6&&!q.play21.chairTalkVisit&&!panel.open)quietChairTalk21();}
 if(!panel.open&&!g.transition){
  const snow=snowOutdoors20(),ice=state.room==='rink'&&onIce();q.hatSnow=clamp(q.hatSnow+dt*(snow?.012:q.seat?.warm?-.22:-.025));
  if(moved>.025&&Math.hypot(state.player.x-q.lastFoot.x,state.player.y-q.lastFoot.y)>1.1){
   if(ice){q.skateLines.push({from:{...q.lastFoot},to:{...state.player}});q.skateLines=q.skateLines.slice(-420);}
   else if(snow&&!state.riding){q.footprints.push({x:state.player.x,y:state.player.y,age:0,side:q.footprints.length%2,dir:g.direction});q.footprints=q.footprints.slice(-160);}
   q.lastFoot={...state.player};
  }
  if(snow&&moved>.01&&['pinepass','trail'].includes(state.room)&&Math.hypot(state.player.x-46,state.player.y-60)<5&&q.age>(q.boughAt||0)+6){q.boughAt=q.age;q.snowBursts.push({x:46,y:56,age:0});rumble20(.1,.12);}
  if(state.room==='closet'){const near=Math.hypot(state.player.x-30.5,state.player.y-54.5)<18;if(near||q.mouseAway){q.mouseAway=true;q.mouse=Math.min(1,q.mouse+dt*.8);}}
  if(state.room==='rink'&&state.tales.converted){const r=q.rime;if(r.towing){const dx=state.player.x-r.x,dy=state.player.y-r.y;if(Math.hypot(dx,dy)>7){r.x=Math.max(31,Math.min(74,r.x+Math.sign(dx)*dt*7));r.y=Math.max(53,Math.min(78,r.y+Math.sign(dy)*dt*5));}}else if(r.trying&&state.motion){r.angle+=dt*.35;r.x=65+Math.sin(r.angle)*5;r.y=65+Math.sin(r.angle*2)*2;}}
  if(state.riding&&state.sound&&moved>.03&&q.age>q.bellAt){q.bellAt=q.age+Math.max(.18,.65-moved*2);AudioScene.tone(1568,.15,.025);}
 }
 q.lastPlayer={...state.player};q.pet=Math.max(0,q.pet-dt);q.angelPose=Math.max(0,(q.angelPose||0)-dt);
 if(q.departBird){const b=q.departBird;b.age+=dt;if(b.x+b.age*210>1650||b.y-b.age*95<-90||b.age>15)q.departBird=null;}/* The bench bird flies until it is off the painting. Claude, November 18, 2026 */
 for(const p of q.footprints)p.age+=dt;q.footprints=q.footprints.filter(function fresh(p){return p.age<32;/* Code by Daniel using ChatGPT November 13, 2026 */});
 for(const b of q.snowBursts)b.age+=dt;q.snowBursts=q.snowBursts.filter(function falling(b){return b.age<2;/* Code by Daniel using ChatGPT November 13, 2026 */});
 if(q.scene){const s=q.scene;if(!s.root.isConnected){stopWonderScene20();return;}s.age+=dt;s.rolling=Math.max(0,s.rolling-dt);
  if(s.song){s.song=Math.max(0,s.song-dt);s.nextNote-=dt;if(s.nextNote<=0){if(state.sound)AudioScene.tone([784,988,880,1046.5,880,784,659.25,784][s.note++%8],.55,.1,'sine',true);s.nextNote=.8;}if(!s.song){neighbourReward20('widow');return;}}
  if(s.holding){s.hold+=dt;if(s.hold>=3){neighbourReward20('keeper');return;}}
  if(s.throwAge){s.throwAge+=dt;if(s.throwAge>1.5){s.throwAge=0;$('#wonder-message20').textContent=s.throws%2?'“I was aiming for the tree,” says Rime. The tree is behind him.':'He brushes snow off his nose and grins.';}}
  drawWonderScene20(s);
 }
 /* Code by Daniel using ChatGPT November 13, 2026 */
/* Code by Daniel using ChatGPT November 19, 2026 */
}
function wonderLayers20(){
 return paintingLayers21();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}

function ellipse20(c,x,y,rx,ry,color){
 c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function drawSnowMarks20(){
 paintSnowDetails22();
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function drawLamp20(lamp){
 const h=lampHead20(lamp),x=h.x*15.36,y=h.y*10.24,lit=!!wonderState20().lights[lamp.id];ctx.save();const s=depthScale({x:lamp.x,y:lamp.y});ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle='#66563f';ctx.fillRect(-3,-25,6,170);ctx.fillStyle='#343e35';ctx.fillRect(-15,-29,30,38);ctx.beginPath();ctx.moveTo(-19,-29);ctx.lineTo(0,-44);ctx.lineTo(19,-29);ctx.fill();ctx.fillStyle=lit?'#ffe3a1':'#7b8680';ctx.fillRect(-10,-24,20,25);
 if(lit){const glow=ctx.createRadialGradient(0,-10,1,0,-10,80);glow.addColorStop(0,'#ffe1a04d');glow.addColorStop(1,'#ffe1a000');ctx.fillStyle=glow;ctx.fillRect(-80,-90,160,160);}ctx.restore();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function drawBench20(){
 const b=SEATS20[state.room];if(b.warm){if(state.room==='grandmother')drawFiresideChair20(b);return;}const x=b.x*15.36,y=b.y*10.24;ctx.save();ctx.strokeStyle='#74614b';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(x-48,y-16);ctx.lineTo(x+48,y-16);ctx.moveTo(x-44,y-42);ctx.lineTo(x+44,y-42);ctx.moveTo(x-37,y-42);ctx.lineTo(x-37,y+2);ctx.moveTo(x+37,y-42);ctx.lineTo(x+37,y+2);ctx.stroke();ctx.restore();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function drawBookshelfWorld20(){
 const home=state.room==='closet',x=(home?49:70)*15.36,y=(home?49:65)*10.24,h=home?235:132,w=home?145:126,ids=availableShelfBooks20(home?'home':'grandmother');ctx.save();ctx.fillStyle='#573d2d';ctx.fillRect(x-w/2,y-h,w,h);ctx.fillStyle='#392e25';ctx.fillRect(x-w/2+8,y-h+8,w-16,h-16);for(let row=0;row<2;row++){const yy=y-h/2*row-8;ctx.fillStyle='#9a714c';ctx.fillRect(x-w/2,yy,w,7);for(let i=0;i<ids.length;i++){if(Math.floor(i/5)!==row)continue;const bx=x-w/2+13+(i%5)*21;ctx.fillStyle=['#39604c','#a75343','#b69758','#435b72'][i%4];ctx.fillRect(bx,yy-h*.34,17,h*.34);ctx.fillStyle='#e0c98d';ctx.fillRect(bx+2,yy-h*.28,13,2);ctx.fillRect(bx+2,yy-9,13,2);}}ctx.restore();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function drawRimeSkating20(){
 const r=g.wonder20.rime,x=r.x*15.36,y=r.y*10.24,scale=depthScale(r),h=216*scale;shadow(x,y,h*.3,7,.16);ctx.save();ctx.translate(x,y);ctx.rotate(state.motion?Math.sin(g.wonder20.age*1.7)*.085:0);paintSprite(g.rime[0],0,0,h);ctx.strokeStyle='#d2e5ed';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-h*.2,2);ctx.lineTo(-h*.03,2);ctx.moveTo(h*.04,2);ctx.lineTo(h*.2,2);ctx.stroke();ctx.restore();if(r.towing){ctx.strokeStyle='#d5bc90';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x-20,y-h*.45);ctx.lineTo(state.player.x*15.36,state.player.y*10.24-45*depthScale());ctx.stroke();}
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function drawWaitingRime20(){
 paintSprite(g.rime[0],27*15.36,60*10.24,190*depthScale({x:27,y:60}));ctx.save();ctx.fillStyle='#8b613d';ctx.fillRect(27*15.36-28,60*10.24-65,49,14);ctx.restore();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function drawDog20(){
 const q=g.wonder20,x=59*15.36,y=82*10.24;ctx.save();ctx.translate(x,y);shadow(0,0,46,5,.15);const fur=ctx.createLinearGradient(-40,-50,30,0);fur.addColorStop(0,'#ac8052');fur.addColorStop(.6,'#93643f');fur.addColorStop(1,'#6e4b33');ellipse20(ctx,-3,-19,46,23,fur);ellipse20(ctx,27,-17,24,19,'#a77b4c');ellipse20(ctx,-30,-5,24,7,'#b28c5e');ellipse20(ctx,29,-3,31,6,'#b28c5e');ellipse20(ctx,34,-39,21,24,fur);ellipse20(ctx,22,-43,11,23,'#654733');ellipse20(ctx,47,-27,21,12,'#b99565');ellipse20(ctx,61,-30,6,4,'#392e25');ellipse20(ctx,43,-43,2.5,3,'#30291f');ellipse20(ctx,44,-44,1,1,'#f5e7c8');ctx.strokeStyle='#ceb187';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(33,-19);ctx.quadraticCurveTo(42,-17,54,-22);ctx.stroke();ctx.strokeStyle='#936341';ctx.lineWidth=10;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-39,-21);ctx.quadraticCurveTo(-58,-29,-64,-(q.pet&&state.motion?24+Math.sin(q.age*15)*14:34));ctx.stroke();ctx.restore();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function drawMouse20(){
 const q=g.wonder20,x=(31+q.mouse*12)*15.36,y=66*10.24;if(q.mouse>=1)return;ctx.save();ctx.globalAlpha=1-q.mouse*.6;ellipse20(ctx,x,y-5,12,6,'#8f8477');ellipse20(ctx,x+9,y-11,4,5,'#a19183');ctx.strokeStyle='#9a8a7c';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x-11,y-4);ctx.quadraticCurveTo(x-32,y-17,x-23,y+1);ctx.stroke();ctx.restore();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function drawHallBells20(){
 ctx.save();const bx=37*15.36,by=65*10.24;ctx.fillStyle='#6c4c34';ctx.fillRect(bx+10,by,7,33);ctx.fillRect(bx+215,by,7,33);ctx.beginPath();ctx.moveTo(bx,by);ctx.lineTo(bx+231,by);ctx.lineTo(bx+214,by-27);ctx.lineTo(bx+17,by-27);ctx.closePath();ctx.fillStyle='#a3794c';ctx.fill();ctx.fillStyle='#795234';ctx.fillRect(bx,by,231,8);for(let i=0;i<8;i++){const x=39*15.36+i*25,y=64*10.24;ellipse20(ctx,x,y,10,4,'#6c4e3070');ctx.fillStyle='#bc9650';ctx.beginPath();ctx.moveTo(x-9,y);ctx.lineTo(x-5,y-19);ctx.quadraticCurveTo(x,y-25,x+5,y-19);ctx.lineTo(x+9,y);ctx.fill();ctx.strokeStyle='#f4d592';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x-4,y-17);ctx.lineTo(x-6,y-3);ctx.stroke();ctx.strokeStyle='#6f5736';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x,y-22);ctx.lineTo(x,y-31);ctx.stroke();}ctx.restore();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function drawMovingNutcracker20(){
 const p=nutcrackerPoint20();if(g.wonders[2])paintSprite(g.wonders[2],p.x*15.36,p.y*10.24,65*depthScale(p));
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function drawGrandfather20(){
 paintGrandfather21();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}

function drawTreeOrnaments20(){
 const ids=Object.keys(wonderState20().ornaments);ctx.save();for(const [id,pos]of Object.entries(wonderState20().placements)){const row=Math.floor(pos/4),col=pos%4,x=(27+col*3.7+(row%2)) *15.36,y=(21+row*4)*10.24;ctx.fillStyle=['#c85444','#e8be63','#92b397','#88a4c4'][ids.indexOf(id)%4];ctx.beginPath();ctx.arc(x,y,6,0,Math.PI*2);ctx.fill();}ctx.restore();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function drawWonderPlayer20(){
 paintBreathAndSnow22();
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function drawWonderForeground20(){
 const q=g.wonder20;ctx.save();for(const b of q.snowBursts)if(state.motion)for(let i=0;i<18;i++){const x=b.x*15.36+Math.sin(i*13)*55,y=b.y*10.24-110+b.age*90+(i%5)*8;ellipse20(ctx,x,y,2.5,2,'#f8f9ef');}
 if(q.seat&&!q.seat.warm&&q.seat.age>3&&g.perchedCardinal){const x=q.seat.birdX,y=q.seat.birdY;if(q.seat.age>=5||!state.motion)paintSprite(g.perchedCardinal,x,y,34);else{const k=ease((q.seat.age-3)/2);ctx.save();ctx.translate(x-220*(1-k),y-95*(1-k));paintFlyingCardinal(g.cardinals[Math.floor(q.age*7)%4]);ctx.restore();}}
 if(q.departBird&&q.departBird.room===state.room&&state.motion){ctx.save();ctx.translate(q.departBird.x+q.departBird.age*210,q.departBird.y-q.departBird.age*95);paintFlyingCardinal(g.cardinals[Math.floor(q.age*7)%4]);ctx.restore();}
 if(state.room==='nativity'){const x=45*15.36,y=52*10.24;ctx.fillStyle='#b28f56';ctx.fillRect(x-24,y-65,48,62);ctx.fillStyle='#e3cf9d';ctx.fillRect(x-19,y-61,38,55);ellipse20(ctx,x,y-64,27,4,'#d7bc82');ellipse20(ctx,x,y-6,27,4,'#d7bc82');ctx.strokeStyle='#9b814f';ctx.lineWidth=1;for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(x-11,y-50+i*7);ctx.lineTo(x+11,y-50+i*7);ctx.stroke();}}
 if(state.room==='snowgarden'){const x=27*15.36,y=32*10.24;ctx.fillStyle='#ffdc8e';ctx.fillRect(x-8,y-15,16,28);const glow=ctx.createRadialGradient(x,y,1,x,y,75);glow.addColorStop(0,'#ffe0a047');glow.addColorStop(1,'#ffe0a000');ctx.fillStyle=glow;ctx.fillRect(x-75,y-75,150,150);ellipse20(ctx,36*15.36,79*10.24,63,12,'#dde4d8');ctx.strokeStyle='#89745a';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(36*15.36+42,79*10.24-2);ctx.lineTo(36*15.36+42,79*10.24-24);ctx.stroke();}
 const d=new Date();if(d.getMonth()===11&&[24,25].includes(d.getDate())&&snowOutdoors20()){ctx.fillStyle='#ffe9a8';drawStar(1160,114,13);}
 for(const find of BOOK_FINDS20)if(find.room===state.room&&!wonderState20().finds[find.id]){const x=find.x*15.36,y=find.y*10.24;ctx.fillStyle='#c4a45e';ctx.fillRect(x-8,y-16,16,13);ctx.fillStyle='#f0d89c';ctx.fillRect(x-5,y-13,10,3);}
 ctx.restore();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function drawWonderScene20(s){
 const canvas=$('#wonder-canvas20');if(!canvas)return;const c=canvas.getContext('2d');c.clearRect(0,0,900,520);const gradient=c.createLinearGradient(0,0,0,520);gradient.addColorStop(0,s.kind==='valley'?'#203d46':'#e8dbc0');gradient.addColorStop(1,s.kind==='valley'?'#9db3ba':'#bca780');c.fillStyle=gradient;c.fillRect(0,0,900,520);
 if(s.kind==='valley'){drawValley20(c);return;}
 ellipse20(c,450,420,330,47,'#8a704d44');
 if(s.kind==='bells'){for(let i=0;i<8;i++){const x=124+i*91,y=325,ring=(g.wonder20.bells[i]||0)>g.wonder20.age;c.save();c.translate(x,y);if(ring&&state.motion)c.rotate(Math.sin(s.age*30)*.1);c.fillStyle=ring?'#e4bd63':'#b2944f';c.beginPath();c.moveTo(-25,0);c.lineTo(-15,-60);c.quadraticCurveTo(0,-77,15,-60);c.lineTo(25,0);c.closePath();c.fill();ellipse20(c,0,0,26,7,'#785d33');c.fillStyle='#6e5638';c.fillRect(-5,-111,10,42);c.restore();}return;}
 const toy={widow:5,family:4}[s.kind];if(toy!==undefined){const f=g.toys[toy];if(f){const x=s.kind==='family'?230+(s.rolling?(state.motion?Math.sin((2-s.rolling)/2*Math.PI)*390:390):0):450;const y=370-(s.song&&state.motion?Math.sin(s.age*6)*4:0),h=s.kind==='family'?140:200;c.drawImage(f.canvas,x-h*f.w/f.h/2,y-h,h*f.w/f.h,h);}}
 if(s.kind==='widow'){c.save();c.translate(450,300);c.rotate((s.wind%1)*Math.PI*2);c.strokeStyle='#9b7a3c';c.lineWidth=8;c.beginPath();c.moveTo(0,0);c.lineTo(40,0);c.stroke();ellipse20(c,46,0,11,17,'#c8ac64');c.restore();if(s.song){c.font='35px Georgia';c.fillStyle='#6b6245';c.fillText('♪',540,185);c.fillText('♫',365,150);}}
 if(s.kind==='keeper'){c.fillStyle='#8a6745';c.fillRect(175,345,550,28);c.fillStyle='#546850';c.fillRect(360,293,145,45);const beam=c.createRadialGradient(445,300,10,445,300,s.holding?180:70);beam.addColorStop(0,'#fff0b3b3');beam.addColorStop(1,'#fff0b300');c.fillStyle=beam;c.fillRect(230,115,430,310);c.fillStyle='#b59a56';c.fillRect(s.holding?575:640,s.holding?205:300,26,62);c.fillStyle='#ffde83';c.fillRect(s.holding?580:645,s.holding?215:310,16,39);}
 if(s.kind==='robin'){c.fillStyle='#fff5d9';c.fillRect(220,185,460,210);c.strokeStyle='#c6b089';c.beginPath();c.moveTo(450,185);c.lineTo(450,395);c.stroke();c.fillStyle='#596a52';c.font='24px Georgia';c.fillText('The window makes',252,250);c.fillText('a golden lane…',252,290);c.fillText('Across the snow,',473,250);c.fillText('across the rain…',473,290);}
 if(s.kind==='snowballs'){c.fillStyle='#eef3ea';c.fillRect(0,340,900,180);const f=g.rime[0],h=270;c.save();c.translate(620,380);if(s.throwAge>.7&&state.motion)c.rotate(Math.sin(s.throwAge*5)*.09);c.drawImage(f.canvas,-h*f.w/f.h/2,-h,h*f.w/f.h,h);c.restore();if(s.throwAge){const p=state.motion?Math.min(1,s.throwAge):1;ellipse20(c,210+400*p,360-180*Math.sin(p*Math.PI),11,11,'#fffdf4');}c.fillStyle='#486249';c.fillRect(125,120,12,250);}
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function drawValley20(c){
 c.fillStyle='#d7e1dc';c.beginPath();c.moveTo(0,345);c.quadraticCurveTo(250,210,450,370);c.quadraticCurveTo(650,260,900,340);c.lineTo(900,520);c.lineTo(0,520);c.fill();
 for(let i=0;i<LAMPS20.length;i++){const x=140+i*126,y=300+Math.sin(i*2)*50;c.fillStyle='#66796d';c.fillRect(x-30,y,60,52);c.fillStyle='#e5e9dc';c.beginPath();c.moveTo(x-40,y);c.lineTo(x,y-34);c.lineTo(x+40,y);c.fill();if(wonderState20().lights[LAMPS20[i].id]){const glow=c.createRadialGradient(x,y+20,3,x,y+20,45);glow.addColorStop(0,'#ffe2a2c4');glow.addColorStop(1,'#ffe2a200');c.fillStyle=glow;c.fillRect(x-45,y-25,90,90);c.fillStyle='#ffe6a9';c.fillRect(x-9,y+9,18,21);}}
 c.fillStyle='#ffe6a9';for(let i=0;i<24;i++)ellipse20(c,(i*173+49)%900,(i*71+30)%210,1.5,1.5,'#ffe6a9');
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function openPictureCard20(){
 if(g.transition)return;g.cleanScene=true;let src;try{draw(performance.now());src=canvas.toDataURL('image/png');}finally{g.cleanScene=false;}
 showPanel('<h2 id="panel-title">A picture to keep or give</h2><canvas id="picture-preview20" width="1600" height="1200"></canvas><label>From <input id="picture-name20" maxlength="32" autocomplete="off" placeholder="Your name, if you like"></label><label><input id="picture-frame20" type="checkbox" checked> A Christmas frame</label><div class="row"><button id="picture-save20">Save the picture</button><button id="picture-print20">Print a card</button><button id="picture-back20">Back to the room</button></div>','');
 const image=new Image(),preview=$('#picture-preview20');
 const render=function renderCard(){const frame=$('#picture-frame20').checked;preview.width=frame?1600:1536;preview.height=frame?1200:1024;const c=preview.getContext('2d');c.fillStyle='#f2e9d3';c.fillRect(0,0,preview.width,preview.height);if(frame){c.strokeStyle='#416345';c.lineWidth=12;c.strokeRect(23,23,1554,1154);c.drawImage(image,80,65,1440,960);c.fillStyle='#345340';c.textAlign='center';c.font='42px Georgia';c.fillText('A little Christmas light for you',800,1095);const name=$('#picture-name20').value.trim();if(name){c.font='29px Georgia';c.fillText('From '+name,800,1140);}}else c.drawImage(image,0,0,1536,1024);/* Code by Daniel using ChatGPT November 13, 2026 */};
 image.onload=render;image.src=src;$('#picture-name20').oninput=render;$('#picture-frame20').onchange=render;
 $('#picture-save20').onclick=function download(){const a=document.createElement('a');a.href=preview.toDataURL('image/png');a.download='Christmas-Lantern-card.png';a.click();/* Code by Daniel using ChatGPT November 13, 2026 */};
 $('#picture-print20').onclick=function printCard(){const w=window.open('','_blank');if(!w){toast('Allow printing, or save it.');return;}w.document.title='A Christmas card';const img=w.document.createElement('img');img.style.cssText='width:100%;height:auto;display:block';img.onload=function printReady(){w.print();/* Code by Daniel using ChatGPT November 13, 2026 */};img.src=preview.toDataURL('image/png');w.document.body.style.margin='0';w.document.body.append(img);/* Code by Daniel using ChatGPT November 18, 2026 */};$('#picture-back20').onclick=closePanel;
 /* Code by Daniel using ChatGPT November 18, 2026 */}
function showRestitution20(owner,toy){
 const response={robin:'My bear! I kept a place for him beside the clock.',widow:'The little bird sings again. Thank you for bringing it home.',family:'Samir, look! Our train has its wheel again.'}[owner];
 if(!state.tales.converted){startDialogue09(owner,[['npc',response]]);return;}
 startDialogue09('rime',[['npc','I took this. I am sorry. I should have brought it back long ago.'],['elf','We have mended it. You can give it back yourself.'],['npc','I will be careful with the step.']],function childAnswers(){startDialogue09(owner,[['npc',response],['elf','Rime helped carry it home.']]);/* Code by Daniel using ChatGPT November 13, 2026 */});
 const portraits=$('.dialogue-portraits');portraits.hidden=true;portraits.insertAdjacentHTML('afterend','<canvas id="restitution20" width="740" height="240" aria-label="Rime carries the repaired toy toward its owner"></canvas>');g.wonder20.restitution={owner,toy:toy.id,age:0};drawRestitution20(0);
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function drawRestitution20(dt){
 const a=g.wonder20?.restitution,c=$('#restitution20')?.getContext('2d');if(!a||!c)return;a.age+=dt;c.clearRect(0,0,740,240);const p=state.motion?ease(Math.min(1,a.age/2)):1,x=180+p*180;
 for(const [frame,xx,h]of [[g.rime[0],x,210],[g.neighbors[{robin:0,widow:1,family:2}[a.owner]],565,150]])c.drawImage(frame.canvas,xx-h*frame.w/frame.h/2,230-h,h*frame.w/frame.h,h);
 const i=TOYS.findIndex(function toy(t){return t.id===a.toy;/* Code by Daniel using ChatGPT November 13, 2026 */}),f=g.toys[i+3];if(f)c.drawImage(f.canvas,x-25-55*f.w/f.h/2,100,55*f.w/f.h,55);
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function plainRopeRescue20(){
 startDialogue09('rime',[['elf','The rope is anchored. Push with your boots while I take in the slack.'],['npc','There. A foothold.'],['elf','One more step. I have you.']],function safe(){finishRimeChallenge('rescue');/* Code by Daniel using ChatGPT November 13, 2026 */},{finishLabel:'Help him over the edge'});
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function openAdventBook20(id,date=new Date()){
 const b=EXTRA_BOOKS20.get(id);if(!b||!b.approved||!b.advent)return;
 const today=date.getMonth()===11?Math.min(25,date.getDate())-1:-1;
 showPanel('<h2 id="panel-title">'+escapeHTML(b.title)+'</h2><p>Choose an evening’s reading. Every page stays here for you.</p><div class="advent-pages20">'+b.pages.map(function entry(page,i){return '<button data-advent20="'+i+'" '+(i===today?'aria-current="date"':'')+'>'+escapeHTML(page[0])+'</button>';/* Code by Daniel using ChatGPT November 13, 2026 */}).join('')+'</div>','');
 for(const el of panel.querySelectorAll('[data-advent20]'))el.onclick=function readEntry(){readWonder(id,Number(el.dataset.advent20));/* Code by Daniel using ChatGPT November 13, 2026 */};
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function drawGuestRime20(){
 paintSprite(g.rime[0],79*15.36,79*10.24,260);
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function refreshSpeakerPortrait20(d,line){
 repaintPortrait21(d,line);
 /* Code by Daniel using ChatGPT November 13, 2026 */
}

function lampHead20(lamp){
 return {x:lamp.x-2.2,y:lamp.y-145*depthScale(lamp)/10.24};
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function drawKitchenPlace20(){
 const x=55*15.36,y=74*10.24;ctx.save();ctx.strokeStyle='#715039';ctx.lineWidth=11;ctx.beginPath();ctx.moveTo(x-68,y-95);ctx.lineTo(x-68,y);ctx.moveTo(x+68,y-95);ctx.lineTo(x+68,y);ctx.stroke();const wood=ctx.createLinearGradient(x-105,y-140,x+105,y-80);wood.addColorStop(0,'#aa8054');wood.addColorStop(.5,'#c89a63');wood.addColorStop(1,'#78553b');ellipse20(ctx,x,y-110,108,31,wood);ellipse20(ctx,x-18,y-109,33,10,'#eee5cc');ellipse20(ctx,x-18,y-110,25,6,'#f8f0db');ctx.strokeStyle='#bdb8a0';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x-63,y-121);ctx.lineTo(x-63,y-100);ctx.stroke();if(wonderState20().placeSet){ctx.fillStyle='#e4dcc5';ctx.fillRect(x+45,y-137,25,24);ellipse20(ctx,x+57,y-137,13,4,'#b4a482');ctx.strokeStyle='#e4dcc5';ctx.lineWidth=4;ctx.beginPath();ctx.arc(x+72,y-126,7,-Math.PI/2,Math.PI/2);ctx.stroke();if(state.motion){ctx.globalAlpha=.2;ctx.strokeStyle='#f4f0dd';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x+57,y-145);ctx.quadraticCurveTo(x+48+Math.sin(g.wonder20.age)*5,y-158,x+57,y-170);ctx.stroke();}}ctx.restore();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function drawFiresideChair20(b){
 const x=b.x*15.36,y=b.y*10.24;ctx.save();ctx.strokeStyle='#765439';ctx.lineWidth=6;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x-33,y-19);ctx.lineTo(x-33,y+16);ctx.moveTo(x+33,y-19);ctx.lineTo(x+33,y+16);ctx.moveTo(x-40,y-15);ctx.lineTo(x-40,y-91);ctx.quadraticCurveTo(x,y-119,x+40,y-91);ctx.lineTo(x+40,y-15);ctx.stroke();const cushion=ctx.createLinearGradient(x-37,y-100,x+37,y-18);cushion.addColorStop(0,'#687c4d');cushion.addColorStop(1,'#3b573d');ctx.fillStyle=cushion;ctx.beginPath();ctx.roundRect(x-35,y-94,70,71,15);ctx.fill();ellipse20(ctx,x,y-17,44,13,'#7b8b54');ctx.strokeStyle='#baa06b';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x-26,y-81);ctx.lineTo(x+26,y-81);ctx.moveTo(x-29,y-33);ctx.lineTo(x+29,y-33);ctx.stroke();ctx.restore();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
