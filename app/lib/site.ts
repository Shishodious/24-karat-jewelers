// Every word, price and photo on the site lives in this file. Components read from it, so don't hard-code copy in JSX.
// Prices are not typed in: each product has a gold weight, making charge and stone value, and the price is worked out
// from today's gold rate below (see app/lib/price.ts). Update `goldRate.per24k` every morning and every price follows.

export const brand = {
  name: "24 Karat Jewelers",
  short: "24 Karat",
  established: 1994,
  tagline: "Fine Indian jewellery, priced by the gram",
  description:
    "Bridal, polki, temple and everyday gold from a Delhi family jeweller since 1994. BIS hallmarked, priced at today's gold rate, with the full price breakup on every piece.",
  url: "https://24karatjewelers.in",
  email: "care@24karatjewelers.in",
  phone: "+91 98100 24024",
  phoneHref: "tel:+919810024024",
  // Country code + number, digits only. The bag, try-ons and appointments are sent here on WhatsApp.
  whatsappNumber: "919810024024",
  instagram: "https://instagram.com/",
  instagramHandle: "@24karatjewelers",
  socials: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "Facebook", href: "https://facebook.com/" },
    { label: "Pinterest", href: "https://pinterest.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
    { label: "WhatsApp", href: "https://wa.me/919810024024" },
  ],
  legal: "24 Karat Jewelers Pvt. Ltd. · GSTIN 07XXXXX0000X1ZX · BIS Licence HM/C-XXXXXXXXXX",
};

// Today's rate for 24K (999) gold, in rupees per gram. 22K, 18K and 14K follow from their fineness.
export const goldRate = {
  per24k: 12850,
  updated: "28 Oct 2026, 10:30 IST",
  note: "Indicative rate. The final price is confirmed at billing.",
};

export const gstRate = 0.03;

export type Purity = "22K" | "18K" | "14K";

export const purities: Record<Purity, { fineness: number; label: string }> = {
  "22K": { fineness: 0.916, label: "22K · 916" },
  "18K": { fineness: 0.75, label: "18K · 750" },
  "14K": { fineness: 0.585, label: "14K · 585" },
};

export const service = {
  delivery: "Free insured delivery across India in 3–7 days",
  returns: "15-day returns · lifetime exchange at today's gold value",
  hallmark: "BIS hallmarked with HUID",
};

// ---------- categories & collections ----------

export type CategoryId = "necklaces" | "earrings" | "bangles" | "rings" | "pendants" | "sets";

export type Category = {
  id: CategoryId;
  label: string;
  image: string; // category tile and menu preview
  editorial: string; // photo dropped into the product grid
  sizes?: string[];
  sizeLabel?: string;
};

export const categories: Category[] = [
  { id: "necklaces", label: "Necklaces", image: "/images/products/rani-haar.jpg", editorial: "/images/editorial/vivaah-gold.jpg" },
  { id: "earrings", label: "Earrings", image: "/images/products/paisley-jhumka.jpg", editorial: "/images/editorial/nitya-pearl-hoop.jpg" },
  {
    id: "bangles",
    label: "Bangles & Kadas",
    image: "/images/products/diamond-kada.jpg",
    editorial: "/images/editorial/vivaah-namaste.jpg",
    sizes: ["2.2", "2.4", "2.6", "2.8"],
    sizeLabel: "Bangle size",
  },
  {
    id: "rings",
    label: "Rings",
    image: "/images/products/stack-rings.jpg",
    editorial: "/images/editorial/nitya-hands.jpg",
    sizes: ["10", "12", "14", "16", "18"],
    sizeLabel: "Ring size",
  },
  { id: "pendants", label: "Pendants", image: "/images/products/teardrop-pendant.jpg", editorial: "/images/editorial/nitya-chikan.jpg" },
  { id: "sets", label: "Bridal Sets", image: "/images/products/jhumka-set.jpg", editorial: "/images/editorial/vivaah-kundan.jpg" },
];

