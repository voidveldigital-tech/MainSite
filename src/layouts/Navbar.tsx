"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Menu, X, ArrowUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

const NAV = [
  { label: "Our Works", href: "/works" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "#contact" },
];

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const isHashLink = (href: string) => href.startsWith("#");

  // scroll behaviors
  const [showHeader, setShowHeader] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const [activeHref, setActiveHref] = useState<string>("#");

  // refs
  const headerRef = useRef<HTMLElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const underlineRef = useRef<HTMLDivElement | null>(null);
  const mobileSheetRef = useRef<HTMLDivElement | null>(null);

  const sectionIds = useMemo(
    () => NAV.map((n) => n.href.replace("#", "")).filter(Boolean),
    [],
  );

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Visible overlay helper
  useEffect(() => {
    if (open) {
      setVisible(true);
    } else {
      const t = setTimeout(() => setVisible(false), 220);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Lock scroll when menu open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Hide on scroll down / show on scroll up + track progress
  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;

      setScrolled(y > 18);

      // show when scrolling up, hide when scrolling down (but keep near top)
      if (y < 80) {
        setShowHeader(true);
      } else {
        const goingDown = y > lastY;
        setShowHeader(!goingDown);
      }
      lastY = y;

      // progress
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight || 1;
      setProgress(clamp01(y / max));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // GSAP: header entrance + scroll-reactive transforms
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    if (!headerRef.current || !barRef.current) return;

    const ctx = gsap.context(() => {
      // initial pop-in
      gsap.fromTo(
        headerRef.current,
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      );

      // scroll reactive "glass density"
      ScrollTrigger.create({
        start: 0,
        end: 260,
        onUpdate: (self) => {
          const t = self.progress; // 0..1
          gsap.to(barRef.current!, {
            duration: 0.12,
            scale: 1 - t * 0.04,
            borderRadius: 18 + t * 10,
            boxShadow: `0 20px 60px rgba(15,23,42,${0.18 + t * 0.16})`,
            ease: "none",
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Highlight the current route if it matches a NAV route item
    const routeItem = NAV.find(
      (n) => !n.href.startsWith("#") && n.href === pathname,
    );
    if (routeItem) {
      setActiveHref(routeItem.href);
      return;
    }

    // If we're on home, let IntersectionObserver control hash highlighting.
    if (pathname === "/") {
      setActiveHref("#"); // no default pill, until a section becomes active
      return;
    }

    // On other pages that don't match nav, clear
    setActiveHref("#");
  }, [pathname]);

  // Active section highlight via IntersectionObserver
  useEffect(() => {
    if (pathname !== "/") return;

    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          )[0];

        if (visible?.target?.id) setActiveHref(`#${visible.target.id}`);
      },
      { root: null, threshold: [0.12, 0.2, 0.35, 0.55] },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sectionIds, pathname]);

  // Move underline pill to active item (desktop)
  useEffect(() => {
    if (!navRef.current || !underlineRef.current) return;
    const active = navRef.current.querySelector<HTMLAnchorElement>(
      `a[href="${activeHref}"]`,
    );
    if (!active) return;

    const navRect = navRef.current.getBoundingClientRect();
    const aRect = active.getBoundingClientRect();

    const x = aRect.left - navRect.left;
    const w = aRect.width;

    gsap.to(underlineRef.current, {
      x,
      width: w,
      duration: 0.45,
      ease: "power3.out",
    });
  }, [activeHref]);

  // Magnetic hover (tiny)
  const attachMagnet = (el: HTMLElement | null, strength = 10) => {
    if (!el) return () => {};
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      gsap.to(el, {
        x: dx / strength,
        y: dy / strength,
        duration: 0.25,
        ease: "power3.out",
      });
    };
    const onLeave = () =>
      gsap.to(el, { x: 0, y: 0, duration: 0.35, ease: "power3.out" });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  };

  // Mobile menu GSAP
  useEffect(() => {
    if (!mobileSheetRef.current) return;
    const sheet = mobileSheetRef.current;

    if (open) {
      gsap.fromTo(
        sheet,
        { y: -10, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.28, ease: "power3.out" },
      );
      gsap.fromTo(
        sheet.querySelectorAll('[data-mitem="1"]'),
        { y: 8, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.22,
          stagger: 0.05,
          ease: "power3.out",
          delay: 0.05,
        },
      );
    }
  }, [open]);

  const scrollToHash = (href: string) => {
    if (!href.startsWith("#")) return; // <-- important
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 92;
    gsap.to(window, { duration: 0.9, scrollTo: y, ease: "power3.inOut" });
  };

  const scrollTop = () => {
    gsap.to(window, { duration: 0.95, scrollTo: 0, ease: "power3.inOut" });
  };

  // Progress ring values for back-to-top
  const ring = 44;
  const stroke = 4;
  const radius = (ring - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const dash = circ * (1 - progress);

  return (
    <>
      {/* NAVBAR */}
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-4 z-[9999] pointer-events-none transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-24"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 pointer-events-auto">
          <div
            ref={barRef}
            className={`relative flex h-16 items-center justify-between rounded-2xl border px-4 backdrop-blur-xl transition-colors duration-300
            ${
              scrolled
                ? "border-white/50 bg-white/55"
                : "border-white/40 bg-white/35"
            }
            shadow-[0_20px_60px_rgba(15,23,42,0.18)]`}
          >
            {/* Brand */}
            <Link href="/" className="relative">
              <Image
                src="/assets/logo.webp"
                alt="Logo"
                className="p-5"
                width={150}
                height={40}
              />
            </Link>

            {/* Desktop nav */}
            <nav
              ref={navRef}
              className="relative hidden items-center gap-8 text-sm text-[#0b1028]/70 md:flex"
            >
              {/* sliding glow pill */}
              <div
                ref={underlineRef}
                className="pointer-events-none absolute left-0 top-1/2 h-9 -translate-y-[0.01rem] rounded-full bg-white/60 ring-1 ring-white/50 shadow-[0_12px_30px_rgba(18,20,51,0.10)]"
                style={{ width: 0, transform: "translate3d(0, -50%, 0)" }}
              />
              {NAV.map((item) => {
                const hash = item.href.startsWith("#");

                if (hash) {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToHash(item.href);
                      }}
                      className={`relative z-10 rounded-full px-3 py-2 transition-colors ${
                        activeHref === item.href
                          ? "text-[#0b1028]"
                          : "hover:text-[#0b1028]"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative z-10 rounded-full px-3 py-2 transition-colors hover:text-[#0b1028]`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/apply"
                className="hidden rounded-full bg-[#121433] px-5 py-2 text-sm font-medium text-white shadow-[0_12px_30px_rgba(18,20,51,0.25)] hover:bg-[#0e102a] transition-colors md:inline-flex"
                ref={(el) => {
                  if (!el) return;
                  const cleanup = attachMagnet(
                    el as unknown as HTMLElement,
                    18,
                  );
                  // @ts-ignore
                  el.__cleanup = cleanup;
                }}
              >
                Apply Now
              </Link>

              {/* Mobile toggle */}
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center rounded-xl border border-white/45 bg-white/30 p-2 text-[#0b1028] shadow-sm backdrop-blur-md hover:bg-white/40 transition-colors md:hidden"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Back to top orb */}
      <button
        onClick={scrollTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-[9999] grid place-items-center rounded-full border border-white/45 bg-white/55 shadow-[0_18px_50px_rgba(15,23,42,0.20)] backdrop-blur-xl transition-all duration-300
        ${progress > 0.06 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}
      >
        <div className="relative grid h-12 w-12 place-items-center">
          <svg width={ring} height={ring} className="absolute">
            <circle
              cx={ring / 2}
              cy={ring / 2}
              r={radius}
              fill="none"
              stroke="rgba(15,23,42,0.10)"
              strokeWidth={stroke}
            />
            <circle
              cx={ring / 2}
              cy={ring / 2}
              r={radius}
              fill="none"
              stroke="rgba(15,23,42,0.55)"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={dash}
              transform={`rotate(-90 ${ring / 2} ${ring / 2})`}
            />
          </svg>
          <ArrowUp size={18} className="text-[#0b1028]" />
        </div>
      </button>

      {/* MOBILE OVERLAY */}
      {visible && (
        <div className="fixed inset-0 z-[9998] md:hidden">
          {/* BACKDROP */}
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className={`absolute inset-0 bg-black/20 backdrop-blur-[1px] transition-opacity duration-200 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* MENU SHEET */}
          <div
            ref={mobileSheetRef}
            className={`absolute left-1/2 top-[92px] w-[calc(100%-2rem)] -translate-x-1/2 rounded-2xl border border-white/45 bg-white/65 p-4 shadow-[0_30px_80px_rgba(15,23,42,0.30)] backdrop-blur-xl transition-all duration-200 ease-out
            ${open ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-[0.98]"}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[#0b1028]">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-xl border border-black/10 bg-white/60 text-[#0b1028] hover:bg-white transition-colors"
                aria-label="Close menu button"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-3 grid gap-2">
              {NAV.map((item) => {
                const hash = item.href.startsWith("#");

                if (hash) {
                  return (
                    <a
                      data-mitem="1"
                      key={item.href}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(false);
                        scrollToHash(item.href);
                      }}
                      className="rounded-xl px-3 py-2 text-sm text-[#0b1028]/80 hover:bg-white/70 transition-colors"
                    >
                      {item.label}
                    </a>
                  );
                }

                return (
                  <Link
                    data-mitem="1"
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-2 text-sm text-[#0b1028]/80 hover:bg-white/70 transition-colors"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <Link
                href="/apply"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-xl bg-[#121433] px-4 py-2 text-center text-sm font-medium text-white hover:bg-[#0e102a] transition-colors"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
