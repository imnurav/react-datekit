import type { DateRange } from './datepicker';

export type PresetKey =
  | 'today'
  | 'yesterday'
  | 'tomorrow'
  | 'thisWeek'
  | 'lastWeek'
  | 'nextWeek'
  | 'thisMonth'
  | 'lastMonth'
  | 'nextMonth'
  | 'thisQuarter'
  | 'lastQuarter'
  | 'nextQuarter'
  | 'thisYear'
  | 'lastYear'
  | 'nextYear'
  | 'last7Days'
  | 'last30Days'
  | 'last90Days';

export interface CustomPreset {
  label: string;
  value: () => Date | DateRange;
  key?: string;
}

export type PresetItem = PresetKey | CustomPreset;

export interface EvaluatedPreset {
  key: string;
  label: string;
  getValue: () => DateRange | Date;
}
