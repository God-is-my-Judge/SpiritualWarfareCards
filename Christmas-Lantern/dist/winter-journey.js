'use strict';
// Scene and animation additions, November 11, 2026.
const ROAD_ROOMS=['sleigh','pinepass','snowgarden'];
function onRoad(){return ROAD_ROOMS.includes(state.room);/* Code by Daniel using ChatGPT November 11, 2026 */}
function vehicleHere(){return onRoad()&&state.vehicle.room===state.room;/* Code by Daniel using ChatGPT November 11, 2026 */}
function installJourney(){
 WINTER_ART.push('boy-depth-walk-09','girl-depth-walk-09','pinepass','carollers','boy-walk','girl-walk','neighbors-turns','cardinal-perched');
 ROOMS.hall.objects[0].solidPad=0;ROOMS.hall.objects[0].solidTop=66.2;
 ROOMS.rink.spots=ROOMS.rink.spots.filter(function shoreline(t){return t.id!=='pond-sleigh'&&t.id!=='pond-lane';/* Code by Daniel using ChatGPT November 11, 2026 */});
 ROOMS.rink.spots.push({id:'pond-shore-lane',x:28,y:36,mark:[26,31],hit:[19,24,15,13],to:'sleigh',label:'The sleigh beside the snowy bank',edgeDirection:'back',gate:[24,34,12,4]});
 ROOMS.rink.floor=33;ROOMS.rink.arrivals.sleigh=[30,44];
 ROOMS.sleigh.spots=ROOMS.sleigh.spots.filter(function roadAhead(t){return t.id!=='lane-cave';/* Code by Daniel using ChatGPT November 11, 2026 */});
 ROOMS.sleigh.spots.push({id:'lane-pass',x:50,y:24,mark:[50,20],to:'pinepass',label:'Keep going into the pine woods',edgeDirection:'back',gate:[44,22,12,4]});
 ROOMS.sleigh.walkAreas.push({polygon:[[44,34],[57,34],[58,8],[46,8]]});
 ROOMS.sleigh.arrivals.pinepass=[50,36];
 ROOMS.pinepass={title:'The Lantern Pine Pass',image:'pinepass',caption:'Beyond the bridge, a song and a way through the woods.',help:'Carollers ahead. Lanterns to the cave.',floor:28,spawn:[50,85],footRadius:1.2,arrivals:{sleigh:[50,84],cave:[85,48]},walkAreas:[{polygon:[[27,94],[77,94],[72,72],[65,60],[68,48],[82,44],[91,39],[91,33],[84,34],[76,40],[63,43],[44,42],[38,34],[29,29],[25,34],[36,48],[33,58],[27,64],[21,61],[15,59],[13,63],[26,70]]}],objects:[{carollers:true,x:21,y:57,w:16,h:26,solidPad:.8}],spots:[{id:'pass-bridge',x:50,y:93,mark:[50,91],to:'sleigh',label:'Back down to the bridge',edgeDirection:'front',gate:[36,91,28,3]},{id:'pass-cave',x:88,y:38,mark:[88,31],hit:[83,24,11,16],to:'cave',label:'Rime’s lantern-lit cave',edgeDirection:'back'},{id:'pass-carollers',x:24,y:62,mark:[21,44],hit:[12,32,19,26],questAction:'carollers',label:window.LANTERN_HYMNAL_CONFIG?.enabled?'Caroler’s hymnal · read or sing together':'Away in a Manger · listen and read'},{id:'pass-lantern',x:50,y:54,mark:[50,51],questAction:'pass',label:'A sign beside the pine road'}]};
 ROOMS.cave.arrivals={pinepass:[50,86]};ROOMS.cave.spots[0].to='pinepass';ROOMS.cave.spots[0].label='The pine road and the carollers';
 state.vehicle.room=ROAD_ROOMS.includes(state.vehicle.room)?state.vehicle.room:'sleigh';
 g.npcTurns=Array.from({length:4},function quietNeighbor(){return {face:0,next:5+Math.random()*Math.random()*25};/* Code by Daniel using ChatGPT November 11, 2026 */});
 /* Code by Daniel using ChatGPT November 18, 2026 */}
