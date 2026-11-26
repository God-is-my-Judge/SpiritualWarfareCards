'use strict';

// Ambient behavior uses a seeded pair of six-sided dice, never a live AI.
// Default sums: 2–4 pause (6/36), 5–9 follow route (24/36), 10–12 wander (6/36).
const Life = {
  rest:null,
  roll(random){return 2+Math.floor(random()*6)+Math.floor(random()*6);},
  choice(sum,config){return sum<=(config.idleMax??4)?'pause':sum<=(config.routeMax??9)?'route':'wander';},
  defaultConfig(entry,actor,map){
    if(entry.kind!=='npc')return null;
    if(actor.ambientConfig)return actor.ambientConfig;
    const candidates=entry.patrol?.length?entry.patrol:[[actor.home.x,actor.home.y],[actor.home.x+.8,actor.home.y],[actor.home.x,actor.home.y+.7]];
    const route=candidates.filter(([x,y])=>Exploration.free({x,y},map,true)&&Exploration.surface({x,y},map)!=='river');
    if(!route.length)return null;
    const xs=route.map(p=>p[0]),ys=route.map(p=>p[1]),left=Math.max(2,Math.min(...xs)-1.5),right=Math.min(98,Math.max(...xs)+1.5),top=Math.max(2,Math.min(...ys)-1.5),bottom=Math.min(98,Math.max(...ys)+1.5);
    return actor.ambientConfig={route,area:{polygon:[[left,top],[right,top],[right,bottom],[left,bottom]]},speed:entry.patrol_speed||.65,idleMax:5,routeMax:10,pause:[1.5,5],wanderRadius:1.3};
  },
  inArea(point,area,radius=.34){
    return [[0,0],[radius,0],[-radius,0],[0,radius*.7],[0,-radius*.7]].every(([x,y])=>Exploration.inside({x:point.x+x,y:point.y+y},area));
  },
  actor(actor,entry,player,dt,map,config,seed,open=true){
    if(!actor.ambient){actor.ambient={random:Road.rng(seed+'|resident|'+entry.id),wait:0,target:null,route:0,blocked:0,mode:'pause'};}
    const a=actor.ambient,near=Math.hypot(player.x-actor.x,(player.y-actor.y)*.72);
    actor.moving=false;
    // Stop to talk; residents do not push a traveler aside or block a route.
    if(near<1.65)return actor;
    if(a.wait>0){a.wait=Math.max(0,a.wait-dt);return actor;}
    if(!a.target){
      a.mode=this.choice(this.roll(a.random),config);
      if(a.mode==='pause'){
        a.wait=config.pause[0]+a.random()*(config.pause[1]-config.pause[0]);return actor;
      }
      if(a.mode==='route'){
        const p=config.route[a.route++%config.route.length];a.target={x:p[0],y:p[1]};
      }else{
        for(let attempt=0;attempt<20;attempt++){
          const angle=a.random()*Math.PI*2,r=Math.sqrt(a.random())*config.wanderRadius;
          const p={x:actor.home.x+Math.cos(angle)*r,y:actor.home.y+Math.sin(angle)*r};
          if(this.inArea(p,config.area,map.footRadius)&&Exploration.free(p,map,open)&&Exploration.surface(p,map)!=='river'){a.target=p;break;}
        }
        if(!a.target){a.wait=1;return actor;}
      }
    }
    const dx=a.target.x-actor.x,dy=a.target.y-actor.y;
    if(Math.hypot(dx,dy)<.15){a.target=null;a.wait=.25+a.random()*.6;return actor;}
    const next=Exploration.move(actor,{x:dx,y:dy},dt,map,open,config.speed);
    const travel=Math.hypot(next.x-actor.x,next.y-actor.y);
    if(!this.inArea(next,config.area,map.footRadius)||Exploration.surface(next,map)==='river'||travel<.00001){
      a.blocked+=dt;if(a.blocked>.65){a.target=null;a.wait=.7;a.blocked=0;}return actor;
    }
    actor.direction=Exploration.direction8(next.x-actor.x,next.y-actor.y,actor.direction);
    actor.step+=Math.hypot((next.x-actor.x)*1.5,next.y-actor.y)*2;
    actor.x=next.x;actor.y=next.y;actor.moving=true;a.blocked=0;return actor;
  },
  enterBed(bed,point){
    if(this.rest)return this.leaveBed();
    this.rest={phase:'entering',elapsed:0,duration:bed.duration,from:{...point},via:{x:point.x,y:bed.rest[1]},to:{x:bed.rest[0],y:bed.rest[1]},returnPoint:{...point},bed};
    clearInput();Walker.moving=false;
  },
  leaveBed(){
    if(!this.rest||this.rest.phase==='leaving')return;
    const prior=this.rest;
    this.rest={...prior,phase:'leaving',elapsed:0,from:{...state.player},via:{x:prior.returnPoint.x,y:state.player.y},to:prior.returnPoint};
    clearInput();
  },
  updateRest(dt,input){
    const r=this.rest;if(!r)return null;
    if(r.phase==='resting'){
      if(input.x||input.y)this.leaveBed();
      return {...state.player};
    }
    r.elapsed+=dt;
    const t=Math.min(1,r.elapsed/r.duration),ease=t*t*(3-2*t);
    // Reach pillow height beside the bed, then slide sideways under the fold.
    // Leaving reverses that route, keeping the head above the covers.
    const a=Math.hypot((r.via.x-r.from.x)*1.5,r.via.y-r.from.y),b=Math.hypot((r.to.x-r.via.x)*1.5,r.to.y-r.via.y);
    const distance=ease*(a+b),first=distance<a,from=first?r.from:r.via,to=first?r.via:r.to;
    const progress=first?distance/(a||1):(distance-a)/(b||1);
    const point=t===1?{...r.to}:{x:from.x+(to.x-from.x)*progress,y:from.y+(to.y-from.y)*progress};
    if(t===1){
      if(r.phase==='entering'){r.phase='resting';state.hearts=5;hud();}
      else this.rest=null;
    }
    return point;
  },
  safeSavePoint(){return this.rest?.returnPoint||state.player;}
};

const standingImage=new Image();standingImage.src=OPENING_WORLD.standing.asset;
function drawStanding(kind,x,y,height,opacity=1){
  if(!standingImage.complete||!standingImage.naturalWidth){drawWalker(kind,x,y,height,'down',1,opacity);return;}
  const [l,t,w,h]=OPENING_WORLD.standing.frames[kind],scale=height*.84/h;
  ctx.save();ctx.globalAlpha=opacity;
  ctx.drawImage(standingImage,l,t,w,h,x-w*scale/2,y-h*scale,w*scale,h*scale);ctx.restore();
}
