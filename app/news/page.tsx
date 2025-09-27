import { Metadata } from "next";
import { NewsPageClient } from "@/components/news/NewsPageClient";

export const metadata: Metadata = {
  title: "Berita & Artikel Riset Terbaru - Cognifera Education Academy",
  description: "Ikuti perkembangan terbaru di dunia riset, teknologi pendidikan, dan inovasi akademik melalui artikel-artikel pilihan dari Cognifera Education Academy. Berita industri, penelitian, dan pengumuman terkini.",
  keywords: [
    "berita riset terbaru",
    "artikel teknologi pendidikan",
    "inovasi akademik",
    "perkembangan penelitian",
    "berita industri pendidikan",
    "artikel ilmiah",
    "research news Indonesia",
    "educational technology news",
    "academic innovation",
    "research updates",
    "jurnal research",
    "publikasi terbaru",
    "berita Cognifera",
    "artikel pendidikan",
    "news riset",
    "scientific articles",
    "research trends",
    "academic publishing news"
  ],
  authors: [{ name: "Tim Editorial Cognifera" }],
  creator: "PT Cognifera Education Academy",
  publisher: "PT Cognifera Education Academy",
  category: "News",
  classification: "Educational News",
  openGraph: {
    title: "Berita & Artikel Riset Terbaru - Cognifera Education Academy",
    description: "Perkembangan terbaru di dunia riset, teknologi pendidikan, dan inovasi akademik. Artikel pilihan, berita industri, dan pengumuman dari platform riset terintegrasi terdepan.",
    url: "https://cognifera.com/news",
    siteName: "Cognifera Education Academy",
    images: [
      {
        url: "https://cognifera.com/og-news.jpg",
        width: 1200,
        height: 630,
        alt: "Berita & Artikel Riset Terbaru - Cognifera Education Academy",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Berita & Artikel Riset Terbaru - Cognifera Education",
    description: "Ikuti perkembangan terbaru di dunia riset dan teknologi pendidikan. Artikel pilihan dan berita industri dari platform riset terintegrasi.",
    images: ["https://cognifera.com/twitter-news.jpg"],
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
  alternates: {
    canonical: "https://cognifera.com/news",
    languages: {
      "id-ID": "https://cognifera.com/news",
      "en-US": "https://cognifera.com/en/news",
    },
  },
  other: {
    "article:section": "Research & Education",
  },
};

export default function NewsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Berita & Artikel Riset",
    "description": "Kumpulan berita dan artikel terbaru tentang riset, teknologi pendidikan, dan inovasi akademik",
    "url": "https://cognifera.com/news",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Cognifera Education Academy",
      "url": "https://cognifera.com"
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Artikel Riset Terbaru",
      "description": "Daftar artikel dan berita terbaru tentang penelitian dan teknologi pendidikan",
      "itemListOrder": "https://schema.org/ItemListOrderDescending"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://cognifera.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Berita & Artikel",
          "item": "https://cognifera.com/news"
        }
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "PT Cognifera Education Academy",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cognifera.com/logo.png"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NewsPageClient />
    </>
  );
}