import type { DateRange } from '../types';
import {
  isSameDay,
  isBeforeDay,
  isAfterDay,
  isWithinRange,
  differenceInCalendarDays,
} from './dateUtils';

export function checkDateDisabled(
  date: Date,
  minDate?: Date,
  maxDate?: Date,
  disabledDate?: (date: Date) => boolean,
  disabledDates?: Date[],
  disabledRanges?: [Date, Date][],
  disableFutureDates?: boolean,
  disablePastDates?: boolean,
): boolean {
  const today = new Date();
  if (disableFutureDates && isAfterDay(date, today)) return true;
  if (disablePastDates && isBeforeDay(date, today)) return true;
  if (minDate && isBeforeDay(date, minDate)) return true;
  if (maxDate && isAfterDay(date, maxDate)) return true;
  if (disabledDate && disabledDate(date)) return true;
  if (disabledDates && disabledDates.some((d) => isSameDay(d, date))) return true;
  if (
    disabledRanges &&
    disabledRanges.some(([start, end]) => isWithinRange(date, start, end))
  ) {
    return true;
  }
  return false;
}

export function toggleMultipleDate(currentList: Date[], clickedDate: Date): Date[] {
  const list = [...currentList];
  const idx = list.findIndex((d) => isSameDay(d, clickedDate));
  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    list.push(clickedDate);
  }
  return list;
}

export function computeRangeSelection(
  currentRange: DateRange | null,
  isSelecting: boolean,
  clickedDate: Date,
  minRangeLength?: number,
  maxRangeLength?: number
): { nextRange: DateRange | null; nextIsSelecting: boolean } {
  if (!isSelecting || !currentRange || !currentRange[0] || currentRange[1]) {
    return {
      nextRange: [clickedDate, null],
      nextIsSelecting: true,
    };
  }

  let start = currentRange[0];
  let end = clickedDate;

  if (isBeforeDay(end, start)) {
    const temp = start;
    start = end;
    end = temp;
  }

  const dayLength = differenceInCalendarDays(start, end) + 1;
  if (minRangeLength && dayLength < minRangeLength) {
    return { nextRange: currentRange, nextIsSelecting: true };
  }
  if (maxRangeLength && dayLength > maxRangeLength) {
    return { nextRange: currentRange, nextIsSelecting: true };
  }

  return {
    nextRange: [start, end],
    nextIsSelecting: false,
  };
}
