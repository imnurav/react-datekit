import { formatDisplayValue, hasDisplayValue } from "../utils/format";
import { usePopoverPosition } from "../hooks/usePopoverPosition";
import { useClickOutside } from "../hooks/useClickOutside";
import { CalendarIcon, ClearIcon } from "./Icons";
import type { DatePickerProps } from "../types";
import { CalendarPanel } from "./CalendarPanel";
import { createPortal } from "react-dom";
import React, {
  type CSSProperties,
  useCallback,
  useEffect,
  useState,
  useRef,
  useId,
} from "react";

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const isTriggerMode =
    props.inline === false ||
    (props.inline === undefined &&
      (props.placeholder !== undefined || props.label !== undefined));

  if (!isTriggerMode) return <CalendarPanel {...props} />;

  const {
    format: customFormat,
    wrapperClassName = "",
    inputClassName = "",
    portalTarget,
    placeholder = "Select date…",
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
    mode = "single",
  } = props;

  const [open, setOpen] = useState(false);
  const triggerId = useId();
  const panelId = useId();

  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const { position } = usePopoverPosition(triggerRef, panelRef, open);

  const openPanel = useCallback(() => {
    if (disabled) return;
    setOpen(true);
    onOpen?.();
  }, [disabled, onOpen]);

  const closePanel = useCallback(() => {
    setOpen(false);
    onClose?.();
  }, [onClose]);

  const togglePanel = useCallback(() => {
    if (open) closePanel();
    else openPanel();
  }, [open, openPanel, closePanel]);

  /* Outside click dismiss */
  useClickOutside(closePanel, open, triggerRef, panelRef);

  /* Escape dismiss */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePanel();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, closePanel]);

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (mode === "multiple") onChange?.([] as any);
      else onChange?.(null as any);
    },
    [onChange, mode],
  );

  const handleSelectionComplete = useCallback(() => {
    setTimeout(closePanel, 120);
  }, [closePanel]);

  const displayText = formatDisplayValue(
    value as any,
    mode,
    timeFormat,
    showTime,
    showSeconds,
    locale,
    customFormat,
  );
  const showClearBtn =
    allowClear && !disabled && hasDisplayValue(value as any, mode);

  const panelStyle: CSSProperties = {
    position: "fixed",
    zIndex: 9999,
    ...position,
  };

  const portalEl =
    portalTarget !== undefined
      ? portalTarget
      : typeof document !== "undefined"
        ? document.body
        : null;

  return (
    <div
      className={`rdk-input-wrapper rdk-input-wrapper--${size} ${wrapperClassName}`}
    >
      {label && (
        <label htmlFor={triggerId} className="rdk-input-label">
          {label}
        </label>
      )}

      {/* Trigger */}
      <div
        ref={triggerRef}
        id={triggerId}
        role="combobox"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        className={`rdk-input-trigger rdk-input-trigger--${size} ${open ? "rdk-input-trigger--open" : ""} ${disabled ? "rdk-input-trigger--disabled" : ""} ${inputClassName}`}
        onClick={togglePanel}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            togglePanel();
          }
        }}
      >
        <span
          className={`rdk-input-text ${!displayText ? "rdk-input-text--placeholder" : ""}`}
        >
          {displayText || placeholder}
        </span>

        <span className="rdk-input-controls">
          {showClearBtn && (
            <button
              type="button"
              className="rdk-input-clear-btn"
              onClick={handleClear}
              aria-label="Clear selection"
              tabIndex={-1}
            >
              <ClearIcon />
            </button>
          )}
          <span className="rdk-input-icon" aria-hidden="true">
            <CalendarIcon />
          </span>
        </span>
      </div>

      {/* Popover panel via portal */}
      {open &&
        portalEl &&
        createPortal(
          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="false"
            aria-label="Date picker calendar"
            className={`rdk-input-panel rdk-input-panel--${position.placement}`}
            style={panelStyle}
          >
            <CalendarPanel
              {...props}
              onSelectionComplete={handleSelectionComplete}
            />
          </div>,
          portalEl,
        )}
    </div>
  );
};

DatePicker.displayName = "DatePicker";
