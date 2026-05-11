'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ZODIAC_SIGNS,
  SIGN_HOROSCOPES,
  VERDICTS,
  SCREEN_TIME_CONTEXT,
  type ZodiacId,
} from './horoscope-data';

const colors = {
  black: '#050505',
  yellow: '#E7FF00',
  white: '#f5f5f0',
};

const fonts = {
  serif: '"EB Garamond", serif',
  sans: '"DM Sans", sans-serif',
  mono: '"IBM Plex Mono", monospace',
};

const THINKING_LINES = [
  "Consulting the celestial archive of screen time data…",
  "Cross-referencing your star chart with notification history…",
  "The planets are reviewing your app usage. Interesting.",
  "Mercury retrograde is not responsible for your screen time.",
  "Calculating cosmic justification levels…",
  "The stars have seen your algorithm. They are not judging.",
  "Aligning your birth chart with your unlock frequency…",
  "Checking whether Jupiter is responsible for your tab count…",
  "Weighing screen time against the broader arc of the cosmos…",
  "Running the numbers. The numbers are a reflection of you.",
];

const SCREEN_TIME_OPTIONS = [
  { value: '<2h',  label: '< 2 hrs',   desc: 'Practically a monk' },
  { value: '2-4h', label: '2 – 4 hrs', desc: 'Comfortably mortal' },
  { value: '4-6h', label: '4 – 6 hrs', desc: 'Committed' },
  { value: '6h+',  label: '6 hrs +',   desc: 'One with the screen' },
];

// Toggle between old ASCII bot and new pixel art bot
const USE_PIXEL_BOT = false;

const FT_STARS = `      *    .    *    .    *    .         *    .
   .    *              *    .      *         .`;

const FT_BOX_TOP = `        +-----------+
        |           |`;

const FT_EYES = `        |  (o)   (o) |`;

const FT_MID = `        |    ---    |
        +-----------+
               |
        +-------------+`;

const FT_PANEL = `        |.............|
        |.............|
        +-------------+`;

const FT_LABEL = `
     ● FORTUNE-BOT  v0.1`;

// Bot pixel grid
const BY = '#E7FF00'; // body yellow
const BS = '#0d0e00'; // screen dark bg
const BM = '#050505'; // mouth / static black
const BE = 'EYE';    // animated eye pixel (black, blinks)
const BD = 'DOT';    // animated panel dot (yellow, glows)

const botGrid: (string | null)[][] = [
  [null,null,null,null,null,BY, BY, null,null,null,null,null], // antenna
  [null,null,BY,  BY,  BY,  BY, BY, BY,  BY,  BY,  null,null], // head top
  [null,BY,  BY,  BY,  BY,  BY, BY, BY,  BY,  BY,  BY,  null],
  [BY,  BY,  BY,  BY,  BY,  BY, BY, BY,  BY,  BY,  BY,  BY  ],
  [BY,  BY,  BY,  BE,  BE,  BY, BY, BE,  BE,  BY,  BY,  BY  ], // eyes
  [BY,  BY,  BY,  BE,  BE,  BY, BY, BE,  BE,  BY,  BY,  BY  ],
  [BY,  BY,  BY,  BY,  BY,  BY, BY, BY,  BY,  BY,  BY,  BY  ],
  [BY,  BY,  BY,  BY,  BM,  BM, BM, BM,  BY,  BY,  BY,  BY  ], // mouth
  [null,BY,  BY,  BY,  BY,  BY, BY, BY,  BY,  BY,  BY,  null],
  [null,null,BY,  BY,  BY,  BY, BY, BY,  BY,  BY,  null,null], // head bottom
  [null,null,null,null,BY,  BY, BY, BY,  null,null,null,null], // neck
  [null,null,null,null,BY,  BY, BY, BY,  null,null,null,null],
  [null,null,BY,  BY,  BY,  BY, BY, BY,  BY,  BY,  null,null], // body
  [null,BY,  BY,  BY,  BY,  BY, BY, BY,  BY,  BY,  BY,  null],
  [BY,  BY,  BY,  BS,  BS,  BS, BS, BS,  BS,  BY,  BY,  BY  ], // screen frame
  [BY,  BY,  BY,  BS,  BD,  BD, BS, BD,  BD,  BY,  BY,  BY  ], // dots row 1
  [BY,  BY,  BY,  BS,  BD,  BD, BS, BD,  BD,  BY,  BY,  BY  ],
  [BY,  BY,  BY,  BS,  BS,  BS, BS, BS,  BS,  BY,  BY,  BY  ],
  [BY,  BY,  BY,  BS,  BD,  BD, BS, BD,  BD,  BY,  BY,  BY  ], // dots row 2
  [BY,  BY,  BY,  BS,  BD,  BD, BS, BD,  BD,  BY,  BY,  BY  ],
  [BY,  BY,  BY,  BS,  BS,  BS, BS, BS,  BS,  BY,  BY,  BY  ], // screen frame
  [null,BY,  BY,  BY,  BY,  BY, BY, BY,  BY,  BY,  BY,  null],
  [null,null,BY,  BY,  BY,  BY, BY, BY,  BY,  BY,  null,null], // body bottom
];

