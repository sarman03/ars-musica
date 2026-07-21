"use client";

import { useEffect, useState } from "react";

interface Review {
  reviewerName: string;
  rating: number;
  text: string;
  date?: string;
}

interface ModalState {
  mode: "add" | "edit";
  index?: number;
  reviewerName: string;
  rating: number;
  text: string;
  date: string;
}

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < value;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onChange(i + 1)}
            className="transition-transform hover:scale-110"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={filled ? "#F59E0B" : "none"}
              stroke={filled ? "#F59E0B" : "#71717a"}
              strokeWidth="1.5"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

function ReviewModal({
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
  const isValid = state.reviewerName.trim() && state.text.trim();

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 rounded-2xl border border-zinc-700/50 w-full max-w-lg flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <h3 className="text-white font-semibold text-base">
            {state.mode === "add" ? "Add New Review" : "Edit Review"}
          </h3>
          <button onClick={onCancel} className="text-zinc-400 hover:text-white transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="text-zinc-300 text-sm font-medium mb-2 block">Reviewer Name *</label>
            <input
              type="text"
              value={state.reviewerName}
              onChange={(e) => onChange({ reviewerName: e.target.value })}
              placeholder="e.g. Priya Sharma"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 transition-colors"
            />
          </div>
          <div>
            <label className="text-zinc-300 text-sm font-medium mb-2 block">Rating *</label>
            <StarPicker value={state.rating} onChange={(v) => onChange({ rating: v })} />
          </div>
          <div>
            <label className="text-zinc-300 text-sm font-medium mb-2 block">Review Text *</label>
            <textarea
              value={state.text}
              onChange={(e) => onChange({ text: e.target.value })}
              placeholder="Paste the review text here..."
              rows={5}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 transition-colors resize-y"
            />
          </div>
          <div>
            <label className="text-zinc-300 text-sm font-medium mb-2 block">Date (optional)</label>
            <input
              type="text"
              value={state.date}
              onChange={(e) => onChange({ date: e.target.value })}
              placeholder="e.g. March 2026"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-zinc-800">
          <button onClick={onCancel} className="px-5 py-2 rounded-lg text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 transition-colors">Cancel</button>
          <button onClick={onSave} disabled={!isValid || saving} className="bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors flex items-center gap-2">
            {saving ? (<><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Saving...</>) : state.mode === "add" ? "Add Review" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsManager() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState<ModalState | null>(null);

  useEffect(() => {
    fetch("/api/reviews").then((r) => r.json()).then((d) => { if (Array.isArray(d)) setReviews(d); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const openAdd = () => setModal({ mode: "add", reviewerName: "", rating: 5, text: "", date: "" });

  const openEdit = (i: number) => {
    const r = reviews[i];
    setModal({ mode: "edit", index: i, reviewerName: r.reviewerName, rating: r.rating, text: r.text, date: r.date || "" });
  };

  const closeModal = () => setModal(null);

  const handleSave = async () => {
    if (!modal) return;
    setSaving(true);

    try {
      if (modal.mode === "add") {
        const res = await fetch("/api/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reviewerName: modal.reviewerName, rating: modal.rating, text: modal.text, date: modal.date }),
        });
        const data = await res.json();
        if (data.success) { setReviews(data.reviews); closeModal(); } else alert("Failed: " + (data.error || "Unknown error"));
      } else {
        const res = await fetch("/api/reviews", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ index: modal.index, reviewerName: modal.reviewerName, rating: modal.rating, text: modal.text, date: modal.date }),
        });
        const data = await res.json();
        if (data.success) { setReviews(data.reviews); closeModal(); } else alert("Failed: " + (data.error || "Unknown error"));
      }
    } catch {
      alert("Save failed.");
    }
    setSaving(false);
  };

  const handleDelete = async (i: number) => {
    if (!confirm(`Remove review from "${reviews[i].reviewerName}"?`)) return;
    try {
      const res = await fetch("/api/reviews", { method: "DELETE", body: JSON.stringify({ index: i }), headers: { "Content-Type": "application/json" } });
      const data = await res.json();
      if (data.success) setReviews(data.reviews); else alert("Delete failed.");
    } catch { alert("Delete failed."); }
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-zinc-500">Loading reviews...</div>;

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-semibold text-lg">Reviews ({reviews.length})</h3>
          <button onClick={openAdd} className="bg-red-700 hover:bg-red-600 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Review
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review, i) => (
            <div key={i} className="relative group rounded-xl overflow-hidden border border-zinc-700/40 bg-zinc-900 p-5 flex flex-col gap-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s < review.rating ? "#F59E0B" : "none"} stroke={s < review.rating ? "#F59E0B" : "#52525b"} strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="text-zinc-400 text-xs line-clamp-3 flex-1">{review.text}</p>
              <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                <div>
                  <p className="text-white text-sm font-medium">{review.reviewerName}</p>
                  {review.date && <p className="text-zinc-500 text-xs">{review.date}</p>}
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button onClick={() => openEdit(i)} className="bg-zinc-700 hover:bg-zinc-600 text-white p-2 rounded-lg">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                  <button onClick={() => handleDelete(i)} className="bg-red-700 hover:bg-red-600 text-white p-2 rounded-lg">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {reviews.length === 0 && <div className="text-center text-zinc-500 py-12">No reviews yet. Add your first review above.</div>}
      </div>

      {modal && <ReviewModal state={modal} onChange={(p) => setModal((prev) => prev ? { ...prev, ...p } : null)} onSave={handleSave} onCancel={closeModal} saving={saving} />}
    </>
  );
}
