export type UserRole = 'admin' | 'staff' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface OrderItem {
  id: string; // unique item instance id
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  customerId?: string;
  customerName: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  createdAt: string; // ISO Date
  updatedAt: string; // ISO Date
  tableNumber?: string;
}

export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Reservation {
  id: string;
  name: string;
  email: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  guests: number;
  status: ReservationStatus;
  note?: string;
  createdAt: string;
}

export interface AnalyticsData {
  dailyRevenue: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
  totalOrdersToday: number;
  activeReservations: number;
  revenueByDay: { day: string; revenue: number }[];
  topItems: { name: string; count: number }[];
}
