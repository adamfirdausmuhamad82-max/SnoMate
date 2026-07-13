/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MenuItem } from '../types';
import {
  User,
  Award,
  Flame,
  Truck,
  Heart,
  ChevronRight,
  Database,
  Bell,
  CreditCard,
  LogOut,
  Camera,
  Edit,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProfileViewProps {
  menuItems: MenuItem[];
  onOpenAdminPanel: () => void;
  onNavigateToTab: (tab: string) => void;
  key?: string;
}

export default function ProfileView({
  menuItems,
  onOpenAdminPanel,
  onNavigateToTab,
}: ProfileViewProps) {
  const [profileName, setProfileName] = useState('Alex johnson');
  const [bio, setBio] = useState('Living for that frosty sprinkle joy.');
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(profileName);
  const [editBio, setEditBio] = useState(bio);

  const flavorProfileItems = menuItems.filter(
    (item) => item.isFavorite || item.id === 'M007' || item.id === 'M008'
  );

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileName(editName);
    setBio(editBio);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="pb-12 px-4"
    >
      {/* Profile Header Block */}
      <section className="py-6 flex flex-col items-center text-center relative">
        <div className="relative mb-4">
          <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-primary to-secondary-container shadow-lg">
            <img
              className="w-full h-full rounded-full object-cover border-4 border-white"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCou8nDbRkNQ3YlaLjr_srPXRGy2oYvM-VktQrjNJcRJp4WkvfdqG6kAWbIu-MSP1q1nN4jpjVYLr_X7-ZHeIzq37GmK219fl6aTr-0aCiWPZaO-9Aw5Hu6jk46yCdWi3duaUq3pHwt3sSnru0zdx8AaMNaLkfvYvCJSDK14wY1yrFElqVl0qAb0DQhjQRVK3rUNSQpjyt-HGy_xVg6PEfUWOQc4Cp2Y-4smVFCoSlU89rnXbZ0pQvfHtDKCqLOh3Da3C2CXRZiVTmP"
              alt="Alex Johnson Profile"
            />
          </div>
          <button
            onClick={() => {
              setEditName(profileName);
              setEditBio(bio);
              setIsEditing(true);
            }}
            className="absolute bottom-0 right-1 bg-primary text-white p-1.5 rounded-full shadow-md hover:scale-110 active:scale-95 transition-all"
            title="Edit Profile"
          >
            <Edit className="w-3.5 h-3.5" />
          </button>
        </div>

        <h2 className="font-sans text-2xl font-black text-on-surface mb-0.5">Hello, {profileName}!</h2>
        <p className="font-body text-xs italic text-on-surface-variant max-w-[240px] mb-4">
          &quot;{bio}&quot;
        </p>

        <div className="flex gap-2">
          <span className="px-3.5 py-1 rounded-full bg-secondary-container/15 text-on-secondary-container font-sans font-bold text-xs flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-secondary" />
            Vanilla Lover
          </span>
          <span className="px-3.5 py-1 rounded-full bg-tertiary-container/15 text-on-tertiary-container font-sans font-bold text-xs">
            Local Legend
          </span>
        </div>
      </section>

      {/* SnoPoints and Loyalty Stats Bento Grid */}
      <section className="grid grid-cols-4 gap-4 mb-6">
        {/* SnoPoints Card */}
        <div className="col-span-4 sm:col-span-2 bg-primary p-5 rounded-[2rem] text-white flex flex-col justify-between shadow-lg relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
          <div>
            <p className="font-sans text-[10px] uppercase tracking-widest text-white/80 font-bold mb-1">
              SnoPoints Loyalty
            </p>
            <p className="font-sans text-4xl font-black text-shadow-glow">2,450</p>
          </div>
          <div className="mt-4">
            <div className="w-full h-2 bg-white/25 rounded-full mb-2 overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: '75%' }}></div>
            </div>
            <p className="font-sans text-xs text-white/95">550 pts until next free scoop!</p>
          </div>
        </div>

        {/* Streaks Counter */}
        <div className="col-span-2 sm:col-span-1 bg-surface-container-low p-4 rounded-3xl border border-outline-variant/30 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-2">
            <Flame className="w-5 h-5 text-primary-container fill-primary-container" />
          </div>
          <p className="font-sans font-black text-xl text-on-surface">12</p>
          <p className="font-sans font-bold text-[10px] uppercase tracking-wider text-on-surface-variant">
            Streaks
          </p>
        </div>

        {/* Deliveries Counter */}
        <div className="col-span-2 sm:col-span-1 bg-surface-container-low p-4 rounded-3xl border border-outline-variant/30 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
            <Truck className="w-5 h-5 text-tertiary" />
          </div>
          <p className="font-sans font-black text-xl text-on-surface">48</p>
          <p className="font-sans font-bold text-[10px] uppercase tracking-wider text-on-surface-variant">
            Delivered
          </p>
        </div>
      </section>

      {/* Flavor Profile - Horizontal Scroll list */}
      <section className="mb-6">
        <div className="flex justify-between items-end mb-3">
          <div>
            <h3 className="font-sans text-lg font-extrabold text-on-surface">Your Flavor Profile</h3>
            <p className="font-body text-xs text-on-surface-variant">Based on your recent cravings</p>
          </div>
          <button
            onClick={() => onNavigateToTab('menu')}
            className="text-primary font-sans font-bold text-xs flex items-center hover:underline"
          >
            Customize <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>

        <div className="flex overflow-x-auto gap-4 no-scrollbar pb-2">
          {flavorProfileItems.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-44 bg-white p-3.5 rounded-3xl shadow-sm border border-outline-variant/20 flex flex-col justify-between"
            >
              <div className="w-full h-28 rounded-2xl overflow-hidden mb-2.5">
                <img className="w-full h-full object-cover" src={item.image} alt={item.name} />
              </div>
              <div>
                <p className="font-sans font-bold text-xs text-on-surface line-clamp-1">{item.name}</p>
                <p className="text-primary font-sans font-semibold text-[10px]">
                  {item.id === 'M007' ? 'Top Choice' : item.id === 'M001' ? 'Favorite' : 'Recommended'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Account & Administration Settings */}
      <section className="space-y-2 mb-6">
        <h3 className="font-sans text-sm font-extrabold text-on-surface-variant px-1 mb-1.5 uppercase tracking-wider">
          Account Settings
        </h3>

        {/* Database Entity Management - ADMIN CRUD portal */}
        <button
          onClick={onOpenAdminPanel}
          className="w-full flex items-center justify-between p-4 bg-primary/5 hover:bg-primary/10 text-primary border border-primary/20 rounded-2xl transition-all shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
              <Database className="w-4 h-4 text-primary" />
            </div>
            <div className="text-left">
              <span className="font-sans font-extrabold text-sm block">Master Entity CRUD Portal</span>
              <span className="text-[10px] font-semibold text-primary/80 block">
                Manage Customers, Sales, Payments, Staff, Products, Categories
              </span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-primary" />
        </button>

        {/* Notifications mock button */}
        <button
          onClick={() => alert("SnoMate Alerts: Notification preferences saved successfully!")}
          className="w-full flex items-center justify-between p-3.5 bg-surface-container-low rounded-2xl hover:bg-surface-container-high transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center">
              <Bell className="w-4 h-4 text-on-surface-variant" />
            </div>
            <span className="font-sans font-bold text-xs text-on-surface">Manage Notifications</span>
          </div>
          <ChevronRight className="w-4 h-4 text-outline" />
        </button>

        {/* Payment options mock button */}
        <button
          onClick={() => alert("SnoMate Wallets: Visa ending in *8824 is active for BOGO purchases.")}
          className="w-full flex items-center justify-between p-3.5 bg-surface-container-low rounded-2xl hover:bg-surface-container-high transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-on-surface-variant" />
            </div>
            <span className="font-sans font-bold text-xs text-on-surface">Payment Methods</span>
          </div>
          <ChevronRight className="w-4 h-4 text-outline" />
        </button>

        {/* Log out mock button */}
        <button
          onClick={() => alert("Alex, you have been securely logged out of your SnoMate account.")}
          className="w-full flex items-center justify-between p-3.5 bg-surface-container-low rounded-2xl hover:bg-error/5 text-error transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-error/10 flex items-center justify-center">
              <LogOut className="w-4 h-4 text-error" />
            </div>
            <span className="font-sans font-bold text-xs text-error">Log Out</span>
          </div>
        </button>
      </section>

      {/* Edit Profile Dialog Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl p-6 border border-outline-variant/20"
            >
              <h3 className="font-sans text-xl font-bold text-on-surface mb-4">Edit Profile</h3>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                    className="w-full bg-surface-container-low px-4 py-3 rounded-xl text-xs border border-outline-variant/35 focus:ring-2 focus:ring-primary-container focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">
                    Catchy bio
                  </label>
                  <textarea
                    rows={2}
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    required
                    className="w-full bg-surface-container-low px-4 py-3 rounded-xl text-xs border border-outline-variant/35 focus:ring-2 focus:ring-primary-container focus:bg-white outline-none resize-none"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant py-2.5 rounded-xl text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary-container text-white py-2.5 rounded-xl text-xs font-bold shadow-md hover:brightness-105"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
