"use client";

import { useRef, useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Wizard from "@/components/Wizard";
import AnalyzingScreen from "@/components/AnalyzingScreen";
import ResultsDashboard from "@/components/ResultsDashboard";
import WhatIf from "@/components/WhatIf";
import AdSlot from "@/components/AdSlot";
import PrivacySection from "@/components/PrivacySection";
import Disclaimer from "@/components/Disclaimer";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { calculateMetrics, calculateHealthScore } from "@/lib/calculations";
import { FinancialInput, CalculatedMetrics, AIAnalysisResponse, HealthScoreBreakdown } from "@/lib/types";

type ViewState = "form" | "loading" | "results";

export default function Home() {
  const [view, setView] = useState<ViewState>("form");
  const [metrics, setMetrics] = useState<CalculatedMetrics | null>(null);
  const [breakdown, setBreakdown] = useState<HealthScoreBreakdown | null>(null);
  const [result, setResult] = useState<AIAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastInput, setLastInput] = useState<FinancialInput | null>(null);

  const [whatIfLoading, setWhatIfLoading] = useState(false);
  const [whatIfAnswer, setWhatIfAnswer] = useState<string | null>(null);
  const [whatIfError, setWhatIfError] = useState<string | null>(null);

  const wizardRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  function scrollToWizard() {
    document.getElementById("analysis")?.scrollIntoView({ behavior: "smooth" });
  }

  async function runAnalysis(input: FinancialInput) {
    setError(null);
    const computedMetrics = calculateMetrics(input);
    const health = calculateHealthScore(input, computedMetrics);
    setMetrics(computedMetrics);
    setBreakdown(health.breakdown);
    setLastInput(input);
    setView("loading");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, metrics: computedMetrics }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "We couldn't complete the analysis right now. Please try again.");
        setView("form");
        return;
      }

      setResult(data as AIAnalysisResponse);
      setView("results");
      setWhatIfAnswer(null);
      setWhatIfError(null);
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch {
      setError("We couldn't complete the analysis right now. Please try again.");
      setView("form");
    }
  }

  async function runWhatIf(question: string) {
    if (!lastInput || !metrics) return;
    setWhatIfLoading(true);
    setWhatIfError(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: { ...lastInput, question }, metrics }),
      });
      const data = await res.json();
      if (!res.ok) {
        setWhatIfError(data?.error || "We couldn't answer that right now. Please try again.");
        return;
      }
      setWhatIfAnswer((data as AIAnalysisResponse).summary);
    } catch {
      setWhatIfError("We couldn't answer that right now. Please try again.");
    } finally {
      setWhatIfLoading(false);
    }
  }

  return (
    <>
      <Nav onStart={scrollToWizard} />
      <main>
        <Hero onStart={scrollToWizard} />
        <HowItWorks />

        <div ref={wizardRef}>
          {view === "form" && (
            <Wizard onAnalyze={runAnalysis} loading={false} errorMessage={error} />
          )}
          {view === "loading" && <AnalyzingScreen />}
        </div>

        {view !== "results" && (
          <div className="mx-auto max-w-3xl px-5 pb-4 sm:px-8">
            <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_ANALYSIS ?? ""} />
          </div>
        )}

        {view === "results" && result && metrics && breakdown && (
          <section ref={resultsRef} className="bg-paper-100/50 py-16 sm:py-24">
            <div className="mx-auto max-w-3xl px-5 sm:px-8">
              <ResultsDashboard metrics={metrics} result={result} breakdown={breakdown} />

              <div className="my-10">
                <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_RESULTS ?? ""} />
              </div>

              <WhatIf
                onAsk={runWhatIf}
                loading={whatIfLoading}
                answer={whatIfAnswer}
                error={whatIfError}
              />

              <button
                onClick={() => {
                  setView("form");
                  requestAnimationFrame(() => scrollToWizard());
                }}
                className="mt-8 text-sm font-medium text-signal hover:text-signal-dim"
              >
                Start a new analysis
              </button>
            </div>
          </section>
        )}

        <div className="mx-auto max-w-6xl px-5 pt-4 sm:px-8">
          <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM ?? ""} />
        </div>

        <PrivacySection />
        <Disclaimer />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
