import type { HeaderProps } from "../types/internal";
import { formatMonthName } from "../utils/format";
import { memo } from "react";
import {
  DoubleChevronRight,
  DoubleChevronLeft,
  ChevronRight,
  ChevronLeft,
} from "./Icons";

export const Header = memo<HeaderProps>(
  ({
    viewDate,
    onPrevMonth,
    onNextMonth,
    onPrevYear,
    onNextYear,
    onToggleMonthPicker,
    onToggleYearPicker,
    showFastJump = true,
    locale = "en-US",
    isSecondaryMonth = false,
    showPrevButtons,
    showNextButtons = true,
  }) => {
    const monthName = formatMonthName(viewDate.getMonth(), "long", locale);
    const yearNumber = viewDate.getFullYear();
    const canShowPrev =
      showPrevButtons !== undefined ? showPrevButtons : !isSecondaryMonth;
    const canShowNext = showNextButtons;

    return (
      <div className="rdk-header">
        <div className="rdk-header-nav rdk-header-nav--left">
          {canShowPrev && showFastJump && (
            <button
              type="button"
              className="rdk-header-btn-icon"
              onClick={onPrevYear}
              aria-label="Previous year"
              title="Previous year"
            >
              <DoubleChevronLeft />
            </button>
          )}
          {canShowPrev && (
            <button
              type="button"
              className="rdk-header-btn-icon"
              onClick={onPrevMonth}
              aria-label="Previous month"
              title="Previous month"
            >
              <ChevronLeft />
            </button>
          )}
        </div>

        <div className="rdk-header-title">
          <button
            type="button"
            className="rdk-header-title-btn"
            onClick={onToggleMonthPicker}
            aria-label={`Select month, current is ${monthName}`}
          >
            {monthName}
          </button>
          <button
            type="button"
            className="rdk-header-title-btn"
            onClick={onToggleYearPicker}
            aria-label={`Select year, current is ${yearNumber}`}
          >
            {yearNumber}
          </button>
        </div>

        <div className="rdk-header-nav rdk-header-nav--right">
          {canShowNext && (
            <button
              type="button"
              className="rdk-header-btn-icon"
              onClick={onNextMonth}
              aria-label="Next month"
              title="Next month"
            >
              <ChevronRight />
            </button>
          )}
          {canShowNext && showFastJump && (
            <button
              type="button"
              className="rdk-header-btn-icon"
              onClick={onNextYear}
              aria-label="Next year"
              title="Next year"
            >
              <DoubleChevronRight />
            </button>
          )}
        </div>
      </div>
    );
  },
);

Header.displayName = "Header";
