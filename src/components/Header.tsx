"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import gsap from "gsap";
import { cn, prefersReducedMotion, createFocusTrap } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#bespoke", label: "الخياط الافتراضي" },
  { href: "#collection", label: "المجموعة" },
  { href: "#process", label: "الرحلة" },
  { href: "#social", label: "إنستقرام" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const focusTrapRef = useRef<ReturnType<typeof createFocusTrap> | null>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    if (menuRef.current) gsap.set(menuRef.current, { xPercent: 100 });
    if (overlayRef.current) gsap.set(overlayRef.current, { pointerEvents: "none" });

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    if (!prefersReducedMotion()) {
      gsap.fromTo(header, {
        yPercent: -100,
        opacity: 0,
      }, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
        clearProps: "transform",
      });
    } else {
      gsap.set(header, { opacity: 1 });
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header || menuOpen) return;

    if (prefersReducedMotion()) {
      gsap.set(header, { yPercent: isHidden ? -100 : 0 });
    } else {
      gsap.to(header, {
        yPercent: isHidden ? -100 : 0,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, [isHidden, menuOpen]);

  useEffect(() => {
    const menu = menuRef.current;
    const overlay = overlayRef.current;
    if (!menu || !overlay) return;

    const reducedMotion = prefersReducedMotion();

    if (menuOpen) {
      document.body.style.overflow = "hidden";

      focusTrapRef.current = createFocusTrap(menu);
      focusTrapRef.current.activate();

      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.set(overlay, { pointerEvents: "auto" })
        .to(overlay, {
          opacity: 1,
          duration: reducedMotion ? 0 : 0.3,
          ease: "power2.out",
        })
        .fromTo(menu, {
          xPercent: 100,
          opacity: 0,
        }, {
          xPercent: 0,
          opacity: 1,
          duration: reducedMotion ? 0 : 0.5,
          ease: "power3.out",
        }, "<0.05")
        .fromTo(".mobile-nav-link", {
          y: 20,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          duration: reducedMotion ? 0 : 0.4,
          ease: "power3.out",
          stagger: 0.08,
        }, "-=0.2")
        .fromTo(".mobile-nav-cta", {
          y: 20,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          duration: reducedMotion ? 0 : 0.4,
          ease: "power3.out",
        }, "-=0.15");
    } else {
      document.body.style.overflow = "";

      if (focusTrapRef.current) {
        focusTrapRef.current.deactivate();
        focusTrapRef.current = null;
      }

      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }
      gsap.to(menu, {
        xPercent: 100,
        opacity: 0,
        duration: reducedMotion ? 0 : 0.3,
        ease: "power2.in",
      });
      gsap.to(overlay, {
        opacity: 0,
        duration: reducedMotion ? 0 : 0.25,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(overlay, { pointerEvents: "none" });
        },
      });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        closeMenu();
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen, closeMenu]);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-colors duration-500 ease-[var(--ease-out)]",
          scrolled ? "bg-[var(--color-warm-950)]/90 border-b border-[var(--color-warm-700)]/20" : "bg-[var(--color-warm-950)]/70"
        )}
        style={{ paddingTop: "env(safe-area-inset-top, 0px)", willChange: "transform" }}
      >
        <div className={cn(
          "container mx-auto px-5 sm:px-6 flex items-center justify-between",
          scrolled ? "py-4 sm:py-5" : "py-6 sm:py-8"
        )}>

          <div className="flex-1 flex justify-start items-center">
            <button
              className="group flex items-center gap-3 text-[var(--color-warm-50)] focus:outline-none min-h-[44px] min-w-[44px] px-2 -ms-2"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "إغلاق القائمة الرئيسية" : "فتح القائمة الرئيسية"}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div className="flex flex-col gap-[5px] w-6 transition-transform duration-150 ease-[var(--ease-out)] group-active:scale-90">
                <span className={cn(
                  "w-full h-px bg-[var(--color-warm-50)] group-hover:bg-[var(--color-gold-400)] group-focus-visible:bg-[var(--color-gold-400)] transition-all duration-[var(--transition-duration)] transform origin-left",
                  menuOpen && "rotate-45 translate-y-[3px]"
                )} />
                <span className={cn(
                  "w-4/5 h-px bg-[var(--color-warm-50)] group-hover:bg-[var(--color-gold-400)] group-focus-visible:bg-[var(--color-gold-400)] group-hover:w-full transition-all duration-[var(--transition-duration)] transform origin-left",
                  menuOpen && "-rotate-45 -translate-y-[3px] w-full"
                )} />
              </div>
              <span className="hidden md:block uppercase tracking-[0.2em] text-[10px] lg:text-xs text-body group-hover:text-[var(--color-warm-50)] group-focus-visible:text-[var(--color-warm-50)] transition-colors duration-[var(--transition-duration)] font-medium mt-0.5">
                {menuOpen ? "إغلاق" : "القائمة"}
              </span>
            </button>
          </div>

          <div className="flex-1 flex justify-center items-center">
            <a href="#" className="text-2xl sm:text-[1.65rem] md:text-3xl lg:text-4xl text-[var(--color-warm-50)] hover:text-[var(--color-gold-400)] focus-visible:text-[var(--color-gold-400)] transition-colors duration-500 tracking-[0.15em] flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-400)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-warm-950)] rounded px-2">
              <span className="uppercase">دار الحصّ</span>
            </a>
          </div>

          <div className="flex-1 flex justify-end items-center">
            <a
              href="#consultation"
              className="md:block text-[10px] lg:text-xs uppercase tracking-[0.2em] text-[var(--color-warm-50)] hover:text-[var(--color-gold-400)] focus-visible:text-[var(--color-gold-400)] transition-colors duration-[var(--transition-duration)] font-medium relative group min-h-[44px] flex items-center px-2"
            >
              <span>تفصيل خاص</span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--color-gold-400)] transition-all duration-500 group-hover:w-full group-focus-visible:w-full"></span>
            </a>

            <a href="#consultation" className="md:hidden text-[var(--color-warm-50)] hover:text-[var(--color-gold-400)] focus-visible:text-[var(--color-gold-400)] transition-colors duration-[var(--transition-duration)] min-h-[44px] min-w-[44px] flex items-center justify-center touch-active">
              <span className="text-[10px] uppercase tracking-widest border border-[var(--color-warm-50)]/20 px-4 py-2.5 rounded-sm">احجزي</span>
            </a>
          </div>

        </div>
      </header>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-[60] bg-[var(--color-warm-950)]/70 opacity-0 pointer-events-none"
        style={{ backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <nav
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="القائمة الرئيسية"
        className="fixed top-0 right-0 bottom-0 z-[70] w-[85vw] max-w-[320px] bg-[var(--color-warm-950)] flex flex-col opacity-0"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="flex-1 flex flex-col justify-center px-8">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="mobile-nav-link block text-2xl sm:text-3xl font-serif text-[var(--color-warm-50)] hover:text-[var(--color-gold-400)] active:text-[var(--color-gold-400)] transition-colors duration-[var(--transition-duration)] py-3 border-b border-[var(--color-warm-700)]/20 touch-active"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-10 mobile-nav-cta">
            <a
              href="https://api.whatsapp.com/message/NMY5EZTUEGLCB1?autoload=1&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary w-full text-center block touch-active"
              onClick={closeMenu}
            >
              احجزي استشارتج الخاصة
            </a>
          </div>
        </div>

        <div className="px-8 pb-8 mobile-nav-cta" style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}>
          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/houseofalhess.ae/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-body hover:text-[var(--color-gold-400)] active:text-[var(--color-gold-400)] transition-colors duration-[var(--transition-duration)]"
            >
              إنستقرام
            </a>
            <a
              href="#"
              className="text-sm text-body hover:text-[var(--color-gold-400)] active:text-[var(--color-gold-400)] transition-colors duration-[var(--transition-duration)]"
            >
              الشروط والأحكام
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
