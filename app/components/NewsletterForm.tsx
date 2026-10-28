"use client";

import { useState } from "react";
import Icon from "./Icon";

export default function NewsletterForm() {
  const [done, setDone] = useState(false);
  return (
    <form
      className="news"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: send the address to your mailing list (Mailchimp, Klaviyo, a Google Sheet…).
        setDone(true);
      }}
    >
      <label htmlFor="news-email" className="news-title">
        Join our newsletter
      </label>
      {done ? (
        <p className="news-done">Thank you. New collections and the gold rate on festival days, nothing else.</p>
      ) : (
        <div className="news-row">
          <input id="news-email" type="email" required placeholder="Email address" autoComplete="email" />
          <button type="submit" aria-label="Subscribe">
            <Icon name="arrow" size={20} />
          </button>
        </div>
      )}
    </form>
  );
}
