"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle, Eye, EyeOff } from "lucide-react";
import { resetPassword, isNewAuthSystem } from "@/lib/auth-config";
import { toast } from "sonner";

function ResetPasswordContent() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // If not using new auth system, redirect to home
    if (!isNewAuthSystem()) {
      router.push('/');
      return;
    }

    const tokenParam = searchParams.get('token');
    if (!tokenParam) {
      toast.error('Token reset password tidak valid');
      router.push('/forgot-password');
      return;
    }

    setToken(tokenParam);
  }, [searchParams, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error('Silakan isi semua field');
      return;
    }

    if (password.length < 8) {
      toast.error('Password minimal 8 karakter');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Konfirmasi password tidak cocok');
      return;
    }

    if (!token) {
      toast.error('Token tidak valid');
      return;
    }

    setIsSubmitting(true);

    try {
      await resetPassword(token, password);
      setIsSuccess(true);
      toast.success('Password berhasil direset! Silakan login dengan password baru Anda');
    } catch (error) {
      console.error('Reset password failed:', error);
      toast.error(error instanceof Error ? error.message : 'Gagal mereset password');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    router.push('/?auth=login');
  };

  // Show loading if token is being validated
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img
                src="/logo.png"
                alt="Logo Cognifera"
                width={60}
                height={60}
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Reset Kata Sandi
            </h1>
            <p className="text-gray-600 text-sm">
              {!isSuccess
                ? "Masukkan kata sandi baru Anda"
                : "Password berhasil direset!"
              }
            </p>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Kata Sandi Baru
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan kata sandi baru"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="w-full pr-10"
                    minLength={8}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Minimal 8 karakter
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Konfirmasi Kata Sandi
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Konfirmasi kata sandi baru"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="w-full pr-10"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Mereset Password..." : "Reset Password"}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Password Berhasil Direset!
                </h3>
                <p className="text-gray-600 text-sm">
                  Password Anda telah berhasil diubah. Silakan login dengan password baru Anda.
                </p>
              </div>

              <Button
                onClick={handleBackToLogin}
                className="w-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90"
              >
                Login Sekarang
              </Button>
            </div>
          )}

          {!isSuccess && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Button
                variant="ghost"
                onClick={handleBackToLogin}
                className="w-full flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Kembali ke Login</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}