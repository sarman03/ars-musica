"use client";

import { useEffect, useRef, useState } from "react";

interface GalleryVideo {
  src: string;
  title: string;
}

export default function GalleryVideosManager() {
  const [videos, setVideos] = useState<GalleryVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchVideos = () => {
    fetch("/api/gallery-videos")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setVideos(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (fileInputRef.current) fileInputRef.current.value = "";

    setUploading(true);
    setUploadProgress(`Uploading ${file.name} (${(file.size / 1024 / 1024).toFixed(1)} MB)...`);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", file.name.replace(/\.[^.]+$/, ""));

    try {
      const res = await fetch("/api/gallery-videos", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setVideos(data.videos);
      } else {
        alert("Upload failed: " + (data.error || "Unknown error"));
      }
    } catch {
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setUploadProgress("");
    }
  };

  const handleRemove = async (index: number) => {
    if (!confirm("Remove this video?")) return;

    try {
      const res = await fetch("/api/gallery-videos", {
        method: "DELETE",
        body: JSON.stringify({ index }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) {
        setVideos(data.videos);
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
        Loading videos...
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-semibold text-lg">
          Videos ({videos.length})
        </h3>
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
              Add Video
            </>
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*,.mov,.MOV"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {uploadProgress && (
        <div className="mb-4 px-4 py-3 bg-zinc-800 rounded-lg text-zinc-300 text-sm">
          {uploadProgress}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video, i) => (
          <div
            key={`${video.src}-${i}`}
            className="relative group rounded-xl overflow-hidden border border-zinc-700/40 bg-zinc-900"
          >
            <div className="relative aspect-video">
              <video
                src={video.src}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                playsInline
                preload="metadata"
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
              Video {i + 1}: {video.title}
            </div>
          </div>
        ))}
      </div>

      {videos.length === 0 && (
        <div className="text-center text-zinc-500 py-12">
          No videos yet. Add your first video above.
        </div>
      )}
    </div>
  );
}
