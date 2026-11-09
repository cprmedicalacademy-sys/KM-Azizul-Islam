import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectItem } from '../data/portfolioData';
import { ProjectDetailModal } from './ProjectDetailModal';
import { Search, Plus, ArrowUpRight } from 'lucide-react';

interface ProjectsSectionProps {
  onContactAboutProject: (projectTitle: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onContactAboutProject }) => {
  const { projects, openAdminModal, isAdmin } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-serif italic text-cyan-400 mb-2">
              05. Portfolio Showcase &amp; Design Case Studies
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-normal">
              Selected Works
            </h2>
          </div>

          {/* Search Input & Admin Add Button */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="pl-8 pr-4 py-2 rounded-xl bg-[#0c1017] border border-white/10 text-xs font-sans-ui text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {isAdmin && (
              <button
                onClick={openAdminModal}
                className="p-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-sans-ui flex items-center gap-1.5"
                title="Add New Project in Admin Dashboard"
              >
                <Plus size={14} />
                <span className="hidden sm:inline">Add Project</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs (Clean Segmented Controls) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#0c1017] rounded-xl border border-white/10 mb-10 w-fit">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-sans-ui transition-colors ${
                selectedCategory === cat
                  ? 'bg-white text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#0c1017] border border-white/10 text-center text-slate-400 font-serif text-sm">
            No projects found matching the criteria. Try clearing the search or category filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <div
                key={project.id}
                onClick={() => setActiveProject(project)}
                className="group rounded-2xl overflow-hidden bg-[#0c1017] border border-white/10 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Visual Artwork Thumbnail */}
                <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1017] via-transparent to-transparent opacity-60" />
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Unboxed Metadata Line (No Pill) */}
                    <div className="flex items-center gap-2 text-xs font-serif italic text-slate-400 mb-2">
                      <span>{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.client}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-numbers">{project.year}</span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-serif text-slate-300 leading-relaxed line-clamp-2">
                      {project.tagline || project.description}
                    </p>
                  </div>

                  {/* Footer link */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-sans-ui text-slate-300 group-hover:text-cyan-300">
                    <span>Inspect Case Study</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onContactAboutProject={onContactAboutProject}
      />
    </section>
  );
};
