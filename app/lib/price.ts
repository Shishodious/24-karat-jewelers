import { goldRate, gstRate, purities, type Product, type Purity } from "./site";

const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

export const formatINR = (n: number) => `₹${inr.format(Math.round(n))}`;

export const ratePerGram = (purity: Purity) => Math.round(goldRate.per24k * purities[purity].fineness);

// Gold at today's rate + making + stones, then GST on the lot. The same breakup a jeweller writes on the bill.
export function priceOf(product: Product, purity: Purity = product.purities[0]) {
  const gold = Math.round(product.weight * ratePerGram(purity));
  const making = Math.round((gold * product.making) / 100);
  const stones = product.stones ?? 0;
  const gst = Math.round((gold + making + stones) * gstRate);
  return { gold, making, stones, gst, total: gold + making + stones + gst };
}

export const priceFrom = (product: Product) => Math.min(...product.purities.map((p) => priceOf(product, p).total));
