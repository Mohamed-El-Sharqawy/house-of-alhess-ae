"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { cn, prefersReducedMotion } from "@/lib/utils";

interface CollectionItem {
  id: number;
  title: string;
  img: string;
  tag: string;
}

interface CardExpandProps {
  item: CollectionItem;
  children: React.ReactNode;
  className?: string;
}

export function CardExpand({ item, children, className }: CardExpandProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);
  const [expanded, setExpanded] = useState(false);

  const handleExpand = useCallback(() => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setExpanded(true);
  }, []);

  const handleCollapse = useCallback(() => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    const overlay = overlayRef.current;
    const card = cardRef.current;
    if (!overlay || !card || prefersReducedMotion()) {
      setExpanded(false);
      animatingRef.current = false;
      return;
    }

    const cardRect = card.getBoundingClientRect();

    const scaleX = cardRect.width / window.innerWidth;
    const scaleY = cardRect.height / window.innerHeight;
    const translateX = (cardRect.left + cardRect.width / 2) - window.innerWidth / 2;
    const translateY = (cardRect.top + cardRect.height / 2) - window.innerHeight / 2;

    const tl = gsap.timeline({
      onComplete: () => {
        setExpanded(false);
        animatingRef.current = false;
      },
    });

    tl.to(overlay, {
      clipPath: `inset(${(1 - scaleY) / 2 * 100}% ${(1 - scaleX) / 2 * 100}% ${(1 - scaleY) / 2 * 100}% ${(1 - scaleX) / 2 * 100}%)`,
      x: translateX,
      y: translateY,
      borderRadius: "4px",
      duration: 0.9,
      ease: "expo.inOut",
    });

    tl.to(
      overlay.querySelectorAll(".expand-content"),
      { opacity: 0, y: 30, duration: 0.4, ease: "power3.in", stagger: 0.05 },
      "-=0.5"
    );
  }, []);

  useEffect(() => {
    if (!expanded || !overlayRef.current || !cardRef.current) return;

    if (prefersReducedMotion()) {
      animatingRef.current = false;
      return;
    }

    const overlay = overlayRef.current;
    const card = cardRef.current;
    const cardRect = card.getBoundingClientRect();

    const scaleX = cardRect.width / window.innerWidth;
    const scaleY = cardRect.height / window.innerHeight;
    const translateX = (cardRect.left + cardRect.width / 2) - window.innerWidth / 2;
    const translateY = (cardRect.top + cardRect.height / 2) - window.innerHeight / 2;

    gsap.set(overlay, {
      clipPath: `inset(${(1 - scaleY) / 2 * 100}% ${(1 - scaleX) / 2 * 100}% ${(1 - scaleY) / 2 * 100}% ${(1 - scaleX) / 2 * 100}%)`,
      x: translateX,
      y: translateY,
      borderRadius: "4px",
    });

    const tl = gsap.timeline({
      onComplete: () => { animatingRef.current = false; },
    });

    tl.to(overlay, {
      clipPath: "inset(0% 0% 0% 0%)",
      x: 0,
      y: 0,
      borderRadius: "0px",
      duration: 1,
      ease: "expo.inOut",
    });

    tl.fromTo(
      overlay.querySelectorAll(".expand-content"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 },
      "-=0.3"
    );
  }, [expanded]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && expanded) handleCollapse();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [expanded, handleCollapse]);

  useEffect(() => {
    if (expanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [expanded]);

  return (
    <>
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        aria-label={item.title}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleExpand(); } }}
        className={cn("collection-card group cursor-pointer card-lift", className)}
        onClick={handleExpand}
      >
        {children}
      </div>

      {expanded && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[60] bg-[var(--color-warm-950)] flex items-end"
          style={{ willChange: "transform, clip-path" }}
        >
          <div className="absolute inset-0">
            <Image
              src={item.img}
              alt={item.title}
              fill
              className="object-cover object-top"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-warm-950)] via-[var(--color-warm-950)]/60 to-[var(--color-warm-950)]/30" />
          </div>

          <button
            type="button"
            onClick={handleCollapse}
            className="expand-content absolute top-6 right-6 sm:top-8 sm:right-8 z-10 w-12 h-12 flex items-center justify-center border border-[var(--color-gold-400)]/30 text-[var(--color-gold-400)] hover:bg-[var(--color-gold-400)] hover:text-[var(--color-warm-950)] transition-colors duration-300 rounded-sm"
            aria-label="إغلاق"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="2" y1="2" x2="14" y2="14" />
              <line x1="14" y1="2" x2="2" y2="14" />
            </svg>
          </button>

          <div className="expand-content relative z-10 w-full px-6 sm:px-8 md:px-12 lg:px-20 pb-10 sm:pb-16" style={{ paddingBottom: "max(2.5rem, calc(env(safe-area-inset-bottom) + 1.5rem))" }}>
            <div className="max-w-3xl">
              <span className="expand-content text-[var(--color-gold-400)] text-xs uppercase tracking-[0.3em] font-semibold font-sans mb-3 block">
                {item.tag}
              </span>
              <h3 className="expand-content text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[var(--color-warm-50)] font-serif leading-tight mb-6">
                {item.title}
              </h3>
              <p className="expand-content text-[var(--color-warm-200)] font-sans text-sm sm:text-base md:text-lg leading-relaxed mb-10 max-w-xl">
                قطعة فريدة صُنعت بعناية فائقة. كل تفصيلة نُفذت يدوياً بأيدي خياطين مهرة، لتمنحج إحساساً استثنائياً بالأناقة والرقي.
              </p>
              <div className="expand-content flex flex-wrap gap-4">
                <a
                  href="https://api.whatsapp.com/message/NMY5EZTUEGLCB1?autoload=1&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-primary touch-active"
                >
                  احجزي استشارتج
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
