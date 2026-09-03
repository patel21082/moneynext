import Link from "next/link";
import { SITE_NAME } from "@/lib/seo";
import { TOOLS, GUIDES, COMPANY, LEGAL } from "@/lib/siteNav";

function FooterColumn({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm text-ink-600 transition hover:text-ink-900"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-900/8 bg-paper-50 py-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link href="/" className="font-display text-lg font-semibold text-ink-900">
              {SITE_NAME}
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-600">
              Simple tools and clear explanations for better financial decisions.
            </p>
          </div>

          <FooterColumn title="Tools" items={TOOLS} />
          <FooterColumn title="Learn" items={[{ href: "/learn", label: "All guides" }, ...GUIDES]} />
          <FooterColumn title="Company" items={COMPANY} />
          <FooterColumn title="Legal" items={LEGAL} />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-900/8 pt-6 sm:flex-row">
          <p className="text-xs text-ink-500">
            © {year} {SITE_NAME}. Educational content and tools — not regulated financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
