"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn, prefersReducedMotion } from "@/lib/utils";
import SectionReveal from "./ui/SectionReveal";

const STEPS = [
  { id: 1, title: "التصميم المبدئي", desc: "كل تحفة تبدأ بنظرة. مصمماتنا يترجمون ذوقج في رسمة دقيقة تبرز جمال القصة.", align: "left" },
  { id: 2, title: "اختيار القطعة", desc: "نختار لج أجود أنواع الحرير والدانتيل الفاخر، عشان نضمن لج راحة وفخامة باللبس.", align: "right" },
  { id: 3, title: "دقة التفصيل", desc: "خياطينا المهرة يحولون التصميم لواقع، بقصات دقيقة وتطريز يدوي ياخذ ساعات من الإتقان.", align: "left" },
];

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) {
      gsap.set(lineRef.current, { height: "100%" });
      gsap.set(".process-item", { opacity: 1, y: 0 });
      gsap.set(dividerRef.current, { width: 64 });
      return;
    }

    gsap.to(dividerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      width: 64,
      duration: 1,
      ease: "power3.out",
      delay: 0.3,
    });

    gsap.to(lineRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
      height: "100%",
      ease: "none",
    });

    const items = gsap.utils.toArray(".process-item") as HTMLElement[];
    items.forEach((item) => {
      gsap.fromTo(item, {
        opacity: 0,
        y: 60,
      }, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section id="process" ref={containerRef} className="section-wrapper overflow-hidden !py-20 sm:!py-28 md:!py-36 lg:!py-44">
      <div className="section-container" style={{ maxWidth: "64rem" }}>
        <SectionReveal direction="center">
          <div className="section-header">
            <span className="section-label">
              الرحلة
            </span>
            <h2 className="section-title">
              من الخيال إلى <span className="italic">الواقع</span>
            </h2>
            <div ref={dividerRef} className="section-divider" />
          </div>
        </SectionReveal>

        <div className="relative">
          <div className="absolute left-4 sm:left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-[var(--color-warm-700)]/50" />

          <div
            ref={lineRef}
            className="absolute left-4 sm:left-4 md:left-1/2 md:-translate-x-1/2 top-0 w-[1px] bg-gradient-to-b from-[var(--color-gold-400)] via-[var(--color-gold-500)] to-transparent h-0 will-change-[height]"
          />

          <div className="flex flex-col gap-16 sm:gap-20 md:gap-28 lg:gap-36">
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "process-item relative pl-14 sm:pl-16 md:pl-0 flex flex-col md:flex-row items-start md:items-center w-full",
                  step.align === "left" ? "md:justify-start" : "md:justify-end"
                )}
              >
                <div className="absolute left-3.5 sm:left-3.5 md:left-1/2 -ml-[5px] w-3 h-3 bg-[var(--color-warm-950)] border-2 border-[var(--color-gold-400)] rounded-full z-10" />

                <div className={cn(
                  "w-full md:w-5/12",
                  step.align === "left" ? "md:pr-12" : "md:pl-12"
                )}>
                  <span className="text-[var(--color-gold-600)] text-4xl sm:text-5xl md:text-6xl opacity-20 -mt-6 -ml-2 mb-3 md:-mt-8 md:-ml-4 md:mb-0 md:absolute md:-z-10 block">{`0${step.id}`}</span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl text-[var(--color-warm-50)] mb-5 relative"><span className="italic">{step.title}</span></h3>
                  <p className="section-subtitle relative leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
