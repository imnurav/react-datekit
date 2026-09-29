import { describe, it, expect } from 'vitest';
import {
  isLeapYear,
  getDaysInMonth,
  startOfWeek,
  endOfWeek,
  startOfQuarter,
  endOfQuarter,
  addMonths,
  addYears,
  getISOWeekNumber,
  isSameDay,
} from '../utils/dateUtils';

describe('dateUtils', () => {
  it('identifies leap years accurately', () => {
    expect(isLeapYear(2024)).toBe(true);
    expect(isLeapYear(2026)).toBe(false);
    expect(isLeapYear(2000)).toBe(true);
    expect(isLeapYear(1900)).toBe(false);
  });

  it('calculates days in month correctly including February leap years', () => {
    // 2024 is leap year: Feb has 29 days
    expect(getDaysInMonth(2024, 1)).toBe(29);
    // 2026 is common year: Feb has 28 days
    expect(getDaysInMonth(2026, 1)).toBe(28);
    // Jan has 31 days
    expect(getDaysInMonth(2026, 0)).toBe(31);
    // Apr has 30 days
    expect(getDaysInMonth(2026, 3)).toBe(30);
  });

  it('clamps month overflow when adding months on month boundary', () => {
    // Jan 31 + 1 month in 2024 (leap year) -> Feb 29
    const jan31 = new Date(2024, 0, 31);
    const febResult = addMonths(jan31, 1);
    expect(febResult.getMonth()).toBe(1);
    expect(febResult.getDate()).toBe(29);

    // Jan 31 + 1 month in 2026 (non-leap year) -> Feb 28
    const jan31Common = new Date(2026, 0, 31);
    const febResultCommon = addMonths(jan31Common, 1);
    expect(febResultCommon.getMonth()).toBe(1);
    expect(febResultCommon.getDate()).toBe(28);
  });

  it('clamps leap day Feb 29 when adding years', () => {
    const leapDay = new Date(2024, 1, 29);
    const nextYear = addYears(leapDay, 1);
    expect(nextYear.getFullYear()).toBe(2025);
    expect(nextYear.getMonth()).toBe(1);
    expect(nextYear.getDate()).toBe(28);
  });

  it('calculates quarters accurately', () => {
    // Q1 (Jan-Mar)
    const q1Date = new Date(2026, 1, 15);
    const startQ1 = startOfQuarter(q1Date);
    const endQ1 = endOfQuarter(q1Date);
    expect(startQ1.getMonth()).toBe(0);
    expect(startQ1.getDate()).toBe(1);
    expect(endQ1.getMonth()).toBe(2);
    expect(endQ1.getDate()).toBe(31);

    // Q3 (Jul-Sep)
    const q3Date = new Date(2026, 8, 29);
    const startQ3 = startOfQuarter(q3Date);
    const endQ3 = endOfQuarter(q3Date);
    expect(startQ3.getMonth()).toBe(6);
    expect(startQ3.getDate()).toBe(1);
    expect(endQ3.getMonth()).toBe(8);
    expect(endQ3.getDate()).toBe(30);
  });

  it('calculates start and end of week with configurable weekStartsOn', () => {
    // 2026-09-29 is a Tuesday
    const tuesday = new Date(2026, 8, 29);
    // Sunday start (0)
    const startSun = startOfWeek(tuesday, 0);
    expect(startSun.getDay()).toBe(0); // Sunday Sep 27
    expect(startSun.getDate()).toBe(27);

    const endSun = endOfWeek(tuesday, 0);
    expect(endSun.getDay()).toBe(6); // Saturday Oct 3
    expect(endSun.getDate()).toBe(3);

    // Monday start (1 - ISO)
    const startMon = startOfWeek(tuesday, 1);
    expect(startMon.getDay()).toBe(1); // Monday Sep 28
    expect(startMon.getDate()).toBe(28);
  });

  it('computes ISO week numbers', () => {
    const date = new Date(2026, 0, 4); // Jan 4, 2026
    expect(getISOWeekNumber(date)).toBeGreaterThanOrEqual(1);
  });

  it('compares dates accurately with isSameDay', () => {
    const d1 = new Date(2026, 8, 29, 10, 30);
    const d2 = new Date(2026, 8, 29, 18, 45);
    const d3 = new Date(2026, 8, 30, 10, 30);
    expect(isSameDay(d1, d2)).toBe(true);
    expect(isSameDay(d1, d3)).toBe(false);
  });
});
