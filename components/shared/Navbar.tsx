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
    { name: "Home", link: "#hero" },
    { name: "About", link: "#about" },
    { name: "Services", link: "#services" },
    { name: "Publications", link: "#publications" },
    { name: "News", link: "#news" },
    { name: "Contacts", link: "#contacts" },
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
            <div className="grid grid-cols-2 gap-4 p-3 min-w-[480px]">
              <ProductItem
                title="FERADATA"
                description="Paket Analisis Data Premium"
                href="#feradata"
                src="/hero/hero-feradata.png"
              />
              <ProductItem
                title="FERAGUIDE"
                description="Paket Bimbingan Karya Tulis Ilmiah"
                href="#feraguide"
                src="/hero/hero-feraguide.png"
              />
              <ProductItem
                title="FERAPUB"
                description="Paket Publikasi Jurnal Nasional dan Internasional"
                href="#ferapub"
                src="/hero/hero-ferapub.png"
              />
              <ProductItem
                title="FERAGRANT"
                description="Paket Hibah dan Pendanaan Penelitian"
                href="#feragrant"
                src="/hero/hero-feragrant.png"
              />
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Publications">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="#research-journals">Research Journals</HoveredLink>
              <HoveredLink href="#community-service-journals">Community Service Journals</HoveredLink>
              <HoveredLink href="#books">Books</HoveredLink>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="News">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="#industry-news">Industry News</HoveredLink>
              <HoveredLink href="#research-news">Research News</HoveredLink>
              <HoveredLink href="#company-news">Company News</HoveredLink>
            </div>
          </MenuItem>
        </Menu>

        {/* CTA */}
        <div className="flex items-center space-x-4">
          <NavbarButton
            href="#contacts"
            variant="primary"
            className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
          >
            Try Now
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
            href="#contacts"
            variant="primary"
            className="w-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
          >
            Contact Us
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </RootNavbar>
  );
};
