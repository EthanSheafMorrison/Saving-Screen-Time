import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="sec-hero" style={{ position: "relative", overflow: "hidden" }}>
        <div className="hero-plus hp-tr">+</div>
        <div className="hero-plus hp-bl">+</div>

        <nav className="nav-bar">
          <a href="/" className="nav-logo">
            Saving Screen Time
          </a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#">Archive</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

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
            a research project by Alex Beattie
          </div>
          <div
            className="stripe-content"
            style={{ margin: "3em", transform: "translateX(-80%)" }}
          >
            The project examines the benefits and challenges of connecting and
            disconnecting from the internet for people with ADHD, who may have
            different needs and preferences than neurotypical users.It draws
            from disability studies to critique normative and ableist
            assumptions behind the concept of disconnecting.
          </div>
        </div>
      </section>
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
          zIndex: 99,
        }}
      />

      <section className="sec-yellow">
        <h2 className="giant-bg-text" style={{ marginTop: "-.02em" }}>
          ADHD
          <br />
          CRIP
        </h2>

        <div className="yellow-content">
          <p>
            Saving Screen Time is a research project exploring how New
            Zealanders with Attention Deficit Hyperactivity Disorder
            experience and manage their internet use. We are investigating
            inclusive and practical disconnection strategies.
          </p>
        </div>
      </section>

      <section className="sec-black">
        <div className="floating-neon-box">
          <h3>
            Crip Time <span>✕</span>
          </h3>
          <p>
            This project uses the theoretical framework of crip time to examine
            the interrelationship between people, digital technologies,
            temporality, and social norms around productivity. Crip time is
            about bending the clock to suit disabled bodies and minds, rather
            than forcing disabled bodies and minds to meet the clock.
          </p>
        </div>

        <div
          className="black-content"
          style={{ padding: "1rem 1rem", transform: "translateY(-20%)" }}
        >
          <h2>
            Often at the root of calls to disconnect is a fear of cognitive
            difference, becoming unproductive or anything other than what
            currently counts as neurotypical.
          </h2>
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
            zIndex: 9999,
          }}
        />
      </section>

      <section className="sec-stripes">
        <div className="stripe stripe-blue">
          <div className="stripe-giant-text">DISCONNECT</div>
        </div>

        <div className="stripe stripe-yellow">
          <div className="stripe-content">
            The project examines the benefits and challenges of connecting and
            disconnecting from the internet for people with ADHD, who may have
            different needs and preferences than neurotypical users.It draws
            from disability studies to critique normative and ableist
            assumptions behind the concept of disconnecting.
          </div>
        </div>

        <div className="stripe stripe-green">
          <div className="stripe-content">
            <a
              href="mailto:alex.beattie@vuw.ac.nz"
              className="stripe-link"
            >
              CONTACT THE RESEARCHER ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
