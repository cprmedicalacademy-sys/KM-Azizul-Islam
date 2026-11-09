import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Facebook } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { profile } = usePortfolio();

  return (
    <section id="about" className="py-24 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-14">
          <div className="text-xs font-serif italic text-cyan-400 mb-2">
            01. Biography &amp; Approach
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-normal">
            A Graphic Designer Committed to Precision, Structure &amp; Aesthetics
          </h2>
          <div className="w-16 h-[1px] bg-white/20 mt-4" />
        </div>

        {/* 2-Column Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Monograph Portrait & Studio Credential */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-[#0c1017] border border-white/10 space-y-6">
              <div className="border-b border-white/10 pb-6 flex items-center gap-4">
                <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden border border-white/15 bg-slate-900 shrink-0 shadow-lg">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <span className="font-serif italic text-xs text-slate-400 block mb-0.5">
                    Practitioner Profile
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    KM Azizul Islam
                  </h3>
                  <div className="text-xs sm:text-sm font-serif italic text-cyan-300 mt-0.5">
                    Executive Officer &amp; Designer
                  </div>
                  <div className="text-xs font-sans-ui text-slate-400 mt-1">
                    {profile.officeAddress}
                  </div>
                </div>
              </div>

              {/* Three Pillars of Craft */}
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-[#111622] border border-white/5">
                  <div className="font-serif font-bold text-sm text-white">
                    Vector Brand Systems
                  </div>
                  <div className="font-serif italic text-xs text-slate-400 mt-0.5">
                    Adobe Illustrator precision curves, geometric logos, and cohesive identity guidelines.
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#111622] border border-white/5">
                  <div className="font-serif font-bold text-sm text-white">
                    Commercial Print Production
                  </div>
                  <div className="font-serif italic text-xs text-slate-400 mt-0.5">
                    Prepress CMYK calibration, packaging die-lines, and large format offset and flex printing.
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#111622] border border-white/5">
                  <div className="font-serif font-bold text-sm text-white">
                    Executive Academic Publishing
                  </div>
                  <div className="font-serif italic text-xs text-slate-400 mt-0.5">
                    Healthcare course literature, structured manuals, and institutional presentation decks.
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col gap-2 text-xs font-sans-ui text-slate-400">
                <div className="flex items-center justify-between">
                  <span>Direct Studio Line:</span>
                  <span className="font-mono-numbers text-white font-medium">{profile.phone}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span>Facebook Profile:</span>
                  <a
                    href={profile.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <Facebook size={13} className="text-blue-400" />
                    <span>km.azizul.islam.122576</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Essay */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0c1017] border border-white/10 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-snug">
                &ldquo;Design is not merely aesthetic ornamentation; it is the visual architecture of strategic clarity.&rdquo;
              </h3>

              <div className="space-y-4 text-slate-300 font-serif text-base sm:text-lg leading-relaxed">
                <p>
                  I am <span className="text-white font-bold">Azizul Islam Opi</span>, a Graphic Designer and Creative Professional based in Chattogram, Bangladesh. My career combines visual aesthetics, technical vector illustration, and rigorous information architecture.
                </p>

                <p>
                  My trajectory spans key commercial and institutional domains. As a <span className="text-cyan-300 italic">Graphics Designer at Al Falah Computer and Printers</span>, I handled high-volume print production, color separations, packaging, and commercial advertising with zero-tolerance for prepress defects. Previously, as <span className="text-cyan-300 italic">Data Entry Manager at Bazar Bag Super Shop</span>, I oversaw large-scale inventory databases, barcode registers, and analytical reporting.
                </p>

                <p>
                  Currently, I serve as <span className="text-white font-semibold">Executive Officer of CPR Medical Academy</span> (commencing 01 September 2026), based at Moti Tower, Chawkbazar, Chittagong. I direct brand communications, medical post-graduation orientation literature, and institutional publications.
                </p>
              </div>

              {/* Official Credential / Visiting Card Feature */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="text-xs font-serif italic text-slate-400">
                  Official Institutional Credential · CPR Medical Academy
                </div>
                <div className="rounded-xl overflow-hidden border border-white/15 bg-slate-900 shadow-xl group">
                  <img
                    src={profile.cprCardImage}
                    alt="KM Azizul Islam - Executive Officer, CPR Medical Academy"
                    className="w-full h-auto object-cover group-hover:scale-101 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Core Strengths Checklist */}
              <div className="pt-4 border-t border-white/10">
                <div className="text-xs font-serif italic text-slate-400 uppercase tracking-normal mb-3">
                  Disciplines in Active Practice:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-serif text-slate-200">
                  <div className="p-3 rounded-lg bg-[#111622] border border-white/5">
                    · Vector Architecture &amp; Brand Identities
                  </div>
                  <div className="p-3 rounded-lg bg-[#111622] border border-white/5">
                    · Prepress CMYK &amp; Packaging Engineering
                  </div>
                  <div className="p-3 rounded-lg bg-[#111622] border border-white/5">
                    · Executive Medical &amp; Academic Documentation
                  </div>
                  <div className="p-3 rounded-lg bg-[#111622] border border-white/5">
                    · Structured Data Modeling &amp; Presentation Systems
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
