import { formatFullDate, formatTime } from "../utils/format";
import type { ActionFooterProps } from "../types/internal";

export const ActionFooter: React.FC<ActionFooterProps> = ({
  mode,
  value,
  showActions = false,
  allowClear = false,
  showTime = false,
  timeFormat = "24",
  locale = "en-US",
  onClear,
  onCancel,
  onApply,
}) => {
  if (!showActions && !allowClear) return null;

  // Generate readable summary
  let summaryText = "";
  let hasSelection = false;

  if (mode === "single" || mode === "datetime") {
    if (value instanceof Date) {
      hasSelection = true;
      summaryText = formatFullDate(value, locale);
      if (showTime || mode === "datetime") {
        summaryText += ` ${formatTime(value, timeFormat, false, locale)}`;
      }
    }
  } else if (mode === "range" && Array.isArray(value)) {
    const [start, end] = value;
    if (start && end) {
      hasSelection = true;
      summaryText = `${start.toLocaleDateString(locale)} — ${end.toLocaleDateString(locale)}`;
    } else if (start) {
      hasSelection = true;
      summaryText = `From: ${start.toLocaleDateString(locale)}`;
    }
  } else if (mode === "multiple" && Array.isArray(value) && value.length > 0) {
    hasSelection = true;
    summaryText = `${value.length} dates selected`;
  }

  return (
    <div className="rdk-footer">
      <div className="rdk-footer-info">
        {summaryText ? (
          <span className="rdk-footer-summary">{summaryText}</span>
        ) : (
          <span className="rdk-footer-placeholder">No date selected</span>
        )}
      </div>

      <div className="rdk-footer-actions">
        {allowClear && (
          <button
            type="button"
            className="rdk-btn rdk-btn--clear"
            onClick={onClear}
            disabled={!hasSelection}
            aria-label="Clear selection"
          >
            Clear
          </button>
        )}

        {showActions && (
          <>
            <button
              type="button"
              className="rdk-btn rdk-btn--cancel"
              onClick={onCancel}
              aria-label="Cancel"
            >
              Cancel
            </button>
            <button
              type="button"
              className="rdk-btn rdk-btn--apply"
              onClick={onApply}
              disabled={!hasSelection}
              aria-label="Apply selection"
            >
              Apply
            </button>
          </>
        )}
      </div>
    </div>
  );
};
