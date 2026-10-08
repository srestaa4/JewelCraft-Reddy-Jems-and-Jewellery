import React from 'react';
import { Jewellery } from '../services/jewelleryService';
import { Sparkles, ArrowRight } from 'lucide-react';

interface Props {
  jewellery: Jewellery;
  onSelect?: (jewellery: Jewellery) => void;
  selected?: boolean;
}

export const JewelleryCard: React.FC<Props> = ({ jewellery, onSelect, selected }) => {
  return (
    <div
      onClick={() => onSelect && onSelect(jewellery)}
      className={`group bg-white rounded-md border transition-all duration-200 overflow-hidden flex flex-col justify-between cursor-pointer ${
        selected
          ? 'border-[#B8863B] shadow-md ring-1 ring-[#B8863B]'
          : 'border-[#E8DEC8] hover:border-[#D5C2A5] hover:shadow-sm'
      }`}
    >
      {/* Visual Area */}
      <div className="relative aspect-4/3 bg-[#FAF7F0] overflow-hidden flex items-center justify-center p-4">
        <img
          src={jewellery.image}
          alt={jewellery.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-xs"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        {/* Type text tag */}
        <div className="absolute top-3 left-3 bg-[#FAF7F0]/90 backdrop-blur-xs text-[11px] font-semibold text-[#8B5E20] uppercase tracking-wider px-2 py-0.5 rounded border border-[#EDE4D2]">
          {jewellery.type}
        </div>
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-serif text-lg font-semibold text-[#171717] group-hover:text-[#8B5E20] transition-colors">
            {jewellery.name}
          </h3>
          <p className="text-xs text-[#6A5E50] line-clamp-2 mt-1.5 leading-relaxed">
            {jewellery.description}
          </p>

          <div className="mt-3 flex items-center gap-2 text-xs text-[#8A7D6B]">
            <span>{jewellery.availableDesigns.length} Signature Designs</span>
            <span>·</span>
            <span>{jewellery.availableMetals.length} Precious Metals</span>
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-[#FAF7F0] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#8A7D6B] block">Starting from</span>
            <span className="font-mono tabular-nums text-base font-semibold text-[#171717]">
              ₹{jewellery.basePrice.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            type="button"
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 ${
              selected
                ? 'bg-[#B8863B] text-white'
                : 'bg-[#FAF7F0] text-[#171717] group-hover:bg-[#EFE1C5] text-[#8B5E20]'
            }`}
          >
            <span>{selected ? 'Selected' : 'Customize'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
