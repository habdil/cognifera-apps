import { Metadata } from "next";
import VisiMisiContent from "./components/VisiMisiContent";

export const metadata: Metadata = {
  title: "Visi Misi Cognifera - Platform Riset Terintegrasi Asia Tenggara",
  description: "Visi: Menjadi platform riset terintegrasi terdepan di Asia Tenggara. Misi: Menghubungkan akademisi dengan publikasi berkualitas internasional, meningkatkan daya saing riset Indonesia di kancah global melalui inovasi dan kolaborasi.",
  keywords: [
    "visi misi cognifera", "platform riset terintegrasi", "publikasi internasional",
    "riset Indonesia", "daya saing akademik", "inovasi penelitian",
    "ekosistem riset", "asia tenggara research", "academic excellence",
    "research platform", "scientific publication", "academic collaboration",
    "innovation in education", "research sustainability", "academic integrity",
    "cognifera vision mission", "research ecosystem indonesia"
  ],
  openGraph: {
    title: "Visi Misi Cognifera - Platform Riset Terintegrasi Asia Tenggara",
    description: "Menjadi platform riset terintegrasi terdepan di Asia Tenggara yang menghubungkan akademisi dengan publikasi berkualitas internasional dan meningkatkan daya saing riset Indonesia.",
    url: "https://www.cognifera.web.id/visi-misi",
    type: "website",
    images: [
      {
        url: "/og-vision.png",
        width: 1200,
        height: 630,
        alt: "Visi Misi Cognifera Academy"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Visi Misi Cognifera - Platform Riset Terintegrasi Asia Tenggara",
    description: "Menjadi platform riset terintegrasi terdepan di Asia Tenggara yang menghubungkan akademisi dengan publikasi internasional.",
    images: ["/og-vision.png"]
  },
  alternates: {
    canonical: "https://www.cognifera.web.id/visi-misi"
  }
};

export default function VisiMisiPage() {
  // Structured Data for Organization Vision & Mission
  const visionMissionStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Cognifera Academy",
    "url": "https://www.cognifera.web.id",
    "mission": "Menyediakan platform terintegrasi dari bimbingan riset hingga publikasi jurnal internasional dan penerbitan buku akademik, meningkatkan kualitas publikasi ilmiah peneliti Indonesia, membangun ekosistem riset kolaboratif, dan memberikan pendampingan profesional dengan standar internasional.",
    "description": "Menjadi platform riset terintegrasi terdepan di Asia Tenggara yang menghubungkan akademisi dengan publikasi berkualitas internasional, mendorong inovasi penelitian, dan meningkatkan daya saing riset Indonesia di kancah global.",
    "knowsAbout": [
      "Research Platform",
      "Academic Publishing",
      "International Publication",
      "Research Collaboration",
      "Academic Excellence",
      "Scientific Innovation",
      "Education Technology",
      "Research Sustainability"
    ],
    "areaServed": {
      "@type": "Place",
      "name": "Asia Tenggara"
    },
    "foundingLocation": {
      "@type": "Place",
      "name": "Indonesia"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Research Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Platform Riset Terintegrasi",
            "description": "Platform komprehensif dari bimbingan riset hingga publikasi jurnal internasional"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Peningkatan Kualitas Publikasi",
            "description": "Meningkatkan kualitas dan kuantitas publikasi ilmiah dengan standar internasional"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Ekosistem Kolaboratif",
            "description": "Membangun jaringan kolaborasi antar akademisi, institusi, dan industri"
          }
        }
      ]
    }
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(visionMissionStructuredData)
        }}
      />

      <VisiMisiContent />
    </>
  );
}