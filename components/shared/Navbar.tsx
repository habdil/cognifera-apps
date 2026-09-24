"use client";

import { useState } from "react";
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

import { NavMenuSections, MobileNavContent } from "./navbar-components";

export const Navbar = () => {
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);

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
          <div className="flex items-center">
            <a
              href="https://wa.me/message/VRRB5IFQ7LQ4A1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary/90 text-white px-5 py-2 text-sm font-medium tracking-wide transition-colors"
            >
              Konsultasi Sekarang
            </a>
          </div>
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
            expandedMenu={expandedMobileMenu}
            onToggleMenu={(menu: string) => setExpandedMobileMenu(expandedMobileMenu === menu ? null : menu)}
            onCloseMobile={() => setMobileOpen(false)}
          />
        </MobileNavMenu>
      </MobileNav>
    </RootNavbar>
  );
};
