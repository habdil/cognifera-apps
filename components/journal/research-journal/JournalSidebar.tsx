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
import { mockEditorialBoard } from "@/mock-data/journal";

export default function JournalSidebar() {
  const editorInChief = mockEditorialBoard.find(member => member.role === 'editor-in-chief');

  return (
    <div className="space-y-6 mt-6">
      {/* Submit Article */}
      <Card className="border-0 shadow-lg bg-[var(--color-primary)] text-white">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl flex items-center">
            <Send className="w-5 h-5 mr-2" />
            Submit Your Research
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white/90 text-sm">
            Publikasikan penelitian Anda di Cognifera Journal dengan proses review yang berkualitas.
          </p>
          <div className="space-y-2">
            <Link href="/journal/submit">
              <Button className="w-full bg-white text-[var(--color-primary)] hover:bg-white/90 font-semibold">
                Submit Article
              </Button>
            </Link>
            <Link href="/journal/guidelines">
              <Button variant="ghost" className="w-full text-white hover:bg-white/20 text-sm">
                Author Guidelines
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
            Journal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 bg-[var(--color-muted)] rounded-lg">
              <h4 className="font-semibold text-[var(--color-foreground)] text-sm">Publication</h4>
              <p className="text-sm text-[var(--color-muted-foreground)]">Quarterly (4 issues/year)</p>
            </div>
            <div className="p-4 bg-[var(--color-muted)] rounded-lg">
              <h4 className="font-semibold text-[var(--color-foreground)] text-sm">Focus Area</h4>
              <p className="text-sm text-[var(--color-muted-foreground)]">Educational Technology, Computer Science, Applied Mathematics</p>
            </div>
            <div className="p-4 bg-[var(--color-muted)] rounded-lg">
              <h4 className="font-semibold text-[var(--color-foreground)] text-sm">Publisher</h4>
              <p className="text-sm text-[var(--color-muted-foreground)]">Cognifera Education Academy</p>
            </div>
            <div className="p-4 bg-[var(--color-muted)] rounded-lg">
              <h4 className="font-semibold text-[var(--color-foreground)] text-sm">Open Access</h4>
              <p className="text-sm text-[var(--color-muted-foreground)]">Free submission & publication</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center text-[var(--color-foreground)]">
            <BookOpen className="w-5 h-5 mr-2 text-[var(--color-primary)]" />
            Quick Links
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Link href="/journal/about" className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors">
              <span className="text-sm text-[var(--color-foreground)] hover:text-[var(--color-primary)]">About Journal</span>
            </Link>
            <Link href="/journal/editorial" className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors">
              <span className="text-sm text-[var(--color-foreground)] hover:text-[var(--color-primary)]">Editorial Board</span>
            </Link>
            <Link href="/journal/guidelines" className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors">
              <span className="text-sm text-[var(--color-foreground)] hover:text-[var(--color-primary)]">Author Guidelines</span>
            </Link>
            <Link href="/journal/review-process" className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors">
              <span className="text-sm text-[var(--color-foreground)] hover:text-[var(--color-primary)]">Review Process</span>
            </Link>
            <Link href="/journal/ethics" className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors">
              <span className="text-sm text-[var(--color-foreground)] hover:text-[var(--color-primary)]">Publication Ethics</span>
            </Link>
            <Link href="/journal/archives" className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors">
              <span className="text-sm text-[var(--color-foreground)] hover:text-[var(--color-primary)]">Journal Archives</span>
            </Link>
            <Link href="/journal/contact" className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors">
              <span className="text-sm text-[var(--color-foreground)] hover:text-[var(--color-primary)]">Contact Us</span>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Quality Assurance */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center text-[var(--color-foreground)]">
            <Award className="w-5 h-5 mr-2 text-[var(--color-primary)]" />
            Quality Standards
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-3 py-2 rounded-lg text-center">
              <span className="text-xs font-semibold">Open Access</span>
            </div>
            <div className="bg-[var(--color-secondary)]/10 text-[var(--color-secondary-foreground)] px-3 py-2 rounded-lg text-center">
              <span className="text-xs font-semibold">Peer Review</span>
            </div>
            <div className="bg-[var(--color-tertiary)]/10 text-[var(--color-tertiary-foreground)] px-3 py-2 rounded-lg text-center">
              <span className="text-xs font-semibold">Fast Track</span>
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-center">
              <span className="text-xs font-semibold">DOI Assigned</span>
            </div>
          </div>
          <div className="text-center pt-2">
            <p className="text-xs text-[var(--color-muted-foreground)]">
              Semua artikel mendapat DOI dan terindeks secara otomatis
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center text-[var(--color-foreground)]">
            <BarChart3 className="w-5 h-5 mr-2 text-[var(--color-primary)]" />
            Journal Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center p-4 bg-[var(--color-muted)] rounded-lg">
              <p className="text-2xl font-bold text-[var(--color-primary)]">124</p>
              <p className="text-xs text-[var(--color-muted-foreground)]">Published Articles</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-[var(--color-muted)] rounded-lg">
                <p className="text-lg font-bold text-[var(--color-foreground)]">18</p>
                <p className="text-xs text-[var(--color-muted-foreground)]">Countries</p>
              </div>
              <div className="text-center p-3 bg-[var(--color-muted)] rounded-lg">
                <p className="text-lg font-bold text-[var(--color-foreground)]">2.4</p>
                <p className="text-xs text-[var(--color-muted-foreground)]">Avg Review Time (weeks)</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-[var(--color-foreground)]">Author Distribution</h4>
              <div className="space-y-2 text-xs text-[var(--color-muted-foreground)]">
                <div className="flex justify-between">
                  <span>🇮🇩 Indonesia</span>
                  <span>65%</span>
                </div>
                <div className="flex justify-between">
                  <span>🇲🇾 Malaysia</span>
                  <span>15%</span>
                </div>
                <div className="flex justify-between">
                  <span>🇸🇬 Singapore</span>
                  <span>8%</span>
                </div>
                <div className="flex justify-between">
                  <span>🌏 Others</span>
                  <span>12%</span>
                </div>
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
            Editorial Contact
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2 text-sm">
            <div>
              <p className="font-medium text-[var(--color-foreground)]">Email</p>
              <p className="text-[var(--color-muted-foreground)]">cognifera.edu@gmail.com</p>
            </div>
            <div>
              <p className="font-medium text-[var(--color-foreground)]">Editor-in-Chief</p>
              <p className="text-[var(--color-muted-foreground)]">
                {editorInChief ? editorInChief.name : "Dr. Hardianto, S.Pd., M.Pd."}
              </p>
            </div>
            <div>
              <p className="font-medium text-[var(--color-foreground)]">Response Time</p>
              <p className="text-[var(--color-muted-foreground)]">Within 48 hours</p>
            </div>
          </div>
          <Link href="/journal/contact">
            <Button variant="outline" className="w-full mt-3">
              Contact Editorial Team
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}