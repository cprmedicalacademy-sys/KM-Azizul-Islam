import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const ExperienceEducationSection: React.FC = () => {
  const { experiences, education } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'both' | 'experience' | 'education'>('both');

  return (
    <section id="experience" className="py-24 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-serif italic text-cyan-400 mb-2">
              03. Career &amp; Academic Chronology
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-normal">
              Experience &amp; Education
            </h2>
          </div>

          {/* Tab Filter Controls */}
          <div className="flex items-center gap-1 p-1 bg-[#0c1017] rounded-xl border border-white/10 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('both')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-sans-ui transition-colors ${
                activeTab === 'both'
                  ? 'bg-white text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Milestones
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-sans-ui transition-colors ${
                activeTab === 'experience'
                  ? 'bg-white text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Experience ({experiences.length})
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-sans-ui transition-colors ${
                activeTab === 'education'
                  ? 'bg-white text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Education ({education.length})
            </button>
          </div>
        </div>

        {/* 2-Column or Full Width Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Professional Experience Column */}
          {(activeTab === 'both' || activeTab === 'experience') && (
            <div className={`${activeTab === 'both' ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-6`}>
              <h3 className="font-serif text-2xl font-bold text-white mb-4">
                Professional Experience
              </h3>

              <div className="space-y-6">
                {experiences.map(exp => (
                  <div
                    key={exp.id}
                    className="p-6 rounded-2xl bg-[#0c1017] border border-white/10 hover:border-cyan-500/30 transition-colors space-y-3"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-xs font-serif italic text-cyan-400">
                        {exp.period}
                      </span>
                      {exp.current && (
                        <span className="text-xs font-sans-ui text-emerald-400">
                          Current Appointment
                        </span>
                      )}
                    </div>

                    <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">
                      {exp.role}
                    </h4>

                    <div className="text-sm font-serif italic text-slate-300">
                      {exp.company} · {exp.location}
                    </div>

                    <p className="text-xs sm:text-sm font-serif text-slate-300 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="pt-3 border-t border-white/10 space-y-1.5">
                      {exp.responsibilities.map((r, rIdx) => (
                        <div key={rIdx} className="text-xs font-serif text-slate-400 flex items-start gap-2">
                          <span className="text-slate-500">·</span>
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Column */}
          {(activeTab === 'both' || activeTab === 'education') && (
            <div id="education" className={`${activeTab === 'both' ? 'lg:col-span-5' : 'lg:col-span-12'} space-y-6`}>
              <h3 className="font-serif text-2xl font-bold text-white mb-4">
                Academic Background
              </h3>

              <div className="space-y-6">
                {education.map(edu => (
                  <div
                    key={edu.id}
                    className="p-6 rounded-2xl bg-[#0c1017] border border-white/10 hover:border-cyan-500/30 transition-colors space-y-3"
                  >
                    <div className="flex items-baseline justify-between text-xs font-serif italic text-slate-400">
                      <span>{edu.group} Group</span>
                      <span>{edu.yearOrStatus}</span>
                    </div>

                    <h4 className="font-serif text-xl font-bold text-white">
                      {edu.degree}
                    </h4>

                    <div className="text-sm font-serif italic text-cyan-300">
                      {edu.institution}
                    </div>

                    <div className="text-xs font-sans-ui text-slate-400 flex items-center gap-2">
                      <span className="font-semibold text-white">Result: {edu.result}</span>
                      <span>·</span>
                      <span>{edu.location}</span>
                    </div>

                    <p className="text-xs font-serif text-slate-300 leading-relaxed pt-2 border-t border-white/10">
                      {edu.details}
                    </p>
                  </div>
                ))}

                {/* Analytical Science Foundation note */}
                <div className="p-5 rounded-2xl bg-[#111622] border border-white/10 text-xs font-serif text-slate-300 space-y-1">
                  <div className="font-bold text-white">
                    The Science &amp; Mathematical Rigor
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    A rigorous secondary and higher-secondary background in the Science group underpins Azizul&apos;s systematic approach to spatial geometry, color theory, and typographic grid math.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
