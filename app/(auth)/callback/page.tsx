"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Memproses login...");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get parameters from URL
        const token = searchParams.get("token");
        const refreshToken = searchParams.get("refresh_token");
        const error = searchParams.get("error");

        // Handle error from backend
        if (error) {
          setStatus("error");
          setMessage(`Login gagal: ${error}`);

          // Redirect to home after 3 seconds
          setTimeout(() => {
            router.push("/");
          }, 3000);
          return;
        }

        // Validate tokens
        if (!token || !refreshToken) {
          setStatus("error");
          setMessage("Token tidak ditemukan. Silakan coba lagi.");

          setTimeout(() => {
            router.push("/");
          }, 3000);
          return;
        }

        // Save tokens to localStorage (matching naming convention)
        localStorage.setItem("cognifera_new_access_token", token);
        localStorage.setItem("cognifera_new_refresh_token", refreshToken);

        // Also set cookies for middleware (optional, matching auth-new.ts pattern)
        document.cookie = `cognifera_new_access_token=${token}; path=/; max-age=900; SameSite=strict`;
        document.cookie = `cognifera_new_refresh_token=${refreshToken}; path=/; max-age=604800; SameSite=strict`;

        // Fetch user profile to get user data
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_NEW_API_BASE_URL}/auth/profile`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data user");
        }

        const data = await response.json();
        const user = data.data.user;

        // Save user data
        localStorage.setItem("cognifera_new_user", JSON.stringify(user));

        setStatus("success");
        setMessage(`Selamat datang, ${user.full_name}! 🎉`);

        // Reload page to update navbar (same behavior as email/password login)
        setTimeout(() => {
          window.location.href = '/'; // Go to homepage and reload
        }, 1500);

      } catch (err) {
        console.error("Auth callback error:", err);
        setStatus("error");
        setMessage(err instanceof Error ? err.message : "Terjadi kesalahan saat login");

        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 sm:w-48 sm:h-48 bg-[var(--color-primary)]/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 sm:w-56 sm:h-56 bg-[var(--color-secondary)]/5 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 sm:w-36 sm:h-36 bg-[var(--color-tertiary)]/5 rounded-full blur-2xl animate-float" />
      </div>

      {/* Content Card */}
      <div className="relative z-10 w-full max-w-md mx-4 sm:mx-6 lg:mx-8">
        <div className="bg-[var(--color-background)] rounded-2xl shadow-xl border border-[var(--color-border)] p-6 sm:p-8 md:p-10 text-center backdrop-blur-sm">
          {/* Logo */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-[var(--color-primary)]/10 rounded-full blur-xl" />
              <img
                src="/logo.png"
                alt="Logo Cognifera"
                className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
              />
            </div>
          </div>

          {/* Status Icon */}
          <div className="mb-6 sm:mb-8">
            {status === "loading" && (
              <div className="relative">
                <div className="absolute inset-0 bg-[var(--color-primary)]/10 rounded-full blur-xl" />
                <Loader2 className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto text-[var(--color-primary)] animate-spin" />
              </div>
            )}
            {status === "success" && (
              <div className="relative">
                <div className="absolute inset-0 bg-[var(--color-hijau)]/10 rounded-full blur-xl animate-pulse" />
                <CheckCircle className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto text-[var(--color-hijau)]" />
              </div>
            )}
            {status === "error" && (
              <div className="relative">
                <div className="absolute inset-0 bg-[var(--color-destructive)]/10 rounded-full blur-xl" />
                <XCircle className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto text-[var(--color-destructive)]" />
              </div>
            )}
          </div>

          {/* Message */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-[var(--color-foreground)]">
            {status === "loading" && "Memproses Login"}
            {status === "success" && "Login Berhasil!"}
            {status === "error" && "Login Gagal"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[var(--color-muted-foreground)] mb-6 sm:mb-8 leading-relaxed px-2">
            {message}
          </p>

          {/* Progress indicator */}
          {status === "loading" && (
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <div className="w-full max-w-xs bg-[var(--color-muted)] rounded-full h-1.5 sm:h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-primary)] animate-[shimmer_2s_infinite] bg-[length:200%_100%]" />
              </div>
              <p className="text-xs sm:text-sm text-[var(--color-muted-foreground)]">
                Mohon tunggu sebentar...
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-[var(--color-muted)] rounded-full">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[var(--color-destructive)] rounded-full animate-pulse" />
              <p className="text-xs sm:text-sm text-[var(--color-muted-foreground)]">
                Mengalihkan ke halaman utama...
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-[var(--color-hijau)]/10 border border-[var(--color-hijau)]/20 rounded-full">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[var(--color-hijau)] rounded-full animate-pulse" />
              <p className="text-xs sm:text-sm text-[var(--color-hijau)] font-medium">
                Mengalihkan...
              </p>
            </div>
          )}
        </div>

        {/* Branding */}
        <p className="text-center text-xs sm:text-sm text-[var(--color-muted-foreground)] mt-4 sm:mt-6">
          Powered by <span className="font-semibold text-[var(--color-primary)]">Cognifera</span>
        </p>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}
