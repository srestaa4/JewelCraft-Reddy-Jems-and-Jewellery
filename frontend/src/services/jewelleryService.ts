import api from './api';

export interface Jewellery {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  basePrice: number;
  availableDesigns: string[];
  availableMetals: string[];
  availableSizes: (string | number)[];
  status: 'AVAILABLE' | 'OUT_OF_STOCK';
}

export interface Design {
  id: string;
  designName: string;
  jewelleryType: string;
  description: string;
  image: string;
  basePrice: number;
  status: 'ACTIVE' | 'ARCHIVED';
}

export interface Metal {
  id: string;
  metalName: string;
  purity: string;
  pricePerGram: number;
  colorCode: string;
  availability: boolean;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Showroom {
  id: string;
  showroomName: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  openingTime: string;
  closingTime: string;
  status: 'OPEN' | 'CLOSED';
}

export interface PriceBreakdown {
  basePrice: number;
  metalPrice: number;
  diamondPrice: number;
  customizationPrice: number;
  estimatedPrice: number;
}

export const jewelleryService = {
  getJewellery: async (): Promise<Jewellery[]> => {
    const res = await api.get<Jewellery[]>('/jewellery');
    return res.data;
  },

  getJewelleryById: async (id: string): Promise<Jewellery> => {
    const res = await api.get<Jewellery>(`/jewellery/${id}`);
    return res.data;
  },

  getDesigns: async (type?: string): Promise<Design[]> => {
    const res = await api.get<Design[]>('/designs', { params: { type } });
    return res.data;
  },

  getMetals: async (): Promise<Metal[]> => {
    const res = await api.get<Metal[]>('/metals');
    return res.data;
  },

  getShowrooms: async (): Promise<Showroom[]> => {
    const res = await api.get<Showroom[]>('/showrooms');
    return res.data;
  },

  getShowroomById: async (id: string): Promise<Showroom> => {
    const res = await api.get<Showroom>(`/showrooms/${id}`);
    return res.data;
  },

  calculatePrice: async (data: {
    jewelleryType?: string;
    designId?: string;
    metalId?: string;
    diamondId?: string;
    engraving?: string;
  }): Promise<PriceBreakdown> => {
    const res = await api.post<PriceBreakdown>('/customizations/calculate-price', data);
    return res.data;
  },
};
