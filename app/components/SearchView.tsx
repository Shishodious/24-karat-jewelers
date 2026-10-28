"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { getCategory, getCollection, newIn } from "@/app/lib/catalog";
import { popularSearches, products } from "@/app/lib/site";
import ProductCard from "./ProductCard";

// Everything a piece can be found by, lower-cased once.
const index = products.map((p) => ({
  product: p,
  text: [p.name, p.text, p.stoneNote, p.purities.join(" "), getCategory(p.category)?.label, getCollection(p.collection)?.name, getCollection(p.collection)?.line, p.specs.join(" ")]
    .join(" ")
    .toLowerCase(),
}));

export default function SearchView() {
  const [query, setQuery] = useState("");
  const q = useDeferredValue(query.trim().toLowerCase());
  const results = useMemo(() => {
    if (!q) return [];
    const terms = q.split(/\s+/).map((t) => t.replace(/s$/, ""));
    return index.filter((i) => terms.every((t) => i.text.includes(t))).map((i) => i.product);
  }, [q]);

  return (
    <main id="main" className="page search">
      <div className="search-field">
        <label htmlFor="q" className="sr-only">
          Search
        </label>
        <input
          id="q"
          type="search"
          autoFocus
          autoComplete="off"
          placeholder="Search for a piece, a stone or a collection"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {q ? (
        <p className="caps search-meta" aria-live="polite">
          {results.length} {results.length === 1 ? "result" : "results"} for “{query.trim()}”
        </p>
      ) : (
        <div className="search-popular">
          <p className="caps">Popular</p>
          <ul>
            {popularSearches.map((s) => (
              <li key={s}>
                <button type="button" onClick={() => setQuery(s)}>
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {q && results.length === 0 && <p className="search-none">No pieces match. Try “jhumka”, “polki” or “bangle”.</p>}

      {!q && <p className="caps search-meta">New in</p>}
      <div className="grid" data-density="m">
        {(q ? results : newIn()).map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </main>
  );
}
