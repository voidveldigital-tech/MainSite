import Image from "next/image";
import { useEffect, useRef } from "react";

type Props = { onFinish: () => void };

export default function IntroOverlay({ onFinish }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ctx: any;

    (async () => {
      const gsap = (await import("gsap")).default;

      const root = rootRef.current;
      if (!root) return;

      const overlay = root.querySelector("[data-overlay]");
      const logo = root.querySelector("[data-logo]");
      const glow = root.querySelector("[data-glow]");
      const words = root.querySelectorAll("[data-word]");
      const sub = root.querySelector("[data-sub]");
      const sweep = root.querySelector("[data-sweep]");

      ctx = gsap.context(() => {
        // initial states
        gsap.set(overlay, { opacity: 1 });
        gsap.set(logo, { scale: 0.85, opacity: 0, y: 10, filter: "blur(10px)" });
        gsap.set(glow, { opacity: 0, scale: 0.75 });
        gsap.set(words, { y: 26, opacity: 0, filter: "blur(8px)" });
        gsap.set(sub, { opacity: 0, y: 10 });
        gsap.set(sweep, { xPercent: -120, opacity: 0.0 });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => onFinish(),
        });

        tl.to(logo, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.75,
          ease: "expo.out",
        })
          .to(glow, { opacity: 0.65, scale: 1, duration: 0.8, ease: "expo.out" }, "<")
          // gradient sweep across the screen
          .to(sweep, { opacity: 1, duration: 0.01 }, "-=0.2")
          .to(sweep, { xPercent: 120, duration: 0.9, ease: "power2.inOut" }, "-=0.05")
          .to(sweep, { opacity: 0, duration: 0.2 }, "-=0.15")
          // slogan reveal (stagger)
          .to(words, {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.55,
            stagger: 0.07,
          }, "-=0.25")
          .to(sub, { opacity: 1, y: 0, duration: 0.35 }, "-=0.25")
          .to({}, { duration: 0.55 }) // hold
          // exit: overlay fades + slightly scales
          .to(root, { opacity: 0, scale: 1.02, duration: 0.35, ease: "power2.inOut" })
          .set(root, { display: "none" });
      }, root);
    })();

    return () => ctx?.revert?.();
  }, [onFinish]);

  const slogan = ["Design", "Build", "Ship", "Scale"];

  return (
    <div
      ref={rootRef}
      data-overlay
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#070A16]"
    >
      {/* subtle noise / vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.18),transparent_45%),radial-gradient(circle_at_70%_70%,rgba(99,102,241,0.16),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:18px_18px]" />

      {/* sweep layer */}
      <div
        data-sweep
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.22) 35%, rgba(99,102,241,0.20) 55%, transparent 100%)",
        }}
      />

      {/* content */}
      <div className="relative px-6 text-center">
        {/* glow behind logo */}
        <div
          data-glow
          className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.55) 0%, rgba(99,102,241,0.20) 45%, transparent 70%)",
          }}
        />

        {/* LOGO */}
        <div data-logo className="mx-auto mb-6 w-[410px]">
          <Image
            src="/assets/logo.webp"
            alt="VoidVel"
            width={560}
            height={560}
            priority
            className="h-auto w-full select-none"
          />
        </div>

        {/* SLOGAN */}
        <div className="font-satoshi flex flex-wrap justify-center gap-x-3 gap-y-2">
          {slogan.map((w) => (
            <span
              key={w}
              data-word
              className="text-4xl font-black tracking-tight text-white sm:text-5xl"
            >
              {w}
              <span className="text-white/30">.</span>
            </span>
          ))}
        </div>

        <p
          data-sub
          className="font-satoshi mx-auto mt-4 max-w-xl text-sm text-white/60"
        >
          High-performance digital experiences, crafted with taste and precision.
        </p>
      </div>
    </div>
  );
}
