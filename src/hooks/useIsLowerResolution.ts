import { useState, useCallback, useEffect, useMemo } from 'react';
import { LOWER_RESOLUTION_SIZE } from 'src/constants';

export function useIsLowerResolution(resolution = LOWER_RESOLUTION_SIZE) {
  const mediaQuery = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia(`(min-width: ${resolution}px)`),
    [resolution],
  );
  const [isLowerResolution, setIsLowerResolution] = useState(
    mediaQuery ? !mediaQuery.matches : true,
  );

  const mediaListener = useCallback((event: MediaQueryListEvent) => {
    setIsLowerResolution(!event.matches);
  }, []);

  useEffect(() => {
    if (mediaQuery) {
      mediaQuery.addEventListener('change', mediaListener);

      return () => mediaQuery.removeEventListener('change', mediaListener);
    }
  }, [mediaQuery, mediaListener]);

  return isLowerResolution;
}
