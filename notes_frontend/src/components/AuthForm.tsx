"use client";

import React, { useState } from "react";
import { User } from "@/types/models";
import { saveUserToLocalStorage } from "@/utils/auth";
import { useRouter } from "next/navigation";

const colors = {
  primary: "#2563eb",
  accent: "#f59e42",
  secondary: "#94a3b8",
};

interface AuthFormProps {
  mode: "login" | "register";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        const user: User = {
          id: data.user.id,
          email: data.user.email,
          token: data.token,
        };
        saveUserToLocalStorage(user);
        router.replace("/");
      } else {
        const msg = (await response.json())?.message || "Authentication failed.";
        setError(msg);
      }
    } catch {
      setError("Server error.");
    }
    setBusy(false);
  }

  return (
    <form
      className="flex flex-col gap-4 bg-white rounded-lg shadow-lg p-8 min-w-[300px] max-w-[360px] mx-auto mt-20"
      style={{ border: `1px solid ${colors.secondary}` }}
      onSubmit={handleAuth}
      autoComplete="off"
    >
      <div className="mb-2 text-center font-bold text-xl" style={{ color: colors.primary }}>
        {mode === "login" ? "Login" : "Register"}
      </div>
      <input
        type="email"
        placeholder="Email"
        className="rounded border px-3 py-2 text-base"
        style={{ borderColor: colors.secondary }}
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        autoFocus
      />
      <input
        type="password"
        placeholder="Password"
        className="rounded border px-3 py-2 text-base"
        style={{ borderColor: colors.secondary }}
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        minLength={6}
      />
      <button
        className="w-full mt-3 px-3 py-2 rounded text-white font-semibold disabled:opacity-70"
        style={{ background: colors.primary }}
        type="submit"
        disabled={busy}
      >
        {busy ? (mode === "login" ? "Logging in..." : "Registering...") : mode === "login" ? "Login" : "Register"}
      </button>
      {error && (
        <div className="text-red-500 text-center mt-2 text-sm">{error}</div>
      )}
      <div className="mt-4 text-center text-xs">
        {mode === "login" ? (
          <>
            New user?{" "}
            <a
              href="/register"
              className="underline text-accent"
              style={{ color: colors.accent }}
            >
              Register
            </a>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <a
              href="/login"
              className="underline text-accent"
              style={{ color: colors.accent }}
            >
              Login
            </a>
          </>
        )}
      </div>
    </form>
  );
}
