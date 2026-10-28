"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useMemo, useState } from "react";
import { priceOf } from "@/app/lib/price";
import type { Density } from "@/app/lib/store";
import { collections, purities, type CollectionId, type Product, type Purity } from "@/app/lib/site";
import { useBag } from "./BagProvider";
import Icon from "./Icon";
import ProductCard from "./ProductCard";

type NavItem = { label: string; href: string; active?: boolean };

type Props = {
  products: Product[];
  nav: NavItem[];
  editorial?: string[];
  showCollections?: boolean;
};

type Sort = "featured" | "new" | "low" | "high";
type Band = "under-1l" | "1l-5l" | "over-5l";
type Filters = { collections: CollectionId[]; purities: Purity[]; bands: Band[]; sort: Sort };

const none: Filters = { collections: [], purities: [], bands: [], sort: "featured" };

const sorts: { id: Sort; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "new", label: "New in first" },
  { id: "low", label: "Price, low to high" },
  { id: "high", label: "Price, high to low" },
];

const bands: { id: Band; label: string; test: (n: number) => boolean }[] = [
  { id: "under-1l", label: "Under ₹1 lakh", test: (n) => n < 100000 },
  { id: "1l-5l", label: "₹1 – 5 lakh", test: (n) => n >= 100000 && n <= 500000 },
  { id: "over-5l", label: "Over ₹5 lakh", test: (n) => n > 500000 },
];

const densities: { id: Density; label: string; cells: number }[] = [
  { id: "l", label: "Large view", cells: 1 },
  { id: "m", label: "Medium view", cells: 2 },
  { id: "s", label: "Small view", cells: 3 },
];

const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

// One editorial photo after the first row, another further down, each spanning two columns and two rows.
const tileAt = [4, 14];

export default function Catalogue({ products, nav, editorial = [], showCollections = true }: Props) {
  const { density, setDensity } = useBag();
  const [filters, setFilters] = useState<Filters>(none);
  const [draft, setDraft] = useState<Filters>(none);
  const [panel, setPanel] = useState(false);

  const shown = useMemo(() => {
    const total = (p: Product) => priceOf(p).total;
    const list = products.filter(
      (p) =>
        (!filters.collections.length || filters.collections.includes(p.collection)) &&
        (!filters.purities.length || p.purities.some((x) => filters.purities.includes(x))) &&
        (!filters.bands.length || bands.some((b) => filters.bands.includes(b.id) && b.test(total(p)))),
    );
    if (filters.sort === "low") return [...list].sort((a, b) => total(a) - total(b));
    if (filters.sort === "high") return [...list].sort((a, b) => total(b) - total(a));
    if (filters.sort === "new") return [...list].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    return list;
  }, [products, filters]);

  const draftCount = useMemo(
    () =>
      products.filter(
        (p) =>
          (!draft.collections.length || draft.collections.includes(p.collection)) &&
          (!draft.purities.length || p.purities.some((x) => draft.purities.includes(x))) &&
          (!draft.bands.length || bands.some((b) => draft.bands.includes(b.id) && b.test(priceOf(p).total))),
      ).length,
    [products, draft],
  );

  const active = filters.collections.length + filters.purities.length + filters.bands.length + (filters.sort === "featured" ? 0 : 1);
  const plain = active === 0;

  useEffect(() => {
    if (!panel) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPanel(false);
    document.documentElement.classList.add("locked");
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("locked");
      window.removeEventListener("keydown", onKey);
    };
  }, [panel]);

  const openPanel = () => {
    setDraft(filters);
    setPanel(true);
  };

  return (
    <>
      <div className="bar">
        <nav className="bar-nav" aria-label="Browse">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={n.active ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="bar-tools">
          <div className="density" role="group" aria-label="Grid view">
            {densities.map((d) => (
              <button key={d.id} type="button" aria-label={d.label} aria-pressed={density === d.id} onClick={() => setDensity(d.id)}>
                <span className="density-icon" data-cells={d.cells}>
                  {Array.from({ length: d.cells * d.cells }, (_, i) => (
                    <i key={i} />
                  ))}
                </span>
              </button>
            ))}
          </div>
          <button type="button" className="bar-filter" onClick={openPanel} aria-expanded={panel} aria-controls="filters">
            Filters{active ? ` (${active})` : ""}
          </button>
        </div>
      </div>

      <div className="grid" data-density={density}>
        {shown.map((p, i) => (
          <Fragment key={p.slug}>
            {plain && tileAt.includes(i) && editorial[tileAt.indexOf(i)] && (
              <figure className="tile" data-side={tileAt.indexOf(i) % 2 ? "left" : "right"}>
                <Image src={editorial[tileAt.indexOf(i)]} alt="" fill sizes="(max-width: 767px) 100vw, 50vw" />
              </figure>
            )}
            <ProductCard product={p} eager={i < 4} />
          </Fragment>
        ))}
      </div>

      {shown.length === 0 && (
        <div className="empty">
          <p>Nothing matches those filters.</p>
          <button type="button" className="btn btn-line" onClick={() => setFilters(none)}>
            Clear filters
          </button>
        </div>
      )}

      <div className="scrim" data-open={panel ? "" : undefined} onClick={() => setPanel(false)} aria-hidden="true" />
      <aside id="filters" className="drawer" data-open={panel ? "" : undefined} inert={!panel} aria-label="Filters">
        <div className="drawer-head">
          <p className="caps">Filters</p>
          <button type="button" aria-label="Close filters" onClick={() => setPanel(false)}>
            <Icon name="close" />
          </button>
        </div>
        <div className="drawer-body">
          <fieldset className="checks">
            <legend className="caps">Sort by</legend>
            {sorts.map((s) => (
              <label key={s.id}>
                <input type="radio" name="sort" checked={draft.sort === s.id} onChange={() => setDraft({ ...draft, sort: s.id })} />
                <span>{s.label}</span>
              </label>
            ))}
          </fieldset>
          {showCollections && (
            <fieldset className="checks">
              <legend className="caps">Collection</legend>
              {collections.map((c) => (
                <label key={c.id}>
                  <input
                    type="checkbox"
                    checked={draft.collections.includes(c.id)}
                    onChange={() => setDraft({ ...draft, collections: toggle(draft.collections, c.id) })}
                  />
                  <span>
                    {c.name} <small>{c.line}</small>
                  </span>
                </label>
              ))}
            </fieldset>
          )}
          <fieldset className="checks">
            <legend className="caps">Purity</legend>
            {(Object.keys(purities) as Purity[]).map((p) => (
              <label key={p}>
                <input type="checkbox" checked={draft.purities.includes(p)} onChange={() => setDraft({ ...draft, purities: toggle(draft.purities, p) })} />
                <span>{purities[p].label}</span>
              </label>
            ))}
          </fieldset>
          <fieldset className="checks">
            <legend className="caps">Price</legend>
            {bands.map((b) => (
              <label key={b.id}>
                <input type="checkbox" checked={draft.bands.includes(b.id)} onChange={() => setDraft({ ...draft, bands: toggle(draft.bands, b.id) })} />
                <span>{b.label}</span>
              </label>
            ))}
          </fieldset>
        </div>
        <div className="drawer-foot">
          <button type="button" className="btn btn-line" onClick={() => setDraft(none)}>
            Clear
          </button>
          <button
            type="button"
            className="btn btn-solid"
            onClick={() => {
              setFilters(draft);
              setPanel(false);
            }}
          >
            View {draftCount} {draftCount === 1 ? "piece" : "pieces"}
          </button>
        </div>
      </aside>
    </>
  );
}