function BotSprite() {
  const W = 12;
  const H = botGrid.length;
  const PX = 8;
  return (
    <div style={{ animation: 'hFloat 3.5s ease-in-out infinite', display: 'inline-block', userSelect: 'none' }}>
      <svg
        width={W * PX}
        height={H * PX}
        viewBox={`0 0 ${W} ${H}`}
        shapeRendering="crispEdges"
        style={{ imageRendering: 'pixelated', display: 'block' }}
        aria-hidden
      >
        {botGrid.flatMap((row, y) =>
          row.map((cell, x) => {
            if (!cell) return null;
            if (cell === BE) {
              return <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={BM} className="bot-eye" />;
            }
            if (cell === BD) {
              const delay = (Math.floor(x / 3) % 2) * 0.6 + (Math.floor(y / 3) % 2) * 0.3;
              return <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={BY} className="bot-dot" style={{ animationDelay: `${delay}s` }} />;
            }
            return <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={cell} />;
          })
        )}
      </svg>
      <div style={{ marginTop: 8, fontSize: 9, fontFamily: fonts.mono, color: BY, letterSpacing: '0.12em', opacity: 0.7 }}>
        ● FORTUNE-BOT  v0.1
      </div>
    </div>
  );
}

function WaveText({ text, style }: { text: string; style?: React.CSSProperties }) {
  return (
    <p style={{ ...st.cardText, ...style }}>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            animation: `hWave 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 18}ms both`,
            whiteSpace: ch === ' ' ? 'pre' : 'normal',
          }}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </p>
  );
}

type Phase = 'idle' | 'q2' | 'reading' | 'revealed';

interface ZodiacSign {
  id: ZodiacId;
  name: string;
  symbol: string;
  dates: string;
}

