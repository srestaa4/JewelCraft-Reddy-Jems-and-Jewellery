import React, { useState, useEffect } from 'react';
import { diamondService, Diamond } from '../../services/diamondService';
import { Sidebar } from '../../components/Sidebar';
import api from '../../services/api';
import { Gem, Plus, Trash2 } from 'lucide-react';

export const ManageDiamonds: React.FC = () => {
  const [diamonds, setDiamonds] = useState<Diamond[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form
  const [shape, setShape] = useState('Round');
  const [carat, setCarat] = useState(1.0);
  const [color, setColor] = useState('D (Colorless)');
  const [clarity, setClarity] = useState('VVS1');
  const [cut, setCut] = useState('Ideal');
  const [price, setPrice] = useState(95000);
  const [stock, setStock] = useState(5);

  useEffect(() => {
    loadDiamonds();
  }, []);

  const loadDiamonds = () => {
    diamondService.getDiamonds().then((data) => {
      setDiamonds(data);
      setLoading(false);
    });
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/diamonds', {
        shape,
        carat,
        color,
        clarity,
        cut,
        price,
        stock,
        image: '/images/jewellery/ring_solitaire.jpg',
        status: 'AVAILABLE',
      });
      setShowAddModal(false);
      loadDiamonds();
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
              Gemological Stock Management
            </span>
            <h1 className="font-serif text-3xl font-medium text-[#171717] mt-1">
              Manage Certified Diamonds
            </h1>
            <p className="text-xs text-[#6A5E50] mt-1">
              Maintain loose natural diamond inventory, 4Cs parameters, certification grades, and stock.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#B8863B] hover:bg-[#8B5E20] text-white text-xs uppercase tracking-wider font-semibold rounded flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Diamond Spec</span>
          </button>
        </div>

        <div className="bg-white border border-[#E8DEC8] rounded-md shadow-xs overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F0] text-[#8A7D6B] uppercase tracking-wider border-b border-[#E8DEC8]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Diamond ID</th>
                  <th className="py-3 px-4 font-semibold">Shape</th>
                  <th className="py-3 px-4 font-semibold">Carat</th>
                  <th className="py-3 px-4 font-semibold">Color</th>
                  <th className="py-3 px-4 font-semibold">Clarity</th>
                  <th className="py-3 px-4 font-semibold">Cut</th>
                  <th className="py-3 px-4 font-semibold">Price</th>
                  <th className="py-3 px-4 font-semibold">Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FAF7F0]">
                {diamonds.map((dmd) => (
                  <tr key={dmd.id} className="hover:bg-[#FAF7F0]/40">
                    <td className="py-3 px-4 font-mono font-bold text-[#171717]">{dmd.id}</td>
                    <td className="py-3 px-4 font-semibold text-[#171717]">{dmd.shape}</td>
                    <td className="py-3 px-4 font-mono font-medium">{dmd.carat.toFixed(2)} ct</td>
                    <td className="py-3 px-4">{dmd.color.split(' ')[0]}</td>
                    <td className="py-3 px-4">{dmd.clarity.split(' ')[0]}</td>
                    <td className="py-3 px-4">{dmd.cut}</td>
                    <td className="py-3 px-4 font-mono tabular-nums font-bold text-[#8B5E20]">
                      ₹{dmd.price.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 font-mono">{dmd.stock} units</td>
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
                <h3 className="font-serif text-lg font-bold text-[#171717]">Add Certified Diamond</h3>
                <button onClick={() => setShowAddModal(false)} className="text-xs text-[#8A7D6B]">✕</button>
              </div>

              <form onSubmit={handleAdd} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                      Shape
                    </label>
                    <select
                      value={shape}
                      onChange={(e) => setShape(e.target.value)}
                      className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs"
                    >
                      <option value="Round">Round</option>
                      <option value="Princess">Princess</option>
                      <option value="Oval">Oval</option>
                      <option value="Emerald">Emerald</option>
                      <option value="Pear">Pear</option>
                      <option value="Marquise">Marquise</option>
                      <option value="Cushion">Cushion</option>
                      <option value="Radiant">Radiant</option>
                      <option value="Heart">Heart</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                      Carat Weight
                    </label>
                    <input
                      type="number"
                      step="0.05"
                      required
                      value={carat}
                      onChange={(e) => setCarat(parseFloat(e.target.value))}
                      className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                      Color Grade
                    </label>
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                      Clarity Grade
                    </label>
                    <input
                      type="text"
                      value={clarity}
                      onChange={(e) => setClarity(e.target.value)}
                      className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(parseFloat(e.target.value))}
                      className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                      Stock Count
                    </label>
                    <input
                      type="number"
                      required
                      value={stock}
                      onChange={(e) => setStock(parseInt(e.target.value))}
                      className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs"
                    />
                  </div>
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
                    Save Diamond
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
