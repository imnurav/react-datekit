import { DatePicker, DateRange } from "react-datekit";
import React, { useState, useMemo } from "react";
import { CodeBlock } from "./CodeBlock";

export const PlaygroundSection: React.FC = () => {
  const [mode, setMode] = useState<
    "single" | "range" | "datetime" | "multiple"
  >("range");
  const [months, setMonths] = useState<1 | 2>(2);
  const [presetsPlacement, setPresetsPlacement] = useState<
    "none" | "left" | "top" | "bottom"
  >("left");
  const [timePlacement, setTimePlacement] = useState<"right" | "bottom">(
    "right",
  );
  const [timeFormat, setTimeFormat] = useState<"12" | "24">("12");
  const [disableWeekends, setDisableWeekends] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showWeekNumbers, setShowWeekNumbers] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const today = new Date();
  const todayPlus7 = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 7,
  );
  const [singleVal, setSingleVal] = useState<Date | null>(today);
  const [rangeVal, setRangeVal] = useState<DateRange | null>([
    today,
    todayPlus7,
  ]);
  const [dtVal, setDtVal] = useState<Date | null>(
    new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30),
  );
  const [multiVal, setMultiVal] = useState<Date[]>([
    new Date(today.getFullYear(), today.getMonth(), 5),
    new Date(today.getFullYear(), today.getMonth(), 15),
    new Date(today.getFullYear(), today.getMonth(), 25),
  ]);

  const isWeekendDisabled = (d: Date) => d.getDay() === 0 || d.getDay() === 6;

  const generatedCode = useMemo(() => {
    const imports = ["DatePicker", ...(mode === "range" ? ["DateRange"] : [])];
    const importStr = `import React, { useState } from 'react';\nimport { ${imports.join(", ")} } from 'react-datekit';\nimport 'react-datekit/style.css';\n`;

    const stateMap = {
      single: `const [date, setDate] = useState<Date | null>(new Date());`,
      range: `const [range, setRange] = useState<DateRange | null>(null);`,
      datetime: `const [dateTime, setDateTime] = useState<Date | null>(new Date());`,
      multiple: `const [dates, setDates] = useState<Date[]>([]);`,
    };

    const propsList: string[] = [`mode="${mode}"`];
    if (mode === "single") propsList.push(`value={date}`, `onChange={setDate}`);
    else if (mode === "range")
      propsList.push(`value={range}`, `onChange={setRange}`);
    else if (mode === "datetime")
      propsList.push(`value={dateTime}`, `onChange={setDateTime}`, `showTime`);
    else propsList.push(`value={dates}`, `onChange={setDates}`);

    if (months > 1) propsList.push(`numberOfMonths={${months}}`);
    if (presetsPlacement !== "none") {
      propsList.push(
        `presets={['today', 'yesterday', 'thisWeek', 'thisMonth', 'last7Days', 'last30Days']}`,
        `presetsPlacement="${presetsPlacement}"`,
      );
    }
    if (mode === "datetime") {
      if (timePlacement !== "right")
        propsList.push(`timePlacement="${timePlacement}"`);
      if (timeFormat !== "24") propsList.push(`timeFormat="${timeFormat}"`);
    }
    if (disableWeekends)
      propsList.push(
        `disabledDate={(d) => d.getDay() === 0 || d.getDay() === 6}`,
      );
    if (showActions) propsList.push(`showActions`, `allowClear`);
    if (showWeekNumbers) propsList.push(`showWeekNumbers`);

    const propsFormatted = propsList.map((p) => `      ${p}`).join("\n");
    return `${importStr}\nexport default function CustomDatePicker() {\n  ${stateMap[mode]}\n\n  return (\n    <DatePicker\n${propsFormatted}\n    />\n  );\n}`;
  }, [
    mode,
    months,
    presetsPlacement,
    timePlacement,
    timeFormat,
    disableWeekends,
    showActions,
    showWeekNumbers,
  ]);

  return (
    <section id="playground" className="scroll-mt-24 mb-16 pt-8">
      <div className="mb-6 flex flex-col gap-1.5">
        <div className="flex items-center gap-2.5">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Interactive Component Studio
          </h2>
          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
            Live Configurator
          </span>
        </div>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Customize all parameters live, preview the layout reactively, and copy
          ready-to-use production code.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        {/* Controls Toolbar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 bg-slate-200/60 dark:bg-slate-800/80 p-0.5 rounded-lg text-xs font-medium">
              {(["single", "range", "datetime", "multiple"] as const).map(
                (m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`px-2.5 py-1 rounded-md capitalize transition cursor-pointer font-medium ${mode === m ? "text-white shadow-sm font-semibold" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}
                    style={
                      mode === m
                        ? { backgroundColor: "var(--rdk-primary)" }
                        : {}
                    }
                  >
                    {m === "datetime" ? "Date & Time" : m}
                  </button>
                ),
              )}
            </div>
            <div className="flex items-center gap-1 bg-slate-200/60 dark:bg-slate-800/80 p-0.5 rounded-lg text-xs font-medium">
              {([1, 2] as const).map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  onClick={() => setMonths(cnt)}
                  className={`px-2.5 py-1 rounded-md transition cursor-pointer font-medium ${months === cnt ? "text-white shadow-sm font-semibold" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}
                  style={
                    months === cnt
                      ? { backgroundColor: "var(--rdk-primary)" }
                      : {}
                  }
                >
                  {cnt} {cnt === 1 ? "Month" : "Months"}
                </button>
              ))}
            </div>
          </div>
          {/* Presets placement control */}
          <div className="flex items-center gap-1 bg-slate-200/60 dark:bg-slate-800/80 p-0.5 rounded-lg text-xs font-medium">
            {(["none", "left", "top", "bottom"] as const).map((pos) => (
              <button
                key={pos}
                type="button"
                onClick={() => setPresetsPlacement(pos)}
                className={`px-2 py-1 rounded-md capitalize transition cursor-pointer font-medium ${presetsPlacement === pos ? "text-white shadow-sm font-semibold" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}
                style={
                  presetsPlacement === pos
                    ? { backgroundColor: "var(--rdk-primary)" }
                    : {}
                }
              >
                {pos === "none" ? "No Presets" : `Presets ${pos}`}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary options row */}
        <div className="px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-950/20 flex flex-wrap items-center justify-between text-xs gap-3">
          <div className="flex flex-wrap items-center gap-4">
            {mode === "datetime" && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-500 dark:text-slate-400">
                  Time:
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setTimePlacement((p) =>
                      p === "right" ? "bottom" : "right",
                    )
                  }
                  className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-medium"
                >
                  Position: {timePlacement === "right" ? "Side" : "Bottom"}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setTimeFormat((f) => (f === "12" ? "24" : "12"))
                  }
                  className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-medium"
                >
                  Format: {timeFormat}h
                </button>
              </div>
            )}
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300 font-medium">
              <input
                type="checkbox"
                checked={disableWeekends}
                onChange={(e) => setDisableWeekends(e.target.checked)}
                className="rounded"
              />
              <span>Disable Weekends</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300 font-medium">
              <input
                type="checkbox"
                checked={showActions}
                onChange={(e) => setShowActions(e.target.checked)}
                className="rounded"
              />
              <span>Action Buttons</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300 font-medium">
              <input
                type="checkbox"
                checked={showWeekNumbers}
                onChange={(e) => setShowWeekNumbers(e.target.checked)}
                className="rounded"
              />
              <span>Week Numbers</span>
            </label>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1 bg-slate-200/60 dark:bg-slate-800/80 p-0.5 rounded-lg font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-1 rounded-md transition cursor-pointer ${activeTab === "preview" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm" : "text-slate-600 dark:text-slate-400"}`}
            >
              Preview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("code")}
              className={`px-3 py-1 rounded-md transition cursor-pointer ${activeTab === "code" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm" : "text-slate-600 dark:text-slate-400"}`}
            >
              Code
            </button>
          </div>
        </div>

        {/* Content Box */}
        {activeTab === "preview" ? (
          <div className="p-4 sm:p-8 min-h-[380px] bg-slate-50/30 dark:bg-slate-900/20 overflow-x-auto">
            <div
              className="flex flex-col items-center justify-center min-h-[340px] gap-4"
              style={{ width: "max-content", minWidth: "100%" }}
            >
              <DatePicker
                key={`${mode}-${months}-${presetsPlacement}-${timePlacement}-${timeFormat}`}
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
                  numberOfMonths: months,
                  presets:
                    presetsPlacement === "none"
                      ? false
                      : [
                          "today",
                          "yesterday",
                          "thisWeek",
                          "thisMonth",
                          "last7Days",
                          "last30Days",
                        ],
                  presetsPlacement:
                    presetsPlacement === "none" ? "auto" : presetsPlacement,
                  showTime: mode === "datetime",
                  timePlacement,
                  timeFormat,
                  disabledDate: disableWeekends ? isWeekendDisabled : undefined,
                  showActions,
                  allowClear: showActions,
                  showWeekNumbers,
                } as any)}
              />
              {mode === "range" && rangeVal && (
                <div className="flex items-center gap-3 px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono">
                  <span className="text-slate-500 dark:text-slate-400">From</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {rangeVal[0]
                      ? rangeVal[0].toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "None"}
                  </span>
                  <span className="text-slate-300 dark:text-slate-600">→</span>
                  <span className="text-slate-500 dark:text-slate-400">To</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {rangeVal[1]
                      ? rangeVal[1].toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "None"}
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-4 sm:p-6 bg-slate-900">
            <CodeBlock code={generatedCode} language="tsx" />
          </div>
        )}
      </div>
    </section>
  );
};
