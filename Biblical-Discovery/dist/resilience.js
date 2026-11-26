'use strict';
// Local-only save and image lifecycle. No telemetry or remote error collection.
window.BD_RESILIENCE={timer:0,last:'',errors:[],live:new Map(),pending:new Map(),failed:new Set(),maxPaintings:12};
BD_RESILIENCE.leaveRoom=function clearPreviousMuseumLoading(){
 BD_RESILIENCE.roomTicket=null;
 BD_RESILIENCE.roomFallback=null;
 game.roomArtLoading=false;
 $('#load-indicator').hidden=true;
};
BD_RESILIENCE.flush=function flushMuseumSave(){
 clearTimeout(BD_RESILIENCE.timer);BD_RESILIENCE.timer=0;if(!game.save)return;
 const raw=JSON.stringify(game.save);if(raw===BD_RESILIENCE.last)return;
 try{const previous=localStorage.getItem(SAVE_KEY);if(previous&&previous!==raw){try{const check=JSON.parse(previous);if(check.version===1&&check.finds&&typeof check.finds==='object')localStorage.setItem(SAVE_KEY+'-previous',previous);}catch(backupError){/* A bad primary must not replace a recoverable backup. */}}
 localStorage.setItem(SAVE_KEY,raw);BD_RESILIENCE.last=raw;
 }catch(error){if(!game.storageWarning){game.storageWarning=true;toast('Browser saving is unavailable. Export progress keeps your museum.');}}
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_RESILIENCE.pinned=function paintingsInUse(){
 const keys=new Set();if(!game.ready){keys.add('m5-front-v2');keys.add('m4-entry');}
 if(game.scene==='museum'){for(const name of BD_MUSEUM.config().images)keys.add((BD_MUSEUM.room==='front'?'m5-':'m4-')+name);if(BD_MUSEUM.room==='court')keys.add('v8-court');if(BD_ADVENTURE.rooms.includes(BD_MUSEUM.room))keys.add('v8-'+(BD_MUSEUM.room==='siloam'?'siloam':BD_MUSEUM.room==='water'?'water':'tunnel'));}
 else keys.add(game.scene==='cabin'?'cabin':game.site?.scene);
 if(BD_CAMP.active()){keys.add(BD_CAMP.sceneArt(game.site));keys.add('camp-sign');}
 if(game.hallTransition?.bronze)keys.add(game.hallTransition.fromRoom==='front'?'m4-entry':'m4-scroll');
 return keys;
 /* Code by Daniel using ChatGPT November 24, 2026 */
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_RESILIENCE.trim=function limitDecodedPaintings(){
 const live=BD_RESILIENCE.live,pin=BD_RESILIENCE.pinned();for(const [name,image] of live){if(live.size<=BD_RESILIENCE.maxPaintings)break;if(pin.has(name))continue;delete BD_ART.rawImages[name];live.delete(name);image.src='';}
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_RESILIENCE.art=function loadOnePainting(name){
 if(BD_ART.rawImages[name])return Promise.resolve(BD_ART.rawImages[name]);if(BD_RESILIENCE.pending.has(name))return BD_RESILIENCE.pending.get(name);
 const pending=(async function decodePainting(){const image=new Image();image.src=BD_ART.assetURL('assets/'+(BD_ART.catalog[name]||name)+'.webp');try{await image.decode();BD_ART.rawImages[name]=image;if(image.width*image.height>=500000){BD_RESILIENCE.live.delete(name);BD_RESILIENCE.live.set(name,image);BD_RESILIENCE.trim();}if(game.save){game.dirty=true;document.dispatchEvent(new CustomEvent('bd-art-ready',{detail:name}));}return image;}catch(error){if(!BD_RESILIENCE.failed.has(name)){BD_RESILIENCE.failed.add(name);if(game.ready)BD_RESILIENCE.error('An illustration could not load: '+name);}return null;}finally{BD_RESILIENCE.pending.delete(name);}
 /* Code by Daniel using ChatGPT November 17, 2026 */
 })();BD_RESILIENCE.pending.set(name,pending);return pending;
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_RESILIENCE.prepareArt=async function prepareLazyArtwork(names){
 BD_ART.catalog={};for(const name of names)BD_ART.catalog[name]=({'m4-garden':'m6-garden','m4-ot-kings':'m6-nimrud','find-6':'find-6-v2','m4-ot-egypt':'m4-ot-egypt-v2','m4-entry':'m4-entry-v3','m4-scroll':'m5-scroll-v5','m5-front-v2':'m5-front-v3'})[name]||name;
 for(const name of ['v8-court','v8-tunnel','v8-water','v8-siloam'])BD_ART.catalog[name]=name;
 BD_ART.rawImages={};BD_ART.images=new Proxy(BD_ART.rawImages,{get:function getDecodedArtwork(target,name){if(typeof name!=='string')return target[name];const im=target[name];if(im){if(BD_RESILIENCE.live.has(name)){BD_RESILIENCE.live.delete(name);BD_RESILIENCE.live.set(name,im);}return im;}if(BD_ART.catalog[name])BD_RESILIENCE.art(name);return undefined;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }});
 // Idle poses and working tools stay resident. Walking frames arrive on use with a full idle-pose fallback. Large paintings use the bounded LRU.
 const essential=names.filter(function firstScreen(name){return name==='m5-front-v2'||name==='m4-entry'||name.startsWith('traveler-')||name.startsWith('v18-sign-')||name.startsWith('v19-map-')||name.startsWith('find-')||name.startsWith('dig-v7-')||['m5-table','m5-land','m5-glass','m4-plinth','m4-dust','m4-drum','m4-cradle','m4-stone-pier','m4-ivory-pier'].includes(name)||name.startsWith('person-');
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });
 const results=await Promise.all(essential.map(BD_RESILIENCE.art));BD_ART.ready=true;return results.filter(function absent(image){return !image;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }).length;
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_RESILIENCE.download=function exportRecoveryCopy(){
 const payload={...game.save,_diagnostic:{edition:'0.14.0',date:new Date().toISOString(),errors:BD_RESILIENCE.errors}},url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='biblical-discovery-recovery.json';a.click();setTimeout(function releaseDownload(){URL.revokeObjectURL(url);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 },1000);
 /* Code by Daniel using ChatGPT November 18, 2026 */
};
BD_RESILIENCE.error=function visibleRecovery(message){
 BD_RESILIENCE.errors.push({at:new Date().toISOString(),message:String(message).slice(0,240)});BD_RESILIENCE.errors=BD_RESILIENCE.errors.slice(-20);if($('#error-recovery'))return;
 const box=document.createElement('aside');box.id='error-recovery';box.className='error-recovery';box.setAttribute('role','alert');box.innerHTML='<p>Something interrupted the expedition. Your saved museum is still here.</p><button data-recovery="export">Export progress &amp; error notes</button><button data-recovery="retry">Retry illustrations</button><button data-recovery="close">Dismiss</button>';($('#panel').open?$('#panel'):document.body).append(box);
 box.addEventListener('click',function recoveryAction(event){const kind=event.target.dataset.recovery;if(kind==='export')BD_RESILIENCE.download();if(kind==='retry'){const names=[...BD_RESILIENCE.failed];BD_RESILIENCE.failed.clear();for(const name of names)BD_RESILIENCE.art(name);game.dirty=true;}if(kind==='close')box.remove();
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_RESILIENCE.install=function installLocalResilience(){
 persist=function saveAfterQuietMoment(){clearTimeout(BD_RESILIENCE.timer);BD_RESILIENCE.timer=setTimeout(BD_RESILIENCE.flush,400);game.dirty=true;updateCounts();
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 loadSave=function loadWithPreviousCopy(){for(const key of [SAVE_KEY,SAVE_KEY+'-previous']){try{const raw=localStorage.getItem(key);if(!raw)continue;const save=sanitizeSave(JSON.parse(raw));if(key!==SAVE_KEY)setTimeout(function recoveredNotice(){toast('Your previous saved museum was recovered. Export a copy when ready.');
 /* Code by Daniel using ChatGPT November 17, 2026 */
 },1600);return save;}catch(error){/* Try the previous copy before starting fresh. */}}return defaultSave();
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
const originalEnter=BD_MUSEUM.enter;BD_MUSEUM.enter=function loadCurrentRoomBeforeWalking(id,options){const previous=document.createElement('canvas');previous.width=W;previous.height=H;previous.getContext('2d').drawImage(canvas,0,0);originalEnter(id,options);const r=BD_MUSEUM.config(),room=BD_MUSEUM.room,names=room==='court'?['v8-court']:BD_ADVENTURE.rooms.includes(room)?['v8-'+(room==='siloam'?'siloam':room==='water'?'water':'tunnel')]:r.images.map(function roomKey(name){return (room==='front'?'m5-':'m4-')+name;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }),missing=names.filter(function missingPainting(name){return !BD_ART.rawImages?.[name];
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }),ticket={};BD_RESILIENCE.roomTicket=ticket;game.roomArtLoading=missing.length>0;BD_RESILIENCE.roomFallback=game.roomArtLoading?previous:null;$('#load-indicator').hidden=!game.roomArtLoading;if(game.roomArtLoading){$('#load-indicator').textContent='Opening '+r.title+'…';Promise.all(missing.map(BD_RESILIENCE.art)).then(function roomPaintingsReady(){if(BD_RESILIENCE.roomTicket!==ticket)return;game.roomArtLoading=false;BD_RESILIENCE.roomFallback=null;$('#load-indicator').hidden=true;game.dirty=true;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });}
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 const originalDraw=BD_MUSEUM.draw;BD_MUSEUM.draw=function holdLastRoomWhileLoading(time){if(game.roomArtLoading&&BD_RESILIENCE.roomFallback){ctx.drawImage(BD_RESILIENCE.roomFallback,0,0);ctx.fillStyle='#193a3460';ctx.fillRect(0,0,W,H);return;}originalDraw(time);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 const originalMovement=updateMovement;updateMovement=function waitForVisibleRoom(dt,time){if(game.roomArtLoading&&game.scene==='museum'&&!game.flight){game.player.walking=false;return;}originalMovement(dt,time);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 const originalPanel=BD_JOURNEY.panel;BD_JOURNEY.panel=function modalRecoveryLayer(kind){originalPanel(kind);const recovery=$('#error-recovery');if(recovery)$('#panel').append(recovery);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 $('#panel').addEventListener('close',function restoreRecoveryBanner(){const recovery=$('#error-recovery');if(recovery)document.body.append(recovery);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });
 const originalViewTick=BD_VIEW.tick;BD_VIEW.tick=function motionPreferenceClass(){if(game.save)document.body.classList.toggle('reduce-motion',!BD_VIEW.allowed());originalViewTick();
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 window.addEventListener('pagehide',BD_RESILIENCE.flush);document.addEventListener('visibilitychange',function saveWhenHidden(){if(document.hidden)BD_RESILIENCE.flush();
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });
 window.addEventListener('error',function reportGameError(event){if(event.error)BD_RESILIENCE.error(event.message);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });window.addEventListener('unhandledrejection',function reportPromiseError(event){BD_RESILIENCE.error(event.reason?.message||'An asynchronous action could not finish.');
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });
 document.addEventListener('pointerdown',function pointerDevice(event){document.body.dataset.input=event.pointerType==='touch'?'touch':'mouse';const hint=$('#interact-button');if(hint)hint.innerHTML=event.pointerType==='touch'?'Investigate':'Investigate <kbd>E</kbd>';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 },true);
 document.addEventListener('keydown',function keyboardDevice(){document.body.dataset.input='keys';const hint=$('#interact-button');if(hint)hint.innerHTML='Investigate <kbd>E</kbd>';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 },true);
 const originalPad=BD_CONTROLLER.read;BD_CONTROLLER.read=function activeControllerGlyphs(p,time){const r=originalPad(p,time);if(r.a||r.b||r.start||r.x||r.y){document.body.dataset.input='pad';const hint=$('#interact-button');if(hint)hint.innerHTML='Investigate <kbd>A</kbd>';}return r;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 document.addEventListener('bd-art-ready',function repaintLazyPanel(event){const picture=$('#model-close');if(picture&&$('#panel').open&&BD_RESILIENCE.modelKey){const key=BD_RESILIENCE.modelKey,model=BD_MODELS.items[key];if(event.detail==='m5-'+model.art||key==='masada'&&event.detail==='m4-mmodel')BD_MODELS.paintClose(picture,key);}
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });
 const originalModel=BD_MODELS.open;BD_MODELS.open=function rememberOpenModel(key){BD_RESILIENCE.modelKey=key;return originalModel(key);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 document.addEventListener('click',function requestDurableStorage(){if(game.save&&navigator.storage?.persist)navigator.storage.persist().catch(function storageUnavailable(){/* Export remains available. */
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });
 /* Code by Daniel using ChatGPT November 17, 2026 */
 },{once:true});
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
