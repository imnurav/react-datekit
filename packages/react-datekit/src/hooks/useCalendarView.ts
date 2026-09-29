import { useState, useCallback, useMemo } from "react";
import type { DatePickerMode } from "../types";
import {
  startOfDay,
  isSameDay,
  addMonths,
  subMonths,
  addYears,
  subYears,
} from "../utils/dateUtils";

export interface UseCalendarViewProps {
  mode: DatePickerMode;
  defaultViewDate?: Date;
  initialValue?: unknown;
  onMonthChange?: (month: Date) => void;
}

/** Ordinal month index for order comparison (year*12 + month) */
function monthOrd(d: Date) {
  return d.getFullYear() * 12 + d.getMonth();
}

export function useCalendarView({
  mode,
  defaultViewDate,
  initialValue,
  onMonthChange,
}: UseCalendarViewProps) {
  const initialViewDate = useMemo(() => {
    if (defaultViewDate) return defaultViewDate;
    if (initialValue) {
      if (mode === "range" && Array.isArray(initialValue) && initialValue[0]) {
        return initialValue[0];
      }
      if (
        mode === "multiple" &&
        Array.isArray(initialValue) &&
        initialValue[0]
      ) {
        return initialValue[0];
      }
      if (initialValue instanceof Date) {
        return initialValue;
      }
    }
    return new Date();
  }, [defaultViewDate, initialValue, mode]);

  const [viewDate, setViewDateState] = useState<Date>(initialViewDate);

  // rightViewDate tracks the RIGHT month independently.
  // Constraint: always >= 1 month ahead of viewDate (left month).
  const [rightViewDate, setRightViewDateState] = useState<Date>(() => {
    if (
      mode === "range" &&
      Array.isArray(initialValue) &&
      initialValue[1] instanceof Date &&
      monthOrd(initialValue[1]) > monthOrd(initialViewDate)
    ) {
      return initialValue[1];
    }
    return addMonths(initialViewDate, 1);
  });

  const [focusedDate, setFocusedDateState] = useState<Date>(() =>
    startOfDay(initialViewDate),
  );

  const setFocusedDate = useCallback((newDate: Date) => {
    setFocusedDateState((prev) => (isSameDay(prev, newDate) ? prev : newDate));
  }, []);

  const [viewMode, setViewMode] = useState<"days" | "months" | "years">(() => {
    if (mode === "month") return "months";
    if (mode === "year") return "years";
    return "days";
  });

  const setViewDate = useCallback(
    (newDate: Date) => {
      setViewDateState(newDate);
      onMonthChange?.(newDate);
    },
    [onMonthChange],
  );

  const setRightViewDate = useCallback((newDate: Date) => {
    setRightViewDateState(newDate);
  }, []);

  const setDualViewDates = useCallback(
    (left: Date, right?: Date) => {
      setViewDateState(left);
      onMonthChange?.(left);
      if (right && monthOrd(right) > monthOrd(left))
        setRightViewDateState(right);
      else setRightViewDateState(addMonths(left, 1));
    },
    [onMonthChange],
  );

  // ── Left month navigation ──────────────────────────────────────────
  // When left advances into or past right, push right one month beyond left.
  const goToNextMonth = useCallback(() => {
    const next = addMonths(viewDate, 1);
    setViewDate(next);
    setRightViewDateState((prev) =>
      monthOrd(prev) <= monthOrd(next) ? addMonths(next, 1) : prev,
    );
  }, [viewDate, setViewDate]);

  const goToPrevMonth = useCallback(() => {
    // Left retreats freely; right stays (gap widens — fine).
    setViewDate(subMonths(viewDate, 1));
  }, [viewDate, setViewDate]);

  const goToNextYear = useCallback(() => {
    const next = addYears(viewDate, 1);
    setViewDate(next);
    setRightViewDateState((prev) =>
      monthOrd(prev) <= monthOrd(next) ? addMonths(next, 1) : prev,
    );
  }, [viewDate, setViewDate]);

  const goToPrevYear = useCallback(() => {
    setViewDate(subYears(viewDate, 1));
  }, [viewDate, setViewDate]);

  // ── Right month independent navigation ────────────────────────────
  // Right advances freely. Can retreat only until exactly 1 month ahead of left.
  const goToNextMonthRight = useCallback(() => {
    setRightViewDateState((prev) => addMonths(prev, 1));
  }, []);

  const goToPrevMonthRight = useCallback(() => {
    setRightViewDateState((prev) => {
      const floor = addMonths(viewDate, 1);
      const candidate = subMonths(prev, 1);
      return monthOrd(candidate) >= monthOrd(floor) ? candidate : floor;
    });
  }, [viewDate]);

  const goToNextYearRight = useCallback(() => {
    setRightViewDateState((prev) => addYears(prev, 1));
  }, []);

  const goToPrevYearRight = useCallback(() => {
    setRightViewDateState((prev) => {
      const floor = addMonths(viewDate, 1);
      const candidate = subYears(prev, 1);
      return monthOrd(candidate) >= monthOrd(floor) ? candidate : floor;
    });
  }, [viewDate]);

  // ── Today ──────────────────────────────────────────────────────────
  const goToToday = useCallback(() => {
    const today = new Date();
    setViewDate(today);
    setFocusedDate(startOfDay(today));
    setRightViewDateState(addMonths(today, 1));
  }, [setViewDate, setFocusedDate]);

  return {
    viewDate,
    setViewDate,
    rightViewDate,
    setRightViewDate,
    setDualViewDates,
    viewMode,
    setViewMode,
    focusedDate,
    setFocusedDate,
    goToNextMonth,
    goToPrevMonth,
    goToNextYear,
    goToPrevYear,
    goToNextMonthRight,
    goToPrevMonthRight,
    goToNextYearRight,
    goToPrevYearRight,
    goToToday,
  };
}
