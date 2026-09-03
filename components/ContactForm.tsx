"use client";

import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";
import { SITE_CONTACT_EMAIL } from "@/lib/seo";

const CONTACT_EMAIL = SITE_CONTACT_EMAIL;

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const body = `${message}\n\n— ${name || "Anonymous"} (${email || "no email provided"})`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject || "Message from MoneyNext contact page"
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

  return (
    <div className="not-prose">
      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-xl2 border border-ink-900/8 bg-paper-100/60 p-5 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-ink-800">Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-ink-900/12 bg-paper-50 px-4 py-3 text-sm text-ink-900 outline-none focus:border-signal"
              placeholder="Your name"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink-800">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1.5 w-full rounded-xl border border-ink-900/12 bg-paper-50 px-4 py-3 text-sm text-ink-900 outline-none focus:border-signal"
              placeholder="you@example.com"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-medium text-ink-800">Subject</span>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-ink-900/12 bg-paper-50 px-4 py-3 text-sm text-ink-900 outline-none focus:border-signal"
            placeholder="What's this about?"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-ink-800">Message</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            className="mt-1.5 w-full rounded-xl border border-ink-900/12 bg-paper-50 px-4 py-3 text-sm text-ink-900 outline-none focus:border-signal"
            placeholder="Your question, correction, or suggestion"
          />
        </label>

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-paper-50 transition hover:bg-ink-800"
        >
          <Mail size={16} />
          Send message
        </button>
        <p className="text-xs text-ink-500">
          This opens your email app with the message pre-filled, addressed to {CONTACT_EMAIL}.
        </p>
      </form>
    </div>
  );
}
