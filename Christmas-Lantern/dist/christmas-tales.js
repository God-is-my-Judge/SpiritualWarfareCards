'use strict';
// Christmas Lantern story and companion additions. November 11, 2026.
const SNOW_ITEMS={scarf:{title:'A knitted red scarf',room:'closet',point:[53,58]},hat:{title:'A felt winter hat',room:'workshop',point:[61,78]},coal:{title:'A little bag of coal',room:'clockshop',point:[83,85]},carrot:{title:'A carrot from the kitchen',room:'kitchen',point:[75,65]},sticks:{title:'A pair of fallen sticks',room:'snowgarden',point:[83,83]}};
const RIME_ESCAPE_REFS=['1 John 4:9','John 3:16'];
function elfName(){return state.elfName||'Pip';/* Code by Daniel using ChatGPT November 11, 2026 */}
function verseReference(card){return card.title.replace(/\s*\((?:CSB|KJV|LSB|CUSTOM)\)\s*$/i,'')+' ('+(card.translation_label||card.translation)+')';/* Code by Daniel using ChatGPT November 11, 2026 */}
function taleHint(text){return '<details class="story-hint"><summary>Hint</summary><p>'+escapeHTML(text)+'</p></details>';/* Code by Daniel using ChatGPT November 11, 2026 */}
function talesNotice(title,body,label='A LITTLE CHRISTMAS DISCOVERY'){showPanel('<h2 id="panel-title">'+escapeHTML(title)+'</h2>'+body+'<button class="primary" id="tales-done">Keep exploring</button>',label);$('#tales-done').onclick=closePanel;/* Code by Daniel using ChatGPT November 11, 2026 */}
function installChristmasTales(){
 state.elfName=String(state.elfName||'Pip').replace(/[\u0000-\u001f<>]/g,'').trim().slice(0,24)||'Pip';
 if(!state.tales)state.tales={letter:state.quest.chapter>=3,rescued:state.quest.chapter>=3,captured:false,escaped:state.quest.chapter>=3,returned:state.quest.chapter>=3,converted:state.quest.chapter>=3,rescueRounds:0,escapeRounds:0,loot:false,bag:{},dressed:{},snowman:{alive:false,follow:false,room:'snowgarden',x:65,y:73}};
 const t=state.tales;t.bag=t.bag||{};t.dressed=t.dressed||{};t.snowman=t.snowman||{alive:false,follow:false,room:'snowgarden',x:65,y:73};
 WINTER_ART.push('rime-mine29','rime-home29','rime-sorry29','snowgarden','mountain-ravine-07','grandmother','grandmother-kitchen','pinepass-birdfree-07','snowman-blank-07','rime-acting-07','horse-profiles-07');
 ROOMS.pinepass.image='pinepass-birdfree-07';
 ROOMS.pinepass.walkAreas.push({polygon:[[29,50],[47,49],[42,39],[34,28],[27,26],[23,32]]});
 ROOMS.pinepass.spots.push({id:'pass-grandmother',x:28,y:32,mark:[28,25],hit:[22,20,14,13],to:'snowgarden',label:'The left road to Grandmother’s house',edgeDirection:'back'});
 ROOMS.pinepass.arrivals.snowgarden=[32,42];
 ROOMS.snowgarden={title:'Grandmother’s Snow Garden',image:'snowgarden',caption:'A round little neighbor waiting in the snow.',help:'The cottage door is warm. A snowman waits in the garden.',floor:38,spawn:[51,87],arrivals:{pinepass:[51,87],grandmother:[20,48]},objects:[],spots:[{id:'garden-road',x:51,y:93,mark:[51,91],to:'pinepass',label:'Back to the carollers',edgeDirection:'front',gate:[42,91,18,3]},{id:'garden-cottage',x:17,y:41,mark:[17,27],hit:[8,12,20,29],to:'grandmother',label:'Grandmother’s front door',edgeDirection:'back'}]};
 ROOMS.grandmother={title:'Grandmother’s Christmas Cottage',image:'grandmother',caption:'There is a place for you beside the fire.',help:'A letter by the fire.',floor:48,spawn:[18,67],arrivals:{snowgarden:[16,64]},objects:[{npc:1,x:46,y:56,w:8,h:17,solidPad:.5}],spots:[{id:'grandmother-garden',x:7,y:61,mark:[7,39],to:'snowgarden',label:'Out to the snow garden',edgeDirection:'left',gate:[4,54,4,26]},{id:'grandmother-letter',x:68,y:62,mark:[68,49],tale:'grandmother-letter',label:'A letter with your name on it'},{id:'grandmother-story',x:46,y:66,mark:[46,53],tale:'grandmother',label:'A little time beside the fire'}]};
 ROOMS.grandmother.spots.push({id:'cottage-kitchen',x:94,y:73,mark:[94,61],to:'kitchen',label:'Grandmother’s kitchen',edgeDirection:'right',gate:[93,65,3,21]});
 ROOMS.grandmother.arrivals.kitchen=[86,73];
 ROOMS.kitchen={title:'Grandmother’s Christmas Kitchen',image:'grandmother-kitchen',caption:'The kettle sings. Something good is in the oven.',help:'The kitchen basket has something fresh from the garden.',floor:63,spawn:[16,76],arrivals:{grandmother:[16,76]},objects:[],spots:[{id:'kitchen-cottage',x:6,y:71,mark:[6,55],to:'grandmother',label:'Back to Grandmother’s fire',edgeDirection:'left',gate:[4,65,4,23]}]};
 ROOMS.mountain={title:'The High Snowy Shelf',image:'mountain-ravine-07',caption:'The wind is sharp. Someone is calling beyond the rocks.',help:'The way back is below.',floor:47,spawn:[40,86],arrivals:{cave:[40,86]},objects:[],spots:[{id:'mountain-cave',x:40,y:93,mark:[40,91],to:'cave',label:'Back down through the cave',edgeDirection:'front',gate:[30,91,20,3]}]};
 ROOMS.cave.objects=[];ROOMS.cave.caption='Claw marks on the door. A fire nearly out.';ROOMS.cave.help='The cave is unusually quiet. Someone has left a scrap of paper.';
 ROOMS.cave.spots=ROOMS.cave.spots.filter(function keepDoor(s){return s.id!=='rime';/* Code by Daniel using ChatGPT November 11, 2026 */});
 ROOMS.cave.arrivals.mountain=[79,51];
 ROOMS.cave.spots.push({id:'rime-letter',x:42,y:61,mark:[42,54],tale:'rime-letter',label:'A creased note on the table'},{id:'cave-back',x:82,y:40,mark:[82,30],hit:[76,22,15,20],to:'mountain',label:'The narrow path out behind the cave',edgeDirection:'back',gate:[77,38.3,10,3.4]});
 ROOMS.workshop.caption='A warm bench, a patient repair, a parcel to carry home.';
 WINTER_READINGS.nutcracker={title:'The Nutcracker and the Missing Mitten',kind:'An original little Christmas story',pages:[['A very small sentry','The nutcracker stood beside the stocking in his red coat. All evening people hurried past with parcels. He could see a blue mitten underneath the settle, but his painted boots were fixed to a wooden stand.\n\nEach time a child passed, he tried to look especially helpful. Being made of wood made this difficult.'],['Someone looks down','At last Nell stopped to straighten his hat.\n\n“What are you guarding?” she asked. Then she saw the little blue thumb peeping out beneath the settle.\n\nGrandmother was already at the door, searching every pocket. Nell ran after her with the mitten.'],['A place by the fire','That evening the nutcracker was moved to the mantel. From there he could see Grandmother warming both hands around her cup.\n\nNo one gave him a medal. Nell set a walnut beside his stand, which suited him very well.\n\nOutside, the carollers began again.']]};
 g.snowRoute=[];g.snowRepath=0;syncTaleDoors();
 /* Code by Daniel using ChatGPT November 24, 2026 */}
