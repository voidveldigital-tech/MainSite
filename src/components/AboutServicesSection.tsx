"use client";

import React, { useLayoutEffect, useRef } from "react";
import { ArrowUpRight, Globe, PenTool, Sparkles, Layers } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Service = {
  title: string;
  desc: string;
  icon: React.ReactNode;
  active?: boolean;
};

const services: Service[] = [
  {
    title: "Performance-First Development",
    desc: "We build fast, scalable digital products with performance as a core requirement. Every decision is driven by speed, reliability, and long-term maintainability, not shortcuts.",
    icon: <Globe className="h-4 w-4" />,
  },
  {
    title: "Modern Technology Stack",
    desc: "We leverage cutting-edge technologies like Next.js 14+, React 18, and Tailwind CSS to deliver future-proof applications that are secure, flexible, and easy to scale.",
    icon: <PenTool className="h-4 w-4" />,
    active: true,
  },
  {
    title: "Mobile-First & User-Focused",
    desc: "Every product is designed mobile-first, ensuring a seamless experience across all devices. We prioritize clarity, usability, and conversion at every step of the user journey.",
    icon: <Sparkles className="h-4 w-4" />,
  },
  {
    title: "SEO & Growth-Ready Architecture",
    desc: "SEO isn’t an add-on, it’s built into our foundations. From clean code to optimized structure, we ensure your product is ready to rank, grow, and perform from day one.",
    icon: <Layers className="h-4 w-4" />,
  },
];

export default function AboutServicesSection() {
  const rootRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Set initial states (no flash)
      gsap.set("[data-anim='fade-up']", { opacity: 0, y: 20 });
      gsap.set("[data-anim='fade-right']", { opacity: 0, x: -24 });
      gsap.set("[data-anim='fade-left']", { opacity: 0, x: 24 });
      gsap.set("[data-anim='card']", { opacity: 0, y: 28, scale: 0.98 });
      gsap.set("[data-anim='service']", { opacity: 0, y: 16 });

      // Whole section timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          end: "bottom 40%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out", duration: 0.75 },
      });

      tl.to("[data-anim='fade-right']", { opacity: 1, x: 0, stagger: 0.12 }, 0)
        .to("[data-anim='card']", { opacity: 1, y: 0, scale: 1 }, 0.1)
        .to("[data-anim='fade-left']", { opacity: 1, x: 0 }, 0.15)
        .to("[data-anim='service']", { opacity: 1, y: 0, stagger: 0.12 }, 0.25);

      // Small floating “orbit icon” motion
      gsap.to("[data-anim='orbit']", {
        y: -10,
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Subtle shimmer/float on the bg stat card container
      gsap.to("[data-anim='stat-bg']", {
        scale: 1.01,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef as any} className="relative w-full bg-white">
      <div className="mx-auto max-w-[90rem] px-4 py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          {/* LEFT */}
          <div className="space-y-8">
            {/* About text */}
            <div className="space-y-3">
              <p
                data-anim="fade-right"
                className="text-3xl font-satoshi font-semibold text-slate-900"
              >
                About Us
              </p>

              <p
                data-anim="fade-right"
                className="max-w-xl text-sm leading-6 text-slate-500"
              >
                VoidVel was founded by Mohamed Amine Touzi and Ahmed Amine
                Maarouf, two engineers who recognized a critical gap between
                what businesses truly need and what traditional agencies often
                deliver. We don’t just design and code. We engineer digital
                solutions with a deep understanding of business, performance,
                and growth. <br /> Operating from the heart of North Africa with
                a global perspective, we serve startups, scale-ups, and
                established brands who refuse to settle for mediocre digital
                experiences.
              </p>

              <div
                data-anim="fade-right"
                className="flex items-center gap-3 pt-2"
              >
                <button className="cursor-pointer rounded-full border border-black px-5 py-2 text-lg font-medium text-slate-900 transition hover:bg-slate-50">
                  Learn More
                </button>
                <button
                  aria-label="Open"
                  className="grid cursor-pointer h-12 w-12 place-items-center rounded-full border border-slate-300 text-slate-900 transition hover:bg-slate-50"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Stat card */}
            <div data-anim="card" className="relative w-full max-w-[520px]">
              <div
                data-anim="stat-bg"
                className="relative overflow-hidden rounded-[28px] p-4 sm:p-5"
              >
                {/* bg image */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "url(/assets/about.webp)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />

                <div className="relative rounded-[22px] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.10)] ring-1 ring-slate-200/70">
                  <div className="p-6 sm:p-8 h-[31rem]">
                    <div className="flex items-center justify-between">
                      <div />
                      <div className="flex items-center gap-2">
                        <span className="rounded-full border border-slate-300 bg-white px-4 py-2 text-base font-medium text-slate-800">
                          Our Service
                        </span>
                        <span className="rounded-full border border-slate-300 bg-white px-4 py-2 text-base font-medium text-slate-800">
                          2024
                        </span>
                      </div>
                    </div>

                    <div className="grid mt-5 h-15 w-15 place-items-center rounded-full bg-slate-900 text-white">
                      <ArrowUpRight className="h-8 w-8" />
                    </div>

                    <div className="pt-10">
                      <h3 className="text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
                        <span className="text-slate-900">72+</span> projects
                        <br />
                        launched
                      </h3>

                      <p className="mt-10 max-w-sm text-lg text-slate-600">
                        We work in detail for every project, trust me.
                      </p>

                      <button className="mt-7 cursor-pointer rounded-full border border-black bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100 animation-all duration-300">
                        Get Started Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-8">
            <div className="relative">
              <h2
                data-anim="fade-left"
                className="text-4xl font-satoshi leading-tight tracking-tight text-slate-900 sm:text-5xl"
              >
                Transforming ideas into<br />
                 visually stunning
                <br />
                realities
              </h2>

              <div className="pointer-events-none absolute right-2 top-12 hidden lg:block">
                <div data-anim="orbit" className="relative h-32 w-32">
                  <img src="/assets/icon.webp" alt="icon image" />
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {services.map((s) => (
                <div
                  key={s.title}
                  data-anim="service"
                  className={[
                    "rounded-2xl border bg-white p-6 shadow-sm transition",
                    s.active
                      ? "border-violet-200 ring-1 ring-violet-200"
                      : "border-slate-200 hover:bg-slate-50/60",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-5">
                    <div
                      className={[
                        "mt-1 grid h-10 w-10 place-items-center rounded-full border",
                        s.active
                          ? "border-violet-200 bg-violet-50 text-violet-700"
                          : "border-slate-200 bg-white text-slate-700",
                      ].join(" ")}
                    >
                      {s.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span
                          className={[
                            "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-base font-satoshi",
                            s.active
                              ? "bg-violet-600 text-white"
                              : "bg-slate-100 text-slate-900",
                          ].join(" ")}
                        >
                          {s.title}
                          <ArrowUpRight className="h-4 w-4 opacity-80" />
                        </span>
                      </div>

                      <p className="mt-4 text-base leading-7 text-slate-700 max-w-[52ch]">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
