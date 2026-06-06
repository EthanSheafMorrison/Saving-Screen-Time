import ToolPage from "../components/ToolPage";

const capabilities = [
  {
    icon: "✎",
    title: "Scribble & Doodle",
    body: "Paint directly onto any ad with a freehand brush. Loop, scrawl, deface. The banner stops being a demand and becomes a surface you can touch.",
  },
  {
    icon: "✕",
    title: "Cross It Out",
    body: "Wipe words from existence. Slogans, calls-to-action, that 'BUY NOW' — struck through and worn down.",
  },
  {
    icon: "◫",
    title: "Smear & Blur",
    body: "Obscure any image with a blur. Smudge the polish off the pitch until it can't quite reach you.",
  },
  {
    icon: "✍",
    title: "Talk Back",
    body: "Leave notes and markup in the margins of the web. Answer the ad. Argue with it. Make it yours.",
  },
  {
    icon: "⤢",
    title: "Squash & Stretch",
    body: "Grab any element and distort it. Shrink the sponsored post into a speck, or stretch it into nonsense.",
  },
  {
    icon: "⌫",
    title: "Wear It Down",
    body: "Remove a piece entirely once you're done with it — but only after you've had your turn marking it up.",
  },
];

const pillars = [
  {
    icon: "✎",
    title: "Fidgeting is knowing",
    body: "Drawing on the desk was never the problem. Fidgeting, doodling, and tinkering are how a lot of restless minds stay in a space at all — not failures to fix.",
  },
  {
    icon: "≈",
    title: "Friction is access",
    body: "Feeds are sold to us as 'frictionless' — but smooth for whom? Sometimes the accessible thing isn't removing every bump, it's adding the right ones so you can find your own rhythm.",
  },
  {
    icon: "▦",
    title: "Ads are public space",
    body: "A banner isn't neutral infrastructure. It's more like a billboard in a city — contested public space that people have always defaced, parodied, and reclaimed.",
  },
  {
    icon: "↩",
    title: "Scribble back",
    body: "This won't topple the attention economy. It's a small, repeatable ritual of refusal — a way of saying digital space could be otherwise.",
  },
];

