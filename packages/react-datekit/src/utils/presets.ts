import type { PresetKey, PresetItem, DateRange, CustomPreset, EvaluatedPreset } from '../types';
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  endOfYear,
  addDays,
  subDays,
  addMonths,
  subMonths,
  addYears,
  subYears,
  isSameDay,
} from './dateUtils';

export const PRESET_LABELS: Record<PresetKey, string> = {
  today: 'Today',
  yesterday: 'Yesterday',
  tomorrow: 'Tomorrow',
  thisWeek: 'This Week',
  lastWeek: 'Last Week',
  nextWeek: 'Next Week',
  thisMonth: 'This Month',
  lastMonth: 'Last Month',
  nextMonth: 'Next Month',
  thisQuarter: 'This Quarter',
  lastQuarter: 'Last Quarter',
  nextQuarter: 'Next Quarter',
  thisYear: 'This Year',
  lastYear: 'Last Year',
  nextYear: 'Next Year',
  last7Days: 'Last 7 Days',
  last30Days: 'Last 30 Days',
  last90Days: 'Last 90 Days',
};

export function calculateBuiltInPreset(
  key: PresetKey,
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0,
  referenceDate: Date = new Date()
): DateRange {
  const now = referenceDate;

  switch (key) {
    case 'today':
      return [startOfDay(now), endOfDay(now)];
    case 'yesterday': {
      const y = subDays(now, 1);
      return [startOfDay(y), endOfDay(y)];
    }
    case 'tomorrow': {
      const t = addDays(now, 1);
      return [startOfDay(t), endOfDay(t)];
    }
    case 'thisWeek':
      return [startOfWeek(now, weekStartsOn), endOfWeek(now, weekStartsOn)];
    case 'lastWeek': {
      const lw = subDays(now, 7);
      return [startOfWeek(lw, weekStartsOn), endOfWeek(lw, weekStartsOn)];
    }
    case 'nextWeek': {
      const nw = addDays(now, 7);
      return [startOfWeek(nw, weekStartsOn), endOfWeek(nw, weekStartsOn)];
    }
    case 'thisMonth':
      return [startOfMonth(now), endOfMonth(now)];
    case 'lastMonth': {
      const lm = subMonths(now, 1);
      return [startOfMonth(lm), endOfMonth(lm)];
    }
    case 'nextMonth': {
      const nm = addMonths(now, 1);
      return [startOfMonth(nm), endOfMonth(nm)];
    }
    case 'thisQuarter':
      return [startOfQuarter(now), endOfQuarter(now)];
    case 'lastQuarter': {
      const lq = subMonths(now, 3);
      return [startOfQuarter(lq), endOfQuarter(lq)];
    }
    case 'nextQuarter': {
      const nq = addMonths(now, 3);
      return [startOfQuarter(nq), endOfQuarter(nq)];
    }
    case 'thisYear':
      return [startOfYear(now), endOfYear(now)];
    case 'lastYear': {
      const ly = subYears(now, 1);
      return [startOfYear(ly), endOfYear(ly)];
    }
    case 'nextYear': {
      const ny = addYears(now, 1);
      return [startOfYear(ny), endOfYear(ny)];
    }
    case 'last7Days':
      return [startOfDay(subDays(now, 6)), endOfDay(now)];
    case 'last30Days':
      return [startOfDay(subDays(now, 29)), endOfDay(now)];
    case 'last90Days':
      return [startOfDay(subDays(now, 89)), endOfDay(now)];
    default:
      return [startOfDay(now), endOfDay(now)];
  }
}

export function normalizePresets(
  presets?: PresetItem[],
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0
): EvaluatedPreset[] {
  if (!presets || presets.length === 0) return [];

  return presets.map((item, index) => {
    if (typeof item === 'string') {
      const key = item as PresetKey;
      return {
        key,
        label: PRESET_LABELS[key] ?? key,
        getValue: () => calculateBuiltInPreset(key, weekStartsOn),
      };
    }
    const custom = item as CustomPreset;
    return {
      key: custom.key || `custom-preset-${index}`,
      label: custom.label,
      getValue: custom.value,
    };
  });
}

export function isPresetActive(
  presetRange: DateRange | Date,
  currentRange: DateRange | Date | null | undefined
): boolean {
  if (!currentRange || !presetRange) return false;

  if (Array.isArray(presetRange)) {
    if (!Array.isArray(currentRange)) return false;
    const [pStart, pEnd] = presetRange;
    const [cStart, cEnd] = currentRange;
    return isSameDay(pStart, cStart) && isSameDay(pEnd, cEnd);
  } else if (!Array.isArray(currentRange)) {
    return isSameDay(presetRange, currentRange);
  }
  return false;
}
