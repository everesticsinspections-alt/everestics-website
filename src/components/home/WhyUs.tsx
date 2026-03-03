"use client";

import { motion } from "framer-motion";
import { Eye, Award, Clock, FileCheck, Shield, HeartHandshake } from "lucide-react";

const ICONS = [Eye, Award, Clock, FileCheck, Shield, HeartHandshake];
const COLORS = ["#F97316", "#1B2E5C", "#F97316", "#1B2E5C", "#F97316", "#1B2E5C"];

const DEFAULT_FEATURES = [
  { title: "Independent & Unbiased", description: "We work for you — not the builder, developer, or agent. Our reports are objective, thorough, and always in your interest." },
  { title: "Fully Licensed Inspectors", description: "All inspectors hold current NSW licences and carry professional indemnity insurance. Qualified, accountable, professional." },
  { title: "Fast Report Turnaround", description: "Receive your detailed inspection report within 24 hours of the inspection — formatted for easy reading and action." },
  { title: "Detailed, Actionable Reports", description: "No jargon, no fluff. Clear findings, photographic evidence, and specific remediation recommendations." },
  { title: "Full Compliance Coverage", description: "We check against current Australian Standards and the National Construction Code so you stay fully compliant." },
  { title: "Local Knowledge, Personal Service", description: "Newcastle-based with Sydney CBD coverage. We know the local building landscape and regulations inside out." },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function WhyUs({ features = DEFAULT_FEATURES }: { features?: { title: string; description: string }[] }) {
  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest mb-4"
            style={{
              background: "rgba(249,115,22,0.07)",
              border: "1px solid rgba(249,115,22,0.18)",
              color: "#F97316",
            }}
          >
            Why Everestics
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            style={{ color: "#1B2E5C" }}
          >
            The standard others{" "}
            <span className="gradient-text-orange">should be held to.</span>
          </h2>
          <p className="text-lg" style={{ color: "#6B7280" }}>
            We built our practice on one principle: you deserve the complete picture, every time.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {features.map((feature, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            const color = COLORS[idx % COLORS.length];
            return (
              <motion.div
                key={feature.title}
                variants={item}
                className="group rounded-2xl p-7 transition-all duration-300"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E8EAED",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}
                whileHover={{
                  boxShadow: `0 6px 28px ${color}12`,
                  borderColor: `${color}30`,
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${color}10` }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <h3
                  className="text-base font-semibold mb-2"
                  style={{ color: "#1B2E5C" }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
