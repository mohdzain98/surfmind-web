import { useState } from "react";

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string;

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
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
    <div className="max-w-xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-medium text-sage uppercase tracking-widest mb-3">
          Get in Touch
        </p>
        <h1 className="font-serif text-4xl font-semibold text-charcoal mb-3">
          Contact Us
        </h1>
        <p className="text-sm text-charcoal/60 leading-relaxed">
          Have a question, found a bug, or want to suggest a feature? We'd love
          to hear from you.
        </p>
        <div className="h-px bg-clay/40 mt-6" />
      </div>

      {/* Success state */}
      {status === "success" ? (
        <div className="bg-sage/10 border border-sage/30 rounded-2xl p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 text-sage"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="font-serif text-xl font-semibold text-charcoal mb-2">
            Message sent!
          </h2>
          <p className="text-sm text-charcoal/60">
            Thanks for reaching out. We'll get back to you as soon as possible.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-6 text-sm font-medium text-charcoal underline underline-offset-2 hover:text-sage transition-colors"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-charcoal mb-1.5"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              className="w-full px-4 py-2.5 text-sm text-charcoal bg-white/80 border border-clay/50 rounded-xl placeholder-charcoal/30 focus:outline-none focus:border-charcoal/40 focus:ring-1 focus:ring-charcoal/20 transition-colors"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-charcoal mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 text-sm text-charcoal bg-white/80 border border-clay/50 rounded-xl placeholder-charcoal/30 focus:outline-none focus:border-charcoal/40 focus:ring-1 focus:ring-charcoal/20 transition-colors"
            />
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-charcoal mb-1.5"
            >
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              placeholder="What's this about?"
              className="w-full px-4 py-2.5 text-sm text-charcoal bg-white/80 border border-clay/50 rounded-xl placeholder-charcoal/30 focus:outline-none focus:border-charcoal/40 focus:ring-1 focus:ring-charcoal/20 transition-colors"
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-charcoal mb-1.5"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Your message..."
              className="w-full px-4 py-2.5 text-sm text-charcoal bg-white/80 border border-clay/50 rounded-xl placeholder-charcoal/30 focus:outline-none focus:border-charcoal/40 focus:ring-1 focus:ring-charcoal/20 transition-colors resize-none"
            />
          </div>

          {/* Error */}
          {status === "error" && (
            <p className="text-sm text-red-500">
              Something went wrong. Please try again or email us directly at{" "}
              <a href="mailto:support@docschat.in" className="underline">
                support@docschat.in
              </a>
              .
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-charcoal text-cream text-sm font-medium py-3 rounded-full hover:bg-charcoal/85 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {status === "submitting" ? "Sending…" : "Send Message"}
          </button>
        </form>
      )}

      {/* Direct email fallback */}
      <p className="text-xs text-charcoal/40 text-center mt-8">
        Or email us directly at{" "}
        <a
          href="mailto:support@docschat.in"
          className="text-charcoal/60 underline underline-offset-2 hover:text-charcoal transition-colors"
        >
          support@docschat.in
        </a>
      </p>
    </div>
  );
}
