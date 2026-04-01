"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/utils";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0 || !window.matchMedia("(hover: hover)").matches;
    if (isTouchDevice) return;

    container.style.display = "block";

    const cursor = cursorRef.current;
    if (!cursor) return;

    const reducedMotion = prefersReducedMotion();
    const duration = reducedMotion ? 0 : 0.15;
    const hoverDuration = reducedMotion ? 0 : 0.3;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration,
        ease: "power2.out",
        overwrite: true,
      });
    };

    const isInteractive = (target: EventTarget | null): boolean => {
      if (!(target instanceof HTMLElement)) return false;
      return !!target.closest("a, button, [role='button']");
    };

    const cs = getComputedStyle(cursor);
    const goldDefaultBg = cs.getPropertyValue("--cursor-default").trim();
    const goldHoverBg = cs.getPropertyValue("--cursor-hover-bg").trim();
    const goldHoverBorder = cs.getPropertyValue("--cursor-hover-border").trim();

    const onMouseOver = (e: MouseEvent) => {
      if (isInteractive(e.target)) {
        gsap.to(cursor, { scale: 2.5, backgroundColor: goldHoverBg, border: `1px solid ${goldHoverBorder}`, duration: hoverDuration, ease: "power2.out" });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      if (isInteractive(e.target)) {
        gsap.to(cursor, { scale: 1, backgroundColor: goldDefaultBg, border: "none", duration: hoverDuration, ease: "power2.out" });
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <div ref={containerRef} className="hidden">
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999]"
        style={
          {
            "--cursor-default": "rgba(212, 175, 55, 0.85)",
            "--cursor-hover-bg": "rgba(212, 175, 55, 0.2)",
            "--cursor-hover-border": "rgba(212, 175, 55, 0.5)",
            backgroundColor: "var(--cursor-default)",
          } as React.CSSProperties
        }
      />
    </div>
  );
}
