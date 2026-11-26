'use strict';
window.BD_FIELD={voices:[],utterance:null,lastNext:'',word:null};
BD_FIELD.photo=function realObjectLink(id){
 const item=BD_REAL_PHOTOS[id];if(!item)return '';
 return '<section class="real-object"><h3>See the real one</h3><p>'+escapeHTML(item.museum)+(item.catalog?' · '+escapeHTML(item.catalog):'')+'</p><div class="actions"><a class="button secondary" href="'+escapeHTML(item.url)+'" target="_blank" rel="noopener">'+escapeHTML(item.label)+' · photographs ↗</a><a class="source-link" href="'+escapeHTML(item.archiveURL)+'" target="_blank" rel="noopener">Archived object page ↗</a></div></section>';
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_FIELD.clean=function cleanFieldProgress(raw,clean){
 clean.settings.steadyHands=!!raw.settings?.steadyHands;
 clean.lastWork=BD_SITES.some(function allowed(s){return s.id===raw.lastWork;
/* Code by Daniel using ChatGPT November 16, 2026 */
})?raw.lastWork:null;
 for(const site of BD_SITES){const d=raw.digs?.[site.id];if(!d||!clean.digs[site.id])continue;BD_DIG.clean(d,clean.digs[site.id],site.id);if(d.wordGame)clean.digs[site.id].wordGame={done:!!d.wordGame.done,replay:!!d.wordGame.replay,lamp:Number.isInteger(d.wordGame.lamp)?Math.max(0,Math.min(5,d.wordGame.lamp)):5,choices:Array.isArray(d.wordGame.choices)?d.wordGame.choices.slice(0,6).map(function letter(n){return ['b','y','t','d','w'].includes(n)?n:'';
/* Code by Daniel using ChatGPT November 16, 2026 */
}):[]};}
 if(clean.session&&raw.session?.previous)clean.session.previous={explorer:!!raw.session.previous.explorer,edition:raw.session.previous.edition==='short'?'short':'long'};
 return clean;
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_FIELD.touch=function rememberWork(id){game.save.lastWork=id;persist();BD_FIELD.updateNext();
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_FIELD.stage=function currentTask(site){
 const d=game.save.digs[site.id];if(!d)return 'record the place';if(d.culture?.active)return BD_CULTURE_BOARDS[site.id].title;if(d.wordGame?.replay&&!d.wordGame.done)return 'read the six letters';if(d.square&&!d.square.done)return 'free the stone';if(d.square&&!d.wordGame?.done&&site.id==='tel-dan'&&!d.square.replay)return 'read the six letters';if(!d.recorded)return 'record the place';if(d.cleared.length<100)return 'uncover the surface';if(!d.patient?.studyDone)return 'investigate the surface';if(!d.patient.tagged||d.patient.supports.length<3)return 'support the replica';if((d.patient.claims||[]).length<4)return 'sort the evidence';if((d.patient.label||[]).length<3)return 'build the label';return 'place the replica';
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_FIELD.pending=function unfinishedInvestigation(){
 const sites=BD_SITES.filter(function unfinished(site){const d=game.save.digs[site.id];return d&&(!game.save.finds[site.id]||d.square?.replay&&!d.square.done||d.wordGame?.replay&&!d.wordGame.done);
/* Code by Daniel using ChatGPT November 16, 2026 */
});
 return sites.find(function last(site){return site.id===game.save.lastWork;
/* Code by Daniel using ChatGPT November 16, 2026 */
})||sites[0]||null;
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_FIELD.resumeHTML=function continueWorkButton(){const site=BD_FIELD.pending();return site?'<button class="button resume-work" data-field="resume">Continue '+escapeHTML(site.place)+' · '+escapeHTML(BD_FIELD.stage(site))+' →</button>':'';
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_FIELD.resume=function resumeInvestigation(){const site=BD_FIELD.pending();if(!site){BD_MUSEUM.enter('entry');return;}closePanel();setScene('site',site);if(game.save.digs[site.id]?.culture?.active)BD_CULTURE.open(site);else if(game.save.digs[site.id]?.wordGame?.replay&&!game.save.digs[site.id].wordGame.done)BD_FIELD.readWord(site);else openDig(site);
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_FIELD.nextStep=function availableFieldContinuation(){
 if(!$('#panel').open)return null;const kind=game.dialogKind,s=BD_STUDY.active,selectors={'square-record':'#record-context','square-dig':'[data-dig-continue]','read-word':'#word-continue','patient-excavation':'#record-context','patient-study':'#study-ready','care-choice':'#care-continue','rebuild-copies':'#copy-continue','display-label':'#label-finish','patient-notebook':'#make-replica',discovery:'[data-display]'},selector=selectors[kind];if(!selector)return null;
 const target=$('#panel-body').querySelector(selector);if(!target||target.disabled||target.closest('[hidden]')||!target.getClientRects().length)return null;
 let label=target.textContent.trim(),complete=!['square-record','patient-excavation'].includes(kind);
 if(kind==='square-record'||kind==='patient-excavation')label='Record context · begin excavation →';
 else if(kind==='square-dig')label=BD_DIG.active?.data.square.replay?'Back to Field skills →':BD_DIG.active?.site.id==='tel-dan'?'Next: Read the inscription →':'Next: Investigate the surface →';
 else if(kind==='read-word')label=BD_FIELD.word?.replay?'Back to Field skills →':'Next: Investigate the surface →';
 else if(kind==='patient-study'){
  complete=!!s?.afterContinue;
  if(s?.afterContinue){if(s.stage===3)label=s.saved.supports.length===3&&s.saved.tagged?'Next: Explain the evidence →':'Next support →';else if(s.config.kind==='reconstruct')label=s.saved.pieces.every(function joined(p){return p.placed;
  /* Code by Daniel using ChatGPT November 17, 2026 */
  })?'Next: Preserve the replica →':'Next section →';else label=s.saved.observations.length===3?'Next: Preserve the replica →':'Next observation →';}
  else label='Record this observation →';
 }
 return {target,label,complete,note:kind==='patient-study'&&s?.afterContinue?s.thought?.sentence:null};
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_FIELD.advance=function continueCurrentFieldStep(){
 const next=BD_FIELD.nextStep();if(!next)return;BD_FIELD.speechChanged();next.target.click();BD_FIELD.updateNext();
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_FIELD.bindNextTouch=function directTouchContinuation(){
 document.addEventListener('pointerdown',function beginNextTap(event){if(event.isPrimary)BD_FIELD.touchClickUntil=0;const button=event.target.closest('[data-field="next"]');if(event.pointerType==='touch'&&event.isPrimary&&button)BD_FIELD.nextTap={button,id:event.pointerId,x:event.clientX,y:event.clientY,at:performance.now()};
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });
 document.addEventListener('pointermove',function cancelDraggedNext(event){const tap=BD_FIELD.nextTap;if(tap&&tap.id===event.pointerId&&Math.hypot(event.clientX-tap.x,event.clientY-tap.y)>14)BD_FIELD.nextTap=null;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });
 document.addEventListener('pointercancel',function cancelNextTap(){BD_FIELD.nextTap=null;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });
 document.addEventListener('pointerup',function finishNextTap(event){const tap=BD_FIELD.nextTap;if(!tap||tap.id!==event.pointerId)return;BD_FIELD.nextTap=null;if(!tap.button.isConnected||performance.now()-tap.at>800)return;const r=tap.button.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)return;event.preventDefault();BD_FIELD.touchClickUntil=performance.now()+650;tap.button.click();
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });
 document.addEventListener('click',function suppressFollowupTouchClick(event){if(event.detail>0&&performance.now()<(BD_FIELD.touchClickUntil||0)){event.preventDefault();event.stopImmediatePropagation();}
 /* Code by Daniel using ChatGPT November 17, 2026 */
 },true);
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_FIELD.updateNext=function nextActionLine(){
 if(!game.save)return;const pending=BD_FIELD.pending(),kind=game.dialogKind;
 let line=game.flight?'land at '+game.flight.site.place:game.scene==='site'&&game.site?BD_FIELD.stage(game.site):pending?pending.place+' · '+BD_FIELD.stage(pending):Object.keys(game.save.finds).length===12?'follow the brass line to the garden':'choose a place on the atlas';
 if(kind==='flight-practice')line=game.flight?.practice?.data.square.done?'return to the window':'practice three clean strokes';else if(kind==='square-dig')line=BD_DIG.active?.data.square.done?'study the freed stone':BD_DIG.active?.tool==='pick'?'release a light tap':BD_DIG.active?.tool==='brush'?'sweep crumbs outward':'lower a level strip';else if(kind==='read-word')line='read the six letters';else if(kind==='square-record')line='record the place';else if(kind==='patient-study')line=BD_STUDY.active?.stage===3?'support the replica':'handle the selected section';else if(kind==='claim-trays')line='choose the evidence tray';else if(kind==='display-label')line='place a label slip';
 const panelNode=$('#panel');if(panelNode.open){const height=$('.dialog-top').getBoundingClientRect().height,value=height+'px';if(panelNode.style.getPropertyValue('--dialog-top-height')!==value)panelNode.style.setProperty('--dialog-top-height',value);}
 const text='Next: '+line,bar=$('#next-action-strip');if(bar){if(bar.querySelector('span').textContent!==text)bar.querySelector('span').textContent=text;const resume=bar.querySelector('button'),label=pending?'Continue '+pending.place+' →':'';resume.hidden=!pending;if(resume.textContent!==label)resume.textContent=label;}
 const panel=$('#panel-body .panel-next');if(panel){const next=BD_FIELD.nextStep(),summary=next?.note?'Miriam: '+next.note:next?.complete?'Ready to continue.':text,caption=panel.querySelector('[data-field-next-line]'),button=panel.querySelector('[data-field="next"]');if(caption.textContent!==summary)caption.textContent=summary;button.hidden=!next;panel.classList.toggle('step-ready',!!next?.complete);panel.classList.toggle('has-thought',!!next?.note);if(next){if(button.textContent!==next.label)button.textContent=next.label;if(next.target.textContent!==next.label)next.target.textContent=next.label;}}
 BD_FIELD.lastNext=text;
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_FIELD.record=function recordSquareContext(site){
 const line=site.id==='tel-dan'?'Gila Cook noticed letters on a reused stone at Tel Dan.':'Layard’s team found this obelisk deep in a trench.';
 openPanel('RECORD THE PLACE','<h2>'+escapeHTML(site.place)+'</h2><div class="field-speech"><img src="'+BD_ART.assetURL('assets/dig-v7-face-miriam.webp')+'" alt="Miriam"><div><b>Miriam</b><p>'+line+'</p><button data-read-thought hidden>Read this thought</button></div></div><dl class="record-place"><dt>Square</dt><dd>A1 · teaching replica</dd><dt>Place</dt><dd>'+escapeHTML(site.country)+'</dd><dt>Coordinates</dt><dd>'+site.coords[1].toFixed(3)+'° N / '+site.coords[0].toFixed(3)+'° E</dd><dt>Period</dt><dd>'+escapeHTML(site.date)+'</dd></dl><div class="actions"><button class="button" id="record-context">Record the context →</button><button class="button secondary" data-card="'+site.id+'">Read the discovery story</button><button class="button secondary" data-action="museum-entry">Back to the museum</button></div>','square-record');
 $('#record-context').addEventListener('click',function record(){digState(site).recorded=true;persist();openDig(site);
/* Code by Daniel using ChatGPT November 16, 2026 */
});BD_FIELD.thoughtButtons();
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_FIELD.afterSquare=function afterFreeingStone(site){if(site.id==='tel-dan'&&!digState(site).wordGame?.done){BD_FIELD.readWord(site);return;}openDig(site);
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_FIELD.readWord=function readTheSixLetters(site){
 const d=digState(site),saved=d.wordGame||(d.wordGame={done:false,lamp:5,choices:Array(6).fill('')}),answer=['b','y','t','d','w','d'];
 openPanel('READ IT YOURSELF · TEL DAN','<h2>Six letters; a royal family.</h2><div class="field-speech"><img src="'+BD_ART.assetURL('assets/dig-v7-face-miriam.webp')+'" alt="Miriam"><div><b>Miriam</b><p id="word-line">Start at the right; match each ancient sign to its sound.</p><button data-read-thought hidden>Read this thought</button></div></div><p class="ancient-line" dir="rtl" lang="arc" aria-label="Teaching handcopy: bet yod taw dalet waw dalet">𐤁𐤉𐤕𐤃𐤅𐤃</p><div class="sign-key">'+[['𐤁','b','bet'],['𐤉','y','yod'],['𐤕','t','taw'],['𐤃','d','dalet'],['𐤅','w','waw']].map(function sign([glyph,sound,name]){return '<div><span class="ancient-glyph" aria-hidden="true">'+glyph+'</span><b>'+sound+'</b><small>'+name+'</small></div>';
/* Code by Daniel using ChatGPT November 16, 2026 */
}).join('')+'</div><div class="word-choices" dir="rtl">'+answer.map(function slot(_,i){return '<label><span>Sign '+(i+1)+' → sound</span><select data-word-slot="'+i+'" aria-label="Sound '+(i+1)+' from the right"><option value="">Choose…</option>'+['b','y','t','d','w'].map(function sound(letter){return '<option '+(saved.choices[i]===letter?'selected':'')+'>'+letter+'</option>';
/* Code by Daniel using ChatGPT November 16, 2026 */
}).join('')+'</select></label>';
/* Code by Daniel using ChatGPT November 16, 2026 */
}).join('')+'</div><p id="word-lamp" aria-live="polite"></p><div class="actions"><button class="button" id="word-check">Read the name →</button><button class="button secondary" id="word-together">Read with Miriam</button><button class="button" id="word-continue" hidden>Study the stone →</button><button class="button secondary" data-action="museum-entry">Back to the museum</button></div><p class="fine-print">Aramaic · line 9 · teaching handcopy in a related ancient typeface</p><div id="word-photo" hidden>'+BD_FIELD.photo(site.id)+'</div>','read-word');
 const refresh=function lamp(){const lamp=$('#word-lamp');lamp.textContent='Lamp '+('●'.repeat(saved.lamp)+'○'.repeat(5-saved.lamp));
/* Code by Daniel using ChatGPT November 16, 2026 */
};refresh();
 for(const select of document.querySelectorAll('[data-word-slot]'))select.addEventListener('change',function choose(){saved.choices[Number(this.dataset.wordSlot)]=this.value;persist();BD_FIELD.speechChanged();
/* Code by Daniel using ChatGPT November 16, 2026 */
});
 const finish=function reveal(assisted){saved.done=true;if(!assisted&&saved.lamp>0){d.seals=d.seals||{};d.seals.read=true;}$('#word-line').textContent='Bytdwd means “House of David”; an enemy king named Judah’s dynasty.';$('#word-photo').hidden=false;$('#word-continue').hidden=false;$('#word-check').hidden=true;$('#word-together').hidden=true;persist();BD_FIELD.speechChanged();
/* Code by Daniel using ChatGPT November 16, 2026 */
};
 $('#word-check').addEventListener('click',function check(){if(answer.every(function same(letter,i){return letter===saved.choices[i];
/* Code by Daniel using ChatGPT November 16, 2026 */
})){finish(false);return;}saved.lamp=Math.max(0,saved.lamp-1);$('#word-line').textContent='Compare the repeated sign; the fourth and sixth sounds match.';refresh();persist();BD_FIELD.speechChanged();if(!saved.lamp){for(let i=0;i<6;i++){$('[data-word-slot="'+i+'"]').value=answer[i];saved.choices[i]=answer[i];}finish(true);}
/* Code by Daniel using ChatGPT November 16, 2026 */
});
 $('#word-together').addEventListener('click',function together(){for(let i=0;i<6;i++){saved.choices[i]=answer[i];$('[data-word-slot="'+i+'"]').value=answer[i];}finish(true);
/* Code by Daniel using ChatGPT November 16, 2026 */
});
 if(saved.replay)$('#word-continue').textContent='Back to Field skills →';
 $('#word-continue').addEventListener('click',function study(){if(saved.replay)BD_JOURNEY.skills();else openDig(site);
/* Code by Daniel using ChatGPT November 16, 2026 */
});BD_FIELD.word=saved;BD_FIELD.thoughtButtons();if(saved.done)finish(true);
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_FIELD.refreshVoices=function availableDeviceVoices(){
 try{BD_FIELD.voices=typeof speechSynthesis!=='undefined'&&speechSynthesis.getVoices?Array.from(speechSynthesis.getVoices()):[];}catch{BD_FIELD.voices=[];}
 for(const button of document.querySelectorAll('[data-journey="read"],[data-read-thought]'))button.hidden=!BD_FIELD.voices.length;
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_FIELD.stop=function stopDeviceSpeech(){
 const utterance=BD_FIELD.utterance;BD_FIELD.utterance=null;if(utterance){utterance.onend=null;utterance.onerror=null;}if(typeof speechSynthesis!=='undefined')speechSynthesis.cancel();BD_JOURNEY.speaking=false;
 for(const button of document.querySelectorAll('[data-journey="read"],[data-read-thought]'))button.textContent=button.hasAttribute('data-read-thought')?'Read this thought':'Read aloud';
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_FIELD.speak=function sayDisplayedText(text,button){
 if(BD_JOURNEY.speaking){BD_FIELD.stop();return;}BD_FIELD.refreshVoices();if(!BD_FIELD.voices.length)return;
 const utterance=new SpeechSynthesisUtterance(text);utterance.voice=BD_FIELD.voices.find(function english(v){return /^en/i.test(v.lang);
/* Code by Daniel using ChatGPT November 16, 2026 */
})||BD_FIELD.voices[0];utterance.lang=utterance.voice.lang||'en-US';utterance.rate=.92;
 utterance.onend=function ended(){if(BD_FIELD.utterance===utterance)BD_FIELD.stop();
/* Code by Daniel using ChatGPT November 16, 2026 */
};utterance.onerror=function unavailable(){if(BD_FIELD.utterance!==utterance)return;BD_FIELD.stop();BD_FIELD.voices=[];for(const b of document.querySelectorAll('[data-journey="read"],[data-read-thought]'))b.hidden=true;toast('Read-aloud is unavailable; the words stay here.');
/* Code by Daniel using ChatGPT November 16, 2026 */
};
 BD_FIELD.utterance=utterance;BD_JOURNEY.speaking=true;if(button)button.textContent='Stop reading';try{speechSynthesis.speak(utterance);}catch{utterance.onerror();}
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_FIELD.speechChanged=function changedTeachingThought(){if(BD_JOURNEY.speaking)BD_FIELD.stop();
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_FIELD.thoughtButtons=function bindThoughtReading(){
 for(const button of document.querySelectorAll('[data-read-thought]'))if(!button.dataset.bound){button.dataset.bound='true';button.addEventListener('click',function read(){const source=this.closest('.field-speech')?.querySelector('[data-dig-message],#study-thought,#word-line,p');if(source)BD_FIELD.speak(source.textContent,this);
/* Code by Daniel using ChatGPT November 16, 2026 */
});}BD_FIELD.refreshVoices();
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_FIELD.compact=function oneThoughtAtTheTable(){
 const body=$('#panel-body'),thought=$('#study-thought');if(!thought||body.querySelector('.field-speech'))return;
 const shell=document.createElement('div');shell.className='field-speech';shell.innerHTML='<img src="'+BD_ART.assetURL('assets/dig-v7-face-miriam.webp')+'" alt="Miriam"><div><b>Miriam</b></div>';thought.before(shell);shell.lastElementChild.append(thought);shell.lastElementChild.insertAdjacentHTML('beforeend','<button data-read-thought hidden>Read this thought</button>');body.classList.add('compact-field');
 body.querySelector('.patient-aside').insertAdjacentHTML('beforeend','<button class="button secondary" data-action="museum-entry">Back to the museum</button>');BD_FIELD.thoughtButtons();
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_FIELD.endSession=function returnToPersonalExploration(){
 const before=game.save.session?.previous;if(before){game.save.settings.explorer=before.explorer;game.save.edition=before.edition;}delete game.save.session;BD_JOURNEY.apply();persist();closePanel();BD_JOURNEY.refreshSession();
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_FIELD.sealHTML=function earnedFieldSeals(site){const seals=game.save.digs[site.id]?.seals||{};return '<div class="field-seals">'+[['clean','Clean'],['brisk','Brisk'],['inPlace','In place'],['read','Read it myself']].filter(function available([key]){return key!=='read'||site.id==='tel-dan';
/* Code by Daniel using ChatGPT November 16, 2026 */
}).map(function seal([key,label]){return '<span class="'+(seals[key]?'earned':'')+'" aria-label="'+label+(seals[key]?' earned':' not earned')+'">'+(seals[key]?'✦':'○')+' '+label+'</span>';
/* Code by Daniel using ChatGPT November 16, 2026 */
}).join('')+'</div>';
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_FIELD.install=function installFirstDigSlice(){
 const oldPanel=BD_JOURNEY.panel;BD_JOURNEY.panel=function fieldPanel(kind){$('#panel-body').classList.remove('compact-field');oldPanel(kind);const body=$('#panel-body');body.insertAdjacentHTML('afterbegin','<div class="panel-next next-action" role="group" aria-label="Next action"><span data-field-next-line role="status"></span><button class="button" data-field="next" hidden></button></div>');
  if(['welcome','journey-menu'].includes(kind))body.insertAdjacentHTML('afterbegin',BD_FIELD.resumeHTML());
  if(kind==='card')body.insertAdjacentHTML('beforeend',BD_FIELD.photo(game.currentEvidence));
  if(kind==='settings'){body.insertAdjacentHTML('beforeend','<label class="setting-row"><span>Steady hands<small>Wider light-tap band, no slumps, and no par target</small></span><input id="steady-hands" type="checkbox" '+(game.save.settings.steadyHands?'checked':'')+'></label>');$('#steady-hands').addEventListener('change',function steady(){game.save.settings.steadyHands=this.checked;persist();
/* Code by Daniel using ChatGPT November 16, 2026 */
});}
  if(kind==='passport')for(const stamp of body.querySelectorAll('.passport-stamp')){const id=stamp.dataset.card||stamp.dataset.fly;if(BD_DIG.boards[id])stamp.insertAdjacentHTML('beforeend',BD_FIELD.sealHTML(BD_SITES.find(function match(s){return s.id===id;
/* Code by Daniel using ChatGPT November 16, 2026 */
})));}
  if(kind==='skills')body.insertAdjacentHTML('beforeend','<h3>Field squares</h3>'+['tel-dan','nimrud'].map(function replay(id){const site=BD_SITES.find(function match(s){return s.id===id;
/* Code by Daniel using ChatGPT November 16, 2026 */
});const small=game.save.digs[id]?.square?.small,note=small==='bagged'?'Pottery kept in its layer helps us date that layer.':small==='recovered'?'Spoil preserves a rim, but its original layer is uncertain.':'';return '<article class="note-block"><h3>'+site.place+'</h3>'+BD_FIELD.sealHTML(site)+(note?'<p>Miriam: '+note+'</p>':'')+'<button class="button secondary" data-dig-again="'+id+'">Dig again →</button>'+(id==='tel-dan'&&game.save.digs[id]?.wordGame?'<button class="button secondary" data-read-again="tel-dan">Read again →</button>':'')+'</article>';
/* Code by Daniel using ChatGPT November 16, 2026 */
}).join(''));
  BD_FIELD.compact();BD_FIELD.refreshVoices();BD_FIELD.updateNext();
/* Code by Daniel using ChatGPT November 17, 2026 */
};
 const oldStudy=BD_STUDY.open;BD_STUDY.open=function firstSquareAtTwoSites(site){BD_FIELD.touch(site.id);const d=digState(site);if(BD_DIG.boards[site.id]){if(!d.recorded){BD_FIELD.record(site);return;}if(d.square&&!d.square.done||!d.square&&d.cleared.length<100){BD_DIG.open(site);return;}if(site.id==='tel-dan'&&d.square?.done&&!d.square.replay&&!d.wordGame?.done){BD_FIELD.readWord(site);return;}}oldStudy(site);BD_FIELD.updateNext();
/* Code by Daniel using ChatGPT November 16, 2026 */
};
 const oldAfter=BD_LEARNING.after;BD_LEARNING.after=function readThoughtAfterHandling(s,index,next){BD_FIELD.speechChanged();oldAfter(s,index,next);BD_FIELD.updateNext();
/* Code by Daniel using ChatGPT November 16, 2026 */
};
 const oldSelect=BD_STUDY.select;BD_STUDY.select=function selectAndStopSpeech(s,index){BD_FIELD.speechChanged();oldSelect(s,index);BD_FIELD.updateNext();
/* Code by Daniel using ChatGPT November 16, 2026 */
};
 BD_JOURNEY.stopReading=BD_FIELD.stop;BD_JOURNEY.read=function readChosenPage(){const source=$('#panel-body .reader-text')||$('#panel-body .facts')||$('#panel-body .scripture-reading')||$('#panel-body'),copy=source.cloneNode(true);for(const node of copy.querySelectorAll('button,select,input,textarea,.actions,.no-read,.panel-next'))node.remove();BD_FIELD.speak(copy.textContent,$('[data-journey="read"]'));
/* Code by Daniel using ChatGPT November 16, 2026 */
};
 const oldTick=BD_JOURNEY.tick;BD_JOURNEY.tick=function fieldNextTick(){oldTick();if(game.ready)BD_FIELD.updateNext();
/* Code by Daniel using ChatGPT November 16, 2026 */
};
 document.querySelector('.game-frame').insertAdjacentHTML('beforeend','<div id="next-action-strip" class="next-action"><span></span><button data-field="resume" hidden></button></div>');
 document.addEventListener('click',function fieldClick(event){const b=event.target.closest('button');if(!b)return;if(b.dataset.field==='next'){BD_FIELD.advance();return;}if(b.dataset.field==='resume')BD_FIELD.resume();if(b.dataset.readAgain){const site=BD_SITES.find(function match(s){return s.id===b.dataset.readAgain;
/* Code by Daniel using ChatGPT November 16, 2026 */
});if(site){digState(site).wordGame={done:false,replay:true,lamp:5,choices:[]};BD_FIELD.touch(site.id);BD_FIELD.readWord(site);}}if(b.dataset.digAgain){const site=BD_SITES.find(function match(s){return s.id===b.dataset.digAgain;
/* Code by Daniel using ChatGPT November 16, 2026 */
});if(site){BD_FIELD.touch(site.id);BD_DIG.open(site,true);}}
/* Code by Daniel using ChatGPT November 17, 2026 */
});
 if(typeof speechSynthesis!=='undefined')speechSynthesis.addEventListener?.('voiceschanged',BD_FIELD.refreshVoices);
 window.addEventListener('blur',function pauseTools(){BD_DIG.cancel(BD_DIG.active);BD_DIG.cancel(game.flight?.practice);
/* Code by Daniel using ChatGPT November 16, 2026 */
});
 BD_FIELD.bindNextTouch();BD_FIELD.refreshVoices();
/* Code by Daniel using ChatGPT November 17, 2026 */
};
