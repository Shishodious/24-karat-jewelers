import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Catalogue from "@/app/components/Catalogue";
import Footer from "@/app/components/Footer";
import { getCollection, inCollection } from "@/app/lib/catalog";
import { collections } from "@/app/lib/site";
import { vars } from "@/app/lib/style";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const c = getCollection((await params).slug);
  if (!c) return {};
  return { title: `${c.name}, ${c.line}`, description: c.intro, openGraph: { images: [c.hero[0]] } };
}

export default async function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  const collection = getCollection((await params).slug);
  if (!collection) notFound();
  const items = inCollection(collection.id);
  const others = collections.filter((c) => c.id !== collection.id);

  return (
    <>
      <main id="main">
        <section className="cover" data-tone={collection.tone} aria-labelledby="cover-title">
          <div className="slide-media" style={vars({ "--n": collection.hero.length })}>
            {collection.hero.map((src, i) => (
              <figure key={src}>
                <Image src={src} alt="" fill sizes={i === 0 ? "(max-width: 899px) 100vw, 34vw" : "34vw"} loading="eager" quality={85} />
              </figure>
            ))}
          </div>
          <div className="cover-text">
            <p className="caps">{collection.season}</p>
            <h1 id="cover-title" className="cover-title">
              {collection.name}
            </h1>
            <p className="caps">{collection.line}</p>
          </div>
        </section>

        <section className="intro">
          <p className="caps">
            {collection.name} · {items.length} pieces
          </p>
          <p className="intro-text">{collection.intro}</p>
        </section>

        <Catalogue
          products={items}
          editorial={collection.lookbook}
          showCollections={false}
          nav={collections.map((c) => ({ label: c.name, href: `/collections/${c.id}`, active: c.id === collection.id }))}
        />

        <section className="next" aria-labelledby="next-title">
          <h2 id="next-title" className="caps next-head">
            More collections
          </h2>
          <ul className="next-list">
            {others.map((c) => (
              <li key={c.id}>
                <Link href={`/collections/${c.id}`} className="next-item">
                  <span className="next-media">
                    <Image src={c.hero[0]} alt="" fill sizes="(max-width: 767px) 100vw, 33vw" />
                  </span>
                  <span className="next-name">{c.name}</span>
                  <span className="caps">{c.line}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
