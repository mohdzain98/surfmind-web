import { CHROME_STORE_URL, EDGE_STORE_URL } from "../storeLinks";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-clay/40 bg-[#f8f6f2]/80">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="text-center sm:text-left">
          <p className="font-serif text-lg font-semibold text-charcoal">
            SurfMind
          </p>
          <p className="text-xs text-charcoal/50 mt-1">
            &copy; {new Date().getFullYear()} SurfMind. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-charcoal/60">
          <Link to="/privacy" className="hover:text-charcoal transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-charcoal transition-colors">
            Terms of Service
          </Link>
          <a
            href={CHROME_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-charcoal transition-colors"
          >
            Chrome Store
          </a>
          <a
            href={EDGE_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-charcoal transition-colors"
          >
            Edge Add-ons
          </a>
        </div>
      </div>
    </footer>
  );
}
