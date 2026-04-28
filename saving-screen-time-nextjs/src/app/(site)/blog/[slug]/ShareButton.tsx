"use client";

import { useState, useEffect, useCallback } from "react";

interface ShareButtonProps {
  title: string;
}

const IconCopy = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const IconX = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const IconLinkedIn = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const IconBluesky = () => (
  <svg width="17" height="17" viewBox="0 0 568 501" fill="currentColor">
    <path d="M123.121 33.664C188.241 82.553 258.281 181.68 284 234.873c25.719-53.192 95.759-152.32 160.879-201.209C491.866-1.611 568-28.906 568 57.947c0 17.346-9.945 145.713-15.778 166.555-20.275 72.453-94.155 90.933-159.875 79.748C507.222 323.8 536.444 388.656 473.351 432.509 354.59 512.09 300.551 443.2 284 408.662c-16.551 34.538-70.59 103.427-189.286 23.847C31.557 388.656 60.778 323.8 175.653 304.25 109.933 315.435 36.053 296.955 15.778 224.502 9.945 203.66 0 75.293 0 57.947 0-28.906 76.135-1.611 123.121 33.664Z" />
  </svg>
);

const platforms = [
  {
    label: "Twitter / X",
    Icon: IconX,
    href: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    label: "Bluesky",
    Icon: IconBluesky,
    href: (url: string, title: string) =>
      `https://bsky.app/intent/compose?text=${encodeURIComponent(title + " " + url)}`,
  },
  {
    label: "LinkedIn",
    Icon: IconLinkedIn,
    href: (url: string, _title: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
];

export default function ShareButton({ title }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  function getUrl() {
    return typeof window !== "undefined" ? window.location.href : "";
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const inp = document.createElement("input");
      inp.value = getUrl();
      document.body.appendChild(inp);
      inp.select();
      document.execCommand("copy");
      document.body.removeChild(inp);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <>
      <button className="share-btn" onClick={() => setIsOpen(true)}>
        Share
      </button>

      {isOpen && (
        <div className="share-modal-overlay" onClick={close} aria-hidden="true">
          <div
            className="share-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Share this post"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="share-modal-header">
              <span className="share-modal-title">Share this post</span>
              <button className="share-modal-close" onClick={close} aria-label="Close" autoFocus>
                ×
              </button>
            </div>

            <button className="share-platform-btn" onClick={copyLink}>
              <span className="share-platform-icon"><IconCopy /></span>
              <span className="share-platform-label">{copied ? "Copied!" : "Copy Link"}</span>
            </button>

            <div className="share-divider" />

            {platforms.map(({ label, Icon, href }) => (
              <a
                key={label}
                className="share-platform-btn"
                href={href(getUrl(), title)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
              >
                <span className="share-platform-icon"><Icon /></span>
                <span className="share-platform-label">{label}</span>
                <span className="share-platform-arrow">↗</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
