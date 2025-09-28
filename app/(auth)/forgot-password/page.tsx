"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { forgotPassword, isNewAuthSystem } from "@/lib/auth-config";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  // If not using new auth system, redirect to home
  if (!isNewAuthSystem()) {
    router.push('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error('Silakan masukkan email Anda');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Format email tidak valid');
      return;
    }

    setIsSubmitting(true);

    try {
      await forgotPassword(email.trim());
      setIsSuccess(true);
      toast.success('Instruksi reset password telah dikirim ke email Anda');
    } catch (error) {
      console.error('Forgot password failed:', error);
      toast.error(error instanceof Error ? error.message : 'Gagal mengirim email reset password');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    router.push('/?auth=login');
  };

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
              Lupa Kata Sandi?
            </h1>
            <p className="text-gray-600 text-sm">
              {!isSuccess
                ? "Masukkan email Anda dan kami akan mengirimkan instruksi untuk reset kata sandi"
                : "Instruksi reset password telah dikirim"
              }
            </p>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="Masukkan email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Mail className="mr-2 h-4 w-4 animate-pulse" />
                    Mengirim Email...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Kirim Instruksi Reset
                  </>
                )}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Email Terkirim!
                </h3>
                <p className="text-gray-600 text-sm">
                  Kami telah mengirimkan instruksi reset password ke email <strong>{email}</strong>
                </p>
                <p className="text-gray-500 text-xs">
                  Silakan cek folder inbox atau spam Anda
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Belum menerima email?</strong>
                  <br />
                  • Periksa folder spam/junk
                  <br />
                  • Tunggu beberapa menit
                  <br />
                  • Pastikan email yang dimasukkan benar
                </p>
              </div>

              <Button
                onClick={() => {
                  setIsSuccess(false);
                  setEmail('');
                }}
                variant="outline"
                className="w-full"
              >
                Kirim Ulang Email
              </Button>
            </div>
          )}

          {/* Navigation */}
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
        </div>
      </div>
    </div>
  );
}