// Photos dropped into the "All jewellery" and "New in" grids.
export const shopEditorial = {
  all: ["/images/editorial/polki-nath.jpg", "/images/editorial/mandir-teal.jpg", "/images/editorial/bride-nath.jpg"],
  new: ["/images/editorial/polki-smile.jpg"],
};

export type CollectionId = "vivaah" | "polki" | "mandir" | "nitya";

export type Collection = {
  id: CollectionId;
  name: string;
  line: string;
  season: string;
  intro: string;
  tone: "dark" | "light";
  // Hero: the first photo is used on phones; desktops show up to three side by side.
  hero: string[];
  // Editorial photos dropped into the product grid of the collection page.
  lookbook: string[];
};

export const collections: Collection[] = [
  {
    id: "vivaah",
    name: "Vivaah",
    line: "The Bridal Edit",
    season: "Wedding season 2026",
    intro:
      "Rani haars, chandbalis and kangans made to be handed down. Heavy 22K gold, hand-set kundan and rubies, finished for the weight of the day.",
    tone: "dark",
    hero: ["/images/editorial/vivaah-veil.jpg", "/images/editorial/vivaah-red.jpg", "/images/editorial/vivaah-tikka.jpg"],
    lookbook: ["/images/editorial/vivaah-namaste.jpg", "/images/editorial/vivaah-gold.jpg", "/images/editorial/bride-nath.jpg"],
  },
  {
    id: "polki",
    name: "Polki",
    line: "Uncut Diamonds",
    season: "Heirloom",
    intro:
      "Uncut diamonds set in 18K gold the Mughal way, foil-backed by hand so each stone glows rather than sparkles. Every polki is sorted, matched and set in our Karol Bagh workshop.",
    tone: "dark",
    hero: ["/images/editorial/polki-noir.jpg", "/images/editorial/polki-nath.jpg", "/images/editorial/polki-smile.jpg"],
    lookbook: ["/images/editorial/polki-emerald.jpg", "/images/editorial/polki-diamond.jpg", "/images/editorial/polki-amethyst.jpg"],
  },
  {
    id: "mandir",
    name: "Mandir",
    line: "Temple Gold",
    season: "Heritage",
    intro:
      "Lakshmi motifs, kasu coins and peacocks, hand-chased in 22K gold with the soft antique finish of a temple lamp. Made by karigars from Nagercoil and Thrissur.",
    tone: "dark",
    hero: ["/images/editorial/mandir-heritage.jpg", "/images/editorial/mandir-teal.jpg", "/images/products/paisley-jhumka.jpg"],
    lookbook: ["/images/editorial/mandir-teal.jpg", "/images/editorial/mandir-silk.jpg", "/images/editorial/jhumka-wall.jpg"],
  },
  {
    id: "nitya",
    name: "Nitya",
    line: "Everyday Gold",
    season: "Always",
    intro:
      "Drops, hoops and pendants in 18K gold, most under ten grams. Light enough to forget you're wearing, priced honestly by the gram.",
    tone: "light",
    hero: ["/images/editorial/nitya-chikan.jpg", "/images/products/gold-drops.jpg", "/images/products/twist-hoops.jpg"],
    lookbook: ["/images/editorial/nitya-huggie.jpg", "/images/editorial/nitya-hands.jpg", "/images/editorial/nitya-golden-hour.jpg"],
  },
];

// ---------- products ----------

export type Product = {
  slug: string;
  name: string;
  category: CategoryId;
  collection: CollectionId;
  images: string[]; // first is the packshot used in grids, second shows on hover
  purities: Purity[]; // first is the default
  weight: number; // gold weight in grams
  making: number; // making charge, % of gold value
  stones?: number; // value of stones in rupees
  stoneNote?: string;
  text: string;
  specs: string[];
  isNew?: boolean;
};

