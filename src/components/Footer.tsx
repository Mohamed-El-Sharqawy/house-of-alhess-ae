"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/utils";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) {
      gsap.set(logoRef.current, { scale: 1, opacity: 1 });
      gsap.set(contentRef.current, { y: 0, opacity: 1 });
      return;
    }

    gsap.fromTo(logoRef.current, {
      scale: 0.95,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom",
        end: "center center",
        scrub: true,
      }
    });

    gsap.fromTo(contentRef.current, {
      y: 30,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 90%",
      }
    });
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="section-wrapper !pt-20 sm:!pt-24 md:!pt-32 !pb-10 sm:!pb-12 overflow-hidden">
      <div className="section-container relative z-10 flex flex-col items-center">

        <div ref={logoRef} className="mb-12 sm:mb-16 md:mb-20 text-center select-none cursor-default" aria-hidden="true">
          <span className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-[var(--color-warm-50)]/[0.06] hover:text-[var(--color-warm-50)]/[0.12] transition-colors duration-1000 uppercase tracking-widest whitespace-nowrap block">
            دار
            <br />
            <span className="text-[var(--color-gold-400)]/20 italic">الحصّ</span>
          </span>
        </div>

        <div ref={contentRef} className="w-full flex flex-col md:flex-row justify-between items-center md:items-start gap-8 sm:gap-10 border-t border-[var(--color-warm-700)]/30 pt-8 sm:pt-10">
          <div className="text-center md:text-right max-w-sm">
            <span className="section-label font-sans mb-3">كوتور دبي</span>
            <p className="font-sans text-[var(--color-warm-300)] text-sm leading-relaxed">
              نرتقي بمفهوم العباية من خلال دقة التفصيل، خيارات أقمشة مالها مثيل، واهتمام بأدق التفاصيل. مصممة للمرأة العصرية الأنيقة.
            </p>
          </div>

          <div className="flex flex-col text-center md:text-left font-sans text-sm gap-1">
            <a href="https://api.whatsapp.com/message/NMY5EZTUEGLCB1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer" className="text-body hover:text-[var(--color-gold-400)] active:text-[var(--color-gold-400)] transition-colors duration-[var(--transition-duration)] min-h-[44px] flex items-center justify-center md:justify-start touch-active">احجزي استشارتج</a>
            <a href="https://www.instagram.com/houseofalhess.ae/" target="_blank" rel="noopener noreferrer" className="text-body hover:text-[var(--color-gold-400)] active:text-[var(--color-gold-400)] transition-colors duration-[var(--transition-duration)] min-h-[44px] flex items-center justify-center md:justify-start touch-active">إنستقرام</a>
            <a href="#" className="text-body hover:text-[var(--color-gold-400)] active:text-[var(--color-gold-400)] transition-colors duration-[var(--transition-duration)] min-h-[44px] flex items-center justify-center md:justify-start touch-active">الشروط والأحكام</a>
            <a href="#" className="text-body hover:text-[var(--color-gold-400)] active:text-[var(--color-gold-400)] transition-colors duration-[var(--transition-duration)] min-h-[44px] flex items-center justify-center md:justify-start touch-active">سياسة الخصوصية</a>
          </div>
        </div>

        <div className="w-full mt-12 sm:mt-16 md:mt-20 flex flex-col items-center justify-center text-center gap-2" style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}>
          <p className="text-[var(--color-warm-400)] text-xs font-sans tracking-widest uppercase">
            &copy; {new Date().getFullYear()} دار الحصّ. جميع الحقوق محفوظة.
          </p>
          <p className="text-[var(--color-warm-400)] text-xs uppercase tracking-widest border border-[var(--color-warm-700)] px-3 py-1 rounded-sm mt-2">
            مسجلة لدى دائرة الاقتصاد والسياحة (DED)
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[var(--color-gold-400)]/[0.02] blur-[120px] pointer-events-none rounded-t-[100%]" />
    </footer>
  );
}