function atlasRegion(image,x,y,w,h){const out=document.createElement('canvas');out.width=w;out.height=h;out.getContext('2d').drawImage(image,x,y,w,h,0,0,w,h);return frameAsset(out,0,0,1,1);/* Code by Daniel using ChatGPT November 11, 2026 */}
function mirrorFrame(frame){const out=document.createElement('canvas');out.width=frame.w;out.height=frame.h;const c=out.getContext('2d');c.translate(out.width,0);c.scale(-1,1);c.drawImage(frame.canvas,0,0);return {canvas:out,w:out.width,h:out.height};/* Code by Daniel using ChatGPT November 11, 2026 */}
function initializeJourneyArt(){
 g.walkFrames={};for(const name of ['boy','girl'])g.walkFrames[name]=walkAtlas(g.images[name+'-walk']);g.depthWalkFrames={boy:depthWalkAtlas09(g.images['boy-depth-walk-09']),girl:depthWalkAtlas09(g.images['girl-depth-walk-09'])};
 g.neighbors=[];for(let row=0;row<2;row++)for(let col=0;col<4;col++)g.neighbors.push(frameAsset(g.images['neighbors-turns'],col,row,4,2));
 g.carollers=frameAsset(g.images.carollers,0,0,1,1);g.perchedCardinal=frameAsset(g.images['cardinal-perched'],0,0,1,1);
 // Profile horses cross their old grid-cell boundary. Use complete source regions,
 // then mirror the sound right-side views into the matching left-side directions.
 const im=g.images['horse-views'];for(const [offset,y]of [[0,320],[8,950]])g.horses[6+offset]=atlasRegion(im,590,y,365,Math.min(290,im.naturalHeight-y));
 // Rear diagonals need their own subject regions: the profile horse's tail crosses
 // the right edge of each nominal cell. The second mane also starts above its cell.
 for(const [index,rect]of [[5,[330,305,220,315]],[13,[330,925,220,315]]])g.horses[index]=atlasRegion(im,...rect);
 for(const offset of [0,8])for(const [left,right]of [[1,7],[2,6],[3,5]])g.horses[left+offset]=mirrorFrame(g.horses[right+offset]);
 for(let n=0;n<2;n++){g.horses[6+n*8]=frameAsset(g.images['horse-profiles-07'],n,0,2,1);g.horses[2+n*8]=mirrorFrame(g.horses[6+n*8]);}g.rimeThreat=atlasRegion(g.images['rime-acting-07'],0,0,900,1024);g.rimeHanging=atlasRegion(g.images['rime-acting-07'],940,0,596,1024);g.snowmanFrame=frameAsset(g.images['snowman-blank-07'],0,0,1,1);repairVehiclePose();
 /* Code by Daniel using ChatGPT November 11, 2026 */
/* Code by Daniel using ChatGPT November 15, 2026 */}
function walkAtlas(image){const cw=Math.floor(image.naturalWidth/8),ch=Math.floor(image.naturalHeight/4),frames=[];for(let row=0;row<4;row++)for(let col=0;col<8;col++){const out=document.createElement('canvas');out.width=cw;out.height=ch;out.getContext('2d').drawImage(image,col*cw,row*ch,cw,ch,0,0,cw,ch);frames.push({canvas:out,w:cw,h:ch,rootX:cw*.5,rootY:ch*.9,bodyHeight:204});}return frames;/* Code by Daniel using ChatGPT November 11, 2026 */}
function journeyWalkerFrame(avatar=state.avatar,direction=g.direction,walker=Walker,point=state.player){
 if(point===state.player?onIce():onIce(point))return g.frames[(avatar==='girl'?8:0)+direction];
 const phase=state.motion&&walker.moving?Math.floor(walker.phase*4)%4:0;
 if(direction===0||direction===4)return g.depthWalkFrames[avatar][phase*2+(direction===4?1:0)];
 return g.walkFrames[avatar][phase*8+direction];
 /* Code by Daniel using ChatGPT November 12, 2026 */
/* Code by Daniel using ChatGPT November 19, 2026 */
}