function syncTaleDoors(){const back=ROOMS.cave.spots.find(function backDoor(s){return s.id==='cave-back';/* Code by Daniel using ChatGPT November 11, 2026 */});if(state.tales.letter){back.to='mountain';delete back.tale;}else{delete back.to;back.tale='unread-path';}/* Code by Daniel using ChatGPT November 11, 2026 */}
function taleTargets(all){
 const t=state.tales,s=t.snowman;
 for(const [id,item]of Object.entries(SNOW_ITEMS))if(state.room===item.room&&!t.bag[id]&&!t.dressed[id])all.push({id:'snow-item-'+id,x:item.point[0],y:item.point[1],mark:id==='carrot'?[75,37]:[item.point[0],item.point[1]-7],hit:id==='carrot'?[69,28,12,13]:[item.point[0]-3,item.point[1]-6,6,8],tale:'snow-item',item:id,label:'Look at '+item.title.toLowerCase()});
 if(state.room===s.room)all.push({id:'snow-friend',x:s.x,y:Math.min(92,s.y+4),mark:[s.x,s.y-16],hit:[s.x-5,s.y-22,10,24],tale:'snowman',label:s.alive?'Speak with your snow friend':'A snowman waiting for winter things'});
 if(state.room==='hall')all.push({id:'elf-letter',x:44,y:80,mark:[44,73],tale:'welcome-letter',label:'A letter tucked beside your lantern'});
 if(state.room==='mountain'&&!t.rescued)all.push({id:'mountain-rime',x:74,y:66,mark:[80,42],hit:[75,35,14,30],tale:'rescue',label:'Someone beyond the broken railing'});
 if(state.room==='cave'&&t.rescued&&(t.captured&&!t.escaped||t.converted&&wonderState20().rimePlace21==='cave'))all.push({id:'rime',x:t.captured&&!t.escaped?50:56,y:t.captured&&!t.escaped?60:63,mark:t.captured&&!t.escaped?[50,64]:[56,36],hit:t.captured&&!t.escaped?[40,61,20,30]:[46,23,20,36],tale:'rime',label:'Speak with Rime'});
 if(state.room==='cave'&&!(t.rescued&&t.escaped))for(let i=0;i<2;i++){const toy=TOYS[i];if(!state.quest.toys[toy.id]&&!t.bag['held-'+toy.id])all.push({id:'lost-'+toy.id,x:toy.at[0],y:toy.at[1]+3,mark:[toy.at[0],toy.at[1]-4],toy:toy.id,toyIndex:i,label:t.converted?'Pick up the little toy':'A toy half-hidden in the cave'});}
 if(state.room==='workshop'&&rimeAtWorkshop29())all.push({id:'rime-workshop29',x:28,y:79,hit:[12,49,16,28],tale:'rime',label:'Rime beside the keeper’s bench'});
 if(state.room==='cave'&&!t.converted&&!t.bag.tin)all.push({id:'rime-tin',x:72,y:70,mark:[72,63],tale:'cave-tin',label:'An old biscuit tin'});
 return all.filter(function storyDoor(s){return !(state.room==='cave'&&s.id==='cave-road'&&t.captured&&!t.escaped);/* Code by Daniel using ChatGPT November 11, 2026 */});
 /* Code by Daniel using ChatGPT November 20, 2026 */
}
function taleAction(target){
 if(state.room==='cave'&&state.tales.captured&&!state.tales.escaped&&target.to){rimeVisit();return true;}
 if(!target.tale)return false;
 const action=target.tale;
 if(action==='snow-item'){state.tales.bag[target.item]=true;save();talesNotice('Into your waypack','<p>'+escapeHTML(SNOW_ITEMS[target.item].title)+' fits neatly beside your lantern.</p>');}
 else if(action==='snowman')snowmanVisit();
 else if(action==='welcome-letter'||action==='grandmother-letter')readElfLetter(action);
 else if(action==='grandmother')grandmotherConversation09();
 else if(action==='rime-letter')readRimeLetter();
 else if(action==='unread-path')talesNotice('Bootprints in the snow','<p>Someone has gone up alone. A scrap of paper stirs on the ice behind you.</p>');
 else if(action==='rescue')rimeRescue();
 else if(action==='rime')rimeVisit();
 else if(action==='cave-tin')offerCaveObject('tin','the dented biscuit tin');
 return true;
 /* Code by Daniel using ChatGPT November 11, 2026 */
/* Code by Daniel using ChatGPT November 12, 2026 */}
function readElfLetter(kind){const name=escapeHTML(elfName()),body=kind==='welcome-letter'?'<p>Dear '+name+',</p><p>Your lantern is on its hook, and there is cocoa if you have come the long way. Grandmother says the left road is swept as far as the pines. She would be glad of a visit.</p><p>I have left a little room in your waypack. You never know what might need carrying.</p><p>With love,<br>The workshop keeper</p>':'<p>My dear '+name+',</p><p>I meant to finish that scarf before the snow came. You can imagine how well that went. If you find someone who needs it more than I do, you have my leave to give it away.</p><p>Come in whenever the window is lit. You need not bring anything.</p><p>Grandmother</p>';talesNotice('A letter for '+elfName(),body,'A LETTER WITH YOUR NAME ON IT');/* Code by Daniel using ChatGPT November 11, 2026 */}
function readRimeLetter(){
 state.tales.letter=true;syncTaleDoors();save();
 talesNotice('A note in a heavy hand','<p>I hate finding other people’s fingerprints on my things. Especially that teddy bear, whom I love to distraction, and the train I broke while trying to improve it.</p><p>Gone up the shelf to mend the wind-bent lantern. If the weather turns, the back path is shorter. Do not tidy anything. I know exactly where almost everything is.</p><p>'+ (state.tales.nameKnown?'The signature under the dried bootprint reads: Rime.':'The signature is hidden beneath a large, wet bootprint.')+'</p>'+taleHint('The narrow passage behind the cave leads uphill. The keeper’s spare rope is in your waypack.'));
 /* Code by Daniel using ChatGPT November 12, 2026 */
}

