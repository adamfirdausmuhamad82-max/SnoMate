/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MenuItem, CartItem, Order, DBCustomer, DBSales, DBPaymentMethod, DBStaff, DBProduct, DBCategory } from './types';
import {
  INITIAL_MENU_ITEMS,
  INITIAL_CUSTOMERS,
  INITIAL_SALES,
  INITIAL_PAYMENT_METHODS,
  INITIAL_STAFF,
  INITIAL_DB_PRODUCTS,
  INITIAL_CATEGORIES,
} from './data';

import HomeView from './components/HomeView';
import MenuView from './components/MenuView';
import FavoritesView from './components/FavoritesView';
import TrackingView from './components/TrackingView';
import ProfileView from './components/ProfileView';
import AdminCRUDView from './components/AdminCRUDView';

import {
  Heart,
  ShoppingCart,
  User,
  ShoppingBag,
  Clock,
  Menu as Hamburger,
  X,
  Plus,
  Minus,
  Sparkles,
  Award,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Client store states
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('snomate_menu_items');
    return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('snomate_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeOrders, setActiveOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('snomate_active_orders');
    if (saved) return JSON.parse(saved);
    
    // Default initial active tracking order matching HTML mockup specs
    const defaultProduct1 = INITIAL_MENU_ITEMS.find((x) => x.id === 'M007') || INITIAL_MENU_ITEMS[0];
    const defaultProduct2 = INITIAL_MENU_ITEMS.find((x) => x.id === 'M004') || INITIAL_MENU_ITEMS[1];
    
    return [
      {
        id: 'SM-4029',
        items: [
          { product: { ...defaultProduct1, name: 'Double Scoop Cloud Cone', price: 8.50 }, quantity: 1 },
          { product: { ...defaultProduct2, name: 'Frosty Sprinkles Pack', price: 2.00 }, quantity: 1 },
        ],
        date: '2026-07-13',
        totalAmount: 10.50,
        status: 'Delivery',
        riderName: 'Mateo S.',
        riderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbLYFd9QP84PsLn4UlLU6aLYT260rnMgDE_CzPb1U037n5lM3NfRmSWIxoiqLPky11ylOqfFrJ2pxGK-kttLcgZ9_HVRXlngJcVXN80V-y8gUBEUaWvX2E5OvP1RzGw3VNRJ09mU4UX3qXDFCENsD2eWCgmRRPg_vFKM_VtzJYSCPIC7TA7oFQViUmlCz1pHa8SwezljFMeihM6pSarMtA_tQfpMU_MJHFq9ZEwP1elUDzmwKgR_1JGFxRQe8W8kpQbJdnevxEyMxK',
        riderRating: 4.9,
        etaMinutes: 8,
        estimatedArrival: '12:45 PM',
      },
    ];
  });

  // Admin Panel toggle state
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Database Entity records states for persistent CRUD simulation
  const [customers, setCustomers] = useState<DBCustomer[]>(() => {
    const saved = localStorage.getItem('db_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [sales, setSales] = useState<DBSales[]>(() => {
    const saved = localStorage.getItem('db_sales');
    return saved ? JSON.parse(saved) : INITIAL_SALES;
  });

  const [paymentMethods, setPaymentMethods] = useState<DBPaymentMethod[]>(() => {
    const saved = localStorage.getItem('db_payments');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENT_METHODS;
  });

  const [staff, setStaff] = useState<DBStaff[]>(() => {
    const saved = localStorage.getItem('db_staff');
    return saved ? JSON.parse(saved) : INITIAL_STAFF;
  });

  const [products, setProducts] = useState<DBProduct[]>(() => {
    const saved = localStorage.getItem('db_products');
    return saved ? JSON.parse(saved) : INITIAL_DB_PRODUCTS;
  });

  const [categories, setCategories] = useState<DBCategory[]>(() => {
    const saved = localStorage.getItem('db_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  // Basket Drawer states
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [orderNotice, setOrderNotice] = useState<string | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('snomate_menu_items', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('snomate_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('snomate_active_orders', JSON.stringify(activeOrders));
  }, [activeOrders]);

  useEffect(() => {
    localStorage.setItem('db_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('db_sales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem('db_payments', JSON.stringify(paymentMethods));
  }, [paymentMethods]);

  useEffect(() => {
    localStorage.setItem('db_staff', JSON.stringify(staff));
  }, [staff]);

  useEffect(() => {
    localStorage.setItem('db_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('db_categories', JSON.stringify(categories));
  }, [categories]);

  // Core Client actions
  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((x) => x.product.id === item.id);
      if (existing) {
        return prev.map((x) => (x.product.id === item.id ? { ...x, quantity: x.quantity + 1 } : x));
      }
      return [...prev, { product: item, quantity: 1 }];
    });
  };

  const handleDecreaseQuantity = (productId: string) => {
    setCart((prev) => {
      const existing = prev.find((x) => x.product.id === productId);
      if (existing && existing.quantity > 1) {
        return prev.map((x) => (x.product.id === productId ? { ...x, quantity: x.quantity - 1 } : x));
      }
      return prev.filter((x) => x.product.id !== productId);
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((x) => x.product.id !== productId));
  };

  const handleToggleFavorite = (itemId: string) => {
    setMenuItems((prev) =>
      prev.map((x) => (x.id === itemId ? { ...x, isFavorite: !x.isFavorite } : x))
    );
  };

  // Stepper order simulator
  const handleAdvanceOrderStatus = (orderId: string) => {
    setActiveOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          if (o.status === 'Churning') {
            return { ...o, status: 'Delivery', etaMinutes: 8, estimatedArrival: '12:45 PM' };
          } else if (o.status === 'Delivery') {
            // Completed! Triggers dynamic SnoPoints reward alert!
            triggerNotice("Success! Mateo S. delivered your ice cream. Earned +150 SnoPoints!");
            return { ...o, status: 'Arrived', etaMinutes: 0, estimatedArrival: 'Delivered' };
          }
        }
        return o;
      })
    );
  };

  const handleCancelOrder = (orderId: string) => {
    setActiveOrders((prev) => prev.filter((x) => x.id !== orderId));
    triggerNotice("Order successfully cancelled.");
  };

  const triggerNotice = (msg: string) => {
    setOrderNotice(msg);
    setTimeout(() => {
      setOrderNotice(null);
    }, 4000);
  };

  // BOGO Sorbet calculation helper
  const getCartTotals = () => {
    let subtotal = 0;
    let bogoDiscount = 0;
    let sorbetCount = 0;
    let cheapestSorbetPrice = 999;

    cart.forEach((item) => {
      const itemCost = item.product.price * item.quantity;
      subtotal += itemCost;

      // Identify Sorbet items for the BOGO banner simulation
      if (item.product.name.toLowerCase().includes('sorbet')) {
        sorbetCount += item.quantity;
        if (item.product.price < cheapestSorbetPrice) {
          cheapestSorbetPrice = item.product.price;
        }
      }
    });

    // If BOGO (Buy 1 Get 1 Free) on sorbets is active
    if (sorbetCount >= 2) {
      const freeSorbets = Math.floor(sorbetCount / 2);
      bogoDiscount = freeSorbets * cheapestSorbetPrice;
    }

    const deliveryFee = subtotal > 0 ? 2.50 : 0;
    const finalTotal = subtotal - bogoDiscount + deliveryFee;

    return {
      subtotal,
      bogoDiscount,
      deliveryFee,
      finalTotal,
    };
  };

  const { subtotal, bogoDiscount, deliveryFee, finalTotal } = getCartTotals();

  // Create real order from Cart
  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    const newOrderId = `SM-${Math.floor(4000 + Math.random() * 9000)}`;
    const now = new Date();
    const etaMin = 15;
    const arrivalTime = new Date(now.getTime() + etaMin * 60000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const newOrder: Order = {
      id: newOrderId,
      items: [...cart],
      date: now.toISOString().split('T')[0],
      totalAmount: finalTotal,
      status: 'Churning',
      riderName: 'Mateo S.',
      riderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbLYFd9QP84PsLn4UlLU6aLYT260rnMgDE_CzPb1U037n5lM3NfRmSWIxoiqLPky11ylOqfFrJ2pxGK-kttLcgZ9_HVRXlngJcVXN80V-y8gUBEUaWvX2E5OvP1RzGw3VNRJ09mU4UX3qXDFCENsD2eWCgmRRPg_vFKM_VtzJYSCPIC7TA7oFQViUmlCz1pHa8SwezljFMeihM6pSarMtA_tQfpMU_MJHFq9ZEwP1elUDzmwKgR_1JGFxRQe8W8kpQbJdnevxEyMxK',
      riderRating: 4.9,
      etaMinutes: etaMin,
      estimatedArrival: arrivalTime,
    };

    // Register sale into the ERP Database state as well!
    const newSaleRecord: DBSales = {
      id: `SALE-${Math.floor(5000 + Math.random() * 9000)}`,
      salesType: 'Delivery',
      loyaltyProgram: 'SnoPoints',
      dateOfSale: newOrder.date,
      customerId: 'CUST-1001', // Linked to Alex johnson
      paymentMethodId: 'PAY-001',
      totalAmount: finalTotal,
      staffId: 'STF-3001', // Linked to Mateo Sandoval
    };

    setSales((prev) => [newSaleRecord, ...prev]);
    setActiveOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setShowCartDrawer(false);
    setActiveTab('orders');
    triggerNotice(`Order placed successfully as #${newOrderId}! Mateo is churning now.`);
  };

  const handleQuickBrowseSearch = (query: string) => {
    setSearchQuery(query);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Render ERP dashboard entirely if active
  if (showAdminPanel) {
    return (
      <AdminCRUDView
        customers={customers}
        sales={sales}
        paymentMethods={paymentMethods}
        staff={staff}
        products={products}
        categories={categories}
        setCustomers={setCustomers}
        setSales={setSales}
        setPaymentMethods={setPaymentMethods}
        setStaff={setStaff}
        setProducts={setProducts}
        setCategories={setCategories}
        onClose={() => setShowAdminPanel(false)}
      />
    );
  }

  return (
    <div className="bg-background text-on-background min-h-screen font-sans flex flex-col relative pb-24 selection:bg-primary-container selection:text-white">
      
      {/* Dynamic Success alerts for completed deliveries */}
      <AnimatePresence>
        {orderNotice && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 inset-x-4 mx-auto max-w-sm bg-primary border-2 border-primary-fixed text-white px-5 py-3 rounded-2xl shadow-xl z-[250] flex items-center justify-between gap-3 text-xs font-bold"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-200 fill-orange-200" />
              <span>{orderNotice}</span>
            </div>
            <button onClick={() => setOrderNotice(null)}>
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top App Bar Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex justify-between items-center px-4 h-[64px] w-full sticky top-0 z-[100] shadow-[0px_4px_16px_rgba(255,107,0,0.06)] border-b border-outline-variant/15">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-10 h-10 rounded-full bg-primary-fixed overflow-hidden flex items-center justify-center border border-primary-container/20">
            <img
              className="w-full h-full object-cover"
              alt="SnoMate Logo"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFfrBfQ-nhDH6N8jY1rqEcEfdK2Vuue_3hI_QCqPCmTJcUW499wsV70oHiSMsQUmfYZ4wbPiXARipbhiAJ8srQ1Ya2RNRP65E_X4QJcGCJfxdxf-OvMZkf3_JBc1Po_QIaHMypPyboMS7us13UifBVEKrx2PUE0OJ5kfoClAyudRolpafbPakxJ_moOMj2htB95bpECDTZXziYtmuSU6mX6sxYBjZ8zonCo6Hy8zt3wRkfwXbbvv_HUcu2UUGq6ItvFqsTctUn4aOw"
            />
          </div>
          <h1 className="font-sans text-xl font-extrabold text-primary tracking-tight">SnoMate</h1>
        </div>

        {/* Shopping basket action trigger */}
        <button
          onClick={() => setShowCartDrawer(true)}
          className="w-10 h-10 flex items-center justify-center rounded-full text-primary hover:bg-primary-container/10 transition-colors relative"
          id="cart-trigger-btn"
        >
          <ShoppingCart className="w-5 h-5" />
          {totalCartCount > 0 && (
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-primary-container text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white font-extrabold shadow-sm"
            >
              {totalCartCount}
            </motion.div>
          )}
        </button>
      </header>

      {/* Main Core Viewport Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full pt-2">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <HomeView
              key="home"
              menuItems={menuItems}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              onNavigateToTab={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSearch={handleQuickBrowseSearch}
            />
          )}

          {activeTab === 'menu' && (
            <MenuView
              key="menu"
              menuItems={menuItems}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
            />
          )}

          {activeTab === 'favorites' && (
            <FavoritesView
              key="favorites"
              menuItems={menuItems}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              onNavigateToTab={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeTab === 'orders' && (
            <TrackingView
              key="orders"
              activeOrders={activeOrders}
              onAdvanceOrderStatus={handleAdvanceOrderStatus}
              onCancelOrder={handleCancelOrder}
              onNavigateToTab={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              key="profile"
              menuItems={menuItems}
              onOpenAdminPanel={() => setShowAdminPanel(true)}
              onNavigateToTab={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Floating Action Button for active checkout (on non-profile screens) */}
      {totalCartCount > 0 && activeTab !== 'profile' && (
        <div className="fixed bottom-24 right-6 z-40">
          <button
            onClick={() => setShowCartDrawer(true)}
            className="w-14 h-14 bg-primary-container text-white rounded-2xl shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all relative border border-white/10"
            id="fab-checkout-btn"
          >
            <ShoppingBag className="w-6 h-6" />
            <div className="absolute -top-1.5 -right-1.5 bg-error text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-background font-bold shadow-md">
              {totalCartCount}
            </div>
          </button>
        </div>
      )}

      {/* Customer Bottom Navigation Bar */}
      <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-safe border-t border-outline-variant/30 bg-white/95 backdrop-blur-md shadow-[0px_-4px_16px_rgba(255,107,0,0.06)] rounded-t-2xl">
        <button
          onClick={() => {
            setSearchQuery('');
            setActiveTab('home');
          }}
          className={`flex flex-col items-center justify-center py-1 px-4 rounded-full transition-all duration-250 ${
            activeTab === 'home'
              ? 'bg-primary-container text-white shadow-sm'
              : 'text-on-surface-variant hover:bg-surface-variant/35'
          }`}
        >
          <span className="material-symbols-outlined font-normal">
            {activeTab === 'home' ? 'home' : 'home_outline'}
          </span>
          <span className="font-sans font-bold text-[10px] mt-0.5">Home</span>
        </button>

        <button
          onClick={() => {
            setSearchQuery('');
            setActiveTab('menu');
          }}
          className={`flex flex-col items-center justify-center py-1 px-4 rounded-full transition-all duration-250 ${
            activeTab === 'menu'
              ? 'bg-primary-container text-white shadow-sm'
              : 'text-on-surface-variant hover:bg-surface-variant/35'
          }`}
        >
          <span className="material-symbols-outlined">icecream</span>
          <span className="font-sans font-bold text-[10px] mt-0.5">Menu</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('favorites');
          }}
          className={`flex flex-col items-center justify-center py-1 px-4 rounded-full transition-all duration-250 ${
            activeTab === 'favorites'
              ? 'bg-primary-container text-white shadow-sm'
              : 'text-on-surface-variant hover:bg-surface-variant/35'
          }`}
        >
          <span className="material-symbols-outlined">
            {activeTab === 'favorites' ? 'favorite' : 'favorite_outline'}
          </span>
          <span className="font-sans font-bold text-[10px] mt-0.5">Favorites</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('orders');
          }}
          className={`flex flex-col items-center justify-center py-1 px-4 rounded-full transition-all duration-250 ${
            activeTab === 'orders'
              ? 'bg-primary-container text-white shadow-sm'
              : 'text-on-surface-variant hover:bg-surface-variant/35'
          }`}
        >
          <span className="material-symbols-outlined">receipt_long</span>
          <span className="font-sans font-bold text-[10px] mt-0.5">Orders</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('profile');
          }}
          className={`flex flex-col items-center justify-center py-1 px-4 rounded-full transition-all duration-250 ${
            activeTab === 'profile'
              ? 'bg-primary-container text-white shadow-sm'
              : 'text-on-surface-variant hover:bg-surface-variant/35'
          }`}
        >
          <span className="material-symbols-outlined">person</span>
          <span className="font-sans font-bold text-[10px] mt-0.5">Profile</span>
        </button>
      </nav>

      {/* Slide-out Checkout Cart Drawer Dialog */}
      <AnimatePresence>
        {showCartDrawer && (
          <div className="fixed inset-0 z-[150] flex justify-end bg-black/60 backdrop-blur-xs">
            {/* Backdrop cancel */}
            <div className="absolute inset-0" onClick={() => setShowCartDrawer(false)} />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35 }}
              className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 border-l border-outline-variant/20"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-outline-variant/15 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  <h3 className="font-sans text-lg font-black text-slate-900">Your Basket</h3>
                </div>
                <button
                  onClick={() => setShowCartDrawer(false)}
                  className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {/* Items List Workspace */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
                {cart.length > 0 ? (
                  cart.map((cartItem) => (
                    <div
                      key={cartItem.product.id}
                      className="bg-slate-50 p-3 rounded-2xl border border-outline-variant/10 flex gap-4 items-center justify-between"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-xs flex-shrink-0">
                        <img
                          className="w-full h-full object-cover"
                          src={cartItem.product.image}
                          alt={cartItem.product.name}
                        />
                      </div>

                      <div className="flex-1">
                        <h4 className="font-sans font-bold text-xs text-on-surface line-clamp-1">
                          {cartItem.product.name}
                        </h4>
                        <p className="text-primary font-sans font-black text-xs mt-0.5">
                          ${cartItem.product.price.toFixed(2)}
                        </p>

                        {/* Adjust quantities */}
                        <div className="flex items-center gap-2.5 mt-2">
                          <button
                            onClick={() => handleDecreaseQuantity(cartItem.product.id)}
                            className="w-6 h-6 rounded-full bg-white border border-outline-variant/30 flex items-center justify-center text-slate-600 hover:bg-slate-100 active:scale-90"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-sans font-extrabold text-xs text-slate-800">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => handleAddToCart(cartItem.product)}
                            className="w-6 h-6 rounded-full bg-white border border-outline-variant/30 flex items-center justify-center text-slate-600 hover:bg-slate-100 active:scale-90"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveFromCart(cartItem.product.id)}
                        className="text-outline hover:text-error p-1"
                        title="Remove item"
                      >
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="py-16 text-center text-slate-400">
                    <span className="material-symbols-outlined text-4xl mb-2">shopping_basket</span>
                    <p className="font-sans font-bold">Your basket is empty!</p>
                    <p className="font-body text-[11px] text-outline mt-1 max-w-[200px] mx-auto">
                      Explore our delicious scoops and add your frosty favorite today.
                    </p>
                  </div>
                )}

                {/* BOGO Sorbet Banner Notification */}
                {cart.some((x) => x.product.name.toLowerCase().includes('sorbet')) && (
                  <div className="bg-orange-50 border border-orange-200 p-3 rounded-2xl flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-primary-container fill-primary-container shrink-0" />
                    <p className="font-body text-[10px] leading-relaxed text-on-secondary-fixed-variant">
                      <span className="font-bold">Fruit Sorbet BOGO Active!</span> Buy any 2 sorbets, the cheaper one is 100% free! Add more sorbets to save!
                    </p>
                  </div>
                )}
              </div>

              {/* Summary checkout action block */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-outline-variant/15 bg-slate-50 space-y-3">
                  <div className="space-y-1.5 text-xs text-slate-600 font-sans">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                    </div>

                    {bogoDiscount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>BOGO Sorbet Promo discount</span>
                        <span>-${bogoDiscount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Insulated Shipping Fee</span>
                      <span className="font-semibold text-slate-900">${deliveryFee.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-1.5 border-t border-slate-200">
                      <span>Total Amount</span>
                      <span className="text-primary text-base font-black">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-primary-container text-white py-3.5 rounded-full font-sans font-black text-sm tracking-wide shadow-md hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2"
                  >
                    Place Insulated Order
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
