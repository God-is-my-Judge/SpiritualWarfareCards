'use strict';
function clamp(n){return Math.max(0,Math.min(1,n));/* Code by Daniel using ChatGPT November 10, 2026 */}
function ease(n){n=clamp(n);return n*n*(3-2*n);/* Code by Daniel using ChatGPT November 10, 2026 */}
function sceneView(){if(wonderWatching20())return bethlehemCamera20();const roomView=roomPlayCamera21();if(roomView)return coopView28(roomView);if(state.room!=='nativity')return coopView28({zoom:1,left:0,top:0});const zoom=g.camera.zoom;return coopView28({zoom,left:768-768/zoom,top:512-g.camera.focus-512/zoom});/* Code by Daniel using ChatGPT November 13, 2026 *//* Code by Daniel using ChatGPT November 13, 2026 *//* Code by Daniel using ChatGPT November 19, 2026 */
}
function updateCamera(dt){const near=state.room==='nativity'&&state.motion&&state.cameraDepth?1-clamp((92-state.player.y)/40):0,blend=1-Math.exp(-dt*2.5);g.camera.zoom+=(1+near*.18-g.camera.zoom)*blend;g.camera.focus+=(-near*76-g.camera.focus)*blend;/* Bethlehem opens out as the elf walks toward the manger: close on the path, the whole sky at the stable. Claude, November 18, 2026 *//* Code by Daniel using ChatGPT November 10, 2026 */}
function scenePoint(e){const r=canvas.getBoundingClientRect(),v=sceneView();return {x:((e.clientX-r.left)/r.width*1536/v.zoom+v.left)/15.36,y:((e.clientY-r.top)/r.height*1024/v.zoom+v.top)/10.24};/* Code by Daniel using ChatGPT November 10, 2026 */}
function requestAction(t,keepJourney=false){if(g.coop28)g.coop28.parcelOwner=1;if(g.transition||panel.open)return false;if(t.wonder20==='bethlehem'){beginBethlehem20();return true;}if(!keepJourney)g.journey=[];if(t.ride&&!state.riding&&vehicleHere())return requestVehicleBoarding(t);g.pending={...t,room:state.room};g.ride=false;g.velocity={x:0,y:0};if(!walkTo(t)){g.pending=null;toast('A little closer.');return false;}return true;/* Code by Daniel using ChatGPT November 18, 2026 *//* Code by Daniel using ChatGPT November 19, 2026 */
}
function planRoom(destination){if(g.transition)finishTransition();if(state.riding)leaveVehicle();if(!ROOMS[destination]||destination===state.room){toast('You are already here.');return;}const queue=[[state.room]],seen=new Set([state.room]);let route=null;for(let i=0;i<queue.length;i++){const path=queue[i],last=path[path.length-1];if(last===destination){route=path.slice(1);break;}for(const t of ROOMS[last].spots){if(t.to&&!seen.has(t.to)){seen.add(t.to);queue.push([...path,t.to]);}}}if(!route){toast('There is no doorway to that place yet.');return;}g.journey=route;startNextLeg();/* Code by Daniel using ChatGPT November 10, 2026 */}
function startNextLeg(){while(g.journey[0]===state.room)g.journey.shift();if(!g.journey.length)return;const t=ROOMS[state.room].spots.find(function routeDoor(spot){return spot.to===g.journey[0];/* Code by Daniel using ChatGPT November 10, 2026 */});if(t)requestAction(t,true);else g.journey=[];/* Code by Daniel using ChatGPT November 10, 2026 */}
function captureScene(){const copy=document.createElement('canvas');copy.width=1536;copy.height=1024;copy.getContext('2d').drawImage(canvas,0,0);return copy;/* Code by Daniel using ChatGPT November 10, 2026 */}
function beginDoor(to,door=null){if(g.transition)return;const snapshot=captureScene(),from=state.room,dir=door?.edgeDirection,vector={left:[-1,0],right:[1,0],front:[0,1],back:[0,-1]}[dir];enterRoom(to,{from});g.transition={type:vector&&state.motion?'edge':'door',to,from,snapshot,dx:vector?.[0]||0,dy:vector?.[1]||0,focus:door?.mark||[50,50],elapsed:0,duration:state.motion?.48:.12};$('#skip-transition').hidden=true;/* Code by Daniel using ChatGPT November 10, 2026 */}
function beginWardrobe(to){if(g.transition)return;g.pending=null;g.steps=[];g.keys.clear();TouchStick.reset();Walker.reset();g.transition={type:to==='nativity'?'wardrobe-out':'wardrobe-back',to,from:state.room,snapshot:captureScene(),elapsed:0,duration:state.motion?(to==='nativity'?2.5:1.85):.18};$('#skip-transition').hidden=!state.motion;if(state.sound)AudioScene.chime();/* Code by Daniel using ChatGPT November 10, 2026 */}
function finishTransition(){const t=g.transition;if(!t)return;g.transition=null;$('#skip-transition').hidden=true;if(t.type!=='door'&&t.type!=='edge')enterRoom(t.to,{from:t.from});if(t.to==='nativity')g.arrivalAge=0;g.keys.clear();g.velocity={x:0,y:0};startNextLeg();/* Code by Daniel using ChatGPT November 10, 2026 */}
function drawWardrobePortal(progress,opening=true){const o=ROOMS.closet.objects[0],f=g.furniture[1],zoom=1+6*ease(progress/.8),pan=ease(progress/.7),cx=o.x*15.36+(768-o.x*15.36)*pan,cy=(o.y-o.h/2)*10.24+(512-(o.y-o.h/2)*10.24)*pan,w=o.w*15.36*zoom,h=o.h*10.24*zoom;ctx.drawImage(f.canvas,cx-w/2,cy-h/2,w,h);const open=opening?ease((progress-.27)/.35):0;if(open<=0)return;const ix=cx-w*.38,iy=cy-h*.37,iw=w*.76,ih=h*.81;ctx.save();ctx.beginPath();ctx.rect(ix,iy,iw,ih);ctx.clip();const im=g.images.nativity,ratio=Math.max(iw/1536,ih/1024),bw=1536*ratio,bh=1024*ratio;ctx.drawImage(im,ix+(iw-bw)/2,iy+(ih-bh)/2,bw,bh);ctx.fillStyle=`rgba(255,213,126,${.13*(1-open)})`;ctx.fillRect(ix,iy,iw,ih);ctx.restore();const doorWidth=iw/2*(1-open*.97),slide=open*iw*.24;ctx.drawImage(f.canvas,f.w*.12,f.h*.13,f.w*.38,f.h*.82,ix-slide,iy,doorWidth,ih);ctx.drawImage(f.canvas,f.w*.5,f.h*.13,f.w*.38,f.h*.82,ix+iw-doorWidth+slide,iy,doorWidth,ih);ctx.save();ctx.globalAlpha=Math.sin(open*Math.PI)*.27;const glow=ctx.createRadialGradient(cx,cy,20,cx,cy,Math.max(w,h)*.55);glow.addColorStop(0,'#ffe5ab');glow.addColorStop(1,'#ffe5ab00');ctx.fillStyle=glow;ctx.fillRect(0,0,1536,1024);ctx.restore();/* Code by Daniel using ChatGPT November 10, 2026 */}
function drawTransition(){const t=g.transition,p=clamp(t.elapsed/t.duration);ctx.save();if(t.type==='rime-fall'){ctx.translate(state.motion?Math.sin(p*24)*8:0,-p*130);ctx.drawImage(t.snapshot,0,0);ctx.fillStyle='rgba(230,239,247,'+ease(p)+')';ctx.fillRect(-20,0,1576,1200);ctx.restore();return;}if(t.type==='edge'){ctx.translate(-t.dx*1536*ease(p),-t.dy*1024*ease(p));ctx.drawImage(t.snapshot,0,0);ctx.restore();return;}if(t.type==='door'){const z=1+ease(p)*.14,cx=t.focus[0]*15.36,cy=t.focus[1]*10.24;ctx.globalAlpha=1-ease(p);ctx.translate(cx,cy);ctx.scale(z,z);ctx.translate(-cx,-cy);ctx.drawImage(t.snapshot,0,0);ctx.restore();return;}if(!state.motion){ctx.drawImage(t.snapshot,0,0);ctx.globalAlpha=ease(p);ctx.drawImage(g.images[t.to==='nativity'?'nativity':'bedroom'],0,0,1536,1024);ctx.restore();return;}if(t.type==='wardrobe-out'){ctx.drawImage(t.snapshot,0,0);ctx.fillStyle=`rgba(20,24,15,${ease(p)*.35})`;ctx.fillRect(0,0,1536,1024);drawWardrobePortal(p);if(p>.7){ctx.globalAlpha=ease((p-.7)/.3);ctx.drawImage(g.images.nativity,0,0,1536,1024);ctx.drawImage(g.images['stable-frame'],0,0,1536,1024);}}else if(p<.42){ctx.drawImage(t.snapshot,0,0);ctx.globalAlpha=ease(p/.42);ctx.drawImage(g.images['stable-frame'],0,0,1536,1024);}else{ctx.drawImage(g.images.bedroom,0,0,1536,1024);drawWardrobePortal(1-ease((p-.42)/.58),false);}ctx.restore();/* Code by Daniel using ChatGPT November 10, 2026 */}
function drawStarTrail(){const stars=targets().filter(function star(t){return t.star;/* Code by Daniel using ChatGPT November 10, 2026 */});if(stars.length<2)return;ctx.save();ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle='#cbb17b1c';ctx.lineWidth=25;ctx.beginPath();ctx.moveTo(50*15.36,92*10.24);for(const s of stars)ctx.lineTo(s.x*15.36,s.y*10.24);ctx.stroke();ctx.strokeStyle='#e6c99828';ctx.lineWidth=2;ctx.stroke();for(let i=0;i<stars.length;i++){const s=stars[i],x=s.x*15.36,y=s.y*10.24;ctx.fillStyle='#6c704437';for(let n=0;n<3;n++){ctx.beginPath();ctx.ellipse(x-33+n*8,y+12+(n%2)*3,4,2,-.5,0,Math.PI*2);ctx.fill();}ctx.fillStyle='#d6bd8b50';ctx.beginPath();ctx.ellipse(x,y+6,17,3,0,0,Math.PI*2);ctx.fill();}ctx.restore();/* Code by Daniel using ChatGPT November 10, 2026 */}
function extendSettings(){const content=$('#panel-content');content.insertAdjacentHTML('beforeend',`<div class="row setting-check"><input id="depth-camera" type="checkbox" ${state.cameraDepth?'checked':''}><label for="depth-camera">Gentle camera depth in Bethlehem</label></div><details class="room-guide"><summary>Room guide</summary><p>Your elf follows the connecting doorways. Move the joystick or press a direction to take over.</p><div class="collection-list">${Object.entries(ROOMS).map(function roomLink(pair){return `<button data-travel="${pair[0]}">${escapeHTML(pair[1].title)}</button>`;/* Code by Daniel using ChatGPT November 10, 2026 */}).join('')}</div></details>`);winterSettings();$('#depth-camera').onchange=function cameraPreference(e){state.cameraDepth=e.target.checked;save();/* Code by Daniel using ChatGPT November 10, 2026 */};panel.querySelectorAll('[data-travel]').forEach(function wireTravel(b){b.onclick=function chooseDestination(){closePanel();planRoom(b.dataset.travel);/* Code by Daniel using ChatGPT November 10, 2026 */};/* Code by Daniel using ChatGPT November 10, 2026 */});/* Code by Daniel using ChatGPT November 18, 2026 */}
function showLibrary(){showLibrary10();/* Code by Daniel using ChatGPT November 13, 2026 */}

