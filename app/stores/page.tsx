import type { Metadata } from "next";
import Image from "next/image";
import AppointmentForm from "@/app/components/AppointmentForm";
import Footer from "@/app/components/Footer";
import { bridalRoom, stores } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "Stores & appointments",
  description: "Visit 24 Karat Mahima Jewellers in Karol Bagh, South Extension and Gurugram, or book a private bridal consultation.",
};

export default function Stores() {
  return (
    <>
      <main id="main" className="page stores">
        <header className="page-head">
          <h1 className="title">
            Stores<sup>{stores.length}</sup>
          </h1>
        </header>

        <ul className="store-list">
          {stores.map((s) => (
            <li key={s.id} className="store">
              <figure className="store-media">
                <Image src={s.image} alt="" fill sizes="(max-width: 767px) 100vw, 33vw" />
              </figure>
              <p className="caps">{s.label}</p>
              <h2 className="store-name">{s.name}</h2>
              <address>
                {s.address.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </address>
              <p className="store-hours">
                {s.hours.map((h) => (
                  <span key={h}>{h}</span>
                ))}
              </p>
              <p className="store-links">
                <a href={s.phoneHref} className="link-line">
                  {s.phone}
                </a>
                <a href={s.map} className="link-line" target="_blank" rel="noopener noreferrer">
                  Directions
                </a>
                {s.bridal && <span className="caps store-tag">Bridal Room</span>}
              </p>
            </li>
          ))}
        </ul>

        <section id="book" className="appt" aria-labelledby="book-title">
          <div className="appt-intro">
            <p className="caps">{bridalRoom.kicker}</p>
            <h2 id="book-title" className="title">
              Book an appointment
            </h2>
            <p>{bridalRoom.text}</p>
            <figure className="appt-media">
              <Image src={bridalRoom.images[0]} alt="A bride in a maroon lehenga and kundan choker" fill sizes="(max-width: 899px) 100vw, 40vw" />
            </figure>
          </div>
          <AppointmentForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
