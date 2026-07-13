import { useState, useEffect } from 'react';
import { db } from '../storage/demoDatabase';

export function useOrders() {
  const [orders, setOrders] = useState(() => db.getOrders());

  useEffect(() => {
    const handleSync = (e: any) => {
      if (e.detail?.type === 'orders' || e.detail?.type === 'reset') {
        setOrders(db.getOrders());
      }
    };
    
    window.addEventListener('cz_sync', handleSync);
    return () => window.removeEventListener('cz_sync', handleSync);
  }, []);

  return { orders };
}

export function useReservations() {
  const [reservations, setReservations] = useState(() => db.getReservations());

  useEffect(() => {
    const handleSync = (e: any) => {
      if (e.detail?.type === 'reservations' || e.detail?.type === 'reset') {
        setReservations(db.getReservations());
      }
    };
    
    window.addEventListener('cz_sync', handleSync);
    return () => window.removeEventListener('cz_sync', handleSync);
  }, []);

  return { reservations };
}
