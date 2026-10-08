import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Sidebar } from '../../components/Sidebar';
import { Briefcase, Building, Mail, Phone, Award } from 'lucide-react';

export const SalesmanProfile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 max-w-4xl">
        <div className="pb-6 border-b border-[#E8DEC8] mb-8">
          <span className="text-xs uppercase tracking-widest text-[#8B5E20] font-semibold">
            Sales Consultant Credentials
          </span>
          <h1 className="font-serif text-3xl font-medium text-[#171717] mt-1">
            Salesman Profile
          </h1>
          <p className="text-xs text-[#6A5E50] mt-1">
            Official employee details and assigned showroom location.
          </p>
        </div>

        <div className="bg-white border border-[#E8DEC8] rounded-md p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-4 border-b border-[#FAF7F0] pb-6">
            <div className="w-14 h-14 rounded-full bg-[#FAF7F0] border border-[#D5C2A5] flex items-center justify-center text-[#B8863B]">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#171717]">{user?.name}</h3>
              <span className="text-xs text-[#8A7D6B] font-mono">Employee ID: {user?.employeeCode || 'SALES-HYD-04'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-[#FAF7F0] rounded border border-[#EDE4D2]">
              <span className="text-[10px] text-[#8A7D6B] uppercase block">Official Email</span>
              <span className="font-semibold text-[#171717]">{user?.email}</span>
            </div>

            <div className="p-3 bg-[#FAF7F0] rounded border border-[#EDE4D2]">
              <span className="text-[10px] text-[#8A7D6B] uppercase block">Contact Phone</span>
              <span className="font-semibold text-[#171717]">{user?.phone || '+91 91234 56789'}</span>
            </div>

            <div className="p-3 bg-[#FAF7F0] rounded border border-[#EDE4D2]">
              <span className="text-[10px] text-[#8A7D6B] uppercase block">Assigned Showroom</span>
              <span className="font-semibold text-[#171717]">REDDY Jubilee Hills Flagship Salon</span>
            </div>

            <div className="p-3 bg-[#FAF7F0] rounded border border-[#EDE4D2]">
              <span className="text-[10px] text-[#8A7D6B] uppercase block">Role & Privileges</span>
              <span className="font-semibold text-[#2D6A4F]">ROLE_SALESMAN (Consultation & Quotation)</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
