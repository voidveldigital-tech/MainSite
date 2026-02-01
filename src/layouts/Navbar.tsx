import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const NAV = [
  { label: "Pricing", href: "#pricing" },
  { label: "Api for Developer", href: "#api" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setVisible(true);
    } else {
      const t = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Lock scroll when menu open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      {/* NAVBAR (always top) */}
      <header className="fixed inset-x-0 top-4 z-[9999] pointer-events-none">
        <div className="mx-auto max-w-7xl px-4 pointer-events-auto">
          <div className="relative flex h-16 items-center justify-between rounded-2xl border border-white/40 bg-white/35 px-4 shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl">
            {/* Brand */}
            <Link href="/">
              <Image
                src="/assets/logo.webp"
                alt="Logo"
                className="p-5"
                width={150}
                height={40}
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-8 text-sm text-[#0b1028]/70 md:flex">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="hover:text-[#0b1028] transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="hidden text-sm text-[#0b1028]/70 hover:text-[#0b1028] transition-colors md:inline-flex"
              >
                Log In
              </Link>

              <Link
                href="/apply"
                className="hidden rounded-full bg-[#121433] px-5 py-2 text-sm font-medium text-white shadow-[0_12px_30px_rgba(18,20,51,0.25)] hover:bg-[#0e102a] transition-colors md:inline-flex"
              >
                Apply Now
              </Link>

              {/* Mobile toggle */}
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center rounded-xl border border-white/45 bg-white/30 p-2 text-[#0b1028] shadow-sm backdrop-blur-md hover:bg-white/40 transition-colors md:hidden"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE OVERLAY (below navbar, above page) */}
      {visible && (
        <div className="fixed inset-0 z-[9998] md:hidden">
          {/* BACKDROP */}
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className={` absolute inset-0 bg-black/20 backdrop-blur-[1px] transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
          />

          {/* MENU SHEET */}
          <div
            className={` absolute left-1/2 top-[92px] w-[calc(100%-2rem)] -translate-x-1/2 rounded-2xl border border-white/45 bg-white/65 p-4 shadow-[0_30px_80px_rgba(15,23,42,0.30)] backdrop-blur-xl transition-all duration-200 ease-out
        ${open ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-[0.98]"} `}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[#0b1028]">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-xl border border-black/10 bg-white/60 text-[#0b1028] hover:bg-white transition-colors"
                aria-label="Close menu button"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-3 grid gap-2">
              {NAV.map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  style={{ transitionDelay: `${open ? i * 40 : 0}ms` }}
                  className={` rounded-xl px-3 py-2 text-sm text-[#0b1028]/80 hover:bg-white/70 transition-all duration-200 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-xl border border-black/10 bg-white/70 px-4 py-2 text-center text-sm text-[#0b1028] hover:bg-white transition-colors"
              >
                Log In
              </Link>

              <Link
                href="/apply"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-xl bg-[#121433] px-4 py-2 text-center text-sm font-medium text-white hover:bg-[#0e102a] transition-colors"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
