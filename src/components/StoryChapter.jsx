/**
 * Project: Echoes of Space
 * Team: GY - NASA Space Apps Challenge 2026
 * AI-assisted development using OpenAI ChatGPT.
 * Reviewed and customized by Team GY.
 * See AI_DISCLOSURE.md for details.
 */
function StoryChapter({ number, title, children }) {
  return (
    <div className="rounded-3xl border border-purple-500/20 bg-slate-900/70 p-8 shadow-xl transition-all duration-300 hover:border-purple-400/60 hover:shadow-purple-500/20">

      <p className="mb-4 text-sm font-semibold tracking-widest text-purple-400">
        CHAPTER {number}
      </p>

      <h2 className="mb-6 text-3xl font-bold text-white">
        {title}
      </h2>

      <div className="text-lg leading-relaxed text-gray-300">
        {children}
      </div>

    </div>
  );
}

export default StoryChapter;
