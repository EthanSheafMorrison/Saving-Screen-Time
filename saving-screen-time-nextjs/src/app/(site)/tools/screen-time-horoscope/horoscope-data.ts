export const ZODIAC_SIGNS = [
  { id: 'aries',       name: 'Aries',       symbol: '♈', dates: 'Mar 21 – Apr 19' },
  { id: 'taurus',      name: 'Taurus',      symbol: '♉', dates: 'Apr 20 – May 20' },
  { id: 'gemini',      name: 'Gemini',      symbol: '♊', dates: 'May 21 – Jun 20' },
  { id: 'cancer',      name: 'Cancer',      symbol: '♋', dates: 'Jun 21 – Jul 22' },
  { id: 'leo',         name: 'Leo',         symbol: '♌', dates: 'Jul 23 – Aug 22' },
  { id: 'virgo',       name: 'Virgo',       symbol: '♍', dates: 'Aug 23 – Sep 22' },
  { id: 'libra',       name: 'Libra',       symbol: '♎', dates: 'Sep 23 – Oct 22' },
  { id: 'scorpio',     name: 'Scorpio',     symbol: '♏', dates: 'Oct 23 – Nov 21' },
  { id: 'sagittarius', name: 'Sagittarius', symbol: '♐', dates: 'Nov 22 – Dec 21' },
  { id: 'capricorn',   name: 'Capricorn',   symbol: '♑', dates: 'Dec 22 – Jan 19' },
  { id: 'aquarius',    name: 'Aquarius',    symbol: '♒', dates: 'Jan 20 – Feb 18' },
  { id: 'pisces',      name: 'Pisces',      symbol: '♓', dates: 'Feb 19 – Mar 20' },
];

export type ZodiacId = typeof ZODIAC_SIGNS[number]['id'];

export type OOOTone = 'polite' | 'unhinged' | 'corporate';

export const SIGN_HOROSCOPES: Record<ZodiacId, string> = {
  aries:
    "The Ram does not check notifications — the Ram IS the notification. Your screen time is not a problem; it is a personality trait. Mars urges action, and action requires a device. The hours logged today were not wasted: they were charged.",
  taurus:
    "Venus blesses your longest session of the week. What others call mindless scrolling, Taurus calls sensory research. You cannot be rushed. The two-hour limit you set was written by someone who did not understand your needs. It wasn't you.",
  gemini:
    "Mercury rules communication, and you have 47 unread messages to prove it. Your screen time reflects a life fully lived across multiple platforms simultaneously. Three conversations at once, six tabs open, a podcast you're not quite listening to: this is not distraction. This is Gemini being Gemini.",
  cancer:
    "The Moon, your ruler, understands the need to retreat into a shell with your phone. What the screen time report calls '3 hours on social media' is, in fact, emotional attunement research. Every scroll brought you closer to your people — or at least their brunch photos. This counts.",
  leo:
    "The Sun itself cannot be screened. Your phone usage is not measured in hours — it is measured in impact. Every post you drafted, every DM you considered, every photo you assessed and did not post: this was creative labour. The screen time report was not designed for people who shine this bright.",
  virgo:
    "Mercury, your ruling planet, appreciates a well-organised home screen. The time in Notes was systems thinking. The time on TikTok was also systems thinking. The bookmark folder you reorganised at midnight was peak Virgo productivity. The screen time report lacks the nuance to understand this.",
  libra:
    "You have opened and closed the same app nine times today while deciding whether to engage. This is not indecision — it is fairness. You are weighing every possible outcome before committing a like. Your screen time reflects the labour of balance. Venus sees you. The algorithm does not.",
  scorpio:
    "Scorpio does not have screen time. Scorpio has intelligence gathering. What appears in the report as 'social networking' was a thorough forensic read of a situation that needed reading. This was necessary. You have your reasons. The stars respect your privacy on this one.",
  sagittarius:
    "Jupiter expands everything, including your screen time. The Archer cannot be contained by a one-hour app limit any more than a horse can be contained by a footnote. You started reading a recipe, ended up learning about the Ottoman Empire, and that is a feature of being you — not a flaw.",
  capricorn:
    "Saturn demands discipline. Saturn also knows that your screen time after 11pm was technically tomorrow's preparation, which makes it productive. The Goat climbs. Sometimes climbing means reading industry news at midnight. You will rest when the summit is reached. The summit keeps moving. This is also fine.",
  aquarius:
    "Uranus disrupts. You opened a thread about phone addiction on your phone and spent 40 minutes reading it. This is not irony — this is Aquarius. Your screen time is field research into the very systems you are simultaneously critiquing. You are both the observer and the observed.",
  pisces:
    "Neptune dissolves boundaries, including the one between 'just five minutes' and 'where did the evening go'. Your screen time was not wasted — it was dreamed. Each scroll was a current carrying you somewhere. The screen time report demands categories and timestamps that Pisces simply does not recognise as meaningful.",
};

