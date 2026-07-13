/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MenuItem } from '../types';
import { ShoppingCart, Check, Heart, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MenuViewProps {
  menuItems: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
  onToggleFavorite: (id: string) => void;
  searchQuery: string;
  onSearchQueryChange: (q: string) => void;
  key?: string;
}

export default function MenuView({
  menuItems,
  onAddToCart,
  onToggleFavorite,
  searchQuery,
  onSearchQueryChange,
}: MenuViewProps) {
  const [activeCategory, setActiveCategory] = useState<'scoops' | 'sundaes' | 'shakes' | 'seasonal'>('scoops');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  // Reset category if search query filters everything out
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // If there is an active search, let it show all matching regardless of category,
    // otherwise filter strictly by activeCategory
    if (searchQuery) return matchesSearch;
    return item.category === activeCategory;
  });

  const handleAddToCartLocal = (item: MenuItem) => {
    onAddToCart(item);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  const categories: { id: 'scoops' | 'sundaes' | 'shakes' | 'seasonal'; label: string }[] = [
    { id: 'scoops', label: 'Scoops' },
    { id: 'sundaes', label: 'Sundaes' },
    { id: 'shakes', label: 'Shakes' },
    { id: 'seasonal', label: 'Seasonal' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="pb-12"
    >
      {/* Header and Hero Text */}
      <div className="mb-6 px-4">
        <h2 className="font-sans text-3xl font-extrabold text-primary tracking-tight mb-1">
          Sweet Treats!
        </h2>
        <p className="font-body text-sm text-on-surface-variant">
          Find your frosty favorite today. Deliciousness in every cone.
        </p>

        {/* Local search input */}
        <div className="relative mt-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="w-full pl-12 pr-10 py-3 rounded-2xl border border-outline-variant/30 bg-surface-container-low focus:ring-2 focus:ring-primary-container focus:bg-white focus:border-transparent transition-all outline-none"
            placeholder="Search for flavors (e.g. vanilla, chocolate)..."
          />
          {searchQuery && (
            <button
              onClick={() => onSearchQueryChange('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary font-sans font-semibold text-xs"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Categories Tabs - Sticky bar */}
      {!searchQuery && (
        <div className="flex overflow-x-auto gap-4 mb-6 pb-1 sticky top-[64px] z-20 bg-background/95 backdrop-blur-md px-4 border-b border-outline-variant/10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`tab-btn font-sans font-bold text-sm whitespace-nowrap pb-3 transition-all relative ${
                activeCategory === cat.id
                  ? 'text-primary'
                  : 'text-on-surface-variant/60 hover:text-primary'
              }`}
            >
              {cat.label}
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-container"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {searchQuery && (
        <div className="px-4 mb-4 text-xs font-semibold text-on-surface-variant flex items-center gap-1">
          <span>Search results for &quot;{searchQuery}&quot;:</span>
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {filteredItems.length} found
          </span>
        </div>
      )}

      {/* Menu Bento Grid / Items List */}
      <div className="px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => {
            const isBestseller = item.isBestseller;
            const isAdded = addedItemIds[item.id];

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className={`group rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-outline-variant/10 bg-white ${
                  isBestseller ? 'sm:col-span-2' : ''
                }`}
              >
                {/* Visual Card Split for Bestseller */}
                <div className={`flex flex-col ${isBestseller ? 'sm:flex-row h-full' : 'h-full'}`}>
                  {/* Card Image */}
                  <div
                    className={`relative overflow-hidden ${
                      isBestseller ? 'w-full sm:w-1/2 h-48 sm:h-auto min-h-[180px]' : 'w-full h-48'
                    }`}
                  >
                    <img
                      className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-700"
                      src={item.image}
                      alt={item.name}
                    />
                    <button
                      onClick={() => onToggleFavorite(item.id)}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center text-primary shadow-md hover:scale-110 active:scale-95 transition-all z-10"
                    >
                      <Heart
                        className={`w-4 h-4 ${item.isFavorite ? 'fill-primary text-primary' : 'text-outline'}`}
                      />
                    </button>
                    {isBestseller && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary-container text-white font-sans font-bold text-xs px-3.5 py-1 rounded-full shadow-md flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          Bestseller
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Contents */}
                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h3 className="font-sans font-extrabold text-on-surface text-lg group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                        <span className="font-sans font-black text-primary text-lg whitespace-nowrap">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="font-body text-xs text-on-surface-variant leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {item.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                                idx % 2 === 0
                                  ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                                  : 'bg-secondary-fixed text-on-secondary-fixed-variant'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Add Button */}
                    <button
                      onClick={() => handleAddToCartLocal(item)}
                      className={`w-full py-3.5 rounded-full font-sans font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm ${
                        isAdded
                          ? 'bg-tertiary-container text-white'
                          : 'bg-primary-container text-white hover:brightness-105'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 animate-bounce" />
                          Added to Cart!
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <div className="col-span-full py-16 text-center">
            <span className="material-symbols-outlined text-4xl text-outline/40 mb-2">
              sentiment_dissatisfied
            </span>
            <p className="font-sans font-bold text-on-surface-variant">No frozen treats match your criteria.</p>
            <p className="font-body text-xs text-outline mt-1">Try clearing your filters or searching another flavor!</p>
            <button
              onClick={() => onSearchQueryChange('')}
              className="mt-4 px-5 py-2 bg-primary-container text-white font-sans font-semibold text-xs rounded-full"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
