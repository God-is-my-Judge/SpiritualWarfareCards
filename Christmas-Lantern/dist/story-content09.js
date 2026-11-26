'use strict';
// Original writing, distinct from the supplied Scripture text.
const TRAIN_PICTURES09=['train-departure','train-rescue','train-home'];
// Hand-reviewed presentation of the supplied quotations. No Scripture words are changed.
const VERSE_DISPLAY09={
 'Matthew 1:21':`She will give birth to a son, and you are to name him Jesus, because he will save his people from their sins.`,
 'Luke 1:30-31':`Then the angel told her: Do not be afraid, Mary, for you have found favor with God. Now listen: You will conceive and give birth to a son, and you will name him Jesus.`,
 'Luke 2:10-11':`But the angel said to them: Don't be afraid, for look, I proclaim to you good news of great joy that will be for all the people: Today in the city of David a Savior was born for you, who is the Messiah, the Lord.`,
 'John 3:16':`For God loved the world in this way: He gave his one and only Son, so that everyone who believes in him will not perish but have eternal life.`,
 'Matthew 11:28-30':`Come to me, all of you who are weary and burdened, and I will give you rest.\n\nTake my yoke upon you and learn from me, because I am lowly and humble in heart, and you will find rest for your souls.\n\nFor my yoke is easy and my burden is light.`,
 'Mark 10:45':`For even the Son of Man did not come to be served, but to serve, and to give his life as a ransom for many.`,
 'Leviticus 19:33-34':`When an alien resides with you in your land, you must not oppress him.\n\nYou will regard the alien who resides with you as the native-born among you. You are to love him as yourself, for you were aliens in the land of Egypt; I am the LORD your God.`,
 'Luke 2:12':`This will be the sign for you: You will find a baby wrapped tightly in cloth and lying in a manger.`,
 'John 3:5-8':`Jesus answered: Truly I tell you, unless someone is born of water and the Spirit, he cannot enter the kingdom of God.\n\nWhatever is born of the flesh is flesh, and whatever is born of the Spirit is spirit.\n\nDo not be amazed that I told you that you must be born again.\n\nThe wind blows where it pleases, and you hear its sound, but you don't know where it comes from or where it is going. So it is with everyone born of the Spirit.`,
 'John 16:13-14':`When the Spirit of truth comes, he will guide you into all the truth. For he will not speak on his own, but he will speak whatever he hears. He will also declare to you what is to come.\n\nHe will glorify me, because he will take from what is mine and declare it to you.`,
 'Matthew 25:35-40':`'For I was hungry and you gave me something to eat; I was thirsty and you gave me something to drink; I was a stranger and you took me in;\n\nI was naked and you clothed me; I was sick and you took care of me; I was in prison and you visited me.'\n\nThen the righteous will answer him, 'Lord, when did we see you hungry and feed you, or thirsty and give you something to drink?\n\nWhen did we see you a stranger and take you in, or without clothes and clothe you?\n\nWhen did we see you sick, or in prison, and visit you? '\n\nAnd the King will answer them, 'Truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me.'`,
 'Deuteronomy 10:18-19':`He executes justice for the fatherless and the widow, and loves the resident alien, giving him food and clothing.\n\nYou are also to love the resident alien, since you were resident aliens in the land of Egypt.`,
 'John 11:25-26':`Jesus said to her: I am the resurrection and the life. The one who believes in me, even if he dies, will live.\n\nEveryone who lives and believes in me will never die. Do you believe this?`
};
function verseDisplay09(card) {
 const text=VERSE_DISPLAY09[reference09(card)];
 // Imported translations and edited collections keep their own exact wording.
 return card.translation==='CSB'&&text&&Road.normalize(text)===Road.normalize(plain(card.text))?text:plain(card.text);
 /* Code by Daniel using ChatGPT November 12, 2026 */
}
function verseSpeaker09(card) {
 const ref=reference09(card);
 return /^(Matthew 11:28-30|Mark 10:45|John 3:16|John 3:5-8|John 16:13-14|John 11:25-26|Matthew 25:35-40)$/.test(ref)?'<p class="scripture-speaker">Jesus is speaking</p>':'';
 /* Code by Daniel using ChatGPT November 12, 2026 */
}
function installStories09() {
 const t=state.tales;
 if(t.rescued||t.returned||t.converted)t.nameKnown=true;
 if(t.rescueRevision!==29){t.rescueRounds=0;t.rescueRevision=29;if(t.converted){for(const toy of TOYS)if(toyStatus(toy.id)==='lost')state.quest.toys[toy.id]='found';t.workshopDone29=true;}}
 if(t.rescued&&t.escaped&&!t.converted)t.workshop29=true;
 if(WINTER_READINGS[CLAUDE_SHORT_ORDER22[0]])return; // Preserve Daniel's replacement library when story state is reinitialized.
 WINTER_READINGS.nutcracker={title:'The Nutcracker’s Christmas Rehearsal',kind:'An original Christmas comedy',picture:'christmas-table',pages:[
 ['A very important crack','The nutcracker had one task in the Christmas concert: crack the final walnut when the carol ended. He practised his bow until the mouse beneath the dresser was heartily tired of it.\n\n“Try listening for the music,” the mouse suggested.\n\n“I am listening for my entrance,” said the nutcracker.'],
 ['The wrong entrance','On the first note he cracked the walnut. Everyone stopped. The dog sat up, delighted.\n\nOn the second attempt he bowed so deeply that his hat fell into the pudding.\n\nNell washed the hat. The mouse retrieved the walnut. Grandmother fetched another spoon. Nobody suggested cancelling Christmas.'],
 ['Something useful to do','Before the third attempt, Samir found a little girl crying beside the door. Her ribbon had caught in the latch.\n\nThe nutcracker saw it from his place on the table. This time he forgot his entrance. He rattled his wooden jaw until Nell looked up, then pointed his hat at the door.'],
 ['A small, splendid part','The ribbon was freed. The little girl chose to sit beside Nell. They began the carol again, and the nutcracker listened all the way through.\n\nAt the last note he cracked the walnut. There was a small, splendid noise.\n\nThe mouse carried away one crumb. The nutcracker bowed to the whole room, including the dog. He had discovered that a part need not be grand to be worth doing.']
 ]};
 WINTER_READINGS.globe.pages[3]=['Shake, and remember','Give the globe a gentle shake. Let that tiny world whirl around its steadfast little house.\n\nRemember who has held you, the mercies you have received, and the people Christ has given you to love. The snow may hide the path for a while; it cannot erase the foundation.\n\nAs the flakes settle, choose one good thing to treasure and one person to make room for today. Keep remembering. The living Christ is faithful.'];
 WINTER_READINGS.globe.picture='winter-cottage';
 WINTER_READINGS.globe2={title:'The Window That Stayed Lit',kind:'An original snowglobe story about patient welcome',picture:'winter-cottage',pages:[
 ['One evening in miniature','Inside the globe, a cottage stood at the end of a white lane. In the real room, Nell turned it between her hands.\n\n“Does somebody have to keep that window lit?” she asked.\n\n“In a glass cottage, perhaps not,” Grandmother said. “In this house, we take turns.”'],
 ['Taking turns','Nell remembered the year Grandmother was ill. Mrs Bell had brought soup. The keeper had mended the latch. Nell herself had kept the stove supplied with the very smallest pieces of wood.\n\nNobody had done everything. There had been enough hands to do what each could.'],
 ['A window for tomorrow','The cottage in the globe was a picture, not a promise that no storm would come. Christ had given them a firmer hope: himself, crucified and risen, and a people learning to love in his name.\n\nNell set the globe beside the window. Then she carried a bowl into the kitchen. Tomorrow they were taking soup to Mrs Bell.']
 ]};
 WINTER_READINGS.trainA={title:'The Winter Freight and the Given Fire',kind:'An original train story · A · gifts and dependence',picture:'train-departure',pages:[
 ['Before the whistle','Before dawn the station lamps made islands in the snow. A small red engine waited with three wagons: coal for the cottage stoves, flour for the baker, and parcels wrapped in brown paper.\n\n“Quite a hill,” said the youngest porter.\n\n“Quite a load,” said the driver. She opened the firebox. “And what have we been given for it?”'],
 ['Things the engine could not make','Coal, black as midnight. Water, bright as the sky. A track laid by hands long gone. The porter brought a shovel; the guard brought the route book; the driver brought years of listening to a boiler breathe.\n\nAt the station table they thanked God for the morning and the means to begin. Then each took up an ordinary task.'],
 ['The place where the wheels slipped','Halfway up the hill, ice shone on the rails. The wheels spun. The engine shook, and the youngest porter felt the hill grow twice as high.\n\n“Shall we wish harder?” he asked.\n\n“Shall we use the sand?” said the driver.\n\nThey set the brakes before stepping down. The guard kept watch. The porter spread grit. The driver waited until all were safely back aboard.'],
 ['The fire kept burning','The engine climbed a yard, then another. Nobody made a speech to the hill. Steam rose through the firs; the wagons answered with a patient wooden creak.\n\nThe porter had imagined confidence as a feeling so large it could push a train. Here it looked like a tended fire, sound rails, friends at their posts, and asking for help.'],
 ['The gifts arrive','By noon the baker had flour. By dusk there was coal beside the widow’s hearth. The smallest parcel contained a repaired wheel for Samir’s train.\n\nThe engine rested under the water tower, giving little sighs.\n\n“We did get there,” said the porter.\n\n“With much received along the way,” said the driver. She closed the firebox gently.'],
 ['A word beside the last picture','God gives the world its life and gives us daily bread, work, and friends. In Christ he gives a greater gift: forgiveness and life with him. We learn courage by depending on him, receiving help, and doing the next faithful thing.\n\nThis is an original story and reflection, not Scripture. Read James 1:17 and John 15:5 together.']
 ]};
 WINTER_READINGS.trainB={title:'The Coach That Came Home',kind:'An original train story · B · held and brought back',picture:'train-departure',pages:[
 ['The journey up','Nell and her family boarded the last coach with a basket of bread and one remarkably noisy paper star. The red engine pulled them past cottages, over a viaduct, and into the snowy hills.\n\nNell watched its smoke lift into the darkening sky. She liked knowing something strong was drawing them toward home.'],
 ['A sound out of place','There was a sharp clank. The engine’s lamps began to move away.\n\nTheir coach slowed. For one long second it stood still. Then it began to roll backward. Trees slid past the window faster and faster.\n\n“Sit down and hold the rail,” Mother said. The guard was already at the brake wheel.'],
 ['At the bottom of the hill','The brakes gripped in a long shower of sparks. The guard brought the coach to a stop on the level track beside the lower signal box.\n\nNobody cheered yet. The baby was crying. Father counted the passengers. Mother wrapped a blanket around two shivering children. Nell discovered she was still holding the paper star.'],
 ['Lights coming back','A lantern moved beyond the curve. Then another. The driver had noticed the missing coach and brought the engine back, with the signalman walking ahead.\n\nThey inspected the damaged coupling. They fetched a sound one from the lower station. The guard checked the brakes a second time.\n\nThe engine did not wait at the summit for frightened passengers to push themselves uphill. It came to where they were.'],
 ['The pull in the dark','When the coupling took the weight, Nell felt the coach settle into a steady pull. She began to cry, which surprised her. Mother held her without telling her to stop.\n\nAfter a while Nell asked, “Is that what you mean when you say we need Christ?”\n\n“We depend on him for life,” Mother said. “And when we have wandered, we can tell him the truth and come to him. He is a Savior, not a distant light waiting for us to climb alone.”'],
 ['The station at home','At their station the family waited while the guard helped the last passenger down. Father asked after the driver. Mother gave the signalman their bread. Nell gave him the noisy paper star.\n\nOn the walk home she kept her hand in Mother’s. The hill was still a hill. But the story would no longer end at its bottom.\n\nThis is an original story and reflection, not Scripture. A railway accident is a limited picture, not a claim that Christ abandons his people. Read John 15:5 and Luke 19:10 together.']
 ]};
 ROOMS.workshop.spots.push({id:'train-book',x:57,y:62,mark:[57,47],reading:'train-choice',label:'Two stories about a winter train'});
 /* Code by Daniel using ChatGPT November 20, 2026 */
}
function trainChoice09(){
 chooseShortBooks22('Stories for the journey',[shortId22('stand-and-deliver'),shortId22('wolf-who-talked')]);
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function globeChoice09(){
 chooseShortBooks22('Christmas in other places',[shortId22('far-as-the-curse-is-found'),shortId22('a-letter-from-the-line')]);
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function practiceUnits09(card,scope) {
 if(scope==='summary')return Road.units(card,scope);
 const ref=reference09(card),match=ref.match(/:(\d+)(?:-(\d+))?$/),start=Number(match?.[1]),end=Number(match?.[2]||start),units=[];
 if(card.context_verses&&match)for(const v of card.context_verses)if(v.verse>=start&&v.verse<=end)units.push({label:ref.replace(/:\d.*$/,'')+':'+v.verse,text:verseDisplay09({...card,title:ref.replace(/:\d.*$/,'')+':'+v.verse,text:v.text})});
 return units.length?units:Road.units(card,scope);
 /* Code by Daniel using ChatGPT November 12, 2026 */
}
function naturalHalves09(text) {
 const words=text.trim().split(/\s+/);if(words.length<4)return Road.halves(text);
 let at=Math.ceil(words.length/2),distance=Infinity;
 for(let n=2;n<=words.length-2;n++)if(/[,;:.!?]$/.test(words[n-1])){const d=Math.abs(n-words.length/2);if(d<distance&&n>=words.length*.25&&n<=words.length*.75){distance=d;at=n;}}
 return [words.slice(0,at).join(' '),words.slice(at).join(' ')];
 /* Code by Daniel using ChatGPT November 12, 2026 */
}
function readZacchaeus09(page=-1) {
 const card=cards.find(function zacchaeus(c){return reference09(c)==='Luke 19:1-10';/* Code by Daniel using ChatGPT November 12, 2026 */});
 if(!card){talesNotice('The Zacchaeus reading','<p>Luke 19:1–10 is not in your loaded collection. Import it in Settings to read it here.</p>');return;}
 const verses=card.context_verses||[],groups=[];
 const supplied=verses.filter(function focusVerse(v){return v.verse>=1&&v.verse<=10;/* Code by Daniel using ChatGPT November 12, 2026 */});
 if(Road.normalize(supplied.map(function verseText(v){return v.text;/* Code by Daniel using ChatGPT November 12, 2026 */}).join(' '))===Road.normalize(plain(card.text))) {
  for(const [start,end]of [[1,4],[5,7],[8,10]])groups.push({label:'Luke 19:'+start+'–'+end,text:supplied.filter(function verseInPage(v){return v.verse>=start&&v.verse<=end;/* Code by Daniel using ChatGPT November 12, 2026 */}).map(function numberedVerse(v){return v.verse+' '+v.text;/* Code by Daniel using ChatGPT November 12, 2026 */}).join('\n\n')});
 }else groups.push({label:verseReference(card),text:plain(card.text)});
 page=Math.max(-1,Math.min(groups.length-1,page));
 state.learned[card.id]=card.fingerprint;save();refreshCount();
 showPanel('<div class="little-book"><p class="verse-meta">Supplied Scripture · '+escapeHTML(card.translation)+'</p><h2 id="panel-title">Zacchaeus · the Son of Man seeks the lost</h2>'+(page<0?'<p>A Scripture reading in '+groups.length+' sections. The quotation keeps the supplied wording.</p>':'<h3>'+groups[page].label+'</h3><div class="book-reading"><p>'+escapeHTML(groups[page].text).replace(/\n\n/g,'</p><p>')+'</p></div>')+scriptureContextHTML(card)+'<div class="book-pages"><button id="zac-prev" '+(page<0?'disabled':'')+'>← Previous</button><span>'+(page<0?'Title page':(page+1)+' / '+groups.length)+'</span><button class="primary" id="zac-next">'+(page<0?'Open the book':page===groups.length-1?'Back to the library':'Next page →')+'</button></div></div>','THE LIBRARY SCRIPTURE SHELF');
 $('#zac-prev').onclick=function previousZacchaeus(){readZacchaeus09(page-1);/* Code by Daniel using ChatGPT November 12, 2026 */};
 $('#zac-next').onclick=function nextZacchaeus(){if(page===groups.length-1)showLibrary();else readZacchaeus09(page+1);/* Code by Daniel using ChatGPT November 12, 2026 */};
 /* Code by Daniel using ChatGPT November 12, 2026 */
}
// Explicit verse-level layouts for the short practice units, reviewed individually.
Object.assign(VERSE_DISPLAY09,{
 'Luke 1:30':`Then the angel told her: Do not be afraid, Mary, for you have found favor with God.`,
 'Luke 1:31':`Now listen: You will conceive and give birth to a son, and you will name him Jesus.`,
 'Luke 2:10':`But the angel said to them: Don't be afraid, for look, I proclaim to you good news of great joy that will be for all the people:`,
 'Luke 2:11':`Today in the city of David a Savior was born for you, who is the Messiah, the Lord.`,
 'Matthew 11:28':`Come to me, all of you who are weary and burdened, and I will give you rest.`,
 'Matthew 11:29':`Take my yoke upon you and learn from me, because I am lowly and humble in heart, and you will find rest for your souls.`,
 'Matthew 11:30':`For my yoke is easy and my burden is light.`,
 'Leviticus 19:33':`When an alien resides with you in your land, you must not oppress him.`,
 'Leviticus 19:34':`You will regard the alien who resides with you as the native-born among you. You are to love him as yourself, for you were aliens in the land of Egypt; I am the LORD your God.`,
 'John 3:5':`Jesus answered: Truly I tell you, unless someone is born of water and the Spirit, he cannot enter the kingdom of God.`,
 'John 3:6':`Whatever is born of the flesh is flesh, and whatever is born of the Spirit is spirit.`,
 'John 3:7':`Do not be amazed that I told you that you must be born again.`,
 'John 3:8':`The wind blows where it pleases, and you hear its sound, but you don't know where it comes from or where it is going. So it is with everyone born of the Spirit.`,
 'John 16:13':`When the Spirit of truth comes, he will guide you into all the truth. For he will not speak on his own, but he will speak whatever he hears. He will also declare to you what is to come.`,
 'John 16:14':`He will glorify me, because he will take from what is mine and declare it to you.`,
 'Matthew 25:35':`'For I was hungry and you gave me something to eat; I was thirsty and you gave me something to drink; I was a stranger and you took me in;`,
 'Matthew 25:36':`I was naked and you clothed me; I was sick and you took care of me; I was in prison and you visited me.'`,
 'Matthew 25:37':`Then the righteous will answer him, 'Lord, when did we see you hungry and feed you, or thirsty and give you something to drink?`,
 'Matthew 25:38':`When did we see you a stranger and take you in, or without clothes and clothe you?`,
 'Matthew 25:39':`When did we see you sick, or in prison, and visit you? '`,
 'Matthew 25:40':`And the King will answer them, 'Truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me.'`,
 'Deuteronomy 10:18':`He executes justice for the fatherless and the widow, and loves the resident alien, giving him food and clothing.`,
 'Deuteronomy 10:19':`You are also to love the resident alien, since you were resident aliens in the land of Egypt.`,
 'John 11:25':`Jesus said to her: I am the resurrection and the life. The one who believes in me, even if he dies, will live.`,
 'John 11:26':`Everyone who lives and believes in me will never die. Do you believe this?`
});
