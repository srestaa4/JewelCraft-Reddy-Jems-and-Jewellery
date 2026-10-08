import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomization } from '../../context/CustomizationContext';
import { jewelleryService, Jewellery, Design, Metal } from '../../services/jewelleryService';
import { diamondService, Diamond, DiamondShape } from '../../services/diamondService';
import { JewelleryPreviewCanvas } from '../../components/JewelleryPreviewCanvas';
import { PriceSummary } from '../../components/PriceSummary';
import { DesignCard } from '../../components/DesignCard';
import { MetalCard } from '../../components/MetalCard';
import { DiamondCard } from '../../components/DiamondCard';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  RotateCcw,
  Gem,
  Palette,
  Coins,
  Layers,
  Ruler,
  FileEdit,
  DollarSign,
  Calendar,
} from 'lucide-react';

export const CustomizeStudio: React.FC = () => {
  const navigate = useNavigate();
  const { customization, updateCustomization, recalculatePrice, resetToDefaults } = useCustomization();

  // Active sub-step inside studio
  const [activeStep, setActiveStep] = useState<number>(1);

  // Data collections from backend
  const [jewelleryTypes, setJewelleryTypes] = useState<Jewellery[]>([]);
  const [allDesigns, setAllDesigns] = useState<Design[]>([]);
  const [allMetals, setAllMetals] = useState<Metal[]>([]);
  const [allDiamonds, setAllDiamonds] = useState<Diamond[]>([]);
  const [diamondShapes, setDiamondShapes] = useState<DiamondShape[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load initial backend assets
  useEffect(() => {
    async function loadData() {
      try {
        const [jwl, dsg, mtl, dmd, shp] = await Promise.all([
          jewelleryService.getJewellery(),
          jewelleryService.getDesigns(),
          jewelleryService.getMetals(),
          diamondService.getDiamonds(),
          diamondService.getDiamondShapes(),
        ]);
        setJewelleryTypes(jwl);
        setAllDesigns(dsg);
        setAllMetals(mtl);
        setAllDiamonds(dmd);
        setDiamondShapes(shp);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Recalculate price via REST API whenever configuration changes
  useEffect(() => {
    recalculatePrice();
  }, [
    customization.jewelleryType,
    customization.designId,
    customization.metalId,
    customization.diamondId,
    customization.engraving,
    recalculatePrice,
  ]);

  const stepsList = [
    { num: 1, label: 'Jewellery', icon: Layers },
    { num: 2, label: 'Design', icon: Palette },
    { num: 3, label: 'Precious Metal', icon: Coins },
    { num: 4, label: 'Diamond & Shape', icon: Gem },
    { num: 5, label: 'Size & Engraving', icon: Ruler },
    { num: 6, label: 'Valuation & Price', icon: DollarSign },
  ];

  // Filter designs for currently chosen jewellery type
  const availableDesigns = allDesigns.filter(
    (d) => d.jewelleryType.toLowerCase() === customization.jewelleryType.toLowerCase()
  );

  const ringSizes = [8, 10, 12, 14, 16, 18, 20, 22];
  const necklaceSizes = ['16 inch (Choker)', '18 inch (Princess)', '20 inch (Matinee)', '24 inch (Opera)'];
  const braceletSizes = ['6.5 inch', '7.0 inch', '7.5 inch', '8.0 inch'];

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Studio Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8DEC8] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8B5E20] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#B8863B]" />
              <span>JewelCraft Bespoke Studio</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#171717] mt-0.5">
              Personalized Jewellery Customizer
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetToDefaults}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#6A5E50] hover:text-[#171717] bg-white border border-[#D5C2A5] rounded transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Configuration</span>
            </button>
            <button
              onClick={() => navigate('/customer/book-appointment')}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#B8863B] hover:bg-[#8B5E20] rounded transition-colors shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>

        {/* Step-by-Step Visual Progress Stepper (Zero-Pill Compliance) */}
        <div className="my-6 bg-white border border-[#E8DEC8] rounded-md p-3 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[640px]">
            {stepsList.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === step.num;
              const isPassed = activeStep > step.num;

              return (
                <div key={step.num} className="flex items-center flex-1">
                  <button
                    onClick={() => setActiveStep(step.num)}
                    className="flex items-center gap-2 text-left cursor-pointer group focus:outline-none"
                  >
                    <div
                      className={`w-7 h-7 rounded flex items-center justify-center text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-[#B8863B] text-white shadow-xs'
                          : isPassed
                          ? 'bg-[#171717] text-[#FAF7F0]'
                          : 'bg-[#FAF7F0] text-[#7C6E5D] border border-[#E5DAC6]'
                      }`}
                    >
                      {isPassed ? <Check className="w-3.5 h-3.5" /> : step.num}
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8A7D6B] uppercase tracking-wider block">
                        Step 0{step.num}
                      </span>
                      <span
                        className={`text-xs font-semibold whitespace-nowrap ${
                          isActive ? 'text-[#8B5E20]' : 'text-[#171717] group-hover:text-[#B8863B]'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  </button>

                  {idx < stepsList.length - 1 && (
                    <div className="flex-1 mx-3 h-[1px] bg-[#E8DEC8]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Studio Main Workspace: LEFT (Preview) & RIGHT (Controls) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Jewellery Preview & Quick Live Specs */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <JewelleryPreviewCanvas customization={customization} />

            {/* Quick Live Specs Summary */}
            <div className="bg-white border border-[#E8DEC8] rounded-md p-5 text-xs space-y-3">
              <h4 className="font-serif text-sm font-bold text-[#171717] uppercase tracking-wider border-b border-[#FAF7F0] pb-2">
                Live Specification Summary
              </h4>

              <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-[#5C5346]">
                <div>
                  <span className="text-[10px] text-[#8A7D6B] uppercase block">Jewellery Type</span>
                  <span className="font-semibold text-[#171717]">{customization.jewelleryType}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8A7D6B] uppercase block">Selected Design</span>
                  <span className="font-semibold text-[#171717]">{customization.designName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8A7D6B] uppercase block">Metal & Alloy</span>
                  <span className="font-semibold text-[#171717]">{customization.metalName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8A7D6B] uppercase block">Diamond Specs</span>
                  <span className="font-semibold text-[#171717]">
                    {customization.carat} ct · {customization.diamondShape} ({customization.clarity || 'VVS1'})
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8A7D6B] uppercase block">Size Spec</span>
                  <span className="font-semibold text-[#171717]">
                    {customization.size ? `Size ${customization.size}` : 'Standard'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8A7D6B] uppercase block">Engraving Inscription</span>
                  <span className="font-semibold text-[#8B5E20] italic truncate block">
                    {customization.engraving ? `"${customization.engraving}"` : 'None'}
                  </span>
                </div>
              </div>

              {/* Price Snippet */}
              <div className="pt-3 border-t border-[#FAF7F0] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#8A7D6B] uppercase block">Estimated Valuation</span>
                  <span className="font-serif text-xl font-bold text-[#8B5E20] font-mono tabular-nums">
                    ₹{customization.priceBreakdown.estimatedPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <button
                  onClick={() => setActiveStep(6)}
                  className="text-xs text-[#8B5E20] hover:text-[#171717] font-semibold underline cursor-pointer"
                >
                  View Breakdown
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Customization Controls by Step */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-[#E8DEC8] rounded-md p-6 shadow-xs">
              {/* STEP 1: JEWELLERY TYPE SELECTION */}
              {activeStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#8B5E20] font-semibold">
                      Step 1 of 6
                    </span>
                    <h2 className="font-serif text-2xl font-semibold text-[#171717]">
                      Choose Jewellery Type
                    </h2>
                    <p className="text-xs text-[#6A5E50] mt-1">
                      Select the piece you wish to personalize. Our atelier will adapt available mountings and size scales.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {jewelleryTypes.map((item) => {
                      const isSelected = customization.jewelleryType.toLowerCase() === item.type.toLowerCase();
                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            updateCustomization({
                              jewelleryId: item.id,
                              jewelleryName: item.name,
                              jewelleryType: item.type,
                              size: item.availableSizes[0] || 14,
                            });
                          }}
                          className={`p-4 rounded border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'border-[#B8863B] bg-[#FAF7F0]/40 ring-1 ring-[#B8863B]'
                              : 'border-[#E8DEC8] hover:border-[#D5C2A5]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-serif font-bold text-base text-[#171717]">
                              {item.name}
                            </span>
                            {isSelected && (
                              <div className="w-5 h-5 rounded-full bg-[#B8863B] text-white flex items-center justify-center">
                                <Check className="w-3 h-3" />
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-[#6A5E50] line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                          <div className="mt-3 pt-2 border-t border-[#FAF7F0] flex items-center justify-between text-xs">
                            <span className="text-[#8A7D6B]">Base from</span>
                            <span className="font-mono tabular-nums font-semibold text-[#171717]">
                              ₹{item.basePrice.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: DESIGN SELECTION */}
              {activeStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#8B5E20] font-semibold">
                      Step 2 of 6
                    </span>
                    <h2 className="font-serif text-2xl font-semibold text-[#171717]">
                      Choose Mounting & Design
                    </h2>
                    <p className="text-xs text-[#6A5E50] mt-1">
                      Curated artisanal settings for your {customization.jewelleryType}.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {availableDesigns.length > 0 ? (
                      availableDesigns.map((dsg) => (
                        <DesignCard
                          key={dsg.id}
                          design={dsg}
                          selected={customization.designId === dsg.id}
                          onSelect={(d) => {
                            updateCustomization({
                              designId: d.id,
                              designName: d.designName,
                            });
                          }}
                        />
                      ))
                    ) : (
                      allDesigns.map((dsg) => (
                        <DesignCard
                          key={dsg.id}
                          design={dsg}
                          selected={customization.designId === dsg.id}
                          onSelect={(d) => {
                            updateCustomization({
                              designId: d.id,
                              designName: d.designName,
                            });
                          }}
                        />
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* STEP 3: METAL SELECTION */}
              {activeStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#8B5E20] font-semibold">
                      Step 3 of 6
                    </span>
                    <h2 className="font-serif text-2xl font-semibold text-[#171717]">
                      Choose Precious Metal Alloy
                    </h2>
                    <p className="text-xs text-[#6A5E50] mt-1">
                      All precious metals are BIS hallmarked. Prices update in real time with live bullion markets.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {allMetals.map((metal) => (
                      <MetalCard
                        key={metal.id}
                        metal={metal}
                        selected={customization.metalId === metal.id}
                        onSelect={(m) => {
                          updateCustomization({
                            metalId: m.id,
                            metalName: m.metalName,
                          });
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: DIAMOND & SHAPE SELECTION */}
              {activeStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#8B5E20] font-semibold">
                      Step 4 of 6
                    </span>
                    <h2 className="font-serif text-2xl font-semibold text-[#171717]">
                      Select Diamond Shape & Grade
                    </h2>
                    <p className="text-xs text-[#6A5E50] mt-1">
                      Choose from 9 diamond shapes and certified natural loose diamonds.
                    </p>
                  </div>

                  {/* Shapes Horizontal Selector */}
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-2">
                      Diamond Shape Silhouette
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {diamondShapes.map((shape) => {
                        const isShapeSelected =
                          customization.diamondShape.toLowerCase() === shape.shapeName.toLowerCase();
                        return (
                          <button
                            key={shape.id}
                            type="button"
                            onClick={() => {
                              // Find corresponding diamond if exists
                              const matching = allDiamonds.find(
                                (d) => d.shape.toLowerCase() === shape.shapeName.toLowerCase()
                              );
                              updateCustomization({
                                diamondShape: shape.shapeName,
                                ...(matching
                                  ? {
                                      diamondId: matching.id,
                                      carat: matching.carat,
                                      color: matching.color,
                                      clarity: matching.clarity,
                                      cut: matching.cut,
                                    }
                                  : {}),
                              });
                            }}
                            className={`p-2.5 rounded text-center border transition-all cursor-pointer ${
                              isShapeSelected
                                ? 'bg-[#171717] text-white border-[#171717] shadow-xs'
                                : 'bg-white border-[#E5DAC6] text-[#171717] hover:bg-[#FAF7F0]'
                            }`}
                          >
                            <Gem className={`w-4 h-4 mx-auto mb-1 ${isShapeSelected ? 'text-[#D4AF37]' : 'text-[#8B5E20]'}`} />
                            <span className="text-xs font-semibold block">{shape.shapeName}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Certified Stones Grid */}
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-2">
                      Certified Natural Diamonds in Stock
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                      {allDiamonds.map((dmd) => (
                        <DiamondCard
                          key={dmd.id}
                          diamond={dmd}
                          selected={customization.diamondId === dmd.id}
                          onSelect={(d) => {
                            updateCustomization({
                              diamondId: d.id,
                              diamondShape: d.shape,
                              carat: d.carat,
                              color: d.color,
                              clarity: d.clarity,
                              cut: d.cut,
                            });
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: SIZE & ENGRAVING */}
              {activeStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#8B5E20] font-semibold">
                      Step 5 of 6
                    </span>
                    <h2 className="font-serif text-2xl font-semibold text-[#171717]">
                      Size Selection & Personalization
                    </h2>
                    <p className="text-xs text-[#6A5E50] mt-1">
                      Specify exact dimensions, laser engraving vows, and special consultation notes.
                    </p>
                  </div>

                  {/* Size buttons */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold">
                        {customization.jewelleryType} Size Selection
                      </label>
                      <span className="text-[11px] text-[#8B5E20]">
                        Showroom ring sizers available on visit
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {(customization.jewelleryType === 'Ring'
                        ? ringSizes
                        : customization.jewelleryType === 'Necklace'
                        ? necklaceSizes
                        : braceletSizes
                      ).map((sz) => {
                        const isSelected = String(customization.size) === String(sz);
                        return (
                          <button
                            key={String(sz)}
                            type="button"
                            onClick={() => updateCustomization({ size: sz })}
                            className={`px-4 py-2 text-xs font-semibold rounded border transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-[#171717] text-white border-[#171717]'
                                : 'bg-white border-[#D5C2A5] text-[#171717] hover:bg-[#FAF7F0]'
                            }`}
                          >
                            {customization.jewelleryType === 'Ring' ? `Size ${sz}` : sz}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Custom Engraving */}
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                      Laser Engraving Inscription (Optional)
                    </label>
                    <input
                      type="text"
                      maxLength={30}
                      value={customization.engraving}
                      onChange={(e) => updateCustomization({ engraving: e.target.value })}
                      placeholder="e.g. Forever & Always A&R"
                      className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-sm text-[#171717] focus:outline-none focus:border-[#B8863B]"
                    />
                    <span className="text-[10px] text-[#8A7D6B] block mt-1">
                      Up to 30 characters. Hand-inscribed on the interior band or bail. (+₹1,500)
                    </span>
                  </div>

                  {/* Consultation Notes */}
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                      Special Requests or Consultation Notes
                    </label>
                    <textarea
                      rows={3}
                      value={customization.notes}
                      onChange={(e) => updateCustomization({ notes: e.target.value })}
                      placeholder="Any specific setting height, claw prong preference, or matching wedding band interest..."
                      className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#B8863B]"
                    />
                  </div>
                </div>
              )}

              {/* STEP 6: VALUATION BREAKDOWN & FINAL REVIEW */}
              {activeStep === 6 && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#8B5E20] font-semibold">
                      Step 6 of 6
                    </span>
                    <h2 className="font-serif text-2xl font-semibold text-[#171717]">
                      Price Valuation & Appointment Review
                    </h2>
                    <p className="text-xs text-[#6A5E50] mt-1">
                      Your complete configuration is ready. Review the REST API itemized pricing below and proceed to choose a showroom appointment.
                    </p>
                  </div>

                  <PriceSummary
                    breakdown={customization.priceBreakdown}
                    isLoading={customization.isCalculating}
                    proceedLabel="Proceed to Select Showroom & Slot"
                    proceedTo="/customer/book-appointment"
                  />
                </div>
              )}

              {/* Bottom Step Navigation Bar */}
              <div className="pt-6 mt-6 border-t border-[#FAF7F0] flex items-center justify-between">
                {activeStep > 1 ? (
                  <button
                    onClick={() => setActiveStep(activeStep - 1)}
                    className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-semibold text-[#5C5346] hover:text-[#171717] border border-[#D5C2A5] rounded transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous Step</span>
                  </button>
                ) : (
                  <div />
                )}

                {activeStep < 6 ? (
                  <button
                    onClick={() => setActiveStep(activeStep + 1)}
                    className="flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wider font-semibold bg-[#171717] hover:bg-[#8B5E20] text-white rounded transition-colors shadow-xs cursor-pointer"
                  >
                    <span>Next: {stepsList[activeStep]?.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/customer/book-appointment')}
                    className="flex items-center gap-2 px-6 py-2.5 text-xs uppercase tracking-widest font-semibold bg-[#B8863B] hover:bg-[#8B5E20] text-white rounded transition-colors shadow-xs cursor-pointer"
                  >
                    <span>Continue to Appointment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
