"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

const teamData = [
  {
    name: "Dr. Muhammad Alqadri Burga, S.Pd.I., M.Pd",
    position: "Komisaris / Ketua Dewan Pengawas",
    image: "/photo-team/Qadri.png"
  },
  {
    name: "Dr. Hardianto, S.Pd., M.Pd",
    position: "Direktur Utama / Chief Executive Officer (CEO)",
    image: "/photo-team/Hardianto.png"
  },
  {
    name: "Musa, S.Kom., M.M",
    position: "Direktur Operasional / Chief Operating Officer (COO)",
    image: "/photo-team/Musa.png"
  },
  {
    name: "Ar. Nur Al Huda Asrul, S.T",
    position: "Direktur Keuangan / Chief Financial Officer (CFO)",
    image: "/photo-team/Huda.png"
  },
  {
    name: "Nurhinayah Burga, S.Pd., M.Pd",
    position: "Direktur Pemasaran / Chief Marketing Officer (CMO)",
    image: "/photo-team/Nurhinayah Burga.png"
  },
  {
    name: "Habdil Iqrawardana",
    position: "Direktur Teknologi / Chief Technology Officer (CTO)",
    image: "/photo-team/Habdil Iqrawardana.png"
  }
];


export default function OurTeamPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        
        {/* Hero Section */}
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Tim <span className="text-primary">Kepemimpinan</span>
              </h1>
              <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Dibalik kesuksesan Cognifera, terdapat tim kepemimpinan yang berpengalaman dan berdedikasi untuk memajukan ekosistem riset Indonesia.
              </p>
            </div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {teamData.map((member, index) => (
                <div key={index} className="text-center group">
                  <div className="mb-6">
                    <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden rounded-2xl bg-gray-100 shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `data:image/svg+xml;base64,${btoa(`
                            <svg width="192" height="192" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="192" height="192" fill="#f3f4f6"/>
                              <circle cx="96" cy="70" r="30" fill="#d1d5db"/>
                              <path d="M96 110c-30 0-52 15-52 37v12h104v-12c0-22-22-37-52-37z" fill="#d1d5db"/>
                            </svg>
                          `)}`;
                        }}
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {member.name}
                  </h3>
                  <div className="mb-2">
                    <p className="text-primary font-semibold mb-1">
                      {member.position.split(' / ')[0]}
                    </p>
                    {member.position.includes(' / ') && (
                      <p className="text-sm text-gray-500">
                        {member.position.split(' / ')[1]}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Message */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Pesan dari <span className="text-primary">Kepemimpinan</span>
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
              <blockquote className="text-xl text-gray-600 italic leading-relaxed mb-8">
                "Kami berkomitmen untuk membangun ekosistem riset yang berkelanjutan dan berkualitas tinggi. 
                Melalui platform terintegrasi Cognifera, kami ingin menjadi jembatan yang menghubungkan 
                akademisi Indonesia dengan standar publikasi internasional."
              </blockquote>
              <div className="text-center">
                <p className="font-semibold text-gray-900">Tim Kepemimpinan</p>
                <p className="text-gray-600">PT Cognifera Education Academy</p>
              </div>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}