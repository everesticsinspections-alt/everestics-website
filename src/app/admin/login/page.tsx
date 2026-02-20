"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { HardHat, Eye, EyeOff, Loader2 } from "lucide-react";
import { Suspense } from "react";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Login failed.");
        return;
      }
      router.push(params.get("from") ?? "/admin");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "#F7F8FA" }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-8"
        style={{ background: "#FFFFFF", border: "1px solid #E8EAED", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}
          >
            <HardHat size={18} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold tracking-widest uppercase" style={{ color: "#111827" }}>
              Ever<span style={{ color: "#F97316" }}>estics</span>
            </p>
            <p className="text-xs" style={{ color: "#9CA3AF" }}>Admin Portal</p>
          </div>
        </div>

        <h1 className="text-xl font-bold mb-1" style={{ color: "#111827" }}>Sign in</h1>
        <p className="text-sm mb-6" style={{ color: "#6B7280" }}>Enter your admin password to continue.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              autoFocus
              style={{
                background: "#FFFFFF",
                border: `1px solid ${error ? "#EF4444" : "#E8EAED"}`,
                color: "#111827",
                borderRadius: "0.75rem",
                padding: "0.875rem 3rem 0.875rem 1rem",
                width: "100%",
                fontSize: "0.875rem",
                outline: "none",
              }}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: "#9CA3AF" }}
              tabIndex={-1}
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <p className="text-xs" style={{ color: "#EF4444" }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
            style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}
          >
            {loading ? <><Loader2 size={14} className="animate-spin" /> Signing in…</> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
