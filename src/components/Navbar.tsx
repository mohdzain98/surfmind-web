import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import webstoreIcon from "../assets/webstore.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/#features", label: "Features" },
  { to: "/#how-it-works", label: "How It Works" },
  { to: "/contact", label: "Contact" },
];

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/surfmind-smarter-browsing/ladckalplikfcplbihpgfnlkonnpehkj";

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

export default function Navbar() {
  const { pathname, hash } = useLocation();
  const [open, setOpen] = useState(false);

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
          <ChromeStoreLink />
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-1 sm:hidden">
          <ChromeStoreLink />
          <button
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5"
            onClick={() => setOpen(!open)}
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