export const products: Product[] = [
  {
    slug: "rani-kundan-set",
    name: "Rani Kundan Necklace Set",
    category: "sets",
    collection: "polki",
    images: ["/images/products/kundan-set.jpg", "/images/editorial/polki-smile.jpg"],
    purities: ["22K"],
    weight: 68,
    making: 18,
    stones: 85000,
    stoneNote: "Kundan, seed pearls and onyx",
    text: "A collar of hand-set kundan with a cascade of pearl drops, and jhumkas to match. Meenakari on the reverse, so the inside is as finished as the front.",
    specs: ["Necklace, pair of jhumkas", "Adjustable dori, 38–46 cm", "Meenakari reverse"],
    isNew: true,
  },
  {
    slug: "panna-polki-choker",
    name: "Panna Polki Choker",
    category: "necklaces",
    collection: "polki",
    images: ["/images/products/emerald-choker.jpg", "/images/editorial/polki-nath.jpg"],
    purities: ["18K"],
    weight: 38,
    making: 20,
    stones: 240000,
    stoneNote: "Uncut polki, Zambian emerald, Basra-style pearls",
    text: "Seven strands of pearls held by a polki frame and a single step-cut emerald. Sits high on the neck, made for a deep or off-shoulder blouse.",
    specs: ["Emerald approx. 6.2 ct", "Polki approx. 9.8 ct", "Adjustable dori"],
    isNew: true,
  },
  {
    slug: "rani-haar",
    name: "Rani Haar Bridal Necklace",
    category: "necklaces",
    collection: "vivaah",
    images: ["/images/products/rani-haar.jpg", "/images/editorial/vivaah-red.jpg"],
    purities: ["22K"],
    weight: 58,
    making: 14,
    text: "A long bridal haar in hand-cut 22K gold, built in hinged panels so it falls flat against the lehenga. Comes with matching drop earrings.",
    specs: ["Necklace, pair of earrings", "Length 46 cm", "Hinged panels"],
    isNew: true,
  },
  {
    slug: "mayur-jhumka",
    name: "Mayur Paisley Jhumka",
    category: "earrings",
    collection: "mandir",
    images: ["/images/products/paisley-jhumka.jpg", "/images/editorial/nitya-golden-hour.jpg"],
    purities: ["22K", "18K"],
    weight: 18.5,
    making: 14,
    text: "Peacock-feather paisleys over a temple jhumka, with chains to take the weight off the lobe. Antique finish, hand-chased detail.",
    specs: ["Length 7.5 cm", "Ear chains included", "Screw back"],
    isNew: true,
  },
  {
    slug: "bindu-gold-drops",
    name: "Bindu Gold Drops",
    category: "earrings",
    collection: "nitya",
    images: ["/images/products/gold-drops.jpg", "/images/editorial/nitya-huggie.jpg"],
    purities: ["18K", "22K"],
    weight: 6.4,
    making: 12,
    text: "A single polished drop, hollow so it stays light. The earring you put on in the morning and forget about.",
    specs: ["Length 2.4 cm", "Hollow form", "Push back"],
    isNew: true,
  },
  {
    slug: "tara-diamond-set",
    name: "Tara Diamond Necklace Set",
    category: "sets",
    collection: "polki",
    images: ["/images/products/diamond-set.jpg", "/images/editorial/polki-diamond.jpg"],
    purities: ["18K"],
    weight: 24,
    making: 18,
    stones: 285000,
    stoneNote: "Natural diamonds, VS–SI, G–H",
    text: "Round and pear diamonds set in a fine line that ends in a single drop. Light enough for the reception, serious enough for the wedding.",
    specs: ["Diamonds approx. 4.1 ct", "IGI certified", "Necklace, pair of earrings"],
    isNew: true,
  },
  {
    slug: "manik-teardrop-earrings",
    name: "Manik Teardrop Earrings",
    category: "earrings",
    collection: "vivaah",
    images: ["/images/products/ruby-drops.jpg", "/images/editorial/nitya-ear.jpg"],
    purities: ["18K"],
    weight: 9.8,
    making: 18,
    stones: 64000,
    stoneNote: "Rubies with a diamond halo",
    text: "Two rubies, one round and one pear, each in a halo of diamonds. Hangs just below the jaw.",
    specs: ["Length 5.2 cm", "Rubies approx. 3.4 ct", "Screw back"],
  },
  {
    slug: "lakshmi-temple-necklace",
    name: "Lakshmi Temple Necklace",
    category: "necklaces",
    collection: "mandir",
    images: ["/images/products/temple-necklace.jpg", "/images/editorial/mandir-teal.jpg"],
    purities: ["22K"],
    weight: 46,
    making: 15,
    stones: 18000,
    stoneNote: "Rubies and emeralds",
    text: "Gold leaves fall from a Lakshmi pendant set with rubies, the classic Nagercoil necklace with studs to match.",
    specs: ["Necklace, pair of studs", "Length 40 cm", "Antique finish"],
  },
  {
    slug: "chand-chandbali",
    name: "Chand Chandbali",
    category: "earrings",
    collection: "vivaah",
    images: ["/images/products/chandbali.jpg", "/images/editorial/bride-turquoise.jpg"],
    purities: ["22K"],
    weight: 16,
    making: 15,
    stones: 12000,
    stoneNote: "Rubies, emeralds, seed pearls",
    text: "Crescent-moon chandbalis with a fringe of seed pearls. Big enough for the mandap, balanced so they don't pull.",
    specs: ["Length 6.8 cm", "Seed-pearl fringe", "Screw back"],
  },
  {
    slug: "manik-kangan-pair",
    name: "Manik Kangan, Pair",
    category: "bangles",
    collection: "vivaah",
    images: ["/images/products/ruby-kangan.jpg", "/images/products/ruby-bangle.jpg"],
    purities: ["22K"],
    weight: 44,
    making: 13,
    stones: 15000,
    stoneNote: "Rubies",
    text: "A pair of granulated kangans set with cabochon rubies. Solid, not hollow; they'll take a lifetime of weddings.",
    specs: ["Sold as a pair", "Width 9 mm", "Solid 22K"],
  },
  {
    slug: "heera-diamond-kada",
    name: "Heera Diamond Kada",
    category: "bangles",
    collection: "polki",
    images: ["/images/products/diamond-kada.jpg", "/images/products/polki-kada.jpg"],
    purities: ["18K"],
    weight: 32,
    making: 18,
    stones: 310000,
    stoneNote: "Natural diamonds, VS–SI, G–H",
    text: "An openable kada paved with diamonds and a clasp you can't see. One is a statement; two is a trousseau.",
    specs: ["Diamonds approx. 4.6 ct", "IGI certified", "Hinged, screw clasp"],
  },
  {
    slug: "moti-manik-haar",
    name: "Moti Manik Haar",
    category: "necklaces",
    collection: "vivaah",
    images: ["/images/products/ruby-pearl-haar.jpg", "/images/editorial/vivaah-gold.jpg"],
    purities: ["22K"],
    weight: 41,
    making: 15,
    stones: 38000,
    stoneNote: "Rubies, diamonds, freshwater pearls",
    text: "Fine gold mesh edged with pearls, ending in a ruby and diamond pendant. The necklace for the sangeet.",
    specs: ["Length 44 cm", "Detachable pendant", "Hook clasp"],
  },
  {
    slug: "boond-teardrop-pendant",
    name: "Boond Teardrop Pendant",
    category: "pendants",
    collection: "nitya",
    images: ["/images/products/teardrop-pendant.jpg", "/images/products/pendant-bust.jpg"],
    purities: ["18K"],
    weight: 5.8,
    making: 12,
    stones: 9000,
    stoneNote: "Diamond",
    text: "An open teardrop holding a single diamond, on a fine box chain. Wear it alone or under a mangalsutra.",
    specs: ["Chain 45 cm, included", "Pendant 2.8 cm", "Lobster clasp"],
  },
  {
    slug: "jaali-bangles-six",
    name: "Jaali Bangles, Set of Six",
    category: "bangles",
    collection: "vivaah",
    images: ["/images/products/filigree-bangles.jpg", "/images/editorial/vivaah-namaste.jpg"],
    purities: ["22K"],
    weight: 62,
    making: 11,
    text: "Six bangles in pierced filigree, each a little different. Stack them with the chooda or wear two at a time after.",
    specs: ["Set of six", "Width 6 mm", "Solid 22K"],
  },
  {
    slug: "kesar-bridal-set",
    name: "Kesar Bridal Set",
    category: "sets",
    collection: "vivaah",
    images: ["/images/products/bridal-set-dark.jpg", "/images/editorial/vivaah-kundan.jpg"],
    purities: ["22K"],
    weight: 72,
    making: 15,
    stones: 26000,
    stoneNote: "Rubies, emeralds, pearls",
    text: "Necklace and chandelier earrings in saffron-toned gold, with ruby drops along the edge.",
    specs: ["Necklace, pair of earrings", "Length 42 cm", "Adjustable dori"],
  },
  {
    slug: "mor-jhumka-set",
    name: "Mor Necklace & Jhumka Set",
    category: "sets",
    collection: "mandir",
    images: ["/images/products/jhumka-set.jpg", "/images/editorial/mandir-heritage.jpg"],
    purities: ["22K"],
    weight: 48,
    making: 15,
    stones: 22000,
    stoneNote: "Rubies and emeralds",
    text: "Peacock medallions linked by temple coins, with matching jhumkas. The set to wear with a Kanjivaram.",
    specs: ["Necklace, pair of jhumkas", "Length 42 cm", "Antique finish"],
  },
  {
    slug: "lakshmi-kasu-pendant",
    name: "Lakshmi Kasu Pendant",
    category: "pendants",
    collection: "mandir",
    images: ["/images/products/coin-pendant.jpg"],
    purities: ["22K"],
    weight: 14,
    making: 12,
    stones: 4000,
    stoneNote: "Rubies",
    text: "A domed temple pendant with a ruby fringe, on a rope chain. The everyday version of a temple necklace.",
    specs: ["Chain 50 cm, included", "Pendant 3.4 cm", "Antique finish"],
  },
  {
    slug: "bel-twisted-hoops",
    name: "Bel Twisted Hoops",
    category: "earrings",
    collection: "nitya",
    images: ["/images/products/twist-hoops.jpg", "/images/editorial/nitya-hands.jpg"],
    purities: ["18K", "22K"],
    weight: 7.2,
    making: 12,
    text: "Chunky rope-twist hoops that are lighter than they look. Polished to catch the light from every side.",
    specs: ["Diameter 2.2 cm", "Hollow form", "Hinged snap"],
  },
  {
    slug: "noor-solitaire-ring",
    name: "Noor Solitaire Ring",
    category: "rings",
    collection: "polki",
    images: ["/images/products/solitaire.jpg"],
    purities: ["18K", "14K"],
    weight: 4.2,
    making: 18,
    stones: 165000,
    stoneNote: "Natural diamond, 0.70 ct, VS1, G, with halo",
    text: "A round brilliant in a halo, on a split shank paved with diamonds. Comes with its certificate and a velvet box.",
    specs: ["Centre stone 0.70 ct", "IGI certified", "Free resizing in 30 days"],
  },
  {
    slug: "trio-stacking-rings",
    name: "Trio Stacking Rings",
    category: "rings",
    collection: "nitya",
    images: ["/images/products/stack-rings.jpg", "/images/products/ring-block.jpg"],
    purities: ["18K", "14K"],
    weight: 6,
    making: 12,
    stones: 14000,
    stoneNote: "Diamonds",
    text: "Three fine rings, a heart, a knot and a leaf, to wear together or apart. Rose-toned 18K gold.",
    specs: ["Set of three", "Band 1.6 mm", "Free resizing in 30 days"],
  },
  {
    slug: "nakshi-cocktail-ring",
    name: "Nakshi Cocktail Ring",
    category: "rings",
    collection: "mandir",
    images: ["/images/products/nakshi-rings.jpg"],
    purities: ["22K"],
    weight: 9,
    making: 14,
    text: "Nakshi work, gold repoussé of flowers and leaves, built up into a dome. A ring for the hand that holds the diya.",
    specs: ["Face 2.1 cm", "Hand-chased", "Free resizing in 30 days"],
  },
  {
    slug: "jaal-mesh-necklace",
    name: "Jaal Mesh Necklace",
    category: "necklaces",
    collection: "vivaah",
    images: ["/images/products/jaal-necklace.jpg", "/images/editorial/vivaah-ivory.jpg"],
    purities: ["22K"],
    weight: 36,
    making: 13,
    text: "A bib of woven gold mesh that moves like fabric, with long drops to match. Lighter than it looks.",
    specs: ["Necklace, pair of earrings", "Length 40 cm", "Hook clasp"],
  },
  {
    slug: "lal-meena-jhumka",
    name: "Lal Meena Jhumka",
    category: "earrings",
    collection: "mandir",
    images: ["/images/products/red-jhumka.jpg"],
    purities: ["22K"],
    weight: 14,
    making: 15,
    text: "Temple jhumkas with red meenakari under the dome and a fringe of gold beads.",
    specs: ["Length 4.6 cm", "Meenakari", "Screw back"],
  },
  {
    slug: "surya-oval-pendant",
    name: "Surya Oval Pendant",
    category: "pendants",
    collection: "nitya",
    images: ["/images/products/oval-pendant.jpg"],
    purities: ["18K", "22K"],
    weight: 8.6,
    making: 12,
    text: "A polished open oval on a snake chain. Simple, heavy enough to hang straight.",
    specs: ["Chain 45 cm, included", "Pendant 3 cm", "Lobster clasp"],
  },
  {
    slug: "kamal-bangle-pair",
    name: "Kamal Bangle Pair",
    category: "bangles",
    collection: "nitya",
    images: ["/images/products/bangle-pair.jpg", "/images/editorial/bride-haldi.jpg"],
    purities: ["22K", "18K"],
    weight: 21,
    making: 12,
    stones: 6000,
    stoneNote: "Cubic zirconia",
    text: "Slim bangles with a lotus bud at the front. A pair for every day, and a gift that gets worn.",
    specs: ["Sold as a pair", "Width 3 mm", "Solid"],
  },
  {
    slug: "rekha-cuff-kada",
    name: "Rekha Cuff Kada",
    category: "bangles",
    collection: "nitya",
    images: ["/images/products/textured-bangle.jpg"],
    purities: ["22K"],
    weight: 22,
    making: 12,
    text: "An open cuff with a fine engraved grid and two crossing bars. Slips on, no clasp.",
    specs: ["Open cuff", "Width 14 mm", "Engraved"],
  },
  {
    slug: "patra-kada",
    name: "Patra Kada",
    category: "bangles",
    collection: "mandir",
    images: ["/images/products/ornate-bangle.jpg"],
    purities: ["22K"],
    weight: 28,
    making: 13,
    text: "A wide kada of overlapping leaves, chased by hand and finished matte.",
    specs: ["Width 16 mm", "Screw clasp", "Matte finish"],
  },
  {
    slug: "saubhagya-gold-set",
    name: "Saubhagya Gold Set",
    category: "sets",
    collection: "vivaah",
    images: ["/images/products/gold-set.jpg", "/images/editorial/bride-rose.jpg"],
    purities: ["22K"],
    weight: 84,
    making: 13,
    stones: 12000,
    stoneNote: "Rubies",
    text: "Layered necklace, earrings and a pair of bangles: the full gold set a mother puts together for a daughter.",
    specs: ["Necklace, earrings, two bangles", "Layered, 3 strands", "Adjustable"],
  },
  {
    slug: "meenakari-long-haar-set",
    name: "Meenakari Long Haar Set",
    category: "sets",
    collection: "polki",
    images: ["/images/products/meenakari-set.jpg", "/images/editorial/polki-emerald.jpg"],
    purities: ["22K"],
    weight: 54,
    making: 16,
    stones: 42000,
    stoneNote: "Kundan, emerald and ruby beads, seed pearls",
    text: "Two long strands of emerald and ruby beads holding a carved kundan pendant, with jhumkas to match. Pink and green meenakari on the back.",
    specs: ["Necklace, pair of jhumkas", "Length 62 cm", "Meenakari reverse"],
  },
  {
    slug: "lal-kangan-stack",
    name: "Lal Kangan, Set of Four",
    category: "bangles",
    collection: "vivaah",
    images: ["/images/products/ruby-bangles-stack.jpg"],
    purities: ["22K"],
    weight: 52,
    making: 13,
    stones: 21000,
    stoneNote: "Rubies",
    text: "Four kangans, each ringed with cabochon rubies in a raised collet. Made to be stacked with the bridal chooda.",
    specs: ["Set of four", "Width 8 mm", "Solid 22K"],
  },
  {
    slug: "do-rang-jhumka",
    name: "Do-Rang Jhumka",
    category: "earrings",
    collection: "nitya",
    images: ["/images/products/two-tone-jhumka.jpg"],
    purities: ["18K"],
    weight: 10,
    making: 14,
    text: "Two-tone jhumkas, white and yellow gold, with a pearl fringe. Goes with a chikankari kurta as easily as a sari.",
    specs: ["Length 3.8 cm", "White and yellow gold", "Push back"],
  },
];

