import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { SITE_NAME, SITE_CONTACT_EMAIL } from "@/lib/seo";
import AdSlot from "@/components/AdSlot";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact",
  description: `How to reach the team behind ${SITE_NAME} with questions, feedback, or corrections.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <main className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
      <Link href="/" className="text-sm font-medium text-signal hover:text-signal-dim">
        ← Back to {SITE_NAME}
      </Link>

      <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-ink-900">
        Contact
      </h1>
      <p className="mt-3 max-w-lg text-ink-700">
        Questions about how the calculations work, feedback on the analysis, a bug report, or a
        privacy question — reach out directly and we'll get back to you.
      </p>

      <div className="mt-8 space-y-4">
        <a
          href={`mailto:${SITE_CONTACT_EMAIL}`}
          className="flex items-center gap-3 rounded-xl border border-ink-900/8 bg-white px-5 py-4 transition hover:bg-paper-100"
        >
          <Mail size={18} className="shrink-0 text-signal" />
          <div>
            <p className="text-sm font-medium text-ink-900">Email</p>
            <p className="text-sm text-ink-600">{SITE_CONTACT_EMAIL}</p>
          </div>
        </a>

        <div className="flex items-center gap-3 rounded-xl border border-ink-900/8 bg-white px-5 py-4">
          <MapPin size={18} className="shrink-0 text-signal" />
          <div>
            <p className="text-sm font-medium text-ink-900">Based in</p>
            <p className="text-sm text-ink-600">India</p>
          </div>
        </div>
      </div>

      <p className="mt-8 text-xs leading-relaxed text-ink-600">
        {SITE_NAME} is an independent educational tool, not a licensed financial advisory
        service — see the{" "}
        <Link href="/about" className="text-signal underline">
          About page
        </Link>{" "}
        for details.
      </p>

      <div className="mt-10">
        <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM ?? ""} />
      </div>
    </main>
    <Footer />
    </>
  );
}
