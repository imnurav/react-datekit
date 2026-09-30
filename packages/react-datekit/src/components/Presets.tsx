import { normalizePresets, isPresetActive } from "../utils/presets";
import type { PresetsProps } from "../types/internal";
import { memo, useMemo } from "react";

export const Presets = memo<PresetsProps>(
  ({
    presets,
    currentValue,
    onSelectPreset,
    weekStartsOn = 0,
    isMobile = false,
    placement = "auto",
  }) => {
    const normalized = useMemo(
      () => normalizePresets(presets, weekStartsOn),
      [presets, weekStartsOn],
    );

    if (!normalized || normalized.length === 0) return null;

    const isHorizontal =
      placement === "top" ||
      placement === "bottom" ||
      (placement === "auto" && isMobile);

    const modeClass = isHorizontal
      ? "rdk-presets--mobile"
      : "rdk-presets--desktop";
    const placementClass = `rdk-presets--placement-${placement}`;

    return (
      <div
        className={`rdk-presets ${modeClass} ${placementClass}`}
        role="region"
        aria-label="Date presets"
      >
        <div className="rdk-presets-list" role="list">
          {normalized.map((p) => {
            const presetValue = p.getValue();
            const isActive = isPresetActive(presetValue, currentValue);

            return (
              <button
                key={p.key}
                type="button"
                className={`rdk-preset-btn ${isActive ? "rdk-preset-btn--active" : ""}`}
                onClick={() => onSelectPreset(presetValue)}
                aria-pressed={isActive}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);

Presets.displayName = "Presets";
