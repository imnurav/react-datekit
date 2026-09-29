/**
 * Pure, zero-dependency, leap-year and DST safe Date utilities.
 */

export function isValidDate(d: unknown): d is Date {
  return d instanceof Date && !isNaN(d.getTime());
}

export function cloneDate(d: Date): Date {
  return new Date(d.getTime());
}

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getDaysInMonth(year: number, monthIndex: number): number {
  // monthIndex: 0 = Jan, 11 = Dec
  // Setting day to 0 of the NEXT month gives the last day of the target month
  return new Date(year, monthIndex + 1, 0).getDate();
}

export function startOfDay(date: Date): Date {
  const d = cloneDate(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function endOfDay(date: Date): Date {
  const d = cloneDate(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

export function startOfWeek(date: Date, weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0): Date {
  const d = startOfDay(date);
  const day = d.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  d.setDate(d.getDate() - diff);
  return d;
}

export function endOfWeek(date: Date, weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0): Date {
  const s = startOfWeek(date, weekStartsOn);
  s.setDate(s.getDate() + 6);
  return endOfDay(s);
}

export function startOfMonth(date: Date): Date {
  const d = cloneDate(date);
  d.setDate(1);
  return startOfDay(d);
}

export function endOfMonth(date: Date): Date {
  const year = date.getFullYear();
  const month = date.getMonth();
  const lastDay = getDaysInMonth(year, month);
  const d = new Date(year, month, lastDay);
  return endOfDay(d);
}

export function startOfQuarter(date: Date): Date {
  const year = date.getFullYear();
  const quarterMonth = Math.floor(date.getMonth() / 3) * 3;
  return startOfDay(new Date(year, quarterMonth, 1));
}

export function endOfQuarter(date: Date): Date {
  const year = date.getFullYear();
  const quarterEndMonth = Math.floor(date.getMonth() / 3) * 3 + 2;
  const lastDay = getDaysInMonth(year, quarterEndMonth);
  return endOfDay(new Date(year, quarterEndMonth, lastDay));
}

export function startOfYear(date: Date): Date {
  return startOfDay(new Date(date.getFullYear(), 0, 1));
}

export function endOfYear(date: Date): Date {
  return endOfDay(new Date(date.getFullYear(), 11, 31));
}

export function addDays(date: Date, amount: number): Date {
  const d = cloneDate(date);
  d.setDate(d.getDate() + amount);
  return d;
}

export function subDays(date: Date, amount: number): Date {
  return addDays(date, -amount);
}

export function addMonths(date: Date, amount: number): Date {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const target = new Date(year, month + amount, 1);
  const daysInTarget = getDaysInMonth(target.getFullYear(), target.getMonth());
  target.setDate(Math.min(day, daysInTarget));
  target.setHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
  return target;
}

export function subMonths(date: Date, amount: number): Date {
  return addMonths(date, -amount);
}

export function addYears(date: Date, amount: number): Date {
  return addMonths(date, amount * 12);
}

export function subYears(date: Date, amount: number): Date {
  return addYears(date, -amount);
}

export function isSameDay(a: Date | null | undefined, b: Date | null | undefined): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isSameMonth(a: Date | null | undefined, b: Date | null | undefined): boolean {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export function isSameYear(a: Date | null | undefined, b: Date | null | undefined): boolean {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear();
}

export function isBeforeDay(a: Date, b: Date): boolean {
  const d1 = startOfDay(a).getTime();
  const d2 = startOfDay(b).getTime();
  return d1 < d2;
}

export function isAfterDay(a: Date, b: Date): boolean {
  const d1 = startOfDay(a).getTime();
  const d2 = startOfDay(b).getTime();
  return d1 > d2;
}

export function isWithinRange(date: Date, start: Date, end: Date): boolean {
  const time = startOfDay(date).getTime();
  const startTime = startOfDay(start).getTime();
  const endTime = startOfDay(end).getTime();
  const min = Math.min(startTime, endTime);
  const max = Math.max(startTime, endTime);
  return time >= min && time <= max;
}

export function differenceInCalendarDays(a: Date, b: Date): number {
  const startA = startOfDay(a).getTime();
  const startB = startOfDay(b).getTime();
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round(Math.abs(startA - startB) / msPerDay);
}

/**
 * Standard ISO 8601 week number (1-53).
 */
export function getISOWeekNumber(date: Date): number {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
}
