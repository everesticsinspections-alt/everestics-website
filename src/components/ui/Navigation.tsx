"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu, X, ArrowRight, ChevronDown,
  ShieldCheck, Tag, Building2, HardHat, ClipboardCheck, FileText,
} from "lucide-react";

const SERVICE_ITEMS = [
  { id: "pre-purchase", label: "Pre-Purchase",  desc: "Buy with confidence",     icon: ShieldCheck },
  { id: "pre-sale",     label: "Pre-Sale",       desc: "Sell with certainty",     icon: Tag },
  { id: "building",    label: "Building",        desc: "Full property assessment",icon: Building2 },
  { id: "new-build",   label: "New Build",       desc: "Stage-by-stage checks",   icon: HardHat },
  { id: "handover",    label: "Handover",        desc: "Final pre-occupancy",     icon: ClipboardCheck },
  { id: "termite-pest",label: "Termite & Pest",  desc: "Protect your investment", icon: FileText },
];

const navLinks = [
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Pricing",  href: "/pricing" },
  { label: "About",    href: "/about" },
  { label: "Contact",  href: "/contact" },
];

export function Navigation() {
  const [scrolled, setScrolled]             = useState(false);
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const openDropdown  = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(label);
  };
  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 180);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
        style={{
          background: "#FFFFFF",
          borderBottom: scrolled
            ? "1px solid #E8EAED"
            : "1px solid transparent",
          boxShadow: scrolled
            ? "0 1px 16px rgba(0,0,0,0.07)"
            : "none",
        }}
      >
        <div
          className="max-w-7xl mx-auto px-6 flex items-center justify-between"
          style={{ height: "76px" }}
        >
          {/* ── Logo ─────────────────────────────────────────────────── */}
          {/* Crop window — removes the large white padding in og-image.png
              so the mountain mark + EVERESTICS text fill the full container */}
          <Link href="/" className="flex items-center shrink-0">
            <div
              className="relative overflow-hidden"
              style={{ width: "190px", height: "76px" }}
            >
              <Image
                src="/og-image.png"
                fill
                alt="Everestics"
                className="object-cover"
                style={{ objectPosition: "50% 48%" }}
                priority
                sizes="190px"
              />
            </div>
          </Link>

          {/* ── Desktop nav ──────────────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => openDropdown(link.label)}
                  onMouseLeave={closeDropdown}
                >
                  <button
                    className="flex items-center gap-1 text-sm font-medium transition-colors duration-150"
                    style={{
                      color: isActive(link.href) ? "#F97316" : "#374151",
                    }}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      style={{
                        color: "#9CA3AF",
                        transform:  activeDropdown === link.label ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                      }}
                    />
                  </button>

                  {/* Dropdown panel */}
                  <div
                    className="absolute top-full left-1/2 pt-3 w-[500px]"
                    style={{
                      transform:     activeDropdown === link.label
                        ? "translateX(-50%) translateY(0)"
                        : "translateX(-50%) translateY(-8px)",
                      opacity:       activeDropdown === link.label ? 1 : 0,
                      pointerEvents: activeDropdown === link.label ? "all" : "none",
                      transition:    "opacity 0.2s ease, transform 0.2s ease",
                    }}
                  >
                    <div
                      className="rounded-2xl p-5"
                      style={{
                        background: "#FFFFFF",
                        border:     "1px solid #E8EAED",
                        boxShadow:  "0 16px 48px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
                      }}
                    >
                      <p
                        className="text-[10px] font-semibold uppercase tracking-[0.15em] mb-4 px-1"
                        style={{ color: "#F97316" }}
                      >
                        Our Services
                      </p>

                      <div className="grid grid-cols-2 gap-1">
                        {SERVICE_ITEMS.map((s) => {
                          const Icon = s.icon;
                          return (
                            <Link
                              key={s.id}
                              href="/services"
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-100"
                              style={{ color: "inherit" }}
                              onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.background = "#F7F8FA";
                              }}
                              onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.background = "transparent";
                              }}
                            >
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                style={{ background: "rgba(249,115,22,0.08)" }}
                              >
                                <Icon size={15} style={{ color: "#F97316" }} />
                              </div>
                              <div>
                                <p className="text-sm font-medium leading-tight" style={{ color: "#1B2E5C" }}>
                                  {s.label}
                                </p>
                                <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>
                                  {s.desc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      <div
                        className="mt-3 pt-3 flex items-center justify-between"
                        style={{ borderTop: "1px solid #F3F4F6" }}
                      >
                        <Link
                          href="/services"
                          className="flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-70"
                          style={{ color: "#F97316" }}
                        >
                          View all services <ArrowRight size={12} />
                        </Link>
                        <Link
                          href="/contact"
                          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-all hover:scale-105"
                          style={{
                            background: "linear-gradient(135deg, #F97316, #EA580C)",
                          }}
                        >
                          Get a Quote
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium transition-colors duration-150 relative group"
                  style={{ color: isActive(link.href) ? "#F97316" : "#374151" }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-0.5 left-0 h-px transition-all duration-200"
                    style={{
                      width:      isActive(link.href) ? "100%" : "0%",
                      background: "#F97316",
                    }}
                  />
                </Link>
              )
            )}
          </nav>

          {/* ── Desktop CTAs ─────────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/book"
              className="text-sm font-medium transition-colors duration-150 hover:text-brand-orange"
              style={{ color: "#6B7280" }}
            >
              Book Now
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-150 hover:scale-105 hover:brightness-110"
              style={{
                background: "linear-gradient(135deg, #F97316, #EA580C)",
                boxShadow:  "0 2px 12px rgba(249,115,22,0.30)",
              }}
            >
              Get a Quote <ArrowRight size={14} />
            </Link>
          </div>

          {/* ── Mobile hamburger ─────────────────────────────────────── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg"
            style={{ color: "#374151" }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* ── Mobile overlay ───────────────────────────────────────────── */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-300"
        style={{ opacity: mobileOpen ? 1 : 0, pointerEvents: mobileOpen ? "all" : "none" }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className="absolute top-[76px] left-0 right-0 flex flex-col gap-1 px-4 py-4 bg-white"
          style={{
            borderBottom: "1px solid #E8EAED",
            boxShadow:    "0 8px 32px rgba(0,0,0,0.08)",
            transform:    mobileOpen ? "translateY(0)" : "translateY(-8px)",
            transition:   "transform 0.22s ease",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium py-3 px-3 rounded-xl transition-colors"
              style={{ color: isActive(link.href) ? "#F97316" : "#374151" }}
            >
              {link.label}
            </Link>
          ))}

          <div
            className="flex flex-col gap-3 mt-3 pt-3"
            style={{ borderTop: "1px solid #F3F4F6" }}
          >
            <Link
              href="/book"
              className="flex items-center justify-center px-5 py-3 rounded-xl text-sm font-semibold"
              style={{
                color:      "#F97316",
                background: "rgba(249,115,22,0.06)",
                border:     "1px solid rgba(249,115,22,0.18)",
              }}
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