export const VERDICTS: Record<ZodiacId, string> = {
  aries:       "COSMICALLY INEVITABLE",
  taurus:      "VENUS-APPROVED",
  gemini:      "DUALLY JUSTIFIED",
  cancer:      "EMOTIONALLY NECESSARY",
  leo:         "UNDENIABLY STELLAR",
  virgo:       "ANALYTICALLY SOUND",
  libra:       "CAREFULLY WEIGHED",
  scorpio:     "CLASSIFIED",
  sagittarius: "PHILOSOPHICALLY DEFENSIBLE",
  capricorn:   "STRATEGICALLY JUSTIFIED",
  aquarius:    "PARADOXICALLY VALID",
  pisces:      "BEYOND MEASUREMENT",
};

export const SCREEN_TIME_CONTEXT: Record<string, string> = {
  '<2h':  "Under two hours. The stars are surprised. This reading was probably unnecessary.",
  '2-4h': "Two to four hours. The cosmic average. You are exactly as distracted as everyone else.",
  '4-6h': "Four to six hours. A committed relationship with your device. The stars respect the consistency.",
  '6h+':  "Over six hours. The screen has become the window through which you experience existence. The stars understand.",
};

const SCREEN_TIME_LABELS: Record<string, string> = {
  '<2h':  'under 2 hours',
  '2-4h': '2 to 4 hours',
  '4-6h': '4 to 6 hours',
  '6h+':  'over 6 hours',
};

type OOOTemplate = {
  greetings: string[];
  bodies: string[];
  signoffs: string[];
};

