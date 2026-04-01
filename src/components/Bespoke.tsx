"use client";

import { useRef, useState, useSyncExternalStore, useCallback } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn, prefersReducedMotion } from "@/lib/utils";

const HOTSPOTS = [
  { id: 1, top: "25%", left: "35%", title: "قصة الأكتاف", desc: "قياسات دقيقة تضمن لج انسيابية وأناقة بدون أي وزن زايد.", ariaLabel: "تفاصيل قصة الأكتاف" },
  { id: 2, top: "45%", left: "60%", title: "تحديد الخصر", desc: "تضييق مخصص يبرز جمال القصة، وتناسب كل مناسباتج.", ariaLabel: "تفاصيل تحديد الخصر" },
  { id: 3, top: "80%", left: "45%", title: "طول العباية", desc: "طول متناسق ومضبوط بالملي، على حسب ارتفاع الكعب اللي تلبسينه.", ariaLabel: "تفاصيل طول العباية" },
];

function useIsTouchDevice() {
  const subscribe = useCallback((callback: () => void) => {
    const mql = window.matchMedia("(hover: none)");
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
  }, []);

  const getSnapshot = useCallback(() => {
    return window.matchMedia("(hover: none)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;
  }, []);

  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default function Bespoke() {
  const [activeSpot, setActiveSpot] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();

  useGSAP(() => {
    if (prefersReducedMotion()) {
      gsap.set(textRef.current, { x: 0, opacity: 1 });
      gsap.set(imgRef.current, { x: 0, opacity: 1 });
      return;
    }

    gsap.from(textRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
      x: -50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });

    gsap.from(imgRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
      x: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.15,
    });

    const hotspots = gsap.utils.toArray<HTMLElement>(".hotspot-dot");
    gsap.fromTo(hotspots, {
      scrollTrigger: {
        trigger: imgRef.current,
        start: "top 75%",
      },
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.7)",
      stagger: 0.12,
      delay: 0.4,
    }, {
      scrollTrigger: {
        trigger: imgRef.current,
        start: "top 75%",
      },
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "back.out(1.7)",
      stagger: 0.12,
      delay: 0.4,
    });
  }, { scope: sectionRef });

  const handleSpotToggle = (id: number) => {
    setActiveSpot(activeSpot === id ? null : id);
  };

  return (
    <section id="bespoke" ref={sectionRef} className="section-wrapper !py-20 sm:!py-24 md:!py-32 lg:!py-40">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center">

          <div ref={textRef} className="max-w-xl">
            <span className="section-label">
              الخياط الافتراضي
            </span>
            <h2 className="section-title">
              مُصممة حصرياً <span className="italic ms-4">لج</span>
            </h2>
            <p className="section-subtitle mb-10">
              الرفاهية الحقيقية تبدأ من القياس المثالي. دقة تفصيلنا تضمن لج قصة تناسبج بالملي. جربي تجربة تفصيل تحترم أصالة الماضي وتواكب رقي الحاضر.
            </p>
            <div className="flex gap-4">
              <span className="w-16 h-[1px] bg-[var(--color-gold-600)] mt-3 shrink-0"></span>

              <p className="text-sm text-body-light italic">
                {isTouch ? "اضغطي على النقاط لتكتشفي دقة التفصيل عندنا." : "مرري على النقاط أو اضغطي عليها لتكتشفي دقة التفصيل عندنا."}
              </p>
            </div>
          </div>

          <div ref={imgRef} className="relative aspect-[3/4] w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto lg:ml-auto">
            <div className="absolute inset-0 rounded-t-full overflow-hidden border border-gold-subtle" style={{ boxShadow: '-12px 12px 30px var(--shadow-color-dark-60)' }}>
              <Image
                src="/images/reveal.webp"
                alt="عباية سوداء أنيقة بتفاصيل خياطة دقيقة"
                fill
                loading="lazy"
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-[var(--color-warm-950)]/20" />
            </div>

            {HOTSPOTS.map((spot) => (
              <div
                key={spot.id}
                className="absolute z-20"
                style={{ top: spot.top, left: spot.left }}
              >
                <button
                  type="button"
                  className="hotspot-dot w-7 h-7 sm:w-5 sm:h-5 rounded-full bg-[var(--color-gold-400)] animate-gold-pulse cursor-pointer hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-[var(--color-warm-50)] focus:ring-offset-2 focus:ring-offset-[var(--color-warm-950)] transition-transform relative touch-active"
                  aria-label={spot.ariaLabel}
                  aria-expanded={activeSpot === spot.id}
                  aria-describedby={`tooltip-${spot.id}`}
                  onClick={() => handleSpotToggle(spot.id)}
                  onMouseEnter={() => !isTouch && setActiveSpot(spot.id)}
                  onMouseLeave={() => !isTouch && setActiveSpot(null)}
                  onFocus={() => setActiveSpot(spot.id)}
                  onBlur={() => setActiveSpot(null)}
                >
                  <div className="absolute inset-[-4px] rounded-full border border-[var(--color-gold-400)]/30 animate-ring-pulse" />
                </button>

                <div
                  id={`tooltip-${spot.id}`}
                  role="tooltip"
                  className={cn(
                    "absolute z-30 w-52 sm:w-56 bg-[var(--color-warm-950)]/95 backdrop-blur-sm border border-[var(--color-gold-400)]/50 p-4 rounded-sm text-center",
                    "left-1/2 -translate-x-1/2 bottom-full mb-4",
                    "transition-all duration-300 ease-[var(--ease-out)]",
                    activeSpot === spot.id ? "opacity-100 translate-y-0 visible pointer-events-auto" : "opacity-0 translate-y-2 invisible pointer-events-none"
                  )}
                >
                  <h5 className="text-[var(--color-gold-400)] text-sm sm:text-base mb-1.5">{spot.title}</h5>
                  <p className="text-body-light text-xs sm:text-sm font-sans leading-relaxed">{spot.desc}</p>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[var(--color-gold-400)]/50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
