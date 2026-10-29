"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Category } from "@/app/lib/site";
import { vars } from "@/app/lib/style";

const letters = (word: string) =>
  [...word].map((ch, i) => (
    <span key={i} className="roll-ch" style={vars({ "--i": i })}>
      {ch === " " ? " " : ch}
    </span>
  ));

// Six strips that widen under the pointer, over one giant word that rolls, letter by letter, to the hovered name.
export default function CategoryIndex({ categories, rest }: { categories: Category[]; rest: string }) {
  const [word, setWord] = useState(rest);
  const [prev, setPrev] = useState<string | null>(null);

  const show = (next: string) => {
    if (next === word) return;
    setPrev(word);
    setWord(next);
  };

  return (
    <div className="index" onMouseLeave={() => show(rest)}>
      <ul className="strips">
        {categories.map((c, i) => (
          <li key={c.id}>
            <Link href={`/shop/${c.id}`} className="strip" onMouseEnter={() => show(c.label)} onFocus={() => show(c.label)} onBlur={() => show(rest)}>
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
      <p className="roll" aria-hidden="true">
        {prev && (
          <span key={`out-${prev}`} className="roll-line" data-out="">
            {letters(prev)}
          </span>
        )}
        <span key={`in-${word}`} className="roll-line">
          {letters(word)}
        </span>
      </p>
    </div>
  );
}
