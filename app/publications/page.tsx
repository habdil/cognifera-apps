"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/shared/Navbar";
import { JournalsSection } from "@/components/publications/JournalsSection";
import { BooksSection } from "@/components/publications/BooksSection";
import { PublicationType } from "@/types/publications";

function PublicationsContent() {
  const [activeSection, setActiveSection] = useState<PublicationType>("journals");
  const searchParams = useSearchParams();

  // Handle section parameter from URL
  useEffect(() => {
    const section = searchParams.get("section") as PublicationType;
    if (section && ["journals", "books"].includes(section)) {
      setActiveSection(section);
    }
  }, [searchParams]);

  const sections = [
    {
      id: "journals" as PublicationType,
      label: "Journals",
      description: "Research publications and community service journals"
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
          {activeSection === "journals" && <JournalsSection />}
          {activeSection === "books" && <BooksSection />}
        </div>
      </section>
    </div>
  );
}

export default function PublicationsPage() {
  return (
    <Suspense fallback={
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="animate-pulse">
              {/* Header skeleton */}
              <div className="text-center mb-12">
                <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-6"></div>
                <div className="w-24 h-1 bg-gray-200 mx-auto mb-8 rounded-full"></div>
                <div className="h-6 bg-gray-200 rounded w-96 mx-auto"></div>
              </div>
              
              {/* Navigation buttons skeleton */}
              <div className="flex justify-center gap-4 mb-16">
                <div className="h-12 bg-gray-200 rounded-full w-40"></div>
                <div className="h-12 bg-gray-200 rounded-full w-48"></div>
                <div className="h-12 bg-gray-200 rounded-full w-32"></div>
              </div>
              
              {/* Content grid skeleton */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-xl p-6">
                    <div className="h-48 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    }>
      <PublicationsContent />
    </Suspense>
  );
}