"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import styles from "./RollingText.module.css";

/**
 * Depth cues. The CSS resting state mirrors these approximately — that state is
 * only ever on screen for the frame before this file attaches, so small drift
 * between the two is invisible and not worth chasing.
 *
 * Opacity hits zero near 78°, so a face is always gone before it could turn far
 * enough to show its back.
 */
const FADE = 1.15;
const BLUR_MAX = 5;
/** Used only if the CSS variable can't be read (it always can). */
const FALLBACK_STEP_DEG = 28;

export interface RollingTextProps {
  /** One node per face of the drum. Anything renderable — including a heading. */
  lines: ReactNode[];
  /**
   * The scroll window, in viewport heights, measured against the drum's own
   * centre: the roll starts when the centre is `from` down the screen and lands
   * on the last line at `to`, then holds. The defaults finish the roll as the
   * drum reaches the middle of the viewport, so the final line — the payoff —
   * is what sits there while the reader has stopped.
   */
  from?: number;
  to?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Scroll-driven 3D text drum: the lines sit on the surface of a horizontal
 * cylinder, so the face turned toward you reads at full size while its
 * neighbours curve away — squashed, dimmed and blurred — above and below.
 * Scrolling rotates the cylinder, rolling the next line into place.
 *
 * The geometry lives in CSS (`--rt-step`, `--rt-radius`) rather than here, so
 * the drum retunes without touching this file and the first paint already has
 * every face parked at its resting angle. This component only reads the step
 * back out, fits the type, and drives the rotation.
 */
export function RollingText({
  lines,
  from = 1.35,
  to = 0.5,
  className,
  style,
}: RollingTextProps) {
  const drumRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const drum = drumRef.current;
    if (!drum) return;
    const last = lines.length - 1;
    if (last < 0) return;

    const step =
      parseFloat(getComputedStyle(drum).getPropertyValue("--rt-step")) || FALLBACK_STEP_DEG;

    /**
     * Every face shares one type size — the em-based radius is derived from it,
     * so mixed sizes would put the lines on different cylinders. So the widest
     * line decides: measure them all at the CSS-declared size and scale the
     * whole drum down if that one would overflow.
     *
     * `offsetWidth` on the inner span is the measurement that works here: it is
     * layout width, unaffected by the 3D transforms on the ancestors, and it
     * reports the true text width even though the faces are centre-aligned
     * (a centred overflow would under-report through scrollWidth).
     */
    const fitType = () => {
      drum.style.fontSize = "";
      const avail = drum.clientWidth;
      if (!avail) return;
      let widest = 0;
      drum.querySelectorAll<HTMLElement>(`.${styles.lineInner}`).forEach((el) => {
        widest = Math.max(widest, el.offsetWidth);
      });
      if (widest > avail) {
        const base = parseFloat(getComputedStyle(drum).fontSize);
        drum.style.fontSize = `${Math.max(10, Math.floor((base * avail) / widest))}px`;
      }
    };

    /* `p` is a face index, fractional between faces. Opacity and blur follow the
       ANGLE rather than the index, so a line fades exactly as it turns away. */
    const place = (p: number) => {
      for (let i = 0; i <= last; i++) {
        const el = lineRefs.current[i];
        if (!el) continue;
        const deg = (p - i) * step;
        const k = Math.min(Math.abs(deg) / 90, 1);
        el.style.transform =
          `translateZ(calc(var(--rt-radius) * -1)) ` +
          `rotateX(${deg.toFixed(2)}deg) translateZ(var(--rt-radius))`;
        el.style.opacity = `${Math.max(0, 1 - k * FADE).toFixed(3)}`;
        el.style.filter = k > 0.12 ? `blur(${(k * BLUR_MAX).toFixed(2)}px)` : "none";
      }
    };

    /* Reduced motion keeps the shape but drops the scroll coupling: the drum
       rests on its final line, which is the one that carries the message. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fitType();
      place(last);
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = drum.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Far off-screen: leave the last placement alone rather than burn frames.
      if (rect.bottom < -vh || rect.top > vh * 2) return;
      const centre = rect.top + rect.height / 2;
      const span = (from - to) * vh || 1;
      const t = Math.min(Math.max((from * vh - centre) / span, 0), 1);
      place(t * last);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      fitType();
      onScroll();
    };

    fitType();
    update();
    /* A webfont landing after first paint measures differently from the
       fallback, which would leave the drum sized for the wrong face. */
    document.fonts?.ready.then(onResize).catch(() => {});
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [lines.length, from, to]);

  return (
    <div ref={drumRef} className={`${styles.drum} ${className ?? ""}`} style={style}>
      {/* The camera. Kept clear of the clip + mask on the wrapper above, which
          are grouping properties an engine may flatten a 3D context for. */}
      <div className={styles.scene}>
        {lines.map((line, i) => (
          <div
            key={i}
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
            className={styles.line}
            style={{ "--i": i } as CSSProperties}
          >
            {/* Inner box exists to be measured — see fitType(). A div, not a
                span: a face may legitimately carry a heading. */}
            <div className={styles.lineInner}>{line}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RollingText;
