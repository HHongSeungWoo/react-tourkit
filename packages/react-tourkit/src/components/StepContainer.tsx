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
  highlightOverflow = false,
}: PropsWithChildren<{
  side?: StepSide;
  align?: StepAlign;
  sideOffset?: number;
  alignOffset?: number;
  target?: HTMLElement | null;
  highlightOverflow?: boolean;
}>) {
  return (
    <Popover.Root open={!!target}>
      <Popover.Anchor
        virtualRef={{
          current:
            (() => {
              if (!highlightOverflow) {
                const parent = target?.parentElement;
                if (parent) {
                  return parent;
                }
              }
              return target;
            })() ?? null,
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
