'use strict';
// A reusable two-character conversation panel. The scene remains visible behind it.
function dialoguePortrait09(person) {
  if(person==='elf')return {name:elfName(),frame:g.walkFrames[state.avatar]?.[0]};
  if(person==='dog')return {name:'The dog',frame:g.paintedFrames21.dog};
  if(person==='rime')return {name:state.tales.nameKnown?'Rime':'Snow Monster',frame:rimePortrait29()};
  const index={robin:0,widow:1,grandmother:1,family:2,keeper:3}[person]??3;
  return {name:{robin:'Robin',widow:'Mrs Bell',grandmother:'Grandmother',family:'Amina and Samir',keeper:'Workshop keeper'}[person]||person,frame:person==='grandmother'&&g.paintedFrames21?g.paintedFrames21.grandmother:g.neighbors[index]};
  /* Code by Daniel using ChatGPT November 20, 2026 */
}
function startDialogue09(person,turns,onFinish=null,options={/* Code by Daniel using ChatGPT November 13, 2026 */}) {
  const actors=[dialoguePortrait09('elf'),dialoguePortrait09(person)],lines=[];
  const segmenter=new Intl.Segmenter('en',{granularity:'sentence'});
  for(const turn of turns)for(const part of segmenter.segment(turn[1]))if(part.segment.trim())lines.push({side:turn[0]==='elf'?0:1,text:part.segment.trim(),name:turn[2],expression:turn[3]});
  showPanel('<div class="dialogue-stage"><h2 id="panel-title" class="action-prompt '+(options.progress?'dialogue-instruction17':'dialogue-title17')+'">'+escapeHTML(options.action||actors[1].name)+'</h2><div class="dialogue-portraits">'+actors.map(function portrait(actor,i){return '<figure class="dialogue-actor" data-actor="'+i+'"><img alt="'+escapeHTML(actor.name)+'" src="'+actor.frame.canvas.toDataURL()+'"><figcaption>'+escapeHTML(actor.name)+'</figcaption></figure>';/* Code by Daniel using ChatGPT November 13, 2026 */}).join('')+'</div><div class="dialogue-box"><p class="dialogue-name" id="dialogue-name"></p><p id="dialogue-line" aria-live="polite"></p></div><div class="dialogue-controls"><span id="dialogue-progress"></span><p id="dialogue-your-turn" class="dialogue-your-turn" hidden>Your reply</p><div id="dialogue-responses" class="dialogue-responses" role="group" aria-label="Conversation controls"></div></div></div>','');
  panel.classList.add('conversation-panel');
  g.dialogue={person,actors,lines,index:0,onFinish,options,replyMode:false};
  showDialogueLine09();
  /* Code by Daniel using ChatGPT November 20, 2026 */}