function HoroscopeTerminal({ onClose, closing }: { onClose: () => void; closing: boolean }) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);
  const [screenTime, setScreenTime] = useState<string | null>(null);
  const [speechText, setSpeechText] = useState('');
  const [speechDone, setSpeechDone] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [showWave, setShowWave] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const cancelRef = useRef(false);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rightPanelRef.current) {
      rightPanelRef.current.scrollTo({ top: rightPanelRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [displayText, phase, showWave]);

  useEffect(() => {
    if (phase !== 'idle') return;
    cancelRef.current = false;
    setSpeechDone(false);
    setSpeechText('');
    let cancelled = false;
    const q1 = "Seeker… what sign guides your destiny?";
    (async () => {
      await new Promise(r => setTimeout(r, 400));
      for (let i = 0; i <= q1.length; i++) {
        if (cancelled || cancelRef.current) return;
        setSpeechText(q1.slice(0, i));
        await new Promise(r => setTimeout(r, 22 + Math.random() * 18));
      }
      if (!cancelled) setSpeechDone(true);
    })();
    return () => { cancelled = true; };
  }, [phase]);

  const wait = (ms: number) =>
    new Promise<void>((res) => {
      const id = setTimeout(res, ms);
      const check = setInterval(() => {
        if (cancelRef.current) { clearTimeout(id); clearInterval(check); res(); }
      }, 50);
    });

  const typeOut = async (text: string, speed = 22) => {
    for (let i = 0; i <= text.length; i++) {
      if (cancelRef.current) return;
      setDisplayText(text.slice(0, i));
      await wait(speed + Math.random() * 18);
    }
  };

  const eraseText = async (text: string, speed = 10) => {
    for (let i = text.length; i >= 0; i--) {
      if (cancelRef.current) return;
      setDisplayText(text.slice(0, i));
      await wait(speed + Math.random() * 6);
    }
  };

  const typeSpeech = async (text: string) => {
    setSpeechDone(false);
    setSpeechText('');
    for (let i = 0; i <= text.length; i++) {
      if (cancelRef.current) return;
      setSpeechText(text.slice(0, i));
      await new Promise(r => setTimeout(r, 20 + Math.random() * 18));
    }
    setSpeechDone(true);
  };

  const selectSign = useCallback(async (sign: ZodiacSign) => {
    if (phase === 'reading') return;
    cancelRef.current = false;
    setSelectedSign(sign);
    setPhase('reading');
    setDisplayText('');
    setIsThinking(true);
    setShowCursor(true);
    setShowWave(false);

    const lines = [...THINKING_LINES].sort(() => Math.random() - 0.5).slice(0, 2 + Math.floor(Math.random() * 2));

    for (const line of lines) {
      if (cancelRef.current) break;
      await typeOut(line);
      await wait(350 + Math.random() * 350);
      await eraseText(line);
      await wait(120);
    }

    if (cancelRef.current) return;

    setIsThinking(false);
    const horoscope = SIGN_HOROSCOPES[sign.id];
    await typeOut(horoscope, 18);

    if (cancelRef.current) return;

    await wait(300);
    setShowCursor(false);
    setDisplayText(horoscope);
    setShowWave(true);

    await wait(horoscope.length * 18 + 900);
    setPhase('revealed');
    setShowWave(false);

    await typeSpeech("Wish to replace your screen time report with the stars? Sign up for weekly horoscopes.");
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSignSelect = useCallback(async (sign: ZodiacSign) => {
    cancelRef.current = true;
    await new Promise(r => setTimeout(r, 60));
    cancelRef.current = false;
    setSelectedSign(sign);
    setPhase('q2');
    await typeSpeech("Now tell me… how long do the screens consume your days?");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleScreenTimeSelect = useCallback((value: string) => {
    setScreenTime(value);
    selectSign(selectedSign!);
  }, [selectedSign, selectSign]);

  const reset = () => {
    cancelRef.current = true;
    setPhase('idle');
    setSelectedSign(null);
    setScreenTime(null);
    setSpeechText('');
    setSpeechDone(false);
    setDisplayText('');
    setShowWave(false);
    setIsThinking(false);
    setShowCursor(false);
    setEmail('');
    setSubscribed(false);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setSpeechText("✦ Your cosmic inbox is ready. Almost.");
      setSpeechDone(true);
    }
  };

  return (
    <div style={{
      ...st.terminalWrap,
      animation: closing
        ? 'hTermOut 0.26s ease forwards'
        : 'hTermIn 0.48s cubic-bezier(0.22,1,0.36,1) both',
    }}>
      <style>{CSS}</style>

      <button onClick={onClose} style={st.closeBtn} aria-label="Close">✕</button>

      <div
        style={{ ...st.terminal, position: 'relative' }}
        className={`void-layout${!closing ? ' hterm-opening' : ''}`}
      >

        <pre style={st.starsRow}>
          <span style={st.ftFigure}>{FT_STARS}</span>
        </pre>

        <div style={st.mainRow}>

          <div style={st.leftPanel} className="void-left">
            {USE_PIXEL_BOT ? (
              <BotSprite />
            ) : (
              <pre style={st.ftAscii}>
                <span style={st.ftFigure}>{FT_BOX_TOP}{'\n'}</span>
                <span style={st.ftEyes}>{FT_EYES}{'\n'}</span>
                <span style={st.ftFigure}>{FT_MID}{'\n'}</span>
                <span style={st.ftPanel}>{FT_PANEL}</span>
                <span style={st.ftLabel}>{FT_LABEL}</span>
              </pre>
            )}
          </div>

          <div style={st.rightPanel} className="void-right" ref={rightPanelRef}>

            <div style={st.ftSpeech}>
              <span style={st.ftSpeechText}>
                {speechText}
                {!speechDone && <span style={st.cursor}>▊</span>}
              </span>
            </div>

            <div style={st.rightContent}>

              {phase === 'idle' && speechDone && (
                <div style={st.grid}>
                  {ZODIAC_SIGNS.map((sign, i) => (
                    <button
                      key={sign.id}
                      onClick={() => handleSignSelect(sign as ZodiacSign)}
                      style={{ ...st.signBtn, animation: `hStaggerIn 0.35s ease ${i * 55}ms both` }}
                    >
                      <span style={st.signSymbol}>{sign.symbol}</span>
                      <span style={st.signName}>{sign.name}</span>
                      <span style={st.signDates}>{sign.dates}</span>
                    </button>
                  ))}
                </div>
              )}

              {phase === 'q2' && speechDone && (
                <div style={st.stGrid}>
                  {SCREEN_TIME_OPTIONS.map((opt, i) => (
                    <button
                      key={opt.value}
                      className="ft-st-btn"
                      onClick={() => handleScreenTimeSelect(opt.value)}
                      style={{ ...st.stBtn, animation: `hStaggerIn 0.35s ease ${i * 80}ms both` }}
                    >
                      <span style={st.stValue}>{opt.label}</span>
                      <span style={st.stDesc}>{opt.desc}</span>
                    </button>
                  ))}
                </div>
              )}

              {phase !== 'idle' && phase !== 'q2' && selectedSign && (
                <div style={st.reading}>

                  <div style={st.signBanner}>
                    <span style={st.bannerSymbol}>{selectedSign.symbol}</span>
                    <div style={st.bannerName}>{selectedSign.name}</div>
                  </div>

                  <div style={st.card}>
                    {isThinking && (
                      <div style={st.thinkRow}>
                        <span style={st.spinner} />
                        <span style={st.thinkTxt}>The stars are consulting your data</span>
                      </div>
                    )}

                    {!showWave && phase !== 'revealed' && (
                      <p style={{ ...st.cardText, color: '#6a6060' }}>
                        {displayText}
                        {showCursor && <span style={st.cursor}>▊</span>}
                      </p>
                    )}

                    {showWave && (
                      <WaveText text={displayText} />
                    )}

                    {phase === 'revealed' && (
                      <>
                        <p style={st.cardText}>{SIGN_HOROSCOPES[selectedSign.id]}</p>

                        {screenTime && (
                          <div style={st.screenTimeCtx}>
                            <span style={st.screenTimeCtxLabel}>YOUR DAILY SCREEN TIME</span>
                            <span style={st.screenTimeCtxVal}>
                              {SCREEN_TIME_OPTIONS.find(o => o.value === screenTime)?.label}
                            </span>
                            <p style={st.screenTimeCtxText}>{SCREEN_TIME_CONTEXT[screenTime]}</p>
                          </div>
                        )}

                        <div style={st.verdict}>
                          <span style={st.verdictLabel}>SCREEN TIME VERDICT</span>
                          <span style={st.verdictValue}>{VERDICTS[selectedSign.id]}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {phase === 'revealed' && (
                    <div style={st.sub}>
                      <p style={st.subFine}>Weekly horoscopes · No data harvesting · Just vibes</p>
                      {subscribed ? (
                        <div style={st.subConfirm}>
                          ✦ Your cosmic inbox is ready. Almost.
                        </div>
                      ) : (
                        <form onSubmit={handleSubscribe} style={st.subForm}>
                          <input
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={st.subInput}
                            required
                          />
                          <button type="submit" style={st.subBtn}>Subscribe</button>
                        </form>
                      )}
                    </div>
                  )}

                  {phase === 'revealed' && (
                    <button onClick={reset} style={st.resetBtn}>
                      ← Consult the Oracle again
                    </button>
                  )}
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

interface HoroscopeModalProps {
  open: boolean;
  onClose: () => void;
}

export default function HoroscopeModal({ open, onClose }: HoroscopeModalProps) {
  const [closing, setClosing] = useState(false);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 280);
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, handleClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      style={{
        ...st.overlay,
        animation: closing
          ? 'hOverlayOut 0.28s ease forwards'
          : 'hOverlayIn 0.32s ease both',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <HoroscopeTerminal onClose={handleClose} closing={closing} />
    </div>
  );
}

const st: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    background: 'rgba(5,5,5,0.92)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  terminalWrap: {
    position: 'relative',
    width: '100%',
    maxWidth: 960,
    height: '85vh',
    margin: '0 24px',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fonts.mono,
    color: colors.white,
  },

  closeBtn: {
    position: 'absolute',
    top: -40,
    right: 0,
    background: 'transparent',
    border: 'none',
    color: '#555',
    fontSize: 18,
    cursor: 'pointer',
    fontFamily: fonts.mono,
    padding: '4px 8px',
    lineHeight: 1,
    zIndex: 10,
  },

  terminal: {
    flex: 1,
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    border: `2px solid ${colors.yellow}`,
    boxShadow: `6px 6px 0 ${colors.yellow}`,
    background: colors.black,
    overflow: 'hidden',
  },

  starsRow: {
    fontFamily: fonts.mono,
    fontSize: 16,
    lineHeight: 1.6,
    margin: 0,
    padding: '20px 28px 0',
    flexShrink: 0,
    userSelect: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },

  mainRow: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    minHeight: 0,
  },

  leftPanel: {
    width: '36%',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: USE_PIXEL_BOT ? 'center' : 'flex-start',
    justifyContent: 'center',
    padding: USE_PIXEL_BOT ? '0 16px 28px 16px' : '0 16px 28px 0',
    overflow: 'hidden',
  },

  rightPanel: {
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    gap: 0,
  },

  ftAscii: {
    fontFamily: fonts.mono,
    fontSize: 16,
    lineHeight: 1.5,
    margin: 0,
    padding: '16px 20px',
    textAlign: 'left',
    animation: 'hFloat 3.5s ease-in-out infinite',
    userSelect: 'none',
    overflowX: 'auto',
    maxWidth: '100%',
    background: 'transparent',
    width: '100%',
    boxSizing: 'border-box',
  },

  ftFigure: {
    color: colors.yellow,
    display: 'block',
  },

  ftEyes: {
    color: colors.yellow,
    display: 'block',
    animation: 'hBotBlink 4s step-end infinite',
  },

  ftPanel: {
    color: colors.yellow,
    display: 'block',
    animation: 'hPanelGlow 2s ease-in-out infinite',
  },

  ftLabel: {
    color: colors.yellow,
    display: 'block',
    fontSize: 10,
    letterSpacing: '0.12em',
    opacity: 0.7,
  },

  ftSpeech: {
    width: '100%',
    background: 'transparent',
    padding: '20px 24px 14px',
    minHeight: 54,
    boxSizing: 'border-box',
    flexShrink: 0,
  },

  ftSpeechText: {
    fontSize: 14,
    fontFamily: fonts.serif,
    fontStyle: 'italic',
    color: colors.yellow,
    lineHeight: 1.55,
  },

  rightContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px 24px 40px',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 6,
    width: '100%',
    animation: 'hFadeIn 0.4s ease',
  },

  signBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
    padding: '12px 6px',
    background: 'transparent',
    border: `1px solid #1e1e1e`,
    borderRadius: 0,
    cursor: 'pointer',
    fontFamily: fonts.mono,
    transition: 'background 0.12s, border-color 0.12s',
  },

  signSymbol: {
    fontSize: 22,
    lineHeight: 1,
    color: colors.yellow,
  },

  signName: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '0.08em',
    color: '#cfccd3',
    fontFamily: fonts.sans,
    textTransform: 'uppercase',
  },

  signDates: {
    fontSize: 8,
    color: '#555',
    fontFamily: fonts.mono,
    letterSpacing: '0.02em',
  },

  stGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 8,
    width: '100%',
    animation: 'hFadeIn 0.4s ease',
  },

  stBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    padding: '22px 8px',
    background: 'transparent',
    border: `1px solid #1e1e1e`,
    borderRadius: 0,
    cursor: 'pointer',
    fontFamily: fonts.mono,
    transition: 'background 0.12s, border-color 0.12s',
  },

  stValue: {
    fontSize: 20,
    fontWeight: 700,
    color: colors.yellow,
    fontFamily: fonts.serif,
  },

  stDesc: {
    fontSize: 10,
    color: '#555',
    fontFamily: fonts.mono,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },

  reading: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    animation: 'hFadeIn 0.4s ease',
    width: '100%',
  },

  signBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '4px 0 14px',
    background: 'transparent',
    borderBottom: `1px solid #1e1e1e`,
  },

  bannerSymbol: {
    fontSize: 28,
    color: colors.yellow,
    lineHeight: 1,
    fontFamily: fonts.serif,
  },

  bannerName: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.yellow,
    fontFamily: fonts.serif,
    fontStyle: 'italic',
    letterSpacing: '0.02em',
  },

  card: {
    background: 'transparent',
    borderRadius: 0,
    padding: '4px 0',
    minHeight: 64,
  },

  thinkRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },

  spinner: {
    width: 12,
    height: 12,
    border: `2px solid #2a2a2a`,
    borderTopColor: colors.yellow,
    borderRadius: '50%',
    animation: 'hSpin 0.8s linear infinite',
    display: 'inline-block',
    flexShrink: 0,
  },

  thinkTxt: {
    fontSize: 10,
    fontWeight: 700,
    color: '#555',
    letterSpacing: '0.04em',
    fontFamily: fonts.sans,
    textTransform: 'uppercase',
  },

  cardText: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.7,
    fontFamily: fonts.serif,
    fontStyle: 'italic',
    color: '#cfccd3',
    minHeight: '1.7em',
    wordBreak: 'break-word',
  },

  cursor: {
    color: colors.yellow,
    animation: 'hBlink 0.7s step-end infinite',
    marginLeft: 1,
  },

  screenTimeCtx: {
    marginTop: 14,
    padding: '12px 0',
    background: 'transparent',
    borderTop: `1px solid #1e1e1e`,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },

  screenTimeCtxLabel: {
    fontSize: 8,
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: '#444',
    fontFamily: fonts.mono,
    textTransform: 'uppercase',
  },

  screenTimeCtxVal: {
    fontSize: 14,
    fontWeight: 700,
    fontFamily: fonts.mono,
    color: colors.yellow,
  },

  screenTimeCtxText: {
    margin: 0,
    fontSize: 12,
    fontFamily: fonts.serif,
    fontStyle: 'italic',
    color: '#666',
    lineHeight: 1.5,
  },

  verdict: {
    marginTop: 14,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    borderTop: `1px solid #1e1e1e`,
    paddingTop: 16,
  },

  verdictLabel: {
    fontSize: 8,
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: '#444',
    fontFamily: fonts.mono,
    textTransform: 'uppercase',
  },

  verdictValue: {
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: '0.08em',
    color: colors.black,
    fontFamily: fonts.sans,
    textTransform: 'uppercase',
    background: colors.yellow,
    display: 'inline-block',
    padding: '2px 8px',
  },

  sub: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    animation: 'hFadeIn 0.6s ease',
    borderTop: `1px solid #1e1e1e`,
    paddingTop: 16,
    marginTop: 4,
  },

  subForm: {
    display: 'flex',
    gap: 0,
  },

  subInput: {
    flex: 1,
    padding: '11px 14px',
    background: 'transparent',
    border: `1px solid #333`,
    borderRight: 'none',
    borderRadius: 0,
    fontSize: 13,
    fontFamily: fonts.mono,
    color: '#cfccd3',
    outline: 'none',
  },

  subBtn: {
    padding: '11px 18px',
    background: colors.yellow,
    color: colors.black,
    border: `1px solid ${colors.yellow}`,
    borderRadius: 0,
    fontSize: 12,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: fonts.sans,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    transition: 'background 0.12s',
  },

  subConfirm: {
    padding: '12px 16px',
    background: '#0d0d0d',
    color: colors.yellow,
    fontSize: 14,
    fontFamily: fonts.serif,
    fontStyle: 'italic',
    border: `1px solid #2a2a2a`,
    letterSpacing: '0.02em',
    animation: 'hFadeIn 0.4s ease',
  },

  subFine: {
    margin: 0,
    fontSize: 9,
    color: '#333',
    fontFamily: fonts.mono,
    letterSpacing: '0.08em',
  },

  resetBtn: {
    alignSelf: 'flex-start',
    background: 'transparent',
    border: `1px solid #2a2a2a`,
    borderRadius: 0,
    padding: '8px 14px',
    fontSize: 11,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: fonts.sans,
    color: '#555',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    transition: 'color 0.12s, border-color 0.12s',
  },
};

