import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { priceOf, formatINR } from "@/app/lib/price";
import type { Product } from "@/app/lib/site";
import FavButton from "./FavButton";

type Props = {
  product: Product;
  sizes?: string;
  eager?: boolean;
  // Morphs the photo into the product page. Off wherever the same piece can show twice on one page.
  morph?: boolean;
};

export default function ProductCard({ product, sizes = "(max-width: 767px) 50vw, 25vw", eager, morph = true }: Props) {
  const [front, back] = product.images;
  const media = (
    <div className="card-media">
      <Image src={front} alt={product.name} fill sizes={sizes} loading={eager ? "eager" : "lazy"} />
      {back && <Image className="card-back" src={back} alt="" fill sizes={sizes} />}
    </div>
  );

  return (
    <article className="card">
      <Link href={`/product/${product.slug}`} className="card-link">
        {morph ? (
          <ViewTransition name={`p-${product.slug}`} share="morph" default="none">
            {media}
          </ViewTransition>
        ) : (
          media
        )}
        <div className="card-info">
          <h3 className="card-name">{product.name}</h3>
          <p className="card-price">
            {formatINR(priceOf(product).total)}
            {product.isNew && <span className="card-new">New</span>}
          </p>
        </div>
      </Link>
      <FavButton slug={product.slug} name={product.name} />
    </article>
  );
}
