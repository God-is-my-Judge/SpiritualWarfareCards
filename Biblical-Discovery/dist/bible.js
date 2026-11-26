'use strict';
/* Bible links and translation notices (Claude, 23 Nov 2026, at Daniel's request).
   Brief quotations link to Blue Letter Bible. Longer readings start at the passage in the
   translation's own reader. A version mark can open the brief readings on the page together.
   Each page that shows Scripture carries the publishers' notices. Web links follow the Settings switch. */
window.BD_BIBLE={
 codes:{'Genesis':'gen','Exodus':'exo','Leviticus':'lev','Numbers':'num','Deuteronomy':'deu','Joshua':'jos','Judges':'jdg','Ruth':'rut','1 Samuel':'1sa','2 Samuel':'2sa','1 Kings':'1ki','2 Kings':'2ki','1 Chronicles':'1ch','2 Chronicles':'2ch','Ezra':'ezr','Nehemiah':'neh','Esther':'est','Job':'job','Psalms':'psa','Psalm':'psa','Proverbs':'pro','Ecclesiastes':'ecc','Song of Songs':'sng','Song of Solomon':'sng','Isaiah':'isa','Jeremiah':'jer','Lamentations':'lam','Ezekiel':'eze','Daniel':'dan','Hosea':'hos','Joel':'joe','Amos':'amo','Obadiah':'oba','Jonah':'jon','Micah':'mic','Nahum':'nah','Habakkuk':'hab','Zephaniah':'zep','Haggai':'hag','Zechariah':'zec','Malachi':'mal','Matthew':'mat','Mark':'mar','Luke':'luk','John':'jhn','Acts':'act','Romans':'rom','1 Corinthians':'1co','2 Corinthians':'2co','First Corinthians':'1co','Second Corinthians':'2co','Galatians':'gal','Ephesians':'eph','Philippians':'phl','Colossians':'col','1 Thessalonians':'1th','2 Thessalonians':'2th','1 Timothy':'1ti','2 Timothy':'2ti','Titus':'tit','Philemon':'phm','Hebrews':'heb','James':'jas','1 Peter':'1pe','2 Peter':'2pe','1 John':'1jo','2 John':'2jo','3 John':'3jo','Jude':'jud','Revelation':'rev'},
 // Names that are also people's names: a chapter alone ("Mark 4") is linked only as a chapter range.
 names:['Mark','John','Luke','Matthew','James','Jude','Titus','Daniel','Ruth','Amos','Job','Joel','Jonah','Micah','Hosea','Esther','Ezra','Nehemiah','Joshua','Philemon','Obadiah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malachi','Numbers','Acts'],
 notices:{
  LSB:'Scripture quotations taken from the (LSB®) Legacy Standard Bible®, Copyright © 2021 by The Lockman Foundation. Used by permission. All rights reserved. Managed in partnership with Three Sixteen Publishing Inc. LSBible.org and 316publishing.com.',
  CSB:'Scripture quotations marked CSB have been taken from the Christian Standard Bible®, Copyright © 2017, 2020 by Holman Bible Publishers. Used by permission. Christian Standard Bible® and CSB® are federally registered trademarks of Holman Bible Publishers.',
  CSBdefault:'Unless otherwise noted, all Scripture quotations are taken from the Christian Standard Bible®, Copyright © 2017, 2020 by Holman Bible Publishers. Used by permission. Christian Standard Bible® and CSB® are federally registered trademarks of Holman Bible Publishers.'
 },
 on(){return game.save?.settings?.scholars!==false;/* Code by Daniel using Claude November 23, 2026 */},
 pattern(){
  if(BD_BIBLE.re)return BD_BIBLE.re;
  const names=Object.keys(BD_BIBLE.codes).sort(function longest(a,b){return b.length-a.length;/* Code by Daniel using Claude November 23, 2026 */}).map(function spaced(n){return n.replace(/ /g,'\\s');/* Code by Daniel using Claude November 23, 2026 */}).join('|');
  const part='\\d{1,3}(?::\\d{1,3})?(?:[–-]\\d{1,3}(?::\\d{1,3})?)?';
  BD_BIBLE.re=new RegExp('(?<![\\w’\'])('+names+')\\s('+part+')((?:;\\s?'+part+'(?![\\d])|,\\s?\\d{1,3}(?:[–-]\\d{1,3})?(?![\\d:]|\\s[a-z]))*)(?![\\w:])','g');
  return BD_BIBLE.re;
  /* Code by Daniel using Claude November 23, 2026 */
 },
 extent(passage){
  const match=/^(\d+)(?::(\d+))?(?:[–-](\d+)(?::(\d+))?)?$/.exec(passage);
  if(!match)return null;
  const [,chapter,verse,end,endVerse]=match;
  const chapters=(!verse||endVerse)&&end?+end-+chapter+1:1;
  const verses=verse&&chapters===1?+(endVerse||end||verse)-+verse+1:0;
  return {chapter,verse,chapters,brief:verses>0&&verses<=12};
 },
 refParts(ref){
  const space=ref.lastIndexOf(' ');
  return [ref.slice(0,space),ref.slice(space+1)];
 },
 // Longer readings open the whole chapter at the starting location so the reader can continue.
 url(book,passage,version){
  const extent=BD_BIBLE.extent(passage);if(!extent)return '';
  const {chapter,verse,brief}=extent,code=BD_BIBLE.codes[book];
  if(brief)return 'https://www.blueletterbible.org/'+version.toLowerCase()+'/'+code+'/'+chapter+'/'+verse+'/';
  const name=({'Psalms':'Psalm','Song of Solomon':'Song of Songs','First Corinthians':'1 Corinthians','Second Corinthians':'2 Corinthians'}[book]||book).toLowerCase();
  if(version==='LSB'){
   // The LSB uses canonical book numbers in chapter anchors. The codes above are in that order.
   const number=[...new Set(Object.values(BD_BIBLE.codes))].indexOf(code)+1;
   const slug=(name==='psalm'?'psalms':name).replace(/ /g,'-');
   return 'https://read.lsbible.org/'+slug+'/'+chapter+(verse?'#v'+number+'.'+chapter+'.'+verse:'');
  }
  return 'https://read.csbible.com/?'+new URLSearchParams({book:name,chapter,...(verse?{verse}:{})});
 },
 // Several references -> BLB's Multi-Verse Retrieval, all on one page.
 allURL(refs,version){
  return 'https://www.blueletterbible.org/tools/MultiVerse.cfm?mvText='+encodeURIComponent(refs.join('; ').replace(/–/g,'-'))+'&t='+version;
  /* Code by Daniel using Claude November 23, 2026 */
 },
 sane(passage){
  const m=/^(\d+)(?::(\d+))?/.exec(passage);return !!m&&+m[1]>0&&+m[1]<=150&&(!m[2]||(+m[2]>0&&+m[2]<=176));
  /* Code by Daniel using Claude November 23, 2026 */
 },
 // Split a matched reference into linkable passages: "Genesis 3:1–15; 11:1–9" -> two links, same book.
 passages(book,first,rest){
  const out=[{text:first,passage:first}];let chapter=/^(\d+)/.exec(first)[1];
  for(const m of rest.matchAll(/([;,]\s?)([\d:–-]+)/g)){
   let passage=m[2];if(m[1][0]===','&&!passage.includes(':'))passage=chapter+':'+passage;else if(passage.includes(':'))chapter=passage.split(':')[0];else chapter=passage.split(/[–-]/)[0];
   out.push({sep:m[1],text:m[2],passage});
  }
  return out;
  /* Code by Daniel using Claude November 23, 2026 */
 },
 skip(node){
  return !!node.parentElement?.closest('a,button,script,style,textarea,select,option,code,input,summary,label,.no-bible-links,[data-no-bible-links]');
  /* Code by Daniel using Claude November 23, 2026 */
 },
 defaultVersion(node){
  return node.parentElement?.closest('[data-bible-version]')?.dataset.bibleVersion||'CSB';
  /* Code by Daniel using Claude November 23, 2026 */
 },
 textNodes(root){
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function readable(n){return n.nodeValue.trim()&&!BD_BIBLE.skip(n)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;/* Code by Daniel using Claude November 23, 2026 */}}),nodes=[];
  while(walker.nextNode())nodes.push(walker.currentNode);return nodes;
  /* Code by Daniel using Claude November 23, 2026 */
 },
 link(href,text,cls,title){
  const a=document.createElement('a');a.className=cls;a.href=href;a.target='_blank';a.rel='noopener noreferrer';a.textContent=text;if(title)a.title=title;return a;
  /* Code by Daniel using Claude November 23, 2026 */
 },
 // Find every reference in the panel. With links on, wrap each one; either way, return the list.
 linkRefs(root){
  const found=[],re=BD_BIBLE.pattern(),on=BD_BIBLE.on();
  for(const node of BD_BIBLE.textNodes(root)){
   const s=node.nodeValue;re.lastIndex=0;let m,last=0,frag=null;
   while((m=re.exec(s))){
    const book=m[1].replace(/\s+/g,' '),first=m[2],rest=m[3]||'';
    const reading=node.parentElement.closest('.acc-read,.acc-strip-books');
    if(!BD_BIBLE.sane(first)||(!reading&&!first.includes(':')&&!/[–-]/.test(first)&&BD_BIBLE.names.includes(book)))continue;
    const after=s.slice(m.index+m[0].length),mark=/^\s*,?\s*\(?\s*(LSB|CSB)\b/.exec(after),version=mark?mark[1]:BD_BIBLE.defaultVersion(node);
    const parts=BD_BIBLE.passages(book,first,rest);
    for(const p of parts)found.push({ref:book+' '+p.passage,version});
    if(!on)continue;
    frag=frag||document.createDocumentFragment();frag.append(s.slice(last,m.index));
    parts.forEach(function piece(p,i){
     if(i)frag.append(p.sep);
     const label=i?p.text:book+' '+p.text,ref=book+' '+p.passage,a=BD_BIBLE.link(BD_BIBLE.url(book,p.passage,version),label,'bible-ref','Read '+ref+' ('+version+')');
     a.dataset.ref=ref;a.dataset.version=version;frag.append(a);
     /* Code by Daniel using Claude November 23, 2026 */
    });
    last=m.index+m[0].length;
   }
   if(frag){frag.append(s.slice(last));node.replaceWith(frag);}
  }
  for(const a of root.querySelectorAll('a.bible-ref[data-ref]'))found.push({ref:a.dataset.ref,version:a.dataset.version});
  return found;
  /* Code by Daniel using Claude November 23, 2026 */
 },
 // Version marks open the page's brief passages together.
 linkVersions(root,refs){
  if(!BD_BIBLE.on()||!refs.length)return;
  for(const node of BD_BIBLE.textNodes(root)){
   const s=node.nodeValue,re=/\b(LSB|CSB)\b(?!®)/g;let m,last=0,frag=null;
   while((m=re.exec(s))){frag=frag||document.createDocumentFragment();frag.append(s.slice(last,m.index));const a=BD_BIBLE.link('#',m[1],'bible-version');a.dataset.version=m[1];frag.append(a);last=m.index+m[0].length;}
   if(frag){frag.append(s.slice(last));node.replaceWith(frag);}
  }
  const list=Array.from(new Set(refs.map(function name(r){return r.ref;/* Code by Daniel using Claude November 23, 2026 */})));
  for(const a of root.querySelectorAll('a.bible-version')){a.href=BD_BIBLE.allURL(list,a.dataset.version);a.title='Short passages on this page in the '+a.dataset.version;}
  /* Code by Daniel using Claude November 23, 2026 */
 },
 noticeHTML(versions,marked,{bookPage=false,hasBrief=false}={}){
  const lsb=escapeHTML(BD_BIBLE.notices.LSB).replace('LSBible.org','<a class="publisher-link" href="https://www.LSBible.org" target="_blank" rel="noopener noreferrer">LSBible.org</a>').replace('316publishing.com','<a class="publisher-link" href="https://316publishing.com" target="_blank" rel="noopener noreferrer">316publishing.com</a>');
  const rows=[];
  if(versions.includes('LSB'))rows.push('<p>'+lsb+'</p>');
  if(versions.includes('CSB'))rows.push('<p>'+escapeHTML(marked?BD_BIBLE.notices.CSB:BD_BIBLE.notices.CSBdefault)+'</p>');
  const links=hasBrief&&BD_BIBLE.on()?versions.map((t,i)=>'<a class="bible-version" data-version="'+t+'" href="#" target="_blank" rel="noopener noreferrer">'+(bookPage&&i===0?'Short passages on this page · ':'')+t+'</a>').join(' · '):'';
  const references=links?'<span class="bible-all">'+(bookPage?'':'Short passages on this page · ')+links+'</span>':'';
  const credit='<p>Bible reference links by <a class="publisher-link" href="https://www.blueletterbible.org/" target="_blank" rel="noopener noreferrer">Blue Letter Bible</a>.</p>';
  if(bookPage){
   return '<details class="scripture-notice book-translation-notices no-bible-links" data-scripture-notice><summary>'+references+'<span class="book-copyright-label">Copyright notices</span></summary><div>'+rows.join('')+credit+'</div></details>';
  }
  return '<div class="scripture-notice no-bible-links" role="note" aria-label="Scripture translations" data-scripture-notice>'+(references?'<p>'+references+'</p>':'')+rows.join('')+'</div>';
  /* Code by Daniel using Claude November 23, 2026 */
 },
 quotedTranslations(body){
  const versions=new Set();
  let markedCSB=false,unmarkedCSB=false;
  const add=(version,marked)=>{
   versions.add(version);
   if(version==='CSB'){
    if(marked)markedCSB=true;else unmarkedCSB=true;
   }
  };
  const bibleReference=new RegExp('^'+BD_BIBLE.pattern().source);
  for(const paragraph of body.querySelectorAll('p,li,blockquote')){
   if(paragraph.closest('[data-scripture-notice],.scripture-reading'))continue;
   for(const quote of paragraph.textContent.matchAll(/“[^”]+”[.!?]?\s*\(([^()]+)\)/g)){
    const citation=quote[1].trim();
    if(!bibleReference.test(citation))continue;
    const mark=/\b(CSB|LSB)$/.exec(citation);
    add(mark?.[1]||paragraph.closest('[data-bible-version]')?.dataset.bibleVersion||'CSB',!!mark);
   }
  }
  for(const verse of body.querySelectorAll('blockquote.scripture-reading,.scripture-reading blockquote')){
   if(!verse.textContent.trim())continue;
   const version=verse.closest('[data-bible-version]')?.dataset.bibleVersion||'CSB';
   const label=verse.closest('.scripture-reading').querySelector('.eyebrow')?.textContent||'';
   add(version,label.includes(version));
  }
  return {versions:[...versions],marked:markedCSB&&!unmarkedCSB};
 },
 // A reading link alone does not quote Scripture.
 addNotice(body,refs,brief){
  if(body.querySelector('[data-scripture-notice]'))return;
  const timeline=body.querySelector('.acc-strip-sheet');
  if(timeline&&BD_BIBLE.on()&&!timeline.querySelector('.bible-all')){
   const readings=BD_BIBLE.timelineReadings(refs);
   if(readings)timeline.insertAdjacentHTML('beforeend','<p class="bible-readings no-bible-links">'+readings+'</p>');
  }
  const {versions,marked}=BD_BIBLE.quotedTranslations(body);
  if(typeof BD_SCRIPTURE_CREDIT==='string'&&body.textContent.includes(BD_SCRIPTURE_CREDIT)){
   const csb=versions.indexOf('CSB');
   if(csb!==-1)versions.splice(csb,1);
  }
  if(!versions.length)return;
  const bookPage=game.dialogKind==='reader';
  const spot=body.querySelector('.reader-text');
  const home=timeline||body.querySelector('.acc-reader:not(.acc-sign-view),.hope-leaflet,.reader,article')||body;
  const html=BD_BIBLE.noticeHTML(versions,marked,{bookPage,hasBrief:!timeline&&brief.length>0});
  if(spot)spot.insertAdjacentHTML('afterend',html);else home.insertAdjacentHTML('beforeend',html);
  /* Code by Daniel using Claude November 23, 2026 */
 },
 timelineReadings(refs){
  const links=[...new Set(refs.map(r=>r.ref))].flatMap(ref=>{
   const [book,passage]=BD_BIBLE.refParts(ref),extent=BD_BIBLE.extent(passage);
   if(!extent||extent.chapters<1||extent.chapters>2)return [];
   return '<a class="bible-ref" href="'+escapeHTML(BD_BIBLE.url(book,passage,'CSB'))+'" target="_blank" rel="noopener noreferrer">'+escapeHTML(ref)+'</a>';
  });
  return links.length?'<span class="bible-all">Read in the CSB · '+links.join(' · ')+'</span>':'';
 },
 run(){
  const body=$('#panel-body');if(!body||!$('#panel').open)return;
  BD_BIBLE.observer.disconnect();
  try{
   const refs=BD_BIBLE.linkRefs(body);
   const brief=refs.filter(r=>BD_BIBLE.extent(BD_BIBLE.refParts(r.ref)[1])?.brief);
   BD_BIBLE.addNotice(body,refs,brief);
   BD_BIBLE.linkVersions(body,brief);
  }
  finally{BD_BIBLE.observer.observe(body,{childList:true,subtree:true});}
  /* Code by Daniel using Claude November 23, 2026 */
 },
 install(){
  const body=$('#panel-body');if(!body)return;
  BD_BIBLE.observer=new MutationObserver(function panelChanged(){BD_BIBLE.run();/* Code by Daniel using Claude November 23, 2026 */});
  BD_BIBLE.observer.observe(body,{childList:true,subtree:true});
  const style=document.createElement('style');style.textContent=BD_BIBLE.css;document.head.append(style);
  /* Code by Daniel using Claude November 23, 2026 */
 },
 css:'#panel a.bible-ref,#panel a.bible-ref:visited,#panel a.bible-version,#panel a.bible-version:visited{color:inherit;font:inherit;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:.18em;text-decoration-color:color-mix(in srgb,currentColor 50%,transparent)}'+
  '#panel a.bible-ref:hover,#panel a.bible-version:hover,#panel a.bible-ref:focus-visible,#panel a.bible-version:focus-visible{text-decoration-color:currentColor;text-decoration-thickness:2px}'+
  '#panel .scripture-notice{margin:1.1em 0 .5em;padding-top:.6em;border-top:1px solid color-mix(in srgb,currentColor 18%,transparent);font-size:.74rem;line-height:1.45;opacity:.85}'+
  '#panel .acc-strip-sheet .scripture-notice{padding-top:0;border-top:0}'+
  '#panel .scripture-notice p{margin:.3em 0}#panel .scripture-notice a.publisher-link{color:inherit;text-decoration:underline}'+
  '#panel .scripture-notice .bible-all{font-size:.95em}'
};
