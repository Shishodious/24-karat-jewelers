const paths = {
  bookmark: "M6 3.5h12v17l-6-4.2-6 4.2z",
  close: "M5 5l14 14M19 5L5 19",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  arrow: "M4 12h15M14 7l5 5-5 5",
  down: "M12 4v15M7 14l5 5 5-5",
} as const;

export type IconName = keyof typeof paths;

export default function Icon({ name, size = 18, filled = false }: { name: IconName; size?: number; filled?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.1}
      strokeLinecap="square"
      aria-hidden="true"
      className="icon"
    >
      <path d={paths[name]} />
    </svg>
  );
}
