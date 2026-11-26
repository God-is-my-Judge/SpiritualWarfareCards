'use strict';
window.BD_MODELS={plate:'Model',items:{
 land:{room:'entry',x:500,y:870,ratio:1.8,title:'The land between',art:'land',text:'Follow the rivers and the narrow land corridor between Egypt and Mesopotamia. The lit points record places you have visited.',features:[['Nile',[.22,.67],'A river ribbon through Egypt, beside a much drier landscape.'],['Levant',[.46,.43],'A narrow corridor connects larger regions. Roads and armies pass through it.'],['Two rivers',[.75,.42],'Mesopotamia lies between the Euphrates and Tigris.']]},
 tel:{room:'ot',x:265,y:862,ratio:1.8,title:'A tel in section',art:'tel',text:'A tel is a mound built up by repeated settlement. Lower undisturbed layers are generally older; later pits can cut through them. This comparison follows periods represented by Avaris, Thebes, Tel Dan, Nimrud, Babylon and Qumran.',features:[['Layers',[.5,.62],'Different surfaces belong to different phases of activity.'],['Later pit',[.65,.68],'A later cut can carry material down through older layers.'],['The trench',[.79,.32],'Record the relationships before removing a layer.']]},
 qumran:{room:'scroll',x:325,y:2045,ratio:1.68,title:'Qumran and its caves',art:'qumran',text:'Compare the settlement, water installations, and nearby cliffs. Trace the caves above the settlement.',source:['INPA, Qumran site plan, 2021','https://static.parks.org.il/wp-content/uploads/2021/11/Qumran-eng-16.11.21.pdf'],features:[['Cave 1',[.13,.27],'The Great Isaiah Scroll came from Cave 1, in the cliffs above the Dead Sea.'],['Settlement',[.58,.48],'The rectilinear settlement and its water installations follow the published park plan in simplified form.'],['Water',[.31,.55],'Water channels and reservoirs help make the dry setting understandable.']]},
 masada:{room:'scroll',x:1270,y:2045,ratio:1.1,title:'Masada',art:'masada',text:'A small contextual model of the plateau. Scroll fragments were also found at Masada.',features:[['The plateau',[.5,.4],'The mesa makes its separation from the surrounding land visible.']]},
 lake:{room:'nt',x:1255,y:865,ratio:2,title:'The lake and its towns',art:'lake',text:'Explore the towns around one lake. A field visit lights Ginosar; the other town lights mark places you explore on this model.',features:[['Capernaum',[.39,.24],'Capernaum lies on the northern shore. Keep its position in mind when reading the Gospel journeys.'],['Ginosar',[.285,.33],'The ancient boat was recovered near Ginosar, on the western shore.'],['Magdala',[.23,.44],'Magdala is on the western shore, farther south than Ginosar.'],['Jordan',[.50,.79],'The Jordan continues south from the lake.']]},
 jerusalem:{room:'nt',x:2180,y:865,ratio:2.7,title:'Jerusalem before AD 70',art:'jerusalem',text:'A simplified late Second Temple city, around AD 66. Compare Bethesda, the Temple Mount, and the western palace. Locate the city’s main landmarks.',source:['University of Michigan, late Second Temple plan','https://image-database.nes.lsa.umich.edu/items/show/182'],features:[['Bethesda',[.66,.2],'The double pools lie north of the Temple Mount. The central division helps explain the fifth covered walkway.'],['Temple Mount',[.68,.4],'The raised Temple platform anchors the eastern side of this city model.'],['Western palace',[.16,.44],'Herod’s palace occupied the western hill; governors could use royal residences when staying in a city.']]}
}};
BD_MODELS.height=function tablePlayerHeight(model){return BD_ART.travelerHeight(model.y,{scene:'museum',room:model.room});
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_MODELS.metrics=function calibratedTable(model){const h=BD_MODELS.height(model),w=h*model.ratio,half=w*(model.art==='land'?.55:.5);return {height:h,width:w,top:model.y-h*.5,depth:model.y,box:[model.x-half,model.y-130,model.x+half,model.y+28],approach:[model.x,model.y+95]};

/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_MODELS.forRoom=function modelsInRoom(room){return Object.entries(BD_MODELS.items).filter(function(entry){return entry[1].room===room;
/* Code by Daniel using ChatGPT November 15, 2026 */
});
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_MODELS.obstacles=function tableFootprints(){return BD_MODELS.forRoom(BD_MUSEUM.room).map(function(entry){return BD_MODELS.metrics(entry[1]).box;
/* Code by Daniel using ChatGPT November 15, 2026 */
});
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_MODELS.visited=function visitedFieldIds(){return game.save.visitedSites||[];
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_MODELS.lit=function modelFeatureLit(key,index){const s=game.save;if(key==='qumran'&&index===0)return !!s.finds.qumran;if(key==='lake'&&index===1&&BD_MODELS.visited().includes('galilee'))return true;if(key==='jerusalem'&&index===0)return !!s.finds.bethesda;return (s.museum.modelVisits||[]).includes(key+'-'+index);
/* Code by Daniel using ChatGPT November 15, 2026 */
};
// The four insert corners are measured inside the pale rim of m5-table's painted top.
BD_MODELS.scrollMount=function scrollModelMount(model,metrics,table,image){
 const qumran=model.art==='qumran';
 const depth=Math.min(metrics.height*.8,metrics.width*.55)*.9,split=table.height*.35;
 const point=(u,row)=>[model.x+(u-.5)*metrics.width*1.1,metrics.top-depth+row/split*depth];
 const pad=[point(.09,18),point(.91,18),point(.96,128),point(.04,128)];
 const width=metrics.width*(qumran?.93:.85);
 const height=qumran?metrics.height*.65:width*image.height/image.width;
 const foot=point(.5,qumran?113:111)[1];
 return {x:model.x-width/2,y:foot-height*(qumran?941/1024:1),width,height,pad,foot,qumran,depth};
 /* Code by Daniel using ChatGPT November 24, 2026 */
};
BD_MODELS.paintMountPad=function paintModelMount(c,mount){
 const {pad,foot,width,x,qumran}=mount,[left,back]=pad[0],front=pad[3][1];
 c.save();
 c.beginPath();c.moveTo(...pad[0]);for(const point of pad.slice(1))c.lineTo(...point);c.closePath();
 const material=c.createLinearGradient(left,back,left,front);
 material.addColorStop(0,'#ad9071');material.addColorStop(1,'#d3b693');
 c.fillStyle=material;c.fill();c.lineWidth=1;c.strokeStyle='#e1c5a1';c.stroke();c.clip();
 c.fillStyle='#56361666';c.filter='blur(2px)';c.beginPath();
 if(qumran){
  c.moveTo(x+width*.08,foot-45);c.lineTo(x+width*.91,foot-45);
  c.lineTo(x+width,foot+3);c.lineTo(x,foot+3);c.closePath();
 }else c.ellipse(x+width*.49,foot-22,width*.48,25,-.13,0,Math.PI*2);
 c.fill();
 c.restore();
 /* Code by Daniel using ChatGPT November 24, 2026 */
};
BD_MODELS.draw=function drawModelTable(c,key,model,markers=true){
 if(key==='land'){if(BD_ART.images['m5-table']&&BD_ART.images['m5-land'])BD_MODELS.drawEntranceMap(c,model,markers);return;}
 const m=BD_MODELS.metrics(model),im=BD_ART.images['m5-'+model.art]||(key==='masada'?BD_ART.images['m4-mmodel']:null),table=BD_ART.images['m5-table'],glass=BD_ART.images['m5-glass'];if(!im)return;
 const top=m.top,artWidth=m.width*.92,artHeight=Math.min(m.height*.8,m.width*.55);
 const shift=game.save.settings.reduced?0:Math.max(-4,Math.min(4,(BD_MUSEUM.camera.x+(BD_MUSEUM.camera.viewWidth||W)/2-model.x)*.004));
 const split=table?table.height*.35:0;
 const mount=table&&model.room==='scroll'?BD_MODELS.scrollMount(model,m,table,im):null,planeDepth=mount?.depth??artHeight*.81;
 const art=mount||{x:model.x-artWidth/2-shift*.25,y:top-artHeight*.9,width:artWidth,height:artHeight};
 c.save();
 if(table){
  c.drawImage(table,0,0,table.width,split,model.x-m.width*.55,top-planeDepth,m.width*1.1,planeDepth);
  c.drawImage(table,0,split,table.width,table.height-split,model.x-m.width*.55,top,m.width*1.1,model.y-top);
 }else BD_MUSEUM.stand(c,model.x,model.y,m.width,model.y-top);
 if(mount)BD_MODELS.paintMountPad(c,mount);
 c.drawImage(im,art.x,art.y,art.width,art.height);
 if(markers)model.features.forEach(([,point],i)=>{
  const [u,v]=point,state=BD_MAP_MARKERS.state(false,BD_MODELS.lit(key,i));
  BD_MAP_MARKERS.draw(c,'lamp',state,art.x+u*art.width,art.y+v*art.height,9);
 });
 if(key==='tel'&&markers){
  const periods=['avaris','thebes','tel-dan','nimrud','babylon','qumran'];
  periods.forEach((id,i)=>BD_MAP_MARKERS.draw(c,'lamp',BD_MAP_MARKERS.state(false,!!game.save.finds[id]),model.x-artWidth*.27,top-artHeight*(.12+i*.065),7));
 }
 if(glass&&!mount){c.save();c.globalAlpha=.18;c.drawImage(glass,model.x-m.width*.55+shift,top-planeDepth-20,m.width*1.1,planeDepth+34);c.restore();}
 if(mount){
  c.font='14px Georgia';
  BD_SIGNS.label(c,'brass',model.x,top+4,c.measureText(model.title).width+29,21,model.title,'',14);
  c.restore();return;
 }
 BD_SIGNS.label(c,'wall',model.x,top+14,m.width,34,model.title,BD_MODELS.plate,13);if(key==='jerusalem')BD_JOURNEY.labelOnCase(c,BD_SITES.find(function(s){return s.id==='bethesda';
/* Code by Daniel using ChatGPT November 15, 2026 */
}),{x:model.x,y:model.y},top+35);c.restore();


/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_MODELS.landGeometry=function entranceTablePlane(model){
 const m=BD_MODELS.metrics(model),im=BD_ART.images['m5-table'],split=im.height*.35,depth=Math.min(m.height*.8,m.width*.55)*.81,x=model.x-m.width*.55,y=m.top-depth,w=m.width*1.1;
 const point=function plane(px,py){return [x+px/im.width*w,y+py/split*depth];

/* Code by Daniel using ChatGPT November 16, 2026 */
};
 return {m,split,depth,x,y,w,quad:[point(120,8),point(1305,8),point(1405,136),point(25,136)],source:{top:85,bottom:897,left:[88,10],right:[1440,1525]}};

/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_MODELS.landPoint=function reliefPointOnTable(uv,g){
 const im=BD_ART.images['m5-land'],s=g.source,v=Math.max(0,Math.min(1,(uv[1]*im.height-s.top)/(s.bottom-s.top))),left=s.left[0]+(s.left[1]-s.left[0])*v,right=s.right[0]+(s.right[1]-s.right[0])*v,u=Math.max(0,Math.min(1,(uv[0]*im.width-left)/(right-left))),a=[g.quad[0][0]+(g.quad[3][0]-g.quad[0][0])*v,g.quad[0][1]+(g.quad[3][1]-g.quad[0][1])*v],b=[g.quad[1][0]+(g.quad[2][0]-g.quad[1][0])*v,g.quad[1][1]+(g.quad[2][1]-g.quad[1][1])*v];return [a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u];

/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_MODELS.reliefSurface=function fitReliefInsideFrame(c,g){
 const im=BD_ART.images['m5-land'],key=JSON.stringify(g.quad);let cache=BD_MODELS.reliefCache;
 if(!cache||cache.key!==key){
  const x=Math.min(...g.quad.map(function horizontal(p){return p[0];
/* Code by Daniel using ChatGPT November 16, 2026 */
})),y=g.quad[0][1],w=Math.max(...g.quad.map(function horizontal(p){return p[0];
/* Code by Daniel using ChatGPT November 16, 2026 */
}))-x,h=g.quad[3][1]-y,cv=document.createElement('canvas');cv.width=Math.ceil(w*2);cv.height=Math.ceil(h*2);const d=cv.getContext('2d');d.scale(2,2);d.translate(-x,-y);d.beginPath();g.quad.forEach(function edge(p,i){if(i)d.lineTo(...p);else d.moveTo(...p);
/* Code by Daniel using ChatGPT November 16, 2026 */
});d.closePath();d.clip();
  for(let sy=g.source.top;sy<g.source.bottom;sy+=4){const v=(sy-g.source.top)/(g.source.bottom-g.source.top),left=g.source.left[0]+(g.source.left[1]-g.source.left[0])*v,right=g.source.right[0]+(g.source.right[1]-g.source.right[0])*v,a=[g.quad[0][0]+(g.quad[3][0]-g.quad[0][0])*v,y+h*v],b=g.quad[1][0]+(g.quad[2][0]-g.quad[1][0])*v;d.drawImage(im,left,sy,right-left,Math.min(4,g.source.bottom-sy),a[0],a[1],b-a[0],h*4/(g.source.bottom-g.source.top)+.4);}
  cache=BD_MODELS.reliefCache={key,canvas:cv,x,y,w,h};
 }
 c.drawImage(cache.canvas,cache.x,cache.y,cache.w,cache.h);

/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_MODELS.drawEntranceMap=function paintExpeditionRelief(c,model,markers=true){
 const g=BD_MODELS.landGeometry(model),table=BD_ART.images['m5-table'];c.save();
 c.drawImage(table,0,0,table.width,g.split,g.x,g.y,g.w,g.depth);BD_MODELS.reliefSurface(c,g);c.drawImage(table,0,g.split,table.width,table.height-g.split,g.x,g.m.top,g.w,model.y-g.m.top);
 if(markers){
  const visited=BD_MODELS.visited();
  for(const site of BD_SITES){
   const point=BD_MODELS.landPoint(BD_MODELS.siteUV[site.id],g);
   BD_MAP_MARKERS.draw(c,'lamp',BD_MAP_MARKERS.state(false,visited.includes(site.id)),...point,6);
  }
 }
 c.restore();
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_MODELS.mapUV=function coordinatesOnRelief(coords){const u=(coords[0]-15)/35,v=(42-coords[1])/20;return [.2+.67*u-.12*v,.1+.13*u+.67*v];
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_MODELS.hotspots=function modelMarkers(){return BD_MODELS.forRoom(BD_MUSEUM.room).map(function(entry){const [key,model]=entry,m=BD_MODELS.metrics(model);return {id:'model-'+key,x:model.x,y:m.top-m.height*.34,label:key==='land'?'Expedition map':model.title,icon:'⌕',point:m.approach,action:function(){if(key==='land'){BD_ATLAS.world=false;showAtlas();}else BD_MODELS.open(key);
/* Code by Daniel using ChatGPT November 17, 2026 */
}};

/* Code by Daniel using ChatGPT November 17, 2026 */
});

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_MODELS.paintClose=function closeModelView(canvas,key,selected=-1){const c=canvas.getContext('2d');c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';const model=BD_MODELS.items[key],im=BD_ART.images['m5-'+model.art]||(key==='masada'?BD_ART.images['m4-mmodel']:null);c.fillStyle='#263c35';c.fillRect(0,0,canvas.width,canvas.height);const b={x:40,y:20,w:canvas.width-80,h:canvas.height-95};if(im)c.drawImage(im,b.x,b.y,b.w,b.h);const spots=[];model.features.forEach(function(f,i){const p=[b.x+f[1][0]*b.w,b.y+f[1][1]*b.h];spots.push(p);const state=BD_MAP_MARKERS.state(i===selected,BD_MODELS.lit(key,i));BD_MAP_MARKERS.draw(c,'lamp',state,...p,i===selected?31:25);c.fillStyle='#16362ce6';c.fillRect(p[0]-64,p[1]+17,128,23);c.fillStyle='#f1e1bb';c.textAlign='center';c.font='12px Trebuchet MS';c.fillText(f[0],p[0],p[1]+33);
/* Code by Daniel using ChatGPT November 15, 2026 */
});c.fillStyle='#ddcda5';c.font='12px Georgia';c.textAlign='center';c.fillText(BD_MODELS.plate,canvas.width/2,canvas.height-31);return spots;

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_MODELS.open=function leanOverModel(key){
 const model=BD_MODELS.items[key];
 if(model.room==='scroll'&&game.scene==='museum'&&BD_MUSEUM.room===model.room&&!BD_SCROLL.active()){
  return BD_MAP_VIEW.openModel(key);
 }
 return BD_MODELS.openCard(key);
};
BD_MODELS.recordFeature=function recordModelFeature(key,i){
 const saved=game.save.museum.modelVisits??=[],id=key+'-'+i;
 if(!saved.includes(id)){saved.push(id);persist();}
 return BD_MODELS.items[key].features[i][2];
};
BD_MODELS.openCard=function openModelCard(key){
 const model=BD_MODELS.items[key];let selected=-1;
 const scaleNote='Illustrative model, not to scale.'+(key==='jerusalem'?' Bethesda’s pools are simplified.':'');
 openPanel('LEAN IN · '+model.title.toUpperCase(),'<h2>'+escapeHTML(model.title)+'</h2><div class="model-close"><canvas id="model-close" width="900" height="590" aria-describedby="model-scale-note" aria-label="'+escapeHTML(model.title)+'; choose its features below."></canvas></div><p id="model-scale-note" class="fine-print model-scale-note">'+escapeHTML(scaleNote)+'</p><p class="lede">'+escapeHTML(model.text)+'</p><div class="actions">'+model.features.map(function(f,i){return '<button class="button secondary" data-model-feature="'+i+'">'+escapeHTML(f[0])+'</button>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</div><p id="model-observation" class="note-block" role="status">Choose a feature and look at what lies beside it.</p>'+(model.source?'<a class="source-link" href="'+model.source[1]+'" target="_blank" rel="noopener noreferrer">Plan reference · '+escapeHTML(model.source[0])+' ↗</a>':'')+(key==='jerusalem'?'<div class="actions"><button class="button secondary" data-card="bethesda">The Bethesda evidence</button><button class="button secondary" data-card="caesarea">Pilate’s Caesarea findspot</button></div>':''),'museum-model');
 const canvas=$('#model-close');let points=BD_MODELS.paintClose(canvas,key);BD_VIEW.inspect(canvas,'model-'+key);
 function choose(i){selected=i;$('#model-observation').textContent=BD_MODELS.recordFeature(key,i);points=BD_MODELS.paintClose(canvas,key,selected);
/* Code by Daniel using ChatGPT November 15, 2026 */
}
 for(const b of document.querySelectorAll('[data-model-feature]'))b.addEventListener('click',function(){choose(Number(this.dataset.modelFeature));
/* Code by Daniel using ChatGPT November 15, 2026 */
});
 canvas.addEventListener('click',function(e){const r=this.getBoundingClientRect(),p=[(e.clientX-r.left)*900/r.width,(e.clientY-r.top)*590/r.height];let index=0,best=Infinity;points.forEach(function(a,i){const d=Math.hypot(a[0]-p[0],a[1]-p[1]);if(d<best){best=d;index=i;}
/* Code by Daniel using ChatGPT November 15, 2026 */
});if(best<90)choose(index);
/* Code by Daniel using ChatGPT November 15, 2026 */
});


/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_MODELS.paintAtlas=function reliefExpeditionAtlas(canvas){
 const c=canvas.getContext('2d');c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';const im=BD_ART.images['m5-land'];c.fillStyle='#243d35';c.fillRect(0,0,canvas.width,canvas.height);if(im)c.drawImage(im,10,0,canvas.width-20,canvas.height-30);BD_ATLAS.pins=[];
 for(const site of BD_SITES){const uv=BD_MODELS.siteUV[site.id],x=10+uv[0]*(canvas.width-20),y=uv[1]*(canvas.height-30),selected=site.id===BD_ATLAS.selected,visited=BD_MODELS.visited().includes(site.id);BD_ATLAS.pins.push({id:site.id,x,y});BD_MAP_MARKERS.draw(c,'lamp',BD_MAP_MARKERS.state(selected,visited),x,y,selected?23:15);if(selected){c.fillStyle='#183c31';c.fillRect(Math.max(120,Math.min(canvas.width-120,x))-80,Math.max(52,y)-39,160,24);c.fillStyle='#fff0c9';c.textAlign='center';c.font='13px Georgia';c.fillText(site.place,Math.max(120,Math.min(canvas.width-120,x)),Math.max(52,y)-22);}}
 c.fillStyle='#eadbb6';c.textAlign='left';c.font='12px Trebuchet MS';c.fillText('THE LAND BETWEEN · lights mark field visits',70,canvas.height-40);


/* Code by Daniel using ChatGPT November 16, 2026 */
};

BD_MODELS.siteUV={'tel-dan':[.408,.39],nimrud:[.705,.28],babylon:[.782,.48],thebes:[.105,.77],qumran:[.377,.49],avaris:[.145,.52],galilee:[.398,.415],bethesda:[.367,.475],caesarea:[.345,.405],delphi:[.075,.18],oxyrhynchus:[.12,.62],megiddo:[.375,.41]};
