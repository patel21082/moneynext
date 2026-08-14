"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  { q: "Is MoneyNext free?", a: "Yes." },
  { q: "Do I need an account?", a: "No." },
  {
    q: "Do you store my financial information?",
    a: "The website does not maintain a database or financial profile. The current form data exists only during the session and is sent to the AI service when analysis is requested.",
  },
  {
    q: "Is the AI financial advice guaranteed?",
    a: "No. It provides educational planning suggestions, not guaranteed outcomes.",
  },
  { q: "Can I use it on my phone?", a: "Yes. The entire application is fully responsive." },
  {
    q: "How are the calculations performed?",
    a: "Basic calculations — cash flow, debt ratios, emergency fund coverage — are performed locally in your browser before the AI analysis runs.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
          Frequently asked questions
        </h2>

        <div className="mt-9 divide-y divide-ink-900/8 border-y border-ink-900/8">
          {FAQS.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-medium text-ink-900">{item.q}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-ink-600 transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open && <p className="pb-5 text-sm leading-relaxed text-ink-700">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
