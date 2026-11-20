'use strict';
window.BD_FIELD_GAMES={active:null,kinds:{galilee:'grain',oxyrhynchus:'grain',megiddo:'grain',avaris:'layers',bethesda:'layers'}};
BD_FIELD_GAMES.clean=function cleanAdditionalDigs(raw,clean){
 for(const site of BD_SITES){const r=raw.digs?.[site.id]?.fieldGame,d=clean.digs[site.id];if(raw.digs?.[site.id]?.readMaterial&&d)d.readMaterial=!!raw.digs[site.id].readMaterial;if(!r||!d)continue;d.fieldGame={done:!!r.done,cleared:Array.isArray(r.cleared)?[...new Set(r.cleared.filter(function valid(n){return Number.isInteger(n)&&n>=0&&n<24;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }))]:[],layer:r.layer===1?1:0,wet:Number.isInteger(r.wet)?Math.max(0,Math.min(6,r.wet)):6,misses:Number.isInteger(r.misses)?Math.max(0,Math.min(100,r.misses)):0};}
 return clean;
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_FIELD_GAMES.state=function fieldGameState(site){const d=digState(site);return d.fieldGame||(d.fieldGame={done:false,cleared:[],layer:0,wet:6,misses:0});
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_FIELD_GAMES.open=function openMaterialDig(site){
 const d=BD_FIELD_GAMES.state(site),kind=BD_FIELD_GAMES.kinds[site.id];const direction=BD_FIELD_GAMES.active?.site.id===site.id?BD_FIELD_GAMES.active.direction:0;BD_FIELD_GAMES.active={site,cursor:0,direction};
 const n=kind==='grain'?24:6,instruction=kind==='grain'?(site.id==='galilee'?'Keep the timber wet. Brush along the grain.':site.id==='megiddo'?'Sweep along the rows. Leave each little stone in place.':'Follow the fibers. The next papyrus layer runs across this one.'):'Remove the latest deposit first. The lines show what lies above.';
 const body=kind==='grain'?'<div class="grain-board" aria-label="Six columns and four rows of material"><img src="'+BD_ART.assetURL('assets/find-'+(site.art===6?'6-v2':site.art)+'.webp')+'" alt="Illustrated study surface"><div class="grain-cells">'+Array.from({length:24},function cell(_,i){const dir=BD_FIELD_GAMES.direction(site,i,d.layer);return '<button data-grain-cell="'+i+'" class="'+(d.cleared.includes(i)?'cleared':'')+'" '+(d.cleared.includes(i)?'disabled':'')+' aria-label="Cell '+(i+1)+', grain '+(dir?'vertical':'horizontal')+'"><span>'+(dir?'↕':'↔')+'</span></button>';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }).join('')+'</div></div><div class="actions"><button class="button secondary" data-grain-direction="0" aria-pressed="'+(direction===0)+'">Brush across →</button><button class="button secondary" data-grain-direction="1" aria-pressed="'+(direction===1)+'">Brush downward ↓</button>'+(site.id==='galilee'?'<button class="button secondary" data-grain-wet>Keep timber wet · '+d.wet+'/6</button>':'')+'</div><p class="fine-print">Choose a stroke direction, then a cell. Along the grain clears a run. Across it packs dirt back. '+(site.id==='oxyrhynchus'?'Fiber layer '+(d.layer+1)+' / 2.':'')+'</p>':'<div class="deposit-board">'+['Late fill A','Late fill B','Upper floor','Later wall','Earlier fill','Foundation'].map(function deposit(label,i){return '<button data-deposit="'+i+'" '+(d.cleared.includes(i)?'disabled':'')+'><b>'+label+'</b><span>'+(['Surface deposit','Surface deposit','Under A','Under A and B','Under upper floor','Under wall and earlier fill'][i])+(d.cleared.includes(i)?' · recorded ✓':'')+'</span></button>';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }).join('')+'</div><p class="fine-print">A teaching section, not the site’s measured excavation sequence.</p>';
 openPanel('IN THE FIELD · '+(kind==='grain'?'WITH THE GRAIN':'LAST IN, FIRST OUT'),'<h2>'+escapeHTML(site.artifact)+'</h2><p class="field-line">Miriam: “'+instruction+'”</p><div class="practice-board">'+body+'</div><p id="material-message" role="status">Next: '+(d.done?'investigate the surface':kind==='grain'?'choose a stroke, then clear a run':'record a deposit with nothing above it')+'.</p><div class="actions"><button class="button" data-material-continue '+(d.done?'':'hidden')+'>Next: Investigate the surface →</button><button class="button secondary" data-material-help>Work one step with Miriam</button><button class="button secondary" data-action="museum-entry">Save &amp; return</button></div>','material-dig');
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_FIELD_GAMES.direction=function materialDirection(site,index,layer){return site.id==='oxyrhynchus'?layer:site.id==='megiddo'?Math.floor(index/6)%2:0;
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_FIELD_GAMES.stroke=function materialStroke(index,direction){
 const s=BD_FIELD_GAMES.active;if(!s)return;const site=s.site,d=BD_FIELD_GAMES.state(site);if(d.done||d.cleared.includes(index))return;
 if(site.id==='galilee'&&d.wet===0){$('#material-message').textContent='Miriam: Keep waterlogged timber wet while it is exposed.';return;}
 if(direction!==BD_FIELD_GAMES.direction(site,index,d.layer)){d.misses++;const adjacent=d.cleared.pop();persist();BD_FIELD_GAMES.open(site);$('#material-message').textContent='Across the grain packs dirt into the surface. Match the arrow.';return;}
 const row=Math.floor(index/6),col=index%6;for(let k=0;k<(direction?4:6);k++){const i=direction?k*6+col:row*6+k;if(BD_FIELD_GAMES.direction(site,i,d.layer)===direction&&!d.cleared.includes(i))d.cleared.push(i);}
 if(site.id==='galilee')d.wet=Math.max(0,d.wet-1);
 if(d.cleared.length===24){if(site.id==='oxyrhynchus'&&d.layer===0){d.layer=1;d.cleared=[];persist();BD_FIELD_GAMES.open(site);$('#material-message').textContent='Miriam: Papyrus has crossing fiber layers. Change your stroke for this layer.';return;}BD_FIELD_GAMES.complete(site);return;}
 persist();BD_FIELD_GAMES.open(site);
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_FIELD_GAMES.remove=function removeLaterDeposit(index){
 const site=BD_FIELD_GAMES.active?.site;if(!site)return;const d=BD_FIELD_GAMES.state(site),above=[[],[],[0],[0,1],[2],[3,4]][index];if(d.done||d.cleared.includes(index))return;
 if(above.some(function stillAbove(i){return !d.cleared.includes(i);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 })){d.misses++;persist();$('#material-message').textContent='That context still has a later deposit above it. Read the relationship first.';return;}
 d.cleared.push(index);persist();if(d.cleared.length===6)BD_FIELD_GAMES.complete(site);else BD_FIELD_GAMES.open(site);
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_FIELD_GAMES.complete=function completeMaterialDig(site){
 const d=digState(site);d.fieldGame.done=true;d.cleared=Array.from({length:140},function cell(_,i){return i;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });d.seals=d.seals||{};d.seals.inPlace=true;d.seals.clean=d.seals.clean||d.fieldGame.misses===0;persist();chime();BD_FIELD_GAMES.open(site);$('#material-message').textContent='Miriam: '+({galilee:'Wet wood can collapse as it dries. Conservation keeps the hull together.',oxyrhynchus:'Papyrus fibers cross in two layers. Written witnesses can be compared.',megiddo:'Small stones make one floor. Their words remember a community.',avaris:'A house plan emerges from recorded relationships. Its shape is evidence.',bethesda:'Later buildings covered earlier pools. Keep their phases distinct.'}[site.id]);
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_FIELD_GAMES.readWord=function readMaterialInscription(site){
 const words={caesarea:{line:'[…]NTIVS PILATVS',question:'Read the surviving name PILATVS.',choices:['Pilate','Paul','Philip'],answer:0,note:'PILATVS names Pilate. Brackets mark missing letters restored by scholars.',key:'Latin V often represents our vowel U. This is a typographic excerpt, not a facsimile.'},megiddo:{line:'ΘΩ ΙΥ ΧΩ',question:'Match the abbreviated sacred names to their meaning.',choices:['To the emperor Augustus','To God Jesus Christ','To the city council'],answer:1,note:'The dedication calls Jesus Christ God. Akeptous gave the table.',key:'ΘΩ = to God · ΙΥ = Jesus · ΧΩ = Christ. Overlines mark abbreviated sacred names.'}}[site.id];if(!words)return;
 BD_FIELD_GAMES.active={site,cursor:0,direction:0};openPanel('READ IT YOURSELF · '+site.place.toUpperCase(),'<h2>'+escapeHTML(site.artifact)+'</h2><p class="field-line">Miriam: “'+words.question+'”</p><div class="inscription-word '+(site.id==='megiddo'?'sacred-names':'')+'" lang="'+(site.id==='megiddo'?'grc':'la')+'">'+words.line.split(' ').map(function word(w){return '<span>'+w+'</span>';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }).join(' ')+'</div><div class="note-block">'+words.key+'</div><div class="actions">'+words.choices.map(function choice(text,i){return '<button class="button secondary" data-inscription-choice="'+i+'">'+text+'</button>';
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }).join('')+'</div><p id="inscription-feedback" role="status">Next: compare the name with the key.</p><div id="inscription-after" hidden>'+BD_FIELD.photo(site.id)+'<button class="button" data-inscription-continue>Next: Investigate the surface →</button></div><button class="button secondary" data-inscription-help>Read one word with Miriam</button>','material-word');BD_FIELD_GAMES.reading={site,words};
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_FIELD_GAMES.wordChoice=function chooseInscriptionMeaning(value){const r=BD_FIELD_GAMES.reading;if(!r)return;if(value!==r.words.answer){$('#inscription-feedback').textContent='Compare each sign with the key. The name is there to read.';return;}digState(r.site).readMaterial=true;persist();$('#inscription-feedback').textContent='Miriam: '+r.words.note;$('#inscription-after').hidden=false;
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
BD_FIELD_GAMES.install=function installMaterialDigs(){
 const oldStudy=BD_STUDY.open;BD_STUDY.open=function materialStudyRoute(site){const d=digState(site);if(['caesarea','megiddo'].includes(site.id)&&d.cleared.length>=100&&!d.readMaterial&&!game.save.finds[site.id]){BD_FIELD_GAMES.readWord(site);return;}if(BD_FIELD_GAMES.kinds[site.id]&&d.recorded&&d.cleared.length<100){BD_FIELD.touch(site.id);BD_FIELD_GAMES.open(site);return;}oldStudy(site);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 const oldNext=BD_FIELD.nextStep;BD_FIELD.nextStep=function materialContinuation(){if(game.dialogKind==='material-word'){const target=$('[data-inscription-continue]');return target&&!target.closest('[hidden]')?{target,label:'Next: Investigate the surface →',complete:true}:null;}if(game.dialogKind==='material-dig'){const target=$('[data-material-continue]');return target&&!target.hidden?{target,label:'Next: Investigate the surface →',complete:true}:null;}return oldNext();
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 const oldStage=BD_FIELD.stage;BD_FIELD.stage=function materialStage(site){const d=game.save.digs[site.id];return BD_FIELD_GAMES.kinds[site.id]&&d?.recorded&&d.cleared.length<100?(BD_FIELD_GAMES.kinds[site.id]==='grain'?'follow the material’s grain':'record the latest deposit'):oldStage(site);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 };
 document.addEventListener('pointerdown',function startGrainStroke(event){const button=event.target.closest('[data-grain-cell]');if(!button||button.disabled)return;BD_FIELD_GAMES.drag={index:Number(button.dataset.grainCell),x:event.clientX,y:event.clientY,id:event.pointerId};
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });
 document.addEventListener('pointercancel',function cancelGrainStroke(){BD_FIELD_GAMES.drag=null;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });
 document.addEventListener('pointerup',function finishGrainStroke(event){const drag=BD_FIELD_GAMES.drag;BD_FIELD_GAMES.drag=null;if(!drag||drag.id!==event.pointerId)return;const dx=event.clientX-drag.x,dy=event.clientY-drag.y;if(Math.hypot(dx,dy)<12)return;event.preventDefault();BD_FIELD_GAMES.suppressUntil=performance.now()+600;BD_FIELD_GAMES.stroke(drag.index,Math.abs(dx)>=Math.abs(dy)?0:1);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });
 document.addEventListener('click',function preventGrainCompatibilityClick(event){if(performance.now()<(BD_FIELD_GAMES.suppressUntil||0)&&event.detail>0){event.preventDefault();event.stopImmediatePropagation();}
 /* Code by Daniel using ChatGPT November 17, 2026 */
 },true);
 document.addEventListener('click',function materialControl(event){const b=event.target.closest('button');if(!b||!BD_FIELD_GAMES.active)return;if(b.dataset.inscriptionChoice!==undefined){BD_FIELD_GAMES.wordChoice(Number(b.dataset.inscriptionChoice));return;}if(b.hasAttribute('data-inscription-help')){BD_FIELD_GAMES.wordChoice(BD_FIELD_GAMES.reading.words.answer);return;}if(b.hasAttribute('data-inscription-continue')){openDig(BD_FIELD_GAMES.reading.site);return;}const s=BD_FIELD_GAMES.active,d=BD_FIELD_GAMES.state(s.site);if(b.dataset.grainDirection!==undefined){s.direction=Number(b.dataset.grainDirection);for(const button of document.querySelectorAll('[data-grain-direction]'))button.setAttribute('aria-pressed',String(Number(button.dataset.grainDirection)===s.direction));}if(b.dataset.grainCell!==undefined)BD_FIELD_GAMES.stroke(Number(b.dataset.grainCell),s.direction);if(b.dataset.deposit!==undefined)BD_FIELD_GAMES.remove(Number(b.dataset.deposit));if(b.hasAttribute('data-grain-wet')){d.wet=6;persist();BD_FIELD_GAMES.open(s.site);}if(b.hasAttribute('data-material-continue'))openDig(s.site);if(b.hasAttribute('data-material-help')){if(BD_FIELD_GAMES.kinds[s.site.id]==='grain'){d.wet=6;const i=Array.from({length:24},function index(_,n){return n;
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }).find(function buried(n){return !d.cleared.includes(n);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });if(i!==undefined)BD_FIELD_GAMES.stroke(i,BD_FIELD_GAMES.direction(s.site,i,d.layer));}else{const index=[0,1,2,3,4,5].find(function buried(n){return !d.cleared.includes(n);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });if(index!==undefined)BD_FIELD_GAMES.remove(index);}}
 /* Code by Daniel using ChatGPT November 17, 2026 */
 });
 /* Code by Daniel using ChatGPT November 17, 2026 */
};
