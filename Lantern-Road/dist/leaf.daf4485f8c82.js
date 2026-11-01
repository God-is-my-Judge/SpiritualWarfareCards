'use strict';
const Leaf={
 guardian(entry){const c=adventureMD===DEFAULT_ADVENTURES?OPENING_WORLD.regions[state.region]?.guardians?.[entry.id]:null;return c?{...entry,...c}:entry;},
 home(entry){return adventureMD===DEFAULT_ADVENTURES?OPENING_WORLD.regions[state.region]?.guardians?.[entry.id]?.home:null;},
 discovery(entry,point){
  if(scriptureMD!==DEFAULT_SCRIPTURE)return true;
  const secret=OPENING_WORLD.regions[state.region]?.secrets?.[entry.id];if(!secret)return true;
  state.revealedCards??=[];
  if(state.revealedCards.includes(entry.id))return true;
  if(Math.hypot((point.x-state.player.x)*1.25,point.y-state.player.y)<=secret.radius){state.revealedCards.push(entry.id);toast('A way-card glimmers among the leaves.');return true;}
  return false;
 },
 cardDepth(entry,y){
  const scene=OPENING_WORLD.regions[state.region],secret=scene?.secrets?.[entry.id];if(!secret)return y;
  // A revealed card glints through its concealing leaves. Walls remain above it.
  const parts=scene.parts.filter(p=>p.id===secret.partId||p.id==='eastern-root-tree'&&entry.id==='night-1');return Math.max(y,...parts.map(p=>p.depth))+.02;
 },
 sign(id){return OPENING_WORLD.regions[state.region]?.signs?.find(s=>s.id===id);},
 visit(id){const sign=this.sign(id);if(!sign)return false;
  if(state.region==='thornwake'){Arena.menu();return true;}
  show(`<h2 id="panel-title">${esc(sign.boards.map(b=>b[0]).join(' · '))}</h2><p>${esc(sign.text)}</p><button class="primary" data-action="close">Follow the road</button>`,'sign','A SIGN ALONG THE ROAD');return true;
 },
 drawEntity(p,x,y,h){
  const sign=p.entry&&this.sign(p.entry.id);if(!sign)return false;
  const z=h/120;ctx.save();ctx.translate(x,y);ctx.scale(z,z);ctx.shadowColor='#10200c77';ctx.shadowBlur=3;ctx.shadowOffsetY=2;
  ctx.fillStyle='#5c3c22';ctx.strokeStyle='#c69b58';ctx.lineWidth=1.5;ctx.fillRect(-4,-94,8,94);ctx.strokeRect(-4,-94,8,94);ctx.shadowBlur=0;
  ctx.font='bold 14px Georgia';
  const arrows={up:'↑',down:'↓',left:'←',right:'→','up-left':'↖','up-right':'↗','down-left':'↙'};
  for(let i=0;i<sign.boards.length;i++){
   const[label,dir]=sign.boards[i],text=(arrows[dir]||'')+' '+label,w=Math.max(140,ctx.measureText(text).width+25),yy=-90+i*26;
   ctx.fillStyle=i%2?'#77542e':'#825e34';ctx.beginPath();ctx.moveTo(-w/2,yy);ctx.lineTo(w/2-7,yy);ctx.lineTo(w/2+3,yy+11);ctx.lineTo(w/2-7,yy+23);ctx.lineTo(-w/2,yy+23);ctx.lineTo(-w/2-7,yy+12);ctx.closePath();ctx.fill();ctx.stroke();
   ctx.strokeStyle='#37271555';ctx.beginPath();ctx.moveTo(-w/2+10,yy+4);ctx.lineTo(w/2-13,yy+5);ctx.stroke();ctx.strokeStyle='#c69b58';ctx.fillStyle='#fff1c9';ctx.fillText(text,-w/2+10,yy+16);
  }
  ctx.fillStyle='#b29252';ctx.beginPath();ctx.ellipse(0,-96,6,7,0,0,Math.PI*2);ctx.fill();ctx.restore();return true;
 }
};
