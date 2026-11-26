'use strict';
window.BD_VIEW={inspections:new Set(),media:matchMedia('(prefers-reduced-motion: reduce)')};
BD_VIEW.allowed=function quietCameraAllowed(){return !!game.save&&!game.save.settings.reduced&&!BD_VIEW.media.matches;

/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_VIEW.install=function attachSharedSceneCamera(){
 if(BD_VIEW.layer)return;
 const layer=document.createElement('div');layer.id='scene-camera';layer.className='scene-camera';canvas.parentElement.insertBefore(layer,canvas);layer.append(canvas,$('#hotspots'));BD_VIEW.layer=layer;
 document.addEventListener('visibilitychange',BD_VIEW.tick);

/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_VIEW.scale=function sceneCompositorScale(){
 if(!BD_VIEW.layer)return 1;const transform=getComputedStyle(BD_VIEW.layer).transform;return transform==='none'?1:new DOMMatrixReadOnly(transform).a;

/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_VIEW.tick=function updateQuietCameras(){
 BD_VIEW.install();const allowed=BD_VIEW.allowed(),layer=BD_VIEW.layer,mode=allowed&&!document.hidden&&!$('#panel').open&&!game.flight&&!game.hallTransition&&!BD_MUSEUM.lookUp?'running':'paused';
 if(layer.classList.contains('camera-live')!==allowed)layer.classList.toggle('camera-live',allowed);
 if(layer.style.animationPlayState!==mode)layer.style.animationPlayState=mode;
 for(const state of BD_VIEW.inspections){
  if(!state.canvas.isConnected){state.stop();continue;}
  if(state.canvas.classList.contains('inspection-live')!==allowed)state.canvas.classList.toggle('inspection-live',allowed);
  const play=allowed&&!state.paused&&!document.hidden&&$('#panel').open?'running':'paused';if(state.canvas.style.animationPlayState!==play)state.canvas.style.animationPlayState=play;
  state.button.hidden=!allowed;
 }



/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_VIEW.inspect=function animateModelInspection(picture,key){
 const button=document.createElement('button');button.type='button';button.className='inspection-toggle';button.textContent='Pause view';button.setAttribute('aria-pressed','false');picture.parentElement.append(button);
 const last=BD_VIEW.lastInspection,carry=last?.key===key&&performance.now()-last.endedAt<200,state={canvas:picture,button,key,paused:!!(carry&&last.paused),stopped:false};
 button.textContent=state.paused?'Resume view':'Pause view';button.setAttribute('aria-pressed',String(!!state.paused));
 state.stop=function releaseModelCamera(){
  if(state.stopped)return;state.stopped=true;const animation=picture.getAnimations()[0];BD_VIEW.lastInspection={key,time:animation?.currentTime||0,paused:state.paused,endedAt:performance.now()};picture.classList.remove('inspection-live');picture.style.animationPlayState='';button.remove();BD_VIEW.inspections.delete(state);

/* Code by Daniel using ChatGPT November 16, 2026 */
};
 button.addEventListener('click',function pauseModelCamera(){state.paused=!state.paused;button.textContent=state.paused?'Resume view':'Pause view';button.setAttribute('aria-pressed',String(state.paused));BD_VIEW.tick();

/* Code by Daniel using ChatGPT November 16, 2026 */
});
 BD_VIEW.inspections.add(state);BD_VIEW.tick();
 // Choosing an atlas pin rebuilds its panel: retain that inspection's camera phase.
 const animation=picture.getAnimations()[0];if(animation&&carry)animation.currentTime=last.time;
 const previous=game.dialogCleanup;game.dialogCleanup=function finishInspectionCamera(){if(previous)previous();state.stop();

/* Code by Daniel using ChatGPT November 16, 2026 */
};
 return state;

/* Code by Daniel using ChatGPT November 16, 2026 */
};
