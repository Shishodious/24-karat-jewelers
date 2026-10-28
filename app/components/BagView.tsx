"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getProduct } from "@/app/lib/catalog";
import { formatINR, priceOf } from "@/app/lib/price";
import { brand, goldRate, service } from "@/app/lib/site";
import { useBag } from "./BagProvider";
import Icon from "./Icon";
import ProductCard from "./ProductCard";

export default function BagView() {
  const { lines, favs, count, setQty, remove } = useBag();
  const [tab, setTab] = useState<"bag" | "favs">("bag");

  const items = lines.flatMap((line, index) => {
    const product = getProduct(line.slug);
    return product ? [{ line, index, product, each: priceOf(product, line.purity).total }] : [];
  });
  const total = items.reduce((n, i) => n + i.each * i.line.qty, 0);
  const saved = favs.flatMap((slug) => getProduct(slug) ?? []);

  const message = [
    `Hello ${brand.name}, I'd like to reserve:`,
    ...items.map(
      (i, n) => `${n + 1}. ${i.product.name}, ${i.line.purity}${i.line.size ? `, size ${i.line.size}` : ""}, qty ${i.line.qty}: ${formatINR(i.each * i.line.qty)}`,
    ),
    `Estimated total: ${formatINR(total)} (gold rate of ${goldRate.updated})`,
  ].join("\n");

  return (
    <main id="main" className="page bag">
      <div className="tabs" role="tablist">
        <button type="button" role="tab" aria-selected={tab === "bag"} onClick={() => setTab("bag")}>
          Bag ({count})
        </button>
        <button type="button" role="tab" aria-selected={tab === "favs"} onClick={() => setTab("favs")}>
          Favourites ({saved.length})
        </button>
      </div>

      {tab === "bag" &&
        (items.length ? (
          <>
            <ul className="bag-grid">
              {items.map(({ line, index, product, each }) => (
                <li key={`${line.slug}-${line.purity}-${line.size}`} className="bag-item">
                  <Link href={`/product/${product.slug}`} className="bag-media">
                    <Image src={product.images[0]} alt={product.name} fill sizes="(max-width: 767px) 50vw, 20vw" />
                  </Link>
                  <div className="bag-info">
                    <p className="card-name">{product.name}</p>
                    <p className="bag-meta">
                      {line.purity}
                      {line.size && ` · Size ${line.size}`}
                    </p>
                    <p className="card-price">{formatINR(each * line.qty)}</p>
                    <div className="bag-row">
                      <div className="qty">
                        <button type="button" aria-label="One less" onClick={() => setQty(index, line.qty - 1)}>
                          <Icon name="minus" size={14} />
                        </button>
                        <span aria-live="polite">{line.qty}</span>
                        <button type="button" aria-label="One more" onClick={() => setQty(index, line.qty + 1)}>
                          <Icon name="plus" size={14} />
                        </button>
                      </div>
                      <button type="button" className="link-line caps" onClick={() => remove(index)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="bag-bar">
              <div className="bag-total">
                <p>
                  <span className="caps">Total</span> <strong>{formatINR(total)}</strong>
                </p>
                <p className="bag-note">
                  Incl. GST at the gold rate of {goldRate.updated}. {service.delivery}.
                </p>
              </div>
              <a
                className="btn btn-solid"
                href={`https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Reserve on WhatsApp
              </a>
            </div>
          </>
        ) : (
          <div className="empty">
            <p>Your bag is empty.</p>
            <Link href="/shop/new" className="btn btn-line">
              See what&apos;s new
            </Link>
          </div>
        ))}

      {tab === "favs" &&
        (saved.length ? (
          <div className="grid" data-density="m">
            {saved.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <p>Tap the bookmark on any piece to keep it here.</p>
            <Link href="/shop" className="btn btn-line">
              Browse jewellery
            </Link>
          </div>
        ))}
    </main>
  );
}
