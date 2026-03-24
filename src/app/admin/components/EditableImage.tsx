"use client";

import { useRef, useState } from "react";
import { useImageOverride, useImageOverrideRefresh } from "@/components/ImageOverrideProvider";

interface EditableImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sectionLabel?: string;
}

export default function EditableImage({
  src,
  alt,
  fill = true,
  className = "",
  sectionLabel,
}: EditableImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const resolvedSrc = useImageOverride(src);
  const refreshOverrides = useImageOverrideRefresh();
  const [displaySrc, setDisplaySrc] = useState<string | null>(null);

  const currentSrc = displaySrc || resolvedSrc;

  console.log(`[EditableImage] src="${src}" | resolvedSrc="${resolvedSrc}" | displaySrc="${displaySrc}" | currentSrc="${currentSrc}"`);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log(`[EditableImage] Upload started for path="${src}", file="${file.name}"`);

    // Show preview immediately
    const preview = URL.createObjectURL(file);
    setDisplaySrc(preview);
    setUploading(true);
    console.log(`[EditableImage] Preview set: ${preview}`);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("path", src);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      console.log(`[EditableImage] Upload response:`, data);

      if (data.success) {
        setUploaded(true);
        // Refresh the global overrides so all images pick up the new URL
        console.log(`[EditableImage] Calling refreshOverrides()...`);
        refreshOverrides();
        setTimeout(() => {
          console.log(`[EditableImage] Timeout fired. Clearing displaySrc. resolvedSrc is now="${resolvedSrc}"`);
          URL.revokeObjectURL(preview);
          setDisplaySrc(null); // Let the refreshed context handle it
          setUploaded(false);
        }, 2000);
      } else {
        console.log(`[EditableImage] Upload failed:`, data.error);
        alert("Upload failed: " + (data.error || "Unknown error"));
        setDisplaySrc(null);
      }
    } catch (err) {
      console.error(`[EditableImage] Upload error:`, err);
      alert("Upload failed. Please try again.");
      setDisplaySrc(null);
    } finally {
      setUploading(false);
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className={`group ${fill ? "absolute inset-0" : "relative"}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={currentSrc}
        alt={alt}
        className={`${className} ${fill ? "absolute inset-0 w-full h-full" : ""}`}
      />

      {/* Edit overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-200 flex items-center justify-center z-10">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center gap-2">
          {sectionLabel && (
            <span className="text-zinc-300 text-xs font-medium bg-black/60 px-3 py-1 rounded-full">
              {sectionLabel}
            </span>
          )}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-2"
          >
            {uploading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Uploading...
              </>
            ) : uploaded ? (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Updated!
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Replace Image
              </>
            )}
          </button>
          <span className="text-zinc-400 text-xs">{src}</span>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />
    </div>
  );
}
