const steps = [
  {
    number: "01",
    title: "Track",
    desc: "SurfMind silently records pages you visit and bookmarks you save — stored locally in your browser, never in the cloud.",
  },
  {
    number: "02",
    title: "Ask",
    desc: "Type a natural language query. SurfMind converts your local history into vector embeddings on the fly.",
  },
  {
    number: "03",
    title: "Find",
    desc: "Advanced AI models analyze your query and return the most relevant pages from your history — fast.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-medium text-sage uppercase tracking-widest mb-3">
            How It Works
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-charcoal">
            Simple by design
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {steps.map((step) => (
            <div key={step.number} className="text-center sm:text-left">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-clay bg-[#f8f6f2] mb-4">
                <span className="font-serif text-sm font-semibold text-charcoal/50">
                  {step.number}
                </span>
              </div>
              <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-charcoal/60 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
