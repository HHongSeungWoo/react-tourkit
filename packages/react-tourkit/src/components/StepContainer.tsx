import * as Popover from "@radix-ui/react-popover";
import type { PropsWithChildren } from "react";

export type StepSide = "top" | "bottom" | "left" | "right";
export type StepAlign = "start" | "center" | "end";

export default function StepContainer({
  side = "bottom",
  sideOffset = 8,
  align = "center",
  alignOffset = 0,
  target,
  children,
}: PropsWithChildren<{
  side?: StepSide;
  align?: StepAlign;
  sideOffset?: number;
  alignOffset?: number;
  target?: HTMLElement | null;
}>) {
  function findScrollableParent(element: HTMLElement): HTMLElement | null {
    if (!element) {
      return null;
    }
    let parent = element.parentElement;

    while (parent && parent !== document.body) {
      const hasVerticalScrollbar = parent.scrollHeight > parent.clientHeight;
      const hasHorizontalScrollbar = parent.scrollWidth > parent.clientWidth;

      if (hasVerticalScrollbar || hasHorizontalScrollbar) {
        return parent;
      }

      parent = parent.parentElement;
    }

    return null;
  }

  return (
    <Popover.Root open={!!target}>
      <Popover.Anchor
        virtualRef={{
          current: (() => {
            const parent = findScrollableParent(target!);
            if (parent) {
              return parent;
            }
            return target ?? null;
          })(),
        }}
      />
      <Popover.Portal>
        <Popover.Content
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          id="tourkit-step"
          side={side}
          align={align}
        >
          {children}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