const POLITE_TEMPLATES: Record<ZodiacId, OOOTemplate> = {
  aries: {
    greetings: [
      "Hi — I'm currently offline.",
      "Thanks for your message. I'm not here.",
      "Out of office. Mars is in charge.",
    ],
    bodies: [
      "The stars have classified my screen time as cosmically inevitable, which means I am not, in fact, available right now.",
      "Per a recent astrological audit, my notifications are a personality trait, not a productivity metric. I will respond when the cosmos permits.",
      "I am taking deliberate time away from my devices. The Ram does not check email; the Ram IS the email.",
    ],
    signoffs: [
      "Back soon (cosmically),",
      "In the meantime, the universe will sort it.",
      "— sent from a horoscope, not a phone",
    ],
  },
  taurus: {
    greetings: [
      "Hello — I'm away from my desk.",
      "Thank you for writing. I am unavailable.",
      "Out of office. Venus says rest.",
    ],
    bodies: [
      "I am presently engaged in what my astrologer has called sensory research. Replies will be slow and unhurried, in keeping with my nature.",
      "Venus has blessed this stretch of unavailability. Attempting to rush my response would offend both me and the planet that governs me.",
      "What others might call mindless scrolling, the stars have ruled venus-approved. I will return to email at a pace that suits me.",
    ],
    signoffs: [
      "Slowly yours,",
      "Replies arrive when they arrive.",
      "— composed in no particular hurry",
    ],
  },
  gemini: {
    greetings: [
      "Hi! Hello! I'm not here.",
      "Thanks for the message — one of many.",
      "Out of office, technically.",
    ],
    bodies: [
      "I am currently across at least three other conversations, six tabs, and a podcast I'm not really listening to. The stars have ruled this dually justified.",
      "Mercury rules my communication, and Mercury has decided you are in queue. I will get to this when I get to all the other things I am also getting to.",
      "I'm splitting my attention across more than is reasonable, which an astrologer recently described as 'Gemini being Gemini.' Apologies for the delay.",
    ],
    signoffs: [
      "Talk soon (and to several others),",
      "— one of me will reply eventually",
      "Mercury permitting,",
    ],
  },
  cancer: {
    greetings: [
      "Hi — I'm taking some time away.",
      "Thank you for your note. I'm offline.",
      "Out of office, retreating to the shell.",
    ],
    bodies: [
      "The Moon has advised a retreat from the inbox. I am attending to my people, my feelings, and possibly a long bath.",
      "The stars have classified my current unavailability as emotional attunement research. I'll reply once I've finished feeling about things.",
      "I'm currently inside, with my phone, with my person, and that is exactly where the Crab is meant to be. Back shortly.",
    ],
    signoffs: [
      "Softly,",
      "— writing back once I've felt my feelings",
      "From inside the shell,",
    ],
  },
  leo: {
    greetings: [
      "Hello — I'm currently unavailable.",
      "Thank you for reaching out. I am away.",
      "Out of office. Briefly off-stage.",
    ],
    bodies: [
      "The Sun, my ruler, has ordained a brief intermission. I will return to email once I have finished being radiant elsewhere.",
      "An astrologer has ruled my present unavailability undeniably stellar. To intrude further would be cosmically unwise.",
      "I am taking a moment offline. Even the brightest performers exit the stage occasionally. I'll be back.",
    ],
    signoffs: [
      "Brightly,",
      "Back to my adoring inbox shortly,",
      "— the Sun does set, briefly",
    ],
  },
  virgo: {
    greetings: [
      "Hello — I am out of office.",
      "Thank you for your message.",
      "Out of office, optimising elsewhere.",
    ],
    bodies: [
      "I am currently away from my inbox, attending to a system that needs reorganising. The stars have ruled this analytically sound.",
      "Mercury has approved a small audit of my own time, which precludes prompt replies. I will respond methodically upon return.",
      "I am unavailable. In the meantime I have organised this auto-reply into a greeting, a body, and a sign-off, which is the least I could do.",
    ],
    signoffs: [
      "Carefully,",
      "— replies in order of priority, eventually",
      "Filed under: pending,",
    ],
  },
  libra: {
    greetings: [
      "Hi — I'm currently weighing my options.",
      "Thank you for writing. I'm away.",
      "Out of office. Deliberating.",
    ],
    bodies: [
      "Venus has called for a moment of balance, which I am taking. Replies will arrive once I've considered every reasonable angle.",
      "An astrologer has ruled my current pause carefully weighed. I am not ignoring you; I am considering, which is different.",
      "I am away from my inbox while I decide several other things first. The stars assure me this is fair.",
    ],
    signoffs: [
      "Fairly yours,",
      "— a reply is being considered",
      "On balance,",
    ],
  },
  scorpio: {
    greetings: [
      "Hi. I'm not available.",
      "Thank you for your message.",
      "Out of office.",
    ],
    bodies: [
      "I am offline. Reasons are my own. The stars respect this and so, I trust, will you.",
      "My current unavailability has been astrologically classified. That is all the detail I am inclined to share.",
      "I am attending to matters that do not concern the inbox. I will reply when, and if, the moment is right.",
    ],
    signoffs: [
      "In due course,",
      "— back when I'm back",
      "Discreetly,",
    ],
  },
  sagittarius: {
    greetings: [
      "Hi! I'm somewhere else right now.",
      "Thanks for the message — I'm away.",
      "Out of office. Off chasing something.",
    ],
    bodies: [
      "Jupiter has expanded my plans for the day well beyond the inbox. The stars have ruled this philosophically defensible.",
      "I started looking up one thing and ended up several hours into something entirely different, which is, I'm told, simply how I work.",
      "I'm currently following a thread that has taken me far from email. I will return with stories and, eventually, a reply.",
    ],
    signoffs: [
      "Wandering,",
      "— back from the tangent soon",
      "Onwards,",
    ],
  },
  capricorn: {
    greetings: [
      "Hello — I am out of office.",
      "Thank you for your message.",
      "Out of office, climbing.",
    ],
    bodies: [
      "Saturn has approved a measured pause. The stars have ruled this strategically justified, which I assume satisfies any concerns.",
      "I am away from my desk attending to something that, in the long arc of things, matters more than this email. Apologies for the delay.",
      "The Goat is between summits. I will respond from the next one, on a schedule of my choosing.",
    ],
    signoffs: [
      "In due course,",
      "— back at the summit shortly",
      "Steadily,",
    ],
  },
  aquarius: {
    greetings: [
      "Hi — I'm offline, conceptually.",
      "Thanks for your message. I am away.",
      "Out of office. Observing.",
    ],
    bodies: [
      "Uranus has disrupted my usual availability, which the stars have ruled paradoxically valid. I am both here and not here.",
      "I am presently away, partly to think about being away. Replies will follow once I have finished critiquing the systems I'm using to send them.",
      "I'm conducting some field research that requires being unreachable. I appreciate the irony and so, I hope, do you.",
    ],
    signoffs: [
      "From the margins,",
      "— reachable in principle, not in practice",
      "Yours, conceptually,",
    ],
  },
  pisces: {
    greetings: [
      "Hello — I've drifted offline.",
      "Thank you for writing. I am elsewhere.",
      "Out of office, dreaming.",
    ],
    bodies: [
      "Neptune has dissolved the boundary between 'just five minutes' and the rest of the afternoon. Replies will arrive when the tide brings me back.",
      "My current unavailability has been ruled beyond measurement by the stars, which I think is fair.",
      "I'm somewhere between intentions at the moment. I will reply once I have surfaced.",
    ],
    signoffs: [
      "Drifting,",
      "— back when the current returns me",
      "Softly afloat,",
    ],
  },
};

