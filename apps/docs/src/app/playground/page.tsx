"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { PlaygroundHeader } from "./components/PlaygroundHeader";
import { ControlsPanel } from "./components/ControlsPanel";
import { PreviewCanvas } from "./components/PreviewCanvas";
import type { DateRange } from "react-datekit";
import "react-datekit/style.css";
import {
  PlaygroundPresetPlacement,
  generatePlaygroundCode,
  PlaygroundMonthCount,
  PlaygroundLocale,
  PlaygroundMode,
} from "@/constants/playground";

export default function PlaygroundPage() {
  // Mode & Layout
  const [mode, setMode] = useState<PlaygroundMode>("range");
  const [months, setMonths] = useState<PlaygroundMonthCount>(2);
  const [stackMonths, setStackMonths] = useState<
    "auto" | "side-by-side" | "stacked"
  >("side-by-side");
  const [inline, setInline] = useState(true);
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");

  // Presets
  const [presetsPlacement, setPresetsPlacement] =
    useState<PlaygroundPresetPlacement>("left");

  // Time Picker Options
  const [timePlacement, setTimePlacement] = useState<"right" | "bottom">(
    "right",
  );
  const [timeFormat, setTimeFormat] = useState<"12" | "24">("12");
  const [showSeconds, setShowSeconds] = useState(false);
  const [minuteStep, setMinuteStep] = useState(1);

  // Constraints & Toggles
  const [allowClear, setAllowClear] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [disableWeekends, setDisableWeekends] = useState(false);
  const [disableFutureDates, setDisableFutureDates] = useState(false);
  const [disablePastDates, setDisablePastDates] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showWeekNumbers, setShowWeekNumbers] = useState(false);

  // Localization
  const [weekStartsOn, setWeekStartsOn] = useState<0 | 1>(0);
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
  const [locale, setLocale] = useState<PlaygroundLocale>("en-US");

  // Active Tab
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Date Values
  const today = useMemo(() => new Date(), []);
  const todayPlus7 = useMemo(
    () => new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
    [today],
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

  const handleReset = useCallback(() => {
    setMode("range");
    setMonths(2);
    setStackMonths("side-by-side");
    setInline(true);
    setSize("md");
    setPresetsPlacement("left");
    setTimePlacement("right");
    setTimeFormat("12");
    setShowSeconds(false);
    setMinuteStep(1);
    setAllowClear(true);
    setDisabled(false);
    setDisableWeekends(false);
    setDisableFutureDates(false);
    setDisablePastDates(false);
    setShowActions(false);
    setShowWeekNumbers(false);
    setWeekStartsOn(0);
    setDir("ltr");
    setLocale("en-US");
    setSingleVal(today);
    setRangeVal([today, todayPlus7]);
    setDtVal(
      new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30),
    );
  }, [today, todayPlus7]);

  const generatedCode = useMemo(() => {
    return generatePlaygroundCode({
      mode,
      months,
      stackMonths,
      presetsPlacement,
      timePlacement,
      timeFormat,
      showSeconds,
      minuteStep,
      inline,
      size,
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
    });
  }, [
    mode,
    months,
    stackMonths,
    presetsPlacement,
    timePlacement,
    timeFormat,
    showSeconds,
    minuteStep,
    inline,
    size,
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
  ]);

  return (
    <div className="playground-page-wrapper bg-background font-sans relative">
      {/* Ambient background glow */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Top Banner / Studio Header */}
      <PlaygroundHeader onReset={handleReset} />

      {/* Main Studio Workspace: Responsive Split Layout */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 flex-1 playground-grid">
        {/* Left Column: Independently scrollable Controls Panel */}
        <div className="playground-sidebar custom-scrollbar">
          <ControlsPanel
            mode={mode}
            setMode={setMode}
            months={months}
            setMonths={setMonths}
            stackMonths={stackMonths}
            setStackMonths={setStackMonths}
            inline={inline}
            setInline={setInline}
            size={size}
            setSize={setSize}
            presetsPlacement={presetsPlacement}
            setPresetsPlacement={setPresetsPlacement}
            timePlacement={timePlacement}
            setTimePlacement={setTimePlacement}
            timeFormat={timeFormat}
            setTimeFormat={setTimeFormat}
            showSeconds={showSeconds}
            setShowSeconds={setShowSeconds}
            minuteStep={minuteStep}
            setMinuteStep={setMinuteStep}
            allowClear={allowClear}
            setAllowClear={setAllowClear}
            disabled={disabled}
            setDisabled={setDisabled}
            disableWeekends={disableWeekends}
            setDisableWeekends={setDisableWeekends}
            disableFutureDates={disableFutureDates}
            disableFutureDatesSet={setDisableFutureDates}
            disablePastDates={disablePastDates}
            disablePastDatesSet={setDisablePastDates}
            showActions={showActions}
            setShowActions={setShowActions}
            showWeekNumbers={showWeekNumbers}
            setShowWeekNumbers={setShowWeekNumbers}
            weekStartsOn={weekStartsOn}
            setWeekStartsOn={setWeekStartsOn}
            dir={dir}
            setDir={setDir}
            locale={locale}
            setLocale={setLocale}
          />
        </div>

        {/* Right Column: Independently scrollable Preview Canvas & Code */}
        <div className="playground-preview-area custom-scrollbar">
          <PreviewCanvas
            mode={mode}
            months={months}
            stackMonths={stackMonths}
            inline={inline}
            size={size}
            presetsPlacement={presetsPlacement}
            timePlacement={timePlacement}
            timeFormat={timeFormat}
            showSeconds={showSeconds}
            minuteStep={minuteStep}
            allowClear={allowClear}
            disabled={disabled}
            disableWeekends={disableWeekends}
            disableFutureDates={disableFutureDates}
            disablePastDates={disablePastDates}
            showActions={showActions}
            showWeekNumbers={showWeekNumbers}
            weekStartsOn={weekStartsOn}
            dir={dir}
            locale={locale}
            singleVal={singleVal}
            setSingleVal={setSingleVal}
            rangeVal={rangeVal}
            setRangeVal={setRangeVal}
            dtVal={dtVal}
            setDtVal={setDtVal}
            multiVal={multiVal}
            setMultiVal={setMultiVal}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            generatedCode={generatedCode}
            mounted={mounted}
          />
        </div>
      </div>
    </div>
  );
}
