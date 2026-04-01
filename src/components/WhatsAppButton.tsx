"use client";

import { useRef, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/utils";

export default function WhatsAppButton() {
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    if (prefersReducedMotion()) {
      gsap.set(btn, { opacity: 1, scale: 1 });
      return;
    }

    gsap.fromTo(btn, {
      opacity: 0,
      scale: 0.8,
      y: 20,
    }, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 2,
    });
  }, []);

  return (
    <a
      ref={btnRef}
      href="https://api.whatsapp.com/message/NMY5EZTUEGLCB1?autoload=1&app_absent=0"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 bg-[var(--color-whatsapp)] text-[var(--color-warm-50)] p-4 rounded-full hover:bg-[var(--color-whatsapp-hover)] active:bg-[var(--color-whatsapp-hover)] hover:scale-105 active:scale-95 transition-all duration-[var(--transition-duration)] flex items-center justify-center group opacity-0 touch-active"
      style={{
        bottom: "max(1.5rem, calc(env(safe-area-inset-bottom) + 0.75rem))",
        right: "1.5rem",
      }}
      aria-label="تواصلي ويانا على الواتساب"
    >
      <MessageCircle size={28} className="drop-shadow-sm" />
      <span className="absolute left-full ml-3 sm:ml-4 bg-[var(--color-warm-950)]/90 text-[var(--color-warm-50)] px-3 py-1.5 rounded-sm text-xs whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-active:opacity-100 transition-opacity border border-[var(--color-gold-400)]/30 tracking-widest font-sans">
        احجزي موعد للقياس
      </span>
    </a>
  );
}
