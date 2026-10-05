import { Button } from "@/components/ui/button";
import {
  announcement,
  brand,
  byline,
  comparison,
  disclaimer,
  footer,
  hero,
  offer,
  PRODUCT_URL,
  reasonLabel,
  reasons,
  reviews,
  reviewsExpandLabel,
  socialProof,
  type ComparisonCell,
  type ListicleImage,
  type Reason,
} from "@/content/listicleContent";
import { Check, Minus, ShieldCheck, Star, X } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import "./Home.css";

/*
 * Inline formatting.
 *
 * Body copy carries `**bold**` and `*italic*` and nothing else. This is
 * deliberately a few lines rather than a markdown dependency: the copy is
 * written by hand into a typed file, the two markers are all it uses, and a
 * full parser would quietly reinterpret apostrophes, brackets and underscores
 * that appear in the prose for their own reasons.
 */
const INLINE_MARKERS = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;

function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let cursor = 0;

  // Array.from rather than iterating the match iterator directly: this
  // project's tsconfig targets ES5 downlevel, where for...of over an iterator
  // needs a flag the rest of the codebase does not set.
  for (const match of Array.from(text.matchAll(INLINE_MARKERS))) {
    const at = match.index ?? 0;
    if (at > cursor) parts.push(text.slice(cursor, at));
    parts.push(
      match[1] !== undefined ? (
        <strong key={at}>{match[1]}</strong>
      ) : (
        <em key={at}>{match[2]}</em>
      )
    );
    cursor = at + match[0].length;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));

  return <>{parts}</>;
}

/* ------------------------------------------------------------------ pieces */

function Stars({ label }: { label?: string }) {
  return (
    <span
      className="lp-stars"
      role="img"
      aria-label={label ?? "Rated 5 out of 5 stars"}
    >
      {[0, 1, 2, 3, 4].map(index => (
        <Star key={index} aria-hidden="true" />
      ))}
    </span>
  );
}

function Cta({ label, className = "" }: { label: string; className?: string }) {
  return (
    <Button asChild className={`lp-cta ${className}`.trim()}>
      <a href={PRODUCT_URL} target="_blank" rel="noreferrer">
        {label}
      </a>
    </Button>
  );
}

function Figure({
  image,
  className,
}: {
  image: ListicleImage;
  className?: string;
}) {
  return (
    <figure className={`lp-figure ${className ?? ""}`.trim()}>
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={image.priority ? "eager" : "lazy"}
        fetchPriority={image.priority ? "high" : undefined}
        decoding="async"
      />
      {image.caption ? <figcaption>{image.caption}</figcaption> : null}
    </figure>
  );
}

/*
 * The countdown.
 *
 * `announcement.countdownTo` is a fixed deadline, so every visitor sees the
 * same clock and it reaches zero for everybody at the same moment. Left unset
 * nothing renders and no interval is started. A timer that restarts on each
 * page load would be telling each visitor something untrue.
 */
