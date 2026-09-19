import { useState } from "react";
import { ArrowRight, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AdminApiError } from "./api";
import { useAdminAuth } from "./adminAuth";

export default function AdminLogin() {
  const { authenticated, login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (authenticated) return <Navigate to="/admin" replace />;

  const redirectTo =
    (location.state as { from?: string } | null)?.from || "/admin";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await login(username.trim(), password);
      navigate(redirectTo, { replace: true });
    } catch (requestError) {
      setError(
        requestError instanceof AdminApiError
          ? requestError.message
          : "Unable to reach the admin service."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f6f2] lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden overflow-hidden bg-charcoal px-12 py-14 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-sage/20 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-clay/15 blur-3xl" />
        <div className="relative">
          <p className="font-serif text-2xl font-semibold">SurfMind</p>
          <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/65">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Private operations console
          </span>
        </div>
        <div className="relative max-w-xl">
          <Sparkles className="mb-6 h-8 w-8 text-clay" aria-hidden="true" />
          <h1 className="font-serif text-5xl font-semibold leading-[1.08] tracking-tight">
            Keep SurfMind healthy, useful, and dependable.
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-7 text-white/55">
            Monitor service health, understand search performance, review system
            events, and resolve account issues from one focused place.
          </p>
        </div>
        <p className="relative text-xs text-white/35">
          Authorized administrators only · Activity is audited
        </p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-sm">
          <div className="mb-9 lg:hidden">
            <p className="font-serif text-2xl font-semibold text-charcoal">
              SurfMind
            </p>
            <p className="mt-1 text-xs text-charcoal/45">Admin console</p>
          </div>
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sage/15 text-sage">
            <LockKeyhole className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2 className="mt-5 font-serif text-3xl font-semibold text-charcoal">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-charcoal/50">
            Sign in with the admin credentials configured on the server.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="admin-username"
                className="mb-1.5 block text-xs font-semibold text-charcoal/70"
              >
                Username
              </label>
              <input
                id="admin-username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                required
                autoFocus
                className="w-full rounded-xl border border-charcoal/15 bg-white/75 px-4 py-3 text-sm text-charcoal shadow-sm outline-none transition focus:border-sage focus:ring-4 focus:ring-sage/10"
                placeholder="Admin username"
              />
            </div>
            <div>
              <label
                htmlFor="admin-password"
                className="mb-1.5 block text-xs font-semibold text-charcoal/70"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-charcoal/15 bg-white/75 px-4 py-3 text-sm text-charcoal shadow-sm outline-none transition focus:border-sage focus:ring-4 focus:ring-sage/10"
                placeholder="Your password"
              />
            </div>
            {error ? (
              <p
                className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700"
                role="alert"
              >
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-charcoal px-4 py-3 text-sm font-semibold text-white transition hover:bg-charcoal/90 disabled:cursor-not-allowed disabled:opacity-55"
            >
              {submitting ? "Signing in…" : "Sign in to console"}
              {!submitting ? (
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              ) : null}
            </button>
          </form>
          <p className="mt-6 text-center text-[11px] leading-5 text-charcoal/35">
            Sessions expire automatically. There is no public admin
            registration.
          </p>
        </div>
      </section>
    </main>
  );
}
