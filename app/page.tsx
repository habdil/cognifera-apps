
import { Metadata } from "next";
import { HomePageClient } from "@/components/home/HomePageClient";

export const metadata: Metadata = {
  title: "Cognifera Education Academy - Platform Riset Terintegrasi Terdepan Indonesia",
  description: "Platform riset terintegrasi yang menghubungkan akademisi Indonesia dengan publikasi berkualitas internasional. Layanan bimbingan riset, publikasi jurnal bereputasi, dan penerbitan buku ilmiah ber-ISBN dengan tingkat keberhasilan 98%.",
  keywords: [
    "platform riset Indonesia",
    "publikasi jurnal internasional",
    "bimbingan riset akademik",
    "penerbitan buku ilmiah",
    "layanan penelitian Indonesia",
    "jurnal bereputasi",
    "akademisi Indonesia",
    "riset terintegrasi",
    "teknologi pendidikan",
    "Cognifera Education",
    "research services",
    "scientific publishing",
    "academic writing",
    "thesis consultation",
    "research methodology",
    "data analysis",
    "statistical analysis",
    "peer review",
    "ISBN publishing",
    "educational technology"
  ],
  authors: [{ name: "PT Cognifera Education Academy" }],
  creator: "PT Cognifera Education Academy",
  publisher: "PT Cognifera Education Academy",
  category: "Education",
  classification: "Educational Technology",
  openGraph: {
    title: "Cognifera Education Academy - Platform Riset Terintegrasi Terdepan",
    description: "Menghubungkan akademisi Indonesia dengan publikasi berkualitas internasional. Layanan riset terintegrasi dengan bimbingan ahli, publikasi jurnal bereputasi, dan penerbitan buku ilmiah.",
    url: "https://www.cognifera.web.id",
    siteName: "Cognifera Education Academy",
    images: [
      {
        url: "https://www.cognifera.web.id/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Cognifera Education Academy - Platform Riset Terintegrasi Indonesia",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cognifera Education Academy - Platform Riset Terintegrasi Terdepan",
    description: "Platform riset yang menghubungkan akademisi Indonesia dengan publikasi internasional. Tingkat keberhasilan 98%.",
    images: ["https://www.cognifera.web.id/twitter-home.jpg"],
    creator: "@cogniferedu",
    site: "@cogniferedu",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "googledd71959ff56eb030.html",
  },
  alternates: {
    canonical: "https://www.cognifera.web.id",
    languages: {
      "id-ID": "https://www.cognifera.web.id",
      "en-US": "https://www.cognifera.web.id/en",
    },
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=no",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PT Cognifera Education Academy",
    "alternateName": "Cognifera Education",
    "url": "https://www.cognifera.web.id",
    "logo": "https://www.cognifera.web.id/logo.png",
    "description": "Platform riset terintegrasi yang menghubungkan akademisi Indonesia dengan publikasi berkualitas internasional",
    "foundingDate": "2025",
    "industry": "Educational Technology",
    "slogan": "Menghubungkan Akademisi dengan Publikasi Berkualitas Internasional",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ID",
      "addressRegion": "Indonesia"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+62-811-234-567",
        "contactType": "Customer Service",
        "email": "cognifera.edu@gmail.com",
        "availableLanguage": ["Indonesian", "English"]
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/cognifera-education",
      "https://www.instagram.com/cogniferedu",
      "https://twitter.com/cogniferedu"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Layanan Riset Cognifera",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Bimbingan Riset",
            "description": "Pendampingan komprehensif penelitian dari perencanaan hingga analisis data"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Publikasi Jurnal Internasional",
            "description": "Bantuan penulisan dan submission artikel ke jurnal bereputasi"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Penerbitan Buku Ilmiah",
            "description": "Publikasi buku ber-ISBN dengan editing profesional"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "50",
      "bestRating": "5"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Dr. Ahmad Fauzi"
        },
        "datePublished": "2025-01-15",
        "description": "Platform yang sangat membantu dalam proses publikasi jurnal internasional",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        }
      }
    ]
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.cognifera.web.id"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <HomePageClient />
    </>
  );
}
