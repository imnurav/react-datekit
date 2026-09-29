import { useState, useCallback } from "react";
import type { TimeState } from "../types";

export function useCalendarTime(initialDate?: Date | null) {
  const [time, setTime] = useState<TimeState>(() => {
    const d = initialDate instanceof Date ? initialDate : new Date();
    return {
      hours: d.getHours(),
      minutes: d.getMinutes(),
      seconds: d.getSeconds(),
    };
  });

  const updateTime = useCallback((newTime: TimeState) => {
    setTime(newTime);
  }, []);

  return {
    time,
    setTime,
    updateTime,
  };
}
