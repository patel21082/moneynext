"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FaqAccordionItem {
  q: string;
  a: string;
}

export default function FaqAccordion({ items }: { items: FaqAccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ink-900/8 border-y border-ink-900/8">
      {items.map((item, i) => {
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
  );
}
