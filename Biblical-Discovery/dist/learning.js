'use strict';
window.BD_LEARNING={
 questions:{'tel-dan':'An enemy king put up this stone. What would he want remembered?',nimrud:'The empire carved this scene. Whose side of the story will it tell?',babylon:'Cyrus names places restored. Does this object name Jerusalem?',thebes:'Does the Egyptian sign describe Israel as a place or a people?',qumran:'Without the original, how could several imperfect copies help?',avaris:'Can a pot tell us where a family came from—and can it tell us their names?',galilee:'What might happen to ancient waterlogged wood if it dries too quickly?',bethesda:'John describes five porches. A pool has four sides. Where could the fifth be?',caesarea:'What can a governor’s name on stone tell us—and what will it leave unsaid?',delphi:'How could an emperor’s letter help place Paul’s travels in time?',oxyrhynchus:'If each copy has a different slip, what could comparing them recover?',megiddo:'Who paid for a table, who paid for a floor, and whose names were remembered?'},
 trayNames:['The physical object','Its maker’s claim','A scholar’s inference','The Scripture connection'],
 trayReasons:['Describe what survives: the material, writing, place, and date.','Ask what the ancient maker wanted to say or celebrate.','This is a conclusion drawn by comparing evidence.','This connects the evidence with a biblical passage or Christian interpretation.']
};
BD_LEARNING.after=function insightAfterHandling(s,index,next){
 s.reading=true;s.afterContinue=next;s.thought={sentence:BD_LEARNING.sentence(s,index),key:'handled-'+index,elapsed:0,required:BD_STUDY.pauseSeconds(BD_LEARNING.sentence(s,index)),credited:true};
 s.notice=s.stage===3?BD_STUDY.supportTargets[index]:s.sections?.[index]?.home||[450,250];s.noticeElapsed=0;
 $('#study-focus-label').textContent=s.stage===3?'CARE MAKES A DIFFERENCE':s.config.kind==='light'?'DETAIL RECORDED':'THE JOIN HOLDS';$('#study-thought').innerHTML=BD_LEARNING.defined(s.thought.sentence);BD_LEARNING.bindDefinitions();
 $('#study-ready').hidden=false;$('#study-ready').disabled=false;$('#study-ready').textContent='Continue with the study →';
 $('#study-instruction').textContent='';
 BD_STUDY.refresh(s);BD_STUDY.paint(s);
/* Code by Daniel using ChatGPT November 20, 2026 */
};
BD_LEARNING.sentence=function thoughtForSection(s,index){
 if(s.stage===2&&s.site.id==='nimrud')return ['Assyria named Jehu’s tribute and pictured an Israelite delegation.','A register is one band of pictures on the monument.','Tribute is payment to a stronger king; Assyria tells this story.'][index];
 if(s.stage===3)return index===3?'The record keeps a replica’s site, date, and identity with it.':index===0?({stone:'Support weak joins; even strong-looking stone can break under its own weight.',clay:'Support the whole clay object; a repaired edge is not a handle.',wood:'The real boat needed specialist supports to protect fragile, waterlogged wood.',paper:'Support the sheet across its surface; fragile scraps still preserve evidence.',mosaic:'Support the whole panel to keep the little stones in their relationships.',model:'Keep the model’s parts together; their relationships explain the place.'}[s.config.care]):index===1?'Supporting weak points keeps the pieces in their relationship.':'The story and its limits belong beside the object.';
 const notes=s.config.notes;
 if(s.site.id==='tel-dan')return [
  'The uneven edges remind us that much of this monument is missing.',
  '“House of David” names the royal family of Judah.',
  'An enemy king wanted his victories remembered on this monument.',
  'This is a carved stone, different from a later handwritten copy.',
  'These fragments had been reused in a wall before they were recognized.',
  'A royal family’s name can survive on an enemy’s monument.',
  'The fragments and their recorded setting belong together.'
 ][index];
 if(index<notes.length)return notes[index];
 return index%2?'Surface marks and edges help us compare where study sections meet.':'The surface, edges and writing all belong in the explanation.';
/* Code by Daniel using ChatGPT November 16, 2026 */
};
BD_LEARNING.continue=function continueAfterInsight(s){const next=s.afterContinue;s.afterContinue=null;s.notice=null;if(next)next();
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_LEARNING.materialChoice=function chooseMaterialCare(site){
 const saved=BD_STUDY.state(site),care=BD_ENCOUNTERS[site.id].care;
 const options={wood:['Keep the waterlogged wood damp while specialists support it.','Let it dry in the sun before lifting.','Drying too quickly can shrink and crack waterlogged wood. Keep it damp and ask the conservator.'],paper:['Place the fragile sheet on a supporting backing.','Lift the fragile sheet by a corner.','A weak sheet needs support across its surface. A corner can tear before the rest moves.'],mosaic:['Face and support the tesserae as one recorded panel.','Lift the loose tiles one by one without a plan.','Without a recorded plan and facing, tiles lose their relationships. A specialist keeps the panel together.'],clay:['Support the surface and ask which cleaning method is safe.','Wash the writing surface before checking its condition.','Water can damage vulnerable clay and soften marks. The conservator checks the material first.'],stone:['Support the fragments before moving them.','Lift a joined section by one thin edge.','A join does not make a thin edge strong. Support the pieces before moving the reconstruction.'],model:['Keep the model supported with its explanation attached.','Remove the record and carry it by a projecting edge.','The model needs physical support and a label explaining what it represents.']};
 const v=options[care]||options.stone;
 openPanel('A CONSERVATOR’S DECISION','<div class="care-decision"><div class="artifact-stage"><canvas id="care-object" width="600" height="360"></canvas></div><h2>Before you lift it…</h2><p class="lede">Which action keeps this study reproduction and its story together?</p><div class="actions"><button class="button secondary" data-care-choice="1">'+escapeHTML(v[1])+'</button><button class="button" data-care-choice="0">'+escapeHTML(v[0])+'</button></div><p id="care-response" class="lede" role="status"></p><button id="care-continue" class="button" hidden>Prepare its support →</button><p class="fine-print"></p></div>','care-choice');
 BD_ART.artifact($('#care-object').getContext('2d'),site,300,170,440,290);
 for(const b of document.querySelectorAll('[data-care-choice]'))b.addEventListener('click',function(){const good=this.dataset.careChoice==='0';$('#care-response').textContent=good?'Yes. Care protects the evidence as well as the object.':v[2];$('#care-object').classList.toggle('care-caution',!good);$('#care-continue').hidden=!good;
/* Code by Daniel using ChatGPT November 15, 2026 */
});
 $('#care-continue').addEventListener('click',function(){saved.careChoice=true;persist();BD_STUDY.open(site);
/* Code by Daniel using ChatGPT November 15, 2026 */
});
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_LEARNING.trays=function sortEvidenceClaims(site){
 const state=BD_STUDY.state(site);state.claims=state.claims||[];const order=[2,0,3,1],slips=[site.object,site.maker,site.inference,site.connection];let selected=order.find(function(i){return !state.claims.includes(i);
/* Code by Daniel using ChatGPT November 15, 2026 */
});
 openPanel('MAKE THE EXPLANATION','<h2>What kind of claim is it?</h2><p class="lede">Move each slip to the tray it belongs in. Different kinds of evidence answer different questions.</p><div class="claim-slip" id="claim-slip" draggable="true" tabindex="0"></div><div class="claim-trays">'+BD_LEARNING.trayNames.map(function(name,i){return '<button data-claim-tray="'+i+'"><small>TRAY '+(i+1)+'</small>'+name+'<span class="tray-filled"></span></button>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</div><p id="claim-response" class="lede" role="status"></p><button id="claim-help" class="text-help">Think through this slip with the conservator</button><p class="fine-print">You may drag a slip or choose its tray. </p>','claim-trays');
 function render(){if(selected===undefined){persist();BD_LEARNING.label(site);return;}$('#claim-slip').textContent=slips[selected];for(const b of document.querySelectorAll('[data-claim-tray]'))b.querySelector('span').textContent=state.claims.includes(Number(b.dataset.claimTray))?'✓ Sorted':'';
/* Code by Daniel using ChatGPT November 15, 2026 */
}
 function place(index){if(index!==selected){$('#claim-response').textContent=BD_LEARNING.trayReasons[selected]+' Try the tray that describes that kind of claim.';return;}state.claims.push(selected);persist();$('#claim-response').textContent=BD_LEARNING.trayReasons[index];selected=order.find(function(i){return !state.claims.includes(i);
/* Code by Daniel using ChatGPT November 15, 2026 */
});render();
/* Code by Daniel using ChatGPT November 15, 2026 */
}
 for(const b of document.querySelectorAll('[data-claim-tray]')){b.addEventListener('click',function(){place(Number(this.dataset.claimTray));
/* Code by Daniel using ChatGPT November 15, 2026 */
});b.addEventListener('dragover',function(e){e.preventDefault();
/* Code by Daniel using ChatGPT November 15, 2026 */
});b.addEventListener('drop',function(e){e.preventDefault();place(Number(this.dataset.claimTray));
/* Code by Daniel using ChatGPT November 15, 2026 */
});}
 $('#claim-slip').addEventListener('dragstart',function(e){e.dataTransfer.setData('text/plain','claim');
/* Code by Daniel using ChatGPT November 15, 2026 */
});$('#claim-help').addEventListener('click',function(){$('#claim-response').textContent=BD_LEARNING.trayReasons[selected];
/* Code by Daniel using ChatGPT November 15, 2026 */
});render();
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_LEARNING.label=function buildDisplayLabel(site){
 const state=BD_STUDY.state(site);state.label=state.label||[];let selected=0;const text=[site.artifact+' · '+site.place+' · '+site.date,site.inference,site.limit],names=['What it is','What it supports','Fair to say'];
 openPanel('A LABEL YOU CAN EXPLAIN','<h2>Build the display label.</h2><p class="lede">Keep the object, its significance, and its limit together.</p><div class="label-slips">'+[2,0,1].map(function(i){return '<button data-label-slip="'+i+'">'+escapeHTML(text[i])+'</button>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</div><div class="label-slots">'+names.map(function(name,i){return '<button data-label-slot="'+i+'"><small>'+name+'</small><span>Choose a slip, then place it here.</span></button>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</div><p id="label-response" role="status"></p><button class="button" id="label-finish" hidden>Add your own observation →</button>','display-label');
 function render(){for(const b of document.querySelectorAll('[data-label-slip]')){const i=Number(b.dataset.labelSlip);b.disabled=state.label.includes(i);b.classList.toggle('selected',i===selected);}for(const b of document.querySelectorAll('[data-label-slot]'))if(state.label.includes(Number(b.dataset.labelSlot)))b.querySelector('span').textContent=text[Number(b.dataset.labelSlot)];$('#label-finish').hidden=state.label.length<3;
/* Code by Daniel using ChatGPT November 15, 2026 */
}
 for(const b of document.querySelectorAll('[data-label-slip]'))b.addEventListener('click',function(){selected=Number(this.dataset.labelSlip);render();
/* Code by Daniel using ChatGPT November 15, 2026 */
});
 for(const b of document.querySelectorAll('[data-label-slot]'))b.addEventListener('click',function(){const index=Number(this.dataset.labelSlot);if(index!==selected){$('#label-response').textContent='Read the slot heading. Does this slip identify, support, or limit the claim?';return;}if(!state.label.includes(index))state.label.push(index);persist();selected=[0,1,2].find(function(i){return !state.label.includes(i);
/* Code by Daniel using ChatGPT November 15, 2026 */
});render();
/* Code by Daniel using ChatGPT November 15, 2026 */
});
 $('#label-finish').addEventListener('click',function(){BD_STUDY.openNotebook(site);
/* Code by Daniel using ChatGPT November 15, 2026 */
});render();
/* Code by Daniel using ChatGPT November 20, 2026 */
};
BD_LEARNING.copies=function reconstructFromWitnesses(site){
 const saved=BD_STUDY.state(site),second=site.id==='oxyrhynchus';
 const original=second?'The small lamp burned beside the doorway.':'The boat waited beside the quiet shore.';
 const copies=second?['The small larnp burned beside the doorway.','The small lamp burned by the doorway.','The lamp burned beside the doorway.','The small lamp burns beside the doorway.','The small lamp burned beside a doorway.']:['The boad waited beside the quiet shore.','The boat waited beside the shore.','The boat waits beside the quiet shore.','The boat waited behind the quiet shore.','A boat waited beside the quiet shore.'];
 const words=original.split(' '),options=words.map(function(word,i){return [...new Set(copies.map(function(c){return c.split(' ')[i]||'∅';
/* Code by Daniel using ChatGPT November 15, 2026 */
}))].filter(function(w){return w!=='∅';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).sort();
/* Code by Daniel using ChatGPT November 15, 2026 */
});let revealed=false;
 openPanel('FIVE COPIES · NO ORIGINAL ON THE TABLE','<h2>What did the line probably say?</h2><p class="lede">Each practice copy has a different slip. Compare them and rebuild the line.</p><div class="witnesses">'+copies.map(function(c,i){return '<p><small>COPY '+String.fromCharCode(65+i)+'</small>'+escapeHTML(c)+'</p>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</div><div class="copy-reconstruction">'+options.map(function(opts,i){return '<label><small>WORD '+(i+1)+'</small><select data-rebuild-word="'+i+'"><option value="">Choose…</option>'+opts.map(function(word){return '<option>'+escapeHTML(word)+'</option>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</select></label>';
/* Code by Daniel using ChatGPT November 15, 2026 */
}).join('')+'</div><div class="actions"><button class="button" id="compare-reconstruction">Compare my reconstruction</button><button class="text-help" id="reveal-practice">Show the original practice line</button></div><div id="copy-result" class="note-block" hidden></div><button class="button" id="copy-continue" hidden>Support the study sheet →</button><p class="fine-print">Compare what each copy preserves and where it differs.</p>','rebuild-copies');
 function compare(reveal){const chosen=[...document.querySelectorAll('[data-rebuild-word]')].map(function(e){return e.value;
/* Code by Daniel using ChatGPT November 15, 2026 */
});if(!reveal&&chosen.some(function(w){return !w;
/* Code by Daniel using ChatGPT November 15, 2026 */
})){$('#copy-result').hidden=false;$('#copy-result').textContent='Choose a word for each place. The copies are still here to compare.';return;}const correct=chosen.every(function(w,i){return w===words[i];
/* Code by Daniel using ChatGPT November 15, 2026 */
});$('#copy-result').hidden=false;if(correct||reveal){revealed=true;$('#copy-result').innerHTML='<strong>The original practice line</strong><p>'+escapeHTML(original)+'</p><p>'+ (correct?'Your comparison recovered the line.':'Compare it with the copies and with your reconstruction.')+' Different slips can be checked against one another.</p>';$('#copy-continue').hidden=false;}else $('#copy-result').textContent='Some choices still differ. Look for an omission that shifts the words, and compare the witnesses again. Your work stays.';
/* Code by Daniel using ChatGPT November 15, 2026 */
}
 $('#compare-reconstruction').addEventListener('click',function(){compare(false);
/* Code by Daniel using ChatGPT November 15, 2026 */
});$('#reveal-practice').addEventListener('click',function(){compare(true);
/* Code by Daniel using ChatGPT November 15, 2026 */
});$('#copy-continue').addEventListener('click',function(){if(!revealed)return;saved.studyDone=true;saved.copiesCompared=true;persist();BD_STUDY.open(site);
/* Code by Daniel using ChatGPT November 15, 2026 */
});
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_LEARNING.addStarters=function noteStarters(){const area=$('#field-observation');if(!area)return;const row=document.createElement('div');row.className='actions note-starters';for(const text of ['I noticed…','This shows… It does not show…','I still wonder…']){const b=document.createElement('button');b.className='button secondary small';b.textContent=text;b.addEventListener('click',function(){area.value=(area.value?area.value+'\n':'')+text;area.dispatchEvent(new Event('input'));area.focus();
/* Code by Daniel using ChatGPT November 15, 2026 */
});row.append(b);}area.before(row);
/* Code by Daniel using ChatGPT November 15, 2026 */
};
const openStudyBeforeLearning=BD_STUDY.open,notebookBeforeLearning=BD_STUDY.openNotebook,cleanBeforeLearning=BD_STUDY.cleanSaved;
BD_STUDY.open=function openLearningStudy(site){const d=digState(site),saved=BD_STUDY.state(site),config=BD_ENCOUNTERS[site.id];if(d.recorded&&d.cleared.length>=100){if(!saved.studyDone&&config.kind==='collate'){BD_LEARNING.copies(site);return;}if(saved.studyDone&&!saved.careChoice){BD_LEARNING.materialChoice(site);return;}}openStudyBeforeLearning(site);
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_STUDY.openNotebook=function explainBeforeDisplay(site){const s=BD_STUDY.state(site);if((s.claims||[]).length<4){BD_LEARNING.trays(site);return;}if((s.label||[]).length<3){BD_LEARNING.label(site);return;}notebookBeforeLearning(site);BD_LEARNING.addStarters();
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_STUDY.cleanSaved=function retainLearningProgress(raw){const s=cleanBeforeLearning(raw);if(!s)return null;s.claims=Array.isArray(raw.claims)?[...new Set(raw.claims.filter(function(n){return Number.isInteger(n)&&n>=0&&n<4;
/* Code by Daniel using ChatGPT November 15, 2026 */
}))]:[];s.label=Array.isArray(raw.label)?[...new Set(raw.label.filter(function(n){return Number.isInteger(n)&&n>=0&&n<3;
/* Code by Daniel using ChatGPT November 15, 2026 */
}))]:[];s.careChoice=!!raw.careChoice;s.copiesCompared=!!raw.copiesCompared;s.copyWords=Array.isArray(raw.copyWords)?raw.copyWords.slice(0,7).map(function(w){return typeof w==='string'?w.slice(0,32):'';
/* Code by Daniel using ChatGPT November 15, 2026 */
}):[];return s;
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_LEARNING.tour=function letTheVisitorAsk(index=0){
 const sites=BD_SITES.filter(function(s){return !!game.save.finds[s.id];
/* Code by Daniel using ChatGPT November 15, 2026 */
});if(!sites.length){showJournal();return;}index=Math.max(0,Math.min(index,sites.length-1));const site=sites[index];
 openPanel('A VISITOR HAS A QUESTION','<div class="two-column"><div class="artifact-stage"><canvas id="tour-art" width="500" height="360"></canvas></div><div><p class="eyebrow">'+escapeHTML(site.artifact)+'</p><h2>'+escapeHTML(site.question)+'</h2><p class="lede">Try explaining it aloud to your visitor, or leave a sentence below.</p><textarea id="tour-answer" rows="3" maxlength="400" aria-label="Your explanation to a visitor" placeholder="What can I say fairly about this object?"></textarea><button class="button" id="tour-evidence">Compare with the evidence</button><div id="tour-explanation" class="note-block" hidden><p>'+escapeHTML(site.answer)+'</p><strong>Fair to say</strong><p>'+escapeHTML(site.limit)+'</p><p class="finding-ending">'+escapeHTML(site.takeaway)+'</p></div><div class="actions"><button class="button secondary" data-tour="'+(index-1)+'" '+(index===0?'disabled':'')+'>← Previous</button><button class="button" data-tour="'+(index+1)+'" '+(index===sites.length-1?'disabled':'')+'>Next visitor →</button><button class="button secondary" data-card="'+site.id+'">Evidence card</button></div></div></div>','visitor-tour');
 BD_ART.artifact($('#tour-art').getContext('2d'),site,250,170,360,280);$('#tour-evidence').addEventListener('click',function(){$('#tour-explanation').hidden=false;
/* Code by Daniel using ChatGPT November 15, 2026 */
});
/* Code by Daniel using ChatGPT November 20, 2026 */
};

BD_LEARNING.defined=function textWithDefinitions(text){return escapeHTML(text).replace(/\b(dynasty|tribute|register|prefect|proconsul|witness|provenance|cuneiform|manuscript|tessera)\b/gi,function(word){return '<button class="inline-term" data-study-term="'+word.toLowerCase()+'">'+word+'</button>';
/* Code by Daniel using ChatGPT November 15, 2026 */
});
/* Code by Daniel using ChatGPT November 15, 2026 */
};
BD_LEARNING.bindDefinitions=function defineStudyWords(){for(const b of document.querySelectorAll('[data-study-term]'))b.addEventListener('click',function(){let p=$('#study-definition');if(!p){p=document.createElement('p');p.id='study-definition';p.className='fine-print';$('#study-thought').after(p);}p.textContent=BD_TERMS[this.dataset.studyTerm]||'A witness is a surviving copy that can be compared with other copies of a text.';
/* Code by Daniel using ChatGPT November 15, 2026 */
});
/* Code by Daniel using ChatGPT November 15, 2026 */
};

BD_LEARNING.showLabel=function inspectBuiltLabel(site){
 const s=BD_STUDY.state(site),built=(s.label||[]).length===3;
 openPanel(built?'YOUR ASSEMBLED DISPLAY LABEL':'MUSEUM DISPLAY','<div class="two-column"><div class="artifact-stage"><canvas id="museum-label-art" width="600" height="460"></canvas><small>'+escapeHTML(site.artifact)+'</small></div><div><p class="eyebrow">'+escapeHTML(site.place)+' · '+escapeHTML(site.date)+'</p><h2>'+escapeHTML(site.artifact)+'</h2><p class="badge">'+site.grade+'</p><div class="note-block"><strong>What it supports</strong><p>'+escapeHTML(site.inference)+'</p><strong>Fair to say</strong><p>'+escapeHTML(site.limit)+'</p></div>'+(s.note?'<p class="eyebrow">MY FIELD OBSERVATION</p><p class="lede">'+escapeHTML(s.note)+'</p>':'')+'<p>'+escapeHTML(site.connection)+'</p><p><b>'+escapeHTML(site.scripture)+'</b></p><div class="actions"><button class="button" data-card="'+site.id+'">Full evidence and sources</button><button class="button secondary" data-dig="'+site.id+'">Revisit the field study</button><button class="button secondary" data-action="family-tour">Explain it to a visitor</button></div></div></div>','museum-label');
 BD_ART.artifact($('#museum-label-art').getContext('2d'),site,300,220,470,350);
/* Code by Daniel using ChatGPT November 20, 2026 */
};

BD_LEARNING.witnessCopies=BD_LEARNING.copies;
