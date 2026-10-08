import api from './api';

export interface DiamondShape {
  id: string;
  shapeName: string;
  description: string;
  aspect: string;
}

export interface Diamond {
  id: string;
  shape: string;
  carat: number;
  color: string;
  clarity: string;
  cut: string;
  price: number;
  stock: number;
  image: string;
  status: 'AVAILABLE' | 'RESERVED';
}

export interface DiamondFilterParams {
  shape?: string;
  minCarat?: number;
  maxCarat?: number;
  color?: string;
  clarity?: string;
  cut?: string;
  maxPrice?: number;
}

export const diamondService = {
  getDiamondShapes: async (): Promise<DiamondShape[]> => {
    const res = await api.get<DiamondShape[]>('/diamond-shapes');
    return res.data;
  },

  getDiamonds: async (params?: DiamondFilterParams): Promise<Diamond[]> => {
    const res = await api.get<Diamond[]>('/diamonds', { params });
    return res.data;
  },
};
