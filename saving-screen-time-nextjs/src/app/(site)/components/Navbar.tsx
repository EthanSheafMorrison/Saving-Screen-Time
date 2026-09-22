"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => {
    setIsOpen(false);
    setDropdownOpen(false);
    setToolsOpen(false);
  };

  // Close dropdowns on outside click (desktop) and on Escape
  useEffect(() => {
    if (!dropdownOpen && !toolsOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [dropdownOpen, toolsOpen]);

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
              <Link href="/talks" onClick={closeMenu} role="menuitem">
                Talks
              </Link>
            </div>
          </div>
          <Link href="/blog" onClick={closeMenu}>Blog</Link>
          <Link href="/team" onClick={closeMenu}>Team</Link>
          <div className="nav-dropdown" ref={toolsRef}>
            <div className="nav-dropdown-split">
              <Link href="/tools" onClick={closeMenu}>Tools</Link>
              <button
                type="button"
                className="nav-dropdown-caret"
                onClick={() => setToolsOpen(!toolsOpen)}
                aria-haspopup="menu"
                aria-expanded={toolsOpen}
                aria-label="Toggle tools menu"
              >
                <span aria-hidden="true">▾</span>
              </button>
            </div>
            <div
              className={`nav-dropdown-panel ${toolsOpen ? "open" : ""}`}
              role="menu"
            >
              <Link href="/tools/screen-time-horoscope" onClick={closeMenu} role="menuitem">
                Horoscope
              </Link>
              <Link href="/tools/saving-screen-space" onClick={closeMenu} role="menuitem">
                Defacer
              </Link>
            </div>
          </div>
          <Link href="/Study" onClick={closeMenu}>Current Study</Link>
          <SearchBar onSubmit={closeMenu} />
        </div>
      </div>
    </nav>
  );
}
