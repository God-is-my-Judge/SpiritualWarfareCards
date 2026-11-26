'use strict';
// Lean in to a museum display, as the Entry Hall map does: the room turns a little and moves in, the visitors fade,
// then the display's own panel opens over the close-up. Claude for Daniel, 24 November 2026.
// Standing displays turn (rotateY); table models tilt toward you (rotateX). The Entry map and the Scroll Room models
// keep their own richer views (map-view.js). The close-up is only as sharp as the room and find art: see
// Foundation-Claude/19-Display-Close-Up-Art-for-Codex.md for the higher-definition list.
window.BD_DISPLAY_VIEW={
 duration:1500,active:null,
 // Only from a calm room view, with no panel already open.
 ready(room){
  return game.scene==='museum'&&BD_MUSEUM.room===room&&!$('#panel').open&&!game.hallTransition&&!BD_DISPLAY_VIEW.active&&!game.save.settings.reduced&&!(window.BD_SCROLL&&BD_SCROLL.active());
  /* Code by Daniel using Claude November 24, 2026 */
 },
 // A picture of the world placed exactly as sceneRect() places the canvas, with a margin of real room around the
 // view (q of the viewport on each side) so the turn never shows an empty edge.
 layer(source,rect,dpr,q=0,m=0){
  const vw=innerWidth,vh=innerHeight,c=document.createElement('canvas');c.width=Math.round(vw*(1+2*q)*dpr);c.height=Math.round(vh*(1+2*q)*dpr);
  c.style.cssText='left:'+(-q*vw)+'px;top:'+(-q*vh)+'px;width:'+vw*(1+2*q)+'px;height:'+vh*(1+2*q)+'px';
  const g=c.getContext('2d');g.imageSmoothingQuality='high';g.drawImage(source,(q*vw+rect.x-W*m*rect.scaleX)*dpr,(q*vh+rect.y-H*m*rect.scaleY)*dpr,W*(1+2*m)*rect.scaleX*dpr,H*(1+2*m)*rect.scaleY*dpr);
  return c;
  /* Code by Daniel using Claude November 24, 2026 */
 },
 // Move toward a world box [x1,y1,x2,y2]; then call done(), which opens the panel.
 approach(box,kind,done){
  const rect=sceneRect(),client=function toClient(p){const s=BD_MUSEUM.screen(p);return [rect.x+s[0]*rect.scaleX,rect.y+s[1]*rect.scaleY];};
  const a=client([box[0],box[1]]),b=client([box[2],box[3]]),cw=b[0]-a[0],ch=b[1]-a[1];
  if(!(cw>8&&ch>8)){done();return;}
  const vw=innerWidth,vh=innerHeight,P=[(a[0]+b[0])/2,(a[1]+b[1])/2],C=[vw/2,vh*.47];
  const S=Math.max(1.15,Math.min(3.4,Math.min(vw*.8/cw,vh*.78/ch))),dx=C[0]-P[0],dy=C[1]-P[1];
  const dpr=Math.min(2,devicePixelRatio||1),q=.4,m=q*Math.max(innerWidth/(W*rect.scaleX),innerHeight/(H*rect.scaleY)),shot=document.createElement('canvas');shot.width=Math.round(W*(1+2*m));shot.height=Math.round(H*(1+2*m));
  try{const g=shot.getContext('2d');g.translate(W*m,H*m);BD_MUSEUM.paintRoom(g,BD_MUSEUM.camera,performance.now(),{figures:false,markers:false});}catch(error){shot.getContext('2d').drawImage(canvas,W*m,H*m);}
  const wrap=document.createElement('div'),scene=document.createElement('div'),room=BD_DISPLAY_VIEW.layer(shot,rect,dpr,q,m),people=BD_DISPLAY_VIEW.layer(canvas,rect,dpr),shade=document.createElement('div');
  wrap.className='display-approach';wrap.setAttribute('aria-hidden','true');scene.className='display-approach-scene';shade.className='display-approach-shade';
  room.className=people.className='display-approach-layer';scene.append(room,people);wrap.append(scene,shade);document.body.append(wrap);
  scene.style.transformOrigin=P[0]+'px '+P[1]+'px';
  const turn=kind==='table'?0:Math.max(-7,Math.min(7,(vw/2-P[0])/vw*16)),tilt=kind==='table'?9:1.5,mid=1+(S-1)*.32;
  const frames=[
   {transform:'perspective(1500px) translate(0px,0px) rotateX(0deg) rotateY(0deg) scale(1)'},
   {offset:.45,transform:'perspective(1500px) translate('+dx*.3+'px,'+dy*.3+'px) rotateX('+tilt*.6+'deg) rotateY('+turn+'deg) scale('+mid+')'},
   {transform:'perspective(1500px) translate('+dx+'px,'+dy+'px) rotateX('+(kind==='table'?tilt*.35:0)+'deg) rotateY(0deg) scale('+S+')'}];
  const easing='cubic-bezier(.45,.05,.25,1)',move=scene.animate(frames,{duration:BD_DISPLAY_VIEW.duration,easing,fill:'forwards'});
  people.animate([{opacity:1},{opacity:0,offset:.45},{opacity:0}],{duration:BD_DISPLAY_VIEW.duration,fill:'forwards'});
  shade.animate([{opacity:0},{opacity:0,offset:.55},{opacity:1}],{duration:BD_DISPLAY_VIEW.duration,fill:'forwards'});
  $('#hotspots').classList.add('display-approach-hidden');game.keys.clear();game.path=[];game.pending=null;game.player.walking=false;
  const state={wrap,move,finished:false};BD_DISPLAY_VIEW.active=state;
  const skip=function skipTheApproach(event){if(event.type==='keydown'&&['Shift','Control','Alt','Meta'].includes(event.key))return;event.preventDefault();event.stopPropagation();finish();};
  const finish=function arriveAtTheDisplay(){
   if(state.finished)return;state.finished=true;move.finish();removeEventListener('keydown',skip,true);removeEventListener('pointerdown',skip,true);
   $('#hotspots').classList.remove('display-approach-hidden');BD_DISPLAY_VIEW.active=null;
   done();
   if($('#panel').open)$('#panel').addEventListener('close',function stepBack(){BD_DISPLAY_VIEW.leave(wrap);},{once:true});else BD_DISPLAY_VIEW.leave(wrap);
   /* Code by Daniel using Claude November 24, 2026 */
  };
  addEventListener('keydown',skip,true);addEventListener('pointerdown',skip,true);move.onfinish=finish;
  /* Code by Daniel using Claude November 24, 2026 */
 },
 leave(wrap){
  if(!wrap.isConnected)return;const fade=wrap.animate([{opacity:1},{opacity:0}],{duration:game.save?.settings?.reduced?1:260,fill:'forwards'});fade.onfinish=function gone(){wrap.remove();};
  /* Code by Daniel using Claude November 24, 2026 */
 },
 css:'.display-approach{position:fixed;inset:0;z-index:60;pointer-events:none;overflow:hidden;background:#0c1a17}'+
  '.display-approach-scene{position:absolute;inset:0;will-change:transform}.display-approach-layer{position:absolute;left:0;top:0;width:100%;height:100%}'+
  '.display-approach-shade{position:absolute;inset:0;opacity:0;background:radial-gradient(ellipse at 50% 47%,transparent 38%,#0b1714b3 100%)}'+
  '.display-approach-hidden{visibility:hidden}',
 install(){
  const style=document.createElement('style');style.textContent=BD_DISPLAY_VIEW.css;document.head.appendChild(style);
  const exhibit=window.showExhibit;
  if(typeof exhibit==='function')window.showExhibit=function leanInToTheDisplay(site){
   const p=site&&BD_MUSEUM.displays[site.id];
   if(p&&BD_DISPLAY_VIEW.ready(p.room))BD_DISPLAY_VIEW.approach(BD_IMMERSION.box({id:site.id}),'standing',function openTheDisplay(){exhibit(site);});else exhibit(site);
   /* Code by Daniel using Claude November 24, 2026 */
  };
  const model=BD_MODELS.open;
  BD_MODELS.open=function leanOverTheModel(key){
   const m=BD_MODELS.items[key];
   if(m&&key!=='land'&&m.room!=='scroll'&&BD_DISPLAY_VIEW.ready(m.room))BD_DISPLAY_VIEW.approach(BD_IMMERSION.box({id:'model-'+key}),'table',function openTheModel(){model(key);});else model(key);
   /* Code by Daniel using Claude November 24, 2026 */
  };
  /* Code by Daniel using Claude November 24, 2026 */
 }
};
addEventListener('DOMContentLoaded',function installDisplayApproach(){BD_DISPLAY_VIEW.install();/* Code by Daniel using Claude November 24, 2026 */});
