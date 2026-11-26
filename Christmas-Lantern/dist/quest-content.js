'use strict';
const TOY_QUEST_CONTENT={
  "version": 2,
  "title": "The Toys Beneath the Snow",
  "monster_name": "Rime",
  "dialogue_kind": "Original fictional game dialogue; Scripture references link to verified verse cards.",
  "visits": [
    {
      "id": "rime-visit-1",
      "title": "A Room Full of Things",
      "lines": [
        "Rime: Mind the squeaky wheel. It is the loudest object in the world. I have counted it three times and it still squeaks.",
        "Traveler: Some of these toys belong to people in the town. They are waiting for them.",
        "Rime: If I give everything back, what will be left for me?",
        "Traveler: I can sit with you for a little while. There is good news for people who are afraid to let go: Christ welcomes the burdened. He calls us to turn to Him and trust Him.",
        "Rime: Then sit. You may have the chair without the frozen spoon on it."
      ],
      "scripture_refs": [
        "Matthew 11:28-30",
        "Luke 19:1-10"
      ],
      "next_invitation": "Come back tomorrow, if you can. Or stay and tell me more now."
    },
    {
      "id": "rime-visit-2",
      "title": "The Humble King",
      "lines": [
        "Rime: Your Christmas story begins with a baby. How can a baby carry anyone?",
        "Traveler: Jesus is the eternal Son of God who became truly human. The child born in Bethlehem is the humble King.",
        "Traveler: He came to serve and give His life for us. He bore our sins, died on the cross, and rose again. He calls us to turn from sin and trust Him. His rescue is a gift of grace.",
        "Rime: Even for someone who has taken what was not his?",
        "Traveler: Christ came to save sinners. You can tell Him the truth, ask His mercy, and trust what He has done."
      ],
      "scripture_refs": [
        "John 1:14",
        "Mark 10:45",
        "1 Corinthians 15:3-4",
        "Ephesians 2:8-10"
      ],
      "next_invitation": "I would like to hear those words again. You are welcome to return."
    },
    {
      "id": "rime-visit-3",
      "title": "A Heart That Needs More Than Snow",
      "lines": [
        "Rime: I tried smiling at the toys. My teeth frightened the rocking horse. Is being cheerful the Spirit of Christmas?",
        "Traveler: Christmas cheer can be lovely. The Holy Spirit is God Himself. He gives new life and leads us to Jesus Christ.",
        "Traveler: We need more than a brighter mood. We need forgiveness and hearts made new. God saves us through Christ by His mercy, and His Spirit teaches us to love.",
        "Rime: Then I will stop pretending. I have been selfish. I need the Savior you have told me about.",
        "Traveler: Bring that honestly to Christ. We can pray, read His Word, and keep learning together."
      ],
      "scripture_refs": [
        "John 3:5-8",
        "John 16:13-14",
        "Titus 3:4-7",
        "Galatians 5:22-23"
      ],
      "next_invitation": "Come again when you are able. There are things I need to put right."
    },
    {
      "id": "rime-visit-4",
      "title": "What Open Hands Can Do",
      "lines": [
        "Rime: I have sorted the toys by their owners. I am very poor at names, so I have drawn their houses. Is this a beginning?",
        "Traveler: Yes. We can return what was taken, speak honestly, and ask forgiveness.",
        "Rime: Will carrying enough toys make Christ accept me?",
        "Traveler: Christ saves by grace through faith. Because He has loved us, we can begin to love and serve. The good work grows from His gift.",
        "Rime: Then help me carry this little engine. I would like to apologize before I explain how difficult its wheels have been."
      ],
      "scripture_refs": [
        "Ephesians 2:8-10",
        "Luke 19:8-10",
        "1 John 3:16-18"
      ],
      "next_invitation": "Perhaps tomorrow we could visit someone together. The workshop will keep your place."
    },
    {
      "id": "rime-visit-5",
      "title": "A Place at the Workbench",
      "lines": [
        "Rime: I have put my trust in Jesus, the King who died and rose for sinners. I want to live for Him, and I am learning to ask God’s Holy Spirit for help.",
        "Rime: Mrs Bell needs kindling. The new family needs a room. The child at the clock shop would like someone to hear his tune. I had thought there was only one kind of giving.",
        "Traveler: The Lord has given us neighbors to love. We can listen, share what we have, and make room for them.",
        "Rime: And keep learning the Word together?",
        "Traveler: Yes. Christ bears our deepest burden and gives us life for His service. His Spirit grows love in us as we follow Him.",
        "Rime: Then leave one large chair at the workbench. I shall bring the repaired toys. And three spoons, in case I have counted wrong again."
      ],
      "scripture_refs": [
        "James 1:27",
        "Leviticus 19:33-34",
        "Hebrews 13:1-2",
        "Galatians 5:13-14",
        "Matthew 11:28-30"
      ],
      "next_invitation": "There is always another neighbor to visit. Come when you can; your place is still here."
    },
    {
      "id": "rime-visit-6",
      "title": "The Star in the Drawer",
      "lines": [
        "Rime: I had a dreadful morning. Samir’s paper star was hanging by the window. Everyone admired it. Nobody admired my extremely difficult spoon arrangement.",
        "Rime: I put his star in my drawer. Then I told him the wind had taken it. I knew better. I had told Jesus I wanted to follow Him, and I did it anyway.",
        "Traveler: You must tell the truth about what you did. Sin still matters. But you do not have to hide from Christ. He died and rose for sinners, and He calls His people to confess and return to Him.",
        "Rime: Will you come with me while I take it back? I am rather good at explanations, and I think I need fewer of them.",
        "Traveler: Yes. We can pray first. Then you can tell Samir plainly, return his star, and listen. He may need time before he trusts you with it again."
      ],
      "scripture_refs": [
        "1 John 1:8-9",
        "1 John 2:1-2",
        "Proverbs 28:13"
      ],
      "next_invitation": "I shall leave the drawer open. Come again when you can; I want to tell you how the visit went."
    },
    {
      "id": "rime-visit-7",
      "title": "An Apology Without a Bow",
      "lines": [
        "Rime: I began, “Owing to unusual pressures upon my artistic judgment—” Samir asked whether I had brought the star. So I began again.",
        "Rime: I said, “I took it. I lied. I was jealous, and I was wrong. I am sorry.” One paper point was bent. He showed me how to straighten it.",
        "Traveler: And did you ask him to make everything feel better at once?",
        "Rime: I nearly did. Instead I asked whether he would like help carrying his parcel. He said no today. I stayed long enough to listen, and then I left him room.",
        "Traveler: Forgiveness is a gift. Repairing what we can is a fitting fruit of repentance; it does not purchase God’s mercy or another person’s trust.",
        "Rime: The keeper will ask how I am doing with telling the truth. I have asked him to. It is less grand than making a speech, and considerably harder."
      ],
      "scripture_refs": [
        "Luke 19:8-10",
        "Ephesians 4:25-32",
        "James 5:16"
      ],
      "next_invitation": "There is a place beside the lamp. Next time, remind me to tell you about the second drawer."
    },
    {
      "id": "rime-visit-8",
      "title": "Before the Door Slams",
      "lines": [
        "Rime: The snow grew thick this morning. My scarf caught on the latch; the cocoa spilled; then the keeper asked me a perfectly ordinary question.",
        "Rime: I wanted to slam the door. I did raise my voice. I cannot blame the weather for that. I stopped, told him I was getting angry, and asked for a quiet minute.",
        "Traveler: You can ask the Lord’s help before you know exactly how to say it. The Holy Spirit is God, our Helper. He brings us to Christ and grows patience and self-control in His people.",
        "Rime: I went back and apologized. We put a hook beside the door for the scarf. That will not make me holy, but it may prevent one unnecessary wrestling match tomorrow.",
        "Traveler: A useful hook, an honest friend, prayer, and the Word all have their place. We keep depending on Christ; we do not graduate from needing His grace."
      ],
      "scripture_refs": [
        "Galatians 5:16-25",
        "James 1:19-20",
        "John 14:26"
      ],
      "next_invitation": "Come for cocoa when you are able. I have placed the cups much farther from the latch."
    },
    {
      "id": "rime-visit-9",
      "title": "A Chair Kept Open",
      "lines": [
        "Rime: Samir brought another star today. He asked me to hold the string while he tied it. I did not take that as a certificate of perfection.",
        "Rime: Some days I am still jealous. Some days I speak sharply, and need to confess it. I am learning to tell the truth sooner, to ask for help, and to make room for people without keeping their things.",
        "Traveler: Christ is your Savior on the difficult days too. His grace teaches us to turn from sin and follow Him; His finished work is our hope. We walk with His people and keep returning to His Word.",
        "Rime: Then the workbench is a good place for me. A prayer, a patient friend, and a wheel that refuses to go on straight. There seems to be enough here for tomorrow.",
        "Narrator: The story leaves Rime still learning. The neighbors keep their names, their choices, and their own gifts to share. There is room for another visit, and no score for being loved."
      ],
      "scripture_refs": [
        "Titus 2:11-14",
        "Philippians 1:6",
        "Hebrews 10:23-25"
      ],
      "next_invitation": "Your chair is still here. Come when you can; there is no lost-day penalty."
    }
  ],
  "workshop_introduction": {
    "title": "The Map Beside the Workbench",
    "lines": [
      "Workshop keeper: Before you set off, look at the map beside the workbench. You can take a copy for your waypack.",
      "Workshop keeper: The storm has scattered toys along the woodland road. Some have been carried into Rime’s cave. Their owners are marked on this map.",
      "Workshop keeper: Bring the toys here. We can clean the dirt, mend a wheel, sew a seam, and return each one with care.",
      "Workshop keeper: Christ has first loved and served us. We answer His kindness by loving the people He places near us. Each neighbor has a name, a story, and something to share.",
      "Workshop keeper: You may take the quiet path. Adventure and memory practice are always optional."
    ],
    "scripture_refs": [
      "Mark 10:45",
      "Ephesians 2:8-10",
      "1 John 3:16-18"
    ]
  },
  "rescue_caught": {
    "title": "A Large Scarf Across the Passage",
    "lines": [
      "Rime: Wait. I have questions. My scarf seems to have found the whole doorway.",
      "Traveler: I will listen, and you must let me leave when I need to.",
      "Rime: Very well. Tell me about the burdened, the King who serves, and the gift that makes a new beginning.",
      "Narrator: Read the three cards together, or choose your optional memory practice. You may also take the quiet way out at any time."
    ],
    "scripture_refs": [
      "Matthew 11:28-30",
      "Mark 10:45",
      "Ephesians 2:8-10"
    ],
    "calm_exit_line": "Rime lifts the scarf. The snowy path home is open.",
    "complete_line": "Rime draws back and listens. The words have given you something true to speak together; the path is clear."
  },
  "clock_shop_child": {
    "title": "A Halfpenny by the Clock Shop",
    "name": "Robin",
    "lines": [
      "Robin: Have you a halfpenny for bread? I am staying with Mrs Bell. I can play you a tune, if you would like.",
      "Traveler: You need not earn your supper. Come into the warm shop. I would be glad to hear your tune when you are ready.",
      "Robin: Will you sit beside me? The big clock makes the waiting sound longer.",
      "Narrator: A little warmth, a meal, and unhurried company can be offered now. The repaired toy is a gift to enjoy together."
    ],
    "scripture_refs": [
      "James 2:14-17",
      "Matthew 25:35-40",
      "1 John 3:17-18"
    ],
    "suggested_actions": [
      "Share bread and hot chocolate",
      "Offer an in-world halfpenny",
      "Listen to Robin’s tune",
      "Deliver a repaired toy"
    ]
  },
  "widow": {
    "title": "Mrs Bell’s Empty Chair",
    "name": "Mrs Bell",
    "lines": [
      "Mrs Bell: My husband used to wind the clockwork bird every Christmas. I have missed its little song.",
      "Traveler: May we mend it? And is there something you would like help with while we are here?",
      "Mrs Bell: The kindling basket is heavy these days. But when it is filled, sit a moment. I have a story about him you might enjoy.",
      "Narrator: The song can return while the sorrow is still real. Leave room for both remembrance and gratitude."
    ],
    "scripture_refs": [
      "James 1:27",
      "Romans 12:15",
      "Psalm 34:18"
    ],
    "suggested_actions": [
      "Carry kindling",
      "Return the mended clockwork bird",
      "Listen to her memory",
      "Share tea"
    ]
  },
  "sojourner_family": {
    "title": "Room for New Neighbors",
    "names": [
      "Amina",
      "Samir"
    ],
    "lines": [
      "Amina: We have travelled a long way. We brought bread to share, but we have not found a room for tonight.",
      "Traveler: Let us ask at the workshop house. What would help you most just now?",
      "Samir: A warm place to sit, and someone who will learn our names.",
      "Amina: When we are settled, I can show you how to fold a little paper star. My mother taught me.",
      "Narrator: Receive their gift as you offer yours. A stranger can become a neighbor at the same table."
    ],
    "scripture_refs": [
      "Leviticus 19:33-34",
      "Deuteronomy 10:18-19",
      "Hebrews 13:1-2"
    ],
    "suggested_actions": [
      "Find a warm room",
      "Learn their names",
      "Share the table",
      "Make a paper star together"
    ]
  },
  "repair": {
    "title": "Small Hands at the Workbench",
    "lines": [
      "Workshop keeper: First brush away the snow. Then we can see what needs care.",
      "Workshop keeper: A loose wheel needs a pin. A torn seam needs thread. Work slowly; a toy that is loved is worth patient attention.",
      "Workshop keeper: These are things we mend. The people who receive them are neighbors made in God’s image. Ask what would be welcome, and give freely.",
      "Narrator: Clean, mend, and check the toy. There is no timer. Help is available at every step."
    ],
    "scripture_refs": [
      "Genesis 1:27",
      "Colossians 3:17",
      "1 John 3:18"
    ],
    "steps": [
      "Brush away the snow and dirt",
      "Choose the fitting repair",
      "Test gently",
      "Wrap with a note naming the recipient"
    ]
  },
  "delivery": {
    "title": "A Gift Carried Home",
    "lines": [
      "Workshop keeper: Carry the parcel by its handle. Carry the neighbor’s name in your mind.",
      "Traveler: Christ has given Himself for us. We can offer this small gift in His name.",
      "Narrator: Ask where the parcel should go, listen to the answer, and stay if company would be welcome.",
      "Workshop keeper: The workbench will be ready when you return. Grace is the beginning; love has many ordinary things to do."
    ],
    "scripture_refs": [
      "Galatians 2:20",
      "Ephesians 2:8-10",
      "Colossians 3:17",
      "1 John 3:16-18"
    ]
  },
  "mechanics": {
    "default_mode": "calm",
    "calm_exit_always_available": true,
    "adventure_optional": true,
    "escape_cards": [
      "Matthew 11:28-30",
      "Mark 10:45",
      "Ephesians 2:8-10"
    ],
    "memory_assistance_always_available": true,
    "visit_chapters": 5,
    "daily_visits_optional": true,
    "missed_day_resets_progress": false,
    "family_continue_now_option": true,
    "gospel_available_before_final_chapter": true,
    "avoid_progress_metrics": [
      "conversion percentage",
      "Spirit meter",
      "holiness score",
      "salvation earned by repairs",
      "faith measured by recall accuracy"
    ],
    "suggested_story_flags": [
      "heard_gospel",
      "toys_returned",
      "repair_helped",
      "neighbor_visit"
    ]
  }
};
