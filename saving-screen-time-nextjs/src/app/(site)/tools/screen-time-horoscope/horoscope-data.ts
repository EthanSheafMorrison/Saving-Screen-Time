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

export const OOO_TEMPLATES: Record<ZodiacId, {
  greetings: string[];
  bodies: string[];
  signoffs: string[];
}> = {
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

const pickRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export function rollOOO(signId: ZodiacId, screenTime: string | null): string {
  const t = OOO_TEMPLATES[signId];
  const verdict = VERDICTS[signId];
  const stPhrase = screenTime ? SCREEN_TIME_LABELS[screenTime] : null;
  const stLine = stPhrase
    ? `\n\nCurrent daily screen time: ${stPhrase}. Cosmic verdict: ${verdict}.`
    : `\n\nCosmic verdict: ${verdict}.`;
  return `${pickRandom(t.greetings)}\n\n${pickRandom(t.bodies)}${stLine}\n\n${pickRandom(t.signoffs)}`;
}
