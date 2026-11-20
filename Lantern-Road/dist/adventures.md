# The Lantern Road — Greenwood Adventures

The Riverkin keep boats, meals, marriages, and gardens; the elves remember longer things. Once these woods joined a road around the world. In the Ash War, proud warlords cut the living bridges and called their devastation strength. Greenwood has grown over the wounds, but creatures still gather around its forgotten crossings.

This opening region concerns a festival lantern carried to an ancient watch-ring. Scripture is received as the true word of the living God, whom this world's people know; elves are fellow creatures, not the source of revelation. The adventure's moves, fireworks, gates, and creatures belong to a fictional game. The hidden truth beneath the adventure is that courage, humility, and clear thought belong together: smallness need not become despair, and power need not become pride.

Regions and coordinates use a 0–100 map grid. `requires` means all listed flags. `accept` means any listed keyword matches a card's tags or wording. `grants` are flags on success; `item` adds an inventory item; `consume` uses an existing item. A repeatable encounter can be played again without granting duplicate quest items. $player, $region, $card, $move, $rumor, and $count are plain text variables, never executable code. `[if flag:NAME]...[/if]` is the only conditional form. Unknown variables are left visible for authors to find.

## camp · The Festival Camp

A lantern hangs beside an empty hammock. You came with festival fireworks, a bread roll, and a stubborn wish to see the elves' old watch-ring. The road has forgotten what keeps it open. Find the scattered way-cards, read their words, then carry four in your way-pack.

#### Success

Rest here, practice every discovered card, or exchange the four cards in your pack. After the watch-ring is restored, an old chest at camp will offer another undiscovered card from your Scripture file. The adventure can continue as practice and repeatable encounters.

#### Rumors

The elder tree remembers a branch cannot live by itself. Search the western moss trail.
An angry root-worm guards the southern hollow; the giant squirrels consider it a dreadful neighbor.
The watch-ring once shone toward the distant Ashlands. A proud guardian still circles its stones.
The eastern arch leads to Silvermere, where the gardens are prosperous and the people have troubles of their own. There is a second way home beneath the orchard.

#### Metadata

```json
{
  "id": "camp",
  "kind": "camp",
  "region": "greenwood",
  "locations": [
    {
      "point": [
        18,
        82
      ],
      "radius": 5
    }
  ],
  "repeatable": true
}
```

## living-bridge · The Root-Locked Crossing

The bridge curls itself into a knot as you approach. A squirrel the size of a pony watches from a post. "It won't yield to hauling," reads a weathered sign. "Carry words worth remembering. Then look carefully." The far bank is close, yet the river is swift.

#### Hint

Recall a card about dependence, wisdom, humility, or patient listening. The words steady your attention; the move releases the bridge's old mechanism.

#### Success

$player takes a breath and chooses $move. A loose silver pin catches your eye beneath the roots. You spring onto the anchor stone and turn it. The bridge uncoils across the river with a rush of leaves! The delighted squirrel rolls a festival chest toward you: one dazzling pop-blaster, saved from last summer. The northern woods are open.

#### Failure

You pull the wrong root. The bridge flicks river spray straight into your face and deposits you on the moss. You lose one heart, but keep every card. Read the passage again or retreat to camp before trying another move.

#### Metadata

```json
{
  "id": "living-bridge",
  "kind": "encounter",
  "region": "greenwood",
  "locations": [
    {
      "point": [
        49,
        58
      ],
      "radius": 6
    }
  ],
  "requires": [],
  "min_cards": 1,
  "accept": [
    "abide",
    "wisdom",
    "trust",
    "listen",
    "grace",
    "humility",
    "patience"
  ],
  "grants": [
    "bridge-open"
  ],
  "item": "pop-blaster",
  "rounds": 1,
  "enemy": "squirrel",
  "move": "Rootspring",
  "hearts": 1,
  "reward": 30
}
```

## man-ghouls · What's Your Boast, Riverkin?

Three Man-Ghouls drop from the black limbs. "What's your boast going to be, Little Man?" Their captain rattles a stolen helmet. One blocks the path; another swings behind you. They want either a swollen boast or a frightened surrender. Your pack is within reach.

#### Hint

Choose a card that gives you reason for hope, humility, dependence, self-control, or courage. A bold reply may trust God without pretending you are stronger than the creatures before you. You can add your own words before choosing a move.

#### Success

"Riverkin," you answer, with more steadiness than you expected. $move carries you past the captain's first swipe. [if item:pop-blaster]You remember the festival pop-blaster. You light it, toss it into the empty gap between the creatures, and turn your face away. Its harmless white strobe sends the pack shrieking into the branches![/if] [if !item:pop-blaster]You strike the old warning bell with a loose stone. Its thunderous clang brings a shower of pinecones down around the pack, who flee from the noise![/if] The path is yours. Beyond it the watch-ring wakes, stone by stone. You gain a lantern shard.

#### Failure

The captain catches your pack strap as you hesitate. You slip the buckle and scramble free, landing in fern-soft ground. One heart is lost; your cards stay with you. The creatures retreat to argue over the empty strap; you have time to regroup.

#### Metadata

```json
{
  "id": "man-ghouls",
  "kind": "encounter",
  "region": "greenwood",
  "locations": [
    {
      "point": [
        73,
        30
      ],
      "radius": 6
    }
  ],
  "requires": [
    "bridge-open"
  ],
  "min_cards": 2,
  "accept": [
    "boast",
    "pride",
    "humility",
    "trust",
    "fear",
    "hope",
    "courage",
    "spirit",
    "grace",
    "wisdom",
    "listen"
  ],
  "grants": [
    "ghouls-won"
  ],
  "item": "lantern-shard",
  "rounds": 1,
  "enemy": "ghoul",
  "move": "Strobe Dash",
  "hearts": 1,
  "reward": 45,
  "patrol": [
    [
      73,
      30
    ],
    [
      69,
      32
    ],
    [
      64,
      32
    ],
    [
      69,
      29
    ]
  ],
  "aggressive": true,
  "chase_radius": 7,
  "leash": 10,
  "patrol_speed": 1.7,
  "chase_speed": 3.2
}
```

## watch-warden · The Hollow Crown

A blackened guardian circles the watch-ring. Its crown is a twist of iron roots; its voice is large enough to make the stones tremble. "I broke this road. I can keep it broken. Surely there is nothing the Almighty has made that I cannot destroy!" It sweeps a fallen trunk toward the clearing. You have room for a shield-step, then a dash to the lantern socket. Two remembered portions will be needed.

#### Hint

A card about grace, Christ, truth, dependence, humility, or hope can prepare your answer. Recall two portions: the second round practices another half or excerpt. Its great voice hides a dangerous habit: it mistakes the power to damage a thing for the power to give it life.

#### Success

$move holds your footing as the trunk rolls past. You duck beneath the iron roots, fit the lantern shard into the stone socket, and pull the lever the guardian forgot. Light pours around the ring. The hollow crown rings like a cracked kettle; the guardian tumbles into the ferns and runs, smaller than its own voice. The old watch-lantern shines. A hidden way-card is uncovered among the stones, and the road east is marked once more.

#### Failure

The guardian's sweep forces you out of the ring. You tumble onto an old bed of leaves, still holding your way-pack. One heart is lost. Return to the words, then try again; a shield-step is easier when you remember where the next footing lies.

#### Metadata

```json
{
  "id": "watch-warden",
  "kind": "encounter",
  "region": "greenwood",
  "locations": [
    {
      "point": [
        81,
        21
      ],
      "radius": 6
    }
  ],
  "requires": [
    "ghouls-won"
  ],
  "min_cards": 3,
  "accept": [
    "grace",
    "humility",
    "hope",
    "trust",
    "Christ",
    "truth",
    "abide",
    "wisdom",
    "spirit",
    "light"
  ],
  "grants": [
    "warden-won"
  ],
  "item": "watch-key",
  "rounds": 2,
  "enemy": "ghoul",
  "move": "Lantern Break",
  "hearts": 1,
  "reward": 70,
  "patrol": [
    [
      81,
      21
    ],
    [
      84,
      23
    ],
    [
      84,
      17
    ],
    [
      80,
      15
    ],
    [
      78,
      19
    ]
  ],
  "aggressive": true,
  "chase_radius": 6,
  "leash": 9,
  "patrol_speed": 1.1,
  "chase_speed": 2.8
}
```

## east-road · A Road Beyond the Trees

Sunlight reaches a carved arch. Beyond Greenwood, old roads run toward the Ashlands, war-camel plains, mountain warrens, and places the Riverkin name only in jokes. The path leads into Silvermere: an elven valley of gardens, long memories, and uncomfortable courtesies.

#### Success

The lantern you carried now burns in the watch-ring. You restored the crossing, escaped the Man-Ghouls, and faced the Hollow Crown. Greenwood is open for exploration. Through the arch lies Silvermere. Mira once said its gardeners can coax a rose to bloom in winter, but cannot always coax an apology from an elf. There is only one way to test the report.

#### Metadata

```json
{
  "id": "east-road",
  "kind": "exit",
  "region": "greenwood",
  "locations": [
    {
      "point": [
        92,
        16
      ],
      "radius": 5
    }
  ],
  "requires": [
    "warden-won"
  ],
  "grants": [
    "quest-complete"
  ],
  "target": {
    "region": "silvermere",
    "point": [
      7,
      42
    ]
  },
  "repeatable": true
}
```

## root-worm · The Worm Under the Moss

Moss bulges. A root-worm the length of a boat bursts out, scattering acorns. There is no accusation to answer this time: dodge its rush, choose a remembered passage, then release a power move before it coils around the trail.

#### Hint

Almost any well-carried card can steady this encounter. This action challenge accepts a broad set of ideas; your optional reply can name how your chosen passage connects. Remember your words, then watch for a clear footing.

#### Success

$move carries you clear of the snapping roots. You strike the hollow log with a festival stick; the worm lunges after its booming echo and burrows into the wrong hole. Moss settles. Somewhere below, a very irritated creature has begun digging a new passage.

#### Failure

The worm bowls you into a fern bank. It mistakes your dropped bread roll for a mighty prize and burrows away long enough for you to recover. Lose one heart, then retry or rest at camp.

