import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  User,
  LogOut,
  ShieldCheck,
  ShieldAlert,
  Briefcase,
  KeyRound,
  BadgeCheck,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [staffDropdownOpen, setStaffDropdownOpen] = useState(false);

  const getDashboardRoute = () => {
    if (role === 'ROLE_ADMIN') return '/admin/dashboard';
    if (role === 'ROLE_SALESMAN') return '/salesman/dashboard';
    return '/customer/dashboard';
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Jewellery', path: '/jewellery' },
    { label: 'Studio Customize', path: '/customize' },
    { label: 'Showrooms', path: '/showrooms' },
    { label: 'Appointments', path: isAuthenticated ? '/customer/appointments' : '/login' },
    { label: 'Architecture', path: '/architecture' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Brand Identifier */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-11 h-11 rounded-sm overflow-hidden bg-[#FAF7F0] border border-[#D4AF37]/50 shadow-sm flex items-center justify-center p-0.5 group-hover:border-[#B8863B] transition-colors">
              <img
                src="/images/logo/reddy_logo.jpg"
                alt="REDDY JEMS AND JEWELLERY"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#171717] uppercase leading-none">
                REDDY
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#8B5E20] uppercase font-semibold mt-0.5">
                JEMS & JEWELLERY
              </span>
            </div>
          </Link>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm tracking-wide transition-colors py-1 relative ${
                    isActive
                      ? 'text-[#8B5E20] font-semibold'
                      : 'text-[#3E3832] hover:text-[#171717]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B8863B]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Actions & Role Access */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              /* Authenticated User Identity Pill */
              <div className="flex items-center gap-3">
                <div
                  className={`px-3 py-1.5 rounded border text-xs flex items-center gap-2 ${
                    role === 'ROLE_ADMIN'
                      ? 'bg-[#5B1017]/10 border-[#5B1017]/30 text-[#5B1017]'
                      : role === 'ROLE_SALESMAN'
                      ? 'bg-[#171717]/10 border-[#171717]/30 text-[#171717]'
                      : 'bg-white border-[#D5C2A5] text-[#8B5E20]'
                  }`}
                >
                  {role === 'ROLE_ADMIN' ? (
                    <ShieldAlert className="w-3.5 h-3.5 text-[#5B1017]" />
                  ) : role === 'ROLE_SALESMAN' ? (
                    <Briefcase className="w-3.5 h-3.5 text-[#171717]" />
                  ) : (
                    <User className="w-3.5 h-3.5 text-[#8B5E20]" />
                  )}
                  <div className="flex flex-col text-left leading-tight">
                    <span className="font-semibold text-[11px] truncate max-w-[120px]">
                      {user?.name || 'Authorized User'}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider font-bold opacity-80">
                      {role === 'ROLE_ADMIN'
                        ? 'Admin (2FA Secure)'
                        : role === 'ROLE_SALESMAN'
                        ? `Staff: ${user?.employeeCode || 'VERIFIED'}`
                        : 'Customer'}
                    </span>
                  </div>
                </div>

                <Link
                  to={getDashboardRoute()}
                  className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#171717] bg-[#FAF7F0] hover:bg-[#EFE1C5] border border-[#D5C2A5] transition-colors rounded-sm shadow-2xs"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  title="Sign Out"
                  className="p-2 text-[#7C6E5D] hover:text-[#B02A37] transition-colors cursor-pointer rounded hover:bg-[#FAF7F0]"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* Guest Actions: Sign In, Staff Portals, Register */
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-xs uppercase tracking-wider font-semibold text-[#171717] hover:text-[#8B5E20] px-3 py-2 transition-colors"
                >
                  Sign In
                </Link>

                {/* Staff & Admin Access Menu */}
                <div className="relative">
                  <button
                    onClick={() => setStaffDropdownOpen(!staffDropdownOpen)}
                    className="text-xs tracking-wider text-[#6A5E50] hover:text-[#171717] px-2.5 py-1.5 rounded border border-[#E5DAC6] bg-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#8B5E20]" />
                    <span>Staff Portals</span>
                    <ChevronDown className="w-3 h-3 text-[#8A7D6B]" />
                  </button>

                  {staffDropdownOpen && (
                    <div
                      className="absolute right-0 mt-1.5 w-60 bg-white border border-[#D5C2A5] shadow-lg py-1.5 z-50 rounded text-xs"
                      onMouseLeave={() => setStaffDropdownOpen(false)}
                    >
                      <div className="px-3 py-1.5 border-b border-[#FAF7F0] text-[10px] uppercase font-bold tracking-wider text-[#8A7D6B]">
                        Restricted Access Portals
                      </div>

                      <Link
                        to="/login?portal=salesman"
                        onClick={() => setStaffDropdownOpen(false)}
                        className="w-full text-left px-3 py-2 hover:bg-[#FAF7F0] flex items-center gap-2.5 text-[#171717] transition-colors"
                      >
                        <Briefcase className="w-4 h-4 text-[#8B5E20]" />
                        <div>
                          <span className="font-semibold block text-[11px]">Sales Staff Portal</span>
                          <span className="text-[10px] text-[#6A5E50] block">Badge ID verification</span>
                        </div>
                      </Link>

                      <Link
                        to="/login?portal=admin"
                        onClick={() => setStaffDropdownOpen(false)}
                        className="w-full text-left px-3 py-2 hover:bg-[#FAF7F0] flex items-center gap-2.5 text-[#5B1017] transition-colors"
                      >
                        <ShieldAlert className="w-4 h-4 text-[#5B1017]" />
                        <div>
                          <span className="font-semibold block text-[11px]">Administrator Console</span>
                          <span className="text-[10px] text-[#842029] block">2FA Master Key protection</span>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  to="/register"
                  className="text-xs uppercase tracking-wider font-semibold text-white bg-[#B8863B] hover:bg-[#8B5E20] px-3.5 py-2 rounded-sm transition-colors shadow-2xs"
                >
                  Register
                </Link>
              </div>
            )}

            <Link
              to="/customize"
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-widest font-semibold text-white bg-[#171717] hover:bg-[#8B5E20] transition-colors rounded-sm shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#EFE1C5]" />
              <span>Design Studio</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#171717] hover:text-[#B8863B] focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F0] border-b border-[#E8DEC8] px-4 pt-3 pb-6 space-y-4">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium py-2 text-[#2D2824] hover:text-[#B8863B] border-b border-[#F0E9DA]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Auth / Profile Actions */}
          <div className="pt-2 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <div className="p-3 bg-white border border-[#D5C2A5] rounded text-xs">
                  <span className="text-[10px] uppercase font-bold text-[#8B5E20] block">
                    Signed in as {role === 'ROLE_ADMIN' ? 'Administrator' : role === 'ROLE_SALESMAN' ? 'Sales Staff' : 'Customer'}
                  </span>
                  <span className="font-semibold text-sm text-[#171717] block">{user?.name}</span>
                  <span className="text-xs text-[#6A5E50]">{user?.email}</span>
                </div>

                <Link
                  to={getDashboardRoute()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-xs uppercase tracking-wider font-semibold bg-[#171717] text-white rounded"
                >
                  Enter Dashboard
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2 text-xs font-semibold text-[#B02A37] border border-[#F8D7DA] bg-[#FFF5F5] rounded cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2 text-xs uppercase tracking-wider font-semibold border border-[#171717] text-[#171717] rounded"
                  >
                    Customer Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2 text-xs uppercase tracking-wider font-semibold bg-[#B8863B] text-white rounded"
                  >
                    Register
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    to="/login?portal=salesman"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2 text-[11px] font-semibold bg-[#171717] text-white rounded flex items-center justify-center gap-1.5"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Salesman Login</span>
                  </Link>
                  <Link
                    to="/login?portal=admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2 text-[11px] font-semibold bg-[#5B1017] text-white rounded flex items-center justify-center gap-1.5"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Admin Login</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
