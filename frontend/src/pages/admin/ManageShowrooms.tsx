import React, { useState, useEffect } from 'react';
import { jewelleryService, Showroom } from '../../services/jewelleryService';
import { Sidebar } from '../../components/Sidebar';
import api from '../../services/api';
import { Building, Plus, MapPin, Phone, Mail, Clock } from 'lucide-react';

export const ManageShowrooms: React.FC = () => {
  const [showrooms, setShowrooms] = useState<Showroom[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form
  const [showroomName, setShowroomName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [openingTime, setOpeningTime] = useState('10:30 AM');
  const [closingTime, setClosingTime] = useState('08:30 PM');

  useEffect(() => {
    loadShowrooms();
  }, []);

  const loadShowrooms = () => {
    jewelleryService.getShowrooms().then(setShowrooms);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/showrooms', {
        showroomName,
        address,
        city,
        phone,
        email,
        openingTime,
        closingTime,
        status: 'OPEN',
      });
      setShowAddModal(false);
      loadShowrooms();
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
              Boutique Salons
            </span>
            <h1 className="font-serif text-3xl font-medium text-[#171717] mt-1">
              Manage Showroom Salons
            </h1>
            <p className="text-xs text-[#6A5E50] mt-1">
              Manage private consultation suites, contact concierge numbers, and operating schedules.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#B8863B] hover:bg-[#8B5E20] text-white text-xs uppercase tracking-wider font-semibold rounded flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Showroom</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          {showrooms.map((shw) => (
            <div key={shw.id} className="bg-white border border-[#E8DEC8] rounded-md p-6 shadow-xs space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#8A7D6B] uppercase">{shw.id}</span>
                  <h3 className="font-serif text-lg font-bold text-[#171717]">{shw.showroomName}</h3>
                </div>
                <span className="text-[10px] uppercase font-semibold text-[#2D6A4F] bg-[#E8F5E9] px-2 py-0.5 rounded border border-[#95D5B2]">
                  {shw.status}
                </span>
              </div>

              <div className="space-y-2 text-xs text-[#5C5346]">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#B8863B] shrink-0 mt-0.5" />
                  <span>{shw.address}, {shw.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#B8863B] shrink-0" />
                  <span>{shw.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#B8863B] shrink-0" />
                  <span>{shw.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#B8863B] shrink-0" />
                  <span>Open: {shw.openingTime} – {shw.closingTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-md border border-[#E8DEC8] max-w-md w-full p-6 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#FAF7F0] mb-4">
                <h3 className="font-serif text-lg font-bold text-[#171717]">Add Showroom Salon</h3>
                <button onClick={() => setShowAddModal(false)} className="text-xs text-[#8A7D6B]">✕</button>
              </div>

              <form onSubmit={handleAdd} className="space-y-3 text-xs">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                    Showroom Name
                  </label>
                  <input
                    type="text"
                    required
                    value={showroomName}
                    onChange={(e) => setShowroomName(e.target.value)}
                    placeholder="e.g. REDDY Chennai T-Nagar Salon"
                    className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="G.N. Chetty Road, T-Nagar"
                    className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                    City & State
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Chennai, Tamil Nadu"
                    className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                      Phone Concierge
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 44 2834 0011"
                      className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="chennai@jewelcraft.com"
                      className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-[#FAF7F0] flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-[#D5C2A5] text-xs font-semibold rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#B8863B] text-white text-xs uppercase tracking-wider font-semibold rounded"
                  >
                    Save Showroom
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
