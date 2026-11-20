'use strict';
window.BD_LIBRARY={
 jackets:{
  'old-a':{cloth:'#24483b',shade:'#142e26',foil:'#ddc38b',ink:'#fff0ce',ribbon:'#a95137',motif:'dig'},
  'old-h':{cloth:'#30475b',shade:'#192b3e',foil:'#d7bd83',ink:'#fff0cf',ribbon:'#bb7448',motif:'road'},
  'old-r':{cloth:'#6c363a',shade:'#402126',foil:'#e4c286',ink:'#fff0d6',ribbon:'#b98740',motif:'lamp'},
  'new-a':{cloth:'#275255',shade:'#17373c',foil:'#dec993',ink:'#fff2d5',ribbon:'#b56342',motif:'stone'},
  'new-h':{cloth:'#76533b',shade:'#483021',foil:'#ead0a0',ink:'#fff3d8',ribbon:'#57776a',motif:'harbor'},
  'new-r':{cloth:'#4e405d',shade:'#2d253b',foil:'#dfc79a',ink:'#fff0d8',ribbon:'#bd8b4b',motif:'witness'}
 }
};

BD_LIBRARY.engraving=function jacketIllustration(motif){
 const scenes={
  dig:'<path d="M17 84 45 68 66 77 93 51 125 76 156 59 175 80M17 88h158M24 95h145"/><path d="M39 83v-9l9-4 10 5v8m-7-8 1 7M116 82l7-37 8 2-4 37M123 45l2-13 9 2-3 13M120 81l-12 12 18-6z"/><path d="m70 75 16-13 21 9-3 15-19 10-17-8zM78 77l12 4 11-7M83 87l9-3"/><circle cx="47" cy="42" r="10"/><path d="M47 25v-5m-15 9-4-4m36 4 4-4M29 42h-6m42 0h6"/>',
  road:'<path d="M17 77 46 54 65 67 93 47 119 63 153 42 175 68M17 87h158M31 96h130"/><path d="M78 98c-24-13 36-23 12-34s-1-18 15-23M95 98c-13-12 37-23 15-34s-4-14 4-19"/><path d="M29 60V39h27v21M25 39l18-10 18 10M34 42v15m8-15v15m8-15v15M130 59V32h29v24M126 32l19-10 19 10m-26 4v18m9-18v15m8-15v12"/><path d="M78 25h24m-12-12v24m-8-20 16 16m-16 0 16-16"/>',
  lamp:'<path d="M30 99V69a66 66 0 0 1 132 0v30M35 99V69a61 61 0 0 1 122 0v30M43 101h106"/><path d="M59 81c12-7 24-6 37 0 13-6 25-7 37 0v15c-12-5-25-5-37 0-12-5-25-5-37 0zM96 81v15M66 85l21 3m-21 2 21 3m18-5 20-3m-20 8 20-3"/><path d="M77 65h38c-3 8-13 11-21 10s-15-4-17-10zM114 66l13-8-5 12-14 3M89 65l-3-12h13l4 12M91 53c-9-9 5-11 2-22 14 11-1 14 3 22"/><path d="M94 22v-7M77 31l-6-6m40 6 6-6M74 45h-8m48 0h8"/>',
  stone:'<path d="M20 89h153M29 96h135M28 79l18-18 18 13m65 3 22-23 17 25"/><path d="m61 84 5-56 14-12 16 9 12-8 18 14 6 53zM73 37h39m-40 7h25m7 0h9m-42 7h42m-42 7h31m6 0h7m-44 7h41M82 25l7 7-8 6M117 54l-9 9 7 10"/><path d="M42 85c-15-17-13-33-7-48m-1 13-10-5m10 14-12-4m12 14-12-3m14 12-10-1m8-27 9-6m-9 16 10-5m-10 15 10-5"/>',
  harbor:'<path d="M17 84c12-6 17 6 29 0s17 6 29 0 17 6 29 0 17 6 29 0 17 6 40 0M28 95c12-5 17 5 29 0s17 5 29 0 17 5 29 0 17 5 42 0M17 67l27-25 22 17 30-30 29 27 24-14 26 23"/><path d="M64 71h66l-11 10H75zM95 68V29l-22 35h22m5-30 23 30h-23zM31 60V40h18v17m-20-17 11-8 12 8M137 54V34h20v21m-24-21 14-9 14 9"/><circle cx="124" cy="24" r="8"/>',
  witness:'<path d="M29 91h134M39 98h114M43 82V31h46v40M51 31v-9h48v49M99 71V27h43v55m-35-49h27m-27 7h27m-27 7h27m-27 7h18M59 38h21m-21 7h21m-21 7h17m-17 7h21"/><path d="M63 83c11-7 22-6 33 0 11-6 22-7 33 0v13c-11-4-22-4-33 0-11-4-22-4-33 0zM96 83v13"/><path d="m86 66 10-12 10 12-10 11zM91 66h10m-5-6v12M37 22l-5-5m126 5 5-5M28 43h-7m143 0h7"/>'
 };
 return '<svg class="book-engraving" viewBox="0 0 192 112" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round">'+(scenes[motif]||scenes.lamp)+'</g></svg>';
 /* Code by Daniel using ChatGPT November 17, 2026 */
};

