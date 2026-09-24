"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MobileNavContentProps {
  expandedMenu: string | null;
  onToggleMenu: (menu: string) => void;
  onCloseMobile: () => void;
}

export const MobileNavContent = ({
  expandedMenu,
  onToggleMenu,
  onCloseMobile
}: MobileNavContentProps) => {
  return (
    <>
      {/* Home */}
      <Link
        href="/"
        className="w-full rounded-md px-4 py-2 text-base font-medium text-[var(--color-foreground)] hover:text-[var(--color-primary)]"
        onClick={onCloseMobile}
      >
        Home
      </Link>

      {/* About Section */}
      <div className="w-full">
        <Button
          variant="ghost"
          onClick={() => onToggleMenu('about')}
          className="w-full flex items-center justify-between px-4 py-2 text-base font-medium text-[var(--color-foreground)] border-b border-gray-200 hover:bg-gray-50 h-auto rounded-none"
        >
          <span>About</span>
          {expandedMenu === 'about' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {expandedMenu === 'about' && (
          <div className="pl-6 py-1 space-y-1 bg-gray-50">
            <Link href="/profile" className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white" onClick={onCloseMobile}>
              Profile
            </Link>
            <Link href="/visi-misi" className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white" onClick={onCloseMobile}>
              Visi dan Misi
            </Link>
            <Link href="/our-team" className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white" onClick={onCloseMobile}>
              Our Team
            </Link>
          </div>
        )}
      </div>

      {/* Services Section */}
      <div className="w-full">
        <Button
          variant="ghost"
          onClick={() => onToggleMenu('services')}
          className="w-full flex items-center justify-between px-4 py-2 text-base font-medium text-[var(--color-foreground)] border-b border-gray-200 hover:bg-gray-50 h-auto rounded-none"
        >
          <span>Services</span>
          {expandedMenu === 'services' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {expandedMenu === 'services' && (
          <div className="pl-6 py-1 space-y-1 bg-gray-50">
            <Link href="/#layanan" className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white" onClick={onCloseMobile}>
              FERADATA
            </Link>
            <Link href="/#layanan" className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white" onClick={onCloseMobile}>
              FERAGUIDE
            </Link>
            <Link href="/#layanan" className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white" onClick={onCloseMobile}>
              FERAPUB
            </Link>
            <Link href="/#layanan" className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white" onClick={onCloseMobile}>
              FERAGRANT
            </Link>
          </div>
        )}
      </div>

      {/* Publications Section */}
      <div className="w-full">
        <Button
          variant="ghost"
          onClick={() => onToggleMenu('publications')}
          className="w-full flex items-center justify-between px-4 py-2 text-base font-medium text-[var(--color-foreground)] border-b border-gray-200 hover:bg-gray-50 h-auto rounded-none"
        >
          <span>Publications</span>
          {expandedMenu === 'publications' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {expandedMenu === 'publications' && (
          <div className="pl-6 py-1 space-y-1 bg-gray-50">
            <Link href="/publications" className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white" onClick={onCloseMobile}>
              Books
            </Link>
            <a href="https://journal.cognifera.web.id/" className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white" onClick={onCloseMobile} target="_blank" rel="noopener noreferrer">
              Journals ↗
            </a>
          </div>
        )}
      </div>

      {/* News Section */}
      <div className="w-full">
        <Button
          variant="ghost"
          onClick={() => onToggleMenu('news')}
          className="w-full flex items-center justify-between px-4 py-2 text-base font-medium text-[var(--color-foreground)] border-b border-gray-200 hover:bg-gray-50 h-auto rounded-none"
        >
          <span>News</span>
          {expandedMenu === 'news' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {expandedMenu === 'news' && (
          <div className="pl-6 py-1 space-y-1 bg-gray-50">
            <Link href="/news" className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white" onClick={onCloseMobile}>
              Semua Berita
            </Link>
            <Link href="/news?category=company" className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white" onClick={onCloseMobile}>
              Berita Perusahaan
            </Link>
            <Link href="/news?category=research" className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white" onClick={onCloseMobile}>
              Riset &amp; Publikasi
            </Link>
            <Link href="/news?category=announcement" className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white" onClick={onCloseMobile}>
              Pengumuman
            </Link>
            <Link href="/news?category=tips" className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white" onClick={onCloseMobile}>
              Tips &amp; Panduan
            </Link>
          </div>
        )}
      </div>

      {/* Contacts */}
      <Link
        href="https://api.whatsapp.com/send/?phone=6285920173338&text=Halo%21+Saya+tertarik+dengan+layanan+Cognifera.+Bisa+tolong+berikan+informasi+lebih+lanjut%3F&type=phone_number&app_absent=0"
        className="w-full rounded-md px-4 py-2 text-base font-medium text-[var(--color-foreground)] hover:text-[var(--color-primary)]"
        onClick={onCloseMobile}
      >
        Contacts
      </Link>

      {/* CTA */}
      <div className="w-full">
        <a
          href="https://wa.me/message/VRRB5IFQ7LQ4A1"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-primary hover:bg-primary/90 text-white text-center py-3 text-sm font-medium tracking-wide transition-colors"
          onClick={onCloseMobile}
        >
          Konsultasi Sekarang
        </a>
      </div>
    </>
  );
};