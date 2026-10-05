// @vitest-environment jsdom

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import {
  announcement,
  byline,
  comparison,
  hero,
  offer,
  PRODUCT_URL,
  reasons,
  reviews,
  reviewsExpandLabel,
  socialProof,
} from "@/content/listicleContent";
import Home from "./Home";

afterEach(cleanup);

/** The same two markers the page's inline formatter understands, removed. */
const plain = (text: string) =>
  text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1");

/** The body paragraphs of a section, skipping the eyebrow and the summary. */
const paragraphsOf = (section: Element) =>
  Array.from(section.querySelectorAll("p"))
    .filter(p => !p.className.startsWith("lp-reason-eyebrow"))
    .map(p => p.textContent);

/*
 * These assertions are about structure rather than wording, on purpose. The
 * copy for this offer is still being written, and a suite that hardcoded the
 * current strings would need editing every time a line changes, which teaches
 * everyone to edit the test until it passes. Asserting that the page renders
 * whatever the content file holds keeps the suite meaningful while the copy
 * moves, and still fails loudly if a section stops rendering.
 */
describe("advertorial landing page", () => {
  it("renders the announcement bar, and no clock without a deadline", () => {
    const { container } = render(<Home />);
    const bar = container.querySelector(".lp-announce");

    expect(bar?.textContent).toContain(announcement.text);
    expect(bar?.textContent).toContain(announcement.offer);

    // `countdownTo` is unset until the sale has a real end, and an absent
    // deadline must render no clock at all rather than a zeroed one.
    expect(Boolean(announcement.countdownTo)).toBe(false);
    expect(container.querySelectorAll("time")).toHaveLength(0);
  });

  it("renders the headline, byline and summary", () => {
    const { container } = render(<Home />);

    expect(
      screen.getByRole("heading", { level: 1, name: hero.headline })
    ).toBeTruthy();
    expect(container.querySelector(".lp-byline")?.textContent).toContain(
      byline.author
    );
    expect(container.querySelector(".lp-byline")?.textContent).toContain(
      byline.updated
    );
    expect(container.querySelector(".lp-summary")?.textContent).toContain(
      hero.summary
    );
  });

  it("renders the comparison table with the product column marked out", () => {
    const { container } = render(<Home />);
    const table = container.querySelector(".lp-compare-table");

    expect(
      Array.from(table!.querySelectorAll("thead th")).map(
        cell => cell.textContent
      )
    ).toEqual(comparison.columns.map(column => column.name));

    const rows = Array.from(table!.querySelectorAll("tbody tr"));
    expect(rows).toHaveLength(comparison.rows.length);

    rows.forEach((row, index) => {
      const source = comparison.rows[index];
      expect(row.querySelector("th")?.textContent).toBe(source.label);

      const cells = Array.from(row.querySelectorAll("td"));
      expect(cells).toHaveLength(comparison.columns.length);

      cells.forEach((cell, column) => {
        // The marks are icons, which say nothing to a screen reader, so each
        // cell has to carry its state as text as well.
        expect(
          cell.querySelector(".lp-sr")?.textContent?.length ?? 0
        ).toBeGreaterThan(1);
        expect(cell.classList.contains("is-highlight")).toBe(
          Boolean(comparison.columns[column].highlight)
        );
        const note = source.cells[column].note;
        if (note) expect(cell.textContent).toContain(note);
      });
    });
  });

  it("renders the seven numbered reasons in order", () => {
    const { container } = render(<Home />);
    const blocks = Array.from(container.querySelectorAll(".lp-reason"));

    expect(blocks).toHaveLength(7);
    expect(blocks.map(block => block.id)).toEqual(
      reasons.map(reason => reason.id)
    );
    expect(
      Array.from(container.querySelectorAll(".lp-reason-number")).map(
        n => n.textContent
      )
    ).toEqual(reasons.map(reason => reason.number));

    for (const reason of reasons) {
      expect(
        screen.getByRole("heading", { level: 2, name: reason.headline })
      ).toBeTruthy();
    }
  });

  it("renders every paragraph of every reason, in order", () => {
    const { container } = render(<Home />);

    for (const reason of reasons) {
      const section = container.querySelector(`#${reason.id}`);
      expect(paragraphsOf(section!)).toEqual(reason.body.map(plain));
    }
  });

  it("never leaves an inline formatting marker on the page", () => {
    const { container } = render(<Home />);

    // A stray `**` means the formatter missed a span the copy marked up, which
    // is the kind of thing nobody notices until it is in front of traffic.
    expect(container.textContent).not.toMatch(/\*/);
    expect(
      container.querySelectorAll(".lp-reason strong").length
    ).toBeGreaterThan(0);
    expect(container.querySelectorAll(".lp-reason em").length).toBeGreaterThan(
      0
    );
  });

  it("renders the timeline inside the reason that carries one", () => {
    const { container } = render(<Home />);
    const withTimeline = reasons.filter(reason => reason.timeline);

    expect(withTimeline.length).toBeGreaterThan(0);
    expect(container.querySelectorAll(".lp-timeline")).toHaveLength(
      withTimeline.length
    );

    for (const reason of withTimeline) {
      const entries = Array.from(
        container.querySelectorAll(`#${reason.id} .lp-timeline li`)
      );
      expect(
        entries.map(entry => entry.querySelector("strong")?.textContent)
      ).toEqual(reason.timeline!.map(entry => entry.when));
      expect(
        entries.map(entry => entry.querySelector("span")?.textContent)
      ).toEqual(reason.timeline!.map(entry => entry.what));
    }
  });

  it("renders two offer blocks, with the gifts line on the first only", () => {
    const { container } = render(<Home />);
    const blocks = Array.from(container.querySelectorAll(".lp-offer"));

    expect(blocks).toHaveLength(2);
    for (const block of blocks) {
      expect(block.querySelector("h2")?.textContent).toBe(offer.headline);
      expect(block.textContent).toContain(offer.scarcity);
      expect(block.textContent).toContain(offer.guarantee);
      expect(block.querySelectorAll(".lp-badges li")).toHaveLength(
        offer.meta.length
      );
    }
    expect(container.querySelectorAll(".lp-offer-gifts")).toHaveLength(1);
    expect(blocks[0].querySelector(".lp-offer-gifts")).toBeTruthy();

    // The mid-page block interrupts the reasons where the copy asks for it,
    // rather than trailing after all seven.
    expect(blocks[0].previousElementSibling?.id).toBe(
      reasons.find(reason => reason.offerAfter)?.id
    );
  });

  it("holds the extra reviews back until the reader asks for them", () => {
    const { container } = render(<Home />);
    const upfront = reviews.filter(review => !review.extra);

    expect(container.querySelector(".lp-reviews h2")?.textContent).toBe(
      socialProof.heading
    );
    expect(container.querySelectorAll(".lp-review")).toHaveLength(
      upfront.length
    );
    expect(upfront.length).toBeLessThan(reviews.length);

    fireEvent.click(screen.getByRole("button", { name: reviewsExpandLabel }));

    expect(container.querySelectorAll(".lp-review")).toHaveLength(
      reviews.length
    );
    expect(
      screen.queryByRole("button", { name: reviewsExpandLabel })
    ).toBeNull();
  });

  it("attributes every review to a name and an age", () => {
    const { container } = render(<Home />);
    fireEvent.click(screen.getByRole("button", { name: reviewsExpandLabel }));

    const cards = Array.from(container.querySelectorAll(".lp-review"));
    cards.forEach((card, index) => {
      const review = reviews[index];
      expect(card.textContent).toContain(review.body);
      expect(card.querySelector("footer strong")?.textContent).toBe(
        `${review.name}, ${review.age}`
      );
      expect(card.textContent).toContain(review.badge);
    });
  });

  it("gives every image a width, a height and descriptive alt text", () => {
    const { container } = render(<Home />);
    fireEvent.click(screen.getByRole("button", { name: reviewsExpandLabel }));
    const images = Array.from(container.querySelectorAll("img"));

    const expected =
      reasons.filter(reason => reason.image).length +
      reasons.filter(reason => reason.trailingImage).length +
      reviews.filter(review => review.image).length +
      (byline.image ? 1 : 0) +
      (hero.image ? 1 : 0) +
      (socialProof.image ? 1 : 0) +
      // One offer image, rendered once in each of the two offer blocks.
      (offer.image ? 2 : 0);
    expect(images).toHaveLength(expected);

    for (const image of images) {
      expect(image.getAttribute("alt")?.length ?? 0).toBeGreaterThan(20);
      expect(image.getAttribute("width")).toBeTruthy();
      expect(image.getAttribute("height")).toBeTruthy();
    }
  });

  it("loads above-the-fold artwork eagerly and everything below it lazily", () => {
    const { container } = render(<Home />);
    const images = Array.from(container.querySelectorAll("img"));

    for (const image of images) {
      // The hero is the Largest Contentful Paint element; lazy-loading it would
      // delay the thing the visitor is actually waiting for. Everything below
      // the fold stays lazy.
      const eager = image.getAttribute("loading") === "eager";
      expect(image.getAttribute("fetchpriority")).toBe(eager ? "high" : null);
    }
    expect(
      images.filter(
        image =>
          image.getAttribute("loading") === "eager" &&
          image.getAttribute("fetchpriority")
      )
    ).toHaveLength(hero.image ? 1 : 0);
  });

  it("points every call to action at the product page", () => {
    const { container } = render(<Home />);
    const ctas = Array.from(container.querySelectorAll("a.lp-cta"));

    expect(ctas.length).toBeGreaterThanOrEqual(3);
    for (const cta of ctas) {
      expect(cta.getAttribute("href")).toBe(PRODUCT_URL);
      expect(cta.getAttribute("rel")).toContain("noreferrer");
    }
  });

  it("ships no link without a destination", () => {
    const { container } = render(<Home />);

    // The footer's policy pages have no URLs yet. Rendering them as anchors
    // pointed at a placeholder would ship a link that goes nowhere.
    for (const link of Array.from(container.querySelectorAll("a"))) {
      const href = link.getAttribute("href") ?? "";
      expect(href).toMatch(/^(https?:|\/|#)/);
    }
    expect(container.querySelectorAll(".lp-footer li")).toHaveLength(2);
  });

  it("advertises at most one discount figure across every call to action", () => {
    const { container } = render(<Home />);
    const figures = new Set(
      Array.from(container.querySelectorAll(".lp-cta"))
        .flatMap(cta =>
          Array.from((cta.textContent ?? "").matchAll(/(\d+)\s*%/g))
        )
        .map(match => match[1])
    );

    // A page offering two different savings figures undercuts both.
    expect(Array.from(figures).length).toBeLessThanOrEqual(1);
  });

  it("keeps a regulatory disclaimer on the page", () => {
    render(<Home />);

    expect(screen.getByText(/have not been evaluated by the FDA/)).toBeTruthy();
  });

  it("reveals the sticky call to action only after scrolling", async () => {
    const { container } = render(<Home />);

    expect(
      container.querySelector(".lp-sticky")?.classList.contains("is-visible")
    ).toBe(false);

    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 900,
    });
    fireEvent.scroll(window);

    await waitFor(() => {
      expect(
        container.querySelector(".lp-sticky")?.classList.contains("is-visible")
      ).toBe(true);
    });
  });
});
