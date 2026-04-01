"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn, prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const IG_POSTS = [
  { id: 1, src: "/images/instagram/1.webp", alt: "عباية سوداء بتفاصيل يدوية فاخرة" },
  { id: 2, src: "/images/instagram/2.webp", alt: "تصوير احترافي لعباية دار الحصّ" },
  { id: 3, src: "/images/instagram/3.webp", alt: "عميلة تلبس عباية من تصميم دار الحصّ" },
  { id: 4, src: "/images/instagram/4.webp", alt: "قرب خيطان التطريز الذهبي على القماش" },
  { id: 5, src: "/images/instagram/5.webp", alt: "لقطات من ورشة العمل في دار الحصّ" },
  { id: 6, src: "/images/instagram/6.webp", alt: "عباية بتطريز يدوي دقيق" },
];

export default function SocialProof() {
  const containerRef = useRef<HTMLElement>(null);
  const [activePost, setActivePost] = useState<number | null>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) {
      gsap.set(".ig-post", { opacity: 1, scale: 1 });
      return;
    }

    const items = gsap.utils.toArray(".ig-post") as HTMLElement[];
    gsap.fromTo(items, {
      opacity: 0,
      y: 30,
      scale: 0.95,
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: { each: 0.1, from: "center" },
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });
  }, { scope: containerRef });

  return (
    <section id="social" ref={containerRef} className="section-wrapper py-16! sm:py-20! md:py-28! lg:py-32!">
      <div className="section-container" style={{ maxWidth: "72rem" }}>
        <div className="mb-14 sm:mb-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-8">
          <div className="max-w-md">
            <h2 className="section-title mb-3 sm:mb-4">
              مثل ما شفتونا <br className="hidden sm:block" />على <span className="italic">الإنستقرام</span>
            </h2>
            <p className="section-subtitle max-w-sm">
              تابعي رحلتنا واكتشفي كيف عميلاتنا يلبسون ويكشخون بقطع دار الحصّ.
            </p>
          </div>
          <a
            href="https://www.instagram.com/houseofalhess.ae/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-3 text-[var(--color-gold-400)] hover:text-[var(--color-warm-50)] active:text-[var(--color-warm-50)] transition-colors duration-[var(--transition-duration)] group sm:mt-2 touch-active"
          >
            <InstagramIcon className="h-8 w-8 sm:h-9 sm:w-9 opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="text-xs tracking-widest uppercase font-semibold border-b border-[var(--color-gold-400)]/30 group-hover:border-[var(--color-warm-50)] pb-0.5 whitespace-nowrap">
              @houseofalhess
            </span>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {IG_POSTS.map((post) => (
            <button key={post.id} type="button" aria-label={post.alt} className="ig-post relative aspect-[3/4] group cursor-pointer overflow-hidden bg-[var(--color-warm-900)] border border-subtle touch-active w-full text-start p-0"
              onClick={() => setActivePost(activePost === post.id ? null : post.id)}
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-[var(--transition-duration-slow)] group-hover:scale-[1.04] group-active:scale-[1.02] filter hover:brightness-110 group-active:brightness-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className={cn(
                "absolute inset-0 bg-[var(--color-warm-950)]/50 transition-opacity duration-[var(--transition-duration)] flex items-center justify-center",
                activePost === post.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              )}>
                <InstagramIcon className="text-[var(--color-warm-50)]/80 w-6 h-6 sm:w-7 sm:h-7 scale-75 group-hover:scale-100 transition-transform duration-[var(--transition-duration)]" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
