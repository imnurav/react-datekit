export const DEFAULT_LOCALE = "en-US";
export const DEFAULT_TIME_FORMAT = "24" as const;
export const DEFAULT_PLACEHOLDER = "Select date…";
export const DEFAULT_INPUT_SIZE = "md" as const;

export const DEFAULT_DATE_LOCALE_OPTS: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
};

/**
 * Minimum container width threshold (px) to render 2 months side-by-side.
 * 2 months × 280px + divider (25px) + outer padding (32px) = 617px baseline.
 */
export const MIN_DUAL_MONTH_WIDTH = 617;
export const PRESETS_SIDEBAR_WIDTH = 160;
export const TIME_COLUMN_WIDTH = 160;

/** Default keyboard navigation day and week offsets */
export const KEYBOARD_STEP_DAY = 1;
export const KEYBOARD_STEP_WEEK = 7;
