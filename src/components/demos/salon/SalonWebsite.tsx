import React, { useState } from 'react';
import { ASSETS } from '../../../assets/media';
import { DemoHeaderBar } from '../../common/DemoHeaderBar';
import {
  Scissors,
  Sparkles,
  Calendar,
  Clock,
  Check,
  CheckCircle2,
  X,
  User,
  Heart,
  ArrowRight
} from 'lucide-react';

interface SalonService {
  id: string;
  name: string;
  category: string;
  duration: string;
  price: string;
  description: string;
}

const SALON_SERVICES: SalonService[] = [
  {
    id: 's1',
    name: 'Atelier Signature Haircut & Styling',
    category: 'Hair',
    duration: '60 min',
    price: '$160',
    description: 'Dry-cutting architecture tailored to natural bone structure, followed by botanical scalp rinse and editorial blowout.',
  },
  {
    id: 's2',
    name: 'French Balayage & Dimensional Gloss',
    category: 'Color',
    duration: '150 min',
    price: '$340',
    description: 'Hand-painted sun-kissed micro-ribbons using ammonia-free organic pigments, sealed with deep acidic gloss.',
  },
  {
    id: 's3',
    name: 'Japanese Head Spa & Scalp Therapy',
    category: 'Treatments',
    duration: '75 min',
    price: '$210',
    description: 'Microscopic scalp analysis, herbal steam waterfall infusion, Shiatsu pressure point massage, and follicle renewal.',
  },
  {
    id: 's4',
    name: 'Full Bleach Platinum & Bond Repair',
    category: 'Color',
    duration: '210 min',
    price: '$450',
    description: 'Gentle on-scalp lightening infused with peptide bond builders to preserve hair integrity, tone, and silk finish.',
  },
  {
    id: 's5',
    name: 'Silk Press & Botanical Smoothing',
    category: 'Hair',
    duration: '90 min',
    price: '$190',
    description: 'Deep moisture hydration mask, thermal cuticle sealant, and mirror-finish flat iron styling with zero chemical relaxers.',
  },
  {
    id: 's6',
    name: 'Haute Bridal Trial & Atelier Design',
    category: 'Styling',
    duration: '120 min',
    price: '$280',
    description: 'Comprehensive consultation, veil placement tests, and architectural updo or cascading waves for weddings.',
  },
];

const STYLISTS = [
  {
    id: 'charlotte',
    name: 'Charlotte Vance',
    title: 'Creative Director & Founder',
    specialty: 'Precision Architectural Cuts · Editorial Waves',
    bio: 'Trained in Paris and London with 14 years on Milan Fashion Week runways. Specializes in effortless French-girl texture.',
  },
  {
    id: 'kenji',
    name: 'Kenji Takahashi',
    title: 'Master Colorist',
    specialty: 'Nordic Blondes · Dimensional Brunette Balayage',
    bio: 'Tokyo-born color architect known for seamless foil-work and chemical preservation of delicate hair fibers.',
  },
  {
    id: 'amara',
    name: 'Amara O’Connor',
    title: 'Senior Texture & Scalp Specialist',
    specialty: 'Japanese Scalp Spa · Curl Restoration',
    bio: 'Holistic trichology certified. Restores scalp microbiomes and accentuates natural wave and curl patterns.',
  },
];

