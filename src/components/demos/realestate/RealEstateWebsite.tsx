import React, { useState } from 'react';
import { ASSETS } from '../../../assets/media';
import { DemoHeaderBar } from '../../common/DemoHeaderBar';
import {
  Compass,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Calendar,
  Eye,
  X,
  Check,
  CheckCircle2,
  Phone,
  Mail,
  Shield,
  ArrowRight,
  SlidersHorizontal
} from 'lucide-react';

interface Property {
  id: string;
  title: string;
  location: string;
  category: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  architect: string;
  yearBuilt: number;
  image: string;
  tagline: string;
  description: string;
  features: string[];
}

const PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'The Solstice Cantilever Villa',
    location: 'Pacific Palisades, California',
    category: 'Coastal Villa',
    price: '$28,500,000',
    beds: 6,
    baths: 8,
    sqft: '11,400 sq ft',
    architect: 'Studio Marfa & Associates',
    yearBuilt: 2024,
    image: ASSETS.realEstate,
    tagline: 'Defying gravity with 40-foot cantilevered glass pavilions over the Pacific horizon.',
    description:
      'Engineered directly into coastal bedrock. Features board-formed cast concrete, Fleetwood motorized pocketing glass doors, 75-foot infinity edge pool, and subterranean 6-car gallery with climate control.',
    features: ['Private Oceanfront Heli-Pad Access', 'Subterranean 2,000-Bottle Cellar', 'Wellness Wing with Cold Plunge & Sauna', 'Crestron Smart Home Automation'],
  },
  {
    id: 'prop-2',
    title: 'The Sky Sanctuary Penthouse',
    location: 'Tribeca, New York',
    category: 'Penthouse',
    price: '$34,000,000',
    beds: 5,
    baths: 6,
    sqft: '8,900 sq ft',
    architect: 'Kengo Kuma & Associates',
    yearBuilt: 2023,
    image: ASSETS.realEstate,
    tagline: 'Triplex aerie wrapped in vertical cedar louvers with 360-degree skyline panorama.',
    description:
      'Private key-locked elevator entry into double-height 24-foot living gallery. Private landscaped rooftop terrace with heated plunge pool and wood-burning outdoor fireplace overlooking the Hudson River.',
    features: ['3,200 sq ft Private Rooftop Terrace', 'Sculptural Floating Spiral Bronze Staircase', 'Dornbracht & Calacatta Marble Baths', '24/7 White-Glove Doorman & Concierge'],
  },
  {
    id: 'prop-3',
    title: 'Villa Obsidian Brutalist Retreat',
    location: 'Kyoto Prefecture, Japan',
    category: 'Modernist Sanctuary',
    price: '$19,800,000',
    beds: 4,
    baths: 5,
    sqft: '7,600 sq ft',
    architect: 'Tadao Ando Heritage Collective',
    yearBuilt: 2025,
    image: ASSETS.realEstate,
    tagline: 'Minimalist volcanic stone pavilion immersed in ancient bamboo forest.',
    description:
      'Seamless fusion of traditional Japanese sukiya woodwork and monolithic cast-in-place concrete. Centered around a tranquil reflecting water courtyard and private natural onsen spring.',
    features: ['Private Thermal Mineral Spring Onsen', 'Acoustic Tea Ceremony Pavilion', 'Centuries-Old Bamboo Forest Acreage', 'Geothermal Radiant Stone Heating'],
  },
  {
    id: 'prop-4',
    title: 'Bel Air Promontory Estate',
    location: 'Bel Air, Los Angeles',
    category: 'Private Estate',
    price: '$45,000,000',
    beds: 7,
    baths: 11,
    sqft: '16,200 sq ft',
    architect: 'Paul McClean Design',
    yearBuilt: 2024,
    image: ASSETS.realEstate,
    tagline: 'Gated 3-acre promontory with panoramic views from Downtown LA to Catalina Island.',
    description:
      'A true architectural landmark featuring dual infinity pools that merge with the horizon, commercial-grade screening theater, full tennis court, and independent 2-bedroom guest villa.',
    features: ['Championship Regulation Tennis Court', 'Dolby Atmos 20-Seat Theater', 'Dedicated Security Guard House', 'Gourmet Commercial Prep Kitchen'],
  },
];

const BROKERS = [
  {
    name: 'Julian Sterling',
    title: 'Senior Architectural Partner',
    license: 'DRE #01928471 · 18 yrs Experience',
    territory: 'Malibu, Beverly Hills & Pacific Palisades',
    phone: '+1 (310) 890-4100',
  },
  {
    name: 'Vivienne Chen',
    title: 'Director of Global Private Portfolios',
    license: 'NY DRE #49281720 · 14 yrs Experience',
    territory: 'Tribeca, Upper East Side & Kyoto Acquisitions',
    phone: '+1 (212) 749-3320',
  },
];

