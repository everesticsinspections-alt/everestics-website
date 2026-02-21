"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, Tag, Building2, HardHat, ClipboardCheck, FileText, ArrowRight, CheckCircle2, LucideIcon } from "lucide-react";
import type { ServiceItem } from "@/lib/content";

const ease = "easeOut" as const;

const ICON_MAP: Record<string, LucideIcon> = {
  "pre-purchase": ShieldCheck,
  "pre-sale": Tag,
  "building": Building2,
  "new-build": HardHat,
  "handover": ClipboardCheck,
  "termite-pest": FileText,
};
const COLORS = ["#F97316", "#2563EB", "#F97316", "#2563EB", "#F97316", "#2563EB"];

export function ServicesContent({ services }: { services: ServiceItem[] }) {
  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        className="relative pt-36 pb-20 blueprint-grid overflow-hidden"
        style={{ background: "#FFFFFF" }}
      >
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest mb-6"
              style={{
                background: "rgba(249,115,22,0.08)",
                border: "1px solid rgba(249,115,22,0.2)",
                color: "#EA580C",
              }}
            >
              What We Do
            </div>
          </motion.div>
          <motion.h1
            className="text-5xl md:text-6xl font-bold leading-tight mb-5"
            style={{ color: "#111827" }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            Every inspection type,{" "}
            <span className="gradient-text-orange">covered.</span>
          </motion.h1>
          <motion.p
            className="max-w-xl mx-auto text-lg"
            style={{ color: "#6B7280" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            Comprehensive building inspection services for homeowners, buyers, sellers, and developers
            across Newcastle and Sydney CBD.
          </motion.p>
        </div>
      </section>

      {/* Services list */}
      <section
        className="pb-28"
        style={{ background: "#F7F8FA", borderTop: "1px solid #E8EAED" }}
      >
        <div className="max-w-5xl mx-auto px-6 pt-12 flex flex-col gap-6">
          {services.map((service, i) => {
            const Icon = ICON_MAP[service.id] ?? FileText;
            const color = COLORS[i % COLORS.length];
            return (
              <motion.div
                key={service.id}
                className="rounded-2xl p-8 md:p-10"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E8EAED",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.05 * (i % 3), ease }}
                whileHover={{
                  borderColor: `${color}30`,
                  boxShadow: `0 6px 32px ${color}0A`,
                }}
              >
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Left */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ background: `${color}10` }}
                      >
                        <Icon size={22} style={{ color }} />
                      </div>
                      <span
                        className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{
                          background: `${color}08`,
                          color,
                          border: `1px solid ${color}20`,
                        }}
                      >
                        {service.audience}
                      </span>
                    </div>

                    <h2
                      className="text-2xl font-bold mb-1"
                      style={{ color: "#111827" }}
                    >
                      {service.title}
                    </h2>
                    <p className="text-sm font-medium mb-4" style={{ color }}>
                      {service.tagline}
                    </p>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: "#6B7280" }}>
                      {service.description}
                    </p>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:scale-105"
                      style={{
                        background: "linear-gradient(135deg, #F97316, #EA580C)",
                        boxShadow: "0 2px 16px rgba(249,115,22,0.22)",
                      }}
                    >
                      Request a Quote <ArrowRight size={13} />
                    </Link>
                  </div>

                  {/* Right — includes */}
                  {service.includes.length > 0 && (
                    <div
                      className="md:w-64 lg:w-72 rounded-xl p-5 flex-shrink-0 self-start"
                      style={{
                        background: "#F7F8FA",
                        border: "1px solid #E8EAED",
                      }}
                    >
                      <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#9CA3AF" }}>
                        What&apos;s Included
                      </p>
                      <ul className="flex flex-col gap-3">
                        {service.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" style={{ color }} />
                            <span className="text-sm leading-snug" style={{ color: "#6B7280" }}>
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA — intentionally dark */}
      <section
        className="py-20 text-center relative overflow-hidden"
        style={{ background: "#111827" }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-32 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: "#F97316" }}
        />
        <div className="max-w-2xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-col items-center gap-5"
          >
            <h2 className="text-3xl font-bold" style={{ color: "#F9FAFB" }}>
              Not sure which inspection you need?
            </h2>
            <p style={{ color: "#9CA3AF" }}>
              Get in touch and we&apos;ll recommend the right service for your situation.
            </p>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #F97316, #EA580C)",
                boxShadow: "0 4px 24px rgba(249,115,22,0.35)",
              }}
            >
              Talk to Us <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
