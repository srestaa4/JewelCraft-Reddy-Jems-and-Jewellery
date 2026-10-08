import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jewelleryService, Showroom } from '../services/jewelleryService';
import { Building, MapPin, Phone, Mail, Clock, Calendar, ArrowRight } from 'lucide-react';

export const ShowroomsPage: React.FC = () => {
  const [showrooms, setShowrooms] = useState<Showroom[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    jewelleryService.getShowrooms().then((data) => {
      setShowrooms(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#8B5E20] font-semibold">
            Boutique Locations
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#171717]">
            Flagship Showrooms & Ateliers
          </h1>
          <p className="text-xs sm:text-sm text-[#6A5E50] leading-relaxed">
            Visit our private VIP viewing lounges in Hyderabad, Mumbai, Bengaluru, and New Delhi for customized jewelry consultations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {showrooms.map((shw) => (
            <div
              key={shw.id}
              className="bg-white border border-[#E8DEC8] rounded-md overflow-hidden shadow-xs flex flex-col justify-between"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] text-[#8A7D6B] uppercase font-mono block">{shw.id}</span>
                    <h3 className="font-serif text-xl font-bold text-[#171717]">
                      {shw.showroomName}
                    </h3>
                  </div>
                  <span className="text-[10px] uppercase font-semibold text-[#2D6A4F] bg-[#E8F5E9] px-2.5 py-1 rounded border border-[#95D5B2]">
                    {shw.status}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs text-[#5C5346]">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#B8863B] shrink-0 mt-0.5" />
                    <span>{shw.address}, {shw.city}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#B8863B] shrink-0" />
                    <span>Concierge: {shw.phone}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#B8863B] shrink-0" />
                    <span>{shw.email}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#B8863B] shrink-0" />
                    <span>Visiting Hours: {shw.openingTime} – {shw.closingTime} (All Days)</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#FAF7F0] border-t border-[#E8DEC8] flex items-center justify-between">
                <span className="text-[11px] text-[#8A7D6B]">Private VIP Suite Available</span>
                <Link
                  to="/customize"
                  className="px-4 py-2 bg-[#B8863B] hover:bg-[#8B5E20] text-white text-xs uppercase tracking-wider font-semibold rounded flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Appointment Here</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
