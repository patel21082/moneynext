import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE_NAME } from "@/lib/seo";
import { GUIDES } from "@/lib/siteNav";
import Footer from "@/components/Footer";

const TITLE = "Learn Personal Finance";
const DESCRIPTION =
  "Simple, practical financial education for everyday decisions — budgeting, saving, investing, loans, credit and financial planning.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/learn" },
  openGraph: { title: `${TITLE} — ${SITE_NAME}`, description: DESCRIPTION, type: "website" },
};

export default function LearnPage() {
  return (
    <>
      <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <nav className="text-sm text-ink-600">
          <Link href="/" className="font-medium text-signal hover:text-signal-dim">
            {SITE_NAME}
          </Link>
          <span className="mx-2">/</span>
          <span>Learn</span>
        </nav>

        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
          Learn Personal Finance
        </h1>
        <p className="mt-3 max-w-2xl text-ink-700">
          Simple, practical financial education for everyday decisions — no jargon, no
          sponsored product pushes.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {GUIDES.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group flex flex-col justify-between rounded-xl2 border border-ink-900/8 bg-paper-100/60 p-6 transition hover:border-signal/40 hover:bg-paper-100"
            >
              <div>
                <h2 className="font-display text-lg font-semibold text-ink-900">
                  {guide.label}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">{guide.description}</p>
              </div>
              <span className="mt-4 flex items-center gap-1 text-sm font-medium text-signal">
                Read guide
                <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
