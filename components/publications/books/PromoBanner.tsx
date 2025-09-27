"use client";

export function PromoBanner() {
  return (
    <div className="mt-12 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg p-8 text-center">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">Yuk, cari tahu perbedaan format PDF dan EPUB!</h3>
        <p className="mb-6">Dapatkan pengalaman membaca yang lebih baik dengan format yang sesuai kebutuhan Anda</p>
        <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
          Klik di Sini
        </button>
      </div>
    </div>
  );
}