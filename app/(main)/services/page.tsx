import { Metadata } from "next";
import ServicesPageClient from "../../../components/services/ServicesPageClient";

export const metadata: Metadata = {
  title: "Layanan Penelitian & Publikasi Ilmiah - Cognifera",
  description: "Layanan profesional untuk analisis data, bimbingan penelitian, publikasi jurnal internasional, hibah penelitian, dan penerbitan buku. Solusi komprehensif untuk mahasiswa, peneliti, dan dosen.",
  keywords: [
    "layanan penelitian",
    "analisis data penelitian",
    "bimbingan skripsi",
    "bimbingan tesis",
    "publikasi jurnal internasional",
    "hibah penelitian",
    "penerbitan buku",
    "jasa statistik",
    "konsultasi penelitian",
    "FERADATA",
    "FERAGUIDE",
    "FERAPUB",
    "FERAGRANT"
  ],
  openGraph: {
    title: "Layanan Penelitian & Publikasi Ilmiah - Cognifera",
    description: "Solusi komprehensif untuk kebutuhan penelitian, publikasi ilmiah, dan penerbitan buku. Dari analisis data hingga publikasi di jurnal internasional.",
    type: "website",
    locale: "id_ID",
    siteName: "Cognifera",
    images: [
      {
        url: "/og-services.jpg",
        width: 1200,
        height: 630,
        alt: "Layanan Cognifera"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Layanan Penelitian & Publikasi Ilmiah - Cognifera",
    description: "Solusi komprehensif untuk kebutuhan penelitian, publikasi ilmiah, dan penerbitan buku.",
    images: ["/og-services.jpg"]
  },
  alternates: {
    canonical: "/services"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
