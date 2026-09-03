import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/seo";
import CompoundInterestCalculatorTool from "@/components/CompoundInterestCalculatorTool";
import ToolPageLayout from "@/components/ToolPageLayout";

const TITLE = "Compound Interest Calculator";
const DESCRIPTION =
  "See how a principal amount plus monthly contributions grow over time at different compounding frequencies, and why longer periods compound faster.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools/compound-interest-calculator" },
  openGraph: { title: `${TITLE} — ${SITE_NAME}`, description: DESCRIPTION, type: "website" },
};

const FAQS = [
  {
    q: "What is compound interest?",
    a: "Compound interest is interest calculated on both your original principal and on interest that has already been added to it. Unlike simple interest, which is always calculated on the original amount, compound interest lets your earnings themselves start earning.",
  },
  {
    q: "Does compounding frequency really matter?",
    a: "Yes, though usually less than principal, contribution amount, or rate. Monthly compounding grows your money slightly faster than annual compounding at the same nominal rate, because interest gets added to the base more often — but the effect is modest compared to simply investing for longer or contributing more.",
  },
  {
    q: "Why does compound interest become more powerful over longer periods?",
    a: "In the early years, most of your balance is the principal you put in, and interest earned is small in absolute terms. Over time, the accumulated interest itself becomes large enough to generate significant interest of its own — the growth curve gets visibly steeper in the later years, not the early ones.",
  },
  {
    q: "How is this different from the SIP calculator?",
    a: "The SIP calculator models monthly mutual-fund investing at typical equity return assumptions. This calculator is a more general-purpose compounding tool — useful for fixed deposits, recurring deposits, PPF-style accounts, or any scenario where you want to control the compounding frequency explicitly.",
  },
];

export default function CompoundInterestCalculatorPage() {
  return (
    <ToolPageLayout
      path="/tools/compound-interest-calculator"
      breadcrumbLabel="Compound Interest Calculator"
      h1="Compound Interest Calculator"
      intro="Model how a starting amount plus regular contributions grow at a given interest rate and compounding frequency."
      calculator={<CompoundInterestCalculatorTool />}
      faqs={FAQS}
      articleSections={[
        {
          heading: "Principal, contributions, rate, and frequency — how they interact",
          content: (
            <p>
              Your final value depends on four things: how much you start with (principal), how
              much you add along the way (monthly contribution), how fast it grows (annual
              rate), and how often that growth gets added to your balance (compounding
              frequency). Increasing the investment period has the largest effect on the final
              number, because compounding is exponential — small differences early on become
              large differences by the end.
            </p>
          ),
        },
        {
          heading: "Why does compound interest become more powerful over longer periods?",
          content: (
            <p>
              Each year's interest is calculated on a growing base — your original principal,
              plus every contribution you've made, plus every bit of interest already earned.
              That means the absolute rupee amount of interest earned tends to be small in early
              years and much larger in later years, even though the interest rate itself never
              changes. This is exactly why financial advice consistently emphasizes starting
              early over trying to invest larger amounts later.
            </p>
          ),
        },
      ]}
    />
  );
}
