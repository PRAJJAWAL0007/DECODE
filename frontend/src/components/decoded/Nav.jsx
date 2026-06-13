import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Nav({ onRequestAccess }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 z-50 border-b-2 border-[#0B1F2A] transition-colors ${
        scrolled ? "bg-[#F1EFE7]/95 backdrop-blur-md" : "bg-[#F1EFE7]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <div className="flex items-center gap-3" data-testid="nav-logo">
          <div className="w-2.5 h-2.5 bg-[#C1442D]" />
          <span className="font-mono-doc text-base md:text-lg font-bold tracking-[0.25em] text-[#0B1F2A]">
            DECODED
          </span>
          <span className="hidden md:inline font-mono-doc text-xs text-[#0B1F2A]/60 tracking-widest ml-3">
            / FILING NO. 001-2026
          </span>
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          <a
            href="#document"
            className="hidden md:inline-block font-mono-doc text-xs tracking-widest uppercase text-[#0B1F2A]/70 hover:text-[#0B1F2A] transition-colors"
            data-testid="nav-link-document"
          >
            Specimen
          </a>
          <a
            href="#features"
            className="hidden md:inline-block font-mono-doc text-xs tracking-widest uppercase text-[#0B1F2A]/70 hover:text-[#0B1F2A] transition-colors"
            data-testid="nav-link-features"
          >
            Method
          </a>
          <button
            type="button"
            onClick={onRequestAccess}
            data-testid="nav-request-access-btn"
            className="border-2 border-[#0B1F2A] text-[#0B1F2A] hover:bg-[#0B1F2A] hover:text-[#F1EFE7] px-4 md:px-6 py-2 transition-colors font-mono-doc text-xs md:text-sm uppercase tracking-widest"
          >
            Request Access
          </button>
        </div>
      </div>
    </motion.header>
  );
}
