'use strict';
window.BD_MAP_MARKERS={
 assets:['lamp','tack'].flatMap(family=>['off','selected','visited'].map(state=>'v19-map-'+family+'-'+state)),
 state(selected,visited){return selected?'selected':visited?'visited':'off';},
 path(family,state){return 'v19-map-'+family+'-'+state;},
 url(family,state){return BD_ART.assetURL('assets/'+BD_MAP_MARKERS.path(family,state)+'.webp');},
 icon(state='off'){
  return '<img class="map-marker-art" data-state="'+state+'" src="'+BD_MAP_MARKERS.url('lamp',state)+'" alt="" draggable="false">';
 },
 apply(button,state){
  const image=button.querySelector('.map-marker-art');
  if(image.dataset.state!==state){image.dataset.state=state;image.src=BD_MAP_MARKERS.url('lamp',state);}
  button.dataset.marker=state;
 },
 draw(c,family,state,x,y,size){
  const image=BD_ART.images[BD_MAP_MARKERS.path(family,state)];
  if(image)c.drawImage(image,x-size/2,y-size/2,size,size);
 },
 // Native keyboard/controller activation uses the button's ID. For a physical tap in a cluster,
 // resolve the location from the nearest painted center, even when two tap targets overlap.
 atPointer(event,button){
  if(!event.detail)return button;
  let nearest=button,distance=Infinity;
  for(const pin of $('#map-lamps').children){
   const r=pin.getBoundingClientRect();
   const d=Math.hypot(event.clientX-r.left-r.width/2,event.clientY-r.top-r.height/2);
   if(d<distance){distance=d;nearest=pin;}
  }
  return nearest;
 }
};
