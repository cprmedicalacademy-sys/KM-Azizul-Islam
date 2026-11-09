import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUp, Shield } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { profile, openAdminModal, isAdmin } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#07090e] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Studio Summary in Times New Roman */}
          <div className="md:col-span-5 space-y-3">
            <h3 className="font-serif text-2xl font-bold text-white">
              Azizul Islam Opi
            </h3>
            <p className="font-serif italic text-sm text-cyan-300">
              Graphic Designer &amp; Creative Professional
            </p>
            <p className="text-xs sm:text-sm font-serif text-slate-400 leading-relaxed max-w-sm">
              Shaping iconic brand identities, commercial offset prepress print collateral, and healthcare curriculum literature from Chattogram, Bangladesh.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-serif italic text-xs text-slate-400">
              Navigation
            </div>
            <div className="flex flex-col space-y-1.5 text-xs font-serif text-slate-300">
              <button onClick={() => onNavigate('hero')} className="text-left hover:text-white transition-colors">Home</button>
              <button onClick={() => onNavigate('about')} className="text-left hover:text-white transition-colors">Biography</button>
              <button onClick={() => onNavigate('skills')} className="text-left hover:text-white transition-colors">Skills &amp; Craft</button>
              <button onClick={() => onNavigate('experience')} className="text-left hover:text-white transition-colors">Milestones</button>
              <button onClick={() => onNavigate('services')} className="text-left hover:text-white transition-colors">Services</button>
              <button onClick={() => onNavigate('projects')} className="text-left hover:text-white transition-colors">Selected Works</button>
              <button onClick={() => onNavigate('contact')} className="text-left hover:text-white transition-colors">Inquiries</button>
            </div>
          </div>

          {/* Studio Credentials & Admin CMS Trigger */}
          <div className="md:col-span-4 space-y-3">
            <div className="font-serif italic text-xs text-slate-400">
              Studio Communication
            </div>
            <div className="space-y-1.5 text-xs font-serif text-slate-300">
              <div>Email: <a href={`mailto:${profile.email}`} className="text-white hover:text-cyan-300 transition-colors">{profile.email}</a></div>
              <div>Phone / WhatsApp: <a href={`tel:${profile.phone}`} className="text-white hover:text-cyan-300 transition-colors font-mono-numbers">{profile.phone}</a></div>
              <div>Facebook: <a href={profile.facebook} target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-300 transition-colors">km.azizul.islam.122576</a></div>
              <div>Office: {profile.officeAddress}</div>
            </div>

            <div className="pt-3">
              <button
                onClick={openAdminModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-sans-ui text-slate-400 hover:text-white hover:border-white/20 transition-colors"
              >
                <Shield size={13} />
                <span>{isAdmin ? 'Admin Dashboard (Active)' : 'Admin Portal'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Top Button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-serif text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Azizul Islam Opi. All rights reserved.
          </div>

          <div className="italic text-slate-400">
            Chattogram, Bangladesh
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs font-serif text-slate-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
};
