"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  DatePicker: () => DatePicker
});
module.exports = __toCommonJS(index_exports);

// src/utils/format.ts
var formatterCache = /* @__PURE__ */ new Map();
function getFormatter(key, create) {
  let f = formatterCache.get(key);
  if (!f) {
    try {
      f = create();
    } catch {
      f = new Intl.DateTimeFormat("en-US");
    }
    formatterCache.set(key, f);
  }
  return f;
}
function formatMonthYear(date, locale = "en-US") {
  const f = getFormatter(
    `my_${locale}`,
    () => new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" })
  );
  return f.format(date);
}
function formatMonthName(monthIndex, format = "long", locale = "en-US") {
  const d = new Date(2026, monthIndex, 15);
  const f = getFormatter(
    `mn_${format}_${locale}`,
    () => new Intl.DateTimeFormat(locale, { month: format })
  );
  return f.format(d);
}
function getWeekdayNames(weekStartsOn = 0, format = "short", locale = "en-US") {
  const list = [];
  const baseSunday = new Date(2026, 8, 27);
  const shortFormatter = getFormatter(
    `wd_${format}_${locale}`,
    () => new Intl.DateTimeFormat(locale, { weekday: format })
  );
  const longFormatter = getFormatter(
    `wd_long_${locale}`,
    () => new Intl.DateTimeFormat(locale, { weekday: "long" })
  );
  for (let i = 0; i < 7; i++) {
    const dayIndex = (weekStartsOn + i) % 7;
    const date = new Date(baseSunday);
    date.setDate(baseSunday.getDate() + dayIndex);
    list.push({
      dayIndex,
      label: shortFormatter.format(date),
      fullLabel: longFormatter.format(date)
    });
  }
  return list;
}
function formatFullDate(date, locale = "en-US") {
  const f = getFormatter(
    `full_${locale}`,
    () => new Intl.DateTimeFormat(locale, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  );
  return f.format(date);
}
function formatTime(date, timeFormat = "24", showSeconds = false, locale = "en-US") {
  const hour12 = timeFormat === "12";
  const f = getFormatter(
    `time_${timeFormat}_${showSeconds}_${locale}`,
    () => new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: showSeconds ? "2-digit" : void 0,
      hour12
    })
  );
  return f.format(date);
}
function padZero(num) {
  return num < 10 ? `0${num}` : `${num}`;
}
function formatDisplayValue(value, mode, timeFormat, showTime, showSeconds, locale, customFormat) {
  if (!value) return "";
  if (typeof customFormat === "function") {
    return customFormat(value);
  }
  const dateLocaleOpts = {
    day: "2-digit",
    month: "short",
    year: "numeric"
  };
  if ((mode === "single" || mode === "datetime") && value instanceof Date) {
    let str = value.toLocaleDateString(locale, dateLocaleOpts);
    if (showTime || mode === "datetime") {
      str += "  " + formatTime(value, timeFormat, showSeconds, locale);
    }
    return str;
  }
  if (mode === "range" && Array.isArray(value)) {
    const [start, end] = value;
    if (start && end) {
      return `${start.toLocaleDateString(locale, dateLocaleOpts)} \u2192 ${end.toLocaleDateString(locale, dateLocaleOpts)}`;
    }
    if (start) {
      return `${start.toLocaleDateString(locale, dateLocaleOpts)} \u2192 \u2026`;
    }
    return "";
  }
  if (mode === "multiple" && Array.isArray(value)) {
    const dates = value;
    if (dates.length === 0) return "";
    if (dates.length === 1)
      return dates[0].toLocaleDateString(locale, dateLocaleOpts);
    return `${dates.length} dates selected`;
  }
  return "";
}
function hasDisplayValue(value, mode) {
  if (!value) return false;
  if (value instanceof Date) return true;
  if (Array.isArray(value)) {
    if (mode === "range") return Boolean(value[0]);
    return value.length > 0;
  }
  return false;
}

// src/hooks/usePopoverPosition.ts
var import_react = require("react");
var PANEL_GAP = 6;
function usePopoverPosition(triggerRef, panelRef, open) {
  const [position, setPosition] = (0, import_react.useState)({
    top: 0,
    left: 0,
    placement: "bottom-start"
  });
  const recalculate = (0, import_react.useCallback)(() => {
    const trigger = triggerRef.current;
    const panel = panelRef.current;
    if (!trigger) return;
    const trigRect = trigger.getBoundingClientRect();
    const panelWidth = panel?.offsetWidth ?? 320;
    const panelHeight = panel?.offsetHeight ?? 400;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const spaceBelow = vh - trigRect.bottom;
    const spaceAbove = trigRect.top;
    const fitsBelow = spaceBelow >= panelHeight + PANEL_GAP;
    const fitsAbove = spaceAbove >= panelHeight + PANEL_GAP;
    const placeAbove = !fitsBelow && fitsAbove;
    const wouldClipRight = trigRect.left + panelWidth > vw - 8;
    const placeEnd = wouldClipRight;
    let top;
    let bottom;
    let left;
    let right;
    if (placeAbove) {
      bottom = vh - trigRect.top + PANEL_GAP;
    } else {
      top = trigRect.bottom + PANEL_GAP;
    }
    if (placeEnd) {
      right = vw - trigRect.right;
    } else {
      left = trigRect.left;
    }
    const placement = placeAbove ? placeEnd ? "top-end" : "top-start" : placeEnd ? "bottom-end" : "bottom-start";
    setPosition({ top, bottom, left, right, placement });
  }, [triggerRef, panelRef]);
  (0, import_react.useEffect)(() => {
    if (open) {
      const id = requestAnimationFrame(recalculate);
      return () => cancelAnimationFrame(id);
    }
  }, [open, recalculate]);
  (0, import_react.useEffect)(() => {
    if (!open) return;
    const opts = { passive: true };
    window.addEventListener("scroll", recalculate, opts);
    window.addEventListener("resize", recalculate, opts);
    return () => {
      window.removeEventListener("scroll", recalculate);
      window.removeEventListener("resize", recalculate);
    };
  }, [open, recalculate]);
  return { position, recalculate };
}

// src/hooks/useClickOutside.ts
var import_react2 = require("react");
function useClickOutside(handler, enabled, ...refs) {
  const handlerRef = (0, import_react2.useRef)(handler);
  handlerRef.current = handler;
  (0, import_react2.useEffect)(() => {
    if (!enabled) return;
    const handleEvent = (event) => {
      const target = event.target;
      if (!target) return;
      const activeRefs = refs.map((r) => r.current).filter((el) => Boolean(el));
      const isOutside = activeRefs.every((el) => !el.contains(target));
      if (isOutside) {
        handlerRef.current();
      }
    };
    document.addEventListener("mousedown", handleEvent, true);
    document.addEventListener("touchstart", handleEvent, { passive: true, capture: true });
    return () => {
      document.removeEventListener("mousedown", handleEvent, true);
      document.removeEventListener("touchstart", handleEvent, true);
    };
  }, [enabled, ...refs]);
}

// src/components/Icons.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function ChevronLeft({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      className,
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "15 18 9 12 15 6" })
    }
  );
}
function ChevronRight({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      className,
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "9 18 15 12 9 6" })
    }
  );
}
function DoubleChevronLeft({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      className,
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "11 17 6 12 11 7" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "18 17 13 12 18 7" })
      ]
    }
  );
}
function DoubleChevronRight({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      className,
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "13 17 18 12 13 7" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "6 17 11 12 6 7" })
      ]
    }
  );
}
function Clock({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      className,
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "12 6 12 12 16 14" })
      ]
    }
  );
}
function CalendarIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      className,
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2", ry: "2" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "16", y1: "2", x2: "16", y2: "6" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "8", y1: "2", x2: "8", y2: "6" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "3", y1: "10", x2: "21", y2: "10" })
      ]
    }
  );
}
function ClearIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      className,
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
      ]
    }
  );
}

// src/hooks/useCalendarKeyboard.ts
var import_react3 = require("react");

