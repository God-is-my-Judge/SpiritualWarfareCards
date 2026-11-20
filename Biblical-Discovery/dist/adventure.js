'use strict';
// The Water Route is a dramatized expedition. No new ancient inscription is claimed.
window.BD_ADVENTURE={rooms:['survey','bend','water','siloam'],games:['scribe','record','layers','seal','evidence','armor'],active:null,
 titles:{scribe:'The scribe’s desk',record:'Record before you lift',layers:'Last in, first out',seal:'Seal and impression',evidence:'Present the evidence',armor:'Stand firm'},
 next:{survey:'Record the first fragment',bend:'Join the tool marks',water:'Trace water to the pool',siloam:'Bring the field record home'},
 quotes:{siloam:{reference:'John 9:7 · CSB',text:'“Go,” he told him, “wash in the pool of Siloam” (which means “Sent”). So he left, washed, and came back seeing.',context:'Jesus sends the man born blind to wash. Read John 9 for his growing testimony.'},armor:{reference:'Ephesians 6:17 · CSB',text:'Take the helmet of salvation and the sword of the Spirit—which is the word of God.',context:'Read Ephesians 6:10–18. Paul calls Christians to stand in God’s strength, truth and prayer.'}}};
BD_ADVENTURE.state=function expeditionState(){
 const s=game.save;return s.adventure||(s.adventure={status:'invited',chamber:0,fragments:[],seals:[],hints:[],eggs:[],tasks:{}});
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.clean=function sanitizeAdventure(raw,clean){
 const a=raw.adventure||{},ids=BD_ADVENTURE.games.concat(['fragment-0','fragment-1','fragment-2']);
 const list=function safeList(value,allowed){return Array.isArray(value)?[...new Set(value.filter(function valid(v){return allowed.includes(v);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }))]:[];
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 clean.adventure={status:['invited','inside','escaped','complete'].includes(a.status)?a.status:'invited',chamber:Number.isInteger(a.chamber)?Math.max(0,Math.min(3,a.chamber)):0,fragments:list(a.fragments,[0,1,2]),seals:list(a.seals,BD_ADVENTURE.games),hints:list(a.hints,ids),eggs:list(a.eggs,['miriam','akeptous','priscilla']),tasks:{}};
 // Store only bounded numerical activity state. Never merge arbitrary imported keys.
 for(const id of ids){const t=a.tasks?.[id];if(!t||typeof t!=='object')continue;clean.adventure.tasks[id]={step:Number.isInteger(t.step)?Math.max(0,Math.min(12,t.step)):0,values:Array.isArray(t.values)?t.values.slice(0,16).map(function bounded(v){return Number.isInteger(v)?Math.max(-1,Math.min(12,v)):0;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }):[],phase:['copy','collate','done'].includes(t.phase)?t.phase:'copy'};}
 clean.settings.scholars=!!raw.settings?.scholars;
 return clean;
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.qualified=function qualifiedForSurvey(){
 const ids=Object.keys(game.save.finds),ot=ids.filter(function old(id){return BD_SITES.find(function site(s){return s.id===id;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 })?.hall==='ot';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }).length;return {count:ids.length,ot,nt:ids.length-ot,ready:ids.length>=6&&ot>=2&&ids.length-ot>=2};
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.notes=function availableFieldNotes(){const a=BD_ADVENTURE.state();return Math.max(0,Object.keys(game.save.finds).length+a.seals.length-a.hints.length);
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.buttons=function activityNavigation(){return '<div class="actions"><button class="button secondary" data-adventure="board">Expedition dossier</button><button class="button secondary" data-adventure="court">Olive court</button></div>';
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.quote=function scripturePanel(key){const q=BD_ADVENTURE.quotes[key];openPanel('SCRIPTURE · READ IN CONTEXT','<h2>'+escapeHTML(q.reference)+'</h2><blockquote class="scripture-reading">'+escapeHTML(q.text)+'</blockquote><p>'+escapeHTML(q.context)+'</p><p class="fine-print">'+escapeHTML(BD_SCRIPTURE_CREDIT)+'</p><button class="button" data-adventure="'+(key==='siloam'&&['escaped','complete'].includes(BD_ADVENTURE.state().status)?'ending':key==='siloam'?'resume':'armor')+'">Continue →</button>','water-scripture');
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.board=function expeditionDossier(){
 const a=BD_ADVENTURE.state(),q=BD_ADVENTURE.qualified(),ongoing=a.status==='inside',ended=['escaped','complete'].includes(a.status);
 openPanel('THE WATER ROUTE · ADVANCED EXPEDITION','<div class="expedition-dossier"><div class="expedition-cover"><span>JERUSALEM · ISRAEL</span><h2>The Water Route</h2><p>A passage sealed.<br>A way toward the light.</p><div class="dossier-seal">FIELD TEAM<br>APPLICATIONS OPEN</div></div><div><p class="eyebrow">MIRIAM’S SURVEY TEAM</p><p class="lede">Experienced excavators wanted. A newly opened survey branch needs a careful team.</p><p class="field-line">Miriam: “Build your field record. Then come with us.”</p><p class="fine-print">Christianity names places, rulers and witnesses. Explore the public accounts. Compare Acts 26:26.</p><ul class="resume-list"><li>'+Math.min(6,q.count)+' / 6 completed excavations</li><li>'+Math.min(2,q.ot)+' / 2 Old Testament finds</li><li>'+Math.min(2,q.nt)+' / 2 New Testament finds</li></ul><p><b>'+BD_ADVENTURE.notes()+' field notes</b> · extra hints from finds and practice seals.</p><p class="fine-print">Fictional adventure near a real water system. Rockfall and water scenes. A dry route and companion help are always available.</p><div class="actions">'+(ongoing?'<button class="button" data-adventure="resume">Resume the survey →</button>':ended?'<button class="button" data-adventure="ending">Your completed field record →</button>':q.ready?'<button class="button" data-adventure="depart">Join the expedition →</button>':'<button class="button" data-adventure="apply">Apply to the field team →</button>')+'<button class="button secondary" data-action="atlas">Build my field record</button></div></div></div><details class="note-block"><summary>What is real here?</summary><p>Hezekiah’s tunnel, its known Siloam inscription, and the later stepped Pool of Siloam are real. Our side branch, rockfall, escape route and three study fragments are fictional. They add no new evidence to the historical case.</p><p>The inscription describes workers meeting and water reaching the pool. It does not name a king. Its writing, tunnel engineering and scientific dating fit the late eighth century BC, the period of Hezekiah. The stepped pool setting at the end represents a much later period.</p></details>'+BD_ADVENTURE.buttons(),'water-dossier');
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.depart=function prepareSurvey(){
 if(!BD_ADVENTURE.qualified().ready){BD_ADVENTURE.apply();return;}
 openPanel('MIRIAM · BEFORE THE SURVEY','<h2>One team. Three field tasks.</h2><p class="field-line">Miriam: “Record the place. Follow the marks. Trace the water.”</p><div class="water-kit"><span>▤ Field notebook</span><span>⌖ Survey plan</span><span>◉ Lamp &amp; radio</span></div><p>The team has your route. You can leave or call for help at any time.</p><p class="fine-print">This is a fictional adventure. The real tunnel is not a diving route.</p><div class="actions"><button class="button" data-adventure="start">Begin the survey →</button><button class="button secondary" data-adventure="board">Later</button></div>','water-depart');
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.apply=function applyForSurvey(){const q=BD_ADVENTURE.qualified();toast(q.ready?'Your field record is ready. Welcome to the survey team.':'Miriam: Six excavations, with two finds from each Testament. Your place is waiting.');if(q.ready)BD_ADVENTURE.depart();
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.enter=function enterWaterRoute(index){const a=BD_ADVENTURE.state();if(a.status!=='inside'&&!['escaped','complete'].includes(a.status))return;index=Math.max(0,Math.min(index,a.fragments.length,3));a.chamber=index;persist();BD_MUSEUM.enter(BD_ADVENTURE.rooms[index],{arrival:[810,910]});
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.start=function beginWaterRoute(){
 if(!BD_ADVENTURE.qualified().ready)return;const a=BD_ADVENTURE.state();a.status='inside';a.chamber=0;persist();const destination=BD_SITES.find(function jerusalem(site){return site.id==='bethesda';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });BD_FLIGHT.start(destination);Object.assign(game.flight,{waterRoute:true,duration:30,needsPractice:false,title:'The Water Route · Jerusalem',notes:[{title:'Miriam · the survey',speaker:'miriam',text:'Our route follows water beneath the City of David.',reference:'Hezekiah’s water system · around 700 BC',seconds:8},{title:'Miriam · two teams',speaker:'miriam',text:'The known inscription remembers workers cutting toward one another.',reference:'The Siloam inscription · discovered in 1880',seconds:10},{title:'Sam · prepare the notebook',speaker:'sam',text:'Record the place. Join the marks. Trace the water.',reference:'Next: a fictional survey beside the real tunnel',seconds:12}],lastNote:-1});$('#scene-title').textContent='Flying to Jerusalem';$('#scene-note').textContent='The Water Route · field survey';BD_FLIGHT.refresh();
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.cutscene=function waterSequence(kind){
 const water=kind==='water',still=game.save.settings.reduced||!BD_VIEW.allowed();
 openPanel(water?'A BRIEF WATER PASSAGE':'THE WAY BACK CLOSES','<div class="water-cinematic '+(water?'underwater':'rockfall')+(still?' still':'')+'"><span aria-hidden="true">'+(water?'◌':'⋰')+'</span><h2>'+(water?'Light beyond the stone.':'A rumble. Falling dust. Silence.')+'</h2></div><p class="field-line">'+(water?'Miriam: “We’re through. The pool is just ahead.”':'Sam: “The return is blocked. Our survey team knows.”')+'</p><p>'+(water?'A short cinematic passage. No breath meter or timed input.':'Miriam: “Stay together. We’ll find the way toward the light.”')+'</p><div class="actions"><button class="button" data-adventure="'+(water?'surface':'rockfall-next')+'">'+(water?'Surface in the light →':'Open the field notebook →')+'</button><button class="button secondary" data-adventure="exit">Return to the museum</button></div>','water-sequence');
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.task=function savedActivity(id,initial){const a=BD_ADVENTURE.state();return a.tasks[id]||(a.tasks[id]={step:0,values:initial||[],phase:'copy'});
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.finishTask=function earnStudySeal(id,line){
 const a=BD_ADVENTURE.state();if(!a.seals.includes(id)){a.seals.push(id);chime();}BD_ADVENTURE.task(id).phase='done';persist();
 openPanel('FIELD PRACTICE · SEAL EARNED','<div class="practice-stamp">FIELD<br>READY ✓</div><h2>'+escapeHTML(BD_ADVENTURE.titles[id])+'</h2><p class="field-line">Miriam: “'+escapeHTML(line)+'”</p><p>'+BD_ADVENTURE.notes()+' field notes available. A replay practices the skill; each seal earns one note.</p><div class="actions"><button class="button" data-adventure="court">Back to the court →</button><button class="button secondary" data-adventure="board">My expedition dossier</button><button class="button secondary" data-practice-replay="'+id+'">Practice again</button></div>','practice-complete');
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.hint=function fieldHint(id,text){
 const a=BD_ADVENTURE.state();if(!a.hints.includes(id)&&BD_ADVENTURE.notes()>0){a.hints.push(id);persist();}const box=$('#practice-message');if(box)box.textContent=text;else toast(text);
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.practiceFrame=function openPractice(id,instruction,body){
 BD_ADVENTURE.active=id;openPanel('FIELD PRACTICE · '+BD_ADVENTURE.titles[id].toUpperCase(),'<div class="practice-top"><p class="eyebrow">MIRIAM’S WORKBENCH</p><span>'+BD_ADVENTURE.notes()+' field notes</span></div><h2>'+escapeHTML(BD_ADVENTURE.titles[id])+'</h2><p class="field-line">Miriam: “'+escapeHTML(instruction)+'”</p><div class="practice-board" data-game="'+id+'">'+body+'</div><p id="practice-message" class="practice-feedback" role="status">Next: handle the pieces on the board.</p><div class="actions"><button class="button secondary" data-practice-help="'+id+'">Work one step with Miriam</button><button class="button secondary" data-adventure="court">Back to the olive court</button></div>','practice-game');
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.play=function choosePractice(id){
 if(!BD_ADVENTURE.games.includes(id))return;
 if(id==='scribe')BD_ADVENTURE.scribe();else if(id==='record')BD_ADVENTURE.record();else if(id==='layers')BD_ADVENTURE.layers();else if(id==='seal')BD_ADVENTURE.seal();else if(id==='evidence')BD_ADVENTURE.evidence();else BD_ADVENTURE.armor();
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.scribe=function scribesDesk(){
 const s=BD_ADVENTURE.task('scribe',[-1,-1,-1,-1,-1,-1]),words=['The','lamp','stood','beside','the','door.'],choices=[['The','This'],['lamp','lamb'],['stood','stood stood'],['beside','behind'],['the','that'],['door.','floor.']];
 if(s.phase==='done'){s.phase='copy';s.values=[-1,-1,-1,-1,-1,-1];}
 const copying=s.phase==='copy';
 BD_ADVENTURE.practiceFrame('scribe',copying?'Make your copy. Then put the exemplar away.':'Restore the damaged practice copy. Compare the surviving witnesses.',(copying?'<div class="exemplar"><small>EXEMPLAR · TRAINING SENTENCE</small><p>The lamp stood beside the door.</p></div>':'<p>Your copied line is set aside. Restore this damaged practice copy.</p><div class="witness-copies"><p><b>Copy A</b> The lamb stood beside the door.</p><p><b>Copy B</b> The lamp stood stood beside the door.</p><p><b>Copy C</b> The lamp stood beside the floor.</p></div><p class="fine-print">Each witness has a slip. Compare their agreement at each place.</p>')+'<div class="scribe-copy">'+choices.map(function word(options,i){return '<label><span>Word '+(i+1)+'</span><select data-scribe-word="'+i+'"><option value="-1">Choose…</option>'+options.map(function option(w,n){return '<option value="'+n+'" '+(s.values[i]===n?'selected':'')+'>'+w+'</option>';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }).join('')+'</select></label>';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }).join('')+'</div><button class="button" data-adventure="scribe-check">'+(copying?'Put the exemplar away →':'Check the recovered line →')+'</button><p class="fine-print">A made-up sentence, not a reconstruction of a biblical manuscript.</p>');
 for(const el of document.querySelectorAll('[data-scribe-word]'))el.addEventListener('change',function chooseCopyWord(){s.values[Number(this.dataset.scribeWord)]=Number(this.value);persist();
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.scribeCheck=function compareCopies(){const s=BD_ADVENTURE.task('scribe');if(s.phase==='copy'){if(s.values.some(function unfilled(v){return v<0;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 })){$('#practice-message').textContent='Finish your copy before putting the exemplar away.';return;} // A separately labeled damaged copy is used for collation.
 s.phase='collate';s.values[1]=1;s.values[5]=1;persist();BD_ADVENTURE.scribe();return;}
 if(s.values.every(function exact(v){return v===0;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }))BD_ADVENTURE.finishTask('scribe','Comparing written witnesses helps us recover the line. Keep the copies.');else $('#practice-message').textContent='Compare the copies one word at a time. Which slips explain their differences?';
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.record=function recordShot(fragment=false){
 const id=fragment?'fragment-0':'record',s=BD_ADVENTURE.task(id,[0,0,0]);
 const body='<div class="record-board"><div class="north-indicator" style="transform:rotate('+s.values[1]*90+'deg)">N ↑</div><div class="record-fragment" aria-label="Fictional limestone practice fragment">╱ ╱ ╱</div><div class="photo-scale scale-'+s.values[0]+'" aria-label="Scale bar">▰▱▰▱▰ <small>10 cm</small></div><span class="record-tag">SQUARE B2 · IN PLACE</span></div><div class="actions"><button class="button secondary" data-record="scale">Move scale · '+(s.values[0]===1?'beside find':s.values[0]===2?'across find':'far away')+'</button><button class="button secondary" data-record="north">Turn north arrow · '+['up','right','down','left'][s.values[1]]+'</button><button class="button" data-record="shutter">Record photograph</button></div><p class="fine-print">Plan north points up. Put the scale beside the find without covering its marks.</p>';
 if(fragment)BD_ADVENTURE.fragmentFrame(0,'Record this fragment before we lift it.',body);else BD_ADVENTURE.practiceFrame('record','Set north. Place the scale. Record before you lift.',body);
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.layers=function layerTray(){
 const s=BD_ADVENTURE.task('layers',[]),names=['Later pit fill','Upper floor','Lower occupation'];
 BD_ADVENTURE.practiceFrame('layers','Remove the latest deposit first. Keep each find’s context.','<div class="layer-section"><div class="pit">LATER PIT ↓</div>'+names.map(function layer(name,i){return '<button class="soil-layer layer-'+i+'" data-layer="'+i+'" '+(s.values.includes(i)?'disabled':'')+'>'+name+(s.values.includes(i)?' · recorded ✓':i===1?' · coin minted AD 50':'')+'</button>';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }).join('')+'</div>'+(s.values.length===3?'<p>The upper floor holds a coin minted in AD 50.</p><div class="actions"><button class="button" data-layer-date="0">Floor laid exactly in AD 50</button><button class="button" data-layer-date="1">Floor is AD 50 or later</button></div>':'<p class="fine-print">The pit cuts both floors. Its fill was deposited after the layers it cuts.</p>'));
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.seal=function sealAndStamp(){
 const s=BD_ADVENTURE.task('seal',[0]);
 BD_ADVENTURE.practiceFrame('seal','A seal reverses in clay. Turn it over in your mind.','<div class="seal-board"><div><small>CARVED SEAL</small><div class="seal-face">◁<span>••</span></div></div><span>→ CLAY →</span><div><small>YOUR IMPRESSION</small><div class="seal-face impression '+(s.values[0]?'reversed':'')+'">◁<span>••</span></div></div></div><div class="actions"><button class="button secondary" data-seal="flip">Reverse the impression</button><button class="button" data-seal="press">Press and compare →</button></div><p class="fine-print">An invented practice design. Real seals identified owners and officials.</p>');
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.evidence=function evidenceConversation(){
 const s=BD_ADVENTURE.task('evidence',[]),found=BD_SITES.filter(function collected(site){return !!game.save.finds[site.id];
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });
 const body=s.step<2?'<blockquote>'+(s.step===0?'Visitor: “David is just a legend.”':'Visitor: “I mean nobody knew a dynasty called David’s house.”')+'</blockquote><div class="actions"><button class="button" data-evidence-question="meaning">What do you mean by that?</button><button class="button" data-evidence-question="reason">How did you come to that conclusion?</button></div>':'<blockquote>Visitor: “I assumed the name was invented much later. Is there an early outside record?”</blockquote><div class="evidence-objects">'+found.map(function object(site){return '<button data-evidence-object="'+site.id+'"><img src="'+BD_ART.assetURL('assets/find-'+(site.art===6?'6-v2':site.art)+'.webp')+'" alt=""><span>'+escapeHTML(site.artifact)+'</span></button>';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }).join('')+'</div>'+(!game.save.finds['tel-dan']?'<p>Tel Dan is the relevant find. <button class="button secondary" data-fly="tel-dan">Investigate it first</button></p>':'');
 BD_ADVENTURE.practiceFrame('evidence','Understand the claim. Then choose evidence that answers it.',body);
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.armor=function armorOfGod(){
 const s=BD_ADVENTURE.task('armor',[-1,-1,-1,-1,-1,-1]),items=['Belt','Breastplate','Shoes','Shield','Helmet','Sword'],words=['truth','righteousness','the gospel of peace','faith','salvation','the word of God'];
 BD_ADVENTURE.practiceFrame('armor','Pair Paul’s images with his words. Our strength comes from God.','<div class="armor-board">'+items.map(function armor(item,i){return '<label><span class="armor-emblem" aria-hidden="true">'+['⌁','♜','⌇','◇','◠','†'][i]+'</span><b>'+item+'</b><select data-armor="'+i+'"><option value="-1">Choose…</option>'+[3,0,5,2,4,1].map(function meaning(j){return '<option value="'+j+'" '+(s.values[i]===j?'selected':'')+'>'+words[j]+'</option>';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }).join('')+'</select></label>';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }).join('')+'</div><div class="actions"><button class="button" data-adventure="armor-check">Stand firm →</button><button class="button secondary" data-adventure="armor-scripture">Read Ephesians 6:17 · CSB</button></div><p class="fine-print">Ephesians 6:10–18. These are Paul’s images for Christian life, not attacks on other people.</p>');
 for(const el of document.querySelectorAll('[data-armor]'))el.addEventListener('change',function pairArmor(){s.values[Number(this.dataset.armor)]=Number(this.value);persist();
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.help=function companionPractice(id){
 if(id==='scribe'){const s=BD_ADVENTURE.task(id),i=s.values.findIndex(function slip(v){return v!==0;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });if(i>=0)s.values[i]=0;persist();BD_ADVENTURE.scribe();$('#practice-message').textContent='Miriam: Compare where two witnesses agree. We corrected one word.';}
 else if(id==='record'){const s=BD_ADVENTURE.task(id,[0,0,0]);if(s.values[0]!==1)s.values[0]=1;else s.values[1]=0;persist();BD_ADVENTURE.record();$('#practice-message').textContent='Miriam: The scale sits beside the find. Plan north points up.';}
 else if(id==='layers'){const s=BD_ADVENTURE.task(id);if(s.values.length<3){s.values.push(s.values.length);persist();BD_ADVENTURE.layers();}else $('#practice-message').textContent='Miriam: A coin can stay in use. It gives the earliest possible date.';}
 else if(id==='seal'){BD_ADVENTURE.task(id,[0]).values[0]=1;persist();BD_ADVENTURE.seal();$('#practice-message').textContent='Miriam: The pointed end changes sides when pressed.';}
 else if(id==='evidence'){const s=BD_ADVENTURE.task(id);s.step=Math.min(2,s.step+1);persist();BD_ADVENTURE.evidence();$('#practice-message').textContent='Miriam: Tel Dan names the House of David. It answers a specific claim.';}
 else if(id==='armor'){const s=BD_ADVENTURE.task(id),i=s.values.findIndex(function unmatched(v,i){return v!==i;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });if(i>=0)s.values[i]=i;persist();BD_ADVENTURE.armor();$('#practice-message').textContent='Miriam: God equips his people. Read the passage as you match.';}
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.fragmentFrame=function tunnelTask(index,line,body){
 const a=BD_ADVENTURE.state(),id='fragment-'+index;BD_ADVENTURE.active=id;
 openPanel('THE WATER ROUTE · FRAGMENT '+(index+1)+' OF 3','<p class="eyebrow">FICTIONAL STUDY FRAGMENT · '+a.fragments.length+' / 3 RECORDED</p><h2>'+['Keep its place','Two teams meet','From spring to pool'][index]+'</h2><p class="field-line">Miriam: “'+line+'”</p><div class="practice-board" data-game="'+id+'">'+body+'</div><p id="practice-message" class="practice-feedback" role="status">Next: '+['set the scale and north arrow, then record','join the cut marks across the three pieces','join descending channels and choose the direction in Chronicles'][index]+'.</p><div class="actions"><button class="button secondary" data-fragment-help="'+index+'">Work one step with Miriam · free</button><button class="button secondary" data-fragment-hint="'+index+'">'+(a.hints.includes(id)?'Read my field hint':BD_ADVENTURE.notes()?'Use one field note · extra hint':'Read a companion hint · free')+'</button><button class="button secondary" data-adventure="field-guide">Scripture &amp; field guide</button><button class="button secondary" data-adventure="exit">Save &amp; return to the museum</button></div>','tunnel-task');
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.fragment=function inspectFragment(index){
 const a=BD_ADVENTURE.state();if(a.status!=='inside'||index>a.fragments.length)return;
 if(a.fragments.includes(index)){BD_ADVENTURE.recovered(index);return;}
 if(index===0){BD_ADVENTURE.record(true);return;}
 const s=BD_ADVENTURE.task('fragment-'+index,index===1?[2,0,3]:[3,0,2]),water=index===2;
 if(water){BD_ADVENTURE.waterChannels(s);return;}
 BD_ADVENTURE.fragmentFrame(index,water?'Match each outlet to the next inlet. Keep the water descending.':'Turn each piece until the cut marks meet.',(water?'<div class="channel-ends"><span>GIHON SPRING →</span><span>→ POOL</span></div>':'<p class="fine-print">The two outside marks are level. Make one continuous cutting line.</p>')+'<div class="channel-pieces '+(water?'water-pieces':'mark-pieces')+'">'+s.values.map(function piece(turn,i){return '<button data-fragment-turn="'+i+'" aria-label="Rotate piece '+(i+1)+', '+turn*90+' degrees"><span style="transform:rotate('+turn*90+'deg)">'+(water?'┗':'╱ ╱ ╱')+'</span><small>Piece '+(i+1)+' · '+turn*90+'° ↻</small></button>';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }).join('')+'</div><button class="button" data-fragment-check="'+index+'">'+(water?'Test the flow →':'Compare the join →')+'</button><p class="fine-print">'+(water?'A simplified channel model. The descending path follows each ┗ turned 90° clockwise.':'Marks on all three pieces continue at 0°. This teaches joining, not ancient translation.')+'</p>');
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.waterChannels=function connectWaterChannels(s){
 BD_ADVENTURE.fragmentFrame(2,'Match each outlet to the next inlet. Keep the water descending.','<div class="channel-ends"><span>GIHON SPRING · LEVEL 3</span><span>POOL · LEVEL 0</span></div><div class="channel-pieces water-profiles">'+s.values.slice(0,3).map(function channel(out,i){const inlet=3-i,y1=145-inlet*35,y2=145-out*35;return '<button data-fragment-turn="'+i+'" aria-label="Change outlet '+(i+1)+', inlet '+inlet+', outlet '+out+'"><svg viewBox="0 0 200 180" aria-hidden="true"><path d="M0 145H200M0 110H200M0 75H200M0 40H200" stroke="#aa9465" stroke-dasharray="3 6"/><path d="M0 '+y1+' L200 '+y2+'" fill="none" stroke="#71603a" stroke-width="25"/><path d="M0 '+y1+' L200 '+y2+'" fill="none" stroke="#39909a" stroke-width="12"/><circle cx="9" cy="'+y1+'" r="8" fill="#dfc285"/><circle cx="191" cy="'+y2+'" r="8" fill="#dfc285"/></svg><small>Inlet '+inlet+' → outlet '+out+'<br>Change outlet ↻</small></button>';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }).join('')+'</div><p class="fine-print">A simplified model. Equal heights join; water must descend. Change an outlet by pressing its piece.</p><div class="note-block"><b>2 Chronicles 32:30 · field paraphrase</b><p>Hezekiah redirected Gihon’s waters westward toward the City of David.</p></div><p>Which way should the survey follow?</p><div class="actions"><button class="button secondary" data-water-direction="0" aria-pressed="'+(s.values[3]===0)+'">North ↑</button><button class="button secondary" data-water-direction="1" aria-pressed="'+(s.values[3]===1)+'">West ←</button></div><button class="button" data-fragment-check="2">Test the flow &amp; route →</button>');
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.fragmentHelp=function workOneFragmentStep(index){const id='fragment-'+index,s=BD_ADVENTURE.task(id,index===0?[0,0,0]:[0,0,0]);if(index===0){if(s.values[0]!==1)s.values[0]=1;else s.values[1]=0;}else{const targets=index===1?[0,0,0]:[2,1,0],i=s.values.slice(0,3).findIndex(function mismatch(v,n){return v!==targets[n];
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });if(i>=0)s.values[i]=targets[i];else if(index===2)s.values[3]=1;}persist();BD_ADVENTURE.fragment(index);$('#practice-message').textContent='Miriam: One step together. You can keep the notebook open.';
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.collect=function recordRecoveredFragment(index){
 const a=BD_ADVENTURE.state();if(index>a.fragments.length)return;if(!a.fragments.includes(index))a.fragments.push(index);persist();chime();BD_ADVENTURE.recovered(index);
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.recovered=function recoveredFragment(index){
 const lines=['A find’s position is evidence. Record before you lift.','The known inscription describes two cutting teams meeting inside the rock.','Hezekiah redirected Gihon’s water westward. Compare 2 Chronicles 32:30.'];
 openPanel('FIELD RECORD SAVED','<div class="fragment-receipt"><span aria-hidden="true">'+['╱','╱ ╱','≈'][index]+'</span><p>STUDY FRAGMENT '+(index+1)+' · RECORDED ✓</p></div><h2>'+['A place kept','A join recovered','A route made clear'][index]+'</h2><p class="field-line">Miriam: “'+lines[index]+'”</p><p class="fine-print">This fragment belongs to our fictional adventure. The real historical evidence is explained in the field guide.</p><div class="actions"><button class="button" data-adventure="next-chamber">'+(index===2?'Choose the last passage →':'Continue along the passage →')+'</button><button class="button secondary" data-adventure="field-guide">Read the historical connection</button></div>','fragment-recovered');
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.routeChoice=function chooseLastPassage(){
 openPanel('THE LAST PASSAGE','<h2>A glimpse of daylight.</h2><p class="field-line">Miriam: “The team can guide either route. We stay together.”</p><div class="route-options"><button data-adventure="wet"><b>Through the water</b><span>A brief cinematic dip, then daylight.</span></button><button data-adventure="dry"><b>Along the dry ledge</b><span>A calm passage with the same discoveries.</span></button></div><p class="fine-print">Imagined routes, not a plan of the real tunnel. There is no timing or breath challenge.</p>','water-choice');
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.surface=function reachSiloam(){const a=BD_ADVENTURE.state();a.status='escaped';a.chamber=3;persist();BD_ADVENTURE.enter(3);toast('Miriam: Siloam. A real place in John’s account. Take a moment.');
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.fieldGuide=function waterFieldGuide(){
 openPanel('THE WATER ROUTE · OPEN NOTEBOOK','<h2>Water. Workers. Written accounts.</h2><div class="facts"><div class="fact"><b>2 Kings 20:20</b><p>The account credits Hezekiah with a pool and conduit bringing water into the city.</p></div><div class="fact"><b>2 Chronicles 32:30</b><p>Hezekiah redirects the Gihon waters westward toward the City of David.</p></div><div class="fact"><b>The Siloam inscription</b><p>The known text describes two cutting teams meeting and water flowing from source to pool. Discovered in 1880, the original is now in Istanbul. It names no king.</p></div><div class="fact"><b>Dating and engineering</b><p>Letter forms and radiometric work support an Iron Age tunnel, around 700 BC. Together, the evidence fits the biblical setting.</p></div><div class="fact"><b>John 9 · Siloam</b><p>Jesus sends a man born blind to wash. The later stepped pool helps us picture that named place.</p></div><div class="fact"><b>John 5 · Bethesda</b><p>A different pool and a different healing: a man disabled for thirty-eight years. The Gospels describe people, places and events.</p></div></div><p>The real tunnel outlet, later pools and their paths have changed across centuries. Our exit combines them for a fictional adventure, not an exact reconstructed route.</p><div class="actions"><button class="button" data-adventure="resume">Return to the passage →</button><button class="button secondary" data-adventure="siloam-scripture">Read John 9:7 · CSB</button></div>','water-guide');
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.ending=function waterRouteEnding(){
 const a=BD_ADVENTURE.state();if(!['escaped','complete'].includes(a.status)){BD_ADVENTURE.fieldGuide();return;}
 a.status='complete';persist();
 openPanel('THE WATER ROUTE · FIELD RECORD COMPLETE','<div class="ending-painting" style="background-image:url(\''+BD_ART.assetURL('assets/v8-siloam.webp')+'\')"></div><div class="collected-fragments" aria-label="Three fictional study fragments recorded"><span>╱<small>CONTEXT</small></span><span>╱ ╱<small>THE JOIN</small></span><span>≈<small>THE WATER</small></span></div><p class="eyebrow">THREE FRAGMENTS · ONE TEAM · HOME IN THE LIGHT</p><h2>Bring the light home.</h2><p class="field-line">Miriam: “You kept the record. Now help someone else see.”</p><p>The tunnel, inscription and pool connect written accounts with real places. John’s account invites us further: consider who Jesus is, and why his witnesses believed.</p><p>Paul reasoned and persuaded. We can listen carefully, offer evidence and open Scripture together. God uses these means to strengthen faith. We are made right with God through faith in Christ, whose grace is a gift.</p><p class="field-line">Sam: “A good answer can begin a good conversation.”</p><details class="note-block"><summary>Faith that God keeps · Jude 20–25</summary><blockquote>But you, dear friends, as you build yourselves up in your most holy faith, praying in the Holy Spirit,</blockquote><p>Jude 20 · CSB. Continue through verses 21–25: wait for Christ’s mercy, and praise God who can keep his people from stumbling.</p><p class="fine-print">'+escapeHTML(BD_SCRIPTURE_CREDIT)+'</p></details><div class="actions"><button class="button" data-adventure="home">Place the field record in the museum →</button><button class="button secondary" data-adventure="siloam-scripture">Read John 9:7 · CSB</button><button class="button secondary" data-book="new-r" data-page="20">Consider the eyewitness case</button></div><details class="note-block"><summary>Water, new life and the Christian imagination</summary><p>Coming into daylight through water may remind Christians of baptism and new life in Christ. That is a reflection on our adventure. John 9 narrates a healing; this game does not turn escaping a tunnel into baptism or a way of earning salvation.</p></details><p class="fine-print">The painting imagines the late Second Temple setting. Our rockfall and fragments are fiction. The original Siloam inscription remains in its museum.</p>','water-ending');
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.egg=function hiddenFieldNote(id){
 const a=BD_ADVENTURE.state();if(!a.eggs.includes(id))a.eggs.push(id);persist();const lines={miriam:['A field director’s margin','Miriam: “Careful observation belongs to anyone willing to look.”','A pressed olive leaf marks her survey notebook. Inside: three tiny stars and “Leave a record worth trusting.”'],akeptous:['Remember her name','Akeptous gave the table. The floor preserved her generosity.','The Megiddo community also remembered Primilla, Cyriaca, Dorothea and Chreste. Women belong in this history. Their individual roles are not all specified.'],priscilla:['A conversation worth finding','Priscilla and Aquila helped Apollos understand God’s way more accurately.','Read Acts 18:24–28. Learning, hospitality and thoughtful explanation belong together.']},line=lines[id];openPanel('A NOTE IN THE MARGIN','<h2>'+line[0]+'</h2><p class="field-line">'+line[1]+'</p><p>'+line[2]+'</p><p class="fine-print">Optional discoveries · '+a.eggs.length+' / 3 notes found. Available to every explorer.</p><button class="button" data-adventure="close">Keep exploring →</button>','water-egg');
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.hotspots=function adventureRoomPlaces(){
 const room=BD_MUSEUM.room,a=BD_ADVENTURE.state();
 const spot=function point(id,x,y,label,action){return {id,x,y,label,icon:'◇',point:nearestFree(x,Math.max(760,y+155)),action};
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 if(room==='court')return [spot('scribe',440,565,'The scribe’s desk',function scribeDesk(){BD_ADVENTURE.play('scribe');
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }),spot('record',820,545,'Context & layers',function contextTable(){BD_ADVENTURE.tableMenu('context');
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }),spot('seal',1220,565,'Seals & conversations',function sealTable(){BD_ADVENTURE.tableMenu('seal');
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }),spot('court-return',130,740,'Entry Hall ←',function returnFromCourt(){BD_MUSEUM.begin('entry');
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }),spot('miriam-margin',1450,790,'A pressed leaf',function margin(){BD_ADVENTURE.egg('miriam');
 /* Code by Daniel using ChatGPT November 17, 2026 */
 })];
 if(!BD_ADVENTURE.rooms.includes(room))return [];
 const index=BD_ADVENTURE.rooms.indexOf(room);
 if(index===3)return [spot('siloam-account',470,700,'Siloam · John’s account',function john(){BD_ADVENTURE.quote('siloam');
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }),spot('siloam-home',1170,730,'The field record · home',BD_ADVENTURE.ending)];
 return [spot('fragment-'+index,470,650,'Study fragment '+(index+1)+(a.fragments.includes(index)?' · recorded':' · investigate'),function fragment(){BD_ADVENTURE.fragment(index);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }),spot('passage-on',1200,620,'Along the passage →',function passage(){if(!a.fragments.includes(index)){toast('Miriam: Record the fragment first. We can work it together.');BD_ADVENTURE.fragment(index);}else if(index===2)BD_ADVENTURE.routeChoice();else BD_ADVENTURE.enter(index+1);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }),spot('survey-radio',900,910,'Radio · save & return',function radio(){BD_MUSEUM.enter('entry');
 /* Code by Daniel using ChatGPT November 17, 2026 */
 })];
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.tableMenu=function practiceTableMenu(which){const ids=which==='context'?['record','layers']:['seal','evidence'];openPanel('BY THE OLIVE COURT','<h2>'+ (which==='context'?'Keep the context.':'An impression. A conversation.')+'</h2><p class="field-line">Miriam: “Try a board. Bring the skill into the field.”</p><div class="practice-choices">'+ids.map(function board(id){return '<button data-practice="'+id+'"><b>'+BD_ADVENTURE.titles[id]+'</b><span>'+({record:'Set the record photograph.',layers:'Unpick a layered puzzle.',seal:'Match the reversed impression.',evidence:'Listen, ask, then answer.'}[id])+'</span></button>';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }).join('')+'</div>','practice-menu');
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.paint=function paintAdventureSpace(time){
 const room=BD_MUSEUM.room,c=ctx,cam=BD_MUSEUM.camera,im=BD_ART.images['v8-'+(room==='court'?'court':room==='siloam'?'siloam':room==='water'?'water':'tunnel')];c.save();c.scale(cam.z*(cam.ax||1),cam.z*(cam.ay||1));c.translate(-cam.x,-cam.y);if(im)c.drawImage(im,0,0,W,H);
 if(room==='bend'){c.fillStyle='#183a3d20';c.fillRect(0,0,W,H);}
 if(room==='water'){c.fillStyle='#194a5829';c.fillRect(0,0,W,H);}
 if(room==='survey'){c.fillStyle='#32291d';for(let i=0;i<7;i++){c.beginPath();c.ellipse(60+i*17,580+i*20,46+i*3,30, i*.7,0,Math.PI*2);c.fill();}}
 if(BD_ADVENTURE.rooms.includes(room)&&room!=='siloam'){const n=BD_ADVENTURE.rooms.indexOf(room);if(!BD_ADVENTURE.state().fragments.includes(n)){c.save();c.translate(460,760);c.fillStyle='#bfa06a';c.strokeStyle='#4f422e';c.lineWidth=3;c.beginPath();c.moveTo(-31,-9);c.lineTo(8,-20);c.lineTo(38,2);c.lineTo(15,16);c.lineTo(-27,11);c.closePath();c.fill();c.stroke();c.restore();}}
 BD_ART.traveler(c,game.player,time,game.save.settings.reduced);c.restore();
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.cord=function evidenceCord(c){
 const count=Object.keys(game.save.finds).length;c.save();c.translate(1430,385);c.strokeStyle='#8d7046';c.lineWidth=3;c.beginPath();c.moveTo(-33,-12);c.lineTo(33,-12);c.stroke();for(let n=0;n<count;n++){c.strokeStyle=['#a87d45','#dbc18a','#78664c','#b99a66'][n%4];c.lineWidth=2.5;c.beginPath();for(let y=0;y<=200;y+=4){const x=Math.sin(y*.045+n*Math.PI/6)*19;if(y)c.lineTo(x,y);else c.moveTo(x,y);}c.stroke();}c.fillStyle='#efddae';c.font='12px Georgia';c.textAlign='center';c.fillText(count+' strands',0,227);c.restore();
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.install=function installWaterRoute(){
 const rooms=BD_MUSEUM.rooms;for(const id of ['court',...BD_ADVENTURE.rooms]){rooms[id]={title:({court:'The Olive Court',survey:'The Water Route · The Survey',bend:'The Water Route · The Meeting',water:'The Water Route · The Channel',siloam:'Siloam · Into the Light'})[id],width:1536,height:1024,images:[],floor:700,group:id};BD_ART.perspectives.museum[id]={horizon:id==='court'?365:390,referenceY:870,height:241.8};}
 const originalGeometry=BD_MUSEUM.geometry;BD_MUSEUM.geometry=function adventureGeometry(){const g=originalGeometry();if(BD_MUSEUM.room==='court')g.obstacles.push([310,640,635,752],[675,640,1010,752],[1060,640,1400,752]);if(BD_MUSEUM.room==='survey')g.obstacles.push([20,670,200,755]);return g;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 const originalArrival=BD_FLIGHT.finish;BD_FLIGHT.finish=function surveyArrival(){const survey=!!game.flight?.waterRoute;originalArrival();if(survey){BD_ADVENTURE.enter(0);BD_ADVENTURE.cutscene('rockfall');}
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 rooms.story.title='The Accounts · biblical history';
 BD_PEOPLE.docentSpots[0]=[1295,865];
 const originalPlaces=BD_MUSEUM.hotspots;BD_MUSEUM.hotspots=function waterMuseumPlaces(){
 const room=BD_MUSEUM.room;if(room==='court'||BD_ADVENTURE.rooms.includes(room))return BD_ADVENTURE.hotspots();const places=originalPlaces();
 const add=function station(id,x,y,label,action,point){places.push({id,x,y,label,icon:'◇',point:nearestFree(...(point||[x,y+100])),action});
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 if(room==='entry'){const plan=places.find(function planStand(h){return h.id==='museum-plan';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });if(plan){plan.label='The Water Route · applications';plan.action=BD_ADVENTURE.board;}add('olive-court',1400,530,'Olive court · practice tables',function court(){BD_MUSEUM.begin('court');
 /* Code by Daniel using ChatGPT November 17, 2026 */
 },[1440,740]);}
 if(room==='story'){for(const h of places)h.label=h.label.replace('The Story','The Accounts');add('armor-station',3200,815,'Stand firm · armor of God',BD_ADVENTURE.armor,[3200,960]);add('priscilla-note',5720,820,'A note about Apollos',function priscilla(){BD_ADVENTURE.egg('priscilla');
 /* Code by Daniel using ChatGPT November 17, 2026 */
 },[5720,960]);}
 if(room==='table'){add('evidence-cord',1430,640,'Many strands · one case',function cord(){openPanel('THE EVIDENCE CORD','<h2>'+Object.keys(game.save.finds).length+' strands.</h2><p>Each find answers a particular question. Together, names, places, dates and written witnesses form a cumulative historical case.</p><p class="field-line">Mara: “Say what each strand carries. Then show how they work together.”</p><button class="button" data-adventure="evidence">Practice a conversation →</button>','evidence-cord');
 /* Code by Daniel using ChatGPT November 17, 2026 */
 },[1430,960]);add('remembered-women',420,810,'Names worth remembering',function akeptous(){BD_ADVENTURE.egg('akeptous');
 /* Code by Daniel using ChatGPT November 17, 2026 */
 },[420,980]);}
 return places;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 const originalDraw=BD_MUSEUM.draw;BD_MUSEUM.draw=function waterMuseumPaint(time){const room=BD_MUSEUM.room;if(room==='court'||BD_ADVENTURE.rooms.includes(room)){BD_ADVENTURE.paint(time);return;}originalDraw(time);const c=ctx,cam=BD_MUSEUM.camera;c.save();c.scale(cam.z*(cam.ax||1),cam.z*(cam.ay||1));c.translate(-cam.x,-cam.y);if(room==='table')BD_ADVENTURE.cord(c);
 c.restore();
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 const originalEnter=BD_MUSEUM.enter;BD_MUSEUM.enter=function waterRoomArrival(id,options){originalEnter(id,options);const room=BD_MUSEUM.room;if(BD_ADVENTURE.rooms.includes(room)){$('#place-label').textContent='JERUSALEM · ISRAEL · FICTIONAL ADVENTURE';$('#scene-note').textContent='Next: '+BD_ADVENTURE.next[room];$('#room-label').textContent='THE WATER ROUTE · DRAMATIZED EXPEDITION';}else if(room==='story'){$('#room-label').textContent='UPSTAIRS · THE ACCOUNTS';$('#scene-note').textContent='The biblical accounts, in chronological order.';}
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 // Keep the first camera click functional without changing world pointer projection.
 const originalInspect=BD_VIEW.inspect;BD_VIEW.inspect=function offCenterModelCamera(picture,key){const state=originalInspect(picture,key);if(key==='atlas-relief'||key==='model-land')picture.classList.add('oblique-inspection');return state;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 const originalStep=BD_FIELD.nextStep;BD_FIELD.nextStep=function adventureContinuation(){const selectors={'fragment-recovered':'[data-adventure="next-chamber"]','water-sequence':'.actions .button:not(.secondary)','water-depart':'[data-adventure="start"]','water-ending':'[data-adventure="home"]','water-scripture':'[data-adventure]','practice-complete':'[data-adventure="court"]'},selector=selectors[game.dialogKind];if(selector){const target=$('#panel-body').querySelector(selector);if(target&&!target.hidden&&!target.disabled)return {target,label:target.textContent.trim(),complete:true};}return originalStep();
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 const originalNext=BD_FIELD.updateNext;BD_FIELD.updateNext=function adventureNextLine(){originalNext();if(!game.save||game.flight)return;const bar=$('#next-action-strip span');if(!bar)return;if(BD_ADVENTURE.rooms.includes(BD_MUSEUM.room)&&game.scene==='museum'&&!$('#panel').open)bar.textContent='Next: '+BD_ADVENTURE.next[BD_MUSEUM.room]+'.';else if(['practice-game','tunnel-task','material-dig','material-word'].includes(game.dialogKind)){const message=$('#practice-message')||$('#material-message')||$('#inscription-feedback'),text='Next: '+(message?.textContent.replace(/^Next: /,'')||'use the workbench.');bar.textContent=text;const caption=$('[data-field-next-line]');if(caption&&!BD_FIELD.nextStep())caption.textContent=text;}
 if(['water-dossier','water-guide','practice-menu'].includes(game.dialogKind)){const caption=$('[data-field-next-line]');if(caption)caption.textContent=game.dialogKind==='water-dossier'?'Next: '+(BD_ADVENTURE.qualified().ready?'join the field team.':'build your field record on the atlas.'):game.dialogKind==='practice-menu'?'Next: choose a practice board.':'Next: read alongside the field task.';}

 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 const originalSources=BD_JOURNEY.sources;BD_JOURNEY.sources=function scholarsCorner(){if(!game.save.settings.scholars){openPanel('FRONT KIOSK · SCHOLARS’ CORNER','<h2>Sources for deeper study.</h2><p>External museum and photograph links are available through the front kiosk setting.</p><div class="actions"><button class="button" data-action="settings">Open kiosk settings</button><button class="button secondary" data-card="'+game.currentEvidence+'">Return to the evidence card</button></div>','sources-gate');return;}originalSources();
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 const originalPhoto=BD_FIELD.photo;BD_FIELD.photo=function optInPhotoSources(id){if(game.save.settings.scholars)return originalPhoto(id);const item=BD_REAL_PHOTOS[id];return '<section class="source-gate"><b>'+escapeHTML(item?.museum||'Original object')+'</b><p>Study illustration above. Original photographs and museum records are in Scholars’ corner.</p><button class="button secondary small" data-action="settings">Front kiosk · source settings</button></section>';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 const originalPanel=BD_JOURNEY.panel;BD_JOURNEY.panel=function waterPanelAdditions(kind){originalPanel(kind);if(kind==='museum-person')$('#panel-body .actions')?.insertAdjacentHTML('beforeend','<button class="button secondary" data-action="settings">Front kiosk · settings &amp; sources</button><button class="button secondary" data-adventure="board">The Water Route expedition</button>');if(kind==='settings')$('#panel-body').insertAdjacentHTML('beforeend','<section class="note-block"><h3>Front kiosk · grown-ups &amp; sources</h3><button class="button secondary" data-adventure="picture">Download a picture of this room</button><label class="setting-row"><span>Open Scholars’ corner · external museum / photo links</span><input type="checkbox" data-scholars '+(game.save.settings.scholars?'checked':'')+'></label><p class="fine-print">Closed by default. Links open the wider web. Evidence cards and study text stay in the game.</p></section>');if(kind==='passport'){const a=BD_ADVENTURE.state();$('#panel-body').insertAdjacentHTML('afterbegin','<div class="passport-seals"><b>FIELD SKILLS</b> '+a.seals.map(function seal(id){return '<span>✓ '+escapeHTML(BD_ADVENTURE.titles[id])+'</span>';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }).join('')+'<button class="button secondary small" data-adventure="board">'+BD_ADVENTURE.notes()+' field notes · expedition record →</button></div>');}if(kind==='reader'){const title=$('.page-title')?.textContent||'',text=$('.reader-text')?.textContent||'',site=BD_SITES.find(function relatedObject(item){return title.toLowerCase().includes(item.place.toLowerCase())||title.toLowerCase().includes(item.artifact.replace(/^The /,'').toLowerCase())||text.includes(item.artifact);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });if(site)$('.reader-text').insertAdjacentHTML('beforebegin','<figure class="book-illustration"><details open><summary>Illustrated field note</summary><img src="'+BD_ART.assetURL('assets/find-'+(site.art===6?'6-v2':site.art)+'.webp')+'" alt="Illustrated study replica of '+escapeHTML(site.artifact)+'"><figcaption>'+escapeHTML(site.artifact)+' · '+escapeHTML(site.place)+'<br>Our illustration, not a photograph.</figcaption><button class="button secondary small" data-card="'+site.id+'">See the evidence →</button></details></figure>');}
 for(const node of document.querySelectorAll('#panel-body details'))if(node.textContent.includes('Sources & reading')||node.textContent.includes('Archived object page'))node.hidden=!game.save.settings.scholars;if(!game.save.settings.scholars)for(const link of document.querySelectorAll('#panel-body a[href^="http"]')){const details=link.closest('details');if(details)details.hidden=true;else link.hidden=true;}
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 document.addEventListener('change',function scholarsChoice(event){if(event.target.matches('[data-scholars]')){game.save.settings.scholars=event.target.checked;persist();}
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });
 document.addEventListener('click',BD_ADVENTURE.click);
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.picture=function museumPostcard(){const originalLabel=BD_JOURNEY.labelOnCase;BD_JOURNEY.labelOnCase=function omitPersonalLabel(){
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };let picture;try{drawScene(performance.now());picture=document.createElement('canvas');picture.width=W;picture.height=H;picture.getContext('2d').drawImage(canvas,0,0);}finally{BD_JOURNEY.labelOnCase=originalLabel;game.dirty=true;}picture.toBlob(function pictureReady(blob){if(!blob){toast('A picture could not be made. Your collection export is still available.');return;}const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='my-discovery-museum.png';a.click();setTimeout(function releasePicture(){URL.revokeObjectURL(url);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 },1000);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 },'image/png');
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_ADVENTURE.click=function adventureClick(event){
 const b=event.target.closest('button');if(!b||b.disabled)return;const d=b.dataset,a=game.save&&BD_ADVENTURE.state();if(!a)return;
 if(d.adventure){const action=d.adventure,handlers={picture:BD_ADVENTURE.picture,board:BD_ADVENTURE.board,apply:BD_ADVENTURE.apply,depart:BD_ADVENTURE.depart,start:BD_ADVENTURE.start,resume:function resume(){if(a.status==='invited')BD_ADVENTURE.board();else BD_ADVENTURE.enter(a.chamber);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 },court:function court(){BD_MUSEUM.begin('court');
 /* Code by Daniel using ChatGPT November 17, 2026 */
 },exit:function exit(){BD_MUSEUM.enter('entry');
 /* Code by Daniel using ChatGPT November 17, 2026 */
 },home:function home(){BD_MUSEUM.enter('entry');toast('Your Water Route field record is now on the expedition table.');
 /* Code by Daniel using ChatGPT November 17, 2026 */
 },close:closePanel,'rockfall-next':closePanel,'field-guide':BD_ADVENTURE.fieldGuide,'scribe-check':BD_ADVENTURE.scribeCheck,armor:BD_ADVENTURE.armor,evidence:BD_ADVENTURE.evidence,'armor-check':function checkArmor(){const s=BD_ADVENTURE.task('armor');if(s.values.length===6&&s.values.every(function correct(v,i){return v===i;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }))BD_ADVENTURE.finishTask('armor','Stand in God’s strength. Take his Word into your conversations.');else $('#practice-message').textContent='Keep the passage beside you. Each image has a particular meaning.';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 },'armor-scripture':function armorText(){BD_ADVENTURE.quote('armor');
 /* Code by Daniel using ChatGPT November 17, 2026 */
 },'siloam-scripture':function siloamText(){BD_ADVENTURE.quote('siloam');
 /* Code by Daniel using ChatGPT November 17, 2026 */
 },'next-chamber':function next(){if(a.fragments.length===3)BD_ADVENTURE.routeChoice();else BD_ADVENTURE.enter(a.fragments.length);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 },wet:function wet(){BD_ADVENTURE.cutscene('water');
 /* Code by Daniel using ChatGPT November 17, 2026 */
 },dry:BD_ADVENTURE.surface,surface:BD_ADVENTURE.surface,ending:BD_ADVENTURE.ending};handlers[action]?.();return;}
 if(d.practice){BD_ADVENTURE.play(d.practice);return;}
 if(d.practiceReplay){delete a.tasks[d.practiceReplay];persist();BD_ADVENTURE.play(d.practiceReplay);return;}
 if(d.practiceHelp){BD_ADVENTURE.help(d.practiceHelp);return;}
 if(d.record){const fragment=BD_ADVENTURE.active==='fragment-0',id=fragment?'fragment-0':'record',s=BD_ADVENTURE.task(id,[0,0,0]);if(d.record==='scale')s.values[0]=(s.values[0]+1)%3;else if(d.record==='north')s.values[1]=(s.values[1]+1)%4;else{if(s.values[0]===1&&s.values[1]===0){if(fragment)BD_ADVENTURE.collect(0);else BD_ADVENTURE.finishTask('record','The photograph keeps context when the object moves.');}else $('#practice-message').textContent=s.values[0]!==1?'Place the scale beside the find. Leave its marks visible.':'Plan north points up. Turn the arrow to match.';return;}persist();BD_ADVENTURE.record(fragment);return;}
 if(d.layer!==undefined){const s=BD_ADVENTURE.task('layers');if(Number(d.layer)===s.values.length){s.values.push(Number(d.layer));persist();BD_ADVENTURE.layers();}else $('#practice-message').textContent='That deposit is still under a later one. Remove the cutting pit first.';return;}
 if(d.layerDate!==undefined){if(d.layerDate==='1')BD_ADVENTURE.finishTask('layers','The coin gives an earliest possible date, not an exact year.');else $('#practice-message').textContent='A coin may circulate for years before burial. Try the earliest possible date.';return;}
 if(d.seal){const s=BD_ADVENTURE.task('seal',[0]);if(d.seal==='flip'){s.values[0]=1-s.values[0];persist();BD_ADVENTURE.seal();}else if(s.values[0]===1)BD_ADVENTURE.finishTask('seal','Clay reverses the carved design. Compare details before identifying an owner.');else $('#practice-message').textContent='The impression reverses the carved seal. Try reversing the design.';return;}
 if(d.evidenceQuestion){const s=BD_ADVENTURE.task('evidence');if((s.step===0&&d.evidenceQuestion==='meaning')||(s.step===1&&d.evidenceQuestion==='reason')){s.step++;persist();BD_ADVENTURE.evidence();}else $('#practice-message').textContent=s.step===0?'First make sure you understand what “legend” means here.':'Now ask why the visitor thinks the name was invented.';return;}
 if(d.evidenceObject){if(d.evidenceObject==='tel-dan')BD_ADVENTURE.finishTask('evidence','Tel Dan names David’s dynasty. A careful answer can open the next question.');else $('#practice-message').textContent='That object answers another question. Which inscription names the House of David?';return;}
 if(d.fragmentHelp!==undefined){BD_ADVENTURE.fragmentHelp(Number(d.fragmentHelp));return;}
 if(d.fragmentHint!==undefined){const n=Number(d.fragmentHint);BD_ADVENTURE.hint('fragment-'+n,['Place the scale beside the fragment. Turn plan north upward.','All three cut-mark groups continue at 0°. Match their edges.','Match the heights: 3 → 2 → 1 → 0. Chronicles directs Gihon’s water westward.'][n]);return;}
 if(d.fragmentTurn!==undefined){const n=a.chamber,s=BD_ADVENTURE.task('fragment-'+n);s.values[Number(d.fragmentTurn)]=(s.values[Number(d.fragmentTurn)]+1)%4;persist();BD_ADVENTURE.fragment(n);return;}
 if(d.waterDirection!==undefined){const s=BD_ADVENTURE.task('fragment-2');s.values[3]=Number(d.waterDirection);persist();BD_ADVENTURE.waterChannels(s);return;}
 if(d.fragmentCheck!==undefined){const n=Number(d.fragmentCheck),s=BD_ADVENTURE.task('fragment-'+n),targets=n===1?[0,0,0]:[2,1,0];if(s.values.length>=3&&s.values.slice(0,3).every(function connected(v,i){return v===targets[i];
 /* Code by Daniel using ChatGPT November 17, 2026 */
 })&&(n===1||s.values[3]===1))BD_ADVENTURE.collect(n);else $('#practice-message').textContent=n===1?'One set of marks still breaks the line. Compare each piece’s angle.':'Match each outlet to the next inlet. Check the direction in Chronicles.';}
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
