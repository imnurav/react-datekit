import { useEffect, useRef } from "react";

/**
 * Calls `handler` when a click/touch event lands outside all `refs`.
 * Pass multiple refs to treat them all as "inside" (e.g., trigger + panel).
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void,
  enabled: boolean,
  ...refs: React.RefObject<T | null>[]
) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!enabled) return;

    const handleEvent = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;

      const activeRefs = refs.map((r) => r.current).filter((el): el is T => Boolean(el));
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
