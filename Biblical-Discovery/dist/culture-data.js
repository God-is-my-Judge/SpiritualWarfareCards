'use strict';
// These are modern teaching boards. The source notes identify their ancient witnesses.
window.BD_CULTURE_BOARDS = {
 avaris: {
  title:'A home on the Delta', mode:'trail',
  opening:'A potter from the Levant needs clay, river traffic and a place to settle.',
  guide:'Trace one possible journey from the eastern Mediterranean into Egypt’s eastern Delta.',
  tiles:['Upper Nile','Levantine coast','Avaris households','Eastern Nile branch','Western desert','Mediterranean passage'],
  order:[1,5,3,2], grid:[['',5,1],[4,3,2],['',0,'']],
  cues:['Start where the potter learned her craft.','Sail along the coast.','Turn inland on the waterway beside Avaris.','Find the neighborhood where families made their homes.'],
  notes:['Potters carried skills as well as vessels.','Sea routes connected the Levant and Egypt.','A Nile branch once flowed beside this settlement.','Houses and burials preserve traces of Levantine families.'],
  question:'A family lived here. What could you tell a visitor reading Genesis?',
  answers:['The household must have belonged to Joseph.','Families from the Levant really did settle in Egypt’s Delta.'],correct:1,
  reflection:'Genesis 46 follows a family crossing a border in a famine. God’s care reaches them in another land.'
 },
 thebes: {
  title:'The last sign',mode:'sort',
  opening:'Pharaoh’s victory poem lists enemies. A small sign tells you how his scribe understood each name.',
  guide:'Stamp each name using the sign beside it. Seated figures indicate a people. The land sign marks a place.',
  bins:['People','Place'], cards:[['Gezer','Land sign',1],['Israel','Seated figures and plural strokes',0],['Ashkelon','Land sign',1]],
  notes:['Gezer enters this royal list as a place.','The scribe identifies Israel as a people in Canaan.','Ashkelon carries the place sign too.'],
  question:'What date can you put in Israel’s field record?',
  answers:['By about 1208 BC, Egypt’s court knew a people called Israel.','The Exodus took place in about 1208 BC.'],correct:0,
  reflection:'Pharaoh wanted his victory remembered. Even his boast bears witness to the people whose life fills Judges.'
 },
 'tel-dan': {
  title:'A house with no walls',mode:'trail',
  opening:'An Aramean king boasts about his enemies. Can you read the royal family’s name in his own script?',
  guide:'Start on the right. Read BYT (house), then DWD (David). The signs below are a teaching handcopy.',
  tiles:['𐤃 · D','𐤅 · W','𐤃 · D','𐤕 · T','𐤉 · Y','𐤁 · B'],grid:[[0,1,2,3,4,5]],order:[5,4,3,2,1,0],
  cues:['Find the first sound of BYT.','Follow B with Y.','Finish the word for house.','Begin the name on the next stone sign.','Find the middle consonant of DWD.','End the name with D.'],
  notes:['B begins the word.','The Y follows on its left.','BYT can mean a dynasty.','D begins the name.','W falls between the two Ds.','The six consonants read BYTDWD.'],
  question:'Whose voice gives this royal name its particular value?',
  answers:['David himself, signing his house.','A neighboring ruler describing a rival dynasty.'],correct:1,
  reflection:'In 2 Samuel 7 David wants to build a house. God promises him a house of descendants. Hear both senses of the word.'
 },
 nimrud: {
  title:'Walk around the tribute',mode:'dial',
  opening:'Shalmaneser’s sculptors told a story in bands around four faces of a stone.',
  guide:'Turn the register dial. Find the delegation the Assyrian caption associates with Israel.',
  windows:[['First band','Sua of Gilzanu'],['Second band','Iaua, associated with Omri’s land'],['Third band','Musri, with exotic animals'],['Fourth band','Marduk-apil-usur of Suhu'],['Fifth band','Qalparunda of Patina']],
  targets:[2,1],cues:['Find the animal procession as a landmark.','Look above the animals for a name associated with Omri’s land.'],notes:['Exotic animals fill a neighboring tribute scene.','The caption links these tribute bearers with Jehu.'],dialLabel:'Register',
  question:'A visitor calls the kneeling man a portrait. Which caption would you give him?',
  answers:['Israel’s tribute to Assyria under Jehu, possibly brought by an envoy.','A likeness that establishes Jehu’s face and his biological father.'],correct:0,
  reflection:'Read 2 Kings 10 beside the imperial scene. The sculptor measures greatness by submission to Assyria. Kings asks how Jehu lived before God.'
 },
 babylon: {
  title:'Two messages for home',mode:'sort',
  opening:'A ruler has changed. One document speaks to Babylon. Another gives Judean families a destination.',
  guide:'Separate the messages. The cylinder describes shrines and images. Ezra follows families rebuilding the Lord’s house.',
  bins:['Cyrus Cylinder','Ezra 1'],cards:[['Rebuild at Jerusalem','The city and the Lord’s house are named.',1],['Return the images','Divine images go back to their sanctuaries.',0],['Bring out the vessels','Temple vessels pass into the exiles’ care.',1],['Marduk chooses Cyrus','Babylon’s patron appears in this royal account.',0]],
  notes:['Ezra gives the destination a Judean family needed.','The cylinder describes restoration for other communities.','The vessels make the return tangible in Ezra.','A Babylonian royal text speaks the religious language of its audience.'],
  question:'What would you say when someone asks where Jerusalem appears?',
  answers:['On the cylinder beside the other restored cities.','Ezra names Jerusalem. The cylinder illuminates Cyrus’s wider policy.'],correct:1,
  reflection:'Read Ezra 1:1 alongside Isaiah 45:1–6. The Lord can open a way home through a ruler who understands his victory differently.'
 },
 qumran: {
  title:'Unroll the servant passage',mode:'dial',
  opening:'A leather scroll has no search box. Roll back and forth through Isaiah’s changing scenes.',
  guide:'Use these modern chapter guides to navigate a model scroll. Follow the servant into the next chapter.',
  windows:[['Isaiah 40','A voice calls for comfort.'],['Isaiah 52:13–15','The servant will be lifted up.'],['Isaiah 53','People look again at the suffering servant.'],['Isaiah 55','A thirsty people receives an invitation.']],
  targets:[1,2],cues:['Find where the servant song begins.','Unroll the next passage. Who bears the suffering?'],notes:['The song begins before the modern chapter break.','The Great Isaiah Scroll preserves this passage centuries before medieval codices.'],dialLabel:'Scroll window',
  question:'A friend wonders whether Christians inserted the passage after Easter. What helps?',
  answers:['The surviving copy already contained the passage around 125 BC.','All surviving Isaiah manuscripts agree in every letter.'],correct:0,
  reflection:'In Acts 8 a traveler asks whom Isaiah meant. Philip begins with the passage and tells him about Jesus.'
 },
 galilee: {
  title:'The boatwright’s bench',mode:'timber',
  opening:'Timber was worth keeping. Look at how often the Galilee hull was mended.',
  guide:'Turn each wooden patch until its grain follows the plank around it. Then test the fit.',
  cues:['The outer lines show the grain. Match all three joints.'],notes:['Repair gave used timber another working life. This boat belonged to the lake economy Jesus knew.'],
  question:'What could you tell the children standing beside the hull?',
  answers:['These marks identify the disciples who sailed it.','This is the kind of working world Jesus entered when he called fishermen.'],correct:1,
  reflection:'Mark 1:16–20 puts nets, boats and family work around the call to follow Jesus. Picture what it cost to leave that shore.'
 },
 bethesda: {
  title:'Room for a fifth porch',mode:'pool',
  opening:'John remembers five covered walkways. Lay them out on this model of the double pool.',
  guide:'John counted five porches. Choose places where stone can carry a roof.',
  tiles:['North bank','West bank','East bank','South bank','Dividing wall','Northern water','Southern water'],
  notes:['With two basins, the dividing wall gives the fifth walkway a place.'],
  question:'What changes when you walk John’s description on this plan?',
  answers:['His count fits a real place where people could gather.','The stones themselves tell us what Jesus said.'],correct:0,
  reflection:'Read John 5:1–9. Among all the people under those roofs, Jesus sees one man who has waited years for help.'
 },
 caesarea: {
  title:'Letters at the broken edge',mode:'inlay',
  opening:'The left edge of Pilate’s dedication is broken. Fit editorial brackets around the supplied letters.',
  guide:'Match each surviving ending with a beginning. The key reads PONTIVS, PRAEFECTVS and IVDAEAE in Roman capitals.',
  bins:['[PRAEF]','[PO]','[E]'],cards:[['…NTIVS PILATVS','Governor’s name',1],['…ECTVS','Office',0],['IVDAEA…','Province · final letter',2]],
  notes:['[PO]NTIVS PILATVS gives the governor’s name.','[PRAEF]ECTVS identifies his rank as prefect.','IVDAEA[E] is a supplied final letter in the name of his province.'],
  question:'Which label belongs beside this dedication?',
  answers:['Pilate’s official transcript of Jesus’s trial.','An independent witness to Pilate’s name and office in Judea.'],correct:1,
  reflection:'In John 19:10–12 Pilate speaks about his authority. Jesus makes the governor consider where authority comes from.'
 },
 delphi: {
  title:'Set the Corinth clock',mode:'sync',
  opening:'An emperor writes to Delphi. Luke tells of a hearing across the gulf at Corinth.',
  guide:'Compare the dated letter, the official’s term and the hearing. Move the timeline until their clues overlap.',
  windows:[['Around AD 30','Before Claudius became emperor.'],['Around AD 51–52','Claudius’s titulature and Gallio’s office overlap.'],['After AD 70','Jerusalem’s Temple has already fallen.']],
  offices:[['Pontius Pilate','Prefect of Judea'],['Quirinius','Governor of Syria'],['Gallio','Proconsul of Achaia']],targets:[1],cues:['Align the Delphi letter’s date with Luke’s official at Corinth.'],notes:['The title and the emperor’s acclamations give the letter its narrow date.'],dialLabel:'Date window',
  question:'What connects an inscription in Delphi with Paul in Corinth?',
  answers:['Gallio holds the same office in the letter and in Acts 18.','Paul’s name appears in the emperor’s letter.'],correct:0,
  reflection:'Read Acts 18:9–17. A frightening public hearing sits inside a longer account of God sustaining Paul while he teaches.'
 },
 oxyrhynchus: {
  title:'The wastepaper basket',mode:'sort',
  opening:'An Egyptian rubbish mound preserves the paper a town discarded. Three scraps have landed on your desk.',
  guide:'File these invented English samples by what the writer was doing. Look for an amount, an addressee or a genealogy.',
  bins:['Receipt','Family letter','Gospel copy'], cards:[['To my sister, greetings','A relative asks for news from home.',1],['Received three measures of grain','A payment is acknowledged.',0],['A line of fathers and sons','The opening genealogy of Matthew is being copied.',2]],
  notes:['Private letters carry voices a monument rarely records.','Receipts put food and work back into the town.','P.Oxy. I 2 really does preserve portions of Matthew 1.'],
  question:'What makes a manuscript fragment useful to another reader?',
  answers:['The rubbish layer supplies an exact date for every word.','Its surviving wording can be compared with other copies.'],correct:1,
  reflection:'Luke 1:1–4 invites a reader to examine what has been handed on. A small scrap can give readers today something concrete to compare.'
 },
 megiddo: {
  title:'Names around the table',mode:'mosaic',
  opening:'Three Greek inscriptions remember the people behind a Christian gathering place. Restore the credits around its table.',
  guide:'Choose the panel each credit belongs to. Read the gift or the request before you place a name.',
  bins:['Pavement','Table','Remembrance'],cards:[['Akeptous','Her gift was offered to God Jesus Christ.',1],['Gaianus','His money paid for the mosaic floor.',0],['Primilla, Cyriaca, Dorothea and Chreste','Visitors are asked to remember these women.',2]],
  notes:['Akeptous gave the table. Her dedication names the one she honored.','Gaianus is identified as a centurion.','The names survive even though the women’s precise roles remain open.'],
  question:'What can someone standing on this floor learn about early worship?',
  answers:['A local community honored Jesus as God and remembered its contributors.','All the named women financed the pavement together.'],correct:0,
  reflection:'Read 1 Corinthians 12:12–27. Imagine the gathering here, with one person’s gift underfoot and another’s at the center of the room.'
 }
};
