import { useCalendarKeyboard } from "../hooks/useCalendarKeyboard";
import React, { useEffect, useId, useRef, useState } from "react";
import { useCalendarState } from "../hooks/useCalendarState";
import type { CalendarPanelProps } from "../types/internal";
import { useResponsive } from "../hooks/useResponsive";
import { formatMonthYear } from "../utils/format";
import { addMonths } from "../utils/dateUtils";
import { ActionFooter } from "./ActionFooter";
import { CalendarGrid } from "./CalendarGrid";
import { TimeSelector } from "./TimeSelector";
import type { DateRange } from "../types";
import { Presets } from "./Presets";
import {
  TIME_COLUMN_WIDTH_WITH_SECONDS,
  PRESETS_SIDEBAR_WIDTH,
  MIN_DUAL_MONTH_WIDTH,
  TIME_COLUMN_WIDTH,
} from "../constants";

export const CalendarPanel: React.FC<CalendarPanelProps> = (props: any) => {
  const {
    dir = "ltr",
    mode = "single",
    value,
    style,
    locale = "en-US",
    minDate,
    maxDate,
    presets,
    onApply,
    onClear,
    onChange,
    showTime = false,
    onCancel,
    disabled = false,
    className = "",
    timeFormat = "24",
    minuteStep = 1,
    secondStep = 1,
    allowClear = false,
    renderDate,
    showSeconds = false,
    showActions = false,
    stackMonths,
    defaultValue,
    disabledDate,
    weekStartsOn = 0,
    disabledTime,
    disabledDates,
    onMonthChange,
    timePlacement = "right",
    disabledRanges,
    minRangeLength,
    maxRangeLength,
    showWeekNumbers = false,
    showOutsideDays = true,
    defaultViewDate,
    disablePastDates,
    presetsPlacement = "auto",
    disableFutureDates,
    onSelectionComplete,
    isMobile: propIsMobile,
    numberOfMonths: propMonths,
  } = props;

  const pickerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  useEffect(() => {
    const el = pickerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([entry]) => {
      if (entry?.contentRect.width) setContainerWidth(entry.contentRect.width);
    });
    ro.observe(el.parentElement || el);
    return () => ro.disconnect();
  }, []);

  const { isMobile: autoMobile, effectiveMonths: autoMonths } = useResponsive(
    propMonths,
    mode === "range",
  );
  const isMobile = propIsMobile ?? autoMobile;
  const effectiveMonths = propMonths ?? (propIsMobile ? 1 : autoMonths);

  const hasPresets = Array.isArray(presets) && presets.length > 0;
  const isTopPreset =
    hasPresets &&
    (presetsPlacement === "top" || (presetsPlacement === "auto" && isMobile));
  const isBottomPreset = hasPresets && presetsPlacement === "bottom";
  const isLeftPreset =
    hasPresets &&
    (presetsPlacement === "left" || (presetsPlacement === "auto" && !isMobile));
  const isRightPreset = hasPresets && presetsPlacement === "right";

  const effectiveTimeWidth = showSeconds
    ? TIME_COLUMN_WIDTH_WITH_SECONDS
    : TIME_COLUMN_WIDTH;

  const minDualMonthWidth =
    MIN_DUAL_MONTH_WIDTH +
    (isLeftPreset || isRightPreset ? PRESETS_SIDEBAR_WIDTH : 0) +
    (showTime && timePlacement === "right" ? effectiveTimeWidth : 0);

  const shouldStack =
    stackMonths ??
    (effectiveMonths > 1 &&
      (containerWidth ? containerWidth < minDualMonthWidth : isMobile));

  const state = useCalendarState({
    mode,
    value,
    defaultValue,
    minDate,
    maxDate,
    disableFutureDates,
    disablePastDates,
    disabledDate,
    disabledDates,
    disabledRanges,
    defaultViewDate,
    onMonthChange,
    minRangeLength,
    maxRangeLength,
    showActions,
    onApply,
    onCancel,
    onClear,
    showTime,
    disabledTime,
    onChange: (val) => {
      onChange?.(val as any);
      if (onSelectionComplete && !showActions) {
        if ((mode === "single" || mode === "datetime") && val instanceof Date)
          onSelectionComplete();
        else if (mode === "range" && Array.isArray(val) && val[0] && val[1])
          onSelectionComplete();
      }
    },
  });

  const handleKeyDown = useCalendarKeyboard({
    disabled,
    dir,
    focusedDate: state.focusedDate,
    viewDate: state.viewDate,
    weekStartsOn,
    isSelectingRange: state.isSelectingRange,
    setFocusedDate: state.setFocusedDate,
    setViewDate: state.setViewDate,
    handleSelectDate: state.handleSelectDate,
    handleCancel: state.handleCancel,
  });

  const pickerId = useId();
  const months =
    effectiveMonths === 2
      ? [state.viewDate, state.rightViewDate]
      : Array.from({ length: effectiveMonths }, (_, i) =>
          addMonths(state.viewDate, i),
        );

  const presetEl = hasPresets ? (
    <Presets
      presets={presets}
      currentValue={state.value as Date | DateRange | null | undefined}
      onSelectPreset={(val) => {
        state.handlePresetSelect(val);
        if (onSelectionComplete && !showActions) onSelectionComplete();
      }}
      weekStartsOn={weekStartsOn}
      isMobile={isMobile}
      placement={presetsPlacement}
    />
  ) : null;

  const hasTime =
    (showTime || mode === "datetime") && state.viewMode === "days";

  return (
    <div
      id={pickerId}
      ref={pickerRef}
      dir={dir}
      tabIndex={-1}
      role="application"
      aria-label="Date and time picker"
      onKeyDown={handleKeyDown}
      style={style}
      className={`rdk-datepicker ${disabled ? "rdk-datepicker--disabled" : ""} ${hasPresets ? "rdk-datepicker--with-presets" : ""} ${isMobile ? "rdk-datepicker--mobile" : ""} ${className}`}
    >
      <div className="rdk-sr-only" aria-live="polite" aria-atomic="true">
        {formatMonthYear(state.viewDate, locale)}
      </div>
      {isTopPreset && presetEl}
      <div className="rdk-datepicker-body">
        {isLeftPreset && presetEl}
        <div
          className={`rdk-datepicker-views ${hasTime ? `rdk-datepicker-views--time-${timePlacement}` : ""}`}
        >
          <div className="rdk-datepicker-grid-container">
            <CalendarGrid
              mode={mode}
              locale={locale}
              minDate={minDate}
              maxDate={maxDate}
              viewMode={state.viewMode}
              viewDate={state.viewDate}
              renderDate={renderDate}
              setViewMode={state.setViewMode}
              setViewDate={state.setViewDate}
              activeValue={state.value}
              focusedDate={state.focusedDate}
              stackMonths={shouldStack}
              weekStartsOn={weekStartsOn}
              goToPrevYear={state.goToPrevYear}
              goToNextYear={state.goToNextYear}
              goToPrevMonth={state.goToPrevMonth}
              goToNextMonth={state.goToNextMonth}
              monthsToRender={months}
              setFocusedDate={state.setFocusedDate}
              isDateDisabled={state.isDateDisabled}
              rangeHoverDate={state.rangeHoverDate}
              showWeekNumbers={showWeekNumbers}
              showOutsideDays={showOutsideDays}
              handleSelectDate={state.handleSelectDate}
              isSelectingRange={state.isSelectingRange}
              setRangeHoverDate={state.setRangeHoverDate}
              goToPrevYearRight={state.goToPrevYearRight}
              goToNextYearRight={state.goToNextYearRight}
              goToPrevMonthRight={state.goToPrevMonthRight}
              goToNextMonthRight={state.goToNextMonthRight}
            />
          </div>
          {hasTime && (
            <TimeSelector
              time={state.time}
              onChange={state.handleTimeChange}
              placement={timePlacement}
              timeFormat={timeFormat}
              minuteStep={minuteStep}
              secondStep={secondStep}
              showSeconds={showSeconds}
              disabledTime={disabledTime}
              referenceDate={
                state.value instanceof Date ? state.value : state.viewDate
              }
            />
          )}
        </div>
        {isRightPreset && presetEl}
      </div>
      {isBottomPreset && presetEl}
      {(showActions || allowClear) && (
        <ActionFooter
          mode={mode}
          value={state.value}
          locale={locale}
          onClear={state.handleClear}
          showTime={showTime}
          onCancel={state.handleCancel}
          allowClear={allowClear}
          timeFormat={timeFormat}
          showActions={showActions}
          onApply={() => {
            state.handleApply();
            onSelectionComplete?.();
          }}
        />
      )}
    </div>
  );
};
CalendarPanel.displayName = "CalendarPanel";
