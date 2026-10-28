import Link from "next/link";
import { brand, categories, collections, menu } from "@/app/lib/site";
import NewsletterForm from "./NewsletterForm";
import Wordmark from "./Wordmark";

export default function Footer() {
  return (
    <footer className="ft">
      <div className="ft-top">
        <NewsletterForm />
        <nav className="ft-cols" aria-label="Footer">
          <div>
            <p className="caps ft-head">Jewellery</p>
            <ul>
              {categories.map((c) => (
                <li key={c.id}>
                  <Link href={`/shop/${c.id}`}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="caps ft-head">Collections</p>
            <ul>
              {collections.map((c) => (
                <li key={c.id}>
                  <Link href={`/collections/${c.id}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="caps ft-head">The House</p>
            <ul>
              {menu.house.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="caps ft-head">Talk to us</p>
            <ul>
              <li>
                <a href={brand.phoneHref}>{brand.phone}</a>
              </li>
              <li>
                <a href={`https://wa.me/${brand.whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${brand.email}`}>{brand.email}</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <ul className="ft-social">
        {brand.socials.map((s) => (
          <li key={s.label}>
            <a href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          </li>
        ))}
      </ul>

      <Link href="/" className="ft-mark" aria-label={`${brand.name}, home`}>
        <Wordmark />
      </Link>

      <p className="ft-legal">
        <span>
          {brand.name} · Est. {brand.established}
        </span>
        <span>{brand.legal}</span>
      </p>
    </footer>
  );
}
