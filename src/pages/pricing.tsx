"use client";

import CompareFeaturesVoidVel from "@/components/PlateformResults";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CTAInnovationSection from "@/components/CTAInnovationSection";
import Image from "next/image";
import { useRouter } from "next/router";

gsap.registerPlugin(ScrollTrigger);

type Plan = {
  badge: string;
  title: string;
  desc: string;
  cta: string;
  metaLeft?: { label: string; value: string }[];
  includesTitle: string;
  includes: string[];
  popular?: boolean;
};

const Check = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-4 w-4 flex-none"
    fill="none"
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M8.5 12.2l2.2 2.2 4.8-5.2"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DotIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none">
    <path
      d="M12 5v14M9 8l3-3 3 3"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0"
    />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-neutral-700">
      {children}
    </span>
  );
}

function Button({
  children,
  variant = "solid",
}: {
  children: React.ReactNode;
  variant?: "solid" | "outline";
}) {
  const base =
    "inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-semibold transition";
  if (variant === "outline") {
    return (
      <button
        className={`${base} border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50`}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      className={`${base} bg-neutral-900 text-white hover:bg-neutral-800`}
    >
      {children}
    </button>
  );
}

function SmallPlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      data-anim="card"
      className={[
        "relative rounded-2xl bg-white p-7 shadow-[0_1px_0_rgba(0,0,0,0.06)] ring-1 ring-neutral-200",
        plan.popular ? "ring-2 ring-violet-300" : "",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <Badge>{plan.badge}</Badge>

        {plan.popular ? (
          <span className="inline-flex items-center rounded-md bg-violet-500 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white">
            MOST POPULAR
          </span>
        ) : null}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[1.1fr_1fr]">
        {/* Left */}
        <div>
          <h3 className="text-[44px] leading-[0.95] tracking-tight text-neutral-900">
            {plan.title}
          </h3>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-neutral-600">
            {plan.desc}
          </p>

          <div className="mt-6">
            <Button>{plan.cta}</Button>
          </div>
        </div>

        {/* Divider + Right */}
        <div className="relative md:pl-7">
          <div className="hidden md:absolute md:left-0 md:top-0 md:bottom-0 md:block md:w-px md:bg-neutral-200" />

          {plan.metaLeft?.length ? (
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-neutral-700">
              {plan.metaLeft.map((m) => (
                <div key={m.label} className="flex items-center gap-2">
                  <span className="text-neutral-400">
                    <DotIcon />
                  </span>
                  <span className="font-semibold">{m.value}</span>
                </div>
              ))}
            </div>
          ) : null}

          <div className="mt-5">
            <div className="text-[11px] font-semibold tracking-wide text-neutral-500">
              {plan.includesTitle}
            </div>

            <ul className="mt-3 space-y-2.5 text-[13px] text-neutral-700">
              {plan.includes.map((it) => (
                <li key={it} className="flex items-start gap-2.5">
                  <span className="mt-[1px] text-neutral-700">
                    <Check />
                  </span>
                  <span className="leading-relaxed">{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnterpriseCard() {
  return (
    <div
      data-anim="card"
      className="relative rounded-2xl bg-white p-7 shadow-[0_1px_0_rgba(0,0,0,0.06)] ring-1 ring-neutral-200"
    >
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <Badge>CUSTOM PRICING</Badge>

          <h3 className="mt-6 text-[44px] leading-[0.95] tracking-tight text-neutral-900">
            Enterprise
          </h3>

          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-neutral-600">
            For teams that need scale, security, and a dedicated delivery lane
            for mission-critical builds.
          </p>

          <div className="mt-6">
            <Button>Contact sales</Button>
          </div>
        </div>

        {/* Visual block */}
        <div className="hidden w-[240px] shrink-0 sm:block">
          <div className="relative h-[230px] w-full overflow-hidden rounded-2xl bg-[#E6FF7A]">
            <div className="absolute inset-0 opacity-[0.22] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:10px_10px]" />
            <div className="absolute left-1/2 top-1/2 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/15 [mask-image:radial-gradient(circle,black_55%,transparent_75%)]" />
            <div className="absolute left-1/2 top-1/2 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:7px_7px]" />
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-neutral-200 pt-6">
        <div className="flex flex-wrap gap-x-10 gap-y-2 text-sm text-neutral-700">
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">
              <DotIcon />
            </span>
            <span className="font-semibold">Custom scope & timelines</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">
              <DotIcon />
            </span>
            <span className="font-semibold">Priority delivery team</span>
          </div>
        </div>

        <div className="mt-6 text-[11px] font-semibold tracking-wide text-neutral-500">
          ENTERPRISE INCLUDES:
        </div>

        <ul className="mt-3 grid gap-x-10 gap-y-2.5 text-[13px] text-neutral-700 sm:grid-cols-2">
          {[
            "Dedicated project manager + weekly reporting",
            "Full-stack development (Next.js / React / Node / CMS)",
            "UX/UI design system + component library handoff",
            "Performance optimization (Core Web Vitals focus)",
            "Technical SEO (structured data, meta, indexing)",
            "Security hardening + best-practice deployment",
            "Integrations (payments, CRM, analytics, automation)",
            "Staging + production pipelines (CI/CD guidance)",
            "Post-launch support & maintenance options",
            "Team enablement: docs + handover sessions",
          ].map((it) => (
            <li key={it} className="flex items-start gap-2.5">
              <span className="mt-[1px] text-neutral-700">
                <Check />
              </span>
              <span className="leading-relaxed">{it}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function VoidVelPricingGrid() {
  const headerRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLElement | null>(null);
  const compareRef = useRef<HTMLDivElement | null>(null);
  const ctaSectionRef = useRef<HTMLElement | null>(null);
  const router = useRouter()

  const zReveal = (targets: gsap.TweenTarget, trigger: Element) => {
    return gsap.fromTo(
      targets,
      {
        opacity: 0,
        scale: 0.92,
        filter: "blur(10px)",
        transformOrigin: "50% 50%",
      },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );
  };

  useLayoutEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // "Back -> Front" reveal:
      // start slightly smaller + pushed back in Z + blurred, then snap into place.
      const popIn = (targets: gsap.TweenTarget, opts?: gsap.TweenVars) =>
        gsap.fromTo(
          targets,
          {
            opacity: 0,
            scale: 0.92,
            y: 0,
            rotateX: 10,
            transformPerspective: 900,
            transformOrigin: "50% 50%",
            filter: "blur(10px)",
            z: -120, // "coming from the back"
          },
          {
            opacity: 1,
            scale: 1,
            rotateX: 0,
            z: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            clearProps: "filter",
            ...opts,
          },
        );

      // Header title + paragraph
      if (headerRef.current) {
        const h1 = headerRef.current.querySelector('[data-anim="h1"]');
        const p = headerRef.current.querySelector('[data-anim="p"]');
        popIn([h1, p], {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
          stagger: 0.12,
        });
      }

      // Pricing cards (left + right)
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('[data-anim="card"]');
        popIn(cards, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
          stagger: 0.1,
        });
      }

      // Compare section (animate whole block)
      if (compareRef.current) {
        popIn(compareRef.current, {
          scrollTrigger: {
            trigger: compareRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          duration: 0.85,
          stagger: 0,
        });
      }
    });

    if (ctaSectionRef.current) {
        const ctaText = ctaSectionRef.current.querySelectorAll("h2");
        const ctaBtn = ctaSectionRef.current.querySelector("button");

        zReveal([ctaText, ctaBtn], ctaSectionRef.current);

        // Owl stays playful (optional)
        const owl = ctaSectionRef.current.querySelector('[data-owl="true"]');
        if (owl) {
          gsap.fromTo(
            owl,
            { opacity: 0, scale: 0.92, filter: "blur(10px)" },
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 1.0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ctaSectionRef.current,
                start: "top 85%",
              },
            },
          );

          gsap.to(owl, {
            y: -12,
            duration: 2.4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        }
      }

    return () => ctx.revert();
  }, []);

  const plans: Plan[] = [
    {
      badge: "STARTER",
      title: "Launch",
      desc: "For founders who need a clean, fast site that converts from day one.",
      cta: "Get started",
      metaLeft: [
        { label: "timeline", value: "7–10 days" },
        { label: "pages", value: "Up to 4 pages" },
      ],
      includesTitle: "LAUNCH INCLUDES:",
      includes: [
        "Custom landing or mini-site (responsive)",
        "Basic SEO setup (meta + sitemap)",
        "Speed essentials (image optimization + lazy loading)",
        "Contact form + email routing",
        "Deployment setup + handoff",
      ],
    },
    {
      badge: "MOST POPULAR",
      title: "Growth",
      desc: "For teams ready to level up design, UX, and performance across the site.",
      cta: "Book a call",
      metaLeft: [
        { label: "timeline", value: "2–3 weeks" },
        { label: "pages", value: "Up to 8 pages" },
      ],
      includesTitle: "EVERYTHING IN LAUNCH, AND:",
      includes: [
        "UX/UI polish + conversion-focused structure",
        "Reusable sections + scalable components",
        "Advanced performance pass (Core Web Vitals)",
        "Analytics + event tracking (GA4 / Pixel)",
        "Blog or CMS integration (optional)",
        "Brand refinements (type + color usage guidance)",
      ],
      popular: true,
    },
  ];

  return (
    <>
      <section ref={headerRef} className="md:pb-28">
        <div className="mx-auto max-w-[90rem] px-6 pt-40 text-center">
          <h1
            data-anim="h1"
            className="font-sans text-[56px] sm:text-[72px] md:text-[88px] font-normal tracking-tight text-neutral-900"
          >
            Pricing &amp; Packages
          </h1>

          <p
            data-anim="p"
            className="mx-auto mt-8 max-w-3xl text-lg sm:text-xl leading-relaxed text-neutral-500"
          >
            VoidVel crafts high-performance digital experiences. From modern
            websites and e-commerce platforms to UX/UI design, branding, and
            technical optimization, we help ambitious brands build faster, scale
            smarter, and convert better.
          </p>
        </div>
      </section>

      <section ref={gridRef} className="w-full">
        <div className="mx-auto max-w-[90rem] px-6 pb-20">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]">
            {/* Left column (2 stacked cards) */}
            <div className="grid gap-6">
              {plans.map((p) => (
                <SmallPlanCard key={p.title} plan={p} />
              ))}
            </div>

            {/* Right column (Enterprise) */}
            <EnterpriseCard />
          </div>
        </div>
      </section>

      <section
        ref={ctaSectionRef}
        className="relative w-full bg-violet-200 overflow-hidden px-40"
      >
        <div className="mx-auto max-w-[110rem] px-10">
          <div className="grid min-h-[520px] items-center gap-12 py-16 md:grid-cols-2">
            {/* Left content */}
            <div className="max-w-[520px] md:pl-10">
              <h2 className="text-[34px] leading-[1.12] tracking-tight text-black md:text-[44px]">
                Shake things up, take a <br />
                sip! We bring clarity & <br />
                flavor to help you reach <br />
                your goals.
              </h2>

              <button
                type="button"
                onClick={() => router.push("/pricing")}
                className="mt-10 cursor-pointer inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-medium text-black shadow-[0_10px_25px_rgba(0,0,0,0.12)] hover:scale-[1.02] active:scale-[0.98] hover:bg-violet-800 hover:text-white duration-300 transition-all"
              >
                Check Pricing &amp; Packages
              </button>
            </div>

            {/* Right column spacer (keeps grid balance) */}
            <div />
          </div>
        </div>

        {/* Owl anchored to bottom */}
        <div
          data-owl="true"
          className="pointer-events-none absolute bottom-0 top-0 right-100"
          style={{ willChange: "transform" }}
        >
          <div className="relative h-[360px] w-[360px] md:h-[420px] md:w-[420px] lg:h-[680px] lg:w-[460px]">
            <Image
              src="/animal/owl-cup.webp"
              alt="3D owl holding a drink"
              fill
              priority
              className="object-contain object-bottom"
              sizes="(max-width: 768px) 400px, (max-width: 1200px) 420px, 460px"
            />
          </div>
        </div>
      </section>

      <div ref={compareRef}>
        <CompareFeaturesVoidVel />
      </div>
      <CTAInnovationSection />
    </>
  );
}
