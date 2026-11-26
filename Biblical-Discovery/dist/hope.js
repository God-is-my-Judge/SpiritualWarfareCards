'use strict';
// The Christian hope, edition 3.2. Claude for Daniel, 23 November 2026, rebuilt from Daniel's brief:
// evidence and honest bias first, the moral law we all know, what we were made for, where we stand before
// God's law, what God has done, the case for the resurrection, and the call to repent and believe.
// The default is the adult case; "Say it simply" gives the younger reading. Both speak to the reader directly.
// Edition 3 sharpens edition 2: the accident-or-made fork, the "good person" test, the women at the tomb,
// Jerusalem, Acts 26:8, Scripture vouched for by the risen Jesus, and a fuller closing appeal that applies
// Daniel's Great Awakening Advisor instructions (urgency, idols named, Christ's own invitation, the cost).
// Edition 3.1 (23 November): Daniel's wording, apparent fine-tuning, and CSB marked at the end of each quotation,
// as the CSB notice ("Scripture quotations marked CSB") requires.
// Edition 3.2 (23 November): footnotes on why the universe is not an accident, "Test the likely options", and an
// audit that words each argument so it can be defended (see reviews/THE-CHRISTIAN-HOPE-VERSIONS.md).
// A paragraph may be an object {note, p}: a footnote that opens in place.
// Editions 1 (Codex's four readings), 2, 3 and 3.1 are kept in resources/christian-hope/, and
// reviews/THE-CHRISTIAN-HOPE-VERSIONS.md records every version. Every quotation is exact CSB, checked by
// tools/check-hope-scripture.py against resources/christian-hope/csb-verses.json.
// In a paragraph, a leading "?" marks a question set apart for the reader.
const BD_HOPE = {
  adult: {
    title: 'If Jesus rose, everything changes',
    eyebrow: 'A case to weigh, one question at a time',
    sections: [
      {t:'Four questions everyone answers',
       p:['Every object in this museum answers a small question: who made it, when, and why. But you carry four bigger questions everywhere you go. Where did we come from? Why are we here? How should we live? What happens when we die?',
        'Everyone answers them. Even people who say they don’t care answer them by the way they live. So the real question is not whether you have answers. It is whether your answers are true.',
        'In the end the answers come in two kinds. Either we are an accident of matter, time and chance, or we were made on purpose. If we are an accident, it is hard to see any purpose to miss, any law above us, or anything after death. If we were made, every one of those questions has a real answer.',
        'The Bible opens with its claim: “In the beginning God created the heavens and the earth” (Genesis 1:1 CSB). The evidence of modern cosmology points to a beginning of the universe, and whatever begins to exist has a cause. Physicists also find that the universe appears fine-tuned for life. If some of its basic numbers, such as the energy of empty space or the balance of the forces inside atoms, were even slightly different, there would be no lasting stars, no chemistry, and no one here to ask. Scientists who reject design acknowledge this too; some propose countless unseen universes to account for it. So is this apparently fine-tuned universe, full of function and wonder, an accident or made? That is a question of fact, and facts can be investigated.',
        {note:'Footnote · Why not an accident?',p:[
         'Realistically, there are only a few ways to explain a universe like ours. It had to be this way (necessity). It happened by chance. Or it was made (design). No one can rerun the universe to check, so the fair question is which explanation is more reasonable.',
         'A beginning with no before. An accident is an event that happens to something already there: matter, energy and time in which things can go wrong. If time itself began with the universe, there was no earlier event to set it off. Between its cause and its first moment there was no time at all. Whatever caused it stood outside time, space and matter, and brought about a beginning. That sounds less like an accident than a choice.',
         'Settings that hit a target. The fine-tuning is not one lucky number but many, each in a narrow range at the same time, and together they fall just where stars, chemistry and life become possible. As far as physics can tell, no deeper law forces these values, so necessity does not explain them. Chance in a single universe faces very long odds. Some scientists propose countless unseen universes, so that one like ours was bound to turn up. But no one has observed another universe, and whatever produced them would itself seem to need just the right laws.',
         'Fit for life, down to its water. Life also depends on rare properties of ordinary things. Water is one. Ice floats, so lakes freeze from the top down and life survives beneath. Water stores heat, which steadies climates and bodies. It dissolves more substances than almost any other liquid, carrying what every cell needs. The biochemist Michael Denton gathers many such facts in The Wonder of Water (2017).',
         'So which is more reasonable? A beginning that needs a cause beyond time and matter, settings tuned within narrow limits, and a world fitted for life down to its water. One cause, a Maker with a purpose, explains all three together. Chance has to be stretched to cover each one separately. That is why we think ‘made’ is the more reasonable verdict. Paul said that God’s “eternal power and divine nature, have been clearly seen since the creation of the world, being understood through what he has made” (Romans 1:20 CSB).'],
         d:[{k:'rows',title:'Three ways to explain it',rows:[['Necessity','no known law forces these values'],['Chance','long odds, or unseen universes'],['Design','fits the beginning, the tuning and the fit for life']]}]},
        '?If your answers were wrong, would you want to know?'],
       plate:{src:'acc-bg-creation.webp',alt:'The museum’s painting of the garden at Creation',cap:'Creation · Genesis 1'},
       d:[{k:'rows',title:'The four questions',rows:[['Origin','Where did we come from?'],['Meaning','Why are we here?'],['Morality','How should we live?'],['Destiny','What happens when we die?']]},
        {k:'rows',title:'Two kinds of answer',rows:[['If we are an accident','no given purpose, no lawgiver, no hope beyond death'],['If we were made','a purpose, a law, a judge and a hope']]}]},
      {t:'Evidence, and the judge inside you',
       p:['This museum rests on a simple conviction: some things really happened, and sometimes evidence can show us which. A Roman governor’s name carved in stone does not change because someone dislikes what it implies.',
        'But evidence never interprets itself. People do, and none of us comes to it neutral. We lean toward the answers we want, never more than when the subject is God. The philosopher Thomas Nagel was candid about his own leaning: “I want atheism to be true” (The Last Word, 1997). Christians can want things to be true too. So the question is not who has a bias. Everyone does. The question is whether you will let the evidence correct yours.',
        'The Bible warns that the witness we most need to cross-examine is ourselves: “The heart is more deceitful than anything else, and incurable—who can understand it?” (Jeremiah 17:9 CSB).',
        'So train your mind the way a good archaeologist does. Follow the evidence where it leads, and be hardest on the conclusion you would most like to reach. This matters because Scripture says a verdict is coming, and it will not be about stones. It will be about us.',
        '?What would it take to change your mind about God?'],
       plate:{src:'find-8.webp',alt:'The museum’s study replica of the Pilate inscription',cap:'Pilate’s name in stone · Caesarea'},
       d:[{k:'rows',title:'Weigh a claim the way a museum does',rows:[['What is the claim?','Say it plainly'],['What is the evidence?','Name it'],['What else could explain it?','Test the likely options'],['What do I want to be true?','Check yourself first']]},
        {k:'sketch',src:'hope-stone.svg',alt:'A field sketch connects the surviving Latin name PILATVS with Pilate.',cap:'Detail from Caesarea · schematic reading'}]},
      {t:'The law written on your heart',
       p:['Here is something you know without being taught: torturing a child for fun is wrong. Not unpopular. Not unfashionable. Wrong, everywhere and always. You did not learn that from a survey. You recognize it.',
        'Some say right and wrong are only opinions, or whatever a society approves. Then say it of the Holocaust. A government ordered it, and many approved. Was it right for them? No one who looks at it honestly can say so.',
        'Now think about Adolf Hitler himself. Should he answer for the millions he murdered? Nearly everyone says yes. But if there is no God and no final judgment, he never will. He took his own life in 1945 and escaped every court on earth. Is that really the end of the story?',
        'Something in us refuses to accept that, and the Bible explains why. Even people who have never read God’s law “show that the work of the law is written on their hearts. Their consciences confirm this” (Romans 2:15 CSB). We know right from wrong because a righteous God made us, and we long for justice because he is just.',
        '?If God will judge Hitler by his law, by what law will he judge you?'],
       plate:{src:'acc-bg-law.webp',alt:'The mountain in the museum’s Sinai painting',cap:'Sinai · Exodus 20'},
       d:[{k:'rows',title:'What we all know',rows:[['Cruelty for fun','is wrong, everywhere and always'],['A moral law','points to a lawgiver'],['Our longing for justice','points to a judge']]}]},
      {t:'What you were made for',
       p:['Everything in this museum was made for something. A lamp was made to give light. A seal was made to sign. You can tell a thing is broken when it cannot do what it was made to do.',
        'So what were you made for? Jesus answered without hesitating: “Love the Lord your God with all your heart, with all your soul, with all your mind, and with all your strength.” And the second: “Love your neighbor as yourself” (Mark 12:30–31 CSB).',
        'That is what sin is at its root. It is not only breaking rules. It is missing the point of your life. Tim Keller described sin as making good things into ultimate things: building your life on success, approval, romance, comfort or even your own goodness, instead of on God. Those things were never meant to carry that weight, and they cannot.',
        'The Bible’s word for them is idols, and they always fail the people who serve them. Jesus put the question bluntly: “For what does it benefit someone to gain the whole world and yet lose his life?” (Mark 8:36 CSB).',
        '“For all have sinned and fall short of the glory of God” (Romans 3:23 CSB). Falling short is not just something we do now and then. It describes where we are.',
        '?What are you living for? Could it carry the weight of your life, and of your death?'],
       plate:{src:'acc-bg-fall.webp',alt:'The museum’s painting of the guarded garden after the Fall',cap:'The garden lost · Genesis 3'},
       d:[{k:'rows',title:'What is it for?',rows:[['A lamp','to give light'],['A seal','to sign'],['A key','to open its lock'],['You','to love God with everything, and your neighbor as yourself']]}]},
      {t:'Where do you stand?',
       p:['Ask almost anyone, and they will tell you they are a good person. Would you say so too? Then test it the way a court would, against the law. Here are a few of God’s Ten Commandments. Answer honestly. No one is watching.',
        '?Have you ever told a lie, even a small one?',
        '?Have you ever taken something that wasn’t yours, whatever it was worth?',
        '?Have you ever used God’s name as a curse word?',
        'Someone who tells lies is a liar. Someone who takes what is not theirs is a thief. I don’t say that to insult you. They are simply the right words, and they fit me too.',
        'Jesus went deeper than our actions: “But I tell you, everyone who looks at a woman lustfully has already committed adultery with her in his heart” (Matthew 5:28 CSB). He said that anger and contempt bring us under judgment too (Matthew 5:22). God reads the heart.',
        'If you are like me, the honest answer to every one of those questions is yes. That does not make us Hitler. But God’s standard was never to be better than Hitler. It is his own perfect goodness. “For whoever keeps the entire law, and yet stumbles at one point, is guilty of breaking it all” (James 2:10 CSB).',
        'Most of us grade ourselves on a curve. We compare ourselves with people worse than we are and decide we are fine. But a judge who lets the guilty go free because they did some good things is not a good judge. “It is appointed for people to die once—and after this, judgment” (Hebrews 9:27 CSB). Jesus warned plainly about the sentence. He called it hell (Matthew 10:28).',
        '?If God judged you by his law today, would you be innocent or guilty?',
        'Does that trouble you? It should. It troubled me. And it is exactly why the good news is good.'],
       plate:{src:'acc-bg-prophets.webp',alt:'The museum’s painting of a prophet calling the people back to God',cap:'The prophets’ call · return to God'},
       d:[{k:'rows',title:'Grading on a curve',rows:[['Compared with Hitler','most of us look good'],['Compared with our friends','we look about average'],['Compared with God’s law','every one of us is guilty']]}]},
      {t:'What God has done',
       p:['Here is the heart of the Christian message. God did not lower his standard, and he did not pretend our sin away. He came himself.',
        'Jesus, God the Son, became a man. He lived the life we were made to live, loving his Father with everything and his neighbor as himself, without failing once. Then he went to the cross and died in our place, bearing the punishment our sins deserve. Isaiah wrote of it centuries before. The Great Isaiah Scroll, displayed downstairs, was copied more than a century before Jesus was born, and it contains the passage: “He was pierced because of our rebellion, crushed because of our iniquities; punishment for our peace was on him, and we are healed by his wounds” (Isaiah 53:5 CSB).',
        'Picture a courtroom. You stand guilty, and the fine is far more than you could ever pay. Then the judge rises, sets aside his robe, and pays it himself. Justice is done, and you walk free. At the cross the price was not money. It was the life of God’s own Son. “He made the one who did not know sin to be sin for us, so that in him we might become the righteousness of God” (2 Corinthians 5:21 CSB).',
        '?Why would a judge pay a debt he did not owe?',
        'Because he loves the guilty. “But God proves his own love for us in that while we were still sinners, Christ died for us” (Romans 5:8 CSB). That is grace: a gift you cannot earn. “For you are saved by grace through faith, and this is not from yourselves; it is God’s gift—not from works, so that no one can boast” (Ephesians 2:8–9 CSB).',
        'And grace is never a license to keep sinning. Paul raised the question himself: “Should we continue in sin so that grace may multiply? Absolutely not!” (Romans 6:1–2 CSB). No one who understands what forgiveness cost can treat sin lightly. God’s grace forgives us, and it also begins to change us.',
        'How could anyone know the payment was accepted? By what happened on the third day. Jesus “was delivered up for our trespasses and raised for our justification” (Romans 4:25 CSB).'],
       plate:{src:'acc-bg-cross.webp',alt:'The museum’s painting of the crucifixion',cap:'The cross · Isaiah 53:5'},
       d:[{k:'rows',title:'The exchange · 2 Corinthians 5:21',rows:[['Our sin','laid on Jesus'],['His righteousness','credited to us'],['The penalty','paid in full'],['The gift','received by faith']]}]},
      {t:'But did it happen?',
       p:['Everything stands or falls on one event. Paul said so himself: “And if Christ has not been raised, your faith is worthless; you are still in your sins” (1 Corinthians 15:17 CSB). Christianity does not ask you to trust a feeling. It points to a public event and invites you to check it.',
        'So do what this museum does. Start with the facts that most historians who study the period accept, skeptics included.',
        'First, Jesus died by crucifixion under Pontius Pilate. The Roman historian Tacitus and the Jewish historian Josephus both record his execution, and Pilate’s own name is carved on the stone downstairs.',
        'Second, his followers soon said they had seen him alive, one by one and in groups. Paul passed on a summary he had received: “that Christ died for our sins according to the Scriptures, that he was buried, that he was raised on the third day according to the Scriptures, and that he appeared to Cephas, then to the Twelve” (1 Corinthians 15:3–5 CSB). Many scholars, skeptics among them, date that summary to within a few years of the cross.',
        'Third, Paul himself, who had hunted Christians down, became its best-known missionary, saying the risen Jesus had appeared to him. Fourth, James, Jesus’ own brother, had not believed in him (John 7:5). Yet James became a leader of the church in Jerusalem, and Josephus records that he was later stoned to death there.',
        'Fifth, the tomb was empty. The first to find it so were women (Luke 24:1–3), in a world where women’s testimony was widely discounted, and at first even the apostles “did not believe the women” (Luke 24:11 CSB). Someone inventing the story would hardly have told it that way.',
        'Then the apostles preached the resurrection in Jerusalem itself, weeks later and a short walk from the tomb. The authorities had every reason to produce the body, and there is no record that they did. Even the story they spread, that the disciples stole it, assumed the tomb was empty (Matthew 28:13).'],
       plate:{src:'acc-bg-risen.webp',alt:'The museum’s painting of the open tomb at dawn',cap:'The open tomb · John 20'},
       d:[{k:'timeline',title:'How early the testimony is',rows:[['AD 30 or 33','Jesus is crucified under Pontius Pilate, whose name is on the stone downstairs'],['Within about five years','Paul stays fifteen days with Peter in Jerusalem and meets James (Galatians 1:18–19)'],['AD 51–52','Paul is in Corinth while Gallio is proconsul; the Gallio inscription downstairs fixes the date (Acts 18:12)'],['About AD 54','Paul writes 1 Corinthians, passing on the summary he had received years before']]},
        {k:'sketch',src:'hope-witness.svg',alt:'Peter and James, named in 1 Corinthians 15 and met by Paul in Galatians 1.',cap:'Follow two names across Paul’s letters'}]},
      {t:'What explains the facts?',
       p:['A legend? The summary was circulating within a few years, while eyewitnesses could still correct it. Paul said that most of the five hundred who saw Jesus at one time were “still alive” (1 Corinthians 15:6 CSB).',
        'Hallucinations? A hallucination happens inside one mind, so a group does not see the same one together. And hallucinations do not empty a tomb or turn an enemy like Paul.',
        'A stolen body? Then the apostles suffered for what they knew was a lie, and Peter, among others, died for it. People will die for a lie they believe. Few will suffer and die for a lie they invented themselves.',
        'He only fainted? Roman executioners knew their trade, and a half-dead man could not have convinced anyone that he had conquered death.',
        'One explanation accounts for all five facts together: God raised Jesus from the dead. I am convinced of it, as millions of thoughtful people have been. Not because it is comfortable to believe, since it means I answer to God, but because no other explanation fits what happened as well.',
        'Someone will say that dead men do not rise, so there must be some other explanation. Left to nature, they don’t. But that was never the claim. The claim is that God raised him. If God made the universe, giving life back to one man is not hard for him. Paul put it to a king: “Why do any of you consider it incredible that God raises the dead?” (Acts 26:8 CSB).',
        '?If you rule out a resurrection before you look, is that the evidence talking, or what you would lose if it were true?',
        'Thomas would not believe until he saw, and Jesus showed him. Then Jesus spoke of everyone after him: “Blessed are those who have not seen and yet believe” (John 20:29 CSB). That is not blind faith. It is how we know any history: through trustworthy witnesses. John wrote for exactly that reason: “so that you may believe that Jesus is the Messiah, the Son of God, and that by believing you may have life in his name” (John 20:31 CSB).'],
       plate:{src:'acc-bg-spirit.webp',alt:'The museum’s painting of Pentecost, when the witnesses went public in Jerusalem',cap:'The witnesses go public · Acts 2:32'},
       d:[{k:'matrix',title:'Which explanation fits the facts?',cols:['Death','Empty tomb','Seen alive','Paul & James'],rows:[['Legend',[1,0,0,0]],['Hallucination',[1,0,0,0]],['Stolen body',[1,1,0,0]],['He survived',[0,1,0,0]],['He rose',[1,1,1,1]]]}]},
      {t:'If he is raised, everything changes',
       p:['If Jesus rose, he is who he said he was. He predicted his own death and resurrection (Mark 8:31). He claimed authority to forgive sins (Mark 2:10). He accepted Thomas’s worship: “My Lord and my God!” (John 20:28 CSB). A dead teacher’s claims can be set aside. A risen Lord’s cannot.',
        'It settles how to read the Bible. Jesus said “the Scripture cannot be broken” (John 10:35 CSB), and he staked his life on what it foretold. If God raised him, God has endorsed what he taught. The stones downstairs confirm many of the Bible’s people and places. The risen Jesus is the reason to trust its message.',
        'It means the judgment is real, and we know who the Judge is. Paul told the philosophers of Athens: “God now commands all people everywhere to repent, because he has set a day when he is going to judge the world in righteousness by the man he has appointed. He has provided proof of this to everyone by raising him from the dead” (Acts 17:30–31 CSB).',
        'It means there is one way to be made right with God, and only one: “There is salvation in no one else, for there is no other name under heaven given to people by which we must be saved” (Acts 4:12 CSB).',
        'And it means death is not the end. Jesus said, “I am the resurrection and the life. The one who believes in me, even if he dies, will live” (John 11:25 CSB). Where are we going? For everyone who belongs to Christ, to resurrection and a new creation, where God “will wipe away every tear from their eyes” (Revelation 21:4 CSB).',
        '?The Judge you will stand before is the one who died for you. What will you do with him?'],
       plate:{src:'acc-bg-new-creation.webp',alt:'The museum’s painting of the new creation',cap:'All things new · Revelation 21'},
       d:[{k:'rows',title:'If Jesus rose',rows:[['His claims','are true'],['The Scriptures','carry his authority'],['Death','is defeated'],['The judgment','is certain, and Jesus is the Judge'],['Forgiveness','is offered to you now']]}]},
      {t:'What will you do?',
       p:['God’s offer is not to try harder. It is to come to him. Jesus’ first message was this: “Repent and believe the good news!” (Mark 1:15 CSB).',
        'To repent is to turn: to agree with God about your sin and turn from it to him. To believe is to trust Jesus alone to save you, not your good deeds and not your religion. Think of a parachute. You can believe it works, but it saves you only when you put it on and trust it with your whole weight.',
        '“If you confess with your mouth, ‘Jesus is Lord,’ and believe in your heart that God raised him from the dead, you will be saved” (Romans 10:9 CSB).',
        'Be clear about what that means. Forgiveness is free, but Jesus does not offer to be an addition to your life. He said, “If anyone wants to follow after me, let him deny himself, take up his cross, and follow me” (Mark 8:34 CSB). He asks for all of you, and he gives you himself.',
        'And do not wait for a better time. None of us is promised tomorrow. God’s patience with you so far is kindness, “intended to lead you to repentance” (Romans 2:4 CSB). “See, now is the acceptable time; now is the day of salvation!” (2 Corinthians 6:2 CSB).',
        '?What is keeping you from coming to him today?',
        'Hear his own invitation: “Come to me, all of you who are weary and burdened, and I will give you rest” (Matthew 11:28 CSB). You can answer it right now, in your own words. Tell God you have sinned against him. Thank Jesus for dying in your place and rising again. Ask him to forgive you, and give him your life. Words do not save you. Jesus does, and he has promised: “the one who comes to me I will never cast out” (John 6:37 CSB).',
        'Then follow him. Read the Gospel of John, a little each day. Find a church that teaches the Bible, and tell a Christian you trust what you have decided.',
        'Not ready? Then don’t shelve the question. Keep investigating, as honestly as you would anything this important. But remember that putting it off is also an answer. The evidence is waiting, and so is he.'],
       plate:{src:'acc-bg-jesus.webp',alt:'The museum’s painting of Jesus calling fishermen by the lake',cap:'Jesus calls his first followers · Mark 1:16–18'},
       d:[{k:'rows',title:'Repent and believe',rows:[['Repent','turn from your sin to God'],['Believe','trust Jesus alone to save you'],['Follow','read his Word, pray, and join his people']]}]}
    ],
    further:'<b>Read the witnesses:</b> the Gospel of John; 1 Corinthians 15; Acts 17:16–34; Romans 1–8. <b>Weigh the case:</b> Lee Strobel, <i>The Case for Christ</i>; J. Warner Wallace, <i>Cold-Case Christianity</i>; Tim Keller, <i>The Reason for God</i>; Greg Koukl, <i>Tactics</i>.'
  },
  simple: {
    title: 'What if Jesus is alive?',
    eyebrow: 'The Christian hope, said simply',
    sections: [
      {t:'The biggest questions',
       p:['Here are the biggest questions anyone can ask. Where did I come from? Why am I here? What happens when I die?',
        'The Bible’s first answer is that you are not an accident. “So God created man in his own image; he created him in the image of God” (Genesis 1:27 CSB). You were made on purpose, by Someone, for something.',
        {note:'Footnote · How do we know we’re not an accident?',p:[
         'Look at water. Ice floats, so ponds freeze on top and fish live safely underneath. Water holds heat, so the oceans keep our planet from getting too hot or too cold. And water carries what your body needs to every part of you. That looks planned!',
         'Scientists have also found that the whole universe is set up just right for life. If a few of its numbers were even a little different, there would be no stars and no people. Things that fit together that well usually have a maker. “The heavens declare the glory of God” (Psalm 19:1 CSB).']},
        '?If God made you, wouldn’t you want to know what he made you for?'],
       plate:{src:'acc-bg-creation.webp',alt:'The museum’s painting of the garden at Creation',cap:'Creation · Genesis 1'},
       d:[{k:'rows',title:'Big questions',rows:[['Where did I come from?','God made you on purpose'],['Why am I here?','To know and love God, and love people'],['What happens when I die?','Keep reading']]}]},
      {t:'Is it true?',
       p:['In this museum we don’t believe things just because we like them. We check the evidence. A stone with Pontius Pilate’s name on it shows that the governor in the Bible was a real man.',
        'Here is the tricky part. All of us want some things to be true more than others. That can make us poor judges, especially about ourselves. So be honest, and let the evidence lead.'],
       plate:{src:'find-8.webp',alt:'The museum’s study replica of the Pilate inscription',cap:'Pilate’s name in stone · Caesarea'},
       d:[{k:'rows',title:'Check it like an archaeologist',rows:[['What do we know?','Look at the evidence'],['What do I want to be true?','Be honest about it']]}]},
      {t:'Who gets to call it wrong?',
       p:['Suppose someone passes around an embarrassing picture of a friend, and everybody laughs. You know it’s wrong, even if the whole class thinks it’s funny. How do you know? God made us to know right from wrong. His law is written on our hearts (Romans 2:15).',
        'Most people think Hitler should be punished for the terrible things he did. God agrees. He is a fair judge, and one day he will judge everyone. That includes us.',
        '?If God judges everyone fairly, what would he say about you?'],
       plate:{src:'acc-bg-law.webp',alt:'The mountain in the museum’s Sinai painting',cap:'God’s law · Exodus 20'},
       d:[{k:'rows',title:'What everybody knows',rows:[['Right and wrong','are real, for everyone'],['God','is the fair judge of us all']]}]},
      {t:'What were you made for?',
       p:['A flashlight is made to shine. A pencil is made to write. What were you made for? You were made in God’s image to know him. Jesus said the most important thing is to “Love the Lord your God with all your heart,” and then to “Love your neighbor as yourself” (Mark 12:30–31 CSB).',
        'So how are we doing?',
        '?Have you ever told a lie? Taken something that wasn’t yours? Hated someone in your heart?',
        'If we’re honest, we all have. God made us to love him and to love people, and we have all missed it. That is what sin is: missing what we were made for. “For all have sinned and fall short of the glory of God” (Romans 3:23 CSB). And sin has a cost: “For the wages of sin is death” (Romans 6:23 CSB).',
        'That is bad news. But keep reading, because the next part is the best news there is.'],
       plate:{src:'acc-bg-fall.webp',alt:'The museum’s painting of the guarded garden after the Fall',cap:'The garden lost · Genesis 3'},
       d:[{k:'rows',title:'Made for something',rows:[['A flashlight','to shine'],['A pencil','to write'],['You','to know God, and to love him and people']]},
        {k:'rows',title:'God’s law asks',rows:[['Lying','Have I ever?'],['Stealing','Have I ever?'],['Hating','Have I ever?']]}]},
      {t:'What God did',
       p:['Here is the good news. God loves us too much to leave us there. He sent his Son, Jesus. Jesus never sinned, not once. Then he died on the cross and took the punishment we deserved, in our place.',
        '“But God proves his own love for us in that while we were still sinners, Christ died for us” (Romans 5:8 CSB).',
        'Forgiveness is a free gift. You can’t earn it: “the gift of God is eternal life in Christ Jesus our Lord” (Romans 6:23 CSB). A gift like that doesn’t mean sin is no big deal. Jesus forgives us, and then he helps us change.'],
       plate:{src:'acc-bg-cross.webp',alt:'The museum’s painting of the crucifixion',cap:'The cross · Romans 5:8'},
       d:[{k:'rows',title:'In our place',rows:[['We deserved','the punishment'],['Jesus took','the punishment'],['God gives','forgiveness as a gift']]}]},
      {t:'Did it really happen?',
       p:['Jesus didn’t stay dead. On the third day God raised him to life! That is the most important claim in the Bible, and you can check it.',
        'Jesus really died. Roman soldiers made sure of it, and Pilate, the governor whose name is on the stone downstairs, ordered it. Then his tomb was found empty. The first people to find it were women who followed Jesus, and at first the others “did not believe the women” (Luke 24:11 CSB). Even his enemies didn’t say the body was still there. They said his disciples had stolen it.',
        'Then many people saw him alive, once more than five hundred at the same time. Paul wrote that most of them were “still alive” to be asked (1 Corinthians 15:6 CSB).',
        'People who didn’t believe changed their minds. Jesus’ brother James didn’t believe in him at first (John 7:5), but after Jesus appeared to him, James became a leader of the church. Paul hurt Christians until Jesus appeared to him. Jesus’ friends were willing to suffer, and some to die, for saying he was alive. People don’t usually die for a story they made up.',
        'Thomas, one of Jesus’ friends, said he wouldn’t believe until he saw for himself. Jesus let him see. Then Jesus said, “Blessed are those who have not seen and yet believe” (John 20:29 CSB). We can’t see Jesus the way Thomas did, but we have the witnesses’ own words, written “so that you may believe” (John 20:31 CSB).'],
       plate:{src:'acc-bg-risen.webp',alt:'The museum’s painting of the open tomb at dawn',cap:'The open tomb · John 20'},
       d:[{k:'rows',title:'The clues',rows:[['He really died','under Pontius Pilate'],['The tomb was empty','even his enemies didn’t deny it'],['Many saw him alive','more than 500 at once'],['Doubters believed','his brother James, and Paul']]}]},
      {t:'What will you do?',
       p:['If Jesus is alive, he is who he said he is, and he can forgive you. He said, “Repent and believe the good news!” (Mark 1:15 CSB). To repent means to turn away from your sin. To believe means to trust Jesus to save you.',
        'Remember the last big question: what happens when I die? Jesus answered it: “I am the resurrection and the life. The one who believes in me, even if he dies, will live” (John 11:25 CSB). For everyone who trusts him, death is not the end. One day God “will wipe away every tear from their eyes” (Revelation 21:4 CSB).',
        'Jesus says, “Come to me” (Matthew 11:28 CSB). You don’t have to wait until you are older. You can talk to God right now, in your own words. Tell him you have sinned. Thank Jesus for dying for you and rising again. Ask him to forgive you and to lead your life.',
        'Then tell a Christian you trust, like a pastor, a youth leader or a friend. Start reading the Gospel of John. And keep asking questions. Jesus isn’t afraid of them.'],
       plate:{src:'acc-bg-jesus.webp',alt:'The museum’s painting of Jesus calling fishermen by the lake',cap:'Jesus calls his first followers · Mark 1:16–18'},
       d:[{k:'rows',title:'Turn, trust, follow',rows:[['Turn','from your sin to God'],['Trust','Jesus to save you'],['Follow','him every day']]}]}
    ],
    further:'<b>Read it yourself:</b> start with the Gospel of John, a chapter a day. Then read 1 Corinthians 15.'
  }
};