#### Metadata

```json
{
  "id": "root-worm",
  "kind": "encounter",
  "region": "greenwood",
  "locations": [
    {
      "area": [
        69,
        64,
        19,
        19
      ],
      "radius": 5
    }
  ],
  "requires": [],
  "min_cards": 1,
  "accept": [
    "grace",
    "wisdom",
    "trust",
    "fear",
    "hope",
    "life",
    "spirit",
    "love",
    "humility",
    "patience",
    "Christ",
    "light"
  ],
  "repeatable": true,
  "weight": 2,
  "enemy": "worm",
  "rounds": 1,
  "move": "Thunderstep",
  "hearts": 1,
  "reward": 15,
  "patrol": [
    [
      81,
      82
    ],
    [
      76,
      80
    ],
    [
      73,
      75
    ],
    [
      74,
      69
    ],
    [
      78,
      65
    ],
    [
      86,
      64
    ]
  ],
  "aggressive": true,
  "chase_radius": 6,
  "leash": 14,
  "patrol_speed": 2.2,
  "chase_speed": 3.4
}
```

## acorn-trial · The Giant Squirrel's Challenge

A giant squirrel thumps a stump with its tail. Three acorns hang from strings. A sign says: "Visitors who remember their way-words may try the impossible leap." It is less a battle than a wildly unnecessary contest, and the squirrel plainly loves it.

#### Hint

Choose any discovered card and complete a portion. Every card is accepted here. Practicing a summary is welcome; practicing successive excerpts is a longer challenge.

#### Success

$move sends you across the stepping stones. The squirrel flips all three acorns into the air, then catches none of them. It awards you a leaf-shaped token anyway. Your practice has added another small adventure to the day.

#### Failure

You land on the wrong stone with a magnificent splash. The squirrel applauds the splash. Rest or try again; the contest will still be here.

#### Metadata

```json
{
  "id": "acorn-trial",
  "kind": "encounter",
  "region": "greenwood",
  "locations": [
    {
      "area": [
        28,
        23,
        17,
        17
      ],
      "radius": 5
    }
  ],
  "requires": [
    "bridge-open"
  ],
  "accept": [
    "*"
  ],
  "repeatable": true,
  "weight": 1,
  "enemy": "squirrel",
  "rounds": 1,
  "move": "Acorn Arc",
  "hearts": 0,
  "reward": 12,
  "patrol": [
    [
      33,
      34
    ],
    [
      38,
      34
    ],
    [
      40,
      30
    ],
    [
      36,
      27
    ]
  ],
  "patrol_speed": 1.4
}
```

## burrow · The Eastern Burrow

Cool air moves through a root-lined hole. Scratches in the stone point toward underground halls and the distant desert. The lantern-string on the left leads to camp. A faded silver thread disappears into a longer passage; someone has tied a pear leaf to its first knot.

#### Success

You follow a lantern-string through the short burrow and emerge beside the festival hammock. Elian is still counting spoons. He looks up just long enough to ask whether the squirrels have started borrowing bowls.

#### Metadata

```json
{
  "id": "burrow",
  "kind": "portal",
  "region": "greenwood",
  "locations": [
    {
      "point": [
        91,
        82
      ],
      "radius": 5
    }
  ],
  "target": {
    "region": "greenwood",
    "point": [
      18,
      82
    ]
  },
  "repeatable": true
}
```

## camp-keeper · Elian, Keeper of the Festival

Elian sits beside the lantern-string, counting the festival's missing cups. "I found nine spoons in a tree this morning," he tells you. "The squirrels insist it was research."

#### Success

[if !flag:bridge-open]"Carry words that reach beyond your own strength. There are two way-cards near camp and the western moss trail. The bridge's roots have forgotten their silver pin."[/if] [if flag:bridge-open]"You opened the crossing! Now keep a sharp eye and a humble heart. That combination annoys the Man-Ghouls terribly."[/if] [if flag:quest-complete]"The old lantern shines again. Come back to the camp chest: someone always leaves another card there after a long journey."[/if]

#### Short

"Find the two way-cards near camp, then release the bridge. The squirrels have already stolen enough spoons." [if flag:quest-complete]"The lantern shines again! The camp chest has more cards."[/if]

#### Metadata

```json
{
  "id": "camp-keeper",
  "kind": "npc",
  "region": "greenwood",
  "locations": [
    {
      "point": [
        23,
        84
      ],
      "radius": 5
    }
  ],
  "enemy": "elf",
  "speech": "The squirrels insist it was research.",
  "repeatable": true,
  "patrol": [
    [
      23,
      84
    ],
    [
      24,
      81
    ],
    [
      24,
      77
    ],
    [
      22,
      80
    ]
  ],
  "patrol_speed": 0.6
}
```

## elder-guide · Thalen by the Elder Tree

An elven traveler examines the scars of the elder tree. "The Ash War taught some people to call destruction greatness," he says. "It taught this tree to grow around a wound. Neither lesson should be forgotten."

#### Success

"The Hollow Crown boasts that everything here belongs to its strength. Yet the world is made and sustained by One it did not create. Take that truth seriously, and look carefully at the lantern socket." Thalen points toward the watch-ring. "$rumor"

#### Short

"The Hollow Crown boasts of its strength. Remember who made the world, and look carefully at the watch-lantern socket."

#### Metadata

```json
{
  "id": "elder-guide",
  "kind": "npc",
  "region": "greenwood",
  "locations": [
    {
      "point": [
        28,
        31
      ],
      "radius": 5
    }
  ],
  "enemy": "elf",
  "speech": "Greatness is more than making things fear you.",
  "repeatable": true
}
```

## bridge-friend · Mira of the Crossing

Mira, a Riverkin traveler, balances a basket of pears on the stone rail. "I was told the world grows smaller whenever you stop exploring," she says. "A suspicious theory. I intend to check."

#### Success

"Beyond the arch is Silvermere. The valley road runs past gardens and a treasure grotto; an orchard tunnel leads back here. Beyond its northern hills lie the war-camel plains. I mean to see them someday." [if !flag:ghouls-won]"The Man-Ghouls are hoping to hear either a proud boast or a frightened surrender. You needn't give them either."[/if] [if flag:ghouls-won]"I heard a terrible noise from the northern trees. Was that you? Please tell me the squirrels haven't invented trumpets."[/if]

#### Short

"The Man-Ghouls want a boast or a surrender. You need not give them either. The road beyond will lead to mountains, burrows, and war-camel plains."

#### Metadata

```json
{
  "id": "bridge-friend",
  "kind": "npc",
  "region": "greenwood",
  "locations": [
    {
      "point": [
        60,
        39
      ],
      "radius": 5
    }
  ],
  "enemy": "girl",
  "speech": "The roads are there. Shall we check?",
  "repeatable": true,
  "patrol": [
    [
      60,
      39
    ],
    [
      58,
      35
    ],
    [
      61,
      34
    ],
    [
      61,
      39
    ]
  ],
  "patrol_speed": 0.8
}
```

## silvermere-rest · The Orchard Rest

A kettle hangs over a little stove under the pear trees. Someone has left a stool, a blanket, and a sign: "Sit. The pears cannot ripen faster because you hurry."

#### Success

Rest, practice, and exchange your favorite cards. The valley remains open whether you take part in its conversations or follow the adventurous paths.

#### Rumors

A folded mountain chart lies on the northern outlook. Its smallest mark may be the most important.
The treasure grotto has a jealous keeper; the orchard tunnel has no keeper at all.
A minstrel sings about the giant who mistook his height for the measure of the world.
The island path returns to the eastern bank. Follow it and you can circle the valley.

#### Metadata

```json
{
  "id": "silvermere-rest",
  "region": "silvermere",
  "kind": "camp",
  "locations": [
    {
      "point": [
        49,
        89
      ]
    }
  ],
  "repeatable": true
}
```

## silvermere-west · The Western Arch

Through the western arch, Greenwood's watch-lantern glows between the trees. The road home has not vanished behind you.

#### Success

You take the familiar path. There is bread at the festival camp and a whole valley still waiting behind you.

#### Metadata

```json
{
  "id": "silvermere-west",
  "region": "silvermere",
  "kind": "portal",
  "locations": [
    {
      "point": [
        5,
        41
      ]
    }
  ],
  "target": {
    "region": "greenwood",
    "point": [
      93,
      16
    ]
  },
  "repeatable": true
}
```

## orchard-tunnel · The Pear-Root Passage

A cool passage opens beneath the orchard wall. A pear leaf marks a silver cord. The tunnel smells of damp stone, not pears, which is a small disappointment.

#### Success

The cord leads you through the roots and out beside Greenwood's eastern burrow. The valley and the old woodland now make a longer circuit.

#### Metadata

```json
{
  "id": "orchard-tunnel",
  "region": "silvermere",
  "kind": "portal",
  "locations": [
    {
      "point": [
        64,
        89
      ]
    }
  ],
  "target": {
    "region": "greenwood",
    "point": [
      91,
      82
    ]
  },
  "repeatable": true
}
```

## silver-cord · Follow the Silver Cord

Beyond the short burrow, a silver cord turns east beneath the roots. A pear leaf hangs from its first knot.

#### Success

You emerge under Silvermere's orchard wall. Above the tunnel, branches move in the afternoon breeze.

#### Metadata

```json
{
  "id": "silver-cord",
  "region": "greenwood",
  "kind": "portal",
  "locations": [
    {
      "region": "greenwood",
      "point": [
        92,
        86
      ]
    }
  ],
  "requires": [
    "quest-complete"
  ],
  "target": {
    "region": "silvermere",
    "point": [
      64,
      87
    ]
  },
  "repeatable": true
}
```

## silverworm · The Centipede in the Shade

A many-legged root-creature skitters along the northern track. It cannot bear the sunlight, but it is very eager to discover whether your boots are edible. A fallen branch forms a narrow way past its jaws.

#### Hint

Any discovered passage can be recalled for this action trial. Keep the words and the next footing in mind.

#### Success

$move takes you onto the branch. You flick a pinecone into the hollow beyond it. The creature follows the rolling sound, all its legs disagreeing about the quickest route. You drop safely onto the far path.

