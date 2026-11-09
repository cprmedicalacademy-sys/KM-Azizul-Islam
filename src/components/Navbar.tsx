import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ShieldCheck, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const { openAdminModal, isAdmin } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Biography', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Milestones', id: 'experience' },
    { label: 'Services', id: 'services' },
    { label: 'Selected Works', id: 'projects' },
    { label: 'Inquiries', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-[#07090e]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
        {/* Brand Wordmark in Times New Roman */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="text-left group flex items-baseline gap-2.5 whitespace-nowrap shrink-0"
        >
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-normal text-white group-hover:text-cyan-300 transition-colors">
            Azizul Islam Opi
          </span>
          <span className="hidden sm:inline font-serif italic text-xs text-slate-400">
            · Studio
          </span>
        </button>

        {/* Desktop Navigation Links (Clean unboxed text links) */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-sans-ui font-medium text-slate-300">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 tracking-wide"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Actions: Discreet Admin Lock + Inquire Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={openAdminModal}
            className={`p-2 rounded-lg border text-xs transition-all flex items-center gap-1.5 ${
              isAdmin
                ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300'
                : 'bg-transparent border-white/10 text-slate-400 hover:text-white hover:border-white/20'
            }`}
            title={isAdmin ? 'Admin Dashboard (Active)' : 'Admin Dashboard'}
          >
            <ShieldCheck size={14} />
            <span className="hidden sm:inline font-sans-ui text-[11px]">
              {isAdmin ? 'Admin Active' : 'CMS'}
            </span>
          </button>

          <button
            onClick={() => handleLinkClick('contact')}
            className="px-4 py-2 rounded-lg bg-white text-slate-950 font-sans-ui font-semibold text-xs hover:bg-slate-200 transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <span>Inquire</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="lg:hidden p-2 rounded-lg border border-white/10 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 mx-4 p-5 rounded-2xl bg-[#0d1119] border border-white/10 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col gap-1 pb-4 border-b border-white/10">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="w-full text-left py-2.5 text-sm font-serif text-slate-200 hover:text-cyan-300 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-slate-500 font-sans-ui">→</span>
              </button>
            ))}
          </div>

          <div className="pt-4 flex items-center justify-between">
            <span className="text-xs font-serif italic text-slate-400">
              Chattogram, Bangladesh
            </span>
            <button
              onClick={() => handleLinkClick('contact')}
              className="px-3.5 py-1.5 rounded-lg bg-white text-slate-950 font-sans-ui font-semibold text-xs"
            >
              Get in Touch
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
