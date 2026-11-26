'use strict';
// One complete, exact-text teaching sheet; every fragment is clipped from it.
window.BD_FRAGMENTS={active:null,names:['Phrase fragments','Word fragments','Small shreds'],width:1000,height:680};
BD_FRAGMENTS.random=function seededTears(seed){let n=seed>>>0;return function nextTear(){n=(Math.imul(n,1664525)+1013904223)>>>0;return n/4294967296;
/* Code by Daniel using ChatGPT November 17, 2026 */
};
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_FRAGMENTS.state=function savedScrollPractice(){return game.save.fragments||(game.save.fragments={version:1,unlocked:1,level:1,attempts:{}});
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_FRAGMENTS.clean=function cleanScrollPractice(raw,clean){const r=raw.fragments||{},out={version:1,unlocked:Math.max(1,Math.min(3,Math.trunc(Number(r.unlocked)||1))),level:Math.max(1,Math.min(3,Math.trunc(Number(r.level)||1))),attempts:{}};for(const level of [1,2,3]){const a=r.attempts?.[level];if(!a)continue;out.attempts[level]={seed:Number.isInteger(a.seed)?a.seed>>>0:92341+level,completed:!!a.completed,order:Array.isArray(a.order)?a.order.slice(0,180).map((n,i,all)=>{return Number.isInteger(n)&&n>=0&&n<180&&all.indexOf(n)===i?n:null;
/* Code by Daniel using ChatGPT November 17, 2026 */
}):[]};}out.level=Math.min(out.level,out.unlocked);clean.fragments=out;return clean;
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_FRAGMENTS.make=function tearTheWholeSheet(level,seed){
 const random=BD_FRAGMENTS.random(seed),canvas=document.createElement('canvas');canvas.width=1000;canvas.height=680;const c=canvas.getContext('2d'),paper=BD_ART.images['field-v12-parchment'];c.fillStyle='#dbc39a';c.fillRect(0,0,1000,680);if(paper)c.drawImage(paper,0,0,1000,680);c.fillStyle='#3c2b20';c.font='48px Georgia';c.textBaseline='alphabetic';
 // Worn blank lines are decorative fibers/ink traces, never a concealed answer.
 c.save();c.globalAlpha=.15;c.lineWidth=1.2;for(const y of [29,48,635,656])for(let x=90;x<900;x+=23+random()*22){c.beginPath();c.moveTo(x,y+random()*3);c.lineTo(x+7+random()*13,y+random()*3);c.strokeStyle='#59432b';c.stroke();}c.restore();
 const pieces=[],rows=BD_IMMERSION.verse;for(let row=0;row<rows.length;row++){
  const text=rows[row],baseline=112+row*75,y=row?baseline-48:0,bottom=row===6?680:baseline+27;let cuts=[{x:0,index:0}];c.fillText(text,80,baseline);
  if(level>1){let index=0;for(const word of text.split(' ')){const start=index;if(level===3&&word.length>3){let k=2+Math.floor(random()*2);while(k<word.length){cuts.push({x:80+c.measureText(text.slice(0,start+k)).width,index:start+k});k+=2+Math.floor(random()*3);}}index+=word.length;if(index<text.length){cuts.push({x:80+c.measureText(text.slice(0,index)).width+c.measureText(' ').width*(.25+random()*.5),index:index+1});index++;}}}
  cuts.push({x:1000,index:text.length});for(let j=0;j<cuts.length-1;j++){const a=cuts[j],b=cuts[j+1],label=text.slice(a.index,b.index)+(row<6&&j===cuts.length-2?' ':'');pieces.push({id:pieces.length,row,text:label,x:a.x,y,w:b.x-a.x,h:bottom-y,seed:seed+pieces.length*7919});}
 }
 // Interior tears share the same global edge profile. Small chips stay on the seam.
 for(const p of pieces){const cv=document.createElement('canvas'),pad=7;cv.width=Math.ceil(p.w)+pad*2;cv.height=Math.ceil(p.h)+pad*2;const d=cv.getContext('2d'),path=BD_FRAGMENTS.outline(p,seed);d.translate(pad-p.x,pad-p.y);d.clip(path);d.drawImage(canvas,0,0);d.globalCompositeOperation='destination-out';const wear=BD_FRAGMENTS.random(p.seed);for(let chip=0;chip<3;chip++){const left=wear()>.5;d.beginPath();d.arc(left?p.x:p.x+p.w,p.y+12+wear()*Math.max(1,p.h-24),1+wear()*2.2,0,Math.PI*2);d.fill();}p.canvas=cv;p.path=path;}
 return {source:canvas,pieces};

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_FRAGMENTS.outline=function hideTearOutline(p,seed){const path=new Path2D(),jitter=(axis,fixed,pos)=>{return Math.sin(pos*.29+fixed*.37+seed)*2.4+Math.sin(pos*.71+fixed*.11+seed)*1.1;
/* Code by Daniel using ChatGPT November 17, 2026 */
};const edge=(a,b,axis)=>{const length=Math.hypot(b[0]-a[0],b[1]-a[1]),n=Math.max(2,Math.ceil(length/9));for(let i=1;i<=n;i++){const t=i/n,x=a[0]+(b[0]-a[0])*t,y=a[1]+(b[1]-a[1])*t,k=i===n?0:jitter(axis,axis?a[1]:a[0],axis?x:y);path.lineTo(x+(axis?0:k),y+(axis?k:0));}
/* Code by Daniel using ChatGPT November 17, 2026 */
};path.moveTo(p.x,p.y);edge([p.x,p.y],[p.x+p.w,p.y],1);edge([p.x+p.w,p.y],[p.x+p.w,p.y+p.h],0);edge([p.x+p.w,p.y+p.h],[p.x,p.y+p.h],1);edge([p.x,p.y+p.h],[p.x,p.y],0);path.closePath();return path;
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_FRAGMENTS.open=function openTornScroll(site=null,level){
 const data=BD_FRAGMENTS.state();if(level&&level<=data.unlocked)data.level=level;level=data.level;let attempt=data.attempts[level];if(!attempt)attempt=data.attempts[level]={seed:crypto.getRandomValues(new Uint32Array(1))[0],order:[],completed:false};const sheet=BD_FRAGMENTS.make(level,attempt.seed),pieces=sheet.pieces;attempt.order=Array.from({length:pieces.length},(_,i)=>{return Number.isInteger(attempt.order[i])&&attempt.order[i]<pieces.length?attempt.order[i]:null;
/* Code by Daniel using ChatGPT November 17, 2026 */
});
 const random=BD_FRAGMENTS.random(attempt.seed+137),shuffled=pieces.map(p=>{return ({p,n:random()});
/* Code by Daniel using ChatGPT November 17, 2026 */
}).sort((a,b)=>{return a.n-b.n;
/* Code by Daniel using ChatGPT November 17, 2026 */
}).map(r=>{return r.p;
/* Code by Daniel using ChatGPT November 17, 2026 */
});const ready=attempt.completed;
 const introduction='<p class="field-line">Mara: “Read the ink. Match the torn edges. Let the sentence emerge.”</p><details class="fragment-context"><summary>Great Isaiah Scroll · about 125 BC · a witness before Christ</summary><p>This passage was copied before Jesus’ life. Christians recognize his suffering here.</p></details>';
 openPanel('THE SCRIBE’S DESK · ISAIAH 53:5','<h2>Bring the words together.</h2>'+(site?introduction:'<div class="court-scribe-scene">'+BD_COURT_ART.image('scribe','court-scribe-art')+'<div>'+introduction+'</div></div>')+'<div class="fragment-levels">'+[1,2,3].map(n=>{return '<button data-fragment-level="'+n+'" '+(n>data.unlocked?'disabled':'')+' aria-pressed="'+(n===level)+'">'+n+' · '+BD_FRAGMENTS.names[n-1]+(n>data.unlocked?' · sealed':'')+'</button>';
/* Code by Daniel using ChatGPT November 17, 2026 */
}).join('')+'</div><div class="fragment-tools"><button data-fragment-zoom="-1">Zoom out</button><button data-fragment-zoom="1">Look closer</button><button data-fragment-new>New tears · restart this level</button></div><div class="fragment-workspace"><div class="fragment-scroll"><div id="fragment-board" aria-label="Rebuild the scroll from left to right, top to bottom">'+pieces.map(p=>{return '<button class="fragment-slot" data-fragment-slot="'+p.id+'" aria-label="Place fragment '+(p.id+1)+'" style="left:'+p.x/10+'%;top:'+p.y/6.8+'%;width:'+p.w/10+'%;height:'+p.h/6.8+'%"></button>';
/* Code by Daniel using ChatGPT November 17, 2026 */
}).join('')+'</div></div><p id="fragment-feedback" role="status">'+(ready?'The servant carries our rebellion. These words were here before Jesus.':'Choose a fragment, then a space; or drag it. No original is shown.')+'</p><div id="fragment-tray" aria-label="Fragments in the finds tray">'+shuffled.map(p=>{return '<button class="scroll-fragment" data-fragment="'+p.id+'" aria-label="Fragment: '+escapeHTML(p.text.trim())+'"><canvas width="'+p.canvas.width+'" height="'+p.canvas.height+'" aria-hidden="true"></canvas></button>';
/* Code by Daniel using ChatGPT November 17, 2026 */
}).join('')+'</div></div><div class="actions"><button class="button" id="fragment-check">Check the joined words →</button><button class="button" id="fragment-next" '+(ready?'':'hidden')+'>'+(level<3?'Open the next difficulty →':'Study this passage again →')+'</button><button class="button secondary" id="copy-continue" '+(ready?'':'hidden')+'>'+(site?'Continue the field study →':'Keep the field seal →')+'</button></div><details><summary>How this practice relates to the real scroll</summary><p>The Great Isaiah Scroll is on animal skin, probably sheep or goat. These English pieces are a teaching reconstruction, not a facsimile. Scholars compare Hebrew manuscripts and damaged fragments. Read Isaiah 52:13–53:12 and Acts 8:26–35 together after working.</p></details><p class="fine-print">Isaiah 53:5 · CSB · '+escapeHTML(BD_SCRIPTURE_CREDIT)+'</p>',site?'rebuild-copies':'isaiah-practice');
 const state={site,level,data,attempt,...sheet,selected:null,zoom:innerWidth<600?1.8:1,drag:null};BD_FRAGMENTS.active=state;BD_FRAGMENTS.paint();
 const abort=new AbortController(),opts={signal:abort.signal};game.dialogCleanup=function putScrollAway(){abort.abort();state.drag?.ghost?.remove();for(const p of pieces)p.canvas.width=p.canvas.height=1;sheet.source.width=sheet.source.height=1;if(BD_FRAGMENTS.active===state)BD_FRAGMENTS.active=null;persist();
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 for(const b of document.querySelectorAll('[data-fragment]'))b.addEventListener('click',()=>{return BD_FRAGMENTS.select(Number(b.dataset.fragment));
/* Code by Daniel using ChatGPT November 17, 2026 */
},opts);
 for(const b of document.querySelectorAll('[data-fragment-slot]'))b.addEventListener('click',()=>{if(state.ignoreClickUntil>performance.now())return;const slot=Number(b.dataset.fragmentSlot);if(state.selected===null&&Number.isInteger(attempt.order[slot]))BD_FRAGMENTS.select(attempt.order[slot]);else BD_FRAGMENTS.place(slot);
/* Code by Daniel using ChatGPT November 17, 2026 */
},opts);
 $('#fragment-check').addEventListener('click',BD_FRAGMENTS.check,opts);$('#copy-continue').addEventListener('click',()=>{if(!attempt.completed)return;if(site){const saved=BD_STUDY.state(site);saved.studyDone=true;saved.copiesCompared=true;persist();BD_STUDY.open(site);}else BD_ADVENTURE.finishTask('scribe','Isaiah’s servant passage was copied before Jesus. Read the accounts together.');
/* Code by Daniel using ChatGPT November 17, 2026 */
},opts);
 $('#fragment-next').addEventListener('click',()=>{return BD_FRAGMENTS.open(site,Math.min(3,level+1));
/* Code by Daniel using ChatGPT November 17, 2026 */
},opts);
 for(const b of document.querySelectorAll('[data-fragment-level]'))b.addEventListener('click',()=>{return BD_FRAGMENTS.open(site,Number(b.dataset.fragmentLevel));
/* Code by Daniel using ChatGPT November 17, 2026 */
},opts);
 for(const b of document.querySelectorAll('[data-fragment-zoom]'))b.addEventListener('click',()=>{state.zoom=Math.max(1,Math.min(3,state.zoom+Number(b.dataset.fragmentZoom)*.4));BD_FRAGMENTS.paint();
/* Code by Daniel using ChatGPT November 17, 2026 */
},opts);
 $('[data-fragment-new]').addEventListener('click',()=>{BD_FRAGMENTS.restart(site,level);
/* Code by Daniel using ChatGPT November 17, 2026 */
},opts);
 const host=$('#panel-body');host.addEventListener('pointerdown',event=>{const tile=event.target.closest('[data-fragment],[data-fragment-slot]');if(!tile)return;const id=tile.dataset.fragment!==undefined?Number(tile.dataset.fragment):attempt.order[Number(tile.dataset.fragmentSlot)];if(!Number.isInteger(id))return;state.drag={id,x:event.clientX,y:event.clientY,pointer:event.pointerId,tile,moved:false};
/* Code by Daniel using ChatGPT November 17, 2026 */
},opts);
 host.addEventListener('pointermove',event=>{const d=state.drag;if(!d||d.pointer!==event.pointerId)return;if(Math.hypot(event.clientX-d.x,event.clientY-d.y)>8){d.moved=true;event.preventDefault();BD_FRAGMENTS.select(d.id);d.tile.classList.add('fragment-lifted');if(!d.ghost){const ghost=document.createElement('canvas'),part=pieces[d.id].canvas;ghost.width=part.width;ghost.height=part.height;ghost.getContext('2d').drawImage(part,0,0);ghost.className='fragment-drag-ghost';$('#panel').append(ghost);d.ghost=ghost;}d.ghost.style.left=(event.clientX+12)+'px';d.ghost.style.top=(event.clientY+12)+'px';}
/* Code by Daniel using ChatGPT November 17, 2026 */
},opts);
 const release=event=>{const d=state.drag;if(!d||event.pointerId!==d.pointer)return;state.drag=null;d.tile.classList.remove('fragment-lifted');d.ghost?.remove();if(!d.moved)return;event.preventDefault();state.ignoreClickUntil=performance.now()+450;const slot=document.elementFromPoint(event.clientX,event.clientY)?.closest('[data-fragment-slot]');if(slot)BD_FRAGMENTS.place(Number(slot.dataset.fragmentSlot));
/* Code by Daniel using ChatGPT November 17, 2026 */
};window.addEventListener('pointerup',release,opts);window.addEventListener('pointercancel',()=>{if(state.drag){state.drag.tile.classList.remove('fragment-lifted');state.drag.ghost?.remove();}state.drag=null;
/* Code by Daniel using ChatGPT November 17, 2026 */
},opts);persist();

/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_FRAGMENTS.restart=function restartScrollPractice(site=null,level=BD_FRAGMENTS.state().level){
 delete BD_FRAGMENTS.state().attempts[level];
 return BD_FRAGMENTS.open(site,level);
};
BD_FRAGMENTS.select=function chooseScrollFragment(id){const s=BD_FRAGMENTS.active;if(!s)return;s.selected=id;for(const b of document.querySelectorAll('[data-fragment]'))b.classList.toggle('selected',Number(b.dataset.fragment)===id);$('#fragment-feedback').textContent='Choose a space on the scroll. Select a placed piece to move it again.';
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_FRAGMENTS.place=function placeScrollFragment(index){const s=BD_FRAGMENTS.active;if(!s||s.selected===null)return;const old=s.attempt.order.indexOf(s.selected);if(old>=0)s.attempt.order[old]=s.attempt.order[index];s.attempt.order[index]=s.selected;s.selected=null;s.attempt.completed=false;$('#copy-continue').hidden=true;$('#fragment-next').hidden=true;persist();BD_FRAGMENTS.paint();
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_FRAGMENTS.paint=function paintRealScrollPieces(){const s=BD_FRAGMENTS.active;if(!s)return;const board=$('#fragment-board');board.style.width=(s.zoom*100)+'%';board.style.setProperty('--fragment-pad',(board.clientWidth/1000*7)+'px');for(const p of s.pieces){const b=$('[data-fragment="'+p.id+'"]'),c=b.querySelector('canvas');c.getContext('2d').clearRect(0,0,c.width,c.height);c.getContext('2d').drawImage(p.canvas,0,0);b.hidden=s.attempt.order.includes(p.id);b.classList.toggle('selected',s.selected===p.id);const slot=$('[data-fragment-slot="'+p.id+'"]');slot.replaceChildren();const n=s.attempt.order[p.id];if(Number.isInteger(n)){const cv=document.createElement('canvas'),part=s.pieces[n];cv.width=part.canvas.width;cv.height=part.canvas.height;cv.getContext('2d').drawImage(part.canvas,0,0);slot.append(cv);slot.setAttribute('aria-label','Placed: '+part.text.trim()+'. Choose to move.');}else slot.setAttribute('aria-label','Empty space '+(p.id+1));}$('#fragment-feedback').textContent=s.attempt.completed?'The servant carries our rebellion. These words were here before Jesus.':s.attempt.order.filter(Number.isInteger).length+' / '+s.pieces.length+' fragments placed. Read the ink and the torn edges.';
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_FRAGMENTS.check=function checkTheRebuiltVerse(){const s=BD_FRAGMENTS.active;if(!s)return;const normalize=t=>{return t.replace(/\s+/g,' ').trim();
/* Code by Daniel using ChatGPT November 17, 2026 */
},text=s.attempt.order.map(n=>{return s.pieces[n]?.text??'';
/* Code by Daniel using ChatGPT November 17, 2026 */
}).join('');if(s.attempt.order.some(n=>{return !Number.isInteger(n);
/* Code by Daniel using ChatGPT November 17, 2026 */
})||normalize(text)!==normalize(BD_IMMERSION.verse.join(' '))){$('#fragment-feedback').textContent='Some words still need their neighbors. Match the ink and try another join.';return;}s.attempt.completed=true;s.data.unlocked=Math.max(s.data.unlocked,Math.min(3,s.level+1));$('#copy-continue').hidden=false;$('#fragment-next').hidden=s.level===3;for(const b of document.querySelectorAll('[data-fragment-level]'))b.disabled=Number(b.dataset.fragmentLevel)>s.data.unlocked;$('#fragment-feedback').textContent='The servant carries our rebellion. These words were copied before Jesus. Read the accounts together.';persist();chime();
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_FRAGMENTS.install=function installTornScrollPractice(){const oldClean=sanitizeSave;sanitizeSave=raw=>{return BD_FRAGMENTS.clean(raw,oldClean(raw));
/* Code by Daniel using ChatGPT November 17, 2026 */
};const oldArt=BD_RESILIENCE.prepareArt;BD_RESILIENCE.prepareArt=async names=>{const missing=await oldArt(names);BD_ART.catalog['field-v12-parchment']='field-v12-parchment';return missing;
/* Code by Daniel using ChatGPT November 17, 2026 */
};BD_IMMERSION.isaiah=BD_FRAGMENTS.open;BD_LEARNING.copies=site=>{return site?.id==='oxyrhynchus'?BD_LEARNING.witnessCopies(site):BD_FRAGMENTS.open(site);
/* Code by Daniel using ChatGPT November 17, 2026 */
};window.addEventListener('resize',()=>{if(BD_FRAGMENTS.active)BD_FRAGMENTS.paint();
/* Code by Daniel using ChatGPT November 17, 2026 */
});BD_ADVENTURE.scribe=()=>{return BD_FRAGMENTS.open(null);
/* Code by Daniel using ChatGPT November 17, 2026 */
};const oldNext=BD_FIELD.nextStep;BD_FIELD.nextStep=function fragmentContinuation(){if(BD_FRAGMENTS.active){const target=$('#copy-continue');return target&&!target.hidden?{target,label:target.textContent,complete:true}:null;}return oldNext();
/* Code by Daniel using ChatGPT November 17, 2026 */
};const oldLine=BD_FIELD.updateNext;BD_FIELD.updateNext=()=>{oldLine();if(BD_FRAGMENTS.active){const line=$('[data-field-next-line]');if(line&&!BD_FIELD.nextStep())line.textContent='Next: join the torn fragments. Read the sentence as it emerges.';}
/* Code by Daniel using ChatGPT November 17, 2026 */
};document.addEventListener('bd-art-ready',event=>{if(event.detail==='field-v12-parchment'&&BD_FRAGMENTS.active){const s=BD_FRAGMENTS.active;BD_FRAGMENTS.open(s.site,s.level);}
/* Code by Daniel using ChatGPT November 17, 2026 */
});
/* Code by Daniel using ChatGPT November 17, 2026 */
};
