import React, { useState, useEffect } from 'react';
import { appointmentService, Appointment } from '../../services/appointmentService';
import { adminService } from '../../services/adminService';
import { User } from '../../services/authService';
import { Sidebar } from '../../components/Sidebar';
import { AppointmentCard } from '../../components/AppointmentCard';
import { Calendar, UserCheck, CheckCircle2 } from 'lucide-react';

export const ManageAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [salesmen, setSalesmen] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigningId, setAssigningId] = useState<string | null>(null);
  const [selectedSalesmanId, setSelectedSalesmanId] = useState<string>('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    Promise.all([
      appointmentService.getAllAppointments(),
      adminService.getUsers('ROLE_SALESMAN'),
    ]).then(([appts, sm]) => {
      setAppointments(appts);
      setSalesmen(sm);
      setLoading(false);
    });
  };

  const handleAssign = async (appointmentId: string) => {
    if (!selectedSalesmanId) return;
    try {
      await appointmentService.assignSalesman(appointmentId, selectedSalesmanId);
      setAssigningId(null);
      loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        <div className="pb-6 border-b border-[#E8DEC8] mb-6">
          <span className="text-xs uppercase tracking-widest text-[#8B5E20] font-semibold">
            Central Appointment Dispatch
          </span>
          <h1 className="font-serif text-3xl font-medium text-[#171717] mt-1">
            Manage Appointments & Salesman Assignment
          </h1>
          <p className="text-xs text-[#6A5E50] mt-1">
            Assign dedicated senior sales gemologists to client appointments across showrooms.
          </p>
        </div>

        <div className="space-y-6">
          {appointments.map((appt) => (
            <div key={appt.id} className="relative">
              <AppointmentCard appointment={appt} />

              {/* Assignment Bar */}
              <div className="bg-[#FAF7F0] border-x border-b border-[#E8DEC8] -mt-1 p-3 rounded-b-md flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-3.5 h-3.5 text-[#B8863B]" />
                  <span>
                    Current Consultant: <strong>{appt.salesmanName || 'Unassigned'}</strong>
                  </span>
                </div>

                {assigningId === appt.id ? (
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedSalesmanId}
                      onChange={(e) => setSelectedSalesmanId(e.target.value)}
                      className="bg-white border border-[#D5C2A5] rounded px-2 py-1 text-xs"
                    >
                      <option value="">Select Sales Consultant...</option>
                      {salesmen.map((sm) => (
                        <option key={sm.id} value={sm.id}>
                          {sm.name} ({sm.employeeCode || 'Consultant'})
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleAssign(appt.id)}
                      className="px-3 py-1 bg-[#2D6A4F] text-white rounded text-xs font-semibold"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setAssigningId(null)}
                      className="px-2 py-1 text-xs text-[#8A7D6B]"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setAssigningId(appt.id);
                      setSelectedSalesmanId(appt.salesmanId || '');
                    }}
                    className="text-xs text-[#8B5E20] hover:text-[#171717] font-semibold underline"
                  >
                    Reassign Salesman
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
