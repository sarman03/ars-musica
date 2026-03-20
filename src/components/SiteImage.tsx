"use client";

import Image, { ImageProps } from "next/image";
import { useImageOverride } from "./ImageOverrideProvider";

type SiteImageProps = Omit<ImageProps, "src"> & { src: string };

export default function SiteImage({ src, ...props }: SiteImageProps) {
  const resolvedSrc = useImageOverride(src);
  const isExternal = resolvedSrc.startsWith("http");

  return (
    <Image
      {...props}
      src={resolvedSrc}
      unoptimized={isExternal}
    />
  );
}
