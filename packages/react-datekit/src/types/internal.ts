import type { DisabledTimeConfig } from "./time";
import type { PresetItem } from "./presets";
import type { ReactNode } from "react";
import type {
  DatePickerProps,
  DatePickerMode,
  RenderDateInfo,
  DateRange,
} from "./datepicker";

export type CalendarPanelProps = DatePickerProps & {
  onSelectionComplete?: () => void;
};

export interface CalendarGridProps {
  viewMode: "days" | "months" | "years";
  setViewMode: (mode: "days" | "months" | "years") => void;
  viewDate: Date;
  setViewDate: (date: Date) => void;
  monthsToRender: Date[];
  mode: DatePickerMode;
  activeValue: unknown;
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  showWeekNumbers?: boolean;
  showOutsideDays?: boolean;
  locale: string;
  focusedDate: Date;
  setFocusedDate: (date: Date) => void;
  handleSelectDate: (date: Date) => void;
  isDateDisabled: (date: Date) => boolean;
  isSelectingRange?: boolean;
  rangeHoverDate?: Date | null;
  setRangeHoverDate: (date: Date | null) => void;
  renderDate?: (date: Date, info: RenderDateInfo) => ReactNode;
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
  goToPrevYear: () => void;
  goToNextYear: () => void;
  goToPrevMonthRight?: () => void;
  goToNextMonthRight?: () => void;
  goToPrevYearRight?: () => void;
  goToNextYearRight?: () => void;
  goToToday?: () => void;
  minDate?: Date;
  maxDate?: Date;
  stackMonths?: boolean;
}

export interface HeaderProps {
  viewDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onPrevYear: () => void;
  onNextYear: () => void;
  onToggleMonthPicker: () => void;
  onToggleYearPicker: () => void;
  showFastJump?: boolean;
  locale?: string;
  isSecondaryMonth?: boolean;
  showPrevButtons?: boolean;
  showNextButtons?: boolean;
}

export interface DateCellProps {
  date: Date;
  dayNumber: number;
  isOutside: boolean;
  isToday: boolean;
  isStartOfRow: boolean;
  isEndOfRow: boolean;
  disabled: boolean;
  isFocused: boolean;
  isSelected: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  isRangeHover: boolean;
  locale: string;
  focusedBtnRef?: (el: HTMLButtonElement | null) => void;
  onSelectDate: (date: Date) => void;
  onFocusDate: (date: Date) => void;
  onHoverDate?: (date: Date | null) => void;
  isSelectingRange?: boolean;
  renderDate?: (date: Date, info: RenderDateInfo) => ReactNode;
}

export interface MonthViewProps {
  viewMonth: Date;
  mode: DatePickerMode;
  value: unknown;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  showWeekNumbers?: boolean;
  showOutsideDays?: boolean;
  locale?: string;
  focusedDate: Date;
  onFocusDate: (date: Date) => void;
  onSelectDate: (date: Date) => void;
  isDateDisabled: (date: Date) => boolean;
  isSelectingRange?: boolean;
  rangeHoverDate?: Date | null;
  onHoverDate?: (date: Date | null) => void;
  renderDate?: (date: Date, info: RenderDateInfo) => ReactNode;
}

export interface ActionFooterProps {
  mode: DatePickerMode;
  value: any;
  showActions?: boolean;
  allowClear?: boolean;
  showTime?: boolean;
  timeFormat?: "12" | "24";
  locale?: string;
  onClear: () => void;
  onCancel: () => void;
  onApply: () => void;
}

export interface PresetsProps {
  presets?: PresetItem[];
  currentValue: Date | DateRange | null | undefined;
  onSelectPreset: (range: DateRange | Date) => void;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  isMobile?: boolean;
  placement?: "left" | "right" | "top" | "bottom" | "auto";
}

export interface TimeSelectorProps {
  time: { hours: number; minutes: number; seconds: number };
  onChange: (time: { hours: number; minutes: number; seconds: number }) => void;
  timeFormat?: "12" | "24";
  minuteStep?: number;
  secondStep?: number;
  showSeconds?: boolean;
  disabledTime?: (date: Date) => DisabledTimeConfig;
  referenceDate?: Date;
  placement?: "right" | "bottom";
}

export interface MonthPickerProps {
  viewDate: Date;
  onSelectMonth: (monthIndex: number) => void;
  locale?: string;
  minDate?: Date;
  maxDate?: Date;
}

export interface YearPickerProps {
  viewDate: Date;
  onSelectYear: (year: number) => void;
  minDate?: Date;
  maxDate?: Date;
}
