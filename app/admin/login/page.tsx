import { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Login Admin",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 mb-8">
          <Image src="/logo.png" alt="Logo Cognifera" width={36} height={36} />
          <div>
            <p className="font-bold text-gray-950 leading-tight">Cognifera Admin</p>
            <p className="text-xs text-gray-400">Masuk untuk mengelola konten</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-8">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
