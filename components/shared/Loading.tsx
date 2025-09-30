"use client";

import { memo, useState, useEffect } from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export const Loading = memo(({ message = "Loading...", fullScreen = true }: LoadingProps) => {
  const [progress, setProgress] = useState(0);

  // Auto increment progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0; // Loop back
        return prev + 2; // Increment by 2%
      });
    }, 30); // Update every 30ms for smooth animation

    return () => clearInterval(timer);
  }, []);
  const containerClass = fullScreen
    ? "fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-background)]"
    : "flex items-center justify-center p-8";

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center space-y-6">
        {/* Logo with pulse animation */}
        <div className="relative">

          {/* Logo container with bounce */}
          <div className="relative animate-bounce-slow">
            <Image
              src="/logo.png"
              alt="Cognifera Logo"
              width={80}
              height={80}
              priority
              className="drop-shadow-lg"
            />
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold text-[var(--color-foreground)] animate-pulse">
            {message}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 space-y-2">
          <Progress
            value={progress}
            className="h-2 bg-gray-200 dark:bg-gray-700"
          />
          <p className="text-xs text-center text-[var(--color-muted-foreground)]">
            {Math.round(progress)}%
          </p>
        </div>
      </div>

      {/* Add custom animations to global styles if needed */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes bounce-dot {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1.2);
            opacity: 1;
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-bounce-dot {
          animation: bounce-dot 1.4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
});

Loading.displayName = "Loading";