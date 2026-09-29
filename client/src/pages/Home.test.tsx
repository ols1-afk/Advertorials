// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import {
  hero,
  lovedByThousands,
  offer,
  PRODUCT_URL,
  reasons,
  reviews,
  trustBadges,
} from "@/content/listicleContent";
import Home from "./Home";

afterEach(cleanup);

/*
 * These assertions are about structure rather than wording, on purpose. The
 * copy for this offer is still being written, and a suite that hardcoded the
 * current strings would need editing every time a line changes, which teaches
 * everyone to edit the test until it passes. Asserting that the page renders
 * whatever the content file holds keeps the suite meaningful while the copy
 * moves, and still fails loudly if a section stops rendering.
 */
describe("advertorial landing page", () => {
  it("renders the hero from the content file", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { level: 1, name: hero.headline })).toBeTruthy();
    expect(screen.getByText(hero.subheadline)).toBeTruthy();
    expect(screen.getByText(hero.body)).toBeTruthy();
    expect(screen.getByText(hero.socialProof)).toBeTruthy();
  });

  it("renders the seven numbered reasons in order", () => {
    const { container } = render(<Home />);
    const blocks = Array.from(container.querySelectorAll(".lp-reason:not(.lp-proof)"));

    expect(blocks).toHaveLength(7);
    expect(blocks.map((block) => block.id)).toEqual(reasons.map((reason) => reason.id));
    expect(
      Array.from(container.querySelectorAll(".lp-reason-number")).map((n) => n.textContent),
    ).toEqual(["01", "02", "03", "04", "05", "06", "07"]);

    for (const reason of reasons) {
      expect(screen.getAllByRole("heading", { level: 2, name: reason.headline }).length).toBeGreaterThan(0);
    }
  });

  it("renders every paragraph of every reason", () => {
    render(<Home />);

    for (const reason of reasons) {
      for (const paragraph of reason.body) {
        expect(screen.getAllByText(paragraph).length).toBeGreaterThan(0);
      }
    }
  });

  it("renders the social proof block after the seven, without a number", () => {
    const { container } = render(<Home />);
    const proof = container.querySelector(".lp-proof");

    expect(proof).toBeTruthy();
    expect(proof?.querySelectorAll(".lp-reason-number")).toHaveLength(0);
    expect(
      Array.from(proof!.querySelectorAll(".lp-stats li strong")).map((s) => s.textContent),
    ).toEqual(lovedByThousands.stats?.map((stat) => stat.value));
  });

  it("renders the offer block with its badges and guarantee", () => {
    const { container } = render(<Home />);

    expect(screen.getAllByRole("heading", { level: 2, name: offer.heading }).length).toBeGreaterThan(0);
    expect(container.querySelectorAll(".lp-badges li")).toHaveLength(trustBadges.length);
    expect(screen.getByText(offer.guarantee)).toBeTruthy();
    for (const paragraph of offer.body) {
      expect(screen.getAllByText(paragraph).length).toBeGreaterThan(0);
    }
  });

  it("renders every review with an attributed name", () => {
    const { container } = render(<Home />);

    expect(container.querySelectorAll(".lp-review")).toHaveLength(reviews.length);
    for (const review of reviews) {
      expect(screen.getAllByText(review.name).length).toBeGreaterThan(0);
    }
    expect(container.querySelectorAll(".lp-review-photo")).toHaveLength(
      reviews.filter((review) => review.image).length,
    );
  });

  it("gives every image a width, a height and descriptive alt text", () => {
    const { container } = render(<Home />);
    const images = Array.from(container.querySelectorAll("img"));

    const expected =
      reasons.filter((reason) => reason.image).length +
      reviews.filter((review) => review.image).length +
      (lovedByThousands.image ? 1 : 0) +
      (hero.image ? 1 : 0) +
      (offer.image ? 1 : 0);
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
    expect(images.filter((i) => i.getAttribute("loading") === "eager").length).toBeLessThanOrEqual(1);
  });

  it("points every call to action at the product page", () => {
    render(<Home />);
    const links = screen.getAllByRole("link");

    expect(links.length).toBeGreaterThanOrEqual(4);
    for (const link of links) {
      expect(link.getAttribute("href")).toBe(PRODUCT_URL);
      expect(link.getAttribute("rel")).toContain("noreferrer");
    }
  });

  it("advertises at most one discount figure across every call to action", () => {
    const { container } = render(<Home />);
    const figures = new Set(
      Array.from(container.querySelectorAll(".lp-cta"))
        .flatMap((cta) => Array.from((cta.textContent ?? "").matchAll(/(\d+)\s*%/g)))
        .map((match) => match[1]),
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

    expect(container.querySelector(".lp-sticky")?.classList.contains("is-visible")).toBe(false);

    Object.defineProperty(window, "scrollY", { configurable: true, value: 900 });
    fireEvent.scroll(window);

    await waitFor(() => {
      expect(container.querySelector(".lp-sticky")?.classList.contains("is-visible")).toBe(true);
    });
  });
});
