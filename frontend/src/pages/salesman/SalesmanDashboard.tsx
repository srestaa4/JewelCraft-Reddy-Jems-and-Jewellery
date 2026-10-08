import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { appointmentService, Appointment } from '../../services/appointmentService';
import { quotationService, Quotation } from '../../services/quotationService';
import { Sidebar } from '../../components/Sidebar';
import {
  Calendar,
  Clock,
  Sparkles,
  FileCheck,
  CheckCircle,
  AlertCircle,
  Eye,
  FileText,
  User,
  MapPin,
  ClipboardEdit,
  ArrowRight,
} from 'lucide-react';

export const SalesmanDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      appointmentService.getAllAppointments(),
      quotationService.getAllQuotations(),
    ]).then(([appts, qts]) => {
      setAppointments(appts);
      setQuotations(qts);
      setLoading(false);
    });
  }, []);

  const todayStr = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter((a) => a.date === todayStr);
  const pendingConsultations = appointments.filter((a) => a.status === 'BOOKED' || a.status === 'CONFIRMED');
  const completedAppointments = appointments.filter((a) => a.status === 'COMPLETED');
  const pendingQuotations = quotations.filter((q) => q.status === 'PENDING');

  const handleStatusUpdate = async (id: string, newStatus: any) => {
    try {
      const updated = await appointmentService.updateStatus(id, newStatus);
      setAppointments((prev) => prev.map((a) => (a.id === id ? updated : a)));
      if (selectedAppointment?.id === id) {
        setSelectedAppointment(updated);
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8DEC8] gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8B5E20] font-semibold">
              Showroom Consultation CRM
            </span>
            <h1 className="font-serif text-3xl font-medium text-[#171717] mt-1">
              Sales Consultant Workspace
            </h1>
            <p className="text-xs text-[#6A5E50] mt-1">
              Consultant: <strong className="text-[#171717]">{user?.name}</strong> · Code: {user?.employeeCode || 'SALES-HYD-04'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/salesman/consultation"
              className="px-4 py-2 bg-[#171717] hover:bg-[#8B5E20] text-white text-xs uppercase tracking-wider font-semibold rounded transition-colors shadow-xs"
            >
              Open Consultation Desk
            </Link>
          </div>
        </div>

        {/* 4 CRM Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-8">
          <div className="bg-white border border-[#E8DEC8] rounded-md p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#8A7D6B] block">Today's Appointments</span>
              <span className="font-mono text-3xl font-bold text-[#171717] mt-1 block">
                {todayAppointments.length}
              </span>
              <span className="text-[11px] text-[#8B5E20] mt-1 block">Scheduled for today</span>
            </div>
            <div className="w-11 h-11 rounded bg-[#FAF7F0] border border-[#EDE4D2] flex items-center justify-center text-[#B8863B]">
              <Calendar className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#E8DEC8] rounded-md p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#8A7D6B] block">Pending Consultations</span>
              <span className="font-mono text-3xl font-bold text-[#171717] mt-1 block">
                {pendingConsultations.length}
              </span>
              <span className="text-[11px] text-[#D97706] mt-1 block">Awaiting customer visit</span>
            </div>
            <div className="w-11 h-11 rounded bg-[#FAF7F0] border border-[#EDE4D2] flex items-center justify-center text-[#B8863B]">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#E8DEC8] rounded-md p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#8A7D6B] block">Completed Appointments</span>
              <span className="font-mono text-3xl font-bold text-[#171717] mt-1 block">
                {completedAppointments.length}
              </span>
              <span className="text-[11px] text-[#2D6A4F] mt-1 block">Consultation fulfilled</span>
            </div>
            <div className="w-11 h-11 rounded bg-[#FAF7F0] border border-[#EDE4D2] flex items-center justify-center text-[#B8863B]">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-[#E8DEC8] rounded-md p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#8A7D6B] block">Pending Quotations</span>
              <span className="font-mono text-3xl font-bold text-[#171717] mt-1 block">
                {pendingQuotations.length}
              </span>
              <span className="text-[11px] text-[#8B5E20] mt-1 block">Issued & active</span>
            </div>
            <div className="w-11 h-11 rounded bg-[#FAF7F0] border border-[#EDE4D2] flex items-center justify-center text-[#B8863B]">
              <FileCheck className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Appointment Table (Customer | Jewellery | Date | Time | Status | Action) */}
        <div className="bg-white border border-[#E8DEC8] rounded-md shadow-xs overflow-hidden">
          <div className="p-5 border-b border-[#FAF7F0] flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-[#171717]">
              Customer Appointments & Custom Configurations
            </h3>
            <span className="text-xs text-[#8A7D6B]">
              Total Records: {appointments.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F0] text-[#8A7D6B] uppercase tracking-wider border-b border-[#E8DEC8]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Appointment ID</th>
                  <th className="py-3 px-4 font-semibold">Customer</th>
                  <th className="py-3 px-4 font-semibold">Configured Jewellery</th>
                  <th className="py-3 px-4 font-semibold">Date & Time</th>
                  <th className="py-3 px-4 font-semibold">Est. Valuation</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FAF7F0]">
                {appointments.map((appt) => {
                  const cust = appt.customization || {};
                  return (
                    <tr key={appt.id} className="hover:bg-[#FAF7F0]/50 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#171717]">
                        #{appt.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#171717]">{appt.customerName}</div>
                        <div className="text-[11px] text-[#8A7D6B]">{appt.customerPhone}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-[#171717]">
                          {cust.jewelleryType}: {cust.designName}
                        </div>
                        <div className="text-[11px] text-[#6A5E50]">
                          {cust.metalName} · {cust.carat}ct {cust.diamondShape}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-medium text-[#171717]">{appt.date}</div>
                        <div className="text-[11px] text-[#8A7D6B]">{appt.time}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono tabular-nums font-bold text-[#8B5E20]">
                        ₹{(cust.estimatedPrice || 0).toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded border ${
                          appt.status === 'CONFIRMED'
                            ? 'bg-[#E8F5E9] text-[#2D6A4F] border-[#95D5B2]'
                            : appt.status === 'COMPLETED'
                            ? 'bg-[#EDF6F9] text-[#1D3557] border-[#A8DADC]'
                            : appt.status === 'CANCELLED'
                            ? 'bg-[#FFF5F5] text-[#B02A37] border-[#F8D7DA]'
                            : 'bg-[#FAF7F0] text-[#8B5E20] border-[#D5C2A5]'
                        }`}>
                          {appt.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                        {/* View Configuration */}
                        <button
                          onClick={() => setSelectedAppointment(appt)}
                          className="px-2.5 py-1 text-xs font-semibold bg-[#FAF7F0] border border-[#D5C2A5] text-[#171717] hover:bg-[#EFE1C5] rounded transition-colors cursor-pointer"
                          title="View Complete Configuration"
                        >
                          View
                        </button>

                        {/* Consult / Modify */}
                        <button
                          onClick={() => navigate(`/salesman/consultation?appointmentId=${appt.id}`)}
                          className="px-2.5 py-1 text-xs font-semibold bg-[#171717] text-white hover:bg-[#8B5E20] rounded transition-colors cursor-pointer"
                          title="Open Consultation & Modify Requirements"
                        >
                          Consult
                        </button>

                        {/* Create Quotation */}
                        <button
                          onClick={() => navigate(`/salesman/quotations/create?appointmentId=${appt.id}`)}
                          className="px-2.5 py-1 text-xs font-semibold bg-[#B8863B] text-white hover:bg-[#8B5E20] rounded transition-colors cursor-pointer"
                          title="Create Final Quotation"
                        >
                          Quotation
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL / INSPECTOR: COMPLETE CUSTOMER CONFIGURATION VIEWER */}
        {selectedAppointment && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-md border border-[#E8DEC8] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl p-6">
              <div className="flex items-center justify-between border-b border-[#FAF7F0] pb-3 mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8A7D6B] block">
                    Salesman Configuration Inspector
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#171717]">
                    Appointment #{selectedAppointment.id} Specs
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="text-sm font-semibold text-[#8A7D6B] hover:text-[#171717] cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

              {/* Customer & Showroom Info */}
              <div className="grid grid-cols-2 gap-3 bg-[#FAF7F0] p-3 rounded border border-[#EDE4D2] text-xs mb-4">
                <div>
                  <span className="text-[10px] text-[#8A7D6B] uppercase block">Customer</span>
                  <span className="font-semibold text-[#171717]">{selectedAppointment.customerName}</span>
                  <span className="text-[11px] text-[#6A5E50] block">{selectedAppointment.customerEmail} · {selectedAppointment.customerPhone}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8A7D6B] uppercase block">Showroom & Scheduled Slot</span>
                  <span className="font-semibold text-[#171717]">{selectedAppointment.showroomName}</span>
                  <span className="text-[11px] text-[#8B5E20] block font-medium">{selectedAppointment.date} at {selectedAppointment.time}</span>
                </div>
              </div>

              {/* COMPLETE JEWELLERY CONFIGURATION */}
              <div className="space-y-4 text-xs">
                <h4 className="font-serif font-bold text-sm text-[#171717] uppercase tracking-wider">
                  Complete Selected Configuration Details
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border border-[#E8DEC8] p-4 rounded bg-white">
                  <div>
                    <span className="text-[10px] text-[#8A7D6B] uppercase block">Jewellery Type</span>
                    <span className="font-semibold text-[#171717]">
                      {selectedAppointment.customization?.jewelleryType}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8A7D6B] uppercase block">Design Setting</span>
                    <span className="font-semibold text-[#171717]">
                      {selectedAppointment.customization?.designName}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8A7D6B] uppercase block">Precious Metal</span>
                    <span className="font-semibold text-[#171717]">
                      {selectedAppointment.customization?.metalName}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8A7D6B] uppercase block">Diamond Shape</span>
                    <span className="font-semibold text-[#171717]">
                      {selectedAppointment.customization?.diamondShape}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8A7D6B] uppercase block">Carat Weight</span>
                    <span className="font-semibold text-[#171717]">
                      {selectedAppointment.customization?.carat} Carats
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8A7D6B] uppercase block">Color & Clarity</span>
                    <span className="font-semibold text-[#171717]">
                      {selectedAppointment.customization?.color || 'D'} / {selectedAppointment.customization?.clarity || 'VVS1'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8A7D6B] uppercase block">Size Specification</span>
                    <span className="font-semibold text-[#171717]">
                      {selectedAppointment.customization?.size ? `Size ${selectedAppointment.customization?.size}` : 'Standard'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8A7D6B] uppercase block">Laser Engraving</span>
                    <span className="font-semibold text-[#8B5E20] italic">
                      {selectedAppointment.customization?.engraving ? `"${selectedAppointment.customization?.engraving}"` : 'None'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8A7D6B] uppercase block">Cut Grade</span>
                    <span className="font-semibold text-[#171717]">
                      {selectedAppointment.customization?.cut || 'Excellent'}
                    </span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-[#FAF7F0] p-4 rounded border border-[#EDE4D2] space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Base Setting:</span>
                    <span className="font-mono tabular-nums">₹{(selectedAppointment.customization?.basePrice || 25000).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Metal Alloy Cost:</span>
                    <span className="font-mono tabular-nums">₹{(selectedAppointment.customization?.metalPrice || 18000).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Diamond Value:</span>
                    <span className="font-mono tabular-nums">₹{(selectedAppointment.customization?.diamondPrice || 32000).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Customization & Engraving:</span>
                    <span className="font-mono tabular-nums">₹{(selectedAppointment.customization?.customizationPrice || 2000).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="pt-2 border-t border-[#E8DEC8] flex items-center justify-between font-bold">
                    <span>Estimated Valuation:</span>
                    <span className="font-serif text-lg text-[#8B5E20] font-mono tabular-nums">
                      ₹{(selectedAppointment.customization?.estimatedPrice || 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Customer request note */}
                {selectedAppointment.customerNotes && (
                  <div className="bg-white p-3 rounded border border-[#E8DEC8]">
                    <span className="text-[10px] uppercase font-semibold text-[#8A7D6B] block">Customer Special Requests:</span>
                    <p className="text-[#3E3832] mt-1">{selectedAppointment.customerNotes}</p>
                  </div>
                )}

                {/* Salesman remarks */}
                {selectedAppointment.salesmanNotes && (
                  <div className="bg-white p-3 rounded border border-[#E8DEC8]">
                    <span className="text-[10px] uppercase font-semibold text-[#8B5E20] block">Showroom Sales Notes:</span>
                    <p className="text-[#3E3832] mt-1">{selectedAppointment.salesmanNotes}</p>
                  </div>
                )}
              </div>

              {/* Status Update & Next Actions */}
              <div className="mt-6 pt-4 border-t border-[#FAF7F0] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#8A7D6B]">Status:</span>
                  <button
                    onClick={() => handleStatusUpdate(selectedAppointment.id, 'CONFIRMED')}
                    className="px-2.5 py-1 text-xs font-semibold bg-[#2D6A4F] text-white rounded hover:bg-[#1B4332]"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(selectedAppointment.id, 'COMPLETED')}
                    className="px-2.5 py-1 text-xs font-semibold bg-[#1D3557] text-white rounded hover:bg-[#0D1B2A]"
                  >
                    Complete
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const id = selectedAppointment.id;
                      setSelectedAppointment(null);
                      navigate(`/salesman/consultation?appointmentId=${id}`);
                    }}
                    className="px-4 py-2 bg-[#171717] hover:bg-[#8B5E20] text-white text-xs uppercase tracking-wider font-semibold rounded"
                  >
                    Launch Consultation
                  </button>
                  <button
                    onClick={() => {
                      const id = selectedAppointment.id;
                      setSelectedAppointment(null);
                      navigate(`/salesman/quotations/create?appointmentId=${id}`);
                    }}
                    className="px-4 py-2 bg-[#B8863B] hover:bg-[#8B5E20] text-white text-xs uppercase tracking-wider font-semibold rounded"
                  >
                    Create Quotation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
