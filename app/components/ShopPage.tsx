import { categories, type CategoryId, type Product } from "@/app/lib/site";
import Catalogue from "./Catalogue";
import Footer from "./Footer";

type Props = { title: string; current: CategoryId | "all" | "new"; products: Product[]; editorial: string[] };

export default function ShopPage({ title, current, products, editorial }: Props) {
  const nav = [
    { label: "All", href: "/shop", active: current === "all" },
    { label: "New in", href: "/shop/new", active: current === "new" },
    ...categories.map((c) => ({ label: c.label, href: `/shop/${c.id}`, active: current === c.id })),
  ];
  return (
    <>
      <main id="main" className="page">
        <header className="page-head">
          <h1 className="title">
            {title}
            <sup>{products.length}</sup>
          </h1>
        </header>
        <Catalogue products={products} nav={nav} editorial={editorial} />
      </main>
      <Footer />
    </>
  );
}
