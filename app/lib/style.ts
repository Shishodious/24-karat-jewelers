import type { CSSProperties } from "react";

// Typed CSS custom properties for inline styles.
export const vars = (v: Record<`--${string}`, string | number>) => v as CSSProperties;
