"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { brand } from "@/app/lib/site";
import { useBag } from "./BagProvider";
import Menu from "./Menu";
import Wordmark from "./Wordmark";

type Over = { tone: string; clear: boolean; big: boolean };

// The header reads whatever sits under it: a [data-tone] section makes it transparent and sets the ink,
// and [data-logo="big"] (the home slides) blows the wordmark up ("wide": only on wide screens). Anywhere else it is plain white.
export default function Header() {
  const pathname = usePathname();
  const { count } = useBag();
  const [menu, setMenu] = useState(false);
  const [over, setOver] = useState<Over>({ tone: "light", clear: false, big: false });

  useEffect(() => {
    let frame = 0;
    const probe = () => {
      frame = 0;
      let hit: HTMLElement | undefined;
      for (const el of document.querySelectorAll<HTMLElement>("main [data-tone]")) {
        const r = el.getBoundingClientRect();
        if (r.top <= 28 && r.bottom > 28) hit = el;
      }
      const logo = hit?.dataset.logo;
      const big = logo === "big" || (logo === "wide" && window.innerWidth >= 900);
      const next = { tone: hit?.dataset.tone ?? "light", clear: !!hit, big };
      setOver((o) => (o.tone === next.tone && o.clear === next.clear && o.big === next.big ? o : next));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(probe);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    document.documentElement.classList.add("locked");
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("locked");
      window.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  const close = () => setMenu(false);

  return (
    <>
      <header
        className="hdr"
        data-tone={menu ? "light" : over.tone}
        data-clear={!menu && over.clear ? "" : undefined}
        data-big={!menu && over.big ? "" : undefined}
      >
        <div className="hdr-left">
          <button
            type="button"
            className="burger"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            aria-controls="menu"
            onClick={() => setMenu((m) => !m)}
          >
            <span />
            <span />
          </button>
          <Link href="/" className="hdr-logo" aria-label={`${brand.name}, home`} onClick={close}>
            <Wordmark />
          </Link>
        </div>
        <nav className="hdr-right" aria-label="Utility">
          <Link href="/search" className="hdr-search" onClick={close}>
            Search
          </Link>
          <Link href="/stores" className="hdr-link hide-md" onClick={close}>
            Stores
          </Link>
          <Link href="/house" className="hdr-link hide-md" onClick={close}>
            The House
          </Link>
          <Link href="/bag" className="hdr-link" onClick={close} aria-label={`Bag, ${count} ${count === 1 ? "item" : "items"}`}>
            Bag <span className="hdr-count">[{count}]</span>
          </Link>
        </nav>
      </header>
      <Menu open={menu} onClose={close} />
    </>
  );
}
