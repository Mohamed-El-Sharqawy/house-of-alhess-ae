"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const macroImgRef = useRef<HTMLImageElement>(null);
  const revealImgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) {
      gsap.set(macroImgRef.current, { opacity: 0 });
      gsap.set(revealImgRef.current, { scale: 1, opacity: 1 });
      gsap.set(textRef.current, { y: 0, opacity: 1 });
      gsap.set([h1Ref.current, paraRef.current, ctaRef.current], { opacity: 1, y: 0 });
      return;
    }

    const isMobile = window.innerWidth < 768;
    const scrollEnd = isMobile ? "+=100%" : "+=150%";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: scrollEnd,
        scrub: 1,
        pin: true,
      },
    });

    tl.to(macroImgRef.current, {
      scale: 1.5,
      opacity: 0,
      ease: "power2.inOut",
      duration: 1,
    })
      .fromTo(revealImgRef.current, {
        scale: 1.1,
        opacity: 0.5,
      }, {
        scale: 1,
        opacity: 1,
        ease: "power2.out",
        duration: 1,
      }, "<")
      .fromTo(textRef.current, {
        y: 50,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power3.out",
      }, "-=0.2")
      .fromTo(h1Ref.current, {
        y: 40,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      })
      .fromTo(paraRef.current, {
        y: 25,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power3.out",
      }, "-=0.15")
      .fromTo(ctaRef.current, {
        y: 20,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power3.out",
      }, "-=0.15");
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full h-screen overflow-hidden bg-[var(--background)] text-[var(--color-warm-50)]">
      <div className="absolute inset-0 w-full h-full">
        <Image
          ref={revealImgRef}
          src="/images/reveal.webp"
          alt="عباية سوداء أنيقة بتفاصيل ذهبية دقيقة"
          fill
          className="object-cover object-top will-change-transform"
          priority
          loading="eager"
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        <Image
          ref={macroImgRef}
          src="/images/hero_macro_final.webp"
          alt="قرب تفاصيل تطريز ذهبي على حرير أسود"
          fill
          className="object-cover will-change-transform"
          priority
          loading="eager"
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end px-5 sm:px-6 bg-gradient-to-t from-[var(--color-warm-950)] via-[var(--color-warm-950)]/30 to-transparent" style={{ paddingBottom: "max(5rem, calc(env(safe-area-inset-bottom) + 4rem))" }}>
        <div ref={textRef} className="text-center max-w-4xl opacity-0 mb-16 sm:mb-20">
          <h1 ref={h1Ref} className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl mb-4 md:mb-6 text-[var(--color-warm-50)] leading-tight opacity-0">
            حيث تلتقي الأناقة <br /> <span className="text-[var(--color-gold-400)] italic">بالرقي</span>
          </h1>
          <p ref={paraRef} className="font-sans text-sm sm:text-base md:text-lg xl:text-xl text-body-light mb-8 md:mb-10 max-w-2xl mx-auto uppercase tracking-widest opacity-0">
            كل قطعة تفصّل عشانج
          </p>
          <a
            ref={ctaRef}
            target="_blank"
            rel="noopener noreferrer"
            href="https://api.whatsapp.com/message/NMY5EZTUEGLCB1?autoload=1&app_absent=0"
            className="cta-primary opacity-0 touch-active"
          >
            احجزي استشارتج الخاصة
          </a>
        </div>
      </div>

      <div className="absolute bottom-3 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center opacity-70" style={{ bottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
        <span className="text-[10px] sm:text-xs uppercase tracking-widest mb-2 font-light text-body-light">اسحبي للأسفل</span>
        <div className="w-[1px] h-8 sm:h-10 md:h-12 bg-gradient-to-b from-[var(--color-warm-50)] to-transparent animate-bob" />
      </div>
    </section>
  );
}
