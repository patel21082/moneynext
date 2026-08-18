import { ListChecks, Calculator, Sparkles } from "lucide-react";

const STEPS = [
  {
    icon: ListChecks,
    title: "Tell us your numbers",
    body: "Income, expenses, loans, SIP and savings — a guided wizard, six short steps.",
  },
  {
    icon: Calculator,
    title: "See your calculations instantly",
    body: "Surplus, debt ratio and emergency fund coverage are calculated locally in your browser.",
  },
  {
    icon: Sparkles,
    title: "Get an AI action plan",
    body: "A personalized roadmap of what to prioritize now, and over the next 12 months.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-ink-900/6 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="sr-only">How MoneyNext works</h2>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {STEPS.map((step, i) => (
            <div key={step.title}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-signal/10">
                <step.icon size={18} className="text-signal" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-ink-900">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
