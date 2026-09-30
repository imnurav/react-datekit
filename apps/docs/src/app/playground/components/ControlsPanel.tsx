import { Sliders } from "lucide-react";
import {
  PLAYGROUND_PRESET_PLACEMENTS,
  PlaygroundPresetPlacement,
  PlaygroundMonthCount,
  PLAYGROUND_LOCALES,
  PLAYGROUND_MONTHS,
  PLAYGROUND_MODES,
  PlaygroundLocale,
  PlaygroundMode,
} from "@/constants/playground";
import React from "react";

interface ControlsPanelProps {
  mode: PlaygroundMode;
  setMode: (m: PlaygroundMode) => void;
  months: PlaygroundMonthCount;
  setMonths: (m: PlaygroundMonthCount) => void;
  stackMonths: "auto" | "side-by-side" | "stacked";
  setStackMonths: (s: "auto" | "side-by-side" | "stacked") => void;
  inline: boolean;
  setInline: (i: boolean) => void;
  size: "sm" | "md" | "lg";
  setSize: (s: "sm" | "md" | "lg") => void;
  presetsPlacement: PlaygroundPresetPlacement;
  setPresetsPlacement: (p: PlaygroundPresetPlacement) => void;
  timePlacement: "right" | "bottom";
  setTimePlacement: (t: "right" | "bottom") => void;
  timeFormat: "12" | "24";
  setTimeFormat: (f: "12" | "24") => void;
  showSeconds: boolean;
  setShowSeconds: React.Dispatch<React.SetStateAction<boolean>>;
  minuteStep: number;
  setMinuteStep: (s: number) => void;
  allowClear: boolean;
  setAllowClear: React.Dispatch<React.SetStateAction<boolean>>;
  disabled: boolean;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  disableWeekends: boolean;
  setDisableWeekends: React.Dispatch<React.SetStateAction<boolean>>;
  disableFutureDates: boolean;
  disableFutureDatesSet: React.Dispatch<React.SetStateAction<boolean>>;
  disablePastDates: boolean;
  disablePastDatesSet: React.Dispatch<React.SetStateAction<boolean>>;
  showActions: boolean;
  setShowActions: React.Dispatch<React.SetStateAction<boolean>>;
  showWeekNumbers: boolean;
  setShowWeekNumbers: React.Dispatch<React.SetStateAction<boolean>>;
  weekStartsOn: 0 | 1;
  setWeekStartsOn: React.Dispatch<React.SetStateAction<0 | 1>>;
  dir: "ltr" | "rtl";
  setDir: React.Dispatch<React.SetStateAction<"ltr" | "rtl">>;
  locale: PlaygroundLocale;
  setLocale: (l: PlaygroundLocale) => void;
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({
  mode,
  setMode,
  months,
  setMonths,
  stackMonths,
  setStackMonths,
  inline,
  setInline,
  size,
  setSize,
  presetsPlacement,
  setPresetsPlacement,
  timePlacement,
  setTimePlacement,
  timeFormat,
  setTimeFormat,
  showSeconds,
  setShowSeconds,
  minuteStep,
  setMinuteStep,
  allowClear,
  setAllowClear,
  disabled,
  setDisabled,
  disableWeekends,
  setDisableWeekends,
  disableFutureDates,
  disableFutureDatesSet,
  disablePastDates,
  disablePastDatesSet,
  showActions,
  setShowActions,
  showWeekNumbers,
  setShowWeekNumbers,
  weekStartsOn,
  setWeekStartsOn,
  dir,
  setDir,
  locale,
  setLocale,
}) => {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-sm space-y-5">
      {/* Panel Title */}
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <Sliders className="w-3.5 h-3.5 text-blue-500" />
          <span>Controls Panel</span>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground">
          react-datekit
        </span>
      </div>

      {/* Mode Selector (Moved into Controls Panel) */}
      <div>
        <label className="block text-xs font-semibold text-muted-foreground mb-2">
          Picker Mode
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 rounded-xl bg-muted/60 text-xs">
          {PLAYGROUND_MODES.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                if (m === "range") {
                  setMonths(2);
                  setStackMonths("side-by-side");
                }
              }}
              className={`py-1.5 px-2 font-semibold rounded-lg transition-all capitalize text-center ${
                mode === m
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {m === "datetime" ? "Date & Time" : m}
            </button>
          ))}
        </div>
      </div>

      {/* Rendering: Inline vs Input Trigger */}
      <div>
        <label className="block text-xs font-semibold text-muted-foreground mb-2">
          Display Format
        </label>
        <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-muted/60 text-xs">
          <button
            type="button"
            onClick={() => setInline(true)}
            className={`py-1.5 px-3 rounded-lg font-semibold transition ${
              inline
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Inline Calendar
          </button>
          <button
            type="button"
            onClick={() => setInline(false)}
            className={`py-1.5 px-3 rounded-lg font-semibold transition ${
              !inline
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Popover Input
          </button>
        </div>
      </div>

      {/* Months Count & Layout */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-muted-foreground">
            Calendar Months
          </label>
          {months > 1 && (
            <span className="text-[10px] text-muted-foreground capitalize">
              {stackMonths}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 mb-2">
          {PLAYGROUND_MONTHS.map((cnt) => (
            <button
              key={cnt}
              type="button"
              onClick={() => setMonths(cnt)}
              className={`py-1.5 px-3 rounded-xl border text-xs font-semibold transition ${
                months === cnt
                  ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  : "border-border bg-card hover:bg-muted/40 text-foreground"
              }`}
            >
              {cnt} {cnt === 1 ? "Month" : "Months"}
            </button>
          ))}
        </div>

        {months > 1 && (
          <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-muted/60 text-[11px]">
            {[
              { key: "side-by-side", label: "Side-by-Side" },
              { key: "stacked", label: "Stacked" },
              { key: "auto", label: "Fluid" },
            ].map((layout) => (
              <button
                key={layout.key}
                type="button"
                onClick={() => setStackMonths(layout.key as any)}
                className={`py-1 px-1.5 rounded-lg font-semibold transition text-center ${
                  stackMonths === layout.key
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {layout.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Presets Placement */}
      <div>
        <label className="block text-xs font-semibold text-muted-foreground mb-2">
          Presets Placement
        </label>
        <div className="grid grid-cols-4 gap-1.5 text-xs">
          {PLAYGROUND_PRESET_PLACEMENTS.map((pos) => (
            <button
              key={pos}
              type="button"
              onClick={() => setPresetsPlacement(pos)}
              className={`py-1.5 rounded-xl border text-center font-semibold capitalize text-[11px] transition ${
                presetsPlacement === pos
                  ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  : "border-border bg-card hover:bg-muted/40 text-foreground"
              }`}
            >
              {pos === "none" ? "None" : pos}
            </button>
          ))}
        </div>
      </div>

      {/* Time Configuration (Only when mode === datetime) */}
      {mode === "datetime" && (
        <div className="pt-3 border-t border-border space-y-3">
          <label className="block text-xs font-semibold text-muted-foreground">
            Time Picker Settings
          </label>

          <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-muted/60 text-xs">
            {(["right", "bottom"] as const).map((pos) => (
              <button
                key={pos}
                type="button"
                onClick={() => setTimePlacement(pos)}
                className={`py-1 rounded-lg capitalize font-semibold transition text-center ${
                  timePlacement === pos
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {pos === "right" ? "Side Dock" : "Bottom Dock"}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-xs">
            {(["12", "24"] as const).map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => setTimeFormat(fmt)}
                className={`py-1.5 rounded-xl border font-semibold transition ${
                  timeFormat === fmt
                    ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    : "border-border bg-card hover:bg-muted/40 text-foreground"
                }`}
              >
                {fmt}-Hour
              </button>
            ))}
            <button
              type="button"
              onClick={() => setShowSeconds((s) => !s)}
              className={`py-1.5 rounded-xl border font-semibold transition ${
                showSeconds
                  ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  : "border-border bg-card hover:bg-muted/40 text-foreground"
              }`}
            >
              Seconds (:ss)
            </button>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-muted-foreground">Minute Step</span>
            <div className="flex gap-1">
              {([1, 5, 15, 30] as const).map((step) => (
                <button
                  key={step}
                  type="button"
                  onClick={() => setMinuteStep(step)}
                  className={`px-2 py-0.5 rounded-lg border text-[11px] font-semibold transition ${
                    minuteStep === step
                      ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {step}m
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sizing (Trigger Popover mode) */}
      {!inline && (
        <div className="pt-3 border-t border-border space-y-2">
          <label className="block text-xs font-semibold text-muted-foreground">
            Trigger Sizing
          </label>
          <div className="grid grid-cols-3 gap-1.5 text-xs">
            {(["sm", "md", "lg"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`py-1.5 rounded-xl border font-semibold capitalize transition ${
                  size === s
                    ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    : "border-border bg-card hover:bg-muted/40 text-foreground"
                }`}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Localization */}
      <div className="pt-3 border-t border-border space-y-2.5">
        <label className="block text-xs font-semibold text-muted-foreground">
          Localization & Direction
        </label>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <select
            value={locale}
            aria-label="Localization locale"
            onChange={(e) => setLocale(e.target.value as PlaygroundLocale)}
            className="bg-muted/50 border border-border rounded-xl px-2 py-1.5 text-xs font-medium text-foreground focus:outline-none"
          >
            {PLAYGROUND_LOCALES.map((loc) => (
              <option key={loc.value} value={loc.value}>
                {loc.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setWeekStartsOn((w) => (w === 0 ? 1 : 0))}
            className="py-1.5 px-2 rounded-xl border border-border bg-muted/40 text-xs font-medium text-foreground hover:bg-muted transition"
          >
            Start:{" "}
            <span className="font-bold">
              {weekStartsOn === 0 ? "Sun" : "Mon"}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setDir((d) => (d === "ltr" ? "rtl" : "ltr"))}
            className="py-1.5 px-2 rounded-xl border border-border bg-muted/40 text-xs font-medium text-foreground hover:bg-muted transition"
          >
            Dir: <span className="font-bold">{dir.toUpperCase()}</span>
          </button>
        </div>
      </div>

      {/* Constraints & Toggles */}
      <div className="pt-3 border-t border-border space-y-2">
        <label className="block text-xs font-semibold text-muted-foreground mb-1">
          Constraints & Rules
        </label>
        {[
          { label: "Allow Clear", state: allowClear, set: setAllowClear },
          {
            label: "Disable Weekends",
            state: disableWeekends,
            set: setDisableWeekends,
          },
          {
            label: "Disable Future Dates",
            state: disableFutureDates,
            set: disableFutureDatesSet,
          },
          {
            label: "Disable Past Dates",
            state: disablePastDates,
            set: disablePastDatesSet,
          },
          {
            label: "Action Confirmation Footer",
            state: showActions,
            set: setShowActions,
          },
          {
            label: "Week Numbers Column",
            state: showWeekNumbers,
            set: setShowWeekNumbers,
          },
          { label: "Disabled State", state: disabled, set: setDisabled },
        ].map((toggle) => (
          <label
            key={toggle.label}
            className="flex items-center justify-between p-2 rounded-xl bg-muted/30 hover:bg-muted/60 transition text-xs font-medium text-foreground cursor-pointer"
          >
            <span>{toggle.label}</span>
            <input
              type="checkbox"
              checked={toggle.state}
              onChange={(e) => toggle.set(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer accent-blue-600"
            />
          </label>
        ))}
      </div>
    </div>
  );
};
