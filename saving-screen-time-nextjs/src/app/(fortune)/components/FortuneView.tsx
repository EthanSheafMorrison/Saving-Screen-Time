import {
  OOO_SUBJECTS,
  OOO_TEMPLATES,
  TONE_LABELS,
  type Fortune,
  type OOOTone,
} from "../../../lib/fortune/data";
import OOOBuilder, { type Draft } from "./OOOBuilder";
import TrackSource from "./TrackSource";

// The fortune, then the out-of-office generator already filled in, framed like
// the site's tool pages. Everything a visitor reads is in the server-rendered
// HTML; JS only adds copying and analytics.
export default function FortuneView({ fortune }: { fortune: Fortune }) {
  const drafts: Draft[] = (Object.keys(TONE_LABELS) as OOOTone[]).map((tone) => ({
    tone,
    label: TONE_LABELS[tone],
    subject: OOO_SUBJECTS[tone],
    body: OOO_TEMPLATES[tone](fortune.text),
  }));

  return (
    <>
      <header className="site-nav">
        <a href="/" className="home-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Saving Screen Time
        </a>
      </header>

      <main>
        <section className="section intro">
          <div className="section-inner">
            <p className="tag">✦ Tool — Screen Time Fortune</p>
            <h1 className="title">
              Screen Time <em>Fortune</em>
            </h1>
          </div>
        </section>

        <section className="section" aria-labelledby="fortune-label">
          <div className="section-inner">
            <p className="label" id="fortune-label">
              {fortune.category}
            </p>
            <p className="fortune">{fortune.text}</p>
          </div>
        </section>

        <section className="section ooo-section">
          <div className="section-inner">
            <OOOBuilder drafts={drafts} />
          </div>
        </section>

        <footer className="tool-footer">
          <div>
            <p className="footer-logo">
              Saving Screen <em>Time</em>
            </p>
            <p className="footer-note">A Marsden Fast Start Research Project — Victoria University of Wellington</p>
          </div>
          <a href="/tools" className="stripe-link">
            ← All Tools
          </a>
        </footer>
      </main>

      <footer className="site-footer">
        <p className="home-return">
          <a href="/">Return to Home</a>
        </p>
        <p>
          Design by{" "}
          <a href="https://ethansheaf.com" target="_blank" rel="noopener noreferrer">
            Ethan Sheaf
          </a>
        </p>
      </footer>

      <TrackSource page="fortune" />
    </>
  );
}
