import { Metadata } from "next";
import OurTeamContent from "./components/OurTeamContent";

// Team data for SEO
const teamMembers = [
  {
    name: "Dr. Muhammad Alqadri Burga",
    position: "Komisaris / Ketua Dewan Pengawas",
    credentials: "S.Pd.I., M.Pd, Doktor"
  },
  {
    name: "Dr. Hardianto",
    position: "CEO Cognifera",
    credentials: "S.Pd., M.Pd, Doktor"
  },
  {
    name: "Musa",
    position: "COO Cognifera",
    credentials: "S.Kom., M.M"
  },
  {
    name: "Ar. Nur Al Huda Asrul",
    position: "CFO Cognifera",
    credentials: "S.T, Arsitek"
  },
  {
    name: "Nurhinayah Burga",
    position: "CMO Cognifera",
    credentials: "S.Pd., M.Pd"
  },
  {
    name: "Habdil Iqrawardana",
    position: "CTO Cognifera",
    credentials: "Technology Expert"
  }
];

export const metadata: Metadata = {
  title: "Tim Ahli",
  description: `Bertemu dengan tim ahli Cognifera Academy: Dr. Muhammad Alqadri Burga (Komisaris), Dr. Hardianto (CEO), Musa (COO), Ar. Nur Al Huda Asrul (CFO), Nurhinayah Burga (CMO), dan Habdil Iqrawardana (CTO). Tim profesional berpengalaman dalam riset, konsultasi, dan teknologi pendidikan.`,
  keywords: [
    // Individual names for Google indexing
    "Habdil Iqrawardana", "Dr. Hardianto", "Dr. Muhammad Alqadri Burga",
    "Nurhinayah Burga", "Musa Cognifera", "Ar. Nur Al Huda Asrul",

    // Positions and roles
    "CTO Cognifera", "CEO Cognifera", "Direktur Teknologi Cognifera",
    "Tim Cognifera", "Expert Team Cognifera", "Komisaris Cognifera",

    // Professional terms
    "ahli teknologi pendidikan", "expert riset akademik", "konsultan pendidikan",
    "technology leader Indonesia", "CEO pendidikan", "CTO startup pendidikan",

    // Company and services
    "Cognifera Academy team", "tim ahli riset", "konsultan akademik Indonesia",
    "expert team research", "professional education consultant"
  ],
  openGraph: {
    title: "Tim Ahli Cognifera Academy - Expert Team",
    description: "Tim profesional Cognifera Academy dengan Dr. Hardianto (CEO), Habdil Iqrawardana (CTO), dan expert team berpengalaman dalam riset, konsultasi, dan teknologi pendidikan.",
    url: "https://www.cognifera.web.id/our-team",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Tim Ahli Cognifera Academy - Expert Team"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Tim Ahli Cognifera Academy - Expert Team",
    description: "Tim profesional Cognifera Academy dengan expertise dalam riset, konsultasi, dan teknologi pendidikan.",
    images: ["/og-team.png"]
  },
  alternates: {
    canonical: "https://www.cognifera.web.id/our-team"
  },
  other: {
    // Additional SEO tags for team members
    "team-members": teamMembers.map(member => member.name).join(", "),
    "team-expertise": "Research, Education Technology, Business Consulting, Academic Services"
  }
};

export default function OurTeamPage() {
  // Structured Data for Team Members (JSON-LD)
  const teamStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Cognifera Academy",
    "url": "https://www.cognifera.web.id",
    "employee": teamMembers.map(member => ({
      "@type": "Person",
      "name": member.name,
      "jobTitle": member.position,
      "worksFor": {
        "@type": "Organization",
        "name": "Cognifera Academy",
        "url": "https://www.cognifera.web.id"
      },
      "alumniOf": member.credentials,
      "knowsAbout": member.name === "Habdil Iqrawardana"
        ? ["Software Development", "Education Technology", "Digital Innovation", "Full Stack Development"]
        : member.name === "Dr. Hardianto"
        ? ["Executive Leadership", "Education Innovation", "Organizational Management"]
        : ["Education", "Research", "Academic Services"]
    }))
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(teamStructuredData)
        }}
      />

      {/* Individual Person Schema for key members */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Habdil Iqrawardana",
            "jobTitle": "Chief Technology Officer",
            "description": "Technology leader dan CTO di Cognifera Academy dengan keahlian dalam pengembangan software, teknologi pendidikan, dan inovasi digital.",
            "worksFor": {
              "@type": "Organization",
              "name": "Cognifera Academy",
              "url": "https://www.cognifera.web.id"
            },
            "knowsAbout": [
              "Software Development",
              "Education Technology",
              "Digital Innovation",
              "Full Stack Development",
              "Technology Leadership"
            ],
            "sameAs": [
              "https://www.cognifera.web.id/our-team"
            ]
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Dr. Hardianto",
            "jobTitle": "Chief Executive Officer",
            "description": "CEO Cognifera Academy dengan gelar Doktor, memimpin inovasi dalam pendidikan dan pengembangan organisasi.",
            "worksFor": {
              "@type": "Organization",
              "name": "Cognifera Academy",
              "url": "https://www.cognifera.web.id"
            },
            "knowsAbout": [
              "Executive Leadership",
              "Education Innovation",
              "Organizational Management",
              "Strategic Planning"
            ]
          })
        }}
      />

      <OurTeamContent />
    </>
  );
}