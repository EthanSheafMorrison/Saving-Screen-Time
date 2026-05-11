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