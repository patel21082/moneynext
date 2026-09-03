import type { Metadata } from "next";
import { SITE_NAME, CONTENT_LAST_UPDATED } from "@/lib/seo";
import InfoPageLayout from "@/components/InfoPageLayout";

export const metadata: Metadata = {
  title: "How MoneyNext Works",
  description: `A step-by-step look at how ${SITE_NAME}'s financial planner and calculators work.`,
  alternates: { canonical: "/how-it-works" },
};

const STEPS = [
  {
    title: "1. Enter your financial information",
    body: "In the free planner, you walk through a short wizard covering income, expenses, loans, investments, savings and goals. Everything stays in your browser until you choose to run an analysis.",
  },
  {
    title: "2. Calculations happen locally",
    body: "Your monthly surplus, savings rate, debt-to-income ratio, and emergency fund coverage are computed directly in your browser using fixed formulas — documented in full on our Methodology page — before anything is sent anywhere.",
  },
  {
    title: "3. MoneyNext evaluates your situation",
    body: "Those calculated metrics feed into the Financial Health Score, a 0–100 score built from five weighted categories: cash flow, emergency fund, debt, savings, and investments.",
  },
  {
    title: "4. AI generates an educational action plan",
    body: "Your metrics, health score, and stated goals are sent to an AI model, which writes a plain-language summary and a prioritized list of what to focus on next — see our AI Financial Planner page for exactly what it does and doesn't do.",
  },
  {
    title: "5. You receive prioritized recommendations",
    body: "The result is a ranked list of priorities and a suggested 12-month roadmap, plus the option to ask follow-up \"what if\" questions about your specific numbers.",
  },
];

export default function HowItWorksPage() {
  return (
    <InfoPageLayout title="How MoneyNext Works" lastUpdated={CONTENT_LAST_UPDATED} maxWidth="3xl">
      <section>
        <p className="leading-relaxed">
          {SITE_NAME}'s financial planner combines fixed, transparent formulas with an AI model
          that turns the numbers into plain-language guidance. Here's exactly what happens, step
          by step.
        </p>
      </section>

      <ol className="space-y-6">
        {STEPS.map((step) => (
          <li key={step.title}>
            <h2 className="font-display text-lg font-semibold text-ink-900">{step.title}</h2>
            <p className="mt-1.5 leading-relaxed">{step.body}</p>
          </li>
        ))}
      </ol>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">
          The standalone calculators
        </h2>
        <p className="mt-2 leading-relaxed">
          Outside the full planner, our{" "}
          <a href="/tools" className="text-signal underline">
            individual tools
          </a>{" "}
          — EMI, SIP, compound interest, emergency fund, debt payoff, and savings goal — work the
          same way as step 2 above, but standalone: enter numbers, get an instant result, with no
          AI step and nothing sent to a server at all.
        </p>
      </section>
    </InfoPageLayout>
  );
}
