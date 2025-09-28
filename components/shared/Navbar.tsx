/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useState, useEffect } from "react";
import {
  Navbar as RootNavbar,
  NavBody,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "@/components/ui/resizable-navbar";

import {
  Menu,
  MenuItem,
  HoveredLink,
  SecondaryMenuProvider,
} from "@/components/ui/navbar-menu";

import { AuthDialog } from "@/components/shared/AuthDialog";
import { getCurrentUser, logout, type UnifiedUser } from "@/lib/auth-config";
import { Button } from "@/components/ui/button";
import { User as UserIcon, LogOut, ChevronDown, ChevronUp, BookOpen, Heart, Settings } from "lucide-react";
import { toast } from "sonner";

export const Navbar = () => {
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<UnifiedUser | null>(null);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
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
      await logout();
      toast.success("Berhasil logout! Sampai jumpa lagi! 👋");
      setUser(null);
      setShowUserDropdown(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error("Logout gagal, tapi data lokal sudah dihapus");
      // Even if API call fails, clear local data
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
          {
            label: 'Berita Tersimpan',
            href: '/dashboard/reader/saved-news',
            icon: Heart
          },
          {
            label: 'Terbitkan Buku',
            href: '/dashboard/reader/publish-book',
            icon: BookOpen
          }
        ];
      case 'AUTHOR':
        return [
          {
            label: 'Dashboard',
            href: '/dashboard/author',
            icon: Settings
          }
        ];
      case 'ADMIN':
        return [
          {
            label: 'Dashboard Admin',
            href: '/dashboard/admin',
            icon: Settings
          }
        ];
      default:
        return [];
    }
  };

  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/#about" },
    { name: "Services", link: "/#services" },
    { name: "Publications", link: "/publications" },
    { name: "News", link: "/news" },
    { name: "Contacts", link: "/#contacts" },
  ];

  return (
    <RootNavbar>
      {/* Navbar Desktop */}
      <NavBody>
        {/* Logo */}
        <a
          href="/"
          className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1"
        >
          <img
            src="/logo.png"
            alt="Logo Cognifera"
            width={30}
            height={30}
          />
        </a>

        {/* Menu utama dengan dropdown */}
        <Menu setActive={setActive}>
          <MenuItem setActive={setActive} active={active} item="About">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/profile">Profile</HoveredLink>
              <HoveredLink href="/visi-misi">Visi dan Misi</HoveredLink>
              <HoveredLink href="/our-team">Our Team</HoveredLink>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Services">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/services/feradata">FERADATA</HoveredLink>
              <HoveredLink href="/services/feraguide">FERAGUIDE</HoveredLink>
              <HoveredLink href="/services/ferapub">FERAPUB</HoveredLink>
              <HoveredLink href="/services/feragrant">FERAGRANT</HoveredLink>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Publications">
            <SecondaryMenuProvider>
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/publications">All Publications</HoveredLink>
                <HoveredLink 
                  href="/publications?section=books"
                >
                  Books
                </HoveredLink>
                <HoveredLink 
                  href="/publications"
                  subItems={[
                    { title: "Global Journal of Science Education", href: "/journal", description: "International journal focused on science education research and methodology" },
                    { title: "Journal of Social Responsibility and Service", href: "/journal-social", description: "Community service and social responsibility research publications" },
                    { title: "Journal Al-Musannif", href: "https://ojs.cognifera.web.id", description: "Islamic studies and scholarly research journal" }
                  ]}
                >
                  Journals
                </HoveredLink>
              </div>
            </SecondaryMenuProvider>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="News">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/news">All News</HoveredLink>
              <HoveredLink href="/news?category=industry">Industry News</HoveredLink>
              <HoveredLink href="/news?category=research">Research News</HoveredLink>
              <HoveredLink href="/news?category=company">Company News</HoveredLink>
            </div>
          </MenuItem>
        </Menu>

        {/* CTA */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <div className="w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium">{user.fullName || user.name}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showUserDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {/* User Info */}
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user.fullName || user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    <p className="text-xs text-gray-400">{user.role}</p>
                  </div>

                  {/* Menu Items */}
                  {getUserDropdownItems(user.role).map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <a
                        key={index}
                        href={item.href}
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span>{item.label}</span>
                      </a>
                    );
                  })}

                  {/* Logout */}
                  <div className="border-t border-gray-100 mt-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <AuthDialog defaultMode="login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[var(--color-foreground)] hover:text-[var(--color-primary)] flex items-center space-x-2"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Login</span>
                </Button>
              </AuthDialog>
              <AuthDialog>
                <NavbarButton
                  variant="primary"
                  className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] cursor-pointer"
                >
                  Get Started
                </NavbarButton>
              </AuthDialog>
            </div>
          )}
        </div>
      </NavBody>

      {/* Navbar Mobile */}
      <MobileNav>
        <MobileNavHeader>
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="Logo Cognifera"
              width={32}
              height={32}
            />
          </a>

          {/* Toggle */}
          <MobileNavToggle
            isOpen={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
          />
        </MobileNavHeader>

        {/* Mobile menu */}
        <MobileNavMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)}>
          {/* Home */}
          <a
            href="/"
            className="w-full rounded-md px-4 py-2 text-base font-medium text-[var(--color-foreground)] hover:text-[var(--color-primary)]"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </a>

          {/* About Section with Sub-items */}
          <div className="w-full">
            <button
              onClick={() => setExpandedMobileMenu(expandedMobileMenu === 'about' ? null : 'about')}
              className="w-full flex items-center justify-between px-4 py-2 text-base font-medium text-[var(--color-foreground)] border-b border-gray-200 hover:bg-gray-50"
            >
              <span>About</span>
              {expandedMobileMenu === 'about' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {expandedMobileMenu === 'about' && (
              <div className="pl-6 py-1 space-y-1 bg-gray-50">
                <a
                  href="/profile"
                  className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Profile
                </a>
                <a
                  href="/visi-misi"
                  className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Visi dan Misi
                </a>
                <a
                  href="/our-team"
                  className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Our Team
                </a>
              </div>
            )}
          </div>

          {/* Services Section with Sub-items */}
          <div className="w-full">
            <button
              onClick={() => setExpandedMobileMenu(expandedMobileMenu === 'services' ? null : 'services')}
              className="w-full flex items-center justify-between px-4 py-2 text-base font-medium text-[var(--color-foreground)] border-b border-gray-200 hover:bg-gray-50"
            >
              <span>Services</span>
              {expandedMobileMenu === 'services' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {expandedMobileMenu === 'services' && (
              <div className="pl-6 py-1 space-y-1 bg-gray-50">
                <a
                  href="/services/feradata"
                  className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white"
                  onClick={() => setMobileOpen(false)}
                >
                  FERADATA
                </a>
                <a
                  href="/services/feraguide"
                  className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white"
                  onClick={() => setMobileOpen(false)}
                >
                  FERAGUIDE
                </a>
                <a
                  href="/services/ferapub"
                  className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white"
                  onClick={() => setMobileOpen(false)}
                >
                  FERAPUB
                </a>
                <a
                  href="/services/feragrant"
                  className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white"
                  onClick={() => setMobileOpen(false)}
                >
                  FERAGRANT
                </a>
              </div>
            )}
          </div>

          {/* Publications Section with Sub-items */}
          <div className="w-full">
            <button
              onClick={() => setExpandedMobileMenu(expandedMobileMenu === 'publications' ? null : 'publications')}
              className="w-full flex items-center justify-between px-4 py-2 text-base font-medium text-[var(--color-foreground)] border-b border-gray-200 hover:bg-gray-50"
            >
              <span>Publications</span>
              {expandedMobileMenu === 'publications' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {expandedMobileMenu === 'publications' && (
              <div className="pl-6 py-1 space-y-1 bg-gray-50">
                <a
                  href="/publications"
                  className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white"
                  onClick={() => setMobileOpen(false)}
                >
                  All Publications
                </a>
                <a
                  href="/publications?section=books"
                  className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Books
                </a>
                <a
                  href="/publications?section=journals"
                  className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Journals
                </a>
                <a
                  href="https://ojs.cognifera.web.id"
                  className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white"
                  onClick={() => setMobileOpen(false)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Journal Al-Musannif ↗
                </a>
              </div>
            )}
          </div>

          {/* News Section with Sub-items */}
          <div className="w-full">
            <button
              onClick={() => setExpandedMobileMenu(expandedMobileMenu === 'news' ? null : 'news')}
              className="w-full flex items-center justify-between px-4 py-2 text-base font-medium text-[var(--color-foreground)] border-b border-gray-200 hover:bg-gray-50"
            >
              <span>News</span>
              {expandedMobileMenu === 'news' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {expandedMobileMenu === 'news' && (
              <div className="pl-6 py-1 space-y-1 bg-gray-50">
                <a
                  href="/news"
                  className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white"
                  onClick={() => setMobileOpen(false)}
                >
                  All News
                </a>
                <a
                  href="/news?category=industry"
                  className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Industry News
                </a>
                <a
                  href="/news?category=research"
                  className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Research News
                </a>
                <a
                  href="/news?category=company"
                  className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Company News
                </a>
              </div>
            )}
          </div>

          {/* Contacts */}
          <a
            href="/#contacts"
            className="w-full rounded-md px-4 py-2 text-base font-medium text-[var(--color-foreground)] hover:text-[var(--color-primary)]"
            onClick={() => setMobileOpen(false)}
          >
            Contacts
          </a>
          {user ? (
            <div className="w-full space-y-3">
              {/* User Info */}
              <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg">
                <div className="w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{user.fullName || user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </div>

              {/* Menu Items */}
              {getUserDropdownItems(user.role).map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center space-x-3 w-full p-3 text-sm text-gray-700 bg-white rounded-lg border hover:bg-gray-50 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.label}</span>
                  </a>
                );
              })}

              {/* Logout */}
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full flex items-center justify-center space-x-2 text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <div className="w-full space-y-3">
              <AuthDialog defaultMode="login">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Login</span>
                </Button>
              </AuthDialog>
              <AuthDialog>
                <NavbarButton
                  variant="primary"
                  className="w-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] cursor-pointer"
                >
                  Get Started
                </NavbarButton>
              </AuthDialog>
            </div>
          )}
        </MobileNavMenu>
      </MobileNav>
    </RootNavbar>
  );
};
