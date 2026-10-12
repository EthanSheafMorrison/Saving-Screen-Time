"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "sst-reader-mode";

// Toggles a plain, high-contrast reading layout (styled in globals.css under
// html[data-reader="on"]). The choice is remembered across posts.
export default function ReaderModeButton() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "on") setOn(true);
    } catch {
      // storage unavailable (private window): the button still works for this page
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (on) root.dataset.reader = "on";
    else delete root.dataset.reader;
    // only posts carry the button, so don't leave other pages restyled
    return () => {
      delete root.dataset.reader;
    };
  }, [on]);

  function toggle() {
    const next = !on;
    setOn(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    } catch {
      // see above
    }
  }

  return (
    <button
      type="button"
      className="share-btn reader-btn"
      aria-pressed={on}
      onClick={toggle}
    >
      <span aria-hidden="true">{on ? "✓" : "Aa"}</span>
      Reader mode
    </button>
  );
}