export const RealEstateWebsite: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [viewingModalOpen, setViewingModalOpen] = useState(false);
  const [viewingSuccess, setViewingSuccess] = useState(false);

  const [tourForm, setTourForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '2026-10-20',
    time: '14:00',
    hasBroker: 'No, direct private buyer',
    ndaAccepted: true,
  });

  const filteredProperties =
    activeCategory === 'All'
      ? PROPERTIES
      : PROPERTIES.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  const handleViewingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setViewingSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0D12] text-[#E8ECF2] font-sans selection:bg-[#CBD5E1] selection:text-black">
      <DemoHeaderBar currentIndustry="Monolith Estates (Real Estate Demo)" />

      {/* Header */}
      <header className="pt-16 pb-4 px-6 max-w-7xl mx-auto flex items-center justify-between border-b border-white/10">
        <div>
          <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.2em] text-white block">
            MONOLITH ESTATES
          </span>
          <span className="text-[10px] font-mono-code uppercase tracking-[0.25em] text-[#94A3B8] block">
            Architectural Properties & Advisory
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-mono-code uppercase tracking-wider text-neutral-400">
          <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
          <a href="#philosophy" className="hover:text-white transition-colors">Advisory</a>
          <a href="#brokers" className="hover:text-white transition-colors">Partners</a>
          <a href="#contact" className="hover:text-white transition-colors">Private Tour</a>
        </nav>

        <button
          onClick={() => {
            setSelectedProperty(PROPERTIES[0]);
            setViewingModalOpen(true);
            setViewingSuccess(false);
          }}
          className="px-5 py-2 bg-white text-black font-cinzel font-bold text-xs uppercase tracking-wider rounded transition-colors hover:bg-neutral-200 shadow-sm"
        >
          Schedule Tour
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 max-w-7xl mx-auto pt-8 pb-20">
        <div className="relative rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[21/9] border border-white/10 bg-neutral-900">
          <img
            src={ASSETS.realEstate}
            alt="Monolith Estates Architectural Masterpiece"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D12] via-[#0A0D12]/40 to-transparent" />

          <div className="absolute inset-0 p-8 sm:p-14 flex flex-col justify-end">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-mono-code uppercase tracking-widest text-[#94A3B8] bg-black/60 px-3 py-1 rounded inline-block backdrop-blur-sm border border-white/10">
                OFF-MARKET ARCHITECTURAL REPOSITORY
              </span>
              <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight">
                Rare Architectural Sanctuaries for Discerning Collectors.
              </h1>
              <p className="text-sm sm:text-base text-neutral-300 font-light max-w-xl leading-relaxed">
                We represent exceptional residences where visionary engineering, pure geometries, and uncompromised privacy converge.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="#portfolio"
                  className="px-6 py-3 bg-white text-black font-cinzel font-bold text-xs uppercase tracking-wider rounded hover:bg-neutral-200 transition-colors flex items-center gap-2"
                >
                  <span>Explore Properties</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Search Filter Bar */}
        <div className="mt-8 p-4 sm:p-6 bg-[#10141D] border border-white/10 rounded-2xl grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono-code">
          <div>
            <label className="text-neutral-400 block text-[10px] uppercase mb-1">Region</label>
            <select className="w-full bg-[#181F2C] border border-white/10 rounded p-2.5 text-white">
              <option>All Regions (California, NY, Japan)</option>
              <option>Pacific Palisades & Malibu</option>
              <option>Tribeca & Manhattan</option>
              <option>Kyoto Prefecture</option>
            </select>
          </div>
          <div>
            <label className="text-neutral-400 block text-[10px] uppercase mb-1">Architecture Style</label>
            <select className="w-full bg-[#181F2C] border border-white/10 rounded p-2.5 text-white">
              <option>All Styles</option>
              <option>Modernist Cantilever</option>
              <option>Brutalist Concrete Pavilion</option>
              <option>Skyline Triplex Penthouse</option>
            </select>
          </div>
          <div>
            <label className="text-neutral-400 block text-[10px] uppercase mb-1">Price Bracket</label>
            <select className="w-full bg-[#181F2C] border border-white/10 rounded p-2.5 text-white">
              <option>$15M – $50M+ USD</option>
              <option>$15M – $25M USD</option>
              <option>$25M – $35M USD</option>
              <option>$35M+ USD</option>
            </select>
          </div>
          <div className="flex items-end">
            <a
              href="#portfolio"
              className="w-full py-2.5 bg-white/10 hover:bg-white text-white hover:text-black font-semibold rounded text-center transition-colors uppercase tracking-wider"
            >
              Apply Filter
            </a>
          </div>
        </div>
      </section>

      {/* Properties Portfolio Grid */}
      <section id="portfolio" className="py-16 px-6 max-w-7xl mx-auto border-t border-white/8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono-code uppercase tracking-widest text-[#94A3B8]">
              Exclusive Portfolio
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold uppercase text-white mt-1">
              Curated Estates
            </h2>
          </div>

          {/* Filter Categories */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {['All', 'Coastal Villa', 'Penthouse', 'Modernist', 'Private Estate'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-xs font-mono-code uppercase tracking-wider rounded transition-colors whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-white text-black font-bold'
                    : 'bg-white/5 text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProperties.map((prop) => (
            <div
              key={prop.id}
              className="group bg-[#0F131C] border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] bg-neutral-900 overflow-hidden">
                  <img
                    src={prop.image}
                    alt={prop.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-mono-code uppercase tracking-wider bg-black/70 backdrop-blur-md px-3 py-1 rounded text-white border border-white/10">
                      {prop.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-baseline justify-between">
                    <div className="font-mono-code text-xl sm:text-2xl font-bold text-white">
                      {prop.price}
                    </div>
                    <button
                      onClick={() => setSelectedProperty(prop)}
                      className="px-3 py-1.5 bg-white text-black text-xs font-mono-code font-bold uppercase rounded hover:bg-neutral-200 transition-colors flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Dossier</span>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-mono-code text-neutral-400 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#94A3B8]" />
                    <span>{prop.location}</span>
                  </div>

                  <h3 className="font-cinzel font-bold text-xl text-white group-hover:text-neutral-300 transition-colors">
                    {prop.title}
                  </h3>

                  <p className="mt-2 text-xs text-neutral-300 font-light line-clamp-2">
                    {prop.tagline}
                  </p>

                  <div className="mt-6 pt-4 border-t border-white/8 grid grid-cols-3 gap-2 text-xs font-mono-code text-neutral-400">
                    <div className="flex items-center gap-1.5">
                      <BedDouble className="w-3.5 h-3.5 text-white" />
                      <span>{prop.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bath className="w-3.5 h-3.5 text-white" />
                      <span>{prop.baths} Baths</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-white" />
                      <span>{prop.sqft}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0 flex gap-3">
                <button
                  onClick={() => {
                    setSelectedProperty(prop);
                    setViewingModalOpen(true);
                    setViewingSuccess(false);
                  }}
                  className="flex-1 py-2.5 bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 text-xs font-mono-code uppercase tracking-wider rounded transition-colors text-center"
                >
                  Schedule Private Showing
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Senior Brokers Section */}
      <section id="brokers" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/8">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono-code uppercase tracking-widest text-[#94A3B8]">
            Private Advisory
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold uppercase text-white mt-1">
            Senior Partners
          </h2>
          <p className="text-neutral-400 text-sm mt-2">
            Discreet representation for ultra-high-net-worth acquisitions, family offices, and architectural estates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BROKERS.map((broker) => (
            <div
              key={broker.name}
              className="bg-[#0F131C] border border-white/10 rounded-2xl p-7 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-cinzel text-2xl font-bold text-white">{broker.name}</h3>
                <div className="text-xs font-mono-code text-[#94A3B8] mt-0.5">{broker.title}</div>
                <div className="text-[11px] font-mono-code text-neutral-400 mt-2 bg-white/5 p-2 rounded">
                  {broker.license}
                </div>
                <div className="mt-4 text-xs text-neutral-300">
                  <span className="text-neutral-500 font-mono-code block text-[10px] uppercase">Territory</span>
                  {broker.territory}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/8 flex items-center justify-between text-xs font-mono-code">
                <span className="text-white">{broker.phone}</span>
                <button
                  onClick={() => {
                    setSelectedProperty(PROPERTIES[0]);
                    setViewingModalOpen(true);
                  }}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white text-white hover:text-black rounded transition-colors"
                >
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/8 text-center text-xs font-mono-code text-neutral-500">
        <div>MONOLITH ESTATES · BEVERLY HILLS · NEW YORK · KYOTO · CLIENT DEMO BY VISTAAR STUDIO</div>
        <div className="mt-1">Equal Housing Opportunity · All architectural drawings certified</div>
      </footer>

      {/* Property Detail Dossier Modal */}
      {selectedProperty && !viewingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#10141E] border border-white/15 rounded-3xl max-w-3xl w-full p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-900">
                <img
                  src={selectedProperty.image}
                  alt={selectedProperty.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-code text-[#94A3B8] uppercase">
                    {selectedProperty.category} · {selectedProperty.location}
                  </span>
                  <span className="text-2xl font-mono-code font-bold text-white">
                    {selectedProperty.price}
                  </span>
                </div>
                <h3 className="font-cinzel text-3xl font-bold text-white mt-1">
                  {selectedProperty.title}
                </h3>
                <p className="text-xs font-mono-code text-neutral-400 mt-1">
                  Architect: {selectedProperty.architect} · Completed {selectedProperty.yearBuilt}
                </p>
              </div>

              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                {selectedProperty.description}
              </p>

              <div className="p-4 rounded-xl bg-white/5 border border-white/8 space-y-2">
                <div className="text-xs font-mono-code text-white uppercase tracking-wider mb-2">
                  Architectural & Structural Inclusions
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                  {selectedProperty.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="w-1/3 py-3 bg-white/5 text-neutral-300 font-mono-code text-xs rounded-xl"
                >
                  Close Dossier
                </button>
                <button
                  onClick={() => setViewingModalOpen(true)}
                  className="w-2/3 py-3 bg-white text-black font-cinzel font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition-colors"
                >
                  Schedule Private Showing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Private Tour Booking Modal */}
      {viewingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121622] border border-white/15 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => {
                setViewingModalOpen(false);
                setSelectedProperty(null);
              }}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {viewingSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="font-cinzel text-2xl font-bold text-white">
                  Showing Request Confirmed
                </h3>
                <p className="text-neutral-300 text-xs leading-relaxed max-w-sm mx-auto">
                  Our Managing Partner has received your request for{' '}
                  <span className="text-white font-semibold">
                    {selectedProperty?.title || 'the selected estate'}
                  </span>
                  . A private verification liaison will contact you within 4 hours to coordinate security access.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setViewingModalOpen(false);
                      setSelectedProperty(null);
                    }}
                    className="px-6 py-2 bg-white text-black text-xs font-mono-code rounded-full"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#94A3B8]">
                  Confidential Verification
                </span>
                <h3 className="font-cinzel text-2xl font-bold text-white mt-1">
                  Private Estate Showing
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  {selectedProperty ? selectedProperty.title : 'Architectural Tour'} · {selectedProperty?.price}
                </p>

                <form onSubmit={handleViewingSubmit} className="mt-6 space-y-4 text-xs">
                  <div>
                    <label className="block font-mono-code uppercase text-neutral-300 mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={tourForm.name}
                      onChange={(e) => setTourForm({ ...tourForm, name: e.target.value })}
                      placeholder="Harrison Vance"
                      className="w-full bg-[#181F2C] border border-white/10 rounded-lg p-2.5 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-mono-code uppercase text-neutral-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={tourForm.email}
                        onChange={(e) => setTourForm({ ...tourForm, email: e.target.value })}
                        placeholder="harrison@vanceholdings.com"
                        className="w-full bg-[#181F2C] border border-white/10 rounded-lg p-2.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-mono-code uppercase text-neutral-300 mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={tourForm.phone}
                        onChange={(e) => setTourForm({ ...tourForm, phone: e.target.value })}
                        placeholder="+1 (310) 555-0192"
                        className="w-full bg-[#181F2C] border border-white/10 rounded-lg p-2.5 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-mono-code uppercase text-neutral-300 mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={tourForm.date}
                        onChange={(e) => setTourForm({ ...tourForm, date: e.target.value })}
                        className="w-full bg-[#181F2C] border border-white/10 rounded-lg p-2.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-mono-code uppercase text-neutral-300 mb-1">
                        Preferred Time
                      </label>
                      <select
                        value={tourForm.time}
                        onChange={(e) => setTourForm({ ...tourForm, time: e.target.value })}
                        className="w-full bg-[#181F2C] border border-white/10 rounded-lg p-2.5 text-white"
                      >
                        <option value="11:00">11:00 AM (Daylight Architecture)</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="17:30">05:30 PM (Sunset Golden Hour)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-2 text-[11px] text-neutral-400">
                    <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      Private showing requires mutual Non-Disclosure Agreement and proof of funds prior to gate entry.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-white text-black font-cinzel font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition-colors mt-2"
                  >
                    Transmit Showing Request
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
