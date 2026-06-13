import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero({ onCTAClick }) {
  return (
    <section className="relative px-6 md:px-10 pt-16 md:pt-24 pb-20 md:pb-32">
      <div className="max-w-7xl mx-auto">
        {/* Document meta line */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-3 md:gap-6 font-mono-doc text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#0B1F2A]/70 border-b border-dashed border-[#0B1F2A]/30 pb-4"
        >
          <span>Doc /</span>
          <span>Q4 — Earnings Call Decoder</span>
          <span className="hidden md:inline">/</span>
          <span className="hidden md:inline">Classified: Plain English</span>
          <span className="ml-auto text-[#C1442D]">● LIVE</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mt-10 md:mt-16">
          {/* Left: Headline */}
          <div className="lg:col-span-8">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              data-testid="hero-headline"
              className="font-serif-display text-[44px] leading-[1.02] sm:text-6xl md:text-7xl lg:text-[96px] lg:leading-[0.95] font-semibold text-[#0B1F2A] tracking-tight"
            >
              What they said.
              <br />
              <span className="italic font-light">What it</span>{" "}
              <span className="relative inline-block">
                actually
                <span className="absolute left-0 right-0 bottom-2 md:bottom-4 h-[6px] md:h-[10px] bg-[#C1442D]/80 -z-0" />
              </span>{" "}
              <span className="italic font-light">means.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-8 md:mt-10 max-w-2xl font-serif-display text-xl md:text-2xl text-[#0B1F2A]/85 leading-relaxed"
            >
              Decoded translates corporate earnings-call jargon into plain English,
              so analysts and investors can read between the lines{" "}
              <span className="font-mono-doc text-base md:text-lg text-[#C1442D]">in seconds</span>,
              not after a third re-read.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-10 md:mt-12 flex flex-wrap items-center gap-5"
            >
              <button
                type="button"
                onClick={onCTAClick}
                data-testid="hero-cta-btn"
                className="group inline-flex items-center gap-3 bg-[#C1442D] text-[#F1EFE7] hover:bg-[#A33925] px-7 md:px-9 py-4 md:py-5 font-mono-doc uppercase tracking-[0.18em] text-sm transition-colors"
              >
                Decode a Transcript
                <ArrowDown
                  size={18}
                  className="transition-transform group-hover:translate-y-0.5"
                />
              </button>
              <div className="font-mono-doc text-xs text-[#0B1F2A]/60 tracking-widest uppercase">
                No credit card. Early access list.
              </div>
            </motion.div>
          </div>

          {/* Right: side margin notes — like a redacted document */}
          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-4 lg:border-l-2 lg:border-[#0B1F2A] lg:pl-8 mt-4 lg:mt-2"
          >
            <div className="space-y-6">
              <div>
                <div className="font-mono-doc text-[11px] tracking-[0.25em] text-[#C1442D] uppercase mb-2">
                  § 01 — Premise
                </div>
                <p className="font-serif-display text-lg md:text-xl leading-snug text-[#0B1F2A]">
                  Earnings calls are written to obscure. We rewrite them so they cannot.
                </p>
              </div>
              <div>
                <div className="font-mono-doc text-[11px] tracking-[0.25em] text-[#C1442D] uppercase mb-2">
                  § 02 — Method
                </div>
                <p className="font-mono-doc text-sm md:text-[15px] leading-relaxed text-[#0B1F2A]/85">
                  Detect &gt; Translate &gt; Score.
                  <br />
                  Every quarter. Every call. Every hedge word.
                </p>
              </div>
              <div className="border-t border-dashed border-[#0B1F2A]/30 pt-4">
                <div className="font-mono-doc text-[11px] tracking-widest text-[#0B1F2A]/55 uppercase">
                  Rev. 1.04 · Internal Memo
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
