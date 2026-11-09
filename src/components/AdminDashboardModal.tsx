import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectItem, SkillItem, ExperienceItem } from '../data/portfolioData';
import {
  X,
  Lock,
  Unlock,
  Shield,
  Plus,
  Trash2,
  Edit,
  Save,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  FileText,
  Briefcase,
  Cpu,
  Layers,
  Image as ImageIcon
} from 'lucide-react';

export const AdminDashboardModal: React.FC = () => {
  const {
    isAdminModalOpen,
    closeAdminModal,
    isAdmin,
    loginAdmin,
    logoutAdmin,
    profile,
    updateProfile,
    projects,
    addProject,
    updateProject,
    deleteProject,
    skills,
    updateSkill,
    experiences,
    updateExperience,
    resetToDefaults,
    exportDataJson,
    importDataJson,
  } = usePortfolio();

  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [adminTab, setAdminTab] = useState<'projects' | 'profile' | 'skills' | 'experience' | 'backup'>('projects');

  // Project form state
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Branding',
    tagline: '',
    description: '',
    image: '',
    videoUrl: '',
    tags: '',
    client: '',
    year: '2026',
    deliverables: '',
    featured: false,
  });

  // Profile form state
  const [profileForm, setProfileForm] = useState({ ...profile });

  if (!isAdminModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(passwordInput);
    if (!success) {
      setAuthError(true);
    } else {
      setAuthError(false);
      setPasswordInput('');
    }
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setProjectForm(prev => ({ ...prev, image: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const startEditProject = (p: ProjectItem) => {
    setEditingProjectId(p.id);
    setProjectForm({
      title: p.title,
      category: p.category,
      tagline: p.tagline,
      description: p.description,
      image: p.image,
      videoUrl: p.videoUrl || '',
      tags: p.tags.join(', '),
      client: p.client,
      year: p.year,
      deliverables: p.deliverables.join(', '),
      featured: !!p.featured,
    });
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.image) return;

    const formattedTags = projectForm.tags.split(',').map(t => t.trim()).filter(Boolean);
    const formattedDeliverables = projectForm.deliverables.split(',').map(d => d.trim()).filter(Boolean);

    if (editingProjectId) {
      updateProject({
        id: editingProjectId,
        title: projectForm.title,
        category: projectForm.category,
        tagline: projectForm.tagline,
        description: projectForm.description,
        image: projectForm.image,
        videoUrl: projectForm.videoUrl || undefined,
        tags: formattedTags.length ? formattedTags : ['Design'],
        client: projectForm.client || 'Client',
        year: projectForm.year || '2026',
        deliverables: formattedDeliverables.length ? formattedDeliverables : ['Design Deliverables'],
        featured: projectForm.featured,
      });
      setEditingProjectId(null);
    } else {
      addProject({
        title: projectForm.title,
        category: projectForm.category,
        tagline: projectForm.tagline,
        description: projectForm.description,
        image: projectForm.image,
        videoUrl: projectForm.videoUrl || undefined,
        tags: formattedTags.length ? formattedTags : ['Design'],
        client: projectForm.client || 'Client',
        year: projectForm.year || '2026',
        deliverables: formattedDeliverables.length ? formattedDeliverables : ['Design Deliverables'],
        featured: projectForm.featured,
      });
    }

    // Reset form
    setProjectForm({
      title: '',
      category: 'Branding',
      tagline: '',
      description: '',
      image: '',
      videoUrl: '',
      tags: '',
      client: '',
      year: '2026',
      deliverables: '',
      featured: false,
    });
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `azizul-islam-opi-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        const text = event.target?.result as string;
        if (text) {
          importDataJson(text);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-xl" onClick={closeAdminModal} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-5xl bg-slate-950 border border-purple-500/30 rounded-3xl shadow-2xl shadow-purple-950/40 z-10 overflow-hidden max-h-[92vh] flex flex-col my-auto">
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-slate-900/60 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30">
              <Shield size={20} />
            </div>
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-white">
                Admin CMS Dashboard
              </h3>
              <p className="text-[11px] font-mono-accent text-slate-400">
                Manage website content, portfolio projects, and personal data
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs font-mono-accent"
              >
                Logout
              </button>
            )}
            <button
              onClick={closeAdminModal}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body: Login View vs Authenticated CMS */}
        {!isAdmin ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-500/40 shadow-xl shadow-purple-950/40">
              <Lock size={28} />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-serif font-bold text-white">
                Admin Authentication
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans-ui">
                Enter your administrative passcode to access the content management system.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={e => {
                    setPasswordInput(e.target.value);
                    setAuthError(false);
                  }}
                  placeholder="Enter passcode..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-center text-white focus:outline-none focus:border-cyan-500 transition-colors tracking-widest"
                  autoFocus
                />
                {authError && (
                  <p className="text-xs text-rose-400 mt-2 font-sans-ui">
                    Incorrect passcode. Access denied.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-slate-950 font-bold text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Unlock size={16} />
                <span>Unlock Dashboard</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Admin Tabs */}
            <div className="flex border-b border-white/10 px-4 sm:px-6 bg-slate-900/40 overflow-x-auto">
              <button
                onClick={() => setAdminTab('projects')}
                className={`py-3 px-4 text-xs font-mono-accent border-b-2 font-medium transition-colors shrink-0 flex items-center gap-2 ${
                  adminTab === 'projects'
                    ? 'border-purple-400 text-purple-300'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Layers size={14} />
                <span>Projects ({projects.length})</span>
              </button>

              <button
                onClick={() => setAdminTab('profile')}
                className={`py-3 px-4 text-xs font-mono-accent border-b-2 font-medium transition-colors shrink-0 flex items-center gap-2 ${
                  adminTab === 'profile'
                    ? 'border-purple-400 text-purple-300'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <FileText size={14} />
                <span>Profile &amp; Bio</span>
              </button>

              <button
                onClick={() => setAdminTab('skills')}
                className={`py-3 px-4 text-xs font-mono-accent border-b-2 font-medium transition-colors shrink-0 flex items-center gap-2 ${
                  adminTab === 'skills'
                    ? 'border-purple-400 text-purple-300'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Cpu size={14} />
                <span>Skills ({skills.length})</span>
              </button>

              <button
                onClick={() => setAdminTab('experience')}
                className={`py-3 px-4 text-xs font-mono-accent border-b-2 font-medium transition-colors shrink-0 flex items-center gap-2 ${
                  adminTab === 'experience'
                    ? 'border-purple-400 text-purple-300'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Briefcase size={14} />
                <span>Experience ({experiences.length})</span>
              </button>

              <button
                onClick={() => setAdminTab('backup')}
                className={`py-3 px-4 text-xs font-mono-accent border-b-2 font-medium transition-colors shrink-0 flex items-center gap-2 ${
                  adminTab === 'backup'
                    ? 'border-purple-400 text-purple-300'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <RefreshCw size={14} />
                <span>Export &amp; Reset</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
              {/* TAB 1: PROJECTS MANAGEMENT */}
              {adminTab === 'projects' && (
                <div className="space-y-8">
                  {/* Project Editor Form */}
                  <form onSubmit={handleSaveProject} className="p-5 rounded-2xl bg-slate-900/60 border border-purple-500/20 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                        {editingProjectId ? <Edit size={16} className="text-cyan-400" /> : <Plus size={16} className="text-purple-400" />}
                        <span>{editingProjectId ? 'Edit Project' : 'Add New Portfolio Project'}</span>
                      </h4>

                      {editingProjectId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProjectId(null);
                            setProjectForm({
                              title: '',
                              category: 'Branding',
                              tagline: '',
                              description: '',
                              image: '',
                              videoUrl: '',
                              tags: '',
                              client: '',
                              year: '2026',
                              deliverables: '',
                              featured: false,
                            });
                          }}
                          className="text-[11px] text-slate-400 hover:text-white font-mono-accent"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono-accent text-slate-400 mb-1">
                          Project Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={projectForm.title}
                          onChange={e => setProjectForm({ ...projectForm, title: e.target.value })}
                          placeholder="e.g. Modern Brand Suite"
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono-accent text-slate-400 mb-1">
                          Category *
                        </label>
                        <select
                          value={projectForm.category}
                          onChange={e => setProjectForm({ ...projectForm, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white"
                        >
                          <option value="Branding">Branding</option>
                          <option value="Print Design">Print Design</option>
                          <option value="3D & Motion">3D &amp; Motion</option>
                          <option value="Social Media">Social Media</option>
                          <option value="Typography & Vectors">Typography &amp; Vectors</option>
                          <option value="Office & Data">Office &amp; Data</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono-accent text-slate-400 mb-1">
                          Client / Organization
                        </label>
                        <input
                          type="text"
                          value={projectForm.client}
                          onChange={e => setProjectForm({ ...projectForm, client: e.target.value })}
                          placeholder="e.g. CPR Medical Academy"
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono-accent text-slate-400 mb-1">
                          Year
                        </label>
                        <input
                          type="text"
                          value={projectForm.year}
                          onChange={e => setProjectForm({ ...projectForm, year: e.target.value })}
                          placeholder="2026"
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white"
                        />
                      </div>
                    </div>

                    {/* Image URL or File upload */}
                    <div className="space-y-2">
                      <label className="block text-[11px] font-mono-accent text-slate-400">
                        Project Image URL or Direct File Upload *
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          required
                          value={projectForm.image}
                          onChange={e => setProjectForm({ ...projectForm, image: e.target.value })}
                          placeholder="https://... or upload local image file below"
                          className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white"
                        />
                        <label className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono-accent text-slate-200 cursor-pointer flex items-center gap-1.5 shrink-0">
                          <ImageIcon size={14} />
                          <span>Browse</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                      {projectForm.image && (
                        <div className="w-24 h-16 rounded-lg overflow-hidden border border-white/10 mt-1">
                          <img src={projectForm.image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-accent text-slate-400 mb-1">
                        Short Tagline
                      </label>
                      <input
                        type="text"
                        value={projectForm.tagline}
                        onChange={e => setProjectForm({ ...projectForm, tagline: e.target.value })}
                        placeholder="One-line summary of the work..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-accent text-slate-400 mb-1">
                        Full Description
                      </label>
                      <textarea
                        rows={3}
                        value={projectForm.description}
                        onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
                        placeholder="Detailed overview of creative process, challenges, and results..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono-accent text-slate-400 mb-1">
                          Tags (comma separated)
                        </label>
                        <input
                          type="text"
                          value={projectForm.tags}
                          onChange={e => setProjectForm({ ...projectForm, tags: e.target.value })}
                          placeholder="Illustrator, CMYK, Logo"
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono-accent text-slate-400 mb-1">
                          Deliverables (comma separated)
                        </label>
                        <input
                          type="text"
                          value={projectForm.deliverables}
                          onChange={e => setProjectForm({ ...projectForm, deliverables: e.target.value })}
                          placeholder="Logo, Packaging, Flex Banner"
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-mono-accent text-slate-300">
                        <input
                          type="checkbox"
                          checked={projectForm.featured}
                          onChange={e => setProjectForm({ ...projectForm, featured: e.target.checked })}
                          className="rounded accent-purple-500"
                        />
                        <span>Featured on Homepage</span>
                      </label>

                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2"
                      >
                        <Save size={14} />
                        <span>{editingProjectId ? 'Update Project' : 'Publish Project'}</span>
                      </button>
                    </div>
                  </form>

                  {/* Existing Projects List */}
                  <div className="space-y-3">
                    <h4 className="font-mono-accent text-xs uppercase tracking-wider text-slate-400">
                      Existing Projects ({projects.length})
                    </h4>

                    <div className="space-y-2">
                      {projects.map(p => (
                        <div
                          key={p.id}
                          className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-3 hover:border-white/20 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.title}
                              className="w-12 h-12 rounded-lg object-cover bg-slate-800"
                            />
                            <div>
                              <div className="text-xs font-semibold text-white">{p.title}</div>
                              <div className="text-[11px] font-mono-accent text-slate-400">
                                {p.category} • {p.client} ({p.year})
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => startEditProject(p)}
                              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-300 transition-colors"
                              title="Edit Project"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete "${p.title}"?`)) {
                                  deleteProject(p.id);
                                }
                              }}
                              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-rose-400 transition-colors"
                              title="Delete Project"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PROFILE & BIO */}
              {adminTab === 'profile' && (
                <div className="space-y-4 max-w-2xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono-accent text-slate-400 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-accent text-slate-400 mb-1">
                        Professional Role
                      </label>
                      <input
                        type="text"
                        value={profileForm.role}
                        onChange={e => setProfileForm({ ...profileForm, role: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-accent text-slate-400 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-accent text-slate-400 mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="text"
                        value={profileForm.phone}
                        onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-sans-ui text-slate-400 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={profileForm.location}
                        onChange={e => setProfileForm({ ...profileForm, location: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-sans-ui text-slate-400 mb-1">
                        Facebook Profile URL
                      </label>
                      <input
                        type="url"
                        value={profileForm.facebook}
                        onChange={e => setProfileForm({ ...profileForm, facebook: e.target.value })}
                        placeholder="https://www.facebook.com/..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-mono-accent text-slate-400 mb-1">
                        Tagline / Hero Hook
                      </label>
                      <input
                        type="text"
                        value={profileForm.tagline}
                        onChange={e => setProfileForm({ ...profileForm, tagline: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-mono-accent text-slate-400 mb-1">
                        Biography
                      </label>
                      <textarea
                        rows={5}
                        value={profileForm.bio}
                        onChange={e => setProfileForm({ ...profileForm, bio: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white leading-relaxed"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => updateProfile(profileForm)}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2"
                  >
                    <Save size={14} />
                    <span>Save Profile Changes</span>
                  </button>
                </div>
              )}

              {/* TAB 3: SKILLS MANAGEMENT */}
              {adminTab === 'skills' && (
                <div className="space-y-4">
                  <div className="text-xs font-mono-accent text-slate-400">
                    Adjust proficiency percentages and tools for core skills:
                  </div>

                  <div className="space-y-3">
                    {skills.map(skill => (
                      <div
                        key={skill.id}
                        className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-white">{skill.name}</span>
                          <span className="text-xs font-mono-accent text-cyan-400">{skill.level}%</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="100"
                          value={skill.level}
                          onChange={e => updateSkill({ ...skill, level: parseInt(e.target.value, 10) })}
                          className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                        />
                        <div className="text-[11px] text-slate-400 font-mono-accent">
                          {skill.category} • {skill.experience}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: EXPERIENCE */}
              {adminTab === 'experience' && (
                <div className="space-y-4">
                  <div className="text-xs font-mono-accent text-slate-400">
                    Professional career entries:
                  </div>

                  <div className="space-y-4">
                    {experiences.map(exp => (
                      <div
                        key={exp.id}
                        className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-white">{exp.role} @ {exp.company}</span>
                          <span className="text-[11px] font-mono-accent text-purple-400">{exp.period}</span>
                        </div>
                        <p className="text-xs text-slate-300">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: BACKUP & RESTORE */}
              {adminTab === 'backup' && (
                <div className="space-y-6 max-w-xl">
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-3">
                    <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                      <Download size={16} className="text-cyan-400" />
                      <span>Export Portfolio Backup</span>
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-mono-accent">
                      Download your full portfolio content, projects, bio, and settings as a standalone JSON file.
                    </p>
                    <button
                      onClick={handleDownloadBackup}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono-accent text-cyan-300 border border-cyan-500/30 flex items-center gap-2"
                    >
                      <Download size={14} />
                      <span>Download JSON Backup</span>
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-3">
                    <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                      <Upload size={16} className="text-purple-400" />
                      <span>Import Portfolio Backup</span>
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-mono-accent">
                      Restore your portfolio from a previously saved JSON file.
                    </p>
                    <label className="inline-flex px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono-accent text-purple-300 border border-purple-500/30 cursor-pointer items-center gap-2">
                      <Upload size={14} />
                      <span>Select JSON File to Restore</span>
                      <input
                        type="file"
                        accept="application/json"
                        onChange={handleImportBackup}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
                    <h4 className="font-display font-bold text-sm text-rose-300 flex items-center gap-2">
                      <AlertCircle size={16} className="text-rose-400" />
                      <span>Reset to Original Defaults</span>
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-mono-accent">
                      Clears local cache and restores original profile data for Azizul Islam Opi.
                    </p>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to restore original default data?')) {
                          resetToDefaults();
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-rose-900/40 hover:bg-rose-900/70 text-xs font-mono-accent text-rose-300 border border-rose-500/40 flex items-center gap-2"
                    >
                      <RefreshCw size={14} />
                      <span>Reset Everything</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