export const SalonWebsite: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3>(1);
  const [selectedService, setSelectedService] = useState<SalonService>(SALON_SERVICES[0]);
  const [selectedStylist, setSelectedStylist] = useState(STYLISTS[0]);
  const [bookingDate, setBookingDate] = useState('2026-10-18');
  const [bookingTime, setBookingTime] = useState('11:00');
  const [clientInfo, setClientInfo] = useState({ name: '', email: '', phone: '' });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const filteredServices =
    activeCategory === 'All'
      ? SALON_SERVICES
      : SALON_SERVICES.filter((s) => s.category.toLowerCase() === activeCategory.toLowerCase());

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-[#0E0C0B] text-[#EFEBE4] font-sans selection:bg-[#E8D1B5] selection:text-black">
      <DemoHeaderBar currentIndustry="Atelier Lumière (Salon Demo)" />

      {/* Salon Header */}
      <header className="pt-16 pb-4 px-6 max-w-7xl mx-auto flex items-center justify-between border-b border-white/10">
        <div>
          <span className="font-serif-luxury text-2xl sm:text-3xl font-light tracking-[0.15em] text-[#FAF6F0] block">
            ATELIER LUMIÈRE
          </span>
          <span className="text-[10px] font-mono-code uppercase tracking-[0.25em] text-[#D8BFA5] block">
            Haute Coiffure & Trichologie
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-neutral-400 font-serif-luxury">
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#stylists" className="hover:text-white transition-colors">Artisans</a>
          <a href="#philosophy" className="hover:text-white transition-colors">Botanicals</a>
          <a href="#lookbook" className="hover:text-white transition-colors">Lookbook</a>
        </nav>

        <button
          onClick={() => {
            setBookingOpen(true);
            setBookingStep(1);
            setBookingConfirmed(false);
          }}
          className="px-5 py-2 bg-[#E5D0BA] text-black font-body text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-[#D5BFA9] transition-colors"
        >
          Book Appointment
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 sm:pt-24 sm:pb-36 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono-code uppercase tracking-widest text-[#D8BFA5]">
              Botanical Beauty Sanctuary · Le Marais
            </span>

            <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-light text-[#FDFBF7] leading-[1.05] tracking-tight">
              Quiet Luxury for Hair & Mind.
            </h1>

            <p className="text-base sm:text-lg text-[#C8BFB5] font-light leading-relaxed max-w-lg">
              A serene haven dedicated to architectural scissor precision, ammonia-free dimensional color, and holistic Japanese head spa therapy.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  setBookingOpen(true);
                  setBookingStep(1);
                  setBookingConfirmed(false);
                }}
                className="px-6 py-3.5 bg-[#E5D0BA] text-black font-body font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-[#D5BFA9] transition-colors flex items-center gap-2"
              >
                <span>Reserve An Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#services"
                className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs uppercase tracking-wider rounded-full transition-colors"
              >
                View Services & Rates
              </a>
            </div>

            <div className="pt-8 border-t border-white/8 grid grid-cols-3 gap-6 font-mono-code text-xs">
              <div>
                <div className="text-white font-serif-luxury text-xl">100% Organic</div>
                <div className="text-neutral-500 text-[11px]">Biodynamic Formulas</div>
              </div>
              <div>
                <div className="text-white font-serif-luxury text-xl">Private Suites</div>
                <div className="text-neutral-500 text-[11px]">One-on-One Care</div>
              </div>
              <div>
                <div className="text-white font-serif-luxury text-xl">Aveda & Oribe</div>
                <div className="text-neutral-500 text-[11px]">Exclusively Stocked</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl aspect-[4/3] bg-neutral-900">
              <img
                src={ASSETS.salon}
                alt="Atelier Lumière Interior"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                <div className="text-[10px] font-mono-code uppercase tracking-wider text-[#D8BFA5]">
                  Atmosphere
                </div>
                <div className="font-serif-luxury text-base text-white">
                  Acoustic Travertine Mirrors & Jasmine Tea Ceremony
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Menu Section */}
      <section id="services" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono-code uppercase tracking-widest text-[#D8BFA5]">
              Curated Treatments
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light text-white mt-1">
              Services & Pricing
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {['All', 'Hair', 'Color', 'Treatments', 'Styling'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-xs rounded-full transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#E5D0BA] text-black font-semibold'
                    : 'bg-white/5 text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-[#141210] border border-white/10 rounded-2xl p-7 flex flex-col justify-between hover:border-[#D8BFA5]/40 transition-colors"
            >
              <div>
                <div className="flex items-baseline justify-between gap-2 mb-2">
                  <span className="text-xs font-mono-code text-[#D8BFA5]">{service.category}</span>
                  <span className="text-xs font-mono-code text-neutral-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{service.duration}</span>
                  </span>
                </div>

                <h3 className="font-serif-luxury text-xl text-white font-medium mb-1">
                  {service.name}
                </h3>
                <div className="text-sm font-semibold text-[#E5D0BA] mb-3">
                  {service.price}
                </div>

                <p className="text-xs text-neutral-300 font-light leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedService(service);
                  setBookingOpen(true);
                  setBookingStep(2);
                }}
                className="w-full py-2 bg-white/5 hover:bg-[#E5D0BA] text-white hover:text-black text-xs font-medium rounded-lg transition-colors text-center"
              >
                Select & Book
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Master Stylists */}
      <section id="stylists" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/8">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono-code uppercase tracking-widest text-[#D8BFA5]">
            Artisans
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light text-white mt-1">
            Master Stylists
          </h2>
          <p className="text-neutral-400 text-sm mt-2">
            Each artisan operates on dedicated appointment blocks to ensure uninterrupted attention and consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STYLISTS.map((stylist) => (
            <div
              key={stylist.id}
              className="bg-[#141210] border border-white/10 rounded-2xl p-7 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#E5D0BA] mb-4">
                  <User className="w-6 h-6" />
                </div>
                <h3 className="font-serif-luxury text-2xl font-normal text-white">{stylist.name}</h3>
                <div className="text-xs font-mono-code text-[#D8BFA5] mt-0.5">{stylist.title}</div>
                <p className="mt-4 text-xs text-neutral-300 font-light leading-relaxed">
                  {stylist.bio}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/8">
                <div className="text-[10px] font-mono-code text-neutral-400 uppercase mb-1">
                  Specialty
                </div>
                <div className="text-xs text-white">{stylist.specialty}</div>
                <button
                  onClick={() => {
                    setSelectedStylist(stylist);
                    setBookingOpen(true);
                    setBookingStep(1);
                  }}
                  className="mt-4 w-full py-2 bg-white/5 hover:bg-white/15 text-white text-xs rounded transition-colors text-center"
                >
                  Book with {stylist.name.split(' ')[0]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy & Head Spa Sanctuary Gallery */}
      <section id="gallery" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono-code uppercase tracking-widest text-[#D8BFA5]">
              Head Spa Sanctuary
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light text-white leading-tight">
              Quiet Restorative Trichology
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              Our private treatment suites feature custom travertine wash basins, warm waterfall cascade rinses, and scalp acupressure therapies. Designed for deep neurological decompression.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[16/10] bg-neutral-900 shadow-2xl">
              <img
                src={ASSETS.salonWash}
                alt="Atelier Lumière Travertine Head Spa Suite"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 text-xs font-mono-code text-neutral-300">
                Suite Minami · Travertine Waterfall Spa & Organic Camellia Oil Scalp Bath
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#151210] border border-white/10 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto">
          <Sparkles className="w-8 h-8 text-[#E5D0BA] mx-auto mb-4" />
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-light">
            Pure Botanical Trichology
          </h2>
          <p className="mt-4 text-neutral-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            We believe that extraordinary hair color and styling should never compromise the biology of your scalp.
            Our atelier uses biodynamic botanical extracts, cold-pressed camellia oil, and zero harsh synthetic silicones.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/8 text-center text-xs font-mono-code text-neutral-500">
        <div>ATELIER LUMIÈRE · 14 RUE DE CHARONNE, 75011 PARIS · CLIENT DEMO BY VISTAAR STUDIO</div>
        <div className="mt-1">Wednesday – Sunday: 10:00 – 19:30 · Concierge: +33 1 48 06 12 34</div>
      </footer>

      {/* Appointment Booking Modal */}
      {bookingOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161311] border border-white/15 rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setBookingOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingConfirmed ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#E5D0BA] mx-auto" />
                <h3 className="font-serif-luxury text-2xl font-light text-white">
                  Appointment Requested
                </h3>
                <p className="text-neutral-300 text-xs max-w-sm mx-auto leading-relaxed">
                  Thank you, {clientInfo.name || 'valued guest'}. Your appointment for{' '}
                  <span className="text-white font-medium">{selectedService.name}</span> with{' '}
                  <span className="text-white font-medium">{selectedStylist.name}</span> on{' '}
                  <span className="text-[#E5D0BA] font-mono-code">{bookingDate}</span> at{' '}
                  <span className="text-[#E5D0BA] font-mono-code">{bookingTime}</span> is reserved.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setBookingOpen(false)}
                    className="px-6 py-2 bg-[#E5D0BA] text-black text-xs font-semibold rounded-full"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Step Indicators */}
                <div className="flex items-center gap-2 mb-6 text-xs font-mono-code text-neutral-400">
                  <span className={bookingStep === 1 ? 'text-[#E5D0BA] font-bold' : ''}>1. Service</span>
                  <span>→</span>
                  <span className={bookingStep === 2 ? 'text-[#E5D0BA] font-bold' : ''}>2. Artisan & Time</span>
                  <span>→</span>
                  <span className={bookingStep === 3 ? 'text-[#E5D0BA] font-bold' : ''}>3. Details</span>
                </div>

                {bookingStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="font-serif-luxury text-2xl text-white">Select Your Treatment</h3>
                    <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                      {SALON_SERVICES.map((s) => (
                        <div
                          key={s.id}
                          onClick={() => setSelectedService(s)}
                          className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                            selectedService.id === s.id
                              ? 'bg-[#E5D0BA]/15 border-[#E5D0BA] text-white'
                              : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center justify-between font-medium">
                            <span>{s.name}</span>
                            <span className="text-[#E5D0BA]">{s.price}</span>
                          </div>
                          <div className="text-[11px] text-neutral-400 mt-1">{s.duration}</div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setBookingStep(2)}
                      className="w-full py-3 bg-[#E5D0BA] text-black text-xs font-semibold rounded-xl hover:bg-[#D5BFA9] transition-colors mt-2"
                    >
                      Next: Choose Stylist & Time
                    </button>
                  </div>
                )}

                {bookingStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="font-serif-luxury text-2xl text-white">Stylist & Scheduling</h3>

                    <div>
                      <label className="block text-xs font-mono-code uppercase text-neutral-300 mb-1">
                        Select Artisan
                      </label>
                      <select
                        value={selectedStylist.id}
                        onChange={(e) => {
                          const found = STYLISTS.find((st) => st.id === e.target.value);
                          if (found) setSelectedStylist(found);
                        }}
                        className="w-full bg-[#1C1815] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                      >
                        {STYLISTS.map((st) => (
                          <option key={st.id} value={st.id}>
                            {st.name} ({st.title})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block font-mono-code uppercase text-neutral-300 mb-1">Date</label>
                        <input
                          type="date"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full bg-[#1C1815] border border-white/10 rounded-lg p-2.5 text-white"
                        />
                      </div>
                      <div>
                        <label className="block font-mono-code uppercase text-neutral-300 mb-1">Time</label>
                        <select
                          value={bookingTime}
                          onChange={(e) => setBookingTime(e.target.value)}
                          className="w-full bg-[#1C1815] border border-white/10 rounded-lg p-2.5 text-white"
                        >
                          <option value="10:00">10:00 AM</option>
                          <option value="11:30">11:30 AM</option>
                          <option value="13:30">01:30 PM</option>
                          <option value="15:00">03:00 PM</option>
                          <option value="17:00">05:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => setBookingStep(1)}
                        className="w-1/3 py-2.5 bg-white/5 text-neutral-300 text-xs rounded-xl"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setBookingStep(3)}
                        className="w-2/3 py-2.5 bg-[#E5D0BA] text-black text-xs font-semibold rounded-xl"
                      >
                        Next: Contact Details
                      </button>
                    </div>
                  </div>
                )}

                {bookingStep === 3 && (
                  <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
                    <h3 className="font-serif-luxury text-2xl text-white">Your Contact Details</h3>

                    <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-[11px] text-neutral-300 space-y-1">
                      <div>
                        <span className="text-neutral-400">Treatment:</span> {selectedService.name} ({selectedService.price})
                      </div>
                      <div>
                        <span className="text-neutral-400">Artisan:</span> {selectedStylist.name} · {bookingDate} at {bookingTime}
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono-code uppercase text-neutral-300 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={clientInfo.name}
                        onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                        placeholder="Camille Dupont"
                        className="w-full bg-[#1C1815] border border-white/10 rounded-lg p-2.5 text-white"
                      />
                    </div>

                    <div>
                      <label className="block font-mono-code uppercase text-neutral-300 mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        value={clientInfo.email}
                        onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                        placeholder="camille@example.com"
                        className="w-full bg-[#1C1815] border border-white/10 rounded-lg p-2.5 text-white"
                      />
                    </div>

                    <div>
                      <label className="block font-mono-code uppercase text-neutral-300 mb-1">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={clientInfo.phone}
                        onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                        placeholder="+33 6 12 34 56 78"
                        className="w-full bg-[#1C1815] border border-white/10 rounded-lg p-2.5 text-white"
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setBookingStep(2)}
                        className="w-1/3 py-2.5 bg-white/5 text-neutral-300 text-xs rounded-xl"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 py-2.5 bg-[#E5D0BA] text-black text-xs font-semibold rounded-xl hover:bg-[#D5BFA9] transition-colors"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
