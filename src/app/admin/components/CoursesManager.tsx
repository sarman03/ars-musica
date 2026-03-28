"use client";

import { useEffect, useRef, useState } from "react";
import { useImageOverride } from "@/components/ImageOverrideProvider";
import ImageCropModal from "./ImageCropModal";
import { convertIfHeic } from "../utils/convertHeic";

interface Course {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

interface ModalState {
  mode: "add" | "edit";
  index?: number;
  title: string;
  description: string;
  imageAlt: string;
  imagePreview: string | null;
  imageBlob: Blob | null;
}

function CourseModal({
  state,
  onChange,
  onSave,
  onCancel,
  saving,
}: {
  state: ModalState;
  onChange: (partial: Partial<ModalState>) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [showCrop, setShowCrop] = useState(false);
  const [cropSrc, setCropSrc] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (fileRef.current) fileRef.current.value = "";
    try {
      const converted = await convertIfHeic(file);
      const preview = URL.createObjectURL(converted);
      setCropSrc(preview);
      setShowCrop(true);
    } catch {
      alert("Could not load this image. Please try a different format.");
    }
  };

  const handleCropComplete = (croppedBlob: Blob) => {
    if (cropSrc) URL.revokeObjectURL(cropSrc);
    setCropSrc(null);
    setShowCrop(false);
    const preview = URL.createObjectURL(croppedBlob);
    onChange({ imagePreview: preview, imageBlob: croppedBlob });
  };

  const handleCropCancel = () => {
    if (cropSrc) URL.revokeObjectURL(cropSrc);
    setCropSrc(null);
    setShowCrop(false);
  };

  const isValid =
    state.title.trim() &&
    state.description.trim() &&
    (state.mode === "edit" || state.imageBlob);

  if (showCrop && cropSrc) {
    return (
      <ImageCropModal
        imageSrc={cropSrc}
        aspectRatio={16 / 9}
        onCropComplete={handleCropComplete}
        onCancel={handleCropCancel}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 rounded-2xl border border-zinc-700/50 w-full max-w-2xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <h3 className="text-white font-semibold text-base">
            {state.mode === "add" ? "Add New Course" : "Edit Course"}
          </h3>
          <button onClick={onCancel} className="text-zinc-400 hover:text-white transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="text-zinc-300 text-sm font-medium mb-2 block">Card Image {state.mode === "add" && "*"}</label>
            <div className="flex items-center gap-4">
              {state.imagePreview && (
                <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-zinc-700 flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={state.imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <button type="button" onClick={() => fileRef.current?.click()} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm px-4 py-2 rounded-lg border border-zinc-700 transition-colors">
                {state.imagePreview || state.mode === "edit" ? "Change Image" : "Choose Image"}
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
            </div>
          </div>
          <div>
            <label className="text-zinc-300 text-sm font-medium mb-2 block">Title *</label>
            <input type="text" value={state.title} onChange={(e) => onChange({ title: e.target.value })} placeholder="e.g. Guitar" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 transition-colors" />
          </div>
          <div>
            <label className="text-zinc-300 text-sm font-medium mb-2 block">Description *</label>
            <textarea value={state.description} onChange={(e) => onChange({ description: e.target.value })} placeholder="Describe this course..." rows={4} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 transition-colors resize-y" />
          </div>
          <div>
            <label className="text-zinc-300 text-sm font-medium mb-2 block">Image Alt Text</label>
            <input type="text" value={state.imageAlt} onChange={(e) => onChange({ imageAlt: e.target.value })} placeholder="e.g. Person playing guitar" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 transition-colors" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-zinc-800">
          <button onClick={onCancel} className="px-5 py-2 rounded-lg text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 transition-colors">Cancel</button>
          <button onClick={onSave} disabled={!isValid || saving} className="bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors flex items-center gap-2">
            {saving ? (<><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Saving...</>) : state.mode === "add" ? "Add Course" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ResolvedImg({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const resolved = useImageOverride(src);
  /* eslint-disable-next-line @next/next/no-img-element */
  return <img src={resolved} alt={alt} className={className} />;
}

export default function CoursesManager() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState<ModalState | null>(null);

  useEffect(() => {
    fetch("/api/courses").then((r) => r.json()).then((d) => { if (Array.isArray(d)) setCourses(d); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const openAdd = () => setModal({ mode: "add", title: "", description: "", imageAlt: "", imagePreview: null, imageBlob: null });

  const openEdit = (i: number) => {
    const c = courses[i];
    setModal({ mode: "edit", index: i, title: c.title, description: c.description, imageAlt: c.imageAlt, imagePreview: c.imageSrc, imageBlob: null });
  };

  const closeModal = () => {
    if (modal?.imagePreview && modal.imageBlob) URL.revokeObjectURL(modal.imagePreview);
    setModal(null);
  };

  const handleSave = async () => {
    if (!modal) return;
    setSaving(true);
    const fd = new FormData();

    if (modal.mode === "add") {
      if (!modal.imageBlob) return;
      fd.append("file", modal.imageBlob, "image.jpeg");
      fd.append("title", modal.title);
      fd.append("description", modal.description);
      fd.append("imageAlt", modal.imageAlt || modal.title);
      try {
        const res = await fetch("/api/courses", { method: "POST", body: fd });
        const data = await res.json();
        if (data.success) { setCourses(data.courses); closeModal(); } else alert("Failed: " + (data.error || "Unknown error"));
      } catch { alert("Upload failed."); }
    } else {
      fd.append("index", String(modal.index));
      fd.append("title", modal.title);
      fd.append("description", modal.description);
      fd.append("imageAlt", modal.imageAlt || modal.title);
      if (modal.imageBlob) fd.append("file", modal.imageBlob, "image.jpeg");
      try {
        const res = await fetch("/api/courses", { method: "PUT", body: fd });
        const data = await res.json();
        if (data.success) { setCourses(data.courses); closeModal(); } else alert("Failed: " + (data.error || "Unknown error"));
      } catch { alert("Update failed."); }
    }
    setSaving(false);
  };

  const handleDelete = async (i: number) => {
    if (!confirm(`Delete "${courses[i].title}" card?`)) return;
    try {
      const res = await fetch("/api/courses", { method: "DELETE", body: JSON.stringify({ index: i }), headers: { "Content-Type": "application/json" } });
      const data = await res.json();
      if (data.success) setCourses(data.courses); else alert("Delete failed.");
    } catch { alert("Delete failed."); }
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-zinc-500">Loading courses...</div>;

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-semibold text-lg">Course Cards ({courses.length})</h3>
          <button onClick={openAdd} className="bg-red-700 hover:bg-red-600 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Course
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course, i) => (
            <div key={`${course.title}-${i}`} className="relative group rounded-xl overflow-hidden border border-zinc-700/40 bg-zinc-900">
              <div className="relative aspect-video">
                <ResolvedImg src={course.imageSrc} alt={course.imageAlt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-200 flex items-center justify-center gap-2">
                  <button onClick={() => openEdit(i)} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(i)} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-700 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    Delete
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-white font-semibold text-sm uppercase tracking-tight mb-1">{course.title}</h4>
                <p className="text-zinc-500 text-xs line-clamp-2">{course.description}</p>
              </div>
            </div>
          ))}
        </div>

        {courses.length === 0 && <div className="text-center text-zinc-500 py-12">No courses yet. Add your first course card above.</div>}
      </div>

      {modal && <CourseModal state={modal} onChange={(p) => setModal((prev) => prev ? { ...prev, ...p } : null)} onSave={handleSave} onCancel={closeModal} saving={saving} />}
    </>
  );
}
