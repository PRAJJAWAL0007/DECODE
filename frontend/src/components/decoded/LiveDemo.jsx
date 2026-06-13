import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SAMPLES = [
  "We're taking a prudent approach to capital allocation as we recalibrate spend across priority workstreams.",
  "Demand was lumpy this quarter, but we're encouraged by green shoots in the back half.",
  "We continue to navigate a dynamic operating environment with discipline and rigor.",
];

function highlightJargon(text, phrases) {
  if (!phrases || phrases.length === 0) {
    return <span>{text}</span>;
  }
  // Build a regex of all phrases, case-insensitive
  const escaped = phrases
    .filter(Boolean)
    .map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (escaped.length === 0) return <span>{text}</span>;
  const re = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(re);
  return (
    <>
      {parts.map((part, i) => {
        const isMatch = escaped.some(
          (p) => part.toLowerCase() === p.toLowerCase().replace(/\\/g, "")
        );
        return isMatch ? (
          <span key={i} className="jargon-strike">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </>
  );
}

export default function LiveDemo() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleDecode = async (e) => {
    e?.preventDefault?.();
    const value = text.trim();
    if (!value || loading) return;
    if (value.length < 4) {
      toast.error("Paste at least a full sentence.");
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const { data } = await axios.post(`${API}/decode`, { text: value });
      setResult({ original: value, ...data });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      const msg =
        typeof detail === "string"
          ? detail
          : "Translation engine unavailable. Try again in a moment.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const applySample = (s) => {
    setText(s);
    setResult(null);
  };

  return (
    <section
      id="try-it"
      data-testid="live-demo-section"
      className="relative px-6 md:px-10 py-20 md:py-28"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10 md:mb-14">
          <div>
            <div className="font-mono-doc text-[11px] tracking-[0.25em] text-[#C1442D] uppercase mb-3">
              § Live Demo — Bring Your Own Sentence
            </div>
            <h2 className="font-serif-display text-3xl md:text-5xl font-semibold text-[#0B1F2A] tracking-tight leading-tight">
              Try it. Paste a sentence.
            </h2>
          </div>
          <div className="hidden md:block font-mono-doc text-xs tracking-[0.25em] uppercase text-[#0B1F2A]/55">
            Powered by Claude · ~3 sec
          </div>
        </div>

        <motion.form
          onSubmit={handleDecode}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          data-testid="live-demo-form"
          className="bg-[#F1EFE7] border-2 border-[#0B1F2A] p-6 md:p-10"
        >
          <label
            htmlFor="decode-input"
            className="block font-mono-doc text-[11px] tracking-[0.25em] uppercase text-[#0B1F2A]/60 mb-3"
          >
            Quote from an earnings call
          </label>
          <textarea
            id="decode-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. We're taking a prudent approach to capital allocation…"
            data-testid="decode-input"
            rows={4}
            maxLength={1200}
            className="w-full bg-transparent border-b-2 border-[#0B1F2A]/30 focus:border-[#C1442D] outline-none resize-none py-3 text-lg md:text-xl font-serif-display text-[#0B1F2A] placeholder:text-[#0B1F2A]/35 leading-snug transition-colors"
          />

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="font-mono-doc text-[10px] tracking-[0.25em] uppercase text-[#0B1F2A]/50 mr-1">
              Try a sample:
            </span>
            {SAMPLES.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => applySample(s)}
                data-testid={`sample-quote-${i + 1}`}
                className="font-mono-doc text-[10px] md:text-[11px] tracking-[0.2em] uppercase border border-[#0B1F2A]/40 text-[#0B1F2A]/75 hover:border-[#C1442D] hover:text-[#C1442D] px-3 py-1.5 transition-colors"
              >
                Sample {i + 1}
              </button>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-5">
            <button
              type="submit"
              disabled={loading || !text.trim()}
              data-testid="decode-btn"
              className="group inline-flex items-center gap-3 bg-[#C1442D] text-[#F1EFE7] hover:bg-[#A33925] disabled:opacity-50 disabled:cursor-not-allowed px-7 md:px-9 py-4 md:py-5 font-mono-doc uppercase tracking-[0.18em] text-sm transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Decoding…
                </>
              ) : (
                <>
                  Decode
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </>
              )}
            </button>
            <span className="font-mono-doc text-[11px] tracking-[0.2em] uppercase text-[#0B1F2A]/55">
              {text.length}/1200 chars · 100% private
            </span>
          </div>
        </motion.form>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              data-testid="decode-result"
              className="mt-8 md:mt-10 bg-[#F1EFE7] border-2 border-[#0B1F2A] doc-shadow p-6 md:p-10 relative"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-[#0B1F2A]/40 pb-4 mb-6">
                <div className="font-mono-doc text-[11px] tracking-[0.25em] uppercase text-[#0B1F2A]/70">
                  Live Translation · Result
                </div>
                <div className="font-mono-doc text-[10px] tracking-[0.25em] uppercase text-[#C1442D] border border-[#C1442D] px-2 py-0.5">
                  {result.flagged_phrases?.length || 0} HEDGE
                  {(result.flagged_phrases?.length || 0) === 1 ? "" : "S"} FLAGGED
                </div>
              </div>

              <div className="font-mono-doc text-[10px] tracking-[0.25em] uppercase text-[#0B1F2A]/55 mb-2">
                Original
              </div>
              <blockquote
                data-testid="decode-original"
                className="font-serif-display text-xl md:text-2xl leading-snug text-[#0B1F2A]"
              >
                &ldquo;{highlightJargon(result.original, result.flagged_phrases)}&rdquo;
              </blockquote>

              <div className="mt-7 flex items-start gap-3 md:gap-5">
                <div className="font-mono-doc text-[#C1442D] text-xs md:text-sm tracking-[0.2em] uppercase shrink-0 mt-1">
                  Translation →
                </div>
                <div
                  data-testid="decode-translation"
                  className="font-mono-doc text-base md:text-lg text-[#0B1F2A] leading-relaxed"
                >
                  {result.translation}
                </div>
              </div>

              <div className="mt-7 flex items-center gap-4">
                <div className="font-mono-doc text-[10px] tracking-[0.25em] uppercase text-[#0B1F2A]/60">
                  Confidence Index
                </div>
                <div className="flex-1 h-[6px] bg-[#0B1F2A]/10 relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.confidence}%` }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="h-full bg-[#C1442D]"
                  />
                </div>
                <div
                  data-testid="decode-confidence"
                  className="font-mono-doc text-sm text-[#0B1F2A] tabular-nums"
                >
                  {result.confidence}/100
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
