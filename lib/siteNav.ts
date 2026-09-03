export interface NavItem {
  href: string;
  label: string;
  description?: string;
}

export const TOOLS: NavItem[] = [
  {
    href: "/tools/emi-calculator",
    label: "EMI Calculator",
    description: "Monthly instalment, total interest and prepayment savings for any loan.",
  },
  {
    href: "/tools/sip-calculator",
    label: "SIP Calculator",
    description: "Project the future value of a monthly SIP, with optional annual step-up.",
  },
  {
    href: "/tools/compound-interest-calculator",
    label: "Compound Interest Calculator",
    description: "See how principal, contributions and compounding frequency grow your money.",
  },
  {
    href: "/tools/emergency-fund-calculator",
    label: "Emergency Fund Calculator",
    description: "How many months of expenses you should keep saved, and your current coverage.",
  },
  {
    href: "/tools/debt-payoff-calculator",
    label: "Debt Payoff Calculator",
    description: "Compare avalanche vs snowball payoff strategies across all your debts.",
  },
  {
    href: "/tools/savings-goal-calculator",
    label: "Savings Goal Calculator",
    description: "Work out the monthly contribution needed to hit a savings target by a date.",
  },
];

export const GUIDES: NavItem[] = [
  {
    href: "/guides/budgeting",
    label: "Budgeting",
    description: "Build a monthly budget that actually survives contact with real life.",
  },
  {
    href: "/guides/saving",
    label: "Saving & Emergency Funds",
    description: "How much to save, where to keep it, and how to build the habit.",
  },
  {
    href: "/guides/investing",
    label: "Investing & SIPs",
    description: "SIP vs lump sum, compounding, and how long-term investing actually works.",
  },
  {
    href: "/guides/loans-and-debt",
    label: "Loans & Debt",
    description: "How EMI and interest work, and whether to prepay debt or invest instead.",
  },
  {
    href: "/guides/credit-score",
    label: "Credit Score",
    description: "What drives your credit score and the mistakes that quietly hurt it.",
  },
  {
    href: "/guides/financial-planning",
    label: "Financial Planning",
    description: "Setting goals, building a first financial plan, and tracking net worth.",
  },
];

export const COMPANY: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How MoneyNext Works" },
  { href: "/ai-financial-planner", label: "AI Financial Planner" },
  { href: "/methodology", label: "Methodology" },
  { href: "/editorial-policy", label: "Editorial Policy" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const LEGAL: NavItem[] = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/cookie-policy", label: "Cookie Policy" },
];