// ---------- home ----------

export type Slide = {
  kicker: string;
  title: string;
  line: string;
  href: string;
  cta: string;
  tone: "dark" | "light";
  images: string[]; // first is used on phones
};

export const slides: Slide[] = [
  ...collections.map((c) => ({
    kicker: c.season,
    title: c.name,
    line: c.line,
    href: `/collections/${c.id}`,
    cta: "Discover",
    tone: c.tone,
    images: c.hero,
  })),
];

export const bridalRoom = {
  kicker: "By appointment",
  title: "The Bridal Room",
  text: "A private room, a cup of chai and two hours with our bridal stylist. Bring the lehenga swatch; we'll bring out the vault.",
  images: ["/images/editorial/vivaah-ivory.jpg", "/images/editorial/bride-turquoise.jpg"],
};

export const houseTeaser = {
  title: "Pure gold. Fair weight. Since 1994.",
  text: "Every piece is BIS hallmarked, weighed in front of you and priced at the morning's gold rate. The breakup is on every product page, so you know exactly what you are paying for.",
  image: "/images/editorial/jhumka-mono.jpg",
};

// ---------- the house ----------

export const story = {
  title: "A house of gold since 1994",
  lead: "24 Karat began as a single counter on Ajmal Khan Road, Karol Bagh. Three decades on it is still run by the family that opened it, and still weighs every piece in front of you.",
  paragraphs: [
    "Our karigars work upstairs from the shop. Polki is sorted and set by hand, temple work is chased with the same tools used in Nagercoil a century ago, and every piece is hallmarked before it leaves the building.",
    "We have never believed in hidden making charges. Gold is priced at the morning's rate, making is a percentage you can see, and when you bring a piece back, we give you the full value of its gold.",
  ],
  images: ["/images/editorial/mandir-heritage.jpg", "/images/editorial/jhumka-wall.jpg"],
};

