/**
 * Every piece of copy and every asset for the landing page, kept as typed data
 * rather than parsed out of prose. Editing copy here cannot silently change how
 * the page renders, and the type checker catches a malformed entry before it
 * ships.
 *
 * The seven reasons are the supplied copy. The offer block, the social proof
 * statistics and the reviews are still marked TODO: they make specific factual
 * claims about this product and its customers, so they need real numbers and
 * real testimonials rather than invented ones.
 *
 * Artwork: each reason records the image it was briefed with, as a comment.
 * Drop files in `client/public/images/` and fill the `image` field. An entry
 * with no image renders text-only by design, so the page ships either way.
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
  /** Renders a call to action at the end of this section. */
  ctaAfter?: boolean;
};

export const brand = "TODO Brand";

export const hero = {
  headline: "7 Reasons Joint Pain After 65 Is The Tear, Not The Wear",
  subheadline: "(And Why Nothing In The Medicine Cabinet Has Stopped It)",
  body:
    "Doctors call it wear and tear. The real damage comes from COX-2, an enzyme that gets stuck on and snips tiny tears in the cartilage, day and night. Here's why nothing in the medicine cabinet has stopped it, and what finally does.",
  cta: "TODO: offer",
  socialProof: "TODO reviews | TODO customers",
  image: undefined as ListicleImage | undefined,
};

export const reasons: Reason[] = [
  {
    id: "tear-not-wear",
    eyebrow: "The Real Damage",
    number: "01",
    headline: "It's The Tear, Not The Wear",
    // Briefed image: magnified cartilage with tiny red scissors mid-snip.
    body: [
      "COX-2 is meant to switch off after a flare. When it doesn't, it snips micro-tears in the cartilage.",
      "Every tear triggers more COX-2, and that's the pain and swelling behind osteo and RA.",
    ],
  },
  {
    id: "three-in-the-morning",
    eyebrow: "The 3am Tell",
    number: "02",
    headline: "Why It Hurts Most After A Night Of Doing Nothing",
    // Briefed image: woman 70+ on the edge of the bed at 3am, holding her hip.
    body: [
      "Proof it isn't wear: wear hurts after use.",
      "This hurts after eight hours lying still, hips waking her at 3am.",
    ],
  },
  {
    id: "ibuprofen-catches-up",
    eyebrow: "Always Catching Up",
    number: "03",
    headline: "Ibuprofen Blunts The Scissors After They're Already Cutting",
    // Briefed image: a hand grabbing scissors mid-cut, a stomach glowing red in
    // the corner.
    body: [
      "NSAIDs bind to COX-2 after it's released, so they're always catching up.",
      "They wear off in hours, the next batch comes out, and they switch off the stomach's protection along the way.",
    ],
  },
  {
    id: "never-reach-the-scissors",
    eyebrow: "Working From The Outside",
    number: "04",
    headline: "Turmeric, Braces And Heat Pads Never Reach The Scissors",
    // Briefed image: a knee wrapped in a brace and heat pad, with a cutaway
    // X-ray view showing scissors still snipping inside.
    body: [
      "Turmeric mostly passes straight through.",
      "Braces and heat work from the outside while the cutting happens inside.",
    ],
  },
  {
    id: "stitching-mid-cut",
    eyebrow: "Repair Without Rescue",
    number: "05",
    headline: "Glucosamine Stitches The Cartilage While The Scissors Are Still Cutting",
    // Briefed image: a needle and thread stitching a tear while scissors cut a
    // new one right beside it.
    body: [
      "The #1 joint supplement tries to repair without stopping the thing doing the damage.",
    ],
  },
  {
    id: "aged-ginger",
    eyebrow: "Aged Nine Months",
    number: "06",
    headline: "Aged 9 Months, Ginger Keeps The Scissors In The Drawer",
    // Briefed image: fresh vs aged ginger, then a woman walking downstairs
    // front-ways.
    body: [
      "Gingerol turns into shogaol, which helps stop COX-2 being made in the first place.",
      "No new tears, so the joint finally gets the quiet it needs to heal.",
    ],
    ctaAfter: true,
  },
  {
    id: "nothing-to-lose",
    eyebrow: "The Guarantee",
    number: "07",
    headline: "If It's Not COX-2, You Lose Nothing",
    body: [
      // TODO: written from the brief's "60-day guarantee". Replace with the
      // real wording once the guarantee terms are confirmed.
      "Try it for sixty days. If the stairs, the sleep and the mornings are no different, you get every penny back.",
    ],
    ctaAfter: true,
  },
];

/**
 * Social proof, shown after the seven numbered reasons rather than as one of
 * them. It carries no number for that reason.
 *
 * TODO: these are specific claims about what customers report. They need real
 * figures from real data before this page takes traffic. The brief asks for
 * reviews built around sleep, stairs and grandkids.
 */
export const lovedByThousands: Reason = {
  id: "loved-by-thousands",
  eyebrow: "TODO Eyebrow",
  headline: "TODO: the social proof headline",
  body: ["TODO: the line that introduces the statistics."],
  stats: [
    { value: "00%", label: "TODO: what they report about sleep" },
    { value: "00%", label: "TODO: what they report about stairs" },
    { value: "00%", label: "TODO: what they report about the mornings" },
    { value: "00%", label: "TODO: what they report" },
  ],
  closing: "TODO: the line that closes the social proof block.",
};

export const trustBadges = ["TODO Badge", "TODO Badge", "TODO Badge", "60-Day Guarantee"];

export const offer = {
  heading: "TODO: the offer heading",
  body: [
    "TODO: what it is, the dose, and how it is taken.",
    "TODO: who it is for.",
  ],
  image: undefined as ListicleImage | undefined,
  cta: "TODO: offer",
  guarantee: "Try it today with a 60-Day Money Back Guarantee",
};

export type Review = {
  title: string;
  body: string;
  name: string;
  badge: string;
  image?: ListicleImage;
};

export const reviewsHeading = "TODO: the reviews heading";

/**
 * TODO: real testimonials. The brief asks for reviews built around sleep,
 * stairs and grandkids. These are attributed quotes carrying a verification
 * badge, so they need to be genuine customers rather than written here.
 */
export const reviews: Review[] = [
  { title: "TODO: review title", body: "TODO: review body about sleep.", name: "TODO Name", badge: "Verified Purchase" },
  { title: "TODO: review title", body: "TODO: review body about stairs.", name: "TODO Name", badge: "Verified Buyer" },
  { title: "TODO: review title", body: "TODO: review body about grandkids.", name: "TODO Name", badge: "Verified Buyer" },
];

export const reviewSummary = {
  label: "Customer Reviews",
  score: "0.0",
  count: "TODO reviews",
  cta: "TODO: offer",
};

/**
 * TODO: confirm the contraindications with whoever owns the label. Ginger at
 * supplement doses is commonly flagged for interaction with anticoagulants and
 * antiplatelet medicines, and around surgery. That matters more than usual for
 * an audience of 65 and over, where those prescriptions are common.
 */
export const disclaimer =
  "TODO: allergen and contraindication notice, including any interaction with blood-thinning medication. These statements have not been evaluated by the FDA.";
