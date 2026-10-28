import Link from "next/link";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <>
      <main id="main" className="page lost">
        <p className="caps">Error 404</p>
        <h1 className="lost-title">Not in the vault</h1>
        <p>This page has been moved, sold or never existed.</p>
        <div className="lost-actions">
          <Link href="/shop" className="btn btn-solid">
            Shop jewellery
          </Link>
          <Link href="/" className="btn btn-line">
            Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
