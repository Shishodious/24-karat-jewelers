"use client";

import { createContext, use, useCallback, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { store, type Density, type Line } from "@/app/lib/store";

type Toast = Line & { id: number };

type Bag = {
  lines: Line[];
  count: number;
  favs: string[];
  density: Density;
  toast: Toast | null;
  add: (line: Omit<Line, "qty">) => void;
  setQty: (index: number, qty: number) => void;
  remove: (index: number) => void;
  toggleFav: (slug: string) => void;
  setDensity: (d: Density) => void;
  dismiss: () => void;
};

const BagContext = createContext<Bag | null>(null);

export function useBag() {
  const ctx = use(BagContext);
  if (!ctx) throw new Error("useBag must be used inside <BagProvider>");
  return ctx;
}

export default function BagProvider({ children }: { children: React.ReactNode }) {
  const state = useSyncExternalStore(store.subscribe, store.get, store.server);
  const [toast, setToast] = useState<Toast | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const dismiss = useCallback(() => setToast(null), []);

  const add = useCallback((line: Omit<Line, "qty">) => {
    store.update((s) => {
      const i = s.lines.findIndex((l) => l.slug === line.slug && l.purity === line.purity && l.size === line.size);
      if (i === -1) return { ...s, lines: [...s.lines, { ...line, qty: 1 }] };
      return { ...s, lines: s.lines.map((l, j) => (j === i ? { ...l, qty: l.qty + 1 } : l)) };
    });
    clearTimeout(timer.current);
    setToast({ ...line, qty: 1, id: Date.now() });
    timer.current = setTimeout(() => setToast(null), 4200);
  }, []);

  const value = useMemo<Bag>(
    () => ({
      ...state,
      count: state.lines.reduce((n, l) => n + l.qty, 0),
      toast,
      add,
      dismiss,
      setQty: (index, qty) =>
        store.update((s) => ({
          ...s,
          lines: qty < 1 ? s.lines.filter((_, j) => j !== index) : s.lines.map((l, j) => (j === index ? { ...l, qty } : l)),
        })),
      remove: (index) => store.update((s) => ({ ...s, lines: s.lines.filter((_, j) => j !== index) })),
      toggleFav: (slug) =>
        store.update((s) => ({ ...s, favs: s.favs.includes(slug) ? s.favs.filter((f) => f !== slug) : [slug, ...s.favs] })),
      setDensity: (density) => store.update((s) => ({ ...s, density })),
    }),
    [state, toast, add, dismiss],
  );

  return <BagContext value={value}>{children}</BagContext>;
}
