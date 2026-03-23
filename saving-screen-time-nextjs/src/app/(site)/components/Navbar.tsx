"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="nav-bar">
      <Link href="/" className="nav-logo" onClick={closeMenu}>
        Saving Screen Time
      </Link>
      <div className="nav-menu">
        <button
          className={`hamburger-button ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span />
          <span />
          <span />
        </button>
        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <Link href="/publications" onClick={closeMenu}>Publications</Link>
          <Link href="/team" onClick={closeMenu}>Team</Link>
          <Link href="/Study" onClick={closeMenu}>Current Study</Link>
        </div>
      </div>
    </nav>
  );
}
