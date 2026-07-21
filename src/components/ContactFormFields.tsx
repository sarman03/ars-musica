"use client";

import React, { useState } from "react";

interface ContactFormFieldsProps {
  onSubmitSuccess?: () => void;
}

export default function ContactFormFields({ onSubmitSuccess }: ContactFormFieldsProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !city) return;

    setLoading(true);

    const text = [
      `Hello Ars Musica,`,
      ``,
      `I'm interested in learning more about your music classes. Here are my details:`,
      ``,
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `City: ${city}`,
      ...(message ? [``, `Message: ${message}`] : []),
      ``,
      `Looking forward to hearing from you.`,
    ].join("\n");

    window.open(
      `https://wa.me/919818759189?text=${encodeURIComponent(text)}`,
      "_blank"
    );

    setLoading(false);
    
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
      <div>
        <label className="text-zinc-300 text-sm font-medium mb-1.5 block">Your Name*</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Smith"
          className="w-full bg-zinc-800 border border-zinc-700/80 rounded-lg px-4 py-2.5 text-sm text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 transition-colors"
        />
      </div>
      <div>
        <label className="text-zinc-300 text-sm font-medium mb-1.5 block">Your Email*</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full bg-zinc-800 border border-zinc-700/80 rounded-lg px-4 py-2.5 text-sm text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 transition-colors"
        />
      </div>
      <div>
        <label className="text-zinc-300 text-sm font-medium mb-1.5 block">Your Phone*</label>
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+91 98765 43210"
          className="w-full bg-zinc-800 border border-zinc-700/80 rounded-lg px-4 py-2.5 text-sm text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 transition-colors"
        />
      </div>
      <div>
        <label className="text-zinc-300 text-sm font-medium mb-1.5 block">Your City*</label>
        <input
          type="text"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="New Delhi"
          className="w-full bg-zinc-800 border border-zinc-700/80 rounded-lg px-4 py-2.5 text-sm text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 transition-colors"
        />
      </div>
      <div>
        <label className="text-zinc-300 text-sm font-medium mb-1.5 block">Your Message (optional)</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Let's make something happen..."
          rows={4}
          className="w-full bg-zinc-800 border border-zinc-700/80 rounded-lg px-4 py-2.5 text-sm text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 transition-colors resize-y"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-red hover:bg-[#a3001c] active:bg-[#850017] disabled:opacity-50 text-white font-bold text-sm uppercase tracking-wider py-3.5 rounded-full transition-colors cursor-pointer"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
