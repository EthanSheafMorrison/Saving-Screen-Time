// Static catalogue of navigable pages (tools + key sections) that aren't stored
// in Sanity. Merged into search results so people can jump straight to a tool
// or page, not just content items. Shared by the /api/search dropdown endpoint
// and the full /search results page.

export interface PageEntry {
  _id: string;
  _type: "page";
  title: string;
  label: string; // shown as the byline, e.g. "Tool", "Browser Extension"
  href: string;
  keywords: string[];
}

export const pageCatalog: PageEntry[] = [
  {
    _id: "page-tools",
    _type: "page",
    title: "Tools",
    label: "Page",
    href: "/tools",
    keywords: ["tools", "extensions", "apps", "experiments"],
  },
  {
    _id: "page-defacer",
    _type: "page",
    title: "Screen Space Defacer",
    label: "Browser Extension",
    href: "/tools/saving-screen-space",
    keywords: [
      "defacer",
      "deface",
      "screen space",
      "browser extension",
      "graffiti",
      "draw",
      "scribble",
      "blur",
      "erase",
      "ads",
      "advertising",
    ],
  },
  {
    _id: "page-horoscope",
    _type: "page",
    title: "Screen Time Horoscope",
    label: "Tool",
    href: "/tools/screen-time-horoscope",
    keywords: [
      "horoscope",
      "stars",
      "astrology",
      "zodiac",
      "reading",
      "celestial",
    ],
  },
  {
    _id: "page-team",
    _type: "page",
    title: "Team",
    label: "Page",
    href: "/team",
    keywords: ["team", "people", "members", "researchers", "about", "who"],
  },
  {
    _id: "page-study",
    _type: "page",
    title: "Current Study",
    label: "Page",
    href: "/Study",
    keywords: ["study", "research", "participate", "story party", "take part"],
  },
  {
    _id: "page-studies",
    _type: "page",
    title: "Studies",
    label: "Page",
    href: "/Studies",
    keywords: ["studies", "research", "current studies"],
  },
  {
    _id: "page-blog",
    _type: "page",
    title: "Blog",
    label: "Page",
    href: "/blog",
    keywords: ["blog", "writing", "articles", "posts", "essays"],
  },
  {
    _id: "page-publications",
    _type: "page",
    title: "Publications",
    label: "Page",
    href: "/publications",
    keywords: ["publications", "papers", "research", "academic"],
  },
  {
    _id: "page-press",
    _type: "page",
    title: "Press",
    label: "Page",
    href: "/media",
    keywords: ["press", "media", "news", "coverage", "in the news"],
  },
];

// Case-insensitive match of a term against a page's title, label and keywords.
export function matchPages(term: string, limit = 4): PageEntry[] {
  const q = term.trim().toLowerCase();
  if (!q) return [];
  return pageCatalog
    .filter((p) => {
      const haystack = [p.title, p.label, ...p.keywords].join(" ").toLowerCase();
      return haystack.includes(q);
    })
    .slice(0, limit);
}
