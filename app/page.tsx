import Image from "next/image";
import Link from "next/link";
import Footer from "./components/Footer";
import GoldRate from "./components/GoldRate";
import ProductCard from "./components/ProductCard";
import Slide from "./components/Slide";
import { newIn } from "./lib/catalog";
import { brand, bridalRoom, categories, houseTeaser, products, slides } from "./lib/site";
import { vars } from "./lib/style";

export default function Home() {
  const total = slides.length + 1;
  const fresh = newIn();

  return (
    <main id="main" className="home">
      {slides.map((s, i) => (
        <Slide key={s.href} slide={s} index={i} total={total} />
      ))}

      <section className="panel room" data-tone="light" data-logo="wide" aria-labelledby="room-title">
        <div className="room-text">
          <p className="caps">{bridalRoom.kicker}</p>
          <h2 id="room-title" className="room-title">
            {bridalRoom.title}
          </h2>
          <p className="room-copy">{bridalRoom.text}</p>
          <div className="room-actions">
            <Link href="/stores#book" className="btn btn-solid">
              Book a consultation
            </Link>
            <a href={`https://wa.me/${brand.whatsappNumber}`} className="btn btn-line" target="_blank" rel="noopener noreferrer">
              WhatsApp us
            </a>
          </div>
          <p className="caps slide-count room-count">
            {String(total).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>
        <div className="room-media">
          {bridalRoom.images.map((src) => (
            <figure key={src}>
              <Image src={src} alt="" fill sizes="(max-width: 899px) 100vw, 30vw" />
            </figure>
          ))}
        </div>
      </section>

      <section className="panel rail-panel" data-tone="light" aria-labelledby="new-title">
        <div className="panel-head">
          <h2 id="new-title" className="title">
            New in<sup>{fresh.length}</sup>
          </h2>
          <Link href="/shop/new" className="link-line caps">
            See all
          </Link>
        </div>
        <div className="rail">
          {fresh.map((p) => (
            <ProductCard key={p.slug} product={p} sizes="(max-width: 767px) 64vw, 24vw" />
          ))}
        </div>
      </section>

      <section className="panel strips-panel" data-tone="light" aria-labelledby="cats-title">
        <div className="panel-head">
          <h2 id="cats-title" className="title">
            Jewellery<sup>{products.length}</sup>
          </h2>
          <Link href="/shop" className="link-line caps">
            Shop all
          </Link>
        </div>
        <ul className="strips">
          {categories.map((c, i) => (
            <li key={c.id} style={vars({ "--i": i })}>
              <Link href={`/shop/${c.id}`} className="strip">
                <span className="strip-media">
                  <Image src={c.image} alt="" fill sizes="(max-width: 899px) 50vw, 30vw" />
                </span>
                <span className="strip-label caps">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {c.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel house-panel" aria-labelledby="house-title">
        <figure className="house-panel-media">
          <Image src={houseTeaser.image} alt="Rows of gold jhumkas hanging in a workshop" fill sizes="(max-width: 899px) 100vw, 50vw" />
        </figure>
        <div className="house-panel-text">
          <p className="caps">The House · Est. {brand.established}</p>
          <h2 id="house-title" className="house-panel-title">
            {houseTeaser.title}
          </h2>
          <p className="house-panel-copy">{houseTeaser.text}</p>
          <GoldRate />
          <Link href="/house" className="link-line caps">
            Our story
          </Link>
        </div>
      </section>

      <div className="panel foot-panel" data-tone="light">
        <Footer />
      </div>
    </main>
  );
}
