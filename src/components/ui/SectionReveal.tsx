"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type RevealDirection = "up" | "down" | "left" | "right" | "center" | "curtain-left" | "curtain-right" | "curtain-center";

interface SectionRevealProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  className?: string;
}

function getClipPathValues(direction: RevealDirection) {
  switch (direction) {
    case "up":
      return {
        from: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      };
    case "down":
      return {
        from: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      };
    case "left":
      return {
        from: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
        to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      };
    case "right":
      return {
        from: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      };
    case "curtain-left":
      return {
        from: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        curtain: true,
        curtainFrom: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        curtainTo: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
      };
    case "curtain-right":
      return {
        from: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
        to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        curtain: true,
        curtainFrom: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        curtainTo: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      };
    case "curtain-center":
      return {
        from: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
        to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        curtain: true,
        curtainFrom: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        curtainTo: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        isSplit: true,
      };
    case "center":
    default:
      return {
        from: "polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)",
        to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      };
  }
}

export default function SectionReveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: SectionRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const curtainLeftRef = useRef<HTMLDivElement>(null);
  const curtainRightRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!contentRef.current || !containerRef.current) return;

      if (prefersReducedMotion()) {
        gsap.set(contentRef.current, { clearProps: "all" });
        if (curtainRef.current) gsap.set(curtainRef.current, { clearProps: "all" });
        if (curtainLeftRef.current) gsap.set(curtainLeftRef.current, { clearProps: "all" });
        if (curtainRightRef.current) gsap.set(curtainRightRef.current, { clearProps: "all" });
        return;
      }

      const clipConfig = getClipPathValues(direction);
      const springEase = "elastic.out(1, 0.75)";
      const contentSpring = "elastic.out(1, 0.5)";

      gsap.set(contentRef.current, {
        clipPath: clipConfig.from,
        scale: 0.98,
      });

      const tl = gsap.timeline({
        delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 92%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(contentRef.current, {
        clipPath: clipConfig.to,
        scale: 1,
        duration: 1.4,
        ease: contentSpring,
      });

      if (clipConfig.curtain && clipConfig.isSplit) {
        if (curtainLeftRef.current && curtainRightRef.current) {
          gsap.set([curtainLeftRef.current, curtainRightRef.current], {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          });

          tl.to(curtainLeftRef.current, {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            duration: 1.2,
            ease: springEase,
          }, 0.1)
            .to(curtainRightRef.current, {
              clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
              duration: 1.2,
              ease: springEase,
            }, 0.1);
        }
      } else if (clipConfig.curtain && curtainRef.current) {
        gsap.set(curtainRef.current, {
          clipPath: clipConfig.curtainFrom,
        });

        tl.to(curtainRef.current, {
          clipPath: clipConfig.curtainTo,
          duration: 1.2,
          ease: springEase,
        }, 0.15);
      }
    },
    { scope: containerRef }
  );

  const showCurtain = direction.startsWith("curtain-");

  return (
    <div ref={containerRef} className={className}>
      <div
        ref={contentRef}
        style={{
          willChange: "clip-path, transform",
        }}
      >
        {children}
      </div>
      {showCurtain && direction === "curtain-center" && (
        <div className="absolute inset-0 pointer-events-none z-50 flex">
          <div
            ref={curtainLeftRef}
            className="absolute inset-y-0 left-0 w-1/2 bg-[var(--background)]"
            style={{ willChange: "clip-path" }}
          />
          <div
            ref={curtainRightRef}
            className="absolute inset-y-0 right-0 w-1/2 bg-[var(--background)]"
            style={{ willChange: "clip-path" }}
          />
        </div>
      )}
      {showCurtain && direction !== "curtain-center" && (
        <div
          ref={curtainRef}
          className="absolute inset-0 pointer-events-none z-50 bg-[var(--background)]"
          style={{ willChange: "clip-path" }}
        />
      )}
    </div>
  );
}