BD_LIBRARY.cover=function boundBookChoice(book,selectedEdition=game.save.edition){
 const edition=selectedEdition==='long'?'long':'short',volume=book.editions[edition],j=BD_LIBRARY.jackets[book.id],bookmark=game.save.bookmarks[book.id+'-'+edition]||0,hall=book.hall==='ot'?'Old Testament':'New Testament',number=book.hall==='ot'?'I':'II',length=edition==='short'?'A short read':'The full volume',status=bookmark?'Continue · page '+(bookmark+1):'Open book',label=(bookmark?'Continue ':'Read ')+volume.title+'. '+hall+'. '+book.subject+'. '+length+'. '+volume.pages.length+' pages.'+(bookmark?' Your bookmark is on page '+(bookmark+1)+'.':'');
 return '<button type="button" class="book book-volume" data-book="'+book.id+'" data-book-edition="'+edition+'" aria-label="'+escapeHTML(label)+'" style="--book-cloth:'+j.cloth+';--book-shade:'+j.shade+';--book-foil:'+j.foil+';--book-ink:'+j.ink+';--book-ribbon:'+j.ribbon+'"><span class="book-object"><span class="book-pages" aria-hidden="true"></span><span class="book-spine" aria-hidden="true"><span>'+escapeHTML(volume.title)+' · '+number+'</span></span><span class="book-ribbon" aria-hidden="true"></span><span class="book-cover"><span class="book-series">'+hall+'<span>THE DISCOVERY LIBRARY</span></span><span class="book-title">'+escapeHTML(volume.title)+'</span><span class="book-rule" aria-hidden="true">✦</span><span class="book-subtitle">'+escapeHTML(volume.subtitle)+'</span>'+BD_LIBRARY.engraving(j.motif)+'<span class="book-subject">'+escapeHTML(book.subject)+'</span><span class="book-edition">'+length+'</span></span></span><span class="book-caption"><span>'+volume.pages.length+' pages</span><span class="book-open">'+status+' <span aria-hidden="true">↗</span></span></span></button>';
 /* Code by Daniel using ChatGPT November 17, 2026 */
};

BD_LIBRARY.shelf=function bookShelf(books,edition=game.save.edition,featured=false){
 return '<div class="book-grid bound-books'+(featured?' featured-books':'')+(!BD_VIEW.allowed()?' quiet-books':'')+'" role="group" aria-label="Choose a book">'+books.map(function volume(book){return BD_LIBRARY.cover(book,edition);
 /* Code by Daniel using ChatGPT November 17, 2026 */
 }).join('')+'</div>';
 /* Code by Daniel using ChatGPT November 17, 2026 */
};

BD_LIBRARY.copyPage=async function copyTheOpenPage(){
 const text=$('#panel-body .reader-text'),status=$('#book-copy-status');if(!text||!status)return;
 try{if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(text.innerText);if(status.isConnected)status.textContent='Page copied.';}
 catch{if(!text.isConnected)return;text.focus({preventScroll:true});const range=document.createRange();range.selectNodeContents(text);const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);status.textContent='Page text selected. Use your device’s Copy command.';}
 /* Code by Daniel using ChatGPT November 17, 2026 */
};

