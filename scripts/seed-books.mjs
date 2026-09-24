// Seeds the initial book catalog (one-time, idempotent by slug).
// Usage: npm run db:seed-books
import { neon } from "@neondatabase/serverless";

try {
  process.loadEnvFile(".env");
} catch {
  // .env optional — DATABASE_URL may come from the environment
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const books = [
  {
    slug: "desain-pembelajaran-biologi-di-pendidikan-tinggi",
    title: "Desain Pembelajaran Biologi di Pendidikan Tinggi",
    authors: [
      "Arifah Novia Arifin",
      "Adnan",
      "Nurul Magfirah",
      "Nurul Fadhilah",
      "Sri Wahyuni",
      "Ernawati",
      "Ryan Putra Adhytama S",
      "Ayun Atira",
    ],
    publisher: "PT Cognifera Education Academy",
    publicationYear: 2026,
    isbn: "978-634-05-1231-1",
    pages: 305,
    pageLabel: "i-viii + 305 halaman",
    language: "id",
    category: "textbook",
    description:
      "Buku ini membahas desain pembelajaran biologi di pendidikan tinggi sebagai rujukan bagi dosen, mahasiswa, dan praktisi pendidikan dalam merancang pembelajaran yang sistematis dan kontekstual.",
    longDescription: [
      "Disusun untuk kebutuhan akademik di pendidikan tinggi, buku ini menghadirkan materi desain pembelajaran biologi yang dapat digunakan sebagai pegangan dalam pengembangan perkuliahan, perencanaan strategi pembelajaran, dan penguatan kualitas proses belajar.",
    ],
    keywords: [
      "desain pembelajaran",
      "biologi",
      "pendidikan tinggi",
      "pembelajaran biologi",
      "buku akademik",
    ],
    coverImage: "https://res.cloudinary.com/jxl6jjbq/image/upload/v1790245904/cognifera/books/cw2deevut9t0ch1asiho.jpg",
    coverAlt: "Cover buku Desain Pembelajaran Biologi di Pendidikan Tinggi",
    previewImages: [
      "https://res.cloudinary.com/jxl6jjbq/image/upload/v1790245904/cognifera/books/cw2deevut9t0ch1asiho.jpg",
      "https://res.cloudinary.com/jxl6jjbq/image/upload/v1790245912/cognifera/books/bwtreuxsqtww3hjszqs4.jpg",
      "https://res.cloudinary.com/jxl6jjbq/image/upload/v1790245917/cognifera/books/rehlqqdb3bnfqfhcidru.jpg",
      "https://res.cloudinary.com/jxl6jjbq/image/upload/v1790245921/cognifera/books/ofde5qet1di4njitu9ij.jpg",
    ],
    availability: "available",
    format: "print",
    purchaseLabel: "Tanya Buku Ini",
    highlights: [
      "Editor: Saparuddin",
      "Cetakan pertama, Mei 2026",
      "Ukuran buku 15,5 x 23,0 cm",
      "Diterbitkan oleh PT Cognifera Education Academy",
    ],
  },
  {
    slug: "citizen-science-project-inovasi-pembelajaran-biologi-partisipatif",
    title: "Citizen Science Project (CSP): Inovasi Pembelajaran Biologi Partisipatif",
    authors: ["Asih Luklu Susiati", "Andi Asmawati", "Abd. Muis", "Ismail", "Arsad Bahri"],
    publisher: "PT Cognifera Education Academy",
    publicationYear: 2026,
    isbn: "-",
    pages: 100,
    pageLabel: "i-vii + 100 halaman",
    language: "id",
    category: "textbook",
    description:
      "Buku ini menghadirkan konsep Citizen Science Project (CSP) sebagai pendekatan inovatif dalam pembelajaran biologi partisipatif yang melibatkan masyarakat dalam proses ilmiah.",
    longDescription: [
      "Citizen Science Project (CSP) merupakan pendekatan pembelajaran biologi yang mengintegrasikan partisipasi aktif masyarakat dalam kegiatan ilmiah. Buku ini menyajikan landasan konseptual, desain, serta implementasi proyek sains warga dalam konteks pendidikan biologi.",
      "Ditujukan bagi dosen, guru, mahasiswa, dan praktisi pendidikan yang ingin mengembangkan pembelajaran biologi berbasis partisipasi komunitas secara sistematis dan bermakna.",
    ],
    keywords: ["citizen science", "pembelajaran biologi", "partisipatif", "CSP", "inovasi pendidikan"],
    coverImage: "https://res.cloudinary.com/jxl6jjbq/image/upload/v1790245927/cognifera/books/fwwduuhyik7vowmb7fzu.png",
    coverAlt: "Cover buku Citizen Science Project (CSP): Inovasi Pembelajaran Biologi Partisipatif",
    previewImages: [
      "https://res.cloudinary.com/jxl6jjbq/image/upload/v1790245927/cognifera/books/fwwduuhyik7vowmb7fzu.png",
      "https://res.cloudinary.com/jxl6jjbq/image/upload/v1790245929/cognifera/books/ipip1r5gep8zc6qsfbi8.png",
      "https://res.cloudinary.com/jxl6jjbq/image/upload/v1790245931/cognifera/books/j9cflfgflkmsr1slikwc.png",
      "https://res.cloudinary.com/jxl6jjbq/image/upload/v1790245932/cognifera/books/xhqvfttrujyjurovzlzq.png",
    ],
    availability: "available",
    format: "print",
    purchaseLabel: "Tanya Buku Ini",
    highlights: [
      "Editor: Tim PT Cognifera Education Academy",
      "Cetakan pertama, Mei 2026",
      "Ukuran buku 15,5 x 23,0 cm",
      "Diterbitkan oleh PT Cognifera Education Academy",
    ],
  },
  {
    slug: "kinerja-karyawan-kajian-teori-dan-praktis",
    title: "Kinerja Karyawan",
    authors: ["Firmansyah, S.M., M.M"],
    publisher: "PT Cognifera Education Academy",
    publicationYear: 2026,
    isbn: "978-634-04-9836-3",
    pages: 405,
    pageLabel: "i-viii + 405 halaman",
    language: "id",
    category: "textbook",
    description:
      "Buku ini mengulas kinerja karyawan melalui pendekatan teoritis dan praktis, mencakup konsep dasar, evaluasi, serta penerapannya dalam konteks organisasi.",
    longDescription: [
      "Disusun untuk pembaca akademik maupun praktisi, buku ini menyajikan pembahasan yang sistematis mengenai kinerja karyawan, mulai dari landasan konseptual hingga implementasinya dalam dunia kerja.",
    ],
    keywords: [],
    coverImage: "https://res.cloudinary.com/jxl6jjbq/image/upload/v1790245978/cognifera/books/ippeqj3a0buetiycqizc.jpg",
    coverAlt: "Cover buku Kinerja Karyawan: Kajian Teori dan Praktis",
    previewImages: [
      "https://res.cloudinary.com/jxl6jjbq/image/upload/v1790245978/cognifera/books/ippeqj3a0buetiycqizc.jpg",
      "https://res.cloudinary.com/jxl6jjbq/image/upload/v1790245980/cognifera/books/s9gs5b4ak2yicqiqob6g.png",
      "https://res.cloudinary.com/jxl6jjbq/image/upload/v1790245982/cognifera/books/tqvfcyxwangilqkftqcz.png",
      "https://res.cloudinary.com/jxl6jjbq/image/upload/v1790245986/cognifera/books/m8pcfl8db9hnb6znctuk.png",
    ],
    availability: "available",
    format: "print",
    purchaseLabel: "Tanya Buku Ini",
    highlights: null,
  },
];

const sql = neon(databaseUrl);

let inserted = 0;
for (const book of books) {
  const result = await sql`
    INSERT INTO books (
      slug, title, authors, publisher, publication_year, isbn, pages, page_label,
      language, category, description, long_description, keywords,
      cover_image, cover_alt, preview_images, availability, format,
      purchase_label, highlights, status
    ) VALUES (
      ${book.slug}, ${book.title}, ${book.authors}, ${book.publisher},
      ${book.publicationYear}, ${book.isbn}, ${book.pages}, ${book.pageLabel},
      ${book.language}, ${book.category}, ${book.description},
      ${book.longDescription}, ${book.keywords}, ${book.coverImage},
      ${book.coverAlt}, ${book.previewImages}, ${book.availability},
      ${book.format}, ${book.purchaseLabel}, ${book.highlights}, 'published'
    )
    ON CONFLICT (slug) DO NOTHING
    RETURNING slug;
  `;
  if (result.length > 0) inserted += 1;
}

console.log(`Seeded ${inserted} of ${books.length} books (existing slugs skipped).`);