function offerCaveObject(id,title){showPanel('<h2 id="panel-title">'+escapeHTML(title)+'</h2><p>A rough label says KEEP OUT. There is no one here to ask.</p><div class="row"><button id="cave-leave">Leave it for now</button><button id="cave-take">Put it in the waypack</button></div>',state.tales.nameKnown?'RIME’S KEEPING PLACE':'THE SNOW MONSTER’S CAVE');$('#cave-leave').onclick=closePanel;$('#cave-take').onclick=function takeCaveObject(){const t=state.tales;t.loot=true;if(id==='tin')t.bag.tin=true;else t.bag['held-'+id]=true;save();closePanel();toast('You wrap it carefully in your waypack.');/* Code by Daniel using ChatGPT November 11, 2026 */};/* Code by Daniel using ChatGPT November 11, 2026 */}
function taleCollectToy(id){if(state.tales.converted)return false;if(toyStatus(id)!=='lost')return true;offerCaveObject(id,TOYS.find(function named(t){return t.id===id;/* Code by Daniel using ChatGPT November 11, 2026 */}).title);return true;/* Code by Daniel using ChatGPT November 11, 2026 */}
function rimeRescue(){
 const t=state.tales;if(t.rescued){rimeVisit();return;}
 if(!t.courage29){
  startDialogue09('rime',[
   ['npc','Stay back! The snowbank went out from under me.'],
   ['elf','You’re the snow monster who took the toys. I’m frightened.'],
   ['npc','I took the short way to mend the lantern. Now I can’t get up.'],
   ['elf','Father, I’m scared. Please help me be brave and know what to do.'],
   ['elf','The keeper showed me where to stand, back from the edge. I have his rope. What’s your name?'],
   ['npc','Rime. My name is Rime.']
  ],function courage(){t.nameKnown=true;t.courage29=true;syncMonsterName09();save();rimeRescue();/* Code by Daniel using ChatGPT November 20, 2026 */},{action:'A voice beyond the rocks',finishLabel:'Stay back and secure the rope'});return;
 }
 const long=rimeLongReading29();
 showPanel('<h2 id="panel-title" class="action-prompt">Hold steady</h2><p>You stay behind the rocks and secure the keeper’s rope around the pine. Rime catches the loop.</p><p>“God, help us,” you whisper. “Rime, push with your boots. I’ll take in the slack.”</p><button class="primary" id="rime-haul20">Help him up</button><button id="rime-rope">Keep these verses & read while you hold</button><label class="rime-reading29"><input type="checkbox" id="rime-long29" '+(long?'checked':'')+' '+(t.rescueRounds?'disabled':'')+'> Longer reading · four verses instead of two</label><p class="quest-status">Reading and recall are optional. Your hands and the rope do the pulling.</p>'+taleHint('In real life, stay back from broken ice and get a trusted adult or emergency help. You can help without going into danger.'),'THE PINE ABOVE THE SHELF');
 $('#rime-haul20').onclick=plainRopeRescue20;
 $('#rime-long29').onchange=function length(e){t.longReading29=e.target.checked;save();/* Code by Daniel using ChatGPT November 20, 2026 */};
 $('#rime-rope').onclick=function read(){t.longReading29=rimeLongReading29();keepRimeVerses29(rimeRescueReadings29());storyRecall('rescue');/* Code by Daniel using ChatGPT November 20, 2026 */};
 /* Code by Daniel using ChatGPT November 20, 2026 */
}

