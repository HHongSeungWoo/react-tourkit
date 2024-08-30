import { useEffect, useState } from "react";

export default function Overlay({
  target,
  highlight,
}: {
  target?: HTMLElement | null;
  highlight: boolean;
}) {
  const [path, setPath] = useState("");

  useEffect(() => {
    document.body.classList.add("tourkit-body");
    if (target) {
      target.classList.add("tourkit-target");
    }

    return () => {
      document.body.classList.remove("tourkit-body");
      if (target) {
        target.classList.remove("tourkit-target");
      }
    };
  }, [target]);

  useEffect(() => {
    const callback = () => {
      if (!target) {
        return;
      }

      const windowX = window.innerWidth;
      const windowY = window.innerHeight;

      const stagePadding = 0;
      const stageRadius = 6;

      const rect = target.getBoundingClientRect();

      const stageWidth = rect.width + stagePadding * 2;
      const stageHeight = rect.height + stagePadding * 2;

      const limitedRadius = Math.min(
        stageRadius,
        stageWidth / 2,
        stageHeight / 2,
      );

      const normalizedRadius = Math.floor(Math.max(limitedRadius, 0));

      const highlightBoxX = rect.x - stagePadding + normalizedRadius;
      const highlightBoxY = rect.y - stagePadding;
      const highlightBoxWidth = stageWidth - normalizedRadius * 2;
      const highlightBoxHeight = stageHeight - normalizedRadius * 2;

      setPath(`M${windowX},0L0,0L0,${windowY}L${windowX},${windowY}L${windowX},0Z
    M${highlightBoxX},${highlightBoxY} h${highlightBoxWidth} a${normalizedRadius},${normalizedRadius} 0 0 1 ${normalizedRadius},${normalizedRadius} v${highlightBoxHeight} a${normalizedRadius},${normalizedRadius} 0 0 1 -${normalizedRadius},${normalizedRadius} h-${highlightBoxWidth} a${normalizedRadius},${normalizedRadius} 0 0 1 -${normalizedRadius},-${normalizedRadius} v-${highlightBoxHeight} a${normalizedRadius},${normalizedRadius} 0 0 1 ${normalizedRadius},-${normalizedRadius} z`);
    };

    window.addEventListener("resize", callback);
    document.addEventListener("scroll", callback, true);
    target?.parentElement?.addEventListener("scroll", callback, true);

    callback();

    return () => {
      window.removeEventListener("resize", callback);
      document.removeEventListener("scroll", callback, true);
      target?.parentElement?.removeEventListener("scroll", callback, true);
    };
  }, [target]);

  if (!target || !highlight) {
    return <div id="tourkit-overlay" />;
  }

  return (
    <svg id="tourkit-overlay">
      <path d={path} />
    </svg>
  );
}
