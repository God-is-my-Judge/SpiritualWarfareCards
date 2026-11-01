/* The Delving · riddle data.
   Content source: “The Forty Doors of the Delving” outline (October 2026), condensed; the Bronze Sea is Daniel’s.
   Schema and interaction kinds: see README.md in this folder.
   Text is original; Scripture is cited by reference and linked (CSB), not quoted at length. */
window.DELVING = {
  version: 2,
  acts: [
    {id: 'outer', numeral: 'I', title: 'The Outer Doors', subtitle: 'Where the delving begins', scene: 'door', guide: 'Welcome beneath the white terraces. Take a lamp. We have opened these doors before, but wisdom begins by reading again.'},
    {id: 'lamps', numeral: 'II', title: 'The Lamp Gallery', subtitle: 'Lamplight and old patterns', scene: 'stair', guide: 'A lamp may reveal a pattern; it cannot tell you what every shadow means. Let the words guide your counting.'},
    {id: 'statues', numeral: 'III', title: 'The Hall of Statues', subtitle: 'Statues of the tribes', scene: 'hall', guide: 'We carve names so that we remember people, not merely totals. Count carefully, and remember whom you count.'},
    {id: 'cisterns', numeral: 'IV', title: 'The Cisterns', subtitle: 'Water held in stone', scene: 'cistern', guide: 'Water gathers slowly in the dark. So does understanding. There is no shame in asking for another light.'},
    {id: 'stair', numeral: 'V', title: 'The Long Stair', subtitle: 'A stair cut into the mountain', scene: 'long-stair', guide: 'Some numbers are written plainly. Others invite reflection. Our ledger keeps the difference between them.'},
    {id: 'vaults', numeral: 'VI', title: 'The Gem Vaults', subtitle: 'Where the stones are kept', scene: 'gems', guide: 'We have spent ages seeking bright stones. A true answer is rarer, and worth more than a clever one.'},
    {id: 'workings', numeral: 'VII', title: 'The Deep Workings', subtitle: 'Where the elves still dig', scene: 'workshop', guide: 'You can hear the picks below us. Even an old mountain has work left in it; even an old delver has more to learn.'},
    {id: 'echo', numeral: 'VIII', title: 'The Echoing Stair', subtitle: 'Voices from below', scene: 'cascade', guide: 'An echo repeats a voice, but it does not explain it. Return to the passage before trusting a familiar saying.'},
    {id: 'court', numeral: 'IX', title: 'The Court Below the Mountain', subtitle: 'A court of bronze and gold', scene: 'court', guide: 'These measures describe a place of worship. Beyond every measure, remember the One whom the builders sought to honor.'},
    {id: 'last', numeral: 'X', title: 'The Last Door', subtitle: 'The riddle of all numbers', scene: 'deep', guide: 'Our copies and our readings deserve patient care. Carry what is clear with confidence, and what is uncertain with humility.'}
  ],
  /* The twelve stones of the high priest’s breastpiece (Exodus 28:17–20), awarded every third door in this order.
     Names follow common modern translations; ancient identifications are uncertain. */
  gems: [
    {id: 'carnelian', name: 'Carnelian', color: '#b3261e'},
    {id: 'topaz', name: 'Topaz', color: '#e3a72f'},
    {id: 'emerald', name: 'Emerald', color: '#2e8b57'},
    {id: 'turquoise', name: 'Turquoise', color: '#30b5b0'},
    {id: 'lapis', name: 'Lapis lazuli', color: '#2b4fa3'},
    {id: 'diamond', name: 'Diamond', color: '#dfeef4'},
    {id: 'jacinth', name: 'Jacinth', color: '#d9622b'},
    {id: 'agate', name: 'Agate', color: '#9c6b4f'},
    {id: 'amethyst', name: 'Amethyst', color: '#8e5ab5'},
    {id: 'beryl', name: 'Beryl', color: '#7fc7c4'},
    {id: 'onyx', name: 'Onyx', color: '#3b3b3b'},
    {id: 'jasper', name: 'Jasper', color: '#b04a3a'}
  ],
  certainty: {
    explicit: 'Stated in Scripture',
    inference: 'Reasonable reading of the text',
    interpretation: 'One interpretation among several',
    disputed: 'Faithful Christians differ',
    variant: 'A manuscript difference'
  },
  intro: [
    'Beneath the roots of the mountains lie forty doors.',
    'No sword opens them. No spell commands them.',
    'Upon each is graven a number, and behind every number lies a word.',
    'Count truly. Read carefully. For not every pattern is a promise,',
    'and not every mystery is solved by arithmetic.'
  ],
  ending: [
    'And when the fortieth door opens, the delvers find no treasure of gold.',
    'There is only a road climbing upward toward dawn.',
    'For the numbers were signposts.',
    'The Word was the treasure.'
  ],
  /* Order: Genesis to begin, a prophet at door 3, then never more than two doors of one topic in a row,
     while answers still build (40 → 40 → 40; 12 baskets → 12 sons → 12 stones; 8 saved → the ark). */
  frames: [
    /* ───────── I · The Outer Doors ───────── */
    {id: 'seven-lamps', door: 1, act: 'outer', stars: 1, scene: 'seven-lamps', lampsWake: true, title: 'The Seven Lamps',
     setting: 'Seven lamps burn low in the arch above the first door. Each brightens when it is set in its rightful place.',
     parts: [
       {kind: 'order', prompt: 'Set the lamps in the order of the creation week.', items: ['Light without sun', 'The waters divided', 'Dry land rises green', 'Lights to govern heaven', 'Wing and fin', 'Beast and humankind', 'God rests']}
     ],
     hints: [
       {kind: 'text', text: 'Genesis 1 numbers each day. The seventh lamp holds no work at all.'}
     ],
     answer: 'The seventh lamp is rest: God rested from his work on the seventh day.',
     lore: ['The seventh day completes the creation week and grounds the Sabbath. Seven often carries associations of completion and sacred rest, though Scripture never gives a dictionary saying “seven always means completeness.”'],
     certainty: 'explicit',
     refs: ['Genesis 1:1–2:3']},

    {id: 'green-door', door: 2, act: 'outer', stars: 1, scene: 'door', title: 'The Green Door',
     setting: 'Silver vines curl around a door marked with a single number.',
     inscription: [
       'Before beast walked and before man breathed,',
       'grass and seed and fruit-bearing tree clothed the earth.',
       'Upon what day?'
     ],
     parts: [
       {kind: 'choice', prompt: 'Which day?', options: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'], correct: 2}
     ],
     answer: 'Day 3: dry land appears and the earth brings forth vegetation.',
     lore: ['Plants come before the lights of Day 4 and the creatures of Days 5 and 6.'],
     certainty: 'explicit',
     refs: ['Genesis 1:9–13']},

    {id: 'jonah', door: 3, act: 'outer', stars: 2, scene: 'river', title: 'The Fish and the City', gem: 'carnelian',
     setting: 'A great fish is carved beneath one inscription, a vast city beneath another.',
     parts: [
       {kind: 'numbers', prompt: 'Jonah’s two numbers:', template: 'In the fish {0} days and nights. Nineveh warned of judgment in {1} days.', answers: [{value: 3, accept: ['three']}, {value: 40, accept: ['forty']}]}
     ],
     answer: '3 days and nights; 40 days.',
     lore: ['Jesus connects Jonah’s three days with his own death and resurrection, and Nineveh’s repentance rebukes those who meet someone greater than Jonah yet refuse him.'],
     certainty: 'explicit',
     refs: ['Jonah 1:17', 'Jonah 3:4', 'Matthew 12:39–41']},

    {id: 'garden-late', door: 4, act: 'outer', stars: 2, scene: 'passage', title: 'The Garden That Seems Too Late',
     setting: 'Beyond the door another inscription: “Yet afterward the LORD planted a garden…”',
     parts: [
       {kind: 'choice', prompt: 'Genesis 1 places vegetation on Day 3. On what numbered day does Genesis 2 say God made the plants?', options: ['Day 3', 'Day 6', 'Day 7', 'Genesis 2 gives no numbered day'], correct: 3}
     ],
     hints: [
       {kind: 'text', text: 'Read Genesis 2:8 slowly. What did the LORD plant, and where?'}
     ],
     answer: 'Genesis 2 gives no numbered day. It tells of God planting a garden in Eden.',
     lore: [
       'One reasonable harmonization: Genesis 1 describes vegetation generally, while Genesis 2 focuses on God preparing a particular garden for Adam. Genesis 2:5 speaks of the “shrub of the field” and “plant of the field,” whose precise meaning is debated.',
       'Once you notice that Genesis 2 has turned from the cosmic account to Eden, humanity, vocation, marriage and covenant relationship, the supposed contradiction largely disappears.'
     ],
     certainty: 'inference',
     refs: ['Genesis 2:4–9']},

    /* ───────── II · The Lamp Gallery ───────── */
    {id: 'number-seven', door: 5, act: 'lamps', stars: 1, scene: 'stair', title: 'The Number Seven',
     setting: 'Seven stars burn above seven empty sockets.',
     inscription: ['Six labored toward it.', 'One completed them.', 'Israel rested by it.'],
     parts: [
       {kind: 'multi', prompt: 'Seven commonly suggests… (choose two)', options: ['Completion or fullness', 'Testing', 'Rest or Sabbath', 'Judgment', 'Sacred order'], correct: [0, 2, 4], min: 2, max: 2}
     ],
     answer: 'Completion or fullness, and rest. Sacred order is also defensible.',
     lore: [
       'The seven-day week (Genesis 1–2), the seventh-day Sabbath (Exodus 20:8–11), the seven-year cycle (Leviticus 25) and the sevenfold patterns of Revelation.',
       'Number symbolism should rise from repeated biblical use, not from inventing secret meanings for every seven.'
     ],
     certainty: 'interpretation',
     refs: ['Genesis 2:1–3', 'Exodus 20:8–11', 'Leviticus 25:1–7']},

    {id: 'greater-wilderness', door: 6, act: 'lamps', stars: 2, scene: 'long-stair', title: 'The Greater Wilderness', gem: 'topaz',
     setting: 'Two paths disappear into painted wildernesses.',
     parts: [
       {kind: 'numbers', prompt: 'What number binds the two stories?', template: 'Israel wandered for {0} years. Jesus fasted in the wilderness for {1} days.', answers: [{value: 40, accept: ['forty']}, {value: 40, accept: ['forty']}]}
     ],
     answer: '40 years; 40 days.',
     lore: ['Matthew presents Jesus in ways that recall Israel. Israel, God’s “son,” passes through the waters into the wilderness; Jesus, God’s Son, passes through baptism into the wilderness. Where Israel failed, Christ remained faithful.'],
     certainty: 'explicit',
     refs: ['Numbers 14:33–34', 'Matthew 2:15', 'Matthew 3:13–4:11']},

    {id: 'beasts-adam', door: 7, act: 'lamps', stars: 2, scene: 'gems', title: 'The Beasts Before Adam… or After?',
     setting: 'Stone animals stand in a ring around the chamber, each facing the center.',
     parts: [
       {kind: 'multi', prompt: 'Genesis 1 places land animals on Day 6. Genesis 2:19 may sound as though they came after Adam. Which observations help both accounts stand? Choose all that help.', options: ['Genesis 1 supplies the larger chronology; both events sit within Day 6', 'Genesis 2:19 can be read “the LORD God had formed” the animals', 'God brought the animals to Adam to see what he would name them', 'God made the animals only so that Adam would have something to name'], correct: [0, 1, 2], min: 3}
     ],
     answer: 'The first three. God brought the animals to Adam to see what he would call them; the text does not say naming was the reason God made them.',
     lore: [
       'The Hebrew verb in Genesis 2:19 does not require the animals to have been made only after Adam.',
       'Safe to say: God brought the animals to Adam, and whatever Adam called each creature became its name. Going beyond the text: claiming God created them for the purpose of being named.'
     ],
     certainty: 'inference',
     refs: ['Genesis 1:24–31', 'Genesis 2:18–20']},

    {id: 'not-forty', door: 8, act: 'lamps', stars: 1, scene: 'passage', title: 'The Number That Does Not Belong',
     setting: 'Four numbers glow upon the wall: 7, 12, 40, 50.',
     parts: [
       {kind: 'choice', prompt: 'Which is not normally associated with 40?', options: ['Jesus’ testing in the wilderness', 'Israel’s wilderness generation', 'The rain of Noah’s Flood', 'Jubilee'], correct: 3}
     ],
     answer: 'Jubilee, which belongs to the fiftieth year.',
     lore: ['Jesus fasted 40 days (Matthew 4:2); Israel wandered 40 years (Numbers 14:33–34); rain fell 40 days and nights (Genesis 7:12).'],
     certainty: 'explicit',
     refs: ['Matthew 4:2', 'Numbers 14:33–34', 'Genesis 7:12', 'Leviticus 25:10']},

    /* ───────── III · The Hall of Statues ───────── */
    {id: 'five-two', door: 9, act: 'statues', stars: 2, scene: 'hall', title: 'Five Loaves, Two Fish', gem: 'emerald',
     setting: 'Five stone loaves and two silver fish rest in a child’s basket.',
     parts: [
       {kind: 'formula', prompt: 'A boy brings bread and fish.', prefix: 'loaves + fish:', expr: '{0} + {1}', suffix: 'food items', tray: [5, 2, 7, 12], expect: [5, 2], showResult: true},
       {kind: 'numbers', prompt: 'After Jesus feeds the multitude, how many baskets of fragments remain?', template: '{0} baskets', answers: [{value: 12, accept: ['twelve']}]}
     ],
     answer: '12 baskets.',
     lore: ['Twelve baskets invite comparison with Israel’s twelve tribes, though the Gospel does not say so. The clearest emphasis is the abundance and sufficiency of Christ’s provision.'],
     certainty: 'explicit',
     refs: ['John 6:1–13', 'Matthew 14:13–21']},

    {id: 'twelve-sons', door: 10, act: 'statues', stars: 2, scene: 'hall', title: 'Twelve Sons, Twelve Tribes… but Not Quite',
     setting: 'Statues of the tribes stand in a circle. Two bear the names Ephraim and Manasseh. One named Levi stands apart.',
     parts: [
       {kind: 'numbers', prompt: 'How many sons did Jacob have?', template: 'Jacob had {0} sons.', answers: [{value: 12, accept: ['twelve']}]},
       {kind: 'multi', prompt: 'Why can Israel still be called twelve tribes when Joseph sometimes becomes two? Choose all that apply.', options: ['Joseph’s inheritance can be counted through his two sons, Ephraim and Manasseh', 'Levi is often left out of land allotments because the Levites served the sanctuary', 'Lists vary by purpose while keeping the covenant pattern of twelve', 'Two of Jacob’s sons were removed from Israel'], correct: [0, 1, 2], min: 3}
     ],
     answer: '12 sons. Lists keep the pattern of twelve while their names vary: Joseph through Ephraim and Manasseh, with Levi set apart.',
     lore: ['Compare Genesis 35:22–26 with Genesis 48, Numbers 1 and Joshua 13–21.'],
     certainty: 'explicit',
     refs: ['Genesis 35:22–26', 'Genesis 48:5', 'Numbers 1', 'Joshua 13:14']},

    {id: 'eighth-step', door: 11, act: 'statues', stars: 2, scene: 'terraces', title: 'The Eighth Step',
     setting: 'Seven steps lead upward. There is, unexpectedly, an eighth.',
     parts: [
       {kind: 'multi', prompt: 'Why have Christians sometimes linked 8 with a new beginning? Choose at least two biblical patterns.', options: ['Eight people were brought safely through the Flood', 'Circumcision took place on the eighth day', 'Jesus rose on the first day of a new week, which early Christians called an “eighth day”', 'The Hebrew word for eight means “rebirth”', 'Eight tribes crossed the Jordan first'], correct: [0, 1, 2], min: 2}
     ],
     answer: 'Any two of the first three. The Hebrew word does not mean rebirth.',
     lore: ['The Hebrew for eight, shemoneh, does not lexically mean “rebirth.” “8 = new beginning” is a Christian typological association drawn from these patterns, not a definition of the word.'],
     certainty: 'interpretation',
     refs: ['1 Peter 3:20', 'Genesis 17:12', 'Leviticus 12:3', 'Matthew 28:1']},

    {id: 'ark-ratio', door: 12, act: 'statues', stars: 2, scene: 'tribes', title: 'The Long Black Ship', gem: 'turquoise',
     setting: 'A long vessel is carved along the base of the door. Beside it are the ark’s dimensions in cubits: 300 × 50 × 30.',
     parts: [
       {kind: 'formula', prompt: 'The ark was 300 cubits long and 50 wide. Reduce the length to width.', expr: '{0} ÷ {1}', suffix: ': 1', tray: [300, 50, 30, 6], expect: [300, 50], showResult: true}
     ],
     answer: '6 : 1 (300 long, 50 wide, 30 high).',
     lore: ['Genesis gives the ark’s dimensions in cubits: 300 × 50 × 30.'],
     certainty: 'explicit',
     refs: ['Genesis 6:15']},

    /* ───────── IV · The Cisterns ───────── */
    {id: 'breastpiece', door: 13, act: 'cisterns', stars: 2, scene: 'cistern', reveal: 'breastpiece', title: 'Stones Upon a Heart',
     setting: 'Beyond this door, the delvers say, a jeweled breastpiece lies upon a stone altar.',
     parts: [
       {kind: 'numbers', prompt: 'How many stones rested on the high priest’s breastpiece?', template: '{0} stones', answers: [{value: 12, accept: ['twelve']}]},
       {kind: 'choice', prompt: 'Why that number?', options: ['One for each month', 'One for each tribe of Israel', 'One for each apostle'], correct: 1}
     ],
     answer: '12 stones, each engraved with the name of a tribe.',
     lore: ['The high priest carried the names of God’s covenant people over his heart when he went in before the LORD.'],
     certainty: 'explicit',
     refs: ['Exodus 28:15–21, 29']},

    {id: 'turtledoves', door: 14, act: 'cisterns', stars: 2, scene: 'river', title: 'The Turtledove Question',
     setting: 'Birds are carved in flight across the stone door.',
     parts: [
       {kind: 'numbers', prompt: 'How many turtledoves came aboard the ark?', template: '{0}', answers: [{value: 14, values: [0, 7, 14], accept: ['zero', 'none', 'no', 'seven pairs', '7 pairs', 'fourteen', 'seven']}]}
     ],
     hints: [
       {kind: 'text', text: 'Genesis never names the turtledove, but the Law counts it a clean bird (Leviticus 1:14). How did clean birds come aboard (Genesis 7:2–3)?'}
     ],
     answer: 'Genesis names none. But turtledoves are clean birds, and clean birds came “by sevens”: seven pairs, fourteen birds, in most translations. Either answer opens the door.',
     lore: [
       'A dove is mentioned when Noah sends it out; a turtledove is never named. Genesis gives no species-by-species manifest.',
       'The Hebrew “seven seven” in Genesis 7:2–3 is usually read as seven pairs (so the CSB); some read it as seven individuals. Unclean kinds came by a single pair.'
     ],
     certainty: 'inference',
     refs: ['Genesis 7:2–3', 'Leviticus 1:14', 'Genesis 8:6–12']},

    {id: 'river-measures', door: 15, act: 'cisterns', stars: 3, scene: 'temple-river', title: 'The River of Four Measurements', gem: 'lapis',
     setting: 'Water flows beneath a sealed temple door. A measuring line is stretched again and again.',
     parts: [
       {kind: 'order', prompt: 'Order the depths as the guide measured them.', items: ['Ankle-deep', 'Knee-deep', 'Waist-deep', 'Too deep to cross']},
       {kind: 'numbers', prompt: 'Four measures of a thousand cubits each:', template: '{0} cubits in all', answers: [{value: 4000}]}
     ],
     answer: '4,000 cubits, growing from ankle-deep to a river too deep to cross.',
     lore: ['The river flows from God’s sanctuary and gives life wherever it goes, a theme echoed in Revelation 22:1–2.'],
     certainty: 'explicit',
     refs: ['Ezekiel 47:1–12', 'Revelation 22:1–2']},

    {id: 'release', door: 16, act: 'cisterns', stars: 2, scene: 'terraces', title: 'The Lock of Release',
     setting: 'Wheat is carved across a locked gate. Beside it hangs a tablet recording debts, waiting to be wiped clean.',
     parts: [
       {kind: 'numbers', prompt: 'After how many years did Israel’s law command a release of debts?', template: 'Every {0} years', answers: [{value: 7, accept: ['seven']}]}
     ],
     answer: 'Every seven years.',
     lore: ['The release belonged to Israel’s covenant social order, restraining perpetual poverty and debt bondage. Deuteronomy even anticipates the temptation to refuse generosity as the seventh year drew near (15:7–11), which makes the command remarkably realistic about the human heart.'],
     certainty: 'explicit',
     refs: ['Deuteronomy 15:1–11']},

    /* ───────── V · The Long Stair ───────── */
    {id: 'field-rests', door: 17, act: 'stair', stars: 2, scene: 'long-stair', title: 'The Field That Must Rest',
     setting: 'The next gate refuses every key except the number of a Sabbath year.',
     parts: [
       {kind: 'reflect', prompt: 'In your own words: what is a sabbatical year? Your answer must carry its number.', mustInclude: ['7', 'seven', 'seventh'], placeholder: 'Every … year, the land…'}
     ],
     answer: 'Every seventh year Israel’s land received a Sabbath rest, with no ordinary sowing and reaping.',
     lore: ['The pattern extends the Sabbath: the seventh day for people, the seventh year for the land.'],
     certainty: 'explicit',
     refs: ['Leviticus 25:1–7']},

    {id: 'manna', side: true, act: 'stair', stars: 3, scene: 'workshop', title: 'The Manna Equation', keepsake: 'An omer jar',
     setting: 'A side passage holds a small clay jar and a row of seven empty bowls.',
     parts: [
       {kind: 'formula', prompt: 'One omer each ordinary gathering day for five days, a double portion on the sixth, none on the seventh. Fill the week.', expr: '{0} + {1} + {2} + {3} + {4} + {5} + {6}', suffix: 'omers', tray: [1, 1, 1, 1, 1, 2, 0, 3], expect: [1, 1, 1, 1, 1, 2, 0], showResult: true}
     ],
     answer: '7 omers. The sixth day’s double portion let Israel rest on the seventh.',
     lore: ['Provision and rest are woven together: the gift of the sixth day makes room for the seventh.'],
     certainty: 'explicit',
     refs: ['Exodus 16:16, 22–30']},

    {id: 'two-catches', door: 18, act: 'stair', stars: 3, scene: 'cistern', title: 'The Unnumbered Catch and the Numbered Catch', gem: 'diamond',
     setting: 'A bronze net hangs over a black pool.',
     parts: [
       {kind: 'choice', prompt: 'How many fish did Peter catch when Jesus first called him?', options: ['153', '12', 'The number is not given', '7'], correct: 2},
       {kind: 'numbers', prompt: 'And in the great catch after the resurrection?', template: '{0} large fish', answers: [{value: 153}]}
     ],
     answer: 'First catch (Luke 5): no number given. Later catch (John 21): 153.',
     lore: ['Many symbolic explanations for 153 have been proposed. John does not explain the number, so speculation should not become doctrine.'],
     certainty: 'explicit',
     refs: ['Luke 5:1–11', 'John 21:1–11']},

    {id: 'seven-sevens', door: 19, act: 'stair', stars: 3, scene: 'stair', title: 'Seven Sevens',
     setting: 'Seven rings turn within seven larger rings.',
     parts: [
       {kind: 'formula', prompt: 'How many years do seven sabbatical cycles span before Jubilee?', expr: '{0} × {1}', suffix: 'years', tray: [7, 7, 6, 12, 50], expect: [7, 7], showResult: true}
     ],
     answer: '49 years: seven cycles of seven. Then the fiftieth year is consecrated.',
     lore: ['“You shall consecrate the fiftieth year…”: Leviticus counts seven sevens of years, then proclaims Jubilee.'],
     certainty: 'explicit',
     refs: ['Leviticus 25:8–12']},

    {id: 'ark-volume', door: 20, act: 'stair', stars: 3, scene: 'gems', title: 'The Cubic Ark',
     setting: 'The next lock demands multiplication.',
     parts: [
       {kind: 'formula', prompt: 'Using the outer dimensions alone:', expr: '{0} × {1} × {2}', suffix: 'cubic cubits', tray: [300, 50, 30, 3, 15], expect: [300, 50, 30], commutative: true, showResult: true}
     ],
     answer: '450,000 cubic cubits. This is only a rough outer volume, not the usable space. Genesis also records three decks.',
     lore: ['Genesis 6:16 mentions lower, second and third decks.'],
     certainty: 'explicit',
     refs: ['Genesis 6:15–16']},

    /* ───────── VI · The Gem Vaults ───────── */
    {id: 'refuge', door: 21, act: 'vaults', stars: 2, scene: 'river', title: 'Cities on Either Side', gem: 'jacinth',
     setting: 'A relief map beside the door shows the Jordan and the cities on either side. An open gate marks each city.',
     parts: [
       {kind: 'formula', prompt: 'Three stand beyond the Jordan; three stand within Canaan. Build the sum.', expr: '{0} + {1}', suffix: 'cities of refuge', tray: [3, 3, 6, 12, 2], expect: [3, 3], showResult: true}
     ],
     answer: '6 cities of refuge.',
     lore: ['The cities protected someone who caused a death without premeditation until proper judgment, showing concern for both justice and protection from blood vengeance.'],
     certainty: 'explicit',
     refs: ['Numbers 35:6, 13–15', 'Deuteronomy 4:41–43', 'Joshua 20']},

    {id: 'four-creatures', door: 22, act: 'vaults', stars: 3, scene: 'geodes', title: 'Four Creatures of the Storm',
     setting: 'Four great statues guard a wheel within a wheel. Each bears four faces.',
     parts: [
       {kind: 'formula', prompt: 'Living creatures times faces:', expr: '{0} × {1}', suffix: 'face-aspects', tray: [4, 4, 6, 2], expect: [4, 4], showResult: true},
       {kind: 'multi', prompt: 'Which faces did each creature bear?', options: ['Human', 'Lion', 'Horse', 'Ox', 'Eagle', 'Dove'], correct: [0, 1, 3, 4], min: 4}
     ],
     answer: '16 face-aspects: human, lion, ox and eagle. Each creature also had four wings.',
     lore: ['The meaning of every detail is debated, but the vision overwhelmingly conveys the majesty, power and universal sovereignty surrounding the glory of God.'],
     certainty: 'explicit',
     refs: ['Ezekiel 1:5–11']},

    {id: 'fifteen-cubits', door: 23, act: 'vaults', stars: 3, scene: 'cistern', title: 'The Waterline',
     setting: 'A scene carved into the cavern wall shows mountain peaks beneath a high waterline. The measurement once marked beside it has worn away.',
     parts: [
       {kind: 'numbers', prompt: 'How far above the mountains did the waters prevail, in the cubits of the Hebrew text?', template: '{0} cubits', answers: [{value: 15, accept: ['fifteen']}]},
       {kind: 'numbers', prompt: 'With a cubit of about a foot and a half, about how many feet is that?', template: 'about {0} feet', answers: [{value: 22.5, tolerance: 2.5}]}
     ],
     hints: [
       {kind: 'text', text: 'Genesis 7:20. Some translations, such as the CSB, give the depth in feet (“more than twenty feet”); the Hebrew counts it in cubits.'},
       {kind: 'equation', text: '15 × 1.5 ft = 22.5 ft'}
     ],
     answer: '15 cubits, about 22½ feet, not “15 feet.”',
     lore: [
       'Some global-Flood models propose that mountains were lower before the Flood and that great uplift accompanied or followed it. Other Christians read the language geographically and propose a catastrophic regional Flood.',
       'Genesis stresses the overwhelming universality of the judgment in Noah’s world; it does not explain the geophysics of today’s mountain heights. A model should not be confused with the text itself.'
     ],
     certainty: 'disputed',
     refs: ['Genesis 7:19–20']},

    {id: 'pentecost', door: 24, act: 'vaults', stars: 3, scene: 'door', title: 'Seven Weeks and One Morning', gem: 'agate',
     setting: 'Forty-nine silver marks surround a single golden one.',
     parts: [
       {kind: 'numbers', prompt: 'Seven weeks, and one day more:', template: '7 × 7 = {0} days; one more day is day {1}', answers: [{value: 49}, {value: 50, accept: ['fifty']}]},
       {kind: 'choice', prompt: 'What feast arrives on that day?', options: ['Passover', 'Pentecost, the Feast of Weeks', 'Tabernacles', 'Purim'], correct: 1}
     ],
     answer: 'Pentecost, the Feast of Weeks, on the 50th day. Pentēkostē means “fiftieth.”',
     lore: ['In Acts 2 the Spirit is poured out at Pentecost, empowering Christ’s witnesses and opening a new stage in God’s gathering of the nations.'],
     certainty: 'explicit',
     refs: ['Leviticus 23:15–16', 'Acts 2:1–4']},

    /* ───────── VII · The Deep Workings ───────── */
    {id: 'five-stones', door: 25, act: 'workings', stars: 3, scene: 'workshop', title: 'The Brook Stones',
     setting: 'Smooth stones from a brook lie beside a shepherd’s sling.',
     parts: [
       {kind: 'numbers', prompt: 'Count them true:', template: 'David chose {0} stones and the text describes him using {1}.', answers: [{value: 5, accept: ['five']}, {value: 1, accept: ['one']}]},
       {kind: 'choice', prompt: 'Why did David take five?', options: ['Each stood for a virtue', 'For Goliath’s four relatives', 'The Bible does not say'], correct: 2}
     ],
     answer: 'Five chosen, one used. The Bible does not say why five.',
     lore: ['Claims that each stone represented a virtue, or that the others were surely meant for Goliath’s relatives, go beyond this passage.'],
     certainty: 'explicit',
     refs: ['1 Samuel 17:40, 49']},

    {id: 'one-fifty', door: 26, act: 'workings', stars: 2, scene: 'temple-river', title: 'The Water Clock',
     setting: 'A water clock stops upon a number.',
     parts: [
       {kind: 'numbers', prompt: 'For how many days did the waters prevail upon the earth?', template: '{0} days', answers: [{value: 150}]}
     ],
     answer: '150 days. The Flood account holds far more chronology than the famous forty days and nights.',
     lore: [],
     certainty: 'explicit',
     refs: ['Genesis 7:24']},

    {id: 'four-banners', door: 27, act: 'workings', stars: 3, scene: 'four-banners', title: 'Four Banners Around One Presence', gem: 'amethyst',
     setting: 'A model of the tabernacle stands on a table, with places for banners at the four compass points.',
     parts: [
       {kind: 'match', prompt: 'Carry each lead tribe’s banner to its side of the tabernacle.', pairs: [['Judah', 'East'], ['Reuben', 'South'], ['Ephraim', 'West'], ['Dan', 'North']]},
       {kind: 'numbers', prompt: 'If each side held the same number of tribes:', template: '12 ÷ 4 = {0} tribes per side', answers: [{value: 3, accept: ['three']}]}
     ],
     answer: 'East Judah, South Reuben, West Ephraim, North Dan; three tribes on each side.',
     lore: [
       'The theological center is not any tribe but God’s dwelling among his people.',
       'Drawings of the camp as a giant cross are a devotional visualization; Numbers gives no camp dimensions, so the exact shape cannot be proven from the text.'
     ],
     certainty: 'explicit',
     refs: ['Numbers 2']},

    {id: 'ezekiel-days', door: 28, act: 'workings', stars: 3, scene: 'passage', title: 'Three Hundred Ninety Plus Forty',
     setting: 'The prophet’s chamber holds two counters.',
     parts: [
       {kind: 'formula', prompt: 'A day for each year: Israel’s days, then Judah’s.', expr: '{0} + {1}', suffix: 'days, a day for each year', tray: [390, 40, 430, 70], expect: [390, 40], commutative: true, showResult: true}
     ],
     answer: '430.',
     lore: ['Ezekiel interprets the sign himself: “a day for each year.” The historical reckoning behind 390 and 40 is debated. (Curiously, 430 is also the length of Israel’s sojourn in Exodus 12:40.)'],
     certainty: 'explicit',
     refs: ['Ezekiel 4:4–6', 'Exodus 12:40']},

    /* ───────── VIII · The Echoing Stair ───────── */
    {id: 'seventy-two', door: 29, act: 'echo', stars: 3, scene: 'cascade', title: 'Seventy-Two Sent Forth',
     setting: 'Seventy-two small lights appear upon the floor and arrange themselves two by two.',
     parts: [
       {kind: 'formula', prompt: 'If 72 go out in pairs:', expr: '{0} ÷ {1}', suffix: 'pairs', tray: [72, 2, 12, 6], expect: [72, 2], showResult: true},
       {kind: 'formula', prompt: 'Divide the 72 among the six pairs of apostles:', expr: '{0} ÷ {1}', suffix: 'for each apostolic pair', tray: [72, 6, 2, 12], expect: [72, 6], showResult: true}
     ],
     answer: '36 pairs; 12 for each apostolic pair.',
     lore: ['Luke 10:1 has an ancient manuscript difference: some read 70, others 72, so translations differ. Textual criticism compares the surviving evidence openly rather than hiding it.'],
     certainty: 'variant',
     refs: ['Luke 10:1, 17']},

    {id: 'extra-year', door: 30, act: 'echo', stars: 4, scene: 'archive', title: 'Where Did the Extra Year Go?', gem: 'beryl',
     setting: 'The mechanism counts 7 × 7 = 49. Yet the inscription reads: Jubilee = year 50.',
     parts: [
       {kind: 'choice', prompt: 'What happened to the “extra” year?', options: ['It was a copying error for 49', 'Nothing vanished: count seven sevens (49), then consecrate the 50th as Jubilee', 'Jubilee replaced the seventh sabbatical year', 'The 50th year was added later by the prophets'], correct: 1}
     ],
     answer: 'Nothing disappeared. Leviticus counts 49 years, then consecrates the 50th.',
     lore: ['Jubilee was another year without ordinary sowing and harvesting. How it related to the next 49-year cycle is debated: some see it standing on its own, others overlapping the start of the next cycle. The text makes the 49-then-Jubilee proclamation clear; the long-term calendar is less explicit.'],
     certainty: 'disputed',
     refs: ['Leviticus 25:8–12, 20–22']},

    {id: 'insects', door: 31, act: 'echo', stars: 4, scene: 'stair', title: 'The Insect Door',
     setting: 'Beetles, ants, moths and locusts are carved across the door.',
     parts: [
       {kind: 'choice', prompt: 'A traveler declares: “No insects needed to enter the ark, because insects lack the breath of life.” Does Genesis require that conclusion?', options: ['Yes, Genesis says so plainly', 'No; Genesis includes “creeping things,” and gives no full list', 'We can’t be certain either way'], correct: [1, 2]}
     ],
     answer: 'No. “Creeping things” can include small land creatures, and Scripture gives no full passenger list, so reasonable uncertainty is allowed.',
     lore: ['It is also inaccurate to say insects simply “breathe through their skin”: most exchange gases through openings called spiracles connected to a tracheal system.'],
     certainty: 'inference',
     refs: ['Genesis 6:19–20', 'Genesis 7:14, 21–23']},

    {id: 'stork-wings', door: 32, act: 'echo', stars: 4, scene: 'starlight', title: 'The Women with Stork Wings',
     setting: 'A carving shows a woman seated in a basket, carried eastward by winged women.',
     parts: [
       {kind: 'numbers', prompt: 'How many women carry the basket?', template: '{0}', answers: [{value: 2, accept: ['two']}]},
       {kind: 'choice', prompt: 'Where do they take it?', options: ['Egypt', 'Shinar (Babylon’s region)', 'Nineveh', 'Tarshish'], correct: 1},
       {kind: 'choice', prompt: 'What is the woman inside named?', options: ['Folly', 'Wickedness', 'Babylon', 'Pride'], correct: 1}
     ],
     answer: 'Two women with wings like a stork’s carry the basket (an ephah) to Shinar; the woman inside is named Wickedness.',
     lore: ['Babylon later becomes a symbol of organized human wickedness in Revelation 17–18. A thematic connection is reasonable, but the Bible does not say Zechariah 5 is the origin of Revelation’s woman.'],
     certainty: 'explicit',
     refs: ['Zechariah 5:5–11', 'Revelation 17–18']},

    /* ───────── IX · The Court Below the Mountain ───────── */
    {id: 'twenty-four', door: 33, act: 'court', stars: 4, scene: 'court', title: 'Twenty-Four Thrones', gem: 'onyx',
     setting: 'Twenty-four crowned figures sit upon thrones around the greater throne.',
     parts: [
       {kind: 'match', prompt: 'One possible reading: 12 + 12 = 24. Set a twelve in each place.', pairs: [['12 tribes of Israel', 'First twelve'], ['12 apostles', 'Second twelve']], distractors: ['12 months', '12 gates'], anyOrder: true}
     ],
     answer: 'One prominent reading: twelve tribes and twelve apostles, the fullness of God’s redeemed people.',
     lore: ['Others connect the number with the 24 priestly divisions (1 Chronicles 24), and some see the elders as heavenly beings. Revelation does not decode the elders, so 12 + 12 is an attractive interpretation, not an explicit statement.'],
     certainty: 'interpretation',
     refs: ['Revelation 4:4', '1 Chronicles 24']},

    {id: 'seventy-sevens', door: 34, act: 'court', stars: 4, scene: 'door', title: 'Seventy Sevens',
     setting: 'Seventy rows of seven marks cover an enormous door.',
     parts: [
       {kind: 'formula', prompt: 'Seventy sets of seven:', expr: '{0} × {1}', tray: [70, 7, 49, 10], expect: [70, 7], commutative: true, showResult: true}
     ],
     answer: '490. The chronology and fulfillment are interpreted differently among faithful Christians.',
     lore: ['The passage should not be reduced to arithmetic. Its themes: finishing transgression, dealing with sin, atonement, everlasting righteousness, God’s sovereign timetable, and the coming Anointed One.'],
     certainty: 'disputed',
     refs: ['Daniel 9:24–27']},

    {id: 'sealed', door: 35, act: 'court', stars: 4, scene: 'vault', title: 'The Number of the Sealed',
     setting: 'A vast inscription fills the ceiling, its total lost in shadow. Beneath it, smaller and clear: 12 × 12 × 1,000.',
     parts: [
       {kind: 'formula', prompt: 'Calculate the inscription.', expr: '{0} × {1} × {2}', tray: [12, 12, 1000, 144, 100], expect: [12, 12, 1000], commutative: true, showResult: true}
     ],
     answer: '144,000. The arithmetic is certain; the exact prophetic identification is disputed.',
     lore: ['A common symbolic reading: 12 for covenant people, multiplied by 12 for intensified fullness, and by 1,000 for vast magnitude, portraying the fullness of God’s sealed people. Other evangelicals take the 144,000 more literally as a particular group of Jewish servants or witnesses.'],
     certainty: 'disputed',
     refs: ['Revelation 7:1–8', 'Revelation 14:1–5']},

    {id: 'cube', door: 36, act: 'court', stars: 4, scene: 'city', title: 'A Cube Within a Cube', gem: 'jasper',
     setting: 'A perfectly proportioned chamber: length, width and height, equal.',
     parts: [
       {kind: 'choice', prompt: 'Solomon’s Most Holy Place was about 20 × 20 × 20 cubits. What shape is that?', options: ['A pyramid', 'A cube', 'A sphere', 'A double square'], correct: 1},
       {kind: 'choice', prompt: 'What later biblical city is described with equal length, width and height?', options: ['Babylon', 'Nineveh', 'The New Jerusalem', 'Shiloh'], correct: 2}
     ],
     answer: 'A cube, like the New Jerusalem.',
     lore: ['The cube recalls the Most Holy Place, where God’s presence dwelt. In Revelation’s final vision the whole city becomes, in effect, a vast Holy of Holies: God dwells with his people.'],
     certainty: 'explicit',
     refs: ['1 Kings 6:20', 'Revelation 21:16, 22']},

    {id: 'bronze-sea', side: true, act: 'court', stars: 4, scene: 'court', title: 'The Bronze Sea', keepsake: 'A bronze lily',
     setting: 'In a court below the mountain a round basin of cast bronze rests on twelve bronze oxen, three facing each way.',
     inscription: [
       'Ten cubits from lip to lip it lay, round as the full moon,',
       'five cubits deep it stood, and a line of thirty cubits went about it.',
       'A handbreadth thick its wall was wrought,',
       'its brim like a cup, like the lily’s flower.'
     ],
     parts: [
       {kind: 'numbers', prompt: 'First read the stone truly.', template: 'Its wall was {0} handbreadth thick. A line of {1} cubits went around it. It measured {2} cubits from brim to brim.', answers: [{value: 1, accept: ['one', 'a']}, {value: 30, accept: ['thirty']}, {value: 10, accept: ['ten']}]},
       {kind: 'numbers', prompt: 'The craftsman’s rule says a circle’s girdle is π times its breadth, yet 30 is only three times 10. If the thirty-cubit line ran around the inside, how thick must the wall be?', template: 'about {0} handbreadths', answers: [{value: 1.35, tolerance: 0.35, accept: ['one', 'about one', 'a handbreadth']}]}
     ],
     hints: [
       {kind: 'equation', label: 'Lift the caret', text: 'C = π × d  →  30 = π × d  →  d = 30 ÷ π ≈ 9.55 cubits'},
       {kind: 'image', src: 'art/diagrams/bronze-sea-inside-line.svg', alt: 'The bronze basin with a single measuring line drawn around the inside of its wall', text: 'What if the thirty-cubit line ran around the inside, where the water is held, the measure that matters for how much the sea contains? The ten cubits spans the outside, brim to brim. What fills the difference between them?'},
       {kind: 'formula', text: 'Set the numbers in the craftsman’s formula for the wall:', prefix: 't =', expr: '( {0} − {1} ÷ {2} ) ÷ {3}', suffix: 'cubit', tray: [10, 30, 'π', 2, 5, 12], expect: [10, 30, 'π', 2], showResult: true, after: 'That is about 0.23 cubit. A common cubit is six handbreadths, so 0.23 × 6 ≈ 1.4 handbreadths.'}
     ],
     answer: 'About a handbreadth (≈ 1⅓ handbreadths, a quarter cubit). If the line measured the inner circumference and the ten cubits spanned the outer brim, the wall makes up the difference.',
     lore: [
       'Scripture reports the measurements in round numbers, as builders did; it is not teaching geometry, and it does not “say π = 3.”',
       'One reasonable harmonization: 30 ÷ π ≈ 9.55 cubits inside; 10 − 9.55 = 0.45 cubit for two walls, about 0.23 cubit each, near the “handbreadth thick” of 1 Kings 7:26. The flared, lily-like brim widens the outer measure further.',
       'A deeper puzzle waits: 1 Kings 7:26 says the sea held 2,000 baths, while 2 Chronicles 4:5 says 3,000.'
     ],
     certainty: 'inference',
     refs: ['1 Kings 7:23–26', '2 Chronicles 4:2–5']},

    /* ───────── X · The Last Door ───────── */
    {id: 'goliath', door: 37, act: 'last', stars: 5, scene: 'archive', title: 'How Tall Was the Giant?',
     setting: 'Two ancient manuscripts lie beneath glass. One reads “six cubits and a span”; the other “four cubits and a span.”',
     parts: [
       {kind: 'choice', prompt: 'Why can Bibles and study notes give different heights for Goliath?', options: ['One translation is simply wrong', 'There is a real manuscript difference in 1 Samuel 17:4', 'Cubits changed length during the battle'], correct: 1},
       {kind: 'match', prompt: 'Match each reading to its witness.', pairs: [['6 cubits and a span (≈ 9 ft 9 in)', 'Traditional Masoretic Hebrew text'], ['4 cubits and a span (≈ 6 ft 9 in)', 'A Dead Sea Scroll of Samuel and Septuagint witnesses']]}
     ],
     answer: 'A genuine textual variant: the Masoretic text reads six cubits and a span; a Samuel scroll from Qumran and Septuagint witnesses read four.',
     lore: ['Textual criticism compares the many surviving witnesses openly. Either reading leaves Goliath formidable, and David’s victory rests on the LORD’s deliverance, not on a conversion from cubits to feet.'],
     certainty: 'variant',
     refs: ['1 Samuel 17:4', '1 Samuel 17:45–47']},

    {id: 'six-sixteen', door: 38, act: 'last', stars: 5, scene: 'geodes', title: 'Six Hundred Sixty-Six… or Six Hundred Sixteen?',
     setting: 'A number burns upon a bronze gate: 666. Beneath it, faintly: 616.',
     parts: [
       {kind: 'choice', prompt: 'Why does 616 appear in discussions of the passage?', options: ['It is a modern misprint', 'It is an ancient manuscript variant', 'It is the beast’s second number'], correct: 1},
       {kind: 'choice', prompt: 'Ancient letters doubled as numbers. One influential reading adds up the letters of a name. Whose name do many scholars propose, with spellings that give both 666 and 616?', options: ['Nero Caesar', 'Herod the Great', 'Pontius Pilate', 'Alexander the Great'], correct: 0}
     ],
     answer: '666 is the familiar reading; 616 is an ancient manuscript variant. Many scholars connect both with Nero Caesar, though Revelation gives no answer sheet.',
     lore: [
       'One influential reading connects the number with Nero Caesar through ancient letter-number values, with variant spellings accounting for both 666 and 616. Plausible to many scholars, but Revelation gives no answer sheet.',
       'Revelation calls for wisdom, not uncontrolled numerology: the beast represents human power exalting itself against God and demanding allegiance that belongs to Christ.'
     ],
     certainty: 'variant',
     refs: ['Revelation 13:18']},

    {id: 'city-measures', door: 39, act: 'last', stars: 5, scene: 'city', title: 'Twelve Thousand and One Hundred Forty-Four',
     setting: 'The final city is measured. Each side bears 12,000 stadia; its wall, 144 cubits.',
     parts: [
       {kind: 'formula', prompt: 'If its footprint is square, the perimeter is:', expr: '{0} × {1}', suffix: 'stadia around', tray: [12000, 4, 144, 12], expect: [12000, 4], commutative: true, showResult: true},
       {kind: 'formula', prompt: 'And its footprint in square stadia:', expr: '{0} × {1}', suffix: 'square stadia', tray: [12000, 12000, 144, 4], expect: [12000, 12000], showResult: true},
       {kind: 'match', prompt: 'Where does twelve appear in the city? Set each twelve in its place.', pairs: [['12 gates', 'Bearing the tribes’ names'], ['12 foundations', 'Bearing the apostles’ names'], ['144 cubits', 'The wall: 12 × 12']]}
     ],
     answer: '48,000 stadia around; 144,000,000 square stadia. Twelve marks the covenant people throughout.',
     lore: ['Twelve gates, twelve foundations, 144 cubits, 144,000 sealed: covenant fullness is hard to miss. Whether every dimension is literal, symbolic, or both is debated; the symbolism is not.'],
     certainty: 'interpretation',
     refs: ['Revelation 21:12–21']},

    {id: 'last-door', door: 40, act: 'last', stars: 5, scene: 'deep', title: 'The Riddle of All Numbers',
     setting: 'At the deepest point of the mountain there is no lock. Only runes, and an empty wall.',
     inscription: [
       'Seven rests. Twelve gathers. Forty tests.',
       'Fifty proclaims liberty.',
       'One hundred forty-four multiplies twelve by twelve.',
       'Yet the fool may count correctly and understand nothing.'
     ],
     parts: [
       {kind: 'match', prompt: 'Set each rune beside what Scripture repeatedly pairs it with.', pairs: [['7', 'Sabbath and completion'], ['12', 'God’s covenant people'], ['40', 'Testing and preparation'], ['50', 'Jubilee and Pentecost'], ['8', 'A new beginning (typology)'], ['144', 'Twelve times twelve']]},
       {kind: 'choice', prompt: 'What rule must govern every reading of biblical numbers?', options: ['Every number hides a secret code', 'The symbolism governs the text', 'The text governs the symbolism', 'Numbers have meaning apart from context'], correct: 2}
     ],
     answer: 'The text must govern the symbolism, not the symbolism the text.',
     lore: [
       'Biblical patterns are real, but no number has a magical meaning apart from context.',
       'The great subject of Scripture is not a numerical code but God’s redemptive work in Jesus Christ. Creation moves toward him; Israel’s story prepares for him; the prophets testify of him; Revelation ends not with an equation solved but with the throne of God and of the Lamb.'
     ],
     certainty: 'explicit',
     refs: ['Revelation 22:1–5', 'Luke 24:27']}
  ]
};
