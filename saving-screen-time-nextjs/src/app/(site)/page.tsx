import Image from "next/image";
// If this import throws a red line, change it to the relative path: "../../../sanity/lib/client"
import { client } from "../../sanity/lib/client";

// This tells Next.js to check Sanity for new content every 60 seconds
export const revalidate = 60;

export default async function Home() {
  // Fetch the first document of type 'homepage' from your Sanity database
  const homepageData = await client.fetch(`*[_type == "homepage"][0]`);

  return (
    <>
      <section className="sec-hero" style={{ position: "relative", overflow: "hidden" }}>
        <div className="hero-plus hp-tr">+</div>
        <div className="hero-plus hp-bl">+</div>

        <div style={{ marginTop: "10vh", position: "relative", zIndex: 10 }}>
          <Image
            src="/Images/Logo.svg"
            alt="Logo graphic"
            width={800}
            height={480}
            style={{ width: "60%", maxWidth: "800px", height: "auto", display: "block" }}
            className="hero-logo"
          />

          <div
            className="hero-label"
            style={{
              marginLeft: "1%",
              marginTop: "1.5rem",
              backgroundColor: "var(--white)",
              color: "var(--blue)",
            }}
          >
            {/* Fallback text is included just in case the field is left empty in the Studio */}
            {homepageData?.heroLabel || "a research project by Alex Beattie"}
          </div>
          
          <div className="stripe-content hero-intro-text">
            <span className="text-highlight">
              {homepageData?.heroIntro || "Loading introduction..."}
            </span>
          </div>
        </div>

        <Image
          src="/Images/slice1.png"
          alt="Slice graphic"
          width={500}
          height={500}
          className="brutal-image-small"
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "50%",
            height: "auto",
            transform: "translateY(10%)",
            zIndex: 0,
          }}
        />
      </section>

      <section className="sec-yellow" style={{ position: "relative", overflow: "hidden" }}>
        <h2 className="giant-bg-text" style={{ marginTop: "-.02em" }}>
          ADHD
          <br />
          CRIP
        </h2>

        <div className="yellow-content">
          <p>{homepageData?.yellowBody}</p>
        </div>
      </section>

      <section className="sec-black">
        <div className="floating-neon-box">
          <h3>
            <span className="text-highlight" style={{ zIndex: "6" }}>
              {homepageData?.neonBoxHeading || "Crip Time"}
            </span>
            <span>✕</span>
          </h3>
          <p>
            <span className="text-highlight" style={{ zIndex: "6" }}>
              {homepageData?.neonBoxBody}
            </span>
          </p>
        </div>

        <div
          className="black-content"
          style={{ padding: "1rem 1rem", transform: "translateY(-20%)" }}
        >
          <h2>{homepageData?.blackMainText}</h2>
        </div>
        
        <Image
          src="/Images/Horse.png"
          alt="Horse graphic"
          width={700}
          height={700}
          className="brutal-image-small"
          style={{
            position: "absolute",
            bottom: "-25%",
            left: "3%",
            width: "70%",
            height: "auto",
            zIndex: 5,
            mixBlendMode: "difference",
          }}
        />
      </section>

      <section className="sec-stripes">
        <div className="stripe stripe-blue">
          <div className="ticker">
            <div className="ticker-track" aria-hidden="true">
              <span className="stripe-giant-text">
                {homepageData?.stripeBlueText || "DISCONNECT"}
              </span>
              <span className="stripe-giant-text">
                {homepageData?.stripeBlueText || "DISCONNECT"}
              </span>
            </div>
          </div>
        </div>

        <div className="stripe stripe-yellow">
          <div className="stripe-content">
            {homepageData?.stripeYellowText}
          </div>
        </div>

        <div className="stripe stripe-blue">
          <div className="stripe-content">
            <a href={homepageData?.studyLink || "Study"} className="stripe-link">
              { "Join the Study"}
            </a>
          </div>
        </div>

        <div className="stripe stripe-tools-intro">
          <span className="stripe-tool-plus stp-tl" aria-hidden="true">+</span>
          <span className="stripe-tool-plus stp-br" aria-hidden="true">+</span>
          <div className="tools-intro-ticker" aria-hidden="true">
            <div className="ticker">
              <div className="ticker-track">
                <span className="stripe-giant-text">TOOLS ✦ OUTPUTS ✦ EXPERIMENTS ✦&nbsp;</span>
                <span className="stripe-giant-text">TOOLS ✦ OUTPUTS ✦ EXPERIMENTS ✦&nbsp;</span>
              </div>
            </div>
          </div>
          <div className="tools-intro-inner">
            <div className="tools-intro-eyebrow">Beyond the study</div>
            <h2 className="tools-intro-title">The Tools</h2>
            <p className="tools-intro-body">
              Saving Screen Time isn&apos;t only a study. Alongside the research we build small, free tools — playful experiments in screen time, and <span className="text-highlight">additional outputs of the project</span>. Two are live now.
            </p>
          </div>
        </div>

        <a href="/tools/saving-screen-space" className="stripe stripe-tool stripe-tool--defacer">
          <span className="stripe-tool-plus stp-tr" aria-hidden="true">+</span>
          <span className="stripe-tool-plus stp-bl" aria-hidden="true">+</span>
          <span className="stripe-tool-ghost" aria-hidden="true">DEFACE</span>
          <svg className="stripe-tool-scribble" viewBox="0 0 900 420" fill="none" aria-hidden="true" preserveAspectRatio="none">
            <path className="scribble-path scribble-path--1" d="M60 200 C 140 120, 220 280, 340 180 S 500 280, 620 160 S 780 260, 880 140" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
            <path className="scribble-path scribble-path--2" d="M200 130 L 680 300" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            <path className="scribble-path scribble-path--3" d="M200 300 L 680 130" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            <path className="scribble-path scribble-path--6" d="M120 380 q 80 -28 160 8 t 180 -8 t 200 10 t 180 -12" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
          <div className="stripe-tool-inner">
            <div className="stripe-tool-text">
              <div className="stripe-tool-tag">Browser Extension</div>
              <h2 className="stripe-tool-name">Screen Space Defacer</h2>
              <p className="stripe-tool-desc">
                Scratch, smear, and scribble back at the ads that fill your screen — the whole web becomes your canvas.
              </p>
              <span className="stripe-tool-cta">Deface Your Screen ↗</span>
            </div>
          </div>
        </a>

        <a href="/tools/screen-time-horoscope" className="stripe stripe-tool stripe-tool--horoscope">
          <span className="stripe-tool-plus stp-tr" aria-hidden="true">+</span>
          <span className="stripe-tool-plus stp-bl" aria-hidden="true">+</span>
          <span className="stripe-tool-ghost" aria-hidden="true">HOROSCOPE</span>
          <div className="stripe-tool-glyphs" aria-hidden="true">
            {([["✦","8%","18%"],["☽","22%","70%"],["♄","42%","12%"],["☿","68%","82%"],["♊","80%","30%"],["☀","14%","52%"],["⊕","58%","60%"],["✦","88%","8%"]] as [string, string, string][]).map(([g, top, left], i) => (
              <span key={i} style={{ top, left }}>{g}</span>
            ))}
          </div>
          <div className="stripe-tool-inner">
            <div className="stripe-tool-text">
              <div className="stripe-tool-tag">Screen Time Tool</div>
              <h2 className="stripe-tool-name">Screen Time Horoscope</h2>
              <p className="stripe-tool-desc">
                The stars aligned — your apps didn&apos;t. Get a personalised celestial reading based on your screen time.
              </p>
              <span className="stripe-tool-cta">Get Your Horoscope ↗</span>
            </div>
          </div>
        </a>

        <div className="stripe stripe-red">
          <div className="stripe-content">
            <a href={`mailto:${homepageData?.contactEmail || "alex.beattie@vuw.ac.nz"}`} className="stripe-link">
              {homepageData?.contactText || "CONTACT THE RESEARCHER ↗"}
            </a>
          </div>
        </div>
        


      </section>
    </>
  );
}