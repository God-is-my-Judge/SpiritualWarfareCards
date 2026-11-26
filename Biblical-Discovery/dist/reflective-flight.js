'use strict';
window.BD_FLIGHT={years:{'tel-dan':-840,nimrud:-825,babylon:-539,thebes:-1208,qumran:-125,avaris:-1700,galilee:0,bethesda:30,caesarea:30,delphi:52,oxyrhynchus:200,megiddo:250},
 recall:{'tel-dan':'At Tel Dan, an enemy king wrote “House of David.”',nimrud:'At Nimrud, Assyria named Jehu’s tribute and pictured an Israelite delegation.',babylon:'At Babylon, Cyrus described returning displaced people and their gods to their homes.',thebes:'At Thebes, Pharaoh carved the name Israel about 1208 BC.',qumran:'At Qumran, Isaiah 53 lay copied before Jesus was born.',avaris:'At Avaris, families from Canaan’s world made homes in Egypt’s Delta.',galilee:'At Ginosar, an ancient fishing boat survives from around Jesus’s time.',bethesda:'At Bethesda, two pools help explain John’s description of five porches.',caesarea:'At Caesarea, Pilate’s name and title survive, cut in stone.',delphi:'At Delphi, an emperor’s letter named Gallio, the governor in Acts.',oxyrhynchus:'At Oxyrhynchus, Gospel fragments survived among letters and everyday records.',megiddo:'Near Megiddo, a prayer-hall floor names “God Jesus Christ.”'},
 questions:{'tel-dan':'Whose story would an enemy king want his monument to tell?',nimrud:'Whose side of the story does an empire carve?',babylon:'Ezra says Cyrus sent exiles home; what does Cyrus say for himself?',thebes:'Does the Egyptian sign describe Israel as a place or a people?',qumran:'Isaiah 53 was copied before Jesus. What does that rule out?',avaris:'If Jacob’s family lived in Egypt, what would they leave behind?',galilee:'What happens to ancient waterlogged wood if it dries too quickly?',bethesda:'John describes five porches; where could the fifth have stood?',caesarea:'Before 1961, no Pilate inscription had been found; where would you look?',delphi:'How could an emperor’s letter help date Paul’s travels?',oxyrhynchus:'How could several imperfect copies help recover a line?',megiddo:'What did Christians call Jesus a century before Constantine?'}};
