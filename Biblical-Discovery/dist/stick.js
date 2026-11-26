'use strict';
// On-screen thumb joystick for phones and portrait touch screens.
// Adapted from Christmas Lantern's TouchStick (itself from The Lantern Road). Claude for Daniel, 21 November 2026.
// Setting: game.save.settings.touchStick = 'auto' (default: touch screens in portrait or phone-sized) | 'on' | 'off'.
window.BD_STICK={
 pointer:null,x:0,y:0,el:null,center:null,radius:40,touchSeen:false,
 mode(){const v=game.save?.settings?.touchStick;return v==='on'||v==='off'?v:'auto';},
 wanted(){
  const m=BD_STICK.mode();if(m==='off')return false;
  if(m==='auto'){const touch=BD_STICK.touchSeen||navigator.maxTouchPoints>0;if(!touch)return false;if(!(innerHeight>innerWidth||Math.min(innerWidth,innerHeight)<=500))return false;/* portrait, or a phone either way round */}
  // Only where the explorer walks, and never over a reading panel, the oculus view, a flight or a passage between rooms.
  return !!(game.ready&&['museum','cabin','site'].includes(game.scene)&&!game.flight&&!game.hallTransition&&!$('#panel').open&&!(BD_SCROLL?.active?.()));
 },
 refresh(){const show=BD_STICK.wanted();if(BD_STICK.el)BD_STICK.el.hidden=!show;if(!show&&BD_STICK.pointer!==null)BD_STICK.reset();},
 vector(dx,dy,radius,dead=.14){const x=dx/radius,y=dy/radius,n=Math.hypot(x,y);if(n<=dead)return {x:0,y:0};const s=Math.min(1,(n-dead)/(1-dead));return {x:x/n*s,y:y/n*s};},
 move(e){
  if(e.pointerId!==BD_STICK.pointer)return;e.preventDefault();
  const dx=e.clientX-BD_STICK.center.x,dy=e.clientY-BD_STICK.center.y,v=BD_STICK.vector(dx,dy,BD_STICK.radius);
  BD_STICK.x=v.x;BD_STICK.y=v.y;game.stickMove=v.x||v.y?[v.x,v.y]:null;
  const n=Math.hypot(dx,dy)||1,limit=Math.min(BD_STICK.radius,n);
  BD_STICK.el.style.setProperty('--stick-x',dx/n*limit+'px');BD_STICK.el.style.setProperty('--stick-y',dy/n*limit+'px');
 },
 reset(){
  const old=BD_STICK.pointer;BD_STICK.pointer=null;BD_STICK.x=BD_STICK.y=0;game.stickMove=null;
  if(!BD_STICK.el)return;BD_STICK.el.classList.remove('active');BD_STICK.el.style.setProperty('--stick-x','0px');BD_STICK.el.style.setProperty('--stick-y','0px');
  if(old!==null&&BD_STICK.el.hasPointerCapture?.(old))BD_STICK.el.releasePointerCapture(old);
 },
 install(){
  // Keep the setting through save and load.
  const oldClean=sanitizeSave;sanitizeSave=function keepTouchStick(raw){const clean=oldClean(raw),v=raw?.settings?.touchStick;if(v==='auto'||v==='on'||v==='off')clean.settings.touchStick=v;return clean;};
  const style=document.createElement('style');style.textContent=BD_STICK.css;document.head.appendChild(style);
  const el=BD_STICK.el=document.createElement('div');el.id='bd-stick';el.className='bd-stick';el.hidden=true;el.setAttribute('role','img');el.setAttribute('aria-label','Joystick: drag to walk');el.innerHTML='<span class="bd-stick-knob"></span>';document.body.appendChild(el);
  document.addEventListener('pointerdown',function noticeTouch(e){if(e.pointerType==='touch'&&!BD_STICK.touchSeen){BD_STICK.touchSeen=true;BD_STICK.refresh();}},true);
  el.addEventListener('pointerdown',function grab(e){
   if(BD_STICK.pointer!==null||e.button>0)return;e.preventDefault();e.stopPropagation();
   const b=el.getBoundingClientRect();BD_STICK.center={x:b.x+b.width/2,y:b.y+b.height/2};BD_STICK.radius=Math.min(b.width,b.height)*.34;
   BD_STICK.pointer=e.pointerId;el.setPointerCapture(e.pointerId);el.classList.add('active');game.path=[];game.pending=null;BD_STICK.move(e);
  });
  el.addEventListener('pointermove',BD_STICK.move);
  for(const type of ['pointerup','pointercancel','lostpointercapture'])el.addEventListener(type,function release(e){if(e.pointerId===BD_STICK.pointer)BD_STICK.reset();});
  for(const type of ['blur','orientationchange'])window.addEventListener(type,BD_STICK.reset);
  document.addEventListener('visibilitychange',BD_STICK.reset);
  window.addEventListener('resize',BD_STICK.refresh);
  setInterval(BD_STICK.refresh,200);
 },
 css:'.bd-stick{position:fixed;left:calc(16px + env(safe-area-inset-left));bottom:calc(58px + env(safe-area-inset-bottom));z-index:15;width:116px;height:116px;border-radius:50%;border:1px solid #f4ead2b3;background:radial-gradient(circle,#1d2b2252 0 58%,#1d2b2233 59%);box-shadow:0 2px 12px #0003;touch-action:none;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;--stick-x:0px;--stick-y:0px;opacity:.78}'+
  '.bd-stick[hidden]{display:none}.bd-stick.active{opacity:.95}'+
  '.bd-stick-knob{position:absolute;left:50%;top:50%;width:48px;height:48px;margin:-24px 0 0 -24px;border-radius:50%;background:#f4ead2e6;border:1px solid #8b6026;box-shadow:0 2px 6px #0004;transform:translate(var(--stick-x),var(--stick-y));pointer-events:none}'+
  '.bd-stick:not(.active) .bd-stick-knob{transition:transform .12s ease-out}'+
  '@media(max-height:480px){.bd-stick{width:96px;height:96px;bottom:calc(40px + env(safe-area-inset-bottom))}.bd-stick-knob{width:40px;height:40px;margin:-20px 0 0 -20px}}'
};
