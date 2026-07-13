/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MenuItem } from '../types';
import { Heart, ShoppingCart, Check, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FavoritesViewProps {
  menuItems: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
  onToggleFavorite: (id: string) => void;
  onNavigateToTab: (tab: string) => void;
  key?: string;
}

export default function FavoritesView({
  menuItems,
  onAddToCart,
  onToggleFavorite,
  onNavigateToTab,
}: FavoritesViewProps) {
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const favoritedItems = menuItems.filter((item) => item.isFavorite);

  const handleAddToCartLocal = (item: MenuItem) => {
    onAddToCart(item);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="pb-12 px-4"
    >
      <div className="mb-6">
        <h2 className="font-sans text-3xl font-extrabold text-primary tracking-tight mb-1 flex items-center gap-2">
          Your Favorites
        </h2>
        <p className="font-body text-sm text-on-surface-variant">
          Your handpicked frosty collection. Keep your cravings close!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {favoritedItems.map((item) => {
            const isAdded = addedItemIds[item.id];
            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden frosty-glow border border-outline-variant/10 flex flex-col justify-between"
              >
                <div className="h-44 w-full relative group overflow-hidden">
                  <img
                    className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-500"
                    src={item.image}
                    alt={item.name}
                  />
                  <button
                    onClick={() => onToggleFavorite(item.id)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center text-primary shadow-md hover:scale-110 active:scale-95 transition-all z-10"
                  >
                    <Heart className="w-4 h-4 fill-primary text-primary" />
                  </button>
                  {item.isBestseller && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary-container text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                        Bestseller
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-1 mb-1.5">
                      <h4 className="font-sans font-bold text-on-surface text-base line-clamp-1">
                        {item.name}
                      </h4>
                      <span className="text-primary font-black text-sm">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="font-body text-xs text-on-surface-variant line-clamp-2 mb-4">
                      {item.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleAddToCartLocal(item)}
                    className={`w-full py-2.5 rounded-xl font-sans font-semibold text-xs flex items-center justify-center gap-1.5 transition-all ${
                      isAdded
                        ? 'bg-tertiary-container text-white shadow-sm'
                        : 'bg-surface-container-high hover:bg-primary-container hover:text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 animate-bounce" />
                        Added!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {favoritedItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-16 text-center max-w-sm mx-auto"
        >
          <span className="material-symbols-outlined text-5xl text-outline/40 mb-3">
            favorite
          </span>
          <p className="font-sans font-bold text-on-surface text-lg">Your favorites tab is cold!</p>
          <p className="font-body text-xs text-on-surface-variant mt-1.5 mb-6">
            Explore our rich sundaes, premium scoops, or cooling sorbets and tap the heart icon to save them here.
          </p>
          <button
            onClick={() => onNavigateToTab('menu')}
            className="px-6 py-3 bg-primary-container text-white font-sans font-semibold text-sm rounded-full shadow-md"
          >
            Browse Menu
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
