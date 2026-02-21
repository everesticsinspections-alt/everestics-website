"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, ShieldCheck, Star } from "lucide-react";

const ease = "easeOut" as const;

// Curated Unsplash photos — modern Australian residential/commercial properties
const HERO_PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
    alt: "Modern residential home exterior",
  },
  {
    src: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
    alt: "Contemporary suburban property",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    alt: "Modern home with clean architecture",
  },
];

export function Hero({
  headline = "Building Inspections You Can Trust.",
  subheadline = "Everestics delivers clear, accurate, and actionable insights for homeowners, buyers, sellers, and investors — backed by technical expertise and personal service.",
}: {
  headline?: string;
  subheadline?: string;
}) {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden blueprint-grid"
      style={{ background: "#FFFFFF" }}
    >
      {/* Soft colour wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(249,115,22,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-28 lg:py-0 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen">

        {/* ── Left column: copy ───────────────────────────────────────── */}
        <div className="flex flex-col gap-7">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide"
              style={{
                background: "rgba(249,115,22,0.08)",
                border: "1px solid rgba(249,115,22,0.2)",
                color: "#EA580C",
              }}
            >
              <MapPin size={12} />
              Newcastle &amp; Sydney CBD
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-5xl md:text-6xl font-bold leading-tight tracking-tight"
            style={{ color: "#1B2E5C" }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
          >
            {headline}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-lg leading-relaxed max-w-lg"
            style={{ color: "#6B7280" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease }}
          >
            {subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-start gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26, ease }}
          >
            <Link
              href="/contact"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white transition-all duration-200 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #F97316, #EA580C)",
                boxShadow: "0 4px 20px rgba(249,115,22,0.3)",
              }}
            >
              Request a Quote <ArrowRight size={16} />
            </Link>
            <Link
              href="/services"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-medium transition-all duration-200"
              style={{ color: "#374151", background: "#F7F8FA", border: "1px solid #E8EAED" }}
            >
              View Services
            </Link>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            className="grid grid-cols-3 divide-x rounded-2xl overflow-hidden max-w-sm"
            style={{ border: "1px solid #E8EAED" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38, ease }}
          >
            {[
              { value: "24hr", label: "Reports" },
              { value: "6", label: "Services" },
              { value: "Licensed", label: "& Insured" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col items-center py-4 px-3"
                style={{
                  background: "#FAFAFA",
                  borderLeft: i > 0 ? "1px solid #E8EAED" : "none",
                }}
              >
                <span className="text-xl font-bold" style={{ color: "#F97316" }}>
                  {stat.value}
                </span>
                <span className="text-xs mt-0.5 text-center" style={{ color: "#9CA3AF" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right column: image mosaic ──────────────────────────────── */}
        <motion.div
          className="hidden lg:block relative"
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          {/* Main large image */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              height: "420px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
              border: "1px solid #E8EAED",
            }}
          >
            <Image
              src={HERO_PHOTOS[0].src}
              alt={HERO_PHOTOS[0].alt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 0px, 50vw"
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, rgba(17,24,39,0.25) 0%, transparent 60%)",
              }}
            />
          </div>

          {/* Bottom row — two smaller images */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {HERO_PHOTOS.slice(1).map((photo) => (
              <div
                key={photo.src}
                className="relative rounded-2xl overflow-hidden"
                style={{
                  height: "160px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  border: "1px solid #E8EAED",
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            ))}
          </div>

          {/* Floating trust card */}
          <motion.div
            className="absolute top-6 -left-6 rounded-2xl px-4 py-3 flex items-center gap-3"
            style={{
              background: "#FFFFFF",
              border: "1px solid #E8EAED",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5, ease }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(249,115,22,0.1)" }}
            >
              <ShieldCheck size={18} style={{ color: "#F97316" }} />
            </div>
            <div>
              <p className="text-xs font-bold" style={{ color: "#1B2E5C" }}>Fully Licensed</p>
              <p className="text-xs" style={{ color: "#9CA3AF" }}>& Insured Inspector</p>
            </div>
          </motion.div>

          {/* Floating review card */}
          <motion.div
            className="absolute -bottom-4 -right-4 rounded-2xl px-4 py-3"
            style={{
              background: "#FFFFFF",
              border: "1px solid #E8EAED",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              maxWidth: "180px",
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5, ease }}
          >
            <div className="flex gap-0.5 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={11} fill="#F97316" style={{ color: "#F97316" }} />
              ))}
            </div>
            <p className="text-xs font-semibold" style={{ color: "#1B2E5C" }}>
              &ldquo;Thorough and professional&rdquo;
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>— Newcastle client</p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
