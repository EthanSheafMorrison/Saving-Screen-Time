import ToolPage from "../components/ToolPage";

const capabilities = [
  {
    icon: "✕",
    title: "Erase Text",
    body: "Wipe words from existence. Headlines, paragraphs, captions — all gone with a single click.",
  },
  {
    icon: "⌫",
    title: "Delete Elements",
    body: "Remove any element from the page entirely. Ads, popups, banners, entire sections — vanished.",
  },
  {
    icon: "✎",
    title: "Draw Graffiti",
    body: "Paint directly on any web page with a freehand brush. Leave your mark. Make it strange.",
  },
  {
    icon: "◫",
    title: "Blur Images",
    body: "Obscure any image with a blur effect. For focus, privacy, or pure aesthetic disruption.",
  },
  {
    icon: "✍",
    title: "Annotate Pages",
    body: "Leave notes and markup directly on any page. Think of it as a margin full of your best ideas.",
  },
  {
    icon: "⤢",
    title: "Resize Sections",
    body: "Stretch, shrink, and distort any element on the page. Recompose the web as you see fit.",
  },
];

export default function SavingScreenSpacePage() {
  return (
    <ToolPage
      theme="defacer"
      tag="Tool — Screen Space Defacer"
      title={<>Screen Space <em>Defacer</em></>}
      subtitle="A browser extension to destroy, manipulate, and reimagine any web page."
      launchUrl="[URL_GOES_HERE]"
      ctaLabel="Get the Extension ↗"
      aboutQuote="Every page is a canvas. Every element is yours to do with as you please."
      aboutBody={
        <>
          <p>Screen Space Defacer is a browser extension that hands you complete control over every web page you visit. Delete elements, draw over images, erase text, blur sections, annotate layouts, or resize the whole thing. The web was built to be consumed — this tool lets you consume it differently. Break it, rebuild it, make it yours.</p>
          <p>Born out of research into screen time and digital wellbeing, Screen Space Defacer is also a tool for critical engagement with the web. Scraping away the noise, making visible what usually fades into the background, and reclaiming a sense of authorship over the digital spaces you occupy. Use it to focus. Use it to play. Use it to defamiliarise the familiar.</p>
        </>
      }
      featuresTitle={<>Take <em>Control</em></>}
      features={[
        {
          num: "01",
          title: "Install the Extension",
          body: "Add Screen Space Defacer to your browser in seconds. Works with Chrome, Firefox, and Edge — no account, no sign-up, no nonsense.",
        },
        {
          num: "02",
          title: "Select Your Target",
          body: "Navigate to any web page. Click any element to select it. The entire web becomes your canvas — text, images, layouts, entire sections.",
        },
        {
          num: "03",
          title: "Destroy & Create",
          body: "Erase content, draw graffiti, resize sections, annotate pages, or delete elements entirely. Make it yours, make it strange, make it art.",
        },
      ]}
      extraSection={
        <section className="tool-extra">
          <div className="section-inner">
            <div className="section-label">What You Can Do</div>
            <div className="section-title">Tools of <em>Destruction</em></div>
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
      }
    />
  );
}
