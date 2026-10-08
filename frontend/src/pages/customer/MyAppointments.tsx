import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { appointmentService, Appointment } from '../../services/appointmentService';
import { Sidebar } from '../../components/Sidebar';
import { AppointmentCard } from '../../components/AppointmentCard';
import { Calendar, Plus, Loader2 } from 'lucide-react';

export const MyAppointments: React.FC = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('ALL');

  useEffect(() => {
    if (user?.id) {
      appointmentService.getCustomerAppointments(user.id).then((data) => {
        setAppointments(data);
        setLoading(false);
      });
    }
  }, [user]);

  const filtered = filter === 'ALL'
    ? appointments
    : appointments.filter((a) => a.status === filter);

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8DEC8] gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8B5E20] font-semibold">
              Concierge Records
            </span>
            <h1 className="font-serif text-3xl font-medium text-[#171717] mt-1">
              My Showroom Appointments
            </h1>
            <p className="text-xs text-[#6A5E50] mt-1">
              All appointments retain your exact bespoke jewellery configuration transmitted to the showroom.
            </p>
          </div>

          <Link
            to="/customize"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B8863B] hover:bg-[#8B5E20] text-white text-xs uppercase tracking-wider font-semibold rounded transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Book New Appointment</span>
          </Link>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-2 my-6">
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

        {/* Appointments List */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-8 h-8 text-[#B8863B] animate-spin" />
            <span className="text-xs text-[#8A7D6B] uppercase tracking-wider">Loading appointments...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white border border-[#E8DEC8] rounded-md p-10 text-center space-y-3">
            <Calendar className="w-8 h-8 text-[#8A7D6B] mx-auto" />
            <h3 className="font-serif text-lg font-bold text-[#171717]">No Appointments Found</h3>
            <p className="text-xs text-[#6A5E50] max-w-sm mx-auto">
              You do not have any appointments under this status.
            </p>
            <Link
              to="/customize"
              className="inline-block px-5 py-2 bg-[#B8863B] text-white text-xs uppercase tracking-wider font-semibold rounded mt-2"
            >
              Configure & Book
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((appt) => (
              <AppointmentCard key={appt.id} appointment={appt} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
