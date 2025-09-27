'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';

interface PromoPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PromoPopup = ({ isOpen, onClose }: PromoPopupProps) => {
  const handleWhatsAppRedirect = () => {
    const whatsappNumber = '6285920173338'; // Replace with your WhatsApp number
    const message = 'Halo! Saya tertarik dengan promo layanan penerbitan buku yang sedang berlangsung. Bisa tolong berikan informasi lebih lanjut?';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const handleImageClick = () => {
    handleWhatsAppRedirect();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Canvas Background */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-[10000] max-w-4xl mx-4 animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <Button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </Button>

        {/* Promo Image */}
        <div
          className="cursor-pointer hover:scale-105 transition-transform duration-200 rounded-lg overflow-hidden shadow-2xl"
          onClick={handleImageClick}
        >
          <Image
            src="/WA_Share_1.png"
            alt="Promo Cognifera"
            width={1920}
            height={1080}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default PromoPopup;