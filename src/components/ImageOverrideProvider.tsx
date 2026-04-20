"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

interface ImageOverrideContextValue {
  overrides: Record<string, string>;
  refresh: () => void;
}

const ImageOverrideContext = createContext<ImageOverrideContextValue>({
  overrides: {},
  refresh: () => {},
});

export function useImageOverride(originalSrc: string): string {
  const { overrides } = useContext(ImageOverrideContext);
  return overrides[originalSrc] || originalSrc;
}

export function useImageOverrideRefresh(): () => void {
  return useContext(ImageOverrideContext).refresh;
}

export function ImageOverrideProvider({ children }: { children: React.ReactNode }) {
  const [overrides, setOverrides] = useState<Record<string, string>>({});

  const fetchOverrides = useCallback(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => {
        // Append cache-busting param so the browser doesn't serve stale images
        const bustCache = `?t=${Date.now()}`;
        const busted: Record<string, string> = {};
        for (const [key, url] of Object.entries(data)) {
          busted[key] = (url as string) + bustCache;
        }
        setOverrides(busted);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchOverrides();
  }, [fetchOverrides]);

  return (
    <ImageOverrideContext.Provider value={{ overrides, refresh: fetchOverrides }}>
      {children}
    </ImageOverrideContext.Provider>
  );
}
