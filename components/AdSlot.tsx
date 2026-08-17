"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdSlotProps {
  slot: string;
  format?: "auto" | "horizontal" | "rectangle";
  className?: string;
}

export default function AdSlot({
  slot,
  format = "auto",
  className = "",
}: AdSlotProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const configured = Boolean(client && slot);

  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!configured) return;

    const el = insRef.current;
    if (!el) return;

    // AdSense stamps a processed <ins> with data-adsbygoogle-status once it
    // has filled/attempted the slot. Checking that DOM attribute (rather than
    // a local ref/flag) is what actually prevents "adsbygoogle.push()
    // already have ads in this slot" errors across React StrictMode's
    // double-invoked effects, fast refresh, and re-renders — a local ref
    // resets on every remount, but the DOM node (and this attribute)
    // survives until the <ins> itself is destroyed.
    if (el.getAttribute("data-adsbygoogle-status")) return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (error) {
      console.error("AdSense initialization failed:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configured, client, slot]);

  if (!configured) {
    return (
      <div
        role="complementary"
        aria-label="Advertisement"
        className={`w-full overflow-hidden rounded-2xl border border-dashed border-ink-600/20 bg-paper-100/60 ${className}`}
      >
        <div className="flex min-h-[90px] items-center justify-center px-4 py-6 text-center text-xs uppercase tracking-[0.2em] text-ink-600/50">
          Advertisement
        </div>
      </div>
    );
  }

  return (
    <div
      role="complementary"
      aria-label="Advertisement"
      className={`w-full max-w-full overflow-hidden ${className}`}
    >
      {/*
        key={slot} forces React to mount a brand-new <ins> node if the slot
        id ever changes, instead of mutating attributes on a node AdSense has
        already processed (which AdSense does not support and treats as an
        error). min-height reserves layout space so the container never
        collapses to 0px before the ad request resolves, which avoids a
        content-layout-shift and guarantees adsbygoogle can measure a real
        width when it processes the slot.
      */}
      <ins
        key={slot}
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%", minHeight: "100px" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
