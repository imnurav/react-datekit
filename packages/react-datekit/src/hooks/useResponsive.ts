import { useState, useEffect } from "react";

export function useResponsive(
  customNumberOfMonths?: number,
  isRangeMode: boolean = false,
): {
  isMobile: boolean;
  isTablet: boolean;
  effectiveMonths: number;
} {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const effectiveMonths =
    customNumberOfMonths !== undefined
      ? customNumberOfMonths
      : isRangeMode && !isMobile
        ? 2
        : 1;

  return { isMobile, isTablet, effectiveMonths };
}