BD_LIBRARY.pageText=function annotatedBookText(page){
 let html=formatMarkdown(page.text);
 const refs=page.sources||[];
 html=html.replace(/\[\^([a-z0-9-]+)\]/g,function source(key,id){const i=refs.findIndex(function entry(r){return r.id===id;/* Code by Daniel using ChatGPT November 20, 2026 */});return i<0?'':'<sup><button type="button" class="book-source-marker" data-book-note="'+(i+1)+'" aria-label="Read source '+(i+1)+'">['+(i+1)+']</button></sup>';/* Code by Daniel using ChatGPT November 20, 2026 */});
 return html;
 /* Code by Daniel using ChatGPT November 20, 2026 */
};
BD_LIBRARY.sourceText=function publishedSource(row,n=null){
 const links=row.url&&game.save.settings.scholars?'<a class="source-link" href="'+escapeHTML(row.url)+'" target="_blank" rel="noopener noreferrer">Open the published source ↗</a>':'';
 return '<section class="book-source-entry"'+(n?' id="book-note-'+n+'" tabindex="-1"':'')+'><h4>'+(n?'['+n+'] ':'')+escapeHTML(row.label)+'</h4><p>'+escapeHTML(row.citation)+'</p><p>'+escapeHTML(row.note)+'</p><p class="book-source-trail">Source trail: '+escapeHTML(row.trail)+'</p><p class="book-source-trail">'+escapeHTML(row.consulted)+'</p>'+links+'</section>';
 /* Code by Daniel using ChatGPT November 20, 2026 */
};
BD_LIBRARY.pageSources=function sourcesBelowThePage(page){
 return page.sources?.length?'<details id="book-sources" class="book-sources"><summary>Sources · '+page.sources.length+' reading note'+(page.sources.length===1?'':'s')+'</summary>'+page.sources.map(function entry(row,i){return BD_LIBRARY.sourceText(row,i+1);/* Code by Daniel using ChatGPT November 20, 2026 */}).join('')+'</details>':'';
 /* Code by Daniel using ChatGPT November 20, 2026 */
};
BD_LIBRARY.openNote=function openTheCitedNote(n,restore=false){
 const details=$('#book-sources'),note=$('#book-note-'+n);if(!details||!note)return;
 details.open=true;details.dataset.activeNote=n;
 if(!restore){note.scrollIntoView({block:'start',behavior:BD_VIEW.allowed()?'smooth':'auto'});if(document.body.dataset.input==='pad')BD_CONTROLLER.focus(note);else note.focus({preventScroll:true});}
 /* Code by Daniel using ChatGPT November 20, 2026 */
};
BD_LIBRARY.closeNote=function returnFromTheSourceNote(){
 const details=$('#book-sources');if(!details?.open)return false;
 const n=details.dataset.activeNote||'1';details.open=false;const marker=$('[data-book-note="'+n+'"]');marker?.scrollIntoView({block:'center'});if(marker)BD_CONTROLLER.focus(marker);return true;
 /* Code by Daniel using ChatGPT November 20, 2026 */
};
BD_LIBRARY.translationNotices=function scriptureCredits(expanded=false){
 return '<details class="book-translation-notices"'+(expanded?' open':'')+'><summary>Scripture translations</summary><p>'+escapeHTML(BD_BOOK_NOTICES.LSB).replace('LSBible.org','<a href="https://www.LSBible.org" target="_blank" rel="noopener noreferrer">LSBible.org</a>').replace('316publishing.com','<a href="https://316publishing.com" target="_blank" rel="noopener noreferrer">316publishing.com</a>')+'</p><p>'+escapeHTML(BD_BOOK_NOTICES.CSB)+'</p></details>';
 /* Code by Daniel using ChatGPT November 20, 2026 */
};
BD_LIBRARY.bibliography=function bookSourceBibliography(){
 return '<section class="book-bibliography"><h3>Fair Questions · published sources and their trail</h3><p>The book begins with confidence in Scripture and follows Michael Grisanti’s use of archaeology to confirm and illuminate its history. These entries name the published work first and identify what was consulted directly or through another author.</p>'+Object.values(BD_BOOK_SOURCES).map(function entry(row){return BD_LIBRARY.sourceText(row);/* Code by Daniel using ChatGPT November 20, 2026 */}).join('')+'</section>';
 /* Code by Daniel using ChatGPT November 20, 2026 */
};
document.addEventListener('click',function bookReadingNotes(event){
 const marker=event.target.closest('button[data-book-note]');if(marker&&!marker.disabled)BD_LIBRARY.openNote(Number(marker.dataset.bookNote));
 /* Code by Daniel using ChatGPT November 20, 2026 */
});
