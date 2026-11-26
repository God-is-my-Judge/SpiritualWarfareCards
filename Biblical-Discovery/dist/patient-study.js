'use strict';
window.BD_STUDY={active:null};

BD_STUDY.pauseSeconds=function thoughtDuration(sentence){
  return Math.max(3.5,Math.min(12,2+sentence.trim().split(/\s+/).length/3.2));
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_STUDY.cleanSaved=function cleanPatientStudy(raw){
  if(!raw||typeof raw!=='object')return null;
  const ints=function boundedIntegers(value,max){return Array.isArray(value)?[...new Set(value.filter(function valid(n){return Number.isInteger(n)&&n>=0&&n<max;
/* Code by Daniel using ChatGPT November 15, 2026 */
}))]:[];
/* Code by Daniel using ChatGPT November 15, 2026 */
};
  const pieces=Array.isArray(raw.pieces)?raw.pieces.slice(0,9).map(function piece(p,i){p=p&&typeof p==='object'?p:{};return {id:i,x:Number.isFinite(p.x)?Math.max(25,Math.min(875,p.x)):100,y:Number.isFinite(p.y)?Math.max(25,Math.min(625,p.y)):480,angle:Number.isFinite(p.angle)?p.angle%(Math.PI*2):0,placed:!!p.placed,lifted:!!p.lifted,trayScale:Number.isFinite(p.trayScale)?Math.max(.18,Math.min(.6,p.trayScale)):.45};
/* Code by Daniel using ChatGPT November 15, 2026 */
}):[];
  return {version:1,pieces,seen:Array.isArray(raw.seen)?raw.seen.filter(function key(k){return typeof k==='string'&&/^(piece|light|copy|care)-[0-9]$/.test(k);
/* Code by Daniel using ChatGPT November 15, 2026 */
}).slice(0,30):[],observations:ints(raw.observations,3),marks:ints(raw.marks,3),supports:ints(raw.supports,3),studyDone:!!raw.studyDone,tagged:!!raw.tagged,note:typeof raw.note==='string'?raw.note.slice(0,280):''};
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_STUDY.state=function studyState(site){
  const d=digState(site);
  if(!d.patient)d.patient={version:1,pieces:[],seen:[],observations:[],marks:[],supports:[],studyDone:false,tagged:false,note:''};
  return d.patient;
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_STUDY.clipCell=function clipHalfPlane(poly,a,b){
  const nx=b[0]-a[0],ny=b[1]-a[1],mid=[(a[0]+b[0])/2,(a[1]+b[1])/2],out=[];
  const signed=function signedDistance(p){return (p[0]-mid[0])*nx+(p[1]-mid[1])*ny;
/* Code by Daniel using ChatGPT November 15, 2026 */
};
  for(let i=0;i<poly.length;i++){
    const p=poly[i],q=poly[(i+1)%poly.length],dp=signed(p),dq=signed(q);
    if(dp<=0)out.push(p);
    if((dp<=0)!==(dq<=0)){const t=dp/(dp-dq);out.push([p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t]);}
  }
  return out;
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_STUDY.makePieces=function studySections(site,count){
  const im=BD_ART.images['find-'+site.art],scale=Math.min(510/im.width,325/im.height),w=im.width*scale,h=im.height*scale;
  const image={x:450-w/2,y:210-h/2,w,h},points=[];
  const shapes={5:[[.2,.22],[.77,.2],[.49,.5],[.2,.79],[.8,.78]],6:[[.18,.23],[.5,.2],[.82,.26],[.18,.73],[.5,.78],[.82,.72]],7:[[.18,.2],[.5,.16],[.82,.23],[.17,.65],[.51,.5],[.83,.67],[.5,.86]],8:[[.17,.2],[.5,.16],[.83,.22],[.18,.56],[.5,.48],[.83,.57],[.3,.84],[.7,.86]],9:[[.16,.18],[.5,.16],[.84,.2],[.17,.5],[.51,.48],[.84,.53],[.18,.83],[.5,.85],[.84,.82]]};
  const sample=document.createElement('canvas');sample.width=im.width;sample.height=im.height;const sc=sample.getContext('2d',{willReadFrequently:true});sc.drawImage(im,0,0);const pixels=sc.getImageData(0,0,im.width,im.height).data;
  for(const uv of shapes[count]){
    let u=uv[0],v=uv[1];
    for(let attempt=0;attempt<16;attempt++){const x=Math.max(0,Math.min(im.width-1,Math.floor(u*im.width))),y=Math.max(0,Math.min(im.height-1,Math.floor(v*im.height)));if(pixels[(y*im.width+x)*4+3]>100)break;u+=(.5-u)*.12;v+=(.5-v)*.12;}
    points.push([image.x+u*w,image.y+v*h]);
  }
  const result=points.map(function section(point,i){let polygon=[[image.x,image.y],[image.x+w,image.y],[image.x+w,image.y+h],[image.x,image.y+h]];for(let j=0;j<count;j++)if(j!==i)polygon=BD_STUDY.clipCell(polygon,point,points[j]);return {id:i,home:point,polygon,image};
/* Code by Daniel using ChatGPT November 15, 2026 */
});
  return result;
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_STUDY.select=function selectStudyItem(s,index){s.selected=index;s.drag=null;s.afterContinue=null;s.notice=null;s.reading=false;s.lightHold=0;s.status='';s.thought={sentence:'',key:'prepared-'+index,elapsed:0,required:1,credited:true};$('#study-thought').textContent=s.stage===3?s.care.instruction:s.config.kind==='reconstruct'?'Compare the edges; move and turn this section.':'Sweep the lamp and watch the details brighten. Record each clear detail.';$('#study-focus-label').textContent=s.stage===3?'SUPPORT BEFORE MOVING':'LOOK · HANDLE · NOTICE';$('#study-ready').hidden=s.config.kind==='reconstruct'||s.stage===3;$('#study-ready').textContent='Record this observation';BD_STUDY.refresh(s);BD_STUDY.paint(s);
/* Code by Daniel using ChatGPT November 20, 2026 */
};

BD_STUDY.canProceed=function mayProceed(s){
  return s.thought&&(s.thought.credited||game.save.settings.guidedPauses===false);
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_STUDY.thoughtVisible=function thoughtIsInView(){
  const note=$('#study-thought'),panel=$('#panel');if(!note||!panel.open)return false;
  const r=note.getBoundingClientRect(),p=panel.getBoundingClientRect(),header=$('.dialog-top').getBoundingClientRect();
  const width=Math.max(0,Math.min(r.right,p.right,innerWidth)-Math.max(r.left,p.left,0)),height=Math.max(0,Math.min(r.bottom,p.bottom,innerHeight)-Math.max(r.top,header.bottom,0));
  return r.width>0&&r.height>0&&width*height/(r.width*r.height)>=.8;
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_STUDY.refresh=function refreshStudyControls(s){
  if(s.disposed||!$('#study-ready'))return;
  const can=BD_STUDY.canProceed(s),extra=s.stage===2&&s.config.kind==='light'?!!s.lightFound?.[s.selected]:s.stage===2&&s.config.kind==='collate'?s.saved.marks.includes(s.selected):true;
  $('#study-ready').disabled=!can||!extra;
  $('#thought-progress').style.width=(s.afterContinue?Math.min(100,s.thought.elapsed/s.thought.required*100):can?100:Math.min(100,s.thought.elapsed/s.thought.required*100))+'%';
  $('.thought-track').hidden=!s.afterContinue;
  const thoughtStatus=!s.afterContinue&&s.config.kind==='reconstruct'?'Move and turn the section. Its thought appears after a join.':s.afterContinue?'':!can?'':!extra?(s.config.kind==='light'?'Sweep the lamp. A detail brightens as the light catches it.':'Mark the relevant word in the selected copy.'):'';
  if($('#thought-status').textContent!==thoughtStatus)$('#thought-status').textContent=thoughtStatus;
  const count=s.stage===2?(s.config.kind==='reconstruct'?s.saved.pieces.filter(function joined(p){return p.placed;
/* Code by Daniel using ChatGPT November 15, 2026 */
}).length:s.saved.observations.length):s.saved.supports.length+(s.saved.tagged?1:0);
  const studyStatus=s.status||(s.stage===2?(s.config.kind==='reconstruct'?count+' of '+s.config.count+' sections joined':count+' of 3 observations recorded'):count+' of 4 care steps completed');
  if($('#study-status').textContent!==studyStatus)$('#study-status').textContent=studyStatus;
  if($('#study-piece-actions'))$('#study-piece-actions').hidden=s.reading||s.config.kind!=='reconstruct'&&s.stage!==3;
  $('#study-guide').disabled=!can||s.reading;
  for(const button of document.querySelectorAll('[data-study-select]')){const i=Number(button.dataset.studySelect),done=s.stage===3?(i===3?s.saved.tagged:s.saved.supports.includes(i)):s.config.kind==='reconstruct'?s.saved.pieces[i]?.placed:s.saved.observations.includes(i);button.classList.toggle('selected',i===s.selected);button.setAttribute('aria-pressed',String(i===s.selected));button.disabled=!!done;button.textContent=(done?'✓ ':s.config.kind==='light'&&s.lightFound?.[i]?'◉ ':'')+(s.stage===3?(i===3?'Record tag':'Support '+(i+1)):s.config.kind==='reconstruct'?'Section '+(i+1):'Observation '+(i+1));}
/* Code by Daniel using ChatGPT November 20, 2026 */
};

BD_STUDY.open=function openPatientStudy(site){
  const d=digState(site),saved=BD_STUDY.state(site),config=BD_ENCOUNTERS[site.id],care=BD_CARE[config.care];
  if(config.kind==='reconstruct'&&saved.pieces.length===config.count&&saved.pieces.every(function alreadyJoined(p){return p.placed;
/* Code by Daniel using ChatGPT November 15, 2026 */
}))saved.studyDone=true;
  if(config.kind!=='reconstruct'&&saved.observations.length===3)saved.studyDone=true;
  const stage=!d.recorded?0:d.cleared.length<100?1:!saved.studyDone?2:!saved.tagged||saved.supports.length<3?3:4;
  if(stage<2){BD_STUDY.openExcavation(site,stage);return;}
  if(stage===4){BD_STUDY.openNotebook(site);return;}
  const s={site,config,care,saved,stage,selected:0,angle:-65,lightHold:0,lightFound:[0,1,2].map(function recorded(i){return saved.observations.includes(i);/* Code by Daniel using ChatGPT November 20, 2026 */}),lightDwell:[0,0,0],disposed:false,reading:true,showReference:false,status:''};
  if(config.kind==='reconstruct'){
    s.sections=BD_STUDY.makePieces(site,config.count);
    if(saved.pieces.length!==config.count)saved.pieces=s.sections.map(function loosePiece(part,i){return BD_STUDY.initialPiece(part,i,config.count);
/* Code by Daniel using ChatGPT November 15, 2026 */
});
  }
  openPanel('A FIELD STUDY · TAKE YOUR TIME','<h2>'+escapeHTML(site.artifact)+'</h2><div class="dig-steps">'+['Record','Uncover','Investigate','Preserve','Explain'].map(function step(label,i){return '<span class="'+(i<stage?'done':i===stage?'current':'')+'">'+(i<stage?'✓ ':'')+(i+1)+' · '+label+'</span>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</div><div class="patient-layout"><div><div class="patient-board"><canvas id="study-canvas" width="900" height="650" tabindex="0" aria-label="'+(stage===3?'Place supports beneath the marked teaching points, then attach the record tag.':config.kind==='reconstruct'?'Select a study section, consider its note, then drag and rotate it into place. R rotates, arrow keys move, Enter checks the join.':config.kind==='light'?'Sweep the lamp slowly. Details brighten near a useful angle and remain available to record.':'Compare the written witnesses below, then mark the relevant word.')+'"></canvas></div>'+(stage===2&&config.kind==='light'?BD_ART.slider('study-lamp','Study lamp · angle of light',-75,75,-65,'75° left','Overhead','75° right')+'<p id="lamp-feedback" class="fine-print" aria-live="polite">Watch how changing the angle changes contrast.</p>':'')+(stage===2&&config.kind==='collate'?BD_STUDY.collationHTML(s):'')+'<div class="inspection-tabs study-selects">'+Array.from({length:stage===3?4:config.kind==='reconstruct'?config.count:3},function item(_,i){return '<button data-study-select="'+i+'">'+(stage===3?(i===3?'Record tag':'Support '+(i+1)):config.kind==='reconstruct'?'Section '+(i+1):'Observation '+(i+1))+'</button>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</div><div id="study-piece-actions" class="study-actions"><button id="study-turn-left" class="button secondary small">↶ Turn left</button><button id="study-turn-right" class="button secondary small">Turn right ↷</button><button id="study-move-left" aria-label="Move selected piece left">←</button><button id="study-move-up" aria-label="Move selected piece up">↑</button><button id="study-move-down" aria-label="Move selected piece down">↓</button><button id="study-move-right" aria-label="Move selected piece right">→</button><button id="study-check" class="button small">'+(stage===3?'Check support':'Check the join')+'</button></div><p class="fine-print">'+(config.kind==='reconstruct'&&stage===2?'':'')+'</p><p id="study-status" class="fine-print" role="status"></p></div><aside class="patient-aside"><p class="eyebrow" id="study-focus-label">ONE THING WORTH KEEPING</p><div class="study-lens"><canvas id="study-lens" width="300" height="190" aria-label="Close view of your selected study section"></canvas></div><blockquote id="study-thought"></blockquote><div class="thought-track" aria-hidden="true"><span id="thought-progress"></span></div><p id="thought-status" class="fine-print" role="status"></p><button id="study-ready" class="button">Continue when ready</button><p class="fine-print" id="study-instruction">'+(stage===3?escapeHTML(care.instruction):config.kind==='reconstruct'?'Edges and orientation both matter. Select a section, turn it, and bring it to the reconstruction.':config.kind==='light'?'Sweep once across the surface. Clear details stay available to record.':'Find what changed or was left out. The sentences are original practice text, not Scripture.')+'</p><div class="study-options"><button id="study-reference">Show a reference outline</button><button id="study-guide">Guide this one step</button><button id="study-pacing">'+(game.save.settings.guidedPauses===false?'Use guided pauses':'Read at my own pace')+'</button></div><p class="fine-print">Nothing is timed against you. You can close the study and return; your completed work stays.</p></aside></div>','patient-study');
  BD_STUDY.active=s;const abort=new AbortController(),opts={signal:abort.signal};
  game.dialogCleanup=function leaveStudy(){s.disposed=true;abort.abort();$('#panel').className='';persist();if(BD_STUDY.active===s)BD_STUDY.active=null;
/* Code by Daniel using ChatGPT November 15, 2026 */
};
  for(const b of document.querySelectorAll('[data-study-select]'))b.addEventListener('click',function chooseItem(){BD_STUDY.select(s,Number(this.dataset.studySelect));
/* Code by Daniel using ChatGPT November 15, 2026 */
},opts);
  $('#study-ready').addEventListener('click',function readyForWork(){
    if(this.disabled)return;
    if(s.afterContinue){BD_LEARNING.continue(s);return;}
    if(!saved.seen.includes(s.thought.key))saved.seen.push(s.thought.key);s.thought.credited=true;persist();
    if(stage===2&&config.kind!=='reconstruct'){
      if(!saved.observations.includes(s.selected))saved.observations.push(s.selected);persist();
      BD_LEARNING.after(s,s.selected,function(){if(saved.observations.length===3){saved.studyDone=true;persist();BD_STUDY.open(site);return;}BD_STUDY.select(s,[0,1,2].find(function(i){return !saved.observations.includes(i);
/* Code by Daniel using ChatGPT November 15, 2026 */
}));
/* Code by Daniel using ChatGPT November 15, 2026 */
});return;
    }
    s.reading=false;this.hidden=true;s.status=stage===3?'Move the selected support to its marked teaching point.':'Move and turn the section. A good join needs position and orientation.';BD_STUDY.refresh(s);BD_STUDY.paint(s);$('#study-canvas').focus({preventScroll:true});
/* Code by Daniel using ChatGPT November 15, 2026 */
},opts);
  $('#study-pacing').addEventListener('click',function changePacing(){game.save.settings.guidedPauses=game.save.settings.guidedPauses===false;persist();this.textContent=game.save.settings.guidedPauses===false?'Use guided pauses':'Read at my own pace';BD_STUDY.refresh(s);
/* Code by Daniel using ChatGPT November 15, 2026 */
},opts);
  $('#study-reference').addEventListener('click',function showReference(){s.showReference=!s.showReference;this.textContent=s.showReference?'Hide the reference outline':'Show a reference outline';BD_STUDY.paint(s);
/* Code by Daniel using ChatGPT November 15, 2026 */
},opts);
  $('#study-guide').addEventListener('click',function guideOneStep(){
    if(this.disabled)return;
    if(stage===3){BD_STUDY.placeSupport(s,s.selected);return;}
    if(config.kind==='light'){s.angle=[-38,12,48][s.selected];s.lightFound[s.selected]=true;BD_STUDY.paint(s);BD_STUDY.refresh(s);return;}
    if(config.kind==='reconstruct'){const p=saved.pieces[s.selected],part=s.sections[s.selected];p.x=part.home[0];p.y=part.home[1];p.angle=0;BD_STUDY.tryJoin(s);}
/* Code by Daniel using ChatGPT November 15, 2026 */
},opts);
  const movement={'study-move-left':[-10,0],'study-move-right':[10,0],'study-move-up':[0,-10],'study-move-down':[0,10]};
  for(const [id,delta]of Object.entries(movement))$('#'+id).addEventListener('click',function moveSelected(){BD_STUDY.nudge(s,...delta);
/* Code by Daniel using ChatGPT November 15, 2026 */
},opts);
  $('#study-turn-left').addEventListener('click',function rotateLeft(){BD_STUDY.turn(s,-1);
/* Code by Daniel using ChatGPT November 15, 2026 */
},opts);$('#study-turn-right').addEventListener('click',function rotateRight(){BD_STUDY.turn(s,1);
/* Code by Daniel using ChatGPT November 15, 2026 */
},opts);$('#study-check').addEventListener('click',function checkPlacement(){if(stage===3)BD_STUDY.trySupport(s);else BD_STUDY.tryJoin(s);
/* Code by Daniel using ChatGPT November 15, 2026 */
},opts);
  const work=$('#study-canvas');
  work.addEventListener('pointerdown',function takeItem(event){
    if(config.kind!=='reconstruct'&&stage!==3)return;event.preventDefault();
    const p=BD_STUDY.point(work,event),hit=BD_STUDY.hit(s,p);if(hit===null)return;
    if(hit!==s.selected){BD_STUDY.select(s,hit);return;}
    if(s.reading)return;
    const item=stage===3?BD_STUDY.supportItem(s,hit):saved.pieces[hit];
    s.drag={id:hit,offset:[p[0]-item.x,p[1]-item.y]};work.setPointerCapture(event.pointerId);
/* Code by Daniel using ChatGPT November 15, 2026 */
},opts);
  work.addEventListener('pointermove',function moveItem(event){if(!s.drag)return;const p=BD_STUDY.point(work,event),item=stage===3?BD_STUDY.supportItem(s,s.drag.id):saved.pieces[s.drag.id];item.x=Math.max(25,Math.min(875,p[0]-s.drag.offset[0]));item.y=Math.max(25,Math.min(625,p[1]-s.drag.offset[1]));item.lifted=true;BD_STUDY.paint(s);
/* Code by Daniel using ChatGPT November 15, 2026 */
},opts);
  work.addEventListener('pointerup',function setItem(){if(!s.drag)return;s.drag=null;if(stage===3)BD_STUDY.trySupport(s);else BD_STUDY.tryJoin(s);persist();
/* Code by Daniel using ChatGPT November 15, 2026 */
},opts);
  work.addEventListener('pointercancel',function releaseItem(){s.drag=null;persist();
/* Code by Daniel using ChatGPT November 15, 2026 */
},opts);
  work.addEventListener('keydown',function keyboardWork(event){
    if(s.reading)return;const k=event.key.toLowerCase(),move={arrowleft:[-6,0],arrowright:[6,0],arrowup:[0,-6],arrowdown:[0,6]};
    if(move[k]){event.preventDefault();event.stopPropagation();BD_STUDY.nudge(s,...move[k]);}else if(k==='r'){event.preventDefault();event.stopPropagation();BD_STUDY.turn(s,event.shiftKey?-1:1);}else if(k==='enter'){event.preventDefault();event.stopPropagation();if(stage===3)BD_STUDY.trySupport(s);else BD_STUDY.tryJoin(s);}
/* Code by Daniel using ChatGPT November 15, 2026 */
},opts);
  if($('#study-lamp'))$('#study-lamp').addEventListener('input',function moveLamp(){s.angle=Number(this.value);s.lightHold=0;BD_ART.syncSlider(this,BD_ART.angleLabel(s.angle));BD_STUDY.paint(s);
/* Code by Daniel using ChatGPT November 15, 2026 */
},opts);
  for(const b of document.querySelectorAll('[data-copy-word]'))b.addEventListener('click',function compareWord(){const row=Number(this.dataset.copyRow),word=Number(this.dataset.copyWord);if(row!==s.selected)BD_STUDY.select(s,row);if(word===[1,5,5][row]){if(!saved.marks.includes(row))saved.marks.push(row);s.status=['“boad” changes a letter in “boat.”','“quiet” is absent before “shore.”','This witness retains “quiet”; compare it with the copy that omits it.'][row];persist();}else s.status='Compare that word with the reference sentence. Look again without losing any work.';BD_STUDY.refresh(s);
/* Code by Daniel using ChatGPT November 15, 2026 */
},opts);
  $('#panel').classList.add('patient-study','region-'+site.scene);if(config.kind==='light'&&stage===2)$('#panel').classList.add('light-study');
  const first=stage===3?[0,1,2,3].find(function incomplete(i){return i===3?!saved.tagged:!saved.supports.includes(i);
/* Code by Daniel using ChatGPT November 15, 2026 */
}):config.kind==='reconstruct'?saved.pieces.find(function loose(p){return !p.placed;
/* Code by Daniel using ChatGPT November 15, 2026 */
})?.id:[0,1,2].find(function unseen(i){return !saved.observations.includes(i);
/* Code by Daniel using ChatGPT November 15, 2026 */
});
  BD_STUDY.select(s,first??0);
  let last=performance.now();
  function studyFrame(now){
    if(s.disposed)return;const dt=Math.min(.05,(now-last)/1000);last=now;
    if(!document.hidden&&$('#panel').open&&game.dialogKind==='patient-study'){
      if(s.thought&&!s.thought.credited&&BD_STUDY.thoughtVisible()){s.thought.elapsed+=dt;if(s.thought.elapsed>=s.thought.required){s.thought.credited=true;if(!saved.seen.includes(s.thought.key))saved.seen.push(s.thought.key);persist();}}
      if(stage===2&&config.kind==='light'){
        for(let i=0;i<3;i++){
          if(Math.abs(s.angle-[-38,12,48][i])<=18)s.lightDwell[i]+=dt;else s.lightDwell[i]=0;
          if(s.lightDwell[i]>=.5&&!s.lightFound[i]){s.lightFound[i]=true;BD_STUDY.paint(s);}
        }
        s.lightHold=s.lightDwell[s.selected];
        const quality=BD_STUDY.lightQuality(s.angle,s.selected),found=s.lightFound.filter(Boolean).length;
        const feedback=found+' of 3 details clear · '+(s.lightFound[s.selected]?'Detail '+(s.selected+1)+' ready to record.':quality>.45?'Detail '+(s.selected+1)+' emerging — hold briefly.':'Sweep slowly; watch the highlights brighten.');
        if($('#lamp-feedback').textContent!==feedback)$('#lamp-feedback').textContent=feedback;
      }
      if(s.notice&&BD_STUDY.thoughtVisible()){s.noticeElapsed=(s.noticeElapsed||0)+dt;s.thought.elapsed=Math.min(s.thought.required,s.thought.elapsed+dt);BD_STUDY.paint(s);}
      BD_STUDY.refresh(s);
    }
    requestAnimationFrame(studyFrame);
/* Code by Daniel using ChatGPT November 15, 2026 */
}
  requestAnimationFrame(studyFrame);
/* Code by Daniel using ChatGPT November 20, 2026 */
};

BD_STUDY.point=function canvasPoint(canvas,event){const r=canvas.getBoundingClientRect();return [(event.clientX-r.left)*canvas.width/r.width,(event.clientY-r.top)*canvas.height/r.height];
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_STUDY.nudge=function moveStudyItem(s,x,y){
  if(s.reading)return;const p=s.stage===3?BD_STUDY.supportItem(s,s.selected):s.saved.pieces[s.selected];if(!p||p.placed)return;p.x=Math.max(25,Math.min(875,p.x+x));p.y=Math.max(25,Math.min(625,p.y+y));p.lifted=true;persist();BD_STUDY.paint(s);
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_STUDY.turn=function turnStudyItem(s,direction){
  if(s.reading||s.stage===3)return;const p=s.saved.pieces[s.selected];if(!p||p.placed)return;p.angle+=direction*Math.PI/4;p.lifted=true;persist();BD_STUDY.paint(s);
/* Code by Daniel using ChatGPT November 15, 2026 */
};

// Compare the joins themselves. A complete assembly may be anywhere on the worktable.
BD_STUDY.assembled=function assembledOnTable(s){
  const pieces=s.saved.pieces;
  if(pieces.length<2||pieces.some(piece=>!piece.lifted&&!piece.placed))return false;
  const direction=Math.atan2(pieces.reduce((sum,p)=>sum+Math.sin(p.angle),0),
    pieces.reduce((sum,p)=>sum+Math.cos(p.angle),0));
  const cos=Math.cos(direction),sin=Math.sin(direction);
  const offsets=pieces.map((piece,i)=>{
    const [hx,hy]=s.sections[i].home;
    return [piece.x-(hx*cos-hy*sin),piece.y-(hx*sin+hy*cos)];
  });
  const meanX=offsets.reduce((sum,p)=>sum+p[0],0)/pieces.length;
  const meanY=offsets.reduce((sum,p)=>sum+p[1],0)/pieces.length;
  return pieces.every((piece,i)=>{
    const angle=piece.angle-direction;
    return Math.cos(angle)>=Math.cos(.28)&&Math.hypot(offsets[i][0]-meanX,offsets[i][1]-meanY)<=34;
  });
};
BD_STUDY.tryJoin=function checkStudyJoin(s){
  if(s.reading)return;
  const pieces=s.saved.pieces,index=s.selected,piece=pieces[index];
  if(!piece||piece.placed)return;
  const home=s.sections[index].home;
  const groupFits=BD_STUDY.assembled(s);
  const upright=Math.cos(piece.angle)>=Math.cos(.30);
  if(!groupFits&&(!upright||Math.hypot(piece.x-home[0],piece.y-home[1])>44)){
    s.status=upright?'Follow the faint outline, or fit all the edges together anywhere on the table.':'Turn the piece until its carved lines run into the next piece.';
    BD_STUDY.refresh(s);BD_STUDY.paint(s);return;
  }
  for(const p of groupFits?pieces:[piece]){
    [p.x,p.y]=s.sections[p.id].home;
    p.angle=0;p.placed=true;p.lifted=true;
  }
  s.saved.studyDone=pieces.every(p=>p.placed);
  persist();
  BD_LEARNING.after(s,index,function continueStudy(){
    if(s.saved.studyDone){BD_STUDY.open(s.site);return;}
    BD_STUDY.select(s,pieces.find(p=>!p.placed).id);
  });
/* Code by Daniel using ChatGPT November 23, 2026 */
};

BD_STUDY.supportTargets=[[285,265],[450,350],[620,270],[740,370]];

BD_STUDY.supportItem=function supportItem(s,index){
  if(!s.supportItems)s.supportItems=[0,1,2,3].map(function looseSupport(i){return {x:120+i*210,y:545,lifted:false};
/* Code by Daniel using ChatGPT November 15, 2026 */
});
  return s.supportItems[index];
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_STUDY.trySupport=function checkSupport(s){
  if(s.reading)return;const item=BD_STUDY.supportItem(s,s.selected),target=BD_STUDY.supportTargets[s.selected];
  if(Math.hypot(item.x-target[0],item.y-target[1])<45)BD_STUDY.placeSupport(s,s.selected);else{s.status='Position the selected support beneath its matching teaching point.';BD_STUDY.refresh(s);BD_STUDY.paint(s);}
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_STUDY.placeSupport=function recordSupportedStep(s,index){if(index===3)s.saved.tagged=true;else if(!s.saved.supports.includes(index))s.saved.supports.push(index);persist();BD_LEARNING.after(s,index,function(){if(s.saved.supports.length===3&&s.saved.tagged){BD_STUDY.openNotebook(s.site);return;}const next=[0,1,2,3].find(function(i){return i===3?!s.saved.tagged:!s.saved.supports.includes(i);
/* Code by Daniel using ChatGPT November 15, 2026 */
});BD_STUDY.select(s,next);
/* Code by Daniel using ChatGPT November 15, 2026 */
});
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_STUDY.hit=function hitStudyItem(s,point){
  if(s.stage===3){for(let i=3;i>=0;i--){if(i===3?s.saved.tagged:s.saved.supports.includes(i))continue;const p=BD_STUDY.supportItem(s,i);if(Math.abs(point[0]-p.x)<75&&Math.abs(point[1]-p.y)<48)return i;}return null;}
  const ordered=[s.selected,...s.saved.pieces.map(function id(p){return p.id;
/* Code by Daniel using ChatGPT November 15, 2026 */
}).reverse().filter(function other(i){return i!==s.selected;
/* Code by Daniel using ChatGPT November 15, 2026 */
})];
  for(const i of ordered){const p=s.saved.pieces[i],part=s.sections[i];if(p.placed)continue;const scale=p.lifted?1:(p.trayScale??.45),dx=(point[0]-p.x)/scale,dy=(point[1]-p.y)/scale,cos=Math.cos(-p.angle),sin=Math.sin(-p.angle),local=[part.home[0]+dx*cos-dy*sin,part.home[1]+dx*sin+dy*cos];let inside=false;for(let a=0,b=part.polygon.length-1;a<part.polygon.length;b=a++){const u=part.polygon[a],v=part.polygon[b];if(((u[1]>local[1])!==(v[1]>local[1]))&&(local[0]<(v[0]-u[0])*(local[1]-u[1])/(v[1]-u[1])+u[0]))inside=!inside;}if(inside)return i;}
  return null;
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_STUDY.collationHTML=function writtenWitnesses(s){
  const rows=[['The','boad','waited','beside','the','quiet','shore.'],['The','boat','waited','beside','the','shore.'],['The','boat','waited','beside','the','quiet','shore.']];
  return '<div class="collation"><p class="eyebrow">A PRACTICE LINE</p><p class="reference-sentence">The boat waited beside the quiet shore.</p>'+rows.map(function witness(words,row){return '<div class="witness-row"><span>Copy '+String.fromCharCode(65+row)+'</span><div>'+words.map(function wordButton(word,index){return '<button data-copy-row="'+row+'" data-copy-word="'+index+'">'+word+'</button>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join(' ')+'</div></div>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</div>';
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_STUDY.openNotebook=function recordPlayerObservation(site){
  const saved=BD_STUDY.state(site);
  openPanel('YOUR FIELD NOTE · READY FOR THE MUSEUM','<div class="two-column"><div class="artifact-stage"><canvas id="finished-study" width="500" height="380" aria-label="Your reconstructed and supported study replica"></canvas><small>RECONSTRUCTED · SUPPORTED · RECORDED</small></div><div><p class="eyebrow">'+escapeHTML(site.place)+' · '+escapeHTML(site.date)+'</p><h2>What would you tell a friend?</h2><p class="lede">'+escapeHTML(BD_ENCOUNTERS[site.id].notes[0])+'</p><label for="field-observation" class="grazing-label">One sentence of your own <span class="fine-print">(optional)</span></label><textarea id="field-observation" rows="4" maxlength="280" placeholder="Something I noticed, a connection I can explain, or a question I still have…">'+escapeHTML(saved.note)+'</textarea><p class="fine-print">Only you can see this.</p><div class="note-block"><strong>Fair to say</strong><p>'+escapeHTML(site.limit)+'</p></div><p class="finding-ending">'+escapeHTML(site.takeaway)+'</p><div class="actions"><button class="button" id="make-replica">Place the study replica in my museum →</button><button class="button secondary" data-card="'+site.id+'">Read the evidence card</button></div></div></div>','patient-notebook');
  BD_ART.artifact($('#finished-study').getContext('2d'),site,250,180,370,290);
  $('#field-observation').addEventListener('input',function keepObservation(){saved.note=this.value.slice(0,280);persist();
/* Code by Daniel using ChatGPT November 15, 2026 */
});
  $('#make-replica').addEventListener('click',function keepReplica(){saved.note=$('#field-observation').value.slice(0,280);persist();finishDiscovery(site);
/* Code by Daniel using ChatGPT November 15, 2026 */
});
/* Code by Daniel using ChatGPT November 17, 2026 */
};

BD_STUDY.path=function polygonPath(c,polygon){c.beginPath();polygon.forEach(function vertex(p,i){if(i)c.lineTo(...p);else c.moveTo(...p);
/* Code by Daniel using ChatGPT November 15, 2026 */
});c.closePath();
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_STUDY.paintPiece=function paintStudySection(c,s,p,options={}){
  const part=s.sections[p.id],image=part.image,im=BD_ART.images['find-'+s.site.art],scale=options.scale??(p.placed||p.lifted?1:(p.trayScale??.45));
  c.save();c.translate(p.x,p.y);c.rotate(p.angle);c.scale(scale,scale);c.translate(-part.home[0],-part.home[1]);
  if(!p.placed){c.shadowColor='#07181299';c.shadowBlur=9;c.shadowOffsetY=5;}
  BD_STUDY.path(c,part.polygon);c.clip();c.drawImage(im,image.x,image.y,image.w,image.h);
  c.shadowBlur=0;c.shadowOffsetY=0;c.strokeStyle=p.id===s.selected&&!p.placed?'#e7c77caa':'#2b251c88';c.lineWidth=p.placed?.7:1.8;c.stroke();c.restore();
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_STUDY.paintSupport=function paintPaddedSupport(c,x,y,index,selected){
  c.save();c.translate(x,y);c.shadowColor='#071b1677';c.shadowBlur=9;c.shadowOffsetY=4;
  if(index===3){c.fillStyle='#e6d3a3';c.fillRect(-85,-36,170,72);c.shadowBlur=0;c.shadowOffsetY=0;c.shadowColor='transparent';c.fillStyle='#67593c';c.font='10px Trebuchet MS';c.textAlign='center';c.fillText('ARTIFACT RECORD',0,-12);c.fillText('KEEP THE RECORD WITH IT',0,6);c.fillText('Site · date · identity',0,24);}
  else{const g=c.createLinearGradient(-60,-25,60,25);g.addColorStop(0,'#e7d9b5');g.addColorStop(.5,'#cbb88a');g.addColorStop(1,'#b49b6d');c.fillStyle=g;c.beginPath();c.roundRect(-63,-26,126,52,13);c.fill();c.shadowBlur=0;c.shadowOffsetY=0;c.shadowColor='transparent';c.strokeStyle='#f7ebc348';for(let i=0;i<10;i++){c.beginPath();c.moveTo(-52+i*12,-17);c.lineTo(-47+i*12,19);c.stroke();}c.fillStyle='#756544';c.font='12px Georgia';c.textAlign='center';c.fillText(['I','II','III'][index],0,4);}
  if(selected){c.strokeStyle='#e8ce8d';c.lineWidth=1.5;c.strokeRect(index===3?-88:-68,index===3?-39:-31,index===3?176:136,index===3?78:62);}
  c.restore();
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_STUDY.paint=function paintPatientStudy(s){
  const canvas=$('#study-canvas');if(!canvas||s.disposed)return;const c=canvas.getContext('2d');
  if($('#study-lamp'))BD_ART.syncSlider($('#study-lamp'),BD_ART.angleLabel(s.angle));
  const g=c.createRadialGradient(440,230,40,450,300,620);g.addColorStop(0,'#345247');g.addColorStop(1,'#142f28');c.fillStyle=g;c.fillRect(0,0,900,650);
  for(let i=0;i<500;i++){c.fillStyle=i%2?'#e0d3a509':'#051e1710';c.fillRect((i*83.71)%900,(i*41.33)%650,2+i%4,1);}
  c.strokeStyle='#d2bb7a55';c.lineWidth=1;c.strokeRect(18,18,864,614);
  c.font='11px Trebuchet MS';c.textAlign='left';c.fillStyle='#d4c399';c.fillText(s.stage===3?'SUPPORT THE STUDY REPRODUCTION':s.config.kind==='reconstruct'?'A RECONSTRUCTION TABLE':'THE FIELD STUDY TABLE',38,43);
  if(s.stage===2&&s.config.kind==='reconstruct'){
    const image=s.sections[0].image;c.save();c.globalAlpha=s.showReference?.37:.055;c.drawImage(BD_ART.images['find-'+s.site.art],image.x,image.y,image.w,image.h);c.restore();
    c.fillStyle='#d5c18a12';c.fillRect(35,412,830,210);c.strokeStyle='#cbb77b55';c.beginPath();c.moveTo(35,412);c.lineTo(865,412);c.stroke();
    const order=s.saved.pieces.filter(function joined(p){return p.placed;
/* Code by Daniel using ChatGPT November 15, 2026 */
}).concat(s.saved.pieces.filter(function loose(p){return !p.placed&&p.id!==s.selected;
/* Code by Daniel using ChatGPT November 15, 2026 */
}));
    for(const p of order)BD_STUDY.paintPiece(c,s,p);
    const p=s.saved.pieces[s.selected];if(p&&!p.placed)BD_STUDY.paintPiece(c,s,p);
    c.fillStyle='#e5d7b4';c.font='10px Trebuchet MS';c.textAlign='center';for(let i=0;i<s.config.count;i++){const slot=(i*(s.config.count===5?2:5))%s.config.count;if(!s.saved.pieces[i].placed)c.fillText('SECTION '+(i+1),115+(slot%3)*295,484+Math.floor(slot/3)*75);}
    if(s.showReference&&p){c.save();c.setLineDash([5,6]);c.strokeStyle='#e2ca8b88';BD_STUDY.path(c,s.sections[p.id].polygon);c.stroke();c.restore();}
  }else if(s.stage===2&&s.config.kind==='light'){
    const layer=document.createElement('canvas');layer.width=900;layer.height=650;const lc=layer.getContext('2d'),quality=BD_STUDY.lightQuality(s.angle,s.selected);
    lc.save();if(!s.showReference)lc.filter='contrast('+(1+quality*.65)+')';lc.shadowColor='#040e0bb0';lc.shadowBlur=5;lc.shadowOffsetX=-Math.sin(s.angle*Math.PI/180)*18;lc.shadowOffsetY=4;BD_ART.artifact(lc,s.site,450,275,500,420);lc.restore();
    if(!s.showReference){lc.globalCompositeOperation='source-atop';const beam=lc.createLinearGradient(150+s.angle*3,50,550+s.angle*3,500);beam.addColorStop(0,'#0b201b55');beam.addColorStop(.5,'#ffe2a124');beam.addColorStop(1,'#0b201b44');lc.fillStyle=beam;lc.fillRect(0,0,900,650);}
    c.drawImage(layer,0,0);
    for(let i=0;i<3;i++){
      const q=BD_STUDY.lightQuality(s.angle,i),p=[[405,215],[480,305],[405,395]][i];
      c.save();c.globalAlpha=Math.max(.04,q*.85);c.strokeStyle=s.saved.observations.includes(i)?'#a6e0cb':'#ffe5a0';c.lineWidth=1.5+q*2;c.shadowColor='#ffe2a1';c.shadowBlur=q*18;c.beginPath();c.ellipse(p[0],p[1],53,24,0,0,Math.PI*2);c.stroke();c.font='bold 15px Georgia';c.fillStyle='#fff2cb';c.fillText(String(i+1),p[0]+65,p[1]+5);c.restore();
    }
    // A physical light cue replaces the old second, non-interactive slider drawing.
    const lampX=450+s.angle*3;c.strokeStyle='#ead39a99';c.lineWidth=2;c.beginPath();c.moveTo(lampX,73);c.lineTo(450,150);c.stroke();c.fillStyle='#f4d28a';c.beginPath();c.arc(lampX,68,11,0,Math.PI*2);c.fill();
    c.textAlign='center';c.font='11px Trebuchet MS';c.fillStyle='#e6d8b2';c.fillText('Raking light',450,604);
  }else if(s.stage===2){BD_ART.artifact(c,s.site,450,265,560,400);c.textAlign='center';c.fillStyle='#ded2ae';c.font='12px Georgia';c.fillText('A surviving document is something we can put beside another witness.',450,580);}
  else{
    c.fillStyle='#dacaa74d';c.beginPath();c.roundRect(180,74,540,350,22);c.fill();
    for(let i=0;i<4;i++){
      const done=i===3?s.saved.tagged:s.saved.supports.includes(i),target=BD_STUDY.supportTargets[i];
      if(done)BD_STUDY.paintSupport(c,...target,i,false);
      else{c.save();c.strokeStyle='#dcc88b88';c.setLineDash([6,7]);c.strokeRect(target[0]-(i===3?87:66),target[1]-(i===3?38:30),i===3?174:132,i===3?76:60);c.restore();}
    }
    BD_ART.artifact(c,s.site,450,228,470,300);
    c.fillStyle='#e4d3a617';c.fillRect(35,469,830,140);
    for(let i=0;i<4;i++){const done=i===3?s.saved.tagged:s.saved.supports.includes(i);if(done)continue;const p=BD_STUDY.supportItem(s,i);BD_STUDY.paintSupport(c,p.x,p.y,i,i===s.selected);}
    c.fillStyle='#d9c69b';c.font='11px Trebuchet MS';c.textAlign='center';c.fillText(s.care.title,450,448);
  }
  if(s.notice){const alpha=game.save.settings.reduced?.25:.2+.13*Math.sin((s.noticeElapsed||0)*2.2);c.save();c.strokeStyle='rgba(242,210,128,'+(alpha+.3)+')';c.fillStyle='rgba(242,210,128,'+alpha+')';c.lineWidth=2;const part=s.stage===2?s.sections?.[s.selected]:null;if(part){BD_STUDY.path(c,part.polygon);c.fill();c.stroke();}else{c.beginPath();c.ellipse(s.notice[0],s.notice[1],85,38,0,0,Math.PI*2);c.fill();c.stroke();}c.restore();}
  const lens=$('#study-lens');if(!lens)return;const lc=lens.getContext('2d');lc.clearRect(0,0,300,190);lc.fillStyle='#e3d8be';lc.fillRect(0,0,300,190);
  if(s.stage===2&&s.config.kind==='reconstruct'){
    const part=s.sections[s.selected],xs=part.polygon.map(function x(p){return p[0];
/* Code by Daniel using ChatGPT November 15, 2026 */
}),ys=part.polygon.map(function y(p){return p[1];
/* Code by Daniel using ChatGPT November 15, 2026 */
}),left=Math.min(...xs),top=Math.min(...ys),width=Math.max(...xs)-left,height=Math.max(...ys)-top,scale=Math.min(260/width,160/height);
    lc.save();lc.translate((300-width*scale)/2,(190-height*scale)/2);lc.scale(scale,scale);lc.translate(-left,-top);BD_STUDY.path(lc,part.polygon);lc.clip();const im=part.image;lc.drawImage(BD_ART.images['find-'+s.site.art],im.x,im.y,im.w,im.h);lc.restore();
  }else if(s.stage===3)BD_STUDY.paintSupport(lc,150,95,s.selected,false);
  else BD_ART.artifact(lc,s.site,150,95,240,157);
/* Code by Daniel using ChatGPT November 20, 2026 */
};

BD_STUDY.openExcavation=function prepareTheStudySurface(site,stage){
  const d=digState(site);let tool='brush',dragging=false,disposed=false;
  openPanel('IN THE FIELD · RECORD, THEN UNCOVER','<h2>'+escapeHTML(site.artifact)+'</h2><p class="lede">'+(stage===0?'Its location is part of what we know.':'Let a surface emerge under a careful hand.')+'</p><div class="dig-layout"><div><div class="dig-stage"><canvas id="dig-canvas" width="700" height="500" tabindex="0" aria-label="Brush the teaching surface, or use the brush-next-area control."></canvas><span class="scale-bar"></span></div><p class="fine-print">'+escapeHTML(site.place)+' · </p></div><aside><p>'+escapeHTML(stage===0?site.story:site.briefing)+'</p>'+(stage===0?'<div class="note-block"><p class="eyebrow">RECORD THE CONTEXT</p><p>'+escapeHTML(site.country)+'<br>'+site.coords[1].toFixed(3)+'° N / '+site.coords[0].toFixed(3)+'° E<br>'+escapeHTML(site.date)+'<br>Square A1</p></div><button class="button" id="record-context">Record the context →</button>':'<p class="fine-print">Use the trowel for loose sediment at the edges; change to the brush near the study surface.</p><div class="toolbox"><button data-field-tool="brush" class="selected">'+BD_ART.toolSVG('brush')+'Soft brush</button><button data-field-tool="trowel">'+BD_ART.toolSVG('trowel')+'Pointing trowel</button></div><div class="dig-meter"><span id="dig-progress" style="width:'+Math.min(100,d.cleared.length)+'%"></span></div><p id="dig-progress-label" class="fine-print">'+Math.min(100,d.cleared.length)+'% uncovered</p><div class="actions"><button class="button small" id="brush-next">Brush next area</button><button class="button secondary small" id="dig-assist">Brush with the conservator</button></div>')+'</aside></div>','patient-excavation');
  const canvas=$('#dig-canvas'),abort=new AbortController(),opts={signal:abort.signal};game.dialogCleanup=function leaveExcavation(){disposed=true;abort.abort();BD_STUDY.brushController=null;persist();
/* Code by Daniel using ChatGPT November 15, 2026 */
};
  function paint(){
    if(disposed)return;const c=canvas.getContext('2d');c.fillStyle='#655034';c.fillRect(0,0,700,500);BD_ART.artifact(c,site,350,230,480,350);
    const dust=document.createElement('canvas');dust.width=700;dust.height=500;const dc=dust.getContext('2d'),g=dc.createLinearGradient(0,0,700,500);g.addColorStop(0,'#ad8d54');g.addColorStop(1,'#745636');dc.fillStyle=g;dc.fillRect(0,0,700,500);
    for(let i=0;i<2300;i++){dc.fillStyle=['#dfbd7728','#4c391a40','#e6d09f33'][i%3];dc.beginPath();dc.ellipse((i*67.37)%700,(i*43.73)%500,1+i%4,.5+i%3,.4,0,Math.PI*2);dc.fill();}
    dc.globalCompositeOperation='destination-out';for(const n of d.cleared){dc.beginPath();dc.arc((n%14+.5)*50,(Math.floor(n/14)+.5)*50,43,0,Math.PI*2);dc.fill();}c.drawImage(dust,0,0);
    c.strokeStyle='#f0dca64d';c.setLineDash([5,8]);for(let i=1;i<4;i++){c.beginPath();c.moveTo(i*175,0);c.lineTo(i*175,500);c.stroke();}c.setLineDash([]);
    if(stage===0){c.fillStyle='#1c302866';c.fillRect(0,0,700,500);c.fillStyle='#f2e5bf';c.font='24px Georgia';c.textAlign='center';c.fillText('Before it moves, record where it lay.',350,245);}
/* Code by Daniel using ChatGPT November 15, 2026 */
}
  function clearAt(x,y,help=false){
    if(disposed||stage!==1)return;
    if(tool==='trowel'&&x>145&&x<555&&y>80&&y<390){tool='brush';toast('Near the surface, use the soft brush.');}
    const radius=help?82:tool==='trowel'?74:53;
    for(let n=0;n<140;n++)if(Math.hypot((n%14+.5)*50-x,(Math.floor(n/14)+.5)*50-y)<radius&&!d.cleared.includes(n))d.cleared.push(n);
    persist();if(d.cleared.length>=100){BD_STUDY.open(site);return;}$('#dig-progress').style.width=d.cleared.length+'%';$('#dig-progress-label').textContent=d.cleared.length+'% uncovered';paint();
/* Code by Daniel using ChatGPT November 15, 2026 */
}
  function nextArea(help){const next=Array.from({length:140},function index(_,i){return i;
/* Code by Daniel using ChatGPT November 15, 2026 */
}).filter(function covered(i){return !d.cleared.includes(i);
/* Code by Daniel using ChatGPT November 15, 2026 */
}).sort(function middle(a,b){return Math.hypot(a%14-6.5,Math.floor(a/14)-4.5)-Math.hypot(b%14-6.5,Math.floor(b/14)-4.5);
/* Code by Daniel using ChatGPT November 15, 2026 */
})[0];if(next!==undefined)clearAt((next%14+.5)*50,(Math.floor(next/14)+.5)*50,help);
/* Code by Daniel using ChatGPT November 15, 2026 */
}
  BD_STUDY.brushController=stage===1?{canvas,clear:clearAt}:null;
  if(stage===0)$('#record-context').addEventListener('click',function recordPosition(){d.recorded=true;persist();BD_STUDY.open(site);
/* Code by Daniel using ChatGPT November 15, 2026 */
},opts);
  else{
    for(const b of document.querySelectorAll('[data-field-tool]'))b.addEventListener('click',function chooseFieldTool(){tool=this.dataset.fieldTool;for(const button of document.querySelectorAll('[data-field-tool]'))button.classList.toggle('selected',button.dataset.fieldTool===tool);
/* Code by Daniel using ChatGPT November 15, 2026 */
},opts);
    $('#brush-next').addEventListener('click',function brushNext(){nextArea(false);
/* Code by Daniel using ChatGPT November 15, 2026 */
},opts);$('#dig-assist').addEventListener('click',function brushTogether(){nextArea(true);
/* Code by Daniel using ChatGPT November 15, 2026 */
},opts);
  }
  canvas.addEventListener('pointerdown',function startBrush(event){if(stage!==1)return;event.preventDefault();dragging=true;canvas.setPointerCapture(event.pointerId);clearAt(...BD_STUDY.point(canvas,event));
/* Code by Daniel using ChatGPT November 15, 2026 */
},opts);
  canvas.addEventListener('pointermove',function brushSurface(event){if(dragging)clearAt(...BD_STUDY.point(canvas,event));
/* Code by Daniel using ChatGPT November 15, 2026 */
},opts);
  canvas.addEventListener('pointerup',function liftBrush(){dragging=false;persist();
/* Code by Daniel using ChatGPT November 15, 2026 */
},opts);canvas.addEventListener('pointercancel',function cancelBrush(){dragging=false;persist();
/* Code by Daniel using ChatGPT November 15, 2026 */
},opts);paint();
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_STUDY.initialPiece=function initialTrayPlacement(part,index,count){
  const slot=(index*(count===5?2:5))%count,angle=((index%5)-2)*Math.PI/4,cos=Math.cos(angle),sin=Math.sin(angle);
  const rotated=part.polygon.map(function relativeCorner(p){const x=p[0]-part.home[0],y=p[1]-part.home[1];return [x*cos-y*sin,x*sin+y*cos];
/* Code by Daniel using ChatGPT November 15, 2026 */
});
  const xs=rotated.map(function x(p){return p[0];
/* Code by Daniel using ChatGPT November 15, 2026 */
}),ys=rotated.map(function y(p){return p[1];
/* Code by Daniel using ChatGPT November 15, 2026 */
}),left=Math.min(...xs),right=Math.max(...xs),top=Math.min(...ys),bottom=Math.max(...ys);
  const scale=Math.min(.48,230/(right-left),60/(bottom-top));
  return {id:index,x:115+(slot%3)*295-(left+right)/2*scale,y:447+Math.floor(slot/3)*75-(top+bottom)/2*scale,angle,placed:false,lifted:false,trayScale:scale};
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_STUDY.lightQuality=function visibleRakingDetail(angle,index){return Math.exp(-Math.pow((angle-[-38,12,48][index])/25,2));/* Code by Daniel using ChatGPT November 20, 2026 */};
