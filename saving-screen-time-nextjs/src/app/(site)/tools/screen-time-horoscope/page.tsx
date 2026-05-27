'use client';

import { useState } from 'react';
import ToolPage from "../components/ToolPage";
import HoroscopeModal from "./HoroscopeModal";
import OOOInline from "./OOOInline";

const archetypes = [
  {
    symbol: "☿",
    name: "The Doomscroller",
    body: "4+ hours of social media daily. Restless energy. Fuelled by outrage and the occasional cat video.",
  },
  {
    symbol: "♄",
    name: "The Productivity Purist",
    body: "90% utility apps, calendar, and notes. Ruthlessly efficient. Secretly anxious about inbox zero.",
  },
  {
    symbol: "♊",
    name: "The Context Switcher",
    body: "30+ apps per day. Perpetually distracted. Brilliant ideas, half-executed. The group chat never sleeps.",
  },
  {
    symbol: "☽",
    name: "The Nostalgic Browser",
    body: "Long gallery sessions and late-night searches. Deeply sentimental. Saves everything. Reads nothing.",
  },
  {
    symbol: "☀",
    name: "The Content Creator",
    body: "Hours in camera and editing apps. Always performing, even when offline. The aesthetic is the message.",
  },
  {
    symbol: "⊕",
    name: "The Notification Devotee",
    body: "Checks their phone 90+ times daily. Anxiously organised. Every ping demands an immediate response.",
  },
];

