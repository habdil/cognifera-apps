'use client';

import { useState, useEffect } from 'react';
import PromoPopup from './PromoPopup';

const PromoPopupProvider = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  useEffect(() => {
    // Check if popup has been shown in this session
    const popupShown = sessionStorage.getItem('promoPopupShown');

    if (!popupShown && !hasShownPopup) {
      // Show popup after a short delay (2 seconds)
      const timer = setTimeout(() => {
        setIsPopupOpen(true);
        setHasShownPopup(true);
        sessionStorage.setItem('promoPopupShown', 'true');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hasShownPopup]);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <PromoPopup
      isOpen={isPopupOpen}
      onClose={handleClosePopup}
    />
  );
};

export default PromoPopupProvider;