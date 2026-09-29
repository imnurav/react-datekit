import type { RenderDateInfo } from '../types';
import { formatFullDate } from './format';

export function getCellAriaLabel(date: Date, info: RenderDateInfo, locale: string = 'en-US'): string {
  const fullDateStr = formatFullDate(date, locale);
  const parts: string[] = [fullDateStr];

  if (info.isToday) {
    parts.push('Today');
  }

  if (info.isRangeStart && info.isRangeEnd) {
    parts.push('Selected range start and end');
  } else if (info.isRangeStart) {
    parts.push('Start of selected range');
  } else if (info.isRangeEnd) {
    parts.push('End of selected range');
  } else if (info.isInRange) {
    parts.push('In selected range');
  } else if (info.isSelected) {
    parts.push('Selected');
  }

  if (info.isDisabled) {
    parts.push('Disabled');
  }

  return parts.join(', ');
}
