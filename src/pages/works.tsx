"use client";

import CTAInnovationSection from "@/components/CTAInnovationSection";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/router";

gsap.registerPlugin(ScrollTrigger);

type WorkItem = {
  title: string;
  tags: string;
  imageSrc: string;
  videoSrc: string;
};

function WorkCard({
  item,
  setCardRef,
}: {
  item: WorkItem;
  setCardRef?: (el: HTMLElement | null) => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [active, setActive] = useState(false);

  const play = async () => {
    const v = videoRef.current;
    if (!v) return;

    setActive(true);
    v.muted = true;
    v.playsInline = true;

    try {
      if (v.readyState < 2) v.load();
      await v.play();
    } catch {
      // autoplay can be blocked; keep image visible
    }
  };

  const stop = () => {
    const v = videoRef.current;
    setActive(false);
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  const toggle = async () => {
    if (active) stop();
    else await play();
  };

  return (
    <article
      ref={setCardRef}
      className="work-card group relative mb-10 will-change-transform"
    >
      <div
        className="
          work-media
          relative aspect-[16/7] w-full overflow-hidden
          border border-transparent ring-1 ring-black/10 bg-black/5
          transform-gpu will-change-transform
          transition-transform duration-300 ease-out
          group-hover:scale-[1.04] group-hover:z-20
        "
        onMouseEnter={play}
        onMouseLeave={stop}
        onClick={toggle}
        role="button"
        tabIndex={0}
      >
        {/* Poster Image */}
        <Image
          src={item.imageSrc}
          alt={item.title}
          fill
          className={[
            "work-layer object-cover transition-opacity duration-300",
            active ? "opacity-0" : "opacity-100",
          ].join(" ")}
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={false}
        />

        {/* Hover Video */}
        <video
          ref={videoRef}
          className={[
            "work-layer absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
            active ? "opacity-100" : "opacity-0",
          ].join(" ")}
          muted
          playsInline
          loop
          preload="metadata"
        >
          <source src={item.videoSrc} type="video/mp4" />
        </video>

        <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
          ▶ Preview
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-6">
        <div className="work-meta">
          <h3 className="text-sm font-medium">{item.title}</h3>
          <p className="mt-2 text-xs text-black/60">{item.tags}</p>
        </div>
      </div>
    </article>
  );
}

export default function WorkSection() {
  const works: WorkItem[] = [
    {
      title: "Booksy",
      tags: "Web Design / Webflow Development / UI/UX",
      imageSrc: "/web designs/web-work2.webp",
      videoSrc: "/web designs/video-design.mp4",
    },
    {
      title: "Booksy",
      tags: "Web Design / Webflow Development / UI/UX",
      imageSrc: "/web designs/web-work.webp",
      videoSrc: "/web designs/video-design.mp4",
    },
    {
      title: "Booksy",
      tags: "Web Design / Webflow Development / UI/UX",
      imageSrc: "/web designs/web-work2.webp",
      videoSrc: "/web designs/video-design.mp4",
    },
    {
      title: "Booksy",
      tags: "Web Design / Webflow Development / UI/UX",
      imageSrc: "/web designs/web-work.webp",
      videoSrc: "/web designs/video-design.mp4",
    },
    {
      title: "Booksy",
      tags: "Web Design / Webflow Development / UI/UX",
      imageSrc: "/web designs/web-work2.webp",
      videoSrc: "/web designs/video-design.mp4",
    },
    {
      title: "Booksy",
      tags: "Web Design / Webflow Development / UI/UX",
      imageSrc: "/web designs/web-work.webp",
      videoSrc: "/web designs/video-design.mp4",
    },
  ];

  const rootRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const router = useRouter()
  cardsRef.current = [];

  const setCardRef = (el: HTMLElement | null) => {
    if (el) cardsRef.current.push(el);
  };

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const label = document.querySelector(".work-label");
      const title = document.querySelector(".work-title");
      const grid = document.querySelector(".work-grid");
      const btn = document.querySelector(".work-more-btn");

      // header reveal
      gsap.set([label, title], {
        opacity: 0,
        scale: 0.94,
        filter: "blur(10px)",
        transformOrigin: "50% 50%",
      });

      gsap.to([label, title], {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.05,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".work-header",
          start: "top 80%",
        },
      });

      // grid + cards reveal
      gsap.set(cardsRef.current, {
        opacity: 0,
        scale: 0.9,
        z: -200,
        rotationX: 6,
        filter: "blur(14px)",
        transformOrigin: "50% 50%",
        transformPerspective: 1200,
      });

      gsap.to(cardsRef.current, {
        opacity: 1,
        scale: 1,
        z: 0,
        rotationX: 0,
        filter: "blur(0px)",
        duration: 1.05,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".work-grid",
          start: "top 85%",
        },
      });

      // per-card parallax + hover micro tilt
      cardsRef.current.forEach((card) => {
        const layers = card.querySelectorAll<HTMLElement>(".work-layer");
        const media = card.querySelector<HTMLElement>(".work-media");
        if (!media) return;

        // parallax
        if (layers.length) {
          gsap.fromTo(
            layers,
            { y: 10 },
            {
              y: -10,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }

        // hover tilt (event listeners)
        const onEnter = () =>
          gsap.to(media, { rotateZ: 0.15, duration: 0.35, ease: "power2.out" });
        const onLeave = () =>
          gsap.to(media, { rotateZ: 0, duration: 0.35, ease: "power2.out" });

        media.addEventListener("mouseenter", onEnter);
        media.addEventListener("mouseleave", onLeave);

        cleanups.push(() => {
          media.removeEventListener("mouseenter", onEnter);
          media.removeEventListener("mouseleave", onLeave);
        });
      });

      // button pop-in
      if (btn) {
        gsap.fromTo(
          btn,
          { opacity: 0, scale: 0.92, filter: "blur(10px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: btn,
              start: "top 92%",
            },
          },
        );
      }

      ScrollTrigger.refresh();
    }, rootRef);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} style={{ perspective: 1200 }}>
      <section className="work-header mx-auto max-w-[90rem] px-5 pt-40">
        <div className="grid md:grid-cols-[100px_1fr] gap-10 md:gap-24 items-start">
          <p className="work-label text-xs uppercase tracking-[0.14em] text-black/50">
            Work
          </p>

          <h2 className="work-title max-w-[60rem] text-[22px] font-satoshi leading-[1.1] tracking-tight md:text-[32px]">
            Our work seamlessly blends creativity with conversations. We thrive
            on partnering with internal marketing, creative, and product teams
            to deliver impactful results. Explore our case studies to see how we
            bring strategic expertise and world-class creativity to life.
          </h2>
        </div>
      </section>

      <section className="mx-auto max-w-[100rem] py-10">
        {/* no gap, as you wanted */}
        <div className="work-grid mt-16 grid grid-cols-1 md:grid-cols-2 overflow-visible">
          {works.map((item, idx) => (
            <WorkCard
              key={`${item.title}-${idx}`}
              item={item}
              setCardRef={setCardRef}
            />
          ))}
        </div>
      </section>

      <button
       className="work-more-btn text-sm mx-auto block justify-self-center border border-gray-300 bg-violet-500 px-6 py-2 text-white rounded-full cursor-pointer hover:bg-violet-800 transition-colors duration-300"
       onClick={() => router.push('/archive')}
       >
        More Work
      </button>

      <CTAInnovationSection />
    </div>
  );
}
