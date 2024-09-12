import { describe, it, expect } from "vitest";
import {
  findFirstOverflowingAncestor,
  findScrollableAncestor,
} from "../../src/utils/helpers";

describe("findScrollableAncestor", () => {
  it("return the expected value", () => {
    expect(findScrollableAncestor(null)).toBe(null);
    expect(findScrollableAncestor(undefined)).toBe(null);
  });

  it("return the closest scrollable parent", () => {
    const parent = document.createElement("div");
    const child = document.createElement("div");

    parent.style.overflow = "scroll";
    parent.appendChild(child);
    document.body.appendChild(parent);
    expect(findScrollableAncestor(child)).toBe(parent);
    document.body.removeChild(parent);
  });

  it("return null if no scrollable parent exists", () => {
    const parent = document.createElement("div");
    const child = document.createElement("div");

    parent.appendChild(child);
    document.body.appendChild(parent);
    expect(findScrollableAncestor(child)).toBe(null);
    document.body.removeChild(parent);
  });
});

describe("findFirstOverflowingAncestor", () => {
  it("return the element itself if it is smaller than its parent", () => {
    const parent = document.createElement("div");
    const child = document.createElement("div");

    Object.defineProperty(parent, "offsetWidth", { value: 500 });
    Object.defineProperty(parent, "offsetHeight", { value: 500 });
    Object.defineProperty(child, "offsetWidth", { value: 100 });
    Object.defineProperty(child, "offsetHeight", { value: 100 });

    parent.appendChild(child);
    document.body.appendChild(parent);
    expect(findFirstOverflowingAncestor(child)).toBe(null);
    document.body.removeChild(parent);
  });

  it("return the closest scrollable parent if the element is larger than its parent", () => {
    const parent = document.createElement("div");
    const child = document.createElement("div");

    parent.style.overflow = "scroll";

    Object.defineProperty(parent, "offsetWidth", { value: 200 });
    Object.defineProperty(parent, "offsetHeight", { value: 200 });
    Object.defineProperty(child, "offsetWidth", { value: 500 });
    Object.defineProperty(child, "offsetHeight", { value: 500 });
    parent.appendChild(child);
    document.body.appendChild(parent);

    expect(findFirstOverflowingAncestor(child)).toBe(parent);

    document.body.removeChild(parent);
  });

  it("return null if no scrollable parent exists and element is bigger than parent", () => {
    const parent = document.createElement("div");
    const child = document.createElement("div");

    Object.defineProperty(parent, "offsetWidth", { value: 200 });
    Object.defineProperty(parent, "offsetHeight", { value: 200 });
    Object.defineProperty(child, "offsetWidth", { value: 500 });
    Object.defineProperty(child, "offsetHeight", { value: 500 });
    parent.appendChild(child);
    document.body.appendChild(parent);

    expect(findFirstOverflowingAncestor(child)).toBe(null);

    document.body.removeChild(parent);
  });
});
