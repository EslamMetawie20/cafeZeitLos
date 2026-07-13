import type { Order, Reservation, User } from '../types/models';

export const DEMO_USERS: User[] = [
  { id: 'admin-1', name: 'Lena (Admin)', email: 'admin@cafe-zeitlos.de', role: 'admin' },
  { id: 'staff-1', name: 'Max (Barista)', email: 'staff@cafe-zeitlos.de', role: 'staff' },
  { id: 'customer-1', name: 'Sarah M.', email: 'sarah@example.com', role: 'customer' }
];

const generateId = () => Math.random().toString(36).substr(2, 9);

const INITIAL_ORDERS: Order[] = [
  {
    id: generateId(),
    customerName: 'Sarah M.',
    customerId: 'customer-1',
    items: [
      { id: generateId(), menuItemId: 'lotus-pancakes', name: 'Lotus Pancakes', quantity: 1, price: 9.90 },
      { id: generateId(), menuItemId: 'cappuccino', name: 'Cappuccino', quantity: 2, price: 3.50 }
    ],
    status: 'preparing',
    total: 16.90,
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    tableNumber: '12'
  },
  {
    id: generateId(),
    customerName: 'Tom (Gast)',
    items: [
      { id: generateId(), menuItemId: 'avocado-stulle', name: 'Avocado Stulle', quantity: 1, price: 8.50 }
    ],
    status: 'pending',
    total: 8.50,
    createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(), // 2 mins ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    tableNumber: '4'
  },
  {
    id: generateId(),
    customerName: 'Julia (Gast)',
    items: [
      { id: generateId(), menuItemId: 'chicken-egg-bowl', name: 'Chicken Egg Bowl', quantity: 1, price: 11.90 }
    ],
    status: 'ready',
    total: 11.90,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    tableNumber: '8'
  }
];

const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: generateId(),
    name: 'Sarah M.',
    email: 'sarah@example.com',
    date: new Date().toISOString().split('T')[0],
    time: '14:30',
    guests: 2,
    status: 'confirmed',
    note: 'Geburtstag',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
  },
  {
    id: generateId(),
    name: 'Michael B.',
    email: 'michab@example.com',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString().split('T')[0], // tomorrow
    time: '10:00',
    guests: 4,
    status: 'pending',
    createdAt: new Date().toISOString()
  }
];

class DemoDatabase {
  private channel = new BroadcastChannel('cafe_zeitlos_sync');

  init() {
    if (!localStorage.getItem('cz_initialized')) {
      this.reset();
    }
    
    // Listen for cross-tab sync
    this.channel.onmessage = (event) => {
      // Trigger a custom event that UI components can listen to
      window.dispatchEvent(new CustomEvent('cz_sync', { detail: event.data }));
    };
  }

  reset() {
    localStorage.setItem('cz_orders', JSON.stringify(INITIAL_ORDERS));
    localStorage.setItem('cz_reservations', JSON.stringify(INITIAL_RESERVATIONS));
    localStorage.setItem('cz_initialized', 'true');
    this.broadcastUpdate('reset');
  }

  private broadcastUpdate(type: string) {
    this.channel.postMessage({ type, timestamp: Date.now() });
    // Also trigger locally so the current tab updates
    window.dispatchEvent(new CustomEvent('cz_sync', { detail: { type, timestamp: Date.now() } }));
  }

  // Orders
  getOrders(): Order[] {
    return JSON.parse(localStorage.getItem('cz_orders') || '[]');
  }

  saveOrder(order: Order) {
    const orders = this.getOrders();
    const index = orders.findIndex(o => o.id === order.id);
    if (index >= 0) {
      orders[index] = order;
    } else {
      orders.unshift(order);
    }
    localStorage.setItem('cz_orders', JSON.stringify(orders));
    this.broadcastUpdate('orders');
  }

  // Reservations
  getReservations(): Reservation[] {
    return JSON.parse(localStorage.getItem('cz_reservations') || '[]');
  }

  saveReservation(res: Reservation) {
    const reservations = this.getReservations();
    const index = reservations.findIndex(r => r.id === res.id);
    if (index >= 0) {
      reservations[index] = res;
    } else {
      reservations.unshift(res);
    }
    localStorage.setItem('cz_reservations', JSON.stringify(reservations));
    this.broadcastUpdate('reservations');
  }
}

export const db = new DemoDatabase();
