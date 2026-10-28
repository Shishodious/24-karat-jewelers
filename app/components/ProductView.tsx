"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, ViewTransition, useState } from "react";
import { formatINR, priceOf, ratePerGram } from "@/app/lib/price";
import { brand, purities, service, type Category, type Collection, type Product, type Purity } from "@/app/lib/site";
import { useBag } from "./BagProvider";
import FavButton from "./FavButton";

type Props = { product: Product; category: Category; collection: Collection };

export default function ProductView({ product, category, collection }: Props) {
  const { add } = useBag();
  const [purity, setPurity] = useState<Purity>(product.purities[0]);
  const [size, setSize] = useState<string | undefined>();
  const [missingSize, setMissingSize] = useState(false);
  const [slide, setSlide] = useState(0);
  const price = priceOf(product, purity);

  const tryOn = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(
    `Hello ${brand.name}, I'd like to try on the ${product.name} (${purity}${size ? `, size ${size}` : ""}). Which store and time works?`,
  )}`;

  const onAdd = () => {
    if (category.sizes && !size) {
      setMissingSize(true);
      return;
    }
    add({ slug: product.slug, purity, size });
  };

  return (
    <div className="pdp">
      <div
        className="pdp-gallery"
        onScroll={(e) => {
          const el = e.currentTarget;
          setSlide(Math.round(el.scrollLeft / el.clientWidth));
        }}
      >
        {product.images.map((src, i) => {
          const img = (
            <div className="pdp-shot">
              <Image
                src={src}
                alt={i === 0 ? product.name : `${product.name}, styled`}
                fill
                sizes="(max-width: 899px) 100vw, 44vw"
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : undefined}
                quality={85}
              />
            </div>
          );
          return i === 0 ? (
            <ViewTransition key={src} name={`p-${product.slug}`} share="morph" default="none">
              {img}
            </ViewTransition>
          ) : (
            <Fragment key={src}>{img}</Fragment>
          );
        })}
      </div>
      {product.images.length > 1 && (
        <p className="pdp-count" aria-hidden="true">
          {slide + 1} / {product.images.length}
        </p>
      )}

      <div className="pdp-buy">
        <p className="pdp-crumbs caps">
          <Link href={`/shop/${category.id}`}>{category.label}</Link>
          <span>/</span>
          <Link href={`/collections/${collection.id}`}>{collection.name}</Link>
        </p>
        <h1 className="pdp-name">{product.name}</h1>
        <p className="pdp-price">{formatINR(price.total)}</p>
        <p className="pdp-tax">Incl. 3% GST · at today&apos;s gold rate</p>

        <fieldset className="opts">
          <legend className="caps">Purity</legend>
          <div className="opts-row">
            {product.purities.map((p) => (
              <button key={p} type="button" aria-pressed={purity === p} onClick={() => setPurity(p)}>
                {purities[p].label}
              </button>
            ))}
          </div>
        </fieldset>

        {category.sizes && (
          <fieldset className="opts" data-error={missingSize ? "" : undefined}>
            <legend className="caps">{category.sizeLabel}</legend>
            <div className="opts-row">
              {category.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={size === s}
                  onClick={() => {
                    setSize(s);
                    setMissingSize(false);
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
            <p className="opts-msg" role="alert">
              {missingSize ? "Choose a size first." : "Not sure? We resize free within 30 days."}
            </p>
          </fieldset>
        )}

        <button type="button" className="btn btn-solid btn-block" onClick={onAdd}>
          Add to bag
        </button>
        <div className="pdp-pair">
          <FavButton slug={product.slug} name={product.name} withLabel />
          <a className="btn btn-line" href={tryOn} target="_blank" rel="noopener noreferrer">
            Book a try-on
          </a>
        </div>

        <ul className="pdp-service">
          <li>{service.hallmark}</li>
          <li>{service.delivery}</li>
          <li>{service.returns}</li>
        </ul>
      </div>

      <div className="pdp-about">
        <p className="pdp-text">{product.text}</p>
        <ul className="pdp-specs">
          {product.specs.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        <details className="acc" open>
          <summary>Price breakup</summary>
          <table className="breakup">
            <tbody>
              <tr>
                <th scope="row">
                  Gold <small>{product.weight} g × {formatINR(ratePerGram(purity))}/g ({purity})</small>
                </th>
                <td>{formatINR(price.gold)}</td>
              </tr>
              <tr>
                <th scope="row">
                  Making <small>{product.making}% of gold value</small>
                </th>
                <td>{formatINR(price.making)}</td>
              </tr>
              {price.stones > 0 && (
                <tr>
                  <th scope="row">
                    Stones <small>{product.stoneNote}</small>
                  </th>
                  <td>{formatINR(price.stones)}</td>
                </tr>
              )}
              <tr>
                <th scope="row">GST 3%</th>
                <td>{formatINR(price.gst)}</td>
              </tr>
              <tr className="breakup-total">
                <th scope="row">Total</th>
                <td>{formatINR(price.total)}</td>
              </tr>
            </tbody>
          </table>
        </details>
        <details className="acc">
          <summary>Gold & hallmark</summary>
          <p>
            {purities[purity].label} gold, {product.weight} g net. BIS hallmarked with a six-digit HUID you can verify on the BIS CARE app.
            {product.stoneNote && ` Stones: ${product.stoneNote}.`}
          </p>
        </details>
        <details className="acc">
          <summary>Delivery, returns & exchange</summary>
          <p>
            {service.delivery}. Returns within 15 days in original condition. Bring it back any time and we exchange it at 100% of its gold value on the
            day.
          </p>
        </details>
        <details className="acc">
          <summary>Care</summary>
          <p>Put it on last and take it off first. Keep away from perfume and water, wipe with a soft cloth and store each piece in its own pouch.</p>
        </details>
      </div>
    </div>
  );
}
