"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioSection() {
  type Work = {
    title: string;
    subtitle: string;
    image: string;
    href?: string;
    topBg?: string;
    featured?: boolean;
  };

  const WORKS: Work[] = [
    {
      title: "Betely Agency",
      subtitle: "UI/UX Website Design",
      image: "/web designs/design1.webp",
      topBg: "bg-[#F3F0FF]",
      featured: true,
    },
    {
      title: "Growthy",
      subtitle: "UI/UX  Mobile App Design",
      image: "/web designs/design2.webp",
      topBg: "bg-[#F3F0FF]",
    },
    {
      title: "Alpnace",
      subtitle: "Branding Design",
      image: "/web designs/design3.webp",
      topBg: "bg-[#F3F0FF]",
    },
  ];

  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      // ---------- Header intro ----------
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: "[data-portfolio-header]",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from("[data-h-label]", { y: 12, opacity: 0, duration: 0.5 })
        .from("[data-h-awesome]", { y: 18, opacity: 0, duration: 0.6 }, "-=0.2")
        .from(
          "[data-h-icon]",
          { x: -14, opacity: 0, duration: 0.55 },
          "-=0.25"
        )
        .from("[data-h-works]", { y: 18, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(
          "[data-h-desc]",
          { y: 14, opacity: 0, duration: 0.55 },
          "-=0.35"
        )
        .from(
          "[data-h-cta]",
          { y: 10, opacity: 0, duration: 0.45, stagger: 0.08 },
          "-=0.25"
        );

      // ---------- Cards reveal (stagger) ----------
      gsap.set("[data-work-card]", { opacity: 1 }); // prevent flicker

      gsap.from("[data-work-card]", {
        y: 30,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: "[data-portfolio-grid]",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate TOP and BOTTOM parts separately per card (cleaner)
      gsap.from("[data-work-top]", {
        y: 18,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: "[data-portfolio-grid]",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from("[data-work-bottom]", {
        y: 18,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.05,
        scrollTrigger: {
          trigger: "[data-portfolio-grid]",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      {/* HEADER */}
      <section className="px-6 py-12 max-w-[90rem] mx-auto" data-portfolio-header>
        <header className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Left */}
            <div>
              <p
                data-h-label
                className="text-[14px] md:text-[17px] font-satoshi font-semibold uppercase text-slate-900/80"
              >
                See Our Portfolio Reels
              </p>

              <div className="mt-6">
                <h2
                  data-h-awesome
                  className="text-[56px] md:text-[72px] leading-[0.95] tracking-[-0.03em] font-satoshi text-slate-950"
                >
                  Awesome
                </h2>

                <div className="mt-2 flex items-center gap-5">
                  <img
                    data-h-icon
                    src="/assets/icon.webp"
                    alt="icon image"
                    className="h-20 w-36"
                  />
                  <h2
                    data-h-works
                    className="text-[56px] md:text-[72px] leading-[0.95] tracking-[-0.03em] font-satoshi text-slate-950"
                  >
                    works
                  </h2>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="md:pt-1 flex flex-col items-start md:items-end">
              <p
                data-h-desc
                className="max-w-[420px] text-[15px] leading-[1.7] text-slate-600 text-left md:text-right"
              >
                We crafted detailed botanical illustrations to highlight the
                natural ingredients used in the products. Each design was
                carefully integrated into the packaging layout,
              </p>

              <div className="mt-10 flex items-center gap-3">
                <button
                  data-h-cta
                  type="button"
                  className="h-[44px] cursor-pointer px-7 rounded-full border border-slate-200 text-[14px] font-medium text-slate-900
                         hover:bg-slate-50 active:bg-slate-100 transition"
                >
                  Learn More
                </button>

                <button
                  data-h-cta
                  type="button"
                  aria-label="Open"
                  className="h-[44px] w-[44px] rounded-full border border-slate-200 text-slate-900
                         flex items-center justify-center hover:bg-slate-50 active:bg-slate-100 transition"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M7 17L17 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10 7H17V14"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>
      </section>

      {/* GRID */}
      <section className="w-full max-w-[90rem] mx-auto pb-20" data-portfolio-grid>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {WORKS.map((w) => (
            <a
              key={w.title}
              href={w.href ?? "#"}
              className="group block"
              data-work-card
            >
              {/* TOP TILE (separate) */}
              <div
                data-work-top
                className={[
                  "rounded-[28px] p-6",
                  "transition-transform duration-300",
                  "group-hover:-translate-y-1",
                  w.topBg ?? "bg-[#F3F0FF]",
                ].join(" ")}
              >
                <div className="rounded-[22px] overflow-hidden bg-white/40">
                  <div className="relative aspect-[16/16]">
                    <img
                      src={w.image}
                      alt={w.title}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <div className="h-6" />

              {/* BOTTOM TILE (separate) */}
              <div
                data-work-bottom
                className={[
                  "rounded-[28px] bg-white",
                  "px-8 py-6",
                  "border border-slate-100",
                  "shadow-[0_10px_30px_rgba(15,23,42,0.06)]",
                ].join(" ")}
              >
                <div className="flex items-center justify-between gap-6">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[30px] font-satoshi font-medium tracking-[-0.02em] text-[#7C5CFF] truncate">
                      {w.title}
                    </h3>

                    <div className="mt-3 h-px w-full bg-slate-200/80" />

                    <p className="mt-4 text-[14px] text-slate-600 truncate">
                      {w.subtitle}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <div
                      className={[
                        "h-[44px] w-[44px] rounded-full",
                        "flex items-center justify-center",
                        "transition-all duration-300",
                        w.featured
                          ? "bg-slate-950 text-white"
                          : "border border-slate-200 text-slate-900 group-hover:bg-slate-50",
                      ].join(" ")}
                    >
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
