'use strict';
// Rime's rescue and workshop follow-up. Scripture remains distinct from original dialogue.
const RIME_READINGS29=[
 {ref:'Isaiah 41:13',title:'The hand that holds you',halves:['For I am the LORD your God, who holds your right hand,','who says to you, “Do not fear, I will help you.'],book:'isa',chapter:41,note:'God speaks to Israel, his servant, in Isaiah 41. His faithfulness gives us courage to seek his help; this is not a promise that taking a dangerous risk cannot hurt us.',source:'https://www.biblegateway.com/passage/?search=Isaiah+41%3A13&version=CSB'},
 {ref:'Romans 12:21',title:'Conquer evil with good',halves:['Do not be conquered by evil,','but conquer evil with good.'],book:'rom',chapter:12,note:'Paul teaches Christians to bless their enemies, leave vengeance to God and meet evil with good. Helping someone does not mean keeping their wrongdoing secret or going alone into danger.',source:'https://www.blueletterbible.org/verse/csb/rom/12/21/'},
 {ref:'Isaiah 41:10',title:'I will help you',halves:['Do not fear, for I am with you; do not be afraid, for I am your God.','I will strengthen you; I will help you; I will hold on to you with my righteous right hand.'],book:'isa',chapter:41,note:'Read this alongside Isaiah 41:8–13, God’s promise to his servant Israel. The LORD is faithful and helps his people trust him.',source:'https://www.biblegateway.com/passage/?search=Isaiah+41%3A10&version=CSB'},
 {ref:'Psalm 121:2',title:'The Maker is our help',halves:['My help comes from the LORD,','the Maker of heaven and earth.'],book:'psa',chapter:121,note:'A song of ascent looks to the LORD who keeps his people. Prayer turns our fear toward the Maker who cares for us.',source:'https://www.blueletterbible.org/csb/psa/121/1/'},
 {ref:'Romans 5:8',title:'Loved while we were sinners',halves:['But God proves his own love for us in that','while we were still sinners, Christ died for us.'],book:'rom',chapter:5,note:'Paul grounds our hope in Christ’s death for sinners. Rime’s toy repairs follow his turning to Christ; they do not purchase forgiveness.',source:'https://www.biblegateway.com/passage/?search=Romans+5%3A8&version=CSB'}
];
function rimeLongReading29(){return state.tales.longReading29??(state.recall.difficulty==='hard');/* Code by Daniel using ChatGPT November 20, 2026 */}
function rimeRescueReadings29(){return RIME_READINGS29.slice(0,rimeLongReading29()?4:2);/* Code by Daniel using ChatGPT November 20, 2026 */}
function rimeTrials29(){
 return rimeRescueReadings29().flatMap(function halves(r){return [false,true].map(function half(opening){return [r.ref,r.ref,...r.halves,opening];/* Code by Daniel using ChatGPT November 20, 2026 */});/* Code by Daniel using ChatGPT November 20, 2026 */});
 /* Code by Daniel using ChatGPT November 20, 2026 */
}
function keepRimeVerses29(readings){
 let markdown=state.markdown;
 for(const reading of readings){
  const text=reading.halves.join(' ');
  if(cards.some(function existing(c){return reference09(c)===reading.ref&&c.translation==='CSB'&&Road.normalize(plain(c.text))===Road.normalize(text);/* Code by Daniel using ChatGPT November 20, 2026 */}))continue;
  const base='christmas-rime-'+reading.ref.toLowerCase().replace(/[^a-z0-9]+/g,'-');let id=base,n=1;
  while(cards.some(function used(c){return c.id===id;/* Code by Daniel using ChatGPT November 20, 2026 */}))id=base+'-'+(++n);
  const meta={id,translation:'CSB',locations:[],context_reference:reading.ref,context_note:reading.note,source_book:reading.book,source_chapter:reading.chapter};
  markdown+='\n\n## '+reading.ref+' (CSB)\n\n### '+reading.title+'\n\n'+text+'\n\n*Tags: courage, grace*\n\n#### Metadata\n\n```json\n'+JSON.stringify(meta,null,2)+'\n```\n';
 }
 if(markdown!==state.markdown){const parsed=Road.parse(markdown,'scripture');state.markdown=markdown;cards=parsed;refreshCount();save();}
 /* Code by Daniel using ChatGPT November 20, 2026 */
}
function rimePortrait29(expression=null){
 if(expression==='hopeful'||state.tales.converted)return g.rime[0];
 if(expression==='remorseful'||(state.room==='workshop'&&rimeAtWorkshop29()))return g.rimeSorry||g.rime[1];
 return !state.tales.rescued&&state.room==='mountain'?g.rimeHanging:g.rimeThreat;
 /* Code by Daniel using ChatGPT November 24, 2026 */
}
function refreshRimePortrait29(d,line){
 if(line.expression==='hopeful')d.rimeHopeful29=true;
 const keeper=line.name==='Workshop keeper',frame=keeper?g.neighbors[3]:rimePortrait29(d.rimeHopeful29?'hopeful':line.expression);
 const key=keeper?'keeper':frame===g.rime[0]?'hopeful':frame===g.rimeHanging?'worried':frame===g.rimeThreat?'gruff':'remorseful';
 const image=panel.querySelector('[data-actor="1"] img');
 if(image){
  const name=keeper?'Workshop keeper':state.tales.nameKnown?'Rime':'Snow Monster';
  if(image.dataset.speaker29!==key){image.src=frame.canvas.toDataURL();image.dataset.speaker29=key;}
  image.alt=name;panel.querySelector('[data-actor="1"] figcaption').textContent=name;
 }
 /* Code by Daniel using ChatGPT November 24, 2026 */
}
function rimeAtWorkshop29(){return !!(state.tales.rescued&&state.tales.escaped&&state.tales.workshop29);/* Code by Daniel using ChatGPT November 20, 2026 */}
function rimeWorkshopReminder29(){
 if(!rimeAtWorkshop29()||state.tales.converted)return '';
 return state.room==='workshop'?'Rime is beside the keeper’s workbench.':'Rime is bringing the toys to the keeper’s workshop. The workshop is off the Christmas gallery.';
 /* Code by Daniel using ChatGPT November 24, 2026 */
}
function rimeWorkshop29(){
 startDialogue09('rime',[
  ['npc','Rime brought the toys here himself. Come stand beside me.','Workshop keeper'],
  ['npc','Robin’s bear. Amina and Samir’s engine. Mrs Bell’s little bird. I took them all.'],
  ['npc','I broke the engine. I frightened their owners away. I frightened you. I was wrong. I’m sorry.'],
  ['elf','I’m glad you’ve told us.'],
  ['npc','You helped me when I couldn’t help myself. Is that what Jesus is like?'],
  ['elf','A little. He came much farther. At Christmas he came all the way down to us.'],
  ['npc','Christ died for us while we were still sinners. Listen to Paul’s words.','Workshop keeper'],
  ['npc',RIME_READINGS29[4].halves.join(' '),'Workshop keeper'],
  ['elf','Romans 5:8. Jesus died for our sins and rose again. We can turn to him and trust him.'],
  ['npc','Even before I’ve put everything right?'],
  ['npc','Yes. His mercy is a gift. Tell him the truth.','Workshop keeper']
 ],rimePrayer29,{action:'By the keeper’s bench',finishLabel:'Pray together'});
 /* Code by Daniel using ChatGPT November 20, 2026 */
}
function rimePrayer29(){
 startDialogue09('rime',[
  ['npc','Lord Jesus, I have been selfish and cruel. Please forgive me. I put my trust in you.',null,'hopeful'],
  ['elf','We can keep learning together.'],
  ['npc','You’re welcome here, Rime. We can pray, read God’s Word and help each other.','Workshop keeper'],
  ['npc','Then these toys need to go home. I want to tell their owners I’m sorry.'],
  ['npc','We’ll start with that little wheel. There’s room at the bench.','Workshop keeper'],
  ['npc','I brought my sign too. I think it needs new words.']
 ],function restoration(){
  const t=state.tales;t.converted=true;t.returned=true;t.workshopDone29=true;wonderState20().rimePlace21='workshop';state.quest.chapter=Math.max(3,state.quest.chapter);
  for(const toy of TOYS)if(toyStatus(toy.id)==='lost')state.quest.toys[toy.id]='found';
  keepRimeVerses29([RIME_READINGS29[4]]);
  const reading=RIME_READINGS29[4];
  const card=cards.find(c=>reference09(c)===reading.ref&&c.translation==='CSB'&&Road.normalize(plain(c.text))===Road.normalize(reading.halves.join(' ')));
  if(card)state.learned[card.id]=card.fingerprint;
  save();refreshCount();
  showPanel('<h2 id="panel-title">Going home</h2><p>Rime turns his sign around. The keeper finds a pot of cream paint.</p><p>All three toys are here. There’s mending to do, and people to visit together.</p><button class="primary" id="rime-bench29">Join the keeper at the repair bench</button><button id="rime-rest29">Stay a little while</button>','');$('#rime-bench29').onclick=repairBench;$('#rime-rest29').onclick=closePanel;
  /* Code by Daniel using ChatGPT November 24, 2026 */
 },{action:'A place at the workbench',finishLabel:'Help put things right'});
 /* Code by Daniel using ChatGPT November 20, 2026 */
}
function drawRimeSign29(){
 const image=g.images[state.tales.converted?'rime-home29':'rime-mine29'];if(!image)return;
 const w=190,h=w*image.height/image.width;ctx.drawImage(image,39*15.36-w/2,76*10.24-h,w,h);
 /* Code by Daniel using ChatGPT November 20, 2026 */
}
function drawRimeParcel29(){
 for(let i=0;i<TOYS.length;i++)if(!['repaired','delivered'].includes(toyStatus(TOYS[i].id)))paintSprite(g.toys[i],(42+i*6)*15.36,36*10.24,55);
 const im=g.images[state.tales.converted?'rime-home29':'rime-mine29'],w=155;ctx.drawImage(im,49*15.36-w/2,48*10.24-w*im.height/im.width,w,w*im.height/im.width);
 /* Code by Daniel using ChatGPT November 20, 2026 */
}
