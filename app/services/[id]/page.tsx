import { Metadata } from "next";
import { notFound } from "next/navigation";
import { layananAPI } from "@/lib/api-dummy";
import { ServiceDetailClient } from "@/components/services/ServiceDetailClient";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const response = await layananAPI.getById(params.id);

  if (!response.success || !response.data) {
    return {
      title: "Layanan Tidak Ditemukan - Cognifera Education Academy",
      description: "Layanan yang Anda cari tidak tersedia atau telah dihapus.",
    };
  }

  const service = response.data;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return {
    title: `${service.nama} - ${service.tagline} | Cognifera Education Academy`,
    description: `${service.deskripsiLengkap} Mulai dari ${formatPrice(service.hargaMulai)}. Layanan ${service.nama} terpercaya dengan fitur lengkap untuk kebutuhan riset dan akademik Anda.`,
    keywords: [
      service.nama.toLowerCase(),
      service.tagline.toLowerCase(),
      ...service.fiturUtama.map(fitur => fitur.toLowerCase()),
      ...service.targetMarket.map(target => target.toLowerCase()),
      "layanan riset",
      "bimbingan akademik",
      "penelitian Indonesia",
      "publikasi jurnal",
      "academic services",
      "research consultation",
      "thesis guidance",
      "journal publication",
      "Cognifera Education",
      "platform riset",
      "layanan akademik",
      "konsultasi penelitian"
    ],
    authors: [{ name: "Tim Cognifera Education Academy" }],
    creator: "PT Cognifera Education Academy",
    publisher: "PT Cognifera Education Academy",
    category: "Services",
    classification: "Educational Services",
    openGraph: {
      title: `${service.nama} - ${service.tagline}`,
      description: `${service.deskripsiLengkap} Mulai dari ${formatPrice(service.hargaMulai)}.`,
      url: `https://cognifera.com/services/${service.id}`,
      siteName: "Cognifera Education Academy",
      images: [
        {
          url: `https://cognifera.com/og-service-${service.id}.jpg`,
          width: 1200,
          height: 630,
          alt: `${service.nama} - Cognifera Education Academy`,
        },
      ],
      locale: "id_ID",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.nama} - ${service.tagline}`,
      description: `${service.deskripsiLengkap.substring(0, 120)}... Mulai dari ${formatPrice(service.hargaMulai)}.`,
      images: [`https://cognifera.com/twitter-service-${service.id}.jpg`],
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
      canonical: `https://cognifera.com/services/${service.id}`,
      languages: {
        "id-ID": `https://cognifera.com/services/${service.id}`,
        "en-US": `https://cognifera.com/en/services/${service.id}`,
      },
    },
    other: {
      "product:price:amount": service.hargaMulai.toString(),
      "product:price:currency": "IDR",
      "service:category": "Educational Services",
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const response = await layananAPI.getById(params.id);

  if (!response.success || !response.data) {
    notFound();
  }

  const service = response.data;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.nama,
    "description": service.deskripsiLengkap,
    "url": `https://cognifera.com/services/${service.id}`,
    "image": `https://cognifera.com/service-image-${service.id}.jpg`,
    "provider": {
      "@type": "Organization",
      "name": "PT Cognifera Education Academy",
      "url": "https://cognifera.com",
      "logo": "https://cognifera.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+62-811-234-567",
        "contactType": "Customer Service",
        "email": "cognifera.edu@gmail.com"
      }
    },
    "serviceType": "Educational Services",
    "category": "Academic Research Support",
    "offers": {
      "@type": "Offer",
      "price": service.hargaMulai,
      "priceCurrency": "IDR",
      "priceValidUntil": "2025-12-31",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-01-01",
      "url": `https://cognifera.com/services/${service.id}`,
      "seller": {
        "@type": "Organization",
        "name": "PT Cognifera Education Academy"
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": "Indonesia"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": service.targetMarket.join(", ")
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${service.nama} Features`,
      "itemListElement": service.fiturUtama.map((fitur, index) => ({
        "@type": "Offer",
        "position": index + 1,
        "itemOffered": {
          "@type": "Service",
          "name": fitur
        }
      }))
    },
    "aggregateRating": service.successRate ? {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "25",
      "bestRating": "5"
    } : undefined,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Cognifera Education Academy",
      "url": "https://cognifera.com"
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
        "item": "https://cognifera.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Layanan",
        "item": "https://cognifera.com/#services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.nama,
        "item": `https://cognifera.com/services/${service.id}`
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
      <ServiceDetailClient initialService={service} />
    </>
  );
}