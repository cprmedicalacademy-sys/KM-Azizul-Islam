import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const SkillsSection: React.FC = () => {
  const { skills } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Design & Creative', 'Office & Data', 'Professional'];

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-serif italic text-cyan-400 mb-2">
              02. Technical Competencies &amp; Tools
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-normal">
              Skills &amp; Craftsmanship
            </h2>
          </div>

          {/* Clean Segmented Filter Controls */}
          <div className="flex items-center gap-1 p-1 bg-[#0c1017] rounded-xl border border-white/10 self-start sm:self-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-sans-ui transition-colors ${
                  activeCategory === cat
                    ? 'bg-white text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map(skill => (
            <div
              key={skill.id}
              className="p-6 rounded-2xl bg-[#0c1017] border border-white/10 hover:border-cyan-500/30 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-serif text-xl font-bold text-white">
                    {skill.name}
                  </h3>
                  <span className="font-mono-numbers text-base font-semibold text-cyan-400">
                    {skill.level}%
                  </span>
                </div>

                <div className="text-xs font-serif italic text-slate-400 mb-3">
                  {skill.category} · {skill.experience}
                </div>

                <p className="text-xs sm:text-sm font-serif text-slate-300 leading-relaxed mb-4">
                  {skill.description}
                </p>

                {/* Progress hairline indicator */}
                <div className="w-full bg-slate-900 rounded-full h-1 overflow-hidden mb-4 border border-white/5">
                  <div
                    className="h-full bg-cyan-400 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>

              {/* Tool Tags rendered as clean unboxed text with dots */}
              <div className="pt-3 border-t border-white/10 text-[11px] font-sans-ui text-slate-400 flex flex-wrap gap-x-2 gap-y-1">
                {skill.tools.map((t, idx) => (
                  <span key={idx}>
                    {t}{idx < skill.tools.length - 1 ? ' ·' : ''}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
