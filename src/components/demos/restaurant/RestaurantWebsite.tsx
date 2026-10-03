import React, { useState } from 'react';
import { ASSETS } from '../../../assets/media';
import { DemoHeaderBar } from '../../common/DemoHeaderBar';
import {
  UtensilsCrossed,
  Wine,
  Calendar,
  Clock,
  Users,
  MapPin,
  CheckCircle2,
  X,
  Sparkles,
  Phone,
  Mail,
  ChevronDown
} from 'lucide-react';

interface MenuItem {
  name: string;
  frenchName: string;
  description: string;
  pairing: string;
  price: string;
  dietary?: string;
}

const MENU_DATA: Record<string, MenuItem[]> = {
  Starters: [
    {
      name: 'Hokkaido Scallop Crudo',
      frenchName: 'Coquilles Saint-Jacques Crues',
      description: 'Hand-dived scallops, preserved yuzu kosho pearls, white asparagus velouté, cold-pressed green olive oil.',
      pairing: 'Domaine Leflaive Puligny-Montrachet 2021',
      price: '$38',
      dietary: 'Gluten-Free',
    },
    {
      name: 'Black Périgord Truffle Tartlet',
      frenchName: 'Tartelette aux Truffes Noires',
      description: 'Caramelized shallot sabayon, 36-month aged Comté, laminated puff pastry, shaved winter truffle.',
      pairing: 'Louis Roederer Cristal Brut 2014',
      price: '$44',
      dietary: 'Vegetarian',
    },
    {
      name: 'Dry-Aged Wagyu Carpaccio',
      frenchName: 'Carpaccio de Bœuf Wagyu A5',
      description: 'Miyazaki A5 beef, cured duck egg yolk emulsion, pickled chanterelles, caper leaf crisp.',
      pairing: 'Gaja Barbaresco 2018',
      price: '$46',
    },
  ],
  Mains: [
    {
      name: 'Brittany Turbot Meunière Reimagined',
      frenchName: 'Turbot Sauvage de Bretagne',
      description: 'Pan-roasted wild turbot, brown butter emulsion with sea succulents, braised baby leeks, caviar quenelle.',
      pairing: 'Chassagne-Montrachet 1er Cru 2020',
      price: '$72',
      dietary: 'Pescatarian',
    },
    {
      name: 'Roasted Pyrenean Milk Lamb',
      frenchName: 'Agneau de Lait des Pyrénées',
      description: 'Slow-roasted saddle and glazed rib, smoked pomme purée, charred rosemary jus, confit garlic.',
      pairing: 'Château Margaux Premier Grand Cru 2015',
      price: '$78',
    },
    {
      name: 'Morel & Forest Pine Risotto',
      frenchName: 'Risotto aux Morilles & Aiguilles de Pin',
      description: 'Acquerello aged carnaroli rice, foraged French morels, toasted hazelnut butter, aged pecorino foam.',
      pairing: 'Biondi-Santi Brunello di Montalcino 2016',
      price: '$58',
      dietary: 'Vegetarian',
    },
  ],
  Desserts: [
    {
      name: 'Valrhona Grand Cru Smoked Soufflé',
      frenchName: 'Soufflé Chaud au Chocolat 70%',
      description: 'Single-origin Guanaja chocolate, Madagascar bourbon vanilla ice cream poured tableside, gold leaf.',
      pairing: 'Château d’Yquem Sauternes 2011',
      price: '$26',
    },
    {
      name: 'Poached Bergamot Pear',
      frenchName: 'Poire Pochée au Poivre Sauvage',
      description: 'Slow-poached in elderflower liquor, crispy almond sable, sheep milk crème fraîche, verbena granita.',
      pairing: 'Royal Tokaji 5 Puttonyos Aszú 2017',
      price: '$24',
      dietary: 'Gluten-Free',
    },
  ],
  Cellar: [
    {
      name: 'Domaine de la Romanée-Conti 2017',
      frenchName: 'Grands Échezeaux Grand Cru',
      description: 'Sublime aromatics of crushed violet, wild raspberry, forest floor, and incense with silky, endless tannins.',
      pairing: 'Pyrenean Lamb & Truffle Tartlet',
      price: '$1,850',
    },
    {
      name: 'Krug Clos d’Ambonnay 2002',
      frenchName: 'Champagne Blanc de Noirs',
      description: 'Pinot Noir from a tiny walled vineyard. Brioche, roasted hazelnut, candied citrus and breathtaking minerality.',
      pairing: 'Caviar & Hokkaido Scallop',
      price: '$2,400',
    },
  ],
};

