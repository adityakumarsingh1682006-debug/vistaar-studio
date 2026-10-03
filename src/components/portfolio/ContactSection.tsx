import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Clock, Mail, MapPin, Loader2, Phone } from 'lucide-react';
import { VistaarExpansion } from './VistaarExpansion';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    businessType: 'Gym / Fitness',
    serviceNeeded: 'New Website from Scratch',
    message: '',
    honeypot: '', // Hidden anti-spam field
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const businessTypes = [
    'Gym / Fitness',
    'Restaurant / Hospitality',
    'Salon / Beauty Atelier',
    'Boutique / Fashion',
    'Real Estate / Architecture',
    'Professional Practice / Other',
  ];

  const serviceOptions = [
    'New Website from Scratch',
    'Complete Redesign & Modernization',
    'Custom Booking or Reservation System',
    'Curated E-Commerce Storefront',
    'High-Conversion Landing Page',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.businessName.trim() || !formData.email.trim()) {
      setErrorMsg('Please provide your name, business name, and email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      // Success
      setSubmitted(true);
      // Clear the form
      setFormData({
        name: '',
        businessName: '',
        email: '',
        phone: '',
        businessType: 'Gym / Fitness',
        serviceNeeded: 'New Website from Scratch',
        message: '',
        honeypot: '',
      });
    } catch (err: any) {
      console.error('[Contact Submission Error]', err);
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 border-b border-white/6 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Headline & Contact Microcopy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.7)]" />
              <span className="text-xs font-mono-code uppercase tracking-widest text-neutral-400">
                Direct Inquiries
              </span>
            </div>
            <VistaarExpansion className="!my-1 !justify-start" width="w-20" />

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-[1.02]">
              Let’s build something worth visiting.
            </h2>

            <p className="text-lg text-neutral-300 font-body font-light leading-relaxed">
              Tell us about your business and what you'd like your website to do.
              We respond to every serious project inquiry within 24 hours with honest feedback and initial scope thoughts.
            </p>

            <div className="pt-6 border-t border-white/10 space-y-4 text-sm text-neutral-400">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-neutral-300 shrink-0" />
                <a href="mailto:adityakumarsingh1682006@gmail.com" className="text-neutral-200 font-mono-code hover:text-white transition-colors">adityakumarsingh1682006@gmail.com</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-neutral-300 shrink-0" />
                <a href="tel:+918910534042" className="text-neutral-200 font-mono-code hover:text-white transition-colors">+91 8910534042</a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-neutral-300 shrink-0" />
                <span>Typical project turnaround: 2 to 5 weeks</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-neutral-300 shrink-0" />
                <span>Working worldwide · Remote-first studio</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0F1219] border border-white/8 text-xs text-neutral-400 leading-relaxed">
              <span className="text-white font-medium">Looking for a specific industry demo?</span>{' '}
              Feel free to reference our live demos (Gym, Restaurant, Salon, Boutique, Real Estate) in your message if you want similar mechanics.
            </div>
          </div>

          {/* Right Column: High-Craft Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0E1017] border border-white/12 rounded-2xl p-7 sm:p-10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.95),0_10px_40px_-15px_rgba(99,102,241,0.08),inset_0_1px_0_rgba(255,255,255,0.06)] relative overflow-hidden">
              {/* Hairline Specular Highlight */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    Inquiry Received
                  </h3>
                  <p className="text-neutral-300 max-w-md mx-auto text-sm leading-relaxed">
                    Thanks — your project enquiry has been sent. We'll get back to you soon.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-mono-code text-neutral-400 hover:text-white underline underline-offset-4"
                    >
                      Send another inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMsg && (
                    <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                      {errorMsg}
                    </div>
                  )}

                  {/* Anti-spam honeypot field (hidden from view and tab-navigation) */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website_url_hp"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono-code uppercase tracking-wider text-neutral-300 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Elena Rostova"
                        className="w-full bg-[#141822] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-code uppercase tracking-wider text-neutral-300 mb-2">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="Aura Dining Group"
                        className="w-full bg-[#141822] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono-code uppercase tracking-wider text-neutral-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="elena@example.com"
                        className="w-full bg-[#141822] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-code uppercase tracking-wider text-neutral-300 mb-2">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 019-2834"
                        className="w-full bg-[#141822] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono-code uppercase tracking-wider text-neutral-300 mb-2">
                        Business Type
                      </label>
                      <select
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        className="w-full bg-[#141822] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/40 transition-colors"
                      >
                        {businessTypes.map((type) => (
                          <option key={type} value={type} className="bg-[#10131B] text-white">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono-code uppercase tracking-wider text-neutral-300 mb-2">
                        What do you need?
                      </label>
                      <select
                        value={formData.serviceNeeded}
                        onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                        className="w-full bg-[#141822] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/40 transition-colors"
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#10131B] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code uppercase tracking-wider text-neutral-300 mb-2">
                      Tell us about your project & goals
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Optional: Share a few sentences about your business, current website challenges, timeline expectations, or any features you need..."
                      className="w-full bg-[#141822] border border-white/10 rounded-xl p-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/40 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-white text-[#090A0D] font-display font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition-all shadow-xl shadow-black/30 flex items-center justify-center gap-2 group disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#090A0D]" />
                        <span>Transmitting Details...</span>
                      </>
                    ) : (
                      <>
                        <span>Start a Project</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
