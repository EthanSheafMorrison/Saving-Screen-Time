import Link from "next/link";
import {
  DefacerCharacter,
  FortuneCharacter,
  HoroscopeCharacter,
} from "./components/PixelCharacters";

const tools = [
  {
    num: "01",
    tag: "Browser Extension",
    name: ["Screen Space", "Defacer"],
    description:
      "A browser extension to erase, deface, and reimagine any web page. Delete elements, draw graffiti, blur images — the whole web becomes your canvas.",
    href: "/tools/saving-screen-space",
    cta: "Get the Extension →",
    theme: "defacer",
    Character: DefacerCharacter,
  },
  {
    num: "02",
    tag: "Screen Time Tool",
    name: ["Screen Time", "Fortune"],
    description:
      "Your screen time data, read as a mystical fortune. The oracle has seen your notification habits. It has thoughts.",
    href: "/tools/screen-time-fortune",
    cta: "Read Your Fortune →",
    theme: "fortune",
    Character: FortuneCharacter,
  },
  {
    num: "03",
    tag: "Screen Time Tool",
    name: ["Screen Time", "Horoscope"],
    description:
      "The stars aligned — your apps didn't. Get a personalised celestial reading based entirely on your screen time habits.",
    href: "/tools/screen-time-horoscope",
    cta: "Get Your Horoscope →",
    theme: "horoscope",
    Character: HoroscopeCharacter,
  },
];

export default function ToolsPage() {
  return (
    <div className="tools-index">
      <div className="tools-index-header">
        <span className="tools-index-eyebrow">Saving Screen Time</span>
        <h1 className="tools-index-title">Tools</h1>
      </div>

      {tools.map(({ Character, ...tool }) => (
        <Link key={tool.num} href={tool.href} className={`tool-band tool-band--${tool.theme}`}>
          <div className="tool-band-num">{tool.num}</div>
          <div className="tool-band-body">
            <div className="tool-band-tag">{tool.tag}</div>
            <h2 className="tool-band-name">
              {tool.name.map((line, i) => <span key={i}>{line}</span>)}
            </h2>
            <p className="tool-band-desc">{tool.description}</p>
          </div>
          <div className="tool-band-cta-wrap">
            <div className="tool-band-character">
              <Character />
            </div>
            <div className="tool-band-cta">{tool.cta}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
