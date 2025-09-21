import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="Cognifera Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <h3 className="text-xl font-bold">PT COGNIFERA EDUCATION ACADEMY</h3>
            </div>
            <p className="text-gray-300">
              Layanan riset dan konsultasi profesional untuk mendukung kebutuhan bisnis dan akademik Anda.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Layanan</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#layanan" className="hover:text-white transition-colors">FERADATA - Analisis Data</a></li>
              <li><a href="#layanan" className="hover:text-white transition-colors">FERAGUIDE - Bimbingan Karya Ilmiah</a></li>
              <li><a href="#layanan" className="hover:text-white transition-colors">FERAPUB - Publikasi Ilmiah</a></li>
              <li><a href="#layanan" className="hover:text-white transition-colors">FERAGRANT - Pendanaan Penelitian</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Perusahaan</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#about" className="hover:text-white transition-colors">Tentang Kami</a></li>
              <li><a href="#testimonial" className="hover:text-white transition-colors">Testimonial</a></li>
              <li><a href="#berita" className="hover:text-white transition-colors">Berita</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Kontak</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Kontak</h4>
            <div className="space-y-2 text-gray-300">
              <p>Email: cognifera.edu@gmail.com</p>
              <p>Phone: +62 81 355 515 694</p>
              <p>Address: Makassar, Indonesia</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 PT COGNIFERA EDUCATION ACADEMY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}