/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem, DBCustomer, DBSales, DBPaymentMethod, DBStaff, DBProduct, DBCategory } from './types';

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 'M001',
    name: 'Classic Madagascar Vanilla',
    price: 4.50,
    description: 'Pure, aromatic vanilla beans folded into our richest dairy cream. A timeless SnoMate favorite.',
    category: 'scoops',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDno_tOfgNEUtHOGx6gt0mgsfbAh_VCFiyWXaQ3WHqa-HVwXvX_bJptwmBmXUARVjUY4xkF3TWsG2VOxUCLt-ZyCuBgmCnkH75VAJAd-jMHnj0YyBALzzAnOvwq9F0C5q2gyXipq5nukcUp9iQit4zXLzi2Sgv2P1ICvBgtRObJnG7YWPT71e8M5kUsrhhdmNBIqfim9g7l6Na5EYgnnY6swKSv4UjwE4FeIaZpqXVsuuZyQIZZnGBW0ei1t3M4xEDmuhmtW8C7oc5U',
    isBestseller: true,
    tags: ['Gluten-Free', 'Premium'],
    isFavorite: true
  },
  {
    id: 'M002',
    name: 'Midnight Chocolate',
    price: 4.75,
    description: '70% Dark cocoa blended with fudge ripples for the ultimate chocolate lover.',
    category: 'scoops',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqYUTHYKMSGTYVmrwbTbdzjCUGLRQudQFvwzTQUiiHz2mMzhqaoNVJP2HvB12MEWd88TXF1PGOwO6ea69yxYwPs9YL8kJX1-pvCQ1EUduugINXNES1mPuAmYGUeyHiQZH6CYy21JgCie0iF17VzJV1iKtO7X7aS2dMksYG9csryCgVq1A_ZQMPViLFHBOBTYolPk28uUKkOHNAQtDfYj0er2rqFcyRU9IUwHjfhN5rTrUBEND289e4u3j_fpxFenEUYEwj9piVJpVB',
    tags: ['Rich', 'Dark'],
    isFavorite: false
  },
  {
    id: 'M003',
    name: 'Summer Strawberry',
    price: 4.50,
    description: 'Hand-picked farm fresh strawberries swirled into sweet cream.',
    category: 'scoops',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXcKtiIyO_bdaBlotODVKTmV9GQrHtHceeq1aWdiN0O-WJ3lPVxAd3gr0Ffgxu0HS8zmisFOEe-5p4KIID61kSWjo2b0gpMXfo6eZP-zJkNX8ZugmWP4d5nuqryyNkrbqKlKToMSq72yuWp34oHOixM31RB9nykx8NWaKulF8ns149lcCIWLpStG9pnYUKi50fAlLLZeGeEjQ5BNv25z9mktSEI5kY2kNIe0A33WeaQm3ab276G16U3ag2T5nc8H8Br5jnUC9VRU0v',
    tags: ['Fresh Fruit', 'Classic'],
    isFavorite: false
  },
  {
    id: 'M004',
    name: 'Classic Sundae',
    price: 5.99,
    description: 'Vanilla bean scoop topped with rainbow sprinkles and a single red cherry in a crisp waffle cup.',
    category: 'sundaes',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOxgGM_SmDQsZhyMw7H_3ePooMWxkEp_U80pyXaPBB5DKEW4XlxStnNiTTrtZm3RpEFeh_wxXYC5aD70tTD3-TvywQggUQxBh-4B9csLgNf2y5NiW3Y8ihKrgeticPl6zpaI4AQxxqX1e5ugnSFZ8HdjkvRA1dHs0yZwPTrYdPdUf0ICEVGFY5Ucwsp_g2A6zzZCUNUaLTyz8i6FUx2gBPS8FtRO9I9udKVhO8jmdE9oPrDHScjQPJr8GmJtjItfgzobvkijmIP771',
    tags: ['Sweet', 'Toppings'],
    isFavorite: true
  },
  {
    id: 'M005',
    name: 'Mango Frost',
    price: 4.50,
    description: 'Refreshing tropical citrus sorbet served with fresh mint leaves and a slice of lime.',
    category: 'seasonal',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqSON8FKcGtVmsdgTXlPGztp6nXCllK_KoHvOiOPFuf2t3xdVlsbmy4itMRsDx3OvMl3A10j2vylDpa5cmzgij0Ro88mRue5oVhj6f-U-MEdUoPwHLeiOASM29xPmfo9s7QFoT9rEPy6A-BSlj5pBdeUCeUl3UDzhrO3Vu2erNtaBCgtbzWP8XvpMox-aFG-GsHktiwTJiSAUVoBfANsjE5O4YKOzA2RtpKFcx_wVN8bUbZIigai-TMzyq15mcaZvq4jvDFH7jQN0y',
    tags: ['Dairy-Free', 'Tropical'],
    isFavorite: false
  },
  {
    id: 'M006',
    name: 'Midnight Cocoa Gelato',
    price: 6.25,
    description: 'A decadent dark chocolate gelato scoop served in a crisp charcoal waffle cone and topped with sea salt.',
    category: 'scoops',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABEMxm6DF_a5TpF1PqbWMhWIxlWqwHhNhtcxXYlghpWQzfPhfM82i7gKVK5Ezj_w7e7t2NjbJCzojziENfiQuJqJOCvkyEjGGZY8dNudWa-j7Zsux5_-Vc3wCn3I3lw1IoY4wSkuDTvsgZmBO4ldOVq0bWZlVZv2B2S03fN_q5SPnXcbC1AJ-yoFCI5j3Jp0URw5EiyF8kRUxT992HBINUA5iHp7Y5V_QhDxb9vUxuC2GpEWscsvHvNx8gd1kGOYRCEoDht31BF6AZ',
    tags: ['Premium', 'Sea Salt'],
    isFavorite: true
  },
  {
    id: 'M007',
    name: 'Salted Caramel Bowl',
    price: 5.25,
    description: 'Rich, smooth caramel ice cream with a heavy drizzle of sea salt caramel sauce.',
    category: 'scoops',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHH87WqE6WkZs5d0lJ-PIbbxizLJDxbDzthpmYRSb4jfxxuPvdF3nomAFHYZGQEofs7w1i0Cxeno1V5mqaJuNNMZE0Q7mfq6qUXQByWUQbsO5hXP6K_VvGEJS7ZubZ8gETVueZ7jC_M3wSkIwE5WDYB42_ol_WKtnbgrgMk5OBsdPeYqiUDKOogww8-lP1yNr4tQjEaU6E3c53t0g9h5Dt3wamydg1TAW5YQMgBbnTVlukkDiNNyI1VGvdXtbzXB0GQkWKYlg0NaLL',
    tags: ['Sweet & Salty', 'Top Choice'],
    isFavorite: true
  },
  {
    id: 'M008',
    name: 'Midnight Mint Scoop',
    price: 4.99,
    description: 'Refreshing pastel green mint ice cream loaded with rich dark chocolate flakes.',
    category: 'scoops',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCI5o2wzlaFwCw5RQUmLbwb4Wkr4fDTHmqdCyH281a2ZpyhOe6C7LfdUZ1DH-NuUDkmLGc3FOJtC0nfW-A9e8n5fAGEUlYJ0yfeLVIj-RgR5HLzz2s2n3ZT9a8PpHH2PWolBgs-pAEjcARYIIoMXN0MVvNf__D02m8wEhRX4rZFGkgwR8oEHEjuv0F08uJEde-p20nOKOF3zJGwtdWHOtrS1KHNHRI-99NDTKqXn52QQmocy4-49IKL94xSlh_HYY-qQtUu_oYxoov',
    tags: ['Minty', 'Chocolate Chip'],
    isFavorite: false
  },
  {
    id: 'M009',
    name: 'Super Strawberry Sorbet',
    price: 4.50,
    description: 'Vibrant pink strawberry sorbet packed with real chunks of field strawberry fruit.',
    category: 'seasonal',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAr9Ky5X6j2mYn7ROc8y8wMyLJH4EEeIqH-6GuAUzR6B3nLon0lmFqTP0w4ldRY5uBwLQACE0gXYEJN4IfzYhMQjgkkjf1g41athrOI1XpwNoCpLM_0QnJUgTIXzHxeJ0BgDcJGYipK7L42zCcfFvhVVY3oCNw5TODNJuikzaQlMNmDjX3tg1QhlfsOe65El-zryauNIJueuuzaCHkTmqaKWVofPvssHbirBurP32MxULIWYww3FiLXxhfdYWfa1dNf5iZ4r8Nx7583',
    tags: ['Gluten-Free', 'Low Sugar'],
    isFavorite: false
  },
  {
    id: 'M010',
    name: 'Classic Thick Shake',
    price: 6.50,
    description: 'Extra thick milkshake blended with pure Madagascar vanilla and farm fresh dairy.',
    category: 'shakes',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    tags: ['Creamy', 'Thick'],
    isFavorite: false
  },
  {
    id: 'M011',
    name: 'Salted Caramel Crunch Shake',
    price: 6.99,
    description: 'Creamy hand-spun milkshake flavored with caramel and sprinkled with sweet sea-salt crunchies.',
    category: 'shakes',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    tags: ['Premium', 'Toppings'],
    isFavorite: false
  }
];

