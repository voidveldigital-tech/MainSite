"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export default function TestimonialsSection() {
  const items: Testimonial[] = useMemo(
    () => [
      {
        quote:
          "Working with vantage was not just a service, it was a collaborative and enjoyable journey. Team's dedication to understanding our goals and delivering beyond.",
        name: "Betely Agency",
        role: "Branding Design UI/UX Design",
      },
      {
        quote:
          'He creativity and professionalism of this team are unmatched. From start to finish, they provided outstanding support and delivered results that made a real impact."',
        name: "Sarah Thampaer",
        role: "Branding Design UI/UX Design",
      },
      {
        quote:
          "Their process felt calm and precise. Every iteration improved the product and the communication stayed crystal-clear throughout.",
        name: "Alex Martin",
        role: "Product Design Web Design",
      },
      {
        quote:
          "The final result looks premium and loads fast. We saw better engagement almost immediately after launch.",
        name: "Nora Ali",
        role: "UI/UX Design Development",
      },
    ],
    [],
  );

  // Show 2 at a time
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(items.length / 2);
  const visible = items.slice(page * 2, page * 2 + 2);

  // Direction for carousel animation (-1 prev, +1 next)
  const dirRef = useRef<1 | -1>(1);

  // Refs for GSAP
  const rootRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardsWrapRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  // -------- 1) Section reveal on scroll (landing page reach) --------
  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      // Initial states (so reveal looks crisp)
      gsap.set("[data-t-head]", { opacity: 0, y: 14 });
      gsap.set("[data-t-icon]", { opacity: 0, x: -12 });
      gsap.set("[data-t-cards] > [data-card]", {
        opacity: 0,
        y: 26,
        filter: "blur(6px)",
        scale: 0.98,
      });
      gsap.set("[data-t-nav]", { opacity: 0, y: 10 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to("[data-t-head]", { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 })
        .to("[data-t-icon]", { opacity: 1, x: 0, duration: 0.55 }, "<0.1")
        .to(
          "[data-t-cards] > [data-card]",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.75,
            stagger: 0.12,
          },
          "-=0.15",
        )
        .to("[data-t-nav]", { opacity: 1, y: 0, duration: 0.5 }, "-=0.35");

      // Optional: subtle parallax on each card's gradient tint
      gsap.utils.toArray<HTMLElement>("[data-grad]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: -10 },
          {
            y: 10,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // -------- 2) Carousel animation on page change --------
  useEffect(() => {
    if (!cardsWrapRef.current) return;

    const cards =
      cardsWrapRef.current.querySelectorAll<HTMLElement>("[data-card]");
    if (!cards.length) return;

    // Enter animation for newly rendered cards
    const fromX = dirRef.current === 1 ? 26 : -26;

    gsap.fromTo(
      cards,
      { opacity: 0, x: fromX, y: 10, filter: "blur(6px)", scale: 0.985 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        overwrite: true,
      },
    );

    // Tiny nav “snap” so it feels tactile
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { scale: 0.98 },
        { scale: 1, duration: 0.25, ease: "power2.out" },
      );
    }
  }, [page]);

  // Helper to animate OUT before changing page (so it looks like a real carousel)
  const go = (direction: 1 | -1) => {
    dirRef.current = direction;

    const wrap = cardsWrapRef.current;
    if (!wrap) {
      setPage((p) => (p + direction + pageCount) % pageCount);
      return;
    }

    const cards = wrap.querySelectorAll<HTMLElement>("[data-card]");
    const toX = direction === 1 ? -22 : 22;

    gsap.to(cards, {
      opacity: 0,
      x: toX,
      y: -6,
      filter: "blur(6px)",
      duration: 0.32,
      ease: "power2.inOut",
      stagger: 0.04,
      onComplete: () => {
        setPage((p) => (p + direction + pageCount) % pageCount);
      },
    });
  };

  return (
    <section ref={rootRef} className="w-full bg-white">
      <div className="max-w-[90rem] mx-auto px-6 py-20">
        {/* Header */}
        <div ref={headerRef} className="text-center">
          <p data-t-head className="text-[18px] text-slate-600 font-semibold">
            See from our client
          </p>

          <div className="mt-3 flex items-start justify-center gap-4">
            <h2
              data-t-head
              className="text-[46px] md:text-[56px] leading-[1.05] tracking-[-0.03em] font-satoshi text-slate-950"
            >
              What Our
              <br />
              <div className="flex flex-row items-center gap-3 mt-2 justify-center">
                <img
                  data-t-icon
                  src="/assets/icon.webp"
                  alt="icon image"
                  className="h-20 w-36"
                />
                <span data-t-head> Client Says </span>
              </div>
            </h2>
          </div>
        </div>

        {/* Cards */}
        <div
          ref={cardsWrapRef}
          data-t-cards
          className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {visible.map((t, idx) => (
            <div
              key={`${t.name}-${idx}-${page}`} // important so new page re-renders cleanly
              data-card
              className="
                relative overflow-hidden rounded-[28px]
                bg-white/70 backdrop-blur
                ring-1 ring-slate-200/60
                shadow-[0_18px_60px_rgba(15,23,42,0.08)]
                p-10 md:p-12
                transition-transform duration-300
                hover:-translate-y-1
              "
            >
              {/* soft gradient tint */}
              <div
                data-grad
                className="
                  pointer-events-none absolute inset-0
                  bg-[radial-gradient(1200px_circle_at_0%_0%,rgba(124,92,255,0.18),transparent_45%),radial-gradient(900px_circle_at_100%_100%,rgba(15,23,42,0.06),transparent_55%)]
                "
              />

              {/* quote badge */}
              <div
                className="
                  absolute top-8 left-8
                  h-12 w-12 rounded-2xl
                  bg-white/70 backdrop-blur
                  ring-1 ring-slate-200/60
                  flex items-center justify-center
                  text-[#7C5CFF]
                "
                aria-hidden="true"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M10 11c0-3 2-5 5-6v3c-1 .4-2 1.4-2 3h2v6H9v-6h1z"
                    fill="currentColor"
                    opacity="0.9"
                  />
                  <path
                    d="M19 11c0-3 2-5 5-6v3c-1 .4-2 1.4-2 3h2v6h-6v-6h1z"
                    fill="currentColor"
                    opacity="0.45"
                    transform="translate(-4,0)"
                  />
                </svg>
              </div>

              <div className="relative">
                <p className="mt-10 text-[18px] leading-[1.85] text-slate-700 max-w-[540px]">
                  {t.quote}
                </p>

                <div className="mt-14">
                  <div className="flex items-center justify-between gap-6">
                    <div className="min-w-0">
                      <p className="text-[18px] font-semibold tracking-[-0.01em] text-[#7C5CFF] truncate">
                        {t.name}
                      </p>
                      <p className="mt-2 text-[12px] text-slate-600 truncate">
                        {t.role}
                      </p>
                    </div>

                    <div className="hidden sm:flex items-center gap-3 shrink-0">
                      <span className="h-2 w-2 rounded-full bg-[#7C5CFF]/60" />
                      <span className="h-px w-24 bg-slate-200/80" />
                    </div>
                  </div>

                  <div className="mt-6 h-px w-full bg-slate-200/70" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nav */}
        <div className="mt-10 flex justify-end">
          <div
            ref={navRef}
            data-t-nav
            className="
              flex items-center gap-2 rounded-full
              bg-white/70 backdrop-blur
              ring-1 ring-slate-200/60
              shadow-[0_10px_35px_rgba(15,23,42,0.08)]
              px-2 py-2
            "
          >
            <button
              type="button"
              aria-label="Previous testimonials"
              onClick={() => go(-1)}
              className=" h-11 w-11 rounded-full cursor-pointer bg-white/80 ring-1 ring-slate-200/60 flex items-center justify-center text-slate-900 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(15,23,42,0.10)] active:translate-y-0 active:shadow-none"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M14.5 6.5L9 12l5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="px-4">
              <p className="text-[12px] font-medium text-slate-600 tabular-nums">
                <span className="text-slate-900">
                  {String(page + 1).padStart(2, "0")}
                </span>
                <span className="mx-2 text-slate-300">/</span>
                {String(pageCount).padStart(2, "0")}
              </p>
            </div>

            <button
              type="button"
              aria-label="Next testimonials"
              onClick={() => go(1)}
              className=" h-11 w-11 cursor-pointer rounded-full bg-slate-950 text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(15,23,42,0.22)] active:translate-y-0 active:shadow-none"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9.5 6.5L15 12l-5.5 5.5"
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
