'use strict';
window.BD_ART = {images:{},ready:false};

BD_ART.assetURL = function assetURL(path){
  return window.BD_EMBEDDED_ASSETS?.[path] || path;
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_ART.load = async function loadArt(){
  const names=['m4-garden','museum','museum-east-v2','field','cabin','desert','egypt','delta','coast','mesopotamia',...BD_SITES.map(BD_CAMP.art),BD_CAMP.ridgeArt,'camp-sign'];
  names.push(...BD_SIGNS.assets,...BD_MAP_MARKERS.assets);
  for(const name of ['entry','ot-egypt','ot-kings','ot-return','scroll','nt-lake','nt-city','nt-road','table','story-1','story-2','story-3','story-4','stone-pier','ivory-pier','plinth','dust','drum','cradle','qmodel','mmodel'])names.push('m4-'+name);
  for(const key of ['front-v2','land','tel','qumran','lake','jerusalem','table','glass'])names.push('m5-'+key);
  for(const set of Object.values(BD_PEOPLE_ART))for(const pose of set.frames)names.push(pose.key);
  for(const animation of Object.values(BD_WALKING))for(const frame of animation.frames)names.push(frame.key);
  for(let n=0;n<12;n++) names.push('find-'+n);
  for(const name of ['soil-deep','soil-fill','soil-skin','trowel','pick','brush','face-miriam','face-sam','face-mara'])names.push('dig-v7-'+name);
  for(const key of Object.keys(BD_WALKING))names.push('traveler-'+key);
  return BD_RESILIENCE.prepareArt(names);
/* Code by Daniel using ChatGPT November 24, 2026 */
/* Code by Daniel using ChatGPT November 17, 2026 */
};

BD_ART.artifact = function paintArtifact(c,site,x,y,w,h,options={}){
  const im=BD_ART.images['find-'+site.art];
  if(!im)return;
  const s=Math.min(w/im.width,h/im.height),dw=im.width*s,dh=im.height*s;
  c.save();c.translate(x,y);
  if(options.rotate)c.rotate(options.rotate);
  if(options.dim)c.globalAlpha=.23;
  if(options.glow){c.shadowColor='#e4c47b';c.shadowBlur=23;}
  c.drawImage(im,-dw/2,-dh/2,dw,dh);
  c.restore();
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_ART.traveler = function paintTraveler(c,player,time,reduced){
  const rawAngle=player.facingAngle??Math.atan2(player.facingY,player.facingX),angle=Math.atan2(Math.sin(rawAngle),Math.cos(rawAngle)),step=Math.PI/4;
  const candidate=(Math.round(angle/step)+8)%8;
  if(!Number.isInteger(player.renderDirection))player.renderDirection=candidate;
  player.renderDirection=((player.renderDirection%8)+8)%8;
  const center=player.renderDirection*step,difference=Math.atan2(Math.sin(angle-center),Math.cos(angle-center));
  if(Math.abs(difference)>step*.62)player.renderDirection=candidate;
  const direction=player.renderDirection,view=[1,0,4,0,1,2,3,2][direction],mirror=[false,false,false,true,true,true,false,false][direction];
  const kind=player.kind==='girl'?1:0,idle=BD_ART.images['traveler-'+kind+'-'+view],animation=BD_WALKING[kind+'-'+view];
  if(!idle||!animation)return;
  const height=player.projectedHeight??BD_ART.travelerHeight(player.y),mix=player.walkBlend??(player.walking?1:0),phase=player.gaitPhase||0;
  const frame=animation.frames[Math.floor(phase*8)%8];
  // A cold animation can keep its idle pose until every frame is available.
  if(mix>0&&!animation.ready)animation.ready=animation.frames.map(pose=>BD_ART.images[pose.key]).every(Boolean);
  const image=animation.ready?BD_ART.images[frame.key]:null,walkScale=height/animation.height;
  c.save();c.translate(player.x,player.y);
  c.fillStyle='#17302132';c.beginPath();c.ellipse(0,1,height*.135,7.5*height/235,0,0,Math.PI*2);c.fill();
  c.scale(mirror?-1:1,1);
  if(mix<1||!image){
    const scale=animation.idle?walkScale:height/idle.height;
    const [x,y]=animation.idle?.anchor??[idle.width*.5,idle.height];
    c.save();c.globalAlpha*=image?1-mix:1;c.drawImage(idle,-x*scale,-y*scale,idle.width*scale,idle.height*scale);c.restore();
  }
  if(image&&mix>0){c.save();c.globalAlpha*=mix;c.drawImage(image,-frame.anchor[0]*walkScale,-frame.anchor[1]*walkScale,image.width*walkScale,image.height*walkScale);c.restore();}
  c.restore();


/* Code by Daniel using ChatGPT November 16, 2026 */
};

BD_ART.glass = function paintGlass(c,box,lit){
  const {x,y,w,h}=box,top=y-h;
  c.save();
  c.fillStyle=lit?'#9bd0c314':'#193e3514';
  c.strokeStyle=lit?'#e6efdb66':'#9ca68c42';c.lineWidth=1.3;
  c.beginPath();c.moveTo(x-w/2,y);c.lineTo(x-w/2,top);c.lineTo(x+w/2,top);c.lineTo(x+w/2,y);c.closePath();c.fill();c.stroke();
  c.beginPath();c.moveTo(x-w/2,top);c.lineTo(x-w*.32,top-15);c.lineTo(x+w*.68,top-15);c.lineTo(x+w/2,top);c.stroke();
  c.beginPath();c.moveTo(x+w*.68,top-15);c.lineTo(x+w*.68,y-15);c.lineTo(x+w/2,y);c.stroke();
  c.strokeStyle='#fff7d926';c.beginPath();c.moveTo(x-w*.35,top+12);c.lineTo(x-w*.35+11,y-15);c.stroke();
  if(lit){const glow=c.createRadialGradient(x,y,8,x,y,w*.75);glow.addColorStop(0,'#ffde7526');glow.addColorStop(1,'#ffde7500');c.fillStyle=glow;c.fillRect(x-w,y-w,w*2,w*1.4);}
  c.restore();
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_ART.toolSVG = function toolSVG(name){
  const shapes={
    record:'<path d="M9 4h21v33H9z" fill="#ddcda6" stroke="#776542"/><path d="M14 12h12m-12 5h12m-12 5h9m-9 5h11" stroke="#897855"/><path d="m33 9 3 1-9 25-4 3 1-5z" fill="#70553a"/>',
    brush:'<path d="m10 35 3-7 14-23q3-3 5 0L19 31l-5 7z" fill="#795435" stroke="#4f412b"/><path d="m11 26 9 5-4 8-12-7z" fill="#c9b270"/><path d="m6 31 10 6m-9-8 10 6m-6-8 8 5" stroke="#8d7747"/>',
    trowel:'<path d="m10 37 3-18 17-6-9 18z" fill="#aab0a3" stroke="#566560"/><path d="m20 24 8-9 2-4" fill="none" stroke="#515b52" stroke-width="2"/><path d="m27 12 6-9q3-2 5 2l-7 10z" fill="#88613c" stroke="#604a31"/>',
    inspect:'<circle cx="17" cy="16" r="11" fill="#c8d5bc55" stroke="#b5995d" stroke-width="3"/><path d="m25 24 11 12" stroke="#775837" stroke-width="6"/><path d="m12 10 6-1" stroke="#f8f0cb" stroke-width="2"/>'
  };
  return '<svg aria-hidden="true" viewBox="0 0 42 42">'+(shapes[name]||shapes.brush)+'</svg>';
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_ART.paper = function paintPaper(c,w,h){
  const gradient=c.createLinearGradient(0,0,w,h);gradient.addColorStop(0,'#e8dcb8');gradient.addColorStop(.5,'#f0e6c9');gradient.addColorStop(1,'#d6c59c');
  c.fillStyle=gradient;c.fillRect(0,0,w,h);
  for(let i=0;i<1800;i++){
    const x=((i*107.73)%w),y=((i*67.39)%h);
    c.fillStyle=i%3?'#795d2910':'#fff9de24';c.fillRect(x,y,1.5+(i%4),1);
  }
  c.strokeStyle='#927c4c66';c.lineWidth=1;c.strokeRect(15,15,w-30,h-30);c.strokeRect(20,20,w-40,h-40);
/* Code by Daniel using ChatGPT November 15, 2026 */
};

// Ground-plane horizons are in painting/world coordinates, never camera coordinates.
// Reference rows retain the established explorer/model-table proportions.
BD_ART.perspectives={
 museum:{
  front:{horizon:450,referenceY:865,height:270,falloff:1},
  entry:{horizon:380,referenceY:870,height:241.8,falloff:1},
  ot:{horizon:360,referenceY:862,height:240.68},
  nt:{horizon:360,referenceY:865,height:241.1},
  scroll:{horizon:1080,referenceY:2045,height:234.485},
  table:{horizon:360,referenceY:865,height:241.1},
  story:{horizon:360,referenceY:865,height:241.1},
  garden:{horizon:460,referenceY:880,height:243.2}
 },
 // Use the cockpit doorway and the near edge of the workbench as scale references.
 cabin:{horizon:100,referenceY:900,height:490,falloff:1},
 field:{
  desert:{horizon:390,referenceY:900,height:246},
  egypt:{horizon:370,referenceY:900,height:246},
  delta:{horizon:340,referenceY:900,height:246},
  coast:{horizon:400,referenceY:900,height:246},
  mesopotamia:{horizon:330,referenceY:900,height:246}
 }
};
BD_ART.perspective=function groundPlane(context={}){
 const scene=context.scene??game.scene;
 if(scene==='museum')return BD_ART.perspectives.museum[context.room??BD_MUSEUM.room]||BD_ART.perspectives.museum.entry;
 if(scene==='cabin')return BD_ART.perspectives.cabin;
 return BD_ART.perspectives.field[context.art??game.site?.scene]||BD_ART.perspectives.field.desert;
/* Code by Daniel using ChatGPT November 16, 2026 */
};
function sceneIsQumran(context){return (context.scene??game.scene)==='site'&&(context.site??(!context.art?game.site?.id:null))==='qumran';
/* Code by Daniel using ChatGPT November 17, 2026 */
}
BD_ART.depthScale=function groundDepthScale(y,context={}){
 const p=BD_ART.perspective(context),row=Number.isFinite(y)?y:p.referenceY;
 const base=Math.max(0,(row-p.horizon)/(p.referenceY-p.horizon)),distant=context.distant??(sceneIsQumran(context));return Math.pow(base,distant?.88:(p.falloff??.32));
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ART.travelerHeight=function travelerWorldHeight(y,context={}){
 return BD_ART.perspective(context).height*BD_ART.depthScale(y,context);
/* Code by Daniel using ChatGPT November 16, 2026 */
};

BD_ART.slider=function instrumentSlider(id,title,min,max,value,left,middle,right){
 return '<div class="instrument-control"><div class="instrument-heading"><label for="'+id+'">'+title+'</label><output id="'+id+'-value" for="'+id+'"></output></div><div class="instrument-track"><input id="'+id+'" type="range" min="'+min+'" max="'+max+'" step="1" value="'+value+'" aria-describedby="'+id+'-help"></div><div class="instrument-ticks" aria-hidden="true"><span>'+left+'</span><span>'+middle+'</span><span>'+right+'</span></div><p id="'+id+'-help" class="fine-print">Drag the brass handle. Keyboard: left / right. Controller: focus here, then left / right.</p></div>';
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_ART.syncSlider=function updateInstrumentSlider(input,description){
 const min=Number(input.min),max=Number(input.max),value=Number(input.value);input.style.setProperty('--position',((value-min)/(max-min)*100)+'%');input.setAttribute('aria-valuetext',description);const output=document.getElementById(input.id+'-value');if(output)output.textContent=description;
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_ART.angleLabel=function lampDirection(angle){return Math.abs(angle)<1?'Overhead · 0°':Math.round(Math.abs(angle))+'° '+(angle<0?'from left':'from right');
/* Code by Daniel using ChatGPT November 15, 2026 */
};
