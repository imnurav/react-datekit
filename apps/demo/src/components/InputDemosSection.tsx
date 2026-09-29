import { DatePicker } from "react-datekit";
import type { DateRange } from "react-datekit";
import { DemoCard } from "./DemoCard";
import React, { useState } from "react";

const SINGLE_CODE = `import React, { useState } from 'react';
import { DatePicker } from 'react-datekit';
import 'react-datekit/style.css';

export default function Example() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <DatePicker
      label="Appointment Date"
      placeholder="Pick a date…"
      value={date}
      onChange={setDate}
      allowClear
    />
  );
}`;

const RANGE_CODE = `import React, { useState } from 'react';
import { DatePicker, DateRange } from 'react-datekit';
import 'react-datekit/style.css';

export default function Example() {
  const [range, setRange] = useState<DateRange | null>(null);
  return (
    <DatePicker
      mode="range"
      label="Date Range"
      placeholder="Select a range…"
      value={range}
      onChange={setRange}
      presets={['today', 'thisWeek', 'last7Days', 'last30Days']}
    />
  );
}`;

const DATETIME_CODE = `import React, { useState } from 'react';
import { DatePicker } from 'react-datekit';
import 'react-datekit/style.css';

export default function Example() {
  const [dt, setDt] = useState<Date | null>(null);
  return (
    <DatePicker
      mode="datetime"
      label="Schedule"
      placeholder="Choose date & time…"
      value={dt}
      onChange={setDt}
      showTime
      timeFormat="12"
      showSeconds
    />
  );
}`;

export const InputDemosSection: React.FC = () => {
  const [single, setSingle] = useState<Date | null>(new Date(2026, 8, 22));
  const [range, setRange] = useState<DateRange | null>([
    new Date(2026, 8, 22),
    new Date(2026, 8, 29),
  ]);
  const [dt, setDt] = useState<Date | null>(new Date(2026, 8, 22, 14, 30));

  return (
    <section id="input-demos" className="scroll-mt-24 mb-16 pt-8">
      <div className="mb-6 flex flex-col gap-1.5">
        <div className="flex items-center gap-2.5">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Trigger Popover Mode
          </h2>
          <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
            Default Popover
          </span>
        </div>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
          Like Ant Design, <code className="font-mono font-semibold text-zinc-900 dark:text-zinc-200">DatePicker</code> functions as a sleek trigger input with an intelligent popover overlay.
          Includes outside-click dismissal, <kbd className="px-1.5 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 font-mono text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">Esc</kbd> key support, and quick clear (<kbd>×</kbd>).
        </p>
      </div>

      <div className="grid gap-6">
        <DemoCard
          id="input-single"
          title="Single Date Popover"
          description="Standard input trigger that opens the single-month calendar overlay below the field."
          code={SINGLE_CODE}
        >
          <DatePicker
            label="Appointment Date"
            placeholder="Pick a date…"
            value={single}
            onChange={setSingle as any}
            allowClear
          />
        </DemoCard>

        <DemoCard
          id="input-range"
          title="Date Range with Presets"
          description="Range mode with preset shortcuts. Closes automatically once both start and end dates are picked."
          code={RANGE_CODE}
        >
          <DatePicker
            mode="range"
            label="Date Range"
            placeholder="Select a range…"
            value={range}
            onChange={setRange as any}
            presets={["today", "thisWeek", "last7Days", "last30Days"]}
          />
        </DemoCard>

        <DemoCard
          id="input-datetime"
          title="Date & Time with Seconds"
          description="Date + time picker in a popover. Dedicated seconds column enabled via showSeconds."
          code={DATETIME_CODE}
        >
          <DatePicker
            mode="datetime"
            label="Schedule"
            placeholder="Choose date & time…"
            value={dt}
            onChange={setDt as any}
            showTime
            timeFormat="12"
            showSeconds
          />
        </DemoCard>
      </div>
    </section>
  );
};
