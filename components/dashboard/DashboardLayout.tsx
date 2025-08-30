"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogOut, User } from "lucide-react";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  userRole: string;
  userName?: string;
}

export const DashboardLayout = ({ 
  children, 
  title, 
  userRole,
  userName = "User" 
}: DashboardLayoutProps) => {
  const handleLogout = async () => {
    try {
      const { logoutUser } = await import("@/lib/auth");
      await logoutUser();
      toast.success("Berhasil logout! Sampai jumpa lagi! 👋");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error("Logout gagal, tapi akan tetap diarahkan ke homepage");
      // Even if API call fails, redirect to home
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r">
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <img
              src="/logo.png"
              alt="Logo Cognifera"
              width={32}
              height={32}
            />
            <div>
              <h2 className="font-semibold text-lg">Cognifera</h2>
              <p className="text-sm text-gray-500">{title}</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{userName}</p>
              <p className="text-xs text-gray-500 truncate">{userRole.replace('_', ' ')}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Navigation - Simple for now */}
        <div className="p-4">
          <nav className="space-y-2">
            <div className="px-3 py-2 text-sm font-medium text-gray-600">
              Dashboard
            </div>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};