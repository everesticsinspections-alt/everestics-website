"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: "#1B2E5C",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.25)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: "70px" }}>
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="rounded-lg overflow-hidden" style={{ background: "#FFFFFF", padding: "4px 10px" }}>
              <Image src="/og-image.png" alt="Everestics" width={110} height={40} style={{ objectFit: "contain", display: "block" }} />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-200 relative"
                style={{ color: pathname === link.href ? "#F97316" : "rgba(255,255,255,0.75)" }}
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-px transition-all duration-200"
                  style={{ width: pathname === link.href ? "100%" : "0%", background: "#F97316" }}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/book"
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Book Now
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #F97316, #EA580C)", boxShadow: "0 2px 12px rgba(249,115,22,0.3)" }}
            >
              Get a Quote <ArrowRight size={14} />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: "rgba(255,255,255,0.8)" }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-300"
        style={{ opacity: mobileOpen ? 1 : 0, pointerEvents: mobileOpen ? "all" : "none" }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className="absolute top-[70px] left-0 right-0 flex flex-col gap-1 px-4 py-4"
          style={{
            background: "#152040",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            transform: mobileOpen ? "translateY(0)" : "translateY(-8px)",
            transition: "transform 0.25s ease",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium py-3 px-2 rounded-lg transition-colors"
              style={{ color: pathname === link.href ? "#F97316" : "rgba(255,255,255,0.8)" }}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <Link
              href="/book"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ color: "#F97316", background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)" }}
            >
              Book Now
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}
            >
              Get a Quote <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
