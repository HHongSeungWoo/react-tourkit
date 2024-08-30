import { createPortal } from "react-dom";
import { type PropsWithChildren, useLayoutEffect, useState } from "react";

export default function Portal({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);
  useLayoutEffect(() => setMounted(true), []);
  const container = mounted && globalThis?.document?.body;
  return container ? createPortal(children, container) : null;
}
