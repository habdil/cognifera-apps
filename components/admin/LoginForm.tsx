"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        setError(result?.message || "Login gagal. Coba lagi.");
        setSubmitting(false);
        return;
      }

      const next = searchParams.get("next");
      router.push(next && next.startsWith("/admin") ? next : "/admin");
      router.refresh();
    } catch {
      setError("Tidak dapat terhubung ke server.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-xs uppercase tracking-wide text-gray-500">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@cognifera.web.id"
          autoComplete="username"
          required
          className="rounded-none"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-xs uppercase tracking-wide text-gray-500">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          className="rounded-none"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 border border-red-200 bg-red-50 px-3 py-2">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={submitting}
        className="w-full rounded-none bg-primary hover:bg-primary/90"
      >
        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Masuk"}
      </Button>
    </form>
  );
}
