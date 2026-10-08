import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Award, ShieldCheck, Gem } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#171717] text-[#FAF7F0] pt-16 pb-12 border-t border-[#3A332C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-[#2C2723]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#231F1C] flex items-center justify-center border border-[#8B5E20]/40 text-[#D4AF37]">
              <Gem className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white">100% Certified Diamonds</h4>
              <p className="text-xs text-[#A89D8F] mt-0.5">Every diamond graded by IGI & GIA laboratories</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#231F1C] flex items-center justify-center border border-[#8B5E20]/40 text-[#D4AF37]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white">BIS Hallmarked Gold</h4>
              <p className="text-xs text-[#A89D8F] mt-0.5">750 (18K) & 916 (22K) certified precious metals</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#231F1C] flex items-center justify-center border border-[#8B5E20]/40 text-[#D4AF37]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white">Private Showroom Salons</h4>
              <p className="text-xs text-[#A89D8F] mt-0.5">Bespoke 1-on-1 consultations with senior gemologists</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12">
          {/* Col 1: Brand Story */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm overflow-hidden bg-white/10 p-0.5 border border-[#8B5E20]">
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
                <span className="font-serif text-lg font-bold tracking-widest text-white block">REDDY</span>
                <span className="text-[9px] tracking-[0.2em] text-[#D4AF37] block font-semibold uppercase">
                  JEMS AND JEWELLERY
                </span>
              </div>
            </div>
            <p className="text-xs text-[#9E9485] leading-relaxed">
              JewelCraft represents our premier bespoke atelier platform—bridging high jewelry craftsmanship with digital precision. Design your heirloom and experience it in our luxury showrooms.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider text-white uppercase mb-4">
              Explore Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#B5ABA0]">
              <li>
                <Link to="/jewellery" className="hover:text-[#EFE1C5] transition-colors">
                  Solitaire Diamond Rings
                </Link>
              </li>
              <li>
                <Link to="/jewellery" className="hover:text-[#EFE1C5] transition-colors">
                  Opulent Bridal Necklaces
                </Link>
              </li>
              <li>
                <Link to="/jewellery" className="hover:text-[#EFE1C5] transition-colors">
                  Articulated Diamond Drops
                </Link>
              </li>
              <li>
                <Link to="/jewellery" className="hover:text-[#EFE1C5] transition-colors">
                  Tennis & Royal Bracelets
                </Link>
              </li>
              <li>
                <Link to="/customize" className="hover:text-[#EFE1C5] transition-colors font-medium text-[#D4AF37]">
                  Launch 3D Customizer Studio →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Showroom Salons */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider text-white uppercase mb-4">
              Flagship Salons
            </h4>
            <ul className="space-y-2.5 text-xs text-[#B5ABA0]">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Jubilee Hills, Hyderabad (Flagship)</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Turner Road, Bandra West, Mumbai</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>100 Feet Road, Indiranagar, Bengaluru</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>South Extension Part 1, New Delhi</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Consultations & Hours */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider text-white uppercase mb-4">
              Private Appointments
            </h4>
            <ul className="space-y-2.5 text-xs text-[#B5ABA0]">
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>Mon – Sun: 10:30 AM – 08:30 PM</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>Concierge: +91 40 2355 8899</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>appointments@jewelcraft.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#2C2723] flex flex-col md:flex-row items-center justify-between text-xs text-[#807567] gap-4">
          <p>© 2026 REDDY JEMS AND JEWELLERY. JewelCraft Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Spring Boot REST API + JPA</span>
            <span>·</span>
            <span>Role-Based Security</span>
            <span>·</span>
            <span>Bespoke Showroom CRM</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
