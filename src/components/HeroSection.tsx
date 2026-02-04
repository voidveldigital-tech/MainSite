import { BriefcaseBusiness } from "lucide-react";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function LandingHero() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ctx: any;

    (async () => {
      const gsap = (await import("gsap")).default;

      const root = rootRef.current;
      if (!root) return;

      const items = root.querySelectorAll("[data-animate]");

      ctx = gsap.context(() => {
        gsap.set(items, {
          opacity: 0,
          y: 24,
          filter: "blur(6px)",
        });

        gsap.to(items, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.1,
        });
      }, root);
    })();

    return () => ctx?.revert?.();
  }, []);

  function MiniStat({ label, value }: { label: string; value: string }) {
    return (
      <div className="rounded-xl border border-black/5 bg-white/70 p-3">
        <p className="text-[11px] text-[#0b1028]/55">{label}</p>
        <p className="mt-1 text-lg font-semibold text-[#0b1028]">{value}</p>
      </div>
    );
  }

  function Chip({ children }: { children: React.ReactNode }) {
    return (
      <span className="rounded-full border border-black/5 bg-white/70 px-3 py-1 text-xs text-[#0b1028]/70">
        {children}
      </span>
    );
  }

  function RowItem({ title, meta }: { title: string; meta: string }) {
    return (
      <div className="flex items-center justify-between rounded-xl border border-black/5 bg-white/60 px-3 py-2">
        <p className="text-xs font-medium text-[#0b1028]/80">{title}</p>
        <p className="text-[11px] text-[#0b1028]/50">{meta}</p>
      </div>
    );
  }

  function ClientRow({ name, tag }: { name: string; tag: string }) {
    return (
      <div className="flex items-center justify-between rounded-xl border border-black/5 bg-white/60 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-full bg-gradient-to-br from-emerald-400/40 via-cyan-400/25 to-violet-400/35" />
          <p className="text-xs font-medium text-[#0b1028]/80">{name}</p>
        </div>
        <span className="rounded-full bg-black/5 px-2 py-1 text-[11px] text-[#0b1028]/60">
          {tag}
        </span>
      </div>
    );
  }

  return (
    <section
      ref={rootRef}
      className="relative min-h-[60rem] w-full overflow-hidden bg-[#f2f4fb] pt-28"
    >
      {/* BACKGROUND IMAGE */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/HeroImage.webp')" }}
      />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto grid max-w-[100rem] grid-cols-1 items-center gap-10 px-6 pt-16 md:grid-cols-2 md:pt-24">
        {/* LEFT */}
        <div>
          <h1
            data-animate
            className="text-[40px] uppercase font-satoshi leading-[1.05] tracking-tight text-[#0b1028] sm:text-[56px] lg:text-[64px]"
          >
            Build Digital Products <br />
            That Actually <br />
            Perform
          </h1>

          <p data-animate className="mt-6 max-w-xl text-xl text-[#0b1028]/65">
            We design and build high-performance websites and digital
            experiences tailored to your business. Trusted by innovative brands
            across Africa and beyond.
          </p>

          <div
            data-animate
            className="mt-8 flex flex-col w-full md:flex-row  items-center gap-2"
          >
            <button className="rounded-full w-full bg-white/85 px-9 py-4 text-base border border-violet-300/70 cursor-pointer font-medium hover:bg-violet-100 transition-all duration-300">
              Get started
            </button>

            <button className="flex items-center w-full justify-center gap-2 rounded-full px-9 py-4 text-base font-medium cursor-pointer bg-white/35 backdrop-blur-md border border-black/10 shadow-[0_8px_24px_rgba(15,23,42,0.12)] hover:bg-white/45 hover:shadow-[0_12px_32px_rgba(15,23,42,0.18)] transition-all duration-300">
              <BriefcaseBusiness className="mr-2 inline-block" />
              View Our Work
            </button>
          </div>
        </div>

        {/* RIGHT (ready for later animation) */}
        {/* RIGHT (hero visual) */}
        <div data-animate className="relative h-[520px] w-full">
          {/* glow blobs */}
          <img src="/animal/digital-owl.webp" alt="hero image" className=" rounded-xl w-[34rem] top-0 left-50 absolute"/>
        </div>
      </div>
    </section>
  );
}
