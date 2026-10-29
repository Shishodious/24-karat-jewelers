import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Inter_Tight } from "next/font/google";
import AddedToast from "./components/AddedToast";
import BagProvider from "./components/BagProvider";
import Header from "./components/Header";
import InlineScript from "./components/InlineScript";
import { introScript } from "./lib/intro";
import { brand } from "./lib/site";
import "./globals.css";

// Bodoni for the wordmark and the big titles, a tight grotesk for everything else.
const display = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz"],
});

const sans = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: { default: `${brand.name} · ${brand.tagline}`, template: `%s · ${brand.name}` },
  description: brand.description,
  openGraph: {
    title: `${brand.name} · ${brand.tagline}`,
    description: brand.description,
    siteName: brand.name,
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <InlineScript html={introScript} />
      </head>
      <body>
        <BagProvider>
          <a className="skip" href="#main">
            Skip to content
          </a>
          <Header />
          {children}
          <AddedToast />
        </BagProvider>
      </body>
    </html>
  );
}
