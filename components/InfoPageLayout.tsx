import type { ReactNode } from "react";
import Link from "next/link";
import { SITE_NAME } from "@/lib/seo";
import Footer from "@/components/Footer";

export interface InfoPageLayoutProps {
  title: string;
  lastUpdated?: string; // ISO date string; omit for pages that don't need a date
  children: ReactNode;
  maxWidth?: "2xl" | "3xl";
}

export default function InfoPageLayout({
  title,
  lastUpdated,
  children,
  maxWidth = "2xl",
}: InfoPageLayoutProps) {
  return (
    <>
      <main
        className={`mx-auto ${maxWidth === "3xl" ? "max-w-3xl" : "max-w-2xl"} px-5 py-16 sm:px-8 sm:py-24`}
      >
        <Link href="/" className="text-sm font-medium text-signal hover:text-signal-dim">
          ← Back to {SITE_NAME}
        </Link>

        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-ink-900">
          {title}
        </h1>
        {lastUpdated && (
          <p className="mt-2 text-sm text-ink-600">
            Last updated:{" "}
            {new Date(lastUpdated).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}

        <div className="mt-8 space-y-6 text-ink-800">{children}</div>
      </main>
      <Footer />
    </>
  );
}