const CSS = `
  @keyframes hOverlayIn  { from { opacity:0 } to { opacity:1 } }
  @keyframes hOverlayOut { from { opacity:1 } to { opacity:0 } }

  @keyframes hTermIn {
    from { opacity:0; transform:scale(0.95) translateY(20px); filter:blur(6px); }
    to   { opacity:1; transform:scale(1) translateY(0); filter:blur(0); }
  }
  @keyframes hTermOut {
    from { opacity:1; transform:scale(1) translateY(0); filter:blur(0); }
    to   { opacity:0; transform:scale(0.96) translateY(10px); filter:blur(3px); }
  }

  @keyframes hScanBoot {
    0%   { top:-2px; opacity:0.9; }
    85%  { top:100%; opacity:0.6; }
    100% { top:100%; opacity:0; }
  }
  @keyframes hBorderPower {
    0%   { box-shadow: 0 0 0 ${colors.yellow}, 0 0 50px rgba(231,255,0,0.85); }
    55%  { box-shadow: 6px 6px 0 ${colors.yellow}, 0 0 20px rgba(231,255,0,0.35); }
    100% { box-shadow: 6px 6px 0 ${colors.yellow}; }
  }

  .hterm-opening { animation: hBorderPower 0.8s ease both; }
  .hterm-opening::after {
    content: '';
    position: absolute;
    left: 0; right: 0;
    height: 2px;
    background: ${colors.yellow};
    box-shadow: 0 0 10px ${colors.yellow}, 0 0 22px rgba(231,255,0,0.55);
    animation: hScanBoot 0.65s ease 0.08s both;
    pointer-events: none;
    z-index: 100;
  }

  @keyframes hFadeIn { from { opacity:0 } to { opacity:1 } }
  @keyframes hSpin   { to { transform:rotate(360deg) } }
  @keyframes hBlink  { 50% { opacity:0 } }

  @keyframes hWave {
    0%   { opacity:0.3; transform:translateY(4px) scale(0.94); filter:blur(2px); color:#333; }
    40%  { opacity:1;   transform:translateY(-1px) scale(1.02); filter:blur(0); color:${colors.yellow}; }
    70%  { transform:translateY(0) scale(1); color:#aaa; }
    100% { opacity:1;   transform:translateY(0) scale(1); filter:blur(0); color:#cfccd3; }
  }

  @keyframes hFloat {
    0%   { transform: translateY(0px); }
    50%  { transform: translateY(-5px); }
    100% { transform: translateY(0px); }
  }

  @keyframes hPanelGlow {
    0%   { text-shadow: 0 0 3px ${colors.yellow};  color: ${colors.yellow}; opacity: 0.85; }
    50%  { text-shadow: 0 0 10px ${colors.yellow}, 0 0 20px rgba(231,255,0,0.4); color: #f8ffa0; opacity: 1; }
    100% { text-shadow: 0 0 3px ${colors.yellow};  color: ${colors.yellow}; opacity: 0.85; }
  }

  @keyframes hBotBlink {
    0%, 88%, 96%, 100% { opacity: 1; }
    90%, 94%            { opacity: 0; }
  }

  @keyframes hStaggerIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes botBlink {
    0%, 88%, 96%, 100% { opacity: 1; }
    90%, 94%            { opacity: 0; }
  }

  @keyframes botDotGlow {
    0%   { opacity: 0.3; }
    50%  { opacity: 1; }
    100% { opacity: 0.3; }
  }

  .bot-eye { animation: botBlink 4s step-end infinite; }
  .bot-dot { animation: botDotGlow 2s ease-in-out infinite; }

  .ft-st-btn:hover, .ft-st-btn:hover .stValue {
    background: ${colors.yellow} !important;
    border-color: ${colors.yellow} !important;
  }

  button:hover {
    background: ${colors.yellow} !important;
    color: #050505 !important;
    border-color: ${colors.yellow} !important;
  }

  button:hover span {
    color: #050505 !important;
  }

  @media (max-width: 700px) {
    .void-layout {
      flex-direction: column !important;
    }
    .void-left {
      width: 100% !important;
      border-right: none !important;
      border-bottom: 1px solid #222 !important;
      padding: 20px 16px !important;
      justify-content: flex-start !important;
    }
    .void-right {
      flex: 1 !important;
    }
  }
`;
