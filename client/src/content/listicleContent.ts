/**
 * Every piece of copy and every asset for the landing page, kept as typed data
 * rather than parsed out of prose. Editing copy here cannot silently change how
 * the page renders, and the type checker catches a malformed entry before it
 * ships.
 *
 * Body copy supports `**bold**` and `*italic*`. Nothing else: the renderer is a
 * deliberately small inline formatter rather than a markdown engine.
 *
 * Artwork: each slot records the image it was briefed with, as a comment. Drop
 * files in `client/public/images/` and fill the `image` field. A slot with no
 * image renders text-only by design, so the page ships either way.
 */

/** Where every call to action points. */
export const PRODUCT_URL = "https://example.com/products/TODO-alvenica";

export const brand = "Alvenica";

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

/* ───────────────────────────── announcement bar ───────────────────────────── */

export const announcement = {
  text: "Fall Sale Is Live",
  /** TODO: the offer, once decided. */
  offer: "TODO: OFFER TBC",
  /**
   * An ISO timestamp for the real end of the sale, e.g. "2026-10-31T23:59:00Z".
   * Left undefined, no countdown renders at all. It is deliberately a fixed
   * deadline rather than a per-visitor timer that restarts on every visit:
   * a clock that resets when the page reloads is telling each visitor something
   * untrue, and it is the kind of urgency regulators have taken an interest in.
   */
  countdownTo: undefined as string | undefined,
  /** Precedes the clock in the bar, when there is a deadline to count to. */
  countdownLabel: "Ends in:",
};

/* ──────────────────────────────── the byline ──────────────────────────────── */

export const byline = {
  author: "TODO: author name",
  updatedLabel: "Last Updated",
  /** TODO: set to the real publication date, e.g. "5 October 2026". */
  updated: "TODO: date",
  // Briefed image: small round headshot of a friendly woman in her 60s,
  // natural light.
  image: undefined as ListicleImage | undefined,
};

/* ───────────────────────────────── the hero ───────────────────────────────── */

export const hero = {
  headline:
    "7 Reasons Women Over 65 Are Swapping Their Ibuprofen For Aged Ginger",
  summaryLabel: "Summary:",
  summary:
    "Ibuprofen eases joint pain because it goes after COX-2, the enzyme behind the swelling. The catch is nobody can take it every day without paying for it in their stomach and kidneys. Aged ginger goes after the same enzyme, gently enough to take every morning, and the relief builds week after week. Here's why thousands of women have made the switch.",
  image: undefined as ListicleImage | undefined,
};

/* ─────────────────────────── the comparison table ─────────────────────────── */

export type ComparisonCell = {
  state: "yes" | "no" | "warn";
  /** Qualifies the mark, e.g. "wears off in hours". */
  note?: string;
};

export const comparison = {
  caption: "How aged ginger compares with what else is in the cupboard",
  columns: [
    { name: "Alvenica", highlight: true },
    { name: "Ibuprofen" },
    { name: "Turmeric" },
    { name: "Glucosamine" },
    { name: "Braces & Creams" },
  ],
  rows: [
    {
      // A non-breaking hyphen (U+2011): the pinned label column is narrow, and
      // an ordinary hyphen lets this wrap as "COX-" / "2".
      label: "Goes after COX\u20112",
      cells: [
        { state: "yes" },
        { state: "yes" },
        { state: "warn", note: "barely absorbed" },
        { state: "no" },
        { state: "no" },
      ] as ComparisonCell[],
    },
    {
      label: "Gentle on stomach & kidneys",
      cells: [
        { state: "yes" },
        { state: "no" },
        { state: "yes" },
        { state: "yes" },
        { state: "yes" },
      ] as ComparisonCell[],
    },
    {
      label: "Safe to take every day",
      cells: [
        { state: "yes" },
        { state: "no" },
        { state: "yes" },
        { state: "yes" },
        { state: "yes" },
      ] as ComparisonCell[],
    },
    {
      label: "Relief builds week to week",
      cells: [
        { state: "yes" },
        { state: "no", note: "wears off in hours" },
        { state: "warn" },
        { state: "warn" },
        { state: "no" },
      ] as ComparisonCell[],
    },
    {
      label: "Calms swelling inside the joint",
      cells: [
        { state: "yes" },
        { state: "yes" },
        { state: "warn" },
        { state: "no" },
        { state: "no" },
      ] as ComparisonCell[],
    },
  ],
};

