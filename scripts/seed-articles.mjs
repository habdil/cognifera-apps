// Seeds 10 professional news articles (idempotent by slug).
// Cover images are fetched from Unsplash (free license), uploaded to
// Cloudinary, then referenced from the articles table.
// Usage: npm run db:seed-articles
import { createHash } from "node:crypto";
import { neon } from "@neondatabase/serverless";

try {
  process.loadEnvFile(".env");
} catch {
  // .env optional
}

const { DATABASE_URL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

if (!DATABASE_URL || !CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error("Missing DATABASE_URL or CLOUDINARY_* env vars.");
  process.exit(1);
}

async function uploadFromUrl(imageUrl) {
  const imageRes = await fetch(imageUrl);
  if (!imageRes.ok) throw new Error(`Gagal unduh gambar: ${imageUrl} (${imageRes.status})`);
  const bytes = new Uint8Array(await imageRes.arrayBuffer());

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "cognifera/articles";
  const signature = createHash("sha1")
    .update(`folder=${folder}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`)
    .digest("hex");

  const formData = new FormData();
  formData.append("file", new Blob([bytes], { type: "image/jpeg" }));
  formData.append("api_key", CLOUDINARY_API_KEY);
  formData.append("timestamp", String(timestamp));
  formData.append("folder", folder);
  formData.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );
  const result = await response.json();
  if (!response.ok || !result.secure_url) {
    throw new Error(`Upload gagal: ${JSON.stringify(result.error ?? result)}`);
  }
  return result.secure_url;
}

const unsplash = (id) => `https://images.unsplash.com/photo-${id}?w=1600&q=80&fm=jpg`;

