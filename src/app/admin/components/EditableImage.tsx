"use client";

import Image from "next/image";
import { useRef, useState } from "react";

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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    setUploading(true);

    // Determine the target path — keep the same extension as original or use uploaded file's extension
    const originalExt = src.substring(src.lastIndexOf("."));
    const uploadExt = file.name.substring(file.name.lastIndexOf("."));
    const targetPath = uploadExt === originalExt ? src : src.replace(originalExt, uploadExt);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("path", targetPath);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (data.success) {
        setUploaded(true);
        setTimeout(() => setUploaded(false), 2000);
      } else {
        alert("Upload failed: " + (data.error || "Unknown error"));
        setPreviewUrl(null);
      }
    } catch {
      alert("Upload failed. Please try again.");
      setPreviewUrl(null);
    } finally {
      setUploading(false);
    }
  };

  const displaySrc = previewUrl || src;

  return (
    <div className="relative group">
      {fill ? (
        <Image
          src={displaySrc}
          alt={alt}
          fill
          className={className}
          unoptimized={!!previewUrl}
        />
      ) : (
        <Image
          src={displaySrc}
          alt={alt}
          width={400}
          height={300}
          className={className}
          unoptimized={!!previewUrl}
        />
      )}

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
