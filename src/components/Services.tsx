"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";

type MosaicCarouselProps = {
  title?: string;
  imagesA: string[];
  imagesB: string[];
  speedSeconds?: number;
  className?: string;
  pauseOnHover?: boolean;
};

export function MosaicCarousel({
  title,
  imagesA,
  imagesB,
  speedSeconds = 14,
  className = "",
  pauseOnHover = true,
}: MosaicCarouselProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<any>(null);

  useEffect(() => {
    let ctx: any;

    (async () => {
      const gsapModule = await import("gsap");
      const gsap = gsapModule.gsap ?? gsapModule.default;

      if (!rootRef.current || !trackRef.current) return;

      ctx = gsap.context(() => {
        gsap.set(trackRef.current!, { xPercent: 0 });

        tweenRef.current = gsap.to(trackRef.current!, {
          xPercent: -50,
          duration: speedSeconds,
          ease: "none",
          repeat: -1,
          force3D: true,
        });
      }, rootRef);
    })();

    return () => {
      tweenRef.current?.kill?.();
      tweenRef.current = null;
      ctx?.revert?.();
    };
  }, [speedSeconds, imagesA?.[0], imagesB?.[0]]);

  const onEnter = () => pauseOnHover && tweenRef.current?.pause?.();
  const onLeave = () => pauseOnHover && tweenRef.current?.resume?.();

  return (
    <div
      ref={rootRef}
      className={`relative overflow-hidden bg-neutral-100 ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {title ? (
        <div className="absolute left-4 top-4 z-20 text-sm font-medium text-black/80">
          {title}
        </div>
      ) : null}

      <div ref={trackRef} className="flex h-full w-[200%]">
        <MosaicStrip src={imagesA[0]} />
        <MosaicStrip src={imagesB[0]} />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-black/0 via-black/0 to-black/10" />
    </div>
  );
}

function MosaicStrip({ src }: { src: string }) {
  return (
    <div className="h-full w-1/2 shrink-0">
      <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />
    </div>
  );
}


type ServiceCardProps = {
  title: string;
  items: string[];
  href: string;
  variant?: "beige" | "lime";
  className?: string;
};

function ServiceCard({
  title,
  items,
  href,
  variant = "beige",
  className = "",
}: ServiceCardProps) {
  const baseBg = variant === "lime" ? "bg-[#ffbcfe]" : "bg-[#f6efe7]";

  return (
    <Link
      href={href}
      className={[
        "group relative block h-full rounded-sm p-8 transition-transform duration-300",
        baseBg,
        "hover:-translate-y-1",
        "hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30",
        className,
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-black/0 transition duration-300 group-hover:ring-black/10" />

      <h3 className="text-xl font-medium text-black/80">{title}</h3>

      <div className="mt-8 space-y-2 text-sm text-black/65">
        {items.map((it) => (
          <p key={it}>{it}</p>
        ))}
      </div>

      <div className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-black/70 transition group-hover:gap-3">
        <span>Explore</span>
        <span aria-hidden="true">→</span>
      </div>
    </Link>
  );
}

type ServicesGridProps = {
  topLeftA: string[];
  topLeftB: string[];
  bottomRightA: string[];
  bottomRightB: string[];

  strategyHref?: string;
  creativeHref?: string;
  brandingHref?: string;
  developmentHref?: string;
};

export default function ServicesGrid({
  topLeftA,
  topLeftB,
  bottomRightA,
  bottomRightB,
  strategyHref = "/services/strategy",
  creativeHref = "/services/creative",
  brandingHref = "/services/branding",
  developmentHref = "/services/development",
}: ServicesGridProps) {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[90rem] px-6 py-10">
        <h2 className="text-3xl font-satoshi text-black">Services</h2>

        <div className="mt-6 hidden gap-3 md:grid md:grid-cols-12 md:grid-rows-2">
          <MosaicCarousel
            imagesA={topLeftA}
            imagesB={topLeftB}
            speedSeconds={14}
            className="col-span-6 row-span-1 h-[410px] rounded-sm"
          />

          <div className="col-span-3 row-span-1 h-[410px]">
            <ServiceCard
              title="Strategy"
              items={["Digital Strategy", "Product Strategy", "UX / Wireframing"]}
              href={strategyHref}
              variant="beige"
            />
          </div>

          <div className="col-span-3 row-span-1 h-[410px]">
            <ServiceCard
              title="Creative"
              items={["Art Direction", "Web Design", "Design Systems"]}
              href={creativeHref}
              variant="lime"
            />
          </div>

          <div className="col-span-3 row-span-1 h-[410px]">
            <ServiceCard
              title="Branding"
              items={["Brand Strategy", "Brand Creation", "Brand Evolution"]}
              href={brandingHref}
              variant="beige"
            />
          </div>

          <div className="col-span-3 row-span-1 h-[410px]">
            <ServiceCard
              title="Development"
              items={["Websites", "Webflow", "Experimental / Immersive"]}
              href={developmentHref}
              variant="beige"
            />
          </div>

          <MosaicCarousel
            imagesA={bottomRightA}
            imagesB={bottomRightB}
            speedSeconds={14}
            className="col-span-6 row-span-1 h-[410px] rounded-sm"
          />
        </div>

        <div className="mt-6 grid gap-3 md:hidden">
          <MosaicCarousel
            imagesA={topLeftA}
            imagesB={topLeftB}
            speedSeconds={14}
            className="h-[260px]"
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <ServiceCard
              title="Strategy"
              items={["Digital Strategy", "Product Strategy", "UX / Wireframing"]}
              href={strategyHref}
              variant="beige"
              className="h-[240px]"
            />

            <ServiceCard
              title="Creative"
              items={["Art Direction", "Web Design", "Design Systems"]}
              href={creativeHref}
              variant="lime"
              className="h-[240px]"
            />

            <ServiceCard
              title="Branding"
              items={["Brand Strategy", "Brand Creation", "Brand Evolution"]}
              href={brandingHref}
              variant="beige"
              className="h-[240px]"
            />

            <ServiceCard
              title="Development"
              items={["Websites", "Webflow", "Experimental / Immersive"]}
              href={developmentHref}
              variant="beige"
              className="h-[240px]"
            />
          </div>

          <MosaicCarousel
            imagesA={bottomRightA}
            imagesB={bottomRightB}
            speedSeconds={14}
            className="h-[260px]"
          />
        </div>
      </div>
    </section>
  );
}
