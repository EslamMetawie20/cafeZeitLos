import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Send } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../../storage/demoDatabase';

export function CartWidget() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState('');

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      setIsOpen(false);
      return;
    }

    db.saveOrder({
      id: Math.random().toString(36).substring(2, 9),
      customerId: user.id,
      customerName: user.name,
      items: items.map(i => ({ id: Math.random().toString(36).substring(2, 9), menuItemId: i.id, name: i.name, quantity: i.quantity, price: i.price })),
      status: 'pending',
      total: totalPrice,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tableNumber: tableNumber || undefined,
    });

    clearCart();
    setIsOpen(false);
    navigate('/account');
  };

  if (totalItems === 0) return null;

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-cafe-espresso text-cafe-cream p-4 rounded-full shadow-2xl flex items-center justify-center border-4 border-cafe-ivory"
      >
        <ShoppingBag size={24} />
        <motion.span 
          key={totalItems}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute -top-2 -right-2 bg-cafe-terracotta text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md"
        >
          {totalItems}
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-espresso-900/40 backdrop-blur-sm z-50"
            />
            
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-warm-ivory-200 flex justify-between items-center bg-cafe-ivory">
                <h2 className="font-heading text-2xl font-bold text-cafe-espresso flex items-center gap-2">
                  <ShoppingBag className="text-cafe-terracotta" />
                  Deine Bestellung
                </h2>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-cafe-cream rounded-full transition-colors text-cafe-espresso"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-cream-50">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-warm-ivory-100">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-warm-ivory-100" />
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-espresso-900 line-clamp-1">{item.name}</h4>
                        <button onClick={() => removeItem(item.id)} className="text-espresso-300 hover:text-red-500 transition-colors">
                          <X size={16} />
                        </button>
                      </div>
                      <div className="text-terracotta-600 font-semibold mb-auto">
                        €{(item.price * item.quantity).toFixed(2)}
                      </div>
                      
                      <div className="flex items-center gap-3 mt-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full bg-warm-ivory-100 flex items-center justify-center text-espresso-600 hover:bg-warm-ivory-200 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-medium text-sm w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-warm-ivory-100 flex items-center justify-center text-espresso-600 hover:bg-warm-ivory-200 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-warm-ivory-200 bg-white p-6 space-y-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                <div>
                  <label className="block text-sm font-medium text-espresso-700 mb-1">Tisch-Nummer (optional)</label>
                  <input 
                    type="text" 
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="z.B. 12"
                    className="w-full px-4 py-2 border border-warm-ivory-200 rounded-lg focus:outline-none focus:border-terracotta-400 bg-cream-50"
                  />
                </div>
                
                <div className="flex justify-between items-center text-lg font-bold text-espresso-900 pt-2 border-t border-warm-ivory-100">
                  <span>Gesamt</span>
                  <span>€{totalPrice.toFixed(2)}</span>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  className="w-full py-4 bg-cafe-espresso text-cafe-cream rounded-xl font-medium shadow-lg hover:bg-espresso-800 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Bestellung abschicken
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
