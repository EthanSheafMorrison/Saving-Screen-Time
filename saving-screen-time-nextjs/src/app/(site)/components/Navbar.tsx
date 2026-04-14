"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => {
    setIsOpen(false);
    setDropdownOpen(false);
  };

  // Close dropdown on outside click (desktop) and on Escape
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [dropdownOpen]);

  return (
    <nav className="nav-bar">
<Link href="/" onClick={closeMenu} className="home-link">
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
    
     {' '}Saving Screen Time
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
          <div className="nav-dropdown" ref={dropdownRef}>
            <button
              type="button"
              className="nav-dropdown-toggle"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-haspopup="menu"
              aria-expanded={dropdownOpen}
            >
              Media <span aria-hidden="true">▾</span>
            </button>
            <div
              className={`nav-dropdown-panel ${dropdownOpen ? "open" : ""}`}
              role="menu"
            >
              <Link href="/publications" onClick={closeMenu} role="menuitem">
                Publications
              </Link>
              <Link href="/media" onClick={closeMenu} role="menuitem">
                Press
              </Link>
            </div>
          </div>
          <Link href="/blog" onClick={closeMenu}>Blog</Link>
          <Link href="/team" onClick={closeMenu}>Team</Link>
          <Link href="/Study" onClick={closeMenu}>Current Study</Link>
          <SearchBar onSubmit={closeMenu} />
        </div>
      </div>
    </nav>
  );
}
