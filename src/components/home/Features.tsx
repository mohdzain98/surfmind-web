function IconBrain() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
      />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  );
}

function IconBookmark() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
      />
    </svg>
  );
}

function IconShield() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  );
}

function IconCog() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function IconMerge() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <circle cx="6" cy="6" r="2" fill="currentColor" stroke="none" />
      <circle cx="6" cy="18" r="2" fill="currentColor" stroke="none" />
      <circle cx="18" cy="10" r="2" fill="currentColor" stroke="none" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 8v8" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 8c0 0 0-1 2-2s4-1 6 0l4 4"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 16c2 0 8 0 10-4"
      />
    </svg>
  );
}

const features = [
  {
    icon: <IconBrain />,
    title: "Smart Tracking",
    desc: "Automatically logs the websites you visit and bookmarks you save — URL, timestamp, and key content snippets.",
  },
  {
    icon: <IconSearch />,
    title: "AI-Powered Search",
    desc: "Ask SurfMind in plain English. Vector embeddings and FAISS retrieve the most relevant pages from your history instantly.",
  },
  {
    icon: <IconBookmark />,
    title: "Bookmark Integration",
    desc: "Search through saved pages by content, not just title. Never lose a link you bookmarked months ago.",
  },
  {
    icon: <IconShield />,
    title: "Local Storage First",
    desc: "SurfMind keeps pending records locally, then securely syncs searchable data in batches or when you need fresh results.",
  },
  {
    icon: <IconCog />,
    title: "Efficient Management",
    desc: "Keeps only the most relevant history to save space. Older data is automatically cleaned up on a rolling basis.",
  },
  {
    icon: <IconMerge />,
    title: "Combined Mode",
    desc: "New search tab that searches browser history and bookmarks simultaneously — one query, complete results.",
  },
];

export default function Features() {
  return (
    <section id="features" className="scroll-mt-20 py-20 px-6 bg-white/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-medium text-sage uppercase tracking-widest mb-3">
            Features
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-charcoal">
            Everything you need to recall the web
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white/80 rounded-2xl border border-clay/30 p-6 hover:shadow-md hover:shadow-charcoal/5 transition-shadow"
            >
              <div className="w-9 h-9 rounded-xl bg-sage/10 text-sage flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-charcoal/60 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