export default function ScreenTimeHoroscopePage() {
  const [open, setOpen] = useState(false);
  const [argumentOpen, setArgumentOpen] = useState(false);
  const [oooOpen, setOooOpen] = useState(false);

  return (
    <>
      <ToolPage
        theme="horoscope"
        tag="✦ Tool — Screen Time Horoscope"
        title={<>Screen Time <em>Horoscope</em></>}
        subtitle="The stars have nothing to do with it. Your screen time tells us everything."
        launchUrl="#"
        ctaLabel="Try the Oracle →"
        onLaunch={() => setOpen(true)}
        hideCta
        aboutQuote="✦ Your apps have aligned. The cosmos couldn't care less."
        heroDecoration={
          <pre className="hero-stars-deco">{'      *    .    *    .    *    .         *    .\n   .    *              *    .      *         .'}</pre>
        }
        aboutBody={
          <>
            <p>Every Monday morning, a familiar little notification appears: <em>"Your daily average is up 15% from last week."</em> One number, pretending to tell the truth about an entire week of living, working, worrying, and scrolling. The line goes up; therefore, you have been bad. You are always bad.</p>
            <p>The Screen Time Horoscope is an experimental tool for people who want a different reading on their phone use — more than just a number. You give us your star sign and a few details about your screen habits, and our oracle takes it from there. No data is extracted or mined. This is vibe-tracking: surveillance at the level of reading your palm.</p>
            <p>Under the hood, the oracle is an LLM composing text. It's instructed to produce readings that sound less like a diagnosis and more like something a slightly space-cadet friend might text you at midnight. Not there to tell you whether you were good or bad — only to suggest another way of understanding what you were doing.</p>
          </>
        }
        featuresTitle={<>How it <em>✦ Works</em></>}
        features={[
          {
            num: "01",
            title: "✦ Enter Your Screen Time",
            body: "Screenshot your weekly iPhone Screen Time report or type in your totals. No account needed — your data stays on your device.",
          },
          {
            num: "02",
            title: "✦ The Algorithm Reads the Stars",
            body: "Your app usage is mapped to astrological archetypes — social media, creative tools, messaging, utilities — each revealing a different facet of your celestial profile.",
          },
          {
            num: "03",
            title: "✦ Receive Your Reading",
            body: "A personalised horoscope delivered in full cosmic style — equal parts absurd, eerily accurate, and strangely comforting.",
          },
        ]}
        extraSection={
          <>
            <section className="tool-extra">
              <div className="section-inner">
                <div className="section-label">Your Digital Sign</div>
                <div className="section-title">Which <em>Archetype</em> Are You?</div>
                <div className="archetype-grid">
                  {archetypes.map((a) => (
                    <div key={a.name} className="archetype-card reveal">
                      <div className="archetype-symbol">{a.symbol}</div>
                      <div className="archetype-name">{a.name}</div>
                      <div className="archetype-body">{a.body}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="tool-extra">
              <div className="section-inner">
                <button
                  className="expand-toggle"
                  onClick={() => setArgumentOpen(v => !v)}
                  aria-expanded={argumentOpen}
                >
                  <div>
                    <div className="section-label">The Argument</div>
                    <div className="section-title">The Horoscope as a <em>Counter-Reading</em></div>
                  </div>
                  <span className="expand-chevron">{argumentOpen ? '−' : '+'}</span>
                </button>
                {argumentOpen && (
                  <div className="aim-body expand-body" style={{ maxWidth: 760, marginTop: 24 }}>
                    <p>Horoscopes have always occupied an odd corner of media. They sit between the news and the comics — mass-produced and generic, yet written and read as if they were intimate. Long before social platforms promised algorithmic personalisation, newspapers were already printing a kind of low-tech personalisation at scale: twelve signs, one short paragraph each, addressed directly to "you."</p>
                    <p>Theodor Adorno famously hated this. In his 1950s study of a Los Angeles horoscope column, he argued that astrology trains readers out of critical thought, nudging them to accept pre-packaged interpretations instead of making sense of the world for themselves.</p>
                    <p>What interests us, several decades and a few billion push notifications later, is almost the inverse. Screen time reports now do exactly what Adorno worried about, but with numbers. They present a single figure — <em>3 hours 47 minutes, up 37%</em> — as if it were neutral fact rather than a particular, value-laden way of reading a week. The figure pushes aside other ways of understanding what screens are doing in our lives: how they can soothe, aggravate, structure, and sometimes save us.</p>
                    <p>By comparison, horoscopes are refreshingly honest about being interpretive. They don't arrive pretending to be neutral facts; they arrive as language — loose, roomy, and open to being taken up in different ways. Broad statements that could apply to many, yet feel uncannily specific. Modal verbs instead of measurement: <em>you may feel…</em>, <em>it might be time to…</em></p>
                    <p>The effect is that it invites you to decide. You either see yourself in the reading, or you don't — but either way, you clarify what your week has actually been like. The horoscope is a prompt: a little narrative you can try on, argue with, or pocket for later.</p>
                  </div>
                )}
              </div>
            </section>

            <section className="tool-extra">
              <div className="section-inner">
                <button
                  className="expand-toggle"
                  onClick={() => setOooOpen(v => !v)}
                  aria-expanded={oooOpen}
                >
                  <div>
                    <div className="section-label">Bonus Feature</div>
                    <div className="section-title">From Horoscope to <em>Out-of-Office Reply</em></div>
                  </div>
                  <span className="expand-chevron">{oooOpen ? '−' : '+'}</span>
                </button>
                {oooOpen && (
                  <div className="aim-body expand-body" style={{ maxWidth: 760, marginTop: 24 }}>
                    <p>We've also built in a feature where you can turn your Screen Time Horoscope into a ready-to-paste out-of-office reply. For your next holiday or break from work, you no longer have to send a generic <em>"I am currently away from my email"</em> message. You can reach for the stars instead — and disengage on the basis of whatever the tea leaves are saying about your week.</p>
                    <p>Email has already become a site of virtue signalling and self-expression: the earnest plea not to print this message <em>"for the sake of the environment,"</em> the inspirational quote, the humble brag pointing to a recent publication. What if we used the same space to showcase something a little wackier — that our decision to unplug was justified by a celestial reading of the stars?</p>
                    <p>We're not the first to make out-of-office replies a little weird. Iceland's tourism campaign famously let a horse "answer" your emails while you were away, turning auto-response into performance art. Our horoscope-based reply does something similarly odd: it lets a speculative, mystical register leak into one of the most tightly managed corners of professional life, and uses that leak to justify stepping away.</p>
                    <p>It could also give off a slightly unhinged vibe — which, frankly, is an excellent way to discourage anyone from emailing you in the first place.</p>
                  </div>
                )}
              </div>
            </section>
            <section className="tool-extra">
              <div className="section-inner">
                <OOOInline />
              </div>
            </section>
          </>
        }
      />
      <HoroscopeModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