// src/utils/dateUtils.ts
function cloneDate(d) {
  return new Date(d.getTime());
}
function getDaysInMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate();
}
function startOfDay(date) {
  const d = cloneDate(date);
  d.setHours(0, 0, 0, 0);
  return d;
}
function endOfDay(date) {
  const d = cloneDate(date);
  d.setHours(23, 59, 59, 999);
  return d;
}
function startOfWeek(date, weekStartsOn = 0) {
  const d = startOfDay(date);
  const day = d.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  d.setDate(d.getDate() - diff);
  return d;
}
function endOfWeek(date, weekStartsOn = 0) {
  const s = startOfWeek(date, weekStartsOn);
  s.setDate(s.getDate() + 6);
  return endOfDay(s);
}
function startOfMonth(date) {
  const d = cloneDate(date);
  d.setDate(1);
  return startOfDay(d);
}
function endOfMonth(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const lastDay = getDaysInMonth(year, month);
  const d = new Date(year, month, lastDay);
  return endOfDay(d);
}
function startOfQuarter(date) {
  const year = date.getFullYear();
  const quarterMonth = Math.floor(date.getMonth() / 3) * 3;
  return startOfDay(new Date(year, quarterMonth, 1));
}
function endOfQuarter(date) {
  const year = date.getFullYear();
  const quarterEndMonth = Math.floor(date.getMonth() / 3) * 3 + 2;
  const lastDay = getDaysInMonth(year, quarterEndMonth);
  return endOfDay(new Date(year, quarterEndMonth, lastDay));
}
function startOfYear(date) {
  return startOfDay(new Date(date.getFullYear(), 0, 1));
}
function endOfYear(date) {
  return endOfDay(new Date(date.getFullYear(), 11, 31));
}
function addDays(date, amount) {
  const d = cloneDate(date);
  d.setDate(d.getDate() + amount);
  return d;
}
function subDays(date, amount) {
  return addDays(date, -amount);
}
function addMonths(date, amount) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const target = new Date(year, month + amount, 1);
  const daysInTarget = getDaysInMonth(target.getFullYear(), target.getMonth());
  target.setDate(Math.min(day, daysInTarget));
  target.setHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
  return target;
}
function subMonths(date, amount) {
  return addMonths(date, -amount);
}
function addYears(date, amount) {
  return addMonths(date, amount * 12);
}
function subYears(date, amount) {
  return addYears(date, -amount);
}
function isSameDay(a, b) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isSameMonth(a, b) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}
function isBeforeDay(a, b) {
  const d1 = startOfDay(a).getTime();
  const d2 = startOfDay(b).getTime();
  return d1 < d2;
}
function isAfterDay(a, b) {
  const d1 = startOfDay(a).getTime();
  const d2 = startOfDay(b).getTime();
  return d1 > d2;
}
function isWithinRange(date, start, end) {
  const time = startOfDay(date).getTime();
  const startTime = startOfDay(start).getTime();
  const endTime = startOfDay(end).getTime();
  const min = Math.min(startTime, endTime);
  const max = Math.max(startTime, endTime);
  return time >= min && time <= max;
}
function differenceInCalendarDays(a, b) {
  const startA = startOfDay(a).getTime();
  const startB = startOfDay(b).getTime();
  const msPerDay = 1e3 * 60 * 60 * 24;
  return Math.round(Math.abs(startA - startB) / msPerDay);
}
function getISOWeekNumber(date) {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + (4 - target.getDay() + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - target.valueOf()) / 6048e5);
}

// src/hooks/useCalendarKeyboard.ts
function useCalendarKeyboard({
  disabled = false,
  dir = "ltr",
  focusedDate,
  viewDate,
  weekStartsOn,
  isSelectingRange = false,
  setFocusedDate,
  setViewDate,
  handleSelectDate,
  handleCancel
}) {
  return (0, import_react3.useCallback)(
    (e) => {
      if (disabled) return;
      let targetDate = null;
      switch (e.key) {
        case "ArrowLeft":
          targetDate = dir === "rtl" ? addDays(focusedDate, 1) : subDays(focusedDate, 1);
          break;
        case "ArrowRight":
          targetDate = dir === "rtl" ? subDays(focusedDate, 1) : addDays(focusedDate, 1);
          break;
        case "ArrowUp":
          targetDate = subDays(focusedDate, 7);
          break;
        case "ArrowDown":
          targetDate = addDays(focusedDate, 7);
          break;
        case "Home":
          targetDate = startOfWeek(focusedDate, weekStartsOn);
          break;
        case "End":
          targetDate = endOfWeek(focusedDate, weekStartsOn);
          break;
        case "PageUp":
          targetDate = e.shiftKey ? subYears(focusedDate, 1) : subMonths(focusedDate, 1);
          break;
        case "PageDown":
          targetDate = e.shiftKey ? addYears(focusedDate, 1) : addMonths(focusedDate, 1);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          handleSelectDate(focusedDate);
          return;
        case "Escape":
          e.preventDefault();
          if (isSelectingRange) handleCancel();
          return;
        default:
          return;
      }
      if (targetDate) {
        e.preventDefault();
        setFocusedDate(targetDate);
        if (targetDate.getMonth() !== viewDate.getMonth() || targetDate.getFullYear() !== viewDate.getFullYear()) {
          setViewDate(targetDate);
        }
      }
    },
    [
      disabled,
      dir,
      focusedDate,
      weekStartsOn,
      viewDate,
      handleSelectDate,
      isSelectingRange,
      handleCancel,
      setFocusedDate,
      setViewDate
    ]
  );
}

// src/components/CalendarPanel.tsx
var import_react17 = require("react");

// src/hooks/useCalendarSelection.ts
var import_react4 = require("react");

// src/utils/selectionUtils.ts
function checkDateDisabled(date, minDate, maxDate, disabledDate, disabledDates, disabledRanges, disableFutureDates, disablePastDates) {
  const today = /* @__PURE__ */ new Date();
  if (disableFutureDates && isAfterDay(date, today)) return true;
  if (disablePastDates && isBeforeDay(date, today)) return true;
  if (minDate && isBeforeDay(date, minDate)) return true;
  if (maxDate && isAfterDay(date, maxDate)) return true;
  if (disabledDate && disabledDate(date)) return true;
  if (disabledDates && disabledDates.some((d) => isSameDay(d, date))) return true;
  if (disabledRanges && disabledRanges.some(([start, end]) => isWithinRange(date, start, end))) {
    return true;
  }
  return false;
}
function toggleMultipleDate(currentList, clickedDate) {
  const list = [...currentList];
  const idx = list.findIndex((d) => isSameDay(d, clickedDate));
  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    list.push(clickedDate);
  }
  return list;
}
function computeRangeSelection(currentRange, isSelecting, clickedDate, minRangeLength, maxRangeLength) {
  if (!isSelecting || !currentRange || !currentRange[0] || currentRange[1]) {
    return {
      nextRange: [clickedDate, null],
      nextIsSelecting: true
    };
  }
  let start = currentRange[0];
  let end = clickedDate;
  if (isBeforeDay(end, start)) {
    const temp = start;
    start = end;
    end = temp;
  }
  const dayLength = differenceInCalendarDays(start, end) + 1;
  if (minRangeLength && dayLength < minRangeLength) {
    return { nextRange: currentRange, nextIsSelecting: true };
  }
  if (maxRangeLength && dayLength > maxRangeLength) {
    return { nextRange: currentRange, nextIsSelecting: true };
  }
  return {
    nextRange: [start, end],
    nextIsSelecting: false
  };
}

