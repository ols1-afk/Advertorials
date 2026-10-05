# Advertorials

Landing pages for direct response advertorials. Each page is copy-driven: the
words and artwork live in a typed content file, and the page renders whatever
that file holds.

The page here is the Alvenica aged-ginger advertorial, _7 Reasons Women Over 65
Are Swapping Their Ibuprofen For Aged Ginger_. The copy is written; the offer,
the artwork and the tracking identifiers are not. See **Still outstanding**
below before running traffic.

Descended from [`ols1-afk/Detox-Listicle`](https://github.com/ols1-afk/Detox-Listicle),
which runs the same stack in production. The structure, styling and deploy setup
carried over; that offer's copy, artwork and tracking identifiers deliberately
did not.

## Stack

| Layer       | Technology                                             |
| ----------- | ------------------------------------------------------ |
| Frontend    | React 19, Vite 7, TypeScript, Tailwind CSS 4, wouter   |
| UI kit      | shadcn/ui on Radix primitives, lucide-react            |
| API         | tRPC 11 over Express 4                                 |
| Database    | Drizzle ORM targeting MySQL (optional, unused by page) |
| Tests       | Vitest + Testing Library (jsdom)                       |
| Package mgr | pnpm 10, Node 22                                       |

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

```bash
pnpm test         # Vitest suite
pnpm check        # tsc --noEmit
pnpm build        # client -> dist/public, server -> dist/index.js
pnpm start        # run the production build
pnpm format       # Prettier
```

## Filling in the copy

Everything lives in **`client/src/content/listicleContent.ts`**.
`pages/Home.tsx` renders that data and holds no copy of its own, so editing copy
cannot change how the page behaves.

The page is laid out as:

```
announcement bar  →  headline + byline + summary  →  comparison table
  →  reasons 1-5  →  offer  →  reasons 6-7  →  reviews  →  offer  →  disclaimer + footer
```

The mid-page offer block is placed by the content file, not the component: the
reason that carries `offerAfter: true` is followed by a full offer. Moving the
interruption means moving that flag.

- **Copy** — replace the `TODO` strings. The tests assert structure rather than
  wording, so they keep passing as the copy lands.
- **Emphasis** — body copy understands `**bold**` and `*italic*` and nothing
  else. The renderer is a dozen lines rather than a markdown dependency, which
  keeps apostrophes, brackets and underscores in the prose meaning what they
  say. A test fails if a marker ever reaches the rendered page.
- **The countdown** — `announcement.countdownTo` takes a fixed ISO timestamp, so
  every visitor sees the same clock reach zero at the same moment. Left unset,
  no countdown renders at all. It is deliberately not a per-visitor timer that
  restarts on reload.
- **Reviews** — an entry marked `extra: true` sits behind the "Read More
  Reviews" button.
- **Artwork** — drop files in `client/public/images/` and fill the `image` field
  on the entry it belongs to (`src`, `alt`, `width`, `height`, optional
  `caption`). An entry with no image renders text-only by design, so a
  half-illustrated page still ships. Get `width` and `height` right: they are
  what the browser reserves before the file arrives, and a wrong value shifts
  the layout as it loads.
- **`priority: true`** marks above-the-fold artwork. The hero should carry it so
  it loads eagerly at high fetch priority, being the Largest Contentful Paint
  element. Everything below the fold stays lazy.
- **Layout and styling** — `pages/Home.css`. Mobile-first: the single-column
  layout is the real design and the wider breakpoints only relax it.

## Still outstanding

Everything below is a `TODO` in the source and blocks paid traffic:

- `PRODUCT_URL`, and the offer itself — `offer.headline` and
  `announcement.offer` both read `OFFER TBC`.
- The byline's author and date, and the sale's end date for the countdown.
- All artwork. Every slot records the image it was briefed with as a comment
  above it; an unfilled slot renders text-only by design.
- The footer's privacy and terms URLs. Without an `href` they render as plain
  text rather than as links that go nowhere.
- The disclaimer. Ginger at supplement doses is commonly flagged for
  interaction with anticoagulant and antiplatelet medicines and around surgery,
  which matters more than usual for an audience of 65 and over.
- RedTrack's `script_id` and `defaultcampaignid` — see below.

## Tracking

`client/index.html` carries a commented placeholder for RedTrack's
`uniclick.js`. Fill in this offer's `script_id` and `defaultcampaignid` before
running traffic. Two things that are easy to get wrong:

- **`cookiedomain` must match the domain the page is served from.** A page can
  only set cookies for its own domain or a parent of it, so serving from
  `something.up.railway.app` while naming a different cookie domain means the
  browser rejects the write and only outbound link decoration survives. Point a
  subdomain of the store's domain at the deploy instead.
- **The `cmpid` and `sub1`-`sub8` string is not part of this repo.** It goes on
  the ad's destination URL in Meta Ads Manager, where Meta substitutes the
  `{{ad.id}}` style tokens at click time. In the page they would ship as literal
  text, because nothing here expands them.

## Deploying

Railway runs a persistent Node process, which is what `server/_core/index.ts`
expects. Nixpacks detects the project and runs `pnpm install`, `pnpm build`,
then `pnpm start`.

- **No environment variables are required.** The page needs neither a database
  nor sign-in.
- **Do not set `PORT`.** Railway assigns it and routes to it; the server binds
  exactly what it is given and fails loudly rather than drifting to another port.
- Generate a public domain under Settings → Networking, or the service runs
  without being reachable.

## Notes on the inherited template

The stack originated in a Manus export. Two pieces of it were removed upstream
and have not come back:

1. **`vite-plugin-manus-runtime`** inlined roughly 360 kB of render-blocking
   editor runtime into `index.html` for no benefit outside the Manus editor.
2. **A Umami analytics tag** whose `%VITE_ANALYTICS_ENDPOINT%` placeholders were
   never substituted, so every visitor requested a literal
   `%VITE_ANALYTICS_ENDPOINT%` URL and logged a MIME-type error.

`server/_core/` is still generated platform glue (LLM, maps, image generation,
notifications, voice transcription). The landing page uses none of it and it can
be pruned.

## License

MIT
