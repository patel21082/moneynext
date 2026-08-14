"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";

interface HeroProps {
  onStart: () => void;
}

export default function Hero({ onStart }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden bg-paper-50 pt-14 pb-20 sm:pt-20 sm:pb-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="animate-fadeUp" style={{ animationDelay: "0ms" }}>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-ink-900/10 bg-white px-3.5 py-1.5 text-xs font-medium text-ink-700">
            <ShieldCheck size={14} className="text-gain" />
            No signup • No account • No financial data stored
          </p>

          <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
            What should you do with your money next?
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-700">
            Enter your income, expenses, loans and investments. MoneyNext analyzes your
            situation and gives you a simple financial action plan.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              onClick={onStart}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-signal px-7 py-3.5 text-sm font-medium text-white shadow-[0_10px_30px_-12px_rgba(79,99,210,0.55)] transition hover:bg-signal-dim"
            >
              Start Free Analysis
              <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
            </button>
            <span className="text-sm text-ink-600">Free to use • No signup • Nothing stored</span>
          </div>
        </div>

        <div className="relative hidden animate-fadeUp lg:block" style={{ animationDelay: "150ms" }}>
          <div className="rounded-xl2 border border-ink-900/8 bg-white p-6 shadow-[0_30px_60px_-30px_rgba(11,18,32,0.25)]">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-ink-600/60">
                Example snapshot
              </span>
              <span className="rounded-full bg-gain-soft px-2.5 py-1 text-[11px] font-medium text-gain">
                Illustrative only
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <PreviewCard label="Monthly Income" value="₹80,000" />
              <PreviewCard label="Monthly Expenses" value="₹42,000" />
              <PreviewCard label="Monthly Surplus" value="₹18,000" tone="gain" />
              <PreviewCard label="Financial Health" value="72 / 100" tone="signal" />
            </div>
          </div>
          <div
            className="absolute -bottom-6 -left-6 -z-10 h-40 w-40 rounded-full bg-signal/10 blur-3xl"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}

function PreviewCard({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "gain" | "signal";
}) {
  const toneClass =
    tone === "gain" ? "text-gain" : tone === "signal" ? "text-signal" : "text-ink-900";

  return (
    <div className="rounded-xl bg-paper-100/70 p-4">
      <p className="text-xs text-ink-600">{label}</p>
      <p className={`mt-1.5 font-mono text-xl font-semibold tabular ${toneClass}`}>{value}</p>
    </div>
  );
}
