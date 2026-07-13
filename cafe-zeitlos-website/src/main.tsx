import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n'
import { db } from './storage/demoDatabase'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'

db.init();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
)