// Which edition to open: the one asked for, otherwise the player's "Say it simply" choice (shared with the upstairs reader).
function hopeEdition(key){
  if(key==='adult'||key==='simple')return key;
  return window.BD_ACCOUNTS&&BD_ACCOUNTS.simple()?'simple':'adult';
  /* Code by Daniel using Claude November 23, 2026 */
}
function hopeDiagram(d){
  if(d.k==='sketch')return '<div class="hope-diagram hope-intaglio"><img loading="lazy" src="'+BD_ART.assetURL('assets/'+d.src)+'" alt="'+escapeHTML(d.alt)+'"><small>'+escapeHTML(d.cap)+'</small></div>';
  if(d.k==='matrix')return '<div class="hope-matrix"><p class="hope-diagram-title">'+escapeHTML(d.title)+'</p><table><thead><tr><th></th>'+d.cols.map(c=>'<th scope="col">'+escapeHTML(c)+'</th>').join('')+'</tr></thead><tbody>'+d.rows.map(([name,marks])=>'<tr'+(marks.every(Boolean)?' class="fits"':'')+'><th scope="row">'+escapeHTML(name)+'</th>'+marks.map(m=>'<td aria-label="'+(m?'explains it':'does not explain it')+'">'+(m?'✓':'✗')+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
  return '<div class="hope-diagram'+(d.k==='timeline'?' hope-timeline':'')+'"><p class="hope-diagram-title">'+escapeHTML(d.title)+'</p><dl>'+d.rows.map(([a,b])=>'<div><dt>'+escapeHTML(a)+'</dt><dd>'+escapeHTML(b)+'</dd></div>').join('')+'</dl></div>';
  /* Code by Daniel using Claude November 23, 2026 */
}
function openHopeReading(key){
  const edition=hopeEdition(key),reading=BD_HOPE[edition],simple=edition==='simple';
  const para=line=>typeof line==='object'?'<details class="hope-note"><summary>'+escapeHTML(line.note)+'</summary>'+line.p.map((q,i)=>{const m=i?/^[^.?]{3,60}[.?] /.exec(q):null;return m?'<p><b>'+escapeHTML(m[0].trim())+'</b> '+escapeHTML(q.slice(m[0].length))+'</p>':para(q);}).join('')+(line.d||[]).map(hopeDiagram).join('')+'</details>':line.startsWith('?')?'<p class="hope-ask">'+escapeHTML(line.slice(1))+'</p>':'<p>'+escapeHTML(line)+'</p>';
  const spreads=reading.sections.map(s=>'<section class="hope-spread"><div><h3>'+escapeHTML(s.t)+'</h3>'+s.p.map(para).join('')+'</div><figure><img loading="lazy" src="'+BD_ART.assetURL('assets/'+s.plate.src)+'" alt="'+escapeHTML(s.plate.alt)+'"><figcaption>'+escapeHTML(s.plate.cap)+'</figcaption>'+s.d.map(hopeDiagram).join('')+'</figure></section>').join('');
  openPanel('THE CHRISTIAN HOPE','<article class="hope-leaflet'+(simple?' hope-simple':'')+'" data-reading="'+edition+'"><header><p class="eyebrow">'+escapeHTML(reading.eyebrow)+'</p><h2>'+escapeHTML(reading.title)+'</h2><label class="hope-toggle"><input type="checkbox" data-hope-simple'+(simple?' checked':'')+'> Say it simply</label></header>'+spreads+'<aside class="hope-sources"><p>'+reading.further+'</p></aside><p class="fine-print">'+escapeHTML(BD_SCRIPTURE_CREDIT)+'</p><div class="actions"><button class="button secondary" data-action="crew">Ask the crew a question</button><button class="button secondary" data-action="library">Visit the library</button></div></article>','gospel');
  const toggle=document.querySelector('[data-hope-simple]');
  if(toggle)toggle.onchange=function sayItSimply(){game.save.settings.accountsLevel=this.checked?'kids':'teen';persist();openHopeReading(this.checked?'simple':'adult');document.querySelector('[data-hope-simple]')?.focus();};
  if(!document.getElementById('hope-style')){const style=document.createElement('style');style.id='hope-style';style.textContent=BD_HOPE_CSS;document.head.appendChild(style);}
  /* Code by Daniel using Claude November 23, 2026; footnotes November 23, 2026 */
}
const BD_HOPE_CSS='.hope-note{margin:.6rem 0 .2rem;padding:.1rem .8rem .5rem;border:1px solid #c9b78f;border-radius:8px;background:#fff8e7cc}.hope-note summary{cursor:pointer;padding:.45rem 0;font:600 .92rem system-ui,sans-serif;color:#6f4f1f;text-decoration:underline;text-underline-offset:3px}.hope-note[open] summary{text-decoration:none}.hope-note p{font-size:.94em}.hope-note .hope-diagram{margin-top:.6rem}'+
 '.hope-leaflet>header{position:relative}.hope-toggle{display:inline-flex;align-items:center;gap:6px;margin-top:.4rem;font:600 .9rem system-ui,sans-serif;cursor:pointer}'+
 '.hope-ask{margin:1rem 0 .2rem!important;padding:.55rem .8rem;border-left:4px solid #a77f3f;background:#a77f3f17;font:italic 600 1.06rem/1.45 Georgia,serif}'+
 '.hope-diagram-title{margin:.2rem 0 .3rem!important;font:700 .62rem/1.3 system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#6f5a36}'+
 '.hope-matrix{margin:.5rem 0 0;border-top:1px solid #c3b596;padding:.25rem;overflow-x:auto}.hope-matrix table{width:100%;border-collapse:collapse;font:.78rem/1.25 system-ui,sans-serif}.hope-matrix th,.hope-matrix td{padding:.28rem .2rem;border-bottom:1px solid #d8ccb0;text-align:center}.hope-matrix thead th{font-weight:600;font-size:.7rem;vertical-align:bottom}.hope-matrix tbody th{text-align:left;font-weight:600;white-space:nowrap}.hope-matrix td{color:#9a4b38;font-weight:700}.hope-matrix tr.fits td,.hope-matrix tr.fits th{color:#2f6b3f;background:#2f6b3f14}'+
 '.hope-timeline div{grid-template-columns:minmax(0,.7fr) 1.2em minmax(0,1.4fr)}.hope-sources p{line-height:1.55}';
