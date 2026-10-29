import Image from "next/image";
import Link from "next/link";
import type { Slide as SlideData } from "@/app/lib/site";
import { vars } from "@/app/lib/style";

const pad = (n: number) => String(n).padStart(2, "0");

// One full-screen page of the home: a photo on phones, up to three side by side on wider screens.
export default function Slide({ slide, index, total }: { slide: SlideData; index: number; total: number }) {
  const first = index === 0;
  return (
    <section className="panel slide" data-tone={slide.tone} data-logo="big" aria-label={`${slide.title}, ${slide.line}`}>
      <div className="slide-media" style={vars({ "--n": slide.images.length })}>
        {slide.images.map((src, i) => (
          <figure key={src} style={vars({ "--k": i })}>
            <Image
              src={src}
              alt=""
              fill
              sizes={i === 0 ? `(max-width: 899px) 100vw, ${Math.round(100 / slide.images.length)}vw` : `${Math.round(100 / slide.images.length)}vw`}
              loading={first ? "eager" : "lazy"}
              fetchPriority={first && i === 0 ? "high" : undefined}
              quality={85}
            />
          </figure>
        ))}
      </div>
      <span className="veil" aria-hidden="true" />
      <div className="slide-caption">
        <p className="caps slide-kicker">{slide.kicker}</p>
        <div className="slide-center">
          <h2 className="slide-title">{slide.title}</h2>
          <p className="caps">{slide.line}</p>
          <Link href={slide.href} className="link-line caps">
            {slide.cta}
          </Link>
        </div>
        <p className="caps slide-count">
          {pad(index + 1)} / {pad(total)}
        </p>
      </div>
    </section>
  );
}
