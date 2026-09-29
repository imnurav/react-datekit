import { DatePicker, DateRange } from "react-datekit";
import React, { useState } from "react";
import { DemoCard } from "./DemoCard";

export const RangeDemosSection: React.FC = () => {
  const today = new Date();
  const [range, setRange] = useState<DateRange | null>([
    today,
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
  ]);

  const [presetRange, setPresetRange] = useState<DateRange | null>([
    new Date(today.getFullYear(), today.getMonth(), 1),
    new Date(today.getFullYear(), today.getMonth() + 1, 0), // last day of current month
  ]);
  const [presetPlacement, setPresetPlacement] = useState<
    "left" | "top" | "bottom" | "hidden"
  >("left");
  const [stackRangeMonths, setStackRangeMonths] = useState<boolean | undefined>(undefined);
  const [presetMonths, setPresetMonths] = useState<1 | 2>(1);

  const rangeCode = `import React, { useState } from 'react';
import { DatePicker, DateRange } from 'react-datekit';
import 'react-datekit/style.css';

export default function DateRangeDemo() {
  const [range, setRange] = useState<DateRange | null>([
    new Date(2026, 8, 29),
    new Date(2026, 9, 5),
  ]);

  return (
    <div className="flex flex-col items-center gap-4">
      <DatePicker
        mode="range"
        value={range}
        onChange={setRange}
        numberOfMonths={2}
        // stackMonths omitted: auto-detects container width and stacks downward when tight!
      />
      <p>
        Selected: {range?.[0]?.toLocaleDateString() ?? 'None'} &rarr;{' '}
        {range?.[1]?.toLocaleDateString() ?? 'None'}
      </p>
    </div>
  );
}`;

  const presetsCode = `import React, { useState } from 'react';
import { DatePicker, DateRange } from 'react-datekit';
import 'react-datekit/style.css';

export default function PresetsRangeDemo() {
  const [range, setRange] = useState<DateRange | null>(null);

  return (
    <DatePicker
      mode="range"
      value={range}
      onChange={setRange}
      numberOfMonths={${presetMonths}}
      presets={[
        'today', 'yesterday', 'thisWeek', 'lastWeek',
        'thisMonth', 'lastMonth', 'thisQuarter', 'lastQuarter',
        'thisYear', 'last7Days', 'last30Days',
      ]}
      presetsPlacement="${presetPlacement === "hidden" ? "left" : presetPlacement}" // 'left' | 'top' | 'bottom'
    />
  );
}`;

  const formatDate = (d: Date | null) =>
    d
      ? d.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "None";

  return (
    <div className="space-y-12">
      {/* 1. Date Range */}
      <DemoCard
        id="range"
        title="Date Range Selection"
        description="Select continuous start and end date intervals with dual-month side-by-side view and live hover connector."
        code={rangeCode}
      >
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Months Layout:
            </span>
            <button
              type="button"
              onClick={() => setStackRangeMonths(undefined)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition cursor-pointer border ${
                stackRangeMonths === undefined
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 border-zinc-900 dark:border-white shadow-sm"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              Auto (Smart Responsive)
            </button>
            <button
              type="button"
              onClick={() => setStackRangeMonths(false)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition cursor-pointer border ${
                stackRangeMonths === false
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 border-zinc-900 dark:border-white shadow-sm"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              Side-by-Side (2 Months)
            </button>
            <button
              type="button"
              onClick={() => setStackRangeMonths(true)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition cursor-pointer border ${
                stackRangeMonths === true
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 border-zinc-900 dark:border-white shadow-sm"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              Stacked Downward (1 Column)
            </button>
          </div>

          <DatePicker
            mode="range"
            value={range}
            onChange={setRange}
            numberOfMonths={2}
            stackMonths={stackRangeMonths}
          />
          <div className="flex items-center gap-6 px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs sm:text-sm font-mono border border-zinc-200 dark:border-zinc-700">
            <div>
              <span className="text-zinc-500 dark:text-zinc-400">Start: </span>
              <span className="font-bold text-zinc-900 dark:text-white">
                {formatDate(range?.[0] ?? null)}
              </span>
            </div>
            <span className="text-zinc-300 dark:text-zinc-600">&rarr;</span>
            <div>
              <span className="text-zinc-500 dark:text-zinc-400">End: </span>
              <span className="font-bold text-zinc-900 dark:text-white">
                {formatDate(range?.[1] ?? null)}
              </span>
            </div>
          </div>
        </div>
      </DemoCard>

      {/* 2. Industry-Standard Presets */}
      <DemoCard
        id="presets"
        title="Date Presets & Customizable Placement"
        badge="15 Built-in"
        description="Flexible preset placement: dock on left, top, bottom, or hide completely for a pure calendar view."
        code={presetsCode}
      >
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Months:
              </span>
              {([1, 2] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setPresetMonths(m)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition cursor-pointer border ${
                    presetMonths === m
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 border-zinc-900 dark:border-white shadow-sm"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  {m} {m === 1 ? "Month" : "Months"}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Presets:
              </span>
              {(["left", "top", "bottom", "hidden"] as const).map((pos) => (
                <button
                  key={pos}
                  type="button"
                  onClick={() => setPresetPlacement(pos)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md capitalize transition cursor-pointer border ${
                    presetPlacement === pos
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 border-zinc-900 dark:border-white shadow-sm"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  {pos === "hidden" ? "✕ Hide" : pos}
                </button>
              ))}
            </div>
          </div>

          <DatePicker
            mode="range"
            value={presetRange}
            onChange={setPresetRange}
            numberOfMonths={presetMonths}
            presets={
              presetPlacement === "hidden"
                ? false
                : [
                    "today",
                    "yesterday",
                    "thisWeek",
                    "lastWeek",
                    "thisMonth",
                    "lastMonth",
                    "thisQuarter",
                    "lastQuarter",
                    "thisYear",
                    "last7Days",
                    "last30Days",
                    "last90Days",
                  ]
            }
            presetsPlacement={
              presetPlacement === "hidden" ? "auto" : presetPlacement
            }
          />
        </div>
      </DemoCard>
    </div>
  );
};
