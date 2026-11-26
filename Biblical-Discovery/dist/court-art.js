'use strict';
window.BD_COURT_ART={
 descriptions:{
  scribe:'At the courtyard table, an apprentice unrolls parchment beside a reed pen and ink bowl.',
  record:'An illustrated overhead view of a marked limestone fragment where it lies in a practice square.',
  layers:'An illustrated soil section. A dark scoop of fill on the right interrupts both compacted floors.',
  evidence:'Two teens at an Olive Court table talk over a tray of study fragments.',
  stamp:'An engraved bronze practice stamp.',
  clay:'The practice design pressed into clay.'
 },
 image(id,cls='',alt=BD_COURT_ART.descriptions[id]){
  return '<img class="'+cls+'" src="'+BD_ART.assetURL('assets/v20-court-'+id+'.webp')+'" alt="'+escapeHTML(alt)+'" draggable="false">';
 },
 card(id){
  if(id==='seal'){
   return '<span class="court-card-art court-card-seal">'+BD_COURT_ART.image('stamp','','')+BD_COURT_ART.image('clay','','')+'</span>';
  }
  if(id==='cut-marks')return BD_COURT_ART.image('record','court-card-art cut-marks-preview','');
  if(id==='water-flow')return '<img class="court-card-art" src="'+BD_ART.assetURL('assets/v8-water.webp')+'" alt="" draggable="false">';
  return BD_COURT_ART.image(id,'court-card-art','');
 },
 record(s){
  const scale=s.values[0],north=s.values[1];
  return '<div class="court-record-frame">'+BD_COURT_ART.image('record','court-photo-found')+
   '<span class="court-record-tag">SQUARE B2</span>'+
   '<span class="court-record-north" style="--north:'+north*90+'deg" aria-label="North points '+['up','right','down','left'][north]+'">↑<small>N</small></span>'+
   '<span class="court-measure court-measure-'+scale+'" aria-label="10 cm scale bar"><i></i><small>10 cm</small></span></div>';
 },
 layers(s){
  const deposits=['Later pit fill','Upper floor','Lower occupation'];
  const markers=deposits.map((label,i)=>{
   const recorded=s.values.includes(i);
   return '<button class="court-deposit court-deposit-'+i+'" data-layer="'+i+'" '+(recorded?'disabled':'')+'>'+label+(recorded?' <span aria-label="recorded">✓</span>':'')+'</button>';
  }).join('');
  const coin=s.values.includes(1);
  const context=coin?'':s.values.includes(0)?'Pit fill recorded. Its mixed finds stay together.':'Look for the dark patch where the floor lines stop.';
  const log=coin?'<div class="court-coin"><img src="'+BD_ART.assetURL('assets/field-v12-coin.webp')+'" alt=""><p><b>From the upper floor</b><br>Practice coin minted in AD 50.</p></div>':'<p class="court-layer-clue">'+context+'</p>';
  return '<div class="court-soil-section">'+BD_COURT_ART.image('layers','court-soil-face')+markers+'</div>'+log;
 },
 seal(s){
  return '<div class="seal-board court-press">'+
   '<figure>'+BD_COURT_ART.image('stamp')+'<figcaption>Carved bronze</figcaption></figure>'+
   '<span aria-hidden="true">→</span>'+
   '<figure>'+BD_COURT_ART.image('clay',s.values[0]?'clay-face turned':'clay-face',s.values[0]?'Clay impression, reversed.':'Clay impression, unturned.')+'<figcaption>Your impression</figcaption></figure></div>';
 }
};