/* ───────────────────────────── the seven reasons ──────────────────────────── */

/** Prefixes the number above each reason's headline. */
export const reasonLabel = "Reason";

export type TimelineEntry = { when: string; what: string };

export type Reason = {
  id: string;
  number: string;
  headline: string;
  image?: ListicleImage;
  body: string[];
  /** A second image, after the body. Reason five closes on the product shot. */
  trailingImage?: ListicleImage;
  timeline?: TimelineEntry[];
  /** Renders a full offer block at the end of this section. */
  offerAfter?: boolean;
};

export const reasons: Reason[] = [
  {
    id: "why-ibuprofen-works",
    number: "1",
    headline: "Ibuprofen Works For A Reason Most Doctors Never Explain",
    // Briefed image: clean illustrated cross-section of a knee joint on a warm
    // cream background. Smooth pale-blue cartilage, a few tiny red pairs of
    // scissors labelled "COX-2" making small snips, and a small open drawer
    // beside the joint where the scissors go back.
    body: [
      "If ibuprofen is the only thing that's ever really touched the pain, there's a reason for that. And it has nothing to do with it being “stronger.”",
      "Inside every joint, the body makes an enzyme called **COX-2**. Its job is to trim away old, worn cartilage so new tissue can grow in its place, then switch off so the swelling settles.",
      "Think of it like a pair of scissors. They come out, make a few small snips, and go back in the drawer.",
      "Ibuprofen works because it goes after COX-2 directly. Braces, creams and heat pads all work on the outside of the joint. Ibuprofen is one of the few things that actually reaches the scissors. So if it's been the thing reached for every morning, the instinct was right all along.",
    ],
  },
  {
    id: "tear-not-wear",
    number: "2",
    headline: "Joint Pain After 65 Is Mostly Tear, Not Wear",
    // Briefed image: two panels. Left "WHAT DOCTORS CALL IT: Wear & Tear",
    // a dull slightly thinned joint. Right "WHAT'S REALLY HAPPENING: COX-2
    // Overload", the same joint swollen and glowing red, cartilage ripping like
    // torn fabric with red clusters at each tear.
    body: [
      "As we get older, the body makes more COX-2 every year. The scissors come out more often, and they stop going back in the drawer.",
      "For women it hits harder. Estrogen was what used to put the scissors away, so once it drops after menopause, there's very little left to switch them off.",
      "So they stay out, snipping **micro tears** in the cartilage faster than it can repair. The torn cartilage irritates the joint, the body makes even more COX-2, and the cycle feeds itself. Researchers call it **COX-2 overload.**",
      "It's why joint pain creeps in year after year instead of arriving all at once. And it's why it's often worst first thing in the morning, or at 3am, after hours of doing nothing at all. Wear would hurt most after a busy day. Tearing hurts around the clock.",
    ],
  },
  {
    id: "cannot-take-it-daily",
    number: "3",
    headline: "But Nobody Can Take Ibuprofen Every Day For Years",
    // Briefed image: an ibuprofen bottle on a kitchen counter, slightly greyed,
    // with four red rounded callouts: "Wears off in 4-6 hours", "Strips the
    // stomach lining", "Strains the kidneys", "Nothing carries over to tomorrow".
    body: [
      "The catch is ibuprofen only blocks COX-2 for a few hours. Nothing builds up, and nothing carries over to tomorrow. So it's one with breakfast, another by the afternoon and another at night just to get some sleep.",
      "And every one of those also wears at the stomach lining and puts strain on the kidneys. It's why so many women hear the same thing from their doctor: *“You need to cut back.”* Usually with no answer for what to take instead.",
    ],
  },
  {
    id: "never-reach-the-scissors",
    number: "4",
    headline: "Braces, Creams And Glucosamine Never Reach The Scissors",
    // Briefed image: close-up of cartilage. A needle and thread stitching one
    // tear closed while a pair of red COX-2 scissors cuts a new tear beside it.
    // Caption strip: "Repairing while it's still cutting."
    body: [
      "Braces and heat pads hold the joint from the outside. Creams numb the skin over it. **Glucosamine**, the most popular joint supplement in America, tries to rebuild the cartilage.",
      "But rebuilding while COX-2 is still cutting is like stitching a hem while someone's still snipping at it. The repair never gets ahead.",
      "Turmeric gets the closest, but most of it passes straight through the body before it gets anywhere near a joint.",
      "It's why so many women end up with a cupboard full of bottles that each “help a little.”",
    ],
  },
  {
    id: "aged-ginger",
    number: "5",
    headline: "Ginger Goes After COX-2 Too. Aged, It's Up To 5x Stronger.",
    // Briefed image: side by side on warm yellow. Left, fresh pale ginger root,
    // "Fresh ginger: Gingerol". Right, dark wrinkled golden aged ginger, "Aged
    // 9 months: Shogaol, up to 5x more potent". A small arrow between reading
    // "9 months".
    body: [
      "Ginger has been used for inflammation for centuries. It's why ginger shots and ginger tea are everywhere. Its main compound, **gingerol**, calms COX-2, just gently.",
      "But when the root is slowly aged, the gingerol transforms into a golden compound called **shogaol**. Shogaol goes after COX-2 the same way ibuprofen does, and it's up to **5 times more potent** than fresh ginger. The difference is it's gentle enough on the stomach and kidneys to take every single day.",
      "Western researchers have only really started paying attention in the last few years. **Alvenica** ages its ginger for 9 months, then suspends it in MCT oil so the body takes in up to 3x more. Two softgels every morning, and that's it.",
    ],
    // Briefed trailing image: Alvenica pouch with a few golden softgels spilling
    // out, warm yellow gradient background.
    offerAfter: true,
  },
  {
    id: "relief-builds",
    number: "6",
    headline: "Unlike Ibuprofen, The Relief Builds Week After Week",
    // Briefed image: simple horizontal timeline on warm yellow with four
    // illustrated moments: Week 1 a softgel and a glass of water, Day 10 a woman
    // standing up from an armchair, Week 2 a coffee mug at sunrise, Week 3 a
    // woman walking down stairs front-ways with her hand off the rail.
    body: [
      "Ibuprofen numbs today and starts from zero tomorrow. Shogaol works quieter than that. It brings down how much COX-2 the body makes in the first place, so fewer scissors come out each day.",
      "Less cutting today, even less tomorrow, until the cartilage finally starts repairing faster than it's being torn.",
      "That's why most women feel very little in the first week, and why it doesn't announce itself like a painkiller. Here's what customers usually describe:",
    ],
    timeline: [
      { when: "Week 1", what: "Not much. Keep going." },
      {
        when: "Around day 10",
        what: "Standing up from the chair without testing the knee first.",
      },
      {
        when: "Week 2",
        what: "Shorter stiff mornings, and fewer days reaching for the ibuprofen.",
      },
      {
        when: "Week 3 and beyond",
        what: "Stairs front-ways, a better grip, and sleeping through the night.",
      },
    ],
  },
  {
    id: "sixty-days",
    number: "7",
    headline: "60 Days To Feel It, Or Your Money Back",
    // Briefed image: gold "60-Day Money-Back Guarantee" seal next to the
    // Alvenica pouch on a warm yellow background.
    body: [
      "Take two softgels every morning for 60 days. If nothing changes, send the bag back, even if it's empty, for a full refund. No surgeon or pain clinic will ever offer that.",
      "And at less than a cup of coffee a day, it costs less than most people spend on the creams and patches that never reached the joint in the first place.",
      "The only catch is the aging can't be rushed. Nine months is nine months, so when a batch sells out, the next one is 9 months behind it.",
    ],
  },
];

