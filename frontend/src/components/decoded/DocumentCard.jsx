import React from "react";
import { motion } from "framer-motion";

const items = [
  {
    id: 1,
    speaker: "CEO, Q3 Earnings Call",
    quote:
      "We are navigating near-term headwinds while remaining confident in the long-term trajectory of the business.",
    translation:
      "Sales are down and we don't have a fix yet. Please be patient.",
    score: 32,
    tag: "HEDGE · HIGH",
  },
  {
    id: 2,
    speaker: "CFO, Guidance Update",
    quote:
      "We're taking a prudent approach to capital allocation as we recalibrate spend across priority workstreams.",
    translation:
      "We're cutting costs. Probably layoffs. We don't want to say layoffs.",
    score: 41,
    tag: "EUPHEMISM · MEDIUM",
  },
  {
    id: 3,
    speaker: "COO, Operating Review",
    quote:
      "Demand was lumpy this quarter, but we're encouraged by green shoots in the back half.",
    translation:
      "Demand collapsed. We hope it gets better. We have no proof yet.",
    score: 28,
    tag: "OPTIMISM · UNSUPPORTED",
  },
];

export default function DocumentCard() {
  return (
    <section id="document" className="relative px-6 md:px-10 pb-24 md:pb-36">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div>
            <div className="font-mono-doc text-[11px] tracking-[0.25em] text-[#C1442D] uppercase mb-3">
              Specimen — Exhibit A
            </div>
            <h2 className="font-serif-display text-3xl md:text-5xl font-semibold text-[#0B1F2A] tracking-tight leading-tight">
              Three quotes. Translated.
            </h2>
          </div>
          <div className="hidden md:block font-mono-doc text-xs text-[#0B1F2A]/55 tracking-widest uppercase">
            File · DCD-EX-A
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          data-testid="document-card"
          className="relative bg-[#F1EFE7] border-2 border-[#0B1F2A] doc-shadow p-7 md:p-14"
        >
          {/* Document header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-[#0B1F2A]/40 pb-5 mb-8 md:mb-10">
            <div className="font-mono-doc text-[11px] tracking-[0.25em] uppercase text-[#0B1F2A]/70">
              Confidential — For Analyst Review
            </div>
            <div className="font-mono-doc text-[11px] tracking-[0.25em] uppercase text-[#0B1F2A]/70">
              Decoded · v1.04
            </div>
          </div>

          {/* Stamp */}
          <motion.div
            initial={{ opacity: 0, scale: 1.6, rotate: 0 }}
            whileInView={{ opacity: 0.92, scale: 1, rotate: 14 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            data-testid="decoded-stamp"
            className="absolute top-5 right-5 md:top-10 md:right-10 select-none mix-blend-multiply pointer-events-none"
          >
            <div className="border-[3px] md:border-4 border-[#C1442D] text-[#C1442D] font-mono-doc font-bold px-4 md:px-6 py-1.5 md:py-2 text-xl md:text-3xl tracking-[0.2em]">
              DECODED
            </div>
            <div className="text-center mt-1 font-mono-doc text-[9px] md:text-[10px] text-[#C1442D] tracking-[0.3em]">
              · CERTIFIED PLAIN ENGLISH ·
            </div>
          </motion.div>

          {/* Items */}
          <div className="space-y-10 md:space-y-12">
            {items.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1 * idx }}
                data-testid={`translation-item-${item.id}`}
                className={`${idx > 0 ? "pt-10 md:pt-12 border-t border-dashed border-[#0B1F2A]/40" : ""}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="font-mono-doc text-[11px] tracking-[0.25em] uppercase text-[#0B1F2A]/70">
                    QUOTE — {item.speaker}
                  </div>
                  <div className="font-mono-doc text-[10px] tracking-[0.25em] uppercase text-[#C1442D] border border-[#C1442D] px-2 py-0.5">
                    {item.tag}
                  </div>
                </div>

                <blockquote className="font-serif-display text-2xl md:text-3xl leading-snug text-[#0B1F2A]">
                  <span className="jargon-strike">&ldquo;{item.quote}&rdquo;</span>
                </blockquote>

                <div className="mt-6 md:mt-7 flex items-start gap-3 md:gap-5">
                  <div className="font-mono-doc text-[#C1442D] text-xs md:text-sm tracking-[0.2em] uppercase shrink-0 mt-1">
                    Translation →
                  </div>
                  <div className="font-mono-doc text-base md:text-lg text-[#0B1F2A] leading-relaxed">
                    {item.translation}
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <div className="font-mono-doc text-[10px] tracking-[0.25em] uppercase text-[#0B1F2A]/60">
                    Confidence Index
                  </div>
                  <div className="flex-1 h-[6px] bg-[#0B1F2A]/10 relative overflow-hidden">
                    <div
                      className="h-full bg-[#C1442D]"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                  <div className="font-mono-doc text-sm text-[#0B1F2A] tabular-nums">
                    {item.score}/100
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Document footer */}
          <div className="mt-10 md:mt-14 pt-5 border-t border-dashed border-[#0B1F2A]/40 flex flex-wrap items-center justify-between gap-3 font-mono-doc text-[11px] tracking-[0.2em] uppercase text-[#0B1F2A]/55">
            <span>End of Exhibit A · Page 1 of 1</span>
            <span>© Decoded · All Translations Reviewed</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
