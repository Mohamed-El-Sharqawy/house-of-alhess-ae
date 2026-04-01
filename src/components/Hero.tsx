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
  const macroImgRef = useRef<HTMLDivElement>(null);
  const revealImgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) {
      gsap.set(macroImgRef.current, { opacity: 0, scale: 1.5 });
      gsap.set(revealImgRef.current, { opacity: 1, scale: 1 });
      gsap.set(textRef.current, { opacity: 1 });
      return;
    }

    const isMobile = window.innerWidth < 768;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: isMobile ? "+=80%" : "+=120%",
        scrub: 1,
        pin: true,
      },
    });

    // Simple zoom transition
    tl.to(macroImgRef.current, {
      scale: 1.5,
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
    }, 0)
      .fromTo(revealImgRef.current, {
        scale: 1.1,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      }, 0.1)
      .to(textRef.current, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      }, 0.5);

    if (scrollIndicatorRef.current) {
      gsap.to(scrollIndicatorRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "15% top",
          scrub: true,
        },
      });
    }
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full h-screen overflow-hidden bg-[var(--background)] text-[var(--color-warm-50)]">
      <div className="absolute inset-0 w-full h-full">
        <Image
          ref={revealImgRef}
          src="/images/reveal.webp"
          alt="عباية سوداء أنيقة بتفاصيل ذهبية دقيقة"
          fill
          className="object-cover object-top"
          priority
          loading="eager"
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 w-full h-full pointer-events-none bg-gradient-to-t from-[var(--color-warm-950)] via-transparent to-[var(--color-warm-950)]" />

      <div ref={macroImgRef} className="absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src="/images/hero_macro_final.webp"
          alt="قرب تفاصيل تطريز ذهبي على حرير أسود"
          fill
          className="object-cover"
          priority
          loading="eager"
          sizes="100vw"
        />
      </div>

      <div ref={textRef} className="absolute inset-0 z-20 flex flex-col items-center justify-end px-5 sm:px-6 bg-gradient-to-t from-[var(--color-warm-950)] via-[var(--color-warm-950)]/30 to-transparent opacity-0" style={{ paddingBottom: "max(5rem, calc(env(safe-area-inset-bottom) + 4rem))" }}>
        <div className="text-center max-w-4xl mb-16 sm:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl mb-4 md:mb-6 text-[var(--color-warm-50)] leading-tight">
            حيث تلتقي الأناقة <br /> <span className="text-[var(--color-gold-400)] italic">بالرقي</span>
          </h1>
          <p className="font-sans text-sm sm:text-base md:text-lg xl:text-xl text-body-light mb-8 md:mb-10 max-w-2xl mx-auto uppercase tracking-widest">
            كل قطعة تفصّل عشانج
          </p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://api.whatsapp.com/message/NMY5EZTUEGLCB1?autoload=1&app_absent=0"
            className="cta-primary touch-active"
          >
            احجزي استشارتج الخاصة
          </a>
        </div>
      </div>

      <div ref={scrollIndicatorRef} className="absolute bottom-3 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center opacity-70" style={{ bottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
        <span className="text-[10px] sm:text-xs uppercase tracking-widest mb-2 font-light text-body-light">اسحبي للأسفل</span>
        <div className="w-[1px] h-8 sm:h-10 md:h-12 bg-gradient-to-b from-[var(--color-warm-50)] to-transparent animate-bob" />
      </div>
    </section>
  );
}
