import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-ink-900/8 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8">
        <span className="font-display text-sm font-semibold text-ink-900">MoneyNext</span>
        <p className="text-xs text-ink-600">
          Educational financial planning tool. Not regulated financial advice.
        </p>
        <Link href="/privacy" className="text-xs font-medium text-ink-600 hover:text-ink-900">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
