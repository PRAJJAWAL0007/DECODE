import React from "react";

const phrases = [
  "near-term headwinds",
  "prudent capital allocation",
  "green shoots",
  "operational tailwinds",
  "demand normalization",
  "strategic pause",
  "transitory pressure",
  "constructive dialogue",
  "structural reset",
  "macro overhang",
];

export default function Ticker() {
  // duplicate the list for seamless scroll
  const items = [...phrases, ...phrases];

  return (
    <section
      aria-hidden="true"
      className="relative border-y-2 border-[#0B1F2A] bg-[#F1EFE7] overflow-hidden"
    >
      <div className="flex ticker-track whitespace-nowrap py-4 md:py-5">
        {items.map((p, i) => (
          <div
            key={i}
            className="flex items-center gap-6 md:gap-10 px-6 md:px-10 font-mono-doc text-xs md:text-sm uppercase tracking-[0.25em] text-[#0B1F2A]/70"
          >
            <span className="jargon-strike">&ldquo;{p}&rdquo;</span>
            <span className="text-[#C1442D]">●</span>
          </div>
        ))}
      </div>
    </section>
  );
}
