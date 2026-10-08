import React, { useState } from 'react';
import { Appointment } from '../services/appointmentService';
import { Calendar, Clock, MapPin, ChevronDown, ChevronUp, User, Sparkles, FileText } from 'lucide-react';

interface Props {
  appointment: Appointment;
  onSelect?: (appointment: Appointment) => void;
  onStatusChange?: (id: string, newStatus: any) => void;
  showSalesmanControls?: boolean;
}

export const AppointmentCard: React.FC<Props> = ({
  appointment,
  onSelect,
  onStatusChange,
  showSalesmanControls = false,
}) => {
  const [expanded, setExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'BOOKED':
        return 'text-[#8B5E20] border-[#D5C2A5] bg-[#FAF7F0]';
      case 'CONFIRMED':
        return 'text-[#2D6A4F] border-[#95D5B2] bg-[#E8F5E9]';
      case 'COMPLETED':
        return 'text-[#1D3557] border-[#A8DADC] bg-[#EDF6F9]';
      case 'CANCELLED':
        return 'text-[#B02A37] border-[#F8D7DA] bg-[#FFF5F5]';
      case 'RESCHEDULED':
        return 'text-[#7B2CBF] border-[#E0AAFF] bg-[#F8F0FC]';
      default:
        return 'text-[#171717] border-[#E5DAC6] bg-white';
    }
  };

  const cust = appointment.customization || {};

  return (
    <div className="bg-white border border-[#E8DEC8] rounded-md overflow-hidden transition-all duration-200 hover:shadow-xs">
      <div className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#FAF7F0] pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-sm text-[#171717]">
              #{appointment.id}
            </span>
            <span className="text-xs text-[#8A7D6B]">·</span>
            <span className="text-xs text-[#6A5E50]">
              Booked on {new Date(appointment.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>

          {/* Clean status badge - zero pill rule */}
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded border ${getStatusColor(appointment.status)}`}>
              {appointment.status}
            </span>
          </div>
        </div>

        {/* Core Appointment Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 text-xs">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#B8863B] shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-[#8A7D6B] uppercase tracking-wider block">Showroom Salon</span>
              <span className="font-semibold text-[#171717]">{appointment.showroomName}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Calendar className="w-4 h-4 text-[#B8863B] shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-[#8A7D6B] uppercase tracking-wider block">Consultation Date & Time</span>
              <span className="font-semibold text-[#171717]">
                {appointment.date} at {appointment.time}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <User className="w-4 h-4 text-[#B8863B] shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-[#8A7D6B] uppercase tracking-wider block">Customer & Assigned Salesman</span>
              <span className="font-semibold text-[#171717] block">{appointment.customerName}</span>
              <span className="text-[11px] text-[#8A7D6B]">
                {appointment.salesmanName ? `Assigned to: ${appointment.salesmanName}` : 'Awaiting Salesman Assignment'}
              </span>
            </div>
          </div>
        </div>

        {/* Configuration Snapshot */}
        <div className="bg-[#FAF7F0] border border-[#EDE4D2] rounded p-3 text-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#B8863B]" />
            <span className="font-semibold text-[#171717]">
              {cust.jewelleryType || 'Jewellery'}: {cust.designName || 'Bespoke Design'}
            </span>
            <span className="text-[#8A7D6B]">·</span>
            <span className="text-[#6A5E50]">{cust.metalName || '18K Gold'}</span>
            <span className="text-[#8A7D6B]">·</span>
            <span className="text-[#6A5E50]">{cust.carat} ct {cust.diamondShape} Diamond</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-[#8A7D6B] block uppercase tracking-wider">Estimated Valuation</span>
              <span className="font-mono tabular-nums font-bold text-sm text-[#8B5E20]">
                ₹{(cust.estimatedPrice || 0).toLocaleString('en-IN')}
              </span>
            </div>

            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-[#8B5E20] hover:text-[#171717] font-medium flex items-center gap-1 cursor-pointer pl-2 border-l border-[#D5C2A5]"
            >
              <span>{expanded ? 'Less Details' : 'Full Specs'}</span>
              {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Expanded Full Specifications (Main Requirement for Salesman & Customer) */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-[#FAF7F0] space-y-4 text-xs animate-fadeIn">
            <h5 className="font-serif font-bold text-[#171717] uppercase tracking-wider text-[11px]">
              Complete Personalized Jewellery Configuration
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3 border border-[#E8DEC8] rounded">
              <div>
                <span className="text-[10px] text-[#8A7D6B] uppercase block">Jewellery Category</span>
                <span className="font-medium text-[#171717]">{cust.jewelleryName || cust.jewelleryType}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8A7D6B] uppercase block">Selected Design</span>
                <span className="font-medium text-[#171717]">{cust.designName}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8A7D6B] uppercase block">Precious Metal</span>
                <span className="font-medium text-[#171717]">{cust.metalName}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8A7D6B] uppercase block">Size Dimension</span>
                <span className="font-medium text-[#171717]">{cust.size ? `Size ${cust.size}` : 'Standard'}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8A7D6B] uppercase block">Diamond Silhouette</span>
                <span className="font-medium text-[#171717]">{cust.diamondShape} ({cust.carat} ct)</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8A7D6B] uppercase block">Color & Clarity</span>
                <span className="font-medium text-[#171717]">{cust.color || 'D'} / {cust.clarity || 'VVS1'}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8A7D6B] uppercase block">Cut Grade</span>
                <span className="font-medium text-[#171717]">{cust.cut || 'Excellent'}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8A7D6B] uppercase block">Laser Engraving</span>
                <span className="font-medium text-[#8B5E20] italic">
                  {cust.engraving ? `"${cust.engraving}"` : 'None requested'}
                </span>
              </div>
            </div>

            {appointment.customerNotes && (
              <div className="bg-[#FAF7F0] p-2.5 rounded border border-[#EDE4D2]">
                <span className="text-[10px] text-[#8A7D6B] uppercase font-semibold block">Customer Consultation Request</span>
                <p className="text-[#3E3832] mt-0.5">{appointment.customerNotes}</p>
              </div>
            )}

            {appointment.salesmanNotes && (
              <div className="bg-[#FAF7F0] p-2.5 rounded border border-[#EDE4D2]">
                <span className="text-[10px] text-[#8B5E20] uppercase font-semibold block">Salesman / Showroom Remarks</span>
                <p className="text-[#3E3832] mt-0.5">{appointment.salesmanNotes}</p>
              </div>
            )}

            {showSalesmanControls && onStatusChange && (
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#EDE4D2]">
                <span className="text-xs text-[#8A7D6B] mr-2">Update Status:</span>
                <button
                  onClick={() => onStatusChange(appointment.id, 'CONFIRMED')}
                  className="px-2.5 py-1 text-xs font-semibold bg-[#2D6A4F] text-white rounded hover:bg-[#1B4332] transition-colors"
                >
                  Confirm Appointment
                </button>
                <button
                  onClick={() => onStatusChange(appointment.id, 'RESCHEDULED')}
                  className="px-2.5 py-1 text-xs font-semibold bg-[#7B2CBF] text-white rounded hover:bg-[#5A189A] transition-colors"
                >
                  Reschedule
                </button>
                <button
                  onClick={() => onStatusChange(appointment.id, 'CANCELLED')}
                  className="px-2.5 py-1 text-xs font-semibold bg-[#B02A37] text-white rounded hover:bg-[#842029] transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
