import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { User } from '../../services/authService';
import { Sidebar } from '../../components/Sidebar';
import { Users, Mail, Phone, MapPin } from 'lucide-react';

export const ManageCustomers: React.FC = () => {
  const [customers, setCustomers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getUsers('ROLE_CUSTOMER').then((data) => {
      setCustomers(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        <div className="pb-6 border-b border-[#E8DEC8] mb-6">
          <span className="text-xs uppercase tracking-widest text-[#8B5E20] font-semibold">
            Client Registry
          </span>
          <h1 className="font-serif text-3xl font-medium text-[#171717] mt-1">
            Registered Customers
          </h1>
          <p className="text-xs text-[#6A5E50] mt-1">
            Overview of private clients registered on the JewelCraft bespoke platform.
          </p>
        </div>

        <div className="bg-white border border-[#E8DEC8] rounded-md shadow-xs overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F0] text-[#8A7D6B] uppercase tracking-wider border-b border-[#E8DEC8]">
                <tr>
                  <th className="py-3 px-4 font-semibold">User ID</th>
                  <th className="py-3 px-4 font-semibold">Name</th>
                  <th className="py-3 px-4 font-semibold">Email</th>
                  <th className="py-3 px-4 font-semibold">Phone</th>
                  <th className="py-3 px-4 font-semibold">City</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FAF7F0]">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-[#FAF7F0]/40">
                    <td className="py-3 px-4 font-mono font-bold text-[#171717]">{c.id}</td>
                    <td className="py-3 px-4 font-semibold text-[#171717]">{c.name}</td>
                    <td className="py-3 px-4 text-[#5C5346]">{c.email}</td>
                    <td className="py-3 px-4 text-[#5C5346]">{c.phone || '+91 98765 43210'}</td>
                    <td className="py-3 px-4 text-[#5C5346]">{c.city || 'Hyderabad'}</td>
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
