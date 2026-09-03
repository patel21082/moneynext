import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/seo";
import GuidePageLayout from "@/components/GuidePageLayout";

const TITLE = "Financial Planning: Building Your First Plan";
const DESCRIPTION =
  "How to set short, medium and long-term financial goals, build your first financial plan, and calculate your net worth.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides/financial-planning" },
  openGraph: { title: `${TITLE} — ${SITE_NAME}`, description: DESCRIPTION, type: "article" },
};

const FAQS = [
  {
    q: "What should my first financial plan include?",
    a: "At minimum: a clear picture of income and expenses, an emergency fund target, a plan for any high-interest debt, and a small number of specific, time-bound goals — a first plan doesn't need to be exhaustive, just honest and actionable.",
  },
  {
    q: "How do short, medium and long-term goals differ?",
    a: "Short-term goals (under 2 years) are best funded with low-risk savings. Medium-term goals (2–7 years) can take on moderate risk. Long-term goals (7+ years, like retirement) can typically afford more equity exposure, since there's time to recover from volatility.",
  },
  {
    q: "How do I calculate my net worth?",
    a: "Add up everything you own — savings, investments, property, and other assets — then subtract everything you owe, including loans and credit card balances. The result is your net worth; tracking it over time, rather than any single snapshot, is what shows real progress.",
  },
];

export default function FinancialPlanningGuidePage() {
  return (
    <GuidePageLayout
      path="/guides/financial-planning"
      breadcrumbLabel="Financial Planning"
      h1="Financial Planning: Building Your First Plan"
      intro="A financial plan doesn't need to be complicated to be useful — it needs to turn vague intentions into specific, trackable numbers."
      faqs={FAQS}
      relatedToolHrefs={["/tools/savings-goal-calculator", "/tools/sip-calculator"]}
    >
      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          How to build your first financial plan
        </h2>
        <p className="mt-2 leading-relaxed">
          Start with three things: a clear view of your monthly income and expenses, an
          emergency fund target, and a short list of specific goals with rough timelines and
          amounts attached. A plan that says "save more" is hard to act on; a plan that says
          "save ₹8,000/month toward a ₹5 lakh emergency fund by 2028" is something you can
          actually track and adjust.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          Short, medium and long-term goals
        </h2>
        <p className="mt-2 leading-relaxed">
          Matching each goal's timeline to an appropriate level of risk keeps your plan
          realistic. Short-term goals (under roughly 2 years — a trip, a gadget, a wedding
          contribution) are best kept in low-risk, liquid savings, since there's little time to
          recover from a downturn. Medium-term goals (2–7 years — a car, a down payment) can
          take on moderate risk. Long-term goals (7+ years — retirement, a child's education) can
          typically afford more equity exposure, since time allows short-term volatility to
          average out.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          How to calculate your net worth
        </h2>
        <p className="mt-2 leading-relaxed">
          Net worth is simply assets minus liabilities. List everything you own with resale or
          cash value — bank balances, investments, property, gold, vehicles — and subtract every
          outstanding debt — home loan, personal loan, credit card balance, and so on. A single
          net worth number matters less than the trend: recalculating it every few months shows
          whether your overall financial position is actually improving, independent of any one
          account's ups and downs.
        </p>
      </section>
    </GuidePageLayout>
  );
}
