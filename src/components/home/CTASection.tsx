"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background image with heavy dark overlay */}
      <div className="absolute inset-0">
        <Image
          src="/property-inspection-hero.jpeg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(7, 10, 24, 0.88)" }}
        />
        {/* Warm orange glow above the content */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.6), transparent)" }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-60 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ background: "#F97316" }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          {/* Label */}
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.14em]"
            style={{
              background:           "rgba(249,115,22,0.10)",
              border:               "1px solid rgba(249,115,22,0.25)",
              color:                "#FB923C",
              backdropFilter:       "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            Get Started Today
          </span>

          {/* Headline */}
          <h2
            className="text-4xl md:text-5xl font-bold leading-tight"
            style={{ color: "#F9FAFB" }}
          >
            Ready to inspect{" "}
            <span className="gradient-text-orange">with confidence?</span>
          </h2>

          {/* Subtext */}
          <p className="max-w-md text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            Request a free quote today. We&apos;ll get back to you within 4 business hours
            with a tailored inspection plan.
          </p>

          {/* Glass CTA card */}
          <div
            className="w-full max-w-xl rounded-3xl p-8 flex flex-col items-center gap-5 mt-2"
            style={{
              background:           "rgba(255,255,255,0.05)",
              backdropFilter:       "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border:               "1px solid rgba(255,255,255,0.10)",
              boxShadow:            "inset 0 1px 0 rgba(255,255,255,0.07), 0 24px 60px rgba(0,0,0,0.3)",
            }}
          >
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:justify-center">
              <Link
                href="/contact"
                className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white transition-all duration-200 hover:scale-105 hover:brightness-110 w-full sm:w-auto justify-center"
                style={{
                  background: "linear-gradient(135deg, #F97316, #EA580C)",
                  boxShadow:  "0 4px 24px rgba(249,115,22,0.40)",
                }}
              >
                Get a Free Quote <ArrowRight size={16} />
              </Link>
              <a
                href="tel:0451171987"
                className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-medium transition-all duration-200 hover:brightness-125 w-full sm:w-auto justify-center"
                style={{
                  color:      "#F9FAFB",
                  background: "rgba(255,255,255,0.07)",
                  border:     "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <Phone size={16} style={{ color: "#F97316" }} />
                0451 171 987
              </a>
            </div>

            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              Newcastle &amp; Sydney CBD · Response within 4 business hours
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
