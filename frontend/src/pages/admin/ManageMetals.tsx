import React, { useState, useEffect } from 'react';
import { jewelleryService, Metal } from '../../services/jewelleryService';
import { Sidebar } from '../../components/Sidebar';
import api from '../../services/api';
import { Coins, Check, RefreshCw } from 'lucide-react';

export const ManageMetals: React.FC = () => {
  const [metals, setMetals] = useState<Metal[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedPrice, setEditedPrice] = useState<number>(0);

  useEffect(() => {
    loadMetals();
  }, []);

  const loadMetals = () => {
    jewelleryService.getMetals().then(setMetals);
  };

  const handleSavePrice = async (id: string) => {
    try {
      await api.put(`/metals/${id}`, { pricePerGram: editedPrice });
      setEditingId(null);
      loadMetals();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 max-w-5xl">
        <div className="pb-6 border-b border-[#E8DEC8] mb-6">
          <span className="text-xs uppercase tracking-widest text-[#8B5E20] font-semibold">
            Bullion Valuation Service
          </span>
          <h1 className="font-serif text-3xl font-medium text-[#171717] mt-1">
            Precious Metals & Bullion Rates
          </h1>
          <p className="text-xs text-[#6A5E50] mt-1">
            Live rates per gram used by the Spring Boot calculation engine to price custom jewelry mounts.
          </p>
        </div>

        <div className="bg-white border border-[#E8DEC8] rounded-md shadow-xs overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F0] text-[#8A7D6B] uppercase tracking-wider border-b border-[#E8DEC8]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Metal ID</th>
                  <th className="py-3 px-4 font-semibold">Precious Metal Alloy</th>
                  <th className="py-3 px-4 font-semibold">Purity</th>
                  <th className="py-3 px-4 font-semibold">Price Per Gram (₹)</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FAF7F0]">
                {metals.map((m) => (
                  <tr key={m.id} className="hover:bg-[#FAF7F0]/40">
                    <td className="py-3 px-4 font-mono font-bold text-[#171717]">{m.id}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: m.colorCode }}
                        />
                        <span className="font-semibold text-[#171717]">{m.metalName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-[#5C5346]">{m.purity}</td>
                    <td className="py-3 px-4 font-mono tabular-nums text-sm font-bold text-[#8B5E20]">
                      {editingId === m.id ? (
                        <input
                          type="number"
                          value={editedPrice}
                          onChange={(e) => setEditedPrice(parseFloat(e.target.value))}
                          className="w-28 bg-[#FAF7F0] border border-[#B8863B] rounded px-2 py-1 text-xs"
                        />
                      ) : (
                        `₹${m.pricePerGram.toLocaleString('en-IN')} / g`
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {editingId === m.id ? (
                        <button
                          onClick={() => handleSavePrice(m.id)}
                          className="px-3 py-1 bg-[#2D6A4F] text-white rounded text-xs font-semibold cursor-pointer"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingId(m.id);
                            setEditedPrice(m.pricePerGram);
                          }}
                          className="px-3 py-1 bg-[#FAF7F0] border border-[#D5C2A5] hover:bg-[#EFE1C5] text-[#171717] rounded text-xs font-semibold cursor-pointer"
                        >
                          Update Rate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