function readWonder(id,page=-1){
 const current=READING_ALIASES22[id]||id;if(CLAUDE_SHORT_BOOKS22[current]){readShortBook22(current,page);return;}
 const book=WINTER_READINGS[id];if(!book)return;page=Math.max(-1,Math.min(book.pages.length-1,page));
 const titlePage=page===-1,[title,originalBody]=titlePage?['','']:book.pages[page];
 const angelVerse=id==='angel'&&page===1?cards.find(function angelCard(c){return /^Luke 2:(13|14)/.test(c.title);/* Code by Daniel using ChatGPT November 12, 2026 */}):null;
 const body=angelVerse?verseDisplay09(angelVerse)+'\n\n'+verseReference(angelVerse)+'\n\nThe announcement leads us to the Savior born in Bethlehem.':originalBody;
 state.seenBooks[id]=Math.max(state.seenBooks[id]||0,page+1);bookmark10(id,page);save();
 let picture=book.picture;
 if(id==='trainA')picture=page>=4?'train-home':'train-departure';
 if(id==='trainB')picture=page<2?'train-departure':page<5?'train-rescue':'train-home';
 const art=picture?'<img class="book-picture" src="assets/pictures/'+picture+'.webp" alt="'+escapeHTML(PICTURES09.find(function samePicture(p){return p[0]===picture;/* Code by Daniel using ChatGPT November 12, 2026 */})?.[2]||'Original winter illustration')+'">':'';
 showPanel('<div class="little-book '+(titlePage?'book-title-page':'')+'"><p class="verse-meta">'+escapeHTML(book.kind)+(titlePage?'':' · '+(page+1)+' / '+book.pages.length)+'</p><h2 id="panel-title">'+escapeHTML(book.title)+'</h2>'+art+(titlePage?'<p>A little book to read at your own pace.</p>':'<h3>'+escapeHTML(title)+'</h3><div class="book-reading"><p>'+escapeHTML(body).replace(/\n\n/g,'</p><p>').replace(/\n/g,'<br>')+'</p></div>')+(angelVerse?scriptureContextHTML(angelVerse):'')+'<div class="book-pages"><button id="book-prev" '+(titlePage?'disabled':'')+'>← '+(page===0?'Title page':'Previous')+'</button><span>'+(titlePage?'Title page':(page+1)+' of '+book.pages.length)+'</span><button class="primary" id="book-next">'+(titlePage?'Open the book →':page<book.pages.length-1?'Next page →':'Back to the room')+'</button></div></div>','A LITTLE CHRISTMAS BOOK');
 bookTools10(id,page);bookComfort20(id,page);$('#book-prev').onclick=function previousPage(){readWonder(id,page-1);/* Code by Daniel using ChatGPT November 12, 2026 */};
 $('#book-next').onclick=function nextPage(){if(page<book.pages.length-1)readWonder(id,page+1);else closePanel();/* Code by Daniel using ChatGPT November 12, 2026 */};
 /* Code by Daniel using ChatGPT November 12, 2026 */
/* Code by Daniel using ChatGPT November 13, 2026 */}

