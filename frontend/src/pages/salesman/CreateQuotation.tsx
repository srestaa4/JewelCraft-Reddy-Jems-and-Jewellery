import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { appointmentService, Appointment } from '../../services/appointmentService';
import { quotationService, Quotation } from '../../services/quotationService';
import { useAuth } from '../../context/AuthContext';
import { Sidebar } from '../../components/Sidebar';
import {
  FileCheck,
  CheckCircle,
  AlertCircle,
  Calculator,
  ArrowRight,
  ShieldCheck,
  Printer,
} from 'lucide-react';

export const CreateQuotation: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const appointmentId = searchParams.get('appointmentId');
  const { user } = useAuth();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [additionalCharges, setAdditionalCharges] = useState<number>(4500); // Making & Hallmarking
  const [discount, setDiscount] = useState<number>(2500); // Showroom courtesy discount
  const [salesmanNotes, setSalesmanNotes] = useState<string>(
    'Includes complimentary laser hallmark certification, 1-year free resizing, and lifetime sonic cleaning.'
  );
  const [validDays, setValidDays] = useState<number>(30);
  const [submitting, setSubmitting] = useState(false);
  const [createdQuotation, setCreatedQuotation] = useState<Quotation | null>(null);

  useEffect(() => {
    appointmentService.getAllAppointments().then((appts) => {
      const target = appointmentId
        ? appts.find((a) => a.id === appointmentId)
        : appts[0];
      if (target) {
        setAppointment(target);
      }
    });
  }, [appointmentId]);

  if (!appointment) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] flex">
        <Sidebar />
        <main className="flex-1 p-10 text-center text-xs text-[#8A7D6B]">
          Loading appointment details...
        </main>
      </div>
    );
  }

  const cust = appointment.customization || {};
  const estimatedPrice = cust.estimatedPrice || 80000;
  const finalPrice = Math.max(0, estimatedPrice + additionalCharges - discount);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const q = await quotationService.createQuotation({
        appointmentId: appointment.id,
        customerId: appointment.customerId,
        salesmanId: user?.id || appointment.salesmanId || 'USR-SALES-1',
        jewellery: cust.jewelleryType || 'Ring',
        design: cust.designName || 'Solitaire',
        metal: cust.metalName || '18K Gold',
        diamond: `${cust.carat || 0.50}ct ${cust.diamondShape || 'Round'} (${cust.clarity || 'VVS1'})`,
        diamondShape: cust.diamondShape || 'Round',
        size: cust.size || 14,
        customizationDetails: cust.engraving ? `Engraving: "${cust.engraving}"` : 'Standard Setting',
        estimatedPrice,
        additionalCharges,
        discount,
        finalPrice,
        salesmanNotes,
        validDays,
      });

      setCreatedQuotation(q);
    } catch (err: any) {
      alert(err.message || 'Failed to generate quotation');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 max-w-5xl">
        <div className="pb-6 border-b border-[#E8DEC8] mb-8">
          <span className="text-xs uppercase tracking-widest text-[#8B5E20] font-semibold">
            Certified Showroom Quotation Generator
          </span>
          <h1 className="font-serif text-3xl font-medium text-[#171717] mt-1">
            Create Official Final Quotation
          </h1>
          <p className="text-xs text-[#6A5E50] mt-1">
            Generate a binding quotation for appointment #{appointment.id} with making charges, certification fees, and applicable discounts.
          </p>
        </div>

        {createdQuotation ? (
          <div className="bg-white border border-[#E8DEC8] rounded-md p-8 shadow-sm text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#E8F5E9] text-[#2D6A4F] flex items-center justify-center mx-auto border border-[#95D5B2]">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h2 className="font-serif text-2xl font-bold text-[#171717]">
              Quotation #{createdQuotation.id} Created Successfully
            </h2>
            <p className="text-xs text-[#6A5E50] max-w-md mx-auto">
              This quotation is now permanently stored in the customer's portal and appointment record #{appointment.id}.
            </p>

            <div className="bg-[#FAF7F0] max-w-sm mx-auto p-4 rounded border border-[#EDE4D2] text-xs space-y-1">
              <div className="flex justify-between">
                <span>Final Certified Price:</span>
                <span className="font-mono font-bold text-[#8B5E20]">
                  ₹{createdQuotation.finalPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Valid Until:</span>
                <span className="font-medium text-[#171717]">{createdQuotation.validUntilDate}</span>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 border border-[#D5C2A5] text-xs font-semibold rounded text-[#171717]"
              >
                Print Quotation
              </button>
              <button
                onClick={() => navigate('/salesman/dashboard')}
                className="px-5 py-2 bg-[#B8863B] text-white text-xs uppercase tracking-wider font-semibold rounded"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Configuration Snapshot Card */}
            <div className="bg-white border border-[#E8DEC8] rounded-md p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#FAF7F0] pb-3 mb-4">
                <h3 className="font-serif text-base font-bold text-[#171717]">
                  Target Configuration for {appointment.customerName}
                </h3>
                <span className="text-xs text-[#8A7D6B] font-mono">Appt #{appointment.id}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-[#FAF7F0] p-4 rounded border border-[#EDE4D2]">
                <div>
                  <span className="text-[10px] text-[#8A7D6B] uppercase block">Jewellery Piece</span>
                  <span className="font-semibold text-[#171717]">{cust.jewelleryType}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8A7D6B] uppercase block">Mounting Design</span>
                  <span className="font-semibold text-[#171717]">{cust.designName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8A7D6B] uppercase block">Precious Metal</span>
                  <span className="font-semibold text-[#171717]">{cust.metalName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8A7D6B] uppercase block">Diamond Specs</span>
                  <span className="font-semibold text-[#171717]">{cust.carat} ct {cust.diamondShape}</span>
                </div>
              </div>
            </div>

            {/* Pricing Adjustments */}
            <div className="bg-white border border-[#E8DEC8] rounded-md p-6 shadow-xs space-y-6">
              <h3 className="font-serif text-base font-bold text-[#171717] uppercase tracking-wider">
                Financial Pricing Formulation
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                    Base Customizer Valuation (₹)
                  </label>
                  <input
                    type="number"
                    disabled
                    value={estimatedPrice}
                    className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 font-mono font-bold text-[#171717]"
                  />
                  <span className="text-[10px] text-[#8A7D6B] block mt-1">Calculated via REST API</span>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                    Artisan Making & Certification (₹)
                  </label>
                  <input
                    type="number"
                    value={additionalCharges}
                    onChange={(e) => setAdditionalCharges(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 font-mono font-semibold text-[#171717] focus:outline-none focus:border-[#B8863B]"
                  />
                  <span className="text-[10px] text-[#8A7D6B] block mt-1">Hand-finishing + IGI grading</span>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                    Consultation Discount (₹)
                  </label>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 font-mono font-semibold text-[#2D6A4F] focus:outline-none focus:border-[#B8863B]"
                  />
                  <span className="text-[10px] text-[#8A7D6B] block mt-1">In-person privilege waiver</span>
                </div>
              </div>

              {/* Total Final Net Calculation Banner */}
              <div className="p-4 bg-[#FAF7F0] border border-[#EDE4D2] rounded flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-[#171717] block">
                    Total Final Quotation Price
                  </span>
                  <span className="text-[11px] text-[#8A7D6B]">
                    Formula: (Estimated Price + Making Charges - Discount)
                  </span>
                </div>
                <span className="font-serif text-3xl font-bold text-[#8B5E20] font-mono tabular-nums">
                  ₹{finalPrice.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Remarks & Validity */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                    Salesman Official Remarks & Guarantees
                  </label>
                  <textarea
                    rows={2}
                    value={salesmanNotes}
                    onChange={(e) => setSalesmanNotes(e.target.value)}
                    className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs text-[#171717]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                    Quotation Validity Period
                  </label>
                  <select
                    value={validDays}
                    onChange={(e) => setValidDays(parseInt(e.target.value))}
                    className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs text-[#171717]"
                  >
                    <option value={15}>15 Days</option>
                    <option value={30}>30 Days (Standard)</option>
                    <option value={60}>60 Days (Bridal Order)</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-[#FAF7F0] flex items-center justify-between">
                <span className="text-[11px] text-[#8A7D6B]">
                  No online checkout or payment gateway will be triggered.
                </span>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 bg-[#B8863B] hover:bg-[#8B5E20] text-white text-xs uppercase tracking-widest font-semibold rounded transition-colors shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>{submitting ? 'Generating...' : 'Issue Final Quotation'}</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};
