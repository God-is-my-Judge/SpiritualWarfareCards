'use strict';
window.BD_PEOPLE={random:Math.random,visitors:[],lastKey:null,docentIndex:0,docentPose:0,docentNext:0,cyclistPose:0,cyclistNext:0,heard:false,changed:false,
 graph:{entry:['ot-3','scroll','nt-1'],'ot-1':['ot-2'],'ot-2':['ot-1','ot-3'],'ot-3':['ot-2','scroll','entry'],scroll:['ot-3','nt-1','entry','story'],'nt-1':['scroll','nt-2','entry'],'nt-2':['nt-1','nt-3'],'nt-3':['nt-2','table'],table:['nt-3'],story:['scroll']},
 identities:[{id:'rae',name:'Rae',art:'visitor-teen',adult:false},{id:'marcus',name:'Marcus',art:'visitor-adult',adult:true},{id:'lin',name:'Mrs. Lin',art:'visitor-elder',adult:true}],
 docentSpots:[[1295,820],[1145,885],[185,840]],
 spots:{
 entry:[{p:[650,675],focus:'model:land'},{p:[70,980],focus:'sea'},{p:[1450,850],focus:'court'}],
 'ot-1':[{p:[510,935],focus:'model:tel'},{p:[830,685],focus:'find:thebes'}],
 'ot-2':[{p:[2680,680],focus:'mural:dan'},{p:[2310,920],focus:'find:nimrud'}],
 'ot-3':[{p:[3260,900],focus:'books'},{p:[4020,925],focus:'find:babylon'}],
 scroll:[{p:[490,2190],focus:'model:qumran'},{p:[1055,1950],focus:'find:qumran'},{p:[1095,2200],focus:'model:masada'}],
 'nt-1':[{p:[1420,960],focus:'model:lake'},{p:[985,945],focus:'model:lake'},{p:[390,915],focus:'find:galilee'}],
 'nt-2':[{p:[1800,950],focus:'model:jerusalem'},{p:[2545,960],focus:'model:jerusalem'},{p:[2660,720],focus:'find:caesarea'}],
 'nt-3':[{p:[3840,925],focus:'mural:roads'},{p:[4400,890],focus:'find:oxyrhynchus'}],
 table:[{p:[1440,855],focus:'garden'}],
 story:[{p:[900,940],focus:'mural:story'},{p:[2500,940],focus:'mural:story'},{p:[4100,940],focus:'mural:story'},{p:[5700,940],focus:'mural:story'}]
 }};
