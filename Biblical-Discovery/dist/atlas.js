'use strict';
window.BD_ATLAS={selected:'tel-dan',hall:'all',world:false,pins:[]};

// Public-domain Natural Earth coastlines, with hand-traced fallback. Geographic destination anchors.
BD_ATLAS.coasts=window.BD_COASTS||[
  [[-10,36],[-9,43],[-2,44],[0,49],[5,52],[9,54],[8,58],[5,59],[6,62],[13,68],[22,71],[31,70],[30,60],[39,63],[45,66],[65,70],[90,77],[120,72],[140,59],[162,60],[178,66],[179,54],[159,51],[155,44],[143,45],[142,36],[130,32],[121,25],[117,21],[110,18],[107,11],[104,2],[100,6],[98,15],[94,20],[90,22],[85,21],[80,8],[75,14],[72,22],[65,25],[60,25],[57,26],[56,24],[58,22],[59,18],[55,16],[51,12],[45,13],[43,16],[42,19],[40,22],[38,25],[35,28],[34,31],[35,34],[36,36],[35,36.6],[32,36],[29,36.5],[27,37],[26,39],[27,40.5],[29,41],[33,42],[36,41],[41,41],[42,42],[38,44],[34,45],[30,46],[29,44],[28,42],[26,41],[24,41],[23,40],[24,39],[23,38],[24,37],[23,36.5],[22,36.5],[21,37.5],[21,39],[19,40],[18,42],[16,43],[14,45],[13,45],[14,43],[16,41],[17,40],[16,38],[15,38],[15,40],[12,42],[10,44],[8,44],[7,43],[5,43],[3,42],[0,40],[-1,38],[-5,36],[-10,36]],
  [[-17,21],[-17,15],[-15,11],[-9,5],[1,5],[6,4],[10,2],[10,-3],[12,-7],[13,-12],[12,-17],[16,-20],[18,-29],[21,-35],[27,-34],[32,-29],[35,-23],[40,-16],[40,-10],[44,-2],[51,12],[44,11],[42,15],[40,19],[38,23],[35,28],[34,31],[32,31],[31,31.5],[29,31],[27,31.5],[25,32],[23,32],[20,32],[17,31],[13,33],[10,34],[9,37],[6,37],[3,36],[0,36],[-5,36],[-9,32],[-10,29],[-14,26],[-17,21]],
  [[-168,65],[-153,71],[-134,69],[-117,71],[-98,78],[-78,81],[-60,69],[-56,52],[-66,45],[-75,35],[-81,25],[-88,22],[-86,16],[-78,9],[-83,8],[-91,16],[-105,20],[-115,28],[-124,42],[-128,51],[-144,59],[-168,65]],
  [[-80,10],[-68,12],[-53,4],[-36,-6],[-40,-20],[-52,-32],[-65,-55],[-74,-48],[-75,-25],[-81,-5],[-80,10]],
  [[112,-22],[115,-34],[130,-33],[138,-38],[149,-38],[154,-26],[146,-16],[135,-12],[129,-14],[122,-17],[112,-22]],
  [[-55,60],[-45,60],[-22,72],[-30,82],[-50,83],[-64,76],[-55,60]],
  [[-10,50],[-6,51],[-3,58],[-5,59],[-8,55],[-10,50]],
  [[23,35],[26,35],[26,34.7],[23,35]],[[32,35],[34,35.7],[34,34.6],[32,35]],
  [[8,41],[9,41],[9,39],[8,39],[8,41]],[[13,38],[15,38],[15,37],[13,37],[13,38]]
];