function useCountdown(deadline: string | undefined) {
  const target = useMemo(
    () => (deadline ? new Date(deadline).getTime() : Number.NaN),
    [deadline]
  );
  const [remaining, setRemaining] = useState(() => target - Date.now());

  useEffect(() => {
    if (Number.isNaN(target)) return;
    const tick = () => setRemaining(target - Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  if (Number.isNaN(target) || remaining <= 0) return null;

  const seconds = Math.floor(remaining / 1000);
  const pad = (value: number) => String(value).padStart(2, "0");
  const days = Math.floor(seconds / 86_400);
  const clock = `${pad(Math.floor((seconds % 86_400) / 3600))}:${pad(
    Math.floor((seconds % 3600) / 60)
  )}:${pad(seconds % 60)}`;

  return days > 0 ? `${days}d ${clock}` : clock;
}

function AnnouncementBar() {
  const countdown = useCountdown(announcement.countdownTo);

  return (
    <div className="lp-announce">
      <strong>{announcement.text}</strong>
      <span className="lp-announce-offer">{announcement.offer}</span>
      {countdown ? (
        <span className="lp-announce-clock">
          {announcement.countdownLabel} <time>{countdown}</time>
        </span>
      ) : null}
    </div>
  );
}

function Byline() {
  return (
    <div className="lp-byline">
      {byline.image ? (
        <img
          className="lp-byline-photo"
          src={byline.image.src}
          alt={byline.image.alt}
          width={byline.image.width}
          height={byline.image.height}
          loading="eager"
          decoding="async"
        />
      ) : null}
      <p>
        <span className="lp-byline-author">{byline.author}</span>
        <span className="lp-byline-updated">
          {byline.updatedLabel}: {byline.updated}
        </span>
      </p>
    </div>
  );
}

/*
 * The comparison table.
 *
 * Six columns do not fit a phone, so the table scrolls sideways inside its own
 * region while the row labels stay pinned to the left edge. The marks are
 * icons, which carry no meaning to a screen reader, so each cell also holds its
 * state as text.
 */
const MARKS = {
  yes: { Icon: Check, label: "Yes" },
  no: { Icon: X, label: "No" },
  warn: { Icon: Minus, label: "Partly" },
} as const;

function Mark({ cell }: { cell: ComparisonCell }) {
  const { Icon, label } = MARKS[cell.state];

  return (
    <span className={`lp-mark is-${cell.state}`}>
      <Icon aria-hidden="true" />
      <span className="lp-sr">{label}</span>
      {cell.note ? <span className="lp-mark-note">{cell.note}</span> : null}
    </span>
  );
}

function ComparisonTable() {
  return (
    <section className="lp-compare" aria-labelledby="compare-heading">
      <h2 id="compare-heading">{comparison.caption}</h2>

      {/*
        tabIndex makes the scroll area reachable from the keyboard: a sideways
        scroller that only a mouse can move hides half the table from anyone
        who does not use one.
      */}
      <div
        className="lp-compare-scroll"
        role="group"
        tabIndex={0}
        aria-labelledby="compare-heading"
      >
        <table className="lp-compare-table">
          <thead>
            <tr>
              <td />
              {comparison.columns.map(column => (
                <th
                  key={column.name}
                  scope="col"
                  className={column.highlight ? "is-highlight" : undefined}
                >
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map(row => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {row.cells.map((cell, index) => (
                  <td
                    key={comparison.columns[index]?.name ?? index}
                    className={
                      comparison.columns[index]?.highlight
                        ? "is-highlight"
                        : undefined
                    }
                  >
                    <Mark cell={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function OfferBlock({
  id,
  withGifts = false,
}: {
  id: string;
  withGifts?: boolean;
}) {
  const countdown = useCountdown(announcement.countdownTo);

  return (
    <section className="lp-offer" id={id} aria-labelledby={`${id}-heading`}>
      {withGifts ? <p className="lp-offer-gifts">{offer.gifts}</p> : null}

      <h2 id={`${id}-heading`}>{offer.headline}</h2>

      {offer.image ? <Figure image={offer.image} /> : null}

      <p className="lp-offer-scarcity">{offer.scarcity}</p>

      {countdown ? (
        <p className="lp-offer-clock">
          <span>{offer.countdownLabel}</span> <time>{countdown}</time>
        </p>
      ) : null}

      <Cta label={offer.cta} className="lp-cta-lg" />

      <ul className="lp-badges">
        {offer.meta.map(item => (
          <li key={item}>
            <ShieldCheck aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>

      <p className="lp-guarantee">{offer.guarantee}</p>
    </section>
  );
}

function ReasonBlock({ reason }: { reason: Reason }) {
  return (
    <section
      className="lp-reason"
      id={reason.id}
      aria-labelledby={`${reason.id}-heading`}
    >
      <p className="lp-reason-eyebrow">
        <span>{reasonLabel}</span>
        <span className="lp-reason-number">{reason.number}</span>
      </p>

      <h2 id={`${reason.id}-heading`}>{reason.headline}</h2>

      {reason.image ? <Figure image={reason.image} /> : null}

      {reason.body.map(paragraph => (
        <p key={paragraph.slice(0, 48)}>
          <Inline text={paragraph} />
        </p>
      ))}

      {reason.timeline ? (
        <ol className="lp-timeline">
          {reason.timeline.map(entry => (
            <li key={entry.when}>
              <strong>{entry.when}</strong>
              <span>{entry.what}</span>
            </li>
          ))}
        </ol>
      ) : null}

      {reason.trailingImage ? (
        <Figure image={reason.trailingImage} className="lp-figure-trailing" />
      ) : null}
    </section>
  );
}

function Reviews() {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? reviews : reviews.filter(review => !review.extra);
  const hidden = reviews.length - shown.length;

  return (
    <section className="lp-reviews" aria-labelledby="proof-heading">
      <h2 id="proof-heading">{socialProof.heading}</h2>

      {socialProof.image ? <Figure image={socialProof.image} /> : null}

      <div className="lp-review-list">
        {shown.map(review => (
          <article key={review.name} className="lp-review">
            {review.image ? (
              <img
                className="lp-review-photo"
                src={review.image.src}
                alt={review.image.alt}
                width={review.image.width}
                height={review.image.height}
                loading="lazy"
                decoding="async"
              />
            ) : null}
            <div className="lp-review-text">
              <Stars />
              <p>{review.body}</p>
              <footer>
                <strong>
                  {review.name}, {review.age}
                </strong>
                <span className="lp-verified">
                  <Check aria-hidden="true" />
                  {review.badge}
                </span>
              </footer>
            </div>
          </article>
        ))}
      </div>

      {hidden > 0 ? (
        <button
          type="button"
          className="lp-review-expand"
          onClick={() => setExpanded(true)}
          aria-expanded={false}
        >
          {reviewsExpandLabel}
        </button>
      ) : null}
    </section>
  );
}

/* -------------------------------------------------------------------- page */

export default function Home() {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const update = () => setShowSticky(window.scrollY > 600);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="lp-shell">
      <AnnouncementBar />

      <header className="lp-masthead">
        <span className="lp-brand">{brand}</span>
      </header>

      <main>
        <section className="lp-hero">
          <h1>{hero.headline}</h1>
          <Byline />
          {hero.image ? <Figure image={hero.image} /> : null}
          <p className="lp-summary">
            <strong>{hero.summaryLabel}</strong> {hero.summary}
          </p>
        </section>

        <ComparisonTable />

        {reasons.map(reason => (
          <div key={reason.id}>
            <ReasonBlock reason={reason} />
            {reason.offerAfter ? <OfferBlock id="offer-mid" withGifts /> : null}
          </div>
        ))}

        <Reviews />

        <OfferBlock id="offer-close" />

        <p className="lp-disclaimer">{disclaimer}</p>

        <footer className="lp-footer">
          <p>{footer.copyright}</p>
          <ul>
            {footer.links.map(link => (
              <li key={link.label}>
                {link.href ? (
                  <a href={link.href}>{link.label}</a>
                ) : (
                  <span>{link.label}</span>
                )}
              </li>
            ))}
          </ul>
        </footer>
      </main>

      <div className={`lp-sticky ${showSticky ? "is-visible" : ""}`}>
        <Cta label={offer.cta} />
      </div>
    </div>
  );
}
