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
  const macroWrapperRef = useRef<HTMLDivElement>(null);
  const revealWrapperRef = useRef<HTMLDivElement>(null);
  const macroImgRef = useRef<HTMLImageElement>(null);
  const revealImgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const displacementFilterRef = useRef<SVGFEDisplacementMapElement>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) {
      gsap.set(macroWrapperRef.current, { opacity: 0 });
      gsap.set(revealImgRef.current, { scale: 1, opacity: 1 });
      gsap.set(textRef.current, { y: 0, opacity: 1 });
      gsap.set([h1Ref.current, paraRef.current, ctaRef.current], { opacity: 1, y: 0 });
      return;
    }

    const isMobile = window.innerWidth < 768;
    const scrollEnd = isMobile ? "+=180%" : "+=250%";

    if (turbulenceRef.current && displacementFilterRef.current) {
      gsap.to(turbulenceRef.current, {
        attr: { baseFrequency: 0.06 },
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "40% top",
          scrub: 0.8,
        },
      });

      gsap.to(displacementFilterRef.current, {
        attr: { scale: 0 },
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "45% top",
          scrub: 0.8,
        },
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: scrollEnd,
        scrub: 1,
        pin: true,
      },
    });

    // Image transitions: 0 -> 0.55 (55% of scroll)
    tl.to(macroWrapperRef.current, {
      y: -200,
      ease: "none",
      duration: 0.55,
    }, 0)
      .to(revealWrapperRef.current, {
        y: -60,
        ease: "none",
        duration: 0.55,
      }, 0)
      .to(macroImgRef.current, {
        scale: 2,
        opacity: 0,
        ease: "power2.inOut",
        duration: 0.55,
      }, 0)
      .fromTo(revealImgRef.current, {
        scale: 1.2,
        opacity: 0.3,
      }, {
        scale: 1,
        opacity: 1,
        ease: "power2.out",
        duration: 0.55,
      }, 0.05)

    // Text reveal: 0.55 -> 0.75 (20% of scroll)
      .fromTo(textRef.current, {
        y: 80,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.12,
        ease: "power3.out",
      }, 0.55)
      .fromTo(h1Ref.current, {
        y: 60,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.1,
        ease: "power3.out",
      }, 0.60)
      .fromTo(paraRef.current, {
        y: 35,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.08,
        ease: "power3.out",
      }, 0.67)
      .fromTo(ctaRef.current, {
        y: 30,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.08,
        ease: "power3.out",
      }, 0.70)
    
    // Hold: 0.75 -> 1.0 (25% of scroll - nothing animates, just extra scroll time)
    // No tweens needed, timeline just extends to duration 1.0

    if (scrollIndicatorRef.current) {
      gsap.to(scrollIndicatorRef.current, {
        opacity: 0,
        y: -30,
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "15% top",
          scrub: true,
        },
      });
    }

    const bespokeSection = document.getElementById("bespoke");
    if (bespokeSection) {
      gsap.to(revealImgRef.current, {
        scale: 1.15,
        y: -50,
        scrollTrigger: {
          trigger: bespokeSection,
          start: "top bottom",
          end: "top 20%",
          scrub: 1,
        },
      });

      gsap.to(vignetteRef.current, {
        opacity: 0.8,
        scrollTrigger: {
          trigger: bespokeSection,
          start: "top bottom",
          end: "top 30%",
          scrub: true,
        },
      });
    }
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full h-screen overflow-hidden bg-[var(--background)] text-[var(--color-warm-50)]">
      <svg className="absolute w-0 h-0 opacity-0" aria-hidden="true">
        <defs>
          <filter id="silk-displacement" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.025"
              numOctaves="4"
              result="noise"
              seed="7"
            />
            <feDisplacementMap
              ref={displacementFilterRef}
              in="SourceGraphic"
              in2="noise"
              scale="80"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div ref={revealWrapperRef} className="absolute inset-0 w-full h-full will-change-transform">
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

      <div ref={vignetteRef} className="absolute inset-0 w-full h-full z-[5] pointer-events-none opacity-0 will-change-opacity" style={{ background: "linear-gradient(to bottom, var(--color-warm-950) 0%, transparent 40%, transparent 60%, var(--color-warm-950) 100%)" }} />

      <div 
        ref={macroWrapperRef}
        className="absolute inset-0 w-full h-full z-10 pointer-events-none will-change-transform"
        style={{ filter: "url(#silk-displacement)" }}
      >
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

      <div ref={scrollIndicatorRef} className="absolute bottom-3 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center opacity-70" style={{ bottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
        <span className="text-[10px] sm:text-xs uppercase tracking-widest mb-2 font-light text-body-light">اسحبي للأسفل</span>
        <div className="w-[1px] h-8 sm:h-10 md:h-12 bg-gradient-to-b from-[var(--color-warm-50)] to-transparent animate-bob" />
      </div>
    </section>
  );
}
