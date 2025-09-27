"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const teamData = [
  {
    id: "muhammad-alqadri-burga",
    name: "Dr. Muhammad Alqadri Burga, S.Pd.I., M.Pd",
    position: "Komisaris / Ketua Dewan Pengawas",
    image: "/photo-team/Qadri.png",
    bio: "Pemimpin visioner dengan pengalaman luas dalam pendidikan dan manajemen strategis.",
    specialties: ["Manajemen Strategis", "Pendidikan", "Kepemimpinan"],
    education: "S.Pd.I., M.Pd, Doktor"
  },
  {
    id: "hardianto",
    name: "Dr. Hardianto, S.Pd., M.Pd",
    position: "Direktur Utama / Chief Executive Officer (CEO)",
    image: "/photo-team/Hardianto.png",
    bio: "CEO berpengalaman dengan fokus pada inovasi pendidikan dan pengembangan organisasi.",
    specialties: ["Kepemimpinan Eksekutif", "Inovasi Pendidikan", "Manajemen Organisasi"],
    education: "S.Pd., M.Pd, Doktor"
  },
  {
    id: "musa",
    name: "Musa, S.Kom., M.M",
    position: "Direktur Operasional / Chief Operating Officer (COO)",
    image: "/photo-team/Musa.png",
    bio: "Ahli operasional dengan latar belakang teknologi dan manajemen bisnis.",
    specialties: ["Manajemen Operasional", "Teknologi", "Manajemen Bisnis"],
    education: "S.Kom., M.M"
  },
  {
    id: "nur-al-huda-asrul",
    name: "Ar. Nur Al Huda Asrul, S.T",
    position: "Direktur Keuangan / Chief Financial Officer (CFO)",
    image: "/photo-team/Huda.png",
    bio: "Arsitek dan ahli keuangan dengan keahlian dalam manajemen finansial strategis.",
    specialties: ["Manajemen Keuangan", "Arsitektur", "Perencanaan Strategis"],
    education: "S.T, Arsitek"
  },
  {
    id: "nurhinayah-burga",
    name: "Nurhinayah Burga, S.Pd., M.Pd",
    position: "Direktur Pemasaran / Chief Marketing Officer (CMO)",
    image: "/photo-team/Nurhinayah Burga.png",
    bio: "Pakar pemasaran pendidikan dengan pengalaman dalam strategi komunikasi dan branding.",
    specialties: ["Pemasaran Digital", "Strategi Komunikasi", "Branding Pendidikan"],
    education: "S.Pd., M.Pd"
  },
  {
    id: "habdil-iqrawardana",
    name: "Habdil Iqrawardana",
    position: "Direktur Teknologi / Chief Technology Officer (CTO)",
    image: "/photo-team/Habdil Iqrawardana.png",
    bio: "Technology leader dengan keahlian dalam pengembangan platform digital dan inovasi teknologi pendidikan.",
    specialties: ["Pengembangan Software", "Teknologi Pendidikan", "Inovasi Digital", "Full Stack Development"],
    education: "Technology Expert"
  }
];

export default function OurTeamContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Tim <span className="text-primary">Cognifera Academy</span>
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Bertemu dengan tim ahli kami yang berdedikasi untuk memberikan layanan riset, konsultasi, dan pendidikan terbaik. Tim profesional dengan pengalaman luas di bidangnya masing-masing.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamData.map((member, index) => (
              <div
                key={member.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={member.image}
                      alt={`${member.name} - ${member.position} di Cognifera`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0  transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold mb-3">
                    {member.position}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {member.bio}
                  </p>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 mb-2">KEAHLIAN:</p>
                    <div className="flex flex-wrap gap-1">
                      {member.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-gray-500">
                    <span className="font-semibold">Pendidikan: </span>{member.education}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}