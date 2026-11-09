import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ThreeHeroScene } from './ThreeHeroScene';
import { ArrowDown, MessageSquare, ArrowRight, Facebook } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { profile } = usePortfolio();

  return (
    <section id="hero" className="relative min-h-[92vh] pt-28 pb-16 flex flex-col justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        {/* Unboxed Editorial Kicker (Zero Pill) */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-serif italic text-slate-400 mb-6 border-b border-white/10 pb-3">
          <span>Creative Direction &amp; Graphic Design</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>{profile.location}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-cyan-300 not-italic font-sans-ui text-xs">Available for New Projects</span>
        </div>

        {/* Hero Grid: Left Typographic Atelier + Right 3D Visual Artwork */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Authentic Human Editorial Typography in Times New Roman */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            {/* Practitioner Signature Badge with Real Photo */}
            <div className="flex items-center gap-3.5 p-2 rounded-xl bg-[#0c1017] border border-white/10 w-fit">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-11 h-12 rounded-lg object-cover object-top border border-white/15"
              />
              <div className="pr-3">
                <div className="font-serif font-bold text-xs text-white">KM Azizul Islam (Opi)</div>
                <div className="text-[11px] font-serif italic text-cyan-300">Executive Officer · CPR Medical Academy</div>
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-5xl sm:text-7xl xl:text-8xl font-serif font-bold text-white tracking-normal leading-[0.98]">
                Azizul <br />
                <span className="italic font-normal text-slate-300">
                  Islam Opi
                </span>
              </h1>

              <p className="text-xl sm:text-2xl font-serif italic text-cyan-300 pt-1">
                {profile.role}
              </p>
            </div>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-serif max-w-xl">
              {profile.tagline} Rooted in Adobe Illustrator vector craftsmanship, commercial print prepress, and executive publication design at CPR Medical Academy.
            </p>

            {/* Curated Action Points (Clean, Non-pill Buttons) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('projects')}
                className="px-6 py-3 rounded-lg bg-white text-slate-950 font-sans-ui font-semibold text-xs sm:text-sm hover:bg-slate-200 transition-all flex items-center gap-2 shadow-md shadow-white/5"
              >
                <span>View Selected Works</span>
                <ArrowRight size={15} />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 rounded-lg bg-transparent border border-white/20 hover:border-cyan-400 text-slate-200 hover:text-cyan-300 font-sans-ui font-medium text-xs sm:text-sm transition-colors"
              >
                Contact Studio
              </button>

              <a
                href={`https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}?text=Hello%20Azizul,%20I%20am%20inquiring%20about%20a%20design%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 hover:border-emerald-500/60 text-emerald-300 font-sans-ui text-xs flex items-center gap-2 transition-colors"
                title="Direct WhatsApp"
              >
                <MessageSquare size={14} className="text-emerald-400" />
                <span>WhatsApp</span>
              </a>

              <a
                href={profile.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-lg bg-blue-950/30 border border-blue-500/30 hover:border-blue-500/60 text-blue-300 font-sans-ui text-xs flex items-center gap-2 transition-colors"
                title="Follow on Facebook"
              >
                <Facebook size={14} className="text-blue-400" />
                <span>Facebook</span>
              </a>
            </div>

            {/* Current Executive Appointment Banner */}
            <div className="p-4 rounded-xl bg-[#0c1017] border border-white/10 flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
              <div className="text-xs font-serif leading-relaxed text-slate-300">
                <span className="font-bold text-white">Current Engagement:</span> Executive Officer at CPR Medical Academy (01 September 2026 To Running) · Moti Tower, Chawkbazar, Chittagong. Overseeing brand communications, orientation curricula, and executive publications.
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Canvas in Curated Gallery Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0c1017] shadow-2xl">
              {/* Frame Label */}
              <div className="absolute top-4 left-4 z-10 pointer-events-none flex items-center gap-2 text-xs font-serif italic text-slate-400">
                <span>Interactive 3D Form</span>
                <span aria-hidden="true">·</span>
                <span>Orbit &amp; Examine</span>
              </div>

              <ThreeHeroScene />
            </div>
          </div>
        </div>

        {/* Quantitative Proof Strip: Full-Width Row Below Split */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 mt-12 border-t border-white/10">
          <div className="p-4 border-l border-white/15">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-white font-mono-numbers">
              {profile.yearsExperience}
            </div>
            <div className="text-xs font-serif italic text-slate-400 mt-0.5">
              Years Professional Practice
            </div>
          </div>

          <div className="p-4 border-l border-white/15">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-white font-mono-numbers">
              {profile.projectsCompleted}
            </div>
            <div className="text-xs font-serif italic text-slate-400 mt-0.5">
              Completed Design Deliverables
            </div>
          </div>

          <div className="p-4 border-l border-white/15">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-white font-mono-numbers">
              {profile.clientSatisfaction}
            </div>
            <div className="text-xs font-serif italic text-slate-400 mt-0.5">
              Client Satisfaction Rate
            </div>
          </div>

          <div className="p-4 border-l border-white/15">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-white font-mono-numbers">
              {profile.skillsMastered}
            </div>
            <div className="text-xs font-serif italic text-slate-400 mt-0.5">
              Core Design &amp; Data Tool Stacks
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => onNavigate('about')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-serif italic group"
        >
          <span>Explore Biography &amp; Portfolio</span>
          <ArrowDown size={13} className="group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>
    </section>
  );
};
