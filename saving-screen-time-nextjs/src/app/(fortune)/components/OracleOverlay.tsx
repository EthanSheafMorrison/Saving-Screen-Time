"use client";

import { useState } from "react";
import HoroscopeModal from "../../(site)/tools/screen-time-horoscope/HoroscopeModal";

// The booth tag opens the oracle. This is the same component the live horoscope
// tool page uses, so the two never drift apart. It sits over the fortune page,
// which is what a visitor lands on if they close the oracle — and what they read
// directly when JS is unavailable, since the layout hides this overlay.
export default function OracleOverlay() {
  const [open, setOpen] = useState(true);

  return <HoroscopeModal open={open} onClose={() => setOpen(false)} />;
}
