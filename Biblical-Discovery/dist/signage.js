'use strict';
window.BD_SIGNS={
 assets:['welcome','olive','stand','wall','marker','brass','flyer'].map(name=>'v18-sign-'+name),
 image(name){return BD_ART.images['v18-sign-'+name];},
 mounted(c,name,x,y,w,h){
  const image=BD_SIGNS.image(name);
  if(image)c.drawImage(image,x-w/2,y,w,h);
 },
 label(c,name,x,y,w,h,title,sub='',size=15){
  BD_SIGNS.mounted(c,name,x,y,w,h);
  c.save();c.textAlign='center';c.textBaseline='middle';
  c.fillStyle=name==='brass'?'#35291d':'#f8e7bc';
  c.font=size+'px Georgia';c.fillText(title,x,y+h*(sub?.39:.51),w-14);
  if(sub){c.font=Math.max(8,size*.67)+'px Georgia';c.fillText(sub,x,y+h*.72,w-14);}
  c.restore();
 },
 stand(c,x,foot,w,h,title,sub){
  const top=foot-h;
  BD_SIGNS.mounted(c,'stand',x,top,w,h);
  c.save();c.textAlign='center';c.textBaseline='middle';c.fillStyle='#fff0c8';
  c.font='bold '+Math.max(12,w*.102)+'px Georgia';c.fillText(title,x,top+h*.205,w*.82);
  c.font=Math.max(10,w*.078)+'px Georgia';c.fillText(sub,x,top+h*.335,w*.82);
  c.restore();
 }
};

window.BD_FLYER={
 quad:[[1108,620],[1204,628],[1214,761],[1118,753]],
 active:null,
 bounds(){
  const [topLeft,topRight,bottomRight,bottomLeft]=BD_FLYER.quad;
  return [topLeft[0]-6,Math.min(topLeft[1],topRight[1])-6,bottomRight[0]+6,Math.max(bottomRight[1],bottomLeft[1])+5];
 },
 paint(c){
  const [a,b,,d]=BD_FLYER.quad,im=BD_SIGNS.image('flyer');
  c.save();
  c.fillStyle='#36281770';c.beginPath();c.ellipse(1168,757,62,7,.05,0,Math.PI*2);c.fill();
  c.fillStyle='#a98755';c.fillRect(1113,750,108,7);
  c.fillStyle='#bfa57b';c.fillRect(1127,740,12,11);c.fillRect(1193,744,12,9);c.restore();
  if(!im||BD_FLYER.active)return;
  c.save();
  c.transform((b[0]-a[0])/im.width,(b[1]-a[1])/im.width,(d[0]-a[0])/im.height,(d[1]-a[1])/im.height,a[0],a[1]);
  c.drawImage(im,0,0);c.restore();
 },
 screenCorners(){
  const rect=sceneRect();
  return BD_FLYER.quad.map(point=>{
   const [x,y]=BD_MUSEUM.screen(point);
   return [rect.x+x*rect.scaleX,rect.y+y*rect.scaleY];
  });
 },
 open(instant=false){
  const {q,inside,done}=BD_DESK.status(),image=BD_SIGNS.image('flyer');
  if(!image){BD_ADVENTURE.board();return;}
  const [action,label]=inside?['resume','Resume the survey']:done?['ending','View the field record']:q.ready?['depart','Join Miriam’s team']:['apply','Apply to the field team'];
  const live=game.scene==='museum'&&BD_MUSEUM.room==='entry',start=live?BD_FLYER.screenCorners():null;
  openPanel('THE IMPORTANT DIG','<section class="field-flyer-view"><h2 class="sr-only">The Important Dig</h2>'+
   '<div class="field-flyer-dim" aria-hidden="true"></div><div class="field-flyer-frame" aria-hidden="true"></div>'+
   '<canvas id="field-flyer-sheet" role="img" aria-label="The Important Dangerous Dig. Jerusalem Expedition. Hurry, expedition soon underway. Experienced archaeologists wanted. The flyer shows a tunnel and Miriam rappelling at Petra. Miriam made it back from Petra. Jerusalem is next."></canvas>'+
   '<aside class="field-flyer-actions" inert><p class="field-flyer-status">'+(inside?'Your team is waiting underground.':done?'You made it back to daylight.':q.ready?'Your field record qualifies you.':Math.min(6,q.count)+' / 6 finds · '+Math.min(2,q.ot)+' / 2 Old Testament · '+Math.min(2,q.nt)+' / 2 New Testament')+'</p>'+
   '<button type="button" class="button" data-adventure="'+action+'">'+label+' →</button>'+
   '<button type="button" class="button secondary" data-adventure="board">Expedition details</button></aside></section>','expedition-flyer');
  const panel=$('#panel'),view=$('.field-flyer-view'),node=$('#field-flyer-sheet'),aside=view.querySelector('aside');
  node.width=image.width;node.height=image.height;
  node.style.width=node.width+'px';node.style.height=node.height+'px';
  node.getContext('2d').drawImage(image,0,0);
  const state={node,view,aside,start,live,source:[[0,0],[node.width,0],[node.width,node.height],[0,node.height]],ratio:node.width/node.height,duration:2150,elapsed:0,previous:performance.now(),frame:0,closed:false};
  BD_FLYER.active=state;panel.classList.add('field-flyer-continuous');
  const previous=game.dialogCleanup;
  game.dialogCleanup=function putTheFlyerBack(){
   state.closed=true;cancelAnimationFrame(state.frame);node.width=node.height=1;
   if(BD_FLYER.active===state)BD_FLYER.active=null;
   panel.classList.remove('field-flyer-continuous');game.dirty=true;if(previous)previous();
  };
  if(instant||!live)state.elapsed=state.duration;
  BD_MAP_VIEW.animate(state,BD_FLYER.render);
 },
 render(state,p){
  const r=state.view.querySelector('.field-flyer-frame').getBoundingClientRect();
  const w=Math.min(r.width,r.height*state.ratio),h=w/state.ratio,x=r.left+(r.width-w)/2,y=r.top+(r.height-h)/2;
  const end=[[x,y],[x+w,y],[x+w,y+h],[x,y+h]];
  state.start??=end;
  const matrix=BD_MAP_VIEW.approach(state,end,p);
  state.node.style.transform=BD_MAP_VIEW.css(matrix);
  const reveal=Math.min(1,Math.max(0,(p-.39)/.48));
  state.view.style.setProperty('--flyer-dim',String(Math.min(.7,p*.78)));
  state.node.style.setProperty('--flyer-shadow',String(p*.42));
  state.aside.style.opacity=String(reveal);state.aside.inert=reveal<.6;
 },
 resize(){
  const s=BD_FLYER.active;
  if(!s||s.closed)return;
  if(s.live&&s.progress<1)s.start=BD_FLYER.screenCorners();
  BD_FLYER.render(s,s.progress);
 }
};
window.addEventListener('resize',BD_FLYER.resize);
