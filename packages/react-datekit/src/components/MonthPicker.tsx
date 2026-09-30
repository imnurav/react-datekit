import type { MonthPickerProps } from "../types/internal";
import { formatMonthName } from "../utils/format";
import React from "react";

export const MonthPicker: React.FC<MonthPickerProps> = ({
  viewDate,
  onSelectMonth,
  locale = "en-US",
  minDate,
  maxDate,
}) => {
  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();

  const months = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="rdk-picker-grid" role="grid" aria-label="Choose month">
      {months.map((m) => {
        const name = formatMonthName(m, "short", locale);
        const isCurrent = m === currentMonth;

        let isDisabled = false;
        if (
          minDate &&
          currentYear === minDate.getFullYear() &&
          m < minDate.getMonth()
        ) {
          isDisabled = true;
        }
        if (
          maxDate &&
          currentYear === maxDate.getFullYear() &&
          m > maxDate.getMonth()
        ) {
          isDisabled = true;
        }

        return (
          <button
            key={m}
            type="button"
            className={`rdk-picker-item ${isCurrent ? "rdk-picker-item--selected" : ""}`}
            disabled={isDisabled}
            onClick={() => onSelectMonth(m)}
            aria-selected={isCurrent}
            aria-label={formatMonthName(m, "long", locale)}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
};