#### Failure

The branch rolls before you settle your footing. You land in soft leaves and lose one heart; the creature spends the interval attempting to eat a pebble.

#### Metadata

```json
{
  "id": "silverworm",
  "region": "silvermere",
  "kind": "encounter",
  "locations": [
    {
      "point": [
        40,
        22
      ]
    }
  ],
  "accept": [
    "*"
  ],
  "repeatable": true,
  "enemy": "worm",
  "move": "Silverstep",
  "hearts": 1,
  "rounds": 1,
  "reward": 16,
  "patrol": [
    [
      39,
      23
    ],
    [
      43,
      22
    ],
    [
      49,
      20
    ],
    [
      54,
      22
    ],
    [
      48,
      22
    ]
  ],
  "patrol_speed": 2.1,
  "aggressive": true,
  "chase_radius": 4,
  "chase_speed": 3.2,
  "leash": 9
}
```

## orchard-windfall · The Runaway Pear Cart

A loaded pear cart is rolling toward the water. Its driver has jumped clear, but the brake rope is trailing behind it. There is time to act; there is no time to look impressive.

#### Hint

Recall a card and look for a practical way to help. Love serves the neighbor before asking who will notice.

#### Success

$move carries you alongside the cart. You loop the brake rope around a sound post and let the wheels take the strain. The cart stops with a groan. The driver stares, then laughs. "A bruised pear is one thing. A drowned orchard is quite another." The fruit can now reach the kitchens and the families beyond the estate.

#### Failure

You reach for the rail and miss. The cart catches on a low stone before it reaches the pond. One heart is lost in your tumble; the driver offers a hand and another chance to secure the brake.

#### Metadata

```json
{
  "id": "orchard-windfall",
  "region": "silvermere",
  "kind": "encounter",
  "locations": [
    {
      "point": [
        35,
        66
      ]
    }
  ],
  "accept": [
    "*"
  ],
  "grants": [
    "orchard-saved"
  ],
  "repeatable": true,
  "enemy": "squirrel",
  "move": "Anchor Dash",
  "hearts": 1,
  "rounds": 1,
  "reward": 20
}
```

## grotto-keeper · The Keeper of Borrowed Gold

A Man-Ghoul crouches before the grotto, wearing three unmatched crowns. "Mine," it says. "Every coin, every kindness, every scrap of glory. I have taken them, therefore I deserve them." Behind its heels a corroded sluice-chain hangs loose.

#### Hint

A card about gifts, humility, generosity, service, truth, or dependence answers its boast. Another sound connection may be explained in your own words.

#### Success

$move takes you beside the keeper instead of into its grasp. You pull the loose chain. Water thunders through the empty side-channel; the creature bolts, clutching its crowns and leaving every coin behind. Inside, a ledger names the families from whom the hoard was taken. You put it beside the unlocked chest for the steward to return. A way-card waits on a dry shelf beyond the spray.

#### Failure

The keeper swings a sack across the threshold. You dodge, but slide down the gravel bank and lose one heart. Its three crowns fall over its eyes. You have time to recover your footing.

#### Metadata

```json
{
  "id": "grotto-keeper",
  "region": "silvermere",
  "kind": "encounter",
  "locations": [
    {
      "point": [
        86,
        76
      ]
    }
  ],
  "accept": [
    "grace",
    "humility",
    "hope",
    "trust",
    "Christ",
    "truth",
    "abide",
    "wisdom",
    "spirit",
    "light",
    "love",
    "gift",
    "give",
    "boast",
    "serve"
  ],
  "grants": [
    "grotto-open"
  ],
  "enemy": "ghoul",
  "move": "Sluice Turn",
  "hearts": 1,
  "rounds": 2,
  "reward": 65,
  "patrol": [
    [
      85,
      76
    ],
    [
      87,
      76
    ],
    [
      88,
      78
    ],
    [
      86,
      80
    ]
  ],
  "patrol_speed": 0.8,
  "aggressive": true,
  "chase_radius": 4,
  "chase_speed": 2.5,
  "leash": 6
}
```

## meadow-leap · The Squirrel and the Impossible Acorn

In the meadow a giant squirrel has arranged five stones and a single acorn. It taps the farthest stone with its tail, then looks at you with the grave expression of a professor setting an examination.

#### Hint

Any discovered card is welcome. Recall a portion, then try the leap.

#### Success

$move sends you from stone to stone. The squirrel attempts to applaud with all four paws and immediately sits down. It gives you the acorn with great dignity.

#### Failure

You miss the final stone. The squirrel retrieves the acorn, demonstrates a much worse leap, and seems relieved that no one is keeping a score.

#### Metadata

```json
{
  "id": "meadow-leap",
  "region": "silvermere",
  "kind": "encounter",
  "locations": [
    {
      "point": [
        15,
        75
      ]
    }
  ],
  "accept": [
    "*"
  ],
  "repeatable": true,
  "enemy": "squirrel",
  "move": "Meadow Vault",
  "hearts": 0,
  "rounds": 1,
  "reward": 12,
  "patrol": [
    [
      15,
      75
    ],
    [
      20,
      73
    ],
    [
      22,
      76
    ],
    [
      18,
      79
    ]
  ],
  "patrol_speed": 1.4
}
```

## mentor-arrival · Caerion Offers a Lesson

Caerion closes a book with a silver clasp. His courtesy is impeccable, which is not quite the same as kindness. "You restored the old watch-ring? Then perhaps you might benefit from instruction. There are habits of attention we have kept for many years." He offers you a place beside the pavilion steps.

#### Success

"We begin with listening," he says. "Not agreement with every voice, but attention before judgment." You agree to help carry an orchard basket to the garden. For a while his patience feels like a generous gift.

#### Short

Caerion offers to teach you careful listening. He asks you to help carry a basket to the garden. His manner is gracious, though he seems rather pleased with it.

#### Metadata

```json
{
  "id": "mentor-arrival",
  "region": "silvermere",
  "kind": "npc",
  "locations": [
    {
      "point": [
        20,
        24
      ]
    }
  ],
  "enemy": "elf",
  "optional_drama": true,
  "hide_locked": true,
  "requires": [
    "quest-complete"
  ],
  "grants": [
    "mentor-met"
  ],
  "exclude_flags": [
    "mentor-dismissed"
  ],
  "speech": "There are habits worth learning."
}
```

## mentor-basket · An Errand Without Applause

The orchard basket is ready, but its handle is fraying. Caerion is waiting in the garden. The orchard keeper asks whether you would mind taking the repaired basket by the kitchens first: a sick household has been promised its share.

#### Hint

Recall a passage and choose to serve. This small errand accepts any card; the fuller text may give words to the reason for your choice.

#### Success

$move helps you balance the basket over the little footbridge. You deliver the household's share and bring the remainder to the garden. You are late for the lesson, but no one has been forgotten.

#### Failure

A loose pear escapes the basket and starts a small procession of rolling fruit. You gather the pears, repair the handle, and begin again.

#### Metadata

```json
{
  "id": "mentor-basket",
  "region": "silvermere",
  "kind": "encounter",
  "locations": [
    {
      "point": [
        46,
        87
      ]
    }
  ],
  "accept": [
    "*"
  ],
  "enemy": "squirrel",
  "move": "Steady Hands",
  "hearts": 0,
  "rounds": 1,
  "reward": 15,
  "optional_drama": true,
  "hide_locked": true,
  "requires": [
    "mentor-met"
  ],
  "grants": [
    "basket-served"
  ]
}
```

## mentor-dismissal · A Lesson Interrupted

Caerion sees the mended handle before he sees you. "Late," he says. "And carrying kitchen twine into the garden. I had hoped you would understand what is expected here." You explain where the fruit went. He listens to the words, but not to their meaning.

#### Success

"Perhaps this instruction is not suited to you," he says at last. "You have other useful qualities. We should leave it there." He bows so politely that the dismissal takes a moment to arrive. You go back to the open path. His judgment stings; it does not decide your worth before the Lord, or erase the good of serving a neighbor.

#### Short

Caerion dismisses you for being late and failing his idea of refinement. You had stopped to serve a sick household. His judgment hurts, but it does not define you.

#### Metadata

```json
{
  "id": "mentor-dismissal",
  "region": "silvermere",
  "kind": "npc",
  "locations": [
    {
      "point": [
        64,
        25
      ]
    }
  ],
  "enemy": "elf",
  "optional_drama": true,
  "hide_locked": true,
  "requires": [
    "basket-served"
  ],
  "grants": [
    "mentor-dismissed"
  ],
  "speech": "I had hoped you understood the standard."
}
```

## mentor-apology · The Unclasped Book

You find Caerion near the orchard, his silver-clasped book tucked under one arm. For once he does not begin by teaching. "The keeper told me where the pears went," he says. "Then I heard about the cart. I have had to consider what I meant by attention."

#### Success

"I was proud," he says. "I wanted your improvement to reflect well on me. When you served someone I had not noticed, I treated your kindness as a failure of manners. I wronged you. Will you forgive me?" He does not offer a lesson to soften the admission. You can welcome the apology without pretending the words never hurt. If you choose to walk together again, the next conversation can begin with both of you listening.

#### Short

Caerion admits his pride and asks forgiveness without excuses. You may welcome the apology; rebuilding trust need not be hurried.

#### Metadata

```json
{
  "id": "mentor-apology",
  "region": "silvermere",
  "kind": "npc",
  "locations": [
    {
      "point": [
        55,
        71
      ]
    }
  ],
  "enemy": "elf",
  "optional_drama": true,
  "hide_locked": true,
  "requires": [
    "mentor-dismissed",
    "orchard-saved"
  ],
  "grants": [
    "mentor-reconciled"
  ],
  "speech": "May I begin by listening?",
  "repeatable": false
}
```

## garden-steward · Lethiel and the Open Gate

Lethiel is moving a bench out of the shade. "The valley is lovely," she says, "and we sometimes expect loveliness to do the work of goodness. It will not feed a guest or tell the truth for us."

#### Success

"Enjoy what has been given. Then ask whom it enables you to serve. The Lord does not need us to despise his gifts; he asks us to receive them without making them our masters." She points toward the orchard path. "A short road, if you are not determined to be seen taking it."

