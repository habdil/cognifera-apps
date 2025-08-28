export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: "call-for-papers" | "system-update" | "partnership" | "event" | "policy" | "general";
  priority: "high" | "medium" | "low";
  publishDate: string;
  author: string;
  tags: string[];
  isActive: boolean;
}

export const mockAnnouncements: Announcement[] = [
  {
    id: "cfp-2024-ai",
    title: "Call for Papers - Edisi Khusus 2024: \"AI dalam Pendidikan\"",
    content: "Kami mengundang submission artikel untuk edisi khusus tentang \"Artificial Intelligence dalam Pendidikan dan Pembelajaran\". Topik yang diminati meliputi machine learning dalam assessment, chatbot edukatif, personalisasi pembelajaran dengan AI, dan etika AI dalam pendidikan. Deadline submission: 30 September 2024. Template dan panduan lengkap tersedia di halaman submission.",
    category: "call-for-papers",
    priority: "high",
    publishDate: "2024-08-15",
    author: "Editorial Board",
    tags: ["Call for Papers", "AI", "Education", "Special Issue"],
    isActive: true
  },
  {
    id: "ojs-upgrade-2024",
    title: "Platform OJS Terbaru Diluncurkan",
    content: "Cognifera Journal telah mengupgrade ke sistem OJS versi 3.4 dengan fitur-fitur enhanced untuk proses review dan publikasi yang lebih efisien. Fitur baru meliputi: dashboard author yang lebih intuitif, notifikasi email otomatis, integrasi ORCID yang lebih baik, dan sistem tracking manuscript yang real-time. Semua user diharapkan untuk mengupdate profil mereka.",
    category: "system-update",
    priority: "medium",
    publishDate: "2024-07-20",
    author: "Technical Team",
    tags: ["OJS", "System Update", "New Features"],
    isActive: true
  },
  {
    id: "university-partnership-2024",
    title: "Kerjasama dengan Universitas Terkemuka",
    content: "Cognifera Journal telah menjalin kerjasama dengan 15 universitas terkemuka di Indonesia untuk meningkatkan kualitas penelitian dan publikasi ilmiah. Kerjasama ini meliputi program joint research, guest editor dari akademisi ternama, workshop penulisan ilmiah, dan akses khusus untuk mahasiswa S2/S3. Universitas partner antara lain UI, ITB, UGM, ITS, dan Unair.",
    category: "partnership",
    priority: "medium",
    publishDate: "2024-06-28",
    author: "Editorial Board",
    tags: ["Partnership", "Universities", "Collaboration"],
    isActive: true
  },
  {
    id: "webinar-writing-2024",
    title: "Webinar \"Scientific Writing Excellence\" - 15 September 2024",
    content: "Bergabunglah dalam webinar gratis tentang penulisan ilmiah berkualitas tinggi. Narasumber: Prof. Dr. Ahmad Sudrajat (UNY) dan Dr. Maria Wijaya (ITB). Topik: struktur artikel ilmiah, metodologi penelitian, sitasi yang tepat, dan tips lolos peer review. Pendaftaran gratis melalui link di bio. Sertifikat tersedia untuk peserta yang mengikuti hingga selesai.",
    category: "event",
    priority: "high",
    publishDate: "2024-08-25",
    author: "Event Committee",
    tags: ["Webinar", "Scientific Writing", "Free Event", "Certificate"],
    isActive: true
  },
  {
    id: "policy-open-access-2024",
    title: "Kebijakan Open Access dan Biaya Publikasi",
    content: "Mulai Januari 2024, Cognifera Journal menerapkan kebijakan full open access untuk semua artikel. Tidak ada biaya submission, review, maupun publikasi (Article Processing Charge = 0). Semua artikel akan tersedia gratis untuk publik dengan lisensi Creative Commons. Kebijakan ini mendukung demokratisasi akses pengetahuan dan peningkatan dampak penelitian.",
    category: "policy",
    priority: "high",
    publishDate: "2024-01-01",
    author: "Editorial Board",
    tags: ["Open Access", "Free Publication", "Policy"],
    isActive: true
  },
  {
    id: "new-editors-2024",
    title: "Penyambutan Editor Baru di Board Editorial",
    content: "Kami dengan bangga menyambut 3 editor baru di board editorial Cognifera Journal: Dr. Siti Nurhaliza, M.Kom (Universitas Brawijaya) - bidang Educational Technology, Prof. Budi Santoso, Ph.D (ITS) - bidang Data Science, dan Dr. Lisa Permata, M.Pd (UPI) - bidang Mathematics Education. Dengan bergabungnya editor-editor berpengalaman ini, kami yakin kualitas review akan semakin meningkat.",
    category: "general",
    priority: "medium",
    publishDate: "2024-05-15",
    author: "Chief Editor",
    tags: ["Editorial Board", "New Members", "Quality Improvement"],
    isActive: true
  }
];

export const categoryLabels = {
  "call-for-papers": "Call for Papers",
  "system-update": "System Update", 
  "partnership": "Partnership",
  "event": "Event",
  "policy": "Policy",
  "general": "General"
};

export const categoryColors = {
  "call-for-papers": "bg-[var(--color-primary)]",
  "system-update": "bg-[var(--color-secondary)]",
  "partnership": "bg-[var(--color-tertiary)]",
  "event": "bg-blue-500",
  "policy": "bg-red-500", 
  "general": "bg-gray-500"
};