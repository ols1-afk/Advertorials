/**
 * Every word and asset for the COVID-style advertorial (the page modelled on
 * the Fascial long-read). Kept as typed data, like `listicleContent.ts`, so a
 * copy edit cannot change how the page renders.
 *
 * Inline markers understood by the renderer, and nothing else:
 *   **bold**   *italic*   ==highlight==
 *
 * The article is an ordered list of blocks. Reordering the page means
 * reordering this array.
 */

export const PRODUCT_URL =
  "https://alvenica.co/products/alvenica-aged-ginger-root-softgels-60-capsules";

export const PRODUCT_NAME = "Alvenica Aged Ginger Softgels";

export type AdvImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  /** Above-the-fold artwork: loaded eagerly at high priority. */
  priority?: boolean;
};

/** Product photography lives on Alvenica's own Shopify CDN. */
const cdn = (file: string, width = 900) =>
  `https://cdn.shopify.com/s/files/1/0604/7550/6737/files/${file}&width=${width}`;

/* ─────────────────────────────── chrome ─────────────────────────────── */

export const masthead = {
  /** The thin strip above the bar. Says what the page is, plainly. */
  strip: "Advertorial · Joint Health Research",
  name: "Alvenica Health Notes",
  logo: "/images/covid-adv/mark.svg",
};

export const ctaStrip =
  "90-Day Money-Back Guarantee · Free Shipping On Multi-Packs";
export const ctaLabel = "Check Availability";

export const stickyBar = {
  title: PRODUCT_NAME,
  sub: "90-day guarantee · Free shipping on multi-packs",
  /** Pixels scrolled before the bar slides in. */
  showAfter: 700,
};

/* ──────────────────────────────── hero ──────────────────────────────── */

export const hero = {
  eyebrow: "Joint Health · New Research",
  headline: {
    before: "Emerging Research Is Pointing to a Hidden Reason So Many People's",
    underlined: "Joint Pain Got Worse After COVID",
    accent: "and What Can Finally Be Done About It",
  },
  deck: "Millions of adults over 60 were told the aching in their knees, hips and hands was ==just age==. The research points to something the virus switched on, and in a lot of bodies, never switched off.",
  image: {
    src: cdn("ChatGPT_Image_Sep_29_2026_01_58_51_AM.png?v=1790791681", 1000),
    alt: "Two knee joints side by side. On the left, wear and tear. On the right, a joint torn and inflamed by COX-2.",
    width: 1254,
    height: 1254,
    priority: true,
  } satisfies AdvImage,
  /** Plain-text list of the journals cited further down. No logos. */
  sourcesStrip: {
    label: "Research cited in this report",
    items: ["Journal of Virology", "Nature Immunology", "PAIN"],
  },
};

export const byline = {
  author: "Alvenica Health Notes",
  role: "Joint health research",
  readTime: "8 min read",
  avatar: "/images/covid-adv/mark.svg",
  trust: "**Every study** is listed with a link at the bottom of the page",
};

/* ─────────────────────────────── article ─────────────────────────────── */

export type Evidence = {
  number: string;
  title: string;
  body: string;
  cite: string;
};

export type Symptom = {
  number: string;
  title: string;
  chips: string[];
  body: string;
  pull: string;
};

export type Stat = { value: string; label: string };

export type Ingredient = { name: string; tag?: string; body: string };

export type Block =
  | { kind: "p"; text: string }
  | { kind: "lead"; text: string }
  | { kind: "h2"; light: string; bold: string }
  | { kind: "figure"; image: AdvImage }
  | { kind: "evidence"; item: Evidence }
  | { kind: "symptoms"; items: Symptom[] }
  | {
      kind: "stats";
      items: Stat[];
      highlight: { lead: string; value: string; label: string };
      footnote: string;
    }
  | { kind: "ingredients"; items: Ingredient[] }
  | { kind: "cta" }
  | {
      kind: "protocol";
      label: string;
      title: string;
      accent: string;
      body: string;
      pills: string[];
      footnote: string;
    }
  | { kind: "notice"; label: string; title: string; paragraphs: string[] }
  | { kind: "guarantee"; label: string; paragraphs: string[] }
  | {
      kind: "warning";
      eyebrow: string;
      title: string;
      intro: string;
      points: string[];
      footer: string;
    }
  | {
      kind: "reviews";
      title: { light: string; bold: string };
      summary: string;
      items: Review[];
    }
  | { kind: "supply"; label: string; title: string; paragraphs: string[] }
  | { kind: "trust"; items: string[] };

