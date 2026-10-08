import api from './api';

export interface CustomizationData {
  jewelleryId?: string;
  jewelleryName?: string;
  jewelleryType?: string;
  designId?: string;
  designName?: string;
  metalId?: string;
  metalName?: string;
  diamondId?: string;
  diamondShape?: string;
  carat?: number;
  color?: string;
  clarity?: string;
  cut?: string;
  size?: string | number;
  engraving?: string;
  notes?: string;
  basePrice?: number;
  metalPrice?: number;
  diamondPrice?: number;
  customizationPrice?: number;
  estimatedPrice?: number;
}

export interface Appointment {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  salesmanId?: string;
  salesmanName?: string;
  showroomId: string;
  showroomName: string;
  customization: CustomizationData;
  date: string;
  time: string;
  status: 'BOOKED' | 'CONFIRMED' | 'RESCHEDULED' | 'COMPLETED' | 'CANCELLED';
  customerNotes?: string;
  salesmanNotes?: string;
  createdAt: string;
}

export interface CreateAppointmentPayload {
  customerId: string;
  showroomId: string;
  date: string;
  time: string;
  customization: CustomizationData;
  customerNotes?: string;
}

export const appointmentService = {
  getAllAppointments: async (): Promise<Appointment[]> => {
    const res = await api.get<Appointment[]>('/appointments');
    return res.data;
  },

  getCustomerAppointments: async (customerId: string): Promise<Appointment[]> => {
    const res = await api.get<Appointment[]>(`/appointments/customer/${customerId}`);
    return res.data;
  },

  getSalesmanAppointments: async (salesmanId: string): Promise<Appointment[]> => {
    const res = await api.get<Appointment[]>(`/appointments/salesman/${salesmanId}`);
    return res.data;
  },

  bookAppointment: async (payload: CreateAppointmentPayload): Promise<Appointment> => {
    const res = await api.post<Appointment>('/appointments', payload);
    return res.data;
  },

  updateStatus: async (
    id: string,
    status: 'BOOKED' | 'CONFIRMED' | 'RESCHEDULED' | 'COMPLETED' | 'CANCELLED',
    salesmanNotes?: string
  ): Promise<Appointment> => {
    const res = await api.put<Appointment>(`/appointments/${id}/status`, { status, salesmanNotes });
    return res.data;
  },

  assignSalesman: async (id: string, salesmanId: string): Promise<Appointment> => {
    const res = await api.put<Appointment>(`/appointments/${id}/assign`, { salesmanId });
    return res.data;
  },

  updateCustomization: async (
    id: string,
    customization: Partial<CustomizationData>,
    salesmanNotes?: string
  ): Promise<Appointment> => {
    const res = await api.put<Appointment>(`/appointments/${id}/customization`, { customization, salesmanNotes });
    return res.data;
  },
};
