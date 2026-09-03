import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, CONTENT_LAST_UPDATED } from "@/lib/seo";
import InfoPageLayout from "@/components/InfoPageLayout";

export const metadata: Metadata = {
  title: "AI Financial Planner",
  description: `What ${SITE_NAME}'s AI financial planner does, what inputs it uses, and its limitations.`,
  alternates: { canonical: "/ai-financial-planner" },
};

export default function AiFinancialPlannerPage() {
  return (
    <InfoPageLayout title="AI Financial Planner" lastUpdated={CONTENT_LAST_UPDATED} maxWidth="3xl">
      <section>
        <p className="leading-relaxed">
          {SITE_NAME}'s free financial planner turns your income, expenses, loans, investments,
          savings and goals into a personalized, plain-language summary and roadmap. Here's
          exactly what it does under the hood.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">What it does</h2>
        <p className="mt-2 leading-relaxed">
          It computes your Financial Health Score and key metrics locally using fixed formulas
          (see our{" "}
          <Link href="/methodology" className="text-signal underline">
            Methodology
          </Link>{" "}
          page), then sends those metrics — along with your stated goals and any specific
          question you ask — to an AI model, which writes a summary, a prioritized list of what
          to focus on, and a suggested 12-month roadmap.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">What inputs it uses</h2>
        <p className="mt-2 leading-relaxed">
          Monthly income and any additional income, your listed expenses, outstanding loans
          (type, balance, EMI, rate), current investments and savings, the goals you select, and
          any free-text question or note you add. Nothing beyond what you explicitly enter in the
          wizard is used.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">What it doesn't know</h2>
        <p className="mt-2 leading-relaxed">
          It has no access to your bank accounts, credit report, tax filings, or any data beyond
          what you type into the form for that session. It doesn't know your risk tolerance,
          employer benefits, family circumstances beyond what you mention, or anything about
          products currently available to you unless you describe them in your question.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">How the calculations work</h2>
        <p className="mt-2 leading-relaxed">
          All numeric calculations — savings rate, debt-to-income ratio, emergency fund coverage,
          and the Financial Health Score — are computed with fixed, documented formulas in your
          browser before the AI is ever called. The AI never performs or overrides these
          calculations; it only writes commentary and prioritization based on the results.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">Limitations</h2>
        <ul className="mt-2 list-inside list-disc space-y-1.5 leading-relaxed">
          <li>AI-generated text can occasionally be generic, incomplete, or miss context you didn't explicitly state.</li>
          <li>It cannot verify facts about your specific bank, employer, or country-specific rules beyond general knowledge.</li>
          <li>It is not aware of very recent changes to interest rates, tax rules, or regulations.</li>
          <li>It does not replace a licensed financial advisor's judgment for complex or high-stakes decisions.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">Example analysis</h2>
        <p className="mt-2 leading-relaxed">
          A typical result includes: a one-paragraph summary of your overall financial position,
          a Financial Health Score with its category breakdown, a ranked list of 3–5 priorities
          (each with a reason and severity level), and a staged roadmap grouping suggested
          actions into near-term and longer-term periods.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">Privacy</h2>
        <p className="mt-2 leading-relaxed">
          Your inputs are sent to a third-party AI provider only when you request an analysis,
          and are not stored by us afterward. Full detail is in our{" "}
          <Link href="/privacy" className="text-signal underline">
            Privacy Policy
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">
          Why results aren't guaranteed
        </h2>
        <p className="mt-2 leading-relaxed">
          The roadmap is a starting point based on general financial principles applied to the
          numbers you provided — not a personalized recommendation vetted by a licensed
          professional. Treat it as a way to organize your thinking, and consult a qualified
          advisor for decisions involving significant sums, tax implications, or legal
          complexity.
        </p>
      </section>
    </InfoPageLayout>
  );
}
