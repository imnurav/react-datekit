import { DatePicker, DateRange, CustomPreset } from "react-datekit";
import React, { useState } from "react";
import { DemoCard } from "./DemoCard";

export const CustomDemosSection: React.FC = () => {
  const [customRange, setCustomRange] = useState<DateRange | null>(null);

  // Custom Presets
  const customPresets: CustomPreset[] = [
    {
      label: "Financial Year",
      value: () => [new Date(2026, 3, 1), new Date(2027, 2, 31)],
    },
    {
      label: "Last 14 Days",
      value: () => {
        const end = new Date(2026, 8, 29);
        const start = new Date(2026, 8, 15);
        return [start, end];
      },
    },
    {
      label: "Previous Business Week",
      value: () => [new Date(2026, 8, 14), new Date(2026, 8, 18)],
    },
  ];

  // Custom Events mapping for date rendering
  const mockEvents: Record<number, string> = {
    10: "Product Launch",
    18: "Team Offsite",
    25: "Board Review",
  };

  const customPresetsCode = `import React, { useState } from 'react';
import { DatePicker, DateRange, CustomPreset } from 'react-datekit';
import 'react-datekit/style.css';

const customPresets: CustomPreset[] = [
  {
    label: 'Financial Year',
    value: () => [new Date(2026, 3, 1), new Date(2027, 2, 31)],
  },
  {
    label: 'Last 14 Days',
    value: () => [new Date(2026, 8, 15), new Date(2026, 8, 29)],
  },
  {
    label: 'Previous Business Week',
    value: () => [new Date(2026, 8, 14), new Date(2026, 8, 18)],
  },
];

export default function CustomPresetsDemo() {
  const [range, setRange] = useState<DateRange | null>(null);

  return (
    <DatePicker
      mode="range"
      value={range}
      onChange={setRange}
      presets={customPresets}
    />
  );
}`;

  const customRenderCode = `import React, { useState } from 'react';
import { DatePicker } from 'react-datekit';
import 'react-datekit/style.css';

const events: Record<number, string> = {
  10: 'Product Launch',
  18: 'Team Offsite',
  25: 'Board Review',
};

export default function CustomDateCellsDemo() {
  const [date, setDate] = useState<Date | null>(new Date(2026, 8, 18));

  return (
    <DatePicker
      mode="single"
      value={date}
      onChange={setDate}
      defaultViewDate={new Date(2026, 8, 1)}
      renderDate={(d) => {
        const hasEvent = !!events[d.getDate()];
        return (
          <div className="flex flex-col items-center leading-none">
            <span>{d.getDate()}</span>
            {hasEvent && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-0.5" />
            )}
          </div>
        );
      }}
    />
  );
}`;

  return (
    <div className="space-y-12">
      {/* 1. Custom Presets */}
      <DemoCard
        id="custom-presets"
        title="Custom Presets"
        description="Provide arbitrary dynamic preset generators such as fiscal years, sprint cycles, or previous business weeks."
        code={customPresetsCode}
      >
        <DatePicker
          mode="range"
          value={customRange}
          onChange={setCustomRange}
          presets={customPresets}
          defaultViewDate={new Date(2026, 8, 1)}
        />
      </DemoCard>

      {/* 2. Custom Date Rendering */}
      <DemoCard
        id="custom-rendering"
        title="Custom Date Cell Rendering"
        description="Inject custom elements, badges, status indicators, or event counts into individual calendar cells via renderDate."
        code={customRenderCode}
        note="Notice dates 10, 18, and 25 with subtle green event badges."
      >
        <DatePicker
          mode="single"
          defaultViewDate={new Date(2026, 8, 1)}
          renderDate={(date) => {
            const hasEvent = mockEvents[date.getDate()];
            return (
              <div className="flex flex-col items-center justify-center relative">
                <span>{date.getDate()}</span>
                {hasEvent && (
                  <span className="w-1 h-1 rounded-full bg-emerald-500 absolute -bottom-1" />
                )}
              </div>
            );
          }}
        />
      </DemoCard>
    </div>
  );
};
