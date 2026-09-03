"use client";

export interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
  min?: number;
  step?: number;
}

export default function NumberField({
  label,
  value,
  onChange,
  suffix,
  min = 0,
  step = 1,
}: NumberFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink-800">{label}</span>
      <div className="mt-1.5 flex items-center rounded-xl border border-ink-900/12 bg-paper-50 px-4 py-3 focus-within:border-signal">
        <input
          type="number"
          className="w-full bg-transparent font-mono text-base text-ink-900 outline-none tabular"
          value={Number.isFinite(value) ? value : 0}
          min={min}
          step={step}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
        />
        {suffix && <span className="ml-2 shrink-0 text-sm text-ink-600">{suffix}</span>}
      </div>
    </label>
  );
}
