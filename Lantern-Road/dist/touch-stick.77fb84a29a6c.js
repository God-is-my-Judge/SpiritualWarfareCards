'use strict';
// One captured pointer owns movement; other fingers remain free for actions.
const TouchStick={
 pointer:null,x:0,y:0,element:null,radius:40,center:null,
 vector(dx,dy,radius,dead=.12){const x=dx/radius,y=dy/radius,n=Math.hypot(x,y);if(n<=dead)return{x:0,y:0};const speed=Math.min(1,(n-dead)/(1-dead));return{x:x/n*speed,y:y/n*speed};},
 get active(){return this.pointer!==null;},
 input(){return{x:this.x,y:this.y};},
 move(event){
  if(event.pointerId!==this.pointer)return;
  event.preventDefault();const dx=event.clientX-this.center.x,dy=event.clientY-this.center.y,v=this.vector(dx,dy,this.radius);
  this.x=v.x;this.y=v.y;const n=Math.hypot(dx,dy)||1,limit=Math.min(this.radius,n);
  this.element.style.setProperty('--stick-x',dx/n*limit+'px');this.element.style.setProperty('--stick-y',dy/n*limit+'px');
  activity('touch-stick');
 },
 reset(){
  const old=this.pointer;this.pointer=null;this.x=0;this.y=0;
  this.element?.classList.remove('active');this.element?.style.setProperty('--stick-x','0px');this.element?.style.setProperty('--stick-y','0px');
  if(old!==null&&this.element?.hasPointerCapture?.(old))this.element.releasePointerCapture(old);
 },
 init(){
  const el=this.element=document.querySelector('#touch-stick');if(!el)return;
  if(navigator.maxTouchPoints>0)document.documentElement?.classList.add('touch-capable');
  document.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')document.documentElement?.classList.add('touch-capable');});
  el.addEventListener('pointerdown',e=>{
   if(this.active||e.button!==0||document.querySelector('#panel').open)return;
   e.preventDefault();activity('touch-stick');const b=el.getBoundingClientRect();this.center={x:b.x+b.width/2,y:b.y+b.height/2};this.radius=Math.min(b.width,b.height)*.32;
   this.pointer=e.pointerId;el.setPointerCapture(e.pointerId);el.classList.add('active');this.move(e);
  });
  el.addEventListener('pointermove',e=>this.move(e));
  for(const type of ['pointerup','pointercancel','lostpointercapture'])el.addEventListener(type,e=>{if(e.pointerId===this.pointer)this.reset();});
  window.addEventListener('resize',()=>this.reset());document.addEventListener('fullscreenchange',()=>this.reset());
 }
};
