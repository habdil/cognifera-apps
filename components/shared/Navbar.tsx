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
    { name: "Home", link: "/" },
    { name: "About", link: "/#about" },
    { name: "Services", link: "/#services" },
    { name: "Publications", link: "/#publications" },
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
              <HoveredLink href="#research-journals">Research Journals</HoveredLink>
              <HoveredLink href="#community-service-journals">Community Service Journals</HoveredLink>
              <HoveredLink href="#books">Books</HoveredLink>
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
          <NavbarButton
            href="/#contacts"
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
          <a href="/" className="flex items-center space-x-2">
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
            href="/#contacts"
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
