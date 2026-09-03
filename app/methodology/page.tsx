import type { Metadata } from "next";
import { SITE_NAME, CONTENT_LAST_UPDATED } from "@/lib/seo";
import InfoPageLayout from "@/components/InfoPageLayout";

export const metadata: Metadata = {
  title: "Methodology",
  description: `Exactly how ${SITE_NAME} calculates the Financial Health Score and other figures.`,
  alternates: { canonical: "/methodology" },
};

export default function MethodologyPage() {
  return (
    <InfoPageLayout title="Methodology" lastUpdated={CONTENT_LAST_UPDATED} maxWidth="3xl">
      <section>
        <p className="leading-relaxed">
          This page explains exactly how {SITE_NAME}'s Financial Health Score and calculators
          work, so the numbers you see aren't a black box.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">
          Financial Health Score
        </h2>
        <p className="mt-2 leading-relaxed">
          The score runs from 0–100 and is built from five categories, each worth up to 20
          points:
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-ink-900/8">
          <table className="w-full text-left text-sm">
            <thead className="bg-paper-100 text-xs uppercase tracking-wide text-ink-600">
              <tr>
                <th className="px-4 py-2 font-medium">Category</th>
                <th className="px-4 py-2 font-medium">Max points</th>
                <th className="px-4 py-2 font-medium">Based on</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Cash flow", "20", "Your savings rate (surplus ÷ total income)"],
                ["Emergency fund", "20", "Emergency savings ÷ essential monthly expenses, scaled to a 6-month target"],
                ["Debt", "20", "Debt-to-income ratio (total EMI ÷ total income) — lower is better"],
                ["Savings", "20", "Savings rate, plus a bonus for holding savings beyond the emergency fund"],
                ["Investments", "20", "Monthly SIP relative to income, plus a bonus for existing invested assets"],
              ].map((row) => (
                <tr key={row[0]} className="border-t border-ink-900/6">
                  {row.map((cell, i) => (
                    <td key={i} className="px-4 py-2 text-ink-800">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 leading-relaxed">
          Your stated goals are recorded and used to shape the AI-generated roadmap, but they do
          not currently add or subtract points from the numeric score itself.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">
          Cash flow scoring detail
        </h2>
        <p className="mt-2 leading-relaxed">
          A savings rate (monthly surplus ÷ total income) of 30% or more scores the full 20
          points. The score steps down at 15% (16 points), 5% (12 points), and any non-negative
          surplus (8 points); a negative surplus — spending more than you earn — scores 0 on this
          category.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">
          Debt scoring detail
        </h2>
        <p className="mt-2 leading-relaxed">
          Based on your debt-to-income ratio (total monthly EMI ÷ total income): 20 points at
          10% or below, stepping down through 18, 14, 10, and 6 points as the ratio rises past
          10%, 20%, 30%, and 40%, down to 2 points above 50% — reflecting how a heavier EMI
          burden reduces financial flexibility.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">Calculator formulas</h2>
        <p className="mt-2 leading-relaxed">
          Every standalone tool under <code>/tools</code> documents its own formula directly on
          its page — see the EMI, SIP, compound interest, emergency fund, debt payoff, and
          savings goal calculators for the exact math each one uses.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">
          What the AI adds on top
        </h2>
        <p className="mt-2 leading-relaxed">
          The calculated metrics and health score above are computed entirely with fixed
          formulas — the AI model never sees or influences those numbers. It only uses them,
          along with your stated goals and question, to write a summary, priority list, and
          suggested roadmap in plain language. See our{" "}
          <a href="/ai-financial-planner" className="text-signal underline">
            AI Financial Planner
          </a>{" "}
          page for more detail.
        </p>
      </section>
    </InfoPageLayout>
  );
}
