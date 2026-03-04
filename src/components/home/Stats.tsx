"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 24, suffix: "hr", label: "Report Turnaround", description: "Delivered same or next day" },
  { value: 6, suffix: "", label: "Inspection Types", description: "Residential & commercial" },
  { value: 2, suffix: "", label: "Service Regions", description: "Newcastle & Sydney CBD" },
  { value: 6, suffix: " days", label: "Available", description: "Monday to Saturday" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += target / steps;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function Stats() {
  return (
    <section className="py-20" style={{ background: "#F7F8FA", borderBottom: "1px solid #E8EAED" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <motion.p
          className="text-center text-xs font-semibold uppercase tracking-widest mb-10"
          style={{ color: "#F97316" }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
        >
          By the numbers
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center text-center py-8 px-6 rounded-2xl relative overflow-hidden"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E8EAED",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }}
            >
              {/* Accent top border */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: i % 2 === 0 ? "#F97316" : "#1B2E5C" }}
              />
              <div
                className="text-4xl md:text-5xl font-bold tabular-nums mb-1"
                style={{ color: i % 2 === 0 ? "#F97316" : "#1B2E5C" }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-semibold mb-0.5" style={{ color: "#1B2E5C" }}>
                {stat.label}
              </div>
              <div className="text-xs" style={{ color: "#9CA3AF" }}>
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
