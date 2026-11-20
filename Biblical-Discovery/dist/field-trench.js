'use strict';
window.BD_TRENCH={active:null,arrival:'ask',eligible:new Set(['qumran','galilee','bethesda','caesarea','delphi','megiddo']),finds:['potsherd','lamp','coin','scrolljar','lid','bone'],labels:['A1','A2','A3','B1','B2','B3']};
BD_TRENCH.state=function fieldSquareRecord(site){const d=digState(site);if(!d.trench)d.trench={version:1,selected:0,broken:0,finished:false,squares:Array.from({length:6},(_,i)=>{return ({depth:Array(96).fill(0),logged:false,hit:false,brushes:0,bagged:false,generation:0,find:[0,3,4,1,2,5][i]});
/* Code by Daniel using ChatGPT November 17, 2026 */
})};return d.trench;
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_TRENCH.clean=function validTrainingSquares(raw,clean){for(const site of BD_SITES){const r=raw.digs?.[site.id]?.trench;if(!r||!clean.digs[site.id])continue;clean.digs[site.id].trench={version:1,selected:Number.isInteger(r.selected)?Math.max(0,Math.min(5,r.selected)):0,broken:Math.max(0,Math.min(999,Math.trunc(Number(r.broken)||0))),finished:!!r.finished,squares:Array.from({length:6},(_,i)=>{const q=r.squares?.[i]||{};return {depth:Array.from({length:96},(_,n)=>{return Math.max(0,Math.min(3,Math.trunc(Number(q.depth?.[n])||0)));
/* Code by Daniel using ChatGPT November 17, 2026 */
}),logged:!!q.logged,hit:!!q.hit,brushes:Math.max(0,Math.min(3,Math.trunc(Number(q.brushes)||0))),bagged:!!q.bagged,generation:Math.max(0,Math.min(999,Math.trunc(Number(q.generation)||0))),find:Number.isInteger(q.find)?Math.max(0,Math.min(5,q.find)):i};
/* Code by Daniel using ChatGPT November 17, 2026 */
})};}return clean;
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_TRENCH.box=function squareOnHillside(i){return {x:95+(i%3)*340,y:420+Math.floor(i/3)*155,w:280,h:130};
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_TRENCH.say=function miriamAtTheSquare(line){if($('#trench-message'))$('#trench-message').textContent='Miriam: “'+line+'”';
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_TRENCH.open=function openDiscoveryHillside(site){
 const data=BD_TRENCH.state(site);openPanel((site.id==='qumran'?'QUMRAN HILLSIDE · DISCOVERY REENACTMENT':site.place.toUpperCase()+' · TRAINING SQUARES'),'<div class="trench-heading"><h2>Find its place in the ground.</h2><p>Arranged teaching finds, not an untouched ancient deposit. Your expedition account waits at camp.</p></div><div class="trench-layout"><div><div class="trench-view"><canvas id="trench-canvas" width="1200" height="800" tabindex="0" aria-label="Six excavation squares. Select a square, log it, then work with the chosen tool. Arrows move the cursor; hold Space and move for a stroke."></canvas></div><button class="text-help" id="trench-closeup">Look closer</button><div class="trench-squares">'+BD_TRENCH.labels.map((n,i)=>{return '<button data-trench-square="'+i+'" aria-pressed="'+(i===data.selected)+'">'+n+(data.squares[i].bagged?' ✓':'')+'</button>';
/* Code by Daniel using ChatGPT November 17, 2026 */
}).join('')+'</div></div><aside class="trench-side"><div class="field-speech"><img src="'+BD_ART.assetURL('assets/dig-v7-face-miriam.webp')+'" alt="Miriam"><p id="trench-message" role="status"></p></div><div class="trench-tools">'+['shovel','trowel','brush'].map((tool,i)=>{return '<button data-trench-tool="'+tool+'" aria-pressed="'+(i===0)+'"><img src="'+BD_ART.assetURL('assets/field-v12-'+tool+'.webp')+'" alt="">'+(i+1)+' · '+tool+'</button>';
/* Code by Daniel using ChatGPT November 17, 2026 */
}).join('')+'</div><div class="trench-notebook" style="background-image:url(&quot;'+BD_ART.assetURL('assets/field-v12-notebook.webp')+'&quot;)"><p id="trench-record"></p></div><div class="actions"><button class="button" id="trench-log">Log this square</button><button class="button" id="trench-bag" disabled>Support, lift &amp; bag →</button><button class="button secondary" id="trench-help">One careful stroke with Miriam</button><button class="button" id="trench-camp">Skip the dig &amp; go to camp →</button></div><details><summary>Field controls &amp; context</summary><p>Mouse/touch: drag in a square. Keyboard: focus the scene, arrows, hold Space; 1/2/3 select tools. Controller: choose the scene, stick with A held, LB/RB change tools, B returns to buttons. Every square and action also has a native button.</p><p>These six composite squares teach recording and handling. Layers, placements and damage are simulated. Animal bone and coins belong to settlement contexts; jar shapes alone do not establish manuscript contents. Real scrolls go to specialist conservators, without a brush.</p></details></aside></div>','field-trench');
 const canvas=$('#trench-canvas'),box=BD_TRENCH.box(data.selected),state={site,data,canvas,tool:'shovel',cursor:[box.x+box.w/2,box.y+box.h/2],stroke:null,padArmed:false,zoom:innerWidth<600};BD_TRENCH.active=state;const abort=new AbortController(),opts={signal:abort.signal};game.dialogCleanup=()=>{abort.abort();if(BD_CONTROLLER.mode?.type==='trench')BD_CONTROLLER.endWork();if(BD_TRENCH.active===state)BD_TRENCH.active=null;persist();
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const point=event=>{const r=canvas.getBoundingClientRect();const p=[(event.clientX-r.left)/r.width*1200,(event.clientY-r.top)/r.height*800];if(state.zoom){const b=BD_TRENCH.box(data.selected);return [b.x+b.w/2+(p[0]-600)/2.7,b.y+b.h/2+(p[1]-450)/2.7];}return p;
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 canvas.addEventListener('pointerdown',event=>{event.preventDefault();canvas.focus({preventScroll:true});canvas.setPointerCapture(event.pointerId);BD_TRENCH.begin(point(event));
/* Code by Daniel using ChatGPT November 17, 2026 */
},opts);canvas.addEventListener('pointermove',event=>{if(state.stroke){event.preventDefault();BD_TRENCH.move(point(event));}
/* Code by Daniel using ChatGPT November 17, 2026 */
},opts);canvas.addEventListener('pointerup',()=>{return BD_TRENCH.end();
/* Code by Daniel using ChatGPT November 17, 2026 */
},opts);canvas.addEventListener('pointercancel',()=>{state.stroke=null;
/* Code by Daniel using ChatGPT November 17, 2026 */
},opts);
 canvas.addEventListener('keydown',event=>{if(event.key===' '){event.preventDefault();if(!event.repeat)BD_TRENCH.begin(state.cursor);return;}const directions={ArrowLeft:[-18,0],ArrowRight:[18,0],ArrowUp:[0,-18],ArrowDown:[0,18]};if(directions[event.key]){event.preventDefault();const d=directions[event.key];state.cursor=[Math.max(0,Math.min(1200,state.cursor[0]+d[0])),Math.max(0,Math.min(800,state.cursor[1]+d[1]))];if(state.stroke)BD_TRENCH.move(state.cursor);BD_TRENCH.paint();}if(['1','2','3'].includes(event.key))BD_TRENCH.tool(['shovel','trowel','brush'][Number(event.key)-1]);
/* Code by Daniel using ChatGPT November 17, 2026 */
},opts);canvas.addEventListener('keyup',event=>{if(event.key===' '){event.preventDefault();BD_TRENCH.end();}
/* Code by Daniel using ChatGPT November 17, 2026 */
},opts);canvas.addEventListener('blur',()=>{state.stroke=null;
/* Code by Daniel using ChatGPT November 17, 2026 */
},opts);
 for(const b of document.querySelectorAll('[data-trench-square]'))b.addEventListener('click',()=>{return BD_TRENCH.select(Number(b.dataset.trenchSquare));
/* Code by Daniel using ChatGPT November 17, 2026 */
},opts);for(const b of document.querySelectorAll('[data-trench-tool]'))b.addEventListener('click',()=>{return BD_TRENCH.tool(b.dataset.trenchTool);
/* Code by Daniel using ChatGPT November 17, 2026 */
},opts);
 $('#trench-closeup').addEventListener('click',()=>{state.zoom=!state.zoom;BD_TRENCH.refresh();BD_TRENCH.paint();
/* Code by Daniel using ChatGPT November 17, 2026 */
},opts);
 $('#trench-log').addEventListener('click',()=>{const q=data.squares[data.selected];q.logged=true;BD_TRENCH.say('Every find needs an address. Now lower the soil in level passes.');BD_TRENCH.refresh();persist();
/* Code by Daniel using ChatGPT November 17, 2026 */
},opts);$('#trench-help').addEventListener('click',BD_TRENCH.help,opts);$('#trench-bag').addEventListener('click',BD_TRENCH.bag,opts);$('#trench-camp').addEventListener('click',()=>{data.finished=data.finished||data.squares.filter(q=>{return q.bagged;
/* Code by Daniel using ChatGPT November 17, 2026 */
}).length>=2;closePanel();setScene('site',site);persist();
/* Code by Daniel using ChatGPT November 17, 2026 */
},opts);BD_TRENCH.refresh();BD_TRENCH.say('A square, not a rabbit burrow. Log its address before you dig.');BD_TRENCH.paint();

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_TRENCH.select=function chooseExcavationSquare(i){const s=BD_TRENCH.active;if(!s)return;s.data.selected=i;s.stroke=null;const b=BD_TRENCH.box(i);s.cursor=[b.x+b.w/2,b.y+b.h/2];BD_TRENCH.refresh();BD_TRENCH.say(s.data.squares[i].bagged?'Bagged with its record. Choose another square or head to camp.':'Keep the walls straight. Each layer has a place in the record.');BD_TRENCH.paint();persist();
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_TRENCH.tool=function chooseExcavationTool(tool){const s=BD_TRENCH.active;if(!s)return;s.tool=tool;s.stroke=null;for(const b of document.querySelectorAll('[data-trench-tool]'))b.setAttribute('aria-pressed',String(b.dataset.trenchTool===tool));BD_TRENCH.paint();
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_TRENCH.begin=function startExcavationStroke(point){const s=BD_TRENCH.active;if(!s)return;const i=Array.from({length:6},(_,n)=>{return n;
/* Code by Daniel using ChatGPT November 17, 2026 */
}).find(n=>{const b=BD_TRENCH.box(n);return point[0]>=b.x&&point[0]<=b.x+b.w&&point[1]>=b.y&&point[1]<=b.y+b.h;
/* Code by Daniel using ChatGPT November 17, 2026 */
});if(i===undefined)return;if(i!==s.data.selected)BD_TRENCH.select(i);s.cursor=point.slice();s.stroke={start:point.slice(),last:point.slice(),points:[point.slice()],at:performance.now(),lastAt:performance.now()};BD_TRENCH.paint();
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_TRENCH.move=function moveExcavationStroke(point){const s=BD_TRENCH.active;if(!s?.stroke)return;s.cursor=point.slice();const st=s.stroke;if(Math.hypot(point[0]-st.last[0],point[1]-st.last[1])>=7){st.points.push(point.slice());st.last=point.slice();}BD_TRENCH.paint();
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_TRENCH.end=function finishExcavationStroke(){const s=BD_TRENCH.active;if(!s?.stroke)return;const st=s.stroke;s.stroke=null;BD_TRENCH.apply(st.points,Math.max(1,performance.now()-st.at));
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_TRENCH.apply=function workTheSoil(points,milliseconds,assisted=false){
 const s=BD_TRENCH.active;if(!s)return;const q=s.data.squares[s.data.selected],b=BD_TRENCH.box(s.data.selected);if(q.bagged)return;if(!q.logged){BD_TRENCH.say('Log the square first; every piece needs its address.');return;}
 let distance=0;for(let n=1;n<points.length;n++)distance+=Math.hypot(points[n][0]-points[n-1][0],points[n][1]-points[n-1][1]);const center=[b.x+b.w*.5,b.y+b.h*.5],near=points.some(p=>{return Math.hypot((p[0]-center[0])*1.0,(p[1]-center[1])*1.6)<54;
/* Code by Daniel using ChatGPT November 17, 2026 */
}),tool=s.tool;
 if(tool==='brush'&&!q.hit){BD_TRENCH.say('The brush moves loose crumbs. Use a trowel for the firmer soil first.');return;}
 if(tool==='brush'&&!assisted&&(distance/Math.max(200,milliseconds)*1000>650||milliseconds<240)){BD_TRENCH.say('Easy, speedster—too hard! Slow outward strokes protect that rim.');return;}
 const start=points[0],end=points.at(-1),startRadius=Math.hypot(start[0]-center[0],(start[1]-center[1])*1.6),endRadius=Math.hypot(end[0]-center[0],(end[1]-center[1])*1.6);if(tool==='brush'&&near&&!assisted&&(distance<18||endRadius<startRadius+6)){BD_TRENCH.say('Soft sweeps outward. Bring the crumbs away from the find.');return;}
 if(tool==='shovel'&&q.hit&&near){s.damaged={kind:BD_TRENCH.kind(s,q),center,until:performance.now()+2400};s.data.broken++;q.generation++;q.find=(q.find+1)%6;q.depth=q.depth.map(n=>{return Math.min(1,n);
/* Code by Daniel using ChatGPT November 17, 2026 */
});q.hit=false;q.brushes=0;BD_TRENCH.say('That edge chipped. Record the damage; a new find still waits below.');s.damageUntil=performance.now()+1800;persist();BD_TRENCH.refresh();BD_TRENCH.paint();return;}
 const touched=new Set(),radius=tool==='shovel'?42:tool==='trowel'?26:22;for(const p of points)for(let n=0;n<96;n++){const x=b.x+(n%12+.5)/12*b.w,y=b.y+(Math.floor(n/12)+.5)/8*b.h;if(touched.has(n)||Math.hypot(x-p[0],(y-p[1])*1.5)>radius)continue;touched.add(n);if(tool==='brush'){if(q.depth[n]>=2)q.depth[n]=3;}else{const inFind=Math.hypot(x-center[0],(y-center[1])*1.6)<48;q.depth[n]=Math.min(inFind?2:3,q.depth[n]+1);}}
 const exposed=[41,42,53,54].some(n=>{return q.depth[n]>=2;
/* Code by Daniel using ChatGPT November 17, 2026 */
});if(exposed&&!q.hit){q.hit=true;BD_TRENCH.say('Good eyes—something here! Trade the shovel for your trowel and brush.');}
 else if(tool==='brush'&&near&&q.hit){q.brushes=Math.min(3,q.brushes+1);BD_TRENCH.say(q.brushes===3?'Clear around it, never pry. Support the find and keep its record.':'Softly outward. The soil moves; the find stays where it lies.');}
 else if(tool==='trowel'&&near&&q.hit)BD_TRENCH.say('Clear beside it, not under its edge. Let the brush finish.');else BD_TRENCH.say('A level pass. The spoil grows; the layer becomes easier to read.');
 persist();BD_TRENCH.refresh();BD_TRENCH.paint();

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_TRENCH.help=function oneFieldStroke(){const s=BD_TRENCH.active;if(!s)return;const q=s.data.squares[s.data.selected],b=BD_TRENCH.box(s.data.selected);if(!q.logged){$('#trench-log').click();return;}if(q.hit){BD_TRENCH.tool('brush');BD_TRENCH.apply([[b.x+b.w*.48,b.y+b.h*.5],[b.x+b.w*.7,b.y+b.h*.5]],700,true);}else{BD_TRENCH.tool('shovel');BD_TRENCH.apply([[b.x+b.w*.35,b.y+b.h*.5],[b.x+b.w*.5,b.y+b.h*.5],[b.x+b.w*.65,b.y+b.h*.5]],600,true);}
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_TRENCH.bag=function recordAndLift(){const s=BD_TRENCH.active;if(!s)return;const q=s.data.squares[s.data.selected];if(!q.logged||q.brushes<3||q.bagged)return;q.bagged=true;const names={potsherd:'A rim records a vessel’s shape. Its square keeps the context.',lamp:'A lamp brings ordinary life and its need for light into view.',coin:'A coin helps date a deposit. Keep its layer with its label.',scrolljar:'Qumran jars connect caves, storage and the discovery of ancient writing.',lid:'A jar lid preserves evidence of storage; its recorded place matters.',bone:'Animal bones preserve traces of ordinary life in settlement deposits.'};BD_TRENCH.say(names[BD_TRENCH.kind(s,q)]);chime();persist();BD_TRENCH.refresh();BD_TRENCH.paint();
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_TRENCH.kind=function findInItsContext(s,q,index=s.data.selected){let name=BD_TRENCH.finds[q.find];if(index<3&&['coin','bone'].includes(name))name='potsherd';return s.site.id!=='qumran'&&name==='scrolljar'?'potsherd':name;
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_TRENCH.refresh=function updateFieldNotebook(){const s=BD_TRENCH.active;if(!s)return;$('#trench-closeup').textContent=s.zoom?'Show all six squares':'Look closer · selected square';const q=s.data.squares[s.data.selected],count=s.data.squares.filter(q=>{return q.bagged;
/* Code by Daniel using ChatGPT November 17, 2026 */
}).length;$('#trench-record').textContent='Square '+BD_TRENCH.labels[s.data.selected]+' · '+(s.data.selected<3?'hillside / cave approach':'settlement teaching deposit')+'\n'+(q.logged?'Context logged':'Context needs its address')+'\n'+count+' finds bagged · '+s.data.broken+' damaged edges recorded';$('#trench-log').disabled=q.logged;$('#trench-bag').disabled=q.bagged||q.brushes<3;$('#trench-camp').textContent=count>=2?'Two finds recorded · continue to camp →':'Skip the dig & go to camp →';for(const button of document.querySelectorAll('[data-trench-square]')){const i=Number(button.dataset.trenchSquare);button.setAttribute('aria-pressed',String(i===s.data.selected));button.textContent=BD_TRENCH.labels[i]+(s.data.squares[i].bagged?' ✓':'');}
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_TRENCH.paint=function paintDepthAndSpoil(){
 const s=BD_TRENCH.active;if(!s)return;const c=s.canvas.getContext('2d'),bg=BD_ART.images[s.site.id==='qumran'?'field-v12-hillside':s.site.scene];c.fillStyle='#c3a77c';c.fillRect(0,0,1200,800);c.save();if(s.zoom){const b=BD_TRENCH.box(s.data.selected);c.translate(600,450);c.scale(2.7,2.7);c.translate(-b.x-b.w/2,-b.y-b.h/2);}if(bg)c.drawImage(bg,0,0,1200,800);
 for(let i=0;i<6;i++){const q=s.data.squares[i],b=BD_TRENCH.box(i),mean=q.depth.reduce((a,b)=>{return a+b;
/* Code by Daniel using ChatGPT November 17, 2026 */
},0)/96,deep=mean*13,wall=BD_ART.images['field-v12-wall'];c.fillStyle='#4c392b';c.fillRect(b.x-2,b.y-2,b.w+4,b.h+deep+8);if(wall)c.drawImage(wall,b.x,b.y+b.h,b.w,deep+7);const base=BD_ART.images['field-v12-soil-occupation'];if(base)c.drawImage(base,b.x,b.y,b.w,b.h);
  for(let layer=1;layer>=0;layer--){const cv=document.createElement('canvas');cv.width=280;cv.height=130;const d=cv.getContext('2d'),soil=BD_ART.images['field-v12-soil-'+(layer?'fill':'topsoil')];if(soil)d.drawImage(soil,0,0,280,130);d.globalCompositeOperation='destination-out';for(let n=0;n<96;n++)if(q.depth[n]>layer){d.beginPath();d.ellipse((n%12+.5)/12*280,(Math.floor(n/12)+.5)/8*130,21,14,0,0,Math.PI*2);d.fill();}c.drawImage(cv,b.x,b.y);}
  if(q.hit||q.bagged){const im=BD_ART.images['field-v12-'+BD_TRENCH.kind(s,q,i)];if(im&&!q.bagged){const h=BD_TRENCH.kind(s,q,i)==='scrolljar'?94:65,w=h/im.height*im.width;c.save();c.globalAlpha=.5+q.brushes/6;c.drawImage(im,b.x+b.w/2-w/2,b.y+b.h/2-h*.55,w,h);c.restore();}}
  c.strokeStyle=i===s.data.selected?'#f7e3a6':'#dac9a0';c.lineWidth=i===s.data.selected?3:1;c.strokeRect(b.x-4,b.y-4,b.w+8,b.h+deep+12);c.fillStyle='#4d3826';c.fillRect(b.x-7,b.y-23,39,20);c.fillStyle='#f2e6c6';c.font='15px Georgia';c.fillText(BD_TRENCH.labels[i],b.x-2,b.y-8);const pile=BD_ART.images['field-v12-spoil-'+(mean<.6?'small':mean<1.4?'medium':'large')];if(pile&&mean>.05)c.drawImage(pile,b.x+b.w-40,b.y+b.h+deep-4,92,44);
 }
 if(s.damaged&&s.damaged.until>performance.now()){const im=BD_ART.images['field-v12-'+s.damaged.kind];if(im){const [x,y]=s.damaged.center,w=90,h=70;c.save();c.beginPath();c.rect(x-55,y-45,45,h);c.clip();c.drawImage(im,x-55,y-45,w,h);c.restore();c.save();c.beginPath();c.rect(x+4,y-37,45,h);c.clip();c.drawImage(im,x-41,y-37,w,h);c.restore();}}
 const tool=BD_ART.images['field-v12-'+s.tool];if(tool){c.save();c.globalAlpha=.9;c.drawImage(tool,s.cursor[0]-18,s.cursor[1]-90,tool.width/tool.height*110,110);c.restore();}if(s.damageUntil>performance.now()){c.fillStyle='#5c312ad9';c.fillRect(240,720,720,48);c.fillStyle='#fff0cc';c.font='22px Georgia';c.fillText('Chipped edge recorded. Keep looking with finer tools.',260,751);}c.restore();

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_TRENCH.pad=function controlFieldTools(r,dt){const s=BD_TRENCH.active;if(!s)return false;if(r.b){s.stroke=null;BD_CONTROLLER.endWork();BD_CONTROLLER.focus(s.canvas);return true;}if(r.start){closePanel();return true;}if(r.lb||r.rb){const tools=['shovel','trowel','brush'],i=tools.indexOf(s.tool);BD_TRENCH.tool(tools[(i+(r.rb?1:2))%3]);}if(!s.padArmed){if(!r.aHeld)s.padArmed=true;return true;}s.cursor=[Math.max(0,Math.min(1200,s.cursor[0]+r.x*190*dt)),Math.max(0,Math.min(800,s.cursor[1]+r.y*190*dt))];if(r.aHeld&&!s.stroke)BD_TRENCH.begin(s.cursor);else if(r.aHeld)BD_TRENCH.move(s.cursor);else if(s.stroke)BD_TRENCH.end();BD_TRENCH.paint();return true;
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_TRENCH.install=function installOptionalFieldSquares(){
 const oldClean=sanitizeSave;sanitizeSave=raw=>{return BD_TRENCH.clean(raw,oldClean(raw));
/* Code by Daniel using ChatGPT November 17, 2026 */
};const oldArt=BD_RESILIENCE.prepareArt;BD_RESILIENCE.prepareArt=async names=>{const missing=await oldArt(names);for(const suffix of ['hillside','shovel','trowel','brush','potsherd','lamp','coin','scrolljar','lid','bone','spoil-small','spoil-medium','spoil-large','soil-topsoil','soil-fill','soil-occupation','wall','finds-tray','bin-purple','bin-teal','bin-ochre','bin-blue','notebook','sign-old','sign-scroll','sign-new'])BD_ART.catalog['field-v12-'+suffix]='field-v12-'+suffix;return missing;
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldArchitecture=BD_IMMERSION.architecture;BD_IMMERSION.architecture=(c,r)=>{if(r.group!=='entry')return;const signs=[['old',460,230,250],['scroll',770,205,250],['new',1135,230,255]];if(signs.some(([key])=>{return !BD_ART.images['field-v12-sign-'+key];
/* Code by Daniel using ChatGPT November 17, 2026 */
})){oldArchitecture(c,r);return;}for(const [key,x,y,w]of signs){const im=BD_ART.images['field-v12-sign-'+key];c.drawImage(im,x-w/2,y,w,w/im.width*im.height);}
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldPanel=BD_JOURNEY.panel;BD_JOURNEY.panel=function paintedFieldPanels(kind){oldPanel(kind);$('#panel').classList.toggle('trench-panel',kind==='field-trench');if(kind==='atlas')$('.route-ticket').insertAdjacentHTML('beforeend','<button class="text-help" data-trench-route="skip">Skip the dig &amp; go to camp after landing</button>');if(kind==='claim-trays'){const slip=$('#claim-slip');slip.classList.add('painted-record-slip');slip.style.backgroundImage='url("'+BD_ART.assetURL('assets/field-v12-notebook.webp')+'")';const tray=document.createElement('div');tray.className='painted-finds-tray';tray.style.backgroundImage='url("'+BD_ART.assetURL('assets/field-v12-finds-tray.webp')+'")';slip.before(tray);tray.append(slip);for(const [i,button]of Array.from(document.querySelectorAll('[data-claim-tray]')).entries()){button.classList.add('painted-stone-bin');button.style.backgroundImage='url("'+BD_ART.assetURL('assets/field-v12-bin-'+['purple','teal','ochre','blue'][i]+'.webp')+'")';}}
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldMap=BD_IMMERSION.selectMap;BD_IMMERSION.selectMap=id=>{oldMap(id);const button=$('[data-trench-route]');if(button)button.hidden=!BD_TRENCH.eligible.has(id);
/* Code by Daniel using ChatGPT November 17, 2026 */
};document.addEventListener('click',event=>{if(event.target.closest('[data-trench-route]')){event.preventDefault();event.stopImmediatePropagation();BD_TRENCH.arrival='skip';flyTo(BD_SITES.find(site=>{return site.id===BD_ATLAS.selected;
/* Code by Daniel using ChatGPT November 17, 2026 */
}));}
/* Code by Daniel using ChatGPT November 17, 2026 */
},true);
 const oldFinish=BD_FLIGHT.finish;BD_FLIGHT.finish=()=>{const site=game.flight?.site,survey=!!game.flight?.waterRoute;oldFinish();if(!site)return;const mode=BD_TRENCH.arrival;BD_TRENCH.arrival='ask';if(survey||mode==='skip'||!BD_TRENCH.eligible.has(site.id))return;openPanel('LANDED · '+site.place.toUpperCase(),'<h2>Field square or camp?</h2><p class="field-line">Miriam: “A little digging? The discovery account will still be waiting at camp.”</p><div class="actions"><button class="button" data-trench-arrive="dig">Dig the training squares →</button><button class="button secondary" data-trench-arrive="camp">Skip the dig &amp; go to camp →</button></div>','field-arrival');for(const button of document.querySelectorAll('[data-trench-arrive]'))button.addEventListener('click',()=>{if(button.dataset.trenchArrive==='dig')BD_TRENCH.open(site);else closePanel();
/* Code by Daniel using ChatGPT November 17, 2026 */
});
/* Code by Daniel using ChatGPT November 18, 2026 */
};
 const oldHotspots=makeHotspots;makeHotspots=()=>{oldHotspots();if(game.scene==='site'&&BD_TRENCH.eligible.has(game.site.id)){const spot={id:'training-square',x:880,y:700,label:'Miriam’s excavation squares',point:nearestFree(850,820),action:()=>{return BD_TRENCH.open(game.site);
/* Code by Daniel using ChatGPT November 17, 2026 */
}};game.hotspots.push(spot);$('#hotspots').insertAdjacentHTML('beforeend','<button class="hotspot" data-hotspot="training-square" aria-label="Miriam’s excavation squares"></button>');BD_IMMERSION.position();}
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldActivate=BD_CONTROLLER.activate;BD_CONTROLLER.activate=el=>{if(el?.id==='trench-canvas'){BD_CONTROLLER.mode={node:el,type:'trench'};if(BD_TRENCH.active)BD_TRENCH.active.padArmed=false;return;}oldActivate(el);
/* Code by Daniel using ChatGPT November 17, 2026 */
};const oldWork=BD_CONTROLLER.work;BD_CONTROLLER.work=(r,dt)=>{return BD_CONTROLLER.mode?.type==='trench'?BD_TRENCH.pad(r,dt):oldWork(r,dt);
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 window.addEventListener('blur',()=>{if(BD_TRENCH.active)BD_TRENCH.active.stroke=null;
/* Code by Daniel using ChatGPT November 17, 2026 */
});document.addEventListener('visibilitychange',()=>{if(document.hidden&&BD_TRENCH.active)BD_TRENCH.active.stroke=null;
/* Code by Daniel using ChatGPT November 17, 2026 */
});
 document.addEventListener('bd-art-ready',()=>{if(BD_TRENCH.active)BD_TRENCH.paint();
/* Code by Daniel using ChatGPT November 17, 2026 */
});
 // Manuscripts are already supported at the study table. Never brush a scroll or papyrus clean.
 const oldOpen=BD_STUDY.open;BD_STUDY.open=site=>{if(['qumran','oxyrhynchus'].includes(site.id)){const d=digState(site);if(d.recorded&&d.cleared.length<100){d.cleared=Array.from({length:140},(_,i)=>{return i;
/* Code by Daniel using ChatGPT November 17, 2026 */
});persist();toast('Miriam: The fragile writing goes straight onto a support. No brush.');}}oldOpen(site);
/* Code by Daniel using ChatGPT November 17, 2026 */
};

/* Code by Daniel using ChatGPT November 18, 2026 */
};
