import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { jewelleryService, Jewellery } from '../services/jewelleryService';
import { JewelleryCard } from '../components/JewelleryCard';
import {
  Sparkles,
  ArrowRight,
  Gem,
  Award,
  Calendar,
  Building,
  CheckCircle2,
  FileCheck,
  ChevronRight,
  Sliders,
  DollarSign,
} from 'lucide-react';

export const Home: React.FC = () => {
  const [jewelleryList, setJewelleryList] = useState<Jewellery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    jewelleryService.getJewellery().then((data) => {
      setJewelleryList(data);
      setLoading(false);
    });
  }, []);

  const steps = [
    { num: '01', title: 'Choose Jewellery', desc: 'Select ring, necklace, earrings, bracelet, or pendant.' },
    { num: '02', title: 'Choose Design', desc: 'Select from classic solitaire to grand royal halo.' },
    { num: '03', title: 'Choose Metal', desc: '18K, 22K Gold, Rose Gold, White Gold, or Platinum.' },
    { num: '04', title: 'Choose Diamond', desc: 'Select shape, carat, color, clarity, and certified cut.' },
    { num: '05', title: 'Customize', desc: 'Select ring size, personal inscription, and notes.' },
    { num: '06', title: 'Estimated Price', desc: 'Live transparent formula calculated via REST API.' },
    { num: '07', title: 'Book Appointment', desc: 'Choose flagship showroom salon, date, and slot.' },
    { num: '08', title: 'Meet Salesman', desc: 'Private 1-on-1 consultation and physical sample trial.' },
    { num: '09', title: 'Final Quotation', desc: 'Receive official certified valuation and making order.' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[#E8DEC8] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E5DAC6] rounded text-[11px] uppercase tracking-widest text-[#8B5E20] font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#B8863B]" />
                <span>Personalized Jewellery Experience</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-[#171717] leading-[1.15] text-balance">
                Design Your <br />
                <span className="italic font-normal text-[#8B5E20]">Dream Jewellery</span>
              </h1>

              <p className="text-base text-[#5A5044] leading-relaxed max-w-xl text-balance">
                Choose your jewellery, design, metal, and certified natural diamond.
                Customize every detail with instant valuation and book a bespoke consultation
                at your preferred luxury showroom.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  to="/customize"
                  className="px-6 py-3.5 bg-[#B8863B] hover:bg-[#8B5E20] text-white text-xs uppercase tracking-widest font-semibold rounded transition-colors shadow-xs flex items-center gap-2 group"
                >
                  <span>Start Customizing</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  to="/jewellery"
                  className="px-6 py-3.5 bg-white hover:bg-[#FAF7F0] text-[#171717] border border-[#D5C2A5] text-xs uppercase tracking-widest font-semibold rounded transition-colors"
                >
                  Explore Jewellery
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-[#EDE4D2] grid grid-cols-3 gap-4 text-xs text-[#6A5E50]">
                <div>
                  <span className="font-bold text-[#171717] block text-sm">100% Certified</span>
                  <span className="text-[11px]">GIA & IGI Graded</span>
                </div>
                <div>
                  <span className="font-bold text-[#171717] block text-sm">BIS Hallmarked</span>
                  <span className="text-[11px]">750 & 916 Precious Gold</span>
                </div>
                <div>
                  <span className="font-bold text-[#171717] block text-sm">No Obligation</span>
                  <span className="text-[11px]">Complimentary Consultation</span>
                </div>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-white border border-[#E8DEC8] p-3 rounded-md shadow-lg overflow-hidden">
                <div className="relative aspect-4/3 rounded overflow-hidden bg-[#FAF7F0]">
                  <img
                    src="/images/jewellery/ring_solitaire.jpg"
                    alt="REDDY Handcrafted Diamond Solitaire"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute bottom-3 left-3 bg-[#171717]/80 backdrop-blur-xs text-white px-3 py-1.5 rounded text-xs">
                    <span className="font-serif block font-bold">18K Solitaire Brilliant</span>
                    <span className="text-[10px] text-[#D4AF37]">Available for Showroom Trial</span>
                  </div>
                </div>

                <div className="p-4 bg-white flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8A7D6B] block">Brand Heritage</span>
                    <span className="font-serif text-sm font-bold text-[#171717]">REDDY JEMS AND JEWELLERY</span>
                  </div>
                  <Link
                    to="/customize"
                    className="text-xs font-semibold text-[#8B5E20] hover:text-[#171717] flex items-center gap-1"
                  >
                    <span>Configure Now</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY JEWELCRAFT SECTION */}
      <section className="py-20 bg-white border-b border-[#E8DEC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8B5E20]">
              The Bespoke Distinction
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#171717]">
              Why JewelCraft
            </h2>
            <p className="text-sm text-[#6A5E50] leading-relaxed">
              We eliminated the disconnect between generic jewelry retail and true craftsmanship.
              Customize every detail before stepping foot into our private showroom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-[#FAF7F0] border border-[#E8DEC8] rounded-md p-6 space-y-3">
              <div className="w-12 h-12 rounded bg-white border border-[#E5DAC6] flex items-center justify-center text-[#B8863B]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#171717]">
                1. Personalized Designs
              </h3>
              <p className="text-xs text-[#5C5346] leading-relaxed">
                Choose silhouette, mountings, metal alloy, and band widths. Add custom laser-engraved vows or initials.
              </p>
            </div>

            <div className="bg-[#FAF7F0] border border-[#E8DEC8] rounded-md p-6 space-y-3">
              <div className="w-12 h-12 rounded bg-white border border-[#E5DAC6] flex items-center justify-center text-[#B8863B]">
                <Gem className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#171717]">
                2. Premium Diamond Selection
              </h3>
              <p className="text-xs text-[#5C5346] leading-relaxed">
                Filter by 9 shapes, exact carat weights, clarity grades, and color tones. Zero synthetic ambiguity.
              </p>
            </div>

            <div className="bg-[#FAF7F0] border border-[#E8DEC8] rounded-md p-6 space-y-3">
              <div className="w-12 h-12 rounded bg-white border border-[#E5DAC6] flex items-center justify-center text-[#B8863B]">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#171717]">
                3. Transparent Price Estimation
              </h3>
              <p className="text-xs text-[#5C5346] leading-relaxed">
                Real-time API breakdown showing precious metal weights, daily bullion rates, diamond pricing, and making charges.
              </p>
            </div>

            <div className="bg-[#FAF7F0] border border-[#E8DEC8] rounded-md p-6 space-y-3">
              <div className="w-12 h-12 rounded bg-white border border-[#E5DAC6] flex items-center justify-center text-[#B8863B]">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#171717]">
                4. Showroom Consultation
              </h3>
              <p className="text-xs text-[#5C5346] leading-relaxed">
                Our sales gemologist receives your exact configuration in advance, preparing physical stones for your private viewing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION (Visual Step Flow) */}
      <section className="py-20 bg-[#FAF7F0] border-b border-[#E8DEC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8B5E20]">
              Seamless 9-Step Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#171717]">
              How It Works
            </h2>
            <p className="text-sm text-[#6A5E50] leading-relaxed">
              From personalizing every gemstone facet online to receiving your final quotation in our flagship lounge.
            </p>
          </div>

          {/* Connected Grid Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((st, idx) => (
              <div
                key={st.num}
                className="bg-white border border-[#E8DEC8] rounded-md p-6 relative flex flex-col justify-between hover:border-[#B8863B] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-bold text-[#B8863B]">
                      {st.num}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#8A7D6B] font-semibold">
                      Step {idx + 1} of 9
                    </span>
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-[#171717] mb-2">
                    {st.title}
                  </h4>
                  <p className="text-xs text-[#6A5E50] leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#FAF7F0] flex items-center justify-end text-[11px] text-[#8B5E20]">
                  <span>Proceeds to Step {idx < 8 ? idx + 2 : 'Complete'} →</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/customize"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#171717] hover:bg-[#8B5E20] text-white text-xs uppercase tracking-widest font-semibold rounded transition-colors shadow-xs"
            >
              <span>Begin Step 1: Choose Jewellery</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED JEWELLERY TYPES */}
      <section className="py-20 bg-white border-b border-[#E8DEC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8B5E20]">
                Curated Collections
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#171717] mt-1">
                Explore Signature Jewellery
              </h2>
            </div>
            <Link
              to="/jewellery"
              className="text-xs font-semibold uppercase tracking-wider text-[#8B5E20] hover:text-[#171717] flex items-center gap-1"
            >
              <span>View All 5 Categories</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {jewelleryList.slice(0, 3).map((item) => (
              <JewelleryCard key={item.id} jewellery={item} />
            ))}
          </div>
        </div>
      </section>

      {/* SHOWROOM EXPERIENCE SPOTLIGHT */}
      <section className="py-20 bg-[#FAF7F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#171717] rounded-lg overflow-hidden border border-[#3A332C] text-[#FAF7F0] grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                  Private Consultation Salons
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-normal leading-snug">
                  Experience Your Custom Creation in Person
                </h3>
                <p className="text-xs text-[#A89D8F] leading-relaxed">
                  Our private VIP suites in Hyderabad Jubilee Hills, Mumbai Bandra, Bengaluru, and New Delhi are tailored for intimate jewelry review. Relax with complimentary refreshments while examining loose stones under specialized diamond daylighting.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#2C2723]">
                <div className="flex items-center gap-3 text-xs text-[#D5C2A5]">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Your custom configuration is reserved on your appointment day</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#D5C2A5]">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Physical ring sizing gauge & metal sample trials</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#D5C2A5]">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Direct consultation with seasoned senior gemologists</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/customize"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#B8863B] hover:bg-[#8B5E20] text-white text-xs uppercase tracking-widest font-semibold rounded transition-colors"
                >
                  <span>Design & Schedule Visit</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative min-h-[320px]">
              <img
                src="/images/showrooms/showroom_salon.jpg"
                alt="REDDY Luxury Showroom Suite"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