function storyRecall(kind){
 const t=state.tales,key=kind==='rescue'?'rescueRounds':'escapeRounds',index=t[key]||0;
 if(kind==='rescue'&&t.longReading29===undefined)t.longReading29=rimeLongReading29();
 const trials=kind==='rescue'?rimeTrials29():RIME_ESCAPE_REFS.map(function escapeTrial(ref){return [ref,ref];/* Code by Daniel using ChatGPT November 20, 2026 */});
 if(index>=trials.length){finishRimeChallenge(kind);return;}
 const trial=trials[index],card=cards.find(function matching(c){return reference09(c)===trial[0]&&(kind!=='rescue'||c.translation==='CSB'&&Road.normalize(plain(c.text))===Road.normalize(trial[2]+' '+trial[3]));/* Code by Daniel using ChatGPT November 20, 2026 */});
 if(!card&&kind==='escape'){showPanel('<h2 id="panel-title">Read together</h2><p>'+escapeHTML(trial[0])+' is not in your collection. You can read it together in your Bible. The way home stays open.</p><button class="primary" id="rime-missing29">Take the open way home</button>','');$('#rime-missing29').onclick=function openWay(){finishRimeChallenge('escape');/* Code by Daniel using ChatGPT November 20, 2026 */};return;}
 if(!card){showPanel('<h2 id="panel-title">Read together</h2><p>Your collection keeps its own wording. You can add the rescue’s CSB verses, or finish without an exercise.</p><button id="rime-add29">Add the rescue verses</button><button id="rime-free29">'+(kind==='rescue'?'Help Rime up':'Take the open way out')+'</button>','');$('#rime-add29').onclick=function add(){keepRimeVerses29(rimeRescueReadings29());if(kind==='rescue')storyRecall(kind);else finishRimeChallenge(kind);/* Code by Daniel using ChatGPT November 20, 2026 */};$('#rime-free29').onclick=function free(){finishRimeChallenge(kind);/* Code by Daniel using ChatGPT November 20, 2026 */};return;}
 state.learned[card.id]=card.fingerprint;refreshCount();save();
 startPractice(card.id,function remembered(){
  t[key]=index+1;save();
  if(t[key]>=trials.length){finishRimeChallenge(kind);return;}
  if(kind==='rescue'&&t[key]%2===0)startDialogue09('rime',[['npc',t[key]===2?'My boot has found a foothold.':'The loop is holding.'],['elf','Take your time. We’re holding steady.']],function next(){storyRecall(kind);/* Code by Daniel using ChatGPT November 20, 2026 */},{progress:(t[key]/2)+' / '+(trials.length/2)+' verses',finishLabel:'The next words'});
  else storyRecall(kind);
  /* Code by Daniel using ChatGPT November 20, 2026 */
 },'excerpts',0,kind==='rescue'?trial:null);
 /* Code by Daniel using ChatGPT November 20, 2026 */
}

