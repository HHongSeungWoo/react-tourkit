function isScrollable(element: HTMLElement): boolean {
  const overflow = getComputedStyle(element).overflow;
  return ["auto", "scroll"].some((value) => overflow.includes(value));
}

function findScrollableAncestor(
  element: HTMLElement | null | undefined
): HTMLElement | null {
  if (!element) {
    return null;
  }

  let parent = element.parentElement;

  while (parent && parent !== document.body) {
    if (isScrollable(parent)) {
      return parent;
    }
    parent = parent.parentElement;
  }
  return null;
}

function findFirstOverflowingAncestor(
  element: HTMLElement | null | undefined
): HTMLElement | null {
  if (!element) {
    return null;
  }
  const parent = element.parentElement;

  if (!parent) {
    return null;
  }

  const isElementBiggerThanParent =
    element.offsetWidth > parent.offsetWidth ||
    element.offsetHeight > parent.offsetHeight;
  if (!isElementBiggerThanParent) {
    return null;
  }
  return findScrollableAncestor(element);
}

export { findScrollableAncestor, findFirstOverflowingAncestor };
