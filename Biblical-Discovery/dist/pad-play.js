'use strict';
// Controller actions share the ordinary game state and native controls.
window.BD_PAD={history:[],restoring:false,opening:false,suspended:null,lastFocus:null,active:false,navAt:0,navDirection:0};
BD_PAD.selector=function rememberNativeControl(el){if(!el)return null;if(el.id)return '#'+CSS.escape(el.id);const root=$('#panel');if(!root.contains(el))return null;for(const attribute of el.attributes){if(!attribute.name.startsWith('data-'))continue;const selector='['+attribute.name+'="'+CSS.escape(attribute.value)+'"]';if(root.querySelectorAll(selector).length===1)return selector;}const path=[];for(let n=el;n&&n!==root;n=n.parentElement){if(n.id){path.unshift('#'+CSS.escape(n.id));break;}const siblings=[...n.parentElement.children].filter(s=>{return s.tagName===n.tagName;
/* Code by Daniel using ChatGPT November 18, 2026 */
});path.unshift(n.tagName.toLowerCase()+':nth-of-type('+(siblings.indexOf(n)+1)+')');}return path.join(' > ');
/* Code by Daniel using ChatGPT November 18, 2026 */
};
BD_PAD.route=function currentPlayableRoute(){
 const kind=game.dialogKind,site=BD_STUDY.active?.site||BD_PAD.fieldSite||game.site;
 if(kind==='expedition-flyer')return ()=>BD_FLYER.open(true);
 if(kind==='patient-excavation'||kind==='square-record'){
  const entry=$('#panel-body [data-culture-enter]'), field=BD_SITES.find(item=>item.id===entry?.dataset.cultureEnter);
  if(field)return ()=>openDig(field);
 }
 if(kind==='culture'){
  const id=$('[data-culture-site]')?.dataset.cultureSite, current=BD_SITES.find(item=>item.id===id);
  if(current)return ()=>BD_CULTURE.open(current);
 }
 if(kind==='accounts'||kind==='accounts-review'||kind==='accounts-sign'){const testament=BD_ACCOUNTS.testament,page=BD_ACCOUNTS.page,painting=kind==='accounts'&&$('#panel').classList.contains('acc-viewing'),readingScroll=BD_ACCOUNTS.paintingScroll;return ()=>{if(kind!=='accounts'){BD_ACCOUNTS.testament=testament;BD_ACCOUNTS.page=page;if(kind==='accounts-sign')BD_ACCOUNTS.signView();else BD_ACCOUNTS.review();}else{BD_ACCOUNTS.open(testament,page);if(painting){BD_ACCOUNTS.viewing(true);BD_ACCOUNTS.paintingScroll=readingScroll;}}
/* Code by Daniel using ChatGPT November 22, 2026 */
};}
 if(BD_FRAGMENTS.active){const s=BD_FRAGMENTS.active,id=s.site,level=s.level,zoom=s.zoom;return ()=>{BD_FRAGMENTS.open(id,level);BD_FRAGMENTS.active.zoom=zoom;BD_FRAGMENTS.paint();
/* Code by Daniel using ChatGPT November 18, 2026 */
};}
 if(BD_TRENCH.active){const {site,tool}=BD_TRENCH.active;return ()=>{BD_TRENCH.open(site);if(tool)BD_TRENCH.tool(tool);
/* Code by Daniel using ChatGPT November 18, 2026 */
};}
 if(BD_KITCHEN.active){const id=BD_KITCHEN.active.id;return ()=>{BD_KITCHEN.start(id);
/* Code by Daniel using ChatGPT November 18, 2026 */
};}
 if(kind==='reader'){const el=$('#book-page'),id=el?.dataset.bookId,page=Number(el?.value),edition=game.save.edition,notes=$('#book-sources')?.open,note=Number($('#book-sources')?.dataset.activeNote||1);return ()=>{game.save.edition=edition;showBook(id,page);if(notes)BD_LIBRARY.openNote(note,true);
/* Code by Daniel using ChatGPT November 20, 2026 */
};}
 if(kind==='library'){const hall=game.libraryHall;return ()=>{showLibrary(hall);
/* Code by Daniel using ChatGPT November 18, 2026 */
};}
 if(kind==='card'){const id=game.currentEvidence,detail=Number($('#panel [data-detail].selected')?.dataset.detail||0);return ()=>{showCard(BD_SITES.find(s=>{return s.id===id;
/* Code by Daniel using ChatGPT November 18, 2026 */
}),detail);
/* Code by Daniel using ChatGPT November 18, 2026 */
};}
 if(kind==='lab'){const id=$('#panel [data-card]')?.dataset.card,value=$('#lab-control')?.value;return ()=>{showLab(BD_SITES.find(s=>{return s.id===id;
/* Code by Daniel using ChatGPT November 18, 2026 */
}));if(value!==undefined){$('#lab-control').value=value;$('#lab-control').dispatchEvent(new Event('input'));}
/* Code by Daniel using ChatGPT November 18, 2026 */
};}
 if(kind==='museum-model'&&BD_MAP_VIEW.model){
  const {key,selected}=BD_MAP_VIEW.model;
  return ()=>BD_MAP_VIEW.openModel(key,{selected,instant:true});
 }
 if(kind==='museum-model'){const view=[...BD_VIEW.inspections].find(s=>{return s.canvas.id==='model-close';
/* Code by Daniel using ChatGPT November 18, 2026 */
}),key=view?.key?.replace(/^model-/,''),selected=BD_MODELS.items[key]?.features.findIndex(f=>{return f[2]===$('#model-observation')?.textContent;
/* Code by Daniel using ChatGPT November 18, 2026 */
}),paused=view?.paused;if(key)return ()=>{BD_MODELS.open(key);if(selected>=0)$('#panel [data-model-feature="'+selected+'"]').click();const fresh=[...BD_VIEW.inspections].find(s=>{return s.canvas.id==='model-close';
/* Code by Daniel using ChatGPT November 18, 2026 */
});if(fresh?.paused!==paused)$('#panel .inspection-toggle').click();
/* Code by Daniel using ChatGPT November 18, 2026 */
};}
 if(kind==='patient-study'||kind==='patient-notebook'||kind==='care-choice'||kind==='claim-trays'||kind==='display-label'){const active=BD_STUDY.active,selected=active?.selected,stage=active?.stage,working=active&&!active.reading;if(site)return ()=>{openDig(site);if(working&&BD_STUDY.active?.stage===stage&&!BD_STUDY.active.afterContinue){const el=$('#panel [data-study-select="'+selected+'"]');if(el&&!el.disabled)el.click();}
/* Code by Daniel using ChatGPT November 18, 2026 */
};}
 if(kind==='square-dig'){const s=BD_DIG.active?.site;if(s)return ()=>{BD_DIG.open(s);
/* Code by Daniel using ChatGPT November 18, 2026 */
};}
 if(kind==='square-record'&&site)return ()=>{BD_FIELD.record(site);
/* Code by Daniel using ChatGPT November 18, 2026 */
};
 if(kind==='patient-excavation'&&site)return ()=>{openDig(site);
/* Code by Daniel using ChatGPT November 18, 2026 */
};
 if(kind==='rebuild-copies'){const values=[...document.querySelectorAll('[data-rebuild-word]')].map(n=>{return n.value;/* Code by Daniel using ChatGPT November 18, 2026 */
}),revealed=!$('#copy-continue').hidden,s=site?.id==='oxyrhynchus'?site:BD_SITES.find(s=>{return s.id==='oxyrhynchus';/* Code by Daniel using ChatGPT November 18, 2026 */
});return ()=>{BD_LEARNING.copies(s);for(let i=0;i<values.length;i++)$('[data-rebuild-word="'+i+'"]').value=values[i];BD_IMMERSION.refreshTiles();if(revealed)$('#reveal-practice').click();/* Code by Daniel using ChatGPT November 18, 2026 */
};}
 if(kind==='read-word'){const s=BD_SITES.find(s=>{return s.id==='tel-dan';/* Code by Daniel using ChatGPT November 18, 2026 */
});if(s)return ()=>{BD_FIELD.readWord(s);
/* Code by Daniel using ChatGPT November 18, 2026 */
};}
 if(kind==='material-dig'){const s=BD_FIELD_GAMES.active?.site;if(s)return ()=>{BD_FIELD_GAMES.open(s);
/* Code by Daniel using ChatGPT November 18, 2026 */
};}
 if(kind==='material-word'){const s=BD_FIELD_GAMES.reading?.site;if(s)return ()=>{BD_FIELD_GAMES.readWord(s);
/* Code by Daniel using ChatGPT November 18, 2026 */
};}
 if(kind==='museum-person'){const actor=BD_PEOPLE.actors().find(a=>{return $('#panel-label').textContent.toLowerCase().includes(a.name.split(' ')[0].toLowerCase());
/* Code by Daniel using ChatGPT November 18, 2026 */
})||BD_IMMERSION.docent();return ()=>{BD_PEOPLE.conversation(actor);
/* Code by Daniel using ChatGPT November 18, 2026 */
};}
 if(kind==='practice-menu'){const which=$('#panel [data-practice="record"]')?'context':'conversation';return ()=>{BD_ADVENTURE.tableMenu(which);
/* Code by Daniel using ChatGPT November 18, 2026 */
};}
 if(kind==='practice-complete'){const id=$('#panel [data-practice-replay]')?.dataset.practiceReplay,line=$('#panel .field-line')?.textContent.replace(/^Miriam: “|”$/g,'')||'';return ()=>{BD_ADVENTURE.finishTask(id,line);
/* Code by Daniel using ChatGPT November 18, 2026 */
};}
 if(kind==='fragment-recovered'){const index=Number($('#panel .fragment-receipt p')?.textContent.match(/\d+/)?.[0]||BD_ADVENTURE.state().fragments.length)-1;return ()=>{BD_ADVENTURE.recovered(index);
/* Code by Daniel using ChatGPT November 18, 2026 */
};}
 if(kind==='water-scripture'){const text=$('#panel .scripture-reading')?.textContent,key=Object.keys(BD_ADVENTURE.quotes).find(k=>{return BD_ADVENTURE.quotes[k].text===text;
/* Code by Daniel using ChatGPT November 18, 2026 */
});if(key)return ()=>{BD_ADVENTURE.quote(key);
/* Code by Daniel using ChatGPT November 18, 2026 */
};}
 if(kind==='discovery'||kind==='empty-exhibit'||kind==='briefing'){const id=$('#panel [data-display]')?.dataset.display||$('#panel [data-fly]')?.dataset.fly||$('#panel [data-dig]')?.dataset.dig;return ()=>{const s=BD_SITES.find(s=>{return s.id===id;
/* Code by Daniel using ChatGPT November 18, 2026 */
});if(kind==='discovery')finishDiscovery(s);else if(kind==='briefing')showBriefing(s);else showExhibit(s);
/* Code by Daniel using ChatGPT November 18, 2026 */
};}
 if(kind==='water-sequence'){const sequence=$('#panel .underwater')?'water':'rockfall';return ()=>{BD_ADVENTURE.cutscene(sequence);
/* Code by Daniel using ChatGPT November 18, 2026 */
};}
 if(kind==='practice-game'){const id=BD_ADVENTURE.active;return ()=>{BD_ADVENTURE.play(id);
/* Code by Daniel using ChatGPT November 18, 2026 */
};}
 if(kind==='tunnel-task'){const index=Math.max(0,BD_ADVENTURE.state().fragments.length);return ()=>{BD_ADVENTURE.fragment(Math.min(2,index));
/* Code by Daniel using ChatGPT November 18, 2026 */
};}
 if(kind==='flight-practice')return ()=>{BD_FLIGHT.openPractice();
/* Code by Daniel using ChatGPT November 18, 2026 */
};
 if(kind==='recipe-card'||kind==='food-preview'||kind==='food-scripture'||kind==='food-earned'){const id=$('#panel [data-food-print]')?.dataset.foodPrint||$('#panel [data-food-cook]')?.dataset.foodCook||$('#panel [data-food-card]')?.dataset.foodCard||BD_KITCHEN.state().last;return ()=>{if(kind==='food-earned')BD_KITCHEN.finished(id);else if(kind==='food-scripture')BD_KITCHEN.scripture(id);else if(kind==='food-preview')BD_KITCHEN.preview(id);else BD_KITCHEN.card(id);
/* Code by Daniel using ChatGPT November 18, 2026 */
};}
 if(kind==='gospel'){const reading=$('.hope-leaflet')?.dataset.reading||'walk';return ()=>openHopeReading(reading);}
 const routes={backpack:BD_IMMERSION.pack,'field-note-archive':BD_TRENCH.archive,settings:showSettings,'controller-help':BD_CONTROLLER.help,journal:showJournal,atlas:showAtlas,guide:showGuide,'museum-plan':BD_MUSEUM.plan,'recipe-book':BD_KITCHEN.book,'food-menu':BD_KITCHEN.menu,'food-cook':BD_KITCHEN.cook,'lab-selection':showLabSelection,'hard-questions':BD_JOURNEY.hard,'water-guide':BD_ADVENTURE.fieldGuide,'water-dossier':BD_ADVENTURE.board,'water-application':BD_ADVENTURE.apply,'water-depart':BD_ADVENTURE.depart,'water-choice':BD_ADVENTURE.routeChoice,'water-ending':BD_ADVENTURE.ending,'journey-menu':BD_JOURNEY.menu,passport:BD_JOURNEY.passport,skills:BD_JOURNEY.skills,scope:BD_JOURNEY.scope,session:BD_JOURNEY.session,timeline:BD_JOURNEY.timeline,psalm:BD_JOURNEY.psalm,tacitus:BD_JOURNEY.tacitus,closing:BD_JOURNEY.closing,crew:showCrew,about:showAbout,'book-copyright':BD_LIBRARY.copyrightPage,'docent-invitation':BD_IMMERSION.invite,'docent-fact':BD_IMMERSION.docentFact,'flight-guide':showGuide};return routes[kind]||null;

/* Code by Daniel using ChatGPT November 22, 2026 */
};
BD_PAD.back=function oneStepBack(){
 if($('#panel').classList.contains('acc-viewing')){BD_ACCOUNTS.viewing(false);return;}
 if(game.dialogKind==='reader'&&BD_LIBRARY.closeNote())return;
 if(BD_PAD.inkPick?.host.isConnected&&BD_IMMERSION.tiles?.host===BD_PAD.inkPick.host){const pick=BD_PAD.inkPick;BD_PAD.inkPick=null;BD_IMMERSION.tiles.selected=null;for(const n of pick.host.querySelectorAll('.selected'))n.classList.remove('selected');pick.host.querySelector('.tile-help').textContent='Tile set down. Choose another, or B to return.';BD_CONTROLLER.focus(pick.tile);return;}
 if(BD_FRAGMENTS.active?.selected!==null&&BD_FRAGMENTS.active){BD_FRAGMENTS.active.selected=null;BD_FRAGMENTS.paint();const tile=$('[data-fragment="'+(BD_PAD.fragmentPick??0)+'"]:not([hidden])');if(tile)BD_CONTROLLER.focus(tile);return;}
 if(game.dialogKind==='backpack'&&BD_PAD.suspended){BD_PAD.resume();return;}
 const parent=BD_PAD.history.pop();if(!parent){closePanel();return;}BD_PAD.restoring=true;try{parent.render();BD_PAD.restoreView(parent);}finally{BD_PAD.restoring=false;}

/* Code by Daniel using ChatGPT November 22, 2026 */
};
BD_PAD.pause=function backpackPause(){
 if(BD_PAD.suspended){BD_PAD.resume();return;}
 if(game.dialogKind==='backpack'){closePanel();return;}
 if(!$('#panel').open&&!game.flight&&!BD_SCROLL.active()){BD_IMMERSION.pack();return;}
 const render=BD_PAD.route()||(()=>{closePanel();
/* Code by Daniel using ChatGPT November 18, 2026 */
}),focus=BD_PAD.selector(document.activeElement);BD_PAD.suspended={render,focus,history:BD_PAD.history.slice(),scroll:BD_PAD.saveScroll(),flight:game.flight,paused:game.flight?.paused};if(game.flight)game.flight.paused=true;BD_CONTROLLER.endWork();BD_IMMERSION.pack();

/* Code by Daniel using ChatGPT November 24, 2026 */
};
BD_PAD.resume=function resumeTheHeldActivity(){const saved=BD_PAD.suspended;if(!saved){BD_PAD.back();return;}BD_PAD.suspended=null;BD_PAD.history=saved.history;BD_PAD.restoring=true;try{saved.render();if(saved.flight&&game.flight===saved.flight)game.flight.paused=saved.paused;BD_PAD.restoreView(saved);}finally{BD_PAD.restoring=false;}
/* Code by Daniel using ChatGPT November 18, 2026 */
};
BD_PAD.saveScroll=function heldReadingPosition(){const out={panel:$('#panel').scrollTop};for(const id of ['.fragment-scroll','#fragment-tray','.destination-columns']){const el=$(id);if(el)out[id]=[el.scrollLeft,el.scrollTop];}return out;
/* Code by Daniel using ChatGPT November 18, 2026 */
};
BD_PAD.restoreScroll=function restoreReadingPosition(saved){if(!saved)return;$('#panel').scrollTop=saved.panel||0;for(const [id,point]of Object.entries(saved)){if(id==='panel')continue;const el=$(id);if(el){el.scrollLeft=point[0];el.scrollTop=point[1];}}
/* Code by Daniel using ChatGPT November 18, 2026 */
};
BD_PAD.restoreView=function restoreNativePlace(saved){const root=$('#panel'),focus=saved.focus&&root.querySelector(saved.focus);if(focus&&!focus.disabled&&!focus.hidden){BD_CONTROLLER.focusToken=root.querySelector('#panel-body')?.firstElementChild||root.firstElementChild;BD_CONTROLLER.focus(focus);}BD_PAD.restoreScroll(saved.scroll);
/* Code by Daniel using ChatGPT November 18, 2026 */
};
BD_PAD.controls=function usableControllerControls(root){
 const selector='button,select,input:not([type="hidden"]),textarea,summary,a[href],canvas[tabindex="0"],.reader-text[tabindex="0"]',items=Array.from(root.querySelectorAll(selector));if(root.id==='flight-notebook')items.push($('#flight-skip'));
 return items.filter(el=>{if(!el||el.disabled||el.closest('[hidden],[inert]')||!el.getClientRects().length||getComputedStyle(el).visibility==='hidden')return false;const details=el.closest('details:not([open])');if(details&&el!==details.querySelector(':scope > summary'))return false;const lamps=el.closest('#map-lamps');if(lamps&&Number(getComputedStyle(lamps).opacity)<.2)return false;const rack=el.closest('.destination-rack');if(rack&&Number(getComputedStyle(rack).opacity)<.2)return false;if(['artifact-canvas','atlas-canvas'].includes(el.id))return false;if(el.id==='study-canvas'&&BD_STUDY.active?.stage===2&&BD_STUDY.active.config.kind!=='reconstruct')return false;return true;
/* Code by Daniel using ChatGPT November 18, 2026 */
});

/* Code by Daniel using ChatGPT November 18, 2026 */
};
BD_PAD.preferred=function usefulFirstControl(root,items){
 const s=BD_STUDY.active,kind=game.dialogKind,queries=BD_PAD.suspended&&kind==='backpack'?['[data-pad-resume]']:BD_FRAGMENTS.active?['.scroll-fragment:not([hidden])','#fragment-check']:BD_TRENCH.active?['[data-trench-peg]:not([hidden])',$('#trench-log')?.disabled?'#trench-canvas':'#trench-log']:BD_KITCHEN.active?[$('#food-next')?.disabled?'#kitchen-workbench':'#food-next']:kind==='reader'?['.reader-text']:kind==='atlas'?['[data-select-site][aria-pressed="true"]','[data-select-site]']:kind==='patient-study'?[s?.reading?'#study-ready':s?.stage===2&&s.config.kind==='light'?'#study-lamp':'#study-canvas','#study-lamp']:kind==='square-dig'||kind==='flight-practice'?['canvas[tabindex="0"]']:[];
 for(const query of queries){const el=root.querySelector(query);if(items.includes(el))return el;}return items.find(el=>{return el.closest('#panel-body')&&el.matches('button.button:not(.secondary),select');
/* Code by Daniel using ChatGPT November 18, 2026 */
})||items.find(el=>{return el.closest('#panel-body')&&!el.matches('textarea,input[type=text]');
/* Code by Daniel using ChatGPT November 18, 2026 */
})||items[0];

/* Code by Daniel using ChatGPT November 18, 2026 */
};
BD_PAD.group=function spatialControlGroup(el){return el?.closest('#fragment-board,#fragment-tray,.pack-contents,.bound-books,.destination-columns,.grain-cells,.claim-trays,.deposit-board,.evidence-objects,.practice-choices,.route-options,.ink-tile-bank,.tactile-slots,.tile-slots,.label-slips,.label-slots,.food-components,.traveler-options');
/* Code by Daniel using ChatGPT November 18, 2026 */
};
BD_PAD.target=function nextControllerControl(root,el,dx,dy){
 const items=BD_CONTROLLER.controls(root),index=items.indexOf(el);if(index<0)return BD_PAD.preferred(root,items);const group=BD_PAD.group(el),same=group?items.filter(n=>{return BD_PAD.group(n)===group;
/* Code by Daniel using ChatGPT November 18, 2026 */
}):[],r=el.getBoundingClientRect(),cx=r.x+r.width/2,cy=r.y+r.height/2;
 if(group&&same.length>1){const candidates=same.filter(n=>{return n!==el;
/* Code by Daniel using ChatGPT November 18, 2026 */
}).map(n=>{const b=n.getBoundingClientRect(),x=b.x+b.width/2-cx,y=b.y+b.height/2-cy,along=dx?x*dx:y*dy,cross=dx?Math.abs(y):Math.abs(x);return {n,along,cross,score:along+cross*2.5};
/* Code by Daniel using ChatGPT November 18, 2026 */
}).filter(v=>{return v.along>8;
/* Code by Daniel using ChatGPT November 18, 2026 */
}).sort((a,b)=>{return a.score-b.score;
/* Code by Daniel using ChatGPT November 18, 2026 */
});if(candidates.length)return candidates[0].n;}
 // Leaving an edge follows the document, so every control still has a route.
 return items[(index+(dy||dx)+items.length)%items.length];

/* Code by Daniel using ChatGPT November 18, 2026 */
};
BD_PAD.scroll=function scrollTheFocusedSurface(r,dt){
 const el=document.activeElement,board=el?.closest('#fragment-board'),tray=el?.closest('#fragment-tray'),root=$('#panel').open?$('#panel'):$('#flight-notebook'),surface=board?$('.fragment-scroll'):tray||el?.closest('.destination-columns,.model-placard')||root,x=(r.lookX||0)*510*dt,y=(r.lookY??r.scroll??0)*510*dt;
 if(surface&&Math.abs(x)+Math.abs(y)>.01){const before=surface.scrollTop;if(surface.scrollWidth>surface.clientWidth+2)surface.scrollLeft+=x;if(surface.scrollHeight>surface.clientHeight+2)surface.scrollTop+=y;if(root&&root!==surface&&surface.scrollTop===before)root.scrollTop+=y;}

/* Code by Daniel using ChatGPT November 18, 2026 */
};
BD_PAD.fragment=function fragmentControllerAction(el){
 const s=BD_FRAGMENTS.active;if(!s)return false;if(el?.dataset.fragment!==undefined){const id=Number(el.dataset.fragment);BD_PAD.fragmentPick=id;BD_FRAGMENTS.select(id);const slot=Number.isInteger(BD_PAD.fragmentSlot)&&BD_PAD.fragmentSlot<s.pieces.length?BD_PAD.fragmentSlot:0;BD_CONTROLLER.focus($('[data-fragment-slot="'+slot+'"]'));return true;}
 if(el?.dataset.fragmentSlot!==undefined){const index=Number(el.dataset.fragmentSlot);BD_PAD.fragmentSlot=index;if(s.selected===null){const id=s.attempt.order[index];if(!Number.isInteger(id))return true;BD_PAD.fragmentPick=id;BD_FRAGMENTS.select(id);return true;}BD_FRAGMENTS.place(index);const next=Array.from(document.querySelectorAll('[data-fragment]')).find(n=>{return !n.hidden;
/* Code by Daniel using ChatGPT November 18, 2026 */
});BD_CONTROLLER.focus(next||$('#fragment-check'));return true;}return false;

/* Code by Daniel using ChatGPT November 18, 2026 */
};
BD_PAD.tile=function tactileControllerAction(el){const state=BD_IMMERSION.tiles;if(!state?.host.isConnected||!state.host.contains(el))return false;if(el.hasAttribute('data-ink-tile')){el.click();BD_PAD.inkPick={host:state.host,tile:el};const slots=[...state.host.querySelectorAll('[data-tile-slot]')];BD_CONTROLLER.focus(slots[Math.min(slots.length-1,BD_PAD.inkSlot??0)]);return true;}if(el.hasAttribute('data-tile-slot')){BD_PAD.inkSlot=Number(el.dataset.tileSlot);if(state.selected===null)return true;el.click();if(el.querySelector('span').textContent===state.bank[state.selected]){state.selected=null;const pick=BD_PAD.inkPick;BD_PAD.inkPick=null;for(const n of state.host.querySelectorAll('.selected'))n.classList.remove('selected');BD_CONTROLLER.focus(pick?.tile||state.host.querySelector('[data-ink-tile]'));}return true;}return false;
/* Code by Daniel using ChatGPT November 18, 2026 */
};
BD_PAD.navigate=function intuitivePanelNavigation(root,r,time,dt){
 if(game.dialogKind==='atlas'&&BD_MAP_VIEW.active){const map=BD_MAP_VIEW.active;if(map.progress<.5){if(r.b)BD_PAD.back();return;}if(BD_PAD.mapReady!==map){BD_PAD.mapReady=map;BD_CONTROLLER.focusToken=null;}}
 if(game.dialogKind==='museum-model'&&BD_MAP_VIEW.model?.placard.inert){if(r.b)BD_PAD.back();return;}
 if(game.dialogKind==='expedition-flyer'&&BD_FLYER.active?.aside.inert){if(r.b)BD_PAD.back();return;}
 const token=root.querySelector('#panel-body')?.firstElementChild||root.firstElementChild;let el=document.activeElement;if(BD_CONTROLLER.focusToken===token&&el?.isConnected&&root.contains(el)&&!el.disabled&&!(r.x||r.y||r.lookX||r.lookY||r.a||r.b||r.lb||r.rb||r.west||r.north)){BD_PAD.navDirection=0;return;}const items=BD_CONTROLLER.controls(root);if(BD_CONTROLLER.focusToken!==token){BD_CONTROLLER.focusToken=token;el=null;}
 if(!items.includes(el)){el=BD_PAD.preferred(root,items);BD_CONTROLLER.focus(el);}BD_PAD.scroll(r,dt);
 if(game.dialogKind==='reader'&&(r.lb||r.rb)){const button=$('.reader-nav button[data-book]'+(r.lb?':first-child':':last-child'));if(button&&!button.disabled)button.click();return;}
 if(BD_FRAGMENTS.active&&r.west){$('#fragment-check').click();return;}if(BD_FRAGMENTS.active&&r.north){const s=BD_FRAGMENTS.active;s.zoom=s.zoom>=2.9?1:Math.min(3,s.zoom+.4);BD_FRAGMENTS.paint();return;}
 if(BD_FRAGMENTS.active&&(r.lb||r.rb)){const target=r.lb?Array.from(document.querySelectorAll('[data-fragment]')).find(n=>{return !n.hidden;
/* Code by Daniel using ChatGPT November 18, 2026 */
}):$('[data-fragment-slot="'+Math.max(0,Math.min(BD_FRAGMENTS.active.pieces.length-1,BD_PAD.fragmentSlot??0))+'"]');if(target)BD_CONTROLLER.focus(target);return;}
 const dx=Math.abs(r.x)>.5?Math.sign(r.x):0,dy=Math.abs(r.y)>.5?Math.sign(r.y):0,direction=dy?dy*2:dx;if(direction&&(direction!==BD_PAD.navDirection||time-BD_PAD.navAt>210)){if(!dy&&BD_CONTROLLER.adjust(el,dx)){}else BD_CONTROLLER.focus(BD_PAD.target(root,el,dy?0:dx,dy));BD_PAD.navAt=time;}BD_PAD.navDirection=direction;
 if(r.a)BD_CONTROLLER.activate(document.activeElement);if(r.b){if($('#panel').open)BD_PAD.back();else if(game.flight)$('#flight-pause')?.click();}

/* Code by Daniel using ChatGPT November 18, 2026 */
};
BD_PAD.cancel=function cancelControllerGesture(){
 const mode=BD_CONTROLLER.mode;if(mode?.type==='kitchen'&&BD_KITCHEN.active)BD_KITCHEN.cancel(BD_KITCHEN.active);
 if(mode?.type==='trench'&&BD_TRENCH.active)BD_TRENCH.active.stroke=null;if(mode?.type==='square'){mode.square.hold=null;mode.square.preview=null;}if(mode?.type==='brush')BD_CONTROLLER.brushedAt=performance.now();

/* Code by Daniel using ChatGPT November 18, 2026 */
};
BD_PAD.work=function deliberateControllerWork(r,dt){
 const mode=BD_CONTROLLER.mode;if(!mode)return false;if(!mode.node?.isConnected||!$('#panel').open){BD_CONTROLLER.endWork();return false;}
 if(!mode.released){if(!r.aHeld)mode.released=true;if(r.b){BD_CONTROLLER.endWork();BD_CONTROLLER.focus(mode.node);}return true;}
 if(mode.type==='trench'){const s=BD_TRENCH.active;if(!s){BD_CONTROLLER.endWork();return false;}if(r.west)BD_TRENCH.select((s.data.selected+1)%BD_TRENCH.labels.length);if(s.data.squares[s.data.selected].brushes===3&&!s.data.squares[s.data.selected].bagged&&!r.aHeld){BD_CONTROLLER.endWork();BD_CONTROLLER.focus($('#trench-bag'));return true;}}
 if(mode.type==='kitchen'){const a=BD_KITCHEN.active;if(!a){BD_CONTROLLER.endWork();return false;}if(a.step.kind==='plate'&&(r.lb||r.rb))BD_KITCHEN.selectComponent(a,(a.selected+(r.rb?1:2))%3);if(BD_KITCHEN.ready(a)&&!r.aHeld&&!a.held){BD_CONTROLLER.endWork();BD_CONTROLLER.focus($('#food-next'));return true;}}
 if(mode.type==='kitchen'&&BD_KITCHEN.active?.step.kind==='stir'&&!r.b){const a=BD_KITCHEN.active;if(r.aHeld&&!a.held){mode.stirAngle=mode.stirAngle??0;BD_KITCHEN.begin([500+Math.cos(mode.stirAngle)*140,270+Math.sin(mode.stirAngle)*100]);}if(a.held&&r.aHeld){if(Math.hypot(r.x,r.y)>.3)mode.stirTarget=Math.atan2(r.y,r.x);if(mode.stirTarget!==undefined){const delta=Math.atan2(Math.sin(mode.stirTarget-mode.stirAngle),Math.cos(mode.stirTarget-mode.stirAngle));mode.stirAngle+=Math.max(-3.5*dt,Math.min(3.5*dt,delta));BD_KITCHEN.move([500+Math.cos(mode.stirAngle)*140,270+Math.sin(mode.stirAngle)*100]);}}if(!r.aHeld&&a.held)BD_KITCHEN.end(a.cursor);BD_KITCHEN.draw();return true;}
 return BD_PAD.oldWork(r,dt);

/* Code by Daniel using ChatGPT November 18, 2026 */
};
BD_PAD.legend=function liveControllerLegend(){
 const node=$('#pad-legend');if(!node)return;const parent=$('#panel').open?$('#panel'):document.body;if(node.parentElement!==parent)parent.append(node);node.hidden=!BD_PAD.active||document.hidden||game.inputActive===false||document.body.dataset.input!=='pad';if(node.hidden)return;const mode=BD_CONTROLLER.mode,s=BD_FRAGMENTS.active;let text;
 if(mode?.type==='kitchen'){const kind=BD_KITCHEN.active?.step.kind;text=(kind==='stir'?'Hold A + circle stick or tap directions · stir':kind==='plate'?'LB/RB · item   A · place on plate':'Hold A + stick · '+({cut:'cut across',knead:'fold dough',grind:'grind back and forth',drizzle:'drizzle across',turn:'turn the food'}[kind]||'work'))+'   B · controls   Start · backpack';}else if(mode?.type==='trench')text='Hold A + stick · stroke   LB/RB · tool   X · next square   B · controls';else if(mode?.type==='square')text='Hold A + D-pad · stroke   LB/RB · tool   B · controls   Start · backpack';else if(mode?.type==='study')text='Stick · move   LB/RB · turn   A · check   B · controls   Start · backpack';else if(mode?.type==='brush')text='Hold A + stick · brush   B · controls   Start · backpack';else if(s)text=s.selected!==null?'D-pad · choose a space   A · place   B · cancel   LB · tray   Right stick · pan':'D-pad · choose a fragment   A · pick up   LB/RB · tray/scroll   X · check   Y · zoom   Right stick · pan';else if(game.dialogKind==='atlas'&&BD_MAP_VIEW.active?.progress<.5)text='Approaching the map · B · back   Start · backpack';else if(BD_PAD.inkPick?.host.isConnected)text='D-pad · choose a place   A · place tile   B · set down   Right stick · scroll';else if($('#panel').open&&document.activeElement.matches('select,input[type=range]'))text='Left/right · adjust   Up/down · controls   B · back   Start · backpack';else if($('#panel').open)text=game.dialogKind==='reader'?'Right stick · read   LB/RB · page   A · choose   B · back   Start · backpack':'D-pad · choose   A · select   B · back   Right stick · scroll   Start · backpack';else if(BD_SCROLL.active())text='Left/right · view   X · pause   Y · gaze around   B · floor   Start · backpack';else if(game.flight)text='D-pad · choose   A · select   B · pause   LB/RB · notes   Start · backpack';else text='A · '+(game.nearest?.label||'look around')+'   X · Scene Guide   Y · map   Start · backpack';if(node.textContent!==text)node.textContent=text;

/* Code by Daniel using ChatGPT November 18, 2026 */
};
BD_PAD.poll=function playWithEveryController(time){
 const dt=Math.min(.05,(time-(BD_CONTROLLER.lastTime||time))/1000);BD_CONTROLLER.lastTime=time;game.padMove=null;if(document.hidden||game.inputActive===false){BD_CONTROLLER.pads={};BD_CONTROLLER.endWork();BD_PAD.legend();return;}
 let pads=[];try{pads=Array.from(navigator.getGamepads?.()||[]).filter(p=>{return p&&p.connected;
/* Code by Daniel using ChatGPT November 18, 2026 */
});}catch{}for(const key of Object.keys(BD_CONTROLLER.pads))if(!pads.some(p=>{return String(p.index)===key;
/* Code by Daniel using ChatGPT November 18, 2026 */
}))delete BD_CONTROLLER.pads[key];BD_PAD.active=!!pads.length;if(!pads.length){if(BD_CONTROLLER.mode)BD_CONTROLLER.endWork();BD_PAD.legend();return;}
 const r={x:0,y:0,lookX:0,lookY:0,scroll:0};let strongest=0;for(const pad of pads){const s=BD_CONTROLLER.read(pad,time);if(s.a)BD_PAD.controllerId=pad.index+':'+pad.id;const strength=Math.hypot(s.x,s.y);if(strength>strongest){strongest=strength;r.x=s.x;r.y=s.y;}if(Math.hypot(s.lookX,s.lookY)>Math.hypot(r.lookX,r.lookY)){r.lookX=s.lookX;r.lookY=s.lookY;r.scroll=s.scroll;}for(const key of ['a','b','west','north','start','back','lb','rb','aHeld'])r[key]=!!r[key]||s[key];}
 if(r.x||r.y||r.lookX||r.lookY||r.a||r.b||r.start||r.lb||r.rb||r.west||r.north)document.body.dataset.input='pad';if(!game.ready||!game.save){BD_PAD.legend();return;}
 if(BD_CONTROLLER.mode?.owner&&!pads.some(p=>{return p.index+':'+p.id===BD_CONTROLLER.mode.owner;
/* Code by Daniel using ChatGPT November 18, 2026 */
}))BD_CONTROLLER.endWork();
 if(r.start){BD_PAD.pause();BD_PAD.legend();return;}if(BD_CONTROLLER.mode&&BD_CONTROLLER.work(r,dt)){BD_PAD.legend();return;}
 if(game.hallTransition){if(r.a||r.b)BD_MUSEUM.finish();BD_PAD.legend();return;}
 if($('#panel').open){BD_CONTROLLER.navigate($('#panel'),r,time,dt);BD_PAD.legend();return;}if(BD_SCROLL.active()){BD_SCROLL.pad(r);BD_PAD.legend();return;}
 if(game.flight){if(r.lb)$('#flight-previous')?.click();if(r.rb)$('#flight-next')?.click();BD_CONTROLLER.navigate($('#flight-notebook'),r,time,dt);BD_PAD.legend();return;}
 BD_PAD.navDirection=0;if(r.x||r.y){game.padMove=[r.x,r.y];game.path=[];game.pending=null;}if(r.lb)showLibrary();if(r.rb)BD_MUSEUM.plan();if(r.a)investigateNearest();if(r.west)showGuide();if(r.north)showAtlas();if(r.back)showJournal();BD_PAD.legend();

/* Code by Daniel using ChatGPT November 18, 2026 */
};
BD_PAD.install=function installControllerPlay(){
 const legend=document.createElement('div');legend.id='pad-legend';legend.setAttribute('role','status');legend.setAttribute('aria-live','polite');legend.hidden=true;document.body.append(legend);
 const oldEnd=BD_CONTROLLER.endWork;BD_CONTROLLER.endWork=function releaseControllerWork(){BD_PAD.cancel();oldEnd();
/* Code by Daniel using ChatGPT November 18, 2026 */
};BD_PAD.oldWork=BD_CONTROLLER.work;BD_CONTROLLER.work=BD_PAD.work;
 const oldActivate=BD_CONTROLLER.activate;BD_CONTROLLER.activate=function deliberateControllerChoice(el){if(BD_PAD.fragment(el)||BD_PAD.tile(el))return;if(el?.matches('input[type=file]')){el.click();return;}const before=BD_CONTROLLER.mode;oldActivate(el);if(BD_CONTROLLER.mode&&BD_CONTROLLER.mode!==before){BD_CONTROLLER.mode.released=false;BD_CONTROLLER.mode.owner=BD_PAD.controllerId;}
/* Code by Daniel using ChatGPT November 18, 2026 */
};
 BD_CONTROLLER.controls=BD_PAD.controls;BD_CONTROLLER.navigate=BD_PAD.navigate;BD_CONTROLLER.poll=BD_PAD.poll;
 const oldOpen=openPanel;openPanel=function keepControllerReturnPath(label,html,kind){const current=game.dialogKind,open=$('#panel').open,render=open&&BD_PAD.route(),focus=BD_PAD.selector(document.activeElement);if(!open&&!BD_PAD.restoring&&!BD_PAD.suspended)BD_PAD.history=[];if(open&&render&&current!==kind&&!BD_PAD.restoring&&!BD_PAD.opening&&current!=='welcome')BD_PAD.history.push({render,focus,scroll:BD_PAD.saveScroll()});if(BD_PAD.history.length>16)BD_PAD.history.shift();oldOpen(label,html,kind);BD_PAD.navDirection=0;BD_CONTROLLER.focusToken=null;
/* Code by Daniel using ChatGPT November 18, 2026 */
};
 const oldClose=closePanel;closePanel=function closeControllerPanel(){if(game.dialogKind==='backpack'&&BD_PAD.suspended&&!BD_PAD.restoring){BD_PAD.resume();return;}BD_CONTROLLER.endWork();oldClose();if(!BD_PAD.restoring&&!BD_PAD.suspended)BD_PAD.history=[];
/* Code by Daniel using ChatGPT November 18, 2026 */
};
 const oldPack=BD_IMMERSION.pack;BD_IMMERSION.pack=function physicalBackpackResume(){oldPack();if(BD_PAD.suspended){$('.pack-contents').insertAdjacentHTML('afterbegin','<button class="pack-object field-notebook" data-pad-resume><span aria-hidden="true">↩</span><b>Resume exploring</b><small>Return to the place you paused</small></button>');$('[data-pad-resume]').addEventListener('click',BD_PAD.resume);}
/* Code by Daniel using ChatGPT November 18, 2026 */
};
 const oldStudy=BD_STUDY.open;BD_STUDY.open=function resumeCompletedWork(site){BD_PAD.fieldSite=site;const s=digState(site).patient,config=BD_ENCOUNTERS[site.id];if(s&&!s.studyDone&&(config.kind==='reconstruct'&&s.pieces.length===config.count&&s.pieces.every(p=>{return p.placed;
/* Code by Daniel using ChatGPT November 18, 2026 */
})||config.kind==='light'&&s.observations.length===3)){s.studyDone=true;persist();}oldStudy(site);
/* Code by Daniel using ChatGPT November 18, 2026 */
};
 const oldHelp=BD_CONTROLLER.help;BD_CONTROLLER.help=function consistentControllerHelp(){oldHelp();$('#panel-body').insertAdjacentHTML('afterbegin','<p class="note-block">A chooses or works. B takes one step back. Start opens the backpack and keeps your place. On a work surface, release A after entering, then hold A and move. The bottom legend follows what you are doing. Scroll puzzles: A picks up, choose a space, A places; B cancels a held piece. LB/RB switches tray/scroll. Right stick pans the focused scroll/tray or scrolls a page. In books LB/RB turns pages.</p>');
/* Code by Daniel using ChatGPT November 18, 2026 */
};
 window.addEventListener('blur',()=>{BD_CONTROLLER.endWork();
/* Code by Daniel using ChatGPT November 18, 2026 */
});document.addEventListener('visibilitychange',()=>{if(document.hidden)BD_CONTROLLER.endWork();
/* Code by Daniel using ChatGPT November 18, 2026 */
});document.addEventListener('pointerdown',()=>{legend.hidden=true;
/* Code by Daniel using ChatGPT November 18, 2026 */
});

/* Code by Daniel using ChatGPT November 18, 2026 */
};
