"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Download, ExternalLink, Share2, Bookmark, AlertTriangle, Eye, Users, Calendar, MapPin, Quote, ChevronDown, ChevronUp } from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { mockResearchJournals } from "@/mock-data/publications";
import { ResearchJournalData } from "@/types/publications";

export default function JournalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [journal, setJournal] = useState<ResearchJournalData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const journalId = params.id as string;
    const foundJournal = mockResearchJournals.find(j => j.id === journalId);
    
    if (foundJournal) {
      setJournal(foundJournal);
    }
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-32 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!journal) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-32 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-[var(--color-foreground)] mb-4">
              Publication Not Found
            </h1>
            <p className="text-[var(--color-muted-foreground)] mb-8">
              The publication you're looking for doesn't exist.
            </p>
            <button
              onClick={() => router.push("/publications")}
              className="px-6 py-3 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-lg hover:opacity-90 transition-opacity"
            >
              Back to Publications
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <button
              onClick={() => router.push("/publications")}
              className="flex items-center gap-2 text-[var(--color-primary)] hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Publications
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Paper Header */}
              <div className="space-y-6">
                <h1 className="text-3xl lg:text-4xl font-bold text-[var(--color-foreground)] leading-tight">
                  {journal.title}
                </h1>

                {/* Publisher and Citation Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-muted-foreground)]">
                  <span className="font-medium">Publisher: Cognifera</span>
                  <span>•</span>
                  <button className="text-[var(--color-primary)] hover:underline">
                    Cite This
                  </button>
                  <span>•</span>
                  {journal.pdfUrl && (
                    <a
                      href={journal.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[var(--color-primary)] hover:underline"
                    >
                      <Download className="h-4 w-4" />
                      PDF
                    </a>
                  )}
                  <span>•</span>
                  <span className="text-[var(--color-muted-foreground)]">
                    Available in Cognifera Digital Library
                  </span>
                </div>

                {/* Authors */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-[var(--color-muted-foreground)]" />
                    <span className="font-medium text-[var(--color-foreground)]">Authors:</span>
                  </div>
                  <div className="ml-7">
                    {journal.authors.map((author, index) => (
                      <span key={index} className="text-[var(--color-primary)]">
                        {author}
                        {index < journal.authors.length - 1 && "; "}
                      </span>
                    ))}
                  </div>
                  <button className="ml-7 text-sm text-[var(--color-primary)] hover:underline">
                    All Authors
                  </button>
                </div>
              </div>

              {/* Metrics */}
              <div className="bg-[var(--color-muted)] rounded-lg p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[var(--color-foreground)]">
                      {journal.citationCount}
                    </div>
                    <div className="text-sm text-[var(--color-muted-foreground)]">
                      Cites in Papers
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[var(--color-foreground)]">
                      {journal.fullTextViews || Math.floor(journal.citationCount * 15)}
                    </div>
                    <div className="text-sm text-[var(--color-muted-foreground)]">
                      Full Text Views
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-2">
                      <button title="Report Issue" className="p-1 hover:bg-white/20 rounded">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                      </button>
                      <button title="View Details" className="p-1 hover:bg-white/20 rounded">
                        <Eye className="h-5 w-5 text-[var(--color-muted-foreground)]" />
                      </button>
                      <button title="Share" className="p-1 hover:bg-white/20 rounded">
                        <Share2 className="h-5 w-5 text-[var(--color-muted-foreground)]" />
                      </button>
                      <button title="Bookmark" className="p-1 hover:bg-white/20 rounded">
                        <Bookmark className="h-5 w-5 text-[var(--color-muted-foreground)]" />
                      </button>
                    </div>
                  </div>
                  <div className="md:col-span-1">
                    <div className="text-lg font-bold text-green-600">
                      {journal.isOpenAccess ? "Open" : "Subscription"}
                    </div>
                    <div className="text-sm text-[var(--color-muted-foreground)]">
                      Access
                    </div>
                  </div>
                </div>
              </div>

              {/* Publication Details */}
              <PublicationDetails journal={journal} />

              {/* Abstract */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[var(--color-foreground)]">Abstract:</h2>
                <p className="text-[var(--color-foreground)] leading-relaxed">
                  {journal.abstract}
                </p>
              </div>

              {/* Document Sections */}
              <DocumentSections journal={journal} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Sidebar journal={journal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PublicationDetails = ({ journal }: { journal: ResearchJournalData }) => {
  const details = [
    { label: "Published in", value: `${journal.journal} (${journal.year})` },
    { label: "Date of Conference", value: journal.conferenceDate ? new Date(journal.conferenceDate).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' }) : new Date(journal.publicationDate).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' }) },
    { label: "DOI", value: journal.doi, isExternalLink: true },
    { label: "Date Added to Cognifera Digital Library", value: journal.dateAddedToLibrary ? new Date(journal.dateAddedToLibrary).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' }) : new Date(journal.publicationDate).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' }) },
    { label: "Publisher", value: "Cognifera" },
    { label: "Conference Location", value: journal.conferenceLocation || "Jakarta, Indonesia" },
  ];

  // Add funding agency if available
  if (journal.fundingAgency) {
    details.push({ label: "Funding Agency", value: journal.fundingAgency });
  }

  return (
    <div className="space-y-3 text-sm">
      {details.map((detail, index) => (
        <div key={index} className="flex">
          <span className="font-medium text-[var(--color-foreground)] w-48 flex-shrink-0">
            {detail.label}:
          </span>
          {detail.isExternalLink && detail.value ? (
            <a
              href={`https://doi.org/${detail.value}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-primary)] hover:underline flex items-center gap-1"
            >
              {detail.value}
              <ExternalLink className="h-3 w-3" />
            </a>
          ) : (
            <span className="text-[var(--color-foreground)]">{detail.value}</span>
          )}
        </div>
      ))}
    </div>
  );
};

const DocumentSections = ({ journal }: { journal: ResearchJournalData }) => {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    authors: false,
    figures: false,
    references: false,
    citations: false,
    keywords: false,
    metrics: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const sections = [
    { 
      id: "authors", 
      label: "Authors", 
      hasContent: true,
      content: (
        <div className="space-y-3">
          {journal.authors.map((author, index) => (
            <div key={index} className="flex items-center gap-3 p-3 border border-[var(--color-border)] rounded-lg">
              <div className="w-10 h-10 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-full flex items-center justify-center font-bold">
                {author.charAt(0)}
              </div>
              <div>
                <div className="font-medium text-[var(--color-foreground)]">{author}</div>
                <div className="text-sm text-[var(--color-muted-foreground)]">Research Affiliation</div>
              </div>
            </div>
          ))}
        </div>
      )
    },
    { 
      id: "figures", 
      label: `Figures (${journal.figures?.length || 0})`, 
      hasContent: journal.figures && journal.figures.length > 0,
      content: journal.figures && (
        <div className="space-y-4">
          {journal.figures.map((figure) => (
            <div key={figure.id} className="border border-[var(--color-border)] rounded-lg p-4">
              <h4 className="font-medium text-[var(--color-foreground)] mb-2">{figure.title}</h4>
              <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center mb-3">
                <span className="text-[var(--color-muted-foreground)]">Figure Placeholder</span>
              </div>
              <p className="text-sm text-[var(--color-muted-foreground)]">{figure.caption}</p>
            </div>
          ))}
        </div>
      )
    },
    { 
      id: "references", 
      label: `References (${journal.references?.length || 0})`, 
      hasContent: journal.references && journal.references.length > 0,
      content: journal.references && (
        <div className="space-y-3">
          {journal.references.map((ref, index) => (
            <div key={ref.id} className="p-3 border border-[var(--color-border)] rounded-lg">
              <div className="font-medium text-[var(--color-foreground)] mb-1">
                [{index + 1}] {ref.authors.join(", ")}
              </div>
              <div className="text-sm text-[var(--color-foreground)] mb-1">"{ref.title}"</div>
              <div className="text-sm text-[var(--color-muted-foreground)]">
                {ref.publication}, {ref.year}
                {ref.doi && (
                  <>
                    {" • DOI: "}
                    <a href={`https://doi.org/${ref.doi}`} target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:underline">
                      {ref.doi}
                    </a>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )
    },
    { 
      id: "citations", 
      label: `Citations (${journal.citations?.length || 0})`, 
      hasContent: journal.citations && journal.citations.length > 0,
      content: journal.citations && (
        <div className="space-y-3">
          {journal.citations.map((cit) => (
            <div key={cit.id} className="p-3 border border-[var(--color-border)] rounded-lg">
              <div className="font-medium text-[var(--color-foreground)] mb-1">
                {cit.authors.join(", ")}
              </div>
              <div className="text-sm text-[var(--color-foreground)] mb-1">"{cit.title}"</div>
              <div className="text-sm text-[var(--color-muted-foreground)]">
                {cit.publication}, {cit.year} • Cited by {cit.citedBy}
              </div>
            </div>
          ))}
        </div>
      )
    },
    { 
      id: "keywords", 
      label: `Keywords (${journal.keywords.length})`, 
      hasContent: true,
      content: (
        <div className="flex flex-wrap gap-2">
          {journal.keywords.map((keyword, index) => (
            <span key={index} className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-3 py-1 rounded-full text-sm font-medium">
              {keyword}
            </span>
          ))}
        </div>
      )
    },
    { 
      id: "metrics", 
      label: "Metrics", 
      hasContent: true,
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 border border-[var(--color-border)] rounded-lg text-center">
            <div className="text-2xl font-bold text-[var(--color-foreground)]">{journal.citationCount}</div>
            <div className="text-sm text-[var(--color-muted-foreground)]">Total Citations</div>
          </div>
          <div className="p-3 border border-[var(--color-border)] rounded-lg text-center">
            <div className="text-2xl font-bold text-[var(--color-foreground)]">{journal.fullTextViews || Math.floor(journal.citationCount * 15)}</div>
            <div className="text-sm text-[var(--color-muted-foreground)]">Full Text Views</div>
          </div>
          <div className="p-3 border border-[var(--color-border)] rounded-lg text-center">
            <div className="text-2xl font-bold text-[var(--color-foreground)]">{journal.year}</div>
            <div className="text-sm text-[var(--color-muted-foreground)]">Publication Year</div>
          </div>
          <div className="p-3 border border-[var(--color-border)] rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{journal.isOpenAccess ? "Yes" : "No"}</div>
            <div className="text-sm text-[var(--color-muted-foreground)]">Open Access</div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-[var(--color-foreground)]">Document Sections</h2>
      
      {sections.map((section) => (
        section.hasContent && (
          <div key={section.id} className="border border-[var(--color-border)] rounded-lg">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-[var(--color-muted)] transition-colors"
            >
              <span className="font-medium text-[var(--color-foreground)]">
                {section.label}
              </span>
              {expandedSections[section.id] ? (
                <ChevronUp className="h-5 w-5 text-[var(--color-muted-foreground)]" />
              ) : (
                <ChevronDown className="h-5 w-5 text-[var(--color-muted-foreground)]" />
              )}
            </button>
            
            {expandedSections[section.id] && (
              <div className="px-4 pb-4 border-t border-[var(--color-border)]">
                <div className="pt-4">
                  {section.content}
                </div>
              </div>
            )}
          </div>
        )
      ))}
    </div>
  );
};

const Sidebar = ({ journal }: { journal: ResearchJournalData }) => {
  const relatedPapers = mockResearchJournals
    .filter(j => j.id !== journal.id && j.category === journal.category)
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Need Full-Text Access */}
      <div className="bg-blue-600 text-white rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold mb-2">Need</h3>
        <h3 className="text-2xl font-bold mb-4">Full-Text</h3>
        <p className="text-blue-100 mb-4 text-sm">
          access to Cognifera Digital Library for your organization?
        </p>
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-medium transition-colors">
          CONTACT COGNIFERA TO SUBSCRIBE
        </button>
      </div>

      {/* More Like This */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[var(--color-foreground)]">More Like This</h3>
        
        <div className="space-y-4">
          {relatedPapers.map((paper) => (
            <div key={paper.id} className="p-4 border border-[var(--color-border)] rounded-lg hover:shadow-sm transition-shadow">
              <h4 className="font-medium text-[var(--color-foreground)] text-sm mb-2 leading-tight">
                {paper.title}
              </h4>
              <p className="text-xs text-[var(--color-muted-foreground)] mb-2">
                {paper.journal} • Published: {paper.year}
              </p>
              <button
                onClick={() => window.location.href = `/publications/${paper.id}`}
                className="text-xs text-[var(--color-primary)] hover:underline"
              >
                Show More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Free Webinar Ad */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-lg p-6">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">Attention Authors in Indonesia:</div>
          <div className="bg-orange-500 text-white px-4 py-2 rounded-lg mb-4 font-bold">
            FREE WEBINAR
          </div>
          <div className="text-sm mb-2">4 September 2025</div>
          <div className="text-sm mb-4">10:00 - 11:30 WIB</div>
          <p className="text-xs mb-4 text-blue-100">
            Register now for this free webinar, which will review the opportunities available to Indonesian authors to enhance the visibility and impact of their research.
          </p>
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-medium transition-colors">
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};