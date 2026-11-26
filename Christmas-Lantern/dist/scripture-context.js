'use strict';
// Optional metadata extends the shared Markdown format without forking its parser.
const BIBLE_BOOK_CODES={'Genesis':'gen','Exodus':'exo','Leviticus':'lev','Numbers':'num','Deuteronomy':'deu','Joshua':'jos','Judges':'jdg','Ruth':'rut','1 Samuel':'1sa','2 Samuel':'2sa','1 Kings':'1ki','2 Kings':'2ki','1 Chronicles':'1ch','2 Chronicles':'2ch','Ezra':'ezr','Nehemiah':'neh','Esther':'est','Job':'job','Psalm':'psa','Psalms':'psa','Proverbs':'pro','Ecclesiastes':'ecc','Song of Songs':'sng','Song of Solomon':'sng','Isaiah':'isa','Jeremiah':'jer','Lamentations':'lam','Ezekiel':'eze','Daniel':'dan','Hosea':'hos','Joel':'joe','Amos':'amo','Obadiah':'oba','Jonah':'jon','Micah':'mic','Nahum':'nah','Habakkuk':'hab','Zephaniah':'zep','Haggai':'hag','Zechariah':'zec','Malachi':'mal','Matthew':'mat','Mark':'mar','Luke':'luk','John':'jhn','Acts':'act','Romans':'rom','1 Corinthians':'1co','2 Corinthians':'2co','Galatians':'gal','Ephesians':'eph','Philippians':'phl','Colossians':'col','1 Thessalonians':'1th','2 Thessalonians':'2th','1 Timothy':'1ti','2 Timothy':'2ti','Titus':'tit','Philemon':'phm','Hebrews':'heb','James':'jas','1 Peter':'1pe','2 Peter':'2pe','1 John':'1jo','2 John':'2jo','3 John':'3jo','Jude':'jde','Revelation':'rev'};
function scripturePassageParts(reference){const clean=String(reference||'').replace(/\s*\([^)]*\)\s*$/,'').trim(),match=clean.match(/^(.+?)\s+(\d+)(?::[\d,\s–:-]+)?$/);if(!match||!BIBLE_BOOK_CODES[match[1]])return null;const chapter=Number(match[2]),cross=clean.match(/:\d+[-–](\d+):\d+/),last=cross?Number(cross[1]):chapter;if(chapter<1||chapter>150||last<chapter||last-chapter>4)return null;return {book:match[1],code:BIBLE_BOOK_CODES[match[1]],chapter,last};/* Code by Daniel using ChatGPT November 11, 2026 */}
// These readings use only the supplied words. Keep connected arguments/sentences together.
const CONTEXT_READINGS12 = {
 'Luke 2:6-7':[6,7,11], 'Luke 2:10-11':[10,11,12], 'Luke 2:12':[10,11,12],
 'Luke 2:13-14':[11,13,14], 'Luke 2:19':[11,14,19],
 'John 3:16':[5,8,16], 'John 3:5-8':[5,6,7,8],
 'Galatians 5:6':[6,13,14], 'Galatians 5:13-14':[6,13,14],
 'Galatians 5:22-23':[6,13,22,23],
 'Luke 19:1-10':[5,8,9,10], 'Matthew 25:35-40':[35,36,40],
 // Longer CSB context added November 18 (Claude): a short complete reading first, the passage under Longer reading.
 'Luke 1:30-31':[30,31,32,33], 'John 1:14':[14,16,17,18], '1 John 4:9':[7,8,9,10],
 'Ephesians 2:8-10':[8,9,10], '1 Corinthians 15:3-4':[3,4,5,6], 'Titus 3:4-7':[4,5,6,7],
 '1 John 3:16-18':[16,17,18], 'James 2:14-17':[14,15,16,17], '1 Peter 2:24':[21,24,25], 'Romans 5:1':[1,2,5]
};
let contextOriginals12=null;
function scriptureContextExcerpt(card,verses){
 const ref=String(card.title).replace(/\s*\([^)]*\)\s*$/,''),recipe=CONTEXT_READINGS12[ref];
 if(!recipe||card.translation!=='CSB')return verses;
 if(!contextOriginals12)contextOriginals12=new Map(Road.parse(CHRISTMAS_VERSES,'scripture').map(function original(c){return [c.id,c];/* Code by Daniel using ChatGPT November 13, 2026 */}));
 const original=contextOriginals12.get(card.id);
 // Custom/imported wording and custom context remain exactly as the author supplied them.
 if(!original||card.title!==original.title||plain(card.text)!==plain(original.text)||JSON.stringify(card.context_verses)!==JSON.stringify(original.context_verses))return verses;
 const selected=verses.filter(function chosen(v){return recipe.includes(v.verse);/* Code by Daniel using ChatGPT November 13, 2026 */});
 return selected.length===recipe.length?selected:verses;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function scriptureContextVersesHTML(verses,start,end){
 let previous=null,html='';
 for(const verse of verses){
  // A bracketed bridge already marks an editorial join; do not duplicate it with an ellipsis.
  if(previous&&verse.verse!==previous.verse+1&&!/^\s*\[/.test(verse.text)&&!/[\]]\s*[.,!?;:’”"']*$/.test(previous.text))html+='<p class="context-gap" aria-label="Omitted verses">…</p>';
  html+='<p class="context-verse '+(verse.verse>=start&&verse.verse<=end?'context-focus':'')+'" data-context-verse="'+verse.verse+'"><sup>'+verse.verse+'</sup> '+escapeHTML(verse.text)+'</p>';
  previous=verse;
 }
 return html;
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function scriptureContextRange(verses){
 const groups=[];
 for(const verse of verses){const last=groups.at(-1);if(last&&verse.verse===last[1]+1)last[1]=verse.verse;else groups.push([verse.verse,verse.verse]);}
 return groups.map(function range(g){return g[0]===g[1]?String(g[0]):g[0]+'–'+g[1];/* Code by Daniel using ChatGPT November 13, 2026 */}).join(', ');
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
function scriptureContextHTML(card){
 const reference=typeof card.context_reference==='string'?card.context_reference.slice(0,160):'',parts=scripturePassageParts(reference||card.title),translation=String(card.translation||''),version=['CSB','KJV','LSB'].includes(translation)?translation.toLowerCase():null,note=typeof card.context_note==='string'?card.context_note.slice(0,2000):'Read the surrounding paragraph or chapter. Notice who is speaking, to whom, and how these words connect with what comes before and after.',label=reference||(parts?parts.book+' '+parts.chapter:'The surrounding passage');
 const verses=Array.isArray(card.context_verses)?card.context_verses.slice(0,200).filter(function validVerse(v){return v&&Number.isInteger(v.verse)&&v.verse>0&&v.verse<=200&&typeof v.text==='string'&&v.text.length<6000;/* Code by Daniel using ChatGPT November 13, 2026 */}):[];
 const focus=String(card.title).match(/:(\d+)(?:[-–](\d+))?/),start=Number(focus?.[1]),end=Number(focus?.[2]||start),excerpt=scriptureContextExcerpt(card,verses),shortened=excerpt.length<verses.length;
 const selection=typeof card.context_selection==='string'?card.context_selection.slice(0,180):'Selected verses';
 const excerptParts=scripturePassageParts(card.title)||parts;
 const readingLabel=shortened&&excerptParts?excerptParts.book+' '+excerptParts.chapter+':'+scriptureContextRange(excerpt)+(version?' ('+translation+')':''):selection;
 let links='';
 if(parts&&version)for(let chapter=parts.chapter;chapter<=parts.last;chapter++)links+='<a href="https://www.blueletterbible.org/'+version+'/'+parts.code+'/'+chapter+'/" target="_blank" rel="noopener noreferrer">Read '+escapeHTML(parts.book)+' '+chapter+' ('+escapeHTML(translation)+') on BLB ↗</a>';
 const reading=excerpt.length?'<p class="verse-meta">'+escapeHTML(readingLabel)+'</p><div class="context-reading context-excerpt">'+scriptureContextVersesHTML(excerpt,start,end)+'</div>':'';
 const longer=shortened?'<details class="context-longer"><summary>Longer reading · '+escapeHTML(selection)+'</summary><div class="context-reading">'+scriptureContextVersesHTML(verses,start,end)+'</div></details>':'';
 return '<details class="scripture-context"><summary>Read in context · '+escapeHTML(label)+(version?' ('+escapeHTML(translation)+')':'')+'</summary><p class="context-note-label">ABOUT THIS PASSAGE · EDITORIAL NOTE</p><p>'+escapeHTML(note)+'</p>'+reading+longer+(typeof card.sections?.context==='string'?'<div class="context-reading"><p>'+escapeHTML(card.sections.context).replace(/\n/g,'<br>')+'</p></div>':'')+(links?'<div class="context-links">'+links+'</div>':'')+'</details>';
 /* Code by Daniel using ChatGPT November 13, 2026 */
}
