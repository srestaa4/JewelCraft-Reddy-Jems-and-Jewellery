import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Appointment } from '../../services/appointmentService';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  Printer,
  ShieldCheck,
  User,
} from 'lucide-react';

export const AppointmentConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const appointment: Appointment | undefined = location.state?.appointment;

  if (!appointment) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] py-20 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded border border-[#E8DEC8]">
          <h2 className="font-serif text-xl font-bold text-[#171717]">No Active Booking Found</h2>
          <p className="text-xs text-[#6A5E50] mt-2 mb-6">
            You can check your existing appointments or start designing a piece.
          </p>
          <Link
            to="/customer/appointments"
            className="px-6 py-2.5 bg-[#B8863B] text-white text-xs uppercase tracking-wider font-semibold rounded inline-block"
          >
            Go to My Appointments
          </Link>
        </div>
      </div>
    );
  }

  const cust = appointment.customization || {};

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Success Banner */}
        <div className="text-center mb-8 space-y-2">
          <div className="w-14 h-14 rounded-full bg-[#E8F5E9] text-[#2D6A4F] flex items-center justify-center mx-auto mb-3 border border-[#95D5B2]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-xs uppercase tracking-widest text-[#2D6A4F] font-bold">
            Confirmed Reservation
          </span>
          <h1 className="font-serif text-3xl font-medium text-[#171717]">
            Appointment Booked Successfully
          </h1>
          <p className="text-xs text-[#6A5E50] max-w-md mx-auto">
            Your private jewelry consultation has been secured. Our sales gemologist has received your complete configuration.
          </p>
        </div>

        {/* Printable Official Confirmation Slip */}
        <div className="bg-white border border-[#E8DEC8] rounded-md overflow-hidden shadow-sm">
          {/* Header with REDDY JEMS AND JEWELLERY Branding */}
          <div className="bg-[#171717] text-[#FAF7F0] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#3A332C]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-sm overflow-hidden bg-white/10 p-0.5 border border-[#8B5E20]">
                <img
                  src="/images/logo/reddy_logo.jpg"
                  alt="REDDY JEMS AND JEWELLERY"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <span className="font-serif text-lg font-bold tracking-widest block uppercase">
                  REDDY JEMS AND JEWELLERY
                </span>
                <span className="text-[10px] tracking-[0.2em] text-[#D4AF37] block font-semibold uppercase">
                  Private Salon Consultation Voucher
                </span>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-[#3A332C] sm:pl-4">
              <span className="text-[10px] text-[#A89D8F] uppercase tracking-wider block">Appointment Token</span>
              <span className="font-mono text-xl font-bold text-[#D4AF37]">#{appointment.id}</span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Showroom & Time Metadata Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#FAF7F0] border border-[#EDE4D2] rounded p-4 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B8863B] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8A7D6B] block">Showroom Salon</span>
                  <span className="font-semibold text-[#171717]">{appointment.showroomName}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-[#B8863B] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8A7D6B] block">Scheduled Date</span>
                  <span className="font-semibold text-[#171717]">{appointment.date}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#B8863B] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8A7D6B] block">Time Slot</span>
                  <span className="font-semibold text-[#171717]">{appointment.time}</span>
                </div>
              </div>
            </div>

            {/* Saved Jewellery Configuration Details */}
            <div>
              <h3 className="font-serif text-base font-bold text-[#171717] uppercase tracking-wider border-b border-[#FAF7F0] pb-2 mb-3">
                Jewellery Configuration Transmitted to Salesman
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF7F0]/40 p-4 border border-[#E8DEC8] rounded text-xs">
                <div>
                  <span className="text-[10px] text-[#8A7D6B] uppercase block">Category</span>
                  <span className="font-semibold text-[#171717]">{cust.jewelleryType}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8A7D6B] uppercase block">Design Setting</span>
                  <span className="font-semibold text-[#171717]">{cust.designName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8A7D6B] uppercase block">Precious Metal</span>
                  <span className="font-semibold text-[#171717]">{cust.metalName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8A7D6B] uppercase block">Dimension</span>
                  <span className="font-semibold text-[#171717]">{cust.size ? `Size ${cust.size}` : 'Standard'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8A7D6B] uppercase block">Diamond Silhouette</span>
                  <span className="font-semibold text-[#171717]">{cust.diamondShape} ({cust.carat} ct)</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8A7D6B] uppercase block">Color / Clarity</span>
                  <span className="font-semibold text-[#171717]">{cust.color || 'D'} / {cust.clarity || 'VVS1'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8A7D6B] uppercase block">Cut Grade</span>
                  <span className="font-semibold text-[#171717]">{cust.cut || 'Excellent'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8A7D6B] uppercase block">Laser Inscription</span>
                  <span className="font-semibold text-[#8B5E20] italic">
                    {cust.engraving ? `"${cust.engraving}"` : 'None'}
                  </span>
                </div>
              </div>
            </div>

            {/* Price Valuation Card */}
            <div className="p-4 bg-white border border-[#E8DEC8] rounded flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#8A7D6B] block">
                  Estimated Jewellery Valuation
                </span>
                <span className="text-[11px] text-[#A89D8F]">
                  Official quotation prepared during consultation
                </span>
              </div>
              <span className="font-serif text-2xl font-bold text-[#8B5E20] font-mono tabular-nums">
                ₹{(cust.estimatedPrice || 0).toLocaleString('en-IN')}
              </span>
            </div>

            {/* Customer Details */}
            <div className="text-xs text-[#6A5E50] border-t border-[#FAF7F0] pt-4 flex items-center justify-between">
              <span>Customer: <strong className="text-[#171717]">{appointment.customerName}</strong> ({appointment.customerEmail})</span>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#2D6A4F] bg-[#E8F5E9] px-2 py-0.5 rounded border border-[#95D5B2]">
                STATUS: {appointment.status}
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="bg-[#FAF7F0] p-4 border-t border-[#E8DEC8] flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#171717] bg-white border border-[#D5C2A5] rounded hover:bg-[#FAF7F0] transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Confirmation Slip</span>
            </button>

            <div className="flex items-center gap-3">
              <Link
                to="/customer/appointments"
                className="px-5 py-2 bg-[#B8863B] hover:bg-[#8B5E20] text-white text-xs uppercase tracking-wider font-semibold rounded transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>View in Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
