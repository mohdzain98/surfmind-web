import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Gauge,
  LayoutDashboard,
  LogOut,
  Menu,
  ScrollText,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useAdminAuth } from "./adminAuth";

const navigation: Array<{
  to: string;
  label: string;
  Icon: LucideIcon;
  end?: boolean;
}> = [
  { to: "/admin", label: "Dashboard", Icon: LayoutDashboard, end: true },
  { to: "/admin/logs", label: "System logs", Icon: ScrollText },
  { to: "/admin/llm-usage", label: "LLM usage", Icon: Bot },
  { to: "/admin/search-metrics", label: "Search metrics", Icon: Gauge },
  { to: "/admin/accounts", label: "Accounts", Icon: Search },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { logout } = useAdminAuth();

  return (
    <>
      <div className="border-b border-white/10 px-5 py-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-clay">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-serif text-xl font-semibold text-white">
              SurfMind
            </p>
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/35">
              Admin console
            </p>
          </div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-5" aria-label="Admin navigation">
        {navigation.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-white text-charcoal shadow-sm"
                  : "text-white/55 hover:bg-white/7 hover:text-white"
              }`
            }
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-white/10 p-3">
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/55 transition-colors hover:bg-white/7 hover:text-white"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Sign out
        </button>
      </div>
    </>
  );
}

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f6f2] text-charcoal lg:grid lg:grid-cols-[15rem_minmax(0,1fr)]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col bg-charcoal lg:flex">
        <SidebarContent />
      </aside>

      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-charcoal/10 bg-[#f8f6f2]/90 px-5 backdrop-blur lg:hidden">
        <div>
          <p className="font-serif text-lg font-semibold">SurfMind</p>
          <p className="text-[10px] uppercase tracking-widest text-charcoal/40">
            Admin console
          </p>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="rounded-lg border border-charcoal/10 bg-white/60 p-2 text-charcoal"
          aria-label="Open admin navigation"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 bg-charcoal/30 backdrop-blur-sm lg:hidden">
          <aside className="flex h-full w-[min(18rem,85vw)] flex-col bg-charcoal shadow-2xl">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute left-[min(15.5rem,72vw)] top-4 rounded-full bg-white/10 p-2 text-white"
              aria-label="Close admin navigation"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      ) : null}

      <main className="min-w-0 lg:col-start-2">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
