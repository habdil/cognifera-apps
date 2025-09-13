"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Award, 
  BarChart3,
  Send,
  Info,
  Users,
  BookOpen,
  Handshake,
  Globe
} from "lucide-react";
import { journalSocialConfig } from "@/lib/journal-social-config";

export default function JournalSocialSidebar() {

  return (
    <div className="space-y-6 mt-6">
      {/* Submit Community Research */}
      <Card className="border-0 shadow-lg text-white" style={{ backgroundColor: journalSocialConfig.colors.primary }}>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl flex items-center">
            <Send className="w-5 h-5 mr-2" />
            {journalSocialConfig.sidebar.submitSection.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white/90 text-sm">
            {journalSocialConfig.sidebar.submitSection.description}
          </p>
          <div className="space-y-2">
            <Link href={journalSocialConfig.sidebar.submitSection.submitButtonUrl}>
              <Button className="w-full bg-white font-semibold hover:bg-white/90" style={{ color: journalSocialConfig.colors.primary }}>
                {journalSocialConfig.sidebar.submitSection.submitButtonText}
              </Button>
            </Link>
            <Link href={journalSocialConfig.sidebar.submitSection.guidelinesButtonUrl}>
              <Button variant="ghost-2" className="w-full text-white hover:bg-white/20 text-sm">
                {journalSocialConfig.sidebar.submitSection.guidelinesButtonText}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Journal Information */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center text-[var(--color-foreground)]">
            <Info className="w-5 h-5 mr-2" style={{ color: journalSocialConfig.colors.primary }} />
            {journalSocialConfig.sidebar.journalInfo.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {journalSocialConfig.sidebar.journalInfo.items.map((item, index) => (
              <div key={index} className="p-4 bg-[var(--color-muted)] rounded-lg">
                <h4 className="font-semibold text-[var(--color-foreground)] text-sm">{item.label}</h4>
                <p className="text-sm text-[var(--color-muted-foreground)]">{item.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center text-[var(--color-foreground)]">
            <BookOpen className="w-5 h-5 mr-2" style={{ color: journalSocialConfig.colors.primary }} />
            {journalSocialConfig.sidebar.quickLinks.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            {journalSocialConfig.sidebar.quickLinks.links.map((link, index) => (
              <Link key={index} href={link.href} className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors">
                <span className="text-sm text-[var(--color-foreground)] hover:text-[var(--color-primary)]">{link.text}</span>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quality Standards */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center text-[var(--color-foreground)]">
            <Award className="w-5 h-5 mr-2" style={{ color: journalSocialConfig.colors.primary }} />
            {journalSocialConfig.sidebar.qualityStandards.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {journalSocialConfig.sidebar.qualityStandards.badges.map((badge, index) => (
              <div 
                key={index}
                className={`px-3 py-2 rounded-lg text-center ${
                  badge.variant === "primary" 
                    ? "text-white"
                    : badge.variant === "secondary"
                    ? "bg-[var(--color-secondary)]/10 text-[var(--color-secondary-foreground)]"
                    : badge.variant === "tertiary"
                    ? "bg-[var(--color-tertiary)]/10 text-[var(--color-tertiary-foreground)]"
                    : "bg-green-100 text-green-800"
                }`}
                style={{ 
                  backgroundColor: badge.variant === "primary" 
                    ? `${journalSocialConfig.colors.primary}20` 
                    : undefined,
                  color: badge.variant === "primary" 
                    ? journalSocialConfig.colors.primary 
                    : undefined
                }}
              >
                <span className="text-xs font-semibold">{badge.text}</span>
              </div>
            ))}
          </div>
          <div className="text-center pt-2">
            <p className="text-xs text-[var(--color-muted-foreground)]">
              {journalSocialConfig.sidebar.qualityStandards.description}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Community Impact Statistics */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center text-[var(--color-foreground)]">
            <BarChart3 className="w-5 h-5 mr-2" style={{ color: journalSocialConfig.colors.primary }} />
            {journalSocialConfig.sidebar.statistics.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center p-4 bg-[var(--color-muted)] rounded-lg">
              <p className="text-2xl font-bold" style={{ color: journalSocialConfig.colors.primary }}>
                {journalSocialConfig.sidebar.statistics.publishedArticles}
              </p>
              <p className="text-xs text-[var(--color-muted-foreground)]">Community Impact Studies</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-[var(--color-muted)] rounded-lg">
                <p className="text-lg font-bold text-[var(--color-foreground)]">{journalSocialConfig.sidebar.statistics.countries}</p>
                <p className="text-xs text-[var(--color-muted-foreground)]">Countries</p>
              </div>
              <div className="text-center p-3 bg-[var(--color-muted)] rounded-lg">
                <p className="text-lg font-bold text-[var(--color-foreground)]">{journalSocialConfig.sidebar.statistics.avgReviewTime}</p>
                <p className="text-xs text-[var(--color-muted-foreground)]">Avg Review Time (weeks)</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-[var(--color-foreground)]">Community Partners Distribution</h4>
              <div className="space-y-2 text-xs text-[var(--color-muted-foreground)]">
                {journalSocialConfig.sidebar.statistics.authorDistribution.map((dist, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{dist.flag} {dist.country}</span>
                    <span>{dist.percentage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community Partnerships */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center text-[var(--color-foreground)]">
            <Handshake className="w-5 h-5 mr-2" style={{ color: journalSocialConfig.colors.primary }} />
            Community Partnerships
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-3">
            <div className="p-3 border border-[var(--color-border)] rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Globe className="w-4 h-4" style={{ color: journalSocialConfig.colors.primary }} />
                <span className="text-sm font-medium text-[var(--color-foreground)]">Active NGO Partners</span>
              </div>
              <p className="text-xs text-[var(--color-muted-foreground)]">15 organizations across Southeast Asia</p>
            </div>
            <div className="p-3 border border-[var(--color-border)] rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-4 h-4" style={{ color: journalSocialConfig.colors.primary }} />
                <span className="text-sm font-medium text-[var(--color-foreground)]">Community Reach</span>
              </div>
              <p className="text-xs text-[var(--color-muted-foreground)]">250,000+ individuals impacted</p>
            </div>
            <div className="p-3 border border-[var(--color-border)] rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Heart className="w-4 h-4" style={{ color: journalSocialConfig.colors.primary }} />
                <span className="text-sm font-medium text-[var(--color-foreground)]">Active Programs</span>
              </div>
              <p className="text-xs text-[var(--color-muted-foreground)]">42 ongoing community initiatives</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Editorial Contact */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center text-[var(--color-foreground)]">
            <Users className="w-5 h-5 mr-2" style={{ color: journalSocialConfig.colors.primary }} />
            {journalSocialConfig.sidebar.editorialContact.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2 text-sm">
            <div>
              <p className="font-medium text-[var(--color-foreground)]">Email</p>
              <p className="text-[var(--color-muted-foreground)]">{journalSocialConfig.sidebar.editorialContact.email}</p>
            </div>
            <div>
              <p className="font-medium text-[var(--color-foreground)]">Editor-in-Chief</p>
              <p className="text-[var(--color-muted-foreground)]">
                {journalSocialConfig.sidebar.editorialContact.editorInChief}
              </p>
            </div>
            <div>
              <p className="font-medium text-[var(--color-foreground)]">Response Time</p>
              <p className="text-[var(--color-muted-foreground)]">{journalSocialConfig.sidebar.editorialContact.responseTime}</p>
            </div>
          </div>
          <Link href={journalSocialConfig.sidebar.editorialContact.contactButtonUrl}>
            <Button variant="outline-2" className="w-full mt-3">
              {journalSocialConfig.sidebar.editorialContact.contactButtonText}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}