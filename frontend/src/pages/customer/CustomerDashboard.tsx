import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { appointmentService, Appointment } from '../../services/appointmentService';
import { quotationService, Quotation } from '../../services/quotationService';
import { Sidebar } from '../../components/Sidebar';
import { AppointmentCard } from '../../components/AppointmentCard';
import {
  Calendar,
  Sparkles,
  FileCheck,
  ArrowRight,
  Gem,
  Plus,
  Clock,
  MapPin,
} from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      Promise.all([
        appointmentService.getCustomerAppointments(user.id),
        quotationService.getCustomerQuotations(user.id),
      ]).then(([appts, qts]) => {
        setAppointments(appts);
        setQuotations(qts);
        setLoading(false);
      });
    }
  }, [user]);

  const upcomingAppt = appointments.find(
    (a) => a.status === 'BOOKED' || a.status === 'CONFIRMED'
  );

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        {/* Welcome Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-[#E8DEC8] gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8B5E20] font-semibold">
              Private Client Portal
            </span>
            <h1 className="font-serif text-3xl font-medium text-[#171717] mt-1">
              Welcome, {user?.name || 'Customer'}
            </h1>
            <p className="text-xs text-[#6A5E50] mt-1">
              Manage your personalized jewellery designs, showroom visits, and official certified quotations.
            </p>
          </div>

          <Link
            to="/customize"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B8863B] hover:bg-[#8B5E20] text-white text-xs uppercase tracking-wider font-semibold rounded transition-colors shadow-xs shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Customize New Piece</span>
          </Link>
        </div>

        {/* Dashboard Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
          <div className="bg-white border border-[#E8DEC8] rounded-md p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#8A7D6B] block">Showroom Appointments</span>
              <span className="font-mono text-3xl font-bold text-[#171717] mt-1 block">
                {appointments.length}
              </span>
              <span className="text-[11px] text-[#4E7756] mt-1 block font-medium">
                {appointments.filter(a => a.status === 'CONFIRMED').length} Confirmed
              </span>
            </div>
            <div className="w-12 h-12 rounded bg-[#FAF7F0] border border-[#EDE4D2] flex items-center justify-center text-[#B8863B]">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white border border-[#E8DEC8] rounded-md p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#8A7D6B] block">Certified Quotations</span>
              <span className="font-mono text-3xl font-bold text-[#171717] mt-1 block">
                {quotations.length}
              </span>
              <span className="text-[11px] text-[#8B5E20] mt-1 block font-medium">
                Ready for consultation
              </span>
            </div>
            <div className="w-12 h-12 rounded bg-[#FAF7F0] border border-[#EDE4D2] flex items-center justify-center text-[#B8863B]">
              <FileCheck className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white border border-[#E8DEC8] rounded-md p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#8A7D6B] block">Atelier Privilege</span>
              <span className="font-serif text-lg font-bold text-[#8B5E20] mt-1 block">
                VIP Private Client
              </span>
              <span className="text-[11px] text-[#8A7D6B] mt-1 block">
                Complimentary cleaning & trial
              </span>
            </div>
            <div className="w-12 h-12 rounded bg-[#FAF7F0] border border-[#EDE4D2] flex items-center justify-center text-[#B8863B]">
              <Gem className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Next Upcoming Appointment Spotlight */}
        {upcomingAppt ? (
          <div className="mb-10 bg-white border border-[#E8DEC8] rounded-md p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#FAF7F0] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#B8863B]" />
                <h3 className="font-serif text-base font-bold text-[#171717]">
                  Upcoming Showroom Appointment
                </h3>
              </div>
              <span className="text-[11px] uppercase tracking-wider text-[#2D6A4F] bg-[#E8F5E9] border border-[#95D5B2] px-2.5 py-0.5 rounded font-semibold">
                {upcomingAppt.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mb-4">
              <div>
                <span className="text-[10px] text-[#8A7D6B] uppercase block">Salon Location</span>
                <span className="font-semibold text-[#171717]">{upcomingAppt.showroomName}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8A7D6B] uppercase block">Date & Time</span>
                <span className="font-semibold text-[#171717]">{upcomingAppt.date} at {upcomingAppt.time}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8A7D6B] uppercase block">Assigned Gemologist</span>
                <span className="font-semibold text-[#171717]">{upcomingAppt.salesmanName || 'Senior Consultant'}</span>
              </div>
            </div>

            <div className="bg-[#FAF7F0] p-3 rounded border border-[#EDE4D2] flex items-center justify-between text-xs">
              <span>
                Configured: <strong>{upcomingAppt.customization?.jewelleryType}</strong> · {upcomingAppt.customization?.designName} · {upcomingAppt.customization?.metalName}
              </span>
              <Link
                to="/customer/appointments"
                className="text-xs text-[#8B5E20] hover:text-[#171717] font-semibold flex items-center gap-1"
              >
                <span>View Full Configuration</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : null}

        {/* Section: Recent Appointments & Quotations */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl font-medium text-[#171717]">
                My Appointments
              </h3>
              <Link
                to="/customer/appointments"
                className="text-xs text-[#8B5E20] hover:text-[#171717] font-semibold flex items-center gap-1"
              >
                <span>View All ({appointments.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {appointments.length === 0 ? (
              <div className="bg-white p-8 rounded border border-[#E8DEC8] text-center text-xs text-[#6A5E50]">
                No appointments booked yet. Design a piece in the Studio and schedule a showroom consultation.
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.slice(0, 2).map((appt) => (
                  <AppointmentCard key={appt.id} appointment={appt} />
                ))}
              </div>
            )}
          </div>

          {/* Section: Certified Quotations from Salesman */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl font-medium text-[#171717]">
                Final Quotations Received
              </h3>
              <Link
                to="/customer/quotation"
                className="text-xs text-[#8B5E20] hover:text-[#171717] font-semibold flex items-center gap-1"
              >
                <span>View All ({quotations.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {quotations.length === 0 ? (
              <div className="bg-white p-8 rounded border border-[#E8DEC8] text-center text-xs text-[#6A5E50]">
                No quotations yet. After your showroom consultation, your sales gemologist will issue an official certified quotation here.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quotations.map((q) => (
                  <div key={q.id} className="bg-white border border-[#E8DEC8] rounded-md p-5 shadow-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-[#FAF7F0] pb-2">
                      <span className="font-mono font-bold text-xs text-[#171717]">{q.id}</span>
                      <span className="text-[10px] text-[#4E7756] font-semibold uppercase tracking-wider bg-[#E8F5E9] px-2 py-0.5 rounded border border-[#95D5B2]">
                        {q.status}
                      </span>
                    </div>

                    <div className="text-xs space-y-1">
                      <p className="font-semibold text-[#171717]">
                        {q.jewellery} · {q.design}
                      </p>
                      <p className="text-[#6A5E50]">{q.metal} · {q.diamond}</p>
                      <p className="text-[11px] text-[#8A7D6B]">Sales Consultant: {q.salesmanName}</p>
                    </div>

                    <div className="pt-3 border-t border-[#FAF7F0] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#8A7D6B] uppercase block">Final Certified Price</span>
                        <span className="font-serif text-lg font-bold text-[#8B5E20] font-mono tabular-nums">
                          ₹{q.finalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <Link
                        to="/customer/quotation"
                        className="text-xs font-semibold text-[#171717] hover:text-[#8B5E20] underline"
                      >
                        Inspect Quotation
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
