import Link from "next/link";

const tools = [
  {
    name: "Saving Screen Space",
    description: "[Description goes here]",
    href: "/tools/saving-screen-space",
    cta: "Launch Tool →",
  },
  {
    name: "Screen Time Fortune",
    description: "[Description goes here]",
    href: "/tools/screen-time-fortune",
    cta: "Read Your Fortune →",
  },
  {
    name: "Screen Time Horoscope",
    description: "[Description goes here]",
    href: "/tools/screen-time-horoscope",
    cta: "Get Your Horoscope →",
  },
];

export default function ToolsPage() {
  return (
    <section className="section-publications">
      <div className="section-inner">
        <h1 className="section-header">Tools</h1>
        <p className="section-subheader">Explore our screen time analysis tools</p>
      </div>

      <div className="section-inner" style={{ marginTop: "4rem" }}>
        <div className="index-container">
          {tools.map((tool) => (
            <div key={tool.name} className="index-row">
              <div className="index-content">
                <h2 className="index-title">{tool.name}</h2>
                <p style={{ marginTop: "1rem", lineHeight: 1.6 }}>{tool.description}</p>
                <Link
                  href={tool.href}
                  className="stripe-link"
                  style={{ marginTop: "1.5rem", display: "inline-block" }}
                >
                  {tool.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
