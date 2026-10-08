import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomization } from '../../context/CustomizationContext';
import { useAuth } from '../../context/AuthContext';
import { jewelleryService, Showroom } from '../../services/jewelleryService';
import { appointmentService } from '../../services/appointmentService';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Sparkles,
  Building,
  CheckCircle,
  AlertCircle,
  Loader2,
  Phone,
  ShieldCheck,
} from 'lucide-react';

export const BookAppointment: React.FC = () => {
  const navigate = useNavigate();
  const { customization } = useCustomization();
  const { user, isAuthenticated } = useAuth();

  const [showrooms, setShowrooms] = useState<Showroom[]>([]);
  const [selectedShowroomId, setSelectedShowroomId] = useState<string>('SHW-HYD-01');
  const [appointmentDate, setAppointmentDate] = useState<string>(() => {
    // Default to tomorrow
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [appointmentTime, setAppointmentTime] = useState<string>('11:30 AM');
  const [consultationNotes, setConsultationNotes] = useState<string>(customization.notes || '');

  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const timeSlots = [
    '11:00 AM',
    '11:30 AM',
    '12:30 PM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM',
    '06:30 PM',
    '07:30 PM',
  ];

  useEffect(() => {
    jewelleryService.getShowrooms().then((data) => {
      setShowrooms(data);
      if (data.length > 0 && !selectedShowroomId) {
        setSelectedShowroomId(data[0].id);
      }
      setLoading(false);
    });
  }, []);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!isAuthenticated || !user) {
      navigate('/login?redirect=/customer/book-appointment');
      return;
    }

    if (!selectedShowroomId || !appointmentDate || !appointmentTime) {
      setErrorMessage('Please select a showroom salon, date, and appointment slot.');
      return;
    }

    setSubmitting(true);
    try {
      const newAppt = await appointmentService.bookAppointment({
        customerId: user.id,
        showroomId: selectedShowroomId,
        date: appointmentDate,
        time: appointmentTime,
        customerNotes: consultationNotes,
        customization: {
          jewelleryId: customization.jewelleryId,
          jewelleryName: customization.jewelleryName,
          jewelleryType: customization.jewelleryType,
          designId: customization.designId,
          designName: customization.designName,
          metalId: customization.metalId,
          metalName: customization.metalName,
          diamondId: customization.diamondId,
          diamondShape: customization.diamondShape,
          carat: customization.carat,
          color: customization.color,
          clarity: customization.clarity,
          cut: customization.cut,
          size: customization.size,
          engraving: customization.engraving,
          notes: customization.notes,
          basePrice: customization.priceBreakdown.basePrice,
          metalPrice: customization.priceBreakdown.metalPrice,
          diamondPrice: customization.priceBreakdown.diamondPrice,
          customizationPrice: customization.priceBreakdown.customizationPrice,
          estimatedPrice: customization.priceBreakdown.estimatedPrice,
        },
      });

      // Navigate to confirmation with appointment state
      navigate('/customer/appointment-confirmation', {
        state: { appointment: newAppt },
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to book appointment. Please try another slot.');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedShowroom = showrooms.find((s) => s.id === selectedShowroomId);

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#E8DEC8] pb-6 mb-8">
          <span className="text-xs uppercase tracking-widest text-[#8B5E20] font-semibold">
            Concierge Showroom Experience
          </span>
          <h1 className="font-serif text-3xl font-medium text-[#171717] mt-1">
            Book Your Private Atelier Appointment
          </h1>
          <p className="text-xs sm:text-sm text-[#6A5E50] mt-1">
            Your customized jewellery configuration will be prepared for a private salon consultation with our master gemologists.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-[#FFF5F5] border border-[#F8D7DA] rounded text-xs text-[#B02A37] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Complete Customized Jewellery Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E8DEC8] rounded-md p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#FAF7F0] pb-3">
                <h3 className="font-serif text-lg font-bold text-[#171717]">
                  Customized Jewellery Summary
                </h3>
                <span className="text-[11px] uppercase tracking-wider text-[#8B5E20] font-semibold">
                  Saved Specs
                </span>
              </div>

              {/* Specs Breakdown */}
              <div className="space-y-2.5 text-xs text-[#5C5346]">
                <div className="flex items-center justify-between py-1 border-b border-[#FAF7F0]">
                  <span className="text-[#8A7D6B]">Jewellery Category</span>
                  <span className="font-semibold text-[#171717]">{customization.jewelleryType}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#FAF7F0]">
                  <span className="text-[#8A7D6B]">Artisan Design</span>
                  <span className="font-semibold text-[#171717]">{customization.designName}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#FAF7F0]">
                  <span className="text-[#8A7D6B]">Precious Metal</span>
                  <span className="font-semibold text-[#171717]">{customization.metalName}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#FAF7F0]">
                  <span className="text-[#8A7D6B]">Diamond Silhouette</span>
                  <span className="font-semibold text-[#171717]">
                    {customization.carat} ct · {customization.diamondShape}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#FAF7F0]">
                  <span className="text-[#8A7D6B]">Diamond Color & Clarity</span>
                  <span className="font-semibold text-[#171717]">
                    {customization.color || 'D Colorless'} / {customization.clarity || 'VVS1'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#FAF7F0]">
                  <span className="text-[#8A7D6B]">Size Dimension</span>
                  <span className="font-semibold text-[#171717]">
                    {customization.size ? `Size ${customization.size}` : 'Standard'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#FAF7F0]">
                  <span className="text-[#8A7D6B]">Engraved Text</span>
                  <span className="font-semibold text-[#8B5E20] italic">
                    {customization.engraving ? `"${customization.engraving}"` : 'None'}
                  </span>
                </div>
              </div>

              {/* Price Snippet */}
              <div className="pt-4 border-t border-[#E8DEC8] flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8A7D6B] block">
                    Total Estimated Valuation
                  </span>
                  <span className="text-[11px] text-[#A89D8F]">Subject to physical bullion weights</span>
                </div>
                <span className="font-serif text-2xl font-bold text-[#8B5E20] font-mono tabular-nums">
                  ₹{customization.priceBreakdown.estimatedPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Concierge Guarantee Card */}
            <div className="bg-[#FAF7F0] border border-[#E8DEC8] rounded-md p-5 text-xs space-y-2">
              <div className="flex items-center gap-2 text-[#8B5E20] font-semibold uppercase tracking-wider text-[11px]">
                <ShieldCheck className="w-4 h-4" />
                <span>Showroom Privileges</span>
              </div>
              <p className="text-[#5C5346] leading-relaxed">
                During your visit, your senior sales consultant will inspect stone proportions with you under high magnification loupes, adjust finger sizing precisely, and provide the certified quotation.
              </p>
            </div>
          </div>

          {/* RIGHT: Booking Controls (Showroom, Date, Time) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-[#E8DEC8] rounded-md p-6 shadow-xs space-y-6">
              {/* Showroom Selection */}
              <div>
                <label className="text-xs uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-2">
                  1. Select Flagship Showroom Salon
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {showrooms.map((shw) => {
                    const isSelected = selectedShowroomId === shw.id;
                    return (
                      <div
                        key={shw.id}
                        onClick={() => setSelectedShowroomId(shw.id)}
                        className={`p-3.5 rounded border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#B8863B] bg-[#FAF7F0]/40 ring-1 ring-[#B8863B]'
                            : 'border-[#E8DEC8] hover:border-[#D5C2A5]'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <h4 className="font-serif font-bold text-sm text-[#171717]">
                            {shw.showroomName}
                          </h4>
                          {isSelected && (
                            <div className="w-4 h-4 rounded-full bg-[#B8863B] text-white flex items-center justify-center shrink-0">
                              <CheckCircle className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                        <p className="text-[11px] text-[#6A5E50] mt-1 flex items-start gap-1">
                          <MapPin className="w-3 h-3 text-[#B8863B] shrink-0 mt-0.5" />
                          <span>{shw.address}, {shw.city}</span>
                        </p>
                        <div className="mt-2 pt-2 border-t border-[#FAF7F0] flex items-center justify-between text-[10px] text-[#8A7D6B]">
                          <span>Hours: {shw.openingTime} – {shw.closingTime}</span>
                          <span className="text-[#4E7756] font-medium">Open Today</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="text-xs uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-2">
                  2. Select Consultation Date
                </label>
                <div className="relative max-w-sm">
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                    className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-sm text-[#171717] focus:outline-none focus:border-[#B8863B]"
                  />
                </div>
              </div>

              {/* Time Slot Selection */}
              <div>
                <label className="text-xs uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-2">
                  3. Select Available Time Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {timeSlots.map((slot) => {
                    const isSelected = appointmentTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setAppointmentTime(slot)}
                        className={`py-2 px-3 text-xs font-semibold rounded border transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#171717] text-white border-[#171717] shadow-xs'
                            : 'bg-white border-[#D5C2A5] text-[#171717] hover:bg-[#FAF7F0]'
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        <span>{slot}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs uppercase tracking-wider text-[#8A7D6B] font-semibold block mb-1">
                  4. Consultation Purpose / Notes for Salesman
                </label>
                <textarea
                  rows={3}
                  value={consultationNotes}
                  onChange={(e) => setConsultationNotes(e.target.value)}
                  placeholder="e.g. Inquiring about matching wedding band, anniversary gift, or diamond brilliance comparison..."
                  className="w-full bg-[#FAF7F0] border border-[#D5C2A5] rounded px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#B8863B]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-[#FAF7F0]">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-[#B8863B] hover:bg-[#8B5E20] text-white text-xs uppercase tracking-widest font-semibold rounded transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Confirming Showroom Appointment...</span>
                    </>
                  ) : (
                    <>
                      <CalendarIcon className="w-4 h-4" />
                      <span>Confirm Appointment</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-[#8A7D6B] mt-2">
                  No advance payment or credit card required. Pure bespoke hospitality.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