function appendKeepsakes(){const found=Object.keys(state.keepsakes).filter(function available(id){return ['angel','nutcracker'].includes(id)&&state.keepsakes[id];/* Code by Daniel using ChatGPT November 13, 2026 */});if(!found.length)return;$('#panel-content').insertAdjacentHTML('beforeend',`<h3>Little Christmas keepsakes</h3><div class="collection-list">${found.map(function keepsake(id){return `<button data-keepsake="${id==='angel'?'angel':'nutcracker'}">${id==='angel'?'A glass angel':'The solemn little nutcracker'}</button>`;/* Code by Daniel using ChatGPT November 13, 2026 */}).join('')}</div>`);panel.querySelectorAll('[data-keepsake]').forEach(function wireKeepsake(b){b.onclick=function revisitKeepsake(){readWonder(b.dataset.keepsake,0);/* Code by Daniel using ChatGPT November 13, 2026 */};/* Code by Daniel using ChatGPT November 13, 2026 */});/* Code by Daniel using ChatGPT November 13, 2026 */}
function recordingDefaults(key){return {startAt:0,loop:!['tree','carollers'].includes(key)};/* Code by Daniel using ChatGPT November 11, 2026 */}
function configureRecording(key,startAt,loop){g.audioPrefs=g.audioPrefs||{};const prefs={startAt:Math.max(0,Number(startAt)||0),loop:!!loop};g.audioPrefs[key]=prefs;const entry=g.audioTracks[key];if(entry){Object.assign(entry,prefs,{restart:true});entry.audio.loop=prefs.loop&&prefs.startAt===0;}AudioScene.change();/* Code by Daniel using ChatGPT November 11, 2026 */}
// Kept as a private authoring helper; the public game has no recording picker.
function loadRecording(file,key,feedback){
 if(file.size>30000000){feedback.textContent='Choose an audio file under 30 MB.';return;}
 const entry=registerRecording(new Audio(URL.createObjectURL(file)),key,file.name,feedback);
 feedback.textContent='Ready: '+file.name+' · '+(entry.loop?'instrumental loop':'plays once')+' · kept for this session.';
 AudioScene.change();
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function registerRecording(audio,key,name,feedback=null){
 const old=g.audioTracks[key];
 if(old){old.audio.pause();if(old.audio.src.startsWith('blob:'))URL.revokeObjectURL(old.audio.src);}
 const prefs=g.audioPrefs?.[key]||recordingDefaults(key),entry={audio,name,...prefs,restart:true,failed:false};
 audio.preload='metadata';audio.loop=entry.loop&&entry.startAt===0;g.audioTracks[key]=entry;
 audio.onloadedmetadata=function recordingMetadata(){if(entry.seekPending)seekRecording(entry);/* Code by Daniel using ChatGPT November 13, 2026 */};
 audio.onended=function recordingEnded(){
  if(entry.loop){entry.restart=true;AudioScene.change();return;}
  if(key==='tree')g.songPlaying=false;if(key==='carollers')g.carolPlaying=false;
  if(g.cornerPreviewKey===key)g.cornerPreviewKey=null;entry.restart=true;AudioScene.change();
  /* Code by Daniel using ChatGPT November 13, 2026 */
 };
 audio.onerror=function recordingError(){
  entry.failed=true;if(key==='tree')g.songPlaying=false;if(key==='carollers')g.carolPlaying=false;
  if(g.cornerPreviewKey===key)g.cornerPreviewKey=null;
  if(feedback)feedback.textContent='This recording could not play.';
  toast('The bells can keep us company.');AudioScene.change();
  /* Code by Daniel using ChatGPT November 13, 2026 */
 };
 return entry;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function installConfiguredRecordings(){
 for(const [key,src] of Object.entries(window.LANTERN_HYMNAL_CONFIG?.roomRecordings||{})){
  if(typeof src==='string'&&src.trim())registerRecording(new Audio(src),key,ROOMS[key.slice(5)]?.title||'Christmas music');
 }
 /* Code by Daniel using ChatGPT November 13, 2026 */
}

function seekRecording(entry){try{entry.audio.currentTime=Number.isFinite(entry.audio.duration)&&entry.startAt>=entry.audio.duration?0:entry.startAt;entry.seekPending=false;}catch{entry.seekPending=true;}/* Code by Daniel using ChatGPT November 11, 2026 */}
function availableRecording(key){return g.audioTracks[key]&&!g.audioTracks[key].failed;/* Code by Daniel using ChatGPT November 11, 2026 */}
function recordingKey(){if(g.cornerPreviewKey&&availableRecording(g.cornerPreviewKey))return g.cornerPreviewKey;if(state.room==='pinepass'&&g.carolPlaying&&availableRecording('carollers'))return 'carollers';if(state.room==='gifts'&&g.songPlaying&&availableRecording('tree'))return 'tree';const room='room:'+state.room;if(availableRecording(room))return room;if(onRoad()&&availableRecording('sleigh'))return 'sleigh';if(state.room==='ornaments'&&availableRecording('ornaments'))return 'ornaments';return availableRecording('ambience')?'ambience':null;/* Code by Daniel using ChatGPT November 11, 2026 */}
function synchronizeRecordings(){
 const level=panelMusicLevel(),key=state.sound&&!document.hidden&&(level>0||g.cornerPreviewKey||g.musicPanelOpen)?recordingKey():null,entry=key?g.audioTracks[key]:null;
 for(const other of Object.values(g.audioTracks))if(other!==entry)other.audio.pause();
 if(!entry){g.activeTrack=null;g.activeKey=null;return;}const changed=g.activeKey!==key,seek=entry.restart;entry.audio.volume=state.volume*(level>0&&softRecording(key)?AudioScene.level:1);entry.audio.loop=entry.loop&&entry.startAt===0;g.activeTrack=entry.audio;g.activeKey=key;
 if(seek){seekRecording(entry);entry.restart=false;}
 if(changed||seek||entry.audio.paused)entry.audio.play()?.catch(function recordingBlocked(){g.activeTrack=null;g.activeKey=null;toast('Tap Play to hear it.');/* Code by Daniel using ChatGPT November 18, 2026 */});
 /* Code by Daniel using ChatGPT November 11, 2026 *//* Code by Daniel using Claude November 14, 2026 */
/* Code by Daniel using ChatGPT November 18, 2026 */}
function recordingSettings(){const select=$('#audio-scene');select.insertAdjacentHTML('beforeend','<optgroup label="Room instrumentals">'+Object.entries(ROOMS).map(function roomOption(pair){return '<option value="room:'+pair[0]+'">'+escapeHTML(pair[1].title)+'</option>';/* Code by Daniel using ChatGPT November 11, 2026 */}).join('')+'</optgroup>');$('#audio-feedback').insertAdjacentHTML('afterend','<label for="audio-start">Playback start in seconds · optional</label><input id="audio-start" type="number" min="0" step="0.1" value="0"><div class="row setting-check"><input id="audio-loop" type="checkbox"><label for="audio-loop">Loop this recording</label></div><p>Leave the start at zero to preserve an intentional quiet opening. Set it later if the downloaded file has unwanted leading silence. Hymn slots play once by default, then return to the room instrumental.</p>');
 const refresh=function refreshAudioOptions(){const key=select.value,prefs=g.audioTracks[key]||g.audioPrefs?.[key]||recordingDefaults(key);$('#audio-start').value=prefs.startAt;$('#audio-loop').checked=prefs.loop;/* Code by Daniel using ChatGPT November 11, 2026 */};select.onchange=refresh;$('#audio-start').onchange=$('#audio-loop').onchange=function audioOptions(){configureRecording(select.value,$('#audio-start').value,$('#audio-loop').checked);/* Code by Daniel using ChatGPT November 11, 2026 */};refresh();/* Code by Daniel using ChatGPT November 11, 2026 */}

function enableSound(){state.sound=true;AudioScene.unlock();$('#sound').setAttribute('aria-pressed','true');$('#sound span').textContent='Sound on';/* Code by Daniel using ChatGPT November 10, 2026 */}
function previewCorner(key){enableSound();g.cornerPreviewKey=key;g.songPlaying=key==='tree';if(g.audioTracks[key])g.audioTracks[key].restart=true;AudioScene.change();if(g.audioTracks[key]){$('#song-feedback').textContent='A Christmas tune to listen to.';return;}const token=++g.previewToken,notes=key==='tree'?[60,64,67,72,71,67,64,62,65,69,74,72]:[72,79,76,74,72,67,69,72];notes.forEach(function previewNote(note,i){setTimeout(function ringNote(){if(g.previewToken===token&&panel.open&&state.sound)AudioScene.tone(440*2**((note-69)/12),1.4,.12,'sine',true);/* Code by Daniel using ChatGPT November 13, 2026 */},i*480);/* Code by Daniel using ChatGPT November 13, 2026 */});$('#song-feedback').textContent='A little Christmas tune on the bells.';/* Code by Daniel using ChatGPT November 13, 2026 */}
function musicCorner(key){
 const tree=key==='tree',entry=g.audioTracks[key];
 showPanel(`<h2 id="panel-title">${tree?'Gather around the tree':'A quiet song in the glass'}</h2><p>${tree?'A little Christmas tune, and room for everyone.':'Listen awhile beside the glass angels.'}</p><div class="music-placeholder"><span>♫</span><strong>${tree?'Bells by the Christmas tree':'Peace at Christmas'}</strong></div><div class="row"><button class="primary" id="song-play">${entry?'Listen to the music':'Listen to the bells'}</button><button id="song-stop">Stop</button></div><p id="song-feedback" role="status"></p>`,'A CHRISTMAS MUSIC CORNER');
 $('#song-play').onclick=function playSong(){previewCorner(key);/* Code by Daniel using ChatGPT November 13, 2026 */};
 $('#song-stop').onclick=function stopSong(){g.previewToken++;g.cornerPreviewKey=null;g.songPlaying=false;AudioScene.change();$('#song-feedback').textContent='Stopped.';/* Code by Daniel using ChatGPT November 13, 2026 */};
 g.musicPanelOpen=true;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}

function smoothWalk(path,map){
 const result=[],clearance={...map,footRadius:(map.footRadius||.29)+.2};
 let anchor={...state.player},remaining=path;
 // Leave room around pointed furniture corners instead of accepting a grazing shortcut.
 // Keep original flood-search steps wherever that extra smoothing clearance is unavailable.
 while(remaining.length){
  let next=0;
  for(let i=remaining.length-1;i>=0;i--)if(clearWalkSegment(anchor,remaining[i],clearance)){next=i;break;}
  anchor=remaining[next];result.push(anchor);remaining=remaining.slice(next+1);
 }
 return result;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}

function setupDiscoveryHover(){canvas.addEventListener('pointermove',function previewDiscovery(e){if(panel.open||g.transition)return;const p=scenePoint(e);let best=null,distance=Infinity;for(const t of targets()){const d=targetHitDistance(t,p);if(d<distance){distance=d;best=t;}}g.hoverId=distance<5?best?.id:null;canvas.style.cursor=g.hoverId?'pointer':'default';/* Code by Daniel using ChatGPT November 12, 2026 */});
canvas.addEventListener('pointerleave',function leaveDiscovery(){g.hoverId=null;canvas.style.cursor='default';/* Code by Daniel using ChatGPT November 10, 2026 */});/* Code by Daniel using ChatGPT November 10, 2026 *//* Code by Daniel using ChatGPT November 12, 2026 */}
