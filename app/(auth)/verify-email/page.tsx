"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";
import { verifyEmail, isNewAuthSystem, getDashboardUrl } from "@/lib/auth-config";
import { toast } from "sonner";

function VerifyEmailContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'instructions'>('loading');
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Only proceed if using new auth system
    if (!isNewAuthSystem()) {
      router.push('/');
      return;
    }

    const token = searchParams.get('token');

    if (token) {
      verifyEmailWithToken(token);
    } else {
      setStatus('instructions');
    }
  }, [searchParams, router]);

  const verifyEmailWithToken = async (token: string) => {
    try {
      setStatus('loading');
      const user = await verifyEmail(token);

      if (user) {
        setStatus('success');
        toast.success(`Selamat! Email Anda telah berhasil diverifikasi. Selamat datang, ${user.fullName}! 🎉`);

        // Redirect to appropriate dashboard after 3 seconds
        setTimeout(() => {
          const dashboardUrl = getDashboardUrl(user.role);
          router.push(dashboardUrl);
        }, 3000);
      } else {
        throw new Error('Verifikasi gagal');
      }
    } catch (error) {
      console.error('Email verification failed:', error);
      setStatus('error');
      toast.error(error instanceof Error ? error.message : 'Verifikasi email gagal');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="/logo.png"
              alt="Logo Cognifera"
              width={60}
              height={60}
            />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Verifikasi Email
          </h1>

          {status === 'loading' && (
            <>
              <div className="flex justify-center mb-4">
                <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
              </div>
              <p className="text-gray-600 mb-4">
                Memverifikasi email Anda...
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <p className="text-gray-600 mb-4">
                Email Anda telah berhasil diverifikasi! Anda akan diarahkan ke dashboard dalam beberapa detik.
              </p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="flex justify-center mb-4">
                <XCircle className="h-12 w-12 text-red-600" />
              </div>
              <p className="text-red-600 mb-4">
                Verifikasi email gagal. Link mungkin sudah kedaluwarsa atau tidak valid.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-800 text-sm">
                  <strong>Apa yang harus dilakukan:</strong>
                  <br />
                  • Periksa apakah link sudah kedaluwarsa
                  <br />
                  • Coba mendaftar ulang untuk mendapatkan email verifikasi baru
                  <br />
                  • Hubungi support jika masalah berlanjut
                </p>
              </div>
            </>
          )}

          {status === 'instructions' && (
            <>
              <div className="flex justify-center mb-4">
                <Mail className="h-12 w-12 text-blue-600" />
              </div>
              <p className="text-gray-600 mb-6">
                Silakan cek email Anda untuk mendapatkan link verifikasi akun.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">Langkah selanjutnya:</h3>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Buka email Anda</li>
                  <li>• Cari email dari Cognifera</li>
                  <li>• Klik link verifikasi di dalam email</li>
                  <li>• Jika tidak ada, periksa folder spam</li>
                </ul>
              </div>

              <div className="text-center">
                <p className="text-gray-500 text-sm mb-4">
                  Belum menerima email?
                </p>
                <Button
                  variant="outline"
                  onClick={() => router.push('/?auth=register')}
                  className="w-full"
                >
                  Daftar Ulang untuk Email Baru
                </Button>
              </div>
            </>
          )}

          <div className="mt-6 pt-4 border-t">
            <Button
              variant="ghost"
              onClick={() => router.push('/')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Kembali ke Homepage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}