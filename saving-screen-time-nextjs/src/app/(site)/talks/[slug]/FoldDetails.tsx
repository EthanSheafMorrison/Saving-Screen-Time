"use client";

import { useEffect, useRef } from "react";

// Collapsible wrapper for a folding guide, closed until someone opens it.
// It toggles on its own without JavaScript; this only adds the shortcut from a
// download button's "How to print and fold" link, which would otherwise scroll
// to a closed guide and appear to do nothing.

export default function FoldDetails({
  id,
  summary,
  children,
}: {
  id: string;
  summary: React.ReactNode;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const openIfTargeted = () => {
      if (!ref.current || window.location.hash !== `#${id}`) return;
      ref.current.open = true;
      ref.current.scrollIntoView();
    };

    // Also catch a repeat click on the same link, which fires no hashchange.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a");
      if (ref.current && link?.getAttribute("href") === `#${id}`) {
        ref.current.open = true;
      }
    };

    openIfTargeted();
    window.addEventListener("hashchange", openIfTargeted);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", openIfTargeted);
      document.removeEventListener("click", onClick);
    };
  }, [id]);

  return (
    <details ref={ref} id={id} className="fold-guide">
      <summary className="fold-summary">{summary}</summary>
      <div className="fold-details-body">{children}</div>
    </details>
  );
}
