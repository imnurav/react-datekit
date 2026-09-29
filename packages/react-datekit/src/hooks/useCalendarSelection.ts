import type { DatePickerMode, DateRange, TimeState } from "../types";
import { useState, useCallback, useRef, useEffect } from "react";
import { cloneDate } from "../utils/dateUtils";
import {
  computeRangeSelection,
  toggleMultipleDate,
  checkDateDisabled,
} from "../utils/selectionUtils";

export interface UseCalendarSelectionProps {
  mode: DatePickerMode;
  value?: unknown;
  defaultValue?: unknown;
  onChange?: (val: any) => void;
  showActions?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disableFutureDates?: boolean;
  disablePastDates?: boolean;
  disabledDate?: (date: Date) => boolean;
  disabledDates?: Date[];
  disabledRanges?: [Date, Date][];
  minRangeLength?: number;
  maxRangeLength?: number;
  time: TimeState;
  showTime?: boolean;
  onApply?: (val: unknown) => void;
  onCancel?: () => void;
  onClear?: () => void;
  onViewDateChange?: (date: Date) => void;
}

export function useCalendarSelection({
  mode,
  value: propValue,
  defaultValue,
  onChange,
  showActions = false,
  minDate,
  maxDate,
  disableFutureDates,
  disablePastDates,
  disabledDate,
  disabledDates,
  disabledRanges,
  minRangeLength,
  maxRangeLength,
  time,
  showTime = false,
  onApply,
  onCancel,
  onClear,
  onViewDateChange,
}: UseCalendarSelectionProps) {
  const isControlled = propValue !== undefined;
  const isControlledRef = useRef(isControlled);

  useEffect(() => {
    const isDev =
      typeof process !== "undefined" &&
      Boolean(
        (process as { env?: Record<string, string> }).env?.NODE_ENV !==
        "production",
      );
    if (isDev && isControlledRef.current !== isControlled) {
      console.warn(
        `DatePicker: Changed from ${
          isControlledRef.current ? "controlled" : "uncontrolled"
        } to ${isControlled ? "controlled" : "uncontrolled"}.`,
      );
    }
  }, [isControlled]);

  const [internalValue, setInternalValue] = useState<unknown>(() => {
    if (defaultValue !== undefined) return defaultValue;
    if (mode === "range") return [null, null];
    if (mode === "multiple") return [];
    return null;
  });

  const committedValue = isControlled ? propValue : internalValue;
  const [stagedValue, setStagedValue] = useState<unknown>(committedValue);

  useEffect(() => {
    setStagedValue(committedValue);
  }, [committedValue]);

  const [isSelectingRange, setIsSelectingRange] = useState<boolean>(false);
  const [rangeHoverDate, setRangeHoverDate] = useState<Date | null>(null);

  const isDateDisabled = useCallback(
    (date: Date): boolean =>
      checkDateDisabled(
        date,
        minDate,
        maxDate,
        disabledDate,
        disabledDates,
        disabledRanges,
        disableFutureDates,
        disablePastDates,
      ),
    [
      minDate,
      maxDate,
      disabledDate,
      disabledDates,
      disabledRanges,
      disableFutureDates,
      disablePastDates,
    ],
  );

  const notifyChange = useCallback(
    (val: unknown) => {
      if (!isControlled) setInternalValue(val);
      setStagedValue(val);
      onChange?.(val);
    },
    [isControlled, onChange],
  );

  const handleSelectDate = useCallback(
    (clickedDate: Date) => {
      if (isDateDisabled(clickedDate)) return;

      const dateWithTime = cloneDate(clickedDate);
      if (showTime || mode === "datetime") {
        dateWithTime.setHours(time.hours, time.minutes, time.seconds, 0);
      } else {
        dateWithTime.setHours(0, 0, 0, 0);
      }

      if (mode === "single" || mode === "datetime") {
        if (showActions) setStagedValue(dateWithTime);
        else notifyChange(dateWithTime);
      } else if (mode === "month") {
        const result = cloneDate(clickedDate);
        result.setDate(1);
        notifyChange(result);
      } else if (mode === "year") {
        const result = cloneDate(clickedDate);
        result.setMonth(0, 1);
        notifyChange(result);
      } else if (mode === "multiple") {
        const currentList = Array.isArray(stagedValue)
          ? (stagedValue as Date[])
          : [];
        const updated = toggleMultipleDate(currentList, dateWithTime);
        if (showActions) setStagedValue(updated);
        else notifyChange(updated);
      } else if (mode === "range") {
        const currentRange = stagedValue as DateRange | null;
        const result = computeRangeSelection(
          currentRange,
          isSelectingRange,
          dateWithTime,
          minRangeLength,
          maxRangeLength,
        );
        setIsSelectingRange(result.nextIsSelecting);
        if (!result.nextIsSelecting) setRangeHoverDate(null);

        if (showActions) setStagedValue(result.nextRange);
        else if (!result.nextIsSelecting) notifyChange(result.nextRange);
        else setStagedValue(result.nextRange);
      }
    },
    [
      isDateDisabled,
      showTime,
      mode,
      time,
      showActions,
      notifyChange,
      stagedValue,
      isSelectingRange,
      minRangeLength,
      maxRangeLength,
    ],
  );

  const handleApply = useCallback(() => {
    notifyChange(stagedValue);
    onApply?.(stagedValue);
  }, [notifyChange, stagedValue, onApply]);

  const handleCancel = useCallback(() => {
    setStagedValue(committedValue);
    setIsSelectingRange(false);
    setRangeHoverDate(null);
    onCancel?.();
  }, [committedValue, onCancel]);

  const handleClear = useCallback(() => {
    let emptyVal: unknown = null;
    if (mode === "range") emptyVal = [null, null];
    if (mode === "multiple") emptyVal = [];
    setIsSelectingRange(false);
    setRangeHoverDate(null);
    notifyChange(emptyVal);
    onClear?.();
  }, [mode, notifyChange, onClear]);

  const handlePresetSelect = useCallback(
    (presetRange: DateRange | Date) => {
      if (Array.isArray(presetRange)) {
        const [start, end] = presetRange;
        if (start) onViewDateChange?.(start);
        setIsSelectingRange(false);
        setRangeHoverDate(null);
        if (showActions) setStagedValue([start, end]);
        else notifyChange([start, end]);
      } else {
        onViewDateChange?.(presetRange);
        if (showActions) setStagedValue(presetRange);
        else notifyChange(presetRange);
      }
    },
    [onViewDateChange, showActions, notifyChange],
  );

  return {
    value: stagedValue,
    committedValue,
    isSelectingRange,
    rangeHoverDate,
    setRangeHoverDate,
    handleSelectDate,
    handleApply,
    handleCancel,
    handleClear,
    handlePresetSelect,
    isDateDisabled,
    notifyChange,
    setStagedValue,
  };
}
