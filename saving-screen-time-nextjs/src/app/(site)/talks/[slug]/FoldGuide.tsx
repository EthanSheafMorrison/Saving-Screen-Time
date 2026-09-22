import type { Fold, FoldCrease, FoldPanel } from "../../../../lib/folds";
import { insideCreases, printSettings } from "../../../../lib/folds";
import FoldDetails from "./FoldDetails";

// "How to print and fold" guide for a folded brochure: print settings, a flat
// crease diagram of each face, the fold steps, and the order it opens in.
// Diagrams are HTML rather than SVG so their labels stay readable on phones.

function pct(x: number, of: number) {
  return `${(x / of) * 100}%`;
}

function FoldFace({
  fold,
  title,
  panels,
  creases,
}: {
  fold: Fold;
  title: string;
  panels: FoldPanel[];
  creases: FoldCrease[];
}) {
  const { w, h } = fold.sheet;
  return (
    <figure className="fold-face">
      <figcaption className="fold-face-label">{title}</figcaption>
      <div className="fold-sheet" style={{ aspectRatio: `${w} / ${h}` }}>
        {creases.map((c) => (
          <span
            key={c.x}
            className={`fold-crease fold-crease--${c.dir}`}
            style={{ left: pct(c.x, w) }}
            aria-hidden="true"
          >
            <span className="fold-crease-step">{c.step}</span>
            <span className="fold-crease-mm">{c.x}</span>
          </span>
        ))}
        {panels.map((p) => (
          <span key={p.tag} className="fold-panel" style={{ left: pct(p.x, w), width: pct(p.w, w) }}>
            <span className="fold-panel-label">
              <span className="fold-panel-tag">{p.tag}</span>
              <span className="fold-panel-role">{p.role}</span>
            </span>
          </span>
        ))}
      </div>
      <p className="fold-face-creases">
        {creases.map((c, i) => (
          <span key={c.x}>
            {i > 0 && " · "}
            <span className="fold-face-crease">
              {c.x} mm {c.dir} (fold {c.step})
            </span>
          </span>
        ))}
      </p>
    </figure>
  );
}

export default function FoldGuide({ fold, titles }: { fold: Fold; titles: string[] }) {
  const panels = [...fold.outside.panels, ...fold.inside.panels];
  const panelWidth = (tag: string) => panels.find((p) => p.tag === tag)?.w ?? 1;

  return (
    <FoldDetails
      id={`fold-${fold.id}`}
      summary={
        <>
          <h3 className="fold-guide-title">{titles.join(" and ")}</h3>
          <span className="fold-guide-kind">
            {fold.label} · closes to {fold.closed.w} × {fold.closed.h} mm
          </span>
          <span className="fold-summary-cue" aria-hidden="true" />
        </>
      }
    >
      <h4 className="fold-guide-heading">Print settings</h4>
      <ul className="fold-print">
        {printSettings(fold).map((setting) => (
          <li key={setting}>{setting}</li>
        ))}
      </ul>

      <h4 className="fold-guide-heading">Creases</h4>
      <div className="fold-faces">
        <FoldFace
          fold={fold}
          title="Inside · lay this face up to start"
          panels={fold.inside.panels}
          creases={insideCreases(fold)}
        />
        <FoldFace fold={fold} title="Outside" panels={fold.outside.panels} creases={fold.outside.creases} />
      </div>
      <ul className="fold-legend">
        <li>
          <span className="fold-legend-line fold-legend-line--valley" aria-hidden="true" />
          Valley: fold towards you
        </li>
        <li>
          <span className="fold-legend-line fold-legend-line--mountain" aria-hidden="true" />
          Mountain: fold away from you
        </li>
        <li>
          <span className="fold-legend-step" aria-hidden="true">1</span>
          Fold order
        </li>
      </ul>

      <h4 className="fold-guide-heading">Fold it</h4>
      <ol className="fold-steps">
        {fold.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <h4 className="fold-guide-heading">Check it opens in this order</h4>
      <ol className="fold-states">
        {fold.states.map((state) => (
          <li key={state.label}>
            <div
              className="fold-state"
              style={{ width: pct(state.w, fold.sheet.w), aspectRatio: `${state.w} / ${fold.sheet.h}` }}
              aria-hidden="true"
            >
              {state.shows.map((tag) => (
                <span key={tag} className="fold-state-panel" style={{ flexGrow: panelWidth(tag) }}>
                  {tag}
                </span>
              ))}
            </div>
            <p className="fold-state-caption">
              <strong>{state.label}</strong> {state.note}
            </p>
          </li>
        ))}
      </ol>
    </FoldDetails>
  );
}
