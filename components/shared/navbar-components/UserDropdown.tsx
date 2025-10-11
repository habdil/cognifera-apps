"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, ChevronDown, type LucideIcon } from "lucide-react";
import type { NewUser } from "@/lib/auth-new";

interface DropdownItem {
  label: string;
  href: string | null;
  icon: LucideIcon;
  action: (() => void) | null;
}

interface UserDropdownProps {
  user: NewUser;
  showDropdown: boolean;
  onToggleDropdown: () => void;
  onLogout: () => void;
  dropdownItems: DropdownItem[];
  onCloseDropdown: () => void;
}

export const UserDropdown = ({
  user,
  showDropdown,
  onToggleDropdown,
  onLogout,
  dropdownItems,
  onCloseDropdown
}: UserDropdownProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={onToggleDropdown}
        className="flex items-center space-x-2 px-3 py-6 rounded-full hover:bg-gray-200 transition-colors"
      >
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={user.avatar_url || ''}
            alt={user.full_name}
          />
          <AvatarFallback className="bg-[var(--color-primary)] text-white text-xs">
            {getInitials(user.full_name)}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">{user.full_name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
      </Button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={user.avatar_url || ''}
                alt={user.full_name}
              />
              <AvatarFallback className="bg-[var(--color-primary)] text-white">
                {getInitials(user.full_name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.full_name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
              <p className="text-xs text-gray-400">{user.role}</p>
            </div>
          </div>

          {/* Menu Items */}
          {dropdownItems.map((item, index) => {
            const IconComponent = item.icon;

            if (item.action) {
              return (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => {
                    item.action?.();
                    onCloseDropdown();
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left justify-start h-auto"
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              );
            }

            return (
              <a
                key={index}
                href={item.href || '#'}
                className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={onCloseDropdown}
              >
                <IconComponent className="w-4 h-4" />
                <span>{item.label}</span>
              </a>
            );
          })}

          {/* Logout */}
          <div className="border-t border-gray-100 mt-2">
            <Button
              variant="ghost"
              onClick={onLogout}
              className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors justify-start h-auto"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};