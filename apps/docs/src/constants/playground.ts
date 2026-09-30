export const PLAYGROUND_MODES = [
  "single",
  "range",
  "datetime",
  "multiple",
] as const;
export type PlaygroundMode = (typeof PLAYGROUND_MODES)[number];

export const PLAYGROUND_MONTHS = [1, 2] as const;
export type PlaygroundMonthCount = (typeof PLAYGROUND_MONTHS)[number];

export const PLAYGROUND_PRESET_PLACEMENTS = [
  "none",
  "left",
  "top",
  "bottom",
] as const;
export type PlaygroundPresetPlacement =
  (typeof PLAYGROUND_PRESET_PLACEMENTS)[number];

export const PLAYGROUND_DEFAULT_PRESETS = [
  "today",
  "yesterday",
  "thisWeek",
  "thisMonth",
  "last7Days",
  "last30Days",
] as const;

export const PLAYGROUND_LOCALES = [
  { value: "en-US", label: "US (en-US)" },
  { value: "en-GB", label: "UK (en-GB)" },
  { value: "de-DE", label: "DE (de-DE)" },
  { value: "fr-FR", label: "FR (fr-FR)" },
  { value: "ja-JP", label: "JA (ja-JP)" },
] as const;

export type PlaygroundLocale = (typeof PLAYGROUND_LOCALES)[number]["value"];

export interface PlaygroundConfig {
  mode: PlaygroundMode;
  months: PlaygroundMonthCount;
  stackMonths: "auto" | "side-by-side" | "stacked";
  presetsPlacement: PlaygroundPresetPlacement;
  timePlacement: "right" | "bottom";
  timeFormat: "12" | "24";
  showSeconds: boolean;
  minuteStep: number;
  inline: boolean;
  size: "sm" | "md" | "lg";
  allowClear: boolean;
  disabled: boolean;
  disableWeekends: boolean;
  disableFutureDates: boolean;
  disablePastDates: boolean;
  showActions: boolean;
  showWeekNumbers: boolean;
  weekStartsOn: 0 | 1;
  dir: "ltr" | "rtl";
  locale: PlaygroundLocale;
}

export function generatePlaygroundCode(config: PlaygroundConfig): string {
  const {
    mode,
    months,
    stackMonths,
    presetsPlacement,
    timePlacement,
    timeFormat,
    showSeconds,
    minuteStep,
    inline,
    size,
    allowClear,
    disabled,
    disableWeekends,
    disableFutureDates,
    disablePastDates,
    showActions,
    showWeekNumbers,
    weekStartsOn,
    dir,
    locale,
  } = config;

  const imports = ["DatePicker", ...(mode === "range" ? ["DateRange"] : [])];
  const importStr = `import React, { useState } from 'react';\nimport { ${imports.join(", ")} } from 'react-datekit';\nimport 'react-datekit/style.css';\n`;

  const stateMap: Record<PlaygroundMode, string> = {
    single: `const [date, setDate] = useState<Date | null>(new Date());`,
    range: `const [range, setRange] = useState<DateRange | null>(null);`,
    datetime: `const [dateTime, setDateTime] = useState<Date | null>(new Date());`,
    multiple: `const [dates, setDates] = useState<Date[]>([]);`,
  };

  const propsList: string[] = [`mode="${mode}"`];
  if (mode === "single") propsList.push(`value={date}`, `onChange={setDate}`);
  else if (mode === "range")
    propsList.push(`value={range}`, `onChange={setRange}`);
  else if (mode === "datetime")
    propsList.push(`value={dateTime}`, `onChange={setDateTime}`, `showTime`);
  else propsList.push(`value={dates}`, `onChange={setDates}`);

  if (months > 1) propsList.push(`numberOfMonths={${months}}`);
  if (stackMonths === "stacked") propsList.push(`stackMonths={true}`);
  if (stackMonths === "side-by-side") propsList.push(`stackMonths={false}`);

  if (presetsPlacement !== "none") {
    propsList.push(
      `presets={['today', 'yesterday', 'thisWeek', 'thisMonth', 'last7Days', 'last30Days']}`,
      `presetsPlacement="${presetsPlacement}"`,
    );
  }

  if (mode === "datetime") {
    if (timePlacement !== "right")
      propsList.push(`timePlacement="${timePlacement}"`);
    if (timeFormat !== "24") propsList.push(`timeFormat="${timeFormat}"`);
    if (showSeconds) propsList.push(`showSeconds`);
    if (minuteStep > 1) propsList.push(`minuteStep={${minuteStep}}`);
  }

  if (inline) {
    propsList.push(`inline`);
  } else {
    propsList.push(`placeholder="Choose ${mode}..."`);
    propsList.push(`label="Select Date"`);
    if (size !== "md") propsList.push(`size="${size}"`);
    if (!allowClear) propsList.push(`allowClear={false}`);
  }

  if (disabled) propsList.push(`disabled`);
  if (disableWeekends)
    propsList.push(
      `disabledDate={(d) => d.getDay() === 0 || d.getDay() === 6}`,
    );
  if (disableFutureDates) propsList.push(`disableFutureDates`);
  if (disablePastDates) propsList.push(`disablePastDates`);
  if (showActions) propsList.push(`showActions`);
  if (showWeekNumbers) propsList.push(`showWeekNumbers`);
  if (weekStartsOn !== 0) propsList.push(`weekStartsOn={${weekStartsOn}}`);
  if (dir !== "ltr") propsList.push(`dir="${dir}"`);
  if (locale !== "en-US") propsList.push(`locale="${locale}"`);

  const propsFormatted = propsList.map((p) => `      ${p}`).join("\n");
  return `${importStr}\nexport default function CustomDatePicker() {\n  ${stateMap[mode]}\n\n  return (\n    <DatePicker\n${propsFormatted}\n    />\n  );\n}`;
}