// src/hooks/useCalendarSelection.ts
function useCalendarSelection({
  mode,
  value: propValue,
  defaultValue,
  onChange,
  showActions = false,
  minDate,
  maxDate,
  disableFutureDates,
  disablePastDates,
  disabledDate,
  disabledDates,
  disabledRanges,
  minRangeLength,
  maxRangeLength,
  time,
  showTime = false,
  onApply,
  onCancel,
  onClear,
  onViewDateChange
}) {
  const isControlled = propValue !== void 0;
  const isControlledRef = (0, import_react4.useRef)(isControlled);
  (0, import_react4.useEffect)(() => {
    const isDev = typeof process !== "undefined" && Boolean(
      process.env?.NODE_ENV !== "production"
    );
    if (isDev && isControlledRef.current !== isControlled) {
      console.warn(
        `DatePicker: Changed from ${isControlledRef.current ? "controlled" : "uncontrolled"} to ${isControlled ? "controlled" : "uncontrolled"}.`
      );
    }
  }, [isControlled]);
  const [internalValue, setInternalValue] = (0, import_react4.useState)(() => {
    if (defaultValue !== void 0) return defaultValue;
    if (mode === "range") return [null, null];
    if (mode === "multiple") return [];
    return null;
  });
  const committedValue = isControlled ? propValue : internalValue;
  const [stagedValue, setStagedValue] = (0, import_react4.useState)(committedValue);
  (0, import_react4.useEffect)(() => {
    setStagedValue(committedValue);
  }, [committedValue]);
  const [isSelectingRange, setIsSelectingRange] = (0, import_react4.useState)(false);
  const [rangeHoverDate, setRangeHoverDate] = (0, import_react4.useState)(null);
  const isDateDisabled = (0, import_react4.useCallback)(
    (date) => checkDateDisabled(
      date,
      minDate,
      maxDate,
      disabledDate,
      disabledDates,
      disabledRanges,
      disableFutureDates,
      disablePastDates
    ),
    [
      minDate,
      maxDate,
      disabledDate,
      disabledDates,
      disabledRanges,
      disableFutureDates,
      disablePastDates
    ]
  );
  const notifyChange = (0, import_react4.useCallback)(
    (val) => {
      if (!isControlled) setInternalValue(val);
      setStagedValue(val);
      onChange?.(val);
    },
    [isControlled, onChange]
  );
  const handleSelectDate = (0, import_react4.useCallback)(
    (clickedDate) => {
      if (isDateDisabled(clickedDate)) return;
      const dateWithTime = cloneDate(clickedDate);
      if (showTime || mode === "datetime") {
        dateWithTime.setHours(time.hours, time.minutes, time.seconds, 0);
      } else {
        dateWithTime.setHours(0, 0, 0, 0);
      }
      if (mode === "single" || mode === "datetime") {
        if (showActions) setStagedValue(dateWithTime);
        else notifyChange(dateWithTime);
      } else if (mode === "month") {
        const result = cloneDate(clickedDate);
        result.setDate(1);
        notifyChange(result);
      } else if (mode === "year") {
        const result = cloneDate(clickedDate);
        result.setMonth(0, 1);
        notifyChange(result);
      } else if (mode === "multiple") {
        const currentList = Array.isArray(stagedValue) ? stagedValue : [];
        const updated = toggleMultipleDate(currentList, dateWithTime);
        if (showActions) setStagedValue(updated);
        else notifyChange(updated);
      } else if (mode === "range") {
        const currentRange = stagedValue;
        const result = computeRangeSelection(
          currentRange,
          isSelectingRange,
          dateWithTime,
          minRangeLength,
          maxRangeLength
        );
        setIsSelectingRange(result.nextIsSelecting);
        if (!result.nextIsSelecting) setRangeHoverDate(null);
        if (showActions) setStagedValue(result.nextRange);
        else if (!result.nextIsSelecting) notifyChange(result.nextRange);
        else setStagedValue(result.nextRange);
      }
    },
    [
      isDateDisabled,
      showTime,
      mode,
      time,
      showActions,
      notifyChange,
      stagedValue,
      isSelectingRange,
      minRangeLength,
      maxRangeLength
    ]
  );
  const handleApply = (0, import_react4.useCallback)(() => {
    notifyChange(stagedValue);
    onApply?.(stagedValue);
  }, [notifyChange, stagedValue, onApply]);
  const handleCancel = (0, import_react4.useCallback)(() => {
    setStagedValue(committedValue);
    setIsSelectingRange(false);
    setRangeHoverDate(null);
    onCancel?.();
  }, [committedValue, onCancel]);
  const handleClear = (0, import_react4.useCallback)(() => {
    let emptyVal = null;
    if (mode === "range") emptyVal = [null, null];
    if (mode === "multiple") emptyVal = [];
    setIsSelectingRange(false);
    setRangeHoverDate(null);
    notifyChange(emptyVal);
    onClear?.();
  }, [mode, notifyChange, onClear]);
  const handlePresetSelect = (0, import_react4.useCallback)(
    (presetRange) => {
      if (Array.isArray(presetRange)) {
        const [start, end] = presetRange;
        if (start) onViewDateChange?.(start);
        setIsSelectingRange(false);
        setRangeHoverDate(null);
        if (showActions) setStagedValue([start, end]);
        else notifyChange([start, end]);
      } else {
        onViewDateChange?.(presetRange);
        if (showActions) setStagedValue(presetRange);
        else notifyChange(presetRange);
      }
    },
    [onViewDateChange, showActions, notifyChange]
  );
  return {
    value: stagedValue,
    committedValue,
    isSelectingRange,
    rangeHoverDate,
    setRangeHoverDate,
    handleSelectDate,
    handleApply,
    handleCancel,
    handleClear,
    handlePresetSelect,
    isDateDisabled,
    notifyChange,
    setStagedValue
  };
}

// src/hooks/useCalendarView.ts
var import_react5 = require("react");
function monthOrd(d) {
  return d.getFullYear() * 12 + d.getMonth();
}
function useCalendarView({
  mode,
  defaultViewDate,
  initialValue,
  onMonthChange
}) {
  const initialViewDate = (0, import_react5.useMemo)(() => {
    if (defaultViewDate) return defaultViewDate;
    if (initialValue) {
      if (mode === "range" && Array.isArray(initialValue) && initialValue[0]) {
        return initialValue[0];
      }
      if (mode === "multiple" && Array.isArray(initialValue) && initialValue[0]) {
        return initialValue[0];
      }
      if (initialValue instanceof Date) {
        return initialValue;
      }
    }
    return /* @__PURE__ */ new Date();
  }, [defaultViewDate, initialValue, mode]);
  const [viewDate, setViewDateState] = (0, import_react5.useState)(initialViewDate);
  const [rightViewDate, setRightViewDateState] = (0, import_react5.useState)(
    () => addMonths(initialViewDate, 1)
  );
  const [focusedDate, setFocusedDateState] = (0, import_react5.useState)(
    () => startOfDay(initialViewDate)
  );
  const setFocusedDate = (0, import_react5.useCallback)((newDate) => {
    setFocusedDateState((prev) => isSameDay(prev, newDate) ? prev : newDate);
  }, []);
  const [viewMode, setViewMode] = (0, import_react5.useState)(() => {
    if (mode === "month") return "months";
    if (mode === "year") return "years";
    return "days";
  });
  const setViewDate = (0, import_react5.useCallback)(
    (newDate) => {
      setViewDateState(newDate);
      onMonthChange?.(newDate);
    },
    [onMonthChange]
  );
  const goToNextMonth = (0, import_react5.useCallback)(() => {
    const next = addMonths(viewDate, 1);
    setViewDate(next);
    setRightViewDateState(
      (prev) => monthOrd(prev) <= monthOrd(next) ? addMonths(next, 1) : prev
    );
  }, [viewDate, setViewDate]);
  const goToPrevMonth = (0, import_react5.useCallback)(() => {
    setViewDate(subMonths(viewDate, 1));
  }, [viewDate, setViewDate]);
  const goToNextYear = (0, import_react5.useCallback)(() => {
    const next = addYears(viewDate, 1);
    setViewDate(next);
    setRightViewDateState(
      (prev) => monthOrd(prev) <= monthOrd(next) ? addMonths(next, 1) : prev
    );
  }, [viewDate, setViewDate]);
  const goToPrevYear = (0, import_react5.useCallback)(() => {
    setViewDate(subYears(viewDate, 1));
  }, [viewDate, setViewDate]);
  const goToNextMonthRight = (0, import_react5.useCallback)(() => {
    setRightViewDateState((prev) => addMonths(prev, 1));
  }, []);
  const goToPrevMonthRight = (0, import_react5.useCallback)(() => {
    setRightViewDateState((prev) => {
      const floor = addMonths(viewDate, 1);
      const candidate = subMonths(prev, 1);
      return monthOrd(candidate) >= monthOrd(floor) ? candidate : floor;
    });
  }, [viewDate]);
  const goToNextYearRight = (0, import_react5.useCallback)(() => {
    setRightViewDateState((prev) => addYears(prev, 1));
  }, []);
  const goToPrevYearRight = (0, import_react5.useCallback)(() => {
    setRightViewDateState((prev) => {
      const floor = addMonths(viewDate, 1);
      const candidate = subYears(prev, 1);
      return monthOrd(candidate) >= monthOrd(floor) ? candidate : floor;
    });
  }, [viewDate]);
  const goToToday = (0, import_react5.useCallback)(() => {
    const today = /* @__PURE__ */ new Date();
    setViewDate(today);
    setFocusedDate(startOfDay(today));
    setRightViewDateState(addMonths(today, 1));
  }, [setViewDate, setFocusedDate]);
  return {
    viewDate,
    setViewDate,
    rightViewDate,
    viewMode,
    setViewMode,
    focusedDate,
    setFocusedDate,
    goToNextMonth,
    goToPrevMonth,
    goToNextYear,
    goToPrevYear,
    goToNextMonthRight,
    goToPrevMonthRight,
    goToNextYearRight,
    goToPrevYearRight,
    goToToday
  };
}

// src/hooks/useCalendarTime.ts
var import_react6 = require("react");
function useCalendarTime(initialDate) {
  const [time, setTime] = (0, import_react6.useState)(() => {
    const d = initialDate instanceof Date ? initialDate : /* @__PURE__ */ new Date();
    return {
      hours: d.getHours(),
      minutes: d.getMinutes(),
      seconds: d.getSeconds()
    };
  });
  const updateTime = (0, import_react6.useCallback)((newTime) => {
    setTime(newTime);
  }, []);
  return {
    time,
    setTime,
    updateTime
  };
}

// src/hooks/useCalendarState.ts
var import_react7 = require("react");
function useCalendarState(props) {
  const {
    mode,
    value,
    defaultValue,
    defaultViewDate,
    onMonthChange,
    showTime = false,
    showActions = false
  } = props;
  const { time, setTime } = useCalendarTime(
    value instanceof Date ? value : defaultValue instanceof Date ? defaultValue : null
  );
  const view = useCalendarView({
    mode,
    defaultViewDate,
    initialValue: value ?? defaultValue,
    onMonthChange
  });
  const selection = useCalendarSelection({
    ...props,
    time,
    onViewDateChange: view.setViewDate
  });
  const handleTimeChange = (0, import_react7.useCallback)(
    (newTime) => {
      setTime(newTime);
      if (mode === "datetime" || mode === "single" && showTime) {
        if (selection.value instanceof Date) {
          const updated = cloneDate(selection.value);
          updated.setHours(newTime.hours, newTime.minutes, newTime.seconds);
          if (showActions) {
            selection.setStagedValue(updated);
          } else {
            selection.notifyChange(updated);
          }
        }
      }
    },
    [mode, showTime, selection, showActions, setTime]
  );
  return {
    ...view,
    ...selection,
    time,
    handleTimeChange
  };
}

