"use client";

import Image, { ImageProps } from "next/image";
import { useImageOverride } from "./ImageOverrideProvider";

type SiteImageProps = Omit<ImageProps, "src"> & { src: string };

export default function SiteImage({ src, fill, sizes, ...props }: SiteImageProps) {
  const resolvedSrc = useImageOverride(src);
  const isExternal = resolvedSrc.startsWith("http");

  return (
    <Image
      {...props}
      fill={fill}
      sizes={fill ? (sizes ?? "100vw") : sizes}
      src={resolvedSrc}
      unoptimized={isExternal}
    />
  );
}
