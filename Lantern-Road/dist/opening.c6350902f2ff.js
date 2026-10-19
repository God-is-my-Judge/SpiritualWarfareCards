'use strict';

// Authored scene behavior. Geometry is built from opening-world.3c4bf92132c7.json; no pixel
// sampling or image brightness participates in movement or collision.
const Opening = {
  room: null,
  alphas: new Map(),
  images: new Map(),
  recentRegions: [],
  travel: null,
  enabled(id) { return !!OPENING_WORLD.regions[id]; },
  prepare(id) {
    const scene = OPENING_WORLD.regions[id];
    if (!scene) return;
    for (const src of [scene.ground, ...scene.parts.map(p => p.asset)].filter(Boolean)) {
      const existing=this.images.get(src);
      if (existing && (!existing.complete || existing.naturalWidth)) continue;
      const image = new Image();
      image.src = src;
      this.images.set(src, image);
    }
    this.recentRegions=this.recentRegions.filter(region=>region!==id).concat(id).slice(-2);
    const keep = new Set(this.recentRegions.flatMap(region=>{
      const s=OPENING_WORLD.regions[region];return [s.ground,...s.parts.map(p=>p.asset)];
    }));
    for (const src of this.images.keys()) if (!keep.has(src)) this.images.delete(src);
  },
  reset(id, point) {
    this.room = null;
    this.alphas.clear();
    const scene = OPENING_WORLD.regions[id];
    if (scene) {
      this.prepare(id);
      this.room = scene.rooms.find(r => Exploration.inside(point, r.area))?.id || null;
    }
  },
  update(id, previous, point, dt, motion) {
    const scene = OPENING_WORLD.regions[id];
    if (!scene) return;
    // Two explicit threshold strips and a persistent room state provide
    // hysteresis. Roof transparency never changes the room's wall colliders.
    for (const room of scene.rooms) {
      if (!this.room && Exploration.inside(point, room.enter) && point.y < previous.y)
        this.room = room.id;
      else if (this.room === room.id && Exploration.inside(point, room.exit) && point.y > previous.y)
        this.room = null;
    }
    for (const part of scene.parts) {
      let target = 1;
      if (part.roofGroup && this.room === part.roomId) target = .04;
      else if (part.occluder && point.y < part.depth &&
        Exploration.inside({x:point.x, y:point.y-2.2}, part.occluder)) target = .23;
      const prior = this.alphas.get(part.id) ?? target;
      this.alphas.set(part.id, motion ? prior + (target-prior)*(1-Math.exp(-dt*17)) : target);
    }
  },
  image(ctx, src, b, sx, sy, alpha=1) {
    const im = this.images.get(src);
    if (!im?.complete || !im.naturalWidth) return;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.drawImage(im, b[0]*sx, b[1]*sy, b[2]*sx, b[3]*sy);
    ctx.restore();
  },
  draw(ctx, scene, sx, sy, entities, drawEntity, debug, player) {
    this.image(ctx, scene.ground, [0,0,100,100], sx, sy);
    // Contact shadows are immutable ground layers, never solids or roof parts.
    for (const shadow of scene.shadows) {
      ctx.save();ctx.translate(shadow[0]*sx,shadow[1]*sy);ctx.rotate(-.2);
      ctx.scale(shadow[2]*sx,shadow[3]*sy);
      const gradient=ctx.createRadialGradient(0,0,0,0,0,1);
      gradient.addColorStop(0,'#14251a55');gradient.addColorStop(.45,'#14251a33');gradient.addColorStop(1,'#14251a00');
      ctx.fillStyle=gradient;ctx.fillRect(-1,-1,2,2);ctx.restore();
    }
    for (const part of scene.parts.filter(p => p.ground))
      this.image(ctx, part.asset, part.bounds, sx, sy);
    const sorted = [
      ...entities.map(e => ({depth:e.y, entity:e})),
      ...scene.parts.filter(p => !p.ground).map(part => ({depth:part.depth, part}))
    ].sort((a,b) => a.depth-b.depth);
    for (const item of sorted) {
      if (item.part) {
        const p=item.part,alpha=this.alphas.get(p.id)??1;
        if(p.fixedBase&&alpha<.999){
          // Blend toward an opaque root base without changing the ground or
          // revealing a hard horizontal cut across the trunk.
          for(let band=0;band<24;band++){
            const start=band/24,end=(band+1)/24;
            const a=alpha+(1-alpha)*Math.max(0,Math.min(1,(start-.73)/.18));
            ctx.save();ctx.beginPath();ctx.rect(p.bounds[0]*sx,(p.bounds[1]+p.bounds[3]*start)*sy,p.bounds[2]*sx,p.bounds[3]*(end-start)*sy+.5);ctx.clip();
            this.image(ctx,p.asset,p.bounds,sx,sy,a);ctx.restore();
          }
        }else this.image(ctx,p.asset,p.bounds,sx,sy,alpha);
      }
      else drawEntity(item.entity);
    }
    if (debug) this.debug(ctx, scene, sx, sy, player);
  },
  debug(ctx, scene, sx, sy, player) {
    ctx.save(); ctx.font = `${Math.max(10,sx*.32)}px monospace`; ctx.lineWidth = 2;
    const shape = (s, fill, label) => {
      ctx.beginPath();
      if (s.ellipse) { const [x,y,rx,ry]=s.ellipse; ctx.ellipse(x*sx,y*sy,rx*sx,ry*sy,0,0,Math.PI*2); }
      else { s.polygon.forEach(([x,y],i) => i?ctx.lineTo(x*sx,y*sy):ctx.moveTo(x*sx,y*sy)); ctx.closePath(); }
      ctx.fillStyle=fill; ctx.fill(); ctx.strokeStyle=fill.slice(0,7); ctx.stroke();
      const p=s.polygon?.[0] || s.ellipse;
      if(label){ctx.fillStyle='#fffbea';ctx.fillText(label,p[0]*sx,p[1]*sy-5);}
    };
    for(const s of scene.terrain.walkAreas)shape(s,'#57d6b225',s.id);
    for(const s of scene.terrain.roadAreas)shape(s,'#efc75b36',s.id);
    for(const s of scene.terrain.blocked)shape(s,'#ff5b6777',s.id);
    for(const r of scene.rooms){shape(r.enter,'#43ebc377','ENTER '+r.id);shape(r.exit,'#f89a4677','EXIT');}
    for(const p of scene.parts.filter(p=>!p.ground)){
      ctx.strokeStyle='#c0a4ff';ctx.setLineDash([5,4]);
      ctx.strokeRect(p.bounds[0]*sx,p.bounds[1]*sy,p.bounds[2]*sx,p.bounds[3]*sy);
      ctx.setLineDash([]);ctx.fillStyle='#e5d6ff';ctx.fillText(p.id+' · '+(p.roofGroup||'depth '+p.depth),p.bounds[0]*sx,p.bounds[1]*sy);
    }
    for(const e of scene.exits)shape(e.area,'#6bc7ff66','TO '+e.target);
    ctx.strokeStyle='#fff';ctx.beginPath();ctx.ellipse(player.x*sx,player.y*sy,scene.terrain.footRadius*sx,scene.terrain.footRadius*.7*sy,0,0,Math.PI*2);ctx.stroke();ctx.restore();
  },
  probe(id, point) {
    const scene=OPENING_WORLD.regions[id];
    return scene ? {point, free:Exploration.free(point,scene.terrain,true),
      surface:Exploration.surface(point,scene.terrain), room:this.room,
      colliders:scene.terrain.blocked.filter(s=>Exploration.inside(point,s)).map(s=>s.id),
      groups:scene.parts.filter(p=>p.roofGroup).map(p=>({id:p.id,alpha:this.alphas.get(p.id)??1}))} : null;
  }
};

