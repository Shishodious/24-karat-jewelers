import type { Metadata } from "next";
import ShopPage from "@/app/components/ShopPage";
import { newIn } from "@/app/lib/catalog";
import { shopEditorial } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "New in",
  description: "The newest pieces from the 24 Karat Mahima workshop.",
};

export default function NewIn() {
  return <ShopPage title="New in" current="new" products={newIn()} editorial={shopEditorial.new} />;
}
