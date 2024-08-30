import * as Popover from "@radix-ui/react-popover";
import type { PropsWithChildren } from "react";

export type StepSide = "top" | "bottom" | "left" | "right";
export type StepAlign = "start" | "center" | "end";

export default function StepContainer({
  side = "bottom",
  align = "center",
  target,
  children,
}: PropsWithChildren<{
  side?: StepSide;
  align?: StepAlign;
  target?: HTMLElement | null;
}>) {
  return (
    <Popover.Root open={!!target}>
      <Popover.Anchor virtualRef={{ current: target ?? null }} />
      <Popover.Portal>
        <Popover.Content
          sideOffset={8}
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
