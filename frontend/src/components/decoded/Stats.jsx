import React from "react";
import { motion } from "framer-motion";

const stats = [
  { id: 1, value: "500+", label: "Earnings calls decoded" },
  { id: 2, value: "12 min", label: "Avg. read time saved per call" },
  { id: 3, value: "94%", label: "Jargon detection accuracy" },
];

export default function Stats() {
  return (
    <section
      data-testid="stats-bar"
      className="relative border-y border-[#0B1F2A] bg-[#F1EFE7]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-[60px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
              data-testid={`stat-${s.id}`}
              className="flex flex-col items-center"
            >
              <div className="font-serif-display font-bold text-[#0B1F2A] tracking-tight leading-none text-[48px] md:text-[56px] tabular-nums">
                {s.value}
              </div>
              <div className="mt-4 font-mono-doc text-[11px] md:text-xs tracking-[0.25em] uppercase text-[#0B1F2A]/55">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