function dialogueChoices09(d,line){
  const last=d.index===d.lines.length-1;
  if(last&&Array.isArray(d.options.choices)&&d.options.choices.length)return d.options.choices;
  if(line.side===0)return [
    {id:'say',label:line.text,onSelect:advanceDialogue09},
    {id:'leave',label:'I need to be on my way. Goodbye.',onSelect:closePanel}
  ];
  if(last)return [
    {id:'continue',label:d.options.finishLabel||(d.onFinish?'All right.':'Thank you. Goodbye.'),onSelect:advanceDialogue09},
    {id:'repeat',label:'Would you say that again?',onSelect:function repeatLine(){if(g.dialogue===d)showDialogueLine09();/* Code by Daniel using ChatGPT November 13, 2026 */}}
  ];
  return [{id:'next',label:'Continue',onSelect:advanceDialogue09}];
  /* Code by Daniel using ChatGPT November 13, 2026 */
}
function renderDialogueChoices09(d,choices,page=0){
  const cue=$('#dialogue-your-turn');if(cue)cue.hidden=!d.replyMode;
  if(d.replyMode&&choices.length>4){
    const goodbye=choices.find(c=>{return c.id==='goodbye';/* Code by Daniel using ChatGPT November 18, 2026 */})||choices.at(-1),first=choices.filter(c=>{return c!==goodbye;/* Code by Daniel using ChatGPT November 18, 2026 */}).slice(0,2),rest=choices.filter(c=>{return c!==goodbye&&!first.includes(c);/* Code by Daniel using ChatGPT November 18, 2026 */});let visible;
    const more={id:'something-else',label:'Something else…',onSelect:()=>{return renderDialogueChoices09(d,choices,1);/* Code by Daniel using ChatGPT November 18, 2026 */}};
    if(page===0)visible=[...first,more,goodbye];
    else{const start=(page-1)*2,remaining=rest.length-start,chunk=rest.slice(start,start+(remaining<=3?3:2));visible=[...chunk];if(remaining>3)visible.push({id:'reply-more',label:'Something else…',onSelect:()=>{return renderDialogueChoices09(d,choices,page+1);/* Code by Daniel using ChatGPT November 18, 2026 */}});visible.push({id:'reply-back',label:'Back',onSelect:()=>{return renderDialogueChoices09(d,choices,0);/* Code by Daniel using ChatGPT November 18, 2026 */}});}
    d.replyPage=page;return renderDialogueChoices09(d,visible);
  }
  const root=$('#dialogue-responses');root.replaceChildren();
  root.setAttribute('aria-label',d.replyMode?'Choose your response':'Conversation controls');
  choices.forEach(function reply(choice,i){
    const button=document.createElement('button');button.type='button';button.className=i===0?'primary':'';
    if(i===0)button.id='dialogue-next';
    button.dataset.dialogueReply=choice.id||String(i);button.textContent=choice.label;button.disabled=!!choice.disabled;
    button.onclick=function chooseReply(event){if(g.dialogue!==d||button.disabled||(d.replyMode&&event.detail>1))return;choice.onSelect();/* Code by Daniel using ChatGPT November 13, 2026 */};
    root.append(button);
    /* Code by Daniel using ChatGPT November 13, 2026 */
  });
  root.querySelector('button:not(:disabled)')?.focus({preventScroll:true});
  /* Code by Daniel using ChatGPT November 18, 2026 */}
function showDialogueLine09(){
 const d=g.dialogue;if(!d)return;const line=d.lines[d.index];if(!line){advanceDialogue09();return;}
 d.replyMode=line.side===0||d.index===d.lines.length-1;
 const spoken=line.side===0?d.lines.slice(0,d.index).reverse().find(function npc(l){return l.side===1;/* Code by Daniel using ChatGPT November 20, 2026 */})||line:line;
 panel.classList.toggle('has-dialogue-replies',d.replyMode);
 for(const el of panel.querySelectorAll('[data-actor]'))el.classList.toggle('speaking',Number(el.dataset.actor)===spoken.side);
 refreshSpeakerPortrait20(d,spoken);
 $('#dialogue-name').textContent=(wonderState20().together?'Reader '+(spoken.side+1)+' · ':'')+(spoken.name||d.actors[spoken.side].name);
 $('#dialogue-line').textContent=spoken.text;
 refreshDialogueControls17();renderDialogueChoices09(d,dialogueChoices09(d,line));
 /* Code by Daniel using ChatGPT November 20, 2026 */
}

