/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MenuItem } from '../types';
import { Heart, ShoppingBag, MapPin, ChevronRight, Star, ShoppingCart, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeViewProps {
  menuItems: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
  onToggleFavorite: (id: string) => void;
  onNavigateToTab: (tab: string) => void;
  onSearch: (query: string) => void;
  key?: string;
}

export default function HomeView({
  menuItems,
  onAddToCart,
  onToggleFavorite,
  onNavigateToTab,
  onSearch,
}: HomeViewProps) {
  const [selectedChip, setSelectedChip] = useState('All Flavors');
  const [searchVal, setSearchVal] = useState('');

  const chips = ['All Flavors', 'Dairy-Free', 'Low Sugar', 'Seasonal', 'Bundles'];

  // Filter items based on chip and search
  const featuredTreats = menuItems.filter(item => {
    // Only premium or bestseller for featured, or favorites
    const matchesFeature = item.isBestseller || item.isFavorite || item.price > 5.0;
    
    let matchesChip = true;
    if (selectedChip === 'Dairy-Free') {
      matchesChip = item.description.toLowerCase().includes('sorbet') || item.tags?.includes('Dairy-Free') || false;
    } else if (selectedChip === 'Low Sugar') {
      matchesChip = item.tags?.includes('Low Sugar') || false;
    } else if (selectedChip === 'Seasonal') {
      matchesChip = item.category === 'seasonal';
    } else if (selectedChip === 'Bundles') {
      matchesChip = item.price > 10.0;
    }

    return matchesFeature && matchesChip;
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchVal);
    onNavigateToTab('menu');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="pb-12"
    >
      {/* Hero Welcome Header */}
      <section className="relative overflow-hidden pt-6 px-4 text-center">
        <div className="relative z-10 flex flex-col items-center">
          {/* Animated bouncy logo container */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-28 h-28 mb-3 cursor-pointer drop-shadow-xl"
            onClick={() => onNavigateToTab('menu')}
          >
            <img
              alt="SnoMate Branding"
              className="w-full h-full object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFfrBfQ-nhDH6N8jY1rqEcEfdK2Vuue_3hI_QCqPCmTJcUW499wsV70oHiSMsQUmfYZ4wbPiXARipbhiAJ8srQ1Ya2RNRP65E_X4QJcGCJfxdxf-OvMZkf3_JBc1Po_QIaHMypPyboMS7us13UifBVEKrx2PUE0OJ5kfoClAyudRolpafbPakxJ_moOMj2htB95bpECDTZXziYtmuSU6mX6sxYBjZ8zonCo6Hy8zt3wRkfwXbbvv_HUcu2UUGq6ItvFqsTctUn4aOw"
            />
          </motion.div>

          <h2 className="font-sans text-4xl font-extrabold tracking-tight text-on-surface leading-tight mb-2">
            Stay Chilled, <br />
            <span className="text-primary-container font-black">Stay Sweet.</span>
          </h2>
          <p className="font-body text-base text-on-surface-variant max-w-[280px] mb-6">
            The most delightful frosty treats delivered to your doorstep.
          </p>

          <div className="flex gap-4 w-full max-w-sm">
            <button
              onClick={() => onNavigateToTab('menu')}
              className="flex-1 bg-primary-container text-white font-sans font-semibold py-3.5 px-6 rounded-full frosty-glow hover:brightness-105 active:scale-95 transition-all shadow-lg"
              id="home-order-btn"
            >
              Order Now
            </button>
            <button
              onClick={() => alert("SnoMate Ice Cream Spotting: Our nearest Sweet Truck is just 0.4 miles away near Maplewood Avenue!")}
              className="flex-1 bg-white border-2 border-primary-container/30 text-primary font-sans font-semibold py-3.5 px-6 rounded-full hover:bg-primary-container/5 active:scale-95 transition-all shadow-sm"
              id="home-store-btn"
            >
              Find a Store
            </button>
          </div>
        </div>

        {/* Backdrop visual elements */}
        <div className="absolute -top-16 -right-16 w-52 h-52 bg-primary-container/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-28 -left-16 w-40 h-40 bg-tertiary-container/10 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* Dynamic Quick Search Section */}
      <section className="px-4 mt-8">
        <form onSubmit={handleSearchSubmit} className="relative group max-w-md mx-auto">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
            search
          </span>
          <input
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full pl-12 pr-12 py-3 rounded-2xl border border-outline-variant/30 bg-surface-container-low focus:ring-2 focus:ring-primary-container focus:bg-white focus:border-transparent transition-all outline-none text-on-background placeholder:text-outline/70"
            placeholder="Search for frozen flavors..."
          />
          {searchVal && (
            <button
              type="button"
              onClick={() => setSearchVal('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          )}
        </form>
      </section>

      {/* Featured Treats Carousel */}
      <section className="mt-8">
        <div className="px-4 flex justify-between items-end mb-3">
          <div>
            <h3 className="font-sans text-xl font-bold text-on-surface flex items-center gap-1.5">
              <Sparkles className="w-5 h-5 text-secondary-container" />
              Featured Treats
            </h3>
          </div>
          <button
            onClick={() => {
              onSearch('');
              onNavigateToTab('menu');
            }}
            className="text-primary font-sans font-semibold text-sm hover:underline flex items-center"
          >
            View All
          </button>
        </div>

        <div className="flex overflow-x-auto gap-4 px-4 pb-4 no-scrollbar snap-x">
          {featuredTreats.length > 0 ? (
            featuredTreats.map((item) => (
              <div
                key={item.id}
                className="snap-start min-w-[240px] max-w-[240px] bg-white rounded-3xl overflow-hidden frosty-glow border border-outline-variant/10 flex flex-col justify-between"
              >
                <div className="h-40 w-full relative overflow-hidden group">
                  <img
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    src={item.image}
                    alt={item.name}
                  />
                  <button
                    onClick={() => onToggleFavorite(item.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center text-primary hover:scale-115 active:scale-90 transition-all shadow-md z-10"
                  >
                    <Heart
                      className={`w-4 h-4 ${item.isFavorite ? 'fill-primary text-primary' : 'text-outline'}`}
                    />
                  </button>
                  {item.isBestseller && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-primary-container text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                        Bestseller
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-1 mb-1">
                      <h4 className="font-sans font-bold text-on-surface text-base line-clamp-1">
                        {item.name}
                      </h4>
                      <span className="text-primary font-extrabold text-sm whitespace-nowrap">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="font-body text-xs text-on-surface-variant line-clamp-2 mb-4 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <button
                    onClick={() => onAddToCart(item)}
                    className="w-full bg-surface-container-high hover:bg-primary-container hover:text-white transition-all py-2 rounded-xl font-sans font-semibold text-xs flex items-center justify-center gap-1.5"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full py-8 text-center text-on-surface-variant/70 text-sm italic">
              No matching treats featured right now. Try a different browsing filter!
            </div>
          )}
        </div>
      </section>

      {/* Quick Browse Chips */}
      <section className="mt-6 px-4">
        <h3 className="font-sans text-lg font-bold text-on-surface mb-3">Quick Browse</h3>
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <button
              key={chip}
              onClick={() => setSelectedChip(chip)}
              className={`px-4 py-2 rounded-full font-sans font-semibold text-xs transition-all active:scale-95 ${
                selectedChip === chip
                  ? 'bg-primary-container text-white shadow-md shadow-primary-container/20'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </section>

      {/* Special Promo Banner */}
      <section className="mt-8 px-4">
        <div className="relative w-full h-40 rounded-3xl overflow-hidden bg-primary-container flex items-center p-5 shadow-lg">
          <div className="relative z-10 w-2/3">
            <h3 className="font-sans text-xl font-extrabold text-white leading-tight mb-1.5">
              Buy One, Get One <span className="underline decoration-wavy decoration-orange-300 font-black">FREE</span>
            </h3>
            <p className="font-body text-xs text-white/90 leading-relaxed">
              On all Fruit Sorbets this weekend only! Refresh yourself with real mango or berry.
            </p>
            <button
              onClick={() => {
                onSearch('Sorbet');
                onNavigateToTab('menu');
              }}
              className="mt-3 bg-white text-primary-container text-[11px] font-bold px-3 py-1.5 rounded-full hover:shadow-md transition-all"
            >
              Claim Promo
            </button>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 flex justify-end">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBKbvwLvmaZDbWQu7Sw7yfImrrcsliWAVlZChbYV-MUMrRai-9J_sSujwy2E61mNuOEQhDpBYHQQ7C-pSMoeFUoY9Dv7ghkNDwzPHLQZDeZFJ4xqwJlVS2ArUs1uFfGrXjD5lHD_tphxeSqxNZC8hbt5pi_U0vwhPW_3FmKXRCt3J3cSH-QClXcJ9tTDWLIYzSGcM_fYldoroWuFCI6AV9Q-YJIWXKMhsHNIbxHWamnb1urVznTz5CjhnAwY004H5_3uW9HDwN1TmaO')`,
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/45 to-transparent"></div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
