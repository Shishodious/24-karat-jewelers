import { formatINR, ratePerGram } from "@/app/lib/price";
import { goldRate, promises, service } from "@/app/lib/site";

// A slow band of the morning's rates and the house promises. The list runs twice so the loop is seamless;
// the copy is hidden from screen readers.
export default function Ticker() {
  const items = [
    `Gold today · 24K ${formatINR(goldRate.per24k)}/g`,
    `22K ${formatINR(ratePerGram("22K"))}/g`,
    `18K ${formatINR(ratePerGram("18K"))}/g`,
    ...promises.map((p) => p.title),
    service.delivery,
  ];
  return (
    <section className="ticker" aria-label="Today's gold rate and our promises">
      <div className="ticker-track">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 ? true : undefined}>
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
