"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { JournalsSection } from "@/components/publications/JournalsSection";
import { BooksSection } from "@/components/publications/BooksSection";
import { PublicationType } from "@/types/publications";

export default function PublicationsContent() {
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