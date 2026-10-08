import React from 'react';
import { Sidebar } from '../../components/Sidebar';
import { DollarSign, Calculator, Info, ShieldCheck, Code2 } from 'lucide-react';

export const ManagePricing: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F0] flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 max-w-5xl">
        <div className="pb-6 border-b border-[#E8DEC8] mb-6">
          <span className="text-xs uppercase tracking-widest text-[#8B5E20] font-semibold">
            Valuation Architecture
          </span>
          <h1 className="font-serif text-3xl font-medium text-[#171717] mt-1">
            Pricing Calculation Engine
          </h1>
          <p className="text-xs text-[#6A5E50] mt-1">
            Documentation and control for Spring Boot REST API price calculation formulas.
          </p>
        </div>

        <div className="space-y-6">
          {/* Formula Breakdown Card */}
          <div className="bg-white border border-[#E8DEC8] rounded-md p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#B8863B]" />
              <h3 className="font-serif text-lg font-bold text-[#171717]">
                Backend Pricing Formula Specification
              </h3>
            </div>

            <div className="p-4 bg-[#FAF7F0] border border-[#EDE4D2] rounded font-mono text-xs text-[#171717] leading-relaxed">
              <strong>Estimated Price</strong> = <br />
              &nbsp;&nbsp;Base Jewellery Price <br />
              &nbsp;&nbsp;+ (Estimated Metal Weight [g] × Live Bullion Rate / g) <br />
              &nbsp;&nbsp;+ Selected Certified Diamond Value <br />
              &nbsp;&nbsp;+ Customization Surcharge (Laser Engraving: ₹1,500 + Setting Fee: ₹2,000)
            </div>

            <p className="text-xs text-[#6A5E50] leading-relaxed">
              This formula is evaluated server-side in the Spring Boot <code className="bg-[#FAF7F0] px-1 py-0.5 rounded border border-[#EDE4D2]">PriceCalculationService</code> and exposed via endpoint <code className="bg-[#FAF7F0] px-1 py-0.5 rounded border border-[#EDE4D2]">POST /api/customizations/calculate-price</code>.
            </p>
          </div>

          {/* Metal Weight Standards Table */}
          <div className="bg-white border border-[#E8DEC8] rounded-md p-6 shadow-xs space-y-3">
            <h4 className="font-serif font-bold text-base text-[#171717]">
              Precious Metal Weight Matrices (Per Jewellery Archetype)
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              <div className="p-3 bg-[#FAF7F0] border border-[#EDE4D2] rounded text-center">
                <span className="text-[10px] text-[#8A7D6B] uppercase block">Ring</span>
                <span className="font-mono font-bold text-[#171717] text-sm">4.5 grams</span>
              </div>
              <div className="p-3 bg-[#FAF7F0] border border-[#EDE4D2] rounded text-center">
                <span className="text-[10px] text-[#8A7D6B] uppercase block">Bridal Necklace</span>
                <span className="font-mono font-bold text-[#171717] text-sm">24.0 grams</span>
              </div>
              <div className="p-3 bg-[#FAF7F0] border border-[#EDE4D2] rounded text-center">
                <span className="text-[10px] text-[#8A7D6B] uppercase block">Earrings Pair</span>
                <span className="font-mono font-bold text-[#171717] text-sm">8.0 grams</span>
              </div>
              <div className="p-3 bg-[#FAF7F0] border border-[#EDE4D2] rounded text-center">
                <span className="text-[10px] text-[#8A7D6B] uppercase block">Tennis Bracelet</span>
                <span className="font-mono font-bold text-[#171717] text-sm">16.0 grams</span>
              </div>
              <div className="p-3 bg-[#FAF7F0] border border-[#EDE4D2] rounded text-center">
                <span className="text-[10px] text-[#8A7D6B] uppercase block">Pendant</span>
                <span className="font-mono font-bold text-[#171717] text-sm">3.5 grams</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
