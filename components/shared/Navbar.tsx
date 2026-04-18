"use client";

import { useState, useEffect } from "react";
import {
  Navbar as RootNavbar,
  NavBody,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "@/components/ui/resizable-navbar";
import Image from "next/image";
import Link from "next/link";

import { newGetCurrentUser, newLogoutUser, type NewUser } from "@/lib/auth-new";
import { authEvents } from "@/lib/events/auth-events";
import { Settings } from "lucide-react";
import { toast } from "sonner";
import { SavedNewsModal } from "@/components/dashboard/modal";
import { UserDropdown, NavMenuSections, MobileNavContent } from "./navbar-components";

export const Navbar = () => {
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<NewUser | null>(null);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showSavedNewsModal, setShowSavedNewsModal] = useState(false);

  useEffect(() => {
    setUser(newGetCurrentUser());

    // Listen to auth events for real-time updates
    const handleUserUpdated = () => {
      const updatedUser = newGetCurrentUser();
      setUser(updatedUser);
    };

    const handleUserLoggedOut = () => {
      setUser(null);
    };

    authEvents.on('user-updated', handleUserUpdated);
    authEvents.on('user-logged-out', handleUserLoggedOut);

    return () => {
      authEvents.off('user-updated', handleUserUpdated);
      authEvents.off('user-logged-out', handleUserLoggedOut);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserDropdown && !(event.target as Element).closest('.relative')) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserDropdown]);

  const handleLogout = async () => {
    try {
      await newLogoutUser();
      toast.success("Berhasil logout! Sampai jumpa lagi! 👋");
      setUser(null);
      setShowUserDropdown(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error("Logout gagal, tapi data lokal sudah dihapus");
      setUser(null);
      setShowUserDropdown(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const getUserDropdownItems = (userRole: string) => {
    switch (userRole) {
      case 'READER':
      case 'CLIENT':
        return [
          // {
          //   label: 'Terbitkan Buku',
          //   href: '/dashboard/reader',
          //   icon: BookOpen,
          //   action: null
          // },
          // {
          //   label: 'Berita Tersimpan',
          //   href: null,
          //   icon: Heart,
          //   action: () => setShowSavedNewsModal(true)
          // }
        ];
      case 'AUTHOR':
        return [
          {
            label: 'Dashboard',
            href: '/dashboard/author',
            icon: Settings,
            action: null
          }
        ];
      case 'ADMIN':
        return [
          {
            label: 'Dashboard Admin',
            href: '/dashboard/admin',
            icon: Settings,
            action: null
          }
        ];
      default:
        return [];
    }
  };

  return (
    <RootNavbar>
      {/* Navbar Desktop */}
      <NavBody>
        {/* Logo */}
        <Link
          href="/"
          className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1"
        >
          <Image
            src="/logo.png"
            alt="Logo Cognifera"
            width={30}
            height={30}
          />
        </Link>

        {/* Menu utama dengan dropdown */}
        <NavMenuSections active={active} setActive={setActive} />

        {/* CTA */}
        <div className="flex items-center space-x-4">
          {user ? (
            <UserDropdown
              user={user}
              showDropdown={showUserDropdown}
              onToggleDropdown={() => setShowUserDropdown(!showUserDropdown)}
              onLogout={handleLogout}
              dropdownItems={getUserDropdownItems(user.role)}
              onCloseDropdown={() => setShowUserDropdown(false)}
            />
          ) : (
            <div className="flex items-center">
              {/* <AuthDialog defaultMode="login">
                <Button
                  variant="ghost"
                  className="text-gray-600 hover:text-black hover:bg-gray-100 flex items-center space-x-2 rounded-none text-sm tracking-wide h-16 px-4"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Login</span>
                </Button>
              </AuthDialog> */}
              <a
                href="https://wa.me/message/VRRB5IFQ7LQ4A1"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/90 text-white px-5 py-2 text-sm font-medium tracking-wide transition-colors"
              >
                Konsultasi Sekarang
              </a>
            </div>
          )}
        </div>
      </NavBody>

      {/* Navbar Mobile */}
      <MobileNav>
        <MobileNavHeader>
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Logo Cognifera"
              width={32}
              height={32}
            />
          </Link>

          {/* Toggle */}
          <MobileNavToggle
            isOpen={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
          />
        </MobileNavHeader>

        {/* Mobile menu */}
        <MobileNavMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)}>
          <MobileNavContent
            user={user}
            expandedMenu={expandedMobileMenu}
            onToggleMenu={(menu: string) => setExpandedMobileMenu(expandedMobileMenu === menu ? null : menu)}
            onCloseMobile={() => setMobileOpen(false)}
            onLogout={handleLogout}
            dropdownItems={user ? getUserDropdownItems(user.role) : []}
          />
        </MobileNavMenu>
      </MobileNav>

      {/* Saved News Modal */}
      <SavedNewsModal
        open={showSavedNewsModal}
        onOpenChange={setShowSavedNewsModal}
      />
    </RootNavbar>
  );
};