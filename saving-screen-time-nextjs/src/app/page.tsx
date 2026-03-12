import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="sec-hero">
        <div className="hero-plus hp-tr">+</div>
        <div className="hero-plus hp-bl">+</div>

        <div className="hero-content-wrapper">
          <Image
            src="/Images/Logo.svg"
            alt="Logo graphic"
            width={800}
            height={480}
            className="hero-logo"
          />

          <div className="hero-label">
            a research project by Alex Beattie
          </div>
          <div className="stripe-content hero-intro-text">
            The project examines the benefits and challenges of connecting and
            disconnecting from the internet for people with ADHD, who may have
            different needs and preferences than neurotypical users.It draws
            from disability studies to critique normative and ableist
            assumptions behind the concept of disconnecting.
          </div>
        </div>
        <Image
          src="/Images/slice1.png"
          alt="Slice graphic"
          width={500}
          height={500}
          className="brutal-image-small brutal-image-slice"
        />
      </section>

      <section className="sec-yellow">
        <h2 className="giant-bg-text">
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

        <div className="black-content">
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
          className="brutal-image-small brutal-image-horse"
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

        <div className="stripe stripe-red">
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