function finishRimeChallenge(kind){
 const t=state.tales;
 if(kind==='escape'){
  t.escaped=true;t.workshop29=true;save();
  startDialogue09('rime',[['npc','The way is open. I won’t stop you.'],['elf','I’m going to the keeper. You can talk with him at the workshop.']],null,{finishLabel:'Take the open path home'});return;
 }
 t.rescued=true;t.waitVisit=g.caveVisit;
 if(t.loot){
  t.captured=true;t.escaped=false;for(const toy of TOYS)delete t.bag['held-'+toy.id];delete t.bag.tin;save();
  startDialogue09('rime',[['npc','My toys. In your waypack!'],['elf','They belong to people in the village. I should have asked before taking them.'],['npc','I took them. They are MINE!']],function snowyFall(){closePanel();g.transition={type:'rime-fall',from:'mountain',to:'cave',snapshot:captureScene(),elapsed:0,duration:state.motion?1.2:.12};/* Code by Daniel using ChatGPT November 20, 2026 */},{action:'Keep clear of the crumbling snowbank'});
 }else{
  t.escaped=true;t.workshop29=true;save();
  startDialogue09('rime',[['npc','Both boots. On the shelf.'],['elf','You’re safe. Let me loosen the rope.'],['npc','I could have managed. Probably.'],['npc','You didn’t let go. Today I was the one who needed something given.'],['elf','I was afraid. God helped me keep going.'],['elf','I’m going home to the keeper. His workshop is open if you want to talk.'],['npc','I have some things to think about.']],null,{action:'Safe ground',finishLabel:'Head down to the village'});
 }
 /* Code by Daniel using ChatGPT November 20, 2026 */
}

function rimeVisit(){
 const t=state.tales;
 if(!t.rescued){readRimeLetter();return;}
 if(t.captured&&!t.escaped){
  startDialogue09('rime',[['npc','Those toys stayed when everybody else went away.'],['elf','They belong to someone. I was wrong to take them without asking.'],['elf','Please move back. I need room to leave.'],['npc','The path is open.']],function choices(){showPanel('<h2 id="panel-title">The way out is clear</h2><button class="primary" id="rime-leave20">Take the open way home</button><button id="rime-escape">Read together first</button>','');$('#rime-leave20').onclick=function leave(){finishRimeChallenge('escape');/* Code by Daniel using ChatGPT November 20, 2026 */};$('#rime-escape').onclick=function read(){storyRecall('escape');/* Code by Daniel using ChatGPT November 20, 2026 */};/* Code by Daniel using ChatGPT November 20, 2026 */});return;
 }
 if(!t.converted){
  if(state.room==='workshop')rimeWorkshop29();
  else talesNotice('A warm light down the road','<p>Rime is taking the toys to the keeper’s workshop. You can meet them there.</p>');
  return;
 }
 rimeLaterVisit();
 /* Code by Daniel using ChatGPT November 20, 2026 */
}

function rimeLaterVisit(){
 const day=localStoryDay(),advance=state.storyPace==='ready'||state.quest.lastVisit!==day,index=Math.min(TOY_QUEST_CONTENT.visits.length-1,Math.max(3,advance?state.quest.chapter:state.quest.chapter-1)),visit=TOY_QUEST_CONTENT.visits[index];
 if(advance&&state.quest.chapter<TOY_QUEST_CONTENT.visits.length){state.quest.chapter=index+1;state.quest.lastVisit=day;save();}
 talkBlock09(visit,'rime',function afterRimeVisit09(){talesNotice('Another visit','<p>'+escapeHTML(visit.next_invitation)+'</p>');/* Code by Daniel using ChatGPT November 12, 2026 */});
 /* Code by Daniel using ChatGPT November 12, 2026 */
}

