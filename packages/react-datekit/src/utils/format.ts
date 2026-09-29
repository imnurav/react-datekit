/**
 * Formatting helpers using native Intl.DateTimeFormat with instance caching.
 */

const formatterCache = new Map<string, Intl.DateTimeFormat>();

function getFormatter(key: string, create: () => Intl.DateTimeFormat): Intl.DateTimeFormat {
  let f = formatterCache.get(key);
  if (!f) {
    try {
      f = create();
    } catch {
      // Fallback to default en-US if locale is invalid
      f = new Intl.DateTimeFormat('en-US');
    }
    formatterCache.set(key, f);
  }
  return f;
}

export function formatMonthYear(date: Date, locale: string = 'en-US'): string {
  const f = getFormatter(`my_${locale}`, () =>
    new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' })
  );
  return f.format(date);
}

export function formatMonthName(monthIndex: number, format: 'long' | 'short' = 'long', locale: string = 'en-US'): string {
  const d = new Date(2026, monthIndex, 15);
  const f = getFormatter(`mn_${format}_${locale}`, () =>
    new Intl.DateTimeFormat(locale, { month: format })
  );
  return f.format(d);
}

export function getWeekdayNames(
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0,
  format: 'short' | 'narrow' | 'long' = 'short',
  locale: string = 'en-US'
): { dayIndex: number; label: string; fullLabel: string }[] {
  const list: { dayIndex: number; label: string; fullLabel: string }[] = [];
  const baseSunday = new Date(2026, 8, 27); // 2026-09-27 is a Sunday

  const shortFormatter = getFormatter(`wd_${format}_${locale}`, () =>
    new Intl.DateTimeFormat(locale, { weekday: format })
  );
  const longFormatter = getFormatter(`wd_long_${locale}`, () =>
    new Intl.DateTimeFormat(locale, { weekday: 'long' })
  );

  for (let i = 0; i < 7; i++) {
    const dayIndex = (weekStartsOn + i) % 7;
    const date = new Date(baseSunday);
    date.setDate(baseSunday.getDate() + dayIndex);

    list.push({
      dayIndex,
      label: shortFormatter.format(date),
      fullLabel: longFormatter.format(date),
    });
  }

  return list;
}

export function formatFullDate(date: Date, locale: string = 'en-US'): string {
  const f = getFormatter(`full_${locale}`, () =>
    new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  );
  return f.format(date);
}

export function formatTime(
  date: Date,
  timeFormat: '12' | '24' = '24',
  showSeconds: boolean = false,
  locale: string = 'en-US'
): string {
  const hour12 = timeFormat === '12';
  const f = getFormatter(`time_${timeFormat}_${showSeconds}_${locale}`, () =>
    new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
      second: showSeconds ? '2-digit' : undefined,
      hour12,
    })
  );
  return f.format(date);
}

export function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

export function formatDisplayValue(
  value: Date | [Date | null, Date | null] | Date[] | null | undefined,
  mode: string,
  timeFormat: "12" | "24",
  showTime: boolean,
  showSeconds: boolean,
  locale: string,
  customFormat?: string | ((val: unknown) => string)
): string {
  if (!value) return "";

  if (typeof customFormat === "function") {
    return customFormat(value);
  }

  const dateLocaleOpts: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  if ((mode === "single" || mode === "datetime") && value instanceof Date) {
    let str = value.toLocaleDateString(locale, dateLocaleOpts);
    if (showTime || mode === "datetime") {
      str += "  " + formatTime(value, timeFormat, showSeconds, locale);
    }
    return str;
  }

  if (mode === "range" && Array.isArray(value)) {
    const [start, end] = value as [Date | null, Date | null];
    if (start && end) {
      return `${start.toLocaleDateString(locale, dateLocaleOpts)} → ${end.toLocaleDateString(locale, dateLocaleOpts)}`;
    }
    if (start) {
      return `${start.toLocaleDateString(locale, dateLocaleOpts)} → …`;
    }
    return "";
  }

  if (mode === "multiple" && Array.isArray(value)) {
    const dates = value as Date[];
    if (dates.length === 0) return "";
    if (dates.length === 1)
      return dates[0].toLocaleDateString(locale, dateLocaleOpts);
    return `${dates.length} dates selected`;
  }

  return "";
}

export function hasDisplayValue(
  value: Date | [Date | null, Date | null] | Date[] | null | undefined,
  mode: string
): boolean {
  if (!value) return false;
  if (value instanceof Date) return true;
  if (Array.isArray(value)) {
    if (mode === "range") return Boolean((value as [Date | null, Date | null])[0]);
    return (value as Date[]).length > 0;
  }
  return false;
}

