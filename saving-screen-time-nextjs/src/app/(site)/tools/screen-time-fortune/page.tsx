import ToolPage from "../components/ToolPage";

const fortunes = [
  {
    label: "For the Heavy Social Media User",
    text: "You shall encounter a stranger bearing the same meme you laughed at alone at 2am. Take this as a sign. The algorithm knows. It has always known.",
    sig: "— The Oracle",
  },
  {
    label: "For the Productivity App Devotee",
    text: "Your calendar shall speak truth. But the meeting marked 'quick sync' will be neither quick nor synchronous. Block an hour. Bring snacks.",
    sig: "— The Oracle",
  },
  {
    label: "For the Late-Night Scroller",
    text: "The answers you seek are not in your For You page. But you already knew that. You scrolled anyway. The oracle does not judge. Much.",
    sig: "— The Oracle",
  },
];

export default function ScreenTimeFortunePage() {
  return (
    <ToolPage
      theme="fortune"
      tag="Tool — Screen Time Fortune"
      title={<>Screen Time <em>Fortune</em></>}
      subtitle="The crystal ball has been replaced. Your screen time speaks volumes."
      launchUrl="[URL_GOES_HERE]"
      ctaLabel="Read Your Fortune ↗"
      aboutQuote="The future is written in your notifications."
      aboutBody={
        <>
          <p>Screen Time Fortune is a tongue-in-cheek fortune-telling tool for the digitally overexposed. Feed it your screen time data — your daily totals, most-used apps, peak hours — and receive a personalised fortune that reads your habits like tea leaves. Part prophecy, part gently savage observation, always eerily on-point.</p>
          <p>Ancient divination traditions imagined the future in clouds, palms, and tarot cards. We imagine it in your push notifications, your 11pm TikTok sessions, and the seventeen unopened emails you are definitely getting to tomorrow. The oracle sees all. The oracle has opinions about your screen habits. The oracle means well.</p>
        </>
      }
      featuresTitle={<>The Oracle <em>Speaks</em></>}
      features={[
        {
          num: "01",
          title: "Share Your Screen Time",
          body: "Upload or enter your weekly screen time data. Our system reads your digital habits like tea leaves — patterns, totals, time of day, apps you pretend you don't use.",
        },
        {
          num: "02",
          title: "The Oracle Interprets",
          body: "Ancient fortune-telling traditions, reimagined for the digital age. Your most-used apps become symbolic archetypes that shape your personal fortune.",
        },
        {
          num: "03",
          title: "Receive Your Fortune",
          body: "A personalised reading — part prophecy, part gentle nudge. What does your screen time say about what's coming? The oracle has been waiting.",
        },
      ]}
      extraSection={
        <section className="tool-extra">
          <div className="section-inner">
            <div className="section-label">A Glimpse of Your Fortune</div>
            <div className="section-title">The Oracle <em>Previews</em></div>
            <div className="fortune-cards">
              {fortunes.map((f) => (
                <div key={f.label} className="fortune-card reveal">
                  <div className="fortune-card-label">{f.label}</div>
                  <div className="fortune-card-text">{f.text}</div>
                  <div className="fortune-card-sig">{f.sig}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      }
    />
  );
}