export type Review = {
  name: string;
  title: string;
  date: string;
  body: string[];
};

const figure = (image: AdvImage): Block => ({ kind: "figure", image });
const p = (text: string): Block => ({ kind: "p", text });

/**
 * Sections that wait on facts we don't have yet render nothing until they're
 * filled. See README → "COVID-style advertorial" → "Still outstanding".
 */
export const reviews: Review[] = [];
export const showNotOnAmazon = false;

export const article: Block[] = [
  p(
    "Since 2020, a lot of people have noticed the same thing and *kept quiet about it*."
  ),
  p("**Their joints changed after they had COVID.**"),
  p(
    "Knees that used to handle a walk around the block started aching halfway down the driveway. Hips that were fine on the stairs started catching. Hands that used to open a jar couldn't get a grip on the lid. And for most of them, ==the joints never went back to how they were before==."
  ),
  p(
    "So they asked their doctor, and they got the same short list of answers everybody gets. It's wear and tear. It's your age. The arthritis is progressing. Take ibuprofen when it flares. And the X-ray came back \"stable.\""
  ),
  p(
    "But a joint doesn't age five years in five months for no reason. **Something has to be driving it.** And telling someone they're getting older was never an explanation. It was the best anyone could do without the full picture."
  ),
  p("In the last few years, the picture has started to fill in."),
  p(
    "And it points to one enzyme the body uses to fight an infection, which in a lot of people ==never stood back down once the infection was gone==."
  ),
  p(
    "Once you understand it, the stiffness, the swelling and the pain that keeps spreading all come back to one cause. And there's finally something that can be done about it."
  ),

  { kind: "h2", light: "What the research", bold: "actually found" },
  p(
    "Your body makes an enzyme called **COX-2**. You only need to hear the name once."
  ),
  p("The easiest way to picture it is as *a pair of scissors*."),
  p(
    "When you get hurt or sick, the scissors come out. They snip away damaged tissue so new tissue can grow back in, and the swelling you feel is the sign they're working. Then, once the job is done, they go back in the drawer."
  ),
  p(
    "This is healthy. Every human body does it. *Every human body is supposed to.*"
  ),
  figure({
    src: "/images/covid-adv/joint-scissors.svg",
    alt: "Illustration of a knee joint with COX-2 drawn as scissors snipping at the cartilage between the thigh bone and shin bone.",
    width: 660,
    height: 520,
  }),
  p(
    "But when researchers at Yale infected human cells and mice with the COVID virus, they found it threw the drawer wide open. ==The virus pushed COX-2 up across the board.=="
  ),
  {
    kind: "evidence",
    item: {
      number: "01",
      title: "The COVID virus switches on COX-2",
      body: "SARS-CoV-2 infection **raised COX-2 in several types of human cells and in mice**, the same enzyme ibuprofen is designed to block.",
      cite: "Chen et al., Journal of Virology · 2021",
    },
  },
  p(
    "For most people, this surge is temporary. The infection clears, the scissors go back in the drawer, and nothing lasting happens."
  ),
  p("**But in some people, the inflammation stays.**"),
  p(
    "A team in Sydney followed people who'd had COVID and compared the ones who recovered with the ones who never quite did. Eight months after the infection, the second group still had inflammation markers running high in their blood. ==Their bodies were still acting as if they were under attack.=="
  ),
  {
    kind: "evidence",
    item: {
      number: "02",
      title: "Inflammation still running eight months later",
      body: "People with lingering symptoms after COVID showed **a set of inflammation markers, including IL-6, that stayed raised for at least eight months** after infection.",
      cite: "Phetsouphanh et al., Nature Immunology · 2022",
    },
  },
  p(
    "And the joints are one of the places it shows up. When researchers pooled the studies on pain after COVID, roughly one person in ten was dealing with muscle or joint pain in the year after infection."
  ),
  {
    kind: "evidence",
    item: {
      number: "03",
      title: "Joint and muscle pain after COVID",
      body: "A review of the published studies estimated that **about 1 in 10 people who had COVID had muscle or joint pain** at some point in the following year.",
      cite: "Fernández-de-las-Peñas et al., PAIN · 2022",
    },
  },
  p(
    "One study shows the virus switches the scissors on. One shows the inflammation can keep running for months. **And one shows where a lot of people feel it: their joints.**"
  ),
  p("Which leaves the question everyone asks next."),
  {
    kind: "lead",
    text: "Why do the scissors go back in the drawer for some people, and stay out for others?",
  },

  { kind: "h2", light: "Why the scissors", bold: "stay out" },
  p("The answer is age, and in women, menopause."),
  p(
    "The body makes more COX-2 the older it gets. So an older body is already running with more scissors out than a younger one, before any virus shows up."
  ),
  p(
    "And in women there's a second reason. For most of your life, **estrogen was what kept those scissors put away**. When estrogen drops after menopause, nothing is left to close the drawer."
  ),
  figure({
    src: "/images/covid-adv/drawer.svg",
    alt: "Two drawers. In a healthy response the scissors go back in the drawer. In an older body after COVID the drawer stays open and the scissors keep cutting.",
    width: 660,
    height: 460,
  }),
  p(
    "So when an infection throws the drawer open, ==an older body has a much harder time shutting it again==."
  ),
  p(
    "And then the scissors do the thing that turns a bad few months into a problem for years."
  ),
  p(
    "They start snipping at the cushion in your joints, the cartilage that keeps bone from rubbing on bone. Every snip irritates the joint, and the body reads this irritation as new damage, so it sends out more scissors. **More scissors, less cushion, more irritation, more scissors.**"
  ),
  figure({
    src: "/images/covid-adv/loop.svg",
    alt: "A loop: COX-2 scissors snip the cushion, less cushion is left, the joint gets irritated, and the body sends out more scissors.",
    width: 660,
    height: 560,
  }),
  p(
    "This is why it rarely clears up on its own. And it's why ==the swelling you feel and the damage underneath it are the same thing==."
  ),
  p(
    "It's also why your X-ray can say \"stable\" while it hurts more every month. An X-ray shows the cushion you've already lost. *It can't see the scissors still cutting.*"
  ),
  figure({
    src: "/images/covid-adv/xray.svg",
    alt: "Two X-ray style panels. The X-ray shows the gap where cushion was lost. It cannot show the COX-2 scissors still cutting.",
    width: 660,
    height: 430,
  }),

  { kind: "h2", light: "Why every symptom", bold: "finally makes sense" },
  p(
    "Once you see the scissors, the symptoms that seemed random start to fit together. **One problem, showing up in a dozen places.**"
  ),
  figure({
    src: "/images/covid-adv/symptoms.svg",
    alt: "Four symptoms: stiff all morning, pain spreading to new joints, the day-after flare, and pain pills wearing off sooner.",
    width: 660,
    height: 660,
  }),
  {
    kind: "symptoms",
    items: [
      {
        number: "01",
        title: "Stiffness That Takes All Morning to Wear Off",
        chips: [
          "Grunting to get out of the chair",
          "Holding the rail on every stair",
          "Hands too stiff to do up a button",
          "Feeling 90 for the first hour",
        ],
        body: "When you lie still all night, the joint stops moving, but **the scissors don't stop cutting**. Everything they stir up pools in the joint for eight hours. So you wake up with a night's worth of swelling sitting in your knees and fingers, and it takes an hour or two of moving before it drains enough to let you bend.",
        pull: "Eight hours lying still means eight hours of swelling with nowhere to go.",
      },
      {
        number: "02",
        title: "Pain That Keeps Moving to New Joints",
        chips: [
          "It started in one knee, now it's both",
          "Then the hips joined in",
          "Now the hands and a shoulder too",
          "Feeling like it's spreading",
        ],
        body: "COX-2 doesn't stay in one place. What the scissors stir up travels in the blood, and **every joint that already has a little wear on it becomes the next place they get to work**. This is why so many people say the pain spread after COVID, from one knee to both, then into the hips.",
        pull: "It feels like it's spreading because it is.",
      },
      {
        number: "03",
        title: "The Day-After Flare",
        chips: [
          "Gardening Saturday, stuck in the chair Monday",
          "One trip around the store, a swollen knee that night",
          "Paying for every good day with two bad ones",
          "Planning outings around how far you'll walk",
        ],
        body: "Any hard use of a joint brings the scissors out. In a healthy joint they snip, clean up and go back in the drawer. But in a joint where they never went back, **a busy day sends out a fresh batch on top of the ones already cutting**. The swelling peaks a day or so later, which is why the pain always seems to arrive after the fun is over.",
        pull: "The bill for a good day arrives a day later.",
      },
      {
        number: "04",
        title: "The Pain Pill That Wears Off Sooner Every Year",
        chips: [
          "Two Advil used to last all afternoon",
          "Now it's two hours",
          "Told to cut back for your stomach or kidneys",
          "Lying awake waiting for the next dose",
        ],
        body: "This one makes the most sense of all once you see what the pill is doing. It works on the scraps the scissors leave behind, **and every year there are more scissors and less cushion**, so the same dose covers less of the day.",
        pull: "The pill hasn't got weaker. There's more for it to do.",
      },
    ],
  },
  p(
    "For years, people with these symptoms have been told it's age. Told to lose weight. Told to keep moving, then told to rest. Told their X-ray looks fine."
  ),
  p(
    "Now, for the first time, every one of these symptoms is explained by the same thing. ==One enzyme, stuck on, cutting away at the cushion in every joint it can reach.=="
  ),

  { kind: "h2", light: "Why nothing on the shelf", bold: "has worked" },
  p(
    "Most people with joint pain that's lasted a year or more have been through the shelf already."
  ),
  p(
    "*Ibuprofen. Aleve. Tylenol. Turmeric with black pepper. Glucosamine. Collagen. Every cream on the market. A cortisone shot, then another one.*"
  ),
  p(
    "And it always goes the same way. A little relief, then the pain creeps back, and back to where it started."
  ),
  p("The reason is simple. **None of it puts the scissors away.**"),
  figure({
    src: "/images/covid-adv/broom.svg",
    alt: "Ibuprofen and Aleve sweep up the scraps while the scissors keep cutting. Shogaol from aged ginger closes the drawer so fewer scissors come out.",
    width: 660,
    height: 480,
  }),
  p(
    "Ibuprofen and Aleve work like a broom. For a few hours they sweep up the scraps the scissors leave behind, so the joint quiets down. Then the pill wears off, and the scissors are still out, still cutting. So the dose goes up."
  ),
  p(
    "And because the broom can't tell your knee from your stomach, it sweeps up the things that protect your stomach lining and keep blood flowing to your kidneys as well. ==Of 1,403 Alvenica customers surveyed this fall, 45% had already been told by a doctor to cut back.=="
  ),
  p(
    "Tylenol does even less for swelling. It dulls the pain signal but leaves the scissors alone."
  ),
  p(
    "Turmeric is the right idea, but the body barely absorbs it. Most of what you swallow never gets anywhere near a joint."
  ),
  p(
    "Glucosamine and collagen are building material. **More cushion for the scissors to cut.**"
  ),
  p(
    "And a cortisone shot shuts the whole drawer for a few weeks, which is why it feels so good, and why it wears off, and why doctors limit how many you can have."
  ),
  p(
    "It's like sweeping up after a pair of scissors that never stop cutting. The floor looks clean for an hour, and every week there's a little less cushion left."
  ),

  { kind: "h2", light: "What finally reaches", bold: "the scissors" },
  p("Which raises the obvious question."),
  {
    kind: "lead",
    text: "If the scissors are the problem, and nothing on the shelf puts them away, what does?",
  },
  p(
    "The answer has been sitting in kitchens for a few thousand years. **Ginger.**"
  ),
  p(
    "But not the fresh kind. Fresh ginger root carries a compound called *gingerol*. It's the burn you taste when you bite into it, and for a joint it's mild. It was never going to do much against an enzyme that's stuck on."
  ),
  p(
    "When the root is dried slowly, for nine months, the gingerol turns into a different compound called **shogaol**. And ==shogaol works on the scissors themselves==. It turns down how many come out in the first place, instead of sweeping up after them."
  ),
  figure({
    src: "/images/covid-adv/aging.svg",
    alt: "Ginger slices at fresh, three, six and nine months. Gingerol falls and shogaol rises as the root dries.",
    width: 660,
    height: 480,
  }),
  p(
    "In Japanese medicine, dried ginger has its own name, *kankyo*, separate from the fresh root. It's been used for aching joints there for centuries, long before anyone could explain why in a lab."
  ),
  p("Now the trials are catching up."),
  {
    kind: "evidence",
    item: {
      number: "04",
      title: "Ginger extract and ibuprofen, head to head",
      body: "In a trial of 120 people with moderate to severe osteoarthritis pain, **ginger extract and ibuprofen both beat a placebo, with no significant difference between the two**.",
      cite: "Haghighi et al., Iranian Journal of Medical Sciences · 2005",
    },
  },
  p(
    "And because shogaol travels in the blood, it reaches every joint the scissors reach. The knees, the hips, the hands, the shoulders. All while being easy on the stomach, which ginger has been doing for people for as long as there's been ginger."
  ),

  { kind: "h2", light: "So why has nobody", bold: "told you about it?" },
  p("There are two reasons."),
  p(
    'The first is time. Grinding a fresh root costs nothing. Aging it properly ties up a harvest for nine months before you can sell a single bottle. So ==almost every ginger supplement on the shelf is ground fresh root==, which means gingerol with "ginger" on the label and next to no shogaol inside.'
  ),
  p(
    "The second is that nobody can patent a root. So there's no drug company paying to put it in front of your doctor."
  ),
  p(
    "There was one catch though, even for the people who aged it properly. Shogaol is an oil. Swallow it as a dry powder and it clumps up and passes straight through you, like oil and vinegar separating in a bottle. **It has to be carried in a fat to reach your blood at all.**"
  ),
  figure({
    src: "/images/covid-adv/absorb.svg",
    alt: "Two glasses of water. Dry ginger powder clumps and floats. A softgel in coconut oil spreads out so it can be absorbed.",
    width: 660,
    height: 470,
  }),
  p(
    "So Alvenica set out to make the one thing missing from the shelf. Ginger dry-aged the full nine months, so the gingerol has time to turn into shogaol, and sealed in a softgel with coconut oil, so it actually reaches your blood."
  ),
  figure({
    src: cdn("ChatGPT_Image_Sep_30_2026_06_42_23_PM.png?v=1790791625"),
    alt: "A hand pouring golden Alvenica softgels from the Aged Ginger Root Softgels pouch.",
    width: 1254,
    height: 1254,
  }),
  { kind: "lead", text: "It's called Alvenica Aged Ginger Softgels." },

  { kind: "h2", light: "Who's already", bold: "taking it" },
  p(
    "This fall, Alvenica asked its customers who they are and what brought them here. 1,403 people answered."
  ),
  {
    kind: "stats",
    items: [
      { value: "87%", label: "are **65 or older**" },
      {
        value: "45%",
        label:
          "had been **told by a doctor to cut back** on ibuprofen or Aleve",
      },
      { value: "90%", label: "had **never heard of COX-2 overload** before" },
      {
        value: "#1",
        label: "**knees** were where it hurt most, then hips and back",
      },
    ],
    highlight: {
      lead: "But the answer that stood out most was this one:",
      value: "Turmeric",
      label:
        "was the supplement they'd most often already tried, and given up on.",
    },
    footnote:
      "Alvenica customer survey, 21 Sep to 19 Oct 2026, 1,403 responses. These figures describe who buys Alvenica, not results.",
  },

  { kind: "h2", light: "Inside every", bold: "softgel" },
  {
    kind: "ingredients",
    items: [
      {
        name: "Shogaol",
        tag: "from ginger dry-aged nine months",
        body: "This is what turns the scissors down. It only exists after the long, slow aging.",
      },
      {
        name: "Coconut oil",
        tag: "as MCT oil",
        body: "This is what carries the shogaol into your blood, so it isn't passing straight through you.",
      },
      {
        name: "A softgel",
        tag: "not a gummy or a powder",
        body: "It keeps the oil and the shogaol together until it reaches your stomach.",
      },
    ],
  },
  figure({
    src: cdn("Copy_of_Winning_Ad_Templates_-_Edit.png?v=1790791624"),
    alt: "What's inside Alvenica: aged ginger root, an MCT oil carrier, 300 mg extract and an easy-swallow softgel.",
    width: 1080,
    height: 1080,
  }),
  { kind: "cta" },
  {
    kind: "protocol",
    label: "The routine",
    title: "Two softgels a day.",
    accent: "That's it.",
    body: "With breakfast, every morning. No mixing powders. No timing it around meals. No diet rules.",
    pills: [
      "Non-GMO",
      "No artificial fillers",
      "No powder mess or aftertaste",
      "No prescription",
    ],
    footnote:
      "Third-party tested · Made in the USA. Most people notice a gentle warmth in their hands and knees within about twenty minutes of the first two. The joint change takes longer, and shows up as easier mornings and fewer bad days over the first few weeks.",
  },
  {
    kind: "notice",
    label: "Good to know",
    title: "If you take other medications",
    paragraphs: [
      "Alvenica is aged ginger and coconut oil, and most people take it alongside what they're already on.",
      "But **if you take a blood thinner, or have surgery coming up, check with your doctor first**, because ginger can add to the effect of blood thinners.",
      "And please don't stop anything your doctor prescribed on your own. Start the softgels, see how your mornings go, and bring it up at your next appointment.",
    ],
  },
  { kind: "cta" },
  {
    kind: "guarantee",
    label: "The 90-day guarantee",
    paragraphs: [
      "The scissors took years to wear down the cushion, and *it takes time to turn them down*. So Alvenica gives you 90 days.",
      "Take it for the full 90 days. If you don't feel a real difference in your joints by the end of it, **email them for a full refund**.",
    ],
  },

  { kind: "h2", light: "Why starting", bold: "sooner matters" },
  p("The loop only runs one way."),
  p(
    "Every month the scissors stay out, there's a little less cushion. Less cushion means more irritation, and more irritation brings out more scissors. That's why the walk that used to be fine becomes the walk you plan around, and why \"we'll keep an eye on it\" so often turns into ==a conversation about a knee replacement==."
  ),
  p(
    "Cartilage can't be bought back once it's gone. **So the cushion you have today is the most you'll ever have to protect.**"
  ),
  { kind: "cta" },

  {
    kind: "warning",
    eyebrow: "Important, please read",
    title: "Alvenica Is Not Sold on Amazon",
    intro:
      "Alvenica is only sold at **alvenica.co**. If you see it anywhere else, it isn't the real thing.",
    points: [
      "Ginger capsules on Amazon are almost always ground fresh root, with no aging.",
      "Without the coconut oil, what little shogaol there is passes straight through you.",
    ],
    footer: "The genuine Alvenica is sold in one place only: alvenica.co",
  },
  {
    kind: "reviews",
    title: {
      light: "From people who had",
      bold: "stopped expecting anything to work",
    },
    summary: "Verified purchases",
    items: reviews,
  },
  {
    kind: "supply",
    label: "Limited supply",
    title: "Nine months can't be rushed",
    paragraphs: [
      "The last thing worth knowing is that Alvenica isn't always in stock.",
      "Every batch has to age for nine months before it can be made, and they won't shorten it, because the aging is the whole point. So when a batch sells out, the next one can't be rushed to meet demand.",
      "If it's in stock when you click, this is a good time to start.",
    ],
  },
  {
    kind: "trust",
    items: [
      "90-Day Money-Back Guarantee",
      "Secure Checkout",
      "Free Shipping On Multi-Packs",
      "Third-Party Tested",
    ],
  },
  { kind: "cta" },
];