// src/hooks/useResponsive.ts
var import_react8 = require("react");
function useResponsive(customNumberOfMonths, isRangeMode = false) {
  const [isMobile, setIsMobile] = (0, import_react8.useState)(false);
  const [isTablet, setIsTablet] = (0, import_react8.useState)(false);
  (0, import_react8.useEffect)(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const effectiveMonths = customNumberOfMonths !== void 0 ? customNumberOfMonths : isRangeMode && !isMobile ? 2 : 1;
  return { isMobile, isTablet, effectiveMonths };
}

// src/components/ActionFooter.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var ActionFooter = ({
  mode,
  value,
  showActions = false,
  allowClear = false,
  showTime = false,
  timeFormat = "24",
  locale = "en-US",
  onClear,
  onCancel,
  onApply
}) => {
  if (!showActions && !allowClear) return null;
  let summaryText = "";
  let hasSelection = false;
  if (mode === "single" || mode === "datetime") {
    if (value instanceof Date) {
      hasSelection = true;
      summaryText = formatFullDate(value, locale);
      if (showTime || mode === "datetime") {
        summaryText += ` ${formatTime(value, timeFormat, false, locale)}`;
      }
    }
  } else if (mode === "range" && Array.isArray(value)) {
    const [start, end] = value;
    if (start && end) {
      hasSelection = true;
      summaryText = `${start.toLocaleDateString(locale)} \u2014 ${end.toLocaleDateString(locale)}`;
    } else if (start) {
      hasSelection = true;
      summaryText = `From: ${start.toLocaleDateString(locale)}`;
    }
  } else if (mode === "multiple" && Array.isArray(value) && value.length > 0) {
    hasSelection = true;
    summaryText = `${value.length} dates selected`;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "rdk-footer", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "rdk-footer-info", children: summaryText ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "rdk-footer-summary", children: summaryText }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "rdk-footer-placeholder", children: "No date selected" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "rdk-footer-actions", children: [
      allowClear && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          type: "button",
          className: "rdk-btn rdk-btn--clear",
          onClick: onClear,
          disabled: !hasSelection,
          "aria-label": "Clear selection",
          children: "Clear"
        }
      ),
      showActions && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "button",
          {
            type: "button",
            className: "rdk-btn rdk-btn--cancel",
            onClick: onCancel,
            "aria-label": "Cancel",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "button",
          {
            type: "button",
            className: "rdk-btn rdk-btn--apply",
            onClick: onApply,
            disabled: !hasSelection,
            "aria-label": "Apply selection",
            children: "Apply"
          }
        )
      ] })
    ] })
  ] });
};

// src/components/MonthPicker.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var MonthPicker = ({
  viewDate,
  onSelectMonth,
  locale = "en-US",
  minDate,
  maxDate
}) => {
  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();
  const months = Array.from({ length: 12 }, (_, i) => i);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "rdk-picker-grid", role: "grid", "aria-label": "Choose month", children: months.map((m) => {
    const name = formatMonthName(m, "short", locale);
    const isCurrent = m === currentMonth;
    let isDisabled = false;
    if (minDate && currentYear === minDate.getFullYear() && m < minDate.getMonth()) {
      isDisabled = true;
    }
    if (maxDate && currentYear === maxDate.getFullYear() && m > maxDate.getMonth()) {
      isDisabled = true;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "button",
      {
        type: "button",
        className: `rdk-picker-item ${isCurrent ? "rdk-picker-item--selected" : ""}`,
        disabled: isDisabled,
        onClick: () => onSelectMonth(m),
        "aria-selected": isCurrent,
        "aria-label": formatMonthName(m, "long", locale),
        children: name
      },
      m
    );
  }) });
};

// src/components/YearPicker.tsx
var import_react9 = require("react");
var import_jsx_runtime4 = require("react/jsx-runtime");
var YearPicker = ({
  viewDate,
  onSelectYear,
  minDate,
  maxDate
}) => {
  const currentYear = viewDate.getFullYear();
  const [decadeStart, setDecadeStart] = (0, import_react9.useState)(() => {
    return Math.floor(currentYear / 10) * 10 - 1;
  });
  const years = Array.from({ length: 12 }, (_, i) => decadeStart + i);
  const prevDecade = () => setDecadeStart((prev) => prev - 10);
  const nextDecade = () => setDecadeStart((prev) => prev + 10);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "rdk-year-picker", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "rdk-picker-header", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "button",
        {
          type: "button",
          className: "rdk-header-btn-icon",
          onClick: prevDecade,
          "aria-label": "Previous decade",
          children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ChevronLeft, {})
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "rdk-picker-label", children: [
        decadeStart,
        " - ",
        decadeStart + 11
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "button",
        {
          type: "button",
          className: "rdk-header-btn-icon",
          onClick: nextDecade,
          "aria-label": "Next decade",
          children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ChevronRight, {})
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "rdk-picker-grid", role: "grid", "aria-label": "Choose year", children: years.map((y) => {
      const isSelected = y === currentYear;
      let isDisabled = false;
      if (minDate && y < minDate.getFullYear()) isDisabled = true;
      if (maxDate && y > maxDate.getFullYear()) isDisabled = true;
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "button",
        {
          type: "button",
          className: `rdk-picker-item ${isSelected ? "rdk-picker-item--selected" : ""}`,
          disabled: isDisabled,
          onClick: () => onSelectYear(y),
          "aria-selected": isSelected,
          "aria-label": `Year ${y}`,
          children: y
        },
        y
      );
    }) })
  ] });
};

// src/hooks/useCalendarGrid.ts
var import_react10 = require("react");
function useCalendarGrid(viewMonth, weekStartsOn = 0) {
  return (0, import_react10.useMemo)(() => {
    const today = /* @__PURE__ */ new Date();
    const monthStart = startOfMonth(viewMonth);
    const gridStart = startOfWeek(monthStart, weekStartsOn);
    const weeks = [];
    let currentDay = gridStart;
    for (let row = 0; row < 6; row++) {
      const week = [];
      const weekNumber = getISOWeekNumber(currentDay);
      for (let col = 0; col < 7; col++) {
        const isOutside = !isSameMonth(currentDay, viewMonth);
        const isCurrentDay = isSameDay(currentDay, today);
        week.push({
          date: currentDay,
          dayNumber: currentDay.getDate(),
          isOutside,
          isToday: isCurrentDay,
          weekNumber,
          isStartOfRow: col === 0,
          isEndOfRow: col === 6
        });
        currentDay = addDays(currentDay, 1);
      }
      weeks.push(week);
    }
    return { weeks };
  }, [viewMonth, weekStartsOn]);
}

// src/components/MonthView.tsx
var import_react12 = require("react");

// src/utils/accessibility.ts
function getCellAriaLabel(date, info, locale = "en-US") {
  const fullDateStr = formatFullDate(date, locale);
  const parts = [fullDateStr];
  if (info.isToday) {
    parts.push("Today");
  }
  if (info.isRangeStart && info.isRangeEnd) {
    parts.push("Selected range start and end");
  } else if (info.isRangeStart) {
    parts.push("Start of selected range");
  } else if (info.isRangeEnd) {
    parts.push("End of selected range");
  } else if (info.isInRange) {
    parts.push("In selected range");
  } else if (info.isSelected) {
    parts.push("Selected");
  }
  if (info.isDisabled) {
    parts.push("Disabled");
  }
  return parts.join(", ");
}

