import { padZero } from "../utils/format";
import { Clock } from "./Icons";
import { memo, useCallback, useEffect, useRef } from "react";
import type { TimeSelectorProps } from "../types/internal";

/* ── Scroll a time cell into view ──────────────────────────────── */

function scrollSelectedIntoView(scrollEl: HTMLDivElement | null) {
  if (!scrollEl) return;
  const selected = scrollEl.querySelector<HTMLElement>(".rdk-time-cell--selected");
  if (selected && typeof selected.scrollIntoView === "function") {
    selected.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
}

/* ── Single scrollable column ──────────────────────────────────── */

interface TimeColProps {
  title: string;
  items: number[];
  selectedIndex: number;
  disabledSet: Set<number>;
  displayFn?: (n: number) => string;
  onSelect: (n: number) => void;
}

const TimeCol = memo<TimeColProps>(({ title, items, selectedIndex, disabledSet, displayFn, onSelect }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll selected item into view on mount and selection change
  useEffect(() => {
    scrollSelectedIntoView(scrollRef.current);
  }, [selectedIndex]);

  return (
    <div className="rdk-time-col" role="listbox" aria-label={title}>
      <div className="rdk-time-col-title">{title}</div>
      <div className="rdk-time-col-scroll" ref={scrollRef}>
        {items.map((n) => {
          const isSelected = n === selectedIndex;
          const isDisabled = disabledSet.has(n);
          return (
            <button
              key={n}
              type="button"
              disabled={isDisabled}
              className={`rdk-time-cell ${isSelected ? "rdk-time-cell--selected" : ""}`}
              onClick={() => onSelect(n)}
              aria-selected={isSelected}
              aria-label={`${title}: ${displayFn ? displayFn(n) : padZero(n)}`}
            >
              {displayFn ? displayFn(n) : padZero(n)}
            </button>
          );
        })}
      </div>
    </div>
  );
});

TimeCol.displayName = "TimeCol";

/* ── TimeSelector ──────────────────────────────────────────────── */

export const TimeSelector = memo<TimeSelectorProps>(({
  time,
  onChange,
  timeFormat = "24",
  minuteStep = 1,
  secondStep = 1,
  showSeconds = false,
  disabledTime,
  referenceDate = new Date(),
  placement = "right",
}) => {
  const is12Hour = timeFormat === "12";
  const isPM = is12Hour && time.hours >= 12;

  const config = disabledTime ? disabledTime(referenceDate) : {};
  const disabledHoursSet = new Set(config.disabledHours ? config.disabledHours() : []);
  const disabledMinutesSet = new Set(config.disabledMinutes ? config.disabledMinutes(time.hours) : []);
  const disabledSecondsSet = new Set(config.disabledSeconds ? config.disabledSeconds(time.hours, time.minutes) : []);

  // Hours list
  const hoursList = Array.from({ length: is12Hour ? 12 : 24 }, (_, i) =>
    is12Hour ? i + 1 : i,
  );

  // Minutes list (always 0-59 by step)
  const minutesList: number[] = [];
  for (let m = 0; m < 60; m += minuteStep) minutesList.push(m);

  // Seconds list
  const secondsList: number[] = [];
  if (showSeconds) {
    for (let s = 0; s < 60; s += secondStep) secondsList.push(s);
  }

  const displayHour = is12Hour
    ? time.hours % 12 === 0
      ? 12
      : time.hours % 12
    : time.hours;

  const handleHourSelect = useCallback((h: number) => {
    let actualHour = h;
    if (is12Hour) {
      if (isPM) actualHour = h === 12 ? 12 : h + 12;
      else actualHour = h === 12 ? 0 : h;
    }
    onChange({ ...time, hours: actualHour });
  }, [is12Hour, isPM, time, onChange]);

  const handleMinuteSelect = useCallback((m: number) => {
    onChange({ ...time, minutes: m });
  }, [time, onChange]);

  const handleSecondSelect = useCallback((s: number) => {
    onChange({ ...time, seconds: s });
  }, [time, onChange]);

  const toggleAmPm = useCallback((targetPM: boolean) => {
    let newHours = time.hours;
    if (targetPM && newHours < 12) newHours += 12;
    else if (!targetPM && newHours >= 12) newHours -= 12;
    onChange({ ...time, hours: newHours });
  }, [time, onChange]);

  const timePreview = `${padZero(displayHour)}:${padZero(time.minutes)}${showSeconds ? `:${padZero(time.seconds)}` : ""}${is12Hour ? ` ${isPM ? "PM" : "AM"}` : ""}`;

  return (
    <div
      className={`rdk-time rdk-time--${placement}`}
      role="region"
      aria-label="Time selection"
    >
      {/* Header: clock icon + current time preview */}
      <div className="rdk-time-header">
        <Clock />
        <span className="rdk-time-preview">{timePreview}</span>
      </div>

      {/* AM / PM segmented (12h mode only) */}
      {is12Hour && (
        <div className="rdk-time-ampm-segmented" role="radiogroup" aria-label="AM or PM">
          <button
            type="button"
            className={`rdk-time-ampm-btn ${!isPM ? "rdk-time-ampm-btn--active" : ""}`}
            onClick={() => toggleAmPm(false)}
            role="radio"
            aria-checked={!isPM}
          >
            AM
          </button>
          <button
            type="button"
            className={`rdk-time-ampm-btn ${isPM ? "rdk-time-ampm-btn--active" : ""}`}
            onClick={() => toggleAmPm(true)}
            role="radio"
            aria-checked={isPM}
          >
            PM
          </button>
        </div>
      )}

      {/* Columns */}
      <div className="rdk-time-columns">
        <TimeCol
          title="Hour"
          items={hoursList}
          selectedIndex={displayHour}
          disabledSet={disabledHoursSet}
          onSelect={handleHourSelect}
        />
        <TimeCol
          title="Min"
          items={minutesList}
          selectedIndex={time.minutes}
          disabledSet={disabledMinutesSet}
          onSelect={handleMinuteSelect}
        />
        {showSeconds && (
          <TimeCol
            title="Sec"
            items={secondsList}
            selectedIndex={time.seconds}
            disabledSet={disabledSecondsSet}
            onSelect={handleSecondSelect}
          />
        )}
      </div>
    </div>
  );
});

TimeSelector.displayName = "TimeSelector";
