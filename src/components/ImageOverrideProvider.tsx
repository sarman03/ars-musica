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
      .then((data) => setOverrides(data))
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
