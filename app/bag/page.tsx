import type { Metadata } from "next";
import BagView from "@/app/components/BagView";

export const metadata: Metadata = { title: "Bag", robots: { index: false } };

export default function Bag() {
  return <BagView />;
}
