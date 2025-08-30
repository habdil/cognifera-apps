"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";

interface DashboardWrapperProps {
  title: string;
  requiredRole: string;
  children: React.ReactNode;
}

export const DashboardWrapper = ({ title, requiredRole, children }: DashboardWrapperProps) => {
  const { user, loading, error } = useAuth(requiredRole);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto mb-4"></div>
          <p className="text-gray-600">Memverifikasi akses...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Akses Ditolak</h2>
          <p className="text-gray-600">Anda akan dialihkan ke halaman utama...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout 
      title={title}
      userRole={user.role}
      userName={user.name}
    >
      {children}
    </DashboardLayout>
  );
};