"use client";

import { useMemo, useState } from "react";
import { calculateCompoundInterest, CompoundInterestInput } from "@/lib/toolCalculators";
import { formatINR } from "@/lib/calculations";
import NumberField from "@/components/NumberField";

const FREQUENCIES: { value: CompoundInterestInput["compoundingFrequency"]; label: string }[] = [
  { value: "annually", label: "Annually" },
  { value: "semi-annually", label: "Semi-annually" },
  { value: "quarterly", label: "Quarterly" },
  { value: "monthly", label: "Monthly" },
];

export default function CompoundInterestCalculatorTool() {
  const [principal, setPrincipal] = useState(100000);
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(10);
  const [frequency, setFrequency] =
    useState<CompoundInterestInput["compoundingFrequency"]>("monthly");

  const result = useMemo(
    () =>
      calculateCompoundInterest({
        principal,
        monthlyContribution,
        annualRatePct: rate,
        years,
        compoundingFrequency: frequency,
      }),
    [principal, monthlyContribution, rate, years, frequency]
  );

  const investedSharePct =
    result.finalValue > 0 ? Math.round((result.totalInvested / result.finalValue) * 100) : 0;

  return (
    <div className="rounded-xl2 border border-ink-900/8 bg-paper-100/60 p-5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberField label="Principal" value={principal} onChange={setPrincipal} suffix="₹" step={1000} />
        <NumberField
          label="Monthly contribution"
          value={monthlyContribution}
          onChange={setMonthlyContribution}
          suffix="₹"
          step={500}
        />
        <NumberField label="Interest rate (annual)" value={rate} onChange={setRate} suffix="%" step={0.5} />
        <NumberField label="Investment period" value={years} onChange={setYears} suffix="years" />
      </div>

      <div className="mt-5">
        <span className="text-sm font-medium text-ink-800">Compounding frequency</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {FREQUENCIES.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFrequency(f.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                frequency === f.value
                  ? "bg-ink-900 text-paper-50"
                  : "border border-ink-900/12 bg-paper-50 text-ink-700 hover:border-ink-900/30"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-ink-900 p-5 text-paper-50">
          <p className="text-xs uppercase tracking-wide text-paper-200/70">Final value</p>
          <p className="mt-1 font-display text-2xl font-semibold tabular">
            {formatINR(result.finalValue)}
          </p>
        </div>
        <div className="rounded-xl border border-ink-900/8 bg-paper-50 p-5">
          <p className="text-xs uppercase tracking-wide text-ink-600">Total invested</p>
          <p className="mt-1 font-display text-2xl font-semibold text-ink-900 tabular">
            {formatINR(result.totalInvested)}
          </p>
        </div>
        <div className="rounded-xl border border-ink-900/8 bg-paper-50 p-5">
          <p className="text-xs uppercase tracking-wide text-ink-600">Estimated interest</p>
          <p className="mt-1 font-display text-2xl font-semibold text-gain tabular">
            {formatINR(result.estimatedInterest)}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-xs text-ink-600">
          <span>Invested ({investedSharePct}%)</span>
          <span>Interest ({100 - investedSharePct}%)</span>
        </div>
        <div className="mt-1.5 flex h-2.5 w-full overflow-hidden rounded-full bg-paper-200">
          <div className="h-full bg-signal" style={{ width: `${investedSharePct}%` }} />
          <div className="h-full bg-gain" style={{ width: `${100 - investedSharePct}%` }} />
        </div>
      </div>

      <div className="mt-8">
        <p className="font-display text-sm font-semibold text-ink-900">Year-by-year growth</p>
        <div className="mt-3 max-h-72 overflow-y-auto rounded-xl border border-ink-900/8">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-paper-100 text-xs uppercase tracking-wide text-ink-600">
              <tr>
                <th className="px-4 py-2 font-medium">Year</th>
                <th className="px-4 py-2 font-medium">Invested so far</th>
                <th className="px-4 py-2 font-medium">Value</th>
              </tr>
            </thead>
            <tbody>
              {result.schedule.map((row) => (
                <tr key={row.year} className="border-t border-ink-900/6">
                  <td className="px-4 py-2 tabular text-ink-800">{row.year}</td>
                  <td className="px-4 py-2 tabular text-ink-800">{formatINR(row.invested)}</td>
                  <td className="px-4 py-2 tabular text-ink-800">{formatINR(row.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
