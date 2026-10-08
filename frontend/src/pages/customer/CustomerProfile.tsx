import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Sidebar } from '../../components/Sidebar';
import { User, Phone, Mail, MapPin, ShieldCheck, Check } from 'lucide-react';

export const CustomerProfile: React.FC = () => {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [city, setCity] = useState(user?.city || 'Hyderabad');
  const [address, setAddress] = useState(user?.address || 'Road No 36, Jubilee Hills, Hyderabad');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 max-w-4xl">
        <div className="pb-6 border-b border-[#E8DEC8] mb-8">
          <span className="text-xs uppercase tracking-widest text-[#8B5E20] font-semibold">
            Member Account
          </span>
          <h1 className="font-serif text-3xl font-medium text-[#171717] mt-1">
            Customer Profile
          </h1>
          <p className="text-xs text-[#6A5E50] mt-1">
            Personal contact details used for showroom consultations and quotation notifications.
          </p>
        </div>

        {saved && (
          <div className="mb-6 p-3 bg-[#E8F5E9] border border-[#95D5B2] text-[#2D6A4F] text-xs rounded flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Profile details updated successfully.</span>
          </div>
        )}

        <div className="bg-white border border-[#E8DEC8] rounded-md p-6 shadow-xs">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    disabled
                    value={user?.name || ''}
                    className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs text-[#171717] opacity-80"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs text-[#171717] opacity-80"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#B8863B]"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#B8863B]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                Consultation Residential Address
              </label>
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#B8863B]"
              />
            </div>

            <div className="pt-4 border-t border-[#FAF7F0] flex items-center justify-between">
              <span className="text-[11px] text-[#8A7D6B]">
                Role: <strong>{user?.role}</strong> (Spring Boot Authenticated)
              </span>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#B8863B] hover:bg-[#8B5E20] text-white text-xs uppercase tracking-wider font-semibold rounded transition-colors shadow-xs cursor-pointer"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
