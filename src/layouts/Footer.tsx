"use client";

import Image from "next/image";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type FooterLink = { label: string; href: string };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Home",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Our Works", href: "#works" },
      { label: "Community", href: "#community" },
    ],
  },
  {
    title: "Features",
    links: [
      { label: "Get Started", href: "#get-started" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    title: "Social Media",
    links: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "LinkedIn", href: "https://linkedin.com" },
    ],
  },
];

function BrandMark() {
  return (
    <div className="grid h-12 w-12 place-items-center rounded-full bg-zinc-100">
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 2l2.2 6.2L20 10l-5.8 1.8L12 18l-2.2-6.2L4 10l5.8-1.8L12 2z"
          className="fill-violet-500"
        />
      </svg>
    </div>
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!footerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      // Left side: logo + paragraph
      tl.fromTo(
        '[data-anim="logo"]',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }
      ).fromTo(
        '[data-anim="text"]',
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.35"
      );

      // Right columns: stagger each column
      tl.fromTo(
        '[data-anim="col"]',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.12 },
        "-=0.2"
      );

      // Links inside columns: subtle stagger
      tl.fromTo(
        '[data-anim="link"]',
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.03 },
        "-=0.35"
      );

      // Bottom strip
      tl.fromTo(
        '[data-anim="bottom"]',
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.25"
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="w-full bg-white">
      <div className="px-16 pb-10 pt-8">
        <div className="border-t-2 border-zinc-400">
          <div className="grid w-full gap-10 px-8 py-10 md:grid-cols-12 md:gap-8">
            {/* Left brand block */}
            <div className="md:col-span-5">
              <div data-anim="logo" className="flex items-center gap-3 mb-10">
                <Image
                  src="/assets/logo.webp"
                  alt="Logo"
                  width={200}
                  height={100}
                  priority={false}
                />
              </div>

              <p
                data-anim="text"
                className="mt-4 max-w-sm text-sm leading-6 text-zinc-500"
              >
                We’re here to help you with any inquiries or project ideas you
                may have. Whether you have a question about our services,
              </p>
            </div>

            {/* Right link columns */}
            <div className="md:col-span-7 md:justify-self-end">
              <div className="grid gap-4 sm:grid-cols-3">
                {columns.map((col) => (
                  <div data-anim="col" key={col.title}>
                    <h4 className="text-xl font-satoshi text-zinc-900">
                      {col.title}
                    </h4>

                    <ul className="mt-4 space-y-3">
                      {col.links.map((l) => (
                        <li key={l.label}>
                          <a
                            data-anim="link"
                            href={l.href}
                            className="inline-block text-sm text-zinc-500 transition hover:text-zinc-900"
                          >
                            {l.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom strip */}
          <div
            data-anim="bottom"
            className="flex flex-col gap-2 border-t border-zinc-200 px-8 py-5 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between"
          >
            <span>© {new Date().getFullYear()} VoidVel. All rights reserved.</span>
            <span className="text-zinc-400">Built with care.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
