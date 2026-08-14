import { Lock, Database, UserX, Send } from "lucide-react";

const POINTS = [
  {
    icon: UserX,
    title: "No account required",
    body: "Use the full analysis without signing up or creating a profile.",
  },
  {
    icon: Database,
    title: "No database",
    body: "MoneyNext doesn't maintain a database or store a financial profile for you.",
  },
  {
    icon: Send,
    title: "Sent only when you ask",
    body: "The information you enter is sent to the AI service only when you request an analysis.",
  },
  {
    icon: Lock,
    title: "Cleared on refresh",
    body: "Refreshing the page clears your current form. Nothing is saved in between visits.",
  },
];

export default function PrivacySection() {
  return (
    <section className="bg-ink-900 py-20 text-paper-50 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Your financial information stays in your browser.
        </h2>
        <p className="mt-4 max-w-2xl text-ink-100/70" style={{ color: "#C7CCDA" }}>
          MoneyNext is built to work without holding on to what you tell it. Here's exactly how
          your data is handled.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((point) => (
            <div key={point.title}>
              <point.icon size={20} className="text-signal-light" />
              <h3 className="mt-4 font-display text-base font-semibold">{point.title}</h3>
              <p className="mt-1.5 text-sm" style={{ color: "#9AA3B8" }}>
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