export const promises = [
  { title: "Hallmarked", text: "Every piece carries a BIS hallmark and a six-digit HUID you can check on the BIS CARE app." },
  { title: "Priced by the gram", text: "Gold at today's rate, making as a percentage, stones at their value. Itemised on every piece." },
  { title: "Lifetime exchange", text: "Bring back any 24 Karat piece and get 100% of its gold value at the day's rate." },
  { title: "Certified stones", text: "Diamonds over 0.30 ct come with an IGI or GIA certificate. Polki is graded and weighed." },
];

export const craft = [
  { title: "Drawing", text: "Every design starts as a pencil drawing at full size, checked against the body before any gold is cut." },
  { title: "Casting & chasing", text: "Gold is melted, drawn and cast in the workshop, then chased by hand for temple and nakshi work." },
  { title: "Setting", text: "Kundan and polki are set into pure gold foil, the old way, and backed with meenakari." },
  { title: "Hallmarking", text: "Each piece is assayed and laser-marked with its HUID before it is polished and boxed." },
];

export const faqs = [
  {
    q: "How is the price worked out?",
    a: "Gold value (weight × today's rate for that purity) + making charges + the value of any stones, with 3% GST on top. The full breakup is on every product page, and the final price is confirmed at the rate on the day of billing.",
  },
  {
    q: "Is all your gold hallmarked?",
    a: "Yes. Every piece carries the BIS hallmark with its purity and a six-digit HUID. You can check any HUID on the government's BIS CARE app.",
  },
  {
    q: "Do you exchange or buy back old gold?",
    a: "We exchange or buy back any 24 Karat piece at 100% of its gold value on the day. Other hallmarked gold is tested in front of you and valued at the same rate.",
  },
  {
    q: "Can I try a piece before buying?",
    a: "Book a try-on from any product page and we'll have it ready at the store you choose. For bridal orders we can also bring a selection to your home in Delhi NCR.",
  },
  {
    q: "How does delivery work?",
    a: "Delivery is free and fully insured across India, in 3–7 days. Made-to-order and bridal pieces take 3–5 weeks; we'll tell you the date before you pay.",
  },
  {
    q: "Can rings and bangles be resized?",
    a: "Yes, free within 30 days of purchase. After that, resizing is charged only for the gold added.",
  },
];

