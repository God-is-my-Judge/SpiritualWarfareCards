'use strict';
window.BD_SCROLL={state:null,light:0,rampFoot:[720,1520],padDirection:0};
BD_SCROLL.active=function lookingAboveTheRoom(){return game.scene==='museum'&&BD_MUSEUM.room==='scroll'&&BD_MUSEUM.lookUp;


/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_SCROLL.reset=function leaveScrollView(){
 BD_SCROLL.state=null;BD_SCROLL.light=0;BD_SCROLL.padDirection=0;BD_MUSEUM.lookUp=false;document.body.classList.remove('gazing-scroll');document.getElementById('museum-gaze-controls')?.setAttribute('hidden','');$('#hotspots').hidden=false;$('.location-plaque').hidden=false;


/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_SCROLL.controls=function ceilingViewControls(){
 let controls=document.getElementById('museum-gaze-controls');if(!controls){controls=document.createElement('div');controls.id='museum-gaze-controls';controls.setAttribute('role','group');controls.setAttribute('aria-label','Look around the Scroll Room');controls.innerHTML='<button data-gaze="tour">Gaze around</button><button data-gaze="roof">Oculus</button><button data-gaze="mural">Cliffs mural</button><button data-gaze="pause">Pause view</button><button data-gaze="floor" id="museum-look-back">Return to the floor ↓</button>';$('#viewport').after(controls);controls.addEventListener('click',function chooseCeilingView(event){const button=event.target.closest('[data-gaze]');if(button)BD_SCROLL.choose(button.dataset.gaze);


/* Code by Daniel using ChatGPT November 16, 2026 */
});}
 const active=BD_SCROLL.active(),s=BD_SCROLL.state;controls.hidden=!active;document.body.classList.toggle('gazing-scroll',active);if(!active||!s)return;
 for(const b of controls.querySelectorAll('[data-gaze]')){const mode=b.dataset.gaze;b.setAttribute('aria-pressed',String(mode==='pause'?s.paused:mode===s.mode));if(mode==='tour'||mode==='pause')b.hidden=!BD_VIEW.allowed();if(mode==='pause')b.textContent=s.paused?'Resume view':'Pause view';}


/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_SCROLL.open=function lookUpFromTheFloor(){
 BD_MUSEUM.lookUp=true;BD_SCROLL.state={mode:'tour',elapsed:0,paused:false,entering:true};game.path=[];game.pending=null;game.keys.clear();game.touchMove=null;game.padMove=null;Object.assign(game.player,{vx:0,vy:0,speed:0,walking:false,walkBlend:0});$('#hotspots').hidden=true;BD_SCROLL.controls();BD_MUSEUM.syncView();BD_MUSEUM.update(0);game.dirty=true;


/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_SCROLL.close=function returnFromCeiling(instant=false){
 BD_MUSEUM.lookUp=false;BD_SCROLL.state=null;game.keys.clear();game.touchMove=null;game.padMove=null;BD_SCROLL.controls();$('#hotspots').hidden=false;$('.location-plaque').hidden=false;BD_MUSEUM.syncView();BD_MUSEUM.camera.viewChanged=false;BD_MUSEUM.update(0,instant||!BD_VIEW.allowed());makeHotspots();game.dirty=true;


/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_SCROLL.choose=function chooseGaze(mode){
 if(mode==='floor'){BD_SCROLL.close();return;}const s=BD_SCROLL.state;if(!s)return;if(mode==='pause')s.paused=!s.paused;else{s.mode=mode;s.elapsed=0;s.paused=false;}BD_SCROLL.controls();game.dirty=true;


/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_SCROLL.frame=function frameUpperPainting(width,centerX,centerY,roof=false){
 const c=BD_MUSEUM.camera,z=W/(width*c.ax),h=H/(z*c.ay);return {z,x:Math.max(0,Math.min(1536-width,centerX-width/2)),y:roof?0:Math.max(0,centerY-h/2),w:width,h};


/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_SCROLL.gazeTarget=function responsiveCeilingComposition(){
 const c=BD_MUSEUM.camera,aspect=(W/c.ax)/(H/c.ay),s=BD_SCROLL.state,roof=BD_SCROLL.frame(Math.min(1350,Math.max(850,aspect*850)),780,0,true),width=Math.min(1536,Math.max(850,aspect*660)),left=BD_SCROLL.frame(width,560,880),right=BD_SCROLL.frame(width,1100,880),blend=function blendCamera(a,b,t){const u=Math.max(0,Math.min(1,t)),k=u*u*(3-2*u);return {x:a.x+(b.x-a.x)*k,y:a.y+(b.y-a.y)*k,z:a.z+(b.z-a.z)*k};


/* Code by Daniel using ChatGPT November 16, 2026 */
};
 if(!BD_VIEW.allowed())return s.mode==='mural'?left:roof;
 if(s.mode==='roof')return roof;if(s.mode==='mural')return blend(left,right,(1-Math.cos(s.elapsed/48*Math.PI*2))/2);
 const t=s.elapsed%64;if(t<6)return roof;if(t<16)return blend(roof,left,(t-6)/10);if(t<24)return left;if(t<36)return blend(left,right,(t-24)/12);if(t<44)return right;if(t<56)return blend(right,roof,(t-44)/12);return roof;


/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_SCROLL.updateGaze=function followTheCeiling(dt,snap){
 if(!BD_SCROLL.state){BD_SCROLL.state={mode:'tour',elapsed:0,paused:false,entering:true};game.path=[];game.pending=null;game.keys.clear();game.padMove=null;$('#hotspots').hidden=true;BD_SCROLL.controls();BD_MUSEUM.syncView();}
 const s=BD_SCROLL.state,c=BD_MUSEUM.camera,reframe=(snap||c.viewChanged)&&!s.entering;BD_SCROLL.controls();
 if(!document.hidden&&!$('#panel').open&&BD_VIEW.allowed()&&!s.paused)s.elapsed+=dt;
 const target=BD_SCROLL.gazeTarget(),k=reframe||!BD_VIEW.allowed()?1:1-Math.exp(-dt*2.8);if((!s.paused&&!$('#panel').open)||reframe||!BD_VIEW.allowed()){c.x+=(target.x-c.x)*k;c.y+=(target.y-c.y)*k;c.z+=(target.z-c.z)*k;}
 c.viewWidth=W/(c.z*c.ax);c.viewHeight=H/(c.z*c.ay);c.viewChanged=false;s.entering=false;game.dirty=true;


/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_SCROLL.updateLight=function revealMuralLight(dt){
 const target=BD_SCROLL.active()?1:0;if(!BD_VIEW.allowed())BD_SCROLL.light=target;else if(!document.hidden&&!$('#panel').open&&!BD_SCROLL.state?.paused)BD_SCROLL.light+=(target-BD_SCROLL.light)*(1-Math.exp(-dt*2));


/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_SCROLL.backdrop=function cachedScrollArchitecture(c,im,warm){
 const key=warm<.001?'covered':warm>.999?'lit':null;if(!key){c.drawImage(im,0,0,1536,2304);return;}BD_SCROLL.backgrounds=BD_SCROLL.backgrounds||{};
 if(!BD_SCROLL.backgrounds[key]){const cv=document.createElement('canvas');cv.width=im.width;cv.height=im.height;const d=cv.getContext('2d');d.filter=key==='covered'?'brightness(.55) saturate(.35)':'none';d.drawImage(im,0,0);BD_SCROLL.backgrounds[key]=cv;}
 c.save();c.filter='none';c.drawImage(BD_SCROLL.backgrounds[key],0,0,1536,2304);c.restore();

/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_SCROLL.paintMural=function softlyLightTheCliffs(c){
 if(BD_SCROLL.light<.002)return;const im=BD_ART.images['m4-scroll'];if(!im)return;
 if(!BD_SCROLL.muralLayer){const cv=document.createElement('canvas');cv.width=im.width;cv.height=im.height;const d=cv.getContext('2d'),ratio=im.height/2304;d.filter='brightness(1.07) saturate(1.04)';d.drawImage(im,0,0);d.filter='none';d.globalCompositeOperation='destination-in';const mask=d.createLinearGradient(0,500*ratio,0,1280*ratio);mask.addColorStop(0,'transparent');mask.addColorStop(.18,'white');mask.addColorStop(.8,'white');mask.addColorStop(1,'transparent');d.fillStyle=mask;d.fillRect(0,0,im.width,im.height);BD_SCROLL.muralLayer=cv;}
 c.save();c.globalAlpha=BD_SCROLL.light*.58;c.drawImage(BD_SCROLL.muralLayer,0,0,1536,2304);c.restore();


/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_SCROLL.key=function gazeKeyboard(event){
 if(!BD_SCROLL.active())return false;const key=event.key.toLowerCase();if(key==='escape'||key==='e'){event.preventDefault();BD_SCROLL.close();return true;}if(['arrowleft','arrowup','a','w','arrowright','arrowdown','d','s'].includes(key)){event.preventDefault();BD_SCROLL.choose(['arrowleft','arrowup','a','w'].includes(key)?'roof':'mural');return true;}if(key===' '&&!event.target.closest('#museum-gaze-controls button')){event.preventDefault();if(!event.repeat)BD_SCROLL.choose('pause');return true;}return false;


/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_SCROLL.pad=function gazeController(r){
 game.padMove=null;BD_CONTROLLER.hint('Oculus · left/right choose a view · X pause · Y gaze around · A/B floor');if(r.a||r.b){BD_SCROLL.close();return;}if(r.start){showSettings();return;}if(r.west)BD_SCROLL.choose('pause');if(r.north)BD_SCROLL.choose('tour');const direction=r.x<-.5||r.y<-.5?-1:r.x>.5||r.y>.5?1:0;if(direction&&direction!==BD_SCROLL.padDirection)BD_SCROLL.choose(direction<0?'roof':'mural');BD_SCROLL.padDirection=direction;if(r.lb)BD_SCROLL.choose('roof');if(r.rb)BD_SCROLL.choose('mural');


/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_SCROLL.rampActor=function walkPartwayUpTheRamp(t){
 const u=Math.max(0,Math.min(1,t.elapsed/(t.duration*.84))),s=u*u*(3-2*u),a=t.rampStart,b=[760,1425],d=[1090,1355],point=function rampPoint(v){const w=1-v;return [w*w*a[0]+2*w*v*b[0]+v*v*d[0],w*w*a[1]+2*w*v*b[1]+v*v*d[1]];


/* Code by Daniel using ChatGPT November 16, 2026 */
};let distance=0,last=a;for(let i=1;i<=20;i++){const p=point(s*i/20);distance+=Math.hypot(p[0]-last[0],p[1]-last[1]);last=p;}
 const p=point(s),angle=Math.atan2((1-s)*(b[1]-a[1])+s*(d[1]-b[1]),(1-s)*(b[0]-a[0])+s*(d[0]-b[0])),height=BD_ART.travelerHeight(a[1],{scene:'museum',room:'scroll'});return {...game.player,x:p[0],y:p[1],projectedHeight:height*(1-.04*s),facingAngle:angle,renderDirection:((Math.round(angle/(Math.PI/4))%8)+8)%8,walking:u<1,walkBlend:Math.min(1,u*10),gaitPhase:(t.rampPhase+distance/(height*.72))%1};


/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_SCROLL.startAscent=function approachTheRampFoot(){
 if(Math.hypot(game.player.x-BD_SCROLL.rampFoot[0],game.player.y-BD_SCROLL.rampFoot[1])>5)walkTo(BD_SCROLL.rampFoot,function enterRamp(){BD_MUSEUM.begin('story');

/* Code by Daniel using ChatGPT November 16, 2026 */
});else BD_MUSEUM.begin('story');

/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_SCROLL.paintAscent=function followRampAscent(time,t){
 const c=BD_MUSEUM.camera,z=Math.min(W/(800*c.ax),H/(540*c.ay)),w=W/(z*c.ax),h=H/(z*c.ay),k=Math.min(1,t.elapsed/1.25),ease=k*k*(3-2*k),x=Math.max(0,Math.min(1536-w,1010-w/2)),y=1380-h*.5;c.x=t.fromCamera.x+(x-t.fromCamera.x)*ease;c.y=t.fromCamera.y+(y-t.fromCamera.y)*ease;c.z=t.fromCamera.z+(z-t.fromCamera.z)*ease;c.viewWidth=W/(c.z*c.ax);c.viewHeight=H/(c.z*c.ay);BD_MUSEUM.draw(time);const fade=Math.max(0,(t.elapsed/t.duration-.82)/.18);if(fade){ctx.fillStyle='rgba(22,38,30,'+fade+')';ctx.fillRect(0,0,W,H);}


/* Code by Daniel using ChatGPT November 16, 2026 */
};
