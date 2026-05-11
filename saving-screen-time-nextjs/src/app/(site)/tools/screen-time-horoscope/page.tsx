'use client';

import { useState } from 'react';
import ToolPage from "../components/ToolPage";
import HoroscopeModal from "./HoroscopeModal";

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
            <p>Welcome to Screen Time Horoscope — a digital sanctuary for the modern smartphone user who finds themselves endlessly scrolling. This tool offers personalised, tongue-in-cheek astrological readings based entirely on your weekly screen time habits, app usage, and digital footprint. Whether you are a dedicated doomscroller or a meticulous productivity devotee, this is your playful mirror to the digital life you are actually living.</p>
            <p>Our system translates your screen time data into a bespoke celestial chart. By mapping hours spent on social media, messaging, creative apps, and utilities to archetypal personality traits, the algorithm generates a unique daily horoscope. Instead of looking to the stars, we look to your screen — to divine your mood, predict your digital pitfalls, and offer a lighthearted glimpse into your technological future.</p>
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
        }
      />
      <HoroscopeModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
