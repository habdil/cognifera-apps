"use client";

import React from "react";
import Link from "next/link";
import JournalSocialHeader from "./JournalSocialHeader";
import JournalSocialFooter from "./JournalSocialFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Megaphone,
  Calendar,
  Bell,
  Star,
  Clock,
  ArrowRight,
  Info,
  AlertCircle,
  CheckCircle,
  Heart,
  Users,
  Target
} from "lucide-react";
import { journalSocialConfig } from "@/lib/journal-social-config";

export default function JournalSocialAnnouncementsLayout() {
  const announcements = [
    {
      id: 1,
      type: "important",
      title: "New Peer Review Guidelines for Community Impact Assessment",
      summary: "We've updated our peer review process to better evaluate the social impact of submitted research.",
      content: "Starting January 2024, all submissions will undergo enhanced community impact assessment as part of our peer review process. This includes validation of social impact claims and methodology review by both academic reviewers and community practitioners.",
      date: "2024-01-15",
      author: "Editorial Board",
      category: "Editorial Policy",
      priority: "high",
      readTime: "3 min read"
    },
    {
      id: 2,
      type: "update",
      title: "Call for Papers: Special Issue on Digital Inclusion in Community Service",
      summary: "Submit your research on digital inclusion initiatives and their impact on community service delivery.",
      content: "We invite submissions for our special issue focusing on digital inclusion in community service. Topics include digital literacy programs, technology adoption in rural communities, and online service delivery innovations. Submission deadline: March 31, 2024.",
      date: "2024-01-10",
      author: "Guest Editors",
      category: "Call for Papers",
      priority: "medium",
      readTime: "4 min read"
    },
    {
      id: 3,
      type: "success",
      title: "Journal Indexed in DOAJ (Directory of Open Access Journals)",
      summary: "We're proud to announce that our journal has been accepted into DOAJ, enhancing our visibility and credibility.",
      content: "Journal of Social Responsibility and Service has been successfully indexed in the Directory of Open Access Journals (DOAJ). This milestone reflects our commitment to quality, open access publishing and will increase the discoverability of community service research.",
      date: "2024-01-05",
      author: "Editor-in-Chief",
      category: "Achievement",
      priority: "high",
      readTime: "2 min read"
    },
    {
      id: 4,
      type: "info",
      title: "Community Partnership Program Launch",
      summary: "Introducing our new partnership program to collaborate directly with community organizations on research initiatives.",
      content: "We're launching a Community Partnership Program that connects researchers with local organizations for collaborative research projects. This initiative aims to ensure research relevance and facilitate real-world implementation of findings.",
      date: "2024-01-02",
      author: "Community Outreach Team",
      category: "Program Launch",
      priority: "medium",
      readTime: "5 min read"
    },
    {
      id: 5,
      type: "update",
      title: "New Author Guidelines for Community Consent Documentation",
      summary: "Updated guidelines require detailed documentation of community consent and ethical considerations.",
      content: "We've updated our author guidelines to include comprehensive requirements for documenting community consent, ethical clearances, and benefit-sharing agreements. All research involving communities must now include detailed ethical documentation.",
      date: "2023-12-20",
      author: "Ethics Committee",
      category: "Author Guidelines",
      priority: "medium",
      readTime: "6 min read"
    },
    {
      id: 6,
      type: "info",
      title: "Quarterly Publication Schedule for 2024 Announced",
      summary: "View our complete publication schedule with thematic focuses for each quarterly issue.",
      content: "Our 2024 publication schedule is now available. Each quarterly issue will have a thematic focus: Q1 - Community Education, Q2 - Environmental Sustainability, Q3 - Digital Inclusion, Q4 - Social Entrepreneurship.",
      date: "2023-12-15",
      author: "Editorial Team",
      category: "Publication Schedule",
      priority: "low",
      readTime: "3 min read"
    }
  ];

  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case "important":
        return AlertCircle;
      case "success":
        return CheckCircle;
      case "update":
        return Bell;
      case "info":
      default:
        return Info;
    }
  };

  const getAnnouncementColor = (type: string) => {
    switch (type) {
      case "important":
        return "#e74c3c";
      case "success":
        return "#27ae60";
      case "update":
        return "#f39c12";
      case "info":
      default:
        return journalSocialConfig.colors.primary;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-blue-100 text-blue-800"
    };
    return colors[priority as keyof typeof colors] || colors.low;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <JournalSocialHeader activeItem="announcements" />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Categories */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-[var(--color-foreground)]">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {["All", "Editorial Policy", "Call for Papers", "Achievement", "Program Launch", "Author Guidelines", "Publication Schedule"].map((category) => (
                    <div
                      key={category}
                      className="p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors text-sm cursor-pointer"
                    >
                      {category}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Subscribe to Updates */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-[var(--color-foreground)]">Stay Updated</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-[var(--color-muted-foreground)]">
                    Get notified about journal updates, new policies, and important announcements.
                  </p>
                  <Button
                    className="w-full text-white hover:opacity-90"
                    style={{ backgroundColor: journalSocialConfig.colors.primary }}
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    Subscribe to Updates
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-[var(--color-foreground)] mb-4">
                Journal Announcements
              </h1>
              <p className="text-xl text-[var(--color-muted-foreground)] mb-6">
                Stay informed about the latest updates, policies, and opportunities from the Journal of Social Responsibility and Service.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-muted-foreground)]">
                <div className="flex items-center">
                  <Megaphone className="w-4 h-4 mr-1" />
                  Official Updates
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Regular Notifications
                </div>
                <div className="flex items-center">
                  <Bell className="w-4 h-4 mr-1" />
                  Community Focused
                </div>
              </div>
            </div>

            {/* Featured Announcement */}
            <Card className="border-0 shadow-lg mb-8 bg-gradient-to-r from-[var(--color-muted)] to-white">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div
                    className="p-3 rounded-full"
                    style={{ backgroundColor: `${journalSocialConfig.colors.primary}20` }}
                  >
                    <Star
                      className="w-6 h-6"
                      style={{ color: journalSocialConfig.colors.primary }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                        Featured
                      </span>
                      <span className="text-sm text-[var(--color-muted-foreground)]">
                        {formatDate(announcements[0].date)}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-3">
                      {announcements[0].title}
                    </h3>
                    <p className="text-[var(--color-muted-foreground)] mb-4">
                      {announcements[0].content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-[var(--color-muted-foreground)]">
                        <span>By {announcements[0].author}</span>
                        <span>{announcements[0].readTime}</span>
                      </div>
                      <Button
                        variant="outline-2"
                        size="sm"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Announcements List */}
            <div className="space-y-6">
              {announcements.slice(1).map((announcement) => {
                const IconComponent = getAnnouncementIcon(announcement.type);
                const iconColor = getAnnouncementColor(announcement.type);

                return (
                  <Card key={announcement.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div
                          className="p-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: `${iconColor}20` }}
                        >
                          <IconComponent
                            className="w-5 h-5"
                            style={{ color: iconColor }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className={`px-2 py-1 text-xs font-medium rounded ${getPriorityBadge(announcement.priority)}`}>
                              {announcement.priority.toUpperCase()}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded">
                              {announcement.category}
                            </span>
                            <span className="text-sm text-[var(--color-muted-foreground)]">
                              {formatDate(announcement.date)}
                            </span>
                          </div>

                          <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-2">
                            {announcement.title}
                          </h3>

                          <p className="text-[var(--color-muted-foreground)] mb-4">
                            {announcement.summary}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-[var(--color-muted-foreground)]">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {announcement.readTime}
                              </div>
                              <span>By {announcement.author}</span>
                            </div>
                            <Button
                              variant="outline-2"
                              size="sm"
                            >
                              Read Full Announcement
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Call to Action */}
            <Card className="border-0 shadow-lg bg-[var(--color-muted)] mt-8">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-4">
                  Stay Connected with Our Community
                </h3>
                <p className="text-[var(--color-muted-foreground)] mb-6">
                  Join our community of researchers and practitioners working to advance social responsibility
                  and community service. Get updates on new opportunities and connect with like-minded individuals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/journal-social/submit">
                    <Button
                      className="text-white hover:opacity-90"
                      style={{ backgroundColor: journalSocialConfig.colors.primary }}
                    >
                      Submit Your Research
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/journal-social/about">
                    <Button variant="outline-2">
                      Learn More About Our Journal
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <JournalSocialFooter />
    </div>
  );
}