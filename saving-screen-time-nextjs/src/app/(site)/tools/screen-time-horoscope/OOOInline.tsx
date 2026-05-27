'use client';

import { useRef, useState } from 'react';
import { ZODIAC_SIGNS, rollOOO, type ZodiacId, type OOOTone } from './horoscope-data';

const TONE_OPTIONS: { value: OOOTone; label: string }[] = [
  { value: 'polite',    label: 'Polite-ish' },
  { value: 'unhinged',  label: 'Fully Unhinged' },
  { value: 'corporate', label: 'Corporate Parody' },
];

const colors = {
  black: '#050505',
  yellow: '#E7FF00',
  paper: '#f5f5f0',
};

const fonts = {
  serif: '"EB Garamond", serif',
  sans: '"DM Sans", sans-serif',
  mono: '"IBM Plex Mono", monospace',
};

const SCREEN_TIME_OPTIONS = [
  { value: '<2h',  label: '< 2 hrs',   desc: 'Practically a monk' },
  { value: '2-4h', label: '2 – 4 hrs', desc: 'Comfortably mortal' },
  { value: '4-6h', label: '4 – 6 hrs', desc: 'Committed' },
  { value: '6h+',  label: '6 hrs +',   desc: 'One with the screen' },
];

type Sign = typeof ZODIAC_SIGNS[number];

