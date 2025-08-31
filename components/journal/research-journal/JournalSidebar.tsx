"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Award, 
  BarChart3,
  Send,
  Info,
  Users,
  BookOpen
} from "lucide-react";
import { journalConfig } from "@/lib/journal-config";

export default function JournalSidebar() {

  return (
    <div className="space-y-6 mt-6">
      {/* Submit Article */}
      <Card className="border-0 shadow-lg bg-[var(--color-primary)] text-white">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl flex items-center">
            <Send className="w-5 h-5 mr-2" />
            {journalConfig.sidebar.submitSection.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white/90 text-sm">
            {journalConfig.sidebar.submitSection.description}
          </p>
          <div className="space-y-2">
            <Link href={journalConfig.sidebar.submitSection.submitButtonUrl}>
              <Button className="w-full bg-white text-[var(--color-primary)] hover:bg-white/90 font-semibold">
                {journalConfig.sidebar.submitSection.submitButtonText}
              </Button>
            </Link>
            <Link href={journalConfig.sidebar.submitSection.guidelinesButtonUrl}>
              <Button variant="ghost" className="w-full text-white hover:bg-white/20 text-sm">
                {journalConfig.sidebar.submitSection.guidelinesButtonText}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Journal Information */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center text-[var(--color-foreground)]">
            <Info className="w-5 h-5 mr-2 text-[var(--color-primary)]" />
            {journalConfig.sidebar.journalInfo.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {journalConfig.sidebar.journalInfo.items.map((item, index) => (
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
            <BookOpen className="w-5 h-5 mr-2 text-[var(--color-primary)]" />
            {journalConfig.sidebar.quickLinks.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            {journalConfig.sidebar.quickLinks.links.map((link, index) => (
              <Link key={index} href={link.href} className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors">
                <span className="text-sm text-[var(--color-foreground)] hover:text-[var(--color-primary)]">{link.text}</span>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quality Assurance */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center text-[var(--color-foreground)]">
            <Award className="w-5 h-5 mr-2 text-[var(--color-primary)]" />
            {journalConfig.sidebar.qualityStandards.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {journalConfig.sidebar.qualityStandards.badges.map((badge, index) => (
              <div 
                key={index}
                className={`px-3 py-2 rounded-lg text-center ${
                  badge.variant === "primary" 
                    ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                    : badge.variant === "secondary"
                    ? "bg-[var(--color-secondary)]/10 text-[var(--color-secondary-foreground)]"
                    : badge.variant === "tertiary"
                    ? "bg-[var(--color-tertiary)]/10 text-[var(--color-tertiary-foreground)]"
                    : "bg-green-100 text-green-800"
                }`}
              >
                <span className="text-xs font-semibold">{badge.text}</span>
              </div>
            ))}
          </div>
          <div className="text-center pt-2">
            <p className="text-xs text-[var(--color-muted-foreground)]">
              {journalConfig.sidebar.qualityStandards.description}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center text-[var(--color-foreground)]">
            <BarChart3 className="w-5 h-5 mr-2 text-[var(--color-primary)]" />
            {journalConfig.sidebar.statistics.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center p-4 bg-[var(--color-muted)] rounded-lg">
              <p className="text-2xl font-bold text-[var(--color-primary)]">{journalConfig.sidebar.statistics.publishedArticles}</p>
              <p className="text-xs text-[var(--color-muted-foreground)]">Published Articles</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-[var(--color-muted)] rounded-lg">
                <p className="text-lg font-bold text-[var(--color-foreground)]">{journalConfig.sidebar.statistics.countries}</p>
                <p className="text-xs text-[var(--color-muted-foreground)]">Countries</p>
              </div>
              <div className="text-center p-3 bg-[var(--color-muted)] rounded-lg">
                <p className="text-lg font-bold text-[var(--color-foreground)]">{journalConfig.sidebar.statistics.avgReviewTime}</p>
                <p className="text-xs text-[var(--color-muted-foreground)]">Avg Review Time (weeks)</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-[var(--color-foreground)]">Author Distribution</h4>
              <div className="space-y-2 text-xs text-[var(--color-muted-foreground)]">
                {journalConfig.sidebar.statistics.authorDistribution.map((dist, index) => (
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

      {/* Contact */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center text-[var(--color-foreground)]">
            <Users className="w-5 h-5 mr-2 text-[var(--color-primary)]" />
            {journalConfig.sidebar.editorialContact.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2 text-sm">
            <div>
              <p className="font-medium text-[var(--color-foreground)]">Email</p>
              <p className="text-[var(--color-muted-foreground)]">{journalConfig.sidebar.editorialContact.email}</p>
            </div>
            <div>
              <p className="font-medium text-[var(--color-foreground)]">Editor-in-Chief</p>
              <p className="text-[var(--color-muted-foreground)]">
                {journalConfig.sidebar.editorialContact.editorInChief}
              </p>
            </div>
            <div>
              <p className="font-medium text-[var(--color-foreground)]">Response Time</p>
              <p className="text-[var(--color-muted-foreground)]">{journalConfig.sidebar.editorialContact.responseTime}</p>
            </div>
          </div>
          <Link href={journalConfig.sidebar.editorialContact.contactButtonUrl}>
            <Button variant="outline" className="w-full mt-3">
              {journalConfig.sidebar.editorialContact.contactButtonText}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}