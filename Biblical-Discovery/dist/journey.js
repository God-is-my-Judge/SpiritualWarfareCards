'use strict';
window.BD_JOURNEY={installed:false,speaking:false,insideCyclist:false,lastRoom:null,bookPages:{'tel-dan':2,nimrud:4,babylon:14,thebes:17,qumran:16,avaris:21,galilee:2,bethesda:4,caesarea:8,delphi:13,oxyrhynchus:18,megiddo:20},codes:['TD01','NI02','BA03','TH04','QU05','AV06','GA07','BE08','CA09','DE10','OX11','ME12']};
BD_JOURNEY.clean=function cleanJourneySave(raw,clean){
 const s=raw.settings||{},allowed=BD_SITES.map(function(site){return site.id;
/* Code by Daniel using ChatGPT November 15, 2026 */
});
 Object.assign(clean.settings,{textSize:[100,120,145].includes(s.textSize)?s.textSize:100,plainFont:!!s.plainFont,highContrast:!!s.highContrast,projector:!!s.projector,explorer:!!s.explorer,focusView:s.focusView!==false});
 clean.explorerName=typeof raw.explorerName==='string'?raw.explorerName.slice(0,32):'';
 clean.metPeople=Array.isArray(raw.metPeople)?raw.metPeople.filter(function(id){return ['rae','marcus','lin','cyclist','docent'].includes(id);
/* Code by Daniel using ChatGPT November 15, 2026 */
}):[];
 clean.museum.endingSeen=!!raw.museum?.endingSeen;clean.openQuestion=!!raw.openQuestion;
 if(raw.session&&allowed.includes(raw.session.site))clean.session={site:raw.session.site,mode:raw.session.mode==='table'?'table':'solo',role:[0,1,2].includes(raw.session.role)?raw.session.role:0,startFinds:Array.isArray(raw.session.startFinds)?raw.session.startFinds.filter(function(id){return allowed.includes(id);
/* Code by Daniel using ChatGPT November 15, 2026 */
}):[]};
 return clean;
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_JOURNEY.name=function explorerName(){return game.save.explorerName||(game.player.kind==='boy'?'Ben':'Jo');
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_JOURNEY.apply=function applyReadingSettings(){
 const s=game.save.settings;document.documentElement.style.setProperty('--reading-scale',String((s.projector?145:s.textSize||100)/100));document.body.classList.toggle('plain-reading',!!s.plainFont||!!s.projector);document.body.classList.toggle('high-contrast',!!s.highContrast);document.body.classList.toggle('projector',!!s.projector);
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_JOURNEY.scripture=function scripturePanel(id){
 const p=BD_SCRIPTURE[id];if(!p)return '';return '<section class="scripture-reading"><p class="eyebrow">READ SCRIPTURE · CSB'+(p.excerpt?' · EXCERPT':'')+'</p><h3>'+escapeHTML(p.reference)+'</h3><blockquote>'+escapeHTML(p.text)+'</blockquote><p>'+escapeHTML(p.context)+'</p><a href="https://www.biblegateway.com/passage/?search='+encodeURIComponent(p.reference)+'&version=CSB" target="_blank" rel="noopener">Read the passage in context ↗</a></section>';
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_JOURNEY.read=function readAloud(){
 if(!('speechSynthesis' in window)){toast('Read-aloud is unavailable in this browser. The text remains selectable.');return;}
 if(BD_JOURNEY.speaking){BD_JOURNEY.stopReading();return;}
 const source=$('#panel-body .reader-text')||$('#panel-body .facts')||$('#panel-body .scripture-reading')||$('#panel-body'),copy=source.cloneNode(true);for(const el of copy.querySelectorAll('button,select,input,textarea,.actions,.no-read'))el.remove();
 const utterance=new SpeechSynthesisUtterance(copy.textContent);utterance.lang='en-US';utterance.rate=.92;utterance.onend=BD_JOURNEY.stopReading;utterance.onerror=BD_JOURNEY.stopReading;BD_JOURNEY.speaking=true;speechSynthesis.speak(utterance);for(const b of document.querySelectorAll('[data-journey="read"]'))b.textContent='Stop reading';
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_JOURNEY.stopReading=function stopReadAloud(){if('speechSynthesis' in window)speechSynthesis.cancel();BD_JOURNEY.speaking=false;for(const b of document.querySelectorAll('[data-journey="read"]'))b.textContent='Read aloud';
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_JOURNEY.panel=function enrichOpenPanel(kind){
 BD_JOURNEY.stopReading();if(!game.save)return;
 const body=$('#panel-body');
 if(kind==='about'&&!body.textContent.includes(BD_SCRIPTURE_CREDIT))body.insertAdjacentHTML('beforeend','<p class="fine-print">'+escapeHTML(BD_SCRIPTURE_CREDIT)+'</p>');
 if(kind==='card'){
  const site=BD_SITES.find(function(s){return s.id===game.currentEvidence;
/* Code by Daniel using ChatGPT November 15, 2026 */
});if(!site)return;
  body.insertAdjacentHTML('afterbegin','<div class="actions card-tools no-read"><button class="button secondary small" data-journey="read">Read aloud</button><button class="button secondary small" data-journey="sources">Sources</button></div>');
  const scripture=body.querySelector('.facts .fact:nth-child(3)');if(scripture)scripture.insertAdjacentHTML('beforeend',BD_JOURNEY.scripture(site.id));
  body.insertAdjacentHTML('beforeend','<div class="actions no-read"><button class="button secondary" data-deep-book="'+site.id+'">Read the longer chapter</button><button class="button secondary" data-leader="'+site.id+'">Leader sheet</button><button class="button secondary" data-session-site="'+site.id+'">Plan a session here</button></div><p class="why-matters"><b>Why it matters:</b> '+escapeHTML(site.why)+'</p>'+BD_JOURNEY.share(site)+'<p class="fine-print">'+escapeHTML(BD_SCRIPTURE_CREDIT)+'</p>');
 }
 if(kind==='crew')body.insertAdjacentHTML('beforeend','<div class="actions"><button class="button secondary" data-journey="hard">Miriam and Elias · Avaris and the hard cases</button><button class="button secondary" data-journey="open-question">Keep Sam’s question for later</button></div>');
 if(kind==='visitor-tour'){const site=BD_SITES.find(function(s){return s.question===body.querySelector('h2')?.textContent;
/* Code by Daniel using ChatGPT November 15, 2026 */
});if(site)body.insertAdjacentHTML('beforeend','<button class="button secondary" data-docent="'+site.id+'">A student takes the docent’s turn</button>');}
 if(kind==='museum-label'){const site=BD_SITES.find(function(s){return s.artifact===body.querySelector('h2')?.textContent;
/* Code by Daniel using ChatGPT November 15, 2026 */
});if(site)body.insertAdjacentHTML('beforeend',BD_JOURNEY.scripture(site.id)+'<button class="button secondary" data-journey="read">Read aloud</button>');}
 if(kind==='reader')body.insertAdjacentHTML('afterbegin','<button class="button secondary small no-read" data-journey="read">Read aloud</button>');
 if(kind==='settings')BD_JOURNEY.settings();
 if(['patient-study','patient-excavation','claim-trays','display-label','rebuild-copies','care-choice','patient-notebook'].includes(kind)&&game.save.session)body.insertAdjacentHTML('beforeend','<div class="actions panel-session"><button class="button secondary small" data-journey="role">Pass the turn →</button><button class="button secondary small" data-journey="closing">Close together</button></div>');
 if(kind==='discovery'&&game.save.session)body.insertAdjacentHTML('beforeend','<button class="button" data-journey="closing">Gather for the closing conversation →</button>');
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_JOURNEY.share=function cardShareCode(site){const i=BD_SITES.indexOf(site),url=(/^https?:$/.test(location.protocol)?location.origin+location.pathname:'https://spiritualwarfarecards.com/Biblical-Discovery/dist/')+'#exhibit='+site.id;return '<div class="share-code no-read"><img src="'+BD_ART.assetURL('assets/code-'+site.id+'.svg')+'" width="96" height="96" alt="QR code opening this exhibit"><div><b>Exhibit '+BD_JOURNEY.codes[i]+'</b><br><a href="'+url+'">'+url+'</a></div></div>';
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_JOURNEY.settings=function readingAndExplorerSettings(){
 const s=game.save.settings;$('#panel-body').insertAdjacentHTML('beforeend','<section class="access-settings"><h3>Reading and exploration</h3><label class="setting-row"><span>Explorer name</span><input id="explorer-name" maxlength="32" value="'+escapeHTML(game.save.explorerName||'')+'" placeholder="'+(game.player.kind==='boy'?'Ben':'Jo')+'"></label><label class="setting-row"><span>Text size</span><select id="text-size">'+[100,120,145].map(function(n){return '<option value="'+n+'" '+((s.textSize||100)===n?'selected':'')+'>'+n+'%</option>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</select></label>'+[['plainFont','Plainer typeface'],['highContrast','High contrast'],['projector','Projector view · larger type'],['explorer','Explorer route · five sections on a new reconstruction, short books'],['focusView','Fill the window when beginning a new visit']].map(function(row){return '<label class="setting-row"><span>'+row[1]+'</span><input type="checkbox" data-journey-setting="'+row[0]+'" '+(s[row[0]]?'checked':'')+'></label>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'<p class="fine-print">An investigation already begun keeps its existing sections.</p><div class="actions"><button class="button secondary" data-journey="session">Leader / group session</button><button class="button secondary" data-journey="scope">Teaching scope</button><button class="button secondary" data-journey="menu">Expedition notebook</button></div></section>');
 $('#explorer-name').addEventListener('input',function(){game.save.explorerName=this.value.slice(0,32);persist();
/* Code by Daniel using ChatGPT November 15, 2026 */
});$('#text-size').addEventListener('change',function(){s.textSize=Number(this.value);BD_JOURNEY.apply();persist();
/* Code by Daniel using ChatGPT November 15, 2026 */
});
 for(const input of document.querySelectorAll('[data-journey-setting]'))input.addEventListener('change',function(){s[this.dataset.journeySetting]=this.checked;if(this.dataset.journeySetting==='explorer'&&this.checked)game.save.edition='short';BD_JOURNEY.apply();persist();
/* Code by Daniel using ChatGPT November 15, 2026 */
});
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_JOURNEY.menu=function expeditionNotebook(){openPanel('YOUR EXPEDITION NOTEBOOK','<h2>Where shall we turn next?</h2><div class="settings-grid">'+[['passport','Expedition passport'],['journal','My journal'],['skills','Field skills'],['session','Leader / group session'],['scope','Teaching scope'],['timeline','Print the history timeline'],['hard','The sea-window bench · hard questions'],['psalm','A psalm by the table']].map(function(row){return '<button class="site-row" data-journey="'+row[0]+'">'+row[1]+' →</button>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</div><div class="actions"><button class="button secondary" data-action="library">Library</button><button class="button secondary" data-action="gospel">The Christian hope</button></div>','journey-menu');
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_JOURNEY.passport=function expeditionPassport(){
 openPanel('EXPEDITION PASSPORT','<h2>Places you have been.</h2><p class="lede">Every stamp keeps a place in your story.</p><div class="passport-grid">'+BD_SITES.map(function(s,i){const done=!!game.save.finds[s.id],visited=game.save.visitedSites.includes(s.id);return '<button class="passport-stamp '+(done?'found':visited?'visited':'')+'" '+(done?'data-card':'data-fly')+'="'+s.id+'"><span>'+BD_JOURNEY.codes[i]+'</span><b>'+s.place+'</b><small>'+s.country+'</small><em>'+(done?'FOUND ✓':visited?'VISITED ◇':'AWAITING A VISIT')+'</em></button>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</div>','passport');
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_JOURNEY.date=function journalDate(date){const d=new Date(date);return Number.isFinite(d.getTime())?new Intl.DateTimeFormat('en-US',{dateStyle:'medium',timeZone:'America/Los_Angeles'}).format(d):'From your collection';
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_JOURNEY.journal=function paintedFieldJournal(){
 const found=BD_SITES.filter(function(s){return game.save.finds[s.id];
/* Code by Daniel using ChatGPT November 15, 2026 */
});openPanel('MY FIELD JOURNAL','<h2>'+escapeHTML(BD_JOURNEY.name())+'’s field journal.</h2><p class="lede">Things I found. Things I noticed. Questions I am still carrying.</p><div class="actions"><button class="button" data-journey="passport">My passport</button><button class="button secondary" data-action="family-tour">Give a tour</button><button class="button secondary" data-action="export-collection">Download collection</button></div><div class="notebook-pages">'+(found.length?found.map(function(s){const note=game.save.digs[s.id]?.patient?.note||'';return '<article class="notebook-leaf"><img src="'+BD_ART.assetURL('assets/find-'+(s.art===6?'6-v2':s.art)+'.webp')+'" alt="Sketch of '+escapeHTML(s.artifact)+'"><p class="eyebrow">'+BD_JOURNEY.date(game.save.finds[s.id].date)+'</p><h3>'+escapeHTML(s.artifact)+'</h3><p>'+escapeHTML(s.place)+'</p><blockquote>'+escapeHTML(note||'An observation is still waiting to be written.')+'</blockquote><button class="button secondary small" data-label-edit="'+s.id+'">Write my label</button><button class="button secondary small" data-card="'+s.id+'">Read the case</button></article>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join(''):'<p>Your first page is waiting. <button class="button" data-action="atlas">Choose an expedition</button></p>')+'</div>','journal');
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_JOURNEY.editLabel=function writeOwnLabel(id){const site=BD_SITES.find(function(s){return s.id===id;
/* Code by Daniel using ChatGPT November 15, 2026 */
});if(!site)return;const saved=BD_STUDY.state(site);openPanel('MY DISPLAY LABEL','<h2>'+escapeHTML(site.artifact)+'</h2><p>What would you tell someone who stops at this case?</p><textarea id="own-label" rows="4" maxlength="280">'+escapeHTML(saved.note||'')+'</textarea><p class="fine-print">Only you can see this.</p><div class="actions"><button class="button" id="save-own-label">Keep my label</button><button class="button secondary" data-card="'+id+'">Read the official label</button></div>','own-label');$('#save-own-label').addEventListener('click',function(){saved.note=$('#own-label').value.slice(0,280);persist();BD_JOURNEY.journal();
/* Code by Daniel using ChatGPT November 15, 2026 */
});
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_JOURNEY.skills=function learnedFieldMethods(){
 const methods=[['Recording a find',function(s,d){return d.recorded;
/* Code by Daniel using ChatGPT November 15, 2026 */
}],['Careful uncovering',function(s,d){return d.cleared.length>=100;
/* Code by Daniel using ChatGPT November 15, 2026 */
}],['Joining and orienting',function(s,d){return BD_ENCOUNTERS[s.id].kind==='reconstruct'&&d.patient?.studyDone;
/* Code by Daniel using ChatGPT November 15, 2026 */
}],['Raking light',function(s,d){return BD_ENCOUNTERS[s.id].kind==='light'&&d.patient?.studyDone;
/* Code by Daniel using ChatGPT November 15, 2026 */
}],['Comparing written copies',function(s,d){return BD_ENCOUNTERS[s.id].kind==='collate'&&d.patient?.copiesCompared;
/* Code by Daniel using ChatGPT November 15, 2026 */
}],['Supporting fragile material',function(s,d){return d.patient?.tagged&&d.patient?.supports?.length===3;
/* Code by Daniel using ChatGPT November 15, 2026 */
}],['Sorting and explaining claims',function(s,d){return d.patient?.claims?.length===4;
/* Code by Daniel using ChatGPT November 15, 2026 */
}]];
 openPanel('FIELD SKILLS','<h2>Methods you have practiced.</h2><p class="lede">Different materials ask different questions of our hands and eyes.</p><div class="settings-grid">'+methods.map(function(m){const sites=BD_SITES.filter(function(s){return game.save.digs[s.id]&&m[1](s,game.save.digs[s.id]);
/* Code by Daniel using ChatGPT November 15, 2026 */
});return '<article class="note-block"><h3>'+m[0]+'</h3><p>'+(sites.length?'Practiced at '+sites.map(function(s){return s.place;
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join(', '):'Waiting for a field visit')+'</p></article>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</div><p class="note-block">At a tel, lower undisturbed layers are generally older. Later pits cut through those relationships. Try the section model in the Old Testament gallery.</p>','skills');
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_JOURNEY.scope=function teachingScope(){openPanel('FOR LEADERS AND FAMILIES','<div class="print-sheet"><h2>A museum, twelve investigations.</h2><p><b>Period:</b> Egypt’s second millennium BC through the third-century church. <b>Bible:</b> Genesis, Judges, Samuel, Kings, Ezra and Isaiah; the Gospels, Acts and the letters.</p><p><b>Practice:</b> record context; handle and preserve; compare names, dates and written copies; distinguish an object, its maker’s claim, an inference and a Scripture connection; explain a claim with care.</p><p><b>A fifteen-minute visit:</b> 2 minutes locating the place and hearing its discovery; 5 handling and observing; 3 explaining the evidence; 5 reading Scripture and discussing. These are suggested proportions, not a timer.</p><p><b>A longer visit:</b> add the related model, history gallery and longer archaeology chapter.</p><p>The Old Testament is also the Scriptures of Israel. We credit Jewish and Israeli finders alongside their colleagues and read the accounts with respect for the Jewish people.</p><p><b>Christian purpose:</b> learn to look closely and speak truthfully about the Bible’s world. Historical evidence confirms and answers questions; God’s Word is the foundation.</p><button class="button" data-action="print">Print this page</button></div>','scope');
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_JOURNEY.questions=function discussionQuestions(site){return ['What physical detail can you point to on '+site.artifact+'?',site.question,'Read '+BD_SCRIPTURE[site.id].reference+'. What connection can you explain, and what will you say carefully?'];
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_JOURNEY.session=function leaderSession(id){
 const saved=game.save.session,site=BD_SITES.find(function(s){return s.id===(id||saved?.site);
/* Code by Daniel using ChatGPT November 15, 2026 */
})||BD_SITES[0];
 openPanel('LEADER / TABLE SESSION','<h2>One place. A conversation together.</h2><label class="setting-row"><span>Choose the investigation</span><select id="session-site">'+BD_SITES.map(function(s){return '<option value="'+s.id+'" '+(s.id===site.id?'selected':'')+'>'+s.place+' · '+s.artifact+'</option>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</select></label><div class="session-path"><p><b>1 · Find (2 min).</b> Locate the place. Predict what its object might tell us.</p><p><b>2 · Handle (5 min).</b> Uncover, observe and preserve. The Explorer route uses fewer sections on a new reconstruction.</p><p><b>3 · Explain (3 min).</b> Build the label and choose what to say carefully.</p><p><b>4 · Read and discuss (5 min).</b> Read the passage, then let one student take the docent’s turn.</p></div><div class="actions"><button class="button" id="start-session">Begin the session</button><button class="button secondary" id="start-table">Three students · table mode</button><button class="button secondary" data-leader="'+site.id+'">Print leader sheet</button><button class="button secondary" data-journey="closing">Closing conversation</button>'+ (saved?'<button class="button secondary" data-journey="next-group">Start the next group</button>':'')+'</div><h3>Three discussion questions</h3><ol>'+BD_JOURNEY.questions(site).map(function(q){return '<li>'+escapeHTML(q)+'</li>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</ol>','session');
 $('#session-site').addEventListener('change',function(){BD_JOURNEY.session(this.value);
/* Code by Daniel using ChatGPT November 15, 2026 */
});for(const [id,mode]of [['start-session','solo'],['start-table','table']])$('#'+id).addEventListener('click',function(){const previous=game.save.session?.previous||{explorer:!!game.save.settings.explorer,edition:game.save.edition};game.save.session={site:site.id,mode,role:0,startFinds:Object.keys(game.save.finds),previous};game.save.settings.explorer=true;game.save.edition='short';persist();showBriefing(site);
/* Code by Daniel using ChatGPT November 16, 2026 */
});
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_JOURNEY.leader=function printableLeaderSheet(id){const site=BD_SITES.find(function(s){return s.id===id;
/* Code by Daniel using ChatGPT November 15, 2026 */
});if(!site)return;openPanel('PRINTABLE LEADER SHEET','<article class="print-sheet"><h2>'+escapeHTML(site.artifact)+'</h2><p>'+escapeHTML(site.place)+' · '+escapeHTML(site.date)+'</p><p><b>The claim:</b> '+escapeHTML(site.inference)+'</p><p><b>Fair to say:</b> '+escapeHTML(site.limit)+'</p><h3>'+escapeHTML(site.question)+'</h3><p>'+escapeHTML(site.answer)+'</p>'+BD_JOURNEY.scripture(site.id)+'<h3>Discuss together</h3><ol>'+BD_JOURNEY.questions(site).map(function(q){return '<li>'+escapeHTML(q)+'</li>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</ol><p><b>Fifteen-minute route:</b> Locate 2 · Handle 5 · Explain 3 · Read/discuss 5 minutes.</p><p class="fine-print">'+escapeHTML(BD_SCRIPTURE_CREDIT)+'</p><a href="'+site.source[1]+'">Source: '+escapeHTML(site.source[0])+'</a>'+BD_JOURNEY.share(site)+'<button class="button" data-action="print">Print leader sheet</button></article>','leader-sheet');
/* Code by Daniel using ChatGPT November 20, 2026 */
};
BD_JOURNEY.nextGroup=function freshGroupConfirmation(){const session=game.save.session;if(!session){BD_JOURNEY.session();return;}openPanel('THE NEXT GROUP','<h2>A fresh investigation, the same museum.</h2><p>This clears the field work and personal note for this session’s site. Your museum collection stays. Export first if you want to keep that group’s field work.</p><div class="actions"><button class="button secondary" data-action="export-progress">Export progress</button><button class="button" id="confirm-next-group">Begin fresh field work</button><button class="button secondary" data-journey="session">Keep this group</button></div>','next-group');$('#confirm-next-group').addEventListener('click',function(){delete game.save.digs[session.site];session.role=0;session.startFinds=Object.keys(game.save.finds);persist();showBriefing(BD_SITES.find(function(s){return s.id===session.site;
/* Code by Daniel using ChatGPT November 15, 2026 */
}));
/* Code by Daniel using ChatGPT November 15, 2026 */
});
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_JOURNEY.role=function nextTableRole(){const s=game.save.session;if(!s)return;s.role=(s.role+1)%3;persist();toast(['Finder · handle and describe the surface.','Reader · read the passage and compare the claim.','Docent · explain what you found to the others.'][s.role]);BD_JOURNEY.refreshSession();
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_JOURNEY.refreshSession=function tableRoleBar(){const bar=$('#session-bar'),s=game.save.session;if(!bar)return;bar.hidden=!s;if(!s)return;bar.innerHTML='<span>'+ (s.mode==='table'?['Finder','Reader','Docent'][s.role]+'’s turn':'A visit to '+BD_SITES.find(function(site){return site.id===s.site;
/* Code by Daniel using ChatGPT November 15, 2026 */
}).place)+'</span><button data-journey="role">Pass the turn →</button><button data-journey="closing">Close together</button><button data-journey="session">Session plan</button>';
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_JOURNEY.closing=function closingConversation(){const session=game.save.session,site=BD_SITES.find(function(s){return s.id===session?.site;
/* Code by Daniel using ChatGPT November 15, 2026 */
})||BD_SITES.find(function(s){return game.save.finds[s.id];
/* Code by Daniel using ChatGPT November 15, 2026 */
})||BD_SITES[0],found=BD_SITES.filter(function(s){return game.save.finds[s.id]&&(!session||!session.startFinds.includes(s.id));
/* Code by Daniel using ChatGPT November 15, 2026 */
});openPanel('OUR VISIT TOGETHER','<h2>What will you tell someone?</h2><p class="lede">'+(found.length?'Today’s discoveries: '+found.map(function(s){return s.artifact;
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join(', '):'Today we looked closely, asked questions and read together.')+'</p>'+BD_JOURNEY.scripture(site.id)+'<h3>Let a student be the docent.</h3><p>Name one thing you saw, one connection you can explain, and one thing to say carefully.</p><button class="button" data-docent="'+site.id+'">Take the docent’s turn</button><div class="actions"><button class="button secondary" data-journey="next-group">Next group</button><button class="button secondary" data-journey="end-session">Return to free exploration</button></div>','closing');
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_JOURNEY.docent=function studentDocent(id){const site=BD_SITES.find(function(s){return s.id===id;
/* Code by Daniel using ChatGPT November 15, 2026 */
});if(!site)return;openPanel('THE DOCENT’S TURN','<h2>'+escapeHTML(site.artifact)+'</h2><p class="lede">'+escapeHTML(site.question)+'</p>'+BD_JOURNEY.scripture(site.id)+'<p class="claim-slip">'+escapeHTML(game.save.digs[id]?.patient?.note||'Point to the object. Explain what it supports. Name one thing to say carefully.')+'</p><details class="note-block"><summary>Compare with the museum label</summary><p>'+escapeHTML(site.inference)+'</p><p>'+escapeHTML(site.limit)+'</p><p class="finding-ending">'+escapeHTML(site.takeaway)+'</p></details><div class="actions"><button class="button secondary" data-action="family-tour">Continue the tour</button><button class="button secondary" data-journey="closing">Close together</button></div>','student-docent');
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_JOURNEY.timeline=function printableTimeline(){openPanel('THE ACCOUNTS · TIMELINE','<h2>A strip through the Bible’s world.</h2><div class="timeline-strip">'+[['2000–1200 BC','Patriarchs, Egypt, Exodus and the land','Genesis–Joshua'],['1200–586 BC','Judges and kingdoms','Judges–Kings'],['586–100 BC','Exile, return and copied Scriptures','Ezra · Isaiah manuscripts'],['1st century AD','The life, death and resurrection of Jesus','The Gospels'],['AD 30–100','The apostles and churches on the road','Acts · Letters'],['AD 100–300','Copies, communities and worship','Oxyrhynchus · Megiddo']].map(function(row){return '<article><b>'+row[0]+'</b><h3>'+row[1]+'</h3><p>'+row[2]+'</p></article>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</div><p>Broad periods for orientation. The upstairs gallery follows the story in more detail.</p><button class="button" data-action="print">Print the strip</button>','timeline');
/* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_JOURNEY.hard=function seaWindowQuestions(){openPanel('THE BENCH BY THE SEA','<h2>A hard question can stay open.</h2><p class="lede">Sam: “If the Exodus happened, why is there so much argument about its archaeology? And what about Jericho?”</p><p>Miriam: “We have no excavated inscription that names Moses or directly records the Exodus. That is a real gap. Mobile camps leave less than a city; dates, routes and what we should expect to survive are all part of the argument.”</p><p>Elias: “At Jericho, many excavators date the major burnt Bronze Age city to about 1550 BC, earlier than common biblical conquest dates. Some Christian archaeologists challenge that dating. Later occupation and erosion complicate the comparison, but they do not give us an agreed identification of Joshua’s destruction.”</p><p>Miriam: “I trust God’s Word. That does not require pretending we have found every place or settled every date. Let us compare the strongest case on each side.”</p><details class="note-block"><summary>Avaris: hear both voices</summary><p>Miriam: “The house, residence, tombs and foreign official make a striking setting for Joseph’s story.”</p><p>Elias: “I agree about the setting. I do not yet see a secure name or date that identifies that official as Joseph. Let us keep the cultural evidence and the proposed identification distinct.”</p></details><div class="actions"><button class="button secondary" data-book="old-r">Read the longer arguments</button><button class="button secondary" data-journey="open-question">Keep Sam’s question for later</button></div><a class="source-link" href="https://www.lasapienzatojericho.it/files/biblioteca/jericho/nigro%202020_jericho%20ucl_diggin%20up%20jerichor.pdf" target="_blank" rel="noopener">Jericho excavation: occupation and dating ↗</a><a class="source-link" href="https://biblearchaeology.org/research/conquest-of-canaan" target="_blank" rel="noopener">A Christian early-date case ↗</a>','hard-questions');
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_JOURNEY.psalm=function psalmByTheTable(){openPanel('BY THE TABLE','<h2>Stay as long as you like.</h2><p class="lede">You have walked from Egypt to this table. The people were real, and so were the places. The one they gathered here to worship is alive.</p>'+BD_JOURNEY.scripture('psalm')+'<button class="button secondary" data-journey="read">Read aloud</button>','psalm');
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_JOURNEY.tacitus=function romanWitness(){openPanel('A ROMAN HISTORIAN','<h2>Tacitus remembers the execution.</h2><p class="lede">Writing early in the second century, Tacitus traces the name “Christian” to Christus, executed under Pontius Pilate during Tiberius’s reign.</p><p>This is a Roman writer hostile to Christianity. In <i>Annals</i> 15.44 he describes Nero’s persecution and names the governor connected with Christ’s death. The passage is later than the event; its description can be compared with the Gospels and Pilate’s own dedication.</p><a class="source-link" href="https://dcc.dickinson.edu/tacitus-annals/15-44" target="_blank" rel="noopener">Read the Latin text and scholarly commentary ↗</a><button class="button secondary" data-card="caesarea">Compare Pilate’s stone</button>','tacitus');
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_JOURNEY.action=function journeyAction(name){
 const actions={menu:BD_JOURNEY.menu,passport:BD_JOURNEY.passport,journal:BD_JOURNEY.journal,skills:BD_JOURNEY.skills,scope:BD_JOURNEY.scope,session:BD_JOURNEY.session,closing:BD_JOURNEY.closing,role:BD_JOURNEY.role,read:BD_JOURNEY.read,'next-group':BD_JOURNEY.nextGroup,timeline:BD_JOURNEY.timeline,hard:BD_JOURNEY.hard,psalm:BD_JOURNEY.psalm,tacitus:BD_JOURNEY.tacitus,sources:BD_JOURNEY.sources,'open-question':function(){game.save.openQuestion=true;persist();closePanel();toast('Sam is still thinking about the Exodus and Jericho. Return to the sea-window bench whenever you like.');
/* Code by Daniel using ChatGPT November 15, 2026 */
},'end-session':function(){BD_FIELD.endSession();
/* Code by Daniel using ChatGPT November 16, 2026 */
}};if(actions[name])actions[name]();
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_JOURNEY.configure=function configureExpandedMuseum(){
 BD_MUSEUM.rooms.garden={title:'The Garden',width:1536,height:1024,images:['garden'],floor:660,group:'garden'};
 const oldHotspots=BD_MUSEUM.hotspots;BD_MUSEUM.hotspots=function journeyPlaces(){const spots=oldHotspots();
  if(BD_MUSEUM.room==='entry')spots.push({id:'sea-bench',x:140,y:745,label:'The sea-window bench · hard questions',icon:'?',point:nearestFree(140,915),action:BD_JOURNEY.hard});
  if(BD_MUSEUM.room==='nt')spots.push({id:'tacitus',x:3040,y:630,label:'Tacitus · a Roman witness',icon:'▤',point:nearestFree(2920,930),action:BD_JOURNEY.tacitus});
  if(BD_MUSEUM.room==='story')spots.push({id:'timeline-print',x:1140,y:850,label:'Take the timeline home',icon:'▤',point:nearestFree(1140,950),action:BD_JOURNEY.timeline});
  if(BD_MUSEUM.room==='garden'){spots.push({id:'garden-return',x:80,y:725,label:'Return to the Table Room',icon:'←',point:nearestFree(110,940),action:function(){BD_MUSEUM.begin('table');
/* Code by Daniel using ChatGPT November 15, 2026 */
}},{id:'garden-gospel',x:1250,y:660,label:'The Christian hope',icon:'▤',point:nearestFree(1250,970),action:showGospel});}
  const door=spots.find(function(s){return s.id==='garden';
/* Code by Daniel using ChatGPT November 15, 2026 */
});if(door){door.label=Object.keys(game.save.finds).length===12?'The garden door is open':'A psalm by the garden';door.action=Object.keys(game.save.finds).length===12?function(){BD_MUSEUM.begin('garden',{arrival:[750,960]});
/* Code by Daniel using ChatGPT November 15, 2026 */
}:BD_JOURNEY.psalm;}
  return spots;
/* Code by Daniel using ChatGPT November 15, 2026 */
};
 const oldGeometry=BD_MUSEUM.geometry;BD_MUSEUM.geometry=function journeyGeometry(){const geo=oldGeometry();if(BD_MUSEUM.room==='entry')geo.obstacles.push([55,765,230,815]);return geo;
/* Code by Daniel using ChatGPT November 15, 2026 */
};
 const oldActors=BD_PEOPLE.actors;BD_PEOPLE.actors=function peopleAndCyclist(){
  if(BD_MUSEUM.room==='garden')return [{id:'docent',name:'Mara',art:'docent',adult:true,p:[410,840],pose:0,focus:'welcome'},{id:'cyclist',name:'Alex',art:'cyclist',adult:true,p:[1170,880],pose:0,focus:'welcome'},...BD_PEOPLE.identities.map(function(v,i){return {...v,p:[[210,890],[1040,785],[1360,770]][i],pose:0,focus:'garden'};
/* Code by Daniel using ChatGPT November 15, 2026 */
})];
  const actors=oldActors(),met=game.save.metPeople?.includes('cyclist'),enough=Object.keys(game.save.finds).length>=4,quiet=BD_PEOPLE.visitors.filter(function(v){return v.room==='entry';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).length<2;
  if(met&&enough&&BD_JOURNEY.insideCyclist&&quiet){if(BD_MUSEUM.room==='front')return actors.filter(function(a){return a.id!=='cyclist';
/* Code by Daniel using ChatGPT November 15, 2026 */
});if(BD_MUSEUM.room==='entry')actors.push({id:'cyclist',name:'Alex',art:'cyclist',adult:true,p:[920,760],pose:0,focus:'question'});}
  return actors;

/* Code by Daniel using ChatGPT November 16, 2026 */
};
 const oldPeopleHotspots=BD_PEOPLE.hotspots;BD_PEOPLE.hotspots=function familiarVisitors(){const spots=oldPeopleHotspots();for(const s of spots){const id=s.id.slice(7);if(id==='cyclist'&&game.save.metPeople?.includes(id))s.label='Alex · a question to follow';else if(['rae','marcus','lin'].includes(id)&&!game.save.metPeople?.includes(id))s.label='A visitor has a question';}return spots;
/* Code by Daniel using ChatGPT November 15, 2026 */
};
 const oldConversation=BD_PEOPLE.conversation;BD_PEOPLE.conversation=function meetMuseumVisitor(actor){
  game.save.metPeople=game.save.metPeople||[];const first=!game.save.metPeople.includes(actor.id);if(first)game.save.metPeople.push(actor.id);persist();
  if(actor.id==='cyclist'){openPanel('ALEX · THE CYCLIST','<h2>A name on a stone. Then what?</h2><p class="lede">'+(first?'“I’m Alex. I came to check that governor’s inscription.”':'“I checked the names and the dates. I’m still thinking.”')+'</p><p>“Pilate existed. Fine. How do you get from a governor’s name to Jesus rising from the dead?”</p><p>Mara: “That takes more than one stone. Read the witnesses to Jesus’s life and resurrection, and ask what explains them. We can look at those accounts together.”</p><div class="actions"><button class="button" data-book="new-r">Read the case together</button><button class="button secondary" data-card="caesarea">Begin with Pilate</button><button class="button secondary" data-journey="open-question">Keep thinking</button></div>','cyclist');return;}
  oldConversation(actor);const body=$('#panel-body');if(first&&actor.id!=='docent')body.insertAdjacentHTML('afterbegin','<p class="eyebrow">“I’m '+escapeHTML(actor.name)+'. Nice to meet you.”</p>');
  const focus=actor.focus?.startsWith('find:')?actor.focus.slice(5):({jerusalem:'bethesda',qumran:'qumran',lake:'galilee'}[actor.focus?.slice(6)]||null),note=focus?game.save.digs[focus]?.patient?.note:null;if(note)body.insertAdjacentHTML('beforeend','<div class="note-block"><strong>I read your label:</strong><p>'+escapeHTML(note)+'</p></div>');
/* Code by Daniel using ChatGPT November 15, 2026 */
};

/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_JOURNEY.install=function installJourney(){
 if(BD_JOURNEY.installed)return;BD_JOURNEY.installed=true;BD_JOURNEY.configure();
 const oldModelOpen=BD_MODELS.open;BD_MODELS.open=function namedPeriodBands(key){oldModelOpen(key);if(key==='tel')$('#panel-body').insertAdjacentHTML('beforeend','<h3>Comparison bands · earliest to latest</h3><ol>'+['avaris','thebes','tel-dan','nimrud','babylon','qumran'].map(function(id){const site=BD_SITES.find(function(s){return s.id===id;
/* Code by Daniel using ChatGPT November 15, 2026 */
});return '<li><button data-card="'+id+'">'+site.place+' · '+site.date+'</button></li>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</ol>');
/* Code by Daniel using ChatGPT November 15, 2026 */
};
 const oldStudy=BD_STUDY.open,counts=Object.fromEntries(Object.entries(BD_ENCOUNTERS).map(function(e){return [e[0],e[1].count];
/* Code by Daniel using ChatGPT November 15, 2026 */
}));BD_STUDY.open=function explorerStudy(site){const cfg=BD_ENCOUNTERS[site.id],saved=BD_STUDY.state(site);if(cfg.kind==='reconstruct')cfg.count=saved.pieces.length||((game.save.settings.explorer)?5:counts[site.id]);oldStudy(site);
/* Code by Daniel using ChatGPT November 15, 2026 */
};
 showJournal=BD_JOURNEY.journal;
 document.addEventListener('click',function journeyClick(event){const b=event.target.closest('button');if(!b)return;const d=b.dataset;
  if(d.journey)BD_JOURNEY.action(d.journey);
  if(d.deepBook){const site=BD_SITES.find(function(s){return s.id===d.deepBook;
/* Code by Daniel using ChatGPT November 15, 2026 */
});game.save.edition='long';showBook(site.hall==='ot'?'old-a':'new-a',BD_JOURNEY.bookPages[site.id]);}
  if(d.leader)BD_JOURNEY.leader(d.leader);if(d.sessionSite)BD_JOURNEY.session(d.sessionSite);if(d.docent)BD_JOURNEY.docent(d.docent);if(d.labelEdit)BD_JOURNEY.editLabel(d.labelEdit);
/* Code by Daniel using ChatGPT November 15, 2026 */
});
 const frame=document.querySelector('.game-frame');frame.insertAdjacentHTML('beforeend','<section id="garden-reading" hidden aria-label="A welcome in the garden"></section><section id="session-bar" hidden aria-label="Group session"></section><div class="thumb-bar"><button data-action="guide">Scene guide</button><button data-action="interact">Investigate</button><button data-action="atlas">Atlas</button><button data-action="journal">Journal</button><button data-journey="menu">Notebook</button><button data-action="settings">Settings</button></div>');
 const back=document.createElement('button');back.className='mobile-dialog-back';back.textContent='Close / back';back.addEventListener('click',closePanel);$('#panel').append(back);
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_JOURNEY.boot=function journeyAtBoot(){
 BD_JOURNEY.apply();BD_JOURNEY.refreshSession();if(game.save.welcomed&&game.save.settings.focusView!==false)document.body.classList.add('full-window');
 const hash=new URLSearchParams(location.hash.slice(1)),id=hash.get('exhibit')||BD_SITES[BD_JOURNEY.codes.indexOf((hash.get('code')||'').toUpperCase())]?.id,site=BD_SITES.find(function(s){return s.id===id;
/* Code by Daniel using ChatGPT November 15, 2026 */
});
 if(site){showCard(site);return true;}return false;
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_JOURNEY.begin=function beginFocusedVisit(){if(game.save.settings.focusView!==false)document.body.classList.add('full-window');if(game.save.settings.sound)setSound(true);positionHotspots();
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_JOURNEY.tick=function quietJourneyState(){
 if(!game.ready)return;const target=Object.keys(game.save.finds).length===12?1:0,oldGate=BD_JOURNEY.gateAmount??0;BD_JOURNEY.gateAmount=game.save.settings.reduced?target:oldGate+(target-oldGate)*.045;if(Math.abs(target-BD_JOURNEY.gateAmount)>.002&&BD_MUSEUM.room==='table')game.dirty=true;
 const room=game.scene==='museum'?BD_MUSEUM.room:null;
 if(room!==BD_JOURNEY.lastRoom){const old=BD_JOURNEY.lastRoom;if(!['entry','front'].includes(old)&&!['entry','front'].includes(room))BD_JOURNEY.insideCyclist=!BD_JOURNEY.insideCyclist;BD_JOURNEY.lastRoom=room;
  const reading=$('#garden-reading');reading.hidden=room!=='garden';if(room==='garden'){game.save.museum.endingSeen=true;game.save.metPeople=['rae','marcus','lin','cyclist','docent'];persist();reading.innerHTML='<p class="eyebrow">MARA · “THANK YOU, '+escapeHTML(BD_JOURNEY.name().toUpperCase())+'.”</p><p>You have given these stories a place in our museum. Rae, Marcus, Mrs. Lin and Alex are here to welcome you.</p><p><b>Miriam:</b> Jesus Christ died for sinners and rose from the dead. <b>Elias:</b> Forgiveness and new life are his gift, received by grace through faith.</p><blockquote>'+escapeHTML(BD_SCRIPTURE.ending.text)+'</blockquote><p><b>Sam:</b> I’ve parked the plane. Stay as long as you like.</p><p class="fine-print">'+BD_SCRIPTURE.ending.reference+' · CSB</p>';}
 }
 const sessionKey=JSON.stringify(game.save.session||null);if(sessionKey!==BD_JOURNEY.sessionKey){BD_JOURNEY.sessionKey=sessionKey;BD_JOURNEY.refreshSession();}
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_JOURNEY.placed=function allFindsPlaced(){if(Object.keys(game.save.finds).length===12&&!game.save.museum.endingSeen){toast('The brass line is lit. Mara and the others are waiting beyond the Table Room’s garden door.');makeHotspots();}
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_JOURNEY.caseCaption=function museumCaption(site){return site.artifact.replace(/^The /,'')+' · '+site.place+' · '+(site.id==='nimrud'?'841 BC':site.date.split(' · ')[0]);
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_JOURNEY.sources=function focusedSources(){const site=BD_SITES.find(function(s){return s.id===game.currentEvidence;
/* Code by Daniel using ChatGPT November 15, 2026 */
});if(!site)return;openPanel('SOURCES','<h2>'+escapeHTML(site.artifact)+'</h2><a class="source-link" href="'+site.source[1]+'" target="_blank" rel="noopener">'+escapeHTML(site.source[0])+' ↗</a><a class="source-link" href="'+site.source2[1]+'" target="_blank" rel="noopener">'+escapeHTML(site.source2[0])+' ↗</a><button class="button secondary" data-deep-book="'+site.id+'">Read the longer chapter</button><button class="button" data-card="'+site.id+'">Return to the evidence card</button>','sources');
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_JOURNEY.labelOnCase=function personalCaseLabel(c,site,p,labelY){const note=game.save.digs[site.id]?.patient?.note;if(!note)return;c.fillStyle='#ede0ba';c.fillRect(p.x-140,labelY+24,280,27);c.fillStyle='#294537';c.font='12px Georgia';c.textAlign='center';const line=note.length>46?note.slice(0,45)+'…':note;c.fillText(line,p.x,labelY+42,265);
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_JOURNEY.gate=function openingGardenGate(c){
 const open=BD_JOURNEY.gateAmount||0;if(open>.998)return;const width=102*(1-open);c.save();if(!game.save.finds.megiddo)c.filter='brightness(.6)';
 for(let side=0;side<2;side++){
  const left=side?204-width:0,right=left+width,ty=function top(u){return 233-u/204*88;
/* Code by Daniel using ChatGPT November 15, 2026 */
},by=function bottom(u){return 670+u/204*65;
/* Code by Daniel using ChatGPT November 15, 2026 */
},wood=c.createLinearGradient(1332+left,0,1332+right,0);
  wood.addColorStop(0,'#503a23');wood.addColorStop(.5,'#b18a4f');wood.addColorStop(1,'#6b4a26');c.fillStyle=wood;c.strokeStyle='#d3b476';c.lineWidth=2;c.beginPath();c.moveTo(1332+left,ty(left));c.lineTo(1332+right,ty(right));c.lineTo(1332+right,by(right));c.lineTo(1332+left,by(left));c.closePath();c.fill();c.stroke();
  c.strokeStyle='#503b2a77';for(let n=1;n<5;n++){const x=left+width*n/5;c.beginPath();c.moveTo(1332+x,ty(x)+4);c.lineTo(1332+x,by(x)-4);c.stroke();}
  const handle=side?left+width*.12:left+width*.88;c.fillStyle='#dfbf72';c.fillRect(1332+handle,440,4,44);
 }c.restore();
/* Code by Daniel using ChatGPT November 15, 2026 */
};
