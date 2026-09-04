import type {
  MediaTone,
  Product,
  ProductCategory,
  ProductFitInfo,
  ProductImage,
  ProductVariant,
} from "@/types";

// ---------------------------------------------------------------------------
// Shop taxonomy demo catalogue (Men / Women / Formal / Casuals / Inners /
// Accessories / Additionals) — generated from compact specs below so every
// product gets a full, consistent shape (sizes, colours, gallery images,
// features/materials/fit) without hand-writing the boilerplate 28 times.
// ---------------------------------------------------------------------------

interface ColorSpec {
  value: string;
  swatch: string;
  tone: MediaTone;
}

interface SizeSpec {
  value: string;
  inventory: number;
}

interface ProductSpec {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  gender?: "men" | "women" | "unisex";
  price: number;
  compareAt?: number;
  description: string;
  features: string[];
  materials: string[];
  fit: ProductFitInfo;
  sizes: SizeSpec[];
  colors: ColorSpec[];
  tags?: string[];
  isNew?: boolean;
  isSoldOut?: boolean;
  createdAt: string;
}

function slugify(value: string): string {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function makeProduct(spec: ProductSpec): Product {
  const sizeVariants: ProductVariant[] = spec.sizes.map((s) => ({
    id: `v-${spec.id}-size-${slugify(s.value)}`,
    optionName: "Size",
    value: s.value,
    inventory: s.inventory,
  }));

  const colorVariants: ProductVariant[] = spec.colors.map((c) => ({
    id: `v-${spec.id}-color-${slugify(c.value)}`,
    optionName: "Colour",
    value: c.value,
    swatch: c.swatch,
  }));

  const shots = ["Front", "Back", "Detail"];
  const images: ProductImage[] = spec.colors.flatMap((c, ci) =>
    shots.map((label, li) => ({
      id: `img-${spec.id}-${slugify(c.value)}-${li}`,
      url: `/images/products/${spec.slug}-${slugify(c.value)}-${li + 1}.jpg`,
      alt: `${spec.name} in ${c.value}, ${label.toLowerCase()} view`,
      isPrimary: ci === 0 && li === 0,
      tone: c.tone,
      caption: label,
      colorValue: c.value,
    }))
  );

  return {
    id: spec.id,
    slug: spec.slug,
    name: spec.name,
    brand: "BLACK BRO",
    description: spec.description,
    category: spec.category,
    gender: spec.gender,
    price: {
      amount: spec.price,
      currency: "INR",
      compareAtAmount: spec.compareAt,
    },
    images,
    variants: [...sizeVariants, ...colorVariants],
    features: spec.features,
    materials: spec.materials,
    fit: spec.fit,
    tags: spec.tags,
    isNew: spec.isNew,
    isSoldOut: spec.isSoldOut,
    createdAt: spec.createdAt,
  };
}

const APPAREL_SIZES: SizeSpec[] = [
  { value: "XS", inventory: 6 },
  { value: "S", inventory: 12 },
  { value: "M", inventory: 14 },
  { value: "L", inventory: 9 },
  { value: "XL", inventory: 4 },
];

function specs(): ProductSpec[] {
  return [
    // ---- Men ----
    {
      id: "p-101",
      slug: "mens-oxford-cotton-shirt",
      name: "Oxford Cotton Shirt",
      category: "men",
      gender: "men",
      price: 145,
      description:
        "A button-down Oxford shirt with a soft roll collar, cut for a clean line under a blazer or worn alone.",
      features: [
        "Button-down collar",
        "Single chest pocket",
        "Mother-of-pearl buttons",
        "Curved hem for tuck or untuck",
      ],
      materials: ["100% cotton Oxford weave"],
      fit: {
        description: "Tailored fit — closer through the body than a classic fit, true to size.",
        modelInfo: "Model is 6'1\" / 185cm, wearing size M",
        sizingNote: "Between sizes? Size up for a more relaxed drape.",
      },
      sizes: APPAREL_SIZES,
      colors: [
        { value: "White", swatch: "#f4f2ee", tone: "bone" },
        { value: "Sky Blue", swatch: "#a9bcc9", tone: "graphite" },
      ],
      tags: ["shirting", "cotton", "men"],
      isNew: true,
      createdAt: "2026-08-10T00:00:00.000Z",
    },
    {
      id: "p-102",
      slug: "mens-slim-fit-chinos",
      name: "Slim Fit Chinos",
      category: "men",
      gender: "men",
      price: 165,
      description:
        "Stretch-cotton chinos with a slim leg and a clean waistband, built for everyday wear that still holds a crease.",
      features: [
        "4-way stretch fabric",
        "Slim leg, tapered ankle",
        "Zip fly with metal button closure",
        "Reinforced pocket bags",
      ],
      materials: ["98% cotton", "2% elastane"],
      fit: {
        description: "Slim through the thigh, tapered at the ankle. True to size.",
        sizingNote: "Runs true to size; size down for a slimmer fit through the leg.",
      },
      sizes: APPAREL_SIZES,
      colors: [
        { value: "Khaki", swatch: "#b8a07a", tone: "gold" },
        { value: "Coal", swatch: "#2b2b28", tone: "onyx" },
      ],
      tags: ["trousers", "men"],
      createdAt: "2026-05-02T00:00:00.000Z",
    },
    {
      id: "p-103",
      slug: "mens-bomber-jacket",
      name: "Bomber Jacket",
      category: "men",
      gender: "men",
      price: 340,
      compareAt: 420,
      description:
        "A classic bomber silhouette in a brushed cotton-nylon blend, with ribbed cuffs and hem for a close finish.",
      features: [
        "Ribbed collar, cuffs and hem",
        "Two-way front zip",
        "Zippered chest pocket",
        "Quilted lining",
      ],
      materials: ["Shell: 60% cotton, 40% nylon", "Lining: 100% polyester"],
      fit: {
        description: "Regular fit with room to layer a knit underneath.",
        modelInfo: "Model is 6'0\" / 183cm, wearing size M",
      },
      sizes: APPAREL_SIZES,
      colors: [{ value: "Black", swatch: "#0a0a0a", tone: "void" }],
      tags: ["outerwear", "men", "sale"],
      createdAt: "2026-02-18T00:00:00.000Z",
    },
    {
      id: "p-104",
      slug: "mens-henley-long-sleeve",
      name: "Henley Long Sleeve Tee",
      category: "men",
      gender: "men",
      price: 78,
      description:
        "A heavyweight jersey Henley with a three-button placket — a layering staple that holds its shape wash after wash.",
      features: ["Three-button placket", "Ribbed collar", "Heavyweight jersey knit"],
      materials: ["100% combed cotton"],
      fit: {
        description: "Regular fit, sits close without being tight.",
      },
      sizes: APPAREL_SIZES,
      colors: [
        { value: "Charcoal", swatch: "#3a3936", tone: "graphite" },
        { value: "Bone", swatch: "#f4f2ee", tone: "bone" },
      ],
      tags: ["men", "casual"],
      createdAt: "2026-07-01T00:00:00.000Z",
    },

    // ---- Women ----
    {
      id: "p-201",
      slug: "womens-silk-wrap-blouse",
      name: "Silk Wrap Blouse",
      category: "women",
      gender: "women",
      price: 220,
      description:
        "A fluid silk blouse with a self-tie wrap front, cut for movement and equally at ease tucked into tailoring.",
      features: ["Self-tie wrap front", "Dropped shoulder seam", "Curved hem"],
      materials: ["100% mulberry silk"],
      fit: {
        description: "Relaxed fit through the body with a fluid drape.",
        modelInfo: "Model is 5'9\" / 175cm, wearing size S",
      },
      sizes: APPAREL_SIZES,
      colors: [
        { value: "Ivory", swatch: "#efece5", tone: "bone" },
        { value: "Espresso", swatch: "#3a2c22", tone: "graphite" },
      ],
      tags: ["women", "silk"],
      isNew: true,
      createdAt: "2026-08-14T00:00:00.000Z",
    },
    {
      id: "p-202",
      slug: "womens-wide-leg-trousers",
      name: "Tailored Wide-Leg Trousers",
      category: "women",
      gender: "women",
      price: 210,
      description:
        "High-waisted wide-leg trousers in a fluid wool blend, finished with a clean pressed crease.",
      features: ["High-rise waistband", "Wide, fluid leg", "Side zip closure", "Pressed front crease"],
      materials: ["70% wool", "28% viscose", "2% elastane"],
      fit: {
        description: "High-waisted and wide through the leg; true to size.",
      },
      sizes: APPAREL_SIZES,
      colors: [{ value: "Black", swatch: "#0a0a0a", tone: "void" }],
      tags: ["women", "trousers"],
      createdAt: "2026-04-11T00:00:00.000Z",
    },
    {
      id: "p-203",
      slug: "womens-wool-blend-coat",
      name: "Wool Blend Coat",
      category: "women",
      gender: "women",
      price: 480,
      description:
        "A single-breasted wool-blend coat with a clean collar and hidden button placket for an unbroken front line.",
      features: ["Hidden button placket", "Welt front pockets", "Interior utility pocket"],
      materials: ["80% wool", "20% polyamide"],
      fit: {
        description: "Regular fit, cut to layer over knitwear.",
        modelInfo: "Model is 5'10\" / 178cm, wearing size M",
      },
      sizes: APPAREL_SIZES,
      colors: [
        { value: "Camel", swatch: "#c9a877", tone: "gold" },
        { value: "Onyx", swatch: "#161615", tone: "onyx" },
      ],
      tags: ["women", "outerwear"],
      createdAt: "2026-08-05T00:00:00.000Z",
    },
    {
      id: "p-204",
      slug: "womens-ribbed-knit-midi-dress",
      name: "Ribbed Knit Midi Dress",
      category: "women",
      gender: "women",
      price: 165,
      description:
        "A body-skimming ribbed knit dress in a midi length, simple enough to dress up or down.",
      features: ["Ribbed knit construction", "Midi length", "Crew neckline"],
      materials: ["68% viscose", "27% polyester", "5% elastane"],
      fit: {
        description: "Body-hugging fit; size up for a more relaxed silhouette.",
      },
      sizes: APPAREL_SIZES,
      colors: [
        { value: "Bone", swatch: "#f4f2ee", tone: "bone" },
        { value: "Black", swatch: "#0a0a0a", tone: "void" },
      ],
      tags: ["women", "knitwear"],
      createdAt: "2026-06-22T00:00:00.000Z",
    },

    // ---- Formal ----
    {
      id: "p-301",
      slug: "two-button-wool-blazer",
      name: "Two-Button Wool Blazer",
      category: "formal",
      gender: "men",
      price: 520,
      description:
        "A half-canvassed two-button blazer in Italian wool twill, cut with a soft shoulder and a slightly cropped length.",
      features: ["Half-canvas construction", "Soft, natural shoulder", "Functioning cuff buttons", "Double vent"],
      materials: ["100% wool twill", "Lining: 100% cupro"],
      fit: {
        description: "Tailored fit through the chest and waist.",
        modelInfo: "Model is 6'1\" / 185cm, wearing size 40R",
        sizingNote: "Runs true to standard jacket sizing.",
      },
      sizes: [
        { value: "38R", inventory: 3 },
        { value: "40R", inventory: 6 },
        { value: "42R", inventory: 5 },
        { value: "44R", inventory: 2 },
      ],
      colors: [{ value: "Charcoal", swatch: "#3a3936", tone: "graphite" }],
      tags: ["formal", "men", "tailoring"],
      isNew: true,
      createdAt: "2026-08-20T00:00:00.000Z",
    },
    {
      id: "p-302",
      slug: "pleated-formal-trousers",
      name: "Pleated Formal Trousers",
      category: "formal",
      gender: "men",
      price: 190,
      description:
        "Double-pleated formal trousers with a fuller leg and a clean break, cut to pair with the two-button blazer.",
      features: ["Double front pleats", "Extended waistband closure", "Braces buttons inside waistband"],
      materials: ["100% wool twill"],
      fit: { description: "Classic fit through the seat and thigh, tapering to the hem." },
      sizes: [
        { value: "30", inventory: 5 },
        { value: "32", inventory: 8 },
        { value: "34", inventory: 6 },
        { value: "36", inventory: 3 },
      ],
      colors: [{ value: "Charcoal", swatch: "#3a3936", tone: "graphite" }],
      tags: ["formal", "men", "trousers"],
      createdAt: "2026-08-20T00:00:00.000Z",
    },
    {
      id: "p-303",
      slug: "satin-evening-gown",
      name: "Satin Evening Gown",
      category: "formal",
      gender: "women",
      price: 610,
      description:
        "A bias-cut satin gown that falls in a single clean line, finished with a low back and a thin adjustable strap.",
      features: ["Bias cut", "Low back", "Adjustable straps", "Side zip closure"],
      materials: ["100% silk satin"],
      fit: {
        description: "Body-skimming bias cut; true to size.",
        modelInfo: "Model is 5'10\" / 178cm, wearing size S",
      },
      sizes: APPAREL_SIZES,
      colors: [
        { value: "Onyx", swatch: "#161615", tone: "onyx" },
        { value: "Bordeaux", swatch: "#5c2028", tone: "graphite" },
      ],
      tags: ["formal", "women"],
      createdAt: "2026-07-28T00:00:00.000Z",
    },
    {
      id: "p-304",
      slug: "formal-pocket-square-set",
      name: "Formal Pocket Square Set",
      category: "formal",
      gender: "unisex",
      price: 65,
      description:
        "A set of three silk pocket squares in coordinating tones, hand-rolled at the edge.",
      features: ["Hand-rolled edges", "Set of three", "Gift-boxed"],
      materials: ["100% silk twill"],
      fit: { description: "One size — 16in x 16in / 41cm x 41cm each." },
      sizes: [{ value: "One Size", inventory: 20 }],
      colors: [{ value: "Onyx Multi", swatch: "#161615", tone: "onyx" }],
      tags: ["formal", "accessories"],
      createdAt: "2026-03-14T00:00:00.000Z",
    },

    // ---- Casuals ----
    {
      id: "p-401",
      slug: "relaxed-denim-jacket",
      name: "Relaxed Denim Jacket",
      category: "casuals",
      gender: "unisex",
      price: 195,
      description:
        "A boxy, oversized denim jacket in a rigid selvedge weave that softens and fades with wear.",
      features: ["Boxy, oversized fit", "Chest flap pockets", "Adjustable button cuffs"],
      materials: ["100% cotton selvedge denim"],
      fit: { description: "Oversized fit — size down for a closer fit." },
      sizes: APPAREL_SIZES,
      colors: [
        { value: "Indigo", swatch: "#2c3e57", tone: "graphite" },
        { value: "Washed Black", swatch: "#232322", tone: "onyx" },
      ],
      tags: ["casuals", "denim"],
      isNew: true,
      createdAt: "2026-08-18T00:00:00.000Z",
    },
    {
      id: "p-402",
      slug: "everyday-crewneck-sweatshirt",
      name: "Everyday Crewneck Sweatshirt",
      category: "casuals",
      gender: "unisex",
      price: 110,
      description:
        "A heavyweight loopback cotton sweatshirt, garment-dyed for a soft, lived-in hand feel.",
      features: ["Loopback cotton construction", "Garment-dyed", "Ribbed collar, cuffs and hem"],
      materials: ["100% cotton"],
      fit: { description: "Regular, slightly relaxed fit." },
      sizes: APPAREL_SIZES,
      colors: [
        { value: "Stone", swatch: "#8c8880", tone: "bone" },
        { value: "Black", swatch: "#0a0a0a", tone: "void" },
      ],
      tags: ["casuals", "sweatshirt"],
      createdAt: "2026-05-30T00:00:00.000Z",
    },
    {
      id: "p-403",
      slug: "cargo-joggers",
      name: "Cargo Joggers",
      category: "casuals",
      gender: "unisex",
      price: 130,
      description:
        "Tapered cargo joggers in a brushed cotton twill, with utility pockets and an elasticated hem.",
      features: ["Side cargo pockets", "Elasticated waist and hem", "Tapered leg"],
      materials: ["98% cotton", "2% elastane"],
      fit: { description: "Relaxed through the thigh, tapered at the ankle." },
      sizes: APPAREL_SIZES,
      colors: [{ value: "Olive", swatch: "#5c5c40", tone: "graphite" }],
      tags: ["casuals", "trousers"],
      createdAt: "2026-04-25T00:00:00.000Z",
    },
    {
      id: "p-404",
      slug: "linen-short-sleeve-shirt",
      name: "Linen Short-Sleeve Shirt",
      category: "casuals",
      gender: "unisex",
      price: 120,
      description:
        "A breathable, textured linen shirt with a camp collar, built for warm-weather rotation.",
      features: ["Camp collar", "Single chest pocket", "Relaxed short sleeve"],
      materials: ["100% linen"],
      fit: { description: "Relaxed fit, meant to be worn untucked." },
      sizes: APPAREL_SIZES,
      colors: [
        { value: "Natural", swatch: "#ddd8cd", tone: "bone" },
        { value: "Rust", swatch: "#a45a35", tone: "gold" },
      ],
      tags: ["casuals", "linen", "summer"],
      createdAt: "2026-06-02T00:00:00.000Z",
    },

    // ---- Inners ----
    {
      id: "p-501",
      slug: "cotton-stretch-boxer-briefs-3-pack",
      name: "Cotton Stretch Boxer Briefs (3-Pack)",
      category: "inners",
      gender: "men",
      price: 55,
      description:
        "A three-pack of everyday boxer briefs in a breathable cotton-elastane blend with a no-roll waistband.",
      features: ["No-roll waistband", "Flat-lock seams", "Set of three"],
      materials: ["95% cotton", "5% elastane"],
      fit: { description: "Fitted, sits close to the body without restriction." },
      sizes: APPAREL_SIZES,
      colors: [{ value: "Black Multi", swatch: "#0a0a0a", tone: "void" }],
      tags: ["inners", "men", "essentials"],
      createdAt: "2026-03-01T00:00:00.000Z",
    },
    {
      id: "p-502",
      slug: "seamless-everyday-vest",
      name: "Seamless Everyday Vest",
      category: "inners",
      gender: "men",
      price: 38,
      description:
        "A seamless cotton-modal vest designed to sit invisibly under fitted shirting.",
      features: ["Seamless construction", "Lightweight, breathable knit"],
      materials: ["60% cotton", "35% modal", "5% elastane"],
      fit: { description: "Fitted, close to the body." },
      sizes: APPAREL_SIZES,
      colors: [
        { value: "White", swatch: "#f4f2ee", tone: "bone" },
        { value: "Black", swatch: "#0a0a0a", tone: "void" },
      ],
      tags: ["inners", "men", "essentials"],
      createdAt: "2026-03-01T00:00:00.000Z",
    },
    {
      id: "p-503",
      slug: "modal-camisole",
      name: "Modal Camisole",
      category: "inners",
      gender: "women",
      price: 42,
      description:
        "A soft modal-blend camisole with adjustable straps — a layering essential under sheer or lightweight tops.",
      features: ["Adjustable straps", "Shelf lining", "Four-way stretch"],
      materials: ["92% modal", "8% elastane"],
      fit: { description: "Fitted through the body." },
      sizes: APPAREL_SIZES,
      colors: [
        { value: "Bone", swatch: "#f4f2ee", tone: "bone" },
        { value: "Black", swatch: "#0a0a0a", tone: "void" },
      ],
      tags: ["inners", "women", "essentials"],
      createdAt: "2026-03-01T00:00:00.000Z",
    },
    {
      id: "p-504",
      slug: "thermal-base-layer-set",
      name: "Thermal Base Layer Set",
      category: "inners",
      gender: "unisex",
      price: 95,
      description:
        "A brushed-back thermal top and bottom set, built to sit close under winter layers without bulk.",
      features: ["Brushed-back interior", "Flatlock seams", "Top and bottom set"],
      materials: ["55% modal", "40% polyester", "5% elastane"],
      fit: { description: "Fitted base-layer cut." },
      sizes: APPAREL_SIZES,
      colors: [{ value: "Charcoal", swatch: "#3a3936", tone: "graphite" }],
      tags: ["inners", "winter"],
      createdAt: "2026-01-10T00:00:00.000Z",
    },

    // ---- Accessories ----
    {
      id: "p-601",
      slug: "full-grain-leather-belt",
      name: "Full-Grain Leather Belt",
      category: "accessories",
      gender: "unisex",
      price: 95,
      description:
        "A full-grain leather belt with a brushed metal buckle, cut from a single piece of vegetable-tanned hide.",
      features: ["Vegetable-tanned leather", "Brushed metal buckle", "1.25in / 3.2cm width"],
      materials: ["100% full-grain leather"],
      fit: { description: "True to waist size; five adjustment holes." },
      sizes: [
        { value: "32", inventory: 8 },
        { value: "34", inventory: 10 },
        { value: "36", inventory: 7 },
        { value: "38", inventory: 4 },
      ],
      colors: [
        { value: "Black", swatch: "#0a0a0a", tone: "void" },
        { value: "Cognac", swatch: "#8a4a2a", tone: "gold" },
      ],
      tags: ["accessories", "leather"],
      createdAt: "2026-02-05T00:00:00.000Z",
    },
    {
      id: "p-602",
      slug: "merino-wool-scarf",
      name: "Merino Wool Scarf",
      category: "accessories",
      gender: "unisex",
      price: 85,
      description:
        "A generously sized merino wool scarf with a fringed edge, woven in a subtle herringbone.",
      features: ["Herringbone weave", "Fringed edges", "78in x 12in / 198cm x 30cm"],
      materials: ["100% merino wool"],
      fit: { description: "One size." },
      sizes: [{ value: "One Size", inventory: 15 }],
      colors: [
        { value: "Charcoal", swatch: "#3a3936", tone: "graphite" },
        { value: "Camel", swatch: "#c9a877", tone: "gold" },
      ],
      tags: ["accessories", "winter"],
      createdAt: "2026-01-20T00:00:00.000Z",
    },
    {
      id: "p-603",
      slug: "structured-canvas-tote",
      name: "Structured Canvas Tote",
      category: "accessories",
      gender: "unisex",
      price: 140,
      description:
        "A structured waxed-canvas tote with leather handles and a magnetic top closure.",
      features: ["Magnetic top closure", "Interior zip pocket", "Leather handles"],
      materials: ["Body: waxed cotton canvas", "Trim: full-grain leather"],
      fit: { description: "One size — 15in x 12in x 5in / 38cm x 30cm x 13cm." },
      sizes: [{ value: "One Size", inventory: 9 }],
      colors: [{ value: "Olive", swatch: "#5c5c40", tone: "graphite" }],
      tags: ["accessories", "bags"],
      createdAt: "2026-04-08T00:00:00.000Z",
    },
    {
      id: "p-604",
      slug: "aviator-sunglasses",
      name: "Aviator Sunglasses",
      category: "accessories",
      gender: "unisex",
      price: 165,
      description:
        "Classic aviator sunglasses with polarized lenses and a thin, brushed metal frame.",
      features: ["Polarized lenses", "100% UV protection", "Adjustable nose pads"],
      materials: ["Frame: stainless steel", "Lenses: polarized polycarbonate"],
      fit: { description: "One size." },
      sizes: [{ value: "One Size", inventory: 12 }],
      colors: [{ value: "Gunmetal", swatch: "#3a3936", tone: "graphite" }],
      tags: ["accessories", "eyewear"],
      createdAt: "2026-05-15T00:00:00.000Z",
    },

    // ---- Additionals ----
    {
      id: "p-701",
      slug: "limited-edition-enamel-pin-set",
      name: "Limited Edition Enamel Pin Set",
      category: "additionals",
      gender: "unisex",
      price: 32,
      description:
        "A small-batch set of three hard-enamel pins referencing archive campaign artwork.",
      features: ["Hard enamel finish", "Set of three", "Limited run"],
      materials: ["Zinc alloy, enamel fill"],
      fit: { description: "One size." },
      sizes: [{ value: "One Size", inventory: 25 }],
      colors: [{ value: "Gold Multi", swatch: "#b8935a", tone: "gold" }],
      tags: ["additionals", "limited"],
      isNew: true,
      createdAt: "2026-08-25T00:00:00.000Z",
    },
    {
      id: "p-702",
      slug: "waxed-canvas-passport-holder",
      name: "Waxed Canvas Passport Holder",
      category: "additionals",
      gender: "unisex",
      price: 48,
      description:
        "A slim passport holder in waxed canvas with a leather trim and card slots.",
      features: ["Two card slots", "Leather trim", "Slim profile"],
      materials: ["Body: waxed cotton canvas", "Trim: leather"],
      fit: { description: "One size." },
      sizes: [{ value: "One Size", inventory: 18 }],
      colors: [{ value: "Navy", swatch: "#232b3a", tone: "graphite" }],
      tags: ["additionals", "travel"],
      createdAt: "2026-03-30T00:00:00.000Z",
    },
    {
      id: "p-703",
      slug: "cedar-shoe-trees",
      name: "Cedar Shoe Trees",
      category: "additionals",
      gender: "unisex",
      price: 40,
      description:
        "Unfinished cedar shoe trees that absorb moisture and hold shape between wears.",
      features: ["Unfinished cedar", "Spring-loaded fit", "Sold as a pair"],
      materials: ["100% cedar wood"],
      fit: { description: "Sized to fit standard shoe sizing — select your shoe size." },
      sizes: [
        { value: "S (6-8)", inventory: 10 },
        { value: "M (9-11)", inventory: 14 },
        { value: "L (12-14)", inventory: 6 },
      ],
      colors: [{ value: "Natural Cedar", swatch: "#c9a877", tone: "gold" }],
      tags: ["additionals", "care"],
      createdAt: "2026-02-12T00:00:00.000Z",
    },
    {
      id: "p-704",
      slug: "signature-wool-beanie",
      name: "Signature Wool Beanie",
      category: "additionals",
      gender: "unisex",
      price: 45,
      description:
        "A ribbed wool beanie with a woven label — a small, seasonless addition to the core line.",
      features: ["Ribbed knit", "Woven brand label", "Fold cuff"],
      materials: ["100% wool"],
      fit: { description: "One size, stretch fit." },
      sizes: [{ value: "One Size", inventory: 22 }],
      colors: [
        { value: "Black", swatch: "#0a0a0a", tone: "void" },
        { value: "Stone", swatch: "#8c8880", tone: "bone" },
      ],
      tags: ["additionals", "winter"],
      createdAt: "2026-01-05T00:00:00.000Z",
    },
  ];
}

function buildShopCatalogue(): Product[] {
  return specs().map(makeProduct);
}

/**
 * Placeholder product catalogue.
 * Replace with a real data source (CMS/API) later — every consumer
 * should import from this module (or a future `getProducts()` fetcher
 * with the same return shape) rather than the array directly, so the
 * swap is a one-file change.
 */
export const products: Product[] = [
  {
    id: "p-001",
    slug: "wool-overcoat-onyx",
    name: "Wool Overcoat",
    brand: "BLACK BRO",
    description:
      "A structured double-breasted overcoat cut from heavyweight Italian wool.",
    category: "outerwear",
    price: { amount: 890, currency: "INR" },
    images: [
      {
        id: "img-001-a",
        url: "/images/products/wool-overcoat-onyx-1.jpg",
        alt: "Wool overcoat in onyx, front view",
        isPrimary: true,
      },
      {
        id: "img-001-b",
        url: "/images/products/wool-overcoat-onyx-2.jpg",
        alt: "Wool overcoat in onyx, detail view",
      },
    ],
    variants: [
      { id: "v-001-s", optionName: "Size", value: "S", inventory: 4 },
      { id: "v-001-m", optionName: "Size", value: "M", inventory: 6 },
      { id: "v-001-l", optionName: "Size", value: "L", inventory: 2 },
    ],
    tags: ["outerwear", "wool", "winter"],
    isNew: true,
    createdAt: "2026-08-01T00:00:00.000Z",
  },
  {
    id: "p-002",
    slug: "merino-crewneck-bone",
    name: "Merino Crewneck",
    brand: "BLACK BRO",
    description:
      "Fine-gauge merino knit with a clean crew neckline, designed for year-round layering.",
    category: "knitwear",
   price: { amount: 1199, currency: "INR" },
    images: [
      {
        id: "img-002-a",
        url: "/images/products/merino-crewneck-bone-1.jpg",
        alt: "Merino crewneck in bone, front view",
        isPrimary: true,
      },
      {
        id: "img-002-b",
        url: "/images/products/merino-crewneck-bone-2.jpg",
        alt: "Merino crewneck in bone, side view",
        isPrimary: true,
      },
      {

      id: "img-002-c",
        url: "/images/products/merino-crewneck-bone-3.jpg",
        alt: "Merino crewneck in bone, front view",
        isPrimary: true,

      },
    ],
    variants: [
      { id: "v-002-s", optionName: "Size", value: "S", inventory: 10 },
      { id: "v-002-m", optionName: "Size", value: "M", inventory: 12 },
      { id: "v-002-l", optionName: "Size", value: "L", inventory: 8 },
    ],
    tags: ["knitwear", "merino"],
    createdAt: "2026-06-15T00:00:00.000Z",
  },
  {
    id: "p-003",
    slug: "leather-tote-graphite",
    name: "Leather Tote",
    brand: "BLACK BRO",
    description:
      "Full-grain leather tote with an internal structured frame and brushed hardware.",
    category: "bags",
    price: { amount: 1240, currency: "INR", compareAtAmount: 1480 },
    images: [
      {
        id: "img-003-a",
        url: "/images/products/leather-tote-graphite-1.jpg",
        alt: "Leather tote in graphite",
        isPrimary: true,
      },
      { 

        id: "img-003-b",
        url: "/images/products/leather-tote-graphite-2.jpg",
        alt: "Leather tote in graphite",
        isPrimary: true,
      },
      {

        id: "img-003-c",
        url: "/images/products/leather-tote-graphite-3.jpg",
        alt: "Leather tote in graphite",
        isPrimary: true,
      },
      {

        id: "img-003-d",
        url: "/images/products/leather-tote-graphite-4.jpg",
        alt: "Leather tote in graphite",
        isPrimary: true,

      },
    ],
    variants: [{ id: "v-003-os", optionName: "Size", value: "One Size", inventory: 5 }],
    tags: ["bags", "leather", "sale"],
    createdAt: "2026-03-20T00:00:00.000Z",
  },
  ...buildShopCatalogue(),
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter((product) => product.category === category);
}

/** Related products: same category first (excluding the product itself),
 *  topped up from the rest of the catalogue if the category is thin. */
export function getRelatedProducts(product: Product, limit: number = 4): Product[] {
  const sameCategory = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const fillers = products.filter(
    (p) => p.category !== product.category && p.id !== product.id
  );
  return [...sameCategory, ...fillers].slice(0, limit);
}

