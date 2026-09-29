import type { DatePickerMode, DisabledTimeConfig, TimeState } from "../types";
import { useCalendarSelection } from "./useCalendarSelection";
import { useCalendarView } from "./useCalendarView";
import { useCalendarTime } from "./useCalendarTime";
import { cloneDate } from "../utils/dateUtils";
import { useCallback } from "react";

export interface UseCalendarStateProps {
  mode: DatePickerMode;
  value?: unknown;
  defaultValue?: unknown;
  onChange?: (val: any) => void;
  minDate?: Date;
  maxDate?: Date;
  disableFutureDates?: boolean;
  disablePastDates?: boolean;
  disabledDate?: (date: Date) => boolean;
  disabledDates?: Date[];
  disabledRanges?: [Date, Date][];
  defaultViewDate?: Date;
  onMonthChange?: (month: Date) => void;
  minRangeLength?: number;
  maxRangeLength?: number;
  showActions?: boolean;
  onApply?: (val: unknown) => void;
  onCancel?: () => void;
  onClear?: () => void;
  showTime?: boolean;
  disabledTime?: (date: Date) => DisabledTimeConfig;
}

export function useCalendarState(props: UseCalendarStateProps) {
  const {
    mode,
    value,
    defaultValue,
    defaultViewDate,
    onMonthChange,
    showTime = false,
    showActions = false,
  } = props;

  const { time, setTime } = useCalendarTime(
    value instanceof Date
      ? value
      : defaultValue instanceof Date
        ? defaultValue
        : null,
  );

  const view = useCalendarView({
    mode,
    defaultViewDate,
    initialValue: value ?? defaultValue,
    onMonthChange,
  });

  const selection = useCalendarSelection({
    ...props,
    time,
    onViewDateChange: view.setDualViewDates,
  });

  const handleTimeChange = useCallback(
    (newTime: TimeState) => {
      setTime(newTime);
      if (mode === "datetime" || (mode === "single" && showTime)) {
        if (selection.value instanceof Date) {
          const updated = cloneDate(selection.value);
          updated.setHours(newTime.hours, newTime.minutes, newTime.seconds);
          if (showActions) {
            selection.setStagedValue(updated);
          } else {
            selection.notifyChange(updated);
          }
        }
      }
    },
    [mode, showTime, selection, showActions, setTime],
  );

  return {
    ...view,
    ...selection,
    time,
    handleTimeChange,
  };
}
