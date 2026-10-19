'use strict';
const APP_EDITION='Grace & Boldness · October 3, 2026';
const THEMES={mixed:{name:'Mixed atmospheres',symbol:'◇',variants:['auto']},quiet:{name:'Simple Bible',symbol:'✝',variants:['plain','celtic-minimal','cross','celtic','flourish'],autoVariants:['plain','celtic-minimal']},victorian:{name:'Victorian Reverie',symbol:'✿',variants:['fern','lily','ivy']},space:{name:'Deep Space',symbol:'✧',variants:['nova','depth','orbit']},jungle:{name:'Jungle Adventure',symbol:'♧',variants:['canopy','river','forest']},traditional:{name:'Stained Glass',symbol:'✝',variants:['shepherd','bible','candle']},celestial:{name:'Celestial Chronicle',symbol:'⚔',variants:['watchman','messenger','light']},storm:{name:'Storm & Glory',symbol:'ϟ',variants:['bible','compass','lightning']},woodland:{name:'Woodland Chronicle',symbol:'☽',variants:['border','wonder'],autoVariants:['border']},desert:{name:'Desert Manuscript',symbol:'☼',variants:['lamp','arches','sunrise','shore'],autoVariants:['lamp','arches','sunrise']},ohana:{name:'Ohana Sunset',symbol:'☼',variants:['sunset']},summit:{name:'Summit & Sky',symbol:'△',variants:['ridge']},galilee:{name:'Galilee Spring',symbol:'☀',variants:['spring']},watercolor:{name:'Watercolor Creation',symbol:'≈',variants:['border','meadow','stream','sea']}};
const KINDS={person:{name:'Person',symbol:'❧',tint:'rose'},family:{name:'Family & household',symbol:'♧',tint:'gold'},church:{name:'Church & ministry',symbol:'⌂',tint:'blue'},heart:{name:'My own heart',symbol:'♡',tint:'purple'},suffering:{name:'Need & suffering',symbol:'☂',tint:'slate'},mission:{name:'Mission & world',symbol:'◇',tint:'teal'},story:{name:'God’s story',symbol:'⌁',tint:'green'},thanks:{name:'Thanksgiving',symbol:'☼',tint:'orange'}};
const ART={};
const STARTER=`# My Prayer Cards
<!-- desk: theme="mixed" scripture="true" large="false" shuffle-on-open="false" -->
<!-- Scripture quotations marked CSB have been taken from the Christian Standard Bible®, Copyright © 2017 by Holman Bible Publishers. Used by permission. Christian Standard Bible® and CSB® are federally registered trademarks of Holman Bible Publishers. -->

## Someone I love
<!-- card: type="person" tint="rose" art="auto" cadence="daily" -->

- Father, draw **[name]** nearer to Jesus and give them a growing love for your Word.
- Bring wisdom to the decision before them, boldness to do what is good, and friends who speak truth in love.
- Help me listen carefully and offer one practical act of care this week.

### Scripture
“put on compassion, kindness, humility, gentleness, and patience” — Colossians 3:12 (CSB excerpt)

### Story
[Date] — What are they carrying? What am I noticing as I pray?

## Our household
<!-- card: type="family" tint="gold" art="auto" cadence="daily" -->

- Lord, make our home a place of forgiveness, hospitality, and joyful faithfulness to Christ.
- Help us speak Christ’s word and be full of your grace. Let your will shape our words—with boldness, clarity, truth, and love.
- In Messiah Jesus you have given us everything we need for life and godliness. Teach us to draw on your grace and walk by your Spirit.
- Free us from the pull of our sinful desires and the world’s approval—from pride, lust, bitterness, and using people. Train our hearts and everyday habits to love as you love.

### Scripture
“Above all, put on love, which is the perfect bond of unity.” — Colossians 3:14 (CSB)

### Story
[Date] — Record a shared burden, a moment of grace, or a growing habit.

## Our church and its shepherds
<!-- card: type="church" tint="blue" art="auto" cadence="weekly" -->

- Jesus, build your church. Grow our elders in the grace and knowledge of you, our Lord and Savior; keep them humble, sustain them, and give them rest.
- Give them boldness to proclaim your Word as they ought, and wisdom to teach us the whole counsel of God faithfully and clearly.
- Strengthen love between generations and care for those easily overlooked. Teach us to receive your Word and obey it together.
- Help us use our gifts to build up your body and honor one another without chasing recognition.

### Scripture
“let us grow in every way into him who is the head—Christ” — Ephesians 4:15 (CSB excerpt)

### Story
[Date] — A person to encourage; a ministry to support; a need to remember.

## My own heart
<!-- card: type="heart" tint="purple" art="auto" cadence="daily" -->

- Heavenly Dad, in Jesus I ask you to show me where pride, fear, or self-reliance is keeping me from trusting you.
- Because Christ gave himself for me, teach me repentance and glad obedience.
- Name one specific habit to surrender, and one small faithful step to take today.

### Scripture
“He laid down his life for us.” — 1 John 3:16 (CSB excerpt)

### Story
[Date] — What do I need to confess? Where have I received mercy or learned dependence?

## Someone in suffering
<!-- card: type="suffering" tint="slate" art="auto" cadence="daily" -->

- God of mercy, sustain **[name]** in illness, grief, loneliness, or uncertainty.
- We ask for healing and relief, and trust your wisdom when the way is hard to understand.
- Give them hope in Christ and bring people who can carry the burden with them. Show me how to help.

### Scripture
“Carry one another’s burdens” — Galatians 6:2 (CSB excerpt)

### Story
[Date] — A change in the need; an offered meal; an honest conversation; a continuing question.

## Friends, neighbors, and the nations
<!-- card: type="mission" tint="teal" art="auto" cadence="weekly" -->

- Father, bring **[names / place]** to know Jesus, crucified and risen, and the grace of your gospel.
- Give missionaries and local believers boldness, wisdom, faithful teaching, and loving endurance.
- Open a door for me to listen, serve, and speak about Christ with boldness, deep grace, and clarity.

### Scripture
“salvation through our Lord Jesus Christ” — 1 Thessalonians 5:9 (CSB excerpt)

### Story
[Date] — An open conversation, a new relationship, or news from a ministry we support.

## A story still unfolding
<!-- card: type="story" tint="green" art="auto" cadence="weekly" -->

- Lord, I bring you this long-running situation: **[describe it simply]**.
- Help me ask honestly, persist patiently, and remain open to the way you are working.
- Form faithfulness through the waiting. Keep me from calling every event an answer when I do not yet understand.

### Scripture
“endurance produces proven character, and proven character produces hope” — Romans 5:4 (CSB excerpt)

### Story
[Date] — What has changed? What is unresolved? What grace can I thank God for along the way?

## Gifts I want to remember
<!-- card: type="thanks" tint="orange" art="auto" cadence="weekly" -->

- Father, thank you for salvation in Christ and the ordinary gifts I often overlook.
- Remember a person, a provision, a protection, or a changed heart; name the gift specifically.
- Teach me gratitude without ignoring the sorrow that may still be present.

### Scripture
“You have put more joy in my heart” — Psalm 4:7 (CSB excerpt)

### Story
[Date] — A gift to remember and a reason to praise the Lord.
`;

