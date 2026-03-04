"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, ShieldCheck, ChevronDown } from "lucide-react";

const ease = "easeOut" as const;

/** Renders the headline with the last word in an orange gradient */
function HeadlineWithAccent({ text }: { text: string }) {
  const words = text.trim().split(" ");
  const last = words.pop() ?? "";
  const rest = words.join(" ");
  return (
    <>
      {rest}{" "}
      <span
        style={{
          background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {last}
      </span>
    </>
  );
}


export function Hero({
  headline    = "Building Inspections You Can Trust.",
  subheadline = "Everestics delivers clear, accurate, and actionable insights for homeowners, buyers, sellers, and investors — backed by technical expertise and personal service.",
}: {
  headline?:    string;
  subheadline?: string;
}) {
  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: "100vh", paddingTop: "76px" }}
    >
      {/* ── Full-bleed background ─────────────────────────────────── */}
      <div className="absolute inset-0" style={{ top: "76px" }}>
        <Image
          src="/property-inspection-hero.jpeg"
          alt="Property under inspection"
          fill
          className="object-cover object-center"
          priority
          quality={90}
          sizes="100vw"
        />
        {/* Cinematic overlay — dark on left for text, clears toward right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, rgba(7,10,24,0.94) 0%, rgba(7,10,24,0.86) 38%, rgba(7,10,24,0.62) 62%, rgba(7,10,24,0.40) 100%)",
          }}
        />
        {/* Warm glow from bottom-left */}
        <div
          className="absolute bottom-0 left-0 w-[700px] h-[320px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at bottom left, rgba(249,115,22,0.13) 0%, transparent 65%)",
          }}
        />
        {/* Subtle dot-grid texture for modern depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">

        {/* ── Left: copy ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-6">

          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide"
              style={{
                background:           "rgba(249,115,22,0.10)",
                border:               "1px solid rgba(249,115,22,0.28)",
                color:                "#FB923C",
                backdropFilter:       "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              <MapPin size={11} />
              Newcastle &amp; Sydney CBD
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-[64px] font-bold leading-[1.06] tracking-tight"
            style={{ color: "#FFFFFF" }}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
          >
            <HeadlineWithAccent text={headline} />
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-lg leading-relaxed max-w-[480px]"
            style={{ color: "rgba(255,255,255,0.75)" }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease }}
          >
            {subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-start gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease }}
          >
            <Link
              href="/contact"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-100"
              style={{
                background: "linear-gradient(135deg, #F97316, #EA580C)",
                boxShadow:  "0 4px 28px rgba(249,115,22,0.48)",
              }}
            >
              Request a Free Quote <ArrowRight size={16} />
            </Link>
            <Link
              href="/services"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-medium transition-all duration-200 hover:brightness-125"
              style={{
                color:                "#FFFFFF",
                background:           "rgba(255,255,255,0.08)",
                border:               "1px solid rgba(255,255,255,0.16)",
                backdropFilter:       "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              View Services
            </Link>
          </motion.div>

          {/* Micro-copy */}
          <motion.p
            className="text-xs -mt-2"
            style={{ color: "rgba(255,255,255,0.38)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.38, ease }}
          >
            Free quote · No obligation · Licensed &amp; insured inspectors
          </motion.p>

          {/* Stats strip — 4 columns */}
          <motion.div
            className="grid grid-cols-4 rounded-2xl overflow-hidden"
            style={{
              border:               "1px solid rgba(255,255,255,0.10)",
              background:           "rgba(255,255,255,0.05)",
              backdropFilter:       "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              maxWidth: "420px",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.46, ease }}
          >
            {[
              { value: "5.0 ★", label: "Avg. Rating" },
              { value: "24hr",  label: "Reports" },
              { value: "6",     label: "Services" },
              { value: "NSW",   label: "Licensed" },
            ].map((s, i) => (
              <div
                key={s.label}
                className="flex flex-col items-center py-4 px-2"
                style={{ borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none" }}
              >
                <span className="text-sm font-bold leading-tight" style={{ color: "#F97316" }}>
                  {s.value}
                </span>
                <span className="text-[10px] mt-0.5 text-center" style={{ color: "rgba(255,255,255,0.42)" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: inspection diagram card ────────────────────────── */}
        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.22, ease }}
        >
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              height:    "490px",
              border:    "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            {/* Image — full quality, no filter */}
            <Image
              src="/standard-home-inspection-image.png"
              alt="What we inspect — standard home inspection diagram"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 0px, 45vw"
            />

            {/* ── Floating licensed badge — top left ─────────────── */}
            <motion.div
              className="absolute top-5 left-5 flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={{
                background:           "rgba(7,10,24,0.65)",
                backdropFilter:       "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border:               "1px solid rgba(255,255,255,0.14)",
                boxShadow:            "0 8px 32px rgba(0,0,0,0.25)",
              }}
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.70, duration: 0.5, ease }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(249,115,22,0.18)" }}
              >
                <ShieldCheck size={18} style={{ color: "#F97316" }} />
              </div>
              <div>
                <p className="text-xs font-bold leading-tight" style={{ color: "#FFFFFF" }}>
                  Fully Licensed
                </p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                  &amp; Insured in NSW
                </p>
              </div>
            </motion.div>

            {/* ── "What we check" label — top right ─────────────── */}
            <motion.div
              className="absolute top-5 right-5 px-3 py-1.5 rounded-full"
              style={{
                background:           "rgba(249,115,22,0.90)",
                border:               "1px solid rgba(249,115,22,0.40)",
                backdropFilter:       "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.80, duration: 0.5, ease }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#FFFFFF" }}>
                What We Check
              </p>
            </motion.div>

          </div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6, ease }}
      >
        <span className="text-[9px] uppercase tracking-widest font-medium" style={{ color: "rgba(255,255,255,0.30)" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown size={15} style={{ color: "rgba(255,255,255,0.30)" }} />
        </motion.div>
      </motion.div>

      {/* Smooth fade into Stats section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #F7F8FA)" }}
      />
    </section>
  );
}
