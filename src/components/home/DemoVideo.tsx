import { Bookmark, Search, Waypoints } from "lucide-react";

const VIDEO_ID = "37YUkre55BE";

const highlights = [
  {
    icon: Search,
    text: "Ask naturally—no exact title or URL needed.",
  },
  {
    icon: Bookmark,
    text: "Search browsing history, bookmarks, or both in one place.",
  },
  {
    icon: Waypoints,
    text: "Open the matched pages behind each answer.",
  },
];

export default function DemoVideo() {
  return (
    <section className="border-y border-clay/30 bg-white/45 px-6 py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-12">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-sage">
            See SurfMind in action
          </p>
          <h2 className="font-serif text-2xl font-semibold leading-tight text-charcoal sm:text-3xl">
            Find it again with SurfMind.
          </h2>
          <p className="mt-4 text-sm leading-7 text-charcoal/60">
            See how SurfMind searches your history and bookmarks, then turns the
            best matches into a useful answer.
          </p>

          <ul className="mt-6 space-y-4">
            {highlights.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sage/10 text-sage">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="pt-1 text-sm leading-6 text-charcoal/65">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="overflow-hidden rounded-2xl border border-clay/40 bg-charcoal shadow-[0_24px_70px_-30px_rgba(26,26,26,0.45)]">
          <div className="relative aspect-video w-full">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0`}
              title="SurfMind product demo"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
