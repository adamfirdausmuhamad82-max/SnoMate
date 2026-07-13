/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  DBCustomer,
  DBSales,
  DBPaymentMethod,
  DBStaff,
  DBProduct,
  DBCategory,
} from '../types';
import {
  Users,
  LineChart,
  CreditCard,
  UserCheck,
  Tag,
  FolderTree,
  Search,
  Plus,
  Trash2,
  Edit2,
  X,
  AlertCircle,
  Database,
  ArrowLeft,
  RefreshCw,
  CheckCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminCRUDViewProps {
  customers: DBCustomer[];
  sales: DBSales[];
  paymentMethods: DBPaymentMethod[];
  staff: DBStaff[];
  products: DBProduct[];
  categories: DBCategory[];

  // Update callbacks
  setCustomers: React.Dispatch<React.SetStateAction<DBCustomer[]>>;
  setSales: React.Dispatch<React.SetStateAction<DBSales[]>>;
  setPaymentMethods: React.Dispatch<React.SetStateAction<DBPaymentMethod[]>>;
  setStaff: React.Dispatch<React.SetStateAction<DBStaff[]>>;
  setProducts: React.Dispatch<React.SetStateAction<DBProduct[]>>;
  setCategories: React.Dispatch<React.SetStateAction<DBCategory[]>>;

  onClose: () => void;
}

type EntityType = 'customers' | 'sales' | 'paymentMethods' | 'staff' | 'products' | 'categories';

export default function AdminCRUDView({
  customers,
  sales,
  paymentMethods,
  staff,
  products,
  categories,
  setCustomers,
  setSales,
  setPaymentMethods,
  setStaff,
  setProducts,
  setCategories,
  onClose,
}: AdminCRUDViewProps) {
  const [activeEntity, setActiveEntity] = useState<EntityType>('customers');
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Status Alerts
  const [successAlert, setSuccessAlert] = useState<string | null>(null);

  // Customer Form fields
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerDob, setCustomerDob] = useState('');
  const [customerGender, setCustomerGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [customerAddress, setCustomerAddress] = useState('');

  // Sales Form fields
  const [salesType, setSalesType] = useState<'POS' | 'Delivery' | 'In-store pickup'>('POS');
  const [loyaltyProgram, setLoyaltyProgram] = useState<'SnoPoints' | 'BOGO Promos' | 'None'>('SnoPoints');
  const [saleDate, setSaleDate] = useState('2026-07-13');
  const [saleCustomerId, setSaleCustomerId] = useState('');
  const [salePaymentId, setSalePaymentId] = useState('');
  const [saleTotal, setSaleTotal] = useState('');
  const [saleStaffId, setSaleStaffId] = useState('');

  // Payment Method fields
  const [pmName, setPmName] = useState('');
  const [pmProvider, setPmProvider] = useState('');
  const [pmStatus, setPmStatus] = useState<'Active' | 'Inactive'>('Active');

  // Staff Form fields
  const [stfName, setStfName] = useState('');
  const [stfRole, setStfRole] = useState<'Store Manager' | 'Scooper' | 'Rider' | 'Cashier'>('Scooper');
  const [stfEmail, setStfEmail] = useState('');
  const [stfPhone, setStfPhone] = useState('');
  const [stfHours, setStfHours] = useState('09:00 - 17:00');
  const [stfShifts, setStfShifts] = useState('5');

  // Product Form fields
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodAvailable, setProdAvailable] = useState(true);
  const [prodCatId, setProdCatId] = useState('');
  const [prodPromoId, setProdPromoId] = useState('None');

  // Category Form fields
  const [catName, setCatName] = useState('');
  const [catStatus, setCatStatus] = useState<'Active' | 'Inactive'>('Active');

  const triggerAlert = (message: string) => {
    setSuccessAlert(message);
    setTimeout(() => {
      setSuccessAlert(null);
    }, 4500);
  };

  const handleClearForm = () => {
    // Reset all fields
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setCustomerDob('');
    setCustomerGender('Male');
    setCustomerAddress('');

    setSaleCustomerId('');
    setSalePaymentId('');
    setSaleTotal('');
    setSaleStaffId('');

    setPmName('');
    setPmProvider('');
    setPmStatus('Active');

    setStfName('');
    setStfEmail('');
    setStfPhone('');
    setStfHours('09:00 - 17:00');
    setStfShifts('5');

    setProdName('');
    setProdPrice('');
    setProdAvailable(true);
    setProdCatId('');

    setCatName('');
    setCatStatus('Active');

    setEditingId(null);
  };

  const handleEditClick = (id: string) => {
    setEditingId(id);
    setShowForm(true);

    if (activeEntity === 'customers') {
      const entry = customers.find((c) => c.id === id);
      if (entry) {
        setCustomerName(entry.customerName);
        setCustomerEmail(entry.email);
        setCustomerPhone(entry.phoneNumber);
        setCustomerDob(entry.dateOfBirth);
        setCustomerGender(entry.gender);
        setCustomerAddress(entry.address);
      }
    } else if (activeEntity === 'sales') {
      const entry = sales.find((s) => s.id === id);
      if (entry) {
        setSalesType(entry.salesType);
        setLoyaltyProgram(entry.loyaltyProgram);
        setSaleDate(entry.dateOfSale);
        setSaleCustomerId(entry.customerId);
        setSalePaymentId(entry.paymentMethodId);
        setSaleTotal(entry.totalAmount.toString());
        setSaleStaffId(entry.staffId);
      }
    } else if (activeEntity === 'paymentMethods') {
      const entry = paymentMethods.find((p) => p.id === id);
      if (entry) {
        setPmName(entry.paymentMethodName);
        setPmProvider(entry.provider);
        setPmStatus(entry.status);
      }
    } else if (activeEntity === 'staff') {
      const entry = staff.find((s) => s.id === id);
      if (entry) {
        setStfName(entry.staffName);
        setStfRole(entry.role);
        setStfEmail(entry.staffEmail);
        setStfPhone(entry.phoneNumber);
        setStfHours(entry.workingHours);
        setStfShifts(entry.shiftsLeft.toString());
      }
    } else if (activeEntity === 'products') {
      const entry = products.find((p) => p.id === id);
      if (entry) {
        setProdName(entry.productName);
        setProdPrice(entry.price.toString());
        setProdAvailable(entry.isAvailable);
        setProdCatId(entry.categoryId);
        setProdPromoId(entry.paymentPromotionId);
      }
    } else if (activeEntity === 'categories') {
      const entry = categories.find((c) => c.id === id);
      if (entry) {
        setCatName(entry.categoryName);
        setCatStatus(entry.status);
      }
    }
  };

  const handleDelete = (id: string) => {
    if (activeEntity === 'customers') {
      setCustomers((prev) => prev.filter((x) => x.id !== id));
      triggerAlert(`Customer ID "${id}" has been successfully deleted.`);
    } else if (activeEntity === 'sales') {
      setSales((prev) => prev.filter((x) => x.id !== id));
      triggerAlert(`Sales Record ID "${id}" has been successfully deleted.`);
    } else if (activeEntity === 'paymentMethods') {
      setPaymentMethods((prev) => prev.filter((x) => x.id !== id));
      triggerAlert(`Payment Method ID "${id}" has been successfully deleted.`);
    } else if (activeEntity === 'staff') {
      setStaff((prev) => prev.filter((x) => x.id !== id));
      triggerAlert(`Staff ID "${id}" has been successfully deleted.`);
    } else if (activeEntity === 'products') {
      setProducts((prev) => prev.filter((x) => x.id !== id));
      triggerAlert(`Product ID "${id}" has been successfully deleted.`);
    } else if (activeEntity === 'categories') {
      setCategories((prev) => prev.filter((x) => x.id !== id));
      triggerAlert(`Category ID "${id}" has been successfully deleted.`);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeEntity === 'customers') {
      if (editingId) {
        setCustomers((prev) =>
          prev.map((x) =>
            x.id === editingId
              ? {
                  ...x,
                  customerName,
                  email: customerEmail,
                  phoneNumber: customerPhone,
                  dateOfBirth: customerDob,
                  gender: customerGender,
                  address: customerAddress,
                }
              : x
          )
        );
        triggerAlert(`Customer "${customerName}" was updated successfully.`);
      } else {
        const newId = `CUST-${Math.floor(1000 + Math.random() * 9000)}`;
        setCustomers((prev) => [
          ...prev,
          {
            id: newId,
            customerName,
            email: customerEmail,
            phoneNumber: customerPhone,
            dateOfBirth: customerDob,
            gender: customerGender,
            address: customerAddress,
          },
        ]);
        triggerAlert(`Customer "${customerName}" was successfully added as ID "${newId}".`);
      }
    } else if (activeEntity === 'sales') {
      const amount = parseFloat(saleTotal) || 0;
      if (editingId) {
        setSales((prev) =>
          prev.map((x) =>
            x.id === editingId
              ? {
                  ...x,
                  salesType,
                  loyaltyProgram,
                  dateOfSale: saleDate,
                  customerId: saleCustomerId || 'CUST-1001',
                  paymentMethodId: salePaymentId || 'PAY-001',
                  totalAmount: amount,
                  staffId: saleStaffId || 'STF-3001',
                }
              : x
          )
        );
        triggerAlert(`Sales invoice "${editingId}" updated.`);
      } else {
        const newId = `SALE-${Math.floor(5000 + Math.random() * 9000)}`;
        setSales((prev) => [
          ...prev,
          {
            id: newId,
            salesType,
            loyaltyProgram,
            dateOfSale: saleDate,
            customerId: saleCustomerId || 'CUST-1001',
            paymentMethodId: salePaymentId || 'PAY-001',
            totalAmount: amount,
            staffId: saleStaffId || 'STF-3001',
          },
        ]);
        triggerAlert(`Sale record registered as ID "${newId}".`);
      }
    } else if (activeEntity === 'paymentMethods') {
      if (editingId) {
        setPaymentMethods((prev) =>
          prev.map((x) =>
            x.id === editingId
              ? { ...x, paymentMethodName: pmName, provider: pmProvider, status: pmStatus }
              : x
          )
        );
        triggerAlert(`Payment Method "${pmName}" updated.`);
      } else {
        const newId = `PAY-${Math.floor(100 + Math.random() * 900)}`;
        setPaymentMethods((prev) => [
          ...prev,
          { id: newId, paymentMethodName: pmName, provider: pmProvider, status: pmStatus },
        ]);
        triggerAlert(`Method "${pmName}" created as ID "${newId}".`);
      }
    } else if (activeEntity === 'staff') {
      const shiftsVal = parseInt(stfShifts) || 0;
      if (editingId) {
        setStaff((prev) =>
          prev.map((x) =>
            x.id === editingId
              ? {
                  ...x,
                  staffName: stfName,
                  role: stfRole,
                  staffEmail: stfEmail,
                  phoneNumber: stfPhone,
                  workingHours: stfHours,
                  shiftsLeft: shiftsVal,
                }
              : x
          )
        );
        triggerAlert(`Staff roster for "${stfName}" updated.`);
      } else {
        const newId = `STF-${Math.floor(3000 + Math.random() * 9000)}`;
        setStaff((prev) => [
          ...prev,
          {
            id: newId,
            staffName: stfName,
            role: stfRole,
            staffEmail: stfEmail,
            phoneNumber: stfPhone,
            workingHours: stfHours,
            shiftsLeft: shiftsVal,
          },
        ]);
        triggerAlert(`Staff "${stfName}" registered successfully.`);
      }
    } else if (activeEntity === 'products') {
      const priceVal = parseFloat(prodPrice) || 0;
      if (editingId) {
        setProducts((prev) =>
          prev.map((x) =>
            x.id === editingId
              ? {
                  ...x,
                  productName: prodName,
                  price: priceVal,
                  isAvailable: prodAvailable,
                  categoryId: prodCatId || 'CAT-2001',
                  paymentPromotionId: prodPromoId,
                }
              : x
          )
        );
        triggerAlert(`Database product "${prodName}" updated.`);
      } else {
        const newId = `PROD-${Math.floor(4000 + Math.random() * 9000)}`;
        setProducts((prev) => [
          ...prev,
          {
            id: newId,
            productName: prodName,
            price: priceVal,
            isAvailable: prodAvailable,
            categoryId: prodCatId || 'CAT-2001',
            paymentPromotionId: prodPromoId,
          },
        ]);
        triggerAlert(`Product "${prodName}" created as ID "${newId}".`);
      }
    } else if (activeEntity === 'categories') {
      if (editingId) {
        setCategories((prev) =>
          prev.map((x) =>
            x.id === editingId ? { ...x, categoryName: catName, status: catStatus } : x
          )
        );
        triggerAlert(`Category "${catName}" updated.`);
      } else {
        const newId = `CAT-${Math.floor(2000 + Math.random() * 9000)}`;
        setCategories((prev) => [
          ...prev,
          { id: newId, categoryName: catName, status: catStatus },
        ]);
        triggerAlert(`Category "${catName}" added as ID "${newId}".`);
      }
    }

    handleClearForm();
    setShowForm(false);
  };

  // Filter lists based on Search input
  const filteredCustomers = customers.filter(
    (c) =>
      c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSales = sales.filter(
    (s) =>
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.salesType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.customerId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPaymentMethods = paymentMethods.filter(
    (p) =>
      p.paymentMethodName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStaff = staff.filter(
    (s) =>
      s.staffName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProducts = products.filter(
    (p) =>
      p.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCategories = categories.filter(
    (c) =>
      c.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-slate-550 flex flex-col md:flex-row text-slate-800"
    >
      {/* Sidebar navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-100 flex flex-col justify-between p-4 md:sticky md:top-0 md:h-screen">
        <div>
          {/* Back button */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-primary-fixed-dim hover:text-white transition-colors text-xs font-sans font-bold mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to App
          </button>

          <div className="flex items-center gap-2 mb-6">
            <Database className="w-6 h-6 text-primary-container" />
            <h1 className="font-sans font-black text-lg tracking-tight text-white">SnoMate ERP</h1>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => {
                setActiveEntity('customers');
                setSearchQuery('');
                setShowForm(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-sans text-xs font-bold transition-all ${
                activeEntity === 'customers' ? 'bg-primary-container text-white' : 'hover:bg-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              Entity Customer
            </button>

            <button
              onClick={() => {
                setActiveEntity('sales');
                setSearchQuery('');
                setShowForm(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-sans text-xs font-bold transition-all ${
                activeEntity === 'sales' ? 'bg-primary-container text-white' : 'hover:bg-slate-800'
              }`}
            >
              <LineChart className="w-4 h-4" />
              Entity Sales
            </button>

            <button
              onClick={() => {
                setActiveEntity('paymentMethods');
                setSearchQuery('');
                setShowForm(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-sans text-xs font-bold transition-all ${
                activeEntity === 'paymentMethods' ? 'bg-primary-container text-white' : 'hover:bg-slate-800'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              Entity Payment Method
            </button>

            <button
              onClick={() => {
                setActiveEntity('staff');
                setSearchQuery('');
                setShowForm(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-sans text-xs font-bold transition-all ${
                activeEntity === 'staff' ? 'bg-primary-container text-white' : 'hover:bg-slate-800'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              Entity Staff
            </button>

            <button
              onClick={() => {
                setActiveEntity('products');
                setSearchQuery('');
                setShowForm(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-sans text-xs font-bold transition-all ${
                activeEntity === 'products' ? 'bg-primary-container text-white' : 'hover:bg-slate-800'
              }`}
            >
              <Tag className="w-4 h-4" />
              Entity Product
            </button>

            <button
              onClick={() => {
                setActiveEntity('categories');
                setSearchQuery('');
                setShowForm(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-sans text-xs font-bold transition-all ${
                activeEntity === 'categories' ? 'bg-primary-container text-white' : 'hover:bg-slate-800'
              }`}
            >
              <FolderTree className="w-4 h-4" />
              Entity Category
            </button>
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800 text-center">
          <p className="text-[10px] text-slate-500 font-mono">DB INGRESS: ONLINE</p>
          <p className="text-[10px] text-slate-500 font-mono">PORT 3000</p>
        </div>
      </aside>

      {/* Main panel workspace */}
      <main className="flex-1 bg-slate-50 p-6 overflow-y-auto h-screen relative">
        {/* Dynamic Alert notification box matching green designs */}
        <AnimatePresence>
          {successAlert && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-lg border border-emerald-500 flex items-center justify-between gap-3 text-xs font-sans font-bold mb-4"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>{successAlert}</span>
              </div>
              <button onClick={() => setSuccessAlert(null)}>
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Title & Actions Bar */}
        <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="font-sans text-2xl font-black text-slate-900 uppercase">
              {activeEntity.replace(/([A-Z])/g, ' $1')}
            </h2>
            <p className="text-xs text-slate-500">Live memory database CRUD engine</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                handleClearForm();
                setShowForm(!showForm);
              }}
              className="bg-primary-container text-white hover:brightness-105 active:scale-95 text-xs font-sans font-extrabold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition-all"
            >
              {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {showForm ? 'Close Form' : 'Add+'}
            </button>
          </div>
        </section>

        {/* Search entry bar */}
        <section className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 pl-10 pr-4 py-2.5 rounded-xl text-xs border-none outline-none focus:ring-2 focus:ring-primary-container focus:bg-white text-slate-800"
              placeholder={`Search ${activeEntity}...`}
            />
          </div>
          <p className="text-xs font-semibold text-slate-500">
            Total Records: {
              activeEntity === 'customers' ? customers.length :
              activeEntity === 'sales' ? sales.length :
              activeEntity === 'paymentMethods' ? paymentMethods.length :
              activeEntity === 'staff' ? staff.length :
              activeEntity === 'products' ? products.length :
              categories.length
            }
          </p>
        </section>

        {/* Sliding Collapsible Form matched to Figma specifications */}
        <AnimatePresence>
          {showForm && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white border border-slate-200 p-6 rounded-3xl shadow-md mb-6 overflow-hidden"
            >
              <h3 className="font-sans text-sm font-black text-slate-900 uppercase tracking-widest mb-4">
                {editingId ? `Edit ${editingId}` : `Create New ${activeEntity.substring(0, activeEntity.length - 1)}`}
              </h3>

              <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. CUSTOMERS FIELDS */}
                {activeEntity === 'customers' && (
                  <>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Customer Name
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={customerDob}
                        onChange={(e) => setCustomerDob(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Gender
                      </label>
                      <select
                        value={customerGender}
                        onChange={(e) => setCustomerGender(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Residential Address
                      </label>
                      <input
                        type="text"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                      />
                    </div>
                  </>
                )}

                {/* 2. SALES FIELDS */}
                {activeEntity === 'sales' && (
                  <>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Sales Type
                      </label>
                      <select
                        value={salesType}
                        onChange={(e) => setSalesType(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                      >
                        <option value="POS">POS Terminal</option>
                        <option value="Delivery">Rider Delivery</option>
                        <option value="In-store pickup">Pickup Counter</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Loyalty Program
                      </label>
                      <select
                        value={loyaltyProgram}
                        onChange={(e) => setLoyaltyProgram(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                      >
                        <option value="SnoPoints">SnoPoints Club</option>
                        <option value="BOGO Promos">BOGO Promos</option>
                        <option value="None">No Loyalty Program</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Date of Sale
                      </label>
                      <input
                        type="date"
                        value={saleDate}
                        onChange={(e) => setSaleDate(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Customer Account Link
                      </label>
                      <select
                        value={saleCustomerId}
                        onChange={(e) => setSaleCustomerId(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                      >
                        <option value="">-- Choose Customer --</option>
                        {customers.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.customerName} ({c.id})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Payment Method Link
                      </label>
                      <select
                        value={salePaymentId}
                        onChange={(e) => setSalePaymentId(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                      >
                        <option value="">-- Choose Payment --</option>
                        {paymentMethods.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.paymentMethodName} ({p.id})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Total Amount Paid
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={saleTotal}
                        onChange={(e) => setSaleTotal(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Staff Representative Link
                      </label>
                      <select
                        value={saleStaffId}
                        onChange={(e) => setSaleStaffId(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                      >
                        <option value="">-- Choose Representative --</option>
                        {staff.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.staffName} ({s.role})
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {/* 3. PAYMENT METHODS FIELDS */}
                {activeEntity === 'paymentMethods' && (
                  <>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Method Name
                      </label>
                      <input
                        type="text"
                        value={pmName}
                        onChange={(e) => setPmName(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                        placeholder="e.g. Visa Card Credit"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Financial Provider
                      </label>
                      <input
                        type="text"
                        value={pmProvider}
                        onChange={(e) => setPmProvider(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                        placeholder="e.g. Chase Bank, Stripe"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Status
                      </label>
                      <select
                        value={pmStatus}
                        onChange={(e) => setPmStatus(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </>
                )}

                {/* 4. STAFF FIELDS */}
                {activeEntity === 'staff' && (
                  <>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Staff Member Name
                      </label>
                      <input
                        type="text"
                        value={stfName}
                        onChange={(e) => setStfName(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Role Position
                      </label>
                      <select
                        value={stfRole}
                        onChange={(e) => setStfRole(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                      >
                        <option value="Store Manager">Store Manager</option>
                        <option value="Scooper">Professional Scooper</option>
                        <option value="Rider">SnoMate Delivery Rider</option>
                        <option value="Cashier">Checkout Cashier</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Staff Business Email
                      </label>
                      <input
                        type="email"
                        value={stfEmail}
                        onChange={(e) => setStfEmail(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={stfPhone}
                        onChange={(e) => setStfPhone(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Working Shift Hours
                      </label>
                      <input
                        type="text"
                        value={stfHours}
                        onChange={(e) => setStfHours(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Shifts Assigned Left
                      </label>
                      <input
                        type="number"
                        value={stfShifts}
                        onChange={(e) => setStfShifts(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                      />
                    </div>
                  </>
                )}

                {/* 5. PRODUCTS FIELDS */}
                {activeEntity === 'products' && (
                  <>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Product Name
                      </label>
                      <input
                        type="text"
                        value={prodName}
                        onChange={(e) => setProdName(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                        placeholder="Double Scoop Cloud Cone"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Base Price ($)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={prodPrice}
                        onChange={(e) => setProdPrice(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Is Available
                      </label>
                      <select
                        value={prodAvailable ? 'true' : 'false'}
                        onChange={(e) => setProdAvailable(e.target.value === 'true')}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                      >
                        <option value="true">Yes, Available in Store</option>
                        <option value="false">Out of Stock</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Category Link
                      </label>
                      <select
                        value={prodCatId}
                        onChange={(e) => setProdCatId(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                      >
                        <option value="">-- Choose Category --</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.categoryName} ({c.id})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Promotion ID Code
                      </label>
                      <input
                        type="text"
                        value={prodPromoId}
                        onChange={(e) => setProdPromoId(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                      />
                    </div>
                  </>
                )}

                {/* 6. CATEGORIES FIELDS */}
                {activeEntity === 'categories' && (
                  <>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Category Name
                      </label>
                      <input
                        type="text"
                        value={catName}
                        onChange={(e) => setCatName(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                        placeholder="Scoops & Cones"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Status
                      </label>
                      <select
                        value={catStatus}
                        onChange={(e) => setCatStatus(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Form Buttons */}
                <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClearForm}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-sans font-bold text-xs rounded-xl"
                  >
                    Clear Form
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-primary-container text-white hover:brightness-105 active:scale-95 font-sans font-extrabold text-xs rounded-xl shadow-md"
                  >
                    {editingId ? 'Save Edits' : 'Submit Record'}
                  </button>
                </div>
              </form>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Dynamic Database Lists Table */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            {activeEntity === 'customers' && (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="p-4">Customer ID</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">D.O.B</th>
                    <th className="p-4">Gender</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCustomers.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/50">
                      <td className="p-4 font-mono font-bold text-slate-900">{c.id}</td>
                      <td className="p-4 font-bold text-slate-800">{c.customerName}</td>
                      <td className="p-4 text-slate-500">{c.email}</td>
                      <td className="p-4 text-slate-500">{c.phoneNumber}</td>
                      <td className="p-4 text-slate-500">{c.dateOfBirth}</td>
                      <td className="p-4">
                        <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-bold">
                          {c.gender}
                        </span>
                      </td>
                      <td className="p-4 flex gap-2">
                        <button
                          onClick={() => handleEditClick(c.id)}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="p-1.5 bg-error/10 hover:bg-error/20 text-error rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredCustomers.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-400 italic">
                        No customers match your criteria. Click &quot;Add+&quot; to insert one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            {activeEntity === 'sales' && (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="p-4">Sale ID</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Loyalty</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Cust ID</th>
                    <th className="p-4">Pay ID</th>
                    <th className="p-4">Staff ID</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSales.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/50">
                      <td className="p-4 font-mono font-bold text-slate-900">{s.id}</td>
                      <td className="p-4 font-bold text-slate-800">{s.salesType}</td>
                      <td className="p-4 text-slate-500">{s.loyaltyProgram}</td>
                      <td className="p-4 text-slate-500">{s.dateOfSale}</td>
                      <td className="p-4 font-mono text-slate-500">{s.customerId}</td>
                      <td className="p-4 font-mono text-slate-500">{s.paymentMethodId}</td>
                      <td className="p-4 font-mono text-slate-500">{s.staffId}</td>
                      <td className="p-4 font-sans font-black text-primary">${s.totalAmount.toFixed(2)}</td>
                      <td className="p-4 flex gap-2">
                        <button
                          onClick={() => handleEditClick(s.id)}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="p-1.5 bg-error/10 hover:bg-error/20 text-error rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredSales.length === 0 && (
                    <tr>
                      <td colSpan={9} className="p-8 text-center text-slate-400 italic">
                        No sales invoices match your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            {activeEntity === 'paymentMethods' && (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="p-4">Method ID</th>
                    <th className="p-4">Method Name</th>
                    <th className="p-4">Provider</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPaymentMethods.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50">
                      <td className="p-4 font-mono font-bold text-slate-900">{p.id}</td>
                      <td className="p-4 font-bold text-slate-800">{p.paymentMethodName}</td>
                      <td className="p-4 text-slate-500">{p.provider}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            p.status === 'Active'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="p-4 flex gap-2">
                        <button
                          onClick={() => handleEditClick(p.id)}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-1.5 bg-error/10 hover:bg-error/20 text-error rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredPaymentMethods.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-400 italic">
                        No payment channels exist.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            {activeEntity === 'staff' && (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="p-4">Staff ID</th>
                    <th className="p-4">Member Name</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Business Email</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Shift Hours</th>
                    <th className="p-4">Shifts Left</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStaff.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/50">
                      <td className="p-4 font-mono font-bold text-slate-900">{s.id}</td>
                      <td className="p-4 font-bold text-slate-800">{s.staffName}</td>
                      <td className="p-4 font-semibold text-slate-600">{s.role}</td>
                      <td className="p-4 text-slate-500">{s.staffEmail}</td>
                      <td className="p-4 text-slate-500">{s.phoneNumber}</td>
                      <td className="p-4 text-slate-500">{s.workingHours}</td>
                      <td className="p-4 font-bold">{s.shiftsLeft}</td>
                      <td className="p-4 flex gap-2">
                        <button
                          onClick={() => handleEditClick(s.id)}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="p-1.5 bg-error/10 hover:bg-error/20 text-error rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredStaff.length === 0 && (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-slate-400 italic">
                        No team member records match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            {activeEntity === 'products' && (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="p-4">Product ID</th>
                    <th className="p-4">Product Name</th>
                    <th className="p-4">Category ID</th>
                    <th className="p-4">Promo Code</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">In-Store Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50">
                      <td className="p-4 font-mono font-bold text-slate-900">{p.id}</td>
                      <td className="p-4 font-bold text-slate-800">{p.productName}</td>
                      <td className="p-4 font-mono text-slate-500">{p.categoryId}</td>
                      <td className="p-4 font-mono text-slate-500">{p.paymentPromotionId}</td>
                      <td className="p-4 font-sans font-black text-primary">${p.price.toFixed(2)}</td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                            p.isAvailable
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {p.isAvailable ? 'Available' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="p-4 flex gap-2">
                        <button
                          onClick={() => handleEditClick(p.id)}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-1.5 bg-error/10 hover:bg-error/20 text-error rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-400 italic">
                        No products listed in database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            {activeEntity === 'categories' && (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="p-4">Category ID</th>
                    <th className="p-4">Category Name</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCategories.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/50">
                      <td className="p-4 font-mono font-bold text-slate-900">{c.id}</td>
                      <td className="p-4 font-bold text-slate-800">{c.categoryName}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            c.status === 'Active'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="p-4 flex gap-2">
                        <button
                          onClick={() => handleEditClick(c.id)}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="p-1.5 bg-error/10 hover:bg-error/20 text-error rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredCategories.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-slate-400 italic">
                        No categories found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>
    </motion.div>
  );
}
