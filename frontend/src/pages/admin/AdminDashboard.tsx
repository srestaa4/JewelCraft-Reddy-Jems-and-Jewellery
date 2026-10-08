import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService, AdminStats } from '../../services/adminService';
import { Sidebar } from '../../components/Sidebar';
import {
  Users,
  Briefcase,
  Layers,
  Gem,
  Building,
  Calendar,
  Clock,
  CheckCircle,
  FileCheck,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  KeyRound,
  Lock,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalCustomers: 4,
    totalSalesmen: 3,
    totalJewellery: 5,
    totalDiamonds: 10,
    totalShowrooms: 4,
    todayAppointments: 1,
    pendingAppointments: 2,
    completedAppointments: 1,
    totalQuotations: 1,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getStats().then((data) => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  const statCards = [
    { label: 'Total Registered Customers', value: stats.totalCustomers, icon: Users, link: '/admin/customers' },
    { label: 'Showroom Sales Consultants', value: stats.totalSalesmen, icon: Briefcase, link: '/admin/salesmen' },
    { label: 'Jewellery Categories', value: stats.totalJewellery, icon: Layers, link: '/admin/jewellery' },
    { label: 'Certified Diamonds In Stock', value: stats.totalDiamonds, icon: Gem, link: '/admin/diamonds' },
    { label: 'Showroom Salons', value: stats.totalShowrooms, icon: Building, link: '/admin/showrooms' },
    { label: "Today's Appointments", value: stats.todayAppointments, icon: Calendar, link: '/admin/appointments' },
    { label: 'Pending Appointments', value: stats.pendingAppointments, icon: Clock, link: '/admin/appointments' },
    { label: 'Completed Appointments', value: stats.completedAppointments, icon: CheckCircle, link: '/admin/appointments' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8DEC8] gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8B5E20] font-semibold">
              Executive Administration Console
            </span>
            <h1 className="font-serif text-3xl font-medium text-[#171717] mt-1">
              JewelCraft Operations Center
            </h1>
            <p className="text-xs text-[#6A5E50] mt-1">
              Enterprise management for REDDY JEMS AND JEWELLERY ateliers, showrooms, and pricing formulas.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs bg-white px-3 py-1.5 rounded border border-[#D5C2A5] text-[#2D6A4F] font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>ROLE_ADMIN Authority</span>
          </div>
        </div>

        {/* 8 Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-8">
          {statCards.map((c, i) => {
            const Icon = c.icon;
            return (
              <Link
                key={i}
                to={c.link}
                className="bg-white border border-[#E8DEC8] rounded-md p-5 shadow-xs flex items-center justify-between hover:border-[#B8863B] transition-colors group"
              >
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#8A7D6B] block">
                    {c.label}
                  </span>
                  <span className="font-mono text-3xl font-bold text-[#171717] mt-1 block">
                    {c.value}
                  </span>
                  <span className="text-[11px] text-[#8B5E20] mt-1 block group-hover:underline flex items-center gap-1">
                    <span>Manage Module</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
                <div className="w-11 h-11 rounded bg-[#FAF7F0] border border-[#EDE4D2] flex items-center justify-center text-[#B8863B]">
                  <Icon className="w-5 h-5" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Security & Access Posture Banner */}
        <div className="bg-white border border-[#D5C2A5] rounded-md p-6 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#5B1017]/10 text-[#5B1017] rounded-md border border-[#5B1017]/20 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#5B1017]">
                  Security Operations Center
                </span>
                <span className="px-2 py-0.5 rounded bg-[#2D6A4F]/10 text-[#2D6A4F] text-[10px] font-bold border border-[#2D6A4F]/20">
                  2FA & Staff Check Active
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#171717] mt-0.5">
                Authentication Audit Trail & Brute-Force Monitor
              </h3>
              <p className="text-xs text-[#6A5E50] mt-1 max-w-2xl">
                Real-time tracking of administrator 2FA verification, showroom staff employee code authentication, and brute-force IP rate limiting.
              </p>
            </div>
          </div>

          <Link
            to="/admin/security"
            className="px-4 py-2.5 bg-[#5B1017] hover:bg-[#430B10] text-white rounded text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 self-start md:self-auto shrink-0 shadow-2xs"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Open Security Console</span>
          </Link>
        </div>

        {/* Quick Management Shortcuts */}
        <div className="bg-white border border-[#E8DEC8] rounded-md p-6 shadow-xs mb-8">
          <h3 className="font-serif text-lg font-bold text-[#171717] mb-4">
            Master Catalog & Resource Management
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            <Link
              to="/admin/jewellery"
              className="p-3 bg-[#FAF7F0] border border-[#EDE4D2] rounded text-center hover:bg-[#EFE1C5] transition-colors font-medium text-[#171717]"
            >
              Jewellery Items
            </Link>
            <Link
              to="/admin/designs"
              className="p-3 bg-[#FAF7F0] border border-[#EDE4D2] rounded text-center hover:bg-[#EFE1C5] transition-colors font-medium text-[#171717]"
            >
              Mounting Designs
            </Link>
            <Link
              to="/admin/metals"
              className="p-3 bg-[#FAF7F0] border border-[#EDE4D2] rounded text-center hover:bg-[#EFE1C5] transition-colors font-medium text-[#171717]"
            >
              Bullion Metals Rates
            </Link>
            <Link
              to="/admin/diamonds"
              className="p-3 bg-[#FAF7F0] border border-[#EDE4D2] rounded text-center hover:bg-[#EFE1C5] transition-colors font-medium text-[#171717]"
            >
              Diamond Inventory
            </Link>
            <Link
              to="/admin/showrooms"
              className="p-3 bg-[#FAF7F0] border border-[#EDE4D2] rounded text-center hover:bg-[#EFE1C5] transition-colors font-medium text-[#171717]"
            >
              Showroom Salons
            </Link>
            <Link
              to="/admin/pricing"
              className="p-3 bg-[#FAF7F0] border border-[#EDE4D2] rounded text-center hover:bg-[#EFE1C5] transition-colors font-medium text-[#171717]"
            >
              Valuation Rules
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
