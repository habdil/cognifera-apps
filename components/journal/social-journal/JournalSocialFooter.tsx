"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { journalSocialConfig } from "@/lib/journal-social-config";

export default function JournalSocialFooter() {
  return (
    <footer className="bg-[var(--color-foreground)] text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              {journalSocialConfig.logo.type === "image" ? (
                <div className="flex-shrink-0">
                  <Image
                    src={journalSocialConfig.logo.value}
                    alt="Journal Logo"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
              ) : (
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: journalSocialConfig.colors.primary }}
                >
                  <span className="text-xl font-bold text-white">
                    {journalSocialConfig.logo.value.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <h3 className="font-bold text-lg">{journalSocialConfig.title}</h3>
                <p className="text-white/80 text-sm">{journalSocialConfig.subtitle}</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              {journalSocialConfig.footer.description}
            </p>
            <div className="flex space-x-4">
              {journalSocialConfig.footer.badges.map((badge, index) => (
                <span 
                  key={index}
                  className={`px-3 py-1 rounded-full text-xs ${
                    badge.variant === "primary" 
                      ? "text-white" 
                      : "text-[var(--color-secondary-foreground)]"
                  }`}
                  style={{ 
                    backgroundColor: badge.variant === "primary" 
                      ? journalSocialConfig.colors.primary 
                      : journalSocialConfig.colors.secondary 
                  }}
                >
                  {badge.text}
                </span>
              ))}
            </div>
          </div>
          
          {journalSocialConfig.footer.quickLinks.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="font-semibold mb-4 text-white">{section.title}</h3>
              <div className="space-y-2 text-sm text-white/70">
                {section.links.map((link, linkIndex) => (
                  <Link 
                    key={linkIndex}
                    href={link.href} 
                    className="block hover:text-white transition-colors"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          
          <div>
            <h3 className="font-semibold mb-4 text-white">Community Contact</h3>
            <div className="space-y-2 text-sm text-white/70">
              <p>Email: {journalSocialConfig.footer.contact.email}</p>
              <p>Phone: {journalSocialConfig.footer.contact.phone}</p>
              <p>Response: {journalSocialConfig.footer.contact.responseTime}</p>
              <div className="mt-4">
                <p className="font-medium text-white text-xs mb-1">Publisher</p>
                <p className="text-xs">{journalSocialConfig.footer.contact.publisher.fullName}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/60 text-center md:text-left">
            © {journalSocialConfig.footer.copyright.year} {journalSocialConfig.footer.copyright.text}
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {journalSocialConfig.footer.bottomLinks.map((link, index) => (
              <React.Fragment key={index}>
                <Link 
                  href={link.href} 
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.text}
                </Link>
                {index < journalSocialConfig.footer.bottomLinks.length - 1 && (
                  <span className="text-white/40">|</span>
                )}
              </React.Fragment>
            ))}
            <span className="text-white/40">|</span>
            <span className="text-sm text-white/60">{journalSocialConfig.footer.poweredBy}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}