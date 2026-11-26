'use strict';
// Scene geometry and discovery behavior for Christmas Lantern 09.
const DEPTH09 = {
  rink:[35,94,.40,1.58], sleigh:[8,94,.18,1.13], pinepass:[12,94,.18,1.12],
  snowgarden:[6,94,.18,1.16], mountain:[47,94,.68,1.14], nativity:[45,94,.86,1.05]
};
// Inward landing points beside the reciprocal painted doorway; mounted arrivals stay separate.
const FRAME_ARRIVALS25={"hall":{"gifts":[16,58.5],"closet":[39,59],"rink":[86,57],"hallway":[50,92]},"gifts":{"hall":[51,92],"ornaments":[86,55]},"closet":{"hall":[12.5,58],"nativity":[75,74]},"nativity":{"closet":[50,92]},"ornaments":{"gifts":[14.5,56]},"rink":{"hall":[14,40.5],"sleigh":[30,44]},"sleigh":{"hallway":[50,92],"rink":[50,92],"clockshop":[20.5,61],"workshop":[82,61],"pinepass":[50,21]},"hallway":{"hall":[50,53],"workshop":[13,54],"clockshop":[87,54],"sleigh":[50,92]},"workshop":{"hallway":[11,69],"sleigh":[89,65]},"clockshop":{"hallway":[12,76],"sleigh":[50,92]},"cave":{"pinepass":[50,92],"mountain":[82,45]},"pinepass":{"sleigh":[50,92],"cave":[86,41],"snowgarden":[28,26]},"snowgarden":{"pinepass":[51,92],"grandmother":[20,45]},"grandmother":{"snowgarden":[12,62],"kitchen":[89,73]},"kitchen":{"grandmother":[12,71]},"mountain":{"cave":[40,92]}};
const PICTURES09 = [
  ['christmas-table','A place kept at the table','A shared table, lamplight, and room for a neighbor. Original oil-style illustration.'],
  ['winter-cottage','A light through the snow','A small cottage keeps its window bright. Original pencil and watercolor illustration.'],
  ['train-departure','Enough for the journey','Fuel, water, and willing friends at the winter station. Original watercolor illustration.'],
  ['train-rescue','The engine comes back','The coach waits safely while the railway crew brings help. Original ink illustration.'],
  ['train-home','Parcels for the village','The long journey ends in welcome. Original gouache illustration.']
];
const GIFT_ROOMS09 = ['hall','closet','ornaments','hallway','workshop','clockshop','sleigh','pinepass','snowgarden','grandmother','kitchen','cave','mountain','rink'];
const GIFT_POINTS09 = {
 hall:[[48,71],[83,88]],closet:[[58,88],[28,67]],ornaments:[[58,84],[83,79]],hallway:[[34,69],[72,80]],
 workshop:[[67,76],[20,87]],clockshop:[[80,78],[39,74]],sleigh:[[24,82],[76,77]],pinepass:[[37,66],[67,82]],
 snowgarden:[[66,72],[83,80]],grandmother:[[34,73],[79,84]],kitchen:[[43,78],[82,88]],
 cave:[[23,80],[78,78]],mountain:[[53,77],[64,85]],rink:[[88,47],[17,48]]
};
function reference09(card) {
  return card.title.replace(/\s*\([^)]*\)\s*$/,'').replace(/–/g,'-');
  /* Code by Daniel using ChatGPT November 12, 2026 */
}
function depthScale(point=state.player,room=state.room) {
  const r=ROOMS[room], [back,front,small,large]=DEPTH09[room]||[r.floor,94,.91,1.08];
  let scale=small+(large-small)*clamp((point.y-back)/(front-back));
  if(room==='snowgarden'){
    // The cottage forecourt is nearby despite sitting high in the painted frame.
    // Blend its ground plane into the receding lane on the right, without a size jump.
    const forecourt=1+.16*clamp((point.y-37)/(94-37)),lane=ease((point.x-42)/(77-42));
    scale=forecourt+(scale-forecourt)*lane;
  }
  if(room==='pinepass')scale*=1-.25*clamp((Math.abs(point.x-51)-10)/27);
  return scale;
  /* Code by Daniel using ChatGPT November 13, 2026 */
}
function onIce(point=state.player) {
  if(state.room!=='rink'){g.iceSurface28=null;return false;}
  const polygon=ROOMS.rink.iceAreas[0].polygon,inside=ROOMS.rink.iceAreas.some(shape=>{return Exploration.inside(point,shape);/* Code by Daniel using ChatGPT November 18, 2026 */});
  if(arguments.length)return inside;
  const prior=g.iceSurface28;if(prior!==null&&prior!==undefined&&prior!==inside){let distance=Infinity;for(let i=0;i<polygon.length;i++){const a=polygon[i],b=polygon[(i+1)%polygon.length],dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((point.x-a[0])*dx+(point.y-a[1])*dy)/(dx*dx+dy*dy)));distance=Math.min(distance,Math.hypot(point.x-a[0]-dx*t,point.y-a[1]-dy*t));}if(distance<.24)return prior;}
  g.iceSurface28=inside;return inside;
  /* Code by Daniel using ChatGPT November 18, 2026 */}