const UNHINGED_TEMPLATES: Record<ZodiacId, OOOTemplate> = {
  aries: {
    greetings: [
      "I'M NOT HERE. don't ask where.",
      "hey. no. not opening this.",
      "OUT. Mars said go. I went.",
    ],
    bodies: [
      "look, I opened your email, then I closed it, then I opened it again, then I threw my phone across the room and now I'm in the garden screaming at a hedge. the stars said this was inevitable so I'm taking that as written permission.",
      "I have CHARGED my way out of this inbox like a bull through a screen door and I will not be apologising for it. if you needed something urgent you should have texted me, also called me, also stood outside my window. I would have answered all three.",
      "do you know how many notifications I have right now. do you. I'm not telling you. it's a number that would worry you. Mars is in charge today and Mars said NO EMAILS so respectfully, NO EMAILS.",
    ],
    signoffs: [
      "rage-reading replies later,",
      "— sent at full volume from a horoscope",
      "back when I've cooled off (never),",
    ],
  },
  taurus: {
    greetings: [
      "hello no I'm in bed.",
      "thank you for your email. I'm a soft animal now.",
      "out of office and IN a duvet, specifically.",
    ],
    bodies: [
      "I have constructed a small nest of snacks and pillows and I am not leaving it for an email. I have looked at your message. I felt several things. I closed the app. Venus said this was correct and Venus has never lied to me.",
      "I will not be rushed and I will not be guilted and I will not be 'circling back' before Wednesday. I have been horizontal for the last three hours and the stars said this was venus-approved so I am simply listening to the planet that named me.",
      "you're sweet for emailing but I am currently mid-cheese, mid-blanket, mid-existential-stretch. an astrologer told me my screen time was a sensory pilgrimage and now I cannot stop quoting her.",
    ],
    signoffs: [
      "horizontally yours,",
      "— do not knock, I will not rise",
      "in the nest, indefinitely,",
    ],
  },
  gemini: {
    greetings: [
      "hi hi hi I'm in seventeen places.",
      "I have your email open in tab 41.",
      "out of office, also in office, also in three group chats.",
    ],
    bodies: [
      "okay so I was going to reply to you but then someone in the group chat said something INSANE and then I opened a thread about it and then a podcast started playing and I don't know who started the podcast and now I have to investigate. Mercury rules me and Mercury, candidly, is not okay today.",
      "I have started this reply four times. each draft was completely different. one was a haiku. one was a voice note. one was, accidentally, sent to my mum. the stars said this was dually justified and at this point I'm just going with it.",
      "you sent ONE email. I have received twelve in the time it has taken me to think about answering yours. I love you. I love them. I cannot hold all of you. I am going outside to talk to a stranger to reset my system.",
    ],
    signoffs: [
      "talk to one of me eventually,",
      "— this email was drafted across four apps",
      "spiralling, but in a fun way,",
    ],
  },
  cancer: {
    greetings: [
      "hi. I cried earlier. not about this.",
      "I'm offline and I'm SOFT about it.",
      "out of office, in the shell, do not knock.",
    ],
    bodies: [
      "I have been thinking about your email for three days and I have not opened it because I had a feeling about it. the feeling was 'maybe later' and the Moon agreed with the feeling so respectfully I am honouring the feeling and not opening it. yet. maybe never. we'll see.",
      "I'm currently making a stew and watching a film that I have seen eleven times. the screen time report flagged my behaviour as concerning and I flagged the screen time report as concerning so it's mutual now. emotional attunement research is the cause AND the verdict.",
      "look I love you. I love everyone who has ever emailed me. I am ALSO going to be unreachable for an indeterminate stretch because the Moon told me to be and I do what the Moon says. please survive without me. I believe in you.",
    ],
    signoffs: [
      "soft and unreachable,",
      "— sent from the bathtub, eventually",
      "wrapped in something, definitely,",
    ],
  },
  leo: {
    greetings: [
      "darling. no. I'm offstage.",
      "I am taking a SCHEDULED moment of radiance.",
      "out of office. ADORINGLY out of office.",
    ],
    bodies: [
      "do you understand what it COSTS to be this luminous all the time. do you. I have been performing for an inbox that does not even WATCH and frankly I am owed a break. the Sun set. so did I. I'll be back at golden hour.",
      "the stars have ruled my current unavailability undeniably stellar and who am I to argue with a panel of cosmic objects. I have lit a single candle and put on a robe. you will not be hearing from me until I am ready to be looked at again.",
      "everyone has been DEMANDING me lately and I have given and given and now I am taking. I am taking a long walk. I am taking my reflection in three different windows. I am taking, and you, my love, are giving — patience.",
    ],
    signoffs: [
      "brilliantly, briefly, gone,",
      "— offstage, lit from within",
      "back when I am served and not serving,",
    ],
  },
  virgo: {
    greetings: [
      "hi. I have a spreadsheet about why I'm not here.",
      "I am audited and I am away.",
      "out of office and reorganising the cutlery drawer.",
    ],
    bodies: [
      "I cannot reply right now because I am alphabetising the spice rack and I have already done it twice this week and the stars said this was analytically sound so I am simply listening to the stars. the spice rack is, objectively, beautiful. you are not.",
      "I made a list of the emails I owe replies to. then I made a list of the lists. then I colour-coded them. then I cried a little, professionally. Mercury has approved this audit so please do not interrupt.",
      "do you know how many tabs I have open. I do. I counted. I have a note. I am not telling you the number because it would distress us both. I will be back at the inbox when the note is empty, which is to say, never.",
    ],
    signoffs: [
      "annotated and away,",
      "— colour-coded and unreachable",
      "filed under: not now,",
    ],
  },
  libra: {
    greetings: [
      "hi. I cannot decide if I should reply.",
      "thank you for writing. I'm WEIGHING you.",
      "out of office, deliberating, again.",
    ],
    bodies: [
      "I opened your email, I closed your email, I opened your email, I closed your email, I asked three people what to do, two said reply, one said wait, so I am waiting. Venus said this was carefully weighed and I trust Venus on these matters more than I trust myself.",
      "look I want to be FAIR about this and being fair takes TIME and I do not have time today because I am also being fair about seventeen other things. I will get back to you the moment my internal jury returns a verdict. they're still out.",
      "I am not ignoring you. I am considering you. there is a DIFFERENCE. the difference is that ignoring is fast and considering is excruciating and you are getting the slow, beautiful, agonising version.",
    ],
    signoffs: [
      "still considering,",
      "— a reply has been drafted, undrafted, redrafted",
      "fairly, eventually,",
    ],
  },
  scorpio: {
    greetings: [
      "no.",
      "I saw your email. that is enough.",
      "out of office. don't.",
    ],
    bodies: [
      "I have read your message. I have read it carefully. I have read the messages around it. I have read the messages YOU did not send. I have a full picture. I am not sharing the picture. the stars classified this and so will I.",
      "I am offline and the reasons are not your business. if you really need to know what I'm doing I would suggest looking inward and asking why you needed to know. the stars and I are aligned on the boundary here.",
      "I am attending to a situation. the situation does not concern you. if the situation came to concern you, you would already know. it does not. so go about your day. with grace, ideally.",
    ],
    signoffs: [
      "with intention,",
      "— no further information will be provided",
      "in due course, perhaps,",
    ],
  },
  sagittarius: {
    greetings: [
      "HI! I'm in a different country emotionally.",
      "thanks for the email I'M ON A TANGENT.",
      "out of office. somewhere better.",
    ],
    bodies: [
      "I opened your email and then I opened a Wikipedia article about the Ottoman Empire and now it is four hours later and I am reading about a 14th century cartographer and I cannot in good conscience break this streak to reply to you. Jupiter EXPANDED and so did my afternoon.",
      "I have not been at my desk in days. I have been at a desk. it's not mine. the stars said this was philosophically defensible and I have decided to interpret that as a permission slip for my entire week.",
      "look I started this morning intending to reply to you and then someone mentioned a documentary and now I'm three documentaries deep, I've learned about crows, I've ordered a book, and the email has not moved. it's not personal. it's me, expanding.",
    ],
    signoffs: [
      "tangentially yours,",
      "— back from the rabbit hole, eventually",
      "currently learning about something else,",
    ],
  },
  capricorn: {
    greetings: [
      "I'm working. just not on this.",
      "thank you for your message. I'm climbing something.",
      "out of office. structurally.",
    ],
    bodies: [
      "I am on a call. when that call ends I will be on another call. when THAT call ends I will be reviewing notes from the first two calls and then taking a 14 minute walk and then doing it all again. Saturn approved this schedule and Saturn does not negotiate.",
      "I have been working since approximately the day I was born and I am not stopping for an email, even a good one. the stars have ruled my current trajectory strategically justified and so I will simply… continue. you understand.",
      "I am between summits. literally I am on a stairwell. I will reply when I get to the next floor of my life which is hopefully Thursday but realistically Q3.",
    ],
    signoffs: [
      "executing,",
      "— scheduled to respond Q3",
      "ascending, with intent,",
    ],
  },
  aquarius: {
    greetings: [
      "I'm not here and I have THOUGHTS about it.",
      "thanks for emailing. the inbox is a construct.",
      "out of office, philosophically and otherwise.",
    ],
    bodies: [
      "I'm currently writing a long manifesto about why I'm not replying to emails and I am writing it ON my phone which I am aware undermines the manifesto somewhat but Uranus disrupts and Uranus said this was paradoxically valid so I'm going with it.",
      "I read a 9,000 word essay about attention earlier today, on my phone, while ignoring three notifications including yours, and I have not recovered. the stars said I was both observer and observed and now I cannot stop watching myself watch you.",
      "I am unreachable in principle, not in practice. you could find me if you tried. please don't. the experiment requires that you don't. thank you for being part of the experiment without your consent. it's for science.",
    ],
    signoffs: [
      "from outside the system, sort of,",
      "— this is also a manifesto",
      "yours, theoretically,",
    ],
  },
  pisces: {
    greetings: [
      "hi I think I dissolved.",
      "thanks for writing. I'm not really here.",
      "out of office and possibly underwater.",
    ],
    bodies: [
      "I was going to reply to your email at noon and then I closed my eyes for a minute and now it is night and the candle has burnt out and I have written a poem about a heron. Neptune dissolved the day and I do not know how to get it back.",
      "I opened your message and it became a feeling and the feeling became a long walk and the long walk became a nap and the nap became a different person entirely. the stars said this was beyond measurement so I am not measuring it.",
      "I'm somewhere between intentions, between cups of tea, between hours. I will surface eventually. I always do. usually with a small mystery I cannot explain attached to my hair.",
    ],
    signoffs: [
      "drifting, gently,",
      "— sent from a half-remembered dream",
      "underwater, currently,",
    ],
  },
};

