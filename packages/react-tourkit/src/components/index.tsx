import { ComponentType, useEffect, useState } from "react";

import Overlay from "../components/Overlay";
import Portal from "../components/Portal";

import StepContainer, { StepAlign, StepSide } from "./StepContainer.tsx";

export interface Step {
  target: string | HTMLElement;

  stepSide?: StepSide;
  stepSideOffset?: number;
  stepAlign?: StepAlign;
  stepAlignOffset?: number;

  highlightPadding?: number;
  highlightRadius?: number;
  scrollToTargetOptions?: ScrollIntoViewOptions;
  scrollToTarget?: boolean;
  highlightOverflow?: boolean;
}

export interface StepComponentProps<T extends Step = Step> {
  controller: Controller<T>;
}

const getElement = (element: string | HTMLElement): HTMLElement | null => {
  if (typeof window === "undefined") {
    return null;
  }

  if (typeof element === "string") {
    return document.querySelector(element);
  }

  return element;
};

export class Controller<T extends Step> {
  currentTarget?: HTMLElement | null = undefined;
  index = 0;

  constructor(public steps: T[]) {}

  private listeners: ((...args: unknown[]) => Promise<void> | void)[] = [];
  subscribe = (listener: (...args: unknown[]) => Promise<void> | void) => {
    this.listeners.push(listener);
  };

  unsubscribe = (listener: (...args: unknown[]) => Promise<void> | void) => {
    const index = this.listeners.indexOf(listener);
    if (index !== -1) {
      this.listeners.splice(index, 1);
    }
  };

  emit = (key: string, ...args: unknown[]) => {
    this.listeners.forEach((listener) => listener(key, ...args));
  };

  private targetObserver: ReturnType<typeof setInterval> | null = null;
  private observeTargetChange() {
    this.targetObserver = setInterval(() => {
      const step = this.getStep();
      if (!step) {
        this.setTarget(null);
        return;
      }

      this.setTarget(step ? getElement(step.target) : null);
    }, 100);
  }

  private scrollToTarget(target: HTMLElement) {
    const {
      scrollToTarget = true,
      scrollToTargetOptions = {
        behavior: "smooth",
        block: "center",
        inline: "center",
      },
    } = this.getStep();
    if (!scrollToTarget) {
      return;
    }
    target.scrollIntoView(scrollToTargetOptions);
  }

  private setTarget(target: HTMLElement | null) {
    if (this.currentTarget !== target) {
      this.currentTarget = target;
      this.emit("init");
      if (this.currentTarget) {
        this.scrollToTarget(this.currentTarget);
        this.emit("ready", this.currentTarget);
      }
    }
  }

  goTo = (index: number) => {
    if (index < 0) {
      this.emit("error");
      return;
    }

    const nextIndex = Math.min(index, this.steps.length - 1);

    if (nextIndex > this.index) {
      this.emit("next");
    } else if (nextIndex < this.index) {
      this.emit("prev");
    } else if (nextIndex === this.steps.length - 1) {
      this.emit("finish");
    }

    this.index = nextIndex;
  };

  next = () => {
    this.goTo(this.index + 1);
  };

  prev = () => {
    this.goTo(this.index - 1);
  };

  getStep = () => {
    return this.steps[this.index] ?? null;
  };

  start = () => {
    this.observeTargetChange();
    this.emit("start");
  };

  stop = () => {
    if (this.targetObserver) {
      clearInterval(this.targetObserver);
      this.targetObserver = null;
    }

    this.currentTarget = undefined;
    this.emit("stop");
  };

  get size() {
    return this.steps.length;
  }

  get isRunning() {
    return this.targetObserver !== null;
  }
}

export function TourKit<T extends Step>({
  controller,
  StepComponent,
  defaultStepSide,
  defaultStepAlign,
  defaultStepSideOffset,
  defaultStepAlignOffset,
  defaultHighlightPadding,
  defaultHighlightRadius,
  highlight = true,
  defaultHighlightOverflow = true,
}: {
  highlight?: boolean;
  controller: Controller<T>;
  StepComponent: ComponentType<StepComponentProps<T>>;
  defaultStepSide?: StepSide;
  defaultStepSideOffset?: number;
  defaultStepAlign?: StepAlign;
  defaultStepAlignOffset?: number;
  defaultHighlightPadding?: number;
  defaultHighlightRadius?: number;
  defaultHighlightOverflow?: boolean;
}) {
  const [, rerender] = useState({});

  useEffect(() => {
    const callback = () => {
      rerender({});
    };
    controller.subscribe(callback);

    return () => {
      controller.unsubscribe(callback);
    };
  }, [controller]);

  if (!controller.isRunning) {
    return null;
  }

  const step = controller.getStep();

  return (
    <>
      <StepContainer
        side={step?.stepSide ?? defaultStepSide}
        align={step?.stepAlign ?? defaultStepAlign}
        sideOffset={step?.stepSideOffset ?? defaultStepSideOffset}
        alignOffset={step?.stepAlignOffset ?? defaultStepAlignOffset}
        target={controller.currentTarget}
        highlightOverflow={step?.highlightOverflow ?? defaultHighlightOverflow}
      >
        <StepComponent controller={controller} />
      </StepContainer>
      <Portal>
        <Overlay
          highlight={highlight}
          target={controller.currentTarget}
          radius={step?.highlightRadius ?? defaultHighlightRadius}
          padding={step?.highlightPadding ?? defaultHighlightPadding}
          highlightOverflow={
            step?.highlightOverflow ?? defaultHighlightOverflow
          }
        />
      </Portal>
    </>
  );
}