// src/components/DateCell.tsx
var import_react11 = require("react");
var import_jsx_runtime5 = require("react/jsx-runtime");
var DateCell = (0, import_react11.memo)(
  ({
    date,
    dayNumber,
    isOutside,
    isToday,
    isStartOfRow,
    isEndOfRow,
    disabled,
    isFocused,
    isSelected,
    isRangeStart,
    isRangeEnd,
    isInRange,
    isRangeHover,
    locale,
    focusedBtnRef,
    onSelectDate,
    onFocusDate,
    onHoverDate,
    isSelectingRange,
    renderDate
  }) => {
    const sameDayRange = isRangeStart && isRangeEnd;
    const cellInfo = (0, import_react11.useMemo)(
      () => ({
        isSelected,
        isRangeStart,
        isRangeEnd,
        isInRange,
        isRangeHover,
        isToday,
        isDisabled: disabled,
        isOutside,
        date
      }),
      [
        isSelected,
        isRangeStart,
        isRangeEnd,
        isInRange,
        isRangeHover,
        isToday,
        disabled,
        isOutside,
        date
      ]
    );
    const cellAriaLabel = getCellAriaLabel(date, cellInfo, locale);
    const classNames = [
      "rdk-cell",
      isOutside ? "rdk-cell--outside" : "",
      disabled ? "rdk-cell--disabled" : "",
      isToday ? "rdk-cell--today" : "",
      isSelected ? "rdk-cell--selected" : "",
      isInRange ? "rdk-cell--in-range" : "",
      isRangeHover ? "rdk-cell--range-hover" : "",
      isRangeStart ? "rdk-cell--range-start" : "",
      isRangeEnd ? "rdk-cell--range-end" : "",
      sameDayRange ? "rdk-cell--range-same-day" : "",
      isStartOfRow ? "rdk-cell--row-start" : "",
      isEndOfRow ? "rdk-cell--row-end" : ""
    ].filter(Boolean).join(" ");
    const handleClick = (0, import_react11.useCallback)(
      () => onSelectDate(date),
      [onSelectDate, date]
    );
    const handleFocus = (0, import_react11.useCallback)(() => {
      if (!isFocused) onFocusDate(date);
    }, [isFocused, onFocusDate, date]);
    const handleMouseEnter = (0, import_react11.useCallback)(() => {
      if (isSelectingRange && onHoverDate) onHoverDate(date);
    }, [isSelectingRange, onHoverDate, date]);
    const handleMouseLeave = (0, import_react11.useCallback)(() => {
      if (isSelectingRange && onHoverDate) onHoverDate(null);
    }, [isSelectingRange, onHoverDate]);
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
      "div",
      {
        className: classNames,
        role: "gridcell",
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        children: [
          (isInRange || isRangeHover) && !isOutside && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "rdk-connector", "aria-hidden": "true" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
            "button",
            {
              ref: isFocused ? focusedBtnRef : void 0,
              type: "button",
              tabIndex: isFocused ? 0 : -1,
              disabled,
              className: "rdk-cell-btn",
              onClick: handleClick,
              onFocus: handleFocus,
              "aria-label": cellAriaLabel,
              "aria-selected": isSelected || isInRange,
              "aria-disabled": disabled,
              "aria-current": isToday ? "date" : void 0,
              children: [
                renderDate ? renderDate(date, cellInfo) : dayNumber,
                isToday && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "rdk-today-dot", "aria-hidden": "true" })
              ]
            }
          )
        ]
      }
    );
  }
);
DateCell.displayName = "DateCell";

// src/components/MonthView.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var MonthView = (0, import_react12.memo)(({
  viewMonth,
  mode,
  value,
  weekStartsOn = 0,
  showWeekNumbers = false,
  showOutsideDays = true,
  locale = "en-US",
  focusedDate,
  onFocusDate,
  onSelectDate,
  isDateDisabled,
  isSelectingRange = false,
  rangeHoverDate,
  onHoverDate,
  renderDate
}) => {
  const { weeks } = useCalendarGrid(viewMonth, weekStartsOn);
  const weekdays = getWeekdayNames(weekStartsOn, "short", locale);
  const focusedBtnRef = (0, import_react12.useRef)(null);
  (0, import_react12.useEffect)(() => {
    if (focusedBtnRef.current && document.activeElement?.classList.contains("rdk-cell-btn") && document.activeElement !== focusedBtnRef.current) {
      focusedBtnRef.current.focus();
    }
  }, [focusedDate]);
  let rangeStart = null;
  let rangeEnd = null;
  if (mode === "range" && Array.isArray(value)) {
    rangeStart = value[0] ?? null;
    rangeEnd = value[1] ?? null;
  }
  let previewStart = rangeStart;
  let previewEnd = rangeEnd;
  if (isSelectingRange && rangeStart && rangeHoverDate) {
    if (isBeforeDay(rangeHoverDate, rangeStart)) {
      previewStart = rangeHoverDate;
      previewEnd = rangeStart;
    } else {
      previewStart = rangeStart;
      previewEnd = rangeHoverDate;
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
    "div",
    {
      className: "rdk-grid",
      role: "grid",
      "aria-label": `${viewMonth.toLocaleString(locale, { month: "long", year: "numeric" })}`,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: `rdk-weekdays ${showWeekNumbers ? "rdk-weekdays--with-weeknum" : ""}`, role: "row", children: [
          showWeekNumbers && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "div",
            {
              className: "rdk-weekday rdk-weeknum",
              role: "columnheader",
              "aria-label": "Week Number",
              children: "#"
            }
          ),
          weekdays.map((wd) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "div",
            {
              className: "rdk-weekday",
              role: "columnheader",
              "aria-label": wd.fullLabel,
              children: wd.label
            },
            wd.dayIndex
          ))
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "rdk-days", role: "rowgroup", children: weeks.map((week, rowIndex) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
          "div",
          {
            className: `rdk-week-row ${showWeekNumbers ? "rdk-week-row--with-weeknum" : ""}`,
            role: "row",
            children: [
              showWeekNumbers && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                "div",
                {
                  className: "rdk-weeknum-cell",
                  role: "rowheader",
                  "aria-label": `Week ${week[0]?.weekNumber}`,
                  children: week[0]?.weekNumber
                }
              ),
              week.map((cell) => {
                const {
                  date,
                  dayNumber,
                  isOutside,
                  isToday,
                  isStartOfRow,
                  isEndOfRow
                } = cell;
                if (isOutside && !showOutsideDays) {
                  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                    "div",
                    {
                      className: "rdk-cell rdk-cell--empty",
                      role: "gridcell",
                      "aria-hidden": "true"
                    },
                    date.toISOString()
                  );
                }
                let isSelected = false;
                let isRangeStart = false;
                let isRangeEnd = false;
                let isInRange = false;
                let isRangeHover = false;
                if (!isOutside) {
                  if (mode === "single" || mode === "datetime" || mode === "month" || mode === "year") {
                    isSelected = isSameDay(date, value);
                  } else if (mode === "multiple" && Array.isArray(value)) {
                    isSelected = value.some((d) => isSameDay(d, date));
                  } else if (mode === "range") {
                    if (rangeStart && rangeEnd) {
                      isRangeStart = isSameDay(date, rangeStart);
                      isRangeEnd = isSameDay(date, rangeEnd);
                      isInRange = isWithinRange(date, rangeStart, rangeEnd);
                      isSelected = isRangeStart || isRangeEnd;
                    } else if (rangeStart) {
                      isRangeStart = isSameDay(date, rangeStart);
                      isSelected = isRangeStart;
                    }
                    if (isSelectingRange && previewStart && previewEnd) {
                      const inPreview = isWithinRange(
                        date,
                        previewStart,
                        previewEnd
                      );
                      isRangeHover = inPreview && !isInRange;
                      if (isSameDay(date, previewStart)) isRangeStart = true;
                      if (isSameDay(date, previewEnd)) isRangeEnd = true;
                    }
                  }
                }
                return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                  DateCell,
                  {
                    date,
                    dayNumber,
                    isOutside,
                    isToday,
                    isStartOfRow,
                    isEndOfRow,
                    disabled: isDateDisabled(date),
                    isFocused: isSameDay(date, focusedDate),
                    isSelected,
                    isRangeStart,
                    isRangeEnd,
                    isInRange,
                    isRangeHover,
                    locale,
                    focusedBtnRef: (el) => {
                      focusedBtnRef.current = el;
                    },
                    onSelectDate,
                    onFocusDate,
                    onHoverDate,
                    isSelectingRange,
                    renderDate
                  },
                  date.toISOString()
                );
              })
            ]
          },
          rowIndex
        )) })
      ]
    }
  );
});
MonthView.displayName = "MonthView";

// src/components/Header.tsx
var import_react13 = require("react");
var import_jsx_runtime7 = require("react/jsx-runtime");
var Header = (0, import_react13.memo)(
  ({
    viewDate,
    onPrevMonth,
    onNextMonth,
    onPrevYear,
    onNextYear,
    onToggleMonthPicker,
    onToggleYearPicker,
    showFastJump = true,
    locale = "en-US",
    isSecondaryMonth = false,
    showPrevButtons,
    showNextButtons = true
  }) => {
    const monthName = formatMonthName(viewDate.getMonth(), "long", locale);
    const yearNumber = viewDate.getFullYear();
    const canShowPrev = showPrevButtons !== void 0 ? showPrevButtons : !isSecondaryMonth;
    const canShowNext = showNextButtons;
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "rdk-header", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "rdk-header-nav rdk-header-nav--left", children: [
        canShowPrev && showFastJump && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          "button",
          {
            type: "button",
            className: "rdk-header-btn-icon",
            onClick: onPrevYear,
            "aria-label": "Previous year",
            title: "Previous year",
            children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(DoubleChevronLeft, {})
          }
        ),
        canShowPrev && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          "button",
          {
            type: "button",
            className: "rdk-header-btn-icon",
            onClick: onPrevMonth,
            "aria-label": "Previous month",
            title: "Previous month",
            children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ChevronLeft, {})
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "rdk-header-title", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          "button",
          {
            type: "button",
            className: "rdk-header-title-btn",
            onClick: onToggleMonthPicker,
            "aria-label": `Select month, current is ${monthName}`,
            children: monthName
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          "button",
          {
            type: "button",
            className: "rdk-header-title-btn",
            onClick: onToggleYearPicker,
            "aria-label": `Select year, current is ${yearNumber}`,
            children: yearNumber
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "rdk-header-nav rdk-header-nav--right", children: [
        canShowNext && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          "button",
          {
            type: "button",
            className: "rdk-header-btn-icon",
            onClick: onNextMonth,
            "aria-label": "Next month",
            title: "Next month",
            children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ChevronRight, {})
          }
        ),
        canShowNext && showFastJump && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          "button",
          {
            type: "button",
            className: "rdk-header-btn-icon",
            onClick: onNextYear,
            "aria-label": "Next year",
            title: "Next year",
            children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(DoubleChevronRight, {})
          }
        )
      ] })
    ] });
  }
);
Header.displayName = "Header";

