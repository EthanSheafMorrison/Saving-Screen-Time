"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

const SOURCES = ["tap", "qr", "card"];

// Records how the page was reached (?src=tap for the NFC tag, qr for receipts,
// card for printed cards) so placements can be compared in Vercel Analytics.
// The parameter is then dropped from the address bar, so a shared link isn't
// counted as another tap or scan.
export default function TrackSource({ page }: { page: string }) {
  useEffect(() => {
    // <Analytics /> creates the event queue in its own effect, which runs after
    // this one, and track() drops events until the queue exists. Create it
    // first, the same way the library does; its script drains it on load.
    window.va =
      window.va ||
      ((event, properties) => {
        (window.vaq = window.vaq || []).push([event, properties]);
      });

    const url = new URL(window.location.href);
    const src = url.searchParams.get("src")?.trim().toLowerCase();
    track("fortune_open", { page, src: !src ? "none" : SOURCES.includes(src) ? src : "other" });

    if (url.searchParams.has("src")) {
      url.searchParams.delete("src");
      window.history.replaceState(window.history.state, "", url);
    }
  }, [page]);

  return null;
}
