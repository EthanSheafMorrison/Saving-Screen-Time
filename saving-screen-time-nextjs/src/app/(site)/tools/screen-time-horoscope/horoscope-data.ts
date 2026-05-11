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
