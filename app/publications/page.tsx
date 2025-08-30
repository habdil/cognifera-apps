"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/shared/Navbar";
import { ResearchJournalsSection } from "@/components/publications/ResearchJournalsSection";
import { CommunityServiceSection } from "@/components/publications/CommunityServiceSection";
import { BooksSection } from "@/components/publications/BooksSection";
import { PublicationType } from "@/types/publications";
import { Skeleton } from "@/components/ui/skeleton";

function PublicationsContent() {
  const [activeSection, setActiveSection] = useState<PublicationType>("research-journals");
  const searchParams = useSearchParams();

  // Handle section parameter from URL
  useEffect(() => {
    const section = searchParams.get("section") as PublicationType;
    if (section && ["research-journals", "community-service-journals", "books"].includes(section)) {
      setActiveSection(section);
    }
  }, [searchParams]);

  const sections = [
    {
      id: "research-journals" as PublicationType,
      label: "Research Journals",
      description: "Peer-reviewed academic publications"
    },
    {
      id: "community-service-journals" as PublicationType,
      label: "Community Service Journals", 
      description: "Community engagement and service publications"
    },
    {
      id: "books" as PublicationType,
      label: "Books",
      description: "Published textbooks, monographs, and proceedings"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-[var(--color-foreground)] mb-6">
            Publications
          </h1>
          <p className="text-xl text-[var(--color-muted-foreground)] max-w-3xl mx-auto mb-12">
            Explore our collection of research journals, community service publications, and academic books that contribute to scientific knowledge and community development.
          </p>
          
          {/* Section Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeSection === section.id
                    ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-lg"
                    : "bg-white hover:bg-[var(--color-muted)] text-[var(--color-foreground)] border border-[var(--color-border)]"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Content Section */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4">
          {activeSection === "research-journals" && <ResearchJournalsSection />}
          {activeSection === "community-service-journals" && <CommunityServiceSection />}
          {activeSection === "books" && <BooksSection />}
        </div>
      </section>
    </div>
  );
}

export default function PublicationsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-32 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Skeleton className="h-14 w-80 mx-auto mb-6" />
              <Skeleton className="h-6 w-96 mx-auto mb-12" />
              <div className="flex justify-center gap-4 mb-16">
                <Skeleton className="h-12 w-40" />
                <Skeleton className="h-12 w-48" />
                <Skeleton className="h-12 w-32" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border rounded-lg p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    }>
      <PublicationsContent />
    </Suspense>
  );
}