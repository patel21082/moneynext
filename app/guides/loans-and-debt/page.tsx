import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/seo";
import GuidePageLayout from "@/components/GuidePageLayout";

const TITLE = "Loans & Debt: How EMI and Interest Actually Work";
const DESCRIPTION =
  "What EMI means, how loan interest works, personal loans vs credit card debt, and whether to pay off debt or invest.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides/loans-and-debt" },
  openGraph: { title: `${TITLE} — ${SITE_NAME}`, description: DESCRIPTION, type: "article" },
};

const FAQS = [
  {
    q: "What is EMI?",
    a: "EMI (Equated Monthly Instalment) is the fixed monthly amount you pay toward a loan, made up of interest and principal in a ratio that shifts over the loan's life — see our EMI calculator for a full breakdown.",
  },
  {
    q: "How does loan interest work?",
    a: "Most loans in India use reducing-balance interest, meaning interest is charged only on the outstanding principal, not the original loan amount — so as you pay down the balance, the interest portion of each EMI shrinks and the principal portion grows.",
  },
  {
    q: "Personal loan vs credit card debt — which is worse?",
    a: "Credit card debt carried month to month typically charges a much higher effective interest rate than a personal loan, making it one of the most expensive common forms of consumer debt — converting revolving credit card debt into a personal loan can sometimes reduce the interest cost significantly.",
  },
  {
    q: "Should I pay off debt or invest?",
    a: "As a general rule, debt with an interest rate higher than what you could reliably earn investing is usually worth paying off first, since eliminating it is equivalent to a guaranteed return equal to that interest rate. Lower-rate, long-tenure debt (some home loans) is more of a personal judgment call.",
  },
  {
    q: "What happens when I make a loan prepayment?",
    a: "A prepayment reduces your outstanding principal directly, which reduces the interest charged on it every month afterward — the earlier in the loan's life you prepay, the more total interest it saves, since more months of reduced interest remain.",
  },
];

export default function LoansAndDebtGuidePage() {
  return (
    <GuidePageLayout
      path="/guides/loans-and-debt"
      breadcrumbLabel="Loans & Debt"
      h1="Loans & Debt: How EMI and Interest Actually Work"
      intro="Understanding how your EMI is actually built — and which debt to tackle first — can save far more money than chasing a slightly better interest rate."
      faqs={FAQS}
      relatedToolHrefs={["/tools/emi-calculator", "/tools/debt-payoff-calculator"]}
    >
      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">What is EMI?</h2>
        <p className="mt-2 leading-relaxed">
          EMI is the fixed monthly payment that repays a loan over its agreed tenure. Each
          instalment is split between interest — the lender's charge for the loan — and
          principal — the amount actually being repaid. See our{" "}
          <a href="/tools/emi-calculator" className="text-signal underline">
            EMI calculator
          </a>{" "}
          for the exact formula and a full year-by-year breakdown.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          How loan interest actually works
        </h2>
        <p className="mt-2 leading-relaxed">
          Most loans use the reducing-balance method: interest is charged only on whatever
          principal is still outstanding, recalculated each period. This means your EMI stays
          fixed, but the mix inside it shifts — more interest early on, more principal later —
          because the outstanding balance shrinks over time.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          Personal loan vs credit card debt
        </h2>
        <p className="mt-2 leading-relaxed">
          Credit card debt that isn't paid off in full each month typically accrues interest at
          a much higher effective annual rate than most personal loans. If you're carrying a
          credit card balance for multiple months, it's usually one of the most expensive debts
          you can have — worth prioritizing for payoff, or consolidating into a lower-rate
          personal loan if that's available to you.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          Should you pay off debt or invest?
        </h2>
        <p className="mt-2 leading-relaxed">
          Paying off a debt that charges, say, 15% interest is mathematically equivalent to
          earning a guaranteed 15% return — hard to beat reliably through investing. Lower-rate,
          long-tenure debt like many home loans is a closer call, since long-term equity returns
          have historically exceeded typical home loan rates over long horizons, though with no
          guarantee. Our{" "}
          <a href="/tools/debt-payoff-calculator" className="text-signal underline">
            debt payoff calculator
          </a>{" "}
          can help you compare strategies across multiple debts at once.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          What happens when you prepay
        </h2>
        <p className="mt-2 leading-relaxed">
          A prepayment reduces your outstanding principal immediately, so every future EMI
          calculates interest on a smaller balance. The earlier in the loan you prepay, the more
          total interest it saves, since more months of "reduced interest" remain ahead of you.
          Check whether your lender charges a prepayment penalty before making a large one —
          many floating-rate home loans in India don't, but some fixed-rate loans do.
        </p>
      </section>
    </GuidePageLayout>
  );
}
