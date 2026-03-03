"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, Tag, Building2, HardHat, ClipboardCheck, FileText, ArrowRight, LucideIcon } from "lucide-react";
import type { ServiceItem } from "@/lib/content";

const ICON_MAP: Record<string, LucideIcon> = {
  "pre-purchase": ShieldCheck,
  "pre-sale": Tag,
  "building": Building2,
  "new-build": HardHat,
  "handover": ClipboardCheck,
  "termite-pest": FileText,
};
const COLORS = ["#F97316", "#1B2E5C", "#F97316", "#1B2E5C", "#F97316", "#1B2E5C"];

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: "pre-purchase",
    title: "Pre-Purchase Property Inspections",
    tagline: "Buy with confidence.",
    description:
      "Know exactly what you're buying before you sign. We identify hidden defects, structural issues, and safety risks so there are no costly surprises after settlement.",
    includes: [],
    audience: "Buyers",
    popular: true,
  },
  {
    id: "pre-sale",
    title: "Pre-Sale Inspections",
    tagline: "Sell with certainty.",
    description:
      "Understand your property's condition before listing. Address issues proactively, price realistically, and build buyer confidence from day one.",
    includes: [],
    audience: "Sellers",
    popular: false,
  },
  {
    id: "building",
    title: "Building Inspections",
    tagline: "Know your property inside out.",
    description:
      "Detailed examinations uncovering structural issues, safety risks, and essential maintenance needs for residential and commercial properties.",
    includes: [],
    audience: "Owners",
    popular: false,
  },
  {
    id: "new-build",
    title: "New Build Inspections",
    tagline: "Verify before you accept.",
    description:
      "Independent assessments at key construction stages — checking workmanship, structural elements, finishes, and compliance before handover.",
    includes: [],
    audience: "Builders & buyers",
    popular: false,
  },
  {
    id: "handover",
    title: "Handover Inspections",
    tagline: "Don't sign until it's right.",
    description:
      "Final pre-occupancy checks that document defects so builders can complete corrections before you take possession.",
    includes: [],
    audience: "New home buyers",
    popular: false,
  },
  {
    id: "termite-pest",
    title: "Termite & Pest Inspections",
    tagline: "Protect your investment.",
    description:
      "Thorough pest and termite assessments identifying active infestations and conditions conducive to pest activity before they become costly problems.",
    includes: [],
    audience: "All property owners",
    popular: false,
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function ServicesGrid({ services = DEFAULT_SERVICES }: { services?: ServiceItem[] }) {
  return (
    <section
      className="py-28 relative"
      style={{ background: "#F7F8FA", borderTop: "1px solid #E8EAED", borderBottom: "1px solid #E8EAED" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="max-w-2xl mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest mb-4"
            style={{
              background: "rgba(249,115,22,0.08)",
              border: "1px solid rgba(249,115,22,0.2)",
              color: "#EA580C",
            }}
          >
            What We Do
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            style={{ color: "#1B2E5C" }}
          >
            Every inspection type,{" "}
            <span className="gradient-text-orange">covered.</span>
          </h2>
          <p className="text-lg" style={{ color: "#6B7280" }}>
            From the moment land breaks to the final handover — we inspect at every critical stage.
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Featured large card */}
          <motion.div
            variants={item}
            className="md:col-span-1 md:row-span-2 group relative overflow-hidden rounded-2xl p-8 flex flex-col justify-between min-h-72"
            style={{
              background: "#FFFFFF",
              border: "1px solid #E8EAED",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              transition: "border-color 0.3s, box-shadow 0.3s",
            }}
            whileHover={{
              boxShadow: "0 8px 32px rgba(249,115,22,0.1)",
              borderColor: "rgba(249,115,22,0.3)",
            }}
          >
            {(() => {
              const featured = services[0];
              const FeaturedIcon = ICON_MAP[featured.id] ?? ShieldCheck;
              return (
                <div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{ background: "rgba(249,115,22,0.08)" }}
                  >
                    <FeaturedIcon size={24} style={{ color: "#F97316" }} />
                  </div>
                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ color: "#1B2E5C" }}
                  >
                    {featured.title}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: "#6B7280" }}>
                    {featured.description}
                  </p>
                </div>
              );
            })()}

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all"
              style={{ color: "#F97316" }}
            >
              Book this inspection <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Smaller cards */}
          {services.slice(1).map((service, i) => {
            const Icon = ICON_MAP[service.id] ?? FileText;
            const color = COLORS[(i + 1) % COLORS.length];
            return (
              <motion.div
                key={service.id}
                variants={item}
                className="group relative overflow-hidden rounded-2xl p-6 flex flex-col gap-4"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E8EAED",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                whileHover={{
                  boxShadow: `0 6px 24px ${color}14`,
                  borderColor: `${color}35`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}10` }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <div>
                  <h3
                    className="text-base font-semibold mb-1.5"
                    style={{ color: "#1B2E5C" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: "#6B7280" }}
          >
            View all services
            <ArrowRight size={14} style={{ color: "#F97316" }} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
