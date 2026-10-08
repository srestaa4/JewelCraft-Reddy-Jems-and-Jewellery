import api from './api';

export interface Quotation {
  id: string;
  appointmentId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  salesmanId: string;
  salesmanName: string;
  jewellery: string;
  design: string;
  metal: string;
  diamond: string;
  diamondShape: string;
  size: string | number;
  customizationDetails: string;
  estimatedPrice: number;
  additionalCharges: number;
  discount: number;
  finalPrice: number;
  salesmanNotes: string;
  createdAt: string;
  validUntilDate: string;
  status: 'PENDING' | 'ACCEPTED' | 'REVISED';
}

export interface CreateQuotationPayload {
  appointmentId: string;
  customerId: string;
  salesmanId: string;
  jewellery: string;
  design: string;
  metal: string;
  diamond: string;
  diamondShape: string;
  size: string | number;
  customizationDetails: string;
  estimatedPrice: number;
  additionalCharges: number;
  discount: number;
  finalPrice: number;
  salesmanNotes: string;
  validDays?: number;
}

export const quotationService = {
  getAllQuotations: async (): Promise<Quotation[]> => {
    const res = await api.get<Quotation[]>('/quotations');
    return res.data;
  },

  getQuotationById: async (id: string): Promise<Quotation> => {
    const res = await api.get<Quotation>(`/quotations/${id}`);
    return res.data;
  },

  getCustomerQuotations: async (customerId: string): Promise<Quotation[]> => {
    const res = await api.get<Quotation[]>(`/quotations/customer/${customerId}`);
    return res.data;
  },

  getAppointmentQuotation: async (appointmentId: string): Promise<Quotation[]> => {
    const res = await api.get<Quotation[]>(`/quotations/appointment/${appointmentId}`);
    return res.data;
  },

  createQuotation: async (payload: CreateQuotationPayload): Promise<Quotation> => {
    const res = await api.post<Quotation>('/quotations', payload);
    return res.data;
  },
};
