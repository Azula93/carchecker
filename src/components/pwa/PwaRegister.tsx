'use client';

import { useEffect } from 'react';

export const PwaRegister = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            console.log('CarCheck PWA Service Worker registrado con éxito:', reg.scope);
          })
          .catch((err) => {
            console.log('Error registrando PWA Service Worker:', err);
          });
      });
    }
  }, []);

  return null;
};
