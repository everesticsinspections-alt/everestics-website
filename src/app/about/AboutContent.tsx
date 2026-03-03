"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Target, Eye, Users, Award } from "lucide-react";

const ease = "easeOut" as const;

const values = [
  {
    icon: Target,
    title: "Precision First",
    description:
      "Every inspection is methodical and thorough. We don't cut corners — and we make sure your build doesn't either.",
    color: "#F97316",
  },
  {
    icon: Eye,
    title: "Complete Transparency",
    description:
      "No vague language. Our reports are clear, documented with photographs, and written for real people — not just engineers.",
    color: "#1B2E5C",
  },
  {
    icon: Users,
    title: "Client-First Always",
    description:
      "We work for you, not the developer or agent. Our independence is our greatest asset — and yours.",
    color: "#F97316",
  },
  {
    icon: Award,
    title: "Licensed & Accountable",
    description:
      "Every inspector holds current NSW licences and professional indemnity. We stand behind every report we issue.",
    color: "#1B2E5C",
  },
];

export function AboutContent({ storyP1, storyP2 }: { storyP1: string; storyP2: string }) {
  return (
    <div style={{ background: "#FFFFFF" }}>
      {/* Hero */}
      <section
        className="relative pt-40 pb-28 overflow-hidden blueprint-grid"
        style={{ background: "#FFFFFF" }}
      >
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0, ease }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest mb-6"
              style={{
                background: "rgba(249,115,22,0.08)",
                border: "1px solid rgba(249,115,22,0.2)",
                color: "#EA580C",
              }}
            >
              About Everestics
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl font-bold leading-tight mb-6"
            style={{ color: "#1B2E5C" }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            Built on expertise.{" "}
            <span className="gradient-text-orange">Driven by integrity.</span>
          </motion.h1>

          <motion.p
            className="max-w-2xl mx-auto text-lg leading-relaxed"
            style={{ color: "#6B7280" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            Everestics was founded with a clear purpose: give property buyers, developers,
            and builders the independent insight they need to make confident decisions.
            We&apos;ve grown into one of Newcastle&apos;s most trusted inspection firms — and we take that trust seriously.
          </motion.p>
        </div>
      </section>

      {/* Full-width property image banner */}
      <div className="relative w-full overflow-hidden" style={{ height: "360px" }}>
        <Image
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80"
          alt="Building inspector reviewing a property"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(17,24,39,0.55) 0%, rgba(17,24,39,0.2) 60%, transparent 100%)" }}
        />
        <div className="absolute inset-0 flex items-center px-8 md:px-16 max-w-7xl mx-auto">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "rgba(249,115,22,0.9)" }}>
              Our Commitment
            </p>
            <p className="text-2xl md:text-3xl font-bold max-w-md leading-snug" style={{ color: "#FFFFFF" }}>
              Every inspection. Every report. Every time.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <section
        className="py-24 relative"
        style={{ background: "#F7F8FA", borderTop: "1px solid #E8EAED", borderBottom: "1px solid #E8EAED" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
            >
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest mb-5"
                style={{
                  background: "rgba(249,115,22,0.08)",
                  border: "1px solid rgba(249,115,22,0.2)",
                  color: "#EA580C",
                }}
              >
                Our Story
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold leading-tight mb-6"
                style={{ color: "#1B2E5C" }}
              >
                Founded in Newcastle. Built on one standard.
              </h2>
              <div className="flex flex-col gap-4" style={{ color: "#6B7280" }}>
                <p className="text-base leading-relaxed">{storyP1}</p>
                <p className="text-base leading-relaxed">{storyP2}</p>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              {/* Property inspection photo */}
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{ height: "380px", boxShadow: "0 16px 48px rgba(0,0,0,0.1)", border: "1px solid #E8EAED" }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                  alt="Modern residential property for inspection"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(17,24,39,0.6) 0%, transparent 55%)" }}
                />
                {/* Overlaid stats */}
                <div className="absolute bottom-0 left-0 right-0 p-6 grid grid-cols-2 gap-3">
                  {[
                    { value: "24hr", label: "Reports" },
                    { value: "6", label: "Services" },
                    { value: "Licensed", label: "& Insured" },
                    { value: "2", label: "Regions" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl px-4 py-3"
                      style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.18)" }}
                    >
                      <p className="text-2xl font-bold" style={{ color: "#FFFFFF" }}>{stat.value}</p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24" style={{ background: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center max-w-xl mx-auto mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "#1B2E5C" }}
            >
              What we stand for
            </h2>
            <p style={{ color: "#6B7280" }}>
              Four principles that shape every inspection we conduct.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  className="rounded-2xl p-7 flex gap-5"
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E8EAED",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease }}
                  whileHover={{ boxShadow: `0 6px 24px ${val.color}12`, borderColor: `${val.color}30` }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${val.color}10` }}
                  >
                    <Icon size={22} style={{ color: val.color }} />
                  </div>
                  <div>
                    <h3
                      className="text-base font-semibold mb-2"
                      style={{ color: "#1B2E5C" }}
                    >
                      {val.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                      {val.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA — photo-backed, matches home CTASection */}
      <section className="relative py-28 text-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/property-inspection-hero.jpeg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: "rgba(7,10,24,0.88)" }} />
          {/* Orange top glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.6), transparent)" }}
          />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-56 rounded-full blur-3xl opacity-14 pointer-events-none"
            style={{ background: "#F97316" }}
          />
        </div>

        <div className="max-w-2xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-col items-center gap-5"
          >
            <span
              className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.14em]"
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

            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#F9FAFB" }}>
              Ready to work with us?
            </h2>
            <p className="max-w-md text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              Get a free, no-obligation quote for your inspection today.
            </p>

            {/* Glass card wrapping the CTA */}
            <div
              className="w-full max-w-lg rounded-3xl p-7 flex flex-col items-center gap-4 mt-1"
              style={{
                background:           "rgba(255,255,255,0.05)",
                backdropFilter:       "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border:               "1px solid rgba(255,255,255,0.10)",
                boxShadow:            "inset 0 1px 0 rgba(255,255,255,0.07), 0 24px 60px rgba(0,0,0,0.3)",
              }}
            >
              <Link
                href="/contact"
                className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white transition-all hover:scale-105 hover:brightness-110 w-full sm:w-auto justify-center"
                style={{
                  background: "linear-gradient(135deg, #F97316, #EA580C)",
                  boxShadow:  "0 4px 24px rgba(249,115,22,0.40)",
                }}
              >
                Request a Free Quote <ArrowRight size={16} />
              </Link>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.30)" }}>
                Newcastle &amp; Sydney CBD · No obligation · Response within 4 business hours
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