export const RestaurantWebsite: React.FC = () => {
  const [activeCourse, setActiveCourse] = useState<string>('Mains');
  const [reservationOpen, setReservationOpen] = useState(false);
  const [reservationSubmitted, setReservationSubmitted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  const [resForm, setResForm] = useState({
    date: '2026-10-15',
    time: '19:30',
    guests: '2 Guests',
    seating: 'Main Dining Room',
    dietary: 'None',
    occasion: 'Anniversary Dinner',
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = 'AUR-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmationCode(code);
    setReservationSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-[#EDE7DD] font-sans selection:bg-[#D4AF37] selection:text-black">
      <DemoHeaderBar currentIndustry="L'Atelier Aura (Restaurant Demo)" />

      {/* Top Header */}
      <header className="pt-16 pb-4 px-6 max-w-7xl mx-auto flex items-center justify-between border-b border-[#D4AF37]/20">
        <div>
          <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#F3EFE6] block">
            L’ATELIER AURA
          </span>
          <span className="text-[10px] font-mono-code tracking-[0.25em] text-[#D4AF37] block uppercase -mt-0.5">
            Haute Gastronomie & Cave
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-cinzel tracking-widest uppercase text-neutral-400">
          <a href="#philosophy" className="hover:text-[#D4AF37] transition-colors">Philosophy</a>
          <a href="#menu" className="hover:text-[#D4AF37] transition-colors">Menu</a>
          <a href="#atmosphere" className="hover:text-[#D4AF37] transition-colors">Atmosphere</a>
          <a href="#private-dining" className="hover:text-[#D4AF37] transition-colors">Private Salons</a>
          <a href="#hours" className="hover:text-[#D4AF37] transition-colors">Hours</a>
        </nav>

        <button
          onClick={() => setReservationOpen(true)}
          className="px-5 py-2 bg-[#D4AF37] hover:bg-[#C29D2D] text-black font-cinzel font-bold text-xs uppercase tracking-widest rounded transition-colors shadow-lg shadow-[#D4AF37]/10"
        >
          Reserve Table
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 sm:pt-24 sm:pb-36 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-[#D4AF37]" />
              <span className="text-xs font-mono-code tracking-widest text-[#D4AF37] uppercase">
                Three Michelin Stars · World 50 Best
              </span>
            </div>

            <h1 className="font-cinzel text-4xl sm:text-6xl lg:text-7xl font-semibold text-[#F7F4EE] leading-[1.05] tracking-tight text-balance">
              Where Fire, Soil & Season Harmonize.
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 font-serif-luxury leading-relaxed max-w-xl italic">
              "We cook not to impress, but to awaken memory. Every dish is a dialogue with farmers who tend heirloom seeds and divers who descend into freezing waters."
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setReservationOpen(true)}
                className="px-6 py-3.5 bg-[#D4AF37] hover:bg-[#C29D2D] text-black font-cinzel font-bold text-xs uppercase tracking-widest rounded transition-colors shadow-xl"
              >
                Book An Evening
              </button>

              <a
                href="#menu"
                className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-[#D4AF37]/30 text-xs font-cinzel uppercase tracking-widest rounded transition-colors"
              >
                Explore Tasting Menus
              </a>
            </div>

            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 font-mono-code text-xs">
              <div>
                <div className="text-[#D4AF37] font-cinzel text-lg font-bold">12-Course</div>
                <div className="text-neutral-400 text-[11px]">Seasonal Tasting</div>
              </div>
              <div>
                <div className="text-[#D4AF37] font-cinzel text-lg font-bold">1,800+</div>
                <div className="text-neutral-400 text-[11px]">Cellar References</div>
              </div>
              <div>
                <div className="text-[#D4AF37] font-cinzel text-lg font-bold">38 Seats</div>
                <div className="text-neutral-400 text-[11px]">Intimate Dining</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl shadow-black aspect-[4/3] bg-neutral-950">
              <img
                src={ASSETS.restaurant}
                alt="L'Atelier Aura Culinary Presentation"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0F0E12]/80 backdrop-blur-md border border-[#D4AF37]/20 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono-code uppercase tracking-wider text-[#D4AF37]">
                    Current Service
                  </div>
                  <div className="font-cinzel text-sm text-white font-medium">
                    Autumn Equinox Omakase & Pairing
                  </div>
                </div>
                <span className="text-xs font-mono-code text-neutral-400">$320 / Guest</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section id="philosophy" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-xs font-mono-code tracking-widest text-[#D4AF37] uppercase">
            Culinary Philosophy
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-semibold text-white">
            The Sanctity of the Ingredient
          </h2>
          <p className="text-neutral-300 font-serif-luxury text-lg sm:text-xl leading-relaxed italic">
            Led by Chef Patron Laurent Moreau, L’Atelier Aura rejects artificial spherifications and theatrical smoke.
            Our craft is anchored in open flame, wild fermentation, biodynamic broths, and hyper-seasonal foraged flora from the coastal valleys.
          </p>
        </div>
      </section>

      {/* Menu & Cellar Highlights */}
      <section id="menu" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono-code tracking-widest text-[#D4AF37] uppercase">
              Current Tasting Menu
            </span>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-semibold text-white mt-1">
              Carte Gastronomique
            </h2>
          </div>

          {/* Course Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {Object.keys(MENU_DATA).map((course) => (
              <button
                key={course}
                onClick={() => setActiveCourse(course)}
                className={`px-4 py-2 text-xs font-cinzel uppercase tracking-widest rounded transition-colors whitespace-nowrap ${
                  activeCourse === course
                    ? 'bg-[#D4AF37] text-black font-bold'
                    : 'bg-white/5 text-neutral-400 hover:text-white'
                }`}
              >
                {course}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MENU_DATA[activeCourse]?.map((item) => (
            <div
              key={item.name}
              className="bg-[#0D0D12] border border-white/10 rounded-2xl p-7 flex flex-col justify-between hover:border-[#D4AF37]/50 transition-colors"
            >
              <div>
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <h3 className="font-cinzel font-semibold text-lg text-white">
                    {item.name}
                  </h3>
                  <span className="font-mono-code text-sm font-semibold text-[#D4AF37]">
                    {item.price}
                  </span>
                </div>

                <div className="text-xs font-serif-luxury italic text-[#D4AF37]/80 mb-3">
                  {item.frenchName}
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed font-body mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/8 text-[11px]">
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <Wine className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="text-neutral-300 italic">{item.pairing}</span>
                </div>
                {item.dietary && (
                  <div className="mt-2 text-[10px] font-mono-code text-emerald-400">
                    {item.dietary}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Atmosphere & Dining Room Gallery */}
      <section id="atmosphere" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono-code tracking-widest text-[#D4AF37] uppercase">
              The Salle & Sanctuary
            </span>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-semibold text-white">
              An Intimate Halo of Candlelight
            </h2>
            <p className="text-neutral-300 font-serif-luxury text-base sm:text-lg italic leading-relaxed">
              Designed around sound dampening acoustic basalt walls and hand-carved French oak tables. No ambient noise, no rushed courses. Just quiet culinary focus.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/30 aspect-[16/10] bg-neutral-950 shadow-2xl">
              <img
                src={ASSETS.restaurantDining}
                alt="L'Atelier Aura Candlelit Dining Salon"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/70 backdrop-blur-md rounded-xl border border-white/10 text-xs font-mono-code text-neutral-300">
                Salon Cézanne · Hand-loomed Belgian Linen & Artisanal Glassware
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0E0E14] border border-white/10 p-7 rounded-2xl">
            <span className="text-[10px] font-mono-code text-[#D4AF37] uppercase tracking-widest block mb-2">
              The Main Salon
            </span>
            <h3 className="font-cinzel text-xl text-white font-medium mb-3">
              Chiaroscuro & Raw Granite
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-body">
              Tables positioned with generous acoustic space. Cast iron architectural chandeliers cast intimate amber halos over dark Belgian linen and hand-thrown ceramic tableware.
            </p>
          </div>

          <div className="bg-[#0E0E14] border border-white/10 p-7 rounded-2xl">
            <span className="text-[10px] font-mono-code text-[#D4AF37] uppercase tracking-widest block mb-2">
              Sommelier Cellar
            </span>
            <h3 className="font-cinzel text-xl text-white font-medium mb-3">
              Subterranean Vault
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-body">
              Climate-controlled at 13°C and 70% humidity. Featuring rare verticals from Domaine de la Romanée-Conti, Coche-Dury, and small biodynamic vintners from the Jura.
            </p>
          </div>

          <div id="private-dining" className="bg-[#0E0E14] border border-white/10 p-7 rounded-2xl">
            <span className="text-[10px] font-mono-code text-[#D4AF37] uppercase tracking-widest block mb-2">
              The Obsidian Room
            </span>
            <h3 className="font-cinzel text-xl text-white font-medium mb-3">
              Private Dining Salon
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-body">
              Accommodates up to 14 guests with dedicated sommelier service, bespoke multi-course menus crafted by Chef Moreau, and private discreet alley entrance.
            </p>
          </div>
        </div>
      </section>

      {/* Working Reservation Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/8">
        <div className="bg-[#0C0C10] border border-[#D4AF37]/30 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="text-xs font-mono-code tracking-widest text-[#D4AF37] uppercase">
              Table Reservation
            </span>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-semibold text-white mt-1">
              An Unhurried Evening
            </h2>
            <p className="text-neutral-300 text-xs sm:text-sm mt-3 font-serif-luxury italic">
              Reservations are released 30 days in advance at midnight. Please allow 3 hours for the complete 12-course tasting journey.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {reservationSubmitted ? (
              <div className="p-8 rounded-2xl bg-[#12121A] border border-[#D4AF37]/40 text-center space-y-4 animate-in fade-in duration-300">
                <CheckCircle2 className="w-12 h-12 text-[#D4AF37] mx-auto" />
                <h3 className="font-cinzel text-2xl font-bold text-white">
                  Reservation Confirmed
                </h3>
                <div className="text-xs font-mono-code text-[#D4AF37] bg-black/40 py-2 px-4 rounded inline-block">
                  Reference: {confirmationCode}
                </div>
                <p className="text-neutral-300 text-xs leading-relaxed">
                  We look forward to welcoming {resForm.name || 'you'} for a table of{' '}
                  <span className="text-white font-semibold">{resForm.guests}</span> on{' '}
                  <span className="text-white font-semibold">{resForm.date}</span> at{' '}
                  <span className="text-white font-semibold">{resForm.time}</span>. A confirmation email has been dispatched.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setReservationSubmitted(false);
                      setReservationOpen(false);
                    }}
                    className="text-xs font-cinzel text-[#D4AF37] underline uppercase tracking-wider"
                  >
                    Close or Modify Details
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleReservationSubmit} className="space-y-5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-cinzel uppercase text-neutral-300 mb-1 tracking-wider">
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={resForm.date}
                      onChange={(e) => setResForm({ ...resForm, date: e.target.value })}
                      className="w-full bg-[#14141E] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block font-cinzel uppercase text-neutral-300 mb-1 tracking-wider">
                      Time Slot
                    </label>
                    <select
                      value={resForm.time}
                      onChange={(e) => setResForm({ ...resForm, time: e.target.value })}
                      className="w-full bg-[#14141E] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="17:30">17:30 (First Seating)</option>
                      <option value="18:15">18:15</option>
                      <option value="19:30">19:30 (Prime Evening)</option>
                      <option value="20:45">20:45 (Night Tasting)</option>
                      <option value="21:15">21:15</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-cinzel uppercase text-neutral-300 mb-1 tracking-wider">
                      Party Size
                    </label>
                    <select
                      value={resForm.guests}
                      onChange={(e) => setResForm({ ...resForm, guests: e.target.value })}
                      className="w-full bg-[#14141E] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3 Guests</option>
                      <option>4 Guests</option>
                      <option>5 Guests</option>
                      <option>6 Guests</option>
                      <option>8 Guests (Private Room)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-cinzel uppercase text-neutral-300 mb-1 tracking-wider">
                      Guest Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Lord Charles Montgomery"
                      value={resForm.name}
                      onChange={(e) => setResForm({ ...resForm, name: e.target.value })}
                      className="w-full bg-[#14141E] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block font-cinzel uppercase text-neutral-300 mb-1 tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="charles@example.com"
                      value={resForm.email}
                      onChange={(e) => setResForm({ ...resForm, email: e.target.value })}
                      className="w-full bg-[#14141E] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-cinzel uppercase text-neutral-300 mb-1 tracking-wider">
                      Dietary Preferences
                    </label>
                    <select
                      value={resForm.dietary}
                      onChange={(e) => setResForm({ ...resForm, dietary: e.target.value })}
                      className="w-full bg-[#14141E] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option>No Dietary Restrictions</option>
                      <option>Pescatarian</option>
                      <option>Vegetarian</option>
                      <option>Gluten-Free</option>
                      <option>Severe Nut Allergy</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-cinzel uppercase text-neutral-300 mb-1 tracking-wider">
                      Occasion
                    </label>
                    <select
                      value={resForm.occasion}
                      onChange={(e) => setResForm({ ...resForm, occasion: e.target.value })}
                      className="w-full bg-[#14141E] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option>Anniversary Celebration</option>
                      <option>Birthday</option>
                      <option>Executive Business Dining</option>
                      <option>Casual Gastronomy Exploration</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-cinzel uppercase text-neutral-300 mb-1 tracking-wider">
                    Special Sommelier or Seating Notes
                  </label>
                  <textarea
                    rows={2}
                    value={resForm.notes}
                    onChange={(e) => setResForm({ ...resForm, notes: e.target.value })}
                    placeholder="E.g., Preferred corner table, interested in Vintage Champagne pairing..."
                    className="w-full bg-[#14141E] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#D4AF37] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#D4AF37] hover:bg-[#C29D2D] text-black font-cinzel font-bold text-xs uppercase tracking-widest rounded-lg transition-colors shadow-lg"
                >
                  Request Table Reservation
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Practical Details & Footer */}
      <footer id="hours" className="py-12 border-t border-white/8 text-xs font-mono-code text-neutral-400">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <span className="font-cinzel text-white text-sm block mb-1">Location</span>
            <div>18 Quai des Célestins, 75004 Paris</div>
            <div>Valet parking provided at front entrance.</div>
          </div>
          <div>
            <span className="font-cinzel text-white text-sm block mb-1">Hours of Service</span>
            <div>Tuesday – Saturday: 18:00 – 00:00</div>
            <div>Sunday & Monday: Closed for agricultural sourcing</div>
          </div>
          <div>
            <span className="font-cinzel text-white text-sm block mb-1">Dress Code</span>
            <div>Smart Elegant. Jackets requested for gentlemen.</div>
            <div>Concierge: +33 1 42 68 90 00</div>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-white/6 text-[11px] text-neutral-500">
          L'ATELIER AURA · CLIENT DEMO BY VISTAAR STUDIO
        </div>
      </footer>
    </div>
  );
};
