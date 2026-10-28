import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import GoldRate from "@/app/components/GoldRate";
import { getProduct } from "@/app/lib/catalog";
import { formatINR, priceOf, ratePerGram } from "@/app/lib/price";
import { craft, faqs, houseTeaser, promises, story } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "The House",
  description: story.lead,
};

const pad = (n: number) => String(n + 1).padStart(2, "0");

// The worked example under the gold rate: a real piece from the catalogue, priced live.
const example = getProduct("bindu-gold-drops")!;

export default function House() {
  const p = priceOf(example);
  return (
    <>
      <main id="main" className="page house">
        <section className="house-hero">
          <p className="caps">The House · Karol Bagh, New Delhi</p>
          <h1 className="house-title">{story.title}</h1>
        </section>

        <section className="house-story">
          <figure className="house-a">
            <Image src={story.images[0]} alt="A woman in a gold sari wearing layered temple necklaces" fill sizes="(max-width: 899px) 100vw, 42vw" quality={85} />
          </figure>
          <div className="house-copy">
            <p className="house-lead">{story.lead}</p>
            {story.paragraphs.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
          <figure className="house-b">
            <Image src={story.images[1]} alt="A wall of gold jhumkas" fill sizes="(max-width: 899px) 100vw, 26vw" />
          </figure>
        </section>

        <section className="promises" aria-labelledby="promise-title">
          <h2 id="promise-title" className="caps">
            Four promises
          </h2>
          <ol>
            {promises.map((x, i) => (
              <li key={x.title}>
                <span className="caps">{pad(i)}</span>
                <h3>{x.title}</h3>
                <p>{x.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="gold-rate" className="rate-section" aria-labelledby="rate-title">
          <div>
            <h2 id="rate-title" className="title">
              Priced by the gram
            </h2>
            <p className="rate-explain">
              Every price on this site is worked out from the morning&apos;s gold rate. Take the {example.name}: {example.weight} g of{" "}
              {example.purities[0]} gold at {formatINR(ratePerGram(example.purities[0]))}/g is {formatINR(p.gold)}. Add {example.making}% making (
              {formatINR(p.making)}) and 3% GST ({formatINR(p.gst)}) and you pay{" "}
              <Link href={`/product/${example.slug}`} className="link-line">
                {formatINR(p.total)}
              </Link>
              . Nothing else.
            </p>
          </div>
          <GoldRate />
        </section>

        <section className="craft" aria-labelledby="craft-title">
          <figure className="craft-media">
            <Image src={houseTeaser.image} alt="Gold jhumkas hanging in rows" fill sizes="100vw" />
          </figure>
          <h2 id="craft-title" className="caps">
            How a piece is made
          </h2>
          <ol>
            {craft.map((x, i) => (
              <li key={x.title}>
                <span className="caps">{pad(i)}</span>
                <h3>{x.title}</h3>
                <p>{x.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="services" className="faq" aria-labelledby="faq-title">
          <h2 id="faq-title" className="title">
            Client services
          </h2>
          <div>
            {faqs.map((f) => (
              <details key={f.q} className="acc">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
            <p className="faq-more">
              Anything else? <Link href="/stores" className="link-line">Visit a store</Link> or message us on WhatsApp.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
