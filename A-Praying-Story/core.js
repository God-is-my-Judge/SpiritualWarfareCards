'use strict';
const PrayerCore=(()=>{
const TINTS={rose:'#ae697a',blue:'#537cac',green:'#5d8a65',gold:'#b38b3e',purple:'#8764aa',teal:'#398c8b',orange:'#bb7949',slate:'#697687'};
function escapeHTML(value){return String(value).replace(/[&<>"']/g,function entity(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];/* Code by Daniel using ChatGPT — October 2, 2026 */});/* Code by Daniel using ChatGPT — October 2, 2026 */}
function metadata(text){const result={};const re=/([\w-]+)=(?:"([^"\n]*)"|'([^'\n]*)'|([^\s]+))/g;let m;while((m=re.exec(text)))result[m[1]]=m[2]??m[3]??m[4];return result;/* Code by Daniel using ChatGPT — October 2, 2026 */}
function parse(text){
 text=String(text).replace(/^\uFEFF/,'').replace(/\r\n?/g,'\n');const lines=text.split('\n');const cards=[];let card=null,section='body',prefix=[];
 for(const line of lines){
  if(/^## /.test(line)){card={title:line.slice(3).trim()||'Untitled prayer',meta:{type:'person',tint:'rose',art:'auto',cadence:'daily'},body:'',scripture:'',story:'',extras:[]};cards.push(card);section='body';continue;}
  if(!card){prefix.push(line);continue;}
  const meta=line.match(/^\s*<!--\s*card:\s*(.*?)\s*-->\s*$/);if(meta){Object.assign(card.meta,metadata(meta[1]));continue;}
  const heading=line.match(/^### (.+)$/);if(heading){const h=heading[1].trim();section=h==='Scripture'?'scripture':h==='Story'?'story':h==='Prayer'?'body':'extra';if(section==='extra')card.extras.push({heading:h,text:''});continue;}
  if(section==='extra')card.extras[card.extras.length-1].text+=line+'\n';else card[section]+=line+'\n';
 }
 for(const c of cards){for(const key of ['body','scripture','story'])c[key]=c[key].trim();for(const extra of c.extras)extra.text=extra.text.trim();}
 const preamble=prefix.join('\n').trim();const deskMatch=preamble.match(/<!--\s*desk:\s*(.*?)\s*-->/);return{preamble:preamble.replace(/<!--\s*desk:\s*.*?\s*-->/g,'').trim()||'# My Prayer Cards',settings:deskMatch?metadata(deskMatch[1]):{},cards};
 /* Code by Daniel using ChatGPT — October 2, 2026 */
}
function metaValue(value){return '"'+String(value).replace(/["<>\r\n]/g,'').replace(/--/g,'—')+'"';/* Code by Daniel using ChatGPT — October 2, 2026 */}
function serialize(deck){
 const settings={...deck.settings,theme:deck.settings.theme||'quiet',scripture:deck.settings.scripture??'true',large:deck.settings.large??'false'};let deskMeta='';for(const[key,value]of Object.entries(settings))if(/^[\w-]+$/.test(key))deskMeta+=key+'='+metaValue(value)+' ';let text=(deck.preamble||'# My Prayer Cards')+'\n<!-- desk: '+deskMeta.trim()+' -->\n';
 for(const c of deck.cards){let meta='';for(const [key,value]of Object.entries(c.meta))if(/^[\w-]+$/.test(key))meta+=key+'='+metaValue(value)+' ';text+='\n## '+(c.title||'Untitled prayer').replace(/[\r\n]+/g,' ')+'\n<!-- card: '+meta.trim()+' -->\n\n'+c.body.trim()+'\n\n### Scripture\n'+c.scripture.trim()+'\n\n### Story\n'+c.story.trim()+'\n';for(const e of c.extras||[])text+='\n### '+e.heading.replace(/[\r\n]+/g,' ')+'\n'+e.text.trim()+'\n';}
 return text.trim()+'\n';
 /* Code by Daniel using ChatGPT — October 2, 2026 */
}
function inline(text){let safe=escapeHTML(text);safe=safe.replace(/&lt;u&gt;([\s\S]*?)&lt;\/u&gt;/g,'<u>$1</u>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g,'$1<em>$2</em>');return safe;/* Code by Daniel using ChatGPT — October 2, 2026 */}
function render(text){let html='',list=false;for(const line of String(text).split('\n')){const m=line.match(/^\s*[-*] (.*)$/);if(m){if(!list){html+='<ul>';list=true;}html+='<li>'+inline(m[1])+'</li>';}else{if(list){html+='</ul>';list=false;}if(line.trim())html+='<p>'+inline(line)+'</p>';}}if(list)html+='</ul>';return html;/* Code by Daniel using ChatGPT — October 2, 2026 */}
function tint(value){return /^#[0-9a-f]{6}$/i.test(value)?value:TINTS[value]||TINTS.rose;/* Code by Daniel using ChatGPT — October 2, 2026 */}
function hash(value){let n=0;for(const ch of String(value))n=(n*31+ch.charCodeAt(0))>>>0;return n;/* Code by Daniel using ChatGPT — October 2, 2026 */}
return{parse,serialize,render,escapeHTML,tint,hash,TINTS};
// Code by Daniel using ChatGPT — October 2, 2026
})();
