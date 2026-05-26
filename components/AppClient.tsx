'use client';
import { useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '@/data/products';
import type { Product } from '@/data/products';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductsSection from '@/components/ProductsSection';
import CartDrawer from '@/components/CartDrawer';
import AuthModal from '@/components/AuthModal';
import CheckoutPage from '@/components/CheckoutPage';
import InvoicePage from '@/components/InvoicePage';
import Footer from '@/components/Footer';

interface CartItem { productId: number; name: string; price: number; image: string; size: string; quantity: number; }
interface User { name: string; identifier: string; }
interface Order {
  id: string;
  user: { name: string; phone: string; address: string; city: string };
  items: CartItem[];
  subtotal: number;
  delivery: number;
  total: number;
  paymentMethod: string;
  transactionInfo: string;
  status: string;
  createdAt: string;
}

function getStored<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : fallback; } catch { return fallback; }
}

export default function AppClient() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState('home');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  useEffect(() => {
    setMounted(true);
    setProducts(getStored('jt_products', INITIAL_PRODUCTS));
    setCart(getStored('jt_cart', []));
    setCurrentUser(getStored('jt_currentUser', null));
    setOrders(getStored('jt_orders', []));
  }, []);

  useEffect(() => { if (mounted) localStorage.setItem('jt_products', JSON.stringify(products)); }, [products, mounted]);
  useEffect(() => { if (mounted) localStorage.setItem('jt_cart', JSON.stringify(cart)); }, [cart, mounted]);
  useEffect(() => { if (mounted) localStorage.setItem('jt_orders', JSON.stringify(orders)); }, [orders, mounted]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  function addToCart(product: Product, size: string) {
    setCart(prev => {
      const existing = prev.find(i => i.productId === product.id && i.size === size);
      if (existing) return prev.map(i => i.productId === product.id && i.size === size ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { productId: product.id, name: product.name, price: product.price, image: product.image, size, quantity: 1 }];
    });
    setCartOpen(true);
  }

  function removeFromCart(productId: number, size: string) {
    setCart(prev => prev.filter(i => !(i.productId === productId && i.size === size)));
  }

  function updateQty(productId: number, size: string, delta: number) {
    setCart(prev => prev.map(i => i.productId === productId && i.size === size ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
  }

  function placeOrder(orderData: Omit<Order, 'id' | 'status' | 'createdAt'>) {
    const newOrder: Order = { id: 'ORD-' + Date.now(), ...orderData, status: 'Pending', createdAt: new Date().toISOString() };
    setOrders(prev => { const updated = [newOrder, ...prev]; localStorage.setItem('jt_orders', JSON.stringify(updated)); return updated; });
    setProducts(prev => prev.map(p => {
      const ordered = orderData.items.filter(i => i.productId === p.id);
      if (ordered.length) { const qty = ordered.reduce((s, i) => s + i.quantity, 0); return { ...p, stockQty: Math.max(0, p.stockQty - qty) }; }
      return p;
    }));
    setCart([]);
    localStorage.setItem('jt_cart', JSON.stringify([]));
    setCurrentOrder(newOrder);
    setView('invoice');

    // WhatsApp notification to seller
    const phoneNumber = '+8801340885012';
    const items = orderData.items.map(i => `${i.name} (${i.size}) x${i.quantity}`).join(', ');
    const msg = encodeURIComponent(
      `*New Order from Joss Toh*\n\nName: ${orderData.user.name}\nPhone: ${orderData.user.phone}\nAddress: ${orderData.user.address}\n\nProducts: ${items}\n\nSubtotal: ৳${orderData.subtotal}\nDelivery: ৳${orderData.delivery}\nTotal: ৳${orderData.total}\n\nPayment: ${orderData.paymentMethod}${orderData.transactionInfo ? '\nTransaction: ' + orderData.transactionInfo : ''}`
    );
    setTimeout(() => { window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${msg}`, '_blank'); }, 1500);
  }

  function loginUser(user: User) {
    setCurrentUser(user);
    localStorage.setItem('jt_currentUser', JSON.stringify(user));
    setAuthOpen(false);
  }

  function logoutUser() {
    setCurrentUser(null);
    localStorage.removeItem('jt_currentUser');
  }

  function openAuth(mode = 'login') { setAuthMode(mode); setAuthOpen(true); }

  function goCheckout() {
    if (!currentUser) { openAuth('login'); return; }
    setCartOpen(false);
    setView('checkout');
  }

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <TopBar />
      <Navbar cartCount={cartCount} currentUser={currentUser} onCartOpen={() => setCartOpen(true)} onAuthOpen={openAuth} onLogout={logoutUser} onHome={() => setView('home')} />

      {view === 'home' && (
        <>
          <Hero />
          <ProductsSection products={products} onAddToCart={addToCart} />
          <Footer />
        </>
      )}

      {view === 'checkout' && (
        <CheckoutPage cart={cart} currentUser={currentUser} onPlaceOrder={placeOrder} onBack={() => setView('home')} />
      )}

      {view === 'invoice' && currentOrder && (
        <InvoicePage order={currentOrder} onHome={() => setView('home')} />
      )}

      <CartDrawer open={cartOpen} cart={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} onUpdateQty={updateQty} onCheckout={goCheckout} />
      <AuthModal open={authOpen} mode={authMode} onClose={() => setAuthOpen(false)} onLogin={loginUser} onSwitchMode={setAuthMode} />
    </div>
  );
}
