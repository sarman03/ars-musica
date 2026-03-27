"use client";

import { useEffect, useRef, useState } from "react";
import ImageCropModal from "./ImageCropModal";
import { convertIfHeic } from "../utils/convertHeic";

interface Mentor {
  name: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

interface ModalState {
  mode: "add" | "edit";
  index?: number;
  name: string;
  description: string;
  imageAlt: string;
  imagePreview: string | null;
  imageBlob: Blob | null;
}

function MentorModal({
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
    state.name.trim() &&
    state.description.trim() &&
    (state.mode === "edit" || state.imageBlob);

  if (showCrop && cropSrc) {
    return (
      <ImageCropModal
        imageSrc={cropSrc}
        aspectRatio={3 / 4}
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
            {state.mode === "add" ? "Add New Mentor" : "Edit Mentor"}
          </h3>
          <button onClick={onCancel} className="text-zinc-400 hover:text-white transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="text-zinc-300 text-sm font-medium mb-2 block">Mentor Photo {state.mode === "add" && "*"}</label>
            <div className="flex items-center gap-4">
              {state.imagePreview && (
                <div className="relative w-20 h-28 rounded-lg overflow-hidden border border-zinc-700 flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={state.imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <button type="button" onClick={() => fileRef.current?.click()} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm px-4 py-2 rounded-lg border border-zinc-700 transition-colors">
                {state.imagePreview || state.mode === "edit" ? "Change Photo" : "Choose Photo"}
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
            </div>
          </div>
          <div>
            <label className="text-zinc-300 text-sm font-medium mb-2 block">Name & Title *</label>
            <input type="text" value={state.name} onChange={(e) => onChange({ name: e.target.value })} placeholder="e.g. John Doe – Guitar Instructor" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 transition-colors" />
          </div>
          <div>
            <label className="text-zinc-300 text-sm font-medium mb-2 block">Bio / Description *</label>
            <textarea value={state.description} onChange={(e) => onChange({ description: e.target.value })} placeholder="Describe the mentor's background, experience, and expertise..." rows={5} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 transition-colors resize-y" />
          </div>
          <div>
            <label className="text-zinc-300 text-sm font-medium mb-2 block">Image Alt Text</label>
            <input type="text" value={state.imageAlt} onChange={(e) => onChange({ imageAlt: e.target.value })} placeholder="e.g. John Doe playing guitar" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 transition-colors" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-zinc-800">
          <button onClick={onCancel} className="px-5 py-2 rounded-lg text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 transition-colors">Cancel</button>
          <button onClick={onSave} disabled={!isValid || saving} className="bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors flex items-center gap-2">
            {saving ? (<><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Saving...</>) : state.mode === "add" ? "Add Mentor" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MentorsManager() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState<ModalState | null>(null);

  useEffect(() => {
    fetch("/api/mentors").then((r) => r.json()).then((d) => { if (Array.isArray(d)) setMentors(d); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const openAdd = () => setModal({ mode: "add", name: "", description: "", imageAlt: "", imagePreview: null, imageBlob: null });

  const openEdit = (i: number) => {
    const m = mentors[i];
    setModal({ mode: "edit", index: i, name: m.name, description: m.description, imageAlt: m.imageAlt, imagePreview: m.imageSrc, imageBlob: null });
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
      fd.append("name", modal.name);
      fd.append("description", modal.description);
      fd.append("imageAlt", modal.imageAlt || modal.name);
      try {
        const res = await fetch("/api/mentors", { method: "POST", body: fd });
        const data = await res.json();
        if (data.success) { setMentors(data.mentors); closeModal(); } else alert("Failed: " + (data.error || "Unknown error"));
      } catch { alert("Upload failed."); }
    } else {
      fd.append("index", String(modal.index));
      fd.append("name", modal.name);
      fd.append("description", modal.description);
      fd.append("imageAlt", modal.imageAlt || modal.name);
      if (modal.imageBlob) fd.append("file", modal.imageBlob, "image.jpeg");
      try {
        const res = await fetch("/api/mentors", { method: "PUT", body: fd });
        const data = await res.json();
        if (data.success) { setMentors(data.mentors); closeModal(); } else alert("Failed: " + (data.error || "Unknown error"));
      } catch { alert("Update failed."); }
    }
    setSaving(false);
  };

  const handleDelete = async (i: number) => {
    if (!confirm(`Remove "${mentors[i].name.split(" –")[0].split(" -")[0]}"?`)) return;
    try {
      const res = await fetch("/api/mentors", { method: "DELETE", body: JSON.stringify({ index: i }), headers: { "Content-Type": "application/json" } });
      const data = await res.json();
      if (data.success) setMentors(data.mentors); else alert("Delete failed.");
    } catch { alert("Delete failed."); }
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-zinc-500">Loading mentors...</div>;

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-semibold text-lg">Mentor Cards ({mentors.length})</h3>
          <button onClick={openAdd} className="bg-red-700 hover:bg-red-600 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Mentor
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mentors.map((mentor, i) => (
            <div key={`${mentor.name}-${i}`} className="relative group rounded-xl overflow-hidden border border-zinc-700/40 bg-zinc-900">
              <div className="relative aspect-[3/4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={mentor.imageSrc} alt={mentor.imageAlt} className="w-full h-full object-cover object-top" />
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
                <h4 className="text-white font-semibold text-sm uppercase tracking-tight mb-1 line-clamp-1">{mentor.name}</h4>
                <p className="text-zinc-500 text-xs line-clamp-2">{mentor.description}</p>
              </div>
            </div>
          ))}
        </div>

        {mentors.length === 0 && <div className="text-center text-zinc-500 py-12">No mentors yet. Add your first mentor above.</div>}
      </div>

      {modal && <MentorModal state={modal} onChange={(p) => setModal((prev) => prev ? { ...prev, ...p } : null)} onSave={handleSave} onCancel={closeModal} saving={saving} />}
    </>
  );
}
