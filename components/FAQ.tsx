import FaqAccordion from "@/components/FaqAccordion";

const FAQS = [
  {
    q: "What is MoneyNext?",
    a: "MoneyNext is a free AI-powered financial planning tool built for Indian users. You enter your income, expenses, loans, SIPs and savings through a short guided wizard, and it gives you a financial health score, a prioritized action plan, and a roadmap for what to do with your money next.",
  },
  {
    q: "Is MoneyNext free to use?",
    a: "Yes. There's no cost, no premium tier, and no paywalled features. The site is supported by display advertising rather than subscriptions.",
  },
  {
    q: "Do I need to create an account or sign up?",
    a: "No. There's no signup, login, or account of any kind. You can go straight to the wizard and get your analysis in the same visit.",
  },
  {
    q: "Do you store my financial information?",
    a: "No. MoneyNext doesn't maintain a database or a financial profile for you. The numbers you enter live only in your browser for the current session, and are sent to the AI service solely to generate your analysis when you request it. Refreshing the page clears everything.",
  },
  {
    q: "How is my financial health score calculated?",
    a: "The score weighs five factors — cash flow, emergency fund coverage, debt burden, savings, and investments — each scored out of 20 points based on standard personal-finance benchmarks (for example, how many months of expenses your emergency fund covers, or what share of income goes to EMIs).",
  },
  {
    q: "How are the calculations performed?",
    a: "Core numbers — monthly surplus, debt-to-income ratio, emergency fund coverage, total EMIs — are calculated locally in your browser using the figures you enter, before anything is sent to the AI for the narrative analysis and recommendations.",
  },
  {
    q: "Is the AI's financial advice guaranteed to be right for me?",
    a: "No. MoneyNext provides educational financial planning suggestions based on the numbers you provide, not personalized professional advice or guaranteed outcomes. It doesn't recommend specific stocks, funds, insurance products, or lenders. For decisions involving significant money, consider speaking with a licensed financial advisor.",
  },
  {
    q: "What is the \"what-if\" scenario feature?",
    a: "After your initial analysis, you can ask follow-up questions like \"What if I increase my SIP to ₹15,000?\" or \"What if I pay ₹5,000 extra toward my loan?\" and the AI will reason through that scenario using the financial details you already entered — without you having to redo the whole wizard.",
  },
  {
    q: "Does MoneyNext support Indian financial terms like SIP and EMI?",
    a: "Yes. The wizard and calculations are built around how Indians actually manage money — monthly SIPs, home/personal/car/education loan EMIs, fixed deposits, gold, and rupee-based income and expenses — rather than a generic international template.",
  },
  {
    q: "Can I use MoneyNext on my phone?",
    a: "Yes. The entire wizard, results dashboard, and health gauge are fully responsive and work on mobile, tablet, laptop, and desktop screens.",
  },
  {
    q: "How long does an analysis take?",
    a: "The guided wizard takes a few minutes to fill in, and the AI analysis itself typically completes in a few seconds once you submit.",
  },
  {
    q: "Can I redo my analysis with different numbers?",
    a: "Yes. After viewing your results, use \"Start a new analysis\" to return to the wizard and enter a different set of numbers at any time.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function FAQ() {
  return (
    <section id="faq" className="py-20 sm:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
          Frequently asked questions
        </h2>
        <div className="mt-9">
          <FaqAccordion items={FAQS} />
        </div>
      </div>
    </section>
  );
}
