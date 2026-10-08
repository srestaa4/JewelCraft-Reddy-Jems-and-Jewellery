import React from 'react';
import { Design } from '../services/jewelleryService';
import { Check } from 'lucide-react';

interface Props {
  design: Design;
  selected?: boolean;
  onSelect: (design: Design) => void;
}

export const DesignCard: React.FC<Props> = ({ design, selected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(design)}
      className={`group bg-white rounded-md border p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
        selected
          ? 'border-[#B8863B] shadow-md ring-1 ring-[#B8863B] bg-[#FAF7F0]/30'
          : 'border-[#E8DEC8] hover:border-[#D5C2A5] hover:shadow-xs'
      }`}
    >
      <div>
        <div className="relative aspect-4/3 bg-[#FAF7F0] rounded overflow-hidden mb-3">
          <img
            src={design.image}
            alt={design.designName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          {selected && (
            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#B8863B] text-white flex items-center justify-center shadow-xs">
              <Check className="w-3.5 h-3.5" />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <h4 className="font-serif text-base font-semibold text-[#171717]">
            {design.designName}
          </h4>
          <span className="text-[11px] text-[#8A7D6B] uppercase tracking-wider">{design.jewelleryType}</span>
        </div>

        <p className="text-xs text-[#6A5E50] mt-1.5 leading-relaxed line-clamp-2">
          {design.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-[#FAF7F0] flex items-center justify-between">
        <span className="text-[11px] text-[#8A7D6B]">Base Setting</span>
        <span className="font-mono tabular-nums text-sm font-semibold text-[#171717]">
          ₹{design.basePrice.toLocaleString('en-IN')}
        </span>
      </div>
    </div>
  );
};
