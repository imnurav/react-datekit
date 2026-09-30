import { DatePicker, DateRange } from "react-datekit";
import { CodeBlock } from "@/components/CodeBlock";
import {
  PLAYGROUND_DEFAULT_PRESETS,
  PlaygroundPresetPlacement,
  PlaygroundMonthCount,
  PlaygroundLocale,
  PlaygroundMode,
} from "@/constants/playground";
import React from "react";

interface PreviewCanvasProps {
  mode: PlaygroundMode;
  months: PlaygroundMonthCount;
  stackMonths: "auto" | "side-by-side" | "stacked";
  inline: boolean;
  size: "sm" | "md" | "lg";
  presetsPlacement: PlaygroundPresetPlacement;
  timePlacement: "right" | "bottom";
  timeFormat: "12" | "24";
  showSeconds: boolean;
  minuteStep: number;
  allowClear: boolean;
  disabled: boolean;
  disableWeekends: boolean;
  disableFutureDates: boolean;
  disablePastDates: boolean;
  showActions: boolean;
  showWeekNumbers: boolean;
  weekStartsOn: 0 | 1;
  dir: "ltr" | "rtl";
  locale: PlaygroundLocale;
  singleVal: Date | null;
  setSingleVal: (d: Date | null) => void;
  rangeVal: DateRange | null;
  setRangeVal: (r: DateRange | null) => void;
  dtVal: Date | null;
  setDtVal: (d: Date | null) => void;
  multiVal: Date[];
  setMultiVal: (d: Date[]) => void;
  activeTab: "preview" | "code";
  setActiveTab: (t: "preview" | "code") => void;
  generatedCode: string;
  mounted: boolean;
}

const isWeekendDisabled = (d: Date) => d.getDay() === 0 || d.getDay() === 6;

export const PreviewCanvas: React.FC<PreviewCanvasProps> = ({
  mode,
  months,
  stackMonths,
  inline,
  size,
  presetsPlacement,
  timePlacement,
  timeFormat,
  showSeconds,
  minuteStep,
  allowClear,
  disabled,
  disableWeekends,
  disableFutureDates,
  disablePastDates,
  showActions,
  showWeekNumbers,
  weekStartsOn,
  dir,
  locale,
  singleVal,
  setSingleVal,
  rangeVal,
  setRangeVal,
  dtVal,
  setDtVal,
  multiVal,
  setMultiVal,
  activeTab,
  setActiveTab,
  generatedCode,
  mounted,
}) => {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden flex flex-col">
      {/* Canvas Header / Tab Toggle */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-border bg-muted/20 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-foreground truncate max-w-[200px] sm:max-w-none">
            {inline ? "Inline Mode" : "Popover Trigger Mode"} &bull; {months}{" "}
            {months === 1 ? "Month" : "Months"}
            {months > 1 && ` (${stackMonths})`}
          </span>
        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-1 p-0.5 rounded-xl bg-muted/60 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-3 py-1 rounded-lg transition ${
              activeTab === "preview"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Preview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("code")}
            className={`px-3 py-1 rounded-lg transition ${
              activeTab === "code"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Code
          </button>
        </div>
      </div>

      {/* Canvas Body */}
      {activeTab === "preview" ? (
        <div className="p-4 sm:p-8 lg:p-12 min-h-[480px] flex flex-col items-center justify-center bg-muted/10 relative overflow-x-auto">
          <div className="flex flex-col items-center justify-center gap-6 w-full max-w-full">
            {/* DatePicker Component Mount */}
            <div className="flex items-center justify-center w-full max-w-full overflow-x-auto p-2">
              <DatePicker
                key={`${mode}-${months}-${stackMonths}-${presetsPlacement}-${timePlacement}-${timeFormat}-${showSeconds}-${minuteStep}-${inline}-${size}-${disabled}-${disableWeekends}-${disableFutureDates}-${disablePastDates}-${showActions}-${showWeekNumbers}-${weekStartsOn}-${dir}-${locale}`}
                {...({
                  mode,
                  value:
                    mode === "single"
                      ? singleVal
                      : mode === "range"
                        ? rangeVal
                        : mode === "datetime"
                          ? dtVal
                          : multiVal,
                  onChange: (val: any) => {
                    if (mode === "single") setSingleVal(val);
                    else if (mode === "range") setRangeVal(val);
                    else if (mode === "datetime") setDtVal(val);
                    else setMultiVal(val);
                  },
                  inline,
                  size,
                  label: !inline ? "Select Date" : undefined,
                  placeholder: !inline ? `Choose ${mode}...` : undefined,
                  allowClear,
                  disabled,
                  numberOfMonths: months,
                  stackMonths:
                    stackMonths === "stacked"
                      ? true
                      : stackMonths === "side-by-side"
                        ? false
                        : undefined,
                  presets:
                    presetsPlacement === "none"
                      ? false
                      : PLAYGROUND_DEFAULT_PRESETS,
                  presetsPlacement:
                    presetsPlacement === "none" ? "auto" : presetsPlacement,
                  showTime: mode === "datetime",
                  timePlacement,
                  timeFormat,
                  showSeconds,
                  minuteStep,
                  disabledDate: disableWeekends ? isWeekendDisabled : undefined,
                  disableFutureDates,
                  disablePastDates,
                  showActions,
                  showWeekNumbers,
                  weekStartsOn,
                  dir,
                  locale,
                } as any)}
              />
            </div>

            {/* Output Bar */}
            <div className="w-full max-w-lg px-4 py-2.5 rounded-xl border border-border bg-card/80 backdrop-blur-sm text-xs font-mono text-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-1 shadow-xs">
              <span className="text-muted-foreground shrink-0">
                Selected Value:
              </span>
              <span
                className="font-semibold text-blue-600 dark:text-blue-400 break-all text-right"
                suppressHydrationWarning
              >
                {!mounted ? (
                  "Loading..."
                ) : (
                  <>
                    {mode === "single" &&
                      (singleVal ? singleVal.toLocaleDateString() : "null")}
                    {mode === "range" &&
                      (rangeVal
                        ? `${rangeVal[0]?.toLocaleDateString() ?? "null"} → ${rangeVal[1]?.toLocaleDateString() ?? "null"}`
                        : "null")}
                    {mode === "datetime" &&
                      (dtVal ? dtVal.toLocaleString() : "null")}
                    {mode === "multiple" && `${multiVal.length} dates selected`}
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 sm:p-6 bg-zinc-950 overflow-x-auto">
          <CodeBlock code={generatedCode} language="tsx" />
        </div>
      )}
    </div>
  );
};
