# 24 Karat Jewelers

The website for 24 Karat Jewelers, a Delhi family jeweller: bridal, polki, temple and everyday gold. The design language is borrowed from fashion retail: black type on white paper, small uppercase labels, gapless photo grids and a Bodoni wordmark that runs as a masthead over full-screen photography. The photos carry all the colour.

Next.js 16 (App Router), React 19 and plain CSS. No UI or animation libraries.

```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | Full-screen pages that snap: one per collection, the Bridal Room, new in, categories, the house and today's gold rate, then the footer |
| `/shop`, `/shop/new`, `/shop/[category]` | Product grid with a sticky category bar, a 3-step grid density switch, filters (collection, purity, price) and sorting. Editorial photos sit inside the grid |
| `/collections/[slug]` | Vivaah, Polki, Mandir and Nitya: a full-screen cover, an intro and the collection's pieces with lookbook photos |
| `/product/[slug]` | Three columns on desktop (details and price breakup, photos, buy box), a swipeable gallery on phones. Purity switch reprices the piece live; bangles and rings ask for a size |
| `/bag` | Bag and favourites. "Reserve on WhatsApp" sends the bag as a message |
| `/search` | Live search across names, stones, collections and specs |
| `/house` | Story, four promises, the gold rate with a worked price example, how a piece is made, client services FAQ |
| `/stores` | Three stores and an appointment form that opens as a WhatsApp message |

## Make it yours

1. **Content: [`app/lib/site.ts`](app/lib/site.ts).** Brand details, collections, products, stores, FAQs and the home page copy all live here. Components read from it, so don't hard-code copy in JSX.
2. **Gold rate: `goldRate.per24k` in `site.ts`.** Prices are never typed in. Each product has a gold `weight`, a `making` charge (% of gold value) and an optional `stones` value; the price is `weight × today's rate for its purity + making + stones + 3% GST` (see [`app/lib/price.ts`](app/lib/price.ts)). Change the one number each morning and every price, breakup and the rate table follow. To pull the rate from an API instead, replace the constant with a cached fetch.
3. **Colours and type: the "Brand tokens" block at the top of [`app/globals.css`](app/globals.css).** It is deliberately black and white. Fonts (Bodoni Moda for the wordmark and titles, Inter Tight for everything else) are loaded in [`app/layout.tsx`](app/layout.tsx).
4. **Photos: `public/images`.** `editorial/` holds the campaign photos (home slides, collection covers, lookbooks); `products/` holds the packshots. On the home slides and collection covers the first photo is the one shown on phones; each slide's `tone` (`dark` or `light`) sets the header colour over it. Sources are listed in [`CREDITS.md`](CREDITS.md).
5. **Checkout and appointments.** There is no payment backend: the bag, "Book a try-on" and the appointment form all open WhatsApp to `brand.whatsappNumber`. Swap in a store checkout in [`app/components/BagView.tsx`](app/components/BagView.tsx) when there is one.
6. **Newsletter.** The footer form doesn't send the address anywhere yet. Wire it up at the `TODO` in [`app/components/NewsletterForm.tsx`](app/components/NewsletterForm.tsx).

### Replace before launch

- Phone numbers, WhatsApp number, email, social links and `brand.url`.
- `brand.legal` (GSTIN and BIS licence are placeholders).
- Store addresses and hours in `stores`.
- The founding story (`story`), the gold rate, and every product's weight, making charge and stone value.
- The stock photography, with the brand's own pieces.

## How it's built

- **Header** ([`Header.tsx`](app/components/Header.tsx)) reads whatever section sits under it: a `[data-tone]` section makes it transparent and sets its ink, and `[data-logo="big"]` scales the wordmark into a masthead (on phones it drops under the nav row). Everywhere else it is plain white.
- **Menu** ([`Menu.tsx`](app/components/Menu.tsx)) is a full-screen index in Bodoni with a photo preview that follows the pointer.
- **Bag, favourites and grid density** are kept in `localStorage` through a small store ([`lib/store.ts`](app/lib/store.ts)) read with `useSyncExternalStore`, so they sync across tabs and never cause hydration mismatches.
- **Product photos morph** from the grid into the product page with React's `<ViewTransition>`. Every product page is prerendered (`generateStaticParams`), so the morph has its pair ready on click.
- **Motion** is CSS only: scroll-driven `view()` timelines settle each home photo as it arrives, strips widen on hover, and everything switches off under `prefers-reduced-motion`.
- **SEO**: per-page titles and descriptions, an Open Graph image, and `Product` JSON-LD on every product page.