function refreshDialogueControls17(){
  const d=g.dialogue,label=$('#dialogue-progress');if(!d||!label)return;
  const text=(d.options.progress?d.options.progress+' · ':'')+(g.padCount&&primaryUsesPad21()?'A · B back':'Enter');
  if(label.textContent!==text)label.textContent=text;
  /* Code by Daniel using ChatGPT November 13, 2026 */
}
function backDialogue09(){const d=g.dialogue;if(d?.replyPage>0&&d.options.choices)renderDialogueChoices09(d,d.options.choices,0);else closePanel();/* Code by Daniel using ChatGPT November 18, 2026 */}
function moveDialogueReply09(direction){
  const buttons=Array.from(panel.querySelectorAll('#dialogue-responses button:not(:disabled)'));
  if(!buttons.length)return;
  const current=buttons.indexOf(document.activeElement),next=current<0?0:(current+direction+buttons.length)%buttons.length;
  buttons[next].focus({preventScroll:true});buttons[next].scrollIntoView({block:'nearest'});
  /* Code by Daniel using ChatGPT November 13, 2026 */
}
function activateDialogueReply09(){
  if(!g.dialogue)return;
  const focused=document.activeElement;
  if(focused?.matches('#dialogue-responses button:not(:disabled),#close'))focused.click();
  else panel.querySelector('#dialogue-responses button:not(:disabled)')?.click();
  /* Code by Daniel using ChatGPT November 13, 2026 */
}
function advanceDialogue09() {
  const d=g.dialogue;if(!d)return;
  d.index++;
  if(d.index<d.lines.length){showDialogueLine09();return;}
  const done=d.onFinish;g.dialogue=null;
  if(done)done();else closePanel();
  /* Code by Daniel using ChatGPT November 13, 2026 */
}
function talkBlock09(block,person,onFinish=null,options={}) {
  const turns=[];
  for(const line of block.lines) {
    const colon=line.indexOf(':'),name=colon<0?'':line.slice(0,colon),text=(colon<0?line:line.slice(colon+1).trim()).replace(/Rime/g,state.tales.nameKnown?'Rime':'the Snow Monster');
    if(name==='Narrator')continue;
    turns.push([name==='Traveler'?'elf':'npc',text,name==='Traveler'?elfName():name]);
  }
  startDialogue09(person,turns,onFinish,options);
  /* Code by Daniel using ChatGPT November 12, 2026 */
}
function grandmotherReplyChoices15(){
  return [
    {id:'snow-hint',label:'Please, Grandma, may I have a hint for the snowman?',onSelect:grandmotherSnowHint15},
    {id:'story',label:'May I hear a little story?',onSelect:grandmotherStory15},
    {id:'winter-book',label:'May I see your winter songbook?',onSelect:openGrandmotherSongbook16},
    {id:'presence20',label:'May I sit with you a while?',onSelect:function sit(){sitDown20(SEATS20.grandmother);/* Code by Daniel using ChatGPT November 13, 2026 */}},
    {id:'gospel20',label:'What is the good news of Christmas?',onSelect:christmasGospel20},
    ...(!wonderState20().errandOffered?[{id:'errand20',label:'Could I carry a little Christmas home?',onSelect:lanternErrand20}]:[]),
    {id:'goodbye',label:'Thank you, Grandma. I will see you soon.',onSelect:closePanel}
  ];
  /* Code by Daniel using ChatGPT November 13, 2026 */
}
function grandmotherConversation09() {
  startDialogue09('grandmother',[['npc','Come and warm your hands, '+elfName()+'.']],null,{action:'A little time with Grandmother',choices:grandmotherReplyChoices15()});
  /* Code by Daniel using ChatGPT November 13, 2026 */
}
function grandmotherStory15(){
  startDialogue09('grandmother',[
    ['npc','There is always room for one more chair beside the fire.'],
    ['elf','Even for someone made of snow?'],
    ['npc','We might put his chair beside the window instead.'],
    ['npc','I think he would like knowing that somebody had saved him a place.']
  ],null,{action:'A chair kept ready',choices:grandmotherReplyChoices15()});
  /* Code by Daniel using ChatGPT November 13, 2026 */
}
function nextSnowmanHint15(){
  const t=state.tales,order=['coal','hat','scarf','carrot','sticks'];
  if(t.snowman.alive)return {id:null,room:null,text:'Your snow friend has all his winter things, and he might enjoy a little walk with you.'};
  const missing=order.filter(function needed(id){return !t.bag[id]&&!t.dressed[id];/* Code by Daniel using ChatGPT November 13, 2026 */});
  if(!missing.length)return {id:null,room:'snowgarden',text:'You have found all the winter things; take them to our snow friend in the garden and help him put them on.'};
  const start=(order.indexOf(state.play10.snowHintLast)+1)%order.length;
  let id=missing[0];for(let i=0;i<order.length;i++)if(missing.includes(order[(start+i)%order.length])){id=order[(start+i)%order.length];break;}
  const item=SNOW_ITEMS[id],places={clockshop:'the clock shop',workshop:'the toy workshop',closet:'the bedroom',kitchen:'my kitchen',snowgarden:'the snow garden'};
  const where=places[item.room]||ROOMS[item.room]?.title||'the village';
  const text=id==='coal'?'Look for a little bag of coal in '+where+', near the '+(item.point[0]>=65?'right-hand side':item.point[0]<=35?'left-hand side':'middle')+' of the floor.':'You might find '+item.title.charAt(0).toLowerCase()+item.title.slice(1)+' in '+where+'.';
  return {id,room:item.room,text};
  /* Code by Daniel using ChatGPT November 13, 2026 */
}
function grandmotherSnowHint15(){
  const hint=nextSnowmanHint15();
  if(hint.id){state.play10.snowHintLast=hint.id;save();}
  const choices=[
    {id:'another-hint',label:'Please, Grandma, could I have another hint?',onSelect:grandmotherSnowHint15},
    {id:'other-talk',label:'May we talk about something else?',onSelect:grandmotherConversation09},
    {id:'goodbye',label:'Thank you, Grandma. I will go and look.',onSelect:closePanel}
  ];
  startDialogue09('grandmother',[['npc',hint.text]],null,{action:'A little help with the snowman',choices});
  // Runtime metadata makes the one-clue behavior inspectable without revealing other locations.
  g.dialogue.snowHint={id:hint.id,room:hint.room};
  /* Code by Daniel using ChatGPT November 13, 2026 */
}
function neighborChoices09(id) {
  const toy=TOYS.find(function owned(t){return t.owner===id;/* Code by Daniel using ChatGPT November 13, 2026 */});
  const action={robin:'May I share some bread and cocoa with you?',widow:'May I carry the kindling and hear your story?',family:'May I help you find a warm room?'}[id];
  const choices=[{id:'help',label:action,onSelect:function helpNeighbor09(){
    state.quest.helped[id]=true;save();
    const lines={robin:[['npc','Thank you. My fingers are warm enough for the tune now.'],['elf','I have time to listen.']],widow:[['npc','He always said a clock needed listening to before it needed a hammer.'],['elf','Tell me about him while we finish the tea.']],family:[['npc','A place to rest, and our bread to share. We can make a little star while we wait.','Amina'],['elf','Show me how to fold the first point.']]};
    startDialogue09(id,lines[id]);
    /* Code by Daniel using ChatGPT November 13, 2026 */
  }}];
  if(toyStatus(toy.id)==='repaired')choices.push({id:'deliver',label:'I have brought '+toy.title+' home.',onSelect:function deliverToy09(){
    if(toyStatus(toy.id)!=='repaired')return;
    state.quest.toys[toy.id]='delivered';save();
    showRestitution20(id,toy);
    /* Code by Daniel using ChatGPT November 13, 2026 */
  }});
  if(toyStatus(toy.id)==='delivered')choices.push({id:'play20',label:{widow:'May I wind the bird and stay for his song?',family:'Shall we roll the train together?',robin:'Would you like to read together?'}[id],onSelect:function play(){startNeighbour20(id);/* Code by Daniel using ChatGPT November 13, 2026 */}});
  choices.push({id:'goodbye',label:'I will visit again. Goodbye.',onSelect:closePanel});
  startDialogue09(id,[['npc',state.quest.helped[id]?'There is still time for a little company.':'It is good to have a little company.']],null,{action:'Time for a neighbor',choices});
  /* Code by Daniel using ChatGPT November 13, 2026 */
}
window.addEventListener('keydown',function dialogueKey09(event){
  if(!g.dialogue)return;
  if(event.code==='Escape'&&g.dialogue.replyPage>0){event.preventDefault();event.stopImmediatePropagation();if(!event.repeat)backDialogue09();return;}
  if(['ArrowUp','ArrowDown','KeyW','KeyS'].includes(event.code)){
    event.preventDefault();event.stopImmediatePropagation();moveDialogueReply09(['ArrowUp','KeyW'].includes(event.code)?-1:1);return;
  }
  if(!['KeyE','Enter','Space'].includes(event.code))return;
  event.preventDefault();event.stopImmediatePropagation();if(!event.repeat)activateDialogueReply09();
  /* Code by Daniel using ChatGPT November 18, 2026 */},true);