const articles = [
  // ============ RESEARCH ============
  {
    slug: "ai-generatif-mengubah-lanskap-penulisan-ilmiah",
    title: "AI Generatif Mengubah Lanskap Penulisan Ilmiah: Peluang dan Batas Etisnya",
    excerpt:
      "Kecerdasan buatan generatif kini hadir di hampir setiap tahap penulisan ilmiah. Penerbit besar merespons dengan kebijakan baru: transparansi wajib, dan AI tidak boleh menjadi penulis.",
    category: "research",
    tags: ["kecerdasan buatan", "publikasi ilmiah", "etika riset"],
    image: unsplash("1461749280684-dccba630e2f6"),
    daysAgo: 2,
    contentHtml: `
<p>Kehadiran kecerdasan buatan (AI) generatif telah mengubah cara peneliti bekerja — mulai dari penelusuran literatur, penyusunan kerangka tulisan, penerjemahan, hingga penyuntingan bahasa. Survei yang dipublikasikan sejumlah jurnal internasional menunjukkan mayoritas peneliti kini menggunakan perangkat AI dalam setidaknya satu tahap proses risetnya.</p>
<h2>Kebijakan penerbit semakin tegas</h2>
<p>Penerbit-penerbit besar seperti Elsevier, Springer Nature, dan Wiley, bersama komite etika publikasi seperti COPE dan ICMJE, telah menetapkan garis yang jelas: perangkat AI <strong>tidak dapat dicantumkan sebagai penulis</strong> karena tidak dapat memikul tanggung jawab atas isi naskah. Penggunaan AI untuk membantu penulisan tetap diperbolehkan, dengan syarat diungkapkan secara transparan pada bagian metode atau ucapan terima kasih.</p>
<p>Di sisi lain, penggunaan AI oleh <em>reviewer</em> untuk menilai naskah orang lain umumnya dilarang, karena naskah yang belum terbit bersifat rahasia dan tidak boleh diunggah ke layanan pihak ketiga.</p>
<h2>Peluang bagi peneliti Indonesia</h2>
<p>Bagi peneliti yang bahasa pertamanya bukan bahasa Inggris, AI dapat menjadi penyetara: membantu memoles bahasa tanpa mengubah substansi ilmiah. Namun para editor jurnal mengingatkan beberapa batas yang tidak boleh dilewati:</p>
<ul>
<li>AI tidak boleh menghasilkan data, hasil analisis, atau sitasi — halusinasi referensi adalah salah satu penyebab penolakan naskah yang paling sering ditemui editor.</li>
<li>Substansi argumen dan interpretasi hasil harus tetap berasal dari penulis.</li>
<li>Setiap penggunaan AI yang berarti wajib dideklarasikan sesuai kebijakan jurnal tujuan.</li>
</ul>
<p>Kesimpulannya: AI adalah alat bantu yang sah dan semakin normal digunakan, tetapi integritas ilmiah tetap sepenuhnya tanggung jawab manusia di belakangnya.</p>`,
  },
  {
    slug: "gelombang-retraksi-global-integritas-riset-jadi-sorotan",
    title: "Gelombang Retraksi Global: Mengapa Integritas Riset Kini Jadi Sorotan Utama",
    excerpt:
      "Jumlah artikel ilmiah yang ditarik dari peredaran mencapai rekor tertinggi dalam beberapa tahun terakhir. Fenomena paper mill menjadi salah satu pemicu utamanya.",
    category: "research",
    tags: ["integritas riset", "retraksi", "paper mill"],
    image: unsplash("1481627834876-b7833e8f5570"),
    daysAgo: 6,
    contentHtml: `
<p>Dunia akademik tengah menghadapi krisis kepercayaan. Menurut laporan yang dihimpun Nature dan basis data Retraction Watch, jumlah artikel ilmiah yang ditarik (<em>retracted</em>) menembus lebih dari sepuluh ribu artikel pada 2023 — angka tertinggi yang pernah tercatat — dan tren tersebut belum menunjukkan tanda melambat.</p>
<h2>Paper mill: pabrik naskah ilmiah palsu</h2>
<p>Salah satu pemicu terbesar adalah praktik <em>paper mill</em>: jasa gelap yang memproduksi naskah ilmiah palsu atau hasil manipulasi, lengkap dengan data fiktif, lalu menjual posisi kepengarangan kepada akademisi yang terdesak tuntutan publikasi. Sejumlah penerbit besar bahkan harus menarik ribuan artikel sekaligus dari jurnal-jurnal edisi khusus yang proses telaahnya berhasil disusupi.</p>
<h2>Dampaknya bagi peneliti yang jujur</h2>
<p>Gelombang retraksi ini berdampak luas: kepercayaan publik terhadap sains tergerus, sitasi ke artikel bermasalah mencemari literatur, dan proses telaah di jurnal bereputasi menjadi semakin ketat serta memakan waktu. Bagi peneliti, beberapa langkah perlindungan diri menjadi semakin penting:</p>
<ul>
<li>Memeriksa reputasi jurnal sebelum mengirim naskah — indeksasi resmi, dewan editor yang jelas, dan proses telaah yang dapat diverifikasi.</li>
<li>Menghindari tawaran kepengarangan instan atau "jaminan terbit" yang terlalu mudah.</li>
<li>Menyimpan data mentah dan dokumentasi analisis agar selalu siap diaudit.</li>
</ul>
<p>Integritas kini bukan sekadar jargon etika, melainkan aset karier jangka panjang. Di tengah pengawasan yang semakin ketat, rekam jejak yang bersih adalah pembeda yang sesungguhnya.</p>`,
  },
  {
    slug: "open-access-kian-menjadi-standar-publikasi-global",
    title: "Open Access Kian Menjadi Standar: Apa Artinya bagi Peneliti Indonesia",
    excerpt:
      "Lebih dari separuh artikel ilmiah dunia kini terbit dengan akses terbuka. Indonesia termasuk yang terdepan dalam adopsi, namun tantangan biaya publikasi masih membayangi.",
    category: "research",
    tags: ["open access", "publikasi ilmiah", "jurnal"],
    image: unsplash("1507842217343-583bb7270b66"),
    daysAgo: 11,
    contentHtml: `
<p>Gerakan akses terbuka (<em>open access</em>) telah bergeser dari idealisme menjadi arus utama. Berbagai kajian bibliometrik memperkirakan lebih dari separuh artikel ilmiah dunia kini dapat diakses publik tanpa berlangganan — didorong mandat lembaga pendana seperti cOAlition S di Eropa dan kebijakan akses publik di berbagai negara.</p>
<h2>Indonesia: adopsi tinggi, model unik</h2>
<p>Menariknya, Indonesia kerap disebut dalam studi internasional sebagai salah satu negara dengan proporsi publikasi akses terbuka tertinggi di dunia. Ribuan jurnal ilmiah nasional yang dikelola perguruan tinggi dan asosiasi profesi umumnya terbit secara <em>diamond open access</em> — gratis bagi pembaca sekaligus gratis bagi penulis — sebuah model yang justru kini dilirik dunia sebagai alternatif yang lebih adil.</p>
<h2>Tantangan: biaya APC di jurnal internasional</h2>
<p>Di sisi lain, publikasi akses terbuka di jurnal internasional bereputasi umumnya menuntut <em>article processing charge</em> (APC) yang bisa mencapai puluhan juta rupiah per artikel. Beberapa strategi yang dapat ditempuh peneliti:</p>
<ul>
<li>Memanfaatkan program <em>waiver</em> atau diskon APC yang disediakan banyak penerbit untuk penulis dari negara berkembang.</li>
<li>Memilih jalur <em>green open access</em>: menerbitkan di jurnal berlangganan lalu menyimpan naskah akhir di repositori institusi.</li>
<li>Menargetkan jurnal <em>diamond OA</em> bereputasi yang tidak memungut biaya sama sekali.</li>
</ul>
<p>Arah perkembangannya jelas: ilmu pengetahuan bergerak menuju keterbukaan. Pertanyaannya bukan lagi <em>apakah</em>, melainkan <em>bagaimana</em> peneliti menyiasati transisi ini secara cerdas.</p>`,
  },
  {
    slug: "citizen-science-ketika-masyarakat-menjadi-bagian-dari-penelitian",
    title: "Citizen Science: Ketika Masyarakat Menjadi Bagian dari Penelitian",
    excerpt:
      "Dari pemantauan burung hingga klasifikasi galaksi, sains warga membuktikan bahwa penelitian berkualitas tidak harus dikerjakan ilmuwan sendirian — dan kini mulai masuk ke ruang kelas Indonesia.",
    category: "research",
    tags: ["citizen science", "pendidikan sains", "partisipasi publik"],
    image: unsplash("1523240795612-9a054b0db644"),
    daysAgo: 16,
    contentHtml: `
<p>Bayangkan jutaan orang di seluruh dunia mencatat kemunculan burung di halaman rumahnya, memotret tumbuhan liar di pinggir jalan, atau membantu mengklasifikasikan bentuk galaksi dari layar komputernya. Itulah <em>citizen science</em> — sains warga — pendekatan penelitian yang melibatkan masyarakat umum dalam pengumpulan dan pengolahan data ilmiah.</p>
<h2>Bukan sekadar bantuan tenaga</h2>
<p>Platform seperti eBird, iNaturalist, dan Galaxy Zoo telah menghasilkan ratusan publikasi ilmiah dari data yang dikumpulkan sukarelawan. Skala datanya mustahil dicapai tim peneliti konvensional: pengamatan dari jutaan titik lokasi, sepanjang tahun, selama bertahun-tahun. Bagi masyarakat yang terlibat, manfaatnya juga nyata — literasi sains tumbuh dari pengalaman langsung, bukan sekadar bacaan.</p>
<h2>Masuk ke ruang kelas</h2>
<p>Di ranah pendidikan, sains warga mulai diadopsi sebagai model pembelajaran. Peserta didik tidak lagi hanya mempelajari hasil sains, melainkan ikut mempraktikkan prosesnya: merumuskan pertanyaan, mengumpulkan data sungguhan, dan melihat kontribusinya dipakai. Pendekatan ini terbukti meningkatkan motivasi belajar sekaligus keterampilan berpikir ilmiah.</p>
<p>Perkembangan ini pula yang melatarbelakangi terbitnya buku <a href="/publications/books/citizen-science-project-inovasi-pembelajaran-biologi-partisipatif">Citizen Science Project (CSP): Inovasi Pembelajaran Biologi Partisipatif</a> dari Cognifera — panduan konseptual dan praktis merancang proyek sains warga dalam pembelajaran biologi, dari perencanaan hingga implementasi di kelas.</p>
<p>Ketika batas antara ilmuwan dan masyarakat semakin cair, satu hal menjadi jelas: masa depan sains bukan hanya milik laboratorium — ia milik siapa saja yang bersedia mengamati dengan cermat.</p>`,
  },

  // ============ TIPS ============
  {
    slug: "7-kiat-menembus-jurnal-bereputasi",
    title: "7 Kiat Menembus Jurnal Bereputasi: Dari Memilih Jurnal hingga Menjawab Reviewer",
    excerpt:
      "Naskah yang baik saja tidak cukup — strategi menentukan. Berikut tujuh kiat praktis yang dirangkum dari pengalaman para editor dan penulis produktif.",
    category: "tips",
    tags: ["publikasi ilmiah", "jurnal scopus", "menulis akademik"],
    image: unsplash("1455390582262-044cdead277a"),
    daysAgo: 21,
    contentHtml: `
<p>Tingkat penolakan jurnal internasional bereputasi bisa mencapai 80–90 persen. Namun sebagian besar penolakan sesungguhnya dapat dicegah — bukan karena risetnya buruk, melainkan karena strateginya keliru. Berikut tujuh kiat yang paling sering disepakati para editor:</p>
<h2>Sebelum menulis</h2>
<ul>
<li><strong>1. Pilih jurnal sebelum menulis, bukan sesudahnya.</strong> Pelajari <em>aims &amp; scope</em>, baca 3–5 artikel terbitan terbarunya, dan tulis naskah Anda dengan "bahasa" jurnal tersebut.</li>
<li><strong>2. Verifikasi reputasi jurnal.</strong> Periksa indeksasi di basis data resmi dan waspadai ciri jurnal predator: janji terbit kilat, biaya tidak transparan, dan dewan editor yang tidak dapat ditelusuri.</li>
<li><strong>3. Bangun argumen kebaruan yang eksplisit.</strong> Reviewer harus bisa menjawab "apa yang baru dari naskah ini?" dalam satu kalimat setelah membaca pendahuluan Anda.</li>
</ul>
<h2>Saat menulis dan merevisi</h2>
<ul>
<li><strong>4. Investasikan waktu terbesar pada abstrak dan pendahuluan.</strong> Keduanya menentukan kesan pertama editor — dan sering menjadi dasar keputusan <em>desk rejection</em>.</li>
<li><strong>5. Pastikan metode dapat direplikasi.</strong> Kelemahan metodologi adalah alasan penolakan substansial yang paling umum.</li>
<li><strong>6. Minta kolega membaca sebelum submit.</strong> Telaah internal menangkap masalah yang tidak lagi terlihat oleh penulisnya sendiri.</li>
</ul>
<h2>Setelah masuk telaah</h2>
<p><strong>7. Perlakukan komentar reviewer sebagai kolaborasi, bukan serangan.</strong> Jawab setiap poin satu per satu dalam tabel respons, tunjukkan perubahan yang dilakukan, dan ketika tidak sepakat — berargumenlah dengan data dan rujukan, bukan dengan emosi. Naskah yang direvisi dengan sungguh-sungguh hampir selalu terbaca oleh editor.</p>
<p>Publikasi bereputasi adalah maraton, bukan sprint. Konsistensi pada tujuh hal di atas jauh lebih menentukan daripada bakat menulis semata.</p>`,
  },
  {
    slug: "menyusun-proposal-hibah-penelitian-yang-kompetitif",
    title: "Menyusun Proposal Hibah Penelitian yang Kompetitif: Panduan Praktis",
    excerpt:
      "Persaingan pendanaan riset semakin ketat. Proposal yang lolos bukan yang paling ambisius, melainkan yang paling meyakinkan reviewer dalam waktu baca yang singkat.",
    category: "tips",
    tags: ["hibah penelitian", "proposal", "pendanaan riset"],
    image: unsplash("1454165804606-c3d57bc86b40"),
    daysAgo: 27,
    contentHtml: `
<p>Setiap tahun, ribuan proposal memperebutkan dana hibah penelitian yang jumlahnya terbatas — dari skema kementerian, lembaga pengelola dana, hingga hibah internasional. Reviewer kerap hanya punya waktu belasan menit per proposal. Artinya, kejelasan mengalahkan kecanggihan.</p>
<h2>Anatomi proposal yang meyakinkan</h2>
<ul>
<li><strong>Masalah yang tajam.</strong> Satu paragraf pembuka harus menjawab: apa masalahnya, mengapa penting sekarang, dan apa akibatnya jika tidak diteliti.</li>
<li><strong>Kebaruan yang jujur.</strong> Posisikan riset Anda terhadap literatur mutakhir. Klaim "belum pernah ada yang meneliti" tanpa bukti penelusuran justru menjadi bumerang.</li>
<li><strong>Metode yang proporsional.</strong> Desain, sampel, instrumen, dan analisis harus terhubung logis dengan pertanyaan penelitian — tidak lebih, tidak kurang.</li>
<li><strong>Luaran yang terukur.</strong> Sebutkan target konkret: artikel di jurnal bereputasi, buku, kekayaan intelektual, atau kebijakan yang disasar, lengkap dengan linimasa realistis.</li>
<li><strong>RAB yang bisa dipertanggungjawabkan.</strong> Setiap komponen biaya harus dapat ditelusuri ke aktivitas di metodologi.</li>
</ul>
<h2>Kesalahan yang paling sering menggagalkan</h2>
<p>Tiga hal yang berulang kali muncul dalam catatan reviewer: proposal yang tidak mengikuti format panduan (langsung tersisih secara administratif), tinjauan pustaka yang usang, dan jadwal yang tidak masuk akal. Ketiganya sepenuhnya dapat dihindari dengan satu kebiasaan sederhana: <em>selesaikan draf seminggu lebih awal, lalu minta kolega membacanya sebagai "reviewer bayangan".</em></p>
<p>Proposal yang baik pada dasarnya adalah cerita yang runtut: masalah nyata, cara yang tepat, tim yang mampu, dan hasil yang berarti. Jika keempatnya terjalin rapi, peluang Anda naik berlipat.</p>`,
  },

  // ============ ANNOUNCEMENT ============
  {
    slug: "cognifera-membuka-layanan-penerbitan-buku-ber-isbn-2026-2027",
    title: "Cognifera Membuka Layanan Penerbitan Buku Ber-ISBN Periode 2026/2027",
    excerpt:
      "Tiga paket penerbitan — Hemat, Standar, dan Komplit — kini dibuka untuk dosen, peneliti, dan penulis pemula. Semua buku terbit ber-ISBN dan terindeks Google Scholar.",
    category: "announcement",
    tags: ["penerbitan buku", "ISBN", "layanan cognifera"],
    image: unsplash("1512820790803-83ca734da794"),
    daysAgo: 9,
    contentHtml: `
<p>PT Cognifera Education Academy resmi membuka pendaftaran layanan penerbitan buku ber-ISBN untuk periode 2026/2027. Program ini ditujukan bagi dosen, peneliti, mahasiswa pascasarjana, dan penulis pemula yang ingin menerbitkan karya secara profesional dengan proses yang transparan.</p>
<h2>Tiga pilihan paket</h2>
<ul>
<li><strong>Paket Hemat</strong> (mulai Rp500.000) — ISBN, layouting cover dan isi sederhana, e-book, e-sertifikat penulis, serta terindeks Google Scholar. Cocok untuk penulis pertama.</li>
<li><strong>Paket Standar</strong> (mulai Rp750.000) — seluruh fasilitas Paket Hemat ditambah <em>proofreading</em> naskah untuk hasil yang lebih rapi.</li>
<li><strong>Paket Komplit</strong> (mulai Rp1.500.000) — layanan penuh termasuk konversi naskah dari skripsi, tesis, atau disertasi, layouting <em>high quality</em>, dan proofreading menyeluruh.</li>
</ul>
<p>Seluruh buku diterbitkan dalam ukuran standar UNESCO dan mendapatkan e-book, dengan opsi cetak fisik mulai Rp150.000.</p>
<h2>Cara mendaftar</h2>
<p>Penulis dapat melihat rincian setiap paket pada halaman <a href="/services">Layanan</a> atau langsung berkonsultasi tanpa biaya melalui tombol WhatsApp di situs ini. Tim editorial Cognifera akan membantu menilai kesiapan naskah dan merekomendasikan paket yang paling sesuai.</p>
<p>Kuota terbit setiap bulan terbatas agar kualitas penyuntingan tetap terjaga — naskah yang masuk lebih awal akan diproses lebih dahulu.</p>`,
  },
  {
    slug: "call-for-authors-konversi-skripsi-tesis-disertasi-menjadi-buku",
    title: "Call for Authors: Ubah Skripsi, Tesis, dan Disertasi Anda Menjadi Buku Referensi",
    excerpt:
      "Karya akademik terbaik tidak seharusnya berhenti di rak perpustakaan. Cognifera mengundang para lulusan menerbitkan hasil penelitiannya sebagai buku referensi ber-ISBN.",
    category: "announcement",
    tags: ["call for authors", "konversi naskah", "buku referensi"],
    image: unsplash("1434030216411-0b793f4b4173"),
    daysAgo: 14,
    contentHtml: `
<p>Setiap tahun, puluhan ribu skripsi, tesis, dan disertasi berkualitas diselesaikan di perguruan tinggi Indonesia — lalu sebagian besar berhenti sebagai arsip perpustakaan. Padahal, dengan penyuntingan yang tepat, karya-karya tersebut dapat menjangkau pembaca yang jauh lebih luas sebagai buku referensi.</p>
<h2>Mengapa dikonversi menjadi buku?</h2>
<ul>
<li><strong>Jangkauan.</strong> Buku ber-ISBN terindeks Google Scholar dan dapat dirujuk peneliti lain — memperpanjang usia ilmiah karya Anda.</li>
<li><strong>Rekam jejak.</strong> Bagi dosen dan calon dosen, buku referensi bernilai angka kredit dan memperkuat portofolio akademik.</li>
<li><strong>Aksesibilitas.</strong> Format buku memaksa penulisan ulang yang lebih mengalir, sehingga hasil riset dapat dipahami audiens di luar bidang sempit Anda.</li>
</ul>
<h2>Bagaimana prosesnya?</h2>
<p>Melalui program konversi naskah, tim editorial Cognifera mendampingi proses restrukturisasi dari format akademik ke format buku: penyesuaian bab, penulisan ulang bagian metodologi, penyuntingan bahasa, hingga desain sampul dan tata letak. Penulis tetap memegang penuh hak atas karyanya.</p>
<p>Program ini terbuka sepanjang tahun bagi lulusan S1, S2, maupun S3 dari semua bidang ilmu. Informasi lengkap tersedia di halaman <a href="/services">Layanan</a>, atau hubungi tim kami melalui WhatsApp untuk konsultasi awal tanpa biaya — cukup siapkan naskah akhir dan lembar pengesahan Anda.</p>`,
  },

  // ============ COMPANY ============
  {
    slug: "website-baru-cognifera-resmi-diluncurkan",
    title: "Website Baru Cognifera Resmi Diluncurkan: Katalog Buku dan Portal Berita Terintegrasi",
    excerpt:
      "Cognifera meluncurkan situs web yang diperbarui menyeluruh — kini dengan katalog buku terbitan yang selalu mutakhir, portal berita riset, dan kanal konsultasi yang lebih responsif.",
    category: "company",
    tags: ["cognifera", "peluncuran", "website"],
    image: unsplash("1498050108023-c5249f4df085"),
    daysAgo: 4,
    contentHtml: `
<p>PT Cognifera Education Academy resmi meluncurkan situs web barunya. Pembaruan ini bukan sekadar tampilan: seluruh fondasi teknis situs dirombak agar informasi layanan, katalog buku, dan berita riset dapat dikelola serta diakses jauh lebih cepat.</p>
<h2>Apa yang baru?</h2>
<ul>
<li><strong>Katalog buku terintegrasi.</strong> Seluruh buku terbitan Cognifera kini tampil di halaman <a href="/publications">Publikasi</a> lengkap dengan pratinjau halaman, detail ISBN, dan kanal pemesanan langsung.</li>
<li><strong>Portal berita.</strong> Halaman <a href="/news">News</a> menghadirkan perkembangan dunia riset, tips publikasi, serta pengumuman program — diperbarui berkala oleh tim editorial.</li>
<li><strong>Konsultasi lebih mudah.</strong> Formulir konsultasi gratis kini terhubung langsung dengan tim layanan, dengan waktu respons yang lebih terukur.</li>
</ul>
<h2>Komitmen ke depan</h2>
<p>Pembaruan situs ini adalah bagian dari komitmen Cognifera memperluas akses layanan riset dan penerbitan bagi akademisi Indonesia. Dalam beberapa bulan ke depan, tim akan terus menambah konten edukatif — panduan publikasi, ulasan perkembangan riset, dan informasi program terbaru.</p>
<p>Masukan pengguna sangat kami nantikan. Sampaikan saran Anda melalui formulir kontak di halaman utama, atau langsung melalui kanal WhatsApp resmi Cognifera.</p>`,
  },
  {
    slug: "dua-buku-terbaru-cognifera-terbit-2026",
    title: "Dua Buku Terbaru Cognifera Terbit: Desain Pembelajaran Biologi dan Citizen Science Project",
    excerpt:
      "Cognifera menutup paruh pertama 2026 dengan menerbitkan dua buku akademik di bidang pendidikan biologi — hasil kolaborasi para dosen dan peneliti dari perguruan tinggi negeri.",
    category: "company",
    tags: ["buku baru", "pendidikan biologi", "terbitan cognifera"],
    image: unsplash("1532094349884-543bc11b234d"),
    daysAgo: 19,
    contentHtml: `
<p>Dua judul terbaru resmi bergabung dalam katalog terbitan PT Cognifera Education Academy: <em>Desain Pembelajaran Biologi di Pendidikan Tinggi</em> dan <em>Citizen Science Project (CSP): Inovasi Pembelajaran Biologi Partisipatif</em>. Keduanya ditulis oleh tim dosen dan peneliti pendidikan biologi dari perguruan tinggi negeri.</p>
<h2>Desain Pembelajaran Biologi di Pendidikan Tinggi</h2>
<p>Buku setebal 305 halaman ini disusun delapan penulis sebagai rujukan bagi dosen, mahasiswa, dan praktisi pendidikan dalam merancang perkuliahan biologi yang sistematis dan kontekstual — dari perencanaan strategi pembelajaran hingga penguatan kualitas proses belajar. <a href="/publications/books/desain-pembelajaran-biologi-di-pendidikan-tinggi">Lihat detail buku →</a></p>
<h2>Citizen Science Project (CSP)</h2>
<p>Mengangkat pendekatan yang tengah berkembang pesat di dunia, buku ini menyajikan landasan konseptual sekaligus panduan implementasi proyek sains warga dalam pembelajaran biologi — melibatkan masyarakat secara aktif dalam proses ilmiah. <a href="/publications/books/citizen-science-project-inovasi-pembelajaran-biologi-partisipatif">Lihat detail buku →</a></p>
<h2>Terbuka untuk penulis berikutnya</h2>
<p>Kedua buku terbit ber-ISBN, terindeks Google Scholar, dan tersedia dalam format cetak. Bagi dosen atau peneliti yang ingin menerbitkan karya serupa, layanan penerbitan Cognifera dibuka sepanjang tahun — kunjungi halaman <a href="/services">Layanan</a> untuk memulai.</p>`,
  },
];

const sql = neon(DATABASE_URL);

let inserted = 0;
for (const article of articles) {
  const existing = await sql`SELECT 1 FROM articles WHERE slug = ${article.slug} LIMIT 1;`;
  if (existing.length > 0) {
    console.log(`SKIP  ${article.slug} (sudah ada)`);
    continue;
  }

  console.log(`SEED  ${article.slug}`);
  const coverUrl = await uploadFromUrl(article.image);
  console.log(`      cover -> ${coverUrl}`);

  await sql`
    INSERT INTO articles (
      slug, title, excerpt, content_html, cover_image, category, tags, status,
      published_at
    ) VALUES (
      ${article.slug}, ${article.title}, ${article.excerpt},
      ${article.contentHtml.trim()}, ${coverUrl}, ${article.category},
      ${article.tags}, 'published',
      NOW() - (${article.daysAgo} || ' days')::interval
    );
  `;
  inserted += 1;
}

console.log(`Selesai: ${inserted} artikel baru di-seed (dari ${articles.length}).`);
