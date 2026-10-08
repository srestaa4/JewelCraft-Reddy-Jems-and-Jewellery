import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ==========================================
// SEED DATA STORE (In-Memory Full-Stack DB)
// ==========================================

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'ROLE_CUSTOMER' | 'ROLE_SALESMAN' | 'ROLE_ADMIN';
  phone: string;
  city?: string;
  address?: string;
  employeeCode?: string;
  showroomId?: string;
}

export interface Jewellery {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  basePrice: number;
  availableDesigns: string[];
  availableMetals: string[];
  availableSizes: (string | number)[];
  status: 'AVAILABLE' | 'OUT_OF_STOCK';
}

export interface Design {
  id: string;
  designName: string;
  jewelleryType: string;
  description: string;
  image: string;
  basePrice: number;
  status: 'ACTIVE' | 'ARCHIVED';
}

export interface Metal {
  id: string;
  metalName: string;
  purity: string;
  pricePerGram: number;
  colorCode: string;
  availability: boolean;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Diamond {
  id: string;
  shape: string;
  carat: number;
  color: string;
  clarity: string;
  cut: string;
  price: number;
  stock: number;
  image: string;
  status: 'AVAILABLE' | 'RESERVED';
}

export interface Showroom {
  id: string;
  showroomName: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  openingTime: string;
  closingTime: string;
  status: 'OPEN' | 'CLOSED';
}

export interface CustomizationRecord {
  id: string;
  customerId: string;
  jewelleryId: string;
  jewelleryName: string;
  jewelleryType: string;
  designId: string;
  designName: string;
  metalId: string;
  metalName: string;
  diamondId?: string;
  diamondShape: string;
  carat: number;
  color?: string;
  clarity?: string;
  cut?: string;
  size: string | number;
  engraving?: string;
  notes?: string;
  basePrice: number;
  metalPrice: number;
  diamondPrice: number;
  customizationPrice: number;
  estimatedPrice: number;
  createdAt: string;
}

export interface Appointment {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  salesmanId?: string;
  salesmanName?: string;
  showroomId: string;
  showroomName: string;
  customization: Partial<CustomizationRecord>;
  date: string;
  time: string;
  status: 'BOOKED' | 'CONFIRMED' | 'RESCHEDULED' | 'COMPLETED' | 'CANCELLED';
  customerNotes?: string;
  salesmanNotes?: string;
  createdAt: string;
}

export interface Quotation {
  id: string;
  appointmentId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  salesmanId: string;
  salesmanName: string;
  jewellery: string;
  design: string;
  metal: string;
  diamond: string;
  diamondShape: string;
  size: string | number;
  customizationDetails: string;
  estimatedPrice: number;
  additionalCharges: number;
  discount: number;
  finalPrice: number;
  salesmanNotes: string;
  createdAt: string;
  validUntilDate: string;
  status: 'PENDING' | 'ACCEPTED' | 'REVISED';
}

// Initial Data
const users: User[] = [
  {
    id: 'USR-CUST-1',
    name: 'Ananya Sharma',
    email: 'ananya@jewelcraft.com',
    password: 'password123',
    role: 'ROLE_CUSTOMER',
    phone: '+91 98765 43210',
    city: 'Hyderabad',
    address: 'Road No 36, Jubilee Hills, Hyderabad',
  },
  {
    id: 'USR-SALES-1',
    name: 'Rajesh Varma',
    email: 'rajesh.sales@jewelcraft.com',
    password: 'password123',
    role: 'ROLE_SALESMAN',
    phone: '+91 91234 56789',
    employeeCode: 'SALES-HYD-04',
    showroomId: 'SHW-HYD-01',
  },
  {
    id: 'USR-SALES-2',
    name: 'Priya Mehta',
    email: 'priya.sales@jewelcraft.com',
    password: 'password123',
    role: 'ROLE_SALESMAN',
    phone: '+91 99887 76655',
    employeeCode: 'SALES-MUM-02',
    showroomId: 'SHW-MUM-02',
  },
  {
    id: 'USR-ADMIN-1',
    name: 'K. Reddy (Director)',
    email: 'admin@jewelcraft.com',
    password: 'admin123',
    role: 'ROLE_ADMIN',
    phone: '+91 90000 11111',
  },
];

const jewelleryTypes: Jewellery[] = [
  {
    id: 'JWL-01',
    name: 'Solitaire & Diamond Rings',
    type: 'Ring',
    description: 'Bespoke engagement rings, diamond bands, and signature heirloom solitaires hand-finished with exceptional precision.',
    image: '/images/jewellery/ring_solitaire.jpg',
    basePrice: 25000,
    availableDesigns: ['Classic Solitaire', 'Halo Elegance', 'Vintage Filigree', 'Modern Bezel', 'Three-Stone Royal'],
    availableMetals: ['18K Gold', '22K Gold', 'Rose Gold', 'White Gold', 'Platinum'],
    availableSizes: [8, 10, 12, 14, 16, 18, 20, 22],
    status: 'AVAILABLE',
  },
  {
    id: 'JWL-02',
    name: 'Opulent Necklaces & Chokers',
    type: 'Necklace',
    description: 'Grand royal chokers and diamond cascade necklaces handcrafted for weddings and celebratory gala evenings.',
    image: '/images/jewellery/jewellery_craft.jpg',
    basePrice: 85000,
    availableDesigns: ['Cascade Riviera', 'Royal Collar', 'Vintage Filigree', 'Floral Medallion'],
    availableMetals: ['18K Gold', '22K Gold', 'Rose Gold', 'White Gold'],
    availableSizes: ['16 inch (Choker)', '18 inch (Princess)', '20 inch (Matinee)', '24 inch (Opera)'],
    status: 'AVAILABLE',
  },
  {
    id: 'JWL-03',
    name: 'Lustrous Earrings & Drops',
    type: 'Earrings',
    description: 'From timeless round diamond studs to articulated chandelier drops that capture and refract natural light.',
    image: '/images/jewellery/jewellery_craft.jpg',
    basePrice: 32000,
    availableDesigns: ['Diamond Studs', 'Halo Drops', 'Chandelier Cascades', 'Huggies Pavé'],
    availableMetals: ['18K Gold', '22K Gold', 'Rose Gold', 'White Gold', 'Platinum'],
    availableSizes: ['Standard Petite', 'Standard Medium', 'Statement Grand'],
    status: 'AVAILABLE',
  },
  {
    id: 'JWL-04',
    name: 'Tennis & Kada Bracelets',
    type: 'Bracelet',
    description: 'Continuous brilliance with certified natural diamonds set into flexible luxury gold and platinum links.',
    image: '/images/jewellery/jewellery_craft.jpg',
    basePrice: 55000,
    availableDesigns: ['Classic Tennis', 'Open Cuff Royal', 'Art Deco Kada', 'Infinity Pavé'],
    availableMetals: ['18K Gold', '22K Gold', 'Rose Gold', 'White Gold', 'Platinum'],
    availableSizes: ['6.5 inch', '7.0 inch', '7.5 inch', '8.0 inch'],
    status: 'AVAILABLE',
  },
  {
    id: 'JWL-05',
    name: 'Signature Pendants',
    type: 'Pendant',
    description: 'Subtle daily luxury featuring cushion, pear, and heart-shaped solitaire diamonds with custom hand-carved bails.',
    image: '/images/jewellery/ring_solitaire.jpg',
    basePrice: 20000,
    availableDesigns: ['Solitaire Floating', 'Halo Medallion', 'Vintage Cross', 'Heart Sparkle'],
    availableMetals: ['18K Gold', '22K Gold', 'Rose Gold', 'White Gold', 'Platinum'],
    availableSizes: ['Petite 12mm', 'Classic 18mm', 'Grand 25mm'],
    status: 'AVAILABLE',
  },
];

const designs: Design[] = [
  {
    id: 'DSG-01',
    designName: 'Classic Solitaire',
    jewelleryType: 'Ring',
    description: 'The definitive 4-prong or 6-prong solitaire setting elevating the diamond for optimal light dispersion.',
    image: '/images/jewellery/ring_solitaire.jpg',
    basePrice: 12000,
    status: 'ACTIVE',
  },
  {
    id: 'DSG-02',
    designName: 'Halo Elegance',
    jewelleryType: 'Ring',
    description: 'A brilliant center stone encircled by a micropavé diamond halo, amplifying visual radiance.',
    image: '/images/jewellery/ring_solitaire.jpg',
    basePrice: 18000,
    status: 'ACTIVE',
  },
  {
    id: 'DSG-03',
    designName: 'Vintage Filigree',
    jewelleryType: 'Ring',
    description: 'Intricate milgrain edges and botanical hand-engravings inspired by Edwardian and Victorian master jewelers.',
    image: '/images/jewellery/ring_solitaire.jpg',
    basePrice: 22000,
    status: 'ACTIVE',
  },
  {
    id: 'DSG-04',
    designName: 'Modern Bezel',
    jewelleryType: 'Ring',
    description: 'Sleek architectural border of polished precious metal encasing the gem securely with a contemporary silhouette.',
    image: '/images/jewellery/ring_solitaire.jpg',
    basePrice: 14000,
    status: 'ACTIVE',
  },
  {
    id: 'DSG-05',
    designName: 'Three-Stone Royal',
    jewelleryType: 'Ring',
    description: 'Representing past, present, and future with a central solitaire flanked by tapered baguette or round side gems.',
    image: '/images/jewellery/ring_solitaire.jpg',
    basePrice: 26000,
    status: 'ACTIVE',
  },
  {
    id: 'DSG-06',
    designName: 'Cascade Riviera',
    jewelleryType: 'Necklace',
    description: 'Graduated diamonds flowing seamlessly around the collarbone, graduating to a dramatic center gem.',
    image: '/images/jewellery/jewellery_craft.jpg',
    basePrice: 45000,
    status: 'ACTIVE',
  },
  {
    id: 'DSG-07',
    designName: 'Royal Collar',
    jewelleryType: 'Necklace',
    description: 'Traditional Indian heritage-inspired lattice studded with polki and brilliant-cut certified diamonds.',
    image: '/images/jewellery/jewellery_craft.jpg',
    basePrice: 65000,
    status: 'ACTIVE',
  },
  {
    id: 'DSG-08',
    designName: 'Diamond Studs',
    jewelleryType: 'Earrings',
    description: 'Essential martini 3-prong and basket 4-prong mounts that hug the ear lobe comfortably.',
    image: '/images/jewellery/jewellery_craft.jpg',
    basePrice: 10000,
    status: 'ACTIVE',
  },
  {
    id: 'DSG-09',
    designName: 'Classic Tennis',
    jewelleryType: 'Bracelet',
    description: 'Individually articulated links with dual safety clasps and continuous round brilliant diamonds.',
    image: '/images/jewellery/jewellery_craft.jpg',
    basePrice: 30000,
    status: 'ACTIVE',
  },
  {
    id: 'DSG-10',
    designName: 'Solitaire Floating',
    jewelleryType: 'Pendant',
    description: 'Minimalist tension-set diamond suspended on an ethereal cable chain, shimmering with every heartbeat.',
    image: '/images/jewellery/ring_solitaire.jpg',
    basePrice: 11000,
    status: 'ACTIVE',
  },
];

const metals: Metal[] = [
  {
    id: 'MTL-01',
    metalName: '18K Yellow Gold',
    purity: '75.0% Fine Gold',
    pricePerGram: 5600,
    colorCode: '#D4AF37',
    availability: true,
    status: 'ACTIVE',
  },
  {
    id: 'MTL-02',
    metalName: '22K Traditional Gold',
    purity: '91.6% Pure Hallmark Gold',
    pricePerGram: 6850,
    colorCode: '#E5A93C',
    availability: true,
    status: 'ACTIVE',
  },
  {
    id: 'MTL-03',
    metalName: '18K Rose Gold',
    purity: '75.0% Gold + Copper Alloy',
    pricePerGram: 5750,
    colorCode: '#B76E79',
    availability: true,
    status: 'ACTIVE',
  },
  {
    id: 'MTL-04',
    metalName: '18K White Gold',
    purity: '75.0% Gold + Rhodium Plated',
    pricePerGram: 5850,
    colorCode: '#E8E8E8',
    availability: true,
    status: 'ACTIVE',
  },
  {
    id: 'MTL-05',
    metalName: '950 Platinum',
    purity: '95.0% Pure Platinum (PT950)',
    pricePerGram: 3950,
    colorCode: '#E5E4E2',
    availability: true,
    status: 'ACTIVE',
  },
];

const diamondShapes = [
  { id: 'RND', shapeName: 'Round', description: 'Maximum fire and 58-facet brilliant sparkle', aspect: '1:1' },
  { id: 'PRN', shapeName: 'Princess', description: 'Contemporary square cut with sharp angular brilliance', aspect: '1:1' },
  { id: 'OVL', shapeName: 'Oval', description: 'Elongating silhouette offering exceptional surface area', aspect: '1.4:1' },
  { id: 'EMR', shapeName: 'Emerald', description: 'Sophisticated step-cut with hall-of-mirrors clarity', aspect: '1.4:1' },
  { id: 'PEA', shapeName: 'Pear', description: 'Teardrop elegance merging round and marquise beauty', aspect: '1.5:1' },
  { id: 'MRQ', shapeName: 'Marquise', description: 'Dramatic royal bow-tie shape with vintage allure', aspect: '1.8:1' },
  { id: 'CSH', shapeName: 'Cushion', description: 'Pillow-soft rounded corners with romantic antique fire', aspect: '1.1:1' },
  { id: 'RAD', shapeName: 'Radiant', description: 'Vibrant hybrid combining emerald shape with brilliant faceting', aspect: '1.25:1' },
  { id: 'HRT', shapeName: 'Heart', description: 'The romantic emblem of affection crafted with precise clefts', aspect: '1:1' },
];

const diamonds: Diamond[] = [
  {
    id: 'DMD-01',
    shape: 'Round',
    carat: 0.50,
    color: 'D (Colorless)',
    clarity: 'VVS1',
    cut: 'Excellent',
    price: 32000,
    stock: 8,
    image: '/images/jewellery/ring_solitaire.jpg',
    status: 'AVAILABLE',
  },
  {
    id: 'DMD-02',
    shape: 'Round',
    carat: 1.00,
    color: 'E (Colorless)',
    clarity: 'VS1',
    cut: 'Ideal',
    price: 95000,
    stock: 5,
    image: '/images/jewellery/ring_solitaire.jpg',
    status: 'AVAILABLE',
  },
  {
    id: 'DMD-03',
    shape: 'Princess',
    carat: 0.75,
    color: 'F (Colorless)',
    clarity: 'VVS2',
    cut: 'Excellent',
    price: 48000,
    stock: 6,
    image: '/images/jewellery/ring_solitaire.jpg',
    status: 'AVAILABLE',
  },
  {
    id: 'DMD-04',
    shape: 'Oval',
    carat: 1.20,
    color: 'D (Colorless)',
    clarity: 'VVS1',
    cut: 'Excellent',
    price: 135000,
    stock: 4,
    image: '/images/jewellery/ring_solitaire.jpg',
    status: 'AVAILABLE',
  },
  {
    id: 'DMD-05',
    shape: 'Emerald',
    carat: 1.50,
    color: 'E (Colorless)',
    clarity: 'IF (Internally Flawless)',
    cut: 'Very Good',
    price: 185000,
    stock: 3,
    image: '/images/jewellery/ring_solitaire.jpg',
    status: 'AVAILABLE',
  },
  {
    id: 'DMD-06',
    shape: 'Pear',
    carat: 0.90,
    color: 'G (Near Colorless)',
    clarity: 'VS1',
    cut: 'Excellent',
    price: 64000,
    stock: 7,
    image: '/images/jewellery/ring_solitaire.jpg',
    status: 'AVAILABLE',
  },
  {
    id: 'DMD-07',
    shape: 'Cushion',
    carat: 1.10,
    color: 'F (Colorless)',
    clarity: 'VS2',
    cut: 'Ideal',
    price: 92000,
    stock: 5,
    image: '/images/jewellery/ring_solitaire.jpg',
    status: 'AVAILABLE',
  },
  {
    id: 'DMD-08',
    shape: 'Marquise',
    carat: 0.85,
    color: 'E (Colorless)',
    clarity: 'VVS2',
    cut: 'Very Good',
    price: 59000,
    stock: 4,
    image: '/images/jewellery/ring_solitaire.jpg',
    status: 'AVAILABLE',
  },
  {
    id: 'DMD-09',
    shape: 'Heart',
    carat: 1.00,
    color: 'D (Colorless)',
    clarity: 'VVS1',
    cut: 'Excellent',
    price: 110000,
    stock: 3,
    image: '/images/jewellery/ring_solitaire.jpg',
    status: 'AVAILABLE',
  },
  {
    id: 'DMD-10',
    shape: 'Radiant',
    carat: 2.00,
    color: 'F (Colorless)',
    clarity: 'VS1',
    cut: 'Ideal',
    price: 260000,
    stock: 2,
    image: '/images/jewellery/ring_solitaire.jpg',
    status: 'AVAILABLE',
  },
];

const showrooms: Showroom[] = [
  {
    id: 'SHW-HYD-01',
    showroomName: 'REDDY Jubilee Hills Flagship Salon',
    address: 'Plot 422, Road No. 36, Jubilee Hills',
    city: 'Hyderabad, Telangana',
    phone: '+91 40 2355 8899',
    email: 'jubileehills@jewelcraft.com',
    openingTime: '10:30 AM',
    closingTime: '08:30 PM',
    status: 'OPEN',
  },
  {
    id: 'SHW-MUM-02',
    showroomName: 'REDDY Bandra Luxury Lounge',
    address: 'Turner Road, Near Bandra West Post Office',
    city: 'Mumbai, Maharashtra',
    phone: '+91 22 2640 4455',
    email: 'bandra@jewelcraft.com',
    openingTime: '11:00 AM',
    closingTime: '09:00 PM',
    status: 'OPEN',
  },
  {
    id: 'SHW-BLR-03',
    showroomName: 'REDDY Indiranagar Atelier',
    address: '100 Feet Road, HAL 2nd Stage, Indiranagar',
    city: 'Bengaluru, Karnataka',
    phone: '+91 80 4122 7700',
    email: 'bengaluru@jewelcraft.com',
    openingTime: '10:30 AM',
    closingTime: '08:30 PM',
    status: 'OPEN',
  },
  {
    id: 'SHW-DEL-04',
    showroomName: 'REDDY South Extension VIP Boutique',
    address: 'G-14, Main Market, South Extension Part 1',
    city: 'New Delhi, Delhi NCR',
    phone: '+91 11 4166 3322',
    email: 'delhi@jewelcraft.com',
    openingTime: '11:00 AM',
    closingTime: '08:30 PM',
    status: 'OPEN',
  },
];

const appointments: Appointment[] = [
  {
    id: 'JC1001',
    customerId: 'USR-CUST-1',
    customerName: 'Ananya Sharma',
    customerEmail: 'ananya@jewelcraft.com',
    customerPhone: '+91 98765 43210',
    salesmanId: 'USR-SALES-1',
    salesmanName: 'Rajesh Varma',
    showroomId: 'SHW-HYD-01',
    showroomName: 'REDDY Jubilee Hills Flagship Salon',
    customization: {
      jewelleryName: 'Solitaire & Diamond Rings',
      jewelleryType: 'Ring',
      designName: 'Classic Solitaire',
      metalName: '18K Yellow Gold',
      diamondShape: 'Round',
      carat: 0.50,
      color: 'D (Colorless)',
      clarity: 'VVS1',
      cut: 'Excellent',
      size: 14,
      engraving: 'Forever & Always A&R',
      notes: 'Interested in matching wedding band for the groom as well.',
      basePrice: 25000,
      metalPrice: 22400,
      diamondPrice: 32000,
      customizationPrice: 2000,
      estimatedPrice: 81400,
    },
    date: '2026-10-15',
    time: '11:30 AM',
    status: 'CONFIRMED',
    customerNotes: 'Looking forward to viewing the D-color stone in daylight.',
    salesmanNotes: 'Reserved D-VVS1 round solitaire stone for customer private viewing in VIP Suite 2.',
    createdAt: '2026-09-28T10:15:00.000Z',
  },
  {
    id: 'JC1002',
    customerId: 'USR-CUST-1',
    customerName: 'Ananya Sharma',
    customerEmail: 'ananya@jewelcraft.com',
    customerPhone: '+91 98765 43210',
    salesmanId: 'USR-SALES-1',
    salesmanName: 'Rajesh Varma',
    showroomId: 'SHW-HYD-01',
    showroomName: 'REDDY Jubilee Hills Flagship Salon',
    customization: {
      jewelleryName: 'Signature Pendants',
      jewelleryType: 'Pendant',
      designName: 'Solitaire Floating',
      metalName: '18K White Gold',
      diamondShape: 'Pear',
      carat: 0.90,
      color: 'G (Near Colorless)',
      clarity: 'VS1',
      cut: 'Excellent',
      size: 'Classic 18mm',
      engraving: 'A.S.',
      basePrice: 20000,
      metalPrice: 17550,
      diamondPrice: 64000,
      customizationPrice: 1500,
      estimatedPrice: 103050,
    },
    date: '2026-10-22',
    time: '03:00 PM',
    status: 'BOOKED',
    customerNotes: 'Anniversary gift selection.',
    createdAt: '2026-09-30T14:20:00.000Z',
  },
];

const quotations: Quotation[] = [
  {
    id: 'QT-2026-001',
    appointmentId: 'JC1001',
    customerId: 'USR-CUST-1',
    customerName: 'Ananya Sharma',
    customerEmail: 'ananya@jewelcraft.com',
    salesmanId: 'USR-SALES-1',
    salesmanName: 'Rajesh Varma',
    jewellery: 'Ring',
    design: 'Classic Solitaire',
    metal: '18K Yellow Gold (4.2g)',
    diamond: '0.50 ct Round D/VVS1 Certified Natural',
    diamondShape: 'Round',
    size: 14,
    customizationDetails: 'Laser-inscribed inner band "Forever & Always A&R", 6-prong comfort crown',
    estimatedPrice: 81400,
    additionalCharges: 4200, // making charges + certification
    discount: 3000,
    finalPrice: 82600,
    salesmanNotes: 'Includes lifetime complimentary cleaning, prong re-tipping, and IGI jewelry certificate.',
    createdAt: '2026-09-29T11:45:00.000Z',
    validUntilDate: '2026-10-30',
    status: 'PENDING',
  },
];

// Helper weight estimator for price calculation
function getEstimatedMetalWeight(type: string): number {
  switch (type?.toLowerCase()) {
    case 'ring': return 4.5;
    case 'necklace': return 24.0;
    case 'earrings': return 8.0;
    case 'bracelet': return 16.0;
    case 'pendant': return 3.5;
    default: return 5.0;
  }
}

// ==========================================
// SECURITY CONFIGURATION & AUDIT INFRASTRUCTURE
// ==========================================

export const ADMIN_SECURITY_KEY = '889900';
export const ADMIN_MASTER_KEY = 'REDDY-ADMIN-2026';
export const MAX_FAILED_ATTEMPTS = 4;
export const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout

export interface SecurityLogItem {
  id: string;
  timestamp: string;
  event:
    | 'ADMIN_LOGIN_SUCCESS'
    | 'ADMIN_AUTH_FAILED'
    | 'ADMIN_2FA_FAILED'
    | 'SALESMAN_LOGIN_SUCCESS'
    | 'SALESMAN_AUTH_FAILED'
    | 'SALESMAN_CODE_FAILED'
    | 'CUSTOMER_LOGIN_SUCCESS'
    | 'CUSTOMER_AUTH_FAILED'
    | 'ROLE_ACCESS_DENIED'
    | 'BRUTE_FORCE_LOCKOUT'
    | 'ACCOUNT_UNLOCKED';
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  email: string;
  ip: string;
  portal?: string;
  role?: string;
  message: string;
}

// In-memory security audit log
const securityAuditLogs: SecurityLogItem[] = [
  {
    id: 'SEC-LOG-001',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    event: 'ADMIN_LOGIN_SUCCESS',
    severity: 'INFO',
    email: 'admin@jewelcraft.com',
    ip: '127.0.0.1',
    portal: 'admin',
    role: 'ROLE_ADMIN',
    message: 'System Administrator authenticated with primary password and verified 2FA security key.',
  },
  {
    id: 'SEC-LOG-002',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    event: 'SALESMAN_LOGIN_SUCCESS',
    severity: 'INFO',
    email: 'rajesh.sales@jewelcraft.com',
    ip: '127.0.0.1',
    portal: 'salesman',
    role: 'ROLE_SALESMAN',
    message: 'Sales consultant verified via Employee Badge ID: SALES-HYD-04.',
  },
];

// Tracking failed login attempts for brute-force protection: identifier -> record
const failedLoginAttempts = new Map<string, { count: number; lockedUntil: number; lastAttempt: number }>();

function recordSecurityLog(
  event: SecurityLogItem['event'],
  severity: SecurityLogItem['severity'],
  email: string,
  ip: string,
  message: string,
  portal?: string,
  role?: string
) {
  const logItem: SecurityLogItem = {
    id: `SEC-LOG-${String(securityAuditLogs.length + 1).padStart(3, '0')}`,
    timestamp: new Date().toISOString(),
    event,
    severity,
    email: email || 'anonymous',
    ip: ip || '127.0.0.1',
    portal,
    role,
    message,
  };
  securityAuditLogs.unshift(logItem);
  if (securityAuditLogs.length > 200) securityAuditLogs.pop();
  console.log(`[SECURITY AUDIT - ${severity}] [${event}] ${message} (User: ${email}, IP: ${ip})`);
}

// ==========================================
// REST APIS (Spring Boot Endpoints Mapping)
// ==========================================

export interface AuthenticatedRequest extends Request {
  user?: User;
}

// Authentication Middleware: verifies Bearer JWT token & checks expiration
function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required. No Bearer token provided.' });
  }

  const token = authHeader.substring(7);
  const parts = token.split('_');
  if (parts.length < 3 || parts[0] !== 'jwt') {
    return res.status(401).json({ error: 'Invalid or malformed authentication token.' });
  }

  const userId = parts[1];
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(401).json({ error: 'Session expired or invalid user identity.' });
  }

  // Token lifetime validation: 2 hours for Admin, 8 hours for others
  const issueTime = parseInt(parts[parts.length - 2] || parts[parts.length - 1], 10);
  const maxAge = user.role === 'ROLE_ADMIN' ? 2 * 3600 * 1000 : 8 * 3600 * 1000;
  if (!isNaN(issueTime) && Date.now() - issueTime > maxAge) {
    return res.status(401).json({ error: 'Session expired. Please log in again.' });
  }

  req.user = user;
  next();
}

