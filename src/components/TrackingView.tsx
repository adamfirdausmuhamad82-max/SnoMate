/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MenuItem, Order } from '../types';
import { MapPin, Phone, MessageSquare, Star, Clock, ShoppingBag, RotateCw, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TrackingViewProps {
  activeOrders: Order[];
  onAdvanceOrderStatus: (orderId: string) => void;
  onCancelOrder?: (orderId: string) => void;
  onNavigateToTab: (tab: string) => void;
  key?: string;
}

export default function TrackingView({
  activeOrders,
  onAdvanceOrderStatus,
  onCancelOrder,
  onNavigateToTab,
}: TrackingViewProps) {
  const [selectedOrderId, setSelectedOrderId] = useState<string>('');
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<string[]>([
    "Mateo S.: Hey Alex! I've packed your treats in an insulated SnoBox with dry ice. I am heading your way now!",
  ]);
  const [newMsg, setNewMsg] = useState('');

  useEffect(() => {
    if (activeOrders.length > 0 && !selectedOrderId) {
      setSelectedOrderId(activeOrders[0].id);
    }
  }, [activeOrders, selectedOrderId]);

  const currentOrder = activeOrders.find((o) => o.id === selectedOrderId) || activeOrders[0];

  const handleCall = () => {
    alert("Simulating call to Mateo S. (+1 555-782-9011):\n'Hey there! I am Mateo, your SnoMate rider. I am currently passing the Maplewood park intersection and will arrive in a couple of minutes. Your ice cream is frozen fresh!'");
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    setChatMessages((prev) => [...prev, `You: ${newMsg}`]);
    const reply = newMsg;
    setNewMsg('');
    
    // Simulate rider reply
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        `Mateo S.: Awesome! Got your message "${reply}". Be there in a jiffy. Stay chilled!`,
      ]);
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="pb-12"
    >
      <div className="mb-4 px-4">
        <h2 className="font-sans text-3xl font-extrabold text-primary tracking-tight mb-1">
          Track Your Treat
        </h2>
        <p className="font-body text-sm text-on-surface-variant">
          Follow your sweet treats from our parlor to your doorstep in real-time.
        </p>
      </div>

      {/* Order Selector (if multiple exist) */}
      {activeOrders.length > 1 && (
        <div className="flex gap-2 overflow-x-auto px-4 mb-4 no-scrollbar">
          {activeOrders.map((o) => (
            <button
              key={o.id}
              onClick={() => setSelectedOrderId(o.id)}
              className={`px-4 py-2 rounded-xl font-sans font-bold text-xs whitespace-nowrap transition-all ${
                selectedOrderId === o.id
                  ? 'bg-primary-container text-white shadow-md'
                  : 'bg-white border border-outline-variant/30 text-on-surface-variant'
              }`}
            >
              Order {o.id} ({o.status})
            </button>
          ))}
        </div>
      )}

      {currentOrder ? (
        <div>
          {/* Stylized Map View Section */}
          <section className="relative h-[42vh] w-full overflow-hidden border-b border-outline-variant/10 shadow-inner">
            <div className="absolute inset-0 bg-surface-container-low">
              <img
                className="w-full h-full object-cover opacity-85 select-none"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC31v5bdyGjxgLTgbcEjcRd1wgrsucFS7zKC3Gnm8Jw-w1HXzjYL982JpYUHMUtjYGA3d6G2EXVTUXzx9qm5zNC-r1PBXTjszSbiwwGxCqUO6AIrVnSkOD9E45z23AAqMCYy0F5rMDMlJFzWlFB_Xn8E7E6MyKgh0Vjk0yebKyk-_ClvDIMdmK2vkZucvWuk4w5poW7ZVaniPvzKweEsdYGJgMNo_wvT2uEd-796DbNz2_NzYt_BTpiDSOQls1dRCZjm9ESSGHlJw63"
                alt="Delivery Map Route"
              />
            </div>

            {/* Float ETA Header Card */}
            <div className="absolute inset-x-4 top-4">
              <div className="glass-card p-4 rounded-2xl shadow-lg border border-white/40 flex items-center justify-between">
                <div>
                  <p className="font-sans font-extrabold text-[10px] text-on-surface-variant uppercase tracking-widest">
                    Estimated Arrival
                  </p>
                  <p className="font-sans text-lg font-black text-primary">
                    {currentOrder.estimatedArrival} • {currentOrder.etaMinutes} mins
                  </p>
                </div>
                <div className="bg-primary-container w-11 h-11 rounded-full flex items-center justify-center text-white shadow-md animate-pulse">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Custom bouncing/pulsing Mascot Location Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary-container/30 rounded-full animate-ping scale-150"></div>
                <div className="absolute -inset-2 bg-primary/25 rounded-full scale-110"></div>
                <div className="relative w-16 h-16 bg-white rounded-full p-1.5 shadow-xl border-2 border-primary-container z-10 flex items-center justify-center">
                  <img
                    alt="SnoMate Tracker Mascot"
                    className="w-full h-full object-contain animate-bounce"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIA6_C0EBhAplmIKIWwo5_hVNFPmgr6TEuc0VxZuLfkajrNuT5UJ68LyXkNsDpBEglz8tOmOkbFUUeUXBH6dkuLdogB5VSg91cvU4HLnXGzPg2yf9ekxG3P2YE6LxRpGthJdeCe0zDMChHAZkvu40RdT3XNJVliadApwsTh7BMVZFkMWahNUZyUjqUOfYhlM7dbD1J91cOj4h0NxR82l-IRBQvwcp00cQOns7rNnzj2Ze4rAvw4b5JEsxdMjo2py-iDTX3OJrVIDXX"
                  />
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary-container rotate-45 z-0"></div>
              </div>
            </div>
          </section>

          {/* Stepper Progress Section */}
          <section className="px-4 -mt-8 relative z-30">
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-outline-variant/10">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-sans text-xl font-bold text-on-surface">Track Your Treat</h3>
                  <p className="font-body text-xs text-on-surface-variant">Insulated, frosty shipping guaranteed</p>
                </div>

                {/* Simulation Control Trigger */}
                <button
                  onClick={() => onAdvanceOrderStatus(currentOrder.id)}
                  className="bg-primary/10 text-primary hover:bg-primary/20 text-xs font-bold px-3.5 py-2 rounded-full transition-all flex items-center gap-1.5"
                  title="Simulate step transition"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  Simulate Step
                </button>
              </div>

              {/* Progress Stepper bar */}
              <div className="relative flex justify-between items-center">
                {/* Visual Line */}
                <div className="absolute top-5 left-10 right-10 h-1 bg-outline-variant/20 rounded-full z-0">
                  <div
                    className="h-full bg-primary-container rounded-full transition-all duration-700"
                    style={{
                      width:
                        currentOrder.status === 'Churning'
                          ? '10%'
                          : currentOrder.status === 'Delivery'
                          ? '55%'
                          : '100%',
                    }}
                  />
                </div>

                {/* Step 1: Churning */}
                <div className="flex flex-col items-center gap-2 relative z-10 w-24">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      currentOrder.status === 'Churning' ||
                      currentOrder.status === 'Delivery' ||
                      currentOrder.status === 'Arrived'
                        ? 'bg-primary-container text-white shadow-md'
                        : 'bg-surface-container-highest text-outline'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">kitchen</span>
                  </div>
                  <span
                    className={`font-sans text-xs text-center ${
                      currentOrder.status === 'Churning' ? 'font-bold text-primary' : 'text-outline'
                    }`}
                  >
                    Churning
                  </span>
                </div>

                {/* Step 2: Delivery */}
                <div className="flex flex-col items-center gap-2 relative z-10 w-24">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      currentOrder.status === 'Delivery' || currentOrder.status === 'Arrived'
                        ? 'bg-primary-container text-white shadow-md ring-4 ring-primary-container/20'
                        : 'bg-surface-container-highest text-outline'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">delivery_dining</span>
                  </div>
                  <span
                    className={`font-sans text-xs text-center ${
                      currentOrder.status === 'Delivery' ? 'font-bold text-primary' : 'text-outline'
                    }`}
                  >
                    Delivery
                  </span>
                </div>

                {/* Step 3: Arrived */}
                <div className="flex flex-col items-center gap-2 relative z-10 w-24">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      currentOrder.status === 'Arrived'
                        ? 'bg-primary-container text-white shadow-md'
                        : 'bg-surface-container-highest text-outline'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                  </div>
                  <span
                    className={`font-sans text-xs text-center ${
                      currentOrder.status === 'Arrived' ? 'font-bold text-primary' : 'text-outline'
                    }`}
                  >
                    Arrived
                  </span>
                </div>
              </div>

              {/* Delivery Details Card (Mateo S.) */}
              <div className="mt-6 pt-6 border-t border-outline-variant/30 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-secondary-fixed shadow-sm">
                    <img
                      className="w-full h-full object-cover"
                      src={currentOrder.riderAvatar}
                      alt={currentOrder.riderName}
                    />
                  </div>
                  <div>
                    <p className="font-sans font-extrabold text-on-surface text-base">
                      {currentOrder.riderName}
                    </p>
                    <p className="font-body text-xs text-on-surface-variant flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
                      {currentOrder.riderRating} • SnoMate Rider
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleCall}
                    className="w-11 h-11 rounded-full bg-primary-container/10 text-primary flex items-center justify-center hover:bg-primary-container hover:text-white transition-all shadow-sm"
                    title="Call Rider"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowChat(!showChat)}
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-sm ${
                      showChat
                        ? 'bg-primary-container text-white'
                        : 'bg-primary-container/10 text-primary hover:bg-primary-container hover:text-white'
                    }`}
                    title="Chat with Rider"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Instant Chat Simulator */}
              <AnimatePresence>
                {showChat && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 pt-4 border-t border-outline-variant/20 overflow-hidden"
                  >
                    <div className="bg-surface-container-low p-3 rounded-2xl max-h-[160px] overflow-y-auto space-y-2 mb-3 no-scrollbar text-xs">
                      {chatMessages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`p-2 rounded-xl max-w-[85%] ${
                            msg.startsWith('You:')
                              ? 'bg-primary-container text-white ml-auto'
                              : 'bg-white text-on-surface border border-outline-variant/20'
                          }`}
                        >
                          {msg}
                        </div>
                      ))}
                    </div>
                    <form onSubmit={handleSendChat} className="flex gap-2">
                      <input
                        type="text"
                        value={newMsg}
                        onChange={(e) => setNewMsg(e.target.value)}
                        className="flex-1 bg-surface-container-low px-3 py-2 rounded-xl text-xs border-none outline-none focus:ring-2 focus:ring-primary-container"
                        placeholder="Type reply to Mateo..."
                      />
                      <button
                        type="submit"
                        className="bg-primary-container text-white px-4 py-2 rounded-xl font-sans font-bold text-xs"
                      >
                        Send
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* Purchased Summary Details */}
          <section className="mt-6 px-4 mb-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-outline-variant/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-sans font-bold text-on-surface">Order #{currentOrder.id}</h3>
                <span
                  className={`font-sans text-xs font-semibold px-3 py-1 rounded-full ${
                    currentOrder.status === 'Arrived'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-secondary-fixed text-on-secondary-fixed-variant'
                  }`}
                >
                  {currentOrder.status === 'Arrived' ? 'Delivered' : currentOrder.status}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {currentOrder.items.map((cartItem) => (
                  <div key={cartItem.product.id} className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm">
                      <img
                        className="w-full h-full object-cover"
                        src={cartItem.product.image}
                        alt={cartItem.product.name}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-sans font-bold text-sm text-on-surface">
                        {cartItem.product.name} (x{cartItem.quantity})
                      </p>
                      <p className="font-body text-xs text-on-surface-variant">
                        {cartItem.product.tags ? cartItem.product.tags.join(' • ') : 'SnoMate Sweet Selection'}
                      </p>
                    </div>
                    <p className="font-sans font-black text-primary text-sm">
                      ${(cartItem.product.price * cartItem.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Total Summary Paid */}
              <div className="mt-5 pt-5 border-t border-outline-variant/30 flex justify-between items-center">
                <p className="font-sans text-sm text-on-surface-variant">Total Amount Paid</p>
                <p className="font-sans text-xl font-black text-primary">
                  ${currentOrder.totalAmount.toFixed(2)}
                </p>
              </div>

              {/* Cancel Button Option */}
              {currentOrder.status !== 'Arrived' && onCancelOrder && (
                <button
                  onClick={() => onCancelOrder(currentOrder.id)}
                  className="w-full mt-4 py-2 border border-error/30 text-error hover:bg-error/5 rounded-xl font-sans font-semibold text-xs transition-all"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </section>
        </div>
      ) : (
        <div className="py-24 text-center px-4 max-w-sm mx-auto">
          <span className="material-symbols-outlined text-5xl text-outline/40 mb-3">
            local_shipping
          </span>
          <p className="font-sans font-bold text-on-surface text-lg">No active orders</p>
          <p className="font-body text-xs text-on-surface-variant mt-1.5 mb-6">
            You don&apos;t have any active deliveries right now. Go grab some fresh scoops or sundaes from our menu!
          </p>
          <button
            onClick={() => onNavigateToTab('menu')}
            className="px-6 py-3 bg-primary-container text-white font-sans font-semibold text-sm rounded-full shadow-md"
          >
            Start Ordering
          </button>
        </div>
      )}
    </motion.div>
  );
}
