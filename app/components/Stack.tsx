"use client";

import { useEffect, useRef } from "react";

// The home's opening pages are sticky and stack: each one slides up over the last, which sinks back and
// darkens as it's covered. This only writes --covered (0 to 1) on each page; the CSS does the rest.
export default function Stack({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pages = Array.from(root.children) as HTMLElement[];
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight || 1;
      pages.forEach((page, i) => {
        const next = pages[i + 1];
        const covered = next ? Math.min(1, Math.max(0, 1 - next.getBoundingClientRect().top / vh)) : 0;
        page.style.setProperty("--covered", covered.toFixed(3));
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div ref={ref} className="stack">
      {children}
    </div>
  );
}