Object.assign(ART,{
  "quiet-olive": "assets/quiet-flourish.webp",
  "quiet-seed": "assets/quiet-cross.webp",
  "quiet-arches": "assets/quiet-celtic.webp",
  "victorian-fern": "assets/victorian-fern.webp",
  "victorian-lily": "assets/victorian-lily.webp",
  "victorian-ivy": "assets/victorian-ivy.webp",
  "space-orbit": "assets/space-orbit.webp",
  "space-constellation": "assets/space-constellation.webp",
  "space-dawn": "assets/space-dawn.webp",
  "jungle-canopy": "assets/jungle-canopy.webp",
  "jungle-river": "assets/jungle-river.webp",
  "jungle-forest": "assets/jungle-forest.webp",
  "traditional-bible": "assets/traditional-bible.webp",
  "traditional-window": "assets/traditional-window.webp",
  "traditional-candle": "assets/traditional-candle.webp",
  "celestial-watchman": "assets/celestial-watchman.webp",
  "celestial-messenger": "assets/celestial-messenger.webp",
  "celestial-light": "assets/celestial-light.webp",
  "storm-hands": "assets/storm-hands.webp",
  "storm-clearing": "assets/storm-clearing.webp",
  "storm-lightning": "assets/storm-lightning.webp",
  "woodland-lantern": "assets/woodland-lantern.webp",
  "woodland-path": "assets/woodland-path.webp",
  "woodland-arch": "assets/woodland-arch.webp",
  "desert-lamp": "assets/desert-lamp.webp",
  "desert-arches": "assets/desert-arches.webp",
  "desert-sunrise": "assets/desert-sunrise.webp",
  "watercolor-meadow": "assets/watercolor-meadow.webp",
  "watercolor-stream": "assets/watercolor-stream.webp",
  "watercolor-sea": "assets/watercolor-sea.webp"
});

Object.assign(ART,{"quiet-stillness":"assets/quiet-flourish.webp","victorian-reverie":"assets/victorian-reverie.webp","woodland-wonder":"assets/woodland-wonder.webp","desert-shore":"assets/desert-shore.webp","watercolor-pigment":"assets/watercolor-pigment.webp","summit-ridge":"assets/summit-ridge.webp","galilee-spring":"assets/galilee-spring.webp"});

Object.assign(ART,{"quiet-simple": "assets/quiet-cross.webp", "storm-bible": "assets/storm-bible.webp", "storm-compass": "assets/storm-compass.webp", "traditional-shepherd": "assets/traditional-shepherd.webp", "woodland-border": "assets/woodland-border.webp", "watercolor-border": "assets/watercolor-border.webp", "space-nova": "assets/space-nova.webp", "space-depth": "assets/space-depth.webp", "ohana-sunset": "assets/ohana-sunset.webp"});

