"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Loader2, Mail, AlertCircle } from "lucide-react";
import { verifyEmail, isNewAuthSystem, getDashboardUrl } from "@/lib/auth-config";
import { toast } from "sonner";
import Image from "next/image";

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
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Image
                src="/logo.png"
                alt="Logo Cognifera"
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
            <CardTitle className="text-2xl">Verifikasi Email</CardTitle>
            <CardDescription>
              {status === 'loading' && 'Memverifikasi email Anda...'}
              {status === 'success' && 'Email berhasil diverifikasi!'}
              {status === 'error' && 'Verifikasi gagal'}
              {status === 'instructions' && 'Cek email Anda'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {status === 'loading' && (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-16 w-16 text-primary animate-spin" />
                <p className="text-muted-foreground text-sm">
                  Mohon tunggu sebentar...
                </p>
              </div>
            )}

            {status === 'success' && (
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <p className="text-foreground">
                  Email Anda telah berhasil diverifikasi! Anda akan diarahkan ke dashboard dalam beberapa detik.
                </p>
              </div>
            )}

            {status === 'error' && (
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-full bg-destructive/10 p-3">
                  <XCircle className="h-12 w-12 text-destructive" />
                </div>
                <p className="text-destructive font-medium">
                  Verifikasi email gagal. Link mungkin sudah kedaluwarsa atau tidak valid.
                </p>
                <div className="bg-muted border border-border rounded-lg p-4 text-left w-full">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="space-y-1">
                      <p className="font-semibold text-foreground text-sm">Apa yang harus dilakukan:</p>
                      <ul className="text-muted-foreground text-sm space-y-1">
                        <li>• Periksa apakah link sudah kedaluwarsa</li>
                        <li>• Coba mendaftar ulang untuk mendapatkan email verifikasi baru</li>
                        <li>• Hubungi support jika masalah berlanjut</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {status === 'instructions' && (
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Mail className="h-12 w-12 text-primary" />
                </div>
                <p className="text-muted-foreground">
                  Silakan cek email Anda untuk mendapatkan link verifikasi akun.
                </p>

                <div className="bg-muted border border-border rounded-lg p-4 text-left w-full">
                  <h3 className="font-semibold text-foreground mb-2">Langkah selanjutnya:</h3>
                  <ul className="text-muted-foreground text-sm space-y-1">
                    <li>• Buka email Anda</li>
                    <li>• Cari email dari Cognifera</li>
                    <li>• Klik link verifikasi di dalam email</li>
                    <li>• Jika tidak ada, periksa folder spam</li>
                  </ul>
                </div>

                <div className="text-center w-full pt-2">
                  <p className="text-muted-foreground text-sm mb-3">
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
              </div>
            )}
          </CardContent>

          <CardFooter className="border-t justify-center">
            <Button
              variant="ghost"
              onClick={() => router.push('/')}
              size="sm"
            >
              Kembali ke Homepage
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}