'use strict';
// Small clues in the existing valley; map edges and actions use the real room connections.
const WAY_NAMES14={hall:'Lantern hall',gifts:'Christmas tree',closet:'Bedroom',nativity:'Bethlehem',ornaments:'Angel nook',rink:'Lantern pond',hallway:'Christmas gallery',workshop:'Toy workshop',clockshop:'Clock shop',sleigh:'Snowy bridge road',pinepass:'Pine woods',cave:'Woodland cave',snowgarden:'Snow garden',grandmother:'Grandmother’s cottage',kitchen:'Kitchen',mountain:'High snowy shelf'};
// Downward destinations are small foreground threshold markers, rather than room labels.
const FRONT_SIGN_POLICY25={faceY:95.2,pathOffsetX:8};
const WAY_SIGNS14={
 hall:{width:144,art:'stand',text:'Gallery'},
 gifts:{width:144,art:'stand',text:'Hall'},
 nativity:{width:148,art:'stone',text:'Home'},
 hallway:{width:148,art:'stand',text:'Village Road'},
 clockshop:{width:148,art:'stand',text:'Village Road'},
 sleigh:{width:148,art:'snow',text:'Gallery'},
 pinepass:{width:148,art:'snow',text:'Bridge'},
 cave:{width:148,art:'stone',text:'Pine Woods'},
 snowgarden:{width:148,art:'snow',text:'Pine Woods'},
 mountain:{width:148,art:'snow',text:'Cave Path'}
};
const FRONT_WALK23=97;
// Measured faces and anchors in the unmodified transparent source atlas.
const WAY_ART23={"file":"assets/wayfinding-23/painted-signs.png","frames":{"stand":{"rect":[82,108,611,352],"anchor":[387,449],"face":[[131,163],[643,163],[641,329],[133,329]]},"snow":{"rect":[841,5,610,514],"anchor":[1143,504],"face":[[870,128],[1419,126],[1410,286],[873,283]]},"stone":{"rect":[41,533,676,466],"anchor":[379,985],"face":[[148,637],[594,636],[601,862],[150,863]]},"plaque":{"rect":[804,589,689,346],"anchor":[1149,759],"face":[[851,658],[1456,657],[1456,881],[852,880]]}}};
const MAP_NODES14=[['hall',50,11,'hall'],['workshop',17,34,'toy'],['hallway',50,34,'hall'],['clockshop',83,34,'clock'],['sleigh',50,58,'lamp'],['snowgarden',17,83,'house'],['pinepass',50,83,'tree'],['cave',83,83,'cave']];
function wayName14(id){return WAY_NAMES14[id]||ROOMS[id]?.title||'The path';/* Code by Daniel using ChatGPT November 13, 2026 */}
function roomExits14(){
 if(state.room==='cave'&&state.tales.captured&&!state.tales.escaped)return [];
 return targets().filter(function exit(t){return !!t.to&&(!t.wardrobe||state.room==='nativity');/* Code by Daniel using ChatGPT November 13, 2026 */});
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function bottomExit14(){
 return roomExits14().find(function down(t){return t.edgeDirection==='front'||(state.room==='nativity'&&t.wardrobe);/* Code by Daniel using ChatGPT November 13, 2026 */});
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function walkExit14(target){
 if(!target||g.transition||panel.open)return false;
 if(state.riding)leaveVehicle();
 canvas.focus({preventScroll:true});return requestAction(target);
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function setupWayfinding14(){
 g.wayfinding14={welcome:false,room:state.room};
 $('#viewport').insertAdjacentHTML('beforeend','<button class="scene-sign23" id="edge-cue14" hidden><span id="edge-destination14"></span></button><aside class="keeper-welcome14" id="keeper-welcome14" hidden aria-label="The workshop keeper says"><strong>The workshop keeper</strong><p>“Before you go, look at the map beside the bench. You can take a copy for your waypack.”</p><div><button id="keeper-map14">Look at the map</button><button id="keeper-later14" aria-label="Close the keeper’s greeting">In a moment</button></div></aside>');
 $('#edge-cue14').onclick=function followEdge(){walkExit14(bottomExit14());/* Code by Daniel using ChatGPT November 14, 2026 */};
 $('#edge-cue14').onkeydown=function signKey23(e){if(e.code!=='Enter'&&e.code!=='Space')return;e.preventDefault();e.stopPropagation();if(!e.repeat)walkExit14(bottomExit14());/* Code by Daniel using ChatGPT November 14, 2026 */};
 $('#keeper-map14').onclick=showPocketMap14;
 $('#keeper-later14').onclick=function later(){g.wayfinding14.welcome=false;$('#keeper-welcome14').hidden=true;canvas.focus({preventScroll:true});/* Code by Daniel using ChatGPT November 14, 2026 */};
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
async function loadWayfindingArt23(){
 const image=await new Promise(function load(resolve,reject){const im=new Image();im.onload=function ready(){resolve(im);/* Code by Daniel using ChatGPT November 14, 2026 */};im.onerror=function failed(){reject(Error('Could not load the painted path signs.'));/* Code by Daniel using ChatGPT November 14, 2026 */};im.src=WAY_ART23.file;/* Code by Daniel using ChatGPT November 14, 2026 */});
 g.wayFrames23={};for(const [id,meta]of Object.entries(WAY_ART23.frames))g.wayFrames23[id]=detailCrop22(image,meta);
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function sceneSign23(){
 const spec=WAY_SIGNS14[state.room],exit=spec&&bottomExit14();if(!exit)return null;
 const meta=WAY_ART23.frames[spec.art],x=exit.x+FRONT_SIGN_POLICY25.pathOffsetX;
 let faceY=0;for(const corner of meta.face)faceY+=corner[1]/meta.face.length;
 // Keep the FACE near the bottom for every material; a tall post must not lift its label into the room.
 const scale=spec.width/meta.rect[2]*depthScale({x,y:100}),y=FRONT_SIGN_POLICY25.faceY-(faceY-meta.anchor[1])*scale/10.24;
 return {...spec,x,y};
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function signObstacles23(){
 // Their feet/posts extend out of the foreground, beyond the 97% exit threshold.
 return [];
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function signFaceWorld23(p){
 const frame=g.wayFrames23?.[p.art];if(!frame)return null;
 const scale=p.width/frame.w*depthScale(p),[sx,sy]=frame.meta.rect;
 return frame.meta.face.map(function corner(v){return {x:p.x*15.36+(v[0]-sx-frame.anchorX)*scale,y:p.y*10.24+(v[1]-sy-frame.anchorY)*scale};/* Code by Daniel using ChatGPT November 14, 2026 */});
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function positionSignButton23(button,p){
 const face=p&&signFaceWorld23(p);if(!face)return false;
 const view=sceneView(),r=canvas.getBoundingClientRect(),host=$('#viewport').getBoundingClientRect();
 const points=face.map(function project(v){return {x:r.left+(v.x-view.left)*view.zoom/1536*r.width,y:r.top+(v.y-view.top)*view.zoom/1024*r.height};/* Code by Daniel using ChatGPT November 14, 2026 */});
 let left=Infinity,right=-Infinity,top=Infinity,bottom=-Infinity;for(const point of points){left=Math.min(left,point.x);right=Math.max(right,point.x);top=Math.min(top,point.y);bottom=Math.max(bottom,point.y);}
 // The transparent native button follows the painted face through camera and display panning.
 const w=Math.max(44,right-left),h=Math.max(44,bottom-top),cx=(left+right)/2,cy=(top+bottom)/2;
 if(cx<host.left||cx>host.right||cy<host.top||cy>host.bottom)return false;
 button.style.left=(cx-host.left-w/2)+'px';button.style.top=(cy-host.top-h/2)+'px';button.style.width=w+'px';button.style.height=h+'px';return true;
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function refreshWayfinding14(){
 const q=g.wayfinding14;if(!q)return;
 if(q.room!==state.room){q.welcome=false;q.room=state.room;}
 const p=sceneSign23(),button=$('#edge-cue14');
 button.hidden=!p||panel.open||!!g.transition||!!g.cleanScene||wonderWatching20()||roomCaptures21()||!positionSignButton23(button,p);
 document.body.classList.toggle('front-exit25',!!p&&!panel.open&&!g.cleanScene&&!wonderWatching20()&&!roomCaptures21());
 if(p){if($('#edge-destination14').textContent!==p.text)$('#edge-destination14').textContent=p.text;button.setAttribute('aria-label','Walk down to '+(state.room==='nativity'?'the bedroom':wayName14(bottomExit14().to)));button.title=p.text+' ↓';}
 if(state.room==='workshop'&&!state.play10.keeperWelcomeSeen&&!state.keepsakes.map&&!panel.open&&!g.transition&&g.sceneAge>.65&&!g.pending&&!g.journey.length){
  state.play10.keeperWelcomeSeen=true;q.welcome=true;save();
 }
 $('#keeper-welcome14').hidden=!q.welcome||state.room!=='workshop'||panel.open||!!g.transition;
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function waySignLayers14(){
 const p=sceneSign23();if(!p)return [];
 return [{y:p.y,draw:function signLayer(){drawWaySign14(p);/* Code by Daniel using ChatGPT November 14, 2026 */}}];
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function drawWaySign14(p){
 const frame=g.wayFrames23?.[p.art],face=signFaceWorld23(p);if(!frame||!face)return;
 detailFrame22(ctx,frame,p.x*15.36,p.y*10.24,p.width*depthScale(p));
 const [tl,tr,,bl]=face;ctx.save();ctx.transform((tr.x-tl.x)/100,(tr.y-tl.y)/100,(bl.x-tl.x)/40,(bl.y-tl.y)/40,tl.x,tl.y);
 ctx.fillStyle=frame.meta.ink||'#493121';ctx.globalAlpha=.94;ctx.font='15px Georgia';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(p.text,50,13,88);ctx.font='bold 16px Georgia';ctx.fillText('↓',50,30,20);ctx.restore();
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function mapIcon14(kind){
 const path={tree:'<path d="m30 5-18 24h10L10 43h15v10h10V43h15L38 29h10Z" fill="#477052"/>',lamp:'<path d="M25 18h14v23H25z" fill="#efc775"/><path d="M21 18h22l-6-9H27Zm-1 25h24M32 44v11" stroke="#705837" stroke-width="4" fill="none"/>',cave:'<path d="M7 49 15 25 29 12 47 25 57 49Z" fill="#929280"/><path d="M23 49V36a10 10 0 0 1 20 0v13" fill="#4b5348"/>',clock:'<path d="M13 49V23L32 9l19 14v26Z" fill="#b58b5c"/><circle cx="32" cy="29" r="11" fill="#f9e7bd"/><path d="M32 21v8l6 3" stroke="#604d34" stroke-width="2" fill="none"/>',toy:'<path d="M10 47V25h44v22Z" fill="#a7764e"/><path d="m6 25 26-17 26 17" fill="#486a50"/><circle cx="23" cy="43" r="4" fill="#4c493c"/><circle cx="41" cy="43" r="4" fill="#4c493c"/><path d="M19 38h28v-9H34v-6H23v8h-4" fill="#ddc18c"/>',hall:'<path d="M10 49V24h44v25Z" fill="#a98761"/><path d="m6 24 26-16 26 16" fill="#527459"/><path d="M26 49V32h12v17" fill="#6b573f"/><path d="M16 30h6v8h-6m26-8h6v8h-6" fill="#f2d69a"/>',house:'<path d="M11 49V25h42v24Z" fill="#ad8b65"/><path d="m6 25 26-17 26 17" fill="#73806a"/><path d="M27 49V34h11v15" fill="#70583e"/><path d="M16 31h7v9h-7m26-9h7v9h-7" fill="#efcf8f"/>'}[kind];
 return '<svg viewBox="0 0 64 60" aria-hidden="true">'+(path||'')+'</svg>';
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function pocketMapDrawing14(){
 let paths='';
 for(let i=0;i<MAP_NODES14.length;i++)for(let j=i+1;j<MAP_NODES14.length;j++){
  const a=MAP_NODES14[i],b=MAP_NODES14[j];
  if(!ROOMS[a[0]].spots.some(function linked(t){return t.to===b[0];/* Code by Daniel using ChatGPT November 13, 2026 */})&&!ROOMS[b[0]].spots.some(function linked(t){return t.to===a[0];/* Code by Daniel using ChatGPT November 13, 2026 */}))continue;
  paths+='<path data-map-link="'+a[0]+':'+b[0]+'" d="M'+a[1]*6+' '+a[2]*5.4+' L'+b[1]*6+' '+b[2]*5.4+'"/>';
 }
 const nodes=MAP_NODES14.map(function place(n){const here=n[0]===state.room;return '<div class="map-place14 '+(here?'is-here':'')+'" data-map-place="'+n[0]+'" style="left:'+n[1]+'%;top:'+n[2]+'%">'+mapIcon14(n[3])+'<strong>'+escapeHTML(wayName14(n[0]))+'</strong>'+(here?'<small>You are here</small>':'')+'</div>';/* Code by Daniel using ChatGPT November 13, 2026 */}).join('');
 return '<div class="pocket-drawing14" role="img" aria-label="The keeper’s map of the village paths. The hall connects to the gallery; the workshop and clock shop connect to the gallery and road; the road leads to the pine woods, with branches to the snow garden and woodland cave."><svg class="map-paths14" viewBox="0 0 600 540" preserveAspectRatio="none" aria-hidden="true">'+paths+'</svg>'+nodes+'</div>';
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function pocketMapExits14(){
 const arrows={front:'↓',back:'↑',left:'←',right:'→'};
 return roomExits14().map(function door(t){return '<button data-map-exit14="'+escapeHTML(t.id)+'"><span aria-hidden="true">'+(t.wardrobe?'↓':arrows[t.edgeDirection]||'→')+'</span> '+escapeHTML(t.wardrobe?'Back through the wardrobe':wayName14(t.to))+'</button>';/* Code by Daniel using ChatGPT November 13, 2026 */}).join('');
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function showPocketMap14(){
 if(g.wayfinding14)g.wayfinding14.welcome=false;
 state.quest.started=true;save();
 const status={lost:'Not found yet',found:'In your waypack',cleaned:'Brushed clean',mended:'Mended',repaired:'Ready to take home',delivered:'Home again'};
 const toys=TOYS.map(function toyRow(toy){return '<div><strong>'+escapeHTML(toy.title)+'</strong><small>'+escapeHTML(status[toyStatus(toy.id)]||toyStatus(toy.id))+'</small></div>';/* Code by Daniel using ChatGPT November 13, 2026 */}).join('');
 const exits=pocketMapExits14(),allHome=TOYS.every(function home(toy){return toyStatus(toy.id)==='delivered';/* Code by Daniel using ChatGPT November 13, 2026 */});
 showPanel('<section class="pocket-map14"><p class="map-kicker14">A LITTLE MAP OF OUR PATHS</p><h2 id="panel-title">The keeper’s map</h2><p>“Follow the little paths, and take your time. You can fold a copy for your waypack.”</p><div class="row"><button class="primary" id="take-map14" '+(state.keepsakes.map?'disabled':'')+'>'+(state.keepsakes.map?'In your waypack':'Take a copy')+'</button><button id="map-done">Fold the map</button></div><p id="map-copy-status14" role="status"></p>'+pocketMapDrawing14()+'<p class="map-location14">You are here: <strong>'+escapeHTML(ROOMS[state.room].title)+'</strong></p>'+(exits?'<h3>Ways out of this room</h3><div class="map-exits14">'+exits+'</div>':'')+'<h3>'+(allHome?'Toys home again':'Toys to bring home')+'</h3><p>'+(allHome?'All three toys are home.':'Some toys are still waiting to be brought home.')+' On the margin someone has written: “Ask before you take. There may be more to this than lost things.”</p><div class="collection-list">'+toys+'</div>'+taleHint(state.tales.converted?'Rime has brought all three toys to the workshop. The keeper can help with repairs.':state.tales.rescued?'Head home to the keeper’s workshop. Rime will bring the toys there.':'Follow the pine road beyond the bridge. Read the note you find before looking farther.')+'</section>','THE TOYS BENEATH THE SNOW');
 $('#map-done').onclick=closePanel;
 $('#take-map14').onclick=function takeCopy(){state.keepsakes.map=true;save();this.disabled=true;this.textContent='In your waypack';$('#map-copy-status14').textContent='A folded map, ready whenever you need it.';/* Code by Daniel using ChatGPT November 18, 2026 */};
 panel.querySelectorAll('[data-map-exit14]').forEach(function wireExit(button){button.onclick=function chooseExit(){const target=roomExits14().find(function matching(t){return t.id===button.dataset.mapExit14;/* Code by Daniel using ChatGPT November 13, 2026 */});if(target){closePanel();walkExit14(target);}/* Code by Daniel using ChatGPT November 13, 2026 */};/* Code by Daniel using ChatGPT November 13, 2026 */});
 /* Code by Daniel using ChatGPT November 20, 2026 */}
function pocketMapWaypack14(){
 return state.keepsakes.map?'<button class="pack-hymnal pack-map14" id="pack-map14"><span class="pack-map-icon14" aria-hidden="true">'+mapIcon14('lamp')+'</span><span>The keeper’s pocket map<small>Village paths · toy notes</small></span></button>':'';
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
