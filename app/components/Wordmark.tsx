// "24" sits as a raised numeral before KARAT, the way purity is written on a hallmark.
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`wordmark ${className}`} aria-hidden="true">
      <sup>24</sup>KARAT
    </span>
  );
}