function installRevision09() {
  const gallery=ROOMS.hallway;
  Object.assign(gallery.spots.find(function workshopDoor(s){return s.id==='gallery-workshop';/* Code by Daniel using ChatGPT November 12, 2026 */}),{x:6,y:51,gate:[3,44,6,18]});
  Object.assign(gallery.spots.find(function clockDoor(s){return s.id==='gallery-clock';/* Code by Daniel using ChatGPT November 12, 2026 */}),{x:94,y:51,gate:[91,44,6,18]});
  ROOMS.workshop.objects[0].h=26;
  Object.assign(ROOMS.workshop.spots.find(function keeper25(t){return t.id==='keeper';/* Code by Daniel using ChatGPT November 14, 2026 */}),{hit:[26.5,35.5,9,28],mark:[31,34]});
  for(const o of ROOMS.clockshop.objects)o.h*=1.18;
  ROOMS.grandmother.objects[0].h=25;
  Object.assign(ROOMS.grandmother.spots[0],{hit:[1,23,13,43]});
  Object.assign(ROOMS.grandmother.spots[1],{hit:[62,44,13,22]});
  Object.assign(ROOMS.grandmother.spots[2],{x:46,y:62,hit:[38,28,16,31],mark:[46,35]});
  ROOMS.grandmother.help='Visit Grandmother by the fire, read your letter, or step through to the kitchen.';
  ROOMS.clockshop.blocked=[
    {polygon:[[15,49],[84,49],[84,58],[31,58],[31,63],[15,63]]},
    {polygon:[[84,56],[96,56],[96,70],[85,69]]},
    {polygon:[[3,82],[29,87],[35,80],[37,81],[35,95],[3,95]]},
    {polygon:[[63,81],[65,80],[73,87],[97,82],[97,95],[65,95]]},
    {polygon:[[4,91],[30,94],[29,96],[4,94]]}
  ];
  ROOMS.rink.iceAreas=[{polygon:[[3.5,49],[10,43.7],[18,40.6],[25,38.5],[34,36],[43,35],[52,34.7],[63,34.5],[74,35.1],[83,36.6],[91,39],[97,42.5],[98,54],[95,69],[85,81],[69,89],[46,94],[29,88],[16,78],[5,65]]}];
  ROOMS.rink.walkAreas=[...ROOMS.rink.iceAreas,
    {polygon:[[3,38],[22,35.4],[33,36.4],[25,38.1],[18,40.2],[10,43.3],[3,48.8]]},
    {polygon:[[76,33.6],[96.8,34],[98,42.2],[91,38.6],[83,36.2]]}
  ];
  // The large foreground lamp is part of the painted plate; keep feet behind its plinth.
  ROOMS.rink.blocked=[{polygon:[[81,79],[88,77],[92,83],[87,88],[80,88]]}];
  ROOMS.rink.arrivals.hall=[14,40.5];
  Object.assign(ROOMS.rink.spots.find(s=>{return s.id==='pond-hall';/* Code by Daniel using ChatGPT November 18, 2026 */}),{x:13,y:40.5});
  ROOMS.rink.spawn=[50,64];
  ROOMS.rink.help='Skate on the ice; walk on the snow.';
  Object.assign(ROOMS.rink.spots.find(function shoreDoor(s){return s.id==='pond-shore-lane';/* Code by Daniel using ChatGPT November 12, 2026 */}),{x:27,y:39,gate:[23,36,12,5]});
  // Entrances follow the painted steps, including the natural upward approach.
  Object.assign(ROOMS.sleigh.spots.find(function clockDoor16(s){return s.id==='lane-clock';/* Code by Daniel using ChatGPT November 13, 2026 */}),{gate:[3,54,15,9],entryDirections:['left','back']});
  Object.assign(ROOMS.sleigh.spots.find(function toyDoor16(s){return s.id==='lane-workshop';/* Code by Daniel using ChatGPT November 13, 2026 */}),{gate:[85,54,12,10],entryDirections:['right','back']});
  Object.assign(ROOMS.sleigh.spots.find(function woodsDoor16(s){return s.id==='lane-pass';/* Code by Daniel using ChatGPT November 13, 2026 */}),{x:50,y:14,mark:[50,11],gate:[45,12,12,5],rideGate:[45,12,12,5],rideArrival:[50,84,4]});
  Object.assign(ROOMS.pinepass.spots.find(function bridgeDoor16(s){return s.id==='pass-bridge';/* Code by Daniel using ChatGPT November 13, 2026 */}),{rideGate:[27,85.4,50,8],rideArrival:[50,25,0]});
  Object.assign(ROOMS.pinepass.spots.find(function grandmotherRoad16(s){return s.id==='pass-grandmother';/* Code by Daniel using ChatGPT November 13, 2026 */}),{x:28,y:17,mark:[28,13],hit:[23,10,10,12],gate:[23,14,10,7],rideGate:[23,14,10,7],rideArrival:[51,84,4]});
  ROOMS.pinepass.walkAreas.push({polygon:[[31,45],[41,40],[35,29],[30,22],[30,13],[25,11],[24,21],[28,32]]});
  ROOMS.pinepass.arrivals.snowgarden=[28,26];
  Object.assign(ROOMS.snowgarden.spots.find(function cottageDoor16(s){return s.id==='garden-cottage';/* Code by Daniel using ChatGPT November 13, 2026 */}),{x:20,y:37,mark:[20,29],gate:[12,34,15,8]});
  Object.assign(ROOMS.snowgarden.spots.find(function gardenRoad16(s){return s.id==='garden-road';/* Code by Daniel using ChatGPT November 13, 2026 */}),{rideGate:[4,85.4,92,9],rideArrival:[28,26,0]});
  ROOMS.snowgarden.walkAreas=[{polygon:[[4,39],[34,39],[43,36],[62,32],[72,30],[79,38],[96,43],[96,94],[4,94]]},{polygon:[[66,40],[77,39],[91,18],[95,6],[89,4],[82,17],[71,28]]}];
  ROOMS.snowgarden.spots.push({id:'garden-gate',x:89,y:11,mark:[89,8],to:'pinepass',label:'Through the garden gate to the pine road',edgeDirection:'back',gate:[84,8,11,8],rideGate:[84,10,11,7],rideArrival:[28,26,0]});
  // Door zones span the opening. Each corridor lets boots enter the doorway.
  for(const r of Object.values(ROOMS)) {
    if(!r.walkAreas)r.walkAreas=[{polygon:[[4,r.floor],[96,r.floor],[96,94],[4,94]]}];
    for(const s of r.spots) {
      if(!s.to&&!s.wardrobe&&s.id!=='cave-back')continue;
      if(s.wardrobe){
        if(r===ROOMS.nativity){s.y=97.3;r.walkAreas.push({polygon:[[42,90.8],[58,90.8],[58,98.4],[42,98.4]]});}
        continue;
      }
      if(!s.edgeDirection)s.edgeDirection=s.edge?'front':s.x<18?'left':s.x>82?'right':'back';
      if(s.edgeDirection==='front'){
        s.y=97.3;s.gate=[4,FRONT_WALK23,92,1.4];
        r.walkAreas.push({polygon:[[3,90.8],[97,90.8],[97,98.4],[3,98.4]]});
      }
      if(!s.gate) {
        const [x,y]=[s.x,s.y],d=s.edgeDirection;
        s.gate=d==='left'?[Math.max(2,x-2),y-7,4,14]:d==='right'?[Math.min(94,x-2),y-7,4,14]:d==='front'?[5,91.8,90,3]:[x-5,y-1.7,10,3.4];
      }
      const [x,y,w,h]=s.gate;
      r.walkAreas.push({polygon:[[Math.max(1.6,x-1),Math.max(2,y-1)],[Math.min(98.4,x+w+1),Math.max(2,y-1)],[Math.min(98.4,x+w+1),Math.min(97,y+h+1)],[Math.max(1.6,x-1),Math.min(97,y+h+1)]]});
    }
  }
  ROOMS.cave.walkAreas.push({polygon:[[76,37.3],[88,37.3],[88,50],[76,50]]});
  for(const [room,arrivals]of Object.entries(FRAME_ARRIVALS25))Object.assign(ROOMS[room].arrivals,arrivals);
  // Real, visible objects replace descriptions of a table that is absent in the art.
  Object.assign(ROOMS.cave.spots.find(function note(s){return s.id==='rime-letter';/* Code by Daniel using ChatGPT November 12, 2026 */}),{label:'A creased note on the ice',hit:[37,51,11,12]});
  SNOW_ITEMS.coal.point=[80,80];
  SNOW_ITEMS.scarf.point=[48,63]; // clear of the bookshelf and candle so Interact reaches it. Claude, November 18, 2026
  installStories09();
  syncMonsterName09();
  /* Code by Daniel using ChatGPT November 18, 2026 */}
