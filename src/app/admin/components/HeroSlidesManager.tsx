"use client";

import { useEffect, useRef, useState } from "react";
import ImageCropModal from "./ImageCropModal";
import { convertIfHeic } from "../utils/convertHeic";

type DisplayMode = "fill-box" | "show-full-image";

interface Slide {
  src: string;
  alt: string;
  displayMode?: DisplayMode;
}

export default function HeroSlidesManager() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [cropFileName, setCropFileName] = useState("");
  const [displayMode, setDisplayMode] = useState<DisplayMode>("fill-box");
  const [pendingDisplayMode, setPendingDisplayMode] = useState<DisplayMode>("fill-box");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchSlides = () => {
    fetch("/api/hero-slides", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setSlides(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const uploadSlide = async (file: Blob, mode: DisplayMode, altText: string) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file, "uploaded.jpg");
    formData.append("alt", altText);
    formData.append("displayMode", mode);

    try {
      const res = await fetch("/api/hero-slides", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setSlides(data.slides);
      } else {
        alert("Upload failed: " + (data.error || "Unknown error"));
      }
    } catch {
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const altText = file.name.replace(/\.[^.]+$/, "");
    setCropFileName(altText);
    if (fileInputRef.current) fileInputRef.current.value = "";

    try {
      const converted = await convertIfHeic(file);
      if (displayMode === "show-full-image") {
        await uploadSlide(converted, "show-full-image", altText);
        return;
      }

      setPendingDisplayMode(displayMode);
      const preview = URL.createObjectURL(converted);
      setCropSrc(preview);
    } catch {
      alert("Could not load this image. Please try a different format.");
    }
  };

  const handleCropComplete = async (croppedBlob: Blob) => {
    if (cropSrc) URL.revokeObjectURL(cropSrc);
    setCropSrc(null);
    await uploadSlide(croppedBlob, pendingDisplayMode, cropFileName);
  };

  const handleCropCancel = () => {
    if (cropSrc) URL.revokeObjectURL(cropSrc);
    setCropSrc(null);
  };

  const handleRemove = async (index: number) => {
    if (!confirm("Remove this slide?")) return;

    try {
      const res = await fetch("/api/hero-slides", {
        method: "DELETE",
        body: JSON.stringify({ index }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) {
        setSlides(data.slides);
      } else {
        alert("Delete failed: " + (data.error || "Unknown error"));
      }
    } catch {
      alert("Delete failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-zinc-500">
        Loading slides...
      </div>
    );
  }

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-semibold text-lg">
            Hero Carousel Slides ({slides.length})
          </h3>
          <div className="flex items-center gap-3">
            <div className="flex rounded-lg border border-zinc-700/50 overflow-hidden text-xs">
              <button
                type="button"
                onClick={() => setDisplayMode("fill-box")}
                className={`px-3 py-2 transition-colors ${displayMode === "fill-box" ? "bg-red-700 text-white" : "bg-zinc-900 text-zinc-400 hover:text-white"}`}
              >
                Fill Box
              </button>
              <button
                type="button"
                onClick={() => setDisplayMode("show-full-image")}
                className={`px-3 py-2 transition-colors ${displayMode === "show-full-image" ? "bg-red-700 text-white" : "bg-zinc-900 text-zinc-400 hover:text-white"}`}
              >
                Show Full Image
              </button>
            </div>

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
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Slide
                </>
              )}
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {slides.map((slide, i) => (
            <div
              key={`${slide.src}-${i}`}
              className="relative group rounded-xl overflow-hidden border border-zinc-700/40 bg-zinc-900"
            >
              <div
                className="relative aspect-[16/9]"
                style={{ backgroundColor: slide.displayMode === "show-full-image" ? "#000" : undefined }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className={`absolute inset-0 w-full h-full ${slide.displayMode === "show-full-image" ? "object-contain object-center" : "object-cover"}`}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-200 flex items-center justify-center">
                  <button
                    onClick={() => handleRemove(i)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-700 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
              <div className="px-3 py-2 text-zinc-400 text-xs truncate">
                Slide {i + 1}: {slide.alt}
              </div>
            </div>
          ))}
        </div>

        {slides.length === 0 && (
          <div className="text-center text-zinc-500 py-12">
            No slides yet. Add your first hero slide above.
          </div>
        )}
      </div>

      {/* Crop Modal */}
      {cropSrc && (
        <ImageCropModal
          imageSrc={cropSrc}
          aspectRatio={16 / 9}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}
    </>
  );
}
