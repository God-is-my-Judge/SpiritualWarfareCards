'use strict';
window.BD_DIG={active:null,boards:{
 'tel-dan':{width:7,height:5,par:28,depth:['3222223','2211122','2111112','2211122','3222223'],find:['0000000','0011100','0111110','0011100','0000000'],small:26,slump:false},
 nimrud:{width:7,height:5,par:30,depth:['3222111','2111111','2111111','2111111','2222222'],find:['0000000','0011110','0011110','0011110','0000000'],small:8,slump:true}
}};

BD_DIG.flat=function flatBoard(rows){return rows.join('').split('').map(Number);
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_DIG.neighbors=function adjacentCells(board,index){
 const x=index%board.width,y=Math.floor(index/board.width),out=[];
 for(const [dx,dy] of [[-1,0],[1,0],[0,-1],[0,1]])if(x+dx>=0&&x+dx<board.width&&y+dy>=0&&y+dy<board.height)out.push((y+dy)*board.width+x+dx);
 return out;
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_DIG.targets=function cellsToFree(board){
 const find=BD_DIG.flat(board.find),out=new Set();
 find.forEach(function ring(value,index){if(!value)return;const x=index%board.width,y=Math.floor(index/board.width);for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)if(x+dx>=0&&x+dx<board.width&&y+dy>=0&&y+dy<board.height)out.add((y+dy)*board.width+x+dx);
/* Code by Daniel using ChatGPT November 16, 2026 */
});
 return [...out];
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_DIG.clean=function validateSquare(raw,clean,id){
 const b=BD_DIG.boards[id];if(!b||!raw)return;
 if(Array.isArray(raw.depth)&&raw.depth.length===35){
  clean.depth=raw.depth.map(function layer(n){return Number.isInteger(n)?Math.max(0,Math.min(3,n)):3;
/* Code by Daniel using ChatGPT November 16, 2026 */
});
  clean.crumbs=Array.from({length:35},function dirt(_,i){const n=raw.crumbs?.[i];return Number.isInteger(n)?Math.max(0,Math.min(2,n)):0;
/* Code by Daniel using ChatGPT November 16, 2026 */
});
  clean.care=Number.isInteger(raw.care)?Math.max(0,Math.min(3,raw.care)):3;
  const q=raw.square||{};clean.square={version:1,done:!!q.done,replay:!!q.replay,strokes:Number.isInteger(q.strokes)?Math.max(0,Math.min(10000,q.strokes)):0,scrapes:Number.isInteger(q.scrapes)?Math.max(0,Math.min(10000,q.scrapes)):0,assisted:!!q.assisted,small:['buried','bagged','spoil','recovered'].includes(q.small)?q.small:'buried',sieve:Number.isInteger(q.sieve)?Math.max(0,Math.min(2,q.sieve)):0,toolLocked:!!q.toolLocked,first:!!q.first,history:[]};
 }
 clean.seals={clean:!!raw.seals?.clean,brisk:!!raw.seals?.brisk,inPlace:!!raw.seals?.inPlace,read:!!raw.seals?.read};
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_DIG.create=function startSquare(site,replay=false){
 const d=digState(site),b=BD_DIG.boards[site.id];
 d.depth=BD_DIG.flat(b.depth);d.crumbs=Array(35).fill(0);d.care=3;
 d.square={version:1,done:false,replay,strokes:0,scrapes:0,assisted:false,small:'buried',sieve:0,toolLocked:false,first:site.id==='tel-dan'&&!d.seals?.clean,history:[]};
 // Four legacy dust cells make one new square; keep fully cleared old regions.
 if(!replay)for(let i=0;i<35;i++){const x=i%7,y=Math.floor(i/7),cells=[y*28+x*2,y*28+x*2+1,y*28+x*2+14,y*28+x*2+15];if(cells.every(function cleared(n){return d.cleared.includes(n);
/* Code by Daniel using ChatGPT November 16, 2026 */
}))d.depth[i]=0;}
 d.seals=d.seals||{clean:false,brisk:false,inPlace:false,read:false};persist();return d;
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_DIG.model=function squareModel(site,data,board,practice=false){
 return {site,data,board,practice,find:BD_DIG.flat(board.find),targets:BD_DIG.targets(board),tool:'trowel',cursor:0,direction:[1,0],hold:null,disposed:false,steady:!!game.save.settings.steadyHands,message:'Dark soil is deep. Pull the trowel across a level strip.',speaker:'miriam',preview:null,effects:[],cleanStrokes:0,techniques:new Set(),lastInput:0};
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_DIG.path=function straightStroke(s,start,end,max=4){
 const b=s.board,x=start%b.width,y=Math.floor(start/b.width),ex=end%b.width,ey=Math.floor(end/b.width),dx=ex-x,dy=ey-y;
 const horizontal=Math.abs(dx)>=Math.abs(dy),step=horizontal?Math.sign(dx):Math.sign(dy),length=Math.min(max,1+Math.abs(horizontal?dx:dy)),out=[];
 for(let n=0;n<length;n++)out.push((y+(horizontal?0:step*n))*b.width+x+(horizontal?step*n:0));return out;
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_DIG.cracks=function visibleCracks(s){
 if(!s.board.slump||s.steady)return [];
 const out=[];s.data.depth.forEach(function edge(depth,index){for(const other of BD_DIG.neighbors(s.board,index))if(depth-s.data.depth[other]>=2)out.push([index,other]);
/* Code by Daniel using ChatGPT November 16, 2026 */
});return out;
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_DIG.outward=function brushDirection(s,start,dx,dy){
 const b=s.board,cx=(b.width-1)/2,cy=(b.height-1)/2,x=start%b.width-cx,y=Math.floor(start/b.width)-cy;return x*dx+y*dy>=0;
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_DIG.scatter=function crumbsFall(s,from,count){
 const ordered=BD_DIG.neighbors(s.board,from).sort(function lower(a,b){return s.data.depth[a]-s.data.depth[b];
/* Code by Daniel using ChatGPT November 16, 2026 */
});
 for(const i of ordered.slice(0,count))s.data.crumbs[i]=Math.min(2,s.data.crumbs[i]+1);
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_DIG.say=function shortFieldLine(s,line,speaker='miriam'){
 s.message=line;s.speaker=speaker;if(s===BD_DIG.active)BD_FIELD?.speechChanged();BD_DIG.refresh(s);
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_DIG.sound=function fieldSound(kind){
 if(!game.save.settings.sound||!game.audio)return;
 const ac=game.audio.ac,o=ac.createOscillator(),g=ac.createGain(),now=ac.currentTime;
 o.type=kind==='brush'?'triangle':'sine';o.frequency.setValueAtTime({scrape:150,ring:820,tick:470,brush:95}[kind]||160,now);o.frequency.exponentialRampToValueAtTime(55,now+.13);g.gain.setValueAtTime(Math.min(.035,game.save.settings.volume*.3),now);g.gain.exponentialRampToValueAtTime(.0001,now+.16);o.connect(g);g.connect(ac.destination);o.start(now);o.stop(now+.18);
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_DIG.apply=function applyToolStroke(s,tool,start,end=start,held=.7){
 if(s.disposed||s.data.square.done)return {ok:false,reason:'closed'};
 const d=s.data,q=d.square,b=s.board,cracks=BD_DIG.cracks(s),line=BD_DIG.path(s,start,end),before=d.depth.slice();
 let ok=false,reason='empty',message='Choose soil beside the find. Leave the clean surface alone.';
 if(tool==='trowel'&&q.toolLocked){BD_DIG.say(s,'I am keeping the trowel. The pick and brush still work.');return {ok:false,reason:'locked'};}
 q.strokes++;
 if(tool==='trowel'){
  if(line.some(function skin(i){return s.find[i]&&d.depth[i]<=1;
/* Code by Daniel using ChatGPT November 16, 2026 */
})){
   d.care=Math.max(0,d.care-1);q.scrapes++;q.toolLocked=d.care===0;BD_DIG.scatter(s,line.find(function skin(i){return s.find[i]&&d.depth[i]<=1;
/* Code by Daniel using ChatGPT November 16, 2026 */
}),3);reason='scrape';message=q.toolLocked?'Let me keep the trowel; use the careful tools.':'That rang against stone. Put the trowel down.';BD_DIG.sound('ring');
  }else{
   for(const i of line)if(d.depth[i]>0){d.depth[i]--;ok=true;if(i===b.small&&d.depth[i]===0&&q.small==='buried'){q.small='spoil';message='The rim reached the spoil; its layer is now uncertain.';}}
   if(ok&&q.small!=='spoil')message='A level pass. Watch for pale skin before your next stroke.';reason=ok?'level':'empty';if(ok)BD_DIG.sound('scrape');
  }
 }else if(tool==='pick'){
  const good=s.steady?held>=.18&&held<=1.6:held>=.41&&held<=1.02;
  if(!good){s.pickMisses=(s.pickMisses||0)+1;reason=held<.41?'early':'hard';if(reason==='hard'){BD_DIG.scatter(s,start,2);message='Too hard; crumbs scattered, but the find is safe.';}else message='A little longer; release while the ring crosses the band.';}
  else if(d.depth[start]>0){d.depth[start]--;d.crumbs[start]=1;ok=true;reason='light-tap';message='A light tap loosens the soil; brush those crumbs outward.';BD_DIG.sound('tick');if(start===b.small&&d.depth[start]===0&&q.small==='buried'){q.small='bagged';d.care=Math.min(3,d.care+1);message='Bagged in place; its layer stays with the pottery.';}}
 }else if(tool==='brush'){
  const x=start%b.width,y=Math.floor(start/b.width),ex=end%b.width,ey=Math.floor(end/b.width),vx=ex-x,vy=ey-y;
  const dx=Math.abs(vx)>=Math.abs(vy)&&vx?Math.sign(vx):0,dy=dx?0:Math.sign(vy||s.direction[1])||0;
  const direction=dx||dy?[dx,dy]:s.direction;
  if(!BD_DIG.outward(s,start,...direction)){d.crumbs[start]=Math.min(2,d.crumbs[start]+1);reason='inward';message='Toward the stone puts crumbs back; sweep toward the outside.';}
  else{
   for(let n=0;n<3;n++){const nx=x+direction[0]*n,ny=y+direction[1]*n;if(nx<0||nx>=b.width||ny<0||ny>=b.height)break;const i=ny*b.width+nx;
    if(d.crumbs[i]){d.crumbs[i]=0;ok=true;}
    if(s.site.id==='tel-dan'&&d.depth[i]>0){d.depth[i]--;ok=true;if(i===b.small&&d.depth[i]===0&&q.small==='buried'){q.small='bagged';d.care=Math.min(3,d.care+1);}}
   }
   reason=ok?'outward':'empty';if(ok){message=q.small==='bagged'&&start===b.small?'The rim is bagged in place. We keep its layer.':'Away from the find. The crumbs leave a clean edge.';BD_DIG.sound('brush');}
  }
 }
 let slump=null;
 if(reason!=='scrape'&&cracks.length){const pair=cracks.find(function stillHigh([a,z]){return d.depth[a]-d.depth[z]>=2;
/* Code by Daniel using ChatGPT November 16, 2026 */
});if(pair){d.depth[pair[0]]--;d.crumbs[pair[1]]=Math.min(2,d.crumbs[pair[1]]+1);slump=pair;message='The cracked edge slumped. Lower the high strip before making holes.';}}
 if(ok){s.cleanStrokes++;s.techniques.add(tool);}
 s.effects=game.save.settings.reduced?[]:[{index:end,kind:reason,at:performance.now()}];s.preview=null;
 q.history.push({stroke:q.strokes,tool,start,end,reason,slump});q.history=q.history.slice(-80);
 const done=s.targets.every(function free(i){return d.depth[i]===0&&d.crumbs[i]===0;
/* Code by Daniel using ChatGPT November 16, 2026 */
});
 if(done){q.done=true;s.revealAt=performance.now();if(!s.practice){d.cleared=Array.from({length:140},function cell(_,i){return i;
/* Code by Daniel using ChatGPT November 16, 2026 */
});d.seals.clean=d.seals.clean||q.scrapes===0;d.seals.brisk=d.seals.brisk||(!q.assisted&&q.strokes<=b.par);d.seals.inPlace=d.seals.inPlace||q.small==='bagged';}message='Look; the writing is free, and the stone is safe.';}
 if(s.practice&&s.cleanStrokes>=3&&s.techniques.has(s.practiceRule==='pick'?'pick':'brush')){q.done=true;message='Seat backs up; we are nearly there.';s.speaker='sam';}
 if(!s.practice)persist();BD_DIG.say(s,message,s.practice&&q.done?'sam':'miriam');const result={ok,reason,slump,done:q.done,removed:before.reduce(function count(n,v,i){return n+Math.max(0,v-d.depth[i]);
/* Code by Daniel using ChatGPT November 16, 2026 */
},0)};s.onStroke?.(result);return result;
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_DIG.guidance=function nextGoodStroke(s){
 const d=s.data,b=s.board,q=d.square;let best=null;
 if(!q.toolLocked){for(let i=0;i<d.depth.length;i++)for(const dir of [[1,0],[0,1]])for(let length=1;length<=4;length++){
  const x=i%b.width,y=Math.floor(i/b.width),end=Math.min(b.height-1,y+dir[1]*(length-1))*b.width+Math.min(b.width-1,x+dir[0]*(length-1)),line=BD_DIG.path(s,i,end);
  if(line.some(function risky(n){return s.find[n]&&d.depth[n]<=1||n===b.small&&d.depth[n]===1&&q.small==='buried';
/* Code by Daniel using ChatGPT November 16, 2026 */
}))continue;
  const gain=line.filter(function soil(n){return d.depth[n]>0;
/* Code by Daniel using ChatGPT November 16, 2026 */
}).length;if(!gain)continue;
  const projected=d.depth.map(function next(v,n){return line.includes(n)?Math.max(0,v-1):v;
/* Code by Daniel using ChatGPT November 16, 2026 */
});let cliffs=0;
  if(b.slump&&!s.steady)for(let n=0;n<projected.length;n++)for(const z of BD_DIG.neighbors(b,n))if(projected[n]-projected[z]>=2)cliffs++;
  const score=gain*4+Math.max(...line.map(function height(n){return d.depth[n];
/* Code by Daniel using ChatGPT November 16, 2026 */
}))-cliffs*4;
  if(score>(best?.score??-Infinity))best={tool:'trowel',start:i,end,gain,score};
 }}
 if(best)return best;
 if(s.site.id!=='tel-dan'){const i=s.targets.find(function skin(n){return d.depth[n]>0;
/* Code by Daniel using ChatGPT November 16, 2026 */
});if(i!==undefined)return {tool:'pick',start:i,end:i,held:.7};}
 for(let i=0;i<d.depth.length;i++)for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){
  if(!BD_DIG.outward(s,i,dx,dy))continue;let gain=0;for(let n=0;n<3;n++){const x=i%b.width+dx*n,y=Math.floor(i/b.width)+dy*n;if(x<0||x>=b.width||y<0||y>=b.height)break;const z=y*b.width+x;gain+=Number(!!d.crumbs[z])+Number(!!(s.site.id==='tel-dan'&&d.depth[z]));}
  if(gain>(best?.gain||0))best={tool:'brush',start:i,end:Math.max(0,Math.min(b.height-1,Math.floor(i/b.width)+dy*2))*b.width+Math.max(0,Math.min(b.width-1,i%b.width+dx*2)),direction:[dx,dy],gain};
 }
 return best;
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_DIG.help=function showNextStroke(s){
 s.data.square.assisted=true;s.preview=BD_DIG.guidance(s);if(s.preview){s.tool=s.preview.tool;s.cursor=s.preview.start;if(s.preview.direction)s.direction=s.preview.direction;BD_DIG.say(s,s.tool==='pick'?'Hold the pick. Release when the ring reaches the pale band.':s.tool==='brush'?'Follow the arrow outward. Keep the brush moving away from the stone.':'Pull along this level strip. Stop before the pale skin.');}if(!s.practice)persist();BD_DIG.paint(s);
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_DIG.point=function cellAtPointer(s,event){
 const r=s.canvas.getBoundingClientRect(),x=(event.clientX-r.left)*s.canvas.width/r.width,y=(event.clientY-r.top)*s.canvas.height/r.height;
 const cx=Math.floor((x-70)/100),cy=Math.floor((y-70)/100);return cx<0||cy<0||cx>=s.board.width||cy>=s.board.height?null:cy*s.board.width+cx;
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_DIG.begin=function beginGesture(s,index){if(index===null||s.data.square.done)return;s.activityAt=performance.now();s.idleHint=null;s.cursor=index;s.preview=null;s.hold={start:index,end:index,at:performance.now()};BD_DIG.paint(s);
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_DIG.move=function moveGesture(s,index){if(index===null)return;s.cursor=index;if(s.hold)s.hold.end=index;BD_DIG.paint(s);
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_DIG.release=function commitGesture(s){if(!s.hold)return;const h=s.hold;s.hold=null;BD_DIG.apply(s,s.tool,h.start,h.end,(performance.now()-h.at)/1000);
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_DIG.cancel=function cancelGesture(s){if(!s)return;s.hold=null;s.preview=null;BD_DIG.paint(s);
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_DIG.shift=function moveCellCursor(s,dx,dy){
 const b=s.board,x=s.cursor%b.width,y=Math.floor(s.cursor/b.width);s.direction=[dx,dy];BD_DIG.move(s,Math.max(0,Math.min(b.height-1,y+dy))*b.width+Math.max(0,Math.min(b.width-1,x+dx)));
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_DIG.choose=function chooseDigTool(s,tool){if(tool==='trowel'&&s.data.square.toolLocked)return;if(tool==='pick'&&s.data.square.first)return;BD_DIG.cancel(s);s.tool=tool;BD_DIG.say(s,tool==='trowel'?'Pull a level strip. Pale skin means stop.':tool==='pick'?'Hold, then release inside the pale band for a light tap.':'Flick away from the find, toward the edge of the square.');
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_DIG.controls=function attachDigControls(s,canvas){
 s.canvas=canvas;const abort=new AbortController(),opts={signal:abort.signal};s.abort=abort;
 canvas.addEventListener('pointerdown',function down(e){s.pointerStart=[e.clientX,e.clientY];if(e.button!==0)return;e.preventDefault();canvas.focus({preventScroll:true});const i=BD_DIG.point(s,e);if(i===null)return;BD_DIG.begin(s,i);canvas.setPointerCapture(e.pointerId);
/* Code by Daniel using ChatGPT November 16, 2026 */
},opts);
 canvas.addEventListener('pointermove',function move(e){if(s.hold&&s.pointerStart){const dx=e.clientX-s.pointerStart[0],dy=e.clientY-s.pointerStart[1];if(Math.hypot(dx,dy)>8)s.direction=Math.abs(dx)>=Math.abs(dy)?[Math.sign(dx),0]:[0,Math.sign(dy)];}BD_DIG.move(s,BD_DIG.point(s,e));
/* Code by Daniel using ChatGPT November 16, 2026 */
},opts);
 canvas.addEventListener('pointerup',function up(){BD_DIG.release(s);
/* Code by Daniel using ChatGPT November 16, 2026 */
},opts);
 canvas.addEventListener('pointercancel',function cancel(){BD_DIG.cancel(s);
/* Code by Daniel using ChatGPT November 16, 2026 */
},opts);
 canvas.addEventListener('lostpointercapture',function lost(){BD_DIG.cancel(s);
/* Code by Daniel using ChatGPT November 16, 2026 */
},opts);
 canvas.addEventListener('keydown',function key(e){const k=e.key.toLowerCase(),directions={arrowleft:[-1,0],arrowright:[1,0],arrowup:[0,-1],arrowdown:[0,1]};if(directions[k]){e.preventDefault();e.stopPropagation();BD_DIG.shift(s,...directions[k]);}else if(['1','2','3'].includes(k)){e.preventDefault();BD_DIG.choose(s,['trowel','pick','brush'][Number(k)-1]);}else if(k===' '){e.preventDefault();e.stopPropagation();if(!e.repeat)BD_DIG.begin(s,s.cursor);}else if(k==='escape'){e.preventDefault();e.stopPropagation();BD_DIG.cancel(s);closePanel();}
/* Code by Daniel using ChatGPT November 16, 2026 */
},opts);
 canvas.addEventListener('keyup',function key(e){if(e.key===' '){e.preventDefault();e.stopPropagation();BD_DIG.release(s);}
/* Code by Daniel using ChatGPT November 16, 2026 */
},opts);
 canvas.addEventListener('blur',function blur(){BD_DIG.cancel(s);
/* Code by Daniel using ChatGPT November 16, 2026 */
},opts);
 for(const button of s.root.querySelectorAll('[data-dig-tool]'))button.addEventListener('click',function tool(){BD_DIG.choose(s,this.dataset.digTool);
/* Code by Daniel using ChatGPT November 16, 2026 */
},opts);
 s.root.querySelector('[data-dig-help]')?.addEventListener('click',function help(){BD_DIG.help(s);
/* Code by Daniel using ChatGPT November 16, 2026 */
},opts);
 s.root.querySelector('[data-dig-sieve]')?.addEventListener('click',function sieve(){const q=s.data.square;if(q.small!=='spoil')return;q.sieve++;q.strokes++;if(q.sieve>=2){q.small='recovered';BD_DIG.say(s,'Recovered from spoil; its original layer can no longer be certain.');}else BD_DIG.say(s,'One more sieve pass; keep the loose material together.');if(!s.practice)persist();BD_DIG.refresh(s);
/* Code by Daniel using ChatGPT November 16, 2026 */
},opts);
 const loop=function animate(){if(s.disposed)return;if(s.hold||s.effects.length||s.revealAt||!game.save.settings.reduced&&performance.now()-(s.activityAt||s.idleStart||0)>4000)BD_DIG.paint(s);s.raf=requestAnimationFrame(loop);
/* Code by Daniel using ChatGPT November 17, 2026 */
};s.raf=requestAnimationFrame(loop);BD_DIG.refresh(s);BD_DIG.paint(s);
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_DIG.pad=function digGamepad(s,r,time){
 if(s.disposed)return false;
 if(s.data.square.done&&!s.practice&&!r.aHeld){BD_CONTROLLER.endWork();BD_FIELD.updateNext();const next=$('#panel [data-field="next"]');BD_CONTROLLER.focus(next&&!next.hidden?next:s.root.querySelector('[data-dig-continue]'));return true;}
 if(r.start){BD_DIG.cancel(s);BD_CONTROLLER.endWork();if($('#panel').open)closePanel();return true;}
 if(r.b){BD_DIG.cancel(s);BD_CONTROLLER.endWork();BD_CONTROLLER.focus(s.canvas);return true;}
 if(!s.padArmed){if(!r.aHeld)s.padArmed=true;return true;}
 if(r.lb||r.rb){const tools=s.data.square.first?['trowel','brush']:['trowel','pick','brush'],index=tools.indexOf(s.tool);BD_DIG.choose(s,tools[(index+(r.rb?1:-1)+tools.length)%tools.length]);}
 if((Math.abs(r.x)>.5||Math.abs(r.y)>.5)&&time-s.lastInput>170){BD_DIG.shift(s,Math.abs(r.x)>=Math.abs(r.y)?Math.sign(r.x):0,Math.abs(r.x)>=Math.abs(r.y)?0:Math.sign(r.y));s.lastInput=time;}
 if(r.aHeld&&!s.padHeld)BD_DIG.begin(s,s.cursor);if(!r.aHeld&&s.padHeld)BD_DIG.release(s);s.padHeld=!!r.aHeld;return true;
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_DIG.html=function digSurfaceHTML(practice=false){
 return '<div class="square-layout"><div><div class="square-board"><canvas id="'+(practice?'flight-practice-canvas':'square-canvas')+'" width="'+(practice?640:840)+'" height="'+(practice?440:640)+'" tabindex="0" aria-label="Layered field square. Arrows move; 1 trowel, 2 pick, 3 brush. Hold and release Space to work." aria-describedby="dig-controls"></canvas></div><div class="dig-tool-row">'+['trowel','pick','brush'].map(function tool(key,i){return '<button data-dig-tool="'+key+'"><img src="'+BD_ART.assetURL('assets/dig-v7-'+key+'.webp')+'" alt=""><span>'+(i+1)+' · '+({trowel:'Trowel',pick:'Bamboo point',brush:'Soft brush'}[key])+'</span></button>';
/* Code by Daniel using ChatGPT November 16, 2026 */
}).join('')+'</div><p id="dig-controls" class="fine-print">Arrows move · 1 / 2 / 3 choose · Hold Space, move, release · Controller: A works, LB / RB tools</p></div><aside><div class="field-speech"><img data-speaker-face src="'+BD_ART.assetURL('assets/dig-v7-face-miriam.webp')+'" alt="Miriam"><div><b data-dig-speaker>Miriam</b><p data-dig-message aria-live="polite"></p><button data-read-thought hidden>Read this thought</button></div></div><p data-dig-next class="next-action"></p><p data-dig-status class="dig-status"></p><div class="actions"><button class="button secondary" data-dig-help>Dig with Miriam'+(practice?'':' · no Brisk seal')+'</button><button class="button secondary" data-dig-sieve hidden>Sieve the spoil</button><button class="button" data-dig-continue hidden>Continue to the study →</button></div><button class="button secondary" data-action="museum-entry">Back to the museum</button></aside></div>';
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_DIG.open=function openFieldSquare(site,replay=false){
 let data=digState(site);if(replay||!data.square||!data.depth)data=BD_DIG.create(site,replay);
 const onsite=!replay&&game.scene==='site'&&game.site===site;
 openPanel('FIELD SQUARE A1 · '+site.place.toUpperCase(),'<h2'+(onsite?' class="sr-only"':'')+'>'+escapeHTML(site.artifact)+'</h2>'+BD_DIG.html(),'square-dig');
 const panel=$('#panel');panel.classList.toggle('square-onsite-panel',onsite);
 const s=BD_DIG.model(site,data,BD_DIG.boards[site.id]);BD_DIG.active=s;s.root=$('#panel-body');BD_DIG.controls(s,$('#square-canvas'));
 game.dialogCleanup=function closeSquare(){panel.classList.remove('square-onsite-panel');s.disposed=true;s.abort.abort();cancelAnimationFrame(s.raf);s.hold=null;if(BD_DIG.active===s)BD_DIG.active=null;persist();
/* Code by Daniel using ChatGPT November 16, 2026 */
};
 s.root.querySelector('[data-dig-continue]').addEventListener('click',function study(){if(data.square.replay){BD_JOURNEY.skills();return;}BD_FIELD.afterSquare(site);
/* Code by Daniel using ChatGPT November 16, 2026 */
},{signal:s.abort.signal});
 BD_FIELD.thoughtButtons();BD_FIELD.touch(site.id);
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_DIG.refresh=function refreshFieldSquare(s){
 if(!s.root||s.disposed)return;const q=s.data.square;
 if((s.pickMisses||0)>=2&&!s.steady&&!s.root.querySelector('[data-steady-offer]')){const offer=document.createElement('button');offer.className='button secondary small';offer.dataset.steadyOffer='';offer.textContent='Try Steady hands · wider tap timing';offer.addEventListener('click',function steadyTogether(){s.steady=true;game.save.settings.steadyHands=true;persist();offer.remove();BD_DIG.say(s,'Steady hands is ready. Take the tap at your own pace.');
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });s.root.querySelector('[data-dig-status]')?.after(offer);}

 const text=s.root.querySelector('[data-dig-message]');if(text)text.textContent=s.message;
 const speaker=s.root.querySelector('[data-dig-speaker]');if(speaker)speaker.textContent=s.speaker==='sam'?'Sam':'Miriam';
 const face=s.root.querySelector('[data-speaker-face]');if(face){face.src=BD_ART.assetURL('assets/dig-v7-face-'+s.speaker+'.webp');face.alt=s.speaker==='sam'?'Sam':'Miriam';}
 const next=s.root.querySelector('[data-dig-next]');if(next)next.textContent='Next: '+(q.done?(s.practice?'land at '+s.site.place:'read the freed stone'):s.tool==='trowel'?'lower a level strip':s.tool==='pick'?'release a light tap':'sweep crumbs outward');
 const status=s.root.querySelector('[data-dig-status]');if(status)status.textContent=s.practice?'Practice tray':('Care '+('●'.repeat(s.data.care)+'○'.repeat(3-s.data.care))+' · '+q.strokes+' strokes'+(s.steady?'':' · Par '+s.board.par));
 for(const button of s.root.querySelectorAll('[data-dig-tool]')){const key=button.dataset.digTool;button.classList.toggle('selected',key===s.tool);button.setAttribute('aria-pressed',String(key===s.tool));button.disabled=q.done||key==='trowel'&&q.toolLocked||key==='pick'&&q.first;button.hidden=key==='pick'&&q.first;}
 const help=s.root.querySelector('[data-dig-help]');if(help)help.disabled=q.done;
 const sieve=s.root.querySelector('[data-dig-sieve]');if(sieve)sieve.hidden=q.small!=='spoil';const done=s.root.querySelector('[data-dig-continue]');if(done)done.hidden=!q.done;
 let stamps=s.root.querySelector('[data-dig-seals]');if(!s.practice&&q.done&&!stamps){stamps=document.createElement('div');stamps.className='field-seals';stamps.dataset.digSeals='';stamps.innerHTML=[['clean','Clean'],['brisk','Brisk'],['inPlace','In place']].map(function seal([key,label]){return '<span class="'+(s.data.seals[key]?'earned':'')+'">'+(s.data.seals[key]?'✦':'○')+' '+label+'</span>';
/* Code by Daniel using ChatGPT November 16, 2026 */
}).join('');status.after(stamps);}
 BD_DIG.paint(s);
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_DIG.paint=function paintLayeredSquare(s){
 if(!s.canvas||s.disposed)return;const c=s.canvas.getContext('2d'),b=s.board,d=s.data,unit=100,ox=70,oy=70,w=b.width*unit,h=b.height*unit;
 c.fillStyle='#453b2b';c.fillRect(0,0,s.canvas.width,s.canvas.height);
 const ground=BD_ART.images['dig-v7-soil-fill'];if(ground)c.drawImage(ground,0,0,s.canvas.width,s.canvas.height);
 c.fillStyle='#1e2219b0';c.fillRect(ox-12,oy-12,w+24,h+24);c.fillStyle='#786242';c.fillRect(ox,oy,w,h);
 c.save();c.beginPath();for(let i=0;i<s.find.length;i++)if(s.find[i])c.rect(ox+i%b.width*unit,oy+Math.floor(i/b.width)*unit,unit,unit);c.clip();
 c.fillStyle='#4d402c';c.fillRect(ox,oy,w,h);BD_ART.artifact(c,s.site,ox+w/2,oy+h/2,w*.74,h*.76);c.restore();
 for(let i=0;i<d.depth.length;i++){
  const x=ox+i%b.width*unit,y=oy+Math.floor(i/b.width)*unit,depth=d.depth[i];
  if(depth){const texture=BD_ART.images['dig-v7-soil-'+['','skin','fill','deep'][depth]];if(texture)c.drawImage(texture,(i*31)%96,(i*43)%96,Math.max(1,texture.width-100),Math.max(1,texture.height-100),x,y,unit,unit);else{c.fillStyle=['','#c6af7c','#917044','#5d4932'][depth];c.fillRect(x,y,unit,unit);}
   c.fillStyle='rgba(30,24,15,'+(depth*.055)+')';c.fillRect(x,y,unit,unit);
   c.strokeStyle='#eee0ad40';c.lineWidth=1;c.beginPath();c.moveTo(x,y+unit);c.lineTo(x,y);c.lineTo(x+unit,y);c.stroke();
   c.strokeStyle='#201a14a0';c.lineWidth=2+depth;c.beginPath();c.moveTo(x+unit-2,y);c.lineTo(x+unit-2,y+unit-2);c.lineTo(x,y+unit-2);c.stroke();
   if(s.find[i]&&depth===1){c.save();c.globalAlpha=.32;c.strokeStyle='#ece0b7';c.lineWidth=2;c.setLineDash([5,4]);c.strokeRect(x+10,y+10,80,80);c.restore();}
  }
  if(d.crumbs[i])for(let n=0;n<12*d.crumbs[i];n++){c.fillStyle=n%2?'#d2b37f':'#745430';c.beginPath();c.ellipse(x+12+(n*37)%77,y+13+(n*23)%73,3+n%4,2+n%3,n,0,Math.PI*2);c.fill();}
  if(i===b.small&&d.square.small==='buried'&&depth<=2){c.strokeStyle='#db7e48';c.lineWidth=5;c.beginPath();c.arc(x+52,y+50,13,.9,3.8);c.stroke();}
 }
 for(const [a,z] of BD_DIG.cracks(s)){const x=ox+a%b.width*unit,y=oy+Math.floor(a/b.width)*unit,dx=z%b.width-a%b.width,dy=Math.floor(z/b.width)-Math.floor(a/b.width);c.strokeStyle='#2c2015';c.lineWidth=4;c.beginPath();for(let j=0;j<6;j++){const px=x+(dx?dx>0?91:9:12+j*15)+(dx?j%2*5:0),py=y+(dy?dy>0?91:9:12+j*15)+(dy?j%2*5:0);if(j)c.lineTo(px,py);else c.moveTo(px,py);}c.stroke();}
 c.strokeStyle='#e4d4ac';c.lineWidth=2;c.strokeRect(ox-4,oy-4,w+8,h+8);for(const x of [ox-5,ox+w+5])for(const y of [oy-5,oy+h+5]){c.fillStyle='#625641';c.fillRect(x-4,y-9,8,17);c.fillStyle='#d8c9a3';c.beginPath();c.arc(x,y-5,4,0,Math.PI*2);c.fill();}
 c.fillStyle='#e8d9b7';c.font='15px Georgia';c.fillText(s.practice?'SEAT-BACK PRACTICE TRAY':'FIELD SQUARE A1 · TEACHING REPLICA',ox,32);c.fillText('N ↑',s.canvas.width-65,36);c.font='13px Georgia';c.fillText('0',ox,oy+h+32);c.fillText('50 cm',ox+86,oy+h+32);c.fillRect(ox,oy+h+12,100,5);
 // The heap and mesh retain visible consequences without marking the artifact.
 c.fillStyle='#635039';c.beginPath();c.moveTo(w+91,h+35);c.quadraticCurveTo(w+112,h+23-Math.min(58,12+d.square.strokes*1.3),w+132,h+35);c.fill();c.strokeStyle='#baa47a';c.strokeRect(w+82,h+40,50,22);for(let n=0;n<5;n++){c.beginPath();c.moveTo(w+82+n*10,h+40);c.lineTo(w+82+n*10,h+62);c.stroke();}
 const preview=s.hold?{start:s.hold.start,end:s.hold.end,tool:s.tool}:s.preview;
 if(preview){const line=BD_DIG.path(s,preview.start,preview.end),danger=preview.tool==='trowel'&&line.some(function skin(i){return s.find[i]&&d.depth[i]<=1;
/* Code by Daniel using ChatGPT November 16, 2026 */
});c.fillStyle=danger?'#d06e554b':'#dfd68d42';for(const i of line)c.fillRect(ox+i%b.width*100+3,oy+Math.floor(i/b.width)*100+3,94,94);c.strokeStyle=danger?'#ffe2c0':'#f2e5ad';c.lineWidth=5;c.beginPath();c.moveTo(ox+(preview.start%b.width+.5)*100,oy+(Math.floor(preview.start/b.width)+.5)*100);c.lineTo(ox+(preview.end%b.width+.5)*100,oy+(Math.floor(preview.end/b.width)+.5)*100);c.stroke();}
 const cx=ox+(s.cursor%b.width+.5)*100,cy=oy+(Math.floor(s.cursor/b.width)+.5)*100;c.strokeStyle='#f4e7ac';c.lineWidth=3;c.strokeRect(cx-45,cy-45,90,90);
 const tool=BD_ART.images['dig-v7-'+s.tool];if(tool){const ratio=tool.width/tool.height;c.save();c.shadowColor='#1b1b16a0';c.shadowBlur=5;c.shadowOffsetX=6;c.shadowOffsetY=6;c.translate(cx,cy);c.rotate(s.tool==='brush'?.3:1.1);c.drawImage(tool,-24,-110,115*ratio,115);c.restore();}
 if(s.hold&&s.tool==='pick'){const elapsed=(performance.now()-s.hold.at)/1000,progress=Math.min(1,elapsed/1.4);c.lineWidth=8;c.strokeStyle='#efe2b1';c.beginPath();c.arc(cx,cy,35,-Math.PI/2,-Math.PI/2+Math.PI*2*progress);c.stroke();c.strokeStyle='#9fb894';c.beginPath();c.arc(cx,cy,35,-Math.PI/2+Math.PI*2*(s.steady?.18:.45)/1.4,-Math.PI/2+Math.PI*2*(s.steady?1.2:.95)/1.4);c.stroke();}
 if(s.revealAt&&!game.save.settings.reduced){const elapsed=(performance.now()-s.revealAt)/1000;if(elapsed<1){c.fillStyle='rgba(255,232,165,'+(.16*(1-elapsed))+')';c.fillRect(ox+elapsed*w,oy,w*.17,h);}else s.revealAt=0;}
 const now=performance.now();if(!s.idleStart)s.idleStart=now;
 if(!game.save.settings.reduced&&!s.data.square.done&&now-(s.activityAt||s.idleStart)>4000){const hint=s.idleHint||(s.idleHint=BD_DIG.guidance(s));if(hint){const hx=ox+(hint.start%b.width+.5)*100,hy=oy+(Math.floor(hint.start/b.width)+.5)*100;c.save();c.globalAlpha=.3;c.strokeStyle='#ffe8a8';c.lineWidth=5;c.beginPath();c.arc(hx,hy,31,0,Math.PI*2);c.stroke();if(hint.end!==hint.start){c.beginPath();c.moveTo(hx,hy);c.lineTo(ox+(hint.end%b.width+.5)*100,oy+(Math.floor(hint.end/b.width)+.5)*100);c.stroke();}c.restore();}}
 s.effects=s.effects.filter(function recent(e){return now-e.at<500;
/* Code by Daniel using ChatGPT November 16, 2026 */
});if(!game.save.settings.reduced)for(const effect of s.effects){const t=(now-effect.at)/500,x=ox+(effect.index%b.width+.5)*100,y=oy+(Math.floor(effect.index/b.width)+.5)*100;c.fillStyle='#d9bd83';for(let j=0;j<6;j++){c.beginPath();c.arc(x+(j-2)*t*14,y-Math.sin(t*Math.PI)*28+j,2,0,Math.PI*2);c.fill();}}
/* Code by Daniel using ChatGPT November 17, 2026 */
};
