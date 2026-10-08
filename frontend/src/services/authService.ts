import api from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ROLE_CUSTOMER' | 'ROLE_SALESMAN' | 'ROLE_ADMIN';
  phone?: string;
  city?: string;
  address?: string;
  employeeCode?: string;
  showroomId?: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  sessionExpiry?: number;
}

export interface LoginParams {
  email: string;
  password: string;
  portal?: 'customer' | 'salesman' | 'admin';
  employeeCode?: string;
  securityKey?: string;
}

export interface SecurityLogItem {
  id: string;
  timestamp: string;
  event: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  email: string;
  ip: string;
  portal?: string;
  role?: string;
  message: string;
}

export interface SecurityStatus {
  totalEvents: number;
  activeLockouts: number;
  failedAttemptsTracked: number;
  admin2FAEnforced: boolean;
  salesmanCodeEnforced: boolean;
  maxFailedAttempts: number;
  lockoutDurationMinutes: number;
}

export const authService = {
  login: async (params: LoginParams | string, passwordParam?: string): Promise<AuthResponse> => {
    const payload =
      typeof params === 'string'
        ? { email: params, password: passwordParam }
        : params;
    const res = await api.post<AuthResponse>('/auth/login', payload);
    return res.data;
  },

  register: async (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    city?: string;
    address?: string;
  }): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>('/auth/register', userData);
    return res.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const res = await api.get<User>('/auth/me');
    return res.data;
  },

  getSecurityLogs: async (): Promise<SecurityLogItem[]> => {
    const res = await api.get<SecurityLogItem[]>('/security/audit-logs');
    return res.data;
  },

  getSecurityStatus: async (): Promise<SecurityStatus> => {
    const res = await api.get<SecurityStatus>('/security/status');
    return res.data;
  },

  unlockAccount: async (identifier?: string): Promise<{ message: string }> => {
    const res = await api.post<{ message: string }>('/security/unlock', { identifier });
    return res.data;
  },
};

