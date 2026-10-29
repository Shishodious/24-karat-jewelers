import Image from "next/image";
import Link from "next/link";
import CategoryIndex from "./components/CategoryIndex";
import Footer from "./components/Footer";
import GoldRate from "./components/GoldRate";
import Intro from "./components/Intro";
import ProductCard from "./components/ProductCard";
import Rail from "./components/Rail";
import RollingText from "./components/RollingText";
import Slide from "./components/Slide";
import Stack from "./components/Stack";
import Ticker from "./components/Ticker";
import { newIn } from "./lib/catalog";
import { brand, bridalRoom, categories, houseTeaser, products, slides } from "./lib/site";
import { vars } from "./lib/style";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Home() {
  const total = slides.length + 1;
  const fresh = newIn();

  return (
    <main id="main" className="home">
      <Intro />

      {/* The opening pages stack: each slides up over the last. */}
      <Stack>
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
              {pad(total)} / {pad(total)}
            </p>
          </div>
          <div className="room-media">
            {bridalRoom.images.map((src) => (
              <figure key={src}>
                <Image src={src} alt="" fill sizes="(max-width: 899px) 100vw, 30vw" />
              </figure>
            ))}
          </div>
          <span className="veil" aria-hidden="true" />
        </section>
      </Stack>

      <Ticker />

      <section className="block" aria-labelledby="new-title">
        <div className="block-head">
          <div>
            <p className="caps block-kicker">New this season</p>
            <h2 id="new-title" className="title">
              New in<sup>{fresh.length}</sup>
            </h2>
          </div>
          <Link href="/shop/new" className="link-line caps">
            See all
          </Link>
        </div>
        <Rail label="New pieces">
          {fresh.map((p) => (
            <ProductCard key={p.slug} product={p} sizes="(max-width: 767px) 64vw, 24vw" />
          ))}
        </Rail>
      </section>

      <section className="block" aria-labelledby="cats-title">
        <div className="block-head">
          <div>
            <p className="caps block-kicker">Shop by category · {products.length} pieces</p>
            <h2 id="cats-title" className="sr-only">
              Jewellery by category
            </h2>
          </div>
          <Link href="/shop" className="link-line caps">
            Shop all
          </Link>
        </div>
        <CategoryIndex categories={categories} rest="Jewellery" />
      </section>

      <section className="manifesto" aria-labelledby="house-title">
        <p className="caps block-kicker">The House · Est. {brand.established}</p>
        <RollingText
          className="manifesto-drum"
          style={vars({ "--rt-weight": 400, "--rt-tracking": "-0.045em", "--rt-size": "clamp(48px, 10.5vw, 190px)" })}
          lines={houseTeaser.manifesto.map((line, i, all) =>
            i === all.length - 1 ? (
              <h2 key={line} id="house-title">
                {line}
              </h2>
            ) : (
              line
            ),
          )}
        />
      </section>

      <section className="split" aria-label="Gold rate today">
        <figure className="split-media">
          <Image src={houseTeaser.image} alt="Rows of gold jhumkas hanging in a workshop" fill sizes="(max-width: 899px) 100vw, 50vw" />
        </figure>
        <div className="split-text">
          <p className="split-copy">{houseTeaser.text}</p>
          <GoldRate />
          <Link href="/house" className="link-line caps">
            Our story
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
