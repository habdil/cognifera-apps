"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search, User, ArrowLeft, LogOut } from "lucide-react";
import { AuthDialog } from "@/components/shared/AuthDialog";
import { getCurrentUser, logoutUser, type User as UserType } from "@/lib/auth";
import { toast } from "sonner";
import { journalSocialConfig } from "@/lib/journal-social-config";

interface JournalSocialHeaderProps {
  activeItem?: string;
}

export default function JournalSocialHeader({ activeItem = "home" }: JournalSocialHeaderProps) {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Berhasil logout! Sampai jumpa lagi! 👋");
      setUser(null);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error("Logout gagal, tapi data lokal sudah dihapus");
      setUser(null);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const getNavItemClass = (item: string) => {
    return item === activeItem 
      ? "text-[var(--color-foreground)] hover:text-[var(--color-primary)] font-medium py-2 transition-colors border-b-2 border-[var(--color-primary)]"
      : "text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] py-2 transition-colors";
  };

  return (
    <header className="bg-white border-b border-[var(--color-border)]">
      {/* Top Navigation Bar */}
      <div className="bg-[var(--color-primary)] text-white py-2" style={{ backgroundColor: journalSocialConfig.colors.primary }}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link 
              href={journalSocialConfig.topNavigation.backLink.href} 
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">{journalSocialConfig.topNavigation.backLink.text}</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {journalSocialConfig.topNavigation.rightLinks.map((link, index) => (
              <Link 
                key={index}
                href={link.href} 
                className="text-sm hover:opacity-80 transition-opacity"
              >
                {link.text}
              </Link>
            ))}
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-1 bg-white/20 rounded-full">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <User className="w-3 h-3 text-[var(--color-primary)]" />
                  </div>
                  <span className="text-sm font-medium text-white">{user.name}</span>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <AuthDialog defaultMode="login">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white">
                  <User className="w-4 h-4 mr-1" />
                  Login
                </Button>
              </AuthDialog>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
            {/* Journal Title */}
            <div className="flex items-center space-x-4">
              {journalSocialConfig.logo.type === "image" ? (
                <div className="flex-shrink-0">
                  <Image
                    src={journalSocialConfig.logo.value}
                    alt="Journal Logo"
                    width={journalSocialConfig.logo.size || 64}
                    height={journalSocialConfig.logo.size || 64}
                    className="object-contain"
                  />
                </div>
              ) : (
                <div 
                  className="w-16 h-16 bg-[var(--color-primary)] rounded-xl flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: journalSocialConfig.colors.primary }}
                >
                  <span className="text-2xl font-bold text-white">
                    {journalSocialConfig.logo.value.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <Link href="/journal-social">
                  <h1 className="text-2xl lg:text-3xl font-bold text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-colors cursor-pointer">
                    {journalSocialConfig.title}
                  </h1>
                </Link>
                <p className="text-[var(--color-muted-foreground)] text-lg">
                  {journalSocialConfig.subtitle}
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md w-full lg:w-auto">
              <input
                placeholder={journalSocialConfig.searchPlaceholder}
                className="w-full px-4 py-3 pr-12 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--color-muted-foreground)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-[var(--color-border)] bg-[var(--color-muted)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center space-x-8 py-4">
            {journalSocialConfig.navigation.map((navItem, index) => {
              if (navItem.type === "button") {
                return (
                  <Link
                    key={index}
                    href={navItem.href}
                    className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-primary)]/90 transition-colors font-medium"
                    style={{ backgroundColor: journalSocialConfig.colors.primary }}
                  >
                    {navItem.label}
                  </Link>
                );
              }
              
              // Convert label to activeItem key for compatibility
              const itemKey = navItem.label.toLowerCase().replace(/\s+/g, "");
              const isActive = activeItem === itemKey || 
                              (navItem.href === "/journal-social" && activeItem === "home") ||
                              (navItem.href === "/journal-social/about" && activeItem === "about") ||
                              (navItem.href === "/journal-social/current" && activeItem === "current") ||
                              (navItem.href === "/journal-social/archives" && activeItem === "archives") ||
                              (navItem.href === "/journal-social/editorial" && activeItem === "editorial");
              
              return (
                <Link
                  key={index}
                  href={navItem.href}
                  className={isActive
                    ? "text-[var(--color-foreground)] hover:text-[var(--color-primary)] font-medium py-2 transition-colors border-b-2 border-[var(--color-primary)]"
                    : "text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] py-2 transition-colors"
                  }
                >
                  {navItem.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}