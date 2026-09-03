import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/seo";
import DebtPayoffCalculatorTool from "@/components/DebtPayoffCalculatorTool";
import ToolPageLayout from "@/components/ToolPageLayout";

const TITLE = "Debt Payoff Calculator — Avalanche vs Snowball";
const DESCRIPTION =
  "Add all your debts and see how long it takes to become debt-free, the total interest you'll pay, and how an extra monthly payment changes the outcome.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools/debt-payoff-calculator" },
  openGraph: { title: `${TITLE} — ${SITE_NAME}`, description: DESCRIPTION, type: "website" },
};

const FAQS = [
  {
    q: "What's the difference between avalanche and snowball?",
    a: "Avalanche directs any extra payment to the debt with the highest interest rate first, which minimizes total interest paid mathematically. Snowball directs it to the smallest balance first, which clears individual debts faster and can build motivation, even though it usually costs slightly more in total interest.",
  },
  {
    q: "Should I pay off debt or invest extra money?",
    a: "As a rule of thumb, paying off debt with an interest rate higher than what you could reliably earn investing (for example, most credit card debt) tends to come first, since that's a guaranteed 'return' equal to the interest rate you stop paying. Lower-rate debt, like some home loans, is more of a judgment call.",
  },
  {
    q: "What happens if I make a loan prepayment?",
    a: "A prepayment reduces your outstanding principal directly, which reduces the interest calculated on it for every month going forward — the earlier in the loan you prepay, the more total interest it saves.",
  },
  {
    q: "Does this calculator account for prepayment penalties?",
    a: "No — it assumes the full extra payment goes toward principal with no penalty. Some lenders charge a prepayment or foreclosure fee, particularly on fixed-rate loans, so check your loan terms before making large extra payments.",
  },
];

export default function DebtPayoffCalculatorPage() {
  return (
    <ToolPageLayout
      path="/tools/debt-payoff-calculator"
      breadcrumbLabel="Debt Payoff Calculator"
      h1="Debt Payoff Calculator"
      intro="List everything you owe, choose a strategy, and see how long it takes to be debt-free and how much interest an extra payment would save."
      calculator={<DebtPayoffCalculatorTool />}
      faqs={FAQS}
      articleSections={[
        {
          heading: "How the extra payment is applied",
          content: (
            <p>
              Every debt still gets its own minimum payment every month. Whatever extra amount
              you specify is funneled entirely into one debt at a time — chosen by your selected
              strategy — until that debt is fully paid off, then it rolls onto the next one. This
              mirrors how most people actually pay down multiple debts in practice.
            </p>
          ),
        },
        {
          heading: "Choosing avalanche or snowball",
          content: (
            <p>
              If minimizing total interest paid is your only goal, avalanche (highest rate
              first) is mathematically optimal. If staying motivated by clearing accounts
              quickly matters more to you than optimizing every rupee of interest, snowball
              (smallest balance first) can be worth the small extra cost — there's no wrong
              choice, only a trade-off between efficiency and psychology.
            </p>
          ),
        },
        {
          heading: "What happens if I pay extra every month?",
          content: (
            <p>
              Even a modest extra monthly payment compounds in your favor the same way interest
              does against you — it shortens the payoff timeline and reduces total interest paid,
              often by more than people expect relative to the size of the extra payment. Try
              increasing the extra payment field above to see the effect on your own numbers.
            </p>
          ),
        },
      ]}
    />
  );
}
