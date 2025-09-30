export interface UserData {
  id: string;
  fullName: string;
  email: string;
  role: 'ADMIN' | 'AUTHOR' | 'READER';
  status: 'ACTIVE' | 'BLOCKED';
  joinDate: string;
  lastLogin: string;
  avatar?: string;
  bio?: string;
  articlesCount?: number;
  totalViews?: number;
}

export const mockUsers: UserData[] = [
  {
    id: 'usr-001',
    fullName: 'Ahmad Fauzi',
    email: 'ahmad.fauzi@example.com',
    role: 'AUTHOR',
    status: 'ACTIVE',
    joinDate: '2024-01-15',
    lastLogin: '2025-09-29T14:30:00',
    bio: 'Peneliti bidang pendidikan dan teknologi pembelajaran',
    articlesCount: 24,
    totalViews: 12450
  },
  {
    id: 'usr-002',
    fullName: 'Siti Rahma',
    email: 'siti.rahma@example.com',
    role: 'AUTHOR',
    status: 'ACTIVE',
    joinDate: '2024-02-10',
    lastLogin: '2025-09-30T09:15:00',
    bio: 'Penulis artikel ilmiah bidang psikologi',
    articlesCount: 18,
    totalViews: 8920
  },
  {
    id: 'usr-003',
    fullName: 'Budi Santoso',
    email: 'budi.santoso@example.com',
    role: 'READER',
    status: 'ACTIVE',
    joinDate: '2024-03-05',
    lastLogin: '2025-09-28T16:45:00',
    bio: 'Mahasiswa pascasarjana'
  },
  {
    id: 'usr-004',
    fullName: 'Dewi Lestari',
    email: 'dewi.lestari@example.com',
    role: 'AUTHOR',
    status: 'ACTIVE',
    joinDate: '2024-01-20',
    lastLogin: '2025-09-29T11:20:00',
    bio: 'Dosen dan peneliti bidang ekonomi',
    articlesCount: 31,
    totalViews: 15600
  },
  {
    id: 'usr-005',
    fullName: 'Eko Prasetyo',
    email: 'eko.prasetyo@example.com',
    role: 'READER',
    status: 'BLOCKED',
    joinDate: '2024-04-12',
    lastLogin: '2025-09-20T08:30:00',
    bio: 'Peneliti independen'
  },
  {
    id: 'usr-006',
    fullName: 'Farida Hanum',
    email: 'farida.hanum@example.com',
    role: 'AUTHOR',
    status: 'ACTIVE',
    joinDate: '2024-02-28',
    lastLogin: '2025-09-30T07:10:00',
    bio: 'Penulis dan konsultan riset',
    articlesCount: 15,
    totalViews: 7200
  },
  {
    id: 'usr-007',
    fullName: 'Gilang Ramadhan',
    email: 'gilang.r@example.com',
    role: 'READER',
    status: 'ACTIVE',
    joinDate: '2024-05-08',
    lastLogin: '2025-09-29T19:25:00',
    bio: 'Mahasiswa S1'
  },
  {
    id: 'usr-008',
    fullName: 'Hanna Puspita',
    email: 'hanna.puspita@example.com',
    role: 'AUTHOR',
    status: 'ACTIVE',
    joinDate: '2024-01-30',
    lastLogin: '2025-09-30T06:40:00',
    bio: 'Peneliti senior bidang kesehatan masyarakat',
    articlesCount: 42,
    totalViews: 22100
  },
  {
    id: 'usr-009',
    fullName: 'Indra Wijaya',
    email: 'indra.wijaya@example.com',
    role: 'READER',
    status: 'ACTIVE',
    joinDate: '2024-06-15',
    lastLogin: '2025-09-27T13:50:00',
    bio: 'Profesional dan lifelong learner'
  },
  {
    id: 'usr-010',
    fullName: 'Joko Susilo',
    email: 'joko.susilo@example.com',
    role: 'AUTHOR',
    status: 'BLOCKED',
    joinDate: '2024-03-22',
    lastLogin: '2025-09-15T10:15:00',
    bio: 'Peneliti bidang lingkungan',
    articlesCount: 8,
    totalViews: 3200
  },
  {
    id: 'usr-011',
    fullName: 'Kartika Sari',
    email: 'kartika.sari@example.com',
    role: 'READER',
    status: 'ACTIVE',
    joinDate: '2024-07-01',
    lastLogin: '2025-09-29T15:30:00',
    bio: 'Guru dan pengajar'
  },
  {
    id: 'usr-012',
    fullName: 'Lukman Hakim',
    email: 'lukman.hakim@example.com',
    role: 'AUTHOR',
    status: 'ACTIVE',
    joinDate: '2024-02-14',
    lastLogin: '2025-09-30T08:20:00',
    bio: 'Akademisi dan penulis buku',
    articlesCount: 27,
    totalViews: 14800
  },
  {
    id: 'usr-013',
    fullName: 'Maya Anggraini',
    email: 'maya.anggraini@example.com',
    role: 'READER',
    status: 'ACTIVE',
    joinDate: '2024-08-10',
    lastLogin: '2025-09-28T12:05:00',
    bio: 'Mahasiswa dan asisten peneliti'
  },
  {
    id: 'usr-014',
    fullName: 'Nugroho Adi',
    email: 'nugroho.adi@example.com',
    role: 'AUTHOR',
    status: 'ACTIVE',
    joinDate: '2024-01-05',
    lastLogin: '2025-09-30T05:55:00',
    bio: 'Peneliti senior bidang teknologi informasi',
    articlesCount: 35,
    totalViews: 18900
  },
  {
    id: 'usr-015',
    fullName: 'Olivia Putri',
    email: 'olivia.putri@example.com',
    role: 'READER',
    status: 'ACTIVE',
    joinDate: '2024-09-03',
    lastLogin: '2025-09-29T17:40:00',
    bio: 'Content creator edukatif'
  }
];