/* ────────────────────────────── the offer block ───────────────────────────── */

export const offer = {
  /** Shown on the first block only. */
  gifts: "Free Gifts With Your Order",
  /** TODO: the offer, once decided. */
  headline: "TODO: OFFER TBC",
  scarcity: "Each batch takes 9 months to age, so stock is limited.",
  cta: "Check Availability →",
  countdownLabel: "Offer ends in:",
  meta: ["Sell-Out Risk: High", "Free Shipping"],
  guarantee: "Try it today with a 60-Day Money-Back Guarantee!",
  // Briefed image: Alvenica pouch, 3-bag bundle. The second block carries the
  // gold 60-day guarantee badge in the corner.
  image: undefined as ListicleImage | undefined,
};

/* ──────────────────────────────── the reviews ─────────────────────────────── */

export const socialProof = {
  heading: "50,884+ Women Have Already Made The Switch",
  // Briefed image: grid of four customer photos. A woman by a kitchen cupboard
  // full of supplement bottles, a woman holding a pickleball paddle on a court,
  // a woman getting out of a car easily, a woman making coffee in the morning.
  image: undefined as ListicleImage | undefined,
};

export type Review = {
  body: string;
  name: string;
  age: number;
  badge: string;
  image?: ListicleImage;
  /** Hidden until the reader expands the reviews. */
  extra?: boolean;
};

