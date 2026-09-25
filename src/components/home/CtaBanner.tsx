import edgeIcon from "../../assets/edge.svg";
import { CHROME_STORE_URL, EDGE_STORE_URL } from "../../storeLinks";

function ChromeIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 8.701a3.3 3.3 0 1 1 0 6.6 3.3 3.3 0 0 1 0-6.6z" />
    </svg>
  );
}

export default function CtaBanner() {
  return (
    <section className="py-20 px-6 bg-white/50">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-charcoal mb-4">
          Never lose a page again.
        </h2>
        <p className="text-base text-charcoal/60 mb-8">
          Install SurfMind in seconds and start building a searchable record of
          your browsing — for free.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={CHROME_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-charcoal text-cream text-sm font-medium px-7 py-3.5 rounded-full hover:bg-charcoal/85 transition-colors"
          >
            <ChromeIcon />
            Add to Chrome
          </a>
          <a
            href={EDGE_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-charcoal text-cream text-sm font-medium px-7 py-3.5 rounded-full hover:bg-charcoal/85 transition-colors"
          >
            <img src={edgeIcon} alt="" aria-hidden="true" className="h-4 w-4" />
            Add to Edge
          </a>
        </div>
      </div>
    </section>
  );
}
