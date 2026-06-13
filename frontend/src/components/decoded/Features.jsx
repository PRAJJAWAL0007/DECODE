import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    n: "01",
    key: "detect",
    title: "Detect",
    body:
      "Flags hedge words, euphemisms, and forward-looking smoke screens line-by-line — the moment they leave a CFO's mouth.",
    tag: "HEDGE LIBRARY · 2,400+ PHRASES",
  },
  {
    n: "02",
    key: "translate",
    title: "Translate",
    body:
      "Renders a plain-English readout under every flagged line. No jargon. No diplomacy. Just what they probably meant.",
    tag: "READOUT · 6th GRADE READABILITY",
  },
  {
    n: "03",
    key: "score",
    title: "Score",
    body:
      "Generates a Confidence Index per call — a single number that tells you how much of management's narrative actually holds up.",
    tag: "INDEX · 0–100 SCALE",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative px-6 md:px-10 pb-24 md:pb-36">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 border-t-2 border-[#0B1F2A] pt-10 md:pt-14">
          <div>
            <div className="font-mono-doc text-[11px] tracking-[0.25em] text-[#C1442D] uppercase mb-3">
              § Method — How Decoded Works
            </div>
            <h2 className="font-serif-display text-3xl md:text-5xl font-semibold text-[#0B1F2A] tracking-tight leading-tight max-w-3xl">
              Three steps from spin to signal.
            </h2>
          </div>
          <div className="font-mono-doc text-xs tracking-[0.25em] uppercase text-[#0B1F2A]/55">
            Sec. III / Page 2
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0 mt-12 md:mt-16 border-t border-[#0B1F2A]">
          {features.map((f, idx) => (
            <motion.div
              key={f.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              data-testid={`feature-${f.key}`}
              className={`relative py-10 md:py-14 px-2 md:px-10 group ${
                idx < features.length - 1 ? "md:border-r-2 md:border-[#0B1F2A]" : ""
              } ${idx > 0 ? "border-t-2 md:border-t-0 border-[#0B1F2A]" : ""}`}
            >
              <div className="flex items-baseline justify-between mb-6">
                <div className="font-mono-doc text-[#C1442D] text-3xl md:text-4xl font-bold tracking-tight">
                  {f.n}
                </div>
                <div className="font-mono-doc text-[10px] tracking-[0.25em] uppercase text-[#0B1F2A]/55">
                  Step {f.n} of 03
                </div>
              </div>

              <h3 className="font-serif-display text-3xl md:text-4xl font-semibold text-[#0B1F2A] mb-4 group-hover:text-[#C1442D] transition-colors">
                {f.title}
              </h3>

              <p className="font-serif-display text-lg md:text-xl text-[#0B1F2A]/85 leading-snug max-w-md">
                {f.body}
              </p>

              <div className="mt-7 inline-block font-mono-doc text-[11px] tracking-[0.25em] uppercase text-[#0B1F2A]/70 border border-[#0B1F2A]/40 px-3 py-1.5">
                {f.tag}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
