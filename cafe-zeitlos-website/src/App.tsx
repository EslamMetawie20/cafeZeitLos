import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { StaffLayout } from './components/layout/StaffLayout';
import { CustomerLayout } from './components/layout/CustomerLayout';
import { RoleGuard } from './components/auth/RoleGuard';

// Public Pages
import { Home } from './pages/public/Home';
import { MenuPage } from './pages/public/MenuPage';
import { GalleryPage } from './pages/public/GalleryPage';
import { AboutPage } from './pages/public/AboutPage';
import { VisitPage } from './pages/public/VisitPage';
import { Login } from './pages/public/Login';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';

// Staff Pages
import { StaffDashboard } from './pages/staff/StaffDashboard';

// Customer Pages
import { CustomerDashboard } from './pages/customer/CustomerDashboard';

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/visit" element={<VisitPage />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<RoleGuard allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<div>Admin Orders</div>} />
          <Route path="reservations" element={<div>Admin Reservations</div>} />
          <Route path="menu" element={<div>Admin Menu</div>} />
          <Route path="team" element={<div>Admin Team</div>} />
          <Route path="settings" element={<div>Admin Settings</div>} />
        </Route>
      </Route>

      {/* Staff Routes */}
      <Route element={<RoleGuard allowedRoles={['staff', 'admin']} />}>
        <Route path="/staff" element={<StaffLayout />}>
          <Route index element={<StaffDashboard />} />
          <Route path="reservations" element={<div>Staff Reservations</div>} />
          <Route path="availability" element={<div>Staff Availability</div>} />
        </Route>
      </Route>

      {/* Customer Routes */}
      <Route element={<RoleGuard allowedRoles={['customer']} />}>
        <Route path="/account" element={<CustomerLayout />}>
          <Route index element={<CustomerDashboard />} />
          <Route path="menu" element={<div>Customer Menu</div>} />
          <Route path="favorites" element={<div>Customer Favorites</div>} />
          <Route path="profile" element={<div>Customer Profile</div>} />
        </Route>
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