#### Short

"Enjoy the gifts, and use them to serve. A lovely garden cannot be good on our behalf."

#### Metadata

```json
{
  "id": "garden-steward",
  "region": "silvermere",
  "kind": "npc",
  "locations": [
    {
      "point": [
        71,
        27
      ]
    }
  ],
  "enemy": "elf",
  "speech": "Beauty cannot do our loving for us.",
  "repeatable": true,
  "patrol": [
    [
      70,
      27
    ],
    [
      72,
      29
    ],
    [
      74,
      27
    ]
  ],
  "patrol_speed": 0.6
}
```

## mountain-chart · A Map Smaller Than the Mountains

A weather-beaten chart is pinned under a flat stone. Five ranges crowd its upper half. Beneath the largest, a tiny trail is marked in a different hand: "Do not trust the width of the ink. A small road may lead farther than a king's highway."

#### Success

You sketch the trail in your notebook. Someone has added a warning about war-camels and a surprisingly detailed drawing of a camel's offended expression. The northern ranges remain beyond this journey, but the map is yours to remember.

#### Metadata

```json
{
  "id": "mountain-chart",
  "region": "silvermere",
  "kind": "sign",
  "locations": [
    {
      "point": [
        49,
        7
      ]
    }
  ],
  "grants": [
    "mountain-chart"
  ],
  "item": "mountain-map",
  "repeatable": true
}
```

## cove-rumor · The Rumor of the Lantern Cove

A stone beside the grotto bears a fisher's mark. An old message says a lantern ship once sheltered in a cove beyond the eastern hills, carrying seeds, medicine, and one chest that nobody ever inventoried.

#### Success

Below it, another traveler has written: "Treasure is easily imagined. The people it was meant to help are easily forgotten." You copy both notes. There may be a cove to seek one day; for now, the hoard in this valley has names in its ledger.

#### Metadata

```json
{
  "id": "cove-rumor",
  "region": "silvermere",
  "kind": "sign",
  "locations": [
    {
      "point": [
        92,
        83
      ]
    }
  ],
  "grants": [
    "cove-heard"
  ],
  "repeatable": true
}
```

## giant-song · A Song at the Standing Stones

A traveling minstrel sits on the lowest stone. "This is an old song," she says. "Older than the habit of calling every tall fellow a giant. The true subject is what a man does with the breath he has been given."

#### Success

He measured all the fields in strides,
And named each mile his own;
The small man knelt beside the road,
And rose to face the stone.

No borrowed breath can crown itself,
No tower command the day;
The Lord who weighs the mighty heart
Can clear a little way.

Then let the mortal lift his head,
And let the proud bend low:
The hands that serve, the heart that trusts,
Are stronger than they know.

"The song is ours," she adds, "not a passage of Scripture. Keep the true words in your pack as well."

#### Short

The minstrel sings of a small mortal facing a giant: borrowed breath is no warrant for pride, and trust in the Lord gives reason to stand.

#### Metadata

```json
{
  "id": "giant-song",
  "region": "silvermere",
  "kind": "npc",
  "locations": [
    {
      "point": [
        89,
        53
      ]
    }
  ],
  "enemy": "girl",
  "speech": "No borrowed breath can crown itself.",
  "repeatable": true
}
```

## gilded-invitation · The Empty Seats at the High Table

An invitation arrives from the manor terrace. Your name has been written among the honored guests. At the gate, the orchard workers are packing away their tools; there are places for their fruit at the feast, but none for them. The steward offers you a silver badge. "The right company is an excellent beginning," he says.

#### Hint

Who are you serving, and whose approval are you seeking? Recall words about gifts, humility, generosity, truth, love, or belonging to Christ. The question is not whether a feast may be enjoyed, but what you do with the welcome you have been given.

#### Success

You leave the badge on the table and ask whether the empty seats can be opened. "The Lord's gifts are not a reason to forget our neighbors," you say. $move becomes a practical proposal: bring the workers in before the food grows cold. Lethiel agrees to speak to the host. The steward hesitates, then begins moving chairs. Some guests disapprove. The orchard keeper, arriving with clean hands and a tired smile, does not.

#### Failure

You accept the badge and put off asking about the empty seats. By the time the toast is over, the workers have gone. Lethiel quietly offers to help arrange a shared meal tomorrow. The choice can be reconsidered; there is still a neighbor to serve.

#### Metadata

```json
{
  "id": "gilded-invitation",
  "kind": "encounter",
  "region": "silvermere",
  "locations": [
    {
      "point": [
        86,
        26
      ]
    }
  ],
  "optional_drama": true,
  "accept": [
    "grace",
    "humility",
    "hope",
    "trust",
    "Christ",
    "truth",
    "abide",
    "wisdom",
    "spirit",
    "love",
    "gift",
    "give",
    "boast",
    "serve"
  ],
  "grants": [
    "table-opened"
  ],
  "enemy": "elf",
  "move": "Open Table",
  "hearts": 0,
  "rounds": 1,
  "reward": 20,
  "source_scenario": "Day: You Win Money, Fame, & Prestige / Help the Poor"
}
```

## cups-after-feast · The Cups After the Music

The garden musicians have finished. Silver cups stand in every imaginable place except the washing basin. Two servants are still working while the guests praise the evening. One cup has been balanced on a statue's head, with an accuracy that suggests practice.

#### Hint

A quiet act of service may matter more than a conspicuous entrance. Recall a passage, then consider how Christ's words shape what you do when there is little applause to be gained.

#### Success

$move begins with an ordinary basin of water. You gather the cups and help the weary servants finish. Caerion's silver-clasped book has been left beside a stack of plates; you move it somewhere dry without making a lesson of the discovery. The work is useful, the company is unexpectedly pleasant, and no announcement is required.

#### Failure

You postpone helping until the last song's melody has left your head. The cups are still there, and the servants are more tired. You can begin now; a good task does not need a dramatic beginning.

#### Metadata

```json
{
  "id": "cups-after-feast",
  "kind": "encounter",
  "region": "silvermere",
  "locations": [
    {
      "point": [
        60,
        24
      ]
    }
  ],
  "optional_drama": true,
  "accept": [
    "*"
  ],
  "grants": [
    "cups-served"
  ],
  "enemy": "elf",
  "move": "Quiet Service",
  "hearts": 0,
  "rounds": 1,
  "reward": 12,
  "source_scenario": "Day: Piles of Dishes / First Day at Work"
}
```


## silver-east-road · The Road Beyond the Garden

The carefully tended garden ends at a weathered milestone. Beyond it, carved pale birches catch the light above a river road.

#### Success

You pass into Birchwater Boughs. The river shines beneath houses carved from living white wood.

#### Metadata

```json
{
  "id": "silver-east-road",
  "region": "silvermere",
  "kind": "portal",
  "locations": [
    {
      "point": [
        94,
        28
      ]
    }
  ],
  "target": {
    "region": "birchwater",
    "point": [
      8,
      40
    ]
  },
  "repeatable": true
}
```


## silver-south-trail · The Long Pear-Wood Trail

A narrow orchard road turns into a long trail through the uplands. The innkeeper says it takes you toward the Last Pine, if you are willing to let the morning become afternoon.

#### Success

After the long walk, cold clear air meets you among the high meadows. The route is open in both directions.

#### Metadata

```json
{
  "id": "silver-south-trail",
  "region": "silvermere",
  "kind": "portal",
  "locations": [
    {
      "point": [
        69,
        93
      ]
    }
  ],
  "target": {
    "region": "highfold",
    "point": [
      45,
      92
    ]
  },
  "repeatable": true,
  "requires": [
    "outer-road-open"
  ]
}
```


## mentor-farewell · A Lesson Caerion Has Not Finished

Caerion has put away his silver clasp. “I used to think an excellent lesson left no room for interruption. Now I wonder how many neighbors I called interruptions.”

#### Success

“Christ did not teach us to polish a reputation while passing by the person before us. I am still learning that.” He offers a plain map of the March. This time there is no condition attached to his help.

#### Metadata

```json
{
  "id": "mentor-farewell",
  "region": "silvermere",
  "kind": "npc",
  "locations": [
    {
      "point": [
        57,
        74
      ]
    }
  ],
  "enemy": "elf",
  "optional_drama": true,
  "hide_locked": true,
  "requires": [
    "mentor-reconciled"
  ],
  "speech": "A neighbor is not an interruption.",
  "wisdom_cards": [
    "day-6",
    "day-23"
  ],
  "wisdom_focus": "Christlike service and repentance without self-excuse"
}
```


## march-rest · The Camp Between Two Roads

A cook has hung two kettles over the fire: one for supper, and one for the traveler who will undoubtedly arrive after supper.

#### Success

Rest, practice, and keep exploring. The March has roads back to Silvermere, onward to Highfold, and down into the old burrows.

#### Rumors

A treehouse window stays open even when its scholar is away. Follow the wooden stair by the bridge.
The northern lodge keeps records that neither a boast nor a rumor can change.
The eastern stones lead toward Highfold; the southern burrow returns to Greenwood.
The guard at the watchtower worries more about appearances than the exhausted travelers below.

#### Metadata

```json
{
  "id": "march-rest",
  "region": "aldermarch",
  "kind": "camp",
  "locations": [
    {
      "point": [
        54,
        76
      ]
    }
  ],
  "repeatable": true
}
```


## march-west · The Westward Arch

The arch is older than the boundary it marks. Lilyfall Court lies beyond the alders, still lovely and still in need of faithful hands.

#### Success

You return to Lilyfall Court. A road can be familiar without being finished.

#### Metadata

```json
{
  "id": "march-west",
  "region": "aldermarch",
  "kind": "portal",
  "locations": [
    {
      "point": [
        5,
        43
      ]
    }
  ],
  "target": {
    "region": "lilyfall",
    "point": [
      93,
      44
    ]
  },
  "repeatable": true
}
```


## march-east · The Windward Pass

Beyond the watchtower, the road follows heather rather than hedges. A last elven milestone bears the name Highfold.

#### Success

The air grows clearer and the trees farther apart. The high country has room for both wonder and watchfulness.

#### Metadata

