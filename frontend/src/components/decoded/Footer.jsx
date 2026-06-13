import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || submitting) return;

    setSubmitting(true);
    try {
      await axios.post(`${API}/subscribe`, { email });
      setSubmitted(true);
      toast.success("You're on the list. We'll be in touch.", {
        description: "Decoded · early access roster updated.",
      });
      setEmail("");
    } catch (err) {
      const detail = err?.response?.data?.detail;
      const msg =
        Array.isArray(detail) && detail[0]?.msg
          ? detail[0].msg
          : typeof detail === "string"
          ? detail
          : "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer id="signup" className="bg-[#0B1F2A] text-[#F1EFE7] mt-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-32">
        {/* Top meta */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F1EFE7]/20 pb-5 mb-12 md:mb-16">
          <div className="font-mono-doc text-[11px] tracking-[0.25em] uppercase text-[#F1EFE7]/70">
            § Access — Early Roster
          </div>
          <div className="font-mono-doc text-[11px] tracking-[0.25em] uppercase text-[#C1442D]">
            ● ENROLLING NOW
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              data-testid="footer-heading"
              className="font-serif-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.02] text-[#F1EFE7]"
            >
              Get early access
              <br />
              to <span className="italic font-light">Decoded</span>.
            </motion.h2>

            <p className="mt-6 md:mt-8 max-w-xl font-serif-display text-lg md:text-2xl text-[#F1EFE7]/80 leading-relaxed">
              Translations of next quarter&rsquo;s calls. A Confidence Index per company.
              Delivered the morning after each earnings call.
            </p>
          </div>

          <div className="lg:col-span-5 lg:pl-8 lg:border-l border-[#F1EFE7]/20">
            <form
              onSubmit={onSubmit}
              data-testid="footer-form"
              className="w-full"
            >
              <label
                htmlFor="email"
                className="block font-mono-doc text-[11px] tracking-[0.25em] uppercase text-[#F1EFE7]/60 mb-4"
              >
                Your work email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="analyst@firm.com"
                  data-testid="email-input"
                  className="w-full bg-transparent border-b-2 border-[#F1EFE7] text-[#F1EFE7] placeholder:text-[#F1EFE7]/40 focus:outline-none focus:border-[#C1442D] py-3 text-lg md:text-xl font-mono-doc transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                data-testid="notify-me-btn"
                className="mt-8 group inline-flex items-center gap-3 bg-[#C1442D] text-[#F1EFE7] hover:bg-[#A33925] disabled:opacity-60 disabled:cursor-not-allowed px-7 md:px-9 py-4 md:py-5 font-mono-doc uppercase tracking-[0.18em] text-sm transition-colors"
              >
                {submitting ? "Sending…" : submitted ? "On the list ✓" : "Notify Me"}
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>

              <p className="mt-5 font-mono-doc text-[11px] tracking-[0.2em] uppercase text-[#F1EFE7]/50 max-w-xs leading-relaxed">
                One email per earnings season. Unsubscribe in one click.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-20 md:mt-28 pt-6 border-t border-[#F1EFE7]/20 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3" data-testid="footer-logo">
            <div className="w-2.5 h-2.5 bg-[#C1442D]" />
            <span className="font-mono-doc text-sm font-bold tracking-[0.25em] text-[#F1EFE7]">
              DECODED
            </span>
          </div>
          <div className="font-mono-doc text-[11px] tracking-[0.2em] uppercase text-[#F1EFE7]/50">
            © 2026 Decoded · A plain-English filing
          </div>
        </div>
      </div>
    </footer>
  );
}
