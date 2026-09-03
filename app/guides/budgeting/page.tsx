import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/seo";
import GuidePageLayout from "@/components/GuidePageLayout";

const TITLE = "How to Create a Monthly Budget in India";
const DESCRIPTION =
  "A practical, step-by-step guide to building a monthly budget that survives real life — with a worked example on a ₹50,000 salary.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides/budgeting" },
  openGraph: { title: `${TITLE} — ${SITE_NAME}`, description: DESCRIPTION, type: "article" },
};

const FAQS = [
  {
    q: "What's the 50/30/20 rule?",
    a: "A simple budgeting guideline: roughly 50% of take-home income toward needs, 30% toward wants, and 20% toward savings and debt repayment beyond minimums. It's a starting ratio to adjust, not a strict rule — high rent cities often push needs well above 50%.",
  },
  {
    q: "How much should I save from my salary?",
    a: "A commonly cited target is 20% or more of take-home income, split between an emergency fund and long-term investments, but the right number depends on your expenses, debt, and goals — the important habit is saving a consistent amount automatically, then increasing it as income grows.",
  },
  {
    q: "How do I track expenses without it becoming a chore?",
    a: "Most people succeed with either a simple expense-tracking app that reads bank/UPI transactions automatically, or a manual spreadsheet reviewed weekly rather than daily. The goal is a habit you'll actually keep, not a perfectly detailed ledger you abandon after two weeks.",
  },
];

export default function BudgetingGuidePage() {
  return (
    <GuidePageLayout
      path="/guides/budgeting"
      breadcrumbLabel="Budgeting"
      h1="How to Create a Monthly Budget in India"
      intro="A budget isn't about restriction — it's about deciding in advance where your money goes, instead of finding out at the end of the month where it went."
      faqs={FAQS}
      relatedToolHrefs={["/tools/emi-calculator", "/tools/savings-goal-calculator"]}
    >
      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          1. Understand your take-home income
        </h2>
        <p className="mt-2 leading-relaxed">
          Start with what actually lands in your account after tax, PF, and any other
          deductions — not your CTC. Include predictable additional income (a stable side
          income, rental income) but leave out irregular income like bonuses; treat those as a
          bonus for goals, not a baseline you budget against.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          2. Separate needs from wants
        </h2>
        <p className="mt-2 leading-relaxed">
          Needs are costs you'd struggle to avoid without real disruption — rent or EMI, food,
          utilities, transport to work, insurance. Wants are everything that improves quality of
          life but could be reduced without a crisis — dining out, subscriptions, upgrades. This
          split is what makes the rest of budgeting possible: you can't decide what to cut until
          you know what's actually flexible.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          3. Track recurring expenses
        </h2>
        <p className="mt-2 leading-relaxed">
          Before setting targets, spend one full month simply recording what you already spend,
          categorized into needs and wants. Most people are surprised by at least one category —
          usually food delivery, subscriptions, or small recurring charges that add up. You can't
          set a realistic budget without this baseline.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          4. Account for EMIs
        </h2>
        <p className="mt-2 leading-relaxed">
          Loan EMIs are fixed, contractual needs — they belong in your needs bucket, not
          wants, and they should be accounted for before you decide how much is left for
          everything else. If your total EMI load is eating a large share of income, our{" "}
          <a href="/tools/emi-calculator" className="text-signal underline">
            EMI calculator
          </a>{" "}
          can help you see how a longer tenure or a prepayment plan would change that.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          5. Create an emergency fund
        </h2>
        <p className="mt-2 leading-relaxed">
          Before optimizing the rest of your budget, build at least a partial buffer — even one
          month of essential expenses — so a single unexpected cost doesn't force you into debt
          or derail your other goals. See our{" "}
          <a href="/guides/saving" className="text-signal underline">
            saving and emergency fund guide
          </a>{" "}
          for how much to target.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          6. Set savings targets
        </h2>
        <p className="mt-2 leading-relaxed">
          Once needs, EMIs, and an emergency fund contribution are accounted for, decide a fixed
          percentage or amount for savings and investing — and treat it like a bill you pay
          yourself, not what's left over after discretionary spending.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          7. Automate investments
        </h2>
        <p className="mt-2 leading-relaxed">
          Set up automatic transfers or SIPs on payday, before you have a chance to spend the
          money elsewhere. Budgets that depend on remembering to save manually every month tend
          to fail quietly; automation removes that failure point.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          8. Review your budget every month
        </h2>
        <p className="mt-2 leading-relaxed">
          Life changes — rent goes up, a new EMI starts, income grows. A budget set once and
          never revisited drifts out of relevance within a few months. A short monthly review —
          ten minutes comparing actual spending to plan — keeps it useful.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          Example: ₹50,000 salary budget
        </h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-ink-900/8">
          <table className="w-full text-left text-sm">
            <thead className="bg-paper-100 text-xs uppercase tracking-wide text-ink-600">
              <tr>
                <th className="px-4 py-2 font-medium">Category</th>
                <th className="px-4 py-2 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Housing (rent/EMI)", "₹15,000"],
                ["Food", "₹7,000"],
                ["Transport", "₹5,000"],
                ["Utilities", "₹3,000"],
                ["Insurance", "₹2,000"],
                ["Savings & investing", "₹10,000"],
                ["Entertainment", "₹3,000"],
                ["Other / buffer", "₹5,000"],
              ].map(([label, amt]) => (
                <tr key={label} className="border-t border-ink-900/6">
                  <td className="px-4 py-2 text-ink-800">{label}</td>
                  <td className="px-4 py-2 tabular text-ink-800">{amt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-ink-600">
          This is an illustrative starting point, not a prescription — your own housing costs,
          city, and family situation will shift these numbers significantly.
        </p>
      </section>
    </GuidePageLayout>
  );
}
