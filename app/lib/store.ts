import type { Purity } from "./site";

// Bag, favourites and grid view, saved in localStorage and shared across tabs.
// Read through useSyncExternalStore so the server render and the first client render agree (both empty).

export type Line = { slug: string; purity: Purity; size?: string; qty: number };
export type Density = "l" | "m" | "s";
export type State = { lines: Line[]; favs: string[]; density: Density };

const KEY = "24karat:v1";
const empty: State = { lines: [], favs: [], density: "m" };

let raw: string | null = null;
let cache: State = empty;
const listeners = new Set<() => void>();

function get(): State {
  let next: string | null = null;
  try {
    next = localStorage.getItem(KEY);
  } catch {}
  if (next === raw) return cache;
  raw = next;
  try {
    cache = next ? { ...empty, ...JSON.parse(next) } : empty;
  } catch {
    cache = empty;
  }
  return cache;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => e.key === KEY && listener();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function update(fn: (s: State) => State) {
  cache = fn(get());
  raw = JSON.stringify(cache);
  try {
    localStorage.setItem(KEY, raw);
  } catch {}
  listeners.forEach((l) => l());
}

export const store = { get, subscribe, update, server: () => empty };
