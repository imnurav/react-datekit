import { isSameDay, isBeforeDay, isWithinRange } from "../utils/dateUtils";
import { useCalendarGrid } from "../hooks/useCalendarGrid";
import { getWeekdayNames } from "../utils/format";
import { memo, useRef, useEffect } from "react";
import { DateCell } from "./DateCell";
import type { MonthViewProps } from "../types/internal";

export const MonthView = memo<MonthViewProps>(({
  viewMonth,
  mode,
  value,
  weekStartsOn = 0,
  showWeekNumbers = false,
  showOutsideDays = true,
  locale = "en-US",
  focusedDate,
  onFocusDate,
  onSelectDate,
  isDateDisabled,
  isSelectingRange = false,
  rangeHoverDate,
  onHoverDate,
  renderDate,
}) => {
  const { weeks } = useCalendarGrid(viewMonth, weekStartsOn);
  const weekdays = getWeekdayNames(weekStartsOn, "short", locale);
  const focusedBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (
      focusedBtnRef.current &&
      document.activeElement?.classList.contains("rdk-cell-btn") &&
      document.activeElement !== focusedBtnRef.current
    ) {
      focusedBtnRef.current.focus();
    }
  }, [focusedDate]);

  let rangeStart: Date | null = null;
  let rangeEnd: Date | null = null;

  if (mode === "range" && Array.isArray(value)) {
    rangeStart = value[0] ?? null;
    rangeEnd = value[1] ?? null;
  }

  let previewStart = rangeStart;
  let previewEnd = rangeEnd;
  if (isSelectingRange && rangeStart && rangeHoverDate) {
    if (isBeforeDay(rangeHoverDate, rangeStart)) {
      previewStart = rangeHoverDate;
      previewEnd = rangeStart;
    } else {
      previewStart = rangeStart;
      previewEnd = rangeHoverDate;
    }
  }

  return (
    <div
      className="rdk-grid"
      role="grid"
      aria-label={`${viewMonth.toLocaleString(locale, { month: "long", year: "numeric" })}`}
    >
      <div className={`rdk-weekdays ${showWeekNumbers ? "rdk-weekdays--with-weeknum" : ""}`} role="row">
        {showWeekNumbers && (
          <div
            className="rdk-weekday rdk-weeknum"
            role="columnheader"
            aria-label="Week Number"
          >
            #
          </div>
        )}
        {weekdays.map((wd) => (
          <div
            key={wd.dayIndex}
            className="rdk-weekday"
            role="columnheader"
            aria-label={wd.fullLabel}
          >
            {wd.label}
          </div>
        ))}
      </div>

      <div className="rdk-days" role="rowgroup">
        {weeks.map((week, rowIndex) => (
          <div
            key={rowIndex}
            className={`rdk-week-row ${showWeekNumbers ? "rdk-week-row--with-weeknum" : ""}`}
            role="row"
          >
            {showWeekNumbers && (
              <div
                className="rdk-weeknum-cell"
                role="rowheader"
                aria-label={`Week ${week[0]?.weekNumber}`}
              >
                {week[0]?.weekNumber}
              </div>
            )}

            {week.map((cell) => {
              const {
                date,
                dayNumber,
                isOutside,
                isToday,
                isStartOfRow,
                isEndOfRow,
              } = cell;

              if (isOutside && !showOutsideDays) {
                return (
                  <div
                    key={date.toISOString()}
                    className="rdk-cell rdk-cell--empty"
                    role="gridcell"
                    aria-hidden="true"
                  />
                );
              }

              let isSelected = false;
              let isRangeStart = false;
              let isRangeEnd = false;
              let isInRange = false;
              let isRangeHover = false;

              // Outside days belong to the adjacent month where they are
              // rendered with correct state. Suppress all range/selection
              // visuals here to avoid the double-selection illusion in
              // stacked or two-month side-by-side layouts.
              if (!isOutside) {
                if (
                  mode === "single" ||
                  mode === "datetime" ||
                  mode === "month" ||
                  mode === "year"
                ) {
                  isSelected = isSameDay(date, value as Date);
                } else if (mode === "multiple" && Array.isArray(value)) {
                  isSelected = value.some((d: Date) => isSameDay(d, date));
                } else if (mode === "range") {
                  if (rangeStart && rangeEnd) {
                    isRangeStart = isSameDay(date, rangeStart);
                    isRangeEnd = isSameDay(date, rangeEnd);
                    isInRange = isWithinRange(date, rangeStart, rangeEnd);
                    isSelected = isRangeStart || isRangeEnd;
                  } else if (rangeStart) {
                    isRangeStart = isSameDay(date, rangeStart);
                    isSelected = isRangeStart;
                  }

                  if (isSelectingRange && previewStart && previewEnd) {
                    const inPreview = isWithinRange(
                      date,
                      previewStart,
                      previewEnd,
                    );
                    isRangeHover = inPreview && !isInRange;
                    if (isSameDay(date, previewStart)) isRangeStart = true;
                    if (isSameDay(date, previewEnd)) isRangeEnd = true;
                  }
                }
              }

              return (
                <DateCell
                  key={date.toISOString()}
                  date={date}
                  dayNumber={dayNumber}
                  isOutside={isOutside}
                  isToday={isToday}
                  isStartOfRow={isStartOfRow}
                  isEndOfRow={isEndOfRow}
                  disabled={isDateDisabled(date)}
                  isFocused={isSameDay(date, focusedDate)}
                  isSelected={isSelected}
                  isRangeStart={isRangeStart}
                  isRangeEnd={isRangeEnd}
                  isInRange={isInRange}
                  isRangeHover={isRangeHover}
                  locale={locale}
                  focusedBtnRef={(el) => {
                    focusedBtnRef.current = el;
                  }}
                  onSelectDate={onSelectDate}
                  onFocusDate={onFocusDate}
                  onHoverDate={onHoverDate}
                  isSelectingRange={isSelectingRange}
                  renderDate={renderDate}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
});

MonthView.displayName = "MonthView";
