/**
 * Every piece of copy and every asset for the landing page, kept as typed data
 * rather than parsed out of prose. Editing copy here cannot silently change how
 * the page renders, and the type checker catches a malformed entry before it
 * ships.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * THIS FILE IS A TEMPLATE. Every string below is a placeholder awaiting the
 * real copy for this offer. The page renders and the suite passes against it,
 * which keeps the build honest while the copy is being written, but nothing
 * here should reach paid traffic.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * To fill it in:
 *   - Replace the strings. The tests assert structure, not wording, so they
 *     keep passing as the copy lands.
 *   - Drop artwork in `client/public/images/` and fill the `image` field on the
 *     entry it belongs to. An entry with no image renders text-only by design,
 *     so a half-illustrated page is still shippable.
 *   - `priority: true` marks above-the-fold artwork so it loads eagerly.
 */

/** Where every call to action points. */
export const PRODUCT_URL = "https://example.com/products/TODO-product";

export type ListicleImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Shown under the image when the visual is illustrative rather than photographic. */
  caption?: string;
  /**
   * Set for above-the-fold artwork. Such an image is the page's Largest
   * Contentful Paint element, so lazy-loading it delays the very thing the
   * visitor is waiting for.
   */
  priority?: boolean;
};

export type Reason = {
  id: string;
  eyebrow: string;
  /** Absent on the unnumbered social proof block that follows the seven. */
  number?: string;
  headline: string;
  image?: ListicleImage;
  body: string[];
  stats?: { value: string; label: string }[];
  closing?: string;
};

export const brand = "TODO Brand";

export const hero = {
  headline: "TODO: the headline, naming the reader and the promise",
  subheadline: "(TODO: the parenthetical that widens the promise)",
  body: "TODO: two or three sentences that qualify the reader and set up the seven reasons.",
  cta: "TODO: offer",
  socialProof: "TODO reviews | TODO customers",
  image: undefined as ListicleImage | undefined,
};

/**
 * The seven numbered reasons. Each is one beat of the argument: name the
 * mechanism, explain why it lands now, close the obvious escape routes, then
 * resolve.
 */
export const reasons: Reason[] = [
  { id: "reason-01", eyebrow: "TODO Eyebrow", number: "01", headline: "TODO: reason one", body: ["TODO: body copy."] },
  { id: "reason-02", eyebrow: "TODO Eyebrow", number: "02", headline: "TODO: reason two", body: ["TODO: body copy."] },
  { id: "reason-03", eyebrow: "TODO Eyebrow", number: "03", headline: "TODO: reason three", body: ["TODO: body copy."] },
  { id: "reason-04", eyebrow: "TODO Eyebrow", number: "04", headline: "TODO: reason four", body: ["TODO: body copy."] },
  { id: "reason-05", eyebrow: "TODO Eyebrow", number: "05", headline: "TODO: reason five", body: ["TODO: body copy."] },
  { id: "reason-06", eyebrow: "TODO Eyebrow", number: "06", headline: "TODO: reason six", body: ["TODO: body copy."] },
  { id: "reason-07", eyebrow: "TODO Eyebrow", number: "07", headline: "TODO: reason seven", body: ["TODO: body copy."] },
];

/**
 * Social proof, shown after the seven numbered reasons rather than as one of
 * them. It carries no number for that reason.
 */
export const lovedByThousands: Reason = {
  id: "loved-by-thousands",
  eyebrow: "TODO Eyebrow",
  headline: "TODO: the social proof headline",
  body: ["TODO: the line that introduces the statistics."],
  stats: [
    { value: "00%", label: "TODO: what they report" },
    { value: "00%", label: "TODO: what they report" },
    { value: "00%", label: "TODO: what they report" },
    { value: "00%", label: "TODO: what they report" },
  ],
  closing: "TODO: the line that closes the social proof block.",
};

export const trustBadges = ["TODO Badge", "TODO Badge", "TODO Badge", "TODO Badge"];

export const offer = {
  heading: "TODO: the offer heading",
  body: ["TODO: what it is and how it is taken.", "TODO: who it is for."],
  image: undefined as ListicleImage | undefined,
  cta: "TODO: offer",
  guarantee: "TODO: the guarantee line",
};

export type Review = {
  title: string;
  body: string;
  name: string;
  badge: string;
  image?: ListicleImage;
};

export const reviewsHeading = "TODO: the reviews heading";

export const reviews: Review[] = [
  { title: "TODO: review title", body: "TODO: review body.", name: "TODO Name", badge: "Verified Purchase" },
  { title: "TODO: review title", body: "TODO: review body.", name: "TODO Name", badge: "Verified Buyer" },
  { title: "TODO: review title", body: "TODO: review body.", name: "TODO Name", badge: "Verified Buyer" },
];

export const reviewSummary = {
  label: "Customer Reviews",
  score: "0.0",
  count: "TODO reviews",
  cta: "TODO: offer",
};

/**
 * Required on the page. Allergens, contraindications, and the FDA statement for
 * a dietary supplement. Fill this before the page takes traffic.
 */
export const disclaimer = "TODO: allergen and contraindication notice. These statements have not been evaluated by the FDA.";