const CORPORATE_TEMPLATES: Record<ZodiacId, OOOTemplate> = {
  aries: {
    greetings: [
      "Thank you for your email.",
      "Hi, thanks for reaching out.",
      "Out of office — auto-reply.",
    ],
    bodies: [
      "I am currently OOO executing on a high-priority personal initiative aligned to my Q3 OKRs. Per a recent astrological alignment review, my notification behaviour has been classified as cosmically inevitable, which is now a non-negotiable workstream.",
      "I'm out of office while I drive forward several action items flagged in my latest astrological standup. Mars has been escalated as the executive sponsor for this period and replies will follow once the cycle closes.",
      "I'm currently heads-down on personal deliverables. Please consider this email triaged. If your ask is a blocker, kindly re-raise via the appropriate channel and I will circle back at the next available alignment window.",
    ],
    signoffs: [
      "Best,",
      "— circling back at the earliest opportunity",
      "Regards,",
    ],
  },
  taurus: {
    greetings: [
      "Thank you for your email.",
      "Hi — thanks for reaching out.",
      "Out of office. Auto-reply.",
    ],
    bodies: [
      "I am out of office on a planned recovery sprint. Venus, the executive sponsor of this initiative, has confirmed the scope as venus-approved and any attempts to compress the timeline will be politely declined.",
      "I'm currently allocating bandwidth toward sustainable throughput practices. Per the latest astrological review, my current pace is on-target and replies will arrive at a cadence consistent with my Q2 wellness KPIs.",
      "Thanks for your patience. I'm engaged in what my external stakeholders have framed as sensory research, and I will be returning to email once I have closed out the current scope of work.",
    ],
    signoffs: [
      "Kind regards,",
      "— responses to follow at appropriate cadence",
      "Warmly,",
    ],
  },
  gemini: {
    greetings: [
      "Thanks for reaching out!",
      "Hi — appreciate the note.",
      "Out of office. Multiple workstreams active.",
    ],
    bodies: [
      "I'm currently splitting bandwidth across several parallel workstreams and your email has been queued accordingly. Per Mercury's most recent ops review, this prioritisation has been ruled dually justified, and I will revert as capacity opens up.",
      "I'm OOO across at least three concurrent threads and will be following up asynchronously. Apologies for any latency — Mercury has escalated this as a known and accepted risk for the quarter.",
      "Thanks for looping me in. I am currently looped into a number of other things, several of which were also marked urgent. I will be triaging in good faith and looping back at the earliest available touchpoint.",
    ],
    signoffs: [
      "Best,",
      "— one of me will circle back EOW",
      "Talk soon,",
    ],
  },
  cancer: {
    greetings: [
      "Thank you for your message.",
      "Hi — appreciate you reaching out.",
      "Out of office. Auto-reply.",
    ],
    bodies: [
      "I am currently OOO on a personal recharge sprint. Per the latest astrological pulse-check, the Moon has signed off on the scope and I will be returning to email once I have completed the planned restorative deliverables.",
      "I'm taking PTO to address several high-priority interpersonal action items. The stars have flagged this allocation as emotionally necessary and I appreciate your patience as I work through the queue.",
      "Thanks for your patience. I'm currently away on a planned wellness initiative and will be back online once the sponsor (the Moon) closes out the cycle. Replies will resume at standard cadence shortly thereafter.",
    ],
    signoffs: [
      "Warmly,",
      "— reply forthcoming once the sprint closes",
      "All the best,",
    ],
  },
  leo: {
    greetings: [
      "Thank you for your email.",
      "Hi — thanks for reaching out.",
      "Out of office. Brief intermission.",
    ],
    bodies: [
      "I'm OOO during a planned visibility intermission. Per the most recent astrological 1:1, the Sun has been confirmed as executive sponsor and any pause in deliverables has been ruled undeniably stellar by the broader cosmic leadership team.",
      "I am currently engaged in a strategic brand-presence review (mine). The stars have signed off on the timeline and I will be returning to inbox triage as soon as the rollout is complete.",
      "Thanks for the note. I am OOO recharging key personal capital and will be revisiting outstanding asks once I have completed the current optics initiative.",
    ],
    signoffs: [
      "Best,",
      "— rolling back online shortly",
      "Regards,",
    ],
  },
  virgo: {
    greetings: [
      "Thank you for your email.",
      "Hi — appreciate the message.",
      "Out of office — auto-reply.",
    ],
    bodies: [
      "I am currently OOO conducting a personal process review. Mercury has approved the scope and the stars have ruled the initiative analytically sound. I will respond per the agreed cadence on return.",
      "Thank you for your patience. I am out of office while I optimise several low-leverage workflows on the personal side. Replies will resume in priority order at the earliest available window.",
      "I'm OOO running a small audit. Per the astrological review committee, this has been flagged as both timely and necessary. I will be circling back to triage outstanding items once the audit concludes.",
    ],
    signoffs: [
      "Kind regards,",
      "— responses to follow in priority order",
      "Best,",
    ],
  },
  libra: {
    greetings: [
      "Thank you for your email.",
      "Hi — thanks for reaching out.",
      "Out of office. Reviewing.",
    ],
    bodies: [
      "I am currently OOO weighing several inputs. Venus has been engaged as advisor and the stars have classified the pause as carefully weighed. I will revert once a decision has been reached.",
      "Thanks for your patience. I'm out of office while I conduct a small alignment exercise across multiple internal stakeholders (also me). I will follow up once consensus is achieved.",
      "I'm currently OOO in a strategic deliberation cycle. Per the most recent astrological steerco, this has been ruled both fair and necessary. I will respond as soon as the framework is locked.",
    ],
    signoffs: [
      "Best,",
      "— reply pending stakeholder alignment",
      "Kindly,",
    ],
  },
  scorpio: {
    greetings: [
      "Thank you for your email.",
      "Auto-reply.",
      "Out of office.",
    ],
    bodies: [
      "I am currently OOO on a confidential workstream. Per the astrological review, the scope of this engagement has been classified and is not available for further disclosure.",
      "I am out of office. Reasons have been documented internally. The stars have approved the scope. Further details will be shared on a strict need-to-know basis.",
      "Thank you for your message. I am unable to provide an updated ETA on a response at this time. The matter is being handled and the stars are across it.",
    ],
    signoffs: [
      "Regards,",
      "— further updates as required",
      "Best,",
    ],
  },
  sagittarius: {
    greetings: [
      "Thanks for reaching out!",
      "Hi — appreciate the email.",
      "Out of office. Exploring.",
    ],
    bodies: [
      "I'm currently OOO on a personal R&D initiative that has expanded somewhat beyond its original scope. Jupiter has approved the budget overage and the stars have ruled the trajectory philosophically defensible.",
      "I am out of office while I follow up on a high-potential tangent. Per the astrological PI planning session, this has been added to my roadmap and replies to existing threads will resume once the exploration concludes.",
      "Thanks for your patience. I'm OOO conducting some opportunistic discovery work. The stars are across it and I will circle back with learnings at the next available touchpoint.",
    ],
    signoffs: [
      "Best,",
      "— circling back with findings shortly",
      "All the best,",
    ],
  },
  capricorn: {
    greetings: [
      "Thank you for your email.",
      "Hi — thanks for reaching out.",
      "Out of office. Currently executing.",
    ],
    bodies: [
      "I'm currently OOO executing on a high-priority personal milestone. Saturn has signed off on the timeline and the stars have ruled the workstream strategically justified. I will follow up at the earliest available window.",
      "Thank you for your patience. I am between key deliverables and replies will resume once I have closed out the current cycle. Per the astrological leadership review, this is on-track.",
      "I am out of office attending to a workstream that has been prioritised above the inbox. The stars have approved the prioritisation and I will revert per the agreed cadence on return.",
    ],
    signoffs: [
      "Regards,",
      "— reply to follow per schedule",
      "Best,",
    ],
  },
  aquarius: {
    greetings: [
      "Thank you for your email.",
      "Hi — appreciate the note.",
      "Out of office. Auto-reply.",
    ],
    bodies: [
      "I am currently OOO conducting a personal systems review. Uranus has approved the disruption and the stars have ruled the initiative paradoxically valid. Replies will resume once the review is complete.",
      "I'm out of office while I conduct a small piece of field research into my own working patterns. The astrological steering committee has flagged this as both ironic and necessary.",
      "Thank you for your patience. I am OOO and partially unreachable by design. Per the most recent astrological retrospective, this has been ruled in scope and on-strategy.",
    ],
    signoffs: [
      "Best,",
      "— responses to follow upon system reset",
      "Kindly,",
    ],
  },
  pisces: {
    greetings: [
      "Thank you for your email.",
      "Hi — thanks for reaching out.",
      "Out of office. Auto-reply.",
    ],
    bodies: [
      "I'm currently OOO on a personal restoration cycle. Neptune has approved the scope and the stars have ruled the timeline beyond measurement, which I am treating as a flexible commitment.",
      "Thank you for your patience. I'm out of office attending to several internal workstreams of an undefined nature. Replies will resume once I have surfaced from the current cycle.",
      "I am OOO and the return ETA is to be confirmed. The stars are across it and a follow-up will be issued at the appropriate moment.",
    ],
    signoffs: [
      "Warmly,",
      "— response forthcoming, timing TBC",
      "Best,",
    ],
  },
};

export const OOO_TEMPLATES: Record<OOOTone, Record<ZodiacId, OOOTemplate>> = {
  polite: POLITE_TEMPLATES,
  unhinged: UNHINGED_TEMPLATES,
  corporate: CORPORATE_TEMPLATES,
};

const pickRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export function rollOOO(signId: ZodiacId, screenTime: string | null, tone: OOOTone = 'polite'): string {
  const t = OOO_TEMPLATES[tone][signId];
  const verdict = VERDICTS[signId];
  const stPhrase = screenTime ? SCREEN_TIME_LABELS[screenTime] : null;
  const stLine = stPhrase
    ? `\n\nCurrent daily screen time: ${stPhrase}. Cosmic verdict: ${verdict}.`
    : `\n\nCosmic verdict: ${verdict}.`;
  return `${pickRandom(t.greetings)}\n\n${pickRandom(t.bodies)}${stLine}\n\n${pickRandom(t.signoffs)}`;
}