function talesQuestMap(){showPocketMap14();/* Code by Daniel using ChatGPT November 13, 2026 */}
function snowmanVisit(){const t=state.tales,s=t.snowman;let body=s.alive?'<p>He tips his hat. A few flakes fall politely from the brim.</p><div class="row"><button id="snow-follow">Come with me</button><button id="snow-stay">Stay right here</button></div>':'<p>Three snowballs are waiting for their winter things. You can see where the face and twig arms will go.</p><div class="collection-list">'+Object.entries(SNOW_ITEMS).map(function dressChoice(pair){const [id,item]=pair;return '<button data-dress="'+id+'" '+(!t.bag[id]||t.dressed[id]?'disabled':'')+'>'+escapeHTML(item.title)+(t.dressed[id]?' · already fitted':t.bag[id]?' · put it on':' · not in the waypack')+'</button>';/* Code by Daniel using ChatGPT November 11, 2026 */}).join('')+'</div>'+taleHint('Not all the pieces are outside: a scarf waits in the bedroom, a hat in the workshop, coal on the right side of the clock shop floor, and a carrot in Grandmother’s kitchen basket. Fallen sticks lie beside the garden path.');showPanel('<h2 id="panel-title">'+(s.alive?'Your snow friend':'A snowman in the garden')+'</h2>'+body,'THE SNOW GARDEN');if(s.alive){$('#snow-follow').onclick=function followElf(){s.follow=true;save();closePanel();toast('Your snow friend falls into step.');/* Code by Daniel using ChatGPT November 11, 2026 */};$('#snow-stay').onclick=function waitHere(){s.follow=false;save();closePanel();toast('He settles in to watch the world go by.');/* Code by Daniel using ChatGPT November 11, 2026 */};}else panel.querySelectorAll('[data-dress]').forEach(function wireDress(button){button.onclick=function fitWinterThing(){dressSnowman(button.dataset.dress);/* Code by Daniel using ChatGPT November 11, 2026 */};/* Code by Daniel using ChatGPT November 11, 2026 */});/* Code by Daniel using ChatGPT November 11, 2026 *//* Code by Daniel using ChatGPT November 12, 2026 */snowMenu10();/* Code by Daniel using ChatGPT November 13, 2026 *//* Code by Daniel using ChatGPT November 13, 2026 */}
function dressSnowman(id){const t=state.tales;if(!t.bag[id]||t.dressed[id])return false;t.dressed[id]=true;delete t.bag[id];if(Object.keys(SNOW_ITEMS).every(function dressed(key){return t.dressed[key];/* Code by Daniel using ChatGPT November 11, 2026 */})){t.snowman.alive=true;t.snowman.follow=true;save();AudioScene.chime();talesNotice('He blinks','<p>The last coal settles into place. The snowman blinks once, sneezes a single snowflake, and adjusts his scarf.</p><p>“Were you going somewhere?”</p><p>He waits for you to take the first step.</p>');}else{save();snowmanVisit();}return true;/* Code by Daniel using ChatGPT November 11, 2026 */}
function waypack(){
 const t=state.tales,s=t.snowman,items=[],icons={scarf:'🧣',hat:'🎩',coal:'◈',carrot:'🥕',sticks:'⑂'};
 const rimeNote=rimeWorkshopReminder29();
 for(const [id,item]of Object.entries(SNOW_ITEMS))if(t.bag[id])items.push('<div class="pack-item"><span class="pack-icon" aria-hidden="true">'+icons[id]+'</span><span>'+escapeHTML(item.title)+'</span></div>');
 items.push('<div class="pack-item"><span class="pack-icon" aria-hidden="true">➰</span><span>The keeper’s climbing rope</span></div>');
 if(t.bag.tin)items.push('<div class="pack-item"><span class="pack-icon" aria-hidden="true">▱</span><span>A dented biscuit tin</span></div>');
 for(let i=0;i<TOYS.length;i++){
  const toy=TOYS[i],status=toyStatus(toy.id),held=t.bag['held-'+toy.id];
  if(held||['found','cleaned','mended','repaired'].includes(status))items.push('<div class="pack-item"><img src="'+g.toys[i].canvas.toDataURL()+'" alt=""><span>'+escapeHTML(toy.title)+'<small> · '+(held?'taken without permission':escapeHTML(status))+'</small></span></div>');
 }
 showPanel('<h2 id="panel-title">'+escapeHTML(elfName())+'’s waypack</h2>'+(rimeNote?'<p class="quest-status" data-rime-reminder>'+escapeHTML(rimeNote)+'</p>':'')+'<p>What you are carrying now:</p><div class="collection-list">'+items.join('')+'</div>'+dogPackHTML27()+pocketMapWaypack14()+hymnalWaypackHTML()+winterSongbookWaypack16()+'<p class="quest-status">'+(s.alive?'Your snow friend '+(s.follow?'is following you.':'is waiting in '+escapeHTML(ROOMS[s.room]?.title||'the garden')+'.'):'Winter things fitted to the snowman stay with him; delivered toys stay with their owners.')+'</p>'+(s.alive?'<button id="pack-snow">'+(s.follow?'Wait here':s.room===state.room?'Come with me':'Ask him to follow, if he is here')+'</button>':'')+'<button id="pack-done">Close the waypack</button>','THINGS TO CARRY');
 if($('#pack-dog27'))$('#pack-dog27').onclick=function dogChoice(){setDogFollowing27(!dogState27().following);/* Code by Daniel using ChatGPT November 15, 2026 */};
 $('#pack-done').onclick=closePanel;if($('#pack-map14'))$('#pack-map14').onclick=showPocketMap14;if($('#pack-hymnal'))$('#pack-hymnal').onclick=openLanternHymnal;if($('#pack-winter16'))$('#pack-winter16').onclick=openGrandmotherSongbook16;
 if(s.alive)$('#pack-snow').onclick=function packCompanion(){if(s.room!==state.room){toast('Visit your snow friend where he is waiting.');return;}s.follow=!s.follow;save();waypack();/* Code by Daniel using ChatGPT November 12, 2026 */};
 /* Code by Daniel using ChatGPT November 24, 2026 */}

