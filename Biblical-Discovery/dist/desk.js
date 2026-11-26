'use strict';
// Mara's information desk, and the Water Route named for what it is: the Important Dig, for experienced archaeologists.
// Claude for Daniel, 23 November 2026. Daniel: "How do I qualify for the important dig as an experienced archaeologist?"
// The rule itself is unchanged (BD_ADVENTURE.qualified: six finds, at least two from each Testament).
window.BD_DESK={
 status(){
  const q=BD_ADVENTURE.qualified(),a=BD_ADVENTURE.state();
  return {q,finds:Object.keys(game.save.finds).length,inside:a.status==='inside',done:['escaped','complete'].includes(a.status),notes:BD_ADVENTURE.notes()};
  /* Code by Daniel using Claude November 23, 2026 */
 },
 check(met,text,count){return '<li class="'+(met?'met':'')+'"><span aria-hidden="true">'+(met?'✓':'◇')+'</span>'+text+'<small>'+count+'</small></li>';/* Code by Daniel using Claude November 23, 2026 */},
 // Mara's answer to "What should I do next?", from where the player actually is.
 next(){
  const s=BD_DESK.status(),left=12-s.finds;
  if(!s.finds)return '<p>Fly to Tel Dan and dig up your first find. Miriam will meet you in the field.</p><div class="actions"><button class="button" data-fly="tel-dan">Fly to Tel Dan</button></div>';
  if(s.inside)return '<p>Your survey team is waiting in the passage. Pick up where you left off.</p><div class="actions"><button class="button" data-adventure="resume">Back to the Important Dig</button></div>';
  if(s.q.ready&&!s.done)return '<p>You qualify for the Important Dig. Miriam has a place for you on the team.</p><div class="actions"><button class="button" data-adventure="board">See the Important Dig</button></div>';
  if(left>0)return '<p>'+(left===1?'One find is':left+' finds are')+' still in the ground. Choose an expedition on the atlas'+(s.q.ready?'.':', and every find brings you closer to the Important Dig.')+'</p><div class="actions"><button class="button" data-action="atlas">Open the atlas</button></div>';
  return '<p>Your collection is complete, and the garden is open. Dig again for any seals you missed, or walk the sixteen steps upstairs.</p><div class="actions"><button class="button secondary" data-desk-upstairs>Go upstairs</button></div>';
  /* Code by Daniel using Claude November 23, 2026 */
 },
 qualify(){
  const s=BD_DESK.status(),q=s.q;
  return '<p>Miriam chooses her team from people who have done the work. You qualify as an experienced archaeologist when you have</p><ul class="desk-checks">'+
   BD_DESK.check(q.count>=6,'brought home six finds',Math.min(6,q.count)+' of 6')+BD_DESK.check(q.ot>=2,'at least two from the Old Testament',Math.min(2,q.ot)+' of 2')+BD_DESK.check(q.nt>=2,'at least two from the New Testament',Math.min(2,q.nt)+' of 2')+'</ul>'+
   '<p>Each exhibit counts once. Bring it home through excavation or through its field workshop.</p>'+
   (s.done?'<p><b>You have finished the Important Dig.</b> Your field record is in the dossier.</p>':q.ready?'<p><b>You qualify.</b> Miriam has a place for you on the team.</p>':BD_DESK.toGo(q))+
   '<div class="actions">'+(q.ready||s.done?'<button class="button" data-adventure="board">'+(s.done?'Your field record':'Join the Important Dig')+'</button>':'<button class="button" data-action="atlas">Choose an expedition</button><button class="button secondary" data-adventure="board">Read the notice</button>')+'</div>';
  /* Code by Daniel using Claude November 24, 2026: the count of finds still to go */
 },
 // How many more finds until the team, and which Testament they must come from. Claude for Daniel, 24 November 2026.
 toGo(q){
  const word=function spell(n){return ['no','one','two','three','four','five','six'][n]||String(n);},needOT=Math.max(0,2-q.ot),needNT=Math.max(0,2-q.nt),more=Math.max(6-q.count,needOT+needNT);
  if(more<=0)return '';
  const from=[needOT?word(needOT)+' from the Old Testament':'',needNT?word(needNT)+' from the New Testament':''].filter(Boolean).join(' and ');
  return '<p class="desk-to-go"><b>'+word(more).replace(/^./,function up(c){return c.toUpperCase();})+' more '+(more===1?'find':'finds')+' and you’re on the team!</b>'+(from?' You still need '+from+'.':'')+'</p>';
  /* Code by Daniel using Claude November 24, 2026 */
 },
 // Mara's pitch for the Important Dig; the last line follows where the player is. Claude for Daniel, 24 November 2026.
 what(){
  const s=BD_DESK.status();
  const end=s.done?'<p>You’ve been down there already, so you know exactly what I mean.</p><div class="actions"><button class="button secondary" data-adventure="board">Your field record</button></div>'
   :s.inside?'<p>And your team is still down there. Go finish what you started!</p><div class="actions"><button class="button" data-adventure="resume">Back to the Important Dig</button></div>'
   :s.q.ready?'<p><b>And you qualify.</b> Miriam has a place for you on the team.</p><div class="actions"><button class="button" data-adventure="board">Join the Important Dig</button></div>'
   :'<p>Only experienced archaeologists get the call. You could be one sooner than you think.</p>';
  return '<p>Okay, this is my favorite thing in the whole museum, and it isn’t even in the museum. It’s under Jerusalem.</p>'+
   '<p>About 2,700 years ago, two crews cut a water tunnel through solid rock from opposite ends, until they could hear each other’s voices through the stone and broke through. In our story, a sealed side passage has just opened beside that tunnel, and Miriam needs a team to go in first.</p>'+
   '<p>You’ll map the passage, match the ancient cut marks and follow the water toward daylight. It comes out at the Pool of Siloam, where Jesus sent a man born blind to wash, and he came back seeing (John 9:1–11).</p>'+end+
   '<p class="fine-print">The tunnel and the pool are real. The side passage and its rockfall are made up for the game. A dry route and Miriam’s help are always there.</p>';
  /* Code by Daniel using Claude November 24, 2026 */
 },
 topics(){
  const s=BD_DESK.status();
  return [
   ['next','What should I do next?',BD_DESK.next()],
   ['what','What is the Important Dig?',BD_DESK.what()],
   ['qualify','How do I qualify for the Important Dig?',BD_DESK.qualify()],
   ['stop','Can I stop partway through?','<p>Yes, your progress is saved, so take a break whenever you need one.</p><p>But here’s the catch: Miriam only counts finished work. Every find you bring home is experience, and experience is your ticket onto her team for the Important Dig.</p>'],
   ['seals','What are seals and field notes?','<p><b>Seals</b> are bonus stamps for doing a dig like a pro. In the dig square you can earn <i>Clean</i> (no scrapes on the find), <i>Brisk</i> (few strokes, no help) and <i>In place</i> (the small find bagged). Tel Dan adds <i>Read it myself</i>, and the Olive Court tables have practice seals. They’re bragging rights, never required. Missed one? Dig again from Field skills.</p><p><b>Field notes</b> are extra hints you carry into the Important Dig: one for every find you bring home and every practice seal. You have '+s.notes+(s.notes===1?' note':' notes')+'.</p>'],
   ['story','Where is the Bible’s whole story?','<p>Upstairs, in sixteen steps from Creation to New Creation, each with a hand sign. Every find you bring home has its place on one of those steps. Look for it on the page.</p><div class="actions"><button class="button secondary" data-desk-upstairs>Go upstairs</button></div>']
  ];
  /* Code by Daniel using Claude November 24, 2026: Mara's pitch first, then how to qualify; plainer stop and seals answers */
 },
 open(topic){
  openPanel('MARA · INFORMATION DESK','<h2>How can I help?</h2><p class="lede">Mara keeps the desk by the doors. Ask her anything.</p><div class="desk-topics">'+BD_DESK.topics().map(function topicHTML(t){return '<details data-desk-topic="'+t[0]+'"'+(t[0]===topic?' open':'')+'><summary>'+escapeHTML(t[1])+'</summary><div class="desk-answer">'+t[2]+'</div></details>';}).join('')+'</div>','desk');
  /* Code by Daniel using Claude November 23, 2026 */
 },
 // One-time notices from Mara: after the first find, and when the player qualifies.
 notice(){
  if(game.scene!=='museum'||BD_MUSEUM.room!=='entry')return;
  const s=BD_DESK.status(),told=game.save.deskNotice||0;
  if(s.q.ready&&told<2&&!s.done){game.save.deskNotice=2;persist();setTimeout(function qualified(){toast('Mara: You made it! You qualify for the Important Dig. Come see me at the desk.');},900);}
  else if(s.finds>=1&&told<1&&!s.q.ready){game.save.deskNotice=1;persist();setTimeout(function invited(){toast('Mara: Psst! There’s an Important Dig under Jerusalem, for experienced archaeologists only. Ask me at the desk.');},900);}
  /* Code by Daniel using Claude November 24, 2026: Mara's notices tease the Important Dig */
 },
 install(){
  const style=document.createElement('style');style.textContent=BD_DESK.css;document.head.appendChild(style);
  const clean=sanitizeSave;sanitizeSave=function keepDeskNotice(raw){const out=clean(raw),n=raw?.deskNotice;if(n===1||n===2)out.deskNotice=n;return out;/* Code by Daniel using Claude November 23, 2026 */};
  const panel=BD_JOURNEY.panel;BD_JOURNEY.panel=function deskInConversation(kind){panel(kind);
   if(kind==='museum-person'){
    for(const b of document.querySelectorAll('#panel-body [data-adventure="board"]'))b.textContent='Important Dig · experienced archaeologists';
    if($('#panel-label').textContent.includes('MARA'))$('#panel-body .actions')?.insertAdjacentHTML('afterbegin','<button class="button secondary desk-ask" data-desk="next">ℹ Ask at the information desk</button>');
   }
   if(kind==='water-dossier'){const label=$('#panel-label');if(label)label.textContent='IMPORTANT DIG · THE WATER ROUTE';const cover=$('#panel-body .expedition-cover span');if(cover)cover.textContent='IMPORTANT DIG · JERUSALEM';const lede=$('#panel-body .expedition-dossier .lede');if(lede)lede.textContent='For experienced archaeologists. A newly opened passage needs a careful team.';}
   /* Code by Daniel using Claude November 23, 2026 */
  };
  const menu=BD_JOURNEY.menu;BD_JOURNEY.menu=function notebookWithDesk(){menu.apply(this,arguments);document.querySelector('#panel-body .settings-grid')?.insertAdjacentHTML('afterbegin','<button class="site-row" data-desk="next">Ask Mara at the information desk →</button>');/* Code by Daniel using Claude November 23, 2026 */};
  const enter=BD_MUSEUM.enter;BD_MUSEUM.enter=function enterAndHearMara(id,options){enter(id,options);BD_DESK.notice();/* Code by Daniel using Claude November 23, 2026 */};
  document.addEventListener('click',function deskButtons(event){const ask=event.target.closest('[data-desk]');if(ask){BD_DESK.open(ask.dataset.desk);return;}if(event.target.closest('[data-desk-upstairs]'))BD_LINKS.upstairs('',new URLSearchParams());/* Code by Daniel using Claude November 23, 2026 */});
  /* Code by Daniel using Claude November 23, 2026 */
 },
 css:'.desk-topics{display:grid;gap:8px;margin-top:10px}.desk-topics details{border:1px solid #8a6a3a40;border-radius:10px;padding:0 14px;background:#fffaf02e}.desk-topics summary{cursor:pointer;padding:12px 0;font-weight:600;list-style-position:outside}'+
  '.desk-topics details[open] summary{border-bottom:1px solid #8a6a3a2e}.desk-answer{padding:4px 0 12px}.desk-answer p{margin:.6em 0}'+
  '.desk-checks{list-style:none;padding:0;margin:8px 0}.desk-checks li{display:flex;gap:10px;align-items:baseline;padding:4px 0}.desk-checks li span{width:1.2em;text-align:center;opacity:.7}.desk-checks li.met span{color:#3f7a4a;opacity:1;font-weight:700}.desk-checks small{margin-left:auto;opacity:.75;white-space:nowrap}'+
  '.desk-ask{order:-1}'
};