// src/components/CalendarGrid.tsx
var import_react14 = require("react");
var import_jsx_runtime8 = require("react/jsx-runtime");
var CalendarGrid = (0, import_react14.memo)(
  ({
    mode,
    locale,
    minDate,
    maxDate,
    viewMode,
    viewDate,
    renderDate,
    setViewMode,
    setViewDate,
    activeValue,
    focusedDate,
    stackMonths = false,
    weekStartsOn,
    goToPrevYear,
    goToNextYear,
    goToPrevMonth,
    goToNextMonth,
    monthsToRender,
    setFocusedDate,
    isDateDisabled,
    rangeHoverDate,
    showWeekNumbers,
    showOutsideDays,
    handleSelectDate,
    isSelectingRange,
    setRangeHoverDate,
    goToPrevYearRight,
    goToNextYearRight,
    goToPrevMonthRight,
    goToNextMonthRight
  }) => {
    if (viewMode === "days") {
      const isDualSideBySide = monthsToRender.length > 1 && !stackMonths;
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        "div",
        {
          className: `rdk-datepicker-months ${stackMonths ? "rdk-datepicker-months--stacked" : ""}`,
          children: monthsToRender.map((monthDate, index) => {
            const isFirst = index === 0;
            const isLast = index === monthsToRender.length - 1;
            return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
              "div",
              {
                className: "rdk-datepicker-month-col",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                    Header,
                    {
                      viewDate: monthDate,
                      onPrevMonth: isFirst ? goToPrevMonth : goToPrevMonthRight ?? goToPrevMonth,
                      onNextMonth: isFirst ? goToNextMonth : goToNextMonthRight ?? goToNextMonth,
                      onPrevYear: isFirst ? goToPrevYear : goToPrevYearRight ?? goToPrevYear,
                      onNextYear: isFirst ? goToNextYear : goToNextYearRight ?? goToNextYear,
                      locale,
                      showFastJump: isFirst || isLast,
                      showPrevButtons: isDualSideBySide ? isFirst : true,
                      showNextButtons: isDualSideBySide ? isLast : true,
                      isSecondaryMonth: !isFirst,
                      onToggleYearPicker: () => setViewMode("years"),
                      onToggleMonthPicker: () => setViewMode("months")
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                    MonthView,
                    {
                      mode,
                      value: activeValue,
                      locale,
                      viewMonth: monthDate,
                      renderDate,
                      focusedDate,
                      onFocusDate: setFocusedDate,
                      onHoverDate: setRangeHoverDate,
                      weekStartsOn,
                      onSelectDate: handleSelectDate,
                      isDateDisabled,
                      rangeHoverDate,
                      showWeekNumbers,
                      showOutsideDays,
                      isSelectingRange
                    }
                  )
                ]
              },
              monthDate.toISOString()
            );
          })
        }
      );
    }
    if (viewMode === "months") {
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "rdk-picker-wrapper", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          Header,
          {
            locale,
            viewDate,
            onPrevYear: goToPrevYear,
            onNextYear: goToNextYear,
            onPrevMonth: goToPrevYear,
            onNextMonth: goToNextYear,
            onToggleYearPicker: () => setViewMode("years"),
            onToggleMonthPicker: () => setViewMode("days")
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          MonthPicker,
          {
            locale,
            minDate,
            maxDate,
            viewDate,
            onSelectMonth: (monthIdx) => {
              const newD = new Date(viewDate);
              newD.setMonth(monthIdx);
              setViewDate(newD);
              if (mode === "month") handleSelectDate(newD);
              else setViewMode("days");
            }
          }
        )
      ] });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "rdk-picker-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      YearPicker,
      {
        viewDate,
        minDate,
        maxDate,
        onSelectYear: (yr) => {
          const newD = new Date(viewDate);
          newD.setFullYear(yr);
          setViewDate(newD);
          if (mode === "year") handleSelectDate(newD);
          else setViewMode("months");
        }
      }
    ) });
  }
);
CalendarGrid.displayName = "CalendarGrid";

// src/components/TimeSelector.tsx
var import_react15 = require("react");
var import_jsx_runtime9 = require("react/jsx-runtime");
function scrollSelectedIntoView(scrollEl) {
  if (!scrollEl) return;
  const selected = scrollEl.querySelector(".rdk-time-cell--selected");
  if (selected && typeof selected.scrollIntoView === "function") {
    selected.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
}
var TimeCol = (0, import_react15.memo)(({ title, items, selectedIndex, disabledSet, displayFn, onSelect }) => {
  const scrollRef = (0, import_react15.useRef)(null);
  (0, import_react15.useEffect)(() => {
    scrollSelectedIntoView(scrollRef.current);
  }, [selectedIndex]);
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "rdk-time-col", role: "listbox", "aria-label": title, children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "rdk-time-col-title", children: title }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "rdk-time-col-scroll", ref: scrollRef, children: items.map((n) => {
      const isSelected = n === selectedIndex;
      const isDisabled = disabledSet.has(n);
      return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
        "button",
        {
          type: "button",
          disabled: isDisabled,
          className: `rdk-time-cell ${isSelected ? "rdk-time-cell--selected" : ""}`,
          onClick: () => onSelect(n),
          "aria-selected": isSelected,
          "aria-label": `${title}: ${displayFn ? displayFn(n) : padZero(n)}`,
          children: displayFn ? displayFn(n) : padZero(n)
        },
        n
      );
    }) })
  ] });
});
TimeCol.displayName = "TimeCol";
var TimeSelector = (0, import_react15.memo)(({
  time,
  onChange,
  timeFormat = "24",
  minuteStep = 1,
  secondStep = 1,
  showSeconds = false,
  disabledTime,
  referenceDate = /* @__PURE__ */ new Date(),
  placement = "right"
}) => {
  const is12Hour = timeFormat === "12";
  const isPM = is12Hour && time.hours >= 12;
  const config = disabledTime ? disabledTime(referenceDate) : {};
  const disabledHoursSet = new Set(config.disabledHours ? config.disabledHours() : []);
  const disabledMinutesSet = new Set(config.disabledMinutes ? config.disabledMinutes(time.hours) : []);
  const disabledSecondsSet = new Set(config.disabledSeconds ? config.disabledSeconds(time.hours, time.minutes) : []);
  const hoursList = Array.from(
    { length: is12Hour ? 12 : 24 },
    (_, i) => is12Hour ? i + 1 : i
  );
  const minutesList = [];
  for (let m = 0; m < 60; m += minuteStep) minutesList.push(m);
  const secondsList = [];
  if (showSeconds) {
    for (let s = 0; s < 60; s += secondStep) secondsList.push(s);
  }
  const displayHour = is12Hour ? time.hours % 12 === 0 ? 12 : time.hours % 12 : time.hours;
  const handleHourSelect = (0, import_react15.useCallback)((h) => {
    let actualHour = h;
    if (is12Hour) {
      if (isPM) actualHour = h === 12 ? 12 : h + 12;
      else actualHour = h === 12 ? 0 : h;
    }
    onChange({ ...time, hours: actualHour });
  }, [is12Hour, isPM, time, onChange]);
  const handleMinuteSelect = (0, import_react15.useCallback)((m) => {
    onChange({ ...time, minutes: m });
  }, [time, onChange]);
  const handleSecondSelect = (0, import_react15.useCallback)((s) => {
    onChange({ ...time, seconds: s });
  }, [time, onChange]);
  const toggleAmPm = (0, import_react15.useCallback)((targetPM) => {
    let newHours = time.hours;
    if (targetPM && newHours < 12) newHours += 12;
    else if (!targetPM && newHours >= 12) newHours -= 12;
    onChange({ ...time, hours: newHours });
  }, [time, onChange]);
  const timePreview = `${padZero(displayHour)}:${padZero(time.minutes)}${showSeconds ? `:${padZero(time.seconds)}` : ""}${is12Hour ? ` ${isPM ? "PM" : "AM"}` : ""}`;
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
    "div",
    {
      className: `rdk-time rdk-time--${placement}`,
      role: "region",
      "aria-label": "Time selection",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "rdk-time-header", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Clock, {}),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "rdk-time-preview", children: timePreview })
        ] }),
        is12Hour && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "rdk-time-ampm-segmented", role: "radiogroup", "aria-label": "AM or PM", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
            "button",
            {
              type: "button",
              className: `rdk-time-ampm-btn ${!isPM ? "rdk-time-ampm-btn--active" : ""}`,
              onClick: () => toggleAmPm(false),
              role: "radio",
              "aria-checked": !isPM,
              children: "AM"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
            "button",
            {
              type: "button",
              className: `rdk-time-ampm-btn ${isPM ? "rdk-time-ampm-btn--active" : ""}`,
              onClick: () => toggleAmPm(true),
              role: "radio",
              "aria-checked": isPM,
              children: "PM"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "rdk-time-columns", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
            TimeCol,
            {
              title: "Hour",
              items: hoursList,
              selectedIndex: displayHour,
              disabledSet: disabledHoursSet,
              onSelect: handleHourSelect
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
            TimeCol,
            {
              title: "Min",
              items: minutesList,
              selectedIndex: time.minutes,
              disabledSet: disabledMinutesSet,
              onSelect: handleMinuteSelect
            }
          ),
          showSeconds && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
            TimeCol,
            {
              title: "Sec",
              items: secondsList,
              selectedIndex: time.seconds,
              disabledSet: disabledSecondsSet,
              onSelect: handleSecondSelect
            }
          )
        ] })
      ]
    }
  );
});
TimeSelector.displayName = "TimeSelector";

