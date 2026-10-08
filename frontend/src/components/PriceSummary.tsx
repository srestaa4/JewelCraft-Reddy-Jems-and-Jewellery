import React from 'react';
import { PriceBreakdown } from '../services/jewelleryService';
import { ArrowRight, Loader2, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  breakdown: PriceBreakdown;
  isLoading?: boolean;
  onProceed?: () => void;
  proceedLabel?: string;
  proceedTo?: string;
  showProceedButton?: boolean;
}

export const PriceSummary: React.FC<Props> = ({
  breakdown,
  isLoading = false,
  onProceed,
  proceedLabel = 'Continue to Showroom Appointment',
  proceedTo = '/customer/book-appointment',
  showProceedButton = true,
}) => {
  return (
    <div className="bg-white border border-[#E8DEC8] rounded-md p-6 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-[#FAF7F0] pb-3 mb-4">
          <h3 className="font-serif text-lg font-bold text-[#171717]">
            Estimated Valuation Summary
          </h3>
          <span className="text-[11px] uppercase tracking-wider text-[#8B5E20] font-semibold bg-[#FAF7F0] px-2.5 py-1 rounded border border-[#EDE4D2]">
            REST API Calculation
          </span>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between text-[#5C5346]">
            <span>Base Mount & Setting Price</span>
            <span className="font-mono tabular-nums font-medium text-[#171717]">
              ₹{breakdown.basePrice.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex items-center justify-between text-[#5C5346]">
            <span>Precious Metal Valuation</span>
            <span className="font-mono tabular-nums font-medium text-[#171717]">
              ₹{breakdown.metalPrice.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex items-center justify-between text-[#5C5346]">
            <span>Natural Certified Diamond</span>
            <span className="font-mono tabular-nums font-medium text-[#171717]">
              ₹{breakdown.diamondPrice.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex items-center justify-between text-[#5C5346]">
            <span>Artisan Customization & Setting</span>
            <span className="font-mono tabular-nums font-medium text-[#171717]">
              ₹{breakdown.customizationPrice.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="pt-4 border-t border-[#E8DEC8] flex items-baseline justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#8A7D6B] block">Total Estimated Price</span>
              <span className="text-[11px] text-[#A89D8F] flex items-center gap-1 mt-0.5">
                <Info className="w-3 h-3 text-[#B8863B]" />
                Final quotation provided during showroom visit
              </span>
            </div>
            <div className="text-right">
              {isLoading ? (
                <div className="flex items-center gap-2 text-[#8B5E20]">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm font-medium">Recalculating...</span>
                </div>
              ) : (
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#8B5E20] font-mono tabular-nums">
                  ₹{breakdown.estimatedPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {showProceedButton && (
        <div className="mt-6 pt-4 border-t border-[#FAF7F0]">
          {onProceed ? (
            <button
              onClick={onProceed}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-[#B8863B] hover:bg-[#8B5E20] text-white text-xs uppercase tracking-widest font-semibold rounded transition-colors shadow-xs cursor-pointer disabled:opacity-50"
            >
              <span>{proceedLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <Link
              to={proceedTo}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-[#B8863B] hover:bg-[#8B5E20] text-white text-xs uppercase tracking-widest font-semibold rounded transition-colors shadow-xs"
            >
              <span>{proceedLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
          <p className="text-[11px] text-center text-[#8A7D6B] mt-2">
            No payment required online · Free appointment booking
          </p>
        </div>
      )}
    </div>
  );
};
