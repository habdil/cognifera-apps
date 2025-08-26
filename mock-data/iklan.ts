import { IklanData } from '../types';

export const mockIklan: IklanData[] = [
  {
    id: "promo-back-to-school",
    judul: "Back to School Special",
    deskripsi: "Diskon spesial untuk mahasiswa baru! Dapatkan potongan harga hingga 30% untuk semua layanan FERA",
    discountPercentage: 30,
    layananAffected: ["feradata", "feraguide", "feragrant"],
    tanggalMulai: new Date("2024-08-01"),
    tanggalBerakhir: new Date("2024-09-30"),
    termsConditions: "Berlaku untuk mahasiswa S1/S2/S3 dengan menunjukkan kartu mahasiswa aktif. Tidak dapat digabung dengan promo lain. Maksimal penggunaan 1 kali per mahasiswa.",
    bannerImage: "/images/promo-back-to-school.jpg",
    status: "aktif",
    priority: 1,
    createdAt: new Date("2024-07-15"),
    updatedAt: new Date("2024-08-01")
  },
  {
    id: "promo-early-bird",
    judul: "Early Bird Research Package",
    deskripsi: "Mulai riset lebih awal, dapatkan benefit lebih banyak! Hemat 25% untuk paket konsultasi lengkap",
    discountPercentage: 25,
    layananAffected: ["feraguide", "ferapub"],
    tanggalMulai: new Date("2024-08-15"),
    tanggalBerakhir: new Date("2024-10-15"),
    termsConditions: "Khusus untuk penelitian yang dimulai minimal 3 bulan sebelum deadline. Pembayaran dapat dicicil. Include konsultasi tambahan gratis.",
    bannerImage: "/images/promo-early-bird.jpg",
    status: "aktif",
    priority: 2,
    createdAt: new Date("2024-08-01"),
    updatedAt: new Date("2024-08-15")
  },
  {
    id: "promo-publication-boost",
    judul: "Publication Success Boost",
    deskripsi: "Tingkatkan peluang publikasi Anda! Dapatkan review gratis + diskon 20% untuk revisi manuscript",
    discountPercentage: 20,
    layananAffected: ["feragrant", "ferapub"],
    tanggalMulai: new Date("2024-09-01"),
    tanggalBerakhir: new Date("2024-11-30"),
    termsConditions: "Berlaku untuk manuscript yang telah selesai dan siap review. Include 2x revisi gratis. Garansi kualitas atau uang kembali.",
    bannerImage: "/images/promo-publication-boost.jpg",
    status: "aktif",
    priority: 3,
    createdAt: new Date("2024-08-20"),
    updatedAt: new Date("2024-08-25")
  },
  {
    id: "promo-data-analysis",
    judul: "Data Analysis Express",
    deskripsi: "Butuh analisis data cepat? Hemat waktu dan biaya dengan paket express kami - diskon 15%",
    discountPercentage: 15,
    layananAffected: ["feradata"],
    tanggalMulai: new Date("2024-08-20"),
    tanggalBerakhir: new Date("2024-12-31"),
    termsConditions: "Untuk dataset dengan kompleksitas rendah-sedang. Hasil dalam 3-5 hari kerja. Include interpretasi dan visualisasi basic.",
    bannerImage: "/images/promo-data-express.jpg",
    status: "aktif",
    priority: 4,
    createdAt: new Date("2024-08-15"),
    updatedAt: new Date("2024-08-20")
  }
];