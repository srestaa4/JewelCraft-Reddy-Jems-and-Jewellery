import React, { useState } from 'react';
import {
  Code2,
  Server,
  FolderTree,
  Terminal,
  Database,
  Layers,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export const ProjectArchitecture: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend'>('frontend');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const frontendTree = `frontend/
├── package.json               # React 19, Vite, Tailwind CSS v4, Axios, React Router
├── vite.config.ts             # Vite build & alias configuration
├── tsconfig.json              # TypeScript compilation rules
├── index.html                 # HTML5 entry with Cormorant Garamond & Plus Jakarta Sans
├── README.md                  # Frontend setup guide
├── public/
│   └── images/                # Official REDDY logo, jewellery items, showroom images
└── src/
    ├── components/
    │   ├── Navbar.tsx         # 3-Zone top navigation with secure authentication badge & portal links
    │   ├── Footer.tsx         # Brand footer with flagship addresses
    │   ├── ProtectedRoute.tsx # 403 Security Clearance Guard (Blocks unauthorized elevation)
    │   ├── JewelleryPreviewCanvas.tsx # Dynamic metal & diamond visualizer
    │   ├── PriceSummary.tsx   # Itemized valuation card
    │   ├── JewelleryCard.tsx  # Product category cards
    │   ├── DesignCard.tsx     # Mounting design selector
    │   ├── MetalCard.tsx      # Gold/Platinum alloy swatches
    │   ├── DiamondCard.tsx    # 4Cs certified diamond cards
    │   ├── AppointmentCard.tsx# Full configuration inspect card
    │   └── Sidebar.tsx        # Role-based dashboard drawer
    ├── context/
    │   ├── AuthContext.tsx    # JWT session state, credential validation (no bypass)
    │   └── CustomizationContext.tsx # Live draft state & price recalculation
    ├── pages/
    │   ├── Home.tsx           # Luxury homepage with 9-step flow
    │   ├── Showrooms.tsx      # Flagship salon directory
    │   ├── auth/              # Multi-tier Login.tsx (Admin 2FA & Staff Badge) & Register.tsx
    │   ├── customer/          # Studio, Appointments, Quotation viewer
    │   ├── salesman/          # CRM Dashboard, Consultation desk, Quotation generator
    │   └── admin/             # Master catalog administration & AdminSecurity.tsx (Live audit trail)
    └── services/
        ├── api.ts             # Axios client with Authorization: Bearer JWT interceptor
        ├── authService.ts     # Multi-tier login, 2FA, security audit logs, lockout reset
        ├── jewelleryService.ts# Jewellery & price calculation API
        ├── diamondService.ts  # Diamond filter queries
        ├── appointmentService.ts # Appointment booking & status APIs
        └── quotationService.ts# Formal quotation APIs`;

  const backendTree = `backend/
├── pom.xml                    # Maven: Spring Boot 3.2.3, Web, Data JPA, Security, MySQL
├── README.md                  # Spring Boot installation & MySQL guide
└── src/
    └── main/
        ├── java/com/jewelcraft/
        │   ├── JewelCraftApplication.java   # Spring Boot entry point
        │   ├── controller/
        │   │   ├── AuthController.java      # POST /api/auth/login, register, me
        │   │   ├── JewelleryController.java # GET, POST, PUT, DELETE /api/jewellery
        │   │   ├── DesignController.java    # GET, POST /api/designs
        │   │   ├── MetalController.java     # GET, PUT /api/metals (live bullion rates)
        │   │   ├── DiamondController.java   # GET, POST /api/diamonds
        │   │   ├── CustomizationController.java # POST /api/customizations/calculate-price
        │   │   ├── ShowroomController.java  # GET, POST /api/showrooms
        │   │   ├── AppointmentController.java # POST, GET, PUT /api/appointments
        │   │   ├── QuotationController.java # POST, GET /api/quotations
        │   │   └── AdminController.java     # GET /api/admin/stats, users
        │   ├── service/
        │   │   └── PriceCalculationService.java # Formula: Base + Metal + Diamond + Setting
        │   ├── repository/
        │   │   ├── UserRepository.java      # Spring Data JPA User repository
        │   │   ├── JewelleryRepository.java # JPA Jewellery repository
        │   │   ├── DesignRepository.java    # JPA Design repository
        │   │   ├── MetalRepository.java     # JPA Metal repository
        │   │   ├── DiamondRepository.java   # JPA Diamond repository
        │   │   ├── ShowroomRepository.java  # JPA Showroom repository
        │   │   ├── AppointmentRepository.java # JPA Appointment repository (conflict checks)
        │   │   └── QuotationRepository.java # JPA Quotation repository
        │   ├── entity/
        │   │   ├── User.java                # Relational User mapping
        │   │   ├── Jewellery.java           # Jewellery table mapping
        │   │   ├── Design.java              # Design table mapping
        │   │   ├── Metal.java               # Metal table mapping
        │   │   ├── Diamond.java             # Diamond table mapping
        │   │   ├── Showroom.java            # Showroom table mapping
        │   │   ├── Appointment.java         # Appointment with full specs
        │   │   └── Quotation.java           # Official Quotation table mapping
        │   ├── dto/
        │   │   ├── PriceCalculationRequest.java
        │   │   └── PriceCalculationResponse.java
        │   ├── security/
        │   │   └── SecurityConfig.java      # CSRF disabled, CORS enabled, endpoints
        │   └── config/
        │       └── CorsConfig.java          # Cross-Origin Resource Sharing
        └── resources/
            ├── application.properties       # MySQL connection & server.port=8080
            ├── schema.sql                   # MySQL DDL table creation script
            └── data.sql                     # Initial seed data for test accounts & items`;

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#8B5E20] font-semibold">
            Full-Stack Project Separation
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#171717]">
            Frontend & Backend Architecture
          </h1>
          <p className="text-xs sm:text-sm text-[#6A5E50] leading-relaxed">
            JewelCraft provides completely separated frontend and backend project directories, allowing independent development, deployment, and testing.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-white border border-[#E8DEC8] rounded-md shadow-xs">
            <button
              onClick={() => setActiveTab('frontend')}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === 'frontend'
                  ? 'bg-[#171717] text-white shadow-xs'
                  : 'text-[#6A5E50] hover:text-[#171717]'
              }`}
            >
              <Code2 className="w-4 h-4 text-[#B8863B]" />
              <span>1. Frontend (React.js + Vite)</span>
            </button>
            <button
              onClick={() => setActiveTab('backend')}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === 'backend'
                  ? 'bg-[#171717] text-white shadow-xs'
                  : 'text-[#6A5E50] hover:text-[#171717]'
              }`}
            >
              <Server className="w-4 h-4 text-[#B8863B]" />
              <span>2. Backend (Spring Boot + MySQL)</span>
            </button>
          </div>
        </div>

        {/* Content Section */}
        {activeTab === 'frontend' ? (
          <div className="space-y-6">
            <div className="bg-white border border-[#E8DEC8] rounded-md p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#FAF7F0] pb-3">
                <div className="flex items-center gap-2">
                  <FolderTree className="w-5 h-5 text-[#B8863B]" />
                  <h3 className="font-serif text-lg font-bold text-[#171717]">
                    Frontend Directory Structure (<code className="text-[#8B5E20]">frontend/</code>)
                  </h3>
                </div>
                <button
                  onClick={() => copyToClipboard(frontendTree, 'tree-front')}
                  className="flex items-center gap-1.5 px-3 py-1 bg-[#FAF7F0] border border-[#D5C2A5] rounded text-xs font-semibold text-[#171717] hover:bg-[#EFE1C5] cursor-pointer"
                >
                  {copiedSection === 'tree-front' ? <Check className="w-3.5 h-3.5 text-[#2D6A4F]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'tree-front' ? 'Copied' : 'Copy Tree'}</span>
                </button>
              </div>

              <pre className="p-4 bg-[#171717] text-[#FAF7F0] rounded font-mono text-xs overflow-x-auto leading-relaxed">
                {frontendTree}
              </pre>
            </div>

            {/* How to Run Frontend */}
            <div className="bg-white border border-[#E8DEC8] rounded-md p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#B8863B]" />
                <h4 className="font-serif text-base font-bold text-[#171717]">
                  How to Run the Frontend Standalone
                </h4>
              </div>
              <div className="p-3 bg-[#FAF7F0] border border-[#EDE4D2] rounded font-mono text-xs text-[#171717] space-y-1">
                <div>cd frontend</div>
                <div>npm install</div>
                <div>npm run dev</div>
              </div>
              <p className="text-xs text-[#6A5E50]">
                Starts the Vite development server on <code className="bg-[#FAF7F0] px-1 rounded border">http://localhost:5173</code> (or port 3000). Connects with Axios to the Spring Boot REST API on <code className="bg-[#FAF7F0] px-1 rounded border">http://localhost:8080/api</code>.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white border border-[#E8DEC8] rounded-md p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#FAF7F0] pb-3">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-[#B8863B]" />
                  <h3 className="font-serif text-lg font-bold text-[#171717]">
                    Backend Directory Structure (<code className="text-[#8B5E20]">backend/</code>)
                  </h3>
                </div>
                <button
                  onClick={() => copyToClipboard(backendTree, 'tree-back')}
                  className="flex items-center gap-1.5 px-3 py-1 bg-[#FAF7F0] border border-[#D5C2A5] rounded text-xs font-semibold text-[#171717] hover:bg-[#EFE1C5] cursor-pointer"
                >
                  {copiedSection === 'tree-back' ? <Check className="w-3.5 h-3.5 text-[#2D6A4F]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'tree-back' ? 'Copied' : 'Copy Tree'}</span>
                </button>
              </div>

              <pre className="p-4 bg-[#171717] text-[#FAF7F0] rounded font-mono text-xs overflow-x-auto leading-relaxed">
                {backendTree}
              </pre>
            </div>

            {/* How to Run Backend */}
            <div className="bg-white border border-[#E8DEC8] rounded-md p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#B8863B]" />
                <h4 className="font-serif text-base font-bold text-[#171717]">
                  How to Run the Spring Boot Backend with MySQL
                </h4>
              </div>
              <div className="p-3 bg-[#FAF7F0] border border-[#EDE4D2] rounded font-mono text-xs text-[#171717] space-y-1">
                <div>cd backend</div>
                <div className="text-[#8A7D6B]"># 1. Ensure MySQL is running on port 3306 and database 'jewelcraft' exists</div>
                <div>mvn spring-boot:run</div>
              </div>
              <p className="text-xs text-[#6A5E50]">
                Starts Spring Boot with Spring Web, Spring Data JPA, and Spring Security on <code className="bg-[#FAF7F0] px-1 rounded border">http://localhost:8080</code>.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
