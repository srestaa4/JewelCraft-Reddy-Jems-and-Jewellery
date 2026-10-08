import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jewelleryService, PriceBreakdown } from '../services/jewelleryService';

export interface CustomizationState {
  jewelleryType: string;
  jewelleryId: string;
  jewelleryName: string;
  designId: string;
  designName: string;
  metalId: string;
  metalName: string;
  diamondId: string;
  diamondShape: string;
  carat: number;
  color: string;
  clarity: string;
  cut: string;
  size: string | number;
  engraving: string;
  notes: string;
  priceBreakdown: PriceBreakdown;
  isCalculating: boolean;
}

const defaultInitialState: CustomizationState = {
  jewelleryType: 'Ring',
  jewelleryId: 'JWL-01',
  jewelleryName: 'Solitaire & Diamond Rings',
  designId: 'DSG-01',
  designName: 'Classic Solitaire',
  metalId: 'MTL-01',
  metalName: '18K Yellow Gold',
  diamondId: 'DMD-01',
  diamondShape: 'Round',
  carat: 0.50,
  color: 'D (Colorless)',
  clarity: 'VVS1',
  cut: 'Excellent',
  size: 14,
  engraving: 'Forever & Always',
  notes: '',
  priceBreakdown: {
    basePrice: 25000,
    metalPrice: 25200,
    diamondPrice: 32000,
    customizationPrice: 3500,
    estimatedPrice: 85700,
  },
  isCalculating: false,
};

interface CustomizationContextType {
  customization: CustomizationState;
  updateCustomization: (updates: Partial<CustomizationState>) => void;
  recalculatePrice: () => Promise<void>;
  resetToDefaults: () => void;
}

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

export const CustomizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customization, setCustomization] = useState<CustomizationState>(() => {
    const saved = localStorage.getItem('jewelcraft_draft_customization');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultInitialState;
      }
    }
    return defaultInitialState;
  });

  const recalculatePrice = useCallback(async () => {
    setCustomization(prev => ({ ...prev, isCalculating: true }));
    try {
      const breakdown = await jewelleryService.calculatePrice({
        jewelleryType: customization.jewelleryType,
        designId: customization.designId,
        metalId: customization.metalId,
        diamondId: customization.diamondId,
        engraving: customization.engraving,
      });
      setCustomization(prev => ({
        ...prev,
        priceBreakdown: breakdown,
        isCalculating: false,
      }));
    } catch {
      setCustomization(prev => ({ ...prev, isCalculating: false }));
    }
  }, [
    customization.jewelleryType,
    customization.designId,
    customization.metalId,
    customization.diamondId,
    customization.engraving,
  ]);

  useEffect(() => {
    localStorage.setItem('jewelcraft_draft_customization', JSON.stringify(customization));
  }, [customization]);

  const updateCustomization = (updates: Partial<CustomizationState>) => {
    setCustomization(prev => {
      const next = { ...prev, ...updates };
      return next;
    });
  };

  const resetToDefaults = () => {
    setCustomization(defaultInitialState);
    localStorage.removeItem('jewelcraft_draft_customization');
  };

  return (
    <CustomizationContext.Provider
      value={{
        customization,
        updateCustomization,
        recalculatePrice,
        resetToDefaults,
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  if (!context) {
    throw new Error('useCustomization must be used within a CustomizationProvider');
  }
  return context;
};