// ---------- stores ----------

export const stores = [
  {
    id: "karol-bagh",
    name: "Karol Bagh",
    label: "Flagship",
    address: ["24 Ajmal Khan Road", "Karol Bagh, New Delhi 110005"],
    hours: ["Tue–Sun 11:00–20:30", "Closed Monday"],
    phone: "+91 98100 24024",
    phoneHref: "tel:+919810024024",
    map: "https://maps.google.com/?q=Ajmal+Khan+Road+Karol+Bagh+New+Delhi",
    image: "/images/editorial/store-window.jpg",
    bridal: true,
  },
  {
    id: "south-ex",
    name: "South Extension",
    label: "Bridal Room",
    address: ["E-12 South Extension Part II", "New Delhi 110049"],
    hours: ["Mon–Sun 11:00–21:00"],
    phone: "+91 98100 24025",
    phoneHref: "tel:+919810024025",
    map: "https://maps.google.com/?q=South+Extension+Part+II+New+Delhi",
    image: "/images/editorial/jhumka-wall.jpg",
    bridal: true,
  },
  {
    id: "gurugram",
    name: "Gurugram",
    label: "Galleria",
    address: ["Shop 24, Galleria Market, DLF Phase IV", "Gurugram 122009"],
    hours: ["Mon–Sun 11:00–21:00"],
    phone: "+91 98100 24026",
    phoneHref: "tel:+919810024026",
    map: "https://maps.google.com/?q=Galleria+Market+DLF+Phase+IV+Gurugram",
    image: "/images/editorial/jhumka-mono.jpg",
    bridal: false,
  },
];

export const appointmentTopics = ["Bridal jewellery", "Polki & diamonds", "Everyday gold", "Try on a piece", "Old gold exchange", "Repairs & resizing"];

export const appointmentSlots = ["11:00", "12:30", "14:00", "15:30", "17:00", "18:30"];

// ---------- navigation ----------

export const menu = {
  shop: [
    { label: "New in", href: "/shop/new" },
    { label: "All jewellery", href: "/shop" },
    ...categories.map((c) => ({ label: c.label, href: `/shop/${c.id}`, image: c.image })),
  ],
  house: [
    { label: "Our story", href: "/house", image: "/images/editorial/mandir-heritage.jpg" },
    { label: "Gold rate today", href: "/house#gold-rate", image: "/images/editorial/jhumka-mono.jpg" },
    { label: "Stores & appointments", href: "/stores", image: "/images/editorial/store-window.jpg" },
    { label: "Client services", href: "/house#services", image: "/images/editorial/jhumka-wall.jpg" },
  ],
};

export const popularSearches = ["Jhumka", "Kundan", "Bangles", "Polki", "Temple", "Diamond", "Pendant", "Bridal"];
