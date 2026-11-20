'use strict';
// Preserve the table's painted view, then approach it by a projective camera move.
window.BD_MAP_VIEW={active:null,loading:null,duration:2800};
BD_MAP_VIEW.bench=function paintedWindowBench(c){const im=BD_ART.images['v11-bench'];if(!im)return;const w=195,h=w/im.width*im.height;c.drawImage(im,40,870-h,w,h);
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_MAP_VIEW.project=function projectThroughPlane(h,p){const w=h[6]*p[0]+h[7]*p[1]+1;return [(h[0]*p[0]+h[1]*p[1]+h[2])/w,(h[3]*p[0]+h[4]*p[1]+h[5])/w];
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_MAP_VIEW.matrix=function fourCornerPerspective(from,to){
 const rows=[];for(let i=0;i<4;i++){const [x,y]=from[i],[u,v]=to[i];rows.push([x,y,1,0,0,0,-u*x,-u*y,u],[0,0,0,x,y,1,-v*x,-v*y,v]);}
 for(let col=0;col<8;col++){let pivot=col;for(let row=col+1;row<8;row++)if(Math.abs(rows[row][col])>Math.abs(rows[pivot][col]))pivot=row;if(Math.abs(rows[pivot][col])<1e-10)throw Error('The map view could not be projected.');[rows[col],rows[pivot]]=[rows[pivot],rows[col]];const d=rows[col][col];for(let k=col;k<9;k++)rows[col][k]/=d;for(let row=0;row<8;row++)if(row!==col){const f=rows[row][col];for(let k=col;k<9;k++)rows[row][k]-=f*rows[col][k];}}
 return rows.map(r=>r[8]);

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_MAP_VIEW.css=function canvasPerspective(h){return 'matrix3d('+[h[0],h[3],0,h[6],h[1],h[4],0,h[7],0,0,1,0,h[2],h[5],0,1].join(',')+')';
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_MAP_VIEW.capture=function captureTheActualTable(){
 const live=game.scene==='museum'&&BD_MUSEUM.room==='entry'&&!game.flight,renderWidth=Math.min(innerWidth,innerHeight*2.4),ax=Math.max(1,(innerHeight/H)/(renderWidth/W)),ay=Math.max(1,(renderWidth/W)/(innerHeight/H)),z=1.1,vw=W/(z*ax),vh=H/(z*ay),cam=live?{...BD_MUSEUM.camera}:{x:Math.max(0,Math.min(W-vw,500-vw/2)),y:Math.max(0,Math.min(H-vh,965-vh*.81)),z,ax,ay},rect=live?sceneRect():{x:(innerWidth-renderWidth)/2,y:0,scaleX:renderWidth/W,scaleY:innerHeight/H},scale=innerWidth<800?1:2,shot=document.createElement('canvas');shot.width=W*scale;shot.height=H*scale;const c=shot.getContext('2d');let figures=null;
 if(live){figures=document.createElement('canvas');figures.width=W;figures.height=H;figures.getContext('2d').drawImage(canvas,0,0,W,H);const originalWidth=canvas.width,originalHeight=canvas.height,traveler=BD_ART.traveler,people=BD_PEOPLE.paint;try{BD_ART.traveler=function firstPersonTableView(){
/* Code by Daniel using ChatGPT November 17, 2026 */
};BD_PEOPLE.paint=function roomWithoutVisitors(){
/* Code by Daniel using ChatGPT November 17, 2026 */
};canvas.width=W*scale;canvas.height=H*scale;ctx.setTransform(scale,0,0,scale,0,0);drawScene(performance.now());c.drawImage(canvas,0,0);}finally{BD_ART.traveler=traveler;BD_PEOPLE.paint=people;canvas.width=originalWidth;canvas.height=originalHeight;ctx.setTransform(1,0,0,1,0,0);drawScene(performance.now());}}
 else{c.scale(scale*cam.z*cam.ax,scale*cam.z*cam.ay);c.translate(-cam.x,-cam.y);const im=BD_ART.images['m4-entry'];if(im)c.drawImage(im,0,0,W,H);BD_IMMERSION.architecture(c,BD_MUSEUM.rooms.entry);BD_MAP_VIEW.bench(c);BD_MODELS.drawEntranceMap(c,BD_MODELS.items.land);BD_IMMERSION.desk(c);BD_IMMERSION.courtSign(c);}
 const g=BD_MODELS.landGeometry(BD_MODELS.items.land),screen=p=>[(p[0]-cam.x)*cam.z*(cam.ax||1),(p[1]-cam.y)*cam.z*(cam.ay||1)],source=g.quad.map(screen),start=source.map(p=>[rect.x+p[0]*rect.scaleX,rect.y+p[1]*rect.scaleY]),lamps=BD_SITES.map(site=>({id:site.id,p:screen(BD_MODELS.landPoint(BD_MODELS.siteUV[site.id],g))}));return {shot,figures,source,start,lamps,live,cam};

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_MAP_VIEW.open=function approachTheSameMap(){
 if(BD_MAP_VIEW.active&&$('#relief-exhibit')){BD_IMMERSION.selectMap(BD_ATLAS.selected||BD_SITES[0].id);return;}
 const keys=['m4-entry','m5-table','m5-land','v9-desk','v11-bench'];if(keys.some(k=>!BD_ART.rawImages[k])){const ticket={};BD_MAP_VIEW.loading=ticket;openPanel('THE EXPEDITION TABLE','<h2>A closer look.</h2><p role="status">Opening the map table…</p>','map-loading');game.dialogCleanup=function cancelMapArrival(){if(BD_MAP_VIEW.loading===ticket)BD_MAP_VIEW.loading=null;
/* Code by Daniel using ChatGPT November 17, 2026 */
};Promise.all(keys.map(BD_RESILIENCE.art)).then(images=>{if(BD_MAP_VIEW.loading!==ticket||game.dialogKind!=='map-loading')return;BD_MAP_VIEW.loading=null;if(images.some(im=>!im)){BD_RESILIENCE.error('The map table could not finish loading.');return;}BD_MAP_VIEW.open();
/* Code by Daniel using ChatGPT November 17, 2026 */
});return;}
 const snapshot=BD_MAP_VIEW.capture();BD_MAP_VIEW.oldOpen();document.body.classList.remove('leaning-over-map');const panel=$('#panel');panel.classList.add('map-continuous');$('.destination-rack .eyebrow').textContent='EXPEDITION REGISTER';const picture=$('.relief-picture'),lampHTML=$('#map-lamps').innerHTML;
 picture.innerHTML='<div id="map-scene-clip"><canvas id="atlas-canvas" width="'+snapshot.shot.width+'" height="'+snapshot.shot.height+'" aria-label="The same painted museum relief, viewed from closer above"></canvas></div><canvas id="map-visitor-overlay" width="1536" height="1024" aria-hidden="true"></canvas><div id="map-focus-viewport" aria-hidden="true"></div><div class="map-room-shade" aria-hidden="true"></div><div id="map-lamps">'+lampHTML+'</div><div id="map-place-note" role="status" aria-live="polite"></div>';
 const pictureCanvas=$('#atlas-canvas');pictureCanvas.getContext('2d').drawImage(snapshot.shot,0,0);const overlay=$('#map-visitor-overlay');if(snapshot.figures){overlay.getContext('2d').drawImage(snapshot.figures,0,0);snapshot.figures.width=snapshot.figures.height=1;}else overlay.hidden=true;snapshot.shot.width=snapshot.shot.height=1;const state={...snapshot,shot:null,figures:null,overlay,node:pictureCanvas,elapsed:0,previous:performance.now(),progress:0,noted:false,frame:0,closed:false};BD_MAP_VIEW.active=state;clearTimeout(BD_IMMERSION.mapTimer);$('#map-place-note').classList.remove('visible');BD_IMMERSION.selectMap(BD_ATLAS.selected||BD_SITES[0].id);clearTimeout(BD_IMMERSION.mapTimer);$('#map-place-note').classList.remove('visible');
 const previous=game.dialogCleanup;game.dialogCleanup=function leaveTheTableView(){state.closed=true;cancelAnimationFrame(state.frame);state.node.width=state.node.height=1;state.overlay.width=state.overlay.height=1;if(BD_MAP_VIEW.active===state)BD_MAP_VIEW.active=null;panel.classList.remove('map-continuous');if(previous)previous();
/* Code by Daniel using ChatGPT November 17, 2026 */
};BD_MAP_VIEW.tick();

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_MAP_VIEW.target=function finalLookingDownAngle(){const r=$('#map-focus-viewport').getBoundingClientRect(),w=Math.max(100,Math.min(r.width*.93,r.height/.62)),h=w*.62,left=r.left+(r.width-w)/2,top=r.top+(r.height-h)/2;return [[left+w*.025,top+12],[left+w*.985,top],[left+w,top+h*.96],[left,top+h]];
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_MAP_VIEW.render=function positionTheApproachingView(state,p){
 const end=BD_MAP_VIEW.target(),blend=p*p*(3-2*p),dip=Math.sin(Math.PI*p)*Math.min(28,innerHeight*.035),quad=state.start.map((v,i)=>[v[0]+(end[i][0]-v[0])*blend,v[1]+(end[i][1]-v[1])*blend+dip]),h=BD_MAP_VIEW.matrix(state.source,quad);state.current=quad;state.matrix=h;state.node.style.transform=BD_MAP_VIEW.css(h);state.overlay.style.transform=BD_MAP_VIEW.css(h);state.overlay.style.opacity=String(Math.max(0,1-p/.28));
 for(const lamp of state.lamps){const point=BD_MAP_VIEW.project(h,lamp.p),button=$('[data-map-site="'+lamp.id+'"]');button.style.left=point[0]+'px';button.style.top=point[1]+'px';}
 const lamps=Math.max(0,Math.min(1,(p-.18)/.55)),panel=Math.max(0,Math.min(1,(p-.32)/.55));$('#map-lamps').style.opacity=String(lamps);$('.destination-rack').style.opacity=String(panel);$('.destination-rack').style.transform='translateY('+((1-panel)*18)+'px)';const x=(end[0][0]+end[2][0])/2,y=(end[0][1]+end[2][1])/2;$('#relief-exhibit').style.setProperty('--map-focus-x',x+'px');$('#relief-exhibit').style.setProperty('--map-focus-y',y+'px');$('.map-room-shade').style.opacity=String(p*.85);
 if(p>.56&&!state.noted){state.noted=true;BD_IMMERSION.selectMap(BD_ATLAS.selected||BD_SITES[0].id);}

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_MAP_VIEW.tick=function animateLookingDown(time=performance.now()){
 const s=BD_MAP_VIEW.active;if(!s||s.closed||!s.node.isConnected)return;const now=performance.now(),dt=Math.max(0,Math.min(60,now-s.previous));s.previous=now;if(!document.hidden)s.elapsed+=dt;s.progress=BD_VIEW.allowed()?Math.min(1,s.elapsed/BD_MAP_VIEW.duration):1;BD_MAP_VIEW.render(s,s.progress);if(s.progress<1)s.frame=requestAnimationFrame(BD_MAP_VIEW.tick);

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_MAP_VIEW.install=function installNaturalMapView(){
 BD_MAP_VIEW.oldOpen=BD_IMMERSION.map;BD_IMMERSION.map=BD_MAP_VIEW.open;showAtlas=BD_MAP_VIEW.open;BD_IMMERSION.caption('');
 const oldPrepare=BD_RESILIENCE.prepareArt;BD_RESILIENCE.prepareArt=async function benchArtworkCatalog(names){const missing=await oldPrepare(names);BD_ART.catalog['v11-bench']='v11-bench';return missing;
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldPinned=BD_RESILIENCE.pinned;BD_RESILIENCE.pinned=function mapArrivalPaintings(){const keys=oldPinned();if(BD_MAP_VIEW.loading)for(const name of ['m4-entry','m5-table','m5-land','v9-desk','v11-bench'])keys.add(name);return keys;
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldBox=BD_IMMERSION.box;BD_IMMERSION.box=function plainBenchBounds(h){if(game.scene==='museum'&&BD_MUSEUM.room==='entry'&&h.id==='sea-bench')return [35,710,240,875];return oldBox(h);
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 window.addEventListener('resize',function reframeMapAngle(){const s=BD_MAP_VIEW.active;if(s&&!s.closed)BD_MAP_VIEW.render(s,s.progress);
/* Code by Daniel using ChatGPT November 17, 2026 */
});

/* Code by Daniel using ChatGPT November 17, 2026 */
};
