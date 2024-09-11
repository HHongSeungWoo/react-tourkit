function isScrolling(element: HTMLElement) {
  const overflow = getComputedStyle(element, null).getPropertyValue("overflow");
  const scrollable =
    overflow.indexOf("auto") > -1 || overflow.indexOf("scroll") > -1;

  return scrollable;
}

function getScrollableParent(
  element: HTMLElement | null | undefined
): HTMLElement | null {
  if (!element) {
    return null;
  }

  let parent = element.parentElement;

  while (parent && parent !== document.body) {
    if (isScrolling(parent)) {
      return parent;
    }
    parent = parent.parentElement;
  }
  return null;
}

function getOverflowContainerParent(element: HTMLElement | null | undefined) {
  if (!element) {
    return null;
  }
  const parent = element.parentElement;

  if (!parent) {
    return null;
  }

  const isBiggerThanParent =
    element.offsetWidth > parent.offsetWidth ||
    element.offsetHeight > parent.offsetHeight;
  if (!isBiggerThanParent) {
    return element;
  }
  return getScrollableParent(element);
}

export { getScrollableParent, getOverflowContainerParent };
