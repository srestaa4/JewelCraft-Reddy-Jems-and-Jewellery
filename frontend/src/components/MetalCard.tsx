import React from 'react';
import { Metal } from '../services/jewelleryService';
import { Check } from 'lucide-react';

interface Props {
  metal: Metal;
  selected?: boolean;
  onSelect: (metal: Metal) => void;
}

export const MetalCard: React.FC<Props> = ({ metal, selected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(metal)}
      className={`group bg-white rounded-md border p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
        selected
          ? 'border-[#B8863B] shadow-md ring-1 ring-[#B8863B] bg-[#FAF7F0]/40'
          : 'border-[#E8DEC8] hover:border-[#D5C2A5] hover:shadow-xs'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Visual swatch circle with gold luster */}
          <div
            className="w-10 h-10 rounded-full border-2 border-white shadow-xs flex items-center justify-center shrink-0"
            style={{ backgroundColor: metal.colorCode }}
          >
            <div className="w-4 h-4 rounded-full bg-white/30 backdrop-blur-xs" />
          </div>
          <div>
            <h4 className="font-serif text-base font-semibold text-[#171717]">
              {metal.metalName}
            </h4>
            <span className="text-xs text-[#6A5E50]">{metal.purity}</span>
          </div>
        </div>

        {selected && (
          <div className="w-5 h-5 rounded-full bg-[#B8863B] text-white flex items-center justify-center shadow-xs">
            <Check className="w-3 h-3" />
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-[#FAF7F0] flex items-center justify-between">
        <span className="text-[11px] text-[#8A7D6B] uppercase tracking-wider">Live Rate</span>
        <span className="font-mono tabular-nums text-sm font-semibold text-[#171717]">
          ₹{metal.pricePerGram.toLocaleString('en-IN')} / g
        </span>
      </div>
    </div>
  );
};
