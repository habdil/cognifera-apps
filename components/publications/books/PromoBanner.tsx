"use client";

export function PromoBanner() {
  return (
    <div className="mt-16 bg-gray-950 p-10 md:p-14">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/40 mb-4">
          Konsultasi Riset
        </p>
        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
          Ingin Menerbitkan Buku Anda?
        </h3>
        <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
          Cognifera membantu peneliti dan akademisi menerbitkan karya ilmiah dengan standar profesional dan ber-ISBN resmi.
        </p>
        <a
          href="https://wa.me/message/VRRB5IFQ7LQ4A1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 text-sm font-medium tracking-wide transition-colors"
        >
          Konsultasi Penerbitan
        </a>
      </div>
    </div>
  );
}
