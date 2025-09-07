"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { loginUser, registerUser, getDashboardUrl } from "@/lib/auth";
import { toast } from "sonner";

interface AuthDialogProps {
  children: React.ReactNode;
  defaultMode?: "login" | "register";
}

export const AuthDialog = ({ children, defaultMode = "register" }: AuthDialogProps) => {
  const [isLogin, setIsLogin] = useState(defaultMode === "login");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let user;
      if (isLogin) {
        user = await loginUser(formData.email, formData.password);
      } else {
        user = await registerUser(formData.name, formData.email, formData.password, formData.confirmPassword);
      }

      console.log(`User logged in with role: ${user.role}`);
      
      // Show appropriate success message and redirect
      const dashboardUrl = getDashboardUrl(user.role);
      console.log(`Redirecting to: ${dashboardUrl}`);
      
      if (user.role === "CLIENT") {
        // For CLIENT, stay on current page but refresh to update navbar
        toast.success(`Selamat datang kembali, ${user.name}! 🎉`);
        setTimeout(() => window.location.reload(), 1500);
      } else {
        // For other roles, redirect to their dashboard
        toast.success(`Selamat datang, ${user.name}! Mengarahkan ke dashboard... 🎉`);
        setTimeout(() => {
          window.location.href = dashboardUrl;
        }, 1500);
      }
      
      setOpen(false);
    } catch (err) {
      console.error('AuthDialog error:', err);
      const errorMessage = err instanceof Error ? err.message : "Terjadi kesalahan";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-none">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img
              src="/logo.png"
              alt="Logo Cognifera"
              width={40}
              height={40}
            />
          </div>
          <DialogTitle className="text-xl font-semibold">
            {isLogin ? "Masuk ke Akun Anda" : "Buat Akun Baru"}
          </DialogTitle>
          <DialogDescription>
            {isLogin 
              ? "Selamat datang kembali! Silakan masuk ke akun Anda."
              : "Bergabunglah dengan kami dan nikmati layanan terbaik."
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Nama Lengkap</label>
              <Input 
                placeholder="Masukkan nama lengkap Anda" 
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required={!isLogin}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input 
              type="email" 
              placeholder="Masukkan email Anda"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Kata Sandi</label>
            <Input 
              type="password" 
              placeholder="Masukkan kata sandi Anda"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              required
            />
          </div>
          
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Konfirmasi Kata Sandi</label>
              <Input 
                type="password" 
                placeholder="Konfirmasi kata sandi Anda"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                required={!isLogin}
              />
            </div>
          )}
          
          <Button 
            type="submit"
            className="w-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90"
            disabled={loading}
          >
            {loading ? "Processing..." : (isLogin ? "Masuk" : "Daftar")}
          </Button>
        </form>
          
        <Separator />
        
        <div className="text-center text-sm">
          <span className="text-muted-foreground">
            {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}
          </span>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-[var(--color-primary)] hover:underline font-medium"
          >
            {isLogin ? "Daftar di sini" : "Masuk di sini"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
