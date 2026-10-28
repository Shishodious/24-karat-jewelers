import type { Metadata } from "next";
import ShopPage from "@/app/components/ShopPage";
import { products, shopEditorial } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "All jewellery",
  description: "Necklaces, earrings, bangles, rings, pendants and bridal sets in hallmarked 22K and 18K gold, priced at today's gold rate.",
};

export default function Shop() {
  return <ShopPage title="All jewellery" current="all" products={products} editorial={shopEditorial.all} />;
}
