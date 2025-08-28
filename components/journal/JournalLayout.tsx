"use client";

import React from "react";
import JournalHeader from "./JournalHeader";
import JournalMainContent from "./JournalMainContent";
import JournalSidebar from "./JournalSidebar";
import JournalFooter from "./JournalFooter";

export default function JournalLayout() {
  return (
    <div className="min-h-screen bg-white">
      <JournalHeader activeItem="home" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <JournalMainContent />
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <JournalSidebar />
          </div>
        </div>
      </main>
      
      <JournalFooter />
    </div>
  );
}