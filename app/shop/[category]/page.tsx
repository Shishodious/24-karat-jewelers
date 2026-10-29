import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShopPage from "@/app/components/ShopPage";
import { getCategory, inCategory } from "@/app/lib/catalog";
import { categories } from "@/app/lib/site";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[category]">): Promise<Metadata> {
  const category = getCategory((await params).category);
  if (!category) return {};
  return {
    title: category.label,
    description: `${category.label} in hallmarked gold, polki and diamonds from 24 Karat Mahima Jewellers, with the price breakup on every piece.`,
  };
}

export default async function CategoryPage({ params }: PageProps<"/shop/[category]">) {
  const category = getCategory((await params).category);
  if (!category) notFound();
  return <ShopPage title={category.label} current={category.id} products={inCategory(category.id)} editorial={[category.editorial]} />;
}
