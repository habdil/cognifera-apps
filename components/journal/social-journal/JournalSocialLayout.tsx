"use client";

import React from "react";
import JournalSocialHeader from "./JournalSocialHeader";
import JournalSocialMainContent from "./JournalSocialMainContent";
import JournalSocialSidebar from "./JournalSocialSidebar";
import JournalSocialFooter from "./JournalSocialFooter";

export default function JournalSocialLayout() {
  return (
    <div className="min-h-screen bg-white">
      <JournalSocialHeader activeItem="home" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <JournalSocialMainContent />
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <JournalSocialSidebar />
          </div>
        </div>
      </main>
      
      <JournalSocialFooter />
    </div>
  );
}