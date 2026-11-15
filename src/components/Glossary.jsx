
import { useState } from "react";
import glossary from "../data/glossary.json";

function Glossary() {
  const terms = Object.entries(glossary);
  const [activeIndex, setActiveIndex] = useState(0);

  const [term, definition] = terms[activeIndex];

  return (
    <section className="relative mt-16 overflow-hidden rounded-[32px] border border-white/10 bg-[#080d18] px-6 py-12 md:p-12">

      <style>{`
        @keyframes glossaryReveal {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .glossary-reveal {
          animation: glossaryReveal 0.5s ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .glossary-reveal {
            animation: none;
          }
        }
      `}</style>

      {/* Background Lighting */}

      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px]" />

      <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-purple-600/10 blur-[100px]" />

      <div className="relative">

        {/* Header */}

        <div className="mb-10">

          <div className="flex items-center gap-3">

            <span className="h-[2px] w-10 bg-cyan-400" />

            <p className="text-xs font-bold tracking-[0.3em] text-cyan-400">
              UNLOCK SPACE KNOWLEDGE
            </p>

          </div>

          <h2 className="mt-5 text-4xl font-black tracking-tight text-white md:text-5xl">
            Space Discovery
            <span className="text-cyan-400"> Lab.</span>
          </h2>

          <p className="mt-4 max-w-xl leading-relaxed text-gray-400">
            Every great explorer starts with curiosity.
            Select a word and discover the science behind it.
          </p>

        </div>

        {/* Interactive Discovery Area */}

        <div className="grid gap-8 md:grid-cols-[1fr_1.3fr]">

          {/* Scientific Terms */}

          <div className="flex flex-wrap content-start gap-3">

            {terms.map(([word], index) => (
              <button
                key={word}
                onClick={() => setActiveIndex(index)}
                aria-pressed={activeIndex === index}
                className={`rounded-full border px-5 py-3 text-sm transition-all duration-300 hover:-translate-y-1 ${
                  activeIndex === index
                    ? "border-cyan-400 bg-cyan-400 text-slate-950 shadow-[0_0_25px_#22d3ee40]"
                    : "border-white/10 bg-white/5 text-gray-300 hover:border-cyan-400/60"
                }`}
              >
                {word}
              </button>
            ))}

          </div>

          {/* Selected Definition */}

          <div
            key={activeIndex}
            aria-live="polite"
            className="glossary-reveal relative flex min-h-[300px] flex-col justify-center overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-950/40 to-[#0b1120] p-8"
          >

            <span
              aria-hidden="true"
              className="absolute right-5 top-0 text-[120px] font-black text-white/[0.04]"
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </span>

            <div className="relative">

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-3xl text-cyan-300">
                ✦
              </div>

              <p className="text-xs tracking-[0.3em] text-cyan-400">
                DISCOVERY {String(activeIndex + 1).padStart(2, "0")}
              </p>

              <h3 className="mt-4 text-3xl font-bold text-white md:text-4xl">
                {term}
              </h3>

              <p className="mt-5 text-lg leading-relaxed text-gray-300">
                {definition}
              </p>

            </div>

          </div>

        </div>

        {/* Bottom Navigation */}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">

          <span className="text-sm text-gray-400">
            {activeIndex + 1} / {terms.length} discoveries
          </span>

          <button
            onClick={() =>
              setActiveIndex((activeIndex + 1) % terms.length)
            }
            className="rounded-full border border-cyan-400/40 px-6 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400 hover:text-black"
          >
            Next Discovery →
          </button>

        </div>

      </div>

    </section>
  );
}

export default Glossary;
