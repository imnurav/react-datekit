import { useMemo } from "react";
import {
  getISOWeekNumber,
  startOfMonth,
  startOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
} from "../utils/dateUtils";

export interface CalendarDayCell {
  date: Date;
  dayNumber: number;
  isOutside: boolean;
  isToday: boolean;
  weekNumber: number;
  isStartOfRow: boolean;
  isEndOfRow: boolean;
}

export function useCalendarGrid(
  viewMonth: Date,
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0,
): { weeks: CalendarDayCell[][] } {
  return useMemo(() => {
    const today = new Date();
    const monthStart = startOfMonth(viewMonth);
    const gridStart = startOfWeek(monthStart, weekStartsOn);

    const weeks: CalendarDayCell[][] = [];
    let currentDay = gridStart;

    // 6 rows x 7 days = 42 days (guarantees uniform grid height across all months)
    for (let row = 0; row < 6; row++) {
      const week: CalendarDayCell[] = [];
      const weekNumber = getISOWeekNumber(currentDay);

      for (let col = 0; col < 7; col++) {
        const isOutside = !isSameMonth(currentDay, viewMonth);
        const isCurrentDay = isSameDay(currentDay, today);

        week.push({
          date: currentDay,
          dayNumber: currentDay.getDate(),
          isOutside,
          isToday: isCurrentDay,
          weekNumber,
          isStartOfRow: col === 0,
          isEndOfRow: col === 6,
        });

        currentDay = addDays(currentDay, 1);
      }
      weeks.push(week);
    }

    return { weeks };
  }, [viewMonth, weekStartsOn]);
}
