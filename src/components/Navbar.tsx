import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/contact", label: "Contact" },
];

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/surfmind-smarter-browsing/ladckalplikfcplbihpgfnlkonnpehkj";

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

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
                pathname === link.to
                  ? "text-charcoal"
                  : "text-charcoal/50 hover:text-charcoal"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={CHROME_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium bg-charcoal text-cream px-4 py-1.5 rounded-full hover:bg-charcoal/80 transition-colors"
          >
            Add to Chrome
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
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

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t border-clay/30 bg-[#f8f6f2] px-6 py-5 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium ${
                pathname === link.to ? "text-charcoal" : "text-charcoal/60"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={CHROME_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium bg-charcoal text-cream px-4 py-2 rounded-full text-center hover:bg-charcoal/80 transition-colors"
          >
            Add to Chrome
          </a>
        </div>
      )}
    </nav>
  );
}
