import React from 'react';
import { Navigate, Outlet, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2, ShieldAlert, Lock, ArrowRight, UserCheck } from 'lucide-react';

interface Props {
  allowedRoles?: ('ROLE_CUSTOMER' | 'ROLE_SALESMAN' | 'ROLE_ADMIN')[];
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<Props> = ({ allowedRoles, children }) => {
  const { isAuthenticated, role, user, isLoading, logout } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-[#B8863B] animate-spin" />
        <span className="text-xs uppercase tracking-wider text-[#8A7D6B]">Verifying Security Credentials...</span>
      </div>
    );
  }

  // Not authenticated at all
  if (!isAuthenticated) {
    const isTargetingAdmin = location.pathname.startsWith('/admin');
    const isTargetingSales = location.pathname.startsWith('/salesman');
    const portal = isTargetingAdmin ? 'admin' : isTargetingSales ? 'salesman' : 'customer';

    return (
      <Navigate
        to={`/login?portal=${portal}&redirect=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  // Role mismatch: insufficient security clearance
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    const requiresAdmin = allowedRoles.includes('ROLE_ADMIN') && !allowedRoles.includes('ROLE_CUSTOMER');
    const requiresSales = allowedRoles.includes('ROLE_SALESMAN') && !allowedRoles.includes('ROLE_CUSTOMER');

    return (
      <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-[#D5C2A5] rounded-lg p-6 sm:p-8 shadow-sm text-center space-y-5">
          <div className="w-14 h-14 bg-[#5B1017]/10 text-[#5B1017] border border-[#5B1017]/30 rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert className="w-7 h-7" />
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#B02A37] block">
              Security Violation Blocked
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#171717] mt-1">
              403 - Access Denied
            </h2>
            <p className="text-xs text-[#6A5E50] mt-2 leading-relaxed">
              Your active session as <strong className="text-[#171717]">{user?.name}</strong> (
              <span className="font-mono text-[#8B5E20]">{role}</span>) does not possess the elevated security clearance required to access this resource.
            </p>
          </div>

          <div className="p-3 bg-[#FAF7F0] border border-[#E5DAC6] rounded text-left text-xs space-y-1">
            <div className="flex justify-between text-[#8A7D6B]">
              <span>Requested Path:</span>
              <span className="font-mono text-[#171717]">{location.pathname}</span>
            </div>
            <div className="flex justify-between text-[#8A7D6B]">
              <span>Required Clearance:</span>
              <span className="font-semibold text-[#5B1017]">
                {requiresAdmin ? 'ROLE_ADMIN (2FA Key)' : requiresSales ? 'ROLE_SALESMAN (Staff Code)' : allowedRoles.join(', ')}
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            {requiresAdmin && (
              <Link
                to={`/login?portal=admin&redirect=${encodeURIComponent(location.pathname)}`}
                onClick={() => logout()}
                className="w-full py-2.5 bg-[#5B1017] hover:bg-[#430B10] text-white rounded text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Re-Authenticate with Admin 2FA</span>
              </Link>
            )}

            {requiresSales && !requiresAdmin && (
              <Link
                to={`/login?portal=salesman&redirect=${encodeURIComponent(location.pathname)}`}
                onClick={() => logout()}
                className="w-full py-2.5 bg-[#171717] hover:bg-[#333] text-white rounded text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Re-Authenticate as Sales Staff</span>
              </Link>
            )}

            <Link
              to={role === 'ROLE_SALESMAN' ? '/salesman/dashboard' : '/customer/dashboard'}
              className="w-full py-2 bg-[#FAF7F0] hover:bg-[#EFE1C5] text-[#171717] border border-[#D5C2A5] rounded text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Return to Safe Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children ? <>{children}</> : <Outlet />;
};
