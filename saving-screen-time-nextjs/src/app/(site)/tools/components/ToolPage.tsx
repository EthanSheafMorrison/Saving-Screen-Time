"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export interface ToolFeature {
  num: string;
  title: string;
  body: string;
}

export interface ToolPageProps {
  tag: string;
  title: React.ReactNode;
  subtitle: string;
  launchUrl: string;
  aboutQuote: string;
  aboutBody: React.ReactNode;
  featuresTitle: React.ReactNode;
  features: ToolFeature[];
  ctaLabel?: string;
  theme?: "horoscope" | "fortune" | "defacer";
  extraSection?: React.ReactNode;
}

export default function ToolPage({
  tag,
  title,
  subtitle,
  launchUrl,
  aboutQuote,
  aboutBody,
  featuresTitle,
  features,
  ctaLabel = "Launch Tool ↗",
  theme,
  extraSection,
}: ToolPageProps) {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
    document.querySelectorAll(".steps-grid").forEach((grid) => {
      Array.from(grid.children).forEach((child: any, i) => {
        child.style.transitionDelay = `${i * 0.07}s`;
      });
    });
    return () => io.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + start;
    const duration = 1000;
    let startTime: number | null = null;
    const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      window.scrollTo(0, start + (end - start) * ease(p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <main className="study-page" {...(theme ? { "data-theme": theme } : {})}>

      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <div className="study-tag">{tag}</div>
          <h1>{title}</h1>
          <p className="study-sub">{subtitle}</p>
          <div className="nav-links">
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo("about"); }}>About</a>
            <a href="#features" onClick={(e) => { e.preventDefault(); scrollTo("features"); }}>Features</a>
            <Link href="/tools">All Tools</Link>
          </div>
          <div className="hero-cta">
            <a href={launchUrl} className="study-btn">{ctaLabel}</a>
            <a href="#about" className="study-btn" onClick={(e) => { e.preventDefault(); scrollTo("about"); }}>
              Learn More ↓
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="aim" id="about">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-label">What is it?</div>
            <div className="aim-quote">{aboutQuote}</div>
          </div>
          <div className="reveal">
            <div className="aim-body">{aboutBody}</div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="help" id="features">
        <div className="section-inner">
          <div className="section-label">How it works</div>
          <div className="section-title">{featuresTitle}</div>
          <div className="steps-grid">
            {features.map((f) => (
              <div key={f.num} className="step-card reveal">
                <div className="step-num">{f.num}</div>
                <div className="step-title">{f.title}</div>
                <div className="step-body">{f.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXTRA SECTION */}
      {extraSection}

      {/* CTA */}
      <section className="event-register">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-label">Ready to try it?</div>
            <div className="section-title">Get <em>Started</em></div>
            <div style={{ marginTop: "32px" }}>
              <a href={launchUrl} className="study-btn">{ctaLabel}</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="study-footer">
        <div>
          <div className="footer-logo">Saving Screen <em>Time</em></div>
          <p className="mt-6">A Marsden Fast Start Research Project — Victoria University of Wellington</p>
        </div>
        <div className="footer-right">
          <Link href="/tools" className="stripe-link">← All Tools</Link>
        </div>
      </footer>
    </main>
  );
}
