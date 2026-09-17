// Styles for the booth pages, inlined into <head> by the layout so a cold load
// on conference wifi needs no stylesheet request. The look follows the Screen
// Time Horoscope tool page: neon yellow on black, square borders, EB Garamond
// title, DM Sans labels, IBM Plex Mono for the reading and the out-of-office.

// Fonts are self-hosted subsets. Each fallback face is scaled to its webfont's
// width (measured against the strings on this page) and given its vertical
// metrics, so nothing reflows or moves when the webfonts swap in. Proportional
// text above the fold stays on fixed lines.
const FONTS = `
@font-face {
  font-family: "IBM Plex Mono";
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/ibm-plex-mono-400.woff2") format("woff2");
  unicode-range: U+0020-007E, U+00A0, U+00B7, U+2013-2014, U+2018-2019, U+201C-201D, U+2026;
}
@font-face {
  font-family: "IBM Plex Mono";
  font-weight: 600;
  font-display: swap;
  src: url("/fonts/ibm-plex-mono-600.woff2") format("woff2");
  unicode-range: U+0020-007E, U+00A0, U+00B7, U+2013-2014, U+2018-2019, U+201C-201D, U+2026;
}
@font-face {
  font-family: "EB Garamond";
  font-weight: 700;
  font-display: swap;
  src: url("/fonts/eb-garamond-700.woff2") format("woff2");
  unicode-range: U+0020, U+0027, U+002D, U+0041-005A, U+0061-007A, U+2014;
}
@font-face {
  font-family: "EB Garamond";
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/eb-garamond-italic-400.woff2") format("woff2");
  unicode-range: U+0020, U+002D, U+0041-005A, U+0061-007A;
}
@font-face {
  font-family: "DM Sans";
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/dm-sans-400.woff2") format("woff2");
  unicode-range: U+0020-007E, U+00A0, U+00B7, U+2013-2014, U+2018-2019, U+201C-201D, U+2026;
}
@font-face {
  font-family: "DM Sans";
  font-weight: 700;
  font-display: swap;
  src: url("/fonts/dm-sans-700.woff2") format("woff2");
  unicode-range: U+0020-007E, U+00A0, U+00B7, U+2013-2014, U+2018-2019, U+201C-201D, U+2026;
}
@font-face {
  font-family: "DM Sans";
  font-weight: 900;
  font-display: swap;
  src: url("/fonts/dm-sans-900.woff2") format("woff2");
  unicode-range: U+0020-007E, U+00A0, U+00B7, U+2013-2014, U+2018-2019, U+201C-201D, U+2026;
}

@font-face {
  font-family: "Plex Mono Fallback";
  font-weight: 400;
  src: local("Menlo-Regular"), local("Menlo Regular");
  size-adjust: 99.66%;
  ascent-override: 102.85%;
  descent-override: 27.59%;
  line-gap-override: 0%;
}
@font-face {
  font-family: "Plex Mono Fallback";
  font-weight: 600;
  src: local("Menlo-Bold"), local("Menlo Bold");
  size-adjust: 99.66%;
  ascent-override: 102.85%;
  descent-override: 27.59%;
  line-gap-override: 0%;
}
@font-face {
  font-family: "EB Garamond Fallback";
  font-weight: 700;
  src: local("Georgia-Bold"), local("Georgia Bold");
  size-adjust: 87.7%;
  ascent-override: 114.82%;
  descent-override: 33.98%;
  line-gap-override: 0%;
}
@font-face {
  font-family: "EB Garamond Fallback";
  font-style: italic;
  font-weight: 400;
  src: local("Georgia-Italic"), local("Georgia Italic");
  size-adjust: 84.2%;
  ascent-override: 119.6%;
  descent-override: 35.39%;
  line-gap-override: 0%;
}
@font-face {
  font-family: "DM Sans Fallback";
  font-weight: 400;
  src: local("ArialMT"), local("Arial");
  size-adjust: 103.4%;
  ascent-override: 95.94%;
  descent-override: 29.98%;
  line-gap-override: 0%;
}
@font-face {
  font-family: "DM Sans Fallback";
  font-weight: 700;
  src: local("Arial-BoldMT"), local("Arial Bold");
  size-adjust: 95.6%;
  ascent-override: 103.77%;
  descent-override: 32.43%;
  line-gap-override: 0%;
}
@font-face {
  font-family: "DM Sans Fallback";
  font-weight: 900;
  src: local("Arial-BoldMT"), local("Arial Bold");
  size-adjust: 96.8%;
  ascent-override: 102.48%;
  descent-override: 32.02%;
  line-gap-override: 0%;
}
`;

