"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white"
          >
            <rect x="2" y="8" width="3" height="8" rx="1" fill="currentColor" />
            <rect x="7" y="5" width="3" height="14" rx="1" fill="currentColor" />
            <rect x="12" y="3" width="3" height="18" rx="1" fill="currentColor" />
            <rect x="17" y="6" width="3" height="12" rx="1" fill="currentColor" />
          </svg>
          <span className="text-white font-bold text-lg tracking-wide">
            ARS <span className="text-brand-red">MUSICA</span>
          </span>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <h1 className="text-white font-black text-2xl tracking-wide uppercase text-center mb-1">
            Admin Panel
          </h1>
          <p className="text-zinc-500 text-sm text-center mb-8">
            Sign in to manage site images
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="text-zinc-400 text-xs uppercase tracking-wider font-medium mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-red-700 transition-colors"
                placeholder="admin@arsmusica.com"
                required
              />
            </div>

            <div>
              <label className="text-zinc-400 text-xs uppercase tracking-wider font-medium mb-1.5 block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-red-700 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <p className="text-brand-red text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-semibold px-8 py-3 rounded-lg text-sm transition-colors mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
