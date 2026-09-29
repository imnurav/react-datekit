import { ChevronLeft, ChevronRight } from "./Icons";
import React, { useState } from "react";
import type { YearPickerProps } from "../types/internal";

export const YearPicker: React.FC<YearPickerProps> = ({
  viewDate,
  onSelectYear,
  minDate,
  maxDate,
}) => {
  const currentYear = viewDate.getFullYear();
  // Group into 12-year windows (e.g. 2020-2031)
  const [decadeStart, setDecadeStart] = useState<number>(() => {
    return Math.floor(currentYear / 10) * 10 - 1;
  });

  const years = Array.from({ length: 12 }, (_, i) => decadeStart + i);

  const prevDecade = () => setDecadeStart((prev) => prev - 10);
  const nextDecade = () => setDecadeStart((prev) => prev + 10);

  return (
    <div className="rdk-year-picker">
      <div className="rdk-picker-header">
        <button
          type="button"
          className="rdk-header-btn-icon"
          onClick={prevDecade}
          aria-label="Previous decade"
        >
          <ChevronLeft />
        </button>
        <span className="rdk-picker-label">
          {decadeStart} - {decadeStart + 11}
        </span>
        <button
          type="button"
          className="rdk-header-btn-icon"
          onClick={nextDecade}
          aria-label="Next decade"
        >
          <ChevronRight />
        </button>
      </div>

      <div className="rdk-picker-grid" role="grid" aria-label="Choose year">
        {years.map((y) => {
          const isSelected = y === currentYear;
          let isDisabled = false;
          if (minDate && y < minDate.getFullYear()) isDisabled = true;
          if (maxDate && y > maxDate.getFullYear()) isDisabled = true;

          return (
            <button
              key={y}
              type="button"
              className={`rdk-picker-item ${isSelected ? "rdk-picker-item--selected" : ""}`}
              disabled={isDisabled}
              onClick={() => onSelectYear(y)}
              aria-selected={isSelected}
              aria-label={`Year ${y}`}
            >
              {y}
            </button>
          );
        })}
      </div>
    </div>
  );
};
