import { CHROME_STORE_URL, EDGE_STORE_URL } from "../storeLinks";
import { useEffect, useRef, useState } from "react";
import { Puzzle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import webstoreIcon from "../assets/webstore.png";
import edgeIcon from "../assets/edge.svg";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/#features", label: "Features" },
  { to: "/#how-it-works", label: "How It Works" },
  { to: "/contact", label: "Contact" },
];

function ChromeStoreLink() {
  return (
    <a
      href={CHROME_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get SurfMind from the Chrome Web Store"
      title="Chrome Web Store"
      className="group inline-flex h-9 w-9 items-center justify-center"
    >
      <img
        src={webstoreIcon}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="h-5 w-auto object-contain transition-transform duration-200 group-hover:scale-110"
      />
    </a>
  );
}

function EdgeStoreLink() {
  return (
    <a
      href={EDGE_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get SurfMind from Microsoft Edge Add-ons"
      title="Microsoft Edge Add-ons"
      className="group inline-flex h-9 w-9 items-center justify-center"
    >
      <img
        src={edgeIcon}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="h-5 w-5 object-contain transition-transform duration-200 group-hover:scale-110"
      />
    </a>
  );
}

export default function Navbar() {
  const { pathname, hash } = useLocation();
  const [open, setOpen] = useState(false);
  const [storesOpen, setStoresOpen] = useState(false);
  const storesRef = useRef<HTMLDivElement>(null);
  const storesButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!storesOpen) return;
    function closeOutside(event: PointerEvent) {
      if (!storesRef.current?.contains(event.target as Node))
        setStoresOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setStoresOpen(false);
        storesButtonRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [storesOpen]);

  const isActive = (to: string) => {
    const [linkPath, linkHash = ""] = to.split("#");
    return pathname === linkPath && hash === (linkHash ? `#${linkHash}` : "");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#f8f6f2]/90 backdrop-blur-sm border-b border-clay/40">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
        {/* Logo */}
        <Link
          to="/"
          className="font-serif text-xl font-semibold text-charcoal tracking-tight"
        >
          SurfMind
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors ${
                isActive(link.to)
                  ? "text-charcoal"
                  : "text-charcoal/50 hover:text-charcoal"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-1">
            <ChromeStoreLink />
            <EdgeStoreLink />
          </div>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-1 sm:hidden">
          <div
            ref={storesRef}
            className="relative"
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget))
                setStoresOpen(false);
            }}
          >
            <button
              ref={storesButtonRef}
              type="button"
              aria-label="Install SurfMind extension"
              aria-expanded={storesOpen}
              aria-controls="mobile-extension-links"
              onClick={() => {
                setStoresOpen((current) => !current);
                setOpen(false);
              }}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-charcoal hover:bg-charcoal/5"
            >
              <Puzzle className="h-5 w-5" aria-hidden="true" />
            </button>
            {storesOpen ? (
              <div
                id="mobile-extension-links"
                className="absolute right-0 top-full mt-2 w-40 rounded-xl border border-clay/40 bg-[#f8f6f2] p-1.5 shadow-lg"
              >
                {[
                  {
                    label: "Chrome",
                    href: CHROME_STORE_URL,
                    icon: webstoreIcon,
                  },
                  { label: "Edge", href: EDGE_STORE_URL, icon: edgeIcon },
                ].map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setStoresOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-charcoal hover:bg-charcoal/5 focus-visible:bg-charcoal/5"
                  >
                    <img src={icon} alt="" className="h-5 w-5 object-contain" />
                    {label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
          <button
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5"
            onClick={() => {
              setOpen(!open);
              setStoresOpen(false);
            }}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span
              className={`block h-0.5 w-5 bg-charcoal transition-transform ${open ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-charcoal transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-charcoal transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t border-clay/30 bg-[#f8f6f2] px-6 py-5 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium ${
                isActive(link.to) ? "text-charcoal" : "text-charcoal/60"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
