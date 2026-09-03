import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/seo";
import SavingsGoalCalculatorTool from "@/components/SavingsGoalCalculatorTool";
import ToolPageLayout from "@/components/ToolPageLayout";

const TITLE = "Savings Goal Calculator";
const DESCRIPTION =
  "Work out exactly how much you need to save every month to reach a savings goal by a target date, based on your expected rate of return.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools/savings-goal-calculator" },
  openGraph: { title: `${TITLE} — ${SITE_NAME}`, description: DESCRIPTION, type: "website" },
};

const FAQS = [
  {
    q: "How is the required monthly contribution calculated?",
    a: "The calculator projects your current savings forward at your expected return rate, subtracts that from your goal to find the remaining amount needed, then solves for the level monthly contribution that would close that gap by your target date, assuming the same rate of return on each contribution.",
  },
  {
    q: "What if I change my expected return assumption?",
    a: "A higher assumed return lowers the required monthly contribution, because more of the goal is expected to come from investment growth rather than your own contributions — but a higher return assumption also means more risk if the actual return falls short, so it's worth being conservative for near-term goals.",
  },
  {
    q: "Should I use this for a short-term goal, like a goal 1 year away?",
    a: "For goals under 2–3 years, most planners suggest keeping the money in low-risk instruments (savings accounts, short-term deposits) rather than assuming market-linked returns, since there's little time to recover from a downturn — use a low or 0% return assumption for these goals.",
  },
  {
    q: "What if the required contribution is more than I can save?",
    a: "You have three levers: extend the time period, lower the goal amount, or increase your current savings before you start (for example, from a bonus or windfall) — adjusting any of these in the calculator shows how much it changes the required monthly amount.",
  },
];

export default function SavingsGoalCalculatorPage() {
  return (
    <ToolPageLayout
      path="/tools/savings-goal-calculator"
      breadcrumbLabel="Savings Goal Calculator"
      h1="Savings Goal Calculator"
      intro="Enter a goal amount and timeline, and see exactly how much you need to save each month to get there."
      calculator={<SavingsGoalCalculatorTool />}
      faqs={FAQS}
      articleSections={[
        {
          heading: "Working backward from a goal",
          content: (
            <p>
              Most savings planning starts with a monthly amount and asks "what will this grow
              into?" This calculator works the opposite way: you specify what you want to reach
              and by when, and it solves for the monthly amount required — often a more useful
              question when you have a specific goal in mind, like a down payment, a wedding, or
              a child's education fund.
            </p>
          ),
        },
        {
          heading: "Why the return assumption matters so much here",
          content: (
            <p>
              Because you're solving for a required contribution rather than projecting a fixed
              one, the return assumption has a large effect on the answer — a small change in
              expected return can noticeably change how much you need to set aside monthly. Use
              a rate that matches where you'd actually invest this money, not an optimistic
              average.
            </p>
          ),
        },
      ]}
    />
  );
}
