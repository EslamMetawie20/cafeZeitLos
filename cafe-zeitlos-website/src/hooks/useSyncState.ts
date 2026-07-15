import { useState, useEffect } from 'react';
import { db } from '../storage/demoDatabase';
import type { Order, Reservation } from '../types/models';

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

  const updateOrder = (id: string, updates: Partial<Order>) => {
    const currentOrders = db.getOrders();
    const order = currentOrders.find(o => o.id === id);
    if (order) {
      db.saveOrder({
        ...order,
        ...updates,
        updatedAt: new Date().toISOString()
      });
    }
  };

  return { orders, updateOrder };
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

  const updateReservation = (id: string, updates: Partial<Reservation>) => {
    const currentReservations = db.getReservations();
    const res = currentReservations.find(r => r.id === id);
    if (res) {
      db.saveReservation({
        ...res,
        ...updates
      });
    }
  };

  return { reservations, updateReservation };
}
