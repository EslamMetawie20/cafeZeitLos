import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';

// Public Pages
import { Home } from './pages/public/Home';
import { Login } from './pages/public/Login';
import { Register } from './pages/public/Register';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        
        {/* Legacy redirects to Home sections */}
        <Route path="/menu" element={<Navigate to="/#speisekarte" replace />} />
        <Route path="/highlights" element={<Navigate to="/#highlights" replace />} />
        <Route path="/gallery" element={<Navigate to="/#galerie" replace />} />
        <Route path="/about" element={<Navigate to="/#ueber-uns" replace />} />
        <Route path="/visit" element={<Navigate to="/#besuch-planen" replace />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}

export default App;
