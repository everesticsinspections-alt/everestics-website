"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, ShieldCheck, Star } from "lucide-react";

const ease = "easeOut" as const;

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
              "linear-gradient(110deg, rgba(7,10,24,0.92) 0%, rgba(7,10,24,0.82) 35%, rgba(7,10,24,0.60) 60%, rgba(7,10,24,0.38) 100%)",
          }}
        />
        {/* Warm glow from bottom-left */}
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[260px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at bottom left, rgba(249,115,22,0.09) 0%, transparent 65%)",
          }}
        />
      </div>

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">

        {/* ── Left: copy ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-7">

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
                border:               "1px solid rgba(249,115,22,0.25)",
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
            className="text-5xl md:text-6xl font-bold leading-[1.07] tracking-tight"
            style={{ color: "#FFFFFF" }}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
          >
            {headline}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-lg leading-relaxed max-w-[470px]"
            style={{ color: "rgba(255,255,255,0.60)" }}
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
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white transition-all duration-150 hover:scale-105 hover:brightness-110"
              style={{
                background: "linear-gradient(135deg, #F97316, #EA580C)",
                boxShadow:  "0 4px 24px rgba(249,115,22,0.40)",
              }}
            >
              Request a Quote <ArrowRight size={16} />
            </Link>
            <Link
              href="/services"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-medium transition-all duration-150 hover:brightness-125"
              style={{
                color:                "#FFFFFF",
                background:           "rgba(255,255,255,0.08)",
                border:               "1px solid rgba(255,255,255,0.14)",
                backdropFilter:       "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              View Services
            </Link>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            className="grid grid-cols-3 rounded-2xl overflow-hidden max-w-[340px]"
            style={{
              border:               "1px solid rgba(255,255,255,0.10)",
              background:           "rgba(255,255,255,0.05)",
              backdropFilter:       "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.40, ease }}
          >
            {[
              { value: "24hr",     label: "Reports" },
              { value: "6",        label: "Services" },
              { value: "Licensed", label: "& Insured" },
            ].map((s, i) => (
              <div
                key={s.label}
                className="flex flex-col items-center py-4 px-3"
                style={{ borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none" }}
              >
                <span className="text-xl font-bold" style={{ color: "#F97316" }}>
                  {s.value}
                </span>
                <span className="text-xs mt-0.5 text-center" style={{ color: "rgba(255,255,255,0.42)" }}>
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
              height:    "460px",
              border:    "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            {/* Inspection diagram — just darken, no hue shift, preserving its natural colours */}
            <Image
              src="/standard-home-inspection-image.png"
              alt="What we inspect — standard home inspection diagram"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 0px, 45vw"
              style={{ filter: "brightness(0.55) contrast(1.05)" }}
            />

            {/* Subtle warm-navy colour wash to tie into the hero palette */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(140deg, rgba(7,10,24,0.50) 0%, rgba(27,46,92,0.30) 55%, rgba(7,10,24,0.45) 100%)",
              }}
            />

            {/* Bottom scrim for content legibility */}
            <div
              className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
              style={{
                background: "linear-gradient(to top, rgba(7,10,24,0.88) 0%, transparent 100%)",
              }}
            />

            {/* ── Floating licensed badge — top left ─────────────── */}
            <motion.div
              className="absolute top-5 left-5 flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={{
                background:           "rgba(255,255,255,0.09)",
                backdropFilter:       "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border:               "1px solid rgba(255,255,255,0.16)",
                boxShadow:            "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.70, duration: 0.5, ease }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(249,115,22,0.16)" }}
              >
                <ShieldCheck size={18} style={{ color: "#F97316" }} />
              </div>
              <div>
                <p className="text-xs font-bold leading-tight" style={{ color: "#FFFFFF" }}>
                  Fully Licensed
                </p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.50)" }}>
                  &amp; Insured in NSW
                </p>
              </div>
            </motion.div>

            {/* ── "What we check" label — top right ─────────────── */}
            <motion.div
              className="absolute top-5 right-5 px-3 py-1.5 rounded-full"
              style={{
                background:           "rgba(249,115,22,0.12)",
                border:               "1px solid rgba(249,115,22,0.25)",
                backdropFilter:       "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.80, duration: 0.5, ease }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#F97316" }}>
                What We Check
              </p>
            </motion.div>

            {/* ── Bottom content: review + stat ─────────────────── */}
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
              {/* 5-star review */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.90, duration: 0.5, ease }}
              >
                <div className="flex gap-0.5 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} fill="#F97316" style={{ color: "#F97316" }} />
                  ))}
                </div>
                <p className="text-xs font-semibold" style={{ color: "#FFFFFF" }}>
                  &ldquo;Thorough and professional&rdquo;
                </p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.42)" }}>
                  — Newcastle client
                </p>
              </motion.div>

              {/* 24hr chip */}
              <motion.div
                className="px-3 py-2 rounded-xl text-center shrink-0"
                style={{
                  background:           "rgba(255,255,255,0.08)",
                  backdropFilter:       "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border:               "1px solid rgba(255,255,255,0.12)",
                }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5, ease }}
              >
                <p className="text-lg font-bold" style={{ color: "#F97316" }}>24hr</p>
                <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.45)" }}>Report</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Smooth fade into Stats section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #F7F8FA)" }}
      />
    </section>
  );
}
