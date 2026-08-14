"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

const EXAMPLES = [
  "What if I increase my SIP to ₹15,000?",
  "What if I pay ₹5,000 extra toward my loan?",
  "What if my income increases by ₹10,000?",
  "What if I reduce expenses by ₹5,000?",
  "What if I stop my SIP temporarily?",
  "What should I prioritize first?",
];

export default function WhatIf({
  onAsk,
  loading,
  answer,
  error,
}: {
  onAsk: (question: string) => void;
  loading: boolean;
  answer: string | null;
  error: string | null;
}) {
  const [question, setQuestion] = useState("");

  return (
    <div className="rounded-xl2 border border-ink-900/8 bg-white p-6 sm:p-8">
      <div className="flex items-center gap-2">
        <Sparkles size={16} className="text-signal" />
        <h3 className="font-display text-lg font-semibold text-ink-900">
          Want to explore another scenario?
        </h3>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            onClick={() => setQuestion(ex)}
            className="rounded-full border border-ink-900/10 px-3.5 py-1.5 text-xs text-ink-600 transition hover:bg-paper-100"
          >
            {ex}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value.slice(0, 300))}
          placeholder="What if I increase my SIP to ₹15,000?"
          aria-label="What-if question"
          className="flex-1 rounded-lg border border-ink-900/10 bg-paper-50 px-4 py-3 text-sm text-ink-900 focus-visible:bg-white"
        />
        <button
          onClick={() => question.trim() && onAsk(question.trim())}
          disabled={loading || !question.trim()}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-ink-800 disabled:opacity-50"
        >
          {loading && <Loader2 size={15} className="animate-spin" />}
          Ask AI
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-danger-soft px-4 py-3 text-sm text-danger">
          {error}
        </p>
      )}

      {answer && !loading && (
        <div className="mt-5 rounded-xl bg-paper-100 p-5 text-sm leading-relaxed text-ink-800">
          {answer}
        </div>
      )}
    </div>
  );
}
