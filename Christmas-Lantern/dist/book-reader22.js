'use strict';
// Daniel's approved nine-book replacement. Legacy bookmark IDs remain dormant.
const READING_ALIASES22={chair:'claude-short-grandmothers-receipt-book',light:'claude-short-love-on-the-ice',bell:'claude-short-the-tallymans-knell',nutcracker:'claude-short-the-mummers-play',globe:'claude-short-far-as-the-curse-is-found',globe2:'claude-short-a-letter-from-the-line',trainA:'claude-short-stand-and-deliver',trainB:'claude-short-the-wolf-who-talked'};
function shortId22(fragment){
 return CLAUDE_SHORT_ORDER22.find(function matching(id){return id.endsWith(fragment);/* Code by Daniel using ChatGPT November 14, 2026 */});
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function installShortLibrary22(){
 for(const id of Object.keys(WINTER_READINGS))if(id!=='angel')delete WINTER_READINGS[id];
 for(const id of Object.keys(BOOK_SHELF10))delete BOOK_SHELF10[id];
 for(const id of CLAUDE_SHORT_ORDER22){const b=CLAUDE_SHORT_BOOKS22[id];WINTER_READINGS[id]=b;BOOK_SHELF10[id]=[b.genre,b.blurb];}
 for(const [shelf,spec]of Object.entries(SHELVES20))spec.books=CLAUDE_SHORT_ORDER22.filter(function onShelf(id){return CLAUDE_SHORT_BOOKS22[id].shelf===shelf;/* Code by Daniel using ChatGPT November 14, 2026 */});
 for(const f of BOOK_FINDS20)f.book=f.id==='clock-case'?shortId22('tallymans-knell'):f.id==='winter-window'?shortId22('grandmothers-receipt-book'):shortId22('mummers-play');
 // Resolve by suffix, retaining the stable IDs supplied by the text-asset import.
 for(const [alias,id]of Object.entries(READING_ALIASES22))if(!CLAUDE_SHORT_BOOKS22[id])READING_ALIASES22[alias]=shortId22(id.slice('claude-short-'.length));
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function bookInline22(text){
 return escapeHTML(text).replace(/\*\*([^*\n]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*\n]+)\*/g,'<em>$1</em>');
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function bookMarkdown22(text){
 return String(text||'').trim().split(/\n\s*\n/).map(function block(part){const lines=part.split('\n');if(lines.every(function bullet(l){return /^\s*- /.test(l);/* Code by Daniel using ChatGPT November 14, 2026 */}))return '<ul>'+lines.map(function item(l){return '<li>'+bookInline22(l.replace(/^\s*- /,''))+'</li>';/* Code by Daniel using ChatGPT November 14, 2026 */}).join('')+'</ul>';if(lines.every(function numbered(l){return /^\d+\. /.test(l);/* Code by Daniel using ChatGPT November 14, 2026 */}))return '<ol>'+lines.map(function item(l){return '<li>'+bookInline22(l.replace(/^\d+\. /,''))+'</li>';/* Code by Daniel using ChatGPT November 14, 2026 */}).join('')+'</ol>';return '<p>'+bookInline22(part).replace(/ {2}\n|\n/g,'<br>')+'</p>';/* Code by Daniel using ChatGPT November 14, 2026 */}).join('');
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function readShortBook22(id,page=-1,remember=true){
 const b=CLAUDE_SHORT_BOOKS22[id];if(!b)return;page=Math.max(-1,Math.min(b.pages.length-1,Number(page)||0));const old=g.shortBook22;
 const trail=old?.id===id?old.trail:[];if(remember&&old?.id===id&&old.page!==page)trail.push(old.page);g.shortBook22={id,page,trail};
 if(page>=0){bookmark10(id,page);state.seenBooks[id]=Math.max(state.seenBooks[id]||0,page+1);save();}
 const choices=b.choices?.[page]||[],cover=page<0;let body=cover?'':b.pages[page][1];
 for(const choice of choices)if(choice.sourceMarkdown)body=body.replace(choice.sourceMarkdown,'');
 const contents='<details class="book-contents22"><summary>Pages</summary><nav aria-label="Book pages">'+b.pages.map(function chapter(p,i){return '<button data-book-page22="'+i+'"'+(i===page?' aria-current="page"':'')+'>'+escapeHTML(p[0])+'</button>';/* Code by Daniel using ChatGPT November 14, 2026 */}).join('')+'</nav></details>';
 showPanel('<article class="little-book short-book22 '+(cover?'book-title-page':'')+'"><p class="verse-meta">'+escapeHTML(b.genre)+(cover?'':' · '+(page+1)+' / '+b.pages.length)+'</p><h2 id="panel-title">'+escapeHTML(b.title)+'</h2>'+(cover?'<p class="book-subtitle22">'+escapeHTML(b.subtitle)+'</p><p class="book-age22">'+escapeHTML(b.ageGuidance)+'</p><p>'+escapeHTML(b.blurb)+'</p>'+bookMarkdown22(b.introductionMarkdown):'<h3>'+escapeHTML(b.pages[page][0])+'</h3><div class="book-reading">'+bookMarkdown22(body)+'</div>'+choices.map(function choice(c){return '<button class="book-choice22 primary" data-book-page22="'+c.page+'">'+escapeHTML(c.label)+'</button>';/* Code by Daniel using ChatGPT November 14, 2026 */}).join('')+(page===b.pages.length-1&&b.coda?'<aside class="book-coda22">'+bookMarkdown22(b.coda)+'</aside>':''))+'<div class="book-pages"><button id="book-prev" '+(cover?'disabled':'')+'>← '+(trail.length?'Back':page===0?'Title page':'Previous')+'</button><span>'+(cover?'Title page':(page+1)+' of '+b.pages.length)+'</span>'+(!choices.length?'<button class="primary" id="book-next">'+(cover?'Open the book →':page<b.pages.length-1?'Next page →':'Back to the room')+'</button>':'<button id="book-close22">Put the book down</button>')+'</div>'+contents+'</article>','');
 $('#book-prev').onclick=function previous(){const previous=trail.length?trail.pop():page-1;readShortBook22(id,previous,false);/* Code by Daniel using ChatGPT November 14, 2026 */};
 if($('#book-next'))$('#book-next').onclick=function next(){if(page<b.pages.length-1)readShortBook22(id,page+1);else closePanel();/* Code by Daniel using ChatGPT November 14, 2026 */};
 if($('#book-close22'))$('#book-close22').onclick=closePanel;
 for(const button of panel.querySelectorAll('[data-book-page22]'))button.onclick=function turn(){readShortBook22(id,Number(button.dataset.bookPage22));/* Code by Daniel using ChatGPT November 14, 2026 */};
 bookTools10(id,page);bookComfort20(id,page);panel.querySelector('.book-choice22')?.focus({preventScroll:true});
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function showShortLibrary22(genre='All'){
 const genres=['All',...new Set(CLAUDE_SHORT_ORDER22.map(function genreOf(id){return CLAUDE_SHORT_BOOKS22[id].genre;/* Code by Daniel using ChatGPT November 14, 2026 */}))];
 const shelf=CLAUDE_SHORT_ORDER22.filter(function matches(id){return genre==='All'||CLAUDE_SHORT_BOOKS22[id].genre===genre;/* Code by Daniel using ChatGPT November 14, 2026 */}).map(function card(id){const b=CLAUDE_SHORT_BOOKS22[id],mark=playState10().bookmarks[id],saved=Number.isInteger(mark)&&mark>=0&&mark<b.pages.length;return '<article class="p10-book"><small>'+escapeHTML(b.genre)+' · '+b.pages.length+' pages · '+escapeHTML(b.ageGuidance)+'</small><h3>'+escapeHTML(b.title)+'</h3><p>'+escapeHTML(b.blurb)+'</p><div class="p10-row"><button data-long-book="'+id+'" data-page="'+(saved?mark:-1)+'">'+(saved?'Resume page '+(mark+1):'Open the book')+'</button>'+(saved?'<button data-long-book="'+id+'" data-page="-1">Title page</button>':'')+'</div></article>';/* Code by Daniel using ChatGPT November 14, 2026 */}).join('');
 showPanel('<div class="play10"><h2 id="panel-title">The Christmas reading nook</h2><div class="p10-row">'+genres.map(function filter(name){return '<button data-genre="'+escapeHTML(name)+'" aria-pressed="'+(genre===name)+'">'+escapeHTML(name)+'</button>';/* Code by Daniel using ChatGPT November 14, 2026 */}).join('')+'</div><div class="p10-shelf">'+shelf+'</div><button id="library-zacchaeus">Zacchaeus · supplied Scripture</button></div>','');
 for(const button of panel.querySelectorAll('[data-genre]'))button.onclick=function filter(){showShortLibrary22(button.dataset.genre);/* Code by Daniel using ChatGPT November 14, 2026 */};
 for(const button of panel.querySelectorAll('[data-long-book]'))button.onclick=function read(){g.shortBook22=null;readShortBook22(button.dataset.longBook,Number(button.dataset.page));/* Code by Daniel using ChatGPT November 14, 2026 */};
 $('#library-zacchaeus').onclick=function scripture(){readZacchaeus09(-1);/* Code by Daniel using ChatGPT November 14, 2026 */};
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
function chooseShortBooks22(title,ids){
 showPanel('<h2 id="panel-title">'+escapeHTML(title)+'</h2><div class="collection-list">'+ids.map(function choice(id){const b=CLAUDE_SHORT_BOOKS22[id];return '<button data-short-choice22="'+id+'">'+escapeHTML(b.title)+'<small>'+escapeHTML(b.ageGuidance)+'</small></button>';/* Code by Daniel using ChatGPT November 14, 2026 */}).join('')+'</div>','');
 for(const button of panel.querySelectorAll('[data-short-choice22]'))button.onclick=function read(){g.shortBook22=null;readShortBook22(button.dataset.shortChoice22,-1);/* Code by Daniel using ChatGPT November 14, 2026 */};
 /* Code by Daniel using ChatGPT November 14, 2026 */
}
