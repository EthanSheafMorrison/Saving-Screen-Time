// Screen Time Fortune copy: the fortune bank, out-of-office templates and tone
// labels, copied verbatim from the prototype (Saving-Screen-fortune,
// src/screen-time-fortune.jsx). Shared by the booth pages in app/(fortune).

export type FortuneCategory = "PROPHECY" | "STAT" | "ADVICE" | "ACHIEVEMENT";

export interface Fortune {
  text: string;
  category: FortuneCategory;
}

export type OOOTone = "polite" | "unhinged" | "corporate";

export const FORTUNES: Fortune[] = [
  { text: "You will open your email app seven times and reply twice.", category: "PROPHECY" },
  { text: "A notification will arrive. You will not act on it.", category: "PROPHECY" },
  { text: "Your average screen time this week was a number. Congratulations.", category: "STAT" },
  { text: "You unlocked your phone 94 times today. None of them were the right time.", category: "STAT" },
  { text: "Try putting your phone in a drawer. You will retrieve it in four minutes.", category: "ADVICE" },
  { text: "Your Do Not Disturb mode disturbs only you.", category: "ADVICE" },
  { text: "You've reached Level 7 Doomscroller. There is no Level 8.", category: "ACHIEVEMENT" },
  { text: "Badge unlocked: Replied to a Slack message while walking into a wall.", category: "ACHIEVEMENT" },
  { text: "The blue light filter is protecting your eyes from seeing what you're doing with your life.", category: "ADVICE" },
  { text: "You spent 3 hours on your phone today. Your phone spent 0 hours thinking about you.", category: "STAT" },
  { text: "Someone is typing... They will stop. They will not send.", category: "PROPHECY" },
  { text: "Your weekly screen time report is ready. You will not read it.", category: "STAT" },
  { text: "Achievement unlocked: Checked the time on your phone, forgot it, checked again.", category: "ACHIEVEMENT" },
  { text: "You will screenshot something important. You will never find it again.", category: "PROPHECY" },
  { text: "Your phone battery is a metaphor. You are also at 12%.", category: "ADVICE" },
  { text: "Today you will close an app and reopen it within three seconds.", category: "PROPHECY" },
  { text: "Wellness reminder: You've been holding your phone for 47 minutes. Your neck knows.", category: "STAT" },
  { text: "You have 1,847 unread emails. None of them are the one you're looking for.", category: "STAT" },
  { text: "Badge unlocked: Said 'just one more scroll' fourteen times.", category: "ACHIEVEMENT" },
  { text: "A group chat will activate. You will mute it. It will persist.", category: "PROPHECY" },
  { text: "Your most-used app knows you better than your therapist. It costs less, too.", category: "ADVICE" },
  { text: "You will Google something, click the first link, then Google it again differently.", category: "PROPHECY" },
  { text: "Screen Time suggests you set a limit. You will override it in 45 seconds.", category: "STAT" },
  { text: "Achievement unlocked: Used your phone to find your phone.", category: "ACHIEVEMENT" },
];

export const OOO_TEMPLATES: Record<OOOTone, (fortune: string) => string> = {
  polite: (fortune) => `Thanks for your email. I'm currently away from my inbox.\n\nToday's Screen Time Fortune says:\n"${fortune}"\n\nPlease consider whether your email might answer itself in my absence. Most do.\n\nI'll respond when I return — or when my phone unlocks itself, whichever comes first.`,
  unhinged: (fortune) => `AUTO-REPLY:\n\nI am not here. My phone is here. It misses you more than I do.\n\nA fortune was generated in your honour:\n"${fortune}"\n\nIf your matter is urgent, it probably isn't. If it is, it probably won't be by the time I'm back.\n\nThis auto-reply was written by a human, which is more than can be said for most emails.\n\nRegards,\nMy Phone (on behalf of me)`,
  corporate: (fortune) => `Thank you for your message. I am currently out of office with limited access to existential dread.\n\nPlease note the following automated insight:\n"${fortune}"\n\nFor urgent enquiries, please contact literally anyone else.\n\nI will action your email upon my return, pending a full review of whether "action" is a verb.\n\nKind regards`
};

export const TONE_LABELS: Record<OOOTone, string> = { polite: "Polite-ish", unhinged: "Fully Unhinged", corporate: "Corporate Parody" };

// Placeholder: the prototype has no subject line. Replace with the real copy.
export const OOO_SUBJECTS: Record<OOOTone, string> = {
  polite: "Out of office",
  unhinged: "Out of office",
  corporate: "Out of office",
};
