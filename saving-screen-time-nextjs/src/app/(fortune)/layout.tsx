import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import { Analytics } from "@vercel/analytics/next";
import { FORTUNE_CSS } from "./styles";

// Root layout for the booth pages, reached by NFC tap or QR scan at the
// exhibit. It looks like the (site) tool pages but is kept apart from that
// layout so a cold load on conference wifi skips the site's Google Fonts,
// global stylesheet, navbar scripts and grain script.

export const metadata: Metadata = {
  title: "Screen Time Fortune | Saving Screen Time",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050505",
  colorScheme: "dark",
};

// Fonts used above the fold. DM Sans 400 is only in the footer.
const PRELOAD_FONTS = [
  "ibm-plex-mono-400",
  "ibm-plex-mono-600",
  "eb-garamond-700",
  "eb-garamond-italic-400",
  "dm-sans-700",
  "dm-sans-900",
];

export default function FortuneLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  for (const font of PRELOAD_FONTS) {
    preload(`/fonts/${font}.woff2`, { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  }

  return (
    <html lang="en-GB">
      <head>
        <style dangerouslySetInnerHTML={{ __html: FORTUNE_CSS }} />
        {/* Copying needs JS, so without it the copy button is hidden and a hint shows instead. */}
        <noscript dangerouslySetInnerHTML={{ __html: "<style>.copy,.copy-status{display:none}</style>" }} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
