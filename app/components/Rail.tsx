"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "./Icon";

type Pos = { start: number; size: number; atStart: boolean; atEnd: boolean };

// A horizontal shelf with a hairline progress bar and arrow buttons for mouse users; touch and trackpads just scroll.
export default function Rail({ children, label }: { children: React.ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<Pos>({ start: 0, size: 1, atStart: true, atEnd: false });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setPos({
      start: el.scrollWidth ? el.scrollLeft / el.scrollWidth : 0,
      size: el.scrollWidth ? el.clientWidth / el.scrollWidth : 1,
      atStart: el.scrollLeft <= 2,
      atEnd: el.scrollLeft >= max - 2,
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  const move = (dir: 1 | -1) => {
    const el = ref.current;
    el?.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: "smooth" });
  };

  return (
    <div className="shelf">
      <div ref={ref} className="rail" onScroll={measure} role="region" aria-label={label} tabIndex={0}>
        {children}
      </div>
      <div className="shelf-foot">
        <div className="shelf-bar" aria-hidden="true">
          <i style={{ left: `${pos.start * 100}%`, width: `${pos.size * 100}%` }} />
        </div>
        <div className="shelf-nav">
          <button type="button" aria-label="Previous pieces" disabled={pos.atStart} onClick={() => move(-1)}>
            <span className="flip">
              <Icon name="arrow" size={18} />
            </span>
          </button>
          <button type="button" aria-label="More pieces" disabled={pos.atEnd} onClick={() => move(1)}>
            <Icon name="arrow" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
