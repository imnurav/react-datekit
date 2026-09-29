import React from "react";

export const ApiReferenceSection: React.FC = () => {
  const coreProps = [
    {
      name: "mode",
      type: "'single' | 'range' | 'multiple' | 'month' | 'year' | 'datetime'",
      default: "'single'",
      desc: "Controls selection logic, bounds, and rendered views.",
    },
    {
      name: "value",
      type: "Date | DateRange | Date[] | null",
      default: "undefined",
      desc: "Controlled value corresponding to the current mode.",
    },
    {
      name: "defaultValue",
      type: "Date | DateRange | Date[] | null",
      default: "undefined",
      desc: "Uncontrolled initial value on mount.",
    },
    {
      name: "onChange",
      type: "(val: any) => void",
      default: "undefined",
      desc: "Fires whenever date or time selection changes.",
    },
    {
      name: "inline",
      type: "boolean",
      default: "auto",
      desc: "When true, forces inline calendar panel. When false or with placeholder/label, renders input trigger with floating popover.",
    },
    {
      name: "placeholder",
      type: "string",
      default: "'Select date…'",
      desc: "Placeholder text rendered inside the trigger input when no date is selected.",
    },
    {
      name: "label",
      type: "string",
      default: "undefined",
      desc: "Descriptive label displayed directly above the input trigger.",
    },
    {
      name: "allowClear",
      type: "boolean",
      default: "true",
      desc: "Shows quick clear (×) button on hover in trigger mode, or a Clear button in footer.",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      desc: "Trigger height and typography sizing (sm: 34px, md: 42px, lg: 48px).",
    },
    {
      name: "format",
      type: "string | ((value: any) => string)",
      default: "Intl formatted",
      desc: "Custom format string or custom formatter callback for display text in the trigger.",
    },
    {
      name: "presets",
      type: "PresetItem[] | false",
      default: "undefined",
      desc: 'Built-in keys (e.g. "today", "last7Days", "thisMonth") or custom preset objects.',
    },
    {
      name: "presetsPlacement",
      type: "'left' | 'right' | 'top' | 'bottom' | 'auto'",
      default: "'auto'",
      desc: "Docking location of the presets container (switches to top swipeable chip bar on mobile).",
    },
    {
      name: "numberOfMonths",
      type: "number",
      default: "1 (2 for range on desktop)",
      desc: "Number of calendar months rendered side-by-side or stacked.",
    },
    {
      name: "stackMonths",
      type: "boolean",
      default: "auto",
      desc: "Forces side-by-side months to stack vertically.",
    },
    {
      name: "minDate",
      type: "Date",
      default: "undefined",
      desc: "Earliest selectable calendar date.",
    },
    {
      name: "maxDate",
      type: "Date",
      default: "undefined",
      desc: "Latest selectable calendar date.",
    },
    {
      name: "disableFutureDates",
      type: "boolean",
      default: "false",
      desc: "Convenience prop: automatically disables all calendar days strictly after today.",
    },
    {
      name: "disablePastDates",
      type: "boolean",
      default: "false",
      desc: "Convenience prop: automatically disables all calendar days strictly before today.",
    },
    {
      name: "disabledDate",
      type: "(date: Date) => boolean",
      default: "undefined",
      desc: "Predicate function returning true if a specific date should be disabled.",
    },
    {
      name: "showTime",
      type: "boolean",
      default: "false",
      desc: "Enables integrated scrollable time selection column in days view.",
    },
    {
      name: "timeFormat",
      type: "'12' | '24'",
      default: "'24'",
      desc: "12-hour (with AM/PM segmented pill) or 24-hour display.",
    },
    {
      name: "minuteStep",
      type: "number",
      default: "1",
      desc: "Granularity step for minute selection (e.g. 1, 5, 15, 30).",
    },
    {
      name: "secondStep",
      type: "number",
      default: "1",
      desc: "Granularity step for seconds selection.",
    },
    {
      name: "showSeconds",
      type: "boolean",
      default: "false",
      desc: "Renders the dedicated 0–59 seconds selection column.",
    },
    {
      name: "weekStartsOn",
      type: "0 | 1 | 2 | 3 | 4 | 5 | 6",
      default: "0 (Sunday)",
      desc: "First day of the week (0 = Sunday, 1 = Monday).",
    },
    {
      name: "showWeekNumbers",
      type: "boolean",
      default: "false",
      desc: "Renders ISO 8601 week number column.",
    },
    {
      name: "showActions",
      type: "boolean",
      default: "false",
      desc: "Renders confirmation footer with Cancel and Apply buttons for staged commitment.",
    },
    {
      name: "renderDate",
      type: "(date: Date, info: RenderDateInfo) => ReactNode",
      default: "undefined",
      desc: "Custom cell render function for badges, pricing, or custom icons.",
    },
    {
      name: "locale",
      type: "string",
      default: "'en-US'",
      desc: "BCP 47 language tag for native Intl formatting (e.g. 'de-DE', 'ja-JP', 'ar-SA').",
    },
    {
      name: "dir",
      type: "'ltr' | 'rtl' | 'auto'",
      default: "'ltr'",
      desc: "Layout directionality for bidirectional / RTL language support.",
    },
    {
      name: "portalTarget",
      type: "HTMLElement | null",
      default: "document.body",
      desc: "DOM element into which the popover overlay is portaled.",
    },
    {
      name: "onOpen",
      type: "() => void",
      default: "undefined",
      desc: "Callback fired when the popover opens.",
    },
    {
      name: "onClose",
      type: "() => void",
      default: "undefined",
      desc: "Callback fired when the popover closes.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      desc: "Disables all interactions and applies disabled styling.",
    },
  ];

  return (
    <section id="api-reference" className="scroll-mt-24 mb-16 pt-8">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
          API Reference
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Complete TypeScript prop definitions for the unified{" "}
          <code className="font-mono font-semibold text-zinc-900 dark:text-zinc-200">
            &lt;DatePicker /&gt;
          </code>{" "}
          component.
        </p>
      </div>

      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900/60 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-zinc-50 dark:bg-zinc-950/60 text-zinc-600 dark:text-zinc-400 font-semibold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-2.5 px-4 font-medium">Prop</th>
                <th className="py-2.5 px-4 font-medium">Type</th>
                <th className="py-2.5 px-4 font-medium">Default</th>
                <th className="py-2.5 px-4 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-sans">
              {coreProps.map((p) => (
                <tr
                  key={p.name}
                  className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors"
                >
                  <td className="py-3 px-4 font-mono font-semibold text-zinc-900 dark:text-white whitespace-nowrap">
                    {p.name}
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-zinc-600 dark:text-zinc-300 whitespace-nowrap">
                    {p.type}
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-zinc-500 whitespace-nowrap">
                    {p.default}
                  </td>
                  <td className="py-3 px-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 min-w-[240px] leading-relaxed">
                    {p.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
