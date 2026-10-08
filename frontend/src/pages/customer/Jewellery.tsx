import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jewelleryService, Jewellery } from '../../services/jewelleryService';
import { JewelleryCard } from '../../components/JewelleryCard';
import { useCustomization } from '../../context/CustomizationContext';
import { Sparkles, Loader2, ArrowRight } from 'lucide-react';

export const JewelleryCatalog: React.FC = () => {
  const [items, setItems] = useState<Jewellery[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('All');
  const navigate = useNavigate();
  const { updateCustomization } = useCustomization();

  useEffect(() => {
    jewelleryService.getJewellery().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const types = ['All', 'Ring', 'Necklace', 'Earrings', 'Bracelet', 'Pendant'];

  const filtered = selectedType === 'All'
    ? items
    : items.filter((j) => j.type.toLowerCase() === selectedType.toLowerCase());

  const handleSelectJewellery = (jewellery: Jewellery) => {
    updateCustomization({
      jewelleryId: jewellery.id,
      jewelleryName: jewellery.name,
      jewelleryType: jewellery.type,
      size: jewellery.availableSizes[0] || 14,
    });
    navigate('/customize');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-[#E8DEC8] pb-8 mb-8">
          <span className="text-xs uppercase tracking-widest text-[#8B5E20] font-semibold">
            Bespoke Collection Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#171717] mt-1">
            Choose Your Jewellery Category
          </h1>
          <p className="text-xs sm:text-sm text-[#6A5E50] mt-2 max-w-2xl">
            Select a piece from our fine jewellery archetypes to enter the Customization Studio, where you can modify the mounting, precious metal, and certified diamonds.
          </p>

          {/* Filter Bar (Functional buttons complying with zero-pill rule) */}
          <div className="flex flex-wrap items-center gap-2 mt-6">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer ${
                  selectedType === type
                    ? 'bg-[#171717] text-white shadow-xs'
                    : 'bg-white border border-[#D5C2A5] text-[#5C5346] hover:bg-[#FAF7F0] hover:text-[#171717]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-[#B8863B] animate-spin" />
            <span className="text-xs text-[#8A7D6B] uppercase tracking-wider">Loading Jewellery Catalog...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <JewelleryCard
                key={item.id}
                jewellery={item}
                onSelect={handleSelectJewellery}
              />
            ))}
          </div>
        )}

        {/* Studio Callout */}
        <div className="mt-16 bg-white border border-[#E8DEC8] rounded-md p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-[#171717]">
              Already have a specific setting in mind?
            </h3>
            <p className="text-xs text-[#6A5E50]">
              You can jump directly into our Customizer Studio to configure diamond carats and precious metals.
            </p>
          </div>
          <button
            onClick={() => navigate('/customize')}
            className="px-6 py-3 bg-[#B8863B] hover:bg-[#8B5E20] text-white text-xs uppercase tracking-widest font-semibold rounded transition-colors shrink-0 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#FAF7F0]" />
            <span>Open Studio Customizer</span>
          </button>
        </div>
      </div>
    </div>
  );
};