// src/utils/presets.ts
var PRESET_LABELS = {
  today: "Today",
  yesterday: "Yesterday",
  tomorrow: "Tomorrow",
  thisWeek: "This Week",
  lastWeek: "Last Week",
  nextWeek: "Next Week",
  thisMonth: "This Month",
  lastMonth: "Last Month",
  nextMonth: "Next Month",
  thisQuarter: "This Quarter",
  lastQuarter: "Last Quarter",
  nextQuarter: "Next Quarter",
  thisYear: "This Year",
  lastYear: "Last Year",
  nextYear: "Next Year",
  last7Days: "Last 7 Days",
  last30Days: "Last 30 Days",
  last90Days: "Last 90 Days"
};
function calculateBuiltInPreset(key, weekStartsOn = 0, referenceDate = /* @__PURE__ */ new Date()) {
  const now = referenceDate;
  switch (key) {
    case "today":
      return [startOfDay(now), endOfDay(now)];
    case "yesterday": {
      const y = subDays(now, 1);
      return [startOfDay(y), endOfDay(y)];
    }
    case "tomorrow": {
      const t = addDays(now, 1);
      return [startOfDay(t), endOfDay(t)];
    }
    case "thisWeek":
      return [startOfWeek(now, weekStartsOn), endOfWeek(now, weekStartsOn)];
    case "lastWeek": {
      const lw = subDays(now, 7);
      return [startOfWeek(lw, weekStartsOn), endOfWeek(lw, weekStartsOn)];
    }
    case "nextWeek": {
      const nw = addDays(now, 7);
      return [startOfWeek(nw, weekStartsOn), endOfWeek(nw, weekStartsOn)];
    }
    case "thisMonth":
      return [startOfMonth(now), endOfMonth(now)];
    case "lastMonth": {
      const lm = subMonths(now, 1);
      return [startOfMonth(lm), endOfMonth(lm)];
    }
    case "nextMonth": {
      const nm = addMonths(now, 1);
      return [startOfMonth(nm), endOfMonth(nm)];
    }
    case "thisQuarter":
      return [startOfQuarter(now), endOfQuarter(now)];
    case "lastQuarter": {
      const lq = subMonths(now, 3);
      return [startOfQuarter(lq), endOfQuarter(lq)];
    }
    case "nextQuarter": {
      const nq = addMonths(now, 3);
      return [startOfQuarter(nq), endOfQuarter(nq)];
    }
    case "thisYear":
      return [startOfYear(now), endOfYear(now)];
    case "lastYear": {
      const ly = subYears(now, 1);
      return [startOfYear(ly), endOfYear(ly)];
    }
    case "nextYear": {
      const ny = addYears(now, 1);
      return [startOfYear(ny), endOfYear(ny)];
    }
    case "last7Days":
      return [startOfDay(subDays(now, 6)), endOfDay(now)];
    case "last30Days":
      return [startOfDay(subDays(now, 29)), endOfDay(now)];
    case "last90Days":
      return [startOfDay(subDays(now, 89)), endOfDay(now)];
    default:
      return [startOfDay(now), endOfDay(now)];
  }
}
function normalizePresets(presets, weekStartsOn = 0) {
  if (!presets || presets.length === 0) return [];
  return presets.map((item, index) => {
    if (typeof item === "string") {
      const key = item;
      return {
        key,
        label: PRESET_LABELS[key] ?? key,
        getValue: () => calculateBuiltInPreset(key, weekStartsOn)
      };
    }
    const custom = item;
    return {
      key: custom.key || `custom-preset-${index}`,
      label: custom.label,
      getValue: custom.value
    };
  });
}
function isPresetActive(presetRange, currentRange) {
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

// src/components/Presets.tsx
var import_react16 = require("react");
var import_jsx_runtime10 = require("react/jsx-runtime");
var Presets = (0, import_react16.memo)(({
  presets,
  currentValue,
  onSelectPreset,
  weekStartsOn = 0,
  isMobile = false,
  placement = "auto"
}) => {
  const normalized = (0, import_react16.useMemo)(
    () => normalizePresets(presets, weekStartsOn),
    [presets, weekStartsOn]
  );
  if (!normalized || normalized.length === 0) return null;
  const isHorizontal = placement === "top" || placement === "bottom" || placement === "auto" && isMobile;
  const modeClass = isHorizontal ? "rdk-presets--mobile" : "rdk-presets--desktop";
  const placementClass = `rdk-presets--placement-${placement}`;
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "div",
    {
      className: `rdk-presets ${modeClass} ${placementClass}`,
      role: "region",
      "aria-label": "Date presets",
      children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "rdk-presets-list", role: "list", children: normalized.map((p) => {
        const presetValue = p.getValue();
        const isActive = isPresetActive(presetValue, currentValue);
        return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          "button",
          {
            type: "button",
            className: `rdk-preset-btn ${isActive ? "rdk-preset-btn--active" : ""}`,
            onClick: () => onSelectPreset(presetValue),
            "aria-pressed": isActive,
            children: p.label
          },
          p.key
        );
      }) })
    }
  );
});
Presets.displayName = "Presets";

// src/constants/index.ts
var MIN_DUAL_MONTH_WIDTH = 617;
var PRESETS_SIDEBAR_WIDTH = 160;
var TIME_COLUMN_WIDTH = 160;

