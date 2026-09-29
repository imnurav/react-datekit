<div align="center">
  <h1>React DateKit</h1>
  <p>The production-ready, framework-first date & time picker for the modern web.</p>
  <p>
    <a href="https://imnurav.github.io/react-datekit"><img src="https://img.shields.io/badge/Demo-Interactive%20Docs-2563eb.svg?style=flat-square" alt="Interactive Demo" /></a>
    <a href="https://www.npmjs.com/package/react-datekit"><img src="https://img.shields.io/npm/v/react-datekit.svg?style=flat-square&color=black" alt="npm version" /></a>
    <a href="https://bundlephobia.com/package/react-datekit"><img src="https://img.shields.io/bundlephobia/minzip/react-datekit?style=flat-square&color=black" alt="bundle size" /></a>
    <a href="https://github.com/imnurav/react-datekit/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/react-datekit.svg?style=flat-square&color=black" alt="license" /></a>
  </p>
  <p>
    <a href="https://imnurav.github.io/react-datekit"><strong>Explore the Live Interactive Documentation &rarr;</strong></a>
  </p>
</div>

---

## Highlights

- **Zero Runtime Dependencies**: Written entirely with native JavaScript `Date` and cached `Intl` APIs. No Moment.js or date-fns bundle overhead.
- **Unified Architecture**: A single `<DatePicker />` component handles all modes: trigger popover input (Ant Design standard) and inline calendar views for single date, multi-month range, multiple dates, datetime, month, and year selection.
- **Smart Popover & Inline Modes**: Automatically functions as a smart input trigger with outside-click dismissal, <kbd>Escape</kbd> handling, edge-aware viewport flip, and roving keyboard focus — or embedded inline via `inline={true}`.
- **Integrated Time Selector**: Scrollable hour, minute (0–59), and second (0–59) columns, 12h/24h toggle with AM/PM pill, and side or bottom placement.
- **15+ Quick Presets**: Built-in date ranges (`today`, `last7Days`, `thisMonth`, etc.) with dynamic date generators, swipeable horizontal scroll bar, and custom preset support.
- **Mobile & Touch First**: Automatic fluid column stacking, swipeable chip bars, and >= 44px tap targets.
- **W3C WAI-ARIA Accessible**: Complete roving `tabIndex` keyboard navigation, full screen reader announcements, and reduced motion queries.
- **CSS Variables Theming**: Fully styled with `--rdk-*` design tokens; Dark Mode & RTL layouts built-in.

---

## Installation

```bash
# pnpm
pnpm add react-datekit

# npm
npm install react-datekit

# yarn
yarn add react-datekit

# bun
bun add react-datekit
```

Import the bundled CSS stylesheet once in your application root or layout:

```tsx
import 'react-datekit/style.css';
```

---

## Quick Start

### Single Date Picker

```tsx
import { useState } from 'react';
import { DatePicker } from 'react-datekit';
import 'react-datekit/style.css';

export function SingleExample() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      mode="single"
      value={date}
      onChange={setDate}
    />
  );
}
```

### Date Range with Presets

```tsx
import { useState } from 'react';
import { DatePicker, DateRange } from 'react-datekit';
import 'react-datekit/style.css';

export function RangeExample() {
  const [range, setRange] = useState<DateRange | null>(null);

  return (
    <DatePicker
      mode="range"
      value={range}
      onChange={setRange}
      numberOfMonths={2}
      presets={['today', 'thisWeek', 'last7Days', 'thisMonth', 'last30Days']}
    />
  );
}
```

### Popover Input Trigger (Default)

```tsx
import { useState } from 'react';
import { DatePicker } from 'react-datekit';
import 'react-datekit/style.css';

export function PopoverExample() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker
      label="Departure Date"
      placeholder="Select departure..."
      value={date}
      onChange={setDate}
      allowClear
    />
  );
}
```

### Inline Calendar View

```tsx
import { useState } from 'react';
import { DatePicker } from 'react-datekit';
import 'react-datekit/style.css';

export function InlineCalendarExample() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      inline
      mode="single"
      value={date}
      onChange={setDate}
      disableFutureDates
    />
  );
}
```

### Date & Time Selection

```tsx
import { useState } from 'react';
import { DatePicker } from 'react-datekit';
import 'react-datekit/style.css';

export function DateTimeExample() {
  const [dateTime, setDateTime] = useState<Date | null>(new Date());

  return (
    <DatePicker
      mode="datetime"
      label="Meeting Time"
      placeholder="Select date and time…"
      showTime
      timeFormat="12"
      showSeconds
      value={dateTime}
      onChange={setDateTime}
    />
  );
}
```

---

## Architecture

```text
┌─────────────────────────────────────────────────────────┐
│                    Your Application                     │
├─────────────────────────────────────────────────────────┤
│                     react-datekit                       │
│  ┌───────────────────────────────────────────────────┐  │
│  │                   <DatePicker />                  │  │
│  │       • Trigger Popover Mode (Default / Antd)     │  │
│  │       • Inline Calendar View (inline={true})      │  │
│  └─────────────────────────┬─────────────────────────┘  │
│                            │                            │
│  ┌─────────────────────────▼─────────────────────────┐  │
│  │   Headless State Hooks:                           │  │
│  │   • useCalendarState                              │  │
│  │   • useCalendarSelection                          │  │
│  │   • useCalendarKeyboard                           │  │
│  │   • useResponsive                                 │  │
│  │   • usePopoverPosition                            │  │
│  │   • useClickOutside                               │  │
│  └─────────────────────────┬─────────────────────────┘  │
├────────────────────────────┴────────────────────────────┤
│         Modular CSS Tokens & Stylesheets (--rdk-*)      │
├─────────────────────────────────────────────────────────┤
│            Pure Native Date & Intl Utilities            │
└─────────────────────────────────────────────────────────┘
```