```json
{
  "id": "march-east",
  "region": "aldermarch",
  "kind": "portal",
  "locations": [
    {
      "point": [
        94,
        36
      ]
    }
  ],
  "target": {
    "region": "highfold",
    "point": [
      7,
      42
    ]
  },
  "repeatable": true
}
```


## march-burrow · The Burrow Under the Ridge

A silver cord disappears under the rocky ridge. Someone has tied a pear leaf to it; somebody else has added an acorn. The squirrel signatures are unmistakable.

#### Success

The long tunnel emerges near Greenwood’s eastern roots. It is a shortcut, not a promise that the world is arranged neatly.

#### Metadata

```json
{
  "id": "march-burrow",
  "region": "aldermarch",
  "kind": "portal",
  "locations": [
    {
      "point": [
        91,
        85
      ]
    }
  ],
  "target": {
    "region": "greenwood",
    "point": [
      91,
      82
    ]
  },
  "repeatable": true
}
```


## treehouse-scholar · The Open Window

Saran has built his reading room where the branches make a fork. Through the open window the bridge, the camp, and the distant road can all be seen. “A book does not make a neighbor less real,” he says.

#### Success

“The true Word is Christ, not a secret peculiar to elves. We receive what God has spoken; we do not improve it by pretending it belongs to us. Learn carefully, then take the words down the stairs.” A small shelf holds a way-card beside a well-used lantern.

#### Short

Saran welcomes you to his treehouse. “The Word is Christ, not an elven secret. Receive God’s words carefully, then live them among your neighbors.”

#### Metadata

```json
{
  "id": "treehouse-scholar",
  "region": "aldermarch",
  "kind": "npc",
  "locations": [
    {
      "point": [
        31,
        33
      ]
    }
  ],
  "enemy": "elf",
  "speech": "Take the words down the stairs.",
  "repeatable": true,
  "wisdom_cards": [
    "night-1",
    "day-22",
    "day-23"
  ],
  "wisdom_focus": "Christ the Word and Scripture received, understood and obeyed"
}
```


## march-cartographer · A Margin on the Map

An elven cartographer studies a strip of blank parchment beyond the drawn hills. “The empty margin is honest,” she says. “We have not been there.”

#### Success

“Mark what you know. Admit what you do not. Trusting the Lord is not an excuse to draw a bridge where there is none.” She sketches the two crossings already tested and leaves the distant mountains unadorned.

#### Short

The cartographer marks proven crossings and admits where she has not traveled. Trust and careful planning belong together.

#### Metadata

```json
{
  "id": "march-cartographer",
  "region": "aldermarch",
  "kind": "npc",
  "locations": [
    {
      "point": [
        89,
        24
      ]
    }
  ],
  "enemy": "girl",
  "speech": "An empty margin can be honest.",
  "repeatable": true,
  "wisdom_cards": [
    "day-25",
    "day-37"
  ],
  "wisdom_focus": "Humility about knowledge and prudent planning before the Lord"
}
```


## borrowed-banner · The Guard and the Borrowed Banner

A watch-guard has ordered a tired family off the broad road so a silver banner can pass without mud on its hem. “We keep a high standard here,” he says. Behind him, an empty cart could carry their bundles.

#### Success

You ask what the standard is meant to serve. $move is an offer: carry the bundles on the empty cart and guide the family along the open road. The guard reddens, then takes the heaviest bundle himself. The banner survives a little mud; the family reaches shelter.

#### Hint

Recall words about Christ’s example, gifts received, humility, love, or truth. Speak firmly without humiliating the guard; the travelers need practical help.

#### Failure

You spend too long composing a grand reply. The family begins the slower track. You catch up, apologize for the delay, and offer the cart; useful help is still possible.

#### Metadata

```json
{
  "id": "borrowed-banner",
  "region": "aldermarch",
  "kind": "encounter",
  "locations": [
    {
      "point": [
        78,
        44
      ]
    }
  ],
  "accept": [
    "serve",
    "love",
    "grace",
    "gift",
    "give",
    "humility",
    "boast",
    "Christ",
    "truth",
    "burdens",
    "Jesus",
    "master",
    "example"
  ],
  "move": "Open Road",
  "rounds": 1,
  "reward": 22,
  "hearts": 0,
  "enemy": "elf",
  "wisdom_cards": [
    "day-6",
    "day-14",
    "night-18"
  ],
  "wisdom_focus": "Authority and honor should serve, not exclude, one’s neighbor",
  "grants": [
    "banner-lowered"
  ]
}
```


## paper-seal · The Broken Seal

A storehouse record lies under a broken seal. An eager messenger points at the youngest porter. “He was last here. Surely we know enough.” A draft through the window lifts another page; the matching seal is caught behind it.

#### Success

You refuse to turn a guess into an accusation. $move brings the loose pages and seal together on the desk. The porter’s delivery was entered correctly; the wax broke when the shutter blew open. The messenger apologizes publicly, as publicly as he accused.

#### Hint

Listen before judging, seek the truth, and do not use God’s name to endorse a suspicion. A passage can steady that choice while you examine the ordinary evidence.

#### Failure

The accusation spreads before the second page is read. You return with the record, correct the rumor, and ask the porter’s forgiveness. Repair takes more work than restraint would have.

#### Metadata

```json
{
  "id": "paper-seal",
  "region": "aldermarch",
  "kind": "encounter",
  "locations": [
    {
      "point": [
        18,
        20
      ]
    }
  ],
  "accept": [
    "truth",
    "judge",
    "judgment",
    "listen",
    "hear",
    "speech",
    "Christ",
    "righteous",
    "wisdom",
    "word"
  ],
  "move": "Clear Record",
  "rounds": 1,
  "reward": 22,
  "hearts": 0,
  "enemy": "elf",
  "wisdom_cards": [
    "day-3",
    "day-23",
    "day-33",
    "night-9"
  ],
  "wisdom_focus": "Truth, impartial judgment and repair of a false accusation",
  "optional_drama": true,
  "grants": [
    "seal-restored"
  ]
}
```


## march-rootworm · The Worm at the Footbridge

A root-worm stretches across the shaded track, tasting the air with its horns. A hanging bell-rope lies just beyond it; a hollow stone beside the trail would make an excellent echo.

#### Success

$move takes you along the sound bank. You strike the hollow stone, then pull the bell-rope. The worm chases the first echo while you cross the clear bridge. It is powerful, but not especially good at distinguishing a noise from a meal.

#### Hint

This is a movement trial. Any discovered passage may be practiced; the escape uses the bank, the bell, and attention rather than treating a verse as a spell.

#### Failure

You land short of the bell-rope and scramble back onto the bank. One heart is lost in the tumble. The worm tries to swallow its own echo, leaving time to recover.

#### Metadata

```json
{
  "id": "march-rootworm",
  "region": "aldermarch",
  "kind": "encounter",
  "locations": [
    {
      "point": [
        57,
        45
      ]
    }
  ],
  "accept": [
    "*"
  ],
  "move": "Echo Step",
  "rounds": 1,
  "reward": 22,
  "hearts": 1,
  "enemy": "worm",
  "wisdom_cards": [
    "day-23",
    "day-37",
    "night-23"
  ],
  "wisdom_focus": "Patient attention, dependence and prudent action during a physical obstacle",
  "repeatable": true,
  "patrol": [
    [
      55,
      45
    ],
    [
      59,
      44
    ],
    [
      62,
      45
    ],
    [
      60,
      46
    ]
  ],
  "patrol_speed": 1.9,
  "aggressive": true,
  "chase_radius": 4,
  "chase_speed": 2.8,
  "leash": 6
}
```


## false-lanterns · The Lanterns That Lead Away

A Man-Ghoul has hung lanterns above a path ending in loose shale. “Everyone brave goes this way,” it calls. The tested road lies in shadow, but its bridge posts are sound.

#### Success

You decline both the taunt and the false trail. $move takes you by the tested bridge. You turn the lantern hook with a long branch, leaving the false lights facing the ghoul’s empty hillside. It follows its own glittering signs while you warn the next traveler.

#### Hint

Consider truth, light, wisdom, faithfulness, and Christ’s words. Boldness need not accept a foolish dare; take the sound path and warn a neighbor.

#### Failure

You follow the bright lamps without checking the ground. Shale slides under your boots. You regain the sound bank, lose one heart, and mark the false turn before trying again.

#### Metadata

```json
{
  "id": "false-lanterns",
  "region": "aldermarch",
  "kind": "encounter",
  "locations": [
    {
      "point": [
        65,
        60
      ]
    }
  ],
  "accept": [
    "light",
    "truth",
    "wisdom",
    "word",
    "faith",
    "trust",
    "Christ",
    "path",
    "listen"
  ],
  "move": "Truepath Turn",
  "rounds": 1,
  "reward": 22,
  "hearts": 1,
  "enemy": "ghoul",
  "wisdom_cards": [
    "night-3",
    "night-9",
    "day-37",
    "day-23"
  ],
  "wisdom_focus": "Rejecting deception and peer-pressure with truth and prudent courage",
  "grants": [
    "false-lights-marked"
  ],
  "patrol": [
    [
      65,
      60
    ],
    [
      67,
      59
    ],
    [
      69,
      62
    ]
  ],
  "patrol_speed": 0.9,
  "aggressive": true,
  "chase_radius": 3,
  "chase_speed": 2.1,
  "leash": 5
}
```


## march-wind · The Wind in the Loose Canvas

A gust tears a tent line loose. The kettle stays upright, but the sleeping roll is about to become a very small kite. The cook points toward a spare peg and a low stone.

#### Success

$move carries the spare line around the stone. You lower the canvas, set the peg, and retrieve the roll. The cook offers you a bowl. The roll, having briefly attempted flight, offers no further opinions.

#### Hint

A repeatable action trial: practice any discovered passage, then act with attention to the ordinary means in front of you.

#### Failure

The roll lands in the hedge. You bring it back, brush it clean, and reset the line. The cook admits that the hedge has caught worse travelers.

#### Metadata

