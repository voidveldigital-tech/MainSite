import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CTAInnovationSection from "@/components/CTAInnovationSection";
import { useRouter } from "next/router";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Services() {
  const sceneRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const imgWrapRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // NEW refs (no design impact)
  const servicesSectionRef = useRef<HTMLElement | null>(null);
  const ctaSectionRef = useRef<HTMLElement | null>(null);

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

  useEffect(() => {
    if (!sceneRef.current || !textRef.current || !imgWrapRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("main", { perspective: 900 });
      // 1) Pin the text while we scroll through the scene
      ScrollTrigger.create({
        trigger: sceneRef.current,
        start: "top top",
        end: "bottom top",
        pin: textRef.current,
        pinSpacing: false,
      });

      // 2) Move the image upward over the pinned text
      gsap.fromTo(
        imgWrapRef.current,
        {
          yPercent: 40,
          scale: 1.02,
          opacity: 0.98,
        },
        {
          yPercent: -10,
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sceneRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      // 3) Fade text as image covers it
      gsap.fromTo(
        textRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sceneRef.current,
            start: "top top",
            end: "50% top",
            scrub: true,
          },
        },
      );

      const introBits = textRef.current?.querySelectorAll("p, h2");
      if (introBits) {
        gsap.from(introBits, {
          y: 14,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.05,
        });
      }

      // B) Image “cinematic settle” while pinned (tiny tilt + blur resolving)
      gsap.fromTo(
        imgWrapRef.current,
        { rotate: -0.4, filter: "blur(6px)" },
        {
          rotate: 0,
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: sceneRef.current,
            start: "top top",
            end: "30% top",
            scrub: true,
          },
        },
      );

      // C) Service rows reveal: each row fades + slides in
      if (servicesSectionRef.current) {
        const rows =
          servicesSectionRef.current.querySelectorAll("[data-service-row]");

        rows.forEach((row) => {
          const title = row.querySelector("h3");
          const desc = row.querySelector("p");
          const btn = row.querySelector("button");
          const items = row.querySelectorAll("li");

          // Row container: subtle forward reveal
          zReveal(row, row);

          // Inner bits: slightly delayed, also forward reveal
          gsap.fromTo(
            [title, desc, btn, ...Array.from(items)],
            {
              opacity: 0,
              scale: 0.94,
              filter: "blur(8px)",
              transformOrigin: "50% 50%",
            },
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.05,
              scrollTrigger: {
                trigger: row,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      }

      // D) CTA section: text + button enter, owl micro-float + scroll parallax
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
    }, sceneRef);

    return () => ctx.revert();
  }, []);

  const SERVICE_SECTIONS = [
    {
      title: "Strategy",
      description:
        "Strategy forms the foundation of all decisions, integrated into our process from day one. We align goals, audiences, and direction to build clarity before pixels and code.",
      items: [
        "Information Architecture",
        "Competitive Analysis",
        "Audience Segmentation + User Flows",
        "Customer Experience",
        "Content",
        "Brand + Digital",
        "UI/UX",
        "Multivariate Testing (MVT)",
        "Redirection",
      ],
    },
    {
      title: "Creative",
      description:
        "From websites to campaigns and design systems, we craft visuals that feel confident and intentional. Our creative work is always tied to outcomes, not decoration.",
      items: [
        "Web & Product Design",
        "Art & Creative Direction",
        "UX/UI Design",
        "Event Support & Collateral",
        "Design Systems",
        "Presentations",
        "Motion Graphics & Animation",
        "3D",
        "Accessibility (ADA) Best Practices",
      ],
    },
    {
      title: "Branding",
      description:
        "We help brands come to life or evolve with consistency. From identity to systems, we create guidelines that make execution faster and stronger across every touchpoint.",
      items: [
        "Logo & Identity",
        "Brand Standards & Evolutions",
        "Brand Audits",
        "Brand Structure",
        "Brand Positioning & Strategy",
      ],
    },
    {
      title: "Development",
      description:
        "Clean code, thoughtful architecture, and performance-first builds. We ship scalable websites and apps with a focus on speed, usability, and long-term maintainability.",
      items: [
        "Headless CMS",
        "WordPress",
        "Webflow",
        "Shopify",
        "Accessibility Remediation",
        "Marketing Automation Integration",
        "Tracking/Reporting (GA4, Adobe & others)",
        "Localization & Regionalization",
      ],
    },
  ];

  return (
    <main className="min-h-screen">
      {/* SCROLL SCENE (ONLY pinned text + moving image) */}
      <section
        ref={sceneRef}
        className="mx-auto max-w-[110rem] px-5 pt-40 relative"
      >
        <div className="relative h-[180vh]">
          {/* PINNED TEXT */}
          <div
            ref={textRef}
            className="relative z-10 flex items-center h-[70vh]"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="grid md:grid-cols-[100px_1fr] gap-10 md:gap-24 items-start w-full">
              <p className="text-xs uppercase tracking-[0.14em] text-black/50">
                Services
              </p>

              <h2 className="max-w-[60rem] text-[22px] font-satoshi leading-[1.1] tracking-tight md:text-[32px]">
                We design, build, and scale digital experiences that move brands
                forward. From strategy to execution, our services combine
                creative direction, technology, and performance to create
                products and platforms that feel effortless, purposeful, and
                future-ready.
              </h2>
            </div>
          </div>

          {/* IMAGE THAT SCROLLS UP OVER THE TEXT */}
          <div
            ref={imgWrapRef}
            className="absolute left-0 right-0 top-[55vh] z-20"
            style={{ willChange: "transform, filter" }}
          >
            <div className="relative w-full h-[65vh] md:h-[72vh] overflow-hidden bg-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
              <Image
                src="/assets/what-we-do.webp"
                alt="What we do"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 110rem"
              />
            </div>
          </div>

          {/* Spacer so the scene has room to finish before next content */}
          <div className="absolute bottom-0 left-0 right-0 h-[45vh]" />
        </div>
      </section>

      {/* ✅ NEXT CONTENT (NORMAL FLOW, NO OVERLAP) */}
      <section
        ref={servicesSectionRef}
        className="mx-auto max-w-[110rem] px-5 py-24 border-t border-black/10"
      >
        {SERVICE_SECTIONS.map((s, idx) => (
          <div
            key={s.title}
            id={s.title.toLowerCase()}
            data-service-row
            className={`grid grid-cols-1 md:grid-cols-[320px_1fr_360px] gap-10 md:gap-16 py-20 ${
              idx !== SERVICE_SECTIONS.length - 1
                ? "border-b border-black/10"
                : ""
            }`}
          >
            {/* Left: Big title */}
            <h3 className="text-3xl md:text-4xl font-satoshi font-medium tracking-tight">
              {s.title}
            </h3>

            {/* Middle: Description + CTA */}
            <div className="max-w-xl">
              <p className="text-black/70 leading-relaxed">{s.description}</p>

              <button
                className="mt-8 inline-flex cursor-pointer items-center justify-center rounded-full bg-violet-200 px-7 py-3 text-sm font-satoshi font-medium text-black hover:bg-violet-300 transition-all duration-200"
                onClick={() => {
                  const id = s.title.toLowerCase();
                  document
                    .getElementById(id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Learn more
              </button>
            </div>

            {/* Right: List */}
            <ul className="space-y-3 text-sm text-black/70">
              {s.items.map((it) => (
                <li key={it} className="leading-relaxed">
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
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

      <CTAInnovationSection />
    </main>
  );
}
