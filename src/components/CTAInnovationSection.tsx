"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTAInnovationSection() {
  const rootRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      // Initial states (prevents flash + makes it feel slick)
      gsap.set("[data-cta-line1]", { opacity: 0, y: 24 });
      gsap.set("[data-cta-word]", { opacity: 0, y: 20 });
      gsap.set("[data-cta-icon]", { opacity: 0, scale: 0.85, rotate: -6 });
      gsap.set("[data-cta-desc]", { opacity: 0, y: 14 });
      gsap.set("[data-cta-btn]", { opacity: 0, y: 10, scale: 0.98 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to("[data-cta-line1]", { opacity: 1, y: 0, duration: 0.7 })
        .to(
          "[data-cta-word]",
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.12 },
          "-=0.35"
        )
        .to(
          "[data-cta-icon]",
          { opacity: 1, scale: 1, rotate: 0, duration: 0.55, ease: "back.out(1.8)" },
          "-=0.45"
        )
        .to("[data-cta-desc]", { opacity: 1, y: 0, duration: 0.55 }, "-=0.25")
        .to(
          "[data-cta-btn]",
          { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.09 },
          "-=0.25"
        );

      // Optional micro: tiny float on icon (subtle, classy)
      gsap.to("[data-cta-icon]", {
        y: -4,
        duration: 1.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play pause resume pause",
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="w-full bg-white">
      <div className="max-w-[90rem] mx-auto px-6 py-20">
        <div className="w-full">
          <h2 className="font-satoshi text-slate-950 tracking-[-0.03em] leading-[0.95] uppercase">
            <span
              data-cta-line1
              className="block text-[44px] sm:text-[64px] md:text-[84px]"
            >
              Create New
            </span>

            <span className="mt-4 flex flex-wrap items-center gap-4 text-[44px] sm:text-[64px] md:text-[84px]">
              <span data-cta-word>Innovation</span>

              <img
                data-cta-icon
                src="/assets/icon.webp"
                alt="icon"
                className="h-[44px] w-[92px] sm:h-[56px] sm:w-[120px] md:h-[82px] md:w-[140px]"
              />

              <span data-cta-word>Together</span>
            </span>
          </h2>
        </div>

        <div className="mt-14 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          <p
            data-cta-desc
            className="max-w-[520px] text-[14px] leading-[1.7] text-slate-500"
          >
            These elements help ensure visitors can easily find important
            information and stay connected with your agency.
          </p>

          <div className="flex items-center gap-3">
            <button
              data-cta-btn
              type="button"
              className="h-[46px] cursor-pointer px-7 rounded-full border border-slate-200 bg-white text-[14px] font-medium text-slate-900 hover:bg-slate-50 active:bg-slate-100 transition"
            >
              Contact Us
            </button>

            <button
              data-cta-btn
              type="button"
              aria-label="Open contact"
              className="h-[46px] w-[46px] rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-900 hover:bg-slate-50 active:bg-slate-100 transition"
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
    </section>
  );
}