function targetHitDistance(t,p) {
  const mark=t.mark||[t.x,t.y],star=Math.hypot((mark[0]-p.x)*1.5,mark[1]-p.y);
  if(star<=3.8)return star*.05;
  const h=t.hit;
  if(h&&p.x>=h[0]&&p.x<=h[0]+h[2]&&p.y>=h[1]&&p.y<=h[1]+h[3])return .5+Math.hypot((h[0]+h[2]/2-p.x)*1.5,h[1]+h[3]/2-p.y)*.01;
  return 1+Math.hypot((t.x-p.x)*1.5,t.y-p.y);
  /* Code by Daniel using ChatGPT November 12, 2026 */
}
function clearWalkSegment(a,b,map) {
  const steps=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.y-a.y)/.35));
  for(let n=1;n<=steps;n++)if(!Exploration.free({x:a.x+(b.x-a.x)*n/steps,y:a.y+(b.y-a.y)*n/steps},map,true))return false;
  return true;
  /* Code by Daniel using ChatGPT November 12, 2026 */
}
function routeTo09(start,target,map) {
  // A connected flood search keeps the chosen stand point reachable from this side of furniture.
  const unit=1.5,origin={...start},queue=[origin],parents=[-1],seen=new Set(),limit=6500;
  let closest=0,best=Math.hypot(start.x-target.x,start.y-target.y);
  for(let i=0;i<queue.length&&i<limit;i++) {
    const p=queue[i],distance=Math.hypot(p.x-target.x,p.y-target.y);
    if(distance<best){best=distance;closest=i;}
    if(best<.8)break;
    for(const [dx,dy]of [[unit,0],[-unit,0],[0,unit],[0,-unit]]) {
      const q={x:p.x+dx,y:p.y+dy},key=Math.round((q.x-origin.x)/unit)+','+Math.round((q.y-origin.y)/unit);
      if(seen.has(key))continue;
      seen.add(key);
      if(Exploration.free(q,map,true)&&clearWalkSegment(p,q,map)){parents.push(i);queue.push(q);}
    }
  }
  const path=[];
  for(let n=closest;n>=0;n=parents[n])path.unshift(queue[n]);
  const end=path[path.length-1];
  if(Exploration.free(target,map,true)&&clearWalkSegment(end,target,map)){path.push({x:target.x,y:target.y});best=0;}
  return {path:path.slice(1),end:path[path.length-1],distance:best};
  /* Code by Daniel using ChatGPT November 12, 2026 */
}
function vehicleBoardingPoint() {
  const v=state.vehicle,map=roomMap(),candidates=[];
  for(let radius=4;radius<=9;radius+=1)for(let n=0;n<16;n++){
    const p={x:v.x+Math.cos(n*Math.PI/8)*radius,y:v.y+Math.sin(n*Math.PI/8)*radius};
    if(Exploration.free(p,map,true))candidates.push(p);
  }
  candidates.sort(function nearestBoarding(a,b){return Math.hypot(a.x-state.player.x,a.y-state.player.y)-Math.hypot(b.x-state.player.x,b.y-state.player.y);/* Code by Daniel using ChatGPT November 12, 2026 */});
  // The generic path search chooses a reachable side even if the nearest side is fenced off.
  if(candidates.length)return candidates[0];
  return {x:v.x,y:v.y+6};
  /* Code by Daniel using ChatGPT November 12, 2026 */
}
function syncMonsterName09() {
  const known=state.tales.nameKnown||state.tales.rescued;
  ROOMS.cave.title=known?'Rime’s Snowy Keeping Place':'The Snow Monster’s Cave';
  ROOMS.pinepass.help=known?'Ride onward, visit the carollers, or take the lantern road to Rime’s cave.':'Ride onward, visit the carollers, or take the lantern road to the Snow Monster’s cave.';
  for(const s of ROOMS.pinepass.spots)if(s.id==='pass-cave')s.label=known?'Rime’s lantern-lit cave':'The Snow Monster’s cave';
  if(state.room==='cave')$('#room-title').textContent=ROOMS.cave.title;
  /* Code by Daniel using ChatGPT November 12, 2026 */
}
function giftCards09() {
  const result={tree:[],scattered:[],library:[]};
  for(const card of cards) {
    const ref=reference09(card);
    if(ref==='Luke 19:1-10'&&!result.library.length){result.library.push(card);continue;}
    if(/^(James 1:17|2 Corinthians 9:15|John 3:16|1 John 4:9|Ephesians 2:8-10|Matthew 2:10-11)$/.test(ref)&&result.tree.length<6)result.tree.push(card);
    else result.scattered.push(card);
  }
  // Custom collections retain discoverability even when none uses the bundled gift references.
  return result;
  /* Code by Daniel using ChatGPT November 12, 2026 */
}
function discoveryGifts09(all) {
  const catalog=giftCards09(),room=state.room,slot=GIFT_ROOMS09.indexOf(room),places=GIFT_POINTS09[room];
  if(room==='gifts') {
    const points=[[19,64],[30,66],[40,64],[20,80],[33,80],[45,80]];
    for(let i=0;i<catalog.tree.length;i++){const p=points[i];all.push({id:catalog.tree[i].id,x:p[0],y:p[1],card:catalog.tree[i],gift:true,label:'Unwrap a gift about giving'});}
  }
  if(slot>=0) {
    const layout=giftPages18(),pages=layout.length,page=Math.min(g.giftPage||0,pages-1),capacity=GIFT_ROOMS09.length*3;
    for(let n=0;n<3;n++) {
      const i=page*capacity+slot+n*GIFT_ROOMS09.length,entry=layout[page][room][n],card=entry?.card;if(!card)continue;
      // A stable hash scatters the pair slightly without moving them on every visit.
      const jitter=(parseInt(Road.hash(card.id),36)%100)/100;
      const base=n<2?places[n]:room==='rink'?[93,40]:[(places[0][0]+places[1][0])/2,(places[0][1]+places[1][1])/2-3];
      const p={x:base[0]+jitter*.9,y:base[1]+jitter*.6};
      all.push({id:card.id,x:p.x,y:p.y,hit:[p.x-2.8,p.y-5,5.6,6],card,gift:true,smallGift:true,selection18:entry.kind,holly:DEPTH09[room]!==undefined,picture:i%5===4?Math.floor(i/5)%PICTURES09.length:null,label:known(card)?'Reopen this little gift':'A little present tucked away'});
    }
    if(pages>1)all.push({id:'gift-page',x:ROOMS[room].spawn[0],y:Math.min(89,ROOMS[room].spawn[1]),nextPage:true,label:'Little presents'});
  }
  return all;
  /* Code by Daniel using ChatGPT November 14, 2026 */
}
function showPictureGift09(t) {
  const pic=PICTURES09[t.picture];
  showPanel('<div class="picture-gift"><h2 id="panel-title">'+escapeHTML(pic[1])+'</h2><img src="assets/pictures/'+pic[0]+'.webp" alt="'+escapeHTML(pic[2])+'"><p>'+escapeHTML(pic[2])+'</p><button class="primary" id="picture-word">Open the Scripture</button></div>','A LITTLE PICTURE TO KEEP');
  $('#picture-word').onclick=function pictureWord(){discover(t.card);/* Code by Daniel using ChatGPT November 12, 2026 */};
  /* Code by Daniel using ChatGPT November 18, 2026 */}