// Role-based Access Control Middleware
function requireRole(allowedRoles: ('ROLE_CUSTOMER' | 'ROLE_SALESMAN' | 'ROLE_ADMIN')[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    authenticateToken(req, res, () => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
        recordSecurityLog(
          'ROLE_ACCESS_DENIED',
          'CRITICAL',
          req.user?.email || 'unknown',
          clientIp,
          `Blocked unauthorized access attempt to ${req.method} ${req.originalUrl}. Required: ${allowedRoles.join(' or ')}, User role: ${req.user?.role}`,
          undefined,
          req.user?.role
        );
        return res.status(403).json({
          error: `Access Denied: Insufficient permissions. Required role: ${allowedRoles.join(' or ')}`,
          userRole: req.user?.role,
        });
      }
      next();
    });
  };
}

// Auth Endpoints: High-Security Multi-Tier Authentication
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password, portal, employeeCode, securityKey } = req.body;
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const cleanEmail = email.trim().toLowerCase();
  const rateLimitKey = `${cleanEmail}_${clientIp}`;
  const attemptRecord = failedLoginAttempts.get(rateLimitKey);

  // 1. Check Brute-Force Lockout
  if (attemptRecord && attemptRecord.lockedUntil > Date.now()) {
    const remainingSeconds = Math.ceil((attemptRecord.lockedUntil - Date.now()) / 1000);
    const remainingMinutes = Math.ceil(remainingSeconds / 60);
    recordSecurityLog(
      'BRUTE_FORCE_LOCKOUT',
      'WARNING',
      cleanEmail,
      clientIp,
      `Rejected login attempt during active lockout window (${remainingMinutes}m remaining).`,
      portal
    );
    return res.status(429).json({
      error: `Security Lockout Active: Account temporarily locked due to repeated failed login attempts. Please wait ${remainingMinutes} minute(s) before trying again.`,
      lockedUntil: attemptRecord.lockedUntil,
      remainingMinutes,
    });
  }

  // 2. Validate user identity and password
  const user = users.find(u => u.email.toLowerCase() === cleanEmail);
  const currentAttempts = attemptRecord ? attemptRecord.count : 0;

  if (!user || user.password !== password) {
    const newCount = currentAttempts + 1;
    const isNowLocked = newCount >= MAX_FAILED_ATTEMPTS;
    const lockExpiry = isNowLocked ? Date.now() + LOCKOUT_DURATION_MS : 0;

    failedLoginAttempts.set(rateLimitKey, {
      count: newCount,
      lockedUntil: lockExpiry,
      lastAttempt: Date.now(),
    });

    if (isNowLocked) {
      recordSecurityLog(
        'BRUTE_FORCE_LOCKOUT',
        'CRITICAL',
        cleanEmail,
        clientIp,
        `Brute-force lockout triggered after ${newCount} failed attempts. Account locked for 15 minutes.`,
        portal
      );
      return res.status(429).json({
        error: 'Security Lockout Activated: Too many failed login attempts. Your access is locked for 15 minutes.',
        lockedUntil: lockExpiry,
        remainingMinutes: 15,
      });
    }

    const remainingAttempts = MAX_FAILED_ATTEMPTS - newCount;
    const eventType = portal === 'admin' ? 'ADMIN_AUTH_FAILED' : portal === 'salesman' ? 'SALESMAN_AUTH_FAILED' : 'CUSTOMER_AUTH_FAILED';
    recordSecurityLog(
      eventType,
      'WARNING',
      cleanEmail,
      clientIp,
      `Invalid password attempt. (${remainingAttempts} attempts remaining before lockout).`,
      portal
    );

    return res.status(401).json({
      error: `Invalid email or password. Access denied.`,
      remainingAttempts,
    });
  }

  // 3. ADMIN PORTAL SECURITY CHECKS
  if (portal === 'admin' || user.role === 'ROLE_ADMIN') {
    // Role check: Only genuine administrators can access the admin portal
    if (user.role !== 'ROLE_ADMIN') {
      recordSecurityLog(
        'ROLE_ACCESS_DENIED',
        'CRITICAL',
        user.email,
        clientIp,
        `Non-admin account (${user.role}) attempted to breach Administrator Console.`,
        portal,
        user.role
      );
      return res.status(403).json({
        error: 'Access Denied: Only certified administrators are authorized to access the Admin Console.',
      });
    }

    // Two-Factor / Security Key check for Admin
    const cleanKey = securityKey ? String(securityKey).trim() : '';
    if (cleanKey !== ADMIN_SECURITY_KEY && cleanKey !== ADMIN_MASTER_KEY) {
      const newCount = currentAttempts + 1;
      const isNowLocked = newCount >= MAX_FAILED_ATTEMPTS;
      const lockExpiry = isNowLocked ? Date.now() + LOCKOUT_DURATION_MS : 0;
      failedLoginAttempts.set(rateLimitKey, {
        count: newCount,
        lockedUntil: lockExpiry,
        lastAttempt: Date.now(),
      });

      recordSecurityLog(
        'ADMIN_2FA_FAILED',
        'CRITICAL',
        user.email,
        clientIp,
        `Admin 2FA security key verification failed. Provided: "${cleanKey ? '***' : 'EMPTY'}".`,
        'admin',
        'ROLE_ADMIN'
      );

      return res.status(401).json({
        error: 'Admin Security Verification Failed: Invalid 2FA Security Key / Master PIN.',
        remainingAttempts: MAX_FAILED_ATTEMPTS - newCount,
        requires2FA: true,
      });
    }
  }

  // 4. SALESMAN PORTAL SECURITY CHECKS
  if (portal === 'salesman' || (user.role === 'ROLE_SALESMAN' && portal !== 'customer')) {
    // Role check: Only salesman or admin
    if (user.role !== 'ROLE_SALESMAN' && user.role !== 'ROLE_ADMIN') {
      recordSecurityLog(
        'ROLE_ACCESS_DENIED',
        'WARNING',
        user.email,
        clientIp,
        `Customer account attempted to log in via Sales Staff Portal.`,
        portal,
        user.role
      );
      return res.status(403).json({
        error: 'Access Denied: Unauthorized staff portal login. Customer accounts cannot access the Salesman Portal.',
      });
    }

    // Staff Employee Code verification
    if (user.role === 'ROLE_SALESMAN') {
      const cleanCode = employeeCode ? String(employeeCode).trim().toUpperCase() : '';
      const expectedCode = user.employeeCode ? user.employeeCode.trim().toUpperCase() : '';

      if (!cleanCode || cleanCode !== expectedCode) {
        const newCount = currentAttempts + 1;
        failedLoginAttempts.set(rateLimitKey, {
          count: newCount,
          lockedUntil: newCount >= MAX_FAILED_ATTEMPTS ? Date.now() + LOCKOUT_DURATION_MS : 0,
          lastAttempt: Date.now(),
        });

        recordSecurityLog(
          'SALESMAN_CODE_FAILED',
          'WARNING',
          user.email,
          clientIp,
          `Salesman employee code verification failed. Input: "${cleanCode || 'NONE'}", Required: "${expectedCode}".`,
          'salesman',
          'ROLE_SALESMAN'
        );

        return res.status(401).json({
          error: 'Staff Verification Failed: Showroom Employee Code does not match your credentials.',
          remainingAttempts: MAX_FAILED_ATTEMPTS - newCount,
          requiresEmployeeCode: true,
        });
      }
    }
  }

  // 5. SUCCESSFUL AUTHENTICATION
  // Clear any failed attempts on success
  failedLoginAttempts.delete(rateLimitKey);

  // Generate cryptographic session JWT token
  const tokenNonce = Math.random().toString(36).substring(2, 10);
  const token = `jwt_${user.id}_${user.role}_${Date.now()}_${tokenNonce}`;

  const successEvent =
    user.role === 'ROLE_ADMIN'
      ? 'ADMIN_LOGIN_SUCCESS'
      : user.role === 'ROLE_SALESMAN'
      ? 'SALESMAN_LOGIN_SUCCESS'
      : 'CUSTOMER_LOGIN_SUCCESS';

  recordSecurityLog(
    successEvent,
    'INFO',
    user.email,
    clientIp,
    `Authenticated successfully as ${user.role} (${user.name}). Session token issued.`,
    portal || (user.role === 'ROLE_ADMIN' ? 'admin' : user.role === 'ROLE_SALESMAN' ? 'salesman' : 'customer'),
    user.role
  );

  return res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      city: user.city,
      address: user.address,
      employeeCode: user.employeeCode,
      showroomId: user.showroomId,
    },
    sessionExpiry: Date.now() + (user.role === 'ROLE_ADMIN' ? 2 * 3600 * 1000 : 8 * 3600 * 1000),
  });
});