```json
{
  "id": "march-wind",
  "region": "aldermarch",
  "kind": "encounter",
  "locations": [
    {
      "point": [
        48,
        73
      ]
    }
  ],
  "accept": [
    "*"
  ],
  "move": "Canvas Catch",
  "rounds": 1,
  "reward": 22,
  "hearts": 0,
  "enemy": "squirrel",
  "wisdom_cards": [
    "night-23",
    "day-23"
  ],
  "wisdom_focus": "Steadiness and practical neighborly care",
  "repeatable": true
}
```


## march-boundary-song · The Song of the Last Gate

A short road-song has been cut into the underside of a lintel. It is the work of a traveler, not Scripture.

#### Success

Beyond the gate the tall grass bends;
The road forgets our names.
Yet Christ, who knows the least of us,
Is Lord beyond our claims.

So carry bread, and speak the truth;
Let borrowed honors fall.
The miles are wide, the heart is small—
His mercy wider still.

#### Metadata

```json
{
  "id": "march-boundary-song",
  "region": "aldermarch",
  "kind": "sign",
  "locations": [
    {
      "point": [
        82,
        58
      ]
    }
  ],
  "repeatable": true,
  "wisdom_cards": [
    "day-7",
    "day-14",
    "night-7"
  ],
  "wisdom_focus": "Christ’s lordship and mercy beyond cultural prestige"
}
```


## highfold-rest · The Wayhouse of the Last Pine

Inside the low wayhouse a lamp burns beside dry socks, a kettle, and a ledger of travelers who returned. There is room for your name, but no requirement that you boast about the route.

#### Success

Rest here and practice. Mountain air is not proof against fatigue; accepting food and shelter is part of preparing for the road.

#### Rumors

The observatory’s keeper knows the stars are a witness to the Creator, not a horoscope.
A cave keeps dry records from the Ash War; its door-warden trusts threats more than truth.
The pear-wood trail returns to Silvermere by a long southern pass.
Two old monoliths mark the road east, but their height is no measure of the Lord’s strength.

#### Metadata

```json
{
  "id": "highfold-rest",
  "region": "highfold",
  "kind": "camp",
  "locations": [
    {
      "point": [
        20,
        72
      ]
    }
  ],
  "repeatable": true
}
```


## highfold-west · The Road to the Alders

The western arch looks out toward the tops of the alders far below. The March is within reach, and supper is a reasonable reason to return.

#### Success

You descend to Alderwatch. The high meadows will wait.

#### Metadata

```json
{
  "id": "highfold-west",
  "region": "highfold",
  "kind": "portal",
  "locations": [
    {
      "point": [
        5,
        43
      ]
    }
  ],
  "target": {
    "region": "aldermarch",
    "point": [
      93,
      36
    ]
  },
  "repeatable": true
}
```


## highfold-south · The Pear-Wood Descent

A long descending path winds through pine, beech, and at last pear trees. A faded silver cord marks the turns.

#### Success

The road brings you to Silvermere’s southern orchard. You have gone around a little more of the world.

#### Metadata

```json
{
  "id": "highfold-south",
  "region": "highfold",
  "kind": "portal",
  "locations": [
    {
      "point": [
        45,
        93
      ]
    }
  ],
  "target": {
    "region": "silvermere",
    "point": [
      69,
      91
    ]
  },
  "repeatable": true
}
```


## sky-keeper · What the Stars Do Not Say

Eren, the observatory keeper, lowers a brass sighting ring. “The heavens tell us the greatness of their Maker. They do not tell me to accuse a neighbor because of the day he was born.”

#### Success

“Christ made the world. His words teach us whom to trust and how to live. Measure the stars for navigation; listen to Scripture for wisdom.” He turns the instrument toward a familiar star and shows you the ordinary road beneath it.

#### Short

Eren uses stars for navigation, not divination. The heavens display their Maker’s glory; Christ’s words teach us how to live.

#### Metadata

```json
{
  "id": "sky-keeper",
  "region": "highfold",
  "kind": "npc",
  "locations": [
    {
      "point": [
        50,
        17
      ]
    }
  ],
  "enemy": "elf",
  "speech": "Measure the stars; trust their Maker.",
  "repeatable": true,
  "wisdom_cards": [
    "night-1",
    "night-32",
    "day-22"
  ],
  "wisdom_focus": "Creation witnesses to its Maker; reject divination and receive Scripture"
}
```


## weary-sentinel · The Watch He Cannot Keep Alone

A young sentinel has been awake since yesterday. “If I ask for help, they will know I am not sufficient,” he says. His hand trembles above the signal rope while a supply wagon enters the rough pass.

#### Success

You offer to share the watch and fetch the relief keeper. $move steadies the signal while the sentinel rests. The wagon reaches the tested crossing. Dependence has not made him useless; it has brought the right help to the right place.

#### Hint

Recall words about dependence on God, comfort, shared burdens, prayer or Christ’s grace. Help him act responsibly; trust does not require pretending fatigue is strength.

#### Failure

The sentinel misses the first signal. You halt the wagon on sound ground and call for relief. A delay is better than a needless fall; the watch can be shared now.

#### Metadata

```json
{
  "id": "weary-sentinel",
  "region": "highfold",
  "kind": "encounter",
  "locations": [
    {
      "point": [
        65,
        44
      ]
    }
  ],
  "accept": [
    "trust",
    "grace",
    "comfort",
    "burdens",
    "pray",
    "prayer",
    "abide",
    "love",
    "Christ",
    "God",
    "strength"
  ],
  "move": "Shared Watch",
  "rounds": 1,
  "reward": 22,
  "hearts": 0,
  "enemy": "elf",
  "wisdom_cards": [
    "night-15",
    "night-18",
    "night-24",
    "day-8"
  ],
  "wisdom_focus": "Dependence, prayer and shared burdens instead of proud self-sufficiency",
  "grants": [
    "watch-shared"
  ]
}
```


## giants-shadow · The Shadow Taller Than Its Owner

A Man-Ghoul stands on a high boulder so its shadow covers both monoliths. “Nothing small survives beyond my stones,” it says. Below its perch, an old warning gong hangs beside a counterweighted road barrier.

#### Success

“My hope is in God,” you answer. You do not claim that faith makes your boots unable to slip. $move brings you to the tested side of the barrier; you lower it and strike the gong. The ghoul’s great shadow shivers as the noise sends it scrambling down the empty ravine. The supply party can cross behind the stone guardrail.

#### Hint

A passage about the Lord, Christ’s victory, hope or faithful endurance answers its claim. The physical escape uses the barrier and alarm; courage serves the people crossing behind you.

#### Failure

You rush toward the high perch rather than using the sound barrier. Loose gravel sends you back to the path with one heart lost. The gong and guardrail are still there; you can return with a clearer plan.

#### Metadata

```json
{
  "id": "giants-shadow",
  "region": "highfold",
  "kind": "encounter",
  "locations": [
    {
      "point": [
        89,
        48
      ]
    }
  ],
  "accept": [
    "Lord",
    "Christ",
    "hope",
    "light",
    "salvation",
    "trust",
    "fear",
    "faith",
    "grace",
    "courage",
    "strength",
    "wisdom",
    "hear",
    "listen",
    "word"
  ],
  "move": "Gongward Dash",
  "rounds": 2,
  "reward": 48,
  "hearts": 1,
  "enemy": "ghoul",
  "wisdom_cards": [
    "night-33",
    "night-8",
    "day-21",
    "night-21"
  ],
  "wisdom_focus": "Hope in the Lord and Christ’s victory without a promise of worldly invulnerability",
  "grants": [
    "east-pass-clear"
  ],
  "patrol": [
    [
      88,
      47
    ],
    [
      91,
      47
    ],
    [
      91,
      49
    ],
    [
      89,
      50
    ]
  ],
  "patrol_speed": 0.8,
  "aggressive": true,
  "chase_radius": 4,
  "chase_speed": 2.2,
  "leash": 5
}
```


## ash-ledger · The Ledger Behind the Stone Door

A cruel door-warden guards the old cave ledger. “Read it and learn whose children deserve the blame,” it says. The record tells of the Ash War, but a stone winch can open a side door without anyone taking the warden’s bait.

#### Success

You will not turn an old wrong into hatred of a living household. $move takes the winch through its last turn. The side door opens; the warden flees the falling dust. The ledger names deeds and losses accurately. You carry it to the keeper so restitution can be sought without inventing guilt by ancestry.

#### Hint

Seek truth and justice, reject false blame, and remember that people are not the spiritual enemy described in Ephesians 6. The warden is a fictional creature; the records should lead to truth and repair.

#### Failure

You seize the door before checking its weight. It drops into its catch, and you retreat from the dust with one heart lost. The safe winch remains available.

#### Metadata

```json
{
  "id": "ash-ledger",
  "region": "highfold",
  "kind": "encounter",
  "locations": [
    {
      "point": [
        89,
        66
      ]
    }
  ],
  "accept": [
    "truth",
    "justice",
    "righteous",
    "judge",
    "Christ",
    "love",
    "wisdom",
    "mercy",
    "word",
    "listen",
    "hear"
  ],
  "move": "Ledger Lift",
  "rounds": 2,
  "reward": 45,
  "hearts": 1,
  "enemy": "ghoul",
  "wisdom_cards": [
    "day-3",
    "day-33",
    "night-9",
    "night-40"
  ],
  "wisdom_focus": "Truth and justice without collective blame or hatred",
  "grants": [
    "ledger-recovered"
  ]
}
```


## last-light · A Lantern for the Latecomer

The keeper has one bright lantern left when a traveler limps out of the heather. Your own next turn is dark. The keeper points to a lower sheltered path where two people can walk safely with the light between them.

#### Success

You choose to walk the sheltered route together. $move is a shared pace, not a dazzling leap. The latecomer reaches the wayhouse; you learn the sound lower path for tomorrow. You have given real help without pretending that danger is imaginary.

#### Hint

A card about love, service, mercy or bearing burdens may express why you share the road. Practical care includes the safe route and the keeper’s help.

#### Failure

You hurry toward the exposed ridge alone, then return when the turn proves unsafe. The keeper offers the sheltered path again. A good decision can begin with admitting a poor one.

#### Metadata

