import { Metadata } from "next";
import { ProfilePageClient } from "@/components/profile/ProfilePageClient";

export const metadata: Metadata = {
  title: "Profil Perusahaan - PT Cognifera Education Academy | Platform Riset Terintegrasi Indonesia",
  description: "Pelajari tentang PT Cognifera Education Academy, perusahaan teknologi pendidikan terdepan yang menyediakan platform riset terintegrasi untuk akademisi Indonesia. Bimbingan riset, publikasi jurnal internasional, dan penerbitan buku ilmiah ber-ISBN.",
  keywords: [
    "profil perusahaan Cognifera",
    "PT Cognifera Education Academy",
    "teknologi pendidikan Indonesia",
    "platform riset akademik",
    "layanan penelitian Indonesia",
    "publikasi jurnal internasional",
    "bimbingan riset",
    "penerbitan buku ilmiah",
    "akademisi Indonesia",
    "riset terintegrasi",
    "pendampingan penelitian",
    "jurnal bereputasi",
    "teknologi edukasi",
    "research services Indonesia"
  ],
  authors: [{ name: "PT Cognifera Education Academy" }],
  creator: "PT Cognifera Education Academy",
  publisher: "PT Cognifera Education Academy",
  category: "Technology",
  classification: "Education Technology",
  openGraph: {
    title: "Profil PT Cognifera Education Academy - Platform Riset Terintegrasi Terdepan",
    description: "Perusahaan teknologi pendidikan yang menghubungkan akademisi Indonesia dengan publikasi berkualitas internasional. Layanan bimbingan riset, publikasi jurnal, dan penerbitan buku dengan tingkat keberhasilan 98%.",
    url: "https://www.cognifera.web.id/profile",
    siteName: "Cognifera Education Academy",
    images: [
      {
        url: "https://www.cognifera.web.id/og-profile.png",
        width: 1200,
        height: 630,
        alt: "PT Cognifera Education Academy - Platform Riset Terintegrasi",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Profil PT Cognifera Education Academy - Platform Riset Terintegrasi",
    description: "Perusahaan teknologi pendidikan terdepan untuk akademisi Indonesia. Layanan riset terintegrasi dengan tingkat keberhasilan 98%.",
    images: ["https://www.cognifera.web.id/twitter-profile.jpg"],
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
    google: "google-site-verification-code",
    yahoo: "yahoo-verification-code",
  },
  alternates: {
    canonical: "https://www.cognifera.web.id/profile",
    languages: {
      "id-ID": "https://www.cognifera.web.id/profile",
      "en-US": "https://www.cognifera.web.id/en/profile",
    },
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=no",
  },
};

export default function ProfilePage() {
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
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ID",
      "addressRegion": "Indonesia"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+62-811-234-567",
      "contactType": "Customer Service",
      "email": "cognifera.edu@gmail.com",
      "availableLanguage": ["Indonesian", "English"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/cognifera-education",
      "https://www.instagram.com/cogniferedu",
      "https://twitter.com/cogniferedu"
    ],
    "service": [
      {
        "@type": "Service",
        "name": "Bimbingan Riset",
        "description": "Pendampingan komprehensif dari tahap perencanaan penelitian hingga analisis data"
      },
      {
        "@type": "Service",
        "name": "Publikasi Jurnal",
        "description": "Bantuan penulisan dan submission artikel ilmiah ke jurnal internasional bereputasi"
      },
      {
        "@type": "Service",
        "name": "Penerbitan Buku",
        "description": "Publikasi buku ilmiah ber-ISBN dengan editing profesional dan distribusi nasional"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "10",
      "bestRating": "5"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProfilePageClient />
    </>
  );
}