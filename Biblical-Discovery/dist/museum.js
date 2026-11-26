'use strict';
window.BD_MUSEUM={camera:{x:0,y:0,z:1},room:'entry',lookUp:false,warm:{},rooms:{
 front:{title:'The Front',width:1536,height:1024,images:['front-v2'],floor:690,group:'front'},
 entry:{title:'The Entry Hall',width:1536,height:1024,images:['entry'],floor:635,group:'entry'},
 ot:{title:'The Old Testament · a walk into the past',width:4608,height:1024,images:['ot-egypt','ot-kings','ot-return'],floor:640,group:'ot',names:['Egypt','The Kings','Exile and Return']},
 scroll:{title:'The Scroll Room',width:1536,height:2304,images:['scroll'],floor:1485,group:'scroll'},
 nt:{title:'The New Testament · the world of Jesus',width:4608,height:1024,images:['nt-lake','nt-city','nt-road'],floor:640,group:'nt',names:['The Lake','The City','The Road']},
 table:{title:'The Table Room',width:1536,height:1024,images:['table'],floor:640,group:'table'},
 story:{title:'The Accounts · biblical history',width:6144,height:1024,images:['story-1','story-2','story-3','story-4'],floor:640,group:'story',names:['Beginnings','Kings and Exile','The Life of Jesus','The Church on the Road']}
},displays:{
 'thebes':{room:'ot',bay:0,x:650,y:775,w:230,h:390,setting:[245,195,710,455],style:'stele'},
 'avaris':{room:'ot',bay:0,x:1230,y:725,w:130,h:150,style:'glass'},
 'nimrud':{room:'ot',bay:1,x:2130,y:795,w:195,h:440,setting:[1740,185,820,480],style:'obelisk'},
 'tel-dan':{room:'ot',bay:1,x:2790,y:780,w:200,h:210,style:'glass'},
 'babylon':{room:'ot',bay:2,x:3775,y:785,w:260,h:175,setting:[3380,185,760,455],style:'jewel'},
 'qumran':{room:'scroll',bay:0,x:760,y:1840,w:610,h:240,setting:[190,580,1160,1230],style:'drum'},
 'galilee':{room:'nt',bay:0,x:740,y:810,w:620,h:280,setting:[230,200,920,450],style:'boat'},
 'bethesda':{room:'nt',bay:1,x:2140,y:800,w:490,h:260,setting:[1735,200,930,455],style:'model'},
 'caesarea':{room:'nt',bay:1,x:2820,y:665,w:240,h:195,style:'wall'},
 'delphi':{room:'nt',bay:2,x:3550,y:665,w:300,h:215,style:'wall'},
 'oxyrhynchus':{room:'nt',bay:2,x:4230,y:800,w:300,h:200,style:'desk'},
 'megiddo':{room:'table',bay:0,x:770,y:825,w:650,h:360,setting:[300,220,930,700],style:'mosaic'}
}};
BD_MUSEUM.config=function currentMuseum(){return BD_MUSEUM.rooms[BD_MUSEUM.room];
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_MUSEUM.key=function currentBay(){const r=BD_MUSEUM.room;return r==='ot'||r==='nt'?r+'-'+(Math.min(2,Math.floor(game.player.x/1536))+1):r;
/* Code by Daniel using ChatGPT November 15, 2026 */
};
// The Scroll Room's three ways out, by the building's plan (Claude for Daniel, 24 November 2026). We look north.
// The rotunda stands between the two wings, as the scrolls stand between the Testaments: the painted back-left arch
// opens on the passage west to the Old Testament's east end (Exile and Return, whose own back arch shows this rotunda's
// round floor), and the back-right arch opens east to the New Testament's west end (The Lake). The bronze door to the
// Entry Hall is in the south wall, behind the viewer, so the bottom of the floor leads back to the entrance.
BD_MUSEUM.scrollWays={
 ot:{to:'ot-3',arrival:[115,1530],facing:Math.PI/4,there:[4330,725],thereFacing:3*Math.PI/4},
 nt:{to:'nt-1',arrival:[1421,1530],facing:3*Math.PI/4,there:[110,935],thereFacing:0},
 entry:{to:'entry',there:[770,700],thereFacing:Math.PI/2}
};
BD_MUSEUM.leaveScroll=function walkOutOfTheRotunda(){
 const p=game.player,r=BD_MUSEUM.config(),w=BD_MUSEUM.scrollWays,go=function through(way){BD_MUSEUM.begin(way.to,{arrival:way.there.slice(),facing:way.thereFacing});return true;};
 const mx=p.vx||p.facingX||0,my=p.vy||p.facingY||0;/* a clicked route moves without velocity, so its heading comes from facing */
 if((p.x<95&&p.y<1575&&mx<0)||(p.x<150&&p.y<1500&&my<0))return go(w.ot);
 if((p.x>r.width-95&&p.y<1575&&mx>0)||(p.x>r.width-150&&p.y<1500&&my<0))return go(w.nt);
 if(p.y>r.height-40&&my>0)return go(w.entry);
 return false;
 /* Code by Daniel using Claude November 24, 2026 */
};
BD_MUSEUM.geometry=function museumGeometry(){const r=BD_MUSEUM.config(),obstacles=r.group==='table'?[[240,705,1300,942]]:r.group==='front'?[BD_MUSEUM.welcomeSign.footprint]:[];for(const [id,p]of Object.entries(BD_MUSEUM.displays)){if(p.room!==BD_MUSEUM.room)continue;if(id==='qumran'){obstacles.push(...BD_MUSEUM.scrollClearance(p,!game.save.finds[id]));continue;}if(!game.save.finds[id]||['wall','mosaic','modelcontext'].includes(p.style))continue;obstacles.push([p.x-p.w*.42,p.y-45,p.x+p.w*.42,p.y+15]);}obstacles.push(...BD_MODELS.obstacles(),...BD_PEOPLE.obstacles());return {bounds:[30,r.floor,r.width-30,r.height-28],obstacles};
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_MUSEUM.sheetBox=function dustSheetBounds(p){const w=Math.max(200,Math.min(600,p.w*1.2)),h=w*(p.style==='mosaic'?.32:.64);return {x:p.x-w/2,y:p.y-h,w,h};
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_MUSEUM.scrollClearance=function visibleHeadBesideScroll(p,covered){
 const box=covered?BD_MUSEUM.sheetBox(p):{x:p.x-p.w/2,y:p.y-330,w:p.w,h:330},im=BD_ART.images[covered?'m4-dust':'m4-drum'],plane=BD_ART.perspective({scene:'museum',room:'scroll'}),key=JSON.stringify([covered,box,plane,BD_MUSEUM.rooms.scroll.floor]);
 BD_MUSEUM.clearanceCache=BD_MUSEUM.clearanceCache||{};if(BD_MUSEUM.clearanceCache[key])return BD_MUSEUM.clearanceCache[key];
 const floor=BD_MUSEUM.rooms.scroll.floor,obstacles=[[p.x-p.w*(covered?.52:.42),p.y-(covered?65:45),p.x+p.w*(covered?.52:.42),p.y+(covered?24:15)]];
 if(!im)return [...obstacles,[box.x-35,floor,box.x+box.w+35,p.y]];
 const cv=document.createElement('canvas');cv.width=im.width;cv.height=im.height;const c=cv.getContext('2d',{willReadFrequently:true});c.drawImage(im,0,0);const pixels=c.getImageData(0,0,im.width,im.height).data,rows=[];
 for(let sy=0;sy<im.height;sy++){let left=im.width,right=-1;for(let sx=0;sx<im.width;sx++)if(pixels[(sy*im.width+sx)*4+3]>90){left=Math.min(left,sx);right=Math.max(right,sx);}rows.push([left,right]);}
 // Conservative bands cover the whole head, including walking/facing variation.
 // Only positions behind the display need this extra clearance: in front, it draws first.
 for(let y=floor;y<p.y;y+=12){
  const end=Math.min(p.y,y+12),h0=BD_ART.travelerHeight(y,{scene:'museum',room:'scroll'}),h1=BD_ART.travelerHeight(end,{scene:'museum',room:'scroll'}),top=Math.floor((y-h0*.96-box.y)/box.h*im.height),bottom=Math.ceil((end-h1*.70-box.y)/box.h*im.height);let left=im.width,right=-1;
  for(let sy=Math.max(0,top);sy<=Math.min(im.height-1,bottom);sy++){left=Math.min(left,rows[sy][0]);right=Math.max(right,rows[sy][1]);}
  if(right<left)continue;const margin=Math.max(h0,h1)*.14+4;obstacles.push([box.x+left/im.width*box.w-margin,y,box.x+(right+1)/im.width*box.w+margin,end]);
 }
 BD_MUSEUM.clearanceCache[key]=obstacles;return obstacles;


/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_MUSEUM.display=function displayFor(site){const p=BD_MUSEUM.displays[site.id];return {...p,depth:p.y,approach:site.id==='bethesda'?BD_MODELS.metrics(BD_MODELS.items.jerusalem).approach:p.style==='mosaic'?[p.x,990]:[p.x,p.y+100],obstacle:[p.x-p.w*.42,p.y-45,p.x+p.w*.42,p.y+15]};
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_MUSEUM.hasSceneCamera=function hasSceneCamera(){return !game.flight&&(game.scene==='museum'||game.scene==='cabin');
/* Code by Daniel using ChatGPT November 23, 2026 */
};
BD_MUSEUM.fillsViewport=function responsiveMuseumView(){return !!game.save&&BD_MUSEUM.hasSceneCamera()&&(!game.save.settings.reduced||(game.scene==='museum'&&BD_MUSEUM.lookUp));
/* Code by Daniel using ChatGPT November 23, 2026 */
};
BD_MUSEUM.syncView=function matchPhysicalViewport(){
 const active=BD_MUSEUM.fillsViewport(),rect=$('#viewport').getBoundingClientRect(),height=Math.max(1,rect.height),width=active?Math.min(rect.width,height*2.4):rect.width;
 if(rect.width<1||rect.height<1)return {ax:BD_MUSEUM.camera.ax||1,ay:BD_MUSEUM.camera.ay||1,width:rect.width,height:rect.height};
 const limit=active?Number(width.toFixed(3))+'px':'',fit=active||BD_CAMP.active()?'fill':'contain';
 if(canvas.style.maxWidth!==limit||canvas.style.objectFit!==fit){canvas.style.maxWidth=limit;canvas.style.objectFit=fit;game.dirty=true;}
 const rendered=canvas.getBoundingClientRect(),drift=BD_VIEW.scale(),actualWidth=Math.max(1,rendered.width/drift),actualHeight=Math.max(1,rendered.height/drift),ax=active?Math.max(1,(actualHeight/H)/(actualWidth/W)):1,ay=active?Math.max(1,(actualWidth/W)/(actualHeight/H)):1,c=BD_MUSEUM.camera;
 const key=rect.width.toFixed(2)+'x'+rect.height.toFixed(2)+':'+active;
 if(c.viewKey!==key||Math.abs((c.ax||1)-ax)>1e-9||Math.abs((c.ay||1)-ay)>1e-9){c.viewKey=key;c.ax=ax;c.ay=ay;c.viewChanged=true;game.dirty=true;}
 return {ax,ay,width:actualWidth,height:actualHeight};


/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_MUSEUM.enter=function enterMuseumRoom(id='entry',options={}){
 const match=/^(ot|nt)-([123])$/.exec(id),room=match?match[1]:BD_MUSEUM.rooms[id]?id:'entry',r=BD_MUSEUM.rooms[room];
 closePanel();BD_SCROLL.reset();BD_MUSEUM.room=room;$('#scroll-look-up').hidden=room!=='scroll';BD_MUSEUM.lookUp=false;BD_MUSEUM.firstLook=!!options.firstLook;game.save.museum=game.save.museum||{visited:['entry'],room:'entry'};game.save.museum.room=id;
 const kept=game.save.museum?.storyAt;/* Claude, 20 Nov 2026: return to the place you left upstairs */
 let arrival=options.arrival||(room==='story'&&Array.isArray(kept)?kept.slice():room==='scroll'?[770,2170]:match?[(Number(match[2])-.5)*1536,945]:[770,900]);
 game.scene='museum';game.site=null;game.hall=room==='nt'||room==='table'?'nt':room==='entry'?game.save.hall:'ot';game.save.hall=game.hall;
 game.path=[];game.pending=null;game.nearest=null;game.keys.clear();game.touchMove=null;
 [game.player.x,game.player.y]=nearestFree(...arrival);Object.assign(game.player,{vx:0,vy:0,speed:0,walking:false,walkBlend:0,facingX:0,facingY:-1,facingAngle:-Math.PI/2,renderDirection:6});
 if(Number.isFinite(options.facing)){const a=options.facing;Object.assign(game.player,{facingX:Math.cos(a),facingY:Math.sin(a),facingAngle:a,renderDirection:((Math.round(a/(Math.PI/4))%8)+8)%8});}/* Code by Daniel using Claude November 24, 2026: arrive facing the way you walked through the door */
 for(const nav of document.querySelectorAll('.nav-button'))nav.classList.toggle('active',nav.dataset.action==='museum');
 $('.hall-switch').style.visibility='visible';$('.hall-switch').innerHTML='<button data-action="museum-plan">⌂ <span>Museum plan</span></button><button data-action="museum-entry">↙ <span>Entry Hall</span></button>'+(room==='story'?'<button data-action="museum-down">↓ <span>Scroll Room</span></button>':'');
 $('#scene-title').textContent=r.title;$('#place-label').textContent=room==='story'?'BIBLICAL HISTORY':'THE DISCOVERY MUSEUM';$('#scene-note').textContent=room==='story'?'The same story, in chronological order.':room==='garden'?'A place to linger.':room==='entry'?'Choose a doorway. Follow a question.':'Follow the brass line.';
 $('#room-label').textContent=room==='story'?'UPSTAIRS · THE ACCOUNTS':'THE DISCOVERY MUSEUM';$('#room-caption').textContent=room==='scroll'?'The written word, and the worlds around it':r.title;
 $('#nearby').textContent='Walk along the brass line. Choose a marker or use the Scene guide.';canvas.setAttribute('aria-label',r.title+'. Arrow keys walk. E investigates. Walk east or west through the connected galleries.');
 BD_MUSEUM.camera={x:0,y:room==='scroll'?1280:0,z:room==='entry'||room==='table'||room==='scroll'?1:1.13};BD_MUSEUM.update(0,true);makeHotspots();persist();updateAmbient();game.dirty=true;



/* Code by Daniel using ChatGPT November 17, 2026 */
};
// Upstairs: keep the player's place, and let "down" at the front edge anywhere offer the way back. Claude for Daniel, 20 November 2026.
BD_MUSEUM.watchDown=function offerTheWayDown(){
 if(game.scene!=='museum'||BD_MUSEUM.room!=='story'||game.hallTransition)return;
 game.save.museum.storyAt=[Math.round(game.player.x),Math.round(game.player.y)];
 const down=game.keys.has('arrowdown')||game.keys.has('s')||game.touchMove==='down'||(game.padMove?.[1]||0)>.3||(game.stickMove?.[1]||0)>.5;
 if(!down){BD_MUSEUM.downLatch=false;return;}
 if(BD_MUSEUM.downLatch||$('#panel').open||game.player.y<960)return;
 BD_MUSEUM.downLatch=true;BD_MUSEUM.askDown();
};
BD_MUSEUM.askDown=function confirmTheWayDown(){
 game.keys.clear();game.touchMove=null;game.path=[];game.player.walking=false;game.player.vx=game.player.vy=0;
 openPanel('UPSTAIRS · THE ACCOUNTS','<h2>Go back down?</h2><p>The lift and ramp lead down to the Scroll Room, under the Dead Sea Scroll oculus. The ramp brings you back to Creation.</p><div class="actions"><button class="button" data-story-down>↓ Back to the oculus</button><button class="button secondary" data-story-stay>Stay upstairs</button></div>','story-down');
 $('[data-story-down]').onclick=function goDown(){closePanel();BD_MUSEUM.begin('scroll',{arrival:BD_SCROLL.rampFoot.slice()});};
 $('[data-story-stay]').onclick=function stayUp(){closePanel();};
};
BD_MUSEUM.update=function followMuseumWalker(dt,snap=false){
 if(!BD_MUSEUM.hasSceneCamera()||game.hallTransition)return;
 const cabin=game.scene==='cabin',r=cabin?{width:W,height:H,floor:465}:BD_MUSEUM.config(),c=BD_MUSEUM.camera;BD_MUSEUM.syncView();
 if(!cabin&&BD_MUSEUM.room==='scroll'){BD_SCROLL.updateLight(dt);if(BD_SCROLL.active()){BD_SCROLL.updateGaze(dt,snap);return;}}
 const reduced=game.save.settings.reduced,reframe=snap||c.viewChanged,rear=r.floor,depth=Math.max(0,Math.min(1,(game.player.y-rear)/(r.height-rear))),targetZoom=reduced||cabin?1:(r.images.length>1?1.13:1.08)*(1+.025*depth),oz=c.z,ox=c.x,oy=c.y;
 c.z=reframe||reduced?targetZoom:c.z+(targetZoom-c.z)*(1-Math.exp(-dt*3));
 const vw=W/(c.z*c.ax),vh=H/(c.z*c.ay);c.viewWidth=vw;c.viewHeight=vh;
 if(game.player.walking)BD_MUSEUM.firstLook=false;
 const focusX=!cabin&&BD_MUSEUM.firstLook?629:game.player.x;
 let tx=focusX-vw*.5,ty=game.player.y-vh*.81;
 if(reduced){tx=Math.floor(game.player.x/1536)*1536;ty=r.height-H;}
 tx=Math.max(0,Math.min(Math.max(0,r.width-vw),tx));ty=!cabin&&BD_MUSEUM.lookUp?0:Math.max(0,Math.min(Math.max(0,r.height-vh),ty));
 const k=reframe||reduced?1:1-Math.exp(-dt*5);c.x=Math.max(0,Math.min(Math.max(0,r.width-vw),c.x+(tx-c.x)*k));c.y=Math.max(0,Math.min(Math.max(0,r.height-vh),c.y+(ty-c.y)*k));
 if(reframe||Math.abs(ox-c.x)+Math.abs(oy-c.y)>.005||Math.abs(oz-c.z)>.00001){positionHotspots();game.dirty=true;}c.viewChanged=false;
 if(cabin)return;
 const key=BD_MUSEUM.key(),seen=game.save.museum.visited;if(!seen.includes(key)){seen.push(key);persist();}
 if(r.names)$('#room-caption').textContent=r.names[Math.min(r.names.length-1,Math.floor(game.player.x/1536))];
 if(BD_MUSEUM.room==='story')BD_MUSEUM.watchDown();/* Claude, 20 Nov 2026 */
 const manual=game.player.walking&&(game.keys.size||game.touchMove||game.padMove||game.stickMove);
 const through=dt>0&&game.player.walking&&(manual||game.path.length);/* Claude, 24 Nov 2026: walking to a gallery's end by click or tap goes through too, as keys and sticks always did */
 if(through){
  if(manual&&BD_MUSEUM.room==='front'&&game.player.y<706&&game.player.vy<0&&Math.abs(game.player.x-770)<66){
   BD_MUSEUM.openFrontDoors();return;
  }
  if(game.player.x>r.width-55){if(BD_MUSEUM.room==='ot')BD_MUSEUM.begin('scroll',{arrival:BD_MUSEUM.scrollWays.ot.arrival.slice(),facing:BD_MUSEUM.scrollWays.ot.facing});else if(BD_MUSEUM.room==='nt')BD_MUSEUM.begin('table',{arrival:[100,945]});}
  if(game.player.x<55){if(BD_MUSEUM.room==='nt')BD_MUSEUM.begin('scroll',{arrival:BD_MUSEUM.scrollWays.nt.arrival.slice(),facing:BD_MUSEUM.scrollWays.nt.facing});else if(BD_MUSEUM.room==='table')BD_MUSEUM.begin('nt-3',{arrival:[4500,945]});}
  if((BD_MUSEUM.room==='ot'||BD_MUSEUM.room==='nt')&&game.player.y>r.height-40&&(game.player.vy||game.player.facingY||0)>0){BD_MUSEUM.begin('entry');return;}/* Claude, 24 Nov 2026: walking down at the front of any Testament bay leads back to the Entry Hall */
  if(BD_MUSEUM.room==='scroll'&&BD_MUSEUM.leaveScroll())return;/* Claude, 24 Nov 2026: the Scroll Room is left by its two painted back arches and its south door, not its side edges */
  if(BD_MUSEUM.room==='table'&&Object.keys(game.save.finds).length===12&&game.player.x>1320&&game.player.y<790)BD_MUSEUM.begin('garden',{arrival:[750,960]});
  if(manual&&BD_MUSEUM.room==='scroll'&&Math.hypot(game.player.x-BD_SCROLL.rampFoot[0],game.player.y-BD_SCROLL.rampFoot[1])<60&&(game.keys.has('arrowup')||game.keys.has('w')||game.touchMove==='up'||game.padMove?.[1]<-.3||(game.stickMove?.[1]||0)<-.5))BD_SCROLL.startAscent();
 }




/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_MUSEUM.screen=function worldToScreen(point){const c=BD_MUSEUM.camera;return [(point[0]-c.x)*c.z*(c.ax||1),(point[1]-c.y)*c.z*(c.ay||1)];

/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_MUSEUM.world=function screenToWorld(point){const c=BD_MUSEUM.camera;return [point[0]/(c.z*(c.ax||1))+c.x,point[1]/(c.z*(c.ay||1))+c.y];

/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_MUSEUM.hotspots=function museumPlaces(){
 const room=BD_MUSEUM.room,r=BD_MUSEUM.config(),spots=[];
 function spot(id,x,y,label,action,point){spots.push({id,x,y,label,icon:'◇',point:nearestFree(...(point||[x,Math.max(r.floor+35,Math.min(r.height-50,y+70))])),action});
/* Code by Daniel using ChatGPT November 15, 2026 */
}
 for(const site of BD_SITES){const p=BD_MUSEUM.display(site);if(p.room!==room)continue;if(!p.setting&&!game.save.finds[site.id])continue;spots.push({id:site.id,x:p.x,y:p.y-p.h-18,label:game.save.finds[site.id]?site.artifact:'On expedition · '+site.artifact,icon:game.save.finds[site.id]?'✦':'⌖',kind:'exhibit',point:nearestFree(...p.approach),action:function inspect(){showExhibit(site);
/* Code by Daniel using ChatGPT November 15, 2026 */
}});}
 if(room==='front'){
  spot('welcome-sign',566,684,'The Past is waiting… · Biblical Adventure Ahead',()=>BD_IMMERSION.pack(),[590,846]);
  spot('front-door',770,650,'Enter the museum',BD_MUSEUM.openFrontDoors,[770,735]);spot('airfield-path',1400,950,'Path to the aircraft',function(){setScene('cabin');
/* Code by Daniel using ChatGPT November 15, 2026 */
},[1400,940]);}
 else if(room==='entry'){
  spot('old-door',460,490,'Old Testament · Exile and Return',function(){BD_MUSEUM.begin('ot-3');
/* Code by Daniel using ChatGPT November 15, 2026 */
},[460,720]);spot('scroll-door',770,585,'The Scroll Room',function(){BD_MUSEUM.begin('scroll');
/* Code by Daniel using ChatGPT November 15, 2026 */
},[770,720]);spot('new-door',1130,490,'New Testament · The Lake',function(){BD_MUSEUM.begin('nt-1');
/* Code by Daniel using ChatGPT November 15, 2026 */
},[1130,720]);
  spot('expedition-flyer',1160,685,'The Important Dig · expedition flyer',()=>BD_FLYER.open(),[1048,973]);spot('reading-corner',1340,700,'Fair questions · reading corner',function(){BD_MUSEUM.reading();
/* Code by Daniel using ChatGPT November 15, 2026 */
});spot('depart',770,975,'The Front · aircraft path',function(){BD_MUSEUM.begin('front');
/* Code by Daniel using ChatGPT November 15, 2026 */
},[770,965]);
 }else{
  if(room==='ot'){spot('east-door',4520,780,'Scroll Room →',function intoTheRotundaFromTheWest(){BD_MUSEUM.begin('scroll',{arrival:BD_MUSEUM.scrollWays.ot.arrival.slice(),facing:BD_MUSEUM.scrollWays.ot.facing});
/* Code by Daniel using Claude November 24, 2026: arrive at the Scroll Room's back-left arch */
},[4535,900]);spot('entry-return',4240,950,'Entry Hall ↓',function(){BD_MUSEUM.begin('entry');
/* Code by Daniel using ChatGPT November 15, 2026 */
});spot('archaeology-books',3300,680,'The archaeology shelf',function(){showBook('old-a');
/* Code by Daniel using ChatGPT November 15, 2026 */
});}
  if(room==='nt'){spot('roads-and-copies',3890,670,'Roads, dates, and written copies',function(){BD_MUSEUM.model('The world along the road','A governor’s letter and a surviving manuscript answer different historical questions. Compare the dated Gallio inscription with the written witnesses from Egypt.','new-a',14);
/* Code by Daniel using ChatGPT November 15, 2026 */
});spot('west-door',80,780,'← Scroll Room',function intoTheRotundaFromTheEast(){BD_MUSEUM.begin('scroll',{arrival:BD_MUSEUM.scrollWays.nt.arrival.slice(),facing:BD_MUSEUM.scrollWays.nt.facing});
/* Code by Daniel using Claude November 24, 2026: arrive at the Scroll Room's back-right arch */
},[75,900]);spot('east-door',4520,780,'The Table Room →',function(){BD_MUSEUM.begin('table',{arrival:[100,945]});
/* Code by Daniel using ChatGPT November 15, 2026 */
},[4535,900]);spot('entry-return',1200,950,'Entry Hall ↓',function(){BD_MUSEUM.begin('entry');
/* Code by Daniel using ChatGPT November 15, 2026 */
});spot('archaeology-books',1400,680,'The archaeology shelf',function(){showBook('new-a');
/* Code by Daniel using ChatGPT November 15, 2026 */
});}
  if(room==='scroll'){
   // The painted back-corner arches; each region [x±70, y−190…y+170] covers its opening down to the floor line.
   spot('west-door',80,1320,'← Old Testament · Exile and Return',function throughTheWestArch(){const w=BD_MUSEUM.scrollWays.ot;BD_MUSEUM.begin(w.to,{arrival:w.there.slice(),facing:w.thereFacing});
/* Code by Daniel using Claude November 24, 2026 */
},BD_MUSEUM.scrollWays.ot.arrival);spot('east-door',1456,1320,'New Testament · The Lake →',function throughTheEastArch(){const w=BD_MUSEUM.scrollWays.nt;BD_MUSEUM.begin(w.to,{arrival:w.there.slice(),facing:w.thereFacing});
/* Code by Daniel using Claude November 24, 2026 */
},BD_MUSEUM.scrollWays.nt.arrival);
   spot('upstairs',1200,1590,'Ramp / lift · The Accounts ↑',function(){BD_SCROLL.startAscent();

/* Code by Daniel using ChatGPT November 16, 2026 */
},BD_SCROLL.rampFoot);spot('look-up',780,1530,'Look up to the oculus',function(){if(BD_SCROLL.active())BD_SCROLL.close();else BD_SCROLL.open();


/* Code by Daniel using ChatGPT November 16, 2026 */
},[1000,2090]);
   spot('entry-return',770,2230,'Entry Hall ↓',function(){BD_MUSEUM.begin('entry');
/* Code by Daniel using ChatGPT November 15, 2026 */
});
  }
  if(room==='table'){spot('west-door',70,780,'← The Road',function(){BD_MUSEUM.begin('nt-3',{arrival:[4500,945]});
/* Code by Daniel using ChatGPT November 15, 2026 */
},[75,900]);spot('garden',1330,670,'A moment by the garden',function(){BD_MUSEUM.model('A table shared','You have walked from Egypt to this table. The people were real, and so were the places. The one they gathered here to worship is alive. Stay as long as you like.','new-r',20);
/* Code by Daniel using ChatGPT November 15, 2026 */
});}
  if(room==='story'){for(const m of BD_ACCOUNTS.wall()){spot('history-'+m.n,m.x,580,(m.n+1)+' · '+m.word,function(){BD_ACCOUNTS.open(m.t,m.i);/* Code by Daniel using Claude November 21, 2026: sixteen steps, each marker where its event is painted */
},[m.x,790]);}spots.push({id:'story-down',x:770,y:1000,label:'↓ Down to the Scroll Room',icon:'↓',get point(){return [game.player.x,game.player.y];},action:function(){BD_MUSEUM.askDown();}});/* Claude, 20 Nov 2026: the front edge of the floor, wherever you are, leads down */spot('downstairs',770,970,'Lift / ramp · Scroll Room ↓',function(){BD_MUSEUM.begin('scroll',{arrival:BD_SCROLL.rampFoot.slice()});


/* Code by Daniel using ChatGPT November 16, 2026 */
});}
 }
 return spots.concat(BD_MODELS.hotspots(),BD_PEOPLE.hotspots());




/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_MUSEUM.offerLook=function offerCeilingReturn(){BD_SCROLL.controls();


/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_MUSEUM.reading=function courtReading(){openPanel('BY THE OLIVE COURT','<h2>Fair questions, good company.</h2><p class="lede">A place to ask slowly, with the sea behind you and the garden beside you.</p>'+BD_LIBRARY.shelf(BD_BOOKS.filter(function questions(book){return book.id==='old-r'||book.id==='new-r';
/* Code by Daniel using ChatGPT November 17, 2026 */
}),'long',true)+'<div class="actions"><button class="button secondary" data-action="library">Browse the library · short reads &amp; full volumes</button><button class="button secondary" data-action="crew">Ask the crew</button><button class="button secondary" data-action="gospel">The story at the heart of it all</button></div>','reading-corner');
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_MUSEUM.model=function inspectMuseumModel(title,text,book,page){openPanel('MUSEUM MODEL','<h2>'+escapeHTML(title)+'</h2><p class="lede">'+escapeHTML(text)+'</p><div class="actions"><button class="button" data-book="'+book+'" data-page="'+page+'">Read alongside the model</button></div>','museum-model');
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_MUSEUM.plan=function museumFloorPlan(){
 const ids=['ot-1','ot-2','ot-3','scroll','nt-1','nt-2','nt-3','table'],names=['Egypt','The Kings','Exile & Return','Scroll Room','The Lake','The City','The Road','Table Room'],visited=game.save.museum.visited;
 openPanel('ONE BUILDING · THE SEA TO THE WEST','<h2>Your museum.</h2><p class="lede">Walk the brass line from Egypt to the garden. The Entry Hall joins the two Testaments in the middle.</p><div class="museum-map"><p class="map-compass">NORTH ↑ · HILLSIDE</p><div class="museum-map-line">'+ids.map(function(id,i){return '<button data-museum-room="'+id+'" '+(!visited.includes(id)?'disabled':'')+'><small>'+id.toUpperCase()+'</small>'+names[i]+(!visited.includes(id)?'<em>Walk here first</em>':'<em>Return here →</em>')+'</button>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</div><div class="museum-map-lobby"><span>SEA ←</span><button data-museum-room="entry">ENTRY HALL<br><small>Old ← · Scroll ↑ · New →</small></button><span>OLIVE COURT →</span></div><button data-museum-room="story" '+(!visited.includes('story')?'disabled':'')+'>UPSTAIRS · THE ACCOUNTS · ramp / lift from the Scroll Room</button></div><p class="fine-print">Rooms open as you visit them. Expeditions, Scripture, books, and the gospel are always available.</p><div class="actions"><button class="button secondary" data-action="atlas">Expedition atlas</button><button class="button secondary" data-action="family-tour">Give a tour</button></div>','museum-plan');
 for(const b of document.querySelectorAll('[data-museum-room]'))b.addEventListener('click',function(){BD_MUSEUM.enter(this.dataset.museumRoom);
/* Code by Daniel using ChatGPT November 15, 2026 */
});

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_MUSEUM.openFrontDoors=function openFrontDoors(){
 if(!game.save.welcomed){game.save.welcomed=true;persist();}
 BD_JOURNEY.begin();
 BD_MUSEUM.begin('entry');
 /* Code by Daniel using ChatGPT November 23, 2026 */
};
BD_MUSEUM.begin=function beginMuseumPassage(id,options={}){
 if(game.hallTransition)return;
 if(BD_MUSEUM.room==='scroll'&&id==='story'&&!options.arrival)options={...options,arrival:[245,855]};
 if((BD_MUSEUM.room==='ot'||BD_MUSEUM.room==='nt')&&id==='entry'&&!options.arrival)options={...options,arrival:BD_MUSEUM.room==='ot'?[460,720]:[1130,720],facing:Math.PI/2};/* Claude, 24 Nov 2026: back out through that wing's own Entry door */
 if(BD_MUSEUM.room==='scroll'&&id==='entry'&&!options.arrival){const w=BD_MUSEUM.scrollWays.entry;options={...options,arrival:w.there.slice(),facing:w.thereFacing};}/* Claude, 24 Nov 2026: out through the south door, into the Entry Hall in front of the Scroll Room doors */
 if(game.save.settings.reduced||((BD_MUSEUM.room==='scroll'&&id==='story'||BD_MUSEUM.room==='story'&&id==='scroll')&&!BD_VIEW.allowed())){BD_MUSEUM.enter(id,options);return;}
 closePanel();game.path=[];game.pending=null;game.keys.clear();game.player.walking=false;game.player.vx=game.player.vy=0;
 const room=BD_MUSEUM.room,door=room==='front'?{x:688,y:465,w:170,h:200}:room==='entry'?(id==='front'?{x:650,y:920,w:240,h:180}:id==='scroll'?{x:636,y:290,w:264,h:310}:id.startsWith('ot')?{x:365,y:310,w:200,h:300}:id==='court'?/* Claude, 24 Nov 2026: out past the Olive Court sign to the right, where its arrow points, not into the New Testament door */{x:1476,y:560,w:120,h:300}:{x:1030,y:310,w:200,h:300}):{x:game.player.x<700?20:BD_MUSEUM.config().width-240,y:BD_MUSEUM.config().floor-360,w:210,h:350};
 game.hallTransition={toId:id,options,elapsed:0,duration:1.8,door,fromRoom:room,fromCamera:{...BD_MUSEUM.camera},walkStart:{...game.player},bronze:room==='entry'&&id==='scroll'||room==='front'&&id==='entry'};
 if(room==='scroll'&&id==='story'){game.hallTransition.ramp=true;game.hallTransition.rampStart=[game.player.x,game.player.y];game.hallTransition.rampPhase=game.player.gaitPhase||0;game.hallTransition.duration=4.6;}
 if(room==='story'&&id==='scroll'){game.hallTransition.liftReturn=true;game.hallTransition.duration=1.1;}
 if((room==='scroll'||room==='ot'||room==='nt')&&id==='entry'){game.hallTransition.southDoor=true;game.hallTransition.duration=1.1;}/* Code by Daniel using Claude November 24, 2026: the Entry door is behind the viewer, so the way out fades rather than zooming into a back arch */
 $('#hotspots').hidden=true;$('.location-plaque').hidden=true;$('#flight-skip').textContent='Step through →';$('#flight-skip').hidden=false;game.dirty=true;
 if(game.hallTransition.ramp)$('#flight-skip').textContent='Continue upstairs →';else if(game.hallTransition.liftReturn)$('#flight-skip').textContent='Return to the Scroll Room →';



/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_MUSEUM.finish=function finishMuseumPassage(){const t=game.hallTransition;if(!t)return;game.hallTransition=null;$('#hotspots').hidden=false;$('.location-plaque').hidden=false;$('#flight-skip').hidden=true;BD_MUSEUM.enter(t.toId,t.options);
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_MUSEUM.request=function chooseWing(hall){BD_MUSEUM.enter(hall==='ot'?'ot-3':'nt-1');
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_MUSEUM.passageActor=function foregroundPassageTraveler(t){
 if(t.ramp)return BD_SCROLL.rampActor(t);if(!['entry','front'].includes(t.fromRoom)||t.toId==='front')return game.player;
 const a=t.walkStart||game.player,u=Math.max(0,Math.min(1,(t.elapsed/t.duration-.12)/.68)),k=u*u*(3-2*u),b=[t.door.x+t.door.w/2,Math.max(BD_MUSEUM.config().floor+30,t.door.y+t.door.h+30)],dx=(b[0]-a.x)*k,dy=(b[1]-a.y)*k,angle=Math.atan2(b[1]-a.y,b[0]-a.x),height=BD_ART.travelerHeight(a.y+dy);
 return {...a,x:a.x+dx,y:a.y+dy,walking:u<1,walkBlend:Math.min(1,u*8),facingAngle:angle,renderDirection:((Math.round(angle/(Math.PI/4))%8)+8)%8,gaitPhase:((a.gaitPhase||0)+Math.hypot(dx,dy)/(height*.72))%1};
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_MUSEUM.paintTransition=function paintMuseumPassage(time){const t=game.hallTransition,p=t.elapsed/t.duration;if(t.ramp){BD_SCROLL.paintAscent(time,t);return;}if(t.liftReturn||t.southDoor){BD_MUSEUM.draw(time);ctx.fillStyle='rgba(22,38,30,'+p+')';ctx.fillRect(0,0,W,H);return;}/* Claude, 24 Nov 2026: the south door fades too */ctx.save();const f=BD_MUSEUM.screen([t.door.x+t.door.w/2,t.door.y+t.door.h*.6]),push=Math.max(0,(p-.4)/.6),zoom=1+push*2.5;ctx.translate(W/2,H/2);ctx.scale(zoom,zoom);ctx.translate(-W/2-(f[0]-W/2)*push,-H/2-(f[1]-H/2)*push);BD_MUSEUM.draw(time);ctx.restore();if(p>.8){ctx.fillStyle='rgba(22,38,30,'+((p-.8)/.2)+')';ctx.fillRect(0,0,W,H);}


/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_MUSEUM.welcomeSign={
 face:[449,647,684,792],footprint:[458,769,675,806],
 paint(c){
  const [left,top,right]=this.face;
  BD_SIGNS.mounted(c,'welcome',(left+right)/2,top-3,right-left,162);
  /* Code by Daniel using ChatGPT November 23, 2026 */
 }
};
BD_MUSEUM.draw=function paintActiveMuseum(time){
 BD_MUSEUM.paintRoom(ctx,BD_MUSEUM.camera,time);
};
BD_MUSEUM.paintAtGround=function paintGroundedObjects(c,time,objects,figures=true,traveler=game.player){
 // Depth is the world-space Y of the feet or base. The camera only changes the projection.
 if(figures){
  for(const actor of BD_PEOPLE.actors())objects.push({y:actor.p[1],paint:()=>BD_PEOPLE.paint(c,actor)});
  if(traveler)objects.push({y:traveler.y,paint:()=>BD_ART.traveler(c,traveler,time,game.save.settings.reduced)});
 }
 objects.sort((a,b)=>a.y-b.y);
 for(const object of objects)object.paint();
};
BD_MUSEUM.paintRoom=function paintMuseum(c,cam,time,{figures=true,markers=true}={}){
 const r=BD_MUSEUM.config();c.save();c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';c.scale(cam.z*(cam.ax||1),cam.z*(cam.ay||1));c.translate(-cam.x,-cam.y);
 for(let i=0;i<r.images.length;i++){const name=r.images[i],im=BD_ART.images[(r.group==='front'?'m5-':'m4-')+name];if(!im)continue;c.save();if(r.group==='scroll'||r.group==='table'){const id=r.group==='scroll'?'qumran':'megiddo',warm=game.save.finds[id]?(BD_MUSEUM.warm[id]??1):0;c.filter='brightness('+(.55+.45*warm)+') saturate('+(.35+.65*warm)+')';}if(r.group==='scroll')BD_SCROLL.backdrop(c,im,game.save.finds.qumran?(BD_MUSEUM.warm.qumran??1):0);else if(BD_MUSEUM.layout[name])BD_MUSEUM.paintBay(c,im,i*1536,BD_MUSEUM.layout[name]);else c.drawImage(im,i*1536,0,1536,1024);c.restore();}
 if(window.BD_IMMERSION)BD_IMMERSION.architecture(c,r);
 if(r.group==='scroll')BD_SCROLL.paintMural(c);if(r.group==='table')BD_JOURNEY.gate(c);
 // A single brass line is continuous across every bay.
 const lineY=r.group==='table'?980:r.height-105;c.strokeStyle=Object.keys(game.save.finds).length===12?'#efd28a':'#b69a61aa';c.lineWidth=Object.keys(game.save.finds).length===12?5:3;c.beginPath();c.moveTo(0,lineY);if(r.group==='table'){c.lineTo(1320,lineY);c.quadraticCurveTo(1360,lineY,1360,900);c.lineTo(1360,750);}else c.lineTo(r.width,lineY);c.stroke();c.font='17px Georgia';c.textAlign='center';c.fillStyle='#806a40';
 if(r.names)for(let i=0;i<r.images.length;i++){
  const eras=r.group==='ot'?['c. 1700–1200 BC','9th century BC','539 BC']:r.group==='nt'?['1st century BC–AD 1st century','1st century AD','AD 52–3rd century']:['Beginnings and Egypt','Kings, exile, and return','The life of Jesus','The growing church'];
  BD_SIGNS.label(c,'brass',i*1536+770,lineY+16,330,28,r.names[i]+' · '+eras[i],'',13);
 }
 for(const [id,p]of Object.entries(BD_MUSEUM.displays)){if(p.room!==BD_MUSEUM.room||!p.setting)continue;const lit=!!game.save.finds[id],amount=BD_MUSEUM.warm[id]??(lit?1:0),[x,y,w,h]=p.setting;if(amount<.99&&r.group!=='scroll'&&r.group!=='table'){c.save();c.filter='blur(24px)';c.fillStyle='rgba(12,26,31,'+(.8*(1-amount))+')';c.fillRect(x+5,y+5,w-10,h-10);c.restore();BD_SIGNS.label(c,'wall',x+w/2,y+h-46,148,29,'ON EXPEDITION','',13);}}
 const objects=[];if(r.group==='scroll')objects.push({y:1488,paint:()=>BD_SCROLL.paintRampSign(c)});if(r.group==='front')objects.push({y:800,paint:()=>BD_MUSEUM.welcomeSign.paint(c)});if(r.group==='entry')objects.push({y:860,paint:function seaBench(){BD_IMMERSION.hardBook(c);
/* Code by Daniel using ChatGPT November 17, 2026 */
}});for(const site of BD_SITES){const p=BD_MUSEUM.display(site);if(p.room!==BD_MUSEUM.room)continue;if(p.style==='modelcontext')continue;if(!game.save.finds[site.id]){if(p.setting)objects.push({y:p.y,paint:function(){BD_MUSEUM.sheet(c,p);
/* Code by Daniel using ChatGPT November 15, 2026 */
}});continue;}objects.push({y:p.style==='mosaic'?r.floor-1:p.y,paint:function(){BD_MUSEUM.object(c,site,p);
/* Code by Daniel using ChatGPT November 15, 2026 */
}});}
 for(const [key,model]of BD_MODELS.forRoom(BD_MUSEUM.room))objects.push({y:model.y,paint:function(){BD_MODELS.draw(c,key,model,markers);
/* Code by Daniel using ChatGPT November 15, 2026 */
}});
 if(r.group==='entry')objects.push({y:912,paint:function(){BD_PEOPLE.desk(c);
/* Code by Daniel using ChatGPT November 17, 2026 */
}});
 if(r.group==='entry')objects.push({y:820,paint:function courtDirection(){BD_IMMERSION.courtSign(c);
/* Code by Daniel using ChatGPT November 17, 2026 */
}});
 if(r.group==='story')for(const m of BD_ACCOUNTS.wall())BD_SIGNS.label(c,'marker',m.x,578,128,76,String(m.n+1),m.word,25);
 BD_MUSEUM.paintAtGround(c,time,objects,figures,game.hallTransition?null:game.player);
 if(r.images.length>1){const pier=BD_ART.images[r.group==='ot'?'m4-stone-pier':'m4-ivory-pier'];for(let i=1;i<r.images.length;i++){if(pier){c.save();const distance=Math.abs(game.player.x-i*1536);c.globalAlpha=1-.76*Math.max(0,Math.min(1,(145-distance)/65));c.drawImage(pier,i*1536-90,0,180,1024);c.restore();}else{const g=c.createLinearGradient(i*1536-65,0,i*1536+65,0);g.addColorStop(0,'#786548');g.addColorStop(.5,r.group==='ot'?'#c5aa7c':'#ebe5d5');g.addColorStop(1,'#796b51');c.fillStyle=g;c.fillRect(i*1536-65,0,130,1024);}}}
 if(game.hallTransition?.bronze){const d=game.hallTransition.door,t=Math.min(1,game.hallTransition.elapsed/.65),leaf=d.w/2*(1-t);c.fillStyle='#132c2a';c.fillRect(d.x,d.y,d.w,d.h);const outside=game.hallTransition.fromRoom==='front',inside=BD_ART.images[outside?'m4-entry':'m4-scroll'];if(inside){const sy=outside?100:500;c.drawImage(inside,0,sy,inside.width,inside.height-sy,d.x,d.y,d.w,d.h);}const sc=BD_ART.images[outside?'m5-front-v2':'m4-entry'];if(sc)for(const side of [0,1])c.drawImage(sc,d.x+side*d.w/2,d.y,d.w/2,d.h,side?d.x+d.w-leaf:d.x,d.y,leaf,d.h);}
 if(figures&&game.hallTransition)BD_ART.traveler(c,BD_MUSEUM.passageActor(game.hallTransition),time,game.save.settings.reduced);
 if(figures&&game.path.length){const p=game.path.at(-1);c.strokeStyle='#d3b974';c.beginPath();c.ellipse(p[0],p[1],12,5,0,0,Math.PI*2);c.stroke();}
 c.restore();




/* Code by Daniel using ChatGPT November 17, 2026 */
};
// The source plinth's top at its centre is y=42; its floor contact is y=275.
BD_MUSEUM.stand=function paintedMuseumPlinth(c,x,y,w,h){const im=BD_ART.images['m4-plinth'];if(!im)return;const sx=w/446,sy=h/(275-42);c.drawImage(im,x-223*sx,y-275*sy,im.width*sx,im.height*sy);
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_MUSEUM.mount=function artifactMount(site,p){
 const [left,top,right,bottom]=BD_ARTIFACT_METRICS[site.art].bounds,sw=right-left,sh=bottom-top,scale=Math.min(p.w*.92/sw,p.h*.95/sh);
 const contact=p.style==='wall'?p.y-28:p.style==='boat'?p.y-59:p.y-85;
 return {source:[left,top,sw,sh],x:p.x-sw*scale/2,y:contact-sh*scale,w:sw*scale,h:sh*scale,contact,floor:p.y};
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_MUSEUM.mountedArtifact=function paintMountedArtifact(c,site,m){const im=BD_ART.images['find-'+site.art];if(!im)return;c.save();if(game.justFound===site.id){c.shadowColor='#e4c47b';c.shadowBlur=23;}c.drawImage(im,...m.source,m.x,m.y,m.w,m.h);c.restore();
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_MUSEUM.sheet=function paintedDustSheet(c,p){const im=BD_ART.images['m4-dust'];if(!im)return;const b=BD_MUSEUM.sheetBox(p);c.drawImage(im,b.x,b.y,b.w,b.h);
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_MUSEUM.object=function museumObject(c,site,p){
 c.save();
 if(p.style==='mosaic'){BD_MUSEUM.floorMosaic(c,site,p);BD_MUSEUM.tableArt(c,p.x,p.y-77);}
 else if(p.style==='drum'){const drum=BD_ART.images['m4-drum'];if(drum)c.drawImage(drum,p.x-p.w/2,p.y-330,p.w,330);BD_MUSEUM.scrollBand(c,site,{...p,y:p.y-45});}
 else{
  const m=BD_MUSEUM.mount(site,p);
  if(p.style==='boat')BD_MUSEUM.boatSupport(c,p,m);
  else if(p.style==='wall'){c.fillStyle='#20392f66';c.fillRect(m.x-12,m.y-12,m.w+24,m.h+26);c.strokeStyle='#bca975';c.lineWidth=2;c.strokeRect(m.x-12,m.y-12,m.w+24,m.h+26);}
  else BD_MUSEUM.stand(c,p.x,p.y,p.w*.9,85);
  if(p.style==='desk'){c.fillStyle='#d9ceb299';c.fillRect(m.x-5,m.y-7,m.w+10,m.h+7);c.strokeStyle='#aa9368';c.strokeRect(m.x-5,m.y-7,m.w+10,m.h+7);}
  BD_MUSEUM.mountedArtifact(c,site,m);
  if(p.style==='wall'){c.fillStyle='#af9562';for(const x of [m.x+m.w*.16,m.x+m.w*.79]){c.fillRect(x,m.contact-3,11,8);c.fillRect(x+3,m.contact-8,5,12);}}
  if(['glass','jewel','desk','model'].includes(p.style))BD_ART.glass(c,{x:p.x,y:m.contact+4,w:Math.max(p.w,m.w+24),h:m.h+18},true);
 }
 const labelY=p.y+(p.style==='mosaic'?104:18);BD_SIGNS.label(c,'brass',p.x,labelY,180,25,BD_JOURNEY.caseCaption(site),'',12);BD_JOURNEY.labelOnCase(c,site,p,labelY);c.restore();
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_MUSEUM.modelArt=function paintedTerrainModel(c,x,y,kind){const im=BD_ART.images[kind==='masada'?'m4-mmodel':'m4-qmodel'];if(im)c.drawImage(im,x-135,y-155,270,155);BD_SIGNS.label(c,'wall',x,y+10,210,25,kind==='masada'?'MASADA · MODEL':'QUMRAN · MODEL','',12);
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_MUSEUM.layout={"ot-egypt": {"cornice": 195, "floor": 742, "source": "ot-egypt-v2"}, "ot-kings": {"cornice": 195, "floor": 742}, "ot-return": {"cornice": 195, "floor": 742}, "nt-lake": {"cornice": 188, "floor": 630}, "nt-city": {"cornice": 188, "floor": 633}, "nt-road": {"cornice": 188, "floor": 634}, "story-1": {"cornice": 196, "floor": 650}, "story-2": {"cornice": 199, "floor": 610}, "story-3": {"cornice": 208, "floor": 598}, "story-4": {"cornice": 193, "floor": 615}};
BD_MUSEUM.paintBay=function calibratedMuseumBay(c,im,x,landmarks){const a=landmarks.cornice,b=landmarks.floor;c.drawImage(im,0,0,1536,a,x,0,1536,150);c.drawImage(im,0,a,1536,b-a,x,150,1536,460);c.drawImage(im,0,b,1536,1024-b,x,610,1536,414);
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_MUSEUM.scrollBand=function wrappedIllustratedScroll(c,site,p){const im=BD_ART.images['find-'+site.art];if(!im)return;const width=p.w*.83,segments=48;for(let i=0;i<segments;i++){const u=(i+.5)/segments*2-1,x=p.x-width/2+i/segments*width,y=p.y-110-u*u*12;c.drawImage(im,im.width*(.24+.54*i/segments),im.height*.18,im.width*.54/segments+1,im.height*.62,x,y,width/segments+.5,82);}c.save();c.strokeStyle='#bca771';c.lineWidth=1;c.beginPath();c.moveTo(p.x-width/2,p.y-122);c.quadraticCurveTo(p.x,p.y-95,p.x+width/2,p.y-122);c.stroke();c.restore();
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_MUSEUM.tableArt=function plainTimberTable(c,x,y){c.save();c.translate(x,y);c.fillStyle='#2b21173b';c.beginPath();c.ellipse(0,77,99,17,0,0,Math.PI*2);c.fill();const wood=c.createLinearGradient(-90,-20,90,75);wood.addColorStop(0,'#b39365');wood.addColorStop(.4,'#806241');wood.addColorStop(1,'#4b3826');c.fillStyle=wood;for(const lx of [-72,64]){c.fillRect(lx,-1,11,77);c.fillRect(lx+12,-17,8,70);}c.beginPath();c.moveTo(-94,-17);c.lineTo(72,-25);c.lineTo(95,-5);c.lineTo(-78,7);c.closePath();c.fill();c.fillStyle='#62482f';c.beginPath();c.moveTo(-78,7);c.lineTo(95,-5);c.lineTo(95,8);c.lineTo(-78,19);c.closePath();c.fill();c.strokeStyle='#d4b58466';c.lineWidth=1;for(let i=0;i<5;i++){c.beginPath();c.moveTo(-88+i*4,-13+i*4);c.lineTo(73+i*4,-20+i*4);c.stroke();}c.restore();
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_MUSEUM.displays.bethesda.style='modelcontext';

BD_MUSEUM.floorMosaic=function floorMountedMosaic(c,site,p){
 const im=BD_ART.images['find-'+site.art],[left,top,right,bottom]=BD_ARTIFACT_METRICS[site.art].bounds;if(!im)return;
 // Scanline projection puts the panel on the same receding floor as the timber table.
 for(let row=0;row<120;row++){const v=row/120,width=p.w*(.65+.35*v);c.drawImage(im,left,top+(bottom-top)*v,right-left,(bottom-top)/120+.5,p.x-width/2,p.y-110+v*198,width,198/120+.5);}

/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_MUSEUM.boatSupport=function hullFollowingCradle(c,p,m){
 const base=BD_ART.images['m4-cradle'];if(base)c.drawImage(base,0,200,488,109,p.x-m.w*.59,p.y-42,m.w*1.18,42);
 // Measured opaque hull contours in find-6-v2.webp: source (398,939), (1085,705).
 for(const [sourceX,sourceY]of [[398,939],[1085,705]]){
  const x=m.x+(sourceX-m.source[0])/m.source[2]*m.w,y=m.y+(sourceY-m.source[1])/m.source[3]*m.h,floor=p.y-20;
  const wood=c.createLinearGradient(x-12,0,x+12,0);wood.addColorStop(0,'#60472d');wood.addColorStop(.4,'#b18d5c');wood.addColorStop(1,'#6c4b2d');c.fillStyle=wood;c.fillRect(x-9,y,18,floor-y);c.fillRect(x-27,floor-6,54,11);
  c.strokeStyle='#d0ac7266';c.lineWidth=1;for(let i=0;i<3;i++){c.beginPath();c.moveTo(x-5+i*4,y+7);c.lineTo(x-5+i*4,floor-4);c.stroke();}
  c.fillStyle='#6b5d45';c.fillRect(x-20,y-1,40,8);c.fillStyle='#bdb295';c.fillRect(x-18,y-3,36,5);
 }

/* Code by Daniel using ChatGPT November 15, 2026 */
};
