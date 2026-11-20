'use strict';
// A place first: physical objects own navigation; invisible controls retain keyboard/controller access.
window.BD_IMMERSION={hoverTimer:0,mapTimer:0,tiles:null,boards:null,selection:null,
 verse:['But he was pierced','because of our rebellion,','crushed because of our iniquities;','punishment for our peace','was on him,','and we are healed','by his wounds.']};
BD_IMMERSION.state=function immersionProgress(){return game.save.immersion||(game.save.immersion={version:1,meetRoom:null,boards:{}});
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_IMMERSION.clean=function cleanMuseumInterface(raw,clean){
 const r=raw.immersion||{},boards={};for(const id of ['court','qumran','oxyrhynchus']){const b=r.boards?.[id];if(b)boards[id]={order:Array.isArray(b.order)?Array.from({length:7},function tile(_,i){const n=b.order[i];return Number.isInteger(n)&&n>=0&&n<7&&b.order.indexOf(n)===i?n:null;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }):[],phase:b.phase==='compare'?'compare':'assemble',checked:!!b.checked};}
 clean.immersion={version:1,meetRoom:['ot','nt','scroll'].includes(r.meetRoom)?r.meetRoom:null,boards};
 clean.settings.labels=r.version===1?!!raw.settings?.labels:false;clean.settings.touchPad=!!raw.settings?.touchPad;
 return clean;
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_IMMERSION.caption=function fleetingObjectName(text,hold=4000){
 const label=$('#object-caption');if(!label)return;clearTimeout(BD_IMMERSION.hoverTimer);label.textContent=text||'';label.classList.toggle('visible',!!text);if(text)BD_IMMERSION.hoverTimer=setTimeout(function letTheNameGo(){label.classList.remove('visible');
 /* Code by Daniel using ChatGPT November 17, 2026 */
 },hold);
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_IMMERSION.box=function physicalObjectBounds(h){
 const room=BD_MUSEUM.room,id=h.id;
 if(game.scene==='museum'){
  if(id.startsWith('model-')){const key=id.slice(6),m=BD_MODELS.items[key],p=BD_MODELS.metrics(m);if(key==='land'){const top=p.top-Math.min(p.height*.8,p.width*.55)*.81;return [m.x-p.width*.57,top-12,m.x+p.width*.57,m.y+24];}return [m.x-p.width*.56,p.top-p.height*.9,m.x+p.width*.56,m.y+22];}
  if(id.startsWith('person-')){const actor=BD_PEOPLE.actors().find(function identity(a){return 'person-'+a.id===id;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });if(actor){const ht=BD_PEOPLE.height(actor);return [actor.p[0]-ht*.25,actor.p[1]-ht,actor.p[0]+ht*.25,actor.p[1]+4];}}
  if(BD_MUSEUM.displays[id]){const p=BD_MUSEUM.display(BD_SITES.find(function site(s){return s.id===id;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }));return [p.x-p.w*.6,p.y-p.h-90,p.x+p.w*.6,p.y+25];}
  if(room==='entry'){const boxes={'old-door':[360,280,570,620],'scroll-door':[635,270,905,620],'new-door':[1020,280,1245,620],'olive-court':[1350,575,1530,820],'information-desk':[1090,730,1440,910],'museum-plan':[1090,690,1200,785],'sea-bench':[35,645,220,825],depart:[680,955,890,1024]};if(boxes[id])return boxes[id];}
  if(room==='front'){if(id==='front-door')return [680,450,870,675];if(id==='airfield-path')return [1340,730,1536,1015];}
  if(room==='court'){const boxes={scribe:[310,595,640,780],record:[675,595,1015,780],seal:[1060,590,1405,780],'court-return':[45,350,250,790],'miriam-margin':[1410,730,1500,825]};if(boxes[id])return boxes[id];}
  if(id.startsWith('history-'))return [h.x-52,580,h.x+52,648];
  if(id==='upstairs')return [650,1320,1340,1610];if(id==='look-up')return [200,0,1330,1430];
  if(id==='east-door'||id==='west-door')return [h.x-70,h.y-190,h.x+70,h.y+170];
  if(id==='armor-station')return [3090,700,3310,920];if(id==='priscilla-note')return [5620,730,5810,915];
 }
 if(game.scene==='cabin'){const boxes={'map-table':[395,310,805,650],bookshelf:[270,430,625,760],lab:[1110,395,1500,790],crew:[880,250,1110,650],'museum-return':[855,900,1110,1024]};if(boxes[id])return boxes[id];}
 if(game.scene==='site'){const boxes={dig:[180,570,665,745],'field-notes':[1030,390,1245,720],'field-lab':[1230,480,1510,780],'plane-return':[720,880,1070,1024]};if(boxes[id])return boxes[id];}
 return [h.x-65,h.y-45,h.x+65,h.y+110];
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_IMMERSION.position=function projectWholeObjects(){
 const rect=sceneRect(),view=$('#hotspots').getBoundingClientRect(),drift=BD_VIEW.scale(),museum=game.scene==='museum'&&!game.flight;
 for(const b of $('#hotspots').children){const h=game.hotspots.find(function hot(s){return s.id===b.dataset.hotspot;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });if(!h)continue;const box=BD_IMMERSION.box(h),a=museum?BD_MUSEUM.screen(box.slice(0,2)):box.slice(0,2),z=museum?BD_MUSEUM.screen(box.slice(2)):box.slice(2);
 b.hidden=z[0]<0||a[0]>W||z[1]<0||a[1]>H;b.style.left=((rect.x-view.left+a[0]*rect.scaleX)/drift)+'px';b.style.top=((rect.y-view.top+a[1]*rect.scaleY)/drift)+'px';b.style.width=((z[0]-a[0])*rect.scaleX/drift)+'px';b.style.height=((z[1]-a[1])*rect.scaleY/drift)+'px';b.style.zIndex=h.id==='upstairs'?'8':h.id==='museum-plan'?'7':h.id.startsWith('person-')?'6':'3';}
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_IMMERSION.pack=function openFieldBackpack(){
 openPanel('YOUR FIELD BACKPACK','<h2 class="sr-only">Your field backpack</h2><div class="pack-open"><img class="pack-portrait" src="'+BD_ART.assetURL('assets/v9-backpack.webp')+'" alt="Canvas and leather field backpack"><div class="pack-contents"><button class="pack-object folded-guide" data-action="guide"><span aria-hidden="true">⌖</span><b>Scene Guide</b><small>Places within this room</small></button><button class="pack-object field-notebook" data-action="journal"><span aria-hidden="true">▤</span><b>Investigation notebook</b><small>Your finds and field record</small></button><button class="pack-object folded-map" data-action="atlas"><span aria-hidden="true">⌁</span><b>Planning Map</b><small>Choose an expedition</small></button><button class="pack-object brass-kit" data-action="settings"><span aria-hidden="true">⚙</span><b>Settings</b><small>Labels, sound &amp; controls</small></button><button class="pack-object library-book" data-action="library"><span aria-hidden="true">▥</span><b>Flying library</b><small>Books worth taking along</small></button><button class="pack-object expedition-folio" data-adventure="board"><span aria-hidden="true">✦</span><b>The Water Route</b><small>Application &amp; resume</small></button></div></div><div class="pack-tucked"><button data-action="museum-plan">Museum floor plan</button><button data-action="museum-entry">Return to Entry</button><button data-action="cabin">The Kingfisher aircraft</button><button data-journey="menu">Passport &amp; field tools</button><button data-action="gospel">The Christian hope</button><button data-action="about">Our approach to evidence</button><button data-action="controller-help">Controller controls</button></div>','backpack');
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_IMMERSION.map=function leanOverExpeditionMap(){
 if(game.dialogKind==='atlas'&&$('#relief-exhibit')){BD_IMMERSION.selectMap(BD_ATLAS.selected||BD_SITES[0].id);return;}
 const selected=BD_ATLAS.selected||BD_SITES[0].id;openPanel('THE LAND BETWEEN · EXPEDITION MAP','<h2 class="sr-only">Expedition Map</h2><div id="relief-exhibit"><section class="relief-picture"><div class="relief-surface"><canvas id="atlas-canvas" width="1536" height="1024" aria-label="Raised relief map of the Bible lands"></canvas><div id="map-lamps">'+BD_SITES.map(function lamp(s){const uv=BD_MODELS.siteUV[s.id];return '<button class="map-lamp" data-map-site="'+s.id+'" style="left:'+uv[0]*100+'%;top:'+uv[1]*100+'%" aria-label="Locate '+escapeHTML(s.place)+'"><i></i></button>';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }).join('')+'</div></div><div id="map-place-note" role="status" aria-live="polite"></div><p class="map-engraving">THE LAND BETWEEN · ILLUSTRATED RELIEF MODEL</p></section><aside class="destination-rack"><p class="eyebrow">EXPEDITION REGISTER</p><h3>Where shall we go?</h3><div class="destination-columns">'+BD_SITES.map(function destination(s){return '<button data-select-site="'+s.id+'" aria-pressed="false"><i aria-hidden="true"></i><span>'+escapeHTML(s.place)+'<small>'+escapeHTML(s.artifact)+'</small></span></button>';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }).join('')+'</div><div class="route-ticket"><p id="map-site-significance"></p><button class="button" id="map-depart" data-fly="'+selected+'">Travel to the site →</button><button class="text-help" id="map-brief" data-brief="'+selected+'">Open the field briefing</button></div></aside></div>','atlas');
 const picture=$('#atlas-canvas'),c=picture.getContext('2d'),im=BD_ART.images['m5-land'];if(im)c.drawImage(im,0,0,1536,1024);else{picture.setAttribute('aria-busy','true');BD_RESILIENCE.art('m5-land').then(function repaintReliefAfterReload(loaded){if(loaded&&picture.isConnected){c.drawImage(loaded,0,0,1536,1024);picture.removeAttribute('aria-busy');}
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });}document.body.classList.add('leaning-over-map');BD_IMMERSION.fitMap();BD_IMMERSION.selectMap(selected);
 const previous=game.dialogCleanup;game.dialogCleanup=function putMapBackInTheRoom(){clearTimeout(BD_IMMERSION.mapTimer);document.body.classList.remove('leaning-over-map');if(previous)previous();
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_IMMERSION.fitMap=function fitThePhysicalMap(){const picture=$('.map-exhibit .relief-picture'),surface=$('.map-exhibit .relief-surface');if(!picture||!surface)return;const r=picture.getBoundingClientRect(),border=parseFloat(getComputedStyle(surface).borderLeftWidth)*2,w=Math.max(120,Math.min(r.width-8,(r.height-12-border)*1.5+border));surface.style.width=w+'px';surface.style.height=((w-border)/1.5+border)+'px';
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_IMMERSION.selectMap=function lightDestination(id){
 const site=BD_SITES.find(function find(s){return s.id===id;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });if(!site||!$('#relief-exhibit'))return;BD_ATLAS.selected=id;
 for(const b of document.querySelectorAll('[data-map-site],[data-select-site]')){const selected=(b.dataset.mapSite||b.dataset.selectSite)===id;b.classList.toggle('lit',selected);b.setAttribute('aria-pressed',String(selected));}
 $('#map-depart').dataset.fly=id;$('#map-depart').textContent='Fly to '+site.place+' →';$('#map-brief').dataset.brief=id;$('#map-site-significance').textContent=site.hook;
 const note=$('#map-place-note');clearTimeout(BD_IMMERSION.mapTimer);note.textContent=site.place+' · '+site.artifact;note.classList.remove('visible');void note.offsetWidth;note.classList.add('visible');BD_IMMERSION.mapTimer=setTimeout(function fadeThePlaceNote(){note.classList.remove('visible');
 /* Code by Daniel using ChatGPT November 17, 2026 */
 },4150);
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_IMMERSION.plaque=function mountedMuseumSign(c,x,y,w,title,subtitle){
 c.save();c.fillStyle='#253e36';c.shadowColor='#47362255';c.shadowBlur=6;c.shadowOffsetY=4;c.fillRect(x-w/2,y,w,subtitle?61:48);c.shadowBlur=0;c.shadowOffsetY=0;c.strokeStyle='#bea16b';c.lineWidth=2;c.strokeRect(x-w/2+4,y+4,w-8,subtitle?53:40);c.fillStyle='#ead6a1';for(const dx of [-w/2+13,w/2-13]){c.beginPath();c.arc(x+dx,y+12,2,0,Math.PI*2);c.fill();}c.font='21px Georgia';c.textAlign='center';c.fillText(title,x,y+31,w-28);if(subtitle){c.font='10px Trebuchet MS';c.fillText(subtitle,x,y+49,w-25);}c.restore();
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_IMMERSION.architecture=function signageInTheRoom(c,r){
 if(r.group!=='entry')return;BD_IMMERSION.plaque(c,460,230,250,'Old Testament','KINGS · KINGDOMS · THE WRITTEN WORD');BD_IMMERSION.plaque(c,770,205,250,'Scroll Room','SCRIPTURE · PROMISE · THE ACCOUNTS ↑');BD_IMMERSION.plaque(c,1135,230,255,'New Testament','JESUS · THE APOSTLES · THE CHURCH');
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_IMMERSION.hardBook=function aPlainSeaWindowBench(c){if(window.BD_MAP_VIEW)BD_MAP_VIEW.bench(c);
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_IMMERSION.desk=function informationDesk(c){
 const im=BD_ART.images['v9-desk'];if(im)c.drawImage(im,1085,706,355,205);else BD_MUSEUM.stand(c,1265,905,350,155);
 c.save();c.textAlign='center';c.font='17px Georgia';c.fillStyle='#f3e5c1';c.fillText('INFORMATION DESK',1264,846);c.fillStyle='#6b6552';c.fillText('INFORMATION DESK',1264,845);c.fillStyle='#3e4939';c.fillRect(1105,734,76,44);c.strokeStyle='#bea36b';c.strokeRect(1108,737,70,38);c.fillStyle='#e7d3a1';c.font='10px Georgia';c.fillText('WATER ROUTE',1143,754);c.font='8px Trebuchet MS';c.fillText('FIELD FOLIO',1143,767);c.restore();
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_IMMERSION.courtSign=function courtWayfinding(c){
 c.save();c.fillStyle='#7b755d';c.beginPath();c.ellipse(1443,820,55,13,0,0,Math.PI*2);c.fill();c.fillStyle='#9e8b62';c.fillRect(1439,685,8,133);c.fillStyle='#efdfb7';c.strokeStyle='#8c764d';c.lineWidth=3;c.fillRect(1359,575,165,120);c.strokeRect(1359,575,165,120);c.fillStyle='#3d5142';c.textAlign='center';c.font='16px Georgia';c.fillText('This way to the',1442,600);c.fillText('Olive Court',1442,623);c.fillText('Games &',1442,646);c.fillText('Food Court →',1442,670);c.restore();
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_IMMERSION.docent=function docentInThisRoom(){return {id:'docent',name:'Mara · docent',art:'docent',adult:true,p:BD_PEOPLE.docentSpots[BD_PEOPLE.docentIndex],pose:BD_PEOPLE.docentIndex*3+BD_PEOPLE.docentPose,focus:'welcome'};
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_IMMERSION.invite=function arrangeDocentVisit(){openPanel('MARA · A ROOM TO EXPLORE TOGETHER','<h2>Where shall we meet?</h2><p class="field-line">Mara: “Choose a hall. I’ll meet you there.”</p><div class="actions">'+[['ot','Old Testament','ot-2'],['nt','New Testament','nt-2'],['scroll','Scroll Room','scroll']].map(function room([id,label,to]){return '<button class="button secondary" data-meet-room="'+id+'" data-meet-to="'+to+'">'+label+'</button>';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }).join('')+'</div><p class="fine-print">Mara changes rooms while you are elsewhere. There is no appointment clock.</p>','docent-invitation');
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_IMMERSION.docentFact=function roomConversation(){const room=BD_MUSEUM.room,lines={ot:['An enemy knew David’s house','The Tel Dan inscription names the House of David. A neighboring ruler used the same dynastic name found in the biblical accounts. Independent agreement matters.','tel-dan'],nt:['A governor with a date','Pilate’s stone names the Roman prefect; Gallio’s inscription helps date Paul’s time in Corinth. Named people and places give us evidence we can compare.','caesarea'],scroll:['A promise before the fulfillment','The Great Isaiah Scroll was copied about 125 BC. Isaiah 53 was already on this parchment well before Jesus. Christians did not insert the servant passage afterward. Read Isaiah and Acts 8 together.','qumran']},v=lines[room];if(!v){BD_PEOPLE.conversation(BD_IMMERSION.docent());return;}openPanel('MARA · IN THE GALLERY','<h2>'+v[0]+'</h2><p class="lede">'+v[1]+'</p><div class="actions"><button class="button" data-card="'+v[2]+'">Look at the evidence together</button><button class="button secondary" data-invite-docent>Meet in another room</button></div>','docent-fact');
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_IMMERSION.tileControls=function replacePracticeDropdowns(){
 const kind=game.dialogKind;if(!['read-word','rebuild-copies','practice-game'].includes(kind))return;const selects=[...document.querySelectorAll('#panel-body select')];if(!selects.length)return;
 const container=selects[0].closest('.word-choices,.copy-reconstruction,.scribe-copy,.armor-board');if(!container||container.nextElementSibling?.classList.contains('tactile-work'))return;
 const host=document.createElement('section');host.className='tactile-work';host.setAttribute('aria-label','Move tiles to the matching places');const bank=[];for(const s of selects)for(const o of s.options)if(o.value!==''&&o.value!=='-1'&&!bank.includes(o.textContent))bank.push(o.textContent);
 host.innerHTML='<div class="tile-slots">'+selects.map(function slot(s,i){const label=s.closest('label'),name=label?.querySelector('b,span,small')?.textContent||'Place '+(i+1);return '<button class="tile-slot" data-tile-slot="'+i+'"><small>'+escapeHTML(name)+'</small><span></span></button>';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }).join('')+'</div><div class="ink-tile-bank">'+bank.map(function tile(text,i){return '<button class="ink-tile" data-ink-tile="'+i+'">'+escapeHTML(text)+'</button>';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }).join('')+'</div><p class="tile-help" role="status">Drag a tile to a place, or choose a tile and then its place.</p>';
 container.hidden=true;container.after(host);const state={host,selects,bank,selected:null};BD_IMMERSION.tiles=state;
 const put=function placeInkTile(index){if(state.selected===null)return;const text=bank[state.selected],select=selects[index],option=[...select.options].find(function matching(o){return o.textContent===text;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });if(!option){host.querySelector('.tile-help').textContent='Compare that place with the key. Try another tile.';return;}select.value=option.value;select.dispatchEvent(new Event('change',{bubbles:true}));BD_IMMERSION.refreshTiles();host.querySelector('.tile-help').textContent='Placed: '+text+'. Choose another tile or check your work.';
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 host.addEventListener('click',function chooseInkTile(e){const tile=e.target.closest('[data-ink-tile]'),slot=e.target.closest('[data-tile-slot]');if(tile){state.selected=Number(tile.dataset.inkTile);for(const b of host.querySelectorAll('[data-ink-tile]'))b.classList.toggle('selected',b===tile);}if(slot)put(Number(slot.dataset.tileSlot));
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });BD_IMMERSION.dragTiles(host,'[data-ink-tile]','[data-tile-slot]',function dragSelect(b){state.selected=Number(b.dataset.inkTile);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 },function dragPlace(b){put(Number(b.dataset.tileSlot));
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });BD_IMMERSION.refreshTiles();
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_IMMERSION.refreshTiles=function keepTilesInSync(){const s=BD_IMMERSION.tiles;if(!s?.host.isConnected)return;for(let i=0;i<s.selects.length;i++){const select=s.selects[i],text=select.value!==''&&select.value!=='-1'?select.selectedOptions[0]?.textContent||'':'Place a tile';s.host.querySelector('[data-tile-slot="'+i+'"] span').textContent=text;}
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_IMMERSION.dragTiles=function tactilePointerAndTouch(host,tileSelector,slotSelector,onSelect,onPlace){
 let drag=null,ghost=null,suppress=0;host.addEventListener('pointerdown',function liftTile(e){const tile=e.target.closest(tileSelector);if(!tile||e.button!==0)return;drag={tile,x:e.clientX,y:e.clientY,id:e.pointerId,moved:false};tile.setPointerCapture(e.pointerId);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });host.addEventListener('pointermove',function carryTile(e){if(!drag||drag.id!==e.pointerId)return;if(Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>8)drag.moved=true;if(!drag.moved)return;e.preventDefault();if(!ghost){onSelect(drag.tile);ghost=document.createElement('div');ghost.className='tile-ghost';ghost.textContent=drag.tile.textContent;$('#panel').append(ghost);}ghost.style.left=e.clientX+'px';ghost.style.top=e.clientY+'px';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });host.addEventListener('pointerup',function setTileDown(e){if(!drag||drag.id!==e.pointerId)return;const moved=drag.moved;drag=null;ghost?.remove();ghost=null;if(!moved)return;const slot=document.elementFromPoint(e.clientX,e.clientY)?.closest(slotSelector);if(slot&&host.contains(slot)){onPlace(slot);suppress=performance.now()+500;}e.preventDefault();
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });host.addEventListener('pointercancel',function releaseTile(){drag=null;ghost?.remove();ghost=null;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });host.addEventListener('click',function noDuplicateDrop(e){if(e.detail>0&&performance.now()<suppress){e.preventDefault();e.stopImmediatePropagation();}
 /* Code by Daniel using ChatGPT November 17, 2026 */
 },true);
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_IMMERSION.isaiah=function manuscriptActivity(site){
 const key=site?.id||'court',progress=BD_IMMERSION.state(),s=progress.boards[key]||(progress.boards[key]={order:[],phase:'assemble',checked:false}),verse=BD_IMMERSION.verse.join(' '),court=!site,order=[3,0,5,2,6,1,4];BD_IMMERSION.boards={site,key,s,selected:null};
 const context='<div class="isaiah-context"><b>Great Isaiah Scroll · 1QIsaᵃ · about 125 BC</b><p>These words were copied well over a century before Jesus. That rules out their being inserted by Christians after his life. Acts 8 shows Philip explaining Isaiah’s servant passage in relation to Jesus.</p></div>';
 const board=s.phase==='assemble'?'<blockquote class="scripture-reading isaiah-exemplar">'+escapeHTML(verse)+'</blockquote><div class="isaiah-slots">'+BD_IMMERSION.verse.map(function slot(_,i){return '<button class="tile-slot" data-isaiah-slot="'+i+'" '+(Number.isInteger(s.order[i])?'data-phrase="'+s.order[i]+'"':'')+'><small>PHRASE '+(i+1)+'</small><span>'+escapeHTML(!Number.isInteger(s.order[i])?'Place a phrase':BD_IMMERSION.verse[s.order[i]])+'</span></button>';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }).join('')+'</div><div class="ink-tile-bank isaiah-bank">'+order.map(function phrase(i){return '<button class="ink-tile" data-isaiah-tile="'+i+'" '+(s.order.includes(i)?'disabled':'')+'>'+escapeHTML(BD_IMMERSION.verse[i])+'</button>';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }).join('')+'</div><button class="button" id="compare-reconstruction">Compare the passage →</button>':'<p class="field-line">Mara: “A practice copy changed ‘our rebellion’ to ‘their rebellion.’ Compare the witnesses.”</p><div class="witnesses"><p><small>COPY A</small>because of our rebellion,</p><p><small>COPY B</small>because of their rebellion,</p><p><small>COPY C</small>because of our rebellion,</p></div><div class="actions"><button class="ink-tile" data-isaiah-reading="0">because of their rebellion,</button><button class="ink-tile" data-isaiah-reading="1">because of our rebellion,</button></div><details><summary>Read the passage again</summary><blockquote>'+escapeHTML(verse)+'</blockquote></details><p class="fine-print">These English practice slips are invented examples, not reported variants in the Great Isaiah Scroll.</p>';
 openPanel('THE SCRIBE’S DESK · A PROMISE BEFORE CHRIST','<h2>Isaiah’s suffering servant.</h2>'+context+'<p class="field-line">Mara: “'+(s.phase==='assemble'?'Place the words. Notice what the servant carries for others.':'Written witnesses can be compared. Which phrase fits the passage?')+'”</p><div class="practice-board isaiah-board">'+board+'</div><p id="isaiah-feedback" role="status">'+(s.checked?'The witnesses preserve “our rebellion.” Read Isaiah 52:13–53:12 and Acts 8:26–35 together.':'Drag a phrase, or choose it and its place. Choose a placed phrase to move it again.')+'</p><div class="actions"><button class="button secondary" id="reveal-practice">Work through one phrase with Mara</button><button class="button" id="copy-continue" '+(s.checked?'':'hidden')+'>'+ (court?'Keep the field seal →':'Support the study sheet →')+'</button><button class="button secondary" data-action="museum-entry">Keep exploring</button></div><p class="fine-print">Isaiah 53:5 · CSB · English translation, not a facsimile of the Hebrew manuscript.<br>'+escapeHTML(BD_SCRIPTURE_CREDIT)+'</p>',court?'isaiah-practice':'rebuild-copies');
 if(s.phase==='assemble'){
  const put=function putIsaiahPhrase(index){const n=BD_IMMERSION.boards.selected;if(n===null)return;const old=s.order.indexOf(n);if(old>=0)s.order[old]=s.order[index];s.order[index]=n;persist();BD_IMMERSION.isaiah(site);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
  for(const b of document.querySelectorAll('[data-isaiah-tile]'))b.addEventListener('click',function takePhrase(){BD_IMMERSION.boards.selected=Number(this.dataset.isaiahTile);for(const tile of document.querySelectorAll('[data-isaiah-tile]'))tile.classList.toggle('selected',tile===this);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });for(const b of document.querySelectorAll('[data-isaiah-slot]'))b.addEventListener('click',function setPhrase(){if(BD_IMMERSION.boards.selected===null&&this.hasAttribute('data-phrase')){BD_IMMERSION.boards.selected=Number(this.dataset.phrase);this.classList.add('selected');$('#isaiah-feedback').textContent='Choose another space to move or swap this phrase.';return;}put(Number(this.dataset.isaiahSlot));
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });BD_IMMERSION.dragTiles($('.isaiah-board'),'[data-isaiah-tile]:not(:disabled),[data-isaiah-slot][data-phrase]','[data-isaiah-slot]',function choosePhrase(b){BD_IMMERSION.boards.selected=Number(b.dataset.isaiahTile??b.dataset.phrase);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 },function placePhrase(b){put(Number(b.dataset.isaiahSlot));
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });$('#compare-reconstruction').addEventListener('click',function compareIsaiah(){if(BD_IMMERSION.verse.every(function right(_,i){return s.order[i]===i;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 })){s.phase='compare';persist();BD_IMMERSION.isaiah(site);}else $('#isaiah-feedback').textContent='Look at the passage. Each phrase keeps its meaning in the whole sentence.';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });
 }else for(const b of document.querySelectorAll('[data-isaiah-reading]'))b.addEventListener('click',function checkWitness(){if(this.dataset.isaiahReading!=='1'){$('#isaiah-feedback').textContent='Compare the witnesses and the whole passage. The servant carries our rebellion.';return;}s.checked=true;persist();$('#copy-continue').hidden=false;$('#isaiah-feedback').textContent='The servant bears our rebellion. These words were already here before Jesus.';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });
 $('#reveal-practice').addEventListener('click',function onePhraseTogether(){if(s.phase==='compare'){s.checked=true;persist();BD_IMMERSION.isaiah(site);return;}const i=BD_IMMERSION.verse.findIndex(function unfilled(_,n){return s.order[n]!==n;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });if(i<0){s.phase='compare';persist();BD_IMMERSION.isaiah(site);return;}const previous=s.order.indexOf(i);if(previous>=0)s.order[previous]=s.order[i];s.order[i]=i;persist();BD_IMMERSION.isaiah(site);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });$('#copy-continue').addEventListener('click',function preserveTheWitness(){if(!s.checked)return;if(court)BD_ADVENTURE.finishTask('scribe','Isaiah’s servant passage was on parchment before Jesus. Compare the witnesses.');else{const saved=BD_STUDY.state(site);saved.studyDone=true;saved.copiesCompared=true;persist();BD_STUDY.open(site);}
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_IMMERSION.install=function museumAsAPlace(){
 document.body.classList.add('immersive-museum');const oldDefault=defaultSave;defaultSave=function quietInterfaceDefaults(){const s=oldDefault();s.settings.labels=false;return s;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };const oldClean=sanitizeSave;sanitizeSave=function preserveImmersionSettings(raw){return BD_IMMERSION.clean(raw,oldClean(raw));
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 const oldLoad=loadSave;loadSave=function migrateQuietInterface(){const s=oldLoad();if(!s.immersion){s.immersion={version:1,meetRoom:null,boards:{}};s.settings.labels=false;}return s;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 const button=document.createElement('button');button.id='field-backpack';button.disabled=true;button.setAttribute('aria-label','Open backpack · Scene Guide, notebook, map and Settings');button.innerHTML='<img src="'+BD_ART.assetURL('assets/v9-backpack.webp')+'" alt="">';button.addEventListener('click',function physicalBackpackContents(){BD_IMMERSION.pack();
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });button.addEventListener('focus',function backpackFocusName(){BD_IMMERSION.caption('Your field backpack');
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });button.addEventListener('pointerenter',function backpackName(){BD_IMMERSION.caption('Your field backpack');
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });document.body.append(button);const caption=document.createElement('div');caption.id='object-caption';caption.setAttribute('role','status');caption.setAttribute('aria-live','polite');document.body.append(caption);
 const oldMake=makeHotspots;makeHotspots=function tangibleHitRegions(){oldMake();for(const b of $('#hotspots').children){b.addEventListener('pointerenter',function nameObject(){BD_IMMERSION.caption(this.getAttribute('aria-label'));
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });b.addEventListener('focus',function nameFocusedObject(){BD_IMMERSION.caption(this.getAttribute('aria-label'));
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });}BD_IMMERSION.position();
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };positionHotspots=BD_IMMERSION.position;showAtlas=BD_IMMERSION.map;
 BD_ART.catalogExtra={'v9-desk':'v9-desk'};const prepare=BD_RESILIENCE.prepareArt;BD_RESILIENCE.prepareArt=async function museumArt(names){const missing=await prepare(names);Object.assign(BD_ART.catalog,{'v9-desk':'v9-desk'});BD_ART.catalog['m4-entry']='v9-entry';return missing;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 // Entry art is already resident after boot; replace its background before showing that room.
 const oldEnter=BD_MUSEUM.enter;BD_MUSEUM.enter=function arriveInPhysicalMuseum(id,options){if(game.save){BD_IMMERSION.state();const group=/^(ot|nt)/.exec(id)?.[1]||id;if(BD_IMMERSION.pendingMeet===group){BD_IMMERSION.state().meetRoom=group;BD_IMMERSION.pendingMeet=null;}if(id==='entry'&&BD_ART.rawImages['m4-entry']&&!BD_IMMERSION.entryChanged){delete BD_ART.rawImages['m4-entry'];BD_RESILIENCE.live.delete('m4-entry');BD_IMMERSION.entryChanged=true;}}oldEnter(id,options);document.body.classList.toggle('show-scene-labels',!!game.save.settings.labels);BD_IMMERSION.caption('');
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 const oldPlaces=BD_MUSEUM.hotspots;BD_MUSEUM.hotspots=function embeddedMuseumObjects(){let spots=oldPlaces();if(BD_MUSEUM.room==='entry'){spots=spots.filter(function visibleObject(h){return h.id!=='reading-corner';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });const folio=spots.find(function f(h){return h.id==='museum-plan';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });const questions=spots.find(function hardQuestions(h){return h.id==='sea-bench';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });if(questions)questions.label='The sea-window bench · hard questions';if(folio){folio.x=1143;folio.y=735;folio.point=nearestFree(1050,970);}spots.push({id:'information-desk',x:1265,y:810,label:'Information Desk · Mara',icon:'',point:nearestFree(1070,970),action:function deskConversation(){BD_PEOPLE.conversation(BD_IMMERSION.docent());
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }});const court=spots.find(function c(h){return h.id==='olive-court';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });if(court){court.point=nearestFree(1475,950);court.label='This way to the Olive Court & Game Tables';}}
 return spots;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 BD_PEOPLE.docentSpots=[[1295,845],[1010,800],[185,940]];BD_PEOPLE.desk=BD_IMMERSION.desk;
 const oldActors=BD_PEOPLE.actors;BD_PEOPLE.actors=function invitedDocentAndCyclist(){const actors=oldActors(),room=BD_MUSEUM.room,meet=game.save&&BD_IMMERSION.state().meetRoom;for(const a of actors)if(a.id==='cyclist')a.p=[1245,735];if(meet===room&&room!=='entry'){const p=room==='scroll'?[1120,2170]:room==='ot'?[2460,960]:[2450,960];actors.push({id:'docent',name:'Mara · docent',art:'docent',adult:true,p,pose:0,focus:'invited'});}return actors;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 BD_PEOPLE.heard=true;
 const oldConversation=BD_PEOPLE.conversation;BD_PEOPLE.conversation=function invitedRoomConversation(actor){if(actor.id==='docent'&&actor.focus==='invited'){BD_IMMERSION.docentFact();return;}oldConversation(actor);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 const oldObstacles=BD_PEOPLE.obstacles;BD_PEOPLE.obstacles=function furnitureFootprints(){const b=oldObstacles();if(BD_MUSEUM.room==='entry'){return b.filter(function oldFurniture(box){return !(box[0]===1200&&box[1]===840||box[0]===970&&box[1]===820);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }).concat([[1090,790,1430,912],[40,820,245,870]]);}return b;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 const oldPanel=BD_JOURNEY.panel;BD_JOURNEY.panel=function parchmentAndPhysicalControls(kind){oldPanel(kind);BD_IMMERSION.caption('');$('#panel').classList.toggle('has-activity-step',['square-record','square-dig','patient-study','patient-excavation','patient-notebook','material-dig','material-word','read-word','rebuild-copies','isaiah-practice','claim-trays','display-label','care-choice','tunnel-task','fragment-recovered','discovery'].includes(kind));$('#panel').classList.toggle('map-exhibit',kind==='atlas');$('#panel').classList.toggle('pack-panel',kind==='backpack');$('#panel').classList.toggle('parchment-panel',['practice-game','isaiah-practice','rebuild-copies','read-word','material-dig','tunnel-task','claim-trays','display-label'].includes(kind));
 if(kind==='museum-person'&&$('#panel-label').textContent.includes('MARA'))$('#panel-body .actions')?.insertAdjacentHTML('beforeend','<button class="button secondary" data-invite-docent>Meet me in another room</button>');
 if(kind==='settings'){const label=$('#labels-setting')?.closest('label');if(label)label.querySelector('small').textContent='Optional discovery outlines and names. Off by default; hover names still appear.';$('#panel-body').insertAdjacentHTML('beforeend','<label class="setting-row"><span>Show touch direction pad<small>Floor taps work without it.</small></span><input type="checkbox" data-touch-pad '+(game.save.settings.touchPad?'checked':'')+'></label>');}
 BD_IMMERSION.tileControls();
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 BD_LEARNING.copies=BD_IMMERSION.isaiah;BD_ADVENTURE.scribe=function scriptureAtTheScribesDesk(){BD_IMMERSION.isaiah(null);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 const oldHard=BD_JOURNEY.hard;BD_JOURNEY.hard=function faithfulHistoricalQuestions(){oldHard();const block=document.createElement('section');block.className='note-block hopeful-evidence';block.innerHTML='<h3>Reasons to keep looking</h3><p>Historians weigh sources as a whole. A detail still awaiting confirmation is not, by itself, a reason to dismiss an account.</p><p>The Bible preserves reliable historical accounts. Following its geography has helped archaeologists understand real places and waterworks. Compare the named rulers, the fit with the time and place, early witnesses, and independent evidence.</p><p>A surviving inscription may answer one question; several independent lines can strengthen the whole case. The Great Isaiah Scroll gives a particularly clear example: Isaiah’s servant passage was copied before Jesus, not added by Christians afterward.</p><p class="field-line">Miriam: “Open the accounts. Follow the evidence. There are good reasons to trust Christ.”</p>';const actions=$('#panel-body .actions');if(actions)actions.before(block);else $('#panel-body').append(block);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 const oldLand=BD_MODELS.drawEntranceMap;BD_MODELS.drawEntranceMap=function redMuseumMapIndicators(c,model){const original=BD_MODELS.light;BD_MODELS.light=function redIndicator(d,x,y,size){d.save();d.fillStyle='#f34e39';d.shadowColor='#f34229';d.shadowBlur=10;d.beginPath();d.arc(x,y,size,0,Math.PI*2);d.fill();d.restore();
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };try{oldLand(c,model);}finally{BD_MODELS.light=original;}
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 const oldStep=BD_FIELD.nextStep;BD_FIELD.nextStep=function isaiahContinuation(){if(game.dialogKind==='isaiah-practice'){const target=$('#copy-continue');return target&&!target.hidden?{target,label:target.textContent,complete:true}:null;}return oldStep();
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 const oldNext=BD_FIELD.updateNext;BD_FIELD.updateNext=function meaningfulParchmentNext(){oldNext();if(['isaiah-practice','rebuild-copies'].includes(game.dialogKind)&&$('.isaiah-board')){const caption=$('[data-field-next-line]');if(caption&&!BD_FIELD.nextStep())caption.textContent=BD_IMMERSION.boards?.s.phase==='compare'?'Next: compare the written witnesses.':'Next: place Isaiah’s phrases in the parchment spaces.';}
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 const oldTick=BD_VIEW.tick;BD_VIEW.tick=function quietMuseumInterfaceTick(){oldTick();$('#field-backpack').disabled=!game.ready;if(!game.save)return;document.body.classList.toggle('show-scene-labels',!!game.save.settings.labels);document.body.classList.toggle('show-touch-pad',!!game.save.settings.touchPad);BD_IMMERSION.refreshTiles();const edge=game.scene==='museum'?BD_MUSEUM.config().images[0]:game.scene==='cabin'?'cabin':game.site?.scene,key=(game.flight?'flight:':'')+game.scene+':'+(game.scene==='museum'?BD_MUSEUM.room:edge);if(key!==BD_IMMERSION.edgeKey){BD_IMMERSION.edgeKey=key;const image=game.scene==='museum'?BD_MUSEUM.room==='entry'?'v9-entry':BD_MUSEUM.room==='front'?'m5-front-v3':BD_MUSEUM.room==='court'?'v8-court':BD_ADVENTURE.rooms.includes(BD_MUSEUM.room)?'v8-'+(BD_MUSEUM.room==='siloam'?'siloam':BD_MUSEUM.room==='water'?'water':'tunnel'):(BD_ART.catalog['m4-'+edge]||'m4-'+edge):edge;if(image)$('#viewport').style.setProperty('--room-edge-paint',game.flight?'none':'url("'+BD_ART.assetURL('assets/'+image+'.webp')+'")');$('#viewport').style.backgroundColor=game.flight?'#e4d7b4':'#4c4e3c';}const next=game.nearest?.id;if(document.body.dataset.input==='pad'&&next&&next!==BD_IMMERSION.lastNearest)BD_IMMERSION.caption(game.nearest.label);BD_IMMERSION.lastNearest=next;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 window.addEventListener('resize',BD_IMMERSION.fitMap);
 document.addEventListener('click',function physicalObjectActions(e){const b=e.target.closest('button');if(!b)return;if(b.dataset.mapSite)BD_IMMERSION.selectMap(b.dataset.mapSite);if(b.hasAttribute('data-invite-docent'))BD_IMMERSION.invite();if(b.dataset.meetRoom){BD_IMMERSION.pendingMeet=b.dataset.meetRoom;const to=b.dataset.meetTo;closePanel();BD_MUSEUM.begin(to);toast('Mara: I’ll meet you in the gallery.');}
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });document.addEventListener('change',function tactileSettings(e){if(e.target.matches('[data-touch-pad]')){game.save.settings.touchPad=e.target.checked;persist();}
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });document.addEventListener('keydown',function openPackKey(e){if(e.code==='KeyB'&&!e.repeat&&!$('#panel').open&&!e.target.matches('input,textarea,select')){e.preventDefault();BD_IMMERSION.pack();}
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