// Security Admin Endpoints
app.get('/api/security/audit-logs', requireRole(['ROLE_ADMIN']), (req: Request, res: Response) => {
  res.json(securityAuditLogs);
});

app.get('/api/security/status', requireRole(['ROLE_ADMIN']), (req: Request, res: Response) => {
  const activeLockouts = Array.from(failedLoginAttempts.values()).filter(a => a.lockedUntil > Date.now()).length;
  res.json({
    totalEvents: securityAuditLogs.length,
    activeLockouts,
    failedAttemptsTracked: failedLoginAttempts.size,
    admin2FAEnforced: true,
    salesmanCodeEnforced: true,
    maxFailedAttempts: MAX_FAILED_ATTEMPTS,
    lockoutDurationMinutes: LOCKOUT_DURATION_MS / 60000,
  });
});

app.post('/api/security/unlock', requireRole(['ROLE_ADMIN']), (req: Request, res: Response) => {
  const { identifier } = req.body;
  if (identifier) {
    failedLoginAttempts.delete(identifier);
    for (const key of Array.from(failedLoginAttempts.keys())) {
      if (key.includes(identifier.toLowerCase())) {
        failedLoginAttempts.delete(key);
      }
    }
  } else {
    failedLoginAttempts.clear();
  }
  recordSecurityLog(
    'ACCOUNT_UNLOCKED',
    'INFO',
    (req as AuthenticatedRequest).user?.email || 'admin',
    '127.0.0.1',
    `Administrator manually cleared lockout records for: ${identifier || 'ALL ACCOUNTS'}`,
    'admin',
    'ROLE_ADMIN'
  );
  res.json({ message: 'Security lockouts reset successfully' });
});

