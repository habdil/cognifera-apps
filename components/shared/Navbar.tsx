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
  ProductItem,
} from "@/components/ui/navbar-menu";

import { AuthDialog } from "@/components/shared/AuthDialog";
import { getCurrentUser, logoutUser, type User } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { User as UserIcon, LogOut } from "lucide-react";
import { toast } from "sonner";

export const Navbar = () => {
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

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
      // Even if API call fails, clear local data
      setUser(null);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
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
              <HoveredLink href="#profile">Profile</HoveredLink>
              <HoveredLink href="#vision">Visi dan Misi</HoveredLink>
              <HoveredLink href="#team">Our Team</HoveredLink>
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
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/publications">All Publications</HoveredLink>
              <HoveredLink href="https://ojs.cognifera.web.id">Journal Al-Musannif</HoveredLink>
              <HoveredLink href="/publications?section=research-journals">Research Journals</HoveredLink>
              <HoveredLink href="/publications?section=community-service-journals">Community Service Journals</HoveredLink>
              <HoveredLink href="/publications?section=books">Books</HoveredLink>
            </div>
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
          {user && user.role === "CLIENT" ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-full">
                <div className="w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
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
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="w-full rounded-md px-4 py-2 text-base font-medium text-[var(--color-foreground)] hover:text-[var(--color-primary)]"
              onClick={() => setMobileOpen(false)}
            >
              {item.name}
            </a>
          ))}
          {user && user.role === "CLIENT" ? (
            <div className="w-full space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg">
                <div className="w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full flex items-center justify-center space-x-2"
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