function snowPath(start,end,map){const first={x:Math.round(start.x/2)*2,y:Math.round(start.y/2)*2},queue=[first],seen=new Map([[first.x+','+first.y,null]]);let closest=first,best=Infinity;for(let i=0;i<queue.length&&i<2800;i++){const p=queue[i],d=Math.hypot(p.x-end.x,p.y-end.y);if(d<best){best=d;closest=p;}if(d<2.5)break;for(const [dx,dy]of [[2,0],[-2,0],[0,2],[0,-2]]){const q={x:p.x+dx,y:p.y+dy},key=q.x+','+q.y;if(!seen.has(key)&&Exploration.free(q,map,true)){seen.set(key,p);queue.push(q);}}}const path=[];for(let cur=closest;cur;cur=seen.get(cur.x+','+cur.y))path.unshift(cur);return path.slice(1);/* Code by Daniel using ChatGPT November 11, 2026 */}
function talesRoomArrival(id,from){arrivalPlay10(id,from);if(!state.tales)return;const t=state.tales,s=t.snowman;if(id!=='workshop'&&t.converted&&t.workshop29){t.workshop29=false;if(wonderState20().rimePlace21==='workshop')wonderState20().rimePlace21='rink';}if(id==='cave'&&from!=='cave')g.caveVisit=(g.caveVisit||0)+1;if(s.alive&&s.follow&&s.room!==id){const p=safeRoomArrival({x:state.player.x+3,y:Math.min(91,state.player.y+3)});s.room=id;s.x=p.x;s.y=p.y;g.snowRoute=[];g.snowRepath=0;}/* Code by Daniel using ChatGPT November 20, 2026 *//* Code by Daniel using ChatGPT November 20, 2026 */}
function updateTales(dt){if(g.wonder20?.coopMove&&state.tales.snowman.alive&&state.tales.snowman.room===state.room){const s=state.tales.snowman,p=Exploration.move(s,g.wonder20.coopMove,dt,roomMap(),true,18*depthScale(s));s.x=p.x;s.y=p.y;g.snowRoute=[];return;}if(g.play10?.snowRoutine)return;const s=state.tales.snowman;if(!s.alive||!s.follow||s.room!==state.room)return;const distance=Math.hypot(s.x-state.player.x,s.y-state.player.y);if(distance<6){g.snowRoute=[];return;}g.snowRepath-=dt;if(g.snowRepath<=0||!g.snowRoute.length){g.snowRoute=snowPath(s,state.player,roomMap());g.snowRepath=1;}const next=g.snowRoute[0];if(!next)return;const moved=Exploration.move(s,{x:next.x-s.x,y:next.y-s.y},dt,roomMap(),true,state.riding?26:19);s.x=moved.x;s.y=moved.y;if(Math.hypot(next.x-s.x,next.y-s.y)<.7)g.snowRoute.shift();/* Code by Daniel using ChatGPT November 11, 2026 *//* Code by Daniel using ChatGPT November 13, 2026 */}
function drawSnowFriend(){
 const s=state.tales.snowman,x=s.x*15.36,y=s.y*10.24,h=140,w=h*g.snowmanFrame.w/g.snowmanFrame.h;ctx.save();ctx.translate(x,y);ctx.scale(depthScale(s),depthScale(s));ctx.translate(-x,-y);beginSnowPose10(x,y);shadow(x,y,30,7);ctx.drawImage(g.snowmanFrame.canvas,x-w/2,y-h,w,h);ctx.save();ctx.translate(x,y);paintSnowCostume22();ctx.restore();ctx.restore();ctx.restore();
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function drawRimeStory(){
 const t=state.tales;
 if(state.room==='mountain'&&!t.rescued)paintSprite(g.rimeHanging,80*15.36,62*10.24,238);
 else if(state.room==='workshop'&&rimeAtWorkshop29())paintSprite(rimePortrait29(),20*15.36,77*10.24,255);
 else if(state.room==='cave'&&t.captured&&!t.escaped)paintSprite(g.rimeThreat,50*15.36,89*10.24,275);
 else if(state.room==='cave'&&t.converted&&wonderState20().rimePlace21==='cave')paintSprite(g.rime[0],56*15.36,57*10.24,245);
 /* Code by Daniel using ChatGPT November 24, 2026 */
}

function taleLayers(){
 const layers=[],t=state.tales;
 for(const [id,item]of Object.entries(SNOW_ITEMS))if(id!=='carrot'&&item.room===state.room&&!t.bag[id]&&!t.dressed[id])layers.push({y:item.point[1],draw:function pickup(){drawWinterPickup(id);/* Code by Daniel using ChatGPT November 20, 2026 */}});
 if(state.room===t.snowman.room)layers.push({y:t.snowman.y,draw:drawSnowFriend});
 if(state.room==='mountain'&&!t.rescued||state.room==='workshop'&&rimeAtWorkshop29()||state.room==='cave'&&(t.captured&&!t.escaped||t.converted&&wonderState20().rimePlace21==='cave'))layers.push({y:state.room==='mountain'?62:state.room==='workshop'?77:t.captured&&!t.escaped?89:57,draw:drawRimeStory});
 for(let i=0;i<2;i++){const toy=TOYS[i];if(state.room==='cave'&&!(t.rescued&&t.escaped)&&!state.quest.toys[toy.id]&&!t.bag['held-'+toy.id])layers.push({y:toy.at[1],draw:function lostToy(){paintSprite(g.toys[i],toy.at[0]*15.36,toy.at[1]*10.24,65);/* Code by Daniel using ChatGPT November 20, 2026 */}});}
 if(state.room==='cave'&&!(t.rescued&&t.escaped))layers.push({y:75,draw:drawRimeSign29});
 if(state.room==='workshop'&&(rimeAtWorkshop29()||t.workshopDone29))layers.push({y:47,draw:drawRimeParcel29});
 return layers;
 /* Code by Daniel using ChatGPT November 20, 2026 */
}

function talesSettings(){const content=$('#panel-content');content.insertAdjacentHTML('beforeend','<label for="elf-name">Your elf’s name</label><input id="elf-name" maxlength="24" autocomplete="off"><p>Letters in the house will use this name.</p><div class="row"><button id="open-waypack">Open your waypack</button><button id="save-scene">Save a scene-only picture</button></div>');content.insertAdjacentHTML('beforeend','<label><input type="checkbox" id="rescue-long-settings29" '+(rimeLongReading29()?'checked':'')+' '+(state.tales.rescueRounds&&!state.tales.rescued?'disabled':'')+'> Longer rescue reading · Isaiah 41:10 and Psalm 121:2</label>');$('#rescue-long-settings29').onchange=function readingLength(e){state.tales.longReading29=e.target.checked;save();/* Code by Daniel using ChatGPT November 20, 2026 */};$('#elf-name').value=elfName();$('#elf-name').onchange=function nameElf(event){state.elfName=String(event.target.value).replace(/[\u0000-\u001f<>]/g,'').trim().slice(0,24)||'Pip';event.target.value=state.elfName;save();/* Code by Daniel using ChatGPT November 20, 2026 */};$('#open-waypack').onclick=waypack;$('#save-scene').onclick=saveScenePicture;/* Code by Daniel using ChatGPT November 20, 2026 */}
function saveScenePicture(){
 if(g.transition){toast('Wait until you reach the next scene.');return;}
 g.cleanScene=true;
 try{draw(performance.now());let url=canvas.toDataURL('image/webp',.92),ext='webp';if(!url.startsWith('data:image/webp')){url=canvas.toDataURL('image/jpeg',.94);ext='jpg';}const link=document.createElement('a');link.href=url;link.download='Christmas-Lantern-'+state.room+'.'+ext;link.click();toast('Your scene picture is ready.');}
 catch{toast('Couldn’t save the picture.');}
 finally{g.cleanScene=false;}
 /* Code by Daniel using ChatGPT November 18, 2026 */}

function refreshScriptureCredit(){const footer=$('#scripture-credit');if(!footer)return;const hasCSB=cards.some(function csb(c){return c.translation==='CSB';/* Code by Daniel using ChatGPT November 11, 2026 */});footer.textContent=(hasCSB?'':'This collection uses the translations shown after each reference. ')+'Scripture quotations marked CSB have been taken from the Christian Standard Bible®, Copyright © 2017, 2020 by Holman Bible Publishers. Used by permission. Christian Standard Bible® and CSB® are federally registered trademarks of Holman Bible Publishers.';/* Code by Daniel using ChatGPT November 11, 2026 */}
function confirmRimeRestart(){
 const name=state.tales.nameKnown?'Rime':'the Snow Monster';
 showPanel('<h2 id="panel-title">Begin '+name+'’s revised story?</h2><p>This resets the story, recalled rescue rounds and the three toy repairs/deliveries. Your Scripture collection, elf name and snow friend are kept.</p><div class="row"><button id="rime-reset-cancel">Keep my progress</button><button id="rime-reset-confirm">Begin the new story</button></div>','THE TOY ADVENTURE');
 $('#rime-reset-cancel').onclick=settings;
 $('#rime-reset-confirm').onclick=function restartRime(){
  const t=state.tales;for(const key of ['letter','rescued','captured','escaped','returned','converted','loot','nameKnown'])t[key]=false;
  t.rescueRounds=0;t.escapeRounds=0;t.rescueRevision=29;t.courage29=false;t.workshop29=false;t.workshopDone29=false;delete t.lastCaveVisit;
  for(const key of Object.keys(t.bag))if(key==='tin'||key.startsWith('held-'))delete t.bag[key];
  state.quest={toys:{},helped:{},chapter:0,lastVisit:null,caught:false};syncTaleDoors();syncMonsterName09();save();closePanel();toast('The Snow Monster’s story is ready.');
  /* Code by Daniel using ChatGPT November 20, 2026 */
 };
 /* Code by Daniel using ChatGPT November 20, 2026 */
}

function taleObstacles(){
 if(!state.tales)return [];const t=state.tales;
 if(state.room==='workshop'&&rimeAtWorkshop29())return [{polygon:[[14,73],[26,73],[26,78],[14,78]]}];
 if(state.room==='cave'&&t.captured&&!t.escaped)return [{polygon:[[41,63],[59,63],[59,89],[41,89]]}];
 if(state.room==='cave'&&t.converted&&wonderState20().rimePlace21==='cave')return [{polygon:[[47,34],[65,34],[65,57],[47,57]]}];
 if(state.room==='mountain')return [{polygon:[[75.5,40],[100,40],[100,81.5],[75.5,81.5]]}];
 return [];
 /* Code by Daniel using ChatGPT November 20, 2026 */
}

function drawWinterPickup(id){
 const item=SNOW_ITEMS[id],x=item.point[0]*15.36,y=item.point[1]*10.24,s=depthScale({x:item.point[0],y:item.point[1]});ctx.save();ctx.translate(x,y);ctx.scale(s,s);shadow(0,2,19,4,.17);if(id==='sticks'){worldFrame22('twigLeft',-3,-2,40,false,-.6);worldFrame22('twigRight',3,2,40,false,.7);}else if(id==='hat')worldFrame22('feltHat',0,0,50);else if(id==='scarf')worldFrame22('scarf',0,-12,43,false,-.2);else if(id==='coal'){worldFrame22('tinOpen',0,0,38);for(const dx of [-8,0,8])worldFrame22('coal',dx,-20,8);}ctx.restore();
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