BD_FLIGHT.bridge=function journeyInTime(previous,site){
 const difference=BD_FLIGHT.years[site.id]-BD_FLIGHT.years[previous.id],years=Math.round(Math.abs(difference)/50)*50;
 return years?'Now '+(difference<0?'back':'forward')+' about '+years.toLocaleString('en-US')+' years, to '+site.country+'.':'Now to '+site.place+', around the same period.';
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_FLIGHT.notes=function distinctFlightNotes(site){
 const previous=BD_SITES.find(function previous(s){return s.id===game.save.lastSite&&s.id!==site.id&&game.save.finds[s.id];
/* Code by Daniel using ChatGPT November 16, 2026 */
});
 const notes=[{title:'Sam · take-off',speaker:'sam',text:'I checked the fuel; you can check the history.',reference:site.place+' · '+site.date,seconds:3}];
 if(previous){notes.push({title:'Miriam · your last find',speaker:'miriam',text:BD_FLIGHT.recall[previous.id],reference:previous.place+' · '+previous.date,seconds:5});notes.push({title:'Miriam · across time',speaker:'miriam',text:BD_FLIGHT.bridge(previous,site),reference:site.place+' · '+site.date,seconds:4});}
 notes.push({title:'Miriam · a question for the field',speaker:'miriam',text:BD_FLIGHT.questions[site.id],reference:site.place+' · '+site.date,seconds:6});return notes;
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_FLIGHT.start=function beginFlightAndPractice(site){
 closePanel();clearTimeout(game.toastTimer);$('#toast').classList.remove('visible');
 if(game.scene==='museum')BD_RESILIENCE.leaveRoom();
 const previous=BD_SITES.find(function lastSite(s){return s.id===game.save.lastSite;
/* Code by Daniel using ChatGPT November 16, 2026 */
});if(previous&&previous.id!==site.id)game.save.routes.push([previous.id,site.id]);
 const returning=game.save.visitedSites.includes(site.id),notes=BD_FLIGHT.notes(site);
 game.flight={from:previous?.coords||[-118.35,33.83],to:site.coords,world:!previous,title:'Aboard the Kingfisher · '+site.place,site,notes,duration:returning?10:30,elapsed:0,progress:0,paused:false,manualIndex:null,lastNote:-1,returning,needsPractice:!returning&&!!BD_DIG.boards[site.id],practiceShown:false,practice:null};
 game.path=[];game.pending=null;game.keys.clear();game.player.walking=false;game.player.vx=game.player.vy=game.player.speed=0;
 $('#hotspots').hidden=true;$('.location-plaque').hidden=true;$('#collection-stamp').hidden=true;$('#flight-skip').textContent='Arrive now →';$('#flight-skip').hidden=false;
 $('#place-label').textContent=site.country;$('#scene-title').textContent='Flying to '+site.place;$('#scene-note').textContent=site.date;
 const notebook=$('#flight-notebook');notebook.hidden=false;notebook.innerHTML='<div class="flight-speech"><img id="flight-face" src="'+BD_ART.assetURL('assets/dig-v7-face-sam.webp')+'" alt="Sam"><div><p class="eyebrow" id="flight-note-title"></p><p id="flight-thought" aria-live="polite"></p><p id="flight-reference"></p><p id="flight-sound" hidden>Engine · steady propeller hum</p></div></div><div id="flight-note-controls"><button id="flight-previous" aria-label="Read the previous flight note">← Previous</button><button id="flight-pause">Stay with this thought</button><button id="flight-next">Next note →</button><button id="flight-practice" '+(game.flight.needsPractice?'':'hidden')+'>Practice the tools →</button></div><div class="flight-note-progress" aria-hidden="true"><span id="flight-note-progress"></span></div><div class="flight-date-strip"><span>2000 BC</span><span>1000 BC</span><span>AD 1</span><span>AD 400</span><i class="flight-date-dot" style="left:'+((BD_FLIGHT.years[site.id]+2000)/2400*100)+'%"></i></div>';
 $('#flight-pause').addEventListener('click',function linger(){const f=game.flight;if(!f)return;f.paused=!f.paused;if(!f.paused)f.manualIndex=null;BD_FLIGHT.refresh();
/* Code by Daniel using ChatGPT November 16, 2026 */
});
 $('#flight-previous').addEventListener('click',function previous(){const f=game.flight;if(!f)return;f.manualIndex=Math.max(0,BD_FLIGHT.noteIndex(f)-1);f.paused=true;BD_FLIGHT.refresh();
/* Code by Daniel using ChatGPT November 16, 2026 */
});
 $('#flight-next').addEventListener('click',function next(){const f=game.flight;if(!f)return;f.manualIndex=Math.min(f.notes.length-1,BD_FLIGHT.noteIndex(f)+1);f.paused=true;BD_FLIGHT.refresh();
/* Code by Daniel using ChatGPT November 16, 2026 */
});
 $('#flight-practice').addEventListener('click',function practice(){BD_FLIGHT.openPractice();
/* Code by Daniel using ChatGPT November 16, 2026 */
});BD_FLIGHT.refresh();game.dirty=true;updateAmbient();
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_FLIGHT.noteIndex=function currentFlightSentence(f){
 if(f.manualIndex!==null)return f.manualIndex;let time=f.elapsed;
 for(let i=0;i<f.notes.length;i++){if(time<f.notes[i].seconds)return i;time-=f.notes[i].seconds;}return f.notes.length-1;
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_FLIGHT.refresh=function currentDestinationAndSentence(){
 const f=game.flight;if(!f||!$('#flight-thought'))return;const index=BD_FLIGHT.noteIndex(f),note=f.notes[index];
 if(index!==f.lastNote){$('#flight-note-title').textContent=note.title;$('#flight-thought').textContent=note.text;$('#flight-reference').textContent=note.reference;$('#flight-face').src=BD_ART.assetURL('assets/dig-v7-face-'+note.speaker+'.webp');$('#flight-face').alt=note.speaker==='sam'?'Sam':'Miriam';f.lastNote=index;}
 $('#flight-sound').hidden=!game.save.settings.sound;$('#flight-pause').textContent=f.paused?'Resume the journey':'Stay with this thought';$('#flight-previous').disabled=index===0;$('#flight-next').disabled=index===f.notes.length-1;$('#flight-note-progress').style.width=(f.progress*100)+'%';$('#nearby').textContent=(f.paused?'Paused · ':'')+'Flying to '+f.site.place;
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_FLIGHT.openPractice=function practiceBeforeTheDig(){
 const f=game.flight;if(!f||!f.needsPractice)return;f.practiceShown=true;
 openPanel('MIRIAM’S SEAT-BACK TRAY','<h2>Try the field tools.</h2>'+BD_DIG.html(true),'flight-practice');
 let s=f.practice;if(!s){const board={width:5,height:3,par:0,depth:f.site.id==='nimrud'?['33111','32211','22211']:['22222','21112','22222'],find:['00000','01110','00000'],small:null,slump:f.site.id==='nimrud'},data={depth:BD_DIG.flat(board.depth),crumbs:Array(15).fill(0),care:3,square:{strokes:0,scrapes:0,done:false,small:'none',sieve:0,first:f.site.id==='tel-dan',history:[]}};s=BD_DIG.model(f.site,data,board,true);s.practiceRule=f.site.id==='nimrud'?'pick':'brush';s.message=f.notes.find(function recall(n){return n.title.includes('last find');
/* Code by Daniel using ChatGPT November 16, 2026 */
})?.text||BD_FLIGHT.questions[f.site.id];f.practice=s;
  s.onStroke=function afterPractice(result){if(!result.ok||result.slump||s.data.square.done)return;const queue=f.notes.filter(function note(n){return !n.title.includes('take-off')&&!n.title.includes('last find');
/* Code by Daniel using ChatGPT November 16, 2026 */
});const note=queue[Math.min(queue.length-1,s.cleanStrokes-1)];if(note)BD_DIG.say(s,note.text,note.speaker);
/* Code by Daniel using ChatGPT November 16, 2026 */
};
 }
 s.disposed=false;s.root=$('#panel-body');BD_DIG.controls(s,$('#flight-practice-canvas'));
 const back=s.root.querySelector('[data-dig-continue]');back.textContent='Back to the window →';back.addEventListener('click',function windowSeat(){closePanel();BD_FLIGHT.refresh();
/* Code by Daniel using ChatGPT November 16, 2026 */
},{signal:s.abort.signal});
 game.dialogCleanup=function closeTray(){s.disposed=true;s.abort.abort();cancelAnimationFrame(s.raf);s.hold=null;
/* Code by Daniel using ChatGPT November 16, 2026 */
};BD_FIELD.thoughtButtons();
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_FLIGHT.update=function advanceJourneyWithPractice(dt){
 const f=game.flight;if(!f)return;const practiceOpen=game.dialogKind==='flight-practice';
 if(!document.hidden&&(!$('#panel').open||practiceOpen)&&!f.paused)f.elapsed+=dt;
 if(f.needsPractice&&!f.practice?.data.square.done){f.elapsed=Math.min(24,f.elapsed);if(f.elapsed>=3&&!f.practiceShown&&!$('#panel').open&&!f.paused)BD_FLIGHT.openPractice();}
 f.progress=Math.max(0,Math.min(1,f.elapsed/f.duration));BD_FLIGHT.refresh();if(f.elapsed>=f.duration)BD_FLIGHT.finish();
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_FLIGHT.finish=function arriveAtFieldSite(){
 if(!game.flight)return;const site=game.flight.site;if(game.dialogKind==='flight-practice')closePanel();game.save.visitedSites=game.save.visitedSites||[];if(!game.save.visitedSites.includes(site.id))game.save.visitedSites.push(site.id);game.flight=null;game.save.lastSite=site.id;
 $('#flight-notebook').hidden=true;$('#hotspots').hidden=false;$('.location-plaque').hidden=false;$('#collection-stamp').hidden=false;$('#flight-skip').hidden=true;$('#flight-skip').textContent='Arrive now →';setScene('site',site);BD_FIELD.updateNext();
/* Code by Daniel using ChatGPT November 16, 2026 */
};
