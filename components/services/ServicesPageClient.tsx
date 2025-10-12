"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Sparkles,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { LayananData } from "@/types";
import { layananAPI, iklanAPI } from "@/lib/api-dummy";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1] as const
    }
  }
};

type ServiceWithPromo = LayananData & {
  hasPromo?: boolean;
  promoDiscount?: number;
  isTrending?: boolean;
};

export default function ServicesPageClient() {
  const [services, setServices] = useState<ServiceWithPromo[]>([]);
  const [filteredServices, setFilteredServices] = useState<ServiceWithPromo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [servicesRes, promosRes] = await Promise.all([
          layananAPI.getAll({ status: "aktif" }),
          iklanAPI.getAll({ status: "aktif" })
        ]);

        if (servicesRes.success && servicesRes.data) {
          const activePromos = promosRes.success ? promosRes.data || [] : [];

          const enhancedServices: ServiceWithPromo[] = servicesRes.data.map((service, index) => {
            const servicePromo = activePromos.find(promo =>
              promo.layananAffected.includes(service.id) &&
              new Date() >= new Date(promo.tanggalMulai) &&
              new Date() <= new Date(promo.tanggalBerakhir)
            );

            return {
              ...service,
              hasPromo: !!servicePromo,
              promoDiscount: servicePromo?.discountPercentage,
              isTrending: index < 2
            };
          });

          setServices(enhancedServices);
          setFilteredServices(enhancedServices);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter services
  useEffect(() => {
    let filtered = [...services];

    if (selectedCategory !== "all") {
      filtered = filtered.filter(service =>
        service.kategori === selectedCategory
      );
    }

    setFilteredServices(filtered);
  }, [selectedCategory, services]);

  const categories = [
    { id: "all", label: "Semua Layanan", icon: "grid-3x3" },
    { id: "analisis-data", label: "Analisis Data", icon: "bar-chart" },
    { id: "bimbingan", label: "Bimbingan", icon: "compass" },
    { id: "publikasi", label: "Publikasi Jurnal", icon: "send" },
    { id: "hibah", label: "Hibah Penelitian", icon: "award" },
    { id: "penerbitan-buku", label: "Penerbitan Buku", icon: "book-open" }
  ];

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}jt`;
    }
    return `${(price / 1000).toFixed(0)}k`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-12 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="inline-block">
              <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm font-medium">
                Layanan Profesional
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              <LayoutTextFlip
                text="Layanan untuk"
                words={[
                  "Mahasiswa",
                  "Peneliti",
                  "Dosen",
                  "Institusi Riset"
                ]}
                duration={2500}
              />
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Solusi komprehensif untuk kebutuhan penelitian, publikasi ilmiah, dan penerbitan buku Anda.
            </p>
          </div>
        </motion.div>

        {/* Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            {filteredServices.length} layanan ditemukan
          </p>
        </div>

        {/* Services Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div className="inline-block w-6 h-6 border-2 border-muted border-t-foreground rounded-full animate-spin" />
            </motion.div>
          ) : filteredServices.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground mb-4">Layanan tidak ditemukan</p>
              <Button variant="outline" onClick={() => setSelectedCategory("all")}>
                Reset Filter
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="services"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
            >
              {filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  layout
                >
                  <Card className="h-full hover:shadow-lg transition-shadow group">
                    {/* Badges */}
                    {service.hasPromo && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge variant="destructive" className="text-xs">
                          <Sparkles className="w-3 h-3 mr-1" />
                          -{service.promoDiscount}%
                        </Badge>
                      </div>
                    )}

                    <CardHeader>
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                          style={{ backgroundColor: service.warna }}
                        >
                          {service.nama.substring(0, 2)}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-1">{service.nama}</CardTitle>
                          <CardDescription>{service.tagline}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.deskripsi}
                      </p>

                      {/* Success Rate */}
                      {service.successRate && (
                        <div className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                          <CheckCircle2 className="w-3 h-3" />
                          {service.successRate} Success Rate
                        </div>
                      )}

                      {/* Fitur Utama */}
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase">Fitur Utama</p>
                        <ul className="space-y-1.5">
                          {service.fiturUtama.slice(0, 3).map((fitur, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <span
                                className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                                style={{ backgroundColor: service.warna }}
                              />
                              <span className="text-muted-foreground">{fitur}</span>
                            </li>
                          ))}
                        </ul>
                        {service.fiturUtama.length > 3 && (
                          <p className="text-xs text-muted-foreground">
                            +{service.fiturUtama.length - 3} fitur lainnya
                          </p>
                        )}
                      </div>

                      {/* Target Market */}
                      <div className="flex flex-wrap gap-1.5">
                        {service.targetMarket.map((market, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs font-normal">
                            {market}
                          </Badge>
                        ))}
                      </div>

                      {/* Pricing & CTA */}
                      <div className="pt-4 border-t space-y-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Mulai dari</p>
                          {service.hasPromo && service.promoDiscount ? (
                            <div className="flex items-baseline gap-2">
                              <span className="text-sm text-muted-foreground line-through">
                                Rp {formatPrice(service.hargaMulai)}
                              </span>
                              <span className="text-2xl font-bold text-red-600">
                                Rp {formatPrice(service.hargaMulai * (1 - service.promoDiscount / 100))}
                              </span>
                            </div>
                          ) : (
                            <p className="text-2xl font-bold">
                              Rp {formatPrice(service.hargaMulai)}
                            </p>
                          )}
                        </div>

                        <Link href={`/services/${service.id}`}>
                          <Button
                            className="w-full"
                            variant="outline"
                          >
                            Lihat Detail
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