// Register only the new slice. The six existing regions and their content keep
// their coordinates, locks and saved progress.
for (const [id,scene] of Object.entries(OPENING_WORLD.regions)) {
  REGIONS[id]={name:scene.name,scale:.72,spawn:scene.spawn,art:scene.ground,
    terrain:scene.terrain,exits:scene.exits,campId:'camp'};
}
REGIONS.greenwood.exits.push({target:'woodland',point:[90,49],area:{polygon:[[38,95],[46,95],[46,98],[38,98]]},requires:[]});

// Decorate state construction rather than replacing the save schema. Existing
// runs stay in their original region. No existing save is reset for the opening.
const originalFresh=Road.fresh.bind(Road), originalRestore=Road.restore.bind(Road);
Road.fresh=function(seed){const s=originalFresh(seed);s.region='riverbank';s.player={x:34,y:37};return s;};
Road.restore=function(raw,cards,events,seed){
  const s=originalRestore(raw,cards,events,seed);
  if(raw?.version===2 && Opening.enabled(raw.region)){
    s.region=raw.region;
    const p=raw.player;
    s.player=p&&Number.isFinite(p.x)&&Number.isFinite(p.y)?{x:Math.max(2,Math.min(98,p.x)),y:Math.max(2,Math.min(98,p.y))}:{x:REGIONS[s.region].spawn[0],y:REGIONS[s.region].spawn[1]};
    for(const id of Object.keys(OPENING_WORLD.regions))if(Array.isArray(raw.regionVisited?.[id]))s.regionVisited[id]=raw.regionVisited[id].filter(n=>Number.isInteger(n)&&n>=0&&n<100);
  }else if(raw?.version===2 && !raw.region){s.region='greenwood';s.player=raw.player||{x:18,y:82};}
  return s;
};
