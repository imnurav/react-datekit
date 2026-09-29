import { DatePicker } from "react-datekit";
import React, { useState } from "react";
import { DemoCard } from "./DemoCard";

export const ConstraintsDemosSection: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date(2026, 8, 15));
  const [minMaxDate, setMinMaxDate] = useState<Date | null>(
    new Date(2026, 8, 15),
  );

  // Disable weekends
  const isWeekendDisabled = (d: Date) => {
    const day = d.getDay();
    return day === 0 || day === 6; // Sunday or Saturday
  };

  const minDate = new Date(2026, 8, 5);
  const maxDate = new Date(2026, 8, 25);

  const disabledCode = `import React, { useState } from 'react';
import { DatePicker } from 'react-datekit';
import 'react-datekit/style.css';

export default function DisabledDatesDemo() {
  const [date, setDate] = useState<Date | null>(new Date(2026, 8, 15));

  // Disable weekends
  const isWeekend = (d: Date) => {
    const day = d.getDay();
    return day === 0 || day === 6;
  };

  return (
    <DatePicker
      mode="single"
      value={date}
      onChange={setDate}
      disabledDate={isWeekend}
      defaultViewDate={new Date(2026, 8, 1)}
    />
  );
}`;

  const minMaxCode = `import React, { useState } from 'react';
import { DatePicker } from 'react-datekit';
import 'react-datekit/style.css';

export default function MinMaxBoundsDemo() {
  const [date, setDate] = useState<Date | null>(new Date(2026, 8, 15));

  return (
    <DatePicker
      mode="single"
      value={date}
      onChange={setDate}
      minDate={new Date(2026, 8, 5)}
      maxDate={new Date(2026, 8, 25)}
      defaultViewDate={new Date(2026, 8, 1)}
    />
  );
}`;

  const futureDisabledCode = `import React, { useState } from 'react';
import { DatePicker } from 'react-datekit';
import 'react-datekit/style.css';

export default function DisableFutureDemo() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      mode="single"
      value={date}
      onChange={setDate}
      disableFutureDates
    />
  );
}`;

  return (
    <div className="space-y-12">
      {/* 1. Disabled Dates */}
      <DemoCard
        id="disabled-dates"
        title="Disabled Dates"
        description="Prevent selection of non-working days, past dates, or specific custom holidays via a clean predicate function."
        code={disabledCode}
        note="Try clicking on any Saturday or Sunday—they are non-interactive with disabled styling."
      >
        <DatePicker
          mode="single"
          value={date}
          onChange={setDate}
          disabledDate={isWeekendDisabled}
          defaultViewDate={new Date(2026, 8, 1)}
        />
      </DemoCard>

      {/* 2. Disable Future Dates */}
      <DemoCard
        id="disable-future"
        title="Disable Future Dates"
        badge="Popular"
        description="Disable all calendar days after today with a single boolean prop. Essential for birthdays, historical logs, and analytics."
        code={futureDisabledCode}
        note="All days strictly after today are automatically disabled."
      >
        <DatePicker
          mode="single"
          disableFutureDates
        />
      </DemoCard>

      {/* 3. Min / Max Date Bounds */}
      <DemoCard
        id="min-max"
        title="Min & Max Date Constraints"
        description="Constrain user selection strictly between minimum and maximum calendar dates (Sep 5, 2026 &mdash; Sep 25, 2026)."
        code={minMaxCode}
      >
        <DatePicker
          mode="single"
          value={minMaxDate}
          onChange={setMinMaxDate}
          minDate={minDate}
          maxDate={maxDate}
          defaultViewDate={new Date(2026, 8, 1)}
        />
      </DemoCard>
    </div>
  );
};