function drawHolly09(x,y,size=1) {
  ctx.save();ctx.translate(x,y);ctx.scale(size,size);
  for(const [dx,angle]of [[-15,-.5],[13,.5]]) {
    ctx.save();ctx.translate(dx,0);ctx.rotate(angle);ctx.fillStyle='#204c38';ctx.strokeStyle='#839d60';ctx.lineWidth=.7;
    ctx.beginPath();ctx.moveTo(0,-14);ctx.lineTo(8,-7);ctx.lineTo(5,-3);ctx.lineTo(12,1);ctx.lineTo(6,5);ctx.lineTo(7,11);ctx.lineTo(0,15);ctx.lineTo(-6,10);ctx.lineTo(-5,5);ctx.lineTo(-11,0);ctx.lineTo(-5,-4);ctx.lineTo(-7,-9);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();
  }
  ctx.fillStyle='#b63b3f';for(const [dx,dy]of [[-4,-1],[4,-2],[0,5]]){ctx.beginPath();ctx.arc(dx,dy,4,0,Math.PI*2);ctx.fill();}ctx.restore();
  /* Code by Daniel using ChatGPT November 12, 2026 */
}
function drawCaveProps09(){
 if(state.room!=='cave')return;worldFrame22('letter',42*15.36,60*10.24,51,false,-.17);if(!state.tales.bag.tin&&!state.tales.converted)worldFrame22('tinClosed',72*15.36,69*10.24,48);
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function depthWalkAtlas09(image) {
 const cw=image.naturalWidth/2,ch=image.naturalHeight/4,frames=[],heights=[];
 for(let row=0;row<4;row++)for(let col=0;col<2;col++){
  const out=document.createElement('canvas');out.width=Math.ceil(cw);out.height=Math.ceil(ch);
  const c=out.getContext('2d',{willReadFrequently:true});c.drawImage(image,col*cw,row*ch,cw,ch,0,0,out.width,out.height);
  const pixels=c.getImageData(0,0,out.width,out.height).data;let top=out.height,bottom=0;
  for(let y=0;y<out.height;y++)for(let x=0;x<out.width;x++)if(pixels[(y*out.width+x)*4+3]>=32){top=Math.min(top,y);bottom=Math.max(bottom,y);}
  heights.push(bottom-top+1);frames.push({canvas:out,w:out.width,h:out.height,rootX:out.width*.5,rootY:bottom+1});
 }
 heights.sort(function heightOrder(a,b){return a-b;/* Code by Daniel using ChatGPT November 12, 2026 */});
 const bodyHeight=(heights[3]+heights[4])/2;
 for(const frame of frames)frame.bodyHeight=bodyHeight;
 return frames;
 /* Code by Daniel using ChatGPT November 12, 2026 */
}
// Trace only the painted lantern. The old broad clip also repainted ice over the elf.
const POND_LAMP_OUTLINE28=[[86.9,69],[88.5,69.9],[89,70.7],[90.4,71.9],[91.1,72.7],[90.6,73.7],[90.2,80.7],[89.7,81.6],[88.1,82.3],[86,82.3],[84.3,81.1],[83.6,79.8],[83.5,73.9],[83.2,73],[83.8,72],[85,70.7],[85.6,69.9]];
function drawPondLamp09() {
 if(state.room!=='rink'||state.player.y>=84)return;
 ctx.save();ctx.beginPath();for(const [i,p]of POND_LAMP_OUTLINE28.entries()){if(i)ctx.lineTo(p[0]*15.36,p[1]*10.24);else ctx.moveTo(p[0]*15.36,p[1]*10.24);}ctx.closePath();
 // The ring's open middle stays transparent, including when an elf passes behind it.
 ctx.moveTo(88.1*15.36,67.8*10.24);ctx.ellipse(87.25*15.36,67.8*10.24,.85*15.36,1.6*10.24,0,0,Math.PI*2);ctx.moveTo(87.85*15.36,67.8*10.24);ctx.ellipse(87.25*15.36,67.8*10.24,.6*15.36,1.28*10.24,0,0,Math.PI*2,true);
 ctx.clip('evenodd');ctx.drawImage(g.images.winter,0,0,1536,1024);ctx.restore();
 /* Code by Daniel using ChatGPT November 18, 2026 */}
function clipBirdCanopies09() {
 if(state.room!=='sleigh')return;
 ctx.beginPath();ctx.rect(-300,-300,2200,1700);
 // Only lantern heads occlude a flying bird, never the shafts below them.
 for(const [x,y,w,h]of [[31.2,39.5,4,8],[64.8,38.3,4.2,8],[41,18,3.3,7],[56,18,3.3,7]])ctx.rect(x*15.36,y*10.24,w*15.36,h*10.24);
 ctx.clip('evenodd');
 /* Code by Daniel using ChatGPT November 12, 2026 */
}