```json
{
  "id": "last-light",
  "region": "highfold",
  "kind": "encounter",
  "locations": [
    {
      "point": [
        31,
        77
      ]
    }
  ],
  "accept": [
    "love",
    "serve",
    "burdens",
    "kind",
    "mercy",
    "Christ",
    "word",
    "hear",
    "listen",
    "Jesus",
    "master",
    "example"
  ],
  "move": "Shared Lantern",
  "rounds": 1,
  "reward": 22,
  "hearts": 0,
  "enemy": "girl",
  "wisdom_cards": [
    "night-18",
    "day-6",
    "night-4",
    "day-23"
  ],
  "wisdom_focus": "Love takes a prudent, tangible form in carrying a neighbor’s burden",
  "grants": [
    "latecomer-home"
  ]
}
```


## highfold-camel-chart · A Drawing With Enormous Feet

A chart on a flat boulder shows the dry lands beyond the next ranges. Along its edge an artist has drawn a war-camel, then written: “The saddle is for a giant. The temper is entirely its own.”

#### Success

You copy the chart. The eastward lands remain beyond the present journey, but the image is a promise of further exploring, not a shortcut through a missing region.

#### Metadata

```json
{
  "id": "highfold-camel-chart",
  "region": "highfold",
  "kind": "sign",
  "locations": [
    {
      "point": [
        80,
        24
      ]
    }
  ],
  "item": "camel-chart",
  "grants": [
    "camel-chart"
  ],
  "repeatable": true
}
```


## highfold-stone-song · What a Shadow Cannot Own

A traveler’s verse rests in the cleft of a stone. It is a road-song, not a quotation from Scripture.

#### Success

A shadow takes the shape of height,
But cannot lend a breath;
The Lord of life has walked our night
And broken sin and death.

Then stand without the boastful crown,
And help your neighbor stand;
The strongest step may lead you down
To offer one small hand.

#### Metadata

```json
{
  "id": "highfold-stone-song",
  "region": "highfold",
  "kind": "sign",
  "locations": [
    {
      "point": [
        27,
        25
      ]
    }
  ],
  "repeatable": true,
  "wisdom_cards": [
    "day-21",
    "night-8",
    "day-6"
  ],
  "wisdom_focus": "Christ’s victory over sin and death grounds humble, serving courage"
}
```


## birch-rest · The Riverside Shelter

White steps curl around a living birch. The roof above them was carved like a folded lily; through its open sides the river answers every voice. Carver elves leave bread, blankets and an empty chair for small travelers.

#### Success

Rest, remember the words, and listen to the river. An old chest offers cards you have not yet discovered.

#### Metadata

```json
{
  "id": "birch-rest",
  "region": "birchwater",
  "kind": "camp",
  "locations": [
    {
      "point": [
        16,
        73
      ]
    }
  ],
  "repeatable": true
}
```


## birch-west · The Silvermere Road

The pale arch looks west toward Silvermere.

#### Success

Return along the shaded road.

#### Metadata

```json
{
  "id": "birch-west",
  "region": "birchwater",
  "kind": "portal",
  "locations": [
    {
      "point": [
        5,
        40
      ]
    }
  ],
  "target": {
    "region": "silvermere",
    "point": [
      93,
      28
    ]
  },
  "repeatable": true
}
```


## birch-east · The Road of Lilyfalls

The water has many voices here. Beyond the eastern boughs they gather into one falling song.

#### Success

Follow the water to Lilyfall Court.

#### Metadata

```json
{
  "id": "birch-east",
  "region": "birchwater",
  "kind": "portal",
  "locations": [
    {
      "point": [
        94,
        42
      ]
    }
  ],
  "target": {
    "region": "lilyfall",
    "point": [
      8,
      48
    ]
  },
  "repeatable": true
}
```


## white-bough-scholar · Iriel of the White Bough

Iriel opens a book beneath a window shaped like a leaf. “We carve the wood so that light can enter,” she says. “But the light is not ours. Nor is wisdom our possession by birth. Christ is before all things, and all things hold together in him. If you learn our craft and forget the Lord, you have learned the smaller thing and lost the greater.”

#### Short

“Our finest carving lets in light. Wisdom comes from Christ, not our ancestry.”

#### Success

She shows you a ledge where a squirrel has hidden a reading ribbon. You take the ribbon gently, leaving the creature its acorn. The room opens to a view of living water.

#### Metadata

```json
{
  "id": "white-bough-scholar",
  "region": "birchwater",
  "kind": "npc",
  "locations": [
    {
      "point": [
        25,
        18
      ]
    }
  ],
  "enemy": "elf",
  "speech": "The craft is ours to learn; the glory belongs to the Lord.",
  "repeatable": true,
  "wisdom_cards": [
    "night-1",
    "night-32",
    "day-22"
  ],
  "wisdom_focus": "Creation and craftsmanship point to the Creator; wisdom is received in Christ, not ethnic superiority."
}
```


## noble-bear · Aurel, Keeper of the Ford

A great golden bear stands above the spray. A pale carved collar rests on shoulders broad enough to carry a gate. His voice is low and measured. “I am Aurel. The ford is under my care; the river is under God’s. Those are very different responsibilities.” He watches a small traveler stumble, then crosses the stones with astonishing gentleness. “Strength is not diminished by stooping.”

#### Short

“I guard the ford. God owns the river. Take the dry span; strength can serve.”

#### Success

Aurel steadies a loose stepping stone with one immense paw. “Take the dry span, Riverkin. I could carry you, but I would rather teach you to see a sound crossing.” He waits until you are safely across before returning to the ford.

#### Metadata

```json
{
  "id": "noble-bear",
  "region": "birchwater",
  "kind": "npc",
  "locations": [
    {
      "point": [
        59,
        48
      ]
    }
  ],
  "enemy": "noble-bear",
  "speech": "Strength is not diminished by stooping.",
  "patrol": [
    [
      58,
      47
    ],
    [
      60,
      51
    ],
    [
      57,
      52
    ]
  ],
  "patrol_speed": 0.8,
  "repeatable": true,
  "wisdom_cards": [
    "day-6",
    "day-14",
    "night-18"
  ],
  "wisdom_focus": "Formidable strength serves neighbors under God’s lordship; assistance includes sound practical care."
}
```


## cave-bear · Bracken of the Cool Stone

A shaggy dark bear fills the cave entrance. He looks formidable, smells of wet earth, and has a surprisingly precise opinion about mushrooms. “Bracken,” he says. “I like a roof that cannot blow away. I also like visitors who knock.” His growl rolls through the stone; then he shifts a basket toward you. “Those berries are for the hungry. Do not mistake a gift for permission to take the whole pantry.”

#### Short

“Knock first. Share your berries. Ask before taking mine. That mossy rock is my chair.”

#### Success

You knock on the stone and ask about the trail. Bracken points with one heavy claw. “Left at the split root. Share what you have; ask before taking what belongs to another. And if you see a flat rock with moss like a cushion, leave it. That is my chair.” He offers a berry and a booming laugh.

#### Metadata

```json
{
  "id": "cave-bear",
  "region": "birchwater",
  "kind": "npc",
  "locations": [
    {
      "point": [
        87,
        84
      ]
    }
  ],
  "enemy": "cave-bear",
  "speech": "A good cave has room for guests who knock.",
  "repeatable": true,
  "wisdom_cards": [
    "day-6",
    "day-33",
    "day-14"
  ],
  "wisdom_focus": "Generosity and truthful respect for another’s boundaries can coexist; appearance does not determine virtue."
}
```


## polished-gift · The Carving With No Signature

A carver hides a young apprentice’s name under a silver plaque bearing his own. “The visitor must see perfection,” he whispers. “A child’s credit would spoil the presentation.” The apprentice stands by, gripping an empty chisel.

#### Short

A master takes credit for an apprentice’s work. Whose name belongs on it?

#### Success

You ask whose patient hands shaped the wing. Then you turn the plaque over and invite the apprentice to tell the work’s story. $move reveals the small signature beneath. The older carver is silent; at last he removes his own plaque. The work’s beauty remains, and the truth can stand beside it.

#### Hint

Look for words about truth, humility, gifts, serving or love. Skill is a gift to use faithfully, not a warrant to steal another’s honor.

#### Failure

You admire the plaque without asking about the wing. The apprentice leaves. You can return, ask what happened, and speak truthfully without humiliating either carver.

#### Metadata

```json
{
  "id": "polished-gift",
  "region": "birchwater",
  "kind": "encounter",
  "locations": [
    {
      "point": [
        81,
        23
      ]
    }
  ],
  "enemy": "elf",
  "accept": [
    "truth",
    "true",
    "gift",
    "serve",
    "love",
    "humble",
    "grace",
    "Christ",
    "word",
    "wisdom",
    "listen",
    "boast",
    "received",
    "judge",
    "judgment",
    "righteous"
  ],
  "move": "Uncovered Signature",
  "rounds": 1,
  "reward": 25,
  "hearts": 0,
  "grants": [
    "carvers-credit-restored"
  ],
  "wisdom_cards": [
    "day-14",
    "day-3",
    "day-33",
    "night-9"
  ],
  "wisdom_focus": "Truthful honor, stewardship of gifts, and humble service oppose self-exaltation."
}
```


## root-harrier · The Bridge-Bell Harrier

A root-worm snaps at a loose bell rope beneath the footbridge. Each tug shakes the deck. Aurel cannot fit beneath the arch, but points out a second bell on the dry bank.

#### Short

A root-worm shakes the bridge. Sound the bank bell while Aurel holds the rope.

#### Success

Remembering the words steadies your attention. You strike the bank bell with $move, then step onto the protected landing. The worm turns toward the sound; Aurel pins the loosened rope under a heavy stone. The bridge is quiet again.

#### Hint

Any discovered card can help you pause and act clearly. The bell and the bear’s practical help resolve this fictional danger.

#### Failure

You pull the dangling rope. The worm splashes you, and Aurel helps you back to the bank. You keep your cards and can try the safer bell.

#### Metadata

