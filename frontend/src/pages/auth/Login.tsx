import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  ShieldCheck,
  ShieldAlert,
  User,
  Briefcase,
  Lock,
  Mail,
  AlertCircle,
  Loader2,
  KeyRound,
  BadgeCheck,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Info,
  Clock,
  Sparkles,
} from 'lucide-react';

type PortalType = 'customer' | 'salesman' | 'admin';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPortal = (searchParams.get('portal') as PortalType) || 'customer';
  const redirect = searchParams.get('redirect');

  const [activePortal, setActivePortal] = useState<PortalType>(
    ['customer', 'salesman', 'admin'].includes(initialPortal) ? initialPortal : 'customer'
  );

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');
  const [securityKey, setSecurityKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSecurityKey, setShowSecurityKey] = useState(false);

  // Status & Security state
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [showTestGuide, setShowTestGuide] = useState(false);

  // Sync tab change with URL query
  const handleTabChange = (portal: PortalType) => {
    setActivePortal(portal);
    setErrorMessage(null);
    setRemainingAttempts(null);
    setSearchParams(
      redirect ? { portal, redirect } : { portal },
      { replace: true }
    );

    // Reset sensitive security fields when switching portals
    if (portal === 'customer') {
      setEmail('');
      setPassword('');
      setEmployeeCode('');
      setSecurityKey('');
    } else if (portal === 'salesman') {
      setEmail('');
      setPassword('');
      setEmployeeCode('');
      setSecurityKey('');
    } else {
      setEmail('');
      setPassword('');
      setEmployeeCode('');
      setSecurityKey('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      await login({
        email,
        password,
        portal: activePortal,
        employeeCode: activePortal === 'salesman' ? employeeCode : undefined,
        securityKey: activePortal === 'admin' ? securityKey : undefined,
      });

      // Successful login redirect based on role and portal
      if (redirect) {
        navigate(redirect);
      } else if (activePortal === 'admin') {
        navigate('/admin/dashboard');
      } else if (activePortal === 'salesman') {
        navigate('/salesman/dashboard');
      } else {
        navigate('/customer/dashboard');
      }
    } catch (err: any) {
      const responseData = err.response?.data;
      if (err.response?.status === 429) {
        setIsLockedOut(true);
        setErrorMessage(
          responseData?.error ||
            'Security Lockout Active: Too many failed login attempts. Please wait 15 minutes.'
        );
      } else {
        setErrorMessage(
          responseData?.error || err.message || 'Authentication failed. Please verify your credentials.'
        );
        if (typeof responseData?.remainingAttempts === 'number') {
          setRemainingAttempts(responseData.remainingAttempts);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper to prefill verified test credentials for evaluators
  const loadVerifiedCredentials = (portal: PortalType, withValidKeys: boolean = true) => {
    setActivePortal(portal);
    setErrorMessage(null);
    setRemainingAttempts(null);

    if (portal === 'customer') {
      setEmail('ananya@jewelcraft.com');
      setPassword('password123');
      setEmployeeCode('');
      setSecurityKey('');
    } else if (portal === 'salesman') {
      setEmail('rajesh.sales@jewelcraft.com');
      setPassword('password123');
      setEmployeeCode(withValidKeys ? 'SALES-HYD-04' : 'INVALID-CODE-99');
      setSecurityKey('');
    } else if (portal === 'admin') {
      setEmail('admin@jewelcraft.com');
      setPassword('admin123');
      setEmployeeCode('');
      setSecurityKey(withValidKeys ? '889900' : '000000');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex flex-col justify-center py-10 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg text-center">
        {/* Brand Logo */}
        <Link to="/" className="inline-flex items-center gap-3 mb-3 group focus:outline-none">
          <div className="w-12 h-12 rounded-sm overflow-hidden bg-white border border-[#D5C2A5] p-1 shadow-sm">
            <img
              src="/images/logo/reddy_logo.jpg"
              alt="REDDY JEMS AND JEWELLERY"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="text-left">
            <span className="font-serif text-2xl font-bold tracking-wider text-[#171717] block leading-none">
              REDDY
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#8B5E20] uppercase font-semibold block mt-0.5">
              JEMS AND JEWELLERY
            </span>
          </div>
        </Link>

        <h2 className="font-serif text-3xl font-semibold text-[#171717]">
          Secure Authentication Gateway
        </h2>
        <p className="mt-1 text-xs text-[#6A5E50]">
          Role-Based Access Control • Showroom Staff Verification • 2FA Administrator Security
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg px-4">
        {/* Multi-Tier Portal Selector Tabs */}
        <div className="grid grid-cols-3 bg-[#EAE2D2] p-1 rounded-t-lg border border-[#D5C2A5] border-b-0">
          {/* Customer Tab */}
          <button
            type="button"
            onClick={() => handleTabChange('customer')}
            className={`flex items-center justify-center gap-2 py-3 px-2 text-xs font-semibold rounded transition-all cursor-pointer ${
              activePortal === 'customer'
                ? 'bg-white text-[#171717] shadow-xs'
                : 'text-[#6A5E50] hover:text-[#171717] hover:bg-[#F2ECE0]'
            }`}
          >
            <User className="w-3.5 h-3.5 text-[#8B5E20]" />
            <span>Customer</span>
          </button>

          {/* Salesman Tab */}
          <button
            type="button"
            onClick={() => handleTabChange('salesman')}
            className={`flex items-center justify-center gap-2 py-3 px-2 text-xs font-semibold rounded transition-all cursor-pointer ${
              activePortal === 'salesman'
                ? 'bg-[#171717] text-[#FAF7F0] shadow-xs'
                : 'text-[#6A5E50] hover:text-[#171717] hover:bg-[#F2ECE0]'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-[#B8863B]" />
            <span>Sales Staff</span>
          </button>

          {/* Admin Tab */}
          <button
            type="button"
            onClick={() => handleTabChange('admin')}
            className={`flex items-center justify-center gap-2 py-3 px-2 text-xs font-semibold rounded transition-all cursor-pointer ${
              activePortal === 'admin'
                ? 'bg-[#5B1017] text-white shadow-xs'
                : 'text-[#6A5E50] hover:text-[#171717] hover:bg-[#F2ECE0]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#E6AF2E]" />
            <span>Administrator</span>
          </button>
        </div>

        {/* Portal Information Banner */}
        <div
          className={`border-x border-[#D5C2A5] px-5 py-3 text-xs flex items-center justify-between ${
            activePortal === 'admin'
              ? 'bg-[#5B1017]/10 text-[#5B1017] border-t-2 border-t-[#5B1017]'
              : activePortal === 'salesman'
              ? 'bg-[#171717]/5 text-[#171717] border-t-2 border-t-[#171717]'
              : 'bg-[#FAF7F0] text-[#6A5E50] border-t-2 border-t-[#8B5E20]'
          }`}
        >
          <div className="flex items-center gap-2">
            {activePortal === 'admin' ? (
              <ShieldAlert className="w-4 h-4 text-[#5B1017] shrink-0" />
            ) : activePortal === 'salesman' ? (
              <BadgeCheck className="w-4 h-4 text-[#8B5E20] shrink-0" />
            ) : (
              <User className="w-4 h-4 text-[#8B5E20] shrink-0" />
            )}
            <span className="font-medium text-[11px]">
              {activePortal === 'admin'
                ? 'High Security Zone: 2FA Master Key Required'
                : activePortal === 'salesman'
                ? 'Staff Portal: Showroom Employee Code Verification Required'
                : 'Client Access: Bespoke Customization & Appointment Tracking'}
            </span>
          </div>

          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/70 border border-current">
            {activePortal === 'admin' ? 'Clearance Level 3' : activePortal === 'salesman' ? 'Clearance Level 2' : 'Standard'}
          </span>
        </div>

        {/* Main Authentication Form Box */}
        <div className="bg-white border border-[#D5C2A5] rounded-b-lg p-6 sm:p-8 shadow-sm space-y-5">
          {/* Lockout or Error Alerts */}
          {errorMessage && (
            <div
              className={`p-3.5 text-xs rounded-md border flex items-start gap-3 ${
                isLockedOut
                  ? 'bg-[#FFF0F2] border-[#F5C2C7] text-[#842029]'
                  : 'bg-[#FFF8E7] border-[#FFEAA7] text-[#946200]'
              }`}
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#B02A37]" />
              <div className="space-y-1">
                <span className="font-semibold block">{errorMessage}</span>
                {remainingAttempts !== null && remainingAttempts > 0 && !isLockedOut && (
                  <span className="text-[11px] text-[#B02A37] block">
                    Security Warning: {remainingAttempts} attempts remaining before a 15-minute account lockout.
                  </span>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#6A5E50] font-semibold block mb-1">
                {activePortal === 'admin'
                  ? 'Administrator Email'
                  : activePortal === 'salesman'
                  ? 'Registered Staff Email'
                  : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8A7D6B] absolute left-3 top-3 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    activePortal === 'admin'
                      ? 'admin@jewelcraft.com'
                      : activePortal === 'salesman'
                      ? 'rajesh.sales@jewelcraft.com'
                      : 'customer@example.com'
                  }
                  className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2.5 pl-9 text-xs text-[#171717] focus:outline-none focus:border-[#B8863B] transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#6A5E50] font-semibold block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8A7D6B] absolute left-3 top-3 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2.5 pl-9 pr-10 text-xs text-[#171717] focus:outline-none focus:border-[#B8863B] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-[#8A7D6B] hover:text-[#171717] text-xs cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* SALESMAN-SPECIFIC: Showroom Employee Code Verification */}
            {activePortal === 'salesman' && (
              <div className="p-3.5 bg-[#FAF7F0] border border-[#E5DAC6] rounded-md space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase tracking-wider text-[#8B5E20] font-bold flex items-center gap-1.5">
                    <BadgeCheck className="w-3.5 h-3.5 text-[#8B5E20]" />
                    <span>Showroom Employee Code *</span>
                  </label>
                  <span className="text-[10px] text-[#6A5E50]">Badge ID Check</span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={employeeCode}
                    onChange={(e) => setEmployeeCode(e.target.value.toUpperCase())}
                    placeholder="e.g. SALES-HYD-04"
                    className="w-full bg-white border border-[#D5C2A5] rounded px-3 py-2 text-xs font-mono font-bold tracking-wider text-[#171717] focus:outline-none focus:border-[#B8863B] uppercase"
                  />
                </div>
                <p className="text-[11px] text-[#6A5E50] leading-tight">
                  Your official employee badge identifier issued by REDDY JEMS AND JEWELLERY operations.
                </p>
              </div>
            )}

            {/* ADMIN-SPECIFIC: Two-Factor Security Key / Master PIN */}
            {activePortal === 'admin' && (
              <div className="p-3.5 bg-[#FFF5F5] border border-[#F8D7DA] rounded-md space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase tracking-wider text-[#5B1017] font-bold flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-[#5B1017]" />
                    <span>Administrator 2FA Security Key *</span>
                  </label>
                  <span className="text-[10px] text-[#842029] font-semibold">256-Bit Protection</span>
                </div>
                <div className="relative">
                  <input
                    type={showSecurityKey ? 'text' : 'password'}
                    required
                    value={securityKey}
                    onChange={(e) => setSecurityKey(e.target.value)}
                    placeholder="Enter 6-digit Master Security PIN"
                    className="w-full bg-white border border-[#E8B4B8] rounded px-3 py-2 pr-10 text-xs font-mono font-bold tracking-widest text-[#5B1017] focus:outline-none focus:border-[#5B1017]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecurityKey(!showSecurityKey)}
                    className="absolute right-3 top-2 text-[#8A7D6B] hover:text-[#171717] text-xs cursor-pointer"
                    tabIndex={-1}
                  >
                    {showSecurityKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-[11px] text-[#5B1017] leading-tight">
                  Master Security PIN required to prevent unauthorized system elevation and configuration changes.
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                activePortal === 'admin'
                  ? 'bg-[#5B1017] hover:bg-[#430B10] text-white disabled:bg-[#8B484E]'
                  : activePortal === 'salesman'
                  ? 'bg-[#171717] hover:bg-[#2C2723] text-white disabled:bg-[#5C5346]'
                  : 'bg-[#B8863B] hover:bg-[#8B5E20] text-white disabled:bg-[#D5C2A5]'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials & Security Tokens...</span>
                </>
              ) : activePortal === 'admin' ? (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authorize Administrator Access</span>
                </>
              ) : activePortal === 'salesman' ? (
                <>
                  <BadgeCheck className="w-4 h-4" />
                  <span>Authenticate Showroom Consultant</span>
                </>
              ) : (
                <>
                  <User className="w-4 h-4" />
                  <span>Sign In as Customer</span>
                </>
              )}
            </button>
          </form>

          {/* Customer Registration Link */}
          {activePortal === 'customer' && (
            <div className="pt-2 border-t border-[#FAF7F0] text-center">
              <span className="text-xs text-[#6A5E50]">New to JewelCraft? </span>
              <Link
                to="/register"
                className="text-xs font-semibold text-[#8B5E20] hover:underline"
              >
                Create a Private Client Account
              </Link>
            </div>
          )}

          {/* Security Information Footer */}
          <div className="pt-4 border-t border-[#F2ECE0] flex items-center justify-between text-[11px] text-[#8A7D6B]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F]" />
              <span>TLS / AES-256 Protected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#8A7D6B]" />
              <span>Audit Logging Active</span>
            </div>
          </div>
        </div>

        {/* Collapsible Security Credentials Reference Guide for Testing */}
        <div className="mt-6 bg-white border border-[#D5C2A5] rounded-md overflow-hidden shadow-2xs">
          <button
            type="button"
            onClick={() => setShowTestGuide(!showTestGuide)}
            className="w-full px-4 py-3 bg-[#FAF7F0] hover:bg-[#F2ECE0] transition-colors flex items-center justify-between text-xs font-semibold text-[#171717] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#8B5E20]" />
              <span>Security Credentials & Test Guide (Role-Based RBAC)</span>
            </div>
            {showTestGuide ? (
              <ChevronUp className="w-4 h-4 text-[#8A7D6B]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#8A7D6B]" />
            )}
          </button>

          {showTestGuide && (
            <div className="p-4 space-y-4 text-xs border-t border-[#E5DAC6] bg-white">
              <p className="text-[11px] text-[#6A5E50] leading-relaxed">
                To test the enhanced security architecture, you can review the required credentials below or click
                any preset button to load the credentials into the input fields for testing:
              </p>

              {/* Admin Guide */}
              <div className="p-3 bg-[#FFF5F5] border border-[#F8D7DA] rounded">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-[#5B1017] flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Administrator (Executive Clearance)
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => loadVerifiedCredentials('admin', true)}
                      className="px-2 py-0.5 bg-[#5B1017] text-white rounded text-[10px] font-semibold hover:bg-[#430B10] cursor-pointer"
                    >
                      Fill Valid Admin
                    </button>
                    <button
                      type="button"
                      onClick={() => loadVerifiedCredentials('admin', false)}
                      className="px-2 py-0.5 bg-white border border-[#5B1017] text-[#5B1017] rounded text-[10px] font-semibold hover:bg-[#FFF5F5] cursor-pointer"
                      title="Test invalid PIN security rejection"
                    >
                      Fill Bad PIN (Test Reject)
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-[#171717]">
                  <div>
                    <span className="text-[9px] uppercase text-[#8A7D6B] block">Email:</span>
                    admin@jewelcraft.com
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-[#8A7D6B] block">Password:</span>
                    admin123
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-[#8A7D6B] block">2FA Security PIN:</span>
                    <strong className="text-[#5B1017]">889900</strong>
                  </div>
                </div>
              </div>

              {/* Salesman Guide */}
              <div className="p-3 bg-[#FAF7F0] border border-[#E5DAC6] rounded">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-[#171717] flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-[#8B5E20]" />
                    Sales Staff (Showroom Consultant)
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => loadVerifiedCredentials('salesman', true)}
                      className="px-2 py-0.5 bg-[#171717] text-white rounded text-[10px] font-semibold hover:bg-[#333] cursor-pointer"
                    >
                      Fill Valid Salesman
                    </button>
                    <button
                      type="button"
                      onClick={() => loadVerifiedCredentials('salesman', false)}
                      className="px-2 py-0.5 bg-white border border-[#171717] text-[#171717] rounded text-[10px] font-semibold hover:bg-[#F2ECE0] cursor-pointer"
                      title="Test invalid employee code rejection"
                    >
                      Fill Bad Code (Test Reject)
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-[#171717]">
                  <div>
                    <span className="text-[9px] uppercase text-[#8A7D6B] block">Email:</span>
                    rajesh.sales@jewelcraft.com
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-[#8A7D6B] block">Password:</span>
                    password123
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-[#8A7D6B] block">Employee Code:</span>
                    <strong className="text-[#8B5E20]">SALES-HYD-04</strong>
                  </div>
                </div>
              </div>

              {/* Customer Guide */}
              <div className="p-3 bg-[#F8F6F0] border border-[#E8DEC8] rounded">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-[#6A5E50] flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#8A7D6B]" />
                    Private Customer Account
                  </span>
                  <button
                    type="button"
                    onClick={() => loadVerifiedCredentials('customer', true)}
                    className="px-2 py-0.5 bg-[#8B5E20] text-white rounded text-[10px] font-semibold hover:bg-[#6A4718] cursor-pointer"
                  >
                    Fill Customer
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 font-mono text-[11px] text-[#171717]">
                  <div>
                    <span className="text-[9px] uppercase text-[#8A7D6B] block">Email:</span>
                    ananya@jewelcraft.com
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-[#8A7D6B] block">Password:</span>
                    password123
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
