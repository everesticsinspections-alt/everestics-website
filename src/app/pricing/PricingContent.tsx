"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ShieldCheck,
  Tag,
  Building2,
  HardHat,
  ClipboardCheck,
  FileText,
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageSquare,
  CalendarCheck,
  LucideIcon,
} from "lucide-react";
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

export function PricingContent({
  services,
  faqs,
  phone,
}: {
  services: ServiceItem[];
  faqs: { question: string; answer: string }[];
  phone: string;
}) {
  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        className="relative pt-36 pb-20 blueprint-grid overflow-hidden"
        style={{ background: "#FFFFFF" }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
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
              Transparent Pricing
            </div>
          </motion.div>
          <motion.h1
            className="text-5xl md:text-6xl font-bold leading-tight mb-5"
            style={{ color: "#1B2E5C" }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            Tailored quotes,{" "}
            <span className="gradient-text-orange">no surprises.</span>
          </motion.h1>
          <motion.p
            className="max-w-xl mx-auto text-lg leading-relaxed"
            style={{ color: "#6B7280" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            Every property is different — so every quote is specific to your inspection needs.
            New client? Get a quote. Already have one? Book and pay to lock in your date.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
          >
            <Link
              href="/book"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #F97316, #EA580C)",
                boxShadow: "0 4px 20px rgba(249,115,22,0.3)",
              }}
            >
              <CalendarCheck size={16} />
              Book Now
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-medium transition-all"
              style={{
                color: "#374151",
                background: "#F7F8FA",
                border: "1px solid #E8EAED",
              }}
            >
              <MessageSquare size={16} style={{ color: "#F97316" }} />
              Get a Free Quote
            </Link>
          </motion.div>

          {/* Explanation strip */}
          <motion.div
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45, ease }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: "#F97316" }} />
              <span className="text-xs" style={{ color: "#9CA3AF" }}>
                <span style={{ color: "#374151", fontWeight: 600 }}>Get a Quote</span> — new enquiry, we&apos;ll price your job
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: "#2563EB" }} />
              <span className="text-xs" style={{ color: "#9CA3AF" }}>
                <span style={{ color: "#374151", fontWeight: 600 }}>Book Now</span> — have a quote, ready to confirm &amp; pay
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services / Pricing cards */}
      <section
        className="pb-28"
        style={{ background: "#F7F8FA", borderTop: "1px solid #E8EAED" }}
      >
        <div className="max-w-5xl mx-auto px-6 pt-12">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <h2 className="text-3xl font-bold mb-3" style={{ color: "#1B2E5C" }}>
              Our inspection services
            </h2>
            <p style={{ color: "#6B7280" }}>
              All prices are custom-quoted based on your property. Here&apos;s what each service covers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((service, i) => {
              const Icon = ICON_MAP[service.id] ?? FileText;
              const color = COLORS[i % COLORS.length];
              return (
                <motion.div
                  key={service.id}
                  className="rounded-2xl p-7 flex flex-col relative"
                  style={{
                    background: "#FFFFFF",
                    border: service.popular ? `1.5px solid ${color}40` : "1px solid #E8EAED",
                    boxShadow: service.popular
                      ? `0 4px 24px ${color}12`
                      : "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease }}
                  whileHover={{
                    borderColor: `${color}35`,
                    boxShadow: `0 6px 28px ${color}10`,
                  }}
                >
                  {service.popular && (
                    <div
                      className="absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}
                    >
                      Most Requested
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${color}10` }}
                    >
                      <Icon size={20} style={{ color }} />
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

                  <h3 className="text-lg font-bold mb-1" style={{ color: "#1B2E5C" }}>
                    {service.title}
                  </h3>
                  <p className="text-xs font-medium mb-3" style={{ color }}>
                    {service.tagline}
                  </p>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "#6B7280" }}>
                    {service.description}
                  </p>

                  <ul className="flex flex-col gap-2 mb-6 flex-1">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 size={13} className="flex-shrink-0 mt-0.5" style={{ color }} />
                        <span className="text-xs leading-snug" style={{ color: "#6B7280" }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Dual CTA footer */}
                  <div
                    className="flex items-center gap-3 pt-4"
                    style={{ borderTop: "1px solid #E8EAED" }}
                  >
                    <Link
                      href="/book"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                      style={{
                        background: "linear-gradient(135deg, #F97316, #EA580C)",
                        boxShadow: "0 2px 12px rgba(249,115,22,0.2)",
                      }}
                    >
                      <CalendarCheck size={13} />
                      Book Now
                    </Link>
                    <Link
                      href="/contact"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all"
                      style={{
                        color: "#374151",
                        background: "#F7F8FA",
                        border: "1px solid #E8EAED",
                      }}
                    >
                      <MessageSquare size={13} style={{ color: "#F97316" }} />
                      Get a Quote
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24" style={{ background: "#FFFFFF" }}>
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <h2 className="text-3xl font-bold mb-3" style={{ color: "#1B2E5C" }}>
              Frequently asked questions
            </h2>
            <p style={{ color: "#6B7280" }}>
              Quick answers about our pricing and process.
            </p>
          </motion.div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.question}
                className="rounded-2xl p-6"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E8EAED",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
              >
                <h3 className="text-base font-semibold mb-2" style={{ color: "#1B2E5C" }}>
                  {faq.question}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — dark */}
      <section
        className="py-20 text-center relative overflow-hidden"
        style={{ background: "#1B2E5C" }}
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
              Not sure where to start?
            </h2>
            <p style={{ color: "#9CA3AF" }}>
              Tell us about your property and we&apos;ll come back with a tailored price within 4 business hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/contact"
                className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #F97316, #EA580C)",
                  boxShadow: "0 4px 24px rgba(249,115,22,0.35)",
                }}
              >
                Request a Free Quote <ArrowRight size={16} />
              </Link>
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-medium transition-all"
                style={{ color: "#F9FAFB", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <Phone size={16} style={{ color: "#F97316" }} />
                {phone}
              </a>
            </div>
            <p className="text-xs" style={{ color: "#4B5563" }}>
              Newcastle &amp; Sydney CBD · No obligation · Response within 4 business hours
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
