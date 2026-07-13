/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'scoops' | 'sundaes' | 'shakes' | 'seasonal';
  image: string;
  isBestseller?: boolean;
  tags?: string[];
  isFavorite?: boolean;
}

export interface CartItem {
  product: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  date: string;
  totalAmount: number;
  status: 'Churning' | 'Delivery' | 'Arrived';
  riderName: string;
  riderAvatar: string;
  riderRating: number;
  etaMinutes: number;
  estimatedArrival: string;
}

// ==========================================
// DB ENTITY SCHEMAS (Figma CRUD Interface)
// ==========================================

export interface DBCustomer {
  id: string;
  customerName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  address: string;
}

export interface DBSales {
  id: string;
  salesType: 'POS' | 'Delivery' | 'In-store pickup';
  loyaltyProgram: 'SnoPoints' | 'BOGO Promos' | 'None';
  dateOfSale: string;
  customerId: string;
  paymentMethodId: string;
  totalAmount: number;
  staffId: string;
}

export interface DBPaymentMethod {
  id: string;
  paymentMethodName: string;
  provider: string;
  status: 'Active' | 'Inactive';
}

export interface DBStaff {
  id: string;
  staffName: string;
  role: 'Store Manager' | 'Scooper' | 'Rider' | 'Cashier';
  staffEmail: string;
  phoneNumber: string;
  workingHours: string;
  shiftsLeft: number;
}

export interface DBProduct {
  id: string;
  productName: string;
  price: number;
  isAvailable: boolean;
  categoryId: string;
  paymentPromotionId: string;
}

export interface DBCategory {
  id: string;
  categoryName: string;
  status: 'Active' | 'Inactive';
}