export const FORTUNE_CSS = `${FONTS}
:root {
  --black: #050505;
  --yellow: #e7ff00;
  --white: #cfccd3;
  --blue: #0f29ec;
  --paper: #f5f5f0;
  --ink: #1a1a1a;
  --mono: "IBM Plex Mono", "Plex Mono Fallback", monospace;
  --serif: "EB Garamond", "EB Garamond Fallback", Georgia, serif;
  --sans: "DM Sans", "DM Sans Fallback", Arial, Helvetica, sans-serif;
  --gutter-left: max(1.5rem, env(safe-area-inset-left));
  --gutter-right: max(1.5rem, env(safe-area-inset-right));
  color-scheme: dark;
}

*, *::before, *::after { box-sizing: border-box; }

html {
  background: var(--black);
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

body {
  margin: 0;
  background: var(--black);
  color: var(--yellow);
  font-family: var(--sans);
  font-size: 1rem;
  line-height: 1.5;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

/* Site nav, as on the tool pages at phone width */
.site-nav {
  padding: max(0.5rem, env(safe-area-inset-top)) var(--gutter-right) 0.5rem var(--gutter-left);
  background: #000;
}

.home-link {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  min-height: 3rem;
  color: var(--white);
  font-family: var(--mono);
  font-size: 1rem;
  text-decoration: none;
}

.home-link svg { flex: none; }

/* Sections */
.section {
  position: relative;
  padding: 1.375rem var(--gutter-right) 1.375rem var(--gutter-left);
  border-bottom: 2px solid var(--yellow);
}

.section-inner {
  position: relative;
  max-width: 40rem;
  margin: 0 auto;
}

.intro { overflow: hidden; }

.intro::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 12px 12px;
  opacity: 0.08;
  pointer-events: none;
}

.tag {
  display: inline-block;
  margin: 0 0 0.75rem;
  padding: 4px 10px;
  border: 1px solid currentColor;
  font-family: var(--serif);
  font-size: clamp(0.6rem, 2.9vw, 0.7rem);
  font-weight: 700;
  letter-spacing: 0.2em;
  line-height: 1.5;
  text-transform: uppercase;
  white-space: nowrap;
}

.title {
  margin: 0;
  font-family: var(--serif);
  font-size: clamp(2.25rem, 9.5vw, 3rem);
  font-weight: 700;
  line-height: 0.92;
  white-space: nowrap;
}

.title em {
  display: block;
  font-style: italic;
}

.label {
  margin: 0 0 0.75rem;
  font-size: 0.68rem;
  font-weight: 900;
  letter-spacing: 0.25em;
  line-height: 1.5;
  text-transform: uppercase;
  white-space: nowrap;
}

.label::before { content: "\\2726  "; }

/* The fortune, set like the tool page's pull quote */
@keyframes glow {
  0%, 100% { text-shadow: 0 0 2px rgba(231, 255, 0, 0.45); }
  50% { text-shadow: 0 0 10px rgba(231, 255, 0, 0.45); }
}

.fortune {
  margin: 0;
  padding-left: 1.125rem;
  border-left: 5px solid currentColor;
  font-family: var(--mono);
  font-size: clamp(1.125rem, 5vw, 1.625rem);
  font-style: italic;
  font-weight: 600;
  line-height: 1.25;
  animation: glow 3.5s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .fortune { animation: none; }
}

/* Out-of-office generator panel */
.ooo-section { padding-bottom: 2.5rem; }

.panel {
  margin-right: 6px;
  border: 2px solid var(--yellow);
  background: var(--black);
  box-shadow: 6px 6px 0 var(--yellow);
  color: var(--paper);
  font-family: var(--mono);
}

.panel-head {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem 1.125rem;
  border-bottom: 1px solid #1e1e1e;
}

.panel-tag {
  color: var(--yellow);
  font-size: 0.6875rem;
  letter-spacing: 0.22em;
  line-height: 1.5;
  text-transform: uppercase;
  white-space: nowrap;
}

.panel-title {
  margin: 0;
  font-family: var(--serif);
  font-size: clamp(1rem, 4.6vw, 1.125rem);
  font-style: italic;
  font-weight: 400;
  line-height: 1.4;
  white-space: nowrap;
}

.panel-body { padding: 1rem 1.125rem 0; }

.tone-label {
  margin: 0 0 0.5rem;
  color: #8a8a8a;
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  line-height: 1.5;
  text-transform: uppercase;
}

.tones {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px;
  margin: 0 0 1rem;
}

.tone {
  position: relative;
  display: flex;
}

.tone input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: pointer;
}

/* One word per line, so labels break the same way in every font */
.tone-text {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 3rem;
  padding: 0.375rem 0.25rem;
  border: 1px solid #666;
  color: var(--white);
  font-family: var(--sans);
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1.2;
  text-align: center;
  text-transform: uppercase;
}

.tone-text span { white-space: nowrap; }

.tone input:checked + .tone-text {
  background: var(--yellow);
  border-color: var(--yellow);
  color: var(--black);
}

.tone input:focus-visible + .tone-text {
  outline: 2px solid var(--paper);
  outline-offset: 2px;
}

/* All drafts share one grid cell, so the sheet is always as tall as the longest
   one and switching tone never changes the page height or scroll position. */
.drafts {
  display: grid;
  margin: 0 0 1.125rem;
}

.draft {
  position: relative;
  grid-area: 1 / 1;
  padding: 1rem 1.125rem 1.25rem;
  background: var(--paper);
  color: var(--ink);
  visibility: hidden;
}

.draft-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.25rem 0.75rem;
  padding-bottom: 0.625rem;
  border-bottom: 1px dashed #bdbdb6;
  color: #555;
  font-size: 0.625rem;
  letter-spacing: 0.22em;
  line-height: 1.5;
  text-transform: uppercase;
}

.draft-subject {
  margin: 0.875rem 0 0;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.65;
  overflow-wrap: anywhere;
}

.draft-body {
  margin: 0.875rem 0 0;
  font-size: 0.875rem;
  line-height: 1.65;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.draft-manual {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 1rem 1.125rem;
  border: 2px solid var(--yellow);
  border-radius: 0;
  background: var(--paper);
  color: var(--ink);
  font: inherit;
  font-size: 0.875rem;
  line-height: 1.65;
  resize: none;
  -webkit-user-select: text;
  user-select: text;
}

/* Tone switching. Before JS (or without it) the checked radio picks the draft
   via :has(). Once JS runs it mirrors the choice onto data-tone, which also
   covers browsers without :has(). Browsers with neither show Polite-ish. */
.draft[data-tone="polite"] { visibility: visible; }

.panel:not([data-tone]):has(.tone input[value="unhinged"]:checked) .draft[data-tone="polite"],
.panel:not([data-tone]):has(.tone input[value="corporate"]:checked) .draft[data-tone="polite"] {
  visibility: hidden;
}

.panel:not([data-tone]):has(.tone input[value="unhinged"]:checked) .draft[data-tone="unhinged"],
.panel:not([data-tone]):has(.tone input[value="corporate"]:checked) .draft[data-tone="corporate"] {
  visibility: visible;
}

.panel[data-tone] .draft { visibility: hidden; }

.panel[data-tone="polite"] .draft[data-tone="polite"],
.panel[data-tone="unhinged"] .draft[data-tone="unhinged"],
.panel[data-tone="corporate"] .draft[data-tone="corporate"] {
  visibility: visible;
}

/* Copy bar: sticks to the bottom of the screen while the panel is in view */
.bar {
  position: sticky;
  bottom: 0;
  z-index: 1;
  margin: 0 -1.125rem;
  padding: 0.625rem 1.125rem max(0.75rem, env(safe-area-inset-bottom));
  border-top: 1px solid #1e1e1e;
  background: var(--black);
}

.copy-status {
  margin: 0 0 0.625rem;
  color: var(--paper);
  font-size: 0.8125rem;
  line-height: 1.5;
}

.copy-status:empty { margin: 0; }

.copy {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 3.25rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--yellow);
  border-radius: 0;
  background: var(--yellow);
  color: var(--black);
  font-family: var(--sans);
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  line-height: 1.25;
  text-transform: uppercase;
  white-space: nowrap;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.copy:active {
  background: #1a1a1a;
  border-color: #1a1a1a;
  color: var(--paper);
}

.copy:focus-visible {
  outline: 2px solid var(--paper);
  outline-offset: 3px;
}

.nojs-hint {
  margin: 0;
  color: var(--white);
  font-size: 0.8125rem;
  line-height: 1.5;
}

/* Footers, as on the tool pages */
.tool-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 2.5rem var(--gutter-right) 2.5rem var(--gutter-left);
}

.footer-logo {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 900;
}

.footer-logo em { font-style: italic; }

.footer-note {
  margin: 0.375rem 0 0;
  font-size: 0.8rem;
  opacity: 0.55;
}

.stripe-link {
  position: relative;
  border-bottom: 2px solid currentColor;
  color: inherit;
  font-weight: 700;
  text-decoration: none;
}

.site-footer {
  padding: 2rem var(--gutter-right) max(2rem, env(safe-area-inset-bottom)) var(--gutter-left);
  background: var(--blue);
  color: var(--white);
  text-align: center;
}

.site-footer p {
  margin: 0;
  font-size: 0.8rem;
}

.site-footer p + p { margin-top: 2.25rem; }

.site-footer .home-return { font-size: 0.9rem; }

.site-footer a {
  position: relative;
  color: var(--white);
}

.site-footer .home-return a { font-weight: 700; }

/* Invisible padding so footer links are 48px tap targets without moving
   their underlines. */
.stripe-link::after,
.site-footer a::after {
  content: "";
  position: absolute;
  inset: -1.125rem -0.5rem;
}
`;
