import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { appointmentService, Appointment, CustomizationData } from '../../services/appointmentService';
import { jewelleryService, Metal, Design } from '../../services/jewelleryService';
import { diamondService, Diamond } from '../../services/diamondService';
import { Sidebar } from '../../components/Sidebar';
import {
  ClipboardList,
  Save,
  FileCheck,
  Sparkles,
  ArrowRight,
  User,
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

export const SalesmanConsultation: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const appointmentId = searchParams.get('appointmentId');

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);

  // Editable configuration draft
  const [configDraft, setConfigDraft] = useState<CustomizationData>({});
  const [salesmanNotes, setSalesmanNotes] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Available options for modification
  const [metals, setMetals] = useState<Metal[]>([]);
  const [diamonds, setDiamonds] = useState<Diamond[]>([]);

  useEffect(() => {
    Promise.all([
      appointmentService.getAllAppointments(),
      jewelleryService.getMetals(),
      diamondService.getDiamonds(),
    ]).then(([appts, mtls, dmds]) => {
      setAppointments(appts);
      setMetals(mtls);
      setDiamonds(dmds);

      const target = appointmentId
        ? appts.find((a) => a.id === appointmentId)
        : appts[0];

      if (target) {
        setSelectedAppt(target);
        setConfigDraft(target.customization || {});
        setSalesmanNotes(target.salesmanNotes || '');
      }
    });
  }, [appointmentId]);

  const handleSelectAppointment = (appt: Appointment) => {
    setSelectedAppt(appt);
    setConfigDraft(appt.customization || {});
    setSalesmanNotes(appt.salesmanNotes || '');
    setSuccessMsg(null);
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppt) return;
    setSaving(true);
    setSuccessMsg(null);

    try {
      const updated = await appointmentService.updateCustomization(
        selectedAppt.id,
        configDraft,
        salesmanNotes
      );
      setSelectedAppt(updated);
      setSuccessMsg('Customer configuration and consultation notes updated successfully.');
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      alert(err.message || 'Failed to update configuration');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8DEC8] gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8B5E20] font-semibold">
              Live Showroom Desk
            </span>
            <h1 className="font-serif text-3xl font-medium text-[#171717] mt-1">
              Customer Consultation & Modification
            </h1>
            <p className="text-xs text-[#6A5E50] mt-1">
              Discuss jewelry requirements face-to-face, adjust specifications if needed, and prepare final quotation.
            </p>
          </div>

          {selectedAppt && (
            <button
              onClick={() => navigate(`/salesman/quotations/create?appointmentId=${selectedAppt.id}`)}
              className="px-5 py-2.5 bg-[#B8863B] hover:bg-[#8B5E20] text-white text-xs uppercase tracking-wider font-semibold rounded transition-colors shadow-xs flex items-center gap-2"
            >
              <FileCheck className="w-4 h-4" />
              <span>Generate Final Quotation</span>
            </button>
          )}
        </div>

        {successMsg && (
          <div className="my-4 p-3 bg-[#E8F5E9] border border-[#95D5B2] text-[#2D6A4F] text-xs rounded flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-start">
          {/* Active Appointments Selector (Left) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8A7D6B] block">
              Scheduled Consultations ({appointments.length})
            </span>

            <div className="space-y-2">
              {appointments.map((appt) => {
                const isSelected = selectedAppt?.id === appt.id;
                return (
                  <div
                    key={appt.id}
                    onClick={() => handleSelectAppointment(appt)}
                    className={`p-4 rounded-md border transition-all cursor-pointer bg-white ${
                      isSelected
                        ? 'border-[#B8863B] ring-1 ring-[#B8863B] shadow-xs'
                        : 'border-[#E8DEC8] hover:border-[#D5C2A5]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono font-bold text-[#171717]">#{appt.id}</span>
                      <span className="text-[10px] uppercase font-semibold text-[#8B5E20] bg-[#FAF7F0] px-2 py-0.5 rounded border border-[#EDE4D2]">
                        {appt.status}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-sm text-[#171717]">
                      {appt.customerName}
                    </h4>

                    <div className="text-[11px] text-[#6A5E50] mt-1">
                      {appt.customization?.jewelleryType}: {appt.customization?.designName}
                    </div>

                    <div className="mt-2 pt-2 border-t border-[#FAF7F0] flex items-center justify-between text-[11px] text-[#8A7D6B]">
                      <span>{appt.date} · {appt.time}</span>
                      <span className="font-mono font-semibold text-[#171717]">
                        ₹{(appt.customization?.estimatedPrice || 0).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Consultation Editor Workspace (Right) */}
          {selectedAppt && (
            <div className="lg:col-span-8 bg-white border border-[#E8DEC8] rounded-md p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-[#FAF7F0] pb-3">
                <div>
                  <span className="text-[10px] text-[#8A7D6B] uppercase block">Consultation Workspace</span>
                  <h3 className="font-serif text-xl font-bold text-[#171717]">
                    Client: {selectedAppt.customerName} (#{selectedAppt.id})
                  </h3>
                </div>

                <span className="text-xs text-[#8B5E20] font-semibold bg-[#FAF7F0] px-3 py-1 rounded border border-[#EDE4D2]">
                  {selectedAppt.showroomName}
                </span>
              </div>

              {/* Customer original notes */}
              {selectedAppt.customerNotes && (
                <div className="bg-[#FAF7F0] p-3 rounded border border-[#EDE4D2] text-xs">
                  <span className="text-[10px] uppercase font-bold text-[#8A7D6B] block">
                    Customer's Initial Notes:
                  </span>
                  <p className="text-[#3E3832] mt-0.5">{selectedAppt.customerNotes}</p>
                </div>
              )}

              {/* Requirement Modification Form */}
              <form onSubmit={handleSaveChanges} className="space-y-6">
                <h4 className="font-serif font-bold text-sm text-[#171717] uppercase tracking-wider">
                  Modify Customer Requirements If Required
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* Metal Alloy adjustment */}
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                      Adjust Precious Metal Alloy
                    </label>
                    <select
                      value={configDraft.metalName || ''}
                      onChange={(e) => {
                        const m = metals.find((x) => x.metalName === e.target.value);
                        setConfigDraft({
                          ...configDraft,
                          metalName: e.target.value,
                          metalId: m?.id,
                        });
                      }}
                      className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs text-[#171717]"
                    >
                      {metals.map((m) => (
                        <option key={m.id} value={m.metalName}>
                          {m.metalName} ({m.purity})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Finger / Chain Size */}
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                      Confirmed Size (Measured in Showroom)
                    </label>
                    <input
                      type="text"
                      value={configDraft.size || ''}
                      onChange={(e) => setConfigDraft({ ...configDraft, size: e.target.value })}
                      placeholder="e.g. 14, 16, 18 inch"
                      className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs text-[#171717]"
                    />
                  </div>

                  {/* Carat & Diamond Shape */}
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                      Diamond Carat Weight
                    </label>
                    <input
                      type="number"
                      step="0.05"
                      value={configDraft.carat || 0.50}
                      onChange={(e) =>
                        setConfigDraft({ ...configDraft, carat: parseFloat(e.target.value) })
                      }
                      className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs text-[#171717]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                      Diamond Shape Silhouette
                    </label>
                    <input
                      type="text"
                      value={configDraft.diamondShape || 'Round'}
                      onChange={(e) =>
                        setConfigDraft({ ...configDraft, diamondShape: e.target.value })
                      }
                      className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs text-[#171717]"
                    />
                  </div>

                  {/* Engraving Inscription */}
                  <div className="sm:col-span-2">
                    <label className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                      Laser Inscription / Vows
                    </label>
                    <input
                      type="text"
                      value={configDraft.engraving || ''}
                      onChange={(e) =>
                        setConfigDraft({ ...configDraft, engraving: e.target.value })
                      }
                      placeholder="Laser engraving text for inner band..."
                      className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs text-[#171717]"
                    />
                  </div>
                </div>

                {/* Salesman notes & Consultation remarks */}
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#8B5E20] font-semibold block mb-1">
                    Salesman Consultation Notes & Observations
                  </label>
                  <textarea
                    rows={3}
                    value={salesmanNotes}
                    onChange={(e) => setSalesmanNotes(e.target.value)}
                    placeholder="Customer preferred 6-prong low profile setting; showed loose stones D-VVS1 and E-VS1; customer agreed on 18K yellow gold band..."
                    className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#B8863B]"
                  />
                </div>

                {/* Save and Proceed CTAs */}
                <div className="pt-4 border-t border-[#FAF7F0] flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2.5 bg-[#171717] hover:bg-[#8B5E20] text-white text-xs uppercase tracking-wider font-semibold rounded transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{saving ? 'Saving Specs...' : 'Save Modified Specifications'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate(`/salesman/quotations/create?appointmentId=${selectedAppt.id}`)}
                    className="px-5 py-2.5 bg-[#B8863B] hover:bg-[#8B5E20] text-white text-xs uppercase tracking-wider font-semibold rounded transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <span>Proceed to Final Quotation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