---

## Next.js (App Router)

React DateKit is an interactive component. In Next.js App Router, declare `'use client'` at the top of your component or page:

```tsx
'use client';

import { useState } from 'react';
import { DatePicker, DateRange } from 'react-datekit';
import 'react-datekit/style.css';

export default function BookingPage() {
  const [range, setRange] = useState<DateRange | null>(null);

  return (
    <main className="p-8 max-w-xl mx-auto">
      <DatePicker
        mode="range"
        label="Select Stay Dates"
        placeholder="Choose your stay…"
        value={range}
        onChange={setRange}
        presets={['today', 'thisWeek', 'last7Days', 'last30Days']}
      />
    </main>
  );
}
```

---

## Theming with CSS Variables

Customize any visual property by targeting `--rdk-*` CSS custom properties:

```css
:root {
  --rdk-primary: #18181b;
  --rdk-primary-hover: #27272a;
  --rdk-primary-text: #ffffff;
  --rdk-background: #ffffff;
  --rdk-surface: #ffffff;
  --rdk-surface-alt: #fafafa;
  --rdk-text: #09090b;
  --rdk-text-secondary: #71717a;
  --rdk-border: #e4e4e7;
  --rdk-range: #f4f4f5;
  --rdk-range-hover: #e4e4e7;
  --rdk-range-text: #18181b;
  --rdk-radius: 12px;
  --rdk-cell-size: 40px;
}

[data-theme="dark"] {
  --rdk-primary: #fafafa;
  --rdk-primary-hover: #f4f4f5;
  --rdk-primary-text: #09090b;
  --rdk-background: #09090b;
  --rdk-surface: #18181b;
  --rdk-surface-alt: #121215;
  --rdk-text: #fafafa;
  --rdk-text-secondary: #a1a1aa;
  --rdk-border: #27272a;
  --rdk-range: #27272a;
  --rdk-range-text: #fafafa;
}
```

---

## API Reference

### `<DatePicker />`

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `mode` | `'single' \| 'range' \| 'multiple' \| 'month' \| 'year' \| 'datetime'` | `'single'` | Selection mode |
| `value` | `Date \| DateRange \| Date[] \| null` | `undefined` | Controlled value |
| `defaultValue` | `Date \| DateRange \| Date[] \| null` | `undefined` | Initial uncontrolled value |
| `onChange` | `(val: any) => void` | `undefined` | Selection change callback |
| `inline` | `boolean` | `auto` | Set `true` to embed calendar directly inline; defaults to trigger popover when input props (`placeholder`, `label`) are provided |
| `placeholder` | `string` | `'Select date…'` | Placeholder text for input trigger |
| `label` | `string` | `undefined` | Label displayed above the input trigger |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height & typography sizing of input trigger |
| `allowClear` | `boolean` | `true` | Shows quick clear (×) button on hover in trigger mode |
| `format` | `string \| ((val: any) => string)` | `Intl formatted` | Custom display text formatting string or callback |
| `presets` | `PresetItem[] \| boolean` | `undefined` | Built-in preset keys or custom preset objects |
| `presetsPlacement` | `'left' \| 'right' \| 'top' \| 'bottom' \| 'auto'` | `'auto'` | Presets docking placement |
| `numberOfMonths` | `number` | `1` (`2` in range) | Number of rendered months |
| `stackMonths` | `boolean` | `auto` | Forces side-by-side months to stack vertically |
| `minDate` / `maxDate` | `Date` | `undefined` | Selectable calendar limits |
| `disableFutureDates` | `boolean` | `false` | Disables all calendar days strictly after today |
| `disablePastDates` | `boolean` | `false` | Disables all calendar days strictly before today |
| `disabledDate` | `(date: Date) => boolean` | `undefined` | Function returning true for disabled dates |
| `showTime` | `boolean` | `false` | Enables time selector column |
| `timeFormat` | `'12' \| '24'` | `'24'` | 12h (with AM/PM) or 24h format |
| `minuteStep` / `secondStep` | `number` | `1` | Minute and second scroll steps |
| `showSeconds` | `boolean` | `false` | Displays seconds (0–59) column |
| `weekStartsOn` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | `0` | Week start day (0 = Sunday, 1 = Monday) |
| `showWeekNumbers` | `boolean` | `false` | Displays ISO week numbers |
| `showActions` | `boolean` | `false` | Staged footer with Apply & Cancel buttons |
| `locale` | `string` | `'en-US'` | BCP 47 locale for Intl formatting |
| `dir` | `'ltr' \| 'rtl' \| 'auto'` | `'ltr'` | Layout directionality |
| `disabled` | `boolean` | `false` | Disables all interactions |

---

## License

MIT &copy; [Nurav](https://github.com/imnurav)