function travelVehicle(to,spawn,direction){
 const snapshot=captureScene(),from=state.room,phase=state.vehicle.phase,vector=COMPASS[state.vehicle.direction];state.vehicle={x:spawn[0],y:spawn[1],direction,phase,room:to};enterRoom(to,{from,spawn,aboard:true});state.riding=true;state.player={x:spawn[0],y:spawn[1]};g.direction=direction;g.ride=true;g.transition={type:state.motion?'edge':'door',to,from,snapshot,dx:vector[0],dy:vector[1],focus:[50,50],elapsed:0,duration:state.motion?.6:.12};save();
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function updateNeighborTurns(dt){if(!state.motion)return;for(const o of ROOMS[state.room].objects){if(o.npc===undefined)continue;const t=g.npcTurns[o.npc];t.next-=dt;if(t.next<=0){t.face=1-t.face;t.next=7+Math.random()*Math.random()*35;}}/* Code by Daniel using ChatGPT November 11, 2026 */}
function journeySign(){showPanel('<h2 id="panel-title">The road beyond the bridge</h2><p>The left road climbs toward Grandmother’s cottage. To the right, lanterns lead to the Snow Monster’s cave. The bridge behind you leads home.</p><p>You may park the sleigh anywhere the road is clear and slide out to explore. Your team waits where you leave it.</p><button class="primary" id="pass-sign-close">Keep following the lanterns</button>','AT THE FORK IN THE PINES');$('#pass-sign-close').onclick=closePanel;/* Code by Daniel using ChatGPT November 11, 2026 *//* Code by Daniel using ChatGPT November 12, 2026 *//* Code by Daniel using ChatGPT November 12, 2026 */}
function carolCorner(){
 rememberCarolersHymnal();
 if(window.LANTERN_HYMNAL_CONFIG?.enabled && window.LanternHymnal)return openLanternHymnal();
 const song=CHRISTMAS_MUSIC.carol,entry=g.audioTracks.carollers;
 showPanel(`<h2 id="panel-title">${escapeHTML(song.title)}</h2><p>A little company beside the chapel lamp. Read the words or sing together.</p><p class="hymn-byline">Traditional carol · Original Lantern stanza, 2026</p><div class="book-reading">${song.verses.map(function verse(v,i){return '<h3>'+escapeHTML(song.labels[i])+'</h3><p>'+escapeHTML(v).replace(/\n/g,'<br>')+'</p>';/* Code by Daniel using ChatGPT November 13, 2026 */}).join('')}</div><div class="row" ${entry?'':'hidden'}><button class="primary" id="carol-play" ${entry?'':'disabled'}>Listen to the carolers</button><button id="carol-stop">Stop</button></div><p id="carol-status" role="status">${entry?'Ready when you are.':'Sing together in your own time.'}</p>`,'CAROLS BESIDE THE PINES');
 g.musicPanelOpen=true;
 $('#carol-play').onclick=function startCarol(){enableSound();if(g.audioTracks.carollers)g.audioTracks.carollers.restart=true;g.cornerPreviewKey='carollers';g.carolPlaying=true;AudioScene.change();$('#carol-status').textContent='A Christmas carol beside the pines.';/* Code by Daniel using ChatGPT November 13, 2026 */};
 $('#carol-stop').onclick=function stopCarol(){g.cornerPreviewKey=null;g.carolPlaying=false;AudioScene.change();$('#carol-status').textContent='Stopped.';/* Code by Daniel using ChatGPT November 13, 2026 */};
 /* Code by Daniel using ChatGPT November 13, 2026 */
}

function safeRoomArrival(point){const map=roomMap();if(Exploration.free(point,map,true))return point;const near=Exploration.safe(point,map,true);if(Exploration.free(near,map,true))return near;for(let radius=1;radius<=60;radius++)for(let n=0;n<32;n++){const p={x:point.x+Math.cos(n*Math.PI/16)*radius,y:point.y+Math.sin(n*Math.PI/16)*radius};if(Exploration.free(p,map,true))return p;}return point;/* Code by Daniel using ChatGPT November 11, 2026 */}