// src/components/CalendarPanel.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
var CalendarPanel = (props) => {
  const {
    dir = "ltr",
    mode = "single",
    value,
    style,
    locale = "en-US",
    minDate,
    maxDate,
    presets,
    onApply,
    onClear,
    onChange,
    showTime = false,
    onCancel,
    disabled = false,
    className = "",
    timeFormat = "24",
    minuteStep = 1,
    secondStep = 1,
    allowClear = false,
    renderDate,
    showSeconds = false,
    showActions = false,
    stackMonths,
    defaultValue,
    disabledDate,
    weekStartsOn = 0,
    disabledTime,
    disabledDates,
    onMonthChange,
    timePlacement = "right",
    disabledRanges,
    minRangeLength,
    maxRangeLength,
    showWeekNumbers = false,
    showOutsideDays = true,
    defaultViewDate,
    disablePastDates,
    presetsPlacement = "auto",
    disableFutureDates,
    onSelectionComplete,
    isMobile: propIsMobile,
    numberOfMonths: propMonths
  } = props;
  const pickerRef = (0, import_react17.useRef)(null);
  const [containerWidth, setContainerWidth] = (0, import_react17.useState)(null);
  (0, import_react17.useEffect)(() => {
    const el = pickerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([entry]) => {
      if (entry?.contentRect.width) setContainerWidth(entry.contentRect.width);
    });
    ro.observe(el.parentElement || el);
    return () => ro.disconnect();
  }, []);
  const { isMobile: autoMobile, effectiveMonths: autoMonths } = useResponsive(
    propMonths,
    mode === "range"
  );
  const isMobile = propIsMobile ?? autoMobile;
  const effectiveMonths = propMonths ?? (propIsMobile ? 1 : autoMonths);
  const hasPresets = Array.isArray(presets) && presets.length > 0;
  const isTopPreset = hasPresets && (presetsPlacement === "top" || presetsPlacement === "auto" && isMobile);
  const isBottomPreset = hasPresets && presetsPlacement === "bottom";
  const isLeftPreset = hasPresets && (presetsPlacement === "left" || presetsPlacement === "auto" && !isMobile);
  const isRightPreset = hasPresets && presetsPlacement === "right";
  const minDualMonthWidth = MIN_DUAL_MONTH_WIDTH + (isLeftPreset || isRightPreset ? PRESETS_SIDEBAR_WIDTH : 0) + (showTime && timePlacement === "right" ? TIME_COLUMN_WIDTH : 0);
  const shouldStack = stackMonths ?? (effectiveMonths > 1 && (containerWidth ? containerWidth < minDualMonthWidth : isMobile));
  const state = useCalendarState({
    mode,
    value,
    defaultValue,
    minDate,
    maxDate,
    disableFutureDates,
    disablePastDates,
    disabledDate,
    disabledDates,
    disabledRanges,
    defaultViewDate,
    onMonthChange,
    minRangeLength,
    maxRangeLength,
    showActions,
    onApply,
    onCancel,
    onClear,
    showTime,
    disabledTime,
    onChange: (val) => {
      onChange?.(val);
      if (onSelectionComplete && !showActions) {
        if ((mode === "single" || mode === "datetime") && val instanceof Date)
          onSelectionComplete();
        else if (mode === "range" && Array.isArray(val) && val[0] && val[1])
          onSelectionComplete();
      }
    }
  });
  const handleKeyDown = useCalendarKeyboard({
    disabled,
    dir,
    focusedDate: state.focusedDate,
    viewDate: state.viewDate,
    weekStartsOn,
    isSelectingRange: state.isSelectingRange,
    setFocusedDate: state.setFocusedDate,
    setViewDate: state.setViewDate,
    handleSelectDate: state.handleSelectDate,
    handleCancel: state.handleCancel
  });
  const pickerId = (0, import_react17.useId)();
  const months = effectiveMonths === 2 ? [state.viewDate, state.rightViewDate] : Array.from(
    { length: effectiveMonths },
    (_, i) => addMonths(state.viewDate, i)
  );
  const presetEl = hasPresets ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    Presets,
    {
      presets,
      currentValue: state.value,
      onSelectPreset: (val) => {
        state.handlePresetSelect(val);
        if (onSelectionComplete && !showActions) onSelectionComplete();
      },
      weekStartsOn,
      isMobile,
      placement: presetsPlacement
    }
  ) : null;
  const hasTime = (showTime || mode === "datetime") && state.viewMode === "days";
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
    "div",
    {
      id: pickerId,
      ref: pickerRef,
      dir,
      tabIndex: -1,
      role: "application",
      "aria-label": "Date and time picker",
      onKeyDown: handleKeyDown,
      style,
      className: `rdk-datepicker ${disabled ? "rdk-datepicker--disabled" : ""} ${hasPresets ? "rdk-datepicker--with-presets" : ""} ${isMobile ? "rdk-datepicker--mobile" : ""} ${className}`,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "rdk-sr-only", "aria-live": "polite", "aria-atomic": "true", children: formatMonthYear(state.viewDate, locale) }),
        isTopPreset && presetEl,
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "rdk-datepicker-body", children: [
          isLeftPreset && presetEl,
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
            "div",
            {
              className: `rdk-datepicker-views ${hasTime ? `rdk-datepicker-views--time-${timePlacement}` : ""}`,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "rdk-datepicker-grid-container", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
                  CalendarGrid,
                  {
                    mode,
                    locale,
                    minDate,
                    maxDate,
                    viewMode: state.viewMode,
                    viewDate: state.viewDate,
                    renderDate,
                    setViewMode: state.setViewMode,
                    setViewDate: state.setViewDate,
                    activeValue: state.value,
                    focusedDate: state.focusedDate,
                    stackMonths: shouldStack,
                    weekStartsOn,
                    goToPrevYear: state.goToPrevYear,
                    goToNextYear: state.goToNextYear,
                    goToPrevMonth: state.goToPrevMonth,
                    goToNextMonth: state.goToNextMonth,
                    monthsToRender: months,
                    setFocusedDate: state.setFocusedDate,
                    isDateDisabled: state.isDateDisabled,
                    rangeHoverDate: state.rangeHoverDate,
                    showWeekNumbers,
                    showOutsideDays,
                    handleSelectDate: state.handleSelectDate,
                    isSelectingRange: state.isSelectingRange,
                    setRangeHoverDate: state.setRangeHoverDate,
                    goToPrevYearRight: state.goToPrevYearRight,
                    goToNextYearRight: state.goToNextYearRight,
                    goToPrevMonthRight: state.goToPrevMonthRight,
                    goToNextMonthRight: state.goToNextMonthRight
                  }
                ) }),
                hasTime && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
                  TimeSelector,
                  {
                    time: state.time,
                    onChange: state.handleTimeChange,
                    placement: timePlacement,
                    timeFormat,
                    minuteStep,
                    secondStep,
                    showSeconds,
                    disabledTime,
                    referenceDate: state.value instanceof Date ? state.value : state.viewDate
                  }
                )
              ]
            }
          ),
          isRightPreset && presetEl
        ] }),
        isBottomPreset && presetEl,
        (showActions || allowClear) && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
          ActionFooter,
          {
            mode,
            value: state.value,
            locale,
            onClear: state.handleClear,
            showTime,
            onCancel: state.handleCancel,
            allowClear,
            timeFormat,
            showActions,
            onApply: () => {
              state.handleApply();
              onSelectionComplete?.();
            }
          }
        )
      ]
    }
  );
};
CalendarPanel.displayName = "CalendarPanel";

// src/components/DatePicker.tsx
var import_react_dom = require("react-dom");
var import_react18 = require("react");
var import_jsx_runtime12 = require("react/jsx-runtime");
var DatePicker = (props) => {
  const isTriggerMode = props.inline === false || props.inline === void 0 && (props.placeholder !== void 0 || props.label !== void 0);
  if (!isTriggerMode) return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(CalendarPanel, { ...props });
  const {
    format: customFormat,
    wrapperClassName = "",
    inputClassName = "",
    portalTarget,
    placeholder = "Select date\u2026",
    showSeconds = false,
    allowClear = true,
    timeFormat = "24",
    onChange,
    showTime = false,
    disabled = false,
    onClose,
    onOpen,
    locale = "en-US",
    label,
    value,
    size = "md",
    mode = "single"
  } = props;
  const [open, setOpen] = (0, import_react18.useState)(false);
  const triggerId = (0, import_react18.useId)();
  const panelId = (0, import_react18.useId)();
  const triggerRef = (0, import_react18.useRef)(null);
  const panelRef = (0, import_react18.useRef)(null);
  const { position } = usePopoverPosition(triggerRef, panelRef, open);
  const openPanel = (0, import_react18.useCallback)(() => {
    if (disabled) return;
    setOpen(true);
    onOpen?.();
  }, [disabled, onOpen]);
  const closePanel = (0, import_react18.useCallback)(() => {
    setOpen(false);
    onClose?.();
  }, [onClose]);
  const togglePanel = (0, import_react18.useCallback)(() => {
    if (open) closePanel();
    else openPanel();
  }, [open, openPanel, closePanel]);
  useClickOutside(closePanel, open, triggerRef, panelRef);
  (0, import_react18.useEffect)(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") {
        closePanel();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, closePanel]);
  const handleClear = (0, import_react18.useCallback)(
    (e) => {
      e.stopPropagation();
      if (mode === "multiple") onChange?.([]);
      else onChange?.(null);
    },
    [onChange, mode]
  );
  const handleSelectionComplete = (0, import_react18.useCallback)(() => {
    setTimeout(closePanel, 120);
  }, [closePanel]);
  const displayText = formatDisplayValue(
    value,
    mode,
    timeFormat,
    showTime,
    showSeconds,
    locale,
    customFormat
  );
  const showClearBtn = allowClear && !disabled && hasDisplayValue(value, mode);
  const panelStyle = {
    position: "fixed",
    zIndex: 9999,
    ...position
  };
  const portalEl = portalTarget !== void 0 ? portalTarget : typeof document !== "undefined" ? document.body : null;
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
    "div",
    {
      className: `rdk-input-wrapper rdk-input-wrapper--${size} ${wrapperClassName}`,
      children: [
        label && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("label", { htmlFor: triggerId, className: "rdk-input-label", children: label }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
          "div",
          {
            ref: triggerRef,
            id: triggerId,
            role: "combobox",
            "aria-haspopup": "dialog",
            "aria-expanded": open,
            "aria-controls": open ? panelId : void 0,
            "aria-disabled": disabled,
            tabIndex: disabled ? -1 : 0,
            className: `rdk-input-trigger rdk-input-trigger--${size} ${open ? "rdk-input-trigger--open" : ""} ${disabled ? "rdk-input-trigger--disabled" : ""} ${inputClassName}`,
            onClick: togglePanel,
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                togglePanel();
              }
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                "span",
                {
                  className: `rdk-input-text ${!displayText ? "rdk-input-text--placeholder" : ""}`,
                  children: displayText || placeholder
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { className: "rdk-input-controls", children: [
                showClearBtn && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                  "button",
                  {
                    type: "button",
                    className: "rdk-input-clear-btn",
                    onClick: handleClear,
                    "aria-label": "Clear selection",
                    tabIndex: -1,
                    children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(ClearIcon, {})
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "rdk-input-icon", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(CalendarIcon, {}) })
              ] })
            ]
          }
        ),
        open && portalEl && (0, import_react_dom.createPortal)(
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            "div",
            {
              ref: panelRef,
              id: panelId,
              role: "dialog",
              "aria-modal": "false",
              "aria-label": "Date picker calendar",
              className: `rdk-input-panel rdk-input-panel--${position.placement}`,
              style: panelStyle,
              children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                CalendarPanel,
                {
                  ...props,
                  onSelectionComplete: handleSelectionComplete
                }
              )
            }
          ),
          portalEl
        )
      ]
    }
  );
};
DatePicker.displayName = "DatePicker";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DatePicker
});
//# sourceMappingURL=index.js.map