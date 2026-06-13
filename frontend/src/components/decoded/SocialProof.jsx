import React from "react";
import { motion } from "framer-motion";

const audiences = [
  "Buy-Side Analysts",
  "Fintwit",
  "Newsletter Writers",
  "Equity Research",
];

export default function SocialProof() {
  return (
    <section className="relative px-6 md:px-10 pb-20 md:pb-28">
      <div className="max-w-5xl mx-auto text-center">
        <div className="font-mono-doc text-[11px] tracking-[0.25em] text-[#C1442D] uppercase mb-4">
          § Readership
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          data-testid="social-proof-headline"
          className="font-serif-display text-3xl md:text-5xl font-semibold text-[#0B1F2A] tracking-tight leading-tight max-w-3xl mx-auto"
        >
          Built for the people who actually{" "}
          <span className="italic">read</span> the calls.
        </motion.h2>

        <p className="mt-6 max-w-2xl mx-auto font-serif-display text-lg md:text-xl text-[#0B1F2A]/80 leading-relaxed">
          Equity analysts, hedge fund associates, and independent investors use Decoded
          to skip the spin and get to the position-changing sentence.
        </p>

        <div className="mt-10 md:mt-14 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {audiences.map((label, i) => (
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              data-testid={`audience-label-${i + 1}`}
              className="border-2 border-[#0B1F2A] text-[#0B1F2A] hover:bg-[#0B1F2A] hover:text-[#F1EFE7] transition-colors font-mono-doc text-xs md:text-sm uppercase tracking-[0.2em] px-5 md:px-6 py-2.5 md:py-3 rounded-full"
            >
              {label}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
