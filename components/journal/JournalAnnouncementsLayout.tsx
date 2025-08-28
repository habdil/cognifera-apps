"use client";

import React, { useState } from "react";
import Link from "next/link";
import JournalHeader from "./JournalHeader";
import JournalFooter from "./JournalFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Megaphone,
  Calendar,
  Tag,
  Search,
  ChevronDown,
  BookOpen,
  Users,
  Award,
  Lightbulb
} from "lucide-react";
import { mockAnnouncements, categoryLabels, categoryColors } from "@/mock-data/announcements";


const categoryIcons = {
  "call-for-papers": BookOpen,
  "system-update": Award,
  "partnership": Users,
  "event": Calendar,
  "policy": Megaphone,
  "general": Lightbulb
};

export default function JournalAnnouncementsLayout() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");

  const filteredAnnouncements = mockAnnouncements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || announcement.category === selectedCategory;
    const matchesPriority = selectedPriority === "all" || announcement.priority === selectedPriority;
    return matchesSearch && matchesCategory && matchesPriority && announcement.isActive;
  });

  return (
    <div className="min-h-screen bg-white">
      <JournalHeader activeItem="announcements" />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-[var(--color-muted-foreground)]">
            <Link href="/journal" className="hover:text-[var(--color-primary)] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/journal" className="hover:text-[var(--color-primary)] transition-colors">Journal</Link>
            <span>/</span>
            <span className="text-[var(--color-foreground)] font-medium">Announcements</span>
          </div>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--color-foreground)] mb-4 flex items-center justify-center">
            <Megaphone className="w-10 h-10 mr-4 text-[var(--color-primary)]" />
            Journal Announcements
          </h1>
          <p className="text-lg text-[var(--color-muted-foreground)] max-w-3xl mx-auto">
            Stay updated with the latest news, calls for papers, system updates, and important 
            announcements from Cognifera Journal editorial team.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-muted-foreground)]" />
                <input
                  type="text"
                  placeholder="Search announcements by title, content, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                />
              </div>
              
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white border border-[var(--color-border)] rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-muted-foreground)] pointer-events-none" />
              </div>

              {/* Priority Filter */}
              <div className="relative">
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="appearance-none bg-white border border-[var(--color-border)] rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-muted-foreground)] pointer-events-none" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-[var(--color-muted-foreground)]">
            Showing {filteredAnnouncements.length} of {mockAnnouncements.filter(a => a.isActive).length} announcements
            {selectedCategory !== "all" && ` in category "${categoryLabels[selectedCategory as keyof typeof categoryLabels]}"`}
            {selectedPriority !== "all" && ` with ${selectedPriority} priority`}
          </p>
        </div>

        {/* Announcements List */}
        <div className="space-y-6 mb-12">
          {filteredAnnouncements.map((announcement) => {
            const CategoryIcon = categoryIcons[announcement.category];
            const categoryColor = categoryColors[announcement.category];
            
            return (
              <Card key={announcement.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-3">
                          {/* Category Icon */}
                          <div className={`w-12 h-12 ${categoryColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <CategoryIcon className="w-6 h-6 text-white" />
                          </div>
                          
                          <div className="flex-1">
                            <h2 className="text-xl font-semibold text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-colors mb-2">
                              {announcement.title}
                            </h2>
                            
                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-muted-foreground)]">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(announcement.publishDate).toLocaleDateString('id-ID', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </div>
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {announcement.author}
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                                announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {announcement.priority.toUpperCase()} PRIORITY
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Category Badge */}
                      <div className="flex-shrink-0">
                        <span className={`${categoryColor} text-white px-3 py-2 rounded-full text-sm font-medium`}>
                          {categoryLabels[announcement.category]}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="pl-16">
                      <p className="text-[var(--color-muted-foreground)] leading-relaxed mb-4">
                        {announcement.content}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {announcement.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="bg-[var(--color-muted)] text-[var(--color-muted-foreground)] px-2 py-1 rounded text-xs flex items-center"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Actions */}
                      {announcement.category === 'call-for-papers' && (
                        <div className="flex gap-3">
                          <Link href="/journal/submit">
                            <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90">
                              Submit Article
                            </Button>
                          </Link>
                          <Button variant="outline">
                            Download Guidelines
                          </Button>
                        </div>
                      )}
                      
                      {announcement.category === 'event' && (
                        <div className="flex gap-3">
                          <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90">
                            Register Now
                          </Button>
                          <Button variant="outline">
                            Add to Calendar
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredAnnouncements.length === 0 && (
          <div className="text-center py-12">
            <Megaphone className="w-16 h-16 mx-auto text-[var(--color-muted-foreground)] mb-4" />
            <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-2">No Announcements Found</h3>
            <p className="text-[var(--color-muted-foreground)] mb-6">
              No announcements match your current search criteria. Try adjusting your search terms or filters.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedPriority("all");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Subscribe Section */}
        <Card className="border-0 shadow-lg bg-[var(--color-muted)]">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-4">
              Stay Updated
            </h3>
            <p className="text-[var(--color-muted-foreground)] mb-6">
              Subscribe to our newsletter to receive the latest announcements, call for papers, 
              and journal updates directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              />
              <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <JournalFooter />
    </div>
  );
}