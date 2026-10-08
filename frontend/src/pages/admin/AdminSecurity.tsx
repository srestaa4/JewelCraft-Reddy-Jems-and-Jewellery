import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { authService, SecurityLogItem, SecurityStatus } from '../../services/authService';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Unlock,
  AlertTriangle,
  Clock,
  KeyRound,
  BadgeCheck,
  RotateCcw,
  CheckCircle,
  FileText,
  UserCheck,
} from 'lucide-react';

export const AdminSecurity: React.FC = () => {
  const [logs, setLogs] = useState<SecurityLogItem[]>([]);
  const [status, setStatus] = useState<SecurityStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [unlockTarget, setUnlockTarget] = useState('');
  const [unlockMessage, setUnlockMessage] = useState<string | null>(null);

  const fetchSecurityData = async () => {
    try {
      const [logsData, statusData] = await Promise.all([
        authService.getSecurityLogs(),
        authService.getSecurityStatus(),
      ]);
      setLogs(logsData);
      setStatus(statusData);
    } catch (err) {
      console.error('Failed to load security status:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSecurityData();
    const interval = setInterval(fetchSecurityData, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await authService.unlockAccount(unlockTarget.trim() || undefined);
      setUnlockMessage(res.message);
      setUnlockTarget('');
      fetchSecurityData();
      setTimeout(() => setUnlockMessage(null), 4000);
    } catch (err: any) {
      setUnlockMessage('Failed to reset lockouts: ' + (err.message || 'Error'));
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8DEC8] gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-[#5B1017] font-bold flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                Security & Compliance
              </span>
              <span className="px-2 py-0.5 rounded bg-[#2D6A4F]/10 text-[#2D6A4F] text-[10px] font-bold border border-[#2D6A4F]/20">
                ACTIVE DEFENSE
              </span>
            </div>
            <h1 className="font-serif text-3xl font-medium text-[#171717] mt-1">
              Authentication Security Console
            </h1>
            <p className="text-xs text-[#6A5E50] mt-1">
              Real-time audit logging, administrator 2FA verification, showroom staff employee badge validation, and brute-force defense.
            </p>
          </div>

          <button
            onClick={fetchSecurityData}
            className="flex items-center gap-1.5 text-xs bg-white px-3 py-1.5 rounded border border-[#D5C2A5] text-[#171717] hover:bg-[#FAF7F0] transition-colors cursor-pointer self-start sm:self-auto shadow-2xs font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#8B5E20]" />
            <span>Refresh Audit Feed</span>
          </button>
        </div>

        {/* Security Posture Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-8">
          <div className="bg-white border border-[#E8DEC8] rounded-md p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-[#8A7D6B] block">
                Admin 2FA Security
              </span>
              <KeyRound className="w-4 h-4 text-[#5B1017]" />
            </div>
            <span className="font-bold text-lg text-[#2D6A4F] mt-2 block flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" />
              <span>Enforced</span>
            </span>
            <span className="text-[11px] text-[#6A5E50] mt-1 block">
              PIN Required for all Admin Logins
            </span>
          </div>

          <div className="bg-white border border-[#E8DEC8] rounded-md p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-[#8A7D6B] block">
                Staff Badge Validation
              </span>
              <BadgeCheck className="w-4 h-4 text-[#8B5E20]" />
            </div>
            <span className="font-bold text-lg text-[#2D6A4F] mt-2 block flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" />
              <span>Enforced</span>
            </span>
            <span className="text-[11px] text-[#6A5E50] mt-1 block">
              Employee Code Verified with Showroom DB
            </span>
          </div>

          <div className="bg-white border border-[#E8DEC8] rounded-md p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-[#8A7D6B] block">
                Brute-Force Rate Limiter
              </span>
              <ShieldAlert className="w-4 h-4 text-[#B8863B]" />
            </div>
            <span className="font-bold text-lg text-[#171717] mt-2 block">
              {status ? `${status.maxFailedAttempts} Max Attempts` : '4 Attempts'}
            </span>
            <span className="text-[11px] text-[#6A5E50] mt-1 block">
              15-Min Lockout Duration
            </span>
          </div>

          <div className="bg-white border border-[#E8DEC8] rounded-md p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-[#8A7D6B] block">
                Active Lockouts
              </span>
              <Lock className="w-4 h-4 text-[#B02A37]" />
            </div>
            <span className="font-mono text-2xl font-bold text-[#171717] mt-2 block">
              {status?.activeLockouts || 0}
            </span>
            <span className="text-[11px] text-[#8A7D6B] mt-1 block">
              Currently Blocked IPs / Accounts
            </span>
          </div>
        </div>

        {/* Security Reset & Policy Controls */}
        <div className="bg-white border border-[#E8DEC8] rounded-md p-6 shadow-xs mb-8">
          <h2 className="font-serif text-lg font-bold text-[#171717] mb-3">
            Account Unlock & Rate-Limiter Reset
          </h2>
          <p className="text-xs text-[#6A5E50] mb-4">
            If an authorized staff member or customer is locked out due to multiple failed login attempts, you can clear the lockout record here.
          </p>

          <form onSubmit={handleUnlock} className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <input
              type="text"
              value={unlockTarget}
              onChange={(e) => setUnlockTarget(e.target.value)}
              placeholder="Enter email or leave blank to clear all active lockouts"
              className="bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs flex-1 text-[#171717] focus:outline-none focus:border-[#B8863B]"
            />
            <button
              type="submit"
              className="bg-[#171717] hover:bg-[#333] text-white text-xs font-semibold px-5 py-2 rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock className="w-3.5 h-3.5 text-[#B8863B]" />
              <span>Reset Lockouts</span>
            </button>
          </form>

          {unlockMessage && (
            <div className="mt-3 p-2.5 bg-[#E8F5E9] border border-[#C8E6C9] text-[#2E7D32] text-xs rounded flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>{unlockMessage}</span>
            </div>
          )}
        </div>

        {/* Real-Time Security Audit Log Table */}
        <div className="bg-white border border-[#E8DEC8] rounded-md shadow-xs overflow-hidden">
          <div className="p-5 border-b border-[#E8DEC8] flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#171717]">
                Live Security Audit Trail
              </h2>
              <span className="text-xs text-[#6A5E50]">
                All administrative actions, 2FA verifications, and access violations are permanently recorded.
              </span>
            </div>
            <span className="text-xs font-mono font-semibold text-[#8B5E20] bg-[#FAF7F0] px-3 py-1 rounded border border-[#EDE4D2]">
              {logs.length} Recorded Events
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F0] border-b border-[#E8DEC8] text-[#8A7D6B] uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Severity</th>
                  <th className="py-3 px-4">Security Event</th>
                  <th className="py-3 px-4">Account / Email</th>
                  <th className="py-3 px-4">Client IP</th>
                  <th className="py-3 px-4">Event Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2ECE0]">
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-[#8A7D6B]">
                      No security audit events recorded yet.
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => {
                    const isCrit = log.severity === 'CRITICAL';
                    const isWarn = log.severity === 'WARNING';
                    return (
                      <tr key={log.id} className="hover:bg-[#FAF7F0]/50 transition-colors">
                        <td className="py-3 px-4 text-[#6A5E50] font-mono text-[11px] whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}{' '}
                          <span className="text-[10px] text-[#A89D8B]">
                            {new Date(log.timestamp).toLocaleDateString()}
                          </span>
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              isCrit
                                ? 'bg-[#5B1017]/10 text-[#5B1017] border border-[#5B1017]/30'
                                : isWarn
                                ? 'bg-[#FFF3CD] text-[#856404] border border-[#FFEEBA]'
                                : 'bg-[#D1E7DD] text-[#0F5132] border border-[#BADBCC]'
                            }`}
                          >
                            {log.severity}
                          </span>
                        </td>

                        <td className="py-3 px-4 font-mono font-semibold text-[#171717] whitespace-nowrap">
                          {log.event}
                        </td>

                        <td className="py-3 px-4 font-mono text-[#5C5346]">
                          {log.email}
                        </td>

                        <td className="py-3 px-4 font-mono text-[#8A7D6B] whitespace-nowrap">
                          {log.ip}
                        </td>

                        <td className="py-3 px-4 text-[#171717] leading-relaxed">
                          {log.message}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
