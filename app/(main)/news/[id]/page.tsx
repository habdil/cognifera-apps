import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchPublicArticleById, getCategoryLabel } from "@/lib/api/public-articles";
import { NewsDetailClient } from "@/components/news/NewsDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const response = await fetchPublicArticleById(id);

    if (!response.success || !response.data) {
      return {
        title: "Artikel Tidak Ditemukan - Cognifera Education Academy",
        description: "Artikel yang Anda cari tidak tersedia atau telah dihapus.",
      };
    }

    const article = response.data;
    const excerpt = article.konten.length > 160
      ? article.konten.substring(0, 157) + "..."
      : article.konten;

    const authorName = article.author.fullName;

    return {
      title: `${article.judul} - Cognifera Education Academy`,
      description: excerpt.replace(/<[^>]*>/g, ''), // Remove HTML tags
      keywords: [
        ...article.tags,
        "artikel riset",
        "berita pendidikan",
        "teknologi edukasi",
        "penelitian akademik",
        "Cognifera Education",
        getCategoryLabel(article.category).toLowerCase(),
        authorName,
        "academic research",
        "educational technology",
        "research news"
      ],
      authors: [{ name: authorName }],
      creator: authorName,
      publisher: "PT Cognifera Education Academy",
      category: "Article",
      classification: getCategoryLabel(article.category),
      openGraph: {
        title: article.judul,
        description: excerpt.replace(/<[^>]*>/g, ''),
        url: `https://www.cognifera.web.id/news/${article.id}`,
        siteName: "Cognifera Education Academy",
        images: [
          {
            url: article.featuredImage || `https://www.cognifera.web.id/og-news.jpg`,
            width: 1200,
            height: 630,
            alt: article.judul,
          },
        ],
        locale: "id_ID",
        type: "article",
        publishedTime: article.publishedAt,
        authors: [authorName],
        section: getCategoryLabel(article.category),
        tags: article.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: article.judul,
        description: excerpt.replace(/<[^>]*>/g, ''),
        images: [article.featuredImage || `https://www.cognifera.web.id/twitter-news-${article.id}.jpg`],
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
        canonical: `https://www.cognifera.web.id/news/${article.id}`,
        languages: {
          "id-ID": `https://www.cognifera.web.id/news/${article.id}`,
          "en-US": `https://www.cognifera.web.id/en/news/${article.id}`,
        },
      },
      other: {
        "article:author": authorName,
        "article:published_time": article.publishedAt,
        "article:section": getCategoryLabel(article.category),
        "article:tag": article.tags.join(", "),
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: "Artikel Tidak Ditemukan - Cognifera Education Academy",
      description: "Artikel yang Anda cari tidak tersedia atau telah dihapus.",
    };
  }
}

export default async function NewsDetailPage({ params }: Props) {
  try {
    const { id } = await params;
    const response = await fetchPublicArticleById(id);

    if (!response.success || !response.data) {
      notFound();
    }

    const article = response.data;
    const authorName = article.author.fullName;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": article.judul,
      "description": article.konten.substring(0, 160).replace(/<[^>]*>/g, ''),
      "image": article.featuredImage || `https://www.cognifera.web.id/news-image-${article.id}.jpg`,
      "author": {
        "@type": "Person",
        "name": authorName
      },
      "publisher": {
        "@type": "Organization",
        "name": "PT Cognifera Education Academy",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.cognifera.web.id/logo.png"
        }
      },
      "datePublished": article.publishedAt || article.createdAt,
      "dateModified": article.updatedAt,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://www.cognifera.web.id/news/${article.id}`
      },
      "url": `https://www.cognifera.web.id/news/${article.id}`,
      "articleSection": getCategoryLabel(article.category),
      "keywords": article.tags.join(", "),
      "articleBody": article.konten.replace(/<[^>]*>/g, ''),
      "wordCount": article.konten.replace(/<[^>]*>/g, '').split(' ').length,
      "genre": getCategoryLabel(article.category),
      "about": {
        "@type": "Thing",
        "name": "Educational Technology and Research"
      },
      "isPartOf": {
        "@type": "WebSite",
        "name": "Cognifera Education Academy",
        "url": "https://www.cognifera.web.id"
      }
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
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Berita & Artikel",
          "item": "https://www.cognifera.web.id/news"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": article.judul,
          "item": `https://www.cognifera.web.id/news/${article.id}`
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
        <NewsDetailClient initialArticle={article} />
      </>
    );
  } catch (error) {
    console.error('Error loading article:', error);
    notFound();
  }
}