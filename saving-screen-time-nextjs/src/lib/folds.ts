// Folds used by the printed brochures, shown under "How to print and fold" on
// talk pages. Alex attaches one to a PDF with the "Folding Instructions"
// dropdown on the talk's downloads in Sanity (fed by foldOptions below).
//
// Measurements are millimetres, unfolded, from the left trim of the face,
// taken off the print artwork. Panels run left to right as the artwork sits
// on screen. Only the outside creases are stored: with a short-edge flip, a
// crease at x on the outside sits at (sheet width - x) on the inside and folds
// the other way when seen from that side (see insideCreases).

export type CreaseDir = "mountain" | "valley";

export interface FoldPanel {
  tag: string; // short label used in the diagrams
  x: number;
  w: number;
  role: string;
}

export interface FoldCrease {
  x: number;
  dir: CreaseDir;
  step: number;
}

export interface Fold {
  id: string;
  label: string;
  studioTitle: string;
  sheet: { name: string; w: number; h: number; orientation: "landscape" | "portrait" };
  closed: { w: number; h: number };
  duplexFlip: "short" | "long";
  outside: { panels: FoldPanel[]; creases: FoldCrease[] };
  inside: { panels: FoldPanel[] };
  steps: string[];
  // How the folded piece reads, from closed to fully open. `shows` lists panel tags.
  states: { label: string; w: number; shows: string[]; note: string }[];
}

export const folds: Record<string, Fold> = {
  "quad-fold": {
    id: "quad-fold",
    label: "Double parallel fold (quad fold)",
    studioTitle: "Quad fold, A3 (Neurospicy brochure)",
    sheet: { name: "A3", w: 420, h: 297, orientation: "landscape" },
    closed: { w: 105, h: 297 },
    duplexFlip: "short",
    outside: {
      panels: [
        { tag: "P1", x: 0, w: 105, role: "Front cover (black)" },
        { tag: "P2", x: 105, w: 105, role: "Back / Start here" },
        { tag: "P3", x: 210, w: 105, role: "Half spread, left" },
        { tag: "P4", x: 315, w: 105, role: "Half spread, right" },
      ],
      creases: [
        { x: 105, dir: "mountain", step: 2 },
        { x: 210, dir: "mountain", step: 1 },
        { x: 315, dir: "valley", step: 2 },
      ],
    },
    inside: {
      panels: [{ tag: "S1", x: 0, w: 420, role: "Single spread, white half and acid half" }],
    },
    steps: [
      "Lay the sheet inside face up. Fold it in half along the middle (210 mm) so the outside finishes on the outside. It's now 210 × 297 mm, with P1 and P2 on one face and P3 and P4 on the other.",
      "Fold it in half again, tucking the half carrying P1 behind the half carrying P2. This one fold makes the creases at 105 and 315 mm together, which is why they run in opposite directions on the flat sheet.",
      "Closed, P1 is the front and P2 is the back. P3 and P4 are inside.",
    ],
    states: [
      { label: "Closed", w: 105, shows: ["P1"], note: "The black cover." },
      { label: "One fold open", w: 210, shows: ["P1", "P2"], note: "The cover beside “Start here”." },
      { label: "Turned over", w: 210, shows: ["P3", "P4"], note: "The two-voices statement running across the fold." },
      {
        label: "Fully open",
        w: 420,
        shows: ["S1"],
        note: "The inside as one spread: everyday tips on the white half, neurospicy tips on the acid half.",
      },
    ],
  },
  "roll-trifold": {
    id: "roll-trifold",
    label: "Roll fold trifold",
    studioTitle: "Roll trifold, A4 (Family brochure)",
    sheet: { name: "A4", w: 297, h: 210, orientation: "landscape" },
    closed: { w: 100, h: 210 },
    duplexFlip: "short",
    outside: {
      panels: [
        { tag: "Flap", x: 0, w: 97, role: "Don't just ask / Also ask" },
        { tag: "Back", x: 97, w: 100, role: "Bio, Netsafe, contact" },
        { tag: "Front", x: 197, w: 100, role: "Front cover (blue)" },
      ],
      creases: [
        { x: 97, dir: "mountain", step: 1 },
        { x: 197, dir: "mountain", step: 2 },
      ],
    },
    inside: {
      panels: [
        { tag: "In 1", x: 0, w: 100, role: "Tips 01–03" },
        { tag: "In 2", x: 100, w: 100, role: "Tips 04–07" },
        { tag: "In 3", x: 200, w: 97, role: "Tips 08–10 and closing box" },
      ],
    },
    steps: [
      "Lay the sheet inside face up. Fold the flap, the narrower 97 mm panel on the right, in against the inside.",
      "Fold the cover over it. The sheet rolls one way only, so both creases fold in the same direction.",
      "Closed, the blue cover faces out and the bio panel is the back.",
    ],
    states: [
      { label: "Closed", w: 100, shows: ["Front"], note: "The blue cover." },
      {
        label: "Cover open",
        w: 197,
        shows: ["In 1", "Flap"],
        note: "Tips 01 to 03 on the left, the flap's “Don't just ask” and “Also ask” on the right.",
      },
      {
        label: "Flap open",
        w: 297,
        shows: ["In 1", "In 2", "In 3"],
        note: "The full inside: tips 01 to 10 across three panels, closing on the black box.",
      },
      { label: "Turned over", w: 100, shows: ["Back"], note: "Bio, Netsafe and contact." },
    ],
  },
};

// Options for the "Folding Instructions" dropdown in the Studio.
export const foldOptions = Object.values(folds).map((fold) => ({
  title: fold.studioTitle,
  value: fold.id,
}));

export function insideCreases(fold: Fold): FoldCrease[] {
  return fold.outside.creases
    .map((c): FoldCrease => ({
      x: fold.sheet.w - c.x,
      dir: c.dir === "mountain" ? "valley" : "mountain",
      step: c.step,
    }))
    .sort((a, b) => a.x - b.x);
}

export function printSettings(fold: Fold): string[] {
  const { name, w, h, orientation } = fold.sheet;
  return [
    `${name} paper (${w} × ${h} mm), ${orientation}`,
    `Double-sided, flip on ${fold.duplexFlip} edge`,
    "Actual size (100%), not fit to page",
  ];
}
