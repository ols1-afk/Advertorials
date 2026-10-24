import {
  article,
  byline,
  ctaLabel,
  ctaStrip,
  footer,
  hero,
  masthead,
  PRODUCT_URL,
  showNotOnAmazon,
  stickyBar,
  type AdvImage,
  type Block,
} from "@/content/covidAdvertorialContent";
import {
  AlertTriangle,
  FlaskConical,
  Lock,
  ShieldCheck,
  Star,
  Truck,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import "./CovidAdvertorial.css";

/*
 * Inline formatting: `**bold**`, `*italic*` and `==highlight==`, nothing else.
 * Same reasoning as the listicle's renderer: a few lines rather than a
 * markdown engine, so apostrophes and brackets in the prose stay prose.
 */
const MARKERS = /\*\*([^*]+)\*\*|==([^=]+)==|\*([^*]+)\*/g;

export function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let cursor = 0;
  for (const match of Array.from(text.matchAll(MARKERS))) {
    const at = match.index ?? 0;
    if (at > cursor) parts.push(text.slice(cursor, at));
    if (match[1] !== undefined)
      parts.push(<strong key={at}>{match[1]}</strong>);
    else if (match[2] !== undefined)
      parts.push(
        <mark key={at} className="ca-hl">
          {match[2]}
        </mark>
      );
    else parts.push(<em key={at}>{match[3]}</em>);
    cursor = at + match[0].length;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));
  return <>{parts}</>;
}

