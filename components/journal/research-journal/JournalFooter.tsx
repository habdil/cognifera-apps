"use client";

import React from "react";
import Link from "next/link";

export default function JournalFooter() {
  return (
    <footer className="bg-[var(--color-foreground)] text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">C</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Cognifera Journal</h3>
                <p className="text-white/80 text-sm">Open Journal System</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Platform publikasi ilmiah terkemuka yang menyediakan akses terbuka untuk 
              penelitian berkualitas tinggi dalam bidang teknologi pendidikan, ilmu komputer, 
              dan matematika terapan.
            </p>
            <div className="flex space-x-4">
              <span className="bg-[var(--color-primary)] text-white px-3 py-1 rounded-full text-xs">Open Access</span>
              <span className="bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] px-3 py-1 rounded-full text-xs">Peer Reviewed</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
            <div className="space-y-2 text-sm text-white/70">
              <Link href="/journal/submit" className="block hover:text-white transition-colors">Submit Article</Link>
              <Link href="/journal/author-guidelines" className="block hover:text-white transition-colors">Author Guidelines</Link>
              <Link href="/journal/peer-review-process" className="block hover:text-white transition-colors">Review Process</Link>
              <Link href="/journal/editorial" className="block hover:text-white transition-colors">Editorial Board</Link>
              <Link href="/publications" className="block hover:text-white transition-colors">All Publications</Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-white">Contact Info</h3>
            <div className="space-y-2 text-sm text-white/70">
              <p>Email: journal@cognifera.co.id</p>
              <p>Phone: +62 21 1234 5678</p>
              <p>Response: Within 48 hours</p>
              <div className="mt-4">
                <p className="font-medium text-white text-xs mb-1">Publisher</p>
                <p className="text-xs">Cognifera Education Academy</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/60 text-center md:text-left">
            © 2024 Cognifera Journal. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">
              Back to Cognifera
            </Link>
            <span className="text-white/40">|</span>
            <span className="text-sm text-white/60">Powered by OJS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}