export default function SavingScreenSpacePage() {
  return (
    <ToolPage
      theme="defacer"
      tag="Tool — Screen Space Defacer"
      title={<>Screen Space <em>Defacer</em></>}
      subtitle="A browser extension that lets you scratch, smear, and scribble back at the ads that fill your screen."
      launchUrl="[URL_GOES_HERE]"
      ctaLabel="Get the Extension ↗"
      heroDecoration={
        <svg
          className="hero-scribble-deco"
          viewBox="0 0 900 420"
          fill="none"
          aria-hidden="true"
        >
          {/* big wandering scrawl across the title */}
          <path
            className="scribble-path scribble-path--1"
            d="M60 200 C 140 120, 220 280, 340 180 S 500 280, 620 160 S 780 260, 880 140"
            stroke="currentColor" strokeWidth="5" strokeLinecap="round"
          />
          {/* cross-out slash pair over the centre */}
          <path
            className="scribble-path scribble-path--2"
            d="M200 130 L 680 300"
            stroke="currentColor" strokeWidth="6" strokeLinecap="round"
          />
          <path
            className="scribble-path scribble-path--3"
            d="M200 300 L 680 130"
            stroke="currentColor" strokeWidth="6" strokeLinecap="round"
          />
          {/* restless loop / doodle bottom-left */}
          <path
            className="scribble-path scribble-path--4"
            d="M80 340 C 120 290, 180 380, 160 320 S 100 260, 150 300 S 220 360, 200 310"
            stroke="currentColor" strokeWidth="4" strokeLinecap="round"
          />
          {/* tight spiral top-right */}
          <path
            className="scribble-path scribble-path--5"
            d="M780 80 C 820 50, 860 90, 840 120 C 820 150, 780 140, 790 110 C 800 85, 825 88, 815 108"
            stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"
          />
          {/* underline scrawl beneath */}
          <path
            className="scribble-path scribble-path--6"
            d="M120 380 q 80 -28 160 8 t 180 -8 t 200 10 t 180 -12"
            stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"
          />
        </svg>
      }
      aboutQuote="If you were the kid who drew on the desk — what might it mean to start drawing on your Screen?"
      aboutBody={
        <>
          <p>Were you the kid who drew on the desk? Shaded in the margins, carved patterns into the wood, couldn&apos;t quite sit still? Today&apos;s internet is barely bearable — ads on every surface, feeds tuned for maximum stickiness, your attention measured and sold. Screen Space Defacer hands the desk back. It&apos;s a browser extension that lets you scratch, smear, and scribble over the ads instead of just tolerating them or hiding them away. Where an ad blocker makes the commercial layer <em>invisible</em>, this makes it <em>tangible</em> — a banner stops being a one-way demand for your attention and becomes a surface you can touch, mark, and slowly wear down.</p>
          <p>That matters more than it sounds. Feeds are sold to us as &quot;frictionless&quot; — infinite scroll, autoplay, tap to continue — but smooth isn&apos;t neutral, and it isn&apos;t smooth for everyone. Sometimes the thing that makes a space livable isn&apos;t removing every bump; it&apos;s adding the right texture so different minds can find their own rhythm. Born out of research into screen time and digital wellbeing, the Defacer treats your wandering, doodling, fidgeting attention not as a failure to be corrected, but as a way of knowing the web could be otherwise. Use it to focus. Use it to play. Use it to make staying online bearable on your own terms.</p>
        </>
      }
      hideFeatures
      featuresTitle={<>Scratch <em>Back</em></>}
      features={[]}
      extraSection={
        <>
          <section className="tool-extra">
            <div className="section-inner">
              <div className="section-label">What You Can Do</div>
              <div className="section-title">Ways to <em>Scratch Back</em></div>
              <div className="caps-grid">
                {capabilities.map((c) => (
                  <div key={c.title} className="cap-card reveal">
                    <div className="cap-icon">{c.icon}</div>
                    <div className="cap-title">{c.title}</div>
                    <div className="cap-body">{c.body}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="tool-extra defacer-sandbox">
            <div className="section-inner sandbox-header">
              <div className="section-label">Try It</div>
              <div className="section-title">The <em>Sandbox</em></div>
              <p className="sandbox-intro">The Infinite Feed Gazette — all the news that fits between your ads. Pick a tool from the toolbar and start defacing. The ads are load-bearing; try removing one.</p>
            </div>
            <div className="sandbox-frame-wrap reveal">
              <iframe
                src="https://saving-screen-space.vercel.app"
                title="Screen Space Defacer — Ad Putty Sandbox"
                className="sandbox-frame"
                allowFullScreen
              />
            </div>
          </section>

          <section className="tool-extra defaced-demo">
            <div className="section-inner">
              <div className="section-label">From desk to display</div>
              <div className="section-title">A Banner Is Just a <em>Desk</em></div>
              <div className="defaced-ad reveal">
                <div className="defaced-ad-tag">Sponsored</div>
                <div className="defaced-ad-headline">BUY NOW — Limited Time Only!</div>
                <div className="defaced-ad-sub">You deserve this. Don&apos;t miss out. Click to continue →</div>
                <svg className="defaced-ad-scrawl" viewBox="0 0 700 200" fill="none" aria-hidden="true" preserveAspectRatio="none">
                  <path d="M40 120 L 360 70" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                  <path d="M40 80 L 360 130" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                  <path d="M420 60 c 60 -30 120 50 60 80 s -130 0 -70 -60" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                  <path d="M60 160 q 80 -40 160 0 t 160 0 t 160 -10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  <path d="M500 150 l 30 25 m 0 -25 l -30 25" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="defaced-caption">Same ad. Same metric says you&apos;re still &quot;engaged.&quot; But the engagement now belongs to you — not the advertiser.</p>
            </div>
          </section>

          <section className="tool-extra">
            <div className="section-inner">
              <div className="section-label">Why it matters</div>
              <div className="section-title">Why Scribbling <em>Counts</em></div>
              <div className="caps-grid">
                {pillars.map((p) => (
                  <div key={p.title} className="cap-card reveal">
                    <div className="cap-icon">{p.icon}</div>
                    <div className="cap-title">{p.title}</div>
                    <div className="cap-body">{p.body}</div>
                  </div>
                ))}
              </div>
              <blockquote className="defacer-provocation reveal">
                If you were the kid who drew on the desk, what might it mean to start drawing on your newsfeed?
              </blockquote>
            </div>
          </section>

          <section className="help defacer-steps" id="features">
            <div className="section-inner">
              <div className="section-label">How it works</div>
              <div className="section-title">Scratch <em>Back</em></div>
              <div className="steps-grid">
                <div className="step-card reveal">
                  <div className="step-num">01</div>
                  <div className="step-title">Install the Extension</div>
                  <div className="step-body">Add Screen Space Defacer to your browser in seconds. Works with Chrome, Firefox, and Edge — no account, no sign-up, no nonsense.</div>
                </div>
                <div className="step-card reveal">
                  <div className="step-num">02</div>
                  <div className="step-title">Find an Ad</div>
                  <div className="step-body">Land on any page and point at whatever&apos;s shouting for your attention — a banner, a sponsored post, a popup. That commercial surface is now a desk you&apos;re allowed to draw on.</div>
                </div>
                <div className="step-card reveal">
                  <div className="step-num">03</div>
                  <div className="step-title">Scribble Back</div>
                  <div className="step-body">Scratch, smear, doodle, cross it out, wear it down. Turn the ad slot into a site of fidgeting and refusal. Make it strange, make it yours, make it bearable.</div>
                </div>
              </div>
            </div>
          </section>
        </>
      }
    />
  );
}
