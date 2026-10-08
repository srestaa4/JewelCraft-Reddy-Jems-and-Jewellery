import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CustomizationProvider } from './context/CustomizationContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

// Public Pages
import { Home } from './pages/Home';
import { JewelleryCatalog } from './pages/customer/Jewellery';
import { CustomizeStudio } from './pages/customer/Customize';
import { ShowroomsPage } from './pages/Showrooms';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';

// Customer Pages
import { BookAppointment } from './pages/customer/BookAppointment';
import { AppointmentConfirmation } from './pages/customer/AppointmentConfirmation';
import { CustomerDashboard } from './pages/customer/CustomerDashboard';
import { MyAppointments } from './pages/customer/MyAppointments';
import { CustomerQuotation } from './pages/customer/CustomerQuotation';
import { CustomerProfile } from './pages/customer/CustomerProfile';

// Salesman Pages
import { SalesmanDashboard } from './pages/salesman/SalesmanDashboard';
import { SalesmanAppointments } from './pages/salesman/SalesmanAppointments';
import { SalesmanConsultation } from './pages/salesman/Consultation';
import { CreateQuotation } from './pages/salesman/CreateQuotation';
import { SalesmanProfile } from './pages/salesman/SalesmanProfile';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ManageJewellery } from './pages/admin/ManageJewellery';
import { ManageDesigns } from './pages/admin/ManageDesigns';
import { ManageDiamonds } from './pages/admin/ManageDiamonds';
import { ManageMetals } from './pages/admin/ManageMetals';
import { ManageShowrooms } from './pages/admin/ManageShowrooms';
import { ManageAppointments } from './pages/admin/ManageAppointments';
import { ManageQuotations } from './pages/admin/ManageQuotations';
import { ManageCustomers } from './pages/admin/ManageCustomers';
import { ManageSalesmen } from './pages/admin/ManageSalesmen';
import { ManagePricing } from './pages/admin/ManagePricing';
import { AdminSecurity } from './pages/admin/AdminSecurity';
import { ProjectArchitecture } from './pages/ProjectArchitecture';

export default function App() {
  return (
    <AuthProvider>
      <CustomizationProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-[#FAF7F0] text-[#171717]">
            <Navbar />
            <div className="flex-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/jewellery" element={<JewelleryCatalog />} />
                <Route path="/customize" element={<CustomizeStudio />} />
                <Route path="/showrooms" element={<ShowroomsPage />} />
                <Route path="/architecture" element={<ProjectArchitecture />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Customer Routes */}
                <Route element={<ProtectedRoute allowedRoles={['ROLE_CUSTOMER', 'ROLE_SALESMAN', 'ROLE_ADMIN']} />}>
                  <Route path="/customer/dashboard" element={<CustomerDashboard />} />
                  <Route path="/customer/book-appointment" element={<BookAppointment />} />
                  <Route path="/customer/appointment-confirmation" element={<AppointmentConfirmation />} />
                  <Route path="/customer/appointments" element={<MyAppointments />} />
                  <Route path="/customer/quotation" element={<CustomerQuotation />} />
                  <Route path="/customer/profile" element={<CustomerProfile />} />
                </Route>

                {/* Salesman Routes */}
                <Route element={<ProtectedRoute allowedRoles={['ROLE_SALESMAN', 'ROLE_ADMIN']} />}>
                  <Route path="/salesman/dashboard" element={<SalesmanDashboard />} />
                  <Route path="/salesman/appointments" element={<SalesmanAppointments />} />
                  <Route path="/salesman/configurations" element={<SalesmanDashboard />} />
                  <Route path="/salesman/consultation" element={<SalesmanConsultation />} />
                  <Route path="/salesman/quotations" element={<SalesmanDashboard />} />
                  <Route path="/salesman/quotations/create" element={<CreateQuotation />} />
                  <Route path="/salesman/profile" element={<SalesmanProfile />} />
                </Route>

                {/* Admin Routes */}
                <Route element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']} />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/jewellery" element={<ManageJewellery />} />
                  <Route path="/admin/designs" element={<ManageDesigns />} />
                  <Route path="/admin/diamonds" element={<ManageDiamonds />} />
                  <Route path="/admin/metals" element={<ManageMetals />} />
                  <Route path="/admin/showrooms" element={<ManageShowrooms />} />
                  <Route path="/admin/appointments" element={<ManageAppointments />} />
                  <Route path="/admin/quotations" element={<ManageQuotations />} />
                  <Route path="/admin/customers" element={<ManageCustomers />} />
                  <Route path="/admin/salesmen" element={<ManageSalesmen />} />
                  <Route path="/admin/pricing" element={<ManagePricing />} />
                  <Route path="/admin/security" element={<AdminSecurity />} />
                </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </CustomizationProvider>
    </AuthProvider>
  );
}
