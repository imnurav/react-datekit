import type { CalendarGridProps } from "../types/internal";
import { MonthPicker } from "./MonthPicker";
import { YearPicker } from "./YearPicker";
import { MonthView } from "./MonthView";
import { Header } from "./Header";
import { memo } from "react";

export const CalendarGrid = memo<CalendarGridProps>(
  ({
    mode,
    locale,
    minDate,
    maxDate,
    viewMode,
    viewDate,
    renderDate,
    setViewMode,
    setViewDate,
    activeValue,
    focusedDate,
    stackMonths = false,
    weekStartsOn,
    goToPrevYear,
    goToNextYear,
    goToPrevMonth,
    goToNextMonth,
    monthsToRender,
    setFocusedDate,
    isDateDisabled,
    rangeHoverDate,
    showWeekNumbers,
    showOutsideDays,
    handleSelectDate,
    isSelectingRange,
    setRangeHoverDate,
    goToPrevYearRight,
    goToNextYearRight,
    goToPrevMonthRight,
    goToNextMonthRight,
  }) => {
    if (viewMode === "days") {
      const isDualSideBySide = monthsToRender.length > 1 && !stackMonths;

      return (
        <div
          className={`rdk-datepicker-months ${stackMonths ? "rdk-datepicker-months--stacked" : ""}`}
        >
          {monthsToRender.map((monthDate, index) => {
            const isFirst = index === 0;
            const isLast = index === monthsToRender.length - 1;

            return (
              <div
                key={monthDate.toISOString()}
                className="rdk-datepicker-month-col"
              >
                <Header
                  viewDate={monthDate}
                  onPrevMonth={
                    isFirst
                      ? goToPrevMonth
                      : (goToPrevMonthRight ?? goToPrevMonth)
                  }
                  onNextMonth={
                    isFirst
                      ? goToNextMonth
                      : (goToNextMonthRight ?? goToNextMonth)
                  }
                  onPrevYear={
                    isFirst ? goToPrevYear : (goToPrevYearRight ?? goToPrevYear)
                  }
                  onNextYear={
                    isFirst ? goToNextYear : (goToNextYearRight ?? goToNextYear)
                  }
                  locale={locale}
                  showFastJump={isFirst || isLast}
                  showPrevButtons={isDualSideBySide ? isFirst : true}
                  showNextButtons={isDualSideBySide ? isLast : true}
                  isSecondaryMonth={!isFirst}
                  onToggleYearPicker={() => setViewMode("years")}
                  onToggleMonthPicker={() => setViewMode("months")}
                />

                <MonthView
                  mode={mode}
                  value={activeValue}
                  locale={locale}
                  viewMonth={monthDate}
                  renderDate={renderDate}
                  focusedDate={focusedDate}
                  onFocusDate={setFocusedDate}
                  onHoverDate={setRangeHoverDate}
                  weekStartsOn={weekStartsOn}
                  onSelectDate={handleSelectDate}
                  isDateDisabled={isDateDisabled}
                  rangeHoverDate={rangeHoverDate}
                  showWeekNumbers={showWeekNumbers}
                  showOutsideDays={showOutsideDays}
                  isSelectingRange={isSelectingRange}
                />
              </div>
            );
          })}
        </div>
      );
    }

    if (viewMode === "months") {
      return (
        <div className="rdk-picker-wrapper">
          <Header
            locale={locale}
            viewDate={viewDate}
            onPrevYear={goToPrevYear}
            onNextYear={goToNextYear}
            onPrevMonth={goToPrevYear}
            onNextMonth={goToNextYear}
            onToggleYearPicker={() => setViewMode("years")}
            onToggleMonthPicker={() => setViewMode("days")}
          />
          <MonthPicker
            locale={locale}
            minDate={minDate}
            maxDate={maxDate}
            viewDate={viewDate}
            onSelectMonth={(monthIdx) => {
              const newD = new Date(viewDate);
              newD.setMonth(monthIdx);
              setViewDate(newD);
              if (mode === "month") handleSelectDate(newD);
              else setViewMode("days");
            }}
          />
        </div>
      );
    }

    return (
      <div className="rdk-picker-wrapper">
        <YearPicker
          viewDate={viewDate}
          minDate={minDate}
          maxDate={maxDate}
          onSelectYear={(yr) => {
            const newD = new Date(viewDate);
            newD.setFullYear(yr);
            setViewDate(newD);
            if (mode === "year") handleSelectDate(newD);
            else setViewMode("months");
          }}
        />
      </div>
    );
  },
);

CalendarGrid.displayName = "CalendarGrid";
