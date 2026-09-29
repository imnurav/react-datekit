import { useCallback } from "react";
import {
  startOfWeek,
  addMonths,
  subMonths,
  endOfWeek,
  addYears,
  subYears,
  addDays,
  subDays,
} from "../utils/dateUtils";

export interface UseCalendarKeyboardProps {
  disabled?: boolean;
  dir?: "ltr" | "rtl" | "auto";
  focusedDate: Date;
  viewDate: Date;
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  isSelectingRange?: boolean;
  setFocusedDate: (date: Date) => void;
  setViewDate: (date: Date) => void;
  handleSelectDate: (date: Date) => void;
  handleCancel: () => void;
}

export function useCalendarKeyboard({
  disabled = false,
  dir = "ltr",
  focusedDate,
  viewDate,
  weekStartsOn,
  isSelectingRange = false,
  setFocusedDate,
  setViewDate,
  handleSelectDate,
  handleCancel,
}: UseCalendarKeyboardProps) {
  return useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;

      let targetDate: Date | null = null;

      switch (e.key) {
        case "ArrowLeft":
          targetDate =
            dir === "rtl" ? addDays(focusedDate, 1) : subDays(focusedDate, 1);
          break;
        case "ArrowRight":
          targetDate =
            dir === "rtl" ? subDays(focusedDate, 1) : addDays(focusedDate, 1);
          break;
        case "ArrowUp":
          targetDate = subDays(focusedDate, 7);
          break;
        case "ArrowDown":
          targetDate = addDays(focusedDate, 7);
          break;
        case "Home":
          targetDate = startOfWeek(focusedDate, weekStartsOn);
          break;
        case "End":
          targetDate = endOfWeek(focusedDate, weekStartsOn);
          break;
        case "PageUp":
          targetDate = e.shiftKey
            ? subYears(focusedDate, 1)
            : subMonths(focusedDate, 1);
          break;
        case "PageDown":
          targetDate = e.shiftKey
            ? addYears(focusedDate, 1)
            : addMonths(focusedDate, 1);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          handleSelectDate(focusedDate);
          return;
        case "Escape":
          e.preventDefault();
          if (isSelectingRange) handleCancel();
          return;
        default:
          return;
      }

      if (targetDate) {
        e.preventDefault();
        setFocusedDate(targetDate);
        if (
          targetDate.getMonth() !== viewDate.getMonth() ||
          targetDate.getFullYear() !== viewDate.getFullYear()
        ) {
          setViewDate(targetDate);
        }
      }
    },
    [
      disabled,
      dir,
      focusedDate,
      weekStartsOn,
      viewDate,
      handleSelectDate,
      isSelectingRange,
      handleCancel,
      setFocusedDate,
      setViewDate,
    ],
  );
}
