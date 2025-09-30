"use client";

import { Button } from "@/components/ui/button";
import { User as UserIcon, LogOut, ChevronDown, type LucideIcon } from "lucide-react";
import type { UnifiedUser } from "@/lib/auth-config";

interface DropdownItem {
  label: string;
  href: string | null;
  icon: LucideIcon;
  action: (() => void) | null;
}

interface UserDropdownProps {
  user: UnifiedUser;
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
  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={onToggleDropdown}
        className="flex items-center space-x-2 px-3 py-6 rounded-full hover:bg-gray-200 transition-colors"
      >
        <div className="w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
          <UserIcon className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-medium">{user.fullName || user.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
      </Button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user.fullName || user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
            <p className="text-xs text-gray-400">{user.role}</p>
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