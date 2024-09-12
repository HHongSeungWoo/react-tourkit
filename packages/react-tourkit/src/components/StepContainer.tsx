import * as Popover from "@radix-ui/react-popover";
import type { PropsWithChildren } from "react";
import { findFirstOverflowingAncestor } from "../utils/helpers";

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
  return (
    <Popover.Root open={!!target}>
      <Popover.Anchor
        virtualRef={{
          current: (() => {
            const parent = findFirstOverflowingAncestor(target);
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
