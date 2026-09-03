"use client";

import { useMemo, useState } from "react";
import { calculateSIP } from "@/lib/toolCalculators";
import { formatINR } from "@/lib/calculations";
import NumberField from "@/components/NumberField";

export default function SipCalculatorTool() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [years, setYears] = useState(15);
  const [stepUp, setStepUp] = useState(0);

  const result = useMemo(
    () =>
      calculateSIP({
        monthlyInvestment,
        annualReturnPct: annualReturn,
        years,
        stepUpPct: stepUp,
      }),
    [monthlyInvestment, annualReturn, years, stepUp]
  );

  const investedSharePct =
    result.futureValue > 0 ? Math.round((result.totalInvested / result.futureValue) * 100) : 0;

  return (
    <div className="rounded-xl2 border border-ink-900/8 bg-paper-100/60 p-5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberField
          label="Monthly investment"
          value={monthlyInvestment}
          onChange={setMonthlyInvestment}
          suffix="₹"
          step={500}
        />
        <NumberField
          label="Expected annual return"
          value={annualReturn}
          onChange={setAnnualReturn}
          suffix="%"
          step={0.5}
        />
        <NumberField label="Investment duration" value={years} onChange={setYears} suffix="years" />
        <NumberField
          label="Annual step-up (optional)"
          value={stepUp}
          onChange={setStepUp}
          suffix="%"
          step={1}
        />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-ink-900 p-5 text-paper-50">
          <p className="text-xs uppercase tracking-wide text-paper-200/70">Future value</p>
          <p className="mt-1 font-display text-2xl font-semibold tabular">
            {formatINR(result.futureValue)}
          </p>
        </div>
        <div className="rounded-xl border border-ink-900/8 bg-paper-50 p-5">
          <p className="text-xs uppercase tracking-wide text-ink-600">Total invested</p>
          <p className="mt-1 font-display text-2xl font-semibold text-ink-900 tabular">
            {formatINR(result.totalInvested)}
          </p>
        </div>
        <div className="rounded-xl border border-ink-900/8 bg-paper-50 p-5">
          <p className="text-xs uppercase tracking-wide text-ink-600">Estimated returns</p>
          <p className="mt-1 font-display text-2xl font-semibold text-gain tabular">
            {formatINR(result.estimatedReturns)}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-xs text-ink-600">
          <span>Invested ({investedSharePct}%)</span>
          <span>Growth ({100 - investedSharePct}%)</span>
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
