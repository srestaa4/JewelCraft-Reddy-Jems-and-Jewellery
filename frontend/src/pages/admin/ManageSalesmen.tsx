import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { User } from '../../services/authService';
import { Sidebar } from '../../components/Sidebar';
import { Briefcase, Plus, Building, Phone, Mail } from 'lucide-react';

export const ManageSalesmen: React.FC = () => {
  const [salesmen, setSalesmen] = useState<User[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');

  useEffect(() => {
    loadSalesmen();
  }, []);

  const loadSalesmen = () => {
    adminService.getUsers('ROLE_SALESMAN').then(setSalesmen);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminService.createUser({
        name,
        email,
        phone,
        employeeCode,
        role: 'ROLE_SALESMAN',
        password: 'password123',
      });
      setShowAddModal(false);
      setName('');
      setEmail('');
      setPhone('');
      setEmployeeCode('');
      loadSalesmen();
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
              Atelier Personnel
            </span>
            <h1 className="font-serif text-3xl font-medium text-[#171717] mt-1">
              Manage Sales Consultants
            </h1>
            <p className="text-xs text-[#6A5E50] mt-1">
              Configure senior sales staff credentials and showroom floor assignments.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#B8863B] hover:bg-[#8B5E20] text-white text-xs uppercase tracking-wider font-semibold rounded flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Sales Consultant</span>
          </button>
        </div>

        <div className="bg-white border border-[#E8DEC8] rounded-md shadow-xs overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F0] text-[#8A7D6B] uppercase tracking-wider border-b border-[#E8DEC8]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Staff Code</th>
                  <th className="py-3 px-4 font-semibold">Full Name</th>
                  <th className="py-3 px-4 font-semibold">Work Email</th>
                  <th className="py-3 px-4 font-semibold">Mobile Phone</th>
                  <th className="py-3 px-4 font-semibold">Role Authority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FAF7F0]">
                {salesmen.map((s) => (
                  <tr key={s.id} className="hover:bg-[#FAF7F0]/40">
                    <td className="py-3 px-4 font-mono font-bold text-[#171717]">{s.employeeCode || s.id}</td>
                    <td className="py-3 px-4 font-semibold text-[#171717]">{s.name}</td>
                    <td className="py-3 px-4 text-[#5C5346]">{s.email}</td>
                    <td className="py-3 px-4 text-[#5C5346]">{s.phone || '+91 91234 56789'}</td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] uppercase font-semibold text-[#2D6A4F] bg-[#E8F5E9] px-2 py-0.5 rounded border border-[#95D5B2]">
                        {s.role}
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
                <h3 className="font-serif text-lg font-bold text-[#171717]">Add Sales Consultant</h3>
                <button onClick={() => setShowAddModal(false)} className="text-xs text-[#8A7D6B]">✕</button>
              </div>

              <form onSubmit={handleAdd} className="space-y-3 text-xs">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                    Consultant Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Vikramaditya Rao"
                    className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                    Employee Code
                  </label>
                  <input
                    type="text"
                    required
                    value={employeeCode}
                    onChange={(e) => setEmployeeCode(e.target.value)}
                    placeholder="e.g. SALES-HYD-07"
                    className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vikram.sales@jewelcraft.com"
                    className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 94400 12345"
                    className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs"
                  />
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
                    Register Consultant
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
