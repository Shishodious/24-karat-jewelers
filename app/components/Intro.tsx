"use client";

import { useEffect, useRef } from "react";
import { INTRO_KEY } from "@/app/lib/intro";
import Wordmark from "./Wordmark";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const EASE_IN_OUT = "cubic-bezier(0.65, 0, 0.35, 1)";

// Once per session on the home page: the wordmark settles on white, a gold glint runs across it, then it
// flies into the masthead while the page fades in underneath. A click, tap or key press skips straight to the end.
// The hero's reveal waits in CSS while the overlay is in its "intro" phase and starts when the wordmark takes off.
export default function Intro() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const overlay = ref.current;
    if (!overlay || root.dataset.intro) return;
    const mark = overlay.querySelector<HTMLElement>(".opening-mark");
    const glint = overlay.querySelector<HTMLElement>(".opening-glint .wordmark");
    const line = overlay.querySelector<HTMLElement>(".opening-line");
    if (!mark || !glint || !line) return;

    const anims: Animation[] = [];
    const timers: number[] = [];
    root.style.overflow = "hidden";

    const land = () => {
      overlay.dataset.phase = "landed";
      root.style.overflow = "";
    };
    const finish = () => {
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {}
      root.dataset.intro = "skip";
    };
    const skip = () => {
      anims.forEach((a) => a.cancel());
      timers.forEach(clearTimeout);
      land();
      finish();
    };

    anims.push(
      mark.animate(
        [
          { opacity: 0, filter: "blur(8px)", transform: "scale(0.97)" },
          { opacity: 1, filter: "blur(0px)", transform: "none" },
        ],
        { duration: 700, easing: EASE, fill: "both" },
      ),
      line.animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }], {
        duration: 600,
        delay: 250,
        easing: EASE,
        fill: "both",
      }),
      glint.animate([{ backgroundPosition: "130% 0" }, { backgroundPosition: "-30% 0" }], {
        duration: 900,
        delay: 200,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        fill: "both",
      }),
    );

    // Fly to wherever the masthead wordmark actually is (it differs by screen size), taking its ink.
    timers.push(
      window.setTimeout(() => {
        const to = document.querySelector<HTMLElement>(".hdr-logo .wordmark")?.getBoundingClientRect();
        const from = mark.getBoundingClientRect();
        const ink = document.querySelector<HTMLElement>(".hdr")?.dataset.tone === "dark" ? "#fff" : "#000";
        overlay.dataset.phase = "fly"; // releases the hero's reveal, held in CSS until now
        anims.push(line.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: "forwards" }));
        if (to && from.width) {
          anims.push(
            mark.animate(
              [
                { transform: "none", color: "#000" },
                { transform: `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${to.width / from.width})`, color: ink },
              ],
              { duration: 650, easing: EASE_IN_OUT, fill: "forwards" },
            ),
          );
        }
        anims.push(
          overlay.animate([{ backgroundColor: "rgb(255 255 255 / 1)" }, { backgroundColor: "rgb(255 255 255 / 0)" }], {
            duration: 600,
            delay: 50,
            fill: "forwards",
          }),
        );
      }, 1050),
      window.setTimeout(land, 1720),
      window.setTimeout(finish, 2900),
    );

    overlay.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);
    return () => {
      anims.forEach((a) => a.cancel());
      timers.forEach(clearTimeout);
      overlay.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      root.style.overflow = "";
    };
  }, []);

  return (
    <div ref={ref} className="opening" data-phase="intro" aria-hidden="true">
      <span className="opening-mark">
        <Wordmark />
        <span className="opening-glint">
          <Wordmark />
        </span>
      </span>
      <span className="opening-line caps">Fine Indian jewellery · Since 1994</span>
      <noscript dangerouslySetInnerHTML={{ __html: "<style>.opening{display:none!important}.home .slide figure,.home .slide *{animation:none!important}</style>" }} />
    </div>
  );
}
