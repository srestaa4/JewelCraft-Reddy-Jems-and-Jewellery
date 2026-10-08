# JewelCraft – Personalized Jewellery Design & Showroom Appointment Platform

**Brand Identity**: REDDY JEMS AND JEWELLERY  
**Platform**: JewelCraft Bespoke Customizer & Showroom CRM  

---

## 1. Project Overview

JewelCraft is a luxury full-stack bespoke jewellery customization and showroom consultation platform created for **REDDY JEMS AND JEWELLERY**. 

Unlike conventional e-commerce stores, JewelCraft **does not have a shopping cart, checkout, or online payments**. Instead, it focuses on high-touch luxury bespoke hospitality:
1. **Customization**: Choosing jewellery types, artisanal mountings, hallmarked gold/platinum alloys, certified natural diamonds (shape, 4Cs, carat), dimensions, and personalized laser engravings.
2. **Transparent Price Estimation**: Real-time server-side price calculation through REST API breaking down metal weight, live daily bullion rates, diamond value, and artisan setting fees.
3. **Showroom Appointments**: Booking private VIP lounge appointments at flagship salons across India (Hyderabad, Mumbai, Bengaluru, New Delhi) with complete configuration saved and transmitted to the salesman.
4. **Salesman Consultation & Quotation**: Senior sales consultants view the exact customer configuration, consult face-to-face, adjust specifications if needed, and issue an official certified final quotation.

---

## 2. Technology Stack & Architecture

### Frontend
- **Framework**: React.js 19 with Vite & TypeScript
- **Styling**: Tailwind CSS v4 with custom luxury palette (`#FAF7F0` Cream background, `#B8863B` Primary Gold, `#8B5E20` Dark Gold, `#171717` Dark text)
- **Typography**: Cormorant Garamond / Playfair Display (Serif headings) and Plus Jakarta Sans (Clean modern body)
- **Routing**: React Router DOM (v7) with role-based protected routes (`ProtectedRoute`)
- **API Client**: Axios with JWT request interceptors
- **Icons**: Lucide React

### Backend (Full-Stack Engine)
- **Spring Boot**: Java 17, Spring Boot 3, Spring Web, Spring Data JPA, Spring Security, JWT authentication, Maven
- **Express Full-Stack Server** (`server.ts`): Built-in full-stack Express REST API mounted with Vite middlewares on port 3000 for immediate live interaction and evaluation in the AI Studio environment.
- **Database**: MySQL relational schema (`schema.sql` and `application.properties`) with in-memory seeded full-stack persistence.

### Architecture Flow
```
React.js Frontend
       ↓ (Axios REST calls with Bearer JWT)
REST API Controllers (/api/*)
       ↓
Service / Business Logic (PriceCalculationService, AppointmentService, QuotationService)
       ↓
Spring Data JPA / Relational Repositories
       ↓
MySQL Database (Users, Customizations, Showrooms, Appointments, Quotations)
```

---

## 3. User Roles & Default Test Accounts

The platform implements strict Role-Based Access Control (RBAC):

| Role | Email | Password | Dashboard Features |
| :--- | :--- | :--- | :--- |
| **ROLE_CUSTOMER** | `ananya@jewelcraft.com` | `password123` | Explore jewellery, customize in 3D studio, calculate estimated prices, book showroom appointments, view saved configurations & final quotations |
| **ROLE_SALESMAN** | `rajesh.sales@jewelcraft.com` | `password123` | Showroom CRM, view customer full configurations, modify requirements in consultation desk, generate certified final quotations |
| **ROLE_ADMIN** | `admin@jewelcraft.com` | `admin123` | Enterprise management for jewellery archetypes, mounting designs, diamond inventory, metal bullion rates, showrooms, appointments & staff dispatch |

*Tip: A quick demo role-switcher is embedded in the top navbar and login page for one-click testing across all three personas.*

---

## 4. Key Workflows & Features

### A. Customer Customization Flow
1. **Explore Jewellery**: Rings, Necklaces, Earrings, Bracelets, and Pendants.
2. **Choose Mounting Design**: Solitaire, Halo Elegance, Vintage Filigree, Modern Bezel, Three-Stone Royal, etc.
3. **Choose Precious Metal**: 18K Yellow Gold, 22K Traditional Gold, 18K Rose Gold, 18K White Gold, 950 Platinum with live bullion rates per gram.
4. **Choose Diamond & Shape**: Round, Princess, Oval, Emerald, Pear, Marquise, Cushion, Radiant, and Heart with 4Cs (Cut, Color, Clarity, Carat).
5. **Personalize**: Size dimensions, laser engraving vow inscription, and consultation notes.
6. **Live Valuation REST API** (`POST /api/customizations/calculate-price`):
   ```json
   {
     "basePrice": 25000,
     "metalPrice": 25200,
     "diamondPrice": 32000,
     "customizationPrice": 3500,
     "estimatedPrice": 85700
   }
   ```
7. **Book Appointment**: Select flagship salon, date, and available slot (prevents duplicate slot conflicts). Complete configuration is saved with appointment `#JC1001`.
8. **Confirmation Voucher**: Generates official reservation slip with printable voucher.

