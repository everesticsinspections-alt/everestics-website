"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export function CTASection() {
  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ background: "#1B2E5C" }}
    >
      {/* Subtle warm glow top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[1px] pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.5), transparent)" }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "#F97316" }}
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.25)", color: "#FB923C" }}
          >
            Get Started Today
          </div>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: "#F9FAFB" }}>
            Ready to inspect{" "}
            <span className="gradient-text-orange">with confidence?</span>
          </h2>

          <p className="max-w-lg text-lg leading-relaxed" style={{ color: "#9CA3AF" }}>
            Request a free quote today. We&apos;ll get back to you within 4 business hours with a tailored inspection plan.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link
              href="/contact"
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white transition-all duration-200 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #F97316, #EA580C)", boxShadow: "0 4px 24px rgba(249,115,22,0.35)" }}
            >
              Get a Free Quote <ArrowRight size={16} />
            </Link>
            <a
              href="tel:+61200000000"
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-medium transition-all duration-200"
              style={{ color: "#F9FAFB", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <Phone size={16} style={{ color: "#F97316" }} />
              02 0000 0000
            </a>
          </div>

          <p className="text-xs" style={{ color: "#4B5563" }}>
            Newcastle &amp; Sydney CBD · Response within 4 business hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}