```json
{
  "id": "root-harrier",
  "region": "birchwater",
  "kind": "encounter",
  "locations": [
    {
      "point": [
        48,
        57
      ]
    }
  ],
  "enemy": "worm",
  "accept": [
    "*"
  ],
  "move": "Bank-Bell Turn",
  "rounds": 1,
  "reward": 24,
  "hearts": 1,
  "grants": [
    "birch-bell-safe"
  ],
  "wisdom_cards": [
    "day-23",
    "day-37",
    "night-23"
  ],
  "wisdom_focus": "Remembered truth steadies attention; practical cooperation, not magical quotation, resolves danger."
}
```


## riverkin-burrow · The Mossy Shortcut

Bracken points to an old tunnel beside his cave. “It reaches the orchard below Silvermere. You will have to walk; a bear would have to become a rug.”

#### Success

Follow the tunnel to Silvermere’s orchard.

#### Metadata

```json
{
  "id": "riverkin-burrow",
  "region": "birchwater",
  "kind": "portal",
  "locations": [
    {
      "point": [
        85,
        87
      ]
    }
  ],
  "target": {
    "region": "silvermere",
    "point": [
      55,
      88
    ]
  },
  "repeatable": true
}
```


## birch-song · The Small Window

A road-song is carved beside the water. These are a traveler’s own lines, not Scripture.

#### Success

The bright leaf cannot make the day,
The window cannot make the light;
But open hands can give away
A place to rest before the night.

Lord Christ, who holds the waters fast,
Keep pride from closing up my door;
Let gifts be given while they last,
And teach my heart to welcome more.

#### Metadata

```json
{
  "id": "birch-song",
  "region": "birchwater",
  "kind": "sign",
  "locations": [
    {
      "point": [
        32,
        80
      ]
    }
  ],
  "repeatable": true,
  "wisdom_cards": [
    "day-6",
    "day-14",
    "night-32"
  ],
  "wisdom_focus": "Christ sustains creation; humble hospitality uses received gifts."
}
```


## lily-rest · The Lower Water Shelter

A sheltered bench looks across the falling water. A reading lantern burns behind clear glass, and the bench is long enough for Riverkin, elves and one very determined bear.

#### Success

Rest and practice. Beyond the eastern gate lies a harder road, but the court is yours to explore.

#### Metadata

```json
{
  "id": "lily-rest",
  "region": "lilyfall",
  "kind": "camp",
  "locations": [
    {
      "point": [
        21,
        83
      ]
    }
  ],
  "repeatable": true
}
```


## lily-west · The Birchwater Arch

White birches bend over the road to the Carvers’ houses.

#### Success

Return to Birchwater Boughs.

#### Metadata

```json
{
  "id": "lily-west",
  "region": "lilyfall",
  "kind": "portal",
  "locations": [
    {
      "point": [
        5,
        48
      ]
    }
  ],
  "target": {
    "region": "birchwater",
    "point": [
      93,
      42
    ]
  },
  "repeatable": true
}
```


## lily-east · The Outer Road

Beyond the gate the trees thin toward Alderwatch March. A broken trail marker must be set right before the keeper opens that road.

#### Success

The restored marker points safely toward Alderwatch.

#### Metadata

```json
{
  "id": "lily-east",
  "region": "lilyfall",
  "kind": "portal",
  "locations": [
    {
      "point": [
        94,
        44
      ]
    }
  ],
  "target": {
    "region": "aldermarch",
    "point": [
      8,
      42
    ]
  },
  "requires": [
    "outer-road-open"
  ],
  "repeatable": true
}
```


## statuesque-reader · Talan of the Living Water Library

Talan is a Statuesque elf from the mountain courts: tall, still, and patient as a pillar. He turns a page with a mason’s careful hand. “Stone keeps an inscription longer than wood,” he says, “but neither keeps a heart. The Lord teaches us to hear and obey. Our people can build magnificent doors and still fail to welcome the weary person at them.”

#### Short

“Stone can keep words. Only the Lord changes hearts. Read, then help your neighbor.”

#### Success

He gives you a seat beside the open window. “The Book is not a badge of our refinement. In Christ, wisdom calls us into faithful love. Read, remember, and put down the book long enough to carry your neighbor’s bag.”

#### Metadata

```json
{
  "id": "statuesque-reader",
  "region": "lilyfall",
  "kind": "npc",
  "locations": [
    {
      "point": [
        25,
        14
      ]
    }
  ],
  "enemy": "elf",
  "speech": "A fine door should still open to the weary.",
  "repeatable": true,
  "wisdom_cards": [
    "day-23",
    "day-6",
    "night-18"
  ],
  "wisdom_focus": "Hearing the true Word leads to obedience and love; knowledge or refined culture is not spiritual superiority."
}
```


## beautiful-exclusion · The Uninvited Boatmaker

At the learning court an elf turns a Riverkin boatmaker away. “Her boots are muddy. The lecture concerns beauty.” The boatmaker has brought the repaired ferry the court asked for, and the invitation is still in her hand.

#### Short

The invited boatmaker is turned away for muddy boots. Will the beautiful court welcome her?

#### Success

You ask the keeper to read the invitation aloud. The boatmaker wipes her boots; you carry the repair tools to the entry rack. $move opens a chair beside the other craftspeople. The keeper apologizes without asking her to pretend the slight did not happen.

#### Hint

Consider words about love, service, truth, mercy or showing honor. Practical kindness and a truthful correction belong together.

#### Failure

You laugh along with the keeper. The repaired ferry waits outside. You can return, acknowledge the wrong, and help make room.

#### Metadata

```json
{
  "id": "beautiful-exclusion",
  "region": "lilyfall",
  "kind": "encounter",
  "locations": [
    {
      "point": [
        77,
        55
      ]
    }
  ],
  "enemy": "elf",
  "accept": [
    "love",
    "serve",
    "truth",
    "true",
    "mercy",
    "kind",
    "grace",
    "Christ",
    "word",
    "humble",
    "listen",
    "Jesus",
    "master",
    "example",
    "boast",
    "received"
  ],
  "move": "Open Chair",
  "rounds": 1,
  "reward": 28,
  "hearts": 0,
  "grants": [
    "boatmaker-welcomed"
  ],
  "wisdom_cards": [
    "day-6",
    "day-14",
    "day-33",
    "night-18"
  ],
  "wisdom_focus": "Love does not show contempt for social status; truthful repair restores a neighbor’s place."
}
```


## broken-marker · The Waterfall Trail Marker

A storm has turned the outer-road marker toward a sheer drop. The gatekeeper has closed the route. Across the narrow dry span, a counterweight hangs beneath the marker’s stone socket; the keeper asks you to spot the sound path and help turn it.

#### Short

The outer-road sign points toward a cliff. Recall the words, find the dry span, and turn the counterweight.

#### Success

You recall the words and look again before leaping. $move is a careful step to the dry landing, then a pull on the marker’s counterweight. The arrow turns toward the sheltered road. The keeper checks the anchor, opens the eastern gate, and thanks you. Alderwatch March and Highfold Reach are now accessible.

#### Hint

Any discovered card is available here. A steady mind, an inspected span and a working counterweight make the route safe; the verse is not a spell.

#### Failure

You jump toward the arrow rather than the landing. A safety rope catches you. The keeper brings you back to the court: try the dry span after looking closely.

#### Metadata

```json
{
  "id": "broken-marker",
  "region": "lilyfall",
  "kind": "encounter",
  "locations": [
    {
      "point": [
        87,
        40
      ]
    }
  ],
  "enemy": "elf",
  "accept": [
    "*"
  ],
  "move": "Sure-Footed Turn",
  "rounds": 2,
  "reward": 45,
  "hearts": 1,
  "grants": [
    "outer-road-open"
  ],
  "wisdom_cards": [
    "day-23",
    "day-37",
    "night-23",
    "night-18"
  ],
  "wisdom_focus": "Wisdom includes attention and prudent action; remembered Scripture is no promise of physical invulnerability."
}
```


## second-sight · Aurel at the Lilyfalls

Aurel has walked the lower path from Birchwater, leaving broad damp pawprints. “Bracken says I am too solemn,” he admits. “Bracken also says the falls were made to drown out people who ask foolish questions. He is wrong about the falls. He may sometimes be right about the questions.”

#### Short

“Beauty and strength cannot make a teacher right. Test what you hear against the Book.”

#### Success

The bear lowers his head so you can hear him over the water. “Do not trust a teacher merely because he is beautiful, ancient, or strong. Test what you hear against the Book. Christ is the Lord; even a bear must answer to him.”

#### Metadata

```json
{
  "id": "second-sight",
  "region": "lilyfall",
  "kind": "npc",
  "locations": [
    {
      "point": [
        55,
        74
      ]
    }
  ],
  "enemy": "noble-bear",
  "speech": "Even a bear must answer to the Lord.",
  "patrol": [
    [
      55,
      74
    ],
    [
      59,
      77
    ],
    [
      57,
      80
    ]
  ],
  "patrol_speed": 0.8,
  "repeatable": true,
  "wisdom_cards": [
    "day-37",
    "night-9",
    "day-23"
  ],
  "wisdom_focus": "Teachers, including impressive fantasy creatures, are tested under Scripture and Christ’s lordship."
}
```


## lily-cave-echo · Bracken’s Echo Chamber

A second opening of Bracken’s long cave faces the Lilyfalls. “One house, two doors,” he rumbles. “The elves call it architectural foresight. I call it being able to avoid the wind.” He has been practicing a hymn, and the cave returns every note twice.

#### Short

“Do not choose friends who only echo you. A true friend can tell you when you are wrong.”

#### Success

“A good echo is agreeable,” he says. “But do not seek friends who only echo you. If I am taking what is not mine, I want a friend who will tell me before my paws grow comfortable with stealing.” He offers you a berry, then adds, “That one is a gift. A very important distinction.”

#### Metadata

```json
{
  "id": "lily-cave-echo",
  "region": "lilyfall",
  "kind": "npc",
  "locations": [
    {
      "point": [
        87,
        84
      ]
    }
  ],
  "enemy": "cave-bear",
  "speech": "My cave echoes. My friends need not.",
  "repeatable": true,
  "wisdom_cards": [
    "day-3",
    "day-33",
    "night-9",
    "day-6"
  ],
  "wisdom_focus": "Friendship joins truthful correction to generous love; theft and mere agreement are not love."
}
```
