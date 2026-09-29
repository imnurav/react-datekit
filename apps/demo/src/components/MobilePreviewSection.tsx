import { DatePicker, DateRange } from "react-datekit";
import React, { useState } from "react";
import { DemoCard } from "./DemoCard";

export const MobilePreviewSection: React.FC = () => {
  const [mobileRange, setMobileRange] = useState<DateRange | null>([
    new Date(2026, 8, 10),
    new Date(2026, 8, 18),
  ]);
  const [showPresets, setShowPresets] = useState<boolean>(true);

  const mobileCode = `import React, { useState } from 'react';
import { DatePicker, DateRange } from 'react-datekit';
import 'react-datekit/style.css';

export default function MobileDatePickerDemo() {
  const [range, setRange] = useState<DateRange | null>(null);

  return (
    <div className="max-w-[360px] mx-auto">
      <DatePicker
        mode="range"
        value={range}
        onChange={setRange}
        ${
          showPresets
            ? `presets={['today', 'thisWeek', 'last7Days', 'thisMonth']}
        presetsPlacement="top"`
            : `// Presets hidden
        presets={false}`
        }
        isMobile
        showActions
        allowClear
      />
    </div>
  );
}`;

  return (
    <div className="space-y-12">
      <DemoCard
        id="mobile-preview"
        title="Mobile & Touch Responsive"
        badge="Touch Targets >= 44px"
        description="On touch devices and mobile containers, DatePicker automatically transitions into a mobile-first layout with smooth horizontal preset scrolling, comfortable tap targets, and stacked action buttons."
        code={mobileCode}
        note="Interactive mobile container: Test horizontal preset swiping and touch tap targets."
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Presets:
            </span>
            <button
              type="button"
              onClick={() => setShowPresets((p) => !p)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer border ${
                showPresets
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 border-zinc-900 dark:border-white shadow-sm"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700"
              }`}
            >
              {showPresets ? "✓ Presets Shown (Top Bar)" : "✕ Presets Hidden"}
            </button>
          </div>

          <div className="relative mx-auto w-full max-w-[380px] rounded-[36px] border-4 border-zinc-800 bg-zinc-950 p-2 sm:p-3 shadow-2xl">
            {/* Phone Top Notch */}
            <div className="mx-auto h-4 w-24 rounded-full bg-zinc-800 mb-3" />

            {/* Screen Content */}
            <div className="rounded-[22px] overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-inner flex flex-col items-center py-2 px-1">
              <DatePicker
                mode="range"
                value={mobileRange}
                onChange={setMobileRange}
                presets={
                  showPresets
                    ? [
                        "today",
                        "thisWeek",
                        "last7Days",
                        "thisMonth",
                        "last30Days",
                      ]
                    : false
                }
                presetsPlacement="top"
                isMobile
                showActions
                allowClear
                defaultViewDate={new Date(2026, 8, 1)}
                className="w-full !border-0 !shadow-none"
              />
            </div>

            {/* Home indicator bar */}
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-zinc-700" />
          </div>
        </div>
      </DemoCard>
    </div>
  );
};
