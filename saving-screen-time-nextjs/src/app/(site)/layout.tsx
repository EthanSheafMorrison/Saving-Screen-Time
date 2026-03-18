import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "./components/Navbar"; /* Make sure this path is correct */
import "./globals.css"; /* Make sure this path is correct */

export const metadata: Metadata = {
  title: "Saving Screen Time",
  description: "A research project by Alex Beattie",
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        {children}
        <Script src="/grained.min.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}