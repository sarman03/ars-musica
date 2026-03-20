"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ImageOverrideContext = createContext<Record<string, string>>({});

export function useImageOverride(originalSrc: string): string {
  const overrides = useContext(ImageOverrideContext);
  return overrides[originalSrc] || originalSrc;
}

export function ImageOverrideProvider({ children }: { children: React.ReactNode }) {
  const [overrides, setOverrides] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => setOverrides(data))
      .catch(() => {});
  }, []);

  return (
    <ImageOverrideContext.Provider value={overrides}>
      {children}
    </ImageOverrideContext.Provider>
  );
}
