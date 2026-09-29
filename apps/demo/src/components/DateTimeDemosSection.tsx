import { DatePicker } from "react-datekit";
import React, { useState } from "react";
import { DemoCard } from "./DemoCard";

export const DateTimeDemosSection: React.FC = () => {
  const [dateTime, setDateTime] = useState<Date | null>(
    new Date(2026, 8, 29, 10, 30, 0),
  );

  const [multiDates, setMultiDates] = useState<Date[]>([
    new Date(2026, 8, 5),
    new Date(2026, 8, 12),
    new Date(2026, 8, 19),
    new Date(2026, 8, 26),
  ]);

  const [timePlacement, setTimePlacement] = useState<"right" | "bottom">(
    "right",
  );

  const dateTimeCode = `import React, { useState } from 'react';
import { DatePicker } from 'react-datekit';
import 'react-datekit/style.css';

export default function DateTimePickerDemo() {
  const [dateTime, setDateTime] = useState<Date | null>(new Date(2026, 8, 29, 10, 30));

  return (
    <DatePicker
      mode="datetime"
      showTime
      timePlacement="${timePlacement}" // 'right' (side column) or 'bottom'
      timeFormat="12"
      showSeconds
      value={dateTime}
      onChange={setDateTime}
    />
  );
}`;

  const multipleCode = `import React, { useState } from 'react';
import { DatePicker } from 'react-datekit';
import 'react-datekit/style.css';

export default function MultipleDatesDemo() {
  const [dates, setDates] = useState<Date[]>([
    new Date(2026, 8, 5),
    new Date(2026, 8, 12),
    new Date(2026, 8, 19),
  ]);

  return (
    <DatePicker
      mode="multiple"
      value={dates}
      onChange={setDates}
    />
  );
}`;

  return (
    <div className="space-y-12">
      {/* 1. Date + Time */}
      <DemoCard
        id="datetime"
        title="Date & Time Selection"
        description="Unified date and time selector with side-by-side or bottom placement, scrollable columns, and 12h/24h toggle."
        code={dateTimeCode}
      >
        <div className="flex flex-col items-center gap-5">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Time Position:
            </span>
            <div className="flex rounded-lg bg-zinc-100 dark:bg-zinc-800 p-0.5 border border-zinc-200 dark:border-zinc-700">
              <button
                type="button"
                onClick={() => setTimePlacement("right")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition cursor-pointer ${
                  timePlacement === "right"
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                Side Column (Right)
              </button>
              <button
                type="button"
                onClick={() => setTimePlacement("bottom")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition cursor-pointer ${
                  timePlacement === "bottom"
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                Downward (Bottom)
              </button>
            </div>
          </div>

          <DatePicker
            mode="datetime"
            showTime
            timePlacement={timePlacement}
            timeFormat="12"
            showSeconds
            value={dateTime}
            onChange={setDateTime}
            defaultViewDate={new Date(2026, 8, 1)}
          />
          <div className="flex items-center gap-4 px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs sm:text-sm font-mono text-zinc-800 dark:text-zinc-200">
            <span>
              Date:{" "}
              <strong className="font-bold text-zinc-900 dark:text-white">
                {dateTime
                  ? dateTime.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "None"}
              </strong>
            </span>
            <span className="text-zinc-300 dark:text-zinc-600">|</span>
            <span>
              Time:{" "}
              <strong className="font-bold text-zinc-900 dark:text-white">
                {dateTime
                  ? dateTime.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "None"}
              </strong>
            </span>
          </div>
        </div>
      </DemoCard>

      {/* 2. Multiple Dates */}
      <DemoCard
        id="multiple"
        title="Multiple Date Selection"
        description="Select any non-consecutive dates simultaneously. Ideal for recurring events, shifts, and scheduling."
        code={multipleCode}
      >
        <div className="flex flex-col items-center gap-5">
          <DatePicker
            mode="multiple"
            value={multiDates}
            onChange={setMultiDates}
            defaultViewDate={new Date(2026, 8, 1)}
          />
          <div className="max-w-md text-center">
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-2">
              Selected ({multiDates.length} dates):
            </span>
            <div className="flex flex-wrap justify-center gap-1.5">
              {multiDates.map((d) => (
                <span
                  key={d.toISOString()}
                  className="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  {d.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              ))}
            </div>
          </div>
        </div>
      </DemoCard>
    </div>
  );
};
