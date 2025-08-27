"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
  showCloseButton?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "lg",
  className,
  showCloseButton = true,
}: ModalProps) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    full: "max-w-[95vw]",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop - much lighter! */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div
        className={cn(
          "relative z-10 w-full bg-white rounded-2xl shadow-xl border border-[var(--color-border)] max-h-[90vh] flex flex-col",
          sizeClasses[size],
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-foreground)]">
              {title}
            </h2>
            {description && (
              <p className="text-[var(--color-muted-foreground)] mt-1">
                {description}
              </p>
            )}
          </div>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-[var(--color-muted)] rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-[var(--color-muted-foreground)]" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalContent = ({ children, className }: ModalContentProps) => {
  return (
    <div className={cn("overflow-y-auto flex-1", className)}>
      {children}
    </div>
  );
};

interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalFooter = ({ children, className }: ModalFooterProps) => {
  return (
    <div className={cn("border-t border-[var(--color-border)] p-6", className)}>
      {children}
    </div>
  );
};