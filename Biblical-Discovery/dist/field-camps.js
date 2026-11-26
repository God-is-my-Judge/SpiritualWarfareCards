'use strict';

window.BD_CAMP={
 // Coordinates are measured against the full painting from the same left/top origin as the explorer.
 // Each row gives the plot corners, workshop table, and tent face.
 layouts:{
  'tel-dan':{plot:[[184,451],[561,461],[737,543],[403,686]],work:[1260,512],tent:[1083,256,1467,614]},
  nimrud:{plot:[[753,445],[1102,399],[1352,512],[960,635]],work:[257,497],tent:[61,271,384,609]},
  babylon:{plot:[[165,461],[538,420],[753,522],[399,650]],work:[1344,440],tent:[1156,241,1524,548]},
  thebes:{plot:[[564,461],[1087,394],[1386,548],[941,835]],work:[303,471],tent:[146,261,557,620]},
  qumran:{plot:[[115,538],[457,492],[664,568],[388,712]],work:[1290,532],tent:[1106,307,1444,630]},
  avaris:{plot:[[572,410],[995,369],[1279,461],[829,609]],work:[273,507],tent:[84,241,411,640]},
  galilee:{plot:[[177,497],[511,492],[772,558],[380,650]],work:[1236,481],tent:[1021,230,1390,584]},
  bethesda:{plot:[[591,471],[906,486],[1171,599],[845,691]],work:[242,568],tent:[50,271,445,707]},
  caesarea:{plot:[[303,399],[660,389],[845,461],[549,594]],work:[1329,384],tent:[1148,220,1490,502]},
  delphi:{plot:[[169,532],[518,476],[783,573],[388,701]],work:[1217,512],tent:[1056,312,1432,640]},
  oxyrhynchus:{plot:[[572,445],[1098,404],[1329,532],[845,681]],work:[292,456],tent:[104,225,449,579]},
  megiddo:{plot:[[119,461],[522,456],[833,548],[449,737]],work:[1210,527],tent:[1037,287,1421,660]},
 },
 left:0,visibleWidth:1536,spriteScale:1,siteId:null,viewKey:null,zone:'camp',
 ridgeArt:'camp-thebes-ridge',
 ridgeObjects:[
  {id:'ridge-relief',name:'Royal relief',box:[70,270,492,690],point:[290,715]},
  {id:'ridge-rubbing',name:'Field portfolio',box:[575,325,1055,691],point:[808,716]},
  {id:'ridge-view',name:'Nile lookout',box:[1116,280,1455,673],point:[1292,706]},
 ],
 active(){return game.scene==='site'&&!!game.site&&!game.flight;},
 art(site){return 'camp-'+site.id;},
 isRidge(site){
  return site?.id==='thebes'&&BD_CAMP.zone==='ridge';
  /* Code by Daniel using ChatGPT November 24, 2026 */
 },
 sceneArt(site){
  return BD_CAMP.isRidge(site)?BD_CAMP.ridgeArt:BD_CAMP.art(site);
  /* Code by Daniel using ChatGPT November 24, 2026 */
 },
 ridgeSign(site){
  if(site.id!=='thebes')return null;
  return BD_CAMP.isRidge(site)?{x:120,y:881,name:'← EXCAVATION'}:{x:1202,y:884,name:'RIDGE WALK →'};
  /* Code by Daniel using ChatGPT November 24, 2026 */
 },
 async changePath(site,toRidge){
  const was=BD_CAMP.zone,art=toRidge?BD_CAMP.ridgeArt:BD_CAMP.art(site);
  const image=BD_ART.rawImages[art]||await BD_RESILIENCE.art(art);
  if(!image||game.site!==site||game.scene!=='site'||game.flight||game.path.length||$('#panel').open||BD_CAMP.zone!==was)return;
  setScene('site',site,site.hall,{zone:toRidge?'ridge':'camp',arrival:toRidge?[235,890]:[1140,915]});
  /* Code by Daniel using ChatGPT November 24, 2026 */
 },
 ridgeHotspot(site){
  const sign=BD_CAMP.ridgeSign(site),isRidge=BD_CAMP.isRidge(site);
  return {id:isRidge?'ridge-camp':'camp-ridge',x:sign.x,y:sign.y-42,campSign:sign,label:isRidge?'Path to the excavation':'Ridge walk · Thebes',icon:isRidge?'←':'→',
   point:nearestFree(sign.x,sign.y+35),action:()=>BD_CAMP.changePath(site,!isRidge)};
  /* Code by Daniel using ChatGPT November 24, 2026 */
 },
 observeRidge(id){
  if(id==='ridge-rubbing'){BD_CAMP.ridgeQuestion();return;}
  const relief=id==='ridge-relief';
  openPanel('THEBES · RIDGE WALK','<h2>'+(relief?'A king’s monument':'Look over the Nile')+'</h2><p class="field-line">'+
   (relief?'Miriam: “Think about who gets to tell the story when a king pays for the stone.”':'Miriam: “See where the green fields stop? Along the Nile, water shaped where people could farm and build.”')+
   '</p><p class="fine-print">'+(relief?'Imagined relief. Compare what a real victory inscription says at the field portfolio.':'Illustrated view of the Theban landscape.')+'</p>','ridge-look');
  /* Code by Daniel using ChatGPT November 24, 2026 */
 },
 ridgeQuestion(){
  const sources=game.save.settings.scholars?'<details><summary>Compare the sources</summary><p><a href="https://commons.wikimedia.org/wiki/File:Petrie_1897_plate14.png" target="_blank" rel="noopener">Spiegelberg’s published handcopy · line 27</a></p><p><a href="https://tyndalehouse.com/2024/06/14/merneptah-stele/" target="_blank" rel="noopener">Tyndale House · translation and the Exodus date debate</a></p><p><a href="https://www.str.org/w/the-unexpected-way-to-effectively-make-your-point" target="_blank" rel="noopener">Stand to Reason · how to ask a good question</a></p></details>':'';
  openPanel('THEBES · FIELD PORTFOLIO','<h2>What does the king know?</h2><figure class="ridge-handcopy"><img src="'+BD_ART.assetURL('assets/ws-thebes-line.webp')+'" alt="Spiegelberg’s published copy of part of line 27, read from right to left"><figcaption>Merneptah Stele · published handcopy · line 27</figcaption></figure>'+
   '<p>Merneptah names Israel and boasts that its “seed” is gone. What would you tell a friend?</p><div class="actions ridge-answers"><button class="button secondary" data-ridge-answer="boast">Israel ceased to exist.</button><button class="button secondary" data-ridge-answer="name">Egypt knew of a people called Israel.</button><button class="button secondary" data-ridge-answer="route">We can trace Israel’s route out of Egypt.</button></div>'+
   '<p id="ridge-answer" role="status"></p>'+sources,'ridge-look');
  const feedback={boast:'What did the king stand to gain by making that claim? His own monument celebrates his victory.',
   name:'Yes. The king’s boast still records the name Israel. To ask how Israel arrived, compare other evidence and read the accounts.',
   route:'Can you point to a route in what the king says? This line names a people in the campaign.'};
  for(const choice of document.querySelectorAll('[data-ridge-answer]')){
   choice.addEventListener('click',()=>{$('#ridge-answer').textContent=feedback[choice.dataset.ridgeAnswer];
    /* Code by Daniel using ChatGPT November 24, 2026 */
   });
  }
  /* Code by Daniel using ChatGPT November 24, 2026 */
 },
 layout(site){return BD_CAMP.layouts[site.id];},
 plotBounds(site){
  const plot=BD_CAMP.layout(site).plot,x=plot.map(p=>p[0]),y=plot.map(p=>p[1]);
  return [Math.min(...x),Math.min(...y),Math.max(...x),Math.max(...y)];
 },
 signs(site){
  const {work,tent}=BD_CAMP.layout(site);
  const [left,,right,front]=BD_CAMP.plotBounds(site);
  const toward=work[0]>(left+right)/2?1:-1;
  const digX=toward>0?right-(right-left)*.16:left+(right-left)*.16;
  const dig={x:digX,y:Math.max(742,front+57),name:'EXCAVATION'};
  const workshop={x:work[0]-toward*92,y:Math.max(668,tent[3]+42),name:toward<0?'← WORKSHOP':'WORKSHOP →'};
  return {dig,workshop,toward};
 },
 update(dt,snap=false){
  const on=BD_CAMP.active(),viewport=$('#viewport');
  if(viewport.hasAttribute('data-field-camp')!==on)viewport.toggleAttribute('data-field-camp',on);
  if(!on){BD_CAMP.siteId=null;return;}
  const site=game.site,viewWidth=Math.max(1,viewport.clientWidth),height=Math.max(1,viewport.clientHeight);
  const image=BD_ART.rawImages[BD_CAMP.sceneArt(site)],aspect=image?image.width/image.height:2;
  const visible=Math.min(W,viewWidth*W/(height*aspect));
  const left=Math.max(0,Math.min(W-visible,game.player.x-visible*.5));
  const viewKey=viewWidth+':'+height+':'+aspect+':'+BD_CAMP.zone;
  const changed=snap||BD_CAMP.siteId!==site.id||BD_CAMP.viewKey!==viewKey;
  const next=changed?left:BD_CAMP.left+(left-BD_CAMP.left)*(BD_VIEW.allowed()?1-Math.exp(-dt*9):1);
  if(changed||Math.abs(next-BD_CAMP.left)>.025){
   BD_CAMP.left=next;BD_CAMP.visibleWidth=visible;BD_CAMP.siteId=site.id;BD_CAMP.viewKey=viewKey;
   BD_CAMP.spriteScale=(height/H)/(viewWidth/visible);
   game.dirty=true;positionHotspots();
   if(BD_TRENCH.active)BD_TRENCH.guides();
  }
  /* Code by Daniel using ChatGPT November 24, 2026 */
 },
 rect(rect){
  const scaleX=rect.width/BD_CAMP.visibleWidth,scaleY=rect.height/H;
  return {x:rect.left-BD_CAMP.left*scaleX,y:rect.top,scale:scaleY,scaleX,scaleY};
 },
 arrival(site){
  const {dig,toward}=BD_CAMP.signs(site);
  return [dig.x+toward*30,Math.max(872,dig.y+54)];
 },
 geometry(site){
  if(BD_CAMP.isRidge(site))return {bounds:[42,690,1494,1000],obstacles:[[100,550,482,690],[575,550,1055,690],[1124,490,1440,673],[99,874,141,881]]};
  const [x1,back,x2,front]=BD_CAMP.plotBounds(site),[tl,,tr,base]=BD_CAMP.layout(site).tent;
  const {dig,workshop}=BD_CAMP.signs(site);
  const feet=[dig,workshop,BD_CAMP.ridgeSign(site)].filter(Boolean).map(({x,y})=>[x-20,y-7,x+20,y]);
  return {bounds:[42,646,1494,1000],obstacles:[[x1,back,x2,front],[tl,544,tr,base],...feet]};
  /* Code by Daniel using ChatGPT November 24, 2026 */
 },
 hotspots(site){
  if(BD_CAMP.isRidge(site))return [...BD_CAMP.ridgeObjects.map(({id,name,box,point})=>({
   id,x:(box[0]+box[2])/2,y:(box[1]+box[3])/2,campBox:box,label:name,icon:'⌕',point,action:()=>BD_CAMP.observeRidge(id)
  })),BD_CAMP.ridgeHotspot(site)];
  const layout=BD_CAMP.layout(site);
  const {dig,workshop:sign}=BD_CAMP.signs(site);
  const plot=BD_TRENCH.eligible.has(site.id)?null:BD_CAMP.plotBounds(site);
  const [wx,wy]=layout.work,[tx,ty,tx2,ty2]=layout.tent;
  const workshop=()=>BD_CULTURE.open(site);
  const point=nearestFree(wx,Math.max(wy+152,749));
  return [
   {id:'dig',x:dig.x,y:dig.y-41,campSign:dig,campPlot:plot,label:'Excavation · '+(game.save.finds[site.id]?'Revisit your study':'Investigate the find'),icon:'⌕',point:nearestFree(dig.x,dig.y+38),action:()=>openDig(site)},
   {id:'field-notes',x:(tx+tx2)/2,y:(ty+ty2)/2,campBox:[tx,ty,tx2,wy-43],label:'Field briefing',icon:'▤',point:nearestFree(wx-56,point[1]),action:()=>showBriefing(site)},
   {id:'field-lab',x:tx2-22,y:ty2-19,campBox:[tx2-49,ty2-82,tx2+16,ty2+18],label:'Study station',icon:'⌕',point:nearestFree(wx+76,point[1]),action:()=>showLab(site)},
   {id:'camp-workshop',x:wx,y:wy,campBox:[wx-78,wy-52,wx+78,wy+46],label:BD_CULTURE_BOARDS[site.id].title,icon:'▤',point,action:workshop},
   {id:'field-workshop-sign',x:sign.x,y:sign.y-41,campSign:sign,label:'Field Workshop · '+BD_CULTURE_BOARDS[site.id].title,icon:'↗',point:nearestFree(sign.x,sign.y+38),action:()=>walkTo(point,workshop)},
   {id:'plane-return',x:860,y:972,campBox:[778,928,943,1002],label:'Back to the aircraft',icon:'✈',point:nearestFree(860,965),action:()=>setScene('cabin')},
   ...(site.id==='thebes'?[BD_CAMP.ridgeHotspot(site)]:[]),
  ];
  /* Code by Daniel using ChatGPT November 24, 2026 */
 },
 signWidth(){return 106*BD_CAMP.spriteScale;},
 signBox(sign){
  const half=BD_CAMP.signWidth()/2+5;
  return [sign.x-half,sign.y-87,sign.x+half,sign.y+4];
 },
 paintSign(c,sign){
  const image=BD_ART.images['camp-sign'],width=BD_CAMP.signWidth(),top=sign.y-82;
  if(!image)return;
  c.save();c.drawImage(image,sign.x-width/2,top,width,82);
  c.translate(sign.x,top);c.scale(BD_CAMP.spriteScale,1);
  c.fillStyle='#fff0cd';c.font='bold 15px Georgia';c.textAlign='center';c.textBaseline='middle';
  c.fillText('FIELD',0,25);c.font='bold 12px Georgia';
  c.fillText(sign.name,0,42,width/BD_CAMP.spriteScale-12);
  c.restore();
 },
 paint(c,time){
  const site=game.site,{dig,workshop}=BD_CAMP.signs(site),p=game.player;
  c.save();c.scale(W/BD_CAMP.visibleWidth,1);c.translate(-BD_CAMP.left,0);
  const ridge=BD_CAMP.isRidge(site),image=BD_ART.images[BD_CAMP.sceneArt(site)]||BD_ART.images[site.scene];
  if(image)c.drawImage(image,0,0,W,H);
  function traveler(){
   c.save();c.translate(p.x,0);c.scale(BD_CAMP.spriteScale,1);c.translate(-p.x,0);
   BD_ART.traveler(c,p,time,game.save.settings.reduced);c.restore();
  }
  const signs=[...(ridge?[]:[dig,workshop]),BD_CAMP.ridgeSign(site)].filter(Boolean).map(sign=>({y:sign.y,paint:()=>BD_CAMP.paintSign(c,sign)}));
  BD_MUSEUM.paintAtGround(c,time,[...signs,{y:p.y,paint:traveler}],false);
  if(game.path.length){
   const [x,y]=game.path.at(-1);c.strokeStyle='#edd6aa9e';c.lineWidth=1.5;c.beginPath();c.ellipse(x,y,12,5,0,0,Math.PI*2);c.stroke();
  }
  c.restore();
  /* Code by Daniel using ChatGPT November 24, 2026 */
 },
};
