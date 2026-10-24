// @vitest-environment jsdom

import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import {
  article,
  footer,
  hero,
  masthead,
  PRODUCT_URL,
  reviews,
  showNotOnAmazon,
} from "@/content/covidAdvertorialContent";
import CovidAdvertorial from "./CovidAdvertorial";

afterEach(cleanup);

/*
 * Structure, not wording: the copy will keep moving, and a suite that pinned
 * strings would be edited until it passed. These check that every block in the
 * content file reaches the page and that the guard rails hold.
 */
describe("COVID-style advertorial", () => {
  it("says it is an advertorial in the masthead and the footer", () => {
    const { container } = render(<CovidAdvertorial />);
    expect(container.querySelector(".ca-strip")?.textContent).toMatch(
      /advertorial/i
    );
    expect(container.querySelector(".ca-footer")?.textContent).toMatch(
      /advertisement/i
    );
    expect(container.querySelector(".ca-masthead")?.textContent).toContain(
      masthead.name
    );
  });

  it("renders the headline parts", () => {
    const { container } = render(<CovidAdvertorial />);
    const h1 = container.querySelector("h1")?.textContent ?? "";
    expect(h1).toContain(hero.headline.underlined);
    expect(h1).toContain(hero.headline.accent);
  });

  it("renders one section heading, evidence card and figure per block", () => {
    const { container } = render(<CovidAdvertorial />);
    const count = (kind: string) => article.filter(b => b.kind === kind).length;
    expect(container.querySelectorAll(".ca-article .ca-h2")).toHaveLength(
      count("h2")
    );
    expect(container.querySelectorAll(".ca-evidence")).toHaveLength(
      count("evidence")
    );
    expect(container.querySelectorAll(".ca-article .ca-figure")).toHaveLength(
      count("figure")
    );
  });

  it("points every call to action at the product page", () => {
    const { container } = render(<CovidAdvertorial />);
    const ctas = Array.from(
      container.querySelectorAll<HTMLAnchorElement>(".ca-cta, .ca-sticky a")
    );
    expect(ctas.length).toBe(article.filter(b => b.kind === "cta").length + 1);
    for (const a of ctas) expect(a.href).toBe(PRODUCT_URL);
  });

  it("hides sections that are waiting on real facts", () => {
    const { container } = render(<CovidAdvertorial />);
    expect(container.querySelectorAll(".ca-review")).toHaveLength(
      reviews.length
    );
    expect(Boolean(container.querySelector(".ca-warning"))).toBe(
      showNotOnAmazon
    );
  });

  it("never leaks a formatting marker or an em dash onto the page", () => {
    const { container } = render(<CovidAdvertorial />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/\*\*|==/);
    expect(text).not.toContain("—");
  });

  it("links every cited source that has a URL", () => {
    const { container } = render(<CovidAdvertorial />);
    const linked = footer.sources.filter(s => s.href).length;
    expect(container.querySelectorAll(".ca-footer-sources a")).toHaveLength(
      linked
    );
  });
});