BD_PEOPLE.group=function roomGroup(id){return id.startsWith('ot-')?'ot':id.startsWith('nt-')?'nt':id;
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_PEOPLE.count=function visitorCountForFinds(count){return count>=8?3:count>=4?2:count>=1?1:0;
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_PEOPLE.duration=function unevenDuration(min,max){return min+BD_PEOPLE.random()*(max-min);
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_PEOPLE.shuffle=function shuffledChoices(items){const copy=items.slice();for(let i=copy.length-1;i>0;i--){const j=Math.floor(BD_PEOPLE.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_PEOPLE.eligible=function usableViewingSpots(id,ignoreId){
 const group=BD_PEOPLE.group(id),r=BD_MUSEUM.rooms[group];if(!r)return [];
 const protectedPoints={entry:[[770,900],[460,720],[770,720],[1130,720],[1050,940],[770,975],[1340,770],[1480,860]],'ot-1':[[80,965]],'ot-3':[[4500,900],[4240,980],[3300,750],[4330,725]],scroll:[[115,1530],[1421,1530],[770,2170],[770,2250],[1250,1890]],'nt-1':[[100,900],[110,935],[1200,980],[1400,750]]/* Claude, 24 Nov 2026: visitors keep clear of the Scroll Room arches and where they lead */,'nt-3':[[4500,900],[3890,740]],table:[[100,900],[770,990],[1330,740]],story:[[770,900],[3200,960],[5720,960]]}[id]||[];
 const models=BD_MODELS.forRoom(group),obstacles=models.map(function(entry){return BD_MODELS.metrics(entry[1]).box;
/* Code by Daniel using ChatGPT November 15, 2026 */
});
 if(group==='table')obstacles.push([240,705,1300,942]);
 const approaches=protectedPoints.concat(models.map(function(entry){return BD_MODELS.metrics(entry[1]).approach;
/* Code by Daniel using ChatGPT November 15, 2026 */
}));
 for(const site of BD_SITES){const d=BD_MUSEUM.displays[site.id];if(d.room!==group||!game.save.finds[site.id])continue;approaches.push(BD_MUSEUM.display(site).approach);if(!['wall','mosaic','modelcontext'].includes(d.style))obstacles.push([d.x-d.w*.42,d.y-45,d.x+d.w*.42,d.y+15]);}
 return (BD_PEOPLE.spots[id]||[]).filter(function(spot){const [x,y]=spot.p;if(spot.focus.startsWith('find:')&&!game.save.finds[spot.focus.slice(5)])return false;if(x<35||x>r.width-35||y<r.floor+25||y>r.height-30)return false;if(approaches.some(function(p){return Math.hypot(x-p[0],y-p[1])<115;
/* Code by Daniel using ChatGPT November 15, 2026 */
}))return false;if(obstacles.some(function(b){return x>b[0]-32&&x<b[2]+32&&y>b[1]-32&&y<b[3]+32;
/* Code by Daniel using ChatGPT November 15, 2026 */
}))return false;
 if(group==='entry'&&Math.hypot(x-BD_PEOPLE.docentSpots[BD_PEOPLE.docentIndex][0],y-BD_PEOPLE.docentSpots[BD_PEOPLE.docentIndex][1])<95)return false;
 return !BD_PEOPLE.visitors.some(function(v){return v.id!==ignoreId&&BD_PEOPLE.group(v.room)===group&&Math.hypot(x-v.p[0],y-v.p[1])<95;
/* Code by Daniel using ChatGPT November 15, 2026 */
});
/* Code by Daniel using ChatGPT November 15, 2026 */
});


/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_PEOPLE.pickSpot=function availableSpot(id,ignoreId){const others=BD_PEOPLE.visitors.filter(function(v){return v.id!==ignoreId&&v.room===id;
/* Code by Daniel using ChatGPT November 15, 2026 */
});if(others.length>=2)return null;return BD_PEOPLE.shuffle(BD_PEOPLE.eligible(id,ignoreId))[0]||null;
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_PEOPLE.sync=function arriveWithTheCollection(now){const desired=BD_PEOPLE.count(Object.keys(game.save.finds).length);while(BD_PEOPLE.visitors.length>desired)BD_PEOPLE.visitors.pop();while(BD_PEOPLE.visitors.length<desired){const identity=BD_PEOPLE.identities[BD_PEOPLE.visitors.length],weighted=Object.entries(BD_PEOPLE.graph).flatMap(function(entry){return Array(entry[1].length).fill(entry[0]);
/* Code by Daniel using ChatGPT November 15, 2026 */
});let choice=null;for(const room of BD_PEOPLE.shuffle(weighted)){const spot=BD_PEOPLE.pickSpot(room,identity.id);if(spot){choice={room,spot};break;}}if(!choice)break;BD_PEOPLE.visitors.push({...identity,room:choice.room,p:choice.spot.p.slice(),focus:choice.spot.focus,pose:0,changedAt:now,nextPose:now+BD_PEOPLE.duration(8000,25000)});BD_PEOPLE.changed=true;}
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_PEOPLE.changeRoom=function visitorsAtRoomChange(from,to,now=performance.now()){
 if(from===to&&BD_PEOPLE.lastKey===to)return;BD_PEOPLE.sync(now);
 if(to!=='entry'&&BD_PEOPLE.random()<.5){const slots=[0,1,2].filter(function(i){return !BD_PEOPLE.visitors.some(function(v){return v.room==='entry'&&Math.hypot(v.p[0]-BD_PEOPLE.docentSpots[i][0],v.p[1]-BD_PEOPLE.docentSpots[i][1])<95;
/* Code by Daniel using ChatGPT November 15, 2026 */
});
/* Code by Daniel using ChatGPT November 15, 2026 */
});if(slots.length)BD_PEOPLE.docentIndex=slots[Math.floor(BD_PEOPLE.random()*slots.length)];}
 const events=[];
 for(const v of BD_PEOPLE.visitors){if(BD_PEOPLE.group(from||'')===BD_PEOPLE.group(to||'')&&BD_MUSEUM.room===BD_PEOPLE.group(v.room)&&BD_PEOPLE.visible(v))continue;if(now-v.changedAt<30000||BD_PEOPLE.random()>=.5)continue;const options=BD_PEOPLE.shuffle(BD_PEOPLE.graph[v.room]||[]).filter(function(next){return !(v.room===from&&next===to);
/* Code by Daniel using ChatGPT November 15, 2026 */
});for(const next of options){const spot=BD_PEOPLE.pickSpot(next,v.id);if(!spot)continue;events.push({id:v.id,from:v.room,to:next,playerFrom:from,playerTo:to});v.room=next;v.p=spot.p.slice();v.focus=spot.focus;v.changedAt=now;BD_PEOPLE.changed=true;break;}}
 BD_PEOPLE.lastKey=to;return events;

/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_PEOPLE.roomChanged=function observePlayerRoom(id){if(BD_PEOPLE.lastKey===id)return;BD_PEOPLE.changeRoom(BD_PEOPLE.lastKey,id);if(id==='entry'&&!game.save.museum.docentGreeted){game.save.museum.docentGreeted=true;persist();toast('Mara: Welcome. I’m at the Information Desk.');}
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_PEOPLE.actors=function peopleInVisibleRoom(){const room=BD_MUSEUM.room,result=[];if(room==='front')result.push({id:'cyclist',name:'The cyclist',art:'cyclist',adult:true,p:[1130,840],pose:BD_PEOPLE.cyclistPose,focus:'call'});if(room==='entry')result.push({id:'docent',name:'Mara · docent',art:'docent',adult:true,p:BD_PEOPLE.docentSpots[BD_PEOPLE.docentIndex],pose:BD_PEOPLE.docentIndex*3+BD_PEOPLE.docentPose,focus:'welcome'});for(const v of BD_PEOPLE.visitors)if(BD_PEOPLE.group(v.room)===room)result.push(v);return result;
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_PEOPLE.obstacles=function standingPeople(){const boxes=BD_PEOPLE.actors().map(function(a){return [a.p[0]-25,a.p[1]-18,a.p[0]+25,a.p[1]+18];
/* Code by Daniel using ChatGPT November 15, 2026 */
});if(BD_MUSEUM.room==='entry')boxes.push([1200,840,1390,900],[970,820,1130,870]);if(BD_MUSEUM.room==='front')boxes.push([1050,635,1240,725]);return boxes;

/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_PEOPLE.height=function personHeight(actor){return BD_ART.travelerHeight(actor.p[1])*(actor.adult?1.08:1);
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_PEOPLE.paint=function drawStandingPerson(c,actor){const atlas=BD_PEOPLE_ART[actor.art];if(!atlas)return;const frame=atlas.frames[game.save.settings.reduced?(actor.art==='docent'?BD_PEOPLE.docentIndex*3:0):actor.pose%atlas.frames.length],im=BD_ART.images[frame.key];if(!im)return;const h=BD_PEOPLE.height(actor),scale=h/atlas.height;c.save();c.translate(...actor.p);c.fillStyle='#122a203b';c.beginPath();c.ellipse(0,2*h/235,h*.13,7*h/235,0,0,Math.PI*2);c.fill();c.drawImage(im,-frame.anchor[0]*scale,-frame.anchor[1]*scale,im.width*scale,im.height*scale);c.restore();
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_PEOPLE.visible=function actorOnCamera(actor){const p=BD_MUSEUM.screen(actor.p),h=BD_PEOPLE.height(actor)*BD_MUSEUM.camera.z*(BD_MUSEUM.camera.ay||1);return p[0]>-60&&p[0]<W+60&&p[1]>0&&p[1]-h<H;

/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_PEOPLE.update=function quietIdlePeople(time){
 if(game.scene!=='museum'||game.flight||game.hallTransition||$('#panel').open||document.hidden)return;
 BD_PEOPLE.sync(time);BD_PEOPLE.roomChanged(BD_MUSEUM.key());
 if(!game.save.settings.reduced){
  if(time>=BD_PEOPLE.docentNext&&BD_MUSEUM.room==='entry'){BD_PEOPLE.docentPose=(BD_PEOPLE.docentPose+1)%3;BD_PEOPLE.docentNext=time+BD_PEOPLE.duration(8000,18000);game.dirty=true;}
  if(time>=BD_PEOPLE.cyclistNext&&BD_MUSEUM.room==='front'){BD_PEOPLE.cyclistPose=(BD_PEOPLE.cyclistPose+1)%4;BD_PEOPLE.cyclistNext=time+BD_PEOPLE.duration(3500,8500);game.dirty=true;}
  for(const v of BD_PEOPLE.visitors){if(time<v.nextPose)continue;v.pose=(v.pose+1)%4;v.nextPose=time+BD_PEOPLE.duration(8000,25000);if(BD_PEOPLE.group(v.room)===BD_MUSEUM.room){if(!BD_PEOPLE.visible(v)){const options=BD_PEOPLE.eligible(v.room,v.id).filter(function(s){return !BD_PEOPLE.visible({...v,p:s.p});
/* Code by Daniel using ChatGPT November 15, 2026 */
});const spot=BD_PEOPLE.shuffle(options)[0];if(spot){v.p=spot.p.slice();v.focus=spot.focus;BD_PEOPLE.changed=true;}}game.dirty=true;}}
 }
 if(BD_MUSEUM.room==='front'&&!BD_PEOPLE.heard&&Math.hypot(game.player.x-1130,game.player.y-840)<175){BD_PEOPLE.heard=true;toast('“No, I’m serious. They’ve got the governor’s name on a stone. …I don’t know. That’s why I’m going in.”');}
 if(BD_PEOPLE.changed){BD_PEOPLE.changed=false;makeHotspots();game.dirty=true;}

/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_PEOPLE.hotspots=function peopleMarkers(){return BD_PEOPLE.actors().map(function(a){const p=a.p,h=BD_PEOPLE.height(a),approaches=[[p[0]-95,p[1]+55],[p[0]+95,p[1]+55],[p[0],p[1]+100]],point=approaches.find(function(p){return walkable(...p);
/* Code by Daniel using ChatGPT November 15, 2026 */
})||nearestFree(p[0]-100,p[1]+40);return {id:'person-'+a.id,x:p[0],y:p[1]-h-12,label:a.id==='cyclist'?'Overhear the cyclist':a.id==='docent'?'Mara · museum docent':a.name+' has a question',icon:'…',point,action:function(){BD_PEOPLE.conversation(a);
/* Code by Daniel using ChatGPT November 15, 2026 */
}};
/* Code by Daniel using ChatGPT November 15, 2026 */
});
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_PEOPLE.speak=function speakBesideActor(actor,name,line,actions,kind,followup=''){
 openPanel(name.toUpperCase(),'<section class="scene-conversation"><h2>'+escapeHTML(name)+'</h2><p class="scene-conversation-line">'+escapeHTML(line)+'</p>'+followup+'<div class="actions">'+actions+'</div></section>',kind);
 const panel=$('#panel'),card=$('.scene-conversation');
 panel.classList.add('scene-conversation-panel');
 card.querySelector(':scope > .actions button')?.focus({preventScroll:true});
 let frame=0,until=0;
 function place(){
  const viewport=panel.getBoundingClientRect(),box=card.getBoundingClientRect(),edge=12,gap=22;
  const view=sceneRect(),[sx,sy]=BD_MUSEUM.screen([actor.p[0],actor.p[1]-BD_PEOPLE.height(actor)*.78]);
  const x=Math.max(edge,Math.min(viewport.width-edge,view.x+sx*view.scaleX-viewport.left));
  const y=Math.max(edge,Math.min(viewport.height-edge,view.y+sy*view.scaleY-viewport.top));
  const clamp=(n,hi)=>Math.max(edge,Math.min(n,hi-edge));
  let left,top;
  if(x+gap+box.width<=viewport.width-edge){left=x+gap;top=y-32;}
  else if(x-gap-box.width>=edge){left=x-gap-box.width;top=y-32;}
  else{left=x-box.width*.5;top=y-box.height-gap>=edge?y-box.height-gap:y+gap;}
  card.style.left=clamp(left,viewport.width-box.width)+'px';
  card.style.top=clamp(top,viewport.height-box.height)+'px';
 }
 function settle(now){place();frame=now<until?requestAnimationFrame(settle):0;}
 function reframe(){until=performance.now()+440;if(!frame)frame=requestAnimationFrame(settle);}
 const observer=new ResizeObserver(reframe);observer.observe(panel);observer.observe(card);
 place();reframe();
 const cleanup=game.dialogCleanup;
 game.dialogCleanup=()=>{cancelAnimationFrame(frame);observer.disconnect();panel.classList.remove('scene-conversation-panel');if(cleanup)cleanup();};
};
BD_PEOPLE.conversation=function curiousMuseumPerson(actor){
 if(actor.id==='cyclist'){BD_PEOPLE.speak(actor,'Cyclist','No, I’m serious. They’ve got the governor’s name on a stone. …I don’t know. That’s why I’m going in.','<button class="button" data-card="caesarea">Look into the governor’s stone</button><button class="button secondary" id="conversation-later">Leave him to his call</button>','cyclist');$('#conversation-later').addEventListener('click',closePanel);return;}
 const modelKey=actor.focus?.startsWith('model:')?actor.focus.slice(6):null;
 if(modelKey&&actor.id!=='docent'){const question={land:'Why do so many journeys pass through this little green strip on the Middle East map?',tel:'Could a later pit put something into an older layer?',qumran:'How did the caves and settlement relate?',masada:'Why does the height of this plateau matter?',lake:'Which towns lie near one another?',jerusalem:'Where are the pools compared with the Temple?'}[modelKey];BD_PEOPLE.speak(actor,actor.name,question,'<button class="button" id="visitor-model">Look at the model together</button><button class="button secondary" id="conversation-later">Another time</button>','museum-person','<textarea id="visitor-answer" rows="2" maxlength="400" aria-label="Your explanation about the model" placeholder="Your answer…"></textarea>');$('#visitor-model').addEventListener('click',function(){if(modelKey==='land')showAtlas();else BD_MODELS.open(modelKey);
/* Code by Daniel using ChatGPT November 15, 2026 */
});$('#conversation-later').addEventListener('click',closePanel);return;}
 const done=BD_SITES.filter(function(s){return !!game.save.finds[s.id];
/* Code by Daniel using ChatGPT November 15, 2026 */
}),focused=actor.focus?.startsWith('find:')?BD_SITES.find(function(s){return s.id===actor.focus.slice(5);
/* Code by Daniel using ChatGPT November 15, 2026 */
}):null,site=focused||done.find(function(s){return s.id==='nimrud';
/* Code by Daniel using ChatGPT November 15, 2026 */
})||done[0];
 const docent=actor.id==='docent',question=site?site.question:'How can a model help us understand where a story happened?';
 const line=docent?(site?'Someone asked me this. '+question:'I can show you the plan, the relief map, or help you begin a tour.'):question;
 const actions=(site?'<button class="button" id="visitor-compare">Compare with the evidence</button>':'')+(docent?'<button class="button secondary" data-action="museum-plan">Show the museum plan</button><button class="button secondary" data-action="family-tour">Start a family tour</button>':'')+'<button class="button secondary" id="conversation-later">Another time</button>';
 const followup=site?'<textarea id="visitor-answer" rows="2" maxlength="400" aria-label="Your explanation" placeholder="Your answer…"></textarea><div id="visitor-evidence" class="note-block" hidden><p>'+escapeHTML(site.answer)+'</p><strong>Fair to say</strong><p>'+escapeHTML(site.limit)+'</p></div>':'';
 BD_PEOPLE.speak(actor,docent?'Mara':actor.name,line,actions,'museum-person',followup);
 $('#conversation-later').addEventListener('click',closePanel);if($('#visitor-compare'))$('#visitor-compare').addEventListener('click',function(){$('#visitor-evidence').hidden=false;
/* Code by Daniel using ChatGPT November 15, 2026 */
});

/* Code by Daniel using ChatGPT November 20, 2026 */
};
BD_PEOPLE.desk=function paintDocentDesk(c){BD_MUSEUM.stand(c,1295,880,180,105);BD_SIGNS.label(c,'brass',1295,855,114,22,'MUSEUM DOCENT','',11);
/* Code by Daniel using ChatGPT November 15, 2026 */
};
