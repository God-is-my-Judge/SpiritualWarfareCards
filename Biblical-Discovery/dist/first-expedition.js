'use strict';
// A suggested first expedition; the museum and its books always stay open.
window.BD_OPEN={card:null,lastDevice:null};
BD_OPEN.state=function firstExpeditionState(){return game.save.firstExpedition||(game.save.firstExpedition={active:false,introduced:false,complete:false,said:[]});
/* Code by Daniel using ChatGPT November 18, 2026 */
};
BD_OPEN.clean=function preserveFirstExpedition(raw,clean){const s=raw.firstExpedition||{};clean.firstExpedition={active:!!s.active,introduced:!!s.introduced,complete:!!s.complete,said:Array.isArray(s.said)?[...new Set(s.said.filter(id=>{return BD_SITES.some(site=>{return site.id===id;
/* Code by Daniel using ChatGPT November 18, 2026 */
});
/* Code by Daniel using ChatGPT November 18, 2026 */
}))]:[]};return clean;
/* Code by Daniel using ChatGPT November 18, 2026 */
};
BD_OPEN.mara=function meetTheMuseumDocent(){const s=BD_OPEN.state();s.introduced=true;persist();openPanel('MARA · MUSEUM DOCENT','<div class="first-mentor"><div><p class="eyebrow">YOUR FIRST EXPEDITION</p><h2>Let’s bring one find home.</h2><p>Mara: “I look after the museum. Miriam is our field supervisor.”</p><p>“At Tel Dan, you’ll uncover a stone naming the House of David.”</p></div></div><div class="actions"><button class="button" data-first="fly">Fly to Tel Dan →</button><button class="button secondary" data-first="free">I’ll explore first</button></div>','first-expedition');
/* Code by Daniel using ChatGPT November 18, 2026 */
};
BD_OPEN.next=function suggestedFirstStep(){const s=BD_OPEN.state();if(!s.active||s.complete)return null;if(game.save.finds['tel-dan'])return {line:'Bring the Tel Dan find to its display.',action:()=>{return visitDisplay(BD_SITES[0]);
/* Code by Daniel using ChatGPT November 18, 2026 */
}};if(game.scene==='museum'&&BD_MUSEUM.room==='front')return {line:'Meet Mara inside.',hotspot:'front-door'};if(game.scene==='museum')return {line:s.introduced?'Fly to Tel Dan with Miriam.':'Meet Mara, the museum docent.',action:BD_OPEN.mara};if(game.scene==='site'&&game.site?.id==='tel-dan')return {line:'Record, uncover and read the Tel Dan stone.',action:()=>{return openDig(game.site);
/* Code by Daniel using ChatGPT November 18, 2026 */
}};return {line:'Your first expedition: Tel Dan.',action:()=>{return showBriefing(BD_SITES[0]);
/* Code by Daniel using ChatGPT November 18, 2026 */
}};
/* Code by Daniel using ChatGPT November 18, 2026 */
};
BD_OPEN.follow=function followTheSuggestedStep(){const next=BD_OPEN.next();if(!next)return;if(next.hotspot){const h=game.hotspots.find(h=>{return h.id===next.hotspot;
/* Code by Daniel using ChatGPT November 18, 2026 */
})||game.hotspots.find(h=>{return /museum|inside/i.test(h.label);
/* Code by Daniel using ChatGPT November 18, 2026 */
});if(h)walkTo(h.point,h.action);}else next.action();
/* Code by Daniel using ChatGPT November 18, 2026 */
};
BD_OPEN.say=function keepAnExplainableSentence(id){const s=BD_OPEN.state();if(!s.said.includes(id)){s.said.push(id);persist();}for(const b of document.querySelectorAll('[data-say-find="'+id+'"]')){b.disabled=true;b.textContent='In your passport ✓';}toast('Saved to your passport: '+BD_SITES.find(site=>{return site.id===id;
/* Code by Daniel using ChatGPT November 18, 2026 */
}).takeaway);
/* Code by Daniel using ChatGPT November 18, 2026 */
};
BD_OPEN.cardView=function aShortFirstLook(site,detail=0,full=false){full=full||game.dialogKind==='card'&&BD_OPEN.card?.site.id===site.id&&BD_OPEN.card.full;BD_OPEN.originalCard(site,detail);BD_OPEN.card={site,detail,full};$('#panel').classList.toggle('short-evidence-card',!full);if(full){if(window.BD_INVESTIGATION)BD_INVESTIGATION.decorateCard(site);return;}const body=$('#panel-body'),content=document.createElement('section');content.id='card-full-details';while(body.firstChild)content.append(body.firstChild);content.hidden=true;const summary=document.createElement('section');summary.className='card-first-look';summary.innerHTML='<img class="card-first-art" src="'+BD_ART.assetURL('assets/find-'+(site.art===6?'6-v2':site.art)+'.webp')+'" alt="'+escapeHTML(site.artifact)+'"><div><p class="eyebrow">'+escapeHTML(site.place)+' · '+escapeHTML(site.date)+'</p><h2 id="panel-title">'+escapeHTML(site.artifact)+'</h2><p class="card-summary-finding">'+escapeHTML(site.takeaway)+'</p><p class="card-summary-scripture"><b>Read:</b> '+escapeHTML(site.scripture)+'</p><div class="actions"><button class="button" data-evidence-more>More about this find →</button><button class="button secondary" '+(game.save.finds[site.id]?'data-display':'data-fly')+'="'+site.id+'">'+(game.save.finds[site.id]?'Visit your display':'Visit the site')+'</button></div></div>';content.querySelector('#panel-title')?.removeAttribute('id');body.append(summary,content);$('[data-evidence-more]').addEventListener('click',()=>{BD_OPEN.cardView(site,detail,true);if(document.body.dataset.input==='pad')BD_PAD.restoreView({focus:'[data-detail="'+detail+'"]',scroll:{panel:0}});
/* Code by Daniel using ChatGPT November 18, 2026 */
});
if(window.BD_INVESTIGATION)BD_INVESTIGATION.decorateCard(site);
/* Code by Daniel using ChatGPT November 20, 2026 */
};
BD_OPEN.deviceHints=function hintsForTheCurrentDevice(){const s=BD_DIG.active||game.flight?.practice;if(!s||s.disposed||!s.canvas?.isConnected)return;const device=document.body.dataset.input||(matchMedia('(pointer:coarse)').matches?'touch':'keys'),text=device==='pad'?'A enters the board · Hold A + directions to work · LB/RB tools · B controls · Start backpack':device==='touch'||device==='mouse'?'Choose a tool. Drag a level strip; sweep the brush away from the find.':'Arrows move · 1 trowel / 2 point / 3 brush · Hold Space, move, release';const hint=$('#dig-controls');if(hint&&hint.textContent!==text){hint.textContent=text;s.canvas.setAttribute('aria-label','Layered field square. '+text);}const speaker=s.root.querySelector('[data-dig-speaker]');if(speaker)speaker.textContent=s.speaker==='sam'?'Sam · pilot':'Miriam · field supervisor';
/* Code by Daniel using ChatGPT November 18, 2026 */
};
BD_OPEN.install=function installTheFirstExpedition(){
 const oldClean=sanitizeSave;sanitizeSave=raw=>{return BD_OPEN.clean(raw,oldClean(raw));
/* Code by Daniel using ChatGPT November 18, 2026 */
};
 const oldAbout=showAbout;showAbout=function replicaInformationInAbout(){oldAbout();$('#panel-body').insertAdjacentHTML('beforeend','<p class="fine-print">You bring back study replicas. The originals stay in their museums. The paintings are our own.</p>');
/* Code by Daniel using ChatGPT November 18, 2026 */
};
 const oldFood=BD_KITCHEN.cook;BD_KITCHEN.cook=function aMealInTheSameWorld(){oldFood();$('#panel-body .lede')?.insertAdjacentHTML('afterend','<p class="field-line">Eli: “The Galilee boat helps us picture the fishermen’s world in John 21.”</p>');
/* Code by Daniel using ChatGPT November 18, 2026 */
};
 const oldDepart=BD_ADVENTURE.depart;BD_ADVENTURE.depart=function connectTheTwoPoolAccounts(){oldDepart();if(game.dialogKind==='water-depart')$('#panel-body .water-kit').insertAdjacentHTML('afterend','<p class="field-line">Miriam: “Bethesda’s pools fit John 5. Our route leads toward John 9’s Siloam.”</p>');
/* Code by Daniel using ChatGPT November 18, 2026 */
};
 const oldPack=BD_IMMERSION.pack;BD_IMMERSION.pack=function aRouteInTheBackpack(){oldPack();const s=BD_OPEN.state();if(s.active&&!s.complete)$('.pack-contents').insertAdjacentHTML('afterbegin','<button class="pack-object field-notebook" data-first="next"><b>Your first expedition</b><small>'+escapeHTML(BD_OPEN.next()?.line||'Continue at Tel Dan.')+'</small></button><button class="text-help" data-first="free">Explore freely instead</button>');
/* Code by Daniel using ChatGPT November 18, 2026 */
};
 const oldPeople=BD_PEOPLE.conversation;
 BD_PEOPLE.conversation=function firstMuseumConversation(actor){
  oldPeople(actor);
  if(actor.id==='docent'&&actor.focus!=='invited'&&!BD_OPEN.state().complete&&!game.save.finds['tel-dan']){
   $('#panel-body .actions')?.insertAdjacentHTML('afterbegin','<button class="button" data-first="mara">Ask about a first dig</button>');
  }
  /* Code by Daniel using ChatGPT November 23, 2026 */
 };
 const oldDisplay=visitDisplay;visitDisplay=function bringTheFirstFindHome(site){oldDisplay(site);const s=BD_OPEN.state();if(site.id==='tel-dan'&&s.active&&!s.complete){s.complete=true;s.active=false;persist();toast('Mara: Your first display! Chef Eli is in the Food Court through the Olive Court.');}
/* Code by Daniel using ChatGPT November 18, 2026 */
};
 BD_OPEN.originalCard=showCard;showCard=BD_OPEN.cardView;
 const oldRoute=BD_PAD.route;BD_PAD.route=function rememberFirstViews(){if(game.dialogKind==='first-expedition')return BD_OPEN.mara;if(game.dialogKind==='card'&&BD_OPEN.card){const {site,detail,full}=BD_OPEN.card;return ()=>{return BD_OPEN.cardView(site,detail,full);
/* Code by Daniel using ChatGPT November 18, 2026 */
};}return oldRoute();
/* Code by Daniel using ChatGPT November 18, 2026 */
};
 const oldPanel=BD_JOURNEY.panel;BD_JOURNEY.panel=function oneSentenceToKeep(kind){oldPanel(kind);if(kind!=='card')$('#panel').classList.remove('short-evidence-card');$('#panel').classList.toggle('screen-dig',['square-dig','flight-practice'].includes(kind));if(['discovery','patient-notebook'].includes(kind)){const ending=$('.finding-ending'),site=kind==='discovery'?BD_SITES.find(s=>{return s.id===game.justFound;
/* Code by Daniel using ChatGPT November 18, 2026 */
}):BD_STUDY.active?.site||BD_PAD.fieldSite||game.site;if(ending&&site&&!ending.parentElement.querySelector('[data-say-find]'))ending.insertAdjacentHTML('afterend','<button class="button secondary small" data-say-find="'+site.id+'" '+(BD_OPEN.state().said.includes(site.id)?'disabled':'')+'>'+(BD_OPEN.state().said.includes(site.id)?'In your passport ✓':'I could say that · keep this sentence')+'</button>');}
/* Code by Daniel using ChatGPT November 18, 2026 */
};
 const oldPassport=BD_JOURNEY.passport;BD_JOURNEY.passport=function myWordsInThePassport(){oldPassport();const said=BD_OPEN.state().said;if(said.length)$('#panel-body').insertAdjacentHTML('afterbegin','<section class="kept-sentences"><h3>Something to tell a friend</h3>'+said.map(id=>{const site=BD_SITES.find(s=>{return s.id===id;
/* Code by Daniel using ChatGPT November 18, 2026 */
});return '<p><b>'+escapeHTML(site.place)+':</b> '+escapeHTML(site.takeaway)+'</p>';
/* Code by Daniel using ChatGPT November 18, 2026 */
}).join('')+'</section>');
/* Code by Daniel using ChatGPT November 18, 2026 */
};
 const oldRefresh=BD_DIG.refresh;BD_DIG.refresh=function visibleToolsAndSeals(s){oldRefresh(s);const pick=s.root?.querySelector('[data-dig-tool="pick"]');if(pick&&s.data.square.first){pick.hidden=false;pick.title='Bamboo point · learn it at Nimrud';pick.setAttribute('aria-label','2 · Bamboo point. Learn it at Nimrud.');}const help=s.root?.querySelector('[data-dig-help]');if(help)help.textContent='Dig with Miriam';const stamps=s.root?.querySelector('[data-dig-seals]');if(stamps&&!stamps.dataset.celebrated){stamps.dataset.celebrated='true';stamps.classList.add('new-field-seal');}BD_OPEN.deviceHints();
/* Code by Daniel using ChatGPT November 18, 2026 */
};
 const oldHelp=BD_DIG.help;BD_DIG.help=function aFriendlyHelpingHand(s){oldHelp(s);if(!s.practice&&s.data.square.assisted&&!s.helpExplained){s.helpExplained=true;s.root.querySelector('[data-dig-help]').insertAdjacentHTML('afterend','<p class="fine-print">Clean and In place seals stay available. Brisk is for unassisted digs.</p>');}
/* Code by Daniel using ChatGPT November 18, 2026 */
};
 const oldTick=BD_VIEW.tick;BD_VIEW.tick=function firstExpeditionAndDeviceCues(){oldTick();if(!game.save)return;BD_OPEN.deviceHints();const next=BD_OPEN.next(),cue=$('#first-step');cue.hidden=!next||(game.scene==='museum'&&BD_MUSEUM.room==='front')||$('#panel').open||!!game.flight||!!game.hallTransition;if(next&&cue.textContent!==next.line+' →')cue.textContent=next.line+' →';const garden=$('#garden-reading');if(!garden.hidden&&Object.keys(game.save.finds).length===12&&!garden.querySelector('[data-replay-seals]')){const missing=['tel-dan','nimrud'].reduce((n,id)=>{return n+['clean','brisk','inPlace'].filter(key=>{return !digState(BD_SITES.find(s=>{return s.id===id;
/* Code by Daniel using ChatGPT November 18, 2026 */
})).seals?.[key];
/* Code by Daniel using ChatGPT November 18, 2026 */
}).length;
/* Code by Daniel using ChatGPT November 18, 2026 */
},0);if(missing)garden.insertAdjacentHTML('beforeend','<button class="button secondary" data-replay-seals>Dig again · '+missing+' seals to try for</button>');}
/* Code by Daniel using ChatGPT November 18, 2026 */
};
 const cue=document.createElement('button');cue.id='first-step';cue.hidden=true;cue.addEventListener('click',BD_OPEN.follow);document.body.append(cue);
 document.addEventListener('click',event=>{const b=event.target.closest('button');if(!b)return;const action=b.dataset.first;if(action==='mara')BD_OPEN.mara();if(action==='fly'){BD_OPEN.state().active=true;persist();closePanel();flyTo(BD_SITES[0]);}if(action==='free'){BD_OPEN.state().active=false;persist();closePanel();}if(action==='next'){closePanel();BD_OPEN.follow();}if(b.dataset.sayFind)BD_OPEN.say(b.dataset.sayFind);if(b.hasAttribute('data-replay-seals'))BD_JOURNEY.skills();
/* Code by Daniel using ChatGPT November 18, 2026 */
},true);

/* Code by Daniel using ChatGPT November 18, 2026 */
};
