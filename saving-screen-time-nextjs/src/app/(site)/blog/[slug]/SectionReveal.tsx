"use client";

import { useEffect } from "react";

export default function SectionReveal() {
  useEffect(() => {
    const body = document.body;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(".blog-post-section")
    );

    if (sections.length === 0) return;

    // Mark sections already in view as visible immediately (no animation)
    // then flag the page ready so CSS can apply the pre-reveal state to the rest
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    // Pre-mark anything already in the viewport before enabling the hidden state
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        section.classList.add("is-visible");
      }
    });

    // Enable CSS transitions after in-view sections are already marked (no flash)
    body.classList.add("blog-reveal-ready");

    // Now observe the sections that still need revealing
    sections.forEach((section) => {
      if (!section.classList.contains("is-visible")) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
      body.classList.remove("blog-reveal-ready");
    };
  }, []);

  return null;
}
