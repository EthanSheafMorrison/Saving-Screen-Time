"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Script from "next/script";

export default function StudyPage() {
  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + start;
    const duration = 1200;
    let startTime: number | null = null;
    const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start + (end - start) * easeInOut(progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  useEffect(() => {
    // Scroll reveal
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

    // Staggered children in grids
    document
      .querySelectorAll(
        ".steps-grid, .topics-grid, .rights-grid, .team-grid, .guide-grid"
      )
      .forEach((grid) => {
        Array.from(grid.children).forEach((child: any, i) => {
          child.style.transitionDelay = `${i * 0.07}s`;
        });
      });

    return () => {
      io.disconnect();
    };
  }, []);

  return (
    <main className="study-page">


      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <div className="study-tag">Current Study — HE040648</div>
          <h1>
            Got <span>ADHD</span> and a <em>smartphone?</em>
          </h1>
          <p className="study-sub">
            Let's talk about screen time. We are looking for participants to share
            their stories.
          </p>
        <div className="nav-links">
          <a href="#aim" onClick={(e) => { e.preventDefault(); scrollTo("aim"); }}>Aim</a>
          <a href="#help" onClick={(e) => { e.preventDefault(); scrollTo("help"); }}>Participate</a>
          <a href="#rights" onClick={(e) => { e.preventDefault(); scrollTo("rights"); }}>Rights</a>
          <a href="#team" onClick={(e) => { e.preventDefault(); scrollTo("team"); }}>Team</a>
          <Link href="/Studies">See all studies</Link>
        </div>
          <div className="hero-cta">
            <a
              href="https://luma.com/event/evt-2wOktzcujLoeMsV"
              className="study-btn"
              data-luma-action="checkout"
              data-luma-event-id="evt-2wOktzcujLoeMsV"
            >
              Register for Study ↗
            </a>
            <a href="#aim" className="study-btn" onClick={(e) => { e.preventDefault(); scrollTo("aim"); }}>
              Learn More ↓
            </a>
          </div>
        </div>
      </section>

      {/* AIM */}
      <section className="aim" id="aim">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-label">What is the aim?</div>
            <div className="aim-quote">
              Exploring how people with ADHD navigate their online and offline
              lives.
            </div>
          </div>
          <div className="reveal">
            <div className="aim-body">
              <p>
                Not everyone experiences the internet the same way. This project
                digs into the strategies used by people with ADHD when connecting
                and disconnecting from screens — and how that shapes their sense
                of time, productivity, and relationships. We want to understand
                how <strong>you</strong> relate your ADHD to technology and
                disconnection.
              </p>
              <p>
                This is a Marsden Fast Start research project led by Victoria
                University of Wellington — Te Herenga Waka. The research draws on
                disability studies to challenge ableist assumptions about what
                "healthy" screen time looks like.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO HELP */}
      <section className="help" id="help">
        <div className="section-inner">
          <div className="section-label">How can you help?</div>
          <div className="section-title">
            Story Completion <em>Study</em>
          </div>

          <div className="callout-box reveal">
            You'll complete a series of story prompts — responses must be at
            least <strong>1,000 words</strong>. You'll receive a{" "}
            <strong>$30 gift card</strong> on completion.
          </div>

          <div className="steps-grid">
            <div className="step-card reveal">
              <div className="step-num">01</div>
              <div className="step-title">Demographics</div>
              <div className="step-body">
                At the start, you'll share some background information about
                yourself.
              </div>
            </div>
            <div className="step-card reveal">
              <div className="step-num">02</div>
              <div className="step-title">Story Prompts</div>
              <div className="step-body">
                You'll be given prompts on key topics and asked to write stories
                from your own experience.
              </div>
            </div>
            <div className="step-card reveal">
              <div className="step-num">03</div>
              <div className="step-title">Story Party</div>
              <div className="step-body">
                Sessions run online via Zoom. You can take breaks and skip any
                prompt you're not comfortable with.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOPICS */}
      <section className="topics" id="topics">
        <div className="section-inner">
          <div className="section-label">Example story prompts</div>
          <div className="section-title">
            Topics of <em>Interest</em>
          </div>
          <div className="topics-grid">
            <div className="topic-item reveal">
              <span>01</span>
              Experiencing productivity pressure &amp; managing screen time
              <div className="topic-body">
                How do you feel when you need to be productive online? What
                happens to your screen time?
              </div>
            </div>
            <div className="topic-item reveal">
              <span>02</span>
              What it means to 'disconnect' — with or without digital media
              <div className="topic-body">
                What does disconnecting mean to you? How do you actually do it?
              </div>
            </div>
            <div className="topic-item reveal">
              <span>03</span>
              Benefits, challenges &amp; downsides of disconnecting from the
              internet
              <div className="topic-body">
                When you go offline, what do you gain — and what do you lose?
              </div>
            </div>
            <div className="topic-item reveal">
              <span>04</span>
              How disconnecting affects your sense of time &amp; relationships
              <div className="topic-body">
                Does stepping away change how time feels? How it affects the
                people around you?
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YOUR RIGHTS */}
      <section className="rights" id="rights">
        <div className="section-inner">
          <div className="section-label">Participant rights</div>
          <div className="section-title">Your Rights</div>
          <div className="rights-grid">
            <div className="right-item reveal">
              <div className="right-num">Right 01</div>
              <div className="right-title">Withdraw Consent</div>
              <div className="right-body">
                You can withdraw your consent up to 1 month after completion. Your
                entry will be linked to your email address.
              </div>
            </div>
            <div className="right-item reveal">
              <div className="right-num">Right 02</div>
              <div className="right-title">Ask Questions</div>
              <div className="right-body">
                Questions can be asked at any time before, during, or after the
                study.
              </div>
            </div>
            <div className="right-item reveal">
              <div className="right-num">Right 03</div>
              <div className="right-title">Confidentiality</div>
              <div className="right-body">
                Your information is confidential. Data is stored on the
                university's OneDrive server with two-factor authentication.
              </div>
            </div>
            <div className="right-item reveal">
              <div className="right-num">Right 04</div>
              <div className="right-title">Stop at Any Time</div>
              <div className="right-body">
                You can stop taking part in the story completion study at any time
                without penalty.
              </div>
            </div>
            <div className="right-item reveal">
              <div className="right-num">Right 05</div>
              <div className="right-title">Skip Any Prompt</div>
              <div className="right-body">
                You can choose not to answer any story prompt. There are no right
                or wrong answers.
              </div>
            </div>
            <div className="right-item reveal">
              <div className="right-num">Right 06</div>
              <div className="right-title">Raise Concerns</div>
              <div className="right-body">
                Ethical concerns can be raised with the HEC Convenor. Call 0800 04
                04 04 or email the convenor directly.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KEY INFO */}
      <section className="keyinfo" id="keyinfo">
        <div className="section-inner">
          <div>
            <div className="section-label">Participation details</div>
            <div className="section-title">Key Info</div>
            <div className="info-item reveal">
              <div className="info-icon">✍</div>
              <div>
                <div className="info-label">Story length</div>
                <div className="info-text">At least 1,000 words per story</div>
                <div className="info-sub">
                  You choose the content — every experience is valid.
                </div>
              </div>
            </div>
            <div className="info-item reveal">
              <div className="info-icon">$</div>
              <div>
                <div className="info-label">Compensation</div>
                <div className="info-text">$30 gift card on completion</div>
                <div className="info-sub">
                  Sent to you after you finish the study.
                </div>
              </div>
            </div>
            <div className="info-item reveal">
              <div className="info-icon">🖥</div>
              <div>
                <div className="info-label">Format</div>
                <div className="info-text">
                  Online via Zoom (Story Completion Party)
                </div>
                <div className="info-sub">
                  Video off and muted. Questions via Zoom Chat. Food and toilet
                  breaks allowed.
                </div>
              </div>
            </div>
          </div>
          <div className="reveal">
            <div className="contact-card">
              <div className="section-label">Contact</div>
              <div className="contact-name">Alex Beattie</div>
              <p className="contact-role">He/Him — Senior Lecturer</p>
              <p className="contact-dept">
                School of Information Management
                <br />
                Victoria University of Wellington
              </p>
              <a href="mailto:alex.beattie@vuw.ac.nz" className="email-link">
                alex.beattie@vuw.ac.nz ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DATA MANAGEMENT */}
      <section className="data" id="data">
        <div className="section-inner">
          <div className="section-label">Transparency</div>
          <div className="section-title">Data Management</div>
          <div className="data-grid reveal">
            <div className="data-cell">
              <div className="data-head">Ethics</div>
              <div className="data-body">
                Approved by the Te Herenga Waka — Victoria University of
                Wellington Human Ethics Committee. Application reference:{" "}
                <strong>HE040648</strong>.
              </div>
            </div>
            <div className="data-cell">
              <div className="data-head">Safety</div>
              <div className="data-body">
                Data stored on the university OneDrive server, protected by
                two-factor authentication.
              </div>
            </div>
            <div className="data-cell">
              <div className="data-head">Output</div>
              <div className="data-body">
                Data will be used for research publications, social media posts,
                and community resources. You'll receive a link to the findings in
                the future.
              </div>
            </div>
            <div className="data-cell">
              <div className="data-head">Retention</div>
              <div className="data-body">
                De-identified data will be destroyed in 10 years, allowing it to
                be used for future research projects.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="team" id="team">
        <div className="section-inner">
          <div className="section-label">Research team</div>
          <div className="section-title">Who Has Access</div>
          <div className="team-grid">
            <div className="team-card reveal">
              <div className="team-initial">A</div>
              <div className="contact-name">Alex Beattie</div>
              <div className="team-role">
                Senior Lecturer, School of Information Management — VUW
              </div>
            </div>
            <div className="team-card reveal">
              <div className="team-initial">T</div>
              <div className="contact-name">Assoc. Prof. Terry Fleming</div>
              <div className="team-role">
                Victoria University of Wellington — Te Herenga Waka
              </div>
            </div>
            <div className="team-card reveal">
              <div className="team-initial">K</div>
              <div className="contact-name">Dr. Karaitiana Taiuru</div>
              <div className="team-role">Taiuru &amp; Associates Ltd</div>
              <div className="team-iwi">
                Ngāi Tahu · Ngāti Kahungunu · Ngāti Toa
              </div>
            </div>
            <div className="team-card reveal">
              <div className="team-initial">M</div>
              <div className="contact-name">Maggie Shippam &amp; Dr. Ally Gibson</div>
              <div className="team-role">
                Victoria University of Wellington — Te Herenga Waka
              </div>
            </div>
          </div>
          <div style={{ marginTop: "40px", textAlign: "center" }}>
            <Link href="/team" className="study-btn">Meet the Full Team</Link>
          </div>
        </div>
      </section>

      {/* STORY PARTY GUIDELINES */}
      <section className="guidelines" id="guidelines">
        <div className="section-inner">
          <div className="section-label">Zoom session</div>
          <div className="section-title">Story Completion Party — Guidelines</div>
          <div className="guide-grid">
            <div className="guide-item reveal">
              <div className="guide-n">01</div>
              <div className="guide-title">Keep Group Confidentiality</div>
              <div className="guide-body">
                Please do not share who took part or what was discussed. Some
                people won't be open about their ADHD.
              </div>
            </div>
            <div className="guide-item reveal">
              <div className="guide-n">02</div>
              <div className="guide-title">Video Off &amp; Muted</div>
              <div className="guide-body">
                Keep your video off and microphone muted so others can focus while
                completing their prompts.
              </div>
            </div>
            <div className="guide-item reveal">
              <div className="guide-n">03</div>
              <div className="guide-title">Questions via Zoom Chat</div>
              <div className="guide-body">
                To minimise disruption, please use the Zoom Chat to ask questions
                during the session.
              </div>
            </div>
            <div className="guide-item reveal">
              <div className="guide-n">04</div>
              <div className="guide-title">No Right or Wrong</div>
              <div className="guide-body">
                Every person's experiences and opinions matter. Write what feels
                true to you.
              </div>
            </div>
            <div className="guide-item reveal">
              <div className="guide-n">05</div>
              <div className="guide-title">Take Breaks</div>
              <div className="guide-body">
                Food and toilet breaks are welcome anytime while the session is
                running.
              </div>
            </div>
            <div className="guide-item reveal">
              <div className="guide-n">06</div>
              <div className="guide-title">Phone on Silent</div>
              <div className="guide-body">
                Put your phone on silent during the meeting so you and others can
                stay focused.
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* EVENT REGISTER */}
      <section className="event-register">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-label">Upcoming session</div>
            <div className="section-title">Register for a <em>Story Party</em></div>
            <div style={{ marginTop: "32px" }}>
              <a
                href="https://luma.com/event/evt-2wOktzcujLoeMsV"
                className="study-btn"
                data-luma-action="checkout"
                data-luma-event-id="evt-2wOktzcujLoeMsV"
              >
                Register for Event
              </a>
            </div>
          </div>
        </div>
        <Script id="luma-checkout" src="https://embed.lu.ma/checkout-button.js" strategy="afterInteractive" />
      </section>

      {/* FOOTER */}
      <footer className="study-footer">
        <div>
          <div className="footer-logo">
            Saving Screen <em>Time</em>
          </div>
          <p className="mt-6">
            A Marsden Fast Start Research Project — Victoria University of
            Wellington
          </p>
        </div>
        <div className="footer-right">
          <p className="ethics-ref">Ethics Ref: HE040648</p>
          <p className="mt-4">Design adapted from original by Ethan Sheaf</p>
        </div>
      </footer>
    </main>
  );
}