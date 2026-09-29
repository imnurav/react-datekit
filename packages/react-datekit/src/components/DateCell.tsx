import { getCellAriaLabel } from "../utils/accessibility";
import type { RenderDateInfo } from "../types";
import type { DateCellProps } from "../types/internal";
import { memo, useCallback, useMemo } from "react";

export const DateCell = memo<DateCellProps>(
  ({
    date,
    dayNumber,
    isOutside,
    isToday,
    isStartOfRow,
    isEndOfRow,
    disabled,
    isFocused,
    isSelected,
    isRangeStart,
    isRangeEnd,
    isInRange,
    isRangeHover,
    locale,
    focusedBtnRef,
    onSelectDate,
    onFocusDate,
    onHoverDate,
    isSelectingRange,
    renderDate,
  }) => {
    const sameDayRange = isRangeStart && isRangeEnd;

    const cellInfo: RenderDateInfo = useMemo(
      () => ({
        isSelected,
        isRangeStart,
        isRangeEnd,
        isInRange,
        isRangeHover,
        isToday,
        isDisabled: disabled,
        isOutside,
        date,
      }),
      [
        isSelected,
        isRangeStart,
        isRangeEnd,
        isInRange,
        isRangeHover,
        isToday,
        disabled,
        isOutside,
        date,
      ],
    );

    const cellAriaLabel = getCellAriaLabel(date, cellInfo, locale);

    const classNames = [
      "rdk-cell",
      isOutside ? "rdk-cell--outside" : "",
      disabled ? "rdk-cell--disabled" : "",
      isToday ? "rdk-cell--today" : "",
      isSelected ? "rdk-cell--selected" : "",
      isInRange ? "rdk-cell--in-range" : "",
      isRangeHover ? "rdk-cell--range-hover" : "",
      isRangeStart ? "rdk-cell--range-start" : "",
      isRangeEnd ? "rdk-cell--range-end" : "",
      sameDayRange ? "rdk-cell--range-same-day" : "",
      isStartOfRow ? "rdk-cell--row-start" : "",
      isEndOfRow ? "rdk-cell--row-end" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const handleClick = useCallback(
      () => onSelectDate(date),
      [onSelectDate, date],
    );
    const handleFocus = useCallback(() => {
      if (!isFocused) onFocusDate(date);
    }, [isFocused, onFocusDate, date]);

    const handleMouseEnter = useCallback(() => {
      if (isSelectingRange && onHoverDate) onHoverDate(date);
    }, [isSelectingRange, onHoverDate, date]);

    const handleMouseLeave = useCallback(() => {
      if (isSelectingRange && onHoverDate) onHoverDate(null);
    }, [isSelectingRange, onHoverDate]);

    return (
      <div
        className={classNames}
        role="gridcell"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {(isInRange || isRangeHover || isRangeStart || isRangeEnd) && !isOutside && !sameDayRange && (
          <div className="rdk-connector" aria-hidden="true" />
        )}

        <button
          ref={isFocused ? focusedBtnRef : undefined}
          type="button"
          tabIndex={isFocused ? 0 : -1}
          disabled={disabled}
          className="rdk-cell-btn"
          onClick={handleClick}
          onFocus={handleFocus}
          aria-label={cellAriaLabel}
          aria-selected={isSelected || isInRange}
          aria-disabled={disabled}
          aria-current={isToday ? "date" : undefined}
        >
          {renderDate ? renderDate(date, cellInfo) : dayNumber}
          {isToday && <span className="rdk-today-dot" aria-hidden="true" />}
        </button>
      </div>
    );
  },
);

DateCell.displayName = "DateCell";
