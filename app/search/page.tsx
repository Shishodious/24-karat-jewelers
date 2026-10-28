import type { Metadata } from "next";
import Footer from "@/app/components/Footer";
import SearchView from "@/app/components/SearchView";

export const metadata: Metadata = { title: "Search" };

export default function Search() {
  return (
    <>
      <SearchView />
      <Footer />
    </>
  );
}
