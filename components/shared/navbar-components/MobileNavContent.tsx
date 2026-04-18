"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, ChevronDown, ChevronUp, type LucideIcon } from "lucide-react";
import type { NewUser } from "@/lib/auth-new";

interface DropdownItem {
  label: string;
  href: string | null;
  icon: LucideIcon;
  action: (() => void) | null;
}

interface MobileNavContentProps {
  user: NewUser | null;
  expandedMenu: string | null;
  onToggleMenu: (menu: string) => void;
  onCloseMobile: () => void;
  onLogout: () => void;
  dropdownItems: DropdownItem[];
}

export const MobileNavContent = ({
  user,
  expandedMenu,
  onToggleMenu,
  onCloseMobile,
  onLogout,
  dropdownItems
}: MobileNavContentProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

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
              All News
            </Link>
            {/* <Link href="/news?category=industry" className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white" onClick={onCloseMobile}>
              Industry News
            </Link> */}
            <Link href="/news?category=research" className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white" onClick={onCloseMobile}>
              Research News
            </Link>
            <Link href="/news?category=company" className="block w-full rounded-md px-4 py-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-white" onClick={onCloseMobile}>
              Company News
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

      {/* User Section */}
      {user ? (
        <div className="w-full space-y-3">
          {/* User Info */}
          <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={user.avatar_url || ''}
                alt={user.full_name}
              />
              <AvatarFallback className="bg-[var(--color-primary)] text-white text-sm">
                {getInitials(user.full_name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">{user.full_name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          </div>

          {/* Menu Items */}
          {dropdownItems.map((item, index) => {
            const IconComponent = item.icon;

            if (item.action) {
              return (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => {
                    item.action?.();
                    onCloseMobile();
                  }}
                  className="flex items-center space-x-3 w-full p-3 text-sm text-gray-700 bg-white rounded-lg border hover:bg-gray-50 transition-colors text-left justify-start h-auto"
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              );
            }

            return (
              <Link
                key={index}
                href={item.href || '#'}
                className="flex items-center space-x-3 w-full p-3 text-sm text-gray-700 bg-white rounded-lg border hover:bg-gray-50 transition-colors"
                onClick={onCloseMobile}
              >
                <IconComponent className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Logout */}
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full flex items-center justify-center space-x-2 text-red-600 border-red-200 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>
      ) : (
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
      )}
    </>
  );
};