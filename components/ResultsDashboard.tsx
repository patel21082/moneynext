"use client";

import { AlertTriangle, TrendingUp } from "lucide-react";
import { CalculatedMetrics, AIAnalysisResponse } from "@/lib/types";
import { formatINR } from "@/lib/calculations";
import HealthGauge from "./HealthGauge";
import { HealthScoreBreakdown } from "@/lib/types";

const SEVERITY_STYLES: Record<string, string> = {
  high: "bg-danger-soft text-danger",
  medium: "bg-warn-soft text-warn",
  low: "bg-gain-soft text-gain",
};

export default function ResultsDashboard({
  metrics,
  result,
  breakdown,
}: {
  metrics: CalculatedMetrics;
  result: AIAnalysisResponse;
  breakdown: HealthScoreBreakdown;
}) {
  return (
    <div className="animate-fadeUp">
      <h2 className="font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
        Your Financial Next Steps
      </h2>
      {result.summary && (
        <p className="mt-3 max-w-2xl text-ink-700">{result.summary}</p>
      )}

      <div className="mt-9 rounded-xl2 border border-ink-900/8 bg-white p-6 sm:p-8">
        <HealthGauge score={result.financial_health.score} label={result.financial_health.label} breakdown={breakdown} />
      </div>

      <p className="mb-3 mt-10 text-xs font-medium uppercase tracking-[0.14em] text-ink-600/60">
        Financial Snapshot
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <SnapshotCard label="Income" value={formatINR(metrics.totalIncome)} />
        <SnapshotCard label="Expenses" value={formatINR(metrics.totalMonthlyExpenses)} />
        <SnapshotCard label="EMIs" value={formatINR(metrics.totalEMI)} />
        <SnapshotCard label="SIP" value={formatINR(metrics.monthlySIP)} />
        <SnapshotCard
          label="Monthly surplus"
          value={formatINR(metrics.monthlySurplus)}
          tone={metrics.monthlySurplus >= 0 ? "gain" : "danger"}
        />
      </div>

      {result.warnings.length > 0 && (
        <div className="mt-8 space-y-2">
          {result.warnings.map((w, i) => (
            <div key={i} className="flex items-start gap-2.5 rounded-lg bg-warn-soft px-4 py-3 text-sm text-warn">
              <AlertTriangle size={16} className="mt-0.5 shrink-0" />
              <span>{w}</span>
            </div>
          ))}
        </div>
      )}

      {result.priorities.length > 0 && (
        <>
          <p className="mb-4 mt-12 text-xs font-medium uppercase tracking-[0.14em] text-ink-600/60">
            AI Priorities
          </p>
          <div className="space-y-4">
            {result.priorities
              .slice()
              .sort((a, b) => a.priority - b.priority)
              .map((p) => (
                <div
                  key={p.priority}
                  className="rounded-xl2 border border-ink-900/8 bg-white p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-2xl font-semibold tabular text-ink-900/15">
                        {String(p.priority).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-lg font-semibold uppercase tracking-tight text-ink-900">
                        {p.title}
                      </h3>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium capitalize ${
                        SEVERITY_STYLES[p.severity] ?? SEVERITY_STYLES.low
                      }`}
                    >
                      {p.severity}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-700">{p.description}</p>
                  {p.reason && (
                    <div className="mt-3 rounded-lg bg-paper-100 px-4 py-3">
                      <p className="text-xs font-medium uppercase tracking-[0.1em] text-ink-600/60">
                        Why this matters
                      </p>
                      <p className="mt-1 text-sm text-ink-700">{p.reason}</p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </>
      )}

      {result.roadmap.length > 0 && <Roadmap roadmap={result.roadmap} />}
    </div>
  );
}

function SnapshotCard({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "gain" | "danger";
}) {
  const toneClass = tone === "gain" ? "text-gain" : tone === "danger" ? "text-danger" : "text-ink-900";
  return (
    <div className="rounded-xl border border-ink-900/8 bg-white p-4">
      <p className="text-xs text-ink-600">{label}</p>
      <p className={`mt-1.5 font-mono text-base font-semibold tabular sm:text-lg ${toneClass}`}>{value}</p>
    </div>
  );
}

function Roadmap({ roadmap: stages }: { roadmap: AIAnalysisResponse["roadmap"] }) {
  return (
    <>
      <p className="mb-6 mt-12 text-xs font-medium uppercase tracking-[0.14em] text-ink-600/60">
        Financial Roadmap
      </p>
      <div className="relative border-l border-ink-900/10 pl-7 sm:pl-9">
        {stages.map((stage, i) => (
          <div key={stage.period} className="relative pb-9 last:pb-0">
            <span className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-signal ring-4 ring-paper-50 sm:-left-[39px]">
              <TrendingUp size={9} className="text-white" />
            </span>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.08em] text-signal">
              {stage.period}
            </p>
            <ul className="mt-2.5 space-y-2">
              {stage.actions.map((action, j) => (
                <li key={j} className="flex gap-2.5 text-sm text-ink-700">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-600/40" />
                  {action}
                </li>
              ))}
              {stage.actions.length === 0 && (
                <li className="text-sm text-ink-600/60">No specific actions suggested for this period.</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
