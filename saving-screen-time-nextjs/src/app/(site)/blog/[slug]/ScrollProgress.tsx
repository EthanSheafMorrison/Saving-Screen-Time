"use client";

import { useEffect } from "react";

export default function ScrollProgress() {
  useEffect(() => {
    let rafId: number | null = null;

    const update = () => {
      rafId = null;
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        docHeight > 0
          ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100))
          : 0;
      document.documentElement.style.setProperty(
        "--blog-scroll-progress",
        `${progress}%`
      );
    };

    const schedule = () => {
      if (rafId == null) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafId != null) cancelAnimationFrame(rafId);
      document.documentElement.style.removeProperty("--blog-scroll-progress");
    };
  }, []);

  return <div className="blog-scroll-progress" aria-hidden="true" />;
}
