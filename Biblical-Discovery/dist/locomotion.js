'use strict';
window.BD_MOTION={};

BD_MOTION.clearLine=function clearWalkingLine(a,b,canStand){
  const count=Math.max(1,Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/.75));
  for(let i=0;i<=count;i++){const t=i/count;if(!canStand(a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t))return false;}
  return true;

/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_MOTION.gridPoint=function reachableGridPoint(point,canStand){
  const unit=20,cx=Math.round(point[0]/unit),cy=Math.round(point[1]/unit),candidates=[];
  for(let r=0;r<=8;r++){
    for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++){
      if(r&&Math.abs(dx)!==r&&Math.abs(dy)!==r)continue;
      const x=(cx+dx)*unit,y=(cy+dy)*unit;
      if(canStand(x,y)&&BD_MOTION.clearLine(point,[x,y],canStand))candidates.push({x:cx+dx,y:cy+dy,d:Math.hypot(x-point[0],y-point[1])});
    }
    if(candidates.length){candidates.sort(function closest(a,b){return a.d-b.d;
/* Code by Daniel using ChatGPT November 15, 2026 */
});return candidates[0];}
  }
  return null;

/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_MOTION.roundCorners=function roundWalkingCorners(points,canStand){
  if(points.length<3)return points.slice(1);
  const result=[points[0]];
  for(let i=1;i<points.length-1;i++){
    const a=points[i-1],b=points[i],c=points[i+1],ab=Math.hypot(b[0]-a[0],b[1]-a[1]),bc=Math.hypot(c[0]-b[0],c[1]-b[1]);
    if(ab<.1||bc<.1)continue;
    let radius=Math.min(48,ab*.30,bc*.30),arc=null;
    for(let attempt=0;attempt<5;attempt++,radius*=.5){
      const entry=[b[0]-(b[0]-a[0])/ab*radius,b[1]-(b[1]-a[1])/ab*radius],exit=[b[0]+(c[0]-b[0])/bc*radius,b[1]+(c[1]-b[1])/bc*radius];
      const sample=[entry];
      for(let n=1;n<=10;n++){const t=n/10,u=1-t;sample.push([u*u*entry[0]+2*u*t*b[0]+t*t*exit[0],u*u*entry[1]+2*u*t*b[1]+t*t*exit[1]]);}
      let last=result.at(-1),safe=true;
      for(const p of sample){if(!BD_MOTION.clearLine(last,p,canStand)){safe=false;break;}last=p;}
      if(safe){arc=sample;break;}
    }
    if(arc)result.push(...arc);else result.push(b);
  }
  result.push(points.at(-1));
  return result.slice(1);

/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_MOTION.route=function continuousWalkingRoute(start,destination,options){
  const {canStand,nearestFree}=options,target=nearestFree(...destination);
  if(BD_MOTION.clearLine(start,target,canStand))return [target];
  const first=BD_MOTION.gridPoint(start,canStand),last=BD_MOTION.gridPoint(target,canStand);if(!first||!last)return [];
  const cols=Math.ceil((options.width||1536)/20)+3,unit=20,key=function gridKey(x,y){return y*cols+x;
/* Code by Daniel using ChatGPT November 15, 2026 */
};
  const open=[{x:first.x,y:first.y,g:0,f:0}],cost=new Map([[key(first.x,first.y),0]]),parents=new Map(),closed=new Set();let found=null;
  while(open.length&&closed.size<30000){
    let best=0;for(let i=1;i<open.length;i++)if(open[i].f<open[best].f)best=i;
    const node=open.splice(best,1)[0],id=key(node.x,node.y);if(closed.has(id))continue;closed.add(id);
    if(node.x===last.x&&node.y===last.y){found=node;break;}
    for(const [dx,dy]of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){
      const x=node.x+dx,y=node.y+dy,nid=key(x,y);
      if(x<0||y<0||x>=cols||y>Math.ceil((options.height||1024)/20)+3||closed.has(nid)||!canStand(x*unit,y*unit))continue;
      if(!BD_MOTION.clearLine([node.x*unit,node.y*unit],[x*unit,y*unit],canStand))continue;
      const g=node.g+(dx&&dy?Math.SQRT2:1);if(g>=(cost.get(nid)??Infinity))continue;
      cost.set(nid,g);parents.set(nid,id);open.push({x,y,g,f:g+Math.hypot(x-last.x,y-last.y)});
    }
  }
  if(!found)return [];
  let id=key(found.x,found.y);const raw=[target,[last.x*unit,last.y*unit]];
  while(id!==key(first.x,first.y)){id=parents.get(id);if(id===undefined)return [];raw.push([(id%cols)*unit,Math.floor(id/cols)*unit]);}
  raw.push(start);raw.reverse();
  const clear=[start];let current=0;
  while(current<raw.length-1){let far=raw.length-1;while(far>current+1&&!BD_MOTION.clearLine(raw[current],raw[far],canStand))far--;clear.push(raw[far]);current=far;}
  return BD_MOTION.roundCorners(clear,canStand);

/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_MOTION.approach=function approachSpeed(current,target,maximumChange){
  return current+Math.max(-maximumChange,Math.min(maximumChange,target-current));

/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_MOTION.advance=function advanceWalker(game,dt,canStand){
  const p=game.player,oldX=p.x,oldY=p.y,keys=game.keys;
  let x=0,y=0,arrived=null;
  if(keys.has('arrowleft')||keys.has('a')||game.touchMove==='left')x--;
  if(keys.has('arrowright')||keys.has('d')||game.touchMove==='right')x++;
  if(keys.has('arrowup')||keys.has('w')||game.touchMove==='up')y--;
  if(keys.has('arrowdown')||keys.has('s')||game.touchMove==='down')y++;
  if(game.padMove){x+=game.padMove[0];y+=game.padMove[1];}
  const amount=Math.hypot(x,y),depth=BD_ART.depthScale(p.y),maximum=BD_ART.travelerHeight(p.y)*(256.1/241.1);
  if(amount){
    game.path=[];game.pending=null;p.speed=0;
    p.vx=BD_MOTION.approach(p.vx||0,x/amount*maximum,1550*depth*dt);p.vy=BD_MOTION.approach(p.vy||0,y/amount*maximum,1550*depth*dt);
  }else if(game.path.length){
    p.vx=0;p.vy=0;
    let remaining=0,last=[p.x,p.y];for(const next of game.path){remaining+=Math.hypot(next[0]-last[0],next[1]-last[1]);last=next;}
    const desired=Math.min(maximum,Math.sqrt(2*1250*depth*remaining));p.speed=BD_MOTION.approach(p.speed||0,desired,1500*depth*dt);
    let budget=Math.min(remaining,p.speed*dt);
    while(game.path.length&&budget>0){
      const next=game.path[0],dx=next[0]-p.x,dy=next[1]-p.y,distance=Math.hypot(dx,dy),step=Math.min(distance,budget);
      if(distance<.001){game.path.shift();continue;}
      const nx=p.x+dx/distance*step,ny=p.y+dy/distance*step;
      if(!canStand(nx,ny)){game.path=[];game.pending=null;p.speed=0;break;}
      p.x=nx;p.y=ny;budget-=step;
      if(step>=distance-.001)game.path.shift();
    }
    if(remaining<.35&&game.path.length){const last=game.path.at(-1);if(canStand(...last)){p.x=last[0];p.y=last[1];}game.path=[];}
    if(!game.path.length){p.speed=0;arrived=game.pending;game.pending=null;}
  }else{
    p.speed=0;p.vx=BD_MOTION.approach(p.vx||0,0,1850*depth*dt);p.vy=BD_MOTION.approach(p.vy||0,0,1850*depth*dt);
  }
  if(!game.path.length&&!arrived&&(p.vx||p.vy)){
    const nx=p.x+p.vx*dt,ny=p.y+p.vy*dt;
    if(canStand(nx,ny)){p.x=nx;p.y=ny;}else{if(canStand(nx,p.y))p.x=nx;else p.vx=0;if(canStand(p.x,ny))p.y=ny;else p.vy=0;}
  }
  const dx=p.x-oldX,dy=p.y-oldY,distance=Math.hypot(dx,dy);p.walking=distance>.015;
  const previousBlend=p.walkBlend||0;p.walkBlend=BD_MOTION.approach(previousBlend,p.walking?1:0,dt*8);
  if(p.walking){
    const desired=Math.atan2(dy,dx),old=p.facingAngle??Math.atan2(p.facingY,p.facingX),difference=Math.atan2(Math.sin(desired-old),Math.cos(desired-old));
    const turned=old+difference*(1-Math.exp(-18*dt));p.facingAngle=Math.atan2(Math.sin(turned),Math.cos(turned));p.facingX=Math.cos(p.facingAngle);p.facingY=Math.sin(p.facingAngle);
    p.gaitPhase=((p.gaitPhase||0)+distance/(BD_ART.travelerHeight(p.y)*.72))%1;
  }
  if(distance||previousBlend!==p.walkBlend)game.dirty=true;
  if(arrived)arrived();

/* Code by Daniel using ChatGPT November 16, 2026 */
};
