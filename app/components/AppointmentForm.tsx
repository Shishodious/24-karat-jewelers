"use client";

import { useState } from "react";
import { appointmentSlots, appointmentTopics, brand, stores } from "@/app/lib/site";

// No backend: the request opens as a pre-filled WhatsApp message to the store.
export default function AppointmentForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const store = stores.find((s) => s.id === f.get("store"));
        const text = [
          `Hello ${brand.name}, I'd like to book an appointment.`,
          `Name: ${f.get("name")}`,
          `Phone: ${f.get("phone")}`,
          `Store: ${store?.name}`,
          `When: ${f.get("date")} at ${f.get("slot")}`,
          `For: ${f.get("topic")}`,
          f.get("notes") ? `Notes: ${f.get("notes")}` : "",
        ]
          .filter(Boolean)
          .join("\n");
        window.open(`https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
        setSent(true);
      }}
    >
      <div className="field">
        <label htmlFor="name" className="caps">
          Name
        </label>
        <input id="name" name="name" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="phone" className="caps">
          Phone
        </label>
        <input id="phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" pattern="[0-9+ ]{10,15}" />
      </div>
      <div className="field">
        <label htmlFor="store" className="caps">
          Store
        </label>
        <select id="store" name="store" defaultValue={stores[0].id}>
          {stores.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} · {s.label}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="date" className="caps">
          Date
        </label>
        <input id="date" name="date" type="date" required />
      </div>
      <fieldset className="field field-wide">
        <legend className="caps">Time</legend>
        <div className="chips">
          {appointmentSlots.map((s, i) => (
            <label key={s}>
              <input type="radio" name="slot" value={s} defaultChecked={i === 0} />
              <span>{s}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="field field-wide">
        <legend className="caps">I&apos;m coming for</legend>
        <div className="chips">
          {appointmentTopics.map((t, i) => (
            <label key={t}>
              <input type="radio" name="topic" value={t} defaultChecked={i === 0} />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="field field-wide">
        <label htmlFor="notes" className="caps">
          Notes <small>(optional)</small>
        </label>
        <textarea id="notes" name="notes" rows={2} placeholder="Wedding date, outfit colours, a piece you saw online…" />
      </div>
      <div className="field-wide form-foot">
        <button type="submit" className="btn btn-solid">
          Request appointment
        </button>
        <p className="form-note" aria-live="polite">
          {sent ? "Your request is ready in WhatsApp. Press send and we'll confirm within the hour." : "We confirm every request on WhatsApp within the hour."}
        </p>
      </div>
    </form>
  );
}