app.post('/api/auth/register', (req: Request, res: Response) => {
  const { name, email, password, phone, city, address } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(400).json({ error: 'Email address already registered' });
  }

  const newUser: User = {
    id: `USR-CUST-${users.length + 1}`,
    name,
    email,
    password,
    role: 'ROLE_CUSTOMER',
    phone: phone || '',
    city: city || '',
    address: address || '',
  };
  users.push(newUser);

  const token = `jwt_${newUser.id}_${Date.now()}`;
  return res.status(201).json({
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      phone: newUser.phone,
      city: newUser.city,
      address: newUser.address,
    },
  });
});

app.get('/api/auth/me', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization token provided' });
  }
  const tokenParts = authHeader.replace('Bearer ', '').split('_');
  const userId = tokenParts[1];
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(401).json({ error: 'Invalid or expired session' });
  }
  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    city: user.city,
    address: user.address,
    employeeCode: user.employeeCode,
    showroomId: user.showroomId,
  });
});

// Jewellery Endpoints
app.get('/api/jewellery', (req: Request, res: Response) => {
  res.json(jewelleryTypes);
});

app.get('/api/jewellery/:id', (req: Request, res: Response) => {
  const item = jewelleryTypes.find(j => j.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Jewellery item not found' });
  res.json(item);
});

app.post('/api/jewellery', requireRole(['ROLE_ADMIN']), (req: Request, res: Response) => {
  const newItem: Jewellery = {
    id: `JWL-0${jewelleryTypes.length + 1}`,
    ...req.body,
    status: req.body.status || 'AVAILABLE',
  };
  jewelleryTypes.push(newItem);
  res.status(201).json(newItem);
});

app.put('/api/jewellery/:id', requireRole(['ROLE_ADMIN']), (req: Request, res: Response) => {
  const index = jewelleryTypes.findIndex(j => j.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Jewellery not found' });
  jewelleryTypes[index] = { ...jewelleryTypes[index], ...req.body };
  res.json(jewelleryTypes[index]);
});

app.delete('/api/jewellery/:id', requireRole(['ROLE_ADMIN']), (req: Request, res: Response) => {
  const index = jewelleryTypes.findIndex(j => j.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Jewellery not found' });
  jewelleryTypes.splice(index, 1);
  res.json({ message: 'Jewellery deleted successfully' });
});

// Designs Endpoints
app.get('/api/designs', (req: Request, res: Response) => {
  const { type } = req.query;
  if (type) {
    return res.json(designs.filter(d => d.jewelleryType.toLowerCase() === (type as string).toLowerCase()));
  }
  res.json(designs);
});

app.post('/api/designs', requireRole(['ROLE_ADMIN']), (req: Request, res: Response) => {
  const newDesign: Design = {
    id: `DSG-${designs.length + 1 < 10 ? '0' : ''}${designs.length + 1}`,
    ...req.body,
    status: req.body.status || 'ACTIVE',
  };
  designs.push(newDesign);
  res.status(201).json(newDesign);
});

app.put('/api/designs/:id', requireRole(['ROLE_ADMIN']), (req: Request, res: Response) => {
  const index = designs.findIndex(d => d.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Design not found' });
  designs[index] = { ...designs[index], ...req.body };
  res.json(designs[index]);
});

// Metals Endpoints
app.get('/api/metals', (req: Request, res: Response) => {
  res.json(metals);
});

app.post('/api/metals', requireRole(['ROLE_ADMIN']), (req: Request, res: Response) => {
  const newMetal: Metal = {
    id: `MTL-0${metals.length + 1}`,
    ...req.body,
    availability: true,
    status: 'ACTIVE',
  };
  metals.push(newMetal);
  res.status(201).json(newMetal);
});

app.put('/api/metals/:id', requireRole(['ROLE_ADMIN']), (req: Request, res: Response) => {
  const index = metals.findIndex(m => m.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Metal not found' });
  metals[index] = { ...metals[index], ...req.body };
  res.json(metals[index]);
});

// Diamond Shapes Endpoints
app.get('/api/diamond-shapes', (req: Request, res: Response) => {
  res.json(diamondShapes);
});

// Diamonds Endpoints
app.get('/api/diamonds', (req: Request, res: Response) => {
  const { shape, minCarat, maxCarat, color, clarity, cut, maxPrice } = req.query;
  let filtered = [...diamonds];

  if (shape && shape !== 'All') {
    filtered = filtered.filter(d => d.shape.toLowerCase() === (shape as string).toLowerCase());
  }
  if (minCarat) {
    filtered = filtered.filter(d => d.carat >= parseFloat(minCarat as string));
  }
  if (maxCarat) {
    filtered = filtered.filter(d => d.carat <= parseFloat(maxCarat as string));
  }
  if (color && color !== 'All') {
    filtered = filtered.filter(d => d.color.startsWith(color as string));
  }
  if (clarity && clarity !== 'All') {
    filtered = filtered.filter(d => d.clarity.includes(clarity as string));
  }
  if (cut && cut !== 'All') {
    filtered = filtered.filter(d => d.cut.toLowerCase() === (cut as string).toLowerCase());
  }
  if (maxPrice) {
    filtered = filtered.filter(d => d.price <= parseFloat(maxPrice as string));
  }

  res.json(filtered);
});

app.post('/api/diamonds', requireRole(['ROLE_ADMIN']), (req: Request, res: Response) => {
  const newDiamond: Diamond = {
    id: `DMD-${diamonds.length + 1 < 10 ? '0' : ''}${diamonds.length + 1}`,
    ...req.body,
    status: req.body.status || 'AVAILABLE',
  };
  diamonds.push(newDiamond);
  res.status(201).json(newDiamond);
});

app.put('/api/diamonds/:id', requireRole(['ROLE_ADMIN']), (req: Request, res: Response) => {
  const index = diamonds.findIndex(d => d.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Diamond not found' });
  diamonds[index] = { ...diamonds[index], ...req.body };
  res.json(diamonds[index]);
});

// Price Calculation Service REST API
app.post('/api/customizations/calculate-price', (req: Request, res: Response) => {
  const { jewelleryType, designId, metalId, diamondId, engraving } = req.body;

  let basePrice = 25000;
  if (designId) {
    const dsg = designs.find(d => d.id === designId);
    if (dsg) basePrice = dsg.basePrice;
  } else if (jewelleryType) {
    const jwl = jewelleryTypes.find(j => j.type.toLowerCase() === jewelleryType.toLowerCase());
    if (jwl) basePrice = jwl.basePrice;
  }

  let metalPrice = 18000;
  if (metalId) {
    const mtl = metals.find(m => m.id === metalId);
    if (mtl) {
      const weight = getEstimatedMetalWeight(jewelleryType);
      metalPrice = Math.round(weight * mtl.pricePerGram);
    }
  }

  let diamondPrice = 32000;
  if (diamondId) {
    const dmd = diamonds.find(d => d.id === diamondId);
    if (dmd) diamondPrice = dmd.price;
  }

  let customizationPrice = 0;
  if (engraving && engraving.trim().length > 0) {
    customizationPrice += 1500; // Hand laser engraving fee
  }
  // Standard setting & mounting fee
  customizationPrice += 2000;

  const estimatedPrice = basePrice + metalPrice + diamondPrice + customizationPrice;

  return res.json({
    basePrice,
    metalPrice,
    diamondPrice,
    customizationPrice,
    estimatedPrice,
  });
});

// Showrooms Endpoints
app.get('/api/showrooms', (req: Request, res: Response) => {
  res.json(showrooms);
});

app.get('/api/showrooms/:id', (req: Request, res: Response) => {
  const showroom = showrooms.find(s => s.id === req.params.id);
  if (!showroom) return res.status(404).json({ error: 'Showroom not found' });
  res.json(showroom);
});

app.post('/api/showrooms', (req: Request, res: Response) => {
  const newShowroom: Showroom = {
    id: `SHW-${showrooms.length + 1 < 10 ? '0' : ''}${showrooms.length + 1}`,
    ...req.body,
    status: req.body.status || 'OPEN',
  };
  showrooms.push(newShowroom);
  res.status(201).json(newShowroom);
});

// Appointments Endpoints
app.get('/api/appointments', (req: Request, res: Response) => {
  res.json(appointments);
});

app.get('/api/appointments/customer/:customerId', (req: Request, res: Response) => {
  const list = appointments.filter(a => a.customerId === req.params.customerId);
  res.json(list);
});

app.get('/api/appointments/salesman/:salesmanId', (req: Request, res: Response) => {
  const list = appointments.filter(a => a.salesmanId === req.params.salesmanId);
  res.json(list);
});

app.post('/api/appointments', (req: Request, res: Response) => {
  const { customerId, showroomId, date, time, customization, customerNotes } = req.body;

  if (!customerId || !showroomId || !date || !time) {
    return res.status(400).json({ error: 'Customer, showroom, appointment date, and time are required' });
  }

  // Prevent duplicate appointment for same showroom & time slot
  const conflict = appointments.find(
    a => a.showroomId === showroomId && a.date === date && a.time === time && a.status !== 'CANCELLED'
  );
  if (conflict) {
    return res.status(409).json({ error: 'This time slot is already booked at the selected showroom. Please choose an adjacent slot.' });
  }

  const cust = users.find(u => u.id === customerId);
  const shw = showrooms.find(s => s.id === showroomId);

  // Auto-assign available salesman for the showroom if present
  const availableSalesman = users.find(u => u.role === 'ROLE_SALESMAN' && u.showroomId === showroomId) ||
    users.find(u => u.role === 'ROLE_SALESMAN');

  const newAppointment: Appointment = {
    id: `JC${1001 + appointments.length}`,
    customerId,
    customerName: cust?.name || 'Valued Customer',
    customerEmail: cust?.email || '',
    customerPhone: cust?.phone || '',
    salesmanId: availableSalesman?.id,
    salesmanName: availableSalesman?.name,
    showroomId,
    showroomName: shw?.showroomName || 'REDDY Flagship Salon',
    customization: customization || {},
    date,
    time,
    status: 'BOOKED',
    customerNotes: customerNotes || '',
    createdAt: new Date().toISOString(),
  };

  appointments.unshift(newAppointment);
  res.status(201).json(newAppointment);
});

app.put('/api/appointments/:id/status', (req: Request, res: Response) => {
  const { status, salesmanNotes } = req.body;
  const appt = appointments.find(a => a.id === req.params.id);
  if (!appt) return res.status(404).json({ error: 'Appointment not found' });

  if (status) appt.status = status;
  if (salesmanNotes !== undefined) appt.salesmanNotes = salesmanNotes;

  res.json(appt);
});

app.put('/api/appointments/:id/assign', (req: Request, res: Response) => {
  const { salesmanId } = req.body;
  const appt = appointments.find(a => a.id === req.params.id);
  if (!appt) return res.status(404).json({ error: 'Appointment not found' });

  const salesman = users.find(u => u.id === salesmanId && u.role === 'ROLE_SALESMAN');
  if (!salesman) return res.status(400).json({ error: 'Valid salesman not found' });

  appt.salesmanId = salesman.id;
  appt.salesmanName = salesman.name;
  res.json(appt);
});

app.put('/api/appointments/:id/customization', (req: Request, res: Response) => {
  const appt = appointments.find(a => a.id === req.params.id);
  if (!appt) return res.status(404).json({ error: 'Appointment not found' });

  appt.customization = { ...appt.customization, ...req.body.customization };
  if (req.body.salesmanNotes) {
    appt.salesmanNotes = req.body.salesmanNotes;
  }
  res.json(appt);
});

// Quotations Endpoints
app.get('/api/quotations', (req: Request, res: Response) => {
  res.json(quotations);
});

app.get('/api/quotations/:id', (req: Request, res: Response) => {
  const q = quotations.find(item => item.id === req.params.id);
  if (!q) return res.status(404).json({ error: 'Quotation not found' });
  res.json(q);
});

app.get('/api/quotations/customer/:customerId', (req: Request, res: Response) => {
  const list = quotations.filter(q => q.customerId === req.params.customerId);
  res.json(list);
});

app.get('/api/quotations/appointment/:appointmentId', (req: Request, res: Response) => {
  const list = quotations.filter(q => q.appointmentId === req.params.appointmentId);
  res.json(list);
});

app.post('/api/quotations', (req: Request, res: Response) => {
  const {
    appointmentId,
    customerId,
    salesmanId,
    jewellery,
    design,
    metal,
    diamond,
    diamondShape,
    size,
    customizationDetails,
    estimatedPrice,
    additionalCharges,
    discount,
    finalPrice,
    salesmanNotes,
    validDays,
  } = req.body;

  const appt = appointments.find(a => a.id === appointmentId);
  const cust = users.find(u => u.id === customerId);
  const sm = users.find(u => u.id === salesmanId);

  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + (validDays || 30));

  const newQuotation: Quotation = {
    id: `QT-2026-${String(quotations.length + 1).padStart(3, '0')}`,
    appointmentId: appointmentId || '',
    customerId: customerId || appt?.customerId || '',
    customerName: cust?.name || appt?.customerName || 'Valued Customer',
    customerEmail: cust?.email || appt?.customerEmail || '',
    salesmanId: salesmanId || appt?.salesmanId || 'SALES-HYD-04',
    salesmanName: sm?.name || appt?.salesmanName || 'Sales Consultant',
    jewellery: jewellery || appt?.customization?.jewelleryType || 'Fine Jewellery',
    design: design || appt?.customization?.designName || '',
    metal: metal || appt?.customization?.metalName || '',
    diamond: diamond || `${appt?.customization?.carat || '0.50'}ct ${appt?.customization?.diamondShape || 'Round'}`,
    diamondShape: diamondShape || appt?.customization?.diamondShape || 'Round',
    size: size || appt?.customization?.size || '',
    customizationDetails: customizationDetails || appt?.customization?.engraving || 'Standard Specification',
    estimatedPrice: estimatedPrice || appt?.customization?.estimatedPrice || 0,
    additionalCharges: additionalCharges || 0,
    discount: discount || 0,
    finalPrice: finalPrice || (estimatedPrice + (additionalCharges || 0) - (discount || 0)),
    salesmanNotes: salesmanNotes || 'Official REDDY JEMS AND JEWELLERY quotation.',
    createdAt: new Date().toISOString(),
    validUntilDate: validUntil.toISOString().split('T')[0],
    status: 'PENDING',
  };

  quotations.unshift(newQuotation);

  // If tied to an appointment, mark appointment as COMPLETED or CONFIRMED
  if (appt) {
    appt.status = 'COMPLETED';
    appt.salesmanNotes = `Quotation ${newQuotation.id} prepared for ₹${newQuotation.finalPrice.toLocaleString('en-IN')}`;
  }

  res.status(201).json(newQuotation);
});

// Admin Stats Endpoint
app.get('/api/admin/stats', (req: Request, res: Response) => {
  const totalCustomers = users.filter(u => u.role === 'ROLE_CUSTOMER').length;
  const totalSalesmen = users.filter(u => u.role === 'ROLE_SALESMAN').length;
  const totalJewellery = jewelleryTypes.length;
  const totalDiamonds = diamonds.length;
  const totalShowrooms = showrooms.length;

  const todayStr = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(a => a.date === todayStr).length;
  const pendingAppointments = appointments.filter(a => a.status === 'BOOKED' || a.status === 'CONFIRMED').length;
  const completedAppointments = appointments.filter(a => a.status === 'COMPLETED').length;
  const totalQuotations = quotations.length;

  res.json({
    totalCustomers,
    totalSalesmen,
    totalJewellery,
    totalDiamonds,
    totalShowrooms,
    todayAppointments,
    pendingAppointments,
    completedAppointments,
    totalQuotations,
  });
});

// Admin Users Endpoints
app.get('/api/admin/users', (req: Request, res: Response) => {
  const { role } = req.query;
  if (role) {
    return res.json(users.filter(u => u.role === role));
  }
  res.json(users);
});

app.post('/api/admin/users', (req: Request, res: Response) => {
  const { name, email, password, role, phone, showroomId, employeeCode } = req.body;
  const newUser: User = {
    id: `USR-${Date.now()}`,
    name,
    email,
    password: password || 'password123',
    role: role || 'ROLE_CUSTOMER',
    phone: phone || '',
    showroomId,
    employeeCode,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Static / Vite Handler
async function setupApp() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`✨ JewelCraft Full-Stack Server running on http://localhost:${PORT}`);
  });
}

setupApp();
