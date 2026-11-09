import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import confetti from 'canvas-confetti';
import { Mail, Phone, MapPin, Send, MessageSquare, Copy, Check, Clock, Facebook, ArrowUpRight } from 'lucide-react';

interface ContactSectionProps {
  initialServiceOrProject?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialServiceOrProject }) => {
  const { profile } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isCopiedEmail, setIsCopiedEmail] = useState(false);
  const [isCopiedPhone, setIsCopiedPhone] = useState(false);
  const [isCopiedFb, setIsCopiedFb] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialServiceOrProject) {
      setFormData(prev => ({
        ...prev,
        subject: `Inquiry regarding: ${initialServiceOrProject}`,
        message: `Hello Azizul,\n\nI am interested in your design work on "${initialServiceOrProject}". I would like to discuss a potential commission.\n\nBest regards,`,
      }));
    }
  }, [initialServiceOrProject]);

  const handleCopy = (text: string, type: 'email' | 'phone' | 'fb') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setIsCopiedEmail(true);
      setTimeout(() => setIsCopiedEmail(false), 2500);
    } else if (type === 'phone') {
      setIsCopiedPhone(true);
      setTimeout(() => setIsCopiedPhone(false), 2500);
    } else {
      setIsCopiedFb(true);
      setTimeout(() => setIsCopiedFb(false), 2500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    try {
      confetti({
        particleCount: 70,
        spread: 55,
        origin: { y: 0.7 },
        colors: ['#38bdf8', '#ffffff', '#e2b170'],
      });
    } catch {
      // safe fallback
    }

    setIsSubmitted(true);

    const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
      formData.subject || `Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.open(mailtoUrl, '_blank');
  };

  return (
    <section id="contact" className="py-24 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-14">
          <div className="text-xs font-serif italic text-cyan-400 mb-2">
            06. Studio Inquiries &amp; Commissions
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-normal">
            Start a Collaboration
          </h2>
          <div className="w-16 h-[1px] bg-white/20 mt-4" />
        </div>

        {/* 2-Column Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-[#0c1017] border border-white/10 space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Direct Contact
                </h3>
                <p className="text-xs font-serif italic text-slate-400 mt-1">
                  Based in Chattogram, Bangladesh. Available for client commissions and full-time engagements.
                </p>
              </div>

              <div className="space-y-4">
                {/* Email Item */}
                <div className="p-4 rounded-xl bg-[#111622] border border-white/5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-cyan-400 shrink-0" />
                    <div>
                      <div className="text-[11px] font-sans-ui text-slate-400">Official Email</div>
                      <a
                        href={`mailto:${profile.email}`}
                        className="text-xs sm:text-sm font-serif text-white hover:text-cyan-300 transition-colors break-all"
                      >
                        {profile.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(profile.email, 'email')}
                    className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white transition-colors"
                    title="Copy Email"
                  >
                    {isCopiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>

                {/* Phone Item */}
                <div className="p-4 rounded-xl bg-[#111622] border border-white/5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-cyan-400 shrink-0" />
                    <div>
                      <div className="text-[11px] font-sans-ui text-slate-400">Direct Phone</div>
                      <a
                        href={`tel:${profile.phone}`}
                        className="text-xs sm:text-sm font-serif text-white hover:text-cyan-300 transition-colors font-mono-numbers"
                      >
                        {profile.phone}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(profile.phone, 'phone')}
                    className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white transition-colors"
                    title="Copy Phone"
                  >
                    {isCopiedPhone ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>

                {/* Facebook Profile Item */}
                <div className="p-4 rounded-xl bg-[#111622] border border-white/5 flex items-center justify-between gap-3 group">
                  <div className="flex items-center gap-3">
                    <Facebook size={16} className="text-blue-400 shrink-0" />
                    <div>
                      <div className="text-[11px] font-sans-ui text-slate-400">Facebook Profile</div>
                      <a
                        href={profile.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-serif text-white hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                      >
                        <span>km.azizul.islam.122576</span>
                        <ArrowUpRight size={13} className="text-slate-400 group-hover:text-cyan-300" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(profile.facebook, 'fb')}
                      className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white transition-colors"
                      title="Copy Facebook Link"
                    >
                      {isCopiedFb ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                    <a
                      href={profile.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-blue-900/30 border border-blue-500/30 hover:border-blue-500 text-blue-300 text-xs font-sans-ui transition-colors hidden sm:inline-flex items-center gap-1"
                    >
                      <span>Visit</span>
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="p-4 rounded-xl bg-[#111622] border border-white/5 flex items-center gap-3">
                  <MapPin size={16} className="text-cyan-400 shrink-0" />
                  <div>
                    <div className="text-[11px] font-sans-ui text-slate-400">Location</div>
                    <div className="text-xs sm:text-sm font-serif text-white">
                      {profile.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA Button */}
              <a
                href={`https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}?text=Hello%20Azizul,%20I%20would%20like%20to%20discuss%20a%20design%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-500/80 text-emerald-300 font-sans-ui font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare size={15} />
                <span>Chat on WhatsApp Directly</span>
              </a>

              <div className="pt-2 flex items-center gap-2 text-xs font-serif italic text-slate-400">
                <Clock size={12} className="text-cyan-400" />
                <span>Average response window: 1–4 hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Message Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0c1017] border border-white/10 space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Send a Direct Message
                </h3>
                <p className="text-xs font-serif italic text-slate-400 mt-1">
                  Submit project details below to dispatch an inquiry directly to Azizul.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-8 rounded-xl bg-[#111622] border border-white/10 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center mx-auto">
                    <Check size={20} />
                  </div>
                  <h4 className="font-serif font-bold text-xl text-white">
                    Inquiry Prepared
                  </h4>
                  <p className="text-xs sm:text-sm font-serif text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-bold">{formData.name}</span>. Your mail client has opened with your message. Azizul will review and follow up promptly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="px-4 py-2 rounded-lg border border-white/10 text-xs font-sans-ui text-slate-300 hover:text-white mt-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-sans-ui text-slate-400 mb-1.5 font-medium">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Rahman"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#111622] border border-white/10 text-xs sm:text-sm font-serif text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-sans-ui text-slate-400 mb-1.5 font-medium">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. name@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#111622] border border-white/10 text-xs sm:text-sm font-serif text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans-ui text-slate-400 mb-1.5 font-medium">
                      Subject / Scope of Work
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Brand Identity System &amp; Commercial Print Package"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#111622] border border-white/10 text-xs sm:text-sm font-serif text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans-ui text-slate-400 mb-1.5 font-medium">
                      Project Details &amp; Objectives *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your creative requirements, timeline, and deliverables..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#111622] border border-white/10 text-xs sm:text-sm font-serif text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-white text-slate-950 font-sans-ui font-semibold text-xs sm:text-sm hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={14} />
                    <span>Send Inquiry to Azizul</span>
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