BD_ATLAS.project = function project(coords,w,h,world){
  const bounds=world?[-180,180,-58,83]:[18,49,20,42];
  return [45+(coords[0]-bounds[0])/(bounds[1]-bounds[0])*(w-90),h-45-(coords[1]-bounds[2])/(bounds[3]-bounds[2])*(h-90)];

/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_ATLAS.draw = function drawAtlas(canvas,save,flight){
  const c=canvas.getContext('2d'),w=canvas.width,h=canvas.height,world=flight?!!flight.world:BD_ATLAS.world;
  c.clearRect(0,0,w,h);BD_ART.paper(c,w,h);
  c.save();c.beginPath();c.rect(24,24,w-48,h-48);c.clip();
  c.fillStyle='#91b5b322';c.fillRect(24,24,w-48,h-48);
  c.lineWidth=.6;c.strokeStyle='#8d916e33';
  const step=world?30:5;
  for(let lon=world?-180:15;lon<=180;lon+=step){const p=BD_ATLAS.project([lon,0],w,h,world);c.beginPath();c.moveTo(p[0],24);c.lineTo(p[0],h-24);c.stroke();}
  for(let lat=world?-60:20;lat<=85;lat+=step){const p=BD_ATLAS.project([0,lat],w,h,world);c.beginPath();c.moveTo(24,p[1]);c.lineTo(w-24,p[1]);c.stroke();}
  for(const coast of BD_ATLAS.coasts){c.beginPath();coast.forEach(function plot(p,i){const point=BD_ATLAS.project(p,w,h,world);if(i)c.lineTo(...point);else c.moveTo(...point);
/* Code by Daniel using ChatGPT November 15, 2026 */
});c.closePath();c.fillStyle='#e1d3aa';c.shadowColor='#6c70542b';c.shadowBlur=3;c.fill();c.shadowBlur=0;c.strokeStyle='#8d8560';c.lineWidth=1.2;c.stroke();}
  if(!world){
    const nile=[[31.1,31.4],[31.2,30.1],[30.8,29],[31,27],[32.6,25.7],[32.9,24],[32.5,22]];
    c.beginPath();nile.forEach(function river(p,i){const point=BD_ATLAS.project(p,w,h,world);i?c.lineTo(...point):c.moveTo(...point);
/* Code by Daniel using ChatGPT November 15, 2026 */
});c.strokeStyle='#72969a99';c.lineWidth=2;c.stroke();
    const labels=[['M E D I T E R R A N E A N',[27,33.9]],['E G Y P T',[29,24.7]],['A R A B I A',[42,24.4]],['M E S O P O T A M I A',[43.5,34.5]],['G R E E C E',[22.5,40]],['A N A T O L I A',[33,39]],['L E V A N T',[36.8,34.7]]];
    c.textAlign='center';for(const [text,coords]of labels){const p=BD_ATLAS.project(coords,w,h,world);c.fillStyle=text.includes('M E D I T E')?'#648384':'#857554';c.font=text.includes('M E D I T E')?'italic 15px Georgia':'11px Georgia';c.fillText(text,...p);}
  }else{c.font='italic 16px Georgia';c.fillStyle='#8a7957';c.textAlign='center';c.fillText('A world to investigate',w/2,h-65);}
  const visible=BD_SITES.filter(function filterSites(s){return BD_ATLAS.hall==='all'||s.hall===BD_ATLAS.hall;
/* Code by Daniel using ChatGPT November 15, 2026 */
});
  BD_ATLAS.pins=[];
  const offsets={'tel-dan':[-22,-43],galilee:[40,-24],caesarea:[-45,5],megiddo:[34,24],bethesda:[41,57],qumran:[-30,64],avaris:[-20,4]};
  const routes=(save.routes||[]).slice(-10);
  c.setLineDash([4,6]);c.strokeStyle='#a5784b55';c.lineWidth=1.4;
  for(const pair of routes){const a=BD_SITES.find(function byId(s){return s.id===pair[0];
/* Code by Daniel using ChatGPT November 15, 2026 */
}),b=BD_SITES.find(function byId(s){return s.id===pair[1];
/* Code by Daniel using ChatGPT November 15, 2026 */
});if(!a||!b)continue;const p=BD_ATLAS.project(a.coords,w,h,world),q=BD_ATLAS.project(b.coords,w,h,world);c.beginPath();c.moveTo(...p);c.quadraticCurveTo((p[0]+q[0])/2,(p[1]+q[1])/2-50,...q);c.stroke();}
  c.setLineDash([]);
  if(!flight){for(const site of visible){
    const point=BD_ATLAS.project(site.coords,w,h,world),off=world?[0,0]:(offsets[site.id]||[0,0]),x=point[0]+off[0],y=point[1]+off[1],selected=site.id===BD_ATLAS.selected,done=!!save.finds[site.id];
    if(!world){c.strokeStyle='#5e735d70';c.lineWidth=1;c.beginPath();c.moveTo(...point);c.lineTo(x,y);c.stroke();c.fillStyle='#4b665a';c.beginPath();c.arc(...point,2,0,Math.PI*2);c.fill();}
    c.fillStyle=selected?'#a77339':done?'#476f5a':'#f2e8c8';c.strokeStyle=selected?'#805627':'#62705a';c.lineWidth=selected?2:1;
    c.beginPath();c.arc(x,y,world?5:selected?13:11,0,Math.PI*2);c.fill();c.stroke();
    if(!world){c.fillStyle=selected||done?'#fff4d2':'#566448';c.textAlign='center';c.font='9px Trebuchet MS';c.fillText(String(site.art+1).padStart(2,'0'),x,y+3);}
    BD_ATLAS.pins.push({id:site.id,x,y});
  }}
  if(flight){
    const a=BD_ATLAS.project(flight.from,w,h,world),b=BD_ATLAS.project(flight.to,w,h,world),t=flight.t;
    c.strokeStyle='#a34736';c.lineWidth=2.4;c.setLineDash([]);c.beginPath();c.moveTo(...a);
    for(let i=0;i<=t;i+=.012){const x=a[0]+(b[0]-a[0])*i,y=a[1]+(b[1]-a[1])*i-Math.sin(i*Math.PI)*55;c.lineTo(x,y);}c.stroke();c.setLineDash([]);
    const x=a[0]+(b[0]-a[0])*t,y=a[1]+(b[1]-a[1])*t-Math.sin(t*Math.PI)*55;
    c.save();c.translate(x,y);c.rotate(Math.atan2(b[1]-a[1]-Math.cos(t*Math.PI)*55*Math.PI,b[0]-a[0])+Math.PI/2);c.fillStyle='#344f43';c.beginPath();c.moveTo(0,-19);c.lineTo(4,-5);c.lineTo(23,4);c.lineTo(23,9);c.lineTo(3,5);c.lineTo(2,16);c.lineTo(9,21);c.lineTo(9,24);c.lineTo(0,21);c.lineTo(-9,24);c.lineTo(-9,21);c.lineTo(-2,16);c.lineTo(-3,5);c.lineTo(-23,9);c.lineTo(-23,4);c.lineTo(-4,-5);c.closePath();c.fill();c.restore();
    c.textAlign='center';c.font='20px Georgia';c.fillStyle='#665437';c.fillText(flight.title,w/2,68);
  }
  c.restore();
  c.save();c.translate(w-70,75);c.strokeStyle='#7d6e46';c.beginPath();c.arc(0,0,22,0,Math.PI*2);c.stroke();c.fillStyle='#7d6e46';c.beginPath();c.moveTo(0,-31);c.lineTo(6,0);c.lineTo(0,31);c.lineTo(-6,0);c.closePath();c.fill();c.fillStyle='#f5e9c4';c.beginPath();c.moveTo(-23,0);c.lineTo(0,-4);c.lineTo(23,0);c.lineTo(0,4);c.closePath();c.fill();c.font='10px Georgia';c.textAlign='center';c.fillStyle='#6b6045';c.fillText('N',0,-37);c.restore();

/* Code by Daniel using ChatGPT November 17, 2026 */
};