export default function OOOInline() {
  const [sign, setSign] = useState<Sign | null>(null);
  const [screenTime, setScreenTime] = useState<string | null>(null);
  const [oooText, setOooText] = useState('');
  const [printing, setPrinting] = useState(false);
  const [printed, setPrinted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tone, setTone] = useState<OOOTone>('polite');
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const canGenerate = !!sign && !!screenTime;

  const handleGenerate = () => {
    if (!sign) return;
    setOooText(rollOOO(sign.id as ZodiacId, screenTime, tone));
    setPrinted(false);
    setPrinting(true);
  };

  const handleRegenerate = () => {
    if (!sign) return;
    setOooText(rollOOO(sign.id as ZodiacId, screenTime, tone));
  };

  const handleToneChange = (next: OOOTone) => {
    if (next === tone) return;
    setTone(next);
    if (sign && (printed || printing)) {
      setOooText(rollOOO(sign.id as ZodiacId, screenTime, next));
    }
  };

  const handleCopy = async () => {
    if (!oooText) return;
    try {
      await navigator.clipboard.writeText(oooText);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = oooText;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch { /* ignore */ }
      document.body.removeChild(ta);
    }
    setCopied(true);
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => setCopied(false), 1600);
  };

  const reset = () => {
    setSign(null);
    setScreenTime(null);
    setOooText('');
    setPrinting(false);
    setPrinted(false);
    setCopied(false);
    setTone('polite');
  };

  return (
    <div style={st.wrap} className="ooo-inline">
      <style>{CSS}</style>

      <div style={st.header}>
        <span style={st.headerTag}>★ OOO GENERATOR</span>
        <span style={st.headerSub}>An auto-reply, written in the stars</span>
      </div>

      <div style={st.body}>
        <div style={st.step}>
          <div style={st.stepLabel}>
            <span style={st.stepNum}>01</span>
            <span>Choose your sign</span>
          </div>
          <div style={st.signGrid} className="ooo-sign-grid">
            {ZODIAC_SIGNS.map((s) => {
              const active = sign?.id === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSign(s)}
                  className={`ooo-sign-btn${active ? ' ooo-active' : ''}`}
                  style={st.signBtn}
                  aria-pressed={active}
                >
                  <span style={st.signSymbol}>{s.symbol}</span>
                  <span style={st.signName}>{s.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div style={st.step}>
          <div style={st.stepLabel}>
            <span style={st.stepNum}>02</span>
            <span>Your daily screen time</span>
          </div>
          <div style={st.stGrid} className="ooo-st-grid">
            {SCREEN_TIME_OPTIONS.map((opt) => {
              const active = screenTime === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setScreenTime(opt.value)}
                  className={`ooo-st-btn${active ? ' ooo-active' : ''}`}
                  style={st.stBtn}
                  aria-pressed={active}
                >
                  <span style={st.stValue}>{opt.label}</span>
                  <span style={st.stDesc}>{opt.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div style={st.actionRow}>
          <button
            onClick={handleGenerate}
            disabled={!canGenerate}
            style={{
              ...st.generateBtn,
              opacity: canGenerate ? 1 : 0.4,
              cursor: canGenerate ? 'pointer' : 'not-allowed',
            }}
          >
            {oooText ? '↻ Generate again' : 'Print your out-of-office →'}
          </button>
          {oooText && (
            <button onClick={reset} style={st.resetBtn}>
              ← Start over
            </button>
          )}
        </div>

        {(printing || printed) && oooText && sign && (
          <div style={st.toneRow}>
            <span style={st.toneLabel}>TONE</span>
            <div style={st.toneBtnGrid} className="ooo-tone-grid">
              {TONE_OPTIONS.map((opt) => {
                const active = tone === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleToneChange(opt.value)}
                    className={`ooo-tone-btn${active ? ' ooo-active' : ''}`}
                    style={st.toneBtn}
                    aria-pressed={active}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {(printing || printed) && oooText && sign && (
          <div style={st.receiptWrap}>
            <div
              style={st.receipt}
              className={printing ? 'ooo-inline-printing' : 'ooo-inline-resting'}
              onAnimationEnd={(e) => {
                if (e.animationName === 'oooPrintOut') {
                  setPrinting(false);
                  setPrinted(true);
                }
              }}
            >
              <div style={st.receiptJagTop} aria-hidden />
              <div style={st.receiptInner}>
                <div style={st.receiptHeader}>
                  <span>OUT-OF-OFFICE</span>
                  <span>★ {sign.name.toUpperCase()}</span>
                </div>
                <pre style={st.receiptText} key={oooText}>{oooText}</pre>
                <div style={st.receiptFooter}>
                  <button
                    onClick={handleRegenerate}
                    style={st.receiptRegenBtn}
                    disabled={!printed}
                    aria-label="Regenerate"
                  >
                    ↻ regenerate
                  </button>
                  <button
                    onClick={handleCopy}
                    style={st.receiptCopyBtn}
                    disabled={!printed}
                    aria-label="Copy to clipboard"
                  >
                    {copied ? '✓ copied' : 'copy to clipboard'}
                  </button>
                </div>
              </div>
              <div style={st.receiptJagBottom} aria-hidden />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const st: Record<string, React.CSSProperties> = {
  wrap: {
    width: '100%',
    maxWidth: 760,
    margin: '32px auto 0',
    background: colors.black,
    border: `2px solid ${colors.yellow}`,
    boxShadow: `6px 6px 0 ${colors.yellow}`,
    color: colors.paper,
    fontFamily: fonts.mono,
  },

  header: {
    padding: '18px 24px',
    borderBottom: `1px solid #1e1e1e`,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },

  headerTag: {
    fontFamily: fonts.mono,
    fontSize: 11,
    letterSpacing: '0.22em',
    color: colors.yellow,
  },

  headerSub: {
    fontFamily: fonts.serif,
    fontStyle: 'italic',
    fontSize: 18,
    color: colors.paper,
  },

  body: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },

  step: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },

  stepLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontFamily: fonts.sans,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#cfccd3',
  },

  stepNum: {
    fontFamily: fonts.mono,
    fontSize: 10,
    padding: '3px 7px',
    border: `1px solid ${colors.yellow}`,
    color: colors.yellow,
    letterSpacing: '0.1em',
  },

  signGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: 6,
  },

  signBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    padding: '12px 4px',
    background: 'transparent',
    border: `1px solid #1e1e1e`,
    borderRadius: 0,
    cursor: 'pointer',
    fontFamily: fonts.mono,
    transition: 'background 0.12s, border-color 0.12s, color 0.12s',
  },

  signSymbol: {
    fontSize: 20,
    lineHeight: 1,
    color: colors.yellow,
  },

  signName: {
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: '0.08em',
    color: '#cfccd3',
    fontFamily: fonts.sans,
    textTransform: 'uppercase',
  },

  stGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 8,
  },

  stBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    padding: '16px 8px',
    background: 'transparent',
    border: `1px solid #1e1e1e`,
    borderRadius: 0,
    cursor: 'pointer',
    fontFamily: fonts.mono,
    transition: 'background 0.12s, border-color 0.12s, color 0.12s',
  },

  stValue: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.yellow,
    fontFamily: fonts.serif,
  },

  stDesc: {
    fontSize: 9,
    color: '#7a7a7a',
    fontFamily: fonts.mono,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  actionRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    flexWrap: 'wrap',
  },

  generateBtn: {
    padding: '14px 22px',
    background: colors.yellow,
    color: colors.black,
    border: `1px solid ${colors.yellow}`,
    borderRadius: 0,
    fontSize: 12,
    fontWeight: 700,
    fontFamily: fonts.sans,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    transition: 'background 0.12s',
  },

  resetBtn: {
    background: 'transparent',
    border: `1px solid #2a2a2a`,
    borderRadius: 0,
    padding: '12px 14px',
    fontSize: 11,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: fonts.sans,
    color: '#7a7a7a',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  },

  toneRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    borderTop: `1px solid #1e1e1e`,
    paddingTop: 16,
    marginTop: 4,
  },

  toneLabel: {
    fontSize: 8,
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: '#6e6e6e',
    fontFamily: fonts.mono,
    textTransform: 'uppercase',
  },

  toneBtnGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 6,
    width: '100%',
  },

  toneBtn: {
    padding: '10px 8px',
    background: 'transparent',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#1e1e1e',
    borderRadius: 0,
    cursor: 'pointer',
    fontFamily: fonts.sans,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#cfccd3',
    transition: 'background 0.12s, border-color 0.12s, color 0.12s',
    whiteSpace: 'nowrap',
  },

  receiptWrap: {
    overflow: 'hidden',
    marginTop: 4,
  },

  receipt: {
    position: 'relative',
    transformOrigin: 'top center',
    background: colors.paper,
    color: '#1a1a1a',
    boxShadow: '0 22px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,0,0,0.15)',
  },

  receiptJagTop: {
    height: 10,
    background:
      'linear-gradient(135deg, #f5f5f0 25%, transparent 25%) 0 0/10px 10px, ' +
      'linear-gradient(225deg, #f5f5f0 25%, transparent 25%) 0 0/10px 10px',
    backgroundColor: 'transparent',
    marginTop: -10,
  },

  receiptJagBottom: {
    height: 10,
    background:
      'linear-gradient(45deg, #f5f5f0 25%, transparent 25%) 0 0/10px 10px, ' +
      'linear-gradient(315deg, #f5f5f0 25%, transparent 25%) 0 0/10px 10px',
    backgroundColor: 'transparent',
  },

  receiptInner: {
    padding: '20px 24px 22px',
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },

  receiptHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    fontFamily: fonts.mono,
    fontSize: 9,
    letterSpacing: '0.22em',
    color: '#555',
    borderBottom: '1px dashed #bdbdb6',
    paddingBottom: 10,
  },

  receiptText: {
    margin: 0,
    fontFamily: fonts.mono,
    fontSize: 12.5,
    lineHeight: 1.65,
    color: '#1a1a1a',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    animation: 'oooPaperFadeIn 0.3s ease',
  },

  receiptFooter: {
    marginTop: 4,
    paddingTop: 12,
    borderTop: '1px dashed #bdbdb6',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },

  receiptRegenBtn: {
    background: 'transparent',
    border: 'none',
    padding: '4px 6px',
    fontFamily: fonts.mono,
    fontSize: 11,
    color: '#555',
    cursor: 'pointer',
    letterSpacing: '0.04em',
    textDecoration: 'underline',
    textUnderlineOffset: 3,
  },

  receiptCopyBtn: {
    background: colors.yellow,
    color: colors.black,
    border: `1px solid ${colors.yellow}`,
    padding: '8px 14px',
    fontFamily: fonts.sans,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
};

const CSS = `
  @keyframes oooPrintOut {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(0); }
  }
  @keyframes oooPaperFadeIn {
    from { opacity: 0; transform: translateY(-3px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ooo-inline-printing {
    animation: oooPrintOut 1.4s cubic-bezier(0.16, 0.84, 0.44, 1) both;
    will-change: transform;
  }
  .ooo-inline-resting { transform: translateY(0); }

  .ooo-sign-btn:hover, .ooo-st-btn:hover, .ooo-tone-btn:hover {
    border-color: ${colors.yellow} !important;
    background: rgba(231,255,0,0.06) !important;
  }
  .ooo-sign-btn.ooo-active, .ooo-st-btn.ooo-active, .ooo-tone-btn.ooo-active {
    border-color: ${colors.yellow} !important;
    background: ${colors.yellow} !important;
    color: ${colors.black} !important;
  }
  .ooo-sign-btn.ooo-active span, .ooo-st-btn.ooo-active span {
    color: ${colors.black} !important;
  }

  .ooo-inline button:not(.ooo-sign-btn):not(.ooo-st-btn):not(.ooo-tone-btn):hover:not(:disabled) {
    background: #1a1a1a !important;
    color: ${colors.paper} !important;
    border-color: #1a1a1a !important;
  }
  .ooo-inline button:disabled { cursor: not-allowed; }

  @media (max-width: 640px) {
    .ooo-sign-grid { grid-template-columns: repeat(3, 1fr) !important; }
    .ooo-st-grid   { grid-template-columns: repeat(2, 1fr) !important; }
    .ooo-tone-grid { grid-template-columns: 1fr 1fr !important; }
    .ooo-tone-btn {
      padding: 12px 6px !important;
      min-height: 44px !important;
      white-space: normal !important;
      font-size: 11px !important;
      line-height: 1.2 !important;
    }
    .ooo-tone-btn:last-of-type { grid-column: 1 / -1 !important; }
  }
`;