### B. Salesman Consultation & Quotation Flow
1. Salesman logs into the **CRM Dashboard** to view today's appointments and pending consultations.
2. Opens the customer's appointment to view the **COMPLETE configuration** (Jewellery, Design, Metal, Diamond 4Cs, Size, Engraving, Estimated Price, Customer Notes).
3. Enters the **Consultation Workspace**: discusses requirements face-to-face and modifies specifications if customer requests adjustments.
4. Generates **Final Quotation**: applies making charges, certification fees, courtesy discounts, and sets validity days.
5. Customer instantly sees the **Final Quotation** in their private portal.

---

## 5. Directory Structure & Project Separation

The project provides complete, separated codebases for **Frontend** and **Backend**, as well as the unified full-stack live preview server:

```
├── frontend/                              # 1. STANDALONE REACT.JS FRONTEND
│   ├── package.json                      # Frontend dependencies & scripts
│   ├── vite.config.ts                    # Vite build configuration
│   ├── tsconfig.json                     # TypeScript configuration
│   ├── index.html                        # HTML5 entry point
│   ├── README.md                         # Frontend setup guide
│   ├── public/                           # Logos, jewellery visuals, showroom assets
│   └── src/
│       ├── components/                   # Navbar, Footer, JewelleryPreviewCanvas, Cards
│       ├── context/                      # AuthContext, CustomizationContext
│       ├── pages/                        # Customer, Salesman, and Admin dashboards
│       ├── services/                     # Axios REST client with JWT interceptor
│       ├── App.tsx                       # React Router configuration
│       ├── main.tsx                      # React root mount
│       └── index.css                     # Tailwind CSS v4 luxury theme
│
├── backend/                               # 2. STANDALONE SPRING BOOT 3 BACKEND
│   ├── pom.xml                           # Maven project descriptor
│   ├── README.md                         # Backend setup & MySQL guide
│   └── src/
│       ├── main/
│       │   ├── java/com/jewelcraft/
│       │   │   ├── JewelCraftApplication.java
│       │   │   ├── controller/          # Auth, Jewellery, Design, Metal, Diamond, Showroom, Appointment, Quotation, Admin
│       │   │   ├── service/             # PriceCalculationService & Business Logic
│       │   │   ├── repository/          # Spring Data JPA Repositories
│       │   │   ├── entity/              # User, Jewellery, Design, Metal, Diamond, Showroom, Appointment, Quotation
│       │   │   ├── dto/                 # PriceCalculationRequest, PriceCalculationResponse
│       │   │   ├── security/            # SecurityConfig, JWT handling
│       │   │   └── config/              # CorsConfig (CORS allowed for frontend)
│       │   └── resources/
│       │       ├── application.properties # Spring Boot & MySQL configuration
│       │       ├── schema.sql           # MySQL DDL table creation script
│       │       └── data.sql             # Initial demo data seed script
│
├── server.ts                            # Full-stack Node/Express engine for AI Studio live preview
├── package.json                         # Root package manager
└── README.md
```

---

## 6. How to Run Separately

### Running the Frontend Separately
```bash
cd frontend
npm install
npm run dev
```
The frontend starts on `http://localhost:5173` (or `http://localhost:3000`). It connects to the Spring Boot REST API using Axios.

### Running the Backend Separately (Spring Boot + MySQL)
1. Ensure MySQL is running on `localhost:3306` with database `jewelcraft`:
```sql
CREATE DATABASE jewelcraft;
```
2. Run Spring Boot:
```bash
cd backend
mvn spring-boot:run
```
The Spring Boot REST API will be live at `http://localhost:8080/api`.

### Running in Current Container Environment
```bash
npm run dev
```
Runs `server.ts` mounting both the full-stack REST API and Vite middlewares on port 3000.

---

## 7. REST API Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Authenticate customer/salesman/admin & return JWT |
| `POST` | `/api/auth/register` | Register new customer account |
| `GET` | `/api/auth/me` | Fetch active user profile from JWT |
| `GET` | `/api/jewellery` | List all jewellery archetypes |
| `GET` | `/api/designs` | List mounting designs (filter by `type`) |
| `GET` | `/api/metals` | List precious metals & live bullion rates |
| `GET` | `/api/diamonds` | Filter loose natural certified diamonds |
| `GET` | `/api/diamond-shapes` | List 9 standard diamond shapes |
| `POST` | `/api/customizations/calculate-price` | Server-side price calculation formula |
| `GET` | `/api/showrooms` | List all flagship showroom locations |
| `POST` | `/api/appointments` | Book appointment with complete configuration |
| `GET` | `/api/appointments/customer/:id` | Fetch customer appointments |
| `GET` | `/api/appointments/salesman/:id` | Fetch salesman appointments |
| `PUT` | `/api/appointments/:id/status` | Update appointment status |
| `PUT` | `/api/appointments/:id/assign` | Assign salesman to appointment |
| `POST` | `/api/quotations` | Generate certified final quotation |
| `GET` | `/api/quotations/customer/:id` | Fetch quotations received by customer |
| `GET` | `/api/admin/stats` | Dashboard statistics for executive portal |

---
*Created for REDDY JEMS AND JEWELLERY · JewelCraft Bespoke Experience.*
