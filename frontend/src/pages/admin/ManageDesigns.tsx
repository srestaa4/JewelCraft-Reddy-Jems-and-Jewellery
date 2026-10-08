import React, { useState, useEffect } from 'react';
import { jewelleryService, Design } from '../../services/jewelleryService';
import { Sidebar } from '../../components/Sidebar';
import api from '../../services/api';
import { Palette, Plus, Trash2 } from 'lucide-react';

export const ManageDesigns: React.FC = () => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form
  const [designName, setDesignName] = useState('');
  const [jewelleryType, setJewelleryType] = useState('Ring');
  const [description, setDescription] = useState('');
  const [basePrice, setBasePrice] = useState(15000);

  useEffect(() => {
    loadDesigns();
  }, []);

  const loadDesigns = () => {
    jewelleryService.getDesigns().then((data) => {
      setDesigns(data);
      setLoading(false);
    });
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/designs', {
        designName,
        jewelleryType,
        description,
        basePrice,
        image: '/images/jewellery/ring_solitaire.jpg',
        status: 'ACTIVE',
      });
      setShowAddModal(false);
      setDesignName('');
      setDescription('');
      loadDesigns();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8DEC8] gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8B5E20] font-semibold">
              Design Catalog
            </span>
            <h1 className="font-serif text-3xl font-medium text-[#171717] mt-1">
              Manage Mounting Designs
            </h1>
            <p className="text-xs text-[#6A5E50] mt-1">
              Configure solitaire, halo, pavé, bezel, and vintage filigree settings.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#B8863B] hover:bg-[#8B5E20] text-white text-xs uppercase tracking-wider font-semibold rounded flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Design</span>
          </button>
        </div>

        <div className="bg-white border border-[#E8DEC8] rounded-md shadow-xs overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F0] text-[#8A7D6B] uppercase tracking-wider border-b border-[#E8DEC8]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Design ID</th>
                  <th className="py-3 px-4 font-semibold">Design Name</th>
                  <th className="py-3 px-4 font-semibold">Jewellery Type</th>
                  <th className="py-3 px-4 font-semibold">Base Price</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FAF7F0]">
                {designs.map((dsg) => (
                  <tr key={dsg.id} className="hover:bg-[#FAF7F0]/40">
                    <td className="py-3 px-4 font-mono font-bold text-[#171717]">{dsg.id}</td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-[#171717]">{dsg.designName}</div>
                      <div className="text-[11px] text-[#6A5E50] line-clamp-1">{dsg.description}</div>
                    </td>
                    <td className="py-3 px-4 font-medium text-[#171717]">{dsg.jewelleryType}</td>
                    <td className="py-3 px-4 font-mono tabular-nums font-semibold text-[#8B5E20]">
                      ₹{dsg.basePrice.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] uppercase font-semibold text-[#2D6A4F] bg-[#E8F5E9] px-2 py-0.5 rounded border border-[#95D5B2]">
                        {dsg.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-md border border-[#E8DEC8] max-w-md w-full p-6 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#FAF7F0] mb-4">
                <h3 className="font-serif text-lg font-bold text-[#171717]">Add Jewellery Design</h3>
                <button onClick={() => setShowAddModal(false)} className="text-xs text-[#8A7D6B]">✕</button>
              </div>

              <form onSubmit={handleAdd} className="space-y-4 text-xs">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                    Design Name
                  </label>
                  <input
                    type="text"
                    required
                    value={designName}
                    onChange={(e) => setDesignName(e.target.value)}
                    placeholder="e.g. Royal Crown Pavé"
                    className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs text-[#171717]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                    Category Type
                  </label>
                  <select
                    value={jewelleryType}
                    onChange={(e) => setJewelleryType(e.target.value)}
                    className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs text-[#171717]"
                  >
                    <option value="Ring">Ring</option>
                    <option value="Necklace">Necklace</option>
                    <option value="Earrings">Earrings</option>
                    <option value="Bracelet">Bracelet</option>
                    <option value="Pendant">Pendant</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs text-[#171717]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                    Base Setting Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={basePrice}
                    onChange={(e) => setBasePrice(parseFloat(e.target.value))}
                    className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs text-[#171717]"
                  />
                </div>

                <div className="pt-3 border-t border-[#FAF7F0] flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-[#D5C2A5] text-xs font-semibold rounded text-[#171717]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#B8863B] text-white text-xs uppercase tracking-wider font-semibold rounded"
                  >
                    Save Design
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
