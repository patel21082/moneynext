import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE_NAME } from "@/lib/seo";
import { TOOLS } from "@/lib/siteNav";
import Footer from "@/components/Footer";

const TITLE = "Financial Tools";
const DESCRIPTION =
  "Free calculators for EMI, SIP, compound interest, emergency fund, debt payoff and savings goals — no signup required.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools" },
  openGraph: { title: `${TITLE} — ${SITE_NAME}`, description: DESCRIPTION, type: "website" },
};

export default function ToolsIndexPage() {
  return (
    <>
      <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <nav className="text-sm text-ink-600">
          <Link href="/" className="font-medium text-signal hover:text-signal-dim">
            {SITE_NAME}
          </Link>
          <span className="mx-2">/</span>
          <span>Tools</span>
        </nav>

        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
          Financial Tools
        </h1>
        <p className="mt-3 max-w-2xl text-ink-700">
          Free, instant calculators for the most common financial decisions — loans, SIPs,
          savings, and debt. No signup, and nothing you enter is stored.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex flex-col justify-between rounded-xl2 border border-ink-900/8 bg-paper-100/60 p-6 transition hover:border-signal/40 hover:bg-paper-100"
            >
              <div>
                <h2 className="font-display text-lg font-semibold text-ink-900">
                  {tool.label}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">{tool.description}</p>
              </div>
              <span className="mt-4 flex items-center gap-1 text-sm font-medium text-signal">
                Open calculator
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-xl2 border border-ink-900/8 bg-paper-100/60 p-6">
          <p className="font-display text-sm font-semibold text-ink-900">
            Want it all in one place?
          </p>
          <p className="mt-1.5 text-sm text-ink-700">
            {SITE_NAME}'s free financial planner looks at your income, expenses, loans and
            savings together, and tells you what to prioritize next.
          </p>
          <Link
            href="/"
            className="mt-3 inline-block rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-paper-50 transition hover:bg-ink-800"
          >
            Run your free financial analysis
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
