import api from './api';
import { User } from './authService';

export interface AdminStats {
  totalCustomers: number;
  totalSalesmen: number;
  totalJewellery: number;
  totalDiamonds: number;
  totalShowrooms: number;
  todayAppointments: number;
  pendingAppointments: number;
  completedAppointments: number;
  totalQuotations: number;
}

export const adminService = {
  getStats: async (): Promise<AdminStats> => {
    const res = await api.get<AdminStats>('/admin/stats');
    return res.data;
  },

  getUsers: async (role?: string): Promise<User[]> => {
    const res = await api.get<User[]>('/admin/users', { params: { role } });
    return res.data;
  },

  createUser: async (userData: Partial<User>): Promise<User> => {
    const res = await api.post<User>('/admin/users', userData);
    return res.data;
  },
};
