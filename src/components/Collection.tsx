"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/utils";

const COLLECTION = [
  { id: 1, title: "حجاب الأونيكس", img: "/images/collection1.webp", tag: "الأساسية" },
  { id: 2, title: "حرير منتصف الليل", img: "/images/reveal.webp", tag: "تفصيل خاص" },
  { id: 3, title: "رقي الخيط الذهبي", img: "/images/hero_macro_final.webp", tag: "إصدار حصري" },
];

export default function Collection() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) {
      gsap.set(titleRef.current, { y: 0, opacity: 1 });
      gsap.set(".collection-card", { y: 0, opacity: 1 });
      gsap.set(dividerRef.current, { width: 64 });
      return;
    }

    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });

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

    const cards = gsap.utils.toArray(".collection-card") as HTMLElement[];
    gsap.from(cards, {
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 80%",
      },
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: { each: 0.15, from: "start" },
    });
  }, { scope: containerRef });

  return (
    <section id="collection" ref={containerRef} className="section-wrapper !py-12 sm:!py-16 md:!py-24 lg:!py-28">
      <div className="section-container">
        <div ref={titleRef} className="mb-12 sm:mb-16 md:mb-20 lg:max-w-xl lg:mx-0 lg:mr-auto">
          <span className="section-label">
            إبداع منتقى
          </span>
          <h2 className="section-title !text-start">
            مجموعتنا <span className="italic">المميزة</span>
          </h2>
          <div ref={dividerRef} className="section-divider !mx-0 !ms-0" />
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          <div key={COLLECTION[0].id} role="button" tabIndex={0} aria-label={COLLECTION[0].title} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); } }} className="collection-card group cursor-pointer card-lift md:col-span-2">
            <div className="relative aspect-[4/3] md:aspect-[21/9] overflow-hidden bg-[var(--color-warm-900)] border border-subtle rounded-sm mb-5 sm:mb-6">
              <Image
                src={COLLECTION[0].img}
                alt={COLLECTION[0].title}
                fill
                loading="lazy"
                className="object-cover object-top filter brightness-75 group-hover:brightness-100 group-active:brightness-100 group-hover:scale-[1.03] group-active:scale-[1.02] transition-all duration-[var(--transition-duration-slow)] ease-[var(--ease-out)]"
                sizes="(max-width: 768px) 100vw, 100vw"
              />
              <div className="absolute top-4 left-4 bg-[var(--color-warm-950)]/70 px-3 py-1 text-[10px] uppercase tracking-widest text-[var(--color-gold-400)] border border-[var(--color-gold-400)]/20 group-hover:bg-[var(--color-gold-400)] group-hover:text-[var(--color-warm-950)] group-active:bg-[var(--color-gold-400)] group-active:text-[var(--color-warm-950)] transition-colors duration-[var(--transition-duration)]">
                {COLLECTION[0].tag}
              </div>
            </div>
            <div className="flex justify-between items-end border-b border-subtle pb-4 group-hover:border-[var(--color-gold-600)] group-active:border-[var(--color-gold-600)] transition-colors duration-500">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl text-body-light group-hover:text-[var(--color-warm-50)] group-active:text-[var(--color-warm-50)] transition-colors duration-[var(--transition-duration)]">
                {COLLECTION[0].title}
              </h3>
              <span className="text-[var(--color-gold-400)] text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 group-active:opacity-100 group-focus-within:opacity-100 transition-opacity duration-[var(--transition-duration)] translate-x-4 group-hover:translate-x-0 group-active:translate-x-0 inline-block font-semibold">
                اكتشفي
              </span>
            </div>
          </div>

          {COLLECTION.slice(1).map((item) => (
            <div key={item.id} role="button" tabIndex={0} aria-label={item.title} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); } }} className="collection-card group cursor-pointer card-lift">
              <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-warm-900)] border border-subtle rounded-sm mb-5 sm:mb-6">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  loading="lazy"
                  className="object-cover object-top filter brightness-75 group-hover:brightness-100 group-active:brightness-100 group-hover:scale-[1.03] group-active:scale-[1.02] transition-all duration-[var(--transition-duration-slow)] ease-[var(--ease-out)]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4 bg-[var(--color-warm-950)]/70 px-3 py-1 text-[10px] uppercase tracking-widest text-[var(--color-gold-400)] border border-[var(--color-gold-400)]/20 group-hover:bg-[var(--color-gold-400)] group-hover:text-[var(--color-warm-950)] group-active:bg-[var(--color-gold-400)] group-active:text-[var(--color-warm-950)] transition-colors duration-[var(--transition-duration)]">
                  {item.tag}
                </div>
              </div>
              <div className="flex justify-between items-end border-b border-subtle pb-4 group-hover:border-[var(--color-gold-600)] group-active:border-[var(--color-gold-600)] transition-colors duration-500">
                <h3 className="text-xl sm:text-2xl lg:text-3xl text-body-light group-hover:text-[var(--color-warm-50)] group-active:text-[var(--color-warm-50)] transition-colors duration-[var(--transition-duration)]">
                  {item.title}
                </h3>
                <span className="text-[var(--color-gold-400)] text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 group-active:opacity-100 group-focus-within:opacity-100 transition-opacity duration-[var(--transition-duration)] translate-x-4 group-hover:translate-x-0 group-active:translate-x-0 inline-block font-semibold">
                  اكتشفي
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
