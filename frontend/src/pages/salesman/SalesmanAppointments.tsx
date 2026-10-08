import React, { useState, useEffect } from 'react';
import { appointmentService, Appointment } from '../../services/appointmentService';
import { Sidebar } from '../../components/Sidebar';
import { AppointmentCard } from '../../components/AppointmentCard';
import { Calendar, Loader2 } from 'lucide-react';

export const SalesmanAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    appointmentService.getAllAppointments().then((data) => {
      setAppointments(data);
      setLoading(false);
    });
  }, []);

  const handleStatusChange = async (id: string, status: any) => {
    try {
      const updated = await appointmentService.updateStatus(id, status);
      setAppointments((prev) => prev.map((a) => (a.id === id ? updated : a)));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const filtered = filter === 'ALL'
    ? appointments
    : appointments.filter((a) => a.status === filter);

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        <div className="pb-6 border-b border-[#E8DEC8] mb-6">
          <span className="text-xs uppercase tracking-widest text-[#8B5E20] font-semibold">
            Salesman CRM Registry
          </span>
          <h1 className="font-serif text-3xl font-medium text-[#171717] mt-1">
            Assigned Showroom Appointments
          </h1>
          <p className="text-xs text-[#6A5E50] mt-1">
            Review and service upcoming customer jewelry appointments, update consultation statuses, and view configurations.
          </p>
        </div>

        {/* Status filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['ALL', 'BOOKED', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer ${
                filter === st
                  ? 'bg-[#171717] text-white shadow-xs'
                  : 'bg-white border border-[#D5C2A5] text-[#5C5346] hover:bg-[#FAF7F0]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-20 text-center text-xs text-[#8A7D6B]">Loading appointments...</div>
        ) : (
          <div className="space-y-4">
            {filtered.map((appt) => (
              <AppointmentCard
                key={appt.id}
                appointment={appt}
                showSalesmanControls={true}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
