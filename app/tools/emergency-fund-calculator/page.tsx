import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/seo";
import EmergencyFundCalculatorTool from "@/components/EmergencyFundCalculatorTool";
import ToolPageLayout from "@/components/ToolPageLayout";

const TITLE = "Emergency Fund Calculator";
const DESCRIPTION =
  "Find out how many months of expenses you should keep as an emergency fund based on your income stability and dependents, and how far you already are.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools/emergency-fund-calculator" },
  openGraph: { title: `${TITLE} — ${SITE_NAME}`, description: DESCRIPTION, type: "website" },
};

const FAQS = [
  {
    q: "How much emergency fund should I have?",
    a: "A common starting point is 3–6 months of essential expenses for someone with stable income, and 6–9+ months for variable or single-earner households. This calculator adjusts the recommendation based on your income stability and number of dependents.",
  },
  {
    q: "Should my emergency fund cover all my expenses or just essentials?",
    a: "Essentials — rent or EMI, food, utilities, transport, insurance premiums — is the standard basis, since the fund exists to cover unavoidable costs during a loss of income, not your full discretionary lifestyle.",
  },
  {
    q: "Where should I keep my emergency fund?",
    a: "Somewhere liquid and low-risk: a savings account, a sweep-in fixed deposit, or a liquid mutual fund. The priority is being able to access it quickly without a loss of value, not maximizing returns.",
  },
  {
    q: "Emergency fund vs investing extra money — which comes first?",
    a: "Most financial planners recommend building at least a partial emergency fund before investing aggressively, since an emergency fund prevents you from having to sell investments at a bad time or take on high-interest debt when something unexpected happens.",
  },
  {
    q: "How to build an emergency fund from a tight salary?",
    a: "Start with a smaller interim target — even one month of essentials — and automate a fixed transfer right after payday so it happens before discretionary spending, then increase the amount as your income or savings rate improves.",
  },
];

export default function EmergencyFundCalculatorPage() {
  return (
    <ToolPageLayout
      path="/tools/emergency-fund-calculator"
      breadcrumbLabel="Emergency Fund Calculator"
      h1="Emergency Fund Calculator"
      intro="See a recommended emergency fund target based on your expenses, income stability and dependents, and how much coverage you already have."
      calculator={<EmergencyFundCalculatorTool />}
      faqs={FAQS}
      articleSections={[
        {
          heading: "Why the target isn't the same for everyone",
          content: (
            <p>
              A salaried employee with stable income can reasonably plan around 3 months of
              essential expenses, because the odds of a sudden, prolonged income gap are lower.
              Someone with variable income — freelance work, commission-based pay, or running a
              business — faces more uncertainty month to month, so a larger buffer (typically
              6–9 months) provides a more realistic safety margin. Dependents raise the stakes of
              a shortfall, which is why this calculator nudges the target upward as dependents
              increase.
            </p>
          ),
        },
        {
          heading: "Coverage vs target: reading your result",
          content: (
            <p>
              "Current coverage" tells you how many months your existing emergency savings would
              last if all income stopped today. If that number is below your recommended target,
              the "shortfall" figure is what you'd still need to save to close the gap — useful
              as a concrete number to work toward rather than an open-ended goal.
            </p>
          ),
        },
      ]}
    />
  );
}
