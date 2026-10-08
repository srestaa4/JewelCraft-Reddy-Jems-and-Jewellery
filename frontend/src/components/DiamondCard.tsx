import React from 'react';
import { Diamond } from '../services/diamondService';
import { Check, Gem } from 'lucide-react';

interface Props {
  diamond: Diamond;
  selected?: boolean;
  onSelect: (diamond: Diamond) => void;
}

export const DiamondCard: React.FC<Props> = ({ diamond, selected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(diamond)}
      className={`group bg-white rounded-md border p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
        selected
          ? 'border-[#B8863B] shadow-md ring-1 ring-[#B8863B] bg-[#FAF7F0]/40'
          : 'border-[#E8DEC8] hover:border-[#D5C2A5] hover:shadow-xs'
      }`}
    >
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FAF7F0] border border-[#E5DAC6] flex items-center justify-center text-[#8B5E20]">
              <Gem className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif text-base font-semibold text-[#171717]">
                {diamond.carat.toFixed(2)} Carat {diamond.shape}
              </h4>
              <span className="text-[11px] text-[#8A7D6B] font-mono">ID: {diamond.id}</span>
            </div>
          </div>

          {selected && (
            <div className="w-5 h-5 rounded-full bg-[#B8863B] text-white flex items-center justify-center shadow-xs">
              <Check className="w-3 h-3" />
            </div>
          )}
        </div>

        {/* 4Cs Grid */}
        <div className="grid grid-cols-3 gap-2 mt-4 bg-[#FAF7F0]/60 p-2.5 rounded text-center">
          <div>
            <span className="text-[10px] text-[#8A7D6B] uppercase tracking-wider block">Color</span>
            <span className="text-xs font-semibold text-[#171717]">{diamond.color.split(' ')[0]}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#8A7D6B] uppercase tracking-wider block">Clarity</span>
            <span className="text-xs font-semibold text-[#171717]">{diamond.clarity.split(' ')[0]}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#8A7D6B] uppercase tracking-wider block">Cut</span>
            <span className="text-xs font-semibold text-[#171717]">{diamond.cut}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#FAF7F0] flex items-center justify-between">
        <span className="text-[11px] text-[#4E7756] font-medium">Natural Certified</span>
        <span className="font-mono tabular-nums text-base font-bold text-[#8B5E20]">
          ₹{diamond.price.toLocaleString('en-IN')}
        </span>
      </div>
    </div>
  );
};
