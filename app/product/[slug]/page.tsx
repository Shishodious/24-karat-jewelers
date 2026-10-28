import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/app/components/Footer";
import ProductCard from "@/app/components/ProductCard";
import ProductView from "@/app/components/ProductView";
import { getCategory, getCollection, getProduct, related } from "@/app/lib/catalog";
import { formatINR, priceOf } from "@/app/lib/price";
import { brand, products } from "@/app/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    title: p.name,
    description: `${p.text} ${p.purities[0]} gold, ${p.weight} g. ${formatINR(priceOf(p).total)} at today's gold rate.`,
    openGraph: { images: [p.images[0]] },
  };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const category = getCategory(product.category)!;
  const collection = getCollection(product.collection)!;
  const more = related(product.slug, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.text,
    image: product.images.map((src) => `${brand.url}${src}`),
    brand: { "@type": "Brand", name: brand.name },
    material: `${product.purities[0]} gold`,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: priceOf(product).total,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <main id="main" className="page pdp-page">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <ProductView product={product} category={category} collection={collection} />
        <section className="more" aria-labelledby="more-title">
          <div className="panel-head">
            <h2 id="more-title" className="caps">
              You may also like
            </h2>
            <Link href={`/collections/${collection.id}`} className="link-line caps">
              All of {collection.name}
            </Link>
          </div>
          <div className="grid" data-density="m">
            {more.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