// ==========================================
// DB ENTITY RECORD DATA
// ==========================================

export const INITIAL_CUSTOMERS: DBCustomer[] = [
  {
    id: 'CUST-1001',
    customerName: 'Alex Johnson',
    email: 'alex.johnson@gmail.com',
    phoneNumber: '+1 (555) 432-1100',
    dateOfBirth: '1995-08-22',
    gender: 'Female',
    address: '422 Maplewood Ave, Los Angeles, CA'
  },
  {
    id: 'CUST-1002',
    customerName: 'Marcus Bennett',
    email: 'marcus.b@hotmail.com',
    phoneNumber: '+1 (555) 901-8422',
    dateOfBirth: '1989-11-04',
    gender: 'Male',
    address: '14B Oak St, Los Angeles, CA'
  },
  {
    id: 'CUST-1003',
    customerName: 'Sera Thompson',
    email: 'sera.thompson@gmail.com',
    phoneNumber: '+1 (555) 303-9110',
    dateOfBirth: '2001-04-15',
    gender: 'Other',
    address: '200 Central Park, Los Angeles, CA'
  }
];

export const INITIAL_SALES: DBSales[] = [
  {
    id: 'SALE-5001',
    salesType: 'Delivery',
    loyaltyProgram: 'SnoPoints',
    dateOfSale: '2026-07-13',
    customerId: 'CUST-1001',
    paymentMethodId: 'PAY-001',
    totalAmount: 10.50,
    staffId: 'STF-3002'
  },
  {
    id: 'SALE-5002',
    salesType: 'POS',
    loyaltyProgram: 'BOGO Promos',
    dateOfSale: '2026-07-12',
    customerId: 'CUST-1002',
    paymentMethodId: 'PAY-002',
    totalAmount: 14.50,
    staffId: 'STF-3001'
  },
  {
    id: 'SALE-5003',
    salesType: 'In-store pickup',
    loyaltyProgram: 'None',
    dateOfSale: '2026-07-10',
    customerId: 'CUST-1003',
    paymentMethodId: 'PAY-001',
    totalAmount: 22.00,
    staffId: 'STF-3004'
  }
];

