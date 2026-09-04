import { Mail, Send, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string;

type Status = "idle" | "submitting" | "success" | "error";

const fieldClassName =
  "w-full px-3.5 py-2.5 text-[13px] text-charcoal bg-white/80 border border-clay/50 rounded-lg placeholder:text-charcoal/30 focus:outline-none focus:border-sage/70 focus:ring-2 focus:ring-sage/15 transition-colors";

function GuidanceItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-[13px] text-charcoal/60 leading-6">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
      <span>{children}</span>
    </li>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-8 py-14 sm:px-10 lg:px-12 lg:py-16">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-16">
        <section aria-labelledby="contact-form-title">
          <div className="mb-7 flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sage/10 text-sage">
              <Mail className="h-4.5 w-4.5" aria-hidden="true" />
            </div>
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-widest text-sage">
                Get in touch
              </p>
              <h1
                id="contact-form-title"
                className="font-serif text-3xl font-semibold text-charcoal"
              >
                Send SurfMind a message
              </h1>
              <p className="mt-1.5 text-[13px] leading-relaxed text-charcoal/55">
                Questions, bug reports, and thoughtful ideas are all welcome.
              </p>
            </div>
          </div>

          {status === "success" ? (
            <div
              className="rounded-2xl border border-sage/30 bg-sage/10 p-8 text-center"
              role="status"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sage/20">
                <Sparkles className="h-6 w-6 text-sage" aria-hidden="true" />
              </div>
              <h2 className="mb-2 font-serif text-xl font-semibold text-charcoal">
                Your message is on its way
              </h2>
              <p className="text-sm text-charcoal/60">
                Thanks for helping us make browsing easier to remember.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm font-medium text-charcoal underline underline-offset-2 transition-colors hover:text-sage"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-[13px] font-medium text-charcoal"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className={fieldClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-[13px] font-medium text-charcoal"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={fieldClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-1.5 block text-[13px] font-medium text-charcoal"
                >
                  Topic
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="Search, sync, bookmarks, feedback…"
                  className={fieldClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-[13px] font-medium text-charcoal"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us what you noticed or what would make SurfMind better."
                  className={`${fieldClassName} resize-none`}
                />
              </div>

              {status === "error" ? (
                <p className="text-sm text-red-600" role="alert">
                  Something went wrong. Please try again or email us at{" "}
                  <a href="mailto:support@docschat.in" className="underline">
                    support@docschat.in
                  </a>
                  .
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-5 py-2.5 text-[13px] font-medium text-cream transition-colors hover:bg-charcoal/85 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                {status === "submitting" ? "Sending…" : "Send message"}
              </button>
            </form>
          )}

          <p className="mt-8 text-xs text-charcoal/40">
            Prefer email? Write to{" "}
            <a
              href="mailto:support@docschat.in"
              className="text-charcoal/60 underline underline-offset-2 transition-colors hover:text-charcoal"
            >
              support@docschat.in
            </a>
          </p>
        </section>

        <aside className="lg:pt-4" aria-label="Contact guidance">
          <div className="pb-7">
            <div className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-lg bg-clay/25 text-charcoal/65">
              <ShieldCheck className="h-4.5 w-4.5" aria-hidden="true" />
            </div>
            <h2 className="font-serif text-xl font-semibold text-charcoal">
              Help us trace the missing page
            </h2>
            <p className="mt-2.5 text-[13px] leading-6 text-charcoal/60">
              For search or sync issues, tell us whether you were using History,
              Bookmarks, or Combined mode. Include what you expected and what
              appeared instead, but leave out private page text, full browsing
              records, and active sync codes.
            </p>
          </div>

          <div className="border-t border-clay/40 py-7">
            <h2 className="font-serif text-xl font-semibold text-charcoal">
              Shape smarter browsing
            </h2>
            <p className="mt-2.5 text-[13px] leading-6 text-charcoal/60">
              If SurfMind almost found what you remembered, tell us what clue
              was missing. Ideas about recall quality, bookmark organization,
              cross-browser continuity, and the side-panel experience help us
              choose what to improve next.
            </p>
          </div>

          <div className="border-t border-clay/40 pt-7">
            <h2 className="font-serif text-xl font-semibold text-charcoal">
              A useful report includes
            </h2>
            <ul className="mt-4 space-y-3">
              <GuidanceItem>
                The SurfMind version and Chrome version you are using.
              </GuidanceItem>
              <GuidanceItem>
                A short sequence of steps that reproduces the issue.
              </GuidanceItem>
              <GuidanceItem>
                A screenshot with personal URLs and page content hidden.
              </GuidanceItem>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
