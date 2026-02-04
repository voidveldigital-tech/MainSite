import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import CTAInnovationSection from "@/components/CTAInnovationSection";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

type WorkItem = {
  id: string;
  src: string;
  alt: string;
  height?: number;
};

const WORKS: WorkItem[] = [
  {
    id: "1",
    src: "/work-content/gridImage002.webp",
    alt: "FRUNK poster",
    height: 520,
  },
  {
    id: "3",
    src: "/work-content/gridImage004.webp",
    alt: "FRUNK poster",
    height: 500,
  },
  {
    id: "5",
    src: "/work-content/gridImage007.webp",
    alt: "FRUNK poster",
    height: 450,
  },
  {
    id: "2",
    src: "/work-content/gridImage003.webp",
    alt: "FRUNK poster",
    height: 320,
  },
  {
    id: "4",
    src: "/work-content/gridImage005.webp",
    alt: "FRUNK poster",
    height: 300,
  },
  {
    id: "6",
    src: "/work-content/gridImage008.webp",
    alt: "FRUNK poster",
    height: 450,
  },
  {
    id: "7",
    src: "/work-content/gridImage009.webp",
    alt: "FRUNK poster",
    height: 520,
  },
  {
    id: "8",
    src: "/work-content/gridImage013.webp",
    alt: "FRUNK poster",
    height: 400,
  },
  {
    id: "9",
    src: "/work-content/gridImage018.webp",
    alt: "FRUNK poster",
    height: 480,
  },
  {
    id: "10",
    src: "/work-content/gridImage020.webp",
    alt: "FRUNK poster",
    height: 350,
  },
  {
    id: "11",
    src: "/work-content/gridImage022.webp",
    alt: "FRUNK poster",
    height: 400,
  },
  {
    id: "12",
    src: "/work-content/gridImage025.webp",
    alt: "FRUNK poster",
    height: 300,
  },
  {
    id: "13",
    src: "/work-content/gridImage026.webp",
    alt: "FRUNK poster",
    height: 450,
  },
  {
    id: "14",
    src: "/work-content/gridImage029.webp",
    alt: "FRUNK poster",
    height: 200,
  },
  {
    id: "15",
    src: "/work-content/gridImage030.webp",
    alt: "FRUNK poster",
    height: 320,
  },
  {
    id: "16",
    src: "/work-content/gridImage031.webp",
    alt: "FRUNK poster",
    height: 400,
  },
  {
    id: "17",
    src: "/work-content/gridImage037.webp",
    alt: "FRUNK poster",
    height: 450,
  },
  {
    id: "18",
    src: "/work-content/gridImage039.webp",
    alt: "FRUNK poster",
    height: 380,
  },
  {
    id: "19",
    src: "/work-content/gridImage040.webp",
    alt: "FRUNK poster",
    height: 420,
  },
  {
    id: "20",
    src: "/work-content/gridImage042.webp",
    alt: "FRUNK poster",
    height: 300,
  },
  {
    id: "21",
    src: "/work-content/gridImage063.webp",
    alt: "FRUNK poster",
    height: 500,
  },
  {
    id: "22",
    src: "/work-content/gridImage064.webp",
    alt: "FRUNK poster",
    height: 350,
  },
  {
    id: "23",
    src: "/work-content/gridImage067.webp",
    alt: "FRUNK poster",
    height: 400,
  },
  {
    id: "24",
    src: "/work-content/hnft_2400x2400.webp",
    alt: "FRUNK poster",
    height: 450,
  },
  {
    id: "25",
    src: "/work-content/turntable_2400x2400.webp",
    alt: "FRUNK poster",
    height: 450,
  },
];

function WorkCard({ item }: { item: WorkItem }) {
  return (
    <figure className="mb-10 break-inside-avoid">
      <div className=" bg-[#F6ECE1] p-10 ">
        <div
          className="relative w-full overflow-hidden bg-white/60"
          style={{ height: item.height ?? 420 }}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-cover transition-transform duration-300 hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={item.id === "1"}
          />
        </div>
      </div>
    </figure>
  );
}

export default function WorkPage() {
  const router = useRouter();

  const pageRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      // initial page fade (subtle)
      gsap.fromTo(
        pageRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power1.out" },
      );

      // header intro
      if (headerRef.current) {
        const headerEls = headerRef.current.querySelectorAll("p, h1");
        gsap.from(headerEls, {
          y: 18,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.05,
        });
      }

      // grid cards: on-load stagger (small)
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll("[data-work-card]");
        gsap.from(cards, {
          y: 20,
          opacity: 0,
          scale: 0.98,
          duration: 0.7,
          stagger: 0.05,
          ease: "power3.out",
          delay: 0.15,
        });

        // scroll reveal per card (so it feels alive when scrolling)
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 24, opacity: 0, scale: 0.985 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      }

      // button float in near bottom
      if (btnRef.current) {
        gsap.from(btnRef.current, {
          y: 14,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: btnRef.current,
            start: "top 92%",
          },
        });

        // tiny hover “pulse”
        const el = btnRef.current;
        const onEnter = () =>
          gsap.to(el, { scale: 1.03, duration: 0.2, ease: "power2.out" });
        const onLeave = () =>
          gsap.to(el, { scale: 1, duration: 0.2, ease: "power2.out" });

        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);

        // cleanup listeners
        ScrollTrigger.addEventListener("refreshInit", () => {});

        return () => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        };
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);
  return (
    <main ref={pageRef} className="min-h-screen">
      <div className="mx-auto px-5 py-32 md:px-10 md:py-36">
        {/* Header */}
        <div ref={headerRef} className="mb-10 md:mb-14">
          <p className="text-xs font-satoshi tracking-[0.22em] text-black/50">
            VOIDVEL • SELECTED WORK
          </p>
          <h1 className="mt-3 text-3xl font-satoshi font-medium tracking-tight text-black md:text-5xl">
            Our work, in pixels.
          </h1>
        </div>

        {/* Masonry */}
        <section
          ref={gridRef}
          className="
            columns-1 gap-10
            sm:columns-2
            lg:columns-3
            xl:columns-4
          "
        >
          {WORKS.map((item) => (
            <div key={item.id} data-work-card>
              <WorkCard item={item} />
            </div>
          ))}
        </section>
      </div>

      <button
        ref={btnRef}
        className="work-more-btn text-sm mx-auto block justify-self-center border border-gray-300 bg-violet-500 px-6 py-2 text-white rounded-full cursor-pointer hover:bg-violet-800 transition-colors duration-300"
        onClick={() => router.push("/works")}
      >
        Back to works
      </button>

      <CTAInnovationSection />
    </main>
  );
}
