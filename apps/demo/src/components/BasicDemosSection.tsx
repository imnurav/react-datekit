import { DatePicker } from "react-datekit";
import React, { useState } from "react";
import { DemoCard } from "./DemoCard";

export const BasicDemosSection: React.FC = () => {
  const [singleDate, setSingleDate] = useState<Date | null>(
    new Date(2026, 8, 15),
  );

  const singleCode = `import React, { useState } from 'react';
import { DatePicker } from 'react-datekit';
import 'react-datekit/style.css';

export default function SingleDateDemo() {
  const [date, setDate] = useState<Date | null>(new Date(2026, 8, 15));

  return (
    <div className="flex flex-col items-center gap-4">
      <DatePicker
        mode="single"
        value={date}
        onChange={setDate}
      />
      <p>Selected: {date ? date.toLocaleDateString() : 'None'}</p>
    </div>
  );
}`;

  return (
    <div className="space-y-12">
      <DemoCard
        id="single"
        title="Single Date Selection"
        description="Controlled single date selection with real-time value binding and formatted date readout."
        code={singleCode}
      >
        <div className="flex flex-col items-center gap-4">
          <DatePicker
            mode="single"
            value={singleDate}
            onChange={setSingleDate}
            defaultViewDate={new Date(2026, 8, 1)}
          />
          <div className="px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-mono text-zinc-800 dark:text-zinc-200">
            Selected Value:{" "}
            <span className="font-bold text-zinc-900 dark:text-white">
              {singleDate
                ? singleDate.toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "null"}
            </span>
          </div>
        </div>
      </DemoCard>
    </div>
  );
};
