import type { CSSProperties, ReactNode } from 'react';
import type { PresetItem } from './presets';
import type { DisabledTimeConfig } from './time';

export type DatePickerMode =
  | 'single'
  | 'range'
  | 'multiple'
  | 'month'
  | 'year'
  | 'datetime';

export type DateRange = [Date | null, Date | null];

export interface RenderDateInfo {
  isSelected: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  isRangeHover: boolean;
  isToday: boolean;
  isDisabled: boolean;
  isOutside: boolean;
  date: Date;
}

export interface BaseDatePickerProps {
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  /** Automatically disable all dates strictly after today */
  disableFutureDates?: boolean;
  /** Automatically disable all dates strictly before today */
  disablePastDates?: boolean;
  disabledDate?: (date: Date) => boolean;
  disabledDates?: Date[];
  disabledRanges?: [Date, Date][];
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  showWeekNumbers?: boolean;
  showOutsideDays?: boolean;
  numberOfMonths?: number;
  defaultViewDate?: Date;
  onMonthChange?: (month: Date) => void;
  renderDate?: (date: Date, info: RenderDateInfo) => ReactNode;
  locale?: string;
  dir?: 'ltr' | 'rtl' | 'auto';
  presets?: PresetItem[] | false;
  presetsPlacement?: 'left' | 'right' | 'top' | 'bottom' | 'auto';
  isMobile?: boolean;
  stackMonths?: boolean;
  minRangeLength?: number;
  maxRangeLength?: number;
  showTime?: boolean;
  timePlacement?: 'right' | 'bottom';
  timeFormat?: '12' | '24';
  minuteStep?: number;
  secondStep?: number;
  showSeconds?: boolean;
  disabledTime?: (date: Date) => DisabledTimeConfig;
  showActions?: boolean;
  allowClear?: boolean;
  onCancel?: () => void;
  onApply?: (value: unknown) => void;
  onClear?: () => void;

  /** When true, renders the full calendar panel directly inline. Default is true for standalone calendar view. When inline={false} (or placeholder/label is provided), renders the input trigger with popover calendar panel. */
  inline?: boolean;
  /** Placeholder text for input trigger */
  placeholder?: string;
  /** Sizing of the input trigger */
  size?: 'sm' | 'md' | 'lg';
  /** Label displayed above the input trigger */
  label?: string;
  /** Custom formatting string or callback for input display */
  format?: string | ((value: unknown) => string);
  /** Custom wrapper class name for trigger container */
  wrapperClassName?: string;
  /** Custom class name for trigger input box */
  inputClassName?: string;
  /** Portal target container for the popover panel (defaults to document.body) */
  portalTarget?: HTMLElement | null;
  /** Callback fired when popover opens */
  onOpen?: () => void;
  /** Callback fired when popover closes */
  onClose?: () => void;
}

export interface SingleDatePickerProps extends BaseDatePickerProps {
  mode?: 'single';
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
}

export interface RangeDatePickerProps extends BaseDatePickerProps {
  mode: 'range';
  value?: DateRange | null;
  defaultValue?: DateRange | null;
  onChange?: (range: DateRange | null) => void;
}

export interface MultipleDatePickerProps extends BaseDatePickerProps {
  mode: 'multiple';
  value?: Date[] | null;
  defaultValue?: Date[] | null;
  onChange?: (dates: Date[]) => void;
}

export interface MonthDatePickerProps extends BaseDatePickerProps {
  mode: 'month';
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
}

export interface YearDatePickerProps extends BaseDatePickerProps {
  mode: 'year';
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
}

export interface DateTimeDatePickerProps extends BaseDatePickerProps {
  mode: 'datetime';
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
}

export type DatePickerProps =
  | SingleDatePickerProps
  | RangeDatePickerProps
  | MultipleDatePickerProps
  | MonthDatePickerProps
  | YearDatePickerProps
  | DateTimeDatePickerProps;
