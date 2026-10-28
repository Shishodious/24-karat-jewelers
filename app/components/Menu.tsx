"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { brand, collections, menu } from "@/app/lib/site";
import { vars } from "@/app/lib/style";
import GoldRate from "./GoldRate";

type Item = { label: string; href: string; image?: string; note?: string };

const tabs: { id: string; label: string; items: Item[] }[] = [
  { id: "shop", label: "Jewellery", items: menu.shop },
  {
    id: "collections",
    label: "Collections",
    items: collections.map((c) => ({ label: c.name, href: `/collections/${c.id}`, image: c.hero[0], note: c.line })),
  },
  { id: "house", label: "The House", items: menu.house },
];

const fallback = "/images/editorial/polki-nath.jpg";

export default function Menu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState(tabs[0].id);
  const [hover, setHover] = useState<string | null>(null);
  const current = tabs.find((t) => t.id === tab)!;
  const images = [...new Set(tabs.flatMap((t) => t.items.map((i) => i.image ?? fallback)))];
  const shown = hover ?? current.items.find((i) => i.image)?.image ?? fallback;

  return (
    <div id="menu" className="menu" data-open={open ? "" : undefined} inert={!open} aria-label="Menu">
      <div className="menu-tabs" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={t.id === tab}
            onClick={() => {
              setTab(t.id);
              setHover(null);
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="menu-body">
        <ul key={tab} className="menu-list" onMouseLeave={() => setHover(null)}>
          {current.items.map((item, i) => (
            <li key={item.href} style={vars({ "--i": i })}>
              <Link
                href={item.href}
                onClick={onClose}
                onMouseEnter={() => setHover(item.image ?? fallback)}
                onFocus={() => setHover(item.image ?? fallback)}
                data-dim={hover && hover !== (item.image ?? fallback) ? "" : undefined}
              >
                {item.label}
                {item.note && <small>{item.note}</small>}
              </Link>
            </li>
          ))}
        </ul>

        <div className="menu-preview" aria-hidden="true">
          {images.map((src) => (
            <Image key={src} src={src} alt="" fill sizes="34vw" data-on={src === shown ? "" : undefined} />
          ))}
        </div>
      </div>

      <div className="menu-foot">
        <GoldRate compact />
        <p className="menu-contact">
          <a href={brand.phoneHref}>{brand.phone}</a>
          <a href={`https://wa.me/${brand.whatsappNumber}`} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
        </p>
      </div>
    </div>
  );
}
