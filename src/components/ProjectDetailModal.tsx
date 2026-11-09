import React from 'react';
import { ProjectItem } from '../data/portfolioData';
import { X, Play } from 'lucide-react';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onContactAboutProject: (title: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onContactAboutProject,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#07090e]/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Dialog Card in Bespoke Exhibition Format */}
      <div className="relative w-full max-w-4xl bg-[#0c1017] border border-white/10 rounded-2xl shadow-2xl z-10 overflow-hidden max-h-[92vh] flex flex-col my-auto">
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#0e131d]">
          <div className="flex items-center gap-2 text-xs font-serif italic text-slate-300">
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.client}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Main Visual Image Preview */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-slate-900">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-72 sm:h-96 object-cover object-center"
              loading="lazy"
            />
            {project.videoUrl && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-white text-slate-950 hover:bg-slate-200 transition-colors shadow-xl flex items-center gap-2 font-sans-ui font-semibold text-xs"
                >
                  <Play size={14} fill="currentColor" />
                  <span>View Project Reel</span>
                </a>
              </div>
            )}
          </div>

          {/* Project Header Info in Times New Roman */}
          <div>
            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-2">
              {project.title}
            </h3>
            <p className="text-base font-serif italic text-cyan-300">
              {project.tagline}
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-[#111622] border border-white/5 font-serif text-xs">
            <div>
              <div className="text-slate-400 italic">Client</div>
              <div className="text-white font-bold mt-0.5">{project.client}</div>
            </div>

            <div>
              <div className="text-slate-400 italic">Year</div>
              <div className="text-white font-bold mt-0.5">{project.year}</div>
            </div>

            <div>
              <div className="text-slate-400 italic">Discipline</div>
              <div className="text-white font-bold mt-0.5">{project.category}</div>
            </div>
          </div>

          {/* Detailed Narrative in Times New Roman */}
          <div className="space-y-2">
            <h4 className="text-xs font-serif italic text-slate-400 uppercase tracking-normal">
              Project Context &amp; Creative Execution
            </h4>
            <p className="text-slate-300 font-serif leading-relaxed text-sm sm:text-base">
              {project.description}
            </p>
          </div>

          {/* Deliverables List */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-serif italic text-slate-400 uppercase tracking-normal">
              Deliverables &amp; Outcomes
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-serif text-slate-200">
              {project.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[#111622] border border-white/5 flex items-center gap-2"
                >
                  <span className="text-cyan-400">·</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags as Clean Unboxed Text with Dots */}
          <div className="pt-2 flex flex-wrap gap-x-2 gap-y-1 text-xs font-sans-ui text-slate-400">
            {project.tags.map((tag, idx) => (
              <span key={idx}>
                #{tag}{idx < project.tags.length - 1 ? ' ·' : ''}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-[#0e131d] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-white/10 text-slate-300 hover:text-white text-xs font-sans-ui transition-colors"
          >
            Close Preview
          </button>

          <button
            onClick={() => {
              onContactAboutProject(project.title);
              onClose();
            }}
            className="px-5 py-2 rounded-lg bg-white text-slate-950 font-sans-ui font-semibold text-xs hover:bg-slate-200 transition-colors"
          >
            Inquire About Similar Project
          </button>
        </div>
      </div>
    </div>
  );
};
