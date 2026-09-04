const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/surfmind-smarter-browsing/ladckalplikfcplbihpgfnlkonnpehkj";

function ChromeIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 8.701a3.3 3.3 0 1 1 0 6.6 3.3 3.3 0 0 1 0-6.6z" />
    </svg>
  );
}

function HeroBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      aria-hidden
    >
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-sage/10 blur-[100px]" />
      <div className="absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full bg-clay/20 blur-[90px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-cream/60 blur-[80px]" />

      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="heroGrid"
            x="0"
            y="0"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="#1A1A1A"
              strokeWidth="0.4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#heroGrid)" opacity="0.10" />

        <circle
          cx="-60"
          cy="-60"
          r="320"
          fill="none"
          stroke="#8DA399"
          strokeWidth="0.8"
          opacity="0.18"
        />
        <circle
          cx="-60"
          cy="-60"
          r="480"
          fill="none"
          stroke="#8DA399"
          strokeWidth="0.6"
          opacity="0.10"
        />
        <circle
          cx="-60"
          cy="-60"
          r="640"
          fill="none"
          stroke="#D8C3B5"
          strokeWidth="0.6"
          opacity="0.12"
        />
        <circle
          cx="1300"
          cy="900"
          r="380"
          fill="none"
          stroke="#D8C3B5"
          strokeWidth="0.8"
          opacity="0.16"
        />
        <circle
          cx="1300"
          cy="900"
          r="560"
          fill="none"
          stroke="#8DA399"
          strokeWidth="0.6"
          opacity="0.09"
        />

        {[
          [120, 80],
          [680, 140],
          [920, 60],
          [240, 480],
          [820, 380],
          [440, 320],
        ].map(([x, y], i) => (
          <g key={i} transform={`translate(${x}, ${y})`} opacity="0.18">
            <line
              x1="-5"
              y1="0"
              x2="5"
              y2="0"
              stroke="#1A1A1A"
              strokeWidth="0.8"
            />
            <line
              x1="0"
              y1="-5"
              x2="0"
              y2="5"
              stroke="#1A1A1A"
              strokeWidth="0.8"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <HeroBackground />

      <div className="relative text-center py-24 px-6 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-sage border border-sage/40 rounded-full px-3 py-1 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-sage inline-block" />
          Chrome Extension
        </span>

        <h1 className="font-serif text-5xl sm:text-6xl font-semibold text-charcoal leading-tight mb-5">
          Your browsing history,
          <br />
          finally searchable.
        </h1>

        <p className="text-base sm:text-lg text-charcoal/60 max-w-xl mx-auto mb-10 leading-relaxed">
          SurfMind tracks every page you visit and bookmark you save, then lets
          you find any of them instantly — just describe what you remember.
        </p>

        <div className="flex items-center justify-center">
          <a
            href={CHROME_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-charcoal text-cream text-sm font-medium px-6 py-3 rounded-full hover:bg-charcoal/85 transition-colors"
          >
            <ChromeIcon />
            Add to Chrome — it's free
          </a>
        </div>
      </div>
    </section>
  );
}
