import React, { useState, useEffect } from 'react';
import { quotationService, Quotation } from '../../services/quotationService';
import { Sidebar } from '../../components/Sidebar';
import { FileCheck, Calendar, User, ArrowRight, Printer } from 'lucide-react';

export const ManageQuotations: React.FC = () => {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    quotationService.getAllQuotations().then((data) => {
      setQuotations(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        <div className="pb-6 border-b border-[#E8DEC8] mb-6">
          <span className="text-xs uppercase tracking-widest text-[#8B5E20] font-semibold">
            Certified Valuations Ledger
          </span>
          <h1 className="font-serif text-3xl font-medium text-[#171717] mt-1">
            Manage Issued Quotations
          </h1>
          <p className="text-xs text-[#6A5E50] mt-1">
            Complete audit trail of all certified quotes issued by showroom consultants.
          </p>
        </div>

        <div className="bg-white border border-[#E8DEC8] rounded-md shadow-xs overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F0] text-[#8A7D6B] uppercase tracking-wider border-b border-[#E8DEC8]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Quotation ID</th>
                  <th className="py-3 px-4 font-semibold">Customer</th>
                  <th className="py-3 px-4 font-semibold">Sales Consultant</th>
                  <th className="py-3 px-4 font-semibold">Jewellery & Specs</th>
                  <th className="py-3 px-4 font-semibold">Final Price</th>
                  <th className="py-3 px-4 font-semibold">Valid Until</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FAF7F0]">
                {quotations.map((q) => (
                  <tr key={q.id} className="hover:bg-[#FAF7F0]/40">
                    <td className="py-3 px-4 font-mono font-bold text-[#171717]">{q.id}</td>
                    <td className="py-3 px-4 font-medium text-[#171717]">{q.customerName}</td>
                    <td className="py-3 px-4 text-[#5C5346]">{q.salesmanName}</td>
                    <td className="py-3 px-4">
                      <div>{q.jewellery} · {q.design}</div>
                      <div className="text-[11px] text-[#8A7D6B]">{q.metal} · {q.diamond}</div>
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums font-bold text-[#8B5E20]">
                      ₹{q.finalPrice.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 font-mono text-[#5C5346]">{q.validUntilDate}</td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] uppercase font-semibold text-[#2D6A4F] bg-[#E8F5E9] px-2 py-0.5 rounded border border-[#95D5B2]">
                        {q.status}
                      </span>
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
