"use client";

import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgressRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  const sections = [
    { id: "hero", label: "" },
    { id: "bespoke", label: "الخياط" },
    { id: "collection", label: "المجموعة" },
    { id: "process", label: "الرحلة" },
    { id: "social", label: "إنستقرام" },
  ];

  const setDotRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      dotsRef.current[index] = el;
    },
    []
  );

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    gsap.to(progressRef.current, {
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
      scaleY: 1,
      ease: "none",
    });

    sections.forEach((section, i) => {
      if (i === 0) return;
      const el = document.getElementById(section.id);
      if (!el || !dotsRef.current[i]) return;

      gsap.fromTo(
        dotsRef.current[i],
        { scale: 0.5, opacity: 0.3 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  });

  return (
    <div
      ref={railRef}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3"
      aria-hidden="true"
    >
      <div className="relative w-[2px] h-24 bg-[var(--color-warm-800)] rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-[var(--color-gold-400)] to-[var(--color-gold-600)] origin-bottom rounded-full"
          style={{ transform: "scaleY(0)" }}
        />
      </div>

      <div className="flex flex-col gap-2.5">
        {sections.map((section, i) => (
          <div
            key={section.id}
            ref={setDotRef(i)}
            className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold-400)] transition-opacity duration-500"
            style={{ opacity: i === 0 ? 1 : 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}