export const reviews: Review[] = [
  {
    body: "I have a cupboard full of turmeric, tart cherry, glucosamine, GXL, you name it. Ordered these thinking yeah right. But I'm 6 weeks in, my hands aren't swollen when I wake up, and I haven't opened the Tylenol Arthritis since August. Placebo or not I'm keeping it.",
    name: "Janet W.",
    age: 70,
    badge: "Verified Buyer",
  },
  {
    body: "My stomach couldn't take the Aleve anymore, had this gnawing burn every afternoon. A friend at pickleball put me onto these. Week 2 I could grip the paddle without my knuckles screaming. Back to 3 mornings a week and no stomach burn.",
    name: "Carla J.",
    age: 66,
    badge: "Verified Buyer",
  },
  {
    body: "Had my 3rd cortisone shot booked for October. That shot hurts worse than the hip. But a lady in my church group had these so I figured one bag couldn't hurt. First week nothing but the second, I noticed I was getting out of the car without the whole “grab the door frame” routine. Called and cancelled the appointment last Tuesday. Not saying I'll never need it again but for now I'm good so its a win for me.",
    name: "Maureen T.",
    age: 68,
    badge: "Verified Buyer",
  },
  {
    body: "I'm not stopping my RA meds and I'd never tell anyone to. But the morning stiffness used to take an hour and a heating pad before I could make coffee. Now it's maybe 15 minutes. My rheumatologist asked what I changed. Had to tell him about the ginger.",
    name: "Sheila M.",
    age: 67,
    badge: "Verified Buyer",
  },
  {
    body: "i've hand quilted since i was 19 and last year i had to put it down because my fingers would lock halfway through a block. My granddaughter is due in december and i started her quilt back in 2024. week 3 on these i could hold the needle for an hour without the hot throbbing in my knuckles. I finished it sunday and cried a little.",
    name: "Linda R.",
    age: 74,
    badge: "Verified Buyer",
    extra: true,
    // Briefed image: customer photo of a hand-quilted baby quilt laid on a bed.
  },
  {
    body: "Our beagle Biscuit has been getting the short walk around the block for 2 years because that's all my knees could do. Yesterday we did the whole loop to the park. 1.8 miles on my Fitbit. He was more tired than me.",
    name: "Ruth A.",
    age: 72,
    badge: "Verified Buyer",
    extra: true,
    // Briefed image: customer photo of a woman in her 70s walking a beagle on a
    // park path in autumn.
  },
  {
    body: "Before, one day at my grandson's soccer tournament meant 3 or 4 days in bed after. Saturday I sat on the bleachers for 5 hours, walked back to the car, and Sunday I was at church. That hasn't happened in years.",
    name: "Nancy H.",
    age: 69,
    badge: "Verified Buyer",
    extra: true,
  },
];

export const reviewsExpandLabel = "Read More Reviews";

/* ───────────────────────────────── the footer ─────────────────────────────── */

export const footer = {
  copyright: `Copyright © ${brand}. All Rights Reserved.`,
  /**
   * TODO: the real destinations. A link with no `href` renders as plain text
   * rather than as an anchor, so a missing policy page cannot ship as a dead
   * link that a visitor clicks and lands nowhere.
   */
  links: [
    { label: "Privacy Policy", href: undefined as string | undefined },
    { label: "Terms of Service", href: undefined as string | undefined },
  ],
};

/**
 * TODO: confirm the contraindications with whoever owns the label. Ginger at
 * supplement doses is commonly flagged for interaction with anticoagulant and
 * antiplatelet medicines and around surgery, which matters more than usual for
 * an audience of 65 and over, where those prescriptions are common.
 */
export const disclaimer =
  "TODO: allergen and contraindication notice, including any interaction with blood-thinning medication. These statements have not been evaluated by the FDA.";