const JOURNEYS={
mixed:{mode:'compact',place:'top',stages:['First steps','Shared paths','Open horizons','New vistas'],verse:'spirit'},
quiet:{mode:'plain',place:'top'},
victorian:{mode:'subtle',place:'bottom',stages:['First page','Garden journal','Rose walk','Long afternoon'],verse:'love'},
space:{mode:'journey',place:'top',stages:['First light','Star field','Deep orbit','Distant horizon'],verse:'heavens'},
jungle:{mode:'journey',place:'top',stages:['Trailhead','River trail','Canopy clearing','New horizons'],verse:'flowers'},
traditional:{mode:'subtle',place:'bottom',stages:['First window','Morning light','Chapel garden','Evening light'],verse:'jesus'},
celestial:{mode:'journey',place:'top',stages:['First watch','Lantern light','Open horizon','New dawn'],verse:'spirit'},
storm:{mode:'compact',place:'top',stages:['First light','Storm watch','Clearing skies','Far horizon'],verse:'requests'},
woodland:{mode:'journey',place:'top',stages:['Garden gate','Forest path','Cedar glade','Golden canopy'],verse:'cedar'},
desert:{mode:'subtle',place:'bottom',stages:['First page','Desert path','Oasis shade','Evening quiet'],verse:'seek'},
summit:{mode:'journey',place:'top',stages:['Trailhead','Ridgeline','Summit view','Beyond the horizon'],verse:'help'},
galilee:{mode:'journey',place:'top',stages:['Little seed','Wildflower meadow','Lakeside path','Sunny hillside'],verse:'flowers'},
watercolor:{mode:'subtle',place:'bottom',stages:['First wash','Gentle color','Open sky','New canvas'],verse:'heavens'},
ohana:{mode:'subtle',place:'bottom',stages:['First shore','Ocean breeze','Evening glow','Quiet horizon'],verse:'peace'}
};
const JOURNEY_VERSES={
spirit:{text:'Pray at all times in the Spirit',ref:'Ephesians 6:18',source:'https://www.biblegateway.com/passage/?search=Ephesians+6%3A18&version=CSB'},
abide:{text:'You can do nothing without me.',ref:'John 15:5',source:'https://www.biblegateway.com/passage/?search=John+15%3A5&version=CSB'},
love:{text:'Above all, put on love, which is the perfect bond of unity.',ref:'Colossians 3:14',source:'https://www.biblegateway.com/passage/?search=Colossians+3%3A14&version=CSB'},
heavens:{text:'The heavens declare the glory of God, and the expanse proclaims the work of his hands.',ref:'Psalm 19:1',source:'https://www.biblegateway.com/passage/?search=Psalm+19%3A1&version=CSB'},
flowers:{text:'Consider how the wildflowers grow',ref:'Luke 12:27',source:'https://www.biblegateway.com/passage/?search=Luke+12%3A27&version=CSB'},
jesus:{text:'Jesus the Son of God … let us approach the throne of grace with boldness',ref:'Hebrews 4:14, 16',source:'https://www.biblegateway.com/passage/?search=Hebrews+4%3A14-16&version=CSB'},
requests:{text:'present your requests to God.',ref:'Philippians 4:6',source:'https://www.biblegateway.com/passage/?search=Philippians+4%3A6&version=CSB'},
cedar:{text:'The righteous thrive like a palm tree and grow like a cedar tree in Lebanon.',ref:'Psalm 92:12',source:'https://www.biblegateway.com/passage/?search=Psalm+92%3A12&version=CSB'},
seek:{text:'God, you are my God; I eagerly seek you.',ref:'Psalm 63:1',source:'https://www.biblegateway.com/passage/?search=Psalm+63%3A1&version=CSB'},
help:{text:'My help comes from the LORD, the Maker of heaven and earth.',ref:'Psalm 121:2',source:'https://www.biblegateway.com/passage/?search=Psalm+121%3A2&version=CSB'},
peace:{text:'I will both lie down and sleep in peace, for you alone, LORD, make me live in safety.',ref:'Psalm 4:8',source:'https://www.biblegateway.com/passage/?search=Psalm+4%3A8&version=CSB'}
};

const COMPLETION_VERSE={text:'The prayer of a righteous person is very powerful in its effect.',source:'https://www.biblegateway.com/passage/?search=James+5%3A16&version=CSB'};

Object.assign(ART,{"quiet-cross": "assets/quiet-cross.webp", "quiet-celtic": "assets/quiet-celtic.webp", "quiet-flourish": "assets/quiet-flourish.webp"});

Object.assign(ART,{'quiet-plain':'','quiet-celtic-minimal':'assets/quiet-celtic-minimal.webp'});