/* ──────────────────────────────── footer ──────────────────────────────── */

export const footer = {
  name: "Alvenica Health Notes",
  /** TODO: real URLs. Without an href a link renders as plain text. */
  links: [
    { label: "Privacy Policy", href: undefined as string | undefined },
    { label: "Terms of Use", href: undefined as string | undefined },
    { label: "Contact", href: undefined as string | undefined },
  ],
  disclaimer: [
    "Advertisement. This article is published by Alvenica.",
    "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease, including COVID-19 or long COVID.",
    "The studies cited did not test Alvenica. Talk to your doctor before starting any supplement, especially if you take a blood thinner or other prescription medication.",
  ],
  sources: [
    {
      label:
        "Chen JS et al. Nonsteroidal anti-inflammatory drugs dampen the cytokine and antibody response to SARS-CoV-2 infection. Journal of Virology, 2021.",
      href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8092681",
    },
    {
      label:
        "Phetsouphanh C et al. Immunological dysfunction persists for 8 months following initial mild-to-moderate SARS-CoV-2 infection. Nature Immunology, 2022.",
      href: "https://ahro.austin.org.au/austinjspui/handle/1/28599",
    },
    {
      label:
        "Fernández-de-las-Peñas C et al. Time course prevalence of post-COVID pain symptoms of musculoskeletal origin in patients who had survived SARS-CoV-2 infection: a systematic review and meta-analysis. PAIN, 2022.",
      href: "https://doi.org/10.1097/j.pain.0000000000002496",
    },
    {
      label:
        "Haghighi M et al. Comparing the effects of ginger extract and ibuprofen on patients with osteoarthritis. Iranian Journal of Medical Sciences, 2005.",
      href: "https://www.sid.ir/paper/280064/en",
    },
    {
      label:
        "Alvenica customer survey, 21 Sep to 19 Oct 2026, 1,403 responses.",
      href: undefined as string | undefined,
    },
  ],
  copyright: "© 2026 Alvenica. All rights reserved.",
};
