import { products } from "./products";

/**
 * Homepage-only content.
 * Kept separate from `products.ts` (the real catalogue) since this
 * data — hero copy, campaign imagery, lookbook, privilege tiers —
 * is editorial/marketing content specific to the home route, not
 * shoppable product records.
 */

export const heroContent = {
  eyebrow: "BlackBro's Collections for you",
  headline: "FASHION BEYOND YOUR IMAGINATION.",
  subhead:
    "Build with finest quality for our finest selectors.",
  tone: "onyx" as const,
  image: "/Backdrop/hero-backdrop.jpeg",
};

export const genderSplit = [
  {
    id: "men",
    label: "Men",
    kicker: "Tailoring & outerwear",
    href: "/category/men",
    tone: "graphite" as const,
    image: "/images/home/gender-split-men.jpg"
    
  },
  {
    id: "women",
    label: "Women",
    kicker: "Considered ready-to-wear",
    href: "/category/women",
    tone: "bone" as const,
    image: "/images/home/gender-split-women.jpg",
  },
];

export const featuredCollectionSlugs = [
  "wool-overcoat-onyx",
  "merino-crewneck-bone",
  "leather-tote-graphite",
];

export const featuredCollection = products.filter((p) =>
  featuredCollectionSlugs.includes(p.slug)
);

export const campaignContent = {
  season: "FW26",
  title: "Held Together",
  copy:
    "Shot between shifts at a working dye house outside Porto — the same mill that's finished every BLACK BRO outer shell since the label began.",
  cta: { label: "View the campaign", href: "/editorial" },
  tone: "void" as const,
};

export const brandStory = {
  eyebrow: "Since 2020",
  title: "Fine fashion, rooted in heritage.",
    paragraphs: [
    "SJV Internationals built BlackBro on a simple idea: clothing shouldn't have to choose between heritage and the present moment. Since 2020, we've worked across borders  sourcing, tailoring, and shipping to wardrobes on every continent  carrying that idea into every piece we put our name on.",
    "From everyday layers to formalwear to festive traditional dress, the range is wide by design. What holds it together is a standard, not a category: careful construction, considered fabric, and a point of view that treats culture as inspiration rather than costume.",
  ],
  stat: { value: "2020", label: "est. — a global fashion house without borders" },
};
/**
 * About Us + customer service contact block shown on the homepage.
 * TODO: everything here is a placeholder — swap in the real company
 * description, support email and support phone number before launch.
 */
export const aboutUs = {
  eyebrow: "About Us",
  title: "What we do",
  description:
    "BlackBro by SJV Internationals is a global fashion house dedicated to crafting premium apparel and accessories for both men and women. Positioned at the intersection of international elegance and timeless heritage, we design, import, and export high-quality garments that bridge contemporary style with rich cultural roots.Our collection spans modern casuals, tailored formals, exquisite traditional wear, and curated accessories each piece tailored from the finest fabrics with exceptional attention to detail. At BlackBro, our mission is to deliver the authentic essence of fine fashion to every corner of the globe, offering a sophisticated wardrobe that honors tradition while embracing the future.",
  supportEmail: "sjvinternational@gmail.com",
  supportPhone: "+91 9821508069",
};

export interface PrivilegeTier {
  id: string;
  name: string;
  threshold: string;
  description: string;
  perks: string[];
}

export const privilegeTiers: PrivilegeTier[] = [
  {
    id: "access",
    name: "Access",
    threshold: "From day one",
    description:
      "Every account starts here — early sight of drops and the essentials of the program.",
    perks: [
      "48-hour early access to new arrivals",
      "Members-only restock alerts",
      "Free standard shipping",
    ],
  },
  {
    id: "reserve",
    name: "Reserve",
    threshold: "$1,200 / year",
    description:
      "For the wardrobe that's mostly ours already. Priority handling and a direct line to stylists.",
    perks: [
      "Everything in Access",
      "Priority customer care line",
      "Complimentary alterations",
      "Invitations to studio sales",
    ],
  },
  {
    id: "icon",
    name: "Icon",
    threshold: "$4,000 / year",
    description:
      "The top of the program. First call on limited runs and a dedicated personal stylist.",
    perks: [
      "Everything in Reserve",
      "Personal stylist, on call",
      "First allocation on limited runs",
      "Annual gifted piece",
    ],
  },
];

export const lookbookItems = [
  { id: "look-01", index: "01", title: "The Overcoat Edit", span: "tall" as const },
  { id: "look-02", index: "02", title: "Studio Layers", span: "short" as const },
  { id: "look-03", index: "03", title: "After Hours", span: "short" as const },
  { id: "look-04", index: "04", title: "Off Duty", span: "tall" as const },
  { id: "look-05", index: "05", title: "Weekend Uniform", span: "short" as const },
];

export const shopTheLook = {
  title: "Shop the look",
  copy: "The overcoat, styled the way it left the studio.",
  hotspots: [
    { id: "hs-1", x: 32, y: 28, productSlug: "wool-overcoat-onyx" },
    { id: "hs-2", x: 62, y: 58, productSlug: "merino-crewneck-bone" },
    { id: "hs-3", x: 74, y: 82, productSlug: "leather-tote-graphite" },
  ],
};

export const socialGallery = {
  handle: "@blackbro",
  posts: Array.from({ length: 6 }, (_, i) => ({
    id: `social-${i + 1}`,
    index: i + 1,
  })),
};
