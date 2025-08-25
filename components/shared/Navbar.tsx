"use client";

import { useState } from "react";
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

export const Navbar = () => {
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Beranda", link: "#hero" },
    { name: "Tentang", link: "#about" },
    { name: "Layanan", link: "#layanan" },
    { name: "Promo", link: "#promo" },
    { name: "Testimonial", link: "#testimonial" },
    { name: "Berita", link: "#berita" },
    { name: "Kontak", link: "#contact" },
  ];

  return (
    <RootNavbar>
      {/* Navbar Desktop */}
      <NavBody>
        {/* Logo */}
        <a
          href="#hero"
          className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1"
        >
          <img
            src="/logo.png"
            alt="Logo Cognifera"
            width={40}
            height={40}
          />
        </a>

        {/* Menu utama dengan dropdown */}
        <Menu setActive={setActive}>
          <MenuItem setActive={setActive} active={active} item="Tentang">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="#about">Profil</HoveredLink>
              <HoveredLink href="#layanan">Visi & Misi</HoveredLink>
              <HoveredLink href="#team">Tim Kami</HoveredLink>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Layanan">
            <div className="grid grid-cols-2 gap-6 p-2">
              <ProductItem
                title="Konsultasi"
                description="Layanan konsultasi AI & teknologi"
                href="#layanan"
                src="https://placehold.co/140x70"
              />
              <ProductItem
                title="Workshop"
                description="Pelatihan untuk pelajar & profesional"
                href="#layanan"
                src="https://placehold.co/140x70"
              />
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Berita">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="#berita">Artikel</HoveredLink>
              <HoveredLink href="#promo">Promo</HoveredLink>
            </div>
          </MenuItem>
        </Menu>

        {/* CTA */}
        <div className="flex items-center space-x-4">
          <NavbarButton
            href="#contact"
            variant="primary"
            className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
          >
            Hubungi Kami
          </NavbarButton>
        </div>
      </NavBody>

      {/* Navbar Mobile */}
      <MobileNav>
        <MobileNavHeader>
          {/* Logo */}
          <a href="#hero" className="flex items-center space-x-2">
            <img
              src="/Logo-Cognifera.svg"
              alt="Logo Cognifera"
              width={32}
              height={32}
            />
            <span className="font-semibold text-[var(--color-foreground)]">
              Cognifera
            </span>
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
              className="w-full rounded-md px-4 py-2 text-base font-medium text-[var(--color-foreground)] hover:bg-[var(--color-muted)]"
              onClick={() => setMobileOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <NavbarButton
            href="#contact"
            variant="primary"
            className="w-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
          >
            Hubungi Kami
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </RootNavbar>
  );
};
