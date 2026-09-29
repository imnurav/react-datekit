import { useCallback, useEffect, useState } from "react";

export type PopoverPlacement = "bottom-start" | "bottom-end" | "top-start" | "top-end";

export interface PopoverPosition {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  placement: PopoverPlacement;
}

const PANEL_GAP = 6; // px gap between trigger and panel

/**
 * Computes the best position for a popover panel relative to a trigger element.
 * Automatically flips above/below and left/right based on available viewport space.
 */
export function usePopoverPosition(
  triggerRef: React.RefObject<HTMLElement | null>,
  panelRef: React.RefObject<HTMLElement | null>,
  open: boolean,
): { position: PopoverPosition; recalculate: () => void } {
  const [position, setPosition] = useState<PopoverPosition>({
    top: 0,
    left: 0,
    placement: "bottom-start",
  });

  const recalculate = useCallback(() => {
    const trigger = triggerRef.current;
    const panel = panelRef.current;
    if (!trigger) return;

    const trigRect = trigger.getBoundingClientRect();
    const panelWidth = panel?.offsetWidth ?? 320;
    const panelHeight = panel?.offsetHeight ?? 400;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Vertical: prefer below, flip above if not enough space
    const spaceBelow = vh - trigRect.bottom;
    const spaceAbove = trigRect.top;
    const fitsBelow = spaceBelow >= panelHeight + PANEL_GAP;
    const fitsAbove = spaceAbove >= panelHeight + PANEL_GAP;

    const placeAbove = !fitsBelow && fitsAbove;

    // Horizontal: prefer start-aligned, flip end-aligned if clips right
    const wouldClipRight = trigRect.left + panelWidth > vw - 8;
    const placeEnd = wouldClipRight;

    let top: number | undefined;
    let bottom: number | undefined;
    let left: number | undefined;
    let right: number | undefined;

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

    const placement: PopoverPlacement = placeAbove
      ? placeEnd
        ? "top-end"
        : "top-start"
      : placeEnd
        ? "bottom-end"
        : "bottom-start";

    setPosition({ top, bottom, left, right, placement });
  }, [triggerRef, panelRef]);

  // Recalculate on open
  useEffect(() => {
    if (open) {
      // Let the panel paint first so we can measure it
      const id = requestAnimationFrame(recalculate);
      return () => cancelAnimationFrame(id);
    }
  }, [open, recalculate]);

  // Recalculate on scroll/resize while open
  useEffect(() => {
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
