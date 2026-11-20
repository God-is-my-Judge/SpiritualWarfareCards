'use strict';
// Shares Christmas Lantern's neutral-at-connect and F310 layout conventions.
window.BD_CONTROLLER={pads:{},mode:null,navDirection:0,navAt:0,lastTime:0,lastUse:0};
BD_CONTROLLER.button=function padButton(value){return typeof value==='number'?value>.5:!!value?.pressed||Number(value?.value)>.5;
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_CONTROLLER.layout=function padLayout(p){
 const mode=game.save?.settings.controllerMapping||'auto',id=p.id||'';
 if(mode==='standard'||p.mapping==='standard'&&mode!=='f310-direct')return {name:'Standard / XInput',a:0,b:1,x:2,y:3,start:9,back:8,dpad:[12,13,14,15]};
 if(mode==='f310-direct'||/046d|Logitech/i.test(id)&&!/XInput|c21[def]/i.test(id))return {name:'F310 DirectInput',a:1,b:2,x:0,y:3,start:9,back:8};
 return {name:'Raw XInput',a:0,b:1,x:2,y:3,start:p.buttons.length===11?7:9,back:p.buttons.length===11?6:8,dpad:p.buttons.length>=16?[12,13,14,15]:null};
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_CONTROLLER.read=function readPad(p,time){
 const buttons=Array.from(p.buttons||[],BD_CONTROLLER.button),axes=Array.from(p.axes||[],Number),layout=BD_CONTROLLER.layout(p);let m=BD_CONTROLLER.pads[p.index];
 if(!m||m.id!==p.id){m=BD_CONTROLLER.pads[p.index]={id:p.id,previous:buttons.slice(),held:new Set(),offAxes:new Set(),pov:-1};buttons.forEach(function held(v,i){if(v)m.held.add(i);
/* Code by Daniel using ChatGPT November 15, 2026 */
});axes.forEach(function resting(v,i){if(v>1.05)m.pov=i;else if(Math.abs(v)>=.24)m.offAxes.add(i);
/* Code by Daniel using ChatGPT November 15, 2026 */
});}
 buttons.forEach(function release(v,i){if(!v)m.held.delete(i);
/* Code by Daniel using ChatGPT November 15, 2026 */
});axes.forEach(function center(v,i){if(v>1.05)m.pov=i;else if(Math.abs(v)<.24)m.offAxes.delete(i);
/* Code by Daniel using ChatGPT November 15, 2026 */
});
 const on=function on(i){return !!buttons[i]&&!m.held.has(i);
/* Code by Daniel using ChatGPT November 15, 2026 */
},edge=function edge(i){return on(i)&&!m.previous[i];
/* Code by Daniel using ChatGPT November 15, 2026 */
},axis=function axis(i){return i===m.pov||m.offAxes.has(i)||Math.abs(axes[i]||0)<.24?0:axes[i];
/* Code by Daniel using ChatGPT November 15, 2026 */
};
 let x=axis(0)||0,y=axis(1)||0,dx=0,dy=0;
 if(layout.dpad){dx=Number(on(15))-Number(on(14));dy=Number(on(13))-Number(on(12));}
 else if(m.pov>=0){const v=axes[m.pov];if(Number.isFinite(v)&&v<=1.05){const k=(Math.round((v+1)*3.5)%8+8)%8;dx=[0,1,1,1,0,-1,-1,-1][k];dy=[-1,-1,0,1,1,1,0,-1][k];}}
 else if(axes.length>=6){dx=Math.abs(axis(axes.length-2))>.5?Math.sign(axis(axes.length-2)):0;dy=Math.abs(axis(axes.length-1))>.5?Math.sign(axis(axes.length-1)):0;}
 if(dx||dy){x=dx;y=dy;}const length=Math.hypot(x,y);if(length>1){x/=length;y/=length;}
 const rightX=layout.name==='Raw XInput'&&p.buttons.length===11?3:2,rightY=layout.name==='Raw XInput'&&p.buttons.length===11?4:3;
 const r={x,y,lookX:axis(rightX)||0,lookY:axis(rightY)||0,scroll:Math.abs(axis(rightY))>.3?axis(rightY):0,a:edge(layout.a),b:edge(layout.b),west:edge(layout.x),north:edge(layout.y),start:edge(layout.start),back:edge(layout.back),lb:edge(4),rb:edge(5),aHeld:on(layout.a),name:(/F310/i.test(p.id)?'Logitech F310':'Controller')+' · '+layout.name};
 m.previous=buttons;if(length||buttons.some(function active(_,i){return on(i);
/* Code by Daniel using ChatGPT November 15, 2026 */
}))m.lastInput=time;return r;
/* Code by Daniel using ChatGPT November 18, 2026 */
};
BD_CONTROLLER.controls=function availableControls(root){const nodes=Array.from(root.querySelectorAll('button,select,input:not([type="hidden"]),textarea,summary,a[href],canvas[tabindex="0"]'));if(root.id==='flight-notebook')nodes.push($('#flight-skip'));return nodes.filter(function enabled(el){return !el.disabled&&!el.closest('[hidden]')&&el.getClientRects().length&&getComputedStyle(el).visibility!=='hidden';
/* Code by Daniel using ChatGPT November 15, 2026 */
});
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_CONTROLLER.focus=function focusControl(el){if(!el)return;document.querySelectorAll('.controller-focus').forEach(function clear(n){n.classList.remove('controller-focus');
/* Code by Daniel using ChatGPT November 15, 2026 */
});el.classList.add('controller-focus');el.focus({preventScroll:true});el.scrollIntoView({block:'nearest',inline:'nearest'});
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_CONTROLLER.adjust=function adjustControl(el,direction){
 if(el?.type==='range'){const step=Number(el.step)||1;el.value=String(Math.max(Number(el.min||0),Math.min(Number(el.max||100),Number(el.value)+step*direction*2)));el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));return true;}
 if(el?.tagName==='SELECT'){const enabled=Array.from(el.options).filter(function available(o){return !o.disabled;
/* Code by Daniel using ChatGPT November 15, 2026 */
}),index=enabled.indexOf(el.selectedOptions[0]);el.value=enabled[(index+direction+enabled.length)%enabled.length]?.value||el.value;el.dispatchEvent(new Event('change',{bubbles:true}));return true;}return false;
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_CONTROLLER.activate=function activateControl(el){
 if(!el)return;
 if(el.id==='square-canvas'||el.id==='flight-practice-canvas'){const s=el.id==='square-canvas'?BD_DIG.active:game.flight?.practice;if(s){s.padArmed=false;s.padHeld=false;BD_CONTROLLER.mode={node:el,type:'square',square:s};BD_CONTROLLER.hint('Move: stick / D-pad · LB / RB tools · hold A, move, release · B controls');}return;}
 if(el.id==='study-canvas'){const s=BD_STUDY.active;if(s&&!s.reading&&(s.stage===3||s.config.kind==='reconstruct')){BD_CONTROLLER.mode={node:el,type:'study'};BD_CONTROLLER.hint('Move the piece: stick / D-pad · LB / RB turn · A check · B return to controls');}return;}
 if(el.id==='dig-canvas'&&BD_STUDY.brushController){BD_CONTROLLER.mode={node:el,type:'brush',x:350,y:250};BD_CONTROLLER.hint('Move brush: stick / D-pad · hold A to brush · B return to controls');return;}
 if(el.type==='range')return;
 if(el.tagName==='SELECT'){BD_CONTROLLER.adjust(el,1);return;}
 if(el.matches('button,summary,a[href],input[type="checkbox"],input[type="radio"]'))el.click();else el.focus();
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_CONTROLLER.hint=function controllerHint(text){const status=document.getElementById('controller-status');if(status&&status.textContent!==text)status.textContent=text;
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_CONTROLLER.endWork=function endControllerWork(){BD_CONTROLLER.mode=null;document.getElementById('controller-brush')?.remove();BD_CONTROLLER.navDirection=0;
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_CONTROLLER.work=function controlStudy(r,dt){
 const mode=BD_CONTROLLER.mode;if(!mode)return false;
 if(!mode.node.isConnected||!$('#panel').open){BD_CONTROLLER.endWork();return false;}
 if(mode.type==='square')return BD_DIG.pad(mode.square,r,performance.now());
 if(r.start){BD_CONTROLLER.endWork();closePanel();return true;}if(r.b){BD_CONTROLLER.endWork();BD_CONTROLLER.focus(mode.node);return true;}
 if(mode.type==='study'){
  const s=BD_STUDY.active;if(!s||s.reading){BD_CONTROLLER.endWork();const next=$('#panel [data-field="next"]');BD_CONTROLLER.focus(next&&!next.hidden?next:$('#study-ready'));return true;}
  if(r.x||r.y)BD_STUDY.nudge(s,r.x*145*dt,r.y*145*dt);
  if(r.lb)BD_STUDY.turn(s,-1);if(r.rb)BD_STUDY.turn(s,1);
  if(r.a){if(s.stage===3)BD_STUDY.trySupport(s);else BD_STUDY.tryJoin(s);}return true;
 }
 const brush=BD_STUDY.brushController;if(!brush){BD_CONTROLLER.endWork();return false;}
 mode.x=Math.max(5,Math.min(695,mode.x+r.x*270*dt));mode.y=Math.max(5,Math.min(495,mode.y+r.y*270*dt));
 let cursor=document.getElementById('controller-brush');if(!cursor){cursor=document.createElement('div');cursor.id='controller-brush';cursor.setAttribute('aria-hidden','true');$('#panel').append(cursor);}
 const rect=mode.node.getBoundingClientRect();cursor.style.left=(rect.left+mode.x/700*rect.width)+'px';cursor.style.top=(rect.top+mode.y/500*rect.height)+'px';cursor.classList.toggle('brushing',r.aHeld);
 if(r.aHeld&&performance.now()-(BD_CONTROLLER.brushedAt||0)>75){BD_CONTROLLER.brushedAt=performance.now();brush.clear(mode.x,mode.y);}return true;
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_CONTROLLER.navigate=function navigatePanel(root,r,time,dt){
 const items=BD_CONTROLLER.controls(root),token=root.querySelector('#panel-body')?.firstElementChild||root.firstElementChild;let el=document.activeElement;
 if(BD_CONTROLLER.focusToken!==token){BD_CONTROLLER.focusToken=token;el=null;}
 if(!items.includes(el)){el=items.find(function preferred(n){return n.closest('#panel-body')&&n.matches('button.button:not(.secondary),select');
/* Code by Daniel using ChatGPT November 15, 2026 */
})||items[0];BD_CONTROLLER.focus(el);}
 if(r.scroll)root.scrollTop+=r.scroll*600*dt;
 const vertical=Math.abs(r.y)>.5?Math.sign(r.y):0,horizontal=Math.abs(r.x)>.5?Math.sign(r.x):0,direction=vertical?vertical*2:horizontal;
 if(direction&&(direction!==BD_CONTROLLER.navDirection||time-BD_CONTROLLER.navAt>190)){
  if(!vertical&&BD_CONTROLLER.adjust(el,horizontal)){}else{const index=items.indexOf(el),next=items[(index+(vertical||horizontal)+items.length)%items.length];BD_CONTROLLER.focus(next);}
  BD_CONTROLLER.navAt=time;
 }
 BD_CONTROLLER.navDirection=direction;if(r.a)BD_CONTROLLER.activate(document.activeElement);
 if(r.b||r.start){if($('#panel').open)closePanel();else if(game.flight)$('#flight-pause')?.click();}
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_CONTROLLER.poll=function pollControllers(time){
 const dt=Math.min(.05,(time-(BD_CONTROLLER.lastTime||time))/1000);BD_CONTROLLER.lastTime=time;game.padMove=null;
 if(document.hidden||game.inputActive===false){BD_CONTROLLER.pads={};BD_CONTROLLER.endWork();return;}
 let pads=[];try{pads=Array.from(navigator.getGamepads?.()||[]).filter(function connected(p){return p&&p.connected;
/* Code by Daniel using ChatGPT November 15, 2026 */
});}catch{}
 for(const key of Object.keys(BD_CONTROLLER.pads))if(!pads.some(function present(p){return String(p.index)===key;
/* Code by Daniel using ChatGPT November 15, 2026 */
}))delete BD_CONTROLLER.pads[key];
 if(!pads.length){if(BD_CONTROLLER.mode)BD_CONTROLLER.endWork();BD_CONTROLLER.hint('Controller: click the game, then press a button.');return;}
 const samples=pads.map(function read(p){return BD_CONTROLLER.read(p,time);
/* Code by Daniel using ChatGPT November 15, 2026 */
}),r={x:0,y:0,scroll:0};let strongest=0;
 for(const s of samples){const strength=Math.hypot(s.x,s.y);if(strength>strongest){strongest=strength;r.x=s.x;r.y=s.y;}if(Math.abs(s.scroll)>Math.abs(r.scroll))r.scroll=s.scroll;for(const key of ['a','b','west','north','start','back','lb','rb','aHeld'])r[key]=!!r[key]||s[key];}
 if(document.hidden){BD_CONTROLLER.endWork();return;}
 if(!game.ready||!game.save)return;
 const work=BD_CONTROLLER.mode;if(work&&BD_CONTROLLER.work(r,dt))return;
 BD_CONTROLLER.hint(samples[0].name+' · A select / investigate · X Scene guide · Y atlas · Start backpack');
 if(game.hallTransition){if(r.a||r.b)BD_MUSEUM.finish();return;}
 if($('#panel').open){BD_CONTROLLER.navigate($('#panel'),r,time,dt);return;}
 if(BD_SCROLL.active()){BD_SCROLL.pad(r);return;}
 if(game.flight){
  if(r.start){showSettings();return;}if(r.lb)$('#flight-previous')?.click();if(r.rb)$('#flight-next')?.click();
  BD_CONTROLLER.navigate($('#flight-notebook'),r,time,dt);return;
 }
 BD_CONTROLLER.navDirection=0;if(r.x||r.y){game.padMove=[r.x,r.y];game.path=[];game.pending=null;}
 if(r.lb)showLibrary();if(r.rb)BD_MUSEUM.plan();if(r.a)investigateNearest();if(r.west)showGuide();if(r.north)showAtlas();if(r.back)showJournal();if(r.start)BD_IMMERSION.pack();


/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_CONTROLLER.help=function controllerHelp(){
 openPanel('CONTROLLER CONTROLS','<h2>Settle in with a controller.</h2><p class="lede">Logitech F310, Xbox-style pads, and browser-mapped controllers are supported. Focus the browser window, then press a controller button.</p><div class="note-block"><p><b>Walk:</b> left stick or D-pad. <b>A:</b> investigate / choose. <b>B:</b> back. <b>X:</b> Scene guide. <b>Y:</b> atlas. <b>Back:</b> journal. <b>Start:</b> backpack. <b>LB:</b> library. <b>RB:</b> museum plan.</p><p><b>Menus:</b> up / down moves focus. Left / right changes a slider or selected choice. A presses a button or toggles a setting. Right stick scrolls long pages.</p><p><b>Field table:</b> choose the canvas with A, move the selected section with the stick, turn with LB / RB, and press A to check its position. B returns to the controls. Start opens the backpack and keeps your activity in place. To brush, choose the excavation canvas and hold A as you move the brush. Visible buttons offer the same actions.</p><p><b>Flight:</b> choose its controls with up / down; A presses them. LB / RB changes notes. B pauses the journey. Arrive now stays an explicit choice.</p></div><label class="setting-row"><span>Controller layout<small>For the F310, try the bottom switch at X first. D mode is also supported; use the override if your browser reports it differently.</small></span><select id="controller-mapping"><option value="auto">Automatic</option><option value="standard">Standard / XInput</option><option value="f310-direct">F310 DirectInput (D)</option></select></label><p class="fine-print">A keyboard is available for optional personal notes. No written answer is required to explore or complete an investigation.</p>','controller-help');
 const select=$('#controller-mapping');select.value=game.save.settings.controllerMapping||'auto';select.addEventListener('change',function changeLayout(){game.save.settings.controllerMapping=this.value;BD_CONTROLLER.pads={};persist();
/* Code by Daniel using ChatGPT November 15, 2026 */
});
/* Code by Daniel using ChatGPT November 18, 2026 */
};
