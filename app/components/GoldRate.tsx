import { formatINR, ratePerGram } from "@/app/lib/price";
import { goldRate, purities, type Purity } from "@/app/lib/site";

const rows: { label: string; perGram: number }[] = [
  { label: "24K · 999", perGram: goldRate.per24k },
  ...(Object.keys(purities) as Purity[]).map((p) => ({ label: purities[p].label, perGram: ratePerGram(p) })),
];

export default function GoldRate({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="rate-line">
        <span className="rate-dot" aria-hidden="true" />
        <span>Gold today</span>
        {rows.slice(0, 3).map((r) => (
          <span key={r.label}>
            {r.label.split(" ")[0]} {formatINR(r.perGram)}/g
          </span>
        ))}
      </p>
    );
  }
  return (
    <div className="rate">
      <p className="rate-head">
        <span>
          <span className="rate-dot" aria-hidden="true" /> Gold rate today
        </span>
        <span>{goldRate.updated}</span>
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Purity</th>
            <th scope="col">1 gram</th>
            <th scope="col">10 grams</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              <td>{formatINR(r.perGram)}</td>
              <td>{formatINR(r.perGram * 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="rate-note">{goldRate.note}</p>
    </div>
  );
}
