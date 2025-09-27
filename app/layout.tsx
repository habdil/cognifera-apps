import type { Metadata } from "next";
import { Work_Sans, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.cognifera.web.id'),
  title: {
    default: "Cognifera - Riset, Publikasi Jurnal & Penerbitan Buku",
    template: "%s | Cognifera"
  },
  description: "Cognifera menyediakan layanan riset akademik, konsultasi, dan pendidikan berkualitas tinggi. Solusi terpercaya untuk kebutuhan penelitian dan pengembangan organisasi Anda.",
  keywords: [
    "jasa riset", "konsultasi akademik", "pendidikan", "penelitian akademik",
    "analisis data", "riset pasar", "konsultasi manajemen", "training",
    "cognifera", "research service", "business consulting"
  ],
  authors: [{ name: "Cognifera Team" }],
  creator: "Cognifera",
  publisher: "Cognifera",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://www.cognifera.web.id',
    title: 'Cognifera - Riset, Publikasi Jurnal & Penerbitan Buku',
    description: 'Cognifera menyediakan layanan riset akademik, konsultasi bisnis, dan pendidikan berkualitas tinggi. Solusi terpercaya untuk kebutuhan penelitian dan pengembangan organisasi Anda.',
    siteName: 'Cognifera',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cognifera - Riset, Publikasi Jurnal & Penerbitan Buku',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cognifera - Riset, Publikasi Jurnal & Penerbitan Buku',
    description: 'Cognifera menyediakan layanan riset akademik, konsultasi, dan pendidikan berkualitas tinggi.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'googledd71959ff56eb030.html',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="canonical" href="https://www.cognifera.web.id" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Cognifera",
              "url": "https://www.cognifera.web.id",
              "logo": "https://www.cognifera.web.id/logo.png",
              "description": "Cognifera menyediakan layanan riset akademik, konsultasi, dan pendidikan berkualitas tinggi.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Jakarta",
                "addressCountry": "ID"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": ["Indonesian", "English"]
              },
              "sameAs": [
                "https://www.linkedin.com/company/cognifera",
                "https://www.instagram.com/cognifera_official"
              ],
              "offers": [
                {
                  "@type": "Service",
                  "name": "Jasa Riset Akademik",
                  "description": "Layanan penelitian akademik profesional"
                },
                {
                  "@type": "Service",
                  "name": "Konsultasi Akademik",
                  "description": "Konsultasi strategi dan manajemen akademik"
                },
                {
                  "@type": "Service",
                  "name": "Pelatihan & Pendidikan",
                  "description": "Program pelatihan dan pengembangan SDM"
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${workSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'var(--background)',
              border: '1px solid var(--border)',
              color: 'var(--foreground)',
            },
            className: 'my-toast',
            duration: 4000,
          }}
        />
      </body>
    </html>
  );
}
