"use client";

import { useEffect, useState } from "react";
import { Check, Circle } from "lucide-react";

const STEPS = [
  "Calculating monthly cash flow",
  "Reviewing debt burden",
  "Checking emergency fund",
  "Creating your action plan",
];

export default function AnalyzingScreen() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i < STEPS.length - 1 ? i + 1 : i));
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-paper-100/50 py-24">
      <div className="mx-auto max-w-md px-5 text-center">
        <h3 className="font-display text-2xl font-semibold text-ink-900">
          Analyzing your financial picture…
        </h3>
        <p className="mt-2 text-sm text-ink-600">This usually takes a few seconds.</p>

        <ul className="mt-8 space-y-3 text-left">
          {STEPS.map((label, i) => {
            const done = i < activeIndex;
            const current = i === activeIndex;
            return (
              <li
                key={label}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition ${
                  done || current
                    ? "border-ink-900/8 bg-white"
                    : "border-transparent bg-transparent opacity-50"
                }`}
              >
                {done ? (
                  <Check size={16} className="shrink-0 text-gain" />
                ) : current ? (
                  <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                    <span className="absolute h-4 w-4 animate-ping rounded-full bg-signal/40" />
                    <span className="h-2 w-2 rounded-full bg-signal" />
                  </span>
                ) : (
                  <Circle size={16} className="shrink-0 text-ink-600/30" />
                )}
                <span className="text-sm text-ink-800">{label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
