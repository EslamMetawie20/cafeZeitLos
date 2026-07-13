import { } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import type { UserRole } from '../../types/models';

interface RoleGuardProps {
  allowedRoles: UserRole[];
}

export function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="w-8 h-8 border-4 border-espresso-800 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // If they are logged in but unauthorized, redirect to their respective dashboard or home
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    if (user.role === 'staff') return <Navigate to="/staff" replace />;
    if (user.role === 'customer') return <Navigate to="/account" replace />;
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
