// src/hooks/usePageViewTracking.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageViewTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location]);
};

export default usePageViewTracking;
