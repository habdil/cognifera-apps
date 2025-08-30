"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, User, ArrowLeft } from "lucide-react";

interface JournalHeaderProps {
  activeItem?: string;
}

export default function JournalHeader({ activeItem = "home" }: JournalHeaderProps) {
  const getNavItemClass = (item: string) => {
    return item === activeItem 
      ? "text-[var(--color-foreground)] hover:text-[var(--color-primary)] font-medium py-2 transition-colors border-b-2 border-[var(--color-primary)]"
      : "text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] py-2 transition-colors";
  };

  return (
    <header className="bg-white border-b border-[var(--color-border)]">
      {/* Top Navigation Bar */}
      <div className="bg-[var(--color-primary)] text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Cognifera</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/publications" className="text-sm hover:opacity-80 transition-opacity">
              Publications
            </Link>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <User className="w-4 h-4 mr-1" />
              Login
            </Button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
            {/* Journal Title */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-[var(--color-primary)] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">C</span>
              </div>
              <div>
                <Link href="/journal">
                  <h1 className="text-2xl lg:text-3xl font-bold text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-colors cursor-pointer">
                    Cognifera Journal
                  </h1>
                </Link>
                <p className="text-[var(--color-muted-foreground)] text-lg">
                  Journal System for Academic Publications
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md w-full lg:w-auto">
              <input
                placeholder="Search articles, authors, keywords..."
                className="w-full px-4 py-3 pr-12 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--color-muted-foreground)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-[var(--color-border)] bg-[var(--color-muted)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center space-x-8 py-4">
            <Link href="/journal" className={getNavItemClass("home")}>
              Home
            </Link>
            <Link href="/journal/about" className={getNavItemClass("about")}>
              About
            </Link>
            <Link href="/journal/current" className={getNavItemClass("current")}>
              Current Issue
            </Link>
            <Link href="/journal/archives" className={getNavItemClass("archives")}>
              Archives
            </Link>
            <Link href="/journal/editorial" className={getNavItemClass("editorial")}>
              Editorial Policies
            </Link>
            <Link href="/journal/submit" className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-primary)]/90 transition-colors font-medium">
              Submit Article
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}