export const INITIAL_PAYMENT_METHODS: DBPaymentMethod[] = [
  {
    id: 'PAY-001',
    paymentMethodName: 'SnoMate Wallet',
    provider: 'SnoMate Pay Inc.',
    status: 'Active'
  },
  {
    id: 'PAY-002',
    paymentMethodName: 'Visa Card Credit',
    provider: 'Chase Merchant Bank',
    status: 'Active'
  },
  {
    id: 'PAY-003',
    paymentMethodName: 'Cash on Delivery',
    provider: 'Internal Ledger',
    status: 'Active'
  },
  {
    id: 'PAY-004',
    paymentMethodName: 'Apple Pay',
    provider: 'Apple Wallet',
    status: 'Inactive'
  }
];

export const INITIAL_STAFF: DBStaff[] = [
  {
    id: 'STF-3001',
    staffName: 'Mateo Sandoval',
    role: 'Rider',
    staffEmail: 'mateo.s@snomate.com',
    phoneNumber: '+1 (555) 782-9011',
    workingHours: '08:00 - 16:00',
    shiftsLeft: 4
  },
  {
    id: 'STF-3002',
    staffName: 'Clara Oswald',
    role: 'Scooper',
    staffEmail: 'clara.o@snomate.com',
    phoneNumber: '+1 (555) 234-8899',
    workingHours: '10:00 - 18:00',
    shiftsLeft: 12
  },
  {
    id: 'STF-3003',
    staffName: 'Derrick Vance',
    role: 'Store Manager',
    staffEmail: 'd.vance@snomate.com',
    phoneNumber: '+1 (555) 890-4100',
    workingHours: '07:00 - 17:00',
    shiftsLeft: 22
  },
  {
    id: 'STF-3004',
    staffName: 'Jin-Woo Park',
    role: 'Cashier',
    staffEmail: 'j.park@snomate.com',
    phoneNumber: '+1 (555) 345-6712',
    workingHours: '16:00 - 24:00',
    shiftsLeft: 8
  }
];

export const INITIAL_DB_PRODUCTS: DBProduct[] = [
  {
    id: 'PROD-4001',
    productName: 'Double Scoop Cloud Cone',
    price: 8.50,
    isAvailable: true,
    categoryId: 'CAT-2001',
    paymentPromotionId: 'PROM-901'
  },
  {
    id: 'PROD-4002',
    productName: 'Frosty Sprinkles Pack',
    price: 2.00,
    isAvailable: true,
    categoryId: 'CAT-2003',
    paymentPromotionId: 'PROM-901'
  },
  {
    id: 'PROD-4003',
    productName: 'Classic Madagascar Vanilla Scoop',
    price: 4.50,
    isAvailable: true,
    categoryId: 'CAT-2001',
    paymentPromotionId: 'PROM-902'
  }
];

export const INITIAL_CATEGORIES: DBCategory[] = [
  {
    id: 'CAT-2001',
    categoryName: 'Scoops & Cones',
    status: 'Active'
  },
  {
    id: 'CAT-2002',
    categoryName: 'Extravagant Sundaes',
    status: 'Active'
  },
  {
    id: 'CAT-2003',
    categoryName: 'Fruity Sorbets & Toppings',
    status: 'Active'
  },
  {
    id: 'CAT-2004',
    categoryName: 'Milkshakes & Smoothies',
    status: 'Active'
  }
];
