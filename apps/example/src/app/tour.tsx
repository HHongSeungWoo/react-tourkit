"use client";

import { TourKit, StepComponentProps, Step, Controller } from "react-tourkit";
import { PropsWithChildren, useEffect, useMemo } from "react";

function StepComponent({
  controller,
}: StepComponentProps<Step & { content: string }>) {
  const step = controller.getStep();

  if (!step) {
    return null;
  }

  return (
    <div className="flex flex-col bg-white text-center gap-4 rounded p-1 text-black">
      <div>{step.content}</div>
      <div className="flex gap-4">
        <div>
          progress: {controller.index} / {controller.size}
        </div>
        <button onClick={controller.next}>다음</button>
        <button onClick={controller.prev}>이전</button>
        <button onClick={controller.stop}>닫기</button>
      </div>
    </div>
  );
}

const STEPS = [
  { target: "div.font-mono", content: "step3" },
  { target: "#page1", content: "step1" },
  { target: "#page2", content: "step1" },
  { target: "#scroll9", content: "step1" },
  { target: "#timeout1", content: "step2" },
  { target: "#test122", content: "step4" },
  { target: "#test1", content: "step5" },
  { target: "#test2", content: "step6" },
];

export default function Tour({ children }: PropsWithChildren) {
  const controller = useMemo(() => new Controller(STEPS), []);

  useEffect(() => {
    controller.start();
    controller.goTo(0);

    return () => {
      controller.stop();
    };
  }, [controller]);

  return (
    <>
      <TourKit controller={controller} StepComponent={StepComponent} />
      {children}
    </>
  );
}
