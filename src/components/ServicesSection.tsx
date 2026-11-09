import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const { services } = usePortfolio();

  return (
    <section id="services" className="py-24 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-14">
          <div className="text-xs font-serif italic text-cyan-400 mb-2">
            04. Design Services &amp; Studio Capabilities
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-normal">
            Creative Services
          </h2>
          <div className="w-16 h-[1px] bg-white/20 mt-4" />
        </div>

        {/* Services Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="p-8 rounded-2xl bg-[#0c1017] border border-white/10 hover:border-cyan-500/30 transition-colors flex flex-col justify-between space-y-6"
            >
              <div>
                <div className="text-xs font-mono-numbers text-slate-500 mb-2">
                  0{index + 1}
                </div>

                <h3 className="font-serif text-2xl font-bold text-white mb-2">
                  {service.title}
                </h3>

                <p className="font-serif italic text-xs text-cyan-300 mb-3">
                  {service.tagline}
                </p>

                <p className="text-xs sm:text-sm font-serif text-slate-300 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Deliverables List (Unboxed clean typography) */}
                <div className="space-y-1.5 pt-4 border-t border-white/10 text-xs font-serif text-slate-400">
                  <div className="text-[11px] font-sans-ui uppercase tracking-normal text-slate-500 mb-2 font-medium">
                    Deliverables:
                  </div>
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400">·</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectService(service.title)}
                className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-sans-ui text-white hover:text-cyan-300 transition-colors group/btn"
              >
                <span>Commission {service.title}</span>
                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
