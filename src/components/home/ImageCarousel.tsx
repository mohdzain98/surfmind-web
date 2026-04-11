import { useEffect, useRef, useState } from "react";
import img1 from "../../assets/1.png";
import img2 from "../../assets/2.png";
import img3 from "../../assets/3.png";
import img4 from "../../assets/4.png";

const screenshots = [
  { src: img1, alt: "SurfMind — extension popup" },
  { src: img2, alt: "SurfMind — AI search results" },
  { src: img3, alt: "SurfMind — browsing history" },
  { src: img4, alt: "SurfMind — bookmark search" },
];

function ImageWithPadding({
  src,
  alt,
  size = 200,
  shadow,
}: {
  src: string;
  alt: string;
  size?: number;
  shadow?: string;
}) {
  return (
    <div
      className="flex items-center justify-center bg-white rounded-2xl border border-clay/30"
      style={{ width: size, height: size, boxShadow: shadow, flexShrink: 0 }}
    >
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-full object-contain"
        style={{ maxWidth: size - 24, maxHeight: size - 24 }}
      />
    </div>
  );
}

export default function ImageCarousel() {
  const [activeIndex, setActiveIndex] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll to 2nd image on mount
  useEffect(() => {
    const container = containerRef.current;
    const el = itemRefs.current[1];
    if (!container || !el) return;
    container.scrollLeft =
      el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2;
  }, []);

  // Track which item is closest to center on scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      const viewCenter = container.scrollLeft + container.offsetWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const itemCenter = el.offsetLeft + el.offsetWidth / 2;
        const dist = Math.abs(viewCenter - itemCenter);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActiveIndex(closest);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="py-10 pb-16">
      <div
        ref={containerRef}
        className="flex items-center gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth"
        style={
          {
            paddingLeft: "calc(50vw - 160px)",
            paddingRight: "calc(50vw - 160px)",
            paddingTop: "2rem",
            paddingBottom: "2rem",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          } as React.CSSProperties
        }
      >
        {screenshots.map((shot, i) => (
          <div
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="snap-center flex-shrink-0 transition-all duration-500 ease-out"
            style={{
              transform: activeIndex === i ? "scale(1.09)" : "scale(0.92)",
              opacity: activeIndex === i ? 1 : 0.65,
            }}
          >
            <ImageWithPadding
              src={shot.src}
              alt={shot.alt}
              size={320}
              shadow={
                activeIndex === i
                  ? "0 25px 60px -10px rgba(26,26,26,0.22), 0 10px 20px -8px rgba(26,26,26,0.12)"
                  : "0 8px 24px -6px rgba(26,26,26,0.10)"
              }
            />
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {screenshots.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const container = containerRef.current;
              const el = itemRefs.current[i];
              if (!container || !el) return;
              container.scrollTo({
                left:
                  el.offsetLeft - (container.offsetWidth - el.offsetWidth) / 2,
                behavior: "smooth",
              });
            }}
            className={`transition-all duration-300 rounded-full ${
              activeIndex === i
                ? "w-5 h-1.5 bg-charcoal"
                : "w-1.5 h-1.5 bg-charcoal/25 hover:bg-charcoal/40"
            }`}
            aria-label={`Go to screenshot ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
