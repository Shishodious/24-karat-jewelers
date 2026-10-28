import { categories, collections, products, type CategoryId, type CollectionId } from "./site";

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (id: string) => categories.find((c) => c.id === id);
export const getCollection = (id: string) => collections.find((c) => c.id === id);

export const inCategory = (id: CategoryId) => products.filter((p) => p.category === id);
export const inCollection = (id: CollectionId) => products.filter((p) => p.collection === id);
export const newIn = () => products.filter((p) => p.isNew);

// Same collection first, then same category, never the piece itself.
export function related(slug: string, count = 4) {
  const p = getProduct(slug);
  if (!p) return [];
  const rest = products.filter((x) => x.slug !== slug);
  const ranked = [
    ...rest.filter((x) => x.collection === p.collection),
    ...rest.filter((x) => x.collection !== p.collection && x.category === p.category),
  ];
  return ranked.slice(0, count);
}