function Figure({ image }: { image: AdvImage }) {
  return (
    <figure className="ca-figure">
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

function Cta() {
  return (
    <div className="ca-cta-block">
      <div className="ca-cta-strip">{ctaStrip}</div>
      <a className="ca-cta" href={PRODUCT_URL} target="_blank" rel="noreferrer">
        {ctaLabel} <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

function Stars() {
  return (
    <span className="ca-stars" role="img" aria-label="Rated 5 out of 5 stars">
      {[0, 1, 2, 3, 4].map(i => (
        <Star key={i} aria-hidden="true" />
      ))}
    </span>
  );
}

const TRUST_ICONS = [ShieldCheck, Lock, Truck, FlaskConical];

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "p":
      return (
        <p className="ca-p">
          <Inline text={block.text} />
        </p>
      );
    case "lead":
      return (
        <p className="ca-lead">
          <Inline text={block.text} />
        </p>
      );
    case "h2":
      return (
        <h2 className="ca-h2">
          {block.light} <b>{block.bold}</b>
        </h2>
      );
    case "figure":
      return <Figure image={block.image} />;
    case "evidence":
      return (
        <section className="ca-evidence" aria-label={block.item.title}>
          <div className="ca-evidence-tag">
            <span>Evidence</span> Peer-reviewed findings
          </div>
          <div className="ca-evidence-card">
            <div className="ca-evidence-head">
              <span className="ca-evidence-num">{block.item.number}</span>
              <span className="ca-evidence-title">{block.item.title}</span>
            </div>
            <div className="ca-evidence-body">
              <Inline text={block.item.body} />
            </div>
            <div className="ca-evidence-cite">{block.item.cite}</div>
          </div>
        </section>
      );
    case "symptoms":
      return (
        <div className="ca-symptoms">
          {block.items.map(item => (
            <article className="ca-symptom" key={item.number}>
              <header className="ca-symptom-head">
                <span className="ca-symptom-num">{item.number}</span>
                <h3>{item.title}</h3>
              </header>
              <div className="ca-symptom-body">
                <ul className="ca-chips">
                  {item.chips.map(chip => (
                    <li key={chip}>{chip}</li>
                  ))}
                </ul>
                <p>
                  <Inline text={item.body} />
                </p>
                <blockquote className="ca-pull">{item.pull}</blockquote>
              </div>
            </article>
          ))}
        </div>
      );
    case "stats":
      return (
        <div className="ca-stats">
          <div className="ca-stat-grid">
            {block.items.map(stat => (
              <div className="ca-stat" key={stat.value + stat.label}>
                <div className="ca-stat-value">{stat.value}</div>
                <div className="ca-stat-label">
                  <Inline text={stat.label} />
                </div>
              </div>
            ))}
          </div>
          <div className="ca-stat-highlight">
            <p className="ca-stat-lead">{block.highlight.lead}</p>
            <div className="ca-stat-big">{block.highlight.value}</div>
            <p className="ca-stat-big-label">{block.highlight.label}</p>
          </div>
          <p className="ca-footnote">{block.footnote}</p>
        </div>
      );
    case "ingredients":
      return (
        <div className="ca-ingredients">
          {block.items.map(item => (
            <div className="ca-ingredient" key={item.name}>
              <div className="ca-ingredient-name">
                {item.name}
                {item.tag ? <i> {item.tag}</i> : null}
              </div>
              <p>
                <Inline text={item.body} />
              </p>
            </div>
          ))}
        </div>
      );
    case "cta":
      return <Cta />;
    case "protocol":
      return (
        <section className="ca-protocol">
          <div className="ca-pill-label">{block.label}</div>
          <div className="ca-protocol-title">
            {block.title}
            <br />
            <em>{block.accent}</em>
          </div>
          <p className="ca-protocol-body">
            <Inline text={block.body} />
          </p>
          <ul className="ca-protocol-pills">
            {block.pills.map(pill => (
              <li key={pill}>{pill}</li>
            ))}
          </ul>
          <p className="ca-protocol-foot">{block.footnote}</p>
        </section>
      );
    case "notice":
      return (
        <section className="ca-notice">
          <div className="ca-pill-label">{block.label}</div>
          <h3>{block.title}</h3>
          {block.paragraphs.map(text => (
            <p key={text}>
              <Inline text={text} />
            </p>
          ))}
        </section>
      );
    case "guarantee":
      return (
        <section className="ca-guarantee">
          <div className="ca-guarantee-label">{block.label}</div>
          {block.paragraphs.map(text => (
            <p key={text}>
              <Inline text={text} />
            </p>
          ))}
        </section>
      );
    case "warning":
      if (!showNotOnAmazon) return null;
      return (
        <section className="ca-warning">
          <div className="ca-warning-head">
            <span className="ca-warning-icon">
              <AlertTriangle aria-hidden="true" />
            </span>
            <div>
              <p className="ca-warning-eyebrow">{block.eyebrow}</p>
              <h3>{block.title}</h3>
            </div>
          </div>
          <div className="ca-warning-body">
            <p>
              <Inline text={block.intro} />
            </p>
            <ul>
              {block.points.map(point => (
                <li key={point}>
                  <X aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="ca-warning-foot">{block.footer}</div>
        </section>
      );
    case "reviews":
      if (block.items.length === 0) return null;
      return (
        <section className="ca-reviews">
          <h2 className="ca-h2">
            {block.title.light} <b>{block.title.bold}</b>
          </h2>
          <div className="ca-reviews-summary">
            <Stars />
            <div>{block.summary}</div>
          </div>
          {block.items.map(review => (
            <article className="ca-review" key={review.name + review.date}>
              <div className="ca-review-name">{review.name}</div>
              <Stars />
              <div className="ca-review-title">{review.title}</div>
              <div className="ca-review-date">{review.date}</div>
              <div className="ca-review-verified">✔ Verified Purchase</div>
              {review.body.map(text => (
                <p key={text}>{text}</p>
              ))}
            </article>
          ))}
        </section>
      );
    case "supply":
      return (
        <section className="ca-supply">
          <div className="ca-pill-label ca-pill-label-white">{block.label}</div>
          <h3>{block.title}</h3>
          {block.paragraphs.map(text => (
            <p key={text}>
              <Inline text={text} />
            </p>
          ))}
        </section>
      );
    case "trust":
      return (
        <div className="ca-trust">
          {block.items.map((item, index) => {
            const Icon = TRUST_ICONS[index % TRUST_ICONS.length];
            return (
              <div key={item}>
                <Icon aria-hidden="true" />
                <span>{item}</span>
              </div>
            );
          })}
        </div>
      );
  }
}

function useScrolledPast(px: number) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > px);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [px]);
  return past;
}

export default function CovidAdvertorial() {
  const showSticky = useScrolledPast(stickyBar.showAfter);

  return (
    <div className="ca-shell">
      <div className="ca-strip">{masthead.strip}</div>
      <header className="ca-masthead">
        <img src={masthead.logo} alt="" width={30} height={30} />
        <span>{masthead.name}</span>
      </header>

      <main className="ca-main">
        <div className="ca-eyebrow">{hero.eyebrow}</div>
        <h1 className="ca-h1">
          {hero.headline.before} <u>{hero.headline.underlined}</u>,{" "}
          <em>{hero.headline.accent}</em>
        </h1>
        <p className="ca-deck">
          <Inline text={hero.deck} />
        </p>

        <div className="ca-hero">
          <Figure image={hero.image} />
          <div className="ca-sources">
            <span>{hero.sourcesStrip.label}</span>
            <div>
              {hero.sourcesStrip.items.map(item => (
                <b key={item}>{item}</b>
              ))}
            </div>
          </div>
        </div>

        <div className="ca-byline">
          <img src={byline.avatar} alt="" width={48} height={48} />
          <div>
            <div className="ca-byline-name">By {byline.author}</div>
            <div className="ca-byline-role">
              {byline.role} · {byline.readTime}
            </div>
          </div>
        </div>
        <div className="ca-byline-trust">
          ✓ <Inline text={byline.trust} />
        </div>

        <div className="ca-article">
          {article.map((block, index) => (
            <BlockView block={block} key={index} />
          ))}
        </div>
      </main>

      <footer className="ca-footer">
        <div className="ca-footer-name">
          <span aria-hidden="true" /> {footer.name}
        </div>
        <nav className="ca-footer-links">
          {footer.links.map(link =>
            link.href ? (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ) : (
              <span key={link.label}>{link.label}</span>
            )
          )}
        </nav>
        <div className="ca-footer-disclaimer">
          {footer.disclaimer.map(text => (
            <p key={text}>{text}</p>
          ))}
        </div>
        <ol className="ca-footer-sources">
          {footer.sources.map(source => (
            <li key={source.label}>
              {source.href ? (
                <a href={source.href} target="_blank" rel="noreferrer">
                  {source.label}
                </a>
              ) : (
                source.label
              )}
            </li>
          ))}
        </ol>
        <p className="ca-footer-copy">{footer.copyright}</p>
      </footer>

      <div
        className={`ca-sticky ${showSticky ? "is-shown" : ""}`}
        aria-hidden={!showSticky}
      >
        <div>
          <strong>{stickyBar.title}</strong>
          <span>{stickyBar.sub}</span>
        </div>
        <a
          href={PRODUCT_URL}
          target="_blank"
          rel="noreferrer"
          tabIndex={showSticky ? 0 : -1}
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}
