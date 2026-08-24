"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import LogoMark from "@/components/LogoMark";

interface NavProps {
  onStart: () => void;
}

const LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#analysis", label: "Financial analysis" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav({ onStart }: NavProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-900/5 bg-paper-50/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <LogoMark size={30} />
          <span className="font-display text-lg font-semibold tracking-tight text-ink-900">
            MoneyNext
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-700 transition hover:text-ink-900"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <button
            onClick={onStart}
            className="rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-paper-50 transition hover:bg-ink-800"
          >
            Start Analysis
          </button>
        </div>

        <button
          className="p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink-900/5 bg-paper-50 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-ink-700"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                onStart();
              }}
              className="mt-1 w-full rounded-full bg-ink-900 px-5 py-3 text-sm font-medium text-paper-50"
            >
              Start Analysis
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
