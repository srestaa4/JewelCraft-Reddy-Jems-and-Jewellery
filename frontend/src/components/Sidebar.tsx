import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Calendar,
  Sparkles,
  FileCheck,
  User,
  Gem,
  Building,
  Users,
  Briefcase,
  Layers,
  Palette,
  Coins,
  DollarSign,
  ClipboardList,
  ShieldAlert,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { role, user } = useAuth();

  let links = [];

  if (role === 'ROLE_ADMIN') {
    links = [
      { to: '/admin/dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
      { to: '/admin/security', label: 'Security & Audit Logs', icon: ShieldAlert },
      { to: '/admin/appointments', label: 'All Appointments', icon: Calendar },
      { to: '/admin/quotations', label: 'Quotations', icon: FileCheck },
      { to: '/admin/customers', label: 'Manage Customers', icon: Users },
      { to: '/admin/salesmen', label: 'Manage Salesmen', icon: Briefcase },
      { to: '/admin/jewellery', label: 'Manage Jewellery', icon: Layers },
      { to: '/admin/designs', label: 'Manage Designs', icon: Palette },
      { to: '/admin/diamonds', label: 'Manage Diamonds', icon: Gem },
      { to: '/admin/metals', label: 'Precious Metals Rates', icon: Coins },
      { to: '/admin/showrooms', label: 'Showroom Salons', icon: Building },
      { to: '/admin/pricing', label: 'Pricing Formula', icon: DollarSign },
    ];
  } else if (role === 'ROLE_SALESMAN') {
    links = [
      { to: '/salesman/dashboard', label: 'CRM Dashboard', icon: LayoutDashboard },
      { to: '/salesman/appointments', label: 'Assigned Appointments', icon: Calendar },
      { to: '/salesman/configurations', label: 'Customer Configurations', icon: Sparkles },
      { to: '/salesman/consultation', label: 'Active Consultation', icon: ClipboardList },
      { to: '/salesman/quotations', label: 'Final Quotations', icon: FileCheck },
      { to: '/salesman/profile', label: 'Salesman Profile', icon: User },
    ];
  } else {
    // Customer
    links = [
      { to: '/customer/dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
      { to: '/customize', label: 'Bespoke Customizer', icon: Sparkles },
      { to: '/customer/appointments', label: 'My Appointments', icon: Calendar },
      { to: '/customer/quotation', label: 'My Final Quotations', icon: FileCheck },
      { to: '/jewellery', label: 'Explore Jewellery', icon: Gem },
      { to: '/customer/profile', label: 'My Profile', icon: User },
    ];
  }

  return (
    <aside className="w-64 bg-white border-r border-[#E8DEC8] flex flex-col justify-between shrink-0 min-h-[calc(100vh-5rem)]">
      <div className="p-4">
        {/* User Identity Card */}
        <div className="bg-[#FAF7F0] border border-[#E8DEC8] rounded p-3 mb-6">
          <span className="text-[10px] font-semibold text-[#8B5E20] uppercase tracking-wider block">
            {role === 'ROLE_ADMIN' ? 'System Administrator' : role === 'ROLE_SALESMAN' ? 'Senior Sales Consultant' : 'Private Customer'}
          </span>
          <h4 className="font-serif font-bold text-sm text-[#171717] mt-0.5 truncate">
            {user?.name || 'Valued User'}
          </h4>
          <span className="text-xs text-[#8A7D6B] truncate block">{user?.email}</span>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#FAF7F0] text-[#8B5E20] font-semibold border-l-2 border-[#B8863B]'
                      : 'text-[#5C5346] hover:bg-[#FAF7F0]/60 hover:text-[#171717]'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0 text-[#B8863B]" />
                <span className="truncate">{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Brand Watermark / Bottom Note */}
      <div className="p-4 border-t border-[#FAF7F0] text-center">
        <span className="text-[10px] uppercase tracking-widest text-[#8A7D6B] block">
          REDDY JEMS & JEWELLERY
        </span>
        <span className="text-[9px] text-[#A89D8F] block mt-0.5">
          JewelCraft v2.4 Enterprise
        </span>
      </div>
    </aside>
  );
};
