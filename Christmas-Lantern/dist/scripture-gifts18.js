'use strict';
// Authored scene affinities; the review/rationale lives outside the player UI.
const SCRIPTURE_ROOMS18 = {
  "Isaiah 9:2": {
    "primary": "sleigh",
    "secondary": [
      "pinepass"
    ]
  },
  "Isaiah 9:6": {
    "primary": "nativity",
    "secondary": [
      "closet"
    ]
  },
  "Micah 5:2": {
    "primary": "nativity",
    "secondary": [
      "closet"
    ]
  },
  "Matthew 1:21": {
    "primary": "nativity",
    "secondary": [
      "closet"
    ]
  },
  "Matthew 1:23": {
    "primary": "nativity",
    "secondary": [
      "sleigh",
      "closet"
    ]
  },
  "Luke 1:30-31": {
    "primary": "ornaments",
    "secondary": [
      "nativity"
    ]
  },
  "Luke 2:6-7": {
    "primary": "nativity",
    "secondary": [
      "closet"
    ]
  },
  "Luke 2:10-11": {
    "primary": "pinepass",
    "secondary": [
      "ornaments",
      "nativity"
    ]
  },
  "Luke 2:13-14": {
    "primary": "pinepass",
    "secondary": [
      "ornaments",
      "nativity"
    ]
  },
  "Luke 2:19": {
    "primary": "grandmother",
    "secondary": [
      "nativity"
    ]
  },
  "Matthew 2:10-11": {
    "primary": "gifts",
    "secondary": [
      "nativity"
    ]
  },
  "John 1:14": {
    "primary": "nativity",
    "secondary": [
      "closet"
    ]
  },
  "John 3:16": {
    "primary": "gifts",
    "secondary": [
      "cave"
    ]
  },
  "James 1:17": {
    "primary": "snowgarden",
    "secondary": [
      "gifts",
      "rink",
      "kitchen"
    ]
  },
  "2 Corinthians 9:15": {
    "primary": "gifts",
    "secondary": [
      "cave"
    ]
  },
  "1 John 4:9": {
    "primary": "gifts",
    "secondary": [
      "cave",
      "pinepass"
    ]
  },
  "Matthew 11:28-30": {
    "primary": "mountain",
    "secondary": [
      "grandmother",
      "cave"
    ]
  },
  "Mark 10:45": {
    "primary": "mountain",
    "secondary": [
      "workshop"
    ]
  },
  "Ephesians 2:8-10": {
    "primary": "workshop",
    "secondary": [
      "mountain",
      "gifts",
      "cave"
    ]
  },
  "1 Corinthians 15:3-4": {
    "primary": "cave",
    "secondary": []
  },
  "James 1:27": {
    "primary": "clockshop",
    "secondary": []
  },
  "Leviticus 19:33-34": {
    "primary": "clockshop",
    "secondary": []
  },
  "Galatians 5:13-14": {
    "primary": "workshop",
    "secondary": [
      "clockshop"
    ]
  },
  "Luke 2:12": {
    "primary": "nativity",
    "secondary": [
      "closet"
    ]
  },
  "Galatians 5:22-23": {
    "primary": "rink",
    "secondary": [
      "snowgarden",
      "workshop"
    ]
  },
  "Luke 19:1-10": {
    "primary": "hall",
    "secondary": [
      "cave"
    ]
  },
  "Titus 3:4-7": {
    "primary": "cave",
    "secondary": []
  },
  "1 John 3:16-18": {
    "primary": "workshop",
    "secondary": [
      "clockshop"
    ]
  },
  "Hebrews 13:1-2": {
    "primary": "hall",
    "secondary": [
      "grandmother"
    ]
  },
  "James 2:14-17": {
    "primary": "clockshop",
    "secondary": [
      "workshop"
    ]
  },
  "Matthew 25:35-40": {
    "primary": "clockshop",
    "secondary": []
  },
  "Romans 12:15": {
    "primary": "clockshop",
    "secondary": [
      "grandmother"
    ]
  },
  "Psalm 34:18": {
    "primary": "clockshop",
    "secondary": []
  },
  "Deuteronomy 10:18-19": {
    "primary": "clockshop",
    "secondary": []
  },
  "Genesis 1:27": {
    "primary": "clockshop",
    "secondary": []
  },
  "Colossians 3:17": {
    "primary": "workshop",
    "secondary": [
      "kitchen"
    ]
  },
  "John 11:25-26": {
    "primary": "clockshop",
    "secondary": []
  },
  "John 11:35": {
    "primary": "clockshop",
    "secondary": []
  },
  "1 Peter 2:24": {
    "primary": "cave",
    "secondary": []
  },
  "Romans 5:1": {
    "primary": "cave",
    "secondary": []
  }
};

function scriptureRoomWeight18(card,room){
  const affinity=SCRIPTURE_ROOMS18[reference09(card)];
  return affinity?.primary===room?3:affinity?.secondary.includes(room)?1:0;
  /* Code by Daniel using ChatGPT November 13, 2026 */
}
function buildGiftPages18(collection,seed){
  const signature=collection.map(function identity18(card){return card.id+':'+card.fingerprint+':'+reference09(card);/* Code by Daniel using ChatGPT November 13, 2026 */}).join('|');
  const random=Road.rng('scripture-gifts-18:'+seed+':'+Road.hash(signature));
  const deck=Road.shuffle(collection,random),covered=new Set(),pages=[];
  function surprise18(chosen){
    const index=deck.findIndex(function eligible18(card){return !chosen.has(card.id);/* Code by Daniel using ChatGPT November 13, 2026 */});
    if(index>=0)return deck.splice(index,1)[0];
    return Road.shuffle(collection,random).find(function different18(card){return !chosen.has(card.id);/* Code by Daniel using ChatGPT November 13, 2026 */});
    /* Code by Daniel using ChatGPT November 13, 2026 */
  }
  const limit=Math.max(1,Math.ceil(collection.length/GIFT_ROOMS09.length)+1);
  for(let page=0;page<limit;page++){
    const rooms={};
    for(const room of GIFT_ROOMS09){
      const chosen=new Set(),entries=[],pool=[];
      for(const card of collection){const weight=scriptureRoomWeight18(card,room);if(weight)pool.push({card,weight});}
      for(let n=0;n<2&&pool.length;n++){
        let total=0;for(const entry of pool)total+=entry.weight;
        let roll=random()*total,index=pool.length-1;
        for(let i=0;i<pool.length;i++){roll-=pool[i].weight;if(roll<0){index=i;break;}}
        const card=pool.splice(index,1)[0].card;
        chosen.add(card.id);covered.add(card.id);entries.push({card,kind:'aligned'});
      }
      while(entries.length<Math.min(3,collection.length)){
        const card=surprise18(chosen);if(!card)break;
        chosen.add(card.id);covered.add(card.id);entries.push({card,kind:'surprise'});
      }
      rooms[room]=entries;
    }
    pages.push(rooms);
    if(covered.size===collection.length)break;
  }
  return pages;
  /* Code by Daniel using ChatGPT November 13, 2026 */
}
function giftPages18(){
  const seed=state.play10?.scriptureGiftSeed18||'lantern';
  if(g.giftLayout18?.cards!==cards||g.giftLayout18.seed!==seed)g.giftLayout18={cards,seed,pages:buildGiftPages18(cards,seed)};
  return g.giftLayout18.pages;
  /* Code by Daniel using ChatGPT November 13, 2026 */
}
