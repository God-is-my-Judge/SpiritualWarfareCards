'use strict';
/* Gamepad input for any controller.

   Every connected controller is read each frame. Before the snow friend is built,
   the strongest stick or D-pad wins. Afterwards a second active device can join
   as the friend while the first retains the elf and menus. A second controller, or one with a button
   stuck down, can no longer lock the others out.

   Browsers report most pads (Xbox, PlayStation, Switch Pro, the Logitech F310 in either
   X or D mode, 8BitDo and others) in the "standard" layout. A pad that arrives raw gets
   the nearest known layout, and its D-pad is read from a hat switch: one POV axis
   (Windows/macOS) or the last two axes (Linux).

   Anything already held when a controller first appears is set aside until it lets go:
   a button until it is released, an axis until it returns to centre. Raw triggers rest
   at -1, virtual devices can sit pinned at an edge, and a bumper can stick; none of them
   should walk the elf or swallow presses. */
const PAD_DEAD=.24;
const PAD_LAYOUTS={
 standard:{name:'standard',a:0,b:1,x:2,y:3,back:8,start:9,dpad:[12,13,14,15]},
 direct:{name:'DirectInput',a:1,b:2,x:0,y:3,back:8,start:9,dpad:null},
 xinputRaw:{name:'raw XInput',a:0,b:1,x:2,y:3,back:6,start:7,dpad:null},
 raw:{name:'raw',a:0,b:1,x:2,y:3,back:8,start:9,dpad:null}
};
function padButton(value){return typeof value==='number'?value>.5:!!value?.pressed||Number(value?.value)>.5;/* Code by Daniel using ChatGPT November 11, 2026 */}
function padHasInput(p){return Array.from(p.buttons||[]).some(padButton)||Math.abs(p.axes?.[0]||0)>PAD_DEAD||Math.abs(p.axes?.[1]||0)>PAD_DEAD;/* Code by Daniel using ChatGPT November 11, 2026 */}
function padLayout(p,mode=state.pad){
 const id=p.id||'';
 if(p.mapping==='standard'||mode==='standard')return PAD_LAYOUTS.standard;
 // Logitech pads in D mode number their face buttons 1-4 as X, A, B, Y. The XInput models (c21d/e/f) do not.
 if(mode==='f310-direct'||/046d|Logitech/i.test(id)&&!/XInput|c21[def]/i.test(id))return PAD_LAYOUTS.direct;
 // Linux reports an unmapped XInput pad with 11 buttons: A B X Y LB RB Back Start Guide LS RS.
 return (p.buttons||[]).length===11?PAD_LAYOUTS.xinputRaw:PAD_LAYOUTS.raw;
 /* Code by Daniel using Claude November 12, 2026 */
}
function padMemory(p){
 g.pads=g.pads||{};
 let m=g.pads[p.index];
 if(!m||m.id!==p.id){
  m=g.pads[p.index]={id:p.id,prev:[],held:new Set(),offAxes:new Set(),pov:-1,lastInput:0};
  Array.from(p.buttons||[]).forEach(function heldAtStart(b,i){if(padButton(b))m.held.add(i);/* Code by Daniel using Claude November 12, 2026 */});
  Array.from(p.axes||[],Number).forEach(function restingAxis(v,i){if(v>1.05)m.pov=i;else if(Math.abs(v)>=PAD_DEAD)m.offAxes.add(i);/* Code by Daniel using Claude November 12, 2026 */});
 }
 return m;
 /* Code by Daniel using Claude November 12, 2026 */
}
function readPad(p,m,layout){
 const buttons=Array.from(p.buttons||[],padButton),axes=Array.from(p.axes||[],Number);
 buttons.forEach(function released(v,i){if(!v)m.held.delete(i);/* Code by Daniel using Claude November 12, 2026 */});
 axes.forEach(function centred(v,i){if(v>1.05)m.pov=i;else if(Math.abs(v)<PAD_DEAD)m.offAxes.delete(i);/* Code by Daniel using Claude November 12, 2026 */});
 const on=function on(i){return i!=null&&!!buttons[i]&&!m.held.has(i);/* Code by Daniel using Claude November 12, 2026 */},
  axis=function axis(i){const v=axes[i]||0;return i===m.pov||m.offAxes.has(i)||Math.abs(v)<PAD_DEAD?0:v;/* Code by Daniel using Claude November 12, 2026 */},
  edge=function edge(i){return on(i)&&!m.prev[i];/* Code by Daniel using Claude November 12, 2026 */};
 let x=axis(0),y=axis(1),dx=0,dy=0;
 if(layout.dpad){dx=on(layout.dpad[2])?-1:on(layout.dpad[3])?1:0;dy=on(layout.dpad[0])?-1:on(layout.dpad[1])?1:0;}
 else if(m.pov>=0){const v=axes[m.pov];if(v<=1.05){const k=(Math.round((v+1)*3.5)%8+8)%8;dx=[0,1,1,1,0,-1,-1,-1][k];dy=[-1,-1,0,1,1,1,0,-1][k];}}
 else if(axes.length>=6){const hx=axis(axes.length-2),hy=axis(axes.length-1);dx=Math.abs(hx)>.5?Math.sign(hx):0;dy=Math.abs(hy)>.5?Math.sign(hy):0;}
 if(dx||dy){x=dx;y=dy;}
 const result={buttons,axes,x,y,active:!!(x||y)||buttons.some(function live(v,i){return on(i);/* Code by Daniel using Claude November 12, 2026 */}),
  a:edge(layout.a),aHeld:on(layout.a),b:edge(layout.b),west:edge(layout.x),north:edge(layout.y),start:edge(layout.start)};
 m.prev=buttons;
 return result;
 /* Code by Daniel using Claude November 12, 2026 */
}
function padText(el,text){if(el&&el.textContent!==text)el.textContent=text;/* Code by Daniel using Claude November 12, 2026 */}
function controllerFocus(){const items=Array.from(panel.querySelectorAll('button,select,input,textarea,summary,a[href]')).filter(function enabled(el){return el.getClientRects().length&&!el.disabled;/* Code by Daniel using ChatGPT November 13, 2026 */});if(!items.includes(document.activeElement))(items.find(function preferred(el){return el.closest('#panel-content')&&el.classList.contains('primary');/* Code by Daniel using ChatGPT November 13, 2026 */})||items.find(function content(el){return el.closest('#panel-content');/* Code by Daniel using ChatGPT November 13, 2026 */})||items[0])?.focus();return items;/* Code by Daniel using ChatGPT November 13, 2026 */}
function pollPad(){
 let pads=[];try{pads=Array.from(navigator.getGamepads?.()||[]).filter(function connected(p){return p?.connected;/* Code by Daniel using ChatGPT November 11, 2026 */});}catch{}
 g.pads=g.pads||{};
 for(const index of Object.keys(g.pads))if(!pads.some(function still(p){return String(p.index)===index;/* Code by Daniel using Claude November 12, 2026 */}))delete g.pads[index];
 const live=$('#pad-live');
 if(!pads.length){if(g.wonder20?.play21)routeJoinedPads21([]);if(g.wonder20)g.wonder20.coopMove=null;g.padHolding21=coopEnabled28()&&g.coop28.parcelOwner===2&&g.coop28.keys.has('Enter');g.padCount=0;if(g.dialogue)refreshDialogueControls17();padText($('#controller'),'Keyboard / touch');padText(live,'No controller is exposed yet. Click the game, then press a button on the controller.');return {x:0,y:0};}
 if(!g.padCount){if(panel.open)controllerFocus();else canvas.focus({preventScroll:true});}
 g.padCount=pads.length;
 if(g.dialogue)refreshDialogueControls17();
 let move={x:0,y:0},strongest=0,shown=null;const press={},samples=[];
 for(const p of pads){
  const m=padMemory(p),layout=padLayout(p),r=readPad(p,m,layout),size=Math.hypot(r.x,r.y);
  samples.push({p,r});
  if(size>strongest){strongest=size;move={x:r.x,y:r.y};}
  for(const k of ['a','b','west','north','start'])if(r[k])press[k]=true;
  if(r.active)m.lastInput=performance.now();
  if(!shown||m.lastInput>shown.m.lastInput)shown={p,m,layout,r};
 }
 g.padHolding21=samples.some(function held(s){return s.r.aHeld;/* Code by Daniel using ChatGPT November 13, 2026 */});const coop=routeJoinedPads21(samples);if(coop){move=coop.move;for(const k of ['a','b','west','north','start'])press[k]=!!coop.press[k];press.secondA=!!coop.secondA;}
 if(wonderWatching20()){if(press.b||press.start)endBethlehem20();return {x:0,y:0};}
 if(!panel.open&&g.wonder20?.play21?.mode&&roomPad21(move,press))return roomCaptures21()?{x:0,y:0}:move;
 const {p,m,layout,r}=shown,count=pads.length>1?pads.length+' controllers · ':'';
 padText($('#controller'),count+(/F310/i.test(p.id)?'Logitech F310':'Controller')+' · '+layout.name+(r.active?' · input':''));
 padText(live,p.id+' · browser mapping: '+(p.mapping||'raw')+' · layout: '+layout.name+' · '+(m.lastInput?'Input received':'Detected; waiting for input')+' · axes: '+r.axes.slice(0,4).map(function rounded(n){return n.toFixed(2);/* Code by Daniel using ChatGPT November 11, 2026 */}).join(', ')+' · buttons: '+r.buttons.map(function pressed(v,i){return v?i:null;/* Code by Daniel using ChatGPT November 11, 2026 */}).filter(function used(i){return i!==null;/* Code by Daniel using ChatGPT November 11, 2026 */}).join(', ')+(m.held.size?' · set aside until released: '+Array.from(m.held).join(', '):'')+(pads.length>1?' · '+pads.length+' controllers connected':''));
 if(g.transition){if(press.a||press.b)finishTransition();}
 else if(panel.open){if(g.dialogue){const dir=Math.abs(move.x)>.5||Math.abs(move.y)>.5?(Math.abs(move.x)>Math.abs(move.y)?Math.sign(move.x):Math.sign(move.y)):0,now=performance.now();if(dir&&(dir!==g.padDir||now-g.padNavAt>280)){moveDialogueReply09(dir);g.padNavAt=now;}g.padDir=dir;if(press.a)activateDialogueReply09();if(press.b)backDialogue09();else if(press.start)closePanel();return move;}const items=controllerFocus(),dir=Math.abs(move.x)>.5||Math.abs(move.y)>.5?(Math.abs(move.x)>Math.abs(move.y)?Math.sign(move.x):Math.sign(move.y)):0,now=performance.now();if(dir&&(dir!==g.padDir||now-g.padNavAt>280)){const index=items.indexOf(document.activeElement);items[(index+dir+items.length)%items.length]?.focus();g.padNavAt=now;}g.padDir=dir;
  if(press.a){const el=document.activeElement;if(el?.matches('button,summary,a[href]'))el.click();else if(el?.type==='checkbox'){el.checked=!el.checked;el.dispatchEvent(new Event('change'));}else if(el?.tagName==='SELECT'){el.selectedIndex=(el.selectedIndex+1)%el.options.length;el.dispatchEvent(new Event('change'));}}if(press.b||press.start)closePanel();}
 else{g.padDir=0;if(press.a)interact();else if(press.secondA)interactCoop28();if(press.b)contextPlay21();if(press.north)collection();if(press.west)waypack();if(press.start)settings();}
 return move;/* Code by Daniel using ChatGPT November 11, 2026 */
 /* Code by Daniel using Claude November 12, 2026 */
/* Code by Daniel using ChatGPT November 18, 2026 *//* Code by Daniel using ChatGPT November 19, 2026 */
}
