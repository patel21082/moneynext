import Link from "next/link";
import LogoMark from "@/components/LogoMark";

export default function Footer() {
  return (
    <footer className="border-t border-ink-900/8 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8">
        <span className="flex items-center gap-2">
          <LogoMark size={22} />
          <span className="font-display text-sm font-semibold text-ink-900">MoneyNext</span>
        </span>
        <p className="text-xs text-ink-600">
          Educational financial planning tool. Not regulated financial advice.
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link href="/about" className="text-xs font-medium text-ink-600 hover:text-ink-900">
            About
          </Link>
          <Link href="/contact" className="text-xs font-medium text-ink-600 hover:text-ink-900">
            Contact
          </Link>
          <Link href="/terms" className="text-xs font-medium text-ink-600 hover:text-ink-900">
            Terms of Use
          </Link>
          <Link href="/privacy" className="text-xs font-medium text-ink-600 hover:text-ink-900">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
