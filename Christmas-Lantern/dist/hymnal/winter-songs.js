'use strict';
// A separate cultural songbook; it does not add entries to the Christmas hymnal.
window.LANTERN_WINTER_VERSES16 = [
  ["Over the river, and through the wood,", "To grandmother's house we go;", "The horse knows the way,", "To carry the sleigh,", "Through the white and drifted snow."],
  ["Over the river, and through the wood,", "Oh, how the wind does blow!", "It stings the toes,", "And bites the nose,", "As over the ground we go."],
  ["Over the river, and through the wood,", "With a clear blue winter sky,", "The dogs do bark,", "And children hark,", "As we go jingling by."],
  ["Over the river, and through the wood,", "And straight through the barn-yard gate;", "We seem to go", "Extremely slow,", "It is so hard to wait."],
  ["Over the river, and through the wood —", "When grandmother sees us come,", "She will say, Oh dear,", "The children are here,", "Bring a pie for every one."],
  ["Over the river, and through the wood —", "Now grandmother's cap I spy!", "Hurra for the fun!", "Is the pudding done?", "Hurra for the pumpkin pie!"]
];
window.LanternWinterSongs = {
  mount: function mountWinterBook16(root,options={}){
    const verses=window.LANTERN_WINTER_VERSES16;
    let opened=false,all=false,page=Math.max(0,Math.min(verses.length-1,Number(options.page)||0));
    function escapeWinter16(text){
      const span=document.createElement('span');span.textContent=text;return span.innerHTML;
      /* Code by Daniel using ChatGPT November 13, 2026 */
    }
    function renderWinterBook16(){
      root.classList.add('lh','winter-book16');
      let html=opened?'<p class="lh-muted">CULTURAL SONGS &amp; WINTER VERSES · Grandmother’s Winter Songbook</p>':'<section class="lh-cover"><p>CULTURAL SONGS &amp; WINTER VERSES</p><div class="lh-ornament" aria-hidden="true">❧</div><h2 id="panel-title">Grandmother’s Winter Songbook</h2><p>For the snowy road and the warm room at its end.</p></section>';
      if(!opened)html+='<button class="primary" data-winter16="open">Open the winter songbook</button>';
      else{
        html+='<h2 id="panel-title">Over the River and Through the Wood</h2><p class="lh-byline">Lydia Maria Child · historical poem, 1845<br>Six selected verses · Lantern winter reading</p><p class="lh-muted">A snowy family journey, first written for Thanksgiving. In our first verse, we sing “grandmother” in place of “grandfather.”</p><button data-winter16="all">'+(all?'One verse at a time':'Read the whole song')+'</button><div class="winter-lyrics16">';
        verses.forEach(function winterVerse16(lines,i){
          if(!all&&i!==page)return;
          html+='<section><p class="lh-muted">Verse '+(i+1)+'</p><p>'+lines.map(escapeWinter16).join('<br>')+'</p></section>';
          /* Code by Daniel using ChatGPT November 13, 2026 */
        });
        html+='</div><div class="lh-row"><button data-winter16="previous" '+(page===0?'disabled':'')+'>← Previous verse</button><span>Verse '+(page+1)+' of '+verses.length+'</span><button data-winter16="next" '+(page===verses.length-1?'disabled':'')+'>Next verse →</button></div><button data-winter16="cover">Title page</button>';
      }
      html+='<div class="lh-row">'+(options.onHymnal?'<button data-winter16="hymnal">The carolers’ hymnal →</button>':options.standalone?'<a href="index.html">The carolers’ hymnal →</a>':'')+'</div><p class="winter-credit16">Historical words are public domain in the USA. <a href="https://rpo.library.utoronto.ca/content/new-england-boys-song-about-thanksgiving-day" target="_blank" rel="noopener noreferrer">Read the historical poem</a>.</p>';
      root.innerHTML=html;
      /* Code by Daniel using ChatGPT November 13, 2026 */
    }
    root.onclick=function chooseWinterPage16(event){
      const button=event.target.closest('button[data-winter16]');if(!button||!root.contains(button)||button.disabled)return;
      const action=button.dataset.winter16;
      if(action==='hymnal'){options.onHymnal?.();return;}
      if(action==='open')opened=true;
      if(action==='cover')opened=false;
      if(action==='all')all=!all;
      if(action==='next'||action==='previous'){page=Math.max(0,Math.min(verses.length-1,page+(action==='next'?1:-1)));options.onPage?.(page);}
      renderWinterBook16();root.querySelector('h3,h2')?.scrollIntoView({block:'nearest'});
      root.querySelector('[data-winter16="'+action+'"]:not(:disabled)')?.focus({preventScroll:true});
      /* Code by Daniel using ChatGPT November 13, 2026 */
    };
    renderWinterBook16();
    /* Code by Daniel using ChatGPT November 13, 2026 */
  